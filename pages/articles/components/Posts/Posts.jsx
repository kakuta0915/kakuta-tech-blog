// 記事一覧のコンポーネント

import styles from './Posts.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import ConvertDate from '../../../../src/components/convert/ConvertDate'

export default function Posts({ posts, btn = false }) {
  return (
    <>
      <div className={styles.postsContainer}>
        {posts.map(
          ({ title, slug, eyecatch, publishDate = '', categories }) => (
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
