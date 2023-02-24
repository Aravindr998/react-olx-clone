import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCDMqgkqtXn9QqMqpS6EzY3l6-pDuAFi1s",
  authDomain: "olx-clone-8078f.firebaseapp.com",
  projectId: "olx-clone-8078f",
  storageBucket: "olx-clone-8078f.appspot.com",
  messagingSenderId: "963594793279",
  appId: "1:963594793279:web:128d50e5ec60f8a1fd238a",
  measurementId: "G-097N8GC8W5"
}
const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)
export default firebase
