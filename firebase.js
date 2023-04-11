import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyBvoy_Uj7g5cbuyF-0lNiKCTmTEGViBSJE",
    authDomain: "vdesigners-5b906.firebaseapp.com",
    projectId: "vdesigners-5b906",
    storageBucket: "vdesigners-5b906.appspot.com",
    messagingSenderId: "629774763692",
    appId: "1:629774763692:web:c565b8b650d190da950109",
    measurementId: "G-7NEB7W4DBG",
  };
initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();
export { db, storage };