import styles from './socialActions.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

export default function SocialActions() {
  return (
    <div className={styles.socialActions}>
      <div className={styles.actionButton}>
        <button>
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button>
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>
      <div className={styles.shareButton}>
        <button>
          <FontAwesomeIcon icon={faXTwitter} />
        </button>
      </div>
    </div>
  )
}
