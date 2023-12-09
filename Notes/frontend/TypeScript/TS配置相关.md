# Type Script是什么?
以JS为基础构建的语言, 是一个js的超集 可以在任何支持js的平台中执行

由动态的js语言变成了静态的js语言, 扩展了js并添加了类型 TS不能被JS解析器直接执行, 要编译后才能通过js执行

<br>

### 资料:  
```
https://mp.weixin.qq.com/s/NpDAZb07x9nlThf_Ow3Ddw
```

<br>

### 安装Ts编译器  
将我们的ts文件转换为js文件, 输入命令 tsc 看看安装成功没
```s
npm i typescript -g
```

<br>

### 通过 ``tsc .ts文件`` 编译  
在.ts文件的目录下, 同目录下会出现js文件
```s
tsc 文件名.ts

# 监听文件内容的变化 实时编译 跟nodemon 像不像
tsc --watch 文件名
tsc app.ts -w
```

<br>

### 编译 / 监听 所有文件  
先在项目中创建 tsconfig.json 文件 

ts编译的配置文件 里面留个 { ... } 啥也不写都行 但是编译文件必须要有这个 ``tsconfig.json``

<br>

执行命令, 编译该目录下的所有ts文件, 或者监听所有的ts文件
```s
tsc / tsc -w
```

<br>
  
**自动编译的方式2:**  
```
在vscode上点击 -- 终端 -- 点击运行任务 -- 选择typescript -- 监视
```

<br>

### tsc -v  
查看版本

<br><br>

## tsconfig.json 配置  
这是ts编译器的配置文件, ts编译器可以根据它的信息来对代码进行编译

```
tsc --init
```

该配置文件还可以通过 tsc --init 来生成 该命令创建的配置文件 会有各种被注释掉的配置信息

```
"include": ["./src/**/*"] 
```



```json
{
// src文件夹下的任意目录任意文件
"include": ["./src/**/*"],
/* 
include 包含 指定要编译的文件:
include 的值是一个数组, 数据里面放需要编译ts文件的路径

我们直接执行tsc命令 编译的是所有ts文件 在开发中并不是所有的ts文件都需要编译

include用来指定哪些ts文件需要被编译
*/


"exclude": ["./src/hello/**/*"]
/* 
exclude 定义需要排除在外的目录:
exclude 的值是一个数组, 数据里面放不需要编译ts文件的路径

src下的hello文件夹里面的ts文件不需要被编译

有一些文件我们是不希望被编译的 必须我们的项目里会有一些我们下载的模块node_module这些模块是不需要被编译的

默认值:
["node_modules", "bower_components", "jspm_packages"]
不写exclude也会排除上面的文件夹
*/


"extends": "继承配置文件的目录"
/* 
当配置文件特别的复杂 并不想重复写的时候 比如我想把xxx.json放在tsconfig.json里面 还不想自己写 就可以写这个属性
*/


"files": ["core.ts"]
/*  
include是可以文件夹设置的
files是直接给指定文件设置

也就是说 只编译 core.ts 文件
*/

"compilerOptions": {
  
  // target 用来指定ts被编译为的ES版本
  "target": "ES3",

  // 我们写的代码编译完成后 到了js那边 js那边使用什么样的标准
  "module": "CommonJS | ES6",

  // lib用来指定项目中要使用的库
  "lib": ['示例:dom'],

  // 指定编译后文件所在的目录
  "outDir": "./dist",

  // 将代码合并成一个文件, 将编译后的文件合并到app.js文件中
  "outFile": "./dist/app.js",

  // 指定代码的根目录
  "rootDir": "./src",

  // 是否对js文件编译 默认是false
  "allowJs": true / false,

  // 使用ts的规范检查js代码是否符合ts的语法规范 默认值是false;
  "checkJs":true,

  // 默认值为false, 意味着我们在ts中写的注释也会被编译到js文件中
  "removeComments": true / false,

  // 不对代码进行编译
  "noEmit": true / false,

  // 当有错误的时候就不生成编译文件 默认值为false
  "noEmitError": true / false,

  // 用来设置编译后的文件是否使用严格模式 默认值为false
  "alwaysStrict": true / false,

  // 是否不允许隐式的any类型 默认值为false
  "noImplicitAny": true / false,

  // 不允许不明确类型的this
  "noImplicitThis": true / false,

  "strictNullChecks" : true / false,

  // 编译结果中不包含 use strict 编译模式为commonjs的话 会在编译结果中加上 use strict 没必要
  "noImplicitUseStrict": true,

  // 使用 es6 模块化的标准 和 commonjs 模块化标准进行交互, 也就是说我们可以使用import语法导入commonjs module.exports 暴露出来的东西
  "esModuleInterop": true,
}
```

<br>

### compilerOptions 配置项:  
编译器的选项, 它决定了编译器如何对ts文件进行编译, 它里面有很多的子选项

下面的可选值都是小写:

<br>

**target:**   
可选值:    
ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

<br>

**module:**  
js最开始没有模块化的概念, 但慢慢的有很多的模块化的概念

可选值:  
CommonJS、UMD、AMD、System、ES2020、ESNext、None

<br>

**lib:**  
在前端运行的话 是没必要改lib的库 

比如我们操作的DOM DOM就是一个库 这个lib里指定上我们使用的库 然后ts就会按照有的库对我们的文件进行提示和检查

我们可以写个错了 看提示 会看到默认值

<br>

**outFile:**
  将多个ts文件, 编译成一个js文件
  设置outFile以后, 所有的全局作用域中的代码会合并到同一个文件中
  用了模块化的文件 模块化规范必须是 amd或者system 否则合并不了

<br>

**rootDir:**  
指定代码的根目录

默认情况下编译后文件的目录结构会以最长的公共目录为根目录, 通过rootDir可以手动指定根目录

<br>

**allowJs:**  
是否对js文件编译 默认是false

有的时候我们需要使用模块 这个模块是js写的 但是js如果不编译过去的话 是不正常的 这个时候我们就把这个属性改为true

<br>

**checkJs:**  
使用ts的规范检查js代码是否符合ts的语法规范 默认值是false;

但是也不是绝对的 有的时候我们引入的模块就是不符合ts的语法, 这种情况下我们就需要把这个关上

<br>

**注意: allowJs  checkJs 要么都用要么都不用**  

<br>

**removeComments:**  
是否删除注释  默认值: false

我们在编译ts文件的时候, ts里面的注释会原封不动的拿到js文件里面  
如果不希望编译过去 我们可以改为true

<br>

**noEmit:**  
不对代码进行编译  默认值: false

比如有的时候 我们使用ts的编译功能只想检查下语法 我们就可以使用这个功能

<br>

**noEmitOnError:**  
当有错误的时候就不生成编译文件 默认值为false

改成true的话, 有错误的话就不会对文件进行编译了

<br>

**alwaysStrict:**  
总是以严格模式对代码进行编译, 严格模式的语法比普通语法要严格一些 性能也会好一些

如果想在我们编译后的js中使用严格模式 就设置这个配置 默认值false  
当js文件中模块代码的时候 默认就在严格模式下了

<br>

**noImplicitAny**  
禁止隐式的any类型, 默认值为false

显示any类型是值 我们自己定义的

``function fn():any {}``

隐式any类型 是我们忘记给变量指定类型的时候就会是隐式的any 如果我们期望ts能为我们检查 有隐式any 我们可以开启这个配置

any是一个类型, 当我们整一个变量不指定类型的时候默认就是any, any一旦设置了后就会关闭ts对这个变量的类型的检查 不推荐使用any 但是并不是绝对不能用

<br>

**noImplicitThis**  
禁止类型不明确的this

``function fn() {console.log(this)}`` 前面我们学过this是跟调用者有关系, 但是这种情况下 我们没办法知道将来谁调用这个函数 也就是说不明确this是谁

如果我们希望ts能帮我们检查这个this 我们就可以开启这个配置 我们可以指定this的类型 ts就不会报错了

``function fn(this:window) {}``

<br>

**strictBindCallApply**  
严格检查bind、call和apply的参数列表

<br>

**strictNullChecks**  
严格的空值检查

```js
let btn = document.querySelector('.btn')
btn.addEventListener('click', function() {
  alert(1)
})

/*
  上面是很简单的一段代码, 但是有的时候 btn 可能获取不到 也就是会是空值 如果我们希望ts能帮我们检查 空值 那就开启这个配置 在ts中我们就要这么写了
*/
if(btn !== 'null') {
  btn.addEventListener('click', function() {
    alert(1)
  })
}

// 还可以使用?运算符 有就执行 没有就不绑定
btn?.addEventListener('click', function() {
  alert(1)
})
```

<br>

**strict**  
所有严格检查的总开关 一般开发建议开启这个

<br>

**strictFunctionTypes**  
严格检查函数的类型

<br>

**strictPropertyInitialization**  
严格检查属性是否初始化

<br>

### 额外检查  

**noFallthroughCasesInSwitch**  
检查switch语句包含正确的break

<br>

**noImplicitReturns**  
检查函数没有隐式的返回值

<br>

**noUnusedLocals**  
检查未使用的局部变量

<br>

**noUnusedParameters**  
检查未使用的参数

<br>

**allowUnreachableCode**  
检查不可达代码

可选值: 
- true, 忽略不可达代码
- false, 不可达代码将引起错误

<br><br>

### webpack 打包ts代码
一般情况下我们在开发一个项目都会结合打包工具去使用ts

**1. 生成package.json**  
```
npm init -y
```

<br>

**2. 安装**  
```
npm i -D webpack webpack-cli typescript ts-loader
```

<br>

**3. 跟目录下创建 webpack.config.js 文件**  
```js 
const path = require('path')

// webpack中的所有配置信息都应该写在module.exports中
module.exports = {

  // 指定入口文件 一般会创建src文件夹, 里面定义index.js作为入口文件
  entry:"./src/index.ts",

  // 指定打包文件所在的目录
  output: {

    // 指定打包文件的目录 直接写 './dist' 也可以 下面用path拼接了完整的路径
    path: path.resolve(__dirname, 'dist'),

    // 打包后文件的名字
    filename: "bundle.js",

    // 高版本的webpack放弃了对ie的支持, 所以打包文件的时候创建了使用箭头函数创建了作用域 如果还要支持老版本的ie那么就要告诉webpack我们要支持老版本的 会使用到下面的属性
    // 配置打包的环境 不使用箭头函数
    environment: {
      arrowFunction: false
    }

  },

  // ts是要编译的 编译成js 如何编译呢?
  // 指定webpack打包时要使用的模块(loader)
  module: {
    // 我们的项目里可能有很多的文件需要处理js css less等等

    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件(比如我们要使用ts-loader 但是这个ts-loader对谁生效啊) test的值是正则表达式 通过正则表达式匹配文件的名字
        test: /\.ts$/,

        // 匹配的文件怎么处理啊 跟上面的连起来就是我用ts-loader去处理ts结尾的文件
        use: "ts-loader",

        // 要排除的文件(不编译它) 一般要排除node_module文件夹 也是个正则
        exclude: /node_module/
      }
    ]
  },

  // 用来设置引用模块
  resolve: {
    // 凡是以ts结尾 和 以js结尾的文件都可以当做模块来互相引入
    extensions: ['.ts', '.js']
  }
}
```

<br>

**4. 配置ts的编译规范**  
根目录下创建 tsconfig.json 文件
```js
  // 一般这样就可以
  {
    "compilerOptions": {
      
      "target": "ES2015",
      "module": "ES2015",
      "strict": true
  }
```

<br>

**5. 修改package.json文件中**  
script属性里添加 'build': 'webpack'  
通过 npm run build 指定webpack命令  
```js
"script" : {
  "build" : "webpack"
}
```

<br><br>

# webpack 配置扩展

### 自动创建html文件  
现在是ts已经成功的转换为js文件了但是文件要运行最终还是需要有html文件, 我们也可以手动创建html文件, 但是有点麻烦 一是我要自己创建html文件, 二是当文件改变了比如以后要在html文件引入多个js文件 多个css文件的情况下还需要手动的一个个去改

我们希望html文件是自动被创建的 网页里面引入哪些资源都是根据项目的实际情况自己去做的调整 比如有两个js就引入两个js 有10个就引入10个

要实现上面的操作就要下载一个webpack插件

<br>

**1. 安装**  
```
npm i -D html-webpack-plugin
```
帮我们自动的生成html文件, 并且引入相关的资源

<br>

**2. 在webpack.config.js中引入下载好的html-webpack-plugin**  
```js 
const HTMLWebpackPlugin = require('html-webpack-plugin')
```

<br>

**3. 在webpack.config.js中配置**  
在外层结构的最后面添加
```js
plugins: [

  // 对生成的html文件进行配置的情况下, 在括号中传入对象
  new HTMLWebpackPlugin({
    title: 'hello, Ts',

    // 根据模板创建html文件
    template: './src/index.html',

    // 不设置这个属性的话 默认值会是 defer script标签内会有defer
    scriptLoading: 'blocking',

    // true || ‘head’ || ‘body’ || false  引入资源的位置 在底部还是头部(true | body)
    inject: 'head'
  }),
]
```

配置完后 输入命令 npm run build 就会在dist文件夹下出现 index.html文件

<br>

### 添加webpack服务器  
```
npm i -D webpack-dev-server
```

装上这个后 可以让项目直接在这个webpack的服务器上运行 这个服务器跟webpack之间是关联的它会根据整个项目的改变自动刷新

<br>

**1. 在package.json中 script属性里 添加命令**  
```js 
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack",

  // 启动webpack服务器并用 谷歌浏览器打开
  "start": "webpack serve --open chrome.exe"
},
```

<br>

**2. 执行 npm start命令**  
启动服务器 我们再在ts文件里做任何的操作都会实时的反馈到页面上

<br><br>

### 清空dist文件夹再编译  
上面是每次在编译文件后 其实是新的文件 覆盖掉 旧的文件
这个插件的作用就是在每次编译前清空dist文件夹

**1. 下载**  
```
npm i -D clean-webpack-plugin
```

<br>

**2. 在webpack.config.js中引入下载好的clean-webpack-plugin**  

<br>

**3. 在webpack.config.js中配置**  
```js 
plugins: [ 
  new CleanWebpackPlugin()
]
```

<br><br>

### babel  
将新语法转换为旧语法 将浏览器中不支持的让它们变的支持

<br>

**1. 下载babel**  
```
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

@babel/preset-env 是运行环境 我们写的代码需要兼容不同的浏览器, 在这里它给我们预置了不同的环境 你是什么环境就转换为什么样的代码

babel-loader 带loader的都是将这个包 和webpack结合在一起的工具  
core-js 让老的浏览器运行新技术

<br>

**2. 在webpack.config.js中进行配置**  
编译过程ts文件会先去找ts loader转换为js js再去找babel转换为浏览器适合的代码
```js 
// ts是要编译的 编译成js 如何编译呢?
// 指定webpack打包时要使用的模块(loader)
module: {
  // 我们的项目里可能有很多的文件需要处理js css less等等

  // 指定要加载的规则
  rules: [
    {
      // test指定规则生效的文件(比如我们要使用ts-loader 但是这个ts-loader对谁生效啊) test的值是正则表达式 通过正则表达式匹配文件的名字
      test: /\.ts$/,

      // 匹配的文件怎么处理啊 跟上面的连起来就是我用ts-loader去处理ts结尾的文件 对这个文件再添加别的加载器 注意是又向左执行
      use: [
        {
          // 指定加载器
          loader:"babel-loader",

          // 设置babel 设置兼容的浏览器
          options: {
            // 设置预定义的环境, 假设我们的代码在哪去运行
            presets:[
              [
                // 指定环境的插件
                "@babel/preset-env",

                // 配置信息
                {
                  // 我的代码要运行在哪个浏览器里啊 里面是浏览器的版本 要兼容的目标浏览器
                  targets: {
                    "chrome":"88",

                    // 如果写了ie肯定会是var 如果没有因为chrome版本高会是const
                    "ie":"11",

                  },
                  // 指定使用哪个版本的corejs
                  "corejs":"3",

                  // 使用corejs的方式 usage表示按需加载
                  "useBuiltIns":"usage"
                }
              ]
            ]
          }
        }, 
        "ts-loader"
      ],

      // 要排除的文件(不编译它) 一般要排除node_module文件夹 也是个正则
      exclude: /node_module/
    }
  ]
},
```