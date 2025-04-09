import Logo from '@/components/Logo'
import Nav from '@/components/Nav'
import AuthService from '@/components/AuthService/AuthService'
import styles from './index.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['flex']}>
        <Logo />
        <AuthService />
      </div>
      <div className={styles['nav']}>
        <Nav />
      </div>
    </header>
  )
}

export default Header
