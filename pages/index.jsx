import { useEffect, useState } from 'react';
// import { Link, Element, animateScroll as scroll } from 'react-scroll';
import { getAllPosts } from '@/libs/api'
import Meta from '@/src/components/elements/meta/Meta'
import Container from '@/src/components/layouts/container/Container'
import Hero from '@/src/components/elements/hero/Hero'
import Image from 'next/image'
import eyecatch from 'images/index.jpg'
import TopAbout from '@/src/components/top-about/top-about'
import Posts from '@/pages/articles/components/Posts/Posts'

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
          <figure style={{ padding: '1rem' }}>
          <Image
            src={eyecatch}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            placeholder="blur"
            // className={isAnimated ? styles.fadeInImage : ''}
          />
        </figure>
        {/* </Element> */}
      <TopAbout />

      <Posts posts={posts} btn />
    </Container>
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
