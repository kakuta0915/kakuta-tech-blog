// ナビコンポーネント

import Link from 'next/link'
import styels from './nav.module.css'

export default function Nav() {
  return (
    <nav>
      <ul className={styels.headerNav}>
        <li>
          <Link href="/">TOP</Link>
        </li>
        <li>
          <Link href="/about">ABOUT</Link>
        </li>
        <li>
          <Link href="/works">WORKS</Link>
        </li>
        <li>
          <Link href="/articles">ARTICLES</Link>
        </li>
        <li>
          <Link href="/contact">CONTACT</Link>
        </li>
      </ul>
    </nav>
  )
}
