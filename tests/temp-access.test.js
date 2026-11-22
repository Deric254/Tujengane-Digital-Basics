'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const crypto = require('node:crypto');

process.env.COURSE_COOKIE_SECRET = crypto.randomBytes(32).toString('hex');
process.env.COURSE_PASSWORD_LITERACY = 'owner-lit';
process.env.COURSE_PASSWORD_ANALYST = 'owner-ana';
delete process.env.COURSE_TEMP_EPOCH;

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

const post = (p, body) => fetch(base + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
const cookieOf = (r) => (r.headers.get('set-cookie') || '').split(';')[0];
const mint = (p, pw, minutes) => post(p, { action: 'mint', password: pw, minutes });

test('minting needs the owner password', async () => {
  assert.equal((await mint('/api/literacy', 'wrong', 60)).status, 401);
  const ok = await mint('/api/literacy', 'owner-lit', 60);
  assert.equal(ok.status, 200);
  const d = await ok.json();
  assert.ok(d.code && d.expiresAt && d.minutes === 60);
});

test('temp code unlocks its own course only, and the session carries expiresInMs', async () => {
  const { code } = await (await mint('/api/literacy', 'owner-lit', 180)).json();
  const res = await post('/api/literacy', { password: code });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.modules.length, 15);
  assert.ok(data.expiresInMs > 0 && data.expiresInMs <= 180 * 60 * 1000);
  const again = await fetch(base + '/api/literacy', { headers: { cookie: cookieOf(res) } });
  assert.equal(again.status, 200);
  assert.ok((await again.json()).expiresInMs > 0);
  assert.equal((await post('/api/analyst', { password: code })).status, 401);
});

test('owner login is unaffected and has no expiry', async () => {
  const res = await post('/api/literacy', { password: 'owner-lit' });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).expiresInMs, undefined);
});

test('expired and tampered codes are rejected', () => {
  const s = process.env.COURSE_COOKIE_SECRET;
  const dead = _internals.makeTempCode(s, 'literacy', Date.now() - 1000);
  assert.equal(_internals.checkTempCode(s, dead, 'literacy', Date.now()), false);
  const live = _internals.makeTempCode(s, 'literacy', Date.now() + 60000);
  assert.equal(_internals.checkTempCode(s, live, 'literacy', Date.now()), true);
  assert.equal(_internals.checkTempCode(s, live, 'analyst', Date.now()), false);
  assert.equal(_internals.checkTempCode(s, live.slice(0, -1) + (live.endsWith('A') ? 'B' : 'A'), 'literacy', Date.now()), false);
});

test('changing COURSE_TEMP_EPOCH voids codes and live sessions', async () => {
  const { code } = await (await mint('/api/literacy', 'owner-lit', 60)).json();
  const res = await post('/api/literacy', { password: code });
  const cookie = cookieOf(res);
  assert.equal(res.status, 200);
  process.env.COURSE_TEMP_EPOCH = '2';
  try {
    assert.equal((await fetch(base + '/api/literacy', { headers: { cookie } })).status, 401);
    assert.equal((await post('/api/literacy', { password: code })).status, 401);
    assert.equal((await post('/api/literacy', { password: 'owner-lit' })).status, 200);
  } finally { delete process.env.COURSE_TEMP_EPOCH; }
});

test('a temp session cannot mint, and bad minutes are rejected', async () => {
  const { code } = await (await mint('/api/literacy', 'owner-lit', 60)).json();
  assert.equal((await mint('/api/literacy', code, 60)).status, 401);
  for (const m of [1, 4, 1441, 'abc']) assert.equal((await mint('/api/literacy', 'owner-lit', m)).status, 400, String(m));
});
