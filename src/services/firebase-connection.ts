import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmUd_L8U7LlwBaNiWX5gzH11OZuncCN_w",
  authDomain: "tarefasplus-b6718.firebaseapp.com",
  projectId: "tarefasplus-b6718",
  storageBucket: "tarefasplus-b6718.firebasestorage.app",
  messagingSenderId: "405855864030",
  appId: "1:405855864030:web:8e294e50ae87c0da3fae4f",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
