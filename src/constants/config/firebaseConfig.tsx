import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDcvqyU5q0geB1VmgDSYZ7qjliPnnB8p0E",
    authDomain: "tawsila-357b9.firebaseapp.com",
    projectId: "tawsila-357b9",
    storageBucket: "tawsila-357b9.appspot.com",
    messagingSenderId: "38370727360",
    appId: "1:38370727360:web:30056200f12ac380102425",
    measurementId: "G-34LHRTWCSR"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);