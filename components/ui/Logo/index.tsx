import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.css'
import headerLogo from '/public/images/headerLogo.png'
import footerLogoImage from '/public/images/footerLogo.png'

interface LogoProps {
  isFooterLogo?: boolean
}

const Logo: React.FC<LogoProps> = ({ isFooterLogo = false }) => {
  return (
    <Link
      href="/"
      className={isFooterLogo ? styles['footerLogo'] : styles['headerLogo']}
      data-testid="logo"
    >
      <Image
        className={styles['linkImage']}
        src={isFooterLogo ? footerLogoImage : headerLogo}
        alt="Logo Image"
        // priority={true}
      />
    </Link>
  )
}

export default Logo
