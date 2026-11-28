/* Tujengane practice labs.
   - <div class="tj-lab" data-lab="NAME"></div>  becomes an interactive practice area
   - <section class="tj-quiz" ...>               becomes a check that repeats until the learner gets it right
   Everything runs inside the learner's own browser. Nothing is sent to any server, and nothing here can
   change a lesson, an account or any course content. Lab names: python, password, hash, caesar, phish,
   url, logs, access, risk, order, sql, excel, pivot, linux, git, api, scrape. */
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
    return { setCode: function (c) { code.value = c; start = c; clear(con); fr.hidden = true; }, getCode: function () { return code.value; }, getOutput: function () { return (con.textContent || '').slice(0, 600); } };
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
    var code = h('textarea', { class: 'tj-code', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', 'aria-label': 'SQL editor', rows: Math.max(7, Math.min(14, start.split('\n').length + 2)) });
    var saved = null; if (opts.saveKey) { try { saved = localStorage.getItem(opts.saveKey); } catch (e) {} }
    code.value = saved || start;
    if (opts.saveKey) code.addEventListener('input', function () { try { localStorage.setItem(opts.saveKey, code.value); } catch (e) {} });
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
    var api = { getCode: function () { return code.value; }, getOutput: function () { return (out.textContent + ' ' + (fr.hidden ? '' : fr.textContent) + ' ' + status.textContent).replace(/\s+/g, ' ').trim().slice(0, 600); }, setCode: function (c) { start = c; code.value = c; clear(out); fr.hidden = true; status.textContent = ''; if (opts.saveKey) { try { localStorage.setItem(opts.saveKey, c); } catch (e) {} } } };
    root.appendChild(h('div', { class: 'tj-sql' }, [
      h('p', { class: 'tj-hint', text: 'Practice tables: customers (id, name, county), products (id, name, category, price), sales (id, sale_date, customer_id, product_id, qty). The database is rebuilt on every Run, so you cannot break anything.' }),
      h('label', { text: opts.label || 'SQL (edit it, then press Run)' }), code, h('div', { class: 'tj-row' }, [run, stop, reset]), status, out, fr
    ]));
    return api;
  }
  LABS.sql = function (el) {
    head('Try the SQL yourself', 'SQL', 'This practice version uses a small shop database. Change the query and run it again.').forEach(function (n) { if (n) el.appendChild(n); });
    mountSql(el, { code: el.getAttribute('data-code') || '' });
  };

  /* ================= EXCEL FORMULA LAB (own parser, no eval) ================= */
  var XL = (function () {
    var COLS = 'ABCDEFG';
    function colN(s) { return s.charCodeAt(0) - 64; }
    function addr(c, r) { return COLS.charAt(c - 1) + r; }
    function err(code, why) { var e = new Error(why); e.xl = code; return e; }
    function tokenize(s) {
      var t = [], i = 0, m;
      while (i < s.length) {
        var c = s.charAt(i);
        if (/\s/.test(c)) { i++; continue; }
        if (c === '"') { var j = i + 1, str = ''; while (j < s.length && s.charAt(j) !== '"') str += s.charAt(j++); if (j >= s.length) throw err('#NAME?', 'A text value is missing its closing quote mark (").'); t.push({ k: 's', v: str }); i = j + 1; continue; }
        m = /^\$?[A-G]\$?\d{1,2}(:\$?[A-G]\$?\d{1,2})?/i.exec(s.slice(i));
        if (m && !/^[A-Za-z]/.test(s.slice(i + m[0].length, i + m[0].length + 1))) { t.push({ k: 'r', v: m[0].toUpperCase() }); i += m[0].length; continue; }
        m = /^\d+(\.\d+)?/.exec(s.slice(i)); if (m) { t.push({ k: 'n', v: parseFloat(m[0]) }); i += m[0].length; continue; }
        m = /^[A-Za-z][A-Za-z.]*(?=\()/.exec(s.slice(i)); if (m) { t.push({ k: 'f', v: m[0].toUpperCase() }); i += m[0].length; continue; }
        m = /^(TRUE|FALSE)\b/i.exec(s.slice(i)); if (m) { t.push({ k: 'b', v: m[0].toUpperCase() === 'TRUE' }); i += m[0].length; continue; }
        m = /^(<=|>=|<>|[-+*\/^&=<>%(),])/.exec(s.slice(i)); if (m) { t.push({ k: 'o', v: m[0] }); i += m[0].length; continue; }
        throw err('#NAME?', 'Excel does not recognise "' + s.slice(i, i + 12).split(/[\s,)]/)[0] + '". Check the spelling of the function or cell name.');
      }
      return t;
    }
    function parse(tokens) {
      var p = 0;
      function peek() { return tokens[p]; }
      function isOp(v) { var x = tokens[p]; return x && x.k === 'o' && x.v === v; }
      function expr() { return cmp(); }
      function cmp() { var l = cat(); while (peek() && peek().k === 'o' && /^(=|<>|<=|>=|<|>)$/.test(peek().v)) { var op = tokens[p++].v; l = { t: 'b', op: op, l: l, r: cat() }; } return l; }
      function cat() { var l = add(); while (isOp('&')) { p++; l = { t: 'b', op: '&', l: l, r: add() }; } return l; }
      function add() { var l = mul(); while (isOp('+') || isOp('-')) { var op = tokens[p++].v; l = { t: 'b', op: op, l: l, r: mul() }; } return l; }
      function mul() { var l = pow(); while (isOp('*') || isOp('/')) { var op = tokens[p++].v; l = { t: 'b', op: op, l: l, r: pow() }; } return l; }
      function pow() { var l = un(); while (isOp('^')) { p++; l = { t: 'b', op: '^', l: l, r: un() }; } return l; }
      function un() { if (isOp('-')) { p++; return { t: 'u', e: un() }; } if (isOp('+')) { p++; return un(); } return post(); }
      function post() { var e = prim(); while (isOp('%')) { p++; e = { t: 'b', op: '/', l: e, r: { t: 'n', v: 100 } }; } return e; }
      function prim() {
        var x = tokens[p++];
        if (!x) throw err('#NAME?', 'The formula ends too early. Something is missing after the last symbol.');
        if (x.k === 'n') return { t: 'n', v: x.v };
        if (x.k === 's') return { t: 's', v: x.v };
        if (x.k === 'b') return { t: 'n', v: x.v };
        if (x.k === 'r') return { t: 'r', v: x.v };
        if (x.k === 'f') {
          p++; var args = [];
          if (!isOp(')')) { args.push(expr()); while (isOp(',')) { p++; args.push(expr()); } }
          if (!isOp(')')) throw err('#NAME?', 'A closing bracket ")" is missing. Count your opening and closing brackets.');
          p++; return { t: 'f', n: x.v, a: args };
        }
        if (x.k === 'o' && x.v === '(') { var e = expr(); if (!isOp(')')) throw err('#NAME?', 'A closing bracket ")" is missing. Count your opening and closing brackets.'); p++; return e; }
        throw err('#NAME?', 'Unexpected "' + x.v + '". Check the symbols around it.');
      }
      var tree = expr();
      if (p < tokens.length) throw err('#NAME?', 'Unexpected "' + tokens[p].v + '". Check for a missing comma or operator.');
      return tree;
    }
    function rng(ref) {
      var m = /^\$?([A-G])\$?(\d+)(?::\$?([A-G])\$?(\d+))?$/.exec(ref);
      var c1 = colN(m[1]), r1 = +m[2], c2 = m[3] ? colN(m[3]) : c1, r2 = m[4] ? +m[4] : r1, out = [];
      for (var r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) for (var c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) out.push(addr(c, r));
      return { cells: out, single: !m[3] };
    }
    function num(v) {
      if (v === '' || v === null || v === undefined) return 0;
      if (typeof v === 'number') return v;
      if (typeof v === 'boolean') return v ? 1 : 0;
      if (typeof v === 'string' && v.trim() !== '' && isFinite(Number(v))) return Number(v);
      throw err('#VALUE!', 'Excel tried to do maths on text ("' + String(v).slice(0, 14) + '"). Use a number or a cell that holds a number.');
    }
    function txt(v) { return v === null || v === undefined ? '' : (typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : String(v)); }
    function crit(c) {
      var m = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(txt(c)), op = m[1] || '=', val = m[2], n = val !== '' && isFinite(Number(val)) ? Number(val) : null;
      return function (v) {
        if (n !== null && typeof v === 'number') { if (op === '=') return v === n; if (op === '<>') return v !== n; if (op === '<') return v < n; if (op === '>') return v > n; if (op === '<=') return v <= n; return v >= n; }
        var a = txt(v).toLowerCase(), b = val.toLowerCase();
        if (op === '=') return a === b; if (op === '<>') return a !== b; return false;
      };
    }
    function Sheet(raw) {
      this.raw = raw; this.cache = {}; this.busy = {};
    }
    Sheet.prototype.cell = function (a) {
      var self = this;
      if (a in this.cache) return this.cache[a];
      var r = this.raw[a];
      if (r === undefined || r === '') return (this.cache[a] = '');
      if (typeof r === 'number') return (this.cache[a] = r);
      r = String(r);
      if (r.charAt(0) !== '=') return (this.cache[a] = (r.trim() !== '' && isFinite(Number(r)) ? Number(r) : r));
      if (this.busy[a]) throw err('#REF!', 'This formula points back at itself (circular reference). Move the formula to a cell that is not in its own range.');
      this.busy[a] = 1;
      var out;
      try { out = this.run(parse(tokenize(r.slice(1)))); }
      catch (e) { if (!e.xl) throw e; out = { error: e.xl, why: e.message }; }
      this.busy[a] = 0;
      return (this.cache[a] = out);
    };
    Sheet.prototype.val = function (v) { if (v && v.error) { var e = new Error(v.why); e.xl = v.error; throw e; } return v; };
    Sheet.prototype.flat = function (node) {
      var self = this;
      if (node.t === 'r') { return rng(node.v).cells.map(function (c) { return self.val(self.cell(c)); }); }
      return [this.run(node)];
    };
    Sheet.prototype.run = function (n) {
      var self = this;
      switch (n.t) {
        case 'n': case 's': return n.v;
        case 'r': { var r = rng(n.v); if (!r.single) throw err('#VALUE!', 'A range (' + n.v + ') cannot be used on its own here. Put it inside a function such as SUM().'); return this.val(this.cell(r.cells[0])); }
        case 'u': return -num(this.run(n.e));
        case 'b': {
          var a = this.run(n.l), b = this.run(n.r);
          if (n.op === '&') return txt(a) + txt(b);
          if (/^(=|<>|<=|>=|<|>)$/.test(n.op)) {
            var x = a, y = b; if (typeof x === 'string' && typeof y === 'string') { x = x.toLowerCase(); y = y.toLowerCase(); }
            return n.op === '=' ? x === y : n.op === '<>' ? x !== y : n.op === '<' ? x < y : n.op === '>' ? x > y : n.op === '<=' ? x <= y : x >= y;
          }
          a = num(a); b = num(b);
          if (n.op === '+') return a + b; if (n.op === '-') return a - b; if (n.op === '*') return a * b; if (n.op === '^') return Math.pow(a, b);
          if (b === 0) throw err('#DIV/0!', 'You divided by zero or by an empty cell. Check the cell you are dividing by.');
          return a / b;
        }
        case 'f': return this.fn(n);
      }
    };
    Sheet.prototype.fn = function (n) {
      var self = this, A = n.a, name = n.n;
      function need(min, max) { if (A.length < min || A.length > max) throw err('#VALUE!', name + ' needs ' + (min === max ? min : min + ' to ' + max) + ' inputs, but you gave ' + A.length + '. Check the commas.'); }
      function nums(list) { var o = []; list.forEach(function (node) { self.flat(node).forEach(function (v) { if (node.t === 'r') { if (typeof v === 'number') o.push(v); } else o.push(num(v)); }); }); return o; }
      switch (name) {
        case 'SUM': return nums(A).reduce(function (s, v) { return s + v; }, 0);
        case 'AVERAGE': { var l = nums(A); if (!l.length) throw err('#DIV/0!', 'AVERAGE found no numbers to average. Check that the range holds numbers.'); return l.reduce(function (s, v) { return s + v; }, 0) / l.length; }
        case 'MIN': { var l2 = nums(A); return l2.length ? Math.min.apply(null, l2) : 0; }
        case 'MAX': { var l3 = nums(A); return l3.length ? Math.max.apply(null, l3) : 0; }
        case 'COUNT': return nums(A).length;
        case 'COUNTA': { var c = 0; A.forEach(function (node) { self.flat(node).forEach(function (v) { if (v !== '') c++; }); }); return c; }
        case 'ROUND': { need(2, 2); var f = Math.pow(10, num(this.run(A[1]))); return Math.round((num(this.run(A[0])) + 1e-12) * f) / f; }
        case 'ABS': need(1, 1); return Math.abs(num(this.run(A[0])));
        case 'IF': need(2, 3); return this.run(A[0]) ? this.run(A[1]) : (A.length > 2 ? this.run(A[2]) : false);
        case 'AND': return A.every(function (x) { return !!self.run(x); });
        case 'OR': return A.some(function (x) { return !!self.run(x); });
        case 'NOT': need(1, 1); return !this.run(A[0]);
        case 'IFERROR': { need(2, 2); try { return this.run(A[0]); } catch (e) { if (!e.xl) throw e; return this.run(A[1]); } }
        case 'SUMIF': case 'COUNTIF': {
          need(name === 'SUMIF' ? 3 : 2, name === 'SUMIF' ? 3 : 2);
          var f2 = crit(this.run(A[1])), keys = this.flat(A[0]), sum = name === 'SUMIF' ? this.flat(A[2]) : null, t = 0;
          keys.forEach(function (k, i) { if (f2(k)) t += sum ? (typeof sum[i] === 'number' ? sum[i] : 0) : 1; });
          return t;
        }
        case 'VLOOKUP': {
          need(3, 4); var key = this.run(A[0]); if (A[1].t !== 'r') throw err('#VALUE!', 'VLOOKUP needs a table range such as A2:D7 as its second input.');
          var rg = rng(A[1].v), cols = 0, rows = {}, ci = num(this.run(A[2])); rg.cells.forEach(function (a) { var cc = colN(a.charAt(0)); rows[cc] = 1; });
          var cl = Object.keys(rows).map(Number).sort(function (a, b) { return a - b; }), r0 = cl[0];
          if (ci < 1 || ci > cl.length) throw err('#REF!', 'The column number ' + ci + ' is outside the table. The table has ' + cl.length + ' columns.');
          var exact = A.length > 3 ? !this.run(A[3]) : false; if (!exact) throw err('#VALUE!', 'Use FALSE as the last input so VLOOKUP finds an exact match, e.g. VLOOKUP(A2, A2:D7, 3, FALSE).');
          var lines = {}; rg.cells.forEach(function (a) { var rr = +a.slice(1); (lines[rr] = lines[rr] || {})[colN(a.charAt(0))] = a; });
          var hit = Object.keys(lines).sort(function (a, b) { return a - b; }).filter(function (rr) { var v = self.val(self.cell(lines[rr][r0])); return txt(v).toLowerCase() === txt(key).toLowerCase(); })[0];
          if (hit === undefined) throw err('#N/A', 'VLOOKUP could not find "' + txt(key) + '" in the first column of the table. Check spelling and spaces.');
          return this.val(this.cell(lines[hit][cl[ci - 1]]));
        }
        case 'UPPER': need(1, 1); return txt(this.run(A[0])).toUpperCase();
        case 'LOWER': need(1, 1); return txt(this.run(A[0])).toLowerCase();
        case 'TRIM': need(1, 1); return txt(this.run(A[0])).replace(/\s+/g, ' ').trim();
        case 'LEN': need(1, 1); return txt(this.run(A[0])).length;
        case 'LEFT': need(1, 2); return txt(this.run(A[0])).slice(0, A.length > 1 ? num(this.run(A[1])) : 1);
        case 'RIGHT': { need(1, 2); var s = txt(this.run(A[0])), k = A.length > 1 ? num(this.run(A[1])) : 1; return k ? s.slice(-k) : ''; }
        case 'CONCATENATE': return A.map(function (x) { return txt(self.run(x)); }).join('');
      }
      throw err('#NAME?', 'Excel does not know a function called ' + name + ' (in this practice area). Check the spelling.');
    };
    function shift(formula, dr, dc) { // fill-down / fill-right: move relative references, keep $ ones
      return formula.replace(/(\$?)([A-G])(\$?)(\d{1,2})/g, function (m, d1, c, d2, r) { return d1 + (d1 ? c : COLS.charAt(Math.max(0, Math.min(6, colN(c) - 1 + dc)))) + d2 + (d2 ? r : (+r + dr)); });
    }
    function show(v) {
      if (v && v.error) return v.error;
      if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
      if (typeof v === 'number') return String(Math.round(v * 1e6) / 1e6);
      return v === undefined || v === null ? '' : String(v);
    }
    return { Sheet: Sheet, shift: shift, show: show, addr: addr };
  })();

  var XL_DATA = { A1: 'Item', B1: 'Qty', C1: 'Price', D1: 'Total', A2: 'Maize', B2: 12, C2: 90, A3: 'Beans', B3: 8, C3: 150, A4: 'Rice', B4: 5, C4: 160, A5: 'Sugar', B5: 20, C5: 140, A6: 'Maize', B6: 4, C6: 90, A7: 'Salt', B7: 0, C7: 30 };
  var XL_TASKS = [
    { q: 'In D2 work out the total for Maize: Qty times Price. Then use fill-down to copy it to D7.', cell: 'D2', fill: 'D7', expect: { D2: 1080, D3: 1200, D4: 800, D5: 2800, D6: 360, D7: 0 }, tip: '=B2*C2 then press Fill down. The references move row by row because they have no $.' },
    { q: 'In F1 add up all the Totals in column D (D2 to D7). Fill D2:D7 first.', cell: 'F1', expect: { F1: 6240 }, need: { D2: 1 }, tip: '=SUM(D2:D7). A range uses a colon.' },
    { q: 'In F2 find the average Price in column C (C2 to C7).', cell: 'F2', expect: { F2: 110 }, tip: '=AVERAGE(C2:C7)' },
    { q: 'In F3 add up the Qty for Maize only, using SUMIF.', cell: 'F3', expect: { F3: 16 }, tip: '=SUMIF(A2:A7,"Maize",B2:B7). Order: where to look, what to match, what to add.' },
    { q: 'In F4 look up the price of Rice using VLOOKUP and show the price.', cell: 'F4', expect: { F4: 160 }, tip: '=VLOOKUP("Rice",A2:C7,3,FALSE). Column 3 of the table is Price.' },
    { q: 'In E2 write IF to show "Restock" when Qty is below 6, otherwise "OK". Fill down to E7.', cell: 'E2', fill: 'E7', expect: { E2: 'OK', E4: 'Restock', E7: 'Restock' }, tip: '=IF(B2<6,"Restock","OK")' },
    { q: 'In F5 divide the Total of Maize (D2) by Qty of Salt (B7) but show "n/a" instead of an error.', cell: 'F5', expect: { F5: 'n/a' }, need: { D2: 1 }, tip: '=IFERROR(D2/B7,"n/a"). Dividing by zero gives #DIV/0!, IFERROR catches it.' }
  ];
  LABS.excel = function (el) {
    head('Practise Excel formulas', 'Excel', 'A small shop sheet. Pick a task, click a cell, type a formula starting with = and press Enter. Plain-English help appears if it errors.').forEach(function (n) { if (n) el.appendChild(n); });
    var raw = {}, sel = 'D2', task = 0, grid = h('div', { class: 'tj-tablewrap tj-xlwrap' }), msg = h('div', { class: 'tj-friendly', role: 'status', 'aria-live': 'polite' }),
      bar = h('input', { type: 'text', class: 'tj-xlbar', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off', 'aria-label': 'Formula bar' }),
      nameBox = h('span', { class: 'tj-xlname', text: sel }), q = h('p', { class: 'tj-xltask' }), res = h('div', { class: 'tj-out', hidden: true }),
      pick = h('select', { 'aria-label': 'Choose a task' }, XL_TASKS.map(function (t, i) { return h('option', { value: String(i), text: 'Task ' + (i + 1) }); }));
    Object.keys(XL_DATA).forEach(function (k) { raw[k] = XL_DATA[k]; });
    var cells = {};
    function sheet() { return new XL.Sheet(raw); }
    function paint() {
      var s = sheet(); clear(grid);
      var rows = [h('tr', null, [h('th', { text: '' })].concat('ABCDEF'.split('').map(function (c) { return h('th', { text: c }); })))];
      for (var r = 1; r <= 7; r++) {
        var tds = [h('th', { text: String(r) })];
        'ABCDEF'.split('').forEach(function (c) {
          var a = c + r, v; try { v = XL.show(s.cell(a)); } catch (e) { v = e.xl || '#ERR'; }
          var d = h('td', { tabindex: '0', class: 'tj-xlcell' + (a === sel ? ' tj-sel' : '') + (/^#/.test(v) ? ' tj-xlerr' : '') + (r === 1 && /^[A-D]$/.test(c) ? ' tj-xlhead' : ''), text: v });
          d.addEventListener('click', function () { choose(a); }); d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(a); } });
          tds.push(d);
        });
        rows.push(h('tr', null, tds));
      }
      grid.appendChild(h('table', { class: 'tj-table tj-xl' }, rows));
    }
    function choose(a) { sel = a; nameBox.textContent = a; bar.value = raw[a] === undefined ? '' : String(raw[a]); paint(); bar.focus(); }
    function explain(a) {
      var v; try { v = sheet().cell(a); } catch (e) { return e.message; }
      return v && v.error ? v.error + ' - ' + v.why : '';
    }
    function commit() {
      var a = sel, v = bar.value;
      if (XL_DATA[a] !== undefined && a.charAt(1) === '1' ) { msg.textContent = 'Row 1 is the header row. Choose an empty cell to practise in.'; msg.hidden = false; bar.value = String(raw[a]); return; }
      if (XL_DATA[a] !== undefined) { msg.textContent = 'That cell holds the practice data. Choose an empty cell (columns D to F).'; msg.hidden = false; bar.value = String(raw[a]); return; }
      if (v.trim() === '') delete raw[a]; else raw[a] = v.trim();
      var e = explain(a); msg.hidden = !e; msg.textContent = e; paint();
    }
    bar.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); commit(); } });
    bar.addEventListener('blur', commit);
    function setTask(i) { task = i; var t = XL_TASKS[i]; q.textContent = t.q; res.hidden = true; choose(t.cell); }
    pick.addEventListener('change', function () { setTask(+pick.value); });
    var fill = h('button', { type: 'button', class: 'tj-btn tj-ghost' }, ['Fill down']), check = h('button', { type: 'button', class: 'tj-btn' }, ['Check answer']), tip = h('button', { type: 'button', class: 'tj-btn tj-ghost' }, ['Hint']), rst = h('button', { type: 'button', class: 'tj-btn tj-ghost' }, ['Reset']);
    fill.addEventListener('click', function () {
      var t = XL_TASKS[task], r0 = +sel.slice(1), col = sel.charAt(0), f = raw[sel];
      if (!f || String(f).charAt(0) !== '=') { msg.textContent = 'Fill down copies a formula. Type a formula in the selected cell first.'; msg.hidden = false; return; }
      var last = (t.fill && t.fill.charAt(0) === col) ? +t.fill.slice(1) : 7;
      for (var r = r0 + 1; r <= last; r++) raw[col + r] = XL.shift(String(f), r - r0, 0);
      msg.hidden = true; paint();
    });
    tip.addEventListener('click', function () { res.hidden = false; res.className = 'tj-out'; res.textContent = 'Hint: ' + XL_TASKS[task].tip; });
    rst.addEventListener('click', function () { raw = {}; Object.keys(XL_DATA).forEach(function (k) { raw[k] = XL_DATA[k]; }); msg.hidden = true; res.hidden = true; setTask(task); });
    check.addEventListener('click', function () {
      var t = XL_TASKS[task], s = sheet(), bad = [];
      Object.keys(t.need || {}).forEach(function (k) { if (raw[k] === undefined) bad.push('Fill ' + k + ' first.'); });
      Object.keys(t.expect).forEach(function (k) {
        var v; try { v = s.cell(k); } catch (e) { v = null; }
        if (raw[k] === undefined || String(raw[k]).charAt(0) !== '=') bad.push(k + ' needs a formula (start with =), not a typed answer.');
        else if (v && v.error) bad.push(k + ' shows ' + v.error + '.');
        else if (v !== t.expect[k]) bad.push(k + ' shows ' + XL.show(v) + ' but should be ' + t.expect[k] + '.');
      });
      res.hidden = false;
      if (!bad.length) { res.className = 'tj-out tj-good'; res.textContent = 'Correct. Your formula gives the right answer and it is a real formula, so it updates when the data changes.'; }
      else { res.className = 'tj-out tj-bad'; res.textContent = bad[0] + ' Press Hint if you are stuck.'; }
    });
    el.appendChild(h('div', { class: 'tj-row' }, [h('label', { text: 'Task' }), pick]));
    el.appendChild(q);
    el.appendChild(h('div', { class: 'tj-xlbarrow' }, [nameBox, h('span', { class: 'tj-xlfx', text: 'fx' }), bar]));
    el.appendChild(grid); el.appendChild(msg); msg.hidden = true;
    el.appendChild(h('div', { class: 'tj-row' }, [fill, check, tip, rst])); el.appendChild(res);
    setTask(0);
  };

  /* ================= PIVOT LAB ================= */
  var PV = (function () {
    var regions = ['Nairobi', 'Mombasa', 'Kisumu'], prods = ['Maize', 'Beans', 'Rice'], months = ['Jan', 'Feb'], rows = [], s = 3;
    regions.forEach(function (rg, i) { prods.forEach(function (p, j) { months.forEach(function (m, k) {
      s = (s * 9301 + 49297) % 233280; var qty = 5 + (s % 20); rows.push({ Region: rg, Product: p, Month: m, Qty: qty, Revenue: qty * (80 + j * 40 + i * 5) });
    }); }); });
    return rows;
  })();
  var PV_TASKS = [
    { q: 'Show total Revenue for each Region.', rows: 'Region', cols: '', val: 'Revenue', agg: 'Sum', filter: '' },
    { q: 'Show the average Qty for each Product.', rows: 'Product', cols: '', val: 'Qty', agg: 'Average', filter: '' },
    { q: 'Show total Revenue with Region down the side and Month across the top.', rows: 'Region', cols: 'Month', val: 'Revenue', agg: 'Sum', filter: '' },
    { q: 'Count how many sales rows each Product has, only for Nairobi.', rows: 'Product', cols: '', val: 'Qty', agg: 'Count', filter: 'Nairobi' }
  ];
  LABS.pivot = function (el) {
    head('Build a pivot table', 'Pivot', 'This is the same idea as an Excel PivotTable: choose what goes down the side, across the top, what to measure and how. 18 sales rows are summarised.').forEach(function (n) { if (n) el.appendChild(n); });
    function sel(label, opts, val) { var s = h('select', { 'aria-label': label }, opts.map(function (o) { return h('option', { value: o[0], text: o[1] }); })); s.value = val; return s; }
    var dims = [['Region', 'Region'], ['Product', 'Product'], ['Month', 'Month']];
    var rS = sel('Rows', dims, 'Region'), cS = sel('Columns', [['', '(none)']].concat(dims), ''), vS = sel('Values', [['Revenue', 'Revenue'], ['Qty', 'Qty']], 'Revenue'),
      aS = sel('Summarise by', [['Sum', 'Sum'], ['Average', 'Average'], ['Count', 'Count'], ['Max', 'Max']], 'Sum'), fS = sel('Filter Region', [['', 'All regions'], ['Nairobi', 'Nairobi'], ['Mombasa', 'Mombasa'], ['Kisumu', 'Kisumu']], '');
    var out = h('div', { class: 'tj-tablewrap' }), qp = h('p', { class: 'tj-xltask' }), res = h('div', { class: 'tj-out', hidden: true }), task = 0;
    var pick = h('select', { 'aria-label': 'Choose a task' }, PV_TASKS.map(function (t, i) { return h('option', { value: String(i), text: 'Task ' + (i + 1) }); }));
    function agg(list, a, v) {
      if (!list.length) return '';
      if (a === 'Count') return list.length;
      var xs = list.map(function (r) { return r[v]; });
      if (a === 'Sum') return xs.reduce(function (p, c) { return p + c; }, 0);
      if (a === 'Max') return Math.max.apply(null, xs);
      return Math.round(xs.reduce(function (p, c) { return p + c; }, 0) / xs.length * 10) / 10;
    }
    function uniq(f, data) { var o = []; data.forEach(function (r) { if (o.indexOf(r[f]) < 0) o.push(r[f]); }); return o; }
    function paint() {
      clear(out);
      var data = PV.filter(function (r) { return !fS.value || r.Region === fS.value; }), rf = rS.value, cf = cS.value;
      if (cf === rf) { out.appendChild(h('p', { class: 'tj-hint', text: 'Rows and Columns are the same field. Choose a different Columns field, or (none).' })); return; }
      var rv = uniq(rf, data), cv = cf ? uniq(cf, data) : [];
      var head1 = [h('th', { text: rf })].concat(cf ? cv.map(function (c) { return h('th', { text: c }); }) : [h('th', { text: aS.value + ' of ' + vS.value })]).concat(cf ? [h('th', { text: 'Grand total' })] : []);
      var body = rv.map(function (r) {
        var sub = data.filter(function (x) { return x[rf] === r; });
        var cells = cf ? cv.map(function (c) { return h('td', { text: String(agg(sub.filter(function (x) { return x[cf] === c; }), aS.value, vS.value)) }); }).concat([h('td', { class: 'tj-b', text: String(agg(sub, aS.value, vS.value)) })]) : [h('td', { text: String(agg(sub, aS.value, vS.value)) })];
        return h('tr', null, [h('th', { text: r })].concat(cells));
      });
      var tot = h('tr', { class: 'tj-total' }, [h('th', { text: 'Grand total' })].concat(cf ? cv.map(function (c) { return h('td', { text: String(agg(data.filter(function (x) { return x[cf] === c; }), aS.value, vS.value)) }); }).concat([h('td', { class: 'tj-b', text: String(agg(data, aS.value, vS.value)) })]) : [h('td', { class: 'tj-b', text: String(agg(data, aS.value, vS.value)) })]));
      out.appendChild(h('table', { class: 'tj-table' }, [h('tr', null, head1)].concat(body).concat([tot])));
    }
    function setTask(i) { task = i; qp.textContent = PV_TASKS[i].q; res.hidden = true; }
    [rS, cS, vS, aS, fS].forEach(function (s) { s.addEventListener('change', paint); });
    pick.addEventListener('change', function () { setTask(+pick.value); });
    var check = h('button', { type: 'button', class: 'tj-btn' }, ['Check answer']);
    check.addEventListener('click', function () {
      var t = PV_TASKS[task], miss = [];
      if (rS.value !== t.rows) miss.push('Rows should be ' + t.rows);
      if (cS.value !== t.cols) miss.push('Columns should be ' + (t.cols || '(none)'));
      if (aS.value !== t.agg) miss.push('Summarise by ' + t.agg);
      if (t.agg !== 'Count' && vS.value !== t.val) miss.push('Values should be ' + t.val);
      if (fS.value !== t.filter) miss.push(t.filter ? 'Filter the Region to ' + t.filter : 'Set the filter to All regions');
      res.hidden = false;
      if (!miss.length) { res.className = 'tj-out tj-good'; res.textContent = 'Correct. That is exactly the question asked. Notice how the grand total always matches the sum of the rows.'; }
      else { res.className = 'tj-out tj-bad'; res.textContent = 'Not yet: ' + miss[0] + '.'; }
    });
    var ctl = h('div', { class: 'tj-pvctl' }, [['Rows', rS], ['Columns', cS], ['Values', vS], ['Summarise by', aS], ['Filter', fS]].map(function (p) { return h('label', { class: 'tj-pvf' }, [p[0], p[1]]); }));
    el.appendChild(h('div', { class: 'tj-row' }, [h('label', { text: 'Task' }), pick])); el.appendChild(qp); el.appendChild(ctl); el.appendChild(out);
    el.appendChild(h('div', { class: 'tj-row' }, [check])); el.appendChild(res);
    setTask(0); paint();
  };

  /* ================= GUIDED LABS: terminal (Linux/Git), API response, web scraping ================= */
  function taskLab(el, title, tag, hint, tasks, mk) {
    head(title, tag, hint).forEach(function (n) { if (n) el.appendChild(n); });
    var i = 0, q = h('p', { class: 'tj-xltask' }), prog = h('div', { class: 'tj-hint' }), res = h('div', { class: 'tj-out', hidden: true }), box = h('div'), api = {};
    var hintBtn = h('button', { type: 'button', class: 'tj-btn tj-ghost' }, ['Hint']), chk = h('button', { type: 'button', class: 'tj-btn' }, ['Check answer']), nxt = h('button', { type: 'button', class: 'tj-btn tj-ghost', hidden: true }, ['Next task']), rst = h('button', { type: 'button', class: 'tj-btn tj-ghost' }, ['Reset']);
    function set(n) { i = n; q.textContent = tasks[n].q; prog.textContent = 'Task ' + (n + 1) + ' of ' + tasks.length; res.hidden = true; nxt.hidden = true; if (api.onTask) api.onTask(tasks[n], n); }
    hintBtn.addEventListener('click', function () { res.hidden = false; res.className = 'tj-out'; res.textContent = 'Hint: ' + tasks[i].tip; });
    chk.addEventListener('click', function () {
      var m = tasks[i].test(api.state()); res.hidden = false;
      if (m === true) { res.className = 'tj-out tj-good'; res.textContent = tasks[i].ok || 'Correct.'; if (i < tasks.length - 1) nxt.hidden = false; else res.textContent += ' That was the last task. Well done.'; }
      else { res.className = 'tj-out tj-bad'; res.textContent = m + ' Press Hint if you are stuck.'; }
    });
    nxt.addEventListener('click', function () { set(i + 1); });
    rst.addEventListener('click', function () { api.reset && api.reset(); set(i); });
    el.appendChild(prog); el.appendChild(q); mk(box, api); el.appendChild(box); el.appendChild(h('div', { class: 'tj-row' }, [chk, hintBtn, nxt, rst])); el.appendChild(res); set(0);
  }

  /* --- terminal --- */
  function VFS(mode) {
    var s = { cwd: '/home/learner', files: {}, dirs: { '/': 1, '/home': 1, '/home/learner': 1 }, git: null, branch: 'main', ok: true };
    if (mode === 'linux') {
      ['/home/learner/data', '/home/learner/data/logs'].forEach(function (d) { s.dirs[d] = 1; });
      s.files['/home/learner/data/sales.csv'] = 'date,item,amount\n2026-01-02,Maize,1200\n2026-01-03,Beans,800\n2026-01-04,Maize,1500\n';
      s.files['/home/learner/data/logs/app.log'] = 'INFO start\nERROR disk full\nINFO ok\nERROR timeout\nINFO done\n';
    }
    return s;
  }
  function pathOf(s, p) {
    if (!p) return s.cwd; var parts = (p.charAt(0) === '/' ? p : s.cwd + '/' + p).split('/'), o = [];
    parts.forEach(function (x) { if (!x || x === '.') return; if (x === '..') o.pop(); else o.push(x); }); return '/' + o.join('/');
  }
  function unq(a) { return a.map(function (x) { return x.replace(/^(["'])(.*)\1$/, '$2'); }); }
  function split(line) { var m = line.match(/"[^"]*"|'[^']*'|\S+/g) || []; return m; }
  function runCmd(s, line) {
    var t = split(line); if (!t.length) return '';
    var c = t[0], a = t.slice(1), out = [];
    function isDir(p) { return !!s.dirs[p]; }
    function kids(d) { var n = {}; Object.keys(s.dirs).concat(Object.keys(s.files)).forEach(function (k) { if (k !== d && k.indexOf(d === '/' ? '/' : d + '/') === 0) { var r = k.slice(d === '/' ? 1 : d.length + 1); if (r.indexOf('/') < 0) n[r] = isDir(k) ? 'd' : 'f'; } }); return n; }
    var redir = t.indexOf('>'), redir2 = t.indexOf('>>');
    if (c === 'echo') {
      var ri = redir2 > 0 ? redir2 : redir; var body = unq(t.slice(1, ri > 0 ? ri : t.length)).join(' ');
      if (ri > 0) { var f = pathOf(s, unq([t[ri + 1] || ''])[0]); if (!t[ri + 1]) return 'echo: write to which file? Add a file name after >.'; s.files[f] = (ri === redir2 && s.files[f] ? s.files[f] : '') + body + '\n'; return ''; }
      return body;
    }
    if (c === 'pwd') return s.cwd;
    if (c === 'ls') { var fl = a.filter(function (x) { return x.charAt(0) === '-'; }), tg = pathOf(s, a.filter(function (x) { return x.charAt(0) !== '-'; })[0]); if (s.files[tg]) return tg.split('/').pop(); if (!isDir(tg)) return 'ls: cannot access: No such file or directory'; var k = kids(tg); return Object.keys(k).sort().map(function (n) { return fl.length ? (k[n] === 'd' ? 'drwxr-xr-x ' : '-rw-r--r-- ') + n : n + (k[n] === 'd' ? '/' : ''); }).join(fl.length ? '\n' : '  '); }
    if (c === 'cd') { var d = a[0] ? pathOf(s, a[0]) : '/home/learner'; if (!isDir(d)) return 'cd: ' + a[0] + ': No such directory. Use ls to see what is here.'; s.cwd = d; return ''; }
    if (c === 'mkdir') { if (!a[0]) return 'mkdir: missing folder name'; a.filter(function (x) { return x.charAt(0) !== '-'; }).forEach(function (x) { var p = pathOf(s, x); if (!isDir(pathOf(s, p + '/..')) && a.indexOf('-p') < 0) out.push('mkdir: parent folder does not exist (use mkdir -p)'); else s.dirs[p] = 1; }); return out.join('\n'); }
    if (c === 'touch') { a.forEach(function (x) { var p = pathOf(s, x); if (!(p in s.files)) s.files[p] = ''; }); return ''; }
    if (c === 'cat') { var p = pathOf(s, a[0]); return p in s.files ? s.files[p].replace(/\n$/, '') : 'cat: ' + a[0] + ': No such file'; }
    if (c === 'rm') { var p2 = pathOf(s, a.filter(function (x) { return x.charAt(0) !== '-'; })[0]); if (p2 in s.files) { delete s.files[p2]; return ''; } return 'rm: cannot remove: No such file (this practice rm only removes files).'; }
    if (c === 'cp') { var p3 = pathOf(s, a[0]), p4 = pathOf(s, a[1]); if (!(p3 in s.files)) return 'cp: no such file: ' + a[0]; if (isDir(p4)) p4 += '/' + p3.split('/').pop(); s.files[p4] = s.files[p3]; return ''; }
    if (c === 'head' || c === 'wc' || c === 'grep') {
      var argv = a.slice(); var n = 10, flag = '', pat = null, file = null;
      if (c === 'head') { var ni = argv.indexOf('-n'); if (ni >= 0) { n = +argv[ni + 1]; argv.splice(ni, 2); } file = argv[0]; }
      else if (c === 'wc') { flag = argv.filter(function (x) { return x.charAt(0) === '-'; })[0] || ''; file = argv.filter(function (x) { return x.charAt(0) !== '-'; })[0]; }
      else { flag = argv.filter(function (x) { return x.charAt(0) === '-'; })[0] || ''; var r = argv.filter(function (x) { return x.charAt(0) !== '-'; }); pat = unq([r[0] || ''])[0]; file = r[1]; }
      if (!file) return c + ': which file? Add a file name.'; var fp = pathOf(s, file); if (!(fp in s.files)) return c + ': ' + file + ': No such file';
      var lines = s.files[fp].replace(/\n$/, '').split('\n'); if (s.files[fp] === '') lines = [];
      if (c === 'head') return lines.slice(0, n).join('\n');
      if (c === 'wc') return flag === '-l' ? lines.length + ' ' + file : lines.length + ' lines ' + file;
      var hit = lines.filter(function (l) { return flag.indexOf('i') > 0 ? l.toLowerCase().indexOf(pat.toLowerCase()) >= 0 : l.indexOf(pat) >= 0; });
      return flag.indexOf('c') > 0 ? String(hit.length) : hit.join('\n');
    }
    if (c === 'git') {
      var sub = a[0], g = s.git;
      if (sub === 'init') { s.git = { commits: [], staged: {}, branches: { main: [] }, head: 'main', files: {} }; s.branch = 'main'; return 'Initialised empty Git repository in ' + s.cwd + '/.git'; }
      if (!g) return 'fatal: not a git repository. Run git init first.';
      var tracked = function () { return Object.keys(s.files).filter(function (f) { return f.indexOf(s.cwd + '/') === 0; }); };
      if (sub === 'status') {
        var st = Object.keys(g.staged), un = tracked().filter(function (f) { var rel = f.slice(s.cwd.length + 1); return !(rel in g.staged) && g.files[rel] !== s.files[f]; }).map(function (f) { return f.slice(s.cwd.length + 1); });
        var o = ['On branch ' + g.head]; if (st.length) o.push('Changes to be committed: ' + st.join(', ')); if (un.length) o.push('Not staged / untracked: ' + un.join(', ')); if (!st.length && !un.length) o.push('Nothing to commit, working tree clean'); return o.join('\n');
      }
      if (sub === 'add') { var targets = a[1] === '.' ? tracked().map(function (f) { return f.slice(s.cwd.length + 1); }) : [a[1]]; if (!a[1]) return 'Nothing specified. Use git add <file> or git add .'; var bad = ''; targets.forEach(function (rel) { var f = pathOf(s, rel); if (!(f in s.files)) bad = "fatal: pathspec '" + rel + "' did not match any files"; else g.staged[rel] = s.files[f]; }); return bad; }
      if (sub === 'commit') { var mi = a.indexOf('-m'); if (mi < 0 || !a[mi + 1]) return 'Add a message: git commit -m "what you changed"'; if (!Object.keys(g.staged).length) return 'Nothing staged. Use git add first.'; Object.keys(g.staged).forEach(function (k) { g.files[k] = g.staged[k]; }); g.branches[g.head] = g.branches[g.head].concat([unq([a[mi + 1]])[0]]); g.staged = {}; return '[' + g.head + '] ' + unq([a[mi + 1]])[0]; }
      if (sub === 'log') { var cs = g.branches[g.head]; return cs.length ? cs.slice().reverse().join('\n') : 'No commits yet'; }
      if (sub === 'branch') { if (!a[1]) return Object.keys(g.branches).map(function (b) { return (b === g.head ? '* ' : '  ') + b; }).join('\n'); g.branches[a[1]] = g.branches[g.head].slice(); return ''; }
      if (sub === 'checkout' || sub === 'switch') { var nb = a.indexOf('-b') >= 0 ? a[a.indexOf('-b') + 1] : null, tg2 = nb || a[1]; if (nb) g.branches[nb] = g.branches[g.head].slice(); if (!g.branches[tg2]) return "error: no branch named '" + tg2 + "'"; g.head = tg2; return "Switched to branch '" + tg2 + "'"; }
      return 'This practice terminal supports: init, status, add, commit -m, log, branch, checkout -b.';
    }
    if (c === 'help') return 'Try: pwd, ls, cd, mkdir, touch, echo, cat, cp, rm, head, wc, grep, git';
    return c + ': command not found in this practice terminal. Type help to see what works.';
  }
  var SH_TASKS = {
    linux: [
      { q: 'Go into the data folder and list what is inside.', tip: 'cd data  then  ls', test: function (s) { return s.cwd === '/home/learner/data' ? true : 'You are in ' + s.cwd + '. Use cd to enter the data folder.'; } },
      { q: 'Count how many lines are in sales.csv.', tip: 'wc -l sales.csv', test: function (s) { return s.hist.some(function (x) { return /^wc\s+-l\s+(\S*sales\.csv)/.test(x); }) ? true : 'Run wc -l on sales.csv.'; } },
      { q: 'Show only the ERROR lines of logs/app.log.', tip: 'grep ERROR logs/app.log', test: function (s) { return s.hist.some(function (x) { return /^grep\s+("?ERROR"?|-i\s+"?error"?)\s+\S*app\.log/.test(x); }) ? true : 'Use grep ERROR with the log file path.'; } },
      { q: 'Create a folder called reports inside data, then make an empty file notes.txt in it.', tip: 'mkdir reports  then  touch reports/notes.txt', test: function (s) { return '/home/learner/data/reports/notes.txt' in s.files ? true : 'The file data/reports/notes.txt does not exist yet.'; } },
      { q: 'Write the text done into data/reports/notes.txt using echo and >.', tip: 'echo done > reports/notes.txt', test: function (s) { return (s.files['/home/learner/data/reports/notes.txt'] || '').trim() === 'done' ? true : 'notes.txt should contain exactly: done'; } }
    ],
    git: [
      { q: 'Start a Git repository in this folder.', tip: 'git init', test: function (s) { return s.git ? true : 'Run git init.'; } },
      { q: 'Create a file report.txt with some text, then stage it.', tip: 'echo draft > report.txt  then  git add report.txt', test: function (s) { return s.git && s.git.staged['report.txt'] ? true : 'report.txt is not staged. Create it, then git add it.'; } },
      { q: 'Commit it with the message "first draft".', tip: 'git commit -m "first draft"', test: function (s) { return s.git && s.git.branches.main.indexOf('first draft') >= 0 ? true : 'No commit with the message first draft yet.'; } },
      { q: 'Create and switch to a new branch called cleanup.', tip: 'git checkout -b cleanup', test: function (s) { return s.git && s.git.head === 'cleanup' ? true : 'You are on ' + (s.git ? s.git.head : 'no branch') + '. Use git checkout -b cleanup.'; } },
      { q: 'Change report.txt, stage and commit it with a message, then run git log.', tip: 'echo more >> report.txt, git add report.txt, git commit -m "cleaned", git log', test: function (s) { return s.git && s.git.branches.cleanup && s.git.branches.cleanup.length >= 2 && s.hist.some(function (x) { return /^git log/.test(x); }) ? true : 'You need a second commit on cleanup and a git log.'; } }
    ]
  };
  function mkShell(mode) {
    return function (el) {
      var st, hist, log, inp;
      function fresh() { st = VFS(mode); st.hist = []; hist = st.hist; if (mode === 'git') st.cwd = '/home/learner'; }
      fresh();
      taskLab(el, mode === 'git' ? 'Practise Git in a safe terminal' : 'Practise the Linux terminal', mode === 'git' ? 'Git' : 'Linux', 'A pretend terminal that cannot touch your computer. Type a command and press Enter. Type help for the list.', SH_TASKS[mode], function (box, api) {
        log = h('pre', { class: 'tj-term', 'aria-live': 'polite' }); inp = h('input', { type: 'text', class: 'tj-termin', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off', 'aria-label': 'Terminal command' });
        var row = h('div', { class: 'tj-termrow' }, [h('span', { class: 'tj-termps', text: '$' }), inp]); box.appendChild(log); box.appendChild(row);
        function ps() { return 'learner@practice:' + st.cwd.replace('/home/learner', '~') + '$ '; }
        inp.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter') return; var line = inp.value.trim(); inp.value = ''; if (!line) return;
          var o = runCmd(st, line); hist.push(line); log.appendChild(document.createTextNode(ps() + line + '\n' + (o ? o + '\n' : ''))); log.scrollTop = log.scrollHeight;
        });
        api.state = function () { return st; }; api.reset = function () { fresh(); clear(log); };
      });
    };
  }
  LABS.linux = mkShell('linux'); LABS.git = mkShell('git');

  /* --- API response lab --- */
  var API_JSON = { status: 'ok', page: 1, total: 3, data: [{ id: 101, name: 'Wanjiku', county: 'Nairobi', paid: true, amount: 4500 }, { id: 102, name: 'Otieno', county: 'Kisumu', paid: false, amount: 3200 }, { id: 103, name: 'Achieng', county: 'Kisumu', paid: true, amount: 6100 }] };
  function jpath(obj, path) {
    var t = path.trim().replace(/^response\.?/, '').match(/[^.\[\]]+|\[\d+\]/g) || [], cur = obj;
    for (var i = 0; i < t.length; i++) { var k = t[i]; if (k.charAt(0) === '[') k = +k.slice(1, -1); if (cur === null || typeof cur !== 'object' || !(k in cur)) return { err: 'Nothing found at "' + t.slice(0, i + 1).join('.') + '". Check spelling, and remember lists start at [0].' }; cur = cur[k]; }
    return { v: cur };
  }
  var API_TASKS = [
    { q: 'What is the status? Type the path to it.', want: 'ok', tip: 'status' },
    { q: 'Get the name of the first person in the list.', want: 'Wanjiku', tip: 'data[0].name' },
    { q: 'Get the amount of the third person.', want: 6100, tip: 'data[2].amount' },
    { q: 'Get the county of the second person.', want: 'Kisumu', tip: 'data[1].county' }
  ];
  LABS.api = function (el) {
    var cur = null, inp, out, text = JSON.stringify(API_JSON, null, 2);
    taskLab(el, 'Read an API response', 'API', 'APIs return JSON. This is a pretend response. Type a path like data[0].name to pull one value out, then check.', API_TASKS, function (box, api) {
      inp = h('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off', 'aria-label': 'Path to the value', placeholder: 'e.g. data[0].name' }); out = h('div', { class: 'tj-out' });
      box.appendChild(h('pre', { class: 'tj-term', text: 'GET /api/payments?page=1\nHTTP 200 OK\n\n' + text })); box.appendChild(h('label', { text: 'Path' })); box.appendChild(inp); box.appendChild(out);
      function show() { var r = jpath(API_JSON, inp.value); out.className = 'tj-out' + (r.err ? ' tj-bad' : ''); out.textContent = r.err ? r.err : 'Value: ' + JSON.stringify(r.v); }
      inp.addEventListener('input', show); show();
      api.onTask = function (t) { cur = t; inp.value = ''; show(); };
      api.state = function () { return { path: inp.value }; }; api.reset = function () { inp.value = ''; show(); };
    });
    // task tests read the live input
    var tasks = API_TASKS; tasks.forEach(function (t) { t.test = function (s) { var r = jpath(API_JSON, s.path); if (r.err) return r.err; return r.v === t.want ? true : 'That path gives ' + JSON.stringify(r.v) + ', not what was asked.'; }; });
  };

  /* --- scraping lab --- */
  var SC_HTML = '<ul id="shop"><li class="item" data-id="1"><h3 class="name">Maize flour</h3><span class="price">KES 140</span></li><li class="item sale" data-id="2"><h3 class="name">Beans</h3><span class="price">KES 150</span></li><li class="item" data-id="3"><h3 class="name">Rice</h3><span class="price">KES 160</span></li></ul><p class="note">Prices updated daily</p>';
  var SC_TASKS = [
    { q: 'Select every product name.', want: ['Maize flour', 'Beans', 'Rice'], tip: '.name' },
    { q: 'Select all the prices.', want: ['KES 140', 'KES 150', 'KES 160'], tip: '.price' },
    { q: 'Select only the item that is on sale.', want: ['BeansKES 150'], tip: '.sale  or  li.sale' },
    { q: 'Select the name of the sale item only.', want: ['Beans'], tip: '.sale .name' }
  ];
  LABS.scrape = function (el) {
    var inp, out;
    function run(sel) {
      try { var doc = new DOMParser().parseFromString(SC_HTML, 'text/html'); if (!sel.trim()) return { v: [] }; return { v: Array.prototype.map.call(doc.querySelectorAll(sel), function (n) { return n.textContent.trim(); }) }; }
      catch (e) { return { err: 'That is not a valid selector. Selectors look like .class, #id, tag, or .parent .child.' }; }
    }
    taskLab(el, 'Pick data out of a web page', 'Scraping', 'Scraping means reading data from HTML. A CSS selector says which elements to take. Safe practice: nothing is fetched from the internet.', SC_TASKS, function (box, api) {
      inp = h('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off', 'aria-label': 'CSS selector', placeholder: 'e.g. .name' }); out = h('div', { class: 'tj-out' });
      box.appendChild(h('pre', { class: 'tj-term', text: SC_HTML.replace(/></g, '>\n<') })); box.appendChild(h('label', { text: 'CSS selector' })); box.appendChild(inp); box.appendChild(out);
      function show() { var r = run(inp.value); out.className = 'tj-out' + (r.err ? ' tj-bad' : ''); out.textContent = r.err ? r.err : r.v.length + ' match' + (r.v.length === 1 ? '' : 'es') + ': ' + JSON.stringify(r.v); }
      inp.addEventListener('input', show); show();
      api.onTask = function () { inp.value = ''; show(); }; api.state = function () { return { sel: inp.value }; }; api.reset = function () { inp.value = ''; show(); };
    });
    SC_TASKS.forEach(function (t) { t.test = function (s) { var r = run(s.sel); if (r.err) return r.err; return JSON.stringify(r.v) === JSON.stringify(t.want) ? true : 'Your selector matched ' + JSON.stringify(r.v) + '.'; }; });
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
