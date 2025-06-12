import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/firebaseConfig'
import { User } from 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css'
import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons'

type Props = {
  user: User | null
}

const UserInfo: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const isMountedRef = useRef(true)

  // ドロップダウンを切り替える
  const toggleDropdown = useCallback(() => {
    if (!user || !isMountedRef.current) return
    setIsOpen((prev) => !prev)
  }, [user])

  // 外部クリックでドロップダウンを閉じる
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      if (isMountedRef.current) {
        setIsOpen(false)
      }
    }
  }, [])

  useEffect(() => {
    // コンポーネントがマウント中であることを記録
    isMountedRef.current = true

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      // コンポーネントがアンマウントされたらフラグを false に設定
      isMountedRef.current = false
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  // ユーザーがログアウトまたは削除された場合、ドロップダウンを閉じる
  useEffect(() => {
    if (!user && isMountedRef.current) {
      setIsOpen(false)
    }
  }, [user])

  // ログアウトボタンの処理
  const handleSignOut = () => {
    if (isMountedRef.current) {
      setIsOpen(false)
    }
    auth.signOut()
  }

  if (!user) {
    return (
      <div className={styles['userInfo']}>
        <p>ログインしてください。</p>
      </div>
    )
  }

  return (
    <div className={styles['userInfo']} ref={dropdownRef}>
      {user.photoURL && (
        <Image
          src={user.photoURL}
          alt="User Icon"
          onClick={toggleDropdown}
          width={18}
          height={18}
        />
      )}
      {isOpen && (
        <div
          className={`${styles['dropdownMenu']} ${
            isOpen ? styles['open'] : ''
          }`}
        >
          <Link href="/my-page/" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faUser} className={styles['icon']} />
            マイページ
          </Link>
          <Link
            href="/settings/"
            onClick={() => setIsOpen(false)}
            className={styles['lastLink']}
          >
            <FontAwesomeIcon icon={faGear} className={styles['icon']} />
            アカウント設定
          </Link>
          <button onClick={handleSignOut} className={styles['loginButton']}>
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}

export default UserInfo
