// 記事ページ
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { getPostBySlug, getAllSlugs, getAllCategories } from '@/libs/api'
import hljs from 'highlight.js'
import { extractText } from '@/libs/extract-text'
import { prevNextPost } from '@/libs/prev-next-post'
import { renderToc } from '@/libs/render-toc'
import Meta from '@/components/common/Meta'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'

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
      <Ui.Container>
        <article>
          <Article.PostHeader
            icon={icon}
            title={title}
            subtitle="Blog Article"
            publish={publish}
          />
          <Article.ThreeColum>
            <Article.ThreeColumPostActions>
              <Article.PostActions postId={postId} title={title} />
            </Article.ThreeColumPostActions>
            <Article.ThreeColumMain>
              <Article.PostBody>
                <Image
                  src={eyecatch.url}
                  alt=""
                  layout="responsive"
                  width={eyecatch.width}
                  height={eyecatch.height}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  priority
                />
                <Article.ConvertBody contentHTML={content} />
              </Article.PostBody>
              <Article.Comments postId={postId} id={''} />
            </Article.ThreeColumMain>
            <Article.ThreeColumSidebar>
              {tocVisible && <Article.TableOfContents toc={toc} />}
              <Article.PostCategories categories={categories} />
            </Article.ThreeColumSidebar>
          </Article.ThreeColum>
          <Article.Pagination
            prevText={prevPost.title}
            prevUrl={`/articles/${prevPost.slug}`}
            nextText={nextPost.title}
            nextUrl={`/articles/${nextPost.slug}`}
          />
        </article>
      </Ui.Container>
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
