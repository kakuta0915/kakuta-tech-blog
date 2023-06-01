// 取得したスラッグで生成されたカテゴリーページ

import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import Container from '@/src/components/container/container'
import PostHeader from '@/src/components/post-header/post-header'
import Posts from '@/src/components/posts/posts'
import Meta from '@/src/components/meta/meta'
import { TwoColum } from '@/src/components/two-colum/two-colum'
import { TwoColumMain } from '@/src/components/two-colum/two-colum'
import { TwoColumSidebar } from '@/src/components/two-colum/two-colum'
import SlugCategoriesList from '@/src/components/slug-categoires-list/slug-categories-list'

export default function Category({ name, posts, allCategories }) {
  return (
    <Container>
      <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
      <PostHeader title={`${name}に関する記事`} subtitle="Blog Category" />
      <TwoColum>
        <TwoColumMain>
          <Posts posts={posts} />
        </TwoColumMain>
        <TwoColumSidebar>
          <SlugCategoriesList allCategories={allCategories} />
        </TwoColumSidebar>
      </TwoColum>
    </Container>
  )
}

export async function getStaticPaths() {
  const allCategories = await getAllCategories()
  return {
    paths: allCategories.map(({ slug }) => `/articles/categories/${slug}`),
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
      allCategories: allCategories,
    },
  }
}
