'use strict';
// First-run helper: creates .env.local (never uploaded: .gitignore skips it) with a fresh secret and your passwords.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');
const target = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(target)) { console.log('.env.local already exists. Delete it and run again to start over.'); process.exit(0); }

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, (a) => r(a.trim())));
(async () => {
  console.log('');
  console.log('  One-time setup for running Tujengane on this computer.');
  console.log('  Use the SAME passwords as on your live website (so one set works everywhere),');
  console.log('  or just press Enter to use a simple test password on this computer only.');
  console.log('');
  const lit = (await ask('  Computer Literacy password [Enter = local-literacy]: ')) || 'local-literacy';
  const ana = (await ask('  Analyst Pro password       [Enter = local-analyst]:  ')) || 'local-analyst';
  console.log('');
  console.log('  Secret key: if you want temporary codes made here to ALSO work on your live website,');
  console.log('  paste the live COURSE_COOKIE_SECRET (32+ characters). Otherwise press Enter.');
  let secret = await ask('  COURSE_COOKIE_SECRET [Enter = make a new one]: ');
  if (secret && secret.length < 32) { console.log('  That is shorter than 32 characters, so a new one was made instead.'); secret = ''; }
  secret = secret || crypto.randomBytes(32).toString('hex');
  rl.close();
  fs.writeFileSync(target, [
    '# Created by setup. Never share or upload this file.',
    'COURSE_COOKIE_SECRET=' + secret,
    'COURSE_PASSWORD_LITERACY=' + lit,
    'COURSE_PASSWORD_ANALYST=' + ana,
    '# Optional: set COURSE_TEMP_EPOCH=2 (any new text) to cancel every temporary code already given out.',
    '# Keep it the same here and on the live site if you want codes to work in both places.',
    '# COURSE_TEMP_EPOCH=',
    '',
  ].join('\n'));
  console.log('');
  console.log('  Saved to .env.local. Starting...');
})();
