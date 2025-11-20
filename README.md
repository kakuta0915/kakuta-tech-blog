# KAKUTA TECH BLOG

<img src="/public/images/ogp.jpg" width="100%" />

---

## プロジェクト概要

**KAKUTA TECH BLOG**は、Next.js 14 (App Router)と microCMS を組み合わせた技術ブログです。学習中に躓いた箇所や、開発過程で遭遇した問題、それに対する解決策を紹介しています。

---

## 公開情報

- **サイト URL**: https://kakuta-tech-blog.vercel.app
- **ホスティング**: Vercel

---

## 機能ハイライト

- **microCMS 連携**: ブログ記事・カテゴリをヘッドレス CMS から取得し、App Router の SSG/SSR で表示
- **Markdown & シンタックスハイライト**: `html-react-parser` + `Prism.js` でリッチな本文とコードを描画
- **テーマ切り替え**: `next-themes` によるライト/ダークモード

---

## 技術スタック

- **フロントエンド**: Next.js, React, TypeScript, Sass Modules
- **CMS / API**: microCMS (`microcms-js-sdk`)
- **ユーティリティ**: date-fns, html-react-parser, html-to-text, react-toastify, Font Awesome, Prism.js
- **テーマ/UX**: next-themes, prism-themes
- **品質管理**: Jest + Testing Library, ESLint, Prettier
- **デプロイ**: Vercel

---

## ディレクトリ構成（抜粋）

```
app/
  page.tsx                 # トップ
  about/                   # サイト/プロフィール紹介
  articles/
    page.tsx               # 記事一覧
    [slug]/page.tsx        # 記事詳細 (目次・カテゴリー・前後記事)
    categories/[slug]/     # カテゴリ別一覧
  globals.scss             # グローバルスタイル
  providers.tsx            # ThemeProvider などのクライアントプロバイダ

components/
  ui/                      # Hero, Nav, Posts などの汎用 UI

features/
  article/components/      # PostHeader, TableOfContents, Pagination etc.

libs/                      # API クライアント、SEO、TOC 生成、GA など
public/                    # ogp, プロフィール画像等の静的アセット
types/                     # microCMS レスポンスの型
```

---

## ページ構成

- **Top (`/`)**: 自己紹介、最新記事
- **About (`/about`)**: サイト概要、プロフィール、SNS リンク
- **Articles (`/articles`)**: microCMS から取得した記事一覧
- **Article Detail (`/articles/[slug]`)**: 目次・カテゴリ一覧・前後記事ナビ・Markdown 本文
- **Category (`/articles/categories/[slug]`)**: 特定カテゴリの投稿とカテゴリリスト

---

## データ取得と外部サービス

- **microCMS**: `libs/api.ts` で記事・カテゴリを取得
- **Google Analytics 4**: `libs/gtag.ts` と `app/layout.tsx` から計測スクリプトを挿入
- **サイトマップ**: `next-sitemap` + `app/sitemap.xml/route.ts` で生成

---

## ローカル開発手順

1. Node.js 22 系を用意（例: `nvm use 22`）
2. リポジトリを取得
   ```bash
   git clone https://github.com/kakuta0915/kakuta-tech-blog.git
   cd kakuta-tech-blog
   ```
3. 依存関係をインストール
   ```bash
   npm install
   ```
4. `.env.local` を作成して必要な環境変数を設定（後述）
5. 開発サーバーを起動
   ```bash
   npm run dev
   ```
6. `http://localhost:3000` にアクセス

---

## 利用可能な npm scripts

- `npm run dev` – Next.js 開発サーバー（ホットリロード対応）
- `npm run build` – 本番ビルド
- `npm run start` – 本番サーバー起動
- `npm run lint` – ESLint による静的解析
- `npm run test` – Jest + Testing Library の単体テスト
- `npm run postbuild` – `next-sitemap` でサイトマップ・robots を出力

---

## テスト

- `components/ui` と `features/article/components` を中心にスナップショット/DOM 振る舞いをテスト
- Jest（`ts-jest`）+ Testing Library + `identity-obj-proxy` で CSS Modules をモック
- `npm test -- --watch` で差分テストが可能

---

## 必要な環境変数

`.env.local` に以下を設定します。

- `SERVICE_DOMAIN` … microCMS のサービスドメイン
- `API_KEY` … microCMS の API キー
- `NEXT_PUBLIC_GA_ID` … Google Analytics 4 の測定 ID（任意、`G-xxxx` 形式）

---

## 連絡先・運営者

- サイト運営: 角田（かくた）
- [X (Twitter): @_kakuta0915_](https://twitter.com/_kakuta0915_)
- [Qiita: kakuta0915](https://qiita.com/kakuta0915) – 記事のサイド導線にも表示

---

## ライセンス / 利用目的

本リポジトリは個人学習・ポートフォリオ公開を目的としており、商用ライセンスは付与していません。内容の引用・参考は歓迎しますが、再配布する場合は出典の明記をお願いします。
