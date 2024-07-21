import Logo from '@/src/components1/logo/logo'
import Social from '@/src/components1/social/social'
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo isFooterLogo={true} />
      <Social isFooterSocial={true} />
    </footer>
  )
}
