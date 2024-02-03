// contactページ

import Meta from '@/src/components/elements/meta/Meta'
import Container from '@/src/components/layouts/container/Container'
import Hero from '@/src/components/elements/hero/Hero'
import Image from 'next/image'
import eyecatch from 'images/contact.jpg'
import Form from '@/src/components/form/form'

export default function Contact() {
  return (
    <Container>
      <Meta
        pageTitle="CONTACT"
        pageDesc="お問い合わせはこちらからお願いいたします"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero title="CONTACT" subtitle="お問い合わせ" />
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

      <Form />
    </Container>
  )
}
