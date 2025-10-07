import React from 'react'
import { getAllArticles } from '@/libs/api'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import * as Ui from '@/components/ui'
import styles from './page.module.css'
import eyecatch from '@/public/images/index.jpg'
import kakuta0915 from '@/public/images/kakuta0915.png'

type Post = {
  title: string
  slug: string
  eyecatch: { url: string }
  publishDate: string
  categories: { name: string; slug: string }[]
  source: string
}

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'TOP',
  description: 'プログラミング学習記録をまとめたサイト',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `TOP | ${siteTitle}`,
    description: 'プログラミング学習記録をまとめたサイト',
    url: siteUrl,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'KAKUTA TECH BLOGのアイキャッチ画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `TOP | ${siteTitle}`,
    description: 'プログラミング学習記録をまとめたサイト',
    images: [eyecatch.src],
  },
}

export default async function HomePage() {
  const { articles } = await getAllArticles()
  const posts: Post[] = articles

  return (
    <>
      <Ui.StickyHeader />
      <Ui.Hero
        title="KAKUTA"
        title2="TECH BLOG"
        description="このサイトでは、Next.jsとmicroCMSを組み合わせ、プログラミングの技術ブログを制作しました。 学習したことをアウトプットしたり、学習時に躓いた箇所や解決策について、詳細な記事をまとめています。"
        imageSrc="/images/index.jpg"
        contact={true}
      />
      <Ui.Container>
        <section className={styles['aboutSection']}>
          <h2>About Me</h2>
          <p className={styles['text']}>
            技術力の向上と実践的なスキル構築を目指し、自主的にプログラミングを学習しています。
            これまでの学習過程やスキルセットなど、私のプロフィールについてご紹介いたします。
          </p>
          <Image
            className={styles['profileIcon']}
            src={kakuta0915}
            alt="角田のプロフィールアイコン"
            objectFit="contain"
            priority
            placeholder="blur"
          />
          <Ui.Social isFooterSocial={false} />
          <div className={styles['btnContainer']}>
            <Link className={styles['showMoreButton']} href="/about">
              MORE
            </Link>
          </div>
        </section>

        <section className={styles['articlesSection']}>
          <h2>Articles</h2>
          <p className={styles['text']}>
            プログラミング学習に関する記事をまとめたページです。学習中に躓いた箇所や、開発過程で遭遇した具体的な課題、それに対する解決策を紹介しています。
          </p>
          <Ui.Posts posts={posts} maxPosts={6} showMoreButton />
        </section>
      </Ui.Container>
    </>
  )
}
