// カテゴリーの一覧機能

import Link from 'next/link'
import styles from './post-all-categories.module.css'

export default function PostAllCategories({ allCategories }) {
  return (
    <div>
      <h3>カテゴリー 一覧</h3>
      <ul>
        {allCategories.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/articles/categories/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
