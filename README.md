# カブ価格予想ツール - どうぶつの森

とびだせどうぶつの森 / あつまれどうぶつの森 のカブ価格を予想するWebアプリケーションです。

## 🌐 デプロイ方法

### GitHub Pagesで公開する（推奨・無料）

#### 1. GitHubリポジトリの作成

```bash
# GitHubで新しいリポジトリを作成（例: turnip-predictor）
# ローカルでGitの初期化
git init
git add .
git commit -m "Initial commit: カブ価格予想ツール"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/turnip-predictor.git
git push -u origin main
```

#### 2. package.jsonの編集

`package.json` の `homepage` を自分のユーザー名とリポジトリ名に変更：

```json
"homepage": "https://YOUR_USERNAME.github.io/turnip-predictor"
```

#### 3. GitHub Pagesの設定

GitHubリポジトリページで：
1. **Settings** → **Pages** に移動
2. **Source** を `gh-pages` ブランチに設定
3. 保存

#### 4. 自動デプロイ

mainブランチにpushすると自動的にデプロイされます：

```bash
git add .
git commit -m "Update"
git push
```

数分後、 `https://YOUR_USERNAME.github.io/turnip-predictor` でアクセス可能になります。

#### 5. 手動デプロイ（オプション）

```bash
npm install
npm run deploy
```

---

### 他の無料ホスティングサービス

#### Vercel（推奨・最も簡単）

1. [Vercel](https://vercel.com)にサインアップ
2. GitHubリポジトリを接続
3. 自動的にビルド・デプロイされます
4. URLが自動生成されます（例: `turnip-predictor.vercel.app`）

**手順:**
```bash
# Vercel CLIをインストール
npm install -g vercel

# デプロイ
vercel
```

#### Netlify

1. [Netlify](https://netlify.com)にサインアップ
2. 「New site from Git」を選択
3. GitHubリポジトリを接続
4. ビルドコマンド: `npm run build`
5. 公開ディレクトリ: `build`

#### Cloudflare Pages

1. [Cloudflare Pages](https://pages.cloudflare.com)にログイン
2. 「Create a project」を選択
3. GitHubリポジトリを接続
4. フレームワーク: `Create React App`
5. ビルドコマンド: `npm run build`
6. 出力ディレクトリ: `build`

---

## 💻 ローカル開発（Docker使用）

### 必要な環境

- Docker
- Docker Compose
- VSCode（推奨）

### セットアップ手順

#### 1. プロジェクトの準備

```
project-root/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tailwind.config.js
├── .gitignore
├── README.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── index.css
    └── App.js
```

#### 2. Dockerコンテナの起動

```bash
# コンテナをビルドして起動
docker-compose up -d

# ログを確認（オプション）
docker-compose logs -f
```

#### 3. アプリケーションへのアクセス

```
http://localhost:3000
```

---

## 💻 ローカル開発（Docker不使用）

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start

# ブラウザで http://localhost:3000 を開く
```

---

## 使い方

1. **ゲームバージョンを選択**
   - とびだせどうぶつの森（3DS）
   - あつまれどうぶつの森（Switch）

2. **日曜日の買値を入力**
   - ウリから購入した時のカブの価格

3. **月曜午前の売値を入力**
   - タヌキ商店での最初の売値

4. **週間の売値を記録**
   - 月曜午後～土曜午後までの価格を入力

5. **パターンを確認**
   - 自動的にパターンが予想されます
   - 売り時のアドバイスが表示されます

---

## Docker コマンド

```bash
# コンテナの起動
docker-compose up -d

# コンテナの停止
docker-compose down

# コンテナの再起動
docker-compose restart

# ログの確認
docker-compose logs -f

# コンテナに入る
docker-compose exec turnip-app sh

# 完全にクリーンアップ
docker-compose down -v
```

---

## トラブルシューティング

### GitHub Pagesでページが表示されない

1. リポジトリの Settings → Pages で `gh-pages` ブランチが選択されているか確認
2. Actions タブでワークフローが成功しているか確認
3. `package.json` の `homepage` URLが正しいか確認

### ポート3000が既に使用されている場合

`docker-compose.yml` の `ports` セクションを変更：

```yaml
ports:
  - "3001:3000"  # 左側の数字を変更
```

### パッケージのインストールエラー

```bash
# コンテナを停止
docker-compose down

# イメージを再ビルド
docker-compose build --no-cache

# 再起動
docker-compose up -d
```

---

## 📊 対応パターン

### とびだせどうぶつの森
- 波型
- ジリ貧型
- 3期型
- 4期型

### あつまれどうぶつの森
- 通常型
- 減少型
- 跳ね小型
- 跳ね大型

---

## ライセンス

MIT License