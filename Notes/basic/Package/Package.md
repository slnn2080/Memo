### Package
- 在每个前端项目中，都有package.json文件，它是项目的配置文件，常见的配置有配置项目启动、打包命令，声明依赖包等。package.json文件是一个JSON对象，该对象的每一个成员就是当前项目的一项设置

- 当我们搭建一个新项目时，往往脚手架就帮我们初始化好了一个package.jaon配置文件，它位于项目的根目录中。

- 当我们克隆一个新的项目到本地时，需要执行npm install（yarn install）命令来安装项目所需的依赖文件。当执行该命令时，就会根据package.json文件中的配置信息来自动下载所需的模块，也就是配置项目所需的运行和开发环境。


> 必须属性
- package.json中最重要的两个字段就是name和version，它们都是必须的，如果没有，就无法正常执行npm install命令。npm规定package.json文件是由名称和版本号作为唯一标识符的。


> name
- name很容易理解，就是项目的名称，它是一个字符串。在给name字段命名时，需要注意以下几点：
<!-- 
  名称的长度必须小于或等于214个字符，不能以“.”和“_”开头，不能包含大写字母（这是因为当软件包在npm上发布时，会基于此属性获得自己的URL，所以不能包含非URL安全字符（non-url-safe））；


  名称可以作为参数被传入require("")，用来导入模块，所以应当尽可能的简短、语义化；


  名称不能和其他模块的名称重复，可以使用npm view命令查询模块明是否重复，如果不重复就会提示404：
 -->


 > version
 - version字段表示该项目包的版本号，它是一个字符串。在每次项目改动后，即将发布时，都要同步的去更改项目的版本号。版本号的使用规范如下：

 <!-- 
  版本号的命名遵循语义化版本2.0.0规范，格式为：主版本号.次版本号.修订号，通常情况下，修改主版本号是做了大的功能性的改动，修改次版本号是新增了新功能，修改修订号就是修复了一些bug；


  如果某个版本的改动较大，并且不稳定，可能如法满足预期的兼容性需求，就需要发布先行版本，先行版本通过会加在版本号的后面，通过“-”号连接以点分隔的标识符和版本编译信息：内部版本（alpha）、公测版本（beta）和候选版本（rc，即release candiate）。

  可以通过以下命令来查看npm包的版本信息，以react为例：


  // 查看最新版本
  npm view react version

  // 查看所有版本
  npm view react versions
  -->


> 描述信息

- https://mp.weixin.qq.com/s/csGiBBvsZLI76yrXjD6NGg


- https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651593923&idx=2&sn=e2a7ebb51fbd094ab26e1f34d20a9835&chksm=8022cb02b7554214407d4b582fe753fb0b287f826577042895df61ae7af4c79c169a280746cb&scene=21#wechat_redirect

- https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651578863&idx=1&sn=016ae8c898da4590fd3e220f822090bb&chksm=8025362eb752bf385a2396cafad9f31e0356b0ab7243196a61ffb48b2c62f58029a455134b73&scene=21#wechat_redirect


- https://www.cnblogs.com/tzyy/p/5193811.html 
- 这个很全呀

- https://docs.npmjs.com/cli/v8/using-npm/config
- 这个很权威呀

- 这个可以先看看
- https://blog.csdn.net/duansamve/article/details/122644111


- 从这个开始看 看前3个链接 就能有不小的收获
- https://www.google.com/search?q=package.json+scripts+%E7%B4%B9%E4%BB%8B&oq=package.json+scripts+%E7%B4%B9%E4%BB%8B&aqs=chrome..69i57j33i160l3.11724j0j15&sourceid=chrome&ie=UTF-8

- https://qiita.com/mysticatea/items/12bb6579b9155fd74586
- https://ics.media/entry/12226/
- https://dev.classmethod.jp/articles/be-on-the-same-page-by-using-npm-scripts/
