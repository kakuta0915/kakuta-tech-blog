// 記事のヘッダー部分 (タイトル、サブタイトル、投稿日)

import styles from './post-header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import ConvertDate from '../convert/convert-date'

export default function PostHeader({ title, subtitle, publish = '' }) {
  return (
    <div className={styles.stack}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>
      {publish && (
        <div className={styles.publish}>
          <FontAwesomeIcon
            icon={faClock}
            size="lg"
            color="var(--gray)"
            className={styles.icon}
          />
          <ConvertDate dateISO={publish} />
        </div>
      )}
    </div>
  )
}
