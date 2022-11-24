// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvgw82GNFsRH1yer_EZ6rgg3tyq8LtBXo",
  authDomain: "sydney-12b9d.firebaseapp.com",
  projectId: "sydney-12b9d",
  storageBucket: "sydney-12b9d.appspot.com",
  messagingSenderId: "758848991363",
  appId: "1:758848991363:web:68828cc6415fc8a7536bb6",
  measurementId: "G-MQ9F1R1716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
