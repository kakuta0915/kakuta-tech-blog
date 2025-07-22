'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/firebaseConfig'
import 'react-toastify/dist/ReactToastify.css'
import { SimpleUserProps } from '@/types'
import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons'

type Props = {
  user: SimpleUserProps | null
}

const UserInfo: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const isMountedRef = useRef(true)

  const toggleDropdown = useCallback(() => {
    if (!user || !isMountedRef.current) return
    setIsOpen((prev) => !prev)
  }, [user])

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
    isMountedRef.current = true

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      isMountedRef.current = false
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  useEffect(() => {
    if (!user && isMountedRef.current) {
      setIsOpen(false)
    }
  }, [user])

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
          <Link href="/my-account/" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faUser} className={styles['icon']} />
            マイページ
          </Link>
          <Link
            href="/settings/edit"
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
