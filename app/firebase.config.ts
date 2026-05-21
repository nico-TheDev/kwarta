import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

type FirebaseServices = {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;
    storage: FirebaseStorage;
};

declare global {
    // Survives Next.js dev HMR without re-initializing Firestore
    var __kwartaFirebase: FirebaseServices | undefined;
}

function initFirebase(): FirebaseServices {
    if (globalThis.__kwartaFirebase) {
        return globalThis.__kwartaFirebase;
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    // Use getFirestore only — do not call initializeFirestore on an existing app (breaks listeners on HMR)
    const db = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);

    globalThis.__kwartaFirebase = { app, db, auth, storage };
    return globalThis.__kwartaFirebase;
}

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;

try {
    const services = initFirebase();
    app = services.app;
    db = services.db;
    auth = services.auth;
    storage = services.storage;
} catch (e) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn('[Firebase] Initialization skipped — set NEXT_PUBLIC_* vars in .env.local');
    }
}

export { app, db, auth, storage };
