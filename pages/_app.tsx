import React, { ReactElement, ReactNode, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as gtag from 'libs/gtag'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Layout from '@/src/components/Layouts'
// import '@/src/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

// FontAwesomeの自動CSS追加を無効化
config.autoAddCss = false

// カスタムAppProps型：getLayoutをオプションとして許可
type CustomAppProps = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}

const App: React.FC<CustomAppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
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
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </>
  )
}

export default App
