import React from 'react'
import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import { getAllArticles, getAllCategories } from '@/libs/api'
import Hero from '@/components/ui/Hero'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'
import eyecatch from '@/public/images/articles.jpg'
import { redirect } from 'next/navigation'

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
  id: any
  name: string
  slug: string
  icon: {
    url: string
    width: number
    height: number
  }
}

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'ARTICLES',
  description: 'プログラミング学習に関する記事をまとめたページです。',
  alternates: {
    canonical: `${siteUrl}/articles`,
  },
  openGraph: {
    title: `ARTICLES | ${siteTitle}`,
    description: 'プログラミング学習に関する記事をまとめたページです。',
    url: `${siteUrl}/articles`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'プログラミング学習に関する記事のページ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `ARTICLES | ${siteTitle}`,
    description: 'プログラミング学習に関する記事をまとめたページです。',
    images: [eyecatch.src],
  },
}

const POSTS_PER_PAGE = 15

type ArticlesPageProps = {
  searchParams?: { page?: string }
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const pageParam = searchParams?.page
  const currentPage = pageParam ? parseInt(pageParam, 15) : 1

  const { articles: posts }: { articles: Post[] } = await getAllArticles()
  const allCategories: Category[] = await getAllCategories()

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  if (currentPage < 1 || currentPage > totalPages) {
    redirect('/articles?page=1')
  }

  const startIdx = (currentPage - 1) * POSTS_PER_PAGE
  const endIdx = startIdx + POSTS_PER_PAGE
  const pagedPosts = posts.slice(startIdx, endIdx)

  const prevPage = currentPage > 1 ? `/articles?page=${currentPage - 1}` : ''
  const nextPage =
    currentPage < totalPages ? `/articles?page=${currentPage + 1}` : ''

  return (
    <>
      <Hero
        title="ARTICLES"
        description="プログラミング学習に関する記事をまとめたページです。学習中に躓いた箇所や、開発過程で遭遇した具体的な課題、それに対する解決策を紹介しています。"
        imageSrc="/images/articles.jpg"
      />
      <Ui.Container>
        <Ui.Posts posts={pagedPosts} />
        <Article.Pagination
          prevText={prevPage ? '前のページ' : ''}
          prevUrl={prevPage}
          nextText={nextPage ? '次のページ' : ''}
          nextUrl={nextPage}
          totalPages={totalPages}
          currentPage={currentPage}
          createPageLink={(page) => `/articles?page=${page}`}
        />
        <Article.CategoriesList allCategories={allCategories} />
      </Ui.Container>
    </>
  )
}
