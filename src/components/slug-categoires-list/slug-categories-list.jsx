// すべてのカテゴリーをカテゴリーページに追加
import Link from 'next/link'
import styles from './slug-categories-list.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

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
              <FontAwesomeIcon className={styles.tagsIcon} icon={faTag} />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
