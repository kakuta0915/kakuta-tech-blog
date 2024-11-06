import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, provider } from '@/firebaseConfig'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
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
  const [showOtherOptions, setShowOtherOptions] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Googleアカウントでのサインインを処理
  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Error signing in: ', error)
    })
  }

  // メールアドレスとパスワードを使ったサインイン
  const handleEmailSignIn = async () => {
    if (email.endsWith('@gmail.com')) {
      toast.error(
        'Googleのメールアドレスは使用できません。別のメールアドレスを入力してください。',
      )
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('ログインしました')
    } catch (error) {
      toast.error(`エラーが発生しました: ${error.message}`)
    }
  }

  // メールアドレスとパスワードで新しいアカウントを作成
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('新規登録しました')
    } catch (error) {
      toast.error(`エラーが発生しました: ${error.message}`)
    }
  }

  // ポップアップの表示・非表示を切り替えるための関数
  const togglePopup = () => {
    setShowPopup((prev) => !prev)
    setShowOtherOptions(false)
    setShowSignUp(false)
    setEmail('')
    setPassword('')
  }

  // メールアドレスでのサインインを表示する関数
  const handleShowOtherOptions = () => {
    setShowOtherOptions(true)
    setShowSignUp(false)
  }

  // 新規登録画面を表示する関数
  const handleShowSignUp = () => {
    setShowSignUp(true)
    setShowOtherOptions(false)
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
            <button onClick={handleSignIn} className={styles.googleButton}>
              <Image
                src={googleIcon}
                alt="Googleでログイン"
                width={18}
                height={18}
              />
              <span>Googleでログイン</span>
            </button>

            <div className={styles.noAccountContents}>
              {!showOtherOptions && (
                <button
                  className={styles.noGoogleAccountButton}
                  onClick={handleShowOtherOptions}
                >
                  Googleアカウントをお持ちでない方
                </button>
              )}

              {!showSignUp && (
                <p className={styles.noAccountText}>
                  アカウントをお持ちでない方は
                  <button
                    className={styles.newRegistrationButton}
                    onClick={handleShowSignUp}
                  >
                    新規登録
                  </button>
                  から。
                </p>
              )}
            </div>

            {showOtherOptions && (
              <div className={styles.otherOptionsPopup}>
                <h4>メールでログイン</h4>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレス"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワード"
                />
                <button
                  className={styles.otherButton}
                  onClick={handleEmailSignIn}
                >
                  ログイン
                </button>
              </div>
            )}

            {showSignUp && (
              <div className={styles.otherOptionsPopup}>
                <h4>新規登録</h4>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレス"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワード"
                />
                <button className={styles.optionButton} onClick={handleSignUp}>
                  新規登録
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function UserInfo({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // ドロップダウンメニューの表示・非表示を切り替える関数
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // ドロップダウンメニュー以外をクリックした場合にドロップダウンメニューを閉じるための関数
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
