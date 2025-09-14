import React from 'react'
import Social from '@/components/ui/Social'
import styles from './index.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <Social isFooterSocial={true} />
    </footer>
  )
}

export default Footer
