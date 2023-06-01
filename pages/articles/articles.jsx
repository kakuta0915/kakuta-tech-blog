// 記事一覧ページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'
import { getAllCategories, getAllPosts } from '@/libs/api'
import Posts from '@/src/components/posts/posts'
import ArticlesCategoriesList from '@/src/components/articles-categoties-list/articles-categories-list'

export default function Articles({ posts, allCategories }) {
  return (
    <>
      <Container>
        <Meta
          pageTitle="ARTICLES"
          pageDesc="プログラミング学習に関する記事をまとめたページです"
        />
        <Hero title="ARTICLES" subtitle="記事一覧" imageOn />
        <ArticlesCategoriesList allCategories={allCategories} />
        <Posts posts={posts} />
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
