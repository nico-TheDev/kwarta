// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    CACHE_SIZE_UNLIMITED,
    initializeFirestore,
    enableIndexedDbPersistence
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// SERVICES

export const db = initializeFirestore(app, {});

// if (typeof window) {
//     enableIndexedDbPersistence(db)
//         .then(() => console.log('Enabled offline persistence'))
//         .catch((error) => {
//             if (error.code == 'failed-precondition') {
//                 // Multiple tabs open, persistence can only be enabled
//                 // in one tab at a a time.
//                 // ...
//             } else if (error.code == 'unimplemented') {
//                 // The current browser does not support all of the
//                 // features required to enable persistence
//                 // ...
//             }
//         });
// }

export const storage = getStorage(app);
export const auth = getAuth(app);

