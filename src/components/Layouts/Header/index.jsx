import Logo from '@/src/components/Logo'
import Nav from '@/src/components/Nav'
import styles from './index.module.css'
import AuthService from '@/src/components/AuthService/AuthService'

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
