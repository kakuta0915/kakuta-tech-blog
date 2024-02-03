// 記事ページ

import { getPostBySlug, getAllSlugs, getAllCategories } from '@/libs/api'
import Container from '@/src/components/layouts/container/Container'
import PostHeader from '@/pages/articles/components/PostHeader/PostHeader'
import Image from 'next/image'
import {
  TwoColum,
  TwoColumMain,
  TwoColumSidebar,
} from '@/src/components/layouts/two-colum/TwoColum'
import ConvertBody from '@/src/components/convert/ConvertBody'
import PostCategories from '@/pages/articles/components/PostCategories/PostCategories'
import { extractText } from '@/libs/extract-text'
import Meta from '@/src/components/elements/meta/Meta'
import { prevNextPost } from '@/libs/prev-next-post'
import Pagination from '@/src/components/elements/pagination/Pagination'
import PostBody from '@/pages/articles/components/PostBody/PostBody'
import { renderToc } from '@/libs/render-toc'
import TableOfContents from '@/src/components/elements/table-of-contents/TableOfContents'
import 'highlight.js/styles/night-owl.css'

export default function Post({
  icon,
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
  tocVisible,
}) {
  const toc = renderToc(content)

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
        <PostHeader
          icon={icon}
          title={title}
          subtitle="Blog Article"
          publish={publish}
        />

        <TwoColum>
          <TwoColumMain>
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

            <PostBody>
              <ConvertBody contentHTML={content} id={`#${toc.id}`} />
            </PostBody>
          </TwoColumMain>
          <TwoColumSidebar>
            <PostCategories categories={categories} />
            {tocVisible && <TableOfContents toc={toc} />}
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

  const description = extractText(post.content)

  const allSlugs = await getAllSlugs()

  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)

  const allCategories = await getAllCategories()

  const category = allCategories.find(({ slug }) => slug === post.category)

  return {
    props: {
      icon: category.icon,
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
      description: description,
      prevPost: prevPost,
      nextPost: nextPost,
      tocVisible: post.toc_visible,
    },
  }
}
