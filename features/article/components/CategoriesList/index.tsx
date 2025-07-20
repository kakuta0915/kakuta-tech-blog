'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { CategoriesListProps } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'

const CategoriesList: React.FC<CategoriesListProps> = ({ allCategories }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const toggleCategories = () => {
    setCategoriesOpen((prev) => !prev)
  }
  const refCategories = useRef<HTMLDivElement | null>(null)

  return (
    <div
      className={`${styles['categories']} ${
        categoriesOpen ? styles['open'] : styles['close']
      }`}
    >
      <div className={styles['categoriesBtn']} onClick={toggleCategories}>
        <h3>カテゴリ 一覧</h3>
        <FontAwesomeIcon className={styles['icon']} icon={faChevronDown} />
      </div>
      <div
        className={styles['accordion']}
        ref={refCategories}
        style={
          {
            '--categories-height': refCategories.current
              ? `${refCategories.current.scrollHeight}px`
              : '0px',
          } as React.CSSProperties
        }
      >
        <ul>
          {allCategories.map(({ name, slug, icon }) => (
            <li className={styles['categoriesList']} key={slug}>
              <Link
                className={styles['categoriesLink']}
                href={`/articles/categories/${slug}`}
              >
                <Image
                  className={styles['iconImg']}
                  src={icon.url}
                  width={icon.width}
                  height={icon.height}
                  alt={`${name} icon`}
                  data-testid={`icon-${slug}`}
                />
                <span className={styles['name']}>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoriesList
