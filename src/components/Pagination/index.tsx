import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'

interface PaginationProps {
  prevText?: string
  prevUrl?: string
  nextText?: string
  nextUrl?: string
}

const Pagination: React.FC<PaginationProps> = ({
  prevText = '',
  prevUrl = '',
  nextText = '',
  nextUrl = '',
}) => {
  return (
    <ul className={styles['flexContainer']}>
      {prevText && prevUrl && (
        <li className={styles['prev']}>
          <Link
            href={prevUrl}
            className={styles['iconText']}
            data-testid="icon-left"
          >
            <FontAwesomeIcon icon={faChevronLeft} color="var(--gray)" />
            <span>{prevText}</span>
          </Link>
        </li>
      )}
      {nextText && nextUrl && (
        <li className={styles['next']}>
          <Link
            href={nextUrl}
            className={styles['conText']}
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

export default Pagination
