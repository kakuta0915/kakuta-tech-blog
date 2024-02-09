// 取得したスラッグで生成されたカテゴリーページ (〇〇に関する記事)
import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import PostHeader from '../../../src/components/elements/post-header/PostHeader'
import Posts from '../../../src/components/elements/posts/Posts'
import Meta from '@/src/components/elements/meta/Meta'
import CategoriesList from '@/src/components/elements/categoires-list/CategoriesList'
import Container from '@/src/components/layouts/container/Container'

export default function Category({ icon, name, posts, allCategories }) {
  return (
    <Container>
      <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
      <PostHeader
        icon={icon}
        title={` ${name}に関する記事`}
        subtitle="Blog Category"
      />
      <Posts posts={posts} />
      <CategoriesList allCategories={allCategories} />
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
      icon: category.icon,
      name: category.name,
      posts: posts,
      allCategories: allCategories,
    },
  }
}
