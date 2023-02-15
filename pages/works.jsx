// worksページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'

export default function Works() {
  return (
    <>
      <Container>
        <Meta pageTitle="WORKS" pageDesc="制作物一覧のページです" />
        <Hero title="WORKS" subtitle="自主制作一覧" imageOn />
      </Container>
    </>
  )
}
