### Eslint的作用
它是在我们的代码在运行前 检查语法错误和潜在的bug, 目标是保证团队代码的一致性和避免错误

<br>

### Prettier的作用
它是代码格式化工具, 用于检测代码中的格式问题, 比如代码的长度 tab长度, 空格 逗号等

<br>

### 区别:
eslint偏向于把控项目的代码质量 而Prettier更偏向于统一项目的编码风格

<br><br>

### 初始化 Vite 项目
node的版本要求14+ 或 16+

```s
# 问答式 框架搭建方式
npm create vite@latest

# 20231017创建的ts版本为5.0.2
npm create vite@latest 项目名 --template vue-ts
```

<br><br>

### 安装 eslint 的相关依赖

```s
npm install
  eslint
  eslint-plugin-vue
  eslint-config-prettier
  prettier
  eslint-plugin-import
  eslint-plugin-prettier
  # 还有什么规范?
  eslint-config-airbnb-base -D

npm install eslint eslint-plugin-vue eslint-config-prettier prettier eslint-plugin-import eslint-plugin-prettier eslint-config-airbnb-base -D
```

- eslint: eslint的核心代码库
- prettier: prettier格式化代码的核心库
- eslint-config-airbnb-base: airbnb的代码规范(依赖plugin-import)
- eslint-config-prettier: eslint结合prettier的格式化
- eslint-plugin-vue: eslint在vue里的代码规范
- eslint-plugin-import: 项目里面支持eslint
- eslint-plugin-prettier: 将prettier结合进eslint的插件

<br>

**扩展:StandardJS 和 AirbnbJs**  
- 如果你需要更多的灵活性，并且你的项目需要一个详尽的规范来指导开发，那么Airbnb规范可能更适合你。

- 如果你喜欢简单和一致性，并且你的团队更注重快速开发和代码的可读性，那么StandardJS规范可能更适合你。

<br><br>

### 初始化 eslint
```s
npx eslint --init
```

它是一个交互式的命令, 问答结束后会根据我们选择的内容 创建 .eslintrc.cjs 文件, 下面我们将老师的选项填在下面
- to check syntax and find problems (2) - 选择第2项 
- commonJs
- ts
- browser + node
- javascript

<br>

**eslintrc配置文件:**
```js
module.exports = {
  // 环境: 浏览器 最新es语法 node
  env: {
    broswer: true,
    es2021: true,
    node: true
  },
  /*
    扩展eslint规范语法, 可以被继承的规则
    字符串数组, 从右向左, 每个配置会继承他前面的配置
    eslint-config- 这个部门可以省略
  */
  extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb', 'prettier'],
  // eslint会对我们的代码进行校验, 而parse的作用是将我们写的代码转换为 estree eslint会对estree进行校验
  parser: 'vue-eslint-parser',
  // 解析器的配置项
  parserOptions: {
    // es的版本好 或年份都可以
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    // 源码类型 默认是script es模块使用module
    sourceType: 'module',
    // 额外的语言类型
    ecmaFeatures: {
      tsx: true,
      jsx: true
    },
    // 全局自定义的宏, 这样在源文件中使用全局变量就不用回报错或警告
    globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },
    // 插件:
    // eslint-plugin-vue 我们省略了前缀, 它提供了parser和rules
    plugins; ['vue', '@typescript-eslint'],
    settings: {
      // 设置项目内的别名
      'import/resolver': {
        alias: {
          map: [['@', './src']]
        }
      },
      // 允许的扩展名
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs']
    },
    // 自定义规则, 覆盖上面extends继承的第三方库的规则, 根据组内成员灵活定义
    rules: {
      'import/no-extraneous-dependencies': 0,
      'no-param-reassign': 0,
      'vue-multi-word-component-names': 0,
      'vue/attribute-hyphenation': 0,
      'vue-v-on-event-hyphenation': 0
    }
  }
}
```

<br>

**安装eslintrc所需要的额外依赖:**  
上面的 eslintrc 配置文件中需要使用了一些额外的依赖 这里我们安装下
```s
npm install 
  typescript
  @typescript-eslint/parser
  @typescript-eslint/eslint-plugin
  eslint-import-resolver-alias
  @types/eslint
  @types/node -D

npm install typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-alias @types/eslint @types/node -D
```

- typescript
- @typescript-eslint/parser: eslint的解析器 用于解析ts 从而检查和规范ts代码
- @typescript-eslint/eslint-plugin: eslint插件, 包含了各类定义好的检测ts的代码规范
- eslint-import-resolver-alias: 让我们使用import的时候 可以使用别名 
- @types/eslint
- @types/node

<br>

**使用 eslint 命令对代码进行检查:**  
```s
eslint \"src/**/*.{js,vue,ts}\" --fix
```  

<br><br>

### node_modules里面找代码规范

**vue3规则:**
```s
/node_module/eslint-plugin-vue/lib/config/
```

该目录下有如下的文件
- base.js
- essential.js
- strongly-recommended.js
- vue3-essential.js
- vue3-recommended.js
- vue3-strongly-recommended.js

这里写的规则, 我们就可以在 eslintrc 配置文件中的 extends 配置项中使用
```js
                      ↓
extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb', 'prettier'],
```

<br>

**airbnb规则:**  
es6的规则
```s
/node_module/eslint-config-airbnb-base/rules/
```

<br>

**prettier规则:**  
```s
/node_module/eslint-config-prettier/
```

- standard.js

<br><br>

### 修改 vite.config.ts 文件
```s
npm i vite-plugin-eslint -D
```

它是vite的一个插件 让项目可以方便的得到eslint的支持, 完成eslint配置后 可以快速的将其集成进vite中 **便于在代码不符合eslint规范的第一时间看到提示**

```js
import eslintPlugin from 'vite-plugin-eslint'

plugins: [vue(), eslintPlugin()]
```

<br><br>

### 根目录添加 .eslintrcignore 文件
```s
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
/.husky
/bin
.eslintrc.js
prettier.config.js
/src/mock/*

# logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.DS_Store
dist-ssr
*.local

/cypress/videos/
/cypress/screenshots/

# editor
.vscode
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

components.d.ts
```

<br><br>

### 根目录添加 .prettierrc.cjs 文件
风格配置文件
```js
module.exports = { 
  // 一行最多100字符
  printWidth: 80,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符, 而使用空格
  useTabs: false,
  // 行位需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的key仅在必要的时候使用引号
  quoteProps: 'as-needed',
  // jsx不使用单引号, 而使用双引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: 'es5',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 箭头函数, 只有一个参数的时候, 也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: infinity,
  // 不需要写文件开头的@prettier
  requirePragma: false,
  // 使用默认的折行标准
  proseWrap: 'always',
  // 根据现实样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 1f
  endOfLine: '1f'
}
```

<br><br>

### 根目录添加 .prettierignore 文件
```s
/dist/*
.local
.output.js
/node_modules/**
src/.DS_Store

**/*.svg
**/*.sh

/public/*
components.d.ts
```

<br><br>

### 修改 vscode 插件 settings.json
![settings](./imgs/eslint02.png)
![settings](./imgs/eslint03.png)
![settings](./imgs/eslint04.png)

<br>

```js
// 保存的时候自动格式化 这句话一定不能加上 不然和prettier冲突
// "editor.formatOnSave": true
// "editor.defaultFormatter": "esbenp.prettier-vscode"
// 代码在保存的时候 开启自动根据eslint修复
"editor.codeActionsOnSave": {
  "source.fixAll": true,
  "source.fixAll.eslint": true,
  "source.fixAll.stylelint": true
},
"eslint.format.enable": true,
"[html]": {
  "editor.formatOnSave": true
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.formatOnSave": true
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
  "editor.formatOnSave": true
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.formatOnSave": true
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
  "editor.formatOnSave": true
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[json]": {
  // 保存的时候进行格式化, 使用vscode里面的插件
  "editor.formatOnSave": true
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

<br>

### 利用prettier命令来自动修改样式
使用命令来格式化src下的所有目录
```s
"prettier --config .prettierrc.cjs \"src/**/8.{vue,js,ts}\" --write"
```

<br><br>

### 编辑 tsconfig 文件 
```s
# 官方文档
https://www.typescriptlang.org/zh/docs/
```

![settings](./imgs/eslint05.png)

<br><br><br><br>

# Gwes项目: Vue3 整合 Eslint + Prettier

## vscode 安装 eslint 和 prettier 插件

<br><br>

## vscode settings 设置
```js
"eslint.format.enable": true,
"vetur.format.enable": false,
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[jsonc]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},


// 好用的设置
"editor.codeActionsOnSave": {
  "source.fixAll": true,
  "source.fixAll.eslint": true,
  "source.fixAll.stylelint": true
},
"eslint.format.enable": true,
"[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[json]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

<br><br>

## 根目录添加忽略文件
**根目录添加 .eslintrcignore 文件**
```s
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
/.husky
/bin
.eslintrc.js
prettier.config.js
/src/mock/*

# logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.DS_Store
dist-ssr
*.local

/cypress/videos/
/cypress/screenshots/

# editor
.vscode
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

components.d.ts
```

<br>

**根目录添加 .prettierignore 文件**
```s
/dist/*
.local
.output.js
/node_modules/**
src/.DS_Store

**/*.svg
**/*.sh

/public/*
components.d.ts
```

<br><br>

## Prettier的配置内容

### 根目录添加 .prettierrc.cjs
```js
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true
}
```

<br><br>

## Eslint的配置内容

## 安装插件
eslint中会提供很多的插件, 有些插件是针对html js css进行校验的 有些插件是vue提供的专门针对vue的文件里面的语法进行校验

**这里直接看下面安装的依赖**
```s
# npm i @rushstack/eslint-patch @vue/eslint-config-prettier @vue/eslint-config-standard -D

npm i @rushstack/eslint-patch @vue/eslint-config-prettier @vue/eslint-config-standard-with-typescript @vue/tsconfig -D
```

<br>

### 配置 .eslintrc.cjs

```js
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  root: true,
  extends: [
    // vue语法的eslint插件 对vue进行语法校验的插件
    "plugin:vue/vue3-recommended",
    // 继承vue官方提供的eslint prettier 标准配置
    "@vue/eslint-config-prettier",
    // 继承vue官方提供的eslint标准配置 这个不用了 因为有ts
    "@vue/eslint-config-standard"
  ],
};
```

<br><br>

## 重新安装依赖: 观察 package.json
1. 添加 prettier 命令
2. 添加 eslint 命令
3. 追加下载 关于ts的依赖 npm i 下
  - "@vue/eslint-config-standard-with-typescript": "^8.0.0",
  - "@vue/tsconfig": "^0.4.0",

<br>

**总结: 需要下载的依赖**
```s
npm i @rushstack/eslint-patch @vue/eslint-config-prettier @vue/eslint-config-standard-with-typescript @vue/tsconfig -D

# 备用
npm i @vue/eslint-config-standard-with-typescript @vue/tsconfig -D
```

```js
"scripts": {
  "dev": "vite",
  "build": "vue-tsc && vite build",
  "preview": "vite preview",
  // 自动调整代码风格
  "format": "prettier --write .",
  // eslint检查
  "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
},
"devDependencies": {
    "@rushstack/eslint-patch": "^1.5.1",
    "@vitejs/plugin-vue": "^4.2.3",
    "@vue/eslint-config-prettier": "^8.0.0",

    // 追加依赖: 关于ts的依赖 2个
    // 替换掉了 "@vue/eslint-config-standard"
    "@vue/eslint-config-standard-with-typescript": "^8.0.0",
    "@vue/tsconfig": "^0.4.0",
    
    // 好像下面这个是可以删掉的 因为在 tsconfig 里面集成了
    // "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vue-tsc": "^1.8.5"
  }
```

<br>

### 修改 .eslintrc.cjs 配置文件
```js
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  root: true,
  extends: [
    // vue语法的eslint插件
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-standard-with-typescript"
  ],
};
```

<br><br>

## 修改 tsconfig.json
因为我们下载了 @vue/tsconfig 所以 ts的相关配置 我们就可以不用配置了
```js
{
  "extends": "@vue/tsconfig/tsconfig.dom.json"
}
```

<br><br>

### 修改 vite.config.ts 文件
```s
npm i vite-plugin-eslint -D
```

它是vite的一个插件 让项目可以方便的得到eslint的支持, 完成eslint配置后 可以快速的将其集成进vite中 **便于在代码不符合eslint规范的第一时间看到提示**  

安装了它 我们eslint检查出来的语法错了的话, 会报错

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/**/*.ts', 'src/*.ts', 'src/*.vue']
    })
  ]
})
```

<br>

### 如果报了 eslintPlugin 的声明文件无法找到

**方式1: 不太可取**
1. 去vite-plugin-eslint包下将 index.d.ts 文件拿出来 复制到自己的项目根目录 并改名 ``vite-plugin-eslint.d.ts``
2. 修改 ts.config.json 文件
```js
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  // "compilerOptions": {
  //   // 其他选项...
  //   "declaration": false,
  //   "declarationMap": false
  // },
  "include": ["src", "./src/types"]
}
```

<br>

**方式2: 推荐**  
修改 tsconfig.json 文件, 告诉它从哪找配置文件
```js
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    // 解决: elementPlus 因为ts版本从4 -> 5找不到类型文件的问题 修改为element-plus/global.d.ts
    "types": ["element-plus/global.d.ts"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "vuex": ["./node_modules/vuex/types"],
      // 这里 ↓
      "vite-plugin-eslint": ["./node_modules/vite-plugin-eslint/"]
    }
  }
}
```

### 注意:
我们写的代码
- 如果eslint 检查出来了错误 保存后项目会报错
- 如果ts检查出来了错误, 在开发环境下不会报错, 但是打包的时候会报错

<br>

**package.json 修改 build 的命令:**  
这部分命令使用了 vue-tsc，它是 Vue.js 3.x 的模板编译器，用于编译 Vue 模板文件（.vue 文件）并检查ts的类型

--noEmit 是 TypeScript 的编译器选项，它告诉 TypeScript 不要生成 JavaScript 文件，只进行类型检查。

当类型检查OK之后 再去执行 vite build
```js
// --noEmit: 不生成 JavaScript 文件，只进行类型检查
"build": "vue-tsc --noEmit && vite build",
```

<br>

### package.json
```js
{
  "name": "vue3-eslint-demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.5.1",
    "@vitejs/plugin-vue": "^4.2.3",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-standard-with-typescript": "^8.0.0",
    "@vue/tsconfig": "^0.4.0",
    "vite": "^4.4.5",
    "vite-plugin-eslint": "^1.8.1",
    "vue-tsc": "^1.8.5"
  }
}
```

<br><br>

## 记录: 创建 vue3-ts-elementplus-eslint-prettier 的过程

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
![eslint校验规则](./imgs/eslint校验规则.png)

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
