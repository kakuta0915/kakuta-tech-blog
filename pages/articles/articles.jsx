// articlesページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'

export default function Articles() {
  return (
    <>
      <Container>
        <Meta
          pageTitle="ARTICLES"
          pageDesc="プログラミング学習に関する記事をまとめたページです"
        />
        <Hero title="ARTICLES" subtitle="記事一覧" imageOn />
      </Container>
    </>
  )
}
