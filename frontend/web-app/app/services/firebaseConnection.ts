import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC-2XqAhONquu6smU95Ag9_bEUAOtO9MDg",
  authDomain: "webcarros-52b75.firebaseapp.com",
  projectId: "webcarros-52b75",
  storageBucket: "webcarros-52b75.appspot.com",
  messagingSenderId: "456668528518",
  appId: "1:456668528518:web:f143fb1773f391407ff607"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
