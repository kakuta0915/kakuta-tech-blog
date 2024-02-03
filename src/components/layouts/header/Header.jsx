import Logo from '../../Elements/logo/logo'
import Nav from '../../Elements/nav/Nav'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
