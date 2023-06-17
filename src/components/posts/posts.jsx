// 記事一覧のコンポーネント

import styles from './posts.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import ConvertDate from '../convert/convert-date'

export default function Posts({ posts }) {
  return (
    <div className={styles.postsContainer}>
      {posts.map(({ title, slug, eyecatch, publishDate = '', categories }) => (
        <article key={slug}>
          <Link className={styles.link} href={`/articles/${slug}`}>
            <figure>
              <Image
                src={eyecatch.url}
                alt=""
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 1152px) 576px, 50vw"
              />
            </figure>
            <h2 className={styles.postsTitle}>{title}</h2>
            <div className={styles.flexBox}>
              <ul className={styles.postsCategoriesUl}>
                {categories.map(({ name, slug }) => (
                  <li className={styles.postsCategoriesLi} key={slug}>
                    <FontAwesomeIcon className={styles.icon} icon={faTag} />
                    <div className={styles.name}>{name}</div>
                  </li>
                ))}
              </ul>
              <div className={styles.publishDate}>
                <ConvertDate dateISO={publishDate} />
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
