// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs-4Gs0IqtXrhz7ryX8Zn5iXDhG_pcrf4",
  authDomain: "ltcapp-26384.firebaseapp.com",
  projectId: "ltcapp-26384",
  storageBucket: "ltcapp-26384.firebasestorage.app",
  messagingSenderId: "372418942040",
  appId: "1:372418942040:web:fc2c0b090bd0555c4ce62d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };