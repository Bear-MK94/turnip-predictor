# Node.jsのバージョンを固定
FROM node:18.19.0-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonをコピー
COPY package.json ./

# package-lock.jsonがあればコピー（なくてもOK）
COPY package-lock.json* ./

# 依存関係をインストール
# package-lock.jsonがあれば npm ci、なければ npm install
RUN if [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install && npm install -g npm-check-updates; \
    fi

# アプリケーションのソースをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]