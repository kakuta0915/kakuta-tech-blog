import Meta from '@/src/components/meta/meta'
import Hero from '@/src/components/hero/hero'
import Container from '@/src/components/container/container'
import PortfolioList from '@/src/components/portfolioList/portfolioList'
import useScrollAnimation from '@/src/components/useScrollAnimation/useScrollAnimation'
import useScrollAnimationStyles from '@/src/components/useScrollAnimation/useScrollAnimation.module.css'
import styles from './index.module.css'
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
  useScrollAnimation([
    `.${useScrollAnimationStyles.fadeInUp}`,
    `.${useScrollAnimationStyles.fadeInRight}`,
    `.${useScrollAnimationStyles.fadeInLeft}`,
  ])
  return (
    <>
      <Meta
        pageTitle="PORTFOLIO"
        description="独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。"
        pageDesc=""
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
        <section className={styles.portfolioList}>
          <PortfolioList
            className={useScrollAnimationStyles.fadeInUp}
            portfolioData={portfolioData}
          />
        </section>
      </Container>
    </>
  )
}
