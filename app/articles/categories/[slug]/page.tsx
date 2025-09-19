import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/utils/createMetadata'
import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'
import type { Category, Posts } from '@/types'

type CategoryParams = {
  slug: string
}

type CategoryPageProps = {
  params: Promise<CategoryParams>
}

const fetchCategoryData = async (slug: string) => {
  const allCategories: Category[] = await getAllCategories()
  const category = allCategories.find((cat) => cat.slug === slug)

  if (!category) {
    return null
  }

  let posts: Posts[] = []
  try {
    const fetchedPosts = await getAllPostByCategory(category.id)
    posts = fetchedPosts ?? []
  } catch (err) {}

  return { category, posts, allCategories }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const data = await fetchCategoryData(slug)

  if (!data || !data.category) {
    notFound()
  }

  const { category } = data

  return createMetadata({
    pageTitle: category.name,
    pageDesc: `${category.name}に関する記事一覧です。`,
    slug: `categories/${slug}`,
  })
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const categories: Category[] = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const data = await fetchCategoryData(slug)

  if (!data || !data.category) {
    notFound()
  }

  const { category, posts, allCategories } = data

  return (
    <>
      <Ui.StickyHeader />
      <Ui.Container>
        <article>
          <Article.PostHeader
            icon={category.icon}
            title={`${category.name}に関する記事`}
            subtitle="Blog Category"
          />
          <Ui.Posts posts={posts} maxPosts={1000} />
          <Article.CategoriesList allCategories={allCategories} />
        </article>
      </Ui.Container>
    </>
  )
}
