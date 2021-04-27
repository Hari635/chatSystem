// import * as firebase from 'firebase';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2Wfyk3yPlbH8Y58hvxGtQu__reRDBq0Y",
    authDomain: "chatsystem-bdfad.firebaseapp.com",
    projectId: "chatsystem-bdfad",
    storageBucket: "chatsystem-bdfad.appspot.com",
    messagingSenderId: "211699314787",
    appId: "1:211699314787:web:9bde1c196d751734de0856"
  };


const app=firebase.initializeApp(firebaseConfig)


const db=app.firestore();
const auth = firebase.auth();

export {db,auth}