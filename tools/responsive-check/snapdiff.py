"""Compare two recordings from snapshot.py. Exit code 1 if anything differs.
  python tools/responsive-check/snapdiff.py before.json after.json"""
import json, sys
a, b = json.load(open(sys.argv[1])), json.load(open(sys.argv[2])); cells = diff = 0
for c in a:
    if c not in b: continue
    for vp in a[c]:
        for st, x in a[c][vp].items():
            cells += 1; y = b[c].get(vp, {}).get(st)
            if st == "error": print("ERROR", c, vp, x); diff += 1; continue
            if x != y:
                n = sum(1 for i, j in zip(x, y or []) if i != j) + abs(len(x) - len(y or [])); diff += 1
                print("DIFF %s %s %s: %d elements differ" % (c, vp, st, n))
print("compared %d cells, %d differ" % (cells, diff)); sys.exit(1 if diff else 0)
