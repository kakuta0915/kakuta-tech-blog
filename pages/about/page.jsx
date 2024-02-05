// aboutページ

import Meta from '@/src/components/elements/Meta/Meta'
import Container from '@/src/components/layouts/Container/Container'
import Hero from '@/src/components/elements/Hero/Hero'
import Image from 'next/image'
import eyecatch from 'images/about.jpg'
import styles from './page.module.css'

export default function About() {
  return (
      <Container>
        <Meta
          pageTitle="ABOUT"
          pageDesc="このサイトについての説明とプロフィールのページです"
          pageImg={eyecatch.src}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <Hero
          title="ABOUT"
          subtitle="このページについての説明と自己紹介をします"
        />
        <figure className={styles.figure}>
          <Image
            src={eyecatch}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 80vw"
            priority
            placeholder="blur"
          />
        </figure>
        <div className={styles.profile}>
          <h3>このサイトについて</h3>
          <p>
            Next.jsとmicroCMSと組み合わせてプログラミングの技術ブログを制作してみました。
            <br />
            学習時に躓いた箇所などを記事にしてまとめています。
          </p>

          <h3>プロフィール</h3>
          <p>
            エンジニア転職を目標に日々独学でプログラミング学習をしています。
            <br />
          </p>

          <h4>なぜエンジニアになりたいと思ったのか</h4>
          <p>
            私がエンジニアになりたいと思った理由は、将来性のある仕事に就きたいと思ったからです。
            <br />
            私は普段、施設で介護士として働いています。
            <br />
            介護業界は需要はありますが、人手不足や給料の低さから「いつまでもこの業界で働き続けることは難しい」と思っていました。また、仕事内容も毎日繰り返しの業務でやりがいを感じることが出来ません。
            <br />
            自分の将来に不安を感じ、キャリアチェンジを視野に生活していたところ、SNSなどで「エンジニア」や「プログラミング」といったワードを目にするようになり、エンジニアという職種に興味を持ち始めました。
            <br />
            最初はprogateでHTMLとCSSなどをお試し感覚で学習し、次に書店に売られている教材で色々と学習していきました。
            プログラミングスクールへは通わずに独学だったので、エラーや分からない箇所に何度も躓き挫折しました。ですが、私は中途半端なことが嫌いな性格なので、挫折しても次の日にはもう一度その問題について調べるなどして解決するまで諦めませんでした。
            <br />
            そうして書いたプログラムが画面に表示されて、動いたときはとても感動しました。ものづくりのように手を動かして作っていく感覚が楽しくて、毎日プログラミングをしています。
            <br />
            そしてプログラミングを仕事にしたいと思うようになりました。
          </p>

          <h4>どんなエンジニアになりたい?</h4>
          <p>
            私は約5年、介護士として病院や介護施設で働いてきました。
            <br />
            現場経験を活かして、少しでも医療・介護業界に貢献したいと思っています。
            <br />
            医療・介護業界は他の業界と比べてIT化が進んでいないため、IT技術で人手不足の解消や業務の効率化などを行えたら良いと考えています。
          </p>

          <h4>学習した技術・ツール・サービス</h4>
          <p>
            html5 / CSS3 / JavaScript / Sass / TypeScript / node.js / jQuery /
            Next.js / React / Veu.js / Git / GitHub / Gulp / microCMS / SQL / MySQL
            / Linux / Firebase / Docker
          </p>

          <h4>これから学びたい技術</h4>
          <p>
            フロントエンドの学習が主だったので、今後はバックエンドの技術も習得していきたいです。
          </p>

          <h4>趣味</h4>
          <p>プログラミング、アニメ鑑賞、筋力トレーニング、絵描き、読書、散歩</p>
        </div>
      </Container>
  )
}
