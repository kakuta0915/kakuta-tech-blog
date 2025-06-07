// Contactページ
import { useState } from 'react'
import Meta from '@/src/components/Meta'
import Hero from '@/src/components/Hero'
import Container from '@/src/components/Container'
import styles from './index.module.css'
import eyecatch from '@/public/images/contact.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faEnvelope,
  faMessage,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, company, email, message }),
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
      <Meta
        pageTitle="CONTACT"
        pageDesc="ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero
        title="CONTACT"
        description="ご質問やご意見、お仕事の依頼などをお待ちしています。お気軽に以下のフォームからご連絡ください。"
        imageSrc="./images/contact.jpg"
      />
      <Container>
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
      </Container>
    </>
  )
}
