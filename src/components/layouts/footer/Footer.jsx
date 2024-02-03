import styles from './Footer.module.css'
import Social from '../../social/Social'
import Logo from '../../logo/logo'

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
