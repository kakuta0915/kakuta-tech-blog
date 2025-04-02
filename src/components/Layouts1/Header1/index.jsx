import Logo from '@/src/components/Logo1'
import Nav from '@/src/components/Nav1'
import styles from './index.module.css'
import AuthService from '@/src/components/AuthService1/AuthService1'

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
