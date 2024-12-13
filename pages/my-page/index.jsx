// マイページ
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { auth, db } from '@/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import styles from './index.module.css'
import eyecatch from '@/public/images/index.jpg'

export default function MyPage() {
  const [user, loading] = useAuthState(auth) // ログイン状態
  const [likedPosts, setLikedPosts] = useState([]) // いいねした記事
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]) // ブックマークした記事
  const [activeTab, setActiveTab] = useState('liked') // タブの切り替え
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [loading, user, router])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return null

      try {
        // いいねした記事を取得
        const likesQuery = query(
          collection(db, 'likes'),
          where('userId', '==', user.uid),
        )
        const likedSnapshot = await getDocs(likesQuery)
        const likedPostsData = likedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setLikedPosts(likedPostsData)

        // ブックマークした記事を取得
        const bookmarksQuery = query(
          collection(db, 'bookmarks'),
          where('userId', '==', user.uid),
        )

        const bookmarkedSnapshot = await getDocs(bookmarksQuery)
        const bookmarkedPostData = bookmarkedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

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
      <Meta
        pageTitle="MY PAGE"
        pageDesc="いいねやブックマークした記事を見れます。"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Container>
        <div className={styles.userInfo}>
          <Image src={user.photoURL} alt="User Icon" width={80} height={80} />
          <p>{user.displayName}</p>
          <Link href="/" className={styles.edit}>
            編集
          </Link>
        </div>
        <div className={styles.articleContainer}>
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'liked' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('liked')}
            >
              いいねした記事
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'bookmarked' ? styles.activeTab : ''
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
                  <li key={post.id} className={styles.listItem}>
                    <Link href={`/articles/${post.postId}`}>{post.title}</Link>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </Container>
    </>
  )
}
