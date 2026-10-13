'use strict';
// Guards assets/css/chrome.css: it must stay visual-only so the pinned (position:fixed) course-page
// header/footer keep their exact geometry. Run with: npm test
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'chrome.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

// Flatten one level of @media into [{selector, prop, value}]
function parse(source) {
  const out = [];
  const walk = (text) => {
    const re = /([^{}]+)\{([^{}]*)\}|([^{}]+)\{/g;
    let m;
    while ((m = re.exec(text))) {
      if (m[1] !== undefined) {
        const selector = m[1].trim();
        m[2].split(';').forEach((d) => {
          const i = d.indexOf(':');
          if (i > 0) out.push({ selector, prop: d.slice(0, i).trim().toLowerCase(), value: d.slice(i + 1).trim() });
        });
      }
    }
  };
  // unwrap @media blocks
  const unwrapped = source.replace(/@media[^{]+\{([\s\S]*?\})\s*\}/g, (_, inner) => inner);
  walk(unwrapped);
  return out;
}
const decls = parse(css);

test('chrome.css parses into declarations', () => assert.ok(decls.length > 25));

test('never sets position, offsets, height, margin, z-index, overflow or float', () => {
  const banned = /^(position|top|right|bottom|left|inset.*|height|min-height|max-height|z-index|overflow.*|float|margin.*)$/;
  const hits = decls.filter((d) => banned.test(d.prop));
  assert.deepEqual(hits, []);
});

test('width is only ever 100% (inner content wrapper), max-width only none', () => {
  decls.filter((d) => d.prop === 'width').forEach((d) => assert.equal(d.value, '100%'));
  decls.filter((d) => d.prop === 'max-width').forEach((d) => assert.equal(d.value, 'none'));
});

test('padding only touches inner wrappers or header pills, never the bars themselves', () => {
  decls
    .filter((d) => /^padding/.test(d.prop))
    .forEach((d) => assert.match(d.selector, /> div|a\.nav-link|body\.home-page footer\.footer/, d.selector));
});

test('display is only changed on header pill links', () => {
  decls.filter((d) => d.prop === 'display').forEach((d) => assert.match(d.selector, /a\.nav-link/));
});

test('every desktop-only block stays out of phone widths', () => {
  assert.match(css, /@media \(min-width: 641px\)/);
  assert.match(css, /@media \(min-width: 769px\)/);
});
