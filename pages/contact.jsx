// contactページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'

export default function Contact() {
  return (
    <>
      <Container>
        <Meta
          pageTitle="CONTACT"
          pageDesc="お問い合わせはこちらからお願いいたします"
        />
        <Hero title="CONTACT" subtitle="お問い合わせ" imageOn />
      </Container>
    </>
  )
}
