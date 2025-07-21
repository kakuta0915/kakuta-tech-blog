'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebaseConfig'
import {
  deleteUser,
  onAuthStateChanged,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  User,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import styles from './MyAccountDelete.module.css'

const MyAccountDelete: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (!currentUser) {
        router.push('/')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleDeleteAccount = async () => {
    if (!user) {
      toast.error('ログインしていません。')
      return
    }

    const confirmDelete = confirm(
      '本当にアカウントを削除しますか？この操作は元に戻せません。',
    )
    if (!confirmDelete) return

    setIsDeleting(true)

    try {
      const provider = new GoogleAuthProvider()
      await reauthenticateWithPopup(user, provider)
      await deleteUser(user)
      alert('アカウントを削除しました。')
      setUser(null)
      router.push('/')
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error('再認証が必要です。再度ログインしてください。')
      } else {
        toast.error('アカウントの削除に失敗しました。')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return null
  }

  return (
    <>
      <div className={styles['deleteContainer']}>
        <h2>アカウントを削除しますか？</h2>
        <div className={styles['userInfo']}>
          <Image
            src={user.photoURL || '/images/default-icon.png'}
            alt="User Icon"
            width={80}
            height={80}
          />
          <p>{user.displayName}</p>
        </div>
        <div className={styles['deleteInfo']}>
          <h3>以下のデータは完全に削除されます。</h3>
          <p>アカウントを一度削除すると、以下のものが復元できなくなります。</p>
          <ul>
            <li>ユーザー情報</li>
            <li>いいねした記事</li>
            <li>ブックマークした記事</li>
          </ul>
        </div>
        <div className={styles['deleteButtonSection']}>
          <button
            onClick={handleDeleteAccount}
            className={styles['deleteButton']}
            disabled={isDeleting}
          >
            {isDeleting ? '削除中...' : 'アカウントを削除する'}
          </button>
        </div>
      </div>
    </>
  )
}

export default MyAccountDelete
