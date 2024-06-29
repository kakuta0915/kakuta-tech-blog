import Image from 'next/image'
import Link from 'next/link'
import styles from './Social.module.css'

export default function Social() {
  return (
    <ul className={styles.socialList}>
      <li>
        <Link
          href="https://twitter.com/_kakuta0915_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/x.png"
            alt=""
            className={styles.icon}
            width={30}
            height={30}
          />
        </Link>
      </li>
      <li>
        <Link
          href="https://github.com/kakuta0915"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/github.png"
            alt=""
            className={styles.icon}
            width={30}
            height={30}
          />
        </Link>
      </li>
      <li>
        <Link
          href="https://qiita.com/kakuta0915"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/qiita.png"
            alt=""
            className={styles.icon}
            width={30}
            height={30}
          />
        </Link>
      </li>
      <li>
        <Link
          href="https://zenn.dev/kakuta0915"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/zenn.png"
            alt=""
            className={styles.icon}
            width={30}
            height={30}
          />
        </Link>
      </li>
    </ul>
  )
}
