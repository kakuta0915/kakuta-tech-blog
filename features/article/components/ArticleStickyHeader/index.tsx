'use client'

import React, { useState } from 'react'
import Nav from '@/components/ui/Nav'
import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faMagnifyingGlass,
  faMoon,
} from '@fortawesome/free-solid-svg-icons'
import { TableOfContents } from '@/features/article/components'

export type TocItem = { id: string; text: string }

type StickyHeaderProps = {
  toc?: TocItem[]
}

const ArticleStickyHeader: React.FC<StickyHeaderProps> = ({ toc }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles['articleStickyHeader']}>
      <Nav />
      <div className={styles['control']}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['icon']} />
        <FontAwesomeIcon icon={faMoon} className={styles['icon']} />

        {toc && toc.length > 0 && (
          <div className={styles['tocWrapper']}>
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
