// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQruph3ZTURMOWeHGSdEGyTYLt210EJ2E",
  authDomain: "flat-project-c0ca5.firebaseapp.com",
  projectId: "flat-project-c0ca5",
  storageBucket: "flat-project-c0ca5.appspot.com",
  messagingSenderId: "434023475955",
  appId: "1:434023475955:web:a426ed7f6105a03dfde586"


  
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db,app };
*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Hh2jEdqrrppiVg_ABw9NOiGMy8bD8AQ",
  authDomain: "flat-project-1ac7a.firebaseapp.com",
  projectId: "flat-project-1ac7a",
  storageBucket: "flat-project-1ac7a.appspot.com",
  messagingSenderId: "936956603489",
  appId: "1:936956603489:web:eee5f5da179d0b43044e20",
  measurementId: "G-S9L78CRYRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db,app, analytics };
