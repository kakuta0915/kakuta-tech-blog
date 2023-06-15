import styles from './social.module.css'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Social() {
  return (
    <ul className={styles.socialList}>
      <li>
        <Link href="https://twitter.com/home">
          <FontAwesomeIcon icon={faTwitter} />
          <span className="sr-only">Twitter</span>
        </Link>
      </li>
      <li>
        <Link href="https://github.com/kakuta0915">
          <FontAwesomeIcon icon={faGithub} />
          <span className="sr-only">GitHub</span>
        </Link>
      </li>
    </ul>
  )
}
