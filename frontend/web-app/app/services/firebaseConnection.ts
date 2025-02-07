import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRESTORE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRESTORE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRESTORE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIRESTORE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRESTORE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIRESTORE_APPID,
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
