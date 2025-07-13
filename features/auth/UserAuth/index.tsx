'use client'

import React from 'react'
import { auth } from '@/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './index.module.css'
import UserInfo from '../UserInfo'
import SignInWithGoogle from '../SignInWithGoogle'
import { SimpleUserProps } from '@/types'

const UserAuth: React.FC = () => {
  const [user] = useAuthState(auth)

  // user が null でなければ SimpleUserProps 型に変換
  const simpleUser: SimpleUserProps | null = user
    ? {
        uid: user.uid,
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      }
    : null

  return (
    <div className={styles['authService']}>
      {simpleUser ? <UserInfo user={simpleUser} /> : <SignInWithGoogle />}
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
