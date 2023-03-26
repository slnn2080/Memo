# SpringBoot
- Spring版本: 5.3.1
- SpringBoot版本: 2.7.6
```
3.0.4会导致报错

java: 无法访问org.springframework.boot.SpringApplication
错误的类文件: /C:/Users/11848/.m2/repository/org/springframework/boot/spring-boot/3.0.0/spring-boot-3.0.0.jar!/org/springframework/boot/SpringApplication.class
类文件具有错误的版本 61.0, 应为 52.0
请删除该文件或确保该文件位于正确的类路径子目录中。
```

<br><br>

## 为什么要使用SpringBoot
因为Spring, SpringMVC都需要使用大量的配置文件(xml文件) 还需要配置各种对象, 要将使用的对象放入到Spring容器中才能使用对象

那我们就需要了解其他框架的配置规则, 非常的玛法

<br>

当我们使用了SpringBoot之后 它相当于不需要配置文件的Spring + SpringMVC

常用的框架和第三方的库都已经配置好了 拿来就可以使用, 开发效果好

SpringBoot不是一个新的框架, 它还是Spring + SpringMVC, 只不过更改了它们的使用方法 简化了配置

**SpringBoot它仍然是一个容器的概念, SpringBoot中会使用大量的注解**

<br><br>

# JavaConfig
它是Spring框架中提供的使用Java类配置容器, 配置Spring IOC容器的 纯Java 方法

也就是**使用Java类作为xml配置文件的替代**, 用来配置我们的Spring容器

在这个Java类中可以创建Java对象, 把对象放入Spring容器中(注入)

<br>

## 优点:
1. 可以使用面向对象的方式, 一个配置类可以继承配置类, 可以重写方法
2. 避免繁琐的xml配置

使用JavaConfig需要两个注解的支持

<br><br>

## 注解:

### **<font color="#C2185B">@Configuration</font>**
标识这个类是作为配置文件使用的, 相当于将该类标识为xml配置文件

<br>

**位置:**  
类上方

<br>

### **<font color="#C2185B">@Bean</font>**
声明对象, 把该对象注入到容器中

<br><br>

## 准备工作:
1. 创建一个新的工程: 
  - create new project
    - empty project

2. 空工程下 创建Maven模块, 创建项目
3. 项目下pom.xml添加依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.sam</groupId>
  <artifactId>001-springboot-pre</artifactId>
  <version>1.0.0</version>

  <properties>
    <!-- spring版本: 统一管理相当于定义变量 -->
    <spring.version>5.3.1</spring.version>
  </properties>

  <dependencies>
    <!-- Spring依赖 -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <!-- 编译插件 -->
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <!-- 插件的版本 -->
        <version>3.5.1</version>
        <!-- 编译级别 -->
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
          <!-- 编码格式 -->
          <encoding>UTF-8</encoding>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>
```

<br>

4. 创建Student JavaBean: 
```
| - java
  | - com.sam.vo.Student
```

<br>

### 配置文件方式: 将Student放入容器中
/resources/beans.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


  <!-- 声明 Bean 对象 -->
  <bean id="student" class="com.sam.vo.Student">
    <property name="name" value="sam" />
    <property name="age" value="18" />
    <property name="sex" value="男" />
  </bean>
  
</beans>
```

<br>

### 测试: 创建IOC容器, 获取IOC容器中的对象
```
| - test
  | - java
    | - com.sam.test.StudentTest
```

<br>

**要点:**  

我们需要 **<font color="#C2185B">使用 ClassPathXmlApplicationContext 来读取spring的配置文件</font>** 来创建IOC容器

```java
@Test
public void test() {

  // 读取配置文件
  ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");

  // 获取IOC容器中配置的对象
  Student student = applicationContext.getBean(Student.class);

  // 使用对象
  System.out.println("student = " + student);
}
```

<br><br>

## 使用 JavaConfig方式 代替 beans.xml配置文件

### 1. 创建自定义的类
/com.sam.config.SpringConfig

<br>

### 2. 在自定义类上加上 **<font color="#C2185B">@Configuration</font>** 注解
将自定义标识为一个配置类, 用来配置容器的 相当于spring-config.xml配置文件

<br>

**位置:**  
类的上方

<br>

### 3. 将对象放入IOC容器中
### **<font color="#C2185B">@Bean(name = "bean的id值")</font>**  
类中定义方法, 方法上方使用@Bean注解, 方法的返回值就是往IOC容器中放的对象, 相当于``<bean>``标签

第2步中相当于配置spring容器, 我们在学spring的时候, 我们都会往spring的ioc容器中配置对象, 这里的操作就是

<br>

**位置:**  
方法上方使用

<br>

**参数:**  
可以直接使用 @Bean 注解, name属性用于指定``<bean id>`` id的值

<br>

**返回值:**  
方法的返回值为, 往IOC容器中注入的对象

当@Bean不指定name属性值时, 默认它所标识的方法名就是bean的id

<br>

**权限修饰符:**   
public 

<br>

- 返回值: 
- 权限修饰符: public
- 方法上方使用: @Bean 注解

<br>

```java
package com.sam.config;

import com.sam.vo.Student;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JavaConfig {

  // 将 Student 交由IOC来管理
  @Bean
  @Bean(name = "student")
  public Student createStudent() {
    // 将s1放入到IOC容器中
    Student s1 = Student("sam", 18, "男");
    return s1;
  }
}

```

<br>

### 测试: 创建IOC容器, 获取IOC容器中的对象

**要点:**  

我们需要 **使用 AnnotationConfigApplicationContext类 来读取spring的配置文件** 来创建IOC容器

<br>

**<font color="#C2185B"> new AnnotationConfigApplicationContext(参数)</font>**   
创建IOC容器

<br>

**参数:**  
参数有两种形式, 任选一种即可
1. 传入bean的id, 默认是方法名
2. 传入Student.class

<br>

**返回值:**  
AnnotationConfigApplicationContext or ApplicationContext

```java
@Test
public void test2() {
  // 创建IOC的容器的实现类对象
  // 参数: Class<?> componentClasses, 组件的类
  ApplicationContext context = new AnnotationConfigApplicationContext(JavaConfig.class);

  // 获取对象
  /*
    参数形式1: 
      @Bean标识类的方法的方法名: 相当于我们传入的是bean的id, 返回值为Object, 需要强转

    参数形式2: 
      @Bean标识类.class: 不用强转
  */
  Student bean = context.getBean(Student.class);

  System.out.println("bean = " + bean);

}
```

<br><br>

## @ImportResource 注解

<br>

### 使用方式:  
写上配置文件在类路径下的位置
```java
@ImportResource("classpath:配置文件名");
```

<br>

**引入多个配置文件:**  
```
@ImportResource({"classpath:配置文件名1", "classpath:配置文件名2"});
```

<br>

### 位置:
类上方

<br>

### 作用:
@ImportResource用于导入其它的xml配置文件

等同于在xml文件中的 ``<import resource="指定其他的xml配置文件">``
```xml
<!-- 
  在配置文件中引入其他的配置文件, 
  两个配置文件的配置和在一起
 -->
<import resource="指定其他的xml配置文件">  
```

<br>

比如我们有一些bean的配置是在配置文件中的时候, 然后我们还想使用JavaConfig这种方式配置容器

我们可以**使用 @ImportResource 利用已经存在的配置文件**

<br>

### 测试:
1. com.sam.vo.Cat: 有一个JavaBean
2. /resources/applicationContext.xml: 资源目录下有一个spring的配置文件 里面配置了Cat的``<bean>``
```xml
<bean id="cat" class="com.sam.vo.Cat">
  <property name="name" value="tom" />
  <property name="age" value="2" />
  <property name="cardId" value="9736" />
</bean>
```

<br>

我们创建IOC容器时, 会读取JavaConfig类作为配置文件, 但是JavaConfig类中并没有将Cat对象放入到IOC容器中, 我们只是往IOC容器中放了Student

```java
@Configuration
public class JavaConfig {

  // 只放了Student
  @Bean
  public Student createStudent() {
    return new Student("sam", 18, "男");
  }
}
```

<br>

我们也想将Cat对象放入IOC中, 这时我们就可以利用已有的xml配置文件, 我们可以使用@ImportResource("配置文件名")注解 将已有的配置文件 和 现在的配置进行合并

```java
@Configuration
// 引入已有的配置文件, 注意关键字 classpath:
@ImportResource("classpath:applicationContext.xml")
public class JavaConfig {
  @Bean
  public Student createStudent() {
    return new Student("sam", 18, "男");
  }
}
```

<br><br>

## @PropertyResource 注解

### 作用:
读取 .properties配置文件的, 它可以找到该配置文件, 从而读取.properties配置文件的数据

使用属性配置文件可以实现外部化配置 **在程序代码之外提供数据**

<br>

它可以将 application.yml 或 application.properties 主配置文件中的属性值与 Java Bean 对应属性进行注入

<br>

### 格式:  
value属性值为类路径下的配置文件路径, 让spring框架读到该配置文件
```java
@PropertySource("classpath:tiger-config.properties")
```

<br>

### 属性:
我们还可以指定encoding属性 来设置读取的编码格式吧
```java
@PropertySource(
  value="classpath:tiger-config.properties",
  encoding="UTF-8"
)
```

<br>

### 读取.properties配置文件的数据:
**<font color="#C2185B">@Value("${key}")</font>**  
在类中的属性上方使用该注解, 将从配置文件中读到的值 注入到属性中

```java
public class Tiger {
  // tiger.name 就是 properties配置文件中的key
  @Value("${tiger.name}")
  private String name;
}
```

<br>

### 测试: @PropertyResource读取.properties配置文件

**1. 创建tiger-config.properties文件**  
```
tiger.name=东北老虎
tiger.age=3
```

<br>

**2. 在JavaConfig类上使用@PropertyResource注解读取properties配置文件**  

<br>

**3. 在JavaConfig类上使用@ComponentScan扫描组件**  
我们下面的代码, 相当于在xml配置文件中使用``<bean>``的方式将对象配置到IOC容器中

我们在学习spring的时候还有一种方式, 也可以将对象交由spring来管理就是 注解 + 扫描

我们会在JavaBean上使用@Component等注解 将其标识为一个组件

然后我们会在配置文件中配置扫描, 只不过这个配置扫描的步骤当我们使用的是JavaConfig类的时候

我们就可以使用 **<font color="#C2185B">@ComponentScan("包路径")</font>** 的方式扫描指定包下的组件

```java
@Configuration
@ImportResource("classpath:applicationContext.xml")
// 读取properties配置文件
@PropertySource("classpath:tiger-config.properties")
// 扫描指定包下的组件
@ComponentScan("com.sam.vo")
public class JavaConfig {
  @Bean
  public Student createStudent() {
    return new Student("sam", 18, "男");
  }
}
```

<br>

**4. 在Tiger类上方使用@Component 将该类交由IOC来管理**

<br>

**5. 在属性上方使用@Value("${key}")的方式读取配置文件中的数据 赋值给属性**

```java
@Component
public class Tiger {

  @Value("${tiger.name}")
  private String name;

  @Value("${tiger.age}")
  private Integer age;

}
```

<br><br>

## 读取 springboot配置文件中的自定义属性
上面我们在配置类上使用 @PropertyResource 注解 指明了 .properties 文件所在的位置

然后我们使用 @Value 注解 读取到我们在.properties 文件中声明的数据

<br>

这里我们不利用别的.properties文件, 而是将我们自定义的数据直接放到 application.properties 或者 application.yml 文件中 

**application.yml**  
我们在配置文件声明了自定义的属性 和 值
```s
# 自定义属性:
reggie:
  path: /Users/liulin/Desktop/pic
```

<br>

**任意类:**  
任意类中都可以通过 @Value 注解获取到我们声明在 application.yml 文件中定义的kv
```java
public class CommonController {

  @Value("${reggie.path}")
  private String basePath;

}
```

<br><br>



# SpringBoot入门
SpringBoot就是简化SpringMVC和Spring的配置, 所以它们的思想是一样的就是IOC容器

容器无外乎就是将对象交给IOC去创建的 我们需要从容器中拿对象来用 所以思想就是先将对象交给容器 我们再考虑使用的问题

<br>

## 特点:
**1. 创建一个独立的Spring应用**

<br>

**2. 内嵌Tomcat(默认) and Undertow and jetty 服务器, 就意味着我们不用单独的安装Tomcat**

<br>

**3. 提供了starter起步依赖, 简化应用的配置**
比如我们要使用mybatis框架, 需要在Spring项目中 配置MyBatis对象SqlSessionFactory, Dao的代理对象 

现在在SpringBoot的项目中, 在pom.xml里面加入 <font color="#C2185B">mybatis-spring-boot-starter</font> 依赖

加入之后SqlSessionFactory, Dao的代理对象相关的配置就自动配置好了, 也就是说将我们要用到的技术所需要的依赖都会自动配置好

<br>

**4. 自动配置: 尽可能去配置spring和第三方库**  
我们在SpringBoot项目中我们就可以直接使用Spring

一样我们在做Web的时候 我们需要配置前端控制器, 在SpringBoot中前端控制器也配置好了

例如MyBatis这样的第三方库也会尽可能的配置好, 放入容器中我们直接使用就可以

<br>

**5. 提供了健康检查 统计 和 外部化配置**  
SpringBoot项目中自动了检查的功能 检查我们的项目是否正常的运转

<br>

**6. 不用生成代码, 也不用使用xml做配置**

<br><br>

# 创建SpringBoot项目
我们有很多种方式来创建SpringBoot项目
1. 使用SpringBoot的初始化器 以向导的方式一步步创建项目
2. 直接创建Maven项目, 它也可以当做是SpringBoot项目来用 

<br><br>

## 使用SpringBoot的初始化器: 创建SpringBoot项目

1. 新建Module时选择: Spring Initializr

<br>

2. 选择向导对应的url地址, 选择默认 点击next
```
choose initializr service url
- default: https://start.spring.io
- custom: 国内可以选择 http://start.springboot.io 比较快
```

<br>

3. 配置如下的信息 点击next
```
Group:     com.sam

Artifact:  项目名: springboot-first (不能以数字开头)

Type: 项目的构建工具 (默认选项 Maven)

Language:  _____

Packaging: jar or war

Java Version: 8

Name: 它只是一个标识会在pom里面显示一样而已, 无知的我填写和Artifact一样的

Package: 包名
```

![SpringBoot初始化器1](./imgs/SpringBoot初始化器1.png)

<br>

4. 这个界面选择我们要用到的Maven依赖项
  - 选择SpringBoot的版本
  - web选项卡: 
    - ✅Spring Web - web工程, 就会有SpringMVC了
    - Spring Reactive Web - 异步编程依赖
    - Spring Session - 会话的

  - Template Engines选项卡: 模版引擎

  - Security: 安全框架
    - Spring Security
    - oAuth2

  - Sql: 数据库
    - MyBatis
    - Mysql Dirver

![SpringBoot初始化器2](./imgs/SpringBoot初始化器2.png)

<br>

5. 点击finish就ok了

<br><br>

## SpringBoot项目的结构
![SpringBoot项目结构](./imgs/SpringBoot项目结构.png)

```s
| - .mvn
| - src
  | - main
    | - java

    # 资源文件目录
    | - resources

      # 静态资源目录如: js css
      | - static

      # 模版文件
      | - templates

      # SpringBoot的配置文件
      - application.properties

  | - test

- .gitignore

# 描述文件
- HELP.md
- mvnw
- mvnw.cmd

- pom.xml
```

<br>

**mvnw:**  
带有mvn相关的都是Maven的工具, 如果我们使用 mvnw执行Maven命令时, 如果我们没有相关的命令它会帮我们自动安装

.mvn mvnw HELP.md mvnw.cmd 都是可以删掉的

<br>

### Pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>


  <!-- 

    SpringBoot项目的父项目:
      它负责管理依赖 和 版本
      跟SpringBoot项目有关的依赖和版本 都在父项目中加以定义和声明
   -->
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <!-- 
      当前版本为 3.0.4
      可以改成和老师一样的 2.4.2
     -->
    <version>3.0.4</version>
    <relativePath/>
  </parent>


  <!-- 当前项目自己的坐标 -->
  <groupId>com.sam</groupId>
  <artifactId>springboot-first</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>springboot-first</name>
  <description>springboot-first</description>


  <!-- JDK版本 -->
  <properties>
    <java.version>1.8</java.version>
  </properties>


  <dependencies>
    <!-- web的起步依赖: (具有SpringMVC的功能) -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <!-- 这里没有加版本号就是继承parent的 -->
    </dependency>
    
    <!-- 测试的 -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <!-- SpringBoot项目要使用的Maven插件 -->
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>

    <!-- 
      spring-boot-maven-plugin
      这里爆红了 解决方式
      1. 在 <plugins> 外围加上了 <pluginManagement>

      2. 加上了 <version> 和 parent一致就可以
    -->
  </build>

</project>

```

<br><br>

## 创建普通Maven项目: 创建SpringBoot项目
1. 创建Module 选择Maven

2. pom.xml中配置 ``<parent>``, 添加后我们这个项目的开发就是基于SpringBoot的了
```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.0.4</version>
  <relativePath/>
</parent>
```

3. 添加依赖
```xml
<dependencies>
  <!-- weby依赖 -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!-- 这里没有加版本号就是继承parent的 -->
  </dependency>
  
  <!-- 测试的 -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```

4. 目录结构要个SpringBoot的一致 所以我们自己在/resources/ 下创建欠缺的目录和文件 
  - /static
  - /template
  - application.properties

<br><br>

## 基于SpringBoot的Web案例
SpringBoot内置了Tomcat我们不用配置Tomcat了, 而是通过入口文件的main()方法来启动项目

<br>

**1. 创建一个Controller**
```java
// 响应数据
@RestController
public class HelloSpringBoot {
  // 映射接口
  @GetMapping("/hello")
  public String helloSpringBoot() {
    return "欢迎使用SpringBoot框架";
  }
}
```

<br>

**2. SpringbootFirstApplication.java中执行main()**  
我们自动生成的SpringBoot项目中的com.sam包下 自动创建了这样的一个类 当中有main方法
```java
package com.sam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 入口文件使用的注解
@SpringBootApplication
public class SpringbootFirstApplication {

  public static void main(String[] args) {
    SpringApplication.run(SpringbootFirstApplication.class, args);
  }

}
```

<br>

**3. <font color="#C2185B">项目的管理:</font>**  
当我们执行main()方法后, 右下角会弹出一个窗口
```
Services
  Multiple Spring Boot run configurations were detected ...
```

我们点这个窗口, 找到 ``show run configurations in servies`` 

点击后 会在终端的位置出现一个services的tab页签, 里面可以控制我们的项目的
- 启动
- 调试
- 停止

<br>

**注意:**  
没有窗口弹出的话, 找到窗口 View/Tool Windows/Services 点击

<br>

### 总结:
比较SpringMVC真的方便了很多, 我们没有配置web.xml中的前端控制器等, 没有配置tomcat, 直接启动了main()

<br><br>

## @SpringBootApplication注解

### 位置:
我们在创建一个SpringBoot的项目后, 默认就会在 com.sam 这个包下创建一个这样的类(主启动类)

该类中包含一个main()方法, 不管是我们开发什么应用 我们的SpringBoot应用都是通过main()方法来启动的

<br>

### 作用:
@SpringBootApplication注解是一个复合注解 是有多个注解功能组成的, 如下的注解的功能就是该注解的功能

- @SpringBootConfiguration
- @EnableAutoConfiguration
- @ComponentScan: 能够扫描程序中的所有注解

1. 使用@SpringBootConfiguration注解标注的类, 可以做为配置文件使用的 可以使用@Bean声明对象 将其注入到容器

2. @EnableAutoConfiguration开启自动配置

3. @ComponentScan扫描主启动类下级目录中所有的组件

<br>

**@SpringBootConfiguration:**   
该注解的作用和 @Configuration 注解的作用一致, 也就是说 有了 **@SpringBootConfiguration** 注解的类, 它所标识的类就可以当做配置文件来使用

比如我们可以在该类中定义Bean将其注入到容器中

```java
// 我们可以在启动类中 将某个对象注入到容器中
@SpringBootApplication(scanBasePackages="controller")
public class SpringbootFirstApplication {

  public static void main(String[] args) {
    SpringApplication.run(SpringbootFirstApplication.class, args);
  }


  // 在主启动类中将Student放入到IOC容器中
  @Bean
  public Student createStudent() {
    return new Student()
  }
}
```

<br>

**@EnableAutoConfiguration:**  
启用自动配置, 把Java对象配置好注入到Spring容器中

例如通过启动该注解就可以自动把mybatis之类对象创建好 放入到容器中

<br>

**@ComponentScan:**  
组件扫描器, 通过它扫描包下的组件 来创建对象 给属性赋值等

<br>

### @SpringBootApplication注解源码:
我们观察该注解的原码发现, 它身上还有如下的几个注解
```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
  excludeFilters = {@Filter(
  type = FilterType.CUSTOM,
  classes = {TypeExcludeFilter.class}
), @Filter(
  type = FilterType.CUSTOM,
  classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication { ... }
```

<br>

### 主启动类的位置关系
```
| - java
  | - com.sam

    | - controller
      - HelloSpringBoot

    | - vo
      - Student

    - Application
```

我们发现主启动器和其它的子包是同一级目录, **Application所处的位置是在 controller 和 service 包的上层目录**

<br>

**作用:**  
这样的位置关系的作用是, @ComponentScan它会默认扫描是 它所在的类 所在的包 它 的子包下的所有类
```
@SpringBootApplication 也有和 @ComponentScan 同样的作用
```

SpringBoot这样的配置 不用我们再自己配置组件扫描了 简化了操作

<br>

也就是说 主启动类的层级如果不对 是起不到扫描组件的作用的

<br><br>

## 主启动类的格式:

1. 在主包下创建该类, controller包在该类的下层子包下

2. 使用 @SpringBootApplication 标识该类

3. 类中有main()方法

4. main()方法中要有 ``SpringApplication.run()`` 方法

5. run()方法的两个参数为:
  - 当前类的 Application.class
  - args 参数

```java
@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

}
```

<br><br>

# 主启动类: @ServletComponentScan注解
当我们在主启动类上使用该注解后 
- Servlet
- Filter
- Listener

如上的组件可以直接通过如下的注解自动注册, 无需其他的代码
- @WebServlet
- @WebFilter
- @WebListener

```java
@SpringBootApplication
@ServletComponentScan
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}

```

<br><br>

# SpringBoot的配置文件: resources/application.properties

<br>

## SpringBoot的配置文件格式
SpringBoot的配置文件的配置文件有两种格式的扩展名, **文件名必须是 application 开始**

1. .properties 结尾的文件 (key=value)
2. .yml 结尾的文件 (key: value)

它们所表达的内容是一样的 就是格式上的区别 早期的时候使用的是properties, 后面使用的是yml(主推)

<br>

**默认采用的是 properties文件**

<br><br>

## 使用properties格式的配置文件 配置项目
设置服务器相关的都是 server. 开始的, 在官网的手册里是有各种配置的说明的

1. 设置访问应用的端口号
2. 设置访问应用的工程路径

```s
# 设置端口号
server.port=8081

# 设置访问应用上下文路径
server.servlet.context-path=/gwes

# 当程序出错的时候会执行error.path指定接口中的逻辑
server.error.path=/error
```

<br><br>

## 使用yml格式的配置文件 配置项目
yml是一种yaml格式的配置文件 主要采用一定的空格 换行等格式排版进行配置

yml的配置方式因为有结构化 所以观察起来特别的清晰

<br>

### 格式:
_是空格, 必须有空格, **文件名必须是 application**
```properties
key: _value
```

<br>

### 注意:
1. 当两个格式的配置文件同时存在的时候 在SpringBoot2.4开始 使用的是yml配置文件, **二选一**

2. IDEA中会自动给我们组织层级关系

3. 空格最好不要用tab

<br>

### 演示:
```yml
server:
  port: 8082
  servlet:
    context-path: /gwes2
```

<br><br>

## 多环境配置
在实际开发过程中, 我们的项目会经历很多的阶段 (开发 - 测试 - 上线), 每个阶段的配置也会不同

例如 端口 上下文 数据库等 那么这个使用为了方便在不同的环境之间切换 SpringBoot提供了多环境配置

<br>

### 描述
我们在开发阶段写程序写代码 就是开发环境, 当我们自测后会交给测试人员来进行整体的测试

那么测试人员所用到的数据库 服务器ip port 肯定和我们自己的计算机是不一样的 这个就是测试环境

最后我们的项目上线了给用户使用了, 用户使用的服务器 端口号 数据库 跟我们本机和公司测试的环境 都是不一样的

那我们怎么方便的切换到开发环境 测试环境呢? 这就是多环境

<br>

**解决方式:**   
我们可以通过一个简单的方式 将项目的配置信息由开发环境变成测试环境, 相当于我们修改了配置数据

这3个环境的数据库 端口号 路径都是不同的我们要方便切换

<br>

### 多环境
多环境的配置 就是要对每一种环境配置一个配置文件 因为每个环境有不同的配置信息 如

- 端口号
- 上下文
- 数据库url
- 用户名
- 密码等

<br>

**命名规则:**  
application开头
```
application-环境标识.properties | yml
```

- 开发环境: application-dev.properties
- 测试环境: application-test.properties
- 生产环境: application-product.properties

<br>

使用多环境配置文件 可以方便的切换不同的配置

<br>

### 使用方式:
**1. 保留 application.properties 文件, 项目在启动时会默认读取到配置文件**

<br>

**2. 另为不同环境创建不同的配置文件**
```s
# 开发环境的配置文件
server.port=8003
server.servlet.context-path=/myproduct


# 开发环境的配置文件
server.port=8002
server.servlet.context-path=/mytest


# 开发环境的配置文件
server.port=8001
server.servlet.context-path=/mydev
```

<br>

**3. 在默认的配置文件中(application.properties) 配置激活哪一个文件**  
我们配置spring.profiles.active的值就可以实现多环境的切换

```s
# 配置使用哪个环境的配置文件
spring.profiles.active=dev
```

我们只需要写 **环境标识符** 的部分, 这样项目在启动时就会激活开发环境的配置文件了

application.properties配置文件感觉有点像分发

<br><br>

# 从外部配置文件中读取数据
外部配置文件就是 .properties 文件

比如我们将数据配置到 application.properties 文件中, 然后我们从该文件中读取数据使用

<br><br>

## 准备工作:
我们在配置文件中配置了很多数据, 接下来我们要在Controller中使用这些数据
```s
# 开发环境的配置文件
server.port=8081
server.servlet.context-path=/mydev

# 自定义key=value
school.name=BliBli
school.website=www.sam.com
school.address=东京

site=www.baidu.com
```

<br><br>

## 控制层中读取配置文件的数据

### 使用 @Value("${key}") 的方式
```java
@Controller
public class BootController {

  // 获取配置文件中的数据
  @Value("${school.name}")
  private String schoolName;

  @Value("${school.website}")
  private String website;

  @Value("${school.address}")
  private String address;


  @GetMapping("/")
  @ResponseBody
  public String doSome() {

    return "学校网址: " + website + ", 学校名: " + schoolName;
  } 
}
```

<br>

### 使用场景:
通过配置文件来提供数据, 后续如果文件发生变化 我们可以手动的修改配置文件

<br>

### 注意:
1. 我们没有使用 @PropertyResource 注解哦
2. 有人说配置文件尽可能不要用.properties 可以避免乱码

<br><br>

## @ConfigurationProperties注解
上面的例子中我们从properties文件中获取数据的时候, 都是在类中声明一个个属性 每个属性对应配置文件中的一个key

这种获取数据的方式零散 且繁琐, 当有大量的自定义数据的时候就会变得难以处理

<br>

**解决方式:**  
我们将配置文件中的自定义属性映射成一个Java对象, 也就是将配置文件中的数据 赋值给Java对象的属性

<br>

### 作用:
将.properties配置文件映射成一个对象

<br>

### 使用场景:
用于自定义配置项比较多的情况

<br>

### 使用方式: @ConfigurationProperties(prefix="school")
```java
// 也可以这么写
@ConfigurationProperties("school")
```

<br>

**1. 配置文件中的自定义数据:**  
```s
server.port=8081
server.servlet.context-path=/mydev

# 自定义数据
school.name=BliBli
school.website=www.sam.com
school.address=东京
```

<br>

**2. 创建一个Java类用于承装自定义数据:**  
JavaBean类中的属性名 和 配置文件中的 **前缀.key** 的key的部分保持一致

<br>

**类上方使用@Component注解**

<br>

**类上方使用 <font color="#C2185B">@ConfigurationProperties(prefix="school")</font> 标识**  
前缀就是上面配置文件中的school的部分 

当我们使用了该注解后 相当于告诉框架要到配置文件中找指定前缀开头标识的数据 封装到该注解所标识的类中的属性里

如果类中的属性名 和 **前缀.key 的key部分一致** 则将数据赋值给属性

```java
@Component
@ConfigurationProperties(prefix = "school")
public class SchoolInfo {
  private String name;
  private String website;
  private String address;

  ...
}

```

<br>

### 测试:
Controller类中 我们使用**自动注入的方式**获取School对象

<br>

**要点:**  
下面的两个注解都是用来自动注入的, 效果也是一样, Autowired是Spring提供的, Resource是JDK提供的

- @Autowired
- @Resource (会现根据school找对应的对象, 如果没有再通过SchoolInfo类型进行匹配)


```java
@Controller
public class BootController {

  // 它也是自动注入的一种注解: 它先会使用byName 然后再用byType
  @Resource
  private SchoolInfo school;

  @GetMapping("/")
  @ResponseBody
  public String doSome() {
    // 返回这个学校的信息
    return school.toString();
  }
}

```

<br>

### 扩展:
我们使用 ``@ConfigurationProperties(prefix = "school")`` 注解后 控制上会报提示

```
Spring Boot Configuration Annotation Processor not configured
```

它是说最好给我们的项目添加一个 Spring Boot Configuration Annotation Processor 的依赖项 用来处理我们的 @ConfigurationProperties

<br>

我们在properties配置文件中使用预定义的属性的时候, 是有提示信息的 之所以是有元数据信息 是因为有一个 configuration-metadata 的一个json文件

<br>

但是我们自己写的 school.name 是没有提示信息的, 如果我们想要达到在输入我们自定义的数据时也有提示自动补全的功能

我们就需要在pom.xml文件中添加一个依赖

```xml
<!-- 
  处理 和 @ConfigurationProperties 注解 有关的元数据的信息的
 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-configuration-processor</artifactId>
  <optional>true</optional>
</dependency>
```

<br><br>

## SpringBoot项目中的测试
我们可以在测试类上添加 @SpringBootTest 注解 

使用后在测试类中就可以对IOC容器所管理的组件来进行自动装配了

```java
@SpringBootTest
public class MyBatisTest {
}
```

<br><br>

## SpringBoot项目中使用JSP
使用SpringBoot的时候并不推荐使用JSP, 它默认也不支持JSP, 我们需要经过一系列的配置后才可以使用

<br>

### 1. 依赖
处理JSP的依赖, 它负责编译JSP文件

如果我们需要使用servlet, jsp, jstl等功能 我们要添加对应的依赖

```xml
<!-- 处理jsp的依赖 -->
<dependency>
  <groupId>org.apache.tomcat.embed</groupId>
  <artifactId>tomcat-embed-jasper</artifactId>
</dependency>

<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
</dependency>

<dependency>
  <groupId>javax.servlet.jsp</groupId>
  <artifactId>javax.servlet.jsp-api</artifactId>
  <version>2.3.1</version>
</dependency>

<dependency>
  <groupId>javax.servlet</groupId>
 <artifactId>jstl</artifactId>
</dependency>
```

<br>

### 2. 创建一个存放jsp的目录 一般叫做webapp
我们现在的项目是普通的一个Java项目, jsp需要存放在webapp目录下

所以我们手动创建了webapp目录, 但是这时webapp只是一个普通的目标 我们要改变该目录的性质, 让其变成web资源目录

```
| - ctrl + ;
  | - 找到模块下的web目录
    | - 在web resource directories 的位置, 选择webapp作为web资源目录
```

当我们的webapp文件夹上**有蓝色的小点时** 它才是web资源目录

<br>

### 3. 在 pom.xml 的 build 标签中要配置以下信息
指定jsp文件的编译后存放目录

SpringBoot 要求 jsp 文件必须编译到指定的 **<font color="#C2185B">META-INF/resources</font>** 目录下才能访问，否则访问不到。

```xml
<build>

<resources>
  <resource>
    <!--jsp原来的目录-->
    <directory>src/main/webapp</directory>
    <!--
      指定编译到META-INF/resource，该目录不能随便写
    -->
    <targetPath>META-INF/resources</targetPath>

    <!--
      指定要处理的目录和文件
        把哪些文件 和 任意子目录中的文件编译到 META-INF/resources下
    -->
    <includes>
      <include>**/*.*</include>
    </includes>
  </resource>
</resources>

</build>
```

<br>

### 4. 创建Controller 访问jsp页面
```java
@Controller
public class JspController {

  @RequestMapping("/myjsp")
  public String doJsp(Model model) {
    model.addAttribute("data", "SpringBoot使用JSP");

    // 返回逻辑视图名
    return "index";
  }
}
```

<br>

### 5. 在application.properties文件中 配置视图解析器
因为我们现在使用的视图技术是jsp
```s
# 配置端口号
server.port=8081

# 配置视图解析器
# 配置前缀: /标识 src/main/webapp
spring.mvc.view.prefix=/
# 配置后缀: 
spring.mvc.view.suffix=.jsp
```

<br><br>

# SpringBoot中使用IOC容器
在Spring和SpringMVC阶段我们可以创建容器 或者通过监听器创建容器

那我们在SpringBoot项目中怎么使用IOC容器对象

<br>

## 入口主启动类的run()的返回值
我们在主启动类中的main()方法中会指定run()方法, 而run()方法的返回值是 **ConfigurableApplicationContext**

```java
@SpringBootApplication
public class Application {

  public static void main(String[] args) {

    ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);

  }

}
```

<br>

### ConfigurableApplicationContext 接口
run()方法的返回值是一个接口 该接口继承了 ApplicationContext(它就是容器)

而ConfigurableApplicationContext是ApplicationContext的子接口, 所以**ConfigurableApplicationContext也是一个容器**

<br>

### 总结:
run()方法的返回值就是容器, 如果我们想手动的通过容器获取对象 就通过run()的返回值拿到容器后, 再获取对象

```java
@SpringBootApplication
public class Application {

  public static void main(String[] args) {

    // 通过 run() 方法的返回值获取 IOC 容器
    ConfigurableApplicationContext IOC = SpringApplication.run(Application.class, args);

    // 通过容器调用getBean()拿到指定的容器中的对象
    SchoolInfo info = IOC.getBean(SchoolInfo.class);
  }

}
```

<br>

### 使用场景
手动获取IOC容器中的对象的场景 可以是测试的时候 我们不希望将整个项目跑起来只是想运行其中的一个部分 看看它好不好用 我们就可以通过该方式

```java
@SpringBootApplication
public class Application {

  public static void main(String[] args) {

    // 通过 run() 方法的返回值获取 IOC 容器
    ConfigurableApplicationContext IOC = SpringApplication.run(Application.class, args);

    // 从IOC容器中获取service对象 调用service的某个方法查询输出结果
    UserService userService = IOC.getBean(UserService.class);

    userService.sayHello("sam");
  }

}
```

<br><br>

## CommanLineRunner 接口
开发中可能会有这样的情况, 需要在容器启动后执行一些内容比如读取配置文件 数据库连接之类的 

SpringBoot给我们提供了两个接口来帮助我们实现这种需求

- CommandLineRunner
- ApplicationRunner

它们的执行时机为容器启动完成的时候, 这两个接口中有一个run()方法 我们只需要实现这个方法即可

<br>

**<font color="#C2185B">当容器对象创建好后 会自动执行run()方法中的逻辑</font>**, 这两个接口使用哪个都可以

这里的容器指的就是IOC容器

<br>

### CommandLineRunner接口
```java
@FunctionalInterface
public interface CommandLineRunner {
  void run(String ... args) throws Exception;
}
```

<br>

### ApplicationRunner接口
```java
@FunctionalInterface
public interface ApplicationRunner {
  void run(ApplicationArguments args) throws Exception;
}
```

<br>

### 两个接口的区别
ApplicationRunner 中的 run方法的参数为 ApplicationArguments

CommandLineRunner 中的run方法的参数为 String数组

<br>


### CommandLineRunner 使用方式:
1. 入口启动类实现CommandLineRunner接口 实现run()方法

2. 输出顺序为: 当IOC容器创建好后紧接着就是执行抽象方法run()中的逻辑, 最后才是容器对象创建之后
```
容器对象创建之前
接口中的run()方法中的逻辑
容器对象创建之后
```

```java
@SpringBootApplication
public class Application implements CommandLineRunner {

  // 自动注入
  @Resource
  private HelloService hellService;


  public static void main(String[] args) {

    System.out.println("容器对象创建之前");
    // 创建容器对象
    ConfigurableApplicationContext IOC = SpringApplication.run(Application.class, args);
    System.out.println("容器对象创建之后");
  }


  @Override
  // args参数就是main()方法中的args
  public void run(String... args) throws Exception {
    System.out.println("我是容器对象创建好后执行的方法, 比如读取文件 读取数据库等操作");

    // 调用service对象的方法
    hellService.sayHello();
  }
}
```

<br>

因为 抽象方法run()是在容器创建之后执行的 所以在run()方法中是可以获取到IOC容器中的对象的

<br><br>

# SpringBoot: 拦截器
SpringMVC中我们讲过, 它可以拦截对Controller的请求

框架中有系统的拦截器, 我们还可以自定义拦截器, 实现对请求的预先处理

SpringMVC中的拦截器是拦截控制器方法的 它会在控制前方法的之前 之后 和 渲染视图后执行对应的逻辑

<br><br>

## 自定义拦截器的实现 (配置类的使用)

### 1. 创建拦截器类, 实现HandlerInterceptor接口
该类中用于定义拦截器的处理逻辑

创建类实现SpringMVC框架中的 HandlerInterceptor接口

- preHandle
- postHandle
- afterCompletion

<br>

比如我们可以使用 preHandle **来实现对请求的拦截和处理** 它的返回值为boolean
- true: 通过拦截 请求可以被Controller处理
- false: 请求截断

<br>

com.sam.springbootenvironment.interceptor.LoginInterceptor
```java
public class LoginInterceptor implements HandlerInterceptor {
  // 重写 preHandle
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    System.out.println("拦截登录请求");
    return true;
  }
}
```

<br>

### 2. 创建配置类, 将拦截器类注册到容器中: @Configuration
这里我们使用的方式类似我们在SpringMVC中接触到的配置类一样

<br>

**1. 创建一个配置类, 让其实现 WebMvcConfigurer 接口**
WebMvcConfigurer接口中有很多跟SpringMVC相关的功能

比如之前在SpringMVC中要是注册拦截器需要写xml配置文件, 现在是将xml文件的配置移到了 WebMvcConfigurer 接口的方法中

**注意:**  
因为是配置类 所以 **<font color="#C2185B">要加上 @Configuration 注解</font>**

<br>

**接口中的方法**
- addInterceptors(): 添加拦截器对象的
- addResourceHandlers(): **处理静态资源的, 比如处理静态资源存放目录的**
- addViewControllers(): 添加视图控制器
- extendHandlerExceptionResolvers(): 异常解析器

<br>

**2. 配置拦截器, 重写addInterceptors()方法** 
利用该方法将拦截器进行注册, 这样框架就知道有拦截器了

<br>

**registry身上的api:**  
- addPathPatterns(string ... patterns): 设置拦截路径 参数是一个数组
- excludePathPatterns(tring ... patterns): 不拦截谁
- order(int order): 多个拦截器时, 指定优先级

<br>

com.sam.springbootenvironment.config;
```java
// 配置类要加上该注解
@Configuration
public class JavaConfig implements WebMvcConfigurer {
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    // 创建一个拦截器对象
    LoginInterceptor loginInterceptor = new LoginInterceptor();

    // 注册该拦截器对象 并指定拦截路径
    registry.addInterceptor(loginInterceptor).addPathPatterns("/login");
  }
}
```

<br>

**注意:**  
这里创建拦截器对象只能用new创建, 不能使用@Component 和 @Resource 注解和自动装配

因为@Resource只能修饰成员变量(或构造方法 或 set方法) 这里要么写在方法外用注解注入, 要么写在方法内用new创建

<br>

### 处理静态资源存放目录
一般情况下 我们的静态资源必须要放在如下的目录下
- static
- templates

如果静态资源不在这两个目录下就会报错 404, 这里我们也可以通过配置类来解决这个问题

<br>

### 解决方式:
我们要**通过配置类的方式 解决静态资源的映射问题**

告诉我们的mvc框架, backend 和 front 目录下存放的是静态资源

设置静态资源映射 我们通过浏览器发送的请求 比如我们请求的是 /backend/index.html 它就会映射到 /backend目录下的index.html
```java
package com.sam.reggie.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    log.info("开始进行静态资源映射");
    // 设置 请求资源 映射到 哪个目录下 addResourceHandler资源处理器, 主要路径中 backend 就会映射到
    registry.addResourceHandler("/backend/**").addResourceLocations("classpath:/backend/");
    registry.addResourceHandler("/front/**").addResourceLocations("classpath:/front/");
  }
}
```

<br>

1. 我们实现addResourceHandlers()方法 通过该方法来设置 请求资源 映射到 哪个目录下
2. registry.addResourceHandler("/backend/**"): 如果请求路径中含有 backend 则映射到 指定的目录
3. addResourceLocations("classpath:/backend/"): 映射到classpath下的某个目录


<br><br>

# SpringBoot: Servlet
在SpringBoot中使用servlet对象

<br><br>

## 使用步骤
1. 创建Servlet类, 创建类继承HttpServlet
2. 注册Servlet, 让框架找到Servlet

<br><br>

### 1. 创建Servlet类

```java
public class MyServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    doPost(req, resp);
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    // 设置响应数据编码格式
    // resp.setContentType("text/html;charset=utf-8");

    // resp.getWriter().write("hi, servlet");
    PrintWriter out = resp.getWriter();
    out.println("hi, servlet");
    out.flush();
    out.close();
  }
}

```

<br>

### 2. 注册Servlet, 创建配置类
servlet要想能被访问 必须让框架能够找到servlet对象, 所以我们要注册servlet

1. 创建配置类, 使用@Configuration
2. 将servlet对象放入ServletRegistrationBean对象(承装servlet的容器), 再将ServletRegistrationBean对象交由IOC容器管理(@Bean + 方法返回值)

<br>

**<font color="#C2185B">new ServletRegistrationBean(servlet, url-pattern)</font>**  
它是用来承装servlet的容器

它有两个构造方法, 无参和二参

<br>

**参数:**  
1. servlet对象
2. 访问servlet的地址

<br>

```java
@Configuration
public class JavaConfig implements WebMvcConfigurer {

  // 定义方法, 注册servlet对象, 使用@Bean哦
  @Bean
  public ServletRegistrationBean servletRegistrationBean() {

    // 使用有参构造的方式:
    // 创建servlet的容器 将servlet 和 访问servlet的地址放进去
    ServletRegistrationBean registrationBean = new ServletRegistrationBean(new MyServlet(), "/myservlet");

    // 返回该对象 交由IOC容器管理
    return registrationBean;


    --- 

    // 使用无参构造的方式:
    ServletRegistrationBean registrationBean = new ServletRegistrationBean();

    registrationBean.set(new MyServlet());

    // <url-pattern> 一样的作用
    registrationBean.addUrlMappings("/login", "/test");
  }
}
```

<br><br>

# SpringBoot: Filter
它的使用方式和Servlet十分的类似

请求会先经过过滤器 我们可以对请求的参数 属性 响应等做一些逻辑处理, 该过滤器是servlet规范中的过滤器

<br>

### 使用场景:
在过滤器中处理字符编码 (SpringBoot的项目中默认响应中文就是utf-8)

<br>

## 实现方式
1. 创建Filter对象, 创建一个类实现Filter接口
2. 创建配置类, 使用@Configuration
3. 将filter对象放入FilterRegistrationBean对象(承装servlet的容器), 再将FilterRegistrationBean对象交由IOC容器管理(@Bean + 方法返回值)

<br>

### 1. 创建Filter对象
注意我们选择的包
```java
public class MyFilter implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

    System.out.println("执行了 myFilter");

    // 放行
    filterChain.doFilter(servletRequest, servletResponse);
  }
}
```

<br>

### 2. 注册Filter, 创建配置类
1. 创建配置类, 使用@Configuration
2. 将filter对象放入ServletRegistrationBean对象(承装servlet的容器), 再将ServletRegistrationBean对象交由IOC容器管理(@Bean + 方法返回值)

<br>

**<font color="#C2185B">new FilterRegistrationBean()</font>**  
它是用来承装filter的容器

我们使用无参的

<br>

**方法:**  
1. registrationBean.setFilter()
2. registrationBean.addUrlPatterns()

```java
@Configuration
public class JavaConfig implements WebMvcConfigurer {

  // 将过滤器的容器交由ioc管理 注意@Bean和方法的返回值
  @Bean
  public FilterRegistrationBean filterRegistrationBean() {

    // 创建过滤器的容器
    FilterRegistrationBean registrationBean = new FilterRegistrationBean();


    // 添加过滤器 和 拦截路径
    registrationBean.setFilter(new MyFilter());
    registrationBean.addUrlPatterns("/user/*");

    return registrationBean;
  }
}

```

<br>

**测试:**  
```java
@Controller
public class FilterController {

  @RequestMapping("/user/account")
  @ResponseBody
  public String userAccount() {
    return "user/account";
  }
}
```

<br><br>

## 字符集过滤器的应用
我们在SpringMVC中我们也会在web.xml文件配置CharacterEncodingFilter编码的过滤器 用于处理请求和响应的编码格式

<br>

**响应体的默认编码格式:**  
ISO-8859-1

<br>

**场景回顾:**  
当我们使用servlet的时候, 想在服务器向浏览器响应中文数据的时候, 如果不设置编码格式 响应回去的中文会出现乱码的问题

1. 通过res.setContentType()来设置响应体的编码格式
2. 通过过滤器来解决响应和请求的编码问题

<br>

而我们上面说的SpringMVC中的**CharacterEncodingFilter过滤器是SpringMVC框架中提供的**

<br>

### CharacterEncodingFilter过滤器中的属性
1. String encoding: 当前使用的编码方式
2. boolean forceRequestEncoding: 默认值 false
3. boolean forceResponseEncoding: 默认值 false

<br>

### 注册CharacterEncodingFilter
我们需要使用框架提供的CharacterEncodingFilter过滤器来解决请求和响应的编码问题

因为该过滤器是框架给我们提供的所以我们只需要考虑怎么注册该过滤器就可以

<br>

**注册的步骤:**  
和注册我们自定义的过滤器步骤一样

**<font color="#C2185B">1. application配置文件中设置</font>**  
在SpringBoot中默认已经配置了CharacterEncodingFilter默认使用的ISO-8859-1, 所以设置false关闭框架使用的编码格式
```s
server.servlet.encoding.enabled=false
```

<br>

2. 使用@Configuration注解, 创建JavaConfig类

<br>

3. 将filterRegistrationBean对象放入到IOC容器中, 需要利用
  - @Bean + 自定义方法 + 返回值指定为filterRegistrationBean对象
  - filterRegistrationBean对象是过滤器的容器
  - 创建CharacterEncodingFilter对象, 该类是框架提供好的, 直接new就可以

```java
@Configuration
public class JavaConfig implements WebMvcConfigurer {

  @Bean
  public FilterRegistrationBean filterRegistrationBean() {
    FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
    
    // 创建过滤器对象: 使用框架中的过滤器类
    CharacterEncodingFilter filter = new CharacterEncodingFilter();

    // 配置过滤器: 指定使用的编码方法
    filter.setEncoding("utf-8");

    // 配置过滤器: 指定请求和响应都使用utf-8
    filter.setForceEncoding(true);
      

    // 注册过滤器
    filterRegistrationBean.setFilter(filter);
    // 指定过滤器的过滤地址
    filterRegistrationBean.addUrlPatterns("/*");
    
    return filterRegistrationBean;
  }
}
```

<br><br>

## application配置文件中设置编码格式
上面我们使用的是通过配置类配置过滤器的方式 来设置编码格式

在SpringBoot中可以通过application配置文件的方式配置编码格式

```s
server.servlet.encoding.enabled=true
server.servlet.encoding.charset=utf-8

# 请求和响应都使用utf-8
server.servlet.encoding.force=true
```

<br><br>

# Mybatis操作数据库
我们看看怎么让SpringBoot集成MyBatis操作数据库

<br>

## SpringBoot中使用MyBatis
SpringBoot自己提供的依赖的话, 都是以spring-boot-starter开头的

第三方依赖的话, 第三方的名字会在签名 如:
- spring-boot-starter-web
- mybatis-spring-boot-starter

<br>

我们创建新的SpringBoot项目的时候 勾选上
- web
- mysql drive
- mybatis

这样pom.xml文件中就会自动配置``<dependency>``标签了

<br>

### 1. 添加MyBatis的起步依赖
安装依赖后就可以自动完成MyBatis的配置工作了, 对象就在容器中我们就可以直接使用了
```xml
<!-- web的启动依赖 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>


<!-- MyBatis的起步依赖 -->
<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
  <version>2.1.4</version>
</dependency>


<!-- mysql的驱动 -->
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <!-- 我们需要指定驱动 -->
  <version>5.1.37</version>
  <scope>runtime</scope>
</dependency>
```

<br>

**注意:**  
框架中默认提供的mysql驱动是8版本的
```xml
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <scope>runtime</scope>
</dependency>
```

<br>

我现在自己换成5版本的试试, **可以**
```xml
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>5.1.37</version>
</dependency>
```

<br>

### 2. pom.xml指定把mapper.xml映射文件的打包到类路径中
我们以前学的是在resources目录下创建和mapper接口层级一样的xml文件存放

**1. src/main/java目录中的 **.xml 文件包含到classpath中**  
此方式的mapper.xml文件和mapper接口写在一起
```
| - java
  | - com.sam.mapper
    - StudentMapper
    - StudentMapper.xml
```

```xml
<build>
  <resources>
    <resource>
      <directory>src/main/java</directory>
      <!-- 将java目录下的任意子目录下的任意xml文件输出到target下的classes里面 -->
      <includes>
        <include>**/*.xml</include>
      </includes>
    </resource>
  </resources>
<build>
```

<br>

**2. mapper.xml文件的位置在resources目录下**  
注意此时mapper.xml文件的目录和mapper接口的目录层级要一致

```
| - java
  | - com.sam.mapper
    - StudentMapper

| - resources
  | - com/sam/mapper
    - StudentMapper.xml
```

```xml
<build>
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <!-- 排除properties配置文件 -->
      <excludes>
        <exclude>*.properties</exclude>
      </excludes>
    </resource>
  </resources>
</build>
```

<br>

### 3. 创建数据表所对应的实体类
我们创建了一张Student表, 那么对应就应该有一个Student实体类

就是一个JavaBean, 每一个对象代表表中的一条数据

<br>

### 4. 创建Mapper接口, 创建操作数据库的方法
创建StudentMapper接口

<br>

**要点:**  
SpringBoot框架中 mapper接口上方要使用 <font color="#C2185B">@Mapper</font> 注解

告诉mybatis这是mapper接口 会自动创建此接口的代理实现类的对象

```java
@Mapper
public interface StudentMapper {
  // 根据主键获取学生对象
  public Student getStudentById(@Param("id") Integer id);
}
```

<br>

### 5. 创建Mapper接口对应的Mapper.xml文件, 写sql语句
位置:
```
| - java
  | - com.sam.mapper
    - StudentMapp
    - StudentMapp.xml
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper
    namespace="com.sam.springbootmybatis.mapper.StudentMapper">

  <select
      id="getStudentById"
      resultType="com.sam.springbootmybatis.pojo.Student"
  >
   select * from student where id = #{id}
  </select>
</mapper>
```

<br>

### 6. 创建service层和impl, 去调用Mapper中的方法 完成操作

**接口**
```java
public interface StudentService {
  public Student getStudentById(Integer id);
}
```

<br>

**实现类:**
```java
@Service
public class StudentServiceImpl implements StudentService {

  // 使用Mapper对象操作数据库
  @Autowired
  StudentMapper studentMapper;

  @Override
  public Student getStudentById(Integer id) {
    return studentMapper.getStudentById(id);
  }
}

```

<br>

### 7. 创建Controller访问Service
```java
@Controller
public class StudentController {

  // 获取service对象
  @Autowired
  StudentService service;

  @GetMapping("/student/{id}")
  @ResponseBody
  public String getStudentById(@PathVariable("id") Integer id) {
    Student student = service.getStudentById(id);
    return student.toString();
  }
}
```

<br>

### 8. 在application.properties文件中配置连接数据库的信息

```s
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/spring_boot
spring.datasource.username=root
```

<br>

### 完整的pox.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.9</version>
    <relativePath/> <!-- lookup parent from repository -->
  </parent>
  <groupId>com.sam</groupId>
  <artifactId>springboot-mybatis</artifactId>
  <version>0.0.1-SNAPSHOT</version>


  <properties>
    <java.version>1.8</java.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>org.mybatis.spring.boot</groupId>
      <artifactId>mybatis-spring-boot-starter</artifactId>
      <version>2.3.0</version>
    </dependency>

    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.37</version>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <resources>
      <resource>
        <directory>src/main/java</directory>
        <includes>
          <include>**/*.xml</include>
        </includes>
      </resource>
    </resources>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>

</project>

```

<br><br>

## 整合Mybatis: @Mapper注解
我们需要在**每一个接口的上方使用** @Mapper 注解

接口多的时候 每个接口都需要加上该注解比较繁琐

<br>

### 作用
使用该注解标识后 Mybatis就会自动创建该接口的代理实现类对象 该对象是在容器中的 

这样我们就可以在Service中使用自动装配使用该Mapper接口的代理对象

<br><br>

## 整合Mybatis: @MapperScan注解

### 位置
主启动类之上, 并提供mapper接口所在的包名

<br>

### 作用:
在主启动类上使用 @MapperScan注解后, 我们每一个mapper接口上就不用再使用 @Mapper 注解了

<br>

### 格式:
值是数组 我们也可以指定多个包

```java
@MapperScan("mapper接口所在的包名")

@MapperScan(basePackages="com.sam.springbootmybatis.mapper")
```

<br>

### 示例:
```java
@SpringBootApplication
// 在这使用扫描Mapper接口
@MapperScan(basePackages="com.sam.springbootmybatis.mapper")
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

}
```

<br>

### 扩展:
Resoureces目录默认上面是有小图标的, 如果没有说明它没有被识别为一个资源文件夹

**我们在该文件夹上右键 Mark Directory as 选择 Resources Root**

<br><br>

## Mapper接口和Mapper映射文件分开
我们上面的案例中 我们将 Mapper接口 和 Mapper的映射文件都放在了mapper包下

```
| - com.sam.mapper
  - StudentMapper
  - StudentMapper.xml
```

<br>

我们已经做的方式Java目录下只有Java文件 没有xml文件, 我们**希望将xml映射文件和Java文件分开存储**

```
| - java
  | - com.sam.mapper
    - StudentMapper


| - resources
  | - mapper
    - StudentMapper.xml
```

<br>

### 方式:
1. 我们在 /Resources/mapper 目录下创建一个任意的文件夹

2. 将xml映射文件放在/Resources/mapper文件夹中

3. 告诉框架接口对应的mapper映射文件在哪, 如下

<br>

### application.properties 配置文件中指定mapper映射文件的位置
我们在配置文件中输入 mybatis. 后我们能看到很多关于mybatis的配置项


/Resources目录下的内容在编译后会在 /target/classes/下 所以mapper目录页会在classes/下

我们使用关键字 classpath: 表示类路径
```s
mybatis.mapper-locations=classpath:mapper/*.xml
```

<br>

### 扩展:
有的时候我们编译后类似 application.properties 文件并没有被编译到 target目录下

我们可以修改pom.xml的如下位置

```xml
<resources>
  <resource>
    <directory>src/main/resouces</directory>
    <!-- 将resouces下的所有文件放入类路径下 -->
    <includes>
      <include>**/*.*</include>
    </includes>
  </resource>
</resources>
```

<br>

### application.properties: 配置sql日志信息
```s
# 配置mybatis的mapper映射文件的路径
mybatis.mapper-locations=classpath:mapper/*.xml

# 后面有很多选择, 我们选择一个日志输出在控制台上的
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

<br><br>

# SpringBoot: 事务

<br><br>

## 回顾: Sring框架中的事务
### 1. 管理事务的对象: 事务管理器(接口, 接口有很多的实现类)  
使用JDBC或Mybatis访问数据库, 使用的事务管理器: DataSourceTransactionManager

<br>

### 2. 声明式事务: 已在xml配置文件或使用注解说明事物控制的内容  
控制事物的3个方面: 隔离级别, 传播行为, 超时时间

<br>

### 3. 事务处理的方式:
1. Spring框架中的@Transactional
2. aspectj框架可以在xml配置文件中, 声明事务控制的内容

<br><br>

## SpringBoot: 使用事务方式1
SpringBoot中我们使用事务的时候, Spring的两种使用事务的方式都可以使用 

需要做如下的两个步骤

<br>

### 1. 在业务方法的上面使用 @Transactional
加入注解后 方法就具有事务的功能了

<br>

### 2. 在住启动类的上方使用 @EnableTransactionManagement  
步骤2不加事务功能也会开启, 老师推荐加上, 加上就清晰


<br><br>

## @Transactional注解方式事务测试: Mybatis逆向工程
我们要使用Mybatis逆向工程需要在pom.xml中配置插件

<br>

### 在pom.xml中配置mybatis逆向功能
我们这个Demo会使用Mybatis的逆向工程的功能

该插件需要 GeneratorMapper.xml 配置文件, 该配置文件在项目的根目录下, 和pom.xml平级

```xml
<build>

  <!--处理资源目录-->
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <includes>
        <include>**/*.*</include>
      </includes>
    </resource>
  </resources>


  <plugins>
    <!--mybatis逆向工程插件-->
    <plugin>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-maven-plugin</artifactId>
      <!-- 弹幕说遇到问题可以降低版本 -->
      <version>1.3.6</version>
      <configuration>
        <!--
          配置文件的位置: 在项目的根目录下，和src平级的
        -->
        <configurationFile>GeneratorMapper.xml</configurationFile>
        <verbose>true</verbose>
        <overwrite>true</overwrite>
      </configuration>
    </plugin>

    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

<br>

**GeneratorMapper.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>

    <!-- 
      location: 
        指定mysql驱动.jar在本地的位置, 我们可以从本机的maven仓库中找
    -->
    <classPathEntry location="D:\tools\mysql-connector-java-8.0.22.jar"/>

    <!-- 
      配置table表信息内容体
        targetRuntime指定采用MyBatis3的版本 
    -->
    <context id="tables" targetRuntime="MyBatis3">

        <!-- 抑制生成注释，由于生成的注释都是英文的，可以不让它生成 -->
        <commentGenerator>
            <property name="suppressAllComments" value="true" />
        </commentGenerator>

        <!-- 配置数据库连接信息 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/springdb?useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=GMT%2B8"
                        userId="root"
                        password="123">
        </jdbcConnection>

        <!-- 
          生成pojo类:

            targetPackage: 实体类的包名

            targetProject: 当前要生成到哪个项目中, 生成到当前工程的src下的main下的java
        -->
        <javaModelGenerator
           targetPackage="com.sam.pojo"
                            
          targetProject="D:\course\25-SpringBoot\springboot-prj\019-springboot-transactional\src\main\java">
            <property name="enableSubPackages" value="false" />
            <property name="trimStrings" value="false" />
        </javaModelGenerator>

        <!-- 
          生成MyBatis的Mapper.xml文件
          
          targetPackage指定mapper.xml文件的包名
          targetProject指定生成的mapper.xml放在eclipse的哪个工程下面 
        -->
        <sqlMapGenerator 
          targetPackage="com.atguigu.mybatis.mapper" 
          targetProject="src/main/resources">
            <property name="enableSubPackages" value="false" />
        </sqlMapGenerator>

        <!-- 生成MyBatis的Mapper接口类文件,targetPackage指定Mapper接口类的包名， targetProject指定生成的Mapper接口放在eclipse的哪个工程下面 -->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.bjpowernode.dao" targetProject="src/main/java">
            <property name="enableSubPackages" value="false" />
        </javaClientGenerator>

        <!-- 数据库表名及对应的Java模型类名 -->
        <table tableName="student" domainObjectName="Student"
               enableCountByExample="false"
               enableUpdateByExample="false"
               enableDeleteByExample="false"
               enableSelectByExample="false"
               selectByExampleQueryId="false"/>


    </context>

</generatorConfiguration>
```

<br>

### 配置 application.properties
```s
# 设置端口
server.port=9002

# 设置工程路径
server.servlet.context-path=/mytrans

# 配置数据源连接信息, &可能要换成对应的实体符号
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/springdb?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=123


# 配置mybatis
mybatis.mapper-locations=classpath:mapper/*.xml

# 开启sql日志
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

<br>

### 业务成的方法中添加事务 @Transactional
默认情况下只要我们的sql语句执行完毕了, 事务就会提交, 我们下面的方法中模拟算术异常 当有异常的时候该事物应该会回滚

```java
@Service
public class StudentServiceImpl { 

  @Resource
  private StudentMapper mapper;

  // 该方法使用事务管理
  @Transactional
  public int addStudent(Student student) {

    System.out.println("业务方法addStudent")

    int rows = mapper.insert(student)

    System.out.println("执行sql")

    // 模拟异常: 目的回滚事务
    int m = 10 / 0;

    return rows
  }
}
```

<br>

**@Transactional:**  
当我们不设置该注解的属性时
- 隔离级别: 使用数据库默认的
- 传播行为: required
- 超时时间: -1

<br>

### 注意:
1. Mapper接口上要使用@Mapper注解, 或者主启动类上加@MapperScan("mapper包名")

<br><br>

# Restful风格要点总结:
我们这里只是关注下有没有遗漏的知识点

<br>

### Restful风格不是只能是如下的格式
```s
localhost:8080/student/1
```

它仅仅是对操作的资源会以请求方式 + url的形式标识, 当有分页 排序等参数需要携带的时候 仍然是?k=v的形式

也就是说跟资源紧密相关的我们放在url中, 剩余的还是要通过?k=v的形式传递

```s
localhost:8080/student/1?pageNo=10
```

<br>

### 非视图类型的页面放在static文件夹中
/resources/index.html

我们访问 http://localhost:8080/ 的时候展示的默认就是 index.html 页面

<br>

### HiddenHttpMethodFilter: put 和 delete请求的处理方式
我们知道浏览器只支持两种请求 
- get
- post

其它的请求浏览器是没有办法支持的, 我们在SpringMVC中会通过web.xml配置 **HiddenHttpMethodFilter** 过滤器的方式, 对post请求转成我们期望的put等请求方式

**我们看看SpringBoot中如何配置**

<br>

**SpringBoot的使用方式:**  
SpringBoot中该过滤器属于启动的状态, 我们只需要告诉框架我们要使用它就可以

1. 在 application.properties配置文件中开启: HiddenHttpMethodFilter
```s
spring.mvc.hiddenmethod.filter.enabled=true
```

2. 在请求页面中 表单项中药包含 _method 参数, 它的值是put等请求方式, 注意表单的method属性的值必须是post

<br>

**注意:**  
- 使用ajax好像不用配置该过滤器哦
- 使用原生的方式好像需要配置
- 注意restful风格要注意 请求方式 + 请求地址, 要保证唯一

<br><br>

# SpringBoot打包:
打包可以将应用的所有资源放在一个压缩包中
- Java项目会打成 jar包
- Web项目会打成 war包

<br>

## 打war包
war包需要服务器的支持 我们的项目是放到服务器里面的

<br>

### 1. 配置pom.xml文件
1. 将打包方式设置为 war
```xml
<packaging>war</packaging>
```

<br>

2. 配置build标签, 该标签应该是配置构建相关的, 并指定打包后的名称

3. 使用 ``<resources>`` 对各个资源进行处理
  - targetPath: 是用来处理web资源的 所以指定编译到webapp下

  - 没有写targetPath的默认编译的classpath下

```xml
<build>
  <!--打包后的文件名称-->
  <finalName>myboot</finalName>

  <!--
    处理 <directory> 指定的目录下的文件

    打包后将其放入到 <targetPath> 指定的目录

    处理 <includes> 所包含的文件, webapp下的任意子包下的任意文件
  -->
  <resources>
    <resource>
      <directory>src/main/webapp</directory>
  
      <targetPath>META-INF/resources</targetPath>

      <includes>
        <include>**/*.*</include>
      </includes>
    </resource>

    <!--
      如果 使用了mybatis ，而且mapper文件放在src/main/java目录
    -->
    <resource>
      <directory>src/main/java</directory>
      <includes>
        <include>**/*.xml</include>
      </includes>
    </resource>

    <!--
      这个最好也配置下
      把src/main/resources下面的所有文件，都包含到classes目录
    -->
    <resource>
      <directory>src/main/resources</directory>
      <includes>
        <include>**/*.*</include>
      </includes>
    </resource>
  </resources>

  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

<br>

**注意:**  
弹幕说SpringBoot中resources目录下的资源不会自动打包到target下, 如果是这样我们上面配置的最后一个resource标签就是有意义的

<br>

### 2. 配置主启动类
我们的项目打包后 需要部署到tomcat上, 注意这里不是SpringBoot内置的Tomcat 而是真正的Tomcat服务器

如果是这样, **<font color="#C2185B">我们的主启动类就必须继承 SpringBootServletInitializer</font>**, 只有继承后才能使用外部的Tomcat

<br>

SpringBootServletInitializer就相当于原有的web.xml文件的代替, 使用了嵌入式Servlet 默认是不支持JSP的

<br>

继承了该类后我们要重写 **configure()**, 在方法内部我们要调用 **builder.sources()**

```java
/**
 * SpringBootServletInitializer: 继承这个类， 才能使用独立tomcat服务器
 */
@SpringBootApplication
public class JspApplication  extends SpringBootServletInitializer  {

	public static void main(String[] args) {
		SpringApplication.run(JspApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(JspApplication.class);
	}
}

```

<br>

### 3. 打包处理: Maven
clear - package - target中找到 war 包

打包后的结果文件在 target目录下

<br>

我们把war直接放到Tomcat服务器的webapps目录下即可

<br><br>

## 打jar包

### 1. 配置pom.xml文件
1. 将打包方式设置为 jar
2. 如果我们打包的项目中有jsp的话 我们需要指定spring-boot-maven-plugin插件的版本
3. 指定打包后的文件名称

```xml
<packaging>jar</packaging>
```

```xml
<build>
  <!--打包后的文件名称-->
  <finalName>myboot</finalName>


  <!--加入resources插件 -->
  <!--指定编译jsp到META-INF/resources-->
  <resources>
    <resource>
      <directory>src/main/webapp</directory>
      <targetPath>META-INF/resources</targetPath>
      <includes>
        <include>**/*.*</include>
      </includes>
    </resource>

    <!--如果使用mybatis，同时把xml文件放在了src/main/java目录-->
    <resource>
      <directory>src/main/java</directory>
      <includes>
        <include>**/*.xml</include>
      </includes>
    </resource>


    <!--把src/main/resources中的所有文件编译到classpath目录中-->
    <resource>
      <directory>src/main/resources</directory>
      <includes>
        <include>**/*.*</include>
      </includes>
    </resource>
  </resources>

  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <!--
        打包jar， 有jsp文件时，必须指定maven-plugin插件的版本是 1.4.2.RELEASE
      -->
      <version>1.4.2.RELEASE</version>
    </plugin>
  </plugins>
</build>
```

<br>


### 3. 打包处理: Maven
clear - package - target中找到 jar 包

打包后的结果文件在 target目录下

<br>

### 执行jar包
终端: 独立启动应用 不依赖于tomcat, 我们可以将jar给别人
```
java -jar myboot.jar
```

<br><br>

# Thymeleaf
我们使用的模版都会放在 /resources/templates 目录下

<br>

## 要点:
1. 创建项目时, 向导中添加Thymeleaf模版引擎
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

2. 配置application.properties
```s
#开发阶段设置为 false ，上线后设置为 true
spring.thymeleaf.cache=false

#编码格式
spring.thymeleaf.encoding=utf-8

#设置模版的类型
spring.thymeleaf.mode=HTML

#设置模版文件的路径，前缀
spring.thymeleaf.prefix=classpath:/templates/

#设置后缀
spring.thymeleaf.suffix=.html
```

<br><br>

# 注解的总结:

### SpringBoot相关注解:
1. @Controller
2. @RestController
3. @Repository

4. @Value: 简单类型的赋值, 我们在类中属性上方使用 ``@Value("sam")`` 通过注解给成员变量进行赋值, 还可以是用@Value获取配置文件中的数据 ``@Value("${key}")``

5. @Autowired: 引用类型赋值自动注入 支持byName byType 默认是byType, 放在属性的上面, 也可以放在构造器方法的上面, 推荐放在构造方法上面

6. @Qualifer: 引用类型赋值自动注入 默认是byName

7. @Resources: 它是JDK中定义的, 实现引用类型的自动注入 支持byName byType 默认是byName, 一般放在属性的上面

- @Configuration
- @Bean
- @ImportResource
- @PropertyResource
- @ComponentScan
- ResponseBody
- @RequestBody: 把请求体中的数据 读取出来 转为java对象

- @ControllerAdvice: 控制器增强, 放在类的上面 表示此类提供了方法 可以对Controller增强功能 一般使用该注解做异常处理

- @ExceptionHandler: 处理异常, 放在方法上面
- @Transcational: 处理事务
- @SpringBootApplication: 放在启动类的上面

<br>

**注意:**  
- @ControllerAdvice是放在类上的
- @ExceptionHandler是放在方法上

它们是搭配使用的

<br>

### Mybatis相关注解:
- @Mapper: 放在接口的上面, 让MyBatis找到该接口创建代理对象
- @MapperScan: 放在主启动类上面
- @Param: 放在方法的形参前面

<br><br>

# SpringBoot整合Redis
Redis常用作缓存使用, 它算是一个中间件也是一个独立的服务器

<br><br>

## Redis的常用方式
用户访问会先访问Redis 如果Redis中有数据就将数据直接发给客户 如果Redis没有数据 我们再去查数据库

<br>

从数据库查询到数据后 我们通常会做两件事情
1. 将查询到的数据放在redis中
2. 将查询到的数据返回给用户

这样用户下次再访问相同的数据的时候, redis中已经都有了, 从而减轻了与数据库的交互频率

<br><br>

## 操作Redis的客户端
我们上面使用了 Jedis 类似的客户端还有很多

<br>

**比如 lettuce:**  
它是一个线程安全的第三方的库, 这个客户端在国外使用的很多

**比如 Redisson:**   
没太介绍

<br>

### SpringBoot的 RedisTemplate | StringRedisTemplate
它们是Spring框架提供的工具类, 处理和Redis交互

<br>

**RedisTemplate 的使用方式: 存取数据**  
使用它操作Redis中不同的数据类型时, 需要调用opsXxx()方法返回一个操作指定数据类型的对象后 才可以操作该类型的对象

1. opsForValue(): 返回的对象是操作 String
2. opsForList(): 返回的对象是操作 List
3. opsForSet(): 返回的对象是操作 Set
4. opsForZSet(): 返回的对象是操作 Zset
4. opsForHash(): 返回的对象是操作 Hash

<br>

**RedisTemplate 的使用方式: 其它操作**  
我们直接通过RedisTemplate对象来调用方法就可以

<br><br>

## 整合Redis

### 1. 通过向导创建SpringBoot工程时添加的依赖
1. Web
2. NoSQL: Spring Data Redis

<br>

### 2. pom.xml
该文件中会添加上如下的依赖 

**spring-boot-starter-data-redis:**    
它是redis的起步依赖 有了它之后我们就可以直接在项目中使用RedisTemplate(StringRedisTemplate)了

```xml
<!-- 通过该依赖就将redis加载到了当前的项目中 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

<br>

SpringBoot中使用的不是Jedis而是lettuce客户端, **也就是说我们在程序中需要使用RedisTemplate类的方法操作redis**

它实际上调用的就是 lettuce客户端 中的方法

<br>

### 3. application.properties配置redis的服务器信息:

```s
# 指定redis (ip, port, password(如果有))
spring.redis.host=localhost
spring.redis.port=6379
# spring.redis.password=



#Redis数据库索引（默认为0）
spring.redis.database= 0

#连接超时时间（毫秒）
spring.redis.timeout=1800000

#连接池最大连接数（使用负值表示没有限制）
spring.redis.lettuce.pool.max-active=20

#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-wait=-1

#连接池中的最大空闲连接
spring.redis.lettuce.pool.max-idle=5

#连接池中的最小空闲连接
spring.redis.lettuce.pool.min-idle=0
```

<br>

### RedisConfig配置类 (Redis6中整合的视频)
这个步骤不做也可以操作redis, 但是会有序列化的问题, 我们可以添加这个类 配置Reids
```java
package com.atguigu.redis_springboot.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@EnableCaching
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setConnectionFactory(factory);
//key序列化方式
        template.setKeySerializer(redisSerializer);
//value序列化
        template.setValueSerializer(jackson2JsonRedisSerializer);
//value hashmap序列化
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
//解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
// 配置序列化（解决乱码的问题）,过期时间600秒
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(600))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                .disableCachingNullValues();
        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
}
```

<br>

**三更的视频:**  
```java
@Configuration
public class MyRedisConfig {
    @Resource
    private RedisConnectionFactory factory;

    @Bean
    public RedisTemplate redisTemplate(){
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());

        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        redisTemplate.setValueSerializer(serializer);


        // 这个部分针对不同的数据类型 分别做了序列化处理
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        om.setTimeZone(TimeZone.getDefault());
        om.configure(MapperFeature.USE_ANNOTATIONS, false);
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        om.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance ,ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        om.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        serializer.setObjectMapper(om);

        return redisTemplate;
    }
}
```

<br>

### 操作Redis
```java
package com.sam.redis.controller;

@RestController
public class RedisController {
  /*
    注入RedisTemplate
    RedisTemplate可以指定泛型 名字固定！！

    泛型情况:
      1. RedisTemplate<String, String>
      2. RedisTemplate<String, Object>
      3. 不写
  */
  @Resource
  private RedisTemplate redisTemplate;


  // 添加数据到Redis
  @PostMapping("/redis/addString")
  public String addToRedis(String key, String value) {

    /*
      RedisTemplate 的使用方式:
        使用它操作Redis中不同的数据类型时, 需要调用opsXxx()方法返回一个操作指定数据类型的对象后 才可以操作该类型的对象
        1. opsForValue(): 返回的对象是操作 String
        2. opsForList(): 返回的对象是操作 List
        3. opsForSet(): 返回的对象是操作 Set
        4. opsForZSet(): 返回的对象是操作 Zset
        4. opsForHash(): 返回的对象是操作 Hash
    */

    // 获取操作String类型的对象
    ValueOperations valueOperations = redisTemplate.opsForValue();

    // 向Redis中保存一组kv
    valueOperations.set(key, value);

    // 获取所有的keys
    Set keys = redisTemplate.keys("*");

    keys.forEach(System.out::println);

    return "向Redis添加String类型的数据";
  }

  // 从Redis中获取数据
  @GetMapping("/redis/getString")
  public String getData(String key) {

    // 存取数据要通过redisTemplate获取存取数据的对象
    ValueOperations valueOperations = redisTemplate.opsForValue();

    Object o = valueOperations.get(key);
    System.out.println(o);

    return "key: " + key + ", value: " + o;
  }

  @GetMapping("/home")
  public String home() {
    return "hello";
  }
}
```

<br><br>

## StringRedisTemplate 序列化: 
这里说的也是如下两个对象的使用上的区别
- StringRedisTemplate
- RedisTemplate

<br>

### StringRedisTemplate
它会将 key 和 value 都作为String处理, 使用的是String的序列化 它的可读性比较好

**它使用的是字符串的序列化**

我们要是想存Java对象 使用RedisTemplate比较好

<br>

### RedisTemplate
它会将 key 和 value 经过了序列化存到redis中, key 和 value因为经过了序列化 所以在redis中查看的结果会难以阅读, 不能直接识别

**它默认使用的是JDK的序列化机制**

<br>

### 序列化:
把对象转换为可传输的字节序列过程

<br>

### 反序列化:
把字节序列还原为对象的过程

<br>

### 为什么需要序列化
**序列化最终的目的是为了对象可以跨平台存储和进行网络传输** 而我们践行跨平台存储和网络传输的方式就是IO

而我们的IO支持的数据格式就是字节数组, 我们必须把对象转成字节数组的时候就指定一种规则(序列化)

那么我们从IO流里面读初数据的时候再以这种规则把对象还原回来(反序列化)

<br>

**序列化的方式:**  
序列化值是一种拆装组装对象的规则, 那么这种规则肯定也可能有多种多样 比如现在常见的序列化方式有
- JDK(不支持跨语言, 比如redis里面存的/xac/x00, Java语言序列化的对象只能由Java语言解开)
- JSON
- XML
- Hessian
- Kryo(不支持跨语言, 性能最好)
- Thrift
- Protofbuff

<br>

**Java的序列化:**  
把Java对象转为byte[], 二进制数据

<br>

**Json序列化:**  
Json序列化功能将对象转换JSON格式或从Json格式转换为对象 "{"name": "sam"}"

<br>

### 扩展: IDEA 给JavaBean生成对应的版本号
我们要将一个JavaBean 进行序列化操作的时候 需要如下两步
1. 首先 JavaBean 要实现 Serializable接口
2. 类中要定义 serialVersionUID属性

<br>

这个serialVersionUID属性可以由IDEA来生成, 我们需要如下的配置IDEA

我们在IDEA中 ctrl + , 然后找到 /Editor/Inspections/ 面板

然后搜索 serializable 找到 ``Serializable class without 'serialVersionUID'`` 后面打上对号

<br>

然后在类的上面右键 选择, ``Add "serialVersionUID" field``

<br><br>

## 修改 RedisTemplate 的序列化机制
当我们添加 spring-boot-starter-data-redis 依赖后Spring就会创建 RedisTemplate对象 并放入容器中

注意我们能使用 RedisTemplate对象 就是因为我们加入了依赖框架自动创建的对象

<br>

### 设置RedisTemplate的序列化机制
我们可以设置key的序列化 也可以设置value的序列化, 也可以同时设置

通过 redisTemplate对象的api

<br>

### **<font color="#C2185B">redisTemplate.set(Key|value)Serializer(RedisSerializer<?> serializer)</font>**
单独设置key或者value的序列化

```java
// 设置key为字符串的序列化格式
redisTemplate.setKeySerializer(new StringRedisSerializer())



// 如果value的值是String: 设置value为字符串的序列化格式
redisTemplate.setValueSerializer(new StringRedisSerializer())

// 如果value的值是Object: 设置value为Json的序列化格式
redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(Student.class))



// 序列化后再传值
redisTemplate.opsForValue().set(key, value);
```

<br>

### **<font color="#C2185B">redisTemplate.setHashKeySerializer(RedisSerializer<?> hashKeySerializer)</font>**
设置map的序列化

<br>

### 扩展:
如果我们要序列化的对象 仅仅是个简单的Json对象 那么只设置setValueSerializer的序列化就可以了  
但是如果json对象中还有日期 集合等数据格式的话 要调用对不同格式的序列化处理

<br><br>

## FastJson
它是阿里巴巴的开源JSON解析库

它可以解析JSON格式的字符串 支持将JavaBean序列化为JSON字符串 也可以从JSON字符串反序列化为JavaBean

<br>

### 添加依赖
```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>fastjson</artifactId>
  <version>1.2.51</version>
</dependency>
```

<br>

### 使用方式:
- parseObject(String text, Class``<T>`` clazz)
- parseArray(String text, Class``<T>`` clazz)
- toJSONString(Object object)

```java
// 序列化
String text = JSON.toJSONString(obj);


// 反序列化成对象 数据以key-value形式出现, 实际是map
Student student =  JSON.p arseObject(text, Student.class)
```

<br><br>

# 响应数据的公共类
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
  private Integer code;
  private String message;
  private T data;

  public static<T>  Result<T> success(){
      return new Result<>(20000,"success",null);
  }

  public static<T>  Result<T> success(T data){
      return new Result<>(20000,"success",data);
  }

  public static<T>  Result<T> success(T data, String message){
      return new Result<>(20000,message,data);
  }

  public static<T>  Result<T> success(String message){
      return new Result<>(20000,message,null);
  }

  public static<T>  Result<T> fail(){
      return new Result<>(20001,"fail",null);
  }

  public static<T>  Result<T> fail(Integer code){
      return new Result<>(code,"fail",null);
  }

  public static<T>  Result<T> fail(Integer code, String message){
      return new Result<>(code,message,null);
  }

  public static<T>  Result<T> fail( String message){
      return new Result<>(20001,message,null);
  }

}
```

<br><br>

# SpringBoot: 跨域问题
我们有两种方式解决跨域

1. Controller类上添加注解, 那么该类中的所有的方法都允许跨域
2. Filter全局配置

<br>

### @CrossOrigin
**位置:**  
在Controller类上添加注解

**作用:**  
该类中的所有控制器方法都将允许跨域

<br>

```java
@RestController
// 相当于请求地址uri前缀 会和控制器方法上的uri进行拼接
@RequestMapping("/user")
// 允许跨域的注解
@CrossOrigin
public class UserController {
  ...
}
```

<br>

### Filter全局配置
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter(){
        //1.添加CORS配置信息
        CorsConfiguration config = new CorsConfiguration();
        //1) 允许的域,不要写*，否则cookie就无法使用了
        config.addAllowedOrigin("http://localhost:8888"); //这里填写请求的前端服务器
        //2) 是否发送Cookie信息
        config.setAllowCredentials(true);
        //3) 允许的请求方式
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        // 4）允许的头信息
        config.addAllowedHeader("*");

        //2.添加映射路径，我们拦截一切请求
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration("/**", config);

        //3.返回新的CorsFilter.
        return new CorsFilter(configSource);
    }
}

```

<br><br>

# 文件的上传
菜品管理模块中需要上传图片

<br>

### 文件上传的介绍
文件上传 也称为upload 是指将本地图片 视频 音频等文件上传到服务器上

可以供其他用户浏览货下载的过程 文件上传在项目中应用非常广泛 我们经常发微博 发微信朋友圈都用到了文件上传功能

<br>

### 文件上传 对前端表单的要求
一般都是使用UI框架 但是底层确实是基于原生的html来实现的

- method: post
- enctype: multipart/form-data
- type: file

<br>

### 前端相关:
文件上传的表单项触发 onchange 的时候 触发的回调中 主要做了两件事情

1. 获取文件名的后缀 做文件类型判断
2. 获取文件大小 做上传文件的大小判断

然后表单提交的时候 发起真正的请求
```js
onChange (file) {
  if(file){
    const suffix = file.name.split('.')[1]
    const size = file.size / 1024 / 1024 < 2
    if(['png','jpeg','jpg'].indexOf(suffix) < 0){
      this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
      this.$refs.upload.clearFiles()
      return false
    }
    if(!size){
      this.$message.error('上传文件大小不能超过 2MB!')
      return false
    }
    return file
  }
},
```

<br>

### 后台相关: 

### 控制器方法接受前端上传的文件 声明 MultipartFile类型 形参
服务器接收客户端页面上传的文件, 我们通常会使用Apache的两个组件

- commons-fileupload
- commons-io

<br>

Spring框架在spring-web包中对文件上传进行了封装 大大简化了服务端代码

我们 **只需要在Controller的方法中声明一个 MultipartFile 类型的参数即可接受上传的文件**

```java
public Result<String> upload(MultipartFile file) { ... }
```



## 文件上传代码部分
这里我们使用的就是demo演示 跟项目无关

<br>

### 请求参数:
- 请求地址: /common/upload
- 请求方式: post
- 请求参数: file

<br>

### 文件上传的演示:
这里我们先使用一个Demo来测试下文件上传的功能 跟项目本身无关

<br>

**要点:**  
前端上传图片, 后台肯定要接收前端上传的文件, 后台如何接收呢? 就比如nodejs中我们配置了依赖后 可以使用req.files来接收上传的文件数据

<br>

### SpringBoot接收上传的文件
SpringBoot中我们可以直接在控制器方法中声明参数即可

<br>

**方式1: 声明 (MultipartFile file) 参数**  
1. 参数类型 必须是 MultipartFile
2. 参数名 必须和前端file表单项的name值一致

<br>

**方式2: 使用该注解 <font color="#C2185B">(@RequestPart("文件表单项中的name值一致") MultipartFile 自定义形参名)</font>**  
将接收到的文件数据 交给我们自己定义的形参, 该方式我们可以自定义形参名

<br>

### @RequestPart 注解
用于处理multipart/form-data类型的请求。通常用于上传文件等场景。
@RequestPart注解还支持更广泛的类型，包括JSON和XML。

- @RequestParam注解: 用于从请求参数中获取单个值
- @RequestPart注解: 用于从multipart/form-data类型的请求中获取一个或多个部分。

```java
@PostMapping("/upload")
public void uploadFile(@RequestPart("file") MultipartFile file, @RequestPart("metadata") String metadata) {
    // 处理文件上传逻辑
}
```

<br>

**与@Multipart注解相比**  
@RequestPart注解更加灵活，可以处理更多类型的请求。

@Multipart注解只能处理multipart/form-data类型的请求，而@RequestPart注解可以处理更多类型的请求，包括JSON和XML。

另外，@Multipart注解不支持多部分请求，而@RequestPart注解可以处理多个部分。

<br>

**注意:**  
在使用@RequestPart注解时，如果您指定了一个部分的名称，那么Spring Boot将会尝试从multipart/form-data类型的请求中获取这个指定的部分数据，如果请求中不包含该部分，则会抛出异常。

@RequestPart注解中指定了"file"作为参数名，表示我们要获取请求中名为"file"的文件部分数据。如果请求中不包含名为"file"的文件部分数据，则会抛出异常。

<br>

此外，当使用@RequestPart注解处理文件上传时，必须确保请求中包含文件部分，否则将抛出异常。

个异常通常是MissingServletRequestPartException类型的异常，它会告诉您请求中缺少了指定的部分。因此，在使用@RequestPart注解时，一定要确保请求中包含了指定的部分数据，否则您的代码将无法正常工作。

<br>

### MultipartFile file 接收的文件是临时文件
我们在控制器方法中接收到的file是临时文件 如果我们没有做转存的处理 那么该次请求结束后 临时文件就会从内存中消失

<br>

**<font color="#C2185B">file对象.transferTo()</font>**  
调用file对象身上的方法, 将文件转存到一个指定的位置

**参数:**  
File file, 通过File对象指定我们的转存的位置

<br>

**注意:**  
我们指定的位置 必须要存在(但是可以通过判断目录是否存在 不存在则创建一个目录)

<br>

### 实现功能:

**@Value注解读取application.yml中定义的数据**  
我们可以通过该注解读取 项目配置文件中定义的自定义数据, 比如我们可以将 文件上传后保存路径 定义在配置文件中 供整个项目读取使用

1. 在application.yml中定义数据:
```s
# 自定义属性:
reggie:
  path: /Users/liulin/Desktop/test/
```

2. 使用 @Value("${reggie.path}") 读取数据 并将其放入到注解所标识的变量中
```java
public class CommonController {

  @Value("${reggie.path}")
  private String basePath;

}
```

<br>

**要点1:**  
我们会将文件上传到一个指定的目录下, 这个指定的目录必须要提前创建好 不然会报错 所以我们可以利用如下的逻辑 判断如果该目录不存在 则先创建
```java
public class CommonController {

  @Value("${reggie.path}")
  private String basePath;

  @PostMapping("/upload")
  public Result<String> upload(MultipartFile file) {

    // 创建一个目录对象
    File dir = new File(basePath);
    // 如果该目录不存在则创建该目录, 则创建该目录
    if(!dir.exists()) {
      dir.mkdirs();
    }
  }

}
```

这样能确保该目录结构一定是存在的

<br>

**要点2:**  
获取上面文件的原文件名
```java
String filename = file.getOriginalFilename();
```

<br>

**要点3:**  
为了防止上传文件名重复会覆盖的情况 我们使用uuid来自定义文件名
```java
// 获取原文件名
String originalFilename = file.getOriginalFilename();

// 获取文件名后缀
String suffix = originalFilename.substring(originalFilename.lastIndexOf("."))

// 获取新文件名: uuid要toString
String filename = UUID.randomUUID().toString() + suffix
```

<br>

**要点4:**  
上传文件成功后 一般会将上传后的新的文件名返回给前端 供前端来使用

<br>

### 代码部分:
```java
@PostMapping("/upload")
// 文件上传表单项的name名为file 所以我们的形参名为file
public Result<String> upload(MultipartFile file) {

  // 创建一个目录对象
  File dir = new File(basePath);
  // 如果该目录不存在则创建该目录
  if(!dir.exists()) {
    // 创建该目录
    dir.mkdirs();
  }
  
  // 获取原始的文件名(获取上传文件的文件名)
  String originalFilename = file.getOriginalFilename();

  // 获取文件名后缀
  String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));

  // 获取新的文件名
  String fileName = UUID.randomUUID().toString() + suffix

    // 将临时文件转存到指定的位置
  try {
    file.transferTo(new File(basePath + fileName));
  } catch (IOException e) {
    e.printStackTrace();
  }

  // 文件上传的返回值最好的 filename 因为前端需要上传后的文件名, 因为dish表中的image字段存储的就是上传后的文件名
  return Result.success(fileName);
}
```

<br><br>

# 文件的下载

## 文件下载介绍
文件下载 也称为download 是指将文件从服务器传输到本地计算机的过程

<br>

**通过浏览器进行文件下载, 通常有两种表现形式:**
1. 以附件形式下载 弹出保存对话框, 将文件保存到指定的磁盘目录
2. 直接在浏览器中打开

通过浏览器进行文件下载 本质就是服务端将文件以流的形式写回浏览器的过程

<br><br>

## 梳理流程
文件下载是需要客户端先发起请求, 然后后台通过输出流的方式将文件数据写回到浏览器

比如前端可以通过 ``<img>``标签来发起请求
```html
<img v-if="imgUrl" :src="imgUrl" />
```

<br>

**向/common/download接口发起请求**  
```js
// 上传完成后的回调
handleAvatarSuccess(res, file, fileList) {
  this.imgUrl = `/common/download?name=${res.data}`
}
```

<br>

### 实现逻辑
1. 文件下载要通过输入流 和 输出流配置完成
  - 输入流: 将文件读取到内存中
  - 输出流: 将文件写回浏览器

2. 获取输出流的方式: res.getOutputStream();

```java
// 文件下载:
// 通过输出流向浏览器页面写数据就可以了 不需要返回值
@GetMapping("/download")
// name: 接收url上的name参数 要下载的文件名
public void download(String name, HttpServletResponse res) {


  // 通过输入流: 根据文件名 将文件读取到内存中
  try {
    FileInputStream fis = new FileInputStream(new File(basePath + name));

    // 通过输出流: 将文件写回浏览器 在浏览器展示图片
    ServletOutputStream outputStream = res.getOutputStream();


    // 设置响应回去的文件类型
    res.setContentType("image/jpeg");

    byte[] bytes = new byte[1024];
    int len = 0;
    while((len = fis.read(bytes)) != -1) {
      outputStream.write(bytes, 0, len);
      outputStream.flush();
    }


    // 关闭资源
    outputStream.close();
    fis.close();

  } catch (Exception e) {
    e.printStackTrace();
  }
}
```

<br><br>

