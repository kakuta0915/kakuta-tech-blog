import Logo from '@/src/components/logo/logo'
import Nav from '@/src/components/nav/nav'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
