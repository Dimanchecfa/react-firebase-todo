
import firebase from "firebase/compat/app";
import { getFirestore } from  "@firebase/firestore";

const app =firebase.initializeApp( {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-firebase-todo-1ffa7.firebaseapp.com",
  projectId: "react-firebase-todo-1ffa7",
  storageBucket: "react-firebase-todo-1ffa7.appspot.com",
  messagingSenderId: "419663451371",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-KEVE36MK8P"
});

export default app;
export const db = getFirestore();


