import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'
import { PostCategoriesProps } from './types'

const PostCategories: React.FC<PostCategoriesProps> = ({ categories }) => {
  return (
    <div className={styles['container']}>
      <ul className={styles['list']}>
        {categories.map(({ name, slug, icon }) => (
          <li key={slug} className={styles['category']}>
            <Link
              className={styles['link']}
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
