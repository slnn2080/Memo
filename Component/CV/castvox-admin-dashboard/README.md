# front

# prebuild
ビルドする場合は環境変数を使用してください。
`env` ディレクトリに`.env`ファイルがあります。

- localビルド
  `.env.local` になります。

- stagingビルド
  `.env.staging` になります。

- productionビルド
 `.env.production` になります。

# for build production

```bash
npm run generate:production
```

# for build staging

```bash
npm run generate:staging
```


# for build gitlab CI/CD runner

.gitlab-ci.yml を参照ください。
各ステージのログなどはGitlabを参照ください。

# for build ECS

CodeBuild での確認が済んでいないので動くかわかりませんが、下記に用意してあります。
artifactをS3にアップすると思いますので、その想定で記述しております。

ファイルパス  
`./buildspec.yml`

