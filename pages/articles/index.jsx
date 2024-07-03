// 記事一覧ページ
import { getAllArticles, getAllCategories } from '@/libs/api'
import Meta from '@/src/components/meta/meta'
import Hero from '@/src/components/hero/hero'
import Container from '@/src/components/container/container'
import Posts from '@/src/components/posts/posts'
import CategoriesList from '@/src/components/categoiresList/categoriesList'
import eyecatch from '@/public/images/articles.jpg'

export default function Articles({ posts, allCategories }) {
  return (
    <>
      <Meta
        pageTitle="ARTICLES"
        pageDesc="プログラミング学習に関する記事をまとめたページです"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero
        title="ARTICLES"
        description="プログラミング学習に関する記事をまとめたページです。学習中に躓いた箇所や、開発過程で遭遇した具体的な課題、それに対する解決策を紹介しています。"
        imageSrc="/images/articles.jpg"
      />
      <Container>
        <Posts posts={posts} />
        <CategoriesList allCategories={allCategories} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllArticles()
  const allCategories = await getAllCategories()

  return {
    props: {
      posts: posts,
      allCategories: allCategories,
    },
  }
}
