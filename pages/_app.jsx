import Layout from '../src/components/layout/layout'
import styles from '../src/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
