// 目次コンポーネント
import { useRef, useState } from 'react'
import { Link as Scroll } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown } from '@fortawesome/free-solid-svg-icons'
import styles from './tableOfContents.module.css'

export default function TableOfContents({ toc }) {
  const [tocOpen, setTocOpen] = useState(false)
  const toggleToc = () => {
    setTocOpen((prev) => !prev)
  }
  const refToc = useRef(null)

  return (
    <div
      className={`${styles.toc} ${tocOpen ? styles.open : styles.close}`}
      data-testid="toc-container"
    >
      <div className={styles.tocBtn} onClick={toggleToc}>
        <h3>目次</h3>
        <FontAwesomeIcon className={styles.icon} icon={faCircleDown} />
      </div>
      <div
        className={styles.accordion}
        ref={refToc}
        style={{
          '--toc-height': refToc.current
            ? `${refToc.current.scrollHeight}px`
            : '0px',
        }}
      >
        <ul>
          {toc.map((data) => (
            <Scroll
              className={styles.scroll}
              key={data.id}
              activeClass="active"
              to={data.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              data-testid={`scroll-link-${data.id}`}
            >
              <li className={styles.tocLi} key={data.id}>
                {data.text}
              </li>
            </Scroll>
          ))}
        </ul>
      </div>
    </div>
  )
}
