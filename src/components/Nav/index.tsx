import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'

const Nav: React.FC = () => {
  return (
    <nav className={styles['headerNav']} data-testid="nav">
      <ul className={styles['nav']}>
        <li>
          <Link href="/">TOP</Link>
        </li>
        <li>
          <Link href="/about/">ABOUT</Link>
        </li>
        <li>
          <Link href="/portfolio/">PORTFOLIO</Link>
        </li>
        <li>
          <Link href="/articles/">ARTICLES</Link>
        </li>
        <li>
          <Link href="/contact/">CONTACT</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
