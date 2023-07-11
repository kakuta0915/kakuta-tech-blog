import { getAllPosts } from '@/libs/api'
import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'
import Image from 'next/image'
import eyecatch from 'images/index.jpg'
import TopAbout from '@/src/components/top-about/top-about'
import Posts from '@/src/components/posts/posts'

export default function Home({ posts }) {
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
      <figure style={{ padding: '1rem' }}>
        <Image
          src={eyecatch}
          alt=""
          layout="responsive"
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          placeholder="blur"
        />
      </figure>
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
