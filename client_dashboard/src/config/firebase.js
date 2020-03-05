import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCjb2fPrOsQChECuhNTTm9kPx53Q2QfTOY",
    authDomain: "gai511.firebaseapp.com",
    databaseURL: "https://gai511.firebaseio.com",
    projectId: "gai511",
    storageBucket: "gai511.appspot.com",
    messagingSenderId: "8785018237",
    appId: "1:8785018237:web:ce0dad50726a4e9b9fe014",
    measurementId: "G-WGQYBXBZB8"
  };
firebase.initializeApp(config);

export default firebase;