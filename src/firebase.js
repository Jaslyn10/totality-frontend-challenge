import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvOGYy3ChogujKBeCq9ZQKoia-VMAelbI",
  authDomain: "property-rental-platform-8e169.firebaseapp.com",
  projectId: "property-rental-platform-8e169",
  storageBucket: "property-rental-platform-8e169.appspot.com",
  messagingSenderId: "576271888719",
  appId: "1:576271888719:web:daaa5f404a062d9430153a",
  measurementId: "G-YWXWCKL1F4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
const analytics = getAnalytics(app);
