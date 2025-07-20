import { siteMeta } from '@/libs/constants'
import siteImg from '/public/images/ogp.jpg'
import type { Metadata } from 'next'

const { siteTitle, siteUrl, siteLocale, siteType, siteIcon } = siteMeta

const validSiteTypes = [
  'website',
  'article',
  'book',
  'profile',
  'music.song',
  'music.album',
  'music.playlist',
  'music.radio_station',
  'video.movie',
  'video.episode',
  'video.tv_show',
  'video.other',
] as const

type SiteType = (typeof validSiteTypes)[number]

function isValidSiteType(type: string): type is SiteType {
  return validSiteTypes.includes(type as SiteType)
}

type GenerateMetadataProps = {
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
}: GenerateMetadataProps): Metadata {
  const url = `${siteUrl}/articles/${slug}`
  const img = pageImg || siteImg.src
  const imgW = pageImgW || siteImg.width
  const imgH = pageImgH || siteImg.height
  const imgUrl = img.startsWith('https') ? img : `${siteUrl}${img}`
  const ogType = isValidSiteType(siteType) ? siteType : 'website'

  return {
    title: `${pageTitle} | ${siteTitle}`,
    description: pageDesc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${pageTitle} | ${siteTitle}`,
      description: pageDesc,
      url,
      siteName: siteTitle,
      type: ogType,
      locale: siteLocale,
      images: [
        {
          url: imgUrl,
          width: imgW,
          height: imgH,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | ${siteTitle}`,
      description: pageDesc,
      images: [imgUrl],
    },
    icons: {
      icon: siteIcon,
      apple: siteIcon,
    },
  }
}
