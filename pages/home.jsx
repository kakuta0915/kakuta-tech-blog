import { useEffect, useState } from 'react';
// import { Link, Element, animateScroll as scroll } from 'react-scroll';
import { getAllPosts } from '@/libs/api'
import Meta from '@/src/components/elements/meta/Meta'
import Container from '@/src/components/layouts/container/Container'
import Hero from '@/src/components/elements/hero/Hero'
import Image from 'next/image'
import eyecatch from 'images/index.jpg'
import Posts from '@/pages/articles/components/posts/Posts'
import Link from 'next/link';
import styles from '@/src/styles/home.module.css'
import kakuta0915 from 'images/kakuta0915.jpg'

export default function Home({ posts }) {
  // const [isAnimated, setIsAnimated] = useState(false);

  //   const handleScroll = () => {
  //   const offset = window.innerHeight / 1.5; // スクロール位置からのオフセット
  //   if (window.scrollY > offset && !isAnimated) {
  //     setIsAnimated(true);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [isAnimated]);

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
      {/* <Element name="section1" className={styles.fadeInSection}>
        ここにフェードインしたいコンテンツを配置 */}
        <Image
          src={eyecatch}
          alt=""
          layout="responsive"
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          placeholder="blur"
          // className={isAnimated ? styles.fadeInImage : ''}
        />
      {/* </Element> */}
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
        <Posts posts={posts} btn />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts(4)

  return {
    props: {
      posts: posts,
    },
  }
}
