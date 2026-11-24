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
  for (const k of ['tjh-dock', "'Try it'", "'Both'", 'Explain my result', 'Check my attempt', 'Challenge me', 'mountPython', 'mountSql']) assert.ok(js.includes(k), k);
  assert.match(css, /body\.tjh-docked-open\s*\{\s*padding-right/);
  assert.ok((labs.match(/getOutput/g) || []).length >= 2, 'both labs expose their output');
});

test('docked help panel is resizable, remembers its size and keeps page bars clear of it', () => {
  const js = fs.readFileSync(path.join(root, 'assets/js/tutor.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'assets/css/tutor.css'), 'utf8');
  for (const k of ['tjh-grip', 'pointerdown', 'ArrowLeft', 'dblclick', "setPref('w'", 'fitBars']) assert.ok(js.includes(k), k);
  assert.match(css, /--tjh-w/); assert.match(css, /--tjh-h/);
});
