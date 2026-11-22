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
