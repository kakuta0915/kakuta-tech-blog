# KAKUTA TECH BLOG

<img src="/public/images/ogp.jpg" width="100%" />

---

## サイト概要

**KAKUTA TECH BLOG**は、React・Next.js・microCMS・Firebase を活用した技術ブログです。プログラミング学習の記録や、学習・開発過程で遭遇した課題とその解決策を記事としてまとめています。他の開発者や学習者との知識共有を目指しています。

- **サイト URL**: https://kakuta-tech-blog.vercel.app

---

## 技術スタック

- **フロントエンド**: React, Next.js, TypeScript, CSS Modules, styled-jsx
- **バックエンド/ヘッドレス CMS**: microCMS
- **認証・データストア**: Firebase (Firestore, Auth, Storage)
- **デプロイ**: Vercel
- **その他**: Jest（テスト）, ESLint/Prettier（静的解析・整形）, axios, cheerio, react-markdown, react-syntax-highlighter, react-toastify など

---

## 主な機能

### 記事管理

- microCMS・Qiita API から記事を取得し、一覧・詳細表示
- 記事のカテゴリ分け・カテゴリごとの記事一覧
- 記事への「いいね」「ブックマーク」「コメント」機能（Firebase 連携）
- 記事のリアルタイムな「いいね数」「ブックマーク数」表示

### ユーザー機能

- Google 認証によるログイン
- 「いいね」した記事・ブックマークした記事の管理
- コメント投稿

### ポートフォリオ

- 制作した Web サイトやアプリの紹介
- GitHub リンク

### お問い合わせ

- フォームからの連絡受付

---

## ディレクトリ構成（抜粋）

```
app/           # Next.jsのルーティング・各ページ
  about/       # サイト・運営者紹介
  articles/    # 記事一覧・カテゴリ別記事
  my-account/  # ユーザーの「いいね」「ブックマーク」管理
  contact/     # お問い合わせフォーム
  settings/    # アカウント編集・削除
features/
  article/     # 記事関連の機能コンポーネント
  auth/        # 認証関連
components/
  ui/          # 汎用UIコンポーネント
  Layouts/     # レイアウト用コンポーネント
libs/          # API連携・定数・ユーティリティ
public/        # 画像等の静的ファイル
types/         # 型定義
```

---

## ページ構成

- **トップページ**: サイト概要、最新記事、ポートフォリオ紹介
- **About**: サイトの目的・運営者プロフィール・技術スタック
- **Articles**: 記事一覧、カテゴリ別記事、記事詳細
- **My Account**: ログインユーザーの「いいね」「ブックマーク」記事管理
- **Contact**: お問い合わせフォーム
- **Settings**: アカウント情報編集・削除

---

## データ取得・API 連携

- **microCMS**: 記事・カテゴリデータの取得
- **Qiita API**: Qiita 投稿記事の取得
- **Firebase Firestore**: 記事ごとの「いいね数」「ブックマーク数」管理、コメント保存
- **Firebase Auth**: Google 認証
- **Firebase Storage**: 画像等の保存

---

## 認証・ユーザー管理

- Google アカウントでのログイン（Firebase Auth）
- ログインユーザーのみ「いいね」「ブックマーク」「コメント」可能
- マイアカウントページで自分のアクション履歴を管理

---

## UI/UX

- レスポンシブデザイン
- アイキャッチ画像・プロフィール画像等の最適化
- 記事の目次自動生成
- 記事本文の Markdown 対応・シンタックスハイライト
- トースト通知によるフィードバック

---

## 開発・ビルド・デプロイ

- 開発: `npm run dev`
- 本番ビルド: `npm run build`
- 本番起動: `npm start`
- 静的サイトマップ生成: `npm run postbuild`
- テスト: `npm test`
- デプロイ: Vercel 連携

---

## 環境変数例

- `SERVICE_DOMAIN` ... microCMS のサービスドメイン
- `API_KEY` ... microCMS の API キー
- `QIITA_API_TOKEN` ... Qiita API トークン
- Firebase 関連（`.env`または`firebaseConfig.js`で管理）

---

## 連絡先・運営者

- サイト運営: 角田（かくた）
- [Twitter: @_kakuta0915_](https://twitter.com/_kakuta0915_)
- お問い合わせは `/contact` ページから

---

## ライセンス

本プロジェクトは個人学習・ポートフォリオ目的で公開しています。
