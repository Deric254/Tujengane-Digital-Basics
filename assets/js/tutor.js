/* One floating helper for the paid course pages: AI Tutor, My review list, Contact and menu.
   It replaces the old chat bubble and the mobile menu bubble (their features are inside this panel).
   It also adds a "Lock it in" closing step under every lesson. */
(function () {
  'use strict';
  var course = /analyst/i.test(location.pathname) ? 'analyst' : 'literacy';
  var API = '/api/' + course, STORE = 'tjl:' + course;
  var prevQ = '', prevA = '', busy = false;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function icon(c) { var i = el('i', c); i.setAttribute('aria-hidden', 'true'); return i; }
  function where() { var m = -1, s = -1; try { if (typeof currentModule === 'number') { m = currentModule; s = currentSlide; } } catch (e) {} return { module: m, slide: s }; }
  function load() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} }

  var launcher = el('button', 'tjh-launcher'); launcher.type = 'button'; launcher.setAttribute('aria-expanded', 'false'); launcher.setAttribute('aria-label', 'Help: AI tutor, my review list, contact and menu');
  launcher.appendChild(icon('fas fa-robot')); launcher.appendChild(el('span', '', 'Help'));
  var panel = el('div', 'tjh-panel'); panel.hidden = true; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Tujengane help');
  var head = el('div', 'tjh-head'); head.appendChild(el('span', '', 'Tujengane Help'));
  var close = el('button', '', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Close help'); head.appendChild(close);
  var tabs = el('div', 'tjh-tabs'); tabs.setAttribute('role', 'tablist');
  var tabNames = [['ai', 'AI Tutor'], ['rev', 'My review'], ['more', 'Contact & menu']], tabBtn = {}, pane = {};
  tabNames.forEach(function (t) { var b = el('button', '', t[1]); b.type = 'button'; b.setAttribute('role', 'tab'); b.addEventListener('click', function () { show(t[0]); }); tabs.appendChild(b); tabBtn[t[0]] = b; pane[t[0]] = el('div', 'tjh-pane'); });
  panel.appendChild(head); panel.appendChild(tabs); tabNames.forEach(function (t) { panel.appendChild(pane[t[0]]); });

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
    if (prevQ && prevA) { body.prevQ = prevQ; body.prevA = prevA; }
    fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { s: r.status, d: d }; }); })
      .then(function (x) {
        wait.remove();
        if (x.s === 200 && x.d.answer) { add('tjh-ai', x.d.answer); prevQ = q; prevA = x.d.provider === 'lessons' ? '' : x.d.answer; }
        else if (x.s === 401) add('tjh-ai tjh-note', 'Sign in with your course password first (or reload the page if your access has ended).', true);
        else if (x.s === 429) add('tjh-ai tjh-note', x.d.error === 'daily_cap' ? 'The tutor is very busy today. Please try again tomorrow.' : 'You have asked a lot in the last hour. Take a short break and try again soon.', true);
        else add('tjh-ai tjh-note', 'The tutor could not answer just now. Please try again in a moment, or use Contact & menu to reach your trainer.', true);
      })
      .catch(function () { wait.remove(); add('tjh-ai tjh-note', 'No connection. Check your internet and try again.', true); })
      .then(function () { busy = false; send.disabled = false; });
  }
  [['Explain simply', 'Explain this lesson in simple words.'], ['Give an example', 'Give me one real example from a small business in Kenya.'], ['Quiz me', 'Ask me one question about this lesson and wait for my answer.'], ['I am stuck', 'I am stuck on this lesson. Help me step by step with a hint.']].forEach(function (c) {
    var b = el('button', '', c[0]); b.type = 'button'; b.addEventListener('click', function () { ask(c[1]); }); chips.appendChild(b);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); var q = ta.value; ta.value = ''; ask(q); });
  ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.dispatchEvent(new Event('submit', { cancelable: true })); } });

  /* ---- My review tab ---- */
  var rev = el('div', 'tjh-list'); pane.rev.appendChild(rev);
  function go(m, s) {
    var a = document.querySelector('.sidebar-link[data-module="' + m + '"][data-slide="' + s + '"]') || document.querySelector('.module-slides a[data-module="' + m + '"][data-slide="' + s + '"]');
    if (a) { a.click(); panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); }
  }
  var DAY = 86400000;
  function progress() { try { return JSON.parse(localStorage.getItem(STORE + ':p') || '{}') || {}; } catch (e) { return {}; } }
  function saveProgress(o) { try { localStorage.setItem(STORE + ':p', JSON.stringify(o)); } catch (e) {} }
  function totalLessons() { return document.querySelectorAll('.module-slides a[data-module]').length; }
  function renderRev() {
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
  more.appendChild(linkBtn('Practice Playground (Python, SQL, Cyber Lab)', 'fas fa-flask', '/playground/', true));
  if (document.getElementById('mobile-nav-dropdown')) {
    more.appendChild(el('h3', '', 'Menu'));
    more.appendChild(actBtn('Open the navigation menu', 'fas fa-bars', function () { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); var d = document.getElementById('mobile-nav-dropdown'); if (d) d.classList.add('active'); }));
  }
  more.appendChild(el('h3', '', 'Contact your trainer'));
  more.appendChild(linkBtn('WhatsApp (fastest)', 'fab fa-whatsapp', 'https://wa.me/254791360805?text=' + encodeURIComponent(course === 'analyst' ? 'Hi DericBI, I need help with Analyst Pro' : 'Hi DericBI, I need help with Computer Literacy'), true));
  more.appendChild(linkBtn('Email us', 'fas fa-envelope', 'mailto:dericmarangu@gmail.com?subject=' + encodeURIComponent(course === 'analyst' ? 'Analyst Pro help' : 'Computer Literacy help'), false));
  if (typeof openModal === 'function' && document.getElementById('projectModal')) more.appendChild(actBtn('Enroll or request training', 'fas fa-rocket', function () { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); try { openModal('projectModal'); } catch (e) {} }));
  more.appendChild(el('p', 'tjh-note', 'Usually we reply within 1 hour.'));

  function show(name) {
    tabNames.forEach(function (t) { var on = t[0] === name; tabBtn[t[0]].setAttribute('aria-selected', String(on)); pane[t[0]].hidden = !on; });
    if (name === 'rev') renderRev();
    if (name === 'ai') ta.focus();
  }
  function open() {
    panel.hidden = false; launcher.setAttribute('aria-expanded', 'true');
    if (!log.children.length) add('tjh-ai tjh-note', 'Hi! Ask me anything about the lesson on your screen. I explain and give hints; I do not just hand over answers to checks.', true);
    show('ai');
  }
  function shut() { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); }
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
    document.body.classList.add('tjh');
    document.body.appendChild(launcher); document.body.appendChild(panel);
    renderRev();
    var sc = document.getElementById('slide-container') || document.getElementById('slideContainer');
    if (sc) { try { new MutationObserver(function () { addLock(); }).observe(sc, { childList: true }); } catch (e) {} }
    addLock();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
