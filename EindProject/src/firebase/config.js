import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCNKmSLQn9kiyvm8uiNjSrvR-NEnw0oGHs",
  authDomain: "music-gurus.firebaseapp.com",
  projectId: "music-gurus",
  storageBucket: "music-gurus.appspot.com",
  messagingSenderId: "371337371411",
  appId: "1:371337371411:web:3408328d13f3bc48e784e6"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }