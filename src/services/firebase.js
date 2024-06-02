import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAZ4ZTzrRWUmb_fdrdWwUcxraB7qtD4ap8",
    authDomain: "kotnotifications.firebaseapp.com",
    databaseURL: "https://kotnotifications-default-rtdb.firebaseio.com",
    projectId: "kotnotifications",
    storageBucket: "kotnotifications.appspot.com",
    messagingSenderId: "258866079344",
    appId: "1:258866079344:web:486192b21c16a18178b6b5",
    measurementId: "G-H5NWBY31H6"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  export { database };
