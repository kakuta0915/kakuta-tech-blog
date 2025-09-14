import React from 'react'
import UserAuth from '@/features/auth/UserAuth'
import Nav from '@/components/ui/Nav'
import styles from './index.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['flex']}>
        <UserAuth />
      </div>
      <div className={styles['nav']}>
        <Nav />
      </div>
    </header>
  )
}

export default Header
