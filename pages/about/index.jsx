import Image from 'next/image'
import Meta from '@/src/components/meta/meta'
import Hero from '@/src/components/hero/hero'
import Container from '@/src/components/container/container'
import Social from '@/src/components/social/social'
import useScrollAnimation from '@/src/components/useScrollAnimation/useScrollAnimation'
import useScrollAnimationStyles from '@/src/components/useScrollAnimation/useScrollAnimation.module.css'
import styles from './index.module.css'
import eyecatch from '@/public/images/about.jpg'
import kakuta0915 from '@/public/images/kakuta0915.png'

export default function About() {
  useScrollAnimation([
    `.${useScrollAnimationStyles.fadeInUp}`,
    `.${useScrollAnimationStyles.fadeInRight}`,
    `.${useScrollAnimationStyles.fadeInLeft}`,
  ])

  return (
    <>
      <Meta
        pageTitle="ABOUT"
        pageDesc="ブログサイトについての説明と、私の自己紹介を記載しています。"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <Hero
        title="ABOUT"
        description="ブログサイトについての説明と、私の自己紹介を記載しています。"
        imageSrc="./images/about.jpg"
      />
      <Container>
        <div className={styles.profile}>
          <h3 className={useScrollAnimationStyles.fadeInUp}>
            このサイトについて
          </h3>
          <p className={useScrollAnimationStyles.fadeInUp}>
            このサイトでは、ReactとNext.jsとmicroCMSを組み合わせ、プログラミングの技術ブログを制作しました。
            <br />
            ブログ記事では、開発過程で遭遇した具体的な課題や、それに対する解決策などを紹介しています。これにより、他の開発者やプログラミング学習者との知識の共有となることを目指しています。
            <br />
            今後も様々な記事を追加し、より充実したコンテンツを提供していきます。
          </p>

          <h3 className={useScrollAnimationStyles.fadeInUp}>プロフィール</h3>
          <figure>
            <Image
              className={`${useScrollAnimationStyles.fadeInUp} ${styles.profileImage}`}
              src={kakuta0915}
              alt=""
              objectFit="contain"
              priority
              placeholder="blur"
            />
          </figure>
          <Social className={useScrollAnimationStyles.fadeInUp} />

          <h4 className={useScrollAnimationStyles.fadeInUp}>名前</h4>
          <p className={useScrollAnimationStyles.fadeInUp}>
            閲覧ありがとうございます。
            <br />
            当サイトの管理をしている角田(かくた)です。
            <a
              className={styles.profileName}
              href="https://twitter.com/_kakuta0915_"
              target="_blank"
              rel="noreferrer"
            >
              (@_kakuta0915_)
            </a>
          </p>
          <p className={useScrollAnimationStyles.fadeInUp}>
            エンジニア転職を目標に、自主的にプログラミングを学習しています。日々の学びや経験を通じて、技術力の向上と実践的なスキルの構築に注力しています。これまでの学習過程やスキルセットについて、詳しくご紹介いたします。
          </p>

          <h4 className={useScrollAnimationStyles.fadeInUp}>
            エンジニアになりたいと思ったきっかけ
          </h4>
          <p className={useScrollAnimationStyles.fadeInUp}>
            私がエンジニアを目指す理由は、IT技術を活用して社会課題に貢献できる仕事に就きたいと考えたからです。
            <br />
            私は今まで、介護施設や医療施設で働いてきました。介護・医療業界は、人手不足や給与の低さといった多くの課題を抱えています。このような状況から、「この業界で長く働き続けるのは難しいかもしれない」と感じ、自分の将来に不安を持つようになりました。
            <br />
            将来のキャリアチェンジを模索する中で、SNSで「エンジニア」や「プログラミング」というワードを目にするようになり、次第にエンジニアという職種に興味を持ちました。独学でプログラミングを始めたところ、その楽しさや可能性に魅了され、エンジニアとしてキャリアを積みたいという思いが強まりました。
            <br />
            世の中には業務改善や効率化の余地が多く残っており、これらの課題をIT技術で解決することで、社会に貢献できるエンジニアになりたいと思っています。
          </p>

          <h4 className={useScrollAnimationStyles.fadeInUp}>技術スタック</h4>
          <p className={useScrollAnimationStyles.fadeInUp}>
            HTML5 / CSS3 / JavaScript / Sass / TypeScript / Node.js / jQuery /
            React / TailwindCSS / Next.js / Git / GitHub / Gulp / microCMS /
            Linux / Firebase / Docker / ESLint / Prettier / Jest / Vercel
          </p>

          <h4 className={useScrollAnimationStyles.fadeInUp}>
            これから学びたい技術
          </h4>
          <p className={useScrollAnimationStyles.fadeInUp}>
            これまではフロントエンドのスキルを中心に積み重ねてきましたが、今後はバックエンドの技術にも焦点を当て、習得を進めてい来たいと考えています。
            <br />
            バックエンドの技術を理解し実践することで、データベースの設計やサーバーサイドの開発においても自身のスキルセットを強化できると考えています。特に、バックエンドの学習を通じてシステム全体の設計や機能の実装に深く関与できるようになり、フルスタックエンジニアとしてのステップアップを目指しています。データベースの最適な選定やAPIの設計、セキュリティ対策など、バックエンドの世界での知識を取り入れ、プロジェクトにおいて全体像を俯瞰できるように成長していくつもりです。
            <br />
            今後も新たな技術に積極的に挑戦し、幅広い視野を持ちながらスキルの向上を図っていきます。
          </p>

          <h4 className={useScrollAnimationStyles.fadeInUp}>趣味</h4>
          <p className={useScrollAnimationStyles.fadeInUp}>
            プログラミング, ゲーム, アニメ鑑賞, 筋力トレーニング, 絵描き, 読書
          </p>
        </div>
      </Container>
    </>
  )
}
