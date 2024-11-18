// 取得したスラッグで生成されたカテゴリーページ (〇〇に関する記事)
import { getAllCategories, getAllPostByCategory } from '@/libs/api'
import Meta from '@/src/components/meta/meta'
import PostHeader from '@/src/components/postHeader/postHeader'
import Posts from '@/src/components/posts/posts'
import CategoriesList from '@/src/components/categoiresList/categoriesList'
import Container from '@/src/components/container/container'

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
    return {
      notFound: true,
    }
  }

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
