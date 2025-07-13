import React from 'react'
import Meta from '@/components/common/Meta'
import Hero from '@/components/ui/Hero'
import Container from '@/components/ui/Container'
import PortfolioList from '@/components/ui/PortfolioList'
import styles from './page.module.css'
import eyecatch from '@/public/images/works.jpg'

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
      <Meta
        pageTitle="PORTFOLIO"
        pageDesc="独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero
        title="PORTFOLIO"
        description="独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。"
        imageSrc="./images/works.jpg"
      />
      <Container>
        <section className={styles['portfolioList']}>
          <PortfolioList portfolioData={portfolioData} className={''} />
        </section>
      </Container>
    </>
  )
}
