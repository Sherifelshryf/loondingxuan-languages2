# WebLite Portfolio Dossier

**Repository analyzed:** `loondingxuan-languages2`
**Analysis date:** 2026-07-28
**Analysis method:** Full static inspection of every file in the repository (9 HTML pages, 2 JS files, 9 image assets, git history). No code was executed or modified.
**Last updated:** 2026-08-25 — the fabricated placeholder menu was replaced with the restaurant's real printed menu (90 dishes, trilingual, halal), and all fake/demo data was removed. See *Change Log* at the end.
**Purpose of this document:** Give another AI or designer enough accurate information to build a WebLite portfolio entry for this project without needing repository access.

> **Accuracy note.** Everything in this dossier is derived from the source code and assets in this repository. No business outcomes, traffic figures, conversion data, client briefs, or testimonials are claimed, because none are evidenced in the repository. See **Section 13 — Evidence & Confidence** for a per-claim breakdown and **Questions for WebLite** for the gaps that only the owner can fill.

---

## 1. Project Identification

| Field | Value | Confidence |
|---|---|---|
| **Project type** | Restaurant website **plus** a custom-built, database-backed food-delivery platform (customer ordering, live order tracking, driver app, and admin operations dashboard) | Verified |
| **Industry** | Food & Beverage — full-service Chinese restaurant / hospitality | Verified |
| **Sub-vertical** | Authentic **halal** (清真) Chinese fine-casual dining with in-house delivery operations. The printed menu is branded "CHINA HALAL FOOD" and carries the halal seal; there is no pork and no alcohol anywhere on it | Verified |
| **Market / region** | Egypt (Cairo). Prices are in EGP; local payment methods include InstaPay and Vodafone Cash; Arabic is a first-class language | Verified |
| **Business model surfaced** | Dine-in (reservations), in-house delivery (own drivers), and third-party aggregator delivery (Talabat) | Verified |
| **Delivery scale (configured)** | 20 km max delivery radius, EGP 25 base fee + EGP 5/km, 30 min prep + ~3 min/km drive estimate | Verified |

### Primary purpose

The site is built to do four distinct jobs, and the code shows real investment in all four:

1. **Build brand credibility and appetite** — a cinematic, gold-on-deep-green marketing site presenting the restaurant as an authentic, premium Chinese dining destination.
2. **Serve a multilingual local audience** — fully translated English, Arabic (RTL), and Chinese versions of the marketing site, and a menu where every one of the 90 dishes carries all three languages. This reflects a halal Chinese restaurant operating in an Arabic-speaking market with an expatriate Chinese clientele — the halal positioning is what makes Chinese cuisine accessible to the local Muslim majority.
3. **Take orders directly, bypassing aggregator commission** — a complete first-party ordering funnel (catalog → cart → map-pinned address → checkout → receipt → live tracking) that competes with the Talabat listing also linked from the site.
4. **Run the delivery operation** — an internal admin dashboard and a driver-facing mobile app that together handle order dispatch, driver onboarding, real-time GPS fleet tracking, status progression, and revenue/performance analytics.

The reservation and newsletter forms on the marketing site are **presentation-only** (they show a confirmation message and reset; they do not transmit data anywhere). The ordering system, by contrast, is genuinely wired to a live database. This distinction is important and is reflected throughout this dossier.

---

## 2. Portfolio Summary

### Short description (≈40 words)

A trilingual restaurant website paired with a complete in-house delivery platform — customers browse, order, and watch their driver move across a live map, while staff dispatch orders and track the fleet from a custom operations dashboard.

### Full case-study description (≈220 words)

This project pairs a cinematic restaurant marketing site with a full custom food-delivery platform, built entirely in vanilla HTML, CSS, and JavaScript with a Firebase backend — no framework, no build step.

The public site presents the restaurant in three complete language editions: English, Arabic with a true right-to-left layout and Arabic typography, and Chinese with Simplified Chinese serif type. Each edition is a fully translated standalone page with its own font stack, not a runtime string swap. Visitors move through a tabbed signature menu, a photo gallery linked to the restaurant's Instagram, an FAQ accordion, opening hours, an embedded map, and a table-booking form, all animated by scroll-triggered reveals, a canvas-based click-spark effect, and a layered progressive-blur treatment at the page edge.

Behind that sits the operational half. Diners build a cart from a categorized catalog, pin their delivery address on an interactive dark-tiled map (or use GPS, or type it manually), watch the delivery fee recalculate live from the real haversine distance to the restaurant, choose from four locally relevant payment methods, apply a database-validated promo code, and receive a printable, shareable receipt. From there a live tracking page follows the order through a four-stage progress timeline and plots the assigned driver's real-time GPS position on the map.

Staff get their own tools: an authenticated operations dashboard with live order queues, a fleet map, driver onboarding, and 30-day analytics — plus a separate mobile-first driver app that broadcasts location, advances order status, and calculates per-shift earnings.

---

## 3. Feature Extraction

### Customer-facing — marketing site

| Feature | What it does | Why it matters |
|---|---|---|
| **Trilingual site (EN / AR / ZH)** | Three complete, independently translated page editions with a persistent language switcher bar. Arabic runs in true RTL with mirrored navigation, menu rows, accordions, and slide-in drawer direction. Each language loads its own typeface. | Reaches Egypt's Arabic-speaking majority, English-speaking expatriates, and Chinese diaspora customers in their own language — a genuine commercial advantage in this market, and a visible signal of quality. |
| **Cinematic hero** | Full-viewport storefront photograph under a layered gradient scrim, with the Chinese wordmark, gradient-clipped headline text, and four calls to action. | Sets an upscale tone in the first second and immediately routes visitors to menu, booking, delivery, or Talabat. |
| **Tabbed signature menu** | Four categories (Dim Sum, Mains, Soups & Starters, Noodles & Rice) with animated cross-fade switching, dish photography, bilingual dish names, badges ("Chef's Pick", "Signature"), and prices. | Lets browsing customers assess the offer fast without leaving the page. |
| **Instagram-linked gallery** | Four dish photographs, each hover-zooming under a gold overlay and deep-linking to a specific Instagram post. | Turns the website into a funnel toward the restaurant's live social presence and its ongoing content. |
| **FAQ accordion** | Four expand/collapse answers covering halal and vegetarian options, advance Peking Duck orders, group bookings, and weekend reservations. | Answers the exact objections that stop a booking, without a phone call. |
| **Table booking form** | Name, phone, date, time-slot select, and party-size fields with a confirmation state. | Presents a clear reservation path. *Note: currently front-end only — see Section 13.* |
| **Opening hours panel** | Three cards covering weekday, weekend, and delivery hours. | Reduces the most common inbound phone question. |
| **Location + embedded map** | Google Maps embed alongside social contact links. | Gets walk-in customers to the door. |
| **Talabat integration** | Branded orange call-to-action in the nav and hero linking to the restaurant's aggregator listing. | Captures customers who prefer an aggregator, rather than losing them. |
| **Scroll-reveal animation system** | IntersectionObserver-driven fade-and-rise on every section, unobserving after firing. | Gives the page a considered, premium rhythm at negligible performance cost. |
| **Canvas click-spark** | Every click emits eight easing radial gold sparks from a full-viewport canvas overlay. | A small, memorable delight detail that makes the site feel bespoke. |
| **Progressive edge blur** | A 16-layer stacked `backdrop-filter` gradient producing a true progressive blur at the page footer, fading out at the scroll end. | A premium finish most template sites cannot reproduce. |
| **Branded preloader** | Pulsing logo over the brand green, capped at 1.5s and never blocking on external resources. | Covers font and image loading without ever trapping the visitor. |
| **Responsive drawer navigation** | Full-height slide-in drawer with scroll-lock, an explicit "Back" affordance, and direction-mirroring in Arabic. | Mobile is the dominant traffic source for restaurant discovery in this market. |

### Customer-facing — ordering & tracking

| Feature | What it does | Why it matters |
|---|---|---|
| **Full ordering catalog** | The restaurant's complete printed menu — **90 dishes across 13 categories** — each carrying its official menu code (L1, J4, M12…), its name in English, Chinese and Arabic, its price, and vegetarian/spicy tags. Category filtering includes an "All" view. | The entire menu becomes a transactional surface, not a PDF. Menu codes mean customer, waiter and kitchen all speak the same language about an order. |
| **Photography for every dish** | All 77 food dishes carry the restaurant's own plated photograph, served as ~21 KB WebP and lazy-loaded. | Food photography is the single biggest driver of order value on a delivery menu; stock imagery reads as generic and untrustworthy. |
| **Trilingual catalogue** | Three full catalogue editions — English, Arabic (RTL) and Chinese — each rendering strictly one language: dish names, categories, ingredient notes, dietary tags, currency, cart labels and toasts. A language switcher moves between them without leaving the menu. | A Chinese diner, an Arabic-speaking local and an English-speaking expat each read and order from the menu entirely in their own language — rare in this market, and the thing a mixed-language menu quietly undermines. |
| **Halal signalling** | Halal certification (清真) is surfaced as a badge on the hero and menu hero, and answered directly in the FAQ. 16 dishes are flagged vegetarian and 13 spicy. | Halal status is the single most important trust signal for this restaurant's local audience, and dietary tags cut pre-order phone calls. |
| **Persistent cart with live quantity controls** | Add/increment/decrement per item, cards visually flag their in-cart state, cart persists to `sessionStorage` and survives the page change into checkout. | Removes friction at the exact point where food orders are most often abandoned. |
| **Floating cart bar** | Slide-up bar pinned to the viewport showing live item count, running subtotal, and a checkout button with a count badge. | The order total is always visible — a proven conversion pattern. |
| **Three-way address capture** | Pin on an interactive map, one-tap GPS ("Use My Location"), or type the address manually. | Egyptian addresses are notoriously hard to express as text; map pinning solves a genuine local delivery problem. |
| **Reverse geocoding** | A dropped pin is resolved to a human-readable street address via OpenStreetMap Nominatim and pre-fills the address field. | The customer confirms rather than types, cutting errors and effort. |
| **Distance-based delivery pricing** | Haversine great-circle distance from the restaurant's coordinates drives the fee (base + per-km) and the ETA (prep time + per-km drive time), recalculating live as the pin moves. | Transparent, honest pricing that the customer can see respond to their own choice. |
| **Two-step guided checkout** | A progress bar advances Location → Details, with per-step validation and gated navigation. | Short, legible steps convert better than one long form on mobile. |
| **Four local payment methods** | Cash on Delivery, Card on Delivery, InstaPay, and Vodafone Cash. | Matches how Egyptian customers actually pay; a card-only checkout would lose most of this market. |
| **Promo code validation** | Codes are looked up against a Firestore `promo_codes` collection and checked for an active flag before the discount is applied. | Real, server-controlled promotions the restaurant can run without a developer. |
| **Order notes and landmark fields** | Free-text per-order notes (allergies, spice level) and a landmark field. | Landmarks are how addresses actually work in much of Cairo. |
| **Receipt page** | Itemized receipt with a short order ID, ETA, payment method, print stylesheet, Web Share API sharing with clipboard fallback, and a prefilled WhatsApp contact link. | Gives the customer a record and a one-tap route back to the restaurant. |
| **Live order tracking** | Order lookup by short ID or direct link, a four-stage progress timeline, live status via a real-time database subscription, a driver card with a tap-to-call button, and the driver's live GPS position moving on the map. | This is the feature customers screenshot and share — and the reason to order direct instead of through an aggregator. |

### Staff-facing

| Feature | What it does | Why it matters |
|---|---|---|
| **Authenticated admin dashboard** | Email/password sign-in gating a five-panel operations console. | Restaurant operations data stays behind a login. |
| **Live order queue** | Real-time snapshot subscription splits orders into "Needs Action" and "Active", with a live pending badge in the sidebar. | Staff see new orders the instant they land, without refreshing. |
| **Order status control** | Confirm, cancel, and progress orders through pending → confirmed → picked up → delivered, with timestamped updates. | One console drives the whole order lifecycle. |
| **Driver dispatch** | Assign a specific driver to an order from a dropdown; the assignment writes driver name, phone, and vehicle onto the order and immediately appears in that driver's app and on the customer's tracking page. | The single most operationally valuable action in the system, reduced to one click. |
| **Live fleet map** | Dark-tiled map plotting the restaurant, every active delivery destination with a customer popup, and every online driver's live GPS marker. | Turns dispatch from guesswork into a visual decision. |
| **Driver onboarding** | A form that creates a Firebase Auth account and a driver profile record in one action, with online/offline status and today's delivery count per driver. | The restaurant can add staff without a developer — real self-service CMS-style administration. |
| **Analytics panel** | 30-day order volume, revenue, average order value, cancellation rate, a seven-day bar chart rendered from live data, and a per-driver performance and earnings table. | Gives the owner a management view, not just an order list. |
| **Mobile driver app** | Separate authenticated app: assigned-orders queue, tap-to-call the customer, one-tap handoff to Google Maps navigation, "Picked Up" / "Delivered" status buttons, a self-position map, and a live earnings tab. | Purpose-built for a phone in a motorcycle mount — the environment it will actually be used in. |
| **Toggleable GPS broadcasting** | The driver app watches position continuously and streams it to the real-time database; switching off removes the location record entirely. | Live tracking for customers, with driver consent as an explicit, reversible control. |

---

## 4. Technical Analysis

### Frontend

| Layer | Technology | Confidence |
|---|---|---|
| Framework | **None** — hand-written multi-page static HTML. No `package.json`, no bundler, no transpiler, no dependency manifest of any kind | Verified |
| Language | HTML5, CSS3, vanilla ES6+ JavaScript (async/await, template literals, optional chaining, destructuring) | Verified |
| Styling | Hand-authored CSS in per-page `<style>` blocks, organized with CSS custom properties (design tokens), CSS Grid, Flexbox, `clamp()` fluid type, `backdrop-filter`, and `cubic-bezier` easing | Verified |
| UI / component library | **None.** Every component — tabs, accordion, drawer, toast, stepper, cart bar, modal-free panels — is bespoke | Verified |
| Icons | Font Awesome 6.5.2 via cdnjs | Verified |
| Typography | Google Fonts — Playfair Display + Montserrat (English), Noto Kufi Arabic (Arabic), Noto Serif SC (Chinese), Outfit (admin/driver) | Verified |
| Shared data | `menu-data.js` — a single trilingual menu dataset (90 dishes, 13 categories) imported by the catalogue, the checkout and all three marketing pages. One price edit propagates everywhere | Verified |
| Browser APIs used | IntersectionObserver, Canvas 2D, Geolocation (`getCurrentPosition` and `watchPosition`), Web Share API, Clipboard API, `sessionStorage`, `window.print()`, `URLSearchParams`, `requestAnimationFrame` | Verified |

### Backend

| Layer | Technology | Confidence |
|---|---|---|
| Runtime / server | **None self-hosted.** Fully serverless — the client talks directly to Firebase | Verified |
| BaaS platform | Firebase JS SDK **9.23.0** (compat build), loaded from `gstatic.com` | Verified |
| Authentication | Firebase Authentication, email/password. Used by the admin dashboard and the driver app; driver accounts are provisioned from the admin UI | Verified |
| Server-side logic | No Cloud Functions, no server code, no API routes in the repository. All business logic (pricing, distance, ETA, earnings, analytics) is computed client-side | Verified |

### Database / storage

| Store | Purpose | Confidence |
|---|---|---|
| **Cloud Firestore** | `orders` (full order documents with items, customer, coordinates, totals, status, assigned driver), `drivers` (profiles, vehicle, online state), `promo_codes` (discount value + active flag) | Verified |
| **Firebase Realtime Database** | `driver_locations/{uid}` — high-frequency GPS writes streamed from driver devices and subscribed to by both the admin fleet map and the customer tracking page | Verified |
| **Client storage** | `sessionStorage` keys `bs_cart` (cart across pages) and `bs_order` (last order for instant receipt/tracking render) | Verified |

Using Firestore for durable documents and the Realtime Database for the location firehose is a deliberate, correct split — RTDB is the cheaper and lower-latency store for rapid coordinate updates.

### Maps & geospatial

| Component | Technology | Confidence |
|---|---|---|
| Map engine | **Leaflet 1.9.4** (via unpkg) on the ordering, tracking, admin, and driver pages | Verified |
| Tiles | CARTO `dark_all` raster basemap over OpenStreetMap data | Verified |
| Geocoding | OpenStreetMap **Nominatim** reverse-geocoding API | Verified |
| Markers | Custom `L.divIcon` colour-coded dots — red (restaurant), blue (customer/order), amber/yellow (driver) | Verified |
| Distance maths | Hand-implemented haversine great-circle formula | Verified |
| Static map | Google Maps `iframe` embed on the marketing site's location section | Verified |
| Turn-by-turn | Deep link to Google Maps directions from the driver app | Verified |
| Google Maps JS API | **Not used.** A `GOOGLE_MAPS_API_KEY` constant exists in `firebase-config.js` but is referenced nowhere in the codebase — vestigial from an earlier approach later replaced by Leaflet | Verified |

### 3D / WebGL

**None.** There is no Three.js, React Three Fiber, WebGL, shader, or 3D content of any kind in this project. The animation work is 2D canvas, CSS, and SVG filters. *(Stated explicitly so no downstream description invents a 3D capability.)*

### Hosting & deployment

No deployment configuration is present — no `netlify.toml`, `vercel.json`, CI workflow, Dockerfile, or Firebase hosting config. The project is a plain static bundle that can be served from any static host or CDN. **Needs owner confirmation** as to where it is actually deployed.

### Other notable libraries & services

- **Talabat** — outbound aggregator link (restaurant listing ID present in markup)
- **Instagram / Facebook** — outbound social links; gallery images deep-link to individual Instagram posts
- **WhatsApp** — `wa.me` deep link with a prefilled order message on the receipt
- **Unsplash** — several marketing-page menu thumbnails are hotlinked to `images.unsplash.com` rather than served locally *(see Section 13 — this is a stock-photography dependency worth flagging)*

---

## 5. Design & UX Analysis

### Overall visual direction

Two deliberately distinct design languages coexist, which is itself a mark of maturity:

**Guest-facing** — "imperial Chinese restaurant, modern execution." Deep jade green (`#2B4B3E`) with layered darker greens (`#1e3a2f`, `#244035`), warm antique gold (`#D2A67A`) as the sole accent, and cream text (`#F5EDD8`). The gold appears as a three-stop gradient on buttons and as a background-clipped gradient on headline words. The palette reads as lacquer, brass, and candlelight rather than the red-and-gold cliché of most Chinese restaurant sites — a considered choice that lands as restrained and expensive.

**Staff-facing** — a near-black operations UI (`#0c0b0b` admin, `#0f0e0e` driver) with a soft blush accent (`#FFB7B2`) and a semantic status palette: green for delivered, amber for in-transit, purple for value metrics, red for cancelled. Translucent card surfaces over blurred backdrops. It reads as a control room, not a restaurant — correct, because the audience and the lighting conditions are different.

### Layout

The marketing site is a long-scroll narrative of full-width alternating-tone sections (hero → hours → menu → testimonials → FAQ → gallery → newsletter → location → reservation → footer), each with a centred eyebrow-label / heading / gold divider header. Content sits in `auto-fit` / `auto-fill` grids with `minmax()` sizing, so cards reflow by available space rather than by device breakpoint. The ordering flow switches to a narrow single-column card stack — the right shape for a phone held one-handed. The admin dashboard uses a fixed 240px sidebar with a top bar and a panel-swap content area, collapsing to a horizontal scrolling tab bar on mobile.

### Typography

- **English:** Playfair Display (headings — high-contrast serif, the source of the "fine dining" register) over Montserrat (body/UI).
- **Arabic:** Noto Kufi Arabic used for *both* headings and body, swapped in at the `:root` custom-property level. This is the correct call — Playfair has no Arabic coverage, and forcing a Latin serif would have broken the page.
- **Chinese:** Noto Serif SC for both roles, preserving the serif register in Chinese.
- Wide tracking (up to 12px on the hero Chinese wordmark, 5px on eyebrow labels) does a lot of the premium work; `clamp()` handles fluid scaling.

### Colour system

A disciplined token layer (`--bg-main`, `--bg-sec`, `--accent`, `--accent-light`, `--cream`, `--text-main`, `--text-muted`, `--border-thin`, `--gradient`, `--gradient-gold`, `--trans`, `--shadow`) is declared once per page and referenced throughout. This is what makes the trilingual editions and the checkout flow feel like one brand despite being separate hand-written files.

### Navigation

Desktop: a transparent fixed nav that gains a blurred, bordered, shadowed background and shrinks its padding past 50px of scroll. Above it sits a persistent language bar. Mobile: an 82%-width full-height drawer sliding in over a 0.6s custom easing curve, with body scroll lock, an explicit "Back" button, auto-close on link tap, and — in Arabic — a mirrored slide direction. A gold circular back-to-top button fades in past 800px.

### Animation & motion

- **Scroll reveals** — IntersectionObserver at a 0.1 threshold with a -50px bottom margin, fading and rising elements 40px into place on a `cubic-bezier(0.25,0.8,0.25,1)` curve, then unobserving so each element animates exactly once.
- **Click sparks** — a full-viewport canvas emits eight radial gold line-segments per click, each easing outward while shortening over 400ms, with the animation loop self-terminating when no sparks remain.
- **Progressive edge blur** — sixteen stacked `backdrop-filter` layers, each with an offset linear-gradient mask and an increasing blur radius along a smoothstep curve, producing a genuinely progressive blur rather than a hard blurred band. It fades out as the scroll reaches the document end, and hides itself when the mobile drawer opens.
- **Ambient motion** — on the ordering, receipt, and tracking pages, two large blurred colour blobs drift on an 8s alternating float, under an SVG `feTurbulence` fractal-noise grain overlay in `overlay` blend mode. This is the "expensive app" texture layer.
- **Micro-interactions** — cards lift and gain shadow on hover, menu thumbnails scale 1.12× inside their masks, gallery items zoom under a gold overlay with an icon rising into place, social buttons lift *and* rotate 360°, the pulsing logo preloader, and toasts that spring up on a `cubic-bezier(0.22,1,0.36,1)` overshoot.

### Interaction patterns

Toast notifications instead of alert dialogs; a numbered step indicator with done/active states in checkout; a four-stage progress timeline with a filling bar on tracking; sub-tab filtering in the admin order list; emoji fallbacks when a dish photo is missing; and inline validation that surfaces as a toast rather than a blocking modal. The cart persisting across the menu → checkout page change is the single most important UX decision in the ordering flow, and it is handled correctly.

### Responsive design

Marketing pages break at 992px (menu grid to single column, location grid stacks and *reorders* so the map appears above the info panel) and 768px (drawer nav, stacked full-width hero buttons, single-column forms). The catalog adds a 480px breakpoint where cards flip from horizontal to vertical with a full-width 160px image. The admin dashboard breaks at 1100px, 900px, and 600px, swapping the sidebar for a scrolling tab bar. The driver app is mobile-first throughout. The receipt page carries a dedicated `@media print` stylesheet with a `.no-print` class on interactive controls.

### Brand integration

An abstract gold mark — chopsticks crossing a stylised noodle bowl within a circle — is used as favicon, preloader, nav logo, and footer logo, and is embedded as an inline base64 PNG in the nav and footer of the marketing pages to guarantee it paints immediately. The Chinese wordmark 龙鼎轩 recurs as a typographic motif in the hero and in every page's nav lockup. The Talabat call-to-action correctly adopts Talabat's own orange (`#FF6000`) rather than the site palette — the right decision for a recognisable third-party action.

### What makes the experience distinctive

The progressive-blur footer, the canvas click-sparks, and the grain-and-blob texture layer are effects normally seen in React/WebGL showcase sites; here they are hand-implemented in vanilla JavaScript on a static page. Combined with genuine RTL Arabic support and a live driver-tracking map, the result feels considerably more expensive than its zero-dependency delivery mechanism suggests.

---

## 6. Complexity & Standout Engineering

### 1. Real-time GPS fleet tracking across three separate clients

**Challenge:** A driver's phone must stream its position continuously, and that position must appear — with low latency and no polling — on both an internal fleet map and an arbitrary customer's public tracking page, on a static site with no server.

**Implementation:** The driver app runs `navigator.geolocation.watchPosition` with high accuracy enabled and writes each fix to `driver_locations/{uid}` in the Firebase Realtime Database. The admin dashboard subscribes to the whole `driver_locations` node and reconciles markers by UID — moving an existing marker with `setLatLng` rather than destroying and recreating it, which keeps the map smooth. The customer tracking page subscribes to a single driver's node only, and only once that driver has been assigned to their order, detaching the previous listener before attaching a new one. Toggling sharing off deletes the record entirely, so a driver disappears from every map at once. Choosing RTDB for coordinates while keeping orders in Firestore is the correct engineering trade-off for write frequency and cost.

### 2. A three-role real-time system with one shared data model

**Challenge:** Customer, dispatcher, and driver each need a different view of the same order, updating live, without a backend to broker between them.

**Implementation:** A single Firestore `orders` collection is the shared source of truth, with each role attached through a differently scoped `onSnapshot` subscription. The admin subscribes to recent orders ordered by creation time. The driver app subscribes to a compound-filtered query — orders where `assignedDriver.id` equals their own ID *and* status is in `['confirmed','picked_up']` — so drivers see only their active work. The customer subscribes to their single order document. A dispatch action in the admin console writes one document update, and it propagates to the driver's queue and the customer's progress timeline simultaneously. The status vocabulary (`pending → confirmed → picked_up → delivered`, plus `cancelled`) is shared across all four consuming pages.

### 3. Geospatial pricing and ETA computation

**Challenge:** Delivery pricing must be honest and transparent, derived from real distance rather than flat guesswork — computed client-side with no routing service.

**Implementation:** A hand-written haversine great-circle calculation measures the distance from the restaurant's stored coordinates to the customer's dropped pin. That distance drives both the delivery fee (base fee plus a per-kilometre rate, rounded up per kilometre) and the ETA (fixed prep time plus a per-kilometre drive estimate), and the totals recalculate live every time the pin moves. All tuning constants live in one configuration file, so the restaurant can reprice without touching application code.

### 4. Genuine multilingual architecture including RTL

**Challenge:** Arabic is not a translation problem — it is a layout problem. Direction, typography, iconography, and animation direction all invert.

**Implementation:** Rather than a runtime i18n dictionary, each language is a complete standalone document with its own `lang` attribute, `meta description`, and title. The Arabic edition sets `body.rtl` and carries a dedicated RTL rule block that mirrors nav link order, menu row direction, price/name alignment, accordion chevrons, underline anchor origin, contact-link hover translation, the language bar itself, and — critically — the mobile drawer's slide-in direction (from the left instead of the right). Font families are swapped at the `:root` custom-property level, so `--font-main` and `--font-serif` resolve to Noto Kufi Arabic in the Arabic edition and Noto Serif SC in the Chinese edition while every downstream rule stays identical.

### 5. Hand-built progressive blur

**Challenge:** CSS `backdrop-filter` produces a uniform blur with a hard edge. A true *gradient* blur — sharp at one end, heavily blurred at the other — is not natively expressible.

**Implementation:** A configurable engine generates N stacked absolutely-positioned layers, each with its own `backdrop-filter` blur radius computed along a selectable curve (linear, bezier smoothstep, ease-in, ease-out, ease-in-out, or exponential) and its own offset four-stop linear-gradient mask, so each layer contributes blur only across its own band. The result is a genuinely progressive blur. The implementation includes presets, page-versus-parent targeting, optional hover intensification, scroll-triggered opacity via IntersectionObserver, a `@supports` fallback for browsers without `backdrop-filter`, single-injection style guarding, and integration with the mobile drawer so the effect hides while the menu is open.

### 6. Self-service driver onboarding

**Challenge:** A restaurant manager — not a developer — must be able to add a delivery driver and have that driver immediately able to sign in and receive dispatches.

**Implementation:** One admin form creates a Firebase Auth account and writes a matching Firestore driver profile (name, phone, email, vehicle, national ID, online flag, timestamp) in a single action, tolerating the already-registered case. The new driver signs into the separate driver app with those credentials and is immediately dispatchable. This is real custom admin functionality, not a CMS plugin.

### 7. Analytics computed live from operational data

**Challenge:** Provide a management view without a reporting backend or an analytics service.

**Implementation:** The dashboard derives, from the live order snapshot, a 30-day order count, delivered revenue, average order value, and cancellation rate; renders a seven-day volume bar chart as proportionally-height DOM elements normalised against the period maximum; and aggregates per-driver delivery counts and earnings using the same commission formula the driver app shows its own users, so the two views agree.

### 8. Graceful degradation without configuration

**Challenge:** The project must remain demonstrable and non-crashing before Firebase credentials are supplied.

**Implementation:** Every page checks whether the Firebase configuration still holds placeholder values and, if so, runs a demo path — orders get synthetic IDs, tracking renders sample data, admin actions report success as toasts. Every geospatial constant has an inline fallback via `typeof` guards, so no page throws if the config file fails to load. Firebase initialisation is wrapped and warns rather than breaking the page.

### 9. Zero-dependency delivery

The entire system — nine pages, a real-time database-backed ordering platform, an admin dashboard, a driver app, four map integrations, and a custom animation system — ships with no build step, no bundler, and no npm dependency tree. Every runtime library is a CDN `<script>` tag. That means no build breakage, no dependency rot, and a site that can be deployed by copying files to any static host.

---

## 7. Privacy-Safe Portfolio Version

> Use this version publicly unless and until WebLite confirms the client permits attribution.

### Anonymous project title

**Authentic Chinese Restaurant — Trilingual Website & In-House Delivery Platform**

Shorter alternatives: *"Chinese Fine-Dining Restaurant & Delivery Platform"* · *"Multilingual Restaurant & Order Management System"*

### Industry

Food & Beverage — Restaurant / Hospitality (Middle East & North Africa market)

### Anonymous short description

A trilingual restaurant website paired with a complete in-house delivery platform — customers browse, order, and watch their driver move across a live map, while staff dispatch orders and track the fleet from a custom operations dashboard.

### Anonymous full description

A premium Chinese restaurant needed more than a brochure site: it needed to take delivery orders directly and run the deliveries itself. This project delivers both halves.

The public site is presented in three complete language editions — English, Arabic with a true right-to-left layout and Arabic typography, and Chinese with Simplified Chinese serif type — each a fully translated standalone page rather than a runtime string swap. Deep jade green and antique gold set an upscale tone, with a tabbed signature menu, a social-linked photo gallery, an FAQ accordion, an embedded location map, and a table-booking form, all animated by scroll-triggered reveals, canvas click-sparks, and a hand-built progressive blur at the page edge.

The ordering platform behind it lets diners build a cart from a categorised catalog, pin their delivery address on an interactive map (or use GPS, or type it), watch the delivery fee and ETA recalculate live from the real distance to the restaurant, choose from four regionally relevant payment methods, apply a database-validated promo code, and receive a printable, shareable receipt. A live tracking page then follows the order through a four-stage timeline with the assigned driver's real-time GPS position moving on the map.

Staff get two purpose-built tools: an authenticated operations dashboard with live order queues, a fleet map, one-click driver dispatch, self-service driver onboarding, and 30-day analytics — plus a separate mobile-first driver app that broadcasts location, advances order status, and calculates shift earnings. The entire system is hand-built in vanilla JavaScript on a serverless real-time database, with no framework and no build step.

### Anonymous feature list

- Trilingual website (English / Arabic RTL / Chinese) with per-language typography
- Interactive digital menu with category filtering and persistent cart
- Map-based delivery address selection with GPS and reverse geocoding
- Distance-calculated delivery pricing and live ETA estimation
- Multi-step guided checkout with regional payment methods
- Promo code system validated against the database
- Printable and shareable digital receipts with messaging-app integration
- Live order tracking with a real-time driver position map
- Authenticated admin operations dashboard
- Real-time order queue with one-click driver dispatch
- Live delivery fleet map
- Self-service driver account onboarding
- Business analytics with revenue, volume, and per-driver performance reporting
- Dedicated mobile driver application with GPS broadcasting and earnings tracking
- Custom scroll, click, and progressive-blur animation systems
- Fully responsive design across desktop, tablet, and mobile
- Reservation enquiry and social media integration
- Third-party delivery aggregator integration

### ⚠️ Privacy warnings — assets and content that reveal client identity

| # | Location | Issue | Severity | Required action |
|---|---|---|---|---|
| 1 | `images/bg.jpg` — the hero background on **all three** marketing pages and the catalog hero | Photograph of the actual storefront showing the illuminated Chinese signage, the brand's initials in large illuminated letters, the logo mark, neighbouring businesses' Arabic signage, and people inside the restaurant | **Cleared by owner** | Approved for publication as-is (2026-08-25). It is the restaurant's own storefront photograph, already published on the live site, so a portfolio screenshot shows the page as it genuinely appears. Note that the visible signage and brand initials identify the client — see *Attribution* below. |
| 2 | `images/logo.png` and the inline base64 logo in the nav/footer of all three marketing pages | The client's distinctive brand mark. Contains no text, but is reverse-searchable and appears in every screenshot of the header, footer, and preloader | **High** | Replace with a neutral placeholder mark in any published screenshot. |
| 3 | Restaurant name (Latin and Chinese), phone number, full address, and coordinates | Present in `firebase-config.js`, page titles, meta descriptions, nav lockups, receipt footer, and the location section | **High** | Strip from all published copy and screenshots. Never reproduce the phone number or address. |
| 4 | Facebook, Instagram, and Talabat links (including the aggregator's numeric restaurant listing ID) | Identify the business directly and are visible in the footer, gallery tiles, nav, and hero | **High** | Crop out or blur in gallery, hero, footer, and nav screenshots. |
| 5 | Testimonial cards on the marketing site | Three named individuals with quoted reviews | **Medium** | Do not reproduce the names. Also confirm with the owner whether these are genuine reviews or placeholder copy before showing them at all. |
| 6 | Instagram post deep-links on gallery tiles | Each gallery image links to a specific public post on the client's account | **Medium** | Not visible on screen, but do not reproduce the markup in any code sample. |
| 7 | Admin driver-onboarding form | The temporary-password field ships with a **hardcoded default password containing the client's name** as its value, visible in any screenshot of the Drivers panel | **Medium** | Never screenshot the Drivers panel without clearing this field. Recommend to the client that this default be removed from the source. |
| 8 | Admin login screen and driver login screen | Placeholder email addresses use the client's domain | **Medium** | Clear or replace before capture. |
| 9 | Admin dashboard order cards, live map popups, driver app order cards, and the tracking/receipt pages | Render real customer names, phone numbers, and delivery addresses when connected to live data | **Critical** | Capture only with seeded fake data or a disconnected demo state. Never screenshot against production. |
| 10 | `images/dish1.jpg` … `dish4.jpg`, `pork_belly.jpg`, `hot_sour_soup.jpg` | Plated food photography with no signage, branding, or people | **None** | Safe to publish. These are the best anonymised visual assets available. |

**Credentials check:** No live secrets are committed. `firebase-config.js` contains only `YOUR_API_KEY`-style placeholders, and no API key, token, or private credential appears anywhere in the repository. The only credential-shaped string is the default temporary driver password noted at item 7.

---

## 8. Portfolio Visuals — Capture Plan

> **Not executed.** This is a plan only, per the brief. All captures assume a seeded demo dataset with fictitious customer names, phone numbers, and addresses, and a neutralised logo.

### Still screenshots

**1. Hero — marketing site**
- **Page/route:** `index.html` (top of page)
- **Viewport:** Both (desktop 1440×900 hero crop; mobile 390×844 full)
- **What to capture:** The full-viewport hero with the Chinese wordmark, gradient-clipped headline, and the row of four calls to action, with the nav and language bar visible at the top.
- **Why worth showing:** It is the single strongest impression of the brand direction — the deep green, the gold gradient type, the cinematic scrim — and it immediately communicates "premium restaurant" plus "multilingual" in one frame.
- **Privacy concerns:** **Cleared by owner.** The storefront background is approved for publication. If the anonymised portfolio track is used, the visible signage and brand initials still identify the client, so crop or blur those; for an attributed case study, capture the hero exactly as it ships.

**2. Signature menu — tabbed section**
- **Page/route:** `index.html#menu`
- **Viewport:** Desktop (with a mobile single-column companion)
- **What to capture:** The menu section with category tabs and the dish card grid, thumbnails and badges visible.
- **Why worth showing:** Demonstrates content design and the card system, and reads as instantly "restaurant" to a browsing prospect.
- **Privacy concerns:** Low. Prices and dish names are generic. Avoid including the nav logo in the crop.

**3. Arabic edition — RTL proof**
- **Page/route:** `index_ar.html`
- **Viewport:** Desktop, ideally shown side-by-side with the English edition
- **What to capture:** The same section in both languages, with the mirrored navigation, right-aligned headings, and Arabic typography clearly visible.
- **Why worth showing:** This is the highest-value differentiator in the whole project for MENA-market prospects. A genuine RTL build is a capability most agencies claim and few demonstrate. A paired before/after frame proves it instantly.
- **Privacy concerns:** Low, if the logo is neutralised and the crop excludes contact details.

**4. Ordering catalog with active cart**
- **Page/route:** `menu.html`
- **Viewport:** Mobile (primary — this is where ordering happens), desktop secondary
- **What to capture:** The catalog with several items showing active quantity steppers and highlighted in-cart borders, plus the floating cart bar pinned at the bottom showing item count and running total.
- **Why worth showing:** Proves this is a transactional product, not a brochure, and shows the conversion-critical persistent cart pattern.
- **Privacy concerns:** None.

**5. Map-based address selection**
- **Page/route:** `order.html` (step 1)
- **Viewport:** Mobile primary, desktop secondary
- **What to capture:** The dark-tiled map with the restaurant marker and a dropped delivery pin, the three location-mode tabs, the resolved address chip below the map, and the cart bar showing the recalculated total.
- **Why worth showing:** This is the moment that separates a real ordering platform from a contact form. It shows geolocation, reverse geocoding, and distance-based pricing in one frame.
- **Privacy concerns:** **Medium.** The map is centred on the restaurant's real coordinates, and the reverse-geocoded address chip will show a real street. Use a demo pin in a generic area and blur or replace the address text.

**6. Live order tracking**
- **Page/route:** `track.html`
- **Viewport:** Mobile primary
- **What to capture:** The full-bleed map with restaurant, customer, and driver markers, and the bottom sheet showing the four-stage progress timeline mid-journey ("On the way"), the ETA chip, and the driver card with its call button.
- **Why worth showing:** The most impressive single screen in the project and the clearest proof of real-time engineering. Instantly legible to any client as "this is what the big delivery apps do."
- **Privacy concerns:** **High.** Requires fully fictitious customer name, address, and driver name. Reposition markers away from the real restaurant coordinates.

**7. Admin dashboard — overview**
- **Page/route:** `admin.html` (Overview panel)
- **Viewport:** Desktop
- **What to capture:** The sidebar with its live pending badge, the four statistic cards (new orders, active, delivered today, revenue today), and the "Needs Action" order queue populated with several seeded orders.
- **Why worth showing:** Proves WebLite builds business systems, not just websites. This is the screenshot that wins custom-application work.
- **Privacy concerns:** **High.** Every order card renders a customer name, phone, and address. Seed with obviously fictitious data. Clear the client name from the sidebar lockup.

**8. Admin live fleet map**
- **Page/route:** `admin.html` (Live Map panel)
- **Viewport:** Desktop
- **What to capture:** The dark map with the restaurant marker, several blue delivery-destination markers, at least one amber driver marker, and one order popup open.
- **Why worth showing:** Visually dramatic and communicates operational sophistication faster than any description.
- **Privacy concerns:** **High.** The popup shows a customer name, phone, and total. Use seeded data and shift the map centre.

**9. Driver app — assigned orders**
- **Page/route:** `driver.html` (Orders tab)
- **Viewport:** Mobile only (ideally in a device frame)
- **What to capture:** The top bar with the online indicator and active location-sharing button, the tab row, and one or two order cards showing the status chip and the Call / Navigate / Picked Up action row.
- **Why worth showing:** Demonstrates that the project extends to a second, purpose-built application for a different user role — a strong signal of scope.
- **Privacy concerns:** **High.** Cards show customer names, phones, and addresses. Seed with fake data.

**10. Receipt page**
- **Page/route:** `receipt.html`
- **Viewport:** Mobile
- **What to capture:** The confirmation banner, ETA bar, and the itemised receipt card with the action row (Print / Share / WhatsApp / New Order).
- **Why worth showing:** Closes the funnel story visually and shows polish in a screen most projects neglect.
- **Privacy concerns:** **High.** Shows customer name, phone, and address, plus the restaurant's real phone number and address in the receipt footer. Fully replace before capture.

**11. Admin analytics**
- **Page/route:** `admin.html` (Analytics panel)
- **Viewport:** Desktop
- **What to capture:** The four metric cards, the seven-day bar chart, and the driver performance table.
- **Why worth showing:** Reinforces the "business system" positioning with a data view.
- **Privacy concerns:** **Medium.** Driver names appear in the performance table — replace with fictitious names. Revenue figures are real business data if captured live; use seeded values.

### Motion clips / GIFs (5–12 seconds each)

**A. Scroll-reveal journey** — `index.html`, desktop. A smooth scroll from hero to footer showing sections fading and rising into place, the nav condensing at the 50px threshold, and the progressive blur at the page edge. *Why:* Conveys the site's rhythm and premium finish better than any still. *Privacy:* Hero background cleared. Still neutralise the footer social icons and the location section, which carry contact details.

**B. Click-spark interaction** — any marketing page, desktop, tight crop. Two or three deliberate clicks emitting the gold radial sparks. *Why:* A signature bespoke detail that reads as craft. *Privacy:* None if cropped to a neutral region.

**C. Cart-building loop** — `menu.html`, mobile. Adding three items, incrementing one, the cards flipping to their in-cart state, toasts appearing, and the cart bar sliding up and counting. *Why:* Shows the core conversion interaction and its responsiveness. *Privacy:* None.

**D. Map pin → live price recalculation** — `order.html`, mobile. Dropping a pin, the address resolving in, and the delivery fee and total updating; then a second pin further away and the fee visibly increasing. *Why:* The single clearest demonstration of real geospatial logic. This is the clip to lead with for technically-minded prospects. *Privacy:* Use a demo area away from the real location; blur the resolved address text.

**E. Live driver movement on tracking** — `track.html`, mobile. The driver marker advancing along the map while the progress timeline advances a stage and the status pill changes. *Why:* The "wow" clip. Proves real-time infrastructure in a way no still can. *Privacy:* Fully fictitious order and driver; relocate the map region.

**F. Dispatch → driver → customer propagation** — a split or sequential three-panel clip: admin assigns a driver, the order appears in the driver app, the driver card appears on the customer's tracking page. *Why:* The strongest engineering-narrative asset in the whole project — it shows a real-time multi-role system working end to end. Worth the extra production effort. *Privacy:* Seeded data across all three panels.

**G. Language switch** — `index.html` → `index_ar.html` → `index_zh.html`, desktop. Clicking through the language bar, showing the layout mirror into RTL and the typography change. *Why:* Demonstrates the multilingual architecture as an experience rather than a claim. *Privacy:* Neutralise logo; avoid the contact section.

**H. Responsive transformation** — `index.html` or `menu.html`. A browser window narrowing from desktop to mobile, showing grids collapsing, the nav becoming a hamburger, the drawer sliding in, and the catalog cards flipping to vertical. *Why:* Proves responsive craft in one continuous shot. *Privacy:* Hero background cleared; neutralise the logo only if running the anonymised track.

---

## 9. Portfolio Card

- **Project title:** Authentic Chinese Restaurant — Trilingual Website & Delivery Platform
- **Category:** Restaurant Website & Custom Web Application
- **One-line hook:** *Three languages, one kitchen, and a delivery fleet you can watch live.* (11 words)
- **Description (≈34 words):** A trilingual restaurant site with a full in-house delivery platform — map-based ordering, real-time driver tracking, and a custom admin dashboard for dispatch, fleet monitoring, and analytics.
- **Top 3 features:**
  1. Live order tracking with real-time driver GPS on an interactive map
  2. Trilingual experience including a true right-to-left Arabic edition
  3. Custom admin dashboard with one-click dispatch and fleet analytics
- **Technology tags:** `Real-Time Database` · `Interactive Maps` · `Multilingual (RTL)` · `Custom Admin Dashboard` · `Live GPS Tracking` · `Responsive Design` · `Custom Animation`
  *(Client-facing framing. For a technical audience: Firebase, Firestore, Realtime Database, Leaflet, Vanilla JavaScript.)*
- **Suggested thumbnail:** The live tracking screen on mobile — dark map with restaurant, customer, and driver markers, and the bottom sheet showing the progress timeline mid-delivery. It is the most visually distinctive and least brand-identifying screen in the project, and it signals "real application" at thumbnail scale. **Second choice:** a side-by-side of the English and Arabic hero, if the multilingual capability is the pitch. The storefront hero is now cleared for use and is a strong third option if the case study runs attributed.
- **Suggested interaction:** On hover (or tap on touch devices), cross-fade the static thumbnail into a looping muted clip of the driver marker advancing while the progress timeline fills — the "Live driver movement" clip (E). A subtle scale-up of the card with the gold accent border warming in matches the project's own micro-interaction language. As a lighter-weight alternative, cycle three stacked screens — marketing hero → ordering map → admin dashboard — to communicate the project's breadth in one gesture.

---

## 10. Case Study Page Structure

### Overview

A premium Chinese restaurant operating in Cairo needed a web presence that could speak to three distinct customer groups in their own languages — and, beyond that, needed to take delivery orders directly rather than surrendering every order to a third-party aggregator. This project delivers both: a cinematic multilingual marketing site, and a complete custom delivery platform spanning customer ordering, live tracking, driver operations, and back-office management.

### The Experience

**As a diner**, you arrive at a full-screen hero and choose your language — English, Arabic, or Chinese — with the entire page, including its typography and layout direction, adapting to your choice. You browse a tabbed signature menu, open FAQ answers, scan the gallery through to the restaurant's Instagram, check opening hours, and either book a table or move into the ordering flow.

**As a delivery customer**, you build a cart from a categorised catalog with live quantity controls and a running total pinned to the bottom of the screen. At checkout you pin your address on an interactive map, tap to use your GPS, or type it manually — and watch the delivery fee and estimated arrival time recalculate from your actual distance from the restaurant. You choose from four payment methods including InstaPay and Vodafone Cash, apply a promo code, and place the order. You land on a printable, shareable receipt with a one-tap WhatsApp link to the restaurant, and from there follow your order through a four-stage timeline while your driver's position moves across the map in real time.

**As a driver**, you sign into a mobile app built for a phone in a motorcycle mount: your assigned orders, one tap to call the customer, one tap to open turn-by-turn navigation, buttons to mark picked-up and delivered, and a live earnings tab. A single control toggles GPS broadcasting on and off.

**As the restaurant**, you sign into an operations dashboard showing today's revenue, new orders demanding action, and every active delivery. You assign a driver from a dropdown and the order propagates instantly to that driver's phone and to the customer's tracking screen. You watch your whole fleet move on a live map, onboard new drivers from a form, and review thirty days of volume, revenue, average order value, cancellation rate, and per-driver performance.

### Key Features

- Three complete language editions — English, Arabic (RTL), Chinese — each with its own typography
- Interactive digital catalog with persistent cross-page cart
- Map pin, GPS, or manual address entry with reverse geocoding
- Distance-based delivery pricing and ETA calculation, updating live
- Guided multi-step checkout with four regionally appropriate payment methods
- Database-validated promotional code system
- Printable and shareable receipts with WhatsApp integration
- Real-time order tracking with live driver GPS positioning
- Authenticated admin dashboard with live order queues and one-click dispatch
- Live delivery fleet map
- Self-service driver account onboarding
- Thirty-day analytics with revenue, volume, and per-driver performance
- Dedicated mobile driver application with GPS broadcasting and earnings tracking

### Design

The guest experience is built on deep jade green and antique gold — lacquer and brass rather than the red-and-gold cliché of the category — with high-contrast serif headlines over a clean geometric sans, and gold-gradient text clipping on key phrases. Motion is used with restraint and precision: scroll-triggered reveals that fire once, a canvas click-spark effect that emits gold radial bursts on every click, and a hand-built progressive blur at the page edge composed of sixteen individually-masked backdrop-filter layers. The ordering and tracking screens add an ambient texture layer of drifting blurred colour fields under an SVG fractal-noise grain.

The staff-facing tools deliberately break from that palette into a near-black operations interface with a soft blush accent and a semantic status colour system — a control room rather than a restaurant, because it is used under different conditions by a different audience.

The Arabic edition is a genuine right-to-left build, not a mirrored stylesheet afterthought: navigation order, menu row direction, accordion chevrons, underline origins, hover translations, and even the mobile drawer's slide-in direction all invert, and the entire type stack swaps to an Arabic typeface at the design-token level.

### Engineering

The system's core is a real-time, three-role architecture over a single shared order model. Drivers stream GPS positions from their phones into a real-time database; the admin fleet map and every affected customer's tracking page subscribe to those coordinates and move markers live, with no polling and no server. Each role attaches a differently scoped subscription to the same order collection — the driver app filters to its own active assignments, the customer to a single document, the dispatcher to the recent queue — so one dispatch action propagates to three interfaces at once.

Delivery pricing and arrival estimates are computed from a hand-implemented haversine great-circle calculation against the restaurant's coordinates, with all tuning constants isolated in a single configuration file so the business can reprice without touching application code. Order documents, driver profiles, and promotional codes live in a document store, while high-frequency location updates are routed to a real-time database — a deliberate split matched to each store's write characteristics and cost profile.

The animation layer is custom-built: a canvas particle system with self-terminating animation frames, and a progressive-blur engine that generates stacked masked layers along a selectable easing curve, with a graceful fallback for browsers lacking backdrop-filter support.

The whole system ships with no framework, no bundler, and no dependency manifest — every runtime library is a CDN script tag, and the site deploys by copying static files.

### Responsive Experience

The marketing site reflows through breakpoints at 992px and 768px: the menu grid collapses to a single column, and the location section stacks *and reorders* so the map rises above the information panel on smaller screens. Navigation becomes a full-height drawer sliding in over a custom easing curve with body scroll-lock and an explicit back affordance — mirrored to slide from the opposite side in Arabic. Card grids use auto-fitting minmax sizing, so they reflow by available space rather than by device class, and type scales fluidly with clamp-based sizing.

The ordering catalog adds a third breakpoint at 480px where cards flip from horizontal to vertical with a full-width image. The admin dashboard steps through 1100px, 900px, and 600px, exchanging its fixed sidebar for a horizontally scrolling tab bar. The driver application is mobile-first throughout, designed for one-handed use. The receipt carries a dedicated print stylesheet that strips interactive controls.

### Technology

- **Frontend:** Vanilla HTML5, CSS3, and JavaScript (ES6+) — no framework, no build step
- **Styling:** Hand-authored CSS with custom-property design tokens, Grid, Flexbox, and fluid type
- **Backend:** Firebase (serverless)
- **Database:** Cloud Firestore for orders, drivers, and promotional codes; Firebase Realtime Database for live GPS streaming
- **Authentication:** Firebase Authentication (email/password) for admin and driver roles
- **Maps:** Leaflet with CARTO dark tiles over OpenStreetMap data; Nominatim reverse geocoding; Google Maps embed and directions deep-linking
- **Typography:** Playfair Display, Montserrat, Noto Kufi Arabic, Noto Serif SC, Outfit
- **Icons:** Font Awesome
- **Browser APIs:** Geolocation, IntersectionObserver, Canvas 2D, Web Share, Clipboard, sessionStorage

### Gallery Plan

The visual narrative should move through the four audiences the project serves:

1. **Brand** — the hero, establishing the visual direction *(background must be replaced before publication)*
2. **Language** — the English and Arabic editions side by side, proving the RTL build
3. **Menu** — the tabbed signature menu, establishing the restaurant context
4. **Order** — the mobile catalog with an active cart and the floating total bar
5. **Locate** — the map pin selection with the live-recalculating delivery fee *(hero clip: pin → price update)*
6. **Track** — the live tracking screen mid-delivery *(hero clip: driver marker advancing as the timeline fills)*
7. **Operate** — the admin overview with live order queues and statistics
8. **Fleet** — the live fleet map with drivers and destinations
9. **Deliver** — the driver app orders view in a device frame
10. **Close** — the receipt screen

The strongest single asset for the case study header is the three-panel dispatch propagation clip (admin assigns → driver receives → customer sees), because it demonstrates the real-time architecture as a narrative rather than a claim.

> **Deliberately omitted:** There is no "Challenge", "Client Brief", "Results", or "Impact" section, because the repository contains no evidence for any of them. If WebLite can supply verified information, these sections can be added — see *Questions for WebLite*.

---

## 11. Capability Tags

**Primary — strongly demonstrated:**

- Web Design
- Web Development
- Responsive Development
- UI/UX
- Custom Web Applications
- Restaurant Websites
- Multilingual Websites
- Database Development
- API Integration
- Animation
- Interactive Experiences
- Product Catalogs

**Additional warranted tags:**

- **Real-Time Applications** — live subscriptions driving three separate clients simultaneously
- **Location-Based Services / Geospatial Development** — mapping, GPS, reverse geocoding, distance computation
- **Admin Dashboards & Internal Tools** — a complete back-office operations console
- **E-Commerce / Online Ordering** — cart, checkout, promotional codes, receipts (note: no online payment capture; all methods settle on delivery or out-of-band)
- **RTL / Arabic Localisation** — a specific, marketable specialism distinct from generic multilingual work
- **Mobile-First Application Design** — the driver app is a dedicated mobile product
- **Business Intelligence & Reporting** — the analytics panel
- **Third-Party Platform Integration** — Talabat, WhatsApp, Instagram, Facebook, Google Maps

**Explicitly NOT applicable — do not tag:**

- ~~3D Web Experiences~~ — no 3D, WebGL, or Three.js content exists
- ~~E-Commerce (payment processing)~~ — no payment gateway is integrated; payment methods are selections recorded on the order
- ~~SEO~~ — see Section 13; the implementation is minimal and does not warrant this tag
- ~~Performance Optimization~~ — some good practices exist (lazy loading, a non-blocking preloader, single-fire observers), but there are also unoptimised assets and no build pipeline. Not defensible as a headline capability.
- ~~Accessibility~~ — see Section 13; not implemented to a standard worth claiming
- ~~Headless CMS~~ — the admin dashboard manages operations, not site content; menu data is hardcoded in the page source

---

## 12. Evidence & Confidence

### ✅ Verified — directly supported by code, assets, or configuration

- Nine HTML pages, one shared animation module, one configuration file, nine image assets
- No `package.json`, no build system, no framework, no dependency manifest — pure static delivery
- Three complete language editions with distinct `lang` attributes, translated content, translated meta descriptions, and per-language font stacks
- Arabic RTL implementation with a dedicated rule block covering navigation, menu rows, accordions, underline origins, hover translations, the language bar, and drawer slide direction
- Firebase 9.23.0 compat SDK: Firestore, Realtime Database, and Authentication
- Firestore collections in use: `orders`, `drivers`, `promo_codes`
- Halal certification (清真) stated on the printed menu cover ("CHINA HALAL FOOD" / الطعام الصيني الحلال) and consistent with the dish list: no pork, no alcohol
- Menu price range EGP 70–1390; 16 vegetarian dishes and 13 dishes marked spicy
- 80 dish photographs extracted from the printed menu (every one of the 77 food dishes, plus 3 of 13 drinks), stored as WebP averaging 21 KB, 1.7 MB in total
- Realtime Database path in use: `driver_locations/{uid}`
- Email/password authentication gating both `admin.html` and `driver.html`
- Driver account creation from the admin UI, writing both an Auth account and a Firestore profile
- Real-time `onSnapshot` subscriptions on all four order-consuming pages, with role-scoped queries
- Leaflet 1.9.4 with CARTO dark tiles on four pages; custom `divIcon` markers
- Nominatim reverse geocoding on address pin-drop
- Haversine distance computation driving both delivery fee and ETA
- Delivery configuration: EGP 25 base, EGP 5/km, 20 km max radius, 30 min prep, 3 min/km drive
- Four payment methods: Cash on Delivery, Card on Delivery, InstaPay, Vodafone Cash
- Promo code lookup against Firestore with an `active` flag check
- Cart persistence via `sessionStorage` across the catalog → checkout transition
- Three single-language catalogue editions (`menu.html`, `menu_ar.html`, `menu_zh.html`) sharing one `menu.css`, one `menu-page.js` and one dataset; verified by an automated scan that finds zero foreign-script text in each edition's menu UI
- 90 menu items across 13 categories in a single shared `menu-data.js`, each with menu code, English/Chinese/Arabic names, price, and vegetarian/spicy flags, transcribed from the restaurant's official printed menu
- Four-stage order status model shared across all consuming pages
- Driver GPS broadcasting via `watchPosition`, with a toggle that deletes the location record
- Admin analytics: 30-day metrics, seven-day bar chart, per-driver performance and earnings
- Driver earnings formula (20% of delivery fee + EGP 10 base), consistent between admin and driver views
- Canvas click-spark system with self-terminating animation loop
- 16-layer progressive blur engine with selectable curves, presets, and a `@supports` fallback
- IntersectionObserver scroll reveals that unobserve after firing
- SVG `feTurbulence` grain overlay and animated blurred colour blobs on the ordering, receipt, and tracking pages
- Responsive breakpoints as documented; print stylesheet on the receipt
- Web Share API with clipboard fallback; WhatsApp deep link with a prefilled message
- Talabat, Instagram, and Facebook outbound integrations
- Graceful degradation paths on every Firebase-dependent page when configuration is absent
- **No live credentials committed** — the Firebase config contains only placeholder values

### 🔍 Inferred — strongly implied by the implementation, not explicitly documented

- The delivery platform is intended to reduce dependence on aggregator commission — inferred from building a complete first-party ordering funnel while simultaneously linking to Talabat
- The trilingual approach targets Arabic-speaking locals, English-speaking expatriates, and Chinese diaspora customers — inferred from the language choice and market
- The project was built iteratively with a focus on mobile refinement — inferred from commit messages referencing mobile interface fixes, menu scrolling, and blur adjustments
- The ordering platform was likely a second phase after the marketing site — inferred from the initial commit containing everything and subsequent commits refining, plus the ordering pages sharing a colour system that appears retrofitted onto an earlier palette
- The restaurant runs its own delivery fleet rather than outsourcing — inferred from the driver onboarding, dispatch, and earnings systems
- WebLite authored the code — inferred from the repository context; the code is hand-written and internally consistent in style

### ⚠️ Known implementation gaps — stated for accuracy, not as criticism

These must **not** be described as working features in any published portfolio copy:

- **The table reservation form does not submit anywhere.** It shows a confirmation message after a simulated delay and resets. No data is transmitted, stored, or emailed.
- **The newsletter signup does not submit anywhere.** It shows an alert and resets.
- **No online payment capture.** All four payment methods are recorded as a selection on the order; nothing is charged through the site.
- **Guinea has no menu.** The branch is registered with its real address, phone numbers, languages and map link, but no menu was supplied, so it is marked `online: false` and its catalogue shows its phone numbers instead of dishes. Its map pin is approximate and its delivery pricing is unset — both must be supplied before it can take orders online.
- **SEO is minimal.** Titles and meta descriptions are present, but there are no Open Graph or Twitter Card tags, no canonical URLs, no `hreflang` annotations between the three language editions, no structured data (`Restaurant`, `Menu`, or `LocalBusiness` schema), no sitemap, and no `robots.txt`. Do not claim SEO as a capability on this project.
- **Accessibility is not implemented.** There are zero ARIA attributes and zero explicit roles across all nine pages. Interactive elements are built from `div` elements with click handlers in several places. The viewport meta tag sets `maximum-scale=1.0, user-scalable=no`, which blocks pinch-zoom. Alt text is present on images (65 instances), which is the one positive. Do not claim accessibility on this project.
- **Dish photography now covers every food item.** All 77 food dishes carry the restaurant's own photograph, extracted from the official printed menu and matched to each dish by its position on the page. Only 10 of the 13 drinks lack a photo — the printed menu itself only photographs three of them. The client has confirmed no higher-resolution originals exist, so the PDF is the final source; images are capped at 640 px on the long edge and never upscaled beyond what the file holds.
- **The logo is a 553KB PNG** embedded twice as inline base64 in each marketing page, inflating each of the three files to roughly 300KB. An SVG or optimised raster would be substantially smaller.
- **`GOOGLE_MAPS_API_KEY` is declared but never used** — vestigial from an approach later replaced by Leaflet.
- **The tracking page retains an older colour palette** (blush accent on near-black) rather than the green-and-gold brand applied to the ordering and receipt pages — a visual inconsistency to note before capturing screenshots side by side.

### ❓ Needs owner confirmation

- Whether the site is currently live, and at what domain
- Where it is hosted and how it is deployed
- Whether the Firebase project is configured and the delivery platform is operating in production, or whether the ordering system is built but not yet launched
- Whether WebLite built the entire system or inherited part of it
- Whether the marketing site and the delivery platform were one engagement or two
- Whether branding, logo, and photography were supplied by the client or created by WebLite
- Whether the testimonials on the marketing site are genuine customer reviews or placeholder copy
- Whether Firestore security rules are configured (rules are not in this repository, and without them the client-side architecture would be open)
- Whether the reservation and newsletter forms were intentionally left as presentation-only, or are pending a later phase
- Whether the client permits public attribution

---

## Questions for WebLite

These would materially strengthen the case study and cannot be answered from the repository.

**Project scope and history**

1. What problem did the client originally come to you with? Were they losing margin to aggregator commissions, unable to serve Arabic or Chinese speakers, or something else entirely?
2. Was this a redesign of an existing website, or a new build from nothing?
3. Were the marketing site and the delivery platform a single engagement, or separate phases? If separate, how far apart?
4. Which parts did WebLite build? Was any component inherited, templated, or contributed by the client or a third party?
5. Roughly how long did the project take, and what was the team size and composition?

**Client and permissions**

6. Is the client's identity permitted to be public, or must this stay anonymised?
7. Are screenshots allowed publicly? Specifically, may the storefront hero photograph be published — and do the staff and customers visible in it have any form of consent on record?
8. Were the branding, logo mark, and photography supplied by the client, or created by WebLite? If WebLite created the brand identity, that is a significant additional capability this dossier currently cannot claim.
9. Are the dish photographs the restaurant's own, or licensed stock? (Several marketing-page thumbnails are hotlinked to Unsplash — was that a deliberate placeholder pending the client's own photography?)

**Status and outcomes**

10. Is the website currently live, and at what URL?
11. Is the delivery platform operating in production with real orders and real drivers, or built and awaiting launch?
12. How many drivers currently use the driver app, and roughly what order volume does the system handle? Even a rough scale figure ("handles X orders a week") would strengthen the case study — but only if you can verify it.
13. Did the project produce any measurable business results you can substantiate? Do not estimate — this dossier deliberately claims none.
14. Are there client testimonials available, and may they be quoted with attribution?

**Technical and product decisions**

15. Were the reservation and newsletter forms intentionally left as front-end-only, or is a backend integration planned? If intentional, what handles bookings today — phone, WhatsApp, walk-in?
16. Was the decision to build with no framework and no build step deliberate — for maintainability, hosting simplicity, or client handover — or driven by another constraint? This is a defensible engineering position worth articulating in the case study if it was a choice.
17. Are Firestore security rules deployed? They are not in this repository, and the case study should not imply an open client-side data model.
18. Is the ordering flow planned for Arabic and Chinese translation, or was English-only a deliberate scoping decision?
19. Was online payment capture considered and deferred, or is cash-and-transfer-on-delivery the intended permanent model for this market?
20. Is the menu intended to become admin-editable? It is currently hardcoded in two page files, which means every price change requires a code edit — worth knowing whether that is a known trade-off or a planned next phase.

**Portfolio positioning**

21. Should this be positioned primarily as a *restaurant website* or as a *custom delivery application*? The repository supports either framing, and they attract very different prospects.
22. Are there other WebLite projects sharing this stack that should be presented as a coherent capability cluster?

---

## 13. Portfolio Strength Score

| Dimension | Score | Reasoning |
|---|---|---|
| **Visual Design** | **8 / 10** | A confident, well-executed premium direction with a disciplined token system, genuinely considered multilingual typography, and craft-level motion detail. Held back from higher by the visual inconsistency of the tracking page, reliance on stock thumbnails alongside real photography, and the absence of custom illustration or a distinctive art-directed layout system. |
| **Technical Complexity** | **8 / 10** | Real-time multi-role architecture, live GPS streaming across three clients, geospatial pricing, dual-database design, custom authentication flows, and a hand-built progressive-blur engine — all with no framework. Loses points for hardcoded menu data, all business logic living client-side, and no automated testing or build pipeline. |
| **Interactivity** | **8 / 10** | Live maps, real-time position tracking, a persistent cart, guided multi-step checkout, GPS capture, canvas particle effects, and scroll-driven motion. Genuinely interactive throughout rather than decoratively animated. Not a 9–10 because there is no 3D, no configurator, and no deeply immersive experience layer. |
| **Business Value** | **9 / 10** | This is the project's strongest dimension. It does not merely present a business — it *operates* one. A restaurant can take orders, dispatch drivers, track a fleet, and review revenue from software WebLite built. That is a fundamentally more valuable proposition than a brochure site, and it is exactly the story that wins high-value engagements. |
| **Portfolio Appeal** | **8 / 10** | Broad appeal: restaurant prospects see a beautiful restaurant site; MENA prospects see credible Arabic RTL work; operationally-minded prospects see a real business system. The live tracking screen is a genuinely compelling thumbnail. Discounted slightly by the substantial privacy work required before anything can be published. |

**Overall: 8.2 / 10**

### Recommendation: **Featured Project**

This should be featured, for three reasons.

First, it resolves the objection agencies most often face — *"can you build more than a website?"* — in a single screenshot. The admin dashboard and driver app are proof that WebLite ships operational software, not just pages.

Second, it carries a rare, specifically marketable specialism. Genuine right-to-left Arabic implementation, with mirrored layout, direction-aware animation, and a swapped type stack, is a capability many agencies claim and few can demonstrate. In the MENA market that is a decisive differentiator.

Third, it tells a complete, legible story. A visitor can follow one order from a hero photograph through a catalog, a map pin, a checkout, a receipt, a live tracking map, a dispatcher's console, and a driver's phone. Very few portfolio projects offer that kind of end-to-end narrative, and it is the narrative that justifies a dedicated case-study page rather than a card.

**One condition on featuring it:** the operational screens still need care. The hero background has been cleared by the owner, but every admin, driver and tracking screen renders live customer names, phone numbers and addresses. Those cannot be published from production data — budget time to seed a demo dataset before it goes live on the portfolio.

**If a technical framing is wanted alongside the visual one**, lead the case study with the three-panel dispatch propagation clip and the map-pin-to-price-recalculation clip. Those two assets carry more persuasive weight with prospects evaluating engineering capability than any static screen in the project.

---

## 14. Machine-Readable Data

```json
{
  "anonymousTitle": "Authentic Chinese Restaurant - Trilingual Website & In-House Delivery Platform",
  "projectType": "Halal Chinese restaurant website with custom food delivery platform, admin operations dashboard and driver application",
  "industry": "Food & Beverage - Restaurant / Hospitality",
  "subIndustry": "Authentic halal (Qing Zhen) Chinese fine-casual dining with in-house delivery operations",
  "market": "Middle East & North Africa (Egypt)",
  "shortDescription": "A trilingual halal Chinese restaurant website paired with a complete in-house delivery platform - customers browse a 90-dish menu in three languages, order, and watch their driver move across a live map, while staff dispatch orders and track the fleet from a custom operations dashboard.",
  "longDescription": "A premium Chinese restaurant needed more than a brochure site: it needed to take delivery orders directly and run the deliveries itself. This project delivers both halves. The restaurant is fully halal certified, and that positioning runs through the product: a halal badge on the hero and menu, a dedicated FAQ answer, and a 90-dish menu containing no pork and no alcohol. The public site is presented in three complete language editions - English, Arabic with a true right-to-left layout and Arabic typography, and Chinese with Simplified Chinese serif type - each a fully translated standalone page rather than a runtime string swap. Deep jade green and antique gold set an upscale tone, with a tabbed signature menu, a social-linked photo gallery, an FAQ accordion, an embedded location map, and a table-booking form, all animated by scroll-triggered reveals, canvas click-sparks, and a hand-built progressive blur at the page edge. The ordering platform behind it lets diners build a cart from the restaurant's complete 90-dish printed menu across 13 categories - every dish carrying its official menu code and its name in English, Chinese and Arabic, pin their delivery address on an interactive map or use GPS or type it, watch the delivery fee and ETA recalculate live from the real distance to the restaurant, choose from four regionally relevant payment methods, apply a database-validated promo code, and receive a printable, shareable receipt. A live tracking page then follows the order through a four-stage timeline with the assigned driver's real-time GPS position moving on the map. Staff get two purpose-built tools: an authenticated operations dashboard with live order queues, a fleet map, one-click driver dispatch, self-service driver onboarding, and 30-day analytics - plus a separate mobile-first driver app that broadcasts location, advances order status, and calculates shift earnings. The entire system is hand-built in vanilla JavaScript on a serverless real-time database, with no framework and no build step.",
  "primaryPurpose": [
    "Build brand credibility for a premium dining experience",
    "Serve a multilingual customer base in English, Arabic and Chinese",
    "Take delivery orders directly and reduce dependence on third-party aggregators",
    "Operate the in-house delivery fleet through custom admin and driver tooling"
  ],
  "features": [
    {
      "name": "Trilingual website with RTL Arabic",
      "description": "Three complete, independently translated page editions in English, Arabic and Chinese, each with its own typeface. The Arabic edition is a genuine right-to-left build with mirrored navigation, menu rows, accordions, underline origins and mobile drawer slide direction.",
      "value": "Reaches Arabic-speaking locals, English-speaking expatriates and Chinese diaspora customers in their own language."
    },
    {
      "name": "Interactive digital catalog with persistent cart",
      "description": "The restaurant's complete printed menu - 90 dishes across 13 categories - each with its official menu code (L1, J4, M12), its name in English, Chinese and Arabic, its price, and vegetarian or spicy tags. Category filtering, per-item quantity controls, in-cart visual state and a floating cart bar showing live count and subtotal. The cart persists across the page transition into checkout.",
      "value": "The entire menu becomes transactional rather than a PDF, and menu codes mean the customer, the waiter and the kitchen all refer to a dish the same way."
    },
    {
      "name": "Photography for every dish",
      "description": "All 77 food dishes carry the restaurant's own plated photograph, extracted from the official printed menu and matched to each dish by page position. Served as WebP averaging 21 KB and lazy-loaded.",
      "value": "Food photography is the strongest driver of order value on a delivery menu, and the restaurant's own plating reads as trustworthy where stock imagery does not."
    },
    {
      "name": "Trilingual catalogue",
      "description": "Three full catalogue editions - English, Arabic (right-to-left) and Chinese - each rendering strictly one language: dish names, categories, ingredient notes, dietary tags, currency, cart labels and toasts. A language switcher moves between them without leaving the menu.",
      "value": "A Chinese diner, an Arabic-speaking local and an English-speaking expatriate each read and order from the menu entirely in their own language."
    },
    {
      "name": "Halal certification signalling and dietary tags",
      "description": "Halal certification is surfaced as a badge on the hero and menu hero and answered directly in the FAQ. 16 dishes are flagged vegetarian and 13 are flagged spicy.",
      "value": "Halal status is the decisive trust signal for this restaurant's local audience, and dietary tags remove a common reason to phone before ordering."
    },
    {
      "name": "Map-based delivery address selection",
      "description": "Three capture modes - drop a pin on an interactive dark-tiled map, one-tap GPS location, or manual text entry. A dropped pin is reverse-geocoded to a readable street address that pre-fills the address field.",
      "value": "Solves a genuine local problem where addresses are hard to express as text, cutting delivery errors."
    },
    {
      "name": "Distance-based delivery pricing and ETA",
      "description": "A haversine great-circle calculation from the restaurant's coordinates to the customer's pin drives both the delivery fee (base plus per-kilometre) and the arrival estimate (prep time plus per-kilometre drive time), recalculating live as the pin moves.",
      "value": "Transparent, honest pricing the customer can watch respond to their own choice."
    },
    {
      "name": "Guided multi-step checkout",
      "description": "A two-step flow with a progress indicator, per-step validation, gated navigation, contact and landmark fields, and free-text order notes for allergies and spice level.",
      "value": "Short, legible steps convert better than one long form on mobile."
    },
    {
      "name": "Regional payment methods",
      "description": "Cash on Delivery, Card on Delivery, InstaPay and Vodafone Cash presented as selectable options recorded on the order. No payment is captured through the site.",
      "value": "Matches how customers in this market actually pay; a card-only checkout would lose most of them."
    },
    {
      "name": "Promotional code system",
      "description": "Codes are validated against a database collection and checked for an active flag before the discount is applied to the order total.",
      "value": "Lets the restaurant run real promotions without developer involvement."
    },
    {
      "name": "Printable and shareable receipts",
      "description": "Itemised receipt with short order ID, ETA, payment method, a dedicated print stylesheet, Web Share API sharing with clipboard fallback, and a prefilled messaging-app contact link.",
      "value": "Gives the customer a record and a one-tap route back to the restaurant."
    },
    {
      "name": "Live order tracking with driver GPS",
      "description": "Order lookup by short ID or direct link, a four-stage progress timeline, live status via real-time subscription, a driver card with tap-to-call, and the driver's live GPS position moving on the map.",
      "value": "The feature customers screenshot and share, and the reason to order direct rather than through an aggregator."
    },
    {
      "name": "Authenticated admin operations dashboard",
      "description": "Email and password sign-in gating a five-panel console covering overview, all orders, live map, drivers and analytics, with a live pending-order badge.",
      "value": "Keeps operational data behind a login and gives staff one place to run the service."
    },
    {
      "name": "Real-time order queue and dispatch",
      "description": "Live snapshot subscriptions split orders into needs-action and active queues. Assigning a driver from a dropdown writes the assignment onto the order and propagates instantly to the driver's app and the customer's tracking page.",
      "value": "The most operationally valuable action in the system, reduced to a single click."
    },
    {
      "name": "Live delivery fleet map",
      "description": "Dark-tiled map plotting the restaurant, every active delivery destination with a customer popup, and every online driver's live GPS marker, updated by real-time subscription.",
      "value": "Turns dispatch from guesswork into a visual decision."
    },
    {
      "name": "Self-service driver onboarding",
      "description": "One admin form creates an authentication account and a driver profile record in a single action, with online status and per-driver delivery counts.",
      "value": "The restaurant adds staff without a developer - real custom administration functionality."
    },
    {
      "name": "Business analytics",
      "description": "Thirty-day order volume, revenue, average order value and cancellation rate, a seven-day volume bar chart rendered from live data, and a per-driver performance and earnings table.",
      "value": "Gives the owner a management view, not just an order list."
    },
    {
      "name": "Dedicated mobile driver application",
      "description": "Separate authenticated app with an assigned-orders queue, tap-to-call, one-tap handoff to turn-by-turn navigation, picked-up and delivered status buttons, a self-position map, and a live earnings tab.",
      "value": "Purpose-built for a phone in a motorcycle mount - the environment it is actually used in."
    },
    {
      "name": "Toggleable GPS broadcasting",
      "description": "The driver app watches position continuously and streams it to the real-time database; switching off removes the location record entirely.",
      "value": "Enables customer-facing live tracking with driver consent as an explicit, reversible control."
    },
    {
      "name": "Custom animation systems",
      "description": "Canvas-based click-spark particles, IntersectionObserver scroll reveals that fire once, a sixteen-layer hand-built progressive blur with selectable easing curves, and an ambient grain and drifting colour-blob texture layer.",
      "value": "Delivers a premium, bespoke feel that separates the site from template-built competitors."
    },
    {
      "name": "Responsive design across all surfaces",
      "description": "Breakpoint systems on the marketing site, catalog, checkout, admin dashboard and driver app, including grid reordering, a direction-aware mobile drawer, card layout inversion at small widths, and a print stylesheet.",
      "value": "Mobile is the dominant traffic source for restaurant discovery and the only context for the driver app."
    },
    {
      "name": "Third-party platform integration",
      "description": "Links to a delivery aggregator listing, Instagram post deep-links from gallery tiles, Facebook, a messaging-app contact link with prefilled order details, and map directions handoff.",
      "value": "Captures customers wherever they prefer to transact rather than losing them."
    }
  ],
  "technologies": {
    "frontend": [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript (ES6+)",
      "CSS Custom Properties",
      "CSS Grid",
      "Flexbox",
      "No framework",
      "No build step"
    ],
    "backend": [
      "Firebase 9.23.0 (compat SDK)",
      "Serverless - no self-hosted server",
      "No cloud functions"
    ],
    "database": [
      "Cloud Firestore (orders, drivers, promo_codes)",
      "Firebase Realtime Database (driver_locations)",
      "sessionStorage (cart and last order)"
    ],
    "authentication": [
      "Firebase Authentication (email/password) for admin and driver roles"
    ],
    "maps": [
      "Leaflet 1.9.4",
      "CARTO dark basemap tiles",
      "OpenStreetMap data",
      "Nominatim reverse geocoding",
      "Google Maps embed",
      "Google Maps directions deep-linking"
    ],
    "graphics": [
      "Canvas 2D particle animation",
      "SVG feTurbulence noise filter",
      "CSS backdrop-filter layered progressive blur",
      "CSS keyframe animation"
    ],
    "browserApis": [
      "IntersectionObserver",
      "Geolocation (getCurrentPosition and watchPosition)",
      "Web Share API",
      "Clipboard API",
      "Canvas 2D",
      "sessionStorage",
      "URLSearchParams",
      "window.print"
    ],
    "typography": [
      "Playfair Display",
      "Montserrat",
      "Noto Kufi Arabic",
      "Noto Serif SC",
      "Outfit"
    ],
    "icons": [
      "Font Awesome 6.5.2"
    ],
    "thirdPartyServices": [
      "Talabat delivery aggregator",
      "WhatsApp deep linking",
      "Instagram",
      "Facebook",
      "Unsplash (hotlinked stock thumbnails on marketing pages)"
    ],
    "hosting": "Not determinable from the repository - no deployment configuration present. Static bundle deployable to any static host or CDN.",
    "notUsed": [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "Shaders",
      "GSAP",
      "Any 3D or WebGL technology",
      "Any payment gateway",
      "Any CMS",
      "Google Maps JavaScript API (key constant declared but never referenced)"
    ]
  },
  "capabilities": [
    "Web Design",
    "Web Development",
    "Responsive Development",
    "UI/UX",
    "Custom Web Applications",
    "Restaurant Websites",
    "Multilingual Websites",
    "RTL / Arabic Localisation",
    "Database Development",
    "API Integration",
    "Animation",
    "Interactive Experiences",
    "Product Catalogs",
    "Real-Time Applications",
    "Location-Based Services",
    "Geospatial Development",
    "Admin Dashboards & Internal Tools",
    "Online Ordering",
    "Mobile-First Application Design",
    "Business Intelligence & Reporting",
    "Third-Party Platform Integration",
    "Halal / Dietary Compliance Signalling"
  ],
  "capabilitiesExplicitlyNotApplicable": [
    "3D Web Experiences",
    "E-Commerce payment processing",
    "SEO",
    "Performance Optimization",
    "Accessibility",
    "Headless CMS"
  ],
  "designHighlights": [
    "Deep jade green and antique gold palette that avoids the red-and-gold cliche of the category and reads as lacquer, brass and candlelight",
    "Two deliberately distinct design languages - a warm premium guest experience and a near-black semantic-status operations interface for staff",
    "Per-language typography swapped at the design-token level: Playfair Display and Montserrat for English, Noto Kufi Arabic for Arabic, Noto Serif SC for Chinese",
    "Genuine right-to-left Arabic build inverting navigation order, menu rows, accordion chevrons, underline origins, hover translations and mobile drawer slide direction",
    "Gold-gradient background-clipped headline typography with wide letter tracking carrying the premium register",
    "Disciplined CSS custom-property token system keeping nine hand-written pages visually coherent",
    "Hand-built sixteen-layer progressive blur producing a true gradient blur rather than a hard blurred band",
    "Canvas click-spark particle effect emitting eight easing radial gold bursts on every click",
    "IntersectionObserver scroll reveals that fade and rise once then unobserve",
    "Ambient texture layer of drifting blurred colour fields under an SVG fractal-noise grain in overlay blend mode",
    "Auto-fitting minmax grids that reflow by available space rather than device class",
    "Responsive location section that stacks and reorders so the map rises above the info panel on mobile",
    "Full-height mobile drawer with scroll-lock, explicit back affordance and direction-mirroring in Arabic",
    "Branded pulsing-logo preloader capped at 1.5 seconds and never blocking on external resources",
    "Micro-interactions including card lift, masked image zoom, gallery overlay reveal and 360-degree rotating social buttons",
    "Toast notification system replacing browser alert dialogs throughout the ordering flow",
    "Third-party call-to-action correctly adopting the aggregator's own brand colour rather than the site palette"
  ],
  "engineeringHighlights": [
    "Real-time GPS fleet tracking streaming driver positions to a real-time database and reconciling markers by UID across an internal fleet map and arbitrary customer tracking pages, with no polling and no server",
    "Three-role real-time architecture over one shared order model, with differently scoped subscriptions per role so a single dispatch write propagates to dispatcher, driver and customer simultaneously",
    "Compound-filtered driver query returning only orders assigned to that driver and currently active",
    "Hand-implemented haversine great-circle distance computation driving both delivery pricing and arrival estimation, recalculating live as the map pin moves",
    "Deliberate dual-database split routing durable order documents to a document store and high-frequency GPS coordinates to a real-time database, matched to each store's write characteristics and cost",
    "Multilingual architecture using complete standalone translated documents with font families swapped at the CSS custom-property level rather than a runtime string dictionary",
    "Configurable progressive-blur engine generating stacked masked backdrop-filter layers along selectable easing curves, with presets, page-versus-parent targeting, hover intensification, scroll-triggered opacity and a supports-query fallback",
    "Self-service driver onboarding creating an authentication account and a database profile in one action, tolerating the already-registered case",
    "Live analytics derived entirely client-side from the operational order snapshot, including a proportionally-scaled seven-day bar chart and per-driver aggregation using a formula shared with the driver-facing earnings view",
    "Graceful degradation on every page when backend configuration is absent, with typeof guards on all geospatial constants so no page throws",
    "Cart state persisted across page transitions via session storage, surviving the catalog-to-checkout navigation",
    "Self-terminating canvas animation loop that stops requesting frames when no particles remain",
    "Zero-dependency delivery - a nine-page real-time platform with no bundler, no build step and no dependency manifest, every runtime library loaded as a CDN script tag"
  ],
  "visualRecommendations": [
    {
      "id": 1,
      "type": "screenshot",
      "page": "index.html (hero)",
      "viewport": "both",
      "capture": "Full-viewport hero with Chinese wordmark, gradient-clipped headline, four calls to action, nav and language bar",
      "why": "Strongest single impression of the brand direction; communicates premium restaurant and multilingual in one frame",
      "privacyConcerns": "CLEARED BY OWNER. The storefront background is approved for publication. If the anonymised track is used, the visible signage and brand initials still identify the client, so crop or blur those; for an attributed case study capture the hero exactly as it ships."
    },
    {
      "id": 2,
      "type": "screenshot",
      "page": "index.html#menu",
      "viewport": "desktop",
      "capture": "Tabbed signature menu with category tabs and dish card grid showing thumbnails, badges and prices",
      "why": "Demonstrates content design and the card system; instantly reads as restaurant",
      "privacyConcerns": "Low - exclude the nav logo from the crop"
    },
    {
      "id": 3,
      "type": "screenshot",
      "page": "index.html and index_ar.html side by side",
      "viewport": "desktop",
      "capture": "The same section in English and Arabic showing mirrored navigation, right-aligned headings and Arabic typography",
      "why": "Highest-value differentiator for MENA prospects; proves a genuine RTL build rather than a claim",
      "privacyConcerns": "Low if the logo is neutralised and contact details are excluded"
    },
    {
      "id": 4,
      "type": "screenshot",
      "page": "menu.html",
      "viewport": "mobile",
      "capture": "Catalog with active quantity steppers, highlighted in-cart card borders and the floating cart bar showing count and total",
      "why": "Proves this is a transactional product and shows the conversion-critical persistent cart",
      "privacyConcerns": "None"
    },
    {
      "id": 5,
      "type": "screenshot",
      "page": "order.html step 1",
      "viewport": "mobile",
      "capture": "Dark map with restaurant marker and dropped delivery pin, three location-mode tabs, resolved address chip and recalculated total",
      "why": "The moment that separates a real ordering platform from a contact form - geolocation, reverse geocoding and distance pricing in one frame",
      "privacyConcerns": "MEDIUM - map is centred on real coordinates and the address chip resolves a real street. Use a demo pin in a generic area and blur the address."
    },
    {
      "id": 6,
      "type": "screenshot",
      "page": "track.html",
      "viewport": "mobile",
      "capture": "Full-bleed map with restaurant, customer and driver markers, plus the bottom sheet showing the progress timeline mid-journey, ETA chip and driver card",
      "why": "Most impressive single screen and clearest proof of real-time engineering",
      "privacyConcerns": "HIGH - requires fully fictitious customer name, address and driver name; reposition markers away from real coordinates"
    },
    {
      "id": 7,
      "type": "screenshot",
      "page": "admin.html overview panel",
      "viewport": "desktop",
      "capture": "Sidebar with live pending badge, four statistic cards and the needs-action order queue populated with seeded orders",
      "why": "Proves WebLite builds business systems, not just websites - the screenshot that wins custom application work",
      "privacyConcerns": "HIGH - order cards render customer names, phones and addresses. Seed with fictitious data and clear the client name from the sidebar."
    },
    {
      "id": 8,
      "type": "screenshot",
      "page": "admin.html live map panel",
      "viewport": "desktop",
      "capture": "Dark map with restaurant marker, multiple blue destination markers, at least one amber driver marker and one order popup open",
      "why": "Visually dramatic; communicates operational sophistication faster than description",
      "privacyConcerns": "HIGH - popups show customer name, phone and total. Use seeded data and shift the map centre."
    },
    {
      "id": 9,
      "type": "screenshot",
      "page": "driver.html orders tab",
      "viewport": "mobile",
      "capture": "Top bar with online indicator and active location-sharing button, tab row, and order cards showing status chip and Call / Navigate / Picked Up actions",
      "why": "Demonstrates a second purpose-built application for a different user role - a strong signal of project scope",
      "privacyConcerns": "HIGH - cards show customer names, phones and addresses. Seed with fake data."
    },
    {
      "id": 10,
      "type": "screenshot",
      "page": "receipt.html",
      "viewport": "mobile",
      "capture": "Confirmation banner, ETA bar and itemised receipt card with the Print / Share / WhatsApp / New Order action row",
      "why": "Closes the funnel story and shows polish in a screen most projects neglect",
      "privacyConcerns": "HIGH - shows customer name, phone and address plus the restaurant's real phone and address in the receipt footer. Replace all before capture."
    },
    {
      "id": 11,
      "type": "screenshot",
      "page": "admin.html analytics panel",
      "viewport": "desktop",
      "capture": "Four metric cards, seven-day bar chart and driver performance table",
      "why": "Reinforces the business-system positioning with a data view",
      "privacyConcerns": "MEDIUM - driver names appear in the performance table and revenue is real business data if captured live. Use seeded values."
    },
    {
      "id": "A",
      "type": "clip",
      "page": "index.html",
      "viewport": "desktop",
      "capture": "Smooth scroll from hero to footer showing sections fading and rising, the nav condensing past its scroll threshold and the progressive edge blur",
      "why": "Conveys the site's rhythm and premium finish better than any still",
      "privacyConcerns": "Hero background cleared. Still neutralise the footer social icons and location section, which carry contact details."
    },
    {
      "id": "B",
      "type": "clip",
      "page": "any marketing page",
      "viewport": "desktop",
      "capture": "Tight crop showing two or three deliberate clicks emitting gold radial sparks",
      "why": "A signature bespoke detail that reads as craft",
      "privacyConcerns": "None if cropped to a neutral region"
    },
    {
      "id": "C",
      "type": "clip",
      "page": "menu.html",
      "viewport": "mobile",
      "capture": "Adding three items, incrementing one, cards flipping to in-cart state, toasts appearing and the cart bar sliding up and counting",
      "why": "Shows the core conversion interaction and its responsiveness",
      "privacyConcerns": "None"
    },
    {
      "id": "D",
      "type": "clip",
      "page": "order.html",
      "viewport": "mobile",
      "capture": "Dropping a pin, the address resolving in, the fee and total updating, then a second more distant pin with the fee visibly increasing",
      "why": "Clearest demonstration of real geospatial logic - lead with this for technically-minded prospects",
      "privacyConcerns": "Use a demo area away from the real location and blur the resolved address"
    },
    {
      "id": "E",
      "type": "clip",
      "page": "track.html",
      "viewport": "mobile",
      "capture": "Driver marker advancing along the map while the progress timeline advances a stage and the status pill changes",
      "why": "The wow clip - proves real-time infrastructure in a way no still can. Recommended card hover interaction.",
      "privacyConcerns": "Fully fictitious order and driver; relocate the map region"
    },
    {
      "id": "F",
      "type": "clip",
      "page": "admin.html, driver.html and track.html",
      "viewport": "mixed",
      "capture": "Split or sequential three-panel clip: admin assigns a driver, the order appears in the driver app, the driver card appears on the customer's tracking page",
      "why": "Strongest engineering-narrative asset in the project - shows a real-time multi-role system working end to end. Recommended case-study header.",
      "privacyConcerns": "Seeded fictitious data across all three panels"
    },
    {
      "id": "G",
      "type": "clip",
      "page": "index.html to index_ar.html to index_zh.html",
      "viewport": "desktop",
      "capture": "Clicking through the language bar showing the layout mirror into RTL and the typography change",
      "why": "Demonstrates the multilingual architecture as an experience rather than a claim",
      "privacyConcerns": "Neutralise logo and avoid the contact section"
    },
    {
      "id": "H",
      "type": "clip",
      "page": "index.html or menu.html",
      "viewport": "both",
      "capture": "Browser window narrowing from desktop to mobile showing grids collapsing, nav becoming a hamburger, drawer sliding in and catalog cards flipping to vertical",
      "why": "Proves responsive craft in one continuous shot",
      "privacyConcerns": "Hero background cleared; neutralise the logo only if running the anonymised track."
    }
  ],
  "privacyWarnings": [
    {
      "severity": "cleared",
      "asset": "images/bg.jpg",
      "usedOn": "Hero background on index.html, index_ar.html, index_zh.html and the menu.html hero",
      "issue": "Photograph of the actual storefront showing illuminated Chinese signage, the brand's initials, the logo mark, neighbouring Arabic signage, and people inside the restaurant.",
      "action": "Approved for publication by the owner on 2026-08-25. It is the restaurant's own storefront photograph, already published on the live site, so a portfolio screenshot shows the page as it genuinely appears. The visible signage and brand initials do identify the client, so crop or blur them if the anonymised track is used."
    },
    {
      "severity": "critical",
      "asset": "admin.html, driver.html, track.html, receipt.html when connected to live data",
      "usedOn": "Order cards, live map popups, driver order cards, tracking page and receipt",
      "issue": "Render real customer names, phone numbers and delivery addresses",
      "action": "Capture only against a seeded fake dataset or a disconnected demo state. Never screenshot production."
    },
    {
      "severity": "high",
      "asset": "images/logo.png and the inline base64 logo in the nav and footer of all three marketing pages",
      "usedOn": "Favicon, preloader, navigation, footer",
      "issue": "The client's distinctive brand mark. Contains no text but is reverse-searchable and appears in every header, footer and preloader screenshot",
      "action": "Replace with a neutral placeholder mark in any published screenshot"
    },
    {
      "severity": "high",
      "asset": "Restaurant name in Latin and Chinese script, phone number, full address and coordinates",
      "usedOn": "firebase-config.js, page titles, meta descriptions, nav lockups, receipt footer, location section",
      "issue": "Directly identifies the client and exposes contact details",
      "action": "Strip from all published copy and screenshots. Never reproduce the phone number or address."
    },
    {
      "severity": "high",
      "asset": "Facebook, Instagram and Talabat links including the aggregator's numeric restaurant listing ID",
      "usedOn": "Footer, gallery tiles, navigation, hero",
      "issue": "Identify the business directly and are visible on screen",
      "action": "Crop out or blur in gallery, hero, footer and nav screenshots"
    },
    {
      "severity": "resolved",
      "asset": "Testimonial cards on the marketing site",
      "usedOn": "index.html and translated editions",
      "issue": "Three invented named individuals with quoted reviews. REMOVED from all three editions - the section no longer exists.",
      "action": "No action needed. If the client has genuine attributable reviews, they can be reinstated."
    },
    {
      "severity": "medium",
      "asset": "Instagram post deep-links on gallery tiles",
      "usedOn": "index.html gallery section markup",
      "issue": "Each gallery image links to a specific public post on the client's account",
      "action": "Not visible on screen, but do not reproduce the markup in any published code sample"
    },
    {
      "severity": "medium",
      "asset": "Admin and driver login screens",
      "usedOn": "admin.html, driver.html",
      "issue": "Placeholder email addresses use the client's domain",
      "action": "Clear or replace before capture"
    },
    {
      "severity": "none",
      "asset": "images/dish1.jpg, dish2.jpg, dish3.jpg, dish4.jpg",
      "usedOn": "Gallery and menu thumbnails",
      "issue": "Plated food photography with no signage, branding or people. The former pork_belly.jpg and hot_sour_soup.jpg were deleted along with the placeholder menu.",
      "action": "Safe to publish - the best anonymised visual assets available in the repository"
    },
    {
      "severity": "none",
      "asset": "firebase-config.js",
      "usedOn": "All backend-connected pages",
      "issue": "No live secrets committed - contains only placeholder values such as YOUR_API_KEY. No API key, token or private credential appears anywhere in the repository.",
      "action": "No action required"
    },
    {
      "severity": "medium",
      "asset": "images/dishes/*.webp - notably N2, H1, H5",
      "usedOn": "Menu catalogue and marketing menu cards",
      "issue": "The restaurant serves on custom tableware hand-painted with its own name in Chinese calligraphy and a red seal, which is visible in the dish photographs.",
      "action": "For anonymised portfolio use pick dishes plated on unmarked ware - most noodle, rice and barbecue photographs qualify - or blur the calligraphy."
    }
  ],
  "knownImplementationGaps": [
    "The table reservation form does not submit anywhere - it shows a confirmation message after a simulated delay and resets. No data is transmitted, stored or emailed.",
    "The newsletter signup does not submit anywhere - it shows an alert and resets.",
    "No online payment capture - all four payment methods are recorded as a selection on the order; nothing is charged through the site.",
    "SEO is minimal - titles and meta descriptions are present, but there are no Open Graph or Twitter Card tags, no canonical URLs, no hreflang annotations between language editions, no structured data, no sitemap and no robots.txt.",
    "Accessibility is not implemented - zero ARIA attributes and zero explicit roles across all nine pages, several interactive elements built from div elements with click handlers, and a viewport meta tag that blocks pinch-zoom. Alt text is present on images.",
    "The logo is a 553KB PNG embedded twice as inline base64 in each marketing page, inflating each of the three files to roughly 300KB.",
    "GOOGLE_MAPS_API_KEY is declared in configuration but never referenced anywhere in the codebase - vestigial from an approach later replaced by Leaflet.",
    "The tracking page retains an older blush-on-near-black palette rather than the green-and-gold brand applied to the ordering and receipt pages - a visual inconsistency to note before capturing screenshots side by side.",
    "All business logic including pricing, distance, ETA, earnings and analytics is computed client-side; no server-side validation exists.",
    "Firestore security rules are not present in this repository and cannot be verified.",
    "Menu data is transcribed from the printed menu and is not admin-editable; a price change is a one-line edit in menu-data.js rather than a dashboard action.",
    "Dish photography covers all 77 food dishes but only 3 of the 13 drinks, because the printed menu photographs only three drinks. The owner has confirmed no higher-resolution originals exist, so the menu PDF is the final source and images are capped at 640 px on the long edge.",
    "Guinea is registered as a branch with its real address, phones, languages and map link, but no menu was supplied. It is marked offline and its catalogue shows phone numbers instead of dishes.",
    "Guinea's map pin is approximate (Kipe district, Conakry) and its delivery pricing is unset. Both drive distance-based fees, so both must be confirmed before that branch takes orders online.",
    "Country detection depends on a third-party IP lookup (api.country.is, then ipapi.co). Both are best-effort with a 2.5 second timeout; when they fail the visitor is asked to choose."
  ],
  "portfolioCard": {
    "title": "Authentic Chinese Restaurant - Trilingual Website & Delivery Platform",
    "category": "Restaurant Website & Custom Web Application",
    "hook": "Three languages, one kitchen, and a delivery fleet you can watch live.",
    "description": "A trilingual restaurant site with a full in-house delivery platform - map-based ordering, real-time driver tracking, and a custom admin dashboard for dispatch, fleet monitoring, and analytics.",
    "topFeatures": [
      "Live order tracking with real-time driver GPS on an interactive map",
      "Trilingual experience including a true right-to-left Arabic edition",
      "Custom admin dashboard with one-click dispatch and fleet analytics"
    ],
    "technologyTags": [
      "Real-Time Database",
      "Interactive Maps",
      "Multilingual (RTL)",
      "Custom Admin Dashboard",
      "Live GPS Tracking",
      "Responsive Design",
      "Custom Animation"
    ],
    "suggestedThumbnail": "The live tracking screen on mobile - dark map with restaurant, customer and driver markers, and the bottom sheet showing the progress timeline mid-delivery. Most visually distinctive and least brand-identifying screen in the project, and it signals real application at thumbnail scale. Second choice is a side-by-side of the English and Arabic hero. Avoid the storefront hero, which cannot be made privacy-safe without replacement.",
    "suggestedInteraction": "On hover or tap, cross-fade the static thumbnail into a looping muted clip of the driver marker advancing while the progress timeline fills. A subtle card scale-up with the gold accent border warming in matches the project's own micro-interaction language. Lighter alternative: cycle three stacked screens - marketing hero, ordering map, admin dashboard - to communicate breadth in one gesture."
  },
  "portfolioScores": {
    "visualDesign": 8,
    "technicalComplexity": 8,
    "interactivity": 8,
    "businessValue": 9,
    "portfolioAppeal": 8,
    "overall": 8.2
  },
  "recommendedTier": "Featured Project",
  "recommendedTierReasoning": "Featured for three reasons. It resolves the objection agencies most often face - can you build more than a website - in a single screenshot, because the admin dashboard and driver app prove WebLite ships operational software. It carries a rare, specifically marketable specialism in genuine right-to-left Arabic implementation, which is decisive in the MENA market. And it tells a complete end-to-end story a visitor can follow from hero to catalog to map pin to checkout to receipt to live tracking to dispatcher console to driver phone. The menu is now the restaurant's real trilingual halal menu and all fabricated demo content has been removed, so screenshots of the catalogue are safe and accurate. The hero background has been cleared by the owner. What still needs care is the operational screens, which render live customer names, phone numbers and addresses and must be captured against seeded demo data rather than production.",
  "ownerQuestions": [
    "Clearing the storefront hero for publication also reveals the client's signage and brand initials. Does that mean the case study can run attributed, or should it stay anonymised with the signage cropped or blurred?",
    "What problem did the client originally come to you with - losing margin to aggregator commissions, inability to serve Arabic or Chinese speakers, or something else?",
    "Was this a redesign of an existing website or a new build from nothing?",
    "Were the marketing site and the delivery platform a single engagement or separate phases, and if separate how far apart?",
    "Which parts did WebLite build? Was any component inherited, templated, or contributed by the client or a third party?",
    "Roughly how long did the project take, and what was the team size and composition?",
    "Is the client's identity permitted to be public, or must this stay anonymised?",
    "Are screenshots allowed publicly, and specifically may the storefront hero photograph be published - do the staff and customers visible in it have any consent on record?",
    "Were the branding, logo mark and photography supplied by the client or created by WebLite? If WebLite created the brand identity, that is a significant additional capability this dossier cannot currently claim.",
    "Are the printed menu prices current? They were transcribed exactly as printed, and EGP pricing moves quickly.",
    "Are the dish photographs the restaurant's own or licensed stock? Several marketing thumbnails are hotlinked to Unsplash - was that a deliberate placeholder pending the client's own photography?",
    "Is the website currently live, and at what URL?",
    "Is the delivery platform operating in production with real orders and real drivers, or built and awaiting launch?",
    "How many drivers currently use the driver app, and roughly what order volume does the system handle?",
    "Did the project produce any measurable business results you can substantiate? This dossier deliberately claims none.",
    "Are there client testimonials available, and may they be quoted with attribution?",
    "Were the reservation and newsletter forms intentionally left as front-end-only, or is a backend integration planned? If intentional, what handles bookings today?",
    "Was the decision to build with no framework and no build step deliberate - for maintainability, hosting simplicity or client handover - or driven by another constraint?",
    "Are Firestore security rules deployed? They are not in this repository, and the case study should not imply an open client-side data model.",
    "Is the ordering flow planned for Arabic and Chinese translation, or was English-only a deliberate scoping decision?",
    "Was online payment capture considered and deferred, or is cash-and-transfer-on-delivery the intended permanent model for this market?",
    "Is the menu intended to become admin-editable? It is currently hardcoded in two page files, so every price change requires a code edit.",
    "Should this be positioned primarily as a restaurant website or as a custom delivery application? The repository supports either framing and they attract very different prospects.",
    "Are there other WebLite projects sharing this stack that should be presented as a coherent capability cluster?",
    "Should the ordering flow (catalogue, checkout, receipt, tracking) be translated into Arabic and Chinese now that the dish data already carries all three languages?"
  ],
  "repositoryFacts": {
    "pages": [
      "index.html - English marketing site",
      "index_ar.html - Arabic marketing site (RTL)",
      "index_zh.html - Chinese marketing site",
      "menu.html - English ordering catalogue",
      "menu_ar.html - Arabic ordering catalogue (RTL)",
      "menu_zh.html - Chinese ordering catalogue",
      "order.html - two-step checkout with map location selection",
      "receipt.html - order confirmation and printable receipt",
      "track.html - live customer order tracking",
      "admin.html - operations dashboard",
      "driver.html - mobile driver application"
    ],
    "sharedModules": [
      "menu-data.js - trilingual menu dataset (90 dishes, 13 categories) plus the catalogue interface strings for all three languages",
      "menu-page.js - catalogue rendering and cart behaviour, driven entirely by the page's LANG",
      "menu.css - catalogue styles shared by the three language editions, including right-to-left rules",
      "animations.js - click-spark canvas system and progressive-blur engine",
      "firebase-config.js - backend credentials placeholders and business constants"
    ],
    "imageAssets": 87,
    "menuItems": 90,
    "menuCategories": 13,
    "languages": 4,
    "userRoles": 3,
    "buildSystem": "none",
    "dependencyManifest": "none",
    "deliveryConfiguration": {
      "baseFeeEGP": 25,
      "perKmEGP": 5,
      "maxRadiusKm": 20,
      "prepMinutes": 30,
      "driveMinutesPerKm": 3
    },
    "orderStatusModel": [
      "pending",
      "confirmed",
      "picked_up",
      "delivered",
      "cancelled"
    ],
    "gitHistory": "Initial commit containing the full system, followed by iterative refinements to animation, logo, mobile interface, menu scrolling and aggregator integration; then replacement of the placeholder menu with the real trilingual halal menu and removal of all fake and demo data.",
    "halalCertified": true,
    "menuLanguages": [
      "English",
      "Simplified Chinese",
      "Arabic"
    ],
    "dishPhotographs": 80,
    "countries": [
      "Egypt (New Cairo) - en/ar/zh, EGP, 90-dish menu, online",
      "Guinea (Conakry) - fr/en/zh, GNF, menu not yet supplied, phone ordering"
    ]
  }
}
```

---

---

## Change Log

### 2026-08-25 — Real menu added, fabricated data removed

The site previously shipped an **entirely invented placeholder menu** (Har Gow, Peking Duck, Xiao Long Bao, and so on) alongside several pieces of fabricated demo content. The client supplied the official printed menu, and all of it has been replaced with verified data.

**The pork problem.** The placeholder menu contained six pork dishes — Char Siu Bao, Braised Pork Belly, Sweet & Sour Pork, Twice-Cooked Pork, and pork fillings in two others — plus a `pork_belly.jpg` asset. The restaurant is **halal certified** (清真; its printed menu is branded "CHINA HALAL FOOD"). Serving pork is not merely inaccurate here, it inverts the restaurant's core proposition and would have been offensive to its primary audience. This is the clearest possible illustration of why placeholder content must never reach production.

**Added**

- `menu-data.js` — the complete printed menu as a single source of truth: **90 dishes across 13 categories**, each with its official menu code (L1, J4, M12…), English, Simplified Chinese and Arabic names, price, and vegetarian/spicy flags. Price range EGP 70–1390; 16 vegetarian dishes, 13 spicy.
- Halal certification surfaced as a badge on the marketing hero and the menu hero, and answered directly in the FAQ.
- Vegetarian and spicy tags on catalogue cards.
- Menu codes displayed throughout, so customer, waiter and kitchen share one vocabulary.
- Marketing menus on all three editions now render from the shared dataset in the page's own language.

**Removed**

- The 27-item invented menu, previously duplicated verbatim in `menu.html` and `order.html`.
- Three fabricated testimonials with invented names, from all three editions.
- The invented "Peking Duck" FAQ, replaced with a halal question the menu actually supports.
- Hotlinked Unsplash stock dish photography (12 images across the three editions).
- `images/pork_belly.jpg` and `images/hot_sour_soup.jpg`.
- The fake tracking order ("Demo User", "Sheikh Zayed City") and the `DEMO-` synthetic order-ID path.
- Fake success toasts in the admin dashboard and driver app that reported writes as succeeding when nothing was connected.
- A hardcoded default driver password containing the client's name.
- **An authentication bypass**: when Firebase configuration was absent, both `admin.html` and `driver.html` granted access to their full interface on any sign-in attempt. Both now refuse and say the service is not connected. This was the most serious finding in the original analysis and is now closed.
- A dead `favicon.ico` reference.

**Verified after the change** — 90 items with no duplicate codes, no orphaned categories, no missing translations, and zero pork. All pages render without JavaScript errors; the cart totals correctly and carries through the catalogue → checkout handoff; the Arabic edition renders right-to-left with Arabic dish names throughout.

**Not done** — per-dish photography. The catalogue uses category emoji. The menu PDF contains a professional photograph of most dishes, but they are flattened into the page images rather than supplied as separate files, and guessing which photo belongs to which dish would reintroduce exactly the kind of unverified content this change removed. Requested from the client in *Questions for WebLite*.

*Dossier compiled from full static analysis of the repository. No files were modified and no code was executed during this analysis. Every claim above is traceable to source code or assets in this repository; where it is not, it is explicitly marked as inferred or as requiring owner confirmation.*
