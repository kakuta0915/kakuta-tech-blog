'use client'

import React, { useEffect, useState } from 'react'
import { Link as Scroll } from 'react-scroll'
import styles from './index.module.scss'
import { TableOfContentsProps } from './types'
import { FontAwesomeIcon, faListUl } from '@/libs/icons'

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  const [targets, setTargets] = useState<{ id: string; el: HTMLElement }[]>([])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const resolveTargets = () => {
      const resolved = toc
        .map(({ id }) => {
          const el = document.getElementById(id)
          return el ? { id, el } : null
        })
        .filter((v): v is { id: string; el: HTMLElement } => v !== null)
      setTargets(resolved)
    }

    resolveTargets()

    const observer = new MutationObserver(() => {
      resolveTargets()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('resize', resolveTargets)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resolveTargets)
    }
  }, [toc])

  useEffect(() => {
    if (targets.length === 0) return

    const getTop = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY

    let rafId: number | null = null
    const headerOffset = 80
    const hysteresis = 4

    const update = () => {
      rafId = null
      const y = window.scrollY + headerOffset
      for (let i = 0; i < targets.length; i++) {
        const current = targets[i]!
        const cur = getTop(current.el)
        const nextItem = i + 1 < targets.length ? targets[i + 1] : undefined
        const next = nextItem ? getTop(nextItem.el) : Infinity

        const lowerBound = cur - hysteresis
        const upperBound = next + hysteresis

        if (y >= lowerBound && y < upperBound) {
          if (activeId !== current.id) setActiveId(current.id)
          return
        }
      }
      setActiveId(null)
    }

    const onScroll = () => {
      if (rafId == null) rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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
