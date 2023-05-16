// 記事ページ

import { getPostBySlug, getAllSlugs } from '@/libs/api'
import Container from '@/src/components/container/container'
import PostHeader from '@/src/components/post-header/post-header'
import Image from 'next/image'
import {
  TwoColum,
  TwoColumMain,
  TwoColumSidebar,
} from '@/src/components/two-colum/two-colum'
import ConvertBody from '@/src/components/convert/convert-body'
import PostCategories from '@/src/components/post-categories/post-categories'
import { extractText } from '@/libs/extract-text'
import Meta from '@/src/components/meta/meta'
import { prevNextPost } from '@/libs/prev-next-post'
import Pagination from '@/src/components/pagination/pagination'

export default function Post({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
}) {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />

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
            <ConvertBody contentHTML={content} />
          </TwoColumMain>
          <TwoColumSidebar>
            <PostCategories categories={categories} />
          </TwoColumSidebar>
        </TwoColum>

        <Pagination
          prevText={prevPost.title}
          prevUrl={`/articles/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/articles/${nextPost.slug}`}
        />
      </article>
    </Container>
  )
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs()

  return {
    paths: allSlugs.map(({ slug }) => `/articles/${slug}`),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug

  const post = await getPostBySlug(slug)

  const description = extractText(post.contßent)

  const allSlugs = await getAllSlugs()
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
      description: description,
      prevPost: prevPost,
      nextPost: nextPost,
    },
  }
}
