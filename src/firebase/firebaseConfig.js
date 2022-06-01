// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBm6l9ZPGJRSjU9I0R0DtImscXojrlKhuU",
  authDomain: "monkey-blogging-d969d.firebaseapp.com",
  projectId: "monkey-blogging-d969d",
  storageBucket: "monkey-blogging-d969d.appspot.com",
  messagingSenderId: "782456975630",
  appId: "1:782456975630:web:d05a5e020bbad267cfe75f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
