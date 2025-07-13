import { notFound } from 'next/navigation'
import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import Meta from '@/components/common/Meta'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'
import type { Category, Posts } from '@/types'

type CategoryParams = {
  slug: string
}

type CategoryPageProps = {
  params: CategoryParams
}

export async function generateStaticParams() {
  const categories: Category[] = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  const allCategories: Category[] = await getAllCategories()
  const category = allCategories.find((cat) => cat.slug === slug)

  if (!category) {
    notFound()
  }

  let posts: Posts[] = []
  try {
    const fetchedPosts = await getAllPostByCategory(category.id)
    posts = fetchedPosts ?? []
  } catch (err) {}

  return (
    <>
      <Meta
        pageTitle={category.name}
        pageDesc={`${category.name}に関する記事`}
      />
      <Ui.Container>
        <Article.PostHeader
          icon={category.icon}
          title={`${category.name}に関する記事`}
          subtitle="Blog Category"
        />
        <Ui.Posts posts={posts} maxPosts={1000} />
        <Article.CategoriesList allCategories={allCategories} />
      </Ui.Container>
    </>
  )
}
