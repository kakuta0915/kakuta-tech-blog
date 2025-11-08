import { createClient } from 'microcms-js-sdk'
import { Category, Posts } from '@/types'

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

// 記事ページに必要なデータを取得
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
      queries: { fields: 'slug', orders: '-publishDate', limit: limit },
    })
    return slugs.contents
  } catch {
    return []
  }
}

// 全記事データを取得
export async function getAllPosts(limit = 100): Promise<Posts[]> {
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
  } catch {
    return []
  }
}

// カテゴリーIDで記事を取得
export async function getAllPostByCategory(
  categoryID: string,
  limit = 100,
): Promise<Posts[]> {
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

// 全カテゴリーを取得
export async function getAllCategories(limit = 100): Promise<Category[]> {
  try {
    const categories = await client.get({
      endpoint: 'categories',
      queries: {
        fields: 'id,icon,name,slug',
        limit: limit,
      },
    })
    return categories.contents
  } catch {
    return []
  }
}

// 全ての記事を取得（microCMSのみ）
export async function getAllArticles(
  maxArticles = Infinity,
): Promise<{ articles: Posts[] }> {
  const posts = await getAllPosts()

  let allArticles = [...posts]
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
