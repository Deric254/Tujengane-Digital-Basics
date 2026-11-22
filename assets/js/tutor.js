/* AI Tutor chat for the paid course pages. Talks only to /api/<course> (same sign-in as the lessons). */
(function () {
  'use strict';
  var course = /analyst/i.test(location.pathname) ? 'analyst' : 'literacy';
  var API = '/api/' + course;
  var prevQ = '', prevA = '', busy = false;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  var fab = el('button', 'tjt-fab', 'Ask AI Tutor'); fab.type = 'button'; fab.hidden = true; fab.setAttribute('aria-expanded', 'false');
  var panel = el('div', 'tjt-panel'); panel.hidden = true; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'AI Tutor');
  var head = el('div', 'tjt-head'); head.appendChild(el('span', '', 'AI Tutor'));
  var close = el('button', '', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Close AI Tutor'); head.appendChild(close);
  var log = el('div', 'tjt-log'); log.setAttribute('aria-live', 'polite');
  var chips = el('div', 'tjt-chips');
  var form = el('form', 'tjt-form'); var ta = el('textarea'); ta.rows = 2; ta.maxLength = 600; ta.placeholder = 'Ask about this lesson...'; ta.setAttribute('aria-label', 'Your question');
  var send = el('button', '', 'Send'); send.type = 'submit'; form.appendChild(ta); form.appendChild(send);
  panel.appendChild(head); panel.appendChild(log); panel.appendChild(chips); panel.appendChild(form);

  function render(box, text) {
    String(text).split('\n').forEach(function (line, i) {
      if (i) box.appendChild(document.createTextNode('\n'));
      line = line.replace(/^#+\s*/, '');
      line.split('**').forEach(function (part, j) {
        if (j % 2) { var b = document.createElement('strong'); b.textContent = part; box.appendChild(b); }
        else box.appendChild(document.createTextNode(part));
      });
    });
  }
  function add(cls, text, plain) {
    var m = el('div', 'tjt-msg ' + cls); if (plain) m.textContent = text; else render(m, text);
    log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
  }
  function where() {
    var m = -1, s = -1;
    try { if (typeof currentModule === 'number') { m = currentModule; s = currentSlide; } } catch (e) {}
    return { module: m, slide: s };
  }
  function ask(q) {
    q = (q || '').trim(); if (!q || busy) return;
    busy = true; send.disabled = true; add('tjt-user', q, true);
    var wait = add('tjt-ai tjt-note', 'Thinking...', true);
    var w = where();
    var body = { action: 'ask', question: q, module: w.module, slide: w.slide };
    if (prevQ && prevA) { body.prevQ = prevQ; body.prevA = prevA; }
    fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { s: r.status, d: d }; }); })
      .then(function (x) {
        wait.remove();
        if (x.s === 200 && x.d.answer) { add('tjt-ai', x.d.answer); prevQ = q; prevA = x.d.answer; }
        else if (x.s === 401) add('tjt-ai tjt-note', 'Your access has ended. Reload the page and sign in again.', true);
        else if (x.s === 429) add('tjt-ai tjt-note', x.d.error === 'daily_cap' ? 'The tutor is very busy today. Please try again tomorrow.' : 'You have asked a lot in the last hour. Take a short break and try again soon.', true);
        else if (x.s === 503 && x.d.error === 'tutor_unavailable') add('tjt-ai tjt-note', 'The AI Tutor is not switched on yet. Ask your trainer.', true);
        else add('tjt-ai tjt-note', 'The tutor could not answer just now. Please try again in a moment.', true);
      })
      .catch(function () { wait.remove(); add('tjt-ai tjt-note', 'No connection. Check your internet and try again.', true); })
      .then(function () { busy = false; send.disabled = false; });
  }
  [['Explain simply', 'Explain this lesson in simple words.'], ['Give an example', 'Give me one real example from a small business in Kenya.'], ['Quiz me', 'Ask me one question about this lesson and wait for my answer.'], ['I am stuck', 'I am stuck on this lesson. Help me step by step with a hint.']].forEach(function (c) {
    var b = el('button', '', c[0]); b.type = 'button'; b.addEventListener('click', function () { ask(c[1]); }); chips.appendChild(b);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); var q = ta.value; ta.value = ''; ask(q); });
  ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.dispatchEvent(new Event('submit', { cancelable: true })); } });
  fab.addEventListener('click', function () {
    panel.hidden = !panel.hidden; fab.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) { if (!log.children.length) add('tjt-ai tjt-note', 'Hi! Ask me anything about the lesson on your screen. I explain; I do not just give answers to checks.', true); ta.focus(); }
  });
  close.addEventListener('click', function () { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close.click(); });
  function boot() {
    document.body.appendChild(fab); document.body.appendChild(panel);
    setInterval(function () { var on = !!document.querySelector('.slide-content'); if (fab.hidden === on) fab.hidden = !on; if (!on) panel.hidden = true; }, 800);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
