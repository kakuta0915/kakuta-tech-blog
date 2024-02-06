// ロゴコンポーネント

import Link from 'next/link'
import styles from './logo.module.css'

export default function Logo({ footerLogo = false }) {
  return (
    <Link href="/" className={footerLogo ? styles.footerLogo : styles.logo}>
      KAKUTA TECH BLOG
    </Link>
  )
}
