import React, { useState } from 'react'
import { auth, provider } from '@/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import styles from './authService.module.css'

function AuthService() {
  const [user] = useAuthState(auth)
  return (
    <div className={styles.authService}>
      {user ? <UserInfo user={user} /> : <SignInWithGoogle />}
    </div>
  )
}

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

function UserInfo({ user }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className={styles.userInfo}>
      <img src={user.photoURL} alt="User Profile" onClick={toggleDropdown} />
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}>
        <p>いいねした投稿</p>
        <button onClick={() => auth.signOut()} className={styles.button}>
          サインアウト
        </button>
      </div>
    </div>
  )
}

export default AuthService
