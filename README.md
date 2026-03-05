# テニスサークル 公式ホームページ

大学テニスサークルの新歓向け公式ウェブサイトです。

## 🎾 主な機能

- **サークル紹介**: 活動内容、特徴、基本情報
- **イベントカレンダー**: 新歓イベントのスケジュール
- **活動写真ギャラリー**: ライトボックス機能付き写真ギャラリー
- **メンバー紹介**: 幹部の紹介ページ
- **Q&Aセクション**: アコーディオン式のよくある質問
- **新歓申込フォーム**: Netlify Forms統合
- **SNSリンク**: Instagram、Twitter、LINE等へのリンク
- **レスポンシブデザイン**: スマートフォン、タブレット、PC対応

## 🚀 デプロイ方法（Netlify）

### 1. GitHubにリポジトリを作成

```bash
# プロジェクトディレクトリに移動
cd tennis-circle-website

# Gitリポジトリを初期化
git init

# ファイルをステージング
git add .

# コミット
git commit -m "Initial commit: Tennis circle website"

# GitHubリポジトリを作成後、リモートを追加
git remote add origin https://github.com/あなたのユーザー名/tennis-circle-website.git

# プッシュ
git branch -M main
git push -u origin main
```

### 2. Netlifyでデプロイ

1. [Netlify](https://www.netlify.com/)にアクセスし、GitHubアカウントでログイン
2. 「Add new site」→「Import an existing project」を選択
3. GitHubを選択し、作成したリポジトリを接続
4. ビルド設定（特に変更不要）：
   - **Build command**: 空白
   - **Publish directory**: `.`（プロジェクトルート）
5. 「Deploy site」をクリック

数分でデプロイが完了し、`https://ランダムな名前.netlify.app` のURLでアクセスできます。

### 3. カスタムドメイン設定（任意）

Netlifyのダッシュボードから「Domain settings」で独自ドメインを設定できます。

## 📝 カスタマイズ方法

### 基本情報の変更

#### サークル名・タイトル変更
[index.html](index.html)の以下の箇所を編集：

```html
<h1 class="logo">○○大学テニスサークル</h1>
<title>○○大学テニスサークル | 新歓2026</title>
```

#### SNSリンクの変更
[index.html](index.html)の`#sns`セクションでURLを更新：

```html
<a href="https://www.instagram.com/your_tennis_circle/" ...>
```

### イベント情報の追加・編集

[index.html](index.html)の`#calendar`セクションを編集：

```html
<div class="event-card">
  <div class="event-date">
    <span class="month">4月</span>
    <span class="day">5</span>
  </div>
  <div class="event-info">
    <h3>新歓説明会</h3>
    <p><i class="fas fa-clock"></i> 18:00-19:30</p>
    <p><i class="fas fa-map-marker-alt"></i> 第一体育館 2階</p>
    <p>サークルの紹介や活動内容について...</p>
  </div>
</div>
```

### Q&Aの追加・編集

[data/qa.json](data/qa.json)を編集：

```json
[
  {
    "question": "新しい質問",
    "answer": "新しい回答"
  }
]
```

### メンバー情報の変更

[index.html](index.html)の`#members`セクションを編集：

```html
<div class="member-card">
  <div class="member-photo">
    <img src="assets/images/member1.jpg" alt="代表">
  </div>
  <h3>田中 太郎</h3>
  <p class="member-role">代表 / 4年生</p>
  <p class="member-bio">プロフィール...</p>
</div>
```

### 活動写真の追加

各月ごとのフォルダに写真をドロップするだけで自動的に表示されます：

**手順：**
1. 該当する月のフォルダを開く：
   - 4月: `/assets/images/events/apr/`
   - 5月: `/assets/images/events/may/`
   - 6月: `/assets/images/events/jun/`
   - 7月: `/assets/images/events/jul/`
   - 8月: `/assets/images/events/aug/`
   - 9月: `/assets/images/events/sep/`
   - 10月: `/assets/images/events/oct/`
   - 12月: `/assets/images/events/dec/`
   - 2月: `/assets/images/events/feb/`
   - 3月: `/assets/images/events/mar/`

2. 写真を連番でリネーム：`1.jpg`, `2.jpg`, `3.jpg`, ... (最大20枚)

3. フォルダに写真をドロップ

**Tips:**
- ファイル名は必ず連番（1.jpg, 2.jpg, ...）にしてください
- JPG形式を推奨（PNG, GIFも対応）
- 1つの月に最大20枚まで表示可能
- 写真を削除したい場合は、該当ファイルを削除後、残りの写真を連番に振り直してください

### メンバー写真の追加

メンバー紹介の写真は `/assets/images/members/` フォルダに連番で追加するだけで自動的に表示されます：

**手順：**
1. メンバーの顔写真を用意（正方形推奨、600x600px以上）
2. 写真を連番でリネーム：`1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, ...
3. `/assets/images/members/` フォルダにドロップ

**メンバー情報の編集：**
[data/members.json](data/members.json)を編集して、メンバー情報を変更できます：

```json
[
  {
    "name": "小杉 碧叶",
    "furigana": "こすぎ あおと",
    "role": "代表",
    "university": "○○大学",
    "grade": "4年生",
    "department": "経済学部 経済学科",
    "bio": "高校からテニスを始めました。楽しく本格的な活動を目指しています！"
  },
  {
    "name": "佐藤 花子",
    "furigana": "さとう はなこ",
    "role": "副代表",
    "university": "○○大学",
    "grade": "3年生",
    "department": "文学部 英文学科",
    "bio": "初心者からスタート。みんなで上達していくのが楽しいです！"
  }
]
```

**各フィールドの説明：**
- `name`: メンバーの名前（必須）
- `furigana`: 送り仮名（任意）
- `role`: 役職（例：代表、副代表、会計、広報）
- `university`: 大学名（任意）
- `grade`: 学年（例：4年生、3年生）
- `department`: 学部・学科（任意）
- `bio`: 自己紹介文

**Tips:**
- 写真の番号とJSONの順番が対応します（1.jpg = 1人目、2.jpg = 2人目...）
- 写真がない場合は自動的にプレースホルダー画像が表示されます
- メンバーを追加する場合は、JSONに項目を追加し、対応する番号の写真を追加してください
- **写真をクリックすると拡大表示されます**（プレースホルダー画像を除く）

### ヒーロー背景画像の設定

トップページのメインビジュアル（ヒーローセクション）に背景画像を表示できます：

1. 画像ファイルを用意（推奨サイズ: 1920x1080px以上、JPGまたはPNG形式）
2. `/assets/images/hero/`フォルダに画像をドロップ
3. 画像ファイル名を`hero-bg.jpg`に変更

**画像の選び方のヒント:**
- テニスコートやラケット、集合写真など活動を表す写真
- 明るい場所で撮影された、コントラストのある画像
- 中央にテキストが重なることを考慮した構図

画像は元の色が保たれ、黒の半透明オーバーレイによってテキストが見やすくなります。

別の画像ファイル名を使う場合は、[assets/css/style.css](assets/css/style.css)の`#hero`セクションで変更できます：

```css
#hero {
    background: 
        linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
        url('../images/hero/あなたの画像ファイル名.jpg') center/cover no-repeat;
}
```

### 大会成績の背景画像設定

大会成績セクションに背景画像を表示できます：

1. 画像ファイルを用意（推奨サイズ: 1920x1080px以上、JPGまたはPNG形式）
2. `/assets/images/tournament-bg/`フォルダに画像をドロップ
3. 画像ファイル名を`tournament.jpg`に変更

**画像の選び方のヒント:**
- 大会やトロフィー、表彰式などの写真
- 活動の成果を表す印象的な画像
- テキストボックスとのバランスを考慮した構図

画像は元の色が保たれ、黒の半透明オーバーレイによってテキストボックスが見やすくなります。

別の画像ファイル名を使う場合は、[assets/css/style.css](assets/css/style.css)の`#tournament`セクションで変更できます：

```css
#tournament {
    background: 
        linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
        url('../images/tournament-bg/あなたの画像ファイル名.jpg') center/cover no-repeat;
}
```

### デザイン・色の変更

[assets/css/style.css](assets/css/style.css)の`:root`セクションでカラーを変更：

```css
:root {
    --primary-color: #2ecc71;  /* メインカラー */
    --primary-dark: #27ae60;   /* メインカラー（濃） */
    --secondary-color: #3498db; /* サブカラー */
}
```

## 📂 ファイル構成

```
tennis-circle-website/
├── index.html              # メインHTMLファイル
├── assets/
│   ├── css/
│   │   └── style.css       # スタイルシート
│   ├── js/
│   │   └── main.js         # JavaScript
│   └── images/
│       ├── activity1.jpg   # 活動写真
│       ├── member1.jpg     # メンバー写真
│       └── ...
├── data/
│   └── qa.json             # Q&Aデータ
├── netlify.toml            # Netlifyデプロイ設定
├── .gitignore              # Git除外設定
└── README.md               # このファイル
```

## 🖼️ 画像の準備

### 必要な画像

以下の画像を `/assets/images/` に配置してください：

#### 活動写真（6枚程度）
- `activity1.jpg` - 練習風景
- `activity2.jpg` - 大会出場
- `activity3.jpg` - チームミーティング
- `activity4.jpg` - 合宿の様子
- `activity5.jpg` - 親睦会
- `activity6.jpg` - 集合写真

#### メンバー写真（4枚）
- `member1.jpg` - 代表
- `member2.jpg` - 副代表
- `member3.jpg` - 会計
- `member4.jpg` - 広報

### 画像の推奨サイズ

- **活動写真**: 1200x900px（4:3比率）
- **メンバー写真**: 600x600px（正方形）
- **ファイル形式**: JPG または WebP
- **ファイルサイズ**: 500KB以下（圧縮推奨）

### 画像圧縮ツール
- [TinyPNG](https://tinypng.com/) - オンライン圧縮ツール
- [Squoosh](https://squoosh.app/) - Googleの画像最適化ツール

## 🔧 フォーム設定

### Netlify Formsの設定

Netlifyに自動デプロイされると、フォーム機能が有効になります。

1. Netlify管理画面の「Forms」タブで送信内容を確認
2. 通知設定で、フォーム送信時のメール通知を設定可能
3. 無料プランでは月100件まで受信可能

### メール通知設定

1. Netlifyダッシュボードの「Forms」→「Form notifications」
2. 「Add notification」→「Email notification」
3. 通知を受け取るメールアドレスを設定

## 🎨 デザインカスタマイズのヒント

### カラーパレット
- **グリーン系**: 爽やか、スポーティー（現在の設定）
- **ブルー系**: 清潔感、信頼感
- **オレンジ系**: 活発、エネルギッシュ

### フォント変更
Google Fontsから好きなフォントを選び、HTMLの`<head>`に追加：

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
```

CSSで適用：
```css
body {
    font-family: 'Noto Sans JP', sans-serif;
}
```

## 🔒 セキュリティ

- フォームにはスパム対策（honeypot）が組み込まれています
- HTTPSは自動で有効化されます
- 個人情報の取り扱いに注意し、必要に応じてプライバシーポリシーを追加してください

## 📱 対応ブラウザ

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）
- モバイルブラウザ（iOS Safari、Android Chrome）

## 🐛 トラブルシューティング

### Q&Aが表示されない
- `data/qa.json`のパスが正しいか確認
- JSONの構文エラーがないかチェック（[JSONLint](https://jsonlint.com/)で検証）
- ブラウザのコンソールでエラーを確認

### フォームが送信できない
- Netlifyにデプロイされているか確認（ローカル環境では動作しません）
- `form-name`属性が正しく設定されているか確認
- Netlifyダッシュボードでフォームが認識されているか確認

### 画像が表示されない
- 画像ファイルのパスが正しいか確認
- ファイル名の大文字小文字が一致しているか確認
- 画像ファイルが正しくアップロードされているか確認

## 📞 サポート

質問やバグ報告がある場合は、GitHubのIssuesで報告してください。

## 📄 ライセンス

このプロジェクトは自由に使用・改変できます。

## 🙏 クレジット

- **アイコン**: [Font Awesome](https://fontawesome.com/)
- **ライトボックス**: [GLightbox](https://github.com/biati-digital/glightbox)

---

**開発者向けメモ**: このサイトは静的HTMLで構築されており、サーバーサイドの処理は不要です。GitHubとNetlifyを使えば完全無料で運用できます。
