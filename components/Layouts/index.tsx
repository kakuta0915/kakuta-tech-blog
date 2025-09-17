import React, { ReactNode } from 'react'
import Header from './Header'
import StickyHeader from './StickyHeader'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <StickyHeader />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
