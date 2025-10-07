'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Link as Scroll } from 'react-scroll'
import styles from './index.module.css'
import { TableOfContentsProps } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  const targets = useMemo(() => {
    if (typeof document === 'undefined') return []
    return toc
      .map(({ id }) => {
        const el = document.getElementById(id)
        return el ? { id, el } : null
      })
      .filter((v): v is { id: string; el: HTMLElement } => v !== null)
  }, [toc])

  useEffect(() => {
    if (targets.length === 0) return

    const getTop = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY

    const handle = () => {
      const y = window.scrollY + 80
      for (let i = 0; i < targets.length; i++) {
        const current = targets[i]
        if (!current) continue
        const cur = getTop(current.el)
        const nextItem = i + 1 < targets.length ? targets[i + 1] : undefined
        const next = nextItem ? getTop(nextItem.el) : Infinity
        if (y >= cur && y < next) {
          if (activeId !== current.id) setActiveId(current.id)
          return
        }
      }
      setActiveId(null)
    }

    handle()
    window.addEventListener('scroll', handle, { passive: true })
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('scroll', handle)
      window.removeEventListener('resize', handle)
    }
  }, [targets, activeId])

  return (
    <nav className={styles['toc']}>
      <p className={styles['navTitle']}>
        <FontAwesomeIcon icon={faListUl} className={styles['icon']} />
        目次
      </p>
      <ul>
        {toc.map((item) => (
          <li
            className={`${styles['tocItem']} ${
              item.name === 'h3' ? styles['tocItemIndent'] : ''
            } ${activeId === item.id ? styles['active'] : ''}`}
            key={item.id}
          >
            <Scroll
              className={styles['scroll']}
              to={item.id}
              spy={false}
              smooth={true}
              offset={-70}
              duration={500}
              data-testid={`scroll-link-${item.id}`}
            >
              {item.text}
            </Scroll>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
