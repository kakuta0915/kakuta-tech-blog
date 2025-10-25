import { createClient } from 'microcms-js-sdk'
import axios from 'axios'
import { Posts } from '@/types'

// 環境変数チェック
const serviceDomain = process.env['SERVICE_DOMAIN']
const apiKey = process.env['API_KEY']

if (!serviceDomain || !apiKey) {
  throw new Error('SERVICE_DOMAIN or API_KEY is not set')
}

export const client = createClient({
  serviceDomain,
  apiKey,
})

// 記事ページに必要なデータを取得 (指定した１つのslugの記事データを返す)
export async function getPostBySlug(slug: string): Promise<Posts | null> {
  try {
    const post = await client.get({
      endpoint: 'blog',
      queries: { filters: `slug[equals]${slug}` },
    })
    return post.contents[0] || null
  } catch {
    return null
  }
}

// 全Slugを取得
export async function getAllSlugs(
  limit = 100,
): Promise<{ title: string; slug: string }[]> {
  try {
    const slugs = await client.get({
      endpoint: 'blog',
      queries: { fields: 'title,slug', orders: '-publishDate', limit: limit },
    })
    return slugs.contents
  } catch {
    return []
  }
}

// 全記事データを取得 ================================================================================
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
  } catch (err) {}
}

// 記事データの取得(カテゴリーページにslugが一致するページを追加)
export async function getAllPostByCategory(categoryID: string, limit = 100) {
  try {
    const posts = await client.get({
      endpoint: 'blog',
      queries: {
        filters: `categories[contains]${categoryID}`,
        fields: 'title,slug,eyecatch,categories,publishDate',
        orders: '-publishDate',
        limit: limit,
      },
    })
    return (
      posts.contents?.map(
        (p: {
          title: string
          slug: string
          eyecatch: string | { url: string }
          publishDate: string
          categories: string[]
        }) => ({
          title: p.title,
          slug: p.slug,
          eyecatch: p.eyecatch,
          publishDate: p.publishDate,
          categories: p.categories || [],
          source: 'microcms',
        }),
      ) || []
    )
  } catch (err) {
    return []
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
        Authorization: `Bearer ${process.env['QIITA_API_TOKEN']}`,
      },
      params: {
        per_page: 100,
      },
    })
    return response.data.map(
      (article: {
        title: string
        id: string
        user: { profile_image_url: string }
        created_at: string
      }) => ({
        title: article.title,
        slug: article.id,
        eyecatch: { url: article.user.profile_image_url },
        publishDate: article.created_at,
        categories: [], // Qiitaの記事にはカテゴリがないため空配列
        source: 'qiita',
      }),
    )
  } catch (error) {
    throw error
  }
}

// 全ての記事を統合する関数
export async function getAllArticles(maxArticles = Infinity) {
  const [qiitaArticles, microCMSArticles] = await Promise.all([
    getAllQiitaArticles(),
    getAllPosts(),
  ])

  let allArticles = [...qiitaArticles, ...microCMSArticles]
  allArticles.sort((a, b) => {
    const dateA = new Date(a.publishDate).getTime()
    const dateB = new Date(b.publishDate).getTime()
    return dateB - dateA
  })

  if (maxArticles !== Infinity) {
    allArticles = allArticles.slice(0, maxArticles)
  }

  return {
    articles: allArticles,
  }
}
