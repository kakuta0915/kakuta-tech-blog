import Logo from '@/src/components/Logo'
import Social from '@/src/components/Social'
import styles from './index.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo isFooterLogo={true} />
      <Social isFooterSocial={true} />
    </footer>
  )
}
