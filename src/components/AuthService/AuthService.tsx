import React from 'react'
import { auth } from '@/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserInfo from './UserInfo'
import SignInWithGoogle from './SignInWithGoogle'
import styles from './AuthService.module.css'

const AuthService: React.FC = () => {
  const [user] = useAuthState(auth)

  return (
    <div className={styles['authService']}>
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

export default AuthService
