// 記事一覧のコンポーネント

import React, { useState, useEffect } from 'react'
import styles from './Posts.module.css'
import Link from 'next/link'
import Image from 'next/image'
import ConvertDate from '../Convert/ConvertDate'
import { getAllArticles } from '@/libs/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import qiitaImg from '@/public/images/qiitaEyecatch.png'

export default function Posts({ btn = false, maxPosts }) {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const allArticles = await getAllArticles(maxPosts)
      setArticles(allArticles)
    }
    fetchArticles()
  }, [maxPosts])

  return (
    <>
      <div className={styles.postsContainer}>
        {articles.map(
          ({ title, slug, eyecatch, publishDate = '', categories, source }) => (
            <article key={slug}>
              <Link
                className={styles.link}
                href={
                  source === 'qiita'
                    ? `https://qiita.com/kakuta0915/items/${slug}`
                    : `/articles/${slug}`
                }
              >
                <figure>
                  <Image
                    src={source === 'qiita' ? qiitaImg : eyecatch?.url}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(min-width: 1152px) 576px, 50vw"
                  />
                </figure>
                <div className={styles.publishDate}>
                  <ConvertDate dateISO={publishDate} />
                </div>
                <h2>{title}</h2>
                <ul>
                  {categories.map(({ name, slug }) => (
                    <li className={styles.postsCategoriesLi} key={slug}>
                      <FontAwesomeIcon className={styles.icon} icon={faTag} />
                      <div className={styles.name}>{name}</div>
                    </li>
                  ))}
                </ul>
              </Link>
            </article>
          ),
        )}
      </div>
      <div className={styles.btnBox}>
        {btn && (
          <Link className={styles.btn} href="../articles/articles">
            MORE
          </Link>
        )}
      </div>
    </>
  )
}
