// ロゴコンポーネント

import Link from 'next/link'
import styles from './logo.module.css'
import Image from 'next/image'
import logo from '@/images/logo.png'

export default function Logo({ footerLink = false }) {
  return (
    <Link href="../home/page" className={footerLink ? styles.footerLink : styles.headerLink}>
      <Image
        className={styles.linkImage}
        src={logo}
        alt="Logo Image"
        priority
      />
    </Link>
  )
}
