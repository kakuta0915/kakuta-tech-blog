import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import MyAccountEditClient from './MyAccountEditClient'
import eyecatch from '@/public/images/index.jpg'

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'SETTINGS',
  description: 'アイコンやアカウント名の設定を行うページです。',
  alternates: {
    canonical: `${siteUrl}/settings/account/edit`,
  },
  openGraph: {
    title: `SETTINGS | ${siteTitle}`,
    description: 'アイコンやアカウント名の設定を行うページです。',
    url: `${siteUrl}/settings/account/edit`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: '設定ページのアイキャッチ画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `SETTINGS | ${siteTitle}`,
    description: 'アイコンやアカウント名の設定を行うページです。',
    images: [eyecatch.src],
  },
}

export default function MyAccountEditPage() {
  return <MyAccountEditClient />
}
