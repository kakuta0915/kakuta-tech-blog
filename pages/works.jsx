// worksページ

import Meta from '@/src/components/meta/Meta'
import Container from '@/src/components/layouts/container/Container'
import Hero from '@/src/components/hero/Hero'
import eyecatch from 'images/works.jpg'
import Image from 'next/image'

export default function Works() {
  return (
    <>
      <Container>
        <Meta
          pageTitle="WORKS"
          pageDesc="制作物一覧のページです"
          pageImg={eyecatch.src}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <Hero title="WORKS" subtitle="自主制作一覧" />
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
      </Container>
    </>
  )
}
