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

import pymupdf, re, json

PDFS = ['/root/.claude/uploads/5221780f-7216-5aa9-b8c8-55512953de73/251faec1-____1.pdf.pdf',
        '/root/.claude/uploads/5221780f-7216-5aa9-b8c8-55512953de73/60e7f04b-____2222.pdf']
HAN = re.compile(r'[一-鿿]')

def page_spans(page):
    out=[]
    for b in page.get_text('rawdict')['blocks']:
        if b['type']!=0: continue
        for l in b['lines']:
            for s in l['spans']:
                txt=''.join(c['c'] for c in s['chars'])
                txt=txt.replace('\xa0',' ')
                txt=re.sub(r'\s+',' ',txt).strip()
                if txt:
                    out.append(dict(t=txt,x=s['bbox'][0],y=s['bbox'][1],size=round(s['size'],1)))
    return sorted(out,key=lambda s:(round(s['y']),s['x']))

items=[]
for path in PDFS:
    doc=pymupdf.open(path)
    src=path.split('/')[-1]
    for pi,page in enumerate(doc):
        ss=page_spans(page)
        # cluster into rows by y (tolerance 6px)
        rows=[]
        for s in ss:
            if rows and abs(s['y']-rows[-1][0]['y'])<=6: rows[-1].append(s)
            else: rows.append([s])
        # an item begins on a row containing a single capital letter followed by digits
        cur=None
        for row in rows:
            line=''.join(r['t'] for r in row)
            joined=re.sub(r'\s+','',line)
            m=re.match(r'^([A-Z])(\d{1,2})\.(.*)$', joined)
            if m and row[0]['size']>=14:
                if cur: items.append(cur)
                cur=dict(code=m.group(1)+m.group(2), zh=m.group(3), fr=[], price=None,
                         page=pi+1, src=src, y=round(row[0]['y']))
                continue
            if cur is None: continue
            pm=re.match(r'^([\d ]{4,})GNF$', joined)
            if pm:
                cur['price']=int(pm.group(1).replace(' ',''))
                continue
            if HAN.search(line):
                cur['zh'] += re.sub(r'\s+','',line)
            elif re.search(r'[A-Za-zÀ-ÿŒœ]', line):
                cur['fr'].append(line)
        if cur: items.append(cur)

for it in items: it['fr']=' '.join(it['fr']).strip()
json.dump(items, open('gn_items.json','w'), ensure_ascii=False, indent=1)

print('items parsed:', len(items))
codes=[i['code'] for i in items]
dupes=[c for c in codes if codes.count(c)>1]
print('duplicate codes:', sorted(set(dupes)) or 'none')
print('missing price:', [i['code'] for i in items if not i['price']] or 'none')
print('missing zh:', [i['code'] for i in items if not i['zh']] or 'none')
print('missing fr:', [i['code'] for i in items if not i['fr']] or 'none')
from collections import Counter
print('\nby prefix:', dict(Counter(c[0] for c in codes)))
print('price range:', min(i['price'] for i in items if i['price']), '-', max(i['price'] for i in items if i['price']), 'GNF')
