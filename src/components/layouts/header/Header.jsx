import Logo from '../../logo/logo'
import Nav from '../../nav/Nav'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
