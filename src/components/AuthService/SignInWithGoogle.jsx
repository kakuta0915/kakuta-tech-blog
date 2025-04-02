// Googleでログインする機能
import React, { useState } from 'react'
import Image from 'next/image'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/firebaseConfig'
import { toast } from 'react-toastify'
import googleIcon from '/public/images/googleIcon.png'
import styles from './AuthService.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function SignInWithGoogle() {
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
      toast.error('ログインに失敗しました')
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
            <button
              className={styles.closeButton}
              onClick={togglePopup}
              aria-label="close"
            >
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
