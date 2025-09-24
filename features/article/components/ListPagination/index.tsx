import Link from 'next/link'
import styles from './index.module.css'
import { ListPaginationProps } from '@/types'

export default function ListPagination({
  pageCount,
  currentPage,
  createPageLink,
}: ListPaginationProps) {
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav className={styles['pagination']}>
      <ul className={styles['pageList']}>
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span className={styles['current']}>{page}</span>
            ) : (
              <Link href={createPageLink(page)} className={styles['pageLink']}>
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
