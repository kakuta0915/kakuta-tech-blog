'use client'

import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import { FontAwesomeIcon, faAngleUp } from '@/libs/icons'

type TopButtonProps = {
  threshold?: number
}

const TopButton: React.FC<TopButtonProps> = ({ threshold = 240 }) => {
  const [isVisible, setIsVisible] = useState(false)

  const onScroll = useCallback(() => {
    const y = window.scrollY || document.documentElement.scrollTop
    setIsVisible(y > threshold)
  }, [threshold])

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className={`${styles['root']} ${isVisible ? styles['visible'] : ''}`}>
      <button
        aria-label="Back to top"
        className={styles['button']}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon={faAngleUp}
          className={styles['icon']}
          data-testid="top-icon"
        />
        <span className={styles['label']}>TOP</span>
      </button>
    </div>
  )
}

export default TopButton
