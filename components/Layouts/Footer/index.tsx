import React from 'react'
import Social from '@/components/ui/Social'
import styles from './index.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <h1>KAKUTA TECH BLOG</h1>
      <Social isFooterSocial={true} />
    </footer>
  )
}

export default Footer
