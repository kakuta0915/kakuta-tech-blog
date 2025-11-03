'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon, faChevronLeft, faChevronRight } from '@/libs/icons'
import styles from './index.module.css'
import { PaginationProps } from './types'

const Pagination: React.FC<PaginationProps> = ({
  prevText,
  prevUrl,
  nextText,
  nextUrl,
}) => {
  if (!prevText && !nextText) return null

  return (
    <ul className={styles['pagination']}>
      {prevText && prevUrl && (
        <li className={styles['prev']}>
          <Link href={prevUrl} className={styles['link']}>
            <div className={`${styles['meta']} ${styles['metaPrev']}`}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={styles['icon']}
              />
              <span className={styles['label']}>前の記事</span>
            </div>
            <p className={styles['title']}>{prevText}</p>
          </Link>
        </li>
      )}

      {nextText && nextUrl && (
        <li className={styles['next']}>
          <Link href={nextUrl} className={styles['link']}>
            <div className={`${styles['meta']} ${styles['metaNext']}`}>
              <span className={styles['label']}>次の記事</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={styles['icon']}
              />
            </div>
            <p className={styles['title']}>{nextText}</p>
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Pagination
