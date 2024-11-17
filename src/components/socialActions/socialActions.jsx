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
      const fetchData = async () => {
        try {
          const postRef = doc(db, 'posts', postId)
          const postSnap = await getDoc(postRef)

          if (postSnap.exists()) {
            setLikeCount(postSnap.data().likesCount || 0)
            setBookmarkCount(postSnap.data().bookmarksCount || 0)
          }

          if (user) {
            const [likeSnap, bookmarkSnap] = await Promise.all([
              getDoc(doc(db, 'likes', `${user.uid}_${postId}`)),
              getDoc(doc(db, 'bookmarks', `${user.uid}_${postId}`)),
            ])
            setLiked(likeSnap.exists())
            setBookmarked(bookmarkSnap.exists())
          }
        } catch (error) {
          console.error('Error fetching post data:', error)
        }
      }
      fetchData()
    }
  }, [user, postId])

  const showToast = (message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 1500,
    })
  }

  const updatePostCounter = async (postRef, field, value) => {
    try {
      const postSnap = await getDoc(postRef)
      if (!postSnap.exists()) {
        await setDoc(postRef, { [field]: value })
      } else {
        await updateDoc(postRef, { [field]: increment(value) })
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error)
      throw error
    }
  }

  const handleAction = async (type) => {
    if (!user) {
      showToast('ログインしてください', 'error')
      return
    }

    if (!postId) {
      console.error('postIdが無効です')
      return
    }

    const postRef = doc(db, 'posts', postId)
    const actionRef = doc(db, type, `${user.uid}_${postId}`)
    const isLikedOrBookmarked = type === 'likes' ? liked : bookmarked
    const setState = type === 'likes' ? setLiked : setBookmarked
    const setCount = type === 'likes' ? setLikeCount : setBookmarkCount
    const counterField = type === 'likes' ? 'likesCount' : 'bookmarksCount'

    try {
      if (isLikedOrBookmarked) {
        await deleteDoc(actionRef)
        await updatePostCounter(postRef, counterField, -1)
        setCount((prev) => prev - 1)
        setState(false)
        showToast(
          `${
            type === 'likes'
              ? 'いいねを取り消しました'
              : 'ブックマークを解除しました'
          }`,
          'info',
        )
      } else {
        await setDoc(actionRef, { userId: user.uid, postId })
        await updatePostCounter(postRef, counterField, 1)
        setCount((prev) => prev + 1)
        setState(true)
        showToast(
          `${type === 'likes' ? 'いいねしました！' : 'ブックマークしました'}`,
          'success',
        )
      }
    } catch (error) {
      console.error(`Error handling ${type}:`, error)
      showToast('エラーが発生しました', 'error')
    }
  }

  return (
    <div className={styles.socialActions}>
      <ToastContainer />
      <div className={styles.actionButton}>
        <button onClick={() => handleAction('likes')}>
          <FontAwesomeIcon
            icon={faHeart}
            className={liked ? styles.likeIconAction : styles.icon}
          />
        </button>
        <span className={styles.count}>{likeCount}</span>

        <button onClick={() => handleAction('bookmarks')}>
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
