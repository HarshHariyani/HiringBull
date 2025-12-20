// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQbXgvW7gaLVjRj3fzBgrygO_BwNGfiwY",
  authDomain: "scale8ai.firebaseapp.com",
  projectId: "scale8ai",
  storageBucket: "scale8ai.firebasestorage.app",
  messagingSenderId: "197002889333",
  appId: "1:197002889333:web:cb5b5b3bc4211c9c75103c",
  measurementId: "G-ZS5VPHCDWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);