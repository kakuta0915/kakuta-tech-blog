// worksページ
import Meta from '@/src/components/Meta/Meta'
import Hero from '@/src/components/Hero/Hero'
import Container from '@/src/components/Container/Container'
import Worklist from '@/src/components/Worklist/Worklist'
import styles from '@/src/styles/works.module.css'
import eyecatch from '@/public/images/works.jpg'

const worksData = [
  {
    id: 1,
    imageUrl: '/images/kenshinkai.png',
    title: '健進会',
    description:
      '「尊厳と自立の尊重」を理念に都内各所に介護施設を運営しています。',
    link: 'https://kenshinkai.vercel.app/',
  },
]

export default function Works() {
  return (
    <>
      <Meta
        pageTitle="WORKS"
        description="独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。"
        pageDesc=""
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero
        title="WORKS"
        description="独学で制作したサイトなどを掲載しており、GitHubからコードもご覧いただけます。"
        imageSrc="./images/works.jpg"
      />
      <Container>
        <section className={styles.worksList}>
          <Worklist worksData={worksData} />
        </section>
      </Container>
    </>
  )
}
