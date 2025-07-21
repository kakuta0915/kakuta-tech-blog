import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import MyAccountDelete from './MyAccountDelete'
import eyecatch from '@/public/images/index.jpg'

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'アカウント削除',
  description: 'ユーザーアカウントの削除ページです。',
  alternates: {
    canonical: `${siteUrl}/settings/account/delete`,
  },
  openGraph: {
    title: `アカウント削除 | ${siteTitle}`,
    description: 'ユーザーアカウントの削除ページです。',
    url: `${siteUrl}/settings/account/delete`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'アカウント削除ページのアイキャッチ画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `アカウント削除 | ${siteTitle}`,
    description: 'ユーザーアカウントの削除ページです。',
    images: [eyecatch.src],
  },
}

export default function MyAccountDeletePage() {
  return <MyAccountDelete />
}
