import { useEffect, useState } from 'react'
import Image from 'next/image'
import { db } from '@/firebaseConfig'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import styles from './comments.module.css'

// 「何日前」「何時間前」などの形式に変換
function timeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `${diffInDays}日前`
  }
  if (diffInHours > 0) {
    return `${diffInHours}時間前`
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes}分前`
  }
  return `${diffInSeconds}秒前`
}

export default function Comments({ postId }) {
  const [comment, setComment] = useState('') // 入力されたコメント
  const [comments, setComments] = useState([]) // 取得したコメント
  const [user, setUser] = useState(null) // ログインユーザー情報

  // Firebase Authの状態を監視
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        })
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  // Firestoreからコメントを取得
  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setComments(updatedComments.filter((doc) => doc.postId === postId))
      },
      (error) => {
        console.error('onSnapshotエラー:', error)
      },
    )

    return () => unsubscribe()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // コメントが空白の場合のエラーチェック
    if (!comment.trim()) {
      toast.error('コメントを入力してください。')
      return
    }

    // Firestoreへの保存処理
    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        text: comment,
        createdAt: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })

      setComment('')
      toast.success('コメントが投稿されました！')
    } catch (error) {
      console.error('Firestore保存エラー:', error)
      toast.error('コメントの投稿に失敗しました。')
    }
  }

  return (
    <div className={styles.commentsContainer}>
      <h2>コメント</h2>
      {user ? (
        <>
          <div className={styles.userInfo}>
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User'}
              width={50}
              height={50}
              className={styles.userIcon}
            />
            <span className={styles.userName}>
              {user.displayName || '匿名ユーザー'}
            </span>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="コメントを入力してください"
            />
            <button type="submit">投稿</button>
          </form>
        </>
      ) : (
        <p>ログインするとコメントを投稿できます。</p>
      )}
      <ul>
        {comments.map(({ id, text, createdAt, displayName, photoURL }) => (
          <li key={id}>
            <div className={styles.commentHeader}>
              <Image
                src={photoURL}
                alt={displayName || '匿名ユーザー'}
                width={50}
                height={50}
                className={styles.commentIcon}
              />
              <span className={styles.userName}>
                {displayName || '匿名ユーザー'}
              </span>
              <small className={styles.time}>
                {createdAt?.seconds
                  ? timeAgo(new Date(createdAt.seconds * 1000))
                  : '日時情報なし'}
              </small>
            </div>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
