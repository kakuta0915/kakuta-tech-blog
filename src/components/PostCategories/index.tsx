import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.css'

export interface PostCategoriesProps {
  categories: {
    name: string
    slug: string
    icon: {
      url: string
      width: number
      height: number
    }
  }[]
}

const PostCategories: React.FC<PostCategoriesProps> = ({ categories }) => {
  return (
    <div className={styles['flexContainer']}>
      <h3>カテゴリ</h3>
      <ul>
        {categories.map(({ name, slug, icon }) => (
          <li key={slug}>
            <Link
              className={styles['categoriesLink']}
              href={`/articles/categories/${slug}`}
            >
              <Image
                className={styles['icon']}
                src={icon.url}
                width={icon.width}
                height={icon.height}
                alt="画像"
              />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostCategories
