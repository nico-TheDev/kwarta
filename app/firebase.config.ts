import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Prevent double-init in hot reload; suppress errors when .env.local is absent
let app: ReturnType<typeof initializeApp>;
let db: ReturnType<typeof initializeFirestore>;
let storage: ReturnType<typeof getStorage>;
let auth: ReturnType<typeof getAuth>;

try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = initializeFirestore(app, {});
    storage = getStorage(app);
    auth = getAuth(app);
} catch (e) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn('[Firebase] Initialization skipped — set NEXT_PUBLIC_* vars in .env.local');
    }
}

export { app, db, storage, auth };
