'use strict'
// Guards the home-page UI refinement layer (assets/css/ui.css).
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const root = path.join(__dirname, '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

// split a selector list on commas that are not inside parentheses (e.g. :is(a, button))
const topLevel = (list) => {
  const out = []
  let depth = 0, cur = ''
  for (const ch of list) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = '' } else cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

const css = read('assets/css/ui.css')
const html = read('index.html')

test('ui.css is linked on the home page after chrome.css and before the pay modal css', () => {
  const a = html.indexOf('assets/css/chrome.css')
  const b = html.indexOf('assets/css/ui.css')
  const c = html.indexOf('assets/css/paypal-pay.css')
  assert.ok(a > -1 && b > a && c > b)
})

test('every rule in ui.css is scoped to body.home-page (or is :root / an @media wrapper)', () => {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const flat = []
  const walk = (txt) => {
    let i = 0
    while (i < txt.length) {
      const open = txt.indexOf('{', i)
      if (open < 0) break
      const head = txt.slice(i, open).trim()
      let depth = 1, j = open + 1
      while (j < txt.length && depth) { depth += (txt[j] === '{') - (txt[j] === '}'); j++ }
      const body = txt.slice(open + 1, j - 1)
      if (head.startsWith('@media')) walk(body)
      else flat.push(head)
      i = j
    }
  }
  walk(stripped)
  assert.ok(flat.length > 50, 'parsed ' + flat.length + ' rules')
  for (const head of flat) {
    for (const sel of topLevel(head)) {
      assert.ok(sel === ':root' || sel.startsWith('body.home-page'), 'unscoped selector: ' + sel)
    }
  }
})

test('the markup hooks ui.css relies on exist, and the page keeps its script hooks', () => {
  for (const c of ['ui-values', 'ui-quick', 'ui-testi', 'ui-testi-actions', 'ui-chips', 'ui-ready']) {
    assert.match(html, new RegExp('class="' + c + '"'), c)
  }
  for (const id of ['hamburger-btn', 'hamburger-menu', 'dismiss-banner', 'discount-banner', 'scroll-left', 'scroll-right', 'scroll-indicators', 'premium-section', 'pricing-section', 'primaryCta_data', 'primaryCta_comp', 'whatsappData']) {
    assert.ok(html.includes('id="' + id + '"'), id)
  }
})

test('the head has a single theme-color and the Node version is pinned', () => {
  assert.equal((html.match(/<meta name="theme-color"/g) || []).length, 1)
  assert.equal(JSON.parse(read('package.json')).engines.node, '24.x')
})
