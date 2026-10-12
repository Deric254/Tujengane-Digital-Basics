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
      if (verifyToken(secret, token, course, now)) return sendJson(res, 200, content);
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
      try {
        const data = await readJsonBody(req);
        if (data && typeof data.password === 'string' && data.password.length <= MAX_PASSWORD_LENGTH) {
          submitted = data.password;
        }
      } catch (e) {
        if (e && e.message === 'too_large') {
          res.setHeader('Connection', 'close');
          res.on('finish', () => req.destroy());
          return sendJson(res, 413, { error: 'payload_too_large' });
        }
        return sendJson(res, 400, { error: 'bad_request' });
      }

      if (submitted && safeEqual(submitted, password)) {
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

      recordFail(ip, now);
      await sleep(FAIL_DELAY_MS);
      return sendJson(res, 401, { error: 'invalid_password' });
    }

    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'method_not_allowed' });
  };
}

module.exports = createCourseHandler;
module.exports._internals = { makeToken, verifyToken, safeEqual, parseCookies, failLog, SESSION_TTL_MS };
