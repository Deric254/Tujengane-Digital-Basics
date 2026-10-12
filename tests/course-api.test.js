'use strict';
// Run with: npm test   (uses Node's built-in test runner, no dependencies)
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const crypto = require('node:crypto');

process.env.COURSE_COOKIE_SECRET = crypto.randomBytes(32).toString('hex');
process.env.COURSE_PASSWORD_LITERACY = 'test-literacy-pass';
process.env.COURSE_PASSWORD_ANALYST = 'test-analyst-pass';

const literacy = require('../api/literacy.js');
const analyst = require('../api/analyst.js');
const { _internals } = require('../api/_lib/course-handler.js');

let server, base;
test.before(async () => {
  server = http.createServer((req, res) => {
    if (req.url.startsWith('/api/literacy')) return literacy(req, res);
    if (req.url.startsWith('/api/analyst')) return analyst(req, res);
    res.statusCode = 404; res.end();
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + server.address().port;
});
test.after(() => server.close());
test.beforeEach(() => _internals.failLog.clear());

const post = (path, body, headers = {}) =>
  fetch(base + path, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
const cookieOf = (res) => (res.headers.get('set-cookie') || '').split(';')[0];

test('no cookie -> 401 and NO course content in the body', async () => {
  const res = await fetch(base + '/api/literacy');
  assert.equal(res.status, 401);
  assert.doesNotMatch(await res.text(), /modules|slides/);
});

test('wrong password -> 401, no cookie, no content', async () => {
  const res = await post('/api/literacy', { password: 'literacy2025' }); // the OLD leaked password must not work
  assert.equal(res.status, 401);
  assert.equal(res.headers.get('set-cookie'), null);
  assert.doesNotMatch(await res.text(), /slides/);
});

test('correct password -> 200 with 13 modules, hardened cookie, no-store', async () => {
  const res = await post('/api/literacy', { password: 'test-literacy-pass' });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.modules.length, 13);
  assert.ok(data.modules[0].slides[0].title && data.modules[0].slides[0].content);
  const sc = res.headers.get('set-cookie');
  assert.match(sc, /^tj_literacy=/);
  assert.match(sc, /HttpOnly/); assert.match(sc, /SameSite=Lax/); assert.match(sc, /Path=\/api\/literacy/);
  assert.match(res.headers.get('cache-control'), /no-store/);
});

test('valid cookie restores the session on GET (page reload path)', async () => {
  const login = await post('/api/analyst', { password: 'test-analyst-pass' });
  const res = await fetch(base + '/api/analyst', { headers: { cookie: cookieOf(login) } });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).modules.length, 13);
});

test('cookie for one course does NOT unlock the other', async () => {
  const login = await post('/api/literacy', { password: 'test-literacy-pass' });
  const forged = cookieOf(login).replace('tj_literacy', 'tj_analyst');
  assert.equal((await fetch(base + '/api/analyst', { headers: { cookie: forged } })).status, 401);
});

test('tampered / garbage / unsigned cookies are rejected', async () => {
  const login = await post('/api/literacy', { password: 'test-literacy-pass' });
  const good = cookieOf(login);
  const [name, token] = good.split('=');
  const [payload, sig] = token.split('.');
  const evil = Buffer.from(JSON.stringify({ c: 'literacy', e: Date.now() + 9e9 })).toString('base64url');
  for (const bad of [`${name}=${evil}.${sig}`, `${name}=${payload}.AAAA`, `${name}=${payload}`, `${name}=`, `${name}=x.y.z`, 'tj_literacy=true']) {
    assert.equal((await fetch(base + '/api/literacy', { headers: { cookie: bad } })).status, 401, bad);
  }
});

test('expired session is rejected', () => {
  const secret = process.env.COURSE_COOKIE_SECRET;
  const longAgo = Date.now() - _internals.SESSION_TTL_MS - 1000;
  const token = _internals.makeToken(secret, 'literacy', longAgo);
  assert.equal(_internals.verifyToken(secret, token, 'literacy', Date.now()), false);
  assert.equal(_internals.verifyToken(secret, _internals.makeToken(secret, 'literacy', Date.now()), 'literacy', Date.now()), true);
});

test('brute force is throttled with 429 after repeated failures', async () => {
  let last;
  for (let i = 0; i < 9; i++) last = await post('/api/literacy', { password: 'guess' + i });
  assert.equal(last.status, 429);
  assert.ok(last.headers.get('retry-after'));
  // even the right password is refused while throttled
  assert.equal((await post('/api/literacy', { password: 'test-literacy-pass' })).status, 429);
});

test('cross-origin POST is refused', async () => {
  const res = await post('/api/literacy', { password: 'test-literacy-pass' }, { origin: 'https://evil.example' });
  assert.equal(res.status, 403);
});

test('bad input: malformed JSON, non-string, oversized, empty', async () => {
  const bad = await fetch(base + '/api/literacy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{nope' });
  assert.equal(bad.status, 400);
  assert.equal((await post('/api/literacy', { password: 12345 })).status, 401);
  assert.equal((await post('/api/literacy', { password: '' })).status, 401);
  assert.equal((await post('/api/literacy', { password: 'x'.repeat(300) })).status, 401); // over the length cap
  assert.equal((await post('/api/literacy', { password: 'x'.repeat(5000) })).status, 413); // over the body cap
});

test('other methods -> 405', async () => {
  for (const method of ['PUT', 'DELETE', 'PATCH']) assert.equal((await fetch(base + '/api/literacy', { method })).status, 405);
});

test('unconfigured server fails closed with 503 (never open)', async () => {
  const saved = process.env.COURSE_PASSWORD_LITERACY; delete process.env.COURSE_PASSWORD_LITERACY;
  assert.equal((await fetch(base + '/api/literacy')).status, 503);
  assert.equal((await post('/api/literacy', { password: '' })).status, 503);
  process.env.COURSE_PASSWORD_LITERACY = saved;
  const s2 = process.env.COURSE_COOKIE_SECRET; process.env.COURSE_COOKIE_SECRET = 'short';
  assert.equal((await fetch(base + '/api/literacy')).status, 503);
  process.env.COURSE_COOKIE_SECRET = s2;
});
