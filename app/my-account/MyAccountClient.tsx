'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { auth, db } from '@/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as Ui from '@/components/ui'
import styles from './page.module.css'

type UserPost = {
  postId: string
  title: ReactNode
  id: string
}

const MyAccountClient: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const [likedPosts, setLikedPosts] = useState<UserPost[]>([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState<UserPost[]>([])
  const [activeTab, setActiveTab] = useState('liked')
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [loading, user, router])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        const likesQuery = query(
          collection(db, 'likes'),
          where('userId', '==', user.uid),
        )
        const likedSnapshot = await getDocs(likesQuery)
        const likedPostsData: UserPost[] = likedSnapshot.docs.map((doc) => {
          const data = doc.data() as { postId: string; title: ReactNode }
          return {
            id: doc.id,
            postId: data.postId,
            title: data.title,
          }
        })

        setLikedPosts(likedPostsData)

        const bookmarksQuery = query(
          collection(db, 'bookmarks'),
          where('userId', '==', user.uid),
        )

        const bookmarkedSnapshot = await getDocs(bookmarksQuery)
        const bookmarkedPostData: UserPost[] = bookmarkedSnapshot.docs.map(
          (doc) => {
            const data = doc.data() as { postId: string; title: ReactNode }
            return {
              id: doc.id,
              postId: data.postId,
              title: data.title,
            }
          },
        )

        setBookmarkedPosts(bookmarkedPostData)
      } catch (error) {
        console.error('Error fetching user data', error)
      }
    }
    if (user) {
      fetchUserData()
    }
  }, [user])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return null
  }

  const postsToShow = activeTab === 'liked' ? likedPosts : bookmarkedPosts

  return (
    <>
      <Ui.Container>
        <div className={styles['userInfo']}>
          <Image
            src={user.photoURL || '/default-user.png'}
            alt="User Icon"
            width={80}
            height={80}
          />
          <p>{user.displayName}</p>
          <Link href="/settings/account/edit" className={styles['edit']}>
            編集
          </Link>
        </div>
        <div className={styles['articleContainer']}>
          <div className={styles['tabContainer']}>
            <button
              className={`${styles['tabButton']} ${
                activeTab === 'liked' ? styles['activeTab'] : ''
              }`}
              onClick={() => setActiveTab('liked')}
            >
              いいねした記事
            </button>
            <button
              className={`${styles['tabButton']} ${
                activeTab === 'bookmarked' ? styles['activeTab'] : ''
              }`}
              onClick={() => setActiveTab('bookmarked')}
            >
              ブックマークした記事
            </button>
          </div>
          <section>
            <ul>
              {postsToShow.length === 0 ? (
                <li>
                  {activeTab === 'liked'
                    ? 'いいねした記事はありません。'
                    : 'ブックマークした記事はありません。'}
                </li>
              ) : (
                postsToShow.map((post) => (
                  <li key={post.id} className={styles['listItem']}>
                    <Link href={`/articles/${post.postId}`}>{post.title}</Link>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </Ui.Container>
    </>
  )
}

export default MyAccountClient
