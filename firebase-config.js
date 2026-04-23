/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║       Loongdingxuan Delivery System — Firebase Setup      ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * HOW TO SET UP (takes ~5 minutes):
 *
 * 1. Go to https://console.firebase.google.com/
 * 2. Click "Add project" → name it "loongdingxuan-delivery"
 * 3. Once created, click the </> Web icon to add a web app
 * 4. Copy the firebaseConfig values below from your Firebase console
 * 5. In your Firebase console:
 *    a. Build → Firestore Database → Create database (start in test mode)
 *    b. Build → Realtime Database → Create database (start in test mode)
 *    c. Build → Authentication → Sign-in method → Enable "Email/Password"
 *
 * GOOGLE MAPS API KEY:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create/select a project
 * 3. Enable "Maps JavaScript API" and "Geocoding API"
 * 4. Create an API key and paste it below
 *
 * ADMIN SETUP:
 * After creating your Firebase project, run this once in browser console
 * on admin.html to create the admin account:
 *   firebase.auth().createUserWithEmailAndPassword("your@email.com", "yourpassword")
 *
 * DRIVER SETUP:
 * Use admin.html → Drivers tab → "Add Driver" to create driver accounts.
 */

const FIREBASE_CONFIG = {
    apiKey:            "YOUR_API_KEY",
    authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL:       "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId:         "YOUR_PROJECT_ID",
    storageBucket:     "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId:             "YOUR_APP_ID"
};

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// Restaurant coordinates (Second New Cairo, Cairo)
const RESTAURANT_LAT = 30.0549375;
const RESTAURANT_LNG = 31.4924375;
const RESTAURANT_NAME = "Loongdingxuan";
const RESTAURANT_PHONE = "+201229873306";
const RESTAURANT_ADDRESS = "Loongdingxuan (龙鼎轩), Second New Cairo, Cairo Governorate, Egypt";

// Delivery settings
const DELIVERY_BASE_FEE_EGP   = 25;
const DELIVERY_PER_KM_EGP     = 5;
const MAX_DELIVERY_RADIUS_KM  = 20;
const ESTIMATED_PREP_MINUTES  = 30;
const ESTIMATED_DRIVE_MINUTES_PER_KM = 3;
