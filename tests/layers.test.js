'use strict'
// Every lesson slide must carry its layers and the pages must load their stylesheet.
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const root = path.join(__dirname, '..')

const countLayers = (h) => (h.match(/class="layers"/g) || []).length

for (const course of ['analyst', 'literacy']) {
  test(`${course}: every slide has Practice, Expert and Check layers`, () => {
    const modules = require(`../api/_data/${course}.json`)
    let n = 0
    for (const m of modules) for (const s of m.slides) {
      n++
      assert.equal(countLayers(s.content), 1, `${m.title} / ${s.title}`)
      assert.ok((s.content.match(/<details/g) || []).length === 3, `${s.title}: three layers`)
      assert.ok(!/<script|onerror=|javascript:/i.test(s.content), `${s.title}: no active content`)
    }
    assert.ok(n >= 160)
  })
}

for (const [dir, n] of [['Tujengane data basics', 22], ['computer basicss', 22]]) {
  test(`${dir}: all ${n} slides have layers`, () => {
    for (let i = 1; i <= n; i++) {
      const h = fs.readFileSync(path.join(root, dir, 'slides', `slide${i}.html`), 'utf8')
      assert.equal(countLayers(h), 1, `slide ${i}`)
    }
  })
}

test('all four course pages load layers.css', () => {
  for (const p of ['Tujengane Analyst Pro/analystpro.html', 'Tujengane Computer Literacy/computerliteracy.html', 'Tujengane data basics/databasics.html', 'computer basicss/computerbasicss.html']) {
    assert.match(fs.readFileSync(path.join(root, p), 'utf8'), /assets\/css\/layers\.css/, p)
  }
  assert.ok(fs.existsSync(path.join(root, 'assets/css/layers.css')))
})

test('course footers compute the year instead of hard-coding it', () => {
  for (const p of ['Tujengane Analyst Pro/analystpro.html', 'Tujengane Computer Literacy/computerliteracy.html', 'Tujengane data basics/databasics.html', 'computer basicss/computerbasicss.html']) {
    const h = fs.readFileSync(path.join(root, p), 'utf8')
    assert.match(h, /assets\/js\/year\.js/, p)
    assert.doesNotMatch(h, /&copy; 2025/, p)
  }
})

test('free decks load the professional deck stylesheet and keep every hook the script needs', () => {
  for (const [p, n] of [['Tujengane data basics/databasics.html', 22], ['computer basicss/computerbasicss.html', 22]]) {
    const h = fs.readFileSync(path.join(root, p), 'utf8')
    assert.match(h, /assets\/css\/deck\.css/, p)
    for (const id of ['slide-container', 'prevBtn', 'nextBtn', 'slide-indicator', 'current-slide', 'slide-navigator-modal', 'slide-grid']) {
      assert.ok(h.includes(`id="${id}"`), `${p}: #${id}`)
    }
    assert.equal((h.match(/class="sidebar-item"/g) || []).length, n, `${p}: sidebar items`)
  }
  const css = fs.readFileSync(path.join(root, 'assets/css/deck.css'), 'utf8')
  assert.ok(!/position:\s*fixed|(^|[^-])height:\s*\d+px\s*!important/.test(css), 'deck.css must not touch the pinned header/footer')
})

test('all four course pages share one side panel stylesheet, loaded after chrome.css', () => {
  for (const p of ['Tujengane Analyst Pro/analystpro.html', 'Tujengane Computer Literacy/computerliteracy.html', 'Tujengane data basics/databasics.html', 'computer basicss/computerbasicss.html']) {
    const h = fs.readFileSync(path.join(root, p), 'utf8')
    assert.ok(h.indexOf('assets/css/course-nav.css') > h.indexOf('assets/css/chrome.css') && h.includes('assets/css/chrome.css'), p)
  }
  const css = fs.readFileSync(path.join(root, 'assets/css/course-nav.css'), 'utf8')
  assert.ok(!/position:\s*fixed|(^|[^-])height:\s*\d+px\s*!important/.test(css), 'course-nav.css must not touch the pinned header/footer')
})
