// // 目次コンポーネント
import styles from './table-of-contents.module.css'
import { Link as Scroll } from 'react-scroll'

export default function TableOfContents({ toc }) {
  return (
    <div>
      <p className={styles.TableOfContentsHead}>目次</p>

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
            <li key={data.id}>{data.text}</li>
          </Scroll>
        ))}
      </ul>
    </div>
  )
}
