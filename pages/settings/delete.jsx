import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { auth } from '@/firebaseConfig'
import {
  deleteUser,
  onAuthStateChanged,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import Meta from '@/src/components/meta/meta'
import styles from './delete.module.css'
import eyecatch from '@/public/images/index.jpg'

export default function DeleteAccount() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ユーザー情報を取得
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null)
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

    try {
      // Googleアカウントで再認証
      const provider = new GoogleAuthProvider()
      await reauthenticateWithPopup(user, provider)

      // アカウント削除処理
      await deleteUser(user)
      toast.success('アカウントを削除しました。')
      setUser(null)
      router.push('/')
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error('再認証が必要です。再度ログインしてください。')
      } else {
        console.error('アカウント削除エラー:', error)
        toast.error('アカウントの削除に失敗しました。')
      }
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
      <Meta
        pageTitle="Delete Account"
        pageDesc="アカウントの削除ページです。"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <div className={styles.deleteContainer}>
        <h2>アカウントを削除しますか？</h2>
        <div className={styles.userInfo}>
          <Image src={user.photoURL} alt="User Icon" width={80} height={80} />
          <p>{user.displayName}</p>
        </div>
        <div className={styles.deleteInfo}>
          <h3>以下のデータは完全に削除されます。</h3>
          <p>アカウントを一度削除すると、以下のものが復元できなくなります。</p>
          <ul>
            <li>ユーザー情報</li>
            <li>いいねした記事</li>
            <li>ブックマークした記事</li>
          </ul>
        </div>

        <div className={styles.deleteButtonSection}>
          <button onClick={handleDeleteAccount} className={styles.deleteButton}>
            アカウントを削除する
          </button>
        </div>
      </div>
    </>
  )
}
