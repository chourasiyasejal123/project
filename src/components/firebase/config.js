// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZdy1xTO2QwSawacgXdsKvzB2cfmjei9o",
  authDomain: "samriddhimart-f065c.firebaseapp.com",
  projectId: "samriddhimart-f065c",
  storageBucket: "samriddhimart-f065c.firebasestorage.app",
  messagingSenderId: "80082002672",
  appId: "1:80082002672:web:dc260237c385c2976e5835"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };