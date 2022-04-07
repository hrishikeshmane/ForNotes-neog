import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQbeCgt-f2dMjabxECIz5vMSsUkdQmePs",
  authDomain: "notes-app-ab312.firebaseapp.com",
  projectId: "notes-app-ab312",
  storageBucket: "notes-app-ab312.appspot.com",
  messagingSenderId: "680880217579",
  appId: "1:680880217579:web:0ff9178243c982f4714dae",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

const provider = new GoogleAuthProvider();

export { auth, db, provider, firebaseApp };
