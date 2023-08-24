# Don't cunning! Think.

## 環境構築

### 事前準備

1. Node.jsのv18.17.1をインストールします
1. 本リポジトリをクローンします

### 開発環境の立ち上げ

```bash
$ cp .env.example .env
$ npm install
$ npm run db:create
```

- `package.json` の `"type": "module",` を一時的に消す
  - これはマイグレーションとシーダーがESMではなく、CommonJSのため

```bash
$ npm run db:migrate
$ npm run db:seed
```

- `package.json` の変更を元に戻す

```bash
$ npm run dev
```

### ローカルサーバーをHTTPS化する

```bash
$ brew install ngrok
```

- https://dashboard.ngrok.com/login にアクセスしてログインする

```bash
$ ngrok config add-authtoken <your authtoken>
$ ngrok http 3000
$ open https://xxxx.ngrok-free.app
# ngrokのダッシュボードの確認
$ open http://127.0.0.1:4040
```

### サンプルリクエスト

- `GET /question` ランダムに問いを取得
    ```bash
    curl --location 'localhost:3000/question'
    ```
    ```json
    {
        "id": 1,
        "question": "人はなぜ争うのか?",
        "createdAt": "2023-08-19T05:12:20.896Z",
        "updatedAt": "2023-08-19T05:12:20.896Z"
    }
    ```

- `POST /answer` 考えた問いを保存
  - サーバーサイドでトークンを付与
    ```bash
    curl --location 'localhost:3000/answer' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --data '{
      "question_id": 1,
      "step_count": 1024,
      "wallet_address": "hoge",
      "answer": "動物としての本能です。"
    }'
    ```
    ```json
      // empty response
    ```

- `POST /cunning` 指定した問いの答えをカンニング
  - クライアント側で支払いが完了した後でリクエスト
    ```bash
    curl --location 'localhost:3000/cunning' \
    --header 'Content-Type: application/json' \
    --data '{
        "question_id": 1
    }'
    ```
    ```json
      {
        "id": 1,
        "questionId": 1,
        "answer": "坊やだからさ",
        "createdAt": "2023-08-19T05:12:20.904Z",
        "updatedAt": "2023-08-19T05:12:20.904Z",
        "Question": {
            "id": 1,
            "question": "人はなぜ争うのか?",
            "createdAt": "2023-08-19T05:12:20.896Z",
            "updatedAt": "2023-08-19T05:12:20.896Z"
        }
    }
    ```
