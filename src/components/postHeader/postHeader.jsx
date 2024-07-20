// 記事のヘッダー部分 (タイトル、サブタイトル、投稿日)
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import ConvertDate from '../Convert/ConvertDate'
import styles from './PostHeader.module.css'

export default function PostHeader({ icon, title, subtitle, publish = '' }) {
  return (
    <div className={styles.header}>
      <Image
        src={icon.url}
        alt=""
        width={icon.width}
        height={icon.height}
        className={styles.headerIcon}
      />
      <div className={styles.headerTitle}>
        <p>{subtitle}</p>
        <h1>{title}</h1>
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
    </div>
  )
}
