import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'
import { getAllPosts } from '@/libs/api'
import Posts from '@/src/components/posts/posts'

export default function Home({ posts }) {
  return (
    <>
      <Container>
        <Meta
          pageTitle="TOP"
          pageDesc="プログラミング学習記録をまとめたサイト"
        />
        <Hero title="TOP" subtitle="トップページ" imageOn />

        <Posts posts={posts} />
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
