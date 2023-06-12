// すべてのカテゴリーを記事一覧ページ(articles.jsx)に追加
import Link from 'next/link'
import styles from './articles-categories-list.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
export default function ArticlesCategoriesList({ allCategories }) {
  return (
    <div className={styles.articlesCategories}>
      <h3 className={styles.articlesCategoriesTitle}>タグ一覧</h3>
      <ul className={styles.articlesCategoriesUl}>
        {allCategories.map(({ name, slug }) => (
          <li className={styles.articlesCategoriesLi} key={slug}>
            <Link
              href={`/articles/categories/${slug}`}
              className={styles.articlesCategoriesLink}
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
