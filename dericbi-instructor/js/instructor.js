/* DericBI Instructor product page: guided checklist, live download status, small UX helpers.
   No dependencies. Works without JavaScript too (the download button is a plain link). */
(function () {
  'use strict'

  var RELEASES_API = 'https://api.github.com/repos/Deric254/dericbi-instructor/releases/latest'
  var INSTALLER_NAME = 'DericBI-Instructor-Setup.exe'
  var STORAGE_KEY = 'dbi-instructor-steps-v2' // v2: the steps changed (activation-code flow), so old ticks are ignored
  var TOTAL_STEPS = 5

  var root = document.documentElement
  root.classList.remove('no-js')

  function $(sel, ctx) { return (ctx || document).querySelector(sel) }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)) }

  /* ---------- footer year ---------- */
  var year = $('#year')
  if (year) year.textContent = String(new Date().getFullYear())

  /* ---------- mobile menu ---------- */
  var nav = $('#top-nav')
  var menuBtn = $('#menu-btn')
  function setMenu(open) {
    if (!nav || !menuBtn) return
    nav.classList.toggle('is-open', open)
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')) })
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false) })
    $all('#nav-links a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false) }) })
  }

  /* ---------- guided checklist (remembered on this device) ---------- */
  function loadDone() {
    try {
      var v = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      return Array.isArray(v) ? v.filter(function (n) { return n >= 1 && n <= TOTAL_STEPS }) : []
    } catch (e) { return [] }
  }
  function saveDone(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch (e) { /* private mode: ignore */ }
  }
  var done = loadDone()
  var progress = $('#steps-progress')
  var progressText = $('#steps-progress-text')

  function render() {
    $all('.ix-step').forEach(function (li) {
      var n = Number(li.getAttribute('data-step'))
      var isDone = done.indexOf(n) !== -1
      li.classList.toggle('is-done', isDone)
      var btn = $('.ix-done', li)
      if (btn) {
        btn.setAttribute('aria-pressed', isDone ? 'true' : 'false')
        btn.textContent = isDone ? 'Done \u2713' : 'Mark as done'
      }
    })
    if (progress) { progress.value = done.length; progress.textContent = done.length + ' of ' + TOTAL_STEPS }
    if (progressText) progressText.textContent = done.length === TOTAL_STEPS ? 'All done. Enjoy learning!' : done.length + ' of ' + TOTAL_STEPS + ' done'
  }
  $all('.ix-done').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var n = Number(btn.getAttribute('data-done'))
      var i = done.indexOf(n)
      if (i === -1) done.push(n); else done.splice(i, 1)
      saveDone(done)
      render()
      // gently bring the next unfinished step into view
      if (i === -1 && n < TOTAL_STEPS) {
        var next = $('.ix-step[data-step="' + (n + 1) + '"]')
        if (next && next.scrollIntoView) next.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
      }
    })
  })
  render()

  /* ---------- platform notice ---------- */
  var ua = navigator.userAgent || ''
  var isWindows = /Windows/i.test(ua)
  var note = $('#platform-note')
  if (note && !isWindows) {
    var text = $('#platform-text')
    if (text) text.textContent = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? "You're on a phone or tablet right now." : "You're on a Mac or Linux computer right now."
    note.classList.add('is-visible')
  }
  var copyBtn = $('#copy-link')
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var url = location.href.split('#')[0]
      var ok = function () { copyBtn.textContent = 'Link copied \u2713' }
      var fallback = function () {
        var t = document.createElement('textarea')
        t.value = url; t.setAttribute('readonly', ''); t.className = 'ix-sprite'
        document.body.appendChild(t); t.select()
        try { document.execCommand('copy'); ok() } catch (e) { copyBtn.textContent = url }
        document.body.removeChild(t)
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, fallback)
      else fallback()
    })
  }

  /* ---------- live download status from GitHub releases ---------- */
  var dl = $('#download')
  var btn = $('#download-btn')
  var label = $('#download-label')
  function setState(state) { if (dl) dl.setAttribute('data-state', state) }

  function showPending() {
    setState('pending')
    if (btn) {
      btn.removeAttribute('href')
      btn.setAttribute('aria-disabled', 'true')
    }
    if (label) label.textContent = 'Installer coming soon'
  }
  function showReady(release, asset) {
    if (btn && asset.browser_download_url) btn.setAttribute('href', asset.browser_download_url)
    var v = $('#dl-version'), s = $('#dl-size'), d = $('#dl-date')
    if (v) v.textContent = 'Version ' + String(release.tag_name || '').replace(/^v/i, '')
    if (s && asset.size) s.textContent = '\u00b7 ' + Math.max(1, Math.round(asset.size / 1048576)) + ' MB'
    if (d && release.published_at) {
      var dt = new Date(release.published_at)
      if (!isNaN(dt)) d.textContent = '\u00b7 released ' + dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    setState('ready')
  }

  if (dl && window.fetch) {
    var ctrl = window.AbortController ? new AbortController() : null
    var timer = setTimeout(function () { if (ctrl) ctrl.abort() }, 8000)
    fetch(RELEASES_API, { headers: { Accept: 'application/vnd.github+json' }, signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) {
        if (r.status === 404) return { none: true }          // repository has no published release yet
        if (!r.ok) throw new Error('status ' + r.status)       // rate limit etc.: keep the direct link working
        return r.json()
      })
      .then(function (release) {
        if (release.none) return showPending()
        var asset = (release.assets || []).filter(function (a) { return a.name === INSTALLER_NAME })[0]
        if (!asset) return showPending()
        showReady(release, asset)
      })
      .catch(function () { setState('unknown') })
      .then(function () { clearTimeout(timer) })
  } else {
    setState('unknown')
  }

  /* ---------- scroll reveal ---------- */
  var items = $all('.ix-reveal')
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target) } })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
    items.forEach(function (el) { io.observe(el) })
  } else {
    items.forEach(function (el) { el.classList.add('is-in') })
  }
})()
