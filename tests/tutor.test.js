'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const crypto = require('node:crypto');

process.env.COURSE_COOKIE_SECRET = crypto.randomBytes(32).toString('hex');
process.env.COURSE_PASSWORD_LITERACY = 'owner-lit';
process.env.COURSE_PASSWORD_ANALYST = 'owner-ana';
for (const k of ['GROQ_API_KEY', 'GEMINI_API_KEY', 'OPENROUTER_API_KEY', 'ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'TUTOR_PROVIDERS', 'TUTOR_ENABLED']) delete process.env[k];

const literacy = require('../api/literacy.js');
const tutor = require('../api/_lib/tutor.js');
const { _internals } = require('../api/_lib/course-handler.js');
const realFetch = global.fetch;

let server, base, calls;
test.before(async () => {
  server = http.createServer((req, res) => (req.url.startsWith('/api/literacy') ? literacy(req, res) : (res.statusCode = 404, res.end())));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + server.address().port;
});
test.after(() => { global.fetch = realFetch; server.close(); });
test.beforeEach(() => { _internals.failLog.clear(); tutor._usage.clear(); calls = []; global.fetch = realFetch; });

function stub(handlers) {
  global.fetch = async (url, init) => {
    if (String(url).startsWith(base)) return realFetch(url, init);
    calls.push({ url: String(url), init });
    const h = handlers.find((x) => String(url).includes(x.match));
    return h.reply(init);
  };
}
const ok = (text) => ({ ok: true, status: 200, json: async () => ({ choices: [{ message: { content: text } }] }) });
const fail = () => ({ ok: false, status: 429, json: async () => ({}) });
const login = async () => (await realFetch(base + '/api/literacy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: 'owner-lit' }) })).headers.get('set-cookie').split(';')[0];
const ask = (cookie, extra = {}) => realFetch(base + '/api/literacy', { method: 'POST', headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) }, body: JSON.stringify({ action: 'ask', question: 'What is a hash?', module: 13, slide: 7, ...extra }) });

test('needs a signed-in session', async () => {
  process.env.GROQ_API_KEY = 'k';
  assert.equal((await ask(null)).status, 401);
  assert.equal((await ask('tj_literacy=garbage')).status, 401);
  delete process.env.GROQ_API_KEY;
});

test('no key set -> still answers from the lessons (never a dead end)', async () => {
  const c = await login();
  const r = await ask(c);
  assert.equal(r.status, 200);
  const d = await r.json();
  assert.equal(d.provider, 'lessons'); assert.equal(d.tier, 'local');
  assert.match(d.answer, /Encryption and Hashing|hash/i);
});

test('owner can test the providers; learners and wrong passwords cannot', async () => {
  const post = (b) => realFetch(base + '/api/literacy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) });
  assert.equal((await post({ action: 'tutor_test', password: 'nope' })).status, 401);
  const none = await (await post({ action: 'tutor_test', password: 'owner-lit' })).json();
  assert.equal(none.results[0].ok, false);
  process.env.GROQ_API_KEY = 'secret-abc';
  stub([{ match: 'groq.com', reply: () => ({ ok: false, status: 401, json: async () => ({}) }) }]);
  const bad = await post({ action: 'tutor_test', password: 'owner-lit' });
  const txt = await bad.text();
  assert.doesNotMatch(txt, /secret-abc/);
  assert.match(txt, /refused the request/);
  delete process.env.GROQ_API_KEY;
});

test('free provider answers first, and the lesson text is sent as context', async () => {
  process.env.GROQ_API_KEY = 'gk'; process.env.ANTHROPIC_API_KEY = 'ak';
  stub([{ match: 'groq.com', reply: () => ok('A hash is a one-way fingerprint.') }]);
  const r = await ask(await login());
  const d = await r.json();
  assert.equal(r.status, 200);
  assert.equal(d.provider, 'groq'); assert.equal(d.tier, 'free');
  assert.equal(calls.length, 1);
  const sent = JSON.parse(calls[0].init.body);
  assert.match(sent.messages[0].content, /Encryption and Hashing/);
  assert.equal(calls[0].init.headers.authorization, 'Bearer gk');
  delete process.env.GROQ_API_KEY; delete process.env.ANTHROPIC_API_KEY;
});

test('falls back to the paid provider when the free one fails', async () => {
  process.env.GROQ_API_KEY = 'gk'; process.env.ANTHROPIC_API_KEY = 'ak';
  stub([{ match: 'groq.com', reply: fail }, { match: 'anthropic.com', reply: () => ({ ok: true, status: 200, json: async () => ({ content: [{ text: 'Paid answer' }] }) }) }]);
  const d = await (await ask(await login())).json();
  assert.equal(d.provider, 'anthropic'); assert.equal(d.tier, 'paid'); assert.equal(d.answer, 'Paid answer');
  delete process.env.GROQ_API_KEY; delete process.env.ANTHROPIC_API_KEY;
});

test('all providers failing -> falls back to the lessons; keys never appear in responses', async () => {
  process.env.GROQ_API_KEY = 'secret-key-123';
  stub([{ match: 'groq.com', reply: fail }]);
  const r = await ask(await login());
  assert.equal(r.status, 200);
  const txt = await r.text();
  assert.match(txt, /"provider":"lessons"/);
  assert.doesNotMatch(txt, /secret-key-123/);
  delete process.env.GROQ_API_KEY;
});

test('per-learner hourly limit and empty question', async () => {
  process.env.GROQ_API_KEY = 'gk'; process.env.TUTOR_RATE_PER_HOUR = '2';
  stub([{ match: 'groq.com', reply: () => ok('x') }]);
  const c = await login();
  assert.equal((await ask(c)).status, 200);
  assert.equal((await ask(c)).status, 200);
  assert.equal((await ask(c)).status, 429);
  assert.equal((await ask(c, { question: ' ' })).status, 400);
  delete process.env.GROQ_API_KEY; delete process.env.TUTOR_RATE_PER_HOUR;
});

test('TUTOR_ENABLED=0 switches it off; stripHtml removes tags and scripts', () => {
  assert.deepEqual(tutor.activeProviders({ TUTOR_ENABLED: '0', GROQ_API_KEY: 'k' }), []);
  assert.equal(tutor.stripHtml('<p>Hi <b>there</b></p><script>x()</script>'), 'Hi there');
});
