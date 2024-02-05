import styles from './footer.module.css'
import Social from '../../elements/social/social'
import Logo from '../../elements/logo/logo'

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
