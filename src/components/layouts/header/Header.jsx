import Logo from '../../Elements/Logo/logo'
import Nav from '../../Elements/Nav/Nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
