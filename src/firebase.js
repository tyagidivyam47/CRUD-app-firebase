// import firebase from 'firebase/app';
import "firebase/compat/database";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCT39zEIE1WogRA4z9WzLYgTzr5V7lslfg",
  authDomain: "student-crud-6da10.firebaseapp.com",
  databaseURL: "https://student-crud-6da10-default-rtdb.firebaseio.com",
  projectId: "student-crud-6da10",
  storageBucket: "student-crud-6da10.appspot.com",
  messagingSenderId: "389044487707",
  appId: "1:389044487707:web:a2b9cf7c3050367740dabe",
};

const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB;
