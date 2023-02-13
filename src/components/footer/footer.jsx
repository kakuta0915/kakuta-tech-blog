import Container from '../container/container'
import Logo from '../logo/logo'
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <Container>
        <div className={styles.footerText}>
          <Logo />
          [ソーシャル]
        </div>
      </Container>
    </footer>
  )
}
