import Logo from '../../elements/Logo/logo'
import Nav from '../../elements/Nav/Nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
