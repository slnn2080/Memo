# Eslint

### 官方网站
```s
http://eslint.cn/
```

<br>

### 基本使用使用
```
http://javascript.ruanyifeng.com/tool/lint.html
```
 
<br>

### Eslint的作用:
我们的代码都会提交到github上 但如果团队人员写的代码的风格不统一 就会造成提交 或 下拉的冲突问题, 关键这种冲突问题还不是代码功能上的冲突

所以我们有必要使用 eslint 统一小队的代码书写规范

它会对我们的代码进行校验
1. 语法上的校验
2. 格式上的校验

<br>

### Eslint基本用法
**1. 安装 eslint**  
可以全局安装 或者 局部安装
```js
npm i eslint -D
npm i -g eslint


// 问答式生成eslint配置 效果跟脚手架相同
npx eslint --init
```

<br>

**2. 定义配置文件:**   
在项目根目录下面新建一个.eslintrc 配置文件，里面定义了你的语法规则。

配置文件可以写在很多地方 如package.json里面也可以写配置

- .eslintrc (json格式)
- .eslintrc.json 
- .eslintrc.js  
- package.json
```js
{
  "rules": {
    "indent": 2,
    "no-unused-vars": 2,
    "no-alert": 1
  },
  "env": {
    "browser": true
  }
}
```

<br>

**优先级:**  
```
.eslintrc.js > .eslintrc 
```

.eslintrc.js需要使用 module.exports = { } 的方式去写

<br>

### eslint的检查文件
通过命令行的方式 使用eslint检查指定的文件
```
eslint 文件路径

npx eslint 文件路径
```

如:
```js
scripts: {
  // 会检查src下的所有文件
  "lint": "npx eslint ./src"
}
```

<br>

### eslint修复有问题的文件
通过命令行的方式
```js
eslint 文件路径 --fix

eslint index.js --fix

// 检查所有文件
eslint .

// 指定要检查的文件后缀
eslint --fix --ext .js, .vue src/
```

**注意:**  
只有分号 双引号 格式的问题才会自动修改, 类似其他问题要等我们手动修改

<br>

### vscode eslint插件: eslint随时提示 随时修改
上面的方式中我们完成了 当我们输入 eslint 指令检查某文件的时候 才会提示哪里有问题 这样不方便

我们期望的是, 我们随时写代码 随时能提醒我们哪个部分有问题

<br>

这就需要vscode中的eslint插件, 当我们安装了vscode的eslint插件后 编辑器就会自动的实时提示我们的代码中哪有问题

<br>

### 修改 vscode settings 配置eslint 自动保存
我们找到setting.json文件 加上如下的代码

这样在自动保存的时候就可以自动修复了
```js
"editor.formatOnType": true,
"editor.formatOnSave": true,
"eslint.codeAction.showDocumentation": {
    "enable": true
},
// 自动保存修复
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
},
"eslint.validate": ["javascript", "javascriptreact", "html", "vue"]
```

<br>

**扩展: .vscode 文件夹:**  
我们在vscode编辑器中找到的setting.json类似于全局配置

我们还可以在项目目录下 创建如下的文件目录
```
| - .vscode
  - setting.json
```

我们在这个setting.json里面写的配置 属于项目级配置 只针对该项目有效

<br>

**注意:**  
如果我们保存文件 文件没有格式化生效 在我们编辑器的右下角有个小铃铛 我们可以点它 点配置 选择 js / ts / html

<br>

### 检查html文件中的js代码:
eslint本身针对这样的需求是无能为力, 只能通扩展其他的插件来实现这样的功能

**下载: eslint-plugin-html**
```
npm i eslint-plugin-html -D
```

<br>

**配置: 插件**  
我们在eslint的配置文件中 plugins 配置项中引入进来
```js
plugins: ["html"]
```

<br>

### eslint配置项：
**root:**  
eslint会找 .eslintrc等配置文件 如果当前文件中没有的话 就会去父级寻找 一直到文件系统的根目录

当我们指定该配置为true的话 就会在当前的文件中找 少了递归的过程
```js
{
  "root": true
}
```

<br>

**env:**   
用于定义你的脚本将要运行在什么环境中
```js
{
  "env": {
    "browser": true,
    "node": true,
    "es2021": true,
    "commonjs": true,
    "jest": true
  }
}
```

<br>

**rules:**  
用于定制规则
- ‘off’ 或 0: 表示 关闭该条规则
- ‘warn’ 或 1: 启用规则，不满足时抛出警告，不会退出编译进程
- ‘error’ 或 2: 启用规则，不满足时抛出错误，会退出编译进程

如果某项规则，有额外的选项，可以通过数组进行传递，数组的第一位必须是错误级别。  
如 ‘semi’: [‘error’, ‘never’], never就是额外的配置项

```js
{
  "rules": {
    "indent": 2,
    "no-unused-vars": 2,
    "no-alert": 1,
    // 不是双引号则 报错
    "quotes": 2,
    // 没有分号则 警告
    "semi": 1
  },
}
```

<br>

**预置规则**  
自己设置所有语法规则，是非常麻烦的。所以，ESLint提供了预设的语法样式，比较常用的Airbnb的语法规则。

由于这个规则集涉及ES6，所以还需要安装Babel插件。

```
npm i -g babel-eslint  eslint-config-airbnb
```

<br>

**extends:**  
对eslint语法上的扩展 

eslint主要是对js文件做检验, 当有vue react的时候 怎么处理? 我们可以使用第三方的插件 来拓展eslint的相关功能

<br>

拓展: 预定义规则 airbnb 规则
```java
{
  "extends": "eslint-config-airbnb"
}
```

我们也可以用自定义的规则 覆盖预设的语法规则
```js
{
  "extends": "eslint-config-airbnb",
  "rules": {
    "no-var": 0,
    "no-alert": 0
  }
}
```

<br>

**plugins:**  
一般是和extends成对儿使用的 配置react插件 有很多的插件
- eslint-plugin-vue
- eslint-plugin-react
- eslint-plugin-pretter

```js
{
  // 我们只写缩写就可以了
  "plugins": "react"
}
```

<br>

**parseOptions:**  
```js
{
  "parseOptions": {
    "sourceType": "module",
    // es的版本
    "ecmaVersion": 2020,
    "ecamaFeatures": {
      jsx: true,
      tsx: true
    }
  }
}
```

<br>

### rules中的配置项:
**indent:**  
缩进为4个空格（默认值）
```
2 or [2, 2] or [2, "tab"]
```

第一个应该是对该功能的开启或关闭, 第二个才是缩进设置的值, 如,缩进为2个空格, 缩进为1个tab键

<br>

**no-unused-vars:**    
不允许声明了变量，却不使用。
```
"no-unused-vars": [2, {
  "vars": "local", 
  "args": "after-used"
}]
```

vars字段表示只检查局部变量, 允许全局变量声明了却不使用

args字段表示函数的参数，只要求使用最后一个参数，前面的参数可以不使用。

<br>

### 配置代码的注释方式:
有时我们可能要在代码中忽略eslint的某种检查，或者加入某种特定检查，此时我们可以用如下的方式

**忽略 no-undef 检查:**  
```
/* eslint-disable no-undef */
```

<br>

**忽略 no-new 检查**  
```
/* eslint-disable no-new */
```

<br>

**设置检查:**
```
/*eslint eqeqeq: off*/ /*eslint eqeqeq: 0*/
```

<br><br>

### eslint rules 比较全的配置
```js
//禁止使用alert confirm prompt
"no-alert": 0,


//禁止使用数组构造器
"no-array-constructor": 2,


//禁止使用按位运算符
"no-bitwise": 0,


//禁止使用arguments.caller或arguments.callee
"no-caller": 1,


//禁止catch子句参数与外部作用域变量同名
"no-catch-shadow": 2,


//禁止给类赋值
"no-class-assign": 2,


//禁止在条件表达式中使用赋值语句
"no-cond-assign": 2,


//禁止使用console
"no-console": 2,


//禁止修改const声明的变量
"no-const-assign": 2,


//禁止在条件中使用常量表达式 if(true) if(1)
"no-constant-condition": 2,


//禁止使用continue
"no-continue": 0,


//禁止在正则表达式中使用控制字符
"no-control-regex": 2,


//禁止使用debugger
"no-debugger": 2,


//不能对var声明的变量使用delete操作符
"no-delete-var": 2,


,//不能使用看起来像除法的正则表达式/=foo/
"no-div-regex": 1


//在创建对象字面量时不允许键重复 {a:1,a:1}
"no-dupe-keys": 2,


//函数参数不能重复
"no-dupe-args": 2,


//switch中的case标签不能重复
"no-duplicate-case": 2,


//如果if语句里面有return,后面不能跟else语句
"no-else-return": 2,


//块语句中的内容不能为空
"no-empty": 2,


//正则表达式中的[]内容不能为空
"no-empty-character-class": 2,


//禁止使用空label
"no-empty-label": 2,


//禁止对null使用==或!=运算符
"no-eq-null": 2,


//禁止使用eval
"no-eval": 1,


//禁止给catch语句中的异常参数赋值
"no-ex-assign": 2,


//禁止扩展native对象
"no-extend-native": 2,


//禁止不必要的函数绑定
"no-extra-bind": 2,


//禁止不必要的bool转换
"no-extra-boolean-cast": 2,


//禁止非必要的括号
"no-extra-parens": 2,


//禁止多余的冒号
"no-extra-semi": 2,


//禁止switch穿透
"no-fallthrough": 1,


//禁止省略浮点数中的0 .5 3.
"no-floating-decimal": 2,


//禁止重复的函数声明
"no-func-assign": 2,


//禁止隐式转换
"no-implicit-coercion": 1,


//禁止使用隐式eval
"no-implied-eval": 2,


//禁止行内备注
"no-inline-comments": 0,


//禁止在块语句中使用声明（变量或函数）
"no-inner-declarations": [2, "functions"],


//禁止无效的正则表达式
"no-invalid-regexp": 2,


//禁止无效的this，只能用在构造器，类，对象字面量
"no-invalid-this": 2,


//不能有不规则的空格
"no-irregular-whitespace": 2,


//禁止使用__iterator__ 属性
"no-iterator": 2,


//label名不能与var声明的变量名相同
"no-label-var": 2,


//禁止标签声明
"no-labels": 2,


//禁止不必要的嵌套块
"no-lone-blocks": 2,


//禁止else语句内只有if语句
"no-lonely-if": 2,


//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
"no-loop-func": 1,


//声明时不能混用声明类型
"no-mixed-requires": [0, false],


//禁止混用tab和空格
"no-mixed-spaces-and-tabs": [2, false],


//换行风格
"linebreak-style": [0, "windows"],


//不能用多余的空格
"no-multi-spaces": 1,


//字符串不能用\换行
"no-multi-str": 2,


//空行最多不能超过2行
"no-multiple-empty-lines": [1, {"max": 2}],


//不能重写native对象
"no-native-reassign": 2,


//in 操作符的左边不能有!
"no-negated-in-lhs": 2,


//禁止使用嵌套的三目运算
"no-nested-ternary": 0,


//禁止在使用new构造一个实例后不赋值
"no-new": 1,


//禁止使用new Function
"no-new-func": 1,


//禁止使用new Object()
"no-new-object": 2,


//禁止使用new require
"no-new-require": 2,


//禁止使用new创建包装实例，new String new Boolean new Number
"no-new-wrappers": 2,


//不能调用内置的全局对象，比如Math() JSON()
"no-obj-calls": 2,


//禁止使用八进制数字
"no-octal": 2,


//禁止使用八进制转义序列
"no-octal-escape": 2,


//禁止给参数重新赋值
"no-param-reassign": 2,


//node中不能使用__dirname或__filename做路径拼接
"no-path-concat": 0,


//禁止使用++，--
"no-plusplus": 0,


//禁止使用process.env
"no-process-env": 0,


//禁止使用process.exit()
"no-process-exit": 0,


//禁止使用__proto__属性
"no-proto": 2,


//禁止重复声明变量
"no-redeclare": 2,


//禁止在正则表达式字面量中使用多个空格 /foo bar/
"no-regex-spaces": 2,


//如果禁用了指定模块，使用就会报错
"no-restricted-modules": 0,


//return 语句中不能有赋值表达式
"no-return-assign": 1,


//禁止使用javascript:void(0)
"no-script-url": 0,


//不能比较自身
"no-self-compare": 2,


//禁止使用逗号运算符
"no-sequences": 0,


//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
"no-shadow": 2,


//严格模式中规定的限制标识符不能作为声明时的变量名使用
"no-shadow-restricted-names": 2,


//函数调用时 函数名与()之间不能有空格
"no-spaced-func": 2,


//禁止稀疏数组， [1,,2]
"no-sparse-arrays": 2,


//nodejs 禁止同步方法
"no-sync": 0,


//禁止使用三目运算符
"no-ternary": 0,


//一行结束后面不要有空格
"no-trailing-spaces": 1,


"no-this-before-super": 0,//在调用super()之前不能使用this或super
//禁止抛出字面量错误 throw "error";
"no-throw-literal": 2,


//不能有未定义的变量
"no-undef": 1,


//变量初始化时不能直接给它赋值为undefined
"no-undef-init": 2,


//不能使用undefined
"no-undefined": 2,


//避免多行表达式
"no-unexpected-multiline": 2,


//标识符不能以_开头或结尾
"no-underscore-dangle": 1,


//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
"no-unneeded-ternary": 2,


//不能有无法执行的代码
"no-unreachable": 2,


//禁止无用的表达式
"no-unused-expressions": 2,


//不能有声明后未被使用的变量或参数
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],


//未定义前不能使用
"no-use-before-define": 2,


//禁止不必要的call和apply
"no-useless-call": 2,


//禁用void操作符
"no-void": 2,


//禁用var，用let和const代替
"no-var": 0,


//不能有警告备注
"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],


//禁用with
"no-with": 2,



//是否允许非空数组里面有多余的空格
"array-bracket-spacing": [2, "never"],


//箭头函数用小括号括起来
"arrow-parens": 0,


//=>的前/后括号
"arrow-spacing": 0,


//在对象中使用getter/setter
"accessor-pairs": 0,


//块语句中使用var
"block-scoped-var": 0,


//大括号风格
"brace-style": [1, "1tbs"],


//避免多次调用回调什么的
"callback-return": 1,


//强制驼峰法命名
"camelcase": 2,


//对象字面量项尾不能有逗号
"comma-dangle": [2, "never"],


//逗号前后的空格
"comma-spacing": 0,


//逗号风格，换行时在行首还是行尾
"comma-style": [2, "last"],


//循环复杂度
"complexity": [0, 11],


//是否允许计算后的键名什么的
"computed-property-spacing": [0, "never"],


//return 后面是否允许省略
"consistent-return": 0,


//this别名
"consistent-this": [2, "that"],


//非派生类不能调用super，派生类必须调用super
"constructor-super": 0,


//必须使用 if(){} 中的{}
"curly": [2, "all"],


//switch语句最后必须有default
"default-case": 2,


//对象访问符的位置，换行的时候在行首还是行尾
"dot-location": 0,


//避免不必要的方括号
"dot-notation": [0, { "allowKeywords": true }],


//文件以单一的换行符结束
"eol-last": 0,


//必须使用全等
"eqeqeq": 2,


//函数表达式必须有名字
"func-names": 0,


//函数风格，规定只能使用函数声明/函数表达式
"func-style": [0, "declaration"],


//生成器函数*的前后空格
"generator-star-spacing": 0,


//for in循环要用if语句过滤
"guard-for-in": 0,


//nodejs 处理错误
"handle-callback-err": 0,


//变量名长度
"id-length": 0,


//缩进风格
"indent": [2, 4],


//声明时必须赋初值
"init-declarations": 0,


//对象字面量中冒号的前后空格
"key-spacing": [0, { "beforeColon": false, "afterColon": true }],


//行前/行后备注
"lines-around-comment": 0,


//嵌套块深度
"max-depth": [0, 4],


//字符串最大长度
"max-len": [0, 80, 4],


//回调嵌套深度
"max-nested-callbacks": [0, 2],


//函数最多只能有3个参数
"max-params": [0, 3],


//函数内最多有几个声明
"max-statements": [0, 10],


//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
"new-cap": 2,


//new时必须加小括号
"new-parens": 2,


//变量声明后是否需要空一行
"newline-after-var": 2,


//大括号内是否允许不必要的空格
"object-curly-spacing": [0, "never"],


//强制对象字面量缩写语法
"object-shorthand": 0,


//连续声明
"one-var": 1,


//赋值运算符 += -=什么的
"operator-assignment": [0, "always"],


//换行时运算符在行尾还是行首
"operator-linebreak": [2, "after"],


//块语句内行首行尾是否要空行
"padded-blocks": 0,


//首选const
"prefer-const": 0,


//首选展开运算
"prefer-spread": 0,


//首选Reflect的方法
"prefer-reflect": 0,


//引号类型 `` "" ''
"quotes": [1, "single"],


//对象字面量中的属性名是否强制双引号
"quote-props":[2, "always"],


//parseInt必须指定第二个参数
"radix": 2,


//命名检测
"id-match": 0,


//生成器函数必须有yield
"require-yield": 0,


//语句强制分号结尾
"semi": [2, "always"],


//分号前后空格
"semi-spacing": [0, {"before": false, "after": true}],


//变量声明时排序
"sort-vars": 0,


//关键字后面是否要空一格
"space-after-keywords": [0, "always"],


//不以新行开始的块{前面要不要有空格
"space-before-blocks": [0, "always"],


//函数定义时括号前面要不要有空格
"space-before-function-paren": [0, "always"],


//小括号里面要不要有空格
"space-in-parens": [0, "never"],


//中缀操作符周围要不要有空格
"space-infix-ops": 0,


//return throw case后面要不要加空格
"space-return-throw-case": 2,


//一元运算符的前/后要不要加空格
"space-unary-ops": [0, { "words": true, "nonwords": false }],


//注释风格要不要有空格什么的
"spaced-comment": 0,


//使用严格模式
"strict": 2,


//禁止比较时使用NaN，只能用isNaN()
"use-isnan": 2,


//jsdoc规则
"valid-jsdoc": 0,


//必须使用合法的typeof的值
"valid-typeof": 2,


//var必须放在作用域顶部
"vars-on-top": 2,


//立即执行函数表达式的小括号风格
"wrap-iife": [2, "inside"],


//正则表达式字面量用小括号包起来
"wrap-regex": 0,


//禁止尤达条件
"yoda": [2, "never"]
```

<br><br>

## Perttier
该包是用来做代码格式化的
- eslint是帮助我们做代码检查 
- prettier是用来做代码的格式化

eslint有局限性 它只能处理js文件, html css这些都处理不了 但是prettier可以

<br>

### 安装 prettier 包
```
npm i prettier -D
```

<br>

### 创建 .prettierrc.js 配置文件
```js
module.exports = {
  semi: false,
  singleQuote: true,
}
``` 

<br>

### 执行 命令 格式化文件  
执行后他可以帮我们将代码进行格式化
```
npx prettier --write 文件路径
```

<br>

### vscode prettier插件: 保存文件自动格式化
安装 Prettier-Code formatter插件


<br>

### 修改 vscode settings 配置prettier 自动保存
```js
 "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```


<br>

### prettier 和 eslint 配置冲突:
1. 包装 prettier 和 eslint 配置一样
2. 在eslint中配置 prettier插件

<br><br>

## eslint插件

### eslint-plugin-prettier 插件
将格式化的功能 和 eslint的功能整合在一起

让eslint既有代码检查的功能 也有代码格式化的功能

<br>

eslint有 extends 和 plugins 两个配置。

plugins要引入对应的插件模块，然后配置相对应的规则rules才会生效。

而extends是已经配置好的规则，后面的extends会覆盖前面的extends。

<br>

### 下载eslint中的依赖
```
npm i 
  eslint 
  prettier
  @vue/eslint-config-prettier
  eslint-config-prettier 
  eslint-plugin-prettier 
  eslint-plugin-vue -D

```

<br>  

**eslint-config-prettier:**  
perttier eslint 对同一个配置其冲突的时候 我们要安装, 该插件就是当两个插件其冲突的时候 我们选择使用哪个
```
eslint-config-prettier
```

该插件的作用:  
禁用eslint中和prettier配置有冲突的规则  
再使用Prettier来代替eslint的格式化功能

把其配置到eslintrc规则的尾部 执行eslint命令的时候 会禁用那些和prettier配置有冲突的规则 以prettier为主

<br>

### 配置 eslint.rc
```js
{
  plugins: [prettier]
  // 使用 eslint 推荐的prettier规则
  "extends": ["eslint:prettier/recommended"]
}


// 网上教程示例配置代码:
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "@vue/prettier", 
    "plugin:vue/vue3-essential", "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "prettier/prettier": "warn",
},
}
```

<br>

### 给vscode添加prettier插件
我们在eslint中添加的 prettier 插件, 是让格式化的动作都交给 prettier, 但是我们并没有安装 prettier 插件 所以我们要在vscode里面安装该插件 然后将格式化的动作交给vscode插件来执行 所以我们要给vscode添加插件

并配置 setting.json

```js
{
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
}



// GWES配置
{
  "security.workspace.trust.untrustedFiles": "open",
  "prettier.useEditorConfig": false,
  "prettier.jsxSingleQuote": true,
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "none",
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "eslint.format.enable": true,
  "vetur.format.enable": false,
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": false
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "explorer.confirmDelete": false,
  "workbench.colorTheme": "Ayu Light",
  "eslint.codeActionsOnSave.rules": null
}

```

<br>

### eslint的相关插件
- "@babel/eslint-parser": "^7.19.1",
- "@vue/cli-plugin-babel": "~5.0.0",
- "@vue/cli-plugin-eslint": "~5.0.0",
- "@vue/eslint-config-standard": "^6.1.0",
- "eslint": "^7.32.0",
- "eslint-plugin-import": "^2.26.0",
- "eslint-plugin-node": "^11.1.0",
- "eslint-plugin-promise": "^5.2.0",
- "eslint-plugin-vue": "^7.20.0"

<br>

### kinto eslint配置文件
```js
{
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "require-jsdoc":"off",
    // タグの最後で改行しないで
    "vue/html-closing-bracket-newline": [2, {"multiline": "never"}],
    // 不要なカッコは消す
    "no-extra-parens": 1,
    // 無駄なスペースは削除
    "no-multi-spaces": 2,
    // 不要な空白行は削除。2行開けてたらエラー
    "no-multiple-empty-lines": [2, {"max": 1}],
    // 関数とカッコはあけない(function hoge() {/** */})
    "func-call-spacing": [2, "never"],
    // true/falseを無駄に使うな
    "no-unneeded-ternary": 2,
    // セミコロンは禁止
    "semi": [2, "never"],
    // 文字列はシングルクオートのみ
    "quotes": [2, "double"],
    // varは禁止
    "no-var": 2,
    // jsのインデントは２
    "indent": [2, 2],
    // かっこの中はスペースなし！違和感
    "space-in-parens": [2, "never"],
    // コンソールは許可
    "no-console": 0,
    // カンマの前後にスペース入れる？
    "comma-spacing": 2,
    // 配列のindexには空白入れるな(hogehoge[ x ])
    "computed-property-spacing": 2,
    // キー
    "key-spacing": 2,
    // キーワードの前後には適切なスペースを
    "keyword-spacing": 2
  },
  "globals": {
    "$": false
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  }
}

```

<br>

## eslint-plugin-vue
目前的pritter对vue3的支持度不是很理想，很多vue3的新特性还不支持，目前pritter官网上也没有给出解决方案， 所以只能自己使用eslint来配置vue3的代码校验

<br>

### 官网:
```s
https://eslint.vuejs.org/rules/
```

<br>

### 配置 eslint
重点是配置是 plugin:vue/vue3-recommended, rules中的内容是在vue3-recommended的配置基础上，额外自定义的配置， 具体的参数配置可根据自己的项目实际情况进行相关的配置

```js
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      //标签超出5个属性就会换行
      singleline: 5 
    }],

    // setup 语法糖校验
    'vue/script-setup-uses-vars': 'error', 
    'object-curly-spacing': ['error', 'always'], // 对象前后要加空格 { a: 1 }
    // 'array-bracket-spacing': ['error', 'always'], // 数组前后要加空格 [ 1, 2 ]
    'array-bracket-newline': ['error', { "minItems": 5}], // 数组超过五个值可以换行
    'arrow-spacing': "error", //箭头函数前后加空格 () => {}
    // 'vue/no-unsupported-features': ['error', { // 校验不支持的特性
    //   'version': "^3.0.0",
    //   'ignores': [],
    // }]
    'vue/block-tag-newline': ['error', { //  标签直接的换行规范
      "singleline": "always",
      "multiline": "always",
      "maxEmptyLines": 0,
      "blocks": {
        "script": {
          "singleline": "always",
          "multiline": "always",
          "maxEmptyLines": 0,
        },
        "template": {
          "singleline": "always",
          "multiline": "always",
          "maxEmptyLines": 0,
        },
        "my-block": {
          "singleline": "always",
          "multiline": "always",
          "maxEmptyLines": 0,
        }
      }
    }],
    // 'vue/no-unused-properties': ['error', { // 未使用的props， 数据， 和方法
    //   "groups": ['props', 'data', 'methods']
    // }],
  }
}
```

<br><br>

### 自己做的实现: 使用 eslint 检查Vue2 -> Vue3 的兼容性

**.eslintrc.js配置文件:**  
注意 parse配置项

**安装的插件有:**  
- "eslint": "^8.33.0",
- "eslint-plugin-vue": "^9.9.0"
- "vue-eslint-parser": "^9.1.0"

```js
{
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended"
  ],
  "parser": "vue-eslint-parser",
  // "parserOptions": {
  //   "parser": "vue-eslint-parser"
  // },
  "rules": {
    "indent": 2,
    "no-unused-vars": 2,
    "no-alert": 1,
    "quotes": 2,
    "semi": 1
  }
}
```

<br><br>

### GWES: 使用 eslint 检查Vue2 -> Vue3 的兼容性
**.eslintrc.js配置文件:**  
```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/no-mutating-props': 'off',
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']
  }
}

```

**安装的插件有:**  
```js
"devDependencies": {
  "@babel/core": "^7.18.6",
  "@babel/eslint-parser": "^7.19.1",

  "eslint": "^7.32.0",
  "eslint-plugin-import": "^2.26.0",
  "eslint-plugin-node": "^11.1.0",
  "eslint-plugin-promise": "^5.2.0",
  "eslint-plugin-vue": "^7.20.0",
  
  "@vue/eslint-config-standard": "^6.1.0",
}
```

1. 安装eslint
```s
npm i -D eslint 
```

2. 初始化 eslint
```s
npx eslint --init 
```

3. 问答式配置eslint 见图01

4. 安装 vite-plugin-eslint
```s
# 说明: 该包是用于配置vite运行的时候自动检测eslint规范 不符合页面会报错
npm add -D vite-plugin-eslint 
```

5. 安装eslint-parser
```s
npm add -D @babel/core 
npm add -D @babel/eslint-parser 
```

6. 配置vite.config.ts
```s
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    })
  ],
  resolve: {
		alias: {
			'@': '/src',
		},
	},
  server: {
    port: 9528
  }
})
```

7. VsCode安装ESLint插件
不需要配置，在项目内如果集成了eslint的npm包，这个插件会根据配置文件，对代码检查问题进行高亮提示（红色波浪线是错误提示，黄色波浪线是警告提示），然后根据弹出框指示修改就可以了。

<br>

1. 安装prettier
```s
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

2. 配置.prettierrc.js
在根目录下面添加.prettierrc.js文件夹，然后将下面的配置添加到其中。

如果不想格式化某些文件可以再添加一个.prettierignore的文件，用法和.gitignore文件差不多，将不需要格式化的文件夹或文件通过正则匹配或者具名的方式添加进去，这样就不会格式化对应的文件了。


<br>

# 安装Vue3

```s
npm create vite@latest
```

<br><br>

# vscode 安装插件: vue volar extension pack

它里面包含了前段的很多实用插件 (其实就是相当于我们自己下的)

- vue language features (volar)
- Prettier - Code formatter
- eslint
- typescript vue plugin (volar)

<br>

- eslint: 偏向代码质量
- prettier: 偏向代码风格

<br><br>

# package.json
原始的package.json
```js
{
  "name": "vite-eslint-demo",
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
    // 将vue文件编译成浏览器可以读懂的文件
    "@vitejs/plugin-vue": "^4.2.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vue-tsc": "^1.8.5"
  }
}
```

<br><br>

# vite.config.js
原始的文件
```js
import { defineConfig } from "vite";
// vue的编译插件
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // 使用vue的编译插件 让vue自动识别项目中的.vue文件
  plugins: [vue()],
});
```

<br><br>

# 配置eslint

## 安装插件

eslint中会提供很多的插件, 有些插件是针对html js css进行校验的

有些插件是vue提供的专门针对vue的文件里面的语法进行校验

```s
npm i 
  @rushstack/eslint-patch
  @vue/eslint-config-prettier
  @vue/eslint-config-standard 
-D


npm i @rushstack/eslint-patch @vue/eslint-config-prettier @vue/eslint-config-standard -D
```

<br>

### eslint-config-standard

该插件中包含了两部分的内容

1. eslint标准校验 (检验 html css js) 的
2. eslint-plugin-vue插件 (vue官方提供的)

通过这个插件我们就不需要写任何的配置文件 该插件帮我们解决好了插件之间的依赖关系 开箱即用

<br>

### @vue/eslint-config-prettier

主要用来做代码风格化的管理, 这是官方提供的 解决了prettier 和 vue之间的冲突

<br>

### @rushstack/eslint-patch

我负责统一自动为我们安装插件, 解决加载时依赖的关系

<br>

### package.json
安装完上面的依赖后的package.json
```js
"devDependencies": {
  "@rushstack/eslint-patch": "^1.5.1",
  "@vitejs/plugin-vue": "^4.2.3",
  "@vue/eslint-config-prettier": "^8.0.0",
  "@vue/eslint-config-standard": "^8.0.1",
  "typescript": "^5.0.2",
  "vite": "^4.4.5",
  "vue-tsc": "^1.8.5"
}
```

<br><br>

## 配置 .eslintrc.cjs

```js
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  root: true,
  extends: [
    // vue语法的eslint插件
    "plugin:vue/vue3-recommended",
    // 继承vue官方提供的eslint prettier 标准配置
    "@vue/eslint-config-prettier",
    // 继承vue官方提供的eslint标准配置 这个不用了 因为有ts
    "@vue/eslint-config-standard"
  ],
};
```

<br>

### package.json
1. 添加 prettier 命令
2. 添加 eslint 命令
3. 追加下载 关于ts的依赖 npm i 下
  - "@vue/eslint-config-standard-with-typescript": "^8.0.0",
  - "@vue/tsconfig": "^0.4.0",

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

    // 关于ts的依赖 2个
    "@vue/eslint-config-standard-with-typescript": "^8.0.0",
    "@vue/tsconfig": "^0.4.0",
    
    // 好像下面这个是可以删掉的 因为在 tsconfig 里面集成了
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vue-tsc": "^1.8.5"
  }
```

<br>

### 修改 tsconfig.json
```js
{
  "extends": "@vue/tsconfig/tsconfig.dom.json"
}
```
