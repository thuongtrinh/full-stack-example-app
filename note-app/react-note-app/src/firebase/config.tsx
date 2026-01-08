// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your-key",
  authDomain: "your-key",
  projectId: "react-app-tx",
  storageBucket: "react-app-tx.firebasestorage.app",
  messagingSenderId: "your-key",
  appId: "your-key",
  measurementId: "G-your-key",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authentication = getAuth(app);

export { app, analytics, authentication };
