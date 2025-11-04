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

          <h4>エンジニアになりたいと思ったきっかけ</h4>
          <p>
            私がエンジニアを目指す理由は、IT技術を活用して社会課題の解決に貢献できる仕事に就きたいと考えたからです。
            <br />
            以前、介護の仕事に従事していた経験があり、介護業界は需要が高まる一方で、人手不足や給与面など多くの課題を抱えている現状を目の当たりにしました。そうした環境の中で、「この業界で長く働き続けるのは難しいかもしれない」と感じるようになり、自分の将来に不安を覚えました。
            <br />
            将来のキャリアを模索する中で、SNSなどを通じて「エンジニア」や「プログラミング」という言葉に触れ、次第にIT業界に興味を持つようになりました。独学でプログラミングを学び始めたところ、その奥深さと楽しさに惹かれ、エンジニアとしてのキャリアを本格的に志すようになりました。
            <br />
            今の社会には、ITの活用によって改善できる余地がまだ多く残されています。私は、そうした課題に対してテクノロジーの力で、現場の働きやすさやサービスの質を向上させるようなエンジニアになりたいと思っています。
          </p>

          <h4>技術スタック</h4>
          <p>
            HTML5 / CSS3 / JavaScript / Sass / TypeScript / Node.js / jQuery /
            React / TailwindCSS / Next.js / Git / GitHub / Gulp / microCMS /
            Linux / Docker / ESLint / Prettier / Jest / Vercel
          </p>

          <h4>これから学びたい技術</h4>
          <p>
            これまで主にフロントエンドのスキルを中心に学んできたため、まずはその知識や経験を実務の中で活かし、貢献していきたいと考えています。
            <br />
            一方で、バックエンドの知識や経験はまだ十分ではないため、今後は積極的に学習を進め、着実にスキルの幅を広げていきたいです。
            <br />
            将来的には、フロントエンドとバックエンドの両方を理解し、柔軟に対応できるフルスタックエンジニアとして活躍することを目指しています。
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

export default AboutPage
