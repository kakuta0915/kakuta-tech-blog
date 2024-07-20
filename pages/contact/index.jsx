// Contactページ
import Meta from '@/src/components/Meta/Meta'
import Hero from '@/src/components/Hero/Hero'
import Container from '@/src/components/Container/Container'
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
        <div className={styles.contact}>
          <form className={styles.form}>
            <ul>
              <li>
                <label for="username">
                  <FontAwesomeIcon icon={faUser} className={styles.icon} />
                  お名前
                  <span>【必須】</span>
                </label>
                <input type="text" id="username" name="username" />
              </li>
              <li>
                <label for="company">
                  <FontAwesomeIcon icon={faBuilding} className={styles.icon} />
                  会社名
                </label>
                <input type="text" id="company" name="company" />
              </li>
              <li>
                <label for="email">
                  <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                  メールアドレス
                  <span>【必須】</span>
                </label>
                <input type="email" id="email" name="email" />
              </li>
              <li>
                <label for="detail">
                  <FontAwesomeIcon icon={faMessage} className={styles.icon} />
                  お問い合わせ内容
                  <span>【必須】</span>
                </label>
                <textarea id="detail" name="detail"></textarea>
              </li>
            </ul>
          </form>
          <button className={styles.button} type="submit" value="送信">
            送信する
          </button>
        </div>
      </Container>
    </>
  )
}
