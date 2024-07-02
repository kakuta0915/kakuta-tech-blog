// すべてのカテゴリーをカテゴリー / スラッグページに追加
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown } from '@fortawesome/free-solid-svg-icons'
import styles from './CategoriesList.module.css'

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
        <h3>カテゴリ 一覧</h3>
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
          {allCategories.map(({ name, slug, icon }) => (
            <li className={styles.categoriesList} key={slug}>
              <Link
                className={styles.categoriesLink}
                href={`/Articles/Categories/${slug}`}
              >
                <Image
                  className={styles.iconImg}
                  src={icon.url}
                  width={icon.width}
                  height={icon.height}
                  alt=""
                />
                <span className={styles.name}>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
