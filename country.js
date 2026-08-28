/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   Loongdingxuan — branch and language resolution                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Decides which branch the visitor is looking at and in which language,
 * then exposes both as `window.BRANCH` and `window.LANG` for the page.
 *
 * Order of precedence for the branch:
 *   1. an explicit choice saved in localStorage — always wins, forever
 *   2. a country lookup by IP on the first visit
 *   3. the "Select Your Country" screen, when the lookup fails or lands
 *      on a country we do not have a branch in
 *
 * Language works the same way, except that marketing and menu pages carry
 * their language in the filename. Landing on one records that choice. If the
 * branch does not serve the language of the page you are on, you are sent to
 * that branch's default-language edition instead.
 *
 * Requires countries.js and i18n.js.
 */

const LDX_COUNTRY_KEY = 'ldx_country';
const LDX_LANG_KEY = 'ldx_lang';
const LDX_REDIRECT_GUARD = 'ldx_redirected';

/* ─── storage (never throws; private browsing can refuse) ───────────── */
function ldxGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}
function ldxSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
}

function savedCountry() {
    const c = ldxGet(LDX_COUNTRY_KEY);
    return c && COUNTRIES[c] ? c : null;
}
function savedLang() {
    const l = ldxGet(LDX_LANG_KEY);
    return l && I18N[l] ? l : null;
}

/** Persist an explicit choice. Used by the picker and the header switcher. */
function setCountry(code) {
    if (!COUNTRIES[code]) return;
    ldxSet(LDX_COUNTRY_KEY, code);
}
function setLang(lang) {
    if (I18N[lang]) ldxSet(LDX_LANG_KEY, lang);
}

/* ─── IP lookup ────────────────────────────────────────────────────────
   Two free endpoints, tried in order, each with a short timeout so a slow
   or blocked lookup never holds up the page. Anything unexpected falls
   through to the picker rather than guessing.                          */
function lookupCountryByIP(timeoutMs) {
    const endpoints = [
        { url: 'https://api.country.is/', pick: d => d && d.country },
        { url: 'https://ipapi.co/json/', pick: d => d && d.country_code },
    ];

    function attempt(i) {
        if (i >= endpoints.length) return Promise.resolve(null);
        const ep = endpoints[i];
        const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = setTimeout(() => { if (ctrl) ctrl.abort(); }, timeoutMs);
        return fetch(ep.url, ctrl ? { signal: ctrl.signal } : undefined)
            .then(r => (r.ok ? r.json() : null))
            .then(d => {
                clearTimeout(timer);
                const code = ep.pick(d);
                return code ? String(code).toLowerCase() : attempt(i + 1);
            })
            .catch(() => { clearTimeout(timer); return attempt(i + 1); });
    }
    return attempt(0);
}

/* ─── the page's own language, from its filename ───────────────────── */
function pageLang() {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const m = file.match(/_(ar|zh|fr)\.html$/);
    if (m) return m[1];
    if (/^(index|menu)(\.html)?$/.test(file) || file === '') return 'en';
    return null;   // order/receipt/track carry no language in the filename
}

/** The file for a page family in a given language. */
function pageFor(family, lang) {
    return lang === 'en' ? family + '.html' : family + '_' + lang + '.html';
}

function currentFamily() {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (file.indexOf('menu') === 0) return 'menu';
    if (file.indexOf('index') === 0 || file === '') return 'index';
    return null;
}

/* ─── country picker ───────────────────────────────────────────────── */
function renderCountryPicker(lang, onPick) {
    const T = t(lang).picker;
    const overlay = document.createElement('div');
    overlay.className = 'ldx-picker';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
        '<div class="ldx-picker-card">' +
          '<img src="images/logo.png" alt="" class="ldx-picker-logo">' +
          '<h2>' + T.title + '</h2>' +
          '<p>' + T.lead + '</p>' +
          '<div class="ldx-picker-list">' +
            COUNTRY_ORDER.map(function (code) {
                const c = COUNTRIES[code];
                const sub = (c.city[lang] || c.city.en) + (c.online ? '' : ' · ' + T.comingSoon);
                return '<button class="ldx-country" data-code="' + code + '">' +
                         '<span class="ldx-flag">' + c.flag + '</span>' +
                         '<span class="ldx-country-text">' +
                           '<span class="ldx-country-name">' + (c.name[lang] || c.name.en) + '</span>' +
                           '<span class="ldx-country-sub">' + sub + '</span>' +
                         '</span>' +
                       '</button>';
            }).join('') +
          '</div>' +
        '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.querySelectorAll('.ldx-country').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const code = btn.getAttribute('data-code');
            setCountry(code);
            document.body.style.overflow = '';
            overlay.remove();
            onPick(code);
        });
    });
}

/** Header chip: shows the active branch, reopens the picker on click. */
function mountCountrySwitcher(container, branch, lang) {
    if (!container) return;
    const btn = document.createElement('button');
    btn.className = 'ldx-switcher';
    btn.title = t(lang).picker.change;
    btn.innerHTML = '<span class="ldx-flag">' + branch.flag + '</span>' +
                    '<span class="ldx-switcher-name">' + (branch.name[lang] || branch.name.en) + '</span>';
    btn.addEventListener('click', function () {
        renderCountryPicker(lang, function (code) {
            const c = COUNTRIES[code];
            // Land on a language the newly chosen branch actually serves.
            const target = countrySpeaks(c, LANG) ? LANG : c.defaultLang;
            const family = currentFamily();
            location.href = family ? pageFor(family, target) : 'index.html';
        });
    });
    container.appendChild(btn);
}

/* ─── resolution ───────────────────────────────────────────────────── */

/**
 * Resolve branch + language, then hand them to the page.
 * `ready(branch, lang)` is called exactly once.
 */
function resolveSite(ready) {
    const filesLang = pageLang();
    if (filesLang) setLang(filesLang);

    function finish(code) {
        const branch = COUNTRIES[code];
        let lang = filesLang || savedLang() || branch.defaultLang;

        // A branch only shows languages it serves.
        if (!countrySpeaks(branch, lang)) {
            const fallback = branch.defaultLang;
            const family = currentFamily();
            if (family && filesLang && !sessionStorage.getItem(LDX_REDIRECT_GUARD)) {
                try { sessionStorage.setItem(LDX_REDIRECT_GUARD, '1'); } catch (e) {}
                location.replace(pageFor(family, fallback));
                return;
            }
            lang = fallback;
        }

        window.BRANCH = branch;
        window.LANG = lang;
        ready(branch, lang);
    }

    const saved = savedCountry();
    if (saved) { finish(saved); return; }

    // First visit: try IP, then ask.
    const guessLang = filesLang || savedLang() || 'en';
    lookupCountryByIP(2500).then(function (code) {
        if (code && COUNTRIES[code]) { setCountry(code); finish(code); return; }
        renderCountryPicker(guessLang, function (picked) { finish(picked); });
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { resolveSite, setCountry, setLang, savedCountry, savedLang, pageLang, pageFor, currentFamily };
}
