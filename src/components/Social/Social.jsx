import Image from 'next/image'
import Link from 'next/link'
import styles from './Social.module.css'

export default function Social() {
  return (
    <div className={styles.socialList}>
      <Link
        className={styles.link}
        href="https://twitter.com/_kakuta0915_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/x.png"
          alt="Twitter"
          className={styles.icon}
          width={30}
          height={30}
        />
      </Link>

      <Link
        className={styles.link}
        href="https://github.com/kakuta0915"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/github.png"
          alt="GitHub"
          className={styles.icon}
          width={30}
          height={30}
        />
      </Link>

      <Link
        className={styles.link}
        href="https://qiita.com/kakuta0915"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/qiita.png"
          alt="Qiita"
          className={styles.icon}
          width={30}
          height={30}
        />
      </Link>

      <Link
        className={styles.link}
        href="https://zenn.dev/kakuta0915"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/zenn.png"
          alt="Zenn"
          className={styles.icon}
          width={30}
          height={30}
        />
      </Link>
    </div>
  )
}
