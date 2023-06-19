// 記事に関連する特定のタグをリスト表示する機能

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './post-categories.module.css'
import Link from 'next/link'
import { faTag } from '@fortawesome/free-solid-svg-icons'

export default function PostCategories({ categories }) {
  return (
    <div className={styles.flexContainer}>
      <h3>タグ</h3>
      <ul>
        {categories.map(({ name, slug }) => (
          <li key={slug}>
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
