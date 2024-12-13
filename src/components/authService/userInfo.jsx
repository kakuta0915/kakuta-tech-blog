import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/firebaseConfig'
import 'react-toastify/dist/ReactToastify.css'
import styles from './authService.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons'

export default function UserInfo({ user }) {
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

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
  }, [])

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
          <Link href="/my-page/" onClick={closeDropdown}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            マイページ
          </Link>
          <Link href="/" onClick={closeDropdown} className={styles.lastLink}>
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
