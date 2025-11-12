'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import Nav from '@/components/ui/Nav'
import { TableOfContents } from '@/features/article/components'
import styles from './index.module.css'
import { FontAwesomeIcon, faChevronDown, faMoon } from '@/libs/icons'

export type TocItem = { id: string; text: string }

type StickyHeaderProps = {
  toc?: TocItem[]
}

const ArticleStickyHeader: React.FC<StickyHeaderProps> = ({ toc }) => {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const tocWrapperRef = useRef<HTMLDivElement | null>(null)
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)')
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches
      setIsDesktop(matches)
      if (matches) setOpen(false)
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
    <div className={styles['articleStickyHeader']}>
      <Nav />
      <div className={styles['control']}>
        {/* ★ テーマ切り替えボタン化 */}
        <button
          onClick={toggleTheme}
          className={styles['themeButton']}
          aria-label="テーマ切り替え"
        >
          <FontAwesomeIcon icon={faMoon} className={styles['icon']} />
        </button>

        {toc && toc.length > 0 && !isDesktop && (
          <div className={styles['tocWrapper']} ref={tocWrapperRef}>
            <button
              className={styles['tocButton']}
              onClick={() => setOpen(!open)}
            >
              <span>目次</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${styles['downIcon']} ${
                  open ? styles['rotate'] : ''
                }`}
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
    </div>
  )
}

export default ArticleStickyHeader
