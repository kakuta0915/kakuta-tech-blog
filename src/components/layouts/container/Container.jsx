// 横幅の共通レイアウト
import styles from './container.module.css'

export default function Container({ children, large = false }) {
  return <div className={large ? styles.large : styles.default}>{children}</div>
}
