# Tujengane Digital Basics
TDB is a one day event to empower smes and hustlers collect good data


## Development & operations

### Tailwind CSS (precompiled)
Pages load `assets/css/tailwind.css`, built from `tailwind.config.js`. After adding a **new Tailwind class** anywhere
(HTML, `js/scripts.js`, slide partials, or lesson JSON in `api/_data/`), rebuild and commit the CSS:

    npm install
    npm run build:css      # or: npm run watch:css

The built file is committed so Vercel needs no build step. Custom CSS (`css/styles.css`) intentionally loads *after*
Tailwind so it can override utilities.

### DericBI Instructor product page
`dericbi-instructor/` is the product page for the desktop app (source: github.com/Deric254/dericbi-instructor). The download button always points at `releases/latest/download/DericBI-Instructor-Setup.exe`; the page also reads the GitHub releases API to show the version and size. To change the price or support contact, edit step 3, the FAQ and the `wa.me` links in `dericbi-instructor/index.html`. New Tailwind classes there need `npm run build:css`.

### Security headers
`vercel.json` sets `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN` and `Referrer-Policy`. Do not add a camera/microphone `Permissions-Policy` site-wide: the KNEC exam needs the camera.

### Header / footer styling
`assets/css/chrome.css` (loaded last on every page) controls header/footer width and polish. It is deliberately visual-only: the course pages pin their bars with `position: fixed` and fixed heights, so do not add position/height/margin rules there (`npm test` enforces this).

### Paid-course access (Analyst Pro, Computer Literacy)
Passwords are checked on the server, not in the browser. Lesson content is in `api/_data/*.json` and is only returned by
`/api/analyst` and `/api/literacy` to a visitor holding a valid signed session cookie.

Set these in Vercel -> Project -> Settings -> Environment Variables (see `.env.example`), then redeploy:

| Variable | Purpose |
|---|---|
| `COURSE_COOKIE_SECRET` | 32+ random chars (`openssl rand -hex 32`); signs session cookies |
| `COURSE_PASSWORD_ANALYST` | Analyst Pro password |
| `COURSE_PASSWORD_LITERACY` | Computer Literacy password |

* Missing variables = courses stay locked (fails closed).
* To change a password: edit the variable and redeploy. Existing sessions end after 12 hours or when the browser closes.
* To edit lessons: change `api/_data/<course>.json` (shape: `[{title, slides:[{title, content}]}]`), then `npm run build:css` if you added new Tailwind classes.
* Local testing needs the Vercel CLI (`vercel dev`) because `/api` only exists on Vercel; opening the HTML directly will show the password prompt but can never unlock.
* `npm test` runs the API security tests.
* After first deploy, confirm `https://<site>/api/_data/literacy.json` returns **404**.
