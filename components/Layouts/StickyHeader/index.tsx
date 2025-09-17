import React from 'react'
import Nav from '@/components/ui/Nav'
import styles from './index.module.css'

const StickyHeader: React.FC = () => {
  return (
    <div className={styles['stickyHeader']}>
      <Nav />
    </div>
  )
}

export default StickyHeader
