# 模块化的理解
将一个复杂的程序依据一定的规则封装成几个块(文件), 并进行组合在一起 块的内部数据/实现是私有的, 只是向外暴露一些接口(方法)与外部其它模块通信

<br>

### 把所有的 js 代码写在一个 js 文件里的弊端:
耦合度高, 关联性太强 不容易维护, 不方便复用

<br><br>

## 模块的基本概念
既然把所有的 js 文件写在一个 html 文件中有耦合度高 不方便维护的问题, 我们就会按照 js 的功能来定义不同的 js 文件

这样能解决上述的问题但是从而带来了另外的一些问题

<br>
 
### 问题:
**在外部 js 文件中的变量不安全**, 我们可以在 html 文件中修改到 会覆盖掉外部 js 中的文件 这样并不安全
```js
// 外部js文件:
function foo() {
  let a = 10;
  console.log(a);
}

// html文件:
foo();      // 10
foo = 10;   // 在html文件中修改变量名foo
foo();      // foo is not a function
```

<br>

### 解决方式:
为了解决 安全性的目的 我们采用了匿名函数自调用的方式, 这样相当于一个私有的作用域 外部访问不到函数内部的私有数据
```js
// 函数作用域
(function() { })()
```

<br>

### 匿名函数自调用(闭包)
我们在 js 文件中写上如下格式的代码 这样下面的代码相当于在一个函数作用域中
```js
(function() {
  let msg = 'module3';


  // 问题: 我们要向外暴露它
  function foo() {
    console.log("foo()", msg);
  }
})()
```

然后再在 html 文件中引入 index.js 文件 但是也有一个问题 这样 我们在 html 页面并没有办法调用 foo() 会提示foo未定义

所以我们需要把这foo个函数 从立即执行函数中暴露出去

<br>

### 挂载到window对象上的方式
在我们在 index.html 文件中 引入下面的js文件之后 因为是自调用函数 所以它会立即执行 我们把window传递进去

这样函数内部就可以利用window对象 往它身上添加属性 利用window对象我们将私有作用域中的方法暴露出去了

```js
(function(window) {

  let msg = "内部缓存的数据"      
  console.log("我们看看能输出window么？", window)

  function showInfo() {
    console.log(msg)
  }

  window.moduleApi = {
    showInfo
  }

})(window)

// index.html文件中调用这个函数
moduleApi.foo();
```

<br>

上述的方法虽然解决了安全性的问题, 同时也带来了另一个问题, 我们需要在 html 文件中引入多个 js 文件

```js
<script src='./js/index1.js'></script>
<script src='./js/index2.js'></script>
<script src='./js/index3.js'></script>
<script src='./js/index4.js'></script>
```

<br>

### 问题:
- 请求过多
- 依赖关系模糊(引入的文件的顺序不能串, 因为它们之间是互相依赖的)
- 同样也难以维护

为了解决上述的问题 我们又再次改进了模块快的机制, 我们不再在浏览器端处理引入js文件顺序的问题 而是在模块js文件中 引入它所依赖的文件

<br>

### IIFE 模式增强: 引入依赖
这就是现代模块实现的基石

<br>

### 需求:
我们在 html 页面中调用上面的函数的同时, 修改 body 的背景颜色, 这种模式就叫做引入依赖 修改背景色的api我们要使用 jq

什么意思, 就是在这个模块中 按照需求 我们引入了另一个模块, 这样关系就明确了

也就是模块js文件中依赖 jq

```js
// 需求: 我们再html页面中调用函数的同时, 修改body的背景颜色, 这种模式就叫做引入依赖
(function(window, $) {

  let msg = 'module4';

  function foo() {
    console.log("foo()", msg);
  }

  // 直接给window添加了一个属性, 内容是一个函数 这样调用的时候 可以直接 module4()
  window.module4 = foo;


  // 注意这里 jq 没有暴露 只是利用

  // 因为我们要在这里使用jQ的语法修改body的背景颜色, 所以我们把jQ也注入进来, jQuery是全局对象, 可以不用注入但是如果不是全局的对象一定要依赖注入进来
  $('body').css('background', 'red');


// jQuery有这个对象, 形参我们使用$是一样的还方便
})(window, jQuery)



// 我们再html页面中可以直接调用module4(), 同时就会修改掉body的背景颜色
module4();
```

<br><br>

# 模块化的规范

常用的模块化规范有 
- commonJS 
- AMD 
- CMD 
- ES6

nodeJS就是基于commonJS这种模块化规范编写的 CMD作为了解就可以(阿里自己写的 阿里的人在用)

<br><br>

# commonJS

## 概念:
每一个 js 文件都可当做一个模块 所以一个文件就相当于有自己的作用域 不担心命名冲突等问题

<br>

### 在服务器端:
模块的加载是运行时同步加载的

同步带来的后果是会阻塞, 服务器端没有太大问题无非是等待时间长一点

<br>

### 在浏览器端:
模块需要提前编译打包处理

浏览器端现在有一个模块 要向服务器端发送请求 但是服务器端本身有多个模块在等待 同步会发生阻塞, 浏览器端需要等待服务器返回的结果 这个时间可能会很长

浏览器端体验就会很差, 有的时候模块大 网速慢, 可能浏览器会卡死 所以浏览器端使用commonJS会有问题

还有commonJS中 require语法 浏览器引擎不认识 所以浏览器端要使用commonJS规范要提前编译打包处理

<br>

commonJS 其实就是引入了外部的 js 文件, 但是是通过 commonJS 的语法引入 或者 通过 commonJS 语法来向外暴露

通过 commonJS 语法完成的暴露 和 引入 可以把模块中的代码想象成被包裹在一个匿名自调用函数里 不会污染全局空间 模块与模块之间都是一个闭包 都是独立

<br><br>

# commonJS 基本语法

### 暴露模块的语法:
```js
// value 可以是任意的数据类型
module.exports = value;
exports.xxx = value;
```

<br>

### 那 它们 暴露的本质是谁?
module.exports 和 exports.xxx 暴露的都是 exports 这个对象

<br>

### module.exports
module.exports 本身就有值 是一个空的对象 ``module.exports = { }``
那 ``module.exports = value`` , 相当于用 value 把 原来的 { } 覆盖了

<br>

### exports.xxx
相当于我可以无限给 exports 这个对象无限的添加属性/方法

<br>

### 引入模块:
它分为两种情况 我们的模块通常分为自定义模块 和 第三方模块  
这两种方式 我们在引用的时候要注意路径问题
```js
require(xxx);

//自定义模块:
require(模块文件路径)

// 第三方模块:
require(模块名or包名)
```

<br>

### 注意:
当引入第三方库的时候 要放到自定义的上面

<br>

### 利用对象的解构来取得js模块中导出的变量
```js 
// aaa.js:
module.exports = {
  flag,
  sum
}

// bbb.js里引入aaa.js
let {flag, sum} = require("./aaa.js");
```

<br><br>

# commonJS 实现

### 服务器端实现:
nodejs
```
http://nodejs.cn
```

<br>

### 浏览器端:
browserify 也称 为 commonJS 的浏览器端的打包工具  

我们再浏览器端使用commonJS ES6规范编写的模块 需要提前编译打包的 编译打包的工具叫做browserify
```
http://browserify.org
```

<br><br>

## 案例: 服务器端的应用 --- Node.js 模块化流程
**1. 下载安装 node.js**

<br>

**2. 创建项目结构**
```js 
|- app.js // 要把其它的模块(module1-3) 汇集到这个 app.js 的模块
- package.json

  |- modules
    |- module1.js
    |- module2.js
    |- module3.js



// package.json:
{
  "name":"commonJS-node",
  "version":"1.0.0"
}
```

<br>

**3. 下载第三方模块**  
作用去重 和 排序(根据数字第一位的编码去排序的)
```
npm install uniq --save
```

```js
// uniq的使用规则
let arr = [1,1,2,2,3,5];

// uniq这个包向外暴露的是一个函数 因为它加() 调用了, 往里传递了一个数组
require('uniq')(arr)
console.log(arr)

// [1,2,3,5]
```

<br>

**4. 模块js文件的代码如下**  
module1.js
```js 
// 向外暴露模块 使用module.exports = { }的形式

// 我们向外面暴露出去一个对象
module.exports = {
  msg:'module1',
  foo() {
    console.log(this.msg)
  }
}
```

<br>

module2.js
```js
// 暴露一个函数 module.exports = value
module.exports = function() {
  console.log('module2');
}
```

<br>

module3.js
```js
// exports.xxx = value 的方式向外暴露
exports.foo = function() {
  console.log('foo() module3');
};

// 我们还可以继续暴露, 因为exports.xxx的形式 是无限的往exports对象中添加属性
exports.bar = function() {
  console.log('bar() module3');
};

// 继续向外暴露一个数组
exports.arr = [2,4,5,2,3,5];

// module.exports = { } 这种形式, 会覆盖掉原先exports身上的数据 因为是对象 地址值指向了另一个对象
```

<br>

上面三个模块编写好后 我们要汇入主模块 app.js 使用 require() 语法 引入
```js
// app.js中的代码

// 在引入第三方库的时候要放到上面
let uniq = require('uniq');

// 将其他的模块汇集到主模块
let module1 = require('./modules/module1');
let module2 = require('./modules/module2');
let module3 = require('./modules/module3');

/*
  输出module1中的语句, module1是一个对象
  module.exports = {
    msg:'module1',
    foo() {
      console.log(this.msg)
    }
  }
*/
module1.foo();

/*
  输出module2中的语句, module2是一个函数

  // 暴露一个函数 module.exports = value
  module.exports = function() {
    console.log('module2');
  }
*/
module2();

/*
  输出module3中的语句, module3是一个对象, 通过对象是找属性

  exports.foo = function() {
    console.log('foo() module3');
  };

  exports.bar = function() {
    console.log('bar() module3');
  };
*/
module3.bar();
module3.foo();

// uniq是一个函数 参数是arr 传递的是module3里面的arr 函数调用会有返回值
let result = uniq(module3.arr);
console.log(result);

// 接下来我们运行一下
```

<br><br>

## 案例: 浏览器端的应用 --- Browserify 模块化流程
打包生成的文件 默认都会创建 dist 文件夹 或 build 文件夹里面

基于服务器端运行 app.js 文件 是通过 node 命令来运行的 

基于浏览器端是 app.js 最终要跑在 index.html 上

<br>

**1. 创建项目结构**
```js 
|- js
  |- dist
  |- src                // 开发的时候写的源文件
    |- module1.js
    |- module2.js
    |- module3.js
    |- app.js           // 应用主源文件

- index.html  
- package.json

{
  "name":"browserify-test",
  "version":"1.0.0"
}
```

<br>

**2. 下载 browserify**  
下面的两步都要做
```
全局: npm install browserify -g
局部: npm install browserify --save-dev
```

browserify这个工具只是帮助我们在开发的时候打包 **一旦上线了跟它没有关系了** 它已经把活干完了 所以使用 --save-dev

<br>

**3. 定义模块代码**

<br>

**4. 对汇总好的 app.js 文件使用 browserify 工具打包处理**

- 在项目的根目录下 使用 browserify 命令

- 我们安装好 browserigy 工具包后就会有 browserify 这个命令 通过这个命令来打包文件

```js
browserify js/src/app.js -o js/dist/bundle.js
```

<br>

**5. 在浏览器中引入打包生成的 js 文件(bundle.js)而不是 app.js 文件**

<br>

### 总结:
我们在浏览器端使用 commonJS 规范创建模块的时候, 要对汇总的 app.js 文件使用 browserify 工具进行转移

原因在于直接使用 app.js 文件跑在浏览器端, 浏览器端不认识 commonJS 的语法比如 require

<br><br>

# AMD Asynchronous Module Definition(异步模块定义)
```
https://github.com/amdjs/amdjs-api/wiki/AMD
```

<br>

AMS 的实现需要依赖于 Require.js 库的
```
http://www.requirejs.cn
http://www.ruanyifeng.com/blog/2012/11require_js.html
```

专门用于浏览器端 模块的加载是异步的(如果是同步的还是会出现阻塞导致一些问题)

<br>

## 基本语法:

### 定义暴露模块:
定义没有依赖的模块
```js
define(function() {
  return 模块(往外暴露一些 api 之类)
})
```

<br>

### 定义有依赖的模块:
这种模式叫做声明式依赖注入

```js
// 形参是和前面对应的模块 module1 module2 就可以在函数内部通过形参使用这两个模块
define(['module1', 'module2'], function(m1, m2) {
  return 模块
})
```

<br>

### 引入模块:
通常放在主模块 比如 app.js
```js
require(['module1', 'module2'], function(m1, m2) {
  使用 m1 / m2
})
```

<br>

### 案例: 不使用模块规范 创建模块概念
我们再看看在没有模块规范之前 我们是怎么做到模块之间的建立 依赖 引用的

<br>

**1. 创建 js 模块**  
我们先定义一个没有依赖的 module1 js 模块
```js
(function(window) {
  let name = 'dataService.js';

  function getName() {
    return name;
  }
  window.dataService = {
    getName: getName
  };
})(window)
```

module2:  
接下来我们定义一个依赖于 module1 的 module2 模块
```js
(function(window, dataService) {
  let msg = 'alerter.js';
  function showMsg() {

    // 同时我们在这个方法中输出module1里面的内容
    console.log(msg, dataService.getName());
  }

  // 我们把showMsg这个方法暴露出去
  window.alerter = {showMsg};

  // 我们把dataService.js也引入进来, 这样这个内部函数就能使用module1中暴露出来的方法
})(window, dataService)
```

app.js:  
我们定义一个主模块, 用来汇集 module1 2
```js
// 这是主模块 不需要向外暴露什么 只需要把两个文件引入进来
(function(alerter) {
  alerter.showMsg();
})(alerter)

// 我们这里只传递了alerter
```

<br>

**2. 我们创建 html 文件**  
注意我们在引入 js 文件的时候, 要根据依赖关系 依次引入 js 文件, 顺序不能乱不然就会出现 alerter 未定义的报错信息
```js
<script src='./js/dataService.js'></script>
<script src='./js/alerter.js'></script>
<script src="./app.js"></script>
```

<br><br>

# 利用 AMD 规范来实现模块的概念
AMD 需要使用 require.js 库 所以我们要先下载

<br>

### 引入自定义模块的方式:
**1. 下载 require.js, 并引入**
```
官网: http://www.requirejs.cn
github: https://github.com/requirejs/requirejs
```

将 require.js 导入项目: js/libs/require.js

<br>

**2. 创建项目结构**
```
|- js

  |- libs
    |- require.js
  |- modules
    |- alerter.js
    |- dataService.js
  |- main.js

|- index.html
```

<br>

**3. 定义模块代码**
module1
```js 
// 定义一个没有依赖的模块 我们用require语法 或者叫做 amd语法
define(function() {
  let name = 'dataService.js';
  function getName() {
    return name;
  }

  // 暴露模块之前没有规范的时候 我们只能用winodw的方式 现在暴露模块有自己的语法
  return {getName};
  // 直接暴露的接口是一个对象 对象里面是一个方法
});
```

module2:
```js 
// 定义一个有依赖的模块
define(['dataService'], function(dataService) {
  let msg = 'alerter.js';
  function showMsg() {
    console.log(msg, dataService.getName());
  }

  // 暴露模块, 通常我们都会暴露一个对象 对象里面可以暴露多个数据, 只暴露一个函数的话 会有局限性
  return {
    showMsg
  };
})
```

<br>

**4. 主模块 main.js 里面的内容**
1. 我们会在主模块里 先来一层立即执行函数 把主模块的主要内容包裹起来
2.  在立即执行函数内部, 分为两个部分  

配置引入的所有模块的查找路径(名字应该跟 require 中[参数]一致)
```js
// config 是一个方法 就是对当前的文件进行配置
requirejs.config({
  baseUrl: 'js/',
  paths: {
    dataService: './modules/dataService',
    alerter: './modules/alerter'
  }
});

// baseUrl: 如果使用baseUrl的话 是站在根目录(js文件夹)的角度去找模块文件, 它其实最终会跟paths里面的路径拼起来的

// ./js/ + modules/    也就是说先找js文件夹 然后找modules文件夹

// paths: 如果不用baseUrl的话, 我们只使用paths 是在当前这个文件 也就是main.js的角度去找
```

在主文件中引入要使用的模块, 注意 我们只需要传入要使用的模块就可以, 依赖的文件amd会根据paths中的路径自己去找
```js
  requirejs(['alerter'], function(alerter) {
  alerter.showMsg();
})
```

<br>

**注意:**  
只要是在 paths 中配置好了路径后 这些模块在当前项目下的任何地方都可以使用

<br>

**5. 在 html 文件中, 引入 require.js 文件 并指定 js 主文件的入口**
只要引入 require.js 会马上看 data-main 去找主文件
```js
<script data-main='js/main.js' src='js/libs/require.js'></script>
```

<br>

**最终:**
```js
(function() {
  requirejs.config({
    paths: {
        dataService: './modules/dataService',
        alerter: './modules/alerter'
    }
  });

  requirejs(['alerter'], function(alerter) {
    alerter.showMsg();
  })
})()
```

<br><br>

## 引入第三方模块的方式:
比如我们的 alerter.js 依赖于 jQuery 库 这时我们可以

- 当 jQuery 遇到 amd 规范的时候 不能使用 jQuery 必须是小写的 jquery
- jQuery 支持 amd 规范
- 并不是所有的库都支持 amd 规范
- angular 库得需要额外的配置

```js
(function() {
  requirejs.config({
    paths: {
      dataService: './modules/dataService',
      alerter: './modules/alerter',
      jquery:'./libs/jquery-1.10.1',

      // 引入angular
      angular:'./libs/angular'
    },

    // angular需要格外的配置
    shim: {

      // 下面的angular 对应上面paths中的angular的模块名字 这里就是给上面的angular模块进行单独的配置 暴露angular库里的angular对象 所以才能来使用它
      angular: {
        exports:'angular'
      }
    }
  });

  requirejs(['alerter', 'angular'], function(alerter, angular) {
    alerter.showMsg();

    console.log(angular);
    // 如果成功的话 window下会自动添加一个angular对象 跟jQ的$似的
  })
})()
```

```js
// 先配置下jQuery的所在路径
(function() {
  requirejs.config({
    paths: {
        dataService: './modules/dataService',
        alerter: './modules/alerter',

        // 在这添加jQ库
        jquery:'./libs/jquery-1.10.1'
    }
  });

  requirejs(['alerter'], function(alerter) {
    alerter.showMsg();
  })
})()


// alerter.js模块中
define(['dataService', 'jquery'], function(dataService, $) {
  let msg = 'alerter.js';
  function showMsg() {
    console.log(msg, dataService.getName());
  }

  // 使用jQ给body来个背景色
  $('body'). css('background', 'red');

  return {
    showMsg
  };
})
```

<br><br>

# CMD (common module definition) 通用模块定义
```s
https://github.com/seajs/seajs/issues/242
```

<br>

cmd 就是吧 amd 和 commonjs 汇总起来了 定义使用 define 暴露使用 commonjs 中 exports

专门用于浏览器端, 模块的加载是异步的, 模块使用时才会加载执行 什么时候用 什么时候再去读它

它在浏览器端实现也需要引入一个 sea.js 的库

```s
http://www.zhangxinxu.com/sp/seajs
```

<br>

### 定义暴露模块:

```js
// 定义没有依赖的模块
define(function(require, exports, module) {
  exports.xxx = value
  module.exports = value
})

// 定义有依赖的模块
define(function(require, exports, module) {
  // 引入依赖模块(同步)
  let module2 = require('./module2')

  // 引入依赖模块(异步)
  require.async('./module3', function(m3) {

  })

  // 暴露模块
  eports.xxx = value;
})
```

<br>

### 引入使用模块

```js
define(function(require) {
  let m1 = require('./module1');
  let m4 = require('./module4');

  m1.show();
  m4.show();
})
```

<br><br>

# ES6 模块规范
```
http://es6.ruanyifeng.com/#docs/module
```

依赖模块需要编译打包处理, es6 的语法现在还有浏览器不支持, 我们使用 es6 开发完通常都会用工具将 es6 的语法转为 es5 这样浏览器才能识别

我们把 es6 转换为 es5 后 会编译为 require 语法, 而浏览器又不支持, 打包编译 require 语法我们需要使用 browserify 工具

<br>

### 基本语法:
- 导出模块: export
- 引入模块: import

<br>

### 使用方式:
es6的语法浏览器端不认识 所以为了让浏览器可以认识我们的es6的模块化语法所以我们需要通过babel来编译

<br>

**babel编译 es6语法的步骤**
使用 babel 将 es6 编译为 es5 代码
```
https://babeljs.cn  使用 browserify 编译打包 js
```

<br>

**安装 babel-cli, babel-preset-es2015 和 browserify**
```
npm install browserify -g
npm install babel-cli -g
npm install babel-preset-es2015 --save-dev
```

<br>

**定义 .babelrc 文件**  
上面的东西下载完后, 我们要进行一些配置文件, 
rc 是 run control rc 文件是运行时控制文件 运行时要读的文件

在 package.json 同一目录下 创建 .babelrc 文件 没有后缀名 文件名就可以 不要忘记.

固定写法, babel 工作原理 它在干活之前会先读这个配置文件, 只有读了"presets":["es2015"]这 babel 才知道干了什么一旦发现是 es2015, 那我就知道我是要去转还为 es6 语法

```js
// babelrc配置文件里面直接写对象就可以 config.js还要暴露出来一个对象
  {
    "presets":["es2015"]
  }
```

<br>

### 暴露(导出)模块:
导出用来决定搞一个模块中哪些内容可以被外部查看

它有几种导出方式 如下：

<br>

**<font color="#C2185B">方式1: 默认暴露(导出)</font>**  

**注意: 一个模块中只能有一个默认导出**

<br>

某些情况下, 一个模块中包含某个功能, 我们并不希望给这个功能命名, 而且让导入者可以自己来命名 这个时候我们就可以使用export default

可以暴露任意的数据类型, 暴露什么数据 接收到的就是什么数据

默认暴露只能暴露一次, 如果需要暴露很多数据 把所有数据放在一个括号里, 调用的时候使用 . 的方式 

<br>

**语法:**  
```js
export default 导出内容
```

<br>

**默认暴露的导入方式:**  
导入用来将外部模块中的内容导入到当前模块中 导入的时候自己指定模块名

在ES6模块中，使用export default来导出一个对象字面量时，不能使用解构导入语法``import {x, y} from "a.js"``来引入具体的属性。

``import {x, y} from "a.js"``语法适用于导出具名的属性或方法，而不是默认导出。

<br>

**浏览器端的使用方式:**  
import语法不能使用在模块的外部 默认情况下 script 标签中不能使用 import 语法 如果要实则必须指定 ``type="module"``

```html
<head>
  <script type="module">
    // 引入暴露出来的js模块
    import a from "./暴露的路径"

    // 输出值
    console.log(a)
</script>
</head>
```

<br>

**<font color="#C2185B">方式2:命名导出(分别暴露)</font>**  
导出指定的内容 在导入的时候 必须指明要导入哪个变量
```js
export const a = 20
export let arr = [1,2,3]
export function foo2() { }
```

<br>

**分别暴露的导入方式**
```js
// a arr foo2 必须和模块中的变量名一致
import {a, arr, foo2} from "./exer.js"
```

利用 *as* 导入指定变量的同时 修改变量名
```js
import {a as num} from "./exer.js"
```

<br>

**<font color="#C2185B">方式3:统一导出</font>**  
```js
// 统一导出
export {
  foo1, 
  foo2, 
  foo3
}
```

同时导出 和 单个导出 和 默认导出 可以同时使用
```js
// 单个导出
export const a = 20
export let arr = [1,2,3]

// 统一导出
export {
  foo1, 
  foo2, 
  foo3
}

export default b

// 导入
import b, {a, arr, foo1, foo2, foo3} from "./exer"
```

<br>

### 使用 babel 编译:
不能把未编译的 main.js 文件跑在 html 文件里 需要我们将 es6 的语法转为 5

1. 在根目录下打开终端
2. 使用 babel 命令 将 es6 编译为 es5(但包含 CommonJS 语法)
babel js/src -d js/lib

```
babel找的是文件夹, 并没有指定某一个文件, src文件夹里面的所有文件都要编译 使用 babel 命令的时候 对于没有的文件夹 会自动创建
```

3. 上面的转换完 还有 require 语法 所以要将编译为 es5 的文件进行下面的编译

4. 使用 browserify 编译 js 的主文件(汇总其它模块的文件):
browserify js/lib/app.js -o js/lib/bundle.js  
使用 browserify命令的时候 对于没有的文件夹 不会自动创建, 所以要自己先创建文件夹

<br>