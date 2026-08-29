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

import json, re, unicodedata

items=[i for i in json.load(open('gn_items.json'))]
seen=set(); uniq=[]
for i in items:
    if i['code'] in seen: continue
    seen.add(i['code']); uniq.append(i)

# CJK compatibility/radical forms -> normal Han
VARIANT={'⿍':'鼎','⼦':'子','⽔':'水','⽜':'牛'}
def fixzh(s):
    for a,b in VARIANT.items(): s=s.replace(a,b)
    s=re.sub(r'[A-Za-z]+','',s) if s.startswith('huhu') is False and re.search(r'BARBECUE',s) else s
    return s.strip()

# French artefacts the PDF's missing spaces left behind
FRFIX={
 'Bœufau cumin':'Bœuf au cumin','TofuMapo':'Tofu Mapo',
 'Pommesde terre en tranches à la marmite sèche':'Pommes de terre en tranches à la marmite sèche',
 'Crevettes en laments croustillants dorés':'Crevettes en filaments croustillants dorés',
 'Filet de Pouletàla sauce aigre-douce':'Filet de poulet à la sauce aigre-douce',
 'boeuf sauté aux piments du Sichuan':'Bœuf sauté aux piments du Sichuan',
 'Salade de crevettes fraîches à la mangue':'Poulet épicé Longding',   # J1 only; see below
}
CAT_BY_PREFIX={'R':'fusion','L':'cold','J':'chicken','N':'beef','Y':'lamb','H':'seafood',
               'D':'hotpot','X':'street','T':'soup','K':'bbq','M':'noodles','F':'rice','P':'drinks'}
def category(code):
    p=code[0]; n=int(code[1:])
    if p=='S': return 'drypot' if n>=9 else 'veg'
    return CAT_BY_PREFIX[p]

for i in uniq:
    i['zh']=fixzh(i['zh'])
    i['cat']=category(i['code'])
    if i['code']=='K1': i['zh']='龙鼎牛肉串烧'          # section header bled into the name
    if i['code']=='J1':
        i['fr']='Poulet épicé Longding'                 # printed menu shows R10's caption here
        i['frSource']='corrected'
    elif i['fr'] in FRFIX:
        i['fr']=FRFIX[i['fr']]
    if i['code']=='X6' and not i['price']: i['price']=150000   # printed without the GNF label
json.dump(uniq, open('gn_final.json','w'), ensure_ascii=False, indent=1)

from collections import Counter
print('items:',len(uniq))
print('categories:',dict(Counter(i['cat'] for i in uniq)))
print('no price:',[i['code'] for i in uniq if not i['price']] or 'none')
print('price range:',min(i['price'] for i in uniq),'-',max(i['price'] for i in uniq))
print('outliers >400000:',[(i['code'],i['price']) for i in uniq if i['price']>400000])
