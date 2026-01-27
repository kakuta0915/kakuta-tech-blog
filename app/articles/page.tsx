import React from 'react'
import type { Metadata } from 'next'
import { createMetadata } from '@/libs/seo'
import { getAllArticles, getAllCategories } from '@/libs/api'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'
import { redirect } from 'next/navigation'
import { Category, Posts } from '@/types'
import eyecatch from '@/public/images/articles.jpg'

const POSTS_PER_PAGE = 15

export const metadata: Metadata = createMetadata({
  pageTitle: 'ARTICLES',
  pageDesc: 'プログラミング学習に関する記事をまとめたページです。',
  slug: 'articles',
  pageImg: eyecatch.src,
  pageImgW: eyecatch.width,
  pageImgH: eyecatch.height,
})

type ArticlesPageProps = {
  searchParams?: { page?: string }
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const pageParam = searchParams?.page
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1

  const { articles: posts }: { articles: Posts[] } = await getAllArticles()
  const allCategories: Category[] = await getAllCategories()

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  if (currentPage < 1 || currentPage > totalPages) {
    redirect('/articles?page=1')
  }

  const startIdx = (currentPage - 1) * POSTS_PER_PAGE
  const endIdx = startIdx + POSTS_PER_PAGE
  const pagedPosts = posts.slice(startIdx, endIdx)

  return (
    <>
      <Ui.StickyHeader />
      <Ui.Hero
        title="ARTICLES"
        description="プログラミング学習に関する記事をまとめたページです。学習中に躓いた箇所や、開発過程で遭遇した具体的な課題、それに対する解決策を紹介しています。"
        imageSrc={eyecatch.src}
      />
      <Ui.Container>
        <Ui.Posts posts={pagedPosts} />
        <Article.ListPagination
          pageCount={totalPages}
          currentPage={currentPage}
          createPageLink={(page) => `/articles?page=${page}`}
        />
        <Article.CategoriesList allCategories={allCategories} />
      </Ui.Container>
    </>
  )
}
