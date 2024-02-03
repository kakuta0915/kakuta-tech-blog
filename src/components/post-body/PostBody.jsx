// 記事ページのbodyコンポーネント

import styles from './PostBody.module.css'

export default function PostBody({ children }) {
  return <div className={styles.stack}>{children}</div>
}
