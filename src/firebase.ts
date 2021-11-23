import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmXpA3J0nw07sstVup8QAElilOjO0NXzU",
  authDomain: "dice-tracker.firebaseapp.com",
  projectId: "dice-tracker",
  storageBucket: "dice-tracker.appspot.com",
  messagingSenderId: "373344963043",
  appId: "1:373344963043:web:954f687938c8a8913378d6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
