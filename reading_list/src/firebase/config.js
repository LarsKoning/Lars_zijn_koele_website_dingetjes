import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA32UVbg-DXRerEMsH09xUJH8k0TrxMduk",
  authDomain: "fir-9-practice-8ca6e.firebaseapp.com",
  projectId: "fir-9-practice-8ca6e",
  storageBucket: "fir-9-practice-8ca6e.appspot.com",
  messagingSenderId: "1088741644905",
  appId: "1:1088741644905:web:29bf3b6ddb986fde31a0f8"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }