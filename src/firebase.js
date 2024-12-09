// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4-IdWpv7FdBLxETOYFaSaqqog4MDZbcE",
  authDomain: "fintrack-418b1.firebaseapp.com",
  projectId: "fintrack-418b1",
  storageBucket: "fintrack-418b1.firebasestorage.app",
  messagingSenderId: "374847126067",
  appId: "1:374847126067:web:f955f2ff302e531c6fc146",
  measurementId: "G-V569D4DL0B"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const dataBase = getFirestore(app)

export {
    dataBase,
    auth
}