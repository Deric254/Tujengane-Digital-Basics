# Responsive check

Automated, real-browser checks for the four lesson pages (Data Basics, Computer Basics, Analyst Pro,
Computer Literacy). They answer: *can a visitor scroll to everything, on every kind of device, and did my
change break anything?* They are separate from `npm test` (that only needs Node; this needs Python).

## One-time setup

    pip install -r tools/responsive-check/requirements.txt
    python -m playwright install chromium

(If Chrome/Chromium is already installed you can instead set `CHROME_PATH` to it.)

## Run

| Command | What it proves | Time |
|---|---|---|
| `npm run check:scroll` | On 13 screen sizes (320 px phones to 1920 px desktop), real touch drags / mouse wheel reach the last "Check yourself" layer. Also flags sideways scrolling and JavaScript errors. | ~2 min |
| `npm run check:behave` | One click = one slide; slide navigator locks the page; paid courses don't hijack PageDown/Space/Home/End; swiping a code block scrolls it. | ~1 min |
| `npm run check` | Both of the above. | ~3 min |

Options for the scroll check: `python tools/responsive-check/reach.py --course analyst-pro --viewport phone-390x844 --slide 8`

Each command exits with code 1 if anything fails, so it can gate a release.

## Proving a cleanup changed nothing

Use this before deleting CSS/JS (or any refactor that should not alter how pages look):

    python tools/responsive-check/snapshot.py before.json     # record
    ... make your change ...
    python tools/responsive-check/snapshot.py after.json      # record again
    python tools/responsive-check/snapdiff.py before.json after.json

`snapdiff` prints `compared N cells, 0 differ` when every element's full computed style and position is
identical at every screen size and UI state (layers open, menu, slide navigator, chat). Any difference is
listed with the course, screen size and state. Recording all four courses takes ~6 minutes; use
`--course` / `--viewport` to narrow it. Hover and keyboard-focus styles are not recorded.

## Notes

- The paid courses are tested without a password: the check answers their API from `api/_data/*.json`.
- Nothing leaves your machine: external sites are blocked during the checks.
- The checks open slide 4 by default (`--slide 3`); layers exist on every slide, so try other slides too.
- `assets/css/scroll.css` is the scroll model these checks guard; `tests/scroll-css.test.js` guards its wiring in `npm test`.
