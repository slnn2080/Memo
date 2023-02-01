# 学习路线:
Maven -> SSM -> 做项目 -> 学习分布式中间件等技术 SpringBoot SpringCloud Redis Nginx 消息队列 -> 分布式项目

<br><br>

# Maven的应用场景

**1. 开发过程:**   
我们在开发的过程中就需要使用 Maven的本地仓库 帮助我们管理jar包 然后我们通过依赖的方式 将jar包导入我们的项目中

<br>

**2. 自动部署:**    
在配置持续集成的时候 我们会将我们的代码推送到git远程仓库 然后远程仓库出发钩子 通知持续集成Jenkins工具

Jenkins再来调用Maven执行构建过程生成war包, 在有了war后Jenkins会调用事先准备好的脚本程序 把我们的war包部署到docker实例

如果有很多的docker实例, 那我们还可以使用 **Kubernetes** 来进行统一的管理 实现动态的扩容 缩容的效果

<br>

**3. 私有仓库**  
有些公司会开发一些公共的组件 这些公共的组件是以jar包的形式 供给大家来使用

但是这些jar包并没有发布到中央仓库或第三方仓库中 怎么进行发布和统一的引入 我们可以借助 Nexus私服 相当于我们能自己搭建了一个Maven仓库

<br><br>

# Maven学习原因:

## 1. Maven作用依赖管理工具

### 1. Jar包的规模:
随着我们使用越来越多的框架, 或者框架封装程度越来越高, 项目中使用的jar包也越来越多。项目中, 一个模块里面用到上百个jar包是非常正常的。

<br>

### 2. Jar包的来源:
- 这个jar包所属技术的官网。官网通常是英文界面, 网站的结构又不尽相同, 甚至找到下载链接还发现需要通过特殊的工具下载。

- 第三方网站提供下载。问题是不规范, 在使用过程中会出现各种问题。
  - jar包的名称
  - jar包的版本
  - jar包内的具体细节

而使用 Maven 后, 依赖对应的 jar 包能够**自动下载**, 方便、快捷又规范。

<br>

### 3. Jar包之间的依赖关系
框架中使用的 jar 包, 不仅数量庞大, 而且彼此之间存在错综复杂的依赖关系。依赖关系的复杂程度, 已经上升到了完全不能靠人力手动解决的程度。另外, jar 包之间有可能产生冲突。进一步增加了我们在 jar 包使用过程中的难度。

而实际上 jar 包之间的依赖关系是普遍存在的, 如果要由程序员手动梳理无疑会增加极高的学习成本, 而这些工作又对实现业务功能毫无帮助。

而使用 Maven 则几乎不需要管理这些关系, 极个别的地方调整一下即可, 极大的减轻了我们的工作量。

<br><br>

## 2. Maven作为构建管理工具
我们的Java程序一定有一个源程序, 也就是第一个Java类, 它要是想运行一定需要经过编译 将该Java文件编译成class字节码文件才能够运行

编译就是构建操作的一个环节, 如果我们写的是一个web工程的话 除了要对Java的源程序进行编译 还需要将这个web工程打成一个war包 将war包部署到Tomcat上面 将Tomcat跑起来才能运行一个web工程

也就是说 编译 打包 部署 都属于构建操作中的

<br>

### 1. 你没有注意过的构建
你可以不使用 Maven, 但是构建必须要做。当我们使用 IDEA 进行开发时, 构建是 IDEA 替我们做的

**IDEA工程中的目录结构:**
```
| - src
  | - com.sam.demo
    - Person

| - web
  | - WEB-INF
  - index.jsp
```

<br>

**IDEA中启动Tomcat后的部署目录:**  
当启动Tomcat服务器后 会出现 out 文件目录

我们编译好的字节码文件在 classes 目录下, 我们真正在Tomcat上运行的事 pro01~ 这个目录, 我们放在Tomcat上的war里面的结构 就是pro01~ 这个目录中的结构

```
| - out
  | - artifacts
    | - pro01_common_web_project_war_exploded
      | - WEB-INF
        | - classes
          | - com.sam.demo
            - Person.class
          - web.xml
        - index.jsp 
```

将war放在Tomcat中就属于构建的操作, 上面还属于本地开发

<br>

### 2. 脱离IDE环境仍需要构建:
![项目的开发周期](./imgs/项目的开发周期.png)

<br>

**持续集成:**  
我们本地编码 然后 本地测试 没有问题后 我们会推送到 git远程库上

然后触发钩子程序 只要有新的代码推送到远程库就会触发该钩子程序

钩子程序就会通知持续集成的工具 持续集成的工具就会调用Maven帮我们编译 打包 部署 到Docker中 然后Docker通过k8s将很多Docker管理起来 **这就是动态的扩容缩容的效果**

访问高峰期的时候 k8s就能迅速创建多个Docker容器, 分担负载, 高峰期之后Docker容器就会释放掉

<br>

而IDEA能帮到我们的仅仅是在本地开发的部分 当我们脱离本地环境 项目要上线的时候 就没有人继续帮助我们了

<br>

### 3. 总结:
- 管理规模庞大的jar包 需要专门的工具
- 脱离IDE环境之后执行构建操作的时候 也需要专门的工具

<br><br>

# 什么是Maven
Maven 是 Apache 软件基金会组织维护的一款专门为 Java 项目提供构建和依赖管理支持的工具。

这个部分我们主要说说构建和依赖的意思

<br>

## 1. 构建
Java 项目开发过程中, 构建指的是**使用原材料生产产品的过程**

**原材料:**  
- Java源代码
- 基于 HTML 的 Thymeleaf 文件
- 图片
- 配置文件
- ...

<br>

**产品:**  
一个可以在服务器上运行的项目

<br>

### 构建过程包含的主要的环节:
- 清理: 删除上一次构建的结果, 为下一次构建做好准备
- 编译: Java源程序编译成 *.class 字节码文件
- 测试: 运行提前准备好的测试程序(Maven也是使用junit进行测试的)
- 报告: 针对刚才测试的结果生成一个全面的信息
- 打包:
  - Java工程:jar包
  - Web工程:war包

- 安装:  
把一个 Maven 工程经过打包操作生成的 jar 包或 war 包存入 Maven 仓库

- 部署: 将准备好的jar包货war包部署到服务器上运行
  - 部署 jar 包:把一个 jar 包部署到 Nexus 私服服务器上
  - 部署 war 包:借助相关 Maven 插件（例如 cargo）, 将 war 包部署到 Tomcat 服务器上

<br><br>

## 2. 依赖
如果 A 工程里面用到了 B 工程的类、接口、配置文件等等这样的资源, 那么我们就可以说 A 依赖 B。

**例如:**
- junit-4.12 依赖 hamcrest-core-1.3
- thymeleaf-3.0.12.RELEASE 依赖 ognl-3.1.26
  - ognl-3.1.26 依赖 javassist-3.20.0-GA
- thymeleaf-3.0.12.RELEASE 依赖 attoparser-2.0.5.RELEASE
- thymeleaf-3.0.12.RELEASE 依赖 unbescape-1.1.6.RELEASE
- thymeleaf-3.0.12.RELEASE 依赖 slf4j-api-1.7.26

<br>

### 依赖管理中要解决的具体问题:
- jar 包的下载:使用 Maven 之后, jar 包会从规范的远程仓库下载到本地
jar 包之间的依赖:通过依赖的传递性自动完成
- jar 包之间的冲突:通过对依赖的配置进行调整, 让某些jar包不会被导入

<br><br>

## Maven的工作机制:
![Maven的工作机制](./imgs/Maven的工作机制.png)

<br>

我们从 Maven核心程序 开始看, 以后我们要是创建一个工程就是创建一个Maven工程, 我们自己创建的工程之间也可以创建依赖关系

我们还可以将自己创建的工程安装到自己的Maven本地仓库里面

我们工程中用到的第三方的jar包 就可以依赖于Maven本地仓库中jar包, 如果本地没有 则它会联网到远程库下载

<br>

**Maven核心程序:**  
Maven核心程序负责整体的调度, 具体干活的是Maven的插件 我们每下一个Maven的命令就是调用Maven的一个插件

<br>

### Maven仓库中存放着什么？
里面存放的东西一般是3类
1. 我们自己创建的工程的jar包
2. 我们依赖的框架或第三方库的jar包
3. Maven核心程序需要用到的插件的jar包

<br><br>

## 安装Maven核心程序

### 1. Maven核心程序解压与配置

**下载 Maven核心程序:**  
```s
maven.apache.org

# 下载页面
https://maven.apache.org/download.cgi
```

然后我们找到 Files 标题处, 我们从表格里面选择一个下载:
- tar.gz: 是Linux用的
- .zip: 是windows系统用的
- src.zip: 看源码用的

<br>

**解压下载的 Maven压缩包:**  
核心程序压缩包:apache-maven-3.8.4-bin.zip, 解压到非中文、没有空格的目录。例如:

将文件夹的名字重命名为: Maven-3.8.5, 并放入到 资源库/Library/Maven下

```
| - 任意目录
  | - bin
  | - boot
  | - conf
    - settings.xml

  | - lib
```

在解压目录中, 我们需要着重关注 Maven 的核心配置文件:conf/settings.xml

<br>

### 2. 配置Maven环境变量

**Mac:**  
打开终端, 输入命令
```
vim ~/.bash_profile
```

<br>

打开.bash_profile之后, 按下i键, 进行配置如下, 按下esc, 退出编辑状态, 输入:wq!, 退出文件
```s
#maven 注意这里的目录
export MAVEN_HOME=/Library/Maven-3.8.7
export PATH=$MAVEN_HOME/bin:$PATH
```

<br>

在终端执行生效命令: 
```
source ~/.bash_profile
```

<br>

然后执行命令:   
如果显示maven的版本等信息, 如下图, 表示配置成功。
```
mvn -v
```

<br>

### 配置本地仓库:
打开安装好的maven目录 进入conf–>编辑settings.xml文件 修改``<localRepository>``

找到并修改``<localRepository>``, 最初是注释掉的, 取消注释就可以　

```xml
<localRepository>
  你想存放的本地仓库路径
</localRepository>

<!-- 如: -->
<localRepository>
  /Library/Maven-3.8.7/repo
</localRepository>
```

<br>

### 配置阿里云提供的镜像仓库:
Maven 下载 jar 包默认访问境外的中央仓库, 而国外网站速度很慢。改成阿里云提供的镜像仓库, 访问国内网站, 可以让 Maven 下载 jar 包的时候速度更快。配置的方式是

```xml
<mirrors>
  <mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Nexus aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
  </mirror>
</mirrors>
```

<br>

### 配置 Maven 工程的基础JDK版本:
如果按照默认配置运行, Java 工程使用的默认 JDK 版本是 1.5, 而我们熟悉和常用的是 JDK 1.8 版本。

修改配置的方式是:将 profile 标签整个复制到 settings.xml 文件的 profiles 标签内。

配置后我们再创建的Maven工程就是1.8起步的

```xml
<profile>
  <id>jdk-1.8</id>
  <activation>
  <activeByDefault>true</activeByDefault>
  <jdk>1.8</jdk>
  </activation>
  <properties>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
  <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
  </properties>
</profile>
```

<br><br>

# 使用Maven: 命令行环境下

## 概念:

### 坐标:

**数学中的坐标**
![数学中的坐标](./imgs/数学中的坐标.png)

```
  y
   ↑
 ↙   → 
z     x
```

使用 xyz 三个向量 作为空间的坐标系, 可以在空间中唯一的定位到一个点

<br>

**Maven中的坐标:**  
我们也是使用 3个向量 在 Maven的仓库 中**唯一的**定位到一个jar包

将相当于在java中我们会通过全类名的方法定位到一个类, 而在Maven的工程中我们是通过坐标(3个向量)定位到具体的一个jar包

<br>

**三个向量:**  

- groupId:公司或组织的id(域名)

- artifactId:一个项目或者是项目中的一个模块的 id(工程), 一个项目可能会包含很多的工程, 也就是说 artifactId表示工程(模块)

- version:版本号

<br>

### 三个向量的取值方式:
**groupId:**  
公司或组织域名的倒序, 通常也会加上项目名称
com.atguigu + 项目名称

例如:com.atguigu.maven

<br>

**artifactId:**  
模块的名称, 将来作为 Maven 工程的工程名

<br>

**version:**  
模块的版本号, 根据自己的需要设定

例如:
- SNAPSHOT: 表示快照版本, 正在迭代过程中, 不稳定的版本
- RELEASE: 表示正式版本

<br>

**示例:**

```java
// 相当于 项目
groupId:com.atguigu.maven
// 相当于 模块(工程)
artifactId:pro01-atguigu-maven
// 相当于 工程中具体的版本
version:1.0-SNAPSHOT
```

<br>

### 坐标和仓库中 jar 包的存储路径之间的对应关系
```xml
<groupId>javax.servlet</groupId>
<artifactId>servlet-api</artifactId>
<version>2.5</version>
```

上面坐标对应的 jar 包**在 Maven 本地仓库中的位置**

1. 我们先找到 Maven本地仓库根目录
2. 以.作为目录的层级, 一点点的找
3. artifactId + version 作为了jar包 文件名

```js
Maven本地仓库根目录\javax\servlet\servlet-api\2.5\servlet-api-2.5.jar
```

<br><br>

## 创建 Maven版的 Java工程
此章节是在纯命令行的环境下操作

<br>

### 工作空间:
我们创建一个文件夹来存放 一个个的Maven工程

我们要创建 Maven的工程, 每一个工程都会有一个目录, 而我们会创建好多的工程, 所以这些工程都需要放在一个 **工作空间** 中, 也就是说 我们有一个总目录来存放这些工程
 
**我们先在以后的3个目录:**  
1. Maven核心程序: 相当于 中军大帐
2. Maven本地仓库: 相当于兵营
3. 本地工作空间: 相当于战场
```
本地工作空间:
/Users/liulin/Desktop/Sam/Maven_workspace
```

<br>

### 命令行创建 Maven工程

**1. 进入Maven的工作空间:**  
```
cd /Users/liulin/Desktop/Sam/Maven_workspace
```

<br>

**2. 输入命令 创建Maven工程:**
```
mvn archetype:generate
```

**命令解析:**
- mvn: 主命令
- archetype:generate: 子命令

- archetype: 核心程序要调用的插件
- generate: 插件的目标

也就是我们用到了 archetype 插件 使用了它的 generate 目标, 一个插件有很多的目标, 插件和目标之间是使用:分开的

<br>

**当我们执行该命令后 会有创建内容的提示:**

1. 让我们选择 archetype 的一个值: 7是默认值 快速开始 我们选择默认值就可以

2. Define value for property "groupId": 项目名, 需要自己输入, 如 com.atguigu.maven

3. Define value for property "artifactId": 模块名, 需要自己输入, 如 pro01-maven-java

4. Define value for property "version": 直接回车 使用默认值

5. Define value for property "package": 直接回车 使用默认值

```
groupId: com.atguigu.maven 
artifactId: pro01-maven-java
version: 1.0-SNAPSHOT
package: com.atguigu.maven
```

我们有一个maven项目 下面有一个 pro01-maven-java , 该模块的版本为1.0-SNAPSHOT

<br>

上面的过程执行结束后会在 工作空间 中创建一个工程 它的目录结构如下:

```java
| - pro01-maven-java
  | - src

    | - main
      | - java
        | - com.sam.maven
          - App.java

      | - resources

    | - test
      | - java
        | - com.sam.maven
          - AppTest.java
  - pom.xml
```

<br>

### 调整刚才创建的 maven 项目
**打开 pom.xml 文件:**  

**调整1:**  
Maven 默认生成的工程, 对 junit 依赖的是较低的 3.8.1 版本, 我们可以改成较适合的 **4.12 版本**。

**自动生成的 App.java 和 AppTest.java 可以删除。**

<br>

**修改junit的版本:**
```xml
<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

<br><br>

## 解读: pom.xml
它是 Maven 的核心配置文件

### 要点:
**1. ``<project>`: 根标签`**  
表示对当前的工程进行配置

<br>

**2. ``<modelVersion>``**  
从 Maven2大版本开始 固定就是 4.0.0

表示当前pom.xml所采用的标签结构, 我们不会修改该标签

<br>

**3. 坐标信息:**  
我们创建工程的时候 指明的信息

- groupId: 代表公司或组织开发的某一个项目 下面就是maven项目

- artifactId: 项目下的某一个模块(工程)

- version: 表示当前模块的版本

- packaging: 当前maven工程打包的方式, 默认会采用 jar 方式对当前的maven项目打包
  - jar: 生成 jar 包, 说明这是一个Java工程
  - war: 生成 war 包, 说明这是一个web工程
  - pom: 说明这个工程是用来管理其它工程的工程

```xml
<groupId>com.sam.maven</groupId>
<artifactId>pro01-maven-java</artifactId>
<version>1.0-SNAPSHOT</version>

<!-- 我们创建出来的工程里没有这个标签 -->
<packaging>jar</packaging>
```

<br>

**4. ``<properties>``:**  
在Maven中定义属性值
标签是属性名, 标签体是属性值

```xml
<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

key: project.build.sourceEncoding
val: UTF-8
```

<br>

**5. ``<dependencies>``:**  
配置具体的依赖信息 每一个依赖的格式如下:

我们将一个jar包的坐标放进dependency里面 我们的工程就依赖上了该jar, Maven就会导入这个坐标对应的jar包
```xml
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.12</version>

  <!-- 配置当前依赖(生效)的范围 -->
  <scope>test</scope>
</dependency>
```

<br>

我们可以在这里修改 Maven 给我们提供的属性对应的值 也可以设置 和 修改我们自定义的属性和值

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.sam.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>

  <name>pro01-maven-java</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <!-- 
      构建过程中 读取源码时使用的字符集
     -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <!-- clean lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#clean_Lifecycle -->
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- default lifecycle, jar packaging: see https://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_jar_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-jar-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
        <!-- site lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#site_Lifecycle -->
        <plugin>
          <artifactId>maven-site-plugin</artifactId>
          <version>3.7.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-project-info-reports-plugin</artifactId>
          <version>3.0.0</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
```

<br><br>

## Maven核心概念: POM

### 概念:
POM:Project Object Model, **项目对象模型**。

和 POM 类似的是:DOM（Document Object Model）, 文档对象模型。

它们都是模型化思想的具体体现。

对于我们应用程序来说现实世界中的东西想放入程序中进行操作 实现的方式就是将现实世界的东西封装成模型 封装成模型以后 就方便我们在程序中将其创建为对象

<br>

这里就是将 Maven工程这个项目封装成了一个模型, 在程序中用对象将其体现出来 我们就可以使用程序的方式进行管理和操作了

<br>

### 模型化思想:
POM 表示将工程抽象为一个模型, 再用程序中的对象来描述这个模型。这样我们就可以用程序来管理项目了。

我们在开发过程中, 最基本的做法就是将现实生活中的事物抽象为模型, 然后封装模型相关的数据作为一个对象, 这样就可以在程序中计算与现实事物相关的数据。

<br>

### 对应的配置文件:
POM 理念集中体现在 Maven 工程根目录下 pom.xml 这个配置文件中。

所以这个 pom.xml 配置文件就是 Maven 工程的核心配置文件。

其实学习 Maven 就是学这个文件怎么配置, 各个配置有什么用

<br>

## Maven工程的目录结构:
```java
| - pro01-maven-java

  | - src: 源码目录

    | - main: 主体程序目录
      | - java: Java源代码
        | - com.sam.maven: package目录
          - App.java

      | - resources: 配置文件目录

    | - test
      | - java
        | - com.sam.maven
          - AppTest.java
  - pom.xml
```

另外还有一个 target 目录 专门存放构建操作输出的结果

<br>

上述的目录不是随意创建了 需要遵守 Maven 里的规则, 这也是**约定的目录结构**

<br>

### 约定目录结构的意义:
Maven 为了让构建过程能够尽可能自动化完成, 所以必须约定目录结构的作用。

例如:  
Maven 执行编译操作, 必须先去 Java 源程序目录读取 Java 源代码, 然后执行编译, 最后把编译结果存放在 target 目录

<br>

### 约定大于配置
Maven 对于目录结构这个问题, 没有采用配置的方式, 而是基于约定。这样会让我们在开发过程中非常方便。

如果每次创建 Maven 工程后, 还需要针对各个目录的位置进行详细的配置, 那肯定非常麻烦。

目前开发领域的技术发展趋势就是:**约定大于配置, 配置大于编码**

<br>

**扩展: 开发的三个层次**  
有的事是必须通过写代码来实现的 但有的事儿我们可以通过配置来实现 

特别是我们使用了框架后 很多事我们都是通过配置来实现 当我们的框架封装的程度再深的话 那么有的事情连配置都不需要了

大家共同遵守下我们实现做好的约定 这样连配置都省略了

所以我们从 编码 -> 配置 -> 约定 这是一个代码越来越简化 我们使用的框架封装的层次越来越深

我们可以将约定理解为默认的配置 这些配置如果没有特殊需要就不用配了

这也是我们开发领域的技术发展趋势

<br><br>

## 准备: 在Maven工程中添加Java类
我们在这个章节主要实现在Maven工程中添加Java类 方便于我们使用Maven进行构建

```java
| - pro01-maven-java

  | - src

    | - main
      | - java
        | - com.sam.maven

          // 添加Java类
          - Calculator.java

      | - resources

    | - test
      | - java
        | - com.sam.maven

          // 添加Java测试类
          - CalculatorTest.java
  - pom.xml
```

### 主体程序:
我们的Java程序如果放在 main 目录下, 该程序就是主体程序 它指被测试的程序 同时也是将来在项目中真正要使用的程序

我们在现在这个项目下添加如下的两个Java类

<br>

**编写 Calculator 类的内容:**  
```java
package com.sam.maven;

public class Calculator {
	
	public int sum(int i, int j){
		return i + j;
	}
	
}
```

<br>

**编写 CalculatorTest 类的内容:**

```java
package com.sam.maven;

import org.junit.Test;
import com.sam.maven.Calculator;
	
/*
  静态导入:
    将 org.junit.Assert 这个类 以静态的方法导入进来
    那么该类中使用 static 声明的结构 就像在当前类中声明的一样 
    
    我们再引用org.junit.Assert这个类的静态资源的时候 不需要写类名 直接调用就可以了
*/
import static org.junit.Assert.*;
	
public class CalculatorTest{
	
	@Test
	public void testSum(){
		
		// 1.创建Calculator对象
		Calculator calculator = new Calculator();
		

		// 2.调用Calculator对象的方法, 获取到程序运行实际的结果
		int actualResult = calculator.sum(5, 3);
		
		// 3.声明一个变量, 表示程序运行期待的结果
		int expectedResult = 8;
    

    /*
      assertEquals()该方法就是 Assert 类中静态的方法 因为我们静态导入了该类中的结构

      所以我们可以不创建 Assert类对象 就可以直接使用该方法
    */
		// 4.使用断言来判断实际结果和期待结果是否一致
		// 如果一致:测试通过, 不会抛出异常
		// 如果不一致:抛出异常, 测试失败
		assertEquals(expectedResult, actualResult);
	}
}

```

<br><br>

## 执行 Maven 的构建命令

### 要点:
**运行 Maven 中和构建操作相关的命令时, 必须进入到 pom.xml 所在的目录。**

如果没有在 pom.xml 所在的目录运行 Maven 的构建命令, 那么会看到下面的错误信息:
```java
The goal you specified requires a project to execute but there is no POM in this directory
```

``mvn -v`` 命令和构建操作无关, 只要正确配置了 PATH, 在任何目录下执行都可以。

**而构建相关的命令要在 pom.xml 所在目录下运行, 就是进入 工作空间目录/工程目录 中**

**操作哪个工程, 就进入这个工程的 pom.xml 目录后再使用 Maven相关的命令**

<br>

### 清理操作:
删除 target 目录
```
mvn clean
```

<br>

### 编译操作:
```java
// 对 主程序进行编译:
mvn compile

// 对测试程序编译:
mvn test-compile
```

<br>

当编译后, 会在当前工程下 自动创建 target目录

<br>

**主体程序编译结果存放的目录:**
```
target/classes
```

<br>

**测试程序编译结果存放的目录:**
```
target/test-classes
```

<br>

**注意:**  
每当源程序有更改的时候 需要重新编译

<br>

### 测试操作:
测试的报告存放的目录: target/surefire-reports
```
mvn test
```

当我们执行该命令后 maven就会执行测试类中的测试方法

<br>

**测试报告:**  
测试报告存放在 target/surefire-reports 下

<br>

### 打包操作:
打包的结果会在target目录下生成 jar 包

- Java工程打jar包  
- Web工程打war包

jar包名是 artifactId + version

<br>

**注意:**  
执行打包命令的时候 会自动进行测试, 项目只有测试成功后才会进行打包

测试程序不会包含在Jar包中

```
mvn package


| - target
  - pro01-maven-java-1.0-SNAPSHOT.jar
```

<br>

### 安装操作:
安装操作指的是 将我们打包操作后生成的jar包 保存到 本地Maven仓库中

```java
mvn install

// 组合指令, 确保源码是最新的情况下再编译测试打包的
mvn clean install
```

安装的效果是将本地构建过程中生成的 jar 包存入 Maven 本地仓库。这个 jar 包在 Maven 仓库中的路径是根据它的坐标生成的。

```xml
<!-- 坐标信息 -->
<groupId>com.atguigu.maven</groupId>
<artifactId>pro01-maven-java</artifactId>
<version>1.0-SNAPSHOT</version>
```

<br>

在 Maven 仓库中生成的路径如下:
```
/Library/Maven-3.8.7/repo/com/sam/maven/pro01-maven-java/1.0-SNAPSHOT
```

另外, 安装操作还会将 pom.xml 文件转换为 XXX.pom 文件一起存入本地仓库。

所以我们在 Maven 的本地仓库中想看一个 jar 包原始的 pom.xml 文件时, 查看对应 XXX.pom 文件即可, 它们是名字发生了改变, 本质上是同一个文件。

<br><br>

## 创建 Maven版的 Web工程
此章节是在纯命令行的环境下操作

<br>

使用 ``mvn archetype:generate`` 命令生成 Web 工程时, 需要使用一个专门的 archetype。

这个专门的 archetype 需要通过参数的方式根据坐标来指定

-D参数: 就是用来传递参数的 它跟根据参数没有空格 多个参数使用 空格隔开 如: -D参数 -D参数 -D参数

<br>

**固定指令:**  
不用修改 直接复制使用
```java
mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeVersion=1.4
```

<br>

**Web工程的目录结构:**  
```java
| - pro02-maven-web
  | - src

    | - main
      | - java: 没有, 可以自行创建

      | - webapp
        | - WEB-INF
          - web.xml
        - index.jsp

    | - test: 没有, 可以自行创建

  - pom.xml
```

<br>

**pom.xml:**  
```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.sam.maven</groupId>
  <artifactId>pro2-maven-web</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <name>pro2-maven-web Maven Webapp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <!-- 源码的字符集 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <finalName>pro2-maven-web</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.2.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>

```

<br>

**注意:**  
该方式创建的 web.xml 的版本很低 首行声明标签的版本很低 我们可以复制web工程下web.xml来使用

<br><br>

## 准备: 在Maven的Web工程中添加代码
该环节是为了以后 编译 测试 打包 安装到本地仓库等一系列的操作使用的

<br>

### 创建 Servlet 程序
```java
| - pro02-maven-web
  | - src

    | - main
      | - java
        | - com.sam.maven
          - HelloServlet.java

      | - webapp
        | - WEB-INF
          - web.xml

        - index.jsp

    | - test: 没有, 可以自行创建

  - pom.xml
```

<br>

**Servlet程序:**  
```java
package com.sam.maven;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
	
public class HelloServlet extends HttpServlet{
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().write("hello maven web");
		
	}
	
}
```

<br>

**配置web.xml**  
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

  <servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.sam.maven.HelloServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/helloServlet</url-pattern>
  </servlet-mapping>
</web-app>
```

<br>

**index.jsp文件:**  
```jsp
<html>
<body>
<h2>Hello World!</h2>
<a href="helloServlet">Access Servlet</a>
</body>
</html>
```

<br>

### 配置工程对 某jar包 的依赖
Maven工程里面要是手动添加项目所需要的依赖的话, 需要在pom.xml中配置

<br>

**示例描述:**
当我们准备好了上述的代码后 我们进入工程根路径(有pom.xml的目录) 执行maven的编译操作 ``mvn compile`` 会报错


**报错信息如下:**
```
DANGER

程序包 javax.servlet.http 不存在

程序包 javax.servlet 不存在

找不到符号

符号: 类 HttpServlet
```

上面的错误信息说明:我们的 Web 工程用到了 HttpServlet 这个类, 而 HttpServlet 这个类属于 servlet-api.jar 这个 jar 包。

此时我们说, Web 工程需要依赖 servlet-api.jar 包。

也就是说我们要在 pom.xml 配置文件中 添加 需要依赖的jar包信息, 该jar包的具体信息我们可以通过下面的网址进行查看

```xml
 <dependency>
  <groupId>xxx</groupId>
  <artifactId>xxx</artifactId>
  <version>xxx</version>
  <scope>xxx</scope>
</dependency>

<!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.1.0</version>
  <scope>provided</scope>
</dependency>
```

```s
https://mvnrepository.com/
```

如我们在该网站的搜索框里面 搜索 servlet-api, 结果集中会列出很多 这时我们需要自己判断我们需要的是哪个

找到依赖后 我们需要选择指定的版本 我们可以观察 Usages列 看看哪些下载的多

进入后就有 ``<dependency>`` 所需要的信息

然后配置到 pom.xml 文件中

<br>

### 编译 Web工程
进入到 pro02 的web项目后, 我们运行编译的命令

```
mvn clean compile
```

在编译的过程中会下载项目中所需要的jar包

<br>

### 打包 Web工程
web工程的话 对应会打成 war 包
```
mvn clean package
```

<br>

**打包结果:**  
1. web项目会生成一个war包
2. 同时会生成一个war包解压后的结果 

然后该war包需要部署到Tomcat中跑起来

<br>

### 将上述的war部署到 Tomcat上
我们将 war包 或者 war包对应的解压目录 丢到Tomcat上都是可以的 war包会自动解压  

```
| - webapps
  | - maven_web: 我们打包后的资源
```

我们进入到 Tomcat8/bin 执行 sudo ./startup.sh 进行 localhost:8080/maven_web 观察页面

<br><br>

## 让 Web工程依赖Java工程
前面我们的项目也有依赖 依赖了junit 和 servlet-api 这里我们依赖一个自己开发的工程

也就是说让我们的上面定义的web工程依赖上面定义的Java工程

<br>

### 观念:
明确一个意识, 从来只有 Web 工程依赖 Java 工程, 没有反过来 Java 工程依赖 Web 工程。

本质上来说, Web工程依赖 的 Java工程其实就是 Web 工程里导入的 jar 包。

将来web工程在运行的时候是一个war包 而web工程依赖的java工程就会变成war包中的一个jar包

**最终 Java 工程会变成 jar 包, 放在 Web 工程的 WEB-INF/lib 目录下**

<br>

将来web工程在运行的时候是一个war包 而web工程依赖的java工程就会变成war包中的一个jar包

<br>

### 实现:
在 pro02-maven-web 工程的 pom.xml 中, 找到 dependencies 标签, 在 dependencies 标签中做如下配置:

**配置对Java工程pro01-maven-java的依赖:** 
```xml
<dependency>
  <groupId>com.sam.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>

  <!-- scope可选, 要写的话值为compile 默认值 -->
  <scope>compile</scope>
</dependency>
```

<br>

### 测试:
测试看看有没有依赖上Java工程, 看看能否在Web工程中应用到Java工程中的类

在没有maven的时候 这个操作是不行的, 我们看看在maven中有没有依赖上我们的Java工程

<br>

**1. 在Web工程中补充测试类**
```
| - pro02-maven-web
  | - src
    | - main
    | - test
      | - java
        | - com.sam.maven
          - 
```

<br>

**2. 在测试类中看看能否引用Java工程中的Calculator类**

Web工程测试类中的代码
```java
package com.sam.maven;

import org.junit.Test;
import com.sam.maven.Calculator;
	
import static org.junit.Assert.*;
	
public class CalculatorTest{
	
	@Test
	public void testSum(){
		
		Calculator calculator = new Calculator();
		int actualResult = calculator.sum(5, 3);
		int expectedResult = 8;
		assertEquals(expectedResult, actualResult);

    System.out.println("测试testSum()方法被调用了");
	}
}

```

<br>

**3. 执行测试命令: mvn test**  
回到 pro02 工程的根目录 执行命令

测试操作中会提前自动执行编译操作, 测试成功就说明编译也是成功的。

<br>

**4. 执行打包命令: mvn package**  
通过查看 war 包内的结构, 我们看到被 Web 工程依赖的 Java 工程确实是会变成 Web 工程的 WEB-INF/lib 目录下的 jar 包。

<br>

### 查看当前 Web 工程所依赖的 jar 包的列表
```
mvn dependency:list
```

```java
[INFO] The following files have been resolved:
    // 单元测试
    junit:junit:jar:4.11:test
    org.hamcrest:hamcrest-core:jar:1.3:test

    // servlet
    javax.servlet:javax.servlet-api:jar:3.1.0:provided

    // 自定义的Java工程
    com.sam.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile
```

<br>


**说明:**  
javax.servlet:javax.servlet-api:jar:3.1.0:provided

上面的格式显示的是一个 jar 包的坐标信息 主要的内容为:
```
groupId:artifactId:打包方式:version:依赖的范围
```

<br>

这样的格式虽然和我们 XML 配置文件中坐标的格式不同, 但是本质上还是坐标信息, 大家需要能够认识这样的格式, 将来从 Maven 命令的日志或错误信息中看到这样格式的信息, 就能够识别出来这是坐标。进而根据坐标到Maven 仓库找到对应的jar包, 用这样的方式解决我们遇到的报错的情况。

<br>

### 以树形结构查看当前 Web 工程的依赖信息
```
mvn dependency:tree
```

树形结构的显示信息中可以看到包之间的依赖关系

```
[INFO] com.atguigu.maven:pro02-maven-web:war:1.0-SNAPSHOT
[INFO] +- junit:junit:jar:4.12:test
[INFO] | \- org.hamcrest:hamcrest-core:jar:1.3:test
[INFO] +- javax.servlet:javax.servlet-api:jar:3.1.0:provided
[INFO] \- com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile
```

我们在 pom.xml 中并没有依赖 hamcrest-core, 但是它却被加入了我们依赖的列表。原因是:junit 依赖了hamcrest-core, 然后基于依赖的传递性, hamcrest-core 被传递到我们的工程了。

<br>

## pom.xml中依赖的范围
我们会通过 ``<dependency>`` 的 ``<scope>`` 来**设置当前依赖的作用范围**

```xml
<dependency>
  <groupId>com.sam.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>
  <scope>compile</scope>
</dependency>
```

<br>

### ``<scope>`` 的可选值:
这个章节中我们先说下 前3个的依赖范围

1. compile: 默认值
2. test
3. provided
4. system
5. runtime
6. import

compile是正常情况, 而2~6属于特殊情况, 也就说普通的依赖都是 compile, 当我们有特殊情况的时候再看 2 ~ 6

<br>

**测试说明:**  

**空间角度:**  
- 以compile方式引入的依赖, **能否在 main目录 下使用**

- 以compile方式引入的依赖, **能否在 test目录 下使用**

<br>

**时间角度:**  
 
- 开发过程:    
以compile方式引入的依赖 在IDE编辑器中能否通过.的形式 点出api 能点出来就是有效

- 部署到服务器:   
Web工程会打一个war包, 以compile方式引入的依赖 会不会参与打包, 如果参与了打包就说明该依赖会跟着war包一起部署到服务器上, 简单的说就是**会不会被打包到服务器**

<br>

**compile 和 test 对比:**  

||main目录(空间)|test目录(空间)|开发过程(时间)|部署到服务器(时间)|
|:--|:--:|:--:|:--:|:--:|
|compile|有效|有效|有效|有效|
|test|无效|有效|有效|无效|

<br>

**compile 和 provided 对比:**
||main目录(空间)|test目录(空间)|开发过程(时间)|部署到服务器(时间)|
|:--|:--:|:--:|:--:|:--:|
|compile|有效|有效|有效|有效|
|provided|有效|有效|有效|无效|

<br>

### 什么时候使用 这些可选值:

**compile:**  
主体功能里需要用到的东西都是 compile, 99%都是compile范围的

通常使用的第三方框架的 jar包 这些jar包在项目实际运行时是真正要用到的

所以都是以 compile 范围进行依赖的。比如 SSM 框架所需jar包。

<br>

**test:**  
测试过程中使用的 jar包, 以 test 范围依赖进来。这部分jar包不需要被部署到服务器

比如 junit

<br>

**provided(已提供的):**  
在开发过程中需要用到的 "服务器(Tomcat)上的 jar 包" 通常以 provided 范围依赖进来。

比如 servlet-api、jsp-api。这些jar包服务器上都有了 比如这两个就是tomcat自己提供的

而这个范围的 jar 包之所以不参与部署、不放进 war 包, 就是避免和服务器上已有的同类 jar 包产生冲突, 同时减轻服务器的负担。

**说白了就是:"服务器上已经有了, 你就别带啦！"**

<br><br>

## 依赖的传递性