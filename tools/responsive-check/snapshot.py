"""Records every element's full computed style (and position) for each course, screen size and UI state
(base, layers open, menu, slide navigator, chat). Compare two recordings with snapdiff.py to PROVE a change
altered nothing (e.g. after deleting CSS).

  python tools/responsive-check/snapshot.py before.json [--course ...] [--viewport ...]
"""
import argparse, asyncio, hashlib, json, sys
sys.path.insert(0, __import__("os").path.dirname(__file__))
from playwright.async_api import async_playwright
from common import *

SNAP = """()=>{const out=[];
 for(const e of document.body.querySelectorAll('*')){ if(['SCRIPT','STYLE','LINK','NOSCRIPT'].includes(e.tagName)) continue;
   const cs=getComputedStyle(e), r=e.getBoundingClientRect();
   let s=Math.round(r.x)+','+Math.round(r.y)+','+Math.round(r.width)+','+Math.round(r.height)+'|';
   const names=[];for(let i=0;i<cs.length;i++)names.push(cs[i]); names.sort();   // Chrome lists custom properties in random order
   for(const p of names) s+=p+':'+cs.getPropertyValue(p)+';';
   out.push(s);} return out}"""
STATES = [("base", None),
 ("layers-open", "()=>document.querySelectorAll('.layers details').forEach(d=>d.open=true)"),
 ("menu", "()=>{const b=document.getElementById('hamburger')||document.querySelector('.hamburger,#hamburgerBtn,.hamburger-btn,#floatingHomeBtn');if(b)b.click()}"),
 ("navigator", "()=>{if(typeof openSlideNavigator==='function')openSlideNavigator()}"),
 ("chat", "()=>{const b=document.getElementById('chatButton');if(b)b.click()}")]
H = lambda lst: [hashlib.md5(x.encode()).hexdigest()[:8] for x in lst]

async def one(browser, server, course, vp):
    name, w, h, touch = vp; res = {}
    ctx, page, _ = await new_page(browser, course, w, h, touch, server)
    try:
        await page.add_style_tag(content="*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}")
        await open_slide(page, course, 3)
        for st, js in STATES:
            if js:
                try: await page.evaluate(js)
                except Exception: pass
                await page.wait_for_timeout(250)
            await page.evaluate("()=>{document.querySelectorAll('*').forEach(e=>{if(e.scrollTop)e.scrollTop=0;if(e.scrollLeft)e.scrollLeft=0});window.scrollTo(0,0)}")
            await page.wait_for_timeout(250); prev = None
            for _ in range(12):
                cur = await page.evaluate(SNAP)
                if cur == prev: break
                prev = cur; await page.wait_for_timeout(400)
            res[st] = H(cur)
            if st == "navigator": await page.evaluate("()=>{if(typeof closeSlideNavigator==='function')closeSlideNavigator()}")
    except Exception as e: res["error"] = str(e)[:120]
    await ctx.close(); return name, res

async def main():
    ap = argparse.ArgumentParser(); ap.add_argument("out"); ap.add_argument("--course"); ap.add_argument("--viewport"); a = ap.parse_args()
    courses = pick_courses(a.course); vps = pick_viewports(a.viewport); out = {}
    with Server() as srv:
        async with async_playwright() as p:
            b = await launch(p)
            for c in courses:
                out[c] = {}
                for i in range(0, len(vps), 3):
                    for k, v in await asyncio.gather(*[one(b, srv, c, vp) for vp in vps[i:i + 3]]): out[c][k] = v
                print("recorded", c, flush=True)
            await b.close()
    json.dump(out, open(a.out, "w"))
asyncio.run(main())
