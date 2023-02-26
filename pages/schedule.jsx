import { getPostBySlug } from '@/libs/api'
import Container from '@/src/components/container/container'
import PostHeader from '@/src/components/post-header/post-header'
import Image from 'next/image'
import PostBody from '@/src/components/post-body/post-body'
import {
  TwoColum,
  TwoColumMain,
  TwoColumSidebar,
} from '@/src/components/two-colum/two-colum'
import ConvertBody from '@/src/components/convert/convert-body'

export default function Schedule({
  title,
  publish,
  content,
  eyecatch,
  categories,
}) {
  return (
    <Container>
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />
        <figure>
          <Image
            src={eyecatch.url}
            alt=""
            layout="responsive"
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </figure>
        <TwoColum>
          <TwoColumMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumMain>
          <TwoColumSidebar></TwoColumSidebar>
        </TwoColum>
      </article>
    </Container>
  )
}

export async function getStaticProps() {
  const slug = 'schedule'

  const post = await getPostBySlug(slug)

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
    },
  }
}
