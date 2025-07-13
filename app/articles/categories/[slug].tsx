// 取得したスラッグで生成されたカテゴリーページ (〇〇に関する記事)
import React from 'react'
import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import { GetServerSidePropsContext } from 'next'
import Meta from '@/components/common/Meta'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'

type Icon = {
  url: string
  width: number
  height: number
}

type Category = {
  id: string
  name: string
  slug: string
  icon: Icon
}

type PostType = {
  id: string
  title: string
  slug: string
  eyecatch: {
    url: string
    width: number
    height: number
  }
  publishDate: string
  categories: Category[]
  source: string
  likesCount: number
  bookmarksCount: number
}

type CategoryProps = {
  icon: Icon
  name: string
  posts: PostType[]
  allCategories: Category[]
}

const Category: React.FC<CategoryProps> = ({
  icon,
  name,
  posts,
  allCategories,
}) => {
  return (
    <>
      <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
      <Ui.Container>
        <Article.PostHeader
          icon={icon}
          title={` ${name}に関する記事`}
          subtitle="Blog Category"
        />
        <Ui.Posts posts={posts} maxPosts={0} />
        <Article.CategoriesList allCategories={allCategories} />
      </Ui.Container>
    </>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const categorySlug = context.params?.['slug'] as string
  if (!categorySlug) {
    return { notFound: true }
  }
  const allCategories = await getAllCategories()
  const category = allCategories.find(
    ({ slug }: { slug: string }) => slug === categorySlug,
  )

  if (!category) {
    return { notFound: true }
  }

  let posts: PostType[] = []
  try {
    const fetchedPosts = await getAllPostByCategory(category.id)
    posts = fetchedPosts ?? []
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return {
    props: {
      icon: category.icon,
      name: category.name,
      posts: posts || [],
      allCategories: allCategories,
    },
  }
}

export default Category
