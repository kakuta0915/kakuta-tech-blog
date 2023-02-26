// 記事が表示するカテゴリーをリスト表示する機能

import styles from './post-categories.module.css'
import Link from 'next/link'

export default function PostCategories({ categories }) {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.categoriesTitle}>カテゴリー</h3>
      <ul className={styles.list}>
        {categories.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/blog/categories/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
