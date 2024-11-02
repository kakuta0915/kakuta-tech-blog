import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  const dropdownRef = useRef(null)

  const toggleDropdown = useCallback(() => {
    console.log('あああああああ')
    setIsOpen((prev) => !prev)
  }, [])

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  return (
    <div className={styles.userInfo} ref={dropdownRef}>
      <img src={user.photoURL} alt="User Icon" onClick={toggleDropdown} />
      {isOpen && (
        <div className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}>
          <p>いいねした投稿</p>
          <button onClick={() => auth.signOut()} className={styles.button}>
            サインアウト
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthService
