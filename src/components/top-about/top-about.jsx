import Image from 'next/image'
import styles from './top-about.module.css'
import kakuta0915 from 'images/kakuta0915.jpg'
import Link from 'next/link'

export default function TopAbout() {
  return (
    <div className={styles.topContents}>
      <h3>このサイトについてa</h3>
      <p>
        Next.jsとmicroCMSと組み合わせてプログラミングの技術ブログを制作してみました。
        <br />
        学習時に躓いた箇所などを記事にしてまとめています。
      </p>
      <h3>プロフィール</h3>
      <figure>
        <Image
          src={kakuta0915}
          alt=""
          objectFit="contain"
          priority
          placeholder="blur"
        />
      </figure>
      <p>
        エンジニア転職を目標に日々独学でプログラミング学習をしています。
        <br />
        日々の学習で躓いた箇所などを記事にしています。
      </p>
      <div className={styles.btnBox}>
        <Link className={styles.btn} href="./about">
          MORE
        </Link>
      </div>
    </div>
  )
}
