### Vscode中 怎么配置 debug
- 1. 点击 小臭虫 选择 node.js

- 2. 添加配置 然后把原来的删掉
- 选择 Lauch Profgran 的部分 选择最后一项 add ...

- 3. launch.js
```js
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
      {
          "name": "Launch via NPM",
          "request": "launch",
          "runtimeArgs": [
              "run-script",
              "debug"
          ],
          "runtimeExecutable": "npm",// 通过npm 执行上面脚本：run-script 、 debug
          "skipFiles": [
              "<node_internals>/**"
          ],
          "type": "pwa-node"
      }
  ]
}
```

- 4. 打 debugger 断点 点击Lauch Profgran


### Nuxt中的调试
- nuxt.config.js
```js
// 本代码段使用 TypeScript 写法，JavaScript 类似
extend(config, ctx) {
  // Run ESLint on save
  if (ctx.isDev && ctx.isClient) {
    config.module!.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules)/
    })


    config.devtool = '#source-map' // 添加此行代码
    // 表示在开发模式的 client 端启用 source-map
  }
}

```

### Vue中的调试
- vue.config.js

```js
module.exports = {
  configureWebpack: {
    devtool: "#eval-source-map"
  }
}
```