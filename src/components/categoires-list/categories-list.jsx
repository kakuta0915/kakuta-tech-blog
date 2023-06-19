// すべてのカテゴリーをカテゴリー / スラッグページに追加
import Link from 'next/link'
import styles from './categories-list.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown, faTag } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'

export default function CategoriesList({ allCategories }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const toggleCategories = () => {
    setCategoriesOpen((prev) => !prev)
  }

  const refCategories = useRef(null)

  return (
    <div
      className={`${styles.categories} ${
        categoriesOpen ? styles.open : styles.close
      }`}
    >
      <div className={styles.categoriesBtn} onClick={toggleCategories}>
        <h3>タグ一覧</h3>
        <FontAwesomeIcon className={styles.icon} icon={faCircleDown} />
      </div>
      <div
        className={styles.accordion}
        ref={refCategories}
        style={{
          '--categories-height': refCategories.current
            ? `${refCategories.current.scrollHeight}px`
            : '0px',
        }}
      >
        <ul>
          {allCategories.map(({ name, slug }) => (
            <li className={styles.categoriesLi} key={slug}>
              <Link
                className={styles.categoriesLink}
                href={`/articles/categories/${slug}`}
              >
                <FontAwesomeIcon className={styles.tagsIcon} icon={faTag} />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
