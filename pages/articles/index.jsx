// 記事一覧ページ
import { getAllArticles, getAllCategories } from '@/libs/api'
import Meta from '@/src/components/Meta1'
import Hero from '@/src/components/Hero1'
import Container from '@/src/components/Container1'
import Posts from '@/src/components/Posts1'
import CategoriesList from '@/src/components/CategoriesList1'
import useScrollAnimation from '@/src/components/UseScrollAnimation1'
import useScrollAnimationStyles from '@/src/components/UseScrollAnimation1/index.module.css'
import eyecatch from '@/public/images/articles.jpg'

export default function Articles({ posts, allCategories }) {
  useScrollAnimation([
    `.${useScrollAnimationStyles.fadeInUp}`,
    `.${useScrollAnimationStyles.fadeInRight}`,
    `.${useScrollAnimationStyles.fadeInLeft}`,
  ])

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
        <Posts className={useScrollAnimationStyles.fadeInUp} posts={posts} />
        <CategoriesList
          className={useScrollAnimationStyles.fadeInUp}
          allCategories={allCategories}
        />
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const { articles: posts } = await getAllArticles()
  const allCategories = await getAllCategories()

  return {
    props: {
      posts,
      allCategories,
    },
  }
}
