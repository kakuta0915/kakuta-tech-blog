// 記事ページのbodyコンポーネント
import styles from './postBody.module.css'

export default function PostBody({ children }) {
  return <div className={styles.stack}>{children}</div>
}
