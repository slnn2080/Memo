### webpack打包体积优化,详细分布查看插件
- https://www.npmjs.com/package/webpack-bundle-analyzer


### Webpack
- webpack是一个现代的js应用的静态模块打包工具, 从两个点来解释前面的话就是 模块 和 打包

> 前端模块化
- 在前面学习中, 我们提到了目前使用前端模块化的一些方案, 比如commonjs es6
- 在es6之前 我们要想进行模块化的开发, 就必须借助于其他的工具, 让我们可以进行模块化的开发
<!-- 
  因为浏览器不认识commonjs es6的语法 想在浏览器端执行必须要依赖其他的转译工具
 -->
- 并且在通过模块化开发完成了项目后, 还需要处理模块间的各种依赖, 并且将其进行整合打包
<!-- 
  各种依赖, 我们用模块化开发的网页 模块之间存在了相互引入, 这就像一张关系网 这就是各种依赖的解释, 我们的依赖关系不管多么复杂 最终webpack都能帮你处理好
 -->

- webpack可以帮助我们把模块化的规范, 依赖等问题, 处理为浏览器认识的代码

- 而且不仅仅是js, 我们的css 图片, json文件等等在webpack中都可以被当做模块来使用, 这就是webpack中模块化的概念

> 打包
- 理解了webpack可以帮助我们进行模块快, 并且处理模块化之间的各种复杂关系后, 打包的概念就非常的好理解了
- 将是将webpack中的各种资源模块进行打包合并成一个或多个保(bundle)
- 并且在打包的过程中, 还可以对资源进行处理, 比如压缩图片, 将scss转为css, 将es6语法转为es5语法, 将ts转成js等等操作
- 但是打包的操作思域grunt gulp也可以帮助我们完成, 他们有什么不同呢


> grunt / gulp的对比
- grunt / gulp的核心是task
- 我们可以配置一系列的task, 并且定义task要处理的事物(比如es6 ts转化 图片压缩 scss转成css)
- 之后让grunt / gulp来依次执行这些task 而且让整个流程自动化
- 所以grunt / gulp也被称为前端自动化任务管理工具

- 什么时候使用grunt gulp呢?
- 如果你的工程模块依赖非常简单, 甚至没有用到模块化的概念
- 只需要进行简单的合并, 压缩, 就使用grunt glup即可
- 但是如果整个项目使用了模块化管理, 而且相互依赖非常强, 我们就可以使用更强大的webpack了

> webpack 和 gulp的不同
- grunt gulp更加强调的是前端流程的自动化, 模块化不是它的核心
- webpack更加强调模块化开发管理, 而文件压缩合并, 预处理等功能, 是它附带的功能

--------------------------

### webpack的安装
- webpack是依赖于node环境的
<!-- 
  比如我们再浏览器端使用了js png less css 模块化 我们部署到服务器上后 用户通过服务器下载的东西, 这些东西都不能运行

  浏览器 ---- webpack ---- 服务器

  我们将这些东西 通过 webpack 进行模块化打包之后会生成一个文件夹, 把这个文件夹放到服务器进行部署就可以了

  webpack要想运行 本身就需要依赖一个环境 node环境
 -->

- 安装 webpack 首先需要安装node.js node.js自带了软件包管理功能 npm

- 全局安装webpack(这里我们先指定版本号 3.6.0 因为vue cli2依赖该版本)
<!-- 
  vue cli3中已经升级到webpack4 但是它将配置文件隐藏起来了, 所有查看起来不是很方便
 -->

  npm install webpack@3.6.0 -g

- 局部安装 webpack( 后续才需要 )
  
  --save-dev 是开发时依赖, 项目打包后不需要继续使用的

- 我们可以用下 webpack --version 查看下安装成功没有
- 为什么全局安装后, 还需要局部安装呢?
  - 在终端直接执行webpack命令, 使用的全局安装的webpack
  - 当在package.json定义了script时, 其中包含了webpack命令, 那么使用的是局部webpack

--------------------------

### webpack的基本使用过程
- webpack在打包的时候, 会从入口js文件中(main.js)查找依赖的模块, 根据入口js文件的依赖来进行打包
<!-- 
  main.js文件依赖了什么 就会对响应的文件(模块)打包

  webpack在打包的时候会看main.js里面依赖了什么, 它会根据依赖一层层的去找(比如再看看info.js文件中依赖了什么), 只有依赖的文件才会进行打包

  所以要打包的文件, 最好在main.js文件中 进行依赖
 -->

> 文件夹结构
  | - dist文件夹: 用于存放之后的打包文件
  | - src文件夹:  用于存放我们写的源文件
    | - main.js:      项目的入口文件, 具体内容查看下面详情
    | - mathUtils.js: 定义了一些数学工具函数, 可以在其他地方引用, 并且使用, 具体内容查看下面的详情

  | - index.html:   浏览器打开展示的首页html
  | - package.json: 通过npm init生成的, npm打包管理的文件(暂时没有用上, 后面才会用上)

<!-- 
  我们将代码写到main.js中, 然后通过打包生成到dist文件夹, 最终我们要将dist文件夹发布到 服务器上

  之后index.html文件也要放入到dist文件夹内, 因为dist文件夹要部署到服务器上 我们是通过另一个工具自动将index.html文件放入到dist文件夹里面
-->

> 我们来看下模块化开发的基本应用
- 我们定义一个数据工具类js文件, 使用commonjs规范将工具函数导出
<!-- 
  function add(num1, num2) {
    return num1 + num2;
  }
  function mul(num1, num2) {
    return num1 * num2;
  }

  // 我们将这两个方法导出 在main.js中应用
  module.expotrs = {
    add,
    mul
  }
 -->

- 我们在main.js中文本中引入
<!-- 
  // 导入数学工具类后 在这个js文件中使用
  let {add, mul} = require('./mathUtils')

  console.log(add(20, 30));
  console.log(mul(20, 30))
 -->

- 之后我们要打印测试下上面的代码, 但是我们要在页面中按照下面的方式引入的话, 会出现浏览器根本不认识commonjs规范
<script src="./src/main.js"></script>

- 之前我们都是通过 工具来对js文件进行编译后, 使其可以在浏览器中运行, 现在我们使用webpack工具来走一遍看看


> webpack的基本使用
- 我们再开发的阶段都是使用commonjs规范来开发的, 然后用webpack对main.js进行打包, 打包出来一个浏览器可以认识的文件 让我们的index.html去引入浏览器能认识的文件(打包的文件)就可以了

- 命令
- 在项目的根目录下
- webpack 主要js文件所在的目录 空格 目标目录/文件名.js
- webpack ./src/main.js ./dist/bundle.js
<!-- 
  我们只需要打包主要文件就可以, 依赖关系webpack会帮助我们处理
 -->

> 注意 新版本需要在 两个路径之间加上 -o
webpack ./src/main.js -o ./dist/bundle.js

--------------------------

### webpack.config.js配置 和 package.json配置
- 上面学习了打包文件的方式, 需要指定打包哪个文件输出到哪里, 命令太长, 为了解决这个问题 我们还有另外一个打包方式 只需要简单的命令webpack就可以自己去找入口文件是什么, 出口在哪里, 为了完成这点, 所以我们需要对webpack.config.js文件进行配置

> 创建  webpack.config.js
- 在根目录下右键 创建这个文件, 在这个文件中我们进行如下配置
<!-- 目前对我自己来讲 这个文件名要求是固定的  -->
- 当我们在 webpack.config.js 文件中定义完入口和出口后 终端里执行webpack命令后它会自动找webpack.config.js这个文件 找入口和出口

```js 
  const path = require('path')

  // 在这里用commonjs的规范导出一个对象
  module.exports = {

    // 文件的入口
    entry: './src/main.js',

    // 文件的出口
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  }
```

> 配置 webpack.config.js的 具体步骤
- 1. 首先我们要导入一个 path模块(第三方模块)
<!-- 这个模块是安装node时自带的包 -->

  const path = require('path')

- 2. 使用 module.exports = { } 的方式 导出一个对象

  module.exports = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  }
 
- 相关参数:
  entry:    入口文件路径(要打包的目标文件)
  output:   出口路径 这里我们要动态获取绝对路径, webpack.config.js文件在哪 就从哪开始获取

  output: {   内部有两个参数
    path: path.resolve(__dirname, '出口的文件夹'),
    filename:   出口文件的名字
  }

- path模块有两个函数 用来动态获取出口的绝对路径和相对路径
  path.resolve()   它是做绝对路径的
  path.join()      它是做相对路径的

- __dirname:
  这是node上下文里自带的全局变量, 不用我们自已定义 它保存着 webpack.config.js这个文件所在的路径

- resolve()函数的作用:
  它的作用是对__dirname 和 'dist' 文件夹进行拼接
¥

> 使用 node 包时的注意点
- 一旦我们的项目中涉及到node相关的东西的时候, 我们首先要在根目录下创建 package.json 文件
<!-- 
  npm init 
  文件名中不要有中文, 和奇怪的符号
-->

- package.json文件 这个是告诉我们当前项目的一些信息的, 对当前项目的描述, 开发时的依赖, 运行时的依赖, 脚本配置等
<!-- 
  如果当前项目有依赖的情况下(在package.json里面有体现有的话) 我们输入 npm install 命令, 会自动安装依赖文件

  所以,
  一旦项目里有包的情况就把package.json创建好 node需要这个文件帮助我们管理项目中所要用到的包
 -->


> 配置 package.json文件 相关部分
- 我们只要是在终端中输入命令 都是全局下命令 而不是本地, 不管是不是在根目录下开启的终端

- 那在终端里面怎么使用本地的命令 怎么办?
<!-- 
  1. 我们要在局部安装响应的包
  2. 进入局部包中的路径 输入完整路径使用命令 比如:

  ./node_modules/.bin/webpack 后面接相关代码
 -->

> 命令的映射
- 这里我们会说下怎么使用局部命令 以及局部命令和全局命令的区别, 优点

>> 首先:
- 在真实开发的时候, 本地也会安装响应的包(webpack的包)
<!-- 
  因为我们本地项目依赖的webpack很有可能是和全局不一样的, 
  比如全局的webpack是4.xx版本 
  而局部依赖的可能是3.xx的版本

  这个时候我们再在终端中执行webpack的话就会执行4.xx版本的webpack命令
  
  可我们项目的构建依赖于3.xx版本
  我们用4.xx版本的文件打包3.xx创建的项目 很多东西可能就出错了所以一般我们还要搞一个本地的

  因为本地的才是和我们项目同步的 全局用的比较少
 -->

>> 其次:
- 配置 package.json 文件, 让webpack命令 和 npm命令相互映射起来

- 这样 我们通过配置 package.json 文件后, 执行 npm run build命令就是优先使用本地的包文件(webpack文件)

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    
    "build": "webpack"      // 看这里
  },

<!-- 
  1. 开package.json文件里面有 script部分

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  这个部分是 脚本的意思
  意味着我们可以在终端中 执行通过 npm run test
  
  执行test脚本 会执行后面的命令的 "echo \"Error: no test specified\" && exit 1"

  所以我们可以这么配置
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",

    "build": "webpack"
  },

  这样就意味着 如果我执行 npm run build这个命令的时候 它会对应的执行webpack这个命令(好像快捷键啊)


  package.json中的script的脚本在执行时, 会按照一定的顺序找命令对应的位置

  - 1. 首先会寻找本地的node_modules/bin路径总对应的命令
  - 2.   如果没有找到, 会去全局的坏境变量中寻找
 -->

>本地我们也安装一个webpack
npm install webpack@3.6.0

> npm有两个概念
- 开发时依赖  --save-dev
<!-- 
  只有在开发时才会需要用到webpack这个东西 运行时不需要因为webpac的作用就是把我们东西打包 把包放到服务器 打包后webpack就没有用了

  所以我们在安装这种包的时候 后面可以跟上 --save-dev

  安装好后 package.json文件中 会多出一个
  "decDependencies" :{
    "webpack": "^3.6.0"
  }
 -->
- 运行时依赖
<!-- 
  运行时依赖 项目想打包的东西会放到运行时依赖里面
  "dependencies" :{
    
  }
 -->

--------------------------

### webpack中使用css文件的配置
- 上面学完了webpack一部分的内容, 我们以后在开发项目的时候, 就可以随便用模块化开发了, 开发完之后我们用webpack进行下打包即可

- 可是我们项目中不仅有js文件, 还会有css和图片等等, 我们要是想对这些也做一些打包处理怎么操作?

- 我要对css文件 scss less jsx vue等文件处理的话 我们还需要知道一个概念 loader

> 什么是loader
- loader是webpack中一个非常核心的改变
- webpack用来做什么的?

  - 之前的示例中, 我们主要是用webpack来处理我们写的js代码, 并且webpack会自动处理js之间的相关依赖

  - 但是在开发中我们不仅仅有基本的js代码处理, 我们也需要加载css, 图片, 也包括一些高级的讲es6转成es5代码, 将ts转为es5代码, 将scss less转成css, 将jsx, vue文件转为js文件等等

  - 对于webpack本身的能力来说, 对这些转化是不支持的, 所以我们要webpack扩展对应的loader就可以了

> loader使用过程
- 1. 通过npm 安装需要使用的 loader
<!-- 不同的文件处理会用到不同的loader -->

- 2. 在webpack.config.js中的modules关键字下进行配置
<!-- 
  大部分loader我们都可以在webpack的官网中找到, 并且学习对应的用法
-->

> 都有哪些loader
- https://webpack.docschina.org/loaders/

- loader -- 样式 -- 在这里
<!-- 
  style-loader 将模块导出的内容作为样式并添加到 DOM 中
  css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
  less-loader 加载并编译 LESS 文件
  sass-loader 加载并编译 SASS/SCSS 文件

  postcss-loader 使用 PostCSS 加载并转换 CSS/SSS 文件

  stylus-loader 加载并编译 Stylus 文件
  Linting 和测试 

 -->



### 我们先来看看css文件处理
- 项目开发过程中, 我们必然需要添加很多的样式, 而样式我们往往写到一个单独的文件中
<!-- 
  注意开发中不要在index.html文件中引入css文件, 我们可以将css文件也当做一个模块打包到bundle.js文件中

  把css文件打包在bundle.js文件中, 就意味着我们不用引入css文件, 直接引入入口js文件就可以了
  什么css less 都把它们当做模块引入到main.js中就可以了
 -->

- css模块的打包需要两个loader css-loader 和 style-loader
- webpack在读取多个loader的时候 是从右向左读的

- 新的目录结构作为参考
<!-- 
  |- dist
  |- node_modules
  |- src
    |- css
    |- js
    main.js     // 这个不用放到js文件夹里面 做为入口的东西不要往文件夹里放
  index.html
  package.json
  webpack.config.js
 -->

> 我们来举个小例子
- 真实开发中不可能只有js文件 还会有css文件吧
- 不要在

- 在src目录中, 创建一个css文件夹, 其中创建一个normal.css文件
- 我们也可以重新组织文件的目录结构, 将零散的js文件放在一个js文件夹中

- normal.css中的代码非常的简单, 就是将body设置为red

- 但是 这个时候normal.css的样式会生效么?
<!-- 
  文件中我们只引入了入口的js文件 main.js
 -->
  - 当然不会, 因为我们压根就没有引用它
  <!-- 
    main.js中没有依赖css文件, 打包的时候css文件就不会被打包
   -->
  - webpack也不可能找到它, 因为我们只有一个入口, webpack会从入口开始查找其它的依赖文件
  <!-- 会一层层的找 别的js文件也会看 看依赖关系 -->

> 1. 我们在入口js文件中引入css文件
  require('./css/normal.css');

> 2. 安装css-loader
  npm install --save-dev css-loader@2.0.2
- css-loader 负责解析css文件
<!-- css-loader的版本到0.28.11 / 2.0.2-->

> 3. 安装style-loader
  npm install --save-dev style-loader@0.23.1
-  将解析的css文件加载的dom中
<!-- 
  npm uninstall css-loader
  0.15.0 / 0.23.1
-->

> 4. 在webpack.config.js文件中配置相关信息
- 在定义入口 和 出口的后面 添加module 值为{}
- rules 是规则的意思
<!-- 
  - rules
  const path = require('path');
  module.exports = {
    entry: "./src/main.js",
    
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "bundle.js"
    },

    module: {
      rules: [
        { 
          // 匹配所有的css文件, 匹配到css文件后就会对css文件应用下面的两个loader

          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    }
  }
 -->

> 再运行 npm run build 命令打包

--------------------------

### webpack中使用css文件的配置
- 如果我们希望在项目中使用less scss stylus来写样式, webpack是否可以帮助我们处理呢?
- 我们这里以less为例, 其它也是一样的
- 我们还是先创建一个less文件, 依然放在css文件夹中

- 创建好less后 我们还是要给这个文件引入到main.js的入口文件里面, 这样webpack会从入口文件开始查找依赖关系对依赖文件进行打包

> 1. 我们在入口js文件中引入less文件
  require('./css/special.less');

<!-- 
  我们执行 npm run build
  ↓
  会先去package.json中找script中的build对应的webpack命令
  ↓
  会去webpack.config.js中查找入口文件 查找依赖 对依赖文件做编译打包
 -->

> 2. 安装less 和 less-loader
- 在项目根目录下安装
  npm install less less-loader --save-dev
<!-- 
  我们这里指定版本
  npm install --save-dev less-loader@4.1.0 less@3.9.0
-->

> 3. 在webpack.config.js中添加less-loader的相关添加规则
- 在官网上复制 按{ }复制就可以
<!-- 
  {
    test: /\.less$/i,
    loader: [
      // compiles Less to CSS
      "style-loader",
      "css-loader",
      "less-loader",
    ],
  }
 -->

> 4. 再运行 npm run build 命令打包

--------------------------

### webpack 配置post css
- 这部分是在nodejs中看到的, 不知道webpack和post的版本是否相匹配
- www.postcss.com.cn
- https://www.npmjs.com/package/postcss-loader

> 安装 postcss-loader 和 autoprefixer
- npm install postcss-loader autoprefixer --save-dev

> 在项目内创建 postcss.config.js 文件
- 写上配置
<!-- 
  const autoprefixer = require('autoprefixer');
  module.exports = {
    plugins: [autoprefixer]
  };


  // 下面的是cli2自动生成的 借鉴一下
  module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
 -->

> webpack.config.js
- 是不是要写在less loader上面就不知道了
<!-- 
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
  };
 -->
  
--------------------------

### webpack中对图片文件的处理
- 在实际开发项目中也离不开对图片的一些处理
- 这块我们讲讲对于图片是怎么配置的, 先来些准备工作, 我们先把一张图片作为网页的背景图片
<!-- 
  css -- normal.css -- background:url('./test/png')
  
  上面的属于修改, 我们需要重新npm run build下 这样会先去找入口文件 然后找依赖

  当读到css文件中 有图片的时候background:url('./test/png') webpack也会把图片当做 模块 去加载这张图片的

  也就说说 图片的加载也需要一个loader

  也是一样的流程 我们要去 下载对应的loader 

  官网 --- loader --- 文件 --- url-loader
  // 图片是通过url引入进来的

  我使用的是18kb的 title-font-1_5363c50.png
 -->

> 注意 url-loader 在webpack5之后就弃用了
- 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

- 通过资源模块 代替了 
- https://webpack.docschina.org/guides/asset-modules/
<!-- 
  raw-loader  将文件导入为字符串
  url-loader  将文件作为 data URI 内联到 bundle 中
  file-loader 将文件发送到输出目录
 -->


> 1. 下载url-loader 和 file-loader
- npm install --save-dev url-loader@1.1.2
- npm install --save-dev file-loader@3.0.1
<!-- 跟着视频学的时候 -->
<!-- 
  当webpack在加载图片的时候会看 图片的尺寸是大于limit还是小于limit
  如果小于limit就会用 url-loader直接加载, 并且将它直接编译成base64的字符串形式

  如果大于limit就会用 file-loader对图片进行加载, file-loader不需要特别的配置, 只需要直接安装就可以了
 -->

> 2. 在webpack.config.js中 对 url-loader 进行配置
- 在ues中如果放入对象类型的话除了可以写loader之外, 还可以写options参数
- file-loader老师没配置
<!-- 
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },

  // file-loader的规则 但是好像不用配置
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
 -->


> loader规则中的 options的属性: limit
- 当加载的图片小于limit的时候, 会将图片编译成base64字符串形式
<!-- 
  limit中的数值是 x1024后的结果 
  上面的8192要 / 1024 才知道 limit是对多少kb的图片做限制 8kb
-->

<!-- 
  Base64是一种用64个字符来表示任意二进制数据的方法, 一种最常见的二进制编码方法。

  它可以把字符串图片等转换为字符串的形式
 -->

- 当使用file-load来打包图片文件的时候, 自动在dist文件夹中生产一个非常长的名字, 这是一个32位的hash值

- 但是在真是开发中, 首先我会希望dist文件夹中图片应该有图片专门的文件夹, 同时我们可能对打包的图片名字有一定的要求, 比如将所有的图片放在一个文件夹中, 跟上图片原来的名字, 同时也要防止重复

- 我们再options中还可以配置下面的属性:
<!-- 
  options: {
    limit:8192,
    name: 'img/[name].[hash:8].[ext]'
  }

  img:  文件要打包到的文件夹
  name: 获取图片原来的名字, 放在该文职
  hash:8: 为了防止图片名称冲突 依然使用hash, 但是我们只保留8位
  ext:  使用图片原来的扩展名
 -->


> url-loader的使用流程
- 当webpack帮助我们加载图片的时候(url方式加载图片的时候), 需要依赖url-loader, 在url-loader的规则中有limit属性, url-loader会先看我们加载的图片是否大于limit

- 如果小于limit 那么webpack会使用url-loader直接将图片转换为base64格式的字符串通过这个字符串将图片显示出来

- 如果大于limit 那么webpack会需要file-loader, 来加载图片


> url-loader 和 file-loader 对于图片的存储
- 如果小于limit属性值的图片 会通过url-loader对图片进行加载, webpack会把这张图片转换为base64的字符串格式, 加载到页面中, 也就是说对于小于limit的图片来说, 它就是字符串, 不需要以文件的形式进行存储(比如存储为1.jpg)

- 如果大于limit属性值的图片, 会通过file-loader对图片进行加载, file-loader会把图片当做一个文件, 如果是文件的话, 就会被webpack打包, 需要将该图片文件打包到dist文件夹内, 等到发布的时候会连同 bundle.js和图片一起进行发布
<!-- 
  通过file-loader打包的图片文件, 会在 dist 文件夹内生成一个打包后的图片, 并且为了让所有的图片不重名该图片会被改写为哈希名
 -->


> 通过file-loader加载的图片还需要在 webpack.config.js中进行额外的配置
- 在webpack.config.js中的output中添加publicPath:'dist/'
<!-- 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "bundle.js",
    publicPath: 'dist/'       这里
  },
 -->
- 这样做的话以后只要涉及到url相关的东西都会在前面添加个dist/

    publicPath: 'dist/'

- 这个属性的目的就是在url前面加上对应的路径 让index.html链接到dist中的文件

> 注意:
- 我们现在是把index.html放在根目录下, 所以需要配置publicPath: 'dist/
- 如果以后我们学了把index.html文件也打包到dist文件夹里面的时候, 就不需要publicPath: 'dist/了

--------------------------

### webpack中对ES6语法处理
- 如果我们仔细阅读webpack打包的js文件, 发现写的es6语法并没有转成es5, 那么就意味着可能一些对es6还不支持的浏览器没办法很好的运行我们的代码

- 在前面我们说过, 如果希望将es6的语法转成es5, 那么就需要使用babel
- 而在webpack中, 我们直接使用babel对应的loader就可以了

> 1. 下载babel
- npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
<!-- 
  弹幕说没有7了
  npm install --save-dev babel-loader babel-core babel-preset-es2015
 -->

> 2. 配置webpack.config.js文件
<!-- 
// webpack官网上的
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  }

// 老师的
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['es2015']
    }
  }
}
 -->

- 属性:
- exclude: 排除 我们对es6转化的时候只转化src文件夹里面的东西就可以了 排除我node_modules里面的文件

- presets: ['@babel/preset-env'] 
- 如果这么配置的话, 就会去报babel rc的文件, 我们没有用rc文件, 所以我们这么写
<!-- 
  presets: ['es2015']
 -->

> 3. 重新打包 npm run build

--------------------------

### webpack 配置vue
- 后续项目中, 我们会使用vuejs进行开发, 而且会以特殊的文件来组织vue组件, 所以下面我们要学习如何在webpack环境中继承vuejs

- 之前我们使用vue的时候会在script标签中引入vue.js来学习vue, 这种方式不是通过模块化的方式管理我们的vue

- 现在我们希望在项目中使用vuejs 那么必须需要对其有依赖, 所以需要先进行安装
<!-- 因为我们后续是在实际项目中也会使用vue的, 所以并不是开发时依赖 -->
- npm install vue --save
<!-- 
  通过这种方式安装vue vue就会被安装到node_modules文件夹中, 我们就可以把vue当做一个模块了
 -->

> 使用vue
> 1. 在入口js文件中, 先引入vue, 让入口文件对vue进行依赖
<!-- 安装是安装, 依赖是依赖 -->
- 使用:
- import Vue from 'vue';

> 2. 在入口文件中, 创建vue实例, 然后npm run build
<!-- 
  import Vue from 'vue';

  const app = new Vue({
    el:'#app',
    data: {
      message: '我一定可以的'
    }
  })
 -->

> 上面再次对入口js文件打包时报错
- 说我们使用了runtime-only版本
<!-- 
  bundle.js:928 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
 -->
- 上面报错的原因
- vue在最终发布的时候构建了两类版本
- 一类叫做 runtime-only
<!-- 
  使用这个版本中 代码中不可以有任何的template

  div#app 这个div也属于vue实例的template
  因为这个版本里不含有对template编译的代码 它只管运行 不管编译
 -->
 
- 一类叫做 runtime-compiler
<!-- 
  使用这个版本中 代码中可以有template
  因为有compiler代码可以用于编译template
 -->

> 解决方法
- 我们修改下webpack的配置, 添加如下内容即可 我们可以指定使用 runtime-compiler版本

> 3. 修改webpack.config.js配置 关于vue的
- 添加如下属性
- 下面的属性意思是: 当我在入口js文件中
- import Vue from 'vue'的时候, 它会先看看vue有没有指向一个具体的文件夹,
- 我们把 'vue$': 'vue/dist/vue.esm.js' 指向了一个具体的文件夹, 这样它就不会按照默认的方式去找某个文件了
<!-- 
  vue发布了一堆的版本 我们让它指定一个
  node_modules --- vue --- dist --- vue.esm.js

  选择这个后 我们相当于使用了 runtime-compiler了
 -->
<!-- 
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
 -->

> 4. 运行打包命令

--------------------------

### 创建vue时 template 和 el的区别
- 以前我们创建vue实例的时候会这样, 在真是开发的时候app是不用的
<!-- 
  const app = new Vue({ ... })
  new Vue({ ... })    一般这样就可以

  之所以把vue实例赋值给app, 是因为平时的时候我们可以在控制台通过 app.变量的形式做演示
 -->

- 通过前几讲之后我们可以正常使用vue了, 但是如果我们希望将data中的数据显示在界面中, 就必须是修改index.html

- 如果我们后面自定义了组件, 也必须修改index.html来使用组件
- 但是html模板在之后的开发中, 我并不希望手动的来频繁修改怎么办?


> SPA 
- 我们用Vue比较多的是单页面应用(多页面也是可以的), 在单页面应用里面只有一个html文件(不像传统写的那样有很多的html文件)

- 如果有多个页面的话 我们是通过路由跳转的(vue-router前端路由)
<!-- 
  这里说下spa是说以后做项目的时候可能只有一个html页面, 我们一般html文件不改里面的代码原来什么样就是什么样固定的 , 只有一个这个东西
  <div id="app">
 
  </div>

  那我就想展示message, 创建按钮等操作怎么办呢?
  我们在vue实例里面添加template属性
 -->


> 定义template属性:
- 在前面的vue实例中, 我们定义了el属性, 用于和index.html中的#app进行绑定, 让vue实例之后可以管理它其中的内容
- 这里, 我们可以将div元素中的 {{message}} 内容删掉, 只保留一个基本的id为div的元素

- 但是如果我依然希望在其中显示 {{message}} 的内容, 应该怎么处理呢?
- 我们可以在定义一个template属性
<!-- 
  html中:
  <div id="app">
 
  </div>

  入口js中
  new Vue({
    el:'#app',
    template: `
    <div>
      {{message}}
      <button @click='btnclick'>按钮</button>
    </div>
    `,
    
    data: {
      message: 'coderwhy'
    },

    methods: {
      btnclick() {

      }
    }
  })
 -->

> Vue实例中的el 和 template 之间的关系
- vue在解析vue实例的代码的手, 会把template中的代码, 原封不动的替换掉 在html页面中的 <div id='app'>  </div> 这个部分
<!-- html文件只是一个包含内部组件的容器 里面没有啥东西 -->


> 总结:
- 以后我们在做vue开发的时候, 更多的是开发spa, 所以页面中只有一个html文件, 而且当中只有

- 1. div#app 的部分
- 2. 引入入口js文件   甚至这行代码也不用写

- 修改css样式, 在入口文件里 require(路径) 进去 写样式, 打包编译 webpack
- 想展示在页面中的vue代码, 在vue实例里的template属性里书写代码
<!-- 这部分代码会原封不动的替换掉页面中 div#app 的部分 -->

--------------------------

### Vue的终极使用方案
- 上面说了 spa中的html文件内部 没有什么特殊的代码和结构, 那就意味着我们的代码将写在vue实例的template属性中, 那就代码我vue实例里面的代码会越来越多

- 那有没有办法将 vue实例template中的代码也抽取出来呢?
- 我们可以把 template 中的内容抽取到组件里

> 方案过渡中 阶段一

> 1. 创建一个组件
> 2. 将组件在实例里面注册
> 3. 在组件使用在vue实例的template属性中 template: '<App/>'
<!-- 
  入口js文件中:

  // 定义一个组件
  const App = {

    // 将模板抽取到组件中
    template: `
      <div>
        <h2>我的目标是</h2>
        <p>{{message}}</p>
        <button @click='btnClick'>按钮点击</button>
      </div>
    `,
    
    // 将data抽取到组件中
    data() {
      return {
        message: '要找到一份好工作'
      }
    },

    // 将方法抽取到组件中
    methods: {
      btnClick() {
        console.log(this.message);
      }
    }
  }

  new Vue({
    el:'#app',

    // 在vue实例的模板中应用上面定义的组件
    template: '<App/>',
    
    // 在vue实例中注册上面的组件
    components: {
      App
    }
  })
 -->

> 方案过渡中 阶段二
- 上面我们把原来vue实例的template中的代码抽取到了一个组件里, 但是这个组件还是在入口js文件中, 也是很多

> 1. 我们再在src文件中 创建一个vue文件夹专门放vue的代码, 然后创建一个js文件(app.js)
  | - src
    | - css
    | - js
    | - img

    | - vue
      | - app.js

> 2. 再在app.js中, 把定义好的组件代码 复制到app.js中 利用 export default 导出
<!-- 
  export default {
    template: `
      <div>
        <h2>我的目标是</h2>
        <p>{{message}}</p>
        <button @click='btnClick'>按钮点击</button>
      </div>
    `,
    data() {
      return {
        message: '要找到一份好工作'
      }
    },
    methods: {
      btnClick() {
        console.log(this.message);
      }
    }
  }
 -->

> 3. 再在入口js文件中
- import App from './vue/app'; 进行导入
- 这样我们的入口文件就会变的非常的简洁
<!-- 
  入口js文件
  require('../src/css/normal.css');

  import Vue from 'vue';
  import App from './vue/app';

  new Vue({
    el:'#app',
    template: '<App/>',
    components: {
      App
    }
  })
 -->


> 最终方案
- 但是阶段性二的方法 有一点也不好就是 模板中的代码(html代码) 和 js代码没有分离

> 1. 我们再vue文件夹内创建一个 App.vue 文件 这个.vue文件就是一个App的组件
- vue文件内部包括三个部分
<!-- 
  <template>
    模板相关内容, 我的理解就是html代码
  </template>

  <script>
    export default {

      // 组件的名称
      name: 'App',

      这部分写js相关代码 脚本相关的东西
    }
  </script>

  <style scoped>
    这部分写组件中的样式
  </style>
 -->

- 最终展示
<!-- 
  <template>
  <div>
    <h2 class='test'>我的目标是</h2>
    <p>{{ message }}</p>
    <button @click="btnClick">按钮点击</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "要找到一份好工作",
    };
  },

  methods: {
    btnClick() {
      console.log(this.message);
    },
  },
};
</script>

<style scoped>
  .test {
    font-size: 100px;
  }
</style>
 -->

> 2. 我们把这个组件 在入口js文件中 引入
- import App from './vue/App.vue';    进行导入


> 3. 但是我们在导入进入口js文件之前 我们还需要下载对应的loader 要不它不认识.vue文件
- .vue文件是特殊的格式, 必须有人帮助我们处理, vue-loader 以及 vue-template-compiler

> 4. 安装vue-loader 和 vue-template-compiler --save-dev
- npm install vue-loader vue-template-compiler --save-dev
<!-- 
  npm install vue-loader@15.4.2 vue-template-compiler@2.5.21 --save-dev
 -->

> 5. 修改webpack.config.js的配置文件
{
  test: /\.vue$/,
  use: ['vue-loader']
}

> 6. 运行 npm run build
<!-- 
  报错信息:
  ERROR in ./src/vue/App.vue
  vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in 
  your webpack config.
 -->

- vue-loader有很多的版本 从14版本以上 使用vue-loader必须要配置一个插件
- 我们可以直接在 package.json中修改
<!-- 
  "vue-loader": "^15.9.7",
  "vue-template-compiler": "^2.6.12",

  手动修改为  有^这个符号会自动安装大于13的版本 不会跳到14

  "vue-loader": "^13.0.0",
  一旦package.json改掉的情况下, 必须执行
  npm install
 -->

> 重新运行 npm run build

> 在组件中引入组件
<!-- 
  我们再创建一个Cpn组件 我在App组件里面引入
 -->

- 在App组件的script标签中 使用import引入
- 在App组件的script标签中 注册下引入的组件  引入组件的时候要加.vue
<!-- 
  .js能省略 .vue为啥不能省略 vue想省略的话需要在webpack.config.js中进行配置

  // resolve解决路径和扩展名的作用
  resolve: {
    extensions: ['.js', '.css', '.vue'],   这里 是想省略掉什么后缀
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
 -->
- 在App组件的template标签中 使用Cpn组件 <Cpn></Cpn>
<!-- 
  <template>
  <div>
    <h2 class='test'>我的目标是</h2>
    <p>{{ message }}</p>
    <button @click="btnClick">按钮点击</button>

    <!-- 使用Cpn组件 ->
    <Cpn></Cpn>
  </div>
</template>

<script>
// 引入Cpn组件
import Cpn from './Cpn.vue';

export default {
  name: "App",

  // 组件引入的组件
  components: {
    Cpn
  },

  data() {
    return {
      message: "要找到一份好工作",
    };
  },

  methods: {
    btnClick() {
      console.log(this.message);
    },
  },
};
</script>

<style scoped>
  .test {
    font-size: 100px;
  }
</style>
 -->

> 总结
- 上面我在一个组件中引入了另一个组件, 这样我们就形成了组件树, 我们有一个根组件App.vue, 在App.vue文件里引入了其它的组件(Cpn.vue等)

- 而我们的入口js文件中, 只有一个App.vue文件

> main.js > import Vue from 'vue' > 创建Vue实例 > 创建App.vue根组件(体现在html页面上的代码, 相当于div#app里面的内容) > 根组件内部引入其它组件

--------------------------

### 认识plugin
- plugin是插件的意思, 通常适用于对某个现有的架构进行扩展
- webpack中的插件, 就是webpack现有功能的各种扩展, 比如打包优化, 文件压缩等等

> loader 和 plugin的区别
- loader主要用于转换某些类型的模块, 它是一个转换器
- plugin是插件, 它是对webpack本身的扩展, 是一个扩展器

> plugin的使用过程
- 1. 通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装)
- 2. 在webpack.config.js中的plugins中配置插件

- 下面我们就来看看可以通过哪些插件对现有的webpack打包过程进行扩容, 让我们的webpack更加好用


> 添加版权的plugin
- 我们先来使用一个最简单的插件, 为打包的文件(bundle.js)添加版权声明(添加一些说明信息), 我们就可以使用这个插件
- 插件名: BannerPlugin, 属于webpack自带的插件

>配置webpack.config.js
- 按照下面的方式来修改webpack.config.js的文件
<!--  
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    ...
    plugins: [
      new webpack.BannerPlugin('最终版权归sam所有');
    ]
  }
 -->

- 重新打包程序, 查看bundle.js文件的头部, 看到如下的信息
<!-- /*! 最终版权归sam所有 */ -->

----------

### plugin -- 打包html
- 目前, 我们的index.html文件是存放在项目的根目录下的, 我们知道, 在真实发布项目时, 发布的是dist文件夹中的内容, 但是dist文件夹中如果没有index.html文件, 那么打包的js等文件也就没有意义了

- 所以, 我们需要将index.html文件打包到dist文件夹中, 这个时候就可以使用HtmlWebpackPlugin插件

> HtmlWebpackPlugin插件
- 它可以为我们做这些事情
- 自动生成一个index.html文件(可以指定模板来生成)
- 将打包的js文件, 自动通过script标签插入到body中

> 安装HtmlWebpackPlugin插件
- 不是webpack自带的插件所以先安装这个插件
- npm install html-webpack-plugin --save-dev
<!-- 
  npm install html-webpack-plugin@3.2.0 --save-dev 
-->

> 配置webpack.config.js
- 配置webpack.config.js的plugins部分:
<!-- 
  - 这里的template表示根据什么模板来生成index.html
  - 另外, 我们需要删除之前在output中添加的publicPath属性, 否则插入的script标签中的src可能会有问题

  // 这里引入打包html的包
  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: "./src/main.js",
    
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "bundle.js",
      publicPath: 'dist/'
    },

    module: { 这里先删掉了 都是写loader的规则 看着太长 },

    plugins: [

      // 我们可以传递一个{} 作为参数
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
  }
 -->

> 配置完毕后运行命令打包
- 会在dist文件夹中生成一个html文件, 内部会生成html代码 并会把已经打包好的js文件也引入进去

> 注意
- 1. webpack.config.js中的 publicPath: 'dist/'
     我们要把  删掉 之前是因为打包图片时让页面引入打包后的图片做的修改, 但是在这里也有印象到script的src所以不用这个配置了 

- 2. 在根目录下的index.html文件中, 删除script标签
<!-- 
  因为这个插件会将打包后的js文件 自动用script标签引入, 如果我们不把原有的script标签删掉 会重复
 -->

----------

### plugin -- js压缩
- 在项目发布之前, 我们必然需要对js等文件进行压缩处理
- 这里, 我们就对打包的js文件进行压缩, 我们使用一个第三方的插件
- uglifyjs-webpack-plugin, 并且版本号指定1.1.1, 和cli2保持一致

- npm install uglifyjs-webpack-plugin@1.1.1 --save-dev

> 修改webpack.config.js文件, 使用插件
<!--  
  const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
  plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),

      new uglifyJsPlugin()
    ]
 -->

--------------------------

### webpack 搭建本地服务器
- webpack提供了一个可选的本地开发服务器, 这个服务器基于node.js, 内部使用express框架, 可以实现我们想要的让浏览器自动刷新显示我们修改后的结果
<!-- 
  之间我们在修改页面代码之后想要看测试结果, 必须输入 npm run build
  这样的话效率比较低, 我们可以搭建一个本地服务器 node服务器

  express框架可以服务于某一个文件夹 比如我们可以让它服务于 dist 文件夹
  这样它就可以实时监听这个文件夹里面的文件, 一旦发生改变, 它就会对之前所有的代码重新进行编译

  它会把编译好的文件放到内存里面不会生成实际的文件, 等你要发布实际问价的时候最终执行一次 npm run build就可以了

  流程是这样的
  所有服务器会服务于dist文件夹, 内部文件一旦发生改变, 它就会编译所有的文件编译结果暂时方式内存中, 然后渲染从内存中渲染到页面中

  这样的好处是, 内存的速度比磁盘快, 等到我们npm run build的时候 它才会把存放在内存中的数据 映射到磁盘上
 -->

- 不过它是一个单独的模块, 在webpack中使用之间需要先安装它


> 安装 webpack-dev-seiver@2.9.1
- npm install --save-dev webpack-dev-server@2.9.1
<!-- 
  这个版本和cli2 有一定的对应关系
  我们的webpack是3.6.0
 -->

- devserver也是作为webpack中的一个选项, 选项本身可以设置如下属性
<!-- 
  contentBase:    
  为哪一个文件夹提供本地服务, 默认是根文件夹, 我们这里要填写./dist

  port:
  端口号 它最终会泡在localehost上的某一个端口 默认会是8080端口

  inline:
  页面实时刷新

  historyApiFallback:
  在spa页面中, 依赖html5的history模式
 -->


> 配置 webpack.config.js 文件
- 在 devServer 中提供一些选项, 告诉它服务于哪个文件夹 由属性 contentBase 来决定
- inline: 表示是否要实时监听
<!--
  webpack.config.js

  devServer: {
    contentBase: './dist',
    inline: true
  }
  -->

> webpack-dev-server  把配置好的服务器跑起来
- 在终端中敲这个命令, 会去全局找, 我们没有在全局中安装这个server的包
- 所以我们在package.json里面映射, 之后运行命令时会先去本地找
<!-- 
  报错: 不是外部也不是内部命令
 -->


> 配置 package.json 文件
- 映射 dev -- 'webpack-dev-server --open'
<!-- 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
 -->
- --opn参数表示直接打开浏览器
<!-- 
  不加这个参数的时候 需要我们手动点击node终端里面提供的网址, 加上后自动打开

  "dev": "webpack-dev-server --open"
 -->


> 运行命令 
- npm run dev
- 之后就起到了 实时刷新页面的目的, 据说有点慢
- 之后就会保持点测试阶段
<!-- 
  webpack: Compiled successfully.
 -->

- 我们测试好了之后 应该 ctrl+c 然后退出测试 进行 npm run build打包最终文件

--------------------------

### webpack.config中的配置文件的分离
- 有些时候我们会发现, 有写配置是要开发时配置, 有些配置需要在发布的时候配置

- 比如下面的两种
- 1. 开发时不需要丑化(压缩js代码), 不方便我们查看源码, 发布阶段的话才需要把丑化加进来
<!-- uglifyjswebpackplugin插件 -->

- 2. 最终编译的时候 webpack.config.js 中是不需要 devServer 这个设置的, 这个配置只有在开发阶段用的到, 最终运行起来的时候用不到
<!-- 
  webpack.config.js

  devServer: {
    contentBase: './dist',
    inline: true
  }
 -->

- 所以我们需要对这些情况做一个分离, 开发的时候需要的配置做一个分离, 编译(发布)的时候需要的配置做一个分离

- 接下来我们把 webpack.config.js 文件中的配置做一个抽离 目的是开发时我们用一个配置文件, 发布时用另外一个配置文件

> 1. 创建 build 文件夹 和 配置文件
- 所有配置相关的文件都放在这个文件夹里面, 并在内部创建3个配置文件
<!-- 
  |- build文件夹
    | - base.config.js  
              // 这里面放一些公共的东西比如开发时依赖, 生产时也依赖的配置

    | - pord.config.js
              // 生产时需要的配置放在这里

    | - dev.config.js
              // 开发时需要的配置放在这里
 -->

- 把 webpack.config.js 的内容都粘贴到 base.config.js 文件里 把内容进行抽离, 比如开发时需要的配置, 生产时也需要的配置放在base.config.js文件中
<!-- 
  比如 devServer的配置, 它只在开发时才会用到
  比如 丑化插件, 它只在生产时才会用到

  它们两个就不要在这里了
 -->

- 把 webpack.config.js 的内容都粘贴到 dev.config.js 和 prod.config.js 文件里, 然后按照需求开始删
<!-- 
  base里有的配置都可以删掉, 只留下不同的 需要的

  // 比如 dev 中:

  module.exports = {
    devServer: {
      contentBase: './dist',
      inline: true
    }
  }
  就剩这点了


  // 比如 prod 中

  const UglifyjsWebpackPlugin = require('uglifujs-webpack-plugin');

  module.exports = {
    plugins: [
      new UglifyjsWebpackPlugin()
    ],
  }
 -->

- 完毕
- 也就是说 我们开发的时候最终需要
- dev.config.js + base.config.js

- 生产的时候最终需要
- prod.config.js + base.config.js


> 将抽离的文件进行合并
- 进入该项目的根目录下 下载 webpack-merge
- npm install webpack-merge --save-dev
<!-- 
  它可以对文件进行合并 

  npm install webpack-merge@4.1.5 --save-dev
-->

- 使用webpack-merge合并文件的语法, 在prod.config文件中引入这个包, 并且引入要合并的文件
<!-- 
  const webpackMerge = require('webpack-merge');
  const baseConfig = require('./base.config');
 -->
- 语法:
- module.exports = webpackMerge(和哪个文件合并在一起, 本文件的内容)
<!-- 
  module.exports = webpackMerge(baseConfig, {
    plugins: [
      new UglifyjsWebpackPlugin()
    ],
  })
 -->

> 1. 在 prod.config.js 文件中合并 base.config.js 文件
<!-- 
  const UglifyjsWebpackPlugin = require('uglifujs-webpack-plugin');

  // 我们要使用文件合并的包 要在这里引入
  const webpackMerge = require('webpack-merge');

  // 目的 我们要让prod.config.js 这个文件 和 base.config.js这个文件合并在一起

  // 把合并的结果进行导出
  module.exports = webpackMerge(base.config, {
    plugins: [
      new UglifyjsWebpackPlugin()
    ],
  })
 -->

> 2. 在 dev.config.js 文件中合并 base.config.js 文件
<!-- 
  const webpackMerge = require('webpack-merge');
  const baseConfig = require('./base.config');

  module.exports = webpackMerge(baseConfig, {
    devServer: {
      contentBase: './dist',
      inline: true
    }
  })
 -->

> 3. 之前我们用的webpack.config.js也可以删掉了
<!-- 
  也会带来一个问题, 当我们使用webpack命令的时候会报错, 提示没有找到配置文件, 并且配置文件的名称必须是 webpack.config.js

  可webpack.config.js被我删掉了 那怎么办 我们需要在package.json里面进行配置
 -->

> 4. 配置package.json中的script属性
- 上面因为我们把webpack.config.js文件中的配置进行了分离, 分离出了3个文件后把没有用的webpack.config.js文件删除了
- 所以在执行命令会报错, 因为找不到webpack的配置文件了

- 所以我们需要在 package.json中进行配置
<!-- 
  之前我们再script部分中做了命令的映射
  "build": "webpack",
  "dev": "webpack-dev-server --open"

  所以我们也要改一下这个部分, 让它们知道当我再次执行 build dev命令时执行哪一个配置文件

  "build": "webpack --config ./build/prod.config.js",
  "dev": "webpack-dev-server --open --config ./build/dev.config.js"

  通过--config给它手动指定了 不让它自动去找了 自动找的话只会找webpackconfig.js文件
 -->


> 5. 修改 出口文件的路径
<!-- 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "bundle.js",
  },
 -->
- 这个path是会根据这个base.config.js配置文件的位置去找dist文件夹, 所以会出现打包位置不正确的情况, 所以我们要修改为如下
<!-- 
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "bundle.js",
  },
 -->
- 让它找到正常dist文件夹