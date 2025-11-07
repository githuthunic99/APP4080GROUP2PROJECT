// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBijcnaTYNZRn2u2wWE7lyUMCcCsfTo6FY",
  authDomain: "app4080group2project.firebaseapp.com",
  projectId: "app4080group2project",
  storageBucket: "app4080group2project.firebasestorage.app",
  messagingSenderId: "665369119153",
  appId: "1:665369119153:web:3cf2cfebcd554312ffd590",
  measurementId: "G-6Y73049YEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);