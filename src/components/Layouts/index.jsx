// ヘッダーとフッターをLayoutコンポーネントで管理する
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
