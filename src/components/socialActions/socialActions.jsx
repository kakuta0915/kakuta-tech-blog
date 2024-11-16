import { useEffect, useState } from 'react'
import { auth, db } from '@/firebaseConfig'
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './socialActions.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

export default function SocialActions({ postId }) {
  const [user] = useAuthState(auth)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(0)

  useEffect(() => {
    if (postId) {
      const fetchLikeData = async () => {
        const postRef = doc(db, 'posts', postId)
        const postSnap = await getDoc(postRef)

        if (postSnap.exists()) {
          setLikeCount(postSnap.data().likesCount || 0)
          setBookmarkCount(postSnap.data().bookmarksCount || 0)
        }

        if (user) {
          const likeRef = doc(db, 'likes', `${user.uid}_${postId}`)
          const likeSnap = await getDoc(likeRef)
          setLiked(likeSnap.exists())

          const bookmarkRef = doc(db, 'bookmarks', `${user.uid}_${postId}`)
          const bookmarkSnap = await getDoc(bookmarkRef)
          setBookmarked(bookmarkSnap.exists())
        }
      }
      fetchLikeData()
    }
  }, [user, postId])

  const handleLike = async () => {
    if (!user) {
      toast.error('ログインしてください', {
        position: 'top-center',
        autoClose: 1500,
      })
      return
    }

    if (!postId) {
      console.error('postIdが無効です')
      return
    }

    const postRef = doc(db, 'posts', postId)
    const likeRef = doc(db, 'likes', `${user.uid}_${postId}`)

    try {
      if (liked) {
        // いいねを取り消す
        await deleteDoc(likeRef)
        await updateDoc(postRef, { likesCount: increment(-1) })
        setLikeCount((prevCount) => prevCount - 1)
        setLiked(false)
        toast.info('いいねを取り消しました', {
          position: 'top-center',
          autoClose: 1500,
        })
      } else {
        // いいねを追加
        await setDoc(likeRef, {
          userId: user.uid,
          postId: postId,
        })

        // 投稿にlikesCountがない場合も対応
        const postSnap = await getDoc(postRef)
        if (!postSnap.exists()) {
          // ドキュメントが存在しない場合、新しいフィールドで初期化
          await setDoc(postRef, {
            likesCount: 1, // 初回のいいね
          })
        } else {
          await updateDoc(postRef, { likesCount: increment(1) })
        }

        setLikeCount((prevCount) => prevCount + 1)
        setLiked(true)
        toast.success('いいねしました！', {
          position: 'top-center',
          autoClose: 1500,
        })
      }
    } catch (error) {
      console.error('Error updating like status:', error)
      toast.error('エラーが発生しました', {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }

  const handleBookmark = async () => {
    if (!user) {
      toast.error('ログインしてください', {
        position: 'top-center',
        autoClose: 1500,
      })
      return
    }

    if (!postId) {
      console.error('postIdが無効です')
      return
    }

    const postRef = doc(db, 'posts', postId)
    const bookmarkRef = doc(db, 'bookmarks', `${user.uid}_${postId}`)

    try {
      if (bookmarked) {
        await deleteDoc(bookmarkRef)
        await updateDoc(postRef, { bookmarksCount: increment(-1) })
        setBookmarkCount((prevCount) => prevCount - 1)
        setBookmarked(false)
        toast.info('ブックマークを解除しました', {
          position: 'top-center',
          autoClose: 1500,
        })
      } else {
        await setDoc(bookmarkRef, {
          userId: user.uid,
          postId: postId,
        })
        await updateDoc(postRef, { bookmarksCount: increment(1) })
        setBookmarkCount((prevCount) => prevCount + 1)
        setBookmarked(true)
        toast.success('ブックマークしました', {
          position: 'top-center',
          autoClose: 1500,
        })
      }
    } catch (error) {
      console.error('Error updating bookmark status:', error)
      toast.error('エラーが発生しました', {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }

  return (
    <div className={styles.socialActions}>
      <ToastContainer />
      <div className={styles.actionButton}>
        <button onClick={handleLike}>
          <FontAwesomeIcon
            icon={faHeart}
            className={liked ? styles.likeIconAction : styles.icon}
          />
        </button>
        <span className={styles.count}>{likeCount}</span>

        <button onClick={handleBookmark}>
          <FontAwesomeIcon
            icon={faBookmark}
            className={bookmarked ? styles.bookmarkIconAction : styles.icon}
          />
        </button>
        <span className={styles.count}>{bookmarkCount}</span>
      </div>

      <div className={styles.shareButton}>
        <button>
          <FontAwesomeIcon icon={faXTwitter} />
        </button>
      </div>
    </div>
  )
}
