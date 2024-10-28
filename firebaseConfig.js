import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAMClWGguKQ6jD63ZIHr2EZJCF5CzhgzLs',
  authDomain: 'kakuta-tech-blog.firebaseapp.com',
  projectId: 'kakuta-tech-blog',
  storageBucket: 'kakuta-tech-blog.appspot.com',
  messagingSenderId: '167476717749',
  appId: '1:167476717749:web:5e001798584c908c06f6fc',
  measurementId: 'G-MJC3MXXLBG',
}

// Firebaseの初期化
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }
