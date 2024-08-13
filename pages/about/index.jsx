import Image from 'next/image'
import Meta from '@/src/components/meta/meta'
import Hero from '@/src/components/hero/hero'
import Container from '@/src/components/container/container'
import Social from '@/src/components/social/social'
import styles from './index.module.css'
import eyecatch from '@/public/images/about.jpg'
import kakuta0915 from '@/public/images/kakuta0915.png'

export default function About() {
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
          <h3>このサイトについて</h3>
          <p>
            このサイトでは、ReactとNext.jsとmicroCMSを組み合わせ、プログラミングの技術ブログを制作しました。
            <br />
            ブログ記事では、開発過程で遭遇した具体的な課題や、それに対する解決策を紹介しています。また、新しい技術やツールの導入・設定のカスタマイズ・パフォーマンスの最適化・開発プロセスで学んだベストプラクティスなどの記事も提供しています。これにより、他の開発者やプログラミング学習者との知識の共有となることを目指しています。
            <br />
            今後も様々な記事を追加し、より充実したコンテンツを提供していきます。
          </p>

          <h3>プロフィール</h3>
          <figure>
            <Image
              className={styles.profileImage}
              src={kakuta0915}
              alt=""
              objectFit="contain"
              priority
              placeholder="blur"
            />
          </figure>
          <Social />

          <h4>名前</h4>
          <p>
            KAKUTAです。
            <a
              className={styles.profileName}
              href="https://twitter.com/_kakuta0915_"
              target="_blank"
              rel="noreferrer"
            >
              (@_kakuta0915_)
            </a>{' '}
          </p>
          <p>
            エンジニア転職を目標に、自主的にプログラミングを学習しています。日々の学びや経験を通じて、技術力の向上と実践的なスキルの構築に注力しています。これまでの学習過程やスキルセットについて、詳しくご紹介いたします。
          </p>

          <h4>エンジニアになりたいと思ったきっかけ</h4>
          <p>
            私がエンジニアになりたいと思った理由は、将来性とやりがいのある仕事に就きたいと思ったからです。
            <br />
            現在、私は介護士として勤務しています。
            介護業界は需要が高い一方で人手不足や給与の問題といった課題が多く、「この業界で長く働き続けるのは難しいかもしれない」と感じていました。また、日々同じ手順に沿った業務を繰り返すだけでは、新しい刺激や達成感を得るのが難しいと感じることもありました。
            <br />
            自分の将来に不安を感じ、キャリアチェンジを視野に生活していたところ、SNSなどで「エンジニア」や「プログラミング」といったワードを目にするようになり、エンジニアという職種に興味を持ち始めました。
            <br />
            最初はProgateでHTMLとCSSなどを試しに学習し、次に書店に売られている教材でスキルを学んでいきました。プログラミングスクールへは通わずに独学だったので、エラーや分からない箇所に何度も躓き挫折しました。しかし、途中で投げ出してしまっても、再びその問題に取り掛かり解決するまで諦めませんでした。
            <br />
            そうして自分が書いたプログラムが画面に表示されて、動いたときはとても感動しました。手を動かして何かを作り上げていく過程が非常に楽しく、ほぼ毎日プログラミングをしています。
          </p>

          <h4>どんなエンジニアになりたいか</h4>
          <p>
            プログラミングを学習し始めたときは、将来性のある仕事に就きたいと考えておりましたが、学習を進めていくうちに、「介護や医療の課題をIT技術で解決できることはないだろうか？」と考えるようになりました。
            <br />
            医療・介護業界が他の産業と比較してIT化が進んでいない現状であり、私はこの分野において、IT技術を駆使して人手不足の解消や業務の効率化を促進することができれば、患者様や介護スタッフ、医療従事者にとって大きな利益となると思っています。
            <br />
            私はこれまで、介護士として病院や介護施設での現場経験を積んできました。今までの経験と現在のITスキルをかけ合わせて、将来は医療・介護業界において専門的なWEBエンジニアとして社会貢献できる存在になりたいと思っています。
            <br />
            私が目指すエンジニア像は、ただ技術を磨くだけでなく、その技術を通じて社会に貢献し、人々の生活を向上させることです。介護の現場で培った人間性やコミュニケーションスキルを活かし、医療・介護業界における課題解決に尽力していきたいと思っています。
          </p>

          <h4>技術スタック</h4>
          <p>
            HTML5 / CSS3 / JavaScript / Sass / TypeScript / Node.js / jQuery /
            React / TailwindCSS / Next.js / Git / GitHub / Gulp / microCMS /
            Linux / Firebase / Docker / ESLint / Prettier / Jest / Vercel
          </p>

          <h4>これから学びたい技術</h4>
          <p>
            これまではフロントエンドのスキルを中心に積み重ねてきましたが、今後はバックエンドの技術にも焦点を当て、習得を進めてい来たいと考えています。
            <br />
            バックエンドの技術を理解し実践することで、データベースの設計やサーバーサイドの開発においても自身のスキルセットを強化できると考えています。特に、バックエンドの学習を通じてシステム全体の設計や機能の実装に深く関与できるようになり、フルスタックエンジニアとしてのステップアップを目指しています。データベースの最適な選定やAPIの設計、セキュリティ対策など、バックエンドの世界での知識を取り入れ、プロジェクトにおいて全体像を俯瞰できるように成長していくつもりです。
            <br />
            今後も新たな技術に積極的に挑戦し、幅広い視野を持ちながらスキルの向上を図っていきます。
          </p>

          <h4>趣味</h4>
          <p>プログラミング, アニメ鑑賞, 筋力トレーニング, 絵描き, 読書</p>
        </div>
      </Container>
    </>
  )
}
