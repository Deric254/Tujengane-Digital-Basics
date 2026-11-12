"""Can a visitor reach the last layer ("Check yourself") of a lesson on every screen size?
Uses real touch drags on touch sizes and mouse-wheel on desktop sizes, scrolling until the page stops moving.
Exit code 1 if any combination fails.

  python tools/responsive-check/reach.py [--course data-basics,analyst-pro] [--viewport phone-390x844] [--slide 3]
"""
import argparse, asyncio, sys
sys.path.insert(0, __import__("os").path.dirname(__file__))
from playwright.async_api import async_playwright
from common import *

STATE = """()=>{
  const t=document.querySelector('.layer-check'); if(!t) return {noCheck:true};
  const b=t.getBoundingClientRect(), vh=innerHeight, vw=innerWidth;
  const px=Math.min(Math.max(b.left+b.width/2,1),vw-1), py=Math.min(Math.max(b.top+Math.min(b.height,30)/2,1),vh-1);
  const hit=document.elementFromPoint(px,py);
  return {top:Math.round(b.top), bottom:Math.round(b.bottom), inView:b.top>=0&&b.bottom<=vh+1,
          uncovered:!!(hit&&hit.closest('.layer-check')), hscroll:document.documentElement.scrollWidth>vw+1}}"""

async def one(browser, server, course, vp, slide):
    name, w, h, touch = vp; rec = dict(course=course, vp=name)
    ctx, page, errors = await new_page(browser, course, w, h, touch, server)
    try:
        await open_slide(page, course, slide)
        await page.wait_for_selector(".layer-check", timeout=8000)
        cdp = await ctx.new_cdp_session(page); cx, cy = w // 2, int(h * 0.55); prev = None; stable = 0
        for _ in range(40):
            if touch: await touch_drag(cdp, page, cx, int(h * 0.80), int(h * 0.30))
            else: await page.mouse.move(cx, cy); await page.mouse.wheel(0, 500)
            await page.wait_for_timeout(260)
            cur = (await page.evaluate(STATE)).get("top")
            stable = stable + 1 if cur == prev else 0
            if stable >= 2: break
            prev = cur
        end = await page.evaluate(STATE)
        rec.update(ok=bool(end.get("inView") and end.get("uncovered")), hscroll=end.get("hscroll"), errors=errors[:2])
    except Exception as e:
        rec.update(ok=False, hscroll=False, error=str(e)[:120], errors=errors[:2])
    await ctx.close(); return rec

async def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--course"); ap.add_argument("--viewport"); ap.add_argument("--slide", type=int, default=3)
    a = ap.parse_args(); courses = pick_courses(a.course); vps = pick_viewports(a.viewport); rows = []
    with Server() as srv:
        async with async_playwright() as p:
            b = await launch(p)
            for c in courses:
                for i in range(0, len(vps), 5):
                    rows += await asyncio.gather(*[one(b, srv, c, v, a.slide) for v in vps[i:i + 5]])
            await b.close()
    print("%-22s" % "viewport" + "".join("%19s" % c for c in courses)); bad = 0
    for v in vps:
        line = "%-22s" % v[0]
        for c in courses:
            r = next(x for x in rows if x["course"] == c and x["vp"] == v[0])
            s = "OK" if r["ok"] else ("ERROR" if "error" in r else "FAIL")
            if r["hscroll"]: s += "+sideways-scroll"
            if r["errors"]: s += "+js-error"
            bad += s != "OK"; line += "%19s" % s
        print(line)
    print("\n%d of %d combinations OK" % (len(rows) - bad, len(rows))); sys.exit(1 if bad else 0)
asyncio.run(main())
