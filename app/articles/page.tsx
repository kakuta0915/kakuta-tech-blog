import React from 'react'
import { getAllArticles, getAllCategories } from '@/libs/api'
import Meta from '@/components/common/Meta'
import Hero from '@/components/ui/Hero'
import Container from '@/components/ui/Container'
import Posts from '@/components/ui/Posts'
import * as ArticleComponents from '@/features/articles/components'
import eyecatch from '@/public/images/articles.jpg'

type Post = {
  title: string
  slug: string
  eyecatch: { url: string }
  publishDate: string
  categories: { name: string; slug: string }[]
  source: string
  likesCount: number
  bookmarksCount: number
}

type Category = {
  name: string
  slug: string
  icon: {
    url: string
    width: number
    height: number
  }
}

export default async function ArticlesPage() {
  const { articles: posts }: { articles: Post[] } = await getAllArticles()
  const allCategories: Category[] = await getAllCategories()

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
        <ArticleComponents.CategoriesList allCategories={allCategories} />
      </Container>
    </>
  )
}
