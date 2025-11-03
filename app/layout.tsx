// アプリ全体の共通設定 (全体のデフォルトSEO設定)
// どのページにも共通して使われるタイトルやOGP、faviconなどを定義。

import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'
import Layout from '@/components/Layouts'
import { siteMeta } from '@/libs/constants'
import { getValidOgType } from '@/libs/seo'
import siteImg from '/public/images/ogp.jpg'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const {
  siteTitle,
  siteDesc,
  siteUrl,
  siteLang,
  siteLocale,
  siteType,
  siteIcon,
} = siteMeta

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDesc,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDesc,
    url: siteUrl,
    siteName: siteTitle,
    type: getValidOgType(siteType),
    locale: siteLocale,
    images: [
      {
        url: siteImg.src,
        width: siteImg.width,
        height: siteImg.height,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDesc,
    images: [siteImg.src],
  },
  icons: {
    icon: siteIcon,
    apple: siteIcon,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={siteLang}>
      <body>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env['NEXT_PUBLIC_GA_ID']}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env['NEXT_PUBLIC_GA_ID']}');
            `,
          }}
        />
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar
          closeOnClick
          pauseOnHover
        />
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
