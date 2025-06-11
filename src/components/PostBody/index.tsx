import React from 'react'
import { ReactNode } from 'react'
import styles from './index.module.css'

interface PostBodyProps {
  children: ReactNode
}

const PostBody: React.FC<PostBodyProps> = ({ children }) => {
  return <div className={styles['stack']}>{children}</div>
}

export default PostBody
