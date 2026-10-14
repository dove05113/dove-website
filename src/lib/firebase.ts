import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJwoM4gOrpswsY38s75hO_HD6-XLFENzI",
  authDomain: "dove-website-570ef.firebaseapp.com",
  projectId: "dove-website-570ef",
  storageBucket: "dove-website-570ef.firebasestorage.app",
  messagingSenderId: "586666278381",
  appId: "1:586666278381:web:cb777d6837b7489b67bbe4",
  measurementId: "G-4X8NZGJVD0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export default app;
