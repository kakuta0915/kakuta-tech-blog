'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CategoriesListProps } from '@/types'
import styles from './index.module.scss'

const CategoriesList: React.FC<CategoriesListProps> = ({ allCategories }) => {
  return (
    <div className={styles['categories']}>
      <h3>カテゴリ 一覧</h3>
      <ul className={styles['categoriesListWrapper']}>
        {allCategories.map(({ name, slug, icon }) => (
          <li className={styles['categoryItem']} key={slug}>
            <Link
              className={styles['categoryLink']}
              href={`/articles/categories/${slug}`}
            >
              <Image
                className={styles['categoryIcon']}
                src={icon!.url}
                width={icon!.width}
                height={icon!.height}
                alt={`${name} icon`}
                data-testid={`icon-${slug}`}
              />
              <span className={styles['categoryName']}>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoriesList
