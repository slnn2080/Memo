# Package
在每个前端项目中，都有package.json文件，它是项目的配置文件，常见的配置有配置项目启动、打包命令，声明依赖包等。package.json文件是一个JSON对象，该对象的每一个成员就是当前项目的一项设置

当我们搭建一个新项目时，往往脚手架就帮我们初始化好了一个package.jaon配置文件，它位于项目的根目录中。

当我们克隆一个新的项目到本地时，需要执行npm install(yarn install)命令来安装项目所需的依赖文件。当执行该命令时，就会根据package.json文件中的配置信息来自动下载所需的模块，也就是配置项目所需的运行和开发环境。

<br>

### 必须属性
package.json中最重要的两个字段就是name和version，它们都是必须的，如果没有，就无法正常执行npm install命令。npm规定package.json文件是由名称和版本号作为唯一标识符的。


### name
name很容易理解，就是项目的名称，它是一个字符串。在给name字段命名时，需要注意以下几点: 

名称的长度必须小于或等于214个字符，不能以“.”和“_”开头，不能包含大写字母(这是因为当软件包在npm上发布时，会基于此属性获得自己的URL，所以不能包含非URL安全字符(non-url-safe))  
名称可以作为参数被传入require("")，用来导入模块，所以应当尽可能的简短、语义化  
名称不能和其他模块的名称重复，可以使用npm view命令查询模块明是否重复，如果不重复就会提示404:   

<br>

### version
version字段表示该项目包的版本号，它是一个字符串。在每次项目改动后，即将发布时，都要同步的去更改项目的版本号。版本号的使用规范如下:   
版本号的命名遵循语义化版本2.0.0规范，格式为: 主版本号.次版本号.修订号，通常情况下，修改主版本号是做了大的功能性的改动，修改次版本号是新增了新功能，修改修订号就是修复了一些bug

如果某个版本的改动较大，并且不稳定，可能如法满足预期的兼容性需求，就需要发布先行版本，先行版本通过会加在版本号的后面，通过“-”号连接以点分隔的标识符和版本编译信息: 内部版本(alpha)、公测版本(beta)和候选版本(rc，即release candiate) 可以通过以下命令来查看npm包的版本信息，以react为例: 

<br>

### Package.json描述信息
```s
https://mp.weixin.qq.com/s/csGiBBvsZLI76yrXjD6NGg


https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651593923&idx=2&sn=e2a7ebb51fbd094ab26e1f34d20a9835&chksm=8022cb02b7554214407d4b582fe753fb0b287f826577042895df61ae7af4c79c169a280746cb&scene=21#wechat_redirect

https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651578863&idx=1&sn=016ae8c898da4590fd3e220f822090bb&chksm=8025362eb752bf385a2396cafad9f31e0356b0ab7243196a61ffb48b2c62f58029a455134b73&scene=21#wechat_redirect


https://www.cnblogs.com/tzyy/p/5193811.html 
# 这个很全呀

https://docs.npmjs.com/cli/v8/using-npm/config
# 这个很权威呀

# 这个可以先看看
https://blog.csdn.net/duansamve/article/details/122644111


# 从这个开始看 看前3个链接 就能有不小的收获
https://www.google.com/search?q=package.json+scripts+%E7%B4%B9%E4%BB%8B&oq=package.json+scripts+%E7%B4%B9%E4%BB%8B&aqs=chrome..69i57j33i160l3.11724j0j15&sourceid=chrome&ie=UTF-8

https://qiita.com/mysticatea/items/12bb6579b9155fd74586
https://ics.media/entry/12226/
https://dev.classmethod.jp/articles/be-on-the-same-page-by-using-npm-scripts/
```


<br><br>

# Npm Node Package Manager
世界上最大的开源生态系统
绝大多数js的相关的包都存放在了npm上, 这样做的目的就是为了让开发人员更方便的去下载使用

它的作用就相当于360安全卫士里的软件管家

<br>

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

**查看最新版本:**  
```
npm view react version
```

<br>

**查看所有版本:**  
```
npm view react versions
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

**参数:**  
- -S: 相当于 追加了 --save, **开发和上线**都需要的第三方包
- -D: 相当于 追加了 --save-dev, **仅在开发阶段**需要的第三方包

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

# package 中的版本符号

### 指定版本: 1.2.2

**格式:**  
大版本.次要版本.小版本

<br>

### 波浪号: ~指定版本: ~1.2.2
安装 1.2.x 的最新版本 不低于 1.2.2, 也就是说**安装时不改变大版本号和次要版本号**
```
version >=1.2.2 && version < 1.3.x
```

<br>

### ^号: ^指定版本: ^1.2.2
安装 1.x.x 的最新版本 不低于 1.2.2, 也就是说**安装时不改变大版本号**
```
version >=1.2.2 && version < 1.x.x
```

需要注意的是，如果大版本号为0，则号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

<br>

### 推荐使用:  ~
只会修复版本的bug，比较稳定

使用^ ，有的小版本更新后会引入新的问题导致项目不稳定，


<br><br>

# npm包的修复策略

## 方式1: npm outdated 方式
小版本 更新依赖的时候使用的

### 项目下的包的 版本状态
该命令仅会检查 次要版本下 的最新版本是什么
```js
npm outdated
```

Current : 当前版本   
Wanted : 当前次要版本下的最新版本
Latest : 最新版本  
Location : 位置  

<br>

上述检查完后 我们可以使用 下面的命令更新所有过时的包  
该命令不会进行大版本的更新 比如 3 - 4 就不会更新
```js
npm update
```

npm update 指定的包
```js
// 更新前
Package       Current   Wanted   Latest  Location
css-loader      3.4.2    3.6.0    6.7.2  test
lodash         4.17.4  4.17.21  4.17.21  test
style-loader    1.1.3    1.3.0    3.3.1  test
webpack-cli    3.3.12   3.3.12    5.0.0  test


// 更新后
Package       Current  Wanted  Latest  Location
css-loader      3.6.0   3.6.0   6.7.2  test
style-loader    1.3.0   1.3.0   3.3.1  test
webpack-cli    3.3.12  3.3.12   5.0.0  test
```


## 什么是 npm audit
npm audit 是 npm6 新增的一个命令 可以允许开发人员分析复杂的代码 并查明特定的漏洞  
在项目中更新或者下载新的依赖包之后自动运行，如果你在项目中使用了具有已知安全问题的依赖，就收到官方的警告通知。

audit需要分析 package.json 和 package-lock.json 文件 想要使用该命令一定要有 这两个文件

<br>

## npm audit 命令
执行该命令后 如果有已知的漏洞 则会展示该漏洞的信息

|High|Inefficient Regular expression complexity in nth-check|
|:--|:--|
|package|nth-check|
|patched in|>=2.0.1|
|Dependency of|@ok|
|path|xxx|
|more info|https://|

我们可以看到 信息中包括了 漏涉及的问题 危险等级

Dependency of: 所在依赖包
path: 依赖包的依赖层级
more info: 详细信息

<br>

## npm audit 相关命令
```js
// 获取项目 依赖项 的安全信息 详情
npm audit


// 以 JSON对象的形式 打印详情
npm audit --json


// 扫描项目漏洞 并把不安全的依赖项自动更新到兼容性版本 (小版本)
// 升级到最新且已修复的版本!!!! 比如 4.1.1 有问题 4.1.2 修复 4.1.9最新 那么会升级到 4.1.9
npm audit fix

// 在不修改 node_modules 的情况下执行 audit fix，仍然会更改 pkglock
npm audit fix --package-lock-only

// 跳过更新 devDependencies
npm audit fix --only=prod

// 强制执行 audit fix 安装已修复的最新的依赖项(大版本升级的时候使用)
npm audit fix --force

// 单纯的获取 audit fix 会做的事，并以 json 格式输出。
npm audit fix --dry-run --json

// 安装单个包关闭安全审查: 
npm install example-package-name --no-audit

// 安装所有包关闭安全审查 - 运行 
npm set audit false
// 手动将 ~/.npmrc 配置文件中的 audit 修改为 false
```

<br>




<br>


<br>

## npm audit fix 修复策略

### 情况1: 没锁定版本 ^4.17.4

1. 我们安装了一个 具有安全漏洞的 lodash@4.17.4 版本
```js
"dependencies": {
  "lodash": "^4.17.4"
}
```

<br>

有问题的是 ^4.17.4  
没问题的是 4.17.21

<br>

2. 运行 npm audit 查看报告  
控制台会给出建议 让我们运行 npm install lodash@4.17.21 安装已经修复安全漏洞的版本

由于 package 中使用的是 ^4.17.4 所以它的修复范围是 4.17.4 ~ 4.17.21  
那么实际上 npm audit fix 执行的逻辑就是 npm update lodash@4.17.21

可以看到实际上就是升级到了 4.17.21，由此可以知道，npm audit fix 的策略就是升级到已修复版本。  
但是由于4.17.21已经是 lodash 的最大版本，因此还得确定到底是该命令到底将依赖包升级到了修复版，还是最新版

后续找到一个 lodash 4.10.0版本漏洞，4.10.11版本被修复的漏洞条目，用来测试升级版本规律，然后本地安装 lodash 4.10.0 版本，运行 npm audit fix ，发现修复后，包版本变为了4.17.21，而不是 4.10.11，由此得知，**npm audit fix 的策略就是升级到最新且已修复的版本**，而不是被修复的那一版。

<br>

### 情况2: 锁定版本 4.17.4
1. 再次通过 npm i lodash@4.17.4 安装回含漏洞版本，将当前版本锁住
2. 运行 npm audit fix ，查看效果，可以看到锁住之后，还是会升级到修复版本

也就是说 锁定版本的情况下 仍然会升级到 4.17.21

<br>

### 情况3: 大版本升级测试 3.10.1
1. 通过 npm i lodash@3.10.1 安装 lodash 3.10.1 版本依赖包，然后运行 npm audit 查看  
当大版本出现问题的时候 可以看到相比之前多了一条警告，显示这个包可能是一个breaking changes(重大更改)， 对比一下之前安装 loadsh 4.12.4 版本的 npm audit 报告

semver warning recommended action is a potentially breaking change

2. 接下来运行 npm audit fix 查看报告  
可以看到 npm audit fix 对有报警信息的条目此就无能为力了，**并且会建议使用 npm audit fix --force，或者手动升级。**  
也就是说 当大版本升级的时候 需要使用 npm audit fix --force


综上所述，可以确定，如果涉及到依赖包的大版本升级，npm audit 会出示一条报警信息，且阻止 npm audit fix 进行自动修复，并建议手动升级或运行 npm audit fix --force




