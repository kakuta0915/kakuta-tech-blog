import styles from './profile.module.css'

export default function Profile() {
  return (
    <div className={styles.profile}>
      <h3>このサイトについて</h3>
      <p>
        このサイト主の「実績紹介」「WEB技術の記事」などをまとめたサイトです。
      </p>

      <h3>プロフィール</h3>
      <p>独学でプログラミング学習をしています。</p>

      <h3>趣味</h3>
      <p>アニメ、筋トレ、絵描き、読書、散歩</p>

      <h3>学習した技術・ツール</h3>
      <p>
        html5 / CSS3 / JavaScript / Sass / TypeScript / node.js / jQuery /
        Next.js / React / Veu.js / VSCode / Git / Gulp / npm / yarn / Homebrew /
        microCMS / MySQL / Linux / Mac / Firebase / GitHub / Docker
      </p>
    </div>
  )
}
