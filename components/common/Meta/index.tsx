'use client'

import React from 'react'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { siteMeta } from '@/libs/constants'
import siteImg from '/public/images/ogp.jpg'

const { siteTitle, siteUrl, siteLocale, siteType, siteIcon } = siteMeta

type MetaProps = {
  pageTitle: string
  pageDesc: string
  pageImg?: string
  pageImgW?: number
  pageImgH?: number
}

const Meta = ({
  pageTitle,
  pageDesc,
  pageImg,
  pageImgW,
  pageImgH,
}: MetaProps) => {
  const pathname = usePathname()
  const url = `${siteUrl}${pathname}`
  const img = pageImg || siteImg.src
  const imgW = pageImgW || siteImg.width
  const imgH = pageImgH || siteImg.height
  const imgUrl = img.startsWith('https') ? img : `${siteUrl}${img}`

  return (
    <Head>
      <title>
        {pageTitle} | {siteTitle}
      </title>
      <meta property="og:title" content={`${pageTitle} | ${siteTitle}`} />
      <meta name="description" content={pageDesc} />
      <meta property="og:description" content={pageDesc} />

      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={siteType} />
      <meta property="og:locale" content={siteLocale} />

      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />

      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgW)} />
      <meta property="og:image:height" content={String(imgH)} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Meta
