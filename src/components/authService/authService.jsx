import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, provider } from '@/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './authService.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faGear,
  faHeart,
  faRightToBracket,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import googleIcon from '@/public/images/googleIcon.png'

function AuthService() {
  const [user] = useAuthState(auth)

  return (
    <div className={styles.authService}>
      {user ? <UserInfo user={user} /> : <SignInWithGoogle />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </div>
  )
}

function SignInWithGoogle() {
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')

  const handleAuthAction = async () => {
    setError('')
    try {
      await signInWithPopup(auth, provider)
      toast.success('ログインしました')
    } catch (error) {
      setError(
        `エラーが発生しました。もう一度やり直してください。: ${error.message}`,
      )
    }
  }

  const togglePopup = () => {
    setShowPopup((prev) => !prev)
    setError('')
  }

  return (
    <>
      <button onClick={togglePopup} className={styles.loginButton}>
        <FontAwesomeIcon icon={faRightToBracket} className={styles.icon} />
        Log in
      </button>
      {showPopup && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={togglePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>KAKUTA TECH BLOG</h3>
            <p>ログインして記事を保存したり、コメントをしましょう。</p>
            <button onClick={handleAuthAction} className={styles.googleButton}>
              <Image
                src={googleIcon}
                alt="Googleでログイン"
                width={18}
                height={18}
              />
              <span>Googleでログイン</span>
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
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
          <button onClick={() => auth.signOut()} className={styles.loginButton}>
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthService
