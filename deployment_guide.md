# Bear-MK94さん用 デプロイ手順

## 🚀 GitHub Pagesで公開する手順

### 1. GitHubリポジトリの作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名: `turnip-predictor`
4. Publicを選択
5. 「Create repository」をクリック

### 2. ローカルでGitの設定

プロジェクトフォルダで以下のコマンドを実行：

```bash
# Gitの初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: カブ価格予想ツール"

# メインブランチに変更
git branch -M main

# リモートリポジトリを追加
git remote add origin https://github.com/Bear-MK94/turnip-predictor.git

# プッシュ
git push -u origin main
```

### 3. GitHub Pagesの設定

1. GitHubリポジトリページ（https://github.com/Bear-MK94/turnip-predictor）を開く
2. **Settings**タブをクリック
3. 左メニューから**Pages**をクリック
4. **Source**で「Deploy from a branch」を選択
5. **Branch**で`gh-pages`を選択し、`/ (root)`を選択
6. **Save**をクリック

### 4. 自動デプロイの確認

1. リポジトリの**Actions**タブをクリック
2. 「Deploy to GitHub Pages」ワークフローが実行中/完了しているか確認
3. 緑のチェックマークが表示されたら成功！

### 5. 公開URLにアクセス

数分後、以下のURLでアクセス可能になります：

```
https://Bear-MK94.github.io/turnip-predictor
```

---

## 🔄 更新する場合

コードを修正したら、以下のコマンドでプッシュするだけで自動デプロイされます：

```bash
git add .
git commit -m "更新内容の説明"
git push
```

---

## 🎯 Vercelで公開する場合（さらに簡単）

### 1. Vercelにサインアップ

1. [Vercel](https://vercel.com)にアクセス
2. 「Sign Up」→「Continue with GitHub」でログイン

### 2. プロジェクトをインポート

1. 「Add New」→「Project」をクリック
2. GitHubリポジトリから`turnip-predictor`を選択
3. 「Import」をクリック
4. そのまま「Deploy」をクリック

### 3. 完了！

デプロイが完了すると、以下のようなURLが自動生成されます：
```
https://turnip-predictor-bear-mk94.vercel.app
```

---

## 📱 どちらがおすすめ？

### GitHub Pages
- ✅ 設定が簡単
- ✅ GitHubアカウントだけでOK
- URL: `https://Bear-MK94.github.io/turnip-predictor`

### Vercel
- ✅ 最も簡単（3クリックで完了）
- ✅ 自動デプロイが超高速
- ✅ プレビュー機能が便利
- URL: `https://turnip-predictor.vercel.app`（短い）

**初心者の方にはVercelがおすすめです！**

---

## ❓ トラブルシューティング

### GitHub Pagesでページが表示されない

**チェックポイント：**
1. Settings → Pages で `gh-pages` ブランチが選択されているか
2. Actions タブでワークフローが成功（緑のチェック）しているか
3. 10分ほど待ってから再度アクセスしてみる

### Actionsワークフローが失敗する

**対処法：**
1. Settings → Actions → General に移動
2. 「Workflow permissions」を「Read and write permissions」に変更
3. Save して再度プッシュ

### ローカルで動作確認したい

```bash
npm install
npm start
```

ブラウザで `http://localhost:3000` を開く

---

## 📞 サポート

問題が発生したら、以下を確認してください：
1. package.json の homepage URLが正しいか
2. すべてのファイルが正しく配置されているか
3. GitHub Actions が有効になっているか

成功を祈っています！🎉