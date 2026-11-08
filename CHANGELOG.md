Date: 2026-11-08 - Course pages: one side panel for all four courses

- New assets/css/course-nav.css, linked last on Data Basics, Computer Basics, Data Literacy (Analyst Pro) and Computer Literacy. It restyles only: ids, hooks, the module accordion open/close rules and all scripts are unchanged.
- The free decks had a dark green panel (deck.css) and the paid courses a third look (mid-green boxed cards); all now use the same light panel as the home page: white card, mint number tiles, green active row, one width (300px) on desktop, spare height shared between rows so there is no empty strip.
- The dark panel block moved out of deck.css (deck.css keeps only stage and slide styling); the unused --dk-panel variable was removed.
- Fits without scrolling at 900px tall and up: all 22 lessons of both free decks, and all 13 modules of both paid courses. Shorter windows scroll inside the panel as before.
- Header links on Computer Literacy now match the other three pages. Bar heights are left alone because each page's layout math depends on them.
- Checked at 390, 768, 1024 and 1440 px: no horizontal overflow, no script errors. npm test: 58 of 58.

----------------------------------------

Date: 2026-11-08 - Home page comfort pass (one calm screen, no empty panels)

- Only assets/css/ui.css changed (still scoped to body.home-page). No markup, script, id, content or logic changes.
- First screen: header and promo bar are slimmer, the headline sits on one line on desktop, and the hero, value strip, all four course cards and the top of the app banner now show together at 1280x720 and up. Course cards stay four across down to 1181px wide (they went two-by-two at 1280px before).
- Content sits directly on the soft page tint instead of a second white slab, so there is no large blank white panel behind the cards.
- Side panel: slightly wider with larger text, every row on a single line (the 50% OFF badge no longer drops to a second line), and the whole panel still fits one screen from 720px tall up, and it now stretches to the bottom of the first screen with spare height shared between the rows, so there is no empty strip under it. Restyled as a light, premium panel: white card, icon tile on every row, one line per row, a soft gold Featured Training card, a quiet Our Purpose card; no scrolling at any common laptop or desktop height.
- Phones: the round training arrows (they covered card text) are hidden, swiping and the dots remain; the two prices sit side by side. On wider screens the arrows get a side gutter so nothing pokes past the content edge.
- Main panel from 1181px wide: the long single stack became a compact 12-column grid (DOM order unchanged, placement only): training scroller beside testimonials, dashboards, a slim Ready band, and pricing with payment methods in one row. Course cards, value strip, hero and app banner are smaller (app preview is a cropped thumbnail). Page height at 1440x900 went from about 2,720px to about 1,980px, with no stretched or empty cells.
- Checked in headless Chromium at 320, 390, 768, 1024, 1181, 1280, 1440 and 1920 px: no horizontal overflow, no script errors. npm test: 57 of 57 pass.

----------------------------------------

Date: 2026-11-08 - Home page UI refinement (compact, dericBI look)

- New assets/css/ui.css, loaded after chrome.css and scoped to body.home-page, so no course page changes. Compact density in the dericBI design language: one green palette, small 12px cards, one button system (solid green = go, white outline = secondary, gold = main call to action), consistent headings, calm motion and clear focus rings. The page is about 24% shorter on desktop and 21% on phones.
- Side panel: every item is still there (13 blocks), shrunk to slim one-line rows that scale with the window height so the whole panel fits on one screen (checked from 650px tall up). Each link's description opens in a small panel on hover or keyboard focus. The panel is sticky, so there is no blank column beside long content. On very short windows (under 560px tall) it scrolls instead of clipping.
- Main area: smaller hero, value cards, course cards four across (two on tablets, one on phones), slimmer app banner, training cards, testimonials, dashboards, pricing and call-to-action band. Buttons are finger-sized on phones.
- Fixed on the way: the invalid body background ("to-br"), the global button:hover that zoomed every button and turned it yellow, badges clipped at card and sidebar edges, yellow-on-white sidebar links, whole-banner pulsing, mismatched dashboard cards, two conflicting theme-color tags.
- Respects prefers-reduced-motion. Only class hooks were added to index.html (ui-values, ui-quick, ui-testi, ui-testi-actions, ui-chips, ui-ready); no ids, scripts or content were removed.
- package.json pins Node to 24.x so Vercel stops auto-upgrading to 26.x.

----------------------------------------

Date: 2026-11-07 - PayPal "Pay now" with proof of payment

- New shared modal (assets/js/paypal-pay.js, assets/css/paypal-pay.css). "Pay now" buttons were added to the Per Module and Full Package prices and the DericBI Instructor licence on the home page, and to the licence steps on the DericBI Instructor page. The Per Module button has a 1-13 module stepper.
- The modal shows the total and the PayPal address (dericmarangu@gmail.com) with a Copy button, then one form: name, phone or email, optional transaction ID (and the activation code for licences) and the payment screenshot. The screenshot is shrunk in the browser and shown as a thumbnail so the learner can see it is attached. "Send proof" posts it to api/payment-proof.js, which emails it to the owner as a real attachment.
- The email is sent through your own Gmail (nodemailer, SMTP). It needs one environment variable in Vercel: GMAIL_APP_PASSWORD (a Google app password). GMAIL_USER and PROOF_TO are optional (see .env.example). Until the password is set the button says sending is not switched on yet. package.json now lists nodemailer and pins Node to 24.x (the version Vercel is set to).
- Payment Methods now lists PayPal. The Instructor page keeps its strict CSP (no inline script or style).

----------------------------------------

Date: 2026-11-07 - Layered lessons and a professional deck look

- Every slide in the four courses now has a Foundation text plus a Practice layer, a Level-up/Expert layer and a Check-yourself answer (assets/css/layers.css). The 342 unused placeholder files under the old modules folders were removed.
- Data Basics and Computer Basics use a new presentation layer (assets/css/deck.css): slides fill the whole panel, a deep-green side panel with a clear active marker, a progress bar, and a Previous/Next toolbar. Nothing in the scripts changed except one line that sets the progress bar.
- The course footers compute the year (assets/js/year.js).

----------------------------------------

Date: 2026-11-05 - Clean-up and a rolling offer

- The discount is now one ongoing offer driven by assets/js/promo.js: it counts down each 30-day round and starts the next one by itself. Set `percent` to 0 in that file to close it; the banner and every "% OFF" badge then hide. Visitors who dismiss the banner are not shown it again on that page.
- Removed claims that could not be backed up (a specific monthly income, a sales increase, "thousands" of learners) and the decorative emoji in headings, banners and social previews. The learner quotes remain, without figures.
- The footer year is computed; the copyright meta tag and the "updated" meta tag no longer carry a year. sitemap.xml no longer carries a fixed last-modified date.
- Removed the unused old activation screenshot (dericbi-instructor/img/license.webp); the product-page test passes again.

----------------------------------------

Date: 2026-10-17 - DericBI Instructor page updated for the new licensing

- The app now uses per-computer activation codes (no more license keys). The product page teaches the new journey: download, install, send your activation code on WhatsApp, paste the licence we reply with, create your account. New real screenshot of the activation screen.
- Added 'Keeping your licence active' (renewal licences each paid period, reminder 14 days before the end) and FAQ answers for: licence not accepted, what happens when a licence ends, using another computer.
- Pricing wording is now neutral ('1,000 USD per licence'); the 'one-time' claim was removed because licences follow the months paid. Spelling is 'licence' throughout. Checklist progress storage key bumped (old ticks no longer apply).
- Deploy together with app version 1.7+ (the old installer asks for a key, not a code).

----------------------------------------

Date: 2026-10-14 - DericBI Instructor desktop app added as a product

- New product page /dericbi-instructor/ : guided 5-step journey (get license key, download installer, install, activate, create account), real screenshots, offline/online table, optional AI-tutor setup, FAQ and Windows SmartScreen help. Installer link: GitHub latest release; the page shows the live version/size/date and degrades gracefully (no release yet -> WhatsApp fallback; API blocked -> direct link still works). Strict CSP, no inline scripts/styles.
- Home page: sidebar entry (badge APP) and a featured banner under the course cards; sitemap entry; product social card (og-instructor.png).
- tests/product-page.test.js guards the page (links, CSP, structured data, noopener, download URL, home entry points).
- Price is deliberately not stated: buyers are sent to WhatsApp for today's price. Edit the step-1 text in dericbi-instructor/index.html to publish one.

----------------------------------------

Date: 2026-10-13 - Quality audit (links, errors, polish)

Fixed:
- other_trainings/kneck.html: `exitBtn is not defined` stopped the exam script mid-way, so state restore, fullscreen handlers, refresh protection and the return-to-exam button never ran. Now guarded (#exit-btn is optional); the dormant code runs as originally written.
- kneck system-check badges: removed doubled icons (CSS tick + literal tick, CSS '!' + literal warning sign); badges now start neutral instead of showing a tick before anything is verified.
- Amplitude init no longer throws when the analytics script is blocked (ad-blockers) on any course page.
- Removed ineffective <meta http-equiv> tags (X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Cache-Control, Expires, COEP/COOP/CORP); real security headers now come from vercel.json (nosniff, SAMEORIGIN, strict-origin-when-cross-origin). Camera access is intentionally NOT restricted (the exam uses it).
- Added rel="noopener noreferrer" to all 37 target=_blank links.
- Slide links to Computer Literacy used '../../' (only worked because browsers clamp at the site root); now '../Tujengane%20Computer%20Literacy/...'.
- Analyst Pro slide headings: underline refined (3px brand-gold, offset) instead of the default thin black line.

Verified (headless Chromium): every page at 3 sizes, all 377 lesson slides opened; 0 JS errors, 0 broken images, 0 failed local requests, 0 horizontal overflow, 0 broken internal links; layout unchanged vs previous build (300 geometry checks).

----------------------------------------

Date: 2026-10-12 - Header/footer polish

- New assets/css/chrome.css (linked last in every page): header and footer content now use the full screen width (Tailwind's capped .container and the course pages' `.footer .container {max-width:1200px}` no longer pinch it); consistent pill-style header links on all pages (Analyst Pro had none); header gradient + shadow; gold ring on logos; gradient footer with brand accent line; footer items vertically centred on the free courses.
- Safe by construction: never sets position/height/margin/z-index (course pages pin header/footer with fixed bars). Verified in Chromium at 6 widths x 5 pages: no layout shift; phones (<=640px) unchanged. Guarded by tests/chrome-css.test.js.
- Home page footer has slightly more padding on tablet/desktop (body.home-page).
- Nav label capitalisation fixed: 'Computer Basics', 'Data Literacy'.

----------------------------------------

Date: 2026-10-12 - Security, Tailwind build, assets

Security:
- Course passwords were hard-coded in public scripts and lesson content shipped to every visitor. Access is now verified server-side (api/analyst.js, api/literacy.js) with signed HttpOnly cookies; lessons moved to api/_data/. Old passwords are retired: set COURSE_* env vars (see README).

Performance / build:
- Tailwind Play CDN (and tailwindcss-jit-cdn on Computer Literacy) replaced by precompiled assets/css/tailwind.css (14 KB). Computer Literacy now uses Tailwind 3 like the other pages.
- Course scripts shrank from 167 KB / 131 KB to 40 KB / 36 KB (content now loaded after login).
- Added 1200x630 assets/og-image.png for social previews; og:image sizes now accurate.
- Tujengane Digital Skills Logo.png re-encoded (1.4 MB -> 46 KB, identical dimensions).

Fixed / removed:
- Added assets/audio/cheer.mp3 and restored the <audio> element on Analyst Pro and Computer Literacy.
- Removed unused images (profile.png, profileprev1.png, advert1_TDB.png, images/profile.png, tdslogo2.png) and 7 debug console.log calls in kneck.html.
- robots.txt: Disallow /api/.

----------------------------------------

Date: 2026-10-11 - 404 fix, dead-code removal, metadata accuracy, image performance

Fixed:
- index.html: link to 'Tujengane computer literacy/' (lowercase) 404'd on Vercel (case-sensitive). Now 'Tujengane Computer Literacy/'.
- index.html: invalid JSON-LD (stray '],') repaired; structured data was being ignored.
- og:url / JSON-LD urls pointing to non-existent /analyst-pro, /computer-literacy, /computer-basics now use real page URLs.
- og:image / twitter:image were relative ('../assets/logo.png'); now absolute so link previews work.

Removed (verified unreferenced):
- Tujengane Analyst Pro/css/styles.css.bak, styles_responsive_fix.css; computer basicss/js/scripts_backup.js
- Tujengane Analyst Pro/modules/ and Tujengane Computer Literacy/modules/ (342 slide files never fetched; course content is served from scripts.js)
- Unused 'navLinks' variable (Analyst Pro and Computer Literacy scripts.js); commented-out <audio> and <button> blocks.

Performance:
- Added assets/logo-128.png (23 KB) and assets/images/profile-64.png (12 KB) for in-page <img> use; originals kept for og:image.
- Dashboard screenshots on home page now loading=lazy.
- <audio src=cheer.mp3> (file not present) set to preload=none to stop a 404 on every page load.

Not changed / follow-ups: add assets/audio/cheer.mp3 if celebration sound is wanted; see notes in chat.

----------------------------------------

Changelog - Tujengane Digital Skills (conservative layout & numbering fixes)

Date: 2025-09-13
Branch: main

Summary:
- Conservative, non-destructive fixes applied to resolve horizontal overflow on small viewports, reveal runtime-updated slide numbers, and apply a single requested welcome-link change.

Files changed (high level):

1) index.html
   - Anchored marquee left and added defensive CSS guards in embedded <style>:
     - Changed `.slogan-marquee-track` to `left: 0; max-width: 100%; overflow: hidden;` (was previously positioned to the right in some variants).
   - No content text changes.

2) Tujengane computer literacy/js/scripts.js
   - updateSlide(): visible slide counter updated to include module number (e.g., "Module 2 — Slide 3 of 10").
   - Added helper `setSidebarNumbersCL()` to format sidebar numbers as `module.slide` and invoked at load.
   - No slide content strings were changed.

3) Tujengane computer literacy/css/styles.css
   - Replaced `width: 100vw` / `max-width: 100vw` occurrences in mobile rules with `width: 100%` / `max-width: 100%`.
   - Anchored marquee to left and added `max-width`/`overflow: hidden` guards.
   - Added `box-sizing: border-box` to relevant small-screen blocks.

4) Tujengane analyst pro/css/styles.css
   - Revealed `.sidebar-item .slide-number` by ensuring `display: inline-block` and adding `min-width`, color, and font-weight so runtime-populated numbers are visible.
   - (Note: there is also `styles.css.bak` in that folder -- backups were not modified.)

5) Tujengane analyst pro/js/scripts.js
   - Updated a single welcome-card href to point to the Computer Basics page (user requested content change).
     - New target: `../computer basicss/computerbasicss.html` (relative link)

6) Tujengane data basics/css/styles.css
   - Replaced `100vw` usages in mobile rules with `100%` and added `box-sizing: border-box` where needed.
   - Anchored marquee left and added `max-width`/`overflow: hidden` guards.

7) Tujengane data basics/databasics.html
   - Updated inline mobile style block: `100vw` -> `100%`, added `box-sizing` and defensive adjustments.

8) computer basicss/computerbasicss.html
   - Replaced inline mobile style `100vw` -> `100%` and added `box-sizing: border-box` on small-screen overrides.

9) computer basicss/css/styles.css
   - Replaced mobile `100vw` / `95vw` usages with percent equivalents (`100%` / `95%`), added `box-sizing: border-box`, and ensured marquee anchor is left.

Notes & rationale:
- Avoided changing slide template strings (innerHTML) except the explicit welcome-link edit you requested.
- Replacements focused on mobile media queries and small-screen overrides where viewport-width units caused overflow/clipping.
- Left backup files (e.g., `styles.css.bak`) untouched.

Remaining / follow-ups (recommended):
- `styles.css.bak` files still contain `100vw` occurrences (these are backups; no action taken). Consider removing or updating if you plan to keep them as live styles.
- Standardize `.slide-number` visibility across all course CSS files (I updated the major ones; others appear fine but a full sweep is simple if you want it).
- Replace prompt()-based gating with a small modal for better UX and security (requires UX decision).
- Optionally centralize share/clipboard logic into a shared JS file to keep behavior consistent.

How I validated:
- Repo-wide grep for `100vw` performed before/after patches; main occurrences in active `styles.css` files replaced. Remaining matches are only in `.bak` files.
- Visual, conservative CSS edits only — nothing that would change slide text/content (except the requested welcome link change).

If you'd like, I can now:
- Run the lightweight smoke tests (quick lint/errors) and open the main pages in a simulated narrow viewport to confirm the fixes (I can provide the commands to run locally), or
- Continue and update the `.bak` files as well (if you want every file changed), or
- Revert any specific change if it's not what you expected.

-- End of changelog

Additional edits (2025-09-13):

- Password modal layout & visual tweaks
   - Updated the password entry modals on `Tujengane Analyst Pro/analystpro.html` and `Tujengane computer literacy/computerliteracy.html` to use the wrapper/backdrop/dark-box visual pattern and fixed the control layout so the password input + eye toggle sit on one row and Cancel + Submit appear on a second row. Preserved all JS logic, IDs, passwords, and sessionStorage keys.

- Small-device UX and touch feedback
   - Added a conservative, non-animated touch-feedback style block into `index.html` to give immediate press feedback (brightness + subtle shadow) for buttons and links. This is intentionally inline and minimal to avoid site-wide regressions.

- Copy & CTA fixes
   - Corrected visible text typos of "Computer Basicss" → "Computer Basics" (display text only; did not rename folders).
   - Unified CTA sizes and added a short summary sentence on `Tujengane data basics/slides/slide22.html`.

- Sidebar content
   - Added a compact "Our Purpose" (Mission / Vision / Core values) block under the About the Author sidebar item on `index.html` to fill empty space without altering sidebar width or layout.

All changes above were conservative and presentational only. No passwords, gating logic, or file/folder names were renamed. Manual verification recommended (open the three course pages and `index.html` on desktop and mobile/emulation).

- Removal (2025-09-13):
   - Removed a casual summary sentence from `Tujengane data basics/slides/slide22.html` that could be misinterpreted or display unprofessional language. The paragraph was removed to maintain a concise, professional tone across the curriculum slides.

