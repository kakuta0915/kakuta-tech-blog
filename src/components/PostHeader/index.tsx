import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import ConvertDate from '../Convert/ConvertDate'
import styles from './index.module.css'

export interface PostHeaderProps {
  icon: {
    url: string
    width: number
    height: number
  }
  title: string
  subtitle: string
  publish?: string
}

const PostHeader: React.FC<PostHeaderProps> = ({
  icon,
  title,
  subtitle,
  publish = '',
}) => {
  return (
    <div className={styles['header']}>
      <Image
        src={icon.url}
        alt=""
        width={icon.width}
        height={icon.height}
        className={styles['headerIcon']}
      />
      <div className={styles['headerTitle']}>
        <p>{subtitle}</p>
        <h1>{title}</h1>
        {publish && (
          <div className={styles['publish']}>
            <FontAwesomeIcon
              icon={faClock}
              size="lg"
              color="var(--gray)"
              className={styles.icon}
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
