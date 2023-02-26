import { getPostBySlug } from '@/libs/api'
import Container from '@/src/components/container/container'
import PostHeader from '@/src/components/post-header/post-header'

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
        <PostHeader
          title={title}
          subtitle="Blog Article"
          publish={publish}
        ></PostHeader>
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
