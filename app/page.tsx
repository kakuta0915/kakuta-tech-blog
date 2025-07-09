import React from 'react'
import { getAllArticles } from '@/libs/api'
import Image from 'next/image'
import Link from 'next/link'
import Meta from '@/src/components/Meta'
import Hero from '@/src/components/Hero'
import Container from '@/src/components/Container'
import Posts from '@/src/components/Posts'
import Social from '@/src/components/Social'
import PortfolioList from '@/src/components/PortfolioList'
import styles from './index.module.css'
import eyecatch from '@/public/images/index.jpg'
import kakuta0915 from '@/public/images/kakuta0915.png'

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

export const metadata = {
  title: 'TOP',
  description: 'プログラミング学習記録をまとめたサイト',
  openGraph: {
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
      },
    ],
  },
}

const portfolioData = [
  {
    id: 1,
    imageUrl: '/images/kenshinkai.png',
    title: '健進会',
    description:
      '「尊厳と自立の尊重」を理念に都内各所に介護施設を運営しています。',
    link: 'https://kenshinkai.vercel.app/',
  },
]

export default async function Home() {
  const { articles } = await getAllArticles()
  const posts: Post[] = articles

  return (
    <>
      <Meta
        pageTitle="TOP"
        pageDesc="プログラミング学習記録をまとめたサイト"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero
        title="KAKUTA"
        title2="TECH BLOG"
        description="このサイトでは、ReactとNext.jsとmicroCMSを組み合わせ、プログラミングの技術ブログを制作しました。 学習したことをアウトプットしたり、学習時に躓いた箇所や解決策について、詳細な記事をまとめています。"
        imageSrc="/images/index.jpg"
        contact={true}
      />
      <Container>
        <section className={styles['aboutSection']}>
          <h2>About Me</h2>
          <p className={styles['text']}>
            技術力の向上と実践的なスキル構築を目指し、自主的にプログラミングを学習しています。
            これまでの学習過程やスキルセットなど、私のプロフィールについてご紹介いたします。
          </p>
          <Image
            className={styles['profileIcon']}
            src={kakuta0915}
            alt=""
            objectFit="contain"
            priority
            placeholder="blur"
          />
          <Social isFooterSocial={false} />
          <div className={styles['btnBox']}>
            <Link className={styles['btn']} href="/about">
              MORE
            </Link>
          </div>
        </section>

        <section className={styles['articlesSection']}>
          <h2>Articles</h2>
          <p className={styles['text']}>
            プログラミング学習に関する記事をまとめたページです。学習中に躓いた箇所や、開発過程で遭遇した具体的な課題、それに対する解決策を紹介しています。
          </p>
          <Posts posts={posts} maxPosts={6} btn />
        </section>

        <section className={styles['portfolioSection']}>
          <h2>Portfolio</h2>
          <p className={styles['text']}>
            独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。
          </p>
          <PortfolioList portfolioData={portfolioData} className={''} />
          <div className={styles['btnBox']}>
            <Link className={styles['btn']} href="/portfolio">
              MORE
            </Link>
          </div>
        </section>
      </Container>
    </>
  )
}
