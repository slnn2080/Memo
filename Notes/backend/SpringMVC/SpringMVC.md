# SpringMVC
MyBatis是持久层的框架, 它可以帮助我们操作数据库中的数据

Spring它可以利用它的两大核心 进行整合框架的功能

**ioc用来管理对象**  
这样spring在整合第三方框架mybatis的时候 就可以将mybatis中的一些对象交给IOC容器来管理

比如操作数据库的对象 sqlSession, 还有执行sql语句的mapper接口的对象 我们将这些对象交给ioc容器管理

我们在哪个地方需要使用我们通过自动装配方式就可以获取它

<br>

**AOP的声明式事务**  
这样mybatis中的事务就可以交给声明式事务来实现

<br>

## 什么是MVC
MVC是一种软件架构思想, 将软件按照 模型 视图 控制器来划分

<br>

### M: Model  
模型层, 指工程中的JavaBean, **作用是处理数据**

<br>

**JavaBean分为两类:**  
- 一类是存储数据的实体类Bean: 专门存储业务数据的, 如 User, Student等

- 一类是处理数据的业务类Bean: 指Service, Dao等对象, 专门用于处理业务逻辑和数据访问

<br>

### V: View
视图层, 指工程中的html或jsp等页面, **作用是与用户进行交互, 展示数据**

比如发送请求我们需要在页面上发送 处理完请求后还要将服务器响应的结果给用户展示在页面上

<br>

### C: Controller
控制层, 指工程中的servlet, **作用是接收请求和响应浏览器**

<br>

### MVC的工作流程:
用户通过视图层发送请求到服务器, 在服务器中请求被Controller接收, Controller调用处理数据的业务类(Dao Service) 处理业务逻辑

处理完毕后结果返回Controller, Controller再根据请求处理的结果找到相应的View视图, 渲染数据后最终响应给浏览器

<br><br>

## 什么是SpringMVC
它是在Spring中使用MVC功能的一个框架

SpringMVC是Spring的一个后续产品, 是Spring的一个子项目

SpringMVC是Spring为表述层开发提供一套完备的解决方案

在表述层框架经历了 Strust, WebWork Strust2 等诸多产品的历代更迭之后 目前业界普遍选择了SpringMVC作为JavaEE项目表述层开发的首选方案

```
三层架构为
1. 表述层(表示层)
2. 业务层
3. 持久层

表述层包括前台页面和后台servlet, 表述层不单有servlet处理请求和响应, 还有view展示数据的
```

也就是说 SpringMVC 解决的是表述层的问题, **SpringMVC封装的就是Servlet**

当我们有了SpringMVC之后就不需要手动的创建Servlet了 它将Servlet中可以实现的功能进行了封装

我们只需要按照SpringMVC为我们提供的方式 我们就可以获取请求相关的数据 响应给浏览器

<br>

### SpringMVC的特点
- Spring 家族原生产品，与 IOC 容器等基础设施无缝对接
```
SpringMVC的配置文件和Spring是一模一样的, 只不过我们用到的命名空间有所区别
```

- 基于原生的Servlet，通过了功能强大的前端控制器DispatcherServlet，对请求和响应进行统一处理
```
SpringMVC在封装Servlet的时候 将Servlet封装成了一个前端控制器 DispatcherServlet 

它可以对浏览器发送的请求 和 响应, 统一来进行处理 我们以后不需要自己创建Servlet 我们的请求和响应都是通过DispatcherServlet来处理的
```

- 表述层各细分领域需要解决的问题全方位覆盖，提供全面解决方案

- 代码清新简洁，大幅度提升开发效率

- 内部组件化程度高，可插拔式组件即插即用，想要什么功能配置相应组件即可
```
我们在使用SpringMVC的功能的时候 比如异常处理器 视图控制器 拦截器 

我们不需要额外的去写很多的代码, 我们只需要在springmvc的配置文件中 配置相对应的组件就可以

我们配置了组件就有效果, 不配置就没有效果
```

- 性能卓著，尤其适合现代大型、超大型互联网项目要求

<br><br>

## 入门案例

### 开发环境
写的是老师的环境

```
IDE：idea 2019.2
构建工具：maven3.5.4
服务器：tomcat8.5
Spring版本：5.3.1

视图技术: thymeleaf
```

<br><br>

## 准备工作

### 创建Maven工程
我们默认创建出来的Maven工程是一个Java工程, 所以我们要手动添加Web模块

<br>

### 添加Web模块:
**方式1:**  
我们修改pom.xml配置文件, 设置 ``<packaging>war</packaging>`` 为war之后, 我们关闭窗口 重新加载就有web文件夹了

<br>

**方式2:**  
ctrl + ; -> Facets   
该Facets中会自动识别到Web, 如果没有识别上我们点击+自己创建一个Web

<br>

不管选择哪种方式 我们都需要配置 web.xml 的路径 和 web的资源路径

ctrl + ; 选择 Modules 选项卡, 找到我们的工程 点击web文件夹 

在 Deployment Descriptors(该功能是设置web.xml的路径) 点击 + 选择 web.xml

我们要在自动生成的路径的工程名的后面补充 ``/src/main/webapp/``
```
模块名/src/main/webapp/WEB-INF/web.xml
```

<br>

在 Web Resource Directories选项卡里面(该功能是设置web的资源路径) 指明web目录 我们指明确为 webapp

这里我们原先认知中的web目录改为webapp目录了, 因为Maven中他约定的web资源就是webapp

```
模块名/src/main/webapp
``` 

<br>

**目录结构:**  
```
| - 模块名
  | - src
    | - main
      | - java

      | - resources

      | - webapp
        | - WEB-INF
          - web.xml

    | - test
      | - java
```

<br>

### 引入依赖:
由于 Maven 的传递性，我们不必将所有需要的包全部配置依赖，而是配置最顶端的依赖，其他靠传递性导入。

**SpringMVC依赖:**  
我们虽然只引入了SpringMVC但是 它引入了很多 因为它也是基于Spring的, 所以它将Spring的所有依赖都引入进来了

```xml
<dependencies>
  <!-- SpringMVC --> 
  <dependency> 
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.1</version> 
  </dependency> 
  
  
  <!-- 日志 --> 
  <dependency> 
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId> 
    <version>1.2.3</version> 
  </dependency> 
  
  <!-- ServletAPI --> 
  <dependency> 
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId> 
    <version>3.1.0</version> <scope>provided</scope> 
  </dependency> 
  
  <!-- Spring5和Thymeleaf整合包 --> <dependency> 
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring5</artifactId>
    <version>3.0.12.RELEASE</version>
  </dependency> 
</dependencies>
```

<br><br>

## 配置SpringMVC框架
这个部分我们配置一下 SpringMVC 我们配置的过程中有几个步骤

1. 配置 web.xml
2. 创建请求控制器
3. 创建SpringMVC的配置文件

这三个步骤完成后 我们就可以通过SpringMVC来处理请求和响应了

<br>

### 1. 配置 web.xml
SpringMVC的本质是servlet, 它将之前的servlet的功能进行了封装 封装成为了 DispatcherServlet

JavaWeb阶段我们的servlet要想处理请求和响应必须要在servlet中进行注册

当我们配置了 url-pattern 之后, DispatcherServlet才可以对浏览器所发送的指定的请求来进行处理

<br>

**这里我们也要将SpringMVC封装的 DispatcherServlet 类进行注册**

<br>

**配置web.xml**  
我们要将 DispatcherServlet 配置到web.xml中 并且要拦截所有的请求 交给DispatcherServlet统一进行处理

<br>

**要点:**  
1. 我们要写springframework中的DispatcherServlet 的全类名

2. url-pattern 中我们要拦截所有的请求, 所以我们可以写 
  - /: 匹配浏览器向服务器发送的所有请求(它不包括.jsp结尾的请求)
  - /*: 匹配任意请求(包括以.jsp结尾的请求)
  - *.do(后缀匹配)   
  浏览器的请求路径是以.do来结尾的 就会被DispatcherServlet拦截到

<br>

3. servlet-mapping 的 servlet-name 中 有一个默认值的 default, 它是tomcat服务器处理静态资源的servlet

<br>

**注意:**  
**我们这里拦截所有请求使用的是 /** 没有使用``/*``

因为jsp的本质是servlet, 我们jsp的访问方式都是.jsp

如果我们使用的是 ``/*`` 就意味着我们拦截的是所有请求, 包括.jsp这样的请求

但是有一点我们要知道, tomcat将所有.jsp这样的请求都会交给tomcat内置的JspServlet程序来处理

所以我们要使用 /, 这样 
- .jsp 的请求会交给tomcat
- 剩下的请求会交给DispatcherServlet(因为它处理不了jsp, jsp要先翻译成servlet 然后我们再去访问这个servlet 将jsp页面中的所有内容 以响应的方式响应到浏览器 我们才能看到页面)

<br>

这里我们使用 /* 也可以, 因为我们现在使用的都是 thymeleaf, 视图都是html, 已经不使用jsp了

```xml
<!-- 配置SpringMVC的前端控制器 DispatcherServlet -->
<servlet>
  <servlet-name>SpringMVC</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
</servlet>
<servlet-mapping>
  <servlet-name>SpringMVC</servlet-name>
  <!-- DispatcherServlet是对所有的请求和响应统一处理(除了静态资源) -->
  <url-pattern>/</url-pattern>
</servlet-mapping>
```

<br>

### 2. 创建请求控制器
创建请求控制器也就是创建控制层

SpringMVC封装的是Servlet, 所以我们不需要自己创建Servlet, 所以我们的控制层**只需要创建一个 pojo一个普通的Java类**(不需要有任何的继承 和 任何的实现) 就可以

我们只需要 **使用 @Controller 将这个类标识为一个控制层的组件** 交给Spirng的IOC管理, 此时SpringMVC才能够识别控制器的存在

那我们就可以通过SpringMVC为我们所提供的方式 把我们控制层中的方法作为我们处理请求的方法

<br>

**创建控制层:**  
| - com.sam.controller.HelloController

```java
package com.sam.controller;
import org.springframework.stereotype.Controller;

// 标识为控制层组件
@Controller
public class HelloController {
}
```

<br>

### 3. 创建SpringMVC的配置文件
该配置文件是自动加载的, 不是想之前的spring-ioc的配置文件我们需要手动获取

SpringMVC的配置文件是在 DispatcherServlet初始化的时候会自动加载 所以SpringMVC的配置文件要有

- 固定的名字
- 固定的位置

<br>

**SpringMVC的配置文件的默认位置和名称:**  
- 默认位置: WEB-INF下(未来会在resources目录下)
- 名称: web.xml文件中的 ``<servlet-name>的值-servlet.xml``, 如 ``SpringMVC-servlet.xml``

<br>

**配置文件中的内容:**  
1. 配置扫描

2. 配置视图解析器: 解析视图的, 配置完它之后我们就可以通过SpringMVC为我们提供的方式进行视图渲染 并实现页面跳转

<br>

**视图解析器:**  
它是由DispatcherServlet的内部加载的, 它不需要我们自己访问, 我们只要配置就会有功能 

<br>

**逻辑视图:**  
逻辑视图 = 物理视图 - 视图前缀 - 视图后缀

剩下的就是逻辑视图

<br>

**物理视图:**  
我们当前要访问的页面的完整路径

<br>

Thymeleaf中我们是通过 **逻辑视图** 来确定我们要跳转的页面的
 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans 
  xmlns="http://www.springframework.org/schema/beans"
       
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       
  xmlns:context="http://www.springframework.org/schema/context"
       
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">


  <!-- 配置扫描 -->
  <context:component-scan base-package="com.sam.controller" />


  <!-- 配置Thymeleaf视图解析器 -->
  <bean 
    id="viewResolver" 
    class="org.thymeleaf.spring5.view.ThymeleafViewResolver">

    <!-- 优先级: -->
    <property name="order" value="1"/>

    <!-- 编码 -->
    <property name="characterEncoding" value="UTF-8"/>

    <!-- 模版引擎 -->
    <property name="templateEngine">
      <bean class="org.thymeleaf.spring5.SpringTemplateEngine">

        <!-- 模版解析器 -->
        <property name="templateResolver">
          <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
            
            <!-- 视图前缀 -->
            <property name="prefix" value="/WEB-INF/templates/"/>

            <!-- 视图后缀 -->
            <property name="suffix" value=".html"/>

            <!-- 模版的模型: 我们是以html5作为视图的 -->
            <property name="templateMode" value="HTML5"/>

            <!-- 渲染视图的编码 -->
            <property name="characterEncoding" value="UTF-8" />
          </bean>
        </property>
      </bean>
    </property>
  </bean>
</beans>
```

<br>

### 创建 templates 目录
使用是的Thymeleaf来进行视图渲染, 跳转的目录, 我们的页面都放在这里

```
| - /模块名/src/main/webapp/WEB-INF/templates/
  - index.html
```

<br>

**思考:**  
如果我们要访问 index.html 页面的时候
- 物理视图: /WEB-INF/templates/index.html
- 逻辑视图: index

Thymeleaf中可以解析逻辑视图来匹配当前的视图前缀 和 视图的后缀

<br>

比如我们要往 /WEB-INF/templates/index.html 跳转 我们这时是不需要写上完整的路径的

我们只需要通过 **逻辑视图 index** 来访问到它所对应的物理视图

<br>

### SpringMVC中处理请求
我们要将我们的web工程配置到Tomcat中, 我们要创建tomcat实例, 将我们的工程添加到tomcat中

我们将 Application context 设置为 /SrpingMVC, 也就是我们访问首页的话 就是
```s
localhost:8080/SrpingMVC
```

<br>

**实现对首页的访问:**  
注意我们的页面是配置在 /WEB-INF/templates/index.html 

浏览器是无法访问到 /WEB-INF 下的资源的, 我们只能通过服务器来访问 浏览器是访问不到的, 也就是我们只能通过转发的形式来访问

<br>

所以我们要在控制层中 定义访问首页时的请求方法, 因为所有的请求都会交给DispatcherServlet来处理

我们现在还没有指定访问首页的处理程序, 所以我们要在控制层中添加处理请求的方法

<br>

**Controller: HelloController**  
```java
@Controller
public class HelloController {

  /*
    处理访问首页的请求的方法
    portal: 入口的意思
  */
  public String portal() {
    
  }
}
```

<br>

我们上面定义了一个 portal() 方法, 该方法就是用来处理请求首页的请求处理方法, 但是该方法怎么才能被SpringMVC认为是一个处理请求的方法呢? **使用注解**

<br>

### **<font color="#C2185B">@RequestMapping("请求地址")</font>**  
请求映射

用来处理和请求资源相匹配的方法

```java
@RequestMapping("/")
```

<br>

当浏览器发送的请求的请求url和我们mapping中设置的value属性值一样的时候 @RequestMapping注解标识的方法就是用来处理请求的方法

<br>

**/的定义:**  
/是绝对路径的标志, 我们的路径如果以 / 开头 它就是一个绝对的路径, /分为由 浏览器解析 和 服务器解析

``@RequestMapping("/")``比如这里的/因为是写在服务器的代码, 所以它就是由服务器解析的路径

- 服务器解析的 ``/``: 它在服务器端会被解析为 ``localhost:8080/工程名``

- 浏览器解析的 ``/``: 它在浏览器会被解析为 ``localhost:8080 `` **注意没有工程名**

<br> 

### 页面跳转:
我们在处理请求的方法中 ``return 逻辑视图`` 这样就可以通过Thymeleaf跳转到指定路径下的执行页面中

<br>

```java
@RequestMapping("/")
public String portal() {
  // 将我们的逻辑视图进行返回, 用来指定我们要跳转的页面
  return "index";
}
```

当前端请求路径为/的时候 会和我们的@RequestMapping("/") 进行匹配, 该注解所标识的方法就是处理该请求的方法

<br>

### 前端的 Thymeleaf 页面
注意: xmlns:th="http://www.thymeleaf.org" 不然不能使用 Thymeleaf 的语法

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <h1>首页</h1>
  <!--
    它可以帮助我们渲染路径 解析路径

    <a th:href="/hello">跳转</a>

    如果我们这么写
    /开头的路径为绝对路径, 该绝对路径是由浏览器解析的 它会将/解析为 localhost:8080 没有工程名

    但是我们使用 Thymeleaf 的方式来解析 /
    我们访问这个路径的时候 它会自动将我们的上下文路径加上的
  -->
  <a th:href="@{/hello}">跳转</a>
</body>
</html>
```

<br><br>

## 总结要点:

### SpringMVC是如何处理请求的
浏览器发送请求, 若请求地址符合前端控制器的url-pattern 该请求就会被前端控制器DispatcherServlet处理

前端控制器会读取SpringMVC的核心配置文件, 通过扫描组件找到控制器 将请求地址和控制器中 @RequestMapping注解的value属性值进行匹配

若匹配成功 该注解所标示的控制器方法就是处理请求的方法

处理请求的方法需要返回一个字符串类型的视图名称 该视图名称会被视图解析器解析, 加上前缀和后缀组成视图的路径

通过Thymeleaf对视图进行渲染, 最终转发到视图所在的位置

<br>

Thymeleaf是服务器视图渲染技术 我们当前的页面必须在服务器中进行渲染 当页面 WEB-INF下的时候 我们也只能通过服务器转发的方式访问页面

<br>

### 修改 SpringMVC配置文件 的位置
默认情况下 它是要在 WEB-INF 下 同时对位置和文件名都有固定的要求

现在我们修改下它的位置

<br>

**修改 web.xml 文件:**  
我们在 ``<servlet>`` 中的 ``<init-param>`` 里面配置 SpringMVC的配置文件的存放位置

- param-name: contextConfigLocation  
上下文配置路径 它就是设置当前DispatcherServlet要加载的SpringMVC配置文件的路径

- param-value: 明我们的配置文件在 resources目录下, 配置文件名叫springmvc.xml

<br>

**注意:**  
SpringMVC的配置文件路径前要加上classpath: 表示配置文件在类路径下 (java和resources都算类路径)
 
```xml
<!-- 
  配置SpringMVC的前端控制器 DispatcherServlet 
-->
<servlet>
  <servlet-name>SpringMVC</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>

  <!-- 设置Servlet初始化参数的 -->
  <init-param>
    <!-- 
      contextConfigLocation:上下文配置路径 它就是设置当前DispatcherServlet要加载的SpringMVC配置文件的路径 
    -->
    <param-name>contextConfigLocation</param-name>
    
    <!-- 
      classpath: 指明我们的配置文件在 resources目录下, 配置文件名叫springmvc.xml 
    -->
    <param-value>classpath:springmvc.xml</param-value>
  </init-param>
</servlet>
```

<br>

### 注意:
如果我们修改SpringMVC的配置文件后 没有成功说找不到 springmvc.xml 

这时有可能是虽然我们的配置文件创建了 但是没有加载到war包

我们可以打开 target目录 然后打开我们的war包 我们查看WEB-INF目录

因为我们 java目录 和 resources目录 最终都会放在WEB-INF目录/classes下面

如果没有 我们可以停掉tomcat 然后使用Maven面板 点开Lifecycle选项卡 点击clean 清理下我们target目录下的构建结果 

清理完成后 我们再执行 package 脚本

<br>

### 设置: DispatcherServlet的初始化到服务器启动时

**位置:**   
web.xml文件的DispatcherServlet的``<servlet>``标签中

**方式:**    
我们使用 ``<load-on-startup>1</load-on-startup>`` 将DispatcherServlet的初始化到服务器启动时

数字越小越靠前

<br>

**原因:**  
servlet的初始化默认是在第一次访问的时候执行的, DispatcherServlet这个前端控制器是框架为我们创建的 它的初始化里面会做很多的操作

如果它在第一次访问的时候进行初始化 我们第一次访问的时候就要做很多的操作 就会花费很长的时间 **用户在拿到响应的速度就会很慢**

所以我们不要让 DispatcherServlet 在第一次访问的时候初始化, 我们使用这个标签将 DispatcherServlet 的初始化提前到服务器启动时

<br><br>

# @RequestMapping注解
该注解的功能很多, 它不仅仅可以通过请求url来匹配请求 它还可以通过请求方式 请求参数 请求头信息 来进行匹配

从注解名称上我们可以看到 @RequestMapping注解的作用就是用请求和处理请求的控制器关联起来 建立映射关系

SpringMVC接收到指定的请求 就会找到映射关系中对应的控制器的方法来处理这个请求

<br><br>

## @RequestMapping注解的位置
- 可以将该注解放在 方法 上
- 可以将该注解放在 类 上

<br>

**标识到类上:**  
标识到 **类** 上表示设置当前请求路径的 **基础信息**

**有点类似 baseUrl 的感觉**

<br>

**标识到方法上:**  
标识到 **方法** 上表示设置当前请求路径的 **具体信息**

<br>

如果我们在类上添加了 /base, 然后我们在方法上添加了 /login

那么我们的请求url就应该为 <font color="#C2185B">/base/login</font>

<br>

```java
@Controller
// 标识到类上
@RequestMapping("/test")
public class TestRequestMappingController {

  // 标识到方法上
  @RequestMapping("/hello")
  public String hello() {
    return "success";
  }
}

// 我们前台请求的路径须为 /test/hello 才能匹配到具体的请求方法
```

<br>

### 使用场景:
我们的程序中会有很多的模块 如 user student 等等, 那么每个模块下都会有 增删改查的请求 

这时我们可能会起这样的接口 /delete /update 等等 但是每个模块都有这样的url接口

- user 有 /delete /update  
- student 有 /delete /update  

那前台请求 /delete 的时候 是匹配 user模块里面的 还是 student模块里面的?

这时我们就可以在 类上加上
- @RequestMapping("/user") 
- @RequestMapping("/student")

这样就可以区分每个模块下的具体的同名请求url

<br>

也就是说我们在分模块的时候, 我们想在路径中体现中到底是哪一个模块下的请求 请求的是哪个模块中的资源 我们就可以在当前的类上设置一个 @RequestMapping 注解

<br><br>

# @RequestMapping注解的属性
@RequestMapping注解中的属性有很多

- String[] value: 通过请求地址匹配
- RequestMethod[] method: 通过请求方式匹配
- String[] params: 通过请求参数匹配
- String[] headers: 通过请求头匹配

<br>

## value属性:
通过请求的请求地址 匹配 请求的处理方法

<br>

### 别名: path
我们使用value可以 使用path也可以

<br>

### 类型: String[]  
说明我们可以设置多个 接口地址(请求路径)
```java
@RequestMapping({"/url1", "url2"})
```

我们的一个请求并不会有两个请求路径 一个请求只会有一个请求路径

我们写了多个请求接口地址表示该请求映射(请求方法) 可以匹配多个请求 **也就是说我们的该控制器方法可以处理多个请求**

相当于我们设置了多个 url-pattern

<br>

### 注意:
**value属性必须设置**, 至少通过请求地址匹配请求映射(请求方法)

我们设置的属性越多 表示我们的请求匹配的越精确, 如果我们写了value 还写了method 表示在匹配了value属性之后, 还必须匹配请求方法

<br>

## method属性:
该属性表示的是请求方式, 我们可以通过该属性规定我们的控制器方法 在我们请求路径匹配的情况下 指明当前的控制器方法处理请求的请求方式是什么

如果我们的请求路径可以匹配 请求方式我们也能匹配 那我们的控制器方法才会处理这个请求

<br>

### 作用:
通过请求的额请求方式匹配请求

<br>

### 类型: RequestMethod[]  
类型为数组表示 控制器方法所处理的请求可以是多种请求方式的

只要是浏览器发送的请求方式和该数组中任何一个值匹配 都可以处理该次请求

相当于 app.all()

<br>

**RequestMethod类型:**  
**它是一个枚举类**, 可选值有

- RequestMethod.GET
- RequestMethod.POST
- RequestMethod.HEAD
- RequestMethod.OPTIONS
- RequestMethod.PUT
- RequestMethod.PATCH
- RequestMethod.DELETE
- RequestMethod.TRACE

<br>

### 使用方式
```java
@RequestMapping(
  // 当只有value属性的时候 value可以省略
  value = {"/url1", "url2"},
  method = "get",

  // 通过枚举类提供的元素
  method = RequestMethod.GET

  // 匹配多个请求方式
  method = {RequestMethod.GET, RequestMethod.POST}
)
```

<br>

### 派生注解:
在@RequestMapping的基础上 结合请求方式的一些派生注解:

- @GetMapping: 匹配Get请求
- @PostMapping
- @DeleteMapping
- @PutMapping

我们使用上述的注解的时候 **就不用再设置 method 属性了, 它们只需要指明value属性(path) 就可以了**

相当于 app.get, app.post

<br>

### 405
请求地址匹配 但请求方式不匹配的时候 就会报这个错误

<br><br>

## params属性:
我们以后用最多的还是value或者是method, 其它的属性使用的不多

@RequestMapping注解的params属性通过请求的 请求参数 匹配请求方法(请求映射)

**即浏览器发送的请求参数必须满足params属性的设置**

<br>

### 类型: String[]
它可以通过四种表达式 设置请求参数和请求方法的匹配关系

下面表达式中写的param和value都是变量

<br>

- "param": 表示当前所匹配的请求参数中 **必须携带** param参数
```
比如我们param写的是username, 那么我们不管username的值是什么 必须要携带该参数
```

- "!param": 表示当前所匹配的请求参数中 **必须不能携带** param参数

- "param=value": 表示当前所匹配的请求参数中 必须携带 param参数 且 它的值必须是我们指定的value值
```
比如我们param=value写的是username=sam, 那么该次请求中必须携带username 且username的值必须是sam
```

- "param!=value": 表示当前所匹配的请求参数中 可以不携带param参数 但是 若携带了param **那么它的值一定不能是我们指定的value**

<br>

### 使用方式:
上面我们的value属性 method属性中我们写多个值的时候, 只要匹配value属性中的任意一个, method属性中的任意一个 就可以了

**但是我们在params属性中指明的条件必须同时满足**

<br>

**当前请求必须携带 username 参数:**
```java
@RequestMapping(
  value = "/hello",
  method = RequestMethod.GET,

  params = {
    "username"
  }
)
public void hello() { ... }
```

<br>

**验证:**  
前台请求: ``localhost:8080/SpringMVC/hello`` 

我们路径匹配, 请求方法匹配, 但是没有 username 参数, 则请求失败报 400错误

```
http status 400 - parameter conditions "username" not met for actual request parameters
```

意思: 我们的参数条件username 和 我们发起的这次请求的参数 不匹配

<br>

**修改:**  
前台请求: ``http://localhost:8080/SpringMVC/hello?username=``

我们携带上username参数 它不管参数的值

<br>

**当前请求 不能携带 password 参数:**
必须携带 username, 但是不能携带 password
```java
@RequestMapping(
  value = "/hello",
  method = RequestMethod.GET,

  params = {
    "username",
    "!password"
  }
)
public void hello() { ... }
```

<br>

**验证:**  
前台页面如果发起如下请求则请求失败 **报错400**, 因为我们携带了password参数
```html
<a th:href="@{/hello(username='sam', password='123')}">
```

<br>

**当前请求必须携带 age 且值必须为 18:**
```java
@RequestMapping(
  value = "/hello",
  method = RequestMethod.GET,

  params = {
    "username",
    "!password",
    "age=18"
  }
)
public void hello() { ... }
```

<br>

**当前请求可以携带 gender 但是值不能是 女:**  
可以携带gender 但是对它的值有要求 不能是是什么值  
但是也可以不穿gender

```java
@RequestMapping(
  value = "/hello",
  method = RequestMethod.GET,

  params = {
    "username",
    "!password",
    "age=18",
    "gender!=女"
  }
)
public void hello() { ... }
```

<br>

### 注意:
params中我们配置的要求 **<font color="#C2185B">必须同时满足</font>**

<br><br>

## headers属性
该属性跟params属性的使用方式是完全一致的

@RequestMapping注解的headers属性通过请求的请求头信息匹配请求映射(请求方法)

<br>

### 类型: String[]
可以通过四种表达式设置请求头信息和请求方法的匹配关系

下面表达式中写的 header 和 value 都是变量

通过请求的请求头信息匹配请求, 即浏览器发送的请求头信息必须满足headers属性的设置 只要满足则可以处理该次请求

<br>

### 使用方式
header是请求头中的key

- "header": 表示当前所匹配的请求头中 **必须携带** 指定的请求头信息

- "!header": 表示当前所匹配的请求头中 **必须不能携带** 指定的请求头信息

- "header=value": 表示当前所匹配的请求头中 必须携带 指定的请求头 且 它的值必须是我们指定的value值

- "header!=value": 表示当前所匹配的请求头中 可以不携带header头信息 但是 若携带了header **那么它的值一定不能是我们指定的value**

<br>

### 报错: 请求头不匹配报404
若当前请求满足 @RequestMapping注解 的value 和 method 属性, **但是不满足headers属性 此时页面显示404错误 即资源未找到**

<br>

### 演示:

**表示当前请求中 请求头中必须包含 referer**  
```java
@RequestMapping(
  value = "/hello",
  method = RequestMethod.GET,

  headers = {
    "referer"
  }
)
public void hello() { ... }
```

<br>

### 注意: 
请求头 和 响应头 的键 是不区分大小写, 但是它们的值是区分大小写的

<br><br>

## @RequestMapping注解的value属性: 支持 ant风格的路径

我们可以在 @RequestMapping 的value属性值使用一些特殊的符号 它们可以表示一些特殊的含义

<br>

### 特殊符号:

**``?``**  
路径中使用 ? 表示任意的单个字符

**注意:**  
?匹配不了 ?它本身, 因为?在url中是请求路径和请求参数的分隔符

<br>

**``*``**  
路径中使用 * 表示任意的0个或多个字符

**注意:**  
- *匹配不了 ?, 因为?在url中是请求路径和请求参数的分隔符

- *匹配不了 /, 因为/在url中是请求路径的分隔符, 如果我们写/则表示为一层新的目录了

<br>

**``**``**  
路径中使用 ** 表示任意层数的目录

它解决了 *不能表示/的问题

<br>

**注意:**    
使用 ** 的时候 只能使用 /**/xxx 的方式

<br>

### 使用方式:
**使用方式1: ?**  
?可以是任意字符 

**后台Controller中的方法:**  
```java
@RequestMapping("/a?c/test/ant")
public String testAnt() {
  return "success";
}
```

**前台请求:**  
```html
<!-- 下面的请求方式符合上面的请求地址的设置的 -->
<a th:href="@{/aaa/test/ant}">
<a th:href="@{/aba/test/ant}">
<a th:href="@{/aca/test/ant}">
```

<br>

**使用方式2: ``*``**  
*可以是任意字符 任意个数

**后台Controller中的方法:**  
```java
@RequestMapping("/a*c/test/ant")
public String testAnt() {
  return "success";
}
```

**前台请求:**  
```html
<!-- 下面的请求方式符合上面的请求地址的设置的 -->
<a th:href="@{/aa/test/ant}">
<a th:href="@{/absdfsa/test/ant}">
```

<br>

**使用方式3: ``**``**  

**后台Controller中的方法:**  
注意 ** 的使用方法
```java
@RequestMapping("/**/ac/test/ant")
public String testAnt() {
  return "success";
}
```

**前台请求:**  
```html
<a th:href="@{/a/a/a/ac/test/ant}">
```

<br>

### 要点:
1. 我们的请求路径写多层是没有问题的 而且这种方式也是很常用的 

2. 我们设置的请求路径中最好不要包含大写字母

<br><br>

## @RequestMapping注解的value属性: 支持路径中的占位符(动态参数)
它也是一种新的路径的设置方式, 当我们下面学习了restful接口风格时候 路径的书写方式就不一样了

**原始方式:**  
原始方式会将我们要干什么 和 url中的资源都在路径中表现出来, 参数使用?的方式传递 如:
```
/deleteUser?id=1
```

<br>

**rest方式:**  
我们在rest风格的路径中 我们会将参数体现在路径中

也就是说 **将我们想往服务器传送的参数也作为路径中的一部分** 传送到服务器中

```
/user/delete/1
```

<br>

### 问题:
在原始方式中因为是 key=value 的形式传递的参数, 所以我们可以通过 key 来获取对应的值

那restful风格的路径中怎么获取值呢？ 这时我们就要使用路径中的占位符了

<br>

### 使用方式: 
需要在 @RequestMapping注解的value属性所设置的路径中, 使用{key}的方式表示路径中的数据

再通过@PathVariable注解 将占位符所标识的值 和 控制器方法的形参进行绑定

<br>

**前台请求:**  
```html
<a th:href="@{/test/rest/sam/1}">测试动态参数的方式</a>
```

<br>

前台请求中通过 restful 风格的接口传递过来了两个参数, sam 和 1, 所以我们的服务器中就要 **声明 和 接收**

<br>

**步骤1: 声明**  
相当于给请求参数设置了一个key, 我们在@RequestMapping的value属性值中使用 {key} 接收前台的请求参数
```java
@RequestMapping("/test/rest/{username}/{id}")
```

<br>

**步骤2:接收**  
我们接收到的参数是需要在处理请求的方式中使用的 所以

1. 处理请求的方法中要声明形参用于接收前台参数, **前台参数的类型是根据形参的类型定义的**  
```
/test/rest/1

前台就传递了1, 这个1是string还是number 是在请求方法的形参中定义的 如

(Integer id) 那它就是数字类型

它是SpringMVC的内部进行转换的(能转换才会转换)
```

<br>

2. 使用 **<font color="#C2185B">@PathVariable("接口地址中定义的key")</font>** 将接收到的参数 注入到请求方法的形参中

@PathVariable注解的位置写在形参类型的前面

```java
@RequestMapping("/test/rest/{username}/{id}")
public String testRest(
  @PathVariable("username") String username, 
  @PathVariable("id") Integer id
) {
  System.out.println(username);
  System.out.println(id);
  return "success";
}
```

<br><br>

# SpringMVC获取请求参数
我们在处理请求的时候 一般的步骤都是

1. 获取请求参数
2. 调用service处理业务逻辑
3. 往域对象中共享数据
4. 最终实现页面的跳转

我们在获取请求参数这个部分, 我们会说两种方式

<br>

## 通过 ServletAPI 获取 请求参数
因为SpringMVC中封装的就是原生的servlet 所以我们仍然是可以通过servletAPI获取的

**使用的场景不多**

<br>

### 前台代码:
前台的请求路径为: /param/servletApi
```html
<form 
  th:action="@{/param/servletApi}" 
  method="post">

  用户名: <input type="text" name="username"> <br>

  密&emsp;码: <input type="password" name="password"> <br>

  <input type="submit" value="登录">
</form>
```

<br>

### 控制器方法
如果我们要是想使用Servlet中的API我们 **只需要在控制器方法的形参中声明 请求 和 响应 的参数就可以了**

- HttpServletRequest
- HttpServletResponse
- Session

```java
@RequestMapping("/param/servletApi")
public String getParamByServletApi(
  HttpServletRequest req, 
  HttpServletResponse res
) {
  ...
}
```

<br>

**问题:**  
在控制器方法中我们要使用servletApi来获取请求参数, 但是我们的控制层中的类就是一个普通的Java类, 它没有继承任何的类

我们要使用servlet来获取参数 得有 req对象 吧, 没有啊

<br>

**解决方式:**  
我们的控制器方法是谁调用的? **DispatcherServlet**

当我们的浏览器发送请求 被DispatcherServlet处理后, 它会拿着当前的请求信息 跟 控制层中的 @RequestMapping中的信息进行匹配

如果能匹配成功则会调用 @RequestMapping所标识的方法 来处理当前的请求 

**DispatcherServlet在调用方法的时候 它会检查处理请求的方法中的参数类型**

**如果**我们在处理请求的方法中的形参中**设置了(HttpServletRequest req) 类型的参数** 那它在调用该方法的时候 **它就会为我们当前的参数进行赋值**

<br>

**获取请求参数的示例:**  
req res是因为DispatcherServlet在调用控制器方法的时候 检查了形参类型, 它会为形参自动赋值

```java
@RequestMapping("/param/servletApi")
public String getParamByServletApi(
  HttpServletRequest req,
  HttpServletResponse res

) {

  String username = req.getParameter("username");

  String password = req.getParameter("password");

  System.out.println(username + " - " + password);

  return "success";
}
```

<br><br>

## 通过 控制器方法的形参 (SpringMVC中提供)
在SpringMVC中很多操作在获取某些数据的时候 都是通过控制器方法的形参来获取的

<br>

### 获取方式:
设置 **控制器方法的形参** 和 **请求参数的名字** 一致

**控制器中的形参默认就是用来接收请求参数的**

```java
@RequestMapping("/param")
public String getParamByServletApi(
  String username, 
  String password, 
  
  HttpServletRequest req, HttpServletResponse res
) {

  // 形参名和请求参数名保持一致 即可获取到请求参数
  System.out.println("username = " + username);
  System.out.println("password = " + password);

  // 验证: 通过形参获取req res对象
  System.out.println(req);
  System.out.println(res);

  return "success";
}
```

<br>

### 特殊情况: 请求参数名 和 形参名 不一致
比如:
- 前端表单项的name属性为 userName
- 控制方法的形参名为 username

这时我们要手动的创建 它们之间的关系, 我们使用 @RequestParam注解

<br>

**<font color="#2185B">@RequestParam()</font>**  
用来设置请求参数 和 控制器方法形参 之间的映射关系

**请求参数和形参名进行绑定**

<br>

**位置:**  
在形参前面使用

<br>

**注解属性:**  
- value: name 和 value 一样

- name: name 和 value 一样

- required: 默认值true

- defaultValue: 默认值 ValueConstants.DEFAULT_NONE  

<br>

**value属性:**  
指定一个请求参数的名字 和 当前的形参进行绑定

比如将前端请求参数的 userName 和 形参名 username 进行绑定

```html
用户名: <input type="text" name="userName"> <br>

  密&emsp;码: <input type="password" name="passWord"> <br>
```

<br>

@RequestParam()里面传入前端表单项的参数名, 我们将前端表单项的参数名和形参名进行绑定
```java
@RequestMapping("/param")
public String getParamByServletApi(

  @RequestParam("userName") String username, 

  @RequestParam("passWord") String password

) {

    System.out.println("username = " + username);
    System.out.println("password = " + password);

    return "success";
  }
```

<br>

**required属性:**  
该属性表示 该次请求中必须传入value对应的请求参数, 它的默认值就是true

若设置为false, 则表示value所对应的请求参数不是必须传输 若未传输 则形参值为null

```java
@RequestMapping("/param")
public String getParamByServletApi(

  // 表示该次请求中前端必须传递 userName 参数, 不然会报错 400
  @RequestParam(
    value = "userName",
    required = true
  ) String username, 

) { ... }

// 比如我们url输入 localhost:8080/SpringMVC?password=123 没有传递username则报错
```

<br>

**defaultValue属性:**
默认值 ValueConstants.DEFAULT_NONE  

- 如果前端传递了value指定的请求参数, 则我们将前端传递的参数赋值给 形参的username

- 如果前端没有传递value指定的请求参数, 则我们将设置的默认值赋值给 形参的username

- 此时我们与required属性无关, 不管它的值为false还是true, 只要是我们传递了value对应的请求参数则形参有值, 如果没传则形参使用默认值

```java
@RequestMapping("/param")
public String getParamByServletApi(

  // 如果前端没有传递userName, 则我们会给形参username赋默认值sam
  @RequestParam(
    value = "userName",
    defaultValue = "sam"
  ) String username, 

) { ... }
```

<br><br>

## @RequestHeader() & @CookieValue()
这两个注解和@RequestParam()注解的使用方式一致, 它们中也有同样的属性

- value
- required
- defaultValue

<br>

### 位置:
控制器方法形参前使用, 就是将 请求头 和 cookie中的数据 映射到 形参中

<br>

### @RequestHeader()
将请求头信息 和 控制器方法的形参绑定

也就是说我们定义 形参名 和 @RequestHeader() **就可以通过形参名来获取请求头信息**

<br>

### @CookieValue()
将cookie数据 和 控制器方法的形参绑定

也就是说我们定义 形参名 和 @CookieValue() **就可以通过形参名来获取Cookie信息**

<br>

原生方式我们要获取cookie比较繁琐, req.getCookies()获取cookie数组, 然后遍历拿到一个cookie对象 再通过该对象的getName() getvalue()获取键和值

如果我们想获取一个指定的cookie的话 我们还需要判断它的name是不是等于谁 我们再获取到它的value

```java
Cookie[] cookies = req.getCookies();
String cookieRet = null;
for (Cookie cookie : cookies) {
  if(cookie.getName().equals("JSESSIONID")) {
    cookieRet = cookie.getValue();
  }
}
```

<br>

但是我们这里就简单多了

<br>

### 演示:
**通过形参获取 请求头对应的数据:**   
```java
@RequestMapping("/param")
public String getParamByServletApi(
  @RequestHeader("referer") String referer
) {

  // 通过形参获取请求头为referer 对应的数据
  System.out.println("referer = " + referer);

  return "success";
}
```

<br>

**通过形参获取 cookie中对应的数据:**   
```java
@RequestMapping("/param")
public String getParamByServletApi(

  @CookieValue("Idea-23f35ccc") String cookie

) {

  // 通过形参获取cookie中Idea-23f35ccc 对应的数据
  System.out.println("cookie = " + cookie);

  return "success";
}
```

<br><br>

## 获取请求参数: POPJO方式(控制器方法的形参为实体类对象)

如果浏览器向服务器发送的数据特别多, 姓名 年龄 爱好 生日 地址 等 

这么多参数我们都通过控制器方法的形参来获取的话 形参会声明的特别多

<br>

### 解决方式:
我们只需要在控制器方法中**声明一个实体类形参 只要实体类中的属性 和 请求参数的名字一样**

那么DispatcherServlet就可以直接**将当前的请求参数的值 封装到实体类类型的形参中**

<br>

### 演示:

**创建一个User类:**  
```java
public class User {
  private Integer id;
  private String username;
  private String password;

  public User() {
  }

  ...
}
```

<br>

**前台代码:**  
接口地址为 /param/pojo
```html
<form 
  th:action="@{/param/pojo}"
  method="post">

  <input 
    type="hidden" 
    name="id" value="1"> <br>

  用户名: <input type="text" name="username"> <br>

  密&emsp;码: <input type="password" name="passWord"> <br>

  <input type="submit" value="登录">
</form>
```

<br>

**控制层方法:**  
我们需要满足下面两点的话 就可以通过User获取前台的请求参数
1. 控制方法中声明一个User类型的形参
2. User类中的属性名要和请求参数名一致

```java
@RequestMapping("/param/pojo")
public String getParamByServletApi(User user) {

  System.out.println("user = " + user);
  return "success";
}
```

<br>

**输出:**  
```java
user = User{id=1, username='wdnz666', password='null'}
```

<br>

### 总结:
前台传输的数据非常的多 如果是一个两个的话 我们通过形参来获取 如果很多 我们就可以封装为实体类对象

<br><br>

# 获取请求参数时 出现的乱码问题
我们之前在servlet阶段的时候 我们是通过 ``req.setCharacterEncoding("utf-8");`` 方法设置获取请求参数时编码的问题

在SpringMVC中, 我们不能通过该方式来设置请求参数的编码

因为我们在控制器方法中声明的 req对象, 是DispatcherServlet已经获取完请求参数后传入到控制器方法中的req 所以我们不能通过该方法设置请求参数的编码问题 **因为已经获取完了**

<br>

## 解决方式:
我们前台请求方式有两种
- get
- post

<br>

### Get请求中文乱码问题:

**Tomcat7: get请求中文乱码问题:**  
Tomcat7中 不管是get还是post, 请求参数里面的中文都会有乱码问题 (Tomcat8中get请求是没有乱码问题的)

/Library/Tomcat7/conf/server.xml

打开上面的xml文件 找到下面的位置 添加 ``URIEncoding="UTF-8"``
```xml
<Connector 
  port="8080" 
  URIEncoding="UTF-8"
  protocol="HTTP/1.1"
  connectionTimeout="20000"
  redirectPort="8443" 
/>
```

<br>

### Post请求中文乱码问题:
不管是 Tomcat7 还是 Tomcat8 只要是Post请求都会有中文乱码问题

<br>

**回顾: servlet阶段的解决编码问题的方式**
servlet阶段我们解决请求参数编码的问题时是new一个Filter 在doFilter()方法中 可以设置请求的编码 和 响应的编码

然后我们还要在web.xml文件中 让过滤器来过滤所有的请求

<br>

### SpringMVC: 解决编码问题
上述的过滤器中的逻辑不需要我们自己写了, 我们**在 web.xml文件中进行配置**

**要点:**  
我们需要配置Spring为我们提供的 字符编码过滤器 CharacterEncodingFilter

- filter-name: 填写CharacterEncodingFilter

- filter-class: 填写CharacterEncodingFilter的全类名

- init-param: 配置两项
  - encoding: UTF-8, 解决请求参数中文乱码问题
  - forceEncoding: true, 配置后可以解决请求和响应的请求参数中文乱码问题, 如果不配置只能解决请求的参数中文乱码问题

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app 
  xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
  version="4.0">

  <!-- 
    设置请求参数中文乱码问题: 配置编码过滤器
  -->
  <filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
    <!-- 设置请求和响应的编码格式 -->
    <init-param>
      <param-name>forceEncoding</param-name>
      <param-value>true</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>



  <!-- 
    配置SpringMVC的前端控制器 DispatcherServlet 
  -->
  <servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 设置Servlet初始化参数的 -->
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springmvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>

  <servlet-mapping>
    <servlet-name>SpringMVC</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>
```

<br>

### 注意:
SpringMVC中处理编码的过滤器一定要配置到其他过滤器之前 否则无效

SpringMVC中我们需要配置的过滤器有两个
1. 处理请求参数中文乱码的过滤器
2. 处理请求方式的过滤器

我们**要先设置处理请求参数中文乱码的过滤器**, 因为我们设置编码之前一定不能获取其他的请求参数, 不然就失效

<br><br>

# 域对象中的数据共享
我们往域对象中共享数据 也是使用SpringMVC为我们提供的方式 因为我们在控制器方法中没有这些对象

<br>

我们的域对象一共有4个, 我们不使用jsp之后域对象只有3个
- pageContext: JSP页面的范围
- HttpServletRequest: 一次请求的范围
- HttpSession: 一次会话的范围
- ServletContext: Application整个应用的范围

<br>

## 如何往请求域中共享数据
1. 通过ServletAPI  向request域中共享数据
2. 使用ModelAndView  向request域中共享数据
3. 使用Model  向request域中共享数据
4. 使用map  向request域中共享数据
5. 使用ModelMap  向request域中共享数据

我们上面的5种方式都可以向请求域中存数据的

<br>

### 方式1: 使用 ServletAPI
获取 req 对象, 通过req.setAttrbute() 往域中存取数据
```java
@RequestMapping("/param")
public String getParamByServletApi(HttpServletRequest req) {

  req.setAttribute("key", "val");
  
  return "success";
}
```

<br>

### 方式2: 使用 ModelAndView
我们需要使用 ModelAndView类, 它可以帮助我们往域对象中共享数据 实现页面跳转 渲染页面的功能

<br>

**ModelAndView类有 Model 和 View 的功能**
- Model: 主要用于向request域中共享数据
- View: 主要用于设置视图, 实现页面的跳转

<br>

**ModelAndView类是Spring官方推荐我们使用的**, 因为它在DispatcherServlet处理请求底层代码中不管我们共享数据使用的是什么方法, **最终在底层中都会将 往域对象中共享数据 和 视图 封装为 ModelAndView对象**

<br>

**前台代码:**
```html
<a th:href="@{/test/mav}">
  测试: 通过ModelAndView向请求域中共享数据
</a>
```

首页页面请求后台接口, 后台接口往request域中存数据 然后跳转到 success.html 页面中

我们在 success.html 页面中读取request域中的数据

```html
<!-- 
  读取request域中的数据 直接使用${key} 就可以 
-->
<h3 th:text="${testRequestScope}"></h3>
```

<br>

**控制器方法中使用 ModelAndView 方式:**  
如果我们选择了 ModelAndView 的方式, 那么控制器的方法的返回值为 ModelAndView类型

<br>

**1. ModelAndView的实例化**  
```java
ModelAndView mav = new ModelAndView();
```

<br>  

**ModelAndView的API:**  
- ModelView mav.addObject(String attrName, Object attrVal);

- void mav.setView(View view);
- void mav.setViewName();
- void mav.setStatus();

- ``Map<String, Object> mav.getModel();``
- ModelMap mav.getModelMap();
- HttpStatus mav.getStatus();
- View mav.getView();
- String mav.getViewName();

- void mav.clear();
- boolean mav.hasView();
- boolean mav.isEmpty();
- boolean mav.isReference();

<br>

**<font color="#C2185B">mav.addObject(String attrName, Object attrVal)</font>**  
往 请求域 中共享数据

<br>

**<font color="#C2185B">mav.setViewName(String 逻辑视图名)</font>**  
设置跳转的页面

```java
// 如果我们使用了 ModelAndView 的方式, 控制器方法的返回值必须为 ModelAndView
@RequestMapping("/test/mav")
public ModelAndView testMAV() {

  // 创建 ModelAndView 的实例
  ModelAndView mav = new ModelAndView();

  /*
    mav对象中包含 model 和 view 的功能
    - model: 它只能向请求域中共享数据
    - view: 设置逻辑视图实现页面跳转
  */

  // 往请求域中共享数据: String attributeName, String attributeValue
  mav.addObject("testRequestScope", "modelAndView");

  // 设置逻辑视图, 设置往哪跳的逻辑视图部分
  mav.setViewName("success");

  // 返回 ModelAndView
  return mav;
}
```

<br>

### 方式3: 使用 Model
这个Model就是ModelAndView中的Model

Model就是往请求域中共享数据的, 我们可以单独使用Model功能

<br>

**注意:**  
我们使用 Model 的时候, 控制器方法的返回值还是String, 我们直接返回逻辑视图名即可

<br>

**Model 使用方式:**  
我们在控制器方法的形参位置 **声明 (Model model) 类型的形参**, 然后就可以直接使用 model 来往request域中共享数据

DispatcherServlet在调用我们的控制器方法的时候 会检查形参的类型, 然后帮我们为该类型的形参进行赋值

<br>

**<font color="#C2185B">model.addAttribute(String attrName, Object val)</font>**
向请求域中存数据

```java
@RequestMapping("/test/model")
public String testModel(Model model) {

  model.addAttribute("testRequestScope", "hello, model");

  return "success";
}
```

<br>

### 方式4: 使用 ModelMap
使用方式和 Model 一致

<br>

**注意:**  
我们使用 ModelMap 的时候, 控制器方法的返回值还是String, 我们直接返回逻辑视图名即可

```java
@RequestMapping("/test/modelMap")
public String testModel(ModelMap modelMap) {

  modelMap.addAttribute("testRequestScope", "hello, modelMap");

  return "success";
}
```

<br>

### 方式5: 使用 map
我们在控制器的方法形参中声明 Map 类型的参数, 然后我们直接放map中存放数据, 就可以将该数据放入到请求域中

```java
@RequestMapping("/test/map")
public String testMap(Map<String, Object> map) {
  map.put("testRequestScope", "hello, map");
  return "success";
}
```

<br>

### 为什么我们可以使用 Model ModelMap Map 都可以向request域中存数据呢?
- Model是接口
- ModelMap是具体的类
- Map是接口

当我们在方法中输出他们各自的类型时, 我们看看输出结果
```java
System.out.println(model.getClass().getName())
// org.springframework.validation.support.BindingAwareModelMap

System.out.println(modelMap.getClass().getName())
// org.springframework.validation.support.BindingAwareModelMap

System.out.println(map.getClass().getName())
// org.springframework.validation.support.BindingAwareModelMap
```

我们发现它们三个的类型都是一样的 都是BindingAwareModelMap

<br>

其实在底层中 上面三种方式 3种形参 它最终在进行实例化的时候 用到的都是同一个类型 都是 BindingAwareModelMap

<br>

**BindingAwareModelMap的继承和实现关系**  
所以我们要是使用BindingAwareModelMap的父类或者它实现的接口 都可以实现往请求域中共享数据的功能

```java
public class BindingAwareModelMap extends ExtendeModelMap {}


public class ExtendeModelMap extends ModelMap implements Model {}


public class ModelMap extends LinkedHashMap {}
```

<br><br>

# 向 Session域 和 Application域 中共享数据
我们向这两个域中存储数据的时候, 我们使用ServletAPI比较简单, SpringMVC中的方式比较繁琐

<br>

## 向 Session域 中共享数据
我们在控制方法的形参中添加 HttpSession类型的对象

```java
@RequestMapping("/test/session")
public String testSession(HttpSession session) {

  session.setAttribute("testSessionScope", "hello, session");

  return "success";
}
```

<br>

### 注意:
如果我们往session中存放的是实体类型的数据, 那这个实体类一定要实现可序列化的接口(因为要钝化和活化) 

<br><br>

## 向 Application域 中共享数据
我们在控制方法的形参中添加 HttpSession类型的对象

ServletContext我们可以**通过其他的域对象进行获取**  

```java
@RequestMapping("/test/application")
public String testApplication(HttpSession session) {

  // 通过其他的域对象获取 ServletContext 也就是 application域
  ServletContext context = session.getServletContext();

  context.setAttribute("testApplication", "hello, application");

  return "success";
}
```

<br>

### 测试:
**前台代码:**  
```html
<h3 th:text="${session.testSessionScope}"></h3>

<h3 th:text="${application.testApplication}"></h3>
```

<br>

### 扩展: 设置服务器关闭不清空session 
保留重启域重新部署之间的会话

在 tomcat配置的界面, 我们将 preserve sessions across restarts and redeploys 前面的对象勾上

<br>

### 扩展: Session的钝化和活化

**钝化:**  
我们的服务器关闭了, 我们session中的数据 会被保存到(钝化)我们当前的一个磁盘文件上, 钝化到Tomcat的work目录, 该目录下就是存放session的钝化文件的 还有jsp所翻译成的servlet的

<br>

**活化:**  
当我们的服务器重启启动后 就会将钝化文件中的数据 重新加载到我们当前的session中

<br>

所以只要我们的浏览器不管 哪怕是服务器关了 我们的session数据也可以通过钝化和活化 session的数据也不会消失

<br>

**注意:**   
我们要想实现session的钝化和活化的功能 我们一定要设置扩展1中的选项

<br>

类似localstorage + vuex中持久化存储文件的逻辑

<br><br>

# SpringMVC的视图
SpringMVC中的视图是View接口, 视图的作用就是渲染数据 将模型Model中的数据展示给用户

<br>

### SpringMVC的视图种类
SpringMVC视图的种类很多, 默认是转发视图 和 重定向视图

- ThymeleafView
- 转发视图: internalResourceView
- 重定向视图: RedirectView

<br>

- 当工程引入jstl的依赖, 转发视图会自动转换为jstlView 
```
当我们jsp页面中没有引入jstl时候 也就是没有使用jstl的标签的时候

我们创建的视图解析器为 转发视图internalResourceView
```

- 当使用的视图技术为 Thymeleaf, 在SpringMVC的配置文件中配置了 Thymeleaf视图解析器 由此视图解析器解析之后所得到的事 ThymeleafView

<br><br>

## ThymeleafView
ThymeleafView只跟控制器方法的返回值 也就是逻辑视图名有关, 如果我们的返回值没有任何前缀

那么该逻辑视图名称就会被SpringMVC配置文件中配置的ThymeleafViewResolver来解析

最终它会被解析成ThymeleafView

```java
@RequestMapping("/test/view/thymeleaf")
public String testThymeleafView() {
  return "success";
}
```

<br>

### 总结:
当我们控制器方法的返回值中没有任何前缀的时候 我们创建的就是 ThymeleafView

<br><br>

## 转发视图: InternalResourceView
如果创建一个转发视图呢? 我们上面说了 创建视图只跟逻辑视图名称有关系 或者说跟控制器方法的返回值有关

上面说了如果我们返回的逻辑视图名称前没有任何的前缀, 那么该逻辑视图会被ThymeleafViewResolver来解析 会创建 ThymeleafView

<br>

### 创建转发视图:
转发视图相当于, 也就是服务器内部转发, 可以转发到
- 服务器的某个接口
- webapp目录下的某个页面

```java
req.getRequestDispatcher(String path).forward(req, res)
```

<br>

**创建转发视图的方式:**  
利用控制器方法内部的返回值, 我们在返回值的前面加上 **forward:** 前缀

- forward:接口地址, /test/model
- forward:webapp下的页面, /a/b/c.html

```java
@RequestMapping("/test/view/forward")
public String testInternalResourceView() {
  // 创建转发视图: 转发到 /test/model 接口, 相当于在服务器内部重新访问了 /test/model 
  return "forward:/test/model";
}
```

<br>

### 说明: 从都是转发到 ThymeleafView 的角度谈
这个转发视图应用的场景不多 因为下面的两种方式都是转发
- return "success"
- return "forward:/test/model"

我们使用 ``return "forward:/test/model";`` 访问的 success.html 页面 它的实现过程是

forward是先转发到 /test/model, 然后在/test/model这个接口中处理完逻辑之后 转发到success.html页面的, 注意/test/model接口中 最后是return "success" 也就是创建的是 ThymeleafView

转发视图应用不多的原因是我们使用的最多的还是 ThymeleafView

如果我们使用forward转发到了WEB-INF下的页面, 这时候的这个页面是直接从服务器跳转到这个页面的

我们的页面中是有 Thymeleaf的语法的, 我们要是想Thymeleaf语法被解析的话 

**我们并不能直接跳转到该页面 我们是需要通过Thymeleaf的视图解析器解析当前的视图 我们才能解析Thymeleaf的语法 然后才能渲染页面 然后我们才能看到动态的数据**

<br>

**总结:**  
我们使用 return "success" 的方式跳转到 success.html 页面的话 该页面会被Thymeleaf解析加渲染 才能看到动态数据的

我们使用 return "forward:/test/model" 的方式跳转到 success.html 页面的话 就是简单的转发 并不会解析页面中的 Thymeleaf语法

<br><br>

## 重定向视图: RedirectView

### 创建转发视图:
重定向视图相当于 原生API中的

```java
res.sendRedirect("/test/model")
```

<br>

**创建转发视图的方式:**  
利用控制器方法内部的返回值, 我们在返回值的前面加上 **redirect:** 前缀, 重定向的地址会发生变化

<br>

```java
@RequestMapping("/test/view/redirect")
public String testRedirectView() {
  // 重定向到 /test/model, 也就是让浏览器再次发起请求访问 /test/model
  return "redirect:/test/model";
}
```

<br>
 
### 重定向中的/:
/是绝对路径, 重定向中/会被浏览器解析, 浏览器解析的绝对路径为 ``localhost:8080``

但是我们发现在SpringMVC中 ``redirect:/test/model`` 中的 / 可以正常跳转到服务器的地址 也就是 ``localhost:8080/工程名``

说明重定向视图在进行跳转的时候 它会自动为我们设置的绝对路径前面加上工程名的

所以在SpringMVC中创建重定向视图的时候 我们不需要考虑在/的后面加上工程名

<br>

### 说明:
一般我们在处理完请求后 我们会有两种方式实现页面的跳转
1. 转发视图
2. 重定向视图

<br>

**一般情况下是:**
- 当业务逻辑处理失败的情况下使用转发
- 当业务逻辑处理成功的情况下使用重定向

比如 登录成功使用重定向 登录失败使用转发

<br><br>

# 视图控制器 view-controller
如果我们在控制器方法中 return 逻辑视图名称 仅仅想实现页面跳转 没有任何的需求

这时我们就不需要再单独创建一个控制器方法来实现这个功能了 我们只需要在配置文件中写一个 view-controller标签 进行标识

<br>

## 示例:
比如我们访问/的时候 就要跳转到首页 之前我们会写如下的代码 因为我们的index.html在WEB-INF下, 所以我们需要这些写, 由servlet转发到WEB-INF下进行访问

```java
@RequestMapping("/")
public String portal() {
  return "index";
}
```

但是我们有了视图控制器后 我们就不需要单独的设置上面的控制器方法了 我们只要在配置文件中设置一个标签就可以

<br><br>

## 视图控制器的使用: mvc:view-controller标签
我们在springmvc的配置文件中使用该标签来处理请求, 实现页面的跳转

我们实现功能分为两步
1. 通过mvc:view-controller标签 设置什么请求来了跳转到那个页面

2. mvc:annotation-driven标签 开启注解驱动

<br>

### ``<mvc:view-controller>``标签
视图控制器, 它可以通过mvc:view-controller标签处理请求, 直接设置一个视图名称实现页面跳转

<br>

**标签属性:**  
- path: 指明要对哪个请求路径进行处理
- view-name: 当前端请求/的时候 我们设置的逻辑视图名称是谁

<br>

### 注意:
如果我们在springmvc配置文件中使用了视图控制器后, **这时只有视图控制器中path属性指明的请求才会被DispatcherServlet处理**

其它的请求就不会被处理 会报404错误, 所以我们**还需要开启mvc注解驱动**

<br>

### mvc:annotation-driven标签
开启mvc的注解驱动之后, 我们通过视图控制器配置的请求 和 @RequestMapping 配置的请求 **都会被处理**

```xml
<!-- 开启mvc的注解驱动 -->
<mvc:annotation-driven />
```

<br>

这个标签的功能非常的多, 不仅仅在这里用到 在其它的位置也会用到 都是要加上这个标签的
1. 处理静态资源的时候
2. 处理ajax请求 处理json数据的时候

<br>

**springmvc.xml配置文件**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans 
  xmlns="http://www.springframework.org/schema/beans"
       
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       
  xmlns:context="http://www.springframework.org/schema/context"
       
  xmlns:mvc="http://www.springframework.org/schema/mvc"
       
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

  <!-- 配置扫描 -->
  <context:component-scan base-package="com.sam.controller" />

  <!-- 配置Thymeleaf视图解析器 -->
  <bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <property name="order" value="1"/>
    <property name="characterEncoding" value="UTF-8"/>
    <property name="templateEngine">
      <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
        <property name="templateResolver">
          <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">

            <!-- 视图前缀 -->
            <property name="prefix" value="/WEB-INF/templates/"/>

            <!-- 视图后缀 -->
            <property name="suffix" value=".html"/>
            <property name="templateMode" value="HTML5"/>
            <property name="characterEncoding" value="UTF-8" />
          </bean>
        </property>
      </bean>
    </property>
  </bean>


  <!--
    视图控制器:
      它可以通过mvc:view-controller标签处理请求, 直接设置一个视图名称实现页面跳转

    path: 指明要对哪个请求路径进行处理
    view-name: 当前端请求/的时候 我们设置的逻辑视图名称是谁
  -->
  <mvc:view-controller
      path="/"
      view-name="index"></mvc:view-controller>

  <!-- 开启mvc的注解驱动 -->
  <mvc:annotation-driven />

</beans>
```

<br><br>

# Restful
Restful也叫做Restful风格, 它是一种开发的风格

<br>

## 概念
REST: representational state transfer 表现层资源状态转移

我们在学习java的时候 讲的是一切皆对象, 但是对于rest来说的话 它会将服务器中的所有内容都会看成是一种资源

**对应rest来说 它讲的是一切皆资源**, 每一个资源都是服务器上可命名的抽象概念

比如服务器上的如下内容都是资源
- 图片
- 音乐
- 文件
- 数据库中的表

我们如何表示这些资源? **通过名词来表示(就是这个资源的名字)** 

就如我们要找一个班级中的一个学生, 我们会通过一个名字来找, 同样我们要是在服务器中想找一个资源的话 我们也是通过这个资源的名字取找

比如我们现在访问的是服务器中的用户资源, 那么我们就起名为user

```
/user
就是给用户资源起的名字
```

我们之所以写成路径的格式, 是因为我们的路径是请求路径 我们就是通过请求路径来访问服务器中的资源的

也就是说我们要访问什么资源我们就要将其体现到路径中 我在路径中表示出当前的请求访问的是路径中的什么资源

<br>

我们既然是面向资源的 我们不管要对资源进行什么操作, 路径中只需要体现你具体要操作什么资源就可以

我们不管是查询用户 添加用户 修改用户 这些都是来操作用户资源的

所以我们就要在请求路径中将要操作的服务器中的资源的名字写上, 这样就可以表示我们访问的要操作的就是服务器中的user资源

<br>

所以在restful里面会要求 我们访问的资源是一样的 访问路径就是一样的

<br><br>

## Restful的实现
我们对每一个资源都有对应的操作方式, 比如对资源的查询 对资源的修改 删除 添加

既然我们访问同一个资源的路径是一样的 那么我们该如何表示我们对资源不同的操作方式呢？

这里我们就可以使用 http协议里面 表示操作方式的请求方法 

- get: 获取资源
- post: 新建资源
- put: 更新资源
- delete: 删除资源

<br>

### Restful的url风格
rest风格提倡url地址使用统一的风格设计, 从前到后各个单词使用斜杠分开

不使用?key=value的方式携带请求参数 而是将要发送给服务器的数据作为url地址的一部分, 以保证整体风格的一致性

<br>

|操作|传统方式|REST风格|
|:--|:--|:--|
|查询操作|getUserById?id=1|user/1 - get请求方式|
|保存操作|saveUser|user - post请求方式|
|删除操作|deleteUser?id=1|user/1 - delete请求方式|
|更新操作|updateUser|user - put请求方式|

<br><br>


