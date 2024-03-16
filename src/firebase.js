// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeX4QzzCgUlwict1Nqd_XJ_fia3kEKt-g",
  authDomain: "project-164cf.firebaseapp.com",
  projectId: "project-164cf",
  storageBucket: "project-164cf.appspot.com",
  messagingSenderId: "567242443576",
  appId: "1:567242443576:web:95aa13b4249880d1024fcd",
  measurementId: "G-0BQ8K72829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);