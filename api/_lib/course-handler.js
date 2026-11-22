'use strict';
/**
 * Server-side gate for a paid course.
 *
 *   GET  /api/<course>  -> 200 {modules} if the caller holds a valid session cookie, else 401
 *   POST /api/<course>  -> body {password}; 200 {modules} + Set-Cookie on success, 401 on failure
 *
 * Secrets live ONLY in environment variables (never in code):
 *   COURSE_COOKIE_SECRET        random string, >= 32 chars (signs session cookies)
 *   COURSE_PASSWORD_<COURSE>    the course password (see api/analyst.js, api/literacy.js)
 *   COURSE_TEMP_EPOCH           optional. Change it to cancel every temporary code you have already given out
 *
 * Temporary access codes (for online classes): the owner password can also mint a short-lived code
 *   POST {action:'mint', password:<owner password>, minutes:<5..1440>}  ->  {code, expiresAt, minutes}
 * Anyone typing that code in the normal password box gets in until it expires, then is locked out. Codes are
 * signed with COURSE_COOKIE_SECRET (nothing is stored), work for one course only, and never grant owner rights.
 *
 * Files in /api are never served as static files by Vercel, so the course data in
 * api/_data/ is reachable only through this handler.
 */
const crypto = require('crypto');

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // server-enforced session length
const MAX_PASSWORD_LENGTH = 200;
const MAX_BODY_BYTES = 4096;
const MAX_FAILS = 8; // failed attempts allowed per IP ...
const FAIL_WINDOW_MS = 10 * 60 * 1000; // ... per 10 minutes (best effort, per warm instance)
const FAIL_DELAY_MS = 500; // uniform delay on a wrong password
const MAX_TRACKED_IPS = 5000;
const TEMP_MIN_MINUTES = 5;
const TEMP_MAX_MINUTES = 24 * 60;
const TEMP_DEFAULT_MINUTES = 180;

const failLog = new Map(); // ip -> { count, first }

const sha256 = (value) => crypto.createHash('sha256').update(String(value)).digest();
const b64u = (value) => Buffer.from(value).toString('base64url');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Constant-time string comparison (hashes first so lengths never leak). */
function safeEqual(a, b) {
  return crypto.timingSafeEqual(sha256(a), sha256(b));
}

function sign(secret, payload) {
  return crypto.createHmac('sha256', secret).update('v1.' + payload).digest();
}

function makeToken(secret, course, now) {
  const payload = b64u(JSON.stringify({ c: course, e: now + SESSION_TTL_MS }));
  return payload + '.' + b64u(sign(secret, payload));
}

function verifyToken(secret, token, course, now) {
  if (typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  let given;
  try {
    given = Buffer.from(signature, 'base64url');
  } catch (e) {
    return false;
  }
  const expected = sign(secret, payload);
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return false;
  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return claims.c === course && Number.isFinite(claims.e) && claims.e > now && claims.e <= now + SESSION_TTL_MS + 60000;
  } catch (e) {
    return false;
  }
}

// ---- temporary access codes -------------------------------------------------------------------------
const tempEpoch = () => String(process.env.COURSE_TEMP_EPOCH || '');

function tempMac(secret, course, expirySec36) {
  return crypto
    .createHmac('sha256', secret)
    .update('tmp1.' + course + '.' + tempEpoch() + '.' + expirySec36)
    .digest('hex')
    .slice(0, 12);
}

/** Makes a code like "k1abcd-ef0123-456789" that stops working at expiryMs. */
function makeTempCode(secret, course, expiryMs) {
  const exp36 = Math.floor(expiryMs / 1000).toString(36).padStart(6, '0');
  const raw = exp36 + tempMac(secret, course, exp36);
  return raw.slice(0, 6) + '-' + raw.slice(6, 12) + '-' + raw.slice(12);
}

/** Returns the expiry (ms) when the typed text is a valid, unexpired temporary code for this course, else 0. */
function checkTempCode(secret, course, typed, now) {
  if (typeof typed !== 'string') return 0;
  const raw = typed.toLowerCase().replace(/[\s-]/g, '');
  if (!/^[0-9a-z]{18}$/.test(raw)) return 0;
  const exp36 = raw.slice(0, 6);
  if (!safeEqual(raw.slice(6), tempMac(secret, course, exp36))) return 0;
  const expiryMs = parseInt(exp36, 36) * 1000;
  if (!Number.isFinite(expiryMs) || expiryMs <= now) return 0;
  if (expiryMs - now > TEMP_MAX_MINUTES * 60000 + 60000) return 0; // longer than a code may ever last
  return expiryMs;
}

/** Session token for a temporary visitor: ends at the code's expiry (never later than a normal session). */
function makeTempToken(secret, course, now, expiryMs) {
  const end = Math.min(expiryMs, now + SESSION_TTL_MS);
  const payload = b64u(JSON.stringify({ c: course, e: end, t: tempEpoch(), tmp: 1 }));
  return { token: payload + '.' + b64u(sign(secret, payload)), end };
}

/** Milliseconds a temporary session has left, or null for a normal (owner) session. Call after verifyToken. */
function tempRemainingMs(token, now) {
  try {
    const claims = JSON.parse(Buffer.from(String(token).split('.')[0], 'base64url').toString('utf8'));
    if (!claims.tmp) return null;
    return Math.max(0, claims.e - now);
  } catch (e) {
    return null;
  }
}

/** A temporary session is void once the owner changes COURSE_TEMP_EPOCH. */
function tempSessionStillAllowed(token) {
  try {
    const claims = JSON.parse(Buffer.from(String(token).split('.')[0], 'base64url').toString('utf8'));
    return !claims.tmp || claims.t === tempEpoch();
  } catch (e) {
    return false;
  }
}

function withExpiry(content, ms) {
  // content is the cached JSON string '{"modules":[...]}'; add one field without re-serialising it
  return content.slice(0, -1) + ',"expiresInMs":' + Math.floor(ms) + '}';
}

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  String(header)
    .split(';')
    .forEach((pair) => {
      const i = pair.indexOf('=');
      if (i > 0) out[pair.slice(0, i).trim()] = pair.slice(i + 1).trim();
    });
  return out;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function recentFails(ip, now) {
  const entry = failLog.get(ip);
  if (!entry) return 0;
  if (now - entry.first > FAIL_WINDOW_MS) {
    failLog.delete(ip);
    return 0;
  }
  return entry.count;
}

function recordFail(ip, now) {
  if (failLog.size >= MAX_TRACKED_IPS) {
    for (const [key, entry] of failLog) if (now - entry.first > FAIL_WINDOW_MS) failLog.delete(key);
    if (failLog.size >= MAX_TRACKED_IPS) failLog.clear();
  }
  const entry = failLog.get(ip);
  if (!entry || now - entry.first > FAIL_WINDOW_MS) failLog.set(ip, { count: 1, first: now });
  else entry.count += 1;
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(typeof payload === 'string' ? payload : JSON.stringify(payload));
}

/** Reads {password} from the request. Works with Vercel's pre-parsed body and with raw streams. */
async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (tooLarge) return; // keep draining so the 413 can be delivered, but stop buffering
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        tooLarge = true;
        chunks.length = 0;
        reject(new Error('too_large'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin GETs and non-browser clients send none
  try {
    return new URL(origin).host === req.headers.host;
  } catch (e) {
    return false;
  }
}

function createCourseHandler({ course, passwordEnv, modules }) {
  const cookieName = 'tj_' + course;
  const cookiePath = '/api/' + course;
  const content = JSON.stringify({ modules }); // serialised once per warm instance

  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'private, no-store, max-age=0');
    res.setHeader('Vary', 'Cookie');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const secret = process.env.COURSE_COOKIE_SECRET;
    const password = process.env[passwordEnv];
    if (!secret || secret.length < 32 || !password) {
      return sendJson(res, 503, { error: 'not_configured' });
    }

    const now = Date.now();

    if (req.method === 'GET') {
      const token = parseCookies(req.headers.cookie)[cookieName];
      if (verifyToken(secret, token, course, now) && tempSessionStillAllowed(token)) {
        const left = tempRemainingMs(token, now);
        return sendJson(res, 200, left === null ? content : withExpiry(content, left));
      }
      return sendJson(res, 401, { error: 'unauthorized' });
    }

    if (req.method === 'POST') {
      if (!sameOrigin(req)) return sendJson(res, 403, { error: 'forbidden' });

      const ip = clientIp(req);
      if (recentFails(ip, now) >= MAX_FAILS) {
        res.setHeader('Retry-After', String(Math.ceil(FAIL_WINDOW_MS / 1000)));
        return sendJson(res, 429, { error: 'too_many_attempts' });
      }

      let submitted = '';
      let action = '';
      let minutes = TEMP_DEFAULT_MINUTES;
      try {
        const data = await readJsonBody(req);
        if (data && typeof data.password === 'string' && data.password.length <= MAX_PASSWORD_LENGTH) {
          submitted = data.password;
        }
        if (data && data.action === 'mint') {
          action = 'mint';
          if (data.minutes !== undefined) minutes = Number(data.minutes);
        }
      } catch (e) {
        if (e && e.message === 'too_large') {
          res.setHeader('Connection', 'close');
          res.on('finish', () => req.destroy());
          return sendJson(res, 413, { error: 'payload_too_large' });
        }
        return sendJson(res, 400, { error: 'bad_request' });
      }

      const ownerOk = !!submitted && safeEqual(submitted, password);

      if (action === 'mint') {
        if (!ownerOk) {
          recordFail(ip, now);
          await sleep(FAIL_DELAY_MS);
          return sendJson(res, 401, { error: 'invalid_password' });
        }
        failLog.delete(ip);
        if (!Number.isInteger(minutes) || minutes < TEMP_MIN_MINUTES || minutes > TEMP_MAX_MINUTES) {
          return sendJson(res, 400, { error: 'bad_minutes', min: TEMP_MIN_MINUTES, max: TEMP_MAX_MINUTES });
        }
        const expiryMs = Math.floor((now + minutes * 60000) / 1000) * 1000;
        return sendJson(res, 200, {
          code: makeTempCode(secret, course, expiryMs),
          expiresAt: new Date(expiryMs).toISOString(),
          minutes,
        });
      }

      if (ownerOk) {
        failLog.delete(ip);
        const secure = req.headers['x-forwarded-proto'] === 'https' || !!process.env.VERCEL ? '; Secure' : '';
        // Session cookie (no Max-Age): ends with the browser session, like the old sessionStorage flag,
        // and is additionally expired server-side after SESSION_TTL_MS.
        res.setHeader(
          'Set-Cookie',
          cookieName + '=' + makeToken(secret, course, now) + '; Path=' + cookiePath + '; HttpOnly; SameSite=Lax' + secure
        );
        return sendJson(res, 200, content);
      }

      const tempExpiry = submitted ? checkTempCode(secret, course, submitted, now) : 0;
      if (tempExpiry) {
        failLog.delete(ip);
        const { token, end } = makeTempToken(secret, course, now, tempExpiry);
        const secure = req.headers['x-forwarded-proto'] === 'https' || !!process.env.VERCEL ? '; Secure' : '';
        res.setHeader(
          'Set-Cookie',
          cookieName + '=' + token + '; Path=' + cookiePath + '; HttpOnly; SameSite=Lax' + secure
        );
        return sendJson(res, 200, withExpiry(content, end - now));
      }

      recordFail(ip, now);
      await sleep(FAIL_DELAY_MS);
      return sendJson(res, 401, { error: 'invalid_password' });
    }

    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'method_not_allowed' });
  };
}

module.exports = createCourseHandler;
module.exports._internals = { makeToken, verifyToken, safeEqual, parseCookies, failLog, SESSION_TTL_MS, makeTempCode, checkTempCode };
