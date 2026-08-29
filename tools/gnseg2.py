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

import json, re, math, functools
from wordfreq import word_frequency, top_n_list

items = json.load(open('gn_items.json'))

# Candidate words: the French frequency list, plus every token the document
# itself already prints with spaces, plus culinary terms wordfreq ranks low.
WORDS = set(w for w in top_n_list('fr', 200000) if len(w) > 1)
# Only document tokens French actually recognises — otherwise the joined runs
# themselves enter the vocabulary and each one matches as a single "word".
WORDS |= {w for w in json.load(open('gn_vocab.json')) if word_frequency(w, 'fr') > 0}
WORDS |= set("""bao baos longding sichuan cantonais cantonaise wok dim sum yum tom nems
wasabi teriyaki tofu edamame shiitake udon soba mochi litchi wonton siu
œil côte entrecôte potiron poêlée poêlées poêlé poêlés érable
croustillant croustillante croustillants croustillantes""".split())
WORDS |= {'a','à','y','l','d','s','n','c','j','m','t','cent'}
# Elisions arrive as their own token once the apostrophe is reached.
WORDS |= {"l'", "d'", "l’", "d’"}
MAXW = 22

def logp(w):
    f = word_frequency(w, 'fr')
    if f > 0:
        return math.log(f) + (2.5 if len(w) >= 4 else 0)   # prefer real, longer words
    if w in WORDS:
        return math.log(1e-7) + (2.5 if len(w) >= 4 else 0)
    return None

@functools.lru_cache(maxsize=None)
def segment(run):
    n = len(run)
    best = [None]*(n+1); best[0] = (0.0, [])
    for i in range(1, n+1):
        for j in range(max(0, i-MAXW), i):
            if best[j] is None: continue
            w = run[j:i]
            lp = logp(w)
            if lp is None: continue
            score = best[j][0] + lp - 4.0        # per-word penalty: fewer, longer words
            if best[i] is None or score > best[i][0]:
                best[i] = (score, best[j][1] + [w])
    return best[n][1] if best[n] else None

def restore(text):
    out = []
    # split on punctuation too — a comma or bracket inside a run would
    # otherwise stop the whole token from being segmented
    for tok in re.split(r'([\s,;:!?“”"()]+)', text):
        core = tok.strip('.,;:!?“”"()')
        if not core or len(core) < 10 or not re.fullmatch(r"[A-Za-zÀ-ÿŒœ’'-]+", core):
            out.append(tok); continue
        seg = segment(core.lower())
        if seg and len(seg) > 1:
            rebuilt, pos = [], 0
            for w in seg:
                rebuilt.append(core[pos:pos+len(w)]); pos += len(w)
            out.append(tok.replace(core, ' '.join(rebuilt)))
        else:
            out.append(tok)
    text = re.sub(r'\s+', ' ', ''.join(out)).strip()
    text = re.sub(r"\s+([’'])", r"\1", text)     # d ’érable -> d’érable
    text = text.replace('decent ans', 'de cent ans')
    # tidy spacing around punctuation the PDF ran together
    text = re.sub(r'([,;:])(?=\S)', r'\1 ', text)
    text = re.sub(r'(?<=[^\s(])([(“])', r' \1', text)
    text = re.sub(r'([)”])(?=[A-Za-zÀ-ÿŒœ])', r'\1 ', text)
    return re.sub(r'\s+', ' ', text).strip()

for i in items:
    i['fr'] = restore(i.get('fr_raw', i['fr']))

json.dump(items, open('gn_items.json','w'), ensure_ascii=False, indent=1)
print('sample output:\n')
for i in items[:16]:
    print(f"  {i['code']:4} {i['price'] or '—':>8} | {i['fr']}")
