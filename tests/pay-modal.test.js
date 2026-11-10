'use strict'
// Guards the PayPal "Pay now" modal: shared files exist, every page that takes payments loads them,
// and the Instructor page's strict CSP (no inline script or style) is still respected.
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const root = path.join(__dirname, '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

test('the modal files exist and use the PayPal address', () => {
  assert.ok(fs.existsSync(path.join(root, 'assets/css/paypal-pay.css')))
  assert.match(read('assets/js/paypal-pay.js'), /PAYPAL_EMAIL = 'dericmarangu@gmail\.com'/)
})

for (const [page, css, js, min] of [
  ['index.html', 'assets/css/paypal-pay.css', 'assets/js/paypal-pay.js', 2]
]) {
  test(`${page}: loads the modal and has Pay now buttons with amounts`, () => {
    const h = read(page)
    assert.ok(h.includes(`href="${css}"`), 'stylesheet')
    assert.ok(h.includes(`src="${js}"`), 'script')
    const triggers = [...h.matchAll(/<button[^>]*\sdata-pay\s[^>]*>/g)]
    assert.ok(triggers.length >= min, `${triggers.length} triggers`)
    for (const t of triggers) assert.match(t[0], /data-pay-amount="\d+"/, t[0].slice(0, 80))
  })
}

test('the modal script is free of inline-style and eval patterns the Instructor CSP would block', () => {
  const js = read('assets/js/paypal-pay.js')
  assert.doesNotMatch(js, /setAttribute\('style'|\.cssText|eval\(|new Function\(|innerHTML/)
})
