// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-554ac.firebaseapp.com",
  projectId: "mern-estate-554ac",
  storageBucket: "mern-estate-554ac.appspot.com",
  messagingSenderId: "743911115570",
  appId: "1:743911115570:web:1e6bc477948e593db8652b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);