import { getAllArticles } from '@/libs/api'
import Image from 'next/image'
import Link from 'next/link'
import Meta from '@/src/components2/meta/meta'
import Hero from '@/src/components2/hero/hero'
import Container from '@/src/components2/container/container'
import Posts from '@/src/components2/posts/posts'
import Social from '@/src/components2/social/social'
import PortfolioList from '@/src/components2/portfolioList/portfolioList'
import styles from '@/src/styles/index.module.css'
import eyecatch from '@/public/images/index.jpg'
import kakuta0915 from '@/public/images/kakuta0915.png'

export default function Home({ posts }) {
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
        description="このサイトでは、Next.jsとmicroCMSを組み合わせ、プログラミングの技術ブログを制作しました。 開発過程で学習時に躓いた箇所や解決策について、詳細な記事をまとめています。"
        imageSrc="/images/index.jpg"
        contact={true}
      />
      <Container>
        <section className={styles.aboutSection}>
          <h2>About Me</h2>
          <p>
            エンジニア転職を目指し、自主的にプログラミングを学習しています。日々の学びや経験を通じて、技術力の向上と実践的なスキルの構築に注力しています。これまでの学習過程やスキルセットについて、詳しくご紹介いたします。
          </p>
          <Image
            className={styles.profileIcon}
            src={kakuta0915}
            alt=""
            objectFit="contain"
            priority
            placeholder="blur"
          />
          <Social />
          <div className={styles.btnBox}>
            <Link className={styles.btn} href="./about/">
              MORE
            </Link>
          </div>
        </section>

        <section className={styles.articlesSection}>
          <h2>Articles</h2>
          <p>
            プログラミング学習に関する記事をまとめたページです。学習中に躓いた箇所や、開発過程で遭遇した具体的な課題、それに対する解決策を紹介しています。
          </p>
          <Posts posts={posts} maxPosts={6} btn />
        </section>

        <section className={styles.portfolioSection}>
          <h2>Portfolio</h2>
          <p>
            独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。
          </p>
          <PortfolioList
            portfolioData={portfolioData}
            className={styles.portfolioList}
          />
          <div className={styles.btnBox}>
            <Link className={styles.btn} href="./portfolio/">
              MORE
            </Link>
          </div>
        </section>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllArticles()

  return {
    props: {
      posts: posts,
    },
  }
}
