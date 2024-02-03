// ナビコンポーネント

import Link from 'next/link'
import styles from './Nav.module.css'
import { useState } from 'react'

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
          <Link href="/about" onClick={closeNav}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link href="/works" onClick={closeNav}>
            WORKS
          </Link>
        </li>
        <li>
          <Link href="/articles/articles" onClick={closeNav}>
            ARTICLES
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={closeNav}>
            CONTACT
          </Link>
        </li>
      </ul>
    </nav>
  )
}
