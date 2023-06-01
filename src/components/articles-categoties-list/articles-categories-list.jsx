// すべてのカテゴリーを記事一覧ページ(articles.jsx)に追加
import Link from 'next/link'
import styles from './articles-categories-list.module.css'
export default function ArticlesCategoriesList({ allCategories }) {
  return (
    <div className={styles.articlesCategories}>
      <h3 className={styles.articlesCategoriesTitle}>カテゴリー</h3>
      <ul className={styles.articlesCategoriesUl}>
        {allCategories.map(({ name, slug }) => (
          <li className={styles.articlesCategoriesLi} key={slug}>
            <Link
              href={`/articles/categories/${slug}`}
              className={styles.articlesCategoriesLink}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
