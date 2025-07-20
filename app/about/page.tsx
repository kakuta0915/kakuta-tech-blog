import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { siteMeta } from '@/libs/constants'
import * as UiComponents from '@/components/ui'
import styles from './page.module.css'
import eyecatch from '@/public/images/about.jpg'
import kakuta0915 from '@/public/images/kakuta0915.png'

const { siteTitle, siteUrl } = siteMeta

export const metadata: Metadata = {
  title: 'ABOUT',
  description: 'ブログサイトについての説明と、私の自己紹介を記載しています。',
  alternates: {
    canonical: `${siteUrl}/about`,
  },

  openGraph: {
    title: `ABOUT | ${siteTitle}`,
    description: 'ブログサイトについての説明と、私の自己紹介を記載しています。',
    url: `${siteUrl}/about`,
    siteName: siteTitle,
    type: 'website',
    images: [
      {
        url: eyecatch.src,
        width: eyecatch.width,
        height: eyecatch.height,
        alt: 'Aboutページのアイキャッチ画像',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `ABOUT | ${siteTitle}`,
    description: 'ブログサイトについての説明と、私の自己紹介を記載しています。',
    images: [eyecatch.src],
  },
}

const About: React.FC = () => {
  return (
    <>
      <UiComponents.Hero
        title="ABOUT"
        description="ブログサイトについての説明と、私の自己紹介を記載しています。"
        imageSrc="./images/about.jpg"
      />
      <UiComponents.Container>
        <div className={styles['profile']}>
          <h3>このサイトについて</h3>
          <p>
            このサイトでは、ReactとNext.jsとmicroCMSを組み合わせ、プログラミングの技術ブログを制作しました。
            <br />
            ブログ記事では、学習過程で遭遇した具体的な課題や、解決策などを紹介しています。また、他の開発者やプログラミング学習者との知識の共有となることを目指しています。
            <br />
            今後も様々な記事を追加し、より充実したコンテンツを提供していきます。
          </p>

          <h3>プロフィール</h3>
          <figure>
            <Image
              className={styles['profileImage']}
              src={kakuta0915}
              alt=""
              objectFit="contain"
              priority
              placeholder="blur"
            />
          </figure>
          <UiComponents.Social isFooterSocial={false} />

          <h4>名前</h4>
          <p>
            閲覧ありがとうございます。
            <br />
            当サイトの管理をしている角田(かくた)です。
            <a
              className={styles['profileName']}
              href="https://twitter.com/_kakuta0915_"
              target="_blank"
              rel="noreferrer"
            >
              (@_kakuta0915_)
            </a>
          </p>
          <p>
            技術力の向上と実践的なスキル構築を目指し、自主的にプログラミングを学習しています。これまでの学習過程やスキルセットについて、詳しくご紹介いたします。
          </p>

          <h4>エンジニアになりたいと思ったきっかけ</h4>
          <p>
            エンジニアになりたいと思ったきっかけは、IT技術を活用して社会課題に貢献できる仕事に就きたいと思ったからです。
            <br />
            私はこれまで介護施設や医療施設で働いてきましたが、この業界は人手不足や給与の低さをはじめ、さまざまな課題を抱えています。また、紙ベースの記録や手作業が多く、業務の効率化が進んでいないことが問題となっています。そのため、業務内容や長期的なキャリアに対して不満を感じるようになりました。
            <br />
            キャリアチェンジを模索する中で、SNSなどでエンジニアという職種を知り、興味を持ちました。独学でプログラミングを始めたところ、その楽しさや可能性に魅了され、エンジニアとしてキャリアを積みたいという思いが強まりました。
            <br />
            当初は将来性のある仕事に就きたいと考えていましたが、今ではエンジニアとして社会をより良くしていきたいという強い意志があります。
            世の中には、業務の効率化や課題解決にIT技術を活かせる場面が多くあると感じています。こうした問題を解決し、社会に貢献できるエンジニアになりたいと考えています。
          </p>

          <h4>技術スタック</h4>
          <p>
            HTML5 / CSS3 / JavaScript / Sass / TypeScript / Node.js / jQuery /
            React / TailwindCSS / Next.js / Git / GitHub / Gulp / microCMS /
            Linux / Firebase / Docker / ESLint / Prettier / Jest / Vercel
          </p>

          <h4>これから学びたい技術</h4>
          <p>
            これまではフロントエンドのスキルを中心に積み重ねてきましたが、今後はバックエンドの技術にも焦点を当て、習得を進めていきたいと考えています。
            <br />
            バックエンドの技術を習得することで、データベースの設計やサーバーサイドの開発においても自身のスキルセットを強化できると考えています。特に、バックエンドの学習を通じてシステム全体の設計や機能の実装に深く関与できるようになり、フルスタックエンジニアとしてのステップアップを目指しています。
            <br />
            今後も新たな技術に積極的に挑戦し、幅広い視野を持ちながらスキルの向上を図っていきます。
          </p>

          <h4>趣味</h4>
          <p>
            プログラミング, ゲーム, アニメ鑑賞, 筋力トレーニング, 絵描き, 読書
          </p>
        </div>
      </UiComponents.Container>
    </>
  )
}

export default About
