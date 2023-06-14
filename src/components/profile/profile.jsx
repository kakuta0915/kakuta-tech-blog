import styles from './profile.module.css'

export default function Profile() {
  return (
    <div className={styles.profile}>
      <h3 className={styles.profileTitle}>このサイトについて</h3>
      <p className={styles.profileText}>
        このサイト主の「実績紹介」「WEB技術の記事」などをまとめたサイトです。
      </p>

      <h3 className={styles.profileTitle}>プロフィール</h3>
      <p className={styles.profileText}>
        独学でプログラミング学習をしています。
      </p>

      <h3 className={styles.profileTitle}>趣味</h3>
      <p className={styles.profileText}>アニメ、筋トレ、絵描き、読書、散歩</p>

      <h3 className={styles.profileTitle}>学習した技術・ツール</h3>
      <p className={styles.profileText}>
        html5 / CSS3 / JavaScript / Sass / TypeScript / node.js / jQuery /
        Next.js / React / Veu.js / VSCode / Git / Gulp / npm / yarn / Homebrew /
        microCMS / MySQL / Linux / Mac / Firebase / GitHub / Docker
      </p>
    </div>
  )
}
