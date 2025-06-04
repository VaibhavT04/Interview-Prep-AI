import {initializeApp, getApps, cert} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore"
import {getAuth} from "firebase-admin/auth";

const initFirebaseAdmin = () => {
    const apps = getApps()

    if(!apps.length){     //Because Firebase allows only ONE admin instance per project in server code. Starting it twice causes errors.
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            })
        })
    }
    return {
        auth: getAuth(),
        db: getFirestore()
    }
}

export const { auth, db } = initFirebaseAdmin()