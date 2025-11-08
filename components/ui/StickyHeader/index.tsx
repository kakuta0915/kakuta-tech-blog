'use client'

import React, { useEffect, useRef, useState } from 'react'
import Nav from '@/components/ui/Nav'
import styles from './index.module.css'
import { FontAwesomeIcon, faChevronDown, faMoon } from '@/libs/icons'
import { TableOfContents } from '@/features/article/components'

export type TocItem = { id: string; text: string }

type StickyHeaderProps = {
  toc?: TocItem[]
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ toc }) => {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const tocWrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)')
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches =
        typeof (e as MediaQueryListEvent).matches === 'boolean'
          ? (e as MediaQueryListEvent).matches
          : (e as MediaQueryList).matches
      setIsDesktop(matches)
      if (matches) {
        setOpen(false)
      }
    }

    handleChange(mediaQuery)

    mediaQuery.addEventListener(
      'change',
      handleChange as (ev: MediaQueryListEvent) => void,
    )
    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleChange as (ev: MediaQueryListEvent) => void,
      )
    }
  }, [])

  useEffect(() => {
    if (!open || isDesktop) return
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (tocWrapperRef.current && !tocWrapperRef.current.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [open, isDesktop])

  return (
    <div className={styles['stickyHeader']}>
      <Nav />
      <FontAwesomeIcon icon={faMoon} className={styles['icon']} />
      {toc && toc.length > 0 && !isDesktop && (
        <div className={styles['tocWrapper']} ref={tocWrapperRef}>
          <button
            className={styles['tocButton']}
            onClick={() => setOpen(!open)}
          >
            <span>目次</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${styles['down']} ${open ? styles['rotate'] : ''}`}
            />
          </button>
          {open && (
            <div className={styles['tocDropdown']}>
              <TableOfContents toc={toc} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StickyHeader
