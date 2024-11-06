import React, { useState, useEffect } from 'react'
import { db } from '@/firebaseConfig'
import { collection, doc, increment, setDoc, getDoc } from 'firebase/firestore'

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0)

  // Firestoreから「いいね」数を取得
  useEffect(() => {
    const fetchLikes = async () => {
      const postRef = doc(collection(db, 'posts'), postId)
      const postSnap = await getDoc(postRef)

      if (postSnap.exists()) {
        setLikes(postSnap.data().likes || 0) // 初期値がない場合に0を設定
      }
    }

    fetchLikes()
  }, [postId])

  // 「いいね」ボタンをクリックしたときの処理
  const handleLike = async () => {
    const postRef = doc(collection(db, 'posts'), postId)
    await setDoc(
      postRef,
      {
        likes: increment(1),
      },
      { merge: true },
    )

    // いいね数をローカルにも反映
    setLikes((prevLikes) => prevLikes + 1)
  }

  return <button onClick={handleLike}>👍 {likes} いいね</button>
}
