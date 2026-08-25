#!/usr/bin/env python3
"""
Extract dish photography from the restaurant's printed menu PDF.

The supplied PDF has no separate image objects: each page is a single flattened
2929x2566 JPEG of a two-page spread, so every plate has to be located inside a
page bitmap and cut out.

How it works
  1. Candidate regions come from blobs.json / extra.json / targeted.json, which
     record where each dish photograph sits on its page. Those coordinates were
     produced by thresholding bright, saturated areas against the menu's dark
     grounds and then CHECKED BY EYE against the labelled page - the mapping in
     MAP below is verified, not inferred.
  2. tighten() removes caption text that sits inside a region. Component
     analysis cannot do this on its own, because the dark rose and wood
     backgrounds are saturated enough to connect plate and caption into one
     blob. Scale separates them: a large morphological opening erases type a
     few pixels wide and leaves a plate hundreds of pixels across intact.
  3. TRIM handles the ten dishes whose captions sit flush against the plate,
     where no automatic rule works without eating into the food. Those values
     were measured off the rendered crops.
  4. Output is WebP, capped at 640px on the long edge and never upscaled past
     the source, with a mild unsharp mask to recover resampling softness.

Requires: pymupdf, pillow, numpy, scipy
Usage:    python3 tools/extract-dish-images.py
Writes:   images/dishes/<MENU CODE>.webp

The owner has confirmed no higher-resolution originals exist, so this PDF is
the final source for dish photography.
"""

import os
import pymupdf, io, json, os
from PIL import Image, ImageFilter
SRC=os.environ.get('MENU_PDF', 'menu.pdf')   # path to the printed-menu PDF
OUT=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'images', 'dishes')
doc=pymupdf.open(SRC)
HERE=os.path.dirname(os.path.abspath(__file__))
blobs=json.load(open(os.path.join(HERE,'blobs.json')))
targ=json.load(open(os.path.join(HERE,'targeted.json')))
extra=json.load(open(os.path.join(HERE,'extra.json')))
cache={}
def page_image(i):
    if i not in cache:
        xref=doc[i].get_images(full=True)[0][0]
        cache[i]=Image.open(io.BytesIO(doc.extract_image(xref)['image'])).convert('RGB')
    return cache[i]

# dish code -> source region. b<n>=first pass, t:<name>=targeted, e<n>=second pass
MAP={
 'L1':'b1','L2':'b2','L3':'b3','L4':'b4','L5':'b6','L6':'e0','L7':'b5','L8':'b7',
 'J1':'b8','J2':'b11','J3':'b13','J4':'b9','J5':'b10','J6':'b12',
 'N1':'b14','N2':'b16','N3':'b15','N4':'b18',
 'Y1':'b20','Y2':'b23',
 'H1':'b19','H2':'b21','H3':'b24','H4':'t:H4','H5':'b26','H6':'b28','H7':'b29',
 'D1':'b31','D2':'b33',
 'S1':'b30','S2':'b32','S3':'b35','S4':'b37','S5':'b34','S6':'b38','S7':'b36',
 'T1':'b39','T2':'b42','T3':'b40','T4':'b41',
 'K1':'b43','K2':'b45','K3':'t:K3','K4':'b44','K5':'b46','K6':'b47',
 'X1':'b49','X2':'b50','X3':'b52','X4':'b51','X5':'b48','X6':'b55','X7':'b55',
 'M1':'t:M1','M2':'t:M2','M3':'t:M3','M4':'b57','M5':'b59','M6':'b61','M7':'b56',
 'M8':'b58','M9':'b60','M10':'b62','M11':'b63','M12':'b65','M13':'b67','M14':'b71',
 'F1':'b64','F2':'b66','F3':'b68','F4':'b69','F5':'b72','F6':'b75','F7':'b77',
 'F8':'b73','F9':'b74','F10':'b76',
 'P4':'t:P4','P6':'t:P6','P11':'t:P11',
}
def region(ref):
    if ref.startswith('t:'): return targ[ref[2:]]
    if ref.startswith('e'):  return extra[int(ref[1:])]
    return blobs[int(ref[1:])]


import numpy as np
from scipy import ndimage

def tighten(r):
    """Trim menu caption text from the edges of a detected dish region.

    Component analysis alone fails here: the menu's dark rose and wood grounds
    are saturated enough to connect plate and caption into one blob. Scale is
    what separates them. Caption strokes are only a few pixels wide, so a large
    morphological opening erases the type entirely while a plate hundreds of
    pixels across survives untouched. What is left is the food, and its bounding
    box is the crop.
    """
    im = page_image(r['page']-1)
    sub = np.asarray(im.crop((r['x'], r['y'], r['x']+r['w'], r['y']+r['h']))).astype(np.float32)
    lum = sub.mean(2)
    H, W = lum.shape
    k = max(9, int(min(H, W) * 0.035)) | 1        # opening kernel scales with the dish
    solid = ndimage.binary_opening(lum > 112, np.ones((k, k)))
    lab, n = ndimage.label(solid)
    if n == 0:
        return r
    areas = ndimage.sum(solid, lab, range(1, n+1))
    boxes = ndimage.find_objects(lab)
    big = max(areas)
    keep = [i+1 for i, a_ in enumerate(areas) if a_ >= 0.15*big]
    y0 = min(boxes[i-1][0].start for i in keep); y1 = max(boxes[i-1][0].stop for i in keep)
    x0 = min(boxes[i-1][1].start for i in keep); x1 = max(boxes[i-1][1].stop for i in keep)
    if (y1-y0) < 0.25*H or (x1-x0) < 0.25*W:
        return r
    return dict(page=r['page'], x=r['x']+x0, y=r['y']+y0, w=x1-x0, h=y1-y0)


def region(ref):
    if ref.startswith('t:'): return targ[ref[2:]]
    if ref.startswith('e'):  return extra[int(ref[1:])]
    return blobs[int(ref[1:])]


import numpy as np
from scipy import ndimage

def tighten(r):
    """Trim menu caption text from the edges of a detected dish region.

    Component analysis alone fails here: the menu's dark rose and wood grounds
    are saturated enough to connect plate and caption into one blob. Scale is
    what separates them. Caption strokes are only a few pixels wide, so a large
    morphological opening erases the type entirely while a plate hundreds of
    pixels across survives untouched. What is left is the food, and its bounding
    box is the crop.
    """
    im = page_image(r['page']-1)
    sub = np.asarray(im.crop((r['x'], r['y'], r['x']+r['w'], r['y']+r['h']))).astype(np.float32)
    lum = sub.mean(2)
    H, W = lum.shape
    k = max(9, int(min(H, W) * 0.035)) | 1        # opening kernel scales with the dish
    solid = ndimage.binary_opening(lum > 112, np.ones((k, k)))
    lab, n = ndimage.label(solid)
    if n == 0:
        return r
    areas = ndimage.sum(solid, lab, range(1, n+1))
    boxes = ndimage.find_objects(lab)
    big = max(areas)
    keep = [i+1 for i, a_ in enumerate(areas) if a_ >= 0.15*big]
    y0 = min(boxes[i-1][0].start for i in keep); y1 = max(boxes[i-1][0].stop for i in keep)
    x0 = min(boxes[i-1][1].start for i in keep); x1 = max(boxes[i-1][1].stop for i in keep)
    if (y1-y0) < 0.25*H or (x1-x0) < 0.25*W:
        return r
    return dict(page=r['page'], x=r['x']+x0, y=r['y']+y0, w=x1-x0, h=y1-y0)


# A handful of captions sit flush against the plate, close enough that no
# automatic rule separates them without eating into the dish. These were
# measured off the rendered crops and applied by hand. Fractions of the
# region, per edge.
TRIM = {
    'K4':  {'bottom': 0.24},
    'M10': {'bottom': 0.30},
    'T3':  {'bottom': 0.10},
    'S7':  {'right':  0.19},
    'J4':  {'right':  0.15},
    'H2':  {'bottom': 0.17},
    'H6':  {'bottom': 0.26},
    'S4':  {'bottom': 0.15},
    'M1':  {'bottom': 0.08},
    'M3':  {'left': 0.11, 'bottom': 0.11},
}

def apply_trim(r, code):
    t = TRIM.get(code)
    if not t: return r
    r = dict(r)
    dt, db = int(t.get('top',0)*r['h']), int(t.get('bottom',0)*r['h'])
    dl, dr = int(t.get('left',0)*r['w']), int(t.get('right',0)*r['w'])
    r['x'] += dl; r['y'] += dt
    r['w'] -= dl + dr; r['h'] -= dt + db
    return r

os.makedirs(OUT, exist_ok=True)
SIZE=640   # cap on the long edge; never upscaled past the PDF source
manifest={}
for code,ref in MAP.items():
    r=apply_trim(tighten(region(ref)), code); im=page_image(r['page']-1); W,H=im.size
    # keep the photo's own aspect ratio with a small margin; CSS object-fit:cover
    # then crops to the container, which keeps the food centred and drops any
    # caption text that sits just outside the plate.
    pad=int(0.03*max(r['w'],r['h']))
    x0=max(0,r['x']-pad); y0=max(0,r['y']-pad)
    x1=min(W,r['x']+r['w']+pad); y1=min(H,r['y']+r['h']+pad)
    crop=im.crop((x0,y0,x1,y1))
    cw,ch=crop.size; sc=SIZE/max(cw,ch)
    if sc<1:
        crop=crop.resize((max(1,int(cw*sc)),max(1,int(ch*sc))), Image.LANCZOS)
        # mild unsharp to recover the crispness lost resampling a JPEG-in-PDF
        crop=crop.filter(ImageFilter.UnsharpMask(radius=1.0, percent=48, threshold=3))
    crop.save(f'{OUT}/{code}.webp','WEBP',quality=80,method=6)
    manifest[code]=os.path.getsize(f'{OUT}/{code}.webp')
tot=sum(manifest.values())
print(f'wrote {len(manifest)} images, total {tot/1024:.0f} KB, avg {tot/len(manifest)/1024:.1f} KB')
print('largest:', sorted(manifest.items(), key=lambda kv:-kv[1])[:5])

