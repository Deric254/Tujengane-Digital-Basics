"""Behaviour checks that the layout tests can't see. Exit code 1 if any fails.
  free decks : one Next/Prev click moves exactly one slide; the slide navigator locks the page behind it
  paid       : PageDown/Space/End do NOT change slide, ArrowRight does; a swipe that starts on a
               sideways-scrolling code block scrolls the block instead of changing slide
  all        : no JavaScript errors
  python tools/responsive-check/behave.py"""
import asyncio, sys
sys.path.insert(0, __import__("os").path.dirname(__file__))
from playwright.async_api import async_playwright
from common import *
results = []
def check(name, ok, detail=""):
    results.append(ok); print(("PASS  " if ok else "FAIL  ") + name + ("  (" + detail + ")" if detail else ""))
cur = "()=>currentSlide"

async def free(b, srv, course):
    ctx, page, errs = await new_page(b, course, 390, 844, True, srv); await page.wait_for_selector(".layers"); await page.wait_for_timeout(600)
    a = await page.evaluate(cur); await page.click("#nextBtn"); await page.wait_for_timeout(1000); n = await page.evaluate(cur)
    await page.click("#prevBtn"); await page.wait_for_timeout(1000); p = await page.evaluate(cur)
    check(course + ": one Next click = one slide, one Prev click = back", (a, n, p) == (0, 1, 0), "%s -> %s -> %s" % (a, n, p))
    await page.evaluate("()=>openSlideNavigator()"); await page.wait_for_timeout(300)
    locked = await page.evaluate("()=>getComputedStyle(document.body).overflowY") == "hidden"
    await page.evaluate("()=>closeSlideNavigator()"); await page.wait_for_timeout(200)
    freed = await page.evaluate("()=>getComputedStyle(document.body).overflowY") != "hidden"
    check(course + ": slide navigator locks the page, closing frees it", locked and freed)
    check(course + ": no JavaScript errors", not errs, "; ".join(errs)); await ctx.close()

async def paid(b, srv, course):
    ctx, page, errs = await new_page(b, course, 1280, 720, False, srv); await open_slide(page, course, 3)
    s0 = await page.evaluate(cur); await page.mouse.move(700, 400)
    for k in ("PageDown", "Space", "End", "Home", "PageUp"): await page.keyboard.press(k); await page.wait_for_timeout(250)
    s1 = await page.evaluate(cur); await page.keyboard.press("ArrowRight"); await page.wait_for_timeout(1000); s2 = await page.evaluate(cur)
    check(course + ": PageDown/Space/End/Home/PageUp leave the slide alone, ArrowRight advances", (s0, s1, s2) == (3, 3, 4), "%s -> %s -> %s" % (s0, s1, s2))
    check(course + ": no JavaScript errors (desktop)", not errs, "; ".join(errs)); await ctx.close()
    ctx, page, _ = await new_page(b, course, 390, 844, True, srv); await open_slide(page, course, 3)
    await page.evaluate("""()=>{const pre=document.createElement('pre');pre.id='t';
        pre.style.cssText='overflow-x:auto;margin:8px 0';pre.style.setProperty('white-space','pre','important');
        pre.textContent='x'.repeat(400);document.querySelector('.slide-content').prepend(pre)}""")
    s0 = await page.evaluate(cur); box = await page.evaluate("()=>{const r=document.getElementById('t').getBoundingClientRect();return [r.left,r.top,r.width,r.height]}")
    cdp = await ctx.new_cdp_session(page); xs = box[0] + box[2] - 30; y = box[1] + box[3] / 2
    await cdp.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": xs, "y": y}]})
    for i in range(1, 11):
        await cdp.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": xs - 25 * i, "y": y}]}); await page.wait_for_timeout(16)
    await cdp.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []}); await page.wait_for_timeout(900)
    s1 = await page.evaluate(cur); sl = await page.evaluate("()=>{const t=document.getElementById('t');return t?t.scrollLeft:-1}")
    check(course + ": swiping a sideways-scrolling code block scrolls it, slide stays", s1 == s0 and sl > 0, "slide %s -> %s, block scrolled %spx" % (s0, s1, round(sl)))
    await ctx.close()

async def main():
    with Server() as srv:
        async with async_playwright() as p:
            b = await launch(p)
            for c, d in COURSES.items(): await (free if d["kind"] == "free" else paid)(b, srv, c)
            await b.close()
    print("\n%d of %d checks passed" % (sum(results), len(results))); sys.exit(0 if all(results) else 1)
asyncio.run(main())
