// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTgVP7bNBl7g7b-SStxPOd48BcPWJd5wc",
  authDomain: "react-auth-project-6f71c.firebaseapp.com",
  projectId: "react-auth-project-6f71c",
  storageBucket: "react-auth-project-6f71c.firebasestorage.app",
  messagingSenderId: "777346672496",
  appId: "1:777346672496:web:587208cddde71b029dd1b5",
  measurementId: "G-B7CTW297CX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
