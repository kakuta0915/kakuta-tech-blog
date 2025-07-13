import React from 'react'
import Logo from '@/components/ui/Logo'
import Social from '@/src/components/Social'
import styles from './index.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <Logo isFooterLogo={true} />
      <Social isFooterSocial={true} />
    </footer>
  )
}

export default Footer
