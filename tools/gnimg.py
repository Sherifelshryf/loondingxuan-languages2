#!/usr/bin/env python3
"""
Pull the dish photographs out of the Guinea menu PDFs.

Unlike the Egyptian menu — flattened page bitmaps, where every plate had to be
detected and cut out — these PDFs carry each photograph as its own embedded
image object, so the picture comes out at full quality. The work is deciding
which dish each one belongs to.

Matching
    Every page prints its dish codes as headings ("K4.  龙鼎蒜蓉茄子"). Two
    layouts are used: photo beside its heading, and photo stacked above or
    below it. So a photo is matched to the heading nearest its vertical span
    rather than the nearest heading above it, and each code takes at most one
    photo, cheapest pairing first, so a page's assignments cannot collide.

    That is right for 105 of the 111 photos. The rest are listed in OVERRIDE
    below: pages where the geometry is genuinely ambiguous and only the dish
    itself settles it. Every assignment in this file was checked by eye against
    the printed code on the rendered page.

Rejected
    Full-bleed page backgrounds, the halal roundel, section line-art and the
    decorative leaf cut-outs. Two backgrounds are real dish photography (H4's
    grilled fish and D2's Tom Yum hotpot fill their whole page) and are cropped
    back to the dish by hand, in CROP.

Not extracted
    X4 and X5 (beef and vegetarian dumplings) share one page whose only
    photographs are two full-bleed dumpling shots, neither tied to one dish or
    the other. Guessing risks putting beef on the vegetarian dish, so both are
    left without a photo. K3 (whole grilled wings), F11, R1, R9, D2's partner
    codes and the P drinks are simply not photographed in the PDFs.

Output: images/dishes-gn/<CODE>.webp, long edge 640px.
"""

import io
import json
import os
import re

import pymupdf
from PIL import Image

PDFS = [
    '/root/.claude/uploads/5221780f-7216-5aa9-b8c8-55512953de73/251faec1-____1.pdf.pdf',
    '/root/.claude/uploads/5221780f-7216-5aa9-b8c8-55512953de73/60e7f04b-____2222.pdf',
]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'images', 'dishes-gn')
SIZE = 640

# code -> (pdf index, xref) or None to drop. Checked by eye against the page.
OVERRIDE = {
    'H4': (0, 1750),   # grilled fish: the page background is the dish
    'D1': (0, 1884),   # steak hotpot, printed below its own heading
    'D2': (0, 1881),   # Tom Yum: also a background, and D1's photo had taken this code
    'X8': (1, 1473),   # the steamed bao, one heading further up than geometry suggests
    'X5': None,        # only full-bleed dumpling shots on that page, not attributable
    'X4': None,
    'K1': (1, 1622),   # beef skewers (with peppers)
    'K2': (1, 1616),   # lamb skewers — geometry pulled this one onto K3
    'K3': None,        # 烤全翅 is not photographed
}

# Fractional (left, top, right, bottom) for the two full-page dish photographs.
CROP = {
    'H4': (0.12, 0.50, 0.95, 1.00),
    'D2': (0.16, 0.66, 0.92, 1.00),
}


def codes_on(page):
    """Dish codes printed on this page, with the y of each heading."""
    rows = {}
    for b in page.get_text('rawdict')['blocks']:
        if b['type'] != 0:
            continue
        for line in b['lines']:
            for s in line['spans']:
                if s['size'] < 14:          # headings only, not captions or prices
                    continue
                t = ''.join(c['c'] for c in s['chars']).strip()
                if t:
                    rows.setdefault(round(s['bbox'][1] / 6) * 6, []).append((s['bbox'][0], t))
    out = []
    for y, parts in rows.items():
        line = re.sub(r'\s+', '', ''.join(t for _, t in sorted(parts)))
        m = re.match(r'^([A-Z])(\d{1,2})\.', line)
        if m:
            out.append((m.group(1) + m.group(2), y))
    return sorted(out, key=lambda c: c[1])


def photos_on(page):
    """Placed images that could be a plate, with the page furniture filtered out."""
    W, H = page.rect.width, page.rect.height
    out = []
    for info in page.get_image_info(xrefs=True):
        x0, y0, x1, y1 = info['bbox']
        w, h = x1 - x0, y1 - y0
        if w <= 0 or h <= 0:
            continue
        if w > 0.92 * W and h > 0.55 * H:
            continue                                    # full-bleed background
        if w < 70 or h < 70:
            continue                                    # halal roundel, icons
        if info['width'] < 180 or info['height'] < 180:
            continue                                    # too small to print well
        out.append(dict(xref=info['xref'], bbox=(x0, y0, x1, y1), area=w * h))
    return out


def gap(cy, y0, y1):
    """Distance from a heading to a photo's vertical span; zero when inside it."""
    if y0 <= cy <= y1:
        return 0.0
    return y0 - cy if cy < y0 else cy - y1


def match():
    found = {}
    for pdfi, path in enumerate(PDFS):
        doc = pymupdf.open(path)
        for page in doc:
            cds, ph = codes_on(page), photos_on(page)
            if not cds or not ph:
                continue
            pairs = sorted(
                (gap(cy, p['bbox'][1], p['bbox'][3]),
                 abs(cy - (p['bbox'][1] + p['bbox'][3]) / 2), pi, ci)
                for ci, (_, cy) in enumerate(cds)
                for pi, p in enumerate(ph)
            )
            usedP, usedC = set(), set()
            for _, _, pi, ci in pairs:
                if pi in usedP or ci in usedC:
                    continue
                usedP.add(pi)
                usedC.add(ci)
                code = cds[ci][0]
                prev = found.get(code)
                if prev is None or ph[pi]['area'] > prev[2]:
                    found[code] = (pdfi, ph[pi]['xref'], ph[pi]['area'])

    for code, ov in OVERRIDE.items():
        if ov is None:
            found.pop(code, None)
        else:
            found[code] = (ov[0], ov[1], 0)
    return found


def main():
    os.makedirs(OUT, exist_ok=True)
    for stale in os.listdir(OUT):
        if stale.endswith('.webp'):
            os.remove(os.path.join(OUT, stale))

    found = match()
    docs = {i: pymupdf.open(p) for i, p in enumerate(PDFS)}
    total = 0
    for code, (pdfi, xref, _) in sorted(found.items()):
        im = Image.open(io.BytesIO(docs[pdfi].extract_image(xref)['image'])).convert('RGB')
        if code in CROP:
            l, t, r, b = CROP[code]
            w, h = im.size
            im = im.crop((int(l * w), int(t * h), int(r * w), int(b * h)))
        w, h = im.size
        sc = SIZE / max(w, h)
        if sc < 1:
            im = im.resize((max(1, int(w * sc)), max(1, int(h * sc))), Image.LANCZOS)
        p = os.path.join(OUT, code + '.webp')
        im.save(p, 'WEBP', quality=80, method=6)
        total += os.path.getsize(p)

    codes = sorted(found)
    print('wrote %d images, %d KB total, avg %.1f KB' % (len(codes), total / 1024, total / len(codes) / 1024))
    print(json.dumps(codes))


if __name__ == '__main__':
    main()
