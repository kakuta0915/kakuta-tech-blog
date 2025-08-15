import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import eyecatch from '@/public/images/index.jpg'
import MyAccount from './MyAccount'

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'MY ACCOUNT',
  description: 'いいねやブックマークした記事を見れます。',
  alternates: {
    canonical: `${siteUrl}/my-account`,
  },
  openGraph: {
    title: `MY ACCOUNT | ${siteTitle}`,
    description: 'いいねやブックマークした記事を見れます。',
    url: `${siteUrl}/my-account`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'マイアカウントページのアイキャッチ画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `MY ACCOUNT | ${siteTitle}`,
    description: 'いいねやブックマークした記事を見れます。',
    images: [eyecatch.src],
  },
}

export default function MyAccountPage() {
  return <MyAccount />
}
