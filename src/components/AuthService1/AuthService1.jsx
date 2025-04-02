import React from 'react'
import { auth } from '@/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserInfo from './UserInfo1'
import SignInWithGoogle from './SignInWithGoogle1'
import styles from './AuthService1.module.css'

export default function AuthService() {
  const [user] = useAuthState(auth)

  return (
    <div className={styles.authService}>
      {user ? <UserInfo user={user} /> : <SignInWithGoogle />}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </div>
  )
}
