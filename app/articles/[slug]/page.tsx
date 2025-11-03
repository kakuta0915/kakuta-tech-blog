import { cache } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createMetadata } from '@/libs/seo'
import { getPostBySlug, getAllSlugs, getAllCategories } from '@/libs/api'
import { extractText } from '@/libs/extract-text'
import { prevNextPost } from '@/libs/prev-next-post'
import { renderToc } from '@/libs/render-toc'
import * as Ui from '@/components/ui'
import * as Article from '@/features/article/components'
import styles from './page.module.css'
import { Category, Posts } from '@/types'

export const fetchCache =
  process.env.NODE_ENV === 'development' ? 'force-no-store' : 'default-cache'
export const revalidate = 60

// 記事ページのslug
type Params = { slug: string }
type Props = {
  params: Params
}

// 記事詳細ページ専用の型を追加
type ArticleDetail = Posts & {
  icon?: { url: string; width: number; height: number }
  description: string
  prevPost?: { title: string; slug: string }
  nextPost?: { title: string; slug: string }
  postId: string
  publish: string
}

const fetchPost = cache(async (slug: string): Promise<ArticleDetail | null> => {
  const post = await getPostBySlug(slug)
  if (!post) return null

  const allSlugs = await getAllSlugs()
  const allCategories = await getAllCategories()
  const category = allCategories.find(({ slug: s }) => s === post.category)
  if (!category) return null

  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)

  return {
    icon: category.icon,
    title: post.title,
    publish: post.publishDate,
    publishDate: post.publishDate,
    slug: slug,
    category: post.category,
    content: post.content,
    eyecatch: {
      url: post.eyecatch.url,
      width: post.eyecatch.width ?? 0,
      height: post.eyecatch.height ?? 0,
    },
    categories: post.categories.map((cat: Category) => ({
      ...cat,
      icon: cat.icon
        ? {
            url: cat.icon.url,
            width: cat.icon.width ?? 0,
            height: cat.icon.height ?? 0,
          }
        : undefined,
    })),
    description: extractText(post.content),
    prevPost,
    nextPost,
    postId: slug,
    source: post.source ?? '',
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
    // postId,
  } = data

  const rawToc = renderToc(content)
  const toc = rawToc
    .filter(
      (item): item is { id: string; text: string; name: string } => !!item.id,
    )
    .map(({ id, text, name }) => ({ id, text, name }))

  return (
    <>
      <Article.ArticleStickyHeader toc={toc} />
      <Ui.Container>
        <article>
          <Article.PostHeader
            icon={icon}
            title={title}
            subtitle="Blog Article"
            publish={publish}
          />
          <div className={styles['container']}>
            <div className={styles['main']}>
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
            </div>
            <div className={styles['sidebar']}>
              {/* <Article.PostActions postId={postId} title={title} /> */}
              <Article.PostCategories
                categories={categories.map(({ name, slug, icon }) => ({
                  name,
                  slug,
                  icon: icon ?? { url: '', width: 0, height: 0 },
                }))}
              />
              <div className={styles['tocDesktop']}>
                <Article.TableOfContents
                  toc={toc.map(({ id, text, name }) => ({
                    id,
                    text,
                    name: name === 'h2' || name === 'h3' ? name : undefined,
                  }))}
                />
              </div>
            </div>
          </div>
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
