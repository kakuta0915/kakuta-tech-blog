import React from 'react'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'
import Layout from '@/components/Layouts'
import { siteMeta } from '@/libs/constants'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={siteMeta?.siteLang || 'ja'}>
      <head></head>
      <body>
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
