// 横幅の共通レイアウト
import styles from './container.module.css'

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>
}
