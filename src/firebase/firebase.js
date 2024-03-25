// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-u-9exbDUvNg-jp02bKrY8q9Cg_P-w0c",
  authDomain: "camping-417715.firebaseapp.com",
  projectId: "camping-417715",
  storageBucket: "camping-417715.appspot.com",
  messagingSenderId: "820652900080",
  appId: "1:820652900080:web:e53785c259452a09c24c35",
  measurementId: "G-9F8HCJV36F",
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
export const analytics = getAnalytics(db);
