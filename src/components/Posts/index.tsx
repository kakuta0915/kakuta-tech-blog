import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ConvertDate from '../Convert/ConvertDate'
import styles from './index.module.css'
import qiitaImg from '/public/images/qiitaEyecatch.png'
import { faBookmark, faHeart, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type Icon = {
  url: string
  width: number
  height: number
}

export type Category = {
  name: string
  slug: string
  icon?: Icon
}

export type Post = {
  title: string
  slug: string
  eyecatch: { url: string }
  publishDate: string
  categories: Category[]
  source: string
  likesCount: number
  bookmarksCount: number
}

export type PostsProps = {
  className?: string
  btn?: boolean
  posts: Post[]
  maxPosts?: number
}

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
          ({
            title,
            slug,
            eyecatch,
            publishDate = '',
            categories,
            source,
            likesCount = 0,
            bookmarksCount = 0,
          }) => (
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
                <div className={styles['flexSocialActions']}>
                  <div className={styles['socialActions']}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={styles['icon']}
                    />
                    <span>{likesCount}</span>
                  </div>
                  <div className={styles['socialActions']}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={styles['icon']}
                    />
                    <span>{bookmarksCount}</span>
                  </div>
                </div>
                <ul>
                  {categories.map(({ name, slug }) => (
                    <li className={styles['postsCategoriesLi']} key={slug}>
                      <FontAwesomeIcon
                        className={styles['tagIcon']}
                        icon={faTag}
                      />
                      <div className={styles['name']}>{name}</div>
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
