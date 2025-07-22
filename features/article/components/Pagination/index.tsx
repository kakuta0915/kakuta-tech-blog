import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'
import { PaginationProps } from '@/types'

function getPageNumbers(current: number, total: number, delta = 2) {
  const range = []
  const rangeWithDots = []
  let l = 0

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l > 2) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }
  return rangeWithDots
}

const Pagination: React.FC<PaginationProps> = ({
  prevText = '',
  prevUrl = '',
  nextText = '',
  nextUrl = '',
  totalPages = 1,
  currentPage = 1,
  createPageLink,
}) => {
  const pageNumbers =
    totalPages > 1 && createPageLink
      ? getPageNumbers(currentPage, totalPages)
      : []

  return (
    <>
      <ul className={styles['paginationContainer']}>
        {prevText && prevUrl && (
          <li className={styles['prev']}>
            <Link href={prevUrl} className={styles['iconText']}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                color="var(--gray)"
                data-testid="icon-left"
              />
              <span>{prevText}</span>
            </Link>
          </li>
        )}

        {nextText && nextUrl && (
          <li className={styles['next']}>
            <Link href={nextUrl} className={styles['iconText']}>
              <span>{nextText}</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                color="var(--gray)"
                data-testid="icon-right"
              />
            </Link>
          </li>
        )}
      </ul>
      {pageNumbers.length > 0 && (
        <div className={styles['pages']}>
          <ul className={styles['pageNumbers']}>
            {pageNumbers.map((num, idx) =>
              typeof num === 'number' ? (
                <li key={num}>
                  {num === currentPage ? (
                    <span className={styles['current']}>{num}</span>
                  ) : (
                    <Link
                      href={createPageLink!(num)}
                      className={styles['pageLink']}
                    >
                      {num}
                    </Link>
                  )}
                </li>
              ) : (
                <li key={`dots-${idx}`} className={styles['dots']}>
                  ...
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default Pagination
