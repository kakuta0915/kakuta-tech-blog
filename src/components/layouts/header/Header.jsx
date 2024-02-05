import Logo from '../../elements/logo/logo'
import Nav from '../../elements/nav/nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Nav />
    </header>
  )
}
