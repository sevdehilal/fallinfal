// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase proje yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyDGkEHocNKuolRxtZFxjUMr7j7h_Zz6JRs",
  authDomain: "fallinfal-bf002.firebaseapp.com",
  projectId: "fallinfal-bf002",
  storageBucket: "fallinfal-bf002.firebasestorage.app",
  messagingSenderId: "535388376937",
  appId: "1:535388376937:web:341cc3f6b70aa9c6cb37f8",
  measurementId: "G-7X04X8MEHS"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini başlat
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, firestore, analytics };
