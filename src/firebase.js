// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1viSHgOg8eVAR8SutqpCMzavD0B42uaI",
  authDomain: "kamas-movie-db.firebaseapp.com",
  projectId: "kamas-movie-db",
  storageBucket: "kamas-movie-db.firebasestorage.app",
  messagingSenderId: "677876571081",
  appId: "1:677876571081:web:c09b55631f91b525fce618",
  measurementId: "G-FEH09LWNZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);