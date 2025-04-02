// 取得したスラッグで生成されたカテゴリーページ (〇〇に関する記事)
import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import Meta from '@/src/components/Meta1'
import PostHeader from '@/src/components/PostHeader1'
import Posts from '@/src/components/Posts1'
import CategoriesList from '@/src/components/CategoriesList1'
import Container from '@/src/components/Container1'

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

export async function getServerSideProps(context) {
  const categorySlug = context.params.slug
  const allCategories = await getAllCategories()
  const category = allCategories.find(({ slug }) => slug === categorySlug)

  if (!category) {
    return { notFound: true }
  }

  let posts = []
  try {
    posts = await getAllPostByCategory(category.id)
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
