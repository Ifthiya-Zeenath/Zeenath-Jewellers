/**
 * ============================================================================
 * Firebase Initialization & Configuration Module
 * ============================================================================
 * This module configures the Firebase Web SDK using environment variables from
 * Vite (`import.meta.env`). It initializes Firebase Authentication and Cloud
 * Firestore.
 *
 * NOTE ON CLOUD STORAGE:
 * Cloud Storage is currently NOT enabled (Spark plan). The structure is designed
 * so `getStorage` can be imported and initialized here without refactoring.
 * ============================================================================
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// Read configuration values strictly from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

/**
 * Helper function to check if Firebase environment variables are provided.
 */
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
  );
};

// Singleton App Initialization
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Service Instances
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// FUTURE CLOUD STORAGE INITIALIZATION PLACEHOLDER (When upgraded from Spark plan):
// import { getStorage, FirebaseStorage } from 'firebase/storage';
// export const storage: FirebaseStorage = getStorage(app);

export default app;
