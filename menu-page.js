/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   Loongdingxuan — catalogue behaviour                             ║
 * ║   Shared by menu.html, menu_ar.html and menu_zh.html.             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Each page sets `window.LANG` to 'en', 'ar' or 'zh' before loading this
 * file. Everything rendered here — dish names, categories, tags, prices,
 * cart labels, toasts — is read from that one language, so an edition
 * never shows text from another language.
 *
 * Requires menu-data.js (MENU, MENU_CATEGORIES, MENU_UI, helpers).
 */

const LANG = window.LANG || 'en';
const T = MENU_UI[LANG];

let cart = {};
let currentCat = 'all';

try {
    const saved = sessionStorage.getItem('bs_cart');
    if (saved) cart = JSON.parse(saved) || {};
} catch (e) {}

// ─── STATIC CHROME ────────────────────────────────────────────────────────
// Filled from MENU_UI so the markup carries no language of its own.
function paintChrome() {
    document.title = T.docTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', T.metaDesc);
    document.documentElement.lang = LANG;
    document.documentElement.dir = T.dir;
    if (T.dir === 'rtl') document.body.classList.add('rtl');

    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    set('nav-home', T.navHome);
    set('nav-dinein', T.navDineIn);
    set('nav-order', T.navOrder);
    set('nav-track', T.navTrack);
    set('hero-eyebrow', T.heroEyebrow);
    set('hero-title-a', T.heroTitleA);
    set('hero-title-b', T.heroTitleB);
    set('hero-lead', T.heroLead);
    set('halal-text', T.halal);
    set('checkout-label', T.checkout);

    const home = LANG === 'en' ? 'index.html' : 'index_' + LANG + '.html';
    const link = (id, href) => { const el = document.getElementById(id); if (el) el.setAttribute('href', href); };
    link('nav-logo-link', home);
    link('nav-home', home);
    link('nav-dinein', home + '#menu');

    // Language switcher stays inside the catalogue instead of jumping home,
    // so "the menu in Arabic" is a place you can actually be.
    const bar = document.getElementById('lang-bar');
    if (bar) {
        bar.innerHTML = MENU_PAGES.map(p =>
            `<button class="lang-btn${p.lang === LANG ? ' active' : ''}" onclick="location.href='${p.href}'">${p.label}</button>`
        ).join('');
    }
}

// ─── BUILD MENU ───────────────────────────────────────────────────────────
function buildMenu() {
    const tabsEl = document.getElementById('menu-tabs');
    const catsEl = document.getElementById('menu-cats');

    tabsEl.innerHTML = `<button class="menu-tab active" onclick="switchTab('all', this)">🍽️ ${T.all}</button>`
        + MENU_CATEGORIES.map(c =>
            `<button class="menu-tab" onclick="switchTab('${c.id}', this)">${c.emoji} ${menuCategoryName(c, LANG)}</button>`
        ).join('');

    const allGrid = document.createElement('div');
    allGrid.className = 'menu-cat active';
    allGrid.id = 'cat-all';
    catsEl.appendChild(allGrid);

    MENU_CATEGORIES.forEach(c => {
        const grid = document.createElement('div');
        grid.className = 'menu-cat';
        grid.id = `cat-${c.id}`;
        catsEl.appendChild(grid);
    });

    renderCat('all');
    MENU_CATEGORIES.forEach(c => renderCat(c.id));
}

function renderCat(catId) {
    const el = document.getElementById(`cat-${catId}`);
    if (!el) return;
    el.innerHTML = menuItemsIn(catId).map(item => buildCardHTML(item)).join('');
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
    const img = menuItemImage(item);
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
                <div class="card-price">${T.price(item.price)}${tags}</div>
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
    const item = findMenuItem(id);
    if (item) showToast(T.addedToCart(menuItemName(item, LANG)));
}

function changeQty(id, delta) {
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    refreshCard(id);
    saveCart();
    updateCartBar();
}

function refreshCard(id) {
    const item = findMenuItem(id);
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
    return MENU.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);
}

function getTotalItems() {
    return Object.values(cart).reduce((s, v) => s + v, 0);
}

function updateCartBar() {
    const count = getTotalItems();
    document.getElementById('cf-count').textContent = T.itemsInCart(count);
    document.getElementById('cf-badge').textContent = count;
    document.getElementById('cf-total').textContent = T.price(getSubtotal());
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
    paintChrome();
    buildMenu();
    updateCartBar();
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 600);
    }
});
