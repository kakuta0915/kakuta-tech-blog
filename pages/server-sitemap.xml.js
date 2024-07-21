import { getServerSideSitemap } from 'next-sitemap'
import { getAllSlugs, getAllCategories } from '@/libs/api'
import { siteMeta } from '@/libs/constants'

export default function Sitemap() {}

export async function getServerSideProps(context) {
  const posts = await getAllSlugs()
  const postFields = posts.map((post) => {
    return {
      loc: `${siteMeta.siteUrl}/pages/articles/categories/${post.slug}`,
    }
  })

  const categories = await getAllCategories()
  const categoriesFields = categories.map((category) => {
    return {
      loc: `${siteMeta.siteUrl}/pages/articles/categories/${category.slug}`,
    }
  })

  const allFields = [...postFields, ...categoriesFields]

  return await getServerSideSitemap(context, allFields)
}
