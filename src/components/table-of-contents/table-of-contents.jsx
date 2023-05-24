// // 目次コンポーネント
import styles from './table-of-contents.module.css'

export const TableOfContents = ({ toc }) => {
  return (
    <div>
      <p className={styles.TableOfContentsHead}>目次</p>
      <ul>
        {toc.map((data) => (
          <li key={data.id}>
            <a href={`#${data.text}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
