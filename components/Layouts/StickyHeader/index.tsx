import React from 'react'
import Nav from '@/components/ui/Nav'
import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faMagnifyingGlass,
  faMoon,
} from '@fortawesome/free-solid-svg-icons'

const StickyHeader: React.FC = () => {
  return (
    <div className={styles['stickyHeader']}>
      <Nav />
      <div className={styles['control']}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['icon']} />
        <FontAwesomeIcon icon={faMoon} className={styles['icon']} />
        <div className={styles['toc']}>
          <p>目次</p>
          <FontAwesomeIcon icon={faChevronDown} className={styles['icon']} />
        </div>
      </div>
    </div>
  )
}

export default StickyHeader
