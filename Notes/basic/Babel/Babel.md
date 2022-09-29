### Babel介绍
- Babel是一个工具集、主要用于将ES6版本的JavaScript代码转为ES5等向后兼容的JS代码、从而可以运行在低版本浏览器或其它环境中
- 因此、你完全可以在工作中使用ES6编写程序、最后使用Babel将代码转为ES5的代码、这样就不用担心所在环境是否支持了。

- 示例：
```js
var fn = (num) => num + 2;

// 转换后
var fn = function fn(num) {
  return num + 2;
}
```

> babel的配置文件
- 1. babel.config.js
- babel在执行的时候会默认在当前目录寻找babel的配置文件

- 2. .babelrc | .babelrc.js 配置文件

- 3. package.json 配置文件

- 上述的3种配置方式使用一种就可以 作用都是一样的


> Babel官方的3个包
> @babel/cli
- Babel命令行转码工具、如果我们使用命令行进行Babel转码就需要安装它。

> @babel/core
- @babel/cli依赖@babel/core、因此也需要安装@babel/core这个Babel核心npm包。

> @babel/preset-env
- ES6转换ES5的语法转换规则、我们在Babel配置文件里指定使用它。


> Babel的主要工作有两部分
- 1. 语法转换
- 2. 补齐API

> 什么是补齐API？ 
- 简单解释就是、通过 Polyfill 的方式在目标环境中添加缺失的特性。
- 我们上一节的操作对var promise = Promise.resolve('ok')进行转换、会发现转换后的代码并没有改变、过程如下。

```js
  var fn = (num) => num + 2;
  var promise = Promise.resolve('ok')

  // 转换后
  var fn = function fn(num) {
    return num + 2;
  };
  var promise = Promise.resolve('ok');
```

- 我们可以发现 babel并没有对es6的promise进行转换
- 这样在ie或者比较老的浏览器中打开的时候仍然会报 Promise is not defined 的错误


> 原因:
- 因为Babel默认只转换新的JavaScript语法（syntax）、而不转换新的 API。


- 新的API分类两类
  一类是Promise、Map、Symbol、Proxy、Iterator等全局对象及其对象自身的方法、例如Object.assign、Promise.resolve；
  另一类是新的实例方法、例如数组实例方法[1, 4, -5, 10].find((item) => item < 0)

- 如果想让ES6新的API在低版本浏览器正常运行、我们就不能只做语法转换。


> 解决方式
- 在前端web工程里、最常规的做法是使用polyfill、为当前环境提供一个垫片。

- 所谓垫片、是指垫平不同浏览器之间差异的东西。
- polyfill提供了全局的ES6对象以及通过修改原型链Array.prototype等实现对实例的实现。

- polyfill广义上讲是为环境提供不支持的特性的一类文件或库、狭义上讲是polyfill.js文件以及@babel/polyfill这个npm包。

- 我们可以直接在html文件引入polyfill.js文件来作为全局环境垫片、 polyfill.js 有Babel官方的 polyfill.js、也有第三方的。我们引入一个Babel官方已经构建好的polyfill脚本。

- 简单起见、我们通过在html里引入polyfill.js的方式。
```html
  <script src="https://cdn.bootcss.com/babel-polyfill/7.6.0/polyfill.js"></script>
```


- 补齐API的方式除了通过引入 polyfill.js 文件 、还有通过在构建工具入口文件（例如webapck）、babel配置文件等方式进行。
- 本节讲的通过在HTML里直接引入 polyfill.js 文件 这种方式进行在现代前端工程里逐渐淘汰、很少使用了。但这种方式对初学者理解 polyfill 是做什么的是简单直接的。后续章节我们会学习到其它补齐API的方式


> Babel版本
- 目前、前端开发领域使用的Babel版本主要的Babel6和Babel7这两个版本。
- 你可能想问、怎么查看使用的Babel是哪个版本？
- 在入门章节、我们讲过Babel是一个工具集、而这个工具集是围绕@babel/core这个核心npm包构成的。每次@babel/core发布新版本的时候、整个工具集的其它npm包也都会跟着升级到与@babel/core相同的版本号、即使它们的代码可能一行都没有改变

- 因此、我们提到Babel版本的时候、通常是指@babel/core这个Babel核心包的版本。

- 在一次次版本变更的过程中、很多Babel工具以及npm包等都发生了变化、导致其配置文件有各种各样的写法。同时、很多Babel相关的文章没有注意到版本的问题、这给学习者也造成了很大的困惑。

- web前端开发有必要了解这两个版本的变化。
- Babel7的npm包都是放在babel域下的、即在安装npm包的时候、我们是安装@babel/这种方式
- 例如@babel/cli、@babel/core等。

- 而在Babel6、我们安装的包名是babel-cli、babel-core等。其实它们本质是一样的、都是Babel官方的cli命令行工具和core核心包、而且功能是一样的、只是名称版本变化了一下而已。在平时开发和学习的过程中、碰到'@babel/'和'babel-'应该下意识认识到他俩原本是一个包、只是版本不一样而已。

- 对于这两个版本更细微的变化、都会再接下来的各小节里讲到。

--- 

> Babel 配置文件
- 在前面几小节、我们已经简单使用过Babel的配置文件了。现在我们来深入学习它。
- 无论是通过命令行工具babel-cli来进行编译、还是webpack这类的构建工具、通常情况下、我们都需要建立一个Babel配置文件来指定编译的规则。

- Babel的配置文件是Babel执行时默认会在当前目录寻找的文件、主要有
  .babelrc
  .babelrc.js
  babel.config.js
  package.json
  
- 它们的配置项都是相同、作用也是一样的、只需要选择其中一种。


> .babelrc的配置样子
- .babelrc 里面直接定义的 配置对象
```js
{
  "presets": ["es2015", "react"],
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

> .babelrc.js的配置样子 -- 推荐
- 如果是 .js 的配置文件 那么我们就需要向外暴露
```js
module.exports = {
  "presets": ["es2015", "react"],
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

> package.json的配置样子
```js
"babel": {
  "presets": ["es2015", "react"],
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

- 我们发现配置中都有以下两个属性
- plugins : 插件数组
- presets : 预设数组

<!-- 
  - 除了把配置写在上述这几种配置文件里、我们也可以写在构建工具的配置里。对于不同的构建工具、Babel也提供了相应的配置项、
  - 例如webpack的babel-loader的配置项、其本质和配置文件是一样的、大家学会配置上述的一种、自然也就会其它的了、不再单独讲解。
 -->

*推荐: 后缀名是js配置文件*
- 因为可以使用js做一些逻辑处理、适用性更强。举一个例子

```js
//  这里只是举个例子、实际项目中、我们可以传入环境变量等来做处理
var year = 2020;
var presets = [];
if (year > 2018) {
  presets = ["@babel/env"];
} else {
  presets = "presets": ["es2015", "es2016", "es2017"],
}
module.exports = {
  "presets": presets,
  "plugins": []
}
```

> 插件与预设
- plugin代表插件
- preset代表预设
- 它们分别放在plugins和presets、每个插件或预设都是一个npm包。

- 本节开头提到了通过Babel配置文件来指定编译的规则、所谓编译的规则、就是在配置文件里列出的编译过程中会用到的Babel插件或预设。这些插件和预设会在编译过程中把我们的ES6代码转换成ES5。

- Babel插件的数量非常多、处理ES2015的
  @babel/plugin-transform-arrow-functions
  @babel/plugin-transform-block-scoped-functions
  @babel/plugin-transform-block-scoping

- 处理ES2018的有
  @babel/plugin-proposal-async-generator-functions
  @babel/plugin-transform-dotall-regex

- *所有的插件都需要先安装npm包到node_modules后才可以使用。*

- Babel插件实在太多、假如只配置插件数组、那我们前端工程要把ES2015,ES2016,ES2017…下的所有插件都写到配置项里、我们的Babel配置文件会非常臃肿。

- preset预设就是帮我们解决这个问题的。预设是一组Babel插件的集合、用大白话说就是插件包、例如babel-preset-es2015就是所有处理es2015的二十多个Babel插件的集合。这样我们就不用写一大堆插件配置项了,只需要用一个预设代替就可以了。另外、预设也可以是插件和其它预设的集合。


- Babel官方已经对常用的环境做了一些preset包:
  @babel/preset-env
  @babel/preset-react
  @babel/preset-typescript
  @babel/preset-stage-0
  @babel/preset-stage-1 …

*所有的预设也都需要先安装npm包到node_modules。*


> Babel插件和预设的参数
- 每个插件是插件数组的一成员项
- 每个预设是预设数组的一成员项
- 默认情况下、成员项都是用字符串来表示的、例如"@babel/preset-env"。

- 如果要给插件或预设设置参数、那么成员项就不能写成字符串了、而要改写成一个数组。数组的*第一项是插件或预设的名称字符串*、*第二项是个对象*、
- 该对象用来设置第一项代表的插件或预设的参数。例如给@babel/preset-env设置参数：

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


> plugin与preset的短名称
- 插件可以在配置文件里写短名称、如果插件的npm包名称的前缀为 *babel-plugin-、可以省略前缀*。例如
```js
module.exports = {
  "presets": [],
  "plugins": ["babel-plugin-transform-decorators-legacy"]
}

// 简写:
module.exports = {
  "presets": [],
  "plugins": ["transform-decorators-legacy"]
}
```

- 预设的短名称规则与插件的类似、预设npm包名称的前缀为babel-preset-或作用域@xxx/babel-preset-xxx的可以省略掉babel-preset-。




> Babel 预设与插件的选择
- Babel7.8官方的插件和预设目前有100多个、数量这么多、我们一个个都学习其作用是要花费大量时间的。
- 不过、我们没有必要全部学习。在我们现在的web前端工程里、常用的插件和预设其实只有几个。抓住重点、有的放矢地学习这几个、然后举一反三、这是最快掌握Babel的途径。


> preset预设的选择
- 在Babel6的时代、常见的preset有
  babel-preset-es2015、
  babel-preset-es2016、
  babel-preset-es2017、
  babel-preset-latest、
  babel-preset-stage-0、
  babel-preset-stage-1、
  babel-preset-stage-2等。

- babel-preset-es2015、babel-preset-es2016、babel-preset-es2017分别是TC39每年发布的进入标准的ES语法的转换器预设、我们在这里称之为年代preset。
- 目前、Babel官方不再推出babel-preset-es2017以后的年代preset了。

  babel-preset-stage-0
  babel-preset-stage-1
  babel-preset-stage-2
  babel-preset-stage-3

- 是TC39每年草案阶段的ES语法转换器预设

- 从Babel7版本开始、上述的预设都已经不推荐使用了、babel-preset-stage-X因为对开发造成了一些困扰、也不再更新。

- 总结起来、Babel官方的preset、我们实际可能会用到的其实就只有4个：
  @babel/preset-env
  @babel/preset-flow
  @babel/preset-react
  @babel/preset-typescript

- 一个普通的vue工程、Babel官方的preset只需要配一个"@babel/preset-env"就可以了。


> plugin插件的选择
- 虽然Babel7官方有90多个插件、不过大半已经整合在@babel/preset-env和@babel/preset-react等预设里了、我们在开发的时候直接使用预设就可以了。
- 目前比较常用的插件只有@babel/plugin-transform-runtime。

----------------

### babel-polyfill
- babel-polyfill在Babel7以后名字是 @babel/polyfill。

- polyfill广义上讲是为环境提供不支持的特性的一类文件或库、既有Babel官方的库、也有第三方的。babel-polyfill指的是Babel官方的polyfill、本教程默认使用babel-polyfill。

> polyfill传统上分两类、
  一类是已构建成JS文件的polyfill.js
  另一类是未构建的需要安装npm包@babel/polyfill。

- 因为@babel/polyfill本质是由两个npm包
- *core-js*与*regenerator-runtime*组合而成的


- 所有的例子、我们仍以火狐27.0不支持的Promise为例、进行演示。该版本的火狐、在遇到如下代码的时会报错
```js
  var promise = Promise.resolve('ok');
  console.log(promise);
```
- 报错信息为：ReferenceError: Promise is not defined


> 总体来说、Babel官方的polyfill使用方法主要有如下几种
> 1. 直接在html文件引入Babel官方的polyfill.js脚本文件
> 2. 在前端工程的入口文件里引入polyfill.js
```js
import './polyfill.js';
```

> 3. 在前端工程的入口文件里引入@babel/polyfill
```js
npm install --save @babel/polyfill

import '@babel/polyfill';
```

> 4. 在前端工程的入口文件里引入core-js/stable与regenerator-runtime/runtime；
- 该方法需要我们单独安装单独安装
  core-js
  regenerator-runtime

- 这两个npm包、这种方式core-js是默认是3.x.x版本。

<!-- 
  需要注意的是、我们使用该方法的时候、不能再安装@babel/polyfill了。因为@babel/polyfill在安装的时候、会自动把core-js与regenerator-runtime这两个依赖安装上了、而@babel/polyfill使用的core-js已经锁死为2.x.x版本了。
  core-js的2.x.x版本里并没有stable文件目录、所以安装@babel/polyfill后再引入core-js/stable会报错。
 -->

```js
npm install --save core-js regenerator-runtime

import "core-js/stable";
import "regenerator-runtime/runtime";
```

> 5. 在前端工程构建工具的配置文件入口项引入polyfill.js
- 在前端工程构建工具的配置文件入口项引入polyfill.js、该怎么操作呢?
- 其实很简单、那就是把数组的第一项改成'./polyfill.js'、原先的入口文件作为数组的第二项、polyfill就会打包到我们生成后的文件里了。
```js
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

> 6. 在前端工程构建工具的配置文件入口项引入@babel/polyfill
```js
npm install --save @babel/polyfill

const path = require('path');
module.exports = {
  entry: ['@babel/polyfill', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
```

> 7. 在前端工程构建工具的配置文件入口项引入core-js/stable与regenerator-runtime/runtime
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
- 从babel7.4开始、官方不推荐再使用@babel/polyfill了、因为@babel/polyfill本身其实就是两个npm包的集合：core-js与regenerator-runtime。

- 官方推荐直接使用这两个npm包。虽然@babel/polyfill还在进行版本升级、但其使用的core-js包为2.x.x版本、而core-js这个包本身已经发布到了3.x.x版本了、@babel/polyfill以后也不会使用3.x.x版本的包了。新版本的core-js实现了许多新的功能、例如数组的includes方法。

- 虽然*从babel7.4开始、不推荐再使用@babel/polyfill了*、但我们仍然把传统@babel/polyfill的使用方式在本节进行讲解、这对于理解其使用方式是非常有帮助的。


- ES6补齐API的方式、除了上述几种在前端工程入口文件或构建工具的配置文件里使用polyfill（或是其子包）的方式、还有使用Babel预设或插件进行补齐API的方式。
- 上述使用polyfill的方式、是把整个npm包或polyfill.js放到了我们最终的项目里了。完整的polyfill文件非常大、会影响我们的页面加载时间。
- 如果我们的运行环境已经实现了部分ES6的功能、那实在没有必要把整个polyfill都给引入。我们可以部分引入、这个时候需要使用Babel预设或插件了。

- Babel预设或插件不光可以进行补齐API、还可以对API进行转换、这些使用方法在后面两节讲解。


- 因此从2019年年中开始、我们的新项目都应该使用core-js和regenerator-runtime这两个包。即、我们应选择方法4与方法7。这两种方法、都是把两个npm包全部都引入到了我们的前端打包后的文件里了、对于部分引入的方法、我们将在后面两节进行讲解。

----------------

### @babel/preset-env
- 在Babel6时代、这个预设名字是 babel-preset-env、在Babel7之后、改成@babel/preset-env。
- @babel/preset-env是整个Babel大家族最重要的一个preset。不夸张地说、所有配置项仅需要它自己就可以完成现代JS工程所需要的所有转码要求。

> 下载
- npm install --save-dev @babel/preset-env

- @babel/preset-env是Babel6时代babel-preset-latest的增强版。该预设除了包含所有稳定的转码插件、还可以根据我们设定的目标环境进行针对性转码。
- 在Babel快速入门一节、我们简单使用过@babel/preset-env的语法转换功能。除了进行语法转换、该预设还可以通过设置参数项进行针对性语法转换以及polyfill的部分引入。

- @babel/preset-env的参数项、数量有10多个、但大部分我们要么用不到、要么已经或将要弃用。这里建议大家掌握重点的几个参数项、有的放矢。重点要学习的参数项有targets、useBuiltIns、modules和corejs这四个、能掌握这几个参数项的真正含义、就已经超过绝大部分开发者了。

- 对于preset、当我们不需要对其设置参数的时候、其写法是只需要把该preset的名字放入presets对于的数组里即可

```js
module.exports = {
  presets: ["@babel/env"],
  plugins: []
}

// 注意、@babel/env是@babel/preset-env的简写。
```

- 如果需要对某个preset设置参数、该preset就不能以字符串形式直接放在presets的数组项了。而是应该再包裹一层数组、数组第一项是该preset字符串、数组第二项是该preset的参数对象。如果该preset没有参数需要设置、则数组第二项可以是空对象或者不写第二项。以下几种写法是等价的：

```js
module.exports = {
  presets: ["@babel/env"],
  plugins: []
}

module.exports = {
  presets: [["@babel/env", {}]],
  plugins: []
}

module.exports = {
  presets: [["@babel/env"]],
  plugins: []
}
```

- 如果你使用过vue或react的官方脚手架cli工具、你一定会在其package.json里看到browserslist项、下面该项配置的一个例子：
```json
"browserslist": [
  "> 1%",
  "not ie <= 8"
]
```

- 上面的配置含义是、目标环境是市场份额大于1%的浏览器并且不考虑IE8及以下的IE浏览器。

- *Browserslist叫做目标环境配置表*
- 除了写在package.json里、也可以单独写在工程目录下.browserslistrc文件里。

- 我们用browserslist来指定代码最终要运行在哪些浏览器或node.js环境。
- Autoprefixer、postcss等就可以根据我们的browserslist、来自动判断是否要增加CSS前缀


- 我们的Babel也可以使用browserslist、如果你使用了@babel/preset-env这个预设、此时Babel就会读取browserslist的配置。
- 如果我们的@babel/preset-env不设置任何参数、Babel就会完全根据browserslist的配置来做语法转换。如果没有browserslist、那么Babel就会把所有ES6的语法转换成ES5版本。

- 在本教程最初的例子里、我们没有browserslist、并且@babel/preset-env的参数项是空的、ES6箭头函数语法被转换成了ES5的函数定义语法。

```js
var fn = (num) => num + 2;


"use strict";
var fn = function fn(num) {
  return num + 2;
};
```

- 如果我们在browserslist里指定目标环境是Chrome60、我们再来看一下转换结果、github配套代码babel09。

```json
"browserslist": [
  "chrome 60"
]
```

```js
"use strict";
var fn = num => num + 2;
```

- 我们发现转换后的代码仍然是箭头函数、因为Chrome60已经实现了箭头函数语法、所以不会转换成ES5的函数定义语法


**注意:**
- Babel使用browserslist的配置功能依赖于@babel/preset-env、如果Babel没有配置任何预设或插件、那么Babel对转换的代码会不做任何处理、原封不动生成和转换前一样代码。

- 既然@babel/preset-env可以通过browserslist针对目标环境不支持的语法进行语法转换、那么是否也可以对目标环境不支持的特性API进行部分引用呢？这样我们就不用把完整的polyfill全部引入到最终的文件里、可以大大减少体积。


> 参数项:
> targets
- 该参数项可以取值为字符串、字符串数组或对象、不设置的时候取默认值空对象{}。
- 该参数项的写法与browserslist是一样的、下面是一个例子

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

- 如果我们对@babel/preset-env的targets参数项进行了设置、那么就不使用browserslist的配置、而是使用targets的配置。如不设置targets、那么就使用browserslist的配置。如果targets不配置、browserslist也没有配置、那么@babel/preset-env就对所有ES6语法转换成ES5的。

- 正常情况下、我们推荐使用browserslist的配置而很少单独配置@babel/preset-env的targets


> useBuiltIns
- useBuiltIns项取值可以是"usage" 、 "entry" 或 false。如果该项不进行设置、则取默认值false。

- useBuiltIns这个参数项主要和polyfill的行为有关。在我们没有配置该参数项或是取值为false的时候、polyfill就是我们上节课讲的那样、会全部引入到最终的代码里。

- useBuiltIns取值为"entry"或"usage"的时候、会根据配置的目标环境找出需要的polyfill进行部分引入。让我们看看这两个参数值使用上的不同。

**entry:**
- 这种方式不会根据我们实际用到的API进行针对性引入polyfill
- 在使用的时候、'entry'需要我们在项目入口处手动引入polyfill

- 我们在入口文件用import语法引入polyfill（也可以在webpack的entry入口项）。此时的Babel配置文件如下：
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

- 注意:
- 使用'entry'这种方式的时候、只能import polyfill一次、一般都是在入口文件。如果进行多次import、会发生错误。


**usage:**
- 这种方式可以根据我们实际用到的API进行针对性引入polyfill
- 在使用的时候、'usage'不需要我们在项目入口处手动引入polyfill


- "usage"在Babel7.4之前一直是试验性的、7.4之后的版本稳定。
- 这种方式不需要我们在入口文件（以及webpack的entry入口项）引入polyfill、Babel发现useBuiltIns的值是"usage"后、会自动进行polyfill的引入。

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

- 使用useBuiltIns:"usage"后、Babel除了会考虑目标环境缺失的API模块、同时考虑我们项目代码里使用到的ES6特性。只有我们使用到的ES6特性API在目标环境缺失的时候、Babel才会引入core-js的API补齐模块。


> corejs
- 该参数项的取值可以是2或3、没有设置的时候取默认值为2（还有一种对象proposals取值方法、我们实际用不到、忽略掉即可）
- 这个参数项只有useBuiltIns设置为'usage'或'entry'时、才会生效。

- 取默认值或2的时候、Babel转码的时候使用的是core-js@2版本（即core-js2.x.x）。因为某些新API只有core-js@3里才有、例如数组的flat方法、我们需要使用core-js@3的API模块进行补齐、这个时候我们就把该项设置为3。

- 需要注意的是、corejs取值为2的时候、需要安装并引入core-js@2版本、或者直接安装并引入polyfill也可以。如果corejs取值为3、必须安装并引入core-js@3版本才可以、否则Babel会转换失败并提示：
```error
`@babel/polyfill` is deprecated. Please, use required parts of `core-js` and `regenerator-runtime/runtime` separately
```


> modules
- 这个参数项的取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候、取默认值"auto"。

- 该项用来设置是否把ES6的模块化语法改成其它模块化语法。

- 我们常见的模块化语法有两种：
（1）ES6的模块法语法用的是import与export；
（2）commonjs模块化语法是require与module.exports。

- 在该参数项值是'auto'或不设置的时候、会发现我们转码前的代码里import都被转码成require了。

- 如果我们将参数项改成false、那么就不会对ES6模块化进行更改、还是使用import引入模块。

- 使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具、可以进行静态分析、从而可以做tree shaking 等优化措施。

----------------

### @babel/plugin-transform-runtime
- 本节主要讲@babel/plugin-transform-runtime以及@babel/runtime。

- 在我们用Babel做语法转换的时候（注意、这里是单纯的做语法转换、暂时不使用polyfill补齐API）、需要Babel在转换后的代码里注入一些函数才能正常工作、先看一个例子。

- Babel配置文件如下、用@babel/preset-env做语法转换：
```js
{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
  ]
}
```

- 转换前的代码使用了ES6的class类语法：
```js
class Person {
  sayname() {
    return 'name'
  }
}
var john = new Person()
console.log(john)

// Babel转码后生成的代码如下：
"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }
  _createClass(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);
  return Person;
}();
var john = new Person();
console.log(john);
```

- 可以看到转换后的代码上面增加了好几个函数声明、这就是注入的函数、我们称之为辅助函数。@babel/preset-env在做语法转换的时候、注入了这些函数声明、以便语法转换后使用。

- 但样这做存在一个问题。在我们正常的前端工程开发的时候、少则几十个js文件、多则上千个。如果每个文件里都使用了class类语法、那会导致每个转换后的文件上部都会注入这些相同的函数声明。这会导致我们用构建工具打包出来的包非常大。

- 那么怎么办？一个思路就是、我们把这些函数声明都放在一个npm包里、需要使用的时候直接从这个包里引入到我们的文件里。这样即使上千个文件、也会从相同的包里引用这些函数。通过webpack这一类的构建工具打包的时候、我们只会把使用到的npm包里的函数引入一次、这样就做到了复用、减少了体积。

- @babel/runtime就是上面说的这个npm包、@babel/runtime把所有语法转换会用到的辅助函数都集成在了一起。

> 下载:
- 我们先安装这个包：
- npm install --save @babel/runtime
- npm install --save-dev @babel/cli @babel/core  @babel/preset-env

- 然后到node_modules目录下看一下这个包结构
- _classCallCheck, _defineProperties与 _createClass这个三个辅助函数就在图片所示的位置、我们直接引入即可。

- 我们手动把辅助函数替换掉函数声明、之前文件的代码就变成如下所示：
```js
"use strict";
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _defineProperties = require("@babel/runtime/helpers/defineProperties");
var _createClass = require("@babel/runtime/helpers/createClass");
var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }
  _createClass(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);
  return Person;
}();
var john = new Person();
console.log(john);
```

- 这样就解决了代码复用和最终文件体积大的问题。不过、这么多辅助函数要一个个记住并手动引入、平常人是做不到的、我也做不到。这个时候、Babel插件@babel/plugin-transform-runtime就来帮我们解决这个问题。

> @babel/plugin-transform-runtime
- 有三大作用
- 其中之一就是自动移除语法转换后内联的辅助函数（inline Babel helpers）、使用@babel/runtime/helpers里的辅助函数来替代。这样就减少了我们手动引入的麻烦。

- 现在我们除了安装@babel/runtime包提供辅助函数模块、还要安装Babel插件@babel/plugin-transform-runtime来自动替换辅助函数：

- npm install --save @babel/runtime
- npm install --save-dev @babel/cli @babel/core  @babel/preset-env @babel/plugin-transform-runtime

```js
{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

- 它生成的代码比我们完全手动引入@babel/runtime里的辅助函数更加优雅。实际前端开发的时候、我们除了安装@babel/runtime这个包外、一定会安装@babel/plugin-transform-runtime这个Babel插件包的。


> @babel/plugin-transform-runtime (2)
- @babel/plugin-transform-runtime有三大作用
- 1. 自动移除语法转换后内联的辅助函数（inline Babel helpers）、使用@babel/runtime/helpers里的辅助函数来替代；

- 2. 当代码里使用了core-js的API、自动引入@babel/runtime-corejs3/core-js-stable/、以此来替代全局引入的core-js/stable;

- 3. 当代码里使用了Generator/async函数、自动引入@babel/runtime/regenerator、以此来替代全局引入的regenerator-runtime/runtime；

- 这一节我们着重来学习作用2和作用3。
- 作用2和3其实是在做API转换、对内置对象进行重命名、以防止污染全局环境。

- 在babel-polyfill一节、我们学习了引入'babel-polyfill'或'core-js/stable与regenerator-runtime/runtime'来做全局的API补齐。但这样可能有一个问题、那就是对运行环境产生了污染。例如Promise、我们的polyfill是对浏览器的全局对象进行了重新赋值、我们重写了Promise及其原型链。

- 有时候我们不想改变或补齐浏览器的window.Promise、那么我们就不能使用'babel-polyfill'或'core-js/stable与regenerator-runtime/runtime'、因为其会对浏览器环境产生污染（即修改了浏览器的window.Promise）。

- 这个时候我们就可以使用@babel/plugin-transform-runtime、它可以对我们代码里ES6的API进行转换。还是以Promise举例子。

```js
// Babel转换前的代码
var obj = Promise.resolve();

// 转换后
var obj = Promise.resolve();
```

- 若使用了'babel-polyfill'或'core-js/stable与regenerator-runtime/runtime'来做全局的API补齐、那么Babel转换后的代码仍然是
- polyfill只是补齐了浏览器的window.Promise对象。
- 若我们不使用polyfill、而开启@babel/plugin-transform-runtime的API转换功能。那么Babel转换后的代码将是
```js
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var obj = _promise["default"].resolve();
```

- 看到效果了没？@babel/plugin-transform-runtime把我们代码里的Promise变成了_promise["default"]、而_promise["default"]拥有ES标准里Promise所有的功能。现在、即使浏览器没有Promise、我们的代码也能正常运行。

- 开启core-js相关API转换功能的Babel配置与安装的npm包如下
```js
npm install --save @babel/runtime-corejs3
npm install --save-dev @babel/cli @babel/core  @babel/preset-env @babel/plugin-transform-runtime

{
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

- 那么、上面讲的API转换有什么用、明明通过polyfill补齐API的方式也可以使代码在浏览器正常运行？
- 其实、API转换主要是给开发JS库或npm包等的人用的、我们的前端工程一般仍然使用polyfill补齐API。

- 可以想象、如果开发JS库的人使用polyfill补齐API、我们前端工程也使用polyfill补齐API、但JS库的polyfill版本或内容与我们前端工程的不一致、那么我们引入该JS库后很可能会导致我们的前端工程出问题。所以、开发JS库或npm包等的人会用到API转换功能。

- 当然、我们前端工程开发的时候也是可以使用@babel/plugin-transform-runtime的API转换功能、毕竟没有污染全局环境、不会有任何冲突。@babel/plugin-transform-runtime的默认设置下、就是对generators/async开启了API转换功能。

- 细心的你可能已经发现了、我们安装npm包的时候、安装的是
- @babel/runtime-corejs3、而上一节我们安装的是@babel/runtime

- 看名字挺像的、那么这两者有什么不同呢？

- 在我们不需要开启core-js相关API转换功能的时候、我们只需要安装@babel/runtime就可以了。上一节我们已经知道、@babel/runtime里存放的是Babel做语法转换的辅助函数。

- 在我们需要开启core-js相关API转换功能的时候、就需要安装@babel/runtime的进化版@babel/runtime-corejs3。这个npm包里除了包含Babel做语法转换的辅助函数、也包含了core-js的API转换函数。

- 除了这两个包、还有一个@babel/runtime-corejs2的包。它和@babel/runtime-corejs3的功能是一样的、只是里面的函数是针对core-js2版本的。

- 上面的例子主要是拿Promise来讲的、它属于作用2、即对core-js的API进行转换。其实理解了作用2、也就理解了作用3。

- 下面简单说一下作用3。

- 在之前章节、若我们转码前代码里有Generator函数或async函数、转码后需要引入'regenerator-runtime/runtime'做全局API补齐。

- 全局API补齐必然会对浏览器的window对象进行修改、如果我们不想要污染window、那么我们就不能引入'regenerator-runtime/runtime'了。

- 这个时候、我们可以开启@babel/plugin-transform-runtime的作用3、对Generator/async进行API转换。

- 需要注意的是、@babel/plugin-transform-runtime对Generator/async进行API转换功能、默认是开启的、不需要我们设置。

- 如何开启或关闭@babel/plugin-transform-runtime的某个功能、除了与安装的npm包有关、也与Babel配置文件的配置有关、我们下一节来讲。

- 注：
- 如果我们使用@babel/plugin-transform-runtime来做polyfill的事情、那么就不要再使用之前讲过的polyfill方式了、无论是单独引入还是@babel/preset-env的方式。因为我们用transform-runtime来做api转换的目的是不污染全局作用域。

----------------

### @babel/core
- @babel/core是我们使用Bable进行转码的核心npm包、我们使用的babel-cli、babel-node都依赖这个包、因此我们在前端开发的时候、都需要安装这个包。

- 在我们的工程目录里、执行下面的命令、安装@babel/core。
  npm install --save-dev @babel/core

------

### babel-loader
- babel-loader是用于webpack的一个loader、以便webpack在构建的时候用Babel对JS代码进行转译、这样我们就不用再通过命令行手动转译了。我们在配置该loader的时候需要先安装它：

  npm install babel-loader

- 在webpack配置文件中、我们把babel-loader添加到module的loaders列表中：
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

- 在这里、我们通过options属性给babel-loader传递预设和插件等Babel配置项。我们也可以省略这个options、这个时候babel-loader会去读取默认的Babel配置文件、也就是.babelrc、.babelrc.js、babel.config.js等。在现在的前端开发中、建议通过配置文件来传递这些配置项。

------

> 最后

- 上周的时候 我在本地新建了一个项目 然后测试了下 发现 mounted 里面的逻辑没有执行 然后池田先生使用npm generate 和 npm start 发现可以了 mounted中的逻辑得到了执行 同时也加上了类名 

- 但是同样的操作 同样的代码 在kinto的项目里就不行 在mounted中 给元素添加类名的操作都不行

- 然后我发现 script 1022的错误 我觉得可能是ie和某些插件冲突 或者想尝试把swiper降到 3.4.2 

----------------

### Babel 文档
- https://www.babeljs.cn/docs/

> 在 node 环境下使用 import export
- npm install --save-dev @babel/core @babel/cli @babel/preset-env
<!-- 
  好像要全局安装 babel-cli 
  剩下的两个包可以局部安装吧
 -->

- 然后原来是: node server.js
- 改为这样调用: babel-node --presets env server.js