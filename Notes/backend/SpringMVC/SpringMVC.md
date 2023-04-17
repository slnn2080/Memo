# 创建SpringMVC工程

### 创建步骤
1. 创建 Maven模块
2. pom.xml添加依赖 修改打包方式为 war
3. 配置 web.xml
  1. 配置编码过滤器: 解决请求参数乱码问题
  2. 配置请求方式过滤器: 解决原生浏览器请求方式少的问题
  3. 配置SpringMVC前端控制器: ``<servlet>``
    1. 拦截所有请求
    2. 配置springmvc配置文件的位置
    3. 配置servlet初始化时间提前到服务器启动时
4. 创建springmvc.xml配置文件
  1. 配置扫描
  2. 配置Thymeleaf视图解析器
  3. 配置静态资源处理的servlet
  4. 开启mvc的注解驱动
  5. 配置视图控制器
  6. 配置文件上传解析器 (按需)
  7. 配置拦截器 (按需)
  8. 配置异常解析器 (按需)

<br>

**web.xml:**  
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
  <!-- 配置编码过滤器 -->
  <filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
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
    配置处理请求方式的过滤器:
      该过滤器只是针对浏览器的原生请求方式只有get post的问题

    如果我们使用ajax的话 这个过滤器可以不用设置
  -->
  <filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>


  <!-- 配置SpringMVC前端控制器 -->
  <servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
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

**springmvc.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">
  <!-- 配置扫描 -->
  <context:component-scan base-package="com.sam" />

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

  <!-- 配置默认的servlet来处理静态资源 -->
  <mvc:default-servlet-handler />


  <!-- 开启mvc的注解驱动 -->
  <mvc:annotation-driven />


  <!--
    视图控制器:
      它可以通过mvc:view-controller标签处理请求, 直接设置一个视图名称实现页面跳转

    path: 指明要对哪个请求路径进行处理
    view-name: 当前端请求/的时候 我们设置的逻辑视图名称是谁
  -->
  <mvc:view-controller
      path="/"
      view-name="index" />

  <mvc:view-controller
      path="/to/add"
      view-name="employee_add" />
</beans>
```

<br>

**pom.xml:**  
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.sam</groupId>
  <artifactId>spring_mvc_rest</artifactId>
  <version>1.0-SNAPSHOT</version>

  <packaging>war</packaging>

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
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>

    <!-- Spring5和Thymeleaf整合包 -->
    <dependency>
      <groupId>org.thymeleaf</groupId>
      <artifactId>thymeleaf-spring5</artifactId>
      <version>3.0.12.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.12.1</version>
    </dependency>

    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.3.1</version>
    </dependency>
  </dependencies>

  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
  </properties>

</project>
```

<br><br>

# IDEA properties 编码格式
![IDEA编码格式](/imgs/IDEA编码格式.png)

<br>

# 类路径:
我们放在 java目录 和 resources目录 下的文件, 在编译后都会在 /target/classes/ 目录下

- java文件在: /target/classes/com...包名下
- 配置文件在: /target/classes/配置文件

```
| - target
  | - classes
    | - com...
      - Student
    - spring.xml
```

<br>

而上面的 /classes 就是类路径, 我们在很多地方都会使用 **classpath:** 关键字来指定类路径之下的文件

<br><br>

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
- Spring 家族原生产品, 与 IOC 容器等基础设施无缝对接
```
SpringMVC的配置文件和Spring是一模一样的, 只不过我们用到的命名空间有所区别
```

- 基于原生的Servlet, 通过了功能强大的前端控制器DispatcherServlet, 对请求和响应进行统一处理
```
SpringMVC在封装Servlet的时候 将Servlet封装成了一个前端控制器 DispatcherServlet 

它可以对浏览器发送的请求 和 响应, 统一来进行处理 我们以后不需要自己创建Servlet 我们的请求和响应都是通过DispatcherServlet来处理的
```

- 表述层各细分领域需要解决的问题全方位覆盖, 提供全面解决方案

- 代码清新简洁, 大幅度提升开发效率

- 内部组件化程度高, 可插拔式组件即插即用, 想要什么功能配置相应组件即可
```
我们在使用SpringMVC的功能的时候 比如异常处理器 视图控制器 拦截器 

我们不需要额外的去写很多的代码, 我们只需要在springmvc的配置文件中 配置相对应的组件就可以

我们配置了组件就有效果, 不配置就没有效果
```

- 性能卓著, 尤其适合现代大型、超大型互联网项目要求

<br><br>

## 入门案例

### 开发环境
写的是老师的环境

```
IDE: idea 2019.2
构建工具: maven3.5.4
服务器: tomcat8.5
Spring版本: 5.3.1

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
由于 Maven 的传递性, 我们不必将所有需要的包全部配置依赖, 而是配置最顶端的依赖, 其他靠传递性导入。

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

<br>

因为jsp的本质是servlet, 我们jsp的访问方式都是.jsp

如果我们使用的是 ``/*`` 就意味着我们拦截的是所有请求, 包括.jsp这样的请求

但是有一点我们要知道, Tomcat将所有.jsp这样的请求都会交给tomcat内置的JspServlet程序来处理

<br>

Tomcat的web.xml
```xml
<servlet>
  <servlet-name>jsp</servlet-name>
  <servlet-class>org.apache.jasper.servlet.JspServlet</servlet-class>
  <init-param>
    <param-name>fork</param-name>
    <param-value>false</param-value>
  </init-param>
  <init-param>
    <param-name>xpoweredBy</param-name>
    <param-value>false</param-value>
  </init-param>
  <load-on-startup>3</load-on-startup>
</servlet>

<servlet-mapping>
  <servlet-name>jsp</servlet-name>
  <url-pattern>*.jsp</url-pattern>
  <url-pattern>*.jspx</url-pattern>
</servlet-mapping>
```

<br>

所以这里我们不能使用 /*, 而是要使用 /, 这样 .jsp 的请求会交给tomcat

剩下的请求会交给DispatcherServlet(因为它处理不了jsp, jsp要先翻译成servlet 然后我们再去访问这个servlet 将jsp页面中的所有内容 以响应的方式响应到浏览器 我们才能看到页面)

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

**注意:**  
当我们的控制器方法的返回值类型设置为void的时候, 它默认会将RequestMapping中的路径作为逻辑视图进行返回

如: 
```java
@RequestMapping("/test/down")
public void portal() {
  // 我们设置返回值类型为void
}
```

这是它返回的是 /test/down.html 

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

### 扩展: @GetMapping的 produces 属性
用于指定处理请求的控制器方法的响应类型的。**该属性的值是一个MIME类型**

它指示了控制器方法能够生成的响应内容类型。

如果客户端请求中指定的Accept标头与produces属性指定的MIME类型不匹配, **则控制器方法不会被执行。**

```java
@GetMapping(value = "/hello", produces = "text/plain")
// @GetMapping(value = "/hello", produces = "text/html;charset=utf-8")
@ResponseBody
public String hello() {
   return "Hello, World!";
}
```

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

**控制器中的形参默认就是用来接收?key=value这种格式的请求参数的**

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

<br>

**扩展:**  
上面的使用方式都是在 前端请求参数名 和 形参名不一致的时候使用该注解来接收前端参数 并绑定到指定的形参上

还有一种使用情况

前端请求参数可以用 基本数据类型 来接收的时候, 我们可以直接定义 Boolean flag 来接收前端传递的flag参数

但是如果我们要使用 复杂的数据类型来接收前端参数的时候 比如 ``List<Long> ids``, 那么它前面就要加上 @RequestParam 注解

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
- patch: 更新资源中的一个字段吧
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

# Restful的风格功能
我们要使用Restful风格的接口, 需要用到http方法
- get
- post
- put
- delete

但是我们浏览器表单默认能发送的请求方式只有get 和 post, 那put和delete怎么办?

<br>

### 要演示的内容
假设我们就要访问 用户资源 user, 那么我们请求地址统一会设置为 ``/user``, 面相服务器资源编程

<br>

**我们一条完整的增删改查有5套功能:**  
- 查询所有用户信息: get请求, 请求路径 /user

- 根据id查询某个用户信息: get请求, 请求路径 /user/1

- 添加用户: post请求, 请求路径 /user  
```
通过表单提交的方式 将参数提交到服务器
```

- 删除用户: delete请求, 请求路径 /user/1

- 修改用户: put请求, 请求路径 /user/1

<br><br>

## 创建SpringMVC工程

### 创建步骤
1. 创建 Maven模块
2. pom.xml添加依赖 修改打包方式为 war
3. 配置 web.xml
  1. 配置编码过滤器: 解决请求参数乱码问题
  2. 配置请求方式过滤器: 解决原生浏览器请求方式少的问题
  3. 配置SpringMVC前端控制器: ``<servlet>``
    1. 拦截所有请求
    2. 配置springmvc配置文件的位置
    3. 配置servlet初始化时间提前到服务器启动时
4. 创建springmvc.xml配置文件
  1. 配置扫描
  2. 配置Thymeleaf视图解析器
  3. 配置静态资源处理的servlet
  4. 开启mvc的注解驱动
  5. 配置视图控制器

<br>

### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
  <!-- 配置编码过滤器 -->
  <filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
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
    配置处理请求方式的过滤器:
      该过滤器只是针对浏览器的原生请求方式只有get post的问题

    如果我们使用ajax的话 这个过滤器可以不用设置
  -->
  <filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>


  <!-- 配置SpringMVC前端控制器 -->
  <servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
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

### springmvc.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">
  <!-- 配置扫描 -->
  <context:component-scan base-package="com.sam" />

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

  <!-- 配置默认的servlet来处理静态资源 -->
  <mvc:default-servlet-handler />


  <!-- 开启mvc的注解驱动 -->
  <mvc:annotation-driven />


  <!--
    视图控制器:
      它可以通过mvc:view-controller标签处理请求, 直接设置一个视图名称实现页面跳转

    path: 指明要对哪个请求路径进行处理
    view-name: 当前端请求/的时候 我们设置的逻辑视图名称是谁
  -->
  <mvc:view-controller
      path="/"
      view-name="index" />

  <mvc:view-controller
      path="/to/add"
      view-name="employee_add" />
</beans>
```

<br>

### 前台代码:
```html
<h1>首页</h1>
<hr>
<!--验证: Get请求-->
<a th:href="@{/user}">查询所有的用户信息</a>
<br>
<a th:href="@{/user/1}">根据id查询用户信息</a>
<hr>

<!--验证: Post请求-->
<form th:action="@{/user}" method="post">
  <input type="submit" value="添加用户信息">
</form>
```

<br>

### 验证发送 get 和 post 请求:
**要点:**  
要实现restful风格, 我们不仅要指定 请求路径, 还要指定 请求方式

我们既要通过路径表明我们要访问的资源 我们还要通过请求方式来表示我们对资源的操作方式

```java
@Controller
public class TestRestController {

  // 验证 get 相关请求:
  @RequestMapping(value = "/user", method = RequestMethod.GET)
  public String getAllUser() {

    System.out.println("功能: 查询所有用户信息, 请求路径: /user, 请求方式: get");

    return "success";
  }

  @GetMapping("/user/{id}")
  public String getUserById(@PathVariable("id") Integer id) {

    System.out.println("功能: 根据id查询用户信息, 请求路径: /user/" + id + ", 请求方式: get");

    return "success";
  }


  // 验证 post 相关请求:
  @PostMapping("/user")
  public String addUser() {

    System.out.println("功能: 添加用户信息, 请求路径: /user, 请求方式: post");

    return "success";
  }
}
```

<br>

### 验证发送 put & delete 请求
浏览器默认只提供get和post请求, 如果我们想要发送put等请求 **就需要使用过滤器**, 它可以帮助我们解决请求方式的问题

<br>

### 在 web.xml 配置文件中注册过滤器:   
注意我们选的过滤器的全类名, **同时该过滤器只是用来解决浏览器使用原生的方式发送请求的时候 只有get 和 post的问题**
```xml
<!-- 配置处理请求方式的过滤器 -->
<filter>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

<br>

**注意:**  
在 web.xml 文件中 如果我们要配置多个过滤器, 一定要保证编码过滤器在最上方

<br>

**使用HiddenHttpMethodFilter过滤器:**  
如果我们要发送 put 等请求, 需要做下面的两个操作
1. 将表单的请求方式修改为post
2. 使用隐藏域表单项, name="_method" value="实际请求方式"
```html
<input 
  type="hidden" 
  name="_method" 
  value="put">
```

<br>

**前台代码:**  
```html
<!--
  验证: Put请求
  1. 表单的提交方式为 post
  2. 隐藏域 - name: _method value: 实际请求方式
-->
<form th:action="@{/user/1}" method="post">
  <input type="hidden" name="_method" value="put">
  <input type="submit" value="修改用户信息">
</form>
```

<br>

**后台代码:**
```java
// 验证 put 相关请求:
@PutMapping("/user/{id}")
public String updateUser(@PathVariable("id") Integer id) {

  System.out.println("功能: 修改用户信息, 请求路径: /user/" + id + ", 请求方式: put");
  return "success";
}


// 验证 delete 相关请求:
@DeleteMapping("/user/{id}")
public String deleteUser(@PathVariable("id") Integer id) {
  System.out.println("功能: 删除用户信息, 请求路径: /user/" + id + ", 请求方式: delete");
  return "success";
}
```

<br>

### 问题: 删除资源
我们上面的删除一个user的时候, 使用的是form表单, 哪有用form表单来进行删除操作的 一般删除都是一个超链接进行删除

但是在restful里面我们要实现删除 是通过一个表单来进行删除 这样的删除功能就比较麻烦了

我们后续在Restful的增删改查中我们再好好的看看

<br><br>

## Restful案例相关
我们还实现对员工信息的增删改查

<br>

### 实体类:
```java
public class Employee {
  private Integer id;
  private String lastName;
  private String email;
  // 1: male, 0: female
  private Integer gender;
}
```

<br>

### DAO层
该层的数据是写死的

```java
package com.sam.dao;

import com.sam.pojo.Employee;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class EmployeeDao {

  // 声明一个静态Map集合
  private static Map<Integer, Employee> employees = null;

  // 静态代码块中为 Map集合 进行赋值
  static{
    employees = new HashMap<Integer, Employee>();

    employees.put(1001, new Employee(1001, "E-AA", "aa@163.com", 1));
    employees.put(1002, new Employee(1002, "E-BB", "bb@163.com", 1));
    employees.put(1003, new Employee(1003, "E-CC", "cc@163.com", 0));
    employees.put(1004, new Employee(1004, "E-DD", "dd@163.com", 0));
    employees.put(1005, new Employee(1005, "E-EE", "ee@163.com", 1));
  }

  // Map集合初始化后有5个, 它标识着下一个id, 如果我们要添加一个新的员工的话, 可以使用它
  private static Integer initId = 1006;

  // 添加 / 修改 一个员工信息
  public void save(Employee employee){

    if(employee.getId() == null){
      // 先赋值再自增 将1006赋值给这个员工, initId会自增
      employee.setId(initId++);
    }

    // 相同的key不能的值 新的值就会覆盖原有的值
    employees.put(employee.getId(), employee);
  }

  // 获取所有的员工
  public Collection<Employee> getAll(){
    return employees.values();
  }

  // 根据id查找一个员工
  public Employee get(Integer id){
    return employees.get(id);
  }

  // 根据id删除一个员工
  public void delete(Integer id){
    employees.remove(id);
  }
}
```

<br>

### 功能清单
|功能|URL|地址|请求方式|
|:--|:--|:--|:--|
|访问首页|/|GET|
|查询所有员工信息|/employee|GET|
|删除员工信息|/employee/2|DELETE|
|新增员工信息|/employee|POST|
|修改员工信息|/employee|PUT|
|跳转到添加数据页面|/to/add|GET|
|跳转到修改数据页面|/employee/2|GET|

<br>

### Restful实现: 查询功能

**前台员工列表页面:**  
我们使用 Thymeleaf功能 从请求域中获取数据, 将数据展示到页面上

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

<table>
  <tr>
    <th colspan="5">员工列表页面</th>
  </tr>
  <tr>
    <th>id</th>
    <th>last_name</th>
    <th>email</th>
    <th>gender</th>
    <th>options</th>
  </tr>
  <tr th:each="emp: ${employees}">
    <td th:text="${emp.id}"></td>
    <td th:text="${emp.lastName}"></td>
    <td th:text="${emp.email}"></td>
    <td th:text="${emp.gender}"></td>
    <td>
      <a href="">delete</a> &emsp; <a href="">update</a>
    </td>
  </tr>
</table>


<script>

</script>
</body>
</html>
```

<br>

**后台控制器层:**  
当我们在自动装配中发现如下的错误时
```
could not autowired no beans of "employeeDao" type found, 找不到bean
```

<br>

出现bean找不到的问题 可能有两个原因
1. 我们的类上没有加注解
2. 我们配置的扫描有问题

因为我们添加了注解 那么只可能是扫描的问题, 我们配置文件中扫描的只有控制层, 我们把 扫描的包 修改为 com.sam.controller -> com.sam

<br>

**逻辑:**  
1. 获取员工的信息
2. 将数据保存到请求域
3. 跳转到页面上

```java
@Controller
public class EmployeeController {

  @Autowired
  private EmployeeDao employeeDao;


  // 查询所有的员工信息
  @GetMapping("/employee")
  public String getAllUser(Model model) {

    // 获取所有的员工信息
    Collection<Employee> employees = employeeDao.getAll();

    // 将获取到的员工信息放到请求域中
    model.addAttribute("employees", employees);

    // 跳转到列表页面
    return "employee_list";
  }
}
```

<br><br>

## 静态资源404的问题

### 描述:
我们上面将获取的用户信息保存到request域中后, 在员工列表页面模版中进行渲染数据 但是该页面没有样式, 所以我们将css js等静态资源文件 存放在 /webapp/static 的目录下  
并在页面中引入使用

```html
<link rel="stylesheet" th:href="@{/static/css/index_work.css}">
```

<br>

但是出现了问题, 所有的静态资源报了 404 错误 没有找到

<br>

### 扩展: 静态资源的存放位置
我们将静态资源放在 webapp目录下
```
| - src
  | - main
    | - java
    | - resources
    | - webapp
      | - WEB-INF
      | - static  -- 静态资源
```

<br>

**注意:**  
我们中途导入的静态资源, **建议从新打下包**, 不然war包中可能没有我们刚导入的资源

```
- Maven面板
  - Lifecycle
    - clean
    - package
```

<br>

### 引入静态资源路径中的 /
我们是通过如下的方式导入静态资源的, 发现我们使用的是 /

```html
<link rel="stylesheet" 
th:href="@{/static/css/index_work.css}">
```

<br>

我们项目在经过打包后, 会产生war包, war包中的结构我们可以观察 target目录, 发现
- 我们项目中的所有代码都是webapp目录下, 但war里面是没有webapp这个外层目录的, webapp中的内容直接作为war包目录下的子目录, 或者可以理解为将webapp修改名称为war
- java文件会在WEB-INF
- static文件目录和WEB-INF同级

```
| - static
| - WEB-INF
  | - classes: 我们的java文件
  | - lib: 我们的依赖包
  | - templates
```

所以我们直接访问 static 再访问 static 中的内容就可以了

<br>

### 静态资源404问题的原因
我们在使用SpringMVC的时候 在web.xml文件中配置了 前端控制器(DispatcherServlet) 并且配置了url-pattern为/,  
意思是说拦截所有的请求 交由DispatcherServlet来处理

```xml
<servlet-mapping>
  <servlet-name>SpringMVC</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>
```


静态资源也一样, 浏览器会向服务器发送请求来访问css文件, 既然是发请求, 它同样会被DispatcherServlet来处理

<br>

我们写的是/, 写/就代表除了jsp请求匹配不到, 但是其它的请求都能匹配到 所以我们访问静态资源的请求也会被DispatcherServlet来处理

而DispatcherServlet处理请求的方式是 我们需要在控制层写方法来处理请求 当@RequestMapping("url") 中写的url跟我们要处理的请求的请求路径一致的时候 就会通过该注解所标识的方法来处理该次请求

**我们访问不到静态资源的原因 就是因为静态资源被DispatcherServlet拦截, 可是它并没有处理静态资源的能力**

<br>

**Tomcat的web.xml 和 项目中的 web.xml的区别:**   
Tomcat的配置文件, 有一个DefaultServlet 它的作用就是**专门来处理当前的静态资源的**

注意: DefaultServlet的url-pattern拦截的也是 /
```xml
<servlet>
  <servlet-name>default</servlet-name>
  <servlet-class>
    org.apache.catalina.servlets.DefaultServlet
  </servlet-class>
  <init-param>
      <param-name>debug</param-name>
      <param-value>0</param-value>
  </init-param>
  <init-param>
      <param-name>listings</param-name>
      <param-value>false</param-value>
  </init-param>
  <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
  <servlet-name>default</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>
```

<br>

这里问题就来了, 上面的web.xml是属于Tomcat的, 这个配置文件是作用于当前部署到Tomcat上所有的工程的

我们模块中的web.xml只作用于我们当前的模块(工程)本身 我们可以认为, 两个web.xml在逻辑上是继承的关系

也就是说我们模块中的web.xml会继承Tomcat的web.xml中的配置, 同理当模块中的web.xml和Tomcat的web.xml有相同配置的时候 会以模块中的web.xml为准

现在的问题是, 不同的servlet的url-pattern冲突了, 当两个配置文件中的配置项发生冲突的时候, 这时就以我们工程中的web.xml为准, 所以出问题了  

<br>

y因为我们当前的所有请求都会被DispatcherServlet来进行处理(包括静态资源)

- DefaultServlet(tomcat): 配置的 /
- DispatcherServlet(项目): 配置的 /

但是DispatcherServlet处理不了静态资源, 只有默认的DefaultServlet才能处理静态资源

<br>

### 解决方式:
我们在 springmvc.xml 配置文件中, 追加一个标签 

```xml
<!-- 配置默认的servlet来处理静态资源 -->
<mvc:default-servlet-handler />

<!-- 开启mvc的注解驱动 -->
<mvc:annotation-driven />
```

<br>

**作用:**  
使用 DefaultServlet 来**处理静态资源**    
如果我们不配置这个标签 我们的所有请求都是被DispatcherServlet来处理的

<br>

**注意:**  
该标签必须和 ``<mvc:annotation-driven />`` 联合使用 如果我们只配置了 ``<mvc:default-servlet-handler />`` 标签那么所有的请求都会有 DefaultServlet 来处理

<br>

只有同时配置了两个标签, 这时浏览器发送的请求会先被DispatcherServlet来处理, 当它处理不了的时候会交由DefaultServlet来进行处理 所以

- 静态资源会交由 -> DefaultServlet
- 其它请求会交由 -> DispatcherServlet

<br>

**完整的springmvc.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">
  <!-- 配置扫描 -->
  <context:component-scan base-package="com.sam" />

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

  <!-- 配置默认的servlet来处理静态资源 -->
  <mvc:default-servlet-handler />

  <!--
    视图控制器:
      它可以通过mvc:view-controller标签处理请求, 直接设置一个视图名称实现页面跳转

    path: 指明要对哪个请求路径进行处理
    view-name: 当前端请求/的时候 我们设置的逻辑视图名称是谁
  -->
  <mvc:view-controller
      path="/"
      view-name="index" />

  <!-- 开启mvc的注解驱动 -->
  <mvc:annotation-driven />
</beans>
```

<br><br>

## Restful实现: 添加功能

### 前台页面
我们在 options 处 设置了超链接 它会发起请求到控制层, 这时我们注意 该超链接的功能只是为了页面跳转 并没有其他的逻辑 所以我们可以将纯页面跳转的功能配置为视图控制器

```html
<table>
  <tr>
    <th colspan="5">员工列表页面</th>
  </tr>
  <tr>
    <th>id</th>
    <th>last_name</th>
    <th>email</th>
    <th>gender</th>
    <th>options(<a th:href="@{/to/add}">add employee</a>)</th>
  </tr>
  <tr th:each="emp: ${employees}">
    <td th:text="${emp.id}"></td>
    <td th:text="${emp.lastName}"></td>
    <td th:text="${emp.email}"></td>
    <td th:text="${emp.gender}"></td>
    <td>
      <a href="">delete</a> &emsp; <a href="">update</a>
    </td>
  </tr>
</table>
```

<br>

**springmvc.xml**  
我们将纯是页面跳转的功能, 在springmvc.xml配置文件中配置视图控制器

当请求/to/add的时候 会跳转到employ_add页面

```xml
<mvc:view-controller
  path="/to/add"
  view-name="employ_add" />
```

<br>

### 前台添加员工信息页面:
这里我们表单项的name值设置为 lastName

因为我们要收集员工信息 我们就可以在控制器方法中 通过一个实体类对象来接收

那我们就要保证 我们传输过去的请求参数名 和 实体类中的属性名一致, 所以我们name要设置为lastName

```html
<form th:action="@{/employee}" method="post">
  <table>
    <tr>
      <th colspan="2">add employee</th>
    </tr>
    <tr>
      <td>lastName</td>
      <td><input type="text" name="lastName"></td>
    </tr>
    <tr>
      <td>email</td>
      <td><input type="text" name="email"></td>
    </tr>
    <tr>
      <td>gender</td>
      <td>
        <input type="radio" name="gender" value="1"> male
        <input type="radio" name="gender" value="0"> female
      </td>
    </tr>
    <tr>
      <td colspan="2"><input type="submit" value="提交"></td>
    </tr>
  </table>
</form>
```

<br>

### 添加员工信息的控制层方法
restful风格的接口设计, post + /employee 实现添加操作

<br>

**要点1: 获取前台的请求参数**  
1. 我们可以在形参的位置一个个的获取 如: (Stirng lastName ...)

2. 如果当前的数据比较多的时候 我们可以通过实体类的参数来进行获取 我们只要保证实体类中的属性 和 前台请求传递过来的参数一致就可以

<br>

**要点2: 添加数据后跳转页面**  
我们保存数据成功后 要让用户看到添加的效果 所以我们要重新跳转到员工列表页面

注意, 我们要跳转到/employee这个获取所有员工信息并保存到request域中的接口

因为我们直接跳转到 employee_list 页面是没有数据的

<br>

**我们使用重定向: return "redirect:/employee";**  

因为我们使用服务器内部转发的话, 地址栏是不变的 如果这时刷新页面可能会造成表单的再次提交

<br>

```java
@PostMapping("/employee")
// 方式2获取前台的请求参数
public String addEmployee(Employee emp) {
  employeeDao.save(emp);

  // 验证是否添加成功
  Collection<Employee> employees = employeeDao.getAll();
  employees.forEach(System.out :: println);

  // 跳转到列表页面
  return "redirect:/employee";
}
```

<br><br>

## Restful实现: 修改功能

### 逻辑:
我们点击 update 的超链接后, 要发起get请求到指定的控制层的方法内, 方法内主要是根据id查询到指定用户的信息 然后将其放入到请求域中, 并跳转到修改用户信息的页面回显该用户的信息

修改用户信息会用表单, 我们在该页面上修改用户信息再次提交表单 发起put请求 修改用户信息

<br>

### 前台页面:
注意我们拼接动态参数的方式
```html
<a th:href="@{'/employee/'+${emp.id}}">update</a>
```

**错误演示:**  
我们不能如下的拼接动态参数
```html
<a th:href="@{/employee/${emp.id}}">update</a>
```

因为 @{...} 中的部分都会被thymeleaf当做是路径来解析, 它不会将${emp.id}当做是表达式 获取对应的值

@{/employee/${emp.id}} 会被解析为: 
```
/employee/$%7Bemp.id%7D
```

@{/employee/(${emp.id})}, 这样传递也是错的 该方式解析后是 ?key=value, 传参的时候也要是(key=value)
```
employee/?1005
```

<br>

**修改为:**  
```
@{'/employee/'+${emp.id}}
```
'/employee/': 这个部分会被thymeleaf当做路径来解析

<br>

### 控制层方法: 获取指定用户信息

**根据用户id查询指定用户信息, 并跳转到修改页面:**  
```java
@GetMapping("/employee/{id}")
public String getUserById(@PathVariable("id") Integer id, Model model) {

  // 根据id获取员工信息
  Employee employee = employeeDao.get(id);

  // 保存到request域中
  model.addAttribute("employee", employee);

  // 跳转到修改用户界面
  return "employee_update";

}
```

<br>

### 修改用户信息页面:

**要点1:**  
我们使用隐藏域来发起put请求

<br>

**要点2:**  
我们使用隐藏域携带用户id 因为我们修改 和 添加用户信息 是根据是否有id来判断的

<br>

**要点3:**  
单选框的回显要使用 th:field, 当th:field指定的值 和 value的值一致的时候 就是true 该单选框就会被选中

```html
<form th:action="@{/employee}" method="post">
  <input type="hidden" name="_method" value="put">
  <input type="hidden" name="id" th:value="${employee.id}">
  <table>
    <tr>
      <th colspan="2">update employee</th>
    </tr>
    <tr>
      <td>lastName</td>
      <td><input type="text" name="lastName" th:value="${employee.lastName}"></td>
    </tr>
    <tr>
      <td>email</td>
      <td><input type="text" name="email" th:value="${employee.email}"></td>
    </tr>
    <tr>
      <td>gender</td>
      <td>
        <input type="radio" name="gender" value="1" th:field="${employee.gender}"> male
        <input type="radio" name="gender" value="0" th:field="${employee.gender}"> female
      </td>
    </tr>
    <tr>
      <td colspan="2"><input type="submit" value="提交"></td>
    </tr>
  </table>
</form>
```

<br>

### 控制层方法: 处理修改用户的方法
修改完后我们重定向到员工列表功能
```java
@PutMapping("/employee")
public String updateUser(Employee emp) {
  employeeDao.save(emp);
  return "redirect:/employee";
}
```

<br>

## Restful实现: 删除功能
我们在restful风格中, 我们点击的是超链接, 但是超链接只能发起get请求 而我们需要发起的是delete请求, 发送delete请求在html中只能通过表当的形式

下面我们就说下如何通过超链接来控制表单的提交

<br>

### 逻辑:
我们点击 a标签 阻止a标签的默认行为, 同时绑定事件, 将a标签的href属性赋值给 form的action属性

然后通过点击a标签手动调用表单的提交, 这样提交地址中就会带有该员工的id

<br>

### 前台代码
```html
<!-- 
  如果我们要往delHandler中传入 emp.id 需要
  th:onclick="delHandler([[${emp.id}]])"
-->
<a onclick="delHandler(this)" th:href="@{'/employee/'+${emp.id}}">delete</a>


<form id="form" method="post">
  <input type="hidden" name="_method" value="delete">
</form>


<script>
  // 标签中传入this 我们来接收this
  function delHandler(target) {
    // 阻止默认行为
    event.preventDefault()

    // 拿到a标签的href
    let href = target.href

    // 将href赋值给form的action
    let form = document.querySelector("#form")
    form.action = href

    // 表单提交
    form.submit()
  }
</script>
```

<br>

**请求地址:**  
```s
http://localhost:8080/spring_mvc/employee/1003
```

<br>

### 后台代码
```java
@DeleteMapping("/employee/{id}")
public String deleteUser(@PathVariable("id") Integer id) {
  employeeDao.delete(id);
  return "redirect:/employee";
}
```

<br><br>

# SpringMVC处理Ajax请求
前台请求时携带参数的方式不同, 服务器获取参数的方式也不同
这里我们拿axios来举例

<br>

### 扩展: Axios中的绝对路径
我们在axios中的url配置项中写绝对路径的话 它是由浏览器来解析的, 解析的结果会少上下文路径

1. 我们手动添加 上下文路径
2. 我们写完全的路径

```js
axios({
  url: "/spring_mvc/test/ajax"
  url: "http://localhost:8080/spring_mvc/test/ajax" 
})
```

<br>

**注意:**  
我们不能在js代码中使用 thymeleaf 语法

<br><br>

## 获取params配置项携带的参数
如果axios中, 我们通过 params 携带的参数, 后台的获取方式为:

<br>

### 原生方式:
使用 ``req.getParameter()`` 来获取

<br>

### SpringMVC获取方式: 
我们直接通过控制器方法的形参来获取就可以

<br><br>

## 获取data配置项携带的参数
如果axios中, 我们通过 data 携带的参数, **此时它是JSON格式发送到后台的**, 后台的获取方式为:

<br>

### 原生方式: 
我们需要使用处理JSON的jar包, 如:GSON, FastJson, 通过这写jar包将Json格式的数据转换为Java对象

<br>

### SpringMVC获取方式:
### **<font color="#C2185B">@RequestBody:</font>** 

**作用:**  
获取请求体中的数据, 如果我们在形参的位置使用该注解, 那么就会将请求体中的数据赋值给当前注解标识的形参

<br>

**使用位置:**  
控制器方法的形参位置

<br>

**body的类型:**  
如果是JOSN格式的数据, 它就是前台发送过来的字符串, **所以形参的类型要声明为 String**

<br>

```java
@RequestMapping(value = "/test/ajax", method = RequestMethod.POST)

public void testAjax( // 方法的返回值为 void
  Integer id, 
  @RequestBody String body,
  HttpServletResponse res

) throws IOException {
    /*
      前台发送过来的请求参数有两种
      1. url?key=value
      2. json

      方式1: 发送过来的数据, 我们可以直接在控制器方法中的形参接收
    */
    System.out.println("body: " + body);
    // body: {"username":"sam","password":"123456"}

    res.getWriter().write("hello, axios");
  }
```

<br><br>

## 服务器端 处理JSON格式的数据
上面前台发送了ajax请求, 向服务器响应了一个json格式的数据, 后台利用 @RequestBody 注解将该数据赋值给了 String类型的body 我们拿到的数据就是JSON格式的字符串

该JSON格式的数据需要在服务器端解析还原为对象

```
{"username":"sam","password":"123456"}
```

<br>

### 观察:
我们发现这个JSON和 实体类对象 和 Map集合 都很像, 都是键值对

<br>

### SpringMVC中处理JSON格式数据的方式
这里我们就可以使用SpringMVC为我们提供的方式, **将其转换为实体类对象 或者是 Map集合**

<br>

### **<font color="#C2185B">@RequestBody:</font>** 
也是使用该注解将JSON格式的数据转换为Java层面的对象
- 请求参数有对应的实体类 我们就转成实体类类型
- 请求参数没有对应的实体类 我们就转成Map集合类型

<br>

**要处理JSON数据要满足如下的条件:**  
1. 导入 jackson 依赖: SpringMVC默认是调用jackson来实现的
```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId> 
  <artifactId>jackson-databind</artifactId>
  <version>2.12.1</version>
</dependency>
```

2. 在SpringMVC的配置文件中设置 开启mvc注解驱动 ``<mvc:annotation-driven />``

3. 在处理请求的**控制器方法的形参位置**, <font color="#C2185B">直接设置json格式的请求参数要转换的java类型的形参, 使用@RequestBody注解标识即可</font>
  - 比如要将json转换为实体类类型: 那么形参就声明为实体类类型
  - 比如要将json转换为Map集合: 那么形参就声明为Map集合类型

<br>

**总结:**  
和上面的使用方式一致, 上面我们是使用 @RequestBody注解 将json格式的请求参数赋值给了 String类型的变量

现在我们是 @RequestBody注解 将json格式的请求参数赋值给了 **Map类型** 或 **实体类类型** 的变量

<br>

**代码: 使用 Map集合方式 接收 data配置项携带过来的参数**  

```java
@RequestMapping(value = "/test/ajax", method = RequestMethod.POST)
public void testAjax(
  Integer id, 
  // 使用RequestBody注解标识 Map
  @RequestBody Map<String, Object> params,
  HttpServletResponse res
) throws IOException {

  System.out.println("map: " + params);
  // {username=sam, password=123456}

  String username = (String) params.get("username");
  System.out.println(username);
  // sam

  res.getWriter().write("hello, axios");
}
```

<br>

**代码: 使用 实体类方式 接收 data配置项携带过来的参数**  
前台请求的参数都是 username password 等所以我们可以创建一个User JavaBean

我们在参数位置使用RequestBody注解标识 User类型的参数

```java
@RequestMapping(value = "/test/ajax", method = RequestMethod.POST)
public void testAjax(
  Integer id, 
  // 使用RequestBody注解标识 User
  @RequestBody User user,
  HttpServletResponse res
) throws IOException {

  System.out.println("user: " + user);
  // User{username="sam", password="123456"}

  res.getWriter().write("hello, axios");
}
```

<br><br>

## 向浏览器端响应数据

### 原生方式: 
我们会使用 ``getWrite().write()`` 的方式向浏览器响应数据

**要点:**  
1. 前台传递的url参数我们在控制器方法的形参位置接受
2. 使用原生res对象时 直接在形参位置声明 res
3. 控制器方法的返回值为void

```java
@RequestMapping(
  value = "/test/ajax", 
  method = RequestMethod.POST)
public void testAjax(Integer id, HttpServletResponse res) throws IOException {

  res.getWriter().write("hello, axios");
}
```

<br>

**注意:**  
我们使用 writer.print() 响应会一个对象, 我们响应回的会是一个该对象的内存地址

如果使用原生的方式的话, 我们需要利用json, 我们需要响应会一个json数据

<br>

### SpringMVC的方式: 
一般我们响应到浏览器的数据都是Java对象

<br>

**为什么响应回浏览器的会是一个Java对象:**  
我们做的是浏览器和服务器之间的交互 我们写的是后台代码, 如果我们响应回浏览器的数据都是五花八门各种各样的

一个请求响应回去的是字符串, 另外一个请求响应回去的是Json, 其它请求响应回去的是true和false

这样对前后台的交互就非常的麻烦, 我们每一次还要关注我们响应回去的是什么 我们才可以去处理这个数据

<br>

我们观察一些成型的项目, 一般来说我们响应会前台的数据 都是一些固定的格式

比如我们响应回去的数据里面会有boolean类型标识操作成功或失败 message是响应到浏览器的信息 data响应到浏览器的数据

像这种固定的格式的数据结构 我们就可以将其创建为一个实体类, 然后以这个实体类作为标准类型然后响应到浏览器, 所以一般我们响应到浏览器的都是一个java对象

<br>

### **<font color="#C2185B">@ResponseBody:</font>** 

**作用:**  
被该注解标识的控制器方法, 该方法的返回值直接作为响应报文的响应体 响应到浏览器, 也就是说 **返回值就是响应的数据**

**注意控制器方法的返回值类型哦, 该返回值会被响应回浏览器**

<br>

**使用位置:**  
标识一个控制器方法

<br>

**使用@ResponseBody响应JSON数据:**  
使用 @ResponseBody 注解标识控制器方法就可以将java对象直接转换为json字符串, 并响应回浏览器

1. 导入 jackson 依赖
2. 在SpringMVC的配置文件中设置 开启mvc注解驱动 ``<mvc:annotation-driven />``
3. 将需要转换为json字符串的java对象 **直接作为控制器方法的返回值** 

<br>

**演示:**
```java
@RequestMapping(value = "/test/ajax", method = RequestMethod.POST)
@ResponseBody
public User testAjax(Integer id, @RequestBody User user) throws IOException {

  user.setId(id);

  /*
    1. 控制器方式的返回值设置为User
    2. 直接 return user 对象, 该java对象直接会转换为json字符串, 并响应回浏览器
  */
  return user;
  
}
```

<br>

### 控制器方法中的异常
当我们在控制器方法中使用某些API的时候 这些api可能会抛出异常

控制器方法不是我们自己调用的 所以我们选择 **throws**

- 如果是我们自己调用的方法 我们要选择try catch
- 如果不是我们自己调用的方法 我们要选择 throws

<br>

### 处理 axios - post - params + data 请求

**前台代码:**  
```java
let btn = document.querySelector("button")
btn.addEventListener("click", async () => {
  let {data: res} = await axios({
    url: "http://localhost:8080/spring_mvc/test/ajax",
    method: "post",
    params: {
      id: 1001
    },
    data: {
      username: "sam",
      age: 18
    }
  })

  console.log("响应结果:", res)
})
```

<br>

**params配置项:**  
不管是get请求还是post请求, 只要我们使用 params 的方式进行传参, 那么参数都是被拼接到url上

<br>

**data配置项:**  
使用data方式携带的参数 会以JSON格式发送到服务器

<br>

**后台代码:**  
我们下面将请求参数使用User对象来接收, 然后设置了该User对象的id, 并将其响应回客户端

```java
@Controller
public class TestAjaxController {

  @RequestMapping(value = "/test/ajax", method = RequestMethod.POST)
  @ResponseBody
  public User testAjax(Integer id, @RequestBody User user) throws IOException {

    user.setId(id);
    return user;



    // 响应一个Map集合
    Map<String, Object> map = new HashMap<>();
    map.put("1001", user1);
    map.put("1002", user2);
    map.put("1003", user3);

    return map;



    // 响应一个List集合
    List<User> list = Arrays.asList(user1);
    return list;

  }
}
```

<br>

### 常用的Java对象 转换为 Json 的结果:
- 实体类 -> Json对象
- Map集合 -> Json对象
- List集合 -> Json数组

<br>

### **<font color="#C2185B">@RestController: 复合注解</font>**  
上面我们说了 当我们需要响应回浏览器数据的时候 通常都会使用 **@ResponseBody** 注解来标识控制器方法

而@ResponseBody注解使用的场景是非常多的, 甚至我们控制层里面所有的控制方法都需要加上@ResponseBody注解

<br>

那么结合@ResponseBody注解 和 @Controller注解就有了复合注解: @RestController

<br>

**作用:**  
@RestController相当于我们在类上添加了@Controller注解 和 为类中所有的控制器方法都加上了@ResponseBody注解

我们在类上使用了该注解后, 就不需要在每个控制器方法上加上@ResponseBody了

<br>

**位置:**  
使用在类上

<br><br>

# SpringMVC实现: 文件的上传 和 下载
不管是SpringMVC还是Servlet原生的上传下载, 它们的思路都是一样的 不过是写法上的区别

文件上传还是下载都是文件复制的过程, 这里都涉及到了IO流
- 文件下载: 是将文件从服务器复制到浏览器 
- 文件上传: 是将文件从浏览器复制到服务器

<br>

**Servlet原生的上传和下载:**  
这时候我们会创建一个输入流 来读取这个文件 再创建一个输出流 将其输出到相对应的位置就可以

比如下载我们就将其输出到浏览器, 下面我们看看SpringMVC中是如何实现下载功能的

<br><br>

## SpringMVC文件下载:
在SpringMVC中要实现文件下载我们需要用到一个类 **ResponseEntity类**

<br>

### SpringMVC文件下载的步骤:
**1. 通过session获取ServletContext对象, 并获取文件在服务器上的真实位置**  
我们既然要实现文件的下载功能 也就是我们要实现文件的复制 那我就要知道当前要下载的文件在服务器的位置 

所以我们要通过session来获取服务器上下文, 然后调用它的方法拿到图片在服务器上的路径
```java
ServletContext servletContext = session.getServletContext();
String realPath = servletContext.getRealPath("/static/img/二重ログイン対策.png");
// realPath = /Users/liulin/Desktop/Sam/SSM/spring_mvc_rest/target/spring_mvc_rest-1.0-SNAPSHOT/static/img/二重ログイン対策.png
```

<br>

**要点:**  
**<font color="#C2185B">servletContext.getRealPath("")</font>**  
该方法如果传入空字符串 会返回当前工程在服务器中的位置
```
/Users/liulin/Desktop/Sam/SSM/spring_mvc_rest/target/spring_mvc_rest-1.0-SNAPSHOT/
```

- 如果是Maven工程返回的为: target目录下
- 如果是普通的工程返回的为: out目录下

<br>

**推荐方式:**  
因为上述方法如果我们传入的是空字符串, 返回的是当前工程所在的目录, 所以我们往参数位置传入的任何路径 都是在 工程路径后面拼接指定路径

```java
servletContext.getRealPath("img")

// 拼接
/Users/liulin/Desktop/Sam/SSM/spring_mvc_rest/target/spring_mvc_rest-1.0-SNAPSHOT/ + img
```

<br>

为了避免不同系统下的斜线问题 推荐如下的写法:
```java
// 写到文件的上层目录
String realPath = servletContext.getRealPath("/static/img");

// 利用api拼接文件
realPath = realPath + File.pathSeparator + "二重ログイン対策.png";
```

<br>

**2. 创建输入流将文件读入内存中**  
```java
FileInputStream is = new FileInputStream(realPath);
byte[] bytes = new byte[is.available()];
is.read(bytes);
```

我们这里创建bytes时指定的长度利用了 ``is.available()`` api

``is.available()`` 获取字节输入流对应的文件的所有字节数 文件有多少字节 我们就创建多少长度的数组 我们是想将该文件对应的字节**一次性**的响应到浏览器 所以我们使用该方法将文件对应的字节读到数组中

<br>

**3. 使用 ResponseEntity类 封装响应报文, 并将该响应报文响应回浏览器**

<br>

**4. 控制器方法的返回值类型设置为: ``ResponseEntity<byte[]>``**

<br>

### ResponseEntity类的使用
它可以作为控制器方法的返回值, 表示响应到浏览器的完整的响应报文

这样我们只需要将响应报文的响应体设置为我们当前要下载的文件 这样我们就可以将文件响应到浏览器了

<br>

### ResponseEntity类的实例化: 
### **<font color="#C2185B">new ResponseEntity(byte[] body, String headers, HttpStatus status)</font>**

<br>

**参数:**  
ResponseEntity表示一个完整的响应报文, 所以实例化它的时候需要如下的3个参数
1. byte[] body: 响应体
2. String headers: 响应头
3. HttpStatus status: 响应状态码

<br>

**泛型:**  
``ResponseEntity<byte[]>``  
表示要响应到浏览器的数据的类型, 我们要将文件传输到浏览器 所以使用的是 byte[]

<br>

### 扩展: HttpStatus枚举类
下表标识状态码和状态码对应的状态字符串

|枚举类属性|状态码|
|:--|:--|
|OK|200|
|MOVED_PERMANENTLY|301|
|FOUND|302|
|BAD_REQUEST|400|
|FORBIDDEN|403|
|NOT_FOUND|404|
|INTERNAL_SERVER_ERROR|500|

<br>

### 前台代码:
```html
<a th:href="@{/test/down}">下载图片</a>
```

<br>

### 后台代码:
```java
@RequestMapping("/test/down")
// 1. 将控制器方法的返回值设置为 ResponseEntity<byte[]>
public ResponseEntity<byte[]> testDown(HttpSession session) throws Exception {


  // 2. 利用 session 获取 servletContext, 利用 servletContext 获取文件在服务器上的真实位置
  ServletContext servletContext = session.getServletContext();

  String realPath = servletContext.getRealPath("/static/img/二重ログイン対策.png");
  System.out.println("realPath = " + realPath);
  // realPath = /Users/liulin/Desktop/Sam/SSM/spring_mvc_rest/target/spring_mvc_rest-1.0-SNAPSHOT/static/img/二重ログイン対策.png



  // 3.创建输入流: 将文件读取到内存中
  FileInputStream is = new FileInputStream(realPath);

  // is.available() 获取字节输入流对应的文件的所有字节数 将该文件对应的字节一次性的响应到浏览器
  byte[] bytes = new byte[is.available()];
  is.read(bytes);


  // 4. 创建 HttpHeaders对象设置响应头信息, 响应头和请求头都是键值对 在java代码中我们要获取请求头 或 设置响应头 我们使用的键值对 MultiValueMap本质就是map集合 我们在这里设置的键值对就是要响应头 HttpHeaders就是MultiValueMap的实现类
  MultiValueMap<String, String> headers = new HttpHeaders();

  /*
    // 我觉得还可以添加这些
    String mimeType = servletContext.getMimeType("/file/" + downloadFileName);

    headers.add("Content-Type", mimeType)
  */

  // 通过响应头告知浏览器要以什么方式下载 和 设置下载文件的名字
  headers.add("Content-Disposition", "attachment;filename=test.png");

  // 设置响应状态码, 枚举类中列举了我们场景的状态码, 我们返回200
  HttpStatus status = HttpStatus.OK;

  // 创建 ResponseEntity对象
  ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(bytes, headers, status);

  // 关闭输入流
  is.close();


  // 将响应报文传送给客户端
  return responseEntity;
}
```

<br><br>

## SpringMVC文件上传:
我们要实现上传功能的话 前台页面必须有表单, 同时表单中必须有文件域

<br>

### 前台页面:
**enctype: multipart/form-data**  
设置浏览器向服务器传输请求参数的方式, multipart/form-data表示将表单中的数据以2进制的方式提交到服务器

```html
<form
    th:action="@{/test/up}"
    method="post"
    enctype="multipart/form-data">
  头像: <input type="file" name="photo"> <br>
  <input type="submit" value="上传">
</form>
```

<br>

### 后台逻辑:

**逻辑:**  
- 上传成功后我们跳转到success页面
- 我们将上传文件保存在tomcat服务器中
- 我们要在控制器方法中获取上传的文件
- 利用输入流来读取该文件
- 利用输出流将其输出到指定的位置

<br>

### 文件上传的前提

**1. 下载依赖:**  
类似node中要下载 file-express 依赖一样

```xml
<dependency> 
  <groupId>commons-fileupload</groupId>
  <artifactId>commons-fileupload</artifactId>
  <version>1.3.1</version> 
</dependency>
```

<br>

**2. SpringMVC配置文件中配置文件上传解析器:**   
注意要配置id值, SpringMVC要获取文件上传解析器的时候是通过id来获取的 **id值固定为multipartResolver**

```xml
<!--必须通过文件解析器的解析才能将文件转换为MultipartFile对象--> 

<!-- 配置文件上传解析器: -->
<bean
    id="multipartResolver"
    class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
  <!--
    配置文件上传文件的最大大小 不需要设置 它有默认值
    maxUploadSize

    配置文件上传的默认编码
    defaultEncoding: UTF-8
  -->
</bean>
```

<br>

**控制器方法中获取前端上传的文件:**  
SpringMVC中将前台上传的文件封装成了 **<font color="#C2185B">(MultipartFile 前台表单的name值)</font>** 对象, 我们只需要在形参的位置声明该类型的形参, <font color="#C2185B">形参名要起file表单项的name值</font>

```java
// 
public String testUp(HttpSession session, MultipartFile photo) { ... }
```

<br>

**MultipartFile对象的API:**  
我们 **通过photo** 可以调用很多的方法

- void transferTo(File dest)
- void transferTo(Path dest)

- String getOriginalFilename(): 获取上传文件的文件名名 **带后缀** 如:1.jpg
- String getName(): 获取file表单项的name属性值
- byte[] getBytes()
- String getContentType()
- InputStream getInputStream()
- Resource getResource()
- long getSize()
- boolean isEmpty()

<br>

**<font color="#C2185B">void transferTo(File dest)</font>**  
利用该方法 我们不需要向以前那样先读后写, 我们直接通过该api就可以将 **MultipartFile对象** 所对应的文件上传到我们指定的位置

<br>

### 代码部分:
```java
@RequestMapping("/test/up")
public String testUp(HttpSession session, MultipartFile photo) throws IOException {

  // 1. 使用MultipartFile类型的参数, 注意形参名要和表单项的name值保持一致, 用于接收前台上传的文件

  // 获取上传文件的文件名: 带后缀
  String fileName = photo.getOriginalFilename();
  System.out.println("fileName = " + fileName);


  // 2. 获取当前工程在服务器中的路径,设置文件要上传到哪里 我们将图片上传到工程下(target下面的war里) 工程/photo目录下/
  ServletContext servletContext = session.getServletContext();
  String photoPath = servletContext.getRealPath("/static/photo/");
  System.out.println("photoPath = " + photoPath);
  // /Users/liulin/Desktop/Sam/SSM/spring_mvc_rest/target/spring_mvc_rest-1.0-SNAPSHOT/static/photo/


  // 创建photoPath对应的文件对象, file对应的是photo这个路径
  File file = new File(photoPath);

  // 判断file所对应的目录是否存在, 不存在则创建该目录
  if(!file.exists()) file.mkdir();


  // 设置最终上传的路径 /xxx/photo/1.jpg
  String finalPath = photoPath + File.separator + fileName;


  // 3. 调用MultipartFile对象的方法 将图片输出到指定路径
  photo.transferTo(new File(finalPath));

  return "success";
}
```

**注意:**  
我们文件上传到的是 target目录下的war里面 而不是工程下因为我们获取的是 RealPath

<br>

### 问题:
我们上面实现了文件上传的功能, 但是这里有一个问题, 我嫩第一次上传1.jpg, 然后再上传一次1.jpg会发现 第一次的图片被覆盖了

<br>

准确的说法, 不是文件被覆盖了而是文件中的内容被覆盖了

<br>

### 解决方式: 利用uuid
我们将文件名设置为永远不重复的, 我们将uuid作为文件的名字

**文件名包含两个部分:**  
文件名 + 后缀, 我们要保留后缀

<br>

**UUID的使用:**  
它是java.util包下的 所以不用下载依赖

```java
String uuid = UUID.randomUUID().toString();
```

<br>

**代码部分:**
```java
@RequestMapping("/test/up")
public String testUp(HttpSession session, MultipartFile photo) throws IOException {

  // 获取上传文件的文件名: 带后缀
  String fileName = photo.getOriginalFilename();
  System.out.println("fileName = " + fileName);


  // 获取上传文件的文件部分: 从.开始截, 因为包前不包后 所以得到的是 .jpg, lastIndexOf要从后开始找
  String suffix = fileName.substring(fileName.lastIndexOf("."));

  // 获取uuid
  String uuid = UUID.randomUUID().toString();
  
  // 拼接新的文件名
  fileName = uuid + suffix;



  ServletContext servletContext = session.getServletContext();
  String photoPath = servletContext.getRealPath("/static/photo/");
  System.out.println("photoPath = " + photoPath);

  File file = new File(photoPath);

  if(!file.exists()) file.mkdir();

  String finalPath = photoPath + File.separator + fileName;

  photo.transferTo(new File(finalPath));

  return "success";
}
```

<br><br>

# 拦截器
在学Servlet的时候学过3大组件 servlet listener filter 其中的filter是过滤器但也有拦截的功能

<br><br>

## filter 和 拦截器的区别:

### filter: 
它是在浏览器 和 目标资源之间进行过滤  

**比如我们有SpringMVC的情况下过滤器的执行位置:**  
当浏览器发送请求到服务器, 会被DispatcherServlet来处理

```
client    |   server
request   ->  DispatcherServlet -> 控制器方法
```

过滤器过滤的是浏览器对目标资源的访问, 我们的servlet也是服务器中的资源, 如果有过滤器的话 **它的位置是:**  

```
client    |   server
request   ->  filter | DispatcherServlet -> 控制器方法
```

它在servlet资源的前面, 请求会经过filter进行过滤后 交由DispatcherServlet进行处理

DispatcherServlet中会根据请求信息 使用@RequestMapping注解匹配控制器方法, 然后在DispatcherServlet调用控制器方法

<br>

### 拦截器: 
我们的拦截器有3个方法, 它们都是执行在 控制前方法 的前后的

- PreHandle: 控制器方法执行之前执行的
- PostHandle: 控制器方法执行之后执行的
- afterCompletion: 渲染视图后执行的

```
PreHandle     PostHandle
   ↓ +----------+ ↓
     | 控制器方法 | 
     +----------+

          ↓ 渲染视图后执行:
      afterCompletion
```

<br>

### 拦截器的作用:
SpringMVC中的拦截器用于 **拦截控制器方法的执行**

<br><br>

## 拦截器的使用:

### 1. 创建一个类, 让其实现HandlerInterceptor接口
com.sam.interceptor.FirstInterceptor

在该类实现HandlerInterceptor接口后 我们重写了下该接口内部的3个抽象方法

- boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)

- void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)

- void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)

```java
public class FirstInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    System.out.println("控制器方法执行之前执行: FirstInterceptor -> preHandle");

    // 拦截: 控制器方法不会执行
    return false;

  }


  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    System.out.println("控制器方法执行之后执行: FirstInterceptor -> postHandle");

  }


  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    System.out.println("渲染完视图之后执行: FirstInterceptor -> afterCompletion");

  }
}
```

<br>

**参数:**  
- request: 请求对象
- response: 响应对象
- handler: 被拦截的控制器对象

<br>

### 2. 在SpringMVC的配置文件中配置拦截器
上面我们创建了一个 HandlerInterceptor接口的实现类, 这时它还不是一个拦截器, 我们需要让SpringMVC知道它是一个拦截器

拦截器是SpringMVC的组件 所以我们需要配置在SpringMVC的配置文件中, **配置后才具有拦截器的功能**

比如过滤器是服务器中的组件 它就需要配置在web.xml中

<br>

**配置拦截器的方式1: 对所有请求拦截**  
使用 ``<mvc:interceptors>`` 的子标签 ``<bean>`` 来配置拦截器

使用bean标签配置拦截器, **将某一个类 配置为拦截器**, 该拦截器是由SpringMVC加载的所以不需要设置id

```xml
<mvc:interceptors>
  <bean 
    class="com.sam.interceptor.FirstInterceptor"></bean>
</mvc:interceptors>
```

<br>

**配置拦截器的方式2: 对所有请求拦截**  
使用 ``<mvc:interceptors>`` 的子标签 ``<ref>`` 来配置拦截器

使用ref配置拦截器的时候 **先将拦截器的类交由spring管理** 就是将拦截器的类使用 bean标签的方式 配置在配置文件中 供拦截器配置的ref标签引用

然后使用 ``<ref bean="拦截器的bean的id">`` 
```xml
<bean id="firstInterceptor" class="com.sam.interceptor.FirstInterceptor" />
<mvc:interceptors>
  <ref bean="firstInterceptor" />
</mvc:interceptors>
```

<br>

**配置拦截器的方式3: 对所有请求拦截**  
使用 注解 + 扫描的方式 配置拦截器

- 使用 @Component注解 在类上进行标识
- 配置扫描
- ``<mvc:interceptors>`` 的子标签 ``<ref bean="自动提示拦截器的类">`` 

```xml
<!-- 配置扫描: 扫描要包含interceptor包 -->
<context:component-scan base-package="com.sam" />


<mvc:interceptors>
  <!-- 
    我们通过注解管理的bean 它的id的默认值就是类名首字母小写
   -->
  <ref bean="firstInterceptor" />
</mvc:interceptors>
```

<br>

**注意:**
上面使用 ``<bean>`` 或者 ``<ref>`` 标签配置的拦截器 默认是对 **DispatcherServlet处理的所有请求进行拦截的**

<br>

**例如:**  
当我们url输入 /test/home/瞎写, 会报404, 这正常 但是我们发现 拦截器中的3个生命周期仍然会执行

当如上配置后, 不管资源是否存在 不管控制器方法是否存在 这3个生命周期都是会执行的 (过滤器也一样)

<br>

**配置拦截器的方式4: 精准拦截**  
使用 ``<mvc:interceptor>`` 标签配置拦截器  
该方式可以配置对哪些路径进行拦截, 对哪些路径不拦截

<br>

**要点:**  
- /**: 表示拦截所有请求
- /*: *仅表示一层目录

```xml
<mvc:interceptors>
  <mvc:interceptor>

    <!--
      mvc:mapping: 设置要拦截的路径
      /*:
        - 配置过滤器的时候 是拦截所有的资源
        - 配置拦截器的时候, *只代表一层目录 可以拦截 /hello /home /xxx, 但是不能拦截/test/home

      /**:
        表示拦截所有请求路径 !!!
    -->
    <mvc:mapping path="/**"/>

    <!--
      排除: 对某一个资源的拦截
      /abc: 如果浏览器的请求路径为 /abc 的时候, 该次请求不会被拦截
    -->
    <mvc:exclude-mapping path="/abc"/>

    <!-- 
      注解 + 扫描的方式: 
      引入拦截器的id(注解方式id为类名小驼峰) 
    -->
    <ref bean="firstInterceptor" />
  </mvc:interceptor>
</mvc:interceptors>
```

<br>

### 多个拦截器的执行顺序
创建多个拦截器很简单, 创建多个 HandlerInterceptor实现类

每个实现类在springmvc配置文件的 ``</mvc:interceptors>`` 中进行配置就可以了

```xml
<mvc:interceptors>
  <!-- 注解 + 扫描 -->
  <ref bean="firstInterceptor" />
  <ref bean="secondInterceptor" />
</mvc:interceptors>
```

<br>

**执行顺序:**   
拦截器的执行顺序和在 **springmvc配置文件中的配置顺序有关**

上面两个拦截器的输出结果:
- preHandle()按照配置的顺序执行
- postHandle()按照配置的反序执行

<br>

反序执行的原因是 源码中将拦截器放到了数组中, 在执行 preHandle的时候 是``for i++``循环顺序调用preHandle

在执行postHandle的时候 是``for i--``循环反序调用postHandle

在执行afterCompletion的时候 也是``for i--``循环反序调用afterCompletion

<br>

- FirstInterceptor --> preHandle
- SecondInterceptor --> preHandle

- SecondInterceptor --> postHandle
- FirstInterceptor --> postHandle

- SecondInterceptor --> afterCompletion
- FirstInterceptor --> afterCompletion

<br>

**特殊情况:**  
SecondInterceptor的preHandle返回false, 我们观察下2个拦截器的执行情况

- FirstInterceptor --> preHandle
- SecondInterceptor --> preHandle
- FirstInterceptor --> afterCompletion

没有一个postHandle是执行的

<br>

若拦截器中有某个拦截器的preHandle()返回了false
- 拦截器的preHandle()返回false和它之前的拦截器的preHandle()都会执行
- 所有的拦截器的postHandle()都不执行
- 拦截器的preHandle()返回false之前的拦截器的afterCompletion()会执行

<br><br>

## 拦截器的3个抽象方法

### **<font color="#C2185B">boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)</font>**  
该方法在 控制器方法 执行之前 执行, **它起到的是拦截的作用, 拦截或方形控制器方法的执行**

<br>

**返回值: boolean**  
- false: 拦截, 控制器方法不会执行
- true: 放行

<br>

### **<font color="#C2185B">void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)</font>**  
该方法在 控制器方法 执行之后 执行

<br>

### **<font color="#C2185B">void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)</font>**  
该方法在 控制器方法执行之后 且 渲染视图完毕之后 执行

<br><br>

# 异常处理器
我们在**控制方法的执行过程中 如果出现了某些异常** 我们就可以通过SpringMVC为我们提供的接口 来**处理这个异常**

```
| - 接口: HandlerExceptionResolver
  - 实现类: DefaultHandelerExceptionResolver
  - 实现类: SimpleMappingExceptionResolver
```

<br>

### 接口中抽象方法:

### **<font color="#C2185B">ModelAndView resolveException(HttpServletRequest var1, HttpServletResponse var2, @Nullable Object var3, Exception var4);</font>**
该接口只提供了一个抽象方法, 如果控制器方法在执行的过程中 出现了指定的异常 那就可以通过resolveException()方法处理异常

<br>

**返回值: ModelAndView**  
当我们的控制器方法出现异常后, 该方法就会解析, 解析后, 我们就可以

- 利用Model将异常信息共享到请求域中
- 利用View实现新的页面跳转 比如错误页面

<br>

### 注意:
异常处理器我们配置不配置都可以 因为SpringMVC中已经默认使用异常解析器了

- DefaultHandelerExceptionResolver: SpringMVC中默认使用的异常解析器

- SimpleMappingExceptionResolver: 自定义异常的处理方案

<br>

如果我们不配置异常处理器, 则SpringMVC就是使用DefaultHandelerExceptionResolver处理异常, 比如我们出现异常405时看到的页面, 就是该异常处理的结果

如果我们需要**自己配置某些异常的解决方案**, 我们就可以配置SimpleMappingExceptionResolver来处理

<br><br>

## 基于XML: 配置异常处理器
我们将 SimpleMappingExceptionResolver实现类使用 ``<bean>`` 的方式配置到springmvc的配置文件中

只写class就可以 因为该对象不是我们自己调用的

<br>

### bean中需要配置的属性1: exceptionMappings - 实现页面跳转
使用 ``<property name="exceptionMappings">`` 子标签的形式配置 bean 的属性

**作用:**  
配置要处理的异常出现时, 要跳转到哪个页面

, 同时我们需要通过 ``<props> > <prop>`` 子标签配置 异常 - 跳转页面 之间的关系

<br>

**我们需要设置**  
- 异常类的全类名
- 出现异常时, 跳转到的逻辑视图名

<br>

**方式:**  
```xml
<property name="exceptionMappings">
  <props>
    <prop key="异常的全类名1">逻辑视图1</prop>
    <prop key="异常的全类名2">逻辑视图2</prop>
  </props>
</property>
```

<br>

### bean中需要配置的属性2: exceptionAttribute - 设置共享在请求域中的异常信息的属性名

使用 ``<property name="exceptionAttribute" value="设置key值">`` 子标签的形式配置 bean 的属性

<br>

**异常处理器会自动往请求域中共享异常信息, 该属性就是设置从请求域中取该数据时需要的key**

```xml
<!-- 
  如下: 我们可以通过 ex 从请求域中获取到异常信息 
-->
<property name="exceptionAttribute" value="ex"/>
```

<br>

**完整版:**
```xml
<!-- 配置异常解析器: -->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
  <!-- 
    页面跳转: 配置exceptionMappings属性
  -->
  <property name="exceptionMappings">
    <props>
      <!-- 
        标签属性key: 
          设置Properties中的key, 我们要出现的异常名 

        标签体: 
          设置逻辑视图, 如: 当出现算学逻辑异常时, 跳往哪个页面 
      -->
      <prop 
        key="java.lang.ArithmeticException">error</prop>
    </props>
  </property>


  <!-- 
    设置共享在请求域中的异常信息的属性名: 配置exceptionAttribute属性
    
    异常处理器会自动往请求域中共享异常信息, 该属性就是设置从请求域中取该数据时需要的key
  -->
  <property name="exceptionAttribute" value="ex"/>
</bean>
```

<br><br>

## 基于注解: 配置异常处理器
使用注解的时候, 我们就是创建一个控制层的类, 然后使用注解标识类和类中的控制器方法

当出现指定的异常时, 就是执行注解所标识的方法, 方法内我们可以实现
- 往请求域中共享数据
- 跳转到指定的页面

**它就是一个控制层的类, 和我们处理其他请求是一致的, 只不过我们这里处理的是异常**

<br>

### 要点:

**1. 创建一个Java类:**
com.sam.controller.ExceptionController

<br>

**2. 使用@ControllerAdvice注解标识该类:**  
它也是扩展注解, 作用就是将当前类标识为异常处理的组件

<br>

**3. 使用@ExceptionHandler(ArithmeticException.class)标识类中的控制器方法**  
ExceptionHandler的value属性值为: ``Class<? extends Throwable>[] class``类型的数组, 我们需要设置某个异常class所组成的数组

**也就是指明对哪个异常进行处理**

<br>

**4. 控制器方法中, 我们声明形参接收异常信息: (Throwable ex)**  

<br>

**5. 方法内写对应的逻辑**

```java
// 它也是扩展注解, 作用就是将当前类标识为异常处理的组件
@ControllerAdvice
public class ExceptionController {

  // 使用ExceptionHandler注解指明对哪个异常进行处理
  @ExceptionHandler(ArithmeticException.class)
  public String handleException(Model model, Throwable ex) {

    model.addAttribute("ex", ex);
    return "error";

  }
}
```

<br><br>

# 基于注解: 配置SpringMVC
使用 配置类 和 注解 代替 web.xml 和 springmvc.xml 配置文件的功能

Spring的配置文件也可以用该方法来配置

<br><br>

## 创建初始化类 代替 web.xml
在Servlet3.0环境中, **容器会在类路径中查找实现javax.servlet.ServletContainerInitializer接口的类**, 
如果找到的话就用它来配置Servlet容器。 
```
Servlet容器就是Tomcat, 我们要配置Tomcat的话 就是web.xml
```

<br>

Spring提供了这个接口的实现, 名为
SpringServletContainerInitializer

这个类反过来又会查找实现WebApplicationInitializer的类并将配置的任务交给它们来完成。


Spring3.2引入了一个便利的WebApplicationInitializer基础实现, 名为
AbstractAnnotationConfigDispatcherServletInitializer, 

当我们的类扩展了
AbstractAnnotationConfigDispatcherServletInitializer并将其部署到Servlet3.0容器的时候, 容器会自
动发现它, 并用它来配置Servlet上下文。

<br>

**总结:**  
如果我们自己创建的类(WebInit) 继承了 AbstractAnnotationConfigDispatcherServletInitializer类的话, 并将其部署到Servlet3.0容器的时候 

Tomcat就会自动发现WebInit 并用它来取代web.xml配置servlet的上下文环境

<br><br>

## 创建初始化类 代替 web.xml 的步骤

### 1. 初始化项目时不需要在WEB-INF下创建web.xml了

<br>

### 2. 创建 Java类, 并继承 AbstractAnnotationConfigDispatcherServletInitializer
com.sam.config.WebInit

**WebInit代替web.xml**

```java
package com.sam.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {

  // 代替Spring配置文件
  @Override
  protected Class<?>[] getRootConfigClasses() {
    // 返回一个数组, 成员为 Spring的配置类的类型
    return new Class[] {SpringConfig.class};
  }


  // 代替SpringMVC配置文件
  @Override
  protected Class<?>[] getServletConfigClasses() {
    // 返回一个数组, 成员为 SpringMVC的配置类的类型
    return new Class[] {WebConfig.class};
  }


  // 配置DispatcherServlet的url-pattern
  @Override
  protected String[] getServletMappings() {
    // 为DispatcherServlet配置的 url-pattern, 它也可以配置多个
    return new String[] {"/"};
  }
}

```

<br>

**<font color="#C2185B">Class<?>[] getRootConfigClasses():</font>**   
作用: 设置一个配置类 代替 **Spring的配置文件**

<br>

**返回值:**  
class类型的数组, 我们会将 Spring的配置类的类型放入数组中

既然是数组就意味着我们可以配置多个, 如果我们将所有的内容都配置在一个配置文件中 这个配置文件里面的配置就会特别多

这时我们都会按照功能将其放在不同的配置文件中
```java
return new Class[]{SpringConfig.class};
```

<br>

**<font color="#C2185B">Class<?>[] getServletConfigClasses():</font>**   
作用: 设置一个配置类 代替 **SpringMVC的配置文件**

<br>

**返回值:**  
class类型的数组, 我们会将 SpringMVC的配置类的类型放入数组中

既然是数组就意味着我们可以配置多个
```java
return new Class[] {WebConfig.class};
```

<br>

**<font color="#C2185B">getServletMappings():</font>**   
作用: 设置SpringMVC的前端控制器的DispatcherServlet的url-pattern, 也就是 **配置拦截的请求路径**

<br>

**返回值:**  
String[]
```java
// 为DispatcherServlet配置的 url-pattern, 它也可以配置多个
return new String[] {"/"};
```

<br>

### WebInit类的其他配置项:
既然WebInit类就用来代替 web.xml 的, 我们可以在该类中配置 比如 过滤器

<br>

**配置过滤器:**  
control + o, 找到该类中可以重写的方法: 找到getServletFilters()进行重写

<br>

**<font color="#C2185B">Filter[] getServletFilters()</font>**  
设置当前的过滤器

<br>

**返回值:**  
Filter[], 我们可以创建过滤器, 然后放入到该数组中

<br>

**代码:**  
```java
package com.sam.config;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.HiddenHttpMethodFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;

public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {

  // Spring的配置
  @Override
  protected Class<?>[] getRootConfigClasses() {
    return new Class[] {SpringConfig.class};
  }

  // SpringMVC的配置
  @Override
  protected Class<?>[] getServletConfigClasses() {
    return new Class[] {WebConfig.class};
  }

  // DispatcherServlet的url-pattern
  @Override
  protected String[] getServletMappings() {
    return new String[] {"/"};
  }

  // 配置过滤器: 返回值 Filter[]
  @Override
  protected Filter[] getServletFilters() {

    // 创建编码过滤器: 设置请求和响应的编码
    CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
    characterEncodingFilter.setEncoding("UTF-8");
    characterEncodingFilter.setForceEncoding(true);

    // 创建处理请求方式过滤器: 使用 filter结尾的包, 该过滤器中不需要配置其他内容
    HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();


    return new Filter[] {characterEncodingFilter, hiddenHttpMethodFilter};
  }
}

```

<br>

### 3. 创建 Spring 的配置类
com.sam.config.SpringConfig

我们还没有将 Spring 和 SpringMVC的整合, 我们只是创建了类 没有进行配置

spring 和 springmvc 的配置文件我们使用的是一样的, 以后我们就可以按照 WebConfig的配置方式配置SpringConfig

<br>

**使用: @Configuration标识该类**  
将当前的类标识为配置类, 不加这个注解的话它就是一个普通的类

```java
package com.sam.config;

// 配置类: Spring的配置类
@Configuration
public class SpringConfig {
  ... 啥也没写
}
```

<br>

### 4. 创建 SpringMVC 的配置类
com.sam.config.WebConfig

我们在配置文件中能做的事情在这里也可以做 如
1. 扫描组件
2. 视图解析器
3. 默认的servlet处理静态资源
4. mvc注解驱动
5. 视图控制器
6. 文件上传解析器
7. 拦截器
8. 异常解析器

<br>

**前提:**  
1. 该类需要实现 WebMvcConfigurer接口
2. 该类需要使用 @Configuration 进行标识

<br>

**扫描组件: 通过注解**  
在类上添加 **@ComponentScan(包路径)** 注解, 如我们要对com.sam.controller包下的类进行扫描

```java
// 配置类: SpringMVC的配置类
@Configuration
// 扫描组件的注解: 写包名
@ComponentScan("com.sam.controller")
public class WebConfig implements WebMvcConfigurer {
}
```

<br>

**默认的servlet: 通过重写抽象方法**   
control + o, 找到DefaultServletHandlerConfigurer()方法 进行重写

```java
// 配置默认的servlet处理静态资源
@Override
public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
  // 开启
  configurer.enable();
}
```

<br>

**mvc注解驱动: 通过注解**   
在类上添加 **@EnableWebMvc** 注解开启

<br>

**配置视图控制器: 通过抽象方法**  
control + o, 找到addViewControllers()方法 进行重写

<br>

**registry形参的api:**  
- registry.addRedirectViewController(): 添加一个重定向的视图控制器

- registry.addViewController(): 添加一个视图控制器

- registry.addStatusController()

- registry.setOrder()


```java
// 请求路径为 / 的时候 跳转到 home视图
registry.addViewController("/").setViewName("home");
```

<br>

**配置文件上传解析器: 通过注解**   
文件上传解析器在xml文件中配置的是一个bean, 我们在配置类中要是想配置一个bean的话 我们在类中写一个方法, 返回值设置要配置bean的类型

1. 使用 @Bean 注解: 将标识的方法的返回值作为bean进行管理, 该方法的返回值就会配置到IOC容器中当做是bean进行管理

2. 将该方法的方法名作为bean的id, 返回值会放入ioc容器中进行管理

3. 如果需要配置scope的话, 在@Bean注解里有一个属性可以设置

```java
// 配置文件上传解析器
@Bean
public CommonsMultipartResolver multipartResolver() {
  return new CommonsMultipartResolver();
}
```

<br>

**配置拦截器: 通过抽象方法**  
1. 创建一个拦截器:  com.sam.interceptor.FirstInterceptor 并实现HandlerInterceptor接口

2. control + o, 找到addInterceptors()方法进行重写

3. 方法内部逻辑如下

```java
// 拦截器的类
public class FirstInterceptor implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    return true;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
  }
}

```

<br>

```java
// WebConfig类 配置拦截器
@Override
public void addInterceptors(InterceptorRegistry registry) {
  // 创建拦截器类的实例对象
  FirstInterceptor firstInterceptor = new FirstInterceptor();
  // addInterceptor注册拦截器, addPathPatterns添加拦截路径, excludePathPatterns排除对某一个路径的拦截
  registry.addInterceptor(firstInterceptor).addPathPatterns("/**").excludePathPatterns("/abc");
}
```

<br>

**配置异常解析器: 通过抽象方法**   
control + o, 找到 configureHandlerExceptionResolvers()方法进行重写

```java
// 配置异常解析器
@Override
public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {

  // 创建自定义异常处理器
  SimpleMappingExceptionResolver simpleMappingExceptionResolver = new SimpleMappingExceptionResolver();


  // 设置异常处理器的ExceptionMappings属性用于 将异常和逻辑视图做映射, 需要Properties类型的对象作为参数
  Properties properties = new Properties();
  // 设置异常映射: key异常的全类名, value: 逻辑视图
  properties.setProperty("java.lang.ArithmeticException", "error");
  // 跳转到哪里
  simpleMappingExceptionResolver.setExceptionMappings(properties);

  // 设置从请求域中取异常信息时 使用什么key
  simpleMappingExceptionResolver.setExceptionAttribute("ex");

  // 将我们设置的异常处理器添加到 形参的 resolvers 里面
  resolvers.add(simpleMappingExceptionResolver);
}
```

<br>

**配置视图解析器:**  
```java
//配置生成模板解析器
@Bean
public ITemplateResolver templateResolver() {
    WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
    // ServletContextTemplateResolver需要一个ServletContext作为构造参数, 可通过WebApplicationContext 的方法获得
    ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(
            webApplicationContext.getServletContext());
    templateResolver.setPrefix("/WEB-INF/templates/");
    templateResolver.setSuffix(".html");
    templateResolver.setCharacterEncoding("UTF-8");
    templateResolver.setTemplateMode(TemplateMode.HTML);
    return templateResolver;
}

//生成模板引擎并为模板引擎注入模板解析器
@Bean
public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
    SpringTemplateEngine templateEngine = new SpringTemplateEngine();
    templateEngine.setTemplateResolver(templateResolver);
    return templateEngine;
}

//生成视图解析器并未解析器注入模板引擎
@Bean
public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
    ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
    viewResolver.setCharacterEncoding("UTF-8");
    viewResolver.setTemplateEngine(templateEngine);
    return viewResolver;
}
```

<br>

**WebConfig - SpringMVC的完整配置**  
```java
package com.sam.config;

import com.sam.interceptor.FirstInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

import java.util.List;
import java.util.Properties;

// 配置类: SpringMVC的配置类
@Configuration
// 扫描组件multipartResolver
@ComponentScan("com.sam.controller") 
// 开启MVC的注解驱动
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
  // 配置默认的servlet处理静态资源
  @Override
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    // 开启
    configurer.enable();
  }

  // 配置视图控制器
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/").setViewName("home");
  }

  // 配置文件上传解析器
  @Bean
  public CommonsMultipartResolver multipartResolver() {
    return new CommonsMultipartResolver();
  }


  // 配置拦截器
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    // 创建拦截器类的实例对象
    FirstInterceptor firstInterceptor = new FirstInterceptor();
    // addInterceptor注册拦截器, addPathPatterns添加拦截路径, excludePathPatterns排除对某一个路径的拦截
    registry.addInterceptor(firstInterceptor).addPathPatterns("/**").excludePathPatterns("/abc");
  }

  // 配置异常解析器
  @Override
  public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
    // 创建自定义异常处理器
    SimpleMappingExceptionResolver simpleMappingExceptionResolver = new SimpleMappingExceptionResolver();


    // 设置异常处理器的ExceptionMappings属性用于 将异常和逻辑视图做映射, 需要Properties类型的对象作为参数
    Properties properties = new Properties();
    // 设置异常映射: key异常的全类名, value: 逻辑视图
    properties.setProperty("java.lang.ArithmeticException", "error");
    // 跳转到哪里
    simpleMappingExceptionResolver.setExceptionMappings(properties);

    // 设置从请求域中取异常信息时 使用什么key
    simpleMappingExceptionResolver.setExceptionAttribute("ex");

    // 将我们设置的异常处理器添加到 形参的 resolvers 里面
    resolvers.add(simpleMappingExceptionResolver);
  }


  //配置生成模板解析器
  @Bean
  public ITemplateResolver templateResolver() {
    WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
    // ServletContextTemplateResolver需要一个ServletContext作为构造参数, 可通过WebApplicationContext 的方法获得
    ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(
        webApplicationContext.getServletContext());
    templateResolver.setPrefix("/WEB-INF/templates/");
    templateResolver.setSuffix(".html");
    templateResolver.setCharacterEncoding("UTF-8");
    templateResolver.setTemplateMode(TemplateMode.HTML);
    return templateResolver;
  }

  //生成模板引擎并为模板引擎注入模板解析器
  @Bean
  public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
    SpringTemplateEngine templateEngine = new SpringTemplateEngine();
    templateEngine.setTemplateResolver(templateResolver);
    return templateEngine;
  }

  //生成视图解析器并未解析器注入模板引擎
  @Bean
  public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
    ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
    viewResolver.setCharacterEncoding("UTF-8");
    viewResolver.setTemplateEngine(templateEngine);
    return viewResolver;
  }

}

```

<br><br>

# SpringMVC的执行流程

<br><br>

## SpringMVC的常用组件

### DispatcherServlet: 前端控制器, 框架提供
统一处理请求和响应 整个流程控制的中心, 由它调用其它组件处理用户的请求

<br>

### HandlerMapping: 处理器映射器, 框架提供
根据请求的url method等信息查找Handler 即控制器方法

处理当前的请求 和 控制器方法的映射关系

<br>

### Handler: 处理器, 需要工程师开发
在DispatcherServlet的控制下Handler对具体的用户请求进行处理

<br>

### HandlerAdapter: 处理器适配器, 框架提供
匹配到控制器方法之后 调用控制器方法就是由它来完整的

<br>

### ViewResolver: 视图解析器, 框架提供
进行视图解析, 得到相应的视图, 如 ThymeleafView, InternalResourceView, RedirectView

<br>

### View: 视图, 需要工程师开发
将模型数据通过页面展示给用户

<br><br>

## DispatcherServlet初始化过程
DispatcherServlet 本质上是一个 Servlet, 所以天然的遵循 Servlet 的生命周期。所以宏观上是 Servlet生命周期来进行调度。

<br>

### 要点总结:
Spirng 和 SpringMVC 它们两个分别创建的IOC容器是父容器 和 子容器 的关系

SpringMVC设置的容器是子容器, Spring创建的容器是父容器

<br><br>

## SpringMVC的执行流程

<br>

### 扩展:
- url: 当前资源在网络上的路径
- uri: 当前资源在服务器上的路径

<br>

### 步骤
1. 用户向服务器发送请求, 请求被SpringMVC前端控制器 DispatcherServlet捕获

2. DispatcherServlet对请求url进行解析, 得到请求地址, 判断请求地址对应的控制器方法
  - 不存在对应的控制器方法
    - 再判断是否配置了mvc:default-servlet-handler
      - 如果没配置: 则控制台报映射查找不到的错误, 客户端提示404错误
      - 如果有配置, 则访问目标资源(一般为静态资源) 找不到客户端也会提示404错误

  - 存在对应的控制器方法 则执行下面的流程 3的部分

3. 根据该url 调用HandlerMapping(将请求和请求映射进行匹配)获得该Handler(控制器方法)配置的所有相关的对象(包含Handler对象以及Handler对象对应的拦截器), 最后以HandlerExceptionChain执行链对象的形式返回

4. DispatcherServlet根据获取的Handler, 选择一个合适的HandlerAdapter(执行控制器方法需要用的就是HandlerAdapter)

5. 如果成功获得HandlerAdapter, 此时将开始执行拦截器的preHandler(...)方法【正向】

6. 提取Request(请求报文)中的模型数据, 填充Handler入参, 开始执行Handler(Controller)方法, 处理请求。在填充Handler的入参过程中, 根据你的配置, Spring将帮你做一些额外的工作: 
  - HttpMessageConveter(报文信息转换器): 将请求消息(如Json、xml等数据)转换成一个对象, 将对象转换为指定的响应信息, 它指的就是@RequestBody @ResponseBody

  - 数据转换: 对请求消息进行数据转换。如String转换成Integer、Double等, 比如前台请求参数的都String类型的 但是我们以SpringMVC的方式获取这些参数的时候 可以指定参数的类型, 这样的数据类型的转换 就是框架完成的

  - 数据格式化: 对请求消息进行数据格式化。 如将字符串转换成格式化数字或格式化日期等

  - 数据验证: 验证数据的有效性(长度、格式等), 验证结果存储到BindingResult或Error中

7. Handler执行完成后, 向DispatcherServlet 返回一个ModelAndView对象。

8. 此时将开始执行拦截器的postHandle(...)方法【逆向】。

9. 根据返回的ModelAndView(此时会判断是否存在异常: 如果存在异常, 则执行HandlerExceptionResolver进行异常处理)选择一个适合的ViewResolver进行视图解析, 根据Model
和View, 来渲染视图。

10. 渲染视图完毕执行拦截器的afterCompletion(...)方法【逆向】。

11. 将渲染结果返回给客户端。

<br><br>

# SSM整合 

## 每个框架的角色
- SpringMVC: 表述层框架, 处理请求 将数据响应到浏览器
- Mybatis: 持久层框架, 连接 访问 操作数据库
- Spring: 整合型框架, 通过IOC管理对象, 事务功能的AOP

<br>

### 问题:
MyBatis可以交给Spring来管理, 但是Spring和SpringMVC本身就是同源的 它们之间需要整合么？


**答案:**  
整合不整合都可以

- 不整合: **让Spring 和 SpringMVC创建同一个IOC容器**, IOC容器需要加载Spring的配置文件来进行创建的 我们需要将所有内容都配置到同一个配置文件中

- 整合: **让Spring和SpringMVC各自管理各自的组件**, 比如SpringMVC创建自己的IOC容器 管理它自己的组件, Spring管理其余的组件 创建一个新的IOC容器

**建议整合**

<br>

### Spring SpringMVC的IOC创建时机

我们之前在学习Spring的过程中 我们创建IOC容器的代码都是我们自己写的 我们每次测试的时候 都要获取IOC容器 然后获取Bean 然后操作Bean

<br>

Java工程中我们可以控制代码的执行, 我们写一个测试类 只要一执行我们就可以创建IOC容器, 但我们现在创建的是web工程, 我们创建IOC的代码应该写在哪里?

<br>

现在Spring要创建一个IOC, SpringMVC也要创建一个IOC, 我们SpringMVC的IOC容器是在DispatcherServlet进行初始化的过程中创建的

<br>

**Spring的IOC容器该在什么时候创建呢？**  
我们从组件的依赖关系上进行分析, **SpringMVC管理的是控制层的组件, 我们其它的组件就要交由Spring来管理**

<br>

比如业务层组件就要交给Spring来进行管理, 当前SpringMVC的控制层需要依赖于业务层的组件

因为在控制层中需要创建一个service层的成员变量 然后来进行一个自动装配 我们就可以在controller中使用service对象了

**这个过程是什么时候完成的? 关于自动装配我们在讲Spring的时候就说过 它是我们在获取IOC容器的时候完成的**

那也就是说我们在controller中自动装配service的组件 就是在当前SpringMVC的IOC容器获取的时候执行的

SpringMVC是在DispatcherServlet进行初始化的时候创建的 我们的DispatcherServlet在注册的时候 在web.xml中进行配置的时候

我们使用了 load-on-startup标签 这样DispatcherServlet的初始化在服务器启动的时候完成的

我们当前的SpringMVC的IOC中有Controller, Spring的IOC容器中有Service

既然我们在获取SpringMVC的IOC的时候就要来完成Controller中的Service的自动装配 也就是说Controller是依赖Service的

**也就是说我们在获取SpringMVC的容器的时候 Spring的IOC容器需要提前创建**

这样我们才能完成在获取SpringMVC的IOC的时候完成Controller中的Service的自动装配

<br>

**总结:**  
Spring的IOC容器的创建要 **早于** SpringMVC的IOC容器的创建, 也就是说 Spring的IOC的容器的创建一定要在DispatcherServlet初始化之前

<br>

## ContextLoaderListener
我们之前在将服务器的3大组件的时候, 我们说过 filter listener servlet 它们的执行顺序

1. 执行listener
2. 执行filter
3. 执行servlet

<br>

我们只用较多的监听器就是 ServletContextListener 

<br>

### 回顾: ServletContextListener监听器
它是来监听ServletContext的状态的 (创建和销毁)

ServletContext对象
- 在web工程启动的时候创建 
- 在web工程停止的时候销毁

监听到创建和销毁之后都会分别调用, ServletContextListener监听器的方法反馈

<br>

两个方法分别是 **并且它们只执行一次**:
- void contextInitialized(ServletContextEvent var1): **只要监听到服务器启动 初始化方法就会执行, 它是最早执行的方法**

- void contextDestroyed(ServletContextEvent var1) 

<br>

我们SpringMVC的IOC容器是在Servlet的初始化中执行的 是在服务器启动之后在servlet的阶段执行的

<font color="#C2185B">所以我们就可以把获取Spring IOC容器的代码放在 过滤器的初始化方法 或 监听器的初始化方法中</font>

这样我们就能保证在获取SpringMVC的IOC容器的时候, Spring的IOC容器一定是提前创建好的 这样就可以完成Controller中的Service的自动装配了

<br>

**那我们是选择 过滤器 还是 监听器呢?**  
过滤器的主要功能是用来过滤请求和响应 所以我们不能为了实现一个功能 忽略了它最基本的用处

所以我们使用 **监听器**

<br>

### 思路:
我们在服务器启动的时候 首先加载Spring的配置文件 来获取它的IOC容器

<br>

### 使用监听器加载Spring的配置文件 获取IOC容器
ServletContextListener监听器不需要我们自己创建 Spring给我们提供好了 叫 **ContextLoaderListener**

<br>

它可以监听ServletContext的状态 在web服务器启动的时候 读取Spring的配置文件 创建Spring的IOC容器 

**web应用必须在web.xml中配置**

<br>

### web.xml中配置 Listener 监听器
配置Spring的监听器, 在服务器启动时加载Spring的配置文件

**Spring配置文件默认位置和名称:**  
```
/WEB-INF/applicationContext.xml 
```

可通过上下文参数自定义Spring配置文件的位置和名称

```xml
<listener> 
  <listener-class>
    org.springframework.web.context.ContextLoaderListener
  </listener-class>
</listener>

<!--自定义Spring配置文件的位置和名称--> <context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>classpath:spring.xml</param-value>
</context-param>
```

<br><br>

## 测试: ContextLoaderListener

### 要做的事
1. 创建SpringMVC的配置文件
2. 创建Spring的配置文件
3. 控制层交给SpringMVC进行管理
4. 业务层交给Spring进行管理
5. 然后启动项目

<br>

### 测试用例:
启动项目 观察是否报错 没有报错配置ok, 报错了配置就代表有问题

因为SpringMVC的IOC容器是服务器启动的时候执行DispatcherServlet的初始化的过程中创建的, 所以它的自动装配也是在服务器启动的过程中来完成的

如果我们的Controller是能够访问到Service的 说明Spring的监听器是没有任何问题的

<br>

### web.xml
- 配置前段控制器: 用来配置SpringMVC配置文件
- 配置监听器: 用来配置Spring配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

  <!-- 配置前端控制器: 主要配置SpringMVC的配置文件-->
  <servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
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

  <!-- 配置监听器 -->
  <listener>
    <!-- 在服务器启动时加载Spring的配置文件 获取IOC容器 -->
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
  <!--自定义Spring配置文件的位置和名称--> <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:spring.xml</param-value>
  </context-param>
</web-app>
```

<br>

### /resources/ 创建spring 和 springmvc 的配置文件
- springmvc: 配置扫描组件 和 视图解析器 注解驱动, 就为了完成请求, 跳转页面用的 它管理的是控制层的组件

- spring: 配置扫描组件, 它管理的是业务层的组件

<br>

**springmvc.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
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

  <mvc:annotation-driven />
  <mvc:view-controller
      path="/"
      view-name="index" />

</beans>
```

<br>

**spring.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

  <!-- 扫描组件: Spring管理service所以设置到impl -->
  <context:component-scan base-package="com.sam.service.impl" />
</beans>
```

<br>

**控制层:**  
```java
package com.sam.controller;

import com.sam.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class HelloController {

  @Autowired
  private HelloService helloService;

}

```

<br>

**业务层:**
```java
package com.sam.service.impl;

import com.sam.service.HelloService;
import org.springframework.stereotype.Service;

@Service
public class HelloServiceImpl implements HelloService {
}
```

<br>

### 疑问:
现在是两个IOC容器, 为什么能在SpringMVC的容器中访问到Spring的IOC容器中的内容呢

我们在DispatcherServlet初始化的源码中 有这样的代码在设置父容器 ``wac.setParent(parent)``

wac就是SpringMVC的IOC容器, 给他设置了一个父容器, 在SSM整合中SpringMVC创建的IOC容器是子容器, Spring的IOC容器是父容器

- Spring的IOC容器是 **父容器**
- SpringMVC的IOC容器是 **子容器**

<br>

**子容器中是可以访问到父容器中的Bean的**, 父容器中是没有办法访问子容器的Bean的

<br><br>

# SSM整合

<br><br>

## 准备工作:
创建员工表
```sql
create table ssm_emp (
	emp_id int(11) not null auto_increment,
	emp_name varchar(20) default null,
	age int(11) default null,
	sex varchar(1) default null,
	email varchar(50) default null,
	primary key (emp_id)
)
```

<br><br>

## pom.xml: SSM整合时需要用到的依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.sam.ssm</groupId>
  <artifactId>spring_ssm</artifactId>
  <version>1.0-SNAPSHOT</version>

  <packaging>war</packaging>

  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <!-- spring版本: 统一管理相当于定义变量 -->
    <spring.version>5.3.1</spring.version>
  </properties>

  <dependencies>
    <!-- 上下文依赖 -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!-- 管理Bean的 -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!--springmvc相关依赖-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!--
      为什么使用mybatis还要导入jdbc?
      事务管理器在 spring-jdbc 中
    -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!--管理切面-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!--spring整合junit-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!-- Mybatis核心 -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.7</version>
    </dependency>
    <!--mybatis和spring的整合包-->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>2.0.6</version>
    </dependency>
    <!-- 连接池 -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.0.9</version>
    </dependency>
    <!-- junit测试 -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
    <!-- MySQL驱动 -->
    <!--
     <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.16</version>
      </dependency>
    -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.37</version>
    </dependency>
    <!-- log4j日志 -->
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
    <!-- 分页插件 -->
    <dependency>
      <groupId>com.github.pagehelper</groupId>
      <artifactId>pagehelper</artifactId>
      <version>5.2.0</version>
    </dependency>
    <!--
      日志
      thymeleaf里面依赖slf4j, 它是日志的门面
      我们想实现日志功能要找它的实现, logback就是slf4j的实现
    -->
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.3</version>
    </dependency>
    <!-- ServletAPI: DispatcherServlet它要使用 -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <!-- 在springmvc中处理json的依赖 -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.12.1</version>
    </dependency>
    <!-- 处理文件上传的依赖 -->
    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.3.1</version>
    </dependency>
    <!-- Spring5和Thymeleaf整合包 -->
    <dependency>
      <groupId>org.thymeleaf</groupId>
      <artifactId>thymeleaf-spring5</artifactId>
      <version>3.0.12.RELEASE</version>
    </dependency>
  </dependencies>
</project>
```

<br><br>

## web.xml

### 要点:
1. 在 web.xml 中配置DispatcherServlet前端控制器, 指明springmvc配置文件的位置
2. 在 web.xml 中配置Listener监听器, 指定spring配置文件的位置
```xml
<!--配置Spring的编码过滤器-->
<filter>
  <filter-name>CharacterEncodingFilter</filter-name>
  <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
  <init-param>
    <param-name>encoding</param-name>
    <param-value>UTF-8</param-value>
  </init-param>
  <init-param>
    <param-name>forceEncoding</param-name>
    <param-value>true</param-value>
  </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>


<!--配置处理请求方式的过滤器-->
<filter>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>


<!--配置SpringMVC的前端控制器DispatcherServlet-->
<servlet>
  <servlet-name>SpringMVC</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  <!--设置SpringMVC配置文件自定义的位置和名称-->
  <init-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:springmvc.xml</param-value>
  </init-param>
  <!--将DispatcherServlet的初始化时间提前到服务器启动时-->
  <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
  <servlet-name>SpringMVC</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>


<!--配置Spring的监听器, 在服务器启动时加载Spring的配置文件-->
<listener>
  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>

<!--设置Spring配置文件自定义的位置和名称-->
<context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>classpath:spring.xml</param-value>
</context-param>
```

<br><br>

## 整合:
我们是通过spring整合 springmvc 和 mybatis

1. 我们可以选搭建 springmvc
2. 再去配置spring中的内容
3. spring配置完后 我们再搭建mybatis

<br><br>

## springmvc.xml

### 要点:
springmvc只扫描控制层就可以

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--扫描控制层组件-->
    <context:component-scan base-package="com.sam.ssm.controller"></context:component-scan>

    <!--配置视图解析器-->
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

    <!--配置默认的servlet处理静态资源-->
    <mvc:default-servlet-handler />

    <!--开启mvc的注解驱动-->
    <mvc:annotation-driven />

    <!--配置视图控制器-->
    <mvc:view-controller path="/" view-name="index"></mvc:view-controller>

    <!--配置文件上传解析器-->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"></bean>

</beans>
``` 

<br><br>

## spring.xml
我们在spring配置文件中配置 将能想到的内容 能交给spring管理的我们都交给它管理

<br>

**主要配置了:**  
1. 配置mapper接口的扫描: ``<bean class="MapperScannerConfigurer">``

2. 配置SqlSessionFactoryBean, 利用它的子标签配置了如下部分
  - mybatis核心配置文件的位置
  - dataSource
  - mybatis核心配置文件中的一些配置

3. 配置数据源
4. 扫描组件(除控制层)
5. 配置事务管理器
6. 开启注解驱动

<br>

### 要点1:
我们的控制层需要交给SpringMVC来管理, 其它的层都需要交给Spring的来管理

所以我们可以**在spring配置文件中 配置 扫描 com.sam.ssm 下面的所有的包, 然后排除控制层**

<br>

我们使用 ``context:exclude-filter`` 标签来进行排除
- 使用 标签属性type: 指明根据注解来排除 
- 使用 标签属性expression: 指明要排除的注解的全类名

也就是所有使用 @Controller 注解标识的类 都不在spring的扫描范围内

<br>

### 要点2:
**要交spring管理的有:**  
1. 配置扫描, 扫描除了控制层外的所有包
2. 将 DataSource 交给Spring管理

<br>

### 要点3: 将 SqlSessionFactoryBean 交给Spring管理
当我们将SqlSessionFactoryBean交给Spring管理后 我们就可以在service层中直接自动装配 sqlSessionFactory了

```java
@Service
public class EmpServiceImpl implements EmpService {
  @Autowired
  private SqlSessionFactory sqlSessionFactory;
}
```

这样我们就可以通过 sqlSessionFactory 获取 sqlSession对象

然后通过 sqlSession对象获取mapper接口的代理实现类 从而操作数据库

```java
// 获取sqlSession
SqlSession sqlSession = sqlSessionFactory.openSession(boolean autoCommit)

// 获取mapper接口的代理实现类
UserMapper mapper = sqlSession.getMapper(UserMapper.class);

// 操作数据库
int i = mapper.insertUser();
```

<br>

**上面最终我们不会这么使用, 只是在说将SqlSessionFactoryBean配置到Spring IOC容器中的好处 省事**

<br>

### SqlSessionFactoryBean的``<bean>``的要点:**  
该bean里面要通过子标签配置可以以前在mybatis核心配置文件中的内容
```
有两个地方可以配置mybatis核心配置文件中的内容
1. SqlSessionFactoryBean的<bean>的子标签 通过 property子标签来指定
2. 在mybatis的核心配置文件中指定

上面的两个地方都可以
```

**1. 配置mybatis的核心配置文件的路径**

<br>

**2. 设置数据源, 这里就可以使用子标签来配置**  

<br>

**3. 设置类型别名所对应的包, 这里就可以使用子标签来配置**  

<br>

**4. 设置mapper接口的映射文件位置 (当映射文件和mapper接口所在的包一致时 不用配置)**  

我们可以通过 ``<property name="mapperLocations">`` 子标签来设置 mapper接口的映射文件的位置

正常我们mapper接口的映射文件的位置应该在 resource目录下 且 它的目录层级和mapper接口的包名应该一致 如:
```
resource/com/sam/ssm/mapper/EmpMapper.xml
```

<br>

**但是我们的mapperLocations属性什么时候使用?**  
当mapper接口的映射文件的目录层级 和 mapper接口的包名**不一致的时候** 我们需要使用该属性配置映射文件的位置 (前提是要配置mapper接口的扫描)

比如 我们的映射文件在下面的目录下 这时我们就可以这么指定
```
resource/mappers/
```
```xml
<property 
  name="mapperLocations"
  value="classpath:mappers/*.xml"></property>
```

<br>

### 要点5: 配置mapper接口的扫描: 配置MapperScannerConfigurer 的 bean标签 (重要, 必须配置)
```xml
<bean 
  class="org.mybatis.spring.mapper.MapperScannerConfigurer">
  <property 
    name="basePackage" 
    value="com.sam.ssm.mapper" />
</bean>
```

该bean配置后, 可以优化sqlSession的使用方式

<br>

- name: basePackage
- value: mapper接口的所在的包

<br>

**作用:**  
它可以将我们指定的包(com.sam.ssm.mapper)下面所有的mapper接口 通过SqlSessionFactory提供的sqlSession对象**来创建这些mapper接口的代理实现类对象 将其交给IOC容器来管理**

<br>

**总结:**  
当我们配置了这个bean后, 相当于自动将所有Mapper接口都创建了代理实现类对象, 并将这些对象交给了IOC容器管理

我们可以在service的实现类中直接装配Mapper接口的对象就可以

```java
// 之前: Mapper接口
@Service
public class EmpServiceImpl implements EmpService {

  // 我们自动装配的是SqlSessionFactory对象 这样还要通过一系列的api才能拿到 mapper接口的代理实现类
  @Autowired
  private SqlSessionFactory sqlSessionFactory;
}



// 配置mapper接口的扫描后
@Service
public class EmpServiceImpl implements EmpService {

  @Autowired
  private EmpMapper empMapper;
}
```
 
<br>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans 
  xmlns="http://www.springframework.org/schema/beans"
       
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       
  xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

  <!--扫描组件（除控制层）-->
  <context:component-scan 
    base-package="com.sam.ssm">
    <context:exclude-filter
      type="annotation" 
      expression="org.springframework.stereotype.Controller"/>
  </context:component-scan>

  <!--引入jdbc.properties-->
  <context:property-placeholder 
    location="classpath:jdbc.properties"></context:property-placeholder>

  <!--配置数据源-->
  <bean 
    id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property 
      name="driverClassName" 
      value="${jdbc.driver}"></property>
    <property 
      name="url" 
      value="${jdbc.url}"></property>
    <property 
      name="username" 
      value="${jdbc.username}"></property>
    <property 
      name="password" 
      value="${jdbc.password}"></property>
  </bean>


  <!--配置事务管理器-->
  <bean 
    id="transactionManager" 
    class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property 
      name="dataSource" ref="dataSource"></property>
  </bean>

    <!--
      开启事务的注解驱动
      将使用注解@Transactional标识的方法或类中所有的方法进行事务管理
    -->
  <tx:annotation-driven
    transaction-manager="transactionManager" />


  <!--
    配置SqlSessionFactoryBean
    
      可以直接在Spring的IOC中获取SqlSessionFactory
  -->
  <bean 
    class="org.mybatis.spring.SqlSessionFactoryBean">
      
      <!--设置MyBatis的核心配置文件的路径-->
    <property 
      name="configLocation"
      value="classpath:mybatis-config.xml"></property>

    <!--设置数据源-->
    <property 
      name="dataSource" 
      ref="dataSource"></property>

    <!--设置类型别名所对应的包-->
    <property 
      name="typeAliasesPackage" 
      value="com.sam.ssm.pojo"></property>

    <!--
      设置映射文件的路径, 只有映射文件的包和mapper接口的包不一致时需要设置

      <property 
        name="mapperLocations"
        value="classpath:mappers/*.xml"></property>
    -->
    <!--
    配置插件的演示:
    <property name="plugins">
      <array>
        <bean class="com.github.pagehelper.PageInterceptor" />
      </array>
    </property>
    -->
  </bean>

    <!--
      配置mapper接口的扫描
      
      可以将指定包下所有的mapper接口
      通过SqlSession创建代理实现类对象, 并将这些对象交给IOC容器管理
    -->
    <bean 
      class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property 
        name="basePackage" 
        value="com.sam.ssm.mapper"></property>
    </bean>

</beans>
```

<br><br>

## mybatis相关的配置
mybatis有两个核心的配置文件
- 核心配置文件
- mapper接口的映射文件

<br>

### mybatis-config.xml 核心配置文件
mybatis的核心配置文件的引入是在 spring中的 SqlSessionFactoryBean 的 ``<bean>`` 指定的

<br>

**要点:**  
mybatis核心配置文件中的配置 也可以在Spring配置文件中通过 SqlSessionFactoryBean 的 ``<bean>`` 的 ``<property>`` 子标签来指定

比如数据源的配置 上面就是在spring配置文件中配置的 所以这里我们就可以不写数据源的配置了

也就是说 我们在spring的 SqlSessionFactoryBean 的 ``<bean>`` 的 ``<property>`` 中配置了什么 那么这里就可以不用写什么

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

  <!--
    MyBatis核心配置文件中的标签必须要按照指定的顺序配置：
    properties?,settings?,typeAliases?,typeHandlers?,
    objectFactory?,objectWrapperFactory?,reflectorFactory?,
    plugins?,environments?,databaseIdProvider?,mappers?
  -->

    <settings>
        <!--将下划线映射为驼峰-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>

    <plugins>
        <!--配置分页插件-->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>

</configuration>
```

<br>

### mapper接口的映射文件
**要点:**  
1. mybatis是面向接口编程的, 所以我们直接创建 EmpMapper 接口
```
com.sam.ssm.mapper.EmpMapper
```

2. Mapper接口的对象我们不是通过注解管理的 我们是通过配置文件中的标签来进行管理的, **映射文件的名字 要和 Mapper接口的名字一致**

3. 我们在resource目录下创建
```
com/sam/ssm/mapper/
```

4. 只要满足了 2 3, mapper接口的映射文件 不需要在任何地方引入
  - 不需要在spring中引入
  - 不需要在mybatis的核心配置文件中引入

<br>

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper
    namespace="例: 接口全类名 com.sam.mybatis.mapper.UserMapper">

  <insert id="例: 接口方法名">
    insert into t_user
    values (null, 'admin', 'admin', 18, '男', 'admin@qq.com')
  </insert>

  <select
      id="例: 接口方法名"
      resultType="查询: 结果要转化为什么类型 全类名或配置别名"
  >
    select *
    from t_user
    where id = 1
  </select>
</mapper>
```

<br><br>

## 日志的配置文件
/resources/log4j.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">

<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">

    <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8" />
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m  (%F:%L) \n" />
        </layout>
    </appender>
    <logger name="java.sql">
        <level value="debug" />
    </logger>
    <logger name="org.apache.ibatis">
        <level value="info" />
    </logger>
    <root>
        <level value="debug" />
        <appender-ref ref="STDOUT" />
    </root>
</log4j:configuration>
```

<br><br>

## spring.xml: 配置事务
事务管理都是针对connection对象, 我们要管理事务肯定是基于connection对象操作的, 我们的连接对象是交给数据源管理的 所以需要DataSource

<br>

**这里我们要使用 tx 的事务注解驱动** 不要选错了
```xml
<!--配置事务管理器-->
<bean 
  id="transactionManager" 
  class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property 
      name="dataSource" ref="dataSource"></property>
</bean>

<!--
    开启事务的注解驱动

    将使用注解@Transactional标识的方法或类中所有的方法进行事务管理
-->
<tx:annotation-driven transaction-manager="transactionManager" />
```

<br>

配置事务后 我们就可以直接在 service层的类上方使用 @Transactional注解了(作用于类中所有的方法)

```java
@Service
@Transactional
public class EmpServiceImpl implements EmpService {
  @Autowired
  private EmpMapper empMapper;
}
```

<br><br>

# 测试: 整合
```
| - src
  | - main
    | - java
      | - com.sam.ssm.controller
      | - com.sam.ssm.mapper
      | - com.sam.ssm.pojo
      | - com.sam.ssm.service


    | - resources
      | - com/sam/ssm/mapper/
        - EmpMapper.xml
      
      - jdbc.properties
      - log4j.xml
      - mybatios-config.xml
      - spring.xml
      - springmvc.xml


    | - webapp
      | - static
      | - WEB-INF
        | - templates
          - index.html
        - web.xml


  | - test
```

<br><br>

## 控制层
```java
package com.sam.ssm.controller;

import com.github.pagehelper.PageInfo;
import com.sam.ssm.pojo.Emp;
import com.sam.ssm.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class EmpController {

  // 自动装配: 拿到service层的对象
  @Autowired
  private EmpService empService;


  // 返回员工列表接口
  /*
  @GetMapping("/emp")
  public String getAllEmp(Model model) {
    System.out.println("进来了么");
    // 查询数据
    List<Emp> list = empService.getAllEmp();
    System.out.println("list = " + list);

    // 共享到域对象
    model.addAttribute("emps", list);

    // 跳转到emp_list.html
    return "emp_list";
  }
  */

  // 查询员工列表的分页接口
  @GetMapping("/emp/page/{pageNo}")
  public String getEmpPage(@PathVariable("pageNo") Integer pageNo, Model model) {

    System.out.println("/emp/page/");
    // 获取员工的分页信息
    /*
      根据当前页的页面获取分页的相关信息
      我们返回一个PageInfo 它里面封装了各种分页相关的信息 我们将其共享到请求域 这样前台页面就可以拿到该对象做展示
    */
    PageInfo<Emp> page = empService.getEmpPage(pageNo);

    // 将分页数据共享到请求域中
    model.addAttribute("page", page);

    return "emp_list";
  }

}

```

<br>

### 业务层:
```java
package com.sam.ssm.service;

import com.github.pagehelper.PageInfo;
import com.sam.ssm.pojo.Emp;

import java.util.List;

public interface EmpService {

  List<Emp> getAllEmp();

  // 获取员工的分页信息
  PageInfo<Emp> getEmpPage(Integer pageNo);
}



package com.sam.ssm.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sam.ssm.mapper.EmpMapper;
import com.sam.ssm.pojo.Emp;
import com.sam.ssm.service.EmpService;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmpServiceImpl implements EmpService {
  // 自动装配: mapper接口中的所有接口的实现类 都以自动交给ioc来管理
  @Autowired
  private EmpMapper empMapper;

  @Override
  public List<Emp> getAllEmp() {
    return empMapper.getAllEmp();
  }

  @Override
  public PageInfo<Emp> getEmpPage(Integer pageNo) {
    /*
      不需要在mapper接口中定义操作数据库的方法了

      因为分页的使用(就是在查询语句中添加limit实现的):
        - 在查询功能之前 开启分页功能
        - 在查询功能之后 使用pageInfo收集分页数据
    */
    // 开启分页功能
    PageHelper.startPage(pageNo, 2);
    // 查询所有的员工信息
    List<Emp> emps = empMapper.getAllEmp();
    // 获取分页相关的数据: 参数: 查询出来的集合, 导航分页的页数(需要显示几个导航分页)
    PageInfo<Emp> page = new PageInfo<>(emps, 5);

    return page;
  }
}

```

<br>

### Mapper层:
```java
package com.sam.ssm.mapper;

import com.sam.ssm.pojo.Emp;

import java.util.List;

public interface EmpMapper {
  List<Emp> getAllEmp();
}

```

<br>

### 员工页面
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" th:href="@{/static/css/index_work.css}">
</head>
<body>

<table>
  <tr>
    <th colspan="6">员工列表页面</th>
  </tr>
  <tr>
    <!-- 保证每一页都编号都是从1开始的, 我们循环的时候使用 status.count -->
    <th>流水号</th>
    <th>姓名</th>
    <th>年龄</th>
    <th>性别</th>
    <th>邮箱</th>
    <th>操作(<a th:href="@{/to/add}">add emp</a>)</th>
  </tr>
  <tr th:each="emp, status: ${page.list}">
    <td th:text="${status.count}"></td>
    <td th:text="${emp.empName}"></td>
    <td th:text="${emp.age}"></td>
    <td th:text="${emp.gender}"></td>
    <td th:text="${emp.email}"></td>
    <td>
      <a onclick="delHandler(this)" th:href="@{'/emp/'+${emp.empId}}">删除</a> &emsp;
      <!--
        我们不能向如下的方法动态的拼接参数
        因为 @{...} 中的部分都会被thymeleaf当做是路径来解析, 它不会将${emp.id}当做是表达式 获取对应的值

        @{/emp/${emp.id}} 会被解析为:
         /emp/$%7Bemp.id%7D

        @{/emp/(${emp.id})}, 这样传递也是错的 该方式解析后是 ?key=value, 传参的时候也要是(key=value)
        emp/?1005

        修改:
          '/emp/': 这个部分会被thymeleaf当做路径来解析
      -->
      <a th:href="@{'/emp/'+${emp.empId}}">修改</a>
    </td>
  </tr>
</table>

<div style="text-align: center;">
  <a th:if="${page.hasPreviousPage}" th:href="@{/emp/page/1}">首页</a>
  <a th:if="${page.hasPreviousPage}" th:href="@{'/emp/page/'+${page.prePage}}">上一页</a>
  <span th:each="num : ${page.navigatepageNums}">
        <a th:if="${page.pageNum == num}" style="color: red;" th:href="@{'/emp/page/'+${num}}" th:text="'['+${num}+']'"></a>
        <a th:if="${page.pageNum != num}" th:href="@{'/emp/page/'+${num}}" th:text="${num}"></a>
    </span>
  <a th:if="${page.hasNextPage}" th:href="@{'/emp/page/'+${page.nextPage}}">下一页</a>
  <a th:if="${page.hasNextPage}" th:href="@{'/emp/page/'+${page.pages}}">末页</a>
</div>


<form id="form" method="post">
  <input type="hidden" name="_method" value="delete">
</form>

<script>
  function delHandler(target) {
    event.preventDefault()
    let href = target.href

    let form = document.querySelector("#form")
    form.action = href

    form.submit()
  }
</script>
</body>
</html>
```

<br>

### mybatis-config.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <!--
        MyBatis核心配置文件中的标签必须要按照指定的顺序配置：
        properties?,settings?,typeAliases?,typeHandlers?,
        objectFactory?,objectWrapperFactory?,reflectorFactory?,
        plugins?,environments?,databaseIdProvider?,mappers?
    -->

    <settings>
        <!--将下划线映射为驼峰-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>

    <plugins>
        <!--配置分页插件-->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>

</configuration>
```

<br>

### 映射文件
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper
    namespace="com.sam.ssm.mapper.EmpMapper">

  <select id="getAllEmp" resultType="Emp">
    select * from t_emp
  </select>
</mapper>
```

<br>

### spring.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--扫描组件（除控制层）-->
    <context:component-scan base-package="com.sam.ssm">
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!--引入jdbc.properties-->
    <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

    <!--配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"></property>
        <property name="url" value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.username}"></property>
    </bean>

    <!--配置事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!--
        开启事务的注解驱动
        将使用注解@Transactional标识的方法或类中所有的方法进行事务管理
    -->
    <tx:annotation-driven transaction-manager="transactionManager" />

    <!--配置SqlSessionFactoryBean, 可以直接在Spring的IOC中获取SqlSessionFactory-->
    <bean class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--设置MyBatis的核心配置文件的路径-->
        <property name="configLocation" value="classpath:mybatis-config.xml"></property>
        <!--设置数据源-->
        <property name="dataSource" ref="dataSource"></property>
        <!--设置类型别名所对应的包-->
        <property name="typeAliasesPackage" value="com.sam.ssm.pojo"></property>
        <!--设置映射文件的路径, 只有映射文件的包和mapper接口的包不一致时需要设置-->
        <!--<property name="mapperLocations" value="classpath:mappers/*.xml"></property>-->
    </bean>

    <!--
        配置mapper接口的扫描

        可以将指定包下所有的mapper接口
        通过SqlSession创建代理实现类对象, 并将这些对象交给IOC容器管理
    -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.sam.ssm.mapper"></property>
    </bean>

</beans>
```

<br>

### springmvc.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--扫描控制层组件-->
    <context:component-scan base-package="com.sam.ssm.controller"></context:component-scan>

    <!--配置视图解析器-->
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

    <!--配置默认的servlet处理静态资源-->
    <mvc:default-servlet-handler />

    <!--开启mvc的注解驱动-->
    <mvc:annotation-driven />

    <!--配置视图控制器-->
    <mvc:view-controller path="/" view-name="index"></mvc:view-controller>

    <!--配置文件上传解析器-->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"></bean>

</beans>
```