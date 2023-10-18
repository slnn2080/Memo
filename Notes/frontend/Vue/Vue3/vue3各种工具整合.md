# 初始化项目

### 安装:
```s
# 使用该方式创建的 typescript 是 5.0.2
npm create vite
```

<br>

### 初始化后的package.json
```js
{
  "name": "select-goods-vue3-ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vue-tsc": "^1.8.5"
  }
}
```

<br><br>

## 配置项目

### package.json 配置项目自动打开
```js
"dev": "vite --open"
```

<br><br>

## 配置eslint

**1. 安装eslint**
```js
npm i eslint -D
```

<br>

**2. 生成eslint配置文件 ``.eslint.cjs``**  
告诉eslint应该如何工作
```js
npx eslint --init
```

- 选择第二项: 检查语法并发现错误
- 选择第二项: 选择 import 或者 require (项目中选择的是 import)
- 最后会让我们安装如下的插件
  - @typescript-eslint/eslint-plugin@latest: **检查vue语法的插件**
  - eslint-plugin-vue@latest
  - @typescript-eslint/parser@latest: **ts-eslint的解析器**

<br>

**安装后的package.json**
```js
{
  "name": "select-goods-vue3-ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.8.0",
    "@typescript-eslint/parser": "^6.8.0",
    "@vitejs/plugin-vue": "^4.2.3",
    "eslint": "^8.51.0",
    "eslint-plugin-vue": "^9.17.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vue-tsc": "^1.8.5"
  }
}
```

<br>

**3. 创建``.eslint.cjs``**
1. env配置: eslint工作的环境
2. extends: 继承: 继续现有的语法校验规则
3. overrides:
4. parser:
5. plugins:
6. rules:

```js
// 默认的配置文件 后续会修改 
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    // eslint的全部规则默认是关闭的, 这个配置项开启推荐规则 具体要参考文档, 比如函数名不能重名
    "eslint:recommended",
    // ts的语法规则
    "plugin:@typescript-eslint/recommended",
    // vue3的语法规则
    "plugin:vue/vue3-essential"
  ],
  // 要为特定类型的文件指定处理器, 比如我们要让eslint校验markdown
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    // 校验ecma最新版本
    "ecmaVersion": "latest",
    /*
      eslint检查语法也需要解析器 我们的解析器有3种
      1. Esprima 默认解析器
      2. Babel-ESlint babel解析器
      3. @typescript-eslint/parser ts解析器
    */
    "parser": "@typescript-eslint/parser",
    // 默认设置为 script, 或者指明为 module, 表示代码在ecmascript模块中
    "sourceType": "module"
  },
  // 给eslint这个工具 安装的其他的插件, 写的时候可以省略前缀名 eslint-plugin-
  "plugins": [
    // 检测ts语法的插件
    "@typescript-eslint",
    // 检测vue语法的插件
    "vue"
  ],
  // 具体规则
  "rules": {
  }
}
```

<br>

**4. 安装vue3环境代码校验插件**
```s
npm i -D
  # 让所有与prettier规则存在冲突的eslint rules失效, 并使用prettier进行代码检查
  eslint-config-prettier
  eslint-plugin-import
  eslint-plugin-node
  # 运行更漂亮的eslint 是prettier规则优先级更高 eslint优先级更低
  eslint-plugin-prettier
  # 该解析器允许使用eslint校验所有的babel code
  @babel/eslint-parser

# 单独配置eslint的完整依赖
npm i -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier @babel/eslint-parser

# 基于上面的操作我们这里只需要安装如下的依赖 <- 执行这个
npm i -D eslint-config-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-prettier @babel/eslint-parser
```
```js
"devDependencies": {
  "@babel/eslint-parser": "^7.22.15",
  "@typescript-eslint/eslint-plugin": "^6.8.0",
  "@typescript-eslint/parser": "^6.8.0",
  "@vitejs/plugin-vue": "^4.2.3",
  "eslint": "^8.51.0",
  "eslint-config-prettier": "^9.0.0",
  "eslint-plugin-import": "^2.28.1",
  "eslint-plugin-node": "^11.1.0",
  "eslint-plugin-prettier": "^5.0.1",
  "eslint-plugin-vue": "^9.17.0",
  "typescript": "^5.0.2",
  "vite": "^4.4.5",
  "vue-tsc": "^1.8.5"
}
```

<br>

**4. 配置``.eslint.cjs``**  
**<font color='#C2185B'>注意 extends 位置: ``plugin:prettier/recommended`` 一定要在最后</font>** 
```s
https://blog.csdn.net/sysukehan/article/details/114852151
https://blog.csdn.net/shengjon/article/details/128037668
```
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    // eslint的全部规则默认是关闭的, 这个配置项开启推荐规则 具体要参考文档, 比如函数名不能重名
    'eslint:recommended',
    // vue3的语法规则
    'plugin:vue/vue3-essential',
    // ts的语法规则
    'plugin:@typescript-eslint/recommended',
    // 放在最后
    'plugin:prettier/recommended'
  ],
  // 要为特定类型的文件指定处理器, 比如我们要让eslint校验markdown
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  // 指定如何解析语法
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 校验ecma最新版本
    ecmaVersion: 'latest',
    /*
        eslint检查语法也需要解析器 我们的解析器有3种
        1. Esprima 默认解析器
        2. Babel-ESlint babel解析器
        3. @typescript-eslint/parser ts解析器
      */
    parser: '@typescript-eslint/parser',
    // 默认设置为 script, 或者指明为 module, 表示代码在ecmascript模块中
    sourceType: 'module'
  },
  // 给eslint这个工具 安装的其他的插件, 写的时候可以省略前缀名 eslint-plugin-
  plugins: [
    // 检测vue语法的插件
    'vue',
    // 检测ts语法的插件
    '@typescript-eslint'
  ],
  // 具体规则
  rules: {
    // eslint (https://eslint.bootcss.com/docs/rules/)
    // eslint (https://zh-hans.eslint.org/docs/latest/use/configure/rules/)
    // typescript (https://typescript-eslint.io/rules/)
    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
  }
}

```

**老师的校验规则:**  
```js
rules: {
  // eslint（https://eslint.bootcss.com/docs/rules/）
  'no-var': 'error', // 要求使用 let 或 const 而不是 var
  'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-unexpected-multiline': 'error', // 禁止空余的多行
  'no-useless-escape': 'off', // 禁止不必要的转义字符

  // typeScript (https://typescript-eslint.io/rules)
  '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
  '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
  '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
  '@typescript-eslint/semi': 'off',

  // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
  'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
  'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
  'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
  'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
},
```

<br>

**5. 创建 eslint 忽略文件**
去别的笔记中复制

<br>

**6. 在 package.json 中添加运行脚本**  
```js
"scripts": {
  "dev": "vite --open",
  "build": "vue-tsc && vite build",
  "preview": "vite preview"
  "lint": "eslint src",
  "lint-fix": "eslint src --fix"
},
```

<br>

### 扩展: ts语法报错, 但仍然编译成功: vite-plugin-checker
在一个单纯的vite项目中，vite默认是不会提示ts语法错误并阻断其编译的, 为了严格要求自己，提升代码水平，我们应该让错误输出在控制台阻止编译，强迫我们解决问题

而不是在打包的时候 检查其类型的错误, 这一功能我们可以通过 ``vite-plugin-checker`` 插件来解决

vite-plugin-checker是一个可以在工作线程中运行 TypeScript、 VLS、 vue-tsc、 ESLint的插件，它可以根据配置，阻断编译，在控制台及浏览器展示报错信息。

```s
https://tech99.cn/shot/?uuid=JUE_JIN_6998059092497399845
https://www.cainiaoxueyuan.com/gcs/54326.html
```

<br>

**1. 安装插件:**
```s
npm i vite-plugin-checker -D 
```

<br>

**2. 修改 vite.config.js**
```js
// vite.config.js
import checker from "vite-plugin-checker";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [checker({typescript: true,})],
}); 
```

<br><br>

## 配置 prettier
eslint 和 prettier 这两兄弟一个是保证js代码的质量 一个保证代码的美观

<br>

**1. 安装依赖**  
```s
npm i -D eslint-plugin-prettier prettier eslint-config-prettier

# 安装上面的流程这里我们只需要安装
npm i -D prettier
```

<br>

**安装后的package**
```js
"devDependencies": {
  "@babel/eslint-parser": "^7.22.15",
  "@typescript-eslint/eslint-plugin": "^6.8.0",
  "@typescript-eslint/parser": "^6.8.0",
  "@vitejs/plugin-vue": "^4.2.3",
  "eslint": "^8.51.0",
  "eslint-config-prettier": "^9.0.0",
  "eslint-plugin-import": "^2.28.1",
  "eslint-plugin-node": "^11.1.0",
  "eslint-plugin-prettier": "^5.0.1",
  "eslint-plugin-vue": "^9.17.0",
  "prettier": "^3.0.3",
  "typescript": "^5.0.2",
  "vite": "^4.4.5",
  "vue-tsc": "^1.8.5"
}
```

<br>

**2. 创建 prettierrc.json 配置文件**
```js
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "endOfLine": "auto",
  "tabWidth": 2
}
```

老师的规则:
```js
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

<br>

**测试:**  
我们将代码的格式打乱, 然后执行 ``npm run lint`` 和 ``fix`` 注意这里我们执行的是eslint的命令

<br>

**格式化命令:**  
```js
 "scripts": {
  "dev": "vite --open",
  "build": "vue-tsc && vite build",
  "preview": "vite preview",
  "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\""
},
```

<br><br>

## 配置项目级别的 vscode - eslint - prettier 
1. 在 .vscode 文件中 创建 settings.json
2. 写入下面的内容
```js
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "eslint.format.enable": true,
  "[html]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

<br><br>

## 配置 stylelint
stylelint为css的校验工具, 可以格式化css代码, 检查css 指定css书写顺序等

<br>

**1. 安装依赖**
```s
npm i -D sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss
```

<br>

**2. 创建 .stylelintrc.cjs 配置文件**
```s
https://stylelint.bootcss.com/
```
```js
module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

<br>

**3. 创建 .stylelintignore 忽略文件**
```s
/node_modules/*
/dist/*
/html/*
/public/*
```

<br>

**4. 配置运行脚本**  
当我们想格式化的时候 执行运行 ``format``也就是说 ``prettier`` 可以格式化 js html css 的样式哦
```js
 "scripts": {
  "dev": "vite --open",
  "build": "vue-tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src",
  "fix": "eslint src --fix",
  "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
  "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
  "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
},
```

<br><br>

## 配置 husky 
在上面我们已经集成好了我们的代码校验工具, 但是需要每次手动的去执行命令才会格式化我们的代码

如果有人没有格式化就提交了远程仓库的话, 那么这个规范就没有什么用了, **所以我们需要强制的让开发人员按照代码的规范来提交**

要做到这件事, 需要利用到 husky 在代码提交之前触发 ``git hook`` 然后执行 ``npm run format`` 来自动格式化我们的代码

<br>

### 安装husky
```s
npm i -D husky
```

<br>

### 执行 初始化 husky
执行如下命令后会在根目录下生成个一个 **.husky目录**，在这个目录下面会有一个``pre-commit``文件

**这个文件里面的命令在我们执行commit的时候就会执行**
```s
npx husky-init
```

<br>

### 配置 ``.husky/pre-commit`` 文件
```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npm run format
```

这样当我们对代码进行 commit 的时候, 就会执行该命令, 对代码进行格式化 然后再提交

<br><br>

## 配置 commitlint
**对于我们的commit信息，也是有统一规范的**，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用**commitlint**来实现。

<br>

### 安装依赖
```s
npm i @commitlint/config-conventional @commitlint/cli -D
```

<br>

### 创建配置文件 ``commitlint.config.cjs``
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```

<br>

### 在``package.json``中配置scripts命令
```js
{
"scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  },
}
```

<br>

配置结束，现在当我们填写`commit`信息的时候，前面就需要带着下面的关键字了
```js
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```

<br>

### 配置 husky 
执行下面的命令后 会多出来 commit-msg 文件, 这里就是我们向远程仓库提交的时候会执行这个钩子
```s
npx husky add .husky/commit-msg
```

<br>

在生成的commit-msg文件中添加下面的命令
```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npm commitlint
```

<br>

当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m 'fix: xxx' 符合类型的才可以，**需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的**

<br><br>

## 统一pnpm包管理器工具
团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,

导致项目出现bug问题,因此包管理器工具需要统一管理！！！

<br>

### 在根目录创建`scritps/preinstall.js`文件
```s
# 判断是否使用 pnpm 包管理工具下载的依赖
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```

<br>

### 配置命令
```js
"scripts": {
	"preinstall": "node ./scripts/preinstall.js"
}
```

**当我们使用npm或者yarn来安装包的时候，就会报错了。原理就是在install的时候会触发preinstall（npm提供的生命周期钩子）这个文件里面的代码。**

<br><br>

# 配置项目 src别名
修改 vite.config.ts 和 tsconfig.json 文件
```js
// vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    }
  })
```

```js
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { //路径映射，相对于baseUrl
      "@/*": ["src/*"] 
    }
  }
}
```

<br><br>

# 配置环境变量
项目开发过程中，至少会经历三个阶段
- 开发环境
- 测试环境
- 生产环境(即正式环境)

不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。

于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码

<br>

### 开发环境（development）
顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。

<br>

### 测试环境（testing）
测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试

<br>

### 生产环境（production）
生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)

<br>

### 注意:
一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！

<br>

### 步骤
1. 项目根目录分别添加 开发、生产和测试环境的文件!
```s
.env.development
.env.production
.env.test
```

2. 追加文件内容, **变量必须以 VITE_ 为前缀才能暴露给外部读取**
```s
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '甄选运营平台'
VITE_APP_BASE_API = '/dev-api'
```

```s
NODE_ENV = 'production'
VITE_APP_TITLE = '甄选运营平台'
VITE_APP_BASE_API = '/prod-api'
```

```s
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'test'
VITE_APP_TITLE = '甄选运营平台'
VITE_APP_BASE_API = '/test-api'
```

3. 在 package.json 中配置运行命令
```s
"scripts": {
  "dev": "vite --open",
  "build:test": "vue-tsc && vite build --mode test",
  "build:pro": "vue-tsc && vite build --mode production",
  "preview": "vite preview"
},
``` 

4. 使用配置的环境变量: 通过 ``import.meta.env`` 获取环境变量