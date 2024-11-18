import { createClient } from 'microcms-js-sdk'
import axios from 'axios'
import { db } from '@/firebaseConfig'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'

// サービスドメインとAPIキーを取得するか、テスト用のデフォルト値を設定する
const serviceDomain = process.env.SERVICE_DOMAIN || 'test-service-domain'
const apiKey = process.env.API_KEY || 'test-api-key'

export const client = createClient({
  serviceDomain,
  apiKey,
})

// 記事ページに必要なデータを取得する (指定した１つのslugの記事データを返す)
export async function getPostBySlug(slug) {
  try {
    const post = await client.get({
      endpoint: 'blog',
      queries: { filters: `slug[equals]${slug}` },
    })
    return post.contents[0]
  } catch (err) {
    console.log('~~ getPostBySlug ~~')
    console.log('エラーが発生しました', err)
    throw err
  }
}

// 全てのSlugを取得する関数
export async function getAllSlugs(limit = 100) {
  try {
    const slugs = await client.get({
      endpoint: 'blog',
      queries: { fields: 'title,slug', orders: '-publishDate', limit: limit },
    })
    return slugs.contents
  } catch (err) {
    console.log('~~ getAllSlugs ~~')
    console.log(err)
  }
}

// すべての記事データを取得する
export async function getAllPosts(limit = 100) {
  try {
    const posts = await client.get({
      endpoint: 'blog',
      queries: {
        fields: 'title,slug,eyecatch,categories,publishDate',
        orders: '-publishDate',
        limit: limit,
      },
    })
    return posts.contents
  } catch (err) {
    console.log('~~ getAllPosts ~~')
    console.log(err)
  }
}

// 記事データの取得(カテゴリーページにslugが一致するページを追加)
export async function getAllPostByCategory(categoryID, limit = 100) {
  try {
    const posts = await client.get({
      endpoint: 'blog',
      queries: {
        filters: `categories[contains]${categoryID}`,
        fields: 'title,category,slug,eyecatch,categories,publishDate',
        orders: '-publishDate',
        limit: limit,
      },
    })

    // Firestoreからいいね数とブックマーク数を取得
    const postsWithStats = await Promise.all(
      posts.contents.map(async (post) => {
        const docRef = doc(db, 'posts', post.slug)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const stats = docSnap.data()
          return {
            ...post,
            likesCount: stats.likesCount ?? 0,
            bookmarksCount: stats.bookmarksCount ?? 0,
          }
        } else {
          return {
            ...post,
            likesCount: 0,
            bookmarksCount: 0,
          }
        }
      }),
    )

    return postsWithStats
  } catch (err) {
    console.error('~~ getAllPostByCategory ~~')
    console.error(err)
  }
}

// カテゴリーページを生成する機能
export async function getAllCategories(limit = 100) {
  try {
    const categories = await client.get({
      endpoint: 'categories',
      queries: {
        fields: 'id,icon,name,slug',
        limit: limit,
      },
    })
    return categories.contents
  } catch (err) {
    console.log('~~ getAllCategories ~~')
    console.log(err)
  }
}

// Qiita API
const QIITA_API_URL = 'https://qiita.com/api/v2/users/kakuta0915/items'

// Qiita API を呼び出して記事を取得する関数
export async function getAllQiitaArticles() {
  try {
    const response = await axios.get(QIITA_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
      params: {
        per_page: 100,
      },
    })
    return response.data.map((article) => ({
      title: article.title,
      slug: article.id,
      eyecatch: { url: article.user.profile_image_url },
      publishDate: article.created_at,
      categories: [], // Qiitaの記事にはカテゴリがないため空配列
      source: 'qiita',
    }))
  } catch (error) {
    console.error('Error fetching Qiita articles:', error)
    throw error
  }
}

// Firebaseに記事が登録されていない時にドキュメントを自動生成する関数
const initializePostDocument = async (postId) => {
  const postRef = doc(db, 'posts', postId)
  try {
    await setDoc(postRef, { likesCount: 0, bookmarksCount: 0 }, { merge: true })
    console.log(`Initialized post document for ${postId}`)
  } catch (error) {
    console.error(`Error initializing post document for ${postId}:`, error)
  }
}

// いいね数をリアルタイムで取得する関数
export const getLikesCount = (postId, onUpdate) => {
  const likesRef = collection(db, 'likes')
  const q = query(likesRef, where('postId', '==', postId))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const count = querySnapshot.size
    onUpdate(count)
  })

  return unsubscribe
}

// ブックマーク数をリアルタイムで取得する関数
export const getBookmarkCount = (postId, onUpdate) => {
  const bookmarksRef = collection(db, 'bookmarks')
  const q = query(bookmarksRef, where('postId', '==', postId))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const count = querySnapshot.size
    onUpdate(count)
  })

  return unsubscribe
}

// 全ての記事を統合する関数・いいね数とブックマーク数を取得する関数
export async function getAllArticles(maxArticles = Infinity, onArticlesUpdate) {
  const [qiitaArticles, microCMSArticles] = await Promise.all([
    getAllQiitaArticles(),
    getAllPosts(),
  ])

  let allArticles = [...qiitaArticles, ...microCMSArticles]
  allArticles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))

  if (maxArticles !== Infinity) {
    allArticles = allArticles.slice(0, maxArticles)
  }

  // 監視解除用の配列
  const unsubscribeFunctions = []

  // 記事ごとにリアルタイム更新を監視
  const updatedArticles = await Promise.all(
    allArticles.map(async (article) => {
      try {
        const postRef = doc(db, 'posts', article.slug)
        let postSnap = await getDoc(postRef)

        if (!postSnap.exists()) {
          await initializePostDocument(article.slug)
          postSnap = await getDoc(postRef)
        }

        const data = postSnap.data() || {}

        // リアルタイム監視
        const unsubscribeLikes = getLikesCount(article.slug, (likesCount) => {
          article.likesCount = likesCount
          onArticlesUpdate?.([...allArticles])
        })

        const unsubscribeBookmarks = getBookmarkCount(
          article.slug,
          (bookmarksCount) => {
            article.bookmarksCount = bookmarksCount
            onArticlesUpdate?.([...allArticles])
          },
        )

        unsubscribeFunctions.push(unsubscribeLikes, unsubscribeBookmarks)

        return {
          ...article,
          likesCount: data.likesCount || 0,
          bookmarksCount: data.bookmarksCount || 0,
        }
      } catch (error) {
        console.error(
          `Error fetching stats for article ${article.slug}:`,
          error,
        )
        return article
      }
    }),
  )

  // サーバーサイドでは関数を返さないようにする
  return {
    articles: updatedArticles,
    unsubscribe: () => {
      unsubscribeFunctions.forEach((fn) => fn())
    },
  }
}
