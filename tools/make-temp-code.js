'use strict';
/**
 * Make a temporary course access code from the command line.
 *   node tools/make-temp-code.js <analyst|literacy> [hours]        e.g.  node tools/make-temp-code.js analyst 3
 * Needs COURSE_COOKIE_SECRET (same value the website uses) in .env.local or in the environment.
 * The code works on your live website AND on the local copy, as long as the secret is the same.
 */
const fs = require('fs');
const path = require('path');
const { loadEnvFile } = require('./load-env');
loadEnvFile(path.join(__dirname, '..', '.env.local'));

const handlerLib = require('../api/_lib/course-handler');
const { makeTempCode } = handlerLib._internals;

const course = (process.argv[2] || '').toLowerCase();
const hours = process.argv[3] === undefined ? 3 : Number(process.argv[3]);
const COURSES = ['analyst', 'literacy'];

if (!COURSES.includes(course) || !(hours > 0 && hours <= 24)) {
  console.error('Usage: node tools/make-temp-code.js <analyst|literacy> [hours 0.1 to 24]');
  process.exit(1);
}
const secret = process.env.COURSE_COOKIE_SECRET;
if (!secret || secret.length < 32) {
  console.error('COURSE_COOKIE_SECRET is missing (or shorter than 32 characters). Put it in .env.local first.');
  process.exit(1);
}
const expiry = Math.floor((Date.now() + hours * 3600 * 1000) / 1000) * 1000;
console.log('');
console.log('  Course : ' + course);
console.log('  Code   : ' + makeTempCode(secret, course, expiry));
console.log('  Ends   : ' + new Date(expiry).toLocaleString() + '  (' + hours + ' hour' + (hours === 1 ? '' : 's') + ' from now)');
console.log('');
console.log('  Give students the code. They type it in the normal password box.');
console.log('  Your own password is not affected.');
console.log('');
