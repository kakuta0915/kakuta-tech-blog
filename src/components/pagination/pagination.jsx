// ページネーション機能の追加
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import styles from './pagination.module.css'

export default function Pagination({
  prevText = '',
  prevUrl = '',
  nextText = '',
  nextUrl = '',
}) {
  return (
    <ul className={styles.flexContainer}>
      {prevText && prevUrl && (
        <li className={styles.prev}>
          <Link
            href={prevUrl}
            className={styles.iconText}
            data-testid="icon-left"
          >
            <FontAwesomeIcon icon={faChevronLeft} color="var(--gray)" />
            <span>{prevText}</span>
          </Link>
        </li>
      )}
      {nextText && nextUrl && (
        <li className={styles.next}>
          <Link
            href={nextUrl}
            className={styles.iconText}
            data-testid="icon-right"
          >
            <span>{nextText}</span>
            <FontAwesomeIcon icon={faChevronRight} color="var(--gray)" />
          </Link>
        </li>
      )}
    </ul>
  )
}
