import Logo from '@/src/components/logo/logo'
import Nav from '@/src/components/nav/nav'
import styles from './header.module.css'
import AuthService from '@/src/components/AuthService/AuthService1'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.flex}>
        <Logo />
        <AuthService />
      </div>
      <div className={styles.nav}>
        <Nav />
      </div>
    </header>
  )
}
