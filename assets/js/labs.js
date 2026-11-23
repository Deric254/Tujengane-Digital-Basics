/* Tujengane practice labs.
   - <div class="tj-lab" data-lab="NAME"></div>  becomes an interactive practice area
   - <section class="tj-quiz" ...>               becomes a check that repeats until the learner gets it right
   Everything runs inside the learner's own browser. Nothing is sent to any server, and nothing here can
   change a lesson, an account or any course content. Lab names: python, password, hash, caesar, phish,
   url, logs, access, risk, order, sql. */
(function () {
  'use strict';
  var SRC = (document.currentScript && document.currentScript.src) || (location.origin + '/assets/js/labs.js');

  /* ---------- tiny DOM helper (text only, never innerHTML with user text) ---------- */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (c) { if (c === null || c === undefined) return; el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }
  function head(title, tag, hint) {
    return [h('div', { class: 'tj-title' }, [h('span', { class: 'tj-tag', text: tag || 'Practice' }), title]), hint ? h('p', { class: 'tj-hint', text: hint }) : null];
  }
  function seeded(arr, seed) { // deterministic shuffle so every learner sees the same starting order
    var a = arr.slice(), s = seed || 7;
    for (var i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; var j = Math.floor(s / 233280 * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var SAFE = 'Practice area. Everything stays in this page on your device. Never type a real password, PIN or private data.';

  /* ================= PYTHON RUNNER ================= */
  var Engine = {
    worker: null, timer: null, busy: false, cb: null,
    stop: function () {
      if (this.worker) { this.worker.terminate(); this.worker = null; }
      clearTimeout(this.timer); this.busy = false;
    },
    run: function (code, stdin, cb) {
      var self = this;
      if (self.busy) return;
      self.busy = true; self.cb = cb;
      try {
        if (!self.worker) {
          self.worker = new Worker(new URL('py-worker.js', SRC).href, { type: 'module' });
          self.worker.onerror = function () { var c = self.cb; self.stop(); if (c) c.done({ ok: false, error: 'This browser could not start the Python engine. Please use a recent Chrome, Edge, Firefox or Safari.' }); };
        }
      } catch (e) { self.busy = false; return cb.done({ ok: false, error: 'This browser could not start the Python engine. Please use a recent Chrome, Edge, Firefox or Safari.' }); }
      self.worker.onmessage = function (ev) {
        var m = ev.data;
        if (m.type === 'status') cb.status('Loading the Python engine (first time only, about 12 MB)...');
        else if (m.type === 'started') { cb.status('Running...'); clearTimeout(self.timer); self.timer = setTimeout(function () { self.stop(); cb.done({ ok: false, timeout: true }); }, 10000); }
        else if (m.type === 'out') cb.out(m.text, m.err);
        else if (m.type === 'done') { clearTimeout(self.timer); self.busy = false; cb.done(m); }
      };
      cb.status('Starting...');
      self.worker.postMessage({ type: 'run', code: code, stdin: stdin, indexURL: new URL('../vendor/pyodide/', SRC).href });
    }
  };
  var FRIENDLY = [
    [/SyntaxError/, 'Python could not read a line. Check quotation marks, brackets (every opening one needs a closing one), colons at the end of if/for/def lines, and spelling of keywords.'],
    [/IndentationError|TabError/, 'The spacing at the start of a line is wrong. Lines inside if/for/def must be indented by the same number of spaces (use 4).'],
    [/NameError/, 'Python does not know that name. Check the spelling and capital letters, and make sure you created the variable on an earlier line. Text must be inside quotation marks.'],
    [/TypeError/, 'You mixed values that do not go together, such as text + number. Convert with int(), float() or str(), or check the brackets.'],
    [/ValueError/, 'The value cannot be converted the way you asked, for example int("twenty"). Check what was typed.'],
    [/ZeroDivisionError/, 'You divided by zero. Check the number you are dividing by.'],
    [/IndexError/, 'You asked for a list position that does not exist. Positions start at 0, so a list with 3 items uses 0, 1 and 2.'],
    [/KeyError/, 'That key is not in the dictionary. Check the spelling.'],
    [/EOFError/, 'The program asked for input but there were no more answers. Type one answer per line in the "Input answers" box.']
  ];
  function friendly(err) {
    var last = String(err).trim().split('\n').pop();
    for (var i = 0; i < FRIENDLY.length; i++) if (FRIENDLY[i][0].test(last)) return FRIENDLY[i][1];
    return 'Read the last line of the message: it names the problem. Then look at the line number above it.';
  }
  function mountPython(root, opts) {
    opts = opts || {};
    var original = opts.code || '';
    var save = opts.saveKey;
    if (save) { try { var s = localStorage.getItem(save); if (s !== null && !opts.fresh) original = s; } catch (e) {} }
    var start = opts.code || '';
    var code = h('textarea', { class: 'tj-code', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', 'aria-label': 'Python code editor', rows: Math.max(6, Math.min(16, (original.split('\n').length + 1))) });
    code.value = original;
    var stdin = h('textarea', { class: 'tj-stdin', spellcheck: 'false', 'aria-label': 'Input answers, one per line', rows: 2, placeholder: 'One answer per line, used when the program calls input()' });
    stdin.value = opts.stdin || '';
    var con = h('pre', { class: 'tj-console', 'aria-live': 'polite', 'aria-label': 'Program output' });
    var status = h('div', { class: 'tj-status', role: 'status' });
    var fr = h('div', { class: 'tj-friendly', hidden: true });
    var run = h('button', { type: 'button', class: 'tj-btn' }, ['Run']);
    var stop = h('button', { type: 'button', class: 'tj-btn tj-danger', hidden: true }, ['Stop']);
    var reset = h('button', { type: 'button', class: 'tj-btn tj-ghost' }, ['Reset code']);
    code.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); var s = code.selectionStart, t = code.selectionEnd; code.setRangeText('    ', s, t, 'end'); }
      else if (e.key === 'Enter') {
        var v = code.value, pos = code.selectionStart, ls = v.lastIndexOf('\n', pos - 1) + 1, line = v.slice(ls, pos);
        var ind = (line.match(/^ */) || [''])[0]; if (/:\s*$/.test(line)) ind += '    ';
        e.preventDefault(); code.setRangeText('\n' + ind, pos, code.selectionEnd, 'end');
      }
    });
    if (save) code.addEventListener('input', function () { try { localStorage.setItem(save, code.value); } catch (e) {} });
    function write(text, isErr) {
      if (isErr) con.appendChild(h('span', { class: 'tj-err', text: text })); else con.appendChild(document.createTextNode(text));
      con.scrollTop = con.scrollHeight;
    }
    function busy(b) { run.disabled = b; stop.hidden = !b; }
    run.addEventListener('click', function () {
      clear(con); fr.hidden = true; busy(true);
      var answers = stdin.value.length ? stdin.value.split('\n') : [];
      Engine.run(code.value, answers, {
        status: function (t) { status.textContent = t; },
        out: write,
        done: function (m) {
          busy(false); status.textContent = '';
          if (m.timeout) { write('\nStopped: the program ran for more than 10 seconds. Check for a loop that never ends.\n', true); fr.textContent = 'Tip: a while loop needs a line inside it that eventually makes the condition false.'; fr.hidden = false; }
          else if (!m.ok) { write((con.textContent && !/\n$/.test(con.textContent) ? '\n' : '') + m.error + '\n', true); fr.textContent = friendly(m.error); fr.hidden = false; }
          else { status.textContent = 'Finished with no errors.'; }
        }
      });
    });
    stop.addEventListener('click', function () { Engine.stop(); busy(false); status.textContent = 'Stopped.'; write('\nStopped by you.\n', true); });
    reset.addEventListener('click', function () { code.value = start; if (save) { try { localStorage.removeItem(save); } catch (e) {} } clear(con); fr.hidden = true; status.textContent = ''; });
    root.appendChild(h('div', { class: 'tj-py' }, [
      h('label', { text: opts.label || 'Python code (edit it, then press Run)' }), code,
      h('details', { open: /input\s*\(/.test(original) ? '' : null }, [h('summary', { text: 'Input answers (for programs that ask questions)' }), stdin]),
      h('div', { class: 'tj-row' }, [run, stop, reset]), status, con, fr
    ]));
    return { setCode: function (c) { code.value = c; start = c; clear(con); fr.hidden = true; }, getCode: function () { return code.value; } };
  }

  /* ================= LABS ================= */
  var LABS = {};

  LABS.python = function (el) {
    var srcCode = el.getAttribute('data-code');
    if (srcCode === null) {
      var slide = el.closest('.slide-content') || el.parentNode, pre = slide && slide.querySelector('pre code');
      srcCode = pre ? pre.textContent : '';
    }
    head('Run it yourself', 'Python', 'Type or change the code, press Run, and read the result. Nothing here can harm anything.').forEach(function (n) { if (n) el.appendChild(n); });
    mountPython(el, { code: srcCode.replace(/\s+$/, '') + '\n', stdin: el.getAttribute('data-stdin') || '' });
  };

  /* ---- password strength ---- */
  var COMMON = ['password', 'passw0rd', '123456', '12345678', 'qwerty', 'abc123', 'letmein', 'welcome', 'admin', 'iloveyou', 'monkey', 'dragon', 'football', 'login', 'master', 'sunshine', 'princess', 'kenya', 'nairobi', 'mombasa', 'harambee', 'simba', 'jambo', 'mpesa', 'tujengane', 'asante', 'karibu', 'changeme', 'qwertyuiop', 'trustno1', 'superman', 'whatever', 'freedom', 'shadow', 'baseball', 'hello', 'test', 'user', 'guest', 'secret'];
  function fmtTime(sec) {
    if (sec < 1) return 'less than a second';
    var u = [['second', 60], ['minute', 60], ['hour', 24], ['day', 365], ['year', 100], ['century', 1e9]], v = sec;
    for (var i = 0; i < u.length; i++) { if (v < u[i][1] || i === u.length - 1) { var n = Math.round(v); if (u[i][0] === 'century' && v > 1e6) return 'more than a million centuries'; return n + ' ' + u[i][0] + (n === 1 ? '' : 's'); } v = v / u[i][1]; }
    return '';
  }
  function analysePassword(pw) {
    var len = pw.length, res = { checks: [], bits: 0, label: '', time: '' };
    var cls = { lower: /[a-z]/.test(pw), upper: /[A-Z]/.test(pw), digit: /[0-9]/.test(pw), sym: /[^A-Za-z0-9]/.test(pw) };
    var pool = (cls.lower ? 26 : 0) + (cls.upper ? 26 : 0) + (cls.digit ? 10 : 0) + (cls.sym ? 33 : 0);
    var norm = pw.toLowerCase().replace(/[@4]/g, 'a').replace(/0/g, 'o').replace(/[1!|]/g, 'i').replace(/3/g, 'e').replace(/[$5]/g, 's').replace(/7/g, 't');
    var core = norm.replace(/[^a-z]/g, '');
    var common = COMMON.some(function (w) { return core === w || norm === w || (w.length >= 4 && core.indexOf(w) === 0 && core.length <= w.length + 2); }) || /^(.)\1+$/.test(pw);
    var seq = /(012|123|234|345|456|567|678|789|abc|bcd|cde|def|qwe|wer|ert|asd|sdf|zxc)/i.test(pw);
    var rep = /(.)\1\1/.test(pw);
    var year = /(19|20)\d\d/.test(pw);
    var words = pw.split(/[\s\-_.]+/).filter(function (w) { return w.length > 0; });
    var phrase = words.length >= 3 && words.every(function (w) { return /^[A-Za-z]{3,}$/.test(w); });
    var bits = len && pool ? len * Math.log(pool) / Math.LN2 : 0;
    if (phrase) bits = Math.min(bits, words.length * 11);
    if (common) bits = Math.min(bits, 18);
    else { if (seq) bits -= 8; if (rep) bits -= 6; if (year) bits -= 4; }
    bits = Math.max(0, bits);
    res.bits = bits;
    res.label = !len ? '' : bits < 28 ? 'Very weak' : bits < 40 ? 'Weak' : bits < 60 ? 'Fair' : bits < 80 ? 'Strong' : 'Very strong';
    res.time = len ? fmtTime(Math.pow(2, bits) / 2 / 1e10) : '';
    res.pct = Math.min(100, Math.round(bits / 90 * 100));
    res.checks = [
      [len >= 12, len + ' characters' + (len >= 12 ? ' (good length)' : ' - aim for 12 or more; length matters most')],
      [!common, common ? 'Looks like a very common password or a simple change of one' : 'Not a common password pattern'],
      [!(seq || rep), seq || rep ? 'Contains a predictable run (like 123, abc, qwe or aaa)' : 'No obvious runs or repeats'],
      [!year, year ? 'Contains something like a year, which attackers try first' : 'No year pattern'],
      [phrase || (cls.lower + cls.upper + cls.digit + cls.sym >= 2 && len >= 12), phrase ? 'Looks like a passphrase of separate words (strong only if the words are random)' : 'Mixed content helps only when the password is also long']
    ];
    return res;
  }
  LABS.password = function (el) {
    head('Password strength lab', 'Lab', 'Type a practice password and watch what makes it easy or hard to guess.').forEach(function (n) { if (n) el.appendChild(n); });
    el.appendChild(h('div', { class: 'tj-safe', text: SAFE }));
    var inp = h('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', id: 'tj-pw-' + Math.random().toString(36).slice(2), 'aria-label': 'Practice password', maxlength: '80', 'data-lpignore': 'true', placeholder: 'Try: password1   then   Tujengane2020   then   a long phrase' });
    var bar = h('span'), meter = h('div', { class: 'tj-meter' }, [bar]), lab = h('div', { class: 'tj-out' }), list = h('ul', { class: 'tj-checks' });
    function upd() {
      var pw = inp.value, r = analysePassword(pw);
      bar.style.width = r.pct + '%'; bar.style.background = r.bits < 28 ? '#b42318' : r.bits < 40 ? '#d97706' : r.bits < 60 ? '#ca8a04' : '#157f4b';
      clear(lab); clear(list);
      if (!pw) { lab.appendChild(document.createTextNode('Type something above to begin.')); return; }
      lab.appendChild(h('div', {}, [h('strong', { text: r.label }), ' - about ' + Math.round(r.bits) + ' bits. A fast offline attack (10 billion guesses a second) could take about ', h('strong', { text: r.time }), ' on average.']));
      r.checks.forEach(function (c) { list.appendChild(h('li', {}, [h('span', { class: c[0] ? 'tj-ok' : 'tj-no', text: c[0] ? 'Good: ' : 'Weak: ' }), c[1]])); });
    }
    inp.addEventListener('input', upd); upd();
    el.appendChild(inp); el.appendChild(meter); el.appendChild(lab); el.appendChild(list);
    el.appendChild(h('p', { class: 'tj-hint', text: 'This is a teaching estimate, not a guarantee. Real attackers also use leaked-password lists, so a password you have used anywhere else is unsafe however strong it looks.' }));
  };

  /* ---- hashing ---- */
  function sha256hex(text) {
    if (!(window.crypto && crypto.subtle)) return Promise.reject(new Error('nosubtle'));
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }
  LABS.hash = function (el) {
    head('Hashing lab: a fingerprint of data', 'Lab', 'A hash turns any text into a fixed-length fingerprint. Change one letter and watch the whole fingerprint change.').forEach(function (n) { if (n) el.appendChild(n); });
    var a = h('input', { type: 'text', value: 'Pay Amina 1000', 'aria-label': 'First text', maxlength: '200', autocomplete: 'off' });
    var b = h('input', { type: 'text', value: 'Pay Amina 1001', 'aria-label': 'Second text', maxlength: '200', autocomplete: 'off' });
    var out = h('div', { class: 'tj-out', 'aria-live': 'polite' });
    function upd() {
      Promise.all([sha256hex(a.value), sha256hex(b.value)]).then(function (r) {
        clear(out);
        var diff = 0, spans = [];
        for (var i = 0; i < 64; i++) { var d = r[0][i] !== r[1][i]; if (d) diff++; spans.push(h('span', { class: d ? 'tj-diff' : '', text: r[1][i] })); }
        out.appendChild(h('div', {}, ['SHA-256 of the first text:']));
        out.appendChild(h('div', { class: 'tj-mono', text: r[0] }));
        out.appendChild(h('div', { style: 'margin-top:.5rem' }, ['SHA-256 of the second text (changes highlighted):']));
        out.appendChild(h('div', { class: 'tj-mono' }, spans));
        out.appendChild(h('p', { style: 'margin:.5rem 0 0' }, [a.value === b.value ? 'The texts are identical, so the fingerprints are identical.' : diff + ' of the 64 characters are different. A tiny change in the input gives a completely different fingerprint, so you can detect that data was altered.']));
      }).catch(function () { clear(out); out.appendChild(document.createTextNode('This browser cannot compute hashes here (it needs a secure page, https or localhost).')); });
    }
    a.addEventListener('input', upd); b.addEventListener('input', upd); upd();
    el.appendChild(h('label', { text: 'First text' })); el.appendChild(a);
    el.appendChild(h('label', { text: 'Second text' })); el.appendChild(b); el.appendChild(out);
    el.appendChild(h('p', { class: 'tj-hint', text: 'A hash cannot be "decrypted". Websites should store passwords as salted, deliberately slow hashes (for example Argon2 or bcrypt), not plain SHA-256, which is very fast for attackers to try billions of guesses.' }));
  };

  /* ---- Caesar cipher ---- */
  function caesar(text, k) { return text.replace(/[a-z]/gi, function (c) { var b = c <= 'Z' ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - b + k + 26) % 26 + b); }); }
  LABS.caesar = function (el) {
    head('Caesar cipher lab: why weak encryption fails', 'Lab', 'The Caesar cipher shifts every letter along the alphabet. It is a good way to see why a small number of possible keys is dangerous.').forEach(function (n) { if (n) el.appendChild(n); });
    var msg = h('input', { type: 'text', value: 'MEET AT THE GATE', 'aria-label': 'Message', maxlength: '120', autocomplete: 'off' });
    var shift = h('input', { type: 'range', min: '0', max: '25', value: '3', 'aria-label': 'Shift' });
    var sv = h('strong', { text: '3' }), out = h('div', { class: 'tj-out tj-mono', 'aria-live': 'polite' }), all = h('div', { class: 'tj-scroll' });
    function upd() { sv.textContent = shift.value; out.textContent = caesar(msg.value, parseInt(shift.value, 10)); }
    msg.addEventListener('input', upd); shift.addEventListener('input', upd); upd();
    var btn = h('button', { type: 'button', class: 'tj-btn tj-ghost', text: 'Try every possible key' });
    btn.addEventListener('click', function () {
      clear(all); var t = h('table'); t.appendChild(h('tr', {}, [h('th', { text: 'Shift' }), h('th', { text: 'Result' })]));
      var ct = out.textContent; for (var k = 0; k < 26; k++) t.appendChild(h('tr', {}, [h('td', { text: String(k) }), h('td', { class: 'tj-mono', text: caesar(ct, -k) })]));
      all.appendChild(t); all.appendChild(h('p', { class: 'tj-hint', text: 'Only 26 keys exist, so an attacker simply tries them all and reads the one that makes sense. Modern encryption such as AES-256 has about 1.1 x 10^77 possible keys, which cannot be tried one by one.' }));
    });
    el.appendChild(h('label', { text: 'Message' })); el.appendChild(msg);
    el.appendChild(h('label', {}, ['Shift: ', sv])); el.appendChild(shift);
    el.appendChild(h('label', { text: 'Result' })); el.appendChild(out);
    el.appendChild(h('div', { class: 'tj-row' }, [btn])); el.appendChild(all);
  };

  /* ---- phishing inspector ---- */
  LABS.phish = function (el) {
    head('Phishing inspector', 'Lab', 'Tap every part of this made-up message that should make you suspicious, then press Check. The message is fictional.').forEach(function (n) { if (n) el.appendChild(n); });
    var parts = [
      ['From: "Mobile Money Support" <support@mm-secure-update.example>', true, 'The display name looks official but the real address belongs to an unrelated domain, not your provider.'],
      ['Sent: Tuesday, 09:12', false, 'A normal time stamp. Time alone proves nothing.'],
      ['Subject: URGENT!!! Account will be suspended in 24 hours', true, 'Urgency and threats push you to act before you think. Real providers rarely work this way.'],
      ['Dear customer,', true, 'A generic greeting. Your provider normally knows your name.'],
      ['Your acount has been limitted. Verify your PIN now to avoid loss of funds.', true, 'Spelling mistakes, and no genuine provider asks for your PIN by message.'],
      ['[ Verify now ]   (link goes to: http://verify-account.example.net/login)', true, 'The link goes to an unrelated site that is not even encrypted (http). Never sign in through links in unexpected messages.'],
      ['Attachment: Statement.pdf.exe', true, 'A ".exe" hidden behind ".pdf" is a program, not a document. Do not open it.'],
      ['Footer: This is an automated message, please do not reply.', false, 'Automated messages are normal. This line is not a warning sign.']
    ];
    var state = parts.map(function () { return false; });
    var mail = h('div', { class: 'tj-mail' }), btns = [];
    parts.forEach(function (p, i) {
      var why = h('span', { class: 'tj-why', hidden: true });
      var b = h('button', { type: 'button', class: 'tj-spot', 'aria-pressed': 'false' }, [p[0], why]);
      b.addEventListener('click', function () { state[i] = !state[i]; b.setAttribute('aria-pressed', state[i] ? 'true' : 'false'); });
      btns.push([b, why]); mail.appendChild(h('div', {}, [b]));
    });
    var res = h('div', { class: 'tj-out', 'aria-live': 'polite', hidden: true });
    var check = h('button', { type: 'button', class: 'tj-btn', text: 'Check my answers' });
    check.addEventListener('click', function () {
      var good = 0, total = parts.filter(function (p) { return p[1]; }).length, falsePos = 0;
      parts.forEach(function (p, i) {
        var b = btns[i][0], why = btns[i][1]; b.classList.remove('tj-right', 'tj-wrong');
        if (p[1] && state[i]) { good++; b.classList.add('tj-right'); }
        else if (p[1] && !state[i]) { b.classList.add('tj-wrong'); }
        else if (!p[1] && state[i]) { falsePos++; b.classList.add('tj-wrong'); }
        why.textContent = (p[1] ? 'Red flag. ' : 'Not a red flag. ') + p[2]; why.hidden = false;
      });
      res.hidden = false; res.className = 'tj-out ' + (good === total && !falsePos ? 'tj-good' : '');
      res.textContent = 'You found ' + good + ' of ' + total + ' red flags' + (falsePos ? ' and marked ' + falsePos + ' harmless part' + (falsePos > 1 ? 's' : '') + '.' : '.') + (good === total && !falsePos ? ' Excellent. When in doubt: do not click, do not reply, report it.' : ' Green boxes are correct, orange boxes need another look. Read the reason under each line, then press Reset and try again.');
    });
    var reset = h('button', { type: 'button', class: 'tj-btn tj-ghost', text: 'Reset' });
    reset.addEventListener('click', function () { state = parts.map(function () { return false; }); btns.forEach(function (x) { x[0].setAttribute('aria-pressed', 'false'); x[0].classList.remove('tj-right', 'tj-wrong'); x[1].hidden = true; }); res.hidden = true; });
    el.appendChild(mail); el.appendChild(h('div', { class: 'tj-row' }, [check, reset])); el.appendChild(res);
  };

  /* ---- URL inspector ---- */
  LABS.url = function (el) {
    head('Link inspector', 'Lab', 'Decide for each web address: safe to trust, or suspicious? The reason appears after you answer. All addresses are made up.').forEach(function (n) { if (n) el.appendChild(n); });
    var items = [
      ['https://accounts.example.com/signin', true, 'The real site name is the part just before the first single "/": example.com. "accounts" is only a section of that site, and the connection is encrypted (https).'],
      ['https://example.com.account-verify.example/login', false, 'Read from the right: the real domain is account-verify.example. "example.com" is just a decoy label placed in front.'],
      ['http://example.com/login', false, 'No https, so a sign-in page sent over this link is not encrypted and could be read or changed on the way. Do not sign in on it.'],
      ['https://examp1e.com/secure', false, 'Look closely: the digit 1 replaces the letter l. Lookalike names are a common trick.'],
      ['https://example.com@198.51.100.7/login', false, 'Everything before the "@" is ignored for where you go. This link actually opens the address 198.51.100.7, not example.com.'],
      ['https://www.example.com/about', true, 'Correct domain, encrypted connection and an ordinary page. Still, only open links you expected.']
    ];
    var done = 0, right = 0, sum = h('div', { class: 'tj-out', 'aria-live': 'polite', hidden: true });
    items.forEach(function (it) {
      var row = h('div', { class: 'tj-item' }), why = h('div', { class: 'tj-why', hidden: true });
      var s = h('button', { type: 'button', class: 'tj-btn tj-ghost', text: 'Looks safe' }), x = h('button', { type: 'button', class: 'tj-btn tj-ghost', text: 'Suspicious' });
      function ans(sayTrust) { if (row.getAttribute('data-done')) return; row.setAttribute('data-done', '1'); var ok = sayTrust === it[1]; row.classList.add(ok ? 'tj-right' : 'tj-wrong'); why.textContent = (ok ? 'Correct. ' : 'Not quite. ') + it[2]; why.hidden = false; s.disabled = x.disabled = true; done++; if (ok) right++; if (done === items.length) { sum.hidden = false; sum.textContent = 'Score: ' + right + ' of ' + items.length + '. ' + (right === items.length ? 'Great: you read links from the right place.' : 'Read each explanation, then press Start again to try once more.'); } }
      s.addEventListener('click', function () { ans(true); }); x.addEventListener('click', function () { ans(false); });
      row.appendChild(h('div', { class: 'tj-mono', style: 'margin-bottom:.4rem', text: it[0] })); row.appendChild(h('div', { class: 'tj-row', style: 'margin:.2rem 0' }, [s, x])); row.appendChild(why);
      el.appendChild(row);
    });
    el.appendChild(sum);
    var again = h('button', { type: 'button', class: 'tj-btn tj-ghost', text: 'Start again' });
    again.addEventListener('click', function () { var p = el.parentNode, n = h('div', { class: 'tj-lab', 'data-lab': 'url' }); p.replaceChild(n, el); LABS.url(n); n.setAttribute('data-ready', '1'); });
    el.appendChild(h('div', { class: 'tj-row' }, [again]));
  };

  /* ---- log reader ---- */
  LABS.logs = function (el) {
    head('Log reader: spot the attack', 'Lab', 'This is a sign-in log from a small shop\'s office system. One address is behaving like an attacker. Tap it.').forEach(function (n) { if (n) el.appendChild(n); });
    var rows = [
      ['08:01:12', '10.0.0.21', 'wanjiru', 'Success'], ['08:03:40', '10.0.0.34', 'otieno', 'Success'],
      ['09:15:02', '203.0.113.45', 'admin', 'Failed'], ['09:15:04', '203.0.113.45', 'admin', 'Failed'], ['09:15:06', '203.0.113.45', 'admin', 'Failed'],
      ['09:15:08', '203.0.113.45', 'admin', 'Failed'], ['09:15:10', '203.0.113.45', 'admin', 'Failed'], ['09:15:12', '203.0.113.45', 'admin', 'Failed'],
      ['09:15:15', '203.0.113.45', 'admin', 'Success'], ['09:40:09', '10.0.0.21', 'wanjiru', 'Failed'], ['09:40:21', '10.0.0.21', 'wanjiru', 'Success'],
      ['10:22:51', '10.0.0.34', 'otieno', 'Success'], ['11:05:18', '198.51.100.9', 'mercy', 'Success']
    ];
    var t = h('table'); t.appendChild(h('tr', {}, ['Time', 'Address', 'User', 'Result'].map(function (x) { return h('th', { text: x }); })));
    rows.forEach(function (r) { t.appendChild(h('tr', {}, r.map(function (x) { return h('td', { class: 'tj-mono', text: x }); }))); });
    el.appendChild(h('div', { class: 'tj-scroll' }, [t]));
    var out = h('div', { class: 'tj-out', 'aria-live': 'polite', hidden: true }), row = h('div', { class: 'tj-row' });
    ['10.0.0.21', '203.0.113.45', '198.51.100.9', '10.0.0.34'].forEach(function (ip) {
      var b = h('button', { type: 'button', class: 'tj-btn tj-ghost tj-mono', text: ip });
      b.addEventListener('click', function () {
        out.hidden = false;
        if (ip === '203.0.113.45') { out.className = 'tj-out tj-good'; out.textContent = 'Correct. Six failed tries on "admin" two seconds apart, then a success: this looks like an automated password-guessing (brute-force) attack that finally got in. Next: contain it (disable or reset that account and block the address), then check what that session did.'; Array.prototype.forEach.call(t.querySelectorAll('tr'), function (tr) { if (/203\.0\.113\.45/.test(tr.textContent)) tr.classList.add('tj-flag'); }); }
        else if (ip === '198.51.100.9') { out.className = 'tj-out'; out.textContent = 'Worth a question, because it is an outside address, but it shows a single normal success. One event is not a pattern. Ask whether "mercy" works remotely before you worry.'; }
        else { out.className = 'tj-out'; out.textContent = 'Not this one. An internal address (10.0.0.x) with one slip-up followed by a success is normal human behaviour: a mistyped password. Look for many failures in a short time.'; }
      });
      row.appendChild(b);
    });
    el.appendChild(h('p', { class: 'tj-hint', text: 'Which address looks like an attack?' })); el.appendChild(row); el.appendChild(out);
  };

  /* ---- least-privilege matrix ---- */
  LABS.access = function (el) {
    head('Least privilege: who needs what?', 'Lab', 'Tick only the access each person needs to do their job. Then check your design.').forEach(function (n) { if (n) el.appendChild(n); });
    var roles = [['Cashier', 'sells items and takes payments'], ['Manager', 'approves refunds and reads sales reports; also sells when busy'], ['IT Admin', 'maintains the server; does not sell or read sales reports'], ['Intern', 'shadows the manager; no task yet needs system access']];
    var res = ['POS till', 'Sales reports', 'Payroll files', 'Server settings'];
    var need = { Cashier: [1, 0, 0, 0], Manager: [1, 1, 0, 0], 'IT Admin': [0, 0, 0, 1], Intern: [0, 0, 0, 0] };
    el.appendChild(h('ul', { class: 'tj-checks' }, roles.map(function (r) { return h('li', {}, [h('strong', { text: r[0] + ': ' }), r[1]]); })));
    el.appendChild(h('p', { class: 'tj-hint', text: 'Payroll files belong to the owner and HR only (neither is in this table).' }));
    var t = h('table'), boxes = {};
    t.appendChild(h('tr', {}, [h('th', { text: 'Role' })].concat(res.map(function (x) { return h('th', { class: 'tj-cell', text: x }); }))));
    roles.forEach(function (r) { boxes[r[0]] = res.map(function (x) { return h('input', { type: 'checkbox', 'aria-label': r[0] + ' can access ' + x }); }); t.appendChild(h('tr', {}, [h('td', { text: r[0] })].concat(boxes[r[0]].map(function (b) { return h('td', { class: 'tj-cell' }, [b]); })))); });
    el.appendChild(h('div', { class: 'tj-scroll' }, [t]));
    var out = h('div', { class: 'tj-out', 'aria-live': 'polite', hidden: true });
    var chk = h('button', { type: 'button', class: 'tj-btn', text: 'Check my design' });
    chk.addEventListener('click', function () {
      var extra = [], miss = [];
      roles.forEach(function (r) { boxes[r[0]].forEach(function (b, i) { var n = need[r[0]][i]; if (b.checked && !n) extra.push(r[0] + ' to ' + res[i]); if (!b.checked && n) miss.push(r[0] + ' to ' + res[i]); }); });
      out.hidden = false; clear(out);
      if (!extra.length && !miss.length) { out.className = 'tj-out tj-good'; out.appendChild(document.createTextNode('This matches least privilege: everyone has exactly what the job needs, nothing more. If a person\'s duties change, you change their access, and you review access regularly.')); return; }
      out.className = 'tj-out tj-bad';
      if (extra.length) out.appendChild(h('p', {}, [h('strong', { text: 'Too much access: ' }), extra.join('; ') + '. Extra access means one stolen or misused account can do more damage.']));
      if (miss.length) out.appendChild(h('p', {}, [h('strong', { text: 'Missing access: ' }), miss.join('; ') + '. People who cannot do their job will ask for broad access or share passwords.']));
    });
    el.appendChild(h('div', { class: 'tj-row' }, [chk])); el.appendChild(out);
  };

  /* ---- risk matrix ---- */
  LABS.risk = function (el) {
    head('Risk ranking: what do we fix first?', 'Lab', 'Rate how LIKELY each risk is and how bad the IMPACT would be (1 = low, 5 = high). Score = likelihood x impact.').forEach(function (n) { if (n) el.appendChild(n); });
    var risks = [['A staff member clicks a phishing link', 4, 4], ['A laptop with unencrypted customer data is stolen', 3, 4], ['Ransomware hits and there is no tested backup', 3, 5], ['A power cut corrupts a file being saved', 4, 2], ['An employee copies the customer list when leaving', 2, 4], ['Fire destroys the server room', 1, 5]];
    var sel = [], scores = [];
    function mk(name) { var s = h('select', { 'aria-label': name }); for (var i = 1; i <= 5; i++) s.appendChild(h('option', { value: String(i), text: String(i) })); s.value = '3'; return s; }
    var t = h('table'); t.appendChild(h('tr', {}, ['Risk', 'Likelihood', 'Impact', 'Score'].map(function (x) { return h('th', { text: x }); })));
    risks.forEach(function (r, i) { var l = mk('Likelihood: ' + r[0]), m = mk('Impact: ' + r[0]), sc = h('td', { class: 'tj-cell', text: '9' }); function u() { sc.textContent = String(l.value * m.value); } l.addEventListener('change', u); m.addEventListener('change', u); sel.push([l, m]); scores.push(sc); t.appendChild(h('tr', {}, [h('td', { text: r[0] }), h('td', {}, [l]), h('td', {}, [m]), sc])); });
    el.appendChild(h('div', { class: 'tj-scroll' }, [t]));
    var out = h('div', { class: 'tj-out', 'aria-live': 'polite', hidden: true });
    var go = h('button', { type: 'button', class: 'tj-btn', text: 'Rank them and compare' });
    go.addEventListener('click', function () {
      var mine = risks.map(function (r, i) { return { n: r[0], s: sel[i][0].value * sel[i][1].value, e: r[1] * r[2] }; });
      var order = mine.slice().sort(function (a, b) { return b.s - a.s; });
      clear(out); out.hidden = false; out.className = 'tj-out';
      out.appendChild(h('p', {}, [h('strong', { text: 'Your priority order: ' })])); out.appendChild(h('ol', {}, order.map(function (o) { return h('li', { text: o.n + ' (' + o.s + ')' }); })));
      var ex = mine.slice().sort(function (a, b) { return b.e - a.e; });
      out.appendChild(h('p', {}, [h('strong', { text: 'A common starting view: ' })])); out.appendChild(h('ol', {}, ex.map(function (o) { return h('li', { text: o.n + ' (' + o.e + ')' }); })));
      out.appendChild(h('p', { text: 'Your ratings can differ: they depend on the business. What matters is that you can explain each number and that the high scores get fixed first, starting with cheap, effective controls (backups, updates, training, multi-factor sign-in).' }));
    });
    el.appendChild(h('div', { class: 'tj-row' }, [go])); el.appendChild(out);
  };

  /* ---- incident response ordering ---- */
  LABS.order = function (el) {
    head('Incident response: put the steps in order', 'Lab', 'A laptop shows a ransom message. Use the arrows to put the response in the right order, then check.').forEach(function (n) { if (n) el.appendChild(n); });
    var correct = ['Prepare: have a plan, contacts and tested backups before anything happens', 'Detect and report: notice the problem and tell the right person at once', 'Contain: isolate the affected device so the problem cannot spread', 'Eradicate: remove the cause and close the way in', 'Recover: restore from a clean backup and watch closely', 'Learn: record what happened and improve the plan'];
    var order = seeded(correct, 11); if (order.join() === correct.join()) order = order.reverse();
    var ol = h('ol', { class: 'tj-ol' }), out = h('div', { class: 'tj-out', 'aria-live': 'polite', hidden: true });
    function draw() {
      clear(ol);
      order.forEach(function (s, i) {
        var up = h('button', { type: 'button', class: 'tj-btn tj-ghost tj-ctl', 'aria-label': 'Move up: ' + s.split(':')[0], text: '↑' }), dn = h('button', { type: 'button', class: 'tj-btn tj-ghost tj-ctl', 'aria-label': 'Move down: ' + s.split(':')[0], text: '↓' });
        up.disabled = i === 0; dn.disabled = i === order.length - 1;
        up.addEventListener('click', function () { var t = order[i - 1]; order[i - 1] = order[i]; order[i] = t; draw(); });
        dn.addEventListener('click', function () { var t = order[i + 1]; order[i + 1] = order[i]; order[i] = t; draw(); });
        ol.appendChild(h('li', {}, [h('span', { text: s }), up, dn]));
      });
    }
    draw();
    var chk = h('button', { type: 'button', class: 'tj-btn', text: 'Check order' });
    chk.addEventListener('click', function () {
      var ok = 0; Array.prototype.forEach.call(ol.children, function (li, i) { var r = order[i] === correct[i]; if (r) ok++; li.classList.remove('tj-right', 'tj-wrong'); li.classList.add(r ? 'tj-right' : 'tj-wrong'); });
      out.hidden = false; out.className = 'tj-out ' + (ok === 6 ? 'tj-good' : 'tj-bad');
      out.textContent = ok === 6 ? 'Correct. Notice that "Contain" comes before "Eradicate": stop the spread first, then clean up. Do not wipe or switch things off before you are told to, because that can destroy evidence.' : ok + ' of 6 are in the right place (green). Think: what must happen before you can contain something? What can you only do after the cause is removed?';
    });
    el.appendChild(ol); el.appendChild(h('div', { class: 'tj-row' }, [chk])); el.appendChild(out);
  };

  /* ================= QUIZ: repeats until correct ================= */
  function initQuiz(q) {
    var correct = parseInt(q.getAttribute('data-correct'), 10), why = q.getAttribute('data-why') || '';
    var opts = Array.prototype.slice.call(q.querySelectorAll('.tj-opt'));
    var fb = q.querySelector('.tj-fb') || q.appendChild(h('div', { class: 'tj-fb', 'aria-live': 'polite' }));
    var tries = 0, finished = false;
    opts.forEach(function (b, i) {
      b.setAttribute('type', 'button');
      b.addEventListener('click', function () {
        if (finished || b.disabled) return;
        tries++;
        if (i === correct) {
          finished = true; b.classList.add('tj-hit'); opts.forEach(function (o) { o.disabled = true; });
          fb.className = 'tj-fb tj-good'; fb.textContent = 'Correct. ' + why;
          q.appendChild(h('div', { class: 'tj-badge', text: tries === 1 ? 'Concept confirmed on the first try' : 'Concept confirmed after ' + tries + ' tries - that is how learning works' }));
        } else {
          b.classList.add('tj-miss'); b.disabled = true;
          fb.className = 'tj-fb tj-bad'; fb.textContent = 'Not quite. ' + (b.getAttribute('data-hint') || 'Read the explanation above again, then try another answer.');
        }
      });
    });
  }

  /* ---------- SQL practice (in-browser SQLite, fresh practice database on every Run) ---------- */
  var SQL_URL = SRC.replace(/labs\.js.*$/, 'sql-worker.js');
  function sqlHint(m) {
    if (/no such table/i.test(m)) return 'That table does not exist. The practice tables are customers, products and sales. Check the spelling.';
    if (/no such column/i.test(m)) return 'That column does not exist in the table. Check the column names listed above the editor.';
    if (/syntax error/i.test(m)) return 'SQL could not read the statement. Check commas between columns, quotes around text, and that FROM, WHERE and GROUP BY are in the right order.';
    if (/ambiguous/i.test(m)) return 'Two tables have a column with that name. Write it as table.column, for example c.name.';
    return 'Read the message: it names the problem.';
  }
  function mountSql(root, opts) {
    opts = opts || {};
    var start = opts.code || 'SELECT * FROM customers;';
    var code = h('textarea', { class: 'tj-code', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', 'aria-label': 'SQL editor', rows: Math.max(5, Math.min(14, start.split('\n').length + 1)) });
    code.value = start;
    var out = h('div', { class: 'tj-sqlout' }), status = h('div', { class: 'tj-status', role: 'status' }), fr = h('div', { class: 'tj-friendly', hidden: true });
    var run = h('button', { type: 'button', class: 'tj-btn' }, ['Run']), stop = h('button', { type: 'button', class: 'tj-btn tj-danger', hidden: true }, ['Stop']), reset = h('button', { type: 'button', class: 'tj-btn tj-ghost' }, ['Reset']);
    var w = null, t = null;
    function end() { if (w) { w.terminate(); w = null; } clearTimeout(t); run.disabled = false; stop.hidden = true; }
    run.addEventListener('click', function () {
      clear(out); fr.hidden = true; end(); run.disabled = true; stop.hidden = false; status.textContent = 'Running...';
      try { w = new Worker(SQL_URL); } catch (e) { end(); status.textContent = ''; fr.textContent = 'The SQL engine could not start in this browser.'; fr.hidden = false; return; }
      t = setTimeout(function () { end(); status.textContent = ''; fr.textContent = 'Stopped: the query ran for more than 10 seconds. Check for a join without a condition.'; fr.hidden = false; }, 10000);
      w.onmessage = function (ev) {
        var m = ev.data; end(); status.textContent = '';
        if (!m.ok) { fr.textContent = m.error + ' - ' + sqlHint(m.error); fr.hidden = false; return; }
        if (!m.results.length) { status.textContent = 'Finished. That statement returns no table (normal for CREATE, INSERT, UPDATE, DELETE). End with a SELECT to see rows.'; return; }
        m.results.forEach(function (r) {
          var head = h('tr', null, r.columns.map(function (c) { return h('th', { text: c }); }));
          var rows = r.values.map(function (row) { return h('tr', null, row.map(function (v) { return h('td', { text: v === null ? 'NULL' : String(v) }); })); });
          out.appendChild(h('div', { class: 'tj-tablewrap' }, [h('table', { class: 'tj-table' }, [head].concat(rows))]));
          out.appendChild(h('div', { class: 'tj-hint', text: r.total + ' row' + (r.total === 1 ? '' : 's') + (r.total > r.values.length ? ' (first ' + r.values.length + ' shown)' : '') }));
        });
      };
      w.onerror = function () { end(); status.textContent = ''; fr.textContent = 'The SQL engine could not start in this browser.'; fr.hidden = false; };
      w.postMessage({ sql: code.value });
    });
    stop.addEventListener('click', function () { end(); status.textContent = 'Stopped.'; });
    reset.addEventListener('click', function () { code.value = start; clear(out); fr.hidden = true; status.textContent = ''; });
    root.appendChild(h('div', { class: 'tj-sql' }, [
      h('p', { class: 'tj-hint', text: 'Practice tables: customers (id, name, county), products (id, name, category, price), sales (id, sale_date, customer_id, product_id, qty). The database is rebuilt on every Run, so you cannot break anything.' }),
      h('label', { text: opts.label || 'SQL (edit it, then press Run)' }), code, h('div', { class: 'tj-row' }, [run, stop, reset]), status, out, fr
    ]));
  }
  LABS.sql = function (el) {
    head('Try the SQL yourself', 'SQL', 'This practice version uses a small shop database. Change the query and run it again.').forEach(function (n) { if (n) el.appendChild(n); });
    mountSql(el, { code: el.getAttribute('data-code') || '' });
  };

  /* ================= hydrate ================= */
  function hydrate(root) {
    (root || document).querySelectorAll('.tj-lab[data-lab]:not([data-ready])').forEach(function (el) {
      el.setAttribute('data-ready', '1');
      var f = LABS[el.getAttribute('data-lab')];
      if (f) { try { f(el); } catch (e) { el.textContent = 'This practice area could not load.'; } }
    });
    (root || document).querySelectorAll('.tj-quiz:not([data-ready])').forEach(function (q) { q.setAttribute('data-ready', '1'); try { initQuiz(q); } catch (e) {} });
  }
  var pending = false;
  function schedule() { if (pending) return; pending = true; requestAnimationFrame(function () { pending = false; hydrate(document); }); }
  function boot() { hydrate(document); try { new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true }); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  window.TJLabs = { hydrate: hydrate, mountPython: mountPython, mountSql: mountSql, labs: Object.keys(LABS), engine: Engine };
})();
