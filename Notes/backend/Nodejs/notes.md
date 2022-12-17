# Nodejs
不是一门语言 不是库 不是框架 是一个js运行时环境 简单的说node.js可以解析和执行js代码(跟浏览器很像都是解析js的), 现在js可以脱离浏览器运行

NodeJs是一个能够在服务器端运行的js环境

之前的JS都是浏览器端运行的 也就是本地运行的 我们写完的东西都要发送给用户 也可以理解为是用户的客户端运行的, 不是在服务器本地执行的

NodeJs让我们的Js代码可以直接在服务器中运行 或者 直接在系统中运行

<br>

**在浏览器中运行能干什么事？**  
最大的限度也就是操作下浏览器 顶多关闭个窗口 跳转个页面  

<br>

**NodeJs是在服务器中运行 这时候它是在跟谁在交互呢？**  
和系统进行交互了 可以和java c等语言一样可以和系统直接进行交互了 所以它的平台不再仅限于浏览器了

NodeJs把js战场从前端拿到了后台 

<br>

## node中的js
没有BOM DOM 只有基本语法 因为服务端不处理页面的 在node这个js执行环境中为js提供了一些服务器级别的操作API
- 文件读写
- 网络服务的构建
- 网络通信
- http服务器等处理

<br>

## nodejs的特性
- 事件驱动
- 非阻塞io模型(异步)
- 轻量和高效

<br>

## Nodejs能做什么
- web服务器后台
- 命令行工具

对于前段开发工程师来讲, 接触node最多的是它的命令行工具 自己写的很少, 主要用别人第三方开发的 也就是使用 npm 按照第三方的依赖

<br>

## 客户端 --- 服务器 --- 数据库
我们写完的代码都是放在服务器的 用户去访问服务器 把写好的网页下载到浏览器 才能查看 我们的网页中的通信  基于 请求 和 响应

我们客户向服务器端发送请求 服务器端和数据库进行交互, 数据库是用来保存数据的, 所以当客户端向服务器发送请求的时候 服务器还需要和数据库进行交互 比如数据库要把京东的信息加载出来啊

数据都在磁盘中 那服务器和数据库进行交互的过程 我们叫做 i/o  
i input  输入 从磁盘读数据  
o output 输出  

我们的i/o就是向磁盘 读取 或者 写入数据

```
客户端  -- 请求 -- > 服务器 -- i/o -- > 数据库
客服端  < -- 响应 -- 服务器 < -- i/o -- 数据库
```

但是 I/O 难以处理 所有的项目开发到最后的瓶颈都是I/O  
I/O要和磁盘进行交互 即使性能提升的再好 磁盘的读写速度是有限制的 

好点的服务器都是固态硬盘 即使是固态硬盘的读写速度也有极限 那这个极限就突破不了了 除非出新磁盘了 但是出了新磁盘也会有极限 所以所有项目到最后的瓶颈都是I/O

这时候我们就面临一个问题 用户网速很快 我们的程序写的很好 服务器的逻辑性也很严谨 一点浪费的代码也没有 处理的速度也非常的快 服务器的带宽也够 响应速度也是非常的快 都卡在了I/O上

传统的服务器都是多线程的 每进来一个请求 就创建一个线程去处理这个请求 一对一的服务 这时候也会带来一个问题

打个比喻 就相当于一个饭店,  来了一个客人我就配一个服务员 来100个我就配100个 

每来一个人我就配一个服务员 点菜上菜都很快 但是他得等厨师炒菜啊 厨师的菜没炒完呢 我的服务员不能走 就会出现厨师炒菜呢 服务员在旁边看着 

这个线程是不是浪费 这个服务员完全可以为别的服务员进行服务 等菜炒完了再去服务

数据库就相当于厨师 炒菜慢死了 

现在请求进来了 我分配了一个线程 处理请求 前面处理的非常快 一到I/O卡住了 I/O要去调用数据库 操作数据库不是前面的线程做的

会有专门操作I/O的线程 因为涉及到磁盘了 需要调用磁盘的线程去操作 这时候这个事就交给别的线程了 就相当于把炒菜的任务交给厨师了

但是注意请求还没完呢 我的线程还不能动 就得在在这等 这个时候叫做阻塞 I/O的操作阻塞了线程的执行 它什么也干不了 现在有一个请求 100个线程在这

操作数据库就会有100个线程在阻塞 这100个阻塞着的线程会在我们的内存 磁盘里占空间 它们没有完全发挥作用都在等厨师炒菜呢 不干活还占用我们的空间 所以就是这个问题 I/O的速度我们是提升不了的

所以我们对待这个问题 其实可以优化一下 I/O处理不了了 但是处理请求这个线程可以优化一下 服务员点完菜 交给厨师之后 服务员不用等了 继续给下一个人进行服务

等菜炒好了再上菜 这样一个线程可以做很多事 就不用在这等了 也节省服务器的一个资源 这个模式就是node模式 node就是单线程的

传统服务器进来一个请求就创建一个线程 node所有请求都是一个线程

开始时node的目的是 用js去编写一个高性能的服务器

1. js是单线程的
2. js里经常用到一个东西就是异步 回调函数 

多线程的服务器 对系统的硬件要求比较高 node单线程的对硬件要求低 成本低 

<br>

**奇数版为开发版, 偶数版为稳定版**

<br>

单线程是node的特点 但不太靠得住 单线程人多的时候肯定顾不过来 node也是成也单线程 败也单线程 node处理不了

访问量太太大的 以java为主 企业应用就是java node想处理的话就得多来几个服务器

淘宝的后台服务器肯定是java的 我们的客户端和服务器得交互吧, 所以淘宝在服务器和客户端之间又加了一层服务器 这层服务器用node写 

java处理请求非常快多线程 它的缺点是对页面的渲染速度慢 js是专门渲染页面的 所以淘宝在两者之间搭了一个node的服务器 专门用来渲染页面的 

node的缺点也有解决方案 可以做一个分步式 一个服务器不够了再来一个 两个不够来三个 我们可以增加服务器的数量 还好node

对服务器的要求不高 花1000元买的服务器能达到10000元的效果

<br>

## Nodejs的资源

深入浅出node.js: 偏理论几乎没有实战内容 偏底层

node.js权威指南: api的讲解

js标准参考教程(alpha):
```s
http://javascript.ruanyifeng.com
```

<br>

node入门
```s
http://www.nodebeginner.org/index-zh-cn.html
```

<br>

官方api文档
```s
https://nodeja.org/dist/latest-v6.x/docs/api
```

<br>

中文文档
```s
http://www.nodeclass.com/api/node/html
```

<br>

cnode社区
```s
http://cnodejs.org
```

<br>

cnode新手入门
```
http://cnodejs.org/getstart
```

<br><br>

# nvm
用来管理多个版本的node 安装nvm之前要删除现有的node  
是由于不同的项目node版本也不同, 有的是5.0.1,  有的是6.3.2  如果node出现版本不对, 运行 某个应用时, 很可能就会遇到各种莫名其妙的问题  

## 安装:

### Mac:
```s
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

<br>

### Mac m1的情况下如何安装14版本的node
仅供参考
```s
https://mako-note.com/ja/install-node14-on-m1-mac/

https://blog.csdn.net/longgege001/article/details/114067242?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-114067242.pc_agg_new_rank&utm_term=m1+mac+nvm%E5%AE%89%E8%A3%85&spm=1000.2123.3001.4430

https://blog.csdn.net/yunchong_zhao/article/details/121282961?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-121282961.pc_agg_new_rank&utm_term=m1%E8%8A%AF%E7%89%87+%E5%AE%89%E8%A3%85%E4%BD%8E%E7%89%88%E6%9C%ACnode&spm=1000.2123.3001.4430
```

<br>

## 配置nvm:
配置为国内淘宝的镜像 速度和查询会更快一些 因为服务器在国内 在安装nvm的目录下打开settings.txt文件  
增加如下代码:
```s    
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

<br>

## nvm常用命令:

**当前机器上装了哪些node的版本**
```
nvm list
```

<br>

**查看官方的所有版本**
```
nvm list available
```

<br>

**安装指定版本的node.js**
```js
nvm install 版本号[架构]

nvm install 10.15.0

// 安装最新版本: 
nvm install latest
```

<br>

**卸载**
```js
nvm uninstall 版本号
```

<br>

**切换为指定版本**
```js
nvm use 版本号
nvm use 10.15.0
```

<br><br>

# REPL 运行环境概述
nodejs中提供了一个交互式运行环境 REPL 在这个运行环境中 我们可以做一些简单的应用程序的测试和调试

<br>

## 交互模式:
```
node
```

<br>

### REPL运行环境中 操作变量
我们在该环境中可以使用let关键字来定义一个变量并为其赋值 但是在定义变量后 该表达式的结果将显示undefined

而不使用let等关键字定义的变量则为其对应的变量值

```js
> name = "erin"
'erin'

> let age = 18
undefined
```

<br>

**原因:**
REPL环境内部使用eval函数来评估该表达式的执行结果 而js中将上述两条表达式作为eval函数的参数 则eval函数将返回不同的结果


<br><br>

# npm Node Package Manager
世界上最大的开源生态系统
绝大多数js的相关的包都存放在了npm上, 这样做的目的就是为了让开发人员更方便的去下载使用

它的作用就相当于360安全卫士里的软件管家


## npm 常用命令

**查看npm版本**
```js
npm -v 

// 把npm内部模块的版本都打印出来了
npm -version
```

<br>

**帮助说明**
```js
npm
```

<br>

**搜索包模块**
```js
npm search 包名  
```
          
<br>

**创建package.json**  
名字里不要有大写字母 不要有中文
```js
npm init -y
```
     
<br>

**安装包  install 简写 i**  
名字里不要有大写字母 不要有中文
```js
npm install 包名
```

<br>

**注意:**  
安装包的时候会安装到当前目录 如果想安装到指定文件夹
创建一个文件夹 --- 在这个文件夹的地址栏里cmd --- 安装

有的时候发现执行完下面命令 当前文件夹下并没有 安装到哪里是根据 package.json识别的 文件夹里没有package.json

所以它不能确定是一个包 装到别的地方了 要想安装到指定路径 <font color="#C2185B">必须在当前目录下 创建个package.json</font>

<br>


**删除包 remove 简写 r**  
名字里不要有大写字母 不要有中文
```js
npm remove 包名
```

<br>

**删除包 remove 简写 r**  
名字里不要有大写字母 不要有中文
```js
npm remove 包名

// 删除包 并删除依赖
npm remover 包名 --save
```

<br>

**安装包**  
并添加到依赖中 以后主要用这个 dependencies 依赖  
安装的同时 把这个包设置为你的依赖了 你的包依赖包了
```js
npm install 包名 --save
```

<br>

**全局模式安装包**  
全局安装的包一般都是一些工具 全局的包一般都不是项目里用的 而是计算机里面用的 比如编译css文件的 给项目打包的一些工具
```js
npm install 包名 -g
```

<br>

**卸载包**  
全局安装的包一般都是一些工具 全局的包一般都不是项目里用的 而是计算机里面用的 比如编译css文件的 给项目打包的一些工具
```js
npm uninstall 包名
```

<br>

**清除npm编译的一些缓存**  
```js
npm cache clean --force

// 默认清空下面的文件夹
c -- users -- admin -- appdata -- roaming -- npm cache
```

<br><br>

# 配置环境变量
```
计算机图标上右键
  -- 属性
    -- 高级系统设置
      -- 环境变量
        -- 分为用户变量 和 系统变量 
```

<br><br>

# 进程 和 线程

## 进程: 
我们写了一个程序 现在要运行 它在哪里运行呢？

进程有点像仓库 进程负责为我们程序的运行提供必备的环境 进程就相当于工厂中的车间一样, 那现在光有车间了 设备很全 可是没人干活 也生产不了

<br>

## 线程: 
线程就相当于干活的, 它是计算机中的最小的计算单位 线程负责执行保存到进程中的程序

总结: 线程就是干活的 进程就是提供环境的

<br>

### 单线程
一个线程一个人干活  
浏览器 和 js就是单线程的 执行代码时 网页的渲染是停止的

<br>

### 多线程
多个人干一个活
多线程会发生并发的问题 比如两个线程想渲染一个样式时发生的矛盾

<br><br>

# 全局对象 global
在nodejs中 仍然存在一个全局作用域 即可以定义一些不需要通过任何模块的加载即可以使用的变量 函数 或 类

同时 也预先定义了一些全局方法以及全局类

另外 nodejs 中 定义了一个global对象 代表nodejs中的全局命名空间 任何全局变量 函数 或者 对象都是该对象的一个属性值

它叫做成为全局对象, 它及其所有属性都可以在程序的任何地方访问, 即全局变量

在浏览器js中, 通常window是全局对象, 而nodejs中的全局对象是global, 所有全局变量(除了gloabl本身以外)都是global对象的属性

后面看到的所有的全局变量, 例如console setTimeout和process是global变量的成员, 我们设置可以想全局变量添加成员, 使其在任何地方都可用

<br>

## 要点:

### 1. nodejs里面没有window对象
但有global对象, 之间所使用的console等这些是global对象下的属性 / 成员

<br>

### 2. node里面声明的变量, 不会挂载到global里面
```js 
let a = 10
console.log(global.a)   // undefined 
```

<br>

### 3. 可以向global添加成员, 可以在任何地方去使用
```js 
global.a = 60;
console.log(a)
```

<br>

### 4. nodejs中的js模块中的 this
在nodejs中执行当前js文件, 里面如果出现this, 这个this指向不是global, 这个this在文件中, 其实指向的是这个模块(这个js文件)
```js 
// 在js文件中
console.log(global === this)    // false   

console.log(this == exports)    // true

// 在node的交互环境中
console.log(global === this)    // true     
```

<br>

### 5. 在nodejs中 预定义了一些全局函数

### <font color="#C2185B">setTimeout(callback, ms, [args], [...])</font>
### <font color="#C2185B">setInterval(callback, ms, [args], [...])</font>

这个函数的作用和js类似 都是当前时刻过去多少毫秒之后执行某个回调函数
该函数会返回一个**定时器对象**

**参数:**
1. 回调函数
2. 毫秒数
3. 向回调函数中传入的参数

<br><br>

# 模块执行的参数:
实际上我们**模块的代码都是包装在一个函数里执行的** 这个函数是由nodejs的引擎去调用的 并且**在函数执行时 同时传递进来了5个实参**

```js
(exports, require, module, __filename, __dirname) => {
  ...
}
```

<br>

所以模块里的代码都是包装在一个函数里执行的, 所以在文件里定义的变量 都是局部变量 同时我们还可以使用这些形参

<br>

### module
module代表的是当前模块本身, 实际上我们用 exports就是module的属性
```js 
console.log(exports === module.exports);    // false
// 我们既可以用 exports 导出 也可以用 module.exports导出
```

<br>

### exports
该对象用来将变量或函数暴露到外部

<br>

### require
函数, 用来引入外部模块

<br>

### __filename 变量
在任何模块文件内部 可以使用 __filename 变量获取当前模块文件的带有完整绝对路径的文件名 **落脚点包括当前文件名**
```js
console.log(__filename)
// /Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_server/exer.js
```

<br>

### __dirname 变量
在任何模块文件内部 可以使用 __dirname 变量获取当前模块文件所在目录的完整绝对路径 **落脚点只在当前文件所在的文件夹**

```js
console.log(__dirname)
// /Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_server
```

<br>

### 总结: 
也就是说 我们在node环境下运行js代码, 其实node会把它
封装到一个函数体内部, 这样外部文件看不到, 除非我们通过exports给它们暴露出去

<br><br>

# 事件处理机制 以及 事件环机制
在js中 当用户对页面进行交互操作的时候 每个元素都可能会触发一个事件
比如 当用户点击一个按钮 将会触发这个按钮的click事件

同样 在nodejs中 许多对象也会触发各种事件

比如 针对代表web服务器的 http.server对象来说 可能会触发 

- 接收到客户端请求
- 产生链接错误

等各种事件 针对每个不同的事件 都需要进行不同的事件处理

<br>

## 事件处理相关的API

### 绑定事件:
```js
addListener(event, listener)

// 可以通过多个on方法的执行来对同一个事件绑定多个事件处理函数
on(event, listener)

// 绑定一次
once(event, listener)
```

<br>

### 解绑事件:
```js
removeListener(event, listener)

// 解绑所有事件
removeAllListeners([event])
```

<br>

### 指定处理函数的最大数量:
指定处理函数的最大数量 n为整数值 代表最大的可指定事件处理函数的数量
```js
setMaxListeners(n)
```

<br>

### 获取指定事件的所有事件处理函数:
```js
listeners(event)
```

<br>

### 触发事件:
```js
// event为事件名 listener为事件回调
emit(event, [arg1], [arg2], [argn])
```

<br>

## 事件环机制
在nodejs中 与js或其它语言一样 采用事件环机制

在js中 大部分代码都是用于进行诸如 onclick onmouseover 之类的用户交互事件的处理

在服务器端 虽然不会存在由用户对于界面上的操作而产生的事件 但是将存在一个服务器应用程序中所可能触发的各种事件

比如 当一个用户向服务器发出一个客户端请求的时候 将会触发http服务器的一个在node中定义为request事件

在node中 采用非阻塞型i/o机制 这意味着所有要求应用程序进行的处理 如http请求 数据库查询 文件的输入 或 输出等 都不会在处理结束之前阻碍其它处理的进行

就是说 **这些处理都是独立进行的 当处理结束时会触发一个回调事件 也就是说 在node中 我们所要编写的就是各种i/o事件的回调函数中的处理**

对于事件环机制的另一个乔当的比喻是将它比作一个邮递员 而每个事件就好比是邮递员需要送达的一封信邮件 它有大量需要依顺序送达的邮件 而他需要按照指定的路线来送达这些邮件

而回调函数就好比这些路线 由于邮递员只有一双腿 所以它每次只能按照指定路线来送达一封邮件

也就是说 它每次只能处理一个回调函数 在它按照某条指定路线送某封邮件的途中 可能会有人给他新的邮件

这就是代码中要求他处理的新的事件 这种情况下 邮递员将会转而处理新的事件 在该事件处理完毕之后转而送达原本要送达的邮件 就是说 在回调函数的执行过程中 他将转而处理新的事件

在该事件处理完毕后 转而继续处理原回调函数 这种环状处理机制 叫做事件环机制

让我们用实际应用程序中的例子来看一下该邮递员的行为 假设我们一个http服务器 它需要接收客户端请求 根据请求参数从数据库中获取一些数据 然后将这些数据返回客户端

<br>

### 调试器
node提供了一个在命令行界面中可以使用的调试器 可以利用该调试器来进行一些应用程序的简单调试 比如显示代码 变量 函数的返回值等

<br>

### 调试命令:
```js
node debug <需要被执行的脚本文件名>
```

<br><br>

# ES的缺陷

### 1. 没有模块系统

**模块化: **

本来是一个完整的程序 我给她分成一个个小的程序 比如我有一个程序写了10万行代码

第一种选择 我把10万行代码放在一个文件里 不方便维护  

第二种选择 我按功能来分20个文件 降低了程序之间的耦合性 这种方法就是模块化 方便代码复用 没有模块化的代码都是不能复用的

假如公司想开发第二个项目 其中有一部分的代码可以用到项目一当中的代码 但拿出这一部分就非常的困难

假如另一个公司从开始就用模块化管理 比如分 权限管理模块 cms内容管理 用户管理 审批系统 把一个大的项目分成一个个的小的模块
然后用这些个小模块整合成一个大的项目

模块化的开发效率虽然低一些 但是有复用的功能 降低了开发成本

电脑也是模块化的 js里是没有模块化系统的 但是有模块化 比如说jQ 引入jQ.js文件就属于模块化

一个js文件就是一个模块 如果引入多个模块 引入就必须有个顺序 如果顺序出现问题可能导致 这些模块一个都用不了
这种模块化是很不方便的 也很麻烦

<br>

### 2. 标准库较少

<br>

### 3. 没有标准系统

<br>

### 4. 缺乏管理系统

假如我想用jQ 我得去jQ官网去下载 想下什么库就要去对应的官网 很麻烦都不知道去哪找

再比如我们的电脑里 是不是有个360安全卫士管家啊 打开它想搜什么就搜什么 原生js里就没有这么一个东西 我们希望有个管理系统 到那一搜就能找到对应的东西

如果程序设计到一定的规模就必须对其进行模块化 也就是把一个大的项目拆分成小的 方便我们去管理, 在前端开发的时候这个问题没有那么的明显 因为系统规模没有那么大

但把js迁移到服务器了 服务器的代码规模是很大的 如果不进行模块化的话 后期会极难维护 所以到了nodejs这我们不得不去解决模块化的问题

所以就引申出了 commonJS规范 commonjs规范的提出 主要是为了弥补当前js没有标准的缺陷  commonjs的愿景是能让js在任何地方运行

现在pc端的一些工具都是用js去写的 甚至哪天我们也能用js去写图形化的界面

<br>

## 模块的使用

### 为什么要模块化
在计算机程序的开发过程中, 随着程序代码越写越多, 在一个文件里代码就会越来越长, 越来越不容易维护, 为了编写可维护的代码, 我们把很多函数分组, 分别放到不同的文件里, 这样每个文件包含的代码就相对较少, 很多变成语言都采用这种组织代码的方式 (一个js文件就是一个模块) 

<br>

### 使用模块有什么好处?
最大的好处是大大提高了代码的可维护性, 其次, 编写代码不必从零开始, 当一个模块编写完毕, 就可以被其他地方引用, 我们在编写程序的时候, 也经常引用其他模块, 包括nodejs内置的模块和来自第三方的模块

使用模块还可以避免函数名和变量名冲突, 相同名字的函数和变量完全可以分别存在不同的模块中, 因此, 我们自己在编写模块的时候, 不必考虑名字会与其他模块冲突

*重点: 方便项目的开发和维护*

<br>

### 模块规范的定义
一个js文件就是一个模块, 模块的作用域是私有的内部定义的变量或者函数, 只在当前的文件(模块)可以使用

如果别人需要使用我们模块里面的东西, 那么有两点要做(以commonjs的modules规范 nodejs为例)

自己编写的模块,由于模块作用域是私有的 默认情况下, 外部是没有办法使用的, 如果希望别人可以使用, 则需要导出 exports 或者 module.exorts 导出的时候, 以对象的方式进行导出

别人要使用某个模块, 则需要先引入该模块, 使用 require 引入, 引入后需要使用一个变量来接受导入的对象

<br>

### 模块定义规范
对书写格式和交互规则的详细描述就是模块定义规范

- AMD规范 -- require.js
- CMD规范  --  sea.js
- CommonJs规范  --  nodejs
- ES6模块化规范

<br>

### 要点:
1. commonjs的规范中, 需要使用其他模块的数据的时候, 引入关键方法是require
2. require的参数可以是相对路径(./ 不能省), 也可以是绝对路径
3. 绝对路径中的\ 要写``\\``  或者写正斜杠 ``/``
4. 模块的扩展名可以不写, 也可以写
5. 导出之后一般有一个变量来接收(一般我们用const) 模块名叫什么变量名一般就是什么

<br>

## 导入模块

### require()函数:
在node中, 通过require()函数来引入外部的模块 require()中可以传递一个路径作为参数, node将会自动根据该路径来引入外部模块

如果使用相对路径 必须以. 或 ..开头

**作用:**  
加载模块 在nodejs中 可以使用require函数来加载模块

<br>

**参数:**
1. 带有完整路径的模块文件名
2. 模块名

```js 
let foo = require("../foo.js")
```

<br>

**返回值:**  
使用require()引入模块后, 该函数会返回一个对象这个对象代表的是引入的模块

<br>

**示例:**  
要使用module01中的内容 必须
```js 
let md = require('./js/module01.js'); 
// 这时 这个md 就是01模块
md.a

console.log(md.a);      //没报错 但是是undefined
console.log(md)         // {} 是一个空对象 
```

<br>

### require.resolve()

**作用:**  
查询完整的模块名

**返回值:**
该包的绝对路径 使用该函数来查询某个模块文件的带有完整绝对路径的文件名

```js 
let res = require.resolve("axios")
console.log(res)

// /Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_server/node_modules/axios/index.js
```

<br>

### require.cache 对象
该对象代表缓存了所有已被加载模块的缓存区

**返回值:**
```js
{
  // 感觉是该项目相关 node_modules 的路径数组
  path: []
}
```

<br>

我们可以在repl运行环境中 可以使用 console.log(require.cache) 来查看该缓存区中的内容
```js
{
  '/Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_server/exer.js': Module {
    id: '.',
    path: '/Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_server',
    exports: {},
    filename: '/Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_server/exer.js',
    loaded: false,
    children: [],
    paths: [
      '/Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_server/node_modules',
      '/Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_modules',
      '/Users/LIUCHUNSHAN/Desktop/Sam/node_modules',
      '/Users/LIUCHUNSHAN/Desktop/node_modules',
      '/Users/LIUCHUNSHAN/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  }
}
```

<br><br>

## 导出模块
在node中 每一个js文件中的js代码都是独立运行在一个函数中的 而不是全局作用域 所以一个模块中的变量和函数在其他模块中无法访问

在一个模块文件中定义的本地变量 函数或对象只在该模块内有效 当你需要从模块外部引用这些变量 函数 对象的时候 需要在该模块文件内使用 exports对象

<br>

### 示例代码:
```js
let num = 10;

function sum(a,b) {
  return a+b;
}

class Animal {
  constructor() {
    this.age = 10
  }
}
```

<br>

### 导出方式1: 使用exports对象导出
```js
exprots.变量名 = 值
```

<br>

**引入方式:**  
如果是这么导出的 在引入的时候, 创建的变量就是导出的变量

```js
// foo.js
exports.num = num;
exports.sum = sum;
exports.Animal = Animal;
```

将上述的代码保存为foo.js文件后 我们再导入的时候
```js 
// 导入方式
let foo = require("./foo.js")
foo.num
```

<br>

**解析:**
当我们使用 ``exports.变量 = 值`` 的形式导出的时候 我们导出的是一个空{} 这个对象中没有在这个js文件定义的 变量 相当于我们在这个对象上添加了属性

```js
let num = 1

// 我们在 export 对象身上 添加了一个 num 属性 值为上面定义的num的值
exports.num = num
```

那我们在导入的时候就是
```js 
let foo = require("./foo.js")

// 从对象身上获取 对应的属性
foo.num
```

<br>

### 导出方式2: 将模块定义为类的方式导出
在模块文件内部将 exports对象 写成 module.exports 

**注意:**  
需要将模块定义为一个类的时候 只能使用这种方式

<br>

### 导出方式2: 集中导出
```js
module.exports = { }
```

<br>

在引入的时候, 创建的变量就相当于 = 右边的值  
如果是对象 引入后就需要通过 m1.num sum Animal的形式去找导出的对象
```js
module.exports = {
  num,
  sum,
  Animal
}
```

引入的时候
```js
let {num, str} = require("./exer2")
```

<br>

### exports 和 module.exports 的区别
exports实际上是module.exports的引用, 相当于它俩的指向是一样的
module.exports指向哪里exports就指向哪里

```js 
// 实际上我们用 exports就是module的属性
console.log(exports === module.exports);    // true
```

文件中才有exports, 交互模式下没有exports, 也就是说真正指向空对象的是 module.exports

```
shell面板中(交互模式中) 我们输出 exports 会提示 exports is not defined

shell面板中(交互模式中) 我们输出 module.exports 会提示 { }
```

<br>

### 总结:
真正有意义的是module.exports,   
exports理解为一个跟屁虫 module.exports 指向哪exports就指向哪
**通过exports只能使用.的方式 向外暴露我们的内部变量**
```js 
exports.xxx = xxx; 
```

module.exports既可以通过.的形式 也可以直接赋值
```js 
module.exports.xxx = xxx;
module.exports = {}
// 用exports只能通过.的方式 而module.exports怎么样都可以 可以. 可以直接赋值 = {}
```

<br>

### exports 也有跟丢的时候
当 module.exports = { } 的时候 exports 就会跟丢 我们希望exports一直跟着module.exports
```js 
module.exports = {
  a:10
}

console.log(module.exports);  // { a: 10 }
console.log(exports);         // { }

// 要想不跟丢
exports = module.exports
```

<br><br>

# 模块中的this指向
在nodejs里面的 **this代表当前的这个模块, 也就是exports对象**  
在js文件中 this指向当前模块导出的对象(模块导出的东西)

```js 
console.log(this === exports)   true  // {}
```

this在交互模式中是global
```js 
// shell面板中(交互模式中)
this === exports            false
this === module.exports     false
```

<br>

### 注意: 回调函数中 this 的指向:
- function的写法 this是global
- 箭头函数的写法 this是exports

<br><br>

# process对象

## process对象中的属性:

### process.argv
获取到执行文件的时候, 命令行的所有参数  
它是一个可以直接使用的对象  
它是一个数组, 前两个值是 node 命令所在位置, 被执行 js 文件的路径

它会把 module1.js文件的路径 和 node所在的位置路径 放在数组中的前两位

若你执行命令时还有带参数, 一次会填充到此数组中
```js 
node module1.js 10
// [node命令所在的路径, 文件所在的路径, 10]
```

使用 nodejs开发命令行的应用, 需要获取 命令行的参数, 才用的上
可以收集命令行中写的代码(拿到命令行里面的参数)

```js
// shell中:
node module1.js 10 20

js文件中:
console.log(process.argv[2] + process.argv[3])
```

<br>

### process.arch
获取执行环境的系统位数

<br><br>

# node内置模块
一般项目中模块分为3种, nodejs内置模块, 自己书写的模块, 第三方模块
nodejs内置模块的文档网址: ``http://nodejs.cn/api``

<br>

## 常用的内置模块如下:

### fs
文件操作

<br>

### http
网络操作

<br>

### path
路径操作

<br>

### url
url解析(好像弃用了)

<br>

### querystring
查询参数解析(get请求中携带的参数) (好像弃用了)  
跟 qs 库的使用方式比较像

<br>

**常用方法:**  
**<font color="#C2185B">query.parse()</font>**  
将 name=sam&age=18 解析为对象形式

**<font color="#C2185B">query.stringify()</font>**  
**<font color="#C2185B">query.encode()</font>**  
**<font color="#C2185B">query.decode()</font>**  

```js
let query = require("querystring")

let str = "www.baidu.com/?name=sam&age=18"

// 自己处理
// str.split("/")[1]    // ?name=sam&age=18"
str = str.split("/")[1].slice(1)

// 使用模块
let res = query.parse(str)
console.log(res)    // { name: 'sam', age: '18' }
```

<br><br>

# buffer缓冲区
js语言自身只有字符串数据类型, 没有二进制数据类型, 但在处理像文件流时(文件读写操作), 必须使用到二进制(因为我们操作的文件中可能是二进制文件比如mp3)

nodejs要作为服务器 服务器无非就两件事 一个是接受用户发的请求 一个是返回响应 **用户发的请求全都是2进制数据** 这时候我们再接收用户的请求时就会发生一个问题 

用户发的数据我存哪啊 存到buffer里 同理 我要把数据发给用户 也需要把数据转换为2进制 发送之前的数据存哪？也是存到buffer里

因此在nodejs中, 定义了一个buffer类, 该类用来创建一个专门存放二进制数据的缓存区 说白了, Buffer类似一个整数数组


buffer的结构跟数组非常的像 操作的方法和数组类似 可以把buffer当成数组

js中原生的数组 性能比较差 这也是js被其它语言诟病的地方   
js中数组可以存js的类型, 在网页开发的情况下就够了, 但在服务端开发的时候够用么

用户发请求, 服务器返回响应, 返回的内容 如果是图片 是mp3 视频文件 也就说互联网和客户端通信的时候 任何数据类型都有可能吧 传统的数组办不到这些, 因为前端不涉及到这些问题

刚才说的 图片 和mp3 是啥 它们统称为2进制文件 数组中不能存储2进制文件, 而buffer就是专门用来存储2进制数据的

<br>

buffer是node里面的一个核心对象 使用buffer不需要引入模块 直接使用即可 在buffer中存储的都是2进制数据 计算机里所有的2进制数据都会用16进制显示

因为2进制太长了, 因为数据最终要发送给客户端 或者说从客户端接收过来的 在传输的时候都是2进制传输的, 因为我们传输的时候传输的是电信号 所以最终都得转换为2进制 

<br>

在node中 buffer类是一个可以在任何模块中被利用的全局类 不需要为该类的使用而加载任何的模块

可以使用new关键字来创建该类的实例对象 buffer类拥有三种形式的构造函数

<br>

## Buffer介绍:
buffer中每一个元素的范围是从 00-ff 把这个数翻译成10进制的话是 0-255
ff 转换为二进制 11111111

```
二进制的范围就是 00000000 - 11111111 
```

<br>

我们计算机中的内存结构可以想象成一个一个的小格 一个格子存一个数据 要么是0 要么是1, 一个格叫做一位 (底层是通过有电断电来控制1 0)

计算机中 一个0 或 一个1 称之为 1位(bit)

00000000 是 8位(bit)

```js
8bit = 1byte (一个字节)
1024byte = 1kb (千字节)   // 字节是数据传输的时候最小的单位
1024kb = 1mb (兆字节)
1024mb = 1gb
1024gb = 1tb
```

buffer中的一个元素 占用内存中的一个字节 上面的str的长度是13 代码str占用了13个字节 一个汉字 占用3个字节

<br>

## buf对象的属性:

### <font color="#C2185B">buf.length</font>
buf.length是占用内存的大小

**英文的话 一个字母就是一个字节**  
**中文的话 一个汉字就是三个字节**

```js
console.log(str.length);         // 获取字符串的长度
console.log(buf.length);         // 占用内存的大小 多少字节
```

<br>

### <font color="#C2185B">buf.byteLength(string[,encoding])</font>
获取一个字符串占用内存的大小

<br>

## 创建 Buffer 实例对象

### 方式1: <font color="#C2185B">new Buffer(size)</font>
创建 buf 实例对象 **该方法已经被弃用**

**参数: 传入指定字节**   
第一种是只需将缓存区大小(以字节为单位)指定为构造函数的参数 被创建的buffer对象拥有一个length属性 属性值为缓存区的大小

<br>

**注意:**  
在显示的时候 使用十六进制数值来显示其中的二进制数据

```js
// 创建一个 1024 字节大小的buf
let buf = new Buffer(1024)
console.log(buf.length) // 1024
```

<br>

**参数: 传入array**   
使用一个数组来初始化缓存区  
这种形式的构造函数中 使用一个存放了需要被指定数值的数组来作为构造函数的参数

<br>

**参数: str, [encoding]**   
使用一个字符串来初始化缓存区
初始化缓存区的字符串 & 指定文字编码格式的字符串 默认值 utf8

<br>

### 方式2: <font color="#C2185B">Buffer.from()</font>
根据一个数组 或 字符串 创建 Buffer 对象 (buf本身就是数组 那也就是说 将一个正常数组 转为buf数组? )

<br>

**参数:**  
arr | str

利用toString()方法 打印的却不是原数组信息, 而是转换为a b c, 是结果对应了asc2码值

```js 
let buf1 = Buffer.from([97, 98, 99]);
console.log(buf1);  // <Buffer 61 62 63>
console.log(buf1.toString());   // abc
```

<br>

根据一个字符串创建 Buffer 对象
```js 
let str = 'hello nodejs'
let buf1 = Buffer.from(str);
console.log(buf1);

// 结果:
<Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73>
```

<br>

**buffer的打印结果:**  
打印出来的是 ``<Buffer 68 65 6c 6c 6f 20 61 74 67 75 69 67 75>``   
它把str转换成了2进制编码 比如68 底层是2进制但是是以16进制显示的
这些数字就是上面str里字符对应的Unicode编码 一组是一个字节

16进制如果转换为10进制  68  =  6*16 + 8

<br>

### 方式3: <font color="#C2185B">Buffer.alloc(字符数量)</font>
创建可以存储指定字节数量的buffer对象

```js 
let buf3 = Buffer.alloc(10);

// 会将abc过一个asc表再转成2进制再转16进制存到buf3里
buf3.write('abc')
```

<br>

### 方式4: <font color="#C2185B">Buffer.allocUnsafe(size)</font>
创建一个指定大小的buffer 但是buffer中可能含有敏感数据
```js 
// 创建一个10个字节的buffer
let buf3 = Buffer.alloc(10);    
console.log(buf);
// <Buffer 00 00 00 00 00 00 00 00 00 00>


let buf3 = Buffer.allocUnsafe(10);    
console.log(buf);
// <Buffer 00 49 d1 72 b6 02 00 00 00 00> 
```

<br>

### alloc 和 allocUnsafe 的区别
为什么两个方法创建的结果不一样？  
buffer是直接操作内存的 **我的内存都是反复使用的**

Buffer.alloc会创建10个字节的空间同时把数据全都清空  
Buffer.allocUnsafe分配空间的时候没有清数据   

也就是说通过Buffer.allocUnsafe创建的内存是别人之间用过的内存 别人的数据还在这存着呢

Buffer.allocUnsafe的性能比较好 因为它只分配空间不修改数据 但平时还是用alloc 避免数据的泄漏

```js 
Buffer.from(str);     
    // 将一个字符串转换为buffer
Buffer.alloc(size);   
    // 创建一个指定大小的buffer
Buffer.allocUnsafe(size);     
    // 创建一个指定大小的buffer 可能含有敏感词汇
```

<br>

## buf实例对象的方法:

### <font color="#C2185B">buf.write()</font>
向buf里面写入数据

<br>

### <font color="#C2185B">buf.toString()</font>
可以通过.toString() 方法查看结果

<br>

### <font color="#C2185B">buf.fill(value, [offset], [end])</font>
该方法用来初始化缓存区中的所有内容(定义buf中的内容)

**参数:**
1. 必须指定的参数 值为被写入的数值
2. 指定从第几个字节处开始写入被指定的数值 默认值为0 即从缓存区的起始位置开始写入
3. 指定将数值一直写入到第几字节处 默认值为buffer对象的大小 即书写到缓存区底部


<br>

### <font color="#C2185B">buf.concat(list[,totalLength])</font>
链接两个buf 或者多个buf

<br>

### 往buffer中添加数据
**通过索引**给buffer赋值 操作buffer中的元素 类似操作数组

**1. 将数组一样通过下标的方式 插入数据**
```js 
let buf2 = Buffer.alloc(10);  

// 往buffer2的第一位添加了一个数字88
buf[2] = 88;   

// 没加进去 因为buf2的长度是10 最大索引是9 没报错 但也没有添加进去 
buf[10] = 15;   
```

<br>

buffer的大小一旦确定 则不能修改 创建好了后 就是那么长 不能修改 

buffer实际上是对底层内存的直接操作 buffer中分配的空间一定是连续的 这样性能比较好

buffer中的范围 是 00 - ff  也就是 10进制的 0-255 
```js 
// 假如 我向里面添加 256 超出最大范围
buf2[5] = 556;
```

<br>

**2进制的556**
```js
10 0010 1100    // 我们最多只能保存8bit 前面的两位会被舍掉
    0010 1100    // 会显示2c 对应的16进制是44

HEX 16进制
DEC 10进制
BIN 2进制
OCT 8进制
```

<br>

### 读取buffer中的数据
跟数组一样通过索引值获取

```js 
buf2[0]=88;
buf2[1]=255;
buf2[2]=0xaa;
buf2[3]=255;

console.log(buf2[2]);       // 170  aa(16进制) = 170(10进制)
```

只要数字在控制台或页面中输出 一定是10进制  
我就想看16进制的结果怎么办？ 只要是数字永远都做不到 我们可以这样
```js 
console.log(buf2[2].toString(16));      //aa
```

<br>

### buffer的遍历:
```js
for(let i=0; i<buf2.length; i++){
  console.log(buf2[i]);
}
```

<br>

## Buffer类的静态方法

### <font color="#C2185B">Buffer.compare(buf1, buf2)</font>
比较两个buf是否是同一个buf

<br><br>

# 系统模块 os
os模块提供了一些操作系统相关信息的api

<br>

## 引入 os 模块
```js
let os = require("os")
```

<br>

## os对象的方法:

### <font color="#C2185B">os.cpus()</font>
获取cpu相关信息
```js
let os = require("os")
console.log(os.cpus())
```

<br>

### <font color="#C2185B">os.totalmem()</font>
获取内存信息
```js
console.log(os.totalmem())
// 8589934592 8g内存
```

<br>

### <font color="#C2185B">os.arch()</font>
返回操作系统的架构 x64

<br>

### <font color="#C2185B">os.freemem()</font>
返回闲置的内存 17883136

<br>

### <font color="#C2185B">os.hostname()</font>
返回主机名称: orannoMacBook-Pro.local

<br>

### <font color="#C2185B">os.platform()</font>
返回平台 darwin

<br><br>

# util模块
```js
const util = require("util")
```

### <font color="#C2185B">util.promisify(callback)</font>
一般fs的模块我们都需要封装成 promise 有了这个方法没有必要每个方法都手动的进行封装 有现成的api可以使用

**参数:**  
错误优先的回调, fs模块中异步的api几乎都是错误优先的风格

**返回值:**  
promise的版本

```js
// 引入 util 模块
let util = require("util")
let fs = require("fs")

// 返回一个promise版本的函数
let readFile = util.promisify(fs.readFile)

// 返回的函数就是promise的函数 而且我们只需要传入参数1 path 参数2回调中的data可以在then中直接获取
readFile("url").then(data => console.log(data.toString()))
```

<br><br>

# path模块
处理跟路径相关的功能 我们还需要获取路径上的信息

## 导入:
导入内置模块和第三方模块的时候要写在最上面
```js
const path = require('path')
```

<br>

## path模块中的API:

### <font color="#C2185B">path.extname();</font>
获取指定文件的扩展名(后缀名), **只是扩展名并不包含文件名**

**参数:**  
文件路径的字符串

因为我们传递的是字符串 所以不光光是文件的后缀名 网页路径中的资源名的后缀也可以读取 或者 这么记 **.后面的部分**

```js    
const path = require('path');

// 获取当前文件的后缀名
let extname = path.extname(__filename);
console.log(extname);   // .js


// 获取网址的资源的后缀名
let str = "http://www.enterdesk.com/download/37982-220381.jpg"

// 获取路径信息的扩展名
let info = path.extname(str)
console.log(info)       // .jpg
```

<br>

### <font color="#C2185B">path.basename(__filename)</font>
获取指定文件路径的 **文件名.扩展名**

**参数:**  
文件路径的字符串

```js 
let basename = path.basename(__filename);
console.log(basename);
// exer.js
```

<br>

**注意:**
__filename 和 __dirname 都是路径
path.basename 输出的只是 文件名

<br><br>

### <font color="#C2185B">path.dirname(__filename)</font>
获取指定文件当前所在路径 (在哪个文件夹)

**参数:**  
文件路径的字符串
```js 
let dirname = path.dirname(__filename);
console.log(dirname);
// /Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_exer

// 和这个变量的值是一样的
console.log(__dirname)
// /Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_exer
```

<br>  

### <font color="#C2185B">path.parse(__filename)</font>
获取指定文件的所有信息

是一个对象, 可以通过对象来调用, 它把路径解析成一个对象, 里面包含了下面的信息

**返回值:**  
对象

```
root: 所在盘符
dir:  文件所在目录
base: 文件名(包括扩展名)
ext:  扩展名
name: 文件名
```

```js 
let fileInfo = path.parse(__filename)

console.log(fileInfo)

{
  root: '/',
  dir: '/Users/LIUCHUNSHAN/Desktop/Sam/node_local_pro/node_exer',
  base: 'exer.js',
  ext: '.js',
  name: 'exer'
}
```

<br>

### <font color="#C2185B">path.resolve([...path]) 解析路径</font>
将我们传入的文件路径 解析为 *绝对路径*
如果传入多个参数 会有路径拼接效果

如果传递空值那么就是当前js文件所在的目录

```js 
  let info = path.resolve("./output.txt")
  console.log(info)

  // /Users/LIUCHUNSHAN/Desktop/Sam/exer/node_exer/output.txt


  let arr = ["sxt/", "qianduan"]
  let info = path.resolve(...arr)

  // /Users/LIUCHUNSHAN/Desktop/Sam/exer/node_exer/sxt/qianduan
```

**注意:**
如果第二个参数字符串是以 / 开头的 则不会进行拼接
```js
// /test
let path2 = path.resolve(__dirname, "/test")
console.log("resolve", path2)   // 没有和dirname拼接 结果为 /test
```

<br>

### <font color="#C2185B">path.join(目标1, 目标2) 拼接路径</font>
路径拼接
下面的例子 当前文件的所在路径 和 test.js 进行拼接

给我的感觉就是 目标1 目标2 目标3 用 \ 链接起来
一层目录就是一个参数

```js 
  const path = require('path');
  let fullpath = path.join(__dirname, 'test.js');
  console.log(fullpath);

  // D:\Memo\Sam\5_Learning_Content\Node_JS\test.js
```

拼接 当前文件所在目录的文件夹里的文件
```js 
  let fullpath = path.join(__dirname, 'module', 'test.js');
  // D:\Memo\Sam\5_Learning_Content\Node_JS\module\test.js
```

<br>

### <font color="#C2185B">process.cwd()</font>
是当前Node.js进程执行时的文件夹地址 —— 工作目录
保证了文件在不同的目录下执行时, 路径始终不变
process.cwd()会根据node命令的执行环节路径更改 

__dirname:  
是被执行的js 文件的地址 ——文件所在目录

也就是说 __dirname 在不同的目录下面打印 结果是不同的

```s
https://blog.csdn.net/weixin_44864084/article/details/120868472
```

```js
let info = process.cwd()
console.log(info);
```

<br>

### 项目的根目录:
```js
const appDirectory = fs.realpathSync(process.cwd());

// 根据 项目根目录 产生绝对路径的方法
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
```

<br><br>

# fs 文件系统 file system
通过node来操作系统中的文件 做一些增删改查的操作

在node中与文件系统的交互是非常重要的, 我们在访问服务器的时候看到是一个网页, 其实就是把服务器中的网页返回给你的用户  
服务器的本质就将本地的文件发送给远程的客户端 我们要是发送 得先把本地文件读出来吧 或者 先写一些本地文件 这都是最基本的要求

Node通过fs模块来和文件系统进行交互  
该模块提供了一些标准文件访问API来打开、读取、写入文件, 以及与其交互 

<br><br>

我们使用js代码编写程序运行在nodejs环境中就可以操作文件  

fs模块中所有的操作都有两种形式可供选择同步和异步  
fs中的方法大部分都是成对出现的, 异步方法都有callback

同步文件系统会阻塞程序的执行 也就是说除非操作完毕, 否则不会向下执行代码
说白了 就是你的操作不执行完了, 其他操作是没办法执行的

异步文件系统不会阻塞程序的执行, 而是在操作完成时, 通过回调函数将结果返回   
使用fs文件系统 要先引入fs模块 fs是核心模块 直接引入 不需要下载

<br>

## 引入 fs 模块
```js
let fs = require('fs');
```

<br><br>

## 标识符: flag: 

### 常用: 读取
|读取|释义|
|:--|:--|
|r|读取文件 , 文件不存在则出现异常|
|r+|读写文件 , 文件不存在则出现异常|
|rs|在同步模式下打开文件用于读取|
|rs+|在同步模式下打开文件用于读写

<br>

### 常用: 写入
只能用于新创建

|写入|释义|
|:--|:--|
|w|打开文件用于写操作 , 如果不存在则创建, 如果存在则覆盖|
|wx|打开文件用于写操作, 如果存在则打开失败|
|w+|打开文件用于读写, 如果不存在则创建, 如果存在则覆盖|
|wx+|打开文件用于读写, 如果存在则打开失败|
       
<br>

### 常用: 追加
         
|追加|释义|
|:--|:--|
|a|打开文件用于追加, 如果不存在则创建|
|ax|打开文件用于追加, 如果路径存在则失败|
|a+|打开文件进行读取和追加, 如果不存在则创建该文件|
|ax+|打开文件进行读取和追加, 如果路径存在则失败|

<br><br>

## 读取文件 
读写文件也有同步和异步之分

java是同步的方式获取磁盘的数据(同步的方法中没有回调之类)  
node中一般都是使用回调的方式来读取文件 或 写入文件

<br>

### 同步方法:
有 Sync 后缀的一般都是 同步方法

### <font color="#C2185B">fs.readFileSync(文件路径, [{配置参数}])</font>
**返回值:**  
文件内容 buf

**参数:**
1. 文件的路径
2. 配置参数: 对象 | 字符串
```js
{
  encoding:
  flag: 默认r
}
```

**示例:**
```js 
// 我们还可以利用path.join()方法来获取文件的绝对路径
let filepath = path.join(__dirname, 'test2.txt');

// 配置参数: 字符串形式
let content = fs.readFileSync('./test2.txt', 'utf-8')
console.log(content);

// 配置参数: 对象形式
let content = fs.readFileSync(filePath, {encoding: "utf8"})
console.log(content);

// 还可以直接拿到buf.toString()
console.log(content.toString());
```

<br>

**注意:**  
同步读取文件信息, 要把整个文件读取完毕之后才继续往下执行, 如果上面的文件很大, 下面的 console 要很长时间后才能得到执行

<br>

### 异步方法:
### <font color="#C2185B">fs.readFile(文件路径, [{配置参数}], callback)</font>
异步方式 无返回值 获取到的数据在回调函数中, 当读取文件完毕后执行回调中的代码

**参数:**
1. 文件路径
2. 可选, 配置参数 对象 | 字符串
```js
{
  encoding: "utf8",
  flag: 默认r
}
```

3. (err, data) => {}  
err是错误信息, 如果读取没发生错误 就为null  
data就是读到的内容 没读到会是undefined

```js 
let filePath = path.resolve(__dirname, "test.txt")
fs.readFile(filePath, "utf-8", (err, data) => {
  if(err) return 
  console.log(data)
})
```

<br>

### 注意: 回调函数中 this 的指向:
- function的写法 this是global
- 箭头函数的写法 this是exports

<br>

### 技巧: 将异步方法封装为 promise
```js 
const read = (path, config = {encoding: "utf8"}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, config, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}

read(filePath).then(data => console.log(data))
```

<br>

**async await版本:**
```js 
async function readList() {
  let file1 = await fsRead("./hello.txt")
  let file2 = await fsRead("./hello1.txt")
  let file3 = await fsRead("./hello2.txt")

  console.log(file1 + file2 + file3)
}


readList()

;(async () => {
  let file1 = await read(filePath)
  let file2 = await read(filePath)
  let file3 = await read(filePath)

  console.log(file1, file2, file3)
})()
```

<br><br>

## 写入文件:

### 同步方法:
### <font color="#C2185B">fs.writeFileSync(文件路径, 数据, [options])</font>
该方法没有返回值, 会将数据写入给定的文件路径 如果没有文件不存在 则会重写创建

<br>

**参数:**  
1. 文件路径, 没有则创建文件
2. 数据, 格式: buf | string
3. 配置对象: 可选
```js
{
  // w是覆盖 a是追加 r是读
  flag: "a" // 追加, 默认是w覆盖
}
```

```js
let targetPath = path.resolve(__dirname, "newTest.txt")

// 将 数据 hi 写入文件
fs.writeFileSync(targetPath, "hi", {flag: "a"})

// 将 buf 写入文件
const content = fs.readFileSync(filePath)
fs.writeFileSync(targetPath, content)
```

<br>

### 异步方法:
### <font color="#C2185B">fs.writeFile(文件路径文件名, 写入内容, [{配置对象}], callback(err))</font>
该方法没有返回值 如果给定文件路径不存在则自动创建文件  
一般使用异步写入文件属于重写(覆盖) 如果想追加请配置标识符

**参数:**
1. 文件路径
2. 内容: buf | string
3. 配置对象
```js
{
  encoding: "utf8",
  // w是覆盖 a是追加 r是读
  flag: "a" // 默认覆盖
}
```
4. err => {}: 形参只有err

```js 
fs.writeFile(fillpath, '我是新写入的内容', 'utf-8', err => {
  if(err) {
    console.log(err);
    return
  }

  console.log('写入完毕')
})



// 路径
let targetPath = path.resolve(__dirname, "newTest.txt")
// 同步读取到的内容
const content = fs.readFileSync(filePath)

// 将获取到的内容 异步写入到文件中
fs.writeFile(targetPath, content, {flag: "a"}, err => {
  if(err) return
  console.log("内容写入成功")
})
```

<br>

### 练习:
需求: 先写入一段话 然后再读取出来
```js
// 先写
fs.writeFile(filePath, "\n是哦 加油！！！", {flag: "a"}, err => {
  if(err) {
    console.log(err)
    return
  }
  console.log("文件写入成功")
})

// 后读
fs.readFile(filePath, "utf-8", (err, data) => {
  if(err) return 
  console.log(data)
})
```

<br>

使用 await async 来改写逻辑
```js
const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const writeFile = (path, content, flag) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, {flag}, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve("写入成功")
      }
    })
  })
}

// 放在一个 async 函数里面来执行逻辑
const checkRet = async () => {
  await writeFile(filePath, "\n 加油！！！", "a")
  let content = await readFile(filePath)
  console.log(content)
}

checkRet()
```

<br><br>

## 分步: 完成文件的 打开 写入 关闭操作:

### 同步方法:
1. 打开文件
2. 向文件中写入内容
3. 保存 并 关闭

<br>

### 打开文件(内存层面)
### <font color="#C2185B">let fd = fs.openSync(path, flags[,mode])</font>
打开文件, 相当于读取目标文件的标识符(**相当于我们在内存层面打开文件 但是打开的是一个标识符**)

如果之前没有该文件 相当于创建

我们正常操作系统的时候 双击文件夹 会弹出一个窗口  
而现在我们是用命令打开文件所在的目录 fd 就是相当于我们在内存中打开一个窗口 fd 用于我们在内存中找到这个窗口

<br>

**参数:**  
1.  要打开文件的路径
2. flag:   
打开文件要做的操作的类型 只读 写 连读带写 追加 重新覆盖 (r w a)
3. mode: 设置文件的操作权限 一般不传 window系统没用 一般都是linux起作用的

<br>

**返回值:**
number: 标识符, 该方法会返回一个描述符作为结果 我们可以通过该描述符对文件进行各种操作

<br><br>

### 写入文件
### <font color="#C2185B">fs.writeSync(fd, string, [position], [encoding])</font>
我们通过 打开文件步骤 拿到指定的标识符 来操作具体的文件

**参数:**
1. fd: 文件的描述符 需要传递要写入文件的描述符
2. string: 要写入的内容
3. position: 表示写入的起始位置  从20的位置开始往后写
4. encoding: 表示写入的编码 默认utf-8 传入后可以省略toString()

```js 
// 拿到文件标识
let fd = fs.openSync(filePath, "a")

// 写入文件
fs.writeSync(fd, "今天天气真不错")

// 关闭写入操作
fs.closeSync(fd)

// 读取文件内容
let content = fs.readFileSync(filePath, "utf-8")
console.log(content)
```
    
<br>

### 关闭打开的文件:
保存功能在写入的时候自动就完成了 现在上面的代码 在这里运行一点问题没有 不管行不行 行 因为在这程序都写完了, 但是服务器一停 就被释放了 假如说我的程序是在服务器里运行的 服务器会不会停？ 

服务器不能停 服务器需要持续的运行, 服务器都是运行在一个循环里的 它会持续的去运行  
上面的打开文件 实际上它就在内存里面存在了, 写入文件 文件还在内存里 如果不关闭的话 这个文件会一直占用内存空间 相当于 我打开一个文件就最小化 打开多个会占用内存, 所以 最后还要关闭文件

### <font color="#C2185B">fs.closeSync(fd)</font>
通过给定的标识 关闭文件 释放

**参数:**  
- fd: 要关闭文件的描述符

<br><br>

### 异步方法:
1. 打开文件
2. 向文件中写入内容
3. 保存 并 关闭

<br>

### 打开文件 或 创建文件
异步的方法都是通过回调函数的参数返回的

<br>

### <font color="#C2185B">fs.open(path, [flag], [mode], callback)</font>
打开文件的标识符 在回调函数中的形参

**参数:**
- callback: (err, fd) => {}

err: 错误对象  
如果没有错误则为null 这也是nodejs的设计思想 叫做错误优先 只有有可能有出现错误的方法 

fd: 文件的标识符

<br>

**注意:**  
打开的时候 flag 好像必须要指定

```js 
fs.open('hello.txt', 'w', function(err, fd){
  // 判断是否出错
  if(err){
      // 这里可以对错误进行一个处理
  }
  if(!err){

  }
})
```

<br>

### 写入文件
### <font color="#C2185B">fs.write(fd, string, [position] ,[encoding], callback)</font>
向文件中写入内容

**参数:**
1. fd: 文件的描述符 需要传递要写入文件的描述符
2. string: 要写入的内容
3. position: 表示写入的起始位置  从20的位置开始往后写
4. encoding: 表示写入的编码 默认utf-8 传入后可以省略toString()
5. callback: (err, written, string) => {}

后面的两个参数不常用  
written: 写入了多少字节  
string: 写入的内容

<br>

### 关闭文件
### <font color="#C2185B">fs.close(fd, callback)</font>
关闭文件在写入文件的回调函数里, 只要回调函数一执行就代表写完了不是么

callback: err => {}

<br>

```js 
// 打开一个文件, 使用 flag 标识对该文件要进行什么样的操作
fs.open(filePath, "w", (err, fd) => {

  // 向 fd 文件中写入内容
  fs.write(fd, "又到晚上了", "a", (err, written, contented) => {
    if(err) {
      console.log(err) 
      return
    } else {
      // 写入了多少字节 5 * 3 = 15
      console.log(written)
      // 写入了什么内容
      console.log(contented)

      fs.close(fd, err => {
        if(err) console.log(err)
      })
    }
    
  })
})
```

<br><br>

### 练习: 将读到的内容写到别的位置 (复制粘贴)

```js 
// 简单文件的读取 --- 异步方法
let fs = require('fs');

fs.readFile('hello.txt', function(err, data){
  if(!err){
    console.log(data.toString());
  }
})


// 简单文件的读取 --- 同步方法
let fs = require('fs');
let result = fs.readFileSync('hello.txt');


// 读到数据后 能不能把读到数据 写到别的地方去
fs.readFile('D:/Memo/Erin/1.jpg', function(err, data){
  if(!err){
      // 将读到的文件写入别的文件中
      fs.writeFile('hello.jpg', data, function(err){
      // 如果没有错 文件写入成功
  if(!err){
      console.log('文件写入成功');
  }
});


// 示例:
let filePath = path.resolve(__dirname, "test.txt")
let targetPath = path.resolve(__dirname, "newTest.txt")

const read = (path, config = {encoding: "utf8"}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, config, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}

const write = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => {
      err ? reject(err) : resolve("文件写入成功")
    })
  })
}

;(async () => {
  let content = await read(filePath)
  await write(targetPath, content)
})()
```

<br><br>

## 流式写入

### 为什么要流式文件的写入?
上面同步 异步 简单的方式写入文件 都是一次性全写进去

那就产生一个问题, 我得把内容在内存中准备好, 但是如果内容太多 占用的内存太大对内存的损耗就会太大, 容易造成内存溢出

比如我们电脑一般都是8g内存 但是我们的文件是50G的和平精英 当我们读取比较大的数据的时候 不可能一次性的将所有的数据都读下来 

**所以同步 异步 简单的方式都不适合大文件的写入**

<br>

### Stream接口
*Stream*是一个抽象接口 node中有很多对象实现了这个接口

<br>

### 流式文件写入的理念: 
创建一个水管(可写流), 跟目标文件链接上 相当于将水管搭在了 目标文件上

例如:  
对http服务器发起请求的request对象就是一个Stream 还有stdout(标准输出)

<br>

### nodejs中 Stream有四种流类型
1. Readable 可读操作
2. Writable 可写操作
3. Duplex   可读可写操作
4. Transform 操作被写入数据 然后读出结果

<br>

### 所有的Stream对象都是 EventEmitter 的实例 常用的事件有
1. data   当有数据可读时触发
2. end    没有更多的数据可读时触发
3. error  在接收和写入过程中发生错误时触发
4. finish 所有数据已被写入到底层系统时触发

5. open   文件打开时触发
6. close  文件关闭时触发
7. ready  文件打开时触发

<br>

### 实现方式:
### <font color="#C2185B">let ws = fs.createWriteStream(path, [options])</font>
该方法可以创建一个 可写流 **创建水管**

**参数:**  
- path: 文件路径  跟哪个文件链接上
- options: 配置的参数
```js
{
  flags: "w"  // 默认 w 覆盖操作,
  encoding: "utf8", // 写入文件的字符编码 默认是utf8格式写入

  mode: 777 // 文件的权限设置
  fd: null, // 文件打开后返回的文件描述符
  start: 0, // 写入文件的起始索引位置
  highWaterMark: 16, // 16k - 100k 
  autoClose:true  // 是否自动关闭文档
}
```

<br>

### <font color="#C2185B">ws.write('字符串' | buf, [encoding][callback])</font>
通过 水管 向目标文件写入内容  
只要可写流还在就可以持续的写下去　可以分多次写入内容 这样比较适合大型文件

**参数:**  
- encoding: string "utf8"
- callback: () => {}  写入的数据完成后触发

```js 
ws.write('这是流式文件写入', () => {console.log(数据写完了了)});
ws.write('这是流式文件写入');
ws.write('这是流式文件写入');
```

<br>

### 关闭可写流:

### <font color="#C2185B">ws.end()</font>
标记文件的末尾 标记写入结束  
关闭流, **关闭流的时候用这个**

使用end B水缸里有全部内容 相当于拔掉A水缸的管子 输入的内容都在B水缸里

<br>

### <font color="#C2185B">ws.close()</font>
使用close() B水缸内只会有第一次写入的内容 没有其余的内容 相当于拔掉B水缸的管子 水管内部的内容仍然在水管内部

<br>

### ws身上的事件: 
```js
// 打开可写流的事件
ws.once('open', function(){
  console.log('流打开了');
})


// 关闭可写流的事件
ws.once('close', function(){
  console.log('流关闭了');
})


// 写入完成后触发的事件
ws.on("finish", () => {
  console.log("写入完成")

  // 写入完成后读取内容
  fs.readFile("./output.txt", "utf-8", (err, data) => {
    if(!err) console.log("data", data)
  })
})


// 发生错误时的事件
writeStream.on("error", () => {
  console.log(err.stack)
})
```

<br>

```js
// 可写流示例:
let fs = require("fs")

let content = "hello, world"
let content2 = "hello, world2"
let content3 = "hello, world3"

// 创建一个可以写入的流 写入到文件 output.txt
let writeStream = fs.createWriteStream("output.txt")

// 使用utf8编码写入数据
writeStream.write(content, "utf-8")
writeStream.write(content2, "utf-8")
writeStream.write(content3, "utf-8")
  // 写入流的优势就在于 可以多次分次写入

// 标记文件末尾 最终写完之后要标记 end 代表写入完成
writeStream.end()

// 处理流事件 -- data end error
writeStream.on("finish", () => {
  console.log("写入完成")
  fs.readFile("./output.txt", "utf-8", (err, data) => {
    if(!err) console.log("data", data)
  })
})

writeStream.on("error", () => {
  console.log(err.stack)
})

// 它反而到先执行
console.log("程序执行完毕")
```

<br><br>

## 流式读取:

### 创建可读流:
### <font color="#C2185B">let rs = createReadStream(path, [options])</font>
创建一个可读流

**参数:**  
- path: 文件的路径
- options: 配置对象
```js
{
  flags: "w"  // 默认 w 覆盖操作,
  mode: 777 // 文件的权限设置
  fd: null, // 文件打开后返回的文件描述符
  encoding: "utf8", // 写入文件的字符编码 默认是utf8格式写入
  start: 0, // 写入文件的起始索引位置
  highWaterMark: 16, // 16k - 100k 
  autoClose:true  // 是否自动关闭文档
}
```

<br>

### 设置读取流的编码格式:
buf的时候不用设置为 utf8

### <font color="#C2185B">rs.setEncoding("utf-8")</font>

<br>

### rs身上的事件: 
跟ws事件基本一致

```js
// 数据是分批读取的 每一批为一个chunk 每一个chunk是有大小的 每一个chunk 65536字节
rs.on("data", chunk => {
  content += chunk

  // 数据读取结束后 文件会被关闭
})


// 跟java差不多的读取方式
rs.on("readable", () => {
  // data当读到最后的时候是 null
  // let data = rs.read()

  let data
  while((data = rs.read()) !== null) {
    
  }
})
```

<br>

### rs身上的方法:
### <font color="#C2185B">rs.pause()</font>
暂停数据读取

<br>

### <font color="#C2185B">rs.resume()</font>
恢复数据读取

```js
rs.on("data", chunk => {
  rs.pause()

  // 1s后恢复读取
  setTimeout(() => rs.resume(), 1000)
})
```

<br>

**可读流示例:**
```js
let fs = require("fs")
let content = ""

// 创建一个可读流
let readerStream = fs.createReadStream("input.txt")

// 设置编码为 utf-8
readerStream.setEncoding("utf-8")

// data事件 当有数据可读时触发 监听数据的流入
// 参数 chunk 每一批数据 (数据很大是分批读取)
readerStream.on("data", (chunk) => {
  content += chunk
})

// end事件 没有更多的数据可读时触发 流完后的事件
readerStream.on("end", () => {
  console.log(content)
})

readerStream.on("error", (err) => {
  console.log(err.stack)
})

console.log("程序执行完毕")


// 最后我们可以将读到的内容 创建写入流 写入到某个文件
readerStream.on("data", (chunk) => {
// 创建写入流 这样每读取到一批数据 就写入一批数据
  ws.write(chunk, () => {})
})

// 当读取完成后 我们调用 ws.end()
// end事件 没有更多的数据可读时触发 流完后的事件
// 或者 close事件 也可以
readerStream.on("end", () => {
  ws.end()
})
```

<br><br>

### 管道流
管道流提供了一个输出流到输入的机制 通常我们用于**从一个流**中获取数据并将数据**传递到另一个流**中

比如我们把文件比作装水的桶 而水就是文件里面的内容 我们用一根管子链接两个桶使得水从一个桶流入另一个桶 这样就慢慢的实现了大文件的复制过程

<br>

### <font color="#C2185B">readerStream.pipe(writeStream)</font>
读取文件buf到指定文件中

使用的是 rs 和 ws 所以要先创建对应的 可读流 和 可写流

```js 
let fs = require("fs")

// 创建一个可读流
let readerStream = fs.createReadStream("input.txt")

// 创建一个可写流
let writeStream = fs.createWriteStream("output.txt")

// 管道读写操作 搭根管子
// 读取 input.txt 文件内容 并将内容写入到 output.txt文件中

// 从 读 到 写 
readerStream.pipe(writeStream)

console.log("程序执行完毕")
```

<br>

### 技巧:
将 html 页面传递给前端 还可以这么写 利用 **管道流**

创建可读流 调用 pipe(res) 到响应对象上
```js
app.get("/", (req, res) => {
  let path = resolve(__dirname, "public", "index.html")
  // 将 管道流 搭到了 res 上
  fs.createReadStream(path).pipe(res)
})
```

<br>

### 检查文件是否存在

### 方式1: 
### <font color="#C2185B">fs.accessSync(path, fs常量参数)</font>
同步的方式 使用 try catch 来判断文件是否存在等操作

**参数:**  
只有path

**返回值:**  
err对象

```js
try {
  accessSync('etc/passwd', fs.constants.R_OK | fs.constants.W_OK);
  console.log('can read/write');
} catch (err) {
  console.error('no access!');
}
```

<br>

### <font color="#C2185B">fs.access(path, fs常量参数, 回调)</font>
检查文件是否存在 or 检查文件是否可读 or 检查文件是否可写

**参数:**  
- path: 给定文件的路径
- fs.constants.F_OK: 文件是否存在
- fs.constants.W_OK: 文件是否可写
- fs.constants.R_OK: 文件是否可读
- err => { ... }

我们根据 err 来判断 上述的3种情况

```js
// 判断文件是否存在
fs.access(filePath, fs.constants.F_OK, err => 
  err ? "存在" : "不存在"
)

// 判断文件是否可读
fs.access(filePath, fs.constants.R_OK, err => 
  err ? "不可读" : "可读"
)

// 判断文件是否可写
fs.access(filePath, fs.constants.W_OK, err => 
  err ? "不可写" : "可写"
)
```

<br>

**示例:**
```js
let requestUrl = path.join(staticDir, pathname)
try {
  // 当前端页面请求 资源的时候 比如自发性的请求 css 文件 或者 js 文件等 会先检查该文件是否存在 如果存在就进行返回
  fs.accessSync(requestUrl)
  fs.createReadStream(requestUrl).pipe(res)
} catch (err) {
  res.statusCode = 404
  res.end("Not Found")
}
```

<br>

### 方式2:
### <font color="#C2185B">fs.exists(path, callback)</font>
该方法已废弃  
回调函数包含一个参数exists, true则文件存在, 否则是false

<br>

### 方式3:
### <font color="#C2185B">fs.statSync(path, [options])</font>
返回有关给定文件的信息

我们通过这个方法 可以获取到 文件的创建 修改 最后一次访问的时间 比如我们在做 协商缓存的时候 就会使用该api获取文件最后的修改时间

<br>

**参数1:**   
path: string 给定文件的路径

**参数2:**
```js
options: {
  // 默认值: false, 返回的<fs.Stats>对象中的数字值是否应该是大数
  bigint: false,

  // 默认值: true, 如果没有文件系统条目存在, 是否会抛出一个异常, 而不是返回未定义 默认值: true 
  throwIfNoEntry: true
}
```

从fs.stat()、fs.lstat()和fs.fstat()及其同步对应方法返回的对象是这种类型 
如果传递给这些方法的选项中的bigint为真, 数字值将是bigint而不是数字, 并且对象将包含以Ns为后缀的额外纳秒精度属性 

<br>

**返回值:**  
对象, 提供关于一个文件的信息 
```js
{
  // 含有该文件的设备的数字标识符 
  dev: 2114,

  // 文件系统特定的 "Inode "号码, 用于该文件 
  ino: 48064969,

  // 一个描述文件类型和模式的位字段 
  mode: 33188,

  // 文件存在的硬链接的数量 
  nlink: 1,

  // 拥有该文件的用户的数字用户标识符(POSIX) 
  uid: 85,

  // 拥有该文件的组的数字组标识符(POSIX) 
  gid: 100,

  // 如果文件代表一个设备, 则是一个数字设备标识符 
  rdev: 0,

  // 文件的大小, 以字节为单位 
  size: 527,

  // 用于i/o操作的文件系统块大小 
  blksize: 4096,

  // 为该文件分配的块数 
  blocks: 8,

  // 表示该文件最后一次  被访问的时间戳  , 以POSIX Epoch以来的毫秒为单位 
  atimeMs: 1318289051000.1,

  // 表示该文件最后一次  被修改的时间戳  , 以POSIX Epoch以来的毫秒为单位 
  mtimeMs: 1318289051000.1,

  // 表示最后一次  改变文件状态的时间戳  , 以POSIX Epoch以来的毫秒为单位 
  ctimeMs: 1318289051000.1,

  // 表示该文件  创建时间的时间戳  , 以POSIX Epoch以来的毫秒为单位 
  birthtimeMs: 1318289051000.1,

  // 表示该文件最后一次   被访问的时间戳 
  atime: Mon, 10 Oct 2011 23:24:11 GMT,

  // 表示该文件最后一次   被修改的时间戳 
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,

  // 表示文件状态最后一次   被改变的时间戳 
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,

  // 表示该文件的   创建时间的时间戳
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT
}
```

- atime "访问时间" - 文件数据最近被访问的时间    
- mtime "修改时间" - 文件数据最近被修改的时间    
- ctime "变化时间" - 文件状态最近更改的时间(修改索引节点数据)   

- birthtime "创建时间" - 文件创建的时间    
当文件被创建时设定一次  在创建时间不可用的文件系统中, 该字段可能被替代为 ctime 或 1970-01-01T00:00Z(如 Unix 的纪元时间戳 0)  

<br>

**注意:**  
该值在此情况下可能会大于 atime 或 mtime 在 Darwin 和其它的 FreeBSD 衍生系统中, 如果 atime 被使用 utimes(2) 系统调用显式地设置为一个比当前 birthtime 更早的值, 也会有这种情况 

<br>

**返回对象身上的方法:**  
```js
let filePath = "./server.js"   // error: file is not defined
let dirPath = "./router"       // error: no such file or directory, stat './router1

let stats = fs.statSync(filePath)
```

**<font color="#C2185B">stats.isDirectory()</font>**  
监测给定文件路径是否是一个文件夹

**返回值:**  
boolean  


<br>

**<font color="#C2185B">stats.isFile()</font>**  
监测给定文件路径是否是一个文件

**返回值:**  
boolean  

<br>

### 删除文件
### <font color="#C2185B">fs.unlink(path, callback)</font>
该方法仅适用于删除文件 

**参数** 
- path: 文件路径
- err => {}

```js 
let fs = require("fs")

fs.access(filePath, fs.constants.F_OK, err => {
  // 没有err则说明文件存在
  if(!err) {
    fs.unlink(filePath, err => {
      if(err) {
        throw err
      } else {
        console.log("文件删除成功")
      }
    })
  }
})



// 封装
;(async () => {
  try {
    await isExists(filePath, fs.constants.F_OK)
    fs.unlink(filePath, err => {
      if(!err) console.log("文件删除成功")
    })
  } catch(err) {
    console.log("文件删除失败")
  }
})()


function isExists(path, type) {
  return new Promise((resolve, reject) => {
    fs.access(path, type, err => {
      if(err) {
        reject(err)
      } else {
        resolve({msg: "ok"})
      }
    })
  })
}
```

**注意:**  
不适用于目录, 无论是空目录还是其他目录  要删除目录, 请使用 ``fs.rmdir()`` 

<br>

**删除文件夹中的指定文件:**
```js 
let fs = require("fs")

fs.readdir(__dirname, (err, files) => {
console.log(files)
// [ 'app.js', 'hello1.txt', 'hello2.txt', 'hello3.txt' ]

files.forEach(item => {
  if(item.endsWith("txt")) {
    fs.unlink(item, () => {
      console.log(item + "已删除")
    })
  }
})
})
```

<br>

### 删除目录
### **<font color="#C2185B">fs.rmdir(path, callback)</font>**
该方法仅适用于删除文件目录
```js
let stat = fs.statSync(folderPath)
let flag = stat.isDirectory()

if(flag) fs.rmdirSync(folderPath)
```

<br>

### 读取目录中的文件(包含子目录)
### **<font color="#C2185B">fs.readdir(path, callback)</font>**
返回该目录下的所有文件会子级的文件夹

**参数:**  
path: 目录的路径  
callback: (err, files) => { }  
- err: 没读到的报错信息
- files: 为目录下的文件 会以文件名呈现的 **数组列表**

**返回值:**  
文件名称组成的数组

```js
fs.readdir(__dirname, (err, files) => {
  console.log(files)
})

// 结果:
[
'.DS_Store',
'The Secret Number 2012.mp4',
'exer.js',
'exer2.js',
'test.txt'
]
```

<br>

示例1: 判断是否是文件目录  
利用 fs.statSync() api
```js
// 判断目录下文件是否是目录 打印目录
fs.readdir(target, (err, files) => {
  files.forEach(item => {

    // 判断文件夹中的文件是否是目录
    let stats = fs.statSync(item)
    
    // 是目录的话输出目录
    if(stats.isDirectory()) {
      console.log(item)
    }
  })
})
```

<br>

示例2: 判断是否是文件目录  
利用文件名正则 判断是否有后缀名
```js
const fs = require("fs")
const path = require("path")

const dirContent = fs.readdir(path.resolve(__dirname), (err, files) => {
files.forEach(item => {
  if(!item.match(/\..+$/)) {

    // 能进入到这里的话 item就是文件目录
    console.log(item)
  }
})
})
```

<br>

### 修改文件名
### <font color="#C2185B">fs.renameSync(旧文件名, 新文件名)</font>
修改文件名
```js 
fs.renameSync('test.txt', 'result.txt');
```

<br>

### <font color="#C2185B">字符串.endsWith('字符串')</font>
检查str字符串是否以给定字符串结尾

<br>

### <font color="#C2185B">字符串.startsWith('字符串')</font>
检查str字符串是否以给定字符串开始

```js 
  let str = 'hello.js';
  console.log(str.endsWith('.js'));       // true
  console.log(str.startsWith('hel'));     // true
```

<br>

### 创建目录

### <font color="#C2185B">fs.mkdir(path, [{配置对象}], 回调)</font>
创建一个文件夹

**参数:**  
- path: 目录的路径 
- config: 可选, 配置对象
  - recursive 是否以递归的方式创建目录 默认为false
  - mode 这是目录权限 默认为0777

- () => {}

<br>

### 练习: 批量修改文件名 
把当前文件夹下的js文件的名字都添加前缀 [ok]

**思路:**  
我们可以通过 fs.readdirSync(__dirname) 获取所有的文件名的数组
对这个数组进行遍历, 内部进行判断是否是js文件, 如果是就重命名文件

```js 
const fs = require('fs');
const path = require('path');

let fnList = fs.readdirSync(__dirname);

fnList.forEach((item, index) => {

  // 进行判断 是否以js文件名结尾 
  if(item.endsWith('.js')) {

    // 对每一个文件进行重命名
    fs.renameSync(item, `OK${item}`);
  }
})
```

<br>

### 批量删除文件名前缀
需求: 把刚刚添加的OK 删除

```js 
const fs = require('fs');
const path = require('path');

let fnList = fs.readdirSync(__dirname);

fnList.forEach((item, index) => {
  if(item.endsWith('.js')) {

    // item是文件名是字符串 这里使用字符串的方法
    fs.renameSync(item, item.substr(2));
  }
})
```

<br>

### 练习: 拼接3个文件的内容 汇总到一个文件去

需求:现在存在三个文件  
1.txt 我  
2.txt 爱  
3.txt NodeJs

每个文件里面有一个字符, 使用 fs.readFile(异步) 顺序读取1.txt 2.txt 3.txt里面的内容, 然后组成我爱NodeJs 把这个字符串异步写到 data.txt文件里面

顺序读取, 因为异步的关系 如果顺序写fs.readFile的话 第一个没读取完就读第二个了, 我要确保第一个读取完后读第二个要写在回调里面

```js 
const fs = require('fs');
const path = require('path');

let fFile1 = path.join(__dirname, '1.txt');
let fFile2 = path.join(__dirname, '2.txt');
let fFile3 = path.join(__dirname, '3.txt');
let fFile4 = path.join(__dirname, 'data.txt');

// 因为要顺序读取, 最后做拼接, 所以要在回调中再次读取下一个文件
fs.readFile(fFile1, 'utf-8', (err, data1) => {
  if (err) {
    console.log(err);
    return
  }

  // 读完第一个文件后 再次在file1中读file2
  fs.readFile(fFile2, 'utf-8', (err, data2) => {
    if (err) {
      console.log(err);
      return
    }

    // 读file3
    fs.readFile(fFile3, 'utf-8', (err, data3) => {
      if (err) {
        console.log(err);
        return
      }

      let content = data1 + data2 + data3;

      // 如果没有该文件会自动创建
      fs.writeFile(fFile4, content, 'utf-8', err => {
        if(err) {
            console.log(err);
        }
      })
    })
  })
})
```

<br><br>

# readline模块
获取控制台输入输出 

<br>

## 自己实现脚手架 简单的配置
模块提供了用于从可读流(例如 process.stdin)每次一行地读取数据的接口  可以使用以下方式访问它:   
一旦调用此代码, 则 Node.js 应用程序将不会终止, 直到 readline.Interface 关闭, 因为接口在 input 流上等待接收数据 

**效果:**  
控制台提出问题 我们进行回答 有点像js的confirm方法 从控制台定义问题 收到用户的输入

<br>

## 使用方式

### 1. 首先导入 readline
```js
let readline = require("readline")
```

<br>

### 2. 创建 readline 接口的实现类对象
```js
const rl = readline.createInterface({
  // 输入和输出都在终端   process进程
  input: process.stdin,
  output: process.stdout
})
```

<br>

### 3. 调用 question() 方法在控制台提出问题
<font color="#C2185B">rl.question("问题", answer => { ... })</font>  

<br>

```js 
let readline = require("readline")

// 创建readline接口实例
let rl = readline.createInterface({
// 输入和输出都在终端   process进程
  input: process.stdin,
  output: process.stdout
})

// question方法 提问 回答模式
rl.question("你的名字是?", function(answer) {
  console.log("我的名字是: " + answer)

  // 不加close 则程序不会结束
  rl.close()
})

// close事件监听
rl.on("close", () => {
  // 结束程序
  process.exit(0)
})
```

<br>

### 练习:  自己创建 package.json
创建 node init 创建项目的案例 自己创建package
```js 
let readline = require("readline")
let fs = require("fs")

// 创建readline接口实例
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


// 定义 一问一答的 promise方法
function encapsulationQuestion(Q) {
return new Promise((resolve, reject) => {
  rl.question(Q, function(A) {
    resolve(A)
  })
})
}

// 读取用户输入的信息
async function createPackage() {
let name = await encapsulationQuestion("您的包名叫什么?")
let desc = await encapsulationQuestion("您的描述是什么?")
let main = await encapsulationQuestion("您的主程序入口文件是什么?")
let author = await encapsulationQuestion("您的包的作者是什么")


// 将获取到内容写入一个文件

// 定义内容模板
let content = `{
  "name": "${name}",
  "description": "${desc}",
  "main": "${main}",
  "author": "${author}"
}
`
fs.writeFile("./package.json", content, {flag: "a", encoding: "utf-8"}, (err) => {
    // 写入成功后 调用关闭进程的事件
    rl.close()
  })
}
createPackage()


// close事件监听
rl.on("close", () => {
  // 结束程序
  process.exit(0)
})

```

<br><br>

# node事件循环
nodejs是单进程单线程的程序 但是因为v8引擎提供的异步执行回调接口 通过这些接口可以处理大量的并发 所以性能非常的高

nodejs几乎每一个api都是支持回调函数的 基本上所有的事件机制都是用设计模式中 - 观察者模式实现

node单线程类似进入一个 while true 事件循环 直到没有事件观察者退出 每个异步事件都生成一个事件观察者 如果有时间发生就调用该回调函数
```js 
  伪代码:

  开启进程
  开启线程
  初始化数据

  while(true) {

    初始化事件列表
    根据事件修改初始化数据
    根据数据去渲染页面

  }
```

事件循环 相当于在一个 while(true) 循环里面 从上到下 反复执行 事件的回调 之所以在同步console的后面打印 是因为console在第一轮 然后循环到我们点击按钮那轮才会被打印

<br>

# 事件驱动程序
在说事件驱动程序之前 我得先说说自己的理解 前端js中 我们的事件大多都是通过点击来触发 比如用户想完成点击的逻辑 就是有click事件 用户要关闭某个窗口对应的可能就是close事件

我们在不同的事件回调中处理对应的逻辑 现在我们想下这个场景 假如我们现在需要读取一个文件里面的数据 然后依据读到的数据 我们要做依次的逻辑 伪代码如

```js 
fs.readFile("./userInfo.json", "utf-8", (err, data) => {
  if(!err) {
    1. 读取数据库
    2. 渲染页面
    3. 统计用户信息
  }
})
```

假如我们将1 2 3三种逻辑都放在回调中处理的话 1是可能会产生回调地狱 2是回调中的逻辑可能会非常的多  
那有没有种方式 当我们数据读取成功后会依次调用这3块的逻辑呢？那把这3块内容封装成3个方法不可以么？

还有一种思路:

<br>

## 自定义: 事件总线(消息的订阅与发布模式)
我们可以自己实现 事件总线

```js
const Emitter = {
  event: {
    
  },
  on: function (eventName, cb) {
    // 如果要绑定的事件 存在则将回调放入对应的数组中
    if(this.event[eventName]) {
      this.event[eventName].push(cb)
    } else {
      // 如果要绑定的额事件 不存在 则将该事件初始化成一个数组 再将回调放入
      this.event[eventName] = [cb]
    }
  },
  emit: function(eventName, params) {
    // 如果该事件存在 则循环执行对应的回调数组
    if(this.event[eventName]) {
      this.event[eventName].forEach(fn => {
        fn(params)
      })
    }
  }
}
```

<br>

- event: 事件对象
```js
{
  eventName: String,
  cb: Function
}
```

- on: 绑定事件的方法
- emit: 触发事件的方法

<br>

**思路:**  
on()方法绑定事件, 指定事件名和回调函数 内部逻辑  
先判断绑定的事件名是否存在
- 如果存在则将绑定的回调放入 事件名对应的数组中
- 如果不存在 则初始化 事件名:[] 并将事件导入回调数组中

<br>

**使用方式**
```js 
Emitter.on("send", (...args) => {
  console.log(args)
})

Emitter.on("show", (...args) => {
  console.log(args)
})

Emitter.emit("send", "hello")
Emitter.emit("send", "boy")

Emitter.emit("show", "girl")
```

上面我们就完成了 "自定义事件的逻辑"， 通过去订阅我们自己设定的事件 监听触发完成回调

<br>

**注意:**  
在获取 on emit 方法的时候不能解构后调用, 如下的方式是错的 因为解构后 this的指向不再是当前的对象而是 export对象 只有通过 obj. 的形式调用 this才指向当前的对象
```js
let {on, emit} = Emitter
```

<br>

其实上面的整个逻辑 其实nodejs中已经提供给我们了

<br><br>

# EventEmitter 自定义事件模块
node使用事件驱动模型 当web server接收到请求 就把它关闭然后进行处理 然后去服务下一个web请求 当这个请求完成 它被放回处理队列 当到达队列开头 这个结果被返回给用户

这个模型非常高效可扩展性非常强 因为 webserver一致接收请求而不等待任何读写操作 在事件驱动模型中 会生成一个主循环来监听事件 当检测到事件时触发回调函数

node里 我们没有浏览器的众多的事件 但是可以自定义事件的逻辑完成实现各种逻辑

<br>

## 引入:
```js
let events = require("events")
```

<br>

## 创建:
```js
let bus = new events.EventEmitter()
```

<br>

## 事件:
### <font color="#C2185B">bus.on("事件名", data => { ... })</font>
在 "总线" 上绑定了一个事件  当触发这个 "事件" 的时候 会执行回调  
可以给一个事件绑定多个回调 当触发的时候多个回调会依次执行

<br>

### <font color="#C2185B">bus.emit("事件名", 数据)</font>
触发 "总线" 中的事件 并发送过去数据

<br>

### <font color="#C2185B">bus.removeAllListeners("事件名")</font>
移除 "总线" 上 指定事件名对应的所有回调

<br>

### <font color="#C2185B">bus.removeListener("事件名", "回调")</font>
移除 "总线" 上 指定事件名的指定回调

```js
const events = require("events")
const bus = new events.EventEmitter()

bus.on("customer", data => {
  console.log("data1: ----- ", data)
})

bus.on("customer", data => {
  console.log("data2: ----- ", data)
})

setTimeout(() => {
  bus.emit("customer", "hello")
}, 3000)
```


```js 
// 引入 事件模块 (events)
let events = require("events")
let fs = require("fs")

// 实例化 EventEmitter 对象
let eventEmitter = new events.EventEmitter()

// 通过实例对象 监听自定义事件
eventEmitter.on("helloSuccess", (data) => {
  console.log("一会吃个橘子")
  console.log(data)
})
eventEmitter.on("helloSuccess", (data) => {
  console.log("然后吃个香蕉")
  console.log(data)
})
eventEmitter.on("helloSuccess", (data) => {
  console.log("最后看个小说")
  console.log(data)
})

// 合适的实际的时候 通过 触发自定义事件
fs.readFile("./output.txt", {encoding: "utf-8"}, (err, data) => {
  if(!err) {
    eventEmitter.emit("helloSuccess", data)
  }
})
```

相当于配置好的 *vue中的事件总线*

<br><br>

# URL模块
用来处理url, url核心模块为我们解析url地址时提供了非常方便的api

<br>

### 引入: 
```js
let url = require("url")
```

<br>

### <font color="#C2185B">url.parse("url", true)</font>
该方法可以解析一个url地址 通过传入第二个参数 true 把包含有查询字符串的query转换成对象
```js 
let url = require("url")

let path = "www.baidu.com/?name=sam&age=18"
let info = url.parse(path)

console.log(info)   // 对象
console.log(info.query)

/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:3000',
  port: '3000',
  hostname: 'localhost',
  hash: null,
  search: '?name=sam',
  query: [Object: null prototype] { name: 'sam' },
  pathname: '/login',
  path: '/login?name=sam',
  href: 'http://localhost:3000/login?name=sam'
}
*/
```

<br><br>

# new URL()
该类是js语法中提供的api 可以用来代替 url 模块

### <font color="#C2185B">new URL(String: url, [String: base])</font>
当我们想解析 get请求 url上的参数的时候, 我们可以通过创建 URL() 类的实例来获取参数
这个类是 原生js 里面提供的类

**参数:**  
要解析的绝对或相对的 URL， base后面不用 接 /
- 如果为相对路径, 则要带上base, 
- 如果是绝对路径, 则省略base

```js 
const myURL = new URL('/foo', 'https://example.org');

// 比如 我们通过requset.url获取的是 相对路径
requset.url : /index.html?curPage=1&perPage=10

// 这时我们就要使用base
const myURL = new URL(requset.url, 'https://localhost:8000');

/*
{
  href: 'https://www.baidu.com/?name=sam&age=18',
  origin: 'https://www.baidu.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/',
  search: '?name=sam&age=18',
  searchParams: URLSearchParams { 'name' => 'sam', 'age' => '18' },
  hash: ''
}
*/
```

<br>

### <font color="#C2185B">URL实例对象.searchParams.get('属性名')</font>
通过url的实例对象 获取url中的参数, 必须指定属性名
```js 
myURL.searchParams.get('curPage')   // 1
```

<br>

## new URLSearchParams() 
该类用于处理 url 上的查询字符串 应该是带?的那种  
返回的实例对象身上有对应的各种 api 方便我们操作结果

<br>

### <font color="#C2185B">new URLSearchParams(String: queryString)</font>

```js
let webUrl = "https://www.baidu.com/?name=sam&age=18"

let info = new URL(webUrl)

let searchParam = info.search
console.log(searchParam)  
  // ?name=sam&age=18

let params = new URLSearchParams(searchParam);
console.log(params)       
  // URLSearchParams { 'name' => 'sam', 'age' => '18' }

console.log(params.get("name"))
console.log(params.get("age"))
```

<br><br>

# util模块
node中提供给我们了一个promise的API我们可以在引入 util 包后 调用它的方法

```js 
const util = require('util')
```

<br>

### <font color="#C2185B">util.promisify(异步方法(错误优先的方法))</font>
它最后会返回一个promise对象 我们需要定义一个变量去接收这个对象

**参数:**  
一个异步的方法

```js 
// 这个变量之后可以调用, 括号里面写上异步方法需要的参数
// util.promisify(fs.readFile);

let a = util.promisify(fs.readFile);

// 异步方法的参数 通过 a() 传递
a(fs.readFile所需要的参数)
```

```js 
util.promisify(fs.readFile);

/*
  fs.readFile 就是一个异步方法
  它需要的参数是, 文件的路径 和 数据相关的回调

    既然 util.promisify(fs.readFile); 方法会返回一个promise对象, 那么我们就定义一个变量去接收这个promise对象
*/
let readFilePromise = util.promisify(fs.readFile) 

// 我们可以在这个变量后面加上小括号, 它相当于一个函数, 然后我们把 fs.readFile 方法需要的 参数 传递进去 我们传递了 文件路径
let p1 = readFilePromise(filePath1);

p1.then((data) => {
  str += data;
  return p2;
})
```

<br>

### 阶段总结:

1. nodejs是一个遵从错误优先的理由, **所有的回调中的参数第一个都是err**

<br>

2. await async 函数的问题

```js 
async function fn() {
    let data = await 123;
    console.log(data);
    return data
}

let ret = fn();
console.log(ret)        // 结果是 Promise { <pending> } 
```

这里并不是我们想的123 而是 ``Promise { <pending> }``  原因是 async 是一个异步的 console.log是同步的, 当我们console.log(ret)的时候 还没有拿到结果 所以它的状态是一个 pending

如果 await 后面是一个 Promise对象, 会把resolve的值返回 async函数里面的await是异步的, 不是同步

<br>

3. await 的另一个特点  
它是异步任务, 如果遇到同步任务的时候, 在它后面的同步任务会在函数外的同步任务执行完后在执行, 或者说 它会先跳出函数执行函数外的同步任务, 然后再回到函数里面执行函数里面的同步任务 最后执行异步任务
```js 
function fn() {
    console.log(3)
    setTimeout(() => {
        console.log(5)
    }, 1000)
    console.log(4);
}

console.log(1)
fn()
console.log(2)

// 上面代码的执行顺序是 1 3 4 2 5

--- 

// 但是如果遇到了 await
async function fn() {
    console.log(3)
    let data = await 123;   // 跳到外面先执行2
    console.log(4);
}

console.log(1)
fn()
console.log(2)

/*
上面代码的执行顺序是 1 3 2 4 -- 并不是 1 3 4 2

遇到await后会先跳出函数, 执行console.log(2)然后再回到函数内部执行 log(4)
*/
```

<br><br>

# 爬虫
爬虫要点 首先我们爬取的内容必须是别人公开公布的数据 比如我们不能跳过登录去爬内容 不能拿别人的数据去做自己盈利的业务 我们做爬虫大部分都是get请求

**爬虫:**  
写一小段程序伪装成正常的浏览器, 去服务器上爬取数据 就收集下载别的网站的数据 其实就是在 User-Agent 中写一个正常的浏览器的内核

<br>

## nodejs中发送 http请求的模块
```js
let http = require("http")
```

<br>

### <font color="#C2185B">http.get(url, (res) => {})</font>
1. 先引入http模块 然后调用其get方法
2. 监听res的data事件 该事件在数据回来后触发
```js 
let http = require("http")

http.get("http://www.baidu.com", (res) => {
  // 设置响应体的编码格式
  res.setEncoding("utf8")

  // 监听res的data事件 当有数据回来的时候会触发该事件
  res.on("data", (res) => {
    console.log(res)
  })
})

// 我们请求到的数据 赋值到html文件里面就是跟原网页一样的东西
```

<br><br>

## 爬虫的业务逻辑
1. 访问服务器  
向百度发起请求 得到页面

2. 下载页面  
上面我们的body就是页面信息

3. 分析页面  
我们请求回来的数据 很多数据都是不需要的 我们要拿到我们想要的数据

4. 提取信息  
把上面分析完的关键信息提取出来

5. 保存数据  
保存到本地

<br>

**电影天堂举例:**
https://www.dydytt.net/index2.htm

<br>

### 分析: 
首先我们要知道电影的信息 这就是我们最终想要抓取的数据
  1. 电影名字
  2. 电影详情
  3. 图片
  4. 下载链接

比如 我们京东 我们要想抓取的数据可能是商品的数据 商品名称 商品图片 商品详情 商品价格

我们看看电影天堂链接 比如我们选择的是 日韩电影 

```
第一页的时候 list_6_1
https://www.dydytt.net/html/gndy/rihan/list_6_1.html
https://www.dydytt.net/html/gndy/rihan/list_6_2.html

每一页的电影项链接
https://www.dydytt.net/html/gndy/jddy/20211207/62095.html
https://www.dydytt.net/html/gndy/jddy/20211207/62094.html
```

我们通过url大致能分析出来哪些是电影的id

<br><br>

## 编码格式 乱码
上面有的时候会发现 我们请求回来的数据 有中文乱码的情况 这是因为以前编码的时候大部分都是使用gb2312格式的编码

<br>

### 解决方案: iconv-lite
上面我们都是在对应的位置上设置头部信息 这里我们介绍一个框架专门解决这样的问题

<br>

### 安装
```
npm i iconv-lite --save
```

<br>

### 引入
```js
let iconv = require("iconv-lite")
```

<br>

### 使用
```js 
// 引入
let iconv = require("iconv-lite")
let request = require("request")
let url = "https://www.dydytt.net/html/gndy/rihan/index.html"
request(url, {
  // 关闭request自己的编码格式
  encoding: null
} ,(err, res, body) => {

  // 我们调用iconv.decode将body传入 然后传入gb2312原编码格式
  const bufs = iconv.decode(body, 'gb2312')

  // 调用返回结果的toString方法指定我们想要的编码格式
  const html = bufs.toString("utf8")
  console.log(html)
})
```

<br>

### 将上面的请求方法封装为proimse方法
```js 
const req = (url) => {
  return new Promise((resolve, reject) => {
    request(url, {
      encoding: null
    } ,(err, res, body) => {
      if(res.statusCode === 200) {
        const bufs = iconv.decode(body, 'gb2312')
        const html = bufs.toString("utf8")
        resolve(html)
      } else {
        reject(err)
      }
    })
  })
}
req(url)
```

<br>

## cheerio模块 -- server版的jQ
模仿jq的设计 运行在server端(jq在客户端) 这个模块可以解析html文档  
那是不是说 我们爬取的网页内容 在查找替换修改上的时候 就可以借助这个模块 相当于我们在后台操作dom(请求回来的数据)

### 安装
```
npm i cheerio --save
```

<br>

### <font color="#C2185B">cheerio.load(html页面)</font>
可以是请求回来的数据 也可以是我们定义的html标签 创建变量接收 $
```js 
const cheerio = require("cheerio")
// 比如我们后面的部分就是 html
const $ = cheerio.load("<h2 class='title'>hello</h2>")

// 修改上面html的内容 和 添加classname
$("h2.title").text("hello there")
$("h2").addClass("wel")

console.log($.html())

<html>
<head></head>
<body><h2 class="title wel">hello there</h2></body>
</html>
```

<br>

现阶段我们已经把页面请求回来了 保存在 html 变量里面  
我们接下来要分析一下页面信息 提取有用的部分 我们上面分析了电影的类型 以及 类别下一个电影的页面是什么样的

```
日韩
https://www.dydytt.net/html/gndy/rihan/index.html
https://www.dydytt.net/html/gndy/rihan/list_6_2.html

咒术尸战
https://www.dydytt.net/html/gndy/jddy/20211207/62095.html
```

<br>

我们打开分类页面后 每一个title就是一个链接 我们需要知道的是 所有title的值
```js
// 我们请求的是host+uri页面
const host = "https://www.dydytt.net"
const uri = "/html/gndy/rihan/list_6_2.html"
```
  
**title:**  
[最新电影] 2021年剧情动作 <太太请小心轻放电影版>

这个title对应的结构：
```html
<!-- 我们可以看看 co_content8 是不是只有一个 如果是的话 我们就可以从里面找我们想要的资源了 -->
div co_content8
  ul
    table   每一个表就是一个电影的信息
      每一个table的第2个tr里面就是title的信息
```

<br>

### 阶段1
我们分析完html结构后 就可以使用 cheerio 来查找我们想要的元素了
```js 
const host = "https://www.dydytt.net"
const uri = "/html/gndy/rihan/list_6_2.html"

req(host + uri).then(res => {

  // 使用 cheerio 加载html页面
  const $ = cheerio.load(res)

  // $就可以操作html文档了
  $(".co_content8 ul table tbody tr:nth-child(2) td:nth-child(2) b a:nth-child(2)").each((i, item) => {

    // 我们找到的是一个dom
    let link = $(item).attr("href")

    console.log(link) 
        // /html/gndy/jddy/20210621/61553.html 所有的url
  })
})

// 我们再发下一次请求的时候 我们直接 host + link 就可以了吧
```

<br>

### 阶段2
我们上面获取了 title 也就是每一个电影标题对应的uri的部分  
然后我们根据host + uri的部分 能够请求每一个电影的详情页

<br>

### <font color="#C2185B">$().each((i, el) => { })</font>
每一个 $(el) 是jq对象 所以我们可以 $(el).text()

```js 
const cheerio = require("cheerio")
let iconv = require("iconv-lite")
let request = require("request")
// let url = "https://www.dydytt.net/html/gndy/rihan/index.html"

// request(url, {
//   encoding: null
// } ,(err, res, body) => {

//   const bufs = iconv.decode(body, 'gb2312')
//   const html = bufs.toString("utf8")
//   console.log(html)
// })

// 将上面的请求封装成promise方法
const req = (url) => {
return new Promise((resolve, reject) => {
  request(url, {
    encoding: null
  } ,(err, res, body) => {
    if(res.statusCode === 200) {
      const bufs = iconv.decode(body, 'gb2312')
      const html = bufs.toString("utf8")
      resolve(html)
    } else {
      reject(err)
    }
  })
})

}
const host = "https://www.dydytt.net"
const uri = "/html/gndy/rihan/list_6_2.html"
req(host + uri).then(res => {

// 使用 cheerio 加载html页面
const $ = cheerio.load(res)

// $就可以操作html文档了
$(".co_content8 ul table tbody tr:nth-child(2) td:nth-child(2) b a:nth-child(2)").each((i, item) => {
  // 我们找到的是一个dom
  let link = $(item).attr("href")
  // console.log(link) // /html/gndy/jddy/20210621/61553.html 所有的url

  // 我们拿到每一个 电影标题的 uri部分后 再次根据uri部分发送请求 我们需要得到电影的详情页面
  getMovieDetail(link)
})
})

// 再封装了await方法 根据uri部分 发送请求 获取电影详情的页面
const getMovieDetail = async (url) => {
const html = await req(host + url)
console.log(html) // 我们能够拿到每一个电影详情页的内容
}
```

<br>

### 阶段3
我们获取了电影详情的页面后 又要对页面开始分析  
比如 我们进入这个页面 我们看看 这个页面中 哪些是我们想要提取的部分  
比如我们需要获取 电影名 下载链接 海报
```js 
https://www.dydytt.net/html/gndy/jddy/20211207/62095.html
```

<br>

### 技巧
控制台 - 选择节点 - 右键 - copy - selector 就能得到选择这个元素的选择器

```js 
// 再封装了await方法 根据uri部分 发送请求 获取电影详情的页面
const getMovieDetail = async (url) => {
const html = await req(host + url)
// console.log(html) // 我们能够拿到每一个电影详情页的内容

// 这里也是一样 我们要使用 cheerio 加载html 要操作html
const $ = cheerio.load(html)
const movie = {
  // 电影名:
  name: $("#header > div > div.bd2 > div.bd3 > div.bd3l > div.co_area2 > div.title_all > h1 > font").text(),
  // 电影详情:
  img: $("#Zoom > span > img").attr("src"),
  // 下载链接
  link: $("")
}
console.log(movie)
}
```

进入到页面其实就是get请求 以上就完成了简单的数据爬取

<br>

### 难的爬虫
需要模拟用户登录操作 拿到用户的数据  
比如淘宝的后台商家数据 淘宝肯定要做用户的登录检验 比如我们要了解淘宝做的是什么样的登录
```js 
比如百度的登录 比如cookie 还有的是本地存储 我们要拿到这些 才能
```

<br><br>

### 爬取表情包 并进行下载
我们爬到图片地址之后 就可以下载图片了

```js 
// 扩展正则
let title = 小红猪表情2019-11-24

// 只获取文字部分
let reg = /(.*)\d/igs
title = reg.exec(title)[1]      // 因为上面分组了 就一个组
```

<br>

再获取所有的图片链接后 我们将图片下载到本地
1. 创建 img 文件夹
2. 调用fs.mkdir方法 在img文件夹下 按照分类创建文件夹
```js 
fs.mkdir("./img/" + title, (err) => {})
```    

3. 因为图片都是请求回来的 所以我们拿着图片的链接地址发送请求 将请求回来的内容 写入一个新文件里
```js 
  // 创建一个写入流 第一个参数为往哪写 关于文件名有很多种方式提取 比如我们可以new URL解析图片的下载地址 提取文件名
  let ws = fs.createWriteStream("./img/文件夹名/文件名.扩展名")

  // 设置 req res 都是流对象
  axios.get(imgUrl, {responseType: "stream"}).then((res) => {
    res.data.pipe(ws)
  })
```

### 要点:
如果要求是流式写入 一样要设置 {responseType: "stream"}

<br><br>

## 反爬策略
大部分情况 我们发起请求都会返回给我们一个html文档 但是也有的时候 我们的数据不是事先在html文档中  
比如前端在某种条件下 才会发起ajax请求获取数据 这时候我们就不能再用cheerio库 而是要使用正则还获取

<br>

### 反爬机制
每秒请求100次以上 那就说明你请求的速度太快了 不正常 会给你发个验证码之类的 让你操作下  
它要是知道你是爬虫了 会封你的ip地址 也就是说从这个ip地址发的请求都会被拒绝  
这时候我们可以使用代理 我们发送并不是发给对方的服务器 而是发给代理 让代理转发给服务器

<br>

### axios中追加代理
```s
http://www.axios-js.com/zh-cn/docs/#%E5%93%8D%E5%BA%94%E7%BB%93%E6%9E%84
```

<br>

在请求配置中追加代理配置
```js 
// 'proxy' 定义代理服务器的主机名称和端口
// `auth` 表示 HTTP 基础验证应当用于连接代理, 并提供凭据
// 这将会设置一个 `Proxy-Authorization` 头, 覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头 
proxy: {
  // 代理的地址
  host: '127.0.0.1',
  port: 9000,

  // 如果有权限验证的话 输入的账号密码
  auth: {
    username: 'mikeymike',
    password: 'rapunz3l'
  }
},
```

代理需要花钱买 也有免费的 一般我们都是整一个免费的代理池 就是将所有的代理放在一起 我们挨个去ping这些代理 看他们有没有响应 看看哪个是好用的 挑出能用的存起来 这就是一个刷选网上代理的过程

<br>

### axios 简单的代理
```js 
const axios = require("axios")
let httpUrl = "https://www.doutula.com/article/detail/9002522"
let options = {
proxy: {
  // 免费的代理是没有权限验证的
  host: '171.13.202.99',
  port: 9999,
},
}

axios.get(httpUrl, options).then((data) => {
console.log(data.data);
})
```

<br>

### 反爬虫策略
1. 我们爬取的文件 爬下来的时候都不是正常的文字 可能都是字体图标   
既然可能是字体图标 那就说明对应的有字体文件 我们把字体文件下载下来 进行解析 看下这个编码对应的是什么文字 解析 然后 转换

2. 如果我们查看源代码的时候数据都在html结构里面 我们爬取数据非常的好爬(后端渲染 后端组织好的html给你) 但是如果spa页面(前端渲染)里面是没有数据的 这时候我们就要在network里面分析请求的内容 比如我们在network页面 看请求数据的时候 打开index.html虽然这里面什么也没有 但是有js

```
讲了好多哦
https://www.bilibili.com/video/BV1i7411G7kW?p=11&spm_id_from=pageDriver
```

<br><br>

# 无头浏览器: Puppeteer
无头浏览器(以前用的是selenium webdrive)  
chrome自带的headless无界面模式很方面做自动化测试或爬虫 但是如何和headless模式的chrome交互则是一个问题

puppeteer是谷歌官方出品的一个通过devtools协议控制的headless chrome的node库 可以通过puppeteer的提供的api直接控制chrome模拟大部分用户来进行ui test或者作为爬虫访问页面来收集数据

通过写代码控制浏览器的打开 输入 百度 模拟用户来进行操作 还可以控制打开控制台 获取dom对象 和 console输出 通过代码来控制整个浏览器

<br><br>

# http相关知识点：

## 域名 与 域名服务器
网站 www.baidu.com

- www:      主机名  ftp svn stmp xmpp服务
- baidu:    机构名
- com:      机构类型
- cn:       国家名 tw hk us uk jp

<br>

### 域名服务器
存放域名与ip对应的服务器

http协议规定着请求报文 和 响应报文怎么书写 发送请求报文就相当于写了一封信

<br><br>

## HTTP协议简介
HTTP协议就是超文本传输协议, 通俗理解是浏览器和web服务器传输数据格式的协议 HTTP协议是一个应用层的协议

HTTP协议是基于TCP协议(一种可靠的传输协议, 就是在传输前双方要进行链接确保互相说话都能听到, 比喻)的, 发送数据之前需要建立好链接

HTTP是万维网的数据通信的基础, 设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法

<br>

### 请求报文的格式介绍

下面请求百度的请求报文
```js 
  // 请求行       
  GET / HTTP/1.1 
      // ( GET)请求方式    (/)请求路径    (HTTP/1.1)HTTP版本

  // 请求头
  Host: www.baidu.com
  Connection: keep-alive
  Cache-Control: max-age=0
  sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"
  sec-ch-ua-mobile: ?0
  Upgrade-Insecure-Requests: 1
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
  Sec-Fetch-Site: none
  Sec-Fetch-Mode: navigate
  Sec-Fetch-User: ?1
  Sec-Fetch-Dest: document
  Accept-Encoding: gzip, deflate, br
  Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
  Cookie: PSTM=1619530850; BIDUPSID=DC2769FD4EF8482446096626D46A75EF; BD_UPN=12314753; __yjs_duid=1_decb391e98f711866592475a7060e97a1621673167256; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID=772543F0AD7508CFEAD2586A6FCE5578:FG=1; H_PS_PSSID=33800_33969_31253_34004_33855_33607_26350_33892; BAIDUID_BFESS=772543F0AD7508CFEAD2586A6FCE5578:FG=1; delPer=0; BD_CK_SAM=1; PSINO=7; BD_HOME=1

  // 空行

  // ↑ 有一个空行 也就请求报文的一部分, 分别是 请求行 + 请求头 + 空行 + 请求体 空行的作用是用来分割请求体的 POST请求才有请求体
```

<br>

### GET 和 POST 请求报文的组成
GET 请求报文      浏览器仅仅是获取网页数据
- 请求行
- 请求头
- 空行

<br>

POST 请求报文     客户端向服务器提交数据
- 请求行
- 请求头
- 空行
- 请求体

<br>

### 请求行:
请求方法, 资源路径 http版本
```js 
  GET /index.html HTTP/1.1 
```

<br>

### 请求头:
头名: 头值
```js 
  Host: localhost 
```

<br>

请求头中的数据解析 **请求报文是给服务器程序看的**
```js 
  // 主机域名 www. / host: 127.0.0.1:8080 
  Host: www.baidu.com

  // 链接方式: 长链接(链接之后不需要断开 正常是数据传输完就会断开, 长链接会保证不至于传一次数据断一次)
  Connection: keep-alive

  Cache-Control: max-age=0
  sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"
  sec-ch-ua-mobile: ?0

  // 支持升级为https 更安全协议
  Upgrade-Insecure-Requests: 1

  // 用户代理 浏览器相关的信息 客户机相关的信息 (自爆家门告诉服务器端我客户端的信息 相当于自我介绍 说我很安全 把数据给我)
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36

  // 浏览器可以接收的数据类型 (防止服务器给我的数据 自己不支持)
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9

  Sec-Fetch-Site: none
  Sec-Fetch-Mode: navigate
  Sec-Fetch-User: ?1
  Sec-Fetch-Dest: document

  // 浏览器可以接受的编码方式
  Accept-Encoding: gzip, deflate, br

  // 浏览器接受的语言类型
  Accept-Language: zh-CN,zh;q=0.9,en;q=0.8

  Cookie: PSTM=1619530850; BIDUPSID=DC2769FD4EF8482446096626D46A75EF; BD_UPN=12314753; __yjs_duid=1_decb391e98f711866592475a7060e97a1621673167256; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID=772543F0AD7508CFEAD2586A6FCE5578:FG=1; H_PS_PSSID=33800_33969_31253_34004_33855_33607_26350_33892; BAIDUID_BFESS=772543F0AD7508CFEAD2586A6FCE5578:FG=1; delPer=0; BD_CK_SAM=1; PSINO=7; BD_HOME=1
```

<br>

### 空行
\r\n

<br>

### 请求体
浏览器给服务器发送的数据(POST提交的数据就放在请求体中)

注意: 记住以上的格式即可, 不需要背诵请求头中的属性

<br>

### 题外知识点:
客户端的端口号是操作系统随机配的
每次去百度服务器请求资源时, 我们自己的端口的端口号是操作系统随机以万为单位配的

<br><br>

### POST请求的演示
当使用submit form默认提交的 数据类型(内容类型) 就是 Content-Type: application/x-www-form-urlencoded 

```js 
  POST /v2/api/?login HTTP/1.1
  Host: passport.baidu.com
  Connection: keep-alive
  Content-Length: 4024
  Cache-Control: max-age=0
  sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"
  sec-ch-ua-mobile: ?0
  Upgrade-Insecure-Requests: 1
  Origin: https://www.baidu.com

  // 记记这个
  Content-Type: application/x-www-form-urlencoded

  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
  Sec-Fetch-Site: same-site
  Sec-Fetch-Mode: navigate
  Sec-Fetch-User: ?1
  Sec-Fetch-Dest: iframe
  Referer: https://www.baidu.com/
  Accept-Encoding: gzip, deflate, br
  Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
  Cookie: PSTM=1619530850; BIDUPSID=DC2769FD4EF8482446096626D46A75EF; __yjs_duid=1_decb391e98f711866592475a7060e97a1621673167256; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID=772543F0AD7508CFEAD2586A6FCE5578:FG=1; H_PS_PSSID=33800_33969_31253_34004_33855_33607_26350_33892; BAIDUID_BFESS=772543F0AD7508CFEAD2586A6FCE5578:FG=1; delPer=0; PSINO=7; BA_HECTOR=0l818h8l0g0521ahs91gaq2su0q; HOSUPPORT=1; HOSUPPORT_BFESS=1; pplogid=6713RmuKtqvmP1OgIHB0SyXOpFjzAWYZSAqI1WgYA2u6rhcgEHw%2F65lz5qtPc97YMxntSV9H8WKE1e7PaXywpWhRxCCu8jrLm%2BNspksJD12ohSc%3D; pplogid_BFESS=6713RmuKtqvmP1OgIHB0SyXOpFjzAWYZSAqI1WgYA2u6rhcgEHw%2F65lz5qtPc97YMxntSV9H8WKE1e7PaXywpWhRxCCu8jrLm%2BNspksJD12ohSc%3D; UBI=fi_PncwhpxZ%7ETaJc3kXYNDmVb53VMwWkSl6r8%7EQTdCBSbQxiZIXZ%7EycRlaCrLNTY%7EcAneMKFehsPjZMxU%7En; UBI_BFESS=fi_PncwhpxZ%7ETaJc3kXYNDmVb53VMwWkSl6r8%7EQTdCBSbQxiZIXZ%7EycRlaCrLNTY%7EcAneMKFehsPjZMxU%7En; logTraceID=ad4d6a249d97812205ed8149611c51843513ec53daf80cbc1a

  // usersname=zhangsan&password=12345
```

<br><br>

### http协议响应报文格式

请求百度后的响应报文 我们简单的解释下下面的内容
```js 
  // 响应行
  HTTP/1.1 200 OK
  Bdpagetype: 1
  Bdqid: 0xb8fd8c7700021ad2

  // 缓存的控制命令
  Cache-Control: private
  Connection: keep-alive

  // 响应的内容是压缩的
  Content-Encoding: gzip

  // 响应体的类型 网页编码 utf-8  (响应体如果是中文就要这么写)
  Content-Type: text/html;charset=utf-8

  // 日期 服务器回复响应报文的时间
  Date: Tue, 25 May 2021 15:19:08 GMT
  Expires: Tue, 25 May 2021 15:18:51 GMT

  // 服务器名称
  Server: BWS/1.1
  Set-Cookie: BDSVRTM=0; path=/
  Set-Cookie: BD_HOME=1; path=/
  Set-Cookie: H_PS_PSSID=33800_33969_31253_34004_33855_33607_26350_33892; path=/; domain=.baidu.com
  Strict-Transport-Security: max-age=172800
  Traceid: 1621955948066397620213329964914815670994
  X-Ua-Compatible: IE=Edge,chrome=1
  Transfer-Encoding: chunked

  空行

  响应体(网页内容)
```

<br>

响应行(版本 状态码 说明\r\n)
```js 
  // 必须有 
  HTTP/1.1 200 ok\r\n      
  
  // 如果是404的话 后面的说明是 404 NOT FOUND
```

<br>

**状态码:**  
- 2xx     是成功的
- 3xx     是重定向(本来请求的是一个网址, 但是服务器给我安排了另外一个)
- 4xx     客服端的错误
- 5xx     服务器的错误

<br>

响应头(头名: 头值)
```js 
Content-Type: text/html;charset=utf-8\r\n       
// Server.BWS/1.1\r\n
```

<br><br>

## TCP/IP模型 三次握手
http协议(底层是TCP协议 数据传输协议)是基于TCP/IP协议的 TCP/IP协议是一个可靠的协议(里面更加严格规范了传输规则) 浏览器(客户端) 和 服务器建立连接的时候, 发生三次握手

浏览器 向 服务器发送请求, 服务器 返回响应 这个数据的传输过程其实不是这么简单 整个过程是基于http协议的, http协议底层是基于TCP协议的

所以为了确保这次的传输数据的过程是可靠的, 只有当双方(浏览器和服务器)都是可以正常的发送和接收的状态, 才会开始发送请求 在发送传输之前, 它需要做一些事件

TCP协议规定, 在传输数据之前双方需要建立连接(为了保证双方都能正常的进行数据的发送和接收) , 在建立连接的过程中发生了3次握手

<br>

### 三次握手
什么是三次握手 那怎么保证双方 你发送 我接收呢?

为了确保或者严重双方能接能收 浏览器会先向服务器发送 一个随机数 X 服务器知道浏览器可以正常发送 然后会返回一个X+1, 同时再发送一个Y 浏览器就会知道服务器可以正常发送 服务器可以接 和 发 为了让服务器知道浏览器能不能接 返回Y+1 这就是三次握手
```js 
  +-----+                             +-----+  
                  第一次
                  --- X --- >    


                  第二次
                < --- X+1, Y --- 
  浏览器                              服务器
            
                  第三次
                --- Y+1 --- >

            
            
                                
  +-----+                            +-----+
```

<br>

### 四次挥手

前面讲了建立连接, 为了保证正常连接 有了三次握手之后 然后就可以开始传输数据 既然有建立连接, 就会有关闭连接, 不管什么原因总会有一方先要提出我要关闭连接了

断开也会由一方开始发送消息 确保告知对方我要断开了

<br>

### 关闭连接的时候, 4次挥手
4次挥手发生在关闭连接的时候

```js 
  浏览器端 会发送 =>
      请求断开连接(分手)

                                      <== 服务器端会回复
                                      嗯(表示收到你要断开连接的请求)

                                      <== 服务器端会发送
                                          分吧(同意断开)

  浏览器端 会发送 =>
      确认断开连接(好)

  --------------------

  有点像分手

  女方说 分手
  
  男方说 嗯
  男方说 分吧

  女方说 好
```

<br>

那为什么是四次呢, 这个场景跟上面一样三次不就可以么?
当浏览器端发送请求, 服务器端正在处理请求的时候 是不同意断开的(或者在有数据还在传输的时候也是不允许断开的)


### 总结
三次握手发生在建立连接的时候 四次挥手发生在关闭连接的时候  
他们分别发生在传输数据之前和之后

<br><br>

## OSI七层网络模型
七层模型也叫作OSI参考模型是国际标准化组织(ISO)制定的一个用于计算机或通信系统间互联的标准体系, 一般称为OSI参考模型或七层模型
说白了就是两台计算机之间进行通信的时候(比如数据传输), 经历了哪些工作

```
  OSI七层网络模型     TCP/IP四层概念模型      对应网络协议

-------------       ---------------       -------------

应用层                                      http tftp ftp nfs wais

表示层               应用层                  gopher snmp riogin telnet

会话层                                      smtp dns

-------------       ---------------       -------------

传输层               传输层                  tcp udp

-------------       ---------------       -------------

网络层               网络层                  ip icmp arp rarp akp uucp

-------------       ---------------       -------------

数据链路层            数据链路层              fddi ethemet arpanet pdn

物理层                                      ieee 802 1a

-------------       ---------------       -------------
```

<br><br>

## IP地址 & 端口
老师想发送的你好给张三, 为什么只会发给张三不会发送给李四和王五, 因为IP地址的原因, IP地址就好像我们以前寄信, 信上的地址似的

```js 
老师的电脑          ↗     张三 
要发送你好
+-------+
+       +           →     李四
+-------+       

                    ↘     王五
```

<br>

### 小黑屏指令
ipconfig / (mac)iconfig     查询ip地址

<br>

### IP地址
IP地址具有唯一性, 用来标识网络上不同的设备(只要能上网, 设备就会有一个独立的ip地址)

<br>

### 端口
用来区别同一台设备上不同的网络进程 同样具有唯一性, 这个唯一性是基于同一台设备的

端口号就好像一个门, 比如一个大楼(我们的电脑), 里面有微信, QQ, 飞秋等, 为什么老师用微信发送你好, 接收的时候只会用微信接收到, 就是因为端口号的不同

电脑上只要启动了程序, 就会给这个程序(给网络进程)分配一个端口号 如果说ip就像某一栋楼的地址的话, 端口号就相当于门牌号(网络进程: 可联网的, 运行起来的程序)

一旦我们的软件运行起来是一个网络进程的话就会给分配一个端口号(不会分配知名端口) 我们也可以自己设定端口 比如从 1025 - 65535 当然也不是能全部设定上的, 比如这个范围内的端口被占用了也不行

- 0 - 65535  
- 0 - 1024 知名端口, 不要用
- mysql     3306  
- mongodb   27017 

<br>

### http请求大致过程
服务器其实就是一台配置相当高的电脑一台硬件设备 一般就是一台主机没有显示器, 所以也叫作远程主机
```js 
- 1. 用户输入网址
            ↓
- 2. 浏览器请求DNS服务器获取域名对应的IP地址
            ↓
- 3. DNS服务器把解析到的IP地址返回浏览器
            ↓
- 4. 浏览器链接该IP地址服务器
            ↓
- 5. 遵循http协议发送资源请求
            ↓
- 6. web服务器接收到请求, 并解析请求, 判断用户意图
            ↓
- 7. 链接数据库从数据库中获取用户想要的资源
            ↓
- 8. 数据库将资源返回给http服务器程序
            ↓
- 9. http服务器程序将资源通过网络发送给浏览器(响应浏览器)
            ↓
- 10. 浏览器解析呈现请求的数据
```

<br>

### 扩展: 
会看到 来自 14.215.177.39 这个是就当前时间段百度的服务器地址 我们可以通过 ping 网址 看看能不能连上网
```
ping www.baidu.com
```

<br>

现在客户端在地址栏输入 www.baidu.com 回车之后发生了什么事情, 他为什么能找到这个网站所对应的服务器呢? 因为服务器有一个ip地址

访问一台服务器, 我们既可以用域名访问, 也可以通过ip地址访问 当我们输入 域名 访问某服务器的时候 其实实际上域名会被解析成 ip地址 所以就会有一台服务器 帮助我们把域名 解析成 ip地址

```
            DNS服务器
        ↗               ↘
客户端                      服务器
```

简单的说就是我们客服端输入网址 会通过DNS服务器解析成ip地址, 再通过IP地址找到服务器 这种方式其实就是发送请求, 请求的目的就是获取资源 之后服务器会给浏览器响应请求, 其实就是发送文件到浏览器

<br>

### 那服务器为什么知道我们要什么文件呢?
服务器里也有一款服务器程序, web服务端(webserver, 再通俗点就是后端, 再再通俗点讲就是后端代码, 再再再通俗点就是后端程序员写的代码) 这个程序的作用就是 解析 请求报文(http协议规定了报文应该怎么写)

服务器程序就是解析请求报文, 分析请求意图(要什么文件, 什么数据), 整理好后响应会客户端 做出响应其实也就是发送对应的文件到浏览器 这个程序其实是用java php python等写的, 现在nodejs也可以写, nodejs的http模块可以做这件事情

<br><br>

## get请求 和 post请求 的参数分析

### get
浏览器用GET请求来获取一个html页面/图片/css/js等资源 GET参数通过URL传递

一般我们输入 www.baidu.com 就给get请求 get请求也可以传递参数 
```
www.baidu.com?name=sam&age=18
```

<br>

### post
POST来提交一个``<form>``表单, 并得到一个结果的网页 POST参数放在Request body中  
一般登录都是post请求, 因为会带一些数据(用户信息等) 后端要拿到这些数据

<br><br>

## http模块的使用
1. 引入 http模块
2. 配置服务器程序的端口号 服务器上有很多的程序, 我们要给我们的程序配置端口号
3. 创建服务器对象
4. 使用服务器的监听方法, 让服务器监听浏览器的请求
5. 遵从http协议  
不管我们返回的响应 还是发送请求 我们都要遵从http协议 当返回响应的时候如果出现乱码, 则需要设置响应头

<br>

**代码示例:**
```js 
// 引入 http 模块
const http = require("http")

// 创建 服务器对象
http.createServer((req, res) => {

  // 设置响应头
  res.writeHead(200, {
    "Content-Type": "text/html"
  })

  // 书写内容 最后 end() 结束响应
  res.write("<h1>NodeJS</h1>")
  res.end("<p>hello world</p>")

}).listen(3000)

console.log("http server is listening at port 3000")
```

<br>

### <font color="#C2185B">http.createServer(回调)</font>
用来创建服务器对象, 每收到一次请求, 就会执行一次回调中的代码

**参数:**
(req, res) => { }

<br>

### <font color="#C2185B">res.write()</font>
这个方法可以向浏览器书写一些**响应体内容**

<br>

### <font color="#C2185B">res.end([data[, encoding]][, callback])</font>
用来给浏览器发送响应  
使用end()方法代表响应工作已经结果, 所以这个方法后面不要再去写关于响应的操作了
```js    
response.end('1');      这个方法后面不要写关于响应的操作
response.end('2');      这个不会执行 会报错
```

<br>

### res.write() 和 res.end() 区别
- 相同点: 都可以传入参数表示往浏览器写一些内容
- 不同点: write可以连续操作, end表示响应结束一般放最后

```js
res.write("<h1>NodeJS</h1>")
res.write("<h1>NodeJS</h1>")
res.write("<h1>NodeJS</h1>")
res.end("<p>hello world</p>")
```

<br>

### <font color="#C2185B">res.writeHead(状态码, { "key": "value" })</font>
书写状态码和首部字段
```js 
res.writeHead(200, {
    "Content-Type": "text/html"
})
```

<br>

### <font color="#C2185B">res.setHeader('Content-type', 'text/html;charset=utf-8');</font>
当返回响应为中文的时候如果出现乱码, 则需要设置响应头

可以设置的响应头 大概有如下:
```js
//网页编码
header('Content-Type: text/html; charset=utf-8'); 

//纯文本格式
header('Content-Type: text/plain'); 

//JPG、JPEG
header('Content-Type: image/jpeg'); 

// ZIP文件
header('Content-Type: application/zip'); 

// PDF文件
header('Content-Type: application/pdf'); 

// 音频文件
header('Content-Type: audio/mpeg'); 

//css文件
header('Content-type: text/css'); 

//js文件
header('Content-type: text/javascript'); 

//json
header('Content-type: application/json'); 

//pdf
header('Content-type: application/pdf'); 

//xml
header('Content-type: text/xml'); 

//Flash动画
header('Content-Type: application/x-shockw**e-flash'); 

```

<br><br>

## 使用场景: 
我们可以通过设置响应头 解决跨域的问题

### <font color="#C2185B">response.setHeader()</font>
当浏览器端设置自定义响应头的时候 再添加下面的规则, 意思是所有类型的头信息都可以接收  

当我们进行下面的设定后, 还不够 我们还要把 
```js
// 请求的源 
response.setHeader('Access-Control-Allow-Origin', '*');
// 自定义请求头的处理 *表示 所有类型的头信息我都可以接收
response.setHeader('Access-Control-Allow-Headers', '*');
// 还有请求方法的处理
response.setHeader('Access-Control-Allow-Method', '*')
```

<br>

**<font color="#C2185B">Access-Control-Allow-Origin</font>**  
许特定白名单用户（浏览器）访问我这个接口

<br>

**<font color="#C2185B">Access-Control-Allow-Credentials</font>**  
指示当请求的凭证标记为 true 时, 是否响应该请求 

<br>

**<font color="#C2185B">Access-Control-Allow-Headers</font>**  
用在对预请求的响应中, 指示实际的请求中可以使用哪些 HTTP 头 

<br>

**<font color="#C2185B">Access-Control-Allow-Methods</font>**  
指定对预请求的响应中, 哪些 HTTP 方法允许访问请求的资源 

<br>

**<font color="#C2185B">Access-Control-Expose-Headers</font>**  
指示哪些 HTTP 头的名称能在响应中列出 

<br>

**<font color="#C2185B">Access-Control-Max-Age</font>**  
指示预请求的结果能被缓存多久 

<br>

**<font color="#C2185B">Access-Control-Request-Headers</font>**  
用于发起一个预请求, 告知服务器正式请求会使用那些 HTTP 头 

<br>

**<font color="#C2185B">Access-Control-Request-Method</font>**  
用于发起一个预请求, 告知服务器正式请求会使用哪一种 HTTP 请求方法 

<br>

**<font color="#C2185B">Origin</font>**  
指示获取资源的请求是从什么域发起的 

<br>

### <font color="#C2185B">res.setHeader() 和 res.writeHead()</font>
它们两个都可以设置响应头  
res.writeHead()则可以通过第一个参数设置状态码

```js
res.setHeader("Content-type", "text/plain;charset=utf8")

res.writeHead(200, {"Content-type": "text/plain;charset=utf8"})


// 强制缓存
res.writeHead(200, {
  "Content-Type": "text/javascript",
  "expires": new Date("2020-01-03 11:00:00")
})
```

res.writeHead()必须在res.end()之前调用  
如果两者同时存在(没必要), 要先写res.setHeader(), 后写res.writeHead(), 且res.writeHead()优先

<br>

### <font color="#C2185B">服务器对象.listen(port, callback)</font>
用来监听一个端口

```js 
const http = require('http');
const port = 8000;

// 创建服务器对象
const server = http.createServer((requset, response) => {
  // 这里的代码什么时候执行? 每接收到一次请求就来执行一次这里的代码
  // 我们响应一个字符串
  response.end('我是响应的数据')
})

// 调用服务器对象的监听方法
server.listen(port, (err) => {
  // console.log(err);
  console.log('服务器已启动, 8000')
})
```

<br><br>

# 请求对象 requset
上面简单的学了服务器程序怎么简单的搭建, 同时用了http.createServer()的方法向浏览器端响应了一些数据

这里我们思考下, 为什么我们响应了这些数据, 换句话说响应对应的数据, 是怎么对应的?

是根据请求来的, 也就是说我们要解析请求信息里面的内容然后发送对应的响应数据, *请求相关的东西, 都放在了 requset请求对象 里面*


### <font color="#C2185B">requset.url</font>
获取请求的路径 
获取的是请求报文中的第一行的 第二个位置 (第一个位置是请求方式) 你想请求的资源是什么

```
GET /?name=Sam HTTP/1.1
```

**注意:**  
req.url 不带 baseUrl

<br>

### <font color="#C2185B">requset.method</font>
获取请求方式  
请求报文中第一行的第一个位置

*GET* /?name=Sam HTTP/1.1

<br>

### 获取get方法传递的请求参数
```js 
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
  let reqUrl = request.url;

  // reqUrl是 /xxx 所以我们要加上 base
  let data = new URL(reqUrl, 'http://localhost:8000');

  let name = data.searchParams.get('curPage');
  console.log(name);
});

server.listen(8000, () => {
  console.log('8000端口已监听, 服务器已启动')
})
```

<br>

### 获取post方法发送的请求参数
我们想想想在前端我们是怎么用post提交的, 使用form表单

我们先来看下form表单(重新认知下)
- action:   要填写服务器地址, 请求会提交到这个地址上(提交到服务器上)
- method:   提交的方法

<br>

### 前端代码:
```html
<!-- 将来要提交到哪一个服务器地址上 一旦提交到这个网址, 服务器中的回调就会执行一次 -->
<form action="http://localhost:9000" method='POST'>

  <!-- 这里的name 就是在定义 属性名 -->
  用户名: <input type="text" name='username' /> <br><br>
  密&emsp;码: <input type="password" name='password' /> <br>

  <!-- 点击submit按钮的时候, 浏览器会提交form表单里面的数据到action里的地址去 本质上是一个post请求 这是浏览器的默认行为 -->
  <input type="submit" value="send">
</form>
```

<br>

### <font color="#C2185B">request.on('data', callback)</font>
我们通过事件来获取 浏览器端发送过来的post请求参数   
事件名是'data', 一旦接收到post请求, 就会触发回调里面的代码

**参数:**  
callback
- postData : 浏览器端过来的请求数据 如果不调用 postData.toStirng() 方法的话 我们输出的是一个buf

```js 
request.on('data', (postData) => {
  // postData 就是接收到的请求参数
  console.log(postData.toString());
  // username=hahaha&password=12345 

  // 说明现在已经可以在服务端获取浏览器端提交过来的用户名和密码
})
```

<br><br>

### 服务端解析前端传递的post数据:
我们通过 form 形式将收集到的数据 传递给后台的时候 数据的格式:
```js 
username=hahaha&password=12345 
```

这样后台不方便操作 所以一般我们会整理成 对象的形式 发送到后台

```js 
// 获取用户填写的数据
let username = document.querySelector('#username').value;
let password = document.querySelector('#password').value;

// 将读取到的内容组成后端方便处理的格式
let params = {
  username,
  password
}

// 放在body里面了吧
xhr.send(JSON.stringify(params))
```

<br>

我们也可以整理成 常用的形式 xxx=xxx&yyy=yyy
```js 
let params = `username=${username}&password=${password}`;

// 但是在发送前要设置请求头的信息 传送的参数的类型
xhr.setRequestHeader('enctype', 'application/x-www-form-urlencoded');

xhr.send(params)
```

<br>

后台要对传递过来的数据进行处理 因为 postData 我们收到的是 buf 所以 我们对其转换成字符串 然后进行转换

```js 
let uname = postData.toString().split('&')[0].split('=')[1];
let pwd = postData.toString().split('&')[1].split('=')[1];
```

<br>

### 前端: POST的请求方式发送参数使用
**xhr.send()**
可以发送参数到后端 但是不能直接传递对象, 要转换为字符串
```js
JSON.stringify(params)
```

<br>

HTML部分:
```html
<!-- 因为我们要做 AJAX提交所以 不用里面的属性了 -->
<form action="http://127.0.0.1:8000" method='post' id='form-input'>

<form id='form-input'>
    <div>
        <span>用户名:</span> <input type="text" name='username' id='username'>
    </div>

    <div>
        <span>密&emsp;码:</span> <input type="password" name='password' id='password'>
    </div>


    <!-- submit一点就会提交表单内容(并进行跳转)并刷新页面 属于浏览器的默认行为 我们可以将其改成 type=button -->
    <div>
          <input type="button" value='SEND' class='send'>
    </div>
</form>

<!-- 成功的提示的区域 -->
<div class='success'></div>
```


js部分:
```js 
const btn = document.querySelector('.send');
const div = document.querySelector('.success');

btn.addEventListener('click', function() {

  // 获取用户填写的数据
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;

  // 将读取到的内容组成后端方便处理的格式
  let params = {
    username,
    password
  }

  // ajax的四大步:
  const xhr = new XMLHttpRequest();

  // 设置接口
  xhr.open('POST', '/login_post');

  // 发送整理好的数据到后端 json
  xhr.send(JSON.stringify(params));

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status >= 200 && xhr.status < 300) {

        // 将接收到的响应做响应的处理
        div.innerHTML = xhr.responseText;
      }
    }
  }
})
```

<br>

### 服务器端处理 post请求参数:
服务器端在处理post请求的时候 使用
```js
// postData: 前端post请求发送过来的参数
request.on('data', postData => { ... }) data事件
```

<br>

### 要点:
我们在使用 ajax 发送 post 请求 && 后台使用的是 http 模块接收 post 请求的参数的时候 

我们可以通过 JSON.parse() 方法 将buf转为对象???

我们将前端传递过来的postData转成对象 JSON.parse() 然后通过解构赋值的方式获取对应的变量

<br>

**服务端正常的流程是:**  
后端要查询数据库, 看看有没有该用户名 如果没有 提示该用户未注册 如果有,  我们还要对比密码是否正确
这里我们会进行下模拟

```js 
const http = require('http');
const fs = require('fs');
const path = require('path');

// 我们模拟下数据库中的信息
let uname = 'sam';
let pwd = '123456';

const server = http.createServer((request, response) => {

  let reqUrl = request.url;

  // 设置返回的信息的字符类型
  response.setHeader('Content-type', 'text/html;charset=utf-8');

  if (reqUrl === '/login_post') {

    request.on('data', (postData) => {


      // !!!!!!!
      // 把前端传递过来的json转为对象, 转成对象后才能操作
      let { username, password } = JSON.parse(postData);

      if(username === uname && password === pwd) {
        response.end('登录成功');
      } else {
        response.end('登录失败, 请检查用户和密码是否正确')
      }
    })

  } else {
      response.end('错误信息: 404 找不到该页面, 请检查下完整的路径');
  }
})

server.listen(8000, () => {
  console.log('8000端口已开启')
})
```

<br>

### 扩展: 表单的提交方式
``<button>`` ``<input type='button'>``  
所以很多人用 这种 完全没有提交行为的按钮

``<input type='submit'>``
上面三种完全没有提交行为的是 ``<input type='button'>`` ``<button>`` 在特定的浏览器下是有提交行为的

<br>

**如何阻止表单的默认提交事件?**
表单一点击提交按钮(submit)必然跳转页面, 如果表单的action为空也会跳转到自己的页面, 即效果为刷新当前页 如下, 可以看到一点击提交按钮, 浏览器的刷新按钮闪了一下: 

从input获取的值, 即使是数字 类型也是string类型, 获取我们在跟别的地方的对比的时候需要类型


<br><br>

## 向客户端响应一个页面 (服务器雏形)
前面简单的讲解了一下怎么获取get 和 post的参数, 现在我们看看怎么根据提交的参数给浏览器端响应一个页面

<br>

### 响应 乱码 问题
当向浏览器端响应中文的时候, 可能会出现乱码, 不管是发送请求还是返回响应, 我们都要遵循http协议, 这时我们要设置响应头
```js 
response.setHeader('Content-type', 'text/html;charset=utf-8');
```

<br>

### 思路:
1. 我们要使用 fs 模块的方法 读取要响应的html页面(文件) 这里我们和path模块互相配合使用
```js 
// 如果目标文件有多层的结构 
let filePath = path.join(__dirname, '目录1', 'index2.html');
let filePath = path.join(__dirname, 'index2.html');
let result = fs.readFileSync(filePath)
```

<br>

2. 使用 API 将读取到的文件响应会前端页面

- 使用 res.end() 响应数据
- 使用 res.send() 响应的数据 前台页面效果是自动下载, 在方法里面设置 编码 则可以避免
- 使用 res.sendFile() 响应数据 要求文件path必须是绝对路径
- 使用 fs.createReadStream(res) 响应数据

```js 
response.end(result)

// send
app.get('/register', (req, res) => {

  let filePath = path.join(__dirname, 'views', 'register.html');
  // 读取文件内容
  // 这里不写utf-8 会下载文件 我去~
  let content = fs.readFileSync(filePath, 'utf-8');
  res.send(content)
})
```

以上只是简单的响应了一个页面, 并没有根据用户的请求去响应相应的页面

<br>

### 完整代码:
css样式在<style>里面的情况下 只返回 index.html 即可
```js 
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
  
  // 我的文件在当前文件的下一层 test文件夹里面的index.html
  let filePath = path.join(__dirname, 'test', 'index.html');
  let content = fs.readFileSync(filePath);
  response.end(content);
});

server.listen(9000, () => {
  console.log('9000端口已监听, 服务器已启动')
})
```

<br><br>

## 根据不同的请求返回不同的资源
我们现在 浏览器端发起请求的方式 仅是通过输入对应的网址哈

<br>

### <font color="#C2185B">request.url</font>
reqUrl中包含了一次请求中的所有请求地址

<br>

### 根据请求返回对应的页面
上面的都是返回简单的响应数据 那么我们通过什么才能知道客户想要什么样的资源? -- > url (request.url)

我们在服务器对象的回调中进行 if else if 进行多个条件的判断
```js
reqUrl === '/' || reqUrl === '/index.html'
```

/ 也能进入首页如果只写表达式1 那么只能按照表达式1的写法, 才能进入判断, 所以我们也要加上 /index.html

```js 
const server = http.createServer((request, response) => {
  
  // 我们先获取 url
  let reqUrl = request.url;

  // 这里就相当于配置路由规则
  if(reqUrl === '/' || reqUrl === '/index.html') {
      // 如果用户请求的url是 / 代表想要请求首页的资源, 那么在这里就响应首页的资源

  } else if(reqUrl === '/about') {
      // 如果用户请求的url是 /about 代表想要请求关于页面的资源, 那就返回关于页面
  }
});
```

<br>

### 当请求的资源有 img css html等文件时
我们可以通过 request.url.endsWith('') 我们看看 请求的url资源文件以什么结尾, 我们把对应的文件也返回去
```js 
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {

  let reqUrl = request.url;

  // 如果请求的url是 /about 我们就响应 about页面
  if(reqUrl === '/about.html') {
      let aboutPath = path.join(__dirname, 'test', 'about.html');
      let aboutContent = fs.readFileSync(aboutPath)
      response.end(aboutContent);

  // 如果请求页面中 含带有其他请求资源 我们可以以下面的判断方式返回响应 这里我们以 img 为例
  // reqUrl.endsWith()
  } else if(reqUrl.endsWith('.jpg')) {
      let jpgPath = path.join(__dirname, 'test', 'img', '1.jpg');
      let jpgContent = fs.readFileSync(jpgPath);
      response.end(jpgContent);

  } else if(reqUrl === '/' || reqUrl === '/index.html') {
      let indexPath = path.join(__dirname, 'test', 'index.html');
      let indexContent = fs.readFileSync(indexPath)
      response.end(indexContent);

  // 我们最后可以这样
  } else {
      response.end('404错误: 该资源找不到')
  }
});

server.listen(9000, () => {
  console.log('9000端口已监听, 服务器已启动')
})
```

<br>

### 可以自发请求的标签
可以发起请求的标签, 下面的标签都是浏览器自发的发起请求
- ``<link>``    因为有href
- ``<script>``  因为有src
- ``<img>``     因为有src
- ``<a>``       点击后发起请求
- ``<button>``  必须在表单里, 还有必须是点击后

上述的行为都会往服务器去发起请求

<br>

比如我们的``<a>``标签让它跳转到 about页面
```js 
  <a href='/about'>点击</a>
```

这样就可以, 它会向服务器发送请求, 然后看我们的路由判断 会跳转到对应的页面

我们为什么直接写 /about 不是看我们文件夹里面的路径(前端路径) 而是这里写什么 是后端给我们的 固定的 其实是后端在配置路由, 配好了后, 有一个接口文档会给到前端, 所以前端是根据接口文档做请求的

<br>

### 自发请求的描述:
下面``<img>``发起的请求路径是 /img/1.jpg

比如 我现在在地址栏中输入, http://127.0.0.1:9000/about.html 这个页面中有``<img>`` 当我输入完网址敲回车的时候, 查看了下network, 发现其实是向服务器发送了两个请求

一个是我自己操作的, about页面 一个是about页面中的``<img>``标签的自发请求, 这个请求也会触发我们服务器端, 服务器对象内部回调中的逻辑, 发现没有返回img图片的响应规则 那么就会一直转圈, 因为 ``<img>``在等待服务器的响应 或者 服务器返回end 它就会一直在等

<br><br>

## babel解决nodejs不支持es6模块化规范的问题
nodejs引擎默认情况下不支持es6的模块化规范语法


### 具体步骤
**1. 在项目文件夹下生成 package.json文件**
```js 
npm init -y
```

<br>

**2. 安装第三方工具**

**全局安装**
```js 
npm i babel-cli browserify -g
```

<br>

**局部安装**
```js 
  npm i babel-preset-es2015 --save-dev
```

<br>

**3. 在项目根目录新建 .babelrc 文件 (没有后缀名)**
```js 
{
    "presets":["es2015"]
}
```

<br>

**4. 在项目目录下执行**
babel找的是src文件夹 它会把里面的文件全部编译 没有的文件夹会自动创建
```js 
babel src -d lib
```

**5. 运行编译好的文件**

<br>

### 注意:
如果出现babel不是内部或外部命令 可能是npm全局安装有问题, 我们可以看看babel的bin目录在哪, 然后配置成环境变量

<br><br>

# Express框架
```s
http://www.expressjs.com.cn
```

在前面node基础中我们学习了nodejs中的http模块, 虽然知道使用nodejs中的http模块是可以开发web应用的

- 处理静态资源(img css js文件), 
- 处理动态资源(动态数据 每天不一样的新闻), 
- 请求分发(路由)(解决前面http模块中的if else if的问题)等等

也可以让开发者对http协议的理解更加清晰, 但是使用起来比较复杂, 开发效率低

npm提供了的大量的第三方模块, 其中不乏许多web框架, 我们没有必须重复发明轮子, 因而选择使用 Express作为开发框架, 因为它是目前最稳定, 使用最广泛, 而且nodejs官方推荐的唯一一个web开发框架, 除了http模块提供了更高层的接口外, 还实现了许多功能, 其中包括

- 静态文件服务
- 路由控制
- 模板解析支持
- 动态视图
- 用户会话
- CSRF 保护
- 错误控制器
- 访问日志
- 缓存
- 插件支持

express是一个基于内置核心 http 模块的, 一个第三方的包, 专注于 web服务器的构建 也就是说基于http模块上的开发, 可以做很多的后端项目

<br><br>

## 安装 express

### npm init -y 初始化项目

<br>

### 安装 express 框架
```js
npm install express --save
```

<br><br>

## 简单构建express项目
```js
const express = require("express")
const app = express()

app.get("/", (req, res) => {
  
})

app.listen(3333, () => console.log("http://localhost:3333"))
```

<br><br>

## request对象:
HTTP请求对象 它内部封装了 关于HTTP请求报文中的完整信息  
req对象是对原生http的req进行封装 所以直接http模块中的req身上的所有属性和方法

<br>

## req身上的属性:

### **<font color="#C2185B">req.baseUrl</font>**  
当我们使用路由器的时候, 它将是路由器的前缀

```js
const router = express.Router()
app.use("/api", router)

router.get("/", (req, res) => {
  console.log("1", req.baseUrl)   // /api
  res.json({msg: "ok"})
})
```

<br>

### **<font color="#C2185B">req.body</font>**  
获取 前台传入的post请求参数 

**注意:**  
我们必须使用 body-parse 等依赖解析 不然 req.body 为空

```js
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
```

<br>

### **<font color="#C2185B">req.cookies</font>**  
当使用cookie-parser中间件时，该属性是一个包含由请求发送的cookie的对象。如果请求不包含cookies，它默认为{}。

<br>

### **<font color="#C2185B">req.fresh</font>**  
当响应在客户端的缓存中仍然是 "未过期 "时，会返回true，否则会返回false，表示客户端的缓存已经过期，应该重新发送完整的响应。

当客户端发送Cache-Control: no-cache请求头以表示端到端重载请求时，该模块将返回false以使处理这些请求透明。

<br>

### **<font color="#C2185B">req.hostname</font>**  
获取url中的域名部分

<br>

### **<font color="#C2185B">req.ip</font>**  
获取请求的ip

<br>

### **<font color="#C2185B">req.method</font>**  
获取请求的方法

<br>

### **<font color="#C2185B">req.params</font>**  
当我们只用动态路由传递参数的时候 传递的参数就可以通过该对象获取  
这个属性是一个对象，包含映射到命名路由 "参数 "的属性。  
例如，如果你有路由/user/:name，那么 "name "属性就可以作为req.params.name使用。这个对象的默认值是{}。

<br>

### **<font color="#C2185B">req.path</font>**  
获取请求行中的第二个部分

```js
// example.com/users?sort=desc
console.dir(req.path)
// => '/users'
```

<br>

### **<font color="#C2185B">req.protocol</font>**  
获取协议

<br>

### **<font color="#C2185B">req.query</font>**  
get请求的参数 会被收集在这个对象中

<br>

### **<font color="#C2185B">req.secure</font>**  
返回布尔值 当协议是https的时候会返回true

<br>

### **<font color="#C2185B">req.stale</font>**  
表示该请求是否 "过期"，与req.fresh相反。

<br><br>

## req身上的方法

### **<font color="#C2185B">req.get(field)</font>**  
获取 给定请求头字段对应的值
```js
req.get('Content-Type')
// => "text/plain"

req.get('content-type')
// => "text/plain"

req.get('Something')
// => undefined
```

<br>

### **<font color="#C2185B">req.is(type)</font>**  
传入 Content-Type 对应的值  
- 如果请求对象中的Content-Type值和我们传入的对应 则返回该值
- 如果请求对象中没有我们传入的值 则返回null或者false
```js
// With Content-Type: text/html; charset=utf-8
req.is('html')
// => 'html'
req.is('text/html')
// => 'text/html'
req.is('text/*')
// => 'text/*'

// When Content-Type is application/json
req.is('json')
// => 'json'
req.is('application/json')
// => 'application/json'
req.is('application/*')
// => 'application/*'

req.is('html')
// => false
```

<br><br>

## response对象:
HTTP响应对象 应用程序在收到 HTTP 请求时发送的 HTTP 响应。

<br>

## res身上的属性:
看了下文档 感觉没有有用的 就没写

<br><br>

## res身上的方法:
### **<font color="#C2185B">res.append(field [, value])</font>**  
express4+以上的时候使用

设置响应头的方法, 给对应的响应头设置对应的值
```js
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
res.append('Warning', '199 Miscellaneous warning')
```

<br>

### **<font color="#C2185B">res.attachment([filename])</font>**  
有些像 javaweb 中我们下载时 使用的方式

当我们传递给前台的资源 是需要浏览器进行下载的时候 我们会通过设置响应头来告诉浏览器的行为应该是什么  
在javaweb中我们是通过如下方式设置响应头的
```js
res.setHeader("Content-Disposition", "attachment;filename=" + downloadFileName);
```

<br>

在express中我们可以直接调用该方法, 传入文件名 就可以完成设置上述响应头的操作，如果我们要设置文件的扩展名和内容类型 则调通 res.type() 方法

```js
res.attachment()
// Content-Disposition: attachment

res.attachment('path/to/logo.png')
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png
```

<br>

### **<font color="#C2185B">res.cookie(name, value [, options])</font>**  
服务器端设置cookie的 key value

**otpiosn:**
```js
{
  domain:	String
  encode:	Function	一个用于对cookie值进行编码的同步函数。默认为,encodeURIComponent。,
  expires:	Date
  httpOnly:	Boolean
  maxAge:	Number
  path:	String
  priority:	String
  secure:	Boolean
  signed:	Boolean
  sameSite:	Boolean
}
```

你可以通过多次调用res.cookie在一个响应中设置多个cookie，比如说。
```js
res
  .status(201)
  .cookie('access_token', 'Bearer ' + token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
  .cookie('test', 'test')
  .redirect(301, '/admin')
```

<br>

### **<font color="#C2185B">res.clearCookie(name [, options])</font>**  
清楚给定 key 对应的cookie
```js
res.cookie('name', 'tobi', { path: '/admin' })
res.clearCookie('name', { path: '/admin' })
```

<br>

### **<font color="#C2185B">res.download(path [, filename] [, options] [, fn])</font>**  
以 "附件 "形式传输路径上的文件。通常情况下，浏览器会提示用户进行下载。默认情况下，Content-Disposition头 "filename="参数来自path参数，但可以用filename参数来覆盖。如果路径是相对的，那么它将基于进程的当前工作目录或根选项（如果提供）。

**参数:** 
```js
{
maxAge: Default: 0
    设置Cache-Control头的max-age属性，单位为毫秒或ms格式的字符串。

root: Default: 	
    相对文件名的根目录。

lastModified: Default: Enabled	
    将Last-Modified标头设置为操作系统上文件的最后修改日期。设置为false则禁用它。

headers: Default: 	
    包含HTTP头的对象，与文件一起提供服务。头信息Content-Disposition将被文件名参数所覆盖。

dotfiles: Default: 
    用于服务dotfiles的选项。可能的值是 "允许"、"拒绝"、"忽略"。

acceptRanges: Default: true	
    启用或停用接受范围内的请求。

cacheControl: Default: true	
    启用或禁用设置Cache-Control响应头。

immutable: Default: false	
    启用或禁用Cache-Control响应头中的immutable指令。如果启用，还应该指定maxAge选项以启用缓存。不变指令将防止支持的客户端在maxAge选项的有效期内发出条件性请求，以检查文件是否有变化。
}
```

**示例:**  
当传输完成或发生错误时，该方法会调用回调函数fn(err)。如果指定了回调函数并且发生了错误，回调函数必须明确地处理响应过程，要么结束请求-响应循环，要么将控制权传递给下一个路由。
```js
res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
  if (err) {
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit, etc.
  }
})
```

<br>

### **<font color="#C2185B">res.end([data] [, encoding])</font>**  
结束响应过程。用来快速结束没有任何数据的响应。  
如果你需要用数据进行响应，可以使用res.send()和res.json()等方法。
```js
res.end()
res.status(404).end()
```

<br>

### **<font color="#C2185B">res.get(field)</font>**  
获取给定字段的响应头对应的值
```js
res.get('Content-Type')
// => "text/plain"
```

<br>

### **<font color="#C2185B">res.json([body])</font>**  
发送一个JSON响应。  
参数可以是任何JSON类型，包括对象、数组、字符串、布尔值、数字或空值，你也可以用它来转换其他值为JSON。
```js
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
```

<br>

### **<font color="#C2185B">res.location(path)</font>**  
将响应的Location HTTP标头设置为指定的路径参数。
```js
res.location('/foo/bar')
res.location('http://example.com')
res.location('back')
```

<br>

### **<font color="#C2185B">res.redirect([status,] path)</font>**  
重定向到从指定路径得到的URL，并指定状态，一个正整数，对应于HTTP状态代码。如果不指定，状态默认为 "302"。
```js
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')
```

<br>

### **<font color="#C2185B">res.render(view [, locals] [, callback])</font>**  
使用这个方法就代表需要用到“模板引擎”, 所以必须要先安装一个模板引擎

渲染一个视图并将渲染后的HTML字符串发送到客户端。可选的参数。

**注意:**  
为了渲染html文件 没必要非得使用 res.render() 可以使用 res.sendFile()
```js
// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function (err, html) {
  res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function (err, html) {
  // ...
})
```

<br>

### **<font color="#C2185B">res.send([body])</font>**  
发送HTTP响应。  
可以通过该方法响应数据 给定的数据类型只能是 json 或者 buffer
```js
res.send(Buffer.from('whoop'))
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(404).send('Sorry, we cannot find that!')
res.status(500).send({ error: 'something blew up' })
```

这个方法为简单的非流式响应执行了许多有用的任务。例如，它自动分配HTTP响应头域的Content-Length（除非之前定义过），并提供自动HEAD和HTTP缓存新鲜度支持。

**当参数是一个Buffer对象时，该方法将响应头的Content-Type字段设置为 "application/octet-stream"，除非事先定义，如下图所示。**

```js
res.set('Content-Type', 'text/html')
res.send(Buffer.from('<p>some html</p>'))
```

- 当参数是一个字符串时，该方法将Content-Type设置为 "text/html"。
- 当参数是一个数组或对象时，Express用JSON表示法进行响应


<br>

### **<font color="#C2185B">res.sendFile(path [, options] [, fn])</font>**  
express4.8+以上支持

传输给定路径的文件。根据文件名的扩展名设置HTTP头域的Content-Type响应。除非在options对象中设置了root选项，否则path必须是文件的绝对路径。

**options:**
```js
{
  maxAge: Default: 0
      设置Cache-Control头的max-age属性，单位为毫秒或ms格式的字符串。

  root: Default: 	
      相对文件名的根目录。

  lastModified: Default: Enabled	
      将Last-Modified标头设置为操作系统上文件的最后修改日期。设置为false则禁用它。

  headers: Default: 	
      包含HTTP头的对象，与文件一起提供服务。头信息Content-Disposition将被文件名参数所覆盖。

  dotfiles: Default: 
      用于服务dotfiles的选项。可能的值是 "允许"、"拒绝"、"忽略"。

  acceptRanges: Default: true	
      启用或停用接受范围内的请求。

  cacheControl: Default: true	
      启用或禁用设置Cache-Control响应头。

  immutable: Default: false	
      启用或禁用Cache-Control响应头中的immutable指令。如果启用，还应该指定maxAge选项以启用缓存。不变指令将防止支持的客户端在maxAge选项的有效期内发出条件性请求，以检查文件是否有变化。
}
```

```js
app.get('/file/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})
```

<br>

### **<font color="#C2185B">res.sendStatus(statusCode)</font>**  
将响应的HTTP状态代码设置为statusCode，并将注册的状态信息作为文本响应体发送。如果指定了一个未知的状态代码，响应主体将只是代码的编号。
```js
res.sendStatus(404)
```

<br>

### **<font color="#C2185B">res.set(field [, value])</font>**  
设置响应头 如果要设置多个传入一个对象
```js
res.set('Content-Type', 'text/plain')

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  ETag: '12345'
})
```

<br>

### **<font color="#C2185B">res.status(code)</font>**  
设置响应的HTTP状态
```js
res.status(403).end()
res.status(400).send('Bad Request')
res.status(404).sendFile('/absolute/path/to/404.png')
```

<br>

### **<font color="#C2185B">res.type(type)</font>**  
将HTTP头的Content-Type设置为由指定类型决定的MIME类型。如果type包含"/"字符，那么它将Content-Type设置为type的精确值，否则它将被假定为文件扩展名，并使用express.static.mime.lookup()方法在一个映射中查找MIME类型。
```js
res.type('.html')
// => 'text/html'
res.type('html')
// => 'text/html'
res.type('json')
// => 'application/json'
res.type('application/json')
// => 'application/json'
res.type('png')
// => 'image/png'
```

<br>

### **<font color="#C2185B">res.vary(field)</font>**  
将字段添加到Vary响应头中，如果它不在那里的话。
```js
res.vary('User-Agent').render('docs')
```

<br><br>

## 利用 Express 托管静态文件
为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 express.static 内置中间件函数。

比如将一张图片展示在页面中, 因为我输入一个网址, 网址中有``<img>``, 它的src也会向服务器发起请求
类似还有 ``<script> <a> <img>`` 等等 他们的src属性都会自发性的去服务器请求该指定的资源

所以一般项目里面应该有一个 存放该静态资源文件夹 *public*  
这样前端的项目就可以访问到 服务器端静态资源文件夹里面的文件

<br>

### 静态文件:
静态资源文件通俗的可以理解成对于不同的用户来说, 内容都不会变化的文件   
比如不管是张三李四还是王五访问百度, 他们所接收到的看到的图片、css文件和前端javascript文件都是一样的, 我们称这类文件为静态资源文件 

<br>

### 动态文件:
对于不同用户做出不同反应的就是动态文件了, 张三李四王五登录百度, 百度会分别对他们显示"你好张三"、"你好李四"、"你好王五",   
那么负责这么动态逻辑的文件就是动态文件了, 根据你是用的技术不同, 动态文件可能是.jsp文件、php文件或者我们node.js的服务器端js文件 


<br>

### **<font color="#C2185B">app.use([path,]function[,function])</font>**  
app.use是用来给path注册中间函数的, 这个path默认是'/', 也就是处理任何请求

**注意:**  
同时要注意的是他会处理path下的子路径, 比如如果设置path为'/hello', 那么当请求路径为
- '/hello/', 
- '/hello/nihao',
- '/hello/bye'

**这样的请求都会交给中间函数处理的** 

<br>

### **<font color="#C2185B">express.static(root, [options])</font>**  
它是一个中间件 专门指定静态资源文件夹 需要传入一个路径 或者 指定文件夹

用来设置在public下查找静态资源(以publick文件夹为根去找静态资源)
**Express 会在静态资源目录下查找文件, 所以不需要把静态目录作为URL的一部分**

**参数:**  
root: 提供静态资源的根目录

root参数指定了提供静态资产的根目录。该函数通过结合req.url和提供的根目录来确定要提供的文件。当没有找到一个文件时，它不会发送404响应，而是调用next()进入下一个中间件，允许堆叠和回退。

```js
app.use(express.static('public'))

// 是将所有请求, 先交给express.static(__dirname + '/public')来处理一下 根据上面 app.use() 方法的参数来看 express.static()的返回值肯定是一个函数
```

现在，你就可以访问 public 目录中的所有文件了：
```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

如果要使用多个静态资源目录，请多次调用 express.static 中间件函数：
```js
app.use(express.static('public'))
app.use(express.static('files'))
```

我们还可以在静态资源的前面设置一个路径 通过该路径再访问静态资源  
在做项目开发的时候 我们希望对资源进行 是静态资源还是动态资源的标记区分, 这个前缀就可以用来做这样的事情

```js
app.use('/static', express.static('public'))
```

现在，你就可以通过带有 /static 前缀地址来访问 public 目录中的文件了。

```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

我们以前在做页面的时候, src的路径都是本地电脑上的  
html页面中的src路径 也要写 根 / 从根开始写, 或者直接写请求头的第二个部分  

但是我们将网页部署到服务器上去后, 去地址栏请求一个页面, 这个页面里面的图片 css文件等 就会同时发起请求, 我们就要设置一个静态资源文件夹, 把这些静态资源放在这个静态资源文件夹里面, 把这个静态资源文件夹作为 根 让请求的资源从 根 去找
```js
  const app = express();

  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  // 设置访问静态资源文件夹
  app.use(express.static('public'));


  <div class="target">
      // 正常线下做文件时的引用方式
      <img src="../public/img/1.jpg" alt="">

      // 部署到服务器上 设置了express.static后的引入方式 根是 / 
      <img src="./img/1.jpg" alt="">

      // 添加了前缀的引入方式 把前缀也要带上
      <img src="/static/img/1.jpg" alt="">
  </div>
```

假如 我们想让资源资源关联到 node_modules 里面的资源 可以以如下方式操作  
在我们设置/static后 前端通过/static路径访问到服务器端静态资源文件夹里面的数据
```js 
/*
  npm i bootstrap
  然后将 node_modules / bootstrap 设置为静态资源文件夹

  这样前端就能访问到这个文件夹中的文件
*/
app.use(express.static("/lib/bootstrap", "node_modules/bootstrap/dist"))


// 前端可以通过 /lib/bootstrap 这个路径 访问到 node_modules/bootstrap/dist 这个路径里面的资源
```

比如 vue打包后的目录就可以丢到 public 里面 这样用户请求根路径的时候 可以直接访问页面了

**express待整理**

<br><br>

## 处理请求
express处理请求的时候 对比原生 http模块
1. 规则清晰了 每一个规则都可以写一个app.get()来进行对应的处理
2. 响应中文时 **不用再设置响应头和设置响应数据的类型**

<br>

### <font color="#C2185B">app.get("接口", (req, res) => {})</font>
处理get请求
```js 
app.get('/', (request, response) => {
  // 响应数据
  response.send('hello, express')
})
```    

```js 
  const express = require('express');
  const path = require('path')
  const fs = require('fs')

  const app = express();

  app.get('/', (req,res) => {
      res.send('这是首页的内容');
  })


  app.get('/register', (req, res) => {

      // 在这里我们把注册页面响应回去 获取文件路径 
      let filePath = path.join(__dirname, 'views', 'register.html');

      // 读取文件内容
      // 这里不写utf-8 会下载文件 我去~
      let content = fs.readFileSync(filePath, 'utf-8');
      res.send(content)
  })

  app.listen(3000, () => {
      console.log('3000端口已开启')
  })
```

<br>

**注意:**  
浏览器会默认打开它能解析的内容 上述的方式可能会出现下载 send回 前端的页面 所以我们可以加上响应头 告诉浏览器这是html文件
```js
app.get("/", (req, res) => {

  // 设置响应头
  res.setHeader("Content-Type", "text/html;charset=utf-8")


  let html = fs.readFileSync(loginPath, "utf-8")
  res.send(html)

})
```

<br><br>

## express框架获取get请求参数

当我在练习的时候发现一个问题, 这节是get请求参数是怎么在服务器获取的, 为了达到这个目的, 我在通过localhost:3000 去请求对应页面 并且传参的时候

```js 
  // 我输入的网址, 并传递了参数
  http://localhost:3000/index?name=sam&age=18

  // 服务器对应的规则
  app.get('/index', (req, res) => {
      res.send('index首页页面内容哦')
  })
```

页面上竟然显示 index首页页面内容哦    
要是用http模块做的话 因为是get请求, request.url肯定是带参数的我们要在服务器端写请求路径接口的时候都是

```js
request.url.startWith('/index') 使用这种方式
```

但是express不用说明一个问题:   
服务器端的接口(请求地址) 和 我们在地址栏输入的地址不是全等的

也就是说 http://localhost:3000/index?name=sam&age=18  
*express会去掉?name=sam&age=18的部分再进行匹配*

<br>

### **<font color="#C2185B">request.query</font>**
获取get的请求参数(字符串参数), 获取的结果是一个对象  
获取的是 url形式的参数

```js 
  http://localhost:3000/index?name=sam&age=18

  { name: 'sam', age: '18' }

  request.query.name
  request.query.age
```

<br><br>

## express框架获取post请求参数
在处理post请求参数的时候我们在服务器端要进行如下的处理
```js 
// 后台设置这个 解决前端 post 请求参数的问题
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// 前端浏览器端 在ajax中 设置请求头 不然后端接收不到~ 注意: 要在 xhr.send()的上面 设置
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
```

<br>

### **<font color="#C2185B">app.use(express.urlencoded({extended: false}));</font>**
设置接收过来的值是什么样的类型

extended的参数:
- false: 接收的值为字符串或数组
- true: 则为任意类型

<br>

### **<font color="#C2185B">app.use(express.json());</font>**
将获取到的数据解析成json格式 方便我们后面直接去获取

<br>

### <font color="#C2185B">req.body</font>
就是post请求 提交过来的参数 我们可以通过解构的方式来获取变量名

```js 
let { username, password, confirmPassword, email} = req.body;
console.log(username, password, confirmPassword, email);
```

**它的格式:**
```js 
  [Object: null prototype] {
    username: 'hahaha',
    password: '111',
    'confirm-password': '111',
    email: '111'
  }
```

<br>

### 后端的业务逻辑:
1. 获取参数
2. 校验规则 是不是符合规则, 判空
3. 查询数据库, 看看用户名是否被注册
  
<br>

### 总结:
- 获取 get的请求参数:   req.query
- 或者 post的请求参数:  req.body

<br><br>

# 重定向 res.redirect
我们拿注册页面举例子, 当我们提交完注册信息后, 正常会跳转到其它的页面比如首页之类, 不会停留下注册页面

实现: 注册完后跳转到index.html页面
- 首先: 我们我们要创建一个响应回登陆页面的接口
- 然后: 在注册的接口里面的逻辑的最后 跳转到登陆页面的接口

也就是说 重定向是在后台跳转接口实现的

<br>

### **<font color="#C2185B">res.redirect(接口)</font>**
重定向到哪个页面(接口)

**具体步骤:**
```js 
// 定义一个展示 login 页面的接口 , 我们使用get
app.get('/login', (req, res) => {

  // 将读取到的文件响应回请求
  let filePath = path.join(__dirname, 'views', 'login.html');
  let content = fs.readFileSync(filePath, 'utf-8');
  res.send(content)
})


// 注册页面的接口, 注册完后跳转到登陆页面
app.post('/register', (req, res) => {

  console.log(req.body)
  let { username, password, confirmPassword, email} = req.body;
  console.log(username, password, confirmPassword, email);

  
  // 跳到'/login'接口 重定向(跳转)到'login'接口, 剩下的交给'login'接口处理 相当于会执行'login'接口里面的代码, login接口里面的代码是返回一个登陆页面给你
  res.redirect('/login');
})
```

<br>

### **<font color="#C2185B">res.writeHead(状态码, {响应头的kv});</font>**
响应报文中的状态码是可以修改的, 通过这个方式我们可以手动修改它
```js 
// 重定向后 响应报文中的状态码会变成300+ 我们可以手动修改它
res.writeHead(302);

// 添加响应头的键值对
res.writeHead(302, {name:'sam'});  


// 错误信息: 已经返回浏览器了 还设置头部 的错误信息
cannot set headers after they are sent to the client
```

<br>

### **<font color="#C2185B">app.all() 合并相同路径的请求</font>**
有相同接口(请求路径)的get和post的请求, 我们可以合并到all里统一处理
合并到一起后 根据请求的方式来执行不同的代码(执行对应的处理)

<br>

### <font color="#C2185B">req.method</font>
获取请求方式

**返回值:**  
大写的 请求方法

```js 
  app.all('/register', (req, res) => {
      if(req.method === 'GET') {

      } else if(req.method === 'POST') {

      }
  })
```

### 跨域处理:
统一给所有的接口 加上了跨域处理

```js
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
```

<br><br>

# art-template模板引擎
之前我们在请求文件的时候, 都是通过如下的方式 将文件响应回前端页面的

1. 通过path 找到要返回的html文件的路径
2. 通过fs 读取文件
3. 通过res.send() 将读取文件响应回 浏览器

```js
app.get("/", (req, res) => {
  let filePath = resolve(__dirname, "views/index.html")
  let file = fs.readFileSync(filePath, "utf-8")
  res.send(file)
})
```


这样每次在一个接口中处理返回页面的逻辑非常的复杂, 为了解决这点, experss建议我们使用模板引擎来渲染页面(返回页面), 我们只需要在配置完后, 使用简单的一个代码就可以完成以前复杂的操作步骤

<br>

### **<font color="#C2185B">res.render(文件名不需要加后缀, [data])</font>**
通过 模版引擎 将html文件 返回给前端  
不仅能将html模板页面响应回浏览器 还能把数据库的数据传递到模板html文件里

<br>

## art-template模板引擎使用步骤

### 1. 下载
使用前需要安装 art-template(模板语法需要用到) 和 express-art-template(app项目需要用到)
```
npm install --save art-template
npm install --save express-art-template
```

<br>

### 2. 配置
1. 修改渲染引擎为html 并导入express-art-template  
- 我们要使用的是 html 结构 那么引擎就要选择 html
- 我们要是用的是 pug 结构  那么引擎就要选择 pug

2. 配置开发环境
3. 设置在哪一个文件夹里面去找html文件
4. 设置文件的后缀名 为 html

```js 
  // 1. 设置html文件解析引擎
  // 修改模板引擎为html(还有art引擎), 导入express-art-template
  app.engine('html', require('express-art-template'))


  // 2. 项目环境的配置, 设置运行的模式为生产模式
  /*
    生产模式: production
    开发模式: development
  */
  app.set('view options', {
      // 不等于生产环境就是开发环境
      debug: process.env.NODE_ENV !== 'production' 
  })

  // 3. 设置html文件所在目录: 设置在哪一个目录下查找html文件(模板文件), 或者说设置模板存放目录为 views文件夹
  app.set('views', path.join(__dirname, 'views'));

  // 4. 启用引擎: 设置模板的(引擎)后缀名为html
  app.set('view engine', 'html');

  // 通过render()返回该模板
  app.get('/', (req, res) => {
    res.render('index');
  })
```

<br>

**配置: 粘贴复制用**
```js
  // :
  app.engine('html', require('express-art-template'));
  app.set('view options', {
      debug: process.env.NODE_ENV !== 'production'
  });
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
```

<br>

### Pug模版引擎:
express对pug进行了整合 所以不用下载

```pug 

| - views
  - index.pug

//- 将模板引擎设置为 pug
app.set("view engine", "pug")

//- 设置模板存放目录为 views文件夹
app.set('views', path.join(__dirname, 'views'));
//- app.set("views", "./views")

//- 设置服务器端的静态资源文件夹 让前端通过 /lib/bootstrap 路径访问到bootstrap
app.use("/lib/bootstrap", express.static("node_modules/bootstrap/dist"))

app.get("/", (req, res) => {
  res.render("index")
})
```


### 配置完成后的使用方式 和之前的对比
```js 
  // 之前:
app.get('/register', (req, res) => {
  let filePath = path.join(__dirname, 'views', 'register.html');
  let content = fs.readFileSync(filePath, 'utf-8');
  res.send(content)
})

// 之后:
app.get('/', (req,res) => {
  res.render('index');
})  
```

<br>

### express.static() & res.render() 冲突的情况
也就是使用render()方法渲染回去的html文件内部 找不到 静态资源文件夹里面的资源了

设置的顺序问题:
- 先设置 静态资源文件夹
- 再设置引擎

```js
const express =require("express")
const path = require("path")
const fs = require("fs")

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 先设置静态资源文件夹
app.use(express.static("public"))

// 然后再设置的引擎
app.engine("html", require("express-art-template"))
app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "html")
```

<br><br>

## art-template模板引擎传递数据 (动态后端渲染页面)
之前我们都是通过 fs.readFileSync 的方式读取并响应回浏览器, 这种方式读取的文件是固定的, 不能修改

但是我们开发中经常会遇到 我们打开一个网页, 网页中的内容有部分是活的(比如新闻模块每天都会不一样), 这部分活的内容是从他们的数据库来的, 不是写死的 也就是说我们返回的页面里面的内容, 有些也是可以从数据库传过来的

我们在后端将从数据库拿到的数据, 传递给html文件, 在html文件里就可以使用这个数据, 这样就可以动态的获取后台的数据了

一般的前端框架都会有自己的插值语法, 比如胡子语法等, 都是些模板html文件, 用于根据数据库的数据动态的生成可变的内容

express框架里没有像vue开发自己的模板语法框架等, 而是拿了别人的模板语法的框架art-template就是一个成熟的模板框架(还有cjs等)

```js 
           数据

浏览器 --- 服务器 --- 数据库
{{ }}   ←  传递  →  读取数据
```

<br>

所以我们可以先定义一个模板, 就像vue那样(动态的地方留些空, 等着后台过来的数据填空), 然后 ``模板.html文件`` 展示到浏览器端
```js
  // 定义首页的模板
  <h1>{{title}}<h1>
  <p>{{我是活动的内容}}</p>

  {{}}
  {{}}
  {{}}

  // 就类似这样创建很多的空的html文件
```

<br>

后台通过 ``res.render('页面名', '数据')`` 方式渲染的html结构中就可以使用 template语法

<br>

### 前端使用数据的方式
通过 {{属性名}} 取值

之所以可以这样办到, 是因为有art-template的存在, 用来解析胡子语法的, 胡子语法也是基于 art-template的

很像vue啊 前端和后端不要使用同一个模板

<br>

### 示例
```js 
// 使用 art-template 渲染响应主页
app.get('/', (req,res) => {

// 实现后端渲染, 先模拟下数据库 假设这个数据是从数据库得到的, 现在先把这个数据 传递到html文件里, 然后html文件就可以使用这个数据

let data = {
    num:1,
    num:2
}

// 在第二个参数上写上data, 相当于把数据传递到模板当中
res.render('index', data);



  // 浏览器端 使用{{}}语法 直接使用data中的属性名
  <h3>测试文本: {{num1}}</h3>
```

<br>

**注意:**  
模板语法中{{不要随意加空格}}!!!!!!!

<br>

## art-template 语法部分:
```s
# 多看看文档
https://aui.github.io/art-template/zh-cn/docs/syntax.html
```

<br>

### <font color="#C2185B">{{ }}</font>
取值 / 插值

后台传递的格式可能是:
```js
data: {
  num:1
}
```

浏览器端使用胡子语法 直接读取num 

<br>

胡子语法里还可以使用表达式
```js 
{{num1 > num2 ? num1 : num2 }}
```

<br>

**注意:**
1. 注释中不要使用{{}}要不一样会解析 会报错
2. 后台返回给前端的就是一个对象 我们从 {{}} 里面直接使用 对象里面的值 就可以

```
{{ data.num1 }}  -- x
{{num1}}         -- o
```

<br>

### <font color="#C2185B">{{@数据}}</font>
@的作用就是将 文本按照 html 的方式进行解析, 类似 v-html
```js
{{@newsData.digest}}
```

<br>

**原始写法:**  
<font color="#C2185B"><%- newsData.digest%></font>

```html
<body>
  {{@tag}}
</body>

<script>
  app.get("/", (req, res) => {
      let data = {
          title: "首页",
          content: "我是首页的内容",

          // 这里
          tag: "<div style='background: red'>我是div标签</div>"
      }
      res.render("index", data)
  })  
</script>
```

<br>

### 遍历 v-for
数组中元素有多少个 被胡子标签包裹的区域就会循环多少次
```js
{{each 数组名}}
  <li>{{$index}}, {{$value}}</li>
{{/each}}
```

- $value就是数组中的每一个值
- $index就是下标

```js 
<ul>
  {{each books}}
    <li>{{$index}}, {{$value}}</li>
  {{/each}}
</ul>
```

<br>

### 根据布尔值 展示对应标签与否 v-if
被if胡子标签包裹起来的部分会根据表达式的布尔值, 来决定内部的内容的渲染与否
如果没渲染就页面上连节点也没有
```js
{{if num1 > num2}}
  <p>我是根据布尔值决定是否现实的文本</p>
{{/if}}
```

<br>

根据user_info 要么展示上面, 要么展示下面
```js
{{if user_info}}

  <html部分1>

{{else}}

  <html部分2>

{{/if}}
```

<br>

### <font color="#C2185B">过滤器 {{ value | 过滤器的名字 }}</font>
前端使用后台配置好的过滤器

我们要使用到art-tamplate中的方法就要先引入, 然后才能用过滤器的方法
```js 
// 后台: 
const template = require('art-template');
```

<br>

跟vue里面的很像, 都是把数据 '过滤 / 格式下' 再显示在html结构中  
比如时间, 数字, 后端传递过来的数据

<br>

前端使用了过滤器 后台就要有对应的函数来进行处理

<br>

### <font color="#C2185B">template.defaults.imports.函数名 = function(value) { ... }</font>
后台函数中的 value 形参 管的就是 前端 {{ *这个变量* |  }}

```js 
template.defaults.imports.函数名 = function(value) { 

  // value 接收 | 前面的变量(数据)
  return value * 200

  // 返回过滤后的数据, 实际上相当于在这个函数里面处理一遍, 然后返回到页面上
}
```

<br>

### 示例:
```js 
// 后台:
// 1. 先引入 art-template
const template = require('art-template');

// 2. 调用template的过滤器函数
template.defaults.imports.fn(过滤器函数名) = function(value) {
    return value * 4;
}

app.get('/', (req, res) => {
    let data = {
        num: 20
    }
    res.render('index', data);
})


// 前端:
// 3. 前端模板中使用 {{数据 | 过滤器}}
<h3>{{num | fn}}</h3>
```

<br><br>

## 模板继承的语法格式
有一些网站的格式是这样的, 头部和尾部都不会发生变化, 只有中间的内容会根据点击的nav不同显示对应的内容, 这时候我们就可以把页面抽成一个模板(父模板)

而其他的页面继承 父模板(base模板), 这就是模板的继承

base.html是整个网站中可以公共的一些内容放在base.html文件里

```js 
  +----------------------------+
  LOGO    热门  热图  文字  穿越
  +----------------------------+


  +----------------------------+
  
  
  动态内容 根据上面nav显示对应内容


  +----------------------------+


  +----------------------------+
            固定的尾部
  +----------------------------+
```

<br>

### 1. 父模版中使用 {{block 'name'}} ... {{/block}} 将动态部分暴露出去
这样子模板同样可以使用 {{block 'name'}} ... {{/block}} 替换掉其中的内容 达到动态的效果

<br>

### 2. 在子模板中 使用 继承语法 继承 公共部分
### {{extend './fml.html'}}
填入父模版路径, 在子模板中就写这么一句话, 路径是父模板的 相当于把父模板中的代码复制一遍粘贴到了子模板中

<br>

### 3. 子模板中使用 {{block 'name'}} ... {{/block}} 拿到父模板中暴露的内容 替换为自己要的内容
在父模板中, 想要和父模板内容不一样的地方, 需要用block胡子标签括起来, 把括起来的部分在子模板中重写

```js 
父模板:
{{block 'content'}}
  <main>
    <h3>我是主体内容的大标题</h3>
    <p>我是主体内容的文本</p>
    <div class="imgContainer">
      <img src="/img/1.jpg" alt="">
    </div>
  </main>
{{/block}}
```

```js 
子模板:
{{extend './fml.html'}}

{{block 'content'}}
  <main>
    <h3>我是"热图"中的大标题</h3>
    <p>我是"热图"中的内容的文本</p>
  </main>
{{/block}}
```

<br>

### 要点:
1. 一般渲染的都是子模板, 不要去渲染base.html(这个是用来拿来用的)
2. 如果子模板中要写自己的样式, 那就在base.html中留坑
```js 
<head>
  {{block 'cssarea'}}
    // 这部分是样式留个坑让子模板里自己去填
  {{/block}}
</head>


{{ block 'script' }}
  // 还可以在页面中留一个脚本坑
{{ /block }}
```

<br><br>

### Router
上面我们把所有的路由相关的接口设置都放在index.js(入口文件)中, 这样以后入口文件会越来越不清晰, 开发的时候 我们的入口文件要尽可能的保持简洁

一般项目的入口文件叫 main.js 或者 app.js

接口的代码的抽离 需要使用到 router , 而router是在express框架里面

<br>

## Router的使用:

### 1. 在项目下创建 router 文件夹
按照项目功能来创建对应的 js模块, 每个模块都需要 导出 引入 注册

文件夹里面按功能来分接口模块 比如我们可以验证相关的来个模块 首页也当做个模块等等  
在router文件夹下按照功能创建 passport.js 对应的js文件(不是必须创建这个文件名)

```js
| - router
  - passport.js
  跟验证相关的代码交给passport模块来处理(登录 注册等)

  - index.js
  跟首页相关的逻辑 可以创建一个index.js文件, 我们只是根据统一的功能去创建路由文件
```

**这里相当于 java中 service层 我们会根据一张表对应一系列的功能 去区分js文件**

<br>

### 2. router/xxx.js中引入 express 创建路由对象 router
### **<font color="#C2185B">express.Router()</font>**
路由也就是路径管理, 返回router对象 (创建 保安大爷)

该js文件中 所有接口的管理方式 由 app.get -> router.get  
也就是将所有的 路径 交由 保安大爷来管理

```js 
// passport.js:
const express = require('express');
const router = express.Router();


app.get('/register', (req, res) => {
    ...
})

// ↓ 改成 router

router.get('/register', (req, res) => {
    ...
})
```

<br>

### 3. 将定义好的路由暴露出去
```js
module.exports = router;
```

<br>

### 4. 在入口js文件中导入router 并注册到app下
将验证相关的代码都拷到passport.js文件中了, 但是跟我们的入口js文件没有关联所以我们要将passport.js中的router导出, 然后在入口文件中导入

```js 
// 入口js文件中:
const passportRouter = require('./router/passport')

// 把路由对象注册到app下
app.use(passportRouter);
```

<br>

### 注册路由时的参数
### <font color="#C2185B">app.use("/api", 路由文件)</font>
这么设置后 只有通过 /api 才能访问后面路由(router)所管理的路径
```js
localhost:3333/api/getUser
```

<br>

### <font color="#C2185B">app.use(钩子函数, 路由文件)</font>
这么设置后 在访问路由文件前 会先执行钩子函数

<br>   

### 路由的汇总
在定义接口的时候 我们习惯每一个模块作为一个js文件来开发 比如
- login.js
- user.js

<br>

那么每个模块作为一个router的话 就会出现这样的情况 要注册很多的 router
- app.use(loginRouter)
- app.use(userRouter)

<br>

所以我们可以将这些router汇总到一个 文件了 一次app.use(router)

```
loginRouter
userRouter       →  router  → app.use(router)
registerRouter
```

<br>

**<font color="#C2185B">router.use("前缀", loginRouter)</font>**  
前缀可以加 可以不加 加上 接口前就要加上前缀 如 /sys/login

<br>

然后 入口文件中可以这么引入 这样的话 完整地址为 localhost:3000/api/v1/login  
接口也是有版本的
```
app.use("/api/v1", router)
```

<br>

### passport.js代码部分
```js 
const express = require('express');
const path = require('path')
const fs = require('fs')

const router = express.Router();


// 响应注册页
router.get('/register', (req, res) => {
  let filePath = path.join(__dirname, '../views', 'register.html');
  let content = fs.readFileSync(filePath, 'utf-8');
  res.send(content)
})

// 提交注册后的逻辑接口
router.post('/register', (req, res) => {

    let { username, password, confirmPassword, email } = req.body;
    res.redirect('/login');
  })

  // 响应 登录页
  router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router;
```

<br>

### main.js 部分
```js
const express = require("express")
const {resolve} = require("path")
const fs = require("fs")

// 导入 router
const router = require("./router/passport")
const app = express()

app.use(express.static("public"))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.engine("html", require("express-art-template"))
app.set("views", resolve(__dirname, "views"))
app.set("view engine", "html")


// 注册 router
app.use(router)

app.listen(3333, () => {
  console.log("服务器已开启")
})
```

<br><br>

## 处理请求之前的钩子函数
钩子函数是某一类函数并不是生命周期函数, 钩子函数是, **执行某一个函数之前和之后肯定会执行其他指定的函数**, 这类函数我们称为钩子函数

如果在执行处理请求的函数之前想执行一些代码, **例如验证是否已经登录的工作**  
假如我想在执行 passport.js(路由文件) 的代码之前执行一个函数 怎么处理?
<br>

### <font color="#C2185B">app.use((req,res,next) => {}, 路由文件模块)</font>
fn为自定义定义的函数, 该函数 肯定会在执行 路由文件模块之前被调用  
如果定义的fn函数执行失败了, 后面的路由文件模块的代码就不会被执行

<br>

**注意:**    
定义的fn函数 里面的逻辑执行完后, 必须调用next() 才能进入到路由文件模块的代码逻辑

```js 
function fn(req, res, next) {
  console.log('执行passportRouter路由接口函数之前先执行这句话')

  // 调用next()后, 才会去执行app.use(1, 2) 2中的代码
  next();
}

// 上面函数内部调用next()后passport才会被执行
app.use(fn, passportRouter);
```

<br>

**需求: 访问注册页面之前先打印一句话**
```js 
const app = express();

function fn(req, res, next) {
  console.log('执行passportRouter路由接口函数之前先执行这句话')
  next();
}

// 在这里的第一个参数上写上上面的函数, 这样在执行passport里面的函数之前就会执行fn这个函数的代码
app.use(fn, passportRouter);
app.listen(3000, () => {})
```

<br>

### 扩展: 接口中的钩子函数
一个接口中 app.get("/接口", 回调1, 回调2) 好像也可以这样

<br>

### 钩子函数的使用场景: 守卫 和 拦截
网站上的有些功能需要登录之后才能够使用(比如收藏, 关注)
**这个功能可以校验你是否登录了, 没有没登录, 就不给你调用收藏的接口, 和关注的接口**

**伪代码**
```js 
function fn(req, res, next) {
    // 我可以在进去收藏 和 关注的接口之前对身份进行验证 看看用户是否已登录
    if(没有登录) true就是没有登录

    if(true) {
        res.send('登录校验没有通过')

        // return后的代码不会执行了 后面的关注 收藏的页面就看不到了
        return  
    }

    // 如果 登录了 就放行 可以浏览 路由文件中的接口
    next();
}

// 假如passport路由文件里是关于收藏和关注的接口
app.use(fn, passportRouter);
```

上面的函数就是钩子函数(一个环节断了后面的就不会执行), **钩子函数也不会放在入口文件中, 会被作为工具函数抽取出去**

<br>

### 钩子函数的抽取
我们还可以建立一个放工具函数的文件夹, 便于管理, 建立 utils 文件夹, 建立 index.js 文件(放工具函数)

```js 
// utils 文件夹 -- index.js文件

// 校验登录
function fn(req, res, next) {
  if(true) {
    res.send('登录校验没有通过')
    return  
  }
  next();
}

// 利用对象的格式 未来还有其他工具还可以继续导出
module.exports = {
  fn,
  其他工具
}


// 入口文件中
const utils = require('./utils/index.js');
// 如果文件名是index 那么可以省略 require('./utils); 成这样

// 使用的时候是utils.fn
app.use(utils.fn, passportRouter);
```

<br><br>

## 路由的动态参数: pathname(pathinfo): /user/id/type
总结下别的框架中通过路由传参的叫法
- query: 地址栏传参 ?key=value
- params: 动态参数 /id/type

我们这里为了和其他的框架温和, 也叫做 params 传参的方式

<br>

前面我们学习了获取get请求的参数, post请求的参数, 还有一种叫做 pathinfo风格的参数(也是get请求参数的一种), 也叫pathname参数

<br>

### 应用场景:
我们进到新闻页面, 那新闻页面在后端就有一个接口, 我希望点击一篇文章的标题就会在浏览器显示一篇文章或跳到一个对应的页面

同时我们不希望一篇文章创建一个接口, 我们希望都在新闻页面的接口里面处理
那么 我们就需要一个能匹配接收新闻页面内的所有子新闻的接口 *动态路由*

<br>

### 思路:
我们给每一个链接设置点击的时候传递id到后端, 后端通过id去数据库查询数据, 读取之后渲染到页面上 那怎么把id传进后端呢?

<br>

### 方式1: 使用 query 方式, 使用?在请求地址后拼接
```html
  <li><a href='/detail'>这是第一篇新闻标题</li>
  <a href='/detail?id=1'>
```

<br>

### 方式2: 使用 params(pathinfo) 方式
```html
<li><a href='/detail'>这是第一篇新闻标题</li>

<a href='/detail/1'>
```

```html
<a href='/detail/id/type'>
<a href='/detail/1/music'>
```

<br>

### 后台设置接口的时候 声明需要接收的变量

**格式:**
```js
app.get('/detail/:id/:type', (req,res) => { ... }
```

<br>

**接收参数的方式:**
- req.query:  对应 ?参数
- req.params: 对应 /id/type
- req.body:   对应 请求体参数


声明接收到的参数就会在 req.params 对象中

<br><br>

# 状态保持技术 cookie & session
因为http是一种无状态协议, 浏览器请求服务器是无状态的

```
浏览器      第一次向服务器发起请求      服务器
浏览器      第二次向服务器发起请求      服务器
```

浏览器第二次向服务器发送的请求 完全不知道第一次发送请求, 这个就是无状态

有些时候我希望我的状态是被保持的, 比如我在首页登录过了, 去子页的时候我希望我的登录状态是被保持的, 而不是让我重新再登录一次

进到子页面后能保持登录的状态 有一部分是cookie的功劳 

<br>

### 无状态:
指一次用户请求时, 浏览器, 服务器无法知道之前这个用户做过什么, 每次请求都是一次新的请求

<br>

### 无状态的原因:
浏览器与服务器是使用socket套接字进行通信的(http底层是基于tcp的而tcp传输时使用的是socket技术), 服务器将请求结果返回给浏览器之后, 会关闭当前的socket, 而且服务器也会在处理页面完毕之后销毁页面对象

有时需要保持下来用户浏览的状态, 比如用户是否登录过, 浏览过哪些商品等

实现状态保持主要有两种方式:
1. 在客户端存储信息使用cookie
2. 在服务器存储信息使用session

<br>

### 无状态协议:
1. 协议对于事物处理没有记忆能力
2. 对同一个url请求没有上下文关系
3. 每次的请求都是独立的, 它的执行情况和结果与前面的请求和之后的请求是无直接关系的, 它不会受前面的请求应答情况直接影响, 也不会直接影响后面的请求应答情况
4. 服务器中没有保存客户端的状态, 客户端必须每次带上自己的状态去请求服务器
5. *人生若只如初见*

<br>

## cookie:

**特点1:**  
cookie由服务器生成, **保存在浏览器端的一小段文本信息**

<br>

**特点2:**  
cookie是以键和值的形式进行存储的(服务器在响应浏览器的请求时可以设置cookie)

服务器响应回的信息中, 设置好的cookie被放在了响应报文中的响应头里面, 响应头是以键值对的方式存在, cookie也是键值对的形式

然后浏览器会自动把设置的cookie信息保存在浏览器中, 再之后客户端向这个服务器发送请求的时候 会自动携带着这个网站的相关cookie发送请求 在请求头中

这样发送给服务器后 服务器会取到cookie看到之前设置的键值对, 这次请求的来源就是之前的浏览器 这样就能做到状态保持

<br>

**特点3:**  
浏览器在访问一个网站的服务器时, 会自动在请求头中把和本网站相关的所有cookie发送给服务器

<br>

**特点4:**  
cookie是基于域名安全的
- 访问百度只会带着百度的cookie信息发送请求
- 访问淘宝只会带着淘宝的cookie信息发送请求

<br>

**特点5:**  
cookie有过期时间, **默认关闭浏览器之后过期**

```js 
  +---------+                                     +---------+
      浏览器             第一次发送请求                服务器
                        ------------------ >       
                                                ↘
                                                      ↓

                      返回页面信息 在响应头       在响应浏览器(返回页面)
  自动把cookie信息    中带着cookie信息            的时候 可以设置cookie
  保存在浏览器中      < ------------------        res.cookie('x':'y')

                      在请求头中带着这个网站      
                      的相关cookie信息            获取到cookie信息之后
  第二次发送请求      ------------------ >        再去做一些对应的处理

  +---------+                                     +---------+
```

**设置cookie和获取cookie都是在服务端做的**

<br>

### Cookie的安装

**1. 安装和引入 cookie-parser**
```js 
npm install cookie-parser --save
```

<br>

**2. 注册到app中**
```js 
const cookieParse = require('cookie-parser');
app.use(cookieParse());
```

<br>

### Cookie的设置 和 获取

### <font color="#C2185B">res.cookie('键名', '键值', [options])</font>
通过响应对象设置cookie

**参数:**  
options: 可选, 对象, cookie的相关属性都可以设置在对象中
```js
{ 
  // 过期时间ms, 浏览器中显示的是s, 默认浏览器关闭
  maxAge: 2000000,    
  httpOnly: true
}
```

<br>

设置多条cookie需要分别调用cookie()
```js 
res.cookie('name', 'sam', {maxAge: 1000*60*60});

// 因为没有设置过期时间, 关闭浏览器后就失败了
res.cookie('age', 11);

// Set-Cookie: name=sam; Max-Age=3600; Path=/; Expires=Sat, 29 May 2021 05:06:48 GMT
```

<br>

### <font color="#C2185B">req.cookies</font>
在**请求对象**中获取cookie
```js 
log(req.cookies)      // { name: 'sam', age: '11' }

let name = req.cookies.name;
let age = req.cookies['age'];
```

<br>

### 代码部分
```js 
const cookieParse = require('cookie-parser');
app.use(cookieParse());

app.get('/set_cookie', (req, res) => {

  // 设置cookie, 过期时间的单位是毫秒 1s等于1000ms 浏览器上的单位是s
  res.cookie('name', 'sam', {maxAge: 1000*60*60});

  // 没有设置过期时间 关闭浏览器后就会被删除
  res.cookie('age', 11);

  res.send(`设置cookie信息`);
})

app.get('/get_cookie', (req, res) => {

  console.log(req.cookies)

  let name = req.cookies.name;
  let age = req.cookies['age'];

  console.log(`获取到的cookie信息为: ${name}, ${age}`)
  res.send(`获取到的cookie信息为`)
})
```

<br>

### 简单的示例代码
```js
router.get("/", (req, res) => {

  let {token} = req.cookies
  // 如果没有 token
  if(!token) {
    res.redirect("/login")
    return
  }

  let data = {
    title: "首页",
    content: "我是首页的内容",
    tag: "<div style='background: red'>我是div标签</div>"
  }
  res.render("index", data)
})
```

<br><br>

## session
session是依赖于cookie的

**session的信息真正是保存在服务端的**, 它会在服务器中开辟一个空间用来保存session的数据, 这个空间会用 标识 来标记(跟对象和地址值似的)

在这个空间里, 使用 键值对 的形式 存放着session数据(name=sam)

比如上面使用 cookie 的方式的时候, 键值在浏览器的请求头和响应头中看的一清二楚 name=sam 也能侧方面反应出 用户的信息放在cookie中不安全, 不太好

上面说了 为了标记服务器开启的空间存储的session数据, 对这个空间使用了 标识

这个标识会保存在cookie当中, 随着cookie响应回浏览器端, 也会随着cookie向服务端发起请求 也就是说将来保存在浏览器中的并不是session的数据 而是数据的标识

当第二次发送请求的时候, 浏览器会带着网站的相关cookie信息, 这个cookie信息里面有session数据的标识, 服务器再拿着这个标识去找对应的数据

服务器 利用了 浏览器的cookie 将标识带了过去 所以session是依赖于cookie的
session是在服务端设置, 服务端保存

<br>

### session的特点:
1. session数据保存在服务器
2. session是以键值对的形式进行存储
3. session依赖于cookie, 每个session信息赌赢的客户端的标识保存在cookie中
4. 不同浏览器设置session时会开辟不同的空间用以保存session的数据 空间之间是独立的, 也就是说同时设置name age属性名是没问题的

```js 
  +---------+                                     +---------+
      浏览器             第一次发送请求                服务器
                        ------------------ >       
                                                ↘
                                                      ↓
                      返回页面信息,在cookie中保   
                      存着刚才session数据的标识   
  把session数据的     而不是真正的数据             设置 session
  标识保存在cookie    < ------------------  res.session['name']='sam' 
  中

                      带着网站的相关cookie信息      
                      这个cookie里面有           拿到session的标识, 就
  第二次发送请求       session数据的标识          知道浏览器的用户的身份
                      ----------------- >          再去做响应的处理

  +---------+                                     +---------+
```

<br>

### session的使用
### 1. 安装 & 引入 cookie-session
```js
npm i cookie-session

const cookieSession = require('cookie-session')
```

<br>

### 2. 注册 & 配置Session
### <font color="#C2185B">app.use(cookieSession({配置对象}))</font>

**参数:**  
options: 有关session的配置都可以写在对象中
```js
{
  name: String: 存储在cookie中的 key,
  keys: Array: 类似秘钥,
  maxAge: ms, 整体的过期时间的设置
  // 尽管我们可以在一个空间内存储多个键值对, 这多个键值对都是作为一个标识符保存在cookie中 所以对于cookie来将只有一个键值对, 这一个键值对的过期时间是同一设置的
}
```

**我们可能是通过keys值来去找在服务器端保存的session**

```js 
{
  name: exer_session
  keys: ['1241gv2k1g2y1gvj21vhf']
  maxAge: 1000 * 60 * 60
}
  
// cookie中的键值对的呈现为
// exer_session=eyJuYW1lIjoiZXJpbiIsImFnZSI6MTh9
```

<br>

### 示例:
```js 
app.use(cookieSession({
  name: 'exer_session',
  keys: ['1241gv2k1g2y1gvj21vhf'],
  maxAge: 1000 * 60 * 60
}))
```

<br>

### 设置 session 信息
我们是通过 req 对象设置 session 的

<br>

### <font color="#C2185B">req.session['属性名'] = '值'</font>
```js 
req.session['name'] = 'sam'
req.session.age = 18
```

<br>

### 获取 session 信息
我们是通过 req 对象获取 session 的

<br>

### <font color="#C2185B">req.session['属性名']</font>
```js 
let name = req.session['name']
let age = req.session.age
```

<br>

### 完整示例
```js 
app.get('/set_session', (req, res) => {
  // 设置session数据
  req.session['name'] = 'erin';
  req.session.age = 18;
  res.send('我设置session数据');
})

app.get('/get_session', (req, res) => {
  // 获取session
  let name = req.session['name']
  let age = req.session.age
  console.log(req.session)
  res.send(`我读取了session数据${name}, ${age}`);
})
```

<br>

### 书签

### 案例: 登录成功后可以做一个状态保持
### 要点:
登录成功后 设置一个session 然后跳转到首页
在请求首页的时候 先获取是否有session 如果没有应该怎么样

一个接口中 可能有 get post 的逻辑 我们可以通过 req.method 来进行分发

```js 
  if(req.method === 'POST') {
      // 获取用户填写的用户名和密码
      let {username, password} = req.body;

      if(username === 'sam' && password === '123456') {

          // 状态保持, 在session中保存登录用户名代表用户登录
          req.session['username'] = username

          // 跳转的别的页面 这里不用render()渲染 而是重定向到别的接口, 别的接口有对应的处理逻辑
          res.redirect('/index')
      } else {
          console.log('密码错误')
      }
  }

  app.all('/index', (req,res) => {
      // 看看能不能获取到这个username 如果嫩获取的到 就说明刚才输入对过用户名和密码, 就说明登录过
      let username = req.session['username'];

      // 获取不到表示没有登录 要跳转到首页
      if(!username) {
          res.redirect('/');
      }
  })
```

<br><br>

### 数据库简介
数据库就是用来存储数据的
数据库有以下的特点
1. 持久化存储
2. 读写速度极高
3. 保证数据的有效性
4. 对程序支持性非常好, 容易扩展
内存的读取要比硬盘快 *redis就是内存型的数据库*

<br><br>

### 数据库管理系统和数据库分类

```js                
                                              数据库文件件1
                    SQL                   ↗
    数据库客户端            数据库服务器      
                    网络                   ↘
                                              数据库文件件2

```

数据库管理系统(database management system) 是为管理数据库而设计的软件系统, 包括三大部分构成

1. 数据库文件集合:
      主要是一系列的数据文件, 作用是存储数据

2. 数据库服务端:
      主要负责对数据文件以及文件中的数据进行管理

3. 数据库客户端:
      主要负责和服务器端通信, 想服务器传输数据或者从服务器获取数据
  ```js 
      Mysql 和 Navicat 我们可以通过安装数据库客户端 链接到 数据库服务器 
  ```

他们之间的关系
1. 数据库客户端通过SQL语句告诉服务端, 客户端想要做什么
2. 服务端和数据文件一般都在同一台机器上, 直接可以读写数据文件

关系型数据库中的核心元素
1. 数据行(记录, 称之为一条记录)
2. 数据列(字段)
3. 数据表(数据行的集合)
4. 数据库(数据表的集合)

```js 
  我们可以想象下excel文件
  每一行成为记录
  每一列成为字段
  
  整个excel文件就好比一个数据库, excel文件中的sheet就好比一张张的表
```

<br><br>

### SQL语句
SQL语句的作用是实现数据库 - 客户端 - 服务端之间的通信, 其表现形式为 带有一个格式的字符串

### SQL语句主要分为

### DQL
数据查询语言, 用于对数据进行查询 如 select

### DML
数据操作语言, 对数据进行增加, 修改, 删除 如insert update delete

### DDL
数据定义语言, 进行数据库, 表的管理等 如create drop

### TPL
事务处理语言, 对事务进行处理 包括 begin transaction commit rollback

### DCL
数据控制语言, 进行授权与权限回收, 如grant revoke

对于web程序员来将, 重点是数据的crud, 必须熟练编写DQL DML能够编写DDL完成数据库, 表的操作, 其它语言如TPL DCL CCL了解即可

```
  不区分大小写
```

<br><br>

### Mysql的安装和配置
### 1. 解压
下载解压到自定义目录, 不要出现中文

```js 
  比如: 
  E:\MYSQL\mysql-5.6.41-winx64
  D:\MYSQL\mysql-5.6.41-winx64
```

### 2. 配置文件
my-default.ini文件名修改为 my.ini
复制下面内容, 覆盖到my.ini
```js 
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=D:\MYSQL\mysql-5.6.41-winx64
# 设置mysql数据库的数据的存放目录
datadir=D:\MYSQL\mysql-5.6.41-winx64\data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为utf8
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
```

### 3. 安装
以管理员身份启动 cmd , 进入到mysql的下的bin目录下, 执行
```js 
  e:
  cd MYSQL
  cd bin
```
mysqld --install mysql --defaults-file="D:\MYSQL\mysql-5.6.41-winx64\my.ini"
```js 提示service successfully installed即安装成功```

### 4. 使用
启动 停止 卸载mysql服务的命令

1. 启动:  net start mysql
2. 停止:  net stop mysql
3. 删除:  mysqld -remove
4. 退出:  exit

### 5. 进入到自己的数据库? mysql -uroot -p
```js 
  提示错误的时候这么操作试试
  然后将mysql加入到Windows的服务中 切换到mysql安装目录下的bin文件夹, 
  命令行运行"mysqld --install" 

  C:\Program Files\MySQL\MySQL Server 5.6\bin>mysqld --install
```

### 5. 配置两个环境变量
为了以后方便通过 mysql -uroot -p 就可以连接mysql服务, 使用数据库命令对数据进行操作

  - 新建变量名: MYSQL_HOME
  - 变量值: E:\MYSQL\mysql-5.6.41-winx64

<br><br>

### mysql的使用
首先要先开启服务器(估计现在默认是开启的状态)
net start mysql
```js 遇到错误的话百度下吧 好像要先开启mysql的服务什么的```

然后通过 mysql -uroot -p 进入数据库
```js 
  -u用户名
  -p密码
```


### 常用的数据类型
整数:     int bit(只有0 和 1)
小数:     decimal
字符串:   varchar char text
日期时间: data time datetime
枚举类型: enum

```js 
  枚举就是列举
  比如性别这个字段 没办法确定是男 女 中性等, 所以我们可以用 enum 性别会是这几个中的一个(将可能出现的值列举出来)
```

特别说明的类型如下:
浮点数:   decimal
```js 
  decimal(5, 2)  表示一共存了5位数, 小数占2位, 整数位就有3位
```

固定长度字符串:   char
```js 
  如char(3), 如果填充'ab'时 会补一个空格为'ab '
  如char(3). 如果想保存 hello 只会存 hel
```

可变长度字符串:   varchar
```js 
  varchar(3) 填充'ab'时 就是'ab'
```

对于图片, 音频, 视频等文件, 不存储在数据库中, 而是上传到某个服务器上, 然后在表中存储这个文件的保存路径

字符串 text 表示存储大文本, 当字符大于 4000 时推荐使用, 比如技术博客


### 数据约束
约束本质上是对数据在数据类型限定的基础上添加的额外的要求
常见的约束如下
1. 主键   primary key: 物理上存储的顺序, mysql建议所有表的主键字段都叫id
```js 类型为 int unsigned```

2. 非空   not null:   此字段不允许填写空值, 设置完后必须要该字段的值
3. 惟一   unique:     此字段的值不允许重复
```js 游戏名 的唯一性```
4. 默认   default:    当不填写字段对应的值会使用默认值, 如填写以填写为主
5. 外键   foreign key:
  对关系字段进行约束, 当为关系字段填写值, 会到关联的表中查询此值是否存在如果存在则填写成功, 如果不存在则填写失败并抛出异常

### 约束用来约束字段的, 用来保证数据的有效性和完整性

<br><br>

### mysql命令 操作数据库
sql语句后面需要有分号 ; 结尾

### 链接数据库命令
mysql -u用户名 -p密码
```js mysql -uroot -p 回车```


### 退出数据库
quit / exit / \q


### 显示数据库版本 version
select version();


### 查看当前使用的数据库
select database();


### 查看所有的数据库
show databases;


### 创建数据库
create database 数据库名 charset=utf8;


### 查看创建数据库所使用的命令语句
show create databases 数据库名;


### 使用数据库
use 数据库的名字;


### 删除数据库
drop database 数据库名;


### 查看当前数据库所有表
show tables;


### 创建表
create table 数据表的名字(字段 类型 约束[, 字段 类型 约束]);
```sql
  int unsigned   无符号整形
  auto_increment 表示自动增长跟主键在一起
  not null       表示不能为空
  primary key    表示主键
  default        默认值

  create table test(name varchar(10) not null, age int unsigned);
```


### 查看表的结构 (查看表的字段信息)
desc 数据表的名字


### 查看创建数据表时所使用的命令语句
show create table 表名字;

<br><br>

### 修改表的字段

### 修改表 --- 添加字段
alter table 表名 add 列名 类型 约束;
```sql
  -- 给classes表添加mascot字段
  alter table classes add mascot varchar(50);
```


### 修改表 --- 修改字段: 不重命名版
alter table 表名 modify 列名 类型 约束;
修改字段的时候, 类型是必须写的 约束可以不写
比如我只是要改约束的时候, 也要把类型带上
```sql
  alter table classes modify mascot varchar(100);
```


### 修改表 --- 修改字段: 重命名版
alter table 表名 change 原名 新名 类型 约束;
```sql
  alter table classes change mascot jxw int unsigned;
```


### 修改表 --- 删除字段
alter table 表名 drop 列名;
```sql
  alter table classes drop jxw;
```


### 删除表
drop table 表名;
```sql
  drop table test;
```

<br><br>

### 示例
创建一个班级的表(有 id name 两个字段)
```sql
  create table classes(
      id int unsigned primary key auto_increment, 
      name varchar(30) not null
  );
```


创建一个学生的表(有 id name age high gender cls_id 这些字段)
```sql
  create table students(
      id int unsigned primary key auto_increment, 
      name varchar(30) not null, 
      age int unsigned, high decimal(3,2),  
      gender enum('男', '女', '中性') default '保密', 
      cls_id int unsigned
  );
```

<br><br>

### mysql命令 --- 增 删 改 查

### 插入

### 全列插入
insert into 表名(字段1, 字段2) value(值1, 值2);
```sql
  -- 主键字段 可以用0 null default 来占位,
  -- 字段1 和 值1 对应

  insert into classes(id, name) value(1, 'qd22');
  insert into classes(id, name) value(2, 'qd23');

  -- 如果有auto_increment 给0的时候相当于没有给 所以做了自增 最大的数+1
  insert into classes(id, name) value(0, 'qd24');    

  -- 不写id只有name也会 id也会自增
  insert into classes(name) value('qd24');     
```


### 全部插入
值要跟着当前表的字段依次来
insert into 表名 values(值1, 值2, 值3);
```js 
  // 比如字段是 id name age, 值的顺序就是 id值, name值, age值
  insert into students values(1, '张三', 18, 1.83, 1);
```


### 部分插入
只插入指定字段的信息
没有填写的字段为空, 有默认值的为默认值
insert into 表名(列1, ...) values(值1, ...)
```sql
  insert into students(name) value('李四');
  insert into students(name, age) value('张三', 20);
```


### 多行插入
一个字段内添加多个信息
insert into 表名(列1, ...) values(值), (值);
```sql
  insert into students(name) values('赵六'), ('李四');
```

<br><br>

### 修改 内容
update 表名 set 列1=值1, 列2=值2... where 条件;

### 全部修改 update 表 set 字段=值
把一列的信息统一进行修改
```sql
  -- 将students表的age字段统一修改为16
  update students set age = 16;
```


### 按条件修改 update 表 set 字段=值 where 条件;
修改符合条件的字段里的记录

```sql
  -- 只修改id为3的字段的信息
  update students set age = 16 where id=3; 

  -- 只修改name为赵六的字段的信息
  update students set age = 16 where name='赵六'; 
```


### 按条件修改多个值 update 表 set 字段=值, 字段=值 where 条件;
修改多个字段的记录

```sql
  update students set age = 16, height = 1.55 where id=3; 
```

<br><br>

### 查询

### 查询表中所有字段的信息
select * from 表名;
```js *代表任意字段```

select * from 表名 where 1
```sql
  select * from 表名 where 1 = 1
  -- 条件恒为真, 也是查询所有
```


### 定条件查询
select * from 表名 where 条件
```sql
  -- 查询id为1的学生所有信息
  select * from students where id=1;
```



### 查询指定字段的信息
select 字段1, 字段2, ... from 表名 [where 条件];
```sql 
  -- 查询name age字段的信息
  select name, age from students;

  -- 查询id为1的 name age字段的信息
  select name,age from students where id=1;
```

查询指定表的自定字段
select 表名.字段名1, 表名.字段名2 from 表名;
```sql 
  select students.name, students.age from students;
```


### 使用as为列或表指定别名
在select 和 from 之间使用as 是别名展示在视图上
在from后面使用as 是为了让语句中用到别名

select 字段[as 别名], 字段[as 别名] from 数据表;
在展示表的时候, 给字段名起个别名, 将来以别名来展示 临时使用别名展示指定字段名, 不会影响本身表的结构
```sql
  展示原先的表是这样的
  name    age
  刘春杉  18

  起别名之后展示的效果是这样的
  姓名    年龄
  刘春杉  18

  select name as '姓名', age as '年龄' from students
```

查询的时候给表起别名
select 别名.字段 ... from 表名 as 别名;
```sql
  -- 当查询指定表的指定字段的时候, 我们需要通过
  select students.name, students.age from students;

  -- 这样表名太长的话 我们在查询的时候可以给这个表起个别名
  select s.name, s,age from students as s;
```


### 消除重复行
distinct 字段
展示时 消除该字段的重复的信息
有些时候我们在查询字段里的信息时, 信息会有很多重复的, 我们直接向要几个答案就好
```sql
  select distinct gender from students;

  男
  男
  女
  女

  ↓

  男
  女
```


### 字段的顺序
select 字段1, 字段2 from 表;
展示表的信息的时候, 按照 字段1 字段2的顺序展示

select 字段2, 字段1 from 表;
展示表的信息的时候, 按照 字段2 字段1的顺序展示

```sql
  select name, age from students;
  select age, name from students;
```

<br><br>

### 删除

### 物理删除
不可逆
delete from 表名 where 条件
```sql
  -- 如果不加where 只是 delete from 表名 那么表的信息都没有了
  -- 删除id为4的记录
  delete from students where id=4;
```


### 逻辑删除
用一个字段来表示 这条信息是否已经不能在使用了

```
  数据对于公司来说是很重要的实际上并不会真正从数据库里删除数据
  而是在这条记录的后面 添加一个字段, is_delete 如果是1代表删除 0代表没删除
```

1. 给students表添加一个 is_delete 字段 bit类型
alter table 表名 add 字段 类型 default 默认值;
```sql
  alter table students add is_delete bit default 0;
```

2. 修改指定id的 is_delete 字段
update 表名 set is_delete=1 where id=xxx;
```sql
  update students set is_delete=1 where id=1;
```


### bit类型的展示效果
0 没有任何显示
1 展示一个方框

<br><br>

### 比较运算符 和 逻辑运算符
做开发的查询用的最多
条件写在where的后面

### 条件查询

>>> 比较运算符  
select ... from 表名 where ...

### '>'
```sql
  -- 查询年纪大于18岁的学生信息
  select * from students where age > 18;
```

### '<'
```sql
  -- 查询年纪小于18岁的学生信息
  select * from students where age < 18;
```

### '>='
### '<='
```sql
  -- 查询年纪小于或等于18岁的学生信息
  select * from students where age <= 18;
```

### '='
```sql
  -- 查询年纪小于或等于18岁的学生信息
  select * from students where age = 18;
```

### '!=' 或者'<>'
```sql
  -- 查询年纪不等于18岁的学生信息
  select * from students where age != 18;
  select * from students where age <> 18;
```



>>> 逻辑运算符

### 条件 and 条件  |  between ... and ... (包括两端)
要同时满足 &&

枚举的数据可以用数字来表示, 数字从1开始
```sql
  -- 查询年纪在18 和 28之间的学生信息
  select * from students where age > 18 and age < 28;

  select * from students where age between 18 and 28;


  -- 查询18岁以上的女性的信息
  select * from students where age > 18 and gender='女'

  -- 因为性别的约束是 enum('男', '女', '中性') 所以性别的值对应着 1 2 3
  -- 也可以这么写
  select * from students where age > 18 and gender=2;
```


### or
或者 ||
```sql
  -- 查询 18岁以上 或者 身高高过180(包含)以上的学生信息
  select * from students where age > 18 or height >= 1.80;
```


### not(条件)
表示非, 取反 哈哈
```sql
  -- 不在18岁以上的女性 这个范围内的信息
  select * from students where not(age > 18 and gender=2) 

  -- a b c d e f
  -- age > 18 and gender=2       比如是 abc
  not(age > 18 and gender=2)  就是 def 
```

<br><br>

### 模糊查询
比如网站上的关键字查询, 只要输入 手机 标题里有手机两个字的信息就会展示出来这就属于模糊

模糊查询也是条件所以写在where的后面
where 字段 like 要查询的数据

### like % _
% 替换任意数量的字符
_ 替换一个字符

```sql
  -- 查询姓名中 以'小'开始的名字的学生信息
  select * from students where name like '小%';

  -- 查询姓名中有'小'所有的名字的学生信息
  select * from students where name like '%小%';

  -- 查询有2个字的名字的学生信息
  select * from students where name like '__';

  -- 查询有3个字的名字的学生信息
  select * from students where name like '___';

  -- 查询至少有2个字的名字的学生信息
  select * from students where name like '__%'
```

<br><br>

### 范围查询
也是写在where的后面

### in(1, 3, 8) 不是区间是一个确切的值
```sql
  -- 查询 年龄为 18或34的姓名的学生信息
  select * from students where age = 18 or age = 24;
  select * from students where age in(18, 34);
```

### not in(1, 3, 8)
```sql
  -- 查询 年龄不是 18或34岁 的学生信息
  select * from students where age not in(18, 34);
```

### between... and... 表示在一个连续的范围内
```sql
  -- 查询 年龄在 18到34之间 的学生信息
  select * from students where age between 18 and 34;
```

### not between... and... 表示不在一个连续的范围内
```sql
  -- 查询 年两不在18-34之间的学生信息
  select * from students where age not between 18 and 34;
```

<br><br>

### 空判断

### is null 判空
```sql
  -- 查询身高为空的学生的信息
  select * from students where height is null;
```

### is not null 判非空
```sql
  -- 查询身高为非空的学生的信息
  select * from students where height is not null;
```

<br><br>

### 排序查询
比如淘宝中的按价格查询
写在查询条件的后面(写在已查完的结果后面)

### order by 字段 关键字;
对自定字段进行排序, 默认从小到大

关键字
asc:   从小到大排序, 升序
desc:  从大到小排序, 降序
```sql
  -- 查询年龄在18-34之间的男性, 按照年龄从小到大排序
  -- 我们先按上面的条件进行查找, 在最后在填写排序语法
  select * from students where gender=1 and age between 18 and 34 order by age asc;

  -- 查询年龄在18-34之间的女性, 身高从高到低排序
  select * from students where gender=2 and age between 18 and 34 order by height desc;
```


### order by 字段 desc, 字段 asc
第一排序, 第二排序
一般用在当出现相同的内容的时候, 按照第二排序进行排序
```sql
  -- 查询年龄在18-34之间的女性, 身高从高到低排序, 如果身高相同的情况下按照年龄从小到大排序
  select * from students where gender=2 and age between 18 and 34 order by height desc, age asc;

  -- 如果年龄也一样, 按照id从大到小
  select * from students where gender=2 and age between 18 and 34 order by height desc, age asc, id desc;
```

<br><br>

### 聚合函数
写在select 和 from 之间
select 聚合函数 from

聚合函数在计算的时候不会把null计算进去

聚合函数不能跟where配合使用
要和having 配合使用

聚合函数的括号中一般放字段名或者*

### count(*)
总数
总计指定字段的记录条数, 不会清除重复项
```sql
  -- 查询男性有多少人
  select count(*) from students where gender=1;   

  name
  sam
  erin
  nn

  count(name) // 3
```


### sum()
求和
```sql
  -- 计算所有人的年龄总和
  select sum(age) from students
```


### avg()
```sql
  -- 计算平均年龄
  select avg(age) from students;

  -- 计算平均年龄
  select sum(age)/count(*) from students;
```


### round(目标数字, 保留几位)
四舍五入为指定数字保留指定位数的小数
```sql
  -- 计算所有人的平均年龄 保留2位小数
  select round(avg(age), 2) from students;

```


### max(字段名)
查询指定字段中的最大值
```sql
  -- 查询最大的年龄
  select max(age) from students;

  -- 查询女性的最高 身高
  select max(height) form students where gender=2;
```


### min(字段名)
```sql
  -- 查询女性的最小 身高
  select min(height) form students where gender=2;
```


### 示例:
聚合函数计算的时候不会把null计算进去
就意味着会忽视 null 对应的记录, 去计算别的记录
```sql
  -- 计算男性的平均身高 保留2位小数
  select round(avg(height), 2) from students where gender=1 
```

### 总结:
使用avg(字段) 会忽视null的记录
使用 sum() / count() 的方式 不会忽视null的记录

<br><br>

### 分组查询
有些情况我会想知道男有多少人, 女有多少人, 这就是按性别进行分组查询
select 和 from之间的东西就是要展示在页面上的结果

技巧:
以什么分组, 前面就展示什么东西
```js select 东西 from students group by 东西```
看到每种 或者 每类就可以用分组, 每种每组是关键字眼
以什么为分组, 最好在展示的时候, 把这个字段加进去 放在第一列, 比如以性别分组, 就把性别放在第一列
```sql
  select 性别字段, 其它字段 from students group by 性别字段;
```

### select 分组的字段(展示在页面上的结果) from 表名 group by 分组字段

### group by
会消除重复记录
```sql
  -- 按照性别分组, 查询所有的性别 结果分为了4组
  select gender from students group by gender;

  -- 计算每种性别中的人数, 男性中有多少人 女性中有多少人
  select gender, count(*) from students group by gender;
```


### group_concat(字段名)
写在select 和 from之间
将该字段名所有的内容展示在页面上, 用 , 链接
```sql
  -- 查询 同种性别中的姓名(男都有叫什么名字的 女都有叫什么名字的)
  
  -- 以什么分组就前面就展示什么 这里是以性别分组
  select gender from students group by gender;

  -- 那怎么展示男的都叫什么?
  select gender, group_concat(name) from students group by gender;

  男: 周杰伦, 刘德华, 张学友, 郭富城
  女: 刘琳, 刘贵发
```


```sql
  -- 查询每组性别的平均年龄
  select gender, avg(age) from students group by gender;
```

### having 聚合函数
写在group up的后面

### 对分组 再进行条件限制的时候 用 having
having和group by连用 having后通常也要跟聚合函数
聚合函数如果作为条件出现,只能和having配合, 不能和where配合

```sql
  查询平均超过30岁的性别, 以及姓名
  分析:
  上面是以性别分组查询
  平均超过30岁的是分组的条件

  我们要想页面上需要展示什么 性别和平均年龄吧
  分组的条件是超过30对的平均年龄吧 所以在后面又加上了having avg(age) > 30

  select gender avg(age), group_concat(name) from students group up gender having avg(age) > 30;
```


```sql 
  -- 查询每种性别中的人数多于2个的信息
  select gender, count(*) from students group by gender having count(*) > 2;
```


### 总结 --- 使用条件的有三种情况:
如果是 select * from students 这种形式, 想用条件的话 后面加 where
```sql
  select * from students where
```

如果是 select 分组 from students 这种形式, 想用条件的话 后面加 having
```sql
  select 分组 from students having
```

如果是 select * from 表a inner join 表b 这种形式, 想用条件的话 后面加 on
```sql
  select * from 表a inner join 表b on
```

<br><br>

### 分页查询
不管是电商还是新闻都会有一个列表页存在 就会有一个分页, 第一页有多少条数据, 第二页有多少条数据 

之前我们做案例的时候都是在地址栏传参
xxx.html?curPage=1&perPage=20 之所以这么传参是查数据库的时候需要

curPage=1&perPage=20的意思是 要显示第几页, 每页有多少个 这是查询数据库必须要有的, 这也是前端要传的

### limit
要放在最后面(注意)


### limit 数字
显示前几条记录
当第一个数字为0的时候第一数字可以不写


### limit 数字, 数字
每页分几条记录, 显示第几页
公式:
limit (要显示第几页-1) * 每页分多少个, 每页分多少个

```sql
  -- 查询前5个数据
  select * from students limit 5;

  -- 每页分2个, 要显示第1页 每页2条记录要显示第一页 (查询前2个数据)
  select * from students limit 2;

  -- limit (要显示第几页-1) * 每页分多少个, 每页分多少个
  select * from students limit 0,2;


  -- 每页分2个, 要显示第2页
  select * from students limit 2,2

  -- 每页分2个, 要显示第3页
  select * from students limit 4,2

  -- 每页分2个, 要显示第4页
  select * from students limit 6,2



  -- 每页分2个, 显示第6页的信息, 按照年龄从小到大排序
  select * from students order by age asc limit 10,2

  先写limit还是order by
  京东是先把所有的顺序排一遍再进行分页还是先分页再排一遍顺序
  应该是先整体排好序 然后再进行分页
```

<br><br>

### 链接查询
表与表之间的链接, 为了更好的查处有效数据

classes
+----+----------------+
| id | name           |
+----+----------------+
|  1 | qianduan_01期  |
|  2 | qianduan_02期  |
+----+----------------+

students
+----+-----------+------+--------+--------+--------+-----------+
| id | name      | age  | height | gender | cls_id | is_delete |
+----+-----------+------+--------+--------+--------+-----------+
|  1 | 小明      |   18 | 180.00 | 女     |      1 |           |
|  2 | 小月月    |   18 | 180.00 | 女     |      2 |          |
|  3 | 彭于晏    |   29 | 185.00 | 男     |      1 |           |
|  4 | 刘德华    |   59 | 175.00 | 男     |      2 |          |
|  5 | 黄蓉      |   38 | 160.00 | 女     |      1 |           |
|  6 | 凤姐      |   28 | 150.00 | 保密   |      2 |          |
|  7 | 王祖贤    |   18 | 172.00 | 女     |      1 |          |
|  8 | 周杰伦    |   36 |   NULL | 男     |      1 |           |
|  9 | 程坤      |   27 | 181.00 | 男     |      2 |           |
| 10 | 刘亦菲    |   25 | 166.00 | 女     |      2 |           |
| 11 | 金星      |   33 | 162.00 | 中性   |      3 |          |
| 12 | 静香      |   12 | 180.00 | 女     |      4 |           |
| 13 | 郭靖      |   12 | 170.00 | 男     |      4 |           |
| 14 | 周杰      |   34 | 176.00 | 女     |      5 |           |
+----+-----------+------+--------+--------+--------+-----------+


### inner join ... on 条件
select ... from 表A inner join 表B on 条件
```sql
  on 条件 是为了查询到有效的数据 一定要加吧
```

inner join 得到的是一个新的表
用表A中的第一条记录 和 表B中的每一条记录 拼接在一起
然后表A中的第二条记录 和表B中的每一条记录 拼接在一起 ... 组成一个新的表
```js 
  表A                            表B

  name    age   cls_id           id      name    
  小明    18     1                1      前端_01期
  小月月  18     2                2      前端_02期


  输入:
  select * from students inner join classes;
                          ↓

                  **** 新的表 **** 

  name    age   cls_id           id      name   
  小明    18     1                1      前端_01期 
  小明    18     1                2      前端_02期

  小月月  18     2                1      前端_01期
  小月月  18     2                2      前端_02期

  使用 select * from students inner join classes; 连接后
  有很多的无效信息, 比如小明在前端1期, 但是小明的信息却也跟前端2期链接在一起了, 这个前端2期的链接就是无效的 所以 我们在后面加上 on

  select * from students inner join classes on 条件(用来筛选出有效信息)
  ↓
  select * from students inner join classes on students.cls_id=classes.id
  筛选出 stundents的cls_id 和 classes的id 相等的数据, 这些数据就是有效数据
```

查询 有能够对应 班级的学生 以及 班级信息
```sql   
  select * from students inner join classes on students.cls_id=classes.id;
```

按照要求 仅显示姓名, 班级
```sql
  select students.name, classes.name from students inner join classes on students.cls_id=classes.id;

  学生表的姓名字段是name
  班级表的班级字段是name
  这时候就需要用 表.字段名 来区分


  使用 字段别名的方式 书写代码
  select s.name, c.name from students as s inner join classes as c on s.cls_id=c.id;

  使用 别名 展示在视图上
  select s.name as '姓名', c.name as '班级' from students as s inner join classes as c on s.cls_id=c.id;
```


### 表名.* 展示这个表的所有信息
查询 有能够对应班级的学生以及班级信息, 显示学生的所有信息 students.*,只显示班级名称, classes.name
```sql
  就是学生的信息全部展示, 班级的信息只展示班级字段
  select students.*, classes.name from students inner join classes on students.cls_id=classes.id;
```

在以上的查询中, 将班级名显示在第一列
```sql
  
  掉一下在select 和 from中的字段位置

  select classes.name, students.* from students inner join classes on students.cls_id=classes.id;
```

查询 有能够对应班级的学生以及班级信息, 按照班级名进行排序
```sql
  select classes.name, students.* from students inner join classes on students.cls_id=classes.id order by classes.name asc;
```

当是同一班级的时候, 按照学生的id进行从小到大的排序
```sql
  两个排序规则 order by 条件1, 条件2
  select classes.name, students.* from students inner join classes on students.cls_id=classes.id order by classes.name asc, students.id;
```

<br><br>

### 子查询
一个查询的结果 作为 另外一个查询的一部分 会把前者的查询称为子查询

查询出高于平均身高的信息(height);
```sql
  分 2 步:

  -- 先查出平均身高
  select avg(height) from students;

  -- 然后作为条件来使用
  select * from students where height > (select avg(height) from students);
```

查询学生的班级号能够对应的学生名字
```sql
  select students.name from students where cls_id=1 or cls_id=2;
  select students.name from students where cls_id in(1,2);

  select students.name from students where cls_id in(select id from classes);

  解析 学生表中 有 12345 班级表有12 我们只想要1 2的信息
  所以我们可以这么写
  select students from students where cls_id in(1, 2)
  这样我们就选出了 1 2 都有的信息, 但是 这样写是我们看到表中的345是无效的
  假如我们没看表 那怎么处理? 我们可以把in(写成活的)

  那就选出来 select id from classes 这样就能选中班级表中的id
  然后当做变量也好还是条件也好传进去
  select students from students where cls_id in(select id from classes)
```

需求: 查询平均分低于60分的学生id 和 姓名
需求: 查询平均身高低于160的学生的姓名和id 在1班的

<br><br>

### 使用 mysql模块
如何从服务器程序获取数据库里面的数据
https://github.com/mysqljs/mysql#readme
<!-- 
  // 如果出现连接不上的情况下 依次执行以下的逻辑
  mysql -uroot -p
  alter user 'root'@'localhost' identified with mysql_native_password by '123456';
  flush privileges;
-->

### -- 不用 了解而已
### 1. 安装 mysql包
npm i mysql --save


### 2. 配置下链接数据库的基本信息
  | - db
    - db.js

将db文件夹(里面有db.js文件)放入到项目的根目录
在这里配置下链接数据库的基本信息 用户名 地址 密码 数据库名称等 并将 query 暴露出去

```js 
const mysql = require("mysql")

const pool = mysql.createPool({
host: "localhost",
port: 3306,
user: "root",
password: "123456",
database: "atguigudb",

// 以下可选
connectionLimit: 5
})

// 对数据库进行增删改查操作的基础
function query(sql, callback) {
pool.getConnection(function(err, connection) {

  // 参数1: sql, 参数2: 回调 -- 查询方法
  connection.query(sql, function(err, rows) {
    callback(err, rows)
    connection.release()
  })
})
}

exports.query = query
```

query(sql, callback)
参数1是sql语句, 参数2是回调函数(拿到数据之后做什么事情)

callback中也是两个参数
err 和 rows(就是数据库中的每一条记录)


### 3. 在入口js文件中, 引入db.js文件
```js 
  const db = require('./db/db.js');
```

### 4. 在路由接口里面调用 db.query(sql语句, callback)
```js
db.query('select * from students', (err, data) => {
  console.log(data)
})
```

回调函数中的data就是从数据库取出来的数据, 是一个数组, 每一条记录就是其中的对象
要是想获取第一个对象 data[0].name
```js 
  data = [
      RowDataPacket {
        id: 1,
        name: '小明',
        age: 18,
        height: 180,
        gender: '女',
        cls_id: 1,
        is_delete: <Buffer 00>
      },
      RowDataPacket {
        id: 2,
        name: '小月月',  
        age: 18,
        height: 180,
        gender: '女',
        cls_id: 2,
        is_delete: <Buffer 01>
      }
  ]
```

### 完整代码:
```js 
// 1. 搭建服务器
const express = require('express');
const db = require('./db/db.js');

const app = express();

app.get('/get_data', (req, res) => {

// db.query() 就是服务器和数据库之间的接口
// 在这里查询数据库返回到浏览器(链接数据库 取出数据库里面的数据 返回到浏览器上);

db.query('select * from students', (err, data) => {
  console.log(data);  // 这个data就是在数据库中查出来的
  res.send(data);
})
})

app.listen(3000, () => {
console.log('3000端口已打开');
})
```

<br><br>

### mysql连接池技术详解 -- 不用 了解而已
我们先看下 官网上的连接池 的示例代码

1. 下载 mysql 模块
2. 引入 mysql
3. 创建连接池对象
4. 获取连接池中的链接
5. 调用链接上的方法

db.js
```js
// 2. 引入mysql模块
var mysql = require('mysql');

// 3. 创建连接池对象 传入数据库参数
var pool  = mysql.createPool({
connectionLimit : 10,
host: 'example.org',
user: 'bob',
password: 'secret',
database: 'my_db'
});

// 4. 获取连接池中的链接
pool.getConnection(function(err, connection) {
if (err) throw err; 

// 5. 在连接上执行 sql语句
connection.query('SELECT something FROM sometable', function (error, results, fields) {
  connection.release();

  if (error) throw error;

});
});
```

### pool.getgetConnection(回调)
通过连接池对象 获取链接

参数:
(err, connection) => { ... }
err: 
  错误对象

*connection*
  连接对象


### pool.releaseConnection()
释放连接
连接池对象身上的方法

### 形式1
### connection.query(sql, callback)
通过连接对象调用的方法

参数:
1. sql
2. (err, results, fields) => {}
err:
错误

results:
结果

fields:
字段
```js
connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {

})
```


### 形式2
### connection.query(sql, params, callback)
params 是在有占位符的时候使用
它的类型是一个数组
```js
connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
})
```

### 形式3
### connection.query({options}, callback)
在查询时候使用各种高级选项的时候使用
```js
connection.query({
sql: 'SELECT * FROM `books` WHERE `author` = ?',
timeout: 40000, // 40s
values: ['David']
}, function (error, results, fields) {

});
```

### connection.release()
释放连接

<br><br>

以上是官网上的示例代码 接下来我们对上述的 4 5 步骤 进行下封装后使用

### 要点:
我们封装一个 query() 方法 在该方法中的逻辑

参数:
sql: 
params: [] 查询不需要参数
callback: 由调度者决定如何使用数据

```js
var mysql = require('mysql');

var pool  = mysql.createPool({
connectionLimit : 10,
host: 'example.org',
user: 'bob',
password: 'secret',
database: 'my_db'
});

// 封装 操作数据库的方法 params 是我们传递
const query = (sql, params, callback) => {
  // 获取链接
  pool.getConnection((err, conn) => {
      // 如果有错误 释放连接
      if(err) {
          console.log("连接mysql失败")

          // 如果有错误的话 关闭连接 -- 这个不一定对哦
          pool.releaseConnection()

          // 下面的方式也可以吧
          throw err
      }

      // 连接成功的话 调用链接对象身上的query()
      conn.query(sql, params, (err, data, fields) => {
          if(err) {
              // 如果有错误就释放连接
              conn.release()
              console.log("执行sql失败")
              return
          }

          // 将怎么使用data的逻辑 放在回调里面 由调用者决定
          callback && callback(data, fields)
          conn.release()
      })

  })
}
```

测试下
```js
// 测试下
let sql = "select * from employees where employee_id = 100"

// 查询语句不需要参数
let params = []

query(sql, params, function(data, fields) {
console.log(data[0].last_name)
})
```

<br><br>

### 我们使用这个 mysql.js 操作数据库
**老师还自己封装了一个 mysql.js 文件**
也就是我们以后使用的话 可以直接拿这个文件来用
这个部分还包括了事务的处理

mysql
```js
const mysql = require('mysql');

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "atguigudb"
});

pool.on('connection', (connection) => {
  //logger.info("connection!");
});

pool.on('enqueue', () => {
  //logger.info('Waiting for available connection slot');
});

module.exports.Pool = pool;

module.exports.getConnection = (cb) => {
  if (typeof cb == "function") {
      pool.getConnection(function (err, connection) {
          cb(err, connection);
      });
  } else {
      return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(connection);
              }
          });
      });
  }
};

// 查询方法 如果不传递 cb 那么就是promise形式
module.exports.exec = (sql, values, cb) => {
  if (typeof cb == "function") {
      pool.getConnection((err, connection) => {
          if (err) {
              connection.release();
              cb(err);
          } else {
              connection.query(sql, values, (error, rows) => {
                  connection.release();
                  cb(error, rows);
              });
          }
      });
  } else {
      return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
              if (err) {
                  connection.release();
                  reject(err);
              } else {
                  connection.query(sql, values, (error, rows) => {
                      connection.release();
                      if (error)
                          reject(error);
                      else
                          resolve(rows);
                  });
              }
          });
      });
  }
};


module.exports.beginTransaction = (connection, cb) => {
  if (typeof cb == "function") {
      connection.beginTransaction(function (err) {
          if (err) {
              throw err;
          }
          cb(null, connection);
      });
  } else {
      return new Promise((resolve, reject) => {
          connection.beginTransaction(function (err) {
              if (err) {
                  reject(err);
              } else {
                  resolve(connection);
              }
          });
      });
  }
};


module.exports.rollback = (connection, cb) => {
  if (typeof cb == "function") {
      connection.rollback(function () {
          connection.release();
          cb && cb();
      });
  } else {
      return new Promise((resolve, reject) => {
          connection.rollback(function (err) {
              connection.release();
              if (err) {
                  reject(err);
              } else {
                  resolve();
              }
          });
      });
  }
};


module.exports.commit = (connection, cb) => {
  if (typeof cb == "function") {
      connection.commit(function (err) {
          if (err) {
              connection.rollback(function () {
                  cb && cb(err);
                  throw err;
              });
          }
          connection.release();
          cb && cb();
      });
  } else {
      return new Promise((resolve, reject) => {
          connection.commit(function (err) {
              if (err) {
                  connection.rollback(function () {
                      reject(err);
                  });
              }
              connection.release();
              resolve();
          });
      });
  }
};
//检查是否链接失败
this.getConnection((err, connection) => {
  if (err) throw err;
  else {
      // logger.info("connected success!");
      connection.release();
  }
});

/**
 * 带事务
 * @param sql
 * @param values
 * @returns {Promise}
 */
module.exports.exec2 = (connection, sql, values, cb) => {
  if (typeof cb == "function") {
      connection.query(sql, values, (error, rows) => {
          cb(error, rows);
      });
  } else {
      return new Promise((resolve, reject) => {
          connection.query(sql, values, (error, rows) => {
              if (error)
                  reject(error);
              else
                  resolve(rows);
          });
      });
  }
};

```

### 使用 *占位符* 参数 来测试下
1. 获取query参数
2. 整理 占位符参数
3. sql 的写法 占位符后面要加 sql的; 老师说 ? + 空格 + ; 
4. 使用 res.json() 将对象送回前端

测试下:
```js
const express = require("express")
const db = require("./db/mysql")
const app = express()

app.get("/", async (req, res) => {
// 获取 query 参数
let {id} = req.query

// 因为使用了占位符 所以要使用 params
let params = [id]

let ret = await db.exec("select * from employees where employee_id = ? ;", params)
console.log(ret)

res.json(ret)
// res.send(ret)
})

app.listen(3333, () => {
console.log("服务器已开启 监听端口3333")
})
```


### 使用 *占位符* 的分页查询
```js
// 分页的接口
app.get("/getUserPage", async (req, res) => {

// 获取分页需要的数据
let {pageSize, pageNo} = req.query

pageSize = pageSize ? pageSize : 1
pageNo = pageNo ? pageNo : 1


// limit (要显示第几页-1) * 每页分多少个, 每页分多少个
let sql = "select * from employees limit ?, ?;"
let params = [(pageNo - 1) * pageSize, pageSize]
console.log(params)

let ret = await db.exec(sql, params)

res.json({
  code: 200, 
  data: ret,
  msg: "查询成功"
})

})
```

<br><br>

### 数据安全的3把锁
1. 前端发送到后台的时候 通过表单验证
2. 后台接收前端数据的时候 判断空值 赋默认值 判断是否合法
3. 数据库端的校验

<br><br>

### 搭建一个带数据库操作的后台项目

  | - config
    - index.js    (配置文件)
  
  | - controller
    - account.js  (对应数据库中的一张表 类)

  | - routes      
    - account.js  (对应数据库中的一张表 路由)

  | - db
    - mysql.js    (操作数据库的)

  - main.js       (入口文件)

也就是说 数据库中的一张表 对应 controller 里面的一个类
而路由文件也是按照 数据库表来区分的 一张表对应一套功能 一套路由规则

### config
```js
module.exports = {
dev: {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "atguigudb"
},
tokenKey: "youker.net",
// 密码盐
key: "asdfa"
}
```

### mysql.js
```js
...

const pool = mysql.createPool(require("../config").dev);

...
```


### routes/account.js
这里是按照表名来分路由文件的 一张表对应一套功能和接口
这里和java有些像

```js
const express = require("express")
let router = express.Router()

// 后面接的是 controller/account.js 中的方法

// 登录
router.post("/login", require("../controller/account").login);

//注册
router.post("/register", require("../controller/account").register);

module.exports = router
```


### controller/account.js
数据库中的一张表 对应 这里的一个js文件 这里跟表名对应上 通过 routes 和 controller 内的文件名也是一一对应的

一张表就对应一个类

### 使用 md5 加密
md5(req.body.pwd + require("../config").key)

### 使用 jwt 颁发 token
npm i jwt-simple

### 使用 monent.js 格式化日期

```js
const db = require("../db/mysql")
const moment = require("moment")

// md5加密
const md5 = require("md5")

// jwt
const jwt = require("jwt-simple")

class AccountController {

  // 注册
  async register(req, res, next) {

      // 获取前端提供的参数 给params赋值
      let {
          name, 
          pwd, 
          sex
      } = req.body

      sex = sex ? sex : "男"
      
      let date = moment().format("YYYY-MM-DD HH:mm:ss")

      // id自增长没写 state有默认值没写
      let sql = "insert into users(`u_name`, `u_pwd`, `u_sex`, `u_create`) values(?, ?, ?, ?)"

      // 通过前端的参数 整合占位符参数
      let params = [name, pwd, sex, date]

      try {
          let ret = await db.exec(sql, params)

          // 判断 sql后受影响的行数ret.affectedRows
          if(ret && ret.affectedRows > 0) {
              res.json({
                  code: 200,
                  msg: "注册成功",
              })
          // 这里是sql的错误
          } else {
              res.json({
                  code: -200,
                  msg: "注册失败",
              })
          }
      // 这里是服务器的错误
      } catch(err) {
          res.json({
              code: -200,
              msg: "服务器异常",
              err
          })
      }
      
  }

  // 登录
  async login(req, res, next) {

      let sql = "select u_id, u_name, u_sex, u_create, u_pwd from where u_name = ? and u_pwd = ? and u_state = 1"

      let params = [
          req.body.name,
          req.body.pwd,
      ]

      let ret = await db.exec(sql, params)

      // 数据库可能会发生问题
      try {
          if(ret && ret.length >= 1) {
              res.json({
                  code: 200,
                  msg: "登录成功",

                  // 登录成功后才有数据
                  data: ret[0],

                  // 登录成功的时候发token 根据用户生成token
                  token: createToken(ret[0])
              })
          } else {
              res.json({
                  code: -200,
                  msg: "登录失败",
              })
          }
      } catch (err) {
          res.json({
              code: -200,
              msg: "服务器",
              err
          })
      }

      // 根据数据生成 token 的函数
      function createToken(data) {

          // return 出去的是一个字符串
          return jwt.encode({
              // 获取当前时间 + 1天
              exp: Date.now() + (1000 * 60 * 60 * 24),
              info: data
          // 加盐 我们定义在config里面
          }, require("../config").tokenKey)
      }
  }
}

// 这边 我们暴露下 该类的实例对象 routes 文件就 接收的就是实例对象 可以直接 对象.方法
module.exports = new AccountController()
```


### main.js
app.use("/account", require("./routes/account"))
也相当于配置了一级路由 跟servlet那比较像 client maganer 似的

```js
const express = require("express")
const app = express()

// 引入中间件 解析body参数
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 注册路由 以 /account 开头的路径 才能访问后面的路由文件
app.use("/account", require("./routes/account"))

app.listen(3333, () => {
  console.log("服务器已开启")
})
```

<br><br>

### orm介绍
orm全拼 object relation mapping 对象 - 关系映射
主要实现 *模型对象 => 关系数据库数据 映射*

比如: 
把数据库表称之为模型
每条记录映射为一个模型对象一条记录称之为模型对象, 字段映射为属性
<!-- 
  users -> 模型
  rows  -> 模型对象

  rows.fields -> 模型对象.属性
-->

这样再去修改表中的记录, 就相当于通过对象的方式去修改里面的属性

### 优点:
1. 只需要面向对象编程, 不需要面向数据库编写代码
2. 对数据库的操作都转化成对类属性和方法的操作(调用对象的方法 编写对象的属性)
3. 不用编写各种数据库的sql语句
4. 实现了数据模型与数据库的解耦, 屏蔽了不同数据库操作上的差异
5. 不再关注用的是mysql oracle等(不同的数据库sql语法不完全一致)
6. 通过简单的配置就可以轻松更换数据库, 而不需要修改代码

### 缺点:
1. 相比较直接使用sql语句操作数据库, 有性能上的损失
```js 
  orm是封装的 里面有一部分代码是用来将sql语句转换成对象的思想, 这部分代码就会消耗我们的性能
```

2. 根据对象的操作转换成sql语句, 根据查询的结果转化为对象, 在映射过程中有性能的损失

3. 有局限性, orm中没有提供的查询功能需要会sql语句

### 总结:
为什么都各种性能上的损失还要用它, 因为开发效率快, 维护起来也方便 利大于弊

<br><br>

### 使用orm获取数据库里面的数据
### 1. 将nodejs-orm文件夹(index.js文件)放到db文件夹下

### 2. orm的index.js里面要填写数据库的链接设置 和 引入 'mysql' 包
要操作哪个数据库就要写哪个数据库

```js 
  const mysql = require('mysql');

  // 数据库连接设置
  let orm_config = {
      host: 'localhost',//数据库地址
      port:'3306',
      user: 'root',//用户名, 没有可不填
      password: '',//密码, 没有可不填

      // 重要 要操作哪个数据库 就写哪个
      database: 'qianduan_test'
  }

  ...

  module.exports = orm;
```

orm的index.js文件内容如下: *折叠了*
```js
const mysql = require('mysql');
// 数据库连接设置
let orm_config = {
  host: 'localhost',//数据库地址
  port:'3306',
  user: 'root',//用户名, 没有可不填
  password: '',//密码, 没有可不填
  database: 'news'//数据库名称
}

let options = {};
let tableSQL = '';
let isConnect = false;

function Model(name, option) {
  this.name = name;
  this.option = option;
};

/**
* @description: 查询数据
* @param {} options: 可选参数
* @param {Function} callback :(req,results)=>{}
*/
Model.prototype.find = function (options, callback) {
  if (!isConnect) {
      console.log(options.constructor);
      this.connect(err => {
          isConnect = true;
          var str = '';
          if (!callback) {
              str = `select * from ${this.name}`;
              callback = options;
          }else if (options.constructor == Array) {
              str = `select ${options.join()} from ${this.name}`;
          }else if(options.constructor == Object){
              str = `select ${options.arr.join()} from ${this.name} where ${options.where}`;
          }else {
              str = `select * from ${this.name} where ${options}`;
          };
          //console.log(str);
          connection.query(str, (error, results, fields) => {
              callback(error, results, fields);
          });
          return this;
      })
  } else {
      
      var str = '';
      if (!callback) {
          str = `select * from ${this.name}`;
          callback = options;
      } else if (options.constructor == Array) {
          str = `select ${options.join()} from ${this.name}`;
      } else {
          str = `select * from ${this.name} where ${options}`;
      };
      //console.log(str);
      connection.query(str, (error, results, fields) => {
          callback(error, results, fields);
      });
      return this;
  }

};

/**
* @description: 分页查询
* @param {Object} options :   { where:查询条件, number: 当前页数 , count : 每页数量 }
* @return: 
*/
Model.prototype.limit = function (options, callback) {
  var str = '';
  if (!options.where) {
      str = `select * from ${this.name} limit ${(options.number - 1) * options.count},${options.count}`;
  } else {
      str = str = `select * from ${this.name} where ${options.where} limit ${(options.number - 1) * options.count},${options.count}`;
  };
  console.log(str);
  connection.query(str, (error, results, fields) => {
      callback(error, results, fields);
  });
  return this;
};

/**
* @description: 插入数据
* @param {Object} obj:对象或者数组
* @param {Function} callback :(req,results)=>{}
*/
Model.prototype.insert = function (obj, callback) {
  if (!isConnect) {
      this.connect(err => {
          if (err) {
              throw err;
          } else {
              connection.query(tableSQL, (error, results, fields) => {
                  if (Array.isArray(obj)) {
                      for (var i = 0; i < obj.length; i++) {
                          this.insertObj(obj[i], callback)
                      }
                  } else {
                      this.insertObj(obj, callback)
                  }
              });

          }
      });
  } else {
      if (Array.isArray(obj)) {
          for (var i = 0; i < obj.length; i++) {
              this.insertObj(obj[i], callback)
          }
      } else {
          this.insertObj(obj, callback)
      }
  }

};

Model.prototype.insertObj = function (obj, callback) {
  let keys = [];
  let values = '';
  for (var key in obj) {
      keys.push(key);
      values += `"${obj[key]}",`;
  };
  values = values.replace(/,$/, '');
  let str = `INSERT INTO ${this.name} (${keys.join()}) VALUES (${values})`;
  connection.query(str, (error, results, fields) => {
      callback(error, results);
  });
}

/**
* @description: 更新数据
* @param {Object} option: 可选参数 更新条件
* @param {Object} obj:  修改后的数据 
* @param {Function} callback :(req,results)=>{}
*/
Model.prototype.update = function (option, obj, callback) {
  let str = '';
  if (arguments.length == 2) {
      callback = obj;
      obj = option;
      str = `UPDATE ${this.name} SET `;
      for (var key in obj) {
          str += `${key}='${obj[key]}', `;
      };
      str = str.replace(/(, )$/, '');
  } else {
      str = `UPDATE ${this.name} SET `;
      for (var key in obj) {
          str += `${key}='${obj[key]}', `;
      };
      str = str.replace(/(, )$/, '');
      str += ` where ${option}`;
  };

  console.log(str);
  connection.query(str, (error, results, fields) => {
      callback(error, results, fields);
  });
  return this;

};

/**
* @description: 删除数据
* @param {Object} option: 可选参数 删除条件
* @param {Function} callback :(req,results)=>{}
*/
Model.prototype.delete = function (option, callback) {
  var str = '';
  if (!callback) {
      str = `delete from ${this.name}`;
      callback = option;
  } else {
      str = `delete from ${this.name} where ${option}`;
  };
  console.log(str);
  connection.query(str, (error, results, fields) => {
      callback(error, results, fields);
  });
  return this;
};

/**
* @description: 执行sql语句
* @param {String} str : sql语句
* @param {Function} callback :(req,results)=>{}
*/
Model.prototype.sql = function (str, callback) {
  connection.query(str, (error, results, fields) => {
      callback(error, results, fields);
  });
  return this;
};

/**
* @description: 删除model表格 (慎用！)
* @param {type} 
* @return: 
*/
Model.prototype.drop = function (callback) {
  connection.query(`DROP TABLE ${this.name}`, (error, results, fields) => {
      callback(error, results, fields);
  });
  return this;
};

//连接检测
Model.prototype.connect = function (callback) {
  let p1 = new Promise((resolve, reject) => {
      connection.connect((err) => {
          if (err) {
              //console.log(err.stack);
              //console.log(err);//42000 数据库不存在  28000账号错误
              //console.log(err.sqlState);//42000 数据库不存在  28000账号错误
              reject(err);
          } else {
              resolve();
          }
      });
  });

  p1.then(() => {
      callback(null);
  }, err => {
      if (err.sqlState == 42000) {
          createDatabase(callback);
      } else if (err.sqlState == 28000) {
          callback('数据库账号或密码错误');
      } else {
          callback(err);
      }
  });
};

//创建数据库
let createDatabase = function (callback) {
  let p2 = new Promise((resolve, reject) => {
      connection = mysql.createConnection({
          host: options.host,//数据库地址
          port: options.port,//端口号
          user: options.user,//用户名, 没有可不填
          password: options.password,//密码, 没有可不填
      });
      connection.connect((err) => {
          //if (err) throw error;
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });

  let p3 = new Promise((resolve, reject) => {
      connection.query(`CREATE DATABASE ${options.database}`, (err, results, fields) => {
          //if (error) throw error;
          if (err) {
              reject(err);
          } else {
              resolve();
          }

      });
  });

  let p4 = new Promise((resolve, reject) => {
      connection.query(`use ${options.database}`, (err, results, fields) => {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });

  let pAll = Promise.all([p2, p3, p4]);

  pAll.then(() => {
      callback(null);
  }).catch((err) => {
      callback(err);
  });
}



let orm = {
  /**
  * @description:连接数据库
  * @param {String} host: 主机名 默认localhost
  * @param {Number} port: 端口号 默认3306
  * @param {String} user: 用户名 
  * @param {String} password: 密码 
  * @param {String} database: 数据库名称 默认og
  * @return: 
  */
  connect: function ({ host = 'localhost', port = 3306, user = '', password = '', database = 'og' }) {
      databaseName = database;//全局存储当前数据库名称

      options = {
          host,//数据库地址
          port,//端口号
          user,//用户名, 没有可不填
          password,//密码, 没有可不填
          database//数据库名称
      };
      connection = mysql.createConnection(options);

  },
  /**
  * @description:创建model (表格模型对象)
  * @param {String} name:表格名称
  * @param {Object} options:表格数据结构
  * @return: Model对象: 负责数据库增删改查
  */
  model: function (name, options) {
      let str = 'id int primary key auto_increment, ';
      for (var key in options) {
          if (options[key] == Number) {
              str += `${key} numeric,`;
          } else if (options[key] == Date) {
              str += `${key} timestamp,`;
          } else {
              str += `${key} varchar(255),`;
          }
      };
      str = str.replace(/,$/, '');
      //console.log(`CREATE TABLE ${name} (${str})`);
      //console.log(str);
      tableSQL = `CREATE TABLE ${name} (${str})`;
      return new Model(name, options);
  }
};

orm.connect(orm_config);



module.exports = orm;
```

### 3. 入口js文件里面引入orm的index.js文件
```js 
  const db = require('./db/nodejs-orm/index');
```


### orm获取数据库里面数据的使用方式:
在路由接口里面写哈


### 1. 创建模型 db.model('表名')
let Students = db.model('students')
需要操作哪一个数据表, 通过创建出来了的Students对象来进行一系列的增删改查

返回值: 
表对象


### 2. Students.find([字段], callback)
find()为查询 相当于(select * from students)
不指定条件的情况下 默认查询数据库中指定表的所有内容 

参数:
1. 是一个数组, 可以指定查询的字段名, 不填写的话就是查询所有
2. callback有两个参数 err data, data就是从数据中查询到的数据

### 完整代码:
```js 
  
app.get('/get_data', (req, res) => {

// 1. 创建模型: 需要操作哪一个数据表, 通过创建出来了的Students对象来进行一系列的增删改查
let Students = db.model('students')

Students.find(['name', 'age'], (err, data) => {

  res.send(data);

})
})
```

<br><br>

### 使用ORM查询操作
使用 orm 的准备工作, 这里在重新写一下

```js 
  1. 引入
  const db = require('./db/nodejs-orm/index');

  2. 根据目标表创建对象 db.module('表名')
  let Students = db.model('students')

  3. 使用表对象的find()
```

### 查询
### 表对象.find(['字段'] | '条件', callback);
参数
1. 
1.1 是一个数组, 可以指定查询的字段名, 不填写的话就是查询所有
```js 相当于: (select * from students)```

1.2 是一个字符串, 里面写条件
```js 相当于: where 后面所写的条件```

1.3 是一个对象 既要设定条件, 又要指定字段名
```js 
  {
      where: '条件',
      arr: ['字段名1', '字段名2']
  }
```

2. callback有两个参数 err data, data就是从数据中查询到的数据

```js 
  // 1. 查询所有
  Students.find((err, data) => {
      res.send(data);
  })

  // 2. 查询指定字段名 第一个参数是数组(数组中的每一个元素就是字段名)
  Students.find(['name', 'age'], (err, data) => {
      res.send(data);
  })

  // 3. 按照条件查询 第一个参数是字符串 写where后面的条件
  Students.find('age > 18 and age < 34', (err, data) => {
      res.send(data);
  })

  Students.find('name="小月月"', (err, data) => { })


  // 4. 既指定条件 又指定字段名
  Students.find({
      where: 'age > 18',
      arr: ['name', 'age']
  }, (err, data) => { })
```

<br><br>

### 使用ORM分页操作

### 分页
### 表对象.limit({}, callback)
分页显示
参数:
1. { }
```js 
  {
      where: 'age> 18',   // 条件 可选  值是字符串
      number: 1,          // 要的是第几页
      count:  5           // 每页的条数

      // 这里不用 用公式去算, 填写的就是最终的结果
  }
```

2. 回调 err data(result)
```js 
  // 无条件版, 直接是第几页 每页显示多少条
  Students.limit({number:1, count:5}, (err, data) => {
      res.send(data);
  })

  // 有条件版
  Students.limit({where:'age>18', number:1, count:2}, (err, data) => {
      res.send(data);
  })
```

<br><br>

### 使用ORM增加数据
orm的使用是基于mysql的, 假如没有安装记得安装mysql

增加单条记录, insert 对象参数, 属性就是列名

### 表对象.insert({'字段名':'值'}, (err, results) => { ... })
参数:
1. 第一个参数是 { }   -- 添加一条数据
1. 第一个参数是 [ ]   -- 添加多条数据, 数组中每一个对象就是一条记录
2. callback
  - 2.1 err
  - 2.2 results
  加进去的数据的结果, 在结果(结果是一个对象)中 "insertId": 15 这个最为重要
```js    
  results对象: 

  { 
    "fieldCount": 0, 
    "affectedRows": 1, 
    "insertId": 15,       // 刚才插入进去新数据的id
    "serverStatus": 2, 
    "warningCount": 0, 
    "message": "", 
    "protocol41": true, 
    "changedRows": 0 
  }
```
示例:
```js 
  let Students = db.model('students');
  Students.insert({ name: 'sam', age: 18 }, (err, results) => {
      res.send(results);
  })
```


增加多个数据, insert 数组参数, 元素为对象, 属性就是列名
注意, 添加多条数据, 不能把结果(results)直接响应回浏览器会报错
```js Cannot set headers after they are sent to the client```
我们直接res.send('添加成功了'); 给自己看的

```js 
  let students = db.model('students');
  students.insert([{name:'erin'}, {name:'NN'}], (err,results) => {
      console.log('添加成功了')
  })
```

<br><br>

### 使用ORM删除数据(物理删除 慎用)
按条件删除记录 delete, 字符串参数

### 表对象.delete('条件', (err, results) => { ... })
参数:
1. 字符串 里面放条件, 就会按条件删除 (相当于 where 后面的 条件)
1. 不写第一个参数就是清空这个表

```js 
  // 按条件删除 第一个参数是 字符串 里面写条件
  let students = db.model('students');
  students.delete('id=15', (err, results) => {
      console.log(results);
      res.send('ok')
  })

  // 第一个参数不写就是清空
  students.delete((err, results) => {
      console.log(results);
      res.send('ok')
  })
```

<br><br>

### 使用ORM修改数据(可以用来软删除哦)
### 表对象.update({ K:v }, (err, results) => { ... })
### 表对象.update('条件', { K:v }, (err, results) => { ... })

参数:
1. 参数1如果是 对象 {'字段名':'要修改成的值'}
将指定字段名的记录, 统一修改为 指定的值
```js 
  students.update({age:10}, (err, results) => {
      console.log(results);
  })
```

1. 参数1如果是 字符串 '条件'
将符合条件的 字段名中的值 修改为 要修改的值
```js 
  将id为1的人 的 年龄 修改为 10
  students.update('id=1', {age:10}, (err, results) => {
      console.log(results);
  })
```

<br><br>

### 自定义执行sql语句
当上面的功能满足不了需求的时候, 直接使用自定义执行 sql语句的方式

### 表对象.sql('sql语句', (err, data) => { ... })

使用sql语句操作数据库
```js 
let students = db.model('students');
students.sql('select * from students limit 10', (err, data) => {
  res.send(data)
})
```

<br><br>

### 多次查询数据库的最终方案 async + await 版本 
一个接口中, 往往不止要查询一次数据库, 就意味着可能会出现第一次查询成功后再去查询下一次数据库, 这就意味着可能会出现回调地狱的情况, 为了避免这样的情况发生, 我们可以配合 async + await 来使用

```js 
  比如:
  用户名登录, 取得前端传递过来的post参数(用户名 密码)
  后端拿到用户名 和 密码后会查询一遍数据库, 用户名是不是已经登录了

  如果已经注册了 会校验用户名和密码是否正确(用户名和密码和数据库是否匹配) 所以也需要查询数据库

  所以一个接口里面可能会涉及到查询多次数据库

  上面还有一个规律, 往往是上一次查询结果通过了 才会查询第二次数据库, 就意味这种情况是回调里面嵌套回调

  // 所以我们可以选择更好的方式来执行这样的代码
  let students = db.model('students');
  students.find('id=1', (err, data) => {
      students.find('id=2', (err, data) => {

      })
  })
```

使用async + await 就不会出现回调地狱, 将异步代码的格式 写成了 同步代码的格式

### 技巧: 
我们在使用 async + await 的时候 我们可以用 匿名函数自调用的形式 来避免 还要调用函数

为了更好的理解 我们先复习下async + await
1. await 要写在 async 函数内部, 并且 async需要调用
2. await 后面要跟 promise的实例对象
```js 
  // 可以使用匿名函数自调用的形式
  (async function() {
      await Promise的实例对象
  })()
```

3. await的返回值就是 promise实例对象的resolve的结果(reject的结果)
```js 
  (async function() {

      // result就是promise实例对象的结果 可能是成功的结果 或者 失败的结果
      let result = await Promise的实例对象
  })()
```

4. 有了async + await后就不会使用then来获取成功的结果了


### 完整代码
```js 
  app.get('/', (req, res) => {

      (async function() {

          let students = db.model('students');

          // result就是resolve的结果, 
          let result = await new Promise((resolve, reject) => {
              students.find('id=1', (err, data) => {

                  // 如果读取数据库失败 就通过reject把err错误对象传递出去
                  if(err) {reject(err)};

                  // 如果成功
                  resolve(data);
              })
          })

          res.send(result);


          // 我们可以向同步一样接着读取数据库
          let result2 = await new Promise((resolve, reject) => { ... })
      })()
  })
```

<br><br>

### 对上面的章节的补充 --- 捕获异常的版本
### try { ... } catch(err) { ... }
上面的例子中, 如果读取数据库失败result的结果就是err的错误对象, 但是上面的例子中并没有对错误进行处理, 而是响应回页面了, 这里我们说下捕获异常
```js 
  上面的reject(err) 并不是捕获异常, 而只是通过reject(err) 把err传递给result 并不算处理
```

为什么要捕获异常, 因为报错会使整个js程序崩掉, 所以我们要捕获异常

我们使用 try { ... } catch(err) { ... } 的方式
```js 
  (async function() {

      let students = db.model('students');
      
      // 因为块级作用域的原因 我们把这个变量拿到外面来定义
      let result;

      try {
          result = await new Promise((resolve, reject) => {
              students.find('id=1', (err, data) => {
                  if(err) {reject(err)};
                  resolve(data);
              })
          })

      } catch(err) {
          console.log(err);
          res.send({errMsg: '数据库查询出错'})
          return;
      }

      res.send(result);
  })()
```

<br><br>

### 对上面的章节的补充 --- 封装handleDB函数
上面的章节中, 为了避免发生错误使整个js崩掉, 我们使用了捕获异常的方法, 但上面的章节里 也仅仅是完成了一次的数据库查询, 我们说过, 一个接口中可能需要查询多次数据库

当多次数据库查询操作的时候 会出现很多的重复性代码, 所以我们对数据库的查询操作可以封装成一个函数
```js 
  // 当多次查询数据库的时候:
  (async function() {
      let students = db.model('students');
      let result;

      // 第一次
      try {
          result = await new Promise((resolve, reject) => {
              students.find('id=1', (err, data) => {
                  if(err) {reject(err)};
                  resolve(data);
              })
          })
      } catch(err) {
          console.log(err);
          res.send({errMsg: '数据库查询出错'})
          return;
      }

      // 第二次
      try {
          result = await new Promise((resolve, reject) => {
              students.find('id=1', (err, data) => {
                  if(err) {reject(err)};
                  resolve(data);
              })
          })
      } catch(err) {
          console.log(err);
          res.send({errMsg: '数据库查询出错'})
          return;
      }

      res.send(result);
  })()
```

所以 我们可以将上面的重复性代码提取成一个函数, 创建一个js文件, 放在db文件夹里(handleDB.js)


### 封装 orm 为 handleDb.js 文件
```js 
  // 这里需要使用orm所以引入
  const db = require('./nodejs-orm/index')

  // 里面有await仍然要用async函数来包裹, res是我们调用的时候 将响应对象传递捡来的
  async function handleDB(res) {
  let students = db.model('students');

  // 函数要有返回值 我们把result的接受到的结果返回出去
  let result;

  try {
      result = await new Promise((resolve, reject) => {
      students.find('id=1', (err, data) => {
          if (err) { reject(err) };
          resolve(data);
      })
      })
  } catch (err) {
      console.log(err);
      res.send({ errMsg: '数据库查询出错' })
      return;
  }

  // 因为是在async函数里面 是一个异步函数 虽然我们看到的是一个数据, 但是本质上还是一个promise对象
  return result;
  }

  // 这么导出引入的时候直接可以使用 let handleDB = require('/')
  // 如果是对象的形式 那使用的时候就需要 xxx.handlDB 
  module.exports = handleDB;


  // app.js文件
  const handleDB = require('./db/handleDB');
  app.get('/get_data', (req, res) => {

      (async function(){

          // async函数里函数的result本质上还是一个promise对象, 所以要直接提取结果还是在放在await后面的
          // 既然这里写await了 外面的async还是不能省

          // 如果是查询的话就用result接收下, 如果是更改就不用接收了
          let result = await handleDB(res);

          res.send();
      })()
  })
```

<br><br>

### 完善上一章的handleDB函数(封装操作数据库的函数)
让handleDB具有增删改查的功能

### handleDB的预定参数
参数:
1. res:           外部传递进来的响应对象
2. tableName:     要操作的表
3. methodName:    要使用的方法
4. params1:       方法的条件等
5. params2:       方法的条件等

```js 
  const db = require('./nodejs-orm/index')

  // params1 params2是方法的参数 因为增删改查的方法中有1个参数的 也有2个参数的
  async function handleDB(res, tableName, methodName, params1, params2) {

  // tablename是将来要操作哪个表由调用者决定, 前面的变量我们也换一下
  let Model = db.model(tableName);

  let result;

  try {
      result = await new Promise((resolve, reject) => {

      // undefined 本身转换为布尔值是false 取反就是true

      // 如果没有params1(代表没有实参) 那么方法的格式就是无参数的
      if (!params1) {
          Model[methodName]((err, data) => {
          if (err) { reject(err) };
          resolve(data);
          })
          // 做完查询后return掉
          return;
      }

      // 程序执行到这里说明params1已经有了, 因为没有上面就return掉了 所以现在的情况是
      // 要么有params1 要么有params1 params2
      if (!params2) {
          // 如果没有params2
          Model[methodName](params1, (err, data) => {
          if (err) { reject(err) };
          resolve(data);
          })
          return;
      }

      // 程序能够执行到这 说明有params1 和 params2
      Model[methodName](params1, params2, (err, data) => {
          if (err) { reject(err) };
          resolve(data);
      })
      return;
  
      
      })
  } catch (err) {
      console.log(err);
      res.send({ errMsg: '数据库出错了' })
      return;
  }

  return result;
  }

  module.exports = handleDB;
```

```js 
  const express = require('express');
  const db = require('./db/nodejs-orm/index');
  const handleDB = require('./db/handleDB');

  const app = express();

  app.get('/get_data', (req, res) => {
      (async function() {
          let result = await handleDB(res, 'students', 'update', 'id=12', {age:20});
          res.send(result);
      })()
  })

  app.listen(3000, () => {
  console.log('3000端口已打开');
  })
```

<br><br>

### httpOnly
```js
// `index.html` 加载时会请求login接口
// 设置`cookie
app.get("/login", (req, res) => {

// 这里 httpOnly
res.cookie("user", "jay", { maxAge: 2000000, httpOnly: true });

res.json({ code: 0, message: "登录成功" });
});

// 此接口是检测`cookie`是否设置成功, 如果设置成功的话, 浏览器会自动携带上`cookie`
app.get("/user", (req, res) => {
// req.headers.cookie: user=jay
const user = req.headers.cookie.split("=")[1];
res.json({ code: 0, user });
});

```

<br><br>

### CSRF跨站请求伪造的流程图
csrf指攻击者盗用了你的身份, 以你的名义发送恶意请求, 包括 以你的名义发送邮件, 发消息, 盗取你的账号, 甚至于购买商品, 虚拟货币转账 造成的问题(个人隐私泄露以及财产安全)

用户C在登录webA之后, 没有退出的情况下, 访问了第三方网站, 第三方网站可能会以用户C的身份去向WebA发送请求, webB(第三方网站)伪造成用户C的身份, 使用了webA的功能(可能会有安全性的问题, 所以webA需要做防护)

在说这个之前, 我们先说下 用户C 向webA进行转账 之间都是什么样的流程
```js 
  webA: xxx.xxx.xxx.xxx:8000

  WebA 登录页面(前端页面内容)
  用户名: name='username'
  密码:   name='password'
  登录:   submit

  WebA 转账页面
  账户: 转账到哪里
  金额: 转多少钱


  WebA 服务端 处理
  1. '/'  返回一个登录页面


  2. 用户在登录页面提交表单内容后 会到服务端的post接口里
      post接口中的逻辑: 
      1. 获取请求参数(用户名和密码)
      let {username, password} = req.body;

      2. 接下来根据用户名和密码进行判断 如果都正确的话
      先是给用户C的浏览器设置了session做了状态保持, 保存了用户名, 代表用户登录
      然后跳转到转账页面
      req.session['username'] = username;
      res.redirect('/transfer')


  3. /transfer 接口的逻辑
      1. 先看看能不能获取到上面这是的session 如果获取到就说明刚才成功登陆过, 因为有session我们可以直接输入转账页面的地址 不用再经历用户名和密码的输入
      let username = req.session['username'];

      // 如果获取不到说明没有登录, 要重定向到 '/'接口 让他登录
      if(!username) {
          res.redirect('/')
      }

      if(req.method == 'GET') { 
          // 到这里说明用户名 密码都对 渲染个转账页面
          res.render('temp_trnasfer');

          // 如果用户转账页面点击提交会到这个接口
      } else if(req.method == 'POST') {

          // 获取转账到哪里, 转多少钱 (前端post提交的参数)
          let {to_account, money} = req.body;

          后面处理转账 模拟转账成功
          console.log(to_account, money)
          console.log('假装执行转账操作, 将当前登录用户的钱转到到指定账户')
      }
```

上面是用户C 访问 webA 然后进行了转账操作, 后端得到用户C前端传递的post请求参数(转到哪, 转多少, cookie) 然后成功的进行了转账


这时如果 用户C 访问了 webB(第三方网站) 又发生了什么事情
webA : 8000端口
webB : 4000端口
用户C 访问 webA网站, webB是作为第三方网站

```js 
  WebB页面:
  后端就渲染了一个页面

  页面内容
  我是网站B
  按钮: 点击领取优惠券

  webB代码
  点击 按钮 领取优惠券后 跳转到了 webA 8000端口的 /transfer 里面去了

  from method='post' action='http://localhost:8000/transfer'

  // 下面两行表单隐藏, 隐藏设置了转账账户 和 转账指定金额
  input type='hidden' name='to_account' value='999999'
  input type='hidden' name='money' value='20000'

  // 将表单提交按钮 伪装成了点击领取优惠券 按钮
  input type='submit' value='点击领取优惠券'

  说明点击领取按钮后 就会把 转账账户 和 指定金额 发送到 webA的转账接口里面
  利用了webA的 /transfer接口的功能 伪装成了用户C 用户C点击后 钱就到了webB的开发者手里

  因为点击 领取优惠券的操作, 点击这个操作是发生在用户C的浏览器上 所以会带着用户C的cookie
```


上面的 用户C --- webA --- webB 之间是什么样的场景呢?
```js 
  用户C用网站正常的访问WebA(101.200.170.173)
  文字描述下
  用户C 和 WebA之间 做了什么

  用户C 登录页面中 POST 提交进行登录 成功后会跳转到转账界面
  (带着用户名和密码的参数发送到服务器)
  ↓
  服务器进行登录处理
  处理相应的逻辑, 并设置session, 来标记用户身份
  (用户C的身份表示保存在cookie中)
  ↓
  用户C在点击确认转账按钮, 进行post提交 到 /transfer接口 进行转账
  (用户C会带着 目标账户(转到哪里) 和 money(转多少钱)参数 还有 cookie 发送到服务器, cookie里存的是用户C的身份标识)
  ↓
  服务器端 转账的接口做了什么事情
  校验了用户是否登录 然后进行了转账处理 根据cookie能判断用户登录了 所以做了转账处理

  然后webB做了什么
  它写了一个表单 指定了转账账户和转账金额 如果点击也会提交到 webA的转账处理接口里面

  所以就是webB伪装用户C 向webA的转账界面发起了请求
```

总结下就是这样, 当用户C登录过webA后 就会被webA进行了session的状态保持, 然后用户C如果再登录webB(领取优惠券), 点击webB的按钮看似是领取优惠券其实是, webB伪装成用户C 向webA发起了转账请求

那webA在处理转账的时候需要什么 cookie(如果有就可以直接登录转账界面进行操作), 转账金额 和 转账账户(webB暗自做了)

上面所讲的就是 CSRF 跨站请求伪造
接下来我们会讲 怎么解决这个问题, 并对网站A进行优化, 在转账之间除了看session之外还需要有另外一些的校验

<br><br>

### CSRF跨域请求伪造 -- 防护流程图
1. 服务器在用户登录后颁发 *csrf_token*
2. 用户在确认转账的时候 在请求中设置x-csrftoken, 值为服务器颁发的
3. 服务器端在转账之前要验证, 取出cookie中的token和请求头中的token值进行对比 如果不一致就return

### 要点: 
前端发起请求的时候 要设置头信息,  后台拿到请求头中的token 和 cookie 中的token进行对比

### 详解:
1. 在用户C 成功登陆webA后 进入 /transfer的时候 webA颁发一个csrf_token(这个值是随机自动生成的48位字符串) 存在cookie中 给用户C

2. 用户点击确认转账的时候, 再在请求头中设置一个属性 x-csrftoken: csrf_token
```js 
  // 在我们发送请求的时候要额外设置请求头
  x-csrftoken: csrf_token(这个值是从cookie中获取的)
```

3. 在转账之前需要验证, 取出cookie中token和请求头中的token值进行对比 如果不一样就是不合法用户, 就直接return不能执行转账功能

也就是webB在向webA请求的时候 有转账账户 转账金额 cookie(cookie里面也有token), 
但是请求头里没有(因为不是ajax 没有办法设置请求头), 它这样提交过去因为请求头中没有token 会被webA的/transfer接口return掉

```js 
  如果它也想设置请求头, 那必须要用ajax提交(它现在是简单的form表单提交) 那就是, 但是对于webB来讲的话 就是跨域了

  所以现在第三方网站上是没有办法设置请求头的
  因为浏览器有同源策略 用户C和webA交互时, webA设置的cookie
  webB是没办法拿到用户C设置的cookie的

  如果webB不使用form表单默认的方式提交, 使用ajax提交不就可以设置请求头了么
  但是

  $.ajax({

      // webB的请求地址写什么? 如果是/transfer 是向自己的服务器发送请求
      // 我们要写上 webA的网址
      url:'http://localhost:8000/transfer'

      // 那就遇到一个问题 两个网站互相通信 4000 向 8000 端口发送请求 跨域了
  })

  那为什么ajax属于跨域, 上面的form表单默认提交就不属于跨域 为什么?
  两个网站的协议 端口 域名不一样只是跨域的条件,

  可webB的
  form action='http://localhost:8000/transfer'
  和
  ajax的 url 'http://localhost:8000/transfer'

  这不一样么? 为什么form就可以
  因为只要是跨域了 webA的服务器是没办法处理webB的js代码 ajax就是js代码的请求 而form表单属于浏览器的默认行为 不需要处理js代码
```

### 上面是流程 但是代码上怎么体现呢?
1. 服务端给浏览器设置 cookie(csrf_token)
2. 浏览器端发送请求的时候设置请求头
3. 服务端提取cookie中的csrf和请求头中的csrf进行全等判断

<br><br>

### CSRF防护
### 防护思路:
1. 请求转账页面的时候, 服务器响应转账页面, *在cookie中设置*一个csrf_token值(*随机48位字符串*)

2. 客户端在进行post请求的时候, *在请求头中带上自定义的属性X-CSRFToken 值为cookie中的csrf_token值*(要注意的是, 此时的post请求, 浏览器还会自发带着cookie中的csrf_token到服务器)

3. 服务器在接收到post请求的时候, *首先验证响应头中的x-csrftoken值, 和cookie中的csrf_token是不是一致*, 如果不一致, 需要return 直接结束处理, 不进行后续的工作


### 生成 n 位随机字符串 函数
toString(36): 表示为由0-9, a-z组成的的36进制字符串 

Math.random().toString(36)
0.1izir2ay8y

substr(2)
1izir2ay8y

```js 
  function getRandomString(n) {
      let str = '';
      while(str.length < n) {
          str += Math.random().toString(36).substr(2);
      }

      // 因为结果比 传入的 n 多1 所以最终的结果我们再 - 1
      return str.substr(str.length-n);
  }
  getRandomString(48)
```


### 前端获取cookie的函数
```js 
  function getCookie(name) {   //获取cookie的函数
      let r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
      return r ? r[1] : undefined;
  }
```


### 防护开始:
### 第一步: 安装 cookie-parser 并且注册
我们要安装下WebA网站项目下
npm i cookie-parser
```js 
  const cookieParser = require('cookie-parser');
  app.use(cookieParser())
```

### 第二步: 设置 cookie 
服务器端设置csrf_token的cookie

let csrf_token = getRandomString(48);
res.cookie('csrf_token', csrf_token)

```js 
  // 转账页面接口中的逻辑代码 (get请求页面时)
  if (req.method == "GET") {
    
      // 一旦成功登陆转账界面 我们在渲染回页面前要设置 生成csrf_token  设置保存在cookie中 设置token
      let csrf_token = getRandomString(48);
      res.cookie("csrf_token", csrf_token);   

      // 设置完token后渲染页面
      res.render('temp_transfer')
  }
```

### 第三步: 浏览器端 Ajax中设置请求头
在转账输入完金额和转账账户提交的时候

### headers:{'X-CSRFToken':getCookie('csrf_token')},
jQ中的header属性可以设置请求头信息
getCookie('csrf_token') 是取服务端设置的cookie中的csrf_token
```js 
  getCookie() 是我们根据 document.cookie 属性 封装的函数
```

```js 
  $.ajax({
      url:'/transfer',
      type:'post',
      data:JSON.stringify(params),
      contentType:'application/json',

      // 设置请求头 将csrf_token的值设置为服务端设置的token值
      headers:{'X-CSRFToken':getCookie('csrf_token')},

      success: function (resp) {
          console.log("回调成功了");
          console.log(resp);
          
          alert(`转账${resp.money}元到${resp.to_account}成功！`);
      }
  })
```


### 第四步: 服务端验证请求头中和cookie中的csrf_token值
### 从req身上获取自动携带的cookie中的token值
req.cookies["csrf_token"]

### 获取请求头中的cookie中的token值 属性名改为小写!!!!
req.headers['x-csrftoken']

**注意:**
前端我们设置 请求头的时候 属性名是大写
但是因为cookie-parser会把属性名中的大写都改成小写 所以我们在写 req.headers['这里要写小写的字母']  要不获取不到
```js 
  headers:{'X-CSRFToken':getCookie('csrf_token')}
```

### 服务端代码
```js 
  else if (req.method == "POST") {

  // 前端确认转账提交后会到post接口中 所以我们在这里处理 验证csrf_token的值是否相等
  
  // 获取cookie中的token值  和  请求头中 x-csrftoken属性的token值 对比, 如果一致, 说明是合法请求, 可以进行转账,  如果不一致,  说明是伪造的请求, 马上return 不执行后面的代码

  console.log(req.cookies["csrf_token"]);   
  //cookie中的token值

  console.log(req.headers['x-csrftoken']);   
  //请求头中 x-csrftoken属性的token值

  if (req.cookies["csrf_token"] === req.headers['x-csrftoken']) {
    console.log("CSRF验证通过！");

  } else {
    console.log("CSRF验证不通过！");
    res.send("CSRF验证不通过！");

    // 不相等的话 因为后面就是转账的代码 我们在这里return掉
    return
  }

  let { to_account, money } = req.body;
  console.log(to_account, money);

  //执行转账功能:  ....此处省略
  console.log("假装执行转账操作, 将当前登录用户的钱转账到指定账户");
  console.log(`已经完成转账${money}元到账户${to_account}`);

  res.json({ to_account, money });

}
```

<br><br>

### CSRF 通用版本 (整个流程提取函数版)
其实不光光是转账之类我们需要设置csrf防护, 还有比如收藏 关注, 再说白一点*涉及到用户使用post请求提交的*(只要关系到用户数据的比如登录页面) 我们*都需要做csrf防护*

```
  get不用 get本身只是获取数据, 查询数据 比如访问网站的某些资料我返回给你没问题
```

比如上面案例中 login 接口 我们也需要做csrf防护
当客户端做get请求的时候 我就设置 token
当客户端做post请求的时候 我就来验证 token

### 前端代码: login页面的html代码:
### 要点: 
1. 使用了ajax提交 为了设置token相关的请求头
2. 前端根据后台返回的结果 如果登录成功 前端做页面的跳转

```js 
  $(".loginBtn").click(function (e) {
      console.log("点击了登录按钮");

      //获取参数
      var username = $("#username").val();
      var password = $("#password").val();  

      var params = {
          "username":username,
          "password":password,
      }

      console.log(params);
      
      $.ajax({
          url:'/',
          type:'post',
          data:JSON.stringify(params),
          contentType:'application/json',

          // 设置了token请求头
          headers:{'X-CSRFToken':getCookie('csrf_token')},

          success: function (resp) {
              console.log("回调成功了");
              console.log(resp);
              
              alert(`登录成功！`);
              // 登录成功后跳转到 这个接口
              window.location.href = "/transfer"
          }
      })
      
  })
  
  function getCookie(name) {
      var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
      return r ? r[1] : undefined;
  }
```

### 服务器端:
我们在all里面
```js
  router.all('/', (req, res) => {
      if(req.method=="GET"){

  ~~~~~~~~~~~~~~~~~~~
          // 在get中设置 csrf_token
          let csrf_token = getRandomString(48);
          res.cookie('csrf_token', csrf_token); 
  ~~~~~~~~~~~~~~~~~~~
          
          res.render('temp_login')
      } else if(req.method=="POST"){

~~~~~~~~~~~~~~~~~~~
          // 在post中验证 csrf_token
          console.log(req.headers["x-csrftoken"]);
          console.log(req.cookies["csrf_token"]);

          if((req.headers["x-csrftoken"] === req.cookies["csrf_token"])){
              console.log("csrf验证通过！");
  
          }else{
              res.send("csrf验证不通过！");
              return
          }    
~~~~~~~~~~~~~~~~~~~

      let {username, password} = req.body;
      if(username=="laozhuang"&&password=="123456"){
          console.log("账号密码正确------------------");
          
          // 状态保持, 在session中保存登录用户名代表用户登录
          req.session["username"] = username;
          // 跳转到转账页面
          res.redirect("/transfer");
      }else{
          console.log("密码错误");
      }

  }
});
```


### 函数的封装 防护CSRF
我们会发现所有的post请求都需要csrf验证(get的时候csrf需要设置csrf_token), 那一个网站当中肯定不是只有一两个post请求, 这里就会有很多重复性的代码 我们可以把这个csrf防护提取成一个函数

那每个函数都需要手动添加到app.get('/', csrfProtect函数, (req, res) => { ... })么? 那也很麻烦 不用

我们可以利用在执行一个接口之前 *自动调用这个函数的(钩子函数)*
但是钩子函数的使用需要router 所以进行下面的操作
```js 
  // 创建路由
  const router = express.Router();

  // 注册路由 钩子函数加在router的前面, 这样在执行这个router里面的接口的时候都会先调用这个钩子函数 (如果自己测试的时候没效果 那就把它放在最下面) 
  app.use(csrfProtect, router);

  // 然后把所有的app. 换成 router.

  function csrfProtect(req, res, next) {
      // 这里的代码将在执行router下的接口之前的时候执行

      if(req.method === 'GET') {
          let csrf_token = getRandomString(48);
          res.cookie('csrf_token', csrf_token); 

      } else if (req.method === 'POST') {
          console.log(req.headers["x-csrftoken"]);
          console.log(req.cookies["csrf_token"]);

          if((req.headers["x-csrftoken"] === req.cookies["csrf_token"])){
              console.log("csrf验证通过！");
  
          }else{
              res.send("csrf验证不通过！");
              return
          }    
      }


      next()
  }
```

<br><br>

### 项目的初始化 和 模板的设置
来完整下整个项目的搭建流程

### 1. 创建 项目 文件夹, 并做npm初始化
npm init -y


### 2. 下载 express
npm install express --save


### 3. 创建 app.js 入口文件 在里面引入 express
const express = require('express');


### 4. 引入 art-template 可以使用render()哦
npm install --save art-template
npm install --save express-art-template
创建 views 文件夹 设置从views 为根目录开始找html文件


### 5. 入口文件中配置模板信息 art-template
这里会要求安装path模块
```js 
  app.engine('html', require('express-art-template'));
  app.set('view options', {
      debug: process.env.NODE_ENV !== 'production'
  });
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
```


### 6. 设置静态资源文件夹 处理图片 样式表 js文件的请求
创建 public 文件夹
css 图片 js favicon.ico 等文件夹 是一个网页需要用到的(模块) 所以我们创建个news文件夹, 然后把news文件夹 放到 public 文件夹里面
```js 
  文件夹结构
  | - public
      | - news
          | - css
          | - js ...
```
```js 
  // 把public设置为 根 从根开始找文件
  app.use(express.static('public'));
```


### 7. 修改 html文件中的 src href 链接
```js 
  href="/news/css/reset.css"

  // 第一个 / 就是根 也就是从 public 文件夹开始找
```


### 8. 获取请求参数的前置工作
get       请求参数是req.query
pathinfo  请求参数是req.params
post      请求参数是req.body      它需要提前配置

```js 
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
```


### 9. 设置 读取cookie session的前置工作
npm install cookie-parser --save
npm install cookie-session --save

引入 cookie-parser cookie-session
```js 
  const cookieParser = require('cookie-parser');
  const cookieSession = require('cookie-session');
```

注册cookie 和 session:
```js 
  app.use(cookieParser());
  app.use(cookieSession({
      name: 'news_session',
      keys: ['&*(A&F^AS*^F&*ASDG'],
      maxAge: 1000 * 60 * 60 * 24 * 2
  }))
```

>>> 设置 cookie
res.cookie('name', 'nodejs');

>>> 设置 session
req.session['age'] = 11;

>>> 读取 cookie
req.cookies['name'];

>>> 读取 session
req.session['age'];
```js 设置的时候一个req 一个res 一个方法 一个赋值```
```js 读取的时候都是req []的形式 cookie是复数```


### 10. 抽取 项目的配置文件
当我们使用第三方模块的时候很可能会使用注册(要使用app.use), 还有以后把接口抽取后交给路由去管理的时候(要使用app.use) 一般情况下我们会把app.use() 这样的代码称之为配置代码, 它们应该有一个专门的配置文件

1. 在根目录下 创建 config.js
2. 将app.use 和 配置模板相关的代码 拿到 config.js 文件中
3. 将入口文件中的要在config.js中要用到的模块 拿到 config.js 文件中
4. 封装一个 appConfig() 函数 将代码放进去, 最后导出
5. 在入口文件里调用 appConfig(app, express) 的时候传入app express


>>> 下面是以函数的形式进行的封装, 和以函数的形式进行的调用
```js 
  // config.js文件:
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const cookieSession = require('cookie-session');

  let appConfig = (app, express) => {
      // 请求post参数的配置
      app.use(express.urlencoded({ extended: false }));
      app.use(express.json());

      // 注册cookie session
      app.use(cookieParser());
      app.use(cookieSession({
          name: 'news_session',
          keys: ['&*(A&F^AS*^F&*ASDG'],
          maxAge: 1000 * 60 * 60 * 24 * 2
      }))

      // 配置模板的信息
      app.engine('html', require('express-art-template'));
      app.set('view options', {
          debug: process.env.NODE_ENV !== 'production'
      });
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'html');

      // 指定静态资源的文件夹
      app.use(express.static('public'));
  }

  module.exports = appConfig;


  // 入口文件调用的时候
  const appConfig = require('./config');
  appConfig(app, express);
```


>>> 以面向对象的形式抽取
```js 
  // config.js文件:

  const path = require('path');
  const cookieParser = require('cookie-parser');
  const cookieSession = require('cookie-session');

  class Appconfig {

  // new的时候执行的代码 那就要写在constructor里 这样人口文件调用就会执行这里面的代码
  constructor(app, express) {

      this.app = app;
      this.express = express;

      // 请求post参数的配置
      this.app.use(this.express.urlencoded({ extended: false }));
      this.app.use(this.express.json());

      // 注册cookie session
      this.app.use(cookieParser());
      this.app.use(cookieSession({
      name: 'news_session',
      keys: ['&*(A&F^AS*^F&*ASDG'],
      maxAge: 1000 * 60 * 60 * 24 * 2
      }))

      // 配置模板的信息
      this.app.engine('html', require('express-art-template'));
      this.app.set('view options', {
      debug: process.env.NODE_ENV !== 'production'
      });
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.set('view engine', 'html');

      // 指定静态资源的文件夹
      this.app.use(this.express.static('public'));
  }
  }

  module.exports = Appconfig;



  // 入口js文件:
  const Appconfig = require('./config');
  new Appconfig(app, express);
```


>>> 面向对象的另一种写法
```js 
  // config.js文件:

  const path = require('path');
  const cookieParser = require('cookie-parser');
  const cookieSession = require('cookie-session');

  class Appconfig {

  // new的时候执行的代码 那就要写在constructor里 这样人口文件调用就会执行这里面的代码
  constructor(app, express) {

      this.app = app;
      this.express = express;
  }

  run() {
      // 请求post参数的配置
      this.app.use(this.express.urlencoded({ extended: false }));
      this.app.use(this.express.json());

      // 注册cookie session
      this.app.use(cookieParser());
      this.app.use(cookieSession({
      name: 'news_session',
      keys: ['&*(A&F^AS*^F&*ASDG'],
      maxAge: 1000 * 60 * 60 * 24 * 2
      }))

      // 配置模板的信息
      this.app.engine('html', require('express-art-template'));
      this.app.set('view options', {
      debug: process.env.NODE_ENV !== 'production'
      });
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.set('view engine', 'html');

      // 指定静态资源的文件夹
      this.app.use(this.express.static('public'));
  }
  }

  module.exports = Appconfig;



  // 入口js文件:
  let appConfig = new Appconfig(app, express);
  appConfig.run();
```


### 11. 路由接口的设置 (抽取)
根目录 创建 routes 文件夹, 里面创建index.js 文件
```js 
  | - routes
      index.js
```

在index.js文件中 创建 router 对象
router对象是express对象创建的 所以要引入express模块
```js 
  const express = require('express');
  const router = express.Router();
```

将index.js中的app换成router
```js 
  router.get('/get_cookie_session', (req, res) => {
      let name = req.cookies['name'];
      let age = req.session['age'];
      res.send(`cookie的值为${name}, session的值为${age}`);
  })
```

将文件导出
```js 
  module.exports = router;
```

在配置文件(config.js)中引入并注册
注册的东西依次在下面, 比如我要是写在了 cookie 注册的上面 我就不用设置读取cookie了
```js 
  const indexRouter = require('./routes/index');
  this.app.use(indexRouter);
```


### 操作数据库的配置
1. 安装 mysql
npm i mysql --save

2. 根目录下创建 db 文件夹
3. 将nodejs-orm复制到db文件夹里

4. 修改nodejs-orm中index.js的数据连接设置 比如改下操作数据库的名称
```js 
  这个index.js 需要 mysql模块的支持 所以在第一步的时候安装 
```

5. 将我们封装好的handleDB.js文件放在db文件夹里
```js 
  用来操作数据库的方法
```

6. 在接口文件中(routes文件夹下的对应接口文件) 引入handleDB.js文件
```js 
  const handleDB = require('../db/handleDB');
```

7. 使用 handleDB 查询数据库
handleDB的参数
  - 1. res
  - 2. '表名'
  - 3. '方法名'
  - 4. '提示的错误信息'
  - 5. n1
  - 6. n2
```js 
  使用 handleDB 查询数据库 其实就是调用handleDB()

  但是handleDB()是一个promise对象 所以前面需要有一个await来接收查询结果

  await又要写在一个async function中

  (async function(){
      let result = await handleDB()
  })()


  // 示例:
  router.get('/get_data', (req, res) => {
  (async function() {
      let result = await handleDB(res, 'info_category', 'find', '数据库查询出错');
      res.send(result);
  })()
  })
```

<br><br>

### 项目数据表的分析
先说一些关于数据库的点:
网站中的很多数据都是从数据库里获取到再展示到页面上的
只要是同一账号登录的状态下, 账号再次登录要显示已收藏(保留上次收藏时的状态)

```js 
  老赵收藏了一篇新闻, 这个动作要保存到数据库里面, 数据库里面有数据库表
  用户收藏了哪一篇文章, 应该有一个表记录 哪一个用户收藏了哪一篇文章
  也就是说我们一个项目里应该存在着很多表

  文章应该有表
  收藏应该有表
  用户应该有表
  关注应该有表 


  表和表之间的关系

  用户表
  id          (用户编号)          主键
  昵称        (nick_name)
  头像        (avatar_url)
  用户名      (username)
  密码        (password)
  登录时间    (last_login)
  是否管理员  (is_admin)
  个性签名    (signatrue)
  性别        (gender)

  ↓   一个用户可以收藏多条新闻

  用户收藏表
  用户编号    (user_id)           主键
  新闻编号    (news_id)           主键
  收藏时间    (create_time)
          // 哪一个用户收藏了哪一篇文章

  ↑   一条新闻可以被多个用户收藏

  新闻表
  新闻编号    (id)                主键
  新闻标题    (title)
  新闻来源    (source)
  首页图片    (index_image_url)
  创建时间    (create_time)
  新闻摘要    (digest)
  新闻点击量  (clicks)
  新闻内容    (content)
  新闻分类    (category_id)       外键
  用户编号    (user_id)
  新闻状态    (status)

  ↑   一个分类可以有多条新闻 一条新闻只在一个分类

  分类表
  分类编号    (id)                主键
  分类名称    (name)
  

  新闻表

  ↓

  评论表      
  评论编号    (id)                主键
  用户编号    (user_id)           外键
  新闻编号    (news_id)           外键
  评论时间    (create_time)
  评论内容    (content)
  父评论编号  (parent_id)         外键
  点赞数量    (like_count)
      // 一条主评论可以有很多子评论 一个子评论只能评论一个主评论
  
  ↓   

  评论点赞
  评论编号    (comment_id)
  用户编号    (user_id)

  ↓   ↑   一个用户可以点赞多条评论

  用户表

  ↓   一个用户可以关注多个人 也可以被多个人关注

  用户粉丝
  关注者(粉丝)编号    (foller_id)     主键
  被关注者编号        (foller_id)     主键

  

  一个数据库 但是一个项目里面可能有很多张的表 这个表最初是怎么来的?
  这些表都是有经验的 数据库管理员, 项目经理等 他们知道哪些表都需要有哪些字段
  这些表不会随随便便交给某一个程序员去设计的

  那这些表是也从无到有的, 所以当最开始要创建这些表的时候如果什么都没有那只能从分析需求开始
  在这个行业有经验, 不仅仅是开发经验 比如项目是金融类的 至少找一个项目经理懂的一起去聊一下 我这么设计合理不合理

  产品经理或者项目经理会出一份原型图 里面标记出了 大概会有哪一些功能 然后设计数据库表的人根据这个原型图分析出有哪些功能 有哪些需求 出一份数据表

  如果是一个大项目的话 是一个严谨且漫长的过程
  上面的数据表准备好后 就可以写开发文档 建库建表了
```


<br><br>

### 创建数据库后的导入方式
### navicat
1. 创建一个news数据库 字符集选utf-8
2. 在我们news数据库上右键 运行批次任务 选择目标文件 .sql 直接开始就可以 最后点关闭

### shell
1. 进入数据库
mysql -uroot -p;

2. 创建数据库
create database news2 charset=utf8;

3. 进入到创建的数据库
use news2;

4. 输入 source 然后把.sql文件拖拽到小黑屏上 路径不能存在中文有就失败 记得分号 回车
source + 路径;

<br><br>

### 验证码的文本和图片的生成
它是作为工具出现的 我们在根目录下创建一个 utils 文件夹

1. 安装验证码生成的模块
npm i svg-captcha --save

2. 我们把关于captcha的配置文件夹, 放在utils文件夹里面
里面有index.js文件 里面需要用到 svg-captcha 模块 所以下载的 

3. 打开captcha的配置文件夹里面的index.js文件进行配置
字体大小 验证码长度等设置

4. 在关于验证的路由接口里面使用, 先引入
```js 
  // 我们前面做了路由的提取, 创建了关于验证的接口 
  const Caotcha = require('../utils/captcha/index');
```

### captcha 的使用步骤
1. 通过 new Caotcha() 实例化对象
```js let captchaObj = new Caotcha();```

2. 调用 captchaObj.getCode() 方法 得到 验证码对象
```js 
  let captcha = captchaObj.getCode();
```

### captcha.text
验证码里 文本
是后端将来做验证比对用(我们来拿图片验证码文本和用户输入信息 进行比对)

### captcha.data
验证码图片

### 注意
这个验证码图片在项目当中是一个<img src=''>标签 将来配合img标签的src属性请求来展示验证码图片的时候, 需要设置响应头
```js    
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(captcha.data);
```

### 完整代码:
```js 
  // 验证相关的接口路由:

  const express = require('express');
  const Caotcha = require('../utils/captcha/index');
  const router = express.Router();

  router.get('/get_code', (req, res) => {
      let captchaObj = new Caotcha();
      let captcha = captchaObj.getCode();

      // 验证码图片和img配合使用的时候 要设置响应头
      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(captcha.data);
  })

  module.exports = router;
```

<br><br>

### 验证码的展示
上面简单的学了下验证码的使用, 那怎么将验证码插到 注册页面上的验证结构里呢?

前端的html结构关于验证码的部分
```js 
  <img src="/passport/image_code" class="get_pic_code" onclick="generateImageCode()">
```

我们可以看到 关于验证码图片 的部分 src链接的是一个接口 src会自动的发送请求
所以我们后台也要有这样的一个接口用来响应发送验证码的图片过去
```js 
  router.get('/passport/image_code', (req, res) => {
      let captchaObj = new Caotcha();
      let captcha = captchaObj.getCode();

      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(captcha.data);
  })
```

### 注意:
### res.setHeader('Content-Type', 'image/svg+xml');
在响应回验证码图片的时候要设置响应头


### 点击验证码会生成新的验证码图片
原理:
我们用过绑定点击事件, 去设置img的src属性, src的值为接口, 这样让它去获取请求
但是因为缓存的原因, 再次请求的时候就会走缓存的图片, 不会得到最新的效果
原因是每次的请求地址都相同, 为了避免这样 我们可以在请求接口的后面添加时间戳或者是随机数 这样就可以标记为不同的请求
```js 
  function generateImageCode() {

      // 1.设置图片url地址
      image_url = '/passport/image_code'

      // 缓存原因: 添加随机数
      let imgUrl = '/passport/image_code/'+ Math.random();
      // 缓存原因: 添加时间戳
      let imgUrl = '/passport/image_code/'+ (+new Date());

      // 2.将地址设置到img标签的src属性中,为image_url
      $('.get_pic_code').attr('src',image_url)


      // 原生的写法:
      div.addEventListener('click', function() {
          let imgUrl = '/passport/image_code/'+ (+new Date());
          img.src = imgUrl
      })
  }


  服务端的设置:
  // 既然是在接口添加了随机数, 那么这里也要改成动态的接口, 名字随便起
  router.get('/passport/image_code/:flag', (req, res) => {

      let captchaObj = new Caotcha();
      let captcha = captchaObj.getCode();
      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(captcha.data);
  })
```

<br><br>

### 验证码图片文本保存到session
1. 是为了能够在不同的接口里获取captcha.text 
2. 是为了让用户A对应自己的验证码信息, 用户B对应自己的验证码信息

接下来简单的文字解释下 用户注册的过程, 然后说下为什么要将验证码信息保存在session里面

```js 
  1. 浏览器向服务器发起 获取验证码的请求

  2. 
  服务器(/passport/image_code/:flag)接口负责处理验证码的请求
  - 1. 生成图片验证码
  - 2. 保存图片验证码文本到session        < --- 补的
  - 3. 返回验证码图片

  3.
  浏览器端看到 验证码图片

  4. 
  浏览器 用户填完注册信息后(用户名 密码 验证码等)发起注册请求 (POST) 会带参数(用户名 密码 验证码的文本信息)

  5.
  服务器(/passport/register)接口负责处理注册请求 (POST)
  - 1. 获取POST请求参数 然后判空(没有填写的话就不给处理了 return)
  - 2. 验证用户输入的图片验证码是否正确, 不正确就return
  - 3. ....

  这里有一个问题, 5. 的时候需要验证 用户输入的验证码文本 和 captcha.text一样不一样是吧

  但是 captcha.text 是在 /passport/image_code 接口里生成的
  验证 需要在 /passport/register 接口里验证

  这是两个函数, 属于两个作用域 captcha.text 拿不过来
  还有以后会有多个浏览器来请求验证码, 那正确的是浏览器1 我们要去取浏览器1的验证码文本, 浏览器2请求的 我们在验证的时候就去取浏览器2的验证码文本 保证不会拿错

  所以 针对浏览器1 应该有一个独立的空间 来保存浏览器1的图片验证码信息
      针对浏览器2 应该有一个独立的空间 来保存浏览器2的图片验证码信息

  其实我们的验证码文本(captcha.text)不展示给用户去看 而是存在session里

  比如 浏览器1对应的session (独立空间)
  req.session['imageCode'] = captcha.text;

  什么时候保存呢?
  在 2. 中
  - 1. 生成图片验证码
  - 2. 保存图片验证码文本到session
  - 3. 返回验证码图片
```

### 代码部分:
不用担心session里面保存多个 captcha.text 里面保存的只会是最新的, 新的会覆盖掉
```js 
  router.get('/passport/image_code/:flag', (req, res) => {
      let captchaObj = new Caotcha();
      let captcha = captchaObj.getCode();

      // 将验证码文本保存在用户的session中
      req.session['imageCode'] = captcha.text;

      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(captcha.data);
  })
```

<br><br>

### 注册功能的前端代码分析(news项目)
要点:
1. 这个表单的提交使用的是jQ中的 表单对象.submit() 的方式
2. 在事件里 我们先要阻止表单的默认提交 不然它会发往 /
3. 前端这里做了验证判断, 如果没有填写 或者 没有填对 就给出提示语句 并return
4. 根据后端传递过来的数据 我们判断是否注册成功 成功就刷新页面

**注意:**
*后端尽量返回的都是数据*, 不用去操控浏览器的跳转, 这应该由前端来控制

前端注册表单的代码 我们来分析一下
```js 
  $(".register_form_con").submit(function (e) {

      // 阻止默认提交操作,不让其往默认的action提交
      e.preventDefault()

      console.log("点击了注册按钮");
      
      
  // 取到用户输入的内容
      var username = $("#register_mobile").val()
      var imageCode = $("#imagecode").val();  
      var password = $("#register_password").val()

      // 用户是否点击了同意
      var agree = $(".register_form_con .agree_input").prop("checked")
      console.log(username, imageCode, password, agree)


  if (!username) {
          $("#register-mobile-err").show();
          return;
      }
      if (!imageCode) {
          $("#register-image-code-err").html("请填写验证码！").show();
          return;
      }
      if (!password) {
          $("#register-password-err").html("请填写密码!").show();
          return;
      }

  if (password.length < 6) {
          $("#register-password-err").html("密码长度不能少于6位");
          $("#register-password-err").show();
          return;
      }
      if (!agree) {
          alert("请勾选同意协议, 谢谢！")
          return;
      }

      // 发起注册请求
      // 拼接请求参数
      var params = {
          "username":username,
          "image_code":imageCode,
          "password":password,
          "agree":agree
      }
      
      $.ajax({
          url:'/passport/register',
          type:'post',
          data:JSON.stringify(params),

          // 返回内容以什么样的格式给我, 请求头的设置好像是jQ自己封装好了
          contentType:'application/json',

          // csrf防护
          //headers:{'X-CSRFToken':getCookie('csrf_token')},

          success: function (resp) {
              console.log("回调成功了");
              
              //判断是否注册成功
              if(resp.errno == '0'){
                  //重新加载当前页面
                  alert(resp.errmsg);

                  // 刷新页面重新加载
                  // 注册成功后需要跳转页面吧, 这个就是原页面刷新 也就是说这个reload() 负责了跳转的功能
                  window.location.reload()
              }else{
                  alert(resp.errmsg);
              }
          }
      })
      
  })
})
```

看最后发现以后返回的对象中 至少要有两个属性 errmsg errno

<br><br>

### 注册功能的后端流程分析(news项目)
用户在填写完注册表单后, 会点提交之类的按钮 将注册填写的结果发送到后端的注册接口上, 由后端去跟数据库进行交互并返回结果 *所以在后端这里的逻辑必须要严谨*

在这个接口中我们是要操作数据库的, 要把数据添加到数据库中, 所以要确保数据的有效性, 所以要尽可能的把自己能想到的无效的情况分析出来 无效的话要return 不能把数据添加到数据库

### 这个接口中的逻辑
1. 获取post请求的参数 判空
2. 验证用户输入的图片验证码是否正确, 不正确就return
3. 查询数据库(我们看看用户名有没有被注册过)
4. 判断
  - 如果数据库里面有, 返回用户名已存在 return
  - 如果数据库里面没有, 就往数据库中新增加一条记录
5. 保持用户的登录状态
6. 返回注册成功

注意:
上面说了 后端传到前端的数据中 至少要包含 errno errmsg

<br><br>

### 注册功能后端代码实现
上面我们总结了一下 在完成注册功能要分几个阶段, 下面我们依次来记录一下各个阶段的要点是什么

### 1. 获取post请求的参数 判空
虽然前端那里已经进行了判空的验证处理 后端这边依然要进行判断, 要严谨, 如果前端后端都没写, 出了责任是后端的
```js 
  let { username, image_code, password, agree } = req.body;
  console.log(username, image_code, password, agree)

  // 注意:
  // 解构的时候, 目标对象里定义的什么变量名 解构的时候就使用什么让的变量名 前后变量名不一致会解不出来
```


### 2. 验证用户输入的图片验证码是否正确, 不正确就return
这里我们采用了 if 的方法, 没有采用 if else 的方法, 因为整个注册功能一共分为7步 前6步都是用来排除错误, 有错误就return 这样到最后剩下的只会是成功
```js    
  // 没有采用这种方式
  if (req.session[imageCode] === image_code) {
  } else {
    res.send({ errmsg: '用户验证码输入错误' })
    return;
  }
```

.toLowerCase() 
这里要注意的是 验证码是分大小写的 如果希望用户输入的结果不按大小写来验证 我们将用户输入的和自动生成的都转成小写
```js 
  if (image_code.toLowerCase() !== req.session['imageCode'].toLowerCase()) {
      res.send({ errmsg: '用户验证码输入错误' })
      return;
  } 
```


### 3. 查询数据库(我们看看用户名有没有被注册过)
1. 查询数据库 我们需要用到orm, 我们自己封装了一个handleDB, 所以要先引入handleDB

2. handleDB的结果是一个promise对象 我们要用await 和 async async把这个接口内的所有代码都包起来, 这样不至于因为作用域的问题接收不到变量

3. 看用户名是否注册了 我们要查询的是用户表

4. 我们先使用了 find方法 查询用户名知否在我们的用户表中 `username='${username}'`  注意 where条件后面需要是字符串 需要加引号

5. 关于result是什么类型的查询结果 -- 数组
  - 如果用户表里已经有用户名  那 result = [{name: 老张}]
  - 如果用户表里没有用户名    那 result = []  空数组

```js 
  let result = await handleDB(res, 'info_user', 'find', '数据库查询出错', `username='${username}'`)

  console.log('result: ' + result);
```


### 4. 判断
1. 如果数据库里面有, 返回用户名已存在 return
  - 如果用户已经存在相当于不是一个空数组, 条件有两种写法
```js 
  result.length > 0
  result[0]   这种的好处是 存在就是result[0] 不存在就是!result[0]

  if (result[0]) {
    res.json({errmsg: '用户名已经被注册'});
    return;
  }
```

2. 如果数据库里面没有, 就往数据库中新增加一条记录
result2.insertId 插入数据的时候, 自动生成的这个id值
```js 
  1. 打开 .sql 文件 查看必填写字段是什么 (not null字段)
  info_user: id nick_name password_hash username

  2. 表中的字段名是什么 我们handleDB的条件参数里属性名就要写什么
  3. nick_name 没有用username代替 后期自己修改

  4. 查询的话 有一个result 那么插入有结果是什么? 是一个对象里面有一个属性比较重要 insertId 这个是result2的一个属性

  let result2 = await handleDB(res, 'info_user', 'insert', '数据库插入出错', {
      username,
      password_hash: password,
      nick_name: username
    })
```


### 5. 状态保持 保持用户的登录状态
我们往session里面添加一个信息, 保持用户的id 这个id是插入成功的id 也可以起到标识是这个用户的作用
```js 
  req.session['user_id'] = result2.insertId;
```


### 6. 返回注册成功
```js 
  if(resp.errno == '0'){
      alert(resp.errmsg);
      window.location.reload()
  }

  前端注册成功是 errno为0 所以我们返回 errno:0 告诉前端注册成功

  res.send({errno:'0', errmsg: '注册成功'});
```


### 这个接口的完整代码:
```js 
router.post('/passport/register', (req, res) => {
  (async function () {
  // - 1. 获取post请求的参数 判空
  let { username, image_code, password, agree } = req.body;
  console.log(username, image_code, password, agree)
  
  if (!username || !image_code || !password || !agree) {
      res.send({ errmsg: '缺少必传参数' })
      return;
  }

  // - 2. 验证用户输入的图片验证码是否正确, 不正确就return
  if (image_code.toLowerCase() !== req.session['imageCode'].toLowerCase()) {
      res.send({ errmsg: '用户验证码输入错误' })
      return;
  }

  // - 3. 查询数据库(我们看看用户名有没有被注册过)
  let result = await handleDB(res, 'info_user', 'find', '数据库查询出错', `username='${username}'`)
  console.log('result: ' + result);

  // - 4. 判断
  // - 如果数据库里面有, 返回用户名已存在 return
  if (result[0]) {
      res.json({errmsg: '用户名已经被注册'});
      return;
  }

  let result2 = await handleDB(res, 'info_user', 'insert', '数据库插入出错', {
  username,
  password_hash: password,
  nick_name: username
  })

  // 5. 状态保持 保持用户的登录状态
  req.session['user_id'] = result2.insertId;

  // 6. 返回注册成功
  res.send({errno:'0', errmsg: '注册成功'});
  })()
})
```

<br><br>

### 登录功能前端代码分析
下面是登录对话框中 点击按钮的js代码部分
1. 因为是表单的 submit 事件 所以我们也是上来先阻止默认的行为

```js 
  // TODO 登录表单提交
  $(".login_form_con").submit(function (e) {

      e.preventDefault()
      var username = $(".login_form #mobile").val()
      var password = $(".login_form #password").val()

      // 判断
      if (!username) {
          $("#login-mobile-err").show();
          return;
      }

      if (!password) {
          $("#login-password-err").show();
          return;
      }

      // 发起登录请求
      // 拼接参数
      var params = {
          "username":username,
          "password":password
      }
      
      $.ajax({

          // 登录的接口
          url:'/passport/login',
          type:'post',
          data:JSON.stringify(params),
          contentType:'application/json',

          // headers:{'X-CSRFToken':getCookie('csrf_token')},
          success: function (resp) {
              //判断是否登陆成功
              if(resp.errno == '0'){
                  alert("登录成功");
                  window.location.reload()
              }else{
                  alert(resp.errmsg);
              }
          }
      })
  })
```

<br><br>

### 登录功能后端业务分析
在登录的接口里面 仍然要查询数据库, 至少需要查询有没有这个用户对吧
下面简单的说下 登录接口的业务逻辑

1. 获取post请求参数 判空
2. 查询数据库, 验证用户名是不是已经注册了
3. 如果没有注册 返回用户名未注册, return
4. 如果有注册了 那就校验密码是否正确 如果不正确还要return
5. 到这里(上面的情况都return了) 如果用户名 和 密码都没问题 就保存用户的登录状态
6. 返回登录成功给前端

<br><br>

### 登录功能后端代码实现
登录的接口里面也需要查询数据库, 至少要查询有这个人才给你登录吧 既然要查询数据库那么就要使用handleDB, 那就又少不了 async function, 所以在这个接口中首先加个 async function 把所有的代码都包裹起来

### 1. 获取post请求参数 判空
```js 
  let {username, password} = req.body;
  if (!username || !password) {
    res.send({ errmsg: '缺少必传参数' })
    return;
  }
```


### 2. 查询数据库, 验证用户名是不是已经注册了
```js 
  let result = await handleDB(res, 'info_user', 'find', '数据库查询出错', `username='${username}'`)
  console.log('result: ' + result);
```


### 3. 如果没有注册 返回用户名未注册, return
```js 
  if(!result[0]) {
    res.send({ errmsg: '用户名未注册, 登录失败' })
    return;
  }
```


### 4. 如果有注册了 那就校验密码是否正确 如果不正确还要return
我们要校验密码 就是拿着post请求参数里的password 和 数据库中的 password做比较, 但是需要注意的是我们一定要使用数据库中的字段名, 在我们的用户表中 密码的字段名就是 password_hash2
```js 
  另外 result 是查询数据库的结果, 它是一个数组

    if(password !== result[0].password_hash) {
    res.send({ errmsg: '密码错误, 用户登录失败' })
    return;
  }
```


### 5. 到这里(上面的情况都return了) 如果用户名 和 密码都没问题 就保存用户的登录状态
状态保持建议使用id作为值
插入的时候因为还用户还没有用户id可以用 insertId
登录查询的是在用户表里的用户, 所以使用id
```js 
  req.session['user_id'] = result[0].id;
  res.send({ errno: '0', errmsg: '登录成功' });
```

### 这个部分的完整代码:
```js 
// 登录接口
router.post('/passport/login', (req, res) => {
(async function() {

  // 1. 获取post请求参数 判空
  let {username, password} = req.body;
  if (!username || !password) {
    res.send({ errmsg: '缺少必传参数' })
    return;
  }

  // 2. 查询数据库, 验证用户名是不是已经注册了
  let result = await handleDB(res, 'info_user', 'find', '数据库查询出错', `username='${username}'`)
  console.log('result: ' + result);

  // 3. 如果没有注册 返回用户名未注册, return
  if(!result[0]) {
    res.send({ errmsg: '用户名未注册, 登录失败' })
    return;
  }

  // 4. 如果有注册了 那就校验密码是否正确 如果不正确还要return
  if(password !== result[0].password_hash) {
    res.send({ errmsg: '密码错误, 用户登录失败' })
    return;
  }
  
  // 5. 到这里(上面的情况都return了) 如果用户名 和 密码都没问题 就保存用户的登录状态
  req.session['user_id'] = result[0].id;
  res.send({ errno: '0', errmsg: '登录成功' });
})()
})
```

<br><br>

### 首页登录状态的展示
前面我们分别在注册的接口里在浏览器里设置了session(为了保持它的登录状态), 我们再登录的接口里也给浏览器设置了session, 同样是为了保持用户的登录状态

当用户再打开我们的网站的时候 我们怎么判断用户刚才有没有登录过, 我们可以获取用户浏览器的session里的 'user_id' 有没有值 有就说明用户登录了 没有就说明没有登录

如果已判断用户登录, 那么就应该把未登录的状态隐藏掉 下面两个状态不应该一起出现
```js 
  现在界面上是

  已登录状态展示      /       未登录状态展示
  张三 / 退出                 登录 / 注册
```

### 实现原理
1. html结构中准备了两个状态的显示, 已登录 和 未登录, 当然这两个结构我们只需要展示一个在上面

2. 我们根据 模板语法中的 if else 来决定展示哪个结构在页面上
```js 
  {{if user_info}}

      <html部分1>         要么展示这

  {{else}}

      <html部分2>         要么展示这

  {{/if}}
```

3. 那就需要后端传递到前端的数据中 要么有true的含义 要么有false的含义的数据结构
```js 
  后端传递了数据过来 要么有数据(true) 要么是false, 正好跟我们能不能从session中获取到值有关系, 能从session中获取到user_id 就会根据这个id找到用户数据 就会被判断为已登录(只要session里就一直会判断为已登录), 就能得到用户的数据, 就可以拿到用户的昵称 和 头像 就可以根据这些数据, 返回到前端, 既然有数据就展示对应的结构, 隐藏另一个结构

  let data = {
    user_info : result[0] ? {
      nick_name : result[0].nick_name,
      avatar_url : result[0].avatar_url
    } : false
  }
```

4. 登录成功后 前端的代码里有 window.local.reload(); 刷新页面 刷新又会发起请求, 又来到了 请求首页的接口, 根据新的数据 重新渲染了页面


### 实现: 
那我现在要判断用户是否登录, 我们的逻辑应该写在哪一个接口里面呢?
来到首页的时候 刷新的时候 我们想知道他是否登录了没有 那什么时候渲染首页?
在我们 输入网址的时候请求首页的时候, 那后端对应的接口就应该是
```js 
  router.get('/', (req, res) => {

      我们要在这里处理右上角是否登录的问题

      res.render('news/index');
  })
```

我们要在这个接口中做一下的逻辑:

### 1. 判断用户是否登录
我们可以从session中去获取 user_id 如果有说明 用户刚才登录了
```js 
  let user_id = req.session['user_id'];
```


### 2. 验证 session中的id是否有效
我们将从session中取到的 user_id 要确认这个 user_id 是不是有效的
那我们就需要查询数据库中有没有这个id 如果数据库中有 才能证明是有效id 才能证明你登录了
```js 
  let result;         这个result后面还要用 提取到 { } 的外面

  if(user_id) {
      // 如果从session中获取到了这个id 就和数据库中的用户id进行比对, 使用查询数据库 将session中的id作为查询条件, 能查询到id对应的用户的信息
      result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);

      return???    不需要 首页是可以看的 无关登录与否 都可以进行下面的逻辑
  }

  result的结果有两种, 根据session的id找不到的情况 找的到的情况
  result [     ]
  result [{...}]

  result[0] 就是登录的那个用户数据对象, 比如我们可以通过它看下用户的昵称, result[0].nick_name
```


通过上面的操作 我们能得到result(如果查询成功的话) 接下来怎么办? 
怎么才能根据用户的登录状态 决定页面中 显示的结构


### 3. 将结果展示到首页.html文件中
使用模板 我们可以把用户的数据组织成一个对象, 传递到模板里面去
```js 
  let data = {

    user_info : {
      nick_name : result[0].nick_name,
      avatar_url : result[0].avatar_url
    }
  }

  但是有个问题 上面有可能根据 session中的id 获取不到用户信息, 那result就是undefined

  undefined.nick_name就会报错, 所以我们严谨一些 利用3元运算符的方式
  如果能查到user_id 或者说 result有值数组不为空 那么我就给你整理成一个数据发送过去, 如果没有 就传递一个false过去

  let data = {
    user_info : result[0] ? {
      nick_name : result[0].nick_name,
      avatar_url : result[0].avatar_url
    } : false
  }
```


### 后端请求首页接口的逻辑代码
```js 
router.get('/', (req, res) => {
  (async function() {
      
  let user_id = req.session['user_id'];

  let result;
  if(user_id) {
      result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
  }


  // 前端可以直接使用里面的属性名 user_info 不用data.user_info
  let data = {
      user_info : result[0] ? {
      nick_name : result[0].nick_name,
      avatar_url : result[0].avatar_url
      } : false
  }

  res.render('news/index', data);
  })()
}
```


### 前端 首页 html 部分结构
模板语法:
模板语法 不是要先建立好模板 只传递前端模板, 也可以直接在现成的网页中使用

if else
```js 
根据user_info 要么展示上面, 要么展示下面
{{if user_info}}

  <html部分1>

{{else}}

  <html部分2>

{{/if}}
```
```js 
  - 要么展示上面的 要么展示下面
  - 因为html结构是 登录状态在下面 所以 我们对!user_info取反
  - 后端会传递一个对象过来, {}转为布尔值就是true

  {{if !user_info}}
  <div class="user_btns fr">
      <a href="javascript:;" class="login_btn">登录</a> / <a href="javascript:;" class="register_btn">注册</a>
  </div>

  {{else}}

  ```js 用户登录后显示下面, 隐藏上面 -- >
  <div class="user_login fr">
      <img src="/news/images/person01.png" class="lgin_pic">
      <a href="#">{{user_info.nick_name}}</a>
      <a href="#" onclick="logout()">退出</a>
  </div>
  {{/if}}


  只要session还在 状态就会一直被保持
```

<br><br>

### 退出登录接口
退出登录的功能, 为什么发送ajax请求, 为什么成功的回调里面要刷新页面
我们在passport中路由文件中, 处理退出登陆的逻辑

### 怎么样才算退出登录了? 
核心就是清空 session 里面的 user_id
```js 
  delete req.session['user_id']; 
```


### 注意:
我们对接口发出的请求, 服务器必须在这个接口中有send也就是返回
```js 
  我遇到了删除session后 无法显示登录 / 注册 的结构的问题, 原因就是服务器对提交的请求没有给出相应
```

```js    
  // 退出登录
  function logout() {
      $.ajax({
          // 接口
          url:'/passport/logout',
          type:'post',
          //headers:{'X-CSRFToken':getCookie('csrf_token')},
          success:function (resp) {

              // 成功了之后刷新页面 相当于重新提交了登录请求
              window.location.reload()
          }
      })
  }


  // 服务端 退出登录接口
  // 退出登陆接口
  router.post('/passport/logout', (req, res) => {
      delete req.session['user_id'];
      res.send({errmsg: '退出登录成功'});
  })
```

<br><br>

### 给用户设置最后一次的登录时间
在数据表中的结构是(字段名: last_login)
为什么要设置最后一次的登录时间呢? 为了以后扩展功能 比如统计用户活跃度, 回归玩家
```js 
  // 统计用户活跃度
  在每一次登录的时候 我都给用户设置 last_login 把最后一次的时间记下来, 这样我就知道这个用户在某一个时间段内
  用户的活跃数有多少, 比如可以把5月份的客户都挑出来
```

在我们上面的一系列案例中 有两个地方需要设置 last_login 字段, 并给它一个系统的当前时间作为值
1. 登录 登录成功就往这个字段中设置一个系统的当前时间
2. 注册 注册成功也设置一个系统的当前时间
```js 
  new Date().toLocaleString();
  "2021/6/4下午10:27:55"
```

### 注册接口中
```js 
  // 判断用户是否注册了
  if (result[0]) {
      res.json({errmsg: '用户名已经被注册'});
    return;
  }

  // 如果用户没有被注册, 我们可以在这里 多往数据库里添加一个字段的记录
  let result2 = await handleDB(res, 'info_user', 'insert', '数据库插入出错', {
      username,
      password_hash: password,
      nick_name: username,
      last_login: new Date().toLocaleDateString()
  })

  // 5. 状态保持 保持用户的登录状态
  req.session['user_id'] = result2.insertId;
```


### 登录接口中
我使用toLocaleString 会报错 因为
```js 
  // 5. 到这里(上面的情况都return了) 如果用户名 和 密码都没问题 就保存用户的登录状态
  req.session['user_id'] = result[0].id;

  // 设置最后一次的登录时间 last_login字段, 本质上就是修改数据库
  await handleDB(res, 'info_user', 'update', '数据库修改出错', `id=${result[0].id}`, {last_login: new Date().toLocaleDateString()})

  修改 id为 result[0].id 的这个用户的 last_login字段 为当前系统时间
```

<br><br>

### 首页头部分类完成
就是导航栏那地儿, 点按钮展示对应的按钮相关的信息
也就是说 现在网站上页面中的内容 都是从数据库里获取过来展示到页面上的, 这个部分我们说下 后台查询数据库将按钮的部分展示到页面上
数据库中 对应的表 info_category

因为是登录网站后能看到的页面, 也就是首页, 所以我们要在首页的接口里面操作

### 服务端代码部分, '/' 接口
我们现在要处理的是 导航条部分的展示(从数据库取出数据 动态渲染到页面上)
那就需要操作数据库 我需要从数据库中 取出关于 分类 的数据
```js 
  // orm语法 where的部分是指定字段名 参数类型是一个数组
  let result2 = await handleDB(res, 'info_category', 'find', '查询数据库出错', ['name']);
```

然后我需要把查出来的数据, 传到前端页面上
我们要把传到前端的数据都要放在 data 里面 统一发送到前端

**前端在获取的时候 可以直接通过 属性名 来获取 (直接使用: user_info , category)**
```js 
  let data = {
      每一条数据(对象),
      每一条数据(对象),
      每一条数据(对象)
  }

  let data = {
  
    // 第一条数据
    user_info : result[0] ? {
      nick_name : result[0].nick_name,
      avatar_url : result[0].avatar_url
    } : false,

    // 第二条数据
    category: result2
  }
```


### 前端页面
要是想在前端页面使用后台传递过来的数据 那么肯定是 {{ }}
这里我们渲染一堆数据 用到了遍历
**{{each 表名}} {{/each}}**

```js 
  前端页面结构
  <ul class="menu fl">
      <li data-cid="1" class="active"><a href="javascript:;">最新</a></li>
      <li data-cid="2"><a href="javascript:;">股市</a></li>
      <li data-cid="3"><a href="javascript:;">债市</a></li>
      <li data-cid="4"><a href="javascript:;">商品</a></li>
      <li data-cid="5"><a href="javascript:;">外汇</a></li>
      <li data-cid="6"><a href="javascript:;">公司</a></li>
  </ul>
```

我们看看哪些部分需要动态
1. data-cid="1" 需要动态
2. 最新 内容部分需要动态
3. 当前类名的部分, 只有第一个有 其它的没有

### 1. {{$index+1}}
```js 
  {{each category}}
      <li data-cid={{$index+1}} class={{$index===0?'active':''}}><a href="javascript:;">{{$value.name}}</a></li>
  {{/each}}
```

### 2. {{$value.name}}
### 3. 这里我们记住这个案例吧, 只要涉及到 当前类 的情况 我们就这样
```js 
  class={{$index===0?'active':''}}
```

前端部分 完整代码
```js 
  <ul class="menu fl">
      {{each category}}
          <li data-cid={{$index+1}} class={{$index===0?'active':''}}><a href="javascript:;">{{$value.name}}</a></li>
      {{/each}}
  </ul>
```

<br><br>

### 右侧点击排行的新闻标题展示
点击排行的特点 这个区域里面的内容是新闻的标题(数据库中新闻表的标题字段)
这些新闻的标题是根据(数据库中新闻表内的点击量) 来确定排序的
```js 
  每一篇新闻都会有一个字段名(clicks) 点击量, 点击排行就是点击量最高的排在第一位
```

也就是说我们要根据数据库中的数据 动态的将它们展示到页面上
所以我们要 查询数据库 --- 排序 --- 取前几条(这里是6条)

相关的逻辑是在 '/'接口中完成的

### 查询数据库的方式有两种
```js     
  这个查询有两种方式
  通过 sql    方法
  通过 find   方法

  sql方法:
  - 我们在n1的位置 写上了 sql语法 意思是查询info_news表中的所有信息 按照点击量 降序排序 显示前6条

  let result3 = await handleDB(res, 'info_news', 'sql', '查询数据库出错', 'select * from info_news order by clicks desc limit 6')

  ----------

  find方法
  - 使用find方法 如果不写 n1 则为查询表的全部内容 如果写了n1参数, 那么n1参数就是条件 相当于 where 后面的部分

  let result3 = await handleDB(res, 'info_news', 'find', '查询数据库出错', '1 order by clicks desc limit 6')

  // 我们在n1的位置上 首先写了个 1 这个很重要
  查询所有相当于:
  select * from info_news where 1

  后面还有其它条件 order by clicks desc limit 6

  所以我们要把 1 order by clicks desc limit 6 写到参数n1的位置上
```

### 服务端的完整代码
```js 
// 访问首页的接口
router.get('/', (req, res) => {
(async function() {
  let user_id = req.session['user_id'];
  let result = [];   // 数组
  if(user_id) {
    result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
  }

  /* 
  ---------------------------------------------------
  */

  // 展示首页头部的分类信息
  let result2 = await handleDB(res, 'info_category', 'find', '查询数据库出错', ['name']);



  // 展示 右侧 点击排行 里的 新闻标题的信息
  // let result3 = await handleDB(res, 'info_news', 'sql', '查询数据库出错', 'select * from info_news order by clicks desc limit 6')

  let result3 = await handleDB(res, 'info_news', 'find', '查询数据库出错', '1 order by clicks desc limit 6')

  /*
  ---------------------------------------------------
  */

  // 要传递到前端的数据

  // 那我现在得到了用户的数据对象, 接下来怎么办, 我们可以把用户的数据组织成一个对象, 传递到模板里面去
  let data = {
    user_info : result[0] ? {
      nick_name : result[0].nick_name,
      avatar_url : result[0].avatar_url
    } : false,

    // 首页分类区块的按钮信息
    category: result2,

    // 点击排行 展示的信息
    newsClick: result3

  }
  console.log(result);
  res.render('news/index', data);
})()
```


### 前端代码:
遇到的问题
我们遍历遍历出来统一的样子, 但是有些情况需要一些不一样的地方
比如下面的例子中 内容不一样 我们使用了 {{$value.title}}
新闻标题前面的序号不一样 我们使用了 {{$index+1}}

但是 新闻标题前面的序号 前三个样式各不相同, 这怎么操作?

>方式1: 利用三元运算符
```js 
  <li><span class="{{$index==0?'first':$index==1?'second':$index==2?'third':''}}">{{$index+1}}</span><a href="#">{{$value.title}}</a></li>
```
```js 
  <ul class="rank_list">
      {{each newsClick}}
          <li><span class="{{$index | classNameFilter}}">{{$index+1}}</span><a href="#">{{$value.title}}</a></li>
      {{/each}}


  ```js 
      <li><span class="first">1</span><a href="#">势如破竹！人民币再度连闯四道关口 在岸、离岸双双升破6.42</a></li>
      <li><span class="second">2</span><a href="#">凛冬已至, 还有多少银行人在假装干银行</a></li>
      <li><span class="third">3</span><a href="#">人民日报: 部分城市楼市放松限制引关注, 楼市调控不会“拉抽屉”</a></li>
      <li><span>4</span><a href="#">势如破竹！人民币再度连闯四道关口 在岸、离岸双双升破6.42</a></li>
      <li><span>5</span><a href="#">凛冬已至, 还有多少银行人在假装干银行</a></li>
      <li><span>6</span><a href="#">人民日报: 部分城市楼市放松限制引关注, 楼市调控不会“拉抽屉”</a></li> 
  -- >
  </ul>
```

### 方式2: 使用过滤器
{{ }} 过滤器函数会将过滤后的结果展示到括号中, 我们使用过滤器展示进去 first second third '' 就可以了

一般过滤器都当做工具来使用 我们创建一个filter.js文件 放在utils文件夹里面
使用过滤器要调用 template.defaults.imports.xx = function() {} 的方法
要先引入 art-template
```js    
  filter.js 文件中:

  const template = require('art-template');

  template.defaults.imports.classNameFilter = function(value) {
      if(value === 0) {
          return 'first';
      } else if (value === 1) {
          return 'second';
      } else if (value === 2) {
          return 'third'
      } else {
          return ''
      }
  };


  html文件:
  {{each newsClick}}
      <li><span class="{{$index | classNameFilter}}">{{$index+1}}</span><a href="#">{{$value.title}}</a></li>
  {{/each}}

  classNameFilter函数的value变量 会接收 | 前的值, 因为 类型跟index有关系, 比如第一个是 'first' 第二个是'second'.... 所以把 $index 传递进去
```

页面在哪个路由文件中, 就在哪个路由文件中引入就可以了
```js 
  require('../utils/filters'); 这不是使用 只是需要它执行 不用接收
```

<br><br>

### 给每一个POST请求添加CSRF防护
我们简单的回顾下怎么给每一个post请求添加csrf防护
首先 在浏览器请求页面的时候, 在服务端给浏览器 颁发一个 token
```js 
  let csrf_token = getRandomString(48);
  res.cookie('csrf_token', csrf_token)

  需要用到的函数:
  function getRandomString(n) {
      let str = '';
      while(str.length < n) {
          str += Math.random().toString(36).substr(2);
      }

      return str.substr(str.length-n);
  }
  getRandomString(48)
```


然后 浏览器在提交post请求的时候 设置请求头 读取cookie中的token
```js 
  $.ajax({
      url:'/transfer',
      type:'post',
      data:JSON.stringify(params),
      contentType:'application/json',

      // 设置请求头 将csrf_token的值设置为服务端设置的token值
      headers:{'X-CSRFToken':getCookie('csrf_token')},

      success: function (resp) {
          console.log("回调成功了");
          console.log(resp);
          
          alert(`转账${resp.money}元到${resp.to_account}成功！`);
      }
  })

  // 需要使用到的函数:
  function getCookie(name) {   //获取cookie的函数
      let r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
      return r ? r[1] : undefined;
  }
```


然后 服务端验证请求头中和cookie中的csrf_token值
获取cookie中的token值
req.cookies["csrf_token"]

获取请求头中的cookie中的token值 属性名改为小写!!!!
req.headers['x-csrftoken']


需要用的钩子函数
```js    
  function csrfProtect(req, res, next) {
      // 这里的代码将在执行router下的接口之前的时候执行

      if(req.method === 'GET') {
          let csrf_token = getRandomString(48);
          res.cookie('csrf_token', csrf_token); 

      } else if (req.method === 'POST') {
          console.log(req.headers["x-csrftoken"]);
          console.log(req.cookies["csrf_token"]);

          if((req.headers["x-csrftoken"] === req.cookies["csrf_token"])){
              console.log("csrf验证通过！");
  
          }else{
              res.send("csrf验证不通过！");
              return
          }    
      }


      next()
  }
```

### 准备工作完成 我们听课
上面我们复习了下 csrf防护的大致流程, 最后介绍到了钩子函数 它配合路由使用 可以在使用指定接口文件前, 统一调用该函数
这个钩子函数 也是工具函数, 所以也放在utils文件夹里面, 定义一个common.js 公共的(哪一个接口都可以使用)
```js 
  common.js文件中 有:

  function csrfProtect(req, res, next) {
  // 这里的代码将在执行router下的接口之前的时候执行

  if (req.method === 'GET') {
      let csrf_token = getRandomString(48);
      res.cookie('csrf_token', csrf_token);

  } else if (req.method === 'POST') {
      console.log(req.headers["x-csrftoken"]);
      console.log(req.cookies["csrf_token"]);

      if ((req.headers["x-csrftoken"] === req.cookies["csrf_token"])) {
      console.log("csrf验证通过！");

      } else {
      res.send("csrf验证不通过！");
      return
      }
  }


  next()
  }

  // 生成随机数 函数
  function getRandomString(n) {
  let str = '';
  while (str.length < n) {
      str += Math.random().toString(36).substr(2);
  }

  return str.substr(str.length - n);
  }

  module.exports = {
  csrfProtect
  }
```

那这个common.js 中的 csrfProtect 函数写在哪里呢?
写在app.use(xxx, 路由文件里), use相关的让我们抽在config.js里面了
所以在 config.js文件中 先要引入 common.js
```js 
  const common = require('./utils/common');

  // 整个网站都加上了 csrf 防护
  this.app.use(common.csrfProtect, indexRouter);
  this.app.use(common.csrfProtect, passportRouter);
```


设置完服务端的了 该设置浏览器端了 所有的请求头需要设置token
```js    
  注册 登录 退出 中的ajax提交中 都要设置请求头
  headers:{'X-CSRFToken':getCookie('csrf_token')},

  getCookie() 函数 是我们自定义的函数 看看在不在前端代码中

  如果没设置请求头因为两边的token验证不成功会验证不通过
  另外 我们前端输出的提示 都是ajax的回调里面 它需要一个errmsg 假如我们后台的代码没有send errmsg 前端的提示将会是undefined
```

<br><br>

### Base64
目前 Base64 已经成为网络上常见的传输 8bit 字节代码的编码方式之一 在做支付系统时, 系统之间的报文交互都需要使用 Base64 对明文进行转码, 然后再进行签名或加密, 之后再进行(或再次 Base64)传输 那么, Base64 到底起到什么作用呢？

在参数传输的过程中经常遇到的一种情况: 使用全英文的没问题, 但一旦涉及到中文就会出现乱码情况 

与此类似, 网络上传输的字符并不全是可打印的字符, 比如二进制文件、图片等 Base64 的出现就是为了解决此问题, 它是基于 64 个可打印的字符来表示二进制的数据的一种方法 

电子邮件刚问世的时候, 只能传输英文, 但后来随着用户的增加, 中文、日文等文字的用户也有需求, 但这些字符并不能被服务器或网关有效处理, 因此 Base64 就登场了 随之, Base64 在 URL、Cookie、网页传输少量二进制文件中也有相应的使用 

简单的来说, base64 是编码不是加密, 编码是为了更好的传输数据, 为什么会更好的传输数据上面有讲到

还有在我们对中文进行加密的时候, 实现加密的时候本身是对一些英文 符号的加密,对中文不支持的状态, 那我们就是想对中文进行加密怎么办? 就需要base64 把中文编成看似英文的字符串 再进行加密

encode  编码    由我们看的懂的 编成 看不懂的
decode  解码    由我们看不懂的 编成 看的懂的

### 前端使用 base64
https://www.runoob.com/jsref/met-win-atob.html

```js 
  function base64Encode(str) {
      return window.btoa(unescape(encodeURIComponent(str)));
  }
  
  function base64Decode(str) {
      return decodeURIComponent(escape(window.atob(str)));
  }
  base64Encode('Man');                 
  base64Decode('TWFu'); 
```

### 后端使用 base64
后端的有一个base64的模块
npm i js-base64 --save -dev
```js 
  const Base64 = require('js-base64').Base64;
  Base64.encode('hello');
  Base64.decode('aGVsbG8=');
```

<br><br>

### 加密
在密码学中, 加密(英语: Encryption)是将明文信息改变为难以读取的密文内容, 使之不可读的过程 只有拥有解密方法的对象, 经由解密过程, 才能将密文还原为正常可读的内容 

虽然加密作为通信保密的手段已经存在了几个世纪, 但是只有那些对安全要求特别高的组织和个人才会使用它 在 1970 年代中期, “强加密”(Strong Encryption)的使用开始从政府保密机构延伸至公共领域, 并且当前已经成为保护许多广泛使用系统的方法, 比如因特网电子商务、手机网络和银行自动取款机等 

### 术语
明文 | 原文(plaintext): 
      基于安全方面的考量, 在开发中进行数据交互的时候通常我们会对一些敏感的用户隐私数据进行加密处理, 需要进行加密的消息我们称为明文或者是原文 

密文(ciphertext): 
      采用特定方式对明文 | 原文加密之后得到的结果称为密文 

加密(encrypt): 
      加密是一种对明文的特定处理方式, 对明文加密之后可以得到对应的密文, 加密的方式和结果取决于特定的加密算法 

算法(algorithm): 
      用于解决(复杂)问题的特定步骤, 通常称为算法 算法为我们提供了一条解决问题的特定路径, 解决同一个问题可以有多种不同的算法 

加密算法(encrypt-algorithm): 
      从明文生成密文的具体步骤, 也就是加密的特定步骤我们称为加密算法 

解密(decrypt): 
      解密是一种对密文的特定处理方式, 对密文解密之后可以得到对应的明文 所以, 解密指的是根据密文得到原文的过程 

解密算法(decrypt-Algorithm): 
      从密文还原出明文|原文的具体步骤, 也就是解密的特定步骤我们称为解密算法 

密码算法: 
      等于加密算法 + 解密算法  

密钥(key): 
      密钥在很多加密算法中使用, 它就好像我们现实生活中的钥匙一样, 很多加密算法在加密和解密的时候都需要用到密钥, 就好像很多锁在打开和锁起来的时候都需要用到钥匙一样 


### 信息安全性
加密可以用于保证安全性, 但是其它一些技术在保障通信安全方面仍然是必须的, 尤其是关于数据完整性和信息验证 

### 加密算法
不可逆算法: 
      密码散列函数(英语: Cryptographic hash function), 又译为加密散列函数、密码散列函数、加密散列函数, 是散列函数的一种 它被认为是一种单向函数, 也就是说极其难以由散列函数输出的结果, 回推输入的数据是什么 这样的单向函数被称为“现代密码学的驮马” 这种散列函数的输入数据, 通常被称为消息(message), 而它的输出结果, 经常被称为消息摘要(message digest)或摘要(digest) 

可逆算法: 
  - 对称加密: 
      将信息使用一个密钥进行加密, 解密时使用同样的密钥, 同样的算法进行解密 

  - 非对称加密: 
      又称公开密钥加密, 是加密和解密使用不同密钥的算法, 广泛用于信息传输中 

<br><br>

### 单向散列函数
单向加密的一种算法, 不可解密

  密码散列函数(英语: Cryptographic hash function), 又译为加密散列函数、密码散列函数、加密散列函数, 是散列函数的一种 它被认为是一种单向函数, 也就是说极其难以由散列函数输出的结果, 回推输入的数据是什么 这样的单向函数被称为“现代密码学的驮马” 这种散列函数的输入数据, 通常被称为消息(message), 而它的输出结果, 经常被称为消息摘要(message digest)或摘要(digest) 

在信息安全中, 有许多重要的应用, 都使用了密码散列函数来实现, 例如数字签名, 消息认证码 


### 特点
加密的时候是单向的(只可以加密不能解密)；
加密得到的密文长度总是定长的, *不管是hello 还是13 还是abc 都是定长的*

明文相同, 那么密文一定相同；
```js 比如将来有两个用户的密码明文是一样的 密文也会是一样的```

明文不同, 那么密文一定不同；
性能好, 效率高 


### 常见的算法
下面的算法 加密之后不允许解密:
MD 系列: MD5
SHA 系列: SHA-256


### 应用场景
密码存储
文件完整性验证
```js 
  整个过程是 将明文 经过算法 转换成密文, 原文件 经过同样的算法 两次得到的密文相同既是完整的文件
```

<br><br>

### 对称加密
```js 
                            密钥
                  ↙                    ↘
  明文    →    加密    →    密文    →    解密    →    明文

  // 最后怎么验证我的明文是正确的 我们通过密文 经过同一把密钥对密文进行解密 这个过程是可逆的加密方式
```

对称密钥算法(英语: Symmetric-key algorithm)又称为对称加密、私钥加密、共享密钥加密, 是密码学中的一类加密算法 这类算法在*加密和解密时使用相同的密钥*, 或是使å用两个可以简单地相互推算的密钥 事实上, 这组密钥成为在两个或多个成员间的共同秘密, 以便维持专属的通信联系 

为什么叫对称加密呢, 你可以这么理解, 
  一方通过密钥将信息加密后, 把密文传给另一方, 
  另一方通过这个相同的密钥将密文解密, 转换成可以理解的明文 他们之间的关系如下: 
  
      明文 <-> 密钥 <-> 密文 
<!-- 一把秘钥 -->


### 特点
可以加密也可以解密, 使用密钥；
与非对称加密相比, *要求双方获取相同的密钥*是对称密钥加密的主要缺点之一, *但对称加密的速度快很多* 


### 常见算法
常见的对称加密算法有 DES、3DES、AES、Blowfish、IDEA、RC5、RC6 


### 常见应用场景
对用户的敏感信息, 比如身份证号码, 手机号码等等加密存储, 同样显示的时候也需要反向解密出来 
```js 好像只是为了展示用, 并不是问了私密性往数据库里面存之类的```

<br><br>

### 非对称加密
假如一个用户 要发送一份特别重要的数据给服务端, 我们看下对这段重要信息是如何使用非对称加密的

### 步骤:
1. 客户端 向 服务端 请求一把钥匙(公钥)
2. 服务端返回公钥
3. 客户端使用公钥对数据加密后 将加密后的数据 连同 公钥 传输到服务端 (服务端需要通过公钥找对应的私钥)
4. 服务端使用私钥对数据进行解密

```js 
  1. 客户端 会先向 服务端请求 一把钥匙(钥匙是服务端给的, 公钥(服务器公开的钥匙))
  ----- 在生成公钥的时候 会自动生成一把对应的私钥

  2. 服务端 返回公钥 给 客户端

  3. 客户端会对数据进行加密(加密的时候需要用到公钥) 然后传输给 服务器端(传输的是加密后的数据, 同时还会把公钥传输给服务器端, 服务器端需要通过公钥去找私钥)
  ----- 公钥是客户端用来对数据进行加密的

  4. 服务器端利用私钥对加密后的数据进行解密(得到原文数据)

  客户端                  服务端
```

*加密和解密的钥匙是不一样的所以叫做非对称加密*


### 特点
加密的时候使用公钥, 解密的时候使用私钥；
公钥是公开的, 私钥是私有的；
相对于对称加密性能差, 但比其安全, 因为公钥可以被伪造 


### 常见算法
常见的对称加密算法有 RSA 


### 常见应用场景
在 HTTPS 协议中用于对称加密的私钥传输 

<br><br>

### md5的使用
md5是不可逆的单项散列函数之一, 项目中用的比较多, 比如我们存在数据库里面的密码, 至少不能让会操作数据库的人去直观的看到密码吧

npm i md5 --save-dev

```js 
  const md5 = require('md5');
  console.log(md5('hello'));
```

在线破解md5:
https://www.cmd5.com
```js 
  这个网站并不是破解密文, 而是在这个网站中存储了很多明文 和 密文的对应关系, 我们查询到的是对应关系
```

### 项目当中使用的方式是: 双重md5加盐加密
我们项目中不会直接使用md5()进行加密, 因为有各种各样的在线破解网站, 那怎么办, 一般项目中最流行的方式就是:

双重md5加盐加密的处理方式
```js 这个随便敲的字符串就相当于 盐```

```js 
  // 我们对密码进行一次md5加密, 然后在结果上加上随机的字符串 然后再整体加密
  let test = md5(md5('hello')+'随便敲的字符串')
  console.log(test);
```


### 怎么对加密后的结果 我们怎么添加到数据库中?
下面这样做基于md5本身属于单项散列函数, 单项散列函数的特点:(不可逆)明文相同, 加密后的密文就一定相同

1. 我们将 密码 - 双重md5加密加盐的结果存储到数据中
2. 用户登录时输入的密码 - 双重md5加密加盐 
3. 服务端拿着 双重md5加密加盐的密码 和 数据库中的密码 进行比较

```js 
  用户注册:
  我们将  md5(md5('密码') + '盐')  这个结果存储到 数据库中 password_hash 字段

  然后用户登录, 输入密码, md5(md5('输入密码') + '盐')

  服务器拿着 md5(md5('输入密码') + '盐') 和 数据库中的字段进行比较 看结果一致不一致
```

我们再passport.js文件中的 register 接口里
```js 
  // 项目中的代码: 我们有一段是往数据库插入未注册用户信息的
  let result2 = await handleDB(res, 'info_user', 'insert', '数据库插入出错', {
      username,

      // 对密码进行双重md5加盐的形式 去加密密码
      password_hash: md5(md5(password)+'$^$^%#$^$'),
      nick_name: username,
      last_login: new Date().toLocaleDateString()
  })
  

  // 将这段代码改成 - 然后我们用户登录的时候 在login 接口 我们有验证密码的逻辑
  if(password !== result[0].password_hash) {
    res.send({ errmsg: '密码错误, 用户登录失败' })
    return;
  }

  // 要改成 ↓

  // 将用户输入的密码 在服务端进行双重md5加密加盐后 与 服务器中的密码进行比较
  if(md5(md5(password)+'$^$^%#$^$') !== result[0].password_hash) {
      res.send({ errmsg: '密码错误, 用户登录失败' })
      return;
  }

  // 这里要注意的是 盐 也要一模一样
```

### 将我们项目中所有使用到的key(盐), 单独的抽取成一个js文件
上面所说的盐 我们也称之为 key, 一个项目当中会有很多很多的key值, 所以我们把这些key值提取出来放在一个 keys.js里 放在根目录下
```js 
  module.exports = {
      session_key: '&*(A&F^AS*^F&*ASDG',
      password_salt: '$^$^%#$^$'
  }
```

以后哪有地方需要使用到key 记得我们需要导入
```js 
  let result2 = await handleDB(res, 'info_user', 'insert', '数据库插入出错', {
      username,
      password_hash: md5(md5(password) + keys.password_salt),
      nick_name: username,
      last_login: new Date().toLocaleDateString()
  })


  // 这里使用 md5(md5(password) + keys.password_salt) 进行对密码的验证
  if (md5(md5(password) + keys.password_salt) !== result[0].password_hash) {
      res.send({ errmsg: '密码错误, 用户登录失败' })
      return;
  }
```

**注意:**
这个部分的加密逻辑都是在后台接口中完成的 少了前段密码加密的部分

<br><br>

### JWT token 三大部分介绍
企业级别的登录的话, 都是使用 Json Web Token 这种方式
假如公司只是做网站的话 可以使用我们前面用的session登录可以 但是做好csrf防护就可以

cookie 和 session 是浏览器中cookie的行为 为自动提交嘛, 之前我们说的csrf防护都是针对浏览器的行为, 利用了浏览器的行为

*但是app程序的登录怎么办? 安卓 ios应用里面都没有所谓的cookie 和 session(这里不说手机端里的浏览器)*

```js 
  app程序     --- 数据 --- >      API

                  JWT
              +-----------+
              + user data +
              +-----------+

      JWT相当于在用户数据的外层套了一个壳子
  
```
app程序和API(服务器)相互交换数据的时候, 利用JWT在用户数据的外层套了一个壳子, 也可以理解为加了一层密 为了安全的考虑 不会把用户的数据裸放进行传输, 比如截取数据之后 看里面的数据或串改里面的数据


### Token长什么样子 标准token值
token值实际上有三个部分 以 . 来分割

```js 
  标准的Token值也就是 JWT 

  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ6aGFuZ3NhbiIsImlhdCI6MTU4NjEyNTUwMywiZXhwIjoxNTg2MTMyNzAzfQ.Uwx-EzPq2c9oDJxfs0nCrWLAcTS89HxPBqTUbx91gwY

  以 . 来结尾

  // 头部 header
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.

  // payload 载荷
  eyJpZCI6MSwidXNlcm5hbWUiOiJ6aGFuZ3NhbiIsImlhdCI6MTU4NjEyNTUwMywiZXhwIjoxNTg2MTMyNzAzfQ.

  // signature 签名
  Uwx-EzPq2c9oDJxfs0nCrWLAcTS89HxPBqTUbx91gwY

  // 上面都是加密后的结果
```

Token值使用来包裹用户数据的

### header
是一个base64 的对象 里面都是 base64 编码后的结果
里面包含了以下的东西
```js 
  {
      签名的加密类型: xxx
      typ: 'JWT'
  }
```

### 载荷
主要的信息在 载荷当中存储着 base64 的用户数据

### 签名
里面是加密的结果
主要用来做验证 token 的, 也叫作验证签名 叫做 验签, 在服务端完成
签名部分里面的 盐 只有服务器知道, 所以别人伪造不了
```js 
  base64(hear) + '.' + base64(payload) + '.' + 盐(这个盐只有服务器知道)
```


### 验签的原理
怎么确保 浏览器请求是携带的token值是有效的 不是伪造的, 就需要验签
1. 首先它会取到 token 值
```js 
  特别长的标准 token 带 头 载荷 签名
```

2. 对header部分 进行base64 的编码 然后对 payload的部分也进行一个 base64的编码 用.拼接 最后加上盐

3. 上面的拼接好后, 进行一下加密处理 加密处理的结果 和 第三步部分(签名)进行对比 如果一致说明token有效


### 我们看看JWT请求的流程
1. 生成 token
2. 验证 token

```js 

  浏览器              服务器

  1. 浏览器 向 服务器 请求一个 JWT token

  2. 服务器 在服务器端生成 token 响应回浏览器

  3. 浏览器在发起请求的时候 会携带 token 发送到服务器 比如 用户点击收藏 的请求

  4. 服务器 验证token 是不是有效的token 无效return(比如请求伪造)
      - 服务器会拿到token 分别会头 载荷部分进行 base64编码 编码 再加密,
      - 然后将加密的结果, 跟浏览器发送过来的token的第三部分做对比 一致就是有效
```

<br><br>

### jsonwebtoken的使用
npm i jsonwebtoken --save

### 生成token值

### jwt对象.sign({用户数据}, salt, {过期时间})

**参数1:**   
类型: 对象  
作用: 盛放数据 键值对结构

<br>

**参数2:**   
类型: String, privateKey  
盐, 也是需要自己手动输入随机字符串的

<br>

**参数3:**   
过期时间(expiresIn: 过期时间 单位是秒)  
一般来讲 token 存2个小时

<br>

**返回值:**  
token

<br>

**使用场景:**  
当用户登录成功后 我们返回一个token 让前端保存
```js
app.post("/login", (req, res) => {
  let _usernmae = "admin"
  let _password = "admin"

  let {username, password} = req.body

  if(_usernmae != username || _password != password) return res.send({msg: "用户名或密码错误", code: 201})

  // 生成一个token
  let token = jwt.sign(user, salt, {expiresIn: 600})

  res.send({
    msg: "登录成功",
    token,
    code: 200
  })

})
```

```js 
router.get('/passport/token', (req,res) => {
  const token = jwt.sign({ id: 1, name: 'zhangsan' }, keys.jwt_salt, { expiresIn: 60 * 60 * 2})

  // 响应回浏览器完整的restful风格的接口
  // res.json()
  res.send({
      errmsg: 'success!',
      errno: '0',

      // 客户端请求的原因
      reason: '登录请求',
      result: {
        token
      }
  })
})
```

<br>

### jwt.verify(token, salt, (err, decode) => {})
使用 jwt.verify函数以验证token是否正确, 我们传入token和分发token时的密钥(两个密钥须一致), 回调函数就会处理

**注意:**  
生成 token 时 使用的 salt 必须一致

**参数:**  
1. token: 从前端请求头中获取的token
2. privateKey: 生成token的时候使用的 秘钥
3. (err, decode) => {}  
如果验证失败 就会抛出err,
decode是解析token后 拿到的数据部分

```js
app.get("/", (req, res) => {

  let token = req.headers["token_test"]

  jwt.verify(token, salt, (err, decode) => {
    if(err) {
      res.send({msg: "验签失败", code: 201})
    } else {
      res.send({msg: "验签成功", code: 200})

      // decode: 就是 生成token的时候使用的用户数据
    }
  }) 
})
```

<br>

### 前端请求:
```js
;(async () => {

  let {data: res} = await axios({
    url: "http://localhost:3333/",
    headers: {
      token_test: localStorage.token ? localStorage.token : ""
    }
  }) 

  if(res.code == 201) {
    location.href = "./login.html"
    return
  }

  console.log("您可以浏览首页了")
  
})()
```

<br><br>

### postman的使用
测试接口用的 正常在项目中 前端写页面(vue) 后端写接口 这两个部分是同时进行, 不会等到前端页面写完了 再去接后端的代码
后端写接口 又没有页面可以测试的时候 我们就使用postman来测试

<br><br>

### 首页新闻列表的展示需求

我们导航条上有 <最新> <股市> <债市> <商品> <外汇> <公司> 等几个按钮
我们的需求是 按下对应的按钮 展示对应类别的新闻

我们的按钮是根据 分类表(info_category) 请求回来的数据展示到页面上的
我们要展示的新闻 新闻表 每一条记录后面都有对应的 category_id 用来标记该新闻是哪一个分类

<最新> 按钮 是所有的新闻 按照时间来排序的

每页的新闻有5条, 滚动到底部自动加载数据

这些都是前端做的ajax请求

<br><br>

### 首页新闻列表前端代码分析
1. 当我们点击 <股市> 我们肯定是去请求5条数据, 那么我们会带什么参数取请求
\\  一共三个参数要给到后端
```js 
  1. cid
      前端要告诉后台 我要哪一类的新闻 (新闻分类的id) 
      我们看 每一个 分类 按钮的html结构上 都有 data-cid=1-6, 这个要传, 传之后服务器才知道需要在哪一个分类下去查数据

  2. curPage
      前端要告诉后端要第几页(点击按钮都是第一页), 后面再看滚到底部后加载页数的问题

  3. perPage
      前端要告诉后端一页展示几条
```

### 要点:
1. 要是做 滚动到底部 加载的效果 就要设置一个 标识业务状态的变量, 比如: isLoading
```js 
  // 下面使用了
  is_data_querying = true;
```

### 前端代码:
```js 
  var currentCid = 1;     // 当前分类 id
  var cur_page = 1;       // 当前页
  var total_page = 1;     // 总页数
  var is_data_querying = true;   // 是否正在向后台获取数据



  function updateNewsData() {

  // TODO 更新新闻数据 我们上面说的3个参数
  var params = {
      "page": cur_page,
      "cid": currentCid,
      'per_page': 5
  }

  //开始请求, 将is_data_querying设置为true
  // 为了判断是否正在加载 / 查询
  is_data_querying = true;


  // $的get方法
  $.get("/news_list", params, function (resp) {
      // 设置 `数据正在查询数据` 变量为 false, 以便下次上拉加载

      if (resp) {

          // 先清空原有数据 先将装新闻列表的容器清空
          if(cur_page == 1){
              $(".list_con").html('')
          }

          // 显示数据 这个newsList 就是我们后台返回的5条数据 下面是遍历
          for (var i=0;i<resp.newsList.length;i++) {
              var news = resp.newsList[i]

              // 下面在组织每一个新闻列表的结构
              var content = '<li>'
              content += '<a href="/news_detail/'+ news.id + '" class="news_pic fl"><img src="' + news.index_image_url + '?imageView2/1/w/170/h/170"></a>'
              content += '<a href="/news_detail/'+ news.id + '" class="news_title fl">' + news.title + '</a>'
              content += '<a href="/news_detail/'+ news.id + '" class="news_detail fl">' + news.digest + '</a>'
              content += '<div class="author_info fl">'
              content += '<div class="source fl">来源: ' + news.source + '</div>'
              content += '<div class="time fl">' + news.create_time + '</div>'
              content += '</div>'
              content += '</li>'

              // 组织好后的结构追加到ul中
              $(".list_con").append(content);


              // 修改当前js的获取数据的状态为flase, 表示已经获取完数据了
              is_data_querying = false;


              // 根据后端返回的总页码和当前页码, 重新设置
              total_page = resp.totalPage;
              cur_page = resp.currentPage;
          }
      }else{
          // 请求失败
          alert(resp.errmsg);
      }
  })

}
```

<br><br>

### 首页新闻列表后端代码分析 和 实现
新闻列表的请求逻辑我们写在 index.js 路由文件中, 因为都是跟首页相关
我们看看需要在后端的 /news_list 接口中做什么
```js 
  router.get('/news_list', (req, res) =>{

  })
```

1. 我们要获取前端发送过来的参数 判空
```js 
  cid(新闻分类id), page(当前页), per_age(每页条数)


  // 获取参数 cid page per_page 确保页面上首页有数据显示, 我们给它设置默认值 这样参数接收失败页面上也会有数据显示
  let {cid=1, page=1, per_page=5} = req.query;
```

2. 根据上面的参数 查询数据库 获取前端需要的这些数据
但这里需要注意, 分类 id 是 1-6 新闻是按照类别分的, 每一种类别对应着一个id, 但是 新闻表里的新闻id没有1, 因为id为1比较特殊 展示的是所有新闻(按照时间排序 按钮明叫 <最新>)

所以就产生了一个问题, 如果 点击 <最新> 传递的是 id = 1 那就要查询所有表, 如果 点击的是其它按钮, 那id = 2-6 查询的是按类别对应的表, 所以两种情况, 那么我们查询表的时候也要分两种情况

这里我们使用了3元运算符
```js 
  // 正常查询的方式 不包括 id = 1的情况
  let result = await handleDB(res, 'info_news', 'limit', '数据库查询出错', { where: `category_id=${cid} order by create_time desc`, number: page, count: per_page});

  // 包括id为1的情况
  let wh = cid == 1 ? '1' : `category_id=${cid}`;

  let result = await handleDB(res, 'info_news', 'limit', '数据库查询出错', { where: `${wh} order by create_time desc`, number: page, count: per_page });

  我们先对 cid 做了一个判断 看看是不是1 如果是 那就是 1
  where 1 等于查所有 后面才能跟limit等语句 
```

3. 把查询到的新闻数据结果返回到前端
```js 
  // 把查询的结果返回给前端, 返回什么? 看前端成功回调里面有个resp.newList 说明我们必须返回去一个newsList
  res.send({
    newsList: result
  })
```

<br><br>

### 首页新闻列表 加载更多的前端分析

### 要点:
1. 滚轮事件属于频繁触发事件
2. $(window).height()     是当前窗口(可视区域高度) 固定的
3. $(document).height()   整个文档的高度 可超出可视区域
```js 
  改变浏览器窗口的高度 $(window).height() 会发生变化 可 $(document).height() 不会变
```

4. total_page 总页数 和 cur_page页数都是后端给的 因为前端不知道数据总共有多少页
```js 
  前端看不到数据库啊
```

### 做滚动加载更多的核心思路
### is_data_querying 表示请求状态, 防止多次重复请求数据
一旦页面到底部, 就要获取数据, 首先要判断正在获取数据, 没有获取数据的时候 我才能获取数据

  首先我们定义了 is_data_querying 变量 默认值为 true
  然后再更新数据的的函数中 开始将 is_data_querying 设置为 true
  将获取到的数据渲染到页面上后 将 is_data_querying 设置为 false 说明已经获取完数据了

  再再滚动事件 判断滚动条到底的事件中 根据 is_data_querying 来判断是否获取数据
  因为更新完页面数据后 is_data_querying 的状态是 false 所以能进入if判断

  进入if判断后 要将 is_data_querying 改为true 这样频发触发的事件就不能再进到if判断里面, 防止多次请求, 像一个阀门

```js 
  if (!is_data_querying) {
              
      is_data_querying = true;
  }
```

```js 
  $(function () {

  //页面一加载就渲染数据, is_data_querying就为标识为false
  updateNewsData()

  // 首页分类切换 点击导航条的按钮
  $('.menu li').click(function () {

      // 获取自定义属性 cid
      var clickCid = $(this).attr('data-cid')

      // 导航的样式
      $('.menu li').each(function () {
          $(this).removeClass('active')
      })
      $(this).addClass('active')

      // 如果点击按钮的自定义id不是当前显示的id 就赋值给当前id
      if (clickCid != currentCid) {
          // 记录当前分类id
          currentCid = clickCid

          // 重置分页参数 每点击按钮就显示第一页的前5条数据
          cur_page = 1
          total_page = 1

          // 点击按钮后 会向服务器请求数据 然后加载到页面上
          updateNewsData()
      }
  })

  //页面滚动加载相关
  $(window).scroll(function () {

      // 浏览器窗口高度
      var showHeight = $(window).height();

      // 整个网页的高度
      var pageHeight = $(document).height();

      // 页面可以滚动的距离
      var canScrollHeight = pageHeight - showHeight;

      // 页面滚动了多少,这个是随着页面滚动实时变化的
      var nowScroll = $(document).scrollTop();

      // 进入if判断代表已经滚动到底部了(还有100的距离)
      if ((canScrollHeight - nowScroll) < 100) {
          // TODO 判断页数, 去更新新闻数据

          if (!is_data_querying) {
              // 将是否正在向后端查询新闻数据`的标志设置为真 防止页面滚动时又向服务器请求数据
              is_data_querying = true;

              // 判断是否还有`下一页`, 如果有则继续 '请求获取' '下一页'内容
              if (cur_page < total_page) {
                  // cur_page+=1 是为了请求下一页的数据 所以要 + 1
                  cur_page+=1
                  updateNewsData();
              }else {

                  // 将 标识状态再改回false
                  is_data_querying = false;
              }
          }
      }
  })
})
```

<br><br>

### 首页新闻列表 加载更多的后端代码编写
上面说了下 滚动条到达底部时 加载更多数据前端是怎么实现的
判断到底部, 获取文档的高度, 获取窗口的高度, 相减得到可滚动的距离, 然后实时滚动的距离和可滚动的距离相减, <100时触发获取数据

前端还需要一个标识请求数据状态的变量, 这个变量的作用相当于一个开关, 防止多次频发请求数据
实现原理 false状态下进入请求数据的判断后 马上把变量重置为true 然后再在滚动触发的事件就会被挡在门外

前端需要后端告知 数据的总页数 和 当前页是多少

那就要在后端去求总页数 和 当前页数, 因为前端要根据总页面判断是否有下一页, 有下一页的情况下 再去获取数据
```js 
  // 判断是否还有`下一页`, 如果有则继续 '请求获取' '下一页'内容
  if (cur_page < total_page) {
      // 在函数调用之前 cur_page+=1 是为了请求下一页的数据 所以要 + 1
      cur_page+=1
      updateNewsData();
  }
```

### 总结要点:
通过 req.query 拿到的数据 数据类型都是 字符串型
注意 写 'where ' 语句的时候 where的后面要留一个空格

### 后端代码:
1. 我们要获取 总页数(totalPage) 和 当前页数(currentPage)
2. 这里也是一样的 要考虑 cid1 和 cid不是1 的两种情况
3. 我们需要注意 从数据库查询的结果都是[ ] 里面有对象的形式
```js 
  /*
  currentPage = page 
  等于前端传过来的page 因为前端在把page传递过来的时候 已经是下一页的状态(请求的就是下一页的数据) 所以这个page就是当前页

  总页数没有方法直接获取, 只能自己计算, 总条数 / 一页有多少条
  公式:
  总页数 = 总条数 / 一页有多少条
  select count(*) from info_news where ' + wh

  总条数: 总条数 是 select count(*) from info_news;

  对于得到的总页数的结果我们要考虑有除不尽的情况 所以结果我们要使用 Math.ceil 向上取整
  */

  let result2 = await handleDB(res, 'info_news', 'sql', '数据库查询出错', 'select count(*) from info_news where ' + wh);

  // result2 的格式 是什么样的? 是一个数组 [{'count(*) : 1155'}]

  let totalPage = Math.ceil(result2[0]['count(*)'] / per_page);

  res.send({
    newsList: result,
    totalPage,

    // page传到前端是需要进行 逻辑判断的 但是由于后端从req.query里面取到的是 字符串类型 我们可以直接返回去一个数字
    currentPage:Number(page)
  })
```

<br><br>

### 详情页 (点击排行也是同一个接口)
详情页是说 点击新闻后 跳转的页面, 那么怎么查看 超链接的是哪呢? 链接的哪 也就是请求接口就是哪
前端页面做完的时候 href='#', 我们通过动态渲染后 得到了真实的请求接口
```js 
  比如 html页面中 点击 新闻链接的时候 href里 是下面这样的格式 所以我们的接口就是 /news_detail

  '<a href="/news_detail/'+ news.id + '" class="news_title fl">' + news.title + '</a>'

  上面接口的后面还有新闻的id 我们也给写上
  因为这个接口是处理所有新闻请求的, 而不是一片新闻的接口, 所以这里是动态路由, 不同的新闻id 返回不同的结果
```

我们在路由文件夹(routes)中再创建一个关于详情页的接口文件 这个接口负责点击新闻链接后, 返回一个对应新闻的详情页
```js 
  // 到这里 点击首页 新闻链接 不管请求路径是多少(后面的id不一样) 都能响应回一个写死的页面
  router.get('/news_detail/:news_id', (req, res) => {

      res.render('news/detail');
  })
```

### 同时我们要更改一下前端部分的请求路径
1. index.html文件中, 点击排行的<a href='请求路径'>
{{这个在属性中也能使用 厉害}}
```js 
  <li><span class="{{$index | classNameFilter}}">{{$index+1}}</span><a href="/news_detail/{{$value.id}}">{{$value.title}}</a></li>
```

2. detail.html文件中 css样式 js样式看不见 是因为链接地址有问题, 我们应该用 public文件夹获取 把../ 改成 /news/

### 总结:
我们在这里使用了动态路由, 使用同一个接口处理不同的新闻请求
'/news/:news_id'  后端处理接口
'/news/1009'      前端请求路径

<br><br>

### 详情页的模板继承
所谓的模板继承就是 假如两个页面之间有很多相同的部分, 我们就可以通过 模板继承的方式, 去复用这些部分, 主要的思路就是对比两个文件, 找出结构上的不同, 互相留坑

### {{ extend './base.html'}}
写上这句话的文件, 会继承父文件(base.html)里的所有的代码

###  {{block 'titleBlock'}} {{/block}}
可是在页面中留一个坑 供另一个文件来填写


### 具体步骤
1. 把父页面复制一份 起名 base.html
2. 对比 A 和 B 两个页面, 找出共同部分(就是可复用部分)


### 情况1 不同的地方
对于 A 页面来说
不同的部分 删除 留下 {{block '名字'}} {{/block}}

对于 B 页面来说
在{{block '名字'}} {{/block}}中填上自己独特的部分


### 情况2 B页面比A页面多的地方(这个部分也是要保留的)
对于 A 页面来说
找到这个部分 留个坑

对于 B 页面来说
在{{block '名字'}} {{/block}}中填上自己原有的部分


### 总结来说:
拿到 A 页面的内容, 不同的部分删掉并且留坑, 互相拼凑组成自己想要的结果

<br><br>

### 详情页右上角登录展示 和 点击排行的展示
上一节中我们继承了index.html页面里面的内容, 但是还有些问题遗留下来了
1. 首页点击登录, 到了详情页上 没有登录的状态
```js 
  为什么首页是登录的状态, 来到详情页却没有展示登录状态的样式, 并不是已经退出登录了(因为我们设置的session还在), 只是没有展示
  
  进入到一个新的接口的时候, 我们仍然要判断用户的登录状态 也就是 有没有我们设置的session, 当然
  如果已经获取到user_id 要确认这个user_id是有效的, 我们要查询数据库中有没有这个id 如果数据库中有 才能证明是有效id 才能证明你登录了
  所以我们还是需要去查数据库 1是看能不能根据用户id查询到, 而是取出该id的数据, 将里面的头像和姓名 返回前端 让其展示(render(页面, 数据))
  let user_id = req.session['user_id'];
  let result = [];   // 数组

  if(user_id) {
    result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
  }

  let data = {
    user_info : result[0] ? {
      nick_name : result[0].nick_name,
      avatar_url : result[0].avatar_url
    } : false,
    category: result2,
    newsClick: result3
  }

  res.render('news/index', data);


```
2. 点击排行并没有出现数据
我们也需要查询数据库 将数据传到前端 渲染到页面上
```js 
  // 这是点击排行的代码 根据返回的数据 遍历渲染到页面上的

  {{each newsClick}}
      <li><span class="{{$index | classNameFilter}}">{{$index+1}}</span><a href="/news_detail/{{$value.id}}">{{$value.title}}</a></li>
  {{/each}}
```

<br><br>

### index 页面的模板继承
我们前面根据了 index.html(首页) 创建了一个base.html, 所以其他的页面最好也去继承这个模板
这里我们把index.html页面也做了模板的抽离
既然我们做了base.html 那就都做下模板的处理, 达到复用的效果

<br><br>

### 详情页的新闻内容的查询
现在的状态详情页的主体内容是写死的, 我们希望的是 点击一篇新闻后 跳转到详情页能看到此新闻的详情
所以这页的内容也要去查询数据库, 然后通过模板渲染到页面上

查询数据库
我们根据点击新闻的时候传递过来的(/news_detail/??) 文章id 去查

### 动态路由接口 '/news_detail/:news_id'

### req.params 是一个对象 里面第一个值的属性名就是 news_id
```js 
  let {news_id} = req.params;
```

### 1. 获取到新闻的id后 我们根据id去查询数据库
```js 
  let newsResult = await handleDB(res, 'info_news', 'find', '查询数据库出错', `id=${news_id}`);
```

根据上面的id 查询到的数据库的结果如下
```js 
[
RowDataPacket {
  create_time: 2018-01-17T14:59:59.000Z,
  update_time: 2018-03-15T00:48:17.000Z,
  id: 149,
  title: '申度量化数据报告1.17',
  source: '定制机构',
  digest: '申度量化日报',
  content: '<p>报告声明: 该报告仅限华尔街见闻特定客户阅读, 其他机构或个人未经授权不得转载 该报告仅发布客观市场数据, 不作为投资依据, 阅读报告后引发的投资损益由投资人自行承担, 与华尔街见闻无关 </p>\n' +
    '<p>阅读指引: 该报告中所列数据均为客观存在的数据, 用于描述行情所处的状态 不作方向性判断, 不作为投资建议 </p>',
  clicks: 52,
  comments_count: null,
  index_image_url: 'https://wpimg.wallstcn.com/150ee8c4-e56b-4117-b123-c4407c39cae3.jpg',
  category_id: 6,
  user_id: null,
  status: 0,
  reason: ''
}
]
```

### 2. 查询完数据库后 我们把查询到的数据传到前端 在模板中渲染
详情页的左侧内容是写死的 我们通过模板语法 将数据插入到页面中
这里注意 文档中有的语法 有空格就有空格 没空格不要随意加空格
我们在这里使用了 {{@ 数据}} 的语法

结构1: 页面上有 登录发表你的评论
结构2: 页面上有 用户图标: 请发表你的评论

上面两个结构只显示一个, 也就是说 假如是登录的状态展示下面的结构2, 不是登录状态显示上面的结构1
我们可以使用 {{if 条件}} {{else}} {{/if}}
条件后端传递过来了, 如果有传递过来的数据, 那么就是登录状态

多少条评论 我们再这里用到了3元运算符
```js 
  {{newsData.comments_count ? newsData.comments_count : '0'}}条评论
```

### 关于数据库时间的处理
2018-01-17T14:59:59.000Z 我们现在展示在页面上的时间是这样的
```js 
  function dateFormat(value){
      var d = new Date(value);  //2018-01-16T21:19:19.000Z
      var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
      return times
  }
```

也可以使用过滤器 我们把上面的函数放到 filter.js 文件中
然后在这个 detail.html 所处的接口文件中引入 然后在模板中使用
```js 
  {{newsData.create_time | dateFormat}}
```

<br><br>

### 新闻页面点击数量加1
当我在首页进入某个新闻详情后, 该新闻的点击数量应该加1
这一块的操作目前可以在后端完成逻辑, 因为我们要改数据库里面的信息的
思考:
点击数量加1 也就是来到 该新闻的详情页 也就是接口的时候 +1
```js 
  http://127.0.0.1:3000/                      刚开始在这

      ↓
  
  http://127.0.0.1:3000/news_detail/149       来到 /news_detail 接口
```

我们在返回数据之前, 处理下更新数据库里新闻点击量的操作
```js 
  // 左侧新闻内容的查询 这里我们根据新闻的id查询了该新闻的数据
  let {news_id} = req.params;
  let newsResult = await handleDB(res, 'info_news', 'find', '查询数据库出错', `id=${news_id}`);

  // 返回数据之前, 我们修改新闻的点击量 点击数+1 原来的那个点击数加1 上面的newsResult就是这篇新闻的对象里面有
  await handleDB(res, 'info_news', 'update', '更新数据库出错', `id=${news_id}`, { clicks: newsResult[0].clicks+1})

  // 但是会有一个问题, 虽然数据库里面的点击量被修改了 但是前端展示的还是没修改前的点击量, 原因是我们最后传递给前端的数据还是 newsResult[0] 也就是我们查询数据库的结果, 也就是我们虽然修改了数据库中的点击量, 但是渲染的还是 之前的值, 也就是我们没有重新读取数据库 重新渲染

  // 我们可以这样, 在后端手动修改下 不通过数据库 返回给前端一个正确的值 进行个页面上的统一
  newsResult[0].clicks += 1;

  上面要注意顺序 要是 同步页面的操作拿到更新数据库的操作上面时 还是要修改代码的 视频了数据库里的点击量就2 因为 两次+=1造成的

  // 传递数据
  let data = {
    user_info: result[0] ? {
      nick_name: result[0].nick_name,
      avatar_url: result[0].avatar_url
    } : false,
    newsClick: result3,
    // 本身是数组
    newsData: newsResult[0]
  }
```

<br><br>

### 验证用户是否登录功能的抽取
随着接口页面的增多, 我们每一个新的页面都要 验证一次 用户是否登录好展示对应的结构
那我们就需要把 验证用户登录的功能抽取出来
比如 新闻的详情页面里面有收藏, 收藏的功能 我们就要判断用户是否登录 只有登录才能使用收藏功能
```js 
  // 登录状态
  let user_id = req.session['user_id'];
  let result = [];

  // 验证id是否有效
  if(user_id) {
    result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
  }
```

我们把上面的代码抽取到 common.js 中
```js 
  1. 原函数中有 await 所以我们的函数前面要加上 async
  2. 我们需要req, res
  3. 将来我们需要把结果返回出去 所以最后要return result
  4. 我们使用async await返回出去的是一个promise对象, 接收的时候也要用 await 去接收

  async function getUser(req, res) {
  // 登录状态
      let user_id = req.session['user_id'];
      let result = [];
      if(user_id) {
      result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
      }

      return result;
  }   


  // 处理接口中的代码

  // 登录状态
  // let user_id = req.session['user_id'];
  // let result = [];
  // if(user_id) {
  //   result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
  // }

  // 上面的登录验证的函数抽取到common里面了 我们下面的代码就是验证用户登录的 userInfo 的结果可能是 [] 可能是 [{}, {}]
  let userInfo = await common.getUser(req, res);  
```

<br><br>

### 404抽取页面的工作
我们在访问页面的时候 如果是按照正常接口访问是可以得到相应的页面, 比如
127.0.0.1:3000/news_detail/149
但是 有的时候我们会遇到暴力访问
127.0.0.1:3000/news_detail/1888888288
上面的这种访问方式仍然能进入到 /news_detail 的接口 可以 因为后端是动态路由接口/news_detail/:news_id 只要后面有值我们就能接收到
```js 
  我们的后端代码:
  (async function() {

  let userInfo = await common.getUser(req, res);  

  // 点击排行
  let result3 = await handleDB(res, 'info_news', 'find', '查询数据库出错', '1 order by clicks desc limit 6')

  // 左侧新闻内容的查询
  let {news_id} = req.params;
  let newsResult = await handleDB(res, 'info_news', 'find', '查询数据库出错', `id=${news_id}`);


  // 返回数据之前, 我们修改新闻的点击量 点击数+1 原来的那个点击数加1 上面的newsResult就是这篇新闻的对象里面有
  await handleDB(res, 'info_news', 'update', '更新数据库出错', `id=${news_id}`, { clicks: newsResult[0].clicks+1})

  newsResult[0].clicks += 1;

  // 传递数据
  let data = {
    user_info: userInfo[0] ? {
      nick_name: userInfo[0].nick_name,
      avatar_url: userInfo[0].avatar_url
    } : false,
    newsClick: result3,
    newsData: newsResult[0]
  }

  // 渲染页面
  res.render('news/detail', data);
})()
```

我们后台的逻辑是 拿到news_id先是判断它的有效性(查询数据库) 如果id是1888888288的情况肯定是找不到了结果是一个 [ ]
如果是一个空数组, 当这么写的时候 newsResult[0].clicks += 1; 会报错 newsResult[0] 是一个 undefined 因为我们根据news_id(1888888288)查询不到结果是一个[ ] 
报错信息: Cannot read property 'click' of undefined
```js 
  你曾经写过 xxx.clicks 但是xxx是undefined 这是个bug
```

所以为了防止这样的情况发生 我们可以对这种情况添加判断, 一旦没有这个页面 我们就返回404页面
```js 
  1. 前端输入一个 暴力请求
  2. 后端拿到 news_id 暴力请求的新闻id 去数据库查询结果

  3. 对查询结果进行判断 一旦 查询不到 就响应回 404页面 或者 一段话(没有这个页面)

  // 得到 新闻id
  let {news_id} = req.params;

  // 确保有效性 查询数据库
  let newsResult = await handleDB(res, 'info_news', 'find', '查询数据库出错', `id=${news_id}`);

  // 对查询结果做判断, 如果没有结果返回404页面
  if (!newsResult[0]) {

    let data = {
      user_info: userInfo[0] ? {
        nick_name: userInfo[0].nick_name,
        avatar_url: userInfo[0].avatar_url
      } : false
    }
    res.render('news/404', data);
    return
  }
```

还是跟前面一样, 既然是返回前端的页面, 我们还有base.html 为了高效的复用, 我们还是根据base.html文件 对 404.html进行抽取模板

另外上面只是针对了 找不到新闻的时候 给你返回404 还有很多情况需要返回404页面, 比如没有的接口 也就是说只要找不到资源就给你返回404页面
我们在config.js文件中结果这个问题

### 在所有的注册路由的下面 use(callback)
前面的路由都找不到就执行里面的代码
```js 
  // 注册index中的路由
  this.app.use(common.csrfProtect, indexRouter);
  this.app.use(common.csrfProtect, passportRouter);
  this.app.use(common.csrfProtect, detailRouter);

  // 在他们的下面写上
  this.app.use((req, res) => {

    (async function() {
      let userInfo = await common.getUser(req, res);
      let data = {
        user_info: userInfo[0] ? {
          nick_name: userInfo[0].nick_name,
          avatar_url: userInfo[0].avatar_url
        } : false
      }
      res.render('news/404', data);
    })()
  })
```

我们也可以把404这个部分抽取成一个函数放到common.js文件中
```js 
  async function abort404(req,res){
  let userInfo =  await getUser(req,res);
  let data ={
      user_info:userInfo[0]?{
          nick_name: userInfo[0].nick_name,
          avatar_url: userInfo[0].avatar_url
      }:false
  }
  res.render("news/404", data);
}

  // 比如这里就可以这么写
  if (!newsResult[0]) {

    let data = {
      user_info: userInfo[0] ? {
        nick_name: userInfo[0].nick_name,
        avatar_url: userInfo[0].avatar_url
      } : false
    }
    res.render('news/404', data);
    return
  }

  改成

  if (!newsResult[0]) {
    common.abort404(req, res);
    return
  }
```


### 有些情况是, 页面里有些功能仅开放给已登录的用户, 所以我们上面要获取用户是否登录 如果没有登录要return
```js 
  // 上面的登录验证的函数抽取到common里面了 我们下面的代码就是验证用户登录的 userInfo 的结果可能是 [] 可能是 [{}, {}]
  let userInfo = await common.getUser(req, res);  
  if (!userInfo[0]) {
      res.send('未登录不能操作')
      return
  }
```

<br><br>

### 收藏和已收藏按钮的展示功能完成
收藏功能 当用户没有登录的时候 点击登录会弹出登录对话框, 完成登录后可以看到该文章的收藏状态, 如果没有收藏可以点击完成收藏, 如果已收藏 移动到按钮上现实取消收藏, 当用户退出登录的时候, 页面应该回到原始状态也就是(没有收藏 需要点击后才能收藏的状态)

为什么用户登录之后, 能显示用户有没有收藏次新闻的状态(为什么能正确的显示该文章是未收藏还是已收藏)
说明了数据库里记录了哪个用户收藏了哪篇文章, 然后我查询数据库后能查询到用户有没有收藏这篇新闻
```js 
  info_user_collection  用户收藏表
  user_id     news_id
```

### 任务1: 先完成展示有没有收藏
展示用户登录后 页面上新闻的收藏状态
```js 
  user_id: 2
  news_id: 149

  就代表id5的用户收藏了新闻149

  我现在已经手动更改数据库 让wdnz333收藏了149新闻, 接下来让这个收藏状态显示在页面上
```

我们在 news_detail 接口完成相关的操作, 在这个接口中除了查询这篇新闻相关的数据以外, 点击数量+1以外 还需要做 已登录用户是不是已经收藏了这篇新闻

至于页面上展示未收藏还是已收藏让页面的模板来进行操作 下面是html代码, 显示隐藏是根据 display:none 控制的 我们也用这种方式
```js 
  <a href="javascript:;" class="collection block-center" data-newid="">收藏</a>

  <a href="javascript:;" class="collected block-center" data-newid="" style="display: none"><span
          class="out">已收藏</span><span class="over">取消收藏</span></a>
```

所以我们应该传递一个布尔值给前端 让前端根据这个布尔值去操作模板
```js 
  1. 定义一个布尔值用于告诉前端收藏状态
  let isCollected = false;
          - 什么情况下改成true? 已经登录的用户 并且收藏了这篇新闻(查询info_user_collection), 链接里面的参数就是新闻id就是news_id 上面已经获取到了

  3. 用户已登录 且 能得到查询结果 isCollected 改为 true 注意: 查询到的结果或者是[ ] 或者是 [{}] 所以判断条件必须是 userInfo[0]
  if(userInfo[0]) {
    // 结果是一个数组 所以的是[0]
    let collectionResult = await handleDB(res, 'info_user_collection', 'find', '查询数据库出错', `user_id=${userInfo[0].id} and news_id=${news_id}`)
    if (collectionResult[0]) {
      isCollected = true;
    }
  }

  2. 把这个 isCollected 标识收藏状态的变量传递到前端
  let data = {
    ...
    isCollected
  }
```

使用{{}}模板语法 根据 isCollected 变量 修改 display: none || block
这两个是互斥的 用同样的语法的话 isCollected 要取 非~~~!!!
{{!isCollected?'block':'none'}}  --- 这个取非了
{{isCollected?'block':'none'}}
```js 
  <a href="javascript:;" class="collection block-center" data-newid="{{newsData.id}}" style="display: {{!isCollected?'block':'none'}}">收藏</a>

  <a href="javascript:;" class="collected block-center" data-newid="{{newsData.id}}" style="display: {{isCollected?'block':'none'}}"><span
          class="out">已收藏</span><span class="over">取消收藏</span></a>
```

注意: 前端收藏 和 取消收藏按钮上有新闻id 用于点击获取参数 提交给后端用

<br><br>

### 点击收藏 和 取消收藏的后端分析
点击收藏功能, 点击之后, 要往数据库(info_user_collection)里面添加一条记录
点击取消收藏, 点击之后, 要删除数据库(info_user_collection)里面的一条记录

我们可以点击按钮之后发送 ajax请求 我们选择post请求, 因为可能会带某些参数
```js 
  比如 我们需要告诉后端 哪一个用户(user_id)收藏哪篇文章(news_id)
  user_id可以不用传, 因为只有登录之后才能操作收藏功能, 登录的用户 后端知道id
```

因为是post请求 和 ajax所以代码应该在前端先处理点击按钮部分的逻辑, 然后后端重新定义post接口处理
因为 收藏 和 取消收藏的接口 都是 "/news_detail/news_collect"
所以我们要告诉后端 我们要做的是 收藏 还是 取消收藏
var action = "collect"            -- 收藏
var action = "cancel_collect"     -- 取消收藏
```js 
  前端代码:

  // 收藏
  $(".collection").click(function () {
      //获取到新闻编号
      var news_id = $(".collection").attr('data-newid');

      // 告诉收藏 这次的动作是收藏 和 收集参数
      var action = "collect"
      var params = {
          "news_id": news_id,
          "action": action
      }

      $.ajax({
          url: "/news_detail/news_collect",
          type: "post",
          contentType: "application/json",
          headers: {
              "X-CSRFToken": getCookie("csrf_token")
          },
          data: JSON.stringify(params),
          success: function (resp) {
              if (resp.errno == "0") {
                  // 收藏成功
                  // 隐藏收藏按钮
                  $(".collection").hide();
                  // 显示取消收藏按钮
                  $(".collected").show();
              }else if (resp.errno == "4101"){
                  $('.login_form_con').show();
              }else{
                  alert(resp.errmsg);
              }
          }
      })
  })



  // 取消收藏
  $(".collected").click(function () {
      var news_id = $(".collected").attr('data-newid');
      var action = "cancel_collect"
      var params = {
          "news_id": news_id,
          "action": action
      }
      $.ajax({
          url: "/news_detail/news_collect",
          type: "post",
          contentType: "application/json",
          headers: {
              "X-CSRFToken": getCookie("csrf_token")
          },
          data: JSON.stringify(params),
          success: function (resp) {
              if (resp.errno == "0") {
                  // 收藏成功
                  // 显示收藏按钮
                  $(".collection").show();
                  // 隐藏取消收藏按钮
                  $(".collected").hide();
              }else if (resp.errno == "4101"){
                  $('.login_form_con').show();
              }else{
                  alert(resp.errmsg);
              }
          }
      })
  })
```


### 后端的逻辑
### 记住 所有需要登录才能操作的接口 第一步都是 判断用户是否登录

业务流程:
1. 获取用户信息
```js 这个接口必须登录才能访问, 要判断用户是否登录 获取用户信息, 没有获取到就return ```
2. 获取参数, 判空
3. 查询数据库 且 判断新闻是否存在, 不存在就return 确保 news_id 是有效的
4. 根据 action 的值, 收藏 或者 取消收藏
5. 返回操作成功

前端的ajax里面有很多的errno 0 4101等, 这些是后端有各种情况, 告诉前端那里出现了什么样的错误
```js 
  比如:
  4101: 就是用户未登录

  每一个错误都会有自己的编码 错误码是给前端看的
```

```js 
  // 收藏 取消收藏
  router.post('/news_detail/news_collect', (req, res) => {
      (async function() {

      })()
  })
```

### 完整代码:
```js 
  // 收藏 取消收藏
  router.post('/news_detail/news_collect', (req, res) => {
      (async function() {
          // - 1. 获取用户信息
          let userInfo = await common.getUser(req, res);
          if (!userInfo[0]) {
              res.send({errno: '4101', errmsg: '用户未登录'})
              return;
          }

          // - 2. 获取参数, 判空
          let { news_id, action} = req.body;
          if(!news_id || !action) {
              res.send({ errmsg: '参数错误1' })
              return;
          }

          // - 3. 查询数据库 且 判断新闻是否存在, 不存在就return 确保 news_id 是有效的
          let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${news_id}`);
          if (!newsResult[0]) {
              res.send({ errmsg: '参数错误2' })
              return;
          }

          // - 4. 根据 action 的值, 收藏 或者 取消收藏
          if (action === 'collect') {
          // 收藏
              await handleDB(res, 'info_user_collection', 'insert', '数据库添加失败', { user_id: userInfo[0].id, news_id});
          } else {
              // 执行取消收藏
              await handleDB(res, 'info_user_collection', 'delete', '数据库添加失败', `user_id=${userInfo[0].id} and news_id=${news_id}`);
          }

          // - 5. 返回操作成功
          res.send({errno:'0', errmsg:'操作成功'});
      })()
  })
```

<br><br>

### 评论功能的演示 以及表字段的分析 以及实现
评论区域的需求
最新的评论出现在最上面 按时间字段 降序排列 后发布的在上面
评论应该针对该篇新闻
这些评论应该有一个数据表来保存 要不刷新页面就看不到了 (info_comment)
```js 
  id          user_id         news_id              comment
  评论的id    评论的用户id    评论是这个新闻的id     评论内容

  parent_id
  回复的是哪个id (回复的是哪一条评论)

  评论的用户id 这个不一定就是登陆者的id
```

### 评论和回复的传参的分析
每发布一条评论就是添加一条记录
我们登录网站之后 点击 ' 评论 ' 按钮应该是一个ajax的post请求 我们看下前端代码
```js 
// 评论提交
$(".comment_form").submit(function (e) {

  // 阻止表单提交的默认行为
  e.preventDefault();



  // 获取当前标签中的,新闻编号,评论内容 <form action="" class="comment_form" data-newsid="{{newsData.id}}"> 前端把id加在了form表单上

  var news_id = $(this).attr('data-newsid')
  var news_comment = $(".comment_input").val();



  if (!news_comment) {
      alert('请输入评论内容');
      return
  }
  var params = {
      "news_id": news_id,
      "comment": news_comment
  };

  $.ajax({
      url: "/news_detail/news_comment",
      type: "post",
      contentType: "application/json",
      headers: {
          "X-CSRFToken": getCookie("csrf_token")
      },
      data: JSON.stringify(params),
      success: function (resp) {
          if (resp.errno == '0') {
              var comment = resp.data
              // 拼接内容
              var comment_html = ''
              comment_html += '<div class="comment_list">'
              comment_html += '<div class="person_pic fl">'
              if (comment.user.avatar_url) {
                  comment_html += '<img src="' + comment.user.avatar_url + '" alt="用户图标">'
              }else {
                  comment_html += '<img src="../../static/news/images/person01.png" alt="用户图标">'
              }
              comment_html += '</div>'
              comment_html += '<div class="user_name fl">' + comment.user.nick_name + '</div>'
              comment_html += '<div class="comment_text fl">'
              comment_html += comment.content
              comment_html += '</div>'
              comment_html += '<div class="comment_time fl">' + comment.create_time + '</div>'

              comment_html += '<a href="javascript:;" class="comment_up fr" data-commentid="' + comment.id + '" data-newsid="' + comment.news_id + '">赞</a>'
              comment_html += '<a href="javascript:;" class="comment_reply fr">回复</a>'
              comment_html += '<form class="reply_form fl" data-commentid="' + comment.id + '" data-newsid="' + news_id + '">'
              comment_html += '<textarea class="reply_input"></textarea>'
              comment_html += '<input type="button" value="回复" class="reply_sub fr">'
              comment_html += '<input type="reset" name="" value="取消" class="reply_cancel fr">'
              comment_html += '</form>'

              comment_html += '</div>'
              // 拼接到内容的前面
              $(".comment_list_con").prepend(comment_html)
              // 让comment_sub 失去焦点
              $('.comment_sub').blur();
              // 清空输入框内容
              $(".comment_input").val("")

              //更新评论数量
              updateCommentCount();
          }else {
              alert(resp.errmsg)
          }
      }
  })
})
```

### 后端接口分析
后端创建一个 处理 评论 和 回复 相关的接口
```js 
  router.post('/news_detail/news_comment', (req, res) => {
  (async function() {
      
  })()
})
```

后端的业务流程分析
```js 
  // 这个接口里的代码 点击评论 和 回复 的时候会执行这个接口中的代码
  处理逻辑:
  
  // 需要传递哪些参数, 两种情况
  1. 评论新闻
      - 评论内容
      - 评论的新闻的id

  2. 回复别人的评论
      - 回复的内容
      - 回复哪一条评论的id(parent_id)


  // 业务流程
  1. 获取登录用户的信息(评论之前是需要先登录的) 获取不到就return
  2. 获取参数 判断
  3. 查询数据库看看新闻是否存在
  4. 往数据库中插入数据 info_comment (如果有传parent_id, 这个属性也要记得插入)
  5. 返回成功的响应, 传数据给前端到回调中, 去拼接评论的信息
```

### 后端的代码实现
要点:
1. 用户点击评论后, 我们需要将收集的信息插入到数据库 都会有哪些参数?
```js 
  user_id, news_id, parent_id
  但是parent_id不一定有, 你想啊 我没有回复其它的评论就没有这个parent_id对吧

  所以在接收post参数的时候 我们可以这样

  // 给 parent_id 一个默认值
  let { news_id, comment, parent_id = null} = req.body;

  // 然后在整合data发送前端的时候这样 我们先整理肯定有 前端需要的数据
  let commentObj = {
    user_id: userInfo[0].id,
    news_id,
    content: comment,
    create_time:new Date().toLocaleDateString()
  }

  // 然后 对 不一定有的数据进行判断 如果有 parent_id 我就往对象里面添加这个id
  if(parent_id){
      commentObj.parent_id = parent_id
  }
```

2. 在整合data数据, 发送前端时候, data里面还有个 avatar_url 用户头像
```js 
  // 这里的头像可能是空的情况, 因为刚注册的用户还没用设置头像 所以我们要给它个默认路径显示默认图片
  avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg',
```

3. 我们上面是把前端提交过来的信息(跟用户输入评论的内容相关的信息) 插入到了数据库, 这时出现了一个新的问题 前端页面需要评论的创建时间 好展示到页面上, 这里有两种方法
```js 
  方法1:
  我们重新查询数据库 因为 create_time 这个字段是系统自动添加的我们可以重新查询数据库, 然后将这个数据获取到 体现到 data中

  方法2:
  频繁查询数据库 有损性能, 所以我们可以这样 在将前端收集到的数据插入数据库的时候 我们手动添加 create_time 字段到数据库

  然后我们在整合data的时候就不用再次查询数据库, 直接使用 我们创建的 create_time 就可以
```

### 后端第一阶段的代码
下面的代码解决了 前端ajax请求数据无刷新可以将信息展现在页面上的问题
但是 我们手动刷新页面的时候, 我们的评论 并没有保存在页面上 消失了
```js 
  // 1. 获取登录用户的信息(评论之前是需要先登录的) 获取不到就return
  let userInfo = await common.getUser(req, res);
  if (!userInfo[0]) {
      res.send({ errno: '4101', errmsg: '用户未登录' })
      return;
  }

  // 获取参数 判断
  let { news_id, comment, parent_id = null} = req.body;
  if (!news_id || !comment) {
      res.send({ errmsg: '参数错误1' })
      return;
  }

  // 3. 查询数据库 且 判断新闻是否存在, 不存在就return 确保 news_id 是有效的
  let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${news_id}`);
  if (!newsResult[0]) {
      res.send({ errmsg: '参数错误2' })
      return;
  }

  // 4. 往数据库中插入数据 info_comment(如果有传parent_id, 这个属性也要记得插入)
  let insertResult = await handleDB(res, 'info_comment', 'insert', '数据库插入失败', commentObj)

  // 5. 返回成功的响应, 传数据给前端到回调中, 去拼接评论的信息, 还需要返回前端拼接内容所需要的数据, 前端需要什么 我们就看着给什么
  let data = {
    user: {
      // 这里的头像可能是空的情况, 因为刚注册的用户还没用设置头像 所以我们要给它个默认路径显示默认图片
      avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg',
      nick_name: userInfo[0].nick_name
    },
    content: comment,

  // 这也有个问题, create_time是我们将评论数据插入到系统的时候自动生成的 上面刚插入数据库, 方法1 我们可以再查询一次数据库 方法2 我们在往数据库插入评论信息的时候 手动创建一个 create_time字段 这样我们可以直接使用这个 插入数据库时 定义的这个 create_time 变量
  create_time: commentObj.create_time,
  news_id,

  // 这个id是评论的id 上面将评论插入数据库的时候会有一个插入id (insertId) 我们使用这个
  // 评论id
      id: insertResult.insertId
  }
  res.send({
    errno:'0',
    errmsg: '操作成功',
    data
  })
```

<br><br>

### 评论功能 -- 刷新之后评论功能的展示
上面在 /news_detail/news_comment(处理  评论  和  回复) 接口中我们完成了将数据传递到前端后 ajax部分可以页面无刷新的状态下 将后端传递的数据展示在页面的功能

但是 我们手动整体刷新页面 ajax刚才展示的内容消失, 是因为我们刷新页面走的是 /news_detail/:news_id (详情页请求页面的get) 接口 在这个接口中 我们并没有返回出去任何的评论信息

所以 在这个部分 我们要在 news_detail/:news_id (详情页请求页面的get) 接口中 查询和这篇新闻相关的评论 整理好数据 传递到前端, 实现 整体刷新页面 展示评论内容的功能

查询到的评论还要按照创建时间 降序排列
我们查询到的数据 将来的形态是这样 [{}, {}, {}]

### 后端 /news_detail/:news_id 接口
这里我们只写跟评论相关的代码
```js 
  // 下面评论的接口了完成了 将数据整合传递到了前端, 但是页面整体刷新后评论消失, 原因就是我们没有在请求详情页的接口里 返回评论的数据, 所以刷新渲染页面的时候不能将评论渲染到页面上

  // 查询 和 这篇新闻相关的评论

  let commentResult = await handleDB(res, 'info_comment', 'find', '查询数据库出错', `news_id=${news_id} order by create_time desc`)

  // 将查询评论的结果传递到前端 变量名自己定义
  commentList: commentResult
```


### 详情页的前端代码
原本是写死的 后端将查询数据库得到的结果 commentList 传递到了前端 
我们可以使用{{each commentList}} {{/each}}遍历这个数据, 使用模板语法填写可变的地方
```js 

  {{ each commentList }}
  <div class="comment_list">
      <div class="person_pic fl">
          <img src="{{ user_info.avatar_url }}" alt="用户图标">
      </div>
      <div class="user_name fl">{{ user_info.nick_name }}</div>
      <div class="comment_text fl">{{ $value.content }}</div>
      {{ if $value.parent_id }}
      <div class="reply_text_con fl">
          <div class="user_name2">{{ $value.parent.user.nick_name }}</div>
          <div class="reply_text">
              {{ $value.parent.content }}
          </div>
      </div>
      {{ /if }}
      <div class="comment_time fl">{{ $value.create_time | dateFormat }}</div>
      <a href="javascript:;" class="comment_up fr" data-commentid="{{ $value.id }}"
          data-newsid="{{ $value.news_id }}">赞</a>
      <a href="javascript:;" class="comment_reply fr">回复</a>
      <form class="reply_form fl" data-commentid="{{ $value.id }}" data-newsid="{{ $value.news_id }}">
          <textarea class="reply_input"></textarea>
          <input type="button" value="回复" class="reply_sub fr">
          <input type="reset" name="" value="取消" class="reply_cancel fr">
      </form>
  </div>
  {{ /each }}


  // 前端 详情页 评论的模板
  <div class="comment_list_con">

      <div class="comment_list">
          <div class="person_pic fl">
              <img src="/news/images/worm.jpg" alt="用户图标">
          </div>
          <div class="user_name fl">用户张山</div>
          <div class="comment_text fl">
              遏制茅台酒价格过快上涨, 多渠道供给, 就不一定要买, 租茅台酒也可以的, 租售同权 开发共有产权茅台酒, 让老百姓喝得起茅台酒, 饮者有其酒 
          </div>
          <div class="reply_text_con fl">
              <div class="user_name2">用户李思</div>
              <div class="reply_text">
                  遏制茅台酒价格过快上涨, 多渠道供给, 就不一定要买, 租茅台酒也可以的, 租售同权 开发共有产权茅台酒, 让老百姓喝得起茅台酒, 饮者有其酒 
              </div>
          </div>
          <div class="comment_time fl">2017-01-01 00:00:00</div>
          <a href="javascript:;" class="comment_up has_comment_up fr">1</a>
          <a href="javascript:;" class="comment_reply fr">回复</a>
          <from class="reply_form fl" data-newsid="" data-commentid="">
              <textarea class="reply_input"></textarea>
              <input type="submit" name="" value="回复" class="reply_sub fr">
              <input type="reset" name="" value="取消" class="reply_cancel fr">
          </from>
      </div>

  </div>
```

更新 评论条数 是前端的功能 前端可以根据 有多少个 <div> 还获取它的length 展现到页面上, 能不用后端查询数据库就不要用

只需要将下面的方法 在js代码的最上方调用下就可以, 页面一加载先执行它
```js 
  // 更新评论条数
  function updateCommentCount() {
      var length = $(".comment_list").length
      $(".comment_count").html(length + "条评论")
      $(".detail_about .comment").html(length)
  }
```

### 总结
ajax 是页面无刷新的情况下 将后台得到的数据 渲染到页面上, 但是整体一刷新页面内容还是会消失, 因为ajax是post接口 页面的整体渲染在get接口里, 所以我们还要在get接口中重新获取数据库的数据, 动态渲染在页面中

也就是说 为了确保整体刷新页面 需要两个接口的配合

<br><br>

### 评论功能最终完成
上面我们两个接口配合完成了即使页面整体刷新评论的内容也不会消失, 但是还是有问题
问题1: 当我们退出登录的时候 用户图标消失 用户名也消失
```js 
  详情页的html文件:

  登录的人的 昵称和头像
  <img src="{{ user_info.avatar_url }}" alt="用户图标">
  <div class="user_name fl">{{ user_info.nick_name }}</div>

  这里我们拿到都是 登录的人的 昵称和头像 我们应该拿 评论者的用户名和头像
  同时 评论者的用户名和头像还要跟 {{ each commentList }} 中的commentList相关的
  
  commentList 是跟评论相关的表的信息里面有:
  id
  user_id
  news_id
  content
  parent_id
  like_count
  也就是 评论表当中的每一条记录 [{}, {}, {}]


  改成:

  <img src="{{ $value.commenter.avatar_url }}" alt="用户图标">
  <div class="user_name fl">{{ $value.commenter.nick_name }}</div>
  
  可是 comment 评论表中并没有 commenter 字段 虽然没有这个字段但是有个跟它相关的字段 user_id

  $value.commenter.nick_name
  既然这么写了 就说明我们要在 commentList 的每一条记录里面添加一个
  commenter 给commentResult数组中的每一条记录 添加评论者的信息

  -- 在总结一遍

  因为我们在detail.html的模板中使用的是 登陆者的id 和 头像 展示在页面上
  {{ user_info.avatar_url }}
  {{ user_info.nick_name }}

  一旦退出登录后 就看不到登陆者的id 和 头像了
  所以这里我们不能使用登陆者的id 和 头像 我们要使用评论者的id和头像
  {{ $value.commenter.avatar_url }}
  {{ $value.commenter.nick_name }}

  但是 info_comment 的表中并没有 这些信息 所以我们要对上面 我们从评论表commentResult中查询到到的结果进行处理
  添加 评论者 的信息

  上面的 userInfo[0].nick_name avatar_url 是根据 session 中的保存user_id 去找的 也就说登陆者的id
  而我们下面查的是根据评论表里面的user_id去查的 也就是评论者的信息 虽然查的都是同一个表 但是 查到的数据是不一样的


  for (let i = 0; i < commentResult.length; i++) {
    let comentResult = await handleDB(res, 'info_comment', 'find', '查询数据库出错', `id=${commentResult[0].user_id}`)

    commentResult[i].commenter = {
      nick_name: comentResult[0].nick_name,
      avatar_url: comentResult[0].avatar_url ? comentResult[0].avatar_url : '/news/images/worm.jpg'
    }
  }

  // 传递数据
  let data = {
    user_info: userInfo[0] ? {
      nick_name: userInfo[0].nick_name,
      avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg'
    } : false,
    newsClick: result3,
    // 本身是数组
    newsData: newsResult[0],
    isCollected,

    // 将查询评论的结果传递到前端 变量名自己定义
    commentList: commentResult
  }
```

<br><br>

### 评论中的回复功能
接下来我们研究下回复功能, 回复功能需要数据有
parent_id     回复的哪条评论  
parent.user.nick_name     回复人的昵称
parent.content    回复的内容

上面我们仅仅把parent_id传进了数据库, 
现在我们开始做回复功能, 回复评论 上面因为我们把parent_id也传进后端了, 所以回复的数据已经可以插入到数据库, 但是却并没有展示在页面上 说明ajax的resp.data有问题

上面我们只向前端传递了 parent_id 我们看上页面就值到 回复里还需要 回复人的昵称 和 回复人的回复内容
这里我们主要是把前端需要的 回复人的昵称 和 回复的内容传到前端
```js 
  我们的查询逻辑可以放在 parent_id 判断里面 如果有这个id 我们就顺便查一下数据库 获取到 父评论的信息(info_comment) 和 父评论者的信息(info_user)

  let parentComment;
  let parentUserInfo;
  if(parent_id) {
    commentObj.parent_id = parent_id

    // 如果有父评论的话, 查询父评论的信息(info_comment) 和 父评论者的信息(info_user)
    parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询失败', `id=${parent_id}`)
    parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询失败', `id=${parentComment[0].user_id}`)
  }

  然后下面整合到一起发送给前端
  let data = {
    user: {
      avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg',
      nick_name: userInfo[0].nick_name
    },
    content: comment,

    create_time: commentObj.create_time,
    news_id,

    id: insertResult.insertId,


    // 回复需要的数据, 也是一样回复的数据并不一定会传递过来 我们根据 parent_id还进行下判断 如果有parent_id 我们再查询 再传递 跟回复相关的数据
    parent: parent_id? {
      user: {
        nick_name: parentUserInfo[0].nick_name
      },
      content: parentComment[0].content
    }:null
  }
```

### 整体刷新页面, 处理 请求 详情页接口 的问题
### 注意:
上面只是解决了ajax的部分, 当我们页面一刷新的时候走的并不是 处理评论 和 回复的接口 而是 请求详情页的接口
而 请求详情页的接口中 我们传递到前端的数据里 并没有 parent.user.nick_name 等数据 所以前端在刷新页面的时候会报错
```js 
  RuntimeError: Cannot read property 'user' of undefined
  <div class="user_name2">{{ $value.parent.user.nick_name }}</div>
```

在请求详情页的接口中 完成了返回评论的数据, 所以在这个部分的逻辑中我们添加上 回复需要的数据
```js 
  let commentResult = await handleDB(res, 'info_comment', 'find', '查询数据库出错', `news_id=${news_id} order by create_time desc`)

  // 给commentResult数组中的每一条记录 添加评论者的信息
  for (let i = 0; i < commentResult.length; i++) {
    let comentResult = await handleDB(res, 'info_comment', 'find', '查询数据库出错', `id=${commentResult[0].user_id}`)

    commentResult[i].commenter = {
      nick_name: comentResult[0].nick_name,
      avatar_url: comentResult[0].avatar_url ? comentResult[0].avatar_url : '/news/images/worm.jpg'
    }


    // 如果有parent_id的话 就给评论信息的每一条记录添加 parent这个属性
    if(commentResult[i].parent_id) {

        let parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询失败', `id=${parent_id}`)
        let parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询失败', `id=${parentComment[0].user_id}`)

        commentResult[i].parent = {
          user: {
              nick_name: parentUserInfo[0].nick_name
          },
          content: parentComment[0].content
        }
      }
  }
```

<br><br>

### 点赞功能
点赞功能有什么样的效果
登录后 有被点赞的评论 当前登录用户点赞后有高亮的状态, 点赞后面会有总点赞数, 再点击之后会取消点赞
info_comment表 like_count字段 保存的点赞

### 点赞的前端分析
info_comment_like 点赞表
```js 
  comment_id      user_id
  哪一个用户点赞哪个评论
```

点赞的按钮 是一个post提交 所以需要提交参数
```js 
  它需要提交哪一个用户 点赞了哪一条评论
```

点赞处理的前端代码
这里因为 点赞 和 取消点赞是在用一个元素身上发生的 这里标记了动作的状态
```js 
  // 点赞 和 取消点赞 是两个动作
  var action = "add"

  // 当类名中 has_comment_up 有这个类名的时候 让 ation 标记为 remove
  if(sHandler.indexOf('has_comment_up')>=0)
  {
      // 如果当前该评论已经是点赞状态, 再次点击会进行到此代码块内, 代表要取消点赞
      action = "remove"
  }
```

前端代码
前端ajax里面的代码 主要是解决在没有刷新的情况下, 解决样式和点赞数量的问题
```js 

  // 这里用了事件委托 将a 和 input 委托给它的父级 .comment_list_con 这样的话, 我们动态创建 点赞的按钮的时候 都能 点击功能
  $('.comment_list_con').delegate('a,input','click',function() {

  //获取到点击标签的class属性, reply_sub
  var sHandler = $(this).prop('class');

  if(sHandler.indexOf('comment_reply')>=0)
  {
      $(this).next().toggle();
  }

  if(sHandler.indexOf('reply_cancel')>=0)
  {
      $(this).parent().toggle();
  }


  // 点赞处理
  // sHandler 是当前点击 点赞按钮 身上的 类名 如果类名里有 comment_up 这个类

  if(sHandler.indexOf('comment_up')>=0) {
      var $this = $(this);

      // 点赞 和 取消点赞 是两个动作
      var action = "add"


      // 当类名中 has_comment_up 有这个类名的时候 让 ation 标记为 remove
      if(sHandler.indexOf('has_comment_up')>=0)
      {
          // 如果当前该评论已经是点赞状态, 再次点击会进行到此代码块内, 代表要取消点赞
          action = "remove"
      }


      //获取到当前点击的标签上面的, 评论(id)编号, 新闻编号 用户id后端后可以自己拿
      var comment_id = $(this).attr("data-commentid")

      // var news_id = $(this).attr("data-newsid")

      var params = {
          "comment_id": comment_id,

          // 告诉后端要进行什么操作
          "action": action,
          // "news_id": news_id
      }

      $.ajax({
          url: "/news_detail/comment_like",
          type: "post",
          contentType: "application/json",
          headers: {
              "X-CSRFToken": getCookie("csrf_token")
          },
          data: JSON.stringify(params),
          success: function (resp) {
              if (resp.errno == "0") {


                  //获取到当前标签中的点赞数量
                  var like_count = $this.attr('data-likecount')

                  //增加安全性校验,如果获取不到data-likecount的值,那么默认设置成0
                  if(like_count == undefined){
                      like_count = 0;
                  }

                  // 更新点赞按钮图标,并加1, 减1操作
                  if (action == "add") {
                      like_count = parseInt(like_count) + 1
                      // 代表是点赞
                      $this.addClass('has_comment_up')
                  }else {
                      like_count = parseInt(like_count) - 1
                      $this.removeClass('has_comment_up')
                  }

                  // 更新点赞数据,重新赋值回去
                  $this.attr('data-likecount', like_count)
                  if (like_count == 0) {
                      $this.html("赞")
                  }else {
                      $this.html(like_count)
                  }
              }else if (resp.errno == "4101"){
                  $('.login_form_con').show();
              }else {
                  alert(resp.errmsg)
              }
          }
      })
  }

  }
```

### 点赞的业务流程
上面我们分析了 前端 点赞代码的功能, 现在我们需要在后端的对应接口中 将前端传过来的数据保存在 info_comment_like 表里面
参数:
1. 哪一个用户, 登录用户, 可以直接获取登录用户的id
2. 点赞了哪一条评论 comment_id
3. 点赞和取消点赞都在这一个接口 还有一个参数是 action


业务流程:
1. 获取用户登录信息(一会要拿id)
2. 获取参数 判空
3. 查询数据库 看看 comment_id 这条评论是否存在 不存在return
4. 如果存在 根据action的值 是add还是remove 来确定要执行点赞还是取消点赞
  - 执行点赞: 把点赞的关系保存在数据库里面 (把哪个用户点赞了哪条评论的信息, 作为一条记录保存到数据库里面去 info_comment_like)
  - 取消点赞: 在这个表中删除这条记录
  (根据点赞 和 取消点赞 我们要修改 info-comment表中like_count字段 +1 或者 -1)

5. 返回操作成功


### 后端的代码实现 和 总结:
上面前端做了自己的修改 后端也做了自己的修改, 并没有实现数据的交互, 而是各自完成了各自的逻辑
前端完成了跟展示相关的东西
后端完成了同步数据库的操作
```js 
  // 处理 点赞 取消点赞的接口
router.post('/news_detail/comment_like', (req, res) => {

(async function() {
  
  // - 1. 获取用户登录信息(一会要拿id)
  let userInfo = await common.getUser(req, res);
  if(!userInfo[0]) {
    res.send({errno:'4101', errmsg:'用户未登录'})
    return
  }


  // - 2. 获取参数 判空
  let {comment_id, action} = req.body;
  if(!comment_id || !action) {
    res.send({errmsg:'参数错误1'})
    return
  }


  // - 3. 查询数据库 看看 comment_id 这条评论是否存在 不存在return
  let commentResult = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `id=${comment_id}`);
  if (!commentResult[0]) {
    res.send({ errmsg: '参数错误2'})
    return
  }


  /* - 4. 如果存在 根据action的值 是add还是remove 来确定要执行点赞还是取消点赞
      - 执行点赞: 把点赞的关系保存在数据库里面 (把哪个用户点赞了哪条评论的信息, 作为一条记录保存到数据库里面去 info_comment_like)
      - 取消点赞: 在这个表中删除这条记录
      (根据点赞 和 取消点赞 我们要修改 info-comment表中like_count字段 +1 或者 -1) 
  */
  let like_count; 
  if(action === 'add') {
    // 执行点赞
    await handleDB(res, 'info_comment_like', 'insert', '添加数据库出错', {
      comment_id,

      // 点赞的用户就是登录的用户
      user_id: userInfo[0].id
    })

    // 修改 info_comment 表中的 like_count 字段 +1, 因为我们创建表的时候 like_count 字段默认为null 
    like_count = commentResult[0].like_count ? commentResult[0].like_count + 1 : 1

  } else {
    // 取消点赞
    await handleDB(res, 'info_comment_like', 'delete', '删除数据库出错', `comment_id=${comment_id} and user_id=${userInfo[0].id}`);

    // 修改 info_comment 表中的 like_count 字段 -1
    like_count = commentResult[0].like_count ? commentResult[0].like_count - 1 : 0
  }

  // 最后将 info_comment 表中的 like_count 字段的修改后的结果保存在 表内, 其实就是更新 info_comment 数据库
  await handleDB(res, 'info_comment', 'update', '数据库更新失败', `id=${comment_id}`, {like_count})

  // - 5. 返回操作成功
  res.send({
    errno:'0',
    errmsg:'操作成功'
  })
})()
})
```

<br><br>

### 刷新展示用户是否点赞的思路分析
现在的情况是 页面上 点赞按钮的右侧是写死的攒, 我希望的效果是, 从数据库中的结果能展示到页面上的是数据库中的数据 也不是写死的攒

另外 如果是登录状态下, 我点赞的评论应该是高亮的状态
```js 
  data-newsid="{{ $value.news_id }}" data-likecount='{{$value.like_count ?$value.like_count :0}}'>赞</a>

  改成

  // 解决 动态获取点赞数量 而不是写死的攒的问题
  data-newsid="{{ $value.news_id }}" data-likecount='{{$value.like_count ?$value.like_count :0}}'>

      // 有数据的话 你就显示数据库里面的内容, 没有的话显示个赞字
      {{$value.like_count ?$value.like_count :'赞'}}
  
  </a>


  // 解决 用户登录的状态下, 自己点赞的评论的点赞按钮为高亮的状态

  那我是不是可以在后端把登录用户的点赞过的评论全部查出来, 传给前端的模板呢?
  我们将所有点赞过的评论的id 放到一个数组里面 [id1 id2 id3]

  <a href="javascript:;" class="{{user_like_comments_ids.indexOf($value.id) >= 0 ?'has_comment_up':''}} comment_up fr" data-commentid="{{ $value.id }}" data-newsid="{{ $value.news_id }}" data-likecount='{{$value.like_count?$value.like_count:0}}' >

      {{$value.like_count?$value.like_count:'赞'}}

  </a>
```

接下来我们要在 get /news_detail/:news_id 接口中 处理 下面的逻辑
```js 
  把登录用户的点赞过的评论全部查出来, 传给前端模板, 将结果组织成 [id1, id2, id3] 传递到模板中

  // 把登录用户的点赞过的评论全部查出来, 传给前端模板, 将结果组织成 [id1, id2, id3] 传递到模板中
  // 首先用户得登录
  let user_like_comments_ids = [];
  if(userInfo[0]) {
    // 查询登录用户的点赞过的评论对象 info_comment_like 这个表可以告诉我们登录的用户点赞了哪些评论, 查询条件 user_id字段 = 登录用户的id
    let user_like_commentResult = await handleDB(res, 'info_comment_like', 'find', '数据库查询出错', `user_id=${userInfo[0].id}`)
    // 上面查询完后 登录用户的 所有点赞过的评论都出来了 user_like_commentResult 这个数组是用户点赞过的每一条评论对象的数组

    // 遍历user_like_commentResult每一个元素 取它的id, 插入到user_like_comments_ids 这个数组里是用户点赞过的每一条评论
    user_like_commentResult.forEach(item => {
      user_like_comments_ids.push(item.comment_id);
    })
    }

  然后前端模板进行判断, 这条评论的id在不在我们的id数组中, 如果在就添加 高亮的类, 如果不在就让类名为空
  class="{{user_like_comments_ids.indexOf($value.id) >= 0 ?'has_comment_up':''}} comment_up fr"
```

<br><br>

### 详情页右侧作者名片数据查询
详情页的右侧的侧边栏中 有新闻作者的信息, 这块是页面一刷新就展示在页面上的部分, 所以应该在 get 请求详情页的接口中完成逻辑
```js 
  /news_detail/:news_id
```

逻辑也是跟前面差不多 主要就是将查询数据库的内容 传递到前端的模板上, 然后用{{}}渲染数据
主要的是查询哪个表~ 根据什么样的条件去查询~ 怎么组织数据到前端比较方便

后端查询 新闻的作者的信息, 传递到前端的模板中去
```js 
  // 查询新闻作者的信息, 传到模板中去 
  // 查询条件是 根据 新闻表的查询结果中的user_id 去找
  let authorInfo = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${userInfo[0].id}`);
  console.log(authorInfo)

  // 作者发布了多少篇新闻(总篇数) 粉丝
  // authorNewsCount 的结果是 ['{count(*):900}'] 所以我们传递到前端的时候可以这样
  let authorNewsCount = await handleDB(res, "info_news", "sql", "11数据库查询出错",
    `select count(*) from info_news where user_id=${authorInfo[0].id}`);

  // 将新闻作者的id传递过去, 如果直接写authorInfo传递过去的会是一个数组, 我们还可以这样authorInfo[0] 这样过去的就会是一个对象
  authorInfo: authorInfo[0],
  authorNewsCount: authorNewsCount[0]['count(*)']
```

粉丝数量表 info_user_fans
```js 
  老张 关注了 老张2
  follower_id     followed_id(被关注者)
  老张            老张2

  老张2拥有了1个粉丝

  // 查询作者的粉丝数, info_user_fans
  let anthorFansCount = await handleDB(res, 'info_user_fans', 'sql', 'fans查询出错', `select count(*) from info_user_fans where followed_id=${authorInfo[0].id}`);

  // 传递到前端的数据
  authorNewsCount: authorNewsCount[0]['count(*)'],
  anthorFansCount: anthorFansCount[0]['count(*)']
```

<br><br>

### 关注按钮的显示
现在的状态是 关注 和 已关注都显示的状态 我们需要展示一个
那到底展示哪个我们需要查询数据库, 看看这个用户有没有关注这个作者 然后传递一个布尔值
然后前端根据传递的布尔值 决定是 display:block 还是 display: none
```js   
  // 后端根据查询数据库的结果 传递过来了 isFollow 变量, 根据这个变量的值 决定显示哪个按钮
  <a href="javascript:;" class="focus fr" style="display:{{isFollow?'none':'block'}}">关注</a>
  <a href="javascript:;" class="focused fr" style="display:{{isFollow?'block':'none'}}"><span class="out">已关注</span><span class="over">取消关注</span></a>
```

后端的逻辑
登录的用户是不是已经关注了这篇新闻的作者, 最后根据查询结果传递一个布尔值给模板
1. 定义变量 标记是否关注 根据下面的条件修改变量的值
2. 已经登录的用户并且关注了这个作者(查询数据库info_user_fans) 条件是 登录用户id是粉丝, 被关注者就是新闻作者的id
```js 
  let isFollow = false;
  if(userInfo[0]) {
    let followResult = await handleDB(res, 'info_user_fans', 'find', '查询fans表出错', `follower_id=${userInfo[0].id} and followed_id=${authorInfo[0].id}`);
    if (followResult[0]) {
      isFollow = true
    }
  }
```

<br><br>

### 关注 和 取消关注的前端分析 完成
关注和收藏的逻辑几乎一样
只要涉及到ajax的部分 那么就要考虑 ajax只管页面不刷新的状态下修改 显示数据, 而我们还需要处理当页面整体刷新的时候 同步数据库的操作
```js 
  // 关注当前新闻作者
  $(".focus").click(function () {

      // 这个是获取的新闻作者的id 被关注者的id
      var user_id = $(this).attr('data-userid')
      var params = {
          "action": "follow",
          "user_id": user_id
      }

      // 因为注意关注 和 取消关注的接口一样 上面还有一个参数是 action
      $.ajax({
          url: "/news_detail/followed_user",
          type: "post",
          contentType: "application/json",
          headers: {
              "X-CSRFToken": getCookie("csrf_token")
          },
          data: JSON.stringify(params),
          success: function (resp) {
              if (resp.errno == "0") {
                  // 关注成功
                  var count = parseInt($(".follows b").news());
                  count++;
                  $(".follows b").news(count + "")
                  $(".focus").hide()
                  $(".focused").show()
              }else if (resp.errno == "4101"){
                  // 未登录, 弹出登录框
                  $('.login_form_con').show();
              }else {
                  // 关注失败
                  alert(resp.errmsg)
              }
          }
      })
  })
```

后端逻辑代码完成
```js 
// 关注 取消关注 接口
router.post('/news_detail/followed_user', (req, res) => {
(async function () {
  // - 1. 获取用户信息
  let userInfo = await common.getUser(req, res);
  if (!userInfo[0]) {
    res.send({ errno: '4101', errmsg: '用户未登录' })
    return;
  }

  // - 2. 获取参数, 判空
  let { user_id, action } = req.body;
  if (!user_id || !action) {
    res.send({ errmsg: '参数错误1' })
    return;
  }

  // - 3. 查询数据库 且 判断关注用户是否存在, 不存在就return 确保 user_id(新闻作者的id) 是有效的
  // 新闻作者 或者 理解成 被关注者
  let userResult = await handleDB(res, 'info_user', 'find', '用户数据库查询出错', `id=${user_id}`);
  if (!userResult[0]) {
    res.send({ errmsg: '参数错误2' })
    return;
  }

  // - 4. 根据 action 的值, 关注 或者 取消关注
  if (action === 'follow') {
    // 关注
    await handleDB(res, 'info_user_fans', 'insert', '粉丝数据库添加失败', { follower_id: userInfo[0].id, followed_id:user_id });
  } else {
    // 执行取消关注
    await handleDB(res, 'info_user_fans', 'delete', '粉丝数据库添加失败', `follower_id=${userInfo[0].id} and followed_id=${user_id}`);
  }

  // - 5. 返回操作成功
  res.send({ errno: '0', errmsg: '操作成功' });
})()
})
```

<br><br>

### 个人中心页面展示
登录用户点击自己的姓名 会进入个人中心页面
我们还是跟前面的步骤一样
1. 创建 新的路由模块 profile 
2. 导出到在config.js中注册
3. 在新的路由模块下 指定接口 然后使用render响应页面
```js 
  const express = require('express');
  const handleDB = require('../db/handleDB');
  require('../utils/filters');
  const common = require('../utils/common');
  const router = express.Router();


  router.get('/profile', (req,res) => {
      res.render('news/user');
  })

  module.exports = router;
```

### 当丢失css js文件的时候 在html文件里 将../修改为/news/


### 对于用户中心来讲 必须是登录才能访问的页面
先获取用户的登录信息, 如果没有登录重定向到 / 接口
```js 
router.get('/profile', (req,res) => {
(async function() {

  let userResult = await common.getUser(req,res); 
  if (!userResult[0]) {
    // 如果没有登录让用户跳转到首页去
    res.redirect('/')
  }
  res.render('news/user');

})()
})
```

同样 我们的个人中心页面也要根据 base.html 进行模板的抽取
同样, 既然是模板了 我们要传递用户的数据到模板里面去 为了改变右上角用户登录 退出的展示
```js 
router.get('/profile', (req,res) => {
(async function() {
  let userInfo = await common.getUser(req,res);
  if (!userInfo[0]) {
    // 如果没有登录让用户跳转到首页去
    res.redirect('/')
  }

  let data = {
    user_info: {
      nick_name: userInfo[0].nick_name,
      avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg'
    }
  }

  res.render('news/user', data);
})()
})
```

<br><br>

### 个人中心页面
结构:
这个页面的结构是 左右结构 左边是 项目列表(基本资料, 头像设置, 我的关注, 密码修改...)
点我们点击项目的时候, 右侧部分 会展示对应的页面, 右侧部分是一个<ifram>标签, 所以我们也称这种情况是一个子页面

### 子页面展示的问题
我们在个人中心页面 右侧内容区里有一个 <iframe src> 标签 我们通过它来展示 user_base_info 页面
一样我们需要在src里面添加路径, 这个标签就会向这个路径对应的接口发送请求, 然后我就可以针对这个请求去写一个接口, 然后我就可以在接口中去渲染请求页面
```js 
  <div class="user_con fr">
  <iframe src="/user/base_info" frameborder="0" name="main_frame" class="main_frame" id="main_frame"></iframe>
</div>
```

<iframe src> 是一个get请求, 但是 user_base_info.html 里面是一个form表单提交 它会使用submit进行提交, 又是一个post请求, 所以这种情况下我们的接口方法可以选择 all
```js 
  router.all('/user/base_info', (req, res) => {
      //再在这里我们根据是get 还是post 决定是渲染页面 还是对提交的表单进行处理
  })
```

user_base_info.html 中的表单提交 在外链的js文件里
```js 
  $(".base_info").submit(function (e) {
      e.preventDefault()

      var signature = $("#signature").val();
      var nick_name = $("#nick_name").val();
      // var gender = $(".gender").val()
      var gender = $(".base_info").find('input:radio:checked').val();


      if (!nick_name) {
          alert('请输入昵称')
          return
      }
      if (!gender) {
          alert('请选择性别')
      }

      // TODO 修改用户信息接口
      var params = {
          "signature": signature,
          "nick_name": nick_name,
          "gender": gender
      }
      $.ajax({
          url: "/user/base_info",
          type: "post",
          contentType: "application/json",
          headers: {
              "X-CSRFToken": getCookie("csrf_token")
          },
          data: JSON.stringify(params),
          success: function (resp) {
              if (resp.errno == "0") {
                  // 更新父窗口内容
                  $('.user_center_name', parent.document).news(params['nick_name'])
                  $('#nick_name', parent.document).news(params['nick_name'])
                  $('.input_sub').blur()
              }else {
                  alert(resp.errmsg)
              }
          }
      })
  })
```

<br><br>

### 个人中心页面  --- 基本资料
这个部分我们来处理下 个人中心中的基本资料的数据展示
也就是说这个用户在数据库里面的基本资料会展示在右侧的子页面上
也就是说我们需要在后端查询数据库把前端所需要的信息 传递到模板中 展现在页面上
```js 
  我们这里是在 GET 部分处理逻辑的


  比如 前端模板中需要 我们就通过{{}}的语法将后端传递过来的数据 展示上去
  <label>用户昵称: </label>
  <input id="nick_name" type="text" name="" class="input_txt" value='{{nick_name}}'>


  后端传递的数据
  if (req.method === 'GET') {

    let data = {
      nick_name: userInfo[0].nick_name,
      // nick_name: userInfo[0].nick_name,
    }

    res.render('news/user_base_info', data);
  }
```

### 单选框 男 女 怎么处理
还有一个 单选框 男 和 女, 这个部分如何展示还是要根据后端给前端传递过来的数据
```js 
  后台数据
  let data = {
      nick_name: userInfo[0].nick_name,
      signature: userInfo[0].signature,
      gender: userInfo[0].gender ? userInfo[0].gender : 'MAN'
    }
    
    res.render('news/user_base_info', data);
```

前端模板
单选框如何选中哪个是看 checked 属性
展示不展示 我们可以用if
```js 
  <label>性别: </label>

  <input class="gender" type="radio" name="gender" checked="checked"> <b>男</b>&nbsp;&nbsp;&nbsp;&nbsp;

  <input class="gender" type="radio" name="gender">
  <b>女</b>

  修改成:

  <input class="gender" type="radio" name="gender" {{if gender=='MAN'}}checked{{/if}}> <b>男</b

  <input class="gender" type="radio" name="gender" {{if gender=='WOMAN'}}checked{{/if}}>
  <b>女</b>
```

### 修改用户基本数据 -- 后端完成
上面解决了 从数据库读到用户的基本资料 传递到模板中 最后在页面上做了展示
基本资料的界面还有修改数据 点击保存的功能, 接下来我们完成一下这个功能

点击保存按钮的动作是一个post请求, post需要提交的参数有
1. gender
2. signature
3. nick_name
```js 
  // 点击 保存按钮 ajax的内部代码
  $(".base_info").submit(function (e) {

      // 阻止标签默认提交的行为
      e.preventDefault()

      var signature = $("#signature").val();
      var nick_name = $("#nick_name").val();
      // var gender = $(".gender").val()
      var gender = $(".base_info").find('input:radio:checked').val();


      if (!nick_name) {
          alert('请输入昵称')
          return
      }
      if (!gender) {
          alert('请选择性别')
      }

      // TODO 修改用户信息接口 获取参数
      var params = {
          "signature": signature,
          "nick_name": nick_name,
          "gender": gender
      }


      $.ajax({
          url: "/user/base_info",
          type: "post",
          contentType: "application/json",
          headers: {
              "X-CSRFToken": getCookie("csrf_token")
          },
          data: JSON.stringify(params),
          success: function (resp) {
              if (resp.errno == "0") {

                  // 更新父窗口内容 我们现在是在子页面来保存用户的数据, 子页面保存了后 父页面应该同步页面右上角的数据要跟着改
                  $('.user_center_name', parent.document).html(params['nick_name'])
                  $('#nick_name', parent.document).html(params['nick_name'])
                  $('.input_sub').blur()
              }else {
                  alert(resp.errmsg)
              }
          }
      })
  })
```

### 后端业务逻辑
1. 获取参数判空
2. 根据前端传递过来的数据, 修改数据库中的数据
3. 返回操作成功

```js 
  else if (req.method === 'POST') {

    // - 1. 获取参数判空
    let {signature, nick_name, gender} = req.body;
    if (!signature || !nick_name || !gender) {
      res.send({errmsg:'参数错误'})
      return
    }

    // - 2. 根据前端传递过来的数据, 修改数据库中的数据
    await handleDB(res, 'info_user', 'update', '修改数据库出错', `id=${userInfo[0].id}`, {
      nick_name,
      signature,
      gender
    })

    // - 3. 返回操作成功
    res.send({
      errno:'0',
      errmsg: '操作成功'
    })
```

### 注意:
如果前端有没有传递过来的数据, 数据库更新也会出错, 应该是gender里面是必传项

<br><br>

### 密码的修改
在个人中心的左侧项目列表里面有 他们都是 <a> 标签 然后请求一个页面
这时候就有一个特点, <a>标签请求页面是get, 但里面的功能肯定会有提交按钮, 又是一个post, 所以我们选择的方法应该是all()

基本资料
头像设置
我的关注
密码修改
我的收藏
新闻发布
新闻列表

这节里面我们处理下 密码修改的功能, 前端的html结构代码部分如下:
```js 
  <li>
  <a href="/user/pass_info" target="main_frame">密码修改</a>
  </li>

  上面 要href 到接口 然后由服务器请求回页面
```

### 注意:
在res.render('路径') 
路径前不要加 / 
```js 
  res.render('news/user_pass_info')
```

### 后端的业务逻辑
2 和 3 的顺序能不能颠倒 颠倒也没问题但是2放在3前面会比较好, 因为如果2不行直接就return掉了 就不用查询数据库了, 所以在项目开发的时候, 查询数据库的事情尽可能的要靠后
```js 
  1. 获取参数(旧密码 和 新密码)
  2. 校验两次新密码是否一致(如果前端做了校验也可以不用这步)
  3. 旧密码是否正确
  4. 修改数据库 用户表里面的password_hash字段
  5. 返回修改成功
```


### 后端代码部分的实现
注意密码的双重md5加盐
```js 
  router.all('/user/pass_info', (req, res) => {

(async function() {
  let userInfo = await common.getUser(req, res);
  if (!userInfo[0]) {
    res.render('/');
  }

  if(req.method === 'GET') {
    res.render('news/user_pass_info')
  } else if (req.method === 'POST') {
    // 1. 获取参数(旧密码 和 新密码)
    let {old_password, new_password, new_password2} = req.body;
    if (!old_password || !new_password || !new_password2) {
      res.send({errmsg:'参数错误'})
      return
    }
    console.log(old_password, new_password, new_password2);

    // 2. 校验两次新密码是否一致(如果前端做了校验也可以不用这步)
    if (new_password !== new_password2) {
      res.send({errmsg:'两次密码不一致'})
      return
    }

    // 3. 旧密码是否正确
    if(md5(md5(old_password)+keys.password_salt) !== userInfo[0].password_hash) {
      res.send({errmsg:'旧密码不正确, 修改失败'})
      return
    }

    // 4. 修改数据库 用户表里面的password_hash字段
    await handleDB(res, 'info_user', 'update', '数据库更新数据失败', `id=${userInfo[0].id}`, {
      password_hash: md5(md5(new_password) + keys.password_salt)
    })

    // 5. 返回修改成功
    res.send({
      errno: '0',
      errmsg: '操作成功'
    })
  }
})()
```

<br><br>

### 将 验证是否登录的逻辑 抽取成函数 
上面的操作 或者说在个人中心的页面里都有一个共同的部分就是 一上来要看用户登录与否(也变相的获取到了用户信息)

将下面的代码抽取到common.js文件中
```js 
  let userInfo = await common.getUser(req, res);
  if (!userInfo[0]) {
    res.render('/');
  }

  抽取成:

  async function getUserInfo(req, res) {
      let userInfo = await getUser(req, res);
      if (!userInfo[0]) {
          res.render('/');
      }

          return userInfo
  }
```

<br><br>

### 头像设置
因为结构都是个人中心的页面左面是项目列表 右边是子页面展示
<a> 标签是get 而里面的修改内容肯定有 提交按钮 又是一个post的 导致上面我们在处理接口的时候都是使用 all() 方法

在这个部分我们使用get post方法 分隔开
同样在这节里面能接触到上传文件的操作

### 头像设置页面的展示
这里没什么复杂的 直接上代码
```js 
  router.get('/user/pic_info', (req, res) => {
      (async function() {
          // let userInfo = await common.getUserInfo(req, res);
          res.render('news/user_pic_info');
      })()
  })
```


### 头像设置页面, 关于上传头像的流程图
大致的流程
```js 
  当用户在浏览器端 点击保存按钮的时候 是不是把图片直接上传到服务器程序里 然后我们在后端来处理?

  实际上在真正的企业开发中 并不会将用户的头像图片等上传到或者说真正的保存到这台公司的服务器电脑上面去 而是 可以暂时的保存到这台服务器上 然后服务器再一次的将这个图片上传到第三方的平台上面去 也就是说真正的图片是保存在第三方的服务器上面的



  浏览器                      服务器                      第三方服务器

  保存按钮   --上传图片-- >    服务器程序  --上传图片-- >     图片保存在
                                                          第三方服务器
  img src                     服务器把图片链接
  填入图片链接                 保存在数据库

            < --返回图片链接--                < --返回图片链接-- 


            根据链接, 往第三方服务器请求图片
  浏览器                →                      第三方服务器
                        ←
              第三方服务器返回图片

  服务器将用户的图片上传到第三方的服务器上
  ↓
  第三方的服务器返回给服务器图片的链接
  ↓
  服务器将链接保存到数据库
  ↓
  服务器将链接返回给浏览器
  ↓
  浏览器的src='图片链接'


  也就是说 真正想要的状态是 希望浏览器在请求图片的时候 向 第三方服务器去请求图片, 这样对于我们本地服务器的话 压力会减小很多 另一方面 服务器是我们自己公司的 不希望用户的这些数据占用我们公司的服务器的空间
```

### 我们要拥有的概念
这样的话 我们就需要注意什么东西是需要上传到第三方服务器上面去的
我们在 public - news - upload 创建upload文件夹 用于将里面的资源上传到第三方服务器



### 前端 上传文件部分的代码
```js 
<form class="pic_info">

  <label>上传图像: </label>

  <input
      type="file"
      name="avatar"
      class="input_file"
      id="upload_file"
      onchange="changepic(this)">

  <script>

      function changepic(){

          //实现图片预览效果的js
          var reads = new FileReader();
          f = document.getElementById('upload_file').files[0];
          reads.readAsDataURL(f);
          reads.onload = function(e) {
              document.getElementById('now_user_pic').src = this.result;
          };
      };

  <script>
</form>

```


接下来我们看看 怎么将图片先上传到我们自己的服务器上 

### 下面就是阶段1 用户上传图片到服务器

### Multer
### Multer 图片怎么上传到自己的服务器上去
https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
Multer 是一个 node.js 中间件, 用于处理 multipart/form-data 类型的表单数据, 它主要用于上传文件 

它是写在 busboy 之上非常高效 
```js 
  注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据 
```

也就是说 它必须是<form> <input type='file'> 上传的数据才能用这个multer包
它可以帮助我们上传图片和文件, 并且保存到对应的路径下面

multer是以二进制的方式对图片进行存储的 文件名会看不懂


<br><br>

### upload的方法
我们把下面要使用到的upload方法写在这里 供翻阅
>>> 下面方法中的参数中的fieldname 指的是 <input name='value'> name的值

### .single(fieldname)
接受一个以 fieldname 命名的文件 这个文件的信息保存在 req.file 

### .array(fieldname[, maxCount])
接受一个以 fieldname 命名的文件数组 可以配置 maxCount 来限制上传的最大数量 这些文件的信息保存在 req.files 

### .fields(fields)
接受指定 fields 的混合文件 这些文件的信息保存在 req.files 
fields 应该是一个对象数组, 应该具有 name 和可选的 maxCount 属性 
```js 
  Example:

  [
      { name: 'avatar', maxCount: 1 },
      { name: 'gallery', maxCount: 8 }
  ]
```

### .none()
只接受文本域 如果任何文件上传到这个模式, 将发生 "LIMIT_UNEXPECTED_FILE" 错误 这和 upload.fields([]) 的效果一样 

### .any()
接受一切上传的文件 文件数组将保存在 req.files 

>>> 警告: 确保你总是处理了用户的文件上传  永远不要将 multer 作为全局中间件使用, 因为恶意用户可以上传文件到一个你没有预料到的路由, 应该只在你需要处理上传文件的路由上使用 

<br><br>


### multer的使用

### 安装multer
npm install --save multer
```js 
  Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中  body 对象包含表单的文本域信息, file 或 files 对象包含对象表单上传的文件信息 
```


### 1. 先引入multer 然后创建upload对象

const multer = require('multer');
const upload = multer({ dest: '设置上传图片的保存路径' })	


### 2. 设置上传图片的保存路径
我们将图片保存的路径更改为public文件夹下面的upload文件夹里
const upload = multer({ dest: 'public/news/upload/avatar' })	
```js 
  // 将来上传头像存放的地址
  const upload = multer({ dest: 'public/news/upload/avatar' })    
```


### 3. 在进入对应的处理接口之前 调用 upload里的方法

>>> upload.single()
本案例中我们上传的是头像 我们调用的是upload.single()方法
upload.single(参数)
是 <input type="file" name="avatar" class="input_file"  id="upload_file" onchange="changepic(this)"> 这个<input>的 name 的值

>>> 回调函数中(req, res) => {} req.file获取上传图片的信息
上传图片的信息是以数组的方式存在的

我们会使用
req.file.originalname
req.file.destination
req.file.filename

```js 
  // 在执行回调函数之前, 会先执行 upload.single()
  router.post('/user/pic_info', 进入接口之前在这, (req, res) => {
      
  })


  // 调用 upload 的方法
  - upload.single('参数是<input>中的name的值')

  router.post('/user/pic_info', upload.single('avatar'), (req, res) => {
      也就是说 来到回调这里 就已经能拿到 上传图片的信息了, 因为在回调之前我们就已经执行upload.single()了 也就是说上传完了

      在回调中 我们可以通过 来看到上传图片的信息

      console.log(req.file)
      // req.file是一个对象


      文件名被保存成了 二进制的格式:
      7fea1b5365c8615482d03d2a07be385e

  {
      fieldname: 'avatar',

      // 原文件名
      originalname: 'test.PNG',       
      encoding: '7bit',
      mimetype: 'image/png',

      // 图片在服务器的路径
      destination: 'public/news/upload/avatar',

      // 上传到服务器后的名字
      filename: '7fea1b5365c8615482d03d2a07be385e',  

      path: 'public\\news\\upload\\avatar\\7fea1b5365c8615482d03d2a07be385e',
      size: 3460
  }


  })
```

### 总结
我们先对上面的方式做一个小的总结
我们要上传图片用于展示到页面上, 可实际的开发过程中, 这样类似的情况 我们都是把图片真正的保存在第三方的服务器上

而我们做的就是先把图片暂时的上传到我们自己的服务器上
然后我们通过自己的服务器将图片上传到第三方的服务器上, 而我们自己的服务器保存的是图片在第三方服务器的图片链接

上面我们使用了 multer 包 实现了将桌面上的图片 保存到了服务器上的指定文件夹
const upload = multer({ dest: '设置上传图片的保存路径' })	
```js 设置用户上传的图片我们保存在哪里```

router.post('/user/pic_info', upload.single('avatar'), (req, res) => {
  req.file
}
```js 
  我们调用了upload.single(input标签中name的值) 把图片保存到了我们指定的文件夹

  然后我们在回调中 可以通过req.file 看到上传图片的信息
```

而用户上传的图片 multer的upload.single()帮我们做了接收

以上 我们完成了 本地 上传图片到 服务器 的过程

<br><br>

### 头像设置  --- 服务器 上传到 第三方
前面讲了 用户上传图片的大致流程是什么样的, 用户 --- 服务器(暂时) --- 第三方
而我们将图片上传到第三方 也叫作对象存储, 相当于我们把图片当做了一个对象 存在第三方

这种存储的方式叫做: 对象存储

对象存储的平台有很多, 比如 七牛云 阿里云的oss
下面记录下 七牛云 的对象存储的过程

具体的使用方式可以找七牛云中的官方sdk文档
```js 
  我们可以在七牛云的nav栏里找 文档 --- nodejs --- sdk
```


### 具体从服务器上传到七牛云存储空间的流程
### 1. npm i qiniu
npm i qiniu --save


### 2. 在官方文档中找到 上传流程
老师将官方的sdk文档里面的上传流程的代码 改成了 qn.js 文件
我们把这个 js文件 放在 utils文件夹里面

因为上传文件也需要时间, 通常的情况下我们有 上传文件之后 才做的事情 下面在qn.js文件中使用了 async 和 await promise


### 下面对 qn.js 做下解析
调用方式
upload_file(上传后的名字, 上传的图片路径从项目文件夹出发, 上传哪张图片)

```js
upload_file('01.jpg', './01.jpg')  

// 首先要引入 qiniu 模块
const qiniu_sdk = require('qiniu')


// 自己账号的标识  个人中心 -- 密钥管理 -- 有Ak SK
qiniu_sdk.conf.ACCESS_KEY = 'q3mcaHZe6V4vG5XtAUBP1368VVrDLcdlJIRpDhS5';

qiniu_sdk.conf.SECRET_KEY = 'KfecHwFTh9jOXHNqdszh5a2vw_3iDjvSAS6zUPs1';

// 要上传的空间 上传到哪个空间 这是上传到老师的空间
const bucket = "inews01"

// 文件前缀  image/avatar/01.jpg  存储空间上的文件名是有 前缀和文件组成
const prefix = 'image/avatar/'

// 生成上传文件的 token
const token = (bucket, key) => {
  const policy = new qiniu_sdk.rs.PutPolicy({ isPrefixalScope: 1, scope: bucket + ':' + key })
  return policy.uploadToken()
}

const config = new qiniu_sdk.conf.Config()

async function upload_file(file_name, file_path){
  // 保存到七牛的地址
  const file_save_path = prefix + file_name

  // 七牛上传的token
  const up_token = token(bucket, file_save_path)
  const extra = new qiniu_sdk.form_up.PutExtra()
  const formUploader = new qiniu_sdk.form_up.FormUploader(config)

  // 上传文件
  let ret = await new Promise((resolve, reject)=>{
      formUploader.putFile(up_token, file_save_path, file_path, extra, (err, data) => {
          if (!err) {
              // 上传成功,  处理返回值
              resolve(data);
          } else {
              // 上传失败,  处理返回代码
              reject(data);
          }
      });    
  }) 
  return ret
}


// 调用方式
// upload_file(上传后的名字, 上传的图片路径从项目文件夹出发, 上传哪张图片)
// upload_file('01.jpg', './01.jpg')  

module.exports = upload_file
```


### 3. 在接口文件中 引入 qn.js
const upload_file = require('../utils/qn');


### 4. 在接口中处理逻辑
qn.js文件 这个文件会返回一个promise对象 所以需要用async 和 await
upload_file()方法上传文件后 会有一个对象 我们用retObj变量接收一下

retObj中有key, 是我们的对象在存储空间中路径
七牛云中有外链 是一个七牛云的网址 复制一下
外链+key就是img src的值
```js
<img src='外链+key'>

router.post('/user/pic_info', upload.single('avatar'), (req, res) => {
  (async function () {

      upload(参数)
      // 1. 将来上传后 图片的名字是 01.jpg   将来在存储空间看的时候会是01
      // 2. 从哪找要上传的文件 路径
      let retObj = await upload_file('01.jpg', './01.jpg')
      // console.log(req.file);
      console.log(retObj);


      // 在这里接口逻辑中我们只需要将 key 存到数据库中即可

      retObj = {
          hash: 'afhasfdhuiahsd',
          key: 'image/avatar/01.jpg'
      }

  })()
})
```


### 服务器 将浏览器传到服务器上的图片 上传到七牛云 并给前端返回结果
要点:
1. 浏览器端将资源上传到服务器端 是通过 multer模块 和 upload方法实现的
2. req.file 里是对上传文件的信息
3. 使用七牛云中的upload_file方法 将服务器端的文件上传到七牛云的存储空间
4. 将七牛云服务器返回的结果中的key保存到数据库中
```js
// 头像设置  上传图像 处理post提交逻辑的接口
router.post('/user/pic_info', upload.single('avatar'), (req, res) => {
(async function () {
  
  let userInfo = await common.getUserInfo(req, res);

  // 1. 接收上传图片的对象req.file(这是浏览器传到服务器的图片 通过multer)
  let file = req.file;


  // 2. 将服务器上的图片(浏览器上传上来的) 上传到 七牛云服务器
  /* 
    file.originalname   文件的原文件名(没有上传到服务器之前的名字 上传后会转为2进制的名字)
    file.destination    文件在服务器上的路径
    file.filename       文件在服务器上的名字(二进制的)
  */

  // 拼接的时候注意有  / 因为 destination: 'public/news/upload/avatar' 的最后没有 / 
  // 上传有可能失败, 如果失败的话 retObj是一个错误对象 所以 我们使用try catch
  let retObj;
  try {
    retObj = await upload_file(file.originalname, `${file.destination}/${file.filename}`)
    
  } catch(err) {
    console.log(err)
    res.send({errmsg:'上传七牛云失败'});
  }



  // 图片的前缀:
  // http://qb30ruxlm.bkt.clouddn.com/image/avatar/

  // 3. 把七牛云返回的对象key属性保存到数据库中 retObj会返回一个对象里面有hash 和 key key是 配置的时候的前缀 和 文件名的结合体
  await handleDB(res, 'info_user', 'update', '数据修改失败', `id=${userInfo[0].id}`, {
    // 我们是将图片的链接保存到数据库里面  但是图片的前缀是一样的 所以我们只需要存储文件名就可以
    avatar_url: file.originalname
  })

  // 4. 给前端返回数据
  let data = {
    // 这里可以这么写, 也可以把前缀部分抽取出来成为一个常量, 在项目中的utils文件夹内创建一个 constant.js
    // avatar_url: 'http://qb30ruxlm.bkt.clouddn.com/image/avatar/' + file.originalname,
    avatar_url: constant.QINIU_AVATAR_URL_PRE + file.originalname,
  }


  res.send({
    errno:'0',
    errmsg:'上传成功',
    data
  })

})()

})
```

### 前端上传完图片后的代码
```js 
$(function () {
$(".pic_info").submit(function (e) {
  e.preventDefault()

  //TODO 上传头像
  // 上传头像,表单提交和其他提交方式不一样
  $(this).ajaxSubmit({
      url: "/user/pic_info",
      type: "POST",
      headers: {
          "X-CSRFToken": getCookie('csrf_token')
      },
      success: function (resp) {
          if (resp.errno == "0") {

              // 如果成功的话 将下面的三个地方的头像都改成 新头像的路径
              $(".now_user_pic").attr("src", resp.data.avatar_url)
              $(".user_center_pic>img", parent.document).attr("src", resp.data.avatar_url)
              $(".user_login>img", parent.document).attr("src", resp.data.avatar_url)
          }else {
              alert(resp.errmsg)
          }
      }
  })
  })
})
```

<br><br>

### 头像设置 --- 渲染页面
上面完成了 上传到服务器 上传到七牛云 ajax动态修改了页面上的头像
但是一刷新页面就没有了 接下来处理一下这个部分
这个部分因为前面没有设置 七牛云 所以没办法接着做

简单的来说, 就是将有关于头像的部分 都写成 info_user 里面的avatar_url 别忘了加上前缀

前端文件 和 后端接口 有关于avatar_url的部分都要做处理

<br><br>

### 我的收藏
这个页面只是展示, 所以只是get请求
后端的逻辑是查询数据库 将收藏新闻的总页数 和当前页数告诉前端

下面是前端 <script> 中的代码 是一个jQ关于分页的库的插件
https://www.jq22.com/yanshi5697

如果只是用来请求展示页面的话, 我们使用get将参数拼接到url上 用来告诉后端获取第几页的信息

post可能是用来传递数据后, 再讲后端的数据拿回来做处理的时候用post


### 前端 我的收藏.html 的script部分
在我们的收藏的页面, 使用了 pagination.js 分页的库
回调函数中是当点击分页按钮后会触发里面的代码, 用于get请求
所以我们在回调中使用localtion.href 后面拼接了参数

那get请求url上带有参数的话, 我们用req.query来接收
```js 
  $(function() {
      $("#pagination").pagination({

          // 现在是多少页
          currentPage: 2,

          // 一共是多少页
          totalPage: 3,
          callback: function(current) {

              // 点击分页按钮的时候来执行这里的代码
              alert('ok!');

              这里的代码的作用就是 点击 分页按钮 的时候发起get请求, 请求分页按钮上对应页(currentPage)的数据

              // 我们可以通过 location.href 后面拼接参数的形式 发起请求到后端的接口
              location.href = `http://localhost:8000//user/collections?p=`+currentPage;
          }
      });
  });
```


### 前端代码
前端代码根据后端传递过来的数据 根据后端的数据动态生成条目
```js 
  <ul class="article_list">
      {{each collectionNewsList}}
      <li><a href="#">{{$value.title}}</a><span>{{$value.create_time | dateFormat}}</span></li>
      {{/each}}
  </ul>
```



### 后端接口中的逻辑
个人中心的里面的页面都需要验证用户是否登录
我们需要告诉前端 当前请求的是多少页 一共多少页 
总页数 = 总条数 / 每页多少条   向上取整

总页数 我们根据登录用户的id 去查用户的收藏表, 得到了用户一共收藏了多少条
之后也是通过查询数据库 然后将结果展示在界面上

```js 
// 展示 我的收藏页面
router.get('/user/collections', (req, res) => {
(async function () {
  let userInfo = await common.getUserInfo(req, res);

  // location.href = 'http://localhost:3000/user/collections?p'+ currentPage;
  // 获取 url上的请求参数
  let {p=1} = req.query;
  let currentPage = p;
  // 总页数 = 总条数 / 每页多少条   向上取整
  // 查询收藏表 总条数 counts 登录用户收藏了多少条新闻 info_user_collection
  // counts 结果会是 [{'count(*)':50}]
  let counts = await handleDB(res, 'info_user_collection', 'sql', '数据库查询出错', `select count(*) from info_user_collection where user_id=${userInfo[0].id}`)
  
  // 正常每页显示多少条也是前端传递过来的数据, 我们这里定死吧
  let totalPage = Math.ceil(counts[0]['count(*)'] / 10);

  // collectionNewList 也要查询数据库(info_news) 标题和时间字段 条件是登录的用户收藏过的新闻
  // 我们要先查用户收藏过哪些新闻 再通过新闻找到对应的标题和创建时间字段 这是两张不同的表
  /* 
    先在 收藏表中 查询登录用户收藏过的新闻id
    然后 再通过news_id 查询info_news中对应的标题字段和时间字段
    同样因为前端只展示10条, 我们使用分页查询
  */
  // 1. 先查询登录用户收藏过的新闻id(分页查询) 结果是一个id列表
  let collectionNewsIdList = await handleDB(res, 'info_user_collection', 'find', '数据库查询出错2', `user_id=${userInfo[0].id} limit 1, 10`)
  // console.log(collectionNewsIdList);

  /* 
    collectionNewsIdList的结果 id数组
    [
      RowDataPacket {
        user_id: 2,
        news_id: 149,
        create_time: 2021-06-07T13:30:20.000Z
      }
    ]   

    接下来我们可以遍历这个数组, 拿着 news_id去 info_news里面去找对应的标题字段和创建时间字段
  */

  // 遍历这个id数组, 拿着里面每一个元素的news_id属性去查询info_news表 并把查询的结果push到 collectionNewsList中
  let collectionNewsList = [];
  for (let i = 0; i < collectionNewsIdList.length; i++) {
    let ret = await handleDB(res, 'info_news', 'sql', '数据库查询出错3', `select title, create_time from info_news where id=${collectionNewsIdList[i].news_id}`)
    collectionNewsList.push(ret[0]);
    // ret[0]   [{title:'新闻标题', create_time:'xxxx'}];
  }

  console.log(collectionNewsList);
  


  let data = {
    currentPage,
    totalPage,
    collectionNewsList
  }
  res.render('news/user_collection',data);
})()
})
```

<br><br>

### 项目总结
《经济新闻网》一款新闻展示的Web项目, 主要为用户提供最新的金融资讯、数据
以抓取其他网站数据和用户发布作为新闻的主要来源
基于express 框架, 以 前后端不分离 的形式实现具体业务逻辑
```js 
  前端的资源也是在服务器上
```

数据存储采用mysql, 使用orm
封装自己的操作数据可的工具函数handleDB(兼容其他node框架)
用户图片数据使用对象存储(七牛云)
采用session实现保持用户登录状态机制
实现对CSRF请求伪造进行防护功能
(提供jwt的获取接口)
```js 
  写了jwt就不用csrf的防护了
```


采用art-template 模板引擎技术
界面局部刷新使用 ajax 请求接口
实现模块: 注册、登录、首页新闻数据展示模块, 滑动到底部加载更多、点击排行、基页模板的抽取与模板继承、详情页数据展示、用户收藏新闻、用户评论模块、回复评论模块、新闻作者数据展示、用户关注模块、个人中心模块(修改基本资料、密码、用户头像)等 

<br><br>

### 跨域介绍
跨域 是指浏览器不能执行其他网站的脚本, 它是由浏览器的同源策略造成的, 是浏览器对js实施的安全限制

同源是指, 域名、协议、端口均为相同

### 同源策略限制了以下的行为:
1. Cookie无法读取
```js 
  cookie是服务器给你设置的 下一次请求的时候会自动带到服务器去 也就是说百度设置的cookie是不会带到淘宝上去的

  百度无法读取淘宝设置的cookie 淘宝也无法获取百度设置的cookie
```

2. DOM 和 JS 对象无法获取
```js 
  无法控制其他网站的额dom 和 js对象
  比如我们访问百度的网站 我想改变搜索框的位置颜色等 在我们自己的电脑上是操作不了页面的

  要操作得在百度的服务器上处理这件事情
  因为是其他的地址(ip地址) 并不是我们本地的地址了
```

3. Ajax请求发送不出去
```js 
  没办法向其它的服务器发送ajax 比如我们想获取不同源的数据 我们写一个ajax请求 是请求不到的
```

### 什么叫做Ajax请求发送不出去?
比如 下面的后端代码 定义了一个接口/get_data 定义了3001端口
也就是说 我们访问 http://localhost:3001/get_data 是可以接收到服务器响应回的数据的 name node age 11

接下来我们在前端定义一个html页面想将后端的数据展示在页面上, 但是我们是通过vscode的liveserver打开页面(live server会自己搭建服务器) 这样就是不同源了

也就是说 现在的是5000端口 去3000端口发送请求, 因为不是同源 会报跨域的错误信息
```js 
  跨域
  No 'Access_Contorl_Allow_origin' header is present on the requested resoure

  本质是什么?
  右键执行onliveserver localhost:5000 属于另外一个域
  本质是:
  localhost:3000 的程序 没办法处理 localhost:5000 的ajax代码 因为不同源
```


### 跨域代码演示:  
```js 
  // 后端代码
  const express = require("express");
  const app = express();
  app.get("/get_data",(req, res)=>{ 

      let data = {
          name:'node',
          age:'11'
      }
      res.send(data)
  })
  app.listen(3001, ()=>{
      console.log(`服务器已经启动, 端口为: 3001`);
  })


  // 前端 html 代码   (右键Open in Live Server): 
  <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></>

  <p>
      <span id="sp1"></span>的年龄是<span id="sp2"></span>
  </p>

  <script>
      $.ajax({
          url:'http://localhost:3001/get_data',

          // 如果写成这样就是向5000端口的服务器程序请求数据 但是5000端口里没有get_data的接口
          url:'/get_data',

          type:"GET",
          success: function(data){
              $("#sp1").html(data.name)
              $("#sp2").html(data.age)
          }
      });
  </script>
```

<br><br>

### 跨域的解决方案1: jsonp 的实现原理
ajax去发起请求 可能会遇到跨域的情况, 因为协议 域名 端口不一致就会涉及到跨域
但是我们可以<script src=''>中的src 本身就带有跨域的特性 去请求另一个网站的数据
```js 
  处理使用ajax代码发起请求外, 页面某些标签也会自动发起请求 我们可以利用script标签的src属性, 来发起请求 

  jsonp 就是前端利用 script 在页面不刷新的情况下和服务器进行交互一种技术 拿 json 格式的数据去填充一个函数, 英语: json with paddding a function 简称: jsonp
```

这种方式不是想跨域就跨域的 必须另一台服务器的配合 配合写接口 配合在响应数据的时候 调用前端的处理函数 也就是经过另一个网站的后端同意的得配合啊

使用jsonp的场景是 3000端口 和 5000端口有合作关系

实现:
### 前端:
1. 在一个<script>标签中定义好 前端拿到数据后怎么处理的函数 是渲染还是展示?
```js 
  // 比如我们前端的端口是5000
  <script>
      function handleData(data) {
          $("#sp1").html(data.name)
          $("#sp2").html(data.age)
      }
  <script>
```

2. 在另一个<script>标签中的src中填写另一个网站的网址/接口
```js 
  // 后端的端口是3000
  <script src='http://localhost:3000/get_data'></script>
```

### 后端:
在对应的接口中 res.send(这里调用前端的处理响应数据的函数 并传入data)
```js 
  app.get("/get_data",(req, res)=>{ 
      let data = {
          name:'node',
          age:'11'
      }
      res.send(handleData(data))
  })
```

### 总结
虽然这种方式可以跨域 但是要和对方商量好 返回一个函数的调用的字符串
jsonp也有框架支持 会给出响应的api
为什么ajax就跨域 script src就不跨域呢?
因为ajax是js代码是脚本, 而跨域的概念是要执行js脚本才是跨域 而src不是


### 为什么需要用到跨域？
1. 自身业务是出现很多端(前后端分离开发)
2. 和第三方合作
3. 面试经常问


<br><br>

### Express 提供的jsonp的方法
1. 前端在<script> 标签中 定义响应回的数据的处理函数
2. 另一个<script src='网址/接口?callback=处理函数名'>
```js 
  第一个callback是固定的写法
```

后端使用res.jsonp()返回数据
```js 
  jsonp() 是express封装的, 可以公开这个接口 这个接口任何网站都可以访问
  任何一端都可以使用 也不用跟我商量了

  因为前端定义的函数 前端src写的get_data?callback=handleData
  后端只是用res.jsonp()开放了这个接口 别人只要使用 get_data?callback=handleData 发起的请求 都能访问到这个接口
```

当在src里这么写的时候 后端接收到callback参数的时候就知道你要跨域
```js 
  // 前端:
  <script>
      function handleData(data) {
          $("#sp1").html(data.name)
          $("#sp2").html(data.age)
      }
  <script>
  <script src='http://localhost:3000/get_data?callback=handleData'></script>

  // 后端
  app.get("/get_data",(req, res)=>{ 
      let data = {
          name:'node',
          age:'11'
      }
      res.jsonp(data)
  })
```

<br><br>

### 跨域的解决方案2: 后端设置响应头
### res.setHeader("Access-Control-Allow-Origin", "*")
```js 
  // 后端
  app.get("/get_data",(req, res)=>{ 
      let data = {
          name:'node',
          age:'11'
      }

      // 任意的源 任意的服务器都可以来这里请求
      // 如果只想要每一台就把 * 换成 对应的域名
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.send(data)
  })
```

也是开放了这个接口

<br><br>

### 跨域的解决方案3: 使用cors包解决跨域
npm i cors --save

1. npm安装
2. 引入 const cors = require('cors')
3. 注册 app.use(cors());

然后就可以了 它的原理其实也是设置了res.setHeader("Access-Control-Allow-Origin", "*")



### 如何处理跨域带来的ajax问题？**(解决跨域方案)
1. jsonp  
2. 设置代理服务器
3. 后端设置响应头
```js 
  res.setHeader("Access-Control-Allow-Origin", "*")
```

<br><br>

### Koa
Koa 是现在最流行的基于Node.js平台的web开发框架 

koa 是由 Express 原班人马打造的
致力于成为一个更小、更富有表现力、更健壮的 Web 框架 
koa 不在内核方法中绑定任何中间件, 它仅仅提供了一个轻量优雅的函数库, 使得编写 Web 应用变得得心应手 
```js    
  中间件其实就是一些方法 内置的方法 比如我们以前获取post参数的时候 会使用的body-parser(已经弃用) 这个功能就是中间件
```

官网: https://koajs.com/
中文社区: https://www.koajs.com.cn/

### 安装
1. npm init -y
2. npm i koa

### 使用方式
没有app.get app.post了, koa内部没有app.get post方式 需要使用路由的方式
ctx
ctx里面封装了两个对象 (req, res)
```js 
  ctx 的全称是 context 上下文
  一个请求过来 先执行哪个函数 再执行哪个函数 再执行哪个函数 它们之间是有联系的 这个联系称之为上下文
```

ctx.req.url
ctx.req.method

```js 
  const Koa = require('koa');
  const app = new Koa();

  app.use(async ctx => {
      ctx.body = 'hello koa'

      console.log(ctx.req.url);
      console.log(ctx.req.method);
  })

  app.listen(3000, () => {
      console.log('3000端口已监听')
  })
```

<br><br>

### express中的洋葱理论
没太听懂 大概就是根据res.send为中心, 在没有遇到send之前执行的是next上面的代码, 遇到send之后开始从自身执行next下面的代码, 然后再执行前一个next()下面的代码, 可以先放放 做为了解把


之间我们使用express框架里面的路由的时候
```js 
  const express = require('express');
  const router = express.Router();
  const app = express();
  app.use(router);

  router.get('', (req, res) => { ... })

  app.listen(3000, () => { ... })
```

之前我们还讲过钩子函数, 在进入这个接口前执行的函数, 写在注册路由接口的前面
```js 
  app.use(gouzi1, router)
```

### 演示代码
```js 
  const express = require('express');
  const router = express.Router();
  const app = express();
  app.use(gouzi1, router);

  router.get('', (req, res) => {
      res.send('get_data')
  })


  function gouzi1(req, res, next) {
      console.log('gouzi1');
      next();
  }

  app.listen(3000, () => { ... })


  // 打印结果
  gouzi1
  get_data


  // 其实钩子函数还能写很多个 比如 我们还可以在接口函数执行完后执行其他的函数
  app.use(gouzi1, router, gouzi2);

  function gouzi1(req, res, next) {
      console.log('gouzi1');
      next();
  }

  function gouzi2(req, res, next) {
      console.log('gouzi2');
  }

  // 注意这里哦 其实回调中还有第3个参数 next
  router.get('', (req, res, next) => {
      res.send('get_data')
      next()
  })

  // 打印结果
  gouzi1
  get_data
  gouzi2
```

### express 的洋葱执行原理
上面的还好理解, 来点不一样的 下面的执行顺序是什么样的?
```js 
  function gouzi1(req, res, next) {
      console.log('gouzi1');              // 1
      next();
      console.log(1111)                   // 4
  }

  router.get('', (req, res, next) => {
      res.send('get_data')                // 2
      next()
      console.log(2222)                   // 3
  })

  function gouzi2(req, res, next) {
      console.log('gouzi2');              // 5
  }

  // 打印结果
  gouzi1
  get_data
  2222
  1111
  gouzi2

  以next() 为界 先执行next()上面的
  先执行gouzi1函数中next() 上面的
  console.log('gouzi1')       // gouzi1

  然后执行router.get回调中 next() 上面的
  res.send('get_data')        // get_data

  然后遇到send了 开始执行 next() 下面的

  然后执行router.get回调中 next() 下面的
  console.log(2222)           // 2222

  然后回去执行前面的 gouzi1函数中  next() 下面的
  console.log(1111)           // 1111

  最后执行gouzi2函数

  这种执行函数的模式就是 洋葱原理
```

<br><br>

### koa路由中间件的使用
上面简单的介绍了一下 怎么使用koa框架去输出 hello nodejs
```js 
  const Koa = require('koa');
  const app = new Koa();

  app.use(async ctx => {
      
      但是有个问题, 不管接口是什么都会执行这里面的代码 因为我们没有指定接口
      xxx:3000/abc
      xxx:3000/111
      xxx:3000/vgf

      不管接口是什么都会执行这里面的代码

      koa中没有app.get post 指定接口的方法 而是要下载路由的扩展
  })

  app.listen(3000, () => {
      console.log('3000端口已监听')
  })
```

### 安装koa路由中间件
npm i koa-router

### 引入 创建路由对象
const Router = require('koa-router')
let router = new Router()

### 使用router
router.get('/', (req, res) => { ctx.body = 'hello' })
router.post('/', (req, res) => { ctx.body = 'hello' })

### 在app中注册 通过 router.routes() 方法注册
app.use(router.routes());

### 完整代码
```js 
  const Koa = require('koa');
  const Router = require('koa-router');

  const app = new Koa();
  const router = new Router();

  router.get('/', async ctx => {
      ctx.body = 'hello'
  })

  app.use(router.routes());

  app.listen(3000, () => {
      console.log('3000端口已监听')
  })
```

<br><br>

### koa的数据库操作
在使用koa查询数据库的时候 我们还是可以使用handleDB来操作
别忘了把db文件夹整体的拿过来, 里面还有我们的一些配置

同时因为 await 需要 async 所以我们在 ctx 的前面加上了 async

```js 
  const Koa = require('koa');
  const Router = require('koa-router');

  const app = new Koa();
  const router = new Router();


  // 注意async的位置
  router.get('/', async ctx => {
      
      我们在这里查询数据库的操作

      let result = await handleDB(ctx.res, ...)
      ctx.body = result

  })

  app.use(router.routes());

  app.listen(3000, () => {
      console.log('3000端口已监听')
  })
```

<br><br>

### koa的数据库操作





### 定位
### 数据库练习代码
创建数据库
create database qianduan_test charset=utf8;

使用数据库
use qianduan_test;

创建students表
create table students (
  id int unsigned primary key auto_increment not null,
  name varchar(20) default '',
  age tinyint unsigned default 0,
  height decimal(5,2),
  gender enum('男', '女', '中性', '保密') default '保密',
  cls_id int unsigned default 0,
  is_delete bit default 0
);

创建classes表
create table classes (
  id int unsigned auto_increment primary key not null,
  name varchar(30) not null
);

向students表中插入数据
insert into students values
(0, '小明', 18, 180.00, 2, 1, 0),
(0, '小月月', 18, 180.00, 2, 2, 1),
(0, '彭于晏', 29, 185.00, 1, 1, 0),
(0, '刘德华', 59, 175.00, 1, 2, 1),
(0, '黄蓉', 38, 160.00, 2, 1, 0),
(0, '凤姐', 28, 150.00, 4, 2, 1),
(0, '王祖贤', 18, 172.00, 2, 1, 1),
(0, '周杰伦', 36, null, 1, 1, 0),
(0, '程坤', 27, 181.00, 1, 2, 0),
(0, '刘亦菲', 25, 166.00, 2, 2, 0),
(0, '金星', 33, 162.00, 3, 3, 1),
(0, '静香', 12, 180.00, 2, 4, 0),
(0, '郭靖', 12, 170.00, 1, 4, 0),
(0, '周杰', 34, 176.00, 2, 5, 0);

向classes表中插入数据
insert into classes values (0, 'qianduan_01期'),(0, 'qianduan_02期');

```js 
  6月10号会自动扣款是么
  我在网站上看到 应支付总额是5857 但是我这个月消费应该是8万以上
  6月10号那天我只

  私の返済日はまいつきとおかですよね　そのひはこうざからひきおとしますね
  こんげつはJCBのさいとを見て、支払い分は５８５７えんですが、私がこんげつショッピングの全額はたぶん
  ８まんいじょうです
  とおかのひに　５８５７えんだけではらえば問題ないですか？

  给所有的复选框添加点击事件, 每点击一个复选框都会对所有的复选框的状态进行判断, 一旦复选框的状态都是true那全选框就是选中状态, 一旦复选框有一个没选中那全选按钮就不是选中状态

  全选框的状态是根据 flag的状态的来决定的, flag为true那就是全选框被选中, flag为false那就是全选框被取消

  图例给所有的复选框绑定了点击事件, 点击事件里对所有的复选框做判断 假如复选框有没选中的 那就改变flag的状态 相当于间接的改变 全选框的状态

  它先假设flag为true 然后下面定了一个条件 就改变flag 就这样

  你的写法 js 从上到下执行, 不管你上面怎么判断的 肯定会执行到第80行 全选框恒为true



```





<br><br>

### 总结部分:

### express中的response.json()
响应会客户端的就是json格式的数据


### JQ中的补充
### 表单(form对象).submit(function() { ... })
表单提交事件
一上来要先阻止表单的默认提交操作, e.preventDefault()
这个submit()函数是在form表单点击submit按钮的时候默认可以触发的 


### 前面所学的在入口js文件中的配置
获取post参数的配置 + 引入路由的配置
```js 
const express = require('express');
const path = require('path')

// 引入路由文件
const passportRouter = require('./router/passport');

// 创建项目对象
const app = express();

// 将引入的路由文件在app中注册
app.use(passportRouter);

// 获取post请求参数前置配置
app.use(express.urlencoded({extended:false}));
app.use(express.json())


// 使用模板语法 和 render()
app.engine('html', require('express-art-template'));
app.set('view options', {
debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.listen(3000, () => {
console.log('3000端口已开启')
})
```



### cookie的过期时间的问题
maxAge: 24*60*60*1000 设置过期时间为 24小时
浏览器上cookie的过期时间: 2020-06-16T14:25:38.226Z
电脑上cookie的过期时间:   2020-6-15 22:25

时差的问题
```js 
  Z-Time Zebra time=GMT格林威治时间
  北京时间=GMT时间+8小时
```

<br><br>

### 补充知识体系:

### 使用node做上传功能
图片上传是web开发中经常用到的功能, node社区在这方面也有了相对完善的支持 
常用的开源组件有multer、formidable等, 借助这两个开源组件, 可以轻松搞定图片上传 

### 需要安装的模块 multer
它起到文件上传的功能
npm i multer --save

在下载 multer 后 我们可以使用multer方法

### multer({dest: 'upload'}).single('file')   单图上传
### multer({dest: 'upload'}).array('file', 2)    多图上传
放在响应的回调之前使用

multer({dest: 'upload'})  用户设置 用户上传的图片放在哪里 示例中是在项目根目录下
.single('file')
  - 单图上传 上传的key为file,  value为文件, ajax提交的时候 前端需要填写指定的参数名就是file
  ```js 
      比如要获取 数据 前端就要添写username 和 password 和这个名字是一样的
  ```

.array('file', 2) 
  - 多图上传 
  - 表示支持多图上传 最多两张


### 示例: 
```js 
  <form action="/upload-multi" method="post" enctype="multipart/form-data">
      <h2>多图上传</h2>
      <input type="file" name="logo">
      <input type="file" name="logo">
      <input type="submit" value="提交">
  </form>

  const express = require('express')
  const multer = require('multer')
  const fs = require('fs')
  const app = express()

  app.post('/upload', multer({dest: 'upload'}).single('file'), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
      console.log(req.file)
      res.send(req.file)
  })
```

<br><br>

### vue react 的history怎么解决404的问题呢？
需要后端工程师配合 它要将路径上的资源 和 后台的所有接口进行一个匹配
最终决定下 哪些是前端路由的 哪些是后端路由的

nodejs里面有一个专门用来解决 history 404问题的中间件
nodejs 里面要安装依赖
npm install --save connect-history-api-fallback

https://www.npmjs.com/package/connect-history-api-fallback

要点: 
1. 必须在静态资源设置前使用

```js 
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()

// 使用插件 它是一个函数要调用
app.use(history());

// history的使用必须在设置静态资源前
app.use(express.static(__dirname+'public'))

app.get('/', (req, res) => { 
  // 这里不用写返回首页的逻辑 好像自动去找index页面
})
```

还可以使用nginx 它会分析我们的请求是前端路由还是后端路由


### multiparty 中间件的使用
Multiparty是用来解析FormData数据的一款插件, 还有一款与之功能相同的插件, 叫Formidable 

### 核心代码演示
```js
const express = require("express")
const multiparty = require("multiparty")
const cors = require('cors');

const app = express()
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

let num = 0;

app.post("/login", (req, res) => {
// 实例化 form 对象
let form = new multiparty.Form()

// 调用实例对象的parse方法
form.parse(req, (err, field, files) => {
  console.log(field)
})

let data = {
  msg: "登录成功"
}
res.send(data)
})

app.listen(3333, () => {
console.log("服务器已开启")
})
```

### 安装
npm install multipary
const multiparty = require("multiparty")

### 1. 创建 multiparty 实例
let form = new multiparty.Form();

插件的构造函数接收一个对象作为参数, 参数是可选的, 可以不传 
参数的属性有: 
  encoding: 
      formdata的数据设置编码, 默认是utf-8  
  maxFieldsSize:
      限制字段, 按字节分配的内存量, 默认是2M, 超出则会产生错误  
  maxFields: 
      限制被解析字段的数量, 默认为1000 
  maxFilesSize: 
      此属性只有在autoFiles为true的时候生效, 设置上传文件接收字节的最大数量 也就是限制最大能上传多大的文件 
  autoFields: 
      启用字段事件, 并禁用字段的部分时间 如果监听字段事件, 该属性自动为true 
  autoFiles: 
      启用文件事件, 并禁用部分文件事件, 如果监听文件事件, 则默认为true 
  uploadDir: 
      放置文件的目录, 只有autoFiels为true是有用 

### 2. 调用form.parse(方法)
form.parse(req, (err, field, files) => { ... })
```js 
  实例化完构造函数后, 开始正式解析FormData数据 
  利用parse()方法来解析 
  
  方法接收两个参数, 无返回值 
      第一个参数为request对象, 把创建服务时, 回掉函数中的第一个参数传进去就可以 
      
      第二个参数是cb, 一个回掉函数, 通过该回掉函数, 可以获取到解析后的数据 
      
  如果你是上传文件, 使用这个回调函数的话 那我可以很荣幸的告诉你, 你不需要在执行写入文件的工作了, 因为插件已经完成了 

  你只需要设置好uploadDir属性, 然后做些后续操作就可以了 

  因为回掉函数会默认开启autoFields和autoFlies 
  
  个人感觉应该是内部监听field和file事件 继续说回调函数, 
  它有三个参数, 第一个参数是err, 第二个参数是fields, 第三个参数是flies 
  
  err是发生错误时, 返回的异常信息 
  fields是一个对象, 存储着FormData里的字段信息 
  files存储的是文件信息 
  
  如果你把整个file对象直接放进formData内, 则有值, 否则为空对象 假如你想自己写文件的话, 这个回调函数完全可以忽略掉 
```

part事件, 之所以先说这个事件, 因为它是实现自己写文件的关键 
该事件会在请求中遇到文件数据时触发, 它的回调函数是一个实现可读流的实例对象 

对象提供的属性有
  headers: 存储着请求的头部信息 
  name: 字段名称 
  filename: 文件名称 
  byteFffset:这部分数据, 在主体数据中的字节偏移量 
  byteCount: 数据总的字节长度 
  
注意使用part事件时, 不要再去监听fields和files事件 如果监听了的话, 那在part事件中, 你将得不到你想要的数据 

```js
form.on("part", part => {
  if(part.filename) {
      if(!w) {
          w = file.createWriteStream("../...")
          part.pipe(w)
      }
  }
})
```

aborted事件会在请求中止时触发 
close事件会在请求结束之后触发 
file事件, 
  如果发送的是文件, 则可以监听该事件 监听此事件, 插件会把文件写到磁盘上, 在利用回调返回相关信息 参数一name: 字段名称 参数二file: 存储着文件信息的对象 属性有: fieldName: 字段名称 originalFilename: 文件名称 path: 写到磁盘上文件的具体路径 headers: 存储着头部信息 size: 文件具体大小 

  field事件, 监听此事件, 可以获取到请求中的具体数据 回调函数两个参数 name: 字段名 value: 字段值 



### NodeJs+Express 利用multiparty中间件实现文件上传功能
### 服务端
```js
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//登录
var Login_File = path.join(__dirname, 'demo/tongxunlu.json'); 
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
// 图片上传
app.post('/demo/upload',function(req, res) {
// don't forget to delete all req.files when done 
//生成multiparty对象, 并配置上传目标路径
var form = new multiparty.Form({uploadDir: './upload/picture/'});

//上传完成后处理
form.parse(req, function(err, fields, files) {
var obj ={};

var filesTmp = JSON.stringify(files,null,2);
if(err){
    console.log('parse error: ' + err);
  }
  else {
    
    console.log('parse files: ' + filesTmp);
    var inputFile = files.inputFile[0];
    var uploadedPath = inputFile.path;
    var dstPath = './upload/picture/' + inputFile.originalFilename;
  //重命名为真实文件名
  fs.rename(uploadedPath, dstPath, function(err) {
    if(err){
      console.log('rename error: ' + err);
  res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
  res.end("{'status':200, 'message': '上传失败！'}");
    } else {
      console.log('rename ok');                
  res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
  res.end("{'status':400, 'message': '上传成功！'}");
    }
  });
  }
});
});
module.exports = router;
```

### 示例2:
```js
const multiparty = require("multiparty"),
  uploadDir = `${__dirname}/upload`;

function handleMultiparty(req, res, temp) {
  return new Promise((resolve, reject) => {
      // multiparty的配置
      let options = {
          maxFieldsSize: 200 * 1024 * 1024
      };
      !temp ? options.uploadDir = uploadDir : null;
      let form = new multiparty.Form(options);
      // multiparty解析
      form.parse(req, function (err, fields, files) {
          if (err) {
              res.send({
                  code: 1,
                  reason: err
              });
              reject(err);
              return;
          }
          resolve({
              fields,
              files
          });
      });
  });
}

// 基于FORM-DATA上传数据
app.post('/single1', async (req, res) => {
  let {
      files
  } = await handleMultiparty(req, res);
  let file = files.file[0];
  res.send({
      code: 0,
      originalFilename: file.originalFilename,
      path: file.path.replace(__dirname, `http://127.0.0.1:${PORT}`)
  });
});

```

### 这个服务端有三个坑需要注意
1.var form = new multiparty.Form({uploadDir: './upload/picture/'});
需要注意一下, 这里的文件路径并不会自动创建, 需要用户在开发过程中自己在项目的根目录中创建该路径, 否则就会报文件路径不存在的错误 

2.var inputFile = files.inputFile[0];
这行代码中, inputFile是form表单中的input组件的name值, 这里要在postman中将请求参数调整成inputFile, 否则就会报变量未定义的错误 



### application/json 跨域问题
https://www.cnblogs.com/paul-xiao/p/14484798.html



# 收集:

## require is not defind: 
原来是node在升级之后, 对 require 的使用方法发生了改变 从node.js 14版及以上版本中, require作为COMMONJS的一个命令已不再直接支持使用, 所以我们需要导入createRequire命令才可以 

所以在使用 require 的时候只需要加入以下代码就可以了

```js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
```

<br>

或者:
```js
import _ from "lodash"
```

<br>

或者:
```js
"type": "module"
```

<br>

### package.json 中的 type 字段
```js
"type": "module" 
```

<br>

**作用:**  
type字段的产生用于定义package.json文件和该文件所在目录根目录中 **.js文件和无拓展名文件** 的处理方式 
值为'moduel'则当作es模块处理
值为'commonjs'则被当作commonJs模块处理

目前node默认的是如果pacakage.json没有定义type字段, 则按照commonJs规范处理

node官方建议包的开发者明确指定package.json中type字段的值  
无论package.json中的type字段为何值, .mjs的文件都按照es模块来处理, .cjs的文件都按照commonJs模块来处理

<br>

## 进入node交互模式:

### 启动交互命令 进入shell:  
两次control+c 退出
```
node
```

<br>

## 通过 code . 的方式以Vscode打开文件目录
```
安装code: 
打开VSCode –> 
  command+shift+p –> 
    输入shell command –> 
      点击提示Shell Command: Install ‘code’ command in PATH运行
```

之后就可以通过 code . 打开对应的项目

<br>

### 提交表单的相关总结

### 情景1:
直接获取 username password 的值 使用 axios 发送 post 请求 发送到后台
观察 network 发现 有两次请求 options post

<br>

**响应头信息: 204 options**  
options 请求 响应回来 204 通知没有 响应体
```s
HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Vary: Access-Control-Request-Headers
Access-Control-Allow-Headers: content-type
Content-Length: 0
Date: Thu, 30 Jun 2022 03:15:54 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

<br>

跨域请求需要填写如下信息:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Vary: Access-Control-Request-Headers
Access-Control-Allow-Headers: content-type
```

<br>

**请求头信息: 200 post**  
```s
POST /upload HTTP/1.1
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate, br
Accept-Language: ja,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 38
Content-Type: application/json
Host: localhost:3333
Origin: http://127.0.0.1:5500
Pragma: no-cache
Referer: http://127.0.0.1:5500/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36
sec-ch-ua: ".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
```

**头信息 Accept:**  
期望服务端返回 application/json 类型等数据
```
Accept: application/json, text/plain, */*
```

**使用 axios 发送post请求 请求体类型 自动为 Content-Type: application/json**  
因为 axios 会将配置在data中的参数放在请求体中携带

<br>

### 情景2:
使用 formdata axios 将 post 请求发送给后台

后台在定义接收 post请求参数的时候 需要写如下的代码
```js
app.use(express.urlencoded({extended: true}))
app.use(express.json())
```

<br>

但是如果是前端使用的 formdata 传递的数据 那么如上的配置是没有用的 我们会发现 req.body 里面为空
这时 我们要使用一些npm包来进行处理 比如 express-fileupload 使用后 req.body 中就能接收到 formdata 类型的数据了

```js
const uploader = require("express-fileupload")
app.use(uploader())
```

**注意:**  
使用 formdata 传递数据 发现 请求头 和 响应头 的 content-type 都是 application/json

<br>

### 情景3:
使用 formdata axios 将 post 请求发送给后台 (带文件) 

后台使用了express-fileupload
但是前端并没有设置 content-type: multipart-formdata 这时发现后台也照样能接收到 正常来说当我们使用了 formdata 发送文件的话 请求头的类型必须要指定的 但是这里没有指定也可以的话 说明axios帮我们处理了？

请求头 响应头 都是 application/json  
表单项在 req.body  里面接收  
文件在   req.files 里面接收

当发送图片的情况下:
req.files: 是一个对象
```js
{
html<input的name值> : {
  各种数据
  name: 'harrier.mp4',
  data: <Buffer 00 00 00 18 66 74 79 70 6d 70 34 32 00 00 00 00 6d 70 34 32 6d 70 34 31 00 01 38 55 6d 6f 6f 76 00 00 00 6c 6d 76 68 64 00 00 00 00 db 15 fc 88 db 15 ... 31812649 more bytes>,
  size: 31812699,
  encoding: '7bit',
  tempFilePath: '',
  truncated: false,
  mimetype: 'video/mp4',
  md5: 'c8163926b977b7ae535063dec50b5270',

  // 函数
  mv: [Function: mv]
}
}
```

<br>

### express-fileupload读取结果req.files的说明:

- name: 上传文件的名字 

- data: 上传文件数据, 是一个Buffer, 可以通过writeFile方法写入到本地文件中 

- size: 上传文件的大小, 单位为字节 

- tempFilePath: 临时文件路径 

- truncated: 表示文件是否超过大小限制 

- mimetype: 文件的mimetype类型 

- md5: 文件的MD5值, 可用于检验文件 

- mv: 将文件移动到服务器上其他位置的回调函数 

<br>

### mv 回调
filePath: 指定是上传文件的保存路径 包含文件名的后缀名, 文件会自动保存在该目录中
callback: 是回调函数用来处理判断是否上传成功并且有一个参数err表示错误对象

```js
let filePath = resolve(__dirname, "images", `${file.name}`)
file.mv(filePath, err => {

if(err) return res.send({
  code: 400,
  msg: "上传失败",
  err
})

res.send({
  code: 200,
  fileName: file.name,
  path: `http://localhost:3000/${file.name}`
})
})
```

<br><br>