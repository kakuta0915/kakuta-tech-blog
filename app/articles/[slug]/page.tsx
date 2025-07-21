import { notFound } from 'next/navigation'
import Image from 'next/image'
import { cache } from 'react'
import type { Metadata } from 'next'
import { createMetadata } from '@/utils/createMetadata'
import { getPostBySlug, getAllSlugs, getAllCategories } from '@/libs/api'
import { extractText } from '@/libs/extract-text'
import { prevNextPost } from '@/libs/prev-next-post'
import { renderToc } from '@/libs/render-toc'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'
import type { Category } from '@/types'

type PostSlug = { slug: string }

type Props = {
  params: {
    slug: string
  }
}

const fetchPost = cache(async (slug: string) => {
  const post = await getPostBySlug(slug)
  if (!post) return null

  const allSlugs: PostSlug[] = await getAllSlugs()
  const allCategories: Category[] = await getAllCategories()
  const category = allCategories.find(({ slug: s }) => s === post.category)

  if (!category) return null

  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)

  return {
    icon: category.icon,
    title: post.title,
    publish: post.publishDate,
    content: post.content,
    eyecatch: post.eyecatch,
    categories: post.categories,
    description: extractText(post.content),
    prevPost,
    nextPost,
    tocVisible: post.toc_visible,
    postId: slug,
  }
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const data = await fetchPost(slug)

  if (!data) {
    notFound()
  }

  const { title, description, eyecatch } = data

  return createMetadata({
    pageTitle: title,
    pageDesc: description,
    slug: slug,
    pageImg: eyecatch.url,
    pageImgW: eyecatch.width,
    pageImgH: eyecatch.height,
  })
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllSlugs()
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = params
  const data = await fetchPost(slug)

  if (!data) {
    notFound()
  }

  const {
    icon,
    title,
    publish,
    content,
    eyecatch,
    categories,
    prevPost,
    nextPost,
    tocVisible,
    postId,
  } = data

  const rawToc = renderToc(content)
  const toc = rawToc
    .filter(
      (item): item is { id: string; text: string; name: string } => !!item.id,
    )
    .map(({ id, text }) => ({ id, text }))

  return (
    <>
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
          {prevPost && nextPost && (
            <Article.Pagination
              prevText={prevPost.title}
              prevUrl={`/articles/${prevPost.slug}`}
              nextText={nextPost.title}
              nextUrl={`/articles/${nextPost.slug}`}
            />
          )}
        </article>
      </Ui.Container>
    </>
  )
}
