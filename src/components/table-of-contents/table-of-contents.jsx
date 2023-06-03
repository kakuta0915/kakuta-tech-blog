// // 目次コンポーネント
import styles from './table-of-contents.module.css'
import { Link as Scroll } from 'react-scroll'

export default function TableOfContents({ toc }) {
  return (
    <div className={styles.tableOfContents}>
      <h3 className={styles.tableOfContentsTitle}>目次</h3>
      <ul>
        {toc.map((data) => (
          <Scroll
            key={data.id}
            activeClass="active"
            to={data.id}
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
          >
            <li className={styles.tableOfContentsLi} key={data.id}>
              {data.text}
            </li>
          </Scroll>
        ))}
      </ul>
    </div>
  )
}
