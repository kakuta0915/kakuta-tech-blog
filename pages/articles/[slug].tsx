// 記事ページ
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { getPostBySlug, getAllSlugs, getAllCategories } from '@/libs/api'
import { extractText } from '@/libs/extract-text'
import { prevNextPost } from '@/libs/prev-next-post'
import { renderToc } from '@/libs/render-toc'
import Meta from '@/src/components/Meta'
import PostHeader from '@/src/components/PostHeader'
import {
  ThreeColum,
  ThreeColumMain,
  ThreeColumSidebar,
  ThreeColumSocialActions,
} from '@/src/components/ThreeColum'
import Container from '@/src/components/Container'
import ConvertBody from '@/src/components/Convert/ConvertBody'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import PostBody from '@/src/components/PostBody'
import Comments from '@/src/components/Comments'
import SocialActions from '@/src/components/SocialActions'
import PostCategories from '@/src/components/PostCategories'
import Pagination from '@/src/components/Pagination'
import TableOfContents from '@/src/components/TableOfContents'

type Eyecatch = {
  url: string
  width: number
  height: number
}

type Icon = {
  url: string
  width: number
  height: number
}

type Category = {
  id: string
  name: string
  slug: string
  icon: Icon
}

type PrevNextPost = {
  title: string
  slug: string
}

type TocItem = {
  id: string
  text: string
}

type PostProps = {
  icon: Icon
  title: string
  publish: string
  content: string
  eyecatch: Eyecatch
  categories: Category[]
  description: string
  prevPost: PrevNextPost
  nextPost: PrevNextPost
  tocVisible: boolean
  postId: string
}

const Post: React.FC<PostProps> = ({
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
}) => {
  const rawToc = renderToc(content)
  const toc: TocItem[] = rawToc
    .filter(
      (item): item is { id: string; text: string; name: string } => !!item.id,
    )
    .map(({ id, text }) => ({ id: id!, text }))

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      return hljs.highlightElement(block as HTMLElement)
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
                <ConvertBody contentHTML={content} />
              </PostBody>
              <Comments postId={postId} id={''} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs: { slug: string }[] = await getAllSlugs()

  return {
    paths: allSlugs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string }
> = async (context) => {
  const slug = context.params?.slug
  if (!slug) {
    return { notFound: true }
  }
  const post = await getPostBySlug(slug)
  const description = extractText(post.content)
  const allSlugs = await getAllSlugs()
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)
  const allCategories = await getAllCategories()
  const category = allCategories.find(
    ({ slug }: { slug: string }) => slug === post.category,
  )

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

export default Post
