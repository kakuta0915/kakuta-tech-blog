// 記事ページ

import { getPostBySlug, getAllSlugs, getAllCategories } from '@/libs/api'
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
import PostBody from '@/src/components/post-body/post-body'
import { renderToc } from '@/libs/render-toc'
import TableOfContents from '@/src/components/table-of-contents/table-of-contents'
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
  const slug1 = context.params.slug

  const post = await getPostBySlug(slug1)

  const description = extractText(post.content)

  const allSlugs = await getAllSlugs()

  const [prevPost, nextPost] = prevNextPost(allSlugs, slug1)

  const allCategories = await getAllCategories()
  const category = allCategories.find(({ slug }) => slug === slug1)

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
