# 🚀 クイックスタートガイド

テニスサークルホームページのセットアップと公開方法を説明します。

## 📋 事前準備

以下のアカウントを作成してください（すべて無料）：

1. **GitHubアカウント** - https://github.com/
2. **Netlifyアカウント** - https://www.netlify.com/ （GitHubでログイン可能）

## 🎯 ステップ1: 内容をカスタマイズ

### 基本情報の変更

`index.html`を開き、以下を編集：

1. **サークル名の変更**（複数箇所）
```html
<!-- 例: -->
○○大学テニスサークル → あなたの大学名テニスサークル
```

2. **SNSリンクの変更**（`#sns`セクション）
```html
<a href="https://www.instagram.com/your_tennis_circle/">
↓
<a href="https://www.instagram.com/実際のアカウント名/">
```

3. **メールアドレスの変更**
```html
tennis.circle@university.ac.jp → 実際のメールアドレス
```

### イベント情報の更新

`index.html`の`#calendar`セクションで日時や場所を実際の情報に変更：

```html
<div class="event-date">
    <span class="month">4月</span>
    <span class="day">5</span>
</div>
...
<h3>新歓説明会</h3>
<p><i class="fas fa-clock"></i> 18:00-19:30</p>
<p><i class="fas fa-map-marker-alt"></i> 第一体育館 2階</p>
```

### Q&Aの編集

`data/qa.json`を開き、質問と回答を追加・編集：

```json
[
  {
    "question": "あなたの質問",
    "answer": "あなたの回答"
  }
]
```

### 写真の追加（任意）

現在はダミー画像を使用しています。実際の写真に差し替える場合：

1. `assets/images/`に写真をコピー
2. `index.html`の画像URL部分を変更：

```html
<!-- 変更前 -->
<img src="https://source.unsplash.com/..." alt="練習風景">

<!-- 変更後 -->
<img src="assets/images/activity1.jpg" alt="練習風景">
```

詳細は `assets/images/README.md` を参照

## 🎯 ステップ2: GitHubにアップロード

### 方法A: GitHub Desktop使用（初心者向け）

1. **GitHub Desktop** をダウンロード: https://desktop.github.com/
2. GitHub Desktopを開き、GitHubアカウントでサインイン
3. `File` → `Add Local Repository` を選択
4. `tennis-circle-website` フォルダを選択
5. （リポジトリが見つからないと表示されたら）`Create Repository` をクリック
6. 右上の `Publish repository` をクリック
7. リポジトリ名を入力（例: `tennis-circle-website`）
8. `Publish repository` をクリック

### 方法B: コマンドライン使用（経験者向け）

PowerShellまたはコマンドプロンプトを開く：

```bash
# プロジェクトディレクトリに移動
cd c:\Users\enkuu\PyCharmMiscProject\keiba\tennis-circle-website

# Gitリポジトリを初期化
git init

# ファイルをステージング
git add .

# コミット
git commit -m "Initial commit: Tennis circle website"

# GitHubで新しいリポジトリを作成後、以下を実行
# （あなたのユーザー名に置き換えてください）
git remote add origin https://github.com/あなたのユーザー名/tennis-circle-website.git
git branch -M main
git push -u origin main
```

> **注意**: GitHubに新しいリポジトリを作成する必要があります：
> 1. https://github.com/new にアクセス
> 2. Repository name: `tennis-circle-website`
> 3. Public を選択
> 4. `Create repository` をクリック

## 🎯 ステップ3: Netlifyでデプロイ

### 詳細手順

1. **Netlifyにアクセス**: https://www.netlify.com/
2. GitHubアカウントでログイン
3. `Add new site` → `Import an existing project` をクリック
4. `Deploy with GitHub` を選択
5. Netlifyの権限要求を承認
6. リポジトリ一覧から `tennis-circle-website` を選択
7. デプロイ設定画面で以下を確認：
   - **Branch to deploy**: `main`
   - **Build command**: 空白（そのまま）
   - **Publish directory**: `.`（ドットのみ）
8. `Deploy site` をクリック

### デプロイ完了

数分でデプロイが完了します。以下のようなURLが発行されます：

```
https://ランダムな文字列.netlify.app
```

このURLにアクセスして、ウェブサイトを確認してください！

## 🎯 ステップ4: サイト名の変更（任意）

1. Netlify管理画面で `Site settings` をクリック
2. `Change site name` をクリック
3. 好きな名前を入力（例: `your-tennis-circle`）
4. 保存すると、URLが以下のように変更されます：
```
https://your-tennis-circle.netlify.app
```

## 📧 ステップ5: フォーム通知の設定

新歓申込があったときにメールで通知を受け取る設定：

1. Netlify管理画面で `Forms` タブを開く
2. `Form notifications` をクリック
3. `Add notification` → `Email notification` を選択
4. Form: `新歓申込` を選択
5. Email to notify: あなたのメールアドレスを入力
6. `Save` をクリック

これで、フォーム送信時にメールが届くようになります！

## ✏️ 更新方法（コンテンツの変更）

### ファイルを編集した後

**方法A: GitHub Desktop使用**
1. GitHub Desktopを開く
2. 左側に変更されたファイルが表示される
3. 左下の `Summary` に変更内容を入力（例: "イベント情報を更新"）
4. `Commit to main` をクリック
5. 右上の `Push origin` をクリック

**方法B: コマンドライン**
```bash
git add .
git commit -m "更新内容の説明"
git push
```

### 自動デプロイ

GitHubにプッシュすると、**Netlifyが自動的に**サイトを更新します！
数分待ってからサイトにアクセスすると、変更が反映されています。

## 🆘 トラブルシューティング

### Q. サイトにアクセスできない
- Netlifyのデプロイが完了するまで数分かかります
- Netlify管理画面の `Deploys` タブでステータスを確認

### Q. フォームが送信できない
- ローカル（自分のPC）では動作しません
- Netlifyにデプロイされた状態で動作します
- Netlify管理画面の `Forms` タブでフォームが認識されているか確認

### Q. Q&Aが表示されない
- `data/qa.json` のJSONフォーマットが正しいか確認
- https://jsonlint.com/ で検証してください

### Q. 画像が表示されない
- 現在はUnsplashのダミー画像を使用しています
- 実際の写真に差し替える場合は、パスが正しいか確認してください

### Q. 変更が反映されない
- ブラウザのキャッシュをクリア（Ctrl + F5 または Cmd + Shift + R）
- Netlifyのデプロイが完了しているか確認

## 📱 次のステップ

### 独自ドメインの設定（任意）
1. ドメインを購入（お名前.com、ムームードメインなど）
2. Netlify管理画面の `Domain management` で設定
3. HTTPSは自動で有効化されます

### Google Analyticsの追加（任意）
1. Google Analyticsでプロパティを作成
2. トラッキングコードを取得
3. `index.html` の `</head>` 直前に追加

### SEO対策
- `index.html` の `<title>` と `<meta description>` を最適化
- OGP画像を設定してSNSでのシェアを最適化

## 🎉 完成！

お疲れ様でした！これでテニスサークルのホームページが公開されました。

新歓活動の成功を祈っています！ 🎾

---

**質問や問題が発生した場合**: GitHubのIssuesで質問してください。
