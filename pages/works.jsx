// worksページ
import Meta from '@/src/components/Meta/Meta'
import Hero from '@/src/components/Hero/Hero'
import eyecatch from 'images/works.jpg'
import Image from 'next/image'
import styles from '@/src/styles/works.module.css'
import Container from '@/src/components/Container/Container'
import Worklist from '@/src/components/Worklist/Worklist'

const worksData = [
  {
    id: 1,
    imageUrl: '/kenshinkai.png',
    title: '健進会',
    description:
      '「尊厳と自立の尊重」を理念に都内各所に介護施設を運営しています。',
    link: 'https://kenshinkai.vercel.app/',
  },
]

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
        <section className={styles.worksList}>
          <Worklist worksData={worksData} />
        </section>
      </Container>
    </>
  )
}
