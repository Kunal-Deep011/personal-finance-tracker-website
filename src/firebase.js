// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, Firestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpccH3nLjdFxMtAb_Y7TNHeRcqVCi3Zs0",
  authDomain: "personal-finace-tracker.firebaseapp.com",
  projectId: "personal-finace-tracker",
  storageBucket: "personal-finace-tracker.appspot.com",
  messagingSenderId: "452727029599",
  appId: "1:452727029599:web:2baf8aca360851ffbb00ea",
  measurementId: "G-ETR89N8CPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc};
