// ナビコンポーネント

import Link from 'next/link'
import styles from './nav.module.css'
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
          <Link href="/home/page" onClick={closeNav}>
            TOP
          </Link>
        </li>
        <li>
          <Link href="/about/page" onClick={closeNav}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link href="/works/page" onClick={closeNav}>
            WORKS
          </Link>
        </li>
        <li>
          <Link href="/articles/page" onClick={closeNav}>
            ARTICLES
          </Link>
        </li>
        <li>
          <Link href="/contact/page" onClick={closeNav}>
            CONTACT
          </Link>
        </li>
      </ul>
    </nav>
  )
}
