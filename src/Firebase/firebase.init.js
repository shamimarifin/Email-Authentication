// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATkUiv9Rbf2trNixDjj8WLYRhuPadLy8M",
  authDomain: "email-auth-password-3dbfb.firebaseapp.com",
  projectId: "email-auth-password-3dbfb",
  storageBucket: "email-auth-password-3dbfb.firebasestorage.app",
  messagingSenderId: "426920888670",
  appId: "1:426920888670:web:532452ebd29923bd69e7cf",
  measurementId: "G-3LYVN9S8NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)