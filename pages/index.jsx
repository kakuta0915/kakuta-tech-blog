import { getAllArticles } from '@/libs/api'
import Meta from '@/src/components/Meta/Meta'
import Hero from '@/src/components/Hero/Hero'
import Image from 'next/image'
import eyecatch from 'images/index.jpg'
import Posts from '@/src/components/Posts/Posts'
import Link from 'next/link'
import styles from '@/src/styles/index.module.css'
import kakuta0915 from 'images/kakuta0915.png'
import Container from '@/src/components/Container/Container'

export default function Home({ posts }) {
  return (
    <>
      <Container>
        <Meta
          pageTitle="TOP"
          pageDesc="プログラミング学習記録をまとめたサイト"
          pageImg={eyecatch.src}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <Hero title="TOP" subtitle="トップページ" />
        <Image
          src={eyecatch}
          alt=""
          layout="responsive"
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          placeholder="blur"
        />
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
  console.log(posts)

  return {
    props: {
      posts: posts,
    },
  }
}
