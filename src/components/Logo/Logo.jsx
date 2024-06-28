// ロゴコンポーネント

import Link from 'next/link'
import styles from './Logo.module.css'
import Image from 'next/image'
import headerLogo from '@/images/headerLogo.png'
import footerLogoImage from '@/images/footerLogo.png'

export default function Logo({ isFooterLogo = false }) {
  return (
    <Link
      href="/"
      className={isFooterLogo ? styles.footerLogo : styles.headerLogo}
    >
      <Image
        className={styles.linkImage}
        src={isFooterLogo ? footerLogoImage : headerLogo}
        alt="Logo Image"
        priority
      />
    </Link>
  )
}
