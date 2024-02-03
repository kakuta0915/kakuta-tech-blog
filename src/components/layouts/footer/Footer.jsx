import styles from './Footer.module.css'
import Social from '../../Elements/social/Social'
import Logo from '../../Elements/logo/logo'

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
