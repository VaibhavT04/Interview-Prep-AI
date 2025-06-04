
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCehiC3c04FE98opOnnfGL-KYdiKwMeEDU",
    authDomain: "intelliprep-5c894.firebaseapp.com",
    projectId: "intelliprep-5c894",
    storageBucket: "intelliprep-5c894.firebasestorage.app",
    messagingSenderId: "915381763051",
    appId: "1:915381763051:web:f60b2e02363e88414ef7ae",
    measurementId: "G-JPG50SPH70"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)