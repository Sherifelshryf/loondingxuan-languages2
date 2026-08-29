#!/usr/bin/env python3
"""Part of the Guinea menu transcription pipeline (run in order):

  gnextract.py  dump positioned text from the two Conakry menu PDFs
  gnparse.py    pair code / Chinese name / French / price by vertical band
  gnseg2.py     restore French word spacing the PDF dropped, by probabilistic
                segmentation against a French frequency list (wordfreq)
  gnbuild.py    normalise CJK variant forms, assign categories, apply the
                corrections for the printed menu's own errors
  gnjs.py       emit the GN_ITEMS fragment for menu-data.js

Requires: pymupdf, wordfreq. Set MENU_PDF_1 / MENU_PDF_2 to the source files.
The output was checked against the rendered pages before being committed.
"""

import pymupdf, re, json, sys

PDFS = ['/root/.claude/uploads/5221780f-7216-5aa9-b8c8-55512953de73/251faec1-____1.pdf.pdf',
        '/root/.claude/uploads/5221780f-7216-5aa9-b8c8-55512953de73/60e7f04b-____2222.pdf']

def spans(page):
    """Text spans with spacing rebuilt from character x-gaps."""
    out = []
    for b in page.get_text('rawdict')['blocks']:
        if b['type'] != 0: continue
        for l in b['lines']:
            for s in l['spans']:
                chars = s['chars']
                if not chars: continue
                txt, prev = '', None
                for c in chars:
                    if prev is not None:
                        gap = c['bbox'][0] - prev['bbox'][2]
                        if gap > s['size'] * 0.14 and not txt.endswith(' ') and c['c'] != ' ':
                            txt += ' '
                    txt += c['c']; prev = c
                txt = re.sub(r'\s+', ' ', txt).strip()
                if txt:
                    out.append({'t': txt, 'x': round(s['bbox'][0]), 'y': round(s['bbox'][1]), 'size': round(s['size'],1)})
    return sorted(out, key=lambda s: (s['y'], s['x']))

CODE = re.compile(r'^([A-Z])\s*(\d+)\s*\.?\s*(.*)$')
PRICE = re.compile(r'^([\d\s]{4,})\s*GNF$')
HAN = re.compile(r'[一-鿿]')

for path in PDFS:
    d = pymupdf.open(path)
    print('#'*70); print('#', path.split('/')[-1], len(d), 'pages'); print('#'*70)
    for pi, page in enumerate(d):
        ss = spans(page)
        if not ss: continue
        print(f'\n--- page {pi+1} ---')
        for s in ss:
            print(f"  y={s['y']:4d} x={s['x']:3d} sz={s['size']:>4} | {s['t']}")
