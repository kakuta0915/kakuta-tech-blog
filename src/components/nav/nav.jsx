// ナビコンポーネント

import { useState } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav() {
  const [navIsOpen, setNavIsOpen] = useState(false)
  const toggleNav = () => {
    setNavIsOpen((prev) => !prev)
  }
  const closeNav = () => {
    setNavIsOpen(false)
  }

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      {navIsOpen && (
        <style jsx global>{`
          @media (max-width: 767px) {
            body {
              overflow: hidden;
              position: fixed;
              width: 100%;
            }
          }
        `}</style>
      )}

      <button className={styles.btn} onClick={toggleNav}>
        <span className={styles.bar}></span>
        <span className="sr-only">MENU</span>
      </button>

      <ul className={styles.headerNav}>
        <li>
          <Link href="/" onClick={closeNav}>
            TOP
          </Link>
        </li>
        <li>
          <Link href="/about/" onClick={closeNav}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link href="/portfolio/" onClick={closeNav}>
            PORTFOLIO
          </Link>
        </li>
        <li>
          <Link href="/articles/" onClick={closeNav}>
            ARTICLES
          </Link>
        </li>
        <li>
          <Link href="/contact/" onClick={closeNav}>
            CONTACT
          </Link>
        </li>
      </ul>
    </nav>
  )
}
