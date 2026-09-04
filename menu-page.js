/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   Loongdingxuan — catalogue behaviour                             ║
 * ║   Shared by menu.html, menu_ar.html and menu_zh.html.             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * The branch and language are resolved by country.js before anything is
 * drawn. Everything rendered here — dish names, categories, tags, cart
 * labels, toasts — comes from that one language, and every price from that
 * one branch's currency, so an edition never mixes either.
 *
 * A branch whose menu has not been supplied shows its phone numbers instead
 * of an empty catalogue.
 *
 * Requires countries.js, i18n.js, country.js and menu-data.js.
 */

let T, MENU, BRANCH;   // set once the branch and language are resolved

let cart = {};
let currentCat = 'all';

try {
    const saved = sessionStorage.getItem('bs_cart');
    if (saved) cart = JSON.parse(saved) || {};
} catch (e) {}

// ─── STATIC CHROME ────────────────────────────────────────────────────────
// Filled from the language block so the markup carries no language of its own.
function paintChrome() {
    document.title = withBrand(T.docTitle, BRANCH, LANG);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', T.metaDesc);
    document.documentElement.lang = LANG;
    document.documentElement.dir = I18N[LANG].dir;
    if (I18N[LANG].dir === 'rtl') document.body.classList.add('rtl');

    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    set('nav-home', T.navHome);
    set('nav-dinein', T.navDineIn);
    set('nav-order', T.navOrder);
    set('nav-track', T.navTrack);
    set('hero-eyebrow', T.heroEyebrow);
    set('hero-title-a', T.heroTitleA);
    set('hero-title-b', T.heroTitleB);
    // A branch that cannot take orders online must not invite you to a cart.
    set('hero-lead', BRANCH.online ? T.heroLead : T.noMenuLead);
    set('halal-text', T.halal);
    set('checkout-label', T.checkout);

    const home = LANG === 'en' ? 'index.html' : 'index_' + LANG + '.html';
    const link = (id, href) => { const el = document.getElementById(id); if (el) el.setAttribute('href', href); };
    link('nav-logo-link', home);
    link('nav-home', home);
    link('nav-dinein', home + '#menu');

    // The switcher offers only the languages this branch serves, and stays
    // inside the catalogue instead of jumping home — so "the menu in Arabic"
    // is a place you can actually be.
    const bar = document.getElementById('lang-bar');
    if (bar) {
        bar.innerHTML = BRANCH.languages.map(l =>
            `<button class="lang-btn${l === LANG ? ' active' : ''}" onclick="setLang('${l}');location.href='${pageFor('menu', l)}'">${I18N[l].langName}</button>`
        ).join('');
        mountCountrySwitcher(bar, BRANCH, LANG);
    }
}

/** Prices always come from the branch, never from the language. */
function money(n) { return formatMoney(BRANCH, LANG, n); }

/** Phone numbers, for a branch that cannot take the order online. */
function phonePanel() {
    const phones = BRANCH.phones || {};
    const numbers = [];
    if (phones.order) numbers.push(phones.order);
    if (phones.reservation && phones.reservation !== phones.order) numbers.push(phones.reservation);
    return '<div class="ldx-offline">' +
             '<h3>' + T.noMenuTitle + '</h3>' +
             '<p>' + T.noMenuLead + '</p>' +
             '<div class="ldx-offline-phones">' +
               numbers.map(function (p) {
                   return '<a href="tel:' + p.replace(/[^+\d]/g, '') + '"><i class="fas fa-phone"></i> ' + p + '</a>';
               }).join('') +
             '</div>' +
           '</div>';
}

/** No menu at all: nothing to show but the phone numbers. */
function renderNoMenu() {
    document.getElementById('menu-tabs').innerHTML = '';
    document.getElementById('cart-float').style.display = 'none';
    document.getElementById('menu-cats').innerHTML = phonePanel();
}

// ─── BUILD MENU ───────────────────────────────────────────────────────────
function buildMenu() {
    const tabsEl = document.getElementById('menu-tabs');
    const catsEl = document.getElementById('menu-cats');

    tabsEl.innerHTML = `<button class="menu-tab active" onclick="switchTab('all', this)">🍽️ ${T.all}</button>`
        + MENU.categories.map(c =>
            `<button class="menu-tab" onclick="switchTab('${c.id}', this)">${c.emoji} ${menuCategoryName(c, LANG)}</button>`
        ).join('');

    const allGrid = document.createElement('div');
    allGrid.className = 'menu-cat active';
    allGrid.id = 'cat-all';
    catsEl.appendChild(allGrid);

    MENU.categories.forEach(c => {
        const grid = document.createElement('div');
        grid.className = 'menu-cat';
        grid.id = `cat-${c.id}`;
        catsEl.appendChild(grid);
    });

    renderCat('all');
    MENU.categories.forEach(c => renderCat(c.id));
}

function renderCat(catId) {
    const el = document.getElementById(`cat-${catId}`);
    if (!el) return;
    el.innerHTML = menuItemsIn(MENU, catId).map(item => buildCardHTML(item)).join('');
}

function actionsHTML(item, qty) {
    if (qty > 0) {
        return `<div class="qty-ctrl">
             <button class="qty-btn" onclick="changeQty('${item.id}', -1)"><i class="fas fa-minus" style="font-size:0.6rem;"></i></button>
             <span class="qty-count" id="qc-${item.id}">${qty}</span>
             <button class="qty-btn" onclick="changeQty('${item.id}', 1)"><i class="fas fa-plus" style="font-size:0.6rem;"></i></button>
           </div>`;
    }
    return `<button class="add-btn" onclick="addItem('${item.id}')" title="${T.addToCart}"><i class="fas fa-plus"></i></button>`;
}

function buildCardHTML(item) {
    const qty = cart[item.id] || 0;
    const note = menuItemNote(item, LANG);
    const name = menuItemName(item, LANG);
    const tags = (item.veg ? `<span class="tag veg">${T.vegTag}</span>` : '')
               + (item.spicy ? `<span class="tag spicy">${T.spicyTag}</span>` : '');
    const img = menuItemImage(BRANCH.menuId, item);
    const imgHTML = img
        ? `<img src="${img}" alt="${name}" loading="lazy" decoding="async"
                onerror="this.parentElement.innerHTML='<div class=&quot;menu-img-placeholder&quot;>${item.emoji}</div>'">`
        : `<div class="menu-img-placeholder">${item.emoji}</div>`;
    return `
        <div class="menu-card ${qty > 0 ? 'in-cart' : ''}" id="mc-${item.id}">
            <div class="menu-img-wrap">${imgHTML}</div>
            <div class="card-info">
                <div class="card-code">${item.id}</div>
                <div class="card-name">${name}</div>
                ${note ? `<div class="card-desc">${note}</div>` : ''}
                <div class="card-price">${money(item.price)}${tags}</div>
            </div>
            <div class="card-actions" id="ca-${item.id}">${actionsHTML(item, qty)}</div>
        </div>`;
}

function switchTab(catId, btn) {
    currentCat = catId;
    document.querySelectorAll('.menu-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.menu-cat').forEach(c => c.classList.remove('active'));
    const target = document.getElementById(`cat-${catId}`);
    if (target) target.classList.add('active');
}

// ─── CART ─────────────────────────────────────────────────────────────────
function addItem(id) {
    cart[id] = (cart[id] || 0) + 1;
    refreshCard(id);
    saveCart();
    updateCartBar();
    const item = findMenuItem(MENU, id);
    if (item) showToast(T.addedToCart(menuItemName(item, LANG)));
}

function changeQty(id, delta) {
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    refreshCard(id);
    saveCart();
    updateCartBar();
}

function refreshCard(id) {
    const item = findMenuItem(MENU, id);
    if (!item) return;
    const qty = cart[id] || 0;

    // Every item is rendered twice — once under "All", once under its category.
    document.querySelectorAll(`#mc-${id}`).forEach(card => {
        card.classList.toggle('in-cart', qty > 0);
    });
    document.querySelectorAll(`#ca-${id}`).forEach(ca => {
        ca.innerHTML = actionsHTML(item, qty);
    });
}

function saveCart() {
    try { sessionStorage.setItem('bs_cart', JSON.stringify(cart)); } catch (e) {}
}

function getSubtotal() {
    return MENU.items.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);
}

function getTotalItems() {
    return Object.values(cart).reduce((s, v) => s + v, 0);
}

function updateCartBar() {
    const count = getTotalItems();
    document.getElementById('cf-count').textContent = T.itemsInCart(count);
    document.getElementById('cf-badge').textContent = count;
    document.getElementById('cf-total').textContent = money(getSubtotal());
    document.getElementById('cart-float').classList.toggle('visible', count > 0);
}

function proceedToCheckout() {
    if (getTotalItems() === 0) {
        showToast(T.cartEmpty);
        return;
    }
    saveCart();
    window.location.href = 'order.html';
}

// ─── TOAST ────────────────────────────────────────────────────────────────
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast success show';
    setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── NAV ──────────────────────────────────────────────────────────────────
function toggleNav() {
    document.getElementById('navLinks').classList.toggle('active');
}

window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('topBtn').classList.toggle('visible', window.scrollY > 400);
});

// ─── INIT ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    resolveSite(function (branch, lang) {
        BRANCH = branch;
        T = I18N[lang].menu;
        MENU = menuFor(branch);
        paintChrome();
        if (!MENU) { renderNoMenu(); return; }
        buildMenu();
        if (branch.online) {
            updateCartBar();
        } else {
            // The menu is real, but this branch cannot price a delivery yet, so
            // the cart is hidden and the order goes by phone.
            document.getElementById('cart-float').style.display = 'none';
            document.getElementById('menu-cats')
                .insertAdjacentHTML('beforebegin', phonePanel());
            document.querySelectorAll('.add-btn').forEach(function (b) { b.style.display = 'none'; });
        }
    });
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 600);
    }
});
