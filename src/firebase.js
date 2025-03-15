// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyA1viSHgOg8eVAR8SutqpCMzavD0B42uaI",
//   authDomain: "kamas-movie-db.firebaseapp.com",
//   projectId: "kamas-movie-db",
//   storageBucket: "kamas-movie-db.firebasestorage.app",
//   messagingSenderId: "677876571081",
//   appId: "1:677876571081:web:c09b55631f91b525fce618",
//   measurementId: "G-FEH09LWNZY"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBhxQRHAahmHfhaGEDzQPbSsmyQUQcX3pw",
  authDomain: "your-movie-db-2b49c.firebaseapp.com",
  projectId: "your-movie-db-2b49c",
  storageBucket: "your-movie-db-2b49c.firebasestorage.app",
  messagingSenderId: "1051500149618",
  appId: "1:1051500149618:web:edd33ebe3367b4c38b3beb",
  measurementId: "G-6KVK2LT2CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);