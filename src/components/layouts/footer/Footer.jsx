import styles from './Footer.module.css'
import Social from '../../elements/social/Social'
import Logo from '../../elements/logo/logo'

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
