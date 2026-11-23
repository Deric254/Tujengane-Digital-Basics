'use strict';
// A ")" inside an echo line that sits within an if ( ... ) block ends the block early and makes cmd.exe close the window at once.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
for (const f of ['Run-Tujengane-Local.bat', 'Make-Temp-Code.bat']) {
  test(f + ' is CRLF, ends with pause, and has no stray parentheses inside blocks', () => {
    const raw = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
    assert.ok(!/[^\r]\n/.test(raw), 'every line must end with CRLF');
    const lines = raw.split('\r\n');
    let depth = 0;
    lines.forEach((l, i) => {
      const t = l.trim();
      if (depth > 0 && /^echo\b/i.test(t)) assert.doesNotMatch(t, /[()]/, f + ' line ' + (i + 1) + ': parentheses in echo inside a block');
      if (/^(if\b.*|else)\s*\($/i.test(t) || /\($/.test(t)) depth++;
      else if (t === ')') depth--;
    });
    assert.equal(depth, 0, 'blocks are balanced');
    assert.match(raw.trimEnd(), /pause$/i);
  });
}
