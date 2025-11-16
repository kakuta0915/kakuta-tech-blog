import { getAllSlugs, getAllCategories } from '@/libs/api'
import { siteMeta } from '@/libs/constants'

type Post = {
  slug: string
}

type Category = {
  slug: string
}

export async function GET() {
  const posts: Post[] = await getAllSlugs()
  const categories: Category[] = await getAllCategories()

  const urls = [
    ...posts.map(
      (post) => `
      <url>
        <loc>${siteMeta.siteUrl}/articles/categories/${post.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `,
    ),
    ...categories.map(
      (category) => `
      <url>
        <loc>${siteMeta.siteUrl}/articles/categories/${category.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `,
    ),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>`

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
