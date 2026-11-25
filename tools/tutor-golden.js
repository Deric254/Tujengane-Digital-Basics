'use strict';
/* Runs the fixed golden questions against YOUR configured AI provider(s) and reports pass/fail.
   Usage:  set your key (for example GROQ_API_KEY=...) then:  npm run tutor:golden
   Use it whenever you change the model, the prompt or the lessons. Exit code 1 means at least one question failed. */
const fs = require('fs');
const path = require('path');
const tutor = require('../api/_lib/tutor.js');
try { const f = path.join(__dirname, '..', '.env.local'); if (fs.existsSync(f)) fs.readFileSync(f, 'utf8').split(/\r?\n/).forEach((l) => { const m = /^([A-Z0-9_]+)=(.*)$/.exec(l.trim()); if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2]; }); } catch (e) {}
const list = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tests', 'data', 'golden-tutor.json'), 'utf8'));
(async () => {
  if (!tutor.activeProviders(process.env).length) { console.log('No AI key found. Add GROQ_API_KEY or GEMINI_API_KEY to .env.local first.'); process.exit(2); }
  let bad = 0;
  for (const g of list) {
    const r = await tutor.ask({ course: 'analyst', modules: [], body: { question: g.q, module: -1, slide: -1 }, learnerId: 'golden:' + g.id, env: Object.assign({}, process.env, { TUTOR_RATE_PER_HOUR: '1000', TUTOR_DAILY_CAP: '100000' }), now: Date.now() });
    const a = r.status === 200 ? String(r.body.answer) : '';
    const okMust = g.must.every((p) => new RegExp(p, 'i').test(a));
    const okNot = g.not.every((p) => !new RegExp(p, 'i').test(a));
    const pass = r.status === 200 && r.body.provider !== 'lessons' && okMust && okNot;
    if (!pass) bad++;
    console.log((pass ? 'PASS ' : 'FAIL ') + g.id.padEnd(16) + (pass ? '' : '  [' + (r.status !== 200 ? 'status ' + r.status + ' ' + ((r.body && r.body.code) || '') : !okMust ? 'missing expected wording' : 'contains forbidden wording') + '] ' + a.slice(0, 120).replace(/\s+/g, ' ')));
  }
  console.log('\n' + (list.length - bad) + ' of ' + list.length + ' passed.');
  process.exit(bad ? 1 : 0);
})();
