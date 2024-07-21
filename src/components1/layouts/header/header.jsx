import Logo from '@/src/components1/logo/logo'
import Nav from '@/src/components1/nav/nav'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
