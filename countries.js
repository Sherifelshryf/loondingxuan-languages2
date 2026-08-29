/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   Loongdingxuan — branch registry                                 ║
 * ║   One entry per country the restaurant operates in.               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * A branch owns everything that differs between countries: which languages
 * it serves, its currency, its address and phone numbers, its map pin, its
 * delivery pricing, and which menu it sells. The rest of the site reads the
 * active branch rather than hard-coding any of it.
 *
 * Fields
 *   code          ISO 3166-1 alpha-2, lowercase — also the localStorage value
 *   languages     languages this branch serves, in display order
 *   defaultLang   the language used when nothing else is known
 *   currency      { code, symbol per language, position }
 *   menuId        key into MENUS in menu-data.js; null while no menu is loaded
 *   online        true when this branch can take orders through the website
 *   coordsConfirmed  false where the pin is approximate and still needs checking
 */

const COUNTRIES = {

    eg: {
        code: 'eg',
        flag: '🇪🇬',
        name: { en: 'Egypt', ar: 'مصر', zh: '埃及', fr: 'Égypte' },
        city: { en: 'New Cairo', ar: 'القاهرة الجديدة', zh: '新开罗', fr: 'Le Caire Nouveau' },
        languages: ['en', 'ar', 'zh'],
        defaultLang: 'en',
        currency: {
            code: 'EGP',
            symbol: { en: 'EGP', ar: 'ج.م', zh: '埃镑', fr: 'EGP' },
            position: { en: 'before', ar: 'after', zh: 'after', fr: 'before' },
        },
        address: {
            en: 'Second New Cairo, Cairo Governorate, Egypt',
            ar: 'التجمع الثاني، القاهرة الجديدة، محافظة القاهرة، مصر',
            zh: '埃及开罗省新开罗第二区',
            fr: 'Second New Cairo, Gouvernorat du Caire, Égypte',
        },
        phones: { order: '+20226076395', reservation: '+20226076395' },
        map: 'https://maps.google.com/maps?q=3F3R%2BXX+Second+New+Cairo&output=embed',
        mapLink: 'https://maps.google.com/maps?q=3F3R%2BXX+Second+New+Cairo',
        lat: 30.0549375,
        lng: 31.4924375,
        coordsConfirmed: true,
        delivery: { baseFee: 25, perKm: 5, maxRadiusKm: 20, prepMinutes: 30, driveMinutesPerKm: 3 },
        payments: ['cash', 'card', 'instapay', 'vodafone'],
        menuId: 'eg',
        online: true,
        social: {
            facebook: 'https://www.facebook.com/loongdingxuan/',
            instagram: 'https://www.instagram.com/longdingxuan.eg/',
            talabat: 'https://www.talabat.com/egypt/restaurant/799867/loongdingxuan-el-rehab-city-1?aid=7600',
        },
    },

    gn: {
        code: 'gn',
        flag: '🇬🇳',
        name: { en: 'Guinea', ar: 'غينيا', zh: '几内亚', fr: 'Guinée' },
        city: { en: 'Conakry', ar: 'كوناكري', zh: '科纳克里', fr: 'Conakry' },
        languages: ['fr', 'en', 'zh'],
        defaultLang: 'fr',
        currency: {
            code: 'GNF',
            symbol: { en: 'GNF', ar: 'GNF', zh: '几内亚法郎', fr: 'FG' },
            position: { en: 'before', ar: 'after', zh: 'after', fr: 'after' },
        },
        address: {
            en: 'Kipé, Xinghai Bay Commercial Street 211, Conakry, Guinea',
            ar: 'كيبي، شارع خينغهاي باي التجاري 211، كوناكري، غينيا',
            zh: '几内亚科纳克里 Kipé 星海湾商业街 211 号',
            fr: 'Kipé, Rue Commerciale Xinghai Bay 211, Conakry, Guinée',
        },
        phones: { order: '+224614865742', reservation: '+224611081542' },
        // Pinned from the Plus Code supplied by the owner: J952+29 Conakry
        // (full code 6CX8J952+29), which decodes to the coordinates below.
        plusCode: '6CX8J952+29',
        map: 'https://maps.google.com/maps?q=9.607563,-13.649062&z=17&output=embed',
        mapLink: 'https://maps.app.goo.gl/nrQhdkbfyPGWUiiu7',
        lat: 9.607563,
        lng: -13.649062,
        coordsConfirmed: true,
        // Not supplied for this branch. Left null rather than copied from Egypt,
        // whose fees are in EGP and priced for a different city.
        delivery: null,
        payments: null,
        menuId: 'gn',
        // The menu is loaded, but delivery pricing and accepted payment methods
        // have not been supplied, so a delivery fee cannot be computed. The
        // catalogue is browsable and orders are taken by phone until they are.
        online: false,
        social: {},
    },
};

/** Display order for the picker and the header switcher. */
const COUNTRY_ORDER = ['eg', 'gn'];

/** Every language any branch serves, for loading the right font sets. */
const ALL_LANGUAGES = ['en', 'ar', 'zh', 'fr'];

function getCountry(code) {
    return COUNTRIES[code] || null;
}

/** Does this branch serve this language? */
function countrySpeaks(country, lang) {
    return !!country && country.languages.indexOf(lang) !== -1;
}

/**
 * Format an amount in the branch's currency, in the given language.
 * Guinean franc amounts are large and conventionally grouped.
 */
function formatMoney(country, lang, amount) {
    const c = country.currency;
    const sym = c.symbol[lang] || c.code;
    const n = c.code === 'GNF'
        ? Math.round(amount).toLocaleString('fr-FR')
        : String(amount);
    return (c.position[lang] || 'before') === 'before' ? sym + ' ' + n : n + ' ' + sym;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COUNTRIES, COUNTRY_ORDER, ALL_LANGUAGES, getCountry, countrySpeaks, formatMoney };
}
