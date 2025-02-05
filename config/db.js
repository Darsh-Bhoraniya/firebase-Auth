import admin from 'firebase-admin'
import serviceAccount from '../z-zone-7c062-firebase-adminsdk-fbsvc-a75da121ea.json' assert { type: 'json' };
import dotenv from 'dotenv'
dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db, admin };
