import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import ConvertDate from '../Convert/ConvertDate'
import styles from './index.module.css'
import { PostHeaderProps } from '@/types'

const PostHeader: React.FC<PostHeaderProps> = ({
  icon,
  title,
  subtitle,
  publish = '',
}) => {
  return (
    <div className={styles['postHeader']}>
      <Image
        src={icon.url}
        alt=""
        width={icon.width}
        height={icon.height}
        className={styles['postHeaderIcon']}
      />
      <div className={styles['postHeaderTitle']}>
        <p>{subtitle}</p>
        <h1>{title}</h1>
        {publish && (
          <div className={styles['publish']}>
            <FontAwesomeIcon
              icon={faClock}
              size="lg"
              color="var(--gray)"
              className={styles['icon']}
              data-testid="clock-icon"
            />
            <ConvertDate dateISO={publish} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostHeader
