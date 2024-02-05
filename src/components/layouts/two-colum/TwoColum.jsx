// 2段組みのレイアウト

import styles from './TwoColum.module.css'

export function TwoColum({ children }) {
  return <div className={styles.flexContainer}>{children}</div>
}

export function TwoColumMain({ children }) {
  return <div className={styles.main}>{children}</div>
}

export function TwoColumSlugMain({ children }) {
  return <div className={styles.slug}>{children}</div>
}

export function TwoColumSidebar({ children }) {
  return <div className={styles.sidebar}>{children}</div>
}
