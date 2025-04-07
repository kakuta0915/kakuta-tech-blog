import { useRef, useState } from 'react'
import { Link as Scroll } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'

type TocItem = {
  id: string
  text: string
}

interface TableOfContentsProps {
  toc: TocItem[]
}

interface CustomStyle extends React.CSSProperties {
  '--toc-height'?: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  const [tocOpen, setTocOpen] = useState(false)
  const toggleToc = () => {
    setTocOpen((prev) => !prev)
  }
  const refToc = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`${styles['toc']} ${
        tocOpen ? styles['open'] : styles['close']
      }`}
    >
      <div className={styles['tocBtn']} onClick={toggleToc}>
        <h3>目次</h3>
        <FontAwesomeIcon className={styles['icon']} icon={faCircleDown} />
      </div>
      <div
        className={styles['accordion']}
        ref={refToc}
        style={
          {
            '--toc-height': refToc.current
              ? `${refToc.current.scrollHeight}px`
              : '0px',
          } as CustomStyle
        }
      >
        <ul>
          {toc.map((data) => (
            <Scroll
              className={styles['scroll']}
              key={data.id}
              activeClass="active"
              to={data.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              data-testid={`scroll-link-${data.id}`}
            >
              <li className={styles['tocLi']} key={data.id}>
                {data.text}
              </li>
            </Scroll>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TableOfContents
