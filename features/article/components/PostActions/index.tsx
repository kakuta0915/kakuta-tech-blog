'use client'

import React from 'react'
import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

type PostActionsProps = {
  postId: string
  title: string
}

const PostActions: React.FC<PostActionsProps> = ({ postId, title }) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const postUrl = `${baseUrl}/articles/${postId}`

  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl,
    )}&text=${encodeURIComponent(`「${title}」`)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  return (
<<<<<<< HEAD
    <div className={styles['postActions']}>
      <div className={styles['actionContainer']}>
        <button
          className={styles['button']}
          onClick={() => handleAction('likes')}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={liked ? styles['likeIconAction'] : styles['icon']}
          />
        </button>
        <span className={styles['count']}>{likeCount}</span>

        <button
          className={styles['button']}
          onClick={() => handleAction('bookmarks')}
        >
          <FontAwesomeIcon
            icon={faBookmark}
            className={
              bookmarked ? styles['bookmarkIconAction'] : styles['icon']
            }
          />
        </button>
        <span className={styles['count']}>{bookmarkCount}</span>
      </div>

      <div className={styles['shareContainer']}>
        <button className={styles['button']} onClick={handleShare}>
          <FontAwesomeIcon icon={faXTwitter} />
        </button>
      </div>
=======
    <div className={styles['shareButton']}>
      <button onClick={handleShare}>
        <FontAwesomeIcon icon={faXTwitter} />
      </button>
>>>>>>> 239b144 (fix: PostActionsのコードを修正)
    </div>
  )
}

export default PostActions
