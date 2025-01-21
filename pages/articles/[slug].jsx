// 記事ページ
import { getPostBySlug, getAllSlugs, getAllCategories } from '@/libs/api'
import Image from 'next/image'
import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { extractText } from '@/libs/extract-text'
import { prevNextPost } from '@/libs/prev-next-post'
import { renderToc } from '@/libs/render-toc'
import Meta from '@/src/components/meta/meta'
import PostHeader from '@/src/components/postHeader/postHeader'
import {
  ThreeColum,
  ThreeColumMain,
  ThreeColumSidebar,
  ThreeColumSocialActions,
} from '@/src/components/threeColum/threeColum'
import Container from '@/src/components/container/container'
import ConvertBody from '@/src/components/convert/convertBody'
import PostBody from '@/src/components/postBody/postBody'
import Comments from '@/src/components/comments/comments'
import SocialActions from '@/src/components/socialActions/socialActions'
import PostCategories from '@/src/components/postCategories/postCategories'
import Pagination from '@/src/components/pagination/pagination'
import TableOfContents from '@/src/components/tableOfContents/tableOfContents'

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
  postId,
}) {
  const toc = renderToc(content)

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block)
    })
  }, [content])

  return (
    <>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Container>
        <article>
          <PostHeader
            icon={icon}
            title={title}
            subtitle="Blog Article"
            publish={publish}
          />
          <ThreeColum>
            <ThreeColumSocialActions>
              <SocialActions postId={postId} title={title} />
            </ThreeColumSocialActions>
            <ThreeColumMain>
              <PostBody>
                <Image
                  src={eyecatch.url}
                  alt=""
                  layout="responsive"
                  width={eyecatch.width}
                  height={eyecatch.height}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  priority
                />
                <ConvertBody contentHTML={content} id={`#${toc.id}`} />
              </PostBody>
              <Comments postId={postId} />
            </ThreeColumMain>
            <ThreeColumSidebar>
              {tocVisible && <TableOfContents toc={toc} />}
              <PostCategories categories={categories} />
            </ThreeColumSidebar>
          </ThreeColum>
          <Pagination
            prevText={prevPost.title}
            prevUrl={`/articles/${prevPost.slug}`}
            nextText={nextPost.title}
            nextUrl={`/articles/${nextPost.slug}`}
          />
        </article>
      </Container>
    </>
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
      postId: slug,
    },
  }
}
