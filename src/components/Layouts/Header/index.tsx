import React from 'react'
import Logo from '@/src/components/Logo'
import Nav from '@/src/components/Nav'
import AuthService from '@/src/components/Auth/UserAuth/UserAuth'
import styles from './index.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['flex']}>
        <Logo />
        <AuthService />
      </div>
      <div className={styles['nav']}>
        <Nav />
      </div>
    </header>
  )
}

export default Header
