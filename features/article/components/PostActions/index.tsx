'use client'

import React, { useEffect, useState } from 'react'
import { auth, db } from '@/firebaseConfig'
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore'
import { DocumentReference } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

type PostActionsProps = {
  postId: string
  title: string
}

const PostActions: React.FC<PostActionsProps> = ({ postId, title }) => {
  const [user] = useAuthState(auth)
  const [liked, setLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [bookmarked, setBookmarked] = useState<boolean>(false)
  const [bookmarkCount, setBookmarkCount] = useState<number>(0)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const postUrl = `${baseUrl}/articles/${postId}`

  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          const postRef = doc(db, 'posts', postId)
          const postSnap = await getDoc(postRef)

          if (postSnap.exists()) {
            setLikeCount(postSnap.data()['likesCount'] || 0)
            setBookmarkCount(postSnap.data()['bookmarksCount'] || 0)
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

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 1500,
    })
  }

  const updatePostCounter = async (
    postRef: DocumentReference,
    field: 'likesCount' | 'bookmarksCount',
    value: number,
  ) => {
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

  const handleAction = async (type: 'likes' | 'bookmarks') => {
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
        await setDoc(actionRef, { userId: user.uid, postId, title })
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

  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl,
    )}&text=${encodeURIComponent(`「${title}」`)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles['socialActions']}>
      <div className={styles['actionButton']}>
        <button onClick={() => handleAction('likes')}>
          <FontAwesomeIcon
            icon={faHeart}
            className={liked ? styles['likeIconAction'] : styles['icon']}
          />
        </button>
        <span className={styles['count']}>{likeCount}</span>

        <button onClick={() => handleAction('bookmarks')}>
          <FontAwesomeIcon
            icon={faBookmark}
            className={
              bookmarked ? styles['bookmarkIconAction'] : styles['icon']
            }
          />
        </button>
        <span className={styles['count']}>{bookmarkCount}</span>
      </div>

      <div className={styles['shareButton']}>
        <button onClick={handleShare}>
          <FontAwesomeIcon icon={faXTwitter} />
        </button>
      </div>
    </div>
  )
}

export default PostActions
