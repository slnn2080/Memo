### Spring
> 概述:
->Spring是轻量级的开源的JavaEE的框架

> 轻量级: 
- 我们要是想用一个框架的话 必须安装框架所需要的jar包和依赖 有的框架要下很多的jar包 

- spring里面的jar数量比较少 体积小 不需要依赖额外其它的组件可以独立进行使用

> JavaEE的框架:
- 使用这个框架可以让我们开发更加的方便和间接 简化企业开发的复杂性 让开发更加的简洁

> Spring两个核心部分
- IOC:
  - 控制反转
  - 现在我们会将创建的过程交给 spring 来管理 spring帮我们去创建对象进行对象的实例化 不需要在通过 new 的方法来完成
  <!-- 
     之前我们要是创建一个对象 需要new一个类
   -->

- AOP:
  - 面向切面
  - 在不修改源代码的情况下 增强功能
  <!-- 
     比如我们要给一个程序添加 或者 扩展一个功能 按照原始的方式可能需要改变源代码进行实现
   -->

> spring特点
- 1. 方便解耦 简化开发
- 使用IOC可以让耦合性降低 创建对象和对象和对象之间的调用 都会让IOC来实现

- 2. AOP编程的支持

- 3. 方便程序的测试
- 不需要写完整的测试过程

- 4. 方便继承各种优秀的框架

- 5. 降低java api的使用难度 和 方便进行事务的操作
- 比如对jdbc进行了封装 

- 6. 可以学习spring源码 提高java的水平

----------------

### 入门案例:

> 1. 下载 spring5 相关的jar包
- https://spring.io/

- 选项卡:
- 查看稳定的版本:
- Projects - spring framework - learn - 5.2.6(*选择GA版本* 稳定版本)

- 下载步骤:
- 点击页面上的 githublogo
- https://github.com/spring-projects/spring-framework

- 下拉到 Access to Binaries 点击 a 连接 进入到下载的界面
- https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Artifacts

- 下拉到 downloading a distribution 点击a链接
- https://repo.spring.io/ui/

- 点击 Artifactory - Artifacts - 找到 release

  | - release
    | - org
      | - springframework
        | - spring

- 在 spring 界面 有一个 repository path 复制
- release/org/springframework/

- 将网址改成
- *https://repo.spring.io/ui/native/release/org/springframework/spring*

- 这也是最终的下载地址 找到稳定版 
- 我们这里选择跟老师一样的 5.2.6
- 下载: spring-5.2.6.RELEASE-dist.zip

> 2. 使用 idea 创建java工程

  - New Project
    - Java (使用 jdk1.8)

- 创建了一个 spring5_demo01


> spring5模块
<!-- 

            Data                    Web
      Access/Integration    WebSocket   WebMVC

        JDBC    ORM         Web         WebFlux
        OXM     JMS
       Transactions

------

      AOP     Aspects     Instrument      Messaging

------

      Core Container

  Beans   Core    Content   Expression


------

      Test

 -->

> 3. 导入 spring5 的相关jar包
- jar解析
- 每个jar包都分为
  - spring-aop-5.2.6.Release.jar  --- *我们使用这个*
  - spring-aop-5.2.6.Release-javadoc.jar  --- 文档
  - spring-aop-5.2.6.Release-sources.jar  --- 源码

- 我们这个项目中使用的jar包是

- commons-logging-1.1.1.jar
- spring-beans-5.2.6.RELEASE.jar
- spring-context-5.2.6.RELEASE.jar
- spring-core-5.2.6.RELEASE.jar
- spring-expression-5.2.6.RELEASE.jar

- commons-logging-1.1.1.jar不在我们下载的spring里面

- 我们在项目的跟目录下创建 lib 文件夹

    | - src
    | - lib

- 将5个jar包复制进去

- ctrl + ,
  - modules
    - dependencies
    - 点击 + 号 选择 JRAS or Derectories 找到lib目录选择jar包导入


> 4. 代码部分: 使用 spring 创建一个对象
- 原始的方式是 new 一个对象

- 首先这里我们使用 spring 创建一个普通的类 在这个类里创建一个普通的方法
```java
package com.sam.spring5;

public class User {
  public void add() {
    System.out.println("add....");
  }
}
```

- 接下来我们使用 spring 来完成上面类的实例化

- 在 spring 中创建对象有多种方式
- 1. 可以利用配置文件
- 2. 可以利用注解完成 

- 这里我们先使用下 配置文件


> 5. 创建 spring 的配置文件
- 在配置文件中创建要配置的对象

- 要点:
- spring中的配置文件使用 xml 格式创建
- 我们在 src 下创建 xml 文件 右键 *xml configuration file* 

  | - src
    - com.sam.spring
    - bean.xml

```xml
<!-- 自带的 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <!-- 配置User对象的创建 -->
  <bean id="user" class="com.sam.spring5.User"></bean>
</beans>
```

- 在 spring 中有一个 <bean> 专门是用来配置对象的创建
- 标签属性: 
- id
- class: 类的全路径


> 6. 进行测试代码编写
- 我们创建一个测试类 来进行测试

> 要点:
> new ClassPathXmlApplicationContext("src下的配置文件");
- 加载配置文件

- 返回值:
- ApplicationContext

> context对象.getBean("配置文件的id", 对象类的.class)
- 这就是通过spring来创建的对象

- 返回值:
- 类对应的类型

```java
@Test
  public void testAdd() {
    // 加载 spring 的配置文件
    ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
    /*
      ClassPath是类路径 我们xml配置文件在src下面 所以可以直接写 配置文件的名字
    */


    // 获取配置文件创建的对象
    // 通过 context得到对象 传递 xml 中的 id 值, 和 User.class 表示转换的类型 返回的user就是spring创建的对象
    User user = context.getBean("user", User.class);

    System.out.println(user);
    user.add();
  }
```

----------------

### 