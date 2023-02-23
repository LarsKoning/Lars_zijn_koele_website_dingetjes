import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5UoypUb8zxO6QK9L8paIy1pjO5_ga5CM",
  authDomain: "udemy-vue-firebase-site-b5b69.firebaseapp.com",
  projectId: "udemy-vue-firebase-site-b5b69",
  storageBucket: "udemy-vue-firebase-site-b5b69.appspot.com",
  messagingSenderId: "828083493691",
  appId: "1:828083493691:web:88b12bb94909e88ea9751e"
};

firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp, projectAuth }