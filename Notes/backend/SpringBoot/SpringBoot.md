# SpringBoot
Spring版本: 5.3.1

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

### 测试: 从容器中拿到 Student 对象
```
| - test
  | - java
    | - com.sam.test.StudentTest
```

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






