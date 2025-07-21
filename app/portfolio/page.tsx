import React from 'react'
import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import * as Ui from '@/components/ui'
import styles from './page.module.css'
import eyecatch from '@/public/images/works.jpg'

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'PORTFOLIO',
  description:
    '独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。',
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title: `PORTFOLIO | ${siteTitle}`,
    description:
      '独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。',
    url: `${siteUrl}/portfolio`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'ポートフォリオページのアイキャッチ画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `PORTFOLIO | ${siteTitle}`,
    description:
      '独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。',
    images: [eyecatch.src],
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

export default function Portfolio() {
  return (
    <>
      <Ui.Hero
        title="PORTFOLIO"
        description="独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。"
        imageSrc="./images/works.jpg"
      />
      <Ui.Container>
        <section className={styles['portfolioList']}>
          <Ui.PortfolioList portfolioData={portfolioData} className={''} />
        </section>
      </Ui.Container>
    </>
  )
}
