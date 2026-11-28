'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const lit = require('../api/_data/literacy.json');
const ana = require('../api/_data/analyst.json');
const cyber = lit.find((m) => /^Cybersecurity/.test(m.title));
const py = ana.find((m) => /^Python Fundamentals/.test(m.title));

for (const [name, mod] of [['cyber', cyber], ['python', py]]) {
  test(name + ' module: every slide has a quiz, 3 details, 1 layers, no scripts', () => {
    assert.ok(mod && mod.slides.length >= 15);
    for (const s of mod.slides) {
      assert.equal((s.content.match(/class="layers"|class='layers'/g) || []).length, 1, s.title);
      assert.equal((s.content.match(/<details/g) || []).length, 3, s.title);
      assert.ok(/tj-quiz/.test(s.content), 'quiz: ' + s.title);
      assert.doesNotMatch(s.content, /<script|\son\w+\s*=|javascript:/i);
      for (const m of s.content.matchAll(/data-correct=["'](\d+)["']/g)) {
        const q = s.content.slice(m.index - 2000, m.index + 2000);
        assert.ok(Number(m[1]) >= 0, s.title);
      }
    }
  });
}
test('capstone is the last module in both courses', () => {
  assert.match(lit[lit.length - 1].title, /^Capstone/);
  assert.match(ana[ana.length - 1].title, /^Capstone/);
});
test('sidebar module count matches data in both course pages', () => {
  for (const [dir, file, data] of [['Tujengane Computer Literacy', 'computerliteracy.html', lit], ['Tujengane Analyst Pro', 'analystpro.html', ana]]) {
    const html = fs.readFileSync(path.join(root, dir, file), 'utf8');
    assert.equal((html.match(/class="module-toggle[ "]/g) || []).length, data.length, file);
    assert.match(html, /labs\.js/);
  }
});
test('playground page exists, is noindex and loads the labs engine', () => {
  const html = fs.readFileSync(path.join(root, 'playground', 'index.html'), 'utf8');
  assert.match(html, /noindex/);
  assert.match(html, /labs\.js/);
  assert.match(html, /\/api\/literacy/);
});
test('Pyodide is self-hosted (no CDN)', () => {
  assert.ok(fs.existsSync(path.join(root, 'assets/vendor/pyodide/pyodide.asm.wasm')));
  assert.doesNotMatch(fs.readFileSync(path.join(root, 'assets/js/py-worker.js'), 'utf8'), /cdn\.jsdelivr|https?:\/\//);
});

test('every module except the capstone ends with a "Lock It In" recap that follows the 3-layer format', () => {
  for (const data of [lit, ana]) {
    data.slice(0, -1).forEach((m) => {
      const s = m.slides[m.slides.length - 1];
      assert.equal(s.title, 'Lock It In: Module Recap', m.title);
      assert.equal((s.content.match(/<details/g) || []).length, 3);
      assert.equal((s.content.match(/class="layers"/g) || []).length, 1);
      assert.ok((s.content.match(/<li>/g) || []).length >= 10, 'has takeaways, questions and answers');
    });
    assert.notEqual(data[data.length - 1].slides[data[data.length - 1].slides.length - 1].title, 'Lock It In: Module Recap');
  }
});
test('SQL and Python labs are embedded in the existing Analyst lessons', () => {
  const sql = ana[5].slides.filter((s) => /data-lab="sql"/.test(s.content)).length;
  const py = ana[9].slides.filter((s) => /data-lab="python"/.test(s.content)).length;
  assert.ok(sql >= 5 && py >= 2);
});
test('one floating helper only: tutor.js hides the old bubbles and adds no second button', () => {
  const css = fs.readFileSync(path.join(root, 'assets/css/tutor.css'), 'utf8');
  assert.match(css, /body\.tjh #chatButton/);
  assert.match(css, /#floatingHomeBtn/);
  const js = fs.readFileSync(path.join(root, 'assets/js/tutor.js'), 'utf8');
  assert.equal((js.match(/appendChild\(launcher\)/g) || []).length, 1);
});

test('help panel docks beside the lesson with a Try it box wired to the AI', () => {
  const js = fs.readFileSync(path.join(root, 'assets/js/tutor.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'assets/css/tutor.css'), 'utf8');
  const labs = fs.readFileSync(path.join(root, 'assets/js/labs.js'), 'utf8');
  for (const k of ['tjh-dock', "'Practice'", 'Explain result', 'Check attempt', 'Challenge me', 'mountPython', 'mountSql', 'placeLauncher', 'toggleFs', 'requestFullscreen']) assert.ok(js.includes(k), k);
  assert.match(css, /body\.tjh-docked-open\s*\{\s*padding-right/);
  assert.ok((labs.match(/getOutput/g) || []).length >= 2, 'both labs expose their output');
});

test('docked help panel is resizable, remembers its size and keeps page bars clear of it', () => {
  const js = fs.readFileSync(path.join(root, 'assets/js/tutor.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'assets/css/tutor.css'), 'utf8');
  for (const k of ['tjh-grip', 'pointerdown', 'ArrowLeft', 'dblclick', "setPref('w'", 'fitBars']) assert.ok(js.includes(k), k);
  assert.match(css, /--tjh-w/); assert.match(css, /--tjh-h/);
});

test('static assets are cached (big engines never re-download), course data is not', () => {
  const v = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  const rule = (src) => (v.headers.find((h) => h.source === src) || {}).headers;
  assert.match(rule('/assets/vendor/(.*)')[0].value, /immutable/);
  assert.ok(rule('/assets/(js|css)/(.*)'));
  assert.ok(!v.headers.some((h) => /api/.test(h.source) && h.headers.some((x) => x.key === 'Cache-Control' && /immutable|max-age=[1-9]/.test(x.value))), 'API responses stay uncached');
  assert.equal(v.functions['api/*.js'].maxDuration, 30);
});

test('Excel and pivot labs exist, avoid eval, and are embedded in spreadsheet lessons', () => {
  const fs = require('fs'), path = require('path'), assert = require('assert');
  const js = fs.readFileSync(path.join(__dirname, '..', 'assets/js/labs.js'), 'utf8');
  assert.ok(/LABS\.excel\s*=/.test(js) && /LABS\.pivot\s*=/.test(js));
  assert.ok(!/\beval\s*\(|new Function\s*\(/.test(js));
  const count = (c, n) => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/_data', c + '.json'), 'utf8'))
    .reduce((s, m) => s + m.slides.filter(x => x.content.includes('data-lab="' + n + '"')).length, 0);
  assert.ok(count('analyst', 'excel') >= 1 && count('analyst', 'pivot') >= 2 && count('literacy', 'excel') >= 2);
});

test('guided labs (linux, git, api, scrape) are registered and the API lesson embeds api + scrape', () => {
  const fs = require('fs'), path = require('path'), assert = require('assert');
  const js = fs.readFileSync(path.join(__dirname, '..', 'assets/js/labs.js'), 'utf8');
  ['linux', 'git', 'api', 'scrape'].forEach(n => assert.ok(new RegExp('LABS\\.' + n + '\\s*=').test(js), n));
  const a = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/_data/analyst.json'), 'utf8'));
  const c = a[1].slides[4].content;
  assert.ok(c.includes('data-lab="api"') && c.includes('data-lab="scrape"'));
});

test('review-debt gate exists in the tutor script and styles', () => {
  const fs = require('fs'), path = require('path'), assert = require('assert');
  assert.ok(/REVIEW_DEBT/.test(fs.readFileSync(path.join(__dirname, '..', 'assets/js/tutor.js'), 'utf8')));
  assert.ok(/tjh-gate/.test(fs.readFileSync(path.join(__dirname, '..', 'assets/css/tutor.css'), 'utf8')));
});

test('sign-in screens show errors inline and offer a show-password control', () => {
  const fs = require('fs'), path = require('path'), assert = require('assert'), r = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  for (const f of ['Tujengane Analyst Pro/js/scripts.js', 'Tujengane Computer Literacy/js/scripts.js']) { const s = r(f); assert.ok(s.includes('id="pwErr"') && s.includes('Signing in...') && s.includes('pwToggle'), f); }
  const pg = r('playground/index.html'); assert.ok(pg.includes('id="eye"') && pg.includes('Signing in...'));
  assert.ok(r('temp-access.html').includes('eyebtn'));
});

test('performance guards: analytics loads async, confetti deferred, no live blur on scrolling sidebar', () => {
  const fs = require('fs'), path = require('path'), assert = require('assert'), r = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  for (const f of ['Tujengane Analyst Pro/analystpro.html', 'Tujengane Computer Literacy/computerliteracy.html', 'Tujengane data basics/databasics.html', 'computer basicss/computerbasicss.html']) {
    const s = r(f); assert.ok(!/<script src="https:\/\/cdn\.amplitude\.com/.test(s), f + ' amplitude blocks parsing'); assert.ok(!/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/canvas-confetti/.test(s), f + ' confetti blocks parsing');
  }
  assert.ok(/module-toggle[^}]*backdrop-filter: none/.test(r('assets/css/tutor.css')));
});
