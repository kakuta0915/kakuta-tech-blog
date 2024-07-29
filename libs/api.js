import { createClient } from 'microcms-js-sdk'
import axios from 'axios'

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
    console.log('~~ Slugを使用して記事を取得しています~~ :', slug)
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
    return posts.contents
  } catch (err) {
    console.log('~~ getAllPostByCategory ~~')
    console.log(err)
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

// 全ての記事を統合する関数
export async function getAllArticles(maxArticles = Infinity) {
  const [qiitaArticles, microCMSArticles] = await Promise.all([
    getAllQiitaArticles(),
    getAllPosts(),
  ])

  let allArticles = [...qiitaArticles, ...microCMSArticles]
  allArticles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))

  if (maxArticles !== Infinity) {
    allArticles = allArticles.slice(0, maxArticles)
  }

  return allArticles
}
