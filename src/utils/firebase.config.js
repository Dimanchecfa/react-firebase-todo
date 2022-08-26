import { getFirestore } from "@firebase/firestore";
import firebase from "firebase/compat/app";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "react-firebase-todo-1ffa7",
  storageBucket: "react-firebase-todo-1ffa7.appspot.com",
  messagingSenderId: "419663451371",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-KEVE36MK8P",
});
export default app;
export const db = getFirestore();
