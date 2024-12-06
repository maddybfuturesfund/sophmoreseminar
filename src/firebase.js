// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2hOOgDPBBSPVSrS2K_0Dv6-AZS6QZsMc",
  authDomain: "uproot-9ad92.firebaseapp.com",
  projectId: "uproot-9ad92",
  storageBucket: "uproot-9ad92.firebasestorage.app",
  messagingSenderId: "738191764560",
  appId: "1:738191764560:web:ca8ff1a712c6a28d4ef555",
  measurementId: "G-PDYXEN6MR4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
