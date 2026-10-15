'use strict';
// Guards the DericBI Instructor product page and its home-page entry points. Run with: npm test
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const pageDir = path.join(ROOT, 'dericbi-instructor');
const html = fs.readFileSync(path.join(pageDir, 'index.html'), 'utf8');
const home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

test('every local link, image, stylesheet and script on the page exists', () => {
  const missing = [];
  for (const m of html.matchAll(/\b(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    const target = path.normalize(path.join(pageDir, decodeURIComponent(u)));
    const resolved = fs.existsSync(target) && fs.statSync(target).isDirectory() ? path.join(target, 'index.html') : target;
    if (!fs.existsSync(resolved)) missing.push(u);
  }
  assert.deepEqual(missing, []);
});

test('strict CSP is declared and the page needs no inline script or inline style attribute', () => {
  assert.match(html, /http-equiv="Content-Security-Policy"[^>]*script-src 'self'/);
  assert.doesNotMatch(html, /\sstyle="/, 'inline style attributes would be blocked by the CSP');
  const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>/g)];
  assert.equal(inlineScripts.length, 0);
});

test('structured data parses as JSON', () => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(blocks.length >= 2);
  blocks.forEach((b) => JSON.parse(b[1]));
});

test('new-tab links are protected with noopener', () => {
  for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(m[0], /noopener/, m[0].slice(0, 80));
});

test('the download button points at the stable latest-release installer URL', () => {
  assert.match(html, /id="download-btn"[^>]*href="https:\/\/github\.com\/Deric254\/dericbi-instructor\/releases\/latest\/download\/DericBI-Instructor-Setup\.exe"/);
  const js = fs.readFileSync(path.join(pageDir, 'js', 'instructor.js'), 'utf8');
  assert.match(js, /INSTALLER_NAME = 'DericBI-Instructor-Setup\.exe'/);
});

test('the social preview image is a real 1200x630 PNG', () => {
  const buf = fs.readFileSync(path.join(pageDir, 'img', 'og-instructor.png'));
  assert.equal(buf.readUInt32BE(16), 1200);
  assert.equal(buf.readUInt32BE(20), 630);
});

test('home page links to the product (sidebar + banner) and the sitemap lists it', () => {
  assert.match(home, /<a href="dericbi-instructor\/"[^>]*><i class="fas fa-desktop">/);
  assert.match(home, /id="instructor-app"/);
  assert.match(home, /href="dericbi-instructor\/#get-started"/);
  assert.match(fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8'), /<loc>https:\/\/dericbiskills\.vercel\.app\/dericbi-instructor\/<\/loc>/);
  assert.ok(fs.existsSync(path.join(ROOT, 'dericbi-instructor', 'img', 'dashboard.webp')));
});

test('header nav on the product page links to all sibling pages', () => {
  for (const target of ['databasics.html', 'computerbasicss.html', 'analystpro.html', 'computerliteracy.html']) assert.ok(html.includes(target), target);
});
