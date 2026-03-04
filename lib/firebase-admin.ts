import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'gen-lang-client-0514745713',
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
