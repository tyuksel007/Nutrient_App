import * as firebase from 'firebase'
import 'firebase/firestore'

// var firebaseConfig = {
//     apiKey: "AIzaSyCrjyuI98IfCg_6h_nFBPVlvReRPb_Y7eo",
//     authDomain: "ingredient-app-38e26.firebaseapp.com",
//     databaseURL: "https://ingredient-app-38e26.firebaseio.com",
//     projectId: "ingredient-app-38e26",
//     storageBucket: "ingredient-app-38e26.appspot.com",
//     messagingSenderId: "692218568917",
//     appId: "1:692218568917:web:161d5794e779fe2d88c25c",
//     measurementId: "G-JLLMVJ8FY8"
//   };
  var firebaseConfig = {
    apiKey: "AIzaSyCkJiU2ghRSG1Brk7xkre6NPlwIkpAiLFU",
    authDomain: "healbar-c4529.firebaseapp.com",
    databaseURL: "https://healbar-c4529.firebaseio.com",
    projectId: "healbar-c4529",
    storageBucket: "healbar-c4529.appspot.com",
    messagingSenderId: "49851345208",
    appId: "1:49851345208:web:ca72f58cc9afb872b039cd",
    measurementId: "G-0Y46DR7VY7"
  };
 // Initialize Firebase
export const Firebase = firebase.initializeApp(firebaseConfig);
  
export const db = firebase.firestore()