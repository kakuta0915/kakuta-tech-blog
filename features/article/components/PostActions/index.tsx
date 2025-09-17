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
    <div className={styles['shareButton']}>
      <button onClick={handleShare}>
        <FontAwesomeIcon icon={faXTwitter} />
      </button>
    </div>
  )
}

export default PostActions
