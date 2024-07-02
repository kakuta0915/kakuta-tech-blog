// 取得したスラッグで生成されたカテゴリーページ (〇〇に関する記事)
import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import Meta from '@/src/components/Meta/Meta'
import PostHeader from '@/src/components/PostHeader/PostHeader'
import Posts from '@/src/components/Posts/Posts'
import CategoriesList from '@/src/components/CategoiresList/CategoriesList'
import Container from '@/src/components/Container/Container'

export default function Category({ icon, name, posts, allCategories }) {
  return (
    <>
      <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
      <Container>
        <PostHeader
          icon={icon}
          title={` ${name}に関する記事`}
          subtitle="Blog Category"
        />
        <Posts posts={posts} />
        <CategoriesList allCategories={allCategories} />
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const allCategories = await getAllCategories()
  return {
    paths: allCategories.map(({ slug }) => `/Articles/Categories/${slug}`),
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
