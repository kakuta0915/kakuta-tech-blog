import React from 'react'
import Logo from '@/src/components/Logo'
import UserAuth from '@/src/components/Auth/UserAuth'
import Nav from '@/src/components/Nav'
import styles from './index.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['flex']}>
        <Logo />
        <UserAuth />
      </div>
      <div className={styles['nav']}>
        <Nav />
      </div>
    </header>
  )
}

export default Header
