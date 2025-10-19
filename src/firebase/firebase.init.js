// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_apiKey || "AIzaSyDCqB0E8xaiPtkU-FUsCP_9-wPrs27xbqk",
  authDomain: import.meta.env.VITE_authDomain || "project-real-state-assi-12.firebaseapp.com",
  projectId: import.meta.env.VITE_projectId || "project-real-state-assi-12",
  storageBucket: import.meta.env.VITE_storageBucket || "project-real-state-assi-12.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_messagingSenderId || "627754908129",
  appId: import.meta.env.VITE_appId || "1:627754908129:web:062f21b7faad8cedadbaa0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);