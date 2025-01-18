import styles from './threeColum.module.css'

export function ThreeColum({ children }) {
  return <div className={styles.flexContainer}>{children}</div>
}

export function ThreeColumMain({ children }) {
  return <div className={styles.main}>{children}</div>
}

export function ThreeColumSidebar({ children }) {
  return <div className={styles.sidebar}>{children}</div>
}

export function ThreeColumSocialActions({ children }) {
  return <div className={styles.socialActions}>{children}</div>
}
