# MyBatis
MyBatis在MVC的整合中担任的是 **持久层的框架**, 它是对JDBC再次的进行封装, 实现的功能是连接数据库 操作数据库中的数据

<br>

### 该框架提供了如下的两个功能:
**1. sql maps: sql映射**    
将我们Java层面的实体类对象 映射为 数据库中的一条记录 或者说 将数据库中的记录查询出来组成Java中的一个实例对象

<br>

**2. data access object: DAO层**    
进行数据访问, 链接数据库 访问数据库 操作数据库

<br>

### 下载:
如果我们要下载 MyBatis 的Jar包 和 文档, 我们是要从Github上下载的

```s
https://github.com/mybatis/mybatis-3
```

<br>

**扩展:**  
MyBatis的下载: 当我们学习了Maven之后 我们可以 **从中央仓库和镜像网站中直接下载**  

<br><br>

### MyBatis特性:
**1. MyBatis是支持定制化sql, 存储过程 以及 高级映射的优秀的持久层框架**  

**定制化sql:**  
我们的sql语句都是写在 映射文件.xml 中的, 也就是自己写sql

<br>

**高级映射:**   
我们原来学JDBC的时候 手动封装过工具类 当我们查询一条数据的时候, 如果字段名和属性名一致 就会自动将记录转换为相对应的实体

也有特殊情况, 当字段名和属性名不一致 以及 多对一的映射 或 一对多的映射 这时候我们是没有办法正常的映射的

这里 MyBatis就为我们提供了相对应的解决方案

<br>

**2. MyBatis避免了几乎所有的JDBC代码和手动设置参数以及获取结果集**  
我们之前写过JDBC的代码, 过程都是一样的
1. 注册驱动
2. 获取连接
3. 获取预编译对象
4. 执行sql
5. 处理获取的结果

这个过程既然都是固定了 MyBatis就将大部分的JDBC的代码进行了封装 也就是我们在使用MyBatis的过程中 就不需要手动写JDBC的代码了

<br>

**手动设置参数:**  
一般情况下 sql 几乎很少是写死的, 有些数据我们是需要拼接到sql中的 因为好多参数都是从浏览器传输到服务器中的 我们需要将这些参数手动的拼写到sql语句中  

在JDBC中我们是需要使用 ? 占位符 或 字符串进行拼接 来完成这样的逻辑, MyBatis中也为我们提供了两种方式

- #{}: 字符串拼接
- ${}: 占位符赋值 

<br>

**避免获取结果集:**  
我们在查询的操作中最终会获取一个结果集 我们需要对结果集进行解析 解析之后把结果中的数据 转换为Java中的一个对象

但是在MyBatis中我们不需要手动获取结果集 也不需要手动的解析结果集 这个过程都是MyBatis帮助我们完成的

<br>

**3. MyBatis可以使用简单的xml或注解用于配置和原始映射, 将接口和Java的POJO映射成数据库中的记录**  
MyBatis在实现对数据库的数据进行操作的过程中, 我们有如下的两种方式进行
1. xml方式 <=
2. 注解方式

将POJO映射成数据库中的一条记录, MyBatis不需要我们进行复杂的过程 我们只需要简单的配置就可以完成对数据库中的操作了

<br>

**4. MyBatis是一个半自动的ORM框架**  
将Java中的对象 和 数据库中的记录 创建映射关系 将Java中的一个对象映射成一条数据, 也可以将数据库中的一条记录查询为Java层面的一个对象

<br><br>

## MyBatis和其它持久化层技术的对比

### JDBC
- sql夹杂在Java代码中 耦合度高, 导致硬编码内伤
- 维护不易且实际开发需求中sql有变化 频繁修改的情况多见
- 代码冗长, 开发效率低

<br>

**硬编码的弊端:**  
在JDBC中我们写的sql是直接写在Java代码中的 
- 我们的Java项目以后要打成jar包
- 我们的web工程以后要打成war包

如果我们使用的是硬编码的方式, 将sql语句写死在Java代码中 我们的Java代码需要先编译再执行 然后再打包

如果我们这时候我们要修改一条sql语句, 我们只能改变源代码 然后修改源代码 进而修改sql语句 改完后我们还需要重新进行编译 打包 再执行

这个过程就会变的非常的复杂

<br>

### Hibernate 和 JPA
- 操作简便 开发效率高:   
因为它是一个全自动的持久层的框架 我们在使用Hibernate的时候 只要我们创建好实体类和配置文件 我们会发现表我们都不需要建 sql也不需要写 只要我们调用方法 就能自动的生成sql语句 拿到我们想要的效果

- 程序中的长 难 复杂sql 需要绕过框架

- 内部自动生产的sql 不容易做特殊优化

- 基于全映射的全自动框架 大量字段的pojo 进行部分映射时比较困难

- 反射操作太多 导致数据库性能下降:  
框架中大量的使用反射 因为Hibernate很多操作都是自动完成的 所以都会使用反射 所以性能就会有所下降

<br>

### MyBatis
- 轻量级, 性能出色

- sql和Java编码分开, 功能边界清晰 Java代码专注业务 sql语句专注数据:  
MyBatis中有两种方式写sql 一种是注解 一种是xml, 所以我们的sql是写在xml中的, 是和Java代码分开的 这时我们要维护一个sql语句 我们只需要修改xml文件就可以了

- 开发效果稍逊于Hibernate 但是完全能够接受

<br><br>

## MyBatis下载:
我们这里下载 MyBatis 的文档 和 Jar包, 在Github的readme的部分有如下的3个选项
1. see the docs
2. download latest: 下载最新版本
3. download snapshot: 下载快照版本

我们下载的是 3.5.11

但是我们没有安装到电脑, 下面都是通过 Maven 自动下载的

<br><br>

## 搭建MyBatis

### 开发环境
下面是老师的开发环境

- IDE: 2019.2
- maven 3.5.4
- mysql 8
- MyBatis 3.5.7

<br>

### mysql不同版本的注意事项:
**1. 驱动类 driver-class-name**  

**mysql5:**  
使用 jdbc5 驱动 驱动类使用: com.mysql.jdbc.Driver

<br>

**mysql8:**  
使用 jdbc8 驱动 驱动类使用: com.mysql.cj.jdbc.Driver

<br>

**2. 连接地址:**  

**mysql5的url:**  
```
jdbc:mysql://localhost:3306/ssm
```

<br>

**mysql8的url:**  
如果我们使用的mysql8的版本但是url中没有时区设置就会报异常
```
jdbc:mysql://localhost:3306/ssm?serverTimezone=UTC
```

<br><br>

# SSM工程

## 准备工作:
1. 我们创建一个空的工程 SSM

2. 我们在该工程下创建 Maven(Module)

3. 配置该Maven的pom.xml的 ``<packaging>jar</packaging>``  
```
我们不需要war, 我们测试的只有mybatis功能, mybatis就是封装了jdbc
而jdbc是不需要Tomcat服务器支持的, 所以我们这里创建一个普通个的Java工程就可以了
```

4. 引入SSM项目中所需要的依赖, 配置完pom.xml后要在Maven面板上**点击刷新按钮**  
```xml
<dependencies> 
  <!-- Mybatis核心 --> 
  <dependency> 
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.7</version>
  </dependency>

  <!-- 测试 -->
  <dependency> 
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
  </dependency>
  
  <!-- mysql驱动 -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.37</version>
</dependency>
</dependencies>
```

<br><br>

## Maven工程目录介绍
```
| - ModuleName
  | - src
    | - main: 主程序
      | - java: Java类
      | - resources: 配置文件

    | - test
      | - java: 测试库
```

<br><br>

## 创建 ssm数据库 和 user表
```sql
create table t_user(
	id int PRIMARY KEY auto_increment,
	username varchar(20),
  password varchar(20),
	age int,
  -- 当不指定 char 的size的时候 默认就是1
	gender char,
	email varchar(50)
)
```

<br><br>

## 创建user表对应的 实体类
上面我们创建了数据表 在JDBC的操作中我们知道表和实体类应该是一一对应的

也就是说表和实体类是有映射关系的

```
| - src
  | - main  
    | - java
      | - com.sam.mybatis.pojo
        - User
```

```java
public class User {
  private Integer id;
  private String name;
  private String password;
  private Integer age;

  // 数据库 char类型 -> String
  private String gender;
  private String email;

  public User() {
  }

  ...
}
```

<br><br>

# 搭建MyBatis框架
我们上面准备好了 
- Maven 
- 下载了依赖
- 创建了数据库 和 表
- 创建了和表对应的实体类

<br>

接下来我们要搭建MyBatis相关的了 MyBatis中主要有两个核心的配置文件

1. 核心配置文件: 如何连接数据库
2. 映射文件: 写sql语句用来确定如何操作数据库

<br><br>

## 创建MyBatis的核心配置文件
习惯上命名为 **mybatis-config.xml** 这个文件名仅仅只是建议, 并非强制要求。

将来整合Spring之后, 这个配置文件可以省略 所以大家操作时可以直接复制、粘贴。

<br>

### 核心配置文件作用:
核心配置文件主要用于 **配置连接数据库的环境** 以及 **MyBatis的全局配置信息**  

<br>

### 核心配置文件存放位置:
src/main/resources目录下

<br>

### 核心配置文件内容:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration 
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN" 
  "http://mybatis.org/dtd/mybatis-3-config.dtd"> 
  
<configuration> 
<!--设置连接数据库的环境--> 
<environments default="development">
  <environment id="development">

    <transactionManager type="JDBC"/> 

    <dataSource type="POOLED"> 

      <property name="driver" value="com.mysql.jdbc.Driver"/>
      <property name="url" value="jdbc:mysql://localhost:3306/ssm"/> 
      <property name="username" value="root"/> 
      
      <!-- 数据库为空 不写这项 -->
      <property name="password" value=""/>

    </dataSource> 
  </environment>
</environments>

<!--引入mybatis的映射文件--> 
<mappers> 
  <mapper resource="相对路径会从resources目录里面开始">
</mappers> 
</configuration>
```

<br>

**mappers标签:**  
复数型式

<br>

**作用:**    
引入mybatis的映射文件

<br>

**映射文件的作用:**   
mybatis-config.xml 配置文件中是没有写sql语句的 上面我们也说sql语句是写在映射文件中的

我们是通过读取核心配置文件 获取一个操作数据库的对象 当我们获取到该对象之后就可以执行sql了, 而sql语句在映射文件中

所以我们就要**将映射文件配置到核心配置文件中**, 然后我们通过加载核心配置文件 去找到相对应的映射文件中的sql去执行 来执行我们要的效果

<br><br>

## 创建 mapper 接口: 相当于DAO
mapper接口在MyBatis里面就相当于原来的DAO 原先的DAO有接口和实现类 但是mapper是不需要创建实现类的 

我们只需要创建它的接口 然后我们就可以通过MyBatis中的功能 来为它创建一个代理实现类 当我们调用接口中的方法的时候 它会直接帮我们对应一个sql语句 来执行这个sql语句

<br>

### 接口起名标准 
t_user 对应的实体类 User, 它的mapper接口就是 UserMapper

<br>

```
| - src
  | - main  
    | - java
      | - com.sam.mybatis.pojo
        - User
      | - com.sam.mybatis.mapper
        - UserMapper
```

<br>

### 接口中定义增加记录的方法:
向 t_user 表中添加一条记录, 返回值为int 为影响的行数
```java
public interface UserMapper {
  int insertUser();
}
```

<br><br>

## 创建 MyBatis 映射文件
之前我们操作数据库的方式是 先创建了DAO的接口, 然后再其实现类中提供sql语句, 然后通过JDBC的工具类执行sql 来获取结果

我们在MyBatis中需要创建的是 映射文件, 我们一个mapper接口 对应 映射文件, mapper接口中的一个抽下个方法对应映射文件中的一条sql语句

<br>

### ORM概念:
- 对象: Java的实体类对象
- 关系: 关系型数据库
- 映射: 两者之间的对应关系

<br>

|Java概念|数据库概念|
|:--|:--|
|类|表|
|属性|字段/列|
|对象|记录/行|

<br>

### 创建映射文件:

**位置:**  
/src/main/resources/mappers/UserMapper.xml

<br>

**要点1: 映射文件名 跟 UserMapper 接口名一致**  

<br>

**要点2: ``<mapper namespace>`` namespace的值为 mapper接口的全类名** 

<br>

**要点3: mapper接口中的一个抽象方法 对应 映射文件中的一条语句(sql标签), 且接口中的抽象方法名 和 映射文件的sql标签的id属性值要一致**  

<br>

**要点4: ``<select> <insert> <delete> <update>``操作数据库的标签**   
mapper配置文件中有很多类似这样的标签 我们使用对应的标签来操作数据库

- 标签属性id: 作为mapper接口中的抽象方法名
- 标签体: 作为sql语句

当我们调用 mapper接口中的方法 它会根据当前mapper接口的全类名 找到映射文件 返回根据当前调用方法的方法名(id) 找到对应的sql语句 获取标签中的sql 来执行sql

<br>

- **namespace:**  当前mapper文件的唯一标识
- **id:**  sql语句的唯一标识
  

```xml
<?xml version="1.0" encoding="UTF-8" ?> 
<!DOCTYPE mapper 
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd"> 


<mapper 
  namespace="mapper接口的全类名"> 
  <insert id="mapper接口抽象方法名">
    sql语句
  </insert> 
</mapper>
  

<mapper 
  namespace="com.sam.mybatis.mapper.UserMapper"> 
  <!-- int insertUser(); --> 
  <insert id="insertUser">
    insert into t_user values(null,'admin','123456',23,'男','12345@qq.com')
  </insert> 
</mapper>
```

<br>

### 核心配置文件中引入映射文件
在 mybatis-config.xml 文件的 ``<mappers>`` 标签中的进行配置  

因为 mybatis-config.xml 也在 resouces目录下 通过相对路径找到 UserMapper.xml 配置文件就可以了

```xml
<mappers> 
  <mapper resource="mappers/UserMapper.xml">
</mappers> 
</configuration>
```

<br><br>

## 使用 MyBatis 操作数据库
上面我们完成了如下的逻辑
1. 创建了 Mybatis核心配置文件
2. 创建了 数据库 和 表
3. 创建了 表对应的实体类
4. 创建了 UserMapper接口(相当于DAO)
5. 创建了 映射文件

现在我们来测试一下功能, 我们可能有疑问 我们只创建了 UserMapper接口 它怎么就对应到了映射文件 并执行了sql语句呢？

<br>

```
| - src
  | - main  
    | - java
      | - com.sam.mybatis.pojo
        - User
      | - com.sam.mybatis.mapper
        - UserMapper

  | - test
    | - java
      | - com.sam.mybatis.test
        - MyBatisTest
```

<br>

### 使用步骤:
1. 使用 org.apache.ibatis.io.Resources 类 读取核心配置文件 获取字节输入流

2. 获取Mybatis中提供的操作数据库的对象 SqlSession(跟Jdbc中提供的PreparedStatement一样)

3. 获取UserMapper接口的代理实现类对象

4. 通过 代理实现类对象 执行Mapper接口中的方法

5. 手动提交 或 回滚

6. 关闭资源SqlSession

<br>

### **<font color="#C2185B">Resources.getResourceAsStream(String path)</font>**  
获取 核心配置文件 根据指定路径对应的配置文件的字节输入流

<br>

**参数:**  
相对路径是从 resources目录下查找的

<br>

**返回值:**  
InputStream

<br>

**扩展:**  
- File Resources.getResourceAsFile();
- Properties Resources.getResourceAsProperties();
 
<br>

### **<font color="#C2185B">获取 SqlSession 对象</font>**  
我们通过下面一系列的调用 来获取MyBatis中为我们提供的操作数据库的对象

```java
// 先获取Builder 
SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();

// 传入配置文件的字节输入流, 拿到工厂对象
SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);

// 获取sql的会话对象 sqlSession, 它是MyBatis提供的操作数据库的对象
SqlSession sqlSession = sqlSessionFactory.openSession();
```

<br>

**注意:**  
我们以上面的方式创建的sqlSession 我们通过sqlSession 执行sql语句的话  
是必须由我们来控制事务的提交和回滚, 它是不会自动提交的, 那没有提交默认就是回滚

<br>

### **<font color="#C2185B">sqlSessionFactory.openSession(boolean autoCommit)</font>**  
获取Mybatis提供的操作数据库的对象

我们传入 true 返回的 sqlSession 对象  
通过该对象的所有操作 都会自动提交

当不需要考虑事务的时候可以传入参数true

**参数:**  
boolean:  
- false: 管理事务时使用, 对数据表的操作 需要进行手动提交或回滚 ``sqlSession.commit()``

- true: 自动提交

<br>

**返回值:**  
SqlSession sqlSession

<br>


**扩展:**  
sqlSession对象身上有一系列的方法用于操作数据库
- int insert(String statement)
- int insert(String statement, Object parameter)

- void select(String statement, Object parameter, ResultHandler handler)
- T selectOne(String statement)
- ``List<E>`` selectList(String statement, Object parameter)
- ``Map<K, V>`` selectMap(String statement, Object parameter, ResultHandler handler)

- update(String statement, Object parameter)

- int delete(String statement, Object parameter)

- void commit()
- void commit(boolean force)

- void close()
- T getMapper(Class<T> type)

- void clearCache()

<br>

### 操作数据库示例:
我们拿到了 sqlSession 对象就可以操作数据库了 这里操作数据库的方式有两种, **<font color="#C2185B">推荐获取UserMapper的代理实现类 从而调用接口中的方法的方式</font>**  

<br>

**方式1: 直接通过 sqlSession 来操作数据库**  
比如 我们调用 ``sqlSession.insert(namespace.sqlId)`` 向数据库中添加一条记录

<br>

### **<font color="#C2185B">sqlSession.insert()</font>**  
往数据库插入一条数据

直接通过 sqlSession 对象操作数据库的时候 需要传入参数

**参数:**  
映射文件中的 namespace.sqlId  

**<font color="#C2185B">sql语句的唯一id: namespace.sqlId</font>**

因为它需要自己去映射文件中 根据namespace找到映射文件, 根据sqlId找到要执行的sql

```java
sqlSession.insert("com.sam.mybatis.mapper.UserMapper.insertUser")
```

<br>

**返回值:**  
int

<br>

**方式2: 通过 获取UserMapper接口的代理实现类 调用接口内的方法 操作数据库**  

<br>

### **<font color="#C2185B">sqlSession.getMapper(Mapper接口.class)</font>**  
该方法会自动根据我们传入的Mapper接口 创建对应的代理实现类对象 并自动找到对应的映射文件

<br>

**参数:**  
Mapper接口.class: UserMapper.class

**返回值:**  
Mapper接口的实现类

<br>

返回的代理实现类会根据 Mapper接口的全类名 找到当前的映射文件 再通过 实现类调用的方法名找到映射文件中的sql 并执行

<br>

**底层:**  
``sqlSession.insert("com.sam.mybatis.mapper.UserMapper.insertUser")``  
底层就是调用的上面的方法, 将映射文件中的sql的唯一标识传入

<br>

### **<font color="#C2185B">sqlSession.commit()</font>**  
手动提交 或 回滚

<br>

### **<font color="#C2185B">sqlSession.close()</font>**  
关闭sqlSession对象

<br>

### 示例代码:
```java
package com.sam.mybatis;

import com.sam.mybatis.mapper.UserMapper;
import com.sam.mybatis.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;

public class MyBatisTest {
  @Test
  public void testInsert() throws IOException {

    // 1. 获取核心配置文件的输入流
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");

    // 2. 目标获取帮助我们执行sql语句的对象
    // 首先获取 SqlSessionFactoryBuilder 对象, 目的通过它拿到 SqlSessionFactory 工厂
    SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
    // 传入配置文件的字节输入流, 拿到工厂对象
    SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
    // 获取sql的会话对象 sqlSession, 它是MyBatis提供的操作数据库的对象
    SqlSession sqlSession = sqlSessionFactory.openSession();


    // 获取UserMapper的代理实现类对象 T getMapper(Class<T> type)
    // 如果我们传入 User.class 那么该方法返回的就是 User实例化对象
    // 如果我们传入 UserMapper.class 这样我们就可以获取到UserMapper对象, 该方法的地方会帮我们创建一个接口的实现类 将创建好的实现类对象进行了返回 这是代理模式, 通过代理模式创建了当前Usermapper接口的代理实现类
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    // 调用mapper接口中的方法 实现添加用户信息的功能
    int i = mapper.insertUser();
    System.out.println("结果: " + i);

    // 手动进行提交事务
    sqlSession.commit();

    // 关闭sqlSession对象
    sqlSession.close();
  }
}
```

<br>

### 扩展: log4j依赖
加入log4j日志功能, 加上该依赖后输出的时候 会输出日志信息

日志框架也是一个程序中比不可少的内容

<br>

如:
- 执行的什么sql语句
- 传入的什么参数
- 返回的影响的行数

```xml
<dependency> 
  <groupId>log4j</groupId>
  <artifactId>log4j</artifactId>
  <version>1.2.17</version> 
</dependency>
```

<br>

**log4j的配置文件: log4j.xml**  
log4j的配置文件名为log4j.xml, 存放的位置是src/main/resources目录下

**注意:**  
该版本有漏洞, 以后使用最新版

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">

<log4j:configuration 
  xmlns:log4j="http://jakarta.apache.org/log4j/">
  
  <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
    <param name="Encoding" value="UTF-8" />
    
    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m (%F:%L) \n" />
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

<br>

**log4j的日志级别:**  
```
FATAL(致命) > ERROR(错误) > WARN(警告) > INFO(信息) > DEBUG(调试)
```

从左到右打印的内容越来越详细

<br><br>

## 封装: 返回 sqlSession 对象的工具类

```
| - src
  | - main  
    | - java
      | - com.sam.mybatis.pojo
        - User

      | - com.sam.mybatis.mapper
        - UserMapper

      | - com.sam.mybatis.utils
        - SqlSessionUtil
```

### 创建返回 sqlSession 对象的静态方法
```java
package com.sam.mybatis.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class SqlSessionUtils {

  public static SqlSession getSqlSession() {

    SqlSession sqlSession = null;
    try {
      // 获取核心配置文件的输入流
      InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
      // 获取 SqlSessionFactoryBuilder 对象
      SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
      // 获取 SqlSessionFactory 对象
      SqlSessionFactory sessionFactory = sqlSessionFactoryBuilder.build(is);
      // 获取 SqlSession 对象
      sqlSession = sessionFactory.openSession(true);

    } catch (IOException e) {
      e.printStackTrace();
    }


    return sqlSession;
  }
}

```

<br><br>

## 使用 MyBatis 实现 增删改功能
因为我们使用 MyBatis 的时候 可以理解为是面向接口编程的 当我们要操作数据库的时候 大概步骤如下

1. 定义Mapper接口
2. 定义Mapper接口中的抽象方法
3. 创建 sqlSession 对象
4. 创建 Mppaer接口对应的 映射文件 指明 namespace 和 id 和 sql
5. 通过 SqlSession 获取 Mapper接口的代理实现类对象 传入接口.class
6. 通过 代理实现类对象 调用接口中的方法 完整操作数据库的操作
7. 关闭资源

<br>

### UserMapper接口中添加: 修改方法
```java
public interface UserMapper {
  // 添加用户信息
  int insertUser();

  // 修改用户信息
  void updateUser();
}
```

<br>

### UserMapper.xml映射文件中添加: 修改标签
```xml
<mapper
    namespace="com.sam.mybatis.mapper.UserMapper">

  <!-- int insertUser(); -->
  <insert id="insertUser">
    insert into t_user values(null,'admin','admin',18,'男','admin@qq.com')
  </insert>

  <!-- updateUser -->
  <update id="updateUser">
    update t_user set username="root", password="root" where id = 1
  </update>

  <!-- deleteUser -->
  <delete id="deleteUser">
    delete from t_user where id = 1;
  </delete>
</mapper>
```

<br>

### 获取UserMapper实现类对象 调用接口中的方法 完整操作数据库的操作
```java
@Test
public void testUpdate() {
  // 获取 sqlSession 对象
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();

  // 获取 UserMapper 接口的代理实现类
  UserMapper mapper = sqlSession.getMapper(UserMapper.class);

  // 调用接口中的方法进而操作数据库
  mapper.updateUser();

  // 关闭资源
  sqlSession.close();
}
```

<br><br>

## 使用 MyBatis 实现 查询功能
查询功能会比增删改复杂一些, 因为我们需要将查询出来的结果封装为实体类对象

- 查询出一条数据 -> 实体类对象
- 查询出多条数据 -> 实体类对象的集合

<br>

### 查询出一条数据

**步骤1:**  
在 UserMapper接口中定义好查询方法, <font color="#C2185B">并确定指明返回值类型</font>

- 返回一条数据: 
  - 返回值类型声明为实体类对象
  - 返回值类型声明为List集合

- 返回多条数据: 返回值类型声明为List集合
```java
public interface UserMapper {
  ...

  // 根据ID查询用户信息, 确定好返回值类型
  User getUserById(Integer id);
}
```

<br>

**步骤2:**  
在 UserMapper.xml 映射文件中 定义sql

<br>

**映射文件中对应的sql标签中 定义 resultType 标签属性:**  
作用: 设置当前查询的结果要转换为实体类的类型  

值为: <font color="#C2185B">查询的数据的Java类型</font>
- 查询到一个User, 则写User类所在的全类名
- 查询到一个``List<User>``, 我们也是写User类所在的全类名, 因为我们是将数据先封装到一个实体类中 然后再放入集合中

<br>

**标签属性: resultMap 标签属性:**  
自定义映射

- 当字段名 和 属性名不一致的时候 需要使用它
- 处理 一对多 或 多对一 的映射关系 需要用到它
- 一个类中有另一个类的属性的时候 需要用到他

<br>

**注意:**  
这两个标签属性 只能有一个, 也不是啊！！

```xml
<!-- 
  resultType指明:
    要查询的数据要转换为的Java类型
 -->
<select
  id="getUserById"
  resultType="com.sam.mybatis.pojo.User"
>
  select * from t_user where id = 1
</select>
```

<br>

**步骤3:**  
1. 获取 sqlSession 对象
2. 获取 UserMapper代理实现类
3. 调用方法
4. 关闭资源

```java
@Test
public void testSelect() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();

  UserMapper mapper = sqlSession.getMapper(UserMapper.class);

  User user = mapper.getUserById();
  System.out.println(user);
}
```

<br>

### 查询出多条数据

**步骤1:**  
在 UserMapper 接口中定义好抽象方法 指明返回值的类型

```java
public interface UserMapper {

  ...

  // 查询所有用户信息
  List<User> getAllUser();

}
```

<br>

**步骤2:**  
在 UserMapper.xml 映射文件中
1. 编写sql
2. 指定 resultType, 即查询数据的Java类型, 虽然我们查询到的是``List<User>``, 我们也是写User类所在的全类名, 因为我们是将数据先封装到一个实体类中 然后再放入集合中

```xml
<select 
  id="getAllUser" 
  resultType="com.sam.mybatis.pojo.User"
>
  select * from t_user
</select>
```

<br>

**步骤3:**  
- 获取 sqlSession 对象
- 获取 UserMapper接口的代理实现类
- 执行 接口中的方法 获取返回的集合

```java
@Test
public void testGetAllUser() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();

  UserMapper mapper = sqlSession.getMapper(UserMapper.class);

  List<User> users = mapper.getAllUser();
  users.forEach(System.out::println);
}
```

<br><br>

# MyBatis的核心配置文件

### 标签的书写顺序: 
MyBatis核心配置文件中的标签必须要按照指定的顺序配置

1. properties
2. settings: 全局配置
3. typeAliases
4. typeHandlers
5. objectFactory
6. objectWrapperFactory
7. reflectorFactory
8. plugins: 插件
9. environments  
10. databaseIdProvider
11. mappers


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

  <environments 
    default="development"
  >
    <environment id="development">

      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">

        <property name="driver" value="com.mysql.jdbc.Driver"/>

        <property name="url" value="jdbc:mysql://localhost:3306/ssm?"/>

        <property name="username" value="root"/>

        <!-- 数据库为空 不写这项 -->
        <!-- 
        <property name="password" value=""/>
        -->

      </dataSource>
    </environment>
  </environments>
  <!--引入映射文件-->
  <mappers>
    <mapper resource="mappers/UserMapper.xml"/>
  </mappers>
</configuration>
```

<br>

### ``<environments>``  
它是一个复数标签 里面可以设置多个 ``<environment>`` 标签

<br>

**``<environments default="">``**   
设置默认使用的环境, 值为 ``<environment id>`` id属性对应的值

<br>


### ``<environment id="环境">``
设置一个具体的连接数据库的环境, id值不能重复

```xml
<environments 
  default="development / test"
>
  <!-- 开发环境 -->
  <environment id="development">
    <transactionManager type="JDBC"/>
    <dataSource type="POOLED">
      <property name value />
    </dataSource>
  </environment>

  <!-- 测试环境 -->
  <environment id="test">
  </environment>
</environments>
```

<br>

每一个环境中由两个子标签组成
- ``<transactionManager>``: 事务管理器
- ``<dataSource>``: 数据源

<br>

### ``<transactionManager>``
设置事务的管理器

**type标签属性:**  
设置事务管理的方式, 可选值:
- JDBC:   
表示使用jdbc中原生的事务管理方式, 比如 自动提交可以手动开启和关闭, 或 手动的提交事务 或 回滚事务

- MANAGED:   
被管理, 例如: 以后在Spring整理MyBatis的时候, MyBatis中的事务管理就可以交给Spring来管理

<br>

### ``<dataSource>``
设置数据源

**type标签属性:**  
设置数据源的类型

- POOLED: 表示使用数据库连接池
- UNPOOLED: 表示不使用数据库连接池
- JNDI: 表示使用上下文中的数据源

<br>

### 使用 .properties 文件代替 ``<dataSource> ``的 ``<property>`` 子标签 
我们使用 MyBatis 配置数据库连接的时候, 我们的数据库配置信息写在了 xml 文件中

我们还可以将配置信息 提取到 .properties 文件中 下面我们看看步骤是什么

<br>

**1. /resources/jdbc.properties 创建文件**  
建议, 在设置key的时候 最好加上 jdbc. 前缀, 用来区别多个properties文件

```
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm
jdbc.username=root
jdbc.password=""
```

<br>

**2. 在 mybatis-config.xml 配置文件中 引入 jdbc.properties文件**  
使用 ``<properties>`` 标签来引入

<br>

**3. 我们使用 ${key} 的方式访问, 引入的properties文件**  

```xml
<configuration>

  <!-- 引入jdbc.properties文件 -->
  <properties resource="jdbc.properties">

  <environments 
    default="development / test"
  >

    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">

        <!-- 使用 ${} 读取配置文件中key对应的值 -->
        <property name="driver" value="${jdbc.Driver}"/>

        <property name="url" value="${jdbc.url}"/>

        <property name="username" value="${jdbc.username"/>

      </dataSource>
    </environment>
  </environments>
</configuration>
```

<br>

### ``<typeAliases>`` 类型别名
复数标签

设置类型别名, 即为某个具体的类型设置一个别名 在MyBatis范围中 就可以使用别名表示一个具体的类型

<br>

比如 我们实现查询的时候 需要指定 ``<select resultType>`` 中的resultType的值, 我们会填写类型的全类名

当我们给它设置了类型别名之后 我们就可以使用别名来访问某一个具体的类型

<br>

**注意:**  
mybatis配置文件的标签是有顺序的 我们要观察要写的标签在已有的标签的后面或前面

<br>

``<typeAliases>``是一个复数的标签 它里面有一个个的 ``<typeAlias>`` 用来配置类 和 类的别名

<br>

### ``<typeAlias>``
用来配置一个类的类型的别名

**标签属性:**  
- type: 指明类的全路径
- alias: 类的类型的别名

```xml
<typeAliases>
  <typeAlias type="com.sam.mybatis.pojo.User" alias="userPojo" />
</typeAliases>
```

<br>

**技巧:**  
**我们可以不指定 alias标签属性**, 当我们不指定标签属性的时候 它会使用默认别名

默认别名: 该类的类名, 且不区分大小写 user / User

<br>

上面这么修改了之后, 我们可以在 UserMapper.xml 文件中使用我们配置好的别名

```xml
<!-- UserMapper.xml -->
<select
  id="getUserById"
  resultType="userPojo"
>
  select * from t_user where id = 1
</select>
```

<br>

### 子标签 ``<package name>`` 以包的形式来设置类型的别名

**注意: 它是 ``<typeAliases>`` 的子标签**  

<br>

上面使用 ``<typeAliases>`` 来设置别名的话, 当实体类特别多的情况下 我们需要在该该标签下写很多的 ``<typeAlias>`` 每一个实体类都需要写一遍 这很麻烦

所以我们可以 以包的形式来设置类型的别名

<br>

当我们将实体类的包设置为 name属性的值, 那么该包下的所有类都会有默认的类型别名

```xml
<typeAliases>
  <package name="com.sam.mybatis.pojo" />
</typeAliases>
```

<br>

### ``<mapper resource>`` 
引入mybatis的映射文件的

```
表 -> 实体类 -> Mapper接口 -> 映射文件
```

一旦项目中的表多了后 实体类就会很多 相应的映射文件也会变多 如果我们要一个个的引入映射文件 那又会有特别多的 ``<mapper>``

<br>

所以一般我们会通过包来引入当前的映射文件

<br>

### 子标签 ``<package name>`` 以包的形式来引入映射文件

**注意: 它是 ``<mappers>`` 的子标签**  

<br>

**要求:**  
1. **映射文件所在的包** 要和 **Mapper接口所在的包** 必须一致
2. **映射文件的名字** 和 **Mapper接口的名字** 保持一致

<br>

```
| - src
  | - main  
    | - java
      | - com.sam.mybatis.pojo
        - User

      | - com.sam.mybatis.mapper 一样
        - UserMapper

    | - resources
      | - com.sam.mybatis.mapper 一样
        - UserMapper.xml
```

<br>

**注意:**  
我们在 resources 下创建包的时候 是创建一个文件目录 名字要输入 **com/sam/mybatis/mapper** 

这样创建的才是一层层的目录

<br>

修改完映射文件的位置后, 再修改 mybatis-config.xml 文件
```xml
<mappers>
  <package name="com.sam.mybatis.mapper"/>
</mappers>
```

<br>

**总结:**  
映射文件创建在 resources 目录下, 同时包名和Mapper接口的包名一致

<br>

**推荐:**  
1. 以包的形式设置类的类型别名
```xml
<typeAliases>
  <package name="com.sam.mybatis.pojo" />
</typeAliases>
```

2. 以包的形式引入映射文件
```xml
<mappers>
  <package name="com.sam.mybatis.mapper"/>
</mappers>
```

<br><br>

## 配置模版: MyBatis 和 映射文件
IDEA中有代码模版的功能 我们可以将 MyBatis 和 映射文件 配置成模版 省着以后还需要复制粘贴了

- ctrl + ,
  - editor
    - file and code templates

配置完后 我们就可以通过 右键 - new - 选择我们刚才创建的模版了

<br><br>

# MyBatis获取参数值的两种方式
我们开发的方向是B/S系统, 我们会通过浏览器/视图 收集用户输入的数据 将数据提交到服务器中 

然后送到service处理业务逻辑 再送到DAO在DAO的实现类中我们将这些参数拼接到sql语句中 然后最终执行sql语句 所以我们很少有sql是写死的

<br>

之前我们在JDBC的时候是怎么将参数拼接到sql中的?

1. 字符串拼接
2. 占位符赋值 ?

<br>

mybatis是面向接口编程的模式, 原来我们写的是DAO 现在写的是Mapper接口 而且没有实现类

我们调用mapper接口中的一个方法, 接口中的方法是有参数的 因为我们没有实现类, 所以mapper接口的抽象方法直接对应的就是映射文件中的一个sql语句

我们的sql语句是写在映射文件中的 我们要做的事情就是在映射文件中 通过指定的方式 来获取对应的Mapper接口中抽象方法的形参 然后将参数拼接到sql语句中

<br>

```java
public interface UserMapper {
  User getUserByUsername(String username);
}
```

```xml
<select
    id="getUserByUsername"
    resultType="User"
>
  select * from t_user where username = 这个位置的目的就是拿到接口抽象方法中的参数
</select>
```

<br>

mybatis在获取参数值上也给我们提供了两种方式
1. ${}
2. #{}

<br>

### ${}: 注意sql注入
本质是字符串拼接

**注意:**  
``${}``使用字符串拼接sql, 若为 字符串类型 或 日期类型 的字段进行赋值时, **<font color="#C2185B">需要手动加单引号</font>**  

<br>

### #{}:
本质是占位符赋值, 在底层#{}会被当做占位符来解析 ``where age = ?``

**注意:**  
#{}使用占位符赋值的方式拼接sql, 此时为字符串类型 或 日期类型 的字段进行赋值时, 可以自动添加单引号

<br><br>

# 抽象方法中形参个数不同, 映射文件中获取参数的方式也不同
当Mapper接口中的方法的参数 个数 类型 不一样的时候 我们获取参数值的使用方式 也是不一样的

下面我们分情况来一一说明 ${} 和 #{} 都应该怎么使用

<br><br>

## 接口抽象方法参数情况1: 单个参数 (单个字面量类型的参数)
Mapper接口中抽象方法的参数是 单个字面量类型的参数

<br>

### 字面量和变量:
字面量和变量是相对的 如: 
```java
int a = 1
```

1就是字面量, 也就是我们直观上看到的是什么 它就是什么时 它就是字面量

a就是变量, a变量是谁 我们需要看右边的值

<br>

### 字面量类型举例:
- 字符串 
- 基本数据类型
- 包装类 

它们都属于字面量类型

<br>

### 举例: 
Mapper接口中的方法 形参类型就是 单个字面量类型
```java
public interface UserMapper {
  User getUserByUsername(String username);
}
```

<br>

上面的 username 形参 是怎么才能拼接到 sql 中呢?
```xml
<select
    id="getUserByUsername"
    resultType="User"
>
  select * from t_user where username = ?
</select>
```

<br>

### 解决方法: #{} / ${}
使用这两哪个都可以, 当Mapper接口中的抽象方法的形参只有一个时

**直接填入参数名: #{username}**  

<br>

**使用 #{}**  
在JDBC中使用 ? 占位的地方 使用 #{} 来代替, 同时写上 Mapper接口方法中的形参名

<br>

**使用 ${}**  
当参数的类型是 字符串 或者 日期类型的时候, 需要手动加上单引号 '${username}'

```xml
<select
    id="getUserByUsername"
    resultType="User"
>
  select * from t_user where username = #{username}
</select>
```

<br>

**测试查询结果:**  
```java
@Test
public void test1() throws IOException {

  // 获取核心配置文件
  InputStream is = Resources.getResourceAsStream("mybatis-config.xml");

  // 获取 sqlSession
  SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
  SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
  SqlSession sqlSession = sqlSessionFactory.openSession(true);

  // 创建接口的代理实现类
  UserMapper mapper = sqlSession.getMapper(UserMapper.class);

  // 调用Mapper接口中的方法
  User admin = mapper.getUserByUsername("admin");

  System.out.println(admin);

  // 关闭资源
  sqlSession.close();
}
```

<br>

**注意:**  
#{username} 我们在这里写什么都可以 abc bvc 任意变量都可以

Mybatis只知道我们传过来的username对应的值, 并不知道我们传递过来的是username 

但是我们写的要有意义

<br><br>

## 接口抽象方法参数情况2: 多个字面量类型的参数
比如登录的工程, 我们要根据 用户名 和 密码 查询数据库, 验证是否登录成功 这时我们就需要两个参数

<br>

### 解决方案: 
当Mapper接口中的抽象方法的形参有多个形参需要填入 我们需要添加序号变量

**1. #{arg0}, #{arg1}, 从0开始, 是第一个参数**  

**2. #{param1}, #{param2}, 从1开始, 是第一个参数**  

<br>

**原理:**  
当Mapper接口中的参数有多个的时候, MyBatis会自动将多个参数放在Map集合中, 这时它会以两种方式存储数据

1. arg0=value1, arg1=value2
2. param1=value1, param2=value2

所以在映射文件中我们要拼接sql的时候, 其实我们就是从 Map集合中 通过 key 来获取保存在里面的数据

<br>

**UserMapper接口:**  
```java
public interface UserMapper {
  
  ...

  // 验证登录
  User checkLogin(String username, String password);
}
```

<br>

**UserMapper映射文件:**  
<select
  id="checkLogin"
  resultType="User"
>
  select * from t_user where username = #{arg0} and password = #{arg1}
</select>
```

<br><br>

## 接口抽象方法参数情况3: 形参为map类型, 里面包含多个参数

### 结论:
抽象方法的形参为Map类型, 在映射文件中就可以按照我们在map中自定的key, 获取对应的值, 进行sql拼接

<br>

### 描述:
上面抽象方法的参数是散装的: ``User checkLogin(String username, String password)``

当参数是散装的时候, MyBatis会将参数封装到Map中, 我们需以MyBatis定义好key去取值

```xml
<select
  id="checkLogin"
  resultType="User"
>
  select * from t_user where username = #{arg0} and password = #{arg1}
</select>
```

<br>

很多情况下, 我们的参数都是以Map的形式传入的
```java
User checkLogin(Map<String, Object> map);
```

```java
HashMap<String, Object> map = new HashMap<>();

map.put("username", "admin");
map.put("password", "admin");

User user = mapper.checkLoginByMap(map);
System.out.println(user);
```

<br>

这种情况下 我们可以就通过我们自己定义在map中的key取对应的值

```xml
<select
  id="checkLoginByMap"
  resultType="User"
>
  <!-- 
    通过 map中的key: username
    通过 map中的key: password
   -->
  select * from t_user where username = #{username} and password = #{password}
</select>
```

<br><br>

## 接口抽象方法参数情况4: 形参为JavaBean类型(访问User中的属性值)

### 描述:
比如我们有一个添加用户的功能, 我们会在前端收集用户的输入, 然后在服务器端将参数封装为User对象

然后我们在sql拼接的时候, 会利用get()方法从User对象中取值 一一拼接到sql中

<br>

### 结论:
我们在 JavaBean 中的结构, 其实也是key=value的形式, 所以我们在映射文件中直接**可以通过 #{属性名} 的方式, 找打JavaBean中属性对应的属性值**  

如果是一个实例类型的参数, 通过属性名就可以获取对应的属性值

<br>

**注意:**  
什么叫做属性名, 它跟成员变量是没有关系的, 它只跟get set方法有关系, 把get set方法名中的get set部分去掉, 剩余首字母改为小写 这是属性名

我们感觉剩下的部分就是成员变量 但实际上是不一样的 如果我们没有成员变量 但是有get set方法 我们是能通过get set方法访问属性的

<br>

**UserMapper接口:**  
```java
public interface UserMapper {
  ...

  // 添加用户
  void insertUser(User user);
}
```

<br>

**UserMapper映射文件:**  
```xml
<insert id="insertUser">
  insert into t_user values(null, #{username}, #{password}, #{age}, #{gender}, #{email})
</insert>
```

<br>

**测试添加用户:**  
```java
UserMapper mapper = sqlSession.getMapper(UserMapper.class);

mapper.insertUser(new User(null, "sam", "sam", 18, "男", "sam@gmail.com"));
```

<br><br>

## 接口抽象方法参数情况5: 形参为List集合

### 结论:
Mybatis也是将List形参放在Map集合中, 并设置key为 "list"

也就是说 当形参是List集合时, 我们可以直接通过 list 访问对应的值

<br><br>

## 接口抽象方法参数情况6: 形参为数组[]

### 结论:
Mybatis也是将数组形参放在Map集合中, 并设置key为 "array"

也就是说 当形参是数组时, 我们可以直接通过 array 访问对应的值

<br><br>

## 接口抽象方法参数情况7: 使用注解的方式设置获取抽象方法的形参的名字

### 结论:
形参使用 **@Param("自定义key")** 的形式定义名字, 这样在映射文件中进行sql拼接的时候 就可以通过注解指定的名字 找到对应的形参值
```java
User checkLoginByAnnotation(@Param("username") String username, @Param("password") String password);
```

<br>

**原理:**  
Mybatis也是将形参放在Map集合中, 但是key的位置MyBatis就不会自己设置了 它会将注解的value属性值作为key, 以当前的参数作为值

<br>

```xml
<select
  id="checkLoginByAnnotation"
  resultType="User"
>
select * from t_user where username = #{username} and password = #{password}
</select>
```

<br>

### 总结:
注解的方式叫做命名参数 它可以帮我们当前设置MyBatis封装参数的时候的key

<br>

### 技巧:
1. 实体类 和 Map类型的参数, 我们根据 key 取值使用就可以了 #{key}
2. 非实体类的参数, 我们都可以使用 @Param("指定key") 的方式 设置

<br><br>

## MyBatis: 查询一个实体类对象

### 需求:
通过 id 查询User用户的信息

<br>

### 原理:
我们前面说过 通过Mapper接口的代理实现类调用接口中的抽象方法从而实现的操作数据库的操作

其底层仍然是调用 sqlSession 身上的API 比如
- insert()
- delete()
- update()
- select()

其中查询功能MyBatis会 **根据Mapper接口中的抽象方法的返回值来决定** 调用 sqlSession 身上的哪个API 

比如:
- 抽象方法的返回值为User, 则调用的是 sqlSession.selectOne()
- 抽象方法的返回值为``List<User>``, 则调用的是 sqlSession.selectList()

<br>

### 要点:
查询一个实体类对象时, 需要注意 **抽象方法的返回值** 须是一个实体类对象

<br>

```java
// 根据id查询指定用户
User getUserById(@Param("id") Integer id);
```

```xml
<select id="getUserById" resultType="User">
  select * from t_user where id = #{id}
</select>
```

```java
@Test
public void test7() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();

  UserMapper mapper = sqlSession.getMapper(UserMapper.class);

  User user = mapper.getUserById(1);
  System.out.println(user);
}
```

<br><br>

## MyBatis: 查询多个实体类对象返回集合

### 需求:
查询所有用户信息

<br>

### 要点:
查询多个实体类对象返回集合时, 需要注意 抽象方法的返回值 须是一个实体类对象的集合

<br>

```xml
<select 
id="getAllUser" resultType="User">
select * from t_user
</select>
```

```java
public interface UserMapper {
   
  ...

  // 查询所有用户
  List<User> getAllUser();

}
```

<br><br>

## MyBatis: 查询单行单列的数据

### 需求:
查询总记录数, 或者一些聚合函数的查询结果, 获取某一本图书的价格

<br>

### 要点:
在映射文件中sql语句的 **resultType属性要写接口中抽象方法的返回值类型**

MyBatis中为Java中常用的类型设置了类型别名 resultType的值可以为:

- java.lang.Integer
- MyBatis为Java中常用类型设置的别名

基本数据类型的别名: _基本数据类型  
包装类的类型的别名: 包装类的类型名字

<br>

**MyBatis设置的别名:**  
|Alias|Mapped Type|
|:--|:--|
|_byte|byte|
|_char|char|
|_long|long|
|_short|short|
|_double|double|
|_float|float|
|_boolean|boolean|
|string|String|
|integer|Integer|
|double|Double|
|float|Float|
|boolean|Boolean|
|date|Date|
|bigdecimal|BigDecimal|
|biginteger|BigInteger|
|object|Object|
|date[]|Date[]|
|map|Map|
|hashmap|HashMap|
|list|List|
|arraylist|ArrayList|
|collection|Collection|

<br>

```java
public interface UserMapper {
  
  ...

  // 查询用户的总数量
  Integer getCount();

}
```

```xml
<!-- 这里也可以填写MyBatis定义的别名 -->
<select 
  id="getCount" 
  resultType="java.lang.Integer">
  select count(*) from t_user
</select>
```

<br><br>

## MyBatis: 将一条数据查询为Map

### 场景: 
查询结果没有实体类进行承装

<br>

### 描述:
一般我们查询出来一条数据后 都是需要将其转换为实体类对象的 但是有一种情况 我们查询出来的结果 没有对应的实体类

比如 查询的结果中有分组函数, 查询员工部门中的平均薪资 最高薪资 最低薪资 以及薪资的总和 这种情况下 我们就没有对应的实体类了

<br>

### 结论:
当我们的查询结果没有对应的实体类 我们就可以**将结果查询为一个Map集合**  

这时Map集合中会以 **字段名为key, 字段的值为value**  

因为实体类 和 Map的结构是一样的 所以我们能将结果查询为一个实体类类型 也可以将结果查询为一个Map类型

<br>

**实体类 和 Map结构的区别:**  
- 实体类的属性是固定的
- Map中没有固定的key

<br>

```java
public interface UserMapper {
  
  ...

  // 将一条数据查询为Map集合
  Map<String, Object> getUserByIdToMap(@Param("id") Integer id);
}
```

<br>

因为我们要将查询结果放在Map中, 所以我们的resultType的值要写 Map(MyBatis预定义的别名)
```xml
<select id="getCount" resultType="Map">
  select * from t_user where id = #{id}
</select>
```

```java
@Test
public void test9() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();

  UserMapper mapper = sqlSession.getMapper(UserMapper.class);

  Map<String, Object> userMap = mapper.getUserByIdToMap(1);

  System.out.println(userMap);
/*
  {password=admin, gender=男, id=1, age=18, email=admin@qq.com, username=admin}
*/
}
```

<br>

**注意:**  
当我们查询的字段的值为null的时候, 并不会将该组key=value放入map集合中

<br><br>

## MyBatis: 将多条数据查询为Map

### 方案1:  
我们需求是将数据表中的多条记录一一封装到Map中, 但是我们还是需要拿List来承装

也就是将一条条记录封装到Map中 然后保存到List里面

**将Mapper接口方法的返回值设置为Map的List集合 ``List<Map<String, Object>>``**  

```java
[
  {username=sam, password=sam ...},
  {username=erin, password=erin ...}
]
```

<br>

```java
public interface UserMapper {
  
  ...

  // 将多条数据查询为Map集合
  List<Map<String, Object>> getAllUserToMap();

}
```

<br>

注意, 我们的 resultType 还是要写 Map
```xml
<select 
  id="getAllUserToMap" 
  resultType="Map">
    select * from t_user
  </select>
```

<br>

### 方案2: Mapper接口抽象方法上追加 @MapKey("id") 注解
使用注解 @MapKey("id"), 帮我们当前查询的数据所转换的Map集合, 将其放到一个大的Map集合中 通过该注解设置大的Map集合的key

**注解参数:**  
以哪个字段作为key  
比如我们可以将当前所查询的数据的字段作为key, 也就是id

```java
{
  1={username=sam, password=sam ...},
  2={username=erin, password=erin ...}
}
```


```java
public interface UserMapper {
  
  ...

  // 将多条数据查询为Map集合, 这里我们还是使用Map<String, Object>作为多条数据的返回值 并使用 id 作为 key
  @MapKey("id")
  Map<String, Object> getAllUserToMap();

}
```

```xml
<select 
  id="getAllUserToMap" 
  resultType="Map">
    select * from t_user
  </select>
```

<br>

**方案1使用的比较多**  
我们也要知道并不是我们将查询出来的数据 都要转换实体类, 很多情况下都是我们查询出来的结果 没有相对应的实体类 这时我们就要将其转换为一个Map

<br><br>

# Mybatis: 特殊sql的执行
上面我们说过两种获取参数值的方式

- #{}: 占位符赋值, 它会自动加单引号
- ${}: 字符串拼接

我们都会选择 #{} 但是对于一些特殊的sql 比如
- 模糊查询
- 批量删除
- 动态设置表名

类似上述功能我们在实现的时候 是不能直接使用 #{} 否则的话就会出现各种问题

<br><br>

## 特殊的sql: 模糊查询

### 需求:
查询用户名中包含有 a 的信息

```sql
select * from t_user 
where username like '%a%'
```

%表示任意个数的任意字符, 我们的模糊查询基本上都是这么设置的

<br>

### Mapper接口的相关:
**1. 模糊查询的查询结果 不固定**  
我们可能查出来
- null
- 一条记录
- 多条记录

**返回值:**  
**当我们不确定查询出来的数据** 能有几条的话, 我们的方法的 我们**一般选择使用 List**

<br>

**2. 模糊查询时, 我们往like后传递的参数 要使用 ${}**  
```xml
<select id="getUserByLike" resultType="User">
  select * from t_user where username like '%${condition}%'
</select>
```

因为 #{} 会被解析为占位符, 也就是会变成如下的样子
```sql
select * from t_user where username like '%?%'
```

占位符被当成了 字符串的一部分, 它不会被当成占位符来解析 

也就是说对于上面的sql语句来说 根本就没有占位符, 当我们使用#{}的时候, 说明后续我们要给占位符进行赋值

所以它就调用了预编译对象中的set方法, 为占位符进行赋值, 但是sql语句中没有占位符 所以就报错了

```
Parameter index out of range
```

<br>

### 解决方式:
1. 使用 ${}: 这样就相当于 
```sql
select * from t_user where username like '%${condition}%'


select * from t_user where username like '%' + ? + '%'
```

<br>

2. 使用sql字符串拼接函数 concat()
```sql
select * from t_user where username like concat('%', #{condition}, '%');
```

<br>

3. 使用 ``"%"#{condition}"%"`` 的格式 注意我们使用的是双引号 <font color="#C2185B">推荐~~</font>
```sql
select * from t_user where username like "%"#{condition}"%";
```

<br>

**Mapper接口:**  
```java
public interface UserMapper {
  
  ...

  // 通过用户名模糊查询用户信息
  List<User> getUserByLike(@Param("condition") String condition);

}

```

<br>

**映射文件:**  
```xml
<select id="getUserByLike" resultType="User">
  select * from t_user where username like '%${condition}%'
</select>
```

<br>

**测试类:**  
```java
@Test
public void test11() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  List<User> list = mapper.getUserByLike("a");
  System.out.println(list);
}
```

<br><br>

## 特殊的sql: 批量删除
通过一条sql语句来删除多条数据

<br>

### 回顾批量删除的sql写法:

**方式1:**  
```sql
delete from t_user where id = 1 or id = 2
```

<br>

**方式2:**  
利用 in (范围)
```sql
delete from t_user where id in (1,2)
```

<br>

我们要说的就是 方式2 的批量删除, 我们需要知道要删除的id, 然后使用``,``将id们拼接起来

类似的批量删除的功能很常见, 一般都是结合着复选框来实现的 比如表格行前面的复选框

我们将选中数据的id传输到服务器, 然后将id们使用``,``拼接起来 使用方式2来删除

<br>

### 实现要点: 
当我们在映射文件中写sql的时候, 不能使用#{}, 它会为我们实际赋的值的前后加''的
```sql
delete from t_user where id in (#{ids})

-- #{} 会在结果的左右添加 '' 类似下面的语句就是错的, 我们的()中是不能添加''号的, 会报错, 但是下面的语句在mysql5.0版本中是可以执行的 只不过它只会删除第一条记录 
delete from t_user where id in ('4,5')
```

<br>

**解决方式: 使用 ${}**  
也就是说 我们使用 ``id in ()`` 这种语法进行的批量删除的话 我们就要使用 ${}

<br>

**Mapper接口:**  
```java
public interface UserMapper {
  
  ...

  // 批量删除: 需传入 1,2,3 格式的id字符串
  void deleteMoreUser(@Param("ids") String ids);

}

```

<br>

**映射文件:**  
```xml
<delete id="deleteMoreUser">
  delete from t_user where id in (${ids})
</delete>
```

<br>

**测试类:**  
```java
@Test
public void test12() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  mapper.deleteMoreUser("4,5");
}
```

<br><br>

## 特殊的sql: 动态设置表名
比如我们当前有两张表 表中的字段是一样的 但是我们查询数据时, 查询的表可能是不一样的

比如我们有 用户表 和 VIP表, 两张表中的字段是一样的 现在我们可能会查询这两张表

- 如果他是一个普通用户 那我们则要查询用户表  
- 如果他是一个VIP的话 那我们则查询VIP表

<br>

这种情况下 表名就需要动态的设置了

<br>

### 要点:
我们不能使用 #{}, 使用它的话, 会自动在我们注入的数据前后加上 '' 而我们查询表的时候 表名是不能加 '' 的, 所以我们要使用 ${}

**Mapper接口:**  
```java
public interface UserMapper {
  
  ...

  // 动态设置表名, 查询用户信息
  List<User> getUserList(@Param("tableName") String tableName);

}

```

<br>

**映射文件:**  
```xml
<select id="getUserList" resultType="User">
  select * from ${tableName}
</select>
```

<br>

**测试类:**  
```java
@Test
public void test12() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  mapper.getUserList("t_user");
}
```

<br><br>

## 添加数据后获取自增的主键的方法
在我们为主键设置了自动递增之后 我们添加一条数据的时候主键会自动递增 有的时候我们是需要向数据表添加数据后, 获取自增后的主键

这个功能我们使用的场景是很多的

<br>

### 场景:
我们有两张表班级表 和 学生表

- t_class(class_id, class_name)
- t_student(student_id, student_name, class_id)

我们现在需要在添加班级信息后, 再为班级分配学生, 这时有学生的的 class_id 就是新添加的班级的id

<br>

在我们首先要添加班级信息, 然后再为班级分配学生

我们之前在说表关系的时候, 多对一 和 一对多 的表关系, 我们都需要在多的这一方设置外键(主表的主键) 也就是说我们要在学生表里面设置班级的id

所以我们在添加完班级后 需要获取班级的id, 只有获取到新添加的班级id后 才能进行为班级分配学生的操作(比如 将某个学生的班级id修改为我们新增的班级id)

<br>

**步骤整理:** 
1. 添加班级信息
2. 获取新添加的班级id
3. 为班级分配学生, 即将某学生的班级id修改为新新加的班级id

<br><br>

## 获取新增数据的自增id:
该功能并不是Mybatis中特有的 而是JDBC中就有了

<br>

### JDBC: 获取自增后的主键 

**<font color="#C2185B">PreparedStatement ps = conn.preparedStatement(sql, Statement.RETURN_GENERATED_KEYS);</font>**  
在获取 ps 对象的时候, 我们还可以传入参数2

当我们传入参数2后, 就可以通过ps对象获取自动递增后的主键了

<br>

**<font color="#C2185B">ResultSet resultSet = ps.getGenerateKeys();</font>**  
获取添加操作后自增的id

<br>

**返回值:**  
ResultSet, 该结果集中只有一行一列 就是自增后的id


```java
Class.forName("加载驱动");

// 获取数据库连接
Connection conn = DriverManager.getConnection("url", "username", "password")

// 定义sql
String sql = "insert into t_user values()";

// 获取ps对象
PreparedStatement ps = conn.preparedStatement(sql, Statement.RETURN_GENERATED_KEYS);

// 执行sql
ps.executeUpdate()

// 获取自动递增的主键的, 返回值为结果集, 该结果集中只有单行单列的数据, 因为该结果集中只有自增的主键
ResultSet resultSet = ps.getGenerateKeys();

// 指针下移 指向第一条数据
resultSet.next();

// 自动递增的主键
int id = resultSet.getInt(1);
```

<br>

### MyBatis: 获取自动递增的主键
关键点在 映射文件 中

<br>

**Mapper接口:**  
实体类参数的时候不用设置 @Param("") 注解, 因为我们直接可以在映射文件中通过实体类中的属性名获取对应的参数值

```java
public interface UserMapper {
  
  ...

  // 添加用户
  void insertUser(User user);

}

```

<br>

**映射文件:**  
- useGeneratedKeys: true  
我们选择true后, 才可以获取自增后的主键

- keyProperty: id  
将添加的数据的自增主键, 赋值给实体类中的一个属性来承装, 后续我们通过该实例类就能获取到自增后的主键了 

```xml
<insert
  id="insertUser"
  useGeneratedKeys="true"
  keyProperty="id"
>
  insert into t_user values(null, #{username}, #{password}, #{age}, #{gender}, #{email})
</insert>
```

<br>

**测试类:**  
```java
@Test
public void test5() throws IOException {
  ... 

  UserMapper mapper = sqlSession.getMapper(UserMapper.class);

  // 我们将该对象命名 后续要使用该对象的id
  User user = new User(null, "other", "other", 18, "男", "other@gmail.com");

  mapper.insertUser(user);

  System.out.println("user = " + user);
  // user里面的id就有值了是6, 之前是null
}
```

<br><br>

# 自定义映射: resultMap
我们在映射文件中使用标签来查询的时候, 会写标签属性如
- id: 指向Mapper接口中的抽象方法
- resultType: 查询结果转换为实体类的类型
- resultMap: **我们现在要学习的部分**

```xml
<select
  id="checkLoginByMap"
  resultType="User"
  resultMap="我们学这个"
>
  select * from t_user where username = #{username} and password = #{password}
</select>
```

<br><br>

## resultMap的使用场景:
1. 查询结果的字段名 和 实体类中的属性名不一致
2. 当多对一 或者 一对多的关系时 我们也要使用 resultMap 来进行了处理

<br>

## 准备工作: 

### 创建 员工表 和 部门表 以及数据
```sql
create table t_emp (
	emp_id int PRIMARY KEY auto_increment,
	emp_name varchar(20),
	age int,
	gender char,
	dept_id int
)

-- 多对一的关系时, 多的一方的表中 应该有主表的主键
create table t_dept (
	dept_id int PRIMARY KEY auto_increment,
	dept_name varchar(20)
)
```

<br>

**员工表:**  
```
1	张三	20	男	1
2	李四	22	男	2
3	王五	23	男	3
4	赵六	25	女	1
```

<br>

**部门表:**  
```
1	A
2	B
3	C
```

<br>

### 要点:
员工表 和 部门表之间是 一对多 的关系, 一个部门可以对应多个员工

- 员工表: 从表
- 部门表: 主表

那从表中就要有一个字段 对应着主表中的主键, 也就是员工表中有 dept_id 字段 对应部门表中的主键 dept_id

<br>

### 创建实体类

**员工表对应的实体类:**  
```java
public class Emp {
  private Integer empId;
  private String empName;
  private Integer age;
  private String gender;

  // 当解决一对多的关系的时候 我们再写 deptId

  // 有参 无参 get set toString
}
```

**部门表对应的实例类:**  
```java
public class Dept {

  private Integer deptId;
  private String deptName;

  // 有参 无参 get set toString

}
```

<br>

### 创建 员工的Mapper接口 和 员工的映射文件
**EmpMapper接口:**  
```java
package com.sam.mybatis.mapper;

public interface EmpMapper {
}
```

<br>

**EmpMapper映射文件:**  
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper
  namespace="com.sam.mybatis.mapper.EmpMapper">


</mapper>
```

<br><br>

## 解决数据表的字段名 和 实体类属性名 不一致的问题
我们上面创建的数据表中的字段名是 xxx_xxx 格式命名的, 而我们对应的实体类中的属性名是 xxxYyy 驼峰形式

这样就是字段名和属性名不一致的情况, 我们在JDBC的时候封装的方法中就是根据查询出来的字段名通过反射获取对应的属性名 作为属性名获取相对应属性来进行赋值

<br>

### 字段名 和 属性名 时不一致的演示: 
**EmpMapper接口:**  
```java
public interface EmpMapper {

  // 根据id查询员工信息
  Emp getEmpByEmpId(@Param("empId") Integer empId);
}

```

<br>

**EmpMapper映射文件:**  
```xml
<select 
  id="getEmpByEmpId" 
  resultMap="Emp">
  select * from t_emp where emp_id = #{empId}
</select>
```

<br>

**测试类:**  
因为 字段名 和 属性名不一致, 所以输出结果中, empId, empName 的值为 null

**因为 empId 和 emp_id 没有创建映射关系**  

```java
@Test
public void test() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
  Emp emp = mapper.getEmpByEmpId(1);
  System.out.println(emp);
}
/*
  Emp{
    empId=null, 
    empName='null', 
    age=20, 
    gender='男'
  }
*/
```

<br>

## 字段名 和 属性名 时不一致的解决方式:

### 解决方式1: 为查询的字段设置别名 和属性名保持一致
不写 *, 把字段名分开单独写 并起别名

```xml
<select id="getEmpByEmpId" resultType="Emp">
  select * from t_emp where emp_id = #{empId}
</select>

<select id="getEmpByEmpId" resultType="Emp">
  select emp_id empId, emp_name empName, age, gender from t_emp where emp_id = #{empId}
</select>
```

<br>

### 解决方式2: 修改MyBatis的全局配置文件
- 当数据表中的字段名为符合mysql要求使用的 _
- 当Java实体类中的属性名为符合Java要求的 驼峰

这时**在MyBatis的核心配置文件中设置一个全局配置**, 可以自动将下划线映射为驼峰

<br>

**前提:**  
emp_id -> empId, 必须这种规则

<br>

**<font color="#C2185B">修改核心配置文件: ``<settings>``</font>**  
/resources/mybatis-config.xml

我们使用 ``<settings>`` 标签, 进行全局配置, 它会作用在mybatis的所有增删改查的功能, 该标签要写在 ``<properties>`` 的下面

```xml
<configuration>
  
<!-- 将下划线映射为驼峰 -->
<settings>
  <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>

</configuration>
```

<br>

### 解决方式: 使用 resultMap自定义映射

**1. ``<select resultMap="resultMap标签的id">``**  
标签属性 resultMap 的值是 ``<resultMap id>`` 的id值

这样 sql标签 才能和 ``<resultMap>`` 标签对应起来

<br>

**2. ``<resultMap id type>``标签属性:**  
- id: 唯一标识
- type: 结果集中的字段 和 哪一个实体类中的属性不一致, **就写那个实体类**  

<br>

**3. ``<resultMap>``的常用子标签:**  
- ``<id>``
- ``<result>``
- ``<association>``
- ``<collection>``

<br>

**id标签:**  
处理 主键 和实体类中属性的映射关系

- property: 属性, 处理实体类中的属性名
- column: 字段, sql查询出的某个字段
- javaType: 属性的类型, 一般不用
- jdbcType: 字段的类型, 一般不用
- typeHandler

<br>

**result标签:**  
处理 普通字段 和实体类中属性的映射关系

<br>

**association标签:**  
处理 多对一

<br>

**collection标签:**  
处理 一对多


```xml
<resultMap
  id="empResultMap"
  type="Emp"
>
  <!-- 处理主键映射 -->
  <id column="emp_id" property="empId"></id>

  <!-- 
    处理普通字段的映射
      age 和 gender 可以不写, 但建议写
  -->
  <result column="emp_name" property="empName"></result>
  <result column="age" property="age"></result>
  <result column="gender" property="gender"></result>
</resultMap>


<!-- resultMap: 写上面的id -->
<select
  id="getEmpByEmpId"
  resultType="Emp"
  resultMap="empResultMap"
>
  select * from t_emp where emp_id = #{empId}
</select>
```

<br><br>

## 什么时候使用 ``<resultMap>``  
当我们实体类中的属性 有对象类型的属性的时候使用吧

<br><br>

# 处理 多对一 和 一对多我们学过4种表关系
- 一对一
- 一对多
- 多对一
- 多对多

这里我们只说 多对一 和 一对多, 因为 一对一 和 多对多的处理方式是一样的

<br>

## 多对一映射关系的功能分析
表和表之间有关系, 它们所对应的实体类之间也有关系

在表中我们可以通过一个字段表示一个员工所对应的部门id, 比如 dept_id 字段表示部门的id

```
1	张三	20	男	1
2	李四	22	男	2
3	王五	23	男	3
4	赵六	25	女	1
```

那么一样, 我们在 Emp实体类中 也要有一个属性用来描述员工所对应的部门的信息

我们的表对应的实体类, 字段对应当前实体类中的属性, 表中的一条数据对应一个实体类的对象

我们现在员工表 和 部门表是 多对一 的关系, **也就是说一个员工对应的是一条部门的信息(一条部门数据)**  

也就是说 张三 对应 dept_id: 1 这条部门的信息, **这条部门的信息对应的是这条部门的对象**  

<br>

### 设置实体类与实体类之间的关系:
因为员工和部门是多对一的关系 所以一个员工对应的应该是一个部门对象

一个部门中有多个员工信息, 部门的实体类中应该有员工的集合

- 对一: 实体类中的属性的值就是一个对象
- 对多: 实体类中的属性的值就是一个对象的集合

<br>

**处理多对一:**  
我们在员工的实体类中 来设置一个部门实体类的类型的属性

```java
public class Emp {
  private Integer empId;
  private String empName;
  private Integer age;
  private String gender;
  
  // 员工所对应的部门的信息(部门的一条数据 一个实体类对象)
  private Dept dept;
}
```

**注意:**  
- 有 dept 的get 和 set
- 有参构造器中没有 dept

<br>

### 查询数据表 为实体类中的属性进行赋值
现在我们不仅要查询员工的信息 还要将它对应的部门信息也要查出来

用一个员工的实体类表示当前员工的信息和员工所对应的部门

就是说我们要通过一个sql既要将员工查询出来 还要将部门查询出来, 这就涉及到了多表联查

```sql
select * from t_emp e 
left join t_dept d 
on e.dept_id = d.dept_id 
where e.emp_id = 1
```

这里我们使用的是外连接, 我们主要是考虑员工的信息, 所以当该员工没有部门的时候 我们也要将其查询出来 所以使用的是左外连接

查询结果:
|emp_id|emp_name|age|gender|dept_id|dept_id|dept_name|
|:--|:--|:--|:--|:--|:--|:--|
|1|张三|20|男|1|1|A|

<br>

我们发现有两个 dept_id, 因为一个是员工表中的 另一个是部门表中的, 处理与否都可以 我们处理下
```sql
select e.*, d.dept_name from t_emp e 
left join t_dept d 
on e.dept_id = d.dept_id 
where e.emp_id = 1
```

<br>

**问题:**  
我们查询出来的结果是
- emp_id
- emp_name
- age
- gender
- **dept_id**
- **dept_name**

我们的Emp实体类中的属性有
- empId
- empName
- age
- gender
- **Dept dept**

上面的4个都可以赋上值, 但是唯有 Dept dept 的值是null, 也很好理解, 我们查询出来的是两个 dept_id 和 dept_name 一个是 Integer 一个是 String

而我们的属性是 Dept 类型的 没办法进行赋值, 而我们是想将 
- dept_id 和 dept对象中的属性deptId 进行映射
- dept_name 和dept对象中的属性deptName 进行映射

而不是 dept_id 和 dept_name 和 Emp实体类中的Dept dept属性进行映射

**怎么解决?**  

<br>

### 解决方式1: 级联方式处理多对一的映射方式
**要点:**  
``<select resultMap>`` 使用 ``<resultMap>`` 将多表联查中的结果

- 员工表的结果映射到Emp实体类的属性中
- 部门表的结果映射到Emp实体类的Dept dept对象的属性中

**所有的属性都要写上映射关系 不管是否存在下划线和驼峰之间的关系**  

```xml
<resultMap
  id="empAndDeptResultMap"
  type="Emp">

  <!-- 
    处理主键的映射关系
   -->
  <id column="emp_id" property="empId"></id>

  <!-- 
    处理普通字段的映射关系
   -->
  <result column="emp_name" property="empName"></result>
  <result column="age" property="age"></result>
  <result column="gender" property="gender"></result>

  <!-- 
    将查询出来的字段 dept_id 映射到
      Emp实体类的 dept属性 的 deptId 中
   -->
  <result 
    column="dept_id" 
    property="dept.deptId"></result>
  <!-- 
    将查询出来的字段 dept_name 映射到
      Emp实体类的 dept属性 的 deptName 中
   -->
  <result 
    column="dept_name" 
    property="dept.deptName"></result>
</resultMap>



<select id="getEmpAndDept"
  resultMap="empAndDeptResultMap"
>
  select * from t_emp e left join t_dept d on e.dept_id = d.dept_id where e.emp_id = #{empId}
</select>
```

<br>

**EmpMapper接口:**  

**测试类:**  
```java
@Test
public void test2() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
  Emp emp = mapper.getEmpAndDept(1);
  System.out.println(emp);
}

/*
  Emp{
    empId=1, 
    empName='张三', 
    age=20, 
    gender='男', 

    dept=Dept{
      deptId=1, 
      deptName='A'
    }
  }
*/
```

<br>

### 解决方式2: 使用 ``<association>``
该标签是专门来处理多对一的映射关系, 它也可以处理一对一的映射关系

**对一就用它**  

它主要是处理实体类类型的属性, 一对一 多对一, 对一对一对应的就是对象

<br>

**``<association property javaType>``**  
- property: 实体类中的属性
- javaType: 当前属性的类型, 全类名 或 别名

```xml
<resultMap
  id="empAndDeptResultMap"
  type="Emp">

  <!-- 
    处理主键的映射关系
   -->
  <id column="emp_id" property="empId"></id>
  <!-- 
    处理字段的映射关系
   -->
  <result column="emp_name" property="empName"></result>
  <result column="age" property="age"></result>
  <result column="gender" property="gender"></result>

  <!-- 
    使用 association 指明实例类中的 对象 和 对象的类型
      利用子标签来将查询出来的字段 和 该对象中的某个属性映射在一起
   -->
  <association
    property="dept"
    javaType="Dept"
  >
    <id column="dept_id" property="deptId"></id>
    <result column="dept_name" property="deptName"></result>
  </association>
</resultMap>
<select id="getEmpAndDept"
  resultMap="empAndDeptResultMap"
>
  select * from t_emp e left join t_dept d on e.dept_id = d.dept_id where e.emp_id = #{empId}
</select>
```


<br>

### 解决方式3: 使用 分步查询处理多对一的关系
分步的查询 一步一步的查, 我们上面的查询方式是多表联查 我们要查的是员工信息 以及员工所对应的部门的信息

我先把员工查询出来, 然后我们再将查询出来的员工的部门id作为条件 再在部门表中进行查询 查询出部门的信息

也就是说我们通过多条sql语句将我们要查询的数据一步步的查询出来

**分步查询既可以处理多对一的关系 也可以处理一对多的关系**  

<br>

**思考:** 
1. 在分步查询中我们首先要想 当前的查询一共要分几步 
2. 每一步应该是什么

比如我们上面的案例中, 我们要先查员工, 查完后我就知道员工所对应的部门id 再将查询出来的员工的部门id作为条件 再在部门表中进行查询 查询出部门的信息

将查询出来的结果再赋值给Emp中的dept对象

<br>

**实现步骤:**  
我们现在有两个类
- Emp
- Dept

那么对应就应该有两个Mapper接口
- EmpMapper
- DeptMapper

那么对应就应该有两个Mapper接口对应的映射文件
- EmpMapper.xml
- DeptMapper.xml

查询不同的表就在不同的映射文件中写逻辑

<br>

**第一步**  
我们首先要查询的是 根据 emp_id 查询出来员工的信息

**1.**  
EmpMapper接口中定义第一步的抽象方法
```java
public interface EmpMapper {

  ...

  // 分步查询: 第一步, 通过员工id查询对应的信息
  Emp getEmpAndDeptByStepOne(@Param("empId") Integer empId);

}
```

<br>

**2.**  
EmpMapper映射文件中 ``<select>``标签中的查询结果为Emp实体类中的属性进行赋值, 另外使用 ``<association property select column>`` 标签, mybatis会自动调用 标签属性select指向的sql

- <font color="#C2185B">property:</font>   
要操作的属性, 我们要操作的就是 Emp内部的Dept dept属性

- <font color="#C2185B">select:</font>   
接口全类名+抽象方法名 -> DeptMapper映射文件中的指定sql, **mybatis会自动调用该sql并将 column对应的字段对应的值传递到select指明的sql语句中自动执行** (我们在接口中的抽象方法上右键copy), 也就是说 property属性指明的对象的值是由哪个sql查询出来的

- <font color="#C2185B">column:</font>   
查询出来的字段, 该字段会做为参数传递到 select指向的sql语句自动执行, 将查询出来的某个字段做为分步查询的sql的条件

```xml
<resultMap
  id="empAndDeptByStepResultMap"
  type="Emp">
  <id column="emp_id" property="empId"></id>
  <result column="emp_name" property="empName"></result>
  <result column="age" property="age"></result>
  <result column="gender" property="gender"></result>

  <association
    property="dept"
    select="com.sam.mybatis.mapper.DeptMapper.getEmpAndDeptByStepTwo"
    column="dept_id"
  ></association>
</resultMap>


<select
  id="getEmpAndDeptByStepOne"
  resultMap="empAndDeptByStepResultMap"
>
  select * from t_emp where emp_id = #{empId}
</select>
```

<br>

**第二步:**  
第二步中的逻辑都是mybatis自动调用的

**DeptMapper:**  
```java
public interface DeptMapper {
  // 分步查询: 第二步, 通过部门id查询对应的信息
  Dept getEmpAndDeptByStepTwo(@Param("deptId") Integer deptId);
}
```

**DeptMapper映射文件:**  
因为 Dept类中没有 对象类型的属性 我们直接使用 resultType
```xml
<select id="getEmpAndDeptByStepTwo" resultType="Dept">
  select * from t_dept where dept_id = #{deptId}
</select>
```

<br>

**测试类:**  
我们发现我们只是调用了 第一步 中的方法 并没有调用 第二步 中的方法, 而是Mybatis自动帮我们调用的
```java
@Test
public void test3() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
  Emp emp = mapper.getEmpAndDeptByStepOne(1);
  System.out.println(emp);
}
```

<br><br>

## 分步查询的优势: 延迟加载
分步查询的优点可以实现延迟加载, 也叫做懒加载

上面上面的分步查询是通过两个sql语句 把我们所需要的数据查询出来

<br>

### 使用场景:
有一种场景就是我们暂时只需要获取员工信息 不需要获取部门的信息

这时候如果我们使用的是分步查询 并且当我们开启延迟加载后 我们只要员工信息那么mybatis只执行查询员工的sql

如果我们没有获取部门信息那么就不会执行查询部门的sql, 这样就可以检查内存的消耗

<br>

### 全局 开启延迟加载的功能:
我们需要在 核心配置文件 设置 全局配置信息 

也就是在 /resources/mybatis-config.xml配置文件中设置 ``<settings>`` 内部的``<setting>``子标签

```xml
<settings>
<setting name="mapUnderscoreToCamelCase" value="true"/>

<setting name="lazyLoadingEnabled" value="true"/>
</settings>
```

<br>

**lazyLoadingEnabled:**  
- true: 开启懒加载
- false: 关闭懒加载, 默认值

延迟加载的全局开关, 当开启时, 所有关联对象都会延迟加载

<br>

**使用方式:**  
我们上面使用了分步功能来完成 查询数据库将员工信息 和 部门信息查询到后 封装到 Emp对象里

当我们开启延迟加载后, 我们只获取员工的姓名, 这时我们看输出日志 发现mybatis只执行了获取员工信息的sql, 获取部门信息的sql并没有执行

```java
@Test
public void test3() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);


  Emp emp = mapper.getEmpAndDeptByStepOne(1);

  // 只需要使用员工的姓名
  System.out.println(emp.getEmpName());
}


/*
  日志:

  DEBUG 02-08 12:56:43,921 ==>  Preparing: select * from t_emp where emp_id = ? (BaseJdbcLogger.java:137) 

  DEBUG 02-08 12:56:43,966 ==> Parameters: 1(Integer) (BaseJdbcLogger.java:137) 

  DEBUG 02-08 12:56:44,070 <==      Total: 1 (BaseJdbcLogger.java:137) 

张三

*/
```

<br>

**aggressiveLazyLoading:**  
- true: 完整加载, 不管我们有没有开启延迟加载, 只要是调用了分步查询的方法 都会执行所有的sql

- false: 按需加载, 默认值, 我们需要什么就加载什么, **它的默认值就是false, 所以我们可以不设置, 但是老师建议写上**

```xml
<settings>
  <setting name="mapUnderscoreToCamelCase" value="true"/>


  <setting name="lazyLoadingEnabled" value="true"/>

  <!-- false: 按需加载 -->
  <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

<br>

### 局部 开启延迟加载的功能:
上面我们修改的是全局配置 所以它是对mybatis里面所有的分步查询都有效果的

有的时候我们希望某一个分步查询不是按需加载, 而是就希望它一次执行完所有的sql, 查询出来所有的数据

<br>

**局部延迟加载的使用方式:**  
我们在 映射文件中 ``<resultMap>`` 的子标签 ``<association> or <collection>`` 使用它的标签属性

<br>

**``<association fetchType>``**  
它标签属性用来设置是 立即加载 还是 延迟加载

- eager: 立即加载
- lazy: 延迟加载

该标签属性的作用是 在我们开启了延迟加载的环境中 我们可以指定某一个分步查询是延迟加载还是立即加载

```xml
<resultMap
  id="empAndDeptByStepResultMap"
  type="Emp">
  <id column="emp_id" property="empId"></id>
  <result column="emp_name" property="empName"></result>
  <result column="age" property="age"></result>
  <result column="gender" property="gender"></result>


  <!-- 
    这里是分步查询的第二步

    全局环境中是延迟加载 正常如果不是页面用到部门信息是不会执行这个部分指向的sql语句的
    
    但在这里 我们使用 fetchType 并指明为 立即加载 所以会一次性的得到第二步的数据
   -->
  <association
    property="dept"
    fetchType="eager"
    select="com.sam.mybatis.mapper.DeptMapper.getEmpAndDeptByStepTwo"
    column="dept_id"
  ></association>
</resultMap>
<select
  id="getEmpAndDeptByStepOne"
  resultMap="empAndDeptByStepResultMap"
>
  select * from t_emp where emp_id = #{empId}
</select>
```

<br><br>

## 处理 一对多 的映射关系
员工对部门是多对一, 部门对员工就是一对多, 一个部门中对应了多个员工的信息


### 回顾 多对一:
一个员工对应一个部门的信息 我们知道了怎么在Emp的实体类中体现

对一 对的是一个对象, 所以我们在Emp的实体类中声明了一个 部门对象 Dept dept 用来体现这种关系

<br>

### 一对多的体现:
我们现在想要刻画的是 一个部门中有多个员工, 我们在 Dept实体类中 声明一个 ``List<Emp> emps`` 属性就可以了

在表关系映射到实体类中的时候 我们的实例类应该如下的处理表的关系
- 对一 对应对象
- 对多 对应集合

<br>

**Dept实体类:**  
```java
public class Dept {

  private Integer deptId;
  private String deptName;

  private List<Emp> emps;

  ...
}
```

<br>

### 查询数据表 为实体类中的属性进行赋值
我们要查询部门信息, 并且将该部门中所有员工的信息查询出来

**DeptMapper接口:**  
```java
public interface DeptMapper {

  // 查询部门以及部门中的员工信息
  Dept getDeptAndEmpByDeptId(@Param("deptId") Integer deptId);
}
```

<br>

**sql:**  
sql怎么写? 我们要获取到部门信息 以及 部门中的员工 所以要进行两表联查 我们现在要处理一对多的关系

```sql
select * from t_dept d
left join t_emp e
on d.dept_id = e.dept_id
where d.dept_id = #{deptId}
```

<br>

### 处理一对多映射的方式1: 使用 collection标签

**``<collection property ofType>``**  
处理对多的时候(处理实体类中集合对象的emps的属性) 我们使用的是 collection标签

- property: 处理实体类中哪个List集合属性
- ofType: 指明集合中具体的类型

```xml
<resultMap id="deptAndEmpResultMap" type="Dept">

  <!-- 
    处理 Dept 的主键映射
   -->
  <id column="dept_id" property="deptId"></id>

  <!-- 
    处理 Dept 的 普通字段的映射
   -->
  <result column="dept_name" property="deptName"></result>

  <!-- 
    处理 Dept 实体类中 List<Emp> emps 属性的映射关系
   -->
  <collection property="emps" ofType="Emp">

    <!-- 处理 Emp 的 主键映射 -->
    <id column="emp_id" property="empId"></id>

    <!-- 处理 Emp 的 普通字段的映射 -->
    <result column="emp_name" property="empName"></result>
    <result column="age" property="age"></result>
    <result column="gender" property="gender"></result>
  </collection>
</resultMap>


<select id="getDeptAndEmpByDeptId" resultMap="deptAndEmpResultMap">
  select * from t_dept d
  left join t_emp e
  on d.dept_id = e.dept_id
  where d.dept_id = #{deptId}
</select>
```

<br>

**测试:**  
```java
@Test
public void test5() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  DeptMapper mapper = sqlSession.getMapper(DeptMapper.class);
  Dept dept = mapper.getDeptAndEmpByDeptId(1);
  System.out.println(dept);
}

/*
  Dept{
    deptId=1, 
    deptName='A',
    
    emps=[
      Emp{empId=1, empName='张三', age=20, gender='男', dept=null}, 

      Emp{empId=4, empName='赵六', age=25, gender='女', dept=null}
    ]
  }
*/
```

<br>

### 处理一对多映射的方式2: 使用 分步查询
我们现在要查询的是部门信息 以及 部门所对应的员工 

我们可以先把部门查询出来 然后再查询部门中的员工信息


<br>

**第一步:**  

**DeptMapper接口:**  
```java
public interface DeptMapper {
  ...

  // 分步查询: 第一步 根据部门id查询部门信息
  Dept getDeptAndEmpByStepOne(@Param("deptId") Integer deptId);
}
```

<br>

**DeptMapper映射文件:**  
对多 使用的 collection标签
- property: 指明要处理 Dept实体类中的 emps 属性

- select: 指明第二步中的sql, 接口的全类名 + 抽象方法名

- column: 指明 将该sql中的查询出来的 dept_id 传递到第二步的sql中 做为参数

```xml
<!--
  要处理的是 Dept中的集合属性 所以 type 写 Dept
-->
<resultMap id="DeptAndEmpResultMapByStep" type="Dept">
  <id column="dept_id" property="deptId"></id>
  <result column="dept_name" property="deptName"></result>

  <collection
    property="emps"
    select="com.sam.mybatis.mapper.EmpMapper.getDeptAndEmpByStepTwo"
    column="dept_id"></collection>
</resultMap>
<select id="getDeptAndEmpByStepOne" resultMap="DeptAndEmpResultMapByStep">
  select * from t_dept where dept_id = #{deptId}
</select>
```

<br>

**EmpMapper接口:**  
```java
public interface EmpMapper {

  ...

  // 分步查询: 第二步, 通过部门id查询所有员工的信息
  List<Emp> getDeptAndEmpByStepTwo(@Param("deptId") Integer deptId);
}
```

<br>

**EmpMapper映射文件:**   
注意返回值类型

```xml
<select id="getDeptAndEmpByStepTwo" resultType="Emp">
  select * from t_emp where dept_id = #{deptId}
</select>
```

<br>

**测试:**  
```java
@Test
public void test6() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();

  DeptMapper mapper = sqlSession.getMapper(DeptMapper.class);

  Dept dept = mapper.getDeptAndEmpByStepOne(1);

  System.out.println(dept);
}
```

<br>

**分步查询的好处: 延迟加载**  

<br><br>

# 动态sql
MyBatis框架的动态sql技术是一种根据特定条件动态拼装sql语句的功能

它存在的意义是为了解决 拼接sql语句字符串时的痛点问题 

<br>

### 动态sql的本质
它就是映射文件中一系列的标签 它们的功能就是帮助我们拼接sql
- ``<if>``
- ``<where>``
- ``<trim>``
- ``<choose> <when> <oherwise>``
- ``<foreach>``
- sql片段

<br><br>

## 拼接sql时的痛点: 多条件查询
页面有查询的功能 该页面有很多的表单项
- 文本框
- 单选框
- 复选框

让我们选择某些条件 当我们选择了条件后 它就会根据当前的条件 用户选择的条件就会拼接到sql中 然后去查询数据库

```
姓名: _____
年龄: _____
性别: _____


------
search
------
```

比如我们填写了 姓名 那就是根据姓名去查询  
比如我们填写了 姓名 年龄 那就是根据姓名和年龄去查询  

也就是说我们选了A B则我们就要拼接条件A B到sql中, 我们只选了A 那我们就只拼接A, 没选择的不拼接

<br>

也就是说我们要给所有的表单项设置默认值, 也就是当我们没有选择该表单项的时候, 该表单项的值应该是3种情况

- 文本框: 空字符串
- 单选框 和 复选框: null
- 其它情况: null

比如我们前端没有传递 姓名条件, 但提交表单后服务获取姓名条件的时候 获取的应该是null或""(文本框的默认值)

<br>

### 判断条件: 判断 null 或 空字符串 
当我们在后台判断 用户选择的条件是否需要拼接到sql中 我们只需要在服务器中判断

当该条件不为 null 并且 也不为空字符串的时候, 说明用户选择了该条件, 我们则需要将条件拼接到sql中

当该条件等于 null 或 空字符串的时候, 说明用户没有选择该条件, 我们不需要将条件拼接到sql中

<br><br>

## Mybatis: 动态sql 实现多条件查询

### 要点:
**1. 多条件查询的结果 我们不确定是几条**  
当我们不确定查询返回的数据有多少的时候, 我们使用List来承装

<br>

**2. 我们查询的是员工信息, 那么前端的表单里面的条件都是员工信息, 如员工名**  
所以我们将查询条件设置为 Emp emp 对象, 也就是说查询条件都在员工对象里

<br>

**3. 我们要根据条件查询员工表 找到符合条件的信息** 
```sql
select * from t_emp where 条件怎么写?
```

我们要将条件都加上 但是条件是否需要被拼接到sql语句中 我们还需要看下页面中 有没有选择该条件

我们要是想知道有没有选择该条件 我们可以判断表单项对应的值是否是 null 或 空字符串

当前端将数据传送到服务器的时候 有两个特殊的值 null 和 空字符串

如果是null或空字符 说明没有选择该条件 则我们不需要拼接到sql中, 反之就要拼接到sql中

<br>

所以我们要判断条件是否要拼接到sql中

<br>

### ``<if test="表达式">``
当test中的表达式为true的时候, 则if标签内的内容有效 则会拼接到sql中

当test中的表达式为false的时候, 则if标签内的内容无效 则不会拼接到sql中

<br>

```xml
<select id="getEmpByCondition" resultType="Emp">

  select * from t_emp where 1 = 1

  <if test="empName != null and empName != ''">
    and emp_name = #{empName}
  </if>

  <if test="age != null and age != ''">
    and age = #{age}
  </if>

  <if test="gender != null and gender != ''">
    and gender = #{gender}
  </if>
</select>
```

1. 映射文件中不能写 &&, 只能写 and
2. test="表达式", 表达式中可以直接写Mapper接口抽象方法中的形参
  - 多个参数的时候写 arg0 1
  - 单个参数的时候写 @Param
  - 实体类类型的时候 直接写实体类中的属性名
3. 空字符串使用的 ''
4. 我们不用判断id 因为id对于用户来说是没有意义的
5. 当满足test的表达式的时候 标签体的内容会拼接到sql中
6. 技巧: 我们可以先写 where 1 = 1, 这样第一个if前面我们也加上and, 这样当第一个if为null的时候 sql语句照样成立

<br>

**DynamicSQLMapper接口:**  
```java
public interface DynamicSQLMapper {

  // 根据条件查询员工信息
  List<Emp> getEmpByCondition(Emp emp);
}
```

<br>

**测试类:**  
```java
@Test
public void test1() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);

  Emp emp = new Emp(null, "sam", 18, "男");
  List<Emp> emps = mapper.getEmpByCondition(emp);
  System.out.println(emps);
}
```

我们能到看 最终我们拼接的sql为:
```sql
select * from t_emp where emp_name = ? and age = ? and gender = ?
```

<br>

### sql拼接时的问题:
我们看下下面的动态sql
```xml
<select id="getEmpByCondition" resultType="Emp">

  select * from t_emp where

  <if test="empName != null and empName != ''">
    emp_name = #{empName}
  </if>

  <if test="age != null and age != ''">
    and age = #{age}
  </if>

  <if test="gender != null and gender != ''">
    and gender = #{gender}
  </if>
</select>
```

<br>

**情况1: 当第一个if为null的时候, sql会报错**  
当第一个if为null的时候, 它里面的内部不会拼接到sql中, 而后面两个if的条件成立 则sql就会变成下面的样子


```sql
select * from t_emp where and age = ? and gender = ?
```

<br>

**情况2: 当三个if都为null的时候, sql会报错**  
三个if都会null则sql就会以where结尾 所以会报错
```sql
select * from t_emp where
```

<br>

### 解决方式1: 添加一个恒成立条件
我们在 where 后面添加恒成立的条件 1 = 1, 然后三个if里面的sql语句前面都加上and

这样就不用担心下面的if有null的情况了
```xml
<select id="getEmpByCondition" resultType="Emp">

  select * from t_emp where 1 = 1

  <if test="empName != null and empName != ''">
    and emp_name = #{empName}
  </if>

  <if test="age != null and age != ''">
    and age = #{age}
  </if>

  <if test="gender != null and gender != ''">
    and gender = #{gender}
  </if>
</select>
```

<br>

### 解决方式2: 使用 ``<where>`` 标签
它一般会和if标签配合使用, 它会根据if标签的结果 实现相对应的功能

<br>

**``<where>``的作用:**   

**1. 如果该标签内有能成立的条件则自动生成where关键字, 没有则不生成where关键字**  

<br>

**2. 它可以去掉它内部if标签前面的多余的and, 但是标签体后多余的and它不会管**    
比如当姓名为null的时候, 但age成立, 正常理解 会出现 ``select * from t_emp where and age = 20`` 的情况

但实际上它自动去掉了 第二个if前面的and  
``select * from t_emp where age = 20``

```xml
<select id="getEmpByCondition" resultType="Emp">
select * from t_emp
<where>
  <if test="empName != null and empName != ''">
    emp_name = #{empName}
  </if>
  <if test="age != null and age != ''">
    and age = #{age}
  </if>
  <if test="gender != null and gender != ''">
    and gender = #{gender}
  </if>
</where>
</select>
```

<br>

### 解决方式3: 使用 ``<trim>`` 标签
我们结合 ``<where> + <if>`` 的方案下延伸问题

**方式2中使用的方案:**  
```xml
<select id="getEmpByCondition" resultType="Emp">
select * from t_emp
<where>
  <if test="empName != null and empName != ''">
    emp_name = #{empName}
  </if>
  <if test="age != null and age != ''">
    and age = #{age}
  </if>
  <if test="gender != null and gender != ''">
    and gender = #{gender}
  </if>
</where>
</select>
```

<br>

我们上面的写法都是在 if标签体的前面使用 and 用来连接上一条语句

其实我们也可以将and 写在后面 用来连接下一条语句 也是没有问题的

```xml
<select id="getEmpByCondition" resultType="Emp">
select * from t_emp
<where>
  <if test="empName != null and empName != ''">
    emp_name = #{empName} and
  </if>
  <if test="age != null and age != ''">
    age = #{age} and
  </if>
  <if test="gender != null and gender != ''">
    gender = #{gender}
  </if>
</where>
</select>
```

我们都知道 ``<where>`` 可以帮我们将 if标签体前面多余的and去掉

当我们第三个标签如果是null的话, 则sql有会出现最后多出and的情况

```sql
select * from t_emp where emp_name = ? and age = ? and
```

这时候会报错, **where标签并不能帮我们标签体最后多余的and去掉**, 这时我们可以**将 ``<where>`` 替换为 ``<trim>``**  

<br>



**``<trim>``的使用方式:**  
trim是截取的意思 它可以帮我们在它里面的内容的前面或后面 添加或删除指定的内容

<br>

**标签属性有4个:**  

- suffix: 在标签体后面 加上 指定的内容
- suffixOverrides: 在标签体后面 去掉 指定的内容

- prefix: 在标签体前面 加上 指定的内容
- prefixOverrides: 在标签体前面 去掉 指定的内容

<br>

```xml
<select id="getEmpByCondition" resultType="Emp">
select * from t_emp

<!-- 
  我们使用 trim 
    它里面的 if 可以看成一句话

  prefix 我们在这句话的前面 加上 where
  suffixOverrides 我们去掉最后的 and
-->
<trim
  prefix="where"
  suffixOverrides="and"
>
  <if test="empName != null and empName != ''">
    emp_name = #{empName} and
  </if>
  <if test="age != null and age != ''">
    and age = #{age} and
  </if>
  <if test="gender != null and gender != ''">
    and gender = #{gender}
  </if>
</trim>
</select>
```

<br><br>

## 动态sql标签: choose when otherwise
choose父标签 when和otherwise都是它的子标签, 它们相当于 if, else if, else 

**多选一, 当有一个条件成立 后面的都不会进行判断了**  

- ``<choose>``
- ``<when test>``
- ``<otherwise>``

<br>

### 需求:
我们使用 choose when otherwide 修改上面的 3个if的动态sql

**要点:**  
1. ``<when test>`` 可以写多个 它相当于 if else if

2. 我们使用 choose when 的时候是多选一, 也就是说 不管我们写多少个 when, where后面只能加上一个条件 所以when的标签体前面不需要加and

```xml
<select id="getEmpByChoose" resultType="Emp">
select * from t_emp
<where>
  <choose>
    <when test="empName != null and empName != ''">
      emp_name = #{empName}
    </when>
    <when test="age != null and age != ''">
      age = #{age}
    </when>
    <when test="gender != null and gender != ''">
      gender = #{gender}
    </when>

    <otherwise>
      这里除了上述的其他情况 根据需要 没有就不写
    <otherwise>
  </choose>
</where>
</select>
```

<br>

**测试:**  
我们能看到因为是多选一, 虽然我们写了3个when但最后拼接的sql的条件也只有一个

select * from t_emp WHERE emp_name = ?

```java
@Test
public void test2() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);

  Emp emp = new Emp(null, "sam", 18, "男");
  List<Emp> emps = mapper.getEmpByChoose(emp);
  System.out.println(emps);
}
```

<br><br>

## 动态sql标签: foreach
当我们需要做批量操作的时候 我们都会通过 foreach来实现
- 批量添加
- 批量删除

<br>

### 批量添加:
我们添加多个员工的信息, 既然是添加多个员工信息的话 我们添加一个就要用到一个Emp对象, 要是添加多个的话 那Mapper接口中的抽象方法的参数 就应该是 Emp[] 或者 ``List<Emp>``

```java
package com.sam.mybatis.mapper;

public interface DynamicSQLMapper {

  ...

  // 参数: List<Emp> 批量添加员工信息
  void insertMoreEmp(@Param("emps") List<Emp> emps);
}

```

<br>

正常批量添加我们会写如下的sql语句, ()代表添加一条数据, 多个()代表添加多条数据
```sql
insert into t_emp values(), (), ()
```

<br>

而我们上面Mapper接口的抽象方法的参数 emps中 一个员工对象就是一条数据

那是不是我们可以在映射文件中, 循环遍历 emps 拿到每一个emp对象, 放在对应的字段中进行赋值 就是批量添加

<br>

**``<foreach>``的使用方式:**  
- collection: 数据源, 要被遍历的集合或数组
- item: 数组或集合中的一个元素项
- separator: 每一次循环数据之间的分隔符
- index: 当前循环的索引
- open: 当前循环的所有内部为一个整体 这个整体以什么开始(批量删除时有用)
- close: 当前循环的所有内部为一个整体 这个整体以什么结束(批量删除时有用)

```xml
<insert id="insertMoreEmp">
  insert into t_emp values
  <foreach 
    collection="emps" 
    item="emp" 
    separator=",">
    (null, #{emp.empName}, #{emp.age}, #{emp.gender}, null)
  </foreach>
</insert>
```

1. 我们使用 sql标签包裹需要动态的sql语句的部分
2. 我们要循环的部分是一个个的()
3. 每一个()之间要使用,拼接所以使用了 separator选项 (),(),()
4. id 和 dept_id 是null

<br>

**测试:**  
```java
@Test
public void test3() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);

  Emp emp1 = new Emp(null, "小明1", 20, "男");
  Emp emp2 = new Emp(null, "小明2", 20, "男");
  Emp emp3 = new Emp(null, "小明3", 20, "男");

  List<Emp> emps = Arrays.asList(emp1, emp2, emp3);
  mapper.insertMoreEmp(emps);
}

/*
insert into t_emp values (null, ?, ?, ?, null) , (null, ?, ?, ?, null) , (null, ?, ?, ?, null)
*/
```

<br>

### 批量添加的使用场景:
foreach未来使用的特别多, 我们有很多的表关系 一对多 多对多, 特别是多对多

多对多要有一张中间表 中间表里面放着是两张表之间的关系 比如用户 和 角色, 那么中间表中存放的就是用户id和角色id

一个用户对应多个角色

当我们为一个用户分配了多个角色 我们怎么处理?
- 1 - 1
- 1 - 2
- 1 - 3

我们会将id为1的用户对应的角色1 角色2 角色3 这3条数据添加到中间表中

这就是批量添加的使用场景

<br><br>

### 批量删除:
根据id数据数组 批量删除员工信息

**Mapper接口:**  
```java
package com.sam.mybatis.mapper;

public interface DynamicSQLMapper {

  ...

  // 参数 Integer[] 我们根据员工的id批量删除员工的信息
  void deleteMoreEmp(@Param("empIds") Integer[] empIds);
}
```

<br>

**映射文件:**  
我们删除数据的sql有两种方式
- id in (x,x,x)
- id = 1 or id = 2

**第一种方式: in(x,x,x)**  
我们要循环的部分是 x,x,x 不要忘记中间要有分隔符
```xml
<delete id="deleteMoreEmp">
  delete form t_emp where emp_id in
  (
      <foreach collection="empIds" item="empId" separator=",">
          #{empId}
      </foreach>
  )
</delete>
```

<br>

**第二种方式: 使用 open close**  
使用 open close 指明循环部分的开始``(`` 和结束``)``

我们不写() 而是通过 open close 来指明
```xml
<delete id="deleteMoreEmp">
  delete form t_emp where emp_id in
  <foreach 
    collection="empIds" 
    item="empId" 
    separator=","
    open="("
    close=")"
  >
      #{empId}
  </foreach>
</delete>
```

<br>

**第三种方式: id = 1 or id = 2**  
or是关键字, 正常 or 的前后是需要有空格的

但是我们不用关心空格的问题, 因为使用separator的时候前后会自动追加空格

```xml
<delete id="deleteMoreEmp">
  delete from t_emp where
  <foreach 
    collection="empIds" 
    item="empId" 
    separator="or">
      emp_id = #{empId}
  </foreach>
</delete>
```

<br>

**测试:**  
```java
@Test
public void test5() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();

  DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);

  Integer[] ids = {6,7};
  mapper.deleteMoreEmp(ids);
}
```

<br><br>

## 动态sql标签: ``<sql>``

### 作用:
``<sql>``它可以将我们常用的sql片段保存起来, 保存后我们就可以通过``<include>`` 在我们需要使用sql片段的地方引入使用

<br>

### 使用场景:
比如我们在开发中进行查询的操作, select * 这个 * 是不能经常写的, 它传输到mysql里面后 还是会转化为字段名再进行查询的

所以我们可以将表中的每一个字段 一个个的列出来 然后我们用 sql标签记录下 以后可以复用

<br>

### 使用方式:

**``<sql id>``:**  
id属性sql片段的唯一标识, 相当于我们给这个片段起个名字

<br>

**``<include refid />``**  
refid引入哪个sql片段

```xml
<sql id="empColumns">
  emp_id, emp_name, age, gender, dept_id
</sql>

<select 
  id="getEmpByCondition" 
  resultType="Emp"
>
  <!-- 引入sql片段 -->
  select <include refid="empColumns" /> from t_emp
</select>
```

<br><br>

## 动态sql标签: ``<set>``

### 作用:
和 ``<where>`` 标签的作用类似, 都是自动帮助我们生成 set关键字的

``<set>``标签用于更新语句中(update), 它可以去除更新语句中无用的逗号

通常和if标签一起使用

<br>

### 演示:
**Mapper接口:**  
```java
package com.sam.mybatis.mapper;

public interface DynamicSQLMapper {

  ...

  // 修改一个用户信息
  void updateUserById(User user);
}
```

<br>

**映射文件:** 
```xml
<update id="updateUserById" parameterType="user">
  update user
  <set>
    <if test="uid!=null">
      uid=#{uid},
    </if>
    <if test="uname!=null and uname!=''">
        uname=#{uname},
    </if>
    <if test="sex!=null and sex!=''">
        sex=#{sex},
    </if>
    <if test="password!=null and password!=''">
        password=#{password},
    </if>
    <if test="birthday!=null">
        birthday=#{birthday}
    </if>
  </set>
  where uid = #{uid}
</update>
``` 

<br><br>

# MyBatis的缓存
浏览器中有缓存 它会将当前访问页面中的资源保存到本地缓存中 等我们再次访问相同的页面的时候 就会直接走我们保存到本地的资源

而Mybatis中的缓存主要是针对查询功能 它可以将我们当前查询出来的数据进行缓存

等到我们再次查询相同数据的时候 就不会重新从mysql中查询 会直接从缓存中获取

<br>

## MyBatis的缓存的分类:
它分为两种缓存
- 一级缓存
- 二级缓存

<br><br>

## MyBatis: 一级缓存
mybatis中的一级缓存是默认开启的, 我们不做任何操作 只要我们搭建mybatis框架 那一级缓存我们都是可以直接使用的

<br>

### 一级缓存的级别: SqlSession级别
我们通过同一个SqlSession查询出来的数据会被缓存 

当我们再次通过相同的SqlSession查询同一个数据的时候 比如我们查询的都是id为1的数据

这时的数据就会从缓存中直接获取 不会重新访问数据库

<br>

### 演示:
**Mapper接口:**  
```java
public interface CacheMapper {

  // 根据员工id查询员工信息
  Emp getEmpById(@Param("empId") Integer empId);
}
```

<br>

**映射文件:**  
```xml
<select id="getEmpById" resultType="Emp">
  select * from t_emp where emp_id = #{empId}
</select>
```

<br>

**测试类:**  
我们在输出结果中观察sql执行了几次就知道是不是走了缓存

我们可以从结果中看到 我们查询了两次id:1的数据, 可以仅执行了一次sql

说明第二次查询走的就是缓存

也就是说, 当我们通过第一次sql查询数据库后, 就将查询结果放在了SqlSession的缓存中 当第二次查询的时候直接走的缓存

```java
@Test
public void test1() {

  // 同一个SqlSession
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  CacheMapper mapper = sqlSession.getMapper(CacheMapper.class);

  // 根据id:1 查询出来的数据 emp1
  Emp emp1 = mapper.getEmpById(1);
  System.out.println("emp1 = " + emp1);

  // 根据id:1 查询出来的数据 emp2
  Emp emp2 = mapper.getEmpById(1);
  System.out.println("emp2 = " + emp2);

}

/*
仅执行了一次sql
↓
DEBUG 02-09 23:32:04,132 ==>  Preparing: 
  select * from t_emp where emp_id = ?
(BaseJdbcLogger.java:137) 


DEBUG 02-09 23:32:04,184 ==> Parameters: 
  1(Integer) 
(BaseJdbcLogger.java:137)

DEBUG 02-09 23:32:04,221 <==      Total: 1 (BaseJdbcLogger.java:137) 

emp1 = Emp{empId=1, empName='张三', age=20, gender='男'}

emp2 = Emp{empId=1, empName='张三', age=20, gender='男'}
*/
```

<br>

**思考1:**  
比如我们要是再创建一个SqlSession 再查询id:1的用户信息, 第二次的查询会走缓存么?
```java
@Test
public void test1() {

  // 创建 SqlSession1
  SqlSession sqlSession1 = SqlSessionUtils.getSqlSession();
  CacheMapper mapper1 = sqlSession1.getMapper(CacheMapper.class);


  // 创建 SqlSession2
  SqlSession sqlSession2 = SqlSessionUtils.getSqlSession();
  CacheMapper mapper2 = sqlSession2.getMapper(CacheMapper.class);


  // 通过SqlSession1查询 emp1
  Emp emp1 = mapper1.getEmpById(1);
  System.out.println("emp1 = " + emp1);

  // 通过SqlSession2查询 emp2
  Emp emp2 = mapper2.getEmpById(1);
  System.out.println("emp2 = " + emp2);

}
```

我们看结果能发现 执行了两次sql, 也就是说当我们使用不同的SqlSession的时候, 每个SqlSession都有自己的缓存的空间

<br>

### 一级缓存失效的4种情况
有的时候即使我们使用的是同一个SqlSession它也不会走缓存而是从数据库中重新获取

1. 不同的SqlSession对应不同的一级缓存

2. 同一个SqlSession但是查询条件不同

3. 同一个SqlSession两次查询期间执行了任何一次增删改操作, 这时一级缓存就会失效, **任意一次增删改都会清空缓存**  
因为增删改可能会影响我们缓存后的数据 确保数据的正确性 会重新查询数据库

4. 同一个SqlSession两次查询期间手动清空了缓存 **<font color="#C2185B">sqlSession.clearCache()</font>** 调用该api之后会手动清空缓存

如上的4种情况 下一次的查询会从数据库中重新获取

<br><br>

## MyBatis: 二级缓存

### 二级级缓存的级别: SqlSessionFactory级别
二级缓存是SqlSessionFactory级别, 通过同一个SqlSessionFactory创建的SqlSession查询的结果会被缓存

此后若再次执行相同的查询语句 结果就会从缓存中获取

```java
// 获取核心配置文件的输入流
InputStream is = Resources.getResourceAsStream("mybatis-config.xml");


// 获取 SqlSessionFactoryBuilder 对象
SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();


// 获取 SqlSessionFactory 对象
SqlSessionFactory sessionFactory = sqlSessionFactoryBuilder.build(is);


// 获取 SqlSession 对象
sqlSession = sessionFactory.openSession(true);
```

<br>

也就是说我们使用的SqlSession即使不是同一个 但我们只要保证 sessionFactory 是同一个 就可以

```
| - sessionFactory  <- 它是同一个就可以
  | - sqlSession1
  | - sqlSession2
```

<br>

### 二级缓存的开启条件:
二级缓存不像一级缓存那样会默认开启 它是需要我们手动设置的

**1. 在核心配置文件中, 开启二级缓存**  

设置全局配置属性 **<font color="#C2185B">cacheEnabled="true"</font>** 默认为true **不需要手动设置**  

<br>

**2. 在映射文件中设置标签``<cache />``**  

<br>

**3. 二级缓存必须在SqlSession关闭或提交之后有效**  
二级缓存的范围比较大 是SqlSesssionFactory级别的

当我们通过 SqlSession 对象查询了一个sql语句之后, 查询到的结果数据会先被保存到一级缓存中
```java
SqlSession sqlSession1 = sessionFactory.openSession(true);

CacheMapper mapper1 = sqlSession1.getMapper(CacheMapper.class);

Emp emp1 = mapper1.getEmpById(1);
System.out.println("emp1 = " + emp1);
```

也就是 emp1 会缓存到sqlSession1中

<br>

**一级缓存中的数据什么时候会保存到2级缓存中?**  
它会在sqlSession操作完毕后, 操作完毕指的就是如下的两种情况
1. sqlSession被关闭: sqlSession1.close()
2. sqlSession被提交

上面的两种情况后才会表达sqlSession操作完毕, 1级缓存中的数据才会被保存到二级缓存中

**<font color="#C2185B">也就是说只有将sqlSession关闭之后保存在一级缓存中的数据才会被保存到二级缓存中</font>**  

<br>

**4. 查询的数据所转换的实体类类型必须实现序列化的接口**   
也就是说我们的Emp类要进行序列化, 不然就会报
```
NotSerializableException
```

```java
public class Emp implements Serializable {
}
```


<br>

### 测试二级缓存
1. 核心配置文件的开启二级缓存不用设置, 默认开启状态
2. 映射文件中 我们写一个 ``<cache />`` 标签即可
3. 承装数据的实体类要实现Serializable接口: ``implements Serializable`` 

我们测试的时候可以使用不同的sqlSession对象, 但是我们需要保证它们是同一个SqlSesssionFactory提供的即可

**测试类:**  
我们还是看执行了几次sql 我们观察结果发现只执行了一次sql 说明我们的二级缓存OK了 


<br>

**Cache Hit Ratio: 缓存命中率**  
**第二次**查询结果的时候 输出面板中有如下的输出
```
DEBUG 02-10 21:18:00,793:

Cache Hit Ratio [com.sam.mybatis.mapper.CacheMapper]: 0.5 (LoggingCache.java:60) 
```

Cache Hit Ratio是缓存命中率, 它跟我们查询数据的总数量有关系 也要它不是0 说明缓存被命中了

也就是说当前查询的数据在缓存中是有的, 就是通过同一个SqlSessionFactory获取的SqlSession对象 查询到的数据会被缓存

再次通过同一个SqlSessionFactory获取的SqlSession对象查询相同的数据 会从缓存中获取

<br>

```java
@Test
public void test2() throws IOException {

  // 获取核心配置文件的输入流
  InputStream is = Resources.getResourceAsStream("mybatis-config.xml");

  // 获取 SqlSessionFactoryBuilder 对象
  SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();

  // 获取 SqlSessionFactory 对象
  SqlSessionFactory sessionFactory = sqlSessionFactoryBuilder.build(is);


  // 我们通过同一个 sessionFactory 创建两个sqlSession对象
  SqlSession sqlSession1 = sessionFactory.openSession(true);
  SqlSession sqlSession2 = sessionFactory.openSession(true);

  CacheMapper mapper1 = sqlSession1.getMapper(CacheMapper.class);
  CacheMapper mapper2 = sqlSession2.getMapper(CacheMapper.class);

  Emp emp1 = mapper1.getEmpById(1);
  System.out.println("emp1 = " + emp1);
  // 关闭 sqlSession1 这样才会将1级缓存中的数据 保存到2级缓存中
  sqlSession1.close();


  Emp emp2 = mapper2.getEmpById(1);
  System.out.println("emp2 = " + emp2);
  sqlSession2.close();

}
```

<br>

### 二级缓存失效的情况:
两次查询之间执行了任意的增删改 会使一级和二级缓存同时失效

sqlSession.clearCache()只能清空一级缓存

<br>

### 二级缓存的相关配置: ``<cache />``
在映射文件中 我们使用了 ``<cache>`` 标签 它有一些属性可以设置二级缓存

因为它们都有默认值 **所以一般我们不会去配置**  

<br>

**eviction:**   
缓存回收策略, 默认是 LRU

缓存就是将数据保存到内存中, 当我们缓存中有这条数据 我们直接可以从内存中获取

但是内存中没有办法无限的存储数据, 所以需要有缓存回收策略 通过指定的策略对缓存进行回收

- LRU(least recently used): 最近最少使用原则 **移除最长时间不被使用的对象**  

- FIFO(first in first out): 先进先出, 按对象进入缓存的顺序来移除它们

- SOFT 软引用: 移除基于垃圾回收器状态和软引用规则的对象

- WEAK 弱引用: 更积极地移除基于垃圾收集器状态和弱引用规则的对象

<br>

**flushInterval:**  
刷新间隔 单位毫秒

每过指定的时间刷新缓存(清空缓存)

默认情况是不设置, 也就是没有刷新间隔, 缓存仅仅调用语句时刷新缓存(两次查询之间的增删改操作)

<br>

**size:**  
引用数目, 正整数

代表缓存最多可以存储多少个对象, 太大容易导致内存溢出 所以一般我们使用默认值, 太大内存溢出 太小缓存没有意义

<br>

**readOnly:**  
只读 true / false

- true: 只读缓存, 会给所有调用者返回缓存对象的相同实例(缓存的数据直接给用户返回, 所以不能对缓存中的对象进行写的操作), 因此这些对象不能被修改 这提供了很重要的性能优势

- false: 读写缓存, 会返回缓存对象的拷贝(通过序列化) 将拷贝的对象返回给调用者 当我们修改这个拷贝对象的时候 不会对缓存中的对象产生影响, 这会慢一些 但是安全 **因此默认值为false**  

<br>

### MyBatis缓存查询的顺序
先查询二级缓存, 因为二级缓存中可能会有其他程序已经查询出来的数据 可以拿来直接使用

- 如果二级缓存没有命中, 再查询一级缓存
- 如果一级缓存没有命中, 则查询数据库

SqlSession关闭之后, 一级缓存中的数据会写入二级缓存

<br><br>

## MyBatis整合第三方缓存
我们在映射文件中设置 ``<cache type>`` 标签的时候 它有一个type属性 它指的是缓存的类型 

也就是**针对二级缓存**我们有两种选择:
1. 使用MyBatis提供的原生的二级缓存
2. 使用第三方缓存 EHCache

MyBatis的二级缓存可以使用第三方的缓存, 功能和原生的一样 只不过实现上不同

<br>

### EHCache依赖:
ehcache会依赖logback
```xml
<!-- Mybatis EHCache整合包 --> <dependency>
  <groupId>org.mybatis.caches</groupId>
  <artifactId>mybatis-ehcache</artifactId>
  <version>1.2.1</version>
</dependency> 

<!-- slf4j日志门面的一个具体实现 --> <dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.2.3</version>
</dependency>
```

<br>

### 各jar包功能:
|jar包名称|作用|
|:--|:--|
|mybatis-ehcache| Mybatis和EHCache的整合包|
|ehcache|EHCache核心包|
|slf4j-api SLF4J|日志门面包|
|logback-classic|支持SLF4J门面接口的一个具体实现|

<br>

### 创建EHCache的配置文件: ehcache.xml
```xml
<?xml version="1.0" encoding="utf-8" ?>
<ehcache 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
  
  <!-- 缓存的数据保存在磁盘上的路径 -->
  <diskStore path="D:\atguigu\ehcache"/>
  
  <defaultCache
    maxElementsInMemory="1000"
    maxElementsOnDisk="10000000"
    eternal="false" 
    overflowToDisk="true"
    timeToIdleSeconds="120"
    timeToLiveSeconds="120" 
    diskExpiryThreadIntervalSeconds="120"
    memoryStoreEvictionPolicy="LRU"> 
  </defaultCache>

</ehcache>
```

<br>

|属性名|是否必须|作用|
|:--|:--|:--|
|maxElementsInMemory|是|在内存中缓存的element的最大数目|
|maxElementsOnDisk|是|在磁盘上缓存的element的最大数目, 若是0表示无穷大|
|eternal|是|设定缓存的elements是否永远不过期。如果为true, 则缓存的数据始终有效, 如果为false那么还要根据timeToIdleSeconds、timeToLiveSeconds判断|
|overflowToDisk|是|设定当内存缓存溢出的时候是否将过期的element缓存到磁盘上|
|timeToIdleSeconds|否|当缓存在EhCache中的数据前后两次访问的时间超过timeToIdleSeconds的属性取值时, 这些数据便会删除, 默认值是0,也就是可闲置时间无穷大|
|timeToLiveSeconds|否|缓存element的有效生命期, 默认是0 也就是element存活时间无穷大|
|diskSpoolBufferSizeMB|否|DiskStore(磁盘缓存)的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区|
|diskPersistent|否|在VM重启的时候是否启用磁盘保存EhCache中的数据, 默认是false。|
|diskExpiryThreadIntervalSeconds|否|磁盘缓存的清理线程运行间隔, 默认是120秒。每个120s, 相应的线程会进行一次EhCache中数据的清理工作|
|memoryStoreEvictionPolicy|否|当内存缓存达到最大, 有新的element加入的时候,  移除缓存中element的策略。 默认是LRU (最近最少使用), 可选的有LFU (最不常使用)和FIFO (先进先出)|

<br>

### 设置二级缓存的类型
```xml
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
```

<br>

### 加入logback日志: 添加logback的配置文件
存在SLF4J时, 作为简易日志的log4j将失效, 此时我们需要借助SLF4J的具体实现logback来打印日志。 

创建logback的配置文件 **logback.xml**  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="true"> 

  <!-- 指定日志输出的位置 --> 
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder> 
      <!-- 
        日志输出的格式 

        按照顺序分别是： 时间、日志级别、线程名称、打印日志的类、日志主体内容、换行
      --> 
      <pattern>[%d{HH:mm:ss.SSS}] [%-5level] [%thread] [%logger] [%msg]%n</pattern>
    </encoder> 
  </appender> 
  
  <!-- 
    设置全局日志级别。日志级别按顺序分别是：
      DEBUG、INFO、WARN、ERROR

    指定任何一个日志级别都只打印当前级别和后面级别的日志。 
  -->
  <root level="DEBUG"> 
    <!-- 
      指定打印日志的appender, 这里通过“STDOUT”引用了前面配置的appender
    --> 
    <appender-ref ref="STDOUT" />
  </root> 
  
  <!-- 根据特殊需求指定局部日志级别 --> <logger name="写上mapper包名" level="DEBUG"/>
</configuration>
```

<br><br>

# MyBatis的逆向工程:
逆向工程的本质就是代码生成器 它可以帮我们生成相关的代码

有了逆向工程后 我们**只需要先将表创建出来** 然后它就会**自动**根据表帮助我们生成
- Java实体类
- Mapper接口
- Mapper映射文件

<br>

### 正向工程:
先创建Java实体类, 由框架负责根据实体类生成数据库表, Hibernate是支持正向工程的

<br>

### 逆向工程
先创建数据表, 由框架负责根据数据库表 反向生成
- Java实体类
- Mapper接口
- Mapper映射文件

<br><br>

## 创建逆向工程的步骤:

### 1. 创建 Maven工程 

<br>

### 2. pom.xml 配置依赖 
修改 packaging 为 jar, 打包方式为jar包

依赖中有mybatis逆向工程的插件, 该插件又会依赖于mybatis逆向工程的核心jar包和mysql的驱动

<br>

**注意:**  
我们两个位置有mysql驱动
- 当前工程中的mysql的驱动
- 插件中的mysql的驱动

```xml
<!-- 依赖MyBatis核心包 -->
<dependencies>
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.7</version>
  </dependency>

  <!-- junit测试 -->
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
  </dependency>

  <!-- log4j日志 -->
  <dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
  </dependency>

  <!-- Mysql驱动 -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.37</version>
  </dependency>

</dependencies>

<!-- 控制Maven在构建过程中相关配置 -->
<build>

  <!-- 构建过程中用到的插件 -->
  <plugins>

    <!-- 
      MyBatis逆向工程的插件:
        具体插件，逆向工程的操作是以构建过程中插件形式出现的 
    -->
    <plugin>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-maven-plugin</artifactId>
      <version>1.3.0</version>

      <!-- 插件的依赖 -->
      <dependencies>

        <!-- 逆向工程的核心依赖 -->
        <dependency>
          <groupId>org.mybatis.generator</groupId>
          <artifactId>mybatis-generator-core</artifactId>
          <version>1.3.2</version>
        </dependency>

        <!-- MySQL驱动 -->
        <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>5.1.37</version>
        </dependency>

      </dependencies>
    </plugin>
  </plugins>
</build>
```

<br>

### 3. 创建核心配置文件
和逆向功能没有关系 只是我们要测试功能所以需要核心配置文件

<br>

### 4. 创建逆向工程的核心配置文件: generatorConfig.xml

**``<context targetRuntime>``**  
可以选择生成逆向工程的版本
- MyBatis3Simple: 生成基本的CRUD（清新简洁版）

- MyBatis3: 生成带条件的CRUD（奢华尊享版）

主要区别可能是Mapper接口中的方法, **清新简洁版**这样生成的Mapper接口中一共就增删改查的5个方法

```xml
<context 
  id="DB2Tables"
  targetRuntime="MyBatis3Simple">
```

<br>

**``<jdbcConnection>``**  
需要添加链接数据库的信息 只有链接上数据库才能获取数据库表的信息通过它生成相对应的内容

密码没有就不传

```xml
<!-- 数据库的连接信息 -->
<jdbcConnection 
  driverClass="com.mysql.cj.jdbc.Driver"
  connectionURL="jdbc:mysql://localhost:3306/ssm"
  userId="root"
  password="123456">
</jdbcConnection>
```

<br>

**``<javaModelGenerator>``**  
JavaBean的生成策略

- targetPackage: 实体类的包名
- targetProject: 当前要生成到哪个项目中, 生成到当前工程的src下的main下的java

- enableSubPackages: 是否能够使用子包
  - true: 会将.解析为一层层的目录
  - false: 不会解析. 会将一串包名解析为一层目录

- trimStrings: 当前实体类是根据数据表生成的 表中的字段是什么对应实体类中的属性就是什么 所以它会将字段前后的空格去掉来生成相对应的实体类中的属性

```xml
<javaModelGenerator 
  targetPackage="com.atguigu.mybatis.pojo" 
  targetProject=".\src\main\java">
    <property name="enableSubPackages" value="true" />
    <property name="trimStrings" value="true" />
</javaModelGenerator>
```

<br>

**注意:**  
如果我们的表是一对多 或 多对一的时候 逆向工程生成的实体类中并不多体现表与表的关系

逆向工程也就是在我们操作单表的时候给我们提供帮助 如果是一些复杂的sql 或者是多表联查的话 它是做不到的

<br>

**``<sqlMapGenerator>``**  
映射文件的生成策略

- targetPackage: 往哪生成映射文件
- targetProject: 生成到哪个位置
- enableSubPackages: 是否能够使用子包

```xml
<sqlMapGenerator 
  targetPackage="com.atguigu.mybatis.mapper"
  targetProject=".\src\main\resources">
    <property name="enableSubPackages" value="true" />
</sqlMapGenerator>
```

<br>

**``<javaClientGenerator>``**  
Mapper接口的生成策略

```xml
<javaClientGenerator 
  type="XMLMAPPER" 
  targetPackage="com.atguigu.mybatis.mapper"  
  targetProject=".\src\main\java">
  <property name="enableSubPackages" value="true" />
</javaClientGenerator>
```

<br>

**``<table>``**  
我们生成上面的接口 映射文件 实体类等 是根据数据表来创建的 table就指明了根据什么表来创建

逆向分析的表

- tableName: 表名 设置为 * 表示对应所有表 此时不写domainObjectName

- domainObjectName: 实体类的名字

当我们设置了 domainObjectName 的名字后 Mapper接口和映射文件的名字都会根据它来起名

```xml
<!-- 逆向分析的表 -->
<table 
  tableName="t_emp"
  domainObjectName="Emp"/>

<table 
  tableName="t_dept" domainObjectName="Dept"/>
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
  <!--
    targetRuntime: 
      执行生成的逆向工程的版本
                 
    MyBatis3Simple: 
      生成基本的CRUD（清新简洁版）, 这样生成的Mapper接口中一共就增删改查的5个方法

    MyBatis3: 
      生成带条件的CRUD（奢华尊享版）
    -->
  <context 
    id="DB2Tables"
    targetRuntime="MyBatis3Simple">

    <!-- 数据库的连接信息 -->
    <jdbcConnection 
      driverClass="com.mysql.jdbc.Driver"
      connectionURL="jdbc:mysql://localhost:3306/ssm"
      userId="root"
    >
    </jdbcConnection>

      <!-- javaBean的生成策略-->
      <javaModelGenerator 
        targetPackage="com.sam.mybatis.pojo" 
        targetProject="./src/main/java">
          <property name="enableSubPackages" value="true" />
          <property name="trimStrings" value="true" />
      </javaModelGenerator>

      <!-- SQL映射文件的生成策略 -->
      <sqlMapGenerator
        targetPackage="com.sam.mybatis.mapper"  
        targetProject="./src/main/resources">
        <property name="enableSubPackages" value="true" />
      </sqlMapGenerator>

        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator 
          type="XMLMAPPER" 
          targetPackage="com.sam.mybatis.mapper"  
          targetProject="./src/main/java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>

        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="t_emp" domainObjectName="Emp"/>
        <table tableName="t_dept" domainObjectName="Dept"/>
    </context>
</generatorConfiguration>
```

**注意:**  
注意上面的文件路径里面使用的层级分隔符 ``/``
- windows: \
- mac: /

<br>

### 5. Maven选项卡 - 插件 - 创建逆向工程
因为我们是配置了插件 所以我们需要通过插件生成逆向工程的

```
Maven选项卡 
-> 找到我们的Maven工程 
  -> plugins 
    -> 找到 mybaits-generator 选项 
      -> 点击 双击它下面的命令
```

<br>

### 注意:
如果逆向工程要重新生成的话 我们要将上一次的生成的所有文件删除掉 不然会往上一次的文件中追加内容

<br>

### 逆向工程生成的映射文件解析:
它生成的映射文件和我们上面学的东西有些不一样的地方 我们看看

**1. resultMap标签中字段映射的地方多了jdbcType**  

- jdbcType: 指明的当前字段的类型, 它可以不写
```xml
<id column="emp_id" property="empId" jdbcType="INTEGER" />
```

**2. sql语句中的#{}中的内容**  
除了我们的参数外 还多了 jdbcType, 也表示当前字段的类型 也可以不写

<br>

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.sam.mybatis.mapper.EmpMapper" >

  <resultMap id="BaseResultMap" type="com.sam.mybatis.pojo.Emp" >
    <!--
      WARNING - @mbggenerated
      This element is automatically generated by MyBatis Generator, do not modify.
      This element was generated on Fri Feb 10 23:50:59 JST 2023.
    -->
    <id column="emp_id" property="empId" jdbcType="INTEGER" />
    <result column="emp_name" property="empName" jdbcType="VARCHAR" />
    <result column="age" property="age" jdbcType="INTEGER" />
    <result column="gender" property="gender" jdbcType="CHAR" />
    <result column="dept_id" property="deptId" jdbcType="INTEGER" />
  </resultMap>
  <delete id="deleteByPrimaryKey" parameterType="java.lang.Integer" >
    <!--
      WARNING - @mbggenerated
      This element is automatically generated by MyBatis Generator, do not modify.
      This element was generated on Fri Feb 10 23:50:59 JST 2023.
    -->
    delete from t_emp
    where emp_id = #{empId,jdbcType=INTEGER}
  </delete>
  <insert id="insert" parameterType="com.sam.mybatis.pojo.Emp" >
    <!--
      WARNING - @mbggenerated
      This element is automatically generated by MyBatis Generator, do not modify.
      This element was generated on Fri Feb 10 23:50:59 JST 2023.
    -->
    insert into t_emp (emp_id, emp_name, age, 
      gender, dept_id)
    values (#{empId,jdbcType=INTEGER}, #{empName,jdbcType=VARCHAR}, #{age,jdbcType=INTEGER}, 
      #{gender,jdbcType=CHAR}, #{deptId,jdbcType=INTEGER})
  </insert>
  <update id="updateByPrimaryKey" parameterType="com.sam.mybatis.pojo.Emp" >
    <!--
      WARNING - @mbggenerated
      This element is automatically generated by MyBatis Generator, do not modify.
      This element was generated on Fri Feb 10 23:50:59 JST 2023.
    -->
    update t_emp
    set emp_name = #{empName,jdbcType=VARCHAR},
      age = #{age,jdbcType=INTEGER},
      gender = #{gender,jdbcType=CHAR},
      dept_id = #{deptId,jdbcType=INTEGER}
    where emp_id = #{empId,jdbcType=INTEGER}
  </update>
  <select id="selectByPrimaryKey" resultMap="BaseResultMap" parameterType="java.lang.Integer" >
    <!--
      WARNING - @mbggenerated
      This element is automatically generated by MyBatis Generator, do not modify.
      This element was generated on Fri Feb 10 23:50:59 JST 2023.
    -->
    select emp_id, emp_name, age, gender, dept_id
    from t_emp
    where emp_id = #{empId,jdbcType=INTEGER}
  </select>
  <select id="selectAll" resultMap="BaseResultMap" >
    <!--
      WARNING - @mbggenerated
      This element is automatically generated by MyBatis Generator, do not modify.
      This element was generated on Fri Feb 10 23:50:59 JST 2023.
    -->
    select emp_id, emp_name, age, gender, dept_id
    from t_emp
  </select>
</mapper>
```

<br><br>

## MyBatis: 逆向工程之奢华尊享版
我们将 generatorConfig.xml 中的 targetRuntime 修改为 MyBatis3
```xml
<context 
  id="DB2Tables"
  targetRuntime="MyBatis3">
```

<br>

### 奢华尊享版:
它生成的是带条件的crud, 它能帮我们实现各种功能

我们对单表的所有操作 都可以通过奢华尊享版来实现, 当我们使用了 奢华尊享版 的逆向工程的话 它帮我们实现了对单表的所有操作

<br>

**注意:**  
它是覆盖了针对单表的所有操作, 如果是多表我们还是要自己写表关系 自己实现sql语句

<br>

### POJO中的区别:
奢华尊享版给我们生成了
- Emp
- EmpExample
- Dept
- DeptExample

<br>

**EmpExample类:**  
它是一个条件类 逆向工程的奢华尊享版会在Mapper接口中定义 带条件查询的方法

比如: 根据条件来查询 注意参数 EmpExample
```java
List<Emp> selectByExample(EmpExample example);
```

也就是说我们调用带条件查询的方法 需要传入一个 条件对象 EmpExample

<br>

**条件对象的作用:**  
我们查询数据库一般都会传入条件 比如
- 根据id
- 根据姓名
- 根据范围 等等

但一般我们创建的查询数据库的方法不会那么全面 一般只有根据id查询 

但是EmpExample类中为我们提供了很多丰富的条件 和 方法

<br>

**使用方式:**  
首先创建条件对象
```java
EmpExample example = new EmpExample();
```

然后调用 createCriteria() 方法创建条件 链式调用方法选择具体的条件

<br>

**1. 具体的条件的方法 都是and开头, 表示在sql后面拼接条件**  

<br>

**2. 每一个字段都有对应的方法 我们只需要输入 andEmpName 就能看到后续的方法提示**  

<br>

**3. 条件方法的含义:**  

**and:**  
and系列的方法 就是 关键字 and 的意思, 作为条件的拼接

- andEmpName Like(String val): 模糊查询

- andEmpName EqualTo(String val): 等于

- andEmpName Between(String val1, String val2): 范围 在 val1 ~ val2 之间

- andEmpName GreaterThan(String val): 大于

- andEmpName GreaterThanOrEqualsTo(String val): 大于等于

- andEmpName In(``List<String>`` vals): in (x, x)

- andEmpName IsNotNull(): 不为空

- andEmpName IsNull(): 为空

- andEmpName LessThan(String val): 小于

- andEmpName LessThanOrEqualsTo(String val): 小于等于

- andEmpName NotBetween(String val1, String val2): 不在 val ~ val2 之间

- andEmpName NotEqualTo(String val): 不等于

- andEmpName NotIn(``List<String>`` vals): not in (x, x)

- andEmpName NotLike(String val)

<br>

**and 多个条件:**  
链式调用继续点方法, 姓名是sam 年龄大于20
```java
example.createCriteria().andEmpNameEqualTo("sam").andAgeGreaterThan(String val);
```

它会在sql上拼接 ``where emp_name = ? and age > ?``

<br>

**or:**  
or就是sql中的or的意思 用于拼接条件时 条件 之间使用 or 来连接

**方式:**    
先调用 or()方法 表示使用or关键字链接, 再调用and系列方法 连接条件

**举例:**  
条件为姓名是张三或者李四
```java
example.createCriteria().andEmpNameEqualTo("张三")

// 调用 or() 方法 表示使用or关键字拼接 继续调用and系列方法表示继续拼接条件
example.or().andEmpNameEqualTo("李四")
```

```sql
select emp_id, emp_name, age, gender, dept_id 
from t_emp 
WHERE ( emp_name = ? ) or ( emp_name = ? )
```

<br>

**示例:**  
根据姓名查询

```java
// 创建条件对象
EmpExample example = new EmpExample();

// 指明具体的条件: empName字段 = sam
example.createCriteria().andEmpNameEqualTo("sam");

// 调用Mapper接口中的条件方法, 传入条件对象
List<Emp> emps1 = mapper.selectByExample(example);

System.out.println(emps1);
```

<br>

### EmpMapper的区别:
该接口中包含了我们对单表的所有操作

ByExample 就是 通过条件 的意思

```java
package com.sam.mybatis.mapper;

import com.sam.mybatis.pojo.Emp;
import com.sam.mybatis.pojo.EmpExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface EmpMapper {
  // 通过条件获取总记录数
  int countByExample(EmpExample example);

  // 根据条件进行删除 (任意条件)
  int deleteByExample(EmpExample example);

  // 根据主键删除 (只能根据empId进行删除)
  int deleteByPrimaryKey(Integer empId);

  /*
    添加

    如果Emp中有属性为null, 那么对应字段的值也会被赋值为null
  */
  // 
  int insert(Emp record);

  /*
    选择性添加

    如果Emp中有属性为null, 它就不会为对应的字段进行赋值

    mysql中有默认值约束 如果我们使用的是这种方式添加数据, 那么我们不会为emp_name赋值为null, 这样emp_name就可以使用mysql中定义的默认值

    而上面的 普通添加的方式, 不会管默认值的问题 也就是会覆盖mysql中的默认值
  */
  int insertSelective(Emp record);

  // 根据条件查询
  List<Emp> selectByExample(EmpExample example);

  // 根据主键查询
  Emp selectByPrimaryKey(Integer empId);


  /*
    根据条件 选择性修改

    如果Emp对象中的某一个属性为null, 它并不会修改它所对应的字段
  */
  int updateByExampleSelective(@Param("record") Emp record, @Param("example") EmpExample example);


  /*
    根据条件进行修改: 普通修改

    如果Emp对象中的某一个属性为null, 那它会将它对应的字段修改为null
  */
  int updateByExample(@Param("record") Emp record, @Param("example") EmpExample example);

  // 根据主键选择性修改
  int updateByPrimaryKeySelective(Emp record);

  // 根据主键修改
  int updateByPrimaryKey(Emp record);
}
```

<br>

### 测试类

**查询测试:**  
```java
@Test
public void test1() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);


  // 根据主键查询
  Emp emp = mapper.selectByPrimaryKey(1);
  System.out.println("emp = " + emp);


  // 查询所有数据
  // 我们选择根据条件查询: 传入null
  List<Emp> emps = mapper.selectByExample(null);
  emps.forEach(System.out::println);


  // 根据某个条件查询: 参数 Emp example 对象
  // 1. 创建条件对象
  EmpExample example = new EmpExample();
  // 2. 指明具体的条件
  example.createCriteria().andEmpNameEqualTo("sam");
  // 3. 调用接口中的根据条件查询的方法 传入条件对象
  List<Emp> emps1 = mapper.selectByExample(example);
  // 查看结果
  System.out.println(emps1);



  // 查询条件 姓名为张三 或者 李四的员工信息
  EmpExample example2 = new EmpExample();
  example2.createCriteria().andEmpNameEqualTo("张三");
  example2.or().andEmpNameEqualTo("李四");

  List<Emp> emps2 = mapper.selectByExample(example2);
  System.out.println(emps2);
}
```

<br>

**修改测试:**  
```java
@Test
public void test2() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);

  /*
    普通修改: 传入Emp对象

    我们修改id为1的, 注意年龄为null, 它会将对应的字段的值赋值为null, 本来id为1的员工年龄是有值的
    所以数据库中小黑的年龄变成null了
  */
  Emp emp = new Emp(1, "小黑", null, "女");
  mapper.updateByPrimaryKey(emp);
}
```

```java
@Test
public void test3() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);

  /*
    选择性修改:

    我们修改id为1的, 注意年龄为null, 它不会修改age字段的值
  */
  Emp emp = new Emp(1, "张三", null, "女");
  mapper.updateByPrimaryKeySelective(emp);
}
```

<br><br>

# 分页插件

## 回顾分页
分页功能会涉及到两个方面
1. 在sql语句中使用 select limit 实现分页的功能 
2. 需要在页面上设置跟分页相关的超链接, 首页 末页 上一页 中间页码 下一页等

要实现页面的分页功能的话 非常的麻烦 因为我们要获取很多跟分页相关的数据 

但是我们使用分页插件的话 它就把当前需要的数据 全部都给我们封装好了

我们只需要获取相对应的对象 这个对象中封装的就是我们 首页 末页 上一页 中间页码 下一页 等需要用到的数据

<br><br>

## 分页功能分析
不用插件的实现分析

<br>

### sql角度:
sql的部分我们要加上 ``limit index, pageSize`` 
- index: 当前页的起始索引
- pageNum: 当前页的页码, 当前访问第几页
- pageSize: 每页显示的条数
- count: 总记录数
- totalPage: 总页数 = count / pageSize
```java
totalPage = count / pageSize
if(count % pageSize != 0) totalPage++
```

pageSize一般都是固定的, pageNum是前台传递过来的

也就是说pageNum pageSize是已知条件, 我们需要求的就是index

但是index都不是固定的, 它跟前台页面访问的页码有关

- 访问第一页: index - 0
- 访问第五页: (pageNum - 1) * pageSize

<br>

### 页面部分
页面部分才是分页的难点, 因为我们要设置各种超连接 给用户访问对应的页面

```html
<a>首页 上一页 2 3 4 5 6 下一页 末页</a>
```

上面的部分我们需要各种判断 判断什么时候展示首页 上一页等

同时导航分页的部分也需要判断 这个部分看看JavaWeb部分 一样的

<br>

当我们使用分页插件的时候, pageNum 和 pageSize是前端传送过来的动态数据

而如下的数据 分页插件都帮我们计算好了
- index
- count 
- totalPage
- 导航页码

我们使用了分页插件后 我们的分页功能就会变的特别简单


<br><br>

### 分页插件依赖
```xml
<dependency>
  <groupId>com.github.pagehelper</groupId>
  <artifactId>pagehelper</artifactId>
  <version>5.2.0</version>
</dependency>
```

<br>

### 分页插件配置
我们要在 mybatis 的核心配置文件中的 ``<plugins>`` 里面进行配置插件

它在 ``<environments>`` 标签的上面

```xml
<plugins>
  <!--配置分页插件-->
  <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>

<environments> ... </environments>
```

<br>

**interceptor:**  
拦截器, 写拦截器的全类名

```
拦截器的全类名获取方式:

查询功能 
  - classes 选项卡
    - 输入 pageinterceptor
      - 找到 类名
        - 右键 copy reference
```

当我们实现查询功能的时候 分页插件会自动拦截查询功能 在查询功能中 获取参数 加入limit关键字, 并且它也会帮我们将分页相关的数据获取到

<br>

### 分页插件的使用方式:
我们上面进行了分页插件的配置 下面我们看看分页插件是如何使用的

1. 我们要在查询功能前 调用方法开启分页功能
2. 使用page对象获取封装在它内部的查询结果

<br>

### **<font color="#C2185B">PageHelper.startPage(pageNum, pageSize)</font>**  
开启分页功能

**参数:**  
- pageNum: 当前页码
- pageSize: 每页显示的记录条数

<br>

**返回值:**  
Page, Page继承了ArrayList Page对象本身也是一个集合

我们在查询语句执行后输出Page对象 **它的内部属性有**  
- pages: 总页数 (相当于totalPage)
- total: 总记录数

```java
Page{
  count=true,
  pageNum=1,
  pageSize=4,
  startRow=0,
  endRow=4,
  total=20, // 总记录数
  pages=5,  // 总页数
  reasonable=false,
  pageSizeZero=false
}
[
  Emp{empId=1, empName='小明1', age=18, gender='男', deptId=null},
  Emp{empId=2, empName='小明2', age=18, gender='男', deptId=null},
  Emp{empId=3, empName='小明3', age=18, gender='男', deptId=null},
  Emp{empId=4, empName='小明4', age=18, gender='男', deptId=null}
]
```

我们可以 **通过page对象身上的get set方法获取它内部封装的数据**  

<br>

**<font color="#C2185B">page.getResult()</font>**  
获取page对象中封装的查询出来的数据

**返回值:**  
``List<Emp>`` 

注意: 我们直接遍历 page对象也可以 page对象本质就是集合它里面封装了我们查询的数据

<br>

**示例:**  
```java
@Test
public void test2() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);

  // 开启分页功能
  Page<Emp> page = PageHelper.startPage(1, 5);

  // 查询所有记录, 这里也可以创建返回值接收, 也可以不创建查询的数据会封装到page对象里面
  mapper.selectByExample(null);


  // 获取数据方式1: 直接遍历page对象
  page.forEach(System.out::println);

  // 获取数据方式2: 调用getResult()返回集合, 该emps其实也是page对象
  List<Emp> emps = page.getResult();
  System.out.println(emps);

}
```

<br>

### 更多的分页信息:
我们可以在执行查询操作后 ``mapper.selectByExample(null);`` 创建 PageInfo 对象, 它内部封装了更多的属性 包括导航分页页码相关(1 2 3 4 5)

<br>

### **<font color="#C2185B">new PageInfo(List list, int navigatePages)</font>**  
里面有分页插件提供的完成内容

**参数:**  
1. list: 查询语句返回的list集合
2. navigatePages: 导航分页页码的显示个数, 比如我们传入5 它就会在导航分页处展示5个页码 以 当前页-2 开始 ~ 当前页+2 结束

<br>

**返回值:**  
``PageInfo<Emp>`` pageInfo 我们可以指明泛型

**我们可以通过它内部提供的get set方法, 获取对应的属性**  

<br>

pageInfo中包含的数据:
```java
PageInfo{
  pageNum=1, pageSize=5, 

  // 当前页展示的真实数据 比如最后一页的真实数据可能是2条
  size=5, 

  startRow=1, endRow=5, 

  // 总记录数
  total=20, 

  // 总页数
  pages=4, 

  // 上一页下一页的页码
  prePage=0, nextPage=2, 

  // 是否是第一页 和 最后一页
  isFirstPage=true, isLastPage=false, 

  // 是否有上一页 和 下一页
  hasPreviousPage=false, hasNextPage=true,

  // 有几个导航分页页码
  navigatePages=5, 
  // 导航分页页码开始页码 和 结束页码
  navigateFirstPage=1, navigateLastPage=4, 

  // 导航分页的数组
  navigatepageNums=[1, 2, 3, 4]
  
  list=Page{
    count=true, 
    pageNum=1, pageSize=5, 
    startRow=0, endRow=5, 
    total=20, 
    pages=4, 
    reasonable=false, 
    pageSizeZero=false
  }
  
  [
    Emp{empId=1, empName='小明1', age=18, gender='男', deptId=null}, 
    Emp{empId=2, empName='小明2', age=18, gender='男', deptId=null}, 
    Emp{empId=3, empName='小明3', age=18, gender='男', deptId=null}, 
    Emp{empId=4, empName='小明4', age=18, gender='男', deptId=null}, 
    Emp{empId=5, empName='小明5', age=18, gender='男', deptId=null}
  ]
}
```

<br>

**<font color="#C2185B">pageInfo.getList()</font>**  
获取pageInfo中封装的查询数据

**返回值:**  
``List<Emp>`` emps集合, 它也是Page对象, 我们遍历它就能拿到数据

<br>

**<font color="#C2185B">pageInfo.getNavigatepageNums()</font>**  
获取pageInfo内部封装的 导航分页页码的数组

**返回值:**  
int[]

<br>

**示例:**  
```java
@Test
public void test2() {
  SqlSession sqlSession = SqlSessionUtils.getSqlSession();
  EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);

  // 开启分页功能: 当前页码为第一页 每页显示5条数据
  Page<Emp> page = PageHelper.startPage(1, 5);

  // 查询所有记录
  List<Emp> emps = mapper.selectByExample(null);
  // 创建PageInfo, 传入emps, 和 导航分页显示数量5个 也就是 1 2 3 4 5
  PageInfo<Emp> pageInfo = new PageInfo<>(emps, 5);

  System.out.println("pageInfo = " + pageInfo);

  List<Emp> list = pageInfo.getList();
  int[] nums = pageInfo.getNavigatepageNums();
}
```

