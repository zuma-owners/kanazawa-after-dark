# Kanazawa After Dark

金沢在住の英語コーチ ZUMA が、実際に通っている「英語でも楽しめる夜の金沢」を紹介する英語メディア。
Astro（静的サイト）＋ Markdown で記事を管理し、Cloudflare Pages で公開する。

- 公開URL（仮）：https://kanazawa-after-dark.pages.dev
- 運営：合同会社OWNERS
- 取材メモ・写真・管理表は **このリポジトリの外**（公開リポジトリのため）
  - `Desktop/Claud code/kanazawa-night-memos/取材メモ/`（1店舗1ファイル、`_テンプレート.md` をコピーして使う）
  - `Desktop/Claud code/kanazawa-night-memos/写真/`
  - `Desktop/Claud code/kanazawa-night-memos/_tracker.md`（管理表）

## ページ構成

| ページ | ファイル | 内容 |
|---|---|---|
| Home `/` | `src/pages/index.astro` | 最新記事6本＋エリア別の入口 |
| Articles `/articles/` | `src/pages/articles/index.astro` | 記事一覧（エリア・タグで絞り込み。`?area=katamachi` `?tag=bar` でも可） |
| 記事 `/articles/<slug>/` | `src/pages/articles/[slug].astro` | 本文＋Practical info表＋関連記事2本＋SNS導線 |
| Guide `/guide/` | `src/pages/guide.astro` | まとめページ。店の記事を**自動で**エリア別に並べる |
| About / Contact | `src/pages/about.astro` `contact.astro` | 紹介・連絡先 |

SEO：title / meta description / OGP / canonical / `sitemap-index.xml` / `robots.txt` / RSS / 構造化データ（記事は Article、店は BarOrPub などの LocalBusiness）は自動で出る。

## 設定を変えたいとき（`src/consts.ts`）

- **SNSのURL**：`SOCIAL.url` に入れると、全記事の最後が「Follow me on Instagram for more Kanazawa nights.」に変わる（今は null）
- **独自ドメイン**：`SITE_URL` と `astro.config.mjs` の `SITE_URL` の2か所を書き換える
- **Guideの更新日**：`GUIDE_UPDATED`（毎月最初の実行時に更新）
- **エリア**：`AREAS`。記事の `area` にはここの slug を書く（katamachi / kiguramachi / korinbo / kanazawa-station / other）

## 記事の追加方法

1. 写真を圧縮・WebP化してリポジトリに入れる（長辺1600px、位置情報などは削除される）
   ```bash
   node scripts/optimize-photos.mjs <slug> "../kanazawa-night-memos/写真/IMG_0012.jpg" "../kanazawa-night-memos/写真/IMG_0013.jpg"
   ```
   → `src/assets/articles/<slug>/img_0012.webp` ができる。表示時にもビルドで画面幅ごとのWebPが自動生成される。
2. `src/content/articles/YYYY-MM-DD-<slug>.md` を作る（URLは日付を除いた `/articles/<slug>/`）

```markdown
---
title: "（場所と体験がわかるタイトル）"
subtitle: "（読む理由を1行で）"
description: "（120〜155文字。検索結果に出る説明）"
pubDate: 2026-11-20
updatedDate: 2026-11-20
area: katamachi
tags: ["bar", "craft beer"]
heroImage: "../../assets/articles/<slug>/img_0012.webp"
heroAlt: "（英語の画像説明）"
guideSummary: "（Guideページ用の2〜3行。省略すると description を使う）"
draft: false        # true にすると本番には出ない（掲載許可待ちなど）
place:
  name: "Bar Example"
  nameJa: "バー例"
  type: BarOrPub    # BarOrPub / Restaurant / NightClub / LocalBusiness
  address: "1-2-3 Katamachi, Kanazawa"
  access: "5 min walk from Katamachi bus stop"
  priceRange: "¥2,000–3,000 per person"
  payment: "Cash only"
  hours: "19:00–02:00"
  closed: "Sundays"
  website: "https://..."
  verified: true    # Webで住所・営業時間を確認できたら true。できない項目は値に (unverified) と書く
  checkedDate: 2026-11-20
---

（本文：Hook → What I liked → Can you get by in English? → Local tip）
本文中の写真： ![英語のalt](../../assets/articles/<slug>/img_0013.webp)
```

- 本文は「Local tip」まででOK。**Practical info の表・関連記事2本・SNS導線はテンプレートが自動で付ける**
- 「3選」など複数の店を紹介する記事は `place:` の代わりに `places:`（リスト）を使う。店ごとに Practical info の表が出て、店ごとに `area` も書ける（例：`2026-11-13-kanazawa-local-cafes-english.md`）
- 関連記事は「同じエリア → タグが近い → 新しい順」で自動選択。指定したいときは `related: ["slug-a", "slug-b"]`
- Guide ページも `place` がある記事から自動で作られる。新しい店を書けば Guide にも載る
- `src/content/articles/2026-11-12-sample-layout.md` は表示確認用のサンプル（`draft: true` なので本番には出ない）

## 確認と公開の流れ

```bash
npm install          # 初回だけ
npm run dev          # http://localhost:4321 で確認（draft記事も見える）
npm run build        # エラーが出ないことを確認（ここで止まったら公開しない）
git add -A
git commit -m "Add article: <店名>"
git push origin main # → Cloudflare Pages が自動でビルドして公開（1〜2分）
```

公開後は `https://kanazawa-after-dark.pages.dev/articles/<slug>/` を開いて表示を確認する。

## Medium への転載

1. https://medium.com/p/import を開き、公開した記事URLを貼って Import
2. 下書きができる（元記事への canonical が自動で付く）
3. ZUMA が確認して公開 → パブリケーション「A Different Side of Japan」に投稿 → 管理表に Medium URL を記入

## Cloudflare Pages の設定（初回だけ）

Cloudflare ダッシュボード → Workers & Pages → Create → Pages → Connect to Git → `kanazawa-after-dark` を選び：

- Framework preset：Astro
- Build command：`npm run build`
- Build output directory：`dist`
- Node のバージョンはリポジトリの `.node-version`（24）が自動で使われる

プロジェクト名を `kanazawa-after-dark` にすると URL が `kanazawa-after-dark.pages.dev` になる（取られていて別名になったら `SITE_URL` を2か所直す）。
