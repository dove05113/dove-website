import { cert, getApps, initializeApp } from "firebase-admin/app";

import { getAuth } from "firebase-admin/auth";

const existingApp = getApps();

const adminApp =
  existingApp.length > 0
    ? existingApp[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });

export const adminAuth = getAuth(adminApp);
