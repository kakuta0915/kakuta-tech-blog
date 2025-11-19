import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createMetadata } from '@/libs/seo'
import * as UiComponents from '@/components/ui'
import styles from './page.module.css'
import eyecatch from '@/public/images/about.jpg'
import kakuta0915 from '@/public/images/kakuta0915.png'

export const metadata: Metadata = createMetadata({
  pageTitle: 'ABOUT',
  pageDesc: 'ブログサイトについての説明と、私の自己紹介を記載しています。',
  slug: 'about',
  pageImg: eyecatch.src,
  pageImgW: eyecatch.width,
  pageImgH: eyecatch.height,
})

const AboutPage: React.FC = () => {
  return (
    <>
      <UiComponents.StickyHeader />
      <UiComponents.Hero
        title="ABOUT"
        description="ブログサイトについての説明と、私の自己紹介を記載しています。"
        imageSrc={eyecatch.src}
      />
      <UiComponents.Container>
        <div className={styles['profileContainer']}>
          <h3>このサイトについて</h3>
          <p>
            このサイトでは、Next.jsとmicroCMSを組み合わせ、プログラミングの技術ブログサイトを構築しました。
            <br />
            ブログ記事では、学習過程で遭遇した問題や、解決策などを紹介しています。
            <br />
            今後も様々な記事を追加し、より充実したコンテンツを提供していきます。
          </p>

          <h3>プロフィール</h3>
          <figure>
            <Image
              className={styles['profileImage']}
              src={kakuta0915}
              alt="プロフィール画像"
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
            当サイトの管理をしている角田 (かくた)です。
            <a
              className={styles['profileName']}
              href="https://twitter.com/_kakuta0915_"
              target="_blank"
              rel="noreferrer"
            >
              (@_kakuta0915_)
            </a>
            <br />
            Webエンジニアを目指し、日々学習に励んでいます。
            <br />
            よろしくお願いいたします。
          </p>

          <h4>技術スタック</h4>
          <p>
            HTML / CSS / Sass / JavaScript / TypeScript / React / Next.js /
            TailwindCSS / jQuery / Gulp / Jest / ESLint / Prettier <br />
            Node.js / PHP / Laravel <br />
            Docker / Linux / Git / GitHub / Firebase / Vercel <br />
            microCMS
          </p>

          <h4>これから学びたい技術</h4>
          <p>
            今後は、モダンな技術であるTypeScriptやVue.jsの学習を進めていきたいと考えております。
            <br />
            また、前職ではPHPやLaravel、MySQLを用いたバックエンドの研修を行っておりましたが、基礎的な部分の理解に留まっていたため、今後は復習を重ねながら、より深い理解を身につけていきたいと思っております。
          </p>

          <h4>趣味</h4>
          <p>プログラミング / ゲーム / アニメ鑑賞 / 筋力トレーニング / 読書</p>
        </div>
      </UiComponents.Container>
    </>
  )
}

export default AboutPage
