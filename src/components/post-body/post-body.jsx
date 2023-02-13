// 本文の共通レイアウト

import styles from './post-body.module.css'

export default function PostBody({ children }) {
  return <div className={styles.stack}>{children}</div>
}
