// ヘッダーとフッターをLayoutコンポーネントで管理する
import Header from './Header1'
import Footer from './Footer1'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
