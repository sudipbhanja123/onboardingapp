// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyATc3-3aigIdJmEWO85E-eBgryfpAloQwY",
  authDomain: "onboarding-6ff93.firebaseapp.com",
  projectId: "onboarding-6ff93",
  storageBucket: "onboarding-6ff93.appspot.com",
  messagingSenderId: "195924013041",
  appId: "1:195924013041:web:370978edd151b448839e50",
  measurementId: "G-JJSHCS9T1S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, googleProvider, database };
