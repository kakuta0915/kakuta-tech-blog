import styles from './footer.module.css'
import Social from '../social/social'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerText}>
        <h1 className={styles.logo}>KAKUTA BLOG</h1>
        <Social />
      </div>
    </footer>
  )
}
