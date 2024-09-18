import { FirebaseOptions, getApps, initializeApp } from "firebase/app";

import { Analytics, getAnalytics, isSupported } from "firebase/analytics";

const options: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(options) : getApps()[0];

/**
 * Gets the Firebase Analytics instance.
 *
 * @returns The Firebase Analytics instance if supported, null otherwise.
 */
async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(firebaseApp);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export const analytics = getAnalyticsInstance();

export default firebaseApp;
