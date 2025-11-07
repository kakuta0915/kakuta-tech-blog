import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'

const { siteTitle, siteUrl, siteLocale, siteType, siteIcon } = siteMeta

// Next.jsのMetadata型に合わせた OGタイプ
export type OgType = 'website' | 'article' | 'book' | 'profile'

// デフォルトOGタイプを安全に返す
export const getValidOgType = (type?: string): OgType => {
  if (!type || !['website', 'article', 'book', 'profile'].includes(type)) {
    return 'website'
  }
  return type as OgType
}

// メタデータ生成
export type CreateMetadataArgs = {
  pageTitle: string
  pageDesc?: string
  slug: string
  pageImg?: string
  pageImgW?: number
  pageImgH?: number
  ogType?: OgType
}

export function createMetadata({
  pageTitle,
  pageDesc = '',
  slug,
  pageImg,
  pageImgW,
  pageImgH,
  ogType = siteType as OgType,
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
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${pageTitle} | ${siteTitle}`,
      description: pageDesc,
      url: pageUrl,
      siteName: siteTitle,
      type: getValidOgType(ogType),
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
