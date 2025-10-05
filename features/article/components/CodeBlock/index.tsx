'use client'

import React from 'react'
import { toast } from 'react-toastify'
import styles from './index.module.css'
import { CodeBlockProps } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'

const CodeBlock: React.FC<CodeBlockProps> = ({ code, rawCode, language }) => {
  const onCopy = async () => {
    const text = rawCode || code
    try {
      await navigator.clipboard.writeText(text)
      toast.success('コピーしました')
      return
    } catch {}
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      toast.success('コピーしました')
    } catch {}
  }

  return (
    <div className={styles['container']}>
      <button
        type="button"
        onClick={onCopy}
        className={styles['copyButton']}
        aria-label="コピー"
        title="コピー"
      >
        <FontAwesomeIcon className={styles['copyIcon']} icon={faCopy} />
      </button>
      <pre
        className={`stack ${styles['pre']} language-${language || 'plaintext'}`}
      >
        <code
          className={`language-${language || 'plaintext'} ${styles['code']}`}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </pre>
    </div>
  )
}

export default CodeBlock
