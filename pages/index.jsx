import { getAllArticles } from '@/libs/api'
import Image from 'next/image'
import Link from 'next/link'
import Meta from '@/src/components/Meta/Meta'
import Hero from '@/src/components/Hero/Hero'
import Container from '@/src/components/Container/Container'
import Posts from '@/src/components/Posts/Posts'
import eyecatch from '/images/index.jpg'
import kakuta0915 from 'images/kakuta0915.png'
import styles from '@/src/styles/index.module.css'
import Social from '@/src/components/Social/Social'

export default function Home({ posts }) {
  return (
    <>
      <Meta
        pageTitle="TOP"
        pageDesc="プログラミン  グ学習記録をまとめたサイト"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero
        title="KAKUTA"
        title2="TECH BLOG"
        description="このサイトでは、Next.jsとmicroCMSを組み合わせ、プログラミングの技術ブログを制作しました。 開発過程で学習時に躓いた箇所や解決策について、詳細な記事をまとめています。"
        imageSrc="./images/index.jpg"
        contact={true}
      />
      <Container>
        <div className={styles.aboutContents}>
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
            <Link className={styles.btn} href="./about">
              MORE
            </Link>
          </div>
        </div>
        <Posts posts={posts} maxPosts={6} btn />
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
