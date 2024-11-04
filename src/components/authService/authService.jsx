import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, provider } from '@/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import styles from './authService.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faGear,
  faHeart,
  faRightToBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import googleIcon from '@/public/images/googleIcon.png'

function AuthService() {
  const [user] = useAuthState(auth)
  return (
    <div className={styles.authService}>
      {user ? <UserInfo user={user} /> : <SignInWithGoogle />}
    </div>
  )
}

function SignInWithGoogle() {
  const [showPopup, setShowPopup] = useState(false)

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Error signing in: ', error)
    })
  }

  const togglePopup = () => {
    setShowPopup((prev) => !prev)
  }

  return (
    <>
      <button onClick={togglePopup} className={styles.button}>
        <FontAwesomeIcon icon={faRightToBracket} className={styles.icon} />
        Log in
      </button>
      {showPopup && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>KAKUTA TECH BLOG</h3>
            <p>ログインして投稿を管理しましょう</p>
            <button onClick={handleSignIn} className={styles.googleButton}>
              <Image
                src={googleIcon}
                alt="googleでログイン"
                width={18}
                height={18}
              />
              <span>Googleでログイン</span>
            </button>
            <p className={styles.noAccountText}>
              Googleアカウントをお持ちでない方
            </p>
          </div>
        </div>
      )}
    </>
  )
}

function UserInfo({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = useCallback(() => {
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
      <Image
        src={user.photoURL}
        alt="User Icon"
        onClick={toggleDropdown}
        width={18}
        height={18}
      />
      {isOpen && (
        <div className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}>
          <Link href="/">
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            マイページ
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            いいねした投稿
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faBookmark} className={styles.icon} />
            ブックマーク
          </Link>
          <Link href="/" className={styles.lastLink}>
            <FontAwesomeIcon icon={faGear} className={styles.icon} />
            アカウント設定
          </Link>
          <button onClick={() => auth.signOut()} className={styles.button}>
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthService
