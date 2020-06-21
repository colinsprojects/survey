import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAMb4eTvFHhadN6aeQLweQRa-cV0IvR0hk",
    authDomain: "survey-4bc86.firebaseapp.com",
    databaseURL: "https://survey-4bc86.firebaseio.com",
    projectId: "survey-4bc86",
    storageBucket: "survey-4bc86.appspot.com",
    messagingSenderId: "947115291134",
    appId: "1:947115291134:web:1b71e985239f0142fc10af",
    measurementId: "G-472PY3HE79"
  });
  // Initialize Firebase

  export const db = firebaseApp.firestore();

