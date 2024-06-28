import styles from './Footer.module.css'
import Social from '../Social/Social'
import Logo from '../Logo/Logo'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerText}>
        <Logo isFooterLogo={true} />
        <Social />
      </div>
    </footer>
  )
}
