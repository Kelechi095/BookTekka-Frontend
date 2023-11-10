
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "booktekka-40ceb.firebaseapp.com",
  projectId: "booktekka-40ceb",
  storageBucket: "booktekka-40ceb.appspot.com",
  messagingSenderId: "33971364759",
  appId: "1:33971364759:web:2a7838627f87ea47d9dad2"
};

const app = initializeApp(firebaseConfig);