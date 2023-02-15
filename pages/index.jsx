import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'

export default function Home() {
  return (
    <>
      <Container>
        <Meta
          pageTitle="TOP"
          pageDesc="プログラミング学習記録をまとめたサイト"
        />
        <Hero title="TOP" subtitle="トップページ" imageOn />
      </Container>
    </>
  )
}
