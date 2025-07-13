import React from 'react'
import Logo from '@/components/ui/Logo'
import UserAuth from '@/src/components/Auth/UserAuth'
import Nav from '@/components/ui/Nav'
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
