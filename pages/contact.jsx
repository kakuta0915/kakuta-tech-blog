// Contactページ
import Meta from '@/src/components/Meta/Meta'
import Hero from '@/src/components/Hero/Hero'
import Container from '@/src/components/Container/Container'
import styles from '@/src/styles/contact.module.css'
import eyecatch from '@/public/images/contact.jpg'

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
                  お名前
                  <span>【必須】</span>
                </label>
                <input type="text" id="username" name="username" />
              </li>
              <li>
                <label for="company">会社名</label>
                <input type="text" id="company" name="company" />
              </li>
              <li>
                <label for="email">
                  メールアドレス
                  <span>【必須】</span>
                </label>
                <input type="email" id="email" name="email" />
              </li>
              <li>
                <label for="detail">
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
