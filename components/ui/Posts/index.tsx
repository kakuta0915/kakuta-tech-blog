'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ConvertDate from '@/features/article/components/Convert/ConvertDate'
import styles from './index.module.css'
import qiitaImg from '@/public/images/qiitaEyecatch.png'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PostsProps } from '@/types'

const Posts: React.FC<PostsProps> = ({
  className,
  btn = false,
  posts = [],
  maxPosts,
}) => {
  const [articles, setArticles] = useState(posts.slice(0, maxPosts))

  useEffect(() => {
    const fetchArticles = async () => {
      setArticles(posts.slice(0, maxPosts))
    }
    fetchArticles()
  }, [maxPosts, posts])

  return (
    <>
      <div className={`${className} ${styles['postsContainer']}`}>
        {articles.map(
          ({ title, slug, eyecatch, publishDate = '', categories, source }) => (
            <article key={slug}>
              <Link
                className={styles['link']}
                href={
                  source === 'qiita'
                    ? `https://qiita.com/kakuta0915/items/${slug}`
                    : `/articles/${slug}`
                }
              >
                <figure>
                  <Image
                    src={source === 'qiita' ? qiitaImg : eyecatch.url}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(min-width: 1152px) 576px, 50vw"
                  />
                </figure>
                <div className={styles['publishDate']}>
                  <ConvertDate dateISO={publishDate} />
                </div>
                <h2>{title}</h2>
                <ul>
                  {categories.map((category) => (
                    <li className={styles['postsCategory']} key={category.slug}>
                      <FontAwesomeIcon
                        className={styles['tagIcon']}
                        icon={faTag}
                      />
                      <div className={styles['name']}>{category.name}</div>
                    </li>
                  ))}
                </ul>
              </Link>
            </article>
          ),
        )}
      </div>
      <div className={styles['btnBox']}>
        {btn && (
          <Link className={styles['btn']} href="/articles/">
            MORE
          </Link>
        )}
      </div>
    </>
  )
}

export default Posts
