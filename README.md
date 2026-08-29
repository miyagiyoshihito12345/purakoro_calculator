# プラコロ電卓

「プラコロ」のワザ成功確率を計算する、個人運営の非公式Webアプリです。権利者が提供するカード画像・キャラクター画像は画面に表示せず、ワザ名、必要エネルギー、ダメージ、独自の向きアイコンと簡潔な効果表記で構成しています。

キャラクター、ワザカード4枚、3個のエネコロの各面を選択すると、エネコロを1〜5個振った場合の最大成功確率をワザごとに表示します。PCとスマートフォンの両方で利用できるレスポンシブデザインです。

## URL

- ローカル開発環境: http://localhost:5173/
- GitHub Pages: https://miyagiyoshihito12345.github.io/purakoro_calculator/

## 主な機能

- 12キャラクターから計算対象を選択
- キャラクターごとのワザカードを4枚選択
- ワザ名、必要エネルギー、ダメージ、ワザ効果をテキストで表示
- キャラコロの成功方向を独自アイコンで表示
- 3個 × 6面のエネコロをカスタマイズ
- 単一エネルギーと複合エネルギーに対応
- ワザごとにエネコロ1〜5個の最大成功確率を計算
- キャラクターごとに選択状態と計算結果を保持
- スマートフォンではワザ列を固定した成功率表を表示
- GitHub Pagesへの自動デプロイ

## 対応キャラクター

- フシギダネ
- ヒトカゲ
- ゼニガメ
- ピカチュウ
- イーブイ
- ミュウ
- カイロス
- ファイヤー
- フリーザー
- サンダー
- イワーク
- ベトベター

## 技術スタック

| 分類         | 技術                                       |
| ------------ | ------------------------------------------ |
| UI           | Vue 3（Composition API、`<script setup>`） |
| ビルド       | Vite 8                                     |
| スタイル     | Tailwind CSS 4                             |
| テスト       | Node.js Test Runner                        |
| 静的解析     | ESLint、Oxlint                             |
| フォーマット | Prettier                                   |
| デプロイ     | GitHub Actions、GitHub Pages               |

## 必要環境

- Node.js `^22.18.0` または `>=24.12.0`
- npm

## セットアップ

```sh
npm install
npm run dev
```

ブラウザで http://localhost:5173/ を開きます。

## npm scripts

| コマンド               | 内容                                     |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | 開発サーバーを起動                       |
| `npm run build`        | 本番用ファイルを`dist/`へ生成            |
| `npm run preview`      | 本番ビルドをローカルで確認               |
| `npm test`             | 確率計算とゲームデータのテストを実行     |
| `npm run lint`         | OxlintとESLintを非修正モードで実行       |
| `npm run lint:fix`     | OxlintとESLintで修正可能な問題を自動修正 |
| `npm run format`       | `src/`をPrettierで整形                   |
| `npm run format:check` | `src/`がPrettierに準拠しているか確認     |

push前の確認には次の3コマンドを実行してください。

```sh
npm run lint
npm run format:check
npm test
npm run build
```

## ファイル構成

```text
purakoro_calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pagesへのデプロイ
├── design/                         # PC・スマートフォン版の画面設計資料
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── main.css                # Tailwindの読み込みと全体スタイル
│   ├── components/
│   │   ├── CharacterAccordion.vue  # キャラクター単位の状態管理と計算
│   │   ├── CoroDirectionIcon.vue   # キャラコロの向きを表す独自アイコン
│   │   ├── EnergyCustomizer.vue    # 3×6面のエネコロ編集画面
│   │   ├── EnergySelect.vue        # 色付きエネルギー選択メニュー
│   │   ├── LegalFooter.vue         # 利用規約・プライバシー・免責事項
│   │   ├── MoveCardGrid.vue        # ワザカード候補一覧
│   │   ├── MoveSelector.vue        # ワザカード4枠の選択状態と候補表示
│   │   ├── MoveTextCard.vue        # 画像を使わないワザカード表示
│   │   └── ProbabilityTable.vue    # ワザ成功率の表
│   ├── data/
│   │   ├── gameData.js             # キャラクター・ワザ・エネコロのデータ
│   │   ├── moveEffects.json         # 基本効果・向き別キャラコロ効果
│   │   └── gameData.test.js        # ゲームデータのテスト
│   ├── utils/
│   │   ├── energy.js               # エネルギーの色と表示用変換
│   │   ├── moves.js                # ワザ効果に関する判定
│   │   ├── probability.js          # UIに依存しない確率計算ロジック
│   │   └── probability.test.js     # 確率計算ロジックのテスト
│   ├── App.vue                     # ページ全体とアコーディオン一覧
│   └── main.js                     # Vueアプリのエントリーポイント
├── index.html
├── package.json
└── vite.config.js
```

## コンポーネント構成

```text
App
├── CharacterAccordion × キャラクター数
│   ├── MoveTextCard × 選択枠
│   ├── MoveSelector
│   │   └── MoveCardGrid
│   │       └── MoveTextCard × ワザ候補
│   ├── EnergyCustomizer
│   │   └── EnergySelect × 18面
│   └── ProbabilityTable
└── LegalFooter
```

### `App.vue`

ページのヘッダー、ヒーロー、フッターとキャラクター一覧を表示します。現在開いているキャラクターIDを管理し、同時に開くアコーディオンを1体に制御します。

### `CharacterAccordion.vue`

キャラクターごとの次の状態を管理する中心コンポーネントです。

- 選択中のワザカード4枚
- 開いているワザ選択欄
- 3個のエネコロ設定
- 計算されたワザ成功率

確率計算自体はコンポーネント内へ記述せず、`src/utils/probability.js`を呼び出します。

### `MoveSelector.vue` / `MoveCardGrid.vue`

`MoveSelector.vue`が4つの選択枠と開いている候補一覧を管理し、`MoveCardGrid.vue`が候補を表示します。同じワザを複数の枠へ設定した場合は、重複している枠と警告を表示します。

### `MoveTextCard.vue`

権利者提供画像を使用せず、ワザ名、必要エネルギー、基本ダメージ、上段効果、向き別の下段効果を表示します。必要エネルギーはタイプ別の色付き記号、キャラコロの向きは`CoroDirectionIcon.vue`の独自アイコンで表します。

### `EnergyCustomizer.vue`

3個のエネコロを縦3行、各6面を横6列で表示します。面の位置に応じて選択可能なエネルギーを制限します。

### `EnergySelect.vue`

ネイティブの`select`ではなく、タイプ色を表示できるカスタム選択メニューです。複合エネルギーは背景を斜めに2分割して表示します。

### `ProbabilityTable.vue`

4つのワザを行、エネコロ1〜5個を列として成功確率を表示します。スマートフォンではワザ列を固定し、確率部分だけを横スクロールできます。

### `LegalFooter.vue`

非公式ツールであることと知的財産権の帰属を明記し、開閉式の利用規約、プライバシーポリシー、免責事項を表示します。

## データ構成

ゲームデータは`src/data/gameData.js`と`src/data/moveEffects.json`に分離しています。

`gameData.js`には次の情報を定義しています。

- キャラクター名、タイプ、HP、弱点
- ワザ名、必要エネルギー、基本ダメージ
- 各面で選択できるエネルギー
- キャラクターごとの初期エネコロ

`moveEffects.json`には次の情報を定義しています。

- 元カードの黒い領域以外にある上段効果（`baseEffect`）
- 元カードの黒い領域にある向き別の下段効果（`coroEffects`）
- 効果が発動するキャラコロの向き

ワザ効果はカード文章の長文をそのまま表示せず、「対象・タイミング：変化」が分かる簡潔な表記を使用します。

```text
次の相手ターン：相手のエネコロ −1
次の自分ターン：自分のエネコロ +2
前の自分ターンにエネコロ失敗：与ダメージ +40
```

ワザの必要エネルギーは次のような配列で表します。

```js
{
  name: 'アシッドボム',
  required: ['悪', '無', '無'],
  damage: 10
}
```

複合エネルギーの面はスラッシュ区切りです。

```js
;['草', '草', '草', '草/草', '草/悪', '悪']
```

## 確率計算の概要

確率計算は`src/utils/probability.js`に分離され、Vueに依存しません。

1. 3個のエネコロと各6面の入力を検証する
2. 振る個数に応じてエネコロの構成候補を作る
3. 各構成について6面の全出目を列挙する
4. `草/悪`のような複合面を2つのエネルギーへ分解する
5. 特定タイプを先に確保し、残りを「無」の必要数へ割り当てる
6. 成功した出目数を全出目数で割る
7. 同じ個数で最も高い成功確率を採用する

エネコロ構成は次のルールで計算します。

| 個数 | 構成候補            |
| ---- | ------------------- |
| 1個  | A、B、C             |
| 2個  | AB、AC、BC          |
| 3個  | ABC                 |
| 4個  | ABCA、ABCB、ABCC    |
| 5個  | ABCAB、ABCAC、ABCBC |

## レスポンシブデザイン

- スマートフォンと`sm`以上ではワザ選択枠を2列、`lg`以上では4列で表示
- ワザ候補一覧はスマートフォンで1列、画面幅に応じて2〜3列表示
- エネコロは画面幅にかかわらず3行×6列を維持
- 成功率表はスマートフォンで横スクロールに対応
- 成功率表のワザ列はスマートフォンで固定
- 長いワザ名は固定列内で折り返して表示

## GitHub Pagesへのデプロイ

`main`ブランチへpushすると、`.github/workflows/deploy.yml`が次を実行します。

1. Node.jsのセットアップ
2. `npm ci`
3. GitHub Pages用ベースパスを指定してビルド
4. `dist/`をGitHub Pagesへデプロイ

Viteのベースパスは、開発サーバーでは`/`、本番では標準で`/purakoro_calculator/`です。GitHub Actionsではリポジトリ名からベースパスを設定します。

## アクセス解析

本番環境ではGoogle Analytics 4を使用します。カスタムイベントは`src/utils/analytics.js`を経由して送信し、localhostなどの開発環境からは送信しません。

| イベント名         | 発生条件                                          |
| ------------------ | ------------------------------------------------- |
| `calculator_used`  | ページ表示後、電卓を初めて操作したとき（1回のみ） |
| `character_opened` | キャラクターを開いたとき                          |
| `move_changed`     | 別のワザカードへ変更したとき                      |
| `energy_changed`   | エネコロの面を別のエネルギーへ変更したとき        |
| `contact_clicked`  | お問い合わせフォームを開いたとき                  |

イベントパラメーターをGA4の標準レポートで使用する場合は、GA4管理画面でカスタムディメンションを登録します。氏名、メールアドレス、自由入力値などの個人情報は送信しません。

## 注意事項

- 本ツールは非公式です。
- 掲載情報の正確性は保証していません。実物のカードや公式情報も確認してください。
- `dist/`と`node_modules/`はGit管理対象外です。
- 権利者提供のカード画像・キャラクター画像は、アプリの画面および本番ビルドに使用しません。
- `public/images/`に残した画像はローカル確認専用で、`.gitignore`によりGit管理対象外です。
- 非公式であること、知的財産権の帰属、利用規約、プライバシーポリシー、免責事項、お問い合わせ先はアプリのフッターに掲載しています。
