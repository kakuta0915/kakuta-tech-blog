// すべてのカテゴリーをカテゴリー / スラッグページに追加
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useScrollAnimation from '@/src/components/UseScrollAnimation'
import useScrollAnimationStyles from '@/src/components/UseScrollAnimation/index.module.css'
import styles from './index.module.css'

export default function CategoriesList({ allCategories }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const toggleCategories = () => {
    setCategoriesOpen((prev) => !prev)
  }
  const refCategories = useRef(null)

  useScrollAnimation([
    `.${useScrollAnimationStyles.fadeInUp}`,
    `.${useScrollAnimationStyles.fadeInRight}`,
    `.${useScrollAnimationStyles.fadeInLeft}`,
  ])

  return (
    <div
      className={`${styles.categories} ${
        categoriesOpen ? styles.open : styles.close
      }`}
    >
      <div className={styles.categoriesBtn} onClick={toggleCategories}>
        <h3 className={useScrollAnimationStyles.fadeInUp}>カテゴリ 一覧</h3>
        <FontAwesomeIcon className={styles.icon} />
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
        <ul className={useScrollAnimationStyles.fadeInUp}>
          {allCategories.map(({ name, slug, icon }) => (
            <li className={styles.categoriesList} key={slug}>
              <Link
                className={styles.categoriesLink}
                href={`/articles/categories/${slug}`}
              >
                <Image
                  className={styles.iconImg}
                  src={icon.url}
                  width={icon.width}
                  height={icon.height}
                  alt={`${name} icon`}
                  data-testid={`icon-${slug}`}
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
