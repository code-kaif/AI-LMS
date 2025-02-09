// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN0ZSoPP-7JnU6wPWVKujNUlYevHWFJTE",
  authDomain: "coaching-app-1391c.firebaseapp.com",
  projectId: "coaching-app-1391c",
  storageBucket: "coaching-app-1391c.firebasestorage.app",
  messagingSenderId: "991757996266",
  appId: "1:991757996266:web:7f79d9ea040edb4d1bc793",
  measurementId: "G-43CZ0MDE59",
};

// Add type declaration for global expo
declare global {
  var expo: any;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if we're running in Expo environment
const auth = global.expo
  ? initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    })
  : getAuth(app);

const db = getFirestore(app);

export { auth, db };
