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
          <h3>このサイトについて</h3>
          <p>
            Next.jsとmicroCMSと組み合わせてプログラミングの技術ブログを制作してみました。
            <br />
            学習時に躓いた箇所などを記事にしてまとめています。
          </p>
          <h3>プロフィール</h3>
          <figure>
            <Image
              src={kakuta0915}
              alt=""
              objectFit="contain"
              priority
              placeholder="blur"
            />
          </figure>
          <p>
            エンジニア転職を目標に日々独学でプログラミング学習をしています。
            <br />
            日々の学習で躓いた箇所などを記事にしています。
          </p>
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
