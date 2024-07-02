import React from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero({
  title,
  title2 = false,
  description,
  imageSrc,
  contact = false,
}) {
  return (
    <div
      className={styles.heroContainer}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={styles.heroText}>
        <h1>{title}</h1>
        {title2 && <h1>{title2}</h1>}
        <p>{description}</p>
        {contact && (
          <Link href="/Contact/" className={styles.heroContact}>
            Contact
          </Link>
        )}
      </div>
    </div>
  )
}
