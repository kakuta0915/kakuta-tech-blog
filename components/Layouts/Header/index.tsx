import React from 'react'
import Nav from '@/components/ui/Nav'
import styles from './index.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['nav']}>
        <Nav />
      </div>
    </header>
  )
}

export default Header
