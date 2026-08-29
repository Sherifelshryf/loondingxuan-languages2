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

import json, re, subprocess

items=json.load(open('gn_final.json'))
eg=json.loads(subprocess.run(['node','-e',
  "const{MENUS}=require('/home/user/loondingxuan-languages2/menu-data.js');console.log(JSON.stringify(MENUS.eg.items))"],
  capture_output=True,text=True).stdout)
egzh={i['zh']:i for i in eg}

# English for dishes that do not appear on the Egyptian menu. Translated from the
# Chinese name and the restaurant's own French, not invented.
EN={
 'R1':'Charcoal-Grilled Ribeye with Pineapple','R4':'Avocado Salad','R8':'Full Ribeye Steak Menu',
 'R9':'Longding Sausage Platter','R10':'Fresh Shrimp and Mango Salad','R11':'Longding Signature Beef Salad',
 'R12':'Pan-Fried Chicken Thigh and Roast Pumpkin Salad',
 'L6':'Three-Shred Cold Salad','L7':'Cold Yuba Salad','L8':'Cold Fern-Root Noodle Salad',
 'L9':'Refreshing Cold Starters','L10':'Fried Peanuts','L11':'Cold Golden Bamboo Shoot Salad',
 'J1':'Longding Spicy Chicken','J2':'Kung Pao Chicken','J6':'Braised Chicken with Potato',
 'J7':'Sichuan Pepper Chicken Wingettes','J8':'Cola Chicken Wings','J9':'Yu Xiang Shredded Chicken',
 'N3':'Twice-Cooked Beef, Sichuan Style','N4':'Beef Stewed in Sour Broth','N5':'Cumin Beef',
 'N6':'Sichuan Chilli Stir-Fried Beef',
 'Y1':'Traditional Boiled Lamb','Y3':'Lamb Stir-Fried with Spring Onion','Y4':'Whole Roast Lamb Shank',
 'Y5':'Grilled Lamb Chops',
 'H7':'Black Pepper Mud Crab','H8':'Shrimp Stir-Fried in Doubanjiang','H9':'Golden Crispy Shredded Prawns',
 'H10':'Teppanyaki Cuttlefish','H11':'Shrimp Stir-Fried with Mangetout','H12':'Crispy Pineapple Prawns',
 'D1':'Spicy Steak Beef Mini Hot Pot',
 'S1':'Cantonese Choy Sum','S2':'Cabbage Stir-Fried with Garlic and Chilli','S5':'Mapo Tofu',
 'S6':'Organic Spinach Stir-Fried with Ginger','S7':'Aubergine in Signature Sauce',
 'S8':'Braised Aubergine in Soy Sauce','S11':'Dry Pot Potato Slices',
 'X8':'Longdingxuan Large Steamed Beef Bao','X9':'Longding Crispy Fried Chicken Wings',
 'K1':'Longding Beef Skewers','K7':'Longding Grilled King Prawns',
 'M10':'Stir-Fried Noodle Flakes','M12':'Noodles with Braised Aubergine',
 'M13':'Mixed Noodles with Minced Meat','M14':'Mixed Noodles with Crispy Stir-Fried Beef',
 'F11':'Curry Rice with Omelette and Green Sichuan Pepper Chicken',
 'P1':'Lemon Water','P4':'Watermelon Iced Tea','P10':'Orange Americano',
}
VEG={'L1','L6','L7','L8','L9','L10','L11','R4','R7','S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11',
     'X2','X5','X7','M5','F2','K4','K5','K6','P1','P2','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12','P13'}
SPICY={'J1','J2','J7','L2','L3','L4','N3','N6','S2','S5','H3','D1','D2','M8','F11','J5'}
EMOJI={'fusion':'✨','cold':'🥗','chicken':'🍗','beef':'🥩','lamb':'🍖','seafood':'🦐','hotpot':'🍲',
       'veg':'🥬','drypot':'🍳','street':'🥟','soup':'🍜','bbq':'🍢','noodles':'🍝','rice':'🍚','drinks':'🥤'}

def esc(s): return s.replace('\\','\\\\').replace("'","\\'")

lines=[]
order=['fusion','cold','chicken','beef','lamb','seafood','hotpot','veg','drypot','street','soup','bbq','noodles','rice','drinks']
byc={c:[] for c in order}
for i in items: byc[i['cat']].append(i)
for c in order:
    lines.append(f"\n    // ─── {c.upper()} ───")
    for i in sorted(byc[c], key=lambda x:(x['code'][0], int(x['code'][1:]))):
        e=egzh.get(i['zh'])
        en=EN.get(i['code']) or (e['en'] if e else None)
        if not en: raise SystemExit('no English for '+i['code']+' '+i['zh'])
        flags=''
        if i['code'] in VEG or (e and e.get('veg')): flags+=' veg:true,'
        if i['code'] in SPICY or (e and e.get('spicy')): flags+=' spicy:true,'
        note = "\n      priceSuspect:true," if i['code']=='X7' else ''
        note += "\n      frCorrected:true," if i.get('frSource')=='corrected' else ''
        lines.append(f"    {{ id:'{i['code']}', cat:'{c}', price:{i['price']}, emoji:'{EMOJI[c]}',{flags}{note}\n"
                     f"      en:'{esc(en)}', zh:'{esc(i['zh'])}', fr:'{esc(i['fr'])}' }},")
open('gn_items.jsfrag','w',encoding='utf-8').write('\n'.join(lines))
print('generated', len(items), 'items')
print('English from Egypt menu:', sum(1 for i in items if i['zh'] in egzh and i['code'] not in EN))
print('English translated here:', len([c for c in EN if any(i['code']==c for i in items)]))
