import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "inthenow-authentication.firebaseapp.com",
    projectId: "inthenow-authentication",
    storageBucket: "inthenow-authentication.appspot.com",
    messagingSenderId: "909788299518",
    appId: "1:909788299518:web:0734c0a9362a946abe65af",
    measurementId: "G-FEX5ETJPF6"
  };

  const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
