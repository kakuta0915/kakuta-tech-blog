// aboutページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Profile from '@/src/components/profile/profile'
import Hero from '@/src/components/hero/hero'
import Image from 'next/image'
import eyecatch from 'images/about.jpg'

export default function About() {
  return (
    <>
      <Container>
        <Meta
          pageTitle="ABOUT"
          pageDesc="このサイトについての説明とプロフィールのページです"
          pageImg={eyecatch.src}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <Hero title="ABOUT" subtitle="このページについての説明" />
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
      </Container>

      <Profile>
        <h3>このサイトについて</h3>
        <p>
          このサイト主の「実績紹介」「WEB技術の記事」などをまとめたサイトです。
        </p>

        <h3>プロフィール</h3>
        <p>独学でプログラミング学習をしています。</p>

        <h3>趣味</h3>
        <p>アニメ、筋トレ、絵描き、読書、散歩</p>

        <h3>学習した技術・ツール</h3>

        <table>
          <tbody>
            <tr>
              <th>フロントエンド</th>
              <td>html5 / CSS3 / JavaScript / Sass / TypeScript</td>
            </tr>
            <tr>
              <th>サーバサイド</th>
              <td>node.js</td>
            </tr>
            <tr>
              <th>フレームワーク</th>
              <td>jQuery / Next.js</td>
            </tr>
            <tr>
              <th>ライブラリ</th>
              <td>React / Veu.js</td>
            </tr>
            <tr>
              <th>ツール</th>
              <td>VSCode / Git / Gulp</td>
            </tr>
            <tr>
              <th>パッケージ管理</th>
              <td>npm / yarn / Homebrew</td>
            </tr>
            <tr>
              <th>データベース</th>
              <td>MySQL / PostgreSQL</td>
            </tr>
            <tr>
              <th>プラットフォーム・OS関係</th>
              <td>Linux / Mac / Firebase / GitHub</td>
            </tr>
            <tr>
              <th>仮想化・コンテナ技術</th>
              <td>Docker</td>
            </tr>
          </tbody>
        </table>
      </Profile>
    </>
  )
}
