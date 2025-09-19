'use client'

import React from 'react'
import { Link as Scroll } from 'react-scroll'
import styles from './index.module.css'
import { TableOfContentsProps } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  return (
    <nav className={styles['toc']}>
      <p className={styles['navTitle']}>
        <FontAwesomeIcon icon={faListUl} className={styles['icon']} />
        目次
      </p>
      <ul>
        {toc.map((item) => (
          <li className={styles['tocItem']} key={item.id}>
            <Scroll
              className={styles['scroll']}
              activeClass={styles['active']}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              data-testid={`scroll-link-${item.id}`}
            >
              {item.text}
            </Scroll>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
