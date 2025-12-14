.PHONY: help build up down restart logs ps clean rebuild shell install exec test

# デフォルトターゲット
help:
	@echo "=========================================="
	@echo "  カブ価格予想ツール - Make コマンド"
	@echo "=========================================="
	@echo ""
	@echo "基本コマンド:"
	@echo "  make build       - Dockerイメージをビルド"
	@echo "  make up          - コンテナを起動"
	@echo "  make down        - コンテナを停止"
	@echo "  make restart     - コンテナを再起動"
	@echo "  make logs        - ログをリアルタイム表示"
	@echo "  make ps          - コンテナの状態を表示"
	@echo ""
	@echo "開発用コマンド:"
	@echo "  make shell       - コンテナ内のシェルを起動"
	@echo "  make install     - コンテナ内で npm install 実行"
	@echo "  make exec CMD='コマンド' - コンテナ内でコマンド実行"
	@echo "  make test        - テストを実行"
	@echo ""
	@echo "メンテナンスコマンド:"
	@echo "  make clean       - コンテナとボリュームを削除"
	@echo "  make rebuild     - クリーンビルド（完全再構築）"
	@echo "  make prune       - 未使用のDockerリソースを削除"
	@echo ""
	@echo "クイックスタート:"
	@echo "  make build && make up"
	@echo ""

# Dockerイメージをビルド
build:
	@echo "🔨 Dockerイメージをビルド中..."
	docker-compose build

# Dockerイメージをキャッシュなしでビルド
build-no-cache:
	@echo "🔨 Dockerイメージをクリーンビルド中..."
	docker-compose build --no-cache

# コンテナを起動（バックグラウンド）
up:
	@echo "🚀 コンテナを起動中..."
	docker-compose up -d
	@echo "✅ コンテナが起動しました"
	@echo "📱 アプリケーション: http://localhost:3000"
	@echo "📋 ログを確認: make logs"

# コンテナを起動（フォアグラウンド）
up-fg:
	@echo "🚀 コンテナを起動中（フォアグラウンド）..."
	docker-compose up

# コンテナを停止
down:
	@echo "🛑 コンテナを停止中..."
	docker-compose down
	@echo "✅ コンテナを停止しました"

# コンテナを再起動
restart:
	@echo "🔄 コンテナを再起動中..."
	docker-compose restart
	@echo "✅ コンテナを再起動しました"

# ログをリアルタイム表示
logs:
	@echo "📋 ログを表示中 (Ctrl+C で終了)..."
	docker-compose logs -f

# ログの最後の100行を表示
logs-tail:
	@echo "📋 ログの最後の100行を表示..."
	docker-compose logs --tail=100

# コンテナの状態を表示
ps:
	@echo "📊 コンテナの状態:"
	docker-compose ps

# コンテナ内のシェルを起動
shell:
	@echo "🐚 コンテナ内のシェルを起動中..."
	docker-compose exec turnip-app sh

# コンテナ内で npm install を実行
install:
	@echo "📦 依存関係をインストール中..."
	docker-compose exec turnip-app npm install
	@echo "✅ インストール完了"

# コンテナ内でカスタムコマンドを実行
# 使用例: make exec CMD="npm run build"
exec:
	@if [ -z "$(CMD)" ]; then \
		echo "❌ エラー: CMD を指定してください"; \
		echo "使用例: make exec CMD='npm run build'"; \
		exit 1; \
	fi
	docker-compose exec turnip-app $(CMD)

# テストを実行
test:
	@echo "🧪 テストを実行中..."
	docker-compose exec turnip-app npm test

# 本番ビルドを実行
build-prod:
	@echo "🏗️ 本番用ビルドを作成中..."
	docker-compose exec turnip-app npm run build
	@echo "✅ ビルド完了: build/ ディレクトリ"

# コンテナとボリュームを削除
clean:
	@echo "🧹 コンテナとボリュームを削除中..."
	docker-compose down -v
	@echo "✅ クリーンアップ完了"

# イメージも含めて完全削除
clean-all: clean
	@echo "🧹 イメージも削除中..."
	docker rmi turnip-predictor:1.0.0 2>/dev/null || true
	@echo "✅ 完全クリーンアップ完了"

# 完全再構築
rebuild: clean-all
	@echo "🔨 完全再構築中..."
	docker-compose build --no-cache
	@echo "✅ 再構築完了"
	@echo "💡 起動するには: make up"

# 未使用のDockerリソースを削除
prune:
	@echo "🧹 未使用のDockerリソースを削除中..."
	docker system prune -f
	@echo "✅ クリーンアップ完了"

# package-lock.json をコンテナからコピー
copy-lockfile:
	@echo "📄 package-lock.json をコピー中..."
	docker cp turnip-predictor-app:/app/package-lock.json .
	@echo "✅ コピー完了"

# ヘルスチェックの状態を表示
health:
	@echo "🏥 ヘルスチェックの状態:"
	@docker inspect turnip-predictor-app --format='{{.State.Health.Status}}' 2>/dev/null || echo "コンテナが起動していません"

# Node.jsとnpmのバージョンを表示
version:
	@echo "📌 バージョン情報:"
	@echo -n "Node.js: "
	@docker-compose exec turnip-app node -v 2>/dev/null || echo "コンテナが起動していません"
	@echo -n "npm: "
	@docker-compose exec turnip-app npm -v 2>/dev/null || echo "コンテナが起動していません"

# インストール済みパッケージを表示
packages:
	@echo "📦 インストール済みパッケージ:"
	docker-compose exec turnip-app npm list --depth=0

# 開発環境のセットアップ（初回用）
setup: build up
	@echo ""
	@echo "=========================================="
	@echo "  ✅ セットアップ完了！"
	@echo "=========================================="
	@echo ""
	@echo "📱 アプリケーション: http://localhost:3000"
	@echo "📋 ログを確認: make logs"
	@echo "🐚 シェルを起動: make shell"
	@echo ""