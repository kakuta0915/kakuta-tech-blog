import styles from './Footer.module.css'
import Social from '../../Elements/Social/Social'
import Logo from '../../Elements/Logo/logo'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerText}>
        <Logo footerLogo />
        <Social />
      </div>
    </footer>
  )
}
