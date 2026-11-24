/* One floating helper for the paid course pages: AI Tutor, My review list, Contact and menu.
   It replaces the old chat bubble and the mobile menu bubble (their features are inside this panel).
   It also adds a "Lock it in" closing step under every lesson. */
(function () {
  'use strict';
  var SRC = (document.currentScript && document.currentScript.src) || '';
  var course = /analyst/i.test(location.pathname) ? 'analyst' : /literacy/i.test(location.pathname) ? 'literacy' : null; /* null = any other page of the site */
  var STORE = 'tjl:' + (course || 'site');
  function pageText() { var m = document.querySelector('main') || document.body; var t = ((document.title || '') + '. ' + (m.innerText || '')).replace(/\s+/g, ' ').trim(); return t.slice(0, 1400); }
  var prevQ = '', prevA = '', busy = false;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function icon(c) { var i = el('i', c); i.setAttribute('aria-hidden', 'true'); return i; }
  function where() { var m = -1, s = -1; if (!course) return { module: m, slide: s }; try { if (typeof currentModule === 'number') { m = currentModule; s = currentSlide; } } catch (e) {} return { module: m, slide: s }; }
  function load() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} }

  var launcher = el('button', 'tjh-launcher'); launcher.type = 'button'; launcher.setAttribute('aria-expanded', 'false'); launcher.setAttribute('aria-label', 'Help: AI tutor, my review list, contact and menu');
  launcher.appendChild(icon('fas fa-robot')); launcher.appendChild(el('span', '', 'Help'));
  var panel = el('div', 'tjh-panel'); panel.hidden = true; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Tujengane help');
  var head = el('div', 'tjh-head'); head.appendChild(el('span', '', 'Tujengane Help'));
  var close = el('button', '', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Close help'); var dockBtn = el('button', 'tjh-dockbtn'); dockBtn.type = 'button'; head.insertBefore(dockBtn, null); head.appendChild(close);
  var tabs = el('div', 'tjh-tabs'); tabs.setAttribute('role', 'tablist');
  var canTry = !!(course || window.TJLabs || !document.querySelector('meta[http-equiv="Content-Security-Policy"]'));
  var tabNames = canTry ? [['ai', 'Ask'], ['try', 'Try it'], ['both', 'Both'], ['rev', 'Review'], ['more', 'More']] : [['ai', 'AI Tutor'], ['rev', 'My review'], ['more', 'Contact & menu']], tabBtn = {}, pane = {};
  tabNames.forEach(function (t) { var b = el('button', '', t[1]); b.type = 'button'; b.setAttribute('role', 'tab'); b.addEventListener('click', function () { show(t[0]); }); tabs.appendChild(b); tabBtn[t[0]] = b; pane[t[0]] = el('div', 'tjh-pane'); });
  if (!course) { var ri = tabNames.map(function (t) { return t[0]; }).indexOf('rev'); tabNames.splice(ri, 1); delete pane.rev; tabs.removeChild(tabBtn.rev); delete tabBtn.rev; }
  delete pane.both; Object.keys(pane).forEach(function (k) { pane[k].classList.add('tjh-p-' + k); });
  panel.appendChild(head); panel.appendChild(tabs); var ctxLine = el('div', 'tjh-ctx'); panel.appendChild(ctxLine); tabNames.forEach(function (t) { if (pane[t[0]]) panel.appendChild(pane[t[0]]); });

  /* ---- AI tab ---- */
  var log = el('div', 'tjh-log'); log.setAttribute('aria-live', 'polite');
  var chips = el('div', 'tjh-chips');
  var form = el('form', 'tjh-form'); var ta = el('textarea'); ta.rows = 2; ta.maxLength = 600; ta.placeholder = 'Ask about this lesson...'; ta.setAttribute('aria-label', 'Your question');
  var send = el('button', '', 'Send'); send.type = 'submit'; form.appendChild(ta); form.appendChild(send);
  pane.ai.appendChild(log); pane.ai.appendChild(chips); pane.ai.appendChild(form);
  function render(box, text) {
    String(text).split('\n').forEach(function (line, i) {
      if (i) box.appendChild(document.createTextNode('\n'));
      line = line.replace(/^#+\s*/, '');
      line.split('**').forEach(function (part, j) { if (j % 2) { var b = document.createElement('strong'); b.textContent = part; box.appendChild(b); } else box.appendChild(document.createTextNode(part)); });
    });
  }
  function add(cls, text, plain) { var m = el('div', 'tjh-msg ' + cls); if (plain) m.textContent = text; else render(m, text); log.appendChild(m); log.scrollTop = log.scrollHeight; return m; }
  function ask(q) {
    q = (q || '').trim(); if (!q || busy) return;
    busy = true; send.disabled = true; add('tjh-user', q, true);
    var wait = add('tjh-ai tjh-note', 'Thinking...', true), w = where();
    var body = { action: 'ask', question: q, module: w.module, slide: w.slide };
    body.page = pageText();
    if (prevQ && prevA) { body.prevQ = prevQ; body.prevA = prevA; }
    var tries = course ? [course] : ['literacy', 'analyst'];
    function tryOne(i) {
      return fetch('/api/' + tries[i], { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { s: r.status, d: d }; }); })
        .then(function (x) { return (x.s === 401 && i + 1 < tries.length) ? tryOne(i + 1) : x; });
    }
    /* When the AI cannot answer, never leave the learner with nothing: say what happened, answer from the text on screen, and give next steps. */
    function help(why) {
      add('tjh-ai tjh-note', why, true);
      var la = localAnswer(q);
      if (la) add('tjh-ai', la);
      add('tjh-ai tjh-note', la ? 'That came straight from the page you are on. ' + (canTry ? 'You can also test it in the Try it box. ' : '') + 'For a person, use More, then Email or WhatsApp.' : 'I could not find that on this page. Try different words, open the lesson that covers it, ' + (canTry ? 'test your idea in the Try it box, ' : '') + 'or use More to message your trainer.', true);
    }
    tryOne(0)
      .then(function (x) {
        wait.remove();
        if (x.s === 200 && x.d.answer) {
          add('tjh-ai', x.d.answer); prevQ = q; prevA = x.d.provider === 'lessons' ? '' : x.d.answer;
          if (x.d.reason === 'no_key') add('tjh-ai tjh-note', 'Note: the AI service is not switched on yet (the owner needs to add an AI key on the server). This answer came from the course text.', true);
          else if (x.d.reason === 'providers_failed') add('tjh-ai tjh-note', 'Note: the AI service did not respond just now, so this answer came from the course text. Try again in a moment.', true);
        }
        else if (x.s === 429) add('tjh-ai tjh-note', x.d.error === 'daily_cap' ? 'The tutor is very busy today, so it is resting until tomorrow. Everything else on the page still works, and you can email your trainer from More.' : 'You have asked a lot in the last hour, so the tutor needs a short break. Try again in a few minutes. Meanwhile, re-read the lesson and test it in the Try it box.', true);
        else if (x.s === 401) help('The tutor is switched off for visitors right now. Sign in to your course to use it.');
        else if (x.s === 503 || (x.d && (x.d.error === 'tutor_unavailable' || x.d.error === 'no_match'))) help('The AI tutor is not available right now (the service has not been switched on, or it is busy).');
        else help('The tutor could not answer just now.');
      })
      .catch(function () { wait.remove(); help('No connection to the tutor. Check your internet. Answers below come from this page, which works offline.'); })
      .then(function () { busy = false; send.disabled = false; });
  }
  var STOP = ' the and for with that this what how why when where does about from into your you are was were can could would should have has had not but its it\'s than then them they their there which who whom will shall may might must also just more most some any each one two use used using make made like give tell please explain mean means meaning lesson page ';
  function localAnswer(question) {
    var box = document.querySelector('.slide-content') || document.querySelector('main') || document.body;
    var text = (box.innerText || '').replace(/\s+/g, ' ');
    var words = {}; question.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(' ').forEach(function (w) { if (w.length > 2 && STOP.indexOf(' ' + w + ' ') < 0) words[w] = 1; });
    var keys = Object.keys(words); if (!keys.length) return '';
    var sents = (text.match(/[^.!?]+[.!?]?/g) || []).map(function (t) { return t.trim(); }).filter(function (t) { return t.length > 30 && t.length < 320; });
    var scored = sents.map(function (t, i) { var l = t.toLowerCase(), n = 0; keys.forEach(function (k) { if (l.indexOf(k) > -1) n++; }); return { t: t, i: i, n: n }; }).filter(function (x) { return x.n > 0; });
    if (!scored.length) return '';
    scored.sort(function (a, b) { return b.n - a.n || a.i - b.i; });
    var top = scored.slice(0, 3).sort(function (a, b) { return a.i - b.i; });
    return 'Here is what this page says about it:\n' + top.map(function (x) { return '• ' + x.t; }).join('\n');
  }
  [['Explain simply', 'Explain this lesson in simple words.'], ['Give an example', 'Give me one real example from a small business in Kenya.'], ['Quiz me', 'Ask me one question about this lesson and wait for my answer.'], ['I am stuck', 'I am stuck on this lesson. Help me step by step with a hint.']].forEach(function (c) {
    var b = el('button', '', c[0]); b.type = 'button'; b.addEventListener('click', function () { ask(c[1]); }); chips.appendChild(b);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); var q = ta.value; ta.value = ''; ask(q); });
  ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.dispatchEvent(new Event('submit', { cancelable: true })); } });

  /* ---- My review tab ---- */
  var rev = el('div', 'tjh-list'); if (pane.rev) pane.rev.appendChild(rev);
  function go(m, s) {
    var a = document.querySelector('.sidebar-link[data-module="' + m + '"][data-slide="' + s + '"]') || document.querySelector('.module-slides a[data-module="' + m + '"][data-slide="' + s + '"]');
    if (a) { a.click(); if (!docked) { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); paintDock(); } }
  }
  var DAY = 86400000;
  function progress() { try { return JSON.parse(localStorage.getItem(STORE + ':p') || '{}') || {}; } catch (e) { return {}; } }
  function saveProgress(o) { try { localStorage.setItem(STORE + ':p', JSON.stringify(o)); } catch (e) {} }
  function totalLessons() { return document.querySelectorAll('.module-slides a[data-module]').length; }
  function renderRev() {
    if (!course) return;
    var st = load(), keys = Object.keys(st), now = Date.now();
    var need = keys.filter(function (k) { var it = st[k]; return it.s !== 'got' || (it.d && now - it.d > 2 * DAY); });
    var got = keys.filter(function (k) { return st[k].s === 'got'; }).length;
    var pr = progress(), seen = Object.keys(pr.v || {}).length, total = totalLessons();
    while (rev.firstChild) rev.removeChild(rev.firstChild);
    if (total) {
      rev.appendChild(el('h3', '', 'Your progress'));
      var bar = el('div'); bar.style.cssText = 'height:10px;border-radius:6px;background:#e1e8e4;overflow:hidden'; var fill = el('div'); fill.style.cssText = 'height:100%;background:#49a078;width:' + Math.min(100, Math.round(100 * seen / total)) + '%'; bar.appendChild(fill); rev.appendChild(bar);
      rev.appendChild(el('p', 'tjh-note', seen + ' of ' + total + ' lessons opened, ' + got + ' locked in.'));
      if (pr.last) { var rb = el('button', 'tjh-item'); rb.type = 'button'; var rt = el('span'); rt.appendChild(document.createTextNode('Continue where you left off')); rt.appendChild(el('small', '', pr.last.t)); rb.appendChild(rt); rb.appendChild(icon('fas fa-chevron-right')); rb.addEventListener('click', function () { go(pr.last.m, pr.last.i); }); rev.appendChild(rb); }
    }
    rev.appendChild(el('h3', '', need.length ? 'Come back to these' : 'Nothing to review yet'));
    rev.appendChild(el('p', 'tjh-note', 'Under every lesson, tell yourself honestly: can I explain it? Partly and Not yet lessons wait here, and lessons you locked in come back after 2 days so they stay in your memory.'));
    need.forEach(function (k) {
      var it = st[k], b = el('button', 'tjh-item'); b.type = 'button';
      var t = el('span'); t.appendChild(document.createTextNode(it.t)); t.appendChild(el('small', '', it.s === 'part' ? 'Partly understood' : it.s === 'not' ? 'Not yet' : 'Refresh: can you still explain it?')); b.appendChild(t); b.appendChild(icon('fas fa-chevron-right'));
      b.addEventListener('click', function () { go(it.m, it.i); }); rev.appendChild(b);
    });
    tabBtn.rev.textContent = 'My review' + (need.length ? ' (' + need.length + ')' : '');
  }

  /* ---- Contact & menu tab ---- */
  var more = el('div', 'tjh-list'); pane.more.appendChild(more);
  function linkBtn(label, ic, href, ext) { var a = el('a', 'tjh-link'); a.href = href; if (ext) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } var s = el('span'); s.appendChild(icon(ic)); s.appendChild(document.createTextNode('  ' + label)); a.appendChild(s); return a; }
  function actBtn(label, ic, fn) { var b = el('button', 'tjh-link'); b.type = 'button'; var s = el('span'); s.appendChild(icon(ic)); s.appendChild(document.createTextNode('  ' + label)); b.appendChild(s); b.addEventListener('click', fn); return b; }
  more.appendChild(el('h3', '', 'Practise'));
  if (!/^\/playground/.test(location.pathname)) more.appendChild(linkBtn('Practice Playground (Python, SQL, Cyber Lab)', 'fas fa-flask', '/playground/', true));
  if (document.getElementById('mobile-nav-dropdown')) {
    more.appendChild(el('h3', '', 'Menu'));
    more.appendChild(actBtn('Open the navigation menu', 'fas fa-bars', function () { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); paintDock(); var d = document.getElementById('mobile-nav-dropdown'); if (d) d.classList.add('active'); }));
  }
  more.appendChild(el('h3', '', 'Contact your trainer'));
  more.appendChild(linkBtn('WhatsApp (fastest)', 'fab fa-whatsapp', 'https://wa.me/254791360805?text=' + encodeURIComponent(course === 'analyst' ? 'Hi DericBI, I need help with Analyst Pro' : course === 'literacy' ? 'Hi DericBI, I need help with Computer Literacy' : 'Hi DericBI, I need help with Tujengane'), true));
  more.appendChild(linkBtn('Email us', 'fas fa-envelope', 'mailto:dericmarangu@gmail.com?subject=' + encodeURIComponent(course === 'analyst' ? 'Analyst Pro help' : course === 'literacy' ? 'Computer Literacy help' : 'Tujengane help'), false));
  if (typeof openModal === 'function' && document.getElementById('projectModal')) more.appendChild(actBtn('Enroll or request training', 'fas fa-rocket', function () { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); paintDock(); try { openModal('projectModal'); } catch (e) {} }));
  more.appendChild(el('p', 'tjh-note', 'Usually we reply within 1 hour.'));

  /* ---- Try it tab: a small Python / SQL practice box that sits next to the lesson ---- */
  var tryKind = 'py', tryApi = {}, tryBox = {}, tryReady = false;
  function ensureLabs(cb) {
    if (window.TJLabs) return cb(true);
    var base = SRC ? SRC.replace(/js\/tutor\.js.*$/, '') : '/assets/';
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = base + 'css/labs.css'; document.head.appendChild(l);
    var sc = document.createElement('script'); sc.src = base + 'js/labs.js'; sc.onload = function () { cb(!!window.TJLabs); }; sc.onerror = function () { cb(false); }; document.head.appendChild(sc);
  }
  function lessonCode() { var c = document.querySelector('.slide-content pre code') || document.querySelector('main pre code'); return c ? c.textContent.replace(/\s+$/, '') + '\n' : ''; }
  function setKind(k) {
    tryKind = k;
    ['py', 'sql'].forEach(function (x) { if (tryBox[x]) tryBox[x].hidden = x !== k; if (kindBtn[x]) kindBtn[x].setAttribute('aria-pressed', String(x === k)); });
    if (!tryApi[k] && window.TJLabs) {
      tryApi[k] = k === 'py'
        ? window.TJLabs.mountPython(tryBox.py, { code: '# Try things here while you read the lesson\nprint("Hello, Tujengane")\n', saveKey: 'tjh:try:py', label: 'Python - edit, then press Run' })
        : window.TJLabs.mountSql(tryBox.sql, { code: 'SELECT * FROM customers;', saveKey: 'tjh:try:sql', label: 'SQL - edit, then press Run' });
    }
  }
  var kindBtn = {}, tryPane = pane.try;
  if (tryPane) {
    var kr = el('div', 'tjh-kind'); tryPane.appendChild(kr);
    var kinds = [['py', 'Python']]; if (course !== 'literacy') kinds.push(['sql', 'SQL']);
    kinds.forEach(function (k) { var b = el('button', '', k[1]); b.type = 'button'; b.setAttribute('aria-pressed', 'false'); b.addEventListener('click', function () { setKind(k[0]); }); kr.appendChild(b); kindBtn[k[0]] = b; });
    var tryActs = el('div', 'tjh-tryacts'); tryPane.appendChild(tryActs);
    var scroller = el('div', 'tjh-tryscroll'); tryPane.appendChild(scroller);
    tryBox.py = el('div', 'tj-lab'); tryBox.sql = el('div', 'tj-lab'); scroller.appendChild(tryBox.py); scroller.appendChild(tryBox.sql);
    var tmsg = el('p', 'tjh-note', 'Loading the practice box...'); scroller.insertBefore(tmsg, scroller.firstChild);
    function sendCode(lead) {
      var a = tryApi[tryKind]; if (!a) return;
      var code = (a.getCode() || '').slice(0, 700), outp = (a.getOutput ? a.getOutput() : '').slice(0, 450);
      showTab(tabBtn.both ? 'both' : 'ai');
      ask(lead + '\nMy ' + (tryKind === 'py' ? 'Python' : 'SQL') + ' code:\n' + code + '\nWhat it showed: ' + (outp || '(I have not run it yet)'));
    }
    [['Use this lesson’s code', function () { var c = lessonCode(), a = tryApi[tryKind]; if (!c) { tmsg.hidden = false; tmsg.textContent = 'This lesson has no code to copy. Type your own and press Run.'; return; } if (a && tryKind === 'py') { a.setCode(c); } }],
     ['Explain my result', function () { sendCode('Explain what my code did and why it gave this result. Keep it short.'); }],
     ['Check my attempt', function () { sendCode('Check my attempt for this lesson. Tell me what is right and what is wrong. Give a hint, not the full answer.'); }],
     ['Challenge me', function () { showTab(tabBtn.both ? 'both' : 'ai'); ask('Give me one small challenge from this lesson that I can try in the practice box. Do not give the solution. When I tap Check my attempt, review it.'); }]
    ].forEach(function (x) { var b = el('button', '', x[0]); b.type = 'button'; b.addEventListener('click', x[1]); tryActs.appendChild(b); });
    tryReady = false;
  }
  function initTry() {
    if (!tryPane || tryReady) return; tryReady = true;
    ensureLabs(function (okk) {
      var m = scroller.querySelector('.tjh-note');
      if (!okk) { if (m) m.textContent = 'The practice box could not load here. Use the Playground page instead.'; tryReady = false; return; }
      if (m) m.hidden = true;
      setKind(kindBtn[tryKind] ? tryKind : 'py');
    });
  }

  var cur = 'ai';
  function showTab(name) {
    cur = name;
    var vis = name === 'both' ? { ai: 1, try: 1 } : (function (o) { o[name] = 1; return o; })({});
    tabNames.forEach(function (t) { var on = !!vis[t[0]] || t[0] === name; if (pane[t[0]]) pane[t[0]].hidden = !vis[t[0]]; tabBtn[t[0]].setAttribute('aria-selected', String(t[0] === name)); });
    panel.classList.toggle('tjh-both', name === 'both');
    if (name === 'rev') renderRev();
    if (vis.try) initTry();
    if (vis.ai && name !== 'both') ta.focus();
  }
  var show = showTab;

  /* ---- docking: panel sits beside (wide screens) or below (small screens) the lesson ---- */
  function pref(k) { try { return localStorage.getItem('tjh:' + k); } catch (e) { return null; } }
  function setPref(k, v) { try { localStorage.setItem('tjh:' + k, v); } catch (e) {} }
  var docked = pref('dock') !== '0';
  /* resizable: drag the grip (left edge on wide screens, top edge on small ones); keys and double-click work too */
  var grip = el('div', 'tjh-grip'); grip.setAttribute('role', 'separator'); grip.tabIndex = 0; grip.setAttribute('aria-label', 'Resize help panel. Drag, or use arrow keys. Double-click to reset.');
  panel.insertBefore(grip, panel.firstChild);
  var root = document.documentElement;
  function wide() { return window.innerWidth >= 1000; }
  function clampW(w) { return Math.max(320, Math.min(w, Math.round(window.innerWidth * 0.6), 760)); }
  function clampH(h) { return Math.max(Math.round(window.innerHeight * 0.3), Math.min(h, Math.round(window.innerHeight * 0.8))); }
  var sizeW = parseInt(pref('w'), 10) || 440, sizeH = parseInt(pref('h'), 10) || Math.round(window.innerHeight * 0.58);
  function applySize() { sizeW = clampW(sizeW); sizeH = clampH(sizeH); root.style.setProperty('--tjh-w', sizeW + 'px'); root.style.setProperty('--tjh-h', sizeH + 'px'); fitBars(); }
  /* full-width fixed bars (page headers and footers) shrink so nothing hides under the docked panel */
  var squeezed = [];
  function fitBars() {
    squeezed.forEach(function (x) { x.e.style.width = x.w; x.e.style.overflow = x.o; x.e.style.flexWrap = x.f; }); squeezed = [];
    if (!(docked && !panel.hidden && wide())) return;
    var seen = document.querySelectorAll('body > *');
    for (var i = 0; i < seen.length; i++) {
      var e = seen[i]; if (e === panel || e === launcher || panel.contains(e)) continue;
      var cs = getComputedStyle(e); if (cs.position !== 'fixed') continue;
      var r = e.getBoundingClientRect();
      if (r.left <= 1 && r.right >= window.innerWidth - 2 && r.width > 0) { squeezed.push({ e: e, w: e.style.width, o: e.style.overflow, f: e.style.flexWrap }); e.style.width = 'calc(100% - ' + sizeW + 'px)'; e.style.overflow = 'hidden'; e.style.flexWrap = 'nowrap'; }
    }
  }
  function drag(ev) {
    ev.preventDefault(); var move, up; document.body.classList.add('tjh-resizing');
    move = function (m) { if (wide()) sizeW = window.innerWidth - m.clientX; else sizeH = window.innerHeight - m.clientY; applySize(); };
    up = function () { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.body.classList.remove('tjh-resizing'); setPref('w', sizeW); setPref('h', sizeH); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  }
  grip.addEventListener('pointerdown', drag);
  grip.addEventListener('dblclick', function () { sizeW = 440; sizeH = Math.round(window.innerHeight * 0.58); applySize(); setPref('w', sizeW); setPref('h', sizeH); });
  grip.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? 30 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? -30 : 0; if (!d) return; e.preventDefault();
    if (wide()) sizeW += d; else sizeH += d; applySize(); setPref('w', sizeW); setPref('h', sizeH);
  });
  window.addEventListener('resize', function () { applySize(); });
  function paintDock() {
    var isOpen = !panel.hidden;
    panel.classList.toggle('tjh-dock', docked);
    document.body.classList.toggle('tjh-docked-open', docked && isOpen);
    launcher.hidden = docked && isOpen;
    applySize();
    dockBtn.textContent = docked ? '↗ Float' : '◧ Dock';
    dockBtn.setAttribute('aria-label', docked ? 'Float the help window over the page' : 'Dock the help window beside the lesson');
  }
  dockBtn.addEventListener('click', function () { docked = !docked; setPref('dock', docked ? '1' : '0'); paintDock(); });
  function lessonTitle() { var h = document.querySelector('.slide-content h2, main h1, h1'); return h ? h.textContent.trim().slice(0, 70) : ''; }
  function paintCtx() { var t = lessonTitle(); ctxLine.textContent = t ? 'Looking at: ' + t : ''; ctxLine.hidden = !t; }
  function open() {
    panel.hidden = false; launcher.setAttribute('aria-expanded', 'true');
    if (!log.children.length) add('tjh-ai tjh-note', course ? 'Hi! Ask me anything about the lesson on your screen. I explain and give hints; I do not just hand over answers to checks.' : 'Hi! Ask me about this page or any Tujengane topic. I can also see what is on this page.', true);
    paintDock(); paintCtx();
    showTab(canTry && docked && window.innerWidth >= 1000 && cur === 'ai' && !pref('tab') ? 'both' : (pref('tab') && tabBtn[pref('tab')] ? pref('tab') : cur));
  }
  function shut() { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); paintDock(); launcher.focus(); }
  tabs.addEventListener('click', function () { setPref('tab', cur); });
  launcher.addEventListener('click', function () { if (panel.hidden) open(); else shut(); });
  close.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) shut(); });

  /* ---- "Lock it in" closing step under every lesson ---- */
  function enhanceCheck(c) {
    var d = c.querySelector('details.layer-check .layer-body');
    if (!d || d.getAttribute('data-tjh')) return;
    var ans = null; d.querySelectorAll('p').forEach(function (p) { if (!ans && /^\s*Answer:/.test(p.textContent)) ans = p; });
    if (!ans) return;
    d.setAttribute('data-tjh', '1'); ans.hidden = true;
    var box = el('div'); box.appendChild(el('p', 'tjh-note', 'Write your answer first, in your own words. Trying to recall it is what builds memory. Then check it.'));
    var t = el('textarea'); t.rows = 3; t.setAttribute('aria-label', 'Your answer'); t.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #c4d3ca;border-radius:10px;padding:8px;font:inherit';
    var b = el('button', '', 'Check my answer'); b.type = 'button'; b.style.cssText = 'margin-top:8px;min-height:44px;padding:8px 16px;border-radius:10px;border:0;background:#256d4f;color:#fff;font-weight:700;cursor:pointer';
    var tip = el('p', 'tjh-note'); tip.hidden = true; tip.textContent = 'Compare with yours: what did you miss or get differently? Fix it in your own words.';
    b.addEventListener('click', function () { if (t.value.trim().split(/\s+/).filter(Boolean).length < 3 && !b.getAttribute('data-sure')) { b.setAttribute('data-sure', '1'); b.textContent = 'Show it anyway'; tip.hidden = false; tip.textContent = 'Try writing at least a short answer first. If you are really stuck, press again.'; return; } ans.hidden = false; tip.hidden = false; tip.textContent = 'Compare with yours: what did you miss or get differently? Fix it in your own words.'; b.hidden = true; });
    box.appendChild(t); box.appendChild(b); box.appendChild(tip); d.insertBefore(box, d.firstChild);
  }
  function addLock() {
    var c = document.querySelector('.slide-content');
    if (!c || c.querySelector('.tjh-lock')) return;
    var w = where(), titleEl = c.querySelector('h2'); if (w.module < 0 || !titleEl) return;
    var pr = progress(); pr.v = pr.v || {}; pr.v[w.module + ':' + w.slide] = 1; pr.last = { m: w.module, i: w.slide, t: titleEl.textContent.trim() }; saveProgress(pr);
    enhanceCheck(c);
    var key = w.module + ':' + w.slide, st = load(), cur = st[key] && st[key].s;
    var box = el('div', 'tjh-lock'); box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Lock it in');
    var t = el('p'); t.appendChild(el('strong', '', 'Lock it in. ')); t.appendChild(document.createTextNode('Before you move on, close your eyes and say the main idea out loud in your own words, then give one example from your own life or work. How did it go?'));
    box.appendChild(t);
    var row = el('div', 'tjh-row'), said = el('div', 'tjh-said'); said.setAttribute('aria-live', 'polite');
    var MSG = { got: 'Locked in. Tomorrow, try to recall it without looking: that is what makes it stay.', part: 'Good honesty. It is on your My review list. Re-read the Practice layer, then ask the AI Tutor to quiz you.', not: 'That is fine. It is on your My review list. Read the lesson again slowly, do the activity, then ask the AI Tutor for a simpler explanation.' };
    var btns = {};
    [['got', 'I can explain it'], ['part', 'Partly'], ['not', 'Not yet']].forEach(function (o) {
      var b = el('button', '', o[1]); b.type = 'button'; b.setAttribute('aria-pressed', String(cur === o[0])); btns[o[0]] = b;
      b.addEventListener('click', function () {
        var s2 = load(); s2[key] = { s: o[0], t: titleEl.textContent.trim(), m: w.module, i: w.slide, d: Date.now() }; save(s2);
        Object.keys(btns).forEach(function (k) { btns[k].setAttribute('aria-pressed', String(k === o[0])); }); said.textContent = MSG[o[0]]; renderRev();
      });
      row.appendChild(b);
    });
    if (cur) said.textContent = MSG[cur];
    box.appendChild(row); box.appendChild(said); c.appendChild(box);
  }

  function boot() {
    if (document.querySelector('.tjh-launcher')) return;
    document.body.classList.add('tjh');
    document.body.appendChild(launcher); document.body.appendChild(panel);
    renderRev();
    if (!course) return;
    var sc = document.getElementById('slide-container') || document.getElementById('slideContainer');
    if (sc) { try { new MutationObserver(function () { addLock(); paintCtx(); }).observe(sc, { childList: true }); } catch (e) {} }
    addLock();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
