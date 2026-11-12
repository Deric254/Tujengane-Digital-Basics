"""Shared helpers for the responsive checks (see README.md)."""
import json, os, socket, subprocess, sys, time
from pathlib import Path

ROOT = Path(os.environ.get("PROJECT_ROOT") or Path(__file__).resolve().parents[2])

# page, kind (free = lessons are static files; paid = lessons come from the API), api route, data file
COURSES = {
    "data-basics":       dict(page="Tujengane data basics/databasics.html", kind="free"),
    "computer-basics":   dict(page="computer basicss/computerbasicss.html", kind="free"),
    "analyst-pro":       dict(page="Tujengane Analyst Pro/analystpro.html", kind="paid",
                              api="/api/analyst", data="api/_data/analyst.json"),
    "computer-literacy": dict(page="Tujengane Computer Literacy/computerliteracy.html", kind="paid",
                              api="/api/literacy", data="api/_data/literacy.json"),
}
# name, width, height, touch
VIEWPORTS = [
    ("phone-320x568", 320, 568, True), ("phone-360x640", 360, 640, True), ("phone-375x667", 375, 667, True),
    ("phone-390x844", 390, 844, True), ("phone-412x915", 412, 915, True),
    ("phone-land-667x375", 667, 375, True), ("phone-land-844x390", 844, 390, True),
    ("tablet-768x1024", 768, 1024, True), ("tablet-820x1180", 820, 1180, True),
    ("tablet-land-1024x768", 1024, 768, True),
    ("laptop-1280x720", 1280, 720, False), ("laptop-1366x768", 1366, 768, False),
    ("desktop-1920x1080", 1920, 1080, False),
]

def pick_courses(arg):
    names = arg.split(",") if arg else list(COURSES)
    bad = [n for n in names if n not in COURSES]
    if bad: sys.exit("unknown course: %s (choose from %s)" % (", ".join(bad), ", ".join(COURSES)))
    return names

def pick_viewports(arg):
    if not arg: return VIEWPORTS
    want = arg.split(",")
    vps = [v for v in VIEWPORTS if v[0] in want or "%dx%d" % (v[1], v[2]) in want]
    if not vps: sys.exit("no viewport matches %s" % arg)
    return vps

class Server:
    """Serves the project folder on a free local port (no network needed)."""
    def __enter__(self):
        s = socket.socket(); s.bind(("127.0.0.1", 0)); self.port = s.getsockname()[1]; s.close()
        self.proc = subprocess.Popen([sys.executable, "-m", "http.server", str(self.port), "--bind", "127.0.0.1"],
                                     cwd=str(ROOT), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        time.sleep(1); return self
    def __exit__(self, *a): self.proc.terminate()
    def url(self, page): return "http://127.0.0.1:%d/%s" % (self.port, page.replace(" ", "%20"))

async def launch(p):
    """CHROME_PATH can point at an existing Chrome/Chromium; otherwise Playwright's own is used."""
    return await p.chromium.launch(executable_path=os.environ.get("CHROME_PATH") or None, args=["--no-sandbox"])

def api_body(course):
    c = COURSES[course]
    if c["kind"] != "paid": return None
    return json.dumps({"modules": json.load(open(ROOT / c["data"], encoding="utf-8"))})

async def new_page(browser, course, w, h, touch, server):
    """Opens the course. External sites are blocked; the paid courses' API is answered from api/_data."""
    c = COURSES[course]; body = api_body(course)
    ctx = await browser.new_context(viewport={"width": w, "height": h}, has_touch=touch, is_mobile=touch,
                                    device_scale_factor=2 if touch else 1)
    page = await ctx.new_page(); errors = []
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    async def route(r, *_):
        u = r.request.url
        if body and u.endswith(c["api"]) and r.request.method == "GET":
            await r.fulfill(status=200, content_type="application/json", body=body); return
        await (r.continue_() if u.startswith("http://127.0.0.1") else r.abort())
    await page.route("**/*", route)
    await page.goto(server.url(c["page"]), wait_until="domcontentloaded", timeout=20000)
    return ctx, page, errors

async def open_slide(page, course, index):
    """Shows lesson slide `index` (0-based) once the course is ready."""
    if COURSES[course]["kind"] == "free":
        await page.wait_for_selector(".layers", timeout=10000)
        for k in range(1, index + 1):
            for _ in range(20):
                await page.evaluate("()=>window.nextSlide()")
                try:
                    await page.wait_for_function("()=>currentSlide===%d" % k, timeout=1500); break
                except Exception: pass
            try: await page.wait_for_function("()=>typeof isNavigating==='undefined'||!isNavigating", timeout=4000)
            except Exception: pass
            await page.wait_for_load_state("networkidle"); await page.wait_for_timeout(700)
    else:
        await page.wait_for_function("()=>typeof modules!=='undefined'&&modules.length>0", timeout=10000)
        await page.evaluate("()=>{currentModule=0;currentSlide=%d;updateSlide(0,%d)}" % (index, index))
    await page.wait_for_timeout(600)

async def touch_drag(cdp, page, x, y0, y1, steps=10):
    await cdp.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": x, "y": y0}]})
    for i in range(1, steps + 1):
        await cdp.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": x, "y": y0 + (y1 - y0) * i / steps}]})
        await page.wait_for_timeout(16)
    await cdp.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
