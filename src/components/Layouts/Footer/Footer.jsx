import Logo from '@/src/components/Logo/Logo'
import Social from '@/src/components/Social/Social'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo isFooterLogo={true} />
      <Social isFooterSocial={true} />
    </footer>
  )
}
