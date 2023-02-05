import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSqqpXfm_RR0ILESsmx60AhehrEdf6Ph8",
  authDomain: "rsclone-2023.firebaseapp.com",
  projectId: "rsclone-2023",
  storageBucket: "rsclone-2023.appspot.com",
  messagingSenderId: "516913293857",
  appId: "1:516913293857:web:76b69224c1c22427ed9160"
};

const myApp = initializeApp(firebaseConfig);
export const myAuth = getAuth(myApp);
