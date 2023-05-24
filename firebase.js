import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyApDZn5sy4vmSefFE0wLHCK0R-SVIMOL9s",
  authDomain: "imagegeneration-8849f.firebaseapp.com",
  projectId: "imagegeneration-8849f",
  storageBucket: "imagegeneration-8849f.appspot.com",
  messagingSenderId: "634889050295",
  appId: "1:634889050295:web:4262692e6dcf0bee9b5532",
  measurementId: "G-YYQG3EDGF4"
  };
initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();
export { db, storage };