// Contactページ
import Meta from '@/src/components/elements/meta/Meta'
import Hero from '@/src/components/elements/hero/Hero'
import Image from 'next/image'
import eyecatch from 'images/contact.jpg'
import styles from '@/src/styles/contact.module.css'
import Container from '../src/components/layouts/container/Container'

export default function Contact() {
  return (
    <Container>
      <Meta
        pageTitle="CONTACT"
        pageDesc="お問い合わせはこちらからお願いいたします"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <div className={styles.contact}>
        <Hero title="CONTACT" subtitle="お問い合わせ" />
        <figure>
          <Image
            src={eyecatch}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            placeholder="blur"
          />
        </figure>

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
  )
}
