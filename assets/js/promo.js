/* Offer banner. An ongoing offer: each 30-day round counts down and, when it runs out, the next round starts by itself.
   Same rules as dericbi.vercel.app. To close the offer, set percent to 0: every [data-promo] element then hides. */
(function () {
  var OFFER = { percent: 50, days: 30, since: '2026-11-01T00:00:00+03:00' }; // since = start of the first round
  var ROUND = OFFER.days * 864e5, first = Date.parse(OFFER.since);
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function each(sel, fn) { var l = document.querySelectorAll(sel); for (var i = 0; i < l.length; i++) fn(l[i]); }
  function tick() {
    var on = OFFER.percent > 0 && !isNaN(first);
    if (!on) { each('[data-promo]', function (el) { el.style.setProperty('display', 'none', 'important'); }); return false; }   // a visitor's own Dismiss is never undone
    var left = ROUND - ((Date.now() - first) % ROUND + ROUND) % ROUND;
    var d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4), s = Math.floor(left % 6e4 / 1e3);
    each('[data-promo-percent]', function (el) { el.textContent = OFFER.percent; });
    each('[data-promo-countdown]', function (el) { el.textContent = d + 'd ' + pad(h) + 'h ' + pad(m) + 'm ' + pad(s) + 's'; });
    return true;
  }
  function start() { if (tick()) setInterval(tick, 1000); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
