// aboutページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/layouts/container/container'
import Profile from '@/src/components/profile/profile'
import Hero from '@/src/components/hero/hero'
import Image from 'next/image'
import eyecatch from 'images/about.jpg'

export default function About() {
  return (
    <>
      <Container>
        <Meta
          pageTitle="ABOUT"
          pageDesc="このサイトについての説明とプロフィールのページです"
          pageImg={eyecatch.src}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <Hero
          title="ABOUT"
          subtitle="このページについての説明と自己紹介をします"
        />
        <figure style={{ padding: '1rem' }}>
          <Image
            src={eyecatch}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 80vw"
            priority
            placeholder="blur"
          />
        </figure>
        <Profile />
      </Container>
    </>
  )
}
