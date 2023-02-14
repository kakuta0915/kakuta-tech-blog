import Container from '../container/container'
import Logo from '../logo/logo'
import styles from './footer.module.css'
import Social from '../social/social'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <Container>
        <div className={styles.footerText}>
          <Logo />
          <Social />
        </div>
      </Container>
    </footer>
  )
}
