import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'

const { siteTitle, siteUrl, siteLocale, siteType, siteIcon } = siteMeta

type OgType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'

const getValidOgType = (type: string): OgType => {
  if (
    type === 'article' ||
    type === 'book' ||
    type === 'profile' ||
    type.startsWith('music.') ||
    type.startsWith('video.')
  ) {
    return type as OgType
  }
  return 'website'
}

// SEO用の情報（メタデータ生成専用）
interface CreateMetadataArgs {
  pageTitle: string
  pageDesc: string
  slug: string
  pageImg?: string
  pageImgW?: number
  pageImgH?: number
}

export function createMetadata({
  pageTitle,
  pageDesc,
  slug,
  pageImg,
  pageImgW,
  pageImgH,
}: CreateMetadataArgs): Metadata {
  const pageUrl = `${siteUrl}/${slug}`
  const imageUrl = pageImg || siteIcon

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: pageTitle,
      template: `%s | ${siteTitle}`,
    },
    description: pageDesc,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${pageTitle} | ${siteTitle}`,
      description: pageDesc,
      url: pageUrl,
      siteName: siteTitle,
      type: getValidOgType(siteType),
      locale: siteLocale,
      images: [
        {
          url: imageUrl,
          width: pageImgW || 1200,
          height: pageImgH || 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | ${siteTitle}`,
      description: pageDesc,
      images: [imageUrl],
    },
  }
}
