/* eslint-disable @next/next/no-img-element */
import { auth, provider } from '@/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import React from 'react'
import styles from './authService.module.css'

function AuthService() {
  const [user] = useAuthState(auth)

  return (
    <div className={styles.authService}>
      {user ? (
        <>
          <UserInfo user={user} />
          <SignOutButton />
        </>
      ) : (
        <SignInWithGoogle />
      )}
    </div>
  )
}

export default AuthService

// Googleアカウントでサインイン
function SignInWithGoogle() {
  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Error signing in: ', error)
    })
  }

  return (
    <button onClick={handleSignIn} className={styles.button}>
      Googleアカウントでサインイン
    </button>
  )
}

// Googleアカウントでサインアウト
function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()} className={styles.button}>
      サインアウト
    </button>
  )
}

// ユーザー情報
function UserInfo() {
  return (
    <div className={styles.userInfo}>
      <img src={auth.currentUser.photoURL} alt="" />
    </div>
  )
}
