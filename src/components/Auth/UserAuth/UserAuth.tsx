import React from 'react'
import { auth } from '@/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserInfo from '../UserInfo/UserInfo'
import SignInWithGoogle from '../SignInWithGoogle/SignInWithGoogle'
import styles from './UserAuth.module.css'

const UserAuth: React.FC = () => {
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

export default UserAuth
