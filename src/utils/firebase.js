// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxo7qG6h5hkyf9dBKYuWrOODKQKJQ5his",
  authDomain: "netflix-gpt-priyanshugour70.firebaseapp.com",
  projectId: "netflix-gpt-priyanshugour70",
  storageBucket: "netflix-gpt-priyanshugour70.appspot.com",
  messagingSenderId: "365892666154",
  appId: "1:365892666154:web:9e5c3fc638c5cffca91453",
  measurementId: "G-W1YS7C8N02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);