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


## Temporary passwords (for live teaching)
1. Open `temp-access.html` on the live site (or run `Make-Temp-Code.bat` locally), enter your owner password, choose the course and duration.
2. Share the code. It works only for that course and stops at the time shown, even if learners still see it.
3. To cancel all codes immediately: set `COURSE_TEMP_EPOCH` to a new value in Vercel and redeploy.

## Run locally
Double-click `Run-Tujengane-Local.bat` (needs Node.js). First run installs packages and creates `.env.local` with test passwords. Open http://localhost:3000. `npm test` runs the tests.

## Practice Playground
`/playground/` (not listed in search engines). Python runs in the browser through Pyodide (MPL-2.0, files in `assets/vendor/pyodide`). No pandas offline.

## AI Tutor
The "Help" button (bottom right) on the lesson pages of both paid courses opens the AI Tutor, a My review list, and contact links. It sends the learner's question plus the lesson they are viewing (taken from the server's own copy, so learners cannot fake it) to an AI provider. Only learners signed in to that course (owner password or valid temp code) can use it.
1. In Vercel, add at least one key: GROQ_API_KEY or GEMINI_API_KEY or OPENROUTER_API_KEY (free), and optionally ANTHROPIC_API_KEY or OPENAI_API_KEY (paid). Redeploy.
2. Free providers are tried first; if one is busy or out of quota, the next (paid) one answers. Set TUTOR_PROVIDERS to change the order, e.g. `anthropic,groq` for paid first.
3. Limits per learner (20 per hour) and per day (800) protect your bill: TUTOR_RATE_PER_HOUR, TUTOR_DAILY_CAP. TUTOR_ENABLED=0 switches the tutor off. The tutor also answers visitors who are not signed in (from the page text only); TUTOR_PUBLIC=0 limits it to signed-in learners.
4. Model names change over time. If a provider starts failing, set TUTOR_MODEL_<PROVIDER> to a current model name from that provider.
Locally: put the same keys in `.env.local` before running Run-Tujengane-Local.bat.

## SQL playground
Playground, SQL tab: a practice SQLite database (customers, products, sales) rebuilt on every Run, so DROP/DELETE can never break anything. Runs in the browser (sql.js, MIT licence, `assets/vendor/sqljs`).

If the tutor says "AI service is not available": open `temp-access.html`, use "Test the AI tutor", and read which provider fails and why. With no key at all the tutor still answers from the lessons, but only AI keys give full explanations.


## Checking the AI tutor

After changing the AI key, model, prompt or lessons, run `npm run tutor:golden` (needs a key in `.env.local`). It asks 22 fixed questions with known answers, including trap questions, and prints PASS or FAIL for each.


## Practice labs
Labs: python, sql, password, hash, caesar, phish, url, logs, access, risk, order, excel, pivot. Embed with `<div class="tj-lab" data-lab="excel"></div>` before the `layers` block. All run in the browser; no eval.
