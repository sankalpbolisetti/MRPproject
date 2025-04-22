// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth,setPersistence,browserLocalPersistence } from "firebase/auth";

// Your Firebase configuration
// Replace these values with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyAbtvl0J47hQhydfO5pE6DRFyQrwKFKl2k",
    authDomain: "datascience-pathfinder-bfb93.firebaseapp.com",
    projectId: "datascience-pathfinder-bfb93",
    storageBucket: "datascience-pathfinder-bfb93.firebasestorage.app",
    messagingSenderId: "823406495598",
    appId: "1:823406495598:web:5ec6f4cd792b881682e37f",
    measurementId: "G-ZP79CXNS53"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export { auth };
export default app;