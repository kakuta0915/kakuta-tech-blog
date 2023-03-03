// カテゴリーページ

import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import Container from '@/src/components/container/container'
import PostHeader from '@/src/components/post-header/post-header'
import Posts from '@/src/components/posts/posts'
import Meta from '@/src/components/meta/meta'

export default function Category({ name, posts }) {
  return (
    <Container>
      <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
      <PostHeader title={name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  )
}

export async function getStaticPaths() {
  const allCategories = await getAllCategories()
  return {
    paths: allCategories.map(({ slug }) => `/articles/category/${slug}`),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const categorySlug = context.params.slug

  const allCategories = await getAllCategories()
  const category = allCategories.find(({ slug }) => slug === categorySlug)

  const posts = await getAllPostByCategory(category.id)

  return {
    props: {
      name: category.name,
      posts: posts,
    },
  }
}
