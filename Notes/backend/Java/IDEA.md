# IDEA相关

### 创建模块(module):
我们在idea的工程下 右键 创建module

<br>

### 创建包:
```
src - 右键 创建 package 输入包名
  com.sam.java
```

<br>

### 创建类:
在包下右键创建 class 类

<br>

### 示例:
比如我们创建了一个 java_exer 的项目 这个项目下可以有很多的模块 
```java
| - java_exer
  | - module1
    | - src
      | - 创建package包
  | - module2
    | - src
      | - 创建package包

// 例如: 
java_idea_project
  day01
    src
      com.sam.java

  day02
    src
      com.sam.java
```

<br>

### IDEA 和 Eclipse 之间的关系:
在 **eclipse** 中我们有如下的两种概念:
- workspace(工作空间)
- project(工程)

<br>

在 **idea** 中我们有如下的两种概念:
- project
- moudule

<br>

``` 
eclipse中的 workspace 相当于
  idea中的 project

eclipse中的 project 相当于
  idea中的 moudule
```

<br>

idea中一个工程只能维护一个窗口 我们要是想再开启一个创建 相当于我们要重新再创建一个项目

但是一个工程下我们可以提供多个module

比如我们开发京东商城 一个京东商城就是一个项目 这个京东商城下面 有很多的模块
- 登录模块
- 秒杀模块

我们把一个项目打成很多的模块 把这些模块集成在一起构成整个的一个项目

<br>

小项目就无需搞得这么复杂 只有一个module的结构idea也是支持的 并且idea创建项目的时候 默认就是单模块的

<br>

### 删除模块:
删除模块的方式有两种:
1. 模块处右键 - open module setting - 点击减号
2. 模块处右键 - remove

最后 右键 delete

移除module的身份后 就是一个普通的文件目录了 右键的时候就有delete了

<br><br>

## IDEA常用配置

### idea设置:
idea - preferences

<br>

### 配置项:
```
| - Appearance & Behavior (外观和行为)

| - Keymap (快捷键)

| - Editor (编辑器)
  - 设置编辑区的主题 color scheme
  - http://www.riaway.com
  - 下载以后
  - file - import setting - 选中下载的主题jar文件 - 一路确认 - 重启

| - Plugins (插件)

| - Version Contorl (版本控制)

| - Build Execution Deployment (构建 执行 部署)

| - Languages && Frameworks (语言 架构)

| - Tools (工具集)

| - Advanced Setting
```

<br>

### 设置文档头部信息:
editor - file and code templates - includes

<br>

### File encodeings:
该配置在 Edite 下面 都选择 UTF-8

idea配置中(ctrl + ,) 
```
File Encodings 
  -> transparent native-to-ascii conversion
```

前面要打上对号 才能在配置文件中写中文 我们才能正常的读取

<br>

### Build - compiler:
都打上勾

<br><br>

## 快捷键
```s
https://www.cnblogs.com/zhaoyan001/p/7499235.html
```

<br>

- command + 7: 展示类中的方法

- psvm: main方法

- "hello".sout & sout

- 右键 run 运行

- command + d: 复制

- option + enter: 自动创建对象

- command + n: 创建构造器 重写方法 toString Test等

- command + alt + t: 包围代码块

- command + alt + u: 查看类的继承树

- control + h: 查看接口 类之间的继承关系

- command + option + b: 查看类的实现类

- control + option + r: run

- alt + shift + 上 / 下: 移动代码

- alt + enter: 引入类或提供给你选择的处理方法

- command + shift + enter: 补全分号

- command + alt + L: 格式化代码

- command + 空格: 代码提示

- command + alt + 空格: 类名或接口名提示

```java
Driver driver = null
// 我们在 Driver 上按下快捷键 可以看到该接口的实现类
```

<br><br>

```s
https://blog.csdn.net/m0_52191385/article/details/126628208
```