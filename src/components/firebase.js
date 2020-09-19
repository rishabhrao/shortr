/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBShxNjA9M-b8mhBnyGG9wdsIx1fLmteeI",
  authDomain: "shortr-cf.firebaseapp.com",
  databaseURL: "https://shortr-cf.firebaseio.com",
  projectId: "shortr-cf",
  storageBucket: "shortr-cf.appspot.com",
  messagingSenderId: "732981391675",
  appId: "1:732981391675:web:330ac0b7e1bb338a48c71e",
  measurementId: "G-WKGTXVHRGL",
});

const db = firebaseApp.firestore();

export default db;
