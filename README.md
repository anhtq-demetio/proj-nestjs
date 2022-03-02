## 開発手順(ローカル環境の場合)

1.  `.env` ファイルを作成(初回のみ)
    env ファイルを `.env.dev.sample` からコピーする。

        ```
        cp .env.dev.sample .env
        ```

2.  docker コンテナを立ち上げる

    ```
    docker-compose up -d --build
    ```

3.  docker の mysql の設定を修正する(初回のみ)
    root ユーザでログインして develop に権限を付与します

    ```
    $  docker-compose exec skyhub-db  /bin/bash
     root@c0dbd9871b90:/# mysql -u root -p
     Enter password:
     mysql> grant all on *.* to develop;

    ```

4.  マイグレーションを行う

    ※ 初期の段階にマイグレーションファイルを作成してください ([参考資料](https://docs.nestjs.com/recipes/prisma#create-two-database-tables-with-prisma-migrate))

    ```
    yarn migrate
    ```

5.  サーバ（Nest.js）を起動する
    ```
    yarn start:dev
    ```

## その他コマンド

#### docker コンテナを停止する

```
docker-compose down
```

#### データベースを初期化する

```
docker-compose down
rm -rf db
docker-compose up -d
yarn migrate
```
