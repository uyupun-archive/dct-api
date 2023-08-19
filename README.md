# Don't cunning! Think.

## Getting started

### 事前準備

1. node v18.17.1 を有効にします

### 開発環境の立ち上げ

1. リポジトリを clone する
1. `npm install`
1. `npm install -g nodemon`
1. `npm run initialize`
1. `package.json` の `"type": "module",` を一時的に消す
  - migration, seeder がESでないので `type: module` が残っていると実行できない
1. `npm run db:migrate`
1. `npm run db:seed`
1. 上で消した package.json の記述を復元する
1. `npm run dev`

### サンプルリクエスト

- `GET /question` ランダムに問いを取得
    ```bash
    curl --location 'localhost:3000/question' \
    --data ''
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