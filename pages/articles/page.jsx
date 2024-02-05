// 記事一覧ページ

import Meta from '@/src/components/elements/meta/Meta'
import Container from '@/src/components/layouts/container/Container'
import Hero from '@/src/components/elements/hero/Hero'
import Image from 'next/image'
import eyecatch from 'images/articles.jpg'
import { getAllCategories, getAllPosts } from '@/libs/api'
import Posts from '@/pages/articles/components/posts/Posts'
import CategoriesList from '@/src/components/elements/categoiresList/CategoriesList'

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
  const posts = await getAllPosts()
  const allCategories = await getAllCategories()

  return {
    props: {
      posts: posts,
      allCategories: allCategories,
    },
  }
}
