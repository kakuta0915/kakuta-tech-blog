import React from 'react'
import Meta from '@/components/common/Meta'
import * as Ui from '@/components/ui'
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
