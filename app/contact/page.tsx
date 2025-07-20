'use client'

import React, { useState } from 'react'
import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import * as Ui from '@/components/ui'
import styles from './page.module.css'
import eyecatch from '@/public/images/contact.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faEnvelope,
  faMessage,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'CONTACT',
  description:
    'ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: `CONTACT | ${siteTitle}`,
    description:
      'ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。',
    url: `${siteUrl}/contact`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'お問い合わせページのアイキャッチ画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `CONTACT | ${siteTitle}`,
    description:
      'ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。',
    images: [eyecatch.src],
  },
}

type ContactFormData = {
  name: string
  company: string
  email: string
  message: string
}

export default function Contact() {
  const [name, setName] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: ContactFormData = { name, company, email, message }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      alert('送信完了')
      setName('')
      setCompany('')
      setEmail('')
      setMessage('')
    } else {
      alert('エラーが発生しました')
    }
  }

  return (
    <>
      <Ui.Hero
        title="CONTACT"
        description="ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。"
        imageSrc="./images/contact.jpg"
      />
      <Ui.Container>
        <div className={styles['contact']}>
          <form className={styles['form']} onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor="name">
                  <FontAwesomeIcon icon={faUser} className={styles['icon']} />
                  お名前
                  <span>【必須】</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </li>
              <li>
                <label htmlFor="company">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className={styles['icon']}
                  />
                  会社名
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="email">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={styles['icon']}
                  />
                  メールアドレス
                  <span>【必須】</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </li>
              <li>
                <label htmlFor="message">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className={styles['icon']}
                  />
                  お問い合わせ内容
                  <span>【必須】</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </li>
            </ul>
            <button className={styles['button']} type="submit">
              送信する
            </button>
          </form>
        </div>
      </Ui.Container>
    </>
  )
}
