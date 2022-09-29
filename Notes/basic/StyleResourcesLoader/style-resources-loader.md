### 概述
- 在样式引入时，对于变量的引入，需要在每个文件里都要引入一遍，为了避免每次使用时都需要单独引入一遍的问题，采用了 style-resources-loader。

- 作用:
- 导入css 预处理器的一些公共的样式文件变量，比如：variables , mixins , functions，避免在每个样式文件中手动的@import导入，然后在各个css 文件中直接使用 变量。

- https://github.com/anteriovieira/nuxt-sass-resources-loader
- https://www.cnblogs.com/yixiaoyang-/p/13365469.html?ivk_sa=1024320u
- https://segmentfault.com/a/1190000040394669
- https://blog.csdn.net/u014035151/article/details/90261649

- 使用方法（以less为例）:
- 1. 安装
- 安装方式1:
- 先安装 css 预处理插件 less, less-loader, 然后安装 style-resources-loader ， 再安装 vue-cli-plugin-style-resources-loader。vue 项目中需要 安装 这四个插件。

- 安装方式2:
- 直接使用vue add style-resources-loader安装 ，会提示选择预处理器。

- 具体配置方式:
- https://github.com/yenshih/style-resources-loader

> 在 vue-cli 中的配置
```js
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'less',
      patterns: [
          // 这个是绝对路径,不能使用 alias中配置的别名路径，如@表示的src
          path.resolve(__dirname, './src/style/params.less')
      ]
    }
  },
  ……
  其他配置
  ……
}
```

> 在普通webpack 中的配置, 可以同时使用 多个预处理器。
```js
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'less-loader', 'less-loader', {
        loader: 'style-resources-loader',
        options: {
          patterns: [ // 只有一条时也可以写成对象形式
              path.resolve(__dirname, 'path/to/scss/variables/*.less'),
              path.resolve(__dirname, 'path/to/scss/mixins/*.less'),
          ],
          injector: 'append' // 如果在样式文件之后导入就加此行配置
        }
      }]
    }]
  },
  // ...
}
```

> options选项的参数
patterns：
  字符串或数组，表示导入资源的路径，必须是绝对路径

injector：
  ‘prepend’ 或者 ‘append’， 表示资源导入的位置，在之前还是之后，样式后导入的会覆盖前面导入的
  
resolveUrl： 
  是否允许@import形式导入，默认true
