/* PayPal "Pay now" modal. Shared by the home page and the DericBI Instructor page.
   Any element with a data-pay attribute opens it:
     data-pay-item="Full Package"   what is being bought
     data-pay-amount="50"           price (per unit)
     data-pay-currency="USD"        defaults to USD
     data-pay-kes="6500"            optional KES equivalent (per unit)
     data-pay-qty="13"              optional: shows a quantity stepper, 1 up to this number
     data-pay-extra="Activation code"  optional: asks for one extra detail and puts it in the email
   Script only, no inline code, so it works under the Instructor page's strict CSP. */
(function () {
  'use strict';

  var PAYPAL_EMAIL = 'dericmarangu@gmail.com';
  var PAYPAL_URL = 'https://www.paypal.com/';

  var overlay, modal, refs, lastFocus, file = null, current = null, qty = 1;

  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function fmt(n) { return Number(n).toLocaleString('en-US'); }

  function build() {
    overlay = make('div', 'pp-overlay');
    overlay.hidden = true;
    modal = make('div', 'pp-modal');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'pp-title');
    refs = {};

    refs.close = make('button', 'pp-close', '\u00d7');
    refs.close.type = 'button';
    refs.close.setAttribute('aria-label', 'Close');

    var head = make('div', 'pp-head');
    var badge = make('span', 'pp-badge', 'Pay');
    var pal = make('span', null, 'Pal');
    badge.appendChild(pal);
    var title = make('h2', 'pp-title', 'Pay with PayPal');
    title.id = 'pp-title';
    head.appendChild(badge);
    head.appendChild(title);

    var summary = make('div', 'pp-summary');
    var row = make('div', 'pp-row');
    refs.item = make('span', 'pp-item');
    refs.qtyBox = make('div', 'pp-qty');
    refs.minus = make('button', null, '\u2212');
    refs.minus.type = 'button';
    refs.minus.setAttribute('aria-label', 'Fewer modules');
    refs.qtyOut = make('output', null, '1');
    refs.plus = make('button', null, '+');
    refs.plus.type = 'button';
    refs.plus.setAttribute('aria-label', 'More modules');
    refs.qtyBox.appendChild(make('span', null, 'Modules'));
    refs.qtyBox.appendChild(refs.minus);
    refs.qtyBox.appendChild(refs.qtyOut);
    refs.qtyBox.appendChild(refs.plus);
    row.appendChild(refs.item);
    row.appendChild(refs.qtyBox);
    refs.total = make('div', 'pp-total');
    refs.totalStrong = make('strong');
    refs.totalSmall = make('small');
    refs.total.appendChild(make('span', null, 'Total to pay: '));
    refs.total.appendChild(refs.totalStrong);
    refs.total.appendChild(refs.totalSmall);
    summary.appendChild(row);
    summary.appendChild(refs.total);

    var steps = make('ol', 'pp-steps');

    // Step 1: pay
    var s1 = make('li', 'pp-step');
    s1.appendChild(make('h3', null, 'Send the payment'));
    refs.payText = make('p');
    s1.appendChild(refs.payText);
    var emailRow = make('div', 'pp-email-row');
    var emailBox = make('div', 'pp-email', PAYPAL_EMAIL);
    refs.copy = make('button', 'pp-copy', 'Copy');
    refs.copy.type = 'button';
    emailRow.appendChild(emailBox);
    emailRow.appendChild(refs.copy);
    s1.appendChild(emailRow);
    var open = make('a', 'pp-btn pp-btn-paypal', 'Open PayPal');
    open.href = PAYPAL_URL;
    open.target = '_blank';
    open.rel = 'noopener noreferrer';
    s1.appendChild(open);
    s1.appendChild(make('p', 'pp-small', 'Put your name in the PayPal note so we can find your payment.'));

    // Step 2: proof
    var s2 = make('li', 'pp-step');
    s2.appendChild(make('h3', null, 'Send us your proof'));
    s2.appendChild(make('p', 'pp-small', 'After paying, take a screenshot of the PayPal confirmation. It should show the amount, the date and the transaction ID.'));

    refs.name = field(s2, 'Your name', null, 'Full name', 'name');
    refs.nameErr = make('p', 'pp-error');
    refs.nameErr.id = 'pp-name-err';
    s2.appendChild(refs.nameErr);
    refs.txn = field(s2, 'PayPal transaction ID', 'optional', 'e.g. 5TY05013RG002845M', 'off');
    refs.extraWrap = make('div');
    s2.appendChild(refs.extraWrap);

    var fileBox = make('div', 'pp-file');
    refs.fileBox = fileBox;
    refs.attach = make('button', 'pp-attach', 'Attach screenshot');
    refs.attach.type = 'button';
    refs.fileName = make('span', 'pp-file-name', 'No screenshot chosen yet');
    refs.clear = make('button', 'pp-file-clear', 'Remove');
    refs.clear.type = 'button';
    refs.clear.hidden = true;
    refs.fileInput = document.createElement('input');
    refs.fileInput.type = 'file';
    refs.fileInput.accept = 'image/*,application/pdf';
    refs.fileInput.tabIndex = -1;
    refs.fileInput.setAttribute('aria-label', 'Choose your payment screenshot');
    fileBox.appendChild(refs.attach);
    fileBox.appendChild(refs.fileName);
    fileBox.appendChild(refs.clear);
    fileBox.appendChild(refs.fileInput);
    s2.appendChild(fileBox);

    refs.send = make('button', 'pp-btn pp-btn-send', 'Send proof by email');
    refs.send.type = 'button';
    s2.appendChild(refs.send);
    refs.share = make('button', 'pp-btn pp-btn-share', 'Send with screenshot attached');
    refs.share.type = 'button';
    refs.share.hidden = true;
    s2.appendChild(refs.share);
    refs.gmail = make('a', 'pp-link', 'Open in Gmail instead');
    refs.gmail.target = '_blank';
    refs.gmail.rel = 'noopener noreferrer';
    refs.gmail.href = '#';
    s2.appendChild(refs.gmail);
    refs.hint = make('p', 'pp-hint');
    refs.hint.setAttribute('role', 'status');
    refs.hint.setAttribute('aria-live', 'polite');
    s2.appendChild(refs.hint);

    steps.appendChild(s1);
    steps.appendChild(s2);

    var foot = make('p', 'pp-foot', 'We confirm your payment and then reply to you. Keep your PayPal receipt until you hear from us.');

    modal.appendChild(refs.close);
    modal.appendChild(head);
    modal.appendChild(summary);
    modal.appendChild(steps);
    modal.appendChild(foot);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    wire();
  }

  function field(parent, label, note, placeholder, autocomplete) {
    var wrap = make('label', 'pp-field');
    var cap = make('span', null, label + ' ');
    if (note) cap.appendChild(make('em', null, '(' + note + ')'));
    var input = make('input', 'pp-input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.autocomplete = autocomplete;
    wrap.appendChild(cap);
    wrap.appendChild(input);
    parent.appendChild(wrap);
    return input;
  }

  function total() { return current.amount * qty; }

  function itemText() {
    return current.item + (current.hasQty ? ' (' + qty + (qty === 1 ? ' module)' : ' modules)') : '');
  }

  function amountText() { return fmt(total()) + ' ' + current.currency; }

  function refresh() {
    refs.item.textContent = current.item;
    refs.qtyOut.textContent = String(qty);
    refs.qtyBox.hidden = !current.hasQty;
    refs.minus.disabled = qty <= 1;
    refs.plus.disabled = qty >= current.maxQty;
    refs.totalStrong.textContent = amountText();
    refs.totalSmall.textContent = current.kes ? '(about ' + fmt(current.kes * qty) + ' KES)' : '';
    refs.payText.textContent = 'Send ' + amountText() + ' on PayPal to this email address:';
  }

  function message() {
    var lines = [
      'Hello Deric,',
      '',
      'I have paid by PayPal. Here are my details:',
      '',
      'Item: ' + itemText(),
      'Amount paid: ' + amountText(),
      'Name: ' + (refs.name.value.trim() || ''),
      'PayPal transaction ID: ' + (refs.txn.value.trim() || '(see screenshot)')
    ];
    if (current.extra && refs.extraInput) {
      lines.push(current.extra + ': ' + (refs.extraInput.value.trim() || ''));
    }
    lines.push('', 'My payment screenshot is attached.', '', 'Thank you.');
    return lines.join('\r\n');
  }

  function subject() { return 'Payment proof: ' + itemText() + ' - ' + amountText(); }

  function mailtoUrl() {
    return 'mailto:' + PAYPAL_EMAIL + '?subject=' + encodeURIComponent(subject()) + '&body=' + encodeURIComponent(message());
  }

  function gmailUrl() {
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(PAYPAL_EMAIL) +
      '&su=' + encodeURIComponent(subject()) + '&body=' + encodeURIComponent(message());
  }

  function validName() {
    if (refs.name.value.trim()) {
      refs.name.removeAttribute('aria-invalid');
      refs.name.removeAttribute('aria-describedby');
      refs.nameErr.textContent = '';
      return true;
    }
    refs.name.setAttribute('aria-invalid', 'true');
    refs.name.setAttribute('aria-describedby', 'pp-name-err');
    refs.nameErr.textContent = 'Please type your name so we know who paid.';
    refs.name.focus();
    return false;
  }

  function canShareFile() {
    try {
      return !!(file && navigator.canShare && navigator.share && navigator.canShare({ files: [file] }));
    } catch (e) { return false; }
  }

  function updateFileUi() {
    refs.fileBox.classList.toggle('pp-has', !!file);
    refs.fileName.textContent = file ? file.name : 'No screenshot chosen yet';
    refs.clear.hidden = !file;
    refs.attach.textContent = file ? 'Change screenshot' : 'Attach screenshot';
    refs.share.hidden = !canShareFile();
  }

  function wire() {
    refs.close.addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);

    refs.minus.addEventListener('click', function () { if (qty > 1) { qty--; refresh(); } });
    refs.plus.addEventListener('click', function () { if (qty < current.maxQty) { qty++; refresh(); } });

    refs.copy.addEventListener('click', function () {
      var done = function () {
        refs.copy.textContent = 'Copied';
        refs.copy.classList.add('pp-done');
        setTimeout(function () { refs.copy.textContent = 'Copy'; refs.copy.classList.remove('pp-done'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(PAYPAL_EMAIL).then(done, fallbackCopy);
      } else { fallbackCopy(); }
      function fallbackCopy() {
        var t = document.createElement('textarea');
        t.value = PAYPAL_EMAIL;
        t.setAttribute('readonly', '');
        t.className = 'pp-offscreen';
        document.body.appendChild(t);
        t.select();
        try { if (document.execCommand('copy')) done(); } catch (e) { /* user can select the text by hand */ }
        document.body.removeChild(t);
      }
    });

    refs.attach.addEventListener('click', function () { refs.fileInput.click(); });
    refs.fileInput.addEventListener('change', function () {
      file = refs.fileInput.files && refs.fileInput.files[0] ? refs.fileInput.files[0] : null;
      updateFileUi();
    });
    refs.clear.addEventListener('click', function () { file = null; refs.fileInput.value = ''; updateFileUi(); });

    refs.name.addEventListener('input', function () { if (refs.name.value.trim()) validName(); });

    refs.send.addEventListener('click', function () {
      if (!validName()) return;
      window.location.href = mailtoUrl();
      refs.hint.textContent = file
        ? 'Your email app is opening with everything filled in. Last step: attach "' + file.name + '" and press Send.'
        : 'Your email app is opening with everything filled in. Last step: attach your payment screenshot and press Send.';
    });

    refs.share.addEventListener('click', function () {
      if (!validName() || !canShareFile()) return;
      navigator.share({
        files: [file],
        title: subject(),
        text: 'To: ' + PAYPAL_EMAIL + '\r\n\r\n' + message()
      }).then(function () {
        refs.hint.textContent = 'Choose your email app. Your screenshot is attached. Send it to ' + PAYPAL_EMAIL + '.';
      }, function (err) {
        if (err && err.name === 'AbortError') return;
        refs.hint.textContent = 'Could not open the share sheet. Use "Send proof by email" instead.';
      });
      refs.hint.textContent = 'In the next screen choose your email app. Your screenshot is attached. Send it to ' + PAYPAL_EMAIL + '.';
    });

    refs.gmail.addEventListener('click', function (e) {
      if (!validName()) { e.preventDefault(); return; }
      refs.gmail.href = gmailUrl();
      refs.hint.textContent = 'Gmail is opening with everything filled in. Last step: attach your payment screenshot and press Send.';
    });
  }

  function onKey(e) {
    if (!overlay || overlay.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var items = Array.prototype.filter.call(
      modal.querySelectorAll('a[href], button, input, textarea'),
      function (n) { return !n.disabled && !n.hidden && n.tabIndex !== -1 && n.offsetParent !== null; }
    );
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open(trigger) {
    if (!overlay) build();
    var amt = parseFloat(trigger.getAttribute('data-pay-amount'));
    var maxQty = parseInt(trigger.getAttribute('data-pay-qty'), 10);
    var kes = parseFloat(trigger.getAttribute('data-pay-kes'));
    current = {
      item: trigger.getAttribute('data-pay-item') || 'Payment',
      amount: isNaN(amt) ? 0 : amt,
      currency: trigger.getAttribute('data-pay-currency') || 'USD',
      kes: isNaN(kes) ? 0 : kes,
      hasQty: !isNaN(maxQty) && maxQty > 1,
      maxQty: !isNaN(maxQty) && maxQty > 1 ? maxQty : 1,
      extra: trigger.getAttribute('data-pay-extra') || ''
    };
    qty = 1;
    file = null;
    refs.fileInput.value = '';
    refs.hint.textContent = '';
    refs.gmail.href = '#';
    refs.txn.value = '';
    while (refs.extraWrap.firstChild) refs.extraWrap.removeChild(refs.extraWrap.firstChild);
    refs.extraInput = null;
    if (current.extra) refs.extraInput = field(refs.extraWrap, current.extra, 'optional', '', 'off');
    updateFileUi();
    refresh();

    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.classList.add('pp-lock');
    void overlay.offsetWidth;
    overlay.classList.add('pp-open');
    refs.name.focus({ preventScroll: true });
  }

  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.classList.remove('pp-open');
    overlay.hidden = true;
    document.documentElement.classList.remove('pp-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-pay]') : null;
    if (!t) return;
    e.preventDefault();
    open(t);
  });
})();
