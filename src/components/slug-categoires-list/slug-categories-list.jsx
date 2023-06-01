// すべてのカテゴリーをカテゴリーページに追加
import Link from 'next/link'

import styles from './slug-categories-list.module.css'

export default function SlugCategoriesList({ allCategories }) {
  return (
    <div className={styles.slugCategories}>
      <h3 className={styles.slugCategoriesTitle}>カテゴリー</h3>
      <ul className={styles.slugCategoriesUl}>
        {allCategories.map(({ name, slug }) => (
          <li className={styles.slugCategoriesLi} key={slug}>
            <Link
              className={styles.slugCategoriesLink}
              href={`/articles/categories/${slug}`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
