import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import eyecatch from '@/public/images/contact.jpg'
import Contact from './Contact'

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'CONTACT',
  description:
    'ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: `CONTACT | ${siteTitle}`,
    description:
      'ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。',
    url: `${siteUrl}/contact`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'お問い合わせページのアイキャッチ画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `CONTACT | ${siteTitle}`,
    description:
      'ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。',
    images: [eyecatch.src],
  },
}

export default function ContactPage() {
  return <Contact />
}
