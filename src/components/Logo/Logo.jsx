// ロゴコンポーネント
import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.css'
import headerLogo from '@/public/images/headerLogo.png'
import footerLogoImage from '@/public/images/footerLogo.png'

export default function Logo({ isFooterLogo = false }) {
  return (
    <Link
      href="/Home/"
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
