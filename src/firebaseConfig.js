// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHGL9LDXa9T1GbuffqYLaGqgpNZObiocg",
  authDomain: "reconstrusul-aba91.firebaseapp.com",
  projectId: "reconstrusul-aba91",
  storageBucket: "reconstrusul-aba91.appspot.com",
  messagingSenderId: "937255657130",
  appId: "1:937255657130:web:59c015aab48b6a46543ad3",
  measurementId: "G-KHMGTYQHFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

// Exporte a instância do Firestore para usá-la em outros arquivos
export { db };