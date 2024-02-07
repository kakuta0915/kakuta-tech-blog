// 記事一覧ページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/layouts/container/container'
import Hero from '@/src/components/hero/hero'
import Image from 'next/image'
import eyecatch from 'images/articles.jpg'
import { getAllCategories, getAllPosts } from '@/libs/api'
import Posts from '@/src/components/posts/posts'
import CategoriesList from '@/src/components/categoires-list/categories-list'

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
