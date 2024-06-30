import Logo from '@/src/components/Logo/Logo'
import Nav from '@/src/components/Nav/Nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
