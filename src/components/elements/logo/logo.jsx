// ロゴコンポーネント

import Link from 'next/link'
import styles from './Logo.module.css'
import Image from 'next/image'
import logo from '@/images/logo.png'

export default function Logo({ footerLink = false }) {
  return (
    <Link href="../../home" className={footerLink ? styles.footerLink : styles.headerLink}>
      <Image
        className={styles.linkImage}
        src={logo}
        alt="Logo Image"
        priority
      />
    </Link>
  )
}
