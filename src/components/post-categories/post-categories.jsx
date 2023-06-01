// 記事に関連する特定のカテゴリーをリスト表示する機能

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './post-categories.module.css'
import Link from 'next/link'
import { faTag } from '@fortawesome/free-solid-svg-icons'

export default function PostCategories({ categories }) {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.categoriesTitle}>カテゴリー</h3>
      <ul className={styles.categoriesUl}>
        {categories.map(({ name, slug }) => (
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
  )
}
