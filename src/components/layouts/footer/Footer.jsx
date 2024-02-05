import styles from './Footer.module.css'
import Social from '../../elements/Social/Social'
import Logo from '../../elements/Logo/Logo'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerText}>
        <Logo footerLink />
        <Social />
      </div>
    </footer>
  )
}
