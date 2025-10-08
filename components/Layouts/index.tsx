import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import * as Ui from '@/components/ui'

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Ui.TopButton />
    </>
  )
}

export default Layout
