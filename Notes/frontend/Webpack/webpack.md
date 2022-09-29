# 技巧
使用 npm 下载资源

1. 下载了 jquery
npm i jquery

2. 引入 
import $ from "jquery"
  
<br>

# 只有index.js文件 可以通过 html-webpacl-plugin 插件直接生成 html 文件
```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "none",
  status: "node",
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```
@

@

<br><br>

# Webpack是什么
webpack是一种前端资源构建工具 一个静态模块打包器 在webpack看来 *前端的所有资源文件都会作为模块处理* 它将根据模块的依赖关系进行静态分析 打包生成对应的静态资源(bundle)

<br>

### 示例:
我们创建了一个 html 页面 当中使用了
1. less
2. import es6的语法

但是上述的东西 浏览器是解析不了的 为了解决上面的需求 我们会维护一个个的小工具 

<br>

### 构建工具的概念:
找一个大的工具 这个大的工具将小的工具的功能都包含进来了 这样我们只需要关心大的工具如何使用就ok了
<!-- 
  它将前端要做的一系列的小操作 把它整合成了一个大的工具 使其一次性的能处理所有的需求 webpack就是构建工具中的一种
 -->


<br>

### 静态模块打包器概念:
我们在开发vue react的时候 喜欢在main.js文件中 引入所有的资源 引入的资源都需要交给构建工具去处理

入口文件中 引入各种资源
```js
  // 引入js资源
  import $ from "jquery"

  // 引入样式资源
  import "./index.less"

  // 引入 图片 字体 等其他的资源

  ...

```

<br>

### 那webpack怎么处理呢？ 指定入口文件
1. 我们要告诉webpack打包的起点, 也就是入口文件
2. webpack就会根据这个入口文件作为起点开始进行打包 它会将main.js中的每一个依赖记录好 形成一个依赖关系树状结构图
<!-- 
    index.js
    ↙     ↘
  jQ      Less

       ↓

     chunk  --  将上面的依赖的文件提取出来形成一个代码块

       ↓    --  对代码块进行处理 形成 bundle

     boudle
 -->

然后它会根据这个树状的结构图中的先后顺序 依次将资源引入进来形成一个chunk(代码块) 然后再对这个代码块进行各项的处理 
比如将less编译为css js资源编译成浏览器可以识别的语法等 这些操作统一的概括一下 这个处理的过程 就可以称之为打包 将打包好的资源输出出去(输出出去的东西叫做bundle)
<!-- 
  将代码都引进来形成一个代码块 加工代码块 形成一个bundle
 -->

<br><br>

# webpack的五个核心概念
这5个核心的概念也是我们要在 webpack.config.js 中的5个属性(配置项)

**<font color="#C2185B">1. entry</font>**  
指示webpack从哪个文件作为入口起点开始打包 分析构建内部依赖图

**<font color="#C2185B">2. output</font>**  
指示webpack打包后的资源 bundles 输出到哪里去 以及如何命名

**<font color="#C2185B">3. module (翻译官) 用于配置Loader</font>**  
loader让webpack能够去处理那些非js文件(webpack自身只理解js)
<!-- 
  webpack只认识js 那么它在处理css和图片等资源的时候 就处理不了 会报错 
  所以要借助loader将它们转化为webpack能看懂的东西 这样webpack才能处理这些资源
 -->

**<font color="#C2185B">4. plugins</font>**  
用于执行范围更广的任务 插件的范围包括 从打包优化和压缩一直到重新定义环境中的变量等
<!-- 
  上述的loader只能翻译一下 如果还想做些功能更加强大的事儿 还要借助与 plugins
  它也是配合webpack 让webpack能够认识更多的东西 让webpack可以对其打包处理 通过安装插件的方式
 -->

**<font color="#C2185B">5. mode</font>**  
webpack使用相应模式的配置 内置的两种模式 

**<font color="#C2185B">development(开发模式)</font>**  
描述:
会将 process.env.NODE_ENV的值设为 development
在开发模式中会自动的启用 NamedChunksPlugin 和 NamedModulesPlugin 

特点:
能让代码本地调试运行的环境


**<font color="#C2185B">production(生产模式)</font>**  
描述:
会将 process.env.NODE_ENV的值设为 production
在生产模式中会自动的启用 
  FlagDependencyUsagePlugin
  FlagIncludedChunksPlugin
  ModuleConcatenationPlugin
  NoEmitOnErrorsPlugin
  OccurrenceOrderPlugin
  SideEffectsFlagPlugin
  UglifyJsPlugin

特点:
能让代码优化上线运行的环境 考虑优化措施 以及兼容性处理 这时候我们就要写些生产环境的配置 把项目做好


<br>

### 代码展示:
```js
module.exports = {

  entry: "" | [] | {},

  output: {
    
  },

  module: {
    rules: [
      {
       ...
      },
  },

  plugins: [
    
  ],

  mode: ""
}
```

<br><br>

# 开发环境: webpack基础演示
这节我们不通过 配置文件 的方式 输出打包命令

<br>

### webpack --mode="环境" 通过该指令区分 开发环境指令 和 生产环境指令

**<font color="#C2185B">开发环境指令:</font>**  
webpack ./src/index.js -o ./build/build.js --mode=development

**<font color="#C2185B">格式:</font>**  
webpack指令 + 要加工的文件(入口文件开始打包) -o 将以加工的文件输出到 + 目标目录路径

**<font color="#C2185B">解析:</font>**  
<br><br>mode参数:
用来指定打包环境

<br><br>mode=development 会只用开发环境去打包

*在根目录下执行上面的命令*


**<font color="#C2185B">生产环境指令:</font>**  
webpack ./src/index.js -o ./build/build.js --mode=production
<!-- 
  生产环境会压缩我们的js代码
 -->


<br>

### webpack使用:
**<font color="#C2185B">1. 全局安装</font>**  
npm i webpack webpack-cli -g
我们先进行全局安装
<!-- 
  webpack-cli 可以让大家可以通过指令去使用webpack的功能

  最新的版本是
  webpack: 5.72.1
  webpack-cli: 4.9.2

  老师的版本是 
  webpack: 4.41.6
  webpack-cli: 3.3.11
 -->

 
**<font color="#C2185B">2. 局部安装(项目内安装)</font>**  
npm i webpack webpack-cli -D
```js
"webpack": "^4.41.6",
"webpack-cli": "^3.3.11"
```


**<font color="#C2185B">3. 准备工作: 整理一个项目的结构</font>**  
  | - src       (源代码目录)
    - index.js  (入口起点文件)
  | - build     (webpack处理后输出的目录)


<br>

### 验证: webpack可以处理 js 文件
**<font color="#C2185B">终端的结果:</font>**  

**<font color="#C2185B">Hash:</font>**  
每次打包的时候 webpack会针对这次打包结果 生成一个唯一的hash 相当于id
将来我们可以利用它作为文件名的一个部分

```js
webpack ./src/index.js -
o ./build/build.js --mode=development

// 输出结果
Hash: 68a1b2f62d3d5b90678c
Version: webpack 4.41.6
Time: 21ms
Built at: 2022/05/14 上午12:06:02

   Asset      Size  Chunks             Chunk Names
build.js  3.84 KiB    main  [emitted]  main
```


<br>

### build.js 里面的结果:
我们能看到 es6 语法并没有进行转换 直接打包js文件是为了让js文件中的代码 让浏览器认识为主
```js
/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let add = (x, y) => {\n  return x + y\n}\n\nconsole.log(add(1, 2))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })
```

我们还可以通过 node命令来执行下打包后的js文件 node ./build.js


<br>

### 总结:
1. webpack能处理 js/json 资源
<!-- 
  我们发现 es6的语法并没有被转 也就是说仅仅是打包了
  疑问: 那既然没转 打包是干嘛用的

  解答: js文件中 有 import等语法 正常浏览器是不认的 但是 打包后 浏览器可以识别了
 -->

2. json文件不用显示暴露 默认就暴露了 所以可以直接import
<!-- 
  improt data from "./src/data.json"
 -->

3. webpack不能处理css文件 img文件
4. 我们的代码被包含在 eval() 函数里面去了
5. 生产环境和开发环境将*es6模块化*编译成浏览器成识别的模块化

<br><br>

# 开发环境: 打包样式资源
上面我们说到 webpack 只能打包js json资源 这里我们看看webpack怎么打包样式资源

准备工作:
```js
// 入口文件中 引入样式资源
import "./index.css"
...

```

<br>

### Loader的使用
我们前面说过一个概念叫做loader 帮助webpack解析一些它不能识别的模块
当我们配置loader后 loader会自动读取对应的配置文件 


**<font color="#C2185B">配置文件可以写在</font>**  
1. package.json中
2. .xxxrc
3. .xxxrc.js
<!-- 
  写在 js 文件中比较灵活 因为可以写代码来动态的设置值
 -->


**<font color="#C2185B">webpack.config.js</font>**  
webpack的配置文件 一般在项目的跟目录中创建

作用：
指示webpack干哪些活(当运行webpack指令的时候 会加载里面的配置 以里面的配置去干活)

*注意*
*在配置文件中 我们要使用commonjs的语法 require()*
所有的构建工具都是基于nodejs平台运行的 而node的模块化标准采用commonjs
<!-- 
  src: 是项目的源代码
  webpack: 是配置的的代码

  项目代码我们用的是es6 
  配置代码因为基于的node平台所以使用的是commonjs
 -->

webpack.config.js 中配置的形式:
在 配置文件我们 我们要先暴露一个对象 在对象中我们写webpack的配置
```js
module.exports = {
  // webpack的配置
}
```

我们可以在 配置对象中 写webpack的5个核心配置 和 其他的配置项


**<font color="#C2185B">配置项: entry</font>**  
入口起点:
指示webpack以哪个文件为起点 分析文件中的内部依赖图开始打包的

类型: 
String | [字符串数组] | {}

```js
module.exports = {
  entry: "./index.js",
  entry: ["./index.js", "./index.html"],
  entry: {
    build: "./index.js"
  }
}
```

使用 String 的时候 : 
指定的一个入口文件

使用 array 的时候 : 
入口文件写在最后的位置 前面的js文件是引入到入口文件中的js文件
或者说 写在数组中的两个文件 都会成为最终 bundle 的一个部分?
```js
module.exports = {
  entry: ['./polyfill.js', './index.js'],
}
```

使用 object 的时候 :
指定多入口文件的时候使用, key为入口文件的文件名 可以在output中利用[name]的方式输出
  
<br><br> 

**<font color="#C2185B">配置项: output</font>**  
输出到哪里
类型: {}

对象中的属性:
```js
{
  // "build.js"
  filename: "输出到的文件名"

  // resolve(__dirname, "dist")
  path: "一般使用resolve()函数来拼接路径",
  
  // 清理 dist 文件夹中旧文件
  clear: true
}
```

<!-- 
  这里会利用path模块 来拼写绝对路径
  const {resolve} = require("path")
  path: resolve(__dirname, "build")

  __dirname: nodejs的变量 代表当前文件的目录的绝对路径

  比如: 
    | - webpack_local
      - webpack.config.js

  __dirname: 就指 webpack_local 这个文件目录
 -->


**<font color="#C2185B">配置项: module</font>**  
loader的配置
类型: {}

对象中的属性值:
rules: []

数组中写loader的详细配置 每一个loader都是一个对象
```js
module: {
  rules: [
    // 写详细的loader配置
    {
      test: 正则,
      use: [] | loader: ""
      options: {loader的配置}
    }
  ]
}
```


**<font color="#C2185B">配置项: plugins</font>**  
配置插件 
loader帮webpack做翻译 插件帮助webpack扩展功能

类型: []

数组中写详细的配置
如果是一个插件 那么我们可以直接new 或者写 ""

```js
plugins: [
  // 写详细的插件配置
],
```

<!-- 
  如果插件需要有配置对象 那么plugins数组里面 每一个插件的类型也是一个数组
  [["插件",{插件的配置对象}]]
 -->


**<font color="#C2185B">配置项: mode</font>**  
配置环境
类型: string
值为: development | production 只能写一个
```js
mode: "development | production",
```

<br><br>

<br>

### webpack来处理css样式资源
这里我们需要使用到
  - style-loader
  - css-loader 

位置:
```js
module: {
  rules: [
    {
      ... 位置: 每一个loader配置 都是以一个对象的形式出现
    }
  ]
}
```

loader会去遍历所有的文件 或者说所有文件都会过一遍 rules 中配置的各种loader
当有 test 指定项匹配的文件类型的时候 就会对它*进行use属性中定义的loader来处理文件*

```js
module: {
  rules: [
    {
      // 用来匹配哪些文件 匹配以xxx后缀名结尾的文件 .css
      test: /\.css$/

      // 使用哪些loader来处理文件
      use: [
        "style-loader",
        "css-loader"
      ]
    }
  ]
},
```

<br>

### rules数组中的对象中的属性:

**test** : 对哪些文件进行匹配
值为正则

**use** : 对一个类型的文件使用多个loader的时候用
值为 数组 是要对匹配文件使用多个loader 一个loader就是一个对象

use数组中配置的选项的执行顺序为: 
从右往左(从下到上)
当要对css文件做 兼容的时候 兼容性处理的loader 要写在less-loader的前面 作为倒数第二个位置出现

**loader** : 使用一个loader的时候用
值为 字符串 是只使用一个loader

**options** : loader的配置项
值为 对象


<br>

### 处理样式文件要使用 如下的loader
"style-loader"
"css-loader"

<br>

### css-loader的作用:
将css文件变成commonjs模块加载到js中, 里面的内容是样式的字符串
<!-- 
  可能是在eval()中 我觉得的
 -->

<br>

### style-loader的作用:
创建一个style标签 将js中的样式资源插入进去 添加到head中生效

**注意：**
了解了 两个loader的作用 那么他们的顺序就应该是 先进行css-loader 然后进行 style-loader

style-loader在前 css-loader在后

<br><br>

<br>

### 测试下打包样式资源
**技巧:**
1. node在找包的时候 会先在当前的目录找 如果找不到会向上一级目录找 所以我们可以在根目录中下包 这样内部的文件目录里面都可以用

2. 我们下载的loader看来都是**开发依赖 -D**

3. 我们用的是webpack@4.41.6 webpack-cli@3.3.1 在下载别的loader的时候可能会出现loader的版本可能过高 跟现在的webpack版本不符合的情况 

查看目标loader是否符合项目webpack中的版本:

1. 去github找loader的版本 tags(在分支那)
2. 然后查看 package.json 文件 看看webpack的版本 
3. https://github.com/webpack-contrib/style-loader
<!-- 
  查看webpack工具的版本命令
  - webpack -v
  - webpack-cli -v
 -->



**<font color="#C2185B">1. 下包</font>**  
npm i style-loader css-loader -D
<!-- 
  style-loader: 1.1.3
  css-loader: 3.4.2
 -->

**<font color="#C2185B">2. 终端执行 webpack 指令</font>**  
当我们执行webpack指令之后 就会读取配置文件webpack.config.js的信息 按照配置执行
```js
// 结果
[./node_modules/css-loader/dist/cjs.js!./src/index.css] 329 bytes {main} [built]

[./src/index.css] 561 bytes {main} [built]
[./src/index.js] 58 bytes {main} [built]
```

我们会发现有个index.css资源 webpack把它打包成模块 然后整理到了index.js文件中

我们也可以看看css样式在html中有没有生效
我们需要创建html文件将打包后的build.js引入html文件中查看效果

<br><br>

<br>

### webpack来处理less资源
对不同的文件打包那么就要配置不同的loader

准备工作
```js
// 入口文件中 引入样式资源
import "./index.css"
import "./index.less"
```

**<font color="#C2185B">1. 下载需要的loader </font>**  
less         (不用配置到webpack.config.js中)
less-loader 
css-loader 
style-loader
<!-- 
  vscode的插件会将less文件在保存的时候自动变成css文件 所以我们还需要下载less
 -->

"style-loader", : 
  创建style标签 将js文件中的样式资源添加进去 然后放入到head中

"css-loader",   : 
  将css文件编译为commonjs模块加载到js中

"less-loader"   : 
  将less文件编译为css文件

npm i 
  style-loader@1.1.3 
  css-loader@3.4.2 -D
  less@3.11.1
  less-loader@5.0.0

**<font color="#C2185B">2. 在rules中配置翻译less的loader</font>**  
```js
module: {
  rules: [
    {
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        "less-loader"
      ]
    }
  ]
},
```

**<font color="#C2185B">3. 执行 webpack</font>**  

<br><br>

# 开发环境: 打包html资源
这里我们需要 plugins配置 需要下载 html-webpack-plugin 插件

**<font color="#C2185B">1. 下载插件</font>**  
npm i html-webpack-plugin -D
<!-- 
  @3.2.0
 -->

html-webpack-plugin:
作用:
默认会创建一个空的html文件 *自动引入打包输出的所有资源(js/css)*

如果我们需要有结构的html文件 我们可以在 new htmlWebpackPlugin({}) 中传入配置项 template 

**<font color="#C2185B">template属性</font>**  
值为: string 模本html文件的路径
根据指定的html文档作为模版 生产打包后的html页面(复制指定的html文档中的内容 并自动引入打包输出的所有资源)

**注意:**
模版html页面中不要自己再引入资源 不然会引入两次

**<font color="#C2185B">title</font>**  
**<font color="#C2185B">favicon</font>**  
字面意思

**<font color="#C2185B">filename:</font>**  
html文件的名字

**<font color="#C2185B">inject: "body" (这个老师没用)</font>**  
自动引入资源的script标签 注入在html中的body里面

```js
  plugins: [
    new htmlWebpackPlugin({
      template: "指向一个有结构的.html",
      title: ""
      favicon: ""
    })
  ]
```



**<font color="#C2185B">2. 引入 插件</font>**  
webpack.config.js 中 先引入插件
```js
const htmlWebpackPlugin = require("html-webpack-plugin")
```

**<font color="#C2185B">3. 在 plugins配置项 中 配置</font>**  
使用插件的方式竟然是new下

```js
  plugins: [
    new htmlWebpackPlugin()
  ]

  // 如果想html页面有内容的话 可以这样
  plugins: [
    // 写详细的插件配置
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
```

**<font color="#C2185B">4. webpack 打包 查看结果</font>**  

<br><br>

<br>

### 代码部分:
```js
const htmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")

module.exports = {

  // 入口起点 指示webpack以哪个文件为起点开始打包的
  entry: "./src/index.js",

  // 输出到哪里
  output: {
    // 输出到的文件名
    filename: "build.js",
    // 输出的路径 这里我们会利用path模块来写绝对路径
    // __dirname: nodejs的变量代表当前文件的目录的绝对路径 
    path: resolve(__dirname, "build")
  },


  // loader的配置 
  module: {
    rules: [
      // 写详细的loader配置
      {
        // 匹配的文件 值通常为正则表达式 以.css结尾的文件
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },

  // 配置插件 loader帮webpack做翻译 插件帮助webpack扩展功能
  plugins: [
    // 写详细的插件配置
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  // 模式
  mode: "development",
}
```

<br><br>

# 开发环境: 打包 图片资源
当有webpack不识别的资源的时候 我们第一时间要考虑的就是 loader
图片资源的打包 我们需要下载两个包

url-loader
file-loader (这个loder不用配置到 module配置项中)

url-loader依赖于file-loader做事情

npm i url-loader file-loader -D
<!-- 
  url-loader :  @3.0.0
  file-loader : @5.0.2
 -->


<br>

### 我们先做些准备工作
1. index.less
我们在样式文件中也引入了图片

```less
#box1 {
  width: 100px;
  height: 100px;
  background-image: url(../assets/img-1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box2 {
  width: 100px;
  height: 100px;
  background-image: url(../assets/img-2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box3 {
  width: 100px;
  height: 100px;
  background-image: url(../assets/img-3.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
```

2. index.js
我们在js文件中引入index.less
html文件不需要在入口文件中引入 它会被插件自动引入

```js
import "./index.less"
```


<br>

### webpack.config.js中的loader配置
这个部分我们说两种情况:

**<font color="#C2185B">情况1:</font>**  
只有 less 文件中 通过 background-imgae: url() 的形式引入了图片资源 然后我们要使用webpack对其less进行打包
<!-- 
  一般 不仅仅只有 less文件或者css文件中 有url() 引入的资源
  更多的是html页面里面引入了图片资源
 -->

**<font color="#C2185B">情况2:</font>**  
less文件中 和 html文件中 都引入了图片资源

**<font color="#C2185B">要点:</font>**  
1. 打包图片资源所要用到的包
**url-loader**
用来处理 样式中的 url 图片路径的 
<!-- 
  @3.0.0
 -->

**file-loader**
url-loader要依赖于file-loader 该loader不用配置在 module 中
url-loader比file-loader多了一个limit功能
file-loader就是将资源原封不动的输出出去
<!-- 
  @5.0.2
 -->

**html-loader** 
用于处理 html 文件中的 img 图片的  *这个也是要下载的*
它负责引入图片(加入依赖树 相当于引入到了入口文件中) 从而能被url-loader进行处理
<!-- 
  @0.5.5
 -->

2. 因为我们还要解析less代码 所以要配置less-loader
```js
{
  test: /\.less$/,
  use: [
    "style-loader",
    "css-loader",
    "less-loader"
  ]
},
```

3. 因为我们要解析less文件中 url()引入的图片资源 所以要配置url-loader

<br>

### options配置项:
作用: 用于配置loader

```js
module: {
  rules: [
    {
      test:
      use: | loader: 

      options: {
        limit: ,
        esModule: ,
        name: ,
      }
    }
  ]
}
```
**<font color="#C2185B">limit: 8 * 1024</font>**  
用于对指定字节以下的图片进行base64的编码的格式
<!-- 
  url-loader在打包图片的时候 并不是原封不动的输出 
  当发现图片大小 < 8kb 的时候 就会被 base64 处理 将图片转换为base64编码的方式 编码成字符串 浏览器解析这个字符串就会当做是图片的内容去解析

  优点: 减少请求数量(减轻服务器压力)
  缺点: 图片体积会更大(文件请求速度更慢) 一般不会对大图片进行base64的处理 一般在8-12kb以下会
 -->

**<font color="#C2185B">esModule: false</font>**  
url-loader默认是使用es6模块化标准来进行解析 所以解析的结果也是es6模块化的产物
但是 html-loader 是基于commonjs模块化标准进行解析 解析出来的结果是commonjs模块化的产物
而我们html页面中的图片也需要解析 html-loader解析后结果要给url-loader去解析 但是两种模块化的产物不匹配 所以我们关闭es6 相当于开启了commonjs

**<font color="#C2185B">name</font>**  
对打包后的图片资源进行命名
name: "[hash:10].[ext]"
使用 hash值的前10位来命名

name: "[name].[ext]"
使用 图片原来的文件来命名


```js
  // 图片的loader
  {
    test: /\.(jpg|png|gif)$/,
    loader: "url-loader",
    // loader的配置项
    options: {
      limit: 8 * 1024,
      esModule: false,

      // name: "[hash:10].[ext]",
      // 原来图片的名字还可以这么设置
      name: "[name].[ext]"
    },
  },
```

4. 因为我们要解析html页面 img引入的图片资源 所以要配置html-loader
**处理图片资源的时候 这两个loader必须都要写 不配置会报错 也就是说 处理图片资源的时候 就配置这两个loader**
```js
{
  test: /\.html$/,
  loader: "html-loader"
}
```

<br>

### 完整代码
```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      // 图片的loader
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        // loader的配置项
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[name].[ext]"
        },
      },

      // html文件中的img src
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development"
}
```

<br><br>

# 开发环境: 打包 其他资源
其他资源: 比如字体图标
<!-- 
  这种资源不需要做其他的处理 不需要优化 不需要压缩等 我们只需要输出出去就可以了
 -->

<br>

### 对上述知识体系进行扩展
我们在配置loader的时候 在rules数组对象中都写过
```js
rules: [
  {
    test:
    use:
    loader:

    // 现在又多了一个 
    exclude: /正则/
  }
]
```

**<font color="#C2185B">exclude属性:</font>**  
排除正则匹配的文件 相当于打包 配置文件类型之外的 其他资源
不用经过特殊处理的资源都可以用 file-loader 来进行处理


<br>

### 准备工作:  下载图标字体
iconfont - 选择 - 购物车 - 下载代码
打开 压缩包 中的 index.html


<br>

### 图标字体的使用
我们可以看到有3种用法
1. unicode 
<!-- 支持ie6 但是不支持多色 -->

2. font class  
<!-- 支持ie8以上 -->
使用方式:
引入 iconfont.css 样式文件
通过span标签指定class去写

3. symbol
<!-- 只要是通过svg使用这样的图片 -->


<br>

### 图标字体的使用:
我们要使用阿里的字体图片 使用方式分为两步
1. 引入样式
2. span里面写class


*注意:* 我们没有在html页面中通过link的方式引入资源 而是在入口文件中引入的资源哦
```js
import "../assets/iconfont/iconfont.css"
```

我们要打包的是 样式资源 html资源 字体图标资源
这类资源都有一个统一的特性就是不用经过特殊的处理
所以我们可以在loader配置中 使用 exclude属性 进行排除


<br>

### 全部代码
```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },

      // 打包其他资源(除了html js css以外的资源)
      {
        // 排除 正则匹配的文件 相当于打包其他资源
        exclude: /\.(css|js|html)$/,
        // 其他资源都会通过file-loader来处理
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development"
}
```

**注意:**
1. svg图片要使用 file-loader 所以匹配图片的规则里不要写 svg (疑问)
2. 上面的部门我们了解到 匹配的到资源 url-loader 的会进行图片的转换 当小于limit的时候会base64化 
但是像上面那样 会造成冲突
  jpg匹配了 **url-loader**
  exclude 排除js css htmkl, 这样jpg也会匹配 **file-loader**

所以我们可以使用 oneOf 来处理 让jpg只匹配一个规则
```js
{
  oneOf: [
    {
      test: /\.(jpg|png|gif)$/,
      loader: "url-loader",
      options: {
        limit: 8 * 1024,
        esModule: false,
        name: "[name].[ext]"
      },
    },
    {
      test: /\.html$/,
      loader: "html-loader",
    },
    {
      exclude: /\.(css|js|html)$/,
      loader: "file-loader",
      options: {
        esModule: false,
        name: "[hash:10].[ext]"
      }
    }
  ]
},
```

<br><br>

# 开发环境: devServer
情景:
我们会将src源代码目录中的代码打包到build目录下
但是当我们再在src源代码中做修改之后 必须再次的重新进行打包 这样每次修改每次都要打包 太麻烦了

所以webpack提供了devServer 在开发环境下 帮我们自动的打包 自动刷新页面等工作
这样开发者只需要写源代码就可以了


**<font color="#C2185B">配置项: devServer</font>**  
它不属于前面的5个核心的属性 可以额外的单独的配置
作用:
用来自动化(自动编译 自动打开浏览器 自动刷新浏览器等)

类型: {}
```js
devServer: {
  // 填写的是目录
  contentBase: 运行项目的目录 一般都是以绝对路径书写 指向打包后的目录 不是源代码目录, 静态资源的根目录

  compress: true 启动gizp压缩 代码体积会更小 传输速度越快,

  port: 端口号,

  open: true 自动打开默认浏览器,

  // 控制台上会有输出效果 [WDS] 96%
  progress: true 打包进度

}
```

<br>

### 特点:
1. 只会在内存中编译打包 不会有任何文件的输出
<!-- 
  我们可以将build目录删掉 然后重新构建一次 发现并没有输出build
  当我们运行的是 npx webpack-dev-server 那么仅是在内存层面打包处理

   当我们运行的是 webpack 那么才会有真正的输出
   一旦我们终止程序的运行 就会将内存里面的东西删掉
 -->
 
2. 它会监视src下的源代码的变化 一旦变化就会自动进行打包 刷新等处理


<br>

### 启动devServer的指令: npx webpack-dev-server
我们要用这个指令 那么就得下这个包
npm i webpack-dev-server -D
<!-- 
  @3.10.3

  // webpack5 的时候
  弹幕上说 将 contentBase 改成 static
  然后使用 npx webpack serve 命令
 -->


<br>

### 启动命令后 我们通过 localhost:3000 去查看
我们修改html代码后 保存后 页面就会刷新

```js
// 服务器
devServer: {
  // 项目构建后的路径
  contentBase: resolve(__dirname, "build"),

  // 端口号
  port: 3000,

  // 启动 gzip 压缩
  compress: true,

  // 自动打开浏览器
  // open: true,

  // 打包进度
  // progress: true
}
```

<br><br>

# 开发环境: 对上述的知识的整合
我们将前面的内容综合在一起 来形成一个开发环境的配置
开发环境的配置的目的:
就是能让代码运行即可 我们要多种情况都要进行处理 一个处理不好就报错了

<br>

### 要点:
每一个loader配置项里面都会有 options选项 用于配置loader
options - outputPath属性 用于将对应的资源输出到 打包目录下的哪个目录

```js
// 处理url()图片资源的演示
module: {
  rules: [
    {
      test:
      use: ["url-loader"]
      
      options: {
        limit:
        name:
        esModule:

        // 首先我们要知道 output 中我们指定了 打包文件要输出到哪里 这里直接指定 打包目录的下层目录就可以

        // 比如这样就是将图片打包后输出到 build/imgs/ 下
        outputPath: "imgs"
      }

    }
  ]
}
```

**注意:**
样式loader下没有outputPath 因为样式会打包到js里面去 在样式的loader里面配置outputPath会报错

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[hash:10].[ext]",

          // 输出的图片资源会在 打包后目录下的 img目录里面
          outputPath: "img"
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        exclude: /\.(html|css|less|jpg|png|gif|js|json)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",

          // 输出的图片资源会在 打包后目录下的 media目录里面
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000
  }
}
```

<br><br>

# 生产环境: 构建环境介绍
之前我们已经介绍了两种模式 开发模式 和 生产模式 这两种模式就对应着 开发环境 和 生产环境

前面我们说过

<br>

### 开发环境:
  就是能保证代码在本地调试运行的环境 比如
  源代码中的es6的语法 less文件 -- webpack处理后 -- 资源文件
  将资源文件在浏览器端运行 我们还做了自动化的操作 自动刷新 自动打开浏览器 让开发的效率更高

<br>

### 生产环境:
  让代码能够优化上线的环境 比如
  样式问题:
  我们的样式资源在经过webpack处理后是整合在js中的(css-loader将样式文件整合到js中了) 我们的样式在js中就会让js的体积变大 加载的速度就会很慢 因为它是先加载js 才能通过创建style标签 插入到页面中 所以会出现闪屏现象 我们需要做的是将css文件从js中提取出来

<br>

### 代码压缩问题:
  html css js代码都在一起 所以要对其进行压缩

<br>

### 样式和js代码是有兼容性问题: 
  比如flex和animation等需要加前缀 在低版本的浏览器中运行

<br>

### 生产环境目的:
  让我们的代码更好的运行 速度更快 性能更好
  让我们的代码在各个浏览器中都能平稳的运行

  因为生产环境的事儿比较多 如果都放在开发环境中解决 极大程度上会拖慢构建的速度 不利于我们开发 所以这些事情我们要放在生产环境中来做

下面我们就对上述的问题 一一在生产环境中如何来配置

<br><br>

# 生产环境: 提取css成单独文件
开发环境中 我们使用的是 style-loader 因为其内部实现了*HMR功能* 可以局部更新 
而生产环境中 我们要提取css单独的文件 减少打包后js文件的体积

之前通过 style-loader 和 css-loader 的方式 是将样式通过style标签的形式引入到项目中的

现在要将样式 提取成css文件后 会通过link标签引入css文件


准备工作:
创建了2个css文件 然后在入口文件中引入

如果做以下配置的话我们css文件在打包后还会在js文件中
```js
 module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ]
},
```

那怎么才能将css文件单独的从js文件中提取出来 不让js文件的体积那么大呢？ *我们要使用插件*

我们的目的是要将css文件单独的提取出来做为一个样式文件 但是经过css-loader之后处理之后 样式文件就整合到js中了 而style-loader是创建一个style标签将样式添加到页面上

而我们现在的流程是 要将css-loader整合到js中的样式文件通过下面的插件将其提取出来成为一个单独的css文件 *所以style-loader就不能要了* 我们要用下面的插件身上的loader来处理css-loader加工后的js文件
<!-- 
  style-loader不需要的原因是
  我们已经将css提取成单独文件了 所以就不需要创建style标签了
 -->

也就是说:
之前:
  style-loader
  css-loader

现在:
  MiniCssExtractPlugin.loader
  css-loader


<br>

### 插件: mini-css-extract-plugin
将css提取成一个单独的文件

**<font color="#C2185B">1. 下载:</font>**  
npm i mini-css-extract-plugin -D
<!-- 
  @0.9.0
 -->

**<font color="#C2185B">2. 引入</font>**  
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

**<font color="#C2185B">3. 在 plugins配置项中配置</font>**  
```js
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),

  // 提取css样式的插件
  new MiniCssExtractPlugin({
    title: '王二狗',
    filename: "css/build.css",
    favicon: "src/assets/images/favicon.ico"
  })
],
```

在 new MiniCssExtractPlugin({配置对象}) 的时候可以传递参数

\\ filename: 
可以对我们整合的css文件进行 文件夹的设定和重命名
<!-- 
  之前整合后的文件夹 main.css
  现在可以指定文件夹的同时在对main.css 重命名

  | - css
    - build.css
 -->

\\ favicon: 图标
\\ title: 标题


**<font color="#C2185B">4. 修改 loader 配置</font>**  
将原先的style-loader替换为插件上的loader

解析:
style-loader的作用是创建style标签 将样式从js文件中提取出来放入标签插入到页面中
而插件的loader是将样式从js文件中提取为单独的一个css文件 通过link的方式引入到项目中

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        // 创建style标签 将样式放入
        // "style-loader", 

        // 这个loader取代style-loader 作用: 提取js中css成单独文件
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }
  ]
},
```

**<font color="#C2185B">5. webpack命令测试</font>**  
上面我们是在入口文件中引入了 a.css b.css
经过我们上面的调整:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>提取css文件</title>
<link href="main.css" rel="stylesheet"></head>
<body>
  <div id="box1">box1</div>
  <div id="box2">box2</div>
<script type="text/javascript" src="build.js"></script></body>
</html>
```

build目录下多了一个 main.css
也就是说将我们项目中的css文件都整合到了 main.css 文件中 并在html页面中通过link标签引入了

这样css文件和js文件分割开了 这样js文件的体积也没有那么大 解析速度也会更好一些

<br><br>

# 生产环境: css的兼容性的处理
我们要做css的兼容性处理
<!-- 
  疑问:
    那开发环境就不用作css的兼容性处理么? 那在不支持css的浏览器中 怎么检查 
    我觉得开发环境中 也需要做 css 和 js 的兼容性处理
 -->

css的兼容性处理都会使用一个库 postcss
而 postcss 要想在 webpack 中的使用的话 就需要postcss-loader

除了postcss库 我们要需要使用插件 postcss-preset-env
这个插件能够帮助postcss识别某些环境从而加载指定的配置 能够让我们的兼容性做的精确到某一个浏览器的版本

所以我们需要
  - postcss
  - postcss-loader
  - postcss-preset-env

<!-- 
  - webpack的网址:
  - https://webpack.docschina.org/loaders/postcss-loader
  - 版本不同 写配置的方式也不同 我们这里使用的是视频老师的webpack一系列的版本
 -->

<!-- 
  postcss-loader: @3.0.0
  postcss-preset-env: @6.7.0
  postcss: @7.0.39
 -->


**<font color="#C2185B">postcss-loader</font>**  
作用:
要将使用postcss就要通过postcss-loader


**<font color="#C2185B">postcss-preset-env</font>**  
作用:
帮postcss找到*package.json*中的*browserslist*里面的配置
通过配置加载指定的兼容性样式


**<font color="#C2185B">下载:</font>**  
npm i postcss-loader postcss-preset-env postcss -D


**<font color="#C2185B">browserslist</font>**  
要写在package.json中
browserlist 还可以写成一个数组的形式 里面直接定义下面的写法
```js
"browserlist": {
  // 开发环境的配置
  "development": [
    // 兼容最近的一个chrome版本
    "last 1 chrome version"

    // 还有以下的写法
    "defaults",
    "last 2 version",
    "not ie <= 11",
    ">1%"
  ],

  // 生产环境的配置
  "production": [
    // 生产环境下兼容市场占有率99.8%份额的浏览器
    ">0.2%",
    // 不要已经死了的浏览器
    "not dead",
    // op_mini all 早就死了 也不要
    "not op_mini all"
  ]
}
```

<br>

### 要点:
开发的环境下我们不要求太多 主要兼容写主要浏览器的版本就可以
<!-- 
  npx browserslist 可以查看自己配置的究竟是哪些浏览器
  我们也可以去github上去搜索browserslist 上面有介绍这里可以写哪些参数
 -->

该配置项 还可以写在 项目根目录下 .browserslistrc 配置文件中 在运行loader的时候会自动读取


<br>

### 兼容性处理的位置:
既然是css的兼容性处理 肯定要写在 css的loader配置里面
写在css-loader的下面
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        **这里是postcss-loader的配置位置**,
        *后面如果有less, scss等可以加在这个不分*
      ]
    }
  ]
}
```

<br>

### 配置写法:  -- 不使用该方式
默认的loader写法 就是以字符串的方式 下面的方式我们不用
如果使用下面的方式还有使用配置对象的话就要在项目的根目录中 创建 postcss.config.js 文件 写法参照官网

```js 
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        // 默认配置的写法
        "postcss-loader"
      ]
    }
  ]
},
```

<br>

### 配置写法:  -- 使用该方式
如果要对loader加上配置的话 就要将loader写成对象的形式
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: () => [
              // postcss的插件
              require("postcss-preset-env")()
            ]
          }
        }
      ]
    }
  ]
},
```

<br>

### 解析:
我们将 postcss-loader 写成了对象 在对象中配置下面的属性
**loader属性**
  指明 要使用的loader

**options属性:**
  对该loader的配置 类型为对象

**options对象 >> ident:**
  固定写法 指明要使用的是 postcss 库

**options对象 >> plugins: () => []**
  指明要使用 postcss 库中的什么插件
  类型是一个函数 函数的返回值为数组
  数组中通过 *require("postcss-preset-env")()* 的方式指明要使用的插件
  <!-- 
    postcss中还有很多插件 没事的时候可以看看

    所有的插件都要下载 npm i ... 然后才能使用
   -->


**browserslist 注意:**
我们 browserlist 中也是分 development 和 production 的
browserlist默认是看生产环境的 所以当我们运行项目的时候 browserlist会看生产环境 要想让browserlist看开发环境的配置 我们要在webpack.config.js文件中设置node环境变量

process.env.NODE_ENV = development
这样设置了后才可以

默认的话会走production里面的配置
<!-- 
  这里就能解决我们开篇时候的疑问 我们可以通过指定
  process.env.NODE_ENV = development 

  来确定当前的环境 从而做到css 和 js的兼容性处理 因为js也会走browserlist
 -->


<br>

### 完整代码:
```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
};

```

<br><br>

# 生产环境: 压缩css
压缩css的话 我们只需要引入一个插件就可以了
到这里我们发现 有的工作会使用loader做 有的工作会使用plugins做

loader能做的事情一般比较少 大部分的工作都是依靠插件去完成的
<!-- 
  兼容性处理是靠loader去做的
 -->

<br>

### 下载插件:
optimize-css-assets-webpack-plugin
作用:
压缩css

npm i optimize-css-assets-webpack-plugin -D

<!-- 
  @5.0.3
 -->


<br>

### 引入插件
```js
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
```


<br>

### 使用插件
不用再修改它的配置 内部的配置已经足够我们压缩css了
```js
plugins: [
  // 压缩css
  new OptimizeCssAssetsWebpackPlugin()
]
```

效果就是css整体会被压成一行 当我们项目的样式越来越多的时候 压缩可以让文件体积很小 请求速度就越快 加载速度也快 用户看的效果就会更快一些 在*上线之前*一定要压缩代码

<br><br>

# js语法检查eslint
我们希望团队的代码的风格是差不多的 或者 语法错误 这样就可以利用 eslint

**<font color="#C2185B">1. 下载</font>**  
我们要是在webpack中使用的话 就需要使用eslint-loader
eslint-loader 依赖于eslint库

所以我们要准备如下的库:
eslint (不用配置在loader里面)
eslint-loader
<!-- 
  eslint: @7.32.0
  eslint-loader: @4.0.2
 -->


同时 我们要使用代码风格标准 这里推荐 airbnb 所以我们要下载
eslint-config-airbnb-base
eslint
eslint-plugin-import

<!-- 
  eslint-config-airbnb-base: @15.0.0
  eslint-plugin-import: @2.26.0

  ---

  eslint-config-airbnb
    会包含 react的风格代码

  eslint-config-airbnb-base
    没有包含 react的风格代码 有es6语法

  eslint-config-airbnb-base/legacy
    没有包含 react的风格代码 有es5及以下语法
 -->
 

**注意：**
语法检查我们只针对js文件来做 同时只检查用户写的源代码 要排除第三方的库(node-modules)

可以在loader的配置中 使用 exclude: 正则 来进行排除

当有别的loader也对js文件类型做处理的时候 优化处理eslint



**<font color="#C2185B">2. 在package.json中配置 eslint的语法的检查规则</font>**  
我们只配置eslint-loader是不够的 因为loader不知道怎么检查 所以还要配置 风格

我们在 package.json 文件中通过 eslintConfig 配置项设置语法的检查规则

我们通过 继承的方式 得到airbnb的风格指南
```js
// package.json
"eslintConfig": {
  "extends": "airbnb-base",

  // 注意: eslint不认识全局变量 实际上浏览器在运行的时候肯定是有window这个全局变量的 所以要让eslint认识这些变量 就这么配置
  "env": {
    // 让eslint支持浏览器的全局变量
    "browser": true,

    // 让eslint支持node中的全局变量
    "node": true
  }
}
```
<!-- 
   以上注意的部分 当终端报 window is not defind 错误的时候 可以这么加上
 -->

视频中说还可以通过 .eslintrc 文件中配置
以下是kinto项目的 .eslintrc.json 文件
```json
  {
  "extends": [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "eslint:recommended",
    "plugin:vue/recommended"
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
    "keyword-spacing": 2,
    "no-new": 0
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

**<font color="#C2185B">3. webpack.config.js 中配置 eslint 的loader</font>**  
```js
rules: [
  {
    // 对js文件进行检查
    test: /\.js$/,

    // 排除 node_modules
    exclude: /node_modules/,

    // 使用 eslint-loader
    loader: "eslint-loader",

    // 配置eslint loader的自动修复功能
    options: {
      // 自动修复eslint错误 这样就不用手动去改了
      fix: true
    }
  }
]
```

<br>

### 验证
我们发现 我们在index.js文件中故意写的不好的代码 在运行webpack命令后 自动修复成规整的样子了


<br>

### 技巧
还可以通过注释:
// eslint-disable-next-line

取消对下一行的检查
```js
// 下一行eslint所有规则都失效 对下一行不进行eslint检查
// eslint-disable-next-line
console.log(add(3, 3));
```

在上线的代码中最好不要有console

<br><br>

# js兼容性的处理
我们做下准备工作 index.js 我们使用了 es6 语法

**最终方案看最下面 babel扩展部分**

```js
const add = (x, y) => x + y
console.log(add(3, 3))
```

<br>

### 问题:
我们直接用 webpack打包 查看打包后的结果 发现在build.js文件中 还是es6的语法 并没有做兼容性的处理
```js
// 能看到还是箭头函数
eval("const add = (x, y) => x + y\nconsole.log(add(3, 3))\n\n//# sourceURL=webpack:///./index.js?");
```

当我们的代码在chrome中的打开是没有的问题的 但是在ie中会报 script1002语法错误 说明ie不认识es6中的语法


<br>

### js兼容性的处理 阶段1: 基本的兼容性处理
该阶段只能 转换基本的es6语法 (箭头函数 扩展运算符等) 
如promise set maps iterator等高级语法就不能进行转换

<br>

### 使用方式:
**<font color="#C2185B">1. 下包</font>**  
所以必然要做兼容性的处理 我们要使用 babel 要想在webpack中使用babel就要使用babel-loader

babel-loader
@babel/core
@babel/preset-env
<!-- 
  babel-loader: @8.0.6
  @babel/core: @7.14.6
  @babel/preset-env: @7.14.7
 -->

npm i babel-loader @babel/core @babel/preset-env -D


**<font color="#C2185B">webpack.config.js 中的配置</font>**  
我们在配置文件中配置loader
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      // 在options写清楚 babel-loader 的配置
      options: {
        // 预设 babel-loader 要进行何种转换 何种兼容性处理 预设环境的兼容性处理 "@babel/preset-env"
        presets: [
          ["@babel/preset-env", {targets: {"chrome": "58", "ie": "11", "firefox": "60", "safari": "11", "edge": "11"}}]
        ]
      }
    }
  ]
},
```

<br>

### 要点:
1. 我们只检查js文件
```js
test: /\.js$/
```

2. 排除 node_modules 因为不能对node_modules里面的代码进行转换
```js
exclude: /node_modules/,
```

3. options是对loader的配置 在里面我们要指明进行何种兼容性的处理
presets的类型是一个数组
里面的值还是数组
presets: [ [xxx, {配置对象}] ]
```js
options: {
  presets: [
    [
      "@babel/preset-env", 
      {
        // 指定兼容性做到哪个版本的浏览器
        targets: {
          "chrome": "58", 
          "ie": "11", 
          "firefox": "60", 
          "safari": "11", 
          "edge": "11"
        }
      }
    ]
  ]
}
```


<br>

### js兼容性的处理 阶段2: 处理全部的兼容性问题(相当于引入全部的element-ui组件样式)
上面的配置只能转换一些基本的语法 一些高级的es6语法仍然不能转换 所以当我们 new Promise 所以ie会报 promise 未定义的错误

```js 
  eval("var add = function add(x, y) {\n  return x + y;\n};\n\nconsole.log(add(3, 3));\nvar p = new Promise(function (resolve) {\n  setTimeout(function () {\n    console.log(\"定时器执行完了\");\n    resolve(\"成功\");\n  }, 1000);\n});\nconsole.log(p);\n\n//# sourceURL=webpack:///./index.js?");
``` 

这时候我们就要使用一个库 *@babel/polyfill*
这个包可以做全部的js兼容性处理

npm i @babel/polyfill@7.8.3 -D


<br>

### @babel/polyfill的使用方式
这个不是插件 不是loader 不用在webpack.config.js里面配置 我们可以在 index.js 入口文件中引入即可
```js
// index.js
import "@babel/polyfill"
```

效果:
打包后的js文件变大了 因为里面包含了各种js的兼容性处理
<!-- 
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ \"./node_modules/@babel/polyfill/lib/index.js\");\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar add = function add(x, y) {\n  return x + y;\n};\n\nconsole.log(add(3, 3));\nvar p = new Promise(function (resolve) {\n  setTimeout(function () {\n    console.log(\"定时器执行完了\");\n    resolve(\"成功\");\n  }, 1000);\n});\nconsole.log(p);\n\n//# sourceURL=webpack:///./index.js?");
 -->

<br>

### 原理:
@babel/polyfill 定义好了浏览器不识别的方法 一旦发现浏览器不识别 就直接拿出来这个方法挂载到对应的结构上 这样就可以直接用了 不管识别还是不识别

*问题:*
我只要解决部分兼容性问题 但是将所有的兼容性代码全部引入 体积太大了


<br>

### js兼容性的处理 阶段3: 按需加载
加载指定兼容性的库 而不是引入全部 这里我们就要使用 corejs 库

<br>

### corejs的使用方式
1. 下载
npm i core-js -D
<!-- 
  @3.6.4
 -->

2. webpack.config.js配置
```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
      presets: [
        [
          "@babel/preset-env", 
          {
            // 按需加载
            useBuiltIns: "usage",
            // 指定按需加载的内容 指定core-js的版本
            corejs: {
              version: 3
            },
            // 指定兼容性做到哪个版本的浏览器
            targets: {
              chrome: "60",
              firefox: "50",
              ie: "9",
              safari: "10",
              edge: "17"
            }
          }
        ]
      ]
    }
  }
]
```

<br>

### 预设的配置项中的可传属性
**<font color="#C2185B">targets</font>**  
该参数项可以取值为字符串、字符串数组或对象，不设置的时候取默认值空对象{}。
该参数项的写法与browserslist是一样的，下面是一个例子

```js
module.exports = {
  presets: [["@babel/env", {
    targets: {
      "chrome": "58",
      "ie": "11"
    }
  }]],
  plugins: []
}
```

如果写了 targets 配置项会忽略 根目录中的 browserslist的配置
如果没写 targets 配置项 会使用browserslist的配置
如果都没写 那么@babel/preset-env就对所有ES6语法转换成ES5的。

<br><br>

**<font color="#C2185B">useBuiltIns</font>**  
可选值:
"usage" | "entry" | false(默认值)

useBuiltIns这个参数项主要和polyfill的行为有关。
默认会将polyfill中的所有兼容性处理都引入打包后的代码中
useBuiltIns取值为"entry"或"usage"的时候，会根据配置的目标环境找出需要的polyfill进行部分引入

**entry:**
这种方式不会根据我们实际用到的API进行针对性引入polyfill
在使用的时候，'entry'需要我们在项目入口处手动引入polyfill

我们在入口文件用import语法引入polyfill（也可以在webpack的entry入口项）。此时的Babel配置文件如下：
```js
npm install --save-dev @babel/cli @babel/core  @babel/preset-env
npm install --save @babel/polyfill

module.exports = {
  presets: [["@babel/env", {
    useBuiltIns: "entry"
  }]],
  plugins: []
}
```

注意:
使用'entry'这种方式的时候，只能import polyfill一次，一般都是在入口文件。如果进行多次import，会发生错误。


**usage:**
这种方式可以根据我们实际用到的API进行针对性引入polyfill
在使用的时候，'usage'不需要我们在项目入口处手动引入polyfill


"usage"在Babel7.4之前一直是试验性的，7.4之后的版本稳定。
这种方式不需要我们在入口文件（以及webpack的entry入口项）引入polyfill，Babel发现useBuiltIns的值是"usage"后，会自动进行polyfill的引入。

```js
npm install --save-dev @babel/cli @babel/core  @babel/preset-env
npm install --save @babel/polyfill

module.exports = {
  presets: [["@babel/env", {
    useBuiltIns: "usage"
  }]],
  plugins: []
}
```

使用useBuiltIns:"usage"后，Babel除了会考虑目标环境缺失的API模块，同时考虑我们项目代码里使用到的ES6特性。只有我们使用到的ES6特性API在目标环境缺失的时候，Babel才会引入core-js的API补齐模块。

<br><br>

**<font color="#C2185B">corejs</font>**  
可选值: 2(默认值) | 3
这个参数项只有useBuiltIns设置为'usage'或'entry'时，才会生效。

2:
Babel转码的时候使用的是core-js@2版本（即core-js2.x.x）

3:
某些新API只有core-js@3里才有，例如数组的flat方法，我们需要使用core-js@3的API模块进行补齐，这个时候我们就把该项设置为3。
<!-- 
  corejs取值为2的时候，需要安装并引入core-js@2版本，或者直接安装并引入polyfill也可以。

  如果corejs取值为3，必须安装并引入core-js@3版本才可以，否则Babel会转换失败并提示：
 -->

<br><br>

**<font color="#C2185B">modules</font>**  
可选值:
"amd"
  "umd"
  "systemjs"
  "commonjs"
  "cjs"
  "auto"    -- 默认值
  false

<!-- 
  - 我们常见的模块化语法有两种：
  （1）ES6的模块法语法用的是import与export；
  （2）commonjs模块化语法是require与module.exports。
 -->  

设置为 false:
不会对ES6模块化进行更改，还是使用import引入模块。（不转）

设置为 auto | 其他
会将es6模块化转换为commonjs或其他指定的模块化方式


**注意:**
我们使用了这种方案 就不能用 @babel/polyfill 方案 要把index.js 引入@babel/polyfill的代码注释掉

<br><br> 

<br>

### 扩展:

<br>

### babel的配置文件
1. babel.config.js    -- 采取这个比较好
babel在执行的时候会默认在当前目录寻找babel的配置文件

2. .babelrc | .babelrc.js 配置文件

3. package.json 配置文件

上述的3种配置方式使用一种就可以 作用都是一样的


**<font color="#C2185B">@babel/core</font>**  
@babel/cli依赖@babel/core，因此也需要安装@babel/core这个Babel核心npm包。

**<font color="#C2185B">@babel/preset-env</font>**  
ES6转换ES5的语法转换规则，我们在Babel配置文件里指定使用它。

<br>

### Babel的主要工作有两部分
1. 语法转换
2. 补齐API

<br>

### 理解:
Babel默认只转换新的JavaScript语法（syntax），而不转换新的 API。

新的API分类两类:
1. Promise、Map、Symbol、Proxy、Iterator等全局对象及其对象自身的方法
例如Object.assign，Promise.resolve

2. 新的实例方法
例如数组实例方法[1, 4, -5, 10].find((item) => item < 0)
如果想让ES6新的API在低版本浏览器正常运行，我们就不能只做语法转换。

3. babel7的命名是 @babel/ babel6的命名是 babel- 本质是一样的 只是版本不一样

babel中的配置项
presets: 预设数组 (所有的预设都要先npm i 然后才能使用)
plugins: 插件数组 (所有的插件都要先npm i 然后才能使用)

每一个插件或预设都是一个npm包
这些插件或者预设在编译过程中将我们的es6代码转成es5 但是babel插件的数量非常的多 处理es2015的就好几个 es2018也有很多 如果只配置插件数组 那么我们的plugins配置项中就会特别的臃肿

presets预设就是帮我们解决这个问题的 预设是一组babel的插件集合(插件包) 这样我们只需要用一个预设代替就可以了


<br>

### 插件和预设的配置
每个插件是插件数组的一成员项
每个预设是预设数组的一成员项
默认情况下，成员项都是用字符串来表示的，例如"@babel/preset-env"。

如果我们要对插件或预设进行设置参数的话 那么成员项就要写成["插件或预设名",{配置项}]

例如:
```js
 {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

Babel官方的preset，我们实际可能会用到的其实就只有4个：
  @babel/preset-env   -- 一般这个就够用了
  @babel/preset-flow
  @babel/preset-react
  @babel/preset-typescript


<br>

### @babel/polyfill
由两个npm包*core-js*与*regenerator-runtime*组合而成的

上面我们就使用它进行了js兼容性的处理(全部引入)

<br>

### 使用方式
1. 直接在html文件引入Babel官方的polyfill.js脚本文件
2. 在前端工程的入口文件里引入polyfill.js
```js
// 1
import './polyfill.js';

// 2
import '@babel/polyfill';

// 3 还可以在 webpack 的配置文件中引入
const path = require('path');
module.exports = {
  // 这里
  entry: ['./polyfill.js', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
```

3. 在前端工程的入口文件里引入core-js/stable与regenerator-runtime/runtime
该方法需要我们单独安装单独安装core-js与regenerator-runtime这两个npm包，这种方式core-js是默认是3.x.x版本
<!-- 
  注意:
  - 如果选择该方式 就不能再安装 @babel/polyfill

  npm install --save core-js regenerator-runtime

  import "core-js/stable";
  import "regenerator-runtime/runtime";
 -->

**<font color="#C2185B">4. (推荐) 在前端工程构建工具的配置文件入口项引入core-js/stable与regenerator-runtime/runtime</font>**  
```js
npm install --save core-js regenerator-runtime

const path = require('path');
module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
```

**注意:**
从babel7.4开始，官方不推荐再使用@babel/polyfill了

<br><br>

**<font color="#C2185B">@babel/plugin-transform-runtime</font>**  
在我们利用babel做语法转换的时候 babel内部需要在转换后的代码里面注入一些函数才能正常工作
_classCallCheck
_defineProperties
_createClass

我们会看到转换后的代码上面 会有这些函数的声明 这些函数就是辅助函数
@babel/preset-env在做语法转换的时候，注入了这些函数声明，以便语法转换后使用。

但样这做存在一个问题。在我们正常的前端工程开发的时候，少则几十个js文件，多则上千个。如果每个文件里都使用了class类语法，那会导致每个转换后的文件上部都会注入这些相同的函数声明。这会导致我们用构建工具打包出来的包非常大。


<br>

### 使用方式:
1. 下载
npm install --save @babel/runtime
  npm install --save-dev @babel/core  @babel/preset-env @babel/plugin-transform-runtime

2. 在 *babel.config.js* 里面进行配置
```js
{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}

//  或者这样
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

还可以传入配置
```js
{
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

helpers:
默认值: true
表示是否开启内联的babel helpers(即babel或者环境本来的存在的垫片或者某些对象方法函数)(clasCallCheck,extends,etc)在调用模块名字(moduleName)时将被替换名字。

polyfill:
默认值: true
表示是否把内置的东西(Promise,Set,Map,tec)转换成非全局污染垫片。

regenerator:
默认值: true
是否开启generator函数转换成使用regenerator runtime来避免污染全局域。

moduleName
默认值: babel-runtime
当调用辅助（内置垫片）设置模块（module）名字/路径.

https://lequ7.com/guan-yu-babelbabeltransformruntime.html

<br><br> 

**js兼容的最终方案:**
@babel/cli: babel-cli是通过命令行输入指令执行

```js
npm install --save @babel/runtime-corejs3
npm install --save-dev @babel/cli @babel/core  @babel/preset-env @babel/plugin-transform-runtime

// babel.config.js
module.exports = {
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

**<font color="#C2185B">@babel/plugin-transform-runtime</font>**  
而 @babel/plugin-transform-runtime 有3大作用
1. 自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代。这样就减少了我们手动引入的麻烦。

2. 当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable;

3. 当代码里使用了Generator/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime；


<br>

### 演示 js兼容方案的最终处理方式
1. 使用 babel.config.js 
```js
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}


// 我以为的按需加载的配置 实际上打包的结果比上面的大
module.exports = {
  presets: [
    ["@babel/preset-env", 
      {
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          "chrome": "58", 
          "ie": "11", 
          "firefox": "60", 
          "safari": "11", 
          "edge": "11"
        }
      }
    ]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

2. webpack.config.js
```js
// loader配置项
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    }
  ]
},
```

3. package.json里面使用的版本
```js
"devDependencies": {
  "@babel/core": "^7.17.10",
  "@babel/plugin-transform-runtime": "^7.17.10",
  "@babel/preset-env": "^7.14.7",
  "@babel/runtime-corejs3": "^7.17.9",
  "babel-loader": "^8.0.6",
  "core-js": "^3.22.5",
},
```

其实我们感觉 都使用项目根目录 配置文件 的方式可能会更清晰些

<br><br>

<br>

### 装饰器 & webpack 的配置
装饰器还不是 es 的标准 我们在js环境中要想使用装饰器 还需要webpack的配合编译
1. 在完成webpack的基本安装后 想要安装 装饰器 对应的包 需要安装如下:
npm i @babel/plugin-proposal-decorators -D
npm i @babel/plugin-proposal-class-properties -D

npm i babel-loader @babel/core @babel/preset-env -D

```js
"devDependencies": {
    "@babel/core": "^7.18.5",
    "@babel/plugin-proposal-decorators": "^7.18.2",
    "@babel/preset-env": "^7.18.2",
    "babel-loader": "^8.2.5",
    "babel-plugin-transform-decorators-legacy": "^1.3.5",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.10.3"
},
"dependencies": {
    "@babel/plugin-proposal-class-properties": "^7.17.12"
}

// webpack配置 module配置项
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-env", 
            {
              targets: {
                "chrome": "58"
              }
            }
          ]
        ],
        // 注意它们两个的配置顺序
        plugins: [
          [
            "@babel/plugin-proposal-decorators",
            {"legacy": true}
          ],
          [
            "@babel/plugin-proposal-class-properties",
            { "loose": false }
          ]
        ]
      }
    }
  ]
}
```

<br><br>

# 压缩 js
js压缩很简单 在最初始的webpack配置下 只需要将 
mode: development -> production 就可以启动js压缩

因为生产环境下会自动压缩js代码 我们不需要操心这些事
上面说过在生产环境中 webpack会加载很多的插件 其中有一个 UglifyJsPlugin插件 该插件就会压缩js代码

```js
const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
  ],

  // 修改为 production
  mode: "production"
}
```

如果我们不写 mode 配置项 默认就是 production

<br><br>

# 压缩 html
前面css做了兼容性处理 postcss-preset-env js做了兼容性处理 @babel/preset-env 
html没办法做兼容性处理 浏览器认识就认识 不认识就是不认识 所以我们不需要对html做兼容性处理 只需要考虑html的压缩

通过我们前面的插件: HtmlWebpackPlugin插件来压缩 html代码
<!-- 
  htmlWebpackPlugin:
  前面我们使用该插件用来进行html资源的打包
 -->

我们在该插件的配置项里面添加 minify

**<font color="#C2185B">minify</font>**  
类型: {}

对象内的选项:
collapseWhitespace: true
removeComments: true

```js
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html",

    // 压缩html代码的配置项
    minify: {
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true
    }
  }),
],
```

<br><br>

# 生产环境: 对上述的知识的整合
结合上面的所有知识体系 然后完成一个生产环境的配置 

<br>

### 要点
1. less的loader配置中 也要做css的兼容性处理

2. 我们对 .js 文件做了 eslint 处理 又对 .js 文件做了兼容性的处理 正常来讲 一个文件只能被一个loader处理 当一个文件要被多个loader处理的时候 那么一定要指定loader的执行先后顺序

我们要先执行 eslint 再执行 babel
  - 1. eslint-loader是做语法检查的 一旦我们检查出语法错误 后面的操作就没有意义了

  - 2. babel-loader会将es6语法转换为es5语法 一旦转换之后再进行eslint检查就会报语法错误

  - 我们要在 loader 配置项中 和 test 同级 加上 *enforce: "pre"*
  - 加上这个属性后 这个类型的文件对应的loader会是 加上该属性的loader先执行

```js
{
  test: //,
  exclude: //,

  // 优先执行: 优先 | 正常 | 其次 | 最后
  enforce: "pre | normal | inline | post",

  loader: ""
  ...
}
```

<br>

### 完整的代码展示部分
```js
// package.json
{
  "name": "webpack_pro",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.6.0",
    "webpack-dev-server": "^3.10.3"
  },
  "devDependencies": {
    "@babel/core": "^7.17.10",
    "@babel/plugin-transform-runtime": "^7.17.10",
    "@babel/preset-env": "^7.14.7",
    "@babel/runtime-corejs3": "^7.17.9",
    "babel-loader": "^8.0.6",
    "core-js": "^3.22.5",
    "css-loader": "^3.4.2",
    "eslint": "^7.32.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.26.0",
    "file-loader": "^5.0.2",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "less-loader": "^5.0.0",
    "mini-css-extract-plugin": "^0.9.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss": "^7.0.39",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.7.0",
    "style-loader": "^1.1.3",
    "url-loader": "^3.0.0",
    "webpack": "^4.41.6",
    "webpack-cli": "^3.3.11"
  },
  "browserslist": {
    "development": [
      "defaults",
      "last 2 version",
      "not ie <= 11",
      ">1%"
    ],
    "production": [
      ">0.1%",
      "not dead",
      "not op_mini all"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}



// webpack.config.js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")


// 配合css js兼容性处理
process.env.NODE_ENV = "production"

// 生成环境配置
module.exports = {
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MniCssExtractPlugin.loader,
          "css-loader",
          // css的兼容性处理 还需要在定义 browserslist
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")()
              ]
            }
          }
        ]
      },

      // less文件也需要做兼容性处理 位置倒数第二位
      {
        test: /\.less$/,
        use: [
          MniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")()
              ]
            }
          },
          // 经过less-loader就是css文件了
          "less-loader"
        ]
      },
      // js的语法检查 在package.json中要添加eslintConfig配置项
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      // js兼容性处理 项目根目录下要创建babel-config.js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // 图片的处理
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
          esModule: false
        }
      },
      // 处理html结构中的图片
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 处理其他资源s
      {
        exclude: /\.(js|jpg|png|gif|html|css|less)/,
        loader: "file-loader",
        options: {
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    // 提取css文件
    new MniCssExtractPlugin({
      filename: "build.css"
    }),
    // html文件打包 以及 压缩
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    // 压缩css文件
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 压缩js
  mode: "production"
}


// babel.config.js
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

<br><br>

# webpack 性能优化: 
从环境的角度 谈性能优化 分两种
1. 开发环境性能优化
2. 生产环境性能优化


<br>

### 开发环境性能优化
优化webpack的性能 这里我们从两个角度来看
1. 优化打包构建速度(能够更快的看到效果)
2. 优化代码调试 让其更加友好
<!-- 
  代码出错了 要告诉我们错在哪里 sourceMap
 -->


<br>

### 生产环境性能优化
1. 优化打包构建速度
2. 优化代码运行的性能(代码在浏览器端运行的性能)

<br><br>

# HMR
该配置只能在 开发环境中配置 因为利用的是 devServer 所以生产环境中不行

我们现在项目中存在的问题
描述:
我们在入口文件中 index.js
```js
import "./assets/style/index.less"

console.log("js文件被加载了")
const add = (x, y) => x + y
console.log(add(3,3))
```

我们发现当我们修改 index.less 文件里面的内容时 index.js 文件也会被加载

看似我们只修改了样式文件 实际上是把js文件也重新打包了一次
假如我们js文件中 引入了其它的模块 当其它模块的内容被修改后 整个关系树也会被重新渲染

<br>

### 问题:
假如我们有100个js模块 100个样式模块 只要我修改了其中的某一个模块 整个这200个模块都要重新打包 这样的话 打包构建速度是非常慢的
<!-- 
  假如有 10000 个模块是不是更加的恐怖
 -->

我们想实现的是 当只有一个模块发现了变化 仅只打包这一个文件就可以了 其他模块是不变的 相当达到这点 就要使用webpack中的HMR功能


<br>

### HMR (hot module replacement) 热模块替换
注意:
HMR只是在开发环境中使用 因为是配置在 devServer配置项中的

作用:
一个模块发生变化 只会重新打包这一个模块 而不是打包所有
极大的提升代码的构建速度
 

<br>

### 实现:
devServer中支持HMR功能 我们只需要在 devServer配置项中 添加 hot 属性 设置为 true 即可
```js
// 服务器
devServer: {
  contentBase: resolve(__dirname, "build"),
  port: 3000,
  compress: true,
  open: true,
  progress: true,

  // 开启 HMR 功能
  hot: true
}
```

新配置项要生效 必须要重启 webpack 服务
npx webpack-dev-server

检查是否开启了 HMR 功能:
在 console 面板上会有
[WDS] Hot Module Replacement enabled


<br>

### 我们要检测的目标文件有
1. 样式文件
2. html文件
3. js文件

当我们开启了 HMR后 (hot: true) 我们看下上述的3种文件类型有什么样的变化

**<font color="#C2185B">1. 样式文件</font>**  
当我们修改样式文件后 可以热更新了
因为 style-loader 里面实现了 HMR功能 它会自动的做 所以我们不需要做了
<!-- 
  所以这也是我们在开发环境使用的style-loader 而生产环境中我们提取css单独文件

  因为开发环境借助style-loader可以让我们的性能更好 打包速度更快
  但是上线的时候我们考虑的是代码的性能优化 所以不能用style-loader
 -->

<br><br>

**<font color="#C2185B">2. js文件</font>**  
**问题:**
当我们修改js文件后 发现没有热更新 所有模块全部打包了
所以 默认情况下 js文件不能使用HMR功能的

**<font color="#C2185B">↑ 解决 js文件的 问题: module.hot.accept()方法包裹目标js文件</font>**  
比如:
我们在 index.js 文件中 引入了 print.js 文件
要想修改 print.js 文件不会更新整个依赖树的话 我们需要在 调用print() 的外成做判断处理

```js
if(module.hot) {
  module.hot.accept("要导入(监视)的js文件路径", function() {
    // 当监视的js文件发生变化的时候 执行回调里面的逻辑
  })
}
```

<br>

### 整体代码
```js
import print from "./assets/js/print"

import "./assets/style/a.css"
import "./assets/style/b.css"

const add = (x, y) => x + y;
console.log(add(3, 3));


// 会去全局找 module 变量 看看 module 上面有没有 hot属性
if(module.hot) {
  // 一旦有 hot 说明: 说明开启了HMR功能
  module.hot.accept("./assets/js/print", function() {
    // module.hot.accept() 会监听 print.js 文件的变化 一旦发生变化 其他模块不会重新打包构建 会执行回调函数 回调函数中 我们执行 引入js文件的相关代码
    print()
  })
}

// 如果我们不使用 module.hot.accept() 一旦一个js模块发生变化 所有的模块都会重新打包
```

当还有其他js模块的时候 继续写 if(module.hot) { ... }

**注意:**
js文件的HMR 我们只会针对非入口文件的js文件去做HMR功能

<br><br>

**<font color="#C2185B">3. html文件</font>**  
当我们修改html文件后(<h3>title</h3> -> <h3>title!!!</h3>)发现
[HMR] Nothing hot updated

**问题1:**
默认情况下 html文件不能使用HMR功能的 会将所有模块全部打包重新渲染

**问题2:**
html文件不能热更新了(我们本地修改的代码 它并没有重新编译 并没有重新刷新浏览器)
页面上没有显示我们修改后的结果 没有出现 !!!

**<font color="#C2185B">↑ 解决 html文件的 问题2: 修改 entry 的写法</font>**  
当我们设置了 devServer - hot: true 后 入口文件的书写方式 要改成 这样当我们修改html页面的内容后 页面会实时更新了
```js
// 换成数组的写法 元素1为入口文件 元素2为模版html文件
// 将html文件引入(是不是说 也将html文件添加到依赖关系树里)
entry: ["./index.js", "./src/index.html"],
```


**<font color="#C2185B">↑ 解决 html文件的 问题1: html文件不需要 HMR 功能</font>**  
html文件只有一个 所以一旦html文件发生变化 它没有其他文件 所以它只需要更新这一个文件 就是不管怎么做 这一个html文件肯定会发生变化的 既然一定要变化 那就意味着没有办法优化
<!-- 
  不像js js模块有n个 其中一个变 那其他的不变
 -->

<br><br>

# sourceMap
这个部分是解决开发环境下调试代码的问题

<br>

### source-map
提供源代码到构建后代码的映射技术
如果构建后代码出错了 通过映射关系可以追踪到源代码错误 便于我们寻找错误的原因
<!-- 
  源代码和构建后的代码区别是很大的 比如源码有100个模块 但是构建后代码只有一个模块 这样找代码出错的位置就会比较难
 -->

<br>

### 添加 source-map 功能
在 webpack.config.js 配置文件中 添加一个新的配置项
```js
module.exports = {
  mode: "development",
  devtool: "source-map"
}
```

<br><br>

<br>

### devtool可选值:
**<font color="#C2185B">source-map</font>**  
source-map部分的代码 会单独成为一个文件 build.js.map

\\ 作用 & 效果:
可以提示到: 错误代码的准确信息 和 源代码的错误位置
xxx ---  print.js:5

描述:
当我们源代码中出错后 控制台会报错 报错信息的右侧 会有哪个文件出错了 并且是第几行出错 同时我们点击该部分*会跳到出错文件的出错位置*
<!--                      
                                                 ↓
  console.log(...) is not a function    ---  print.js:5
 -->

如果没有加source-map的话 我们js代码被压缩后都会在一行 当我们代码出错后 仅会提示在打包后文件的第一行 也不会跳到指定的位置
<!-- 
  console.log(...) is not a function    ---  build.js:1
  可要知道这一行当中的位置特别难确认
 -->

控制台 sources 面板的左侧 有个目录结构树 有云彩的图标
localhost:3000 目录下是打包后的代码
webpack//      目录下是源代码

因为我们有了 source-map 所以可以由构建后的代码映射到源代码 从而提示源代码的错误

<br><br>

**<font color="#C2185B">inline-source-map</font>**  
source-map部分的代码 会和 build.js 文件 在一起(在打包代码的下方是一块整体) 没有 build.js.map文件
也叫做内联: *内联的构建速度更快*

\\ 作用 & 效果:
作用和 source-map 一致
xxx ---  print.js:5
只不过内联构建速度更快

<br><br>

**<font color="#C2185B">hidden-source-map</font>**  
source-map部分的代码 会单独成为一个文件 build.js.map
也叫做外联

\\ 作用 & 效果:
提示错误文件 和 错误位置 是构建后代码的位置 不能追踪到源代码的错误 只能提示到构建后代码的错误位置
我们点击进入后跳入的也是 构建后的代码位置 (倒是也能跳进入) 但是需要我们自己通过构建后的代码 去源代码里面找
xxx ---  build.js:11419

<br><br>

**<font color="#C2185B">eval-source-map</font>**  
也属于内联 
所有的js文件都打包在 build.js 文件中 该文件中的每一个js模块部分会单独生成source-map代码(*sourceMappingURL=data:xxx;base64*) 并且都在 eval() 中

\\ 作用 & 效果:
能够提示到准备的错误文件 和 错误位置 也能跳入到源代码中的错误的准确的位置

xxx ---  print.js?8da3:5

<br><br>

**<font color="#C2185B">nosource-source-map</font>**  
生成一个外部的source-map文件 build.js.map

\\ 作用 & 效果:
能够提示到准备的错误文件 和 错误位置
但是关联不到源代码上

xxx ---  print.js:5

<!-- 
  nosource
  hidden
  的作用都是为了隐藏源代码 防止程序员通过调试能找到源代码 照成源代码泄露 有些隐患
 -->

<br><br>

**<font color="#C2185B">cheap-source-map</font>**  
生成一个外部的source-map文件 build.js.map

\\ 作用 & 效果:
效果上和source-map一样
但是 source-map 的提示更加的准确 *cheap只是精确到行*

xxx ---  print.js:5

<br><br>

**<font color="#C2185B">cheap-module-source-map</font>**  
生成一个外部的source-map文件 build.js.map

\\ 作用 & 效果:
效果上和cheap-source-map一样
module会将loader的source-map也加进来
<!-- 
  cheap-source-map 不会添加loader的只会添加自己的source-map
 -->

<br><br>

**<font color="#C2185B">选哪个值?</font>**  
这里我们要考虑生产环境和开发环境

开发环境: 
考虑: 速度快一点 调试更友好

速度方面: 
eval > inline > cheap > source-map

比如我们可以选择
eval-source-map       很快
eval-cheap-source-map 更快 因为它只精确到行


调试方面:
source-map: 调试最友好
cheap-module-source-map: 其次
cheap-source-map: 再其次


<br>

### 总结: 开发环境下 选择 
eval-source-map(调试最友好)
eval-cheap-module-source-map(很快)
<!-- 
  vue react 脚手架中 默认使用的是 eval-source-map
 -->

<br><br>

生产环境:
考虑: 源代码是否要隐藏 调试要不要更友好

是否隐藏:
nosource-source-map(全部隐藏)
hidden-source-map(只隐藏构建后代码 会提示构建后代码错误)

调试友好:
source-map

**问题:**
内联会让代码体积变的非常大 所以在生产环境中是不用 内联的 一定要用外部的


<br>

### 总结: 生产环境下 选择 
source-map(调试更加友好)
cheap-module-source-map(速度稍微快点)
<!-- 
  如果要隐藏源代码 可以选择
  - nosource-source-map
  - hidden-source-map
 -->

<br>

### 开发环境中我们可以选择 eval-source-map 生产环境中选择 source-map




<br>

### 验证:
当我们输入 webpack 打包命令后 我们会发现 build目录下 出现了
  | - build
    - build.js
    - build.js.map

它提供了源代码和构建后代码的映射关系 有了source-map文件后 我们在运行 npx webpack-dev-server 后就可以通过点击跳到出错的位置了

<br><br>

# oneOf
我们在写loader的时候 rules里面有多少朵的loader规则
有处理 css文件的
有处理 js文件的 ...

我们项目中的一个文件都会过一遍loader 有些loader处理不了 有些loader会被命中 这样不太好

这时候我们不希望一个文件要过遍所有的loader 希望的是遇到一个匹配的就停止(好像 if(){...} 只会进入匹配的loader) 这时候我们可以使用 oneOf 选项

<br>

### oneOf
它能够提升构建速度 避免一个文件被多个loader都过一遍
优化环境下打包的构建速度的

类型: []
类面是一个个的loader配置项

```js
module: {
  rules: [
    {
      单独的loader配置
    },

    // 注意 rules数组中还有一个对象 对象里面才是oneOf
    {
      oneOf: [
        {loader配置1},
        {loader配置2},
        {loader配置3},
      ]
    }
  ]
}
```

**注意:**
不能有两个配置处理同一个类型的文件
比如有两个loader eslint-loader 和 babel-loader 都处理的是js类型的文件

如果把这两个loader都放在都放在 oneOf 里面那么只会匹配一个
所以我们要把其中的一个loader拿到外面去

```js
module: {
  rules: [
    {
      // 因为兼容性 和 eslint 都是对js文件做loader处理 所以要拿出来一个

      // eslint-loader单独的拿到外面 而且它还有 enforce 优先执行
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },

      // 剩下的loader放在里面做一一匹配
      oneOf: [
        {
          test: /\.css$/,
          use: [
            MniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-preset-env")()
                ]
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            MniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-preset-env")()
                ]
              }
            },
            "less-loader"
          ]
        },
        
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // 图片的处理
        {
          test: /\.(jpg|png|gif)$/,
          loader: "url-loader",
          options: {
            limit: 8 * 1024,
            name: "[hash:10].[ext]",
            outputPath: "imgs",
            esModule: false
          }
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
          exclude: /\.(js|jpg|png|gif|html|css|less)/,
          loader: "file-loader",
          options: {
            outputPath: "media"
          }
        }
      ]
    }
  ]
},
```

<br><br>

# 缓存
缓存主要是针对js代码的重复构建问题 生产环境中我们会利用缓存还解决和开发环境中HMR一样的问题

生产环境中 缓存的配置 缓存我们会从两个点出发
1. 从 babel入手 对babel进行缓存
2. 对我们加载的资源进行缓存

<br>

### babel缓存
babel的意思是 我们在写代码的时候 永远是js代码是最多的 结构和样式比较少
对babel进行缓存的原因是 因为babel要对我们写的js代码作编译处理 编译成我们浏览器能够识别的语法 在编译的过程中假设我们有100个js模块 当我们只改动了1个js模块 不可能将100个模块重新编译一遍 其他的99个应该是不变的(这点和HMR功能比较像 但是*生产环境中又不能使用HMR功能*, 因为HMR是基于devServer的 生产环境中不需要devServer)

我们期望的是 当babel做编译的时候 如果只有一个文件发生变化 那么应该只有这一个文件发生重编译其他的文件不变

这里我们就要开启babel缓存 它会将100个js文件编译后的文件进行缓存处理 将来再去做的时候 发现文件没有变化的时候 会直接使用缓存 不会再重新构建一次

<br>

### 开启 babel 缓存: cacheDirectory
在webpack.config.js配置文件中的babel-loader的配置项里面 添加 cacheDirectory: true 就好了
```js
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}


// webpack.config.js
{
  test: /\.js$/,
  exclude: /node-modules/,
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: {version: 3},
          targets: {
            chrome: "60",
            firefox: "50"
          }
        }
      ]
    ],
    // 开启 babel 缓存
    cacheDirectory: true
  }
}


// 要是我们使用的是babel.config.js文件的话就这样
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    cacheDirectory: true
  }
},
```

开启之后 当第二次构建时 会读取之前的缓存 这样速度会更快

<br><br>

<br>

### 文件资源缓存
服务端设置了 静态资源文件的缓存时间

我们为了测试缓存 我们要写一段服务器的代码
```js
// 服务器代码
const express = require("express")
const app = express()

// 创建静态资源文件夹
app.use(express.static("build", {maxAge: 1000 * 3600}))

app.listen(3000, () => {
   console.log("服务器已开启")
})
```

然后我们先进行次 webpack 打包
然后我们启动服务器 观察页面效果 观察下 NetWork

发现打包后的 build.js 文件的 *size列* 中会显示 
(memory cache)	

同时我们可以关注下 build.js 文件的ResponseHeaders
我们会发现 响应头有 Cache-Control: public, max-age=3600
该资源会被浏览器强制缓存一个小时

我们知道当我们的代码上线的时候都需要对资源进行缓存处理 因为做了缓存后 用户在第二次访问的时候就不会发很长的时间


**问题:**
但是这种缓存还会有其他的问题
当我们修改js代码 或者 css样式的之后 重新webpack构建 但是我们发现浏览器并没有发生变化

因为在缓存期(1小时)间浏览器是不会访问服务器的 它会直接读取本地的缓存

那就是说假使我们的资源在强缓存期间出现了严重的bug 我们开发会紧急修复 但是因为被强制缓存 所以没有办法进行修复 这个时候怎么办？

<br>

### 解决方式1: 利用 hash 值 修改资源文件名(js css)
这个时候我们可以在资源名称的后面做些处理 比如在资源名称的后面加上版本号 当我们下次更新的时候 会更新版本号 资源名称变了 这个资源就会重新提交 如果资源名称没有变才会走缓存

因为*每次打包后 webpack都会产生一个hash值* 我们将这个hash值放到 js文件 和 css文件 的名字里面

```js
// webpack.config.js
output: {
  filename: "build.[hash:10].js",
  path: resolve(__dirname, "build")
},
plugins: [
  // 提取css文件
  new MniCssExtractPlugin({
    filename: "build.[hash:10].css"
  }),
],
```

这样设置后 我们修改源代码 重新构建之后 资源的名称都不同 所以当每次构建后都会重新请求服务器获取最新的资源
<!-- 
  build.91bb16bf2b.css
  build.91bb16bf2b.js
 -->

**hash值产生的问题**
我们对js 和 css的打包后的文件上添加了hash值
当我们只改动css文件 一旦重新打包 js文件也会重新构建缓存就失效了

因为js和css同时使用了一个hash值 如果重新打包会导致所有缓存失效(我却只改动了一个文件)


<br>

### 解决方式2: 利用 chunkhash 值
修改方式 就是将 hash -> chunkhash
根据chunk生成的hash值 如果打包来源于同一个chunk hash值就一样

**这里有个小问题**
我们发现打包后的js和css的文件名上的hash值还是一样 因为css是在js中被引进来的 所以同属于一个chunk 所以chunkhash还是一样的

chunk的概念:
一个入口文件 这个入口文件中引入了其它依赖 所有根据入口文件引入的东西都会生成为一个chunk
<!--    
              ↗ css
  入口文件.js  → js     → 这些依赖最后会形成一个文件(chunk)
              ↘ ...
 -->


<br>

### 解决方式3: 利用 contenthash 值  -- 最终
它会根据文件的内容生成hash值 不同的文件hash值一定不一样
```js
// webpack.config.js
output: {
  filename: "build.[contenthash:10].js",
  path: resolve(__dirname, "build")
},
plugins: [
  // 提取css文件
  new MniCssExtractPlugin({
    filename: "build.[contenthash:10].css"
  }),
],
```

babel缓存是让第二次访问的速度更快
contenthash让代码上线运行缓存更好使用(开发环境的时候可以配置 HMR)

<br><br>

# tree shaking (树摇)
生产环境

我们可以将我们的应用程序想象成一棵树 而在应用程序中引入的源代码或者是jq react这些库就是一个活的树叶 这个库里面没有引用的代码就是枯萎的树叶 为了去掉这些枯萎的树叶 我们可以摇晃这棵树 这就是树摇

<br>

### 树摇的目的:
就是去除应用程序中 没有使用的代码 这样能让代码的体积变的更小
去除无用的代码(js代码或者css代码)
减少代码体积 请求更小 加载速度就越快

<br>

### 前提:
1. js文件里面必须使用es6模块化
2. 开启 mode: "production" 环境

满足前面的两个前提 就会*自动启动树摇* 

<br>

### 测试:
我们定义了一个js文件 入口文件中只引入了 mul 并没有引入 count
count对应我们的应用来讲就是 枯萎的叶子
当我们处于生产环境下 同时入口文件还是es6的模块化 这时候就会开启树摇
```js
// 入口文件 末尾加了.js 还报错呢
import { mul } from './test';


// 测试js文件
export function mul(x, y) {
  return x * y;
}

export function count(x, y) {
  return x - y;
}

```

<br>

### 结果:
我们观察了打包后的js代码 发现确实没有 x - y 的count()了


**注意:**
在不同的版本间 tree shaking 会有一些差异 它可能会无意间 将我们的css文件 当做未经引用的代码给干掉了

我们可以模拟下这个问题:
在 *package.json* 中 我们添加一个配置项

  "sideEffects": false

作用:
设置完后代表所有的代码是没有副作用的代码(都可以进行tree shaking)

如上设置完后 我们再进行 webpack打包 我们发现打包后的目录中 没有css文件了
<!-- 
  也就是说 它可能会将 css文件 或者 @babel/polyfill 文件都干掉
  因为它们只是引入 没有使用
 -->

<br>

### 为了避免不同的版本之间的差异 可以会将 css等在入口文件中引入但并没有使用的文件 干掉 我们可以进行如下配置
```json
"sideEffects": ["*.css", "@babel/polyfill"]
```
写在上面数组中的文件就不会被 tree shaking

<br>

### 总结:
最好是配置一下 sideEffects 将一些代码标记为没有副作用的代码 避免webpack版本的原因出现一些问题

<br><br>

# code split (代码分割)
将我们打包的一个chunk(输出的一个文件) 分割为多个文件
这样我们就可以实现各种功能 比如一个文件分割成3个 这样当我们加载的时候就可以并行加载

分割成多个文件后还可以实现按需加载的功能 需要再用 不需要就不用
<!-- 
  比如我们在开发单页面应用的时候 我们整个文件是特别大的 我们是按照路由去拆分一些文件 从而实现按需加载

  这里就要使用webpack技术 来代码分隔
 -->

代码分隔是针对 js代码 

代码分隔有很多种做法:

<br>

### 代码分割方式1: entry多入口方式 代码分割
场景描述:
我们有两个js文件 index.js 文件中 引入了 test.js 文件

```js
// 入口文件中引入了 test.js 文件
import { mul } from './test';


function sum(...args) {
  return args.reduce((pre, item) => pre + item, 0);
}
console.log(sum(1, 2, 3, 4, 5, 6));
console.log(mul(2, 3))
```

以上的代码中 当我们运行 webpack 后会将
  index.js
  test.js

打包成一个build.js文件 也就是它们两个js文件的内容都结合在一个build.js文件中了

现在我的需求是 这两个js文件 分别输出两个 bundle
这时候我们可以从webpack.config.js中的 入口配置项 进行操作

<br>

### entry: 多入口的时候配置成一个对象
这里我们把它的值设置为 {}
key为打包后的文件名 
```js
output: {
  filename: "[name].js",
  path: resolve(__dirname, "build")
},

/*
  output配置项中的filename: 
  1. 可以用hash来区分文件名 build.[contenthash:10].js
  2. 可以用 [name].js 这样取的就是 我们自定义的 key

  不然会报错!!!! 重名
*/
```

特点:
有一个入口 最终输出就会有一个bundle
有二个入口 最终输出就会有二个bundle

```js
module.exports = {
  entry: {
    main: "./index.js",
    test: "./assets/js/test.js"
  },
}
```

同时我们设置了两个入口文件 那么在 index.js 中 就不要引入test.js文件了

```js
// 不要引入了 因为我们把test.js也设置为了入口文件
// import { mul } from './assets/js/test';



function sum(...args) {
  return args.reduce((pre, item) => pre + item, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6));

// eslint-disable-next-line
console.log(mul(2, 3))

```

<br>

### 结果:
build.a578ea469f.js
build.dfb067e9d4.js
或者
main.js
test.js

entry的写法是字符串还是对象 也体现了单页面应用的配置(单入口) 和 多页面应用的配置(多入口)

<br><br> 

<br>

### 代码分割方式2: optimization - 单入口 提取node_modules 多入口 提取node_modules & 多入口中的公共文件

跟entry同级的配置项： optimization

**entry入口文件为 单入口 字符串形式**
既然现在的情景是单入口 那么我们就需要在 index.js 入口文件中引入第三方(node_modules)中的库

**runtimeChunk配置一样要加上**

```js
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: "all"
  },

  // 解决缓存失效
  runtimeChunk: {
    // 返回值是命名规则: 
    name: entrypoint => `runtime-${entrypoint.name}`
  }
}
```

<br>

### optimization作用:
可以将 node_modules 中的代码单独打包为一个chunk

<br>

### 优点:
最终打包成一个js文件的话 js文件的体积会非常的大
这个配置项可以将别人的*第三方的东西(库)*提取出来为一个chunk *自己写的东西*提取出来单独放在一起为一个chunk


<br>

### 情景演示:
webpack.config.js中没有进行代码分割的处理

我们在入口文件中引入了 jq 然后输出了下$
然后我们webpack命令打包 发现jq和index.js文件会打包生成在一个js文件里面
```js
// index.js 入口文件
import $ from "jquery"

console.log($)
```

结果:
main.js   88.9 KiB       0  [emitted]  main
index.js 和 jq 打包在了一个 main.js 文件中 体积是 89kb


当我们使用了 optimization 配置项后 webpack打包结果为
main.js   1.61 KiB       0  [emitted]  main
vendors~main.js     88 KiB       1  [emitted]  vendors~main

能看到 index.js 和 jq 分别被打包成了两个js文件


<br>

### 情景演示2:
如果 entry 为对象形式 也就是我们用了多入口的写法
```js
entry: {
  main: "./index.js",
  test: "./assets/js/test.js"
},

// index.js
import $ from "jquery"
console.log($)

// test.js
import $ from "jquery"
console.log($)

<br><br> 
webpack
```

同时 index.js 和 test.js 文件中都引入了jq库
然后我们webpack打包 会发现
index.js + jq = 生成了一个打包后的js文件 89kb
test.js + jq = 生成了一个打包后的js文件 89kb

也就是说 jq被多次打包到构建后的js文件中了 这样会产生一个问题 以后我在a组件里面引入了jq b组件里面引入了jq 这样就会导致这个库被重复的加载

我们通常的做法都是将jq弄成单独的一个chunk 
这时候我们就是可以在*多入口文件*的同时 配合 *optimization配置项*来完成 提取node_modules里面的库为单独的一个chunk 
<!-- 
  optimizaion提取对象:
  1. node_modules
  2. 多个入口文件中的公共文件 (多入口的场景下)
 -->

这样jq就不会被打包多次

```js
// webpack.config.js

entry: {
  main: "./index.js",
  test: "./assets/js/test.js"
},


optimization: {
  splitChunks: {
    chunks: "all"
  },

  // 解决缓存失效 做代码分割的时候一定要加
  runtimeChunk: {
    // 返回值是命名规则: 
    name: entrypoint => `runtime-${entrypoint.name}`
  }
}
```


<br>

### optimization配置项的总结:
1. 可以将node_modules中代码单独打包成一个chunk最终单独输出
2. 如果是多入口文件的时候 optimization会自动分析多入口文件中 有没有公共的依赖(公共的文件) 如果有会打包成单独的一个chunk

如果我们的应用是单页面应用 entry为单入口 那么加上optimization配置项可以将node_modules里面的东西打包出来

如果我们的应用是多页面应用 entry为多入口 那么它会帮我们自动分析多入口文件中的公共文件 将其提取出来进行打包 就不会重复的加载公共的东西了 同时多入口的时候也会提取node_modules里面的东西哦


**注意:**
这个公共的文件至少要求几十kb以上 太小也不行

<br><br> 

<br>

### 代码分割方式3: 通过import() 让某个文件单独打包为一个chunk
上面我们说了 
如果我们配置的是 多入口形式
那么打包的时候 就会按照 各个入口文件来进行分别打包

如果我们是 单入口形式 
配合 optimization配置项 那么只能提取node_modules中的代码进行打包

那有没有 单入口形式 但是我们也想将指定的js文件(比如上面的test.js文件)单独打包呢？

如果我们在 index.js 文件中 引入 test.js 那么它们最终会打包在一起

想要完成上面的事情 我们可以通过 写js代码来完成

我们通过

**<font color="#C2185B">import("要单独打包的文件路径")</font>**  
import()动态导入语法, 能将某个文件单独打包

特点:
我们发现test.js文件被打包成 1.js
因为它会根据id去命名 该id会随着文件数量的递增id可能会变
所以 一般我们会用下面的语法

**<font color="#C2185B">import(/* webpackChunkName: 'test' */"./test")</font>**  
在路径前面 使用了 webpack特殊注释 来指定打包后的文件名
/* webpackChunkName: 'test' */ 

```js
// index.js 入口文件 通过下面的方式引入
import("./assets/js/test").then(
  module => {
    console.log("文件加载成功");
    console.log(module)
  }
).catch(
  () => {
    console.log("文件加载失败")
  }
) 

function sum(...args) {
  return args.reduce((pre, item) => pre + item, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6));
```

上面的then()方法中的module 就是test文件
如果我们想要拿到 test文件中的内容 要 解构出来
**单独暴露的话我们直接结构暴露对象 默认暴露的话我们结构default属性**
```js
// export 暴露
import("./assets/js/test").then(
  // 从 module 中 解构出来 mul count
  ({mul, count}) => {
    ...
  }
)

// export default 暴露
import("./assets/js/add")
  // 因为是默认暴露 所以我们提取的是 default 然后重命名
  .then(({defaule: add}) => {

  })
```

我们发现通过上面的方式引入的文件 会被单独打包为 1.js 文件
1.js      226 bytes   1  [emitted]
main.js   2.23 KiB    0  [emitted]  main

**修改打包后文件名为id的1.js为指定文件名**
```js
import(/* webpackChunkName: 'test'*/"./assets/js/test").then(
  res => {
    console.log("文件加载成功");
    console.log(res)
  }
).catch(
  () => {
    console.log("文件加载失败")
  }
) 

```

<br>

### 总结:
单页面应用的时候我们更多的是选择第三种配置方式
```js
单入口 + optimization + [import(/* webpackChunkName: ''*/ "文件路径")]
```
能够保证将node_modules的代码进行分割的同时 其次其它文件也希望单独打包成一个chunk 通过import()的方式去控制

这样我们将来的代码不会是一个巨大的js文件 而是拆分成多个小的js文件 从而实现并行加载 速度更快

<br><br>

# 懒加载(lazy_loading) 和 预加载(webpack注释: webpackPrefetch)
这里的懒加载指的是js代码的懒加载 
懒加载也可以叫做延迟加载 不是一上来就全部加载 而是触发了一定条件后才开始加载

演示:
html部分
```html
<body>
  <h3>hello lazy loading</h3>
  <button>click</button>
</body>
</html>
```

js部分
```js
console.log("index.js文件被加载了")

import {mul} from "./assets/js/test"

let btn = document.querySelector("button")
btn.addEventListener("click", () => {
  console.log(mul(3, 3));
})
```

没做懒加载处理的情况下
我们发现 我们并没有点击按钮但是 index.js test.js 文件一上来就被加载了 控制台显示
```js
test.js文件被加载了
index.js文件被加载了
```

但是 test.js 文件一上来是不需要加载的 而是当我们点击按钮的时候 它才应该被加载 所以我们的需求是想对test.js文件进行懒加载
<!-- 
  不要一上来就加载 而是等我点击按钮的时候再加载
 -->

<br>

### 懒加载: import().then()
使用 import() 动态加载的语法 然后在then()中成功的回调内相应的事情 哪个地方需要 目标js文件 哪个地方 引入和使用一起进行

```js
console.log("index.js文件被加载了")

let btn = document.querySelector("button")
btn.addEventListener("click", () => {
  
  import("./assets/js/test").then(({mul}) => {
    console.log(mul(3, 3))
  })

})
```

<br>

### 要点:
1. 这时我们发现当页面加载时 仅加载了index.js文件 而test.js是我们点击按钮后才加载的

2. 懒加载可以理解为 引入和使用引入文件的部分 都是通过 import().then() 来完成的

3. 也可以通过 /* webpackChunkName: 文件名 */ 来指定test文件打包后的名称
```js
import(/* webpackChunkName: 'test' */"./assets/js/test").then(({mul}) => {
  console.log(mul(3, 3))
})
```

4. 我们使用了 import() 动态加载的js文件 所以一定会进行分割代码的
因为要先进行分割把test.js文件从打包后的大js文件中分割出来 然后才能懒加载

5. test.js文件 并不会重新加载 第二次的时候会先走js缓存


<br>

### 预加载: 特殊注释 webpackPrefetch: true
我们在上面懒加载 import() 的代码中 添加 *特殊注释webpackPrefetch: true*
```js
import(/* webpackChunkName: 'test', webpackPrefetch: true */"./assets/js/test").then(({mul}) => {
  console.log(mul(3, 3))
})
```

加上特殊注释后我们发现 打包 webpack 后 打包信息里有一句代码:

  main.js   2.43 KiB       0  [emitted]  main
  test.js   267 bytes      1  [emitted]  test

  Entrypoint main = main.js *(prefetch: test.js)*

chunk还是2个 但是下面多了prefetch代码 也就是说 test文件使用 prefetch 技术


<br>

### 作用:
页面第一次加载的时候 test.js 文件已经被加载了(可以看network)
当我们点击按钮调用的时候 走的都是 test.js 的缓存(预加载的)

<br>

### 和只用懒加载的区别
懒加载的时候 我们看network 页面加载的时候 test.js 文件并没有被加载 而是等到按钮被点击的时候 才加载的

而预加载是 页面加载的时候 test.js 文件已经被加载了 等我们点击按钮的时候 走的是预加载时候缓存起来的js文件


<br>

### 总结:
正常加载: 
可以理解为并行加载 同一时间加载很多文件(比如并行加载的时候一次只能加载6个文件) 文件越多加载速度就越慢(其他文件会靠后加载) 并行加载的时候也没有先后顺序 也就是说 test.js 文件假如被先加载了 可能test.js文件先加载进来但是并没有什么用 这样浪费时间 浪费有用的文件的名额


预加载 prefetch:  
会在使用之前 提前加载js文件
预加载是加载时机是 *等其他的资源加载完毕 等浏览器空闲了* 再偷偷的加载资源 
**兼容性很差(只能在pc段高版本的浏览器中使用 移动端和ie会有相当大的兼容性问题 慎用！！！)**


懒加载: 当文件需要用的时候才加载
如果要加载的文件体积比较大 就会需要等一段较长的时间才会有反应 配合预加载就可以完成 当用户点击的时候 已经偷偷的加载好了 不会有不好的体验

<br>

### 总结: 可以考虑懒加载 预加载慎用

<br><br>

# PWA (渐进式网络开发应用程序)
让我们的应用 离线也可以访问的技术

作用:
让我们的网页像app应用程序一样 离线也可以访问 性能也更好
但是因为兼容性问题 普及起来的话还需要一定的时间
<!-- 
  淘宝都在使用 pwa

  我们可以登录一个网站 在network中 调节成 离线状态 刷新 正常我们就访问不了任何东西了

  所有网页如果没有pwa技术都是这样的结果 但是有pwa技术的网站 调节成 离线状态 刷新后 仍然可以浏览淘宝页面

  当然访问的内容是有限的 并不是所有内容都能访问

  我们观察 network 发现
  有红色未加载的 和 黑色已加载的 黑色已加载的就是 离线的时候仍可以访问的内容

  而这些黑色已加载的部分 基本上都来自于为 ServiceWorker(pwa提供的技术)
 -->


<br>

### 使用方式:
pwa技术主要是通过 workbox库 来实现的 而我们在webpack中主要使用插件: workbox-webpack-plugin 来使用

**<font color="#C2185B">1. 下载</font>**  
npm i workbox-webpack-plugin -D
<!-- 
  @5.0.0
 -->


**<font color="#C2185B">2. 引入</font>**  
```js
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
```

**<font color="#C2185B">3. 在 plugins 配置项中配置</font>**  
配置对象中的操作的作用:
1. 帮助 serviceworker 快速启动
2. 删除旧的 serviceworker 

这样插件就会帮我们生成一个 servicework 的配置文件
接下来我们就要通过这个配置文件 注册servicework
```js
plugins: [
  
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true
  })

],
```


**<font color="#C2185B">4. 在入口js文件中注册servicework</font>**  
**<font color="#C2185B">navigator.serviceWorker.register("配置文件")</font>**  
注册 serviceWorker
该配置文件由第3步中的插件自动生成

```js
// index.js 里面写下面的代码
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      // eslint-disable-next-line
        console.log('servicework注册成功');
    }).catch(() => {
      // eslint-disable-next-line
        console.log('servicework注册失败');
    });
  });
}

// 注意: 链式调用的.最好连上
```

这时候为了避免eslint不认识 window等全局变量 要这么配置 package.json
```js
"eslintConfig": {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true
  }
}
```


**<font color="#C2185B">5. sw代码必须运行在服务器上 所以我们必须通过服务器的方式启动构建后的文件</font>**  
1. node.js

2. npm i serve -g
<!-- 
  方式2可以帮我们快速的创建一个静态资源服务器
 -->

安装了serve包后 全局就会多了一个指令 serve
serve -s build(要运行代码的目录 - 一般是构建后的目录)
<!-- 
  这样就会将指定文件夹下的资源 部署成静态资源
  将build目录下的所有资源作为静态资源暴露出去
 -->


<br>

### 验证:
我们可以在 application 面板中 左侧的菜单来中有 Service Workers
我们可以看到服务器的信息

左侧菜单栏中的 cache storage中能看到 workbox 缓存的数据
然后将网络调节成offline 我们发现我们的页面还是可以访问的 因为资源会从 Service Worker 中获取

<br><br>

# 多进程打包 thread loader
js的主线程是单线程的 也就是说它同一时间只能处理一件事 如果事情比较多就需要排队一件事情处理完成后才能处理下一件事情

所以我们可以通过多进程的方式优化打包速度 同一时间我们可以用两三个进程处理这件事情 速度会更快

<br>

### 使用方式: 
我们需要下载 thread-loader

**<font color="#C2185B">1. 下载</font>**  
npm i thread-loader -D
<!-- 
  @2.1.3
 -->

**<font color="#C2185B">2. 在loader的配置项中 将要多进程打包的loader 放到 thread-loader 的后面</font>**  
默认启动的进程为 cup核数-1
如果想调整 开启的进程数 可以将 thread-laoder 写成一个对象
```js
  {
    loader: "thread-loader",
    options: {
      workers: 2 // 指定开启两个进程
    }
  }
```


<br>

### 示例:
我们对babel-loader使用多进程处理 将babel-loader放在thread-loader的后面 都是对同一类型的文件进行loader处理 所以用use

```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: 2 // 进程2个
        }
      },
      {
        loader: 'babel-loader',
      }
    ]
  },
]
```

如果还要对js文件进行eslint验证的话 那么eslint要放在前面 使用oneOf比较好
```js
// rules里面都是对象
rules: [
  {
    test: /\.js$/,
    loader: "eslint-loader"
  }
  {
    // 对象里面有oneOf属性值为数组 数组里面和rules是一样的一个个{}
    oneOf: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "thread-loader"
          },
          {
            后面的这个loader就是要开启多进程的loader
          }
        ]
      }
    ]
  }
]
```

**注意:**
开启多进程打包是有利有弊的如果用的好速度会很快 如果用不好反而会非常的慢 因为进程的开启是有时间的 启动时间大概为600ms 进程通信(进程间会进行通信 比如进程1告诉别的进程这件事情我干完了)也需要花时间

比如这件事情本来需要100ms就干完了 结果我们让该事情进行多进程打包 反而慢了 只有工作消耗时间比较长 才需要多进程打包 所以一般是js文件 babel一般需要编译和转换所以消耗时间比较长


<br>

### 完整示例:
```js
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  entry: './index.js',
  output: {
    filename: 'build.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下loader只会匹配一个
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },

          // 对js类型的文件进行babel兼容性处理的同时 开启多进程打包
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              /* 
                开启多进程打包。 
                进程启动大概为600ms，进程通信也有开销。
                只有工作消耗时间比较长，才需要多进程打包
              */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2 // 进程2个
                }
              },
              {
                loader: 'babel-loader',
              }
            ]
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'build.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  mode: 'production',
  devtool: 'source-map'
};
```

<br><br>

# externals 配置项
作用:
防止将某些包 打包进最终我们输出的bundle.js中
打包的时候将会忽略我们指定的包
<!-- 
  比如我们用了jq依赖 而jq我们希望它是通过cdn连接引入进来的 这时候我们就可以利用externals给它禁止掉 这样jq就不会被打包了
  我们会从cdn链接中使用jq
 -->

之后该包会通过手动 通过cdn引入该资源

<br>

### 使用场景:
比如我们的项目中有一些包可以通过cdn的方式使用 那么我们可以通过 externals 将这些包 在打包的时候忽略掉
用的时候可以从node_modules里面引入 但是不用担心会打包进bundle里面


**<font color="#C2185B">externals配置项</font>**  
类型: {}

作用：
如果我们可以通过cdn来引入的包 我们就可以通过 externals 来进行忽略 然后在html文件中 通过cdn引入

```js
mode: "production",

// 指定的包 将不会打包进最终的文件中
externals: {
  // key: npm包下的包名, value: 是页面引入jq时提供的变量 jQuery or $ 都可以
  jquery: "jQuery",
}


// index.js
import $ from "jquery"
console.log($)
```

我们打包的时候忽略jq了 那我们还想用的话 可以在html文件中 使用cdn来引入

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
```

<!-- 
  为什么cdn更快？
 -->

<br><br>

# dll动态连接库
它类似externals一样 会指示webpack 哪些库是不参与打包的

区别是我们会通过 webpack.dll.js 配置文件 来指定哪些 库或者包 不参与打包
将这些不参数打包的库 各自生成为各自的chunk
然后通过 AddAssetHtmlWebpackPlugin 插件 将这些不参与打包的库自动在html文件中引入 供我们使用


<br>

### 使用场景：
正常情况下当我们在入口文件中引入了 node_modules 下的包的时候 最终会将引入的包 打包成一个chunk(build.js) 
但是我们第三方库又非常的多 如果全部打包成一个文件 文件的体积就太大了 

所以通过dll技术 我们可以将这些库各自打包成各自的chunk 然后通过插件 在html中引入 这样就从build.js中分离出去了 build.js就体积就很小
这样更加有利于我们性能的优化


<br>

### 使用方式
**<font color="#C2185B">1. webpack.dll.js 配置文件</font>**  
要想使用 dll 的话 那我们就要使用另一种配置文件
文件名任意
当我们执行 该配置文件的时候 是通过

作用:
使用dll技术对某些库(第三方的库: jq react vue)单独进行打包为一个chunk文件 
将该第三方库从最终js文件中分离 方便我们通过插件将该库在html文件中引入

**<font color="#C2185B">webpack --config webpack.dll.js</font>**  
这个命令执行的 所以文件名任意


**<font color="#C2185B">webpack.dll.js 配置文件 的内容</font>**  

```js
const { resolve } = require('path');

// 引入webpack自带的插件webpack 该插件不用下载
const webpack = require('webpack');

module.exports = {
  entry: {
    jquery: ["jquery"]
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
    library: "[name]_[hash:5]"
  },


  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[hash:5]", // 映射库的暴露的内容是什么,
      path: resolve(__dirname, "dll/manifest.json") 
    })
  ],

  mode: "production"
}
```

解析:
entry 和 output 配置项:
用于将 某个第三方库单独打包成一个chunk文件 

\\ entry:
```js
// key为打包后的文件名 
// value为 将哪些库打包成一个chunk 再有别的库再添加属性就可以 ， ， ， 
entry: {
  jquery: ["jquery"],
  // 这样可以把react相关的库 打包成一个chunk
  react: ["react", "react-dom", "react-router-dom"]
},

// 
```

\\ output:
```js
output: {
  // 指明打包后的名字 
  filename: "[name].js",
  // 指明打包后文件存在的路径
  path: resolve(__dirname, "dll"),
  // 指明打包后文件的内容 叫什么 比如我们将jq打包出去了 那么jquery的文件内容里面就有 jquery_hasdf 
  library: "[name]_[hash:5]"
},
```

\\ plugins
这里面我们使用了 webpack身上的一个插件 new webpack.DllPlugin()
作用:
它会生成一个映射文件manifest.json 我们单独打包出去的库 都会在这个映射文件中 这个映射文件当中包含了所有单独打包出去的第三方库

该配置文件用于告诉 webpack.config.js 文件 打包的时候参考 manifest.json 不要将里面的库打包
```js
plugins: [
  new webpack.DllPlugin({
    // 需要和 library 的名字一样
    name: "[name]_[hash:5]", 
    // manifest.json输出在哪里
    path: resolve(__dirname, "dll/manifest.json") 
  })
],
```


**<font color="#C2185B">2. webpack --config webpack.dll.js</font>**  
运行 webpack.dll.js 文件 将配置的第三方库进行打包处理
```js 
  // manifest.json
  {"name":"jquery_d468b","content":{"./node_modules/jquery/dist/jquery.js":{"id":1,"buildMeta":{"providedExports":true}}}}
```

**<font color="#C2185B">3. 配置 webpack.config.js 文件</font>**  
npm i add-asset-html-webpack-plugin -D
<!-- 
  @5.0.2
 -->

```js
const webpack = require("webpack")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),

  // 通过 webpack 身上的该插件 找到 manifest.json 文件 告诉webpack.config.js 程序打包的时候 忽略manifest.json中的库
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, "dll/manifest.json")
  }),

  // 通过该插件 指明单独打包出去的第三方库 自动在html文件中引入使用
  new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, "dll/jquery.js")
  })
],
```

然后我们通过 webpack 打包后 会发现第三方的库没有打包进build.js中

<br>

### 总结:
也就是说我们知道dll 和 externals后 就可以考虑第三方的库怎么处理了 在不打包进最终的bundle的同时 怎么处理
externals: 彻底不打包第三方库 需要手动cdn引入
dll: 需要打包第三方库 需要打包一次 将来就不用重复打包了

也就是说假如我们是通过cdn引入的话 我们使用 externals
如果是第三的库我们打包之后的js文件 用自己的服务器暴露出去 从静态资源文件夹中自动引入到html文件中的话 使用dll

<br><br>

<br>

### 完整代码:
webpack.dll.js
```js
const { resolve } = require('path');
// 引入webpack自带的插件webpack
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> 是jquery
    // ["jquery"] 要打包的库名是jquery 因为是个数组 跟jquery相关的库都可以写里面
    jquery: ["jquery"]
  },
  output: {
    // 打包后的名字 指定为 jquery
    filename: "[name].js",
    // 将单独打包的库 打包到dll目录下
    path: resolve(__dirname, "dll"),
    // 打包的库里面向外暴露出去的内容叫什么名字
    library: "[name]_[hash:5]"
  },

  // 上面的两个配置是用来专门打包jquery的 同时jquery向外暴露的名称是"[name]_[hash:5]"


  // 上面我们将jquery单独进行打包 但是需要跟webpack建立起依赖关系 需要告诉webpack将来你在打包的时候 不要再打包jquery了 这时候我们要借助一个插件生成一个文件
  plugins: [
    // 这个插件的作用是帮我们生成一个 manifest.json 文件 该文件提供和jquery的一个映射关系 通过这个映射就能知道 webpack在打包的时候 就不用打包jquery了 并且告诉我们不需要打包的包的名称是 [name]_[hash:5]
    new webpack.DllPlugin({
      // 这个name要和上面 libray 中的值一样
      name: "[name]_[hash:5]", // 映射库的暴露的内容是什么,
      // 最终这个文件输出到哪里去
      path: resolve(__dirname, "dll/manifest.json") 
    })
  ],

  // 指定生产模式
  mode: "production"
}

// 一旦我们进行webpack 就会对jquery这个库单独打包 并生成一个 manifest.json 文件 提供和单独打包的这个库的映射关系
// 这里注意我们的库名是 webpack.dll.js 
// 当我们运行webpack指令的时候 默认会查找 webpack.config.js 这个文件 而现在我们需要运行的是 webpack.dll.js 文件
// 我们通过 webpack --config webpack.dll.js --config参数来指定我们运行的配置文件是哪一个
```


webpack.config.js
```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
const webpack = require("webpack")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

module.exports = {
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // 告诉webpack哪些库不参与打包 同时使用的时候名称也得变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json")
    }),
    // 将某个文件打包输出去 并在html中自动引入该文件
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, "dll/jquery.js")
    })
  ],
  mode: "production",
}


// npm i add-asset-html-webpack-plugin -D
```

<br><br>

# 性能优化总结篇
<br>

### 开发环境性能优化:
1. 优化打包构建速度:
开发环境下使用的是 HMR 功能 热模块替换
<!-- 
  如果只有一个模块发生变化 那只会构建这一个模块 
  而其他的模块会用之前的缓存
 -->

HMR功能会针对
css  -> 开发环境下会使用 *style-loader* 默认就会开启 HMR 功能
js   -> 需要通过js代码来完成 if(module.hot) { ... }
<!-- 
  当内部这个文件发生变化的时候 其他的模块就不会打包了
 -->

html -> 它不需要做HMR

2. 优化代码调试:
这里我们使用了 source-map 技术 让我们在开发环境下的调试更加的友好
<!-- 
  提供源代码到构建后代码的映射技术 一旦构建后的代码出错了 我们不利于去看到底出了什么错 所以就提供了一个跟构建后代码和源代码映射的东西

  通过source-map就能找到源代码哪里出错了 方便去修改代码
 -->

一般开发模式下会选择内联(eval-source-map) 生产模式下会选择(source-map)

<br>

### 总结:
我们对开发环境的优化 考虑的点没有太多 最关键的点就是打包速度让它更快些


<br>

### 生产环境性能优化
**<font color="#C2185B">1. 优化打包构建速度</font>**  
**<font color="#C2185B">1.1 oneOf </font>**  
注意: 一个文件类型 通过两个loader来处理的时候 要把其中的一个loader拿出oneOf
<!-- 
  默认情况下我们设置了很多loader 每一个文件都要通过这些loader一起处理
  使用 oneOf 匹配一个loader后 后面的loader就不用匹配了 能够提升一定的性能

  那开发环境为啥不用oneOf? 可以吧
 -->

**<font color="#C2185B">1.2 缓存</font>**  
babel缓存: 是用来优化打包构建速度 第二次打包的时候速度就会快一些 开启babel缓存会更加
<!-- 
  js代码多就意味着多js的处理花费的时间是最长的
 -->

**<font color="#C2185B">1.3 多进程打包</font>**  
能够提升打包速度 缺点就是每个进程的开启和通信都会有开销600ms左右

**<font color="#C2185B">1.4 externals</font>**  
让指定的库不参与打包 通过手动cdn来引入
<!-- 
  比如 react 和 vue 库我们不打包了 我们通过cdn直接引入
 -->

**<font color="#C2185B">1.5 dll</font>**  
让指定的库不参与打包到bundle 通过插件引入 
<!-- 
  它会将 vue react 先打包好 后面我们就直接用打包好的库就好了
  有人说dll过时了

  dll可以将node_modules中的指定库分别进行拆分成不同的js 剩下的可以通过 externals打包成一个js
 -->


**<font color="#C2185B">2. 优化代码运行的性能 (重要)</font>**  
**<font color="#C2185B">2.1 设置强制缓存处理 但要搭配hash值(hash - chunkhash - contenthash)</font>**  
chunkhash: 如果打包是来自于同一个入口 就同属于同一个chunk 共享同一个hash值
contenthash: 根据内容生产hash值 文件内容不同 hash就不一样

**<font color="#C2185B">2.2 tree shaking</font>**  
去除我们应用程序中没有使用的代码 让我们应用的代码的体积更小 体积小请求速度就快
前提: es6 + production + [package.json - sideEffect]
<!--  
  有一种代码 只是在入口文件中 引入但没有使用 比如 obeserver
  这种代码可能会被 树摇摇下去 所以要搭配 sideEffect
 -->

**<font color="#C2185B">2.3 code split</font>**  
用来优化代码性能
\\ 场景1: 单入口
单入口默认情况下输出只有一个bundle 将来所有的js文件会被打包成一个bundle 要是1000个模块输出到一个bundle中 代码体积就会变的非常的大 所以要进行代码分隔 将一个大的js文件拆分成多个小js文件

这样可以并行加载多个js文件 这样比加载一个大的js文件速度更快
单入口文件的代码分隔方案
  - 1. optimization 将node-modules里面的东西单独打包成一个chunk
  - 2. import()语法 对指定的js代码进行分割

\\ 场景2: 多入口
有几个入口就会输出几个bundle文件
多入口的话也会加上 optimization 来提取多入口的公共文件成为一个文件
如果没有 optimization 的话多入口会打包重复的代码
同时 optimization 也可以提取node_modules里面的代码
多入口的场景下 也可以用 import()语法来分割指定js代码


然后我们还可以对上面分割出来的第三方库的代码 通过 dll 技术再次的对它们进行打包 这样可以对第三方库再次的细化 比如我们引用了10个第三方库打包成一个文件的话 那就比较大 通过dll技术 我们就可以把这10个库单独分割成10个js 这样又会细化一些

<!-- 
  optimization: 是将node-modules里面的东西打包成一个js 
  dll: 是对第三方库 再次的细化 一个库 对应一个 js
 -->


**<font color="#C2185B">2.4 懒加载 / 预加载</font>**  
js代码的懒加载 也是利用了代码分割的技术 
预加载的技术比懒加载更好些 但是有严重的兼容性问题


**<font color="#C2185B">2.5 PWA</font>**  
离线可访问技术 让我们的程序变的更加的友好 兼容性不太好 缓存需要自己考虑怎么处理



**<font color="#C2185B">总结:</font>**  
对于生产环境我们需要考虑的点就非常的复杂 我们要考虑的面面俱到 目的是让我们将来上线的代码 性能能够达到最好 从而让用户体验好

<br><br>

# webpack配置详解 - entry

<br>

### entry:
代表入口文件的起点:

**<font color="#C2185B">1. 值为 string: "入口文件的路径"</font>**  
单入口

\\ 特点: 
入口文件中依赖文件 会打包成一个chunk 输出为一个bundle


\\ 输出bundle的文件名:
如果 output 中filename为指定 那么输出的bundle的文件名为指定文件名 如: build.js

如果 output 中filename为 [name] 那么值为string的情况下 输出的bundle名为 *mian*


```js
entry: "./index.js",
output: {
  filename: "build.js" | "[name].js",
  path: resolve(__dirname, "build")
},
```

**<font color="#C2185B">2. 值为 array: ["文件路径","文件路径"]</font>**  
多入口
数组形式指定的多入口文件 所有的入口文件最终只会形成一个chunk 输出出去只有一个bundle

\\ 特点:
数组中的所有文件都会打包到*元素1*的js文件里面去 第一个js文件默认叫main
<!-- 
  比如下面代码中 add.js 会打包进 index.js 文件中
  注意: 这时候就不用再在index.js文件中引入add.js了
 -->

\\ 使用场景：
1. HMR功能的时候发现html文件不能热更新了 所以将html文件也放入数组中
<!-- 
  entry: ["./index.js", "./src/index.html"],
 -->

2. 写babel的时候 我们需要在入口文件中引入babel文件的时候 也可以利用entry的数组格式
<!-- 
  entry: ['./polyfill.js', './a.js'],
 -->

```js
entry: ["./index.js", "./assets/js/add/js"],
output: {
  filename: "build.js" | "[name].js",
  path: resolve(__dirname, "build")
},
```

**<font color="#C2185B">3. 值为 object:</font>**  
多入口
key为文件名称 value为文件路径

\\ 特点:
有几个入口文件就会有几个chunk 输出的时候也会对应有几个bundle
chunk的名称为 key

```js
entry: {
  index: "./index.js",
  add: "./assets/js/add,js"
},
output: {
  // 这时候就不能指定文件名了
  filename: "[name].js",
  path: resolve(__dirname, "build")
},


// 特殊用法:
entry: {
  // 将多个js文件打包成一个bundle
  index: ["./index.js", "./assets/js/count.js"],
  // 这个js文件单独进行打包
  add: "./assets/js/add,js"
},
```

<br><br>

# webpack配置详解 - output

<br>

### output:
```js
output: {
  filename: 打包后的文件的名称(还可以指定文件的目录 js/build.js),

  path: 指定输出的文件目录(将来所有资源输出的公共目录),

  publicPath: "/",

}
```

\\ filaname:

<br><br>

\\ path:

<br><br>

\\ publicPath:
决定资源引入时候的路径
值一般为 / 在生产环境中使用 当我们代码上线的时候 更倾向于使用这种路径
```html 
<img src="/assest/imgs/a.jpg">
```
表示所有资源引入的公共路径的前缀 当设置了 publicPath之后 我们例如图片src里面的路径前 就要加上/
加上了就是在当前服务器的根目录找对应的资源
<!-- 
  比如:
  - 有一张图片 imgs/a.jpg
  - 因为我们设置了 publicPath 为 / 它又是所有引入资源的路径的前缀

  - 就会变成
  - imgs/a.jpg    
      -- 在当前路径下直接找imgs目录

  - /imgs/a.jpg   
      -- / 会以当前的服务器地址去补充 会去服务器根目录下找imgs目录
 -->

<br>

### 示例:
当我们不加 publicPath 属性的时候 html里的结果为
```js
module.exports = {
  entry: "./index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build")
  },
}
```

```html
<!-- 在当前目录下找js目录 -->
<script type="text/javascript" src="js/build.js"></script>
```


当我们加上 publicPath 属性的时候 html里面的结果为
```js
module.exports = {
  entry: "./index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build"),

    // 加上
    publicPath: "/"
  },
}
```

```html
<script type="text/javascript" src="/js/build.js"></script>
```

<br><br>

\\ chunkFilename: "[name]_chunk.js"
决定非入口chunk文件的名称(也可以指定文件目录)
<!-- 
  entry指定的是入口文件 入口文件的命名是通过 filename属性
  而非入口文件的命名就是通过 chunkFilename属性

  // 指定文件目录
  chunkFilename: "js/[name]_chunk.js"
 -->

场景:
通过 import() 语法 会将js文件单独的分割成一个chunk 这个js文件就会通过 chunkFilename 来命名

通过 optimization 将node_modules里面的库分割为一个chunk 这个也会通过 chunkFilename 来命名

<br>

### 示例: 
我们没有使用 chunkFilename 属性 打包index.js文件 我们观察下 add.js 文件打包后的名字
```js
// index.js
import count from "./assets/js/count"

import("./assets/js/add")
  // 因为是默认暴露 所以我们提取的是 default 然后重命名
  .then(({defaule: add}) => {
    console.log("add", add(1, 2))
  })

console.log("count", count(2, 1))


// webpack.config.js
module.exports = {
  entry: "./index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
    publicPath: "/",
    // chunkFilename: "[name]_chunk.js"
  },
}
```

结果为 0.js 没有加chunkFilename 和 使用 webpack特殊注释的时候 会是通过id来命名的

当我们加上 chunkFilename之后
结果为 0_chunk.js

<!-- 
  晕 这不都是 id 命名么 还不如 webpack特殊注释呢
 -->

<br><br>

\\ library: "[name]"
入口文件文件被打包后 将其打包后的内容供外部使用
它会向全局暴露出去一个变量[name] 这就是整个库向外暴露的变量名
<!--  
  我们打包后的bundle文件的格式为

    (function(modules)){}({ 这里是我们打包后的代码})

  打包后的代码是通过参数传递到 这个自调用函数中的 都在函数作用域在里面 外面引用是不能的 如果我们想把打包后的内容暴露出去供外部使用的话 就可以使用这个配置项

  当我们指定了这个配置项后 打包后的bundle文件的格式为

    var main = 
      (function(modules)){}({ 这里是我们打包后的代码})

  我们打包后的文件默认就是main 它想全局暴露出去一个 main 的变量
  所以外界在引入这个js文件后就能找到main这个变量 从而使用里面的值
 -->


\\ libraryTarget: "window"
将 library配置项 暴露出去的变量挂载到哪里 比如我们挂载到window下
browser: 可以是window
nodejs: 可以是global
<!-- 
  当我们指定了这个配置项后 打包后的bundle文件的格式为

    window["main"] = 
      (function(modules)){}({ 这里是我们打包后的代码})
 -->

libraryTarget: "commonjs | amd | ..."
变量会用commonjs的模块化方法进行暴露 这样以后就可以通过 commonjs 的语法引入
<!-- 
  exports["main"] = 
    (function(modules)){}({ 这里是我们打包后的代码})
 -->

场景:
通常都是向外暴露哪个库的时候使用 比如配合dll

<br><br>

# webpack配置详解 - module

**<font color="#C2185B">module</font>**  
常用属性:

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.js$/,

      // 排除 指定文件夹
      exclude: /node_modules/,

      // 只检查 src 下的 js文件
      include: resolve(__dirname, "src"),

      // 优先执行 | 最后执行
      enforce: "pre | post"

      loader: "eslint-loader",

      options: {}
    },
    {
      // 以下配置只会生效一个
      oneOf: []
    }
  ]
}
```

<br><br>

# webpack配置详解 - resolve配置项
这不是 path 里面的resolve() 而是一个配置项

```js
module.exports = {
  entry: "",
  output: {},
  module: {},
  plugins: [],
  mode: "",

  // 配置项
  resolve: {}
}
```

<br>

### 作用:
解析模块的规则
```js
module.exports = {
  resolve: {
    // 配置 路径别名  -- 简写路径
    alias: resolve(__dirname, "文件目录"),

    // 配置 省略文件后缀名的规则  -- 简写文件后缀
    extensions: [],

    // 解析模块的时候 让webpack准确的找到 node_modules 所在 而不是一层层的查找
    modules: [],
  }
}
```

**<font color="#C2185B">alias: </font>**  
配置文件别名 简写路径名
<!-- 
  缺点: 写路径的时候就没有提示了
 -->

使用场景:
我们的实际开发中 目录的层级嵌套的是非常深的 当我们去引入文件的时候 少不了 ../../ 容易出错 写起来也麻烦 所以我们会考虑到配置路径的别名

```js
resolve: {
  alias: {
    @css: resolve(__dirname, "src/css")
  }
}
```

我们起了一个 @css 变量 指向了 
  | src
    | - css

当我们再在项目中引入的时候 就可以使用 别名 来引入文件
```js
// webpack.config.js
resolve: {
  alias: { 
    "@js": resolve(__dirname, "assets/js")
  }
}


// index.js
import count from "./assets/js/count"
↓
import count from "@js/count"
```

<br><br> 

**<font color="#C2185B">extensions:</font>**  
配置省略文件的后缀名
默认值: .js .json (所以js json文件类型的时候可以不用写后缀名)

类型: []

```js
resolve: {
  alias: { 
    "@js": resolve(__dirname, "assets/js"),
    "@css": resolve(__dirname, "assets/style")
  },

  extensions: [".js", ".json", ".css", ".jsx"]
}


// index.js 入口文件引入css样式 省略了.css后缀
import "@css/c" 

import count from "@js/count"
console.log("count", count(2, 1))
```

<!-- 
  webpack会查找 css目录下的文件c 
  然后先拿.js去补充文件后缀 没有的话再用 .json 补充 再没有用 .css 来补充 

  所以不建议写 .css 因为同时有 index.js index.css 当都省略后缀名的时候 默认会加载 [".js", ".json", ".css"] 的第一个 会出现找不到资源的情况
 -->

<br><br> 

**<font color="#C2185B">modules:</font>**  
解析模块的规则 告诉webpack解析模块的时候应该去哪个目录找
类型: []

webpack会先在当前的文件目录下找 node_modules 找不到会去上层目录去找 依次直到顶层

所以还可以通过 resolve() 指定去哪找 node_modules

```js
resolve: {
  alias: { 
    "@js": resolve(__dirname, "assets/js"),
    "@css": resolve(__dirname, "assets/style")
  },
  extensions: [".js", ".json", ".css"],

  // 写法1:
  modules: ["node_modules"]

  // 写法2: 第二个"node_modules"是为防止前面的找不到 所以写一下
  modules: [resolve(__dirname, "../../node_modules"), "node_modules"]
}
```

<br><br>

# webpack配置详解 - devServer
之前我们在开发环境下的时候 配置了 devServer 使用了下面的配置项
```js
devServer: {
  contentBase: resolve(__dirname, "build"), 
  // gzip压缩
  compress: true,
  host: "指定域名, 比如: localhost"
  port: 3000,
  open: true,
  hot: true,

  // 新内容
  watchContentBase: true,
  clientLogLevel: "none",
  quiet: true
}
```

除了上述这些还有其他的一些配置 用来指示我们的服务器到底应该干什么
接下来我们看看新增的属性


**<font color="#C2185B">watchContentBase: true</font>**  
监视 contentBase 目录下的所有文件 一旦文件变化就会 reload


**<font color="#C2185B">watchOptions</font>**  
监视文件的时候 忽略哪些文件
类型: 正则

问题:
额 build 下面也不会有 node_modules 文件夹呀

```js
devServer: {
  contentBase: resolve(__dirname, "build"),

  watchContentBase: true,

  // 我们监视的时候 只需要监视源代码 不需要监视 node_modules
  watchOptions: {
    ignored: /node-modules/
  }
}
```


**<font color="#C2185B">clientLogLevel: "none"</font>**  
不要显示启动服务器日志信息
<!--  
  devServer在开启的时候会出现很多的日志 但实际上我们是不需要的
 -->


**<font color="#C2185B">quiet: true</font>**  
除了一些基本启动信息以外 其他内容都不要打印


**<font color="#C2185B">overlay: false</font>**  
如果出错了 不要全屏提示


**<font color="#C2185B">proxy:</font>**  
类型: {}
作用: 服务器代理 解决开发环境下的跨域问题 服务器请求转发
一旦 devServer(3333) 服务器 接收到 /api 开头的请求 就会把请求转发到另外一台服务器(target指定的:3000)

我们的代码就通过 devServer服务器 运行 所以 服务器 和 服务器 之间没有跨域问题 浏览器会把请求发送到代理服务器上 而代理服务器会将请求转发到另一台服务器上 代理服务器在取得响应后 再将响应给浏览器

```js
devServer: {
  proxy: {
    "/api": {

      // 指定目标服务器
      target: "http://localhost:3000",

      // 发送请求的时候 请求路径重写 将 /api/xxx -> /xxx
      pathRewrite: {
        "^/api": ""
      },
    }
  }
}
```

<br>

### 演示：
```js
devServer: {
  contentBase: resolve(__dirname, "build"),
  // 监视 build 目录下的文件 一旦发生变化 reload
  watchContentBase: true,

  // 监视文件的时候 忽略 node_modules
  watchOptions: {
    ignored: /node_moduls/
  },

  // 不要显示启动服务器日志信息
  clientLogLevel: "none",

  // 除了一些基本启动信息以外 其他内容都不要打印
  quiet: true,

  // 报错不要全屏提示
  overlay: false,


  compress: true,
  open: true,
  hot: true,
  port: 3333,
  // 指定域名
  host: "localhost",
  
}
```

<br><br>

# webpack配置详解 - optimization 配置项
前面我们说优化 - 代码分割的时候 使用过 optimization 下面我们说下 这个配置项的详细配置

optimizaion配置在生产环境中才有意义

```js
module.exports = {
  mode: "production",

  optimization: {
    // 代码分割
    splitChunks: {
      chunks: "all"
    }
  }
}
```
 
下面我们说的都是 默认值 不用特意的修改 平时我们使用的时候 使用上面的就好
```js
optimization: {
  splitChunks: {
    chunks: "all",

    --- 以下是默认值 ---

    // 分割的chunk最小为30kb 当大于30kb的时候才开始分割 小于30kb就不分割了
    miniSize: 30 * 1024,

    // 0为默认值 最大没有限制
    maxSize: 0,

    // 要提取的chunk最少被引用一次 如果一次都没有被引用说明这个模块不是依赖 那就不用提取了
    minChunks: 1,

    // 按需加载时并行加载的文件数量最大为5 超过5个就不会打包成单独的chunk了 只能最多打包5个
    maxAsyncRequests: 5,

    // 入口js文件最大并行请求数量
    maxInitialRequests: 3,

    // 名称连接符
    automaticNameDelimiter: "~",

    // 可以使用命名规则
    name: true,

    // 分割chunk的组 有一组就有一个chunk 有二组就有二个chunk 每组有自己的分割的规则
    cacheGroups: {
      // vendors组 - 也就将来打包后的名字
      vendors: {
        // vendors组 node_modules 下面的文件会被打包到 vendors组的chunk 中
        // 这个chunk的命名为 vendors~xxx.js
        test: /[\\/]node_modules[\\/]/,

        // 打包的
        priority: -10
      },

      // default组
      default: {
        // 要提取的chunk最少要被引用2次
        minChunks: 2,
        priority: -20,

        // 如果当前要打包的模块 和 之前已经被提取的模块是同一个 就会复用 而不是重新打包模块
        reuseExistingChunk: true
      }
    }
  }
}
```


<br>

### 问题: 缓存失效
webpack.config.js 是如下配置的

入口文件的名字是 --- mian.10位hash.js
单独打包的其它文件名字是 --- a.10位hash.js

```js
output: {
  filename: "js/[name].[contenthash:10].js",
  path: resolve(__dirname, "build"),
  chunkFilename: "js/[name].[contenthash:10]_chunk.js"
}
```

现在有一个问题:
index.js入口文件中 引入了 a.js 文件
当我们修改了 a.js 文件后 按理来说 只有a.js文件应该发生变化 因为index.js没有动 所以不应该发生变化

但是 因为每次打包的hash值是不一样的 index.js 中引入了 a.hash.js 当hash发生变化的时候导致index.js的内容也发生了变化 导致了缓存失效

为了解决上述的问题 我们要使用下面的配置项

**<font color="#C2185B">runtimeChunk</font>**  
将当前模块的记录其它模块的hash值单独打包为一个runtime文件 解决缓存失效的问题

*在做代码分割的时候一定要加上这个配置*
```js
optimization: {
  splitChunks: {
    chunks: "all",
      ... 默认配置
    }
  },

  // 解决缓存失效
  runtimeChunk: {
    // 返回值是命名规则: 
    name: entrypoint => `runtime-${entrypoint.name}`
  }
}
```

**压缩js的时候 切换到这个库 来进行配置**
**<font color="#C2185B">minimizer</font>**  
可以让我们在压缩js的时候 做的更加的出色一些

类型: []

当webpack版本升级到 4.26 以上的时候 压缩css js的时候使用的是 terser 这个库 如果我们想配置 terser这个库的压缩方案 就可以用这个配置项

因为默认值不是那么出色 我们可以稍微改改

<!-- 
  另外
  安装了 css 压缩用的 css-minimizer-webpack-plugin 之后
  webpack默认的production压缩js会失效
  所以要安装这个压缩js
 -->

```js
optimization: {
  splitChunks: {
    chunks: "all",
      ... 默认配置
    }
  },

  // 解决缓存失效
  runtimeChunk: {
    // 返回值是命名规则: 
    name: entrypoint => `runtime-${entrypoint.name}`
  },

  // 配置 terser 库的压缩代码的方案
  minimizer: [

  ]
}
```

**<font color="#C2185B">1. 配置之前 我们需要下载:</font>**  
npm i terser-webpack-plugin -D
<!-- 
  @2.3.5
 -->

**<font color="#C2185B">2. 引入</font>**  
<br><br> const TerserWebpackPlugin = require("terser-webpack-plugin")

**<font color="#C2185B">3. 在 minimizer 中 new调用</font>**  
```js
minimizer: [
  new TerserWebpackPlugin({
    // 开启缓存
    cache: true,
    // 开启多进程打包 让速度更快
    parallel: true,
    // 要是使用source-map的话 一定要配置这个选项 要不然source-map会被压缩掉
    sourceMap: true
  })
]
```

<!-- 
  cache sourceMap 报错的话 可以把这两个删掉试试
 -->

<br><br>

# webpack5

<br>

### webpack4
1. 下载 webpack4:
npm i webpack webpack-cli -D

2. webpack4 配置
```js
// webpack.config.js
module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build")
  },
  mode: "development"
}
```


<br>

### webpack5
1. 下载
npm i webpack@next webpack-cli -D
<!-- 
  现在好像不用加 @next 了 因为已经发布了
 -->

2. webpack5 配置
webpack5中不用指明entry output 因为都是默认值 跟webpack4比较起来配置文件少写了很多的东西

```js
// webpack.config.js
module.exports = {
  mode: "development"
}
```


<br>

### 区别1:
webpack5中 配置文件 不用指明 entry output
但是内部配置的写法是一样的

<br>

### 区别2:
webpack4中的树摇 如果模块的引用层级太深的话 摇不掉了
webpack5中的树摇的功能更加的强大 可以接上webpack4中的问题 并且打包后的代码体积更小

<br><br> 以下的部分没有听哦

# webpack5

此版本重点关注以下内容:

通过持久缓存提高构建性能. 新增cache配置项
使用更好的算法和默认值来改善长期缓存.
通过更好的树摇和代码生成来改善捆绑包大小.
清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.

## 下载

npm i webpack@next webpack-cli -D

## 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

尽可能尝试使用与前端兼容的模块。
可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

## Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

`chunkIds: "deterministic", moduleIds: "deterministic"`

## Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

## Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

2. webpack 现在能够多个模块之前的关系

```js
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

3. webpack 现在能处理对 Commonjs 的 tree shaking

## Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

## SplitChunk

```js
// webpack4
minSize: 30000;
```

```js
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

## Caching

```js
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

## 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

## 默认值

`entry: "./src/index.js`
`output.path: path.resolve(__dirname, "dist")`
`output.filename: "[name].js"`

## 更多内容

https://github.com/webpack/changelog-v5

<br><br>

# Webpack - 高阶篇
这个部分使用的相关技术的版本为:

Vue:
@vue@cli v4.5.7
<!-- 
  4.5.15
 -->

React
create-react-app v3.4.1
<!-- 
  create-react-app --version
  我现在用的是 5.0.0
 -->

Webpack
v5.1.3
<!-- 
  webpack v4.41.6
 -->

<br><br>

# React - 脚手架介绍
使用 react 脚手架需要 create-react-app 

<br>

### 项目结构介绍

  | - node_modules    包
  | - public          静态资源
  | - src             源码
  - package.json

<br><br>

<br>

### package.json
我们从这个文件入手开始分析
```json
{
  "name": "react-local-pro",
  "version": "0.1.0",
  "private": true,

  "dependencies": {
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "pubsub-js": "^1.9.4",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.3",
    "react-scripts": "5.0.0",
    "redux": "^4.2.0",
    "web-vitals": "^2.1.4"
  },


  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

  // eslint的配置 如果我们要是想看 eslint 的配置 那我们就去看 react-app 这个库
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },

  // 浏览器列表 样式兼容性做到什么程度
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

<br><br>

<br>

### react中的webpack配置在哪里?
默认情况下 react的webpack配置在 react-scripts 包里面
所以我们要是找的话 需要打开 node_modules 里面找 但是这样不太方便

所以 react 提供了 npm run eject 指令


<br>

### npm run eject
将 react 的 webpack 配置打包到根目录
并且下载项目中用到的依赖

这个命令是不可逆的 当我们运行这个命令后 根目录会多两个文件

  | - config
    | - jest
    | - webpack
      | - persistentCache
        - createEnvironmentHash.js
    - env.js
    - getHttpsConfig.js
    - modules.js
    - paths.js
    - webpack.config.js
    - webpackDevServer.config.js


  | - scripts
    - build.js
    - start.js
    - test.js


<br>

### config 目录
包含了 webpack 核心的配置文件

<br>

### scripts
包含了 启动项目的3个指令
当我们运行了 npm run eject 后 项目的启动指令就发生了变化 会关联到 scripts这个目录中的 3个js文件
```js
// 之前:
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},


// 之后: 通过 node 命令找 scripts 目录中的文件
"scripts": {
  "start": "node scripts/start.js",
  "build": "node scripts/build.js",
  "test": "node scripts/test.js"
},
```

所以 
我们要是研究 开发环境的webpack 就要从 start.js 文件入手
我们要是研究 生产环境的webpack 就要从 build.js 文件入手

<br><br>

# React - config/paths.js
作用: 
这个模块是用来处理路径的

```js
'use strict';

const path = require('path');
const fs = require('fs');

const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// appDirectory: 项目的根目录
const appDirectory = fs.realpathSync(process.cwd());

// 定义了一个方法
// 参数: 相对路径; 返回值: 根据项目根路径拼接的绝对路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

/*
  定义了一个方法
  作用: 所有资源的公共访问路径: 默认值为 /

  默认情况下是不需要改下面的 homepage 和 PUBLIC_URL 的

  什么时候需要改:
  - 如果以后项目上线 我们需要换一个服务器地址 就可以在以下的两个位置修改新的服务器地址
  - 1. package.json 中 配置 homepage
  - 2. process.env.PUBLIC_URL 中 添加对应的值
*/
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',

  // 通过require将package.json文件引入 看看它里面有没有 homepage 属性 如果有就意味着公开路径为homepage对应的值 或者去process.env去找PUBLIC_URL  如果这两个都没有 默认就是  / 
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';

// 定了文件的扩展名 这些扩展名的文件会被react解析
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

/*
  解析模块的方法
*/
const resolveModule = (resolveFn, filePath) => {
  // 拿到上面定义的文件扩展名 看看我们的文件路径是否符合文件扩展名 存在就返回
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  // 存在就解析
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// 向外暴露 出去各种路径
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;

```

<br><br>

# React - scripts/start.js
start.js 对应着开发环境下运行的文件
接下来我们看看开发环境下它会做什么

我觉得了解下就可以了

```js
'use strict';

// 定义两个环境变量 后续我们可以通过 process.env 获取 NODE_ENV 的值就是开发环境 development
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// 捕获异常
process.on('unhandledRejection', err => {
  throw err;
});

// 引入 config 目录里面的 env 作用就是加载一些环境变量
// 我们在根目录创建的 .env 文件中 要想让react识别 必须加上 REACT_APP 前缀 
require('../config/env');

const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const semver = require('semver');
const paths = require('../config/paths');
const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevServer.config');
const getClientEnvironment = require('../config/env');
const react = require(require.resolve('react', { paths: [paths.appPath] }));

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

// paths上面说了是一堆路径 react通过判断有没有 yarnLockFile 从而判断我们有没有使用 yarn工具
const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

// 判断 appHtml appIndexJs 存不存在 如果不存在就退出进程
// public/index.html src/index.js
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  // 退出命令
  process.exit(1);
}

// 默认端口号
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
// 默认域名
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow('https://cra.link/advanced-config')}`
  );
  console.log();
}

// checkBrowsers检查浏览器的方法 我们使用的是什么浏览器
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // 检查端口号 这个方法就是 当3000被占用了会换成3001
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }

    /*
      configFactory()来源于 ../config/webpack.config.js 
    */
    const config = configFactory('development');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;

    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const urls = prepareUrls(
      protocol,
      HOST,
      port,
      paths.publicUrlOrPath.slice(0, -1)
    );

    // 创建编译器
    const compiler = createCompiler({
      appName,
      config,
      urls,
      useYarn,
      useTypeScript,
      webpack,
    });


    //加载代理配置 它会去 appPackageJson 中去找
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(
      proxySetting,
      paths.appPublic,
      paths.publicUrlOrPath
    );
    // 创建 devserver 配置
    const serverConfig = {
      ...createDevServerConfig(proxyConfig, urls.lanUrlForConfig),
      host: HOST,
      port,
    };
    const devServer = new WebpackDevServer(serverConfig, compiler);
    // Launch WebpackDevServer.
    devServer.startCallback(() => {
      if (isInteractive) {
        clearConsole();
      }

      if (env.raw.FAST_REFRESH && semver.lt(react.version, '16.10.0')) {
        console.log(
          chalk.yellow(
            `Fast Refresh requires React 16.10 or higher. You are using React ${react.version}.`
          )
        );
      }

      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close();
        process.exit();
      });
    });

    if (process.env.CI !== 'true') {
      // Gracefully exit when stdin ends
      process.stdin.on('end', function () {
        devServer.close();
        process.exit();
      });
    }
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

```

<br><br>

# React - scripts/start.js