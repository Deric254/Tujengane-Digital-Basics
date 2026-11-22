'use strict';
/**
 * Runs the whole site on your own computer, exactly like the website does:
 *   - static pages and assets from the project folder
 *   - /api/analyst, /api/literacy and /api/payment-proof served by the SAME handlers Vercel uses
 * Start it with Run-Tujengane-Local.bat (Windows) or:  node tools/local-server.js
 * Settings come from .env.local (see .env.example).
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { loadEnvFile } = require('./load-env');

const ROOT = path.resolve(__dirname, '..');
loadEnvFile(path.join(ROOT, '.env.local'));

const API = {
  '/api/analyst': () => require('../api/analyst.js'),
  '/api/literacy': () => require('../api/literacy.js'),
  '/api/payment-proof': () => require('../api/payment-proof.js'),
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.JPG': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.wasm': 'application/wasm', '.mjs': 'application/javascript; charset=utf-8', '.zip': 'application/zip',
};
// Never hand these out, even locally (secrets, source of the protected lessons, tooling).
const BLOCKED = /^(\/\.|\/api\/|\/node_modules\/|\/tools\/|\/tests\/|\/package(-lock)?\.json$)/i;

function send(res, status, body, type) {
  res.statusCode = status;
  res.setHeader('Content-Type', type || 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
}

function serveStatic(req, res, pathname) {
  let rel;
  try { rel = decodeURIComponent(pathname); } catch (e) { return send(res, 400, 'Bad request'); }
  if (rel.includes('\0') || BLOCKED.test(rel)) return send(res, 404, 'Not found');
  let file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT + path.sep) && file !== ROOT) return send(res, 404, 'Not found');
  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) { file = path.join(file, 'index.html'); }
    fs.readFile(file, (e2, data) => {
      if (e2) return send(res, 404, 'Not found');
      send(res, 200, data, MIME[path.extname(file)] || MIME[path.extname(file).toLowerCase()] || 'application/octet-stream');
    });
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const key = url.pathname.replace(/\/+$/, '');
  if (API[key]) {
    Promise.resolve()
      .then(() => API[key]()(req, res))
      .catch((e) => { console.error('API error:', e && e.message); if (!res.headersSent) send(res, 500, 'Server error'); });
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');
  serveStatic(req, res, url.pathname === '/' ? '/index.html' : url.pathname);
});

function openBrowser(url) {
  const cmd = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

function listen(port, tries) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && tries > 0) return listen(port + 1, tries - 1);
    console.error('Could not start the server: ' + err.message);
    process.exit(1);
  });
  server.listen(port, '127.0.0.1', () => {
    const url = 'http://localhost:' + port + '/';
    const secret = process.env.COURSE_COOKIE_SECRET || '';
    console.log('');
    console.log('  Tujengane is running on your computer:  ' + url);
    console.log('  Press Ctrl + C (or close this window) to stop it.');
    if (secret.length < 32) console.log('  WARNING: COURSE_COOKIE_SECRET is missing, so the paid courses stay locked. Run setup again (delete .env.local).');
    if (!process.env.COURSE_PASSWORD_ANALYST || !process.env.COURSE_PASSWORD_LITERACY) console.log('  WARNING: a course password is missing in .env.local, so that course stays locked.');
    console.log('');
    if (process.argv.includes('--open')) openBrowser(url);
  });
}
listen(Number(process.env.PORT) || 3000, 10);
