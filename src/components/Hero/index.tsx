import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'

interface HeroProps {
  title: string
  title2?: string | false
  description: string
  imageSrc: string
  contact?: boolean
}

const Hero: React.FC<HeroProps> = ({
  title,
  title2 = false,
  description,
  imageSrc,
  contact = false,
}) => {
  return (
    <div
      className={styles['heroContainer']}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={styles['heroText']}>
        <h1>{title}</h1>
        {title2 && <h1>{title2}</h1>}
        <p>{description}</p>
        {contact && (
          <Link href="/contact/" className={styles['heroContact']}>
            Contact
          </Link>
        )}
      </div>
    </div>
  )
}

export default Hero
