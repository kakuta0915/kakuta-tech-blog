import Logo from '../../elements/logo/Logo'
import Nav from '../../elements/nav/Nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}