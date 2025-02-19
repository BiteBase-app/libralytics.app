import * as admin from 'firebase-admin';
import { getApp, initializeApp } from 'firebase-admin/app';

const createFirebaseApp = () => {
  try {
    return getApp();
  } catch (e) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    return initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
};

createFirebaseApp();
