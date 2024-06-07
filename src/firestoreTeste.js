// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAajtyRsIfOhO46wVkwk99GD8zPgRu6k5E",
  authDomain: "firestore-b6f6a.firebaseapp.com",
  projectId: "firestore-b6f6a",
  storageBucket: "firestore-b6f6a.appspot.com",
  messagingSenderId: "361934641326",
  appId: "1:361934641326:web:794d3ab27167b70f22353f",
  measurementId: "G-R3RS2F2E9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}