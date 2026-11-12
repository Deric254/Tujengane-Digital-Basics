'use strict';
// Guards assets/css/scroll.css: the one scroll model for the four lesson pages. On phones, small tablets and
// short screens the PAGE must scroll (no clipping wrapper, no scroll-blocking overscroll). Run with: npm test
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const pages = [
  'Tujengane data basics/databasics.html',
  'computer basicss/computerbasicss.html',
  'Tujengane Analyst Pro/analystpro.html',
  'Tujengane Computer Literacy/computerliteracy.html',
];
const scrollCss = fs.readFileSync(path.join(root, 'assets', 'css', 'scroll.css'), 'utf8');

test('every lesson page loads scroll.css after chrome.css', () => {
  for (const p of pages) {
    const html = fs.readFileSync(path.join(root, p), 'utf8');
    const chrome = html.indexOf('assets/css/chrome.css');
    const scroll = html.indexOf('assets/css/scroll.css');
    assert.ok(scroll > -1, p + ' must link assets/css/scroll.css');
    assert.ok(scroll > chrome && chrome > -1, p + ': scroll.css must come after chrome.css');
  }
});

test('flow mode unclips the lesson and releases the page scroll', () => {
  assert.match(scrollCss, /@media \(max-width: 768px\), \(max-height: 599px\)/);
  const flow = scrollCss.slice(scrollCss.indexOf('@media (max-width: 768px), (max-height: 599px)'));
  assert.match(flow, /\.slide-container-wrapper[\s\S]*overflow: visible !important/);
  assert.match(flow, /overscroll-behavior: auto !important/);
  assert.doesNotMatch(flow.split('@media (min-width: 769px)')[0], /overscroll-behavior:\s*none/);
});

test('the paid courses no longer hijack scrolling keys', () => {
  for (const p of ['Tujengane Analyst Pro/js/scripts.js', 'Tujengane Computer Literacy/js/scripts.js']) {
    const js = fs.readFileSync(path.join(root, p), 'utf8');
    for (const k of ["'PageDown'", "'PageUp'", "'Home'", "'End'"]) {
      assert.ok(!js.includes(k), p + ' must not use ' + k + ' for slide navigation');
    }
  }
});
