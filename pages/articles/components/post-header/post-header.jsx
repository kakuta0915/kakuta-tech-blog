// 記事のヘッダー部分 (タイトル、サブタイトル、投稿日)

import styles from './PostHeader.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import ConvertDate from '../convert/convert-date'
import Image from 'next/image'

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
