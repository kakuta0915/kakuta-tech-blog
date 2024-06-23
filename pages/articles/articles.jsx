// 記事一覧ページ
import Meta from '@/src/components/Meta/Meta'
import Hero from '@/src/components/Hero/Hero'
import Posts from '@/src/components/Posts/Posts'
import CategoriesList from '@/src/components/CategoiresList/CategoriesList'
import Image from 'next/image'
import eyecatch from 'images/articles.jpg'
import { getAllArticles, getAllCategories } from '@/libs/api'
import Container from '@/src/components/Container/Container'

export default function Articles({ posts, allCategories }) {
  return (
    <>
      <Container>
        <Meta
          pageTitle="ARTICLES"
          pageDesc="プログラミング学習に関する記事をまとめたページです"
          pageImg={eyecatch.src}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <Hero title="ARTICLES" subtitle="記事一覧" />
        <figure style={{ padding: '1rem' }}>
          <Image
            src={eyecatch}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            placeholder="blur"
          />
        </figure>
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
