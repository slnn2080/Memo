# JDBC概述

### 数据的持久化
以前我们说的对象 数组 集合等存储数据的结构都是内存层面的 不能达到数据的持久化

数据持久化的方式：
1. 文件:
我们在java基础的部分 可以通过io来将数据写到一个真实的文件里面 
这也是数据持久化的一种
``` 
  简洁的几个小数据 我们用文件也是ok的
```

2. 数据库

<br><br>

### Java中的数据存储技术
在Java中，数据库存取技术可分为如下几类：
1. **JDBC**直接访问数据库
2. JDO (Java Data Object )技术

3. **第三方O/R工具**，如Hibernate, Mybatis 等

*JDBC是java访问数据库的基石*，JDO、Hibernate、MyBatis等只是更好的封装了JDBC。

<br><br>

### JDBC介绍
jdbc不是跟某一个具体的数据库深度耦合的 或者说jdbc不是用来专门操作某个数据库的

jdbc是通用的操作数据库的接口 是一种规范 如何使用java程序操作数据库的规范


如果没有JDBC 那么java程序访问数据库是这样的
``` 
              Java程序
      ↗     ↗     ↖       ↖
  Mysql  Oracle  SQLServer  DB2


  // 这样也行 但是可移植性差
  mysql插入一条数据库: 命令是 add
  Oracle插入一条数据库: 命令是 insert
  ...

  一样的目的 但是每个数据库的类型不一样命令细节等却不一样 这时候我们用java程序去操作一个具体的数据库是很痛苦的一件事情 最起码 你要知道所有数据库的基本语法
```

为了能进行统一 或者让程序员在操作数据库的时候 有一个统一的规范 
定义了一套规范 这套规范就指出要想用java程序操作数据库 进行了统一

有了jdbc java程序访问数据库时是这样的
``` 
              Java程序

                ↓   调用

               JDBC   ← 一组规范: 接口

      ↗     ↗     ↖       ↖

   驱动    驱动       驱动    驱动   ← JDBCImpl

    ↓       ↓         ↓      ↓

  Mysql  Oracle  SQLServer  DB2
```

jdbc是接口 接口中定义了规范

驱动:
但对于不同的数据库厂商来讲 比如要是想通过调用jdbc中的add()方法 实现添加数据的操作 那么肯定要提供一个有方法体的add()

驱动就是各个数据库厂商来编写的 jdbc是标准 然后各个厂商根据这个标准(接口) 厂商去提供各个接口的实现类 实现类中需要将接口中的抽象方法进行重写 这套实现类的集合封装在一起 就是各个厂商的驱动

JDBC是sun公司提供一套用于数据库操作的接口，java程序员只需要*面向*这套*接口编程*即可。

不同的数据库厂商，需要针对这套接口，提供不同实现。
*不同的实现的集合，即为不同数据库的驱动*

<br><br>

### JDBC介绍程序的编写步骤
1. 导入 java.sql 包
``` 
  导包的目的 将jdbc的接口标准导进来
```
          ↓

1.1 JDBC-ODBC桥方式(建立数据源ODBC)  或
``` 
  sql server 
  ODBC是微软提供的一套操作不同数据库的一套api

  微软的逻辑是 java - jdbc - odbc - 各个数据库
```

1.2 纯JAVA驱动方式  (附加相应产商提供的驱动)
``` 
  mysql oracle 
  我们直接把mysql驱动也就是厂商写的jdbc接口的实现类的集合加载进来
```

          ↓

2. 加载并注册驱动程序

          ↓

3. 创建 Connection 对象
``` 
  我们想想 在我们使用客户端(navicate)的时候 我们要操作数据 需要先使用客户端(navicate)去连接数据库 比如

  用户名: root
  密码: xxx
  端口: 3306

  连接  取消  测试连接

  现在我们不是用客户端(navicate) 我们要用java程序 所以我们要先获取 Connection 对象 也就是java层面 先获取对数据库的连接

  怎么叫连接上了 就是我拿到了一个连接对象 这个对象是非空的就表示我获取到了连接 拿到连接后对数据表进行增删改查的操作
```

          ↓

4. 创建 Statement 对象 
Statement对象用于对 数据表进行增删改查的操作 它帮我们操作数据库去做增删改查

          ↓

5. 执行 Sql 语句

          ↓

分支1: 查询情况: 使用 ResultSet 对象
``` 
  查询 跟 增删改 的区别就是涉及到是否有结果集的问题 
  我们在学数据库的时候 当我们查询完后都会有一个结果

  mysql中的结果集在java层面 就是ResultSet对象
```

          ↓

关闭 ResultSet 对象

<br><br>

分支2: 更新情况(增删改): 通过 Statement对象执行sql完成
``` 
  更新情况不需要结果集 所以不涉及到 操作 ResultSet 对象
```

          ↓

6. 关闭 Statement 对象
          ↓
7. 关闭 Connection 对象
          ↓
8. 结束

<br><br>

# 获取数据库连接的 方式1:
java.sql下提供的接口 我们使用这个接口来获取连接 接口叫 Driver

  | - jdbc_test
    | - com.sam.connection
      - ConnectionTest

既然 Driver 是接口 那么我们就要使用 Driver接口的实现类对象
Driver接口是son公司定义的 我们要提供Driver接口的实现类对象 这个实现类对象 是各个厂商(mysql db2等)根据Driver接口自己开发的实现类 这些实现类的集合也叫做驱动

### 对应厂商驱动的安装
1. 要下载对应的数据库驱动 比如我们使用的mysql8 那么我们就要下载mysql8的驱动 使用的mysql5 那么我们就要下载mysql5的驱动

下载驱动完成后(就是一个jar包)
1. 在工程下(module)创建一个lib文件夹 跟src同级
2. 然后把下载好的jar包放入 lib文件夹下 并 add as lib ...

**注意:**
mysql 5
mysql 8
这两种驱动 创建Driver接口的实现类对象也不一样
com.mysql.jdbc.Driver驱动是 mysql-connector-java *5* 中的
com.mysql.cj.jdbc.Driver驱动是 mysql-connector-java *8* 中的

```java
// mysql 5
Driver driver = new new com.mysql.jdbc.Driver();

// mysql 8
Driver driver = new new com.mysql.cj.jdbc.Driver();
```

同时 我们在配置文件中 driverClassName 也不一样
```js
// mysql5
driverClassName=com.mysql.jdbc.Driver

// mysql8
driverClassName=com.mysql.cj.jdbc.Driver
```


### 具体 方式1 的使用步骤
1. 提供 Driver 的具体实现类对象
```java
// mysql8
Driver driver = new com.mysql.cj.jdbc.Driver();
```

2. 调用 driver 对象的 connect(String url, Properites info) 方法获取连接

### driver.connection(String url, Properites info)
用过获取连接

异常:
SQLException

### 参数:
### String url:

url是统一资源定位符 用于定位互联网上的一个资源 我们要定位的就是要连接哪个数据库
类似我们在通过客户端登录的时候 会输入哪个主机地址下的 哪个端口下的 哪个数据库名
现在就是要通过url告诉我们要连哪个数据库 就像我们输入百度地址 看百度哪个页面是一样的
jdbc url用于表示一个被注册的驱动程序 驱动程序管理器通过这个url选择正确的驱动程序 从而建立到数据库连接


url的书写规则:

  jdbc:mysql://主机名称:mysql服务端口号/数据库名称?参数=值&参数=值

JDBC URL的标准由3个部分组成 各个部分间用冒号分隔


### jdbc:子协议:子名称
1. 协议: jdbc url中的协议总是jdbc
2. 子协议: 子协议用于标识一个数据库驱动程序
3. 子名称: 一种标识数据库的方法 子名称可以依不同的子协议而变化 用子名称的目的就是为了定位数据库提供足够的信息 

包含 主机名(对应服务端的ip地址) 端口号 数据库名

示例: jdbc:mysql://localhost:3306/test数据库名


几种常用数据库的 jdbc url 
jdbc:mysql://主机名称:mysql服务端口号/数据库名称?参数=值&参数=值

jdbc:mysql://localhost:3306/atguigu
jdbc:mysql://localhost:3306/atguigu?useUnicode=true&characterEncoding=utf8（如果JDBC程序与服务器端的字符集不一致，会导致乱码，那么可以通过参数指定服务器端的字符集）

jdbc:mysql://localhost:3306/atguigu?user=root&password=123456


### url参数的部分
useUnicode=true
characterEncoding=utf8
如果JDBC程序与服务器端的字符集不一致，会导致乱码，那么可以通过参数指定服务器端的字符集

时区的概念:
serverTimezone=UTC

UTC是国际时，UTC+8就是国际时加八小时，是东八区时间，是北京时间
在设定时区的时候，如果设定serverTimezone=UTC，会比中国时间早8个小时，如果在中国，可以选择
    中国:
    Asia/Shanghai
    Asia/Hongkon

    日本:
    Asia/Tokyo

北京时间==东八区时间！=北京当地时间
  serverTimezone=GMT%2B8
  serverTimezone=GMT%2B9  -- 是不是也是东京


### Properties info
Properties 里面是key=value型 要包含用户名和密码
将用户名和密码封装在Properties中
```java
Properties info = new Properties();
info.setProperty("user", "root");
info.setProperty("password", "qwer6666");
```

**注意:**
用户名就是固定的 user
密码就是固定的 password


### 方式1: 完整代码
```java
import org.junit.Test;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.SQLException;
import java.util.Properties;

@Test
  public void testConnection1() throws SQLException {
    
    // 提供实现类对象
    Driver driver = new com.mysql.cj.jdbc.Driver();

    // 参数整理
    String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";

    // 将用户名和密码封装在Properties中
    Properties info = new Properties();
    // 固定就是 user 和 password 作为key
    info.setProperty("user", "root");
    info.setProperty("password", "qwer6666");

    // 调用 driver对象的方法
    Connection connection = driver.connect(url, info);
    System.out.println(connection);
  }
```

<br><br>

# 获取数据库连接的 方式2:
这里面的几种方式 是依次递进的关系
方式2是对方式1的一个迭代 为什么要迭代？
我们写的java程序是面向接口编程的 我们希望有更好的可移植性 那就期望在代码中不要出现第三方的api

比如上面的代码中 我们 new com.mysql.cj.jdbc.Driver() 就是第三方的
这是我们不想看到的 我们期望我们的代码有更好的可移植性 比如我们想切换到Oracle最好能很顺畅的切换过去

那怎么获取mysql的Driver接口的实现类对象呢？ 反射 
利用反射我们就可以很好的对这部分代码包装起来 实现动态的获取(反射能体现出动态性)

### 代码部分:
跟方式1比较起来就是在获取 Driver接口的实现类 的时候用到反射了
使得我们获取连接的方式更具有通用性 代码里面都是sun公司提供的api这样可移植性就会高

```java
@Test
public void testConnection2() throws Exception {

  // 获取 Driver 接口的实现类对象 利用反射
  // 获取com.mysql.cj.jdbc.Driver的Class实例
  Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");

  // newInstance()要想调用成功必须要具有空参构造器 权限也要够 得到的是Object类型 然后进行强转
  Driver driver = (Driver)clazz.newInstance();

  // 提供要连接的数据库
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";

  // 提供连接需要的用户名和密码
  Properties info = new Properties();
  info.setProperty("user", "root");
  info.setProperty("password", "qwer6666");

  // 获取连接
  Connection connection = driver.connect(url, info);
  System.out.println(connection);
}
```

<br><br>

# 获取数据库连接的 方式3:
使用 *DriverManager 替换 Driver*
java.sql.DriverManager
``` 
  DriverManager是son公司提供的具体的类 不是一个接口
```

我们获取连接的操作 *更习惯使用 DriverManager 才操作*

### 具体步骤:
1. 利用反射 获取 实现类对象
```java
  Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");
  Driver driver = (Driver)clazz.newInstance();
```


2. 注册驱动
### DriverManager.registerDriver(Driver driver)
```java
DriverManager.registerDriver(driver);

// driver就是上面获取的实现类对象
```

3. 提供连接数据库所需的基本信息
```java
String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
String user = "root";
String password = "qwer6666";
```

4. 获取数据库连接
### DriverManager.getConnection(String url)
### DriverManager.getConnection(String url, Properties info)
### DriverManager.getConnection(String url, String user, String password)
上面的三个方法都是用来 获取连接 我们*使用第3个*
```java
Connection connection = DriverManager.getConnection(url, user, password);
```


### 完整代码
```java
@Test
public void testConnection3() throws Exception {

  // 1. 获取 Driver 实现类对象
  Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");
  Driver driver = (Driver)clazz.newInstance();

  // 2. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";

  // 3. 注册驱动
  DriverManager.registerDriver(driver);

  // 4. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```

<br><br>

# 获取数据库连接的 方式4:
它是在3的基础上做的优化
可以只是通过反射加载驱动不用显示的去注册驱动

```java
@Test
public void testConnection4() throws Exception {
  // 1. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";


  // 2. 获取 Driver 实现类对象
  Class.forName("com.mysql.cj.jdbc.Driver");
  // 相较于方式3 可以省略如下的操作
  /*
    Driver driver = (Driver)clazz.newInstance();
    DriverManager.registerDriver(driver);
  */

  // 3. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```

我们发现上面的代码 没有创建变量clazz 然后通过clazz创建实例对象 得到driver 也没有调用DriverManager.registerDriver()方法 注册驱动

但是也可以 为什么不用注册驱动呢？  

Class.forName("com.mysql.cj.jdbc.Driver");
这行代码 相当于把 Driver 加载到内存中了 我们观察了下 Driver 类的源码发现 该类中有下面的静态代码块
```java
static {
  try {
    java.sql.DriverManager.registerDriver(new Driver())
  } catch(SQLException E) {
    throw new RuntimeException("Can't register driver!")
  }
}
```

我们回想下静态代码块什么时候执行 随着类的加载而执行 而
Class.forName("com.mysql.cj.jdbc.Driver"); 这就是类的加载 一加载就会执行静态代码块中的逻辑 自动注册驱动了


### 静态注释后的代码 -- 标准模板
```java
public void testConnection4() throws Exception {
  // 1. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";

  // 2. 获取 Driver 实现类对象
  Class.forName("com.mysql.cj.jdbc.Driver");

  // 3. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```


### 扩展: -- 了解就可以
然后 我们发现 我们还可以省略这行代码
Class.forName("com.mysql.cj.jdbc.Driver");

就是加载也不用了 代码就变成 直接通过DriverManager 调用获取连接的方法 getConnection() 也可以
```java
public void testConnection4() throws Exception {
  // 1. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";

  // 2. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```

因为我们将 mysql 驱动加载到类路径 add as lib 后 自动帮我们加载该类了 所以可以省 但是 ...

不要省略 因为 mysql 好用 别的数据库并不好用

<br><br>

# 获取数据库连接的 方式5:  (最终版)
我们上面的方式中 会先准备好 url user password 和 加载 mysql驱动 Class.forName("全类名")

像这些都属于是配置信息 配置信息最好不要以 硬编码的方式 写在代码当中 应该把这些配置信息写到配置文件中 然后我们去读配置文件 然后将这些信息加载进来

配置文件
后期从web的角度考虑 *我们需要将配置文件放在src下 因为放在工程下的话 配置文件在部署到Tomcat服务器时候 文件就缺失了* 不会帮我们部署过去

| - src
  - jdbc.properties

配置文件中的书写顺序 无所谓 但是配置文件中不要有空格
```js
user=root
password=qwer6666
url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC
driverClass=com.mysql.cj.jdbc.Driver
```

```java
@Test
public void testConnection5() throws Exception {
  // 将数据库连接需要的4个基本信息声明在配置文件中 通过读取配置文件的方式 获取连接

  // 1. 读取配置文件中的4个基本信息
  // 获取系统类加载器
  InputStream is = ConnectionTest.class.getClassLoader().getResourceAsStream("jdbc.properties");

  Properties properties = new Properties();
  properties.load(is);

  String user = properties.getProperty("user");
  String password = properties.getProperty("password");
  String url = properties.getProperty("url");
  String driverClass = properties.getProperty("driverClass");

  // 加载并注册驱动
  Class.forName(driverClass);

  // 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);
  System.out.println(connection);
}
```

### 方案5的好处是？
1. 当我们不是要连接mysql的时候 我们只需要修改 配置文件就可以了 也就是我们实现了*数据和代码的分离* 也是实现了解耦

2. 如果需要修改配置文件信息 可以避免程序重新打包
``` 
  当我们把程序写完后 真正要部署到Tomcat服务器上 我们需要将java代码打包到jar文件 将编译后的程序部署到服务器上 如果我们要对获取连接中的某个参数 要进行修改的话 就要修改源代码 就意味着我们的java要重新打包 而我们的properties文件 打包的时候还是单独以一个文件的形式进行存储 所以我们要是修改参数 只需要替换properties文件就可以 
<br><br>>

<br><br>

# Statement操作数据库的弊端演示
上面我们在讲流程的时候 讲到过 当我们获取连接 connection 对象后 就要创建一个 Statement 对象 让这个对象拿着sql语句 去操作数据库 实际上我们需要创建的是 Statement对象 但是我们现在却要使用 PreparedStatement 对象
``` 
    Statement -- 接口
      PreparedStatement -- 子接口
```

我们真正的开发中用的都是 PreparedStatement 而不是 Statement 因为 Statement 存在着一些弊端


数据库连接被用于*向数据库服务器发送命令 和 sql 语句* 并接受数据库服务器返回的结果 其实一个数据库连接是一个socket连接

 
在 java.sql 包中有 *3个接口* 分别定义了对数据库的调用的不同方式 用来发送sql语句

### 1. Statement:  (不用它了)
  用于执行静态 sql 语句并返回它所生成结果的对象

### 2. PerparedStatement:  (用它)
  sql语句被预编译并存储在此对象中 可以使用此对象多次高效的执行该语句

### 3. CallableStatement:  (放到框架里面再说)
  用于执行 sql 存储过程 当我们使用存储过程的时候 我们再用它

``` 
                Driver Manager

connection       connection         connection
    ↓                 ↓                 ↓
statement     PerparedStatement   CallableStatement
    ↓                 ↓                 ↓
  result            result            result
```


### 演示 statement对象 的弊端
我们数据库中有一个 user 表
``` 
  user  password  balance
  aa    123456    1000
  bb    654321    1000
  cc    abcd      2000
  dd    abcder    3000
```

需求:
我们在java层面输入用户名和密码 如果正确的情况下 你告诉我登录成功 如果我们要是输入错误 告诉我们登录失败

```java
@Test
public void testLogin() {
  Scanner scan = new Scanner(System.in);

  System.out.print("用户名：");
  // 为了演示 这里要改成nextLine() next的话 只要是空格也算获取数据结束 而 nextLine() 只把换行当做获取数据的结束
  String userName = scan.nextLine();

  System.out.print("密   码：");
  String password = scan.nextLine();

  // SELECT user,password FROM user_table WHERE USER = '1' or ' AND PASSWORD = '
  // ='1' or '1' = '1';

  // 查询语句 注意 sql引号拼接的问题 这就是拼串操作 麻烦！
  String sql = "SELECT user,password FROM user_table WHERE USER = '" + userName + "' AND PASSWORD = '" + password
      + "'";

  // User.class 返回的对象的类型
  User user = get(sql, User.class);

  if (user != null) {
    System.out.println("登陆成功!");
  } else {
    System.out.println("用户名或密码错误！");
  }
}
```

**弊端:**
### 1. 需要用变量 和 sql语句进行拼接

### 2. sql注入的问题
在*用户名和密码输入不正确的情况下* 我们也可以对数据库进行恶意操作 (也就是用户名和密码不对 也能登录成功)

上面代码中 本身我们 sql 语句的逻辑是:
```sql
SELECT user, password 
FROM user_table 
WHERE user = '' and password = ''
```

现在我们拼一个串
```sql
SELECT user, password 
FROM user_table 
WHERE user = '1' or ' and password = '=1 or '1' = '1'
```

现在我们输入用户名:
WHERE user = '用户名'   用户名的部分替换成下面的
*1' or*

就变成了
user = '1' or '


现在我们输入密码:
password = '密码'   密码的部分替换成下面的
*=1 or '1' = '1*

就变成了
password = '=1 or '1' = '1'

也就是当我们在控制台 如上输入的时候
请输入用户名: 1' or
请输入密码:   =1 or '1' = '1
*登录成功*

以上就是sql注入 明明写的不对但是还是登录成功了
究其原因 就是我们使用了 Statement

原来sql中 想表达的是条件 xx and xx 是且的关系
当sql注入的时候 结果发生了变化 变成
xx or xx or xx 
也就是说 只要有一个满足就可以
而最后的 '1' = '1' 是恒成立的

```sql
SELECT user, password 
FROM user_table 
WHERE user = '' and password = ''

现在
SELECT user, password 
FROM user_table 
WHERE user = '1' or ' and password = '=1 or '1' = '1'
```


### 如何避免出现sql注入
只要用 PreparedStatement 取代 Statement 就可以了
``` 
  比如花多少钱弄个学历 就是利用数据库的漏洞 把我们的数据强行的塞进去

  但是网站也是有备份的 定期会清理数据 回滚一下 我们的数据也有可能被清掉了 也就是说只有一段时间是好用的
```

<br><br>

# PreparedStatement 的使用
我们回顾上面的内容

首先我们要获取数据库的连接
(有5种方式 - 第5种 - 我们使用DriverManager管理器来做的 其底层也在创建 Driver对象)

在获取连接之后 就是在java层面写sql语句 发送到数据库中去做执行 
``` 
    Driver代表数据库驱动
    ↓

    Connection代表数据库连接
    ↓

    PreparedStatement预编译的Statement
          ↙             ↘
        增删改          查询
                        ↓
                        ResultSet代表查询结果
```

<br><br>

### PreparedStatement的使用 实现数据库的 增删改 操作

  | - com.sam.preparedstatement
    - PreparedStatementUpdateTest

增: insert
删: delete from
改: update

查: select

增删改操作: 完成后是不需要有什么返回的 相当于 void
查询操作: 一定是由返回的

<br><br>

# 使用 PreparedStatement 向数据库表中 插入数据

### 要点:
### 1. 关于 sql 语句的要点
在sql语句中 我们要使用 *?* 占位符
占位符的位置 要与我们添加的数据 一一对应
```java
String sql = "insert into customers(name,email,birth)values(?,?,?)";
```

占位符的使用位置 就是 过滤条件那


### 2. 获取 PreparedStatement接口 的实例对象
### 连接对象.prepareStatement(String sql)
我们要先获取连接对象 连接对象怎么获取 可以看看上面的 第5种方式

返回值:
PreparedStatement 类型的实例 *ps*

```java
ps = connection.prepareStatement(sql);
```


### 3. 通过 ps 实例对象 调用 setXxx() 方法 向占位符 的位置填入数据

### ps.setString(int 索引, String x)
索引:
指向步骤2中的占位符的位置 在与数据库的交互中 索引都是从1开始的 比如我们添入 1 就意味着在第一个 ? 处 填入数据
```java
ps.setString(1, "哪吒");
ps.setString(2, "nezha@gmail.com");

SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
java.util.Date date = sdf.parse("1000-01-01");
ps.setDate(3, new Date(date.getTime()));
```

**注意:**
1. 我们可以往 ? 填入各种类型的数据 那么调用的也是setXxx()方法
2. 我们存入什么类型的数据 x的位置也对应是什么类型的数据

ps.setString()
### ps.setObject()   存什么都可以 setObject 通用
ps.setDate()
ps.setArray()
ps.setString()
ps.setAsciiStream()
ps.setBinaryStream()
ps.setBlob()
ps.setBytes()
ps.setCharacterStream()
ps.setClob()
ps.setDouble()
ps.setFloat()
ps.setInt()
ps.setLong()


### 4. ps.execute();
执行操作

返回值: boolean
如果是查询操作 有返回结果 该方法会return true
如果是增删改操作 没有返回结果 该方法会return false


### 扩展: ps.executeUpdate()
我们这个部分封装的 增删改 操作没有返回值
这样就会有一个问题 就是我们不知道操作成功没有 比如我们想如果操作成功返回true 如果操作失败返回false

返回值:
int
影响的行数:
增删改操作后影响的行数(比如修改了多少条 删除了多少条)

0:
增删改操作失败了




### 5. 最后要关闭资源 使用 try catch
我们要关闭 ps connection

### 完整代码:
```java
@Test
public void testInsert() {
  Connection connection = null;
  PreparedStatement ps = null;
  try {
    // 1. 获取数据库连接
    InputStream is = PreparedStatementUpdateTest.class.getClassLoader().getResourceAsStream("jdbc.properties");
    // 下面这行代码也能获取 系统类加载器
    // InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
    Properties properties = new Properties();
    properties.load(is);

    String user = properties.getProperty("user");
    String password = properties.getProperty("password");
    String url = properties.getProperty("url");
    String driverClass = properties.getProperty("driverClass");

    Class.forName(driverClass);
    connection = DriverManager.getConnection(url, user, password);


    // 2. 预编译sql语句 返回PreparedStatement实例对象;  ? 叫做占位符
    String sql = "insert into customers(name,email,birth)values(?,?,?)";
    ps = connection.prepareStatement(sql);


    // 3. 填充占位符 int parameterIndex String x 跟数据库交互的索引是从1开始的 1指向第一个占位符 有几个占位符就调用几次 x为要加入的值
    ps.setString(1, "哪吒");
    ps.setString(2, "nezha@gmail.com");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    java.util.Date date = sdf.parse("1000-01-01");
    ps.setDate(3, new Date(date.getTime()));


    // 4. 执行操作
    ps.execute();

    
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 5. 资源关闭 PreparedStatement 和 connection 都要关 涉及到资源的关闭 我们就不要throws了
    try {
      if(ps != null) ps.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    try {
      if(connection != null) connection.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}
```

<br><br>

# 封装数据库连接和关闭操作
我们不管说 增加 修改 删除 不管哪个操作 有几件事情是一定要做的
1. 先要获取连接
2. 中间是增删改查的操作
3. 关闭连接

我们把 1 3 封装到一个方法当中 抽离到一个包里面

  | - com.sam.utils
    - JDBCUtils  

工具类中都是静态方法

需要的包:
```java
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;
```

### 获取连接的方法
最后return一个连接对象
```java
public static Connection getConnection() throws Exception {
  // 利用 ClassLoader 获取系统类加载器 这样
  InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");

  Properties properties = new Properties();
  properties.load(is);

  String user = properties.getProperty("user");
  String password = properties.getProperty("password");
  String url = properties.getProperty("url");
  String driverClass = properties.getProperty("driverClass");

  Class.forName(driverClass);
  Connection connection = DriverManager.getConnection(url, user, password);

  return connection;
}
```


### 关闭连接的方法
要点:
1. 参数的定义:
Connection connection
PreparedStatement ps
参数2可以定义为 Statement
因为PreparedStatement是Statement的子接口 参数我们也可以定义的大一些

2. 方法没有返回值

```java
public void closeResource(Connection connection, PreparedStatement ps) {
  try {
    if(ps != null) ps.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
  try {
    if(connection != null) connection.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
}
```

<br><br>

# 使用 PreparedStatement 修改数据库表中的数据
操作数据库的5步

```java
// 1. 获取数据库的连接

// 2. 通过连接对象 获取 preparedstatement对象 预编译sql语句

// 3. 填充占位符

// 4. 执行

// 5. 资源的关闭
```

步骤2中我们提到了 预编译 什么是预编译?
```java
String sql = "update customers set name = ? where id = ?";

PreparedStatement ps = connection.prepareStatement(sql);
```
在我们根据sql生成PrepareStatement实例的时候(也就是得到ps的时候) ps中已经携带了我们要做的事情(sql语句体现的) 这就是预编译

跟statement比较起来 statement的实例出生的时候不知道它要做什么 但是 ps 出生的时候就知道它要做什么


其实我们看看 增删改 的操作中 1 4 5 都是固定的 唯独 2 3 需要有变化 等我们做完修改的操作 我们会尝试封装个通用的 增删改 


### 修改数据库的操作
```java
@Test
public void testUpdate() throws Exception {
  // 1. 获取数据库的连接
  Connection connection = JDBCUtils.getConnection();

  // 2. 通过连接对象 获取 preparedstatement对象 预编译sql语句
  String sql = "update customers set name = ? where id = ?";
  PreparedStatement ps = connection.prepareStatement(sql);

  // 3. 填充占位符
  // 我们填充String name 和 int id也可以用setObject()
  ps.setObject(1, "莫扎特");
  ps.setObject(2, 18);

  // 4. 执行
  ps.execute();

  // 5. 资源的关闭
  JDBCUtils.closeResource(connection, ps);
}
```

加上 try catch 的逻辑
```java
@Test
public void testUpdate() throws Exception {
  Connection connection = null;
  PreparedStatement ps = null;
  try {
    // 1. 获取数据库的连接
    connection = JDBCUtils.getConnection();

    // 2. 通过连接对象 获取 preparedstatement对象 预编译sql语句
    String sql = "update customers set name = ? where id = ?";
    ps = connection.prepareStatement(sql);
    // 什么叫预编译sql语句 在我们生成PrepareStatement实例的时候(也就是得到ps的时候) ps中已经携带了我们要做的事情(sql语句体现的)

    // 3. 填充占位符
    // 我们填充String name 和 int id也可以用setObject()
    ps.setObject(1, "莫扎特");
    ps.setObject(2, 18);

    // 4. 执行
    ps.execute();
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 5. 资源的关闭
    JDBCUtils.closeResource(connection, ps);
  }
}
```

<br><br>

# 使用 PreparedStatement 实现通用的增删改操作
上面也说了 只是sql语句和填充占位符的地方不一样
我们把随时可能会变的信息定义为参数

### 要点:
参数:
String sql: sql语句
Object ...args: 占位符
类型都可以定义为Object
要求: 有几个占位符 我们就传入几个实参 可变形参的个数 要与 sql中占位符的个数是一样的

```java
// 这里不要忘记要try catch
public void update(String sql, Object ...args) {
  Connection connection = JDBCUtils.getConnection();
  PreparedStatement ps = connection.prepareStatement(sql);

  // 使用 ...args 填充占位符
  for(int i = 0; i < args.length; i++) {
    // 小心index从1开始 args数组要从0开始
    ps.setObject(i + 1, args[i]);
  }

  ps.execute();
  JDBCUtils.closeResource(connection, ps);
}
```

### 通用的增删改操作 -- 带有返回值的写法:
我们可以 让 update() 方法具有返回值
这样我们就可以根据返回值 来判断操作是否成功

要点:
1. update()方法的返回值类型 定义为 int
2. 使用 ps.executeUpdate() 代替 ps.execute()

```java
public int update(String sql, Object ...args) {
  Connection connection = null;
  PreparedStatement ps = null;
  try {
    connection = JDBCUtils.getConnection();
    ps = connection.prepareStatement(sql);

    for(int i = 0; i < args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }

    // ps.execute(); 换成下面的这个方法
    return ps.executeUpdate();

  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(connection, ps);
  }
  
  return 0;
}
```


测试1:  OK
```java
@Test
public void testCommonUpdate() {
  // 删除表中数据
  String sql = "delete from customers where id = ?";

  update(sql, 3);
}
```


测试2:  报错
```java
@Test
public void testCommonUpdate() {
  String sql = "update order set order_name = ? where order_id = ?";

  update(sql, "DD", "2");
}
```

错误信息:
java.sql.SQLSyntaxErrorException: *You have an error in your SQL syntax; check the manual that corresponds to your MySQL* server version for the right syntax to use near 'from order set order_name = 'DD' where order_id = '2'' at line 1


上面的sql语句写的有问题
order是表名 order还是关键字 所以记得使用 ``
```java
String sql = "update `order` set order_name = ? where order_id = ?";
```

<br><br>

# 使用 PreparedStatement 实现 查询操作
整体来说套路是一样的 但是查询的话 还要处理查询到的结果
因为查询结果会有结果集 结果集在java中万事万物都是对象 也就是说我们查到的结果集 要拿一个java类的对象来充当 我们要操作java对象

jdbc中对于结果集 有 ResultSet 我们要知道怎么处理 ResultSet

### 针对于 具体的表(Customers) 的查询操作

  | - com.sam.preparedstatement
    - CustomersForQuery

前面的步骤都一样
1. 获取连接
2. 预编译 sql 创建 PreparedStatement

在增删改的时候我们调用的都是 ps.execute() 但是因为我们这里是查询 我们要对查询回来的结果集做处理 所以要调用

### ps.executeQuery();
执行sql 并返回结果集

返回值:
ResultSet resultSet
resultSet也是资源 也需要关闭

```java
ResultSet resultSet = ps.executeQuery();
```

遍历数据:
java基础部分的时候 我们讲过怎么使用 遍历器来遍历集合
```java
while(iterator.hasNext()) {
  // iterator.hasNext()判断当前集合中是否还有元素 有元素就进入循环体 没有就不要进去了
  System.out.println(iterator.next());
}
```

回顾下:
指针会在集合首位元素的前面 hasNext() 会判断下面有没有元素 有元素 我们在调用 next() 获取元素

结果集也有一个指针 它也指向第一条数据的上面 我们也是调用某一个方法 判断下面还有没有数据 有的话接着操作 没有的话就退出了 这个方法就是next() 

### resultSet.next()
作用:
1. 判断结果集的下一条是否有记录
2. 指针下移(如果是true 说明下面有元素 指针自动下移, false指针不下移直接结束)

返回值:
boolean 
``` 
  - 有点类似 hasNext() 但是还不同与 hasNext() 
  - hasNext()的作用就一个 判断下面还有没有元素 而指针下移的事儿 是iterater.next() 做的 
```


### resultSet.getInt(从1开始的索引)
### resultSet.getString(从1开始的索引)
### resultSet.getObject(从1开始的索引) - 通用
每个字段是什么类型 我们就对应的调用 getXxx()
索引的位置就要看你读取的是哪个字段的数据
``` 
    id    name    email   birth
    1       2       3       4
```

参数:
1. 可以是索引
2. 可以是字段的别名(列名) -- 这个比较好一些

```java
// 处理结果集
if(resultSet.next()) {
  // 进来说明下一条是有记录的 然后我们就要获取当前这条数据的各个字段值

  int id = resultSet.getInt(1);

  String name = resultSet.getString(2);

  String email = resultSet.getString(3);
  // 是sql下的Date

  Date birth = resultSet.getDate(4);
}
```


### Java 与 SQL 对应数据类型的转换表

|java类型|sql类型|
|:--|:--|
|boolean|bit|
|byte|tinyint|
|short|smallint|
|int|integer|
|long|bigint|
|String|char varchar longvarchar|
|byte array|binary varbinary|
|java.sql.Date|date|
|java.sql.Time|time|
|java.sql.Timestamp|timestamp|

``` 
  Blob类型 在java中 没有对应的类型
  比如有个视频4个g java不能拿个属性去对接4个g吧

  可以是个file
```


### 处理结果集中每个字段的数据
上面我们从结果集中拿到了 每个字段的数据 那我们把这些数据保存到哪里？

方式1: (不推荐)
保存到数组中

方式2: 
将每一个属性封装到java对象中
一个java类对应数据库中的一个表 
表中有什么字段 类中就对应有什么属性
表中是什么类型 类中的属性就对应什么类型
``` 
  ORM映射:
    一个数据表 对应 一个java类
    表中的一条记录 对应 java类中的一个对象
    表中的一个字段 对应 java类中的一个属性
```

    customers表 -> Customer类

 | - com.sam.bean
   - Customer

JavaBean类中public的属性是private
```java
package com.sam.bean;

import java.sql.Date;

public class Customer {
   private int id;
   private String name;
   private String email;
   private Date birth;    // 这里和数据库的Date类型对接 也是 java.sql.Date

  public Customer() {
  }

  public Customer(int id, String name, String email, Date birth) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.birth = birth;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Date getBirth() {
    return birth;
  }

  public void setBirth(Date birth) {
    this.birth = birth;
  }

  @Override
  public String toString() {
    return "Customer{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", email='" + email + '\'' +
        ", birth=" + birth +
        '}';
  }
}

```


### 使用 PreparedStatement 查询数据库 代码部分
```java
package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// 针对 Customers 表的查询操作
public class CustomersForQuery {

  @Test
  public void testQuery1() throws Exception {
    Connection connection = JDBCUtils.getConnection();

    String sql = "select id, name, email, birth from customers where id = ?";
    PreparedStatement ps = connection.prepareStatement(sql);

    // 补充 占位符
    ps.setObject(1, 1);

    // 增删改的操作的时候 这里我们调用的是 ps.execute() 我们这里要执行后还要返回一个结果集 所以我们要调用
    // 调用ps对象的 执行并返回结果集的方法
    ResultSet resultSet = ps.executeQuery();

    // 处理结果集
    if(resultSet.next()) {
      // 进来说明下一条是有记录的 然后我们就要获取当前这条数据的各个字段值
      int id = resultSet.getInt(1);
      String name = resultSet.getString(2);
      String email = resultSet.getString(3);
      // 是sql下的Date
      Date birth = resultSet.getDate(4);

      // 上面拿到了每个字段的数据 我们怎么处理这些数据
      // 方式1: 保存到数组中
      // Object[] data = new Object[] {id, name, email, birth};

      // 方式2: 保存到对象中(封装到类的对象中)
      Customer customer = new Customer(id, name, email, birth);
      System.out.println(customer);
    }

    // 关闭资源
    JDBCUtils.closeResource(connection, ps, resultSet);
  }
}
```

改成 try catch 的形式
```java
@Test
public void testQuery1() {
  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet resultSet = null;
  try {
    connection = JDBCUtils.getConnection();

    String sql = "select id, name, email, birth from customers where id = ?";
    ps = connection.prepareStatement(sql);

    // 补充 占位符
    ps.setObject(1, 1);

    // 增删改的操作的时候 这里我们调用的是 ps.execute() 我们这里要执行后还要返回一个结果集 所以我们要调用
    // 调用ps对象的 执行并返回结果集的方法
    resultSet = ps.executeQuery();

    // 处理结果集
    if(resultSet.next()) {
      // 进来说明下一条是有记录的 然后我们就要获取当前这条数据的各个字段值
      int id = resultSet.getInt(1);
      String name = resultSet.getString(2);
      String email = resultSet.getString(3);
      // 是sql下的Date
      Date birth = resultSet.getDate(4);

      // 上面拿到了每个字段的数据 我们怎么处理这些数据
      // 方式1: 保存到数组中
      // Object[] data = new Object[] {id, name, email, birth};

      // 方式2: 保存到对象中(封装到类的对象中)
      Customer customer = new Customer(id, name, email, birth);
      System.out.println(customer);
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 关闭资源
    JDBCUtils.closeResource(connection, ps, resultSet);
  }
}
```

<br><br>

# 封装 某一张表的 通用的 查询操作
我们在查询一张表的时候 每次查询的字段多少可能不一样
``` select ? from```

上面的字段不一样 也会影响到 我们通过 resultSet 对象 去取字段的数据 也不一样

写成通用的也就是将这些变的东西 写成通用的

首先我们想想 哪部分应该提取为参数部分
sql:
因为查几个字段不确定 有的情况查2个 有的情况查3个

args:
用于补充占位符 我们在sql中写了几个 ? 就要传递几个实参 该实参都会在 args数组中

```java
public Customer queryForCustomers(String sql, Object ...args) throws Exception {
  
  // 获取连接
  Connection connection = JDBCUtils.getConnection();

  // 传入sql参数 进行预编译
  PreparedStatement ps = connection.prepareStatement(sql);

  // 补充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i + 1, args[i]);
  }

  // 获取结果集
  ResultSet rs = ps.executeQuery();

  ...

```

ok 现在我们根据sql得到了结果集 接下来我们就要 通过调用 rs.getObject() 方法 将结果集中的每一个列(字段)的值 拿出来封装到java的对象中

那我们考虑下 我们需要什么信息
### 问题1. 我们要调用 rs.getObject() 几次?
``` 
  调用几次是由 select 几个字段 form 决定的
  这几个字段决定了我们结果集有几列 结果集有几列就意味着我们要调用几次 rs.getObject() 方法

  那怎么获取结果集的列数？ 
  获取结果集的列数的方法被封装到结果集的元数据当中了
```

### rs.getMetaData();
获取 结果集 的元数据
用来修饰结果集的数据 叫做元数据
``` 
  结果集如果看成 td 里面的具体数据
  那么元数据 相当于 theah 表头啊 列数啊 这些附加的信息
```

返回值
ResultSetMetaData rsmd


### rsmd.getColumnCount()
获取 结果集 的*总列数*

返回值
int


### rsmd.getColumnName(int column)
获取 结果集中 指定列数的 *列名*

### rsmd.getColumnLabel(int column)
获取 结果集中 指定列数的 *别名*
*当没有给表指定别名的时候 检索结果就是列名 所以这个方法通用*

返回值
String

ok 知道了上面的这些 我们写下逻辑
```java
public Customer queryForCustomers(String sql, Object ...args) throws Exception {
  
  // 获取连接
  Connection connection = JDBCUtils.getConnection();

  // 传入sql参数 进行预编译
  PreparedStatement ps = connection.prepareStatement(sql);

  // 补充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i + 1, args[i]);
  }

  // 获取结果集
  ResultSet rs = ps.executeQuery();


  // 获取结果集的元数据
  ResultSetMetaData rsmd = rs.getMetaData();

  // 获取结果集中的列数 用于遍历使用
  int columnCountcount = rsmd.getColumnCount();

  // 判断结果集中有数据
  if(rs.next()) {
    // 判断有数据后 我们创建 customer 对象 用于接收查询到的结果到 对象中

    Customer customer = new Customer();

    // 根据列数决定调用几次 rs.getObject()
    for(int i=0; i<columnCountcount; i++) {
      // 获取每个字段的值
      Object columnValue = rs.getObject(i + 1); 

      // 获取每个字段的列名(也就是属性名)
      String columnName = rsmd.getColumnName(i + 1);

      ... 
    }
  }
```


### 问题2: 我们现在也拿到字段名(属性名) 也知道属性值了 现在就要添加到对象中

通过反射 给customer对象指定的columnName属性 赋值为columnValue

下面的代码添加到 ... 的部分
```java
// 获取运行时类的指定属性
Field field = Customer.class.getDeclaredField(columnName);
field.setAccessible(true);

// 将这个属性名的值设置为
field.set(customer, columnValue);
```


### 完整代码
```java
public Customer queryForCustomers(String sql, Object ...args) throws Exception {
  
  // 获取连接
  Connection connection = JDBCUtils.getConnection();

  // 传入sql参数 进行预编译
  PreparedStatement ps = connection.prepareStatement(sql);

  // 补充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i + 1, args[i]);
  }

  // 获取结果集
  ResultSet rs = ps.executeQuery();


  // 获取结果集的元数据
  ResultSetMetaData rsmd = rs.getMetaData();

  // 获取结果集中的列数 用于遍历使用
  int columnCountcount = rsmd.getColumnCount();

  // 判断结果集中有数据 使用if意味着我们查询结果只有一条数据
  if(rs.next()) {
    // 判断有数据后 我们创建 customer 对象 用于接收查询到的结果到 对象中

    Customer customer = new Customer();

    // 根据列数决定调用几次 rs.getObject()
    for(int i=0; i<columnCountcount; i++) {
      // 获取每个字段的值
      Object columnValue = rs.getObject(i + 1); 

      // 获取每个字段的列名(也就是属性名)
      String columnName = rsmd.getColumnName(i + 1);

      // 通过反射 给customer对象指定的columnName属性 赋值为columnValue
      // 获取运行时类的指定属性
      Field field = Customer.class.getDeclaredField(columnName);

      field.setAccessible(true);

      // 将这个属性名的值设置为
      field.set(customer, columnValue);
    }
    return customer;
  }

  // 关闭资源
  JDBCUtils.closeResource(connection, ps, rs);
  return null;
}
```

加入 try catch 的代码
```java
public Customer queryForCustomers(String sql, Object ...args) {
  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  try {
    connection = JDBCUtils.getConnection();
    ps = connection.prepareStatement(sql);
    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }

    rs = ps.executeQuery();


    // 获取结果集的元数据 修饰结果集的数据 都在 rsmd 中
    ResultSetMetaData rsmd = rs.getMetaData();

    // 通过 rsmd 获取结果集中的列数
    int columnCountcount = rsmd.getColumnCount();

    if(rs.next()) {

      // 写到if里面 当有结果的时候 我们再造对象
      Customer customer = new Customer();

      // 处理结果集一行数据中的每一个列
      for(int i=0; i<columnCountcount; i++) {
        // 获取每个字段的值
        Object columnValue = rs.getObject(i + 1);

        // 获取 每个列的列名 也在结果集的元数据中
        String columnName = rsmd.getColumnName(i + 1);
        // 通过反射 给customer对象指定的columnName属性 赋值为columnValue
        // 获取运行时类的指定属性
        Field field = Customer.class.getDeclaredField(columnName);
        field.setAccessible(true);

        // 将这个属性名的值设置为
        field.set(customer, columnValue);
      }

      return customer;
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(connection, ps, rs);
  }

  return null;
}
```

测试:
```java
@Test
public void testQueryForCustomers() {
  // 字段的顺序 这里无所谓 因为上面我们是利用反射 set value的
  String sql = "select id, name, birth, email from customers where id = ?";
  Customer customer = queryForCustomers(sql, 13);
  System.out.println(customer);
}
```

<br><br>

# 针对 order 表 通用的 查询操作

看看 表中的字段 的类型 好用来定义JavaBean中属性的类型
```sql
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_name` varchar(20) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gb2312
```

### 要点:
1. 表中的字段名是 order_id 
java类中属性的定义方式:
  - 和表中的字段名 保持一致: order_id 不推荐

  - java中定义为驼峰 orderId
  - 1. 指定sql语句的时候 我们给字段起别名 *别名要保证和java类中的属性名一致都是驼峰*
  ```sql
    String sql = "select order_id orderId, order_name orderName, order_date orderDate from `order` where order_id = ?";
  ```


  - 2. rsmd.getColumnLabel(int column)
  - 使用该方法 替换 下面的 getColumnName()


```java
package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.bean.Order;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class OrdersForQuery {

@Test
public void testQueryForOrder() {
  String sql = "select order_id, order_name, order_date from `order` where order_id = ?";
  Order order = queryForOrder(sql, 1);
  System.out.println(order);
}

public Order queryForOrder(String sql, Object ...args) {

  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  try {
    connection = JDBCUtils.getConnection();
    ps = connection.prepareStatement(sql);

    for(int i=0; i<args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }

    rs = ps.executeQuery();
    ResultSetMetaData rsmd = rs.getMetaData();
    int columnCount = rsmd.getColumnCount();

    // 一条数据(记录)的时候用 if
    if(rs.next()) {
      Order order = new Order();

      for(int i=0; i<columnCount; i++) {
        Object columnValue = rs.getObject(i + 1);


        // String columnName = rsmd.getColumnName(i + 1);

        // 以后就使用该方法来获取列名 或者 列的别名
        // 优点 在java类中 可以将属性设置为 驼峰
        String columnName = rsmd.getColumnLabel(i + 1);


        Field field = Order.class.getDeclaredField(columnName);
        field.setAccessible(true);
        field.set(order, columnValue);
      }

      return order;
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(connection, ps, rs);
  }
  return null;
}
}

```

<br><br>

# 使用 PreparedStatement 实现 针对不同表的通用查询操作

  | - com.sam.preparedstatement
    - PreparedStatementQueryTest

### 通过 PreparedStatement 查询数据库 获取 一条记录(一个对象)

### 问题1: 
因为是通用的表的查询操作 那么我们方法的返回值类型是什么？
比如:
我们查询 order表 返回的是 Order类型
我们查询 user表  返回的是 User类型


我们先看看 指定表的通用查询操作 看看 哪些部分可以改成通用的代码

```java
// **问题1**: 方法的返回值
public Object getInstance(String sql, Object ...args) throws Exception {

  // 获取连接
  Connection connection = JDBCUtils.getConnection();
  // 预编译sql
  PreparedStatement ps = connection.prepareStatement(sql);

  // 填充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i+1, args[i]);
  }

  // 执行并获取结果集
  ResultSet rs = ps.executeQuery();

  // 获取列数
  ResultSetMetaData rsmd = rs.getMetaData();
  int columnCount = rsmd.getColumnCount();

  // 一条数据
  if(rs.next()) {

    // **问题2**: 我们创建的不知道是哪个类的对象
    Order order = new Order();

    for(int i=0; i<columnCount; i++) {
      // 获取列名
      String columnLabel = rsmd.getColumnLabel(i + 1);

      // 获取列值
      Object columnValue = rs.getObject(i + 1);

      // 通过反射 将查询到的结果添加到对象的属性里
      Field field = Order.class.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(order, columnValue);
    }
    return order;
  }

  JDBCUtils.closeResource(connection, ps, rs);
  return null;
}
```

获取连接
预编译sql
填充占位符
执行并获取结果集
获取列数
一条数据 if(rs.next())
这些都是通用的

### 问题1: 方法的返回值
那我们定义方法的返回值类型应该是什么？ 
修改为 泛型方法 为什么结合问题2再看
```java
public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception { }
```

传参的时候: Order.class


### 问题2: 
我们创建的不知道是哪个类的对象
或者换句话说 这个位置 我们造的对象 就决定了 整个方法的返回值的类型

所以这个部分我们不能直接 new Order 不能在编译的期间确定 所以这个部分 我们要替换成反射

那反射的话 我们要告诉程序 造哪个类的对象 哪个类的对象也可以由参数传递进来

  Class clazz

并且 Class 都带泛型 所以我们在定义形参的时候 可以带上泛型 

  Class<T> clazz

这样问题1也能解决 返回值就是 T 类型的
也就是说 我们整个方法 就是泛型方法

```java
// 之前:
if(rs.next()) {
  // **问题2**: 我们创建的不知道是哪个类的对象
  Order order = new Order();
}


// 之后:
// 加形参 Class clazz
public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception {
  
  ...

  if(rs.next()) {
    // 返回值类型就是 T 类型
    T t = clazz.newInstance();

    for(int i=0; i<columnCount; i++) {

      String columnLabel = rsmd.getColumnLabel(i + 1);
      Object columnValue = rs.getObject(i + 1);

      // 这里是clazz 因为clazz相当于Order 而t相当于order对象 不一样的
      Field field = clazz.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(t, columnValue);

    }

    return t;
}
``` 

也就是说 我们上面解决完 问题1 问题2 就ok了
测试 + 完整代码:
```java
package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.bean.Order;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class PreparedStatementQueryTest {

@Test
public void testGetInstance() throws Exception {
  String sql = "select id, name, email, birth from customers where id = ?";
  Customer customer = getInstance(Customer.class, sql, 1);
  System.out.println(customer);
}

public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception {

  // 获取连接
  Connection connection = JDBCUtils.getConnection();
  // 预编译sql
  PreparedStatement ps = connection.prepareStatement(sql);

  // 填充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i+1, args[i]);
  }

  // 执行并获取结果集
  ResultSet rs = ps.executeQuery();

  // 获取列数
  ResultSetMetaData rsmd = rs.getMetaData();
  int columnCount = rsmd.getColumnCount();

  // 一条数据
  if(rs.next()) {

    // **问题**: 我们创建的不知道是哪个类的对象
    // Order order = new Order();
    T t = clazz.newInstance();

    for(int i=0; i<columnCount; i++) {
      String columnLabel = rsmd.getColumnLabel(i + 1);
      Object columnValue = rs.getObject(i + 1);

      // 这里是clazz 因为clazz相当于Order 而t相当于order对象 不一样的
      Field field = clazz.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(t, columnValue);
    }
    return t;
  }

  JDBCUtils.closeResource(connection, ps, rs);
  return null;
}
}

```

<br><br> 

### 通过 PreparedStatement 查询数据库 获取 多条记录(多个对象)
多个对象的话 我们就应该返回一个集合

要点:
1. 上面一系列的方法中 我们使用的都是 if(rs.next()) 这是如果有数据(一条数据)的情况下 我们执行 { 逻辑 }

现在 我们要使用 while 来进行多条数据的逻辑

if(rs.next())   改成:
while(rs.next()) 
当没有数据的时候 就是false

2. 我们在 while循环的外面 创建一个 list 结合

3. 查询如果没有查到 的情况
  - 1. 抛异常了
  - 2. 可能是没查到数据 list.size() == 0

```java
public <T> List<T> getForList(Class<T> clazz, String sql, Object ...args) throws Exception {

  // 获取连接
  Connection connection = JDBCUtils.getConnection();
  // 预编译sql
  PreparedStatement ps = connection.prepareStatement(sql);

  // 填充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i+1, args[i]);
  }

  // 执行并获取结果集
  ResultSet rs = ps.executeQuery();

  // 获取列数
  ResultSetMetaData rsmd = rs.getMetaData();
  int columnCount = rsmd.getColumnCount();

  // 创建一个承装对象的结合
  ArrayList<T> list = new ArrayList<>();


  // 多条记录
  while(rs.next()) {

    // 循环中 每次都创建一个t对象
    T t = clazz.newInstance();

    // 通过 for 将t对象的所有的属性都附上值了
    for(int i=0; i<columnCount; i++) {
      String columnLabel = rsmd.getColumnLabel(i + 1);
      Object columnValue = rs.getObject(i + 1);

      Field field = clazz.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(t, columnValue);
    }

    // 每循环一次就把对象添加到集合中
    list.add(t);
  }

  JDBCUtils.closeResource(connection, ps, rs);

  // while循环结束后
  return list;
}
```

加上 try catch 的代码 + 测试
```java
@Test
public void testGetForList() {
  String sql = "select id, name, email, birth from customers where id < ?";
  List<Customer> list = getForList(Customer.class, sql, 12);

  // lamda表达式
  list.forEach(System.out :: println);
}

public <T> List<T> getForList(Class<T> clazz, String sql, Object ...args) {
  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  ArrayList<T> list = null;

  try {
    // 获取连接
    connection = JDBCUtils.getConnection();
    // 预编译sql
    ps = connection.prepareStatement(sql);

    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i+1, args[i]);
    }

    // 执行并获取结果集
    rs = ps.executeQuery();

    // 获取列数
    ResultSetMetaData rsmd = rs.getMetaData();
    int columnCount = rsmd.getColumnCount();

    // 创建一个承装对象的结合
    list = new ArrayList<>();


    // 多条记录
    while(rs.next()) {
      // 循环中 每次都创建一个t对象
      T t = clazz.newInstance();

      // 通过 for 将t对象的所有的属性都附上值了
      for(int i=0; i<columnCount; i++) {
        String columnLabel = rsmd.getColumnLabel(i + 1);
        Object columnValue = rs.getObject(i + 1);

        Field field = clazz.getDeclaredField(columnLabel);
        field.setAccessible(true);
        field.set(t, columnValue);
      }

      // 把对象添加到集合中
      list.add(t);
    }

    // while循环结束后
    return list;

  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(connection, ps, rs);
  }

  return null;
}
```

<br><br>

# 使用 PreparedStatement 解决 sql注入的问题
我们在上面封装sql的时候 都会使用占位符 而不是将sql语句写死
```java
// 有占位符
String sql = "select id, name, email, birth from customers where id < ?";


// 写死
String sql = "select id, name, email, birth from customers where id < 12";
```

占位符的使用 就是PreparedStatement才有的
Statement没有 正因为Statement没有才会有sql注入的问题

那为什么 PreparedStatement 这么写不会有sql注入的问题呢？

### 原理:
核心点就是占位符起到了很大的作用
PreparedStatement是预编译 就是说 当我们上面定义完sql
并把sql丢到里面 生成ps的时候

  String sql = "select id, name, email, birth from customers where id < ?";

  
  ps = connection.prepareStatement(sql);


ps里面的sql就执行过了 预编译了 它会把 ? 的地方空不来 相当于挖了一个坑 但是sql语句的其它结构都是确定的 规定的 是 & 就是 & 的关系 是 | 就是 | 的关系 不会因为我们拼串传入恶意代码 就能改变这样的关系

所以 PreparedStatement 比 Statement 更加的安全


### 其它优点
1. 可以操作Blob类型的数据 比如 图片 视频 
因为 是一个 ? 占位符 所以我们可以拿一个流的方式去填充
``` 
  要是普通的sql语句 想往里面写一个流不现实
```

2. 可以实现更高效的批量插入
Statement因为sql是写死的 没有? 所以我们要写1万条sql 并且 都有校验功能 所以也需要校验1万次

PreparedStatement 当预编译的时候 就有校验的功能 因为结构都是固定的 只是 ？ 的部分不一样 当预编译的时候 它已经校验完了 只校验了一遍 剩下的我们就是往里丢数据就可以了 所以更加的高效

<br><br>

# JDBC小结

### 两种思想
1. 面向接口编程的思想
``` 
  对于java程序员来讲 我们只需要面向jdbc这套接口编程就可以了 我们代码里面不会出现第三方的api

  第三方的api 比如 mysql的驱动 都是在 .properties文件中配置的

  我们读取这个配置文件的 第三方的数据库驱动的位置 创建的连接

  我们编写代码的时候 返回的都是 接口类型

  Connection conn = JDBCUtils.getConnection()

  但是我们运行代码的时候返回的是Connection接口的具体实现类对象

  我们调用方法也是 接口去调用方法 conn.
  PreparedStatement ps = conn.prepareStatement(sql)

  但是在执行的时候我们拿的mysql具体的实现类对象的重写的prepareStatement()

  所以返回的ps也是 在mysql当中实现了PreparedStatement接口的实现类的对象

  下面一系列的都是接口在调方法 也执行的时候 都是具体的实现类的对象重写后的方法

  这样就是面向接口编程 而切具有很好的移植性
```

2. ORM的思想
  - 一个数据表 对应 一个java类
  - 表中的一条记录对应java类的一个对象
  - 表中的一个字段对应java类的一个属性
``` 
  sql是需要结合列名和表的属性名来写 注意起别名
```


### 两种技术
1. jdbc结果集的元数据 ResultSetMetaData
  - 获取列数: getColumnCount()
  - 获取列的别名: getColumnLabel()

2. 通过反射 创建指定类的对象 获取指定的属性并赋值

<br><br>

# 练习1:
从控制台向数据库的表 customers 中插入一条数据 

### 要点:
1. 这里可以根据 update() 的返回值 来判断是否添加数据成功
我们用到了 ps.executeUpdate() 方法


```java
package com.sam.exer;

import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Scanner;

// 课后练习1:
public class Exer1 {

  public static void main(String[] args) {

    // 如果是main方法 就要创建当前类的对象来调用方法
    Exer1 exer1 = new Exer1();

    Scanner scanner = new Scanner(System.in);
    System.out.print("请输入用户名: ");
    String name = scanner.next();

    System.out.print("请输入邮箱: ");
    String email = scanner.next();

    System.out.print("请输入生日: ");
    // 生日也是字符串类型 但是有隐式的转换 1992-09-08 注意格式
    String birth = scanner.next();

    String sql = "insert into customers(name, email, birth) values(?,?,?)";
    int insertCount = exer1.update(sql, name, email, birth);

    if(insertCount > 0) {
      System.out.println("添加成功");
    } else {
      System.out.println("添加失败");
    }
  }


  @Test
  public void testInsert() {
    // 使用测试方法 测逻辑 控制台不能使用 scanner 
  }


  public int update(String sql, Object ...args) {
    Connection connection = null;
    PreparedStatement ps = null;
    try {
      connection = JDBCUtils.getConnection();
      ps = connection.prepareStatement(sql);

      for(int i = 0; i < args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      // ps.execute();
      return ps.executeUpdate();

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, ps);
    }

    return 0;
  }
}

```

<br><br>

# 练习2:
### 1. 在 examstudent 表中 插入一个新的student信息
```java
public static void main(String[] args) {

    Exer2 exer2 = new Exer2();

    Scanner scanner = new Scanner(System.in);
    System.out.print("4级 / 6级: ");
    int type = scanner.nextInt();

    System.out.print("身份证号: ");
    String IDCard = scanner.next();

    System.out.print("准考证号: ");
    String examCard = scanner.next();

    System.out.print("学生姓名: ");
    String studentName = scanner.next();

    System.out.print("所在城市: ");
    String location = scanner.next();

    System.out.print("考试成绩: ");
    int grade = scanner.nextInt();

    String sql = "insert into examstudent(type, IDCard, examCard, studentName, location, grade) values(?,?,?,?,?,?)";
    int insertCount = exer2.update(sql, type, IDCard, examCard, studentName, location, grade);

    if(insertCount > 0) {
      System.out.println("添加成功");
    } else {
      System.out.println("添加失败");
    }
  }
```


### 2. 创建一个java程序 输入身份证号 或 准考证号 可以查询到学生的基本信息

思路:
我们查询出来的是一个学生的信息 我们可以封装为一个学生的对象 JavaBean
 | - javabean
   - Student


### 要点:
1. flowId可以不设置set() 意思就是不建议修改 流水号
2. 其实就是根据用户输入的号码去查询数据库
3. 我们查询到的是一一条记录 所以可以封装为一个 javabean对象


Student的javabean
```java
package com.sam.bean;

public class Student {
  private int flowId;   // 流水号
  private int type;     // 考试类型
  private String IDCard;    // 身份证号
  private String examCard;  // 准考证
  private String name;      // 姓名
  private String location;  // 城市
  private int grade;        // 成绩

  public Student() {
  }

  public Student(int flowId, int type, String IDCard, String examCard, String name, String location, int grade) {
    this.flowId = flowId;
    this.type = type;
    this.IDCard = IDCard;
    this.examCard = examCard;
    this.name = name;
    this.location = location;
    this.grade = grade;
  }

  public int getFlowId() {
    return flowId;
  }

  public void setFlowId(int flowId) {
    this.flowId = flowId;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public String getIDCard() {
    return IDCard;
  }

  public void setIDCard(String IDCard) {
    this.IDCard = IDCard;
  }

  public String getExamCard() {
    return examCard;
  }

  public void setExamCard(String examCard) {
    this.examCard = examCard;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public int getGrade() {
    return grade;
  }

  public void setGrade(int grade) {
    this.grade = grade;
  }

  @Override
  public String toString() {
    return "Student{" +
        "flowId=" + flowId +
        ", type=" + type +
        ", IDCard='" + IDCard + '\'' +
        ", examCard='" + examCard + '\'' +
        ", name='" + name + '\'' +
        ", location='" + location + '\'' +
        ", grade=" + grade +
        '}';
  }
}

```


逻辑部分:
```java
// 我们查询出来的是一个学生的信息 我们可以封装为一个学生的对象
public static void main(String[] args) throws Exception {

  System.out.println("请选择你要输入的类型: ");
  System.out.println("a. 准考证号 ");
  System.out.println("b. 身份证号 ");

  Exer2 exer2 = new Exer2();
  Scanner scanner = new Scanner(System.in);
  String selection = scanner.next();

  if("a".equalsIgnoreCase(selection)) {
    System.out.println("请输入准考证号: ");

    // 拿到准考证号 查询数据库
    String examCard = scanner.next();

    // mysql中不区分大小写 表中的字段名可以不区分大小写 但是别名一定要和javabean中属性名保持一致
    String sql = "select FlowID flowId, Type type, IDCard, ExamCard examCard, StudentName name, Location location, Grade grade from examstudent where examCard = ?";

    Student student = exer2.getInstance(Student.class, sql, examCard);

    System.out.println(student);

    // 这里还可以根据 查询到的结果 是不是 null 做判断输出

  } else if("b".equalsIgnoreCase(selection)) {

  } else {
    System.out.println("您的输入有误, 请重新进入程序");
  }
}


public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception {

  // 获取连接
  Connection connection = JDBCUtils.getConnection();
  // 预编译sql
  PreparedStatement ps = connection.prepareStatement(sql);

  // 填充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i+1, args[i]);
  }

  // 执行并获取结果集
  ResultSet rs = ps.executeQuery();

  // 获取列数
  ResultSetMetaData rsmd = rs.getMetaData();
  int columnCount = rsmd.getColumnCount();

  // 一条数据
  if(rs.next()) {

    // **问题**: 我们创建的不知道是哪个类的对象
    // Order order = new Order();
    T t = clazz.newInstance();

    for(int i=0; i<columnCount; i++) {
      String columnLabel = rsmd.getColumnLabel(i + 1);
      Object columnValue = rs.getObject(i + 1);

      // 这里是clazz 因为clazz相当于Order 而t相当于order对象 不一样的
      Field field = clazz.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(t, columnValue);
    }
    return t;
  }

  JDBCUtils.closeResource(connection, ps, rs);
  return null;
}
```

 
### 3. 完成学生信息的删除功能
方式1:
我们先利用准考证号查到这个学生 
然后根据查询结果做判断 如果查到这个学生 那么再次与数据库交互 做删除的逻辑

但这样我们相当于与数据库进行了两次交互

```java
public static void main(String[] args) throws Exception {
  Exer2 exer2 = new Exer2();

  System.out.println("请输入学生的考号: ");
  Scanner scanner = new Scanner(System.in);
  String examCard = scanner.next();

  // 查询指定准考证号的学生
  String sql = "select FlowID flowId, Type type, IDCard, ExamCard examCard, StudentName name, Location location, Grade grade from examstudent where examCard = ?";
  Student student = exer2.getInstance(Student.class, sql, examCard);

  if(student != null) {
    String sql2 = "delete from examstudent where examCard = ?";
    int i = exer2.update(sql2, examCard);
    if(i > 0) System.out.println("删除成功");
  } else {
    System.out.println("查无此人");
  }
}
```

方式2:
我们可以直接就调用 update() 方法 有这个人就删除 没有就默默的结束 没有必要还要先去查询 

```java
public static void main(String[] args) throws Exception {
  Exer2 exer2 = new Exer2();

  System.out.println("请输入学生的考号: ");
  Scanner scanner = new Scanner(System.in);
  String examCard = scanner.next();

  String sql = "delete from examstudent where examCard = ?";

  int i = exer2.update(sql, examCard);
  if(i > 0) {
    System.out.println("删除成功");
  } else {
    System.out.println("查无此人");
  }
}
```

<br><br>

# 向数据表中插入Blob类型的数据
我们上面说过 PreparedStatement 可以操作 Blob 的数据

在 test数据库中的 customers 表中有一个字段 叫做photo 该字段的类型是 mediumblob

### mysql blob 类型
mysql中 blob是一个二进制大型对象 是一个可以存储大量数据的容器 它能容纳不同大小的数据

插入blob类型的数据必须使用 PreparedStatement 因为Blob类型的数据 无法使用字符串拼接写的

mysql的4中blob类型(除了在存储的最大信息量上不同外 没有其它的不同)

    类型            大小(字节)

    TinyBlob        最大 255

    Blob            最大 65k

    MediumBlob      最大 16m

    LongBlob        最大 4g

实际使用中根据需要存入的数据大小定义不同的blob类型


**注意：**
*如果存储的文件过大 数据库的性能会下降*

如果在指定了相关的blob类型以后 还报错: xxx too large

那么在mysql的安装目录下 找my.ini文件加上如下的配置参数

  max_allowed_packet=16M

同时注意：
修改了my.ini文件之后，需要重新启动mysql服务。


### 使用 PreparedStatement 操作 Blob类型 的数据
也就是向数据库中插入一条的数据 这条数据是包含Blob字段的
或者修改 别人的图片不好看 我们重新上传一张



### 向customers中 插入 Blob类型的字段

### 要点:
### ps.setBlob(int index, InputStream is)
参数2:
InputStream 我们对文件的内容都是以流的方式传输的
``` 
  也就是本地有一个 文件类型 的 我们会创建一个流 以流的形式来传输到数据库
```
```java
// Test下 相对路径应该是module
FileInputStream is = new FileInputStream(new File("pic.jpg"));

ps.setBlob(4, is);
```


```java
public void testInsert() throws Exception {
  
  Connection connection = JDBCUtils.getConnection();
  String sql = "insert into customers(name, email, birth, photo) values(?,?,?,?)";
  PreparedStatement ps = connection.prepareStatement(sql);
  ps.setObject(1, "琳琳");
  ps.setObject(2, "linlin@gmail.com");
  ps.setObject(3, "1986-10-22");

  // 这个字段是一个blob 我们就不能简单的填入一个变量了
  FileInputStream is = new FileInputStream(new File("pic.jpg"));
  ps.setBlob(4, is);

  ps.execute();

  JDBCUtils.closeResource(connection, ps);
}
```


### 查询 customers中 Blob类型的字段
前端的都差不多
1. 获取连接
2. 写sql 填充占位符 得到结果集

得到结果集后 我们要知道 photo字段是二进制的大对象 不可能封装到 javabean中

也就是说我们要把 能封装到javabean中的 封装为对象 blob字段单独处理 比如以流的形式 保存到本地之类的

### 要点:
1. 在得到结果集 ResultSet 对象 rs 后
我们可以通过下面的方式获取字段对应的数据 里面不仅仅能添写index 还可以添写 字段名或列的别名

    rs.getObject(index)

    rs.getObject(columnName)


2. 我们获取图片字段的使用 使用

    rs.getBlob("photo")

该方法返回的就是blob对象

### blob对象.getBinaryStream()
返回的是一个inputStream流 可以将图片以流的形式读到内存中

返回值:
InputStream


### 代码部分:
这个部分没用try catch
```java
public void testQuery() throws Exception {
  Connection connection = JDBCUtils.getConnection();
  String sql = "select id, name, email, birth, photo from customers where id = ?";
  PreparedStatement ps = connection.prepareStatement(sql);

  ps.setObject(1, 21);
  ResultSet rs = ps.executeQuery();

  if(rs.next()) {
    // 将前4个属性(name, email...)封装到Customer对象中 最后面的一个数据(photo) 以流的方式从数据库读出来

    int id = rs.getInt(1);
    String name = rs.getString(2);
    String email = rs.getString(3);
    Date birth = rs.getDate(4);
    // 还可以写列名
    // Date birth = rs.getDate("birth");

    Customer customer = new Customer(id, name, email, birth);
    System.out.println(customer);

    // photo字段 它是一个大的数据 需要以流的方式来获取
    Blob photo = rs.getBlob("photo");

    // 将这个字段下载下来 以文件的方式保存为本地图片
    InputStream is = photo.getBinaryStream();

    FileOutputStream fos = new FileOutputStream("dog.jpg");

    byte[] buf = new byte[1024];
    int len;
    while ((len = is.read(buf)) != -1) {
      fos.write(buf, 0, len);
    }

    is.close();
    fos.close();
  }

  JDBCUtils.closeResource(connection, ps, rs);
}
```


### 特殊说明:
我们上面的案例中 photo字段 声明的是 mediumblob (16m)

但是我们发向当我们把一个 1m 的图片上传到数据库都会报错
``` 
  packet for query is too large 
```  

虽然我们的类型是mediumblob 16m 但是还有一个*packet*的限制 
packet默认是1m 所以我们要修改下配置文件 这样大于1m的数据我们才能添加成功

*max_allowed_packet=16M*
上面这就 放到配置文件的最后一行就可以

https://blog.csdn.net/u011146511/article/details/107381451

<br><br>

# 批量插入数据的操作
我们上面说过 preparedstatement 还可以实现更高效的*批量操作*

操作来说无外呼就是增删改查 其中
update 和 delete 天然就具有 批量操作的效果

我们这里说说 insert 我们以前在学数据库的时候一种方式是一条条的添加 这样的话可能有些慢 接下来看看如何批量添加

我们这里说的批量操作 主要指的是批量插入

需求:
我们在数据库中造一个表 并要插入2万条数据 看看花多少时间

```sql
create table goods(
	id int PRIMARY KEY auto_increment,
	`name` varchar(25)
);

select count(*) from goods;
```

### 方式1: 使用 Statement 
一个废弃的方式 写写看看 涨涨见识
```java
Connection conn = JDBCUtils.getConnection();
Statement st = conn.createStatement();

for(int i=1; i<=20000; i++) {
  // sql放在里面了 每插入一次都要生成一次sql
  String sql = "insert into goods(name) values('name_" + i + "')";
  st.execute(sql)
}
```


### 方式2: 使用 preparedstatement 
```java
@Test
public void testInsert1() throws Exception {
  Connection connection = JDBCUtils.getConnection();

  // sql放在外面了 大家统一用的都是一个模块 只是占位符不同而已 从内存的角度来说 sql 就一份

  // 另外这毕竟是一个sql语句 sql语句在数据库执行的时候会进行校验 这个sql会被缓存下来 我们只需要填充占位符的部分就可以了
  String sql = "insert into goods(name)values(?)";

  PreparedStatement ps = connection.prepareStatement(sql);

  for(int i=1; i<=20000; i++) {
    // 只有一个占位符 所以是1
    ps.setObject(1, "name_" + i);

    // 每插入一条数据执行一次 20000次
    ps.execute();
  }

  JDBCUtils.closeResource(connection, ps);
}
```

<br><br>

# 优化: preparedstatement 的批量插入操作
```java
public void testInsert1() throws Exception {
  Connection connection = JDBCUtils.getConnection();
  String sql = "insert into goods(name)values(?)";

  PreparedStatement ps = connection.prepareStatement(sql);

  for(int i=1; i<=20000; i++) {
    ps.setObject(1, "name_" + i);
    ps.execute();
  }

  JDBCUtils.closeResource(connection, ps);
}
```

上面我们尝试使用preparedstatement进行了 2万条数据的插入 但是也不是很快 接下来我们看看怎么进行优化操作

优化:
我们在io流的时候 一开始我们使用的是
  read()

### 思考
后来我们使用 带参数的 相当于一次我们可以读一波数据 减少跟磁盘的io
  read(byte[])

我们再来看看上面代码的逻辑
每次循环 ps.execute(); 我们都跟数据库交互一次 相当于跟数据库io了20000次 所以整个逻辑执行完一共是花了80秒

```java
for(int i=1; i<=20000; i++) {
  // 填充占位符
  ps.setObject(1, "name_" + i);
  ps.execute();
}
```

那能不能不要每次填充完占位符就执行 攒一波执行一次 这也是我们要提升效率的一个方面


**注意: 批处理**
使用 batch() 但是默认mysql是不支持batch的(批处理) 我们需要同一个参数 让mysql开启批处理的支持

### mysql8.0默认支持
### 参数: 
?rewriteBatchedStatements=true 
&rewriteBatchedStatements=true 
写在配置文件url的后面

```sql
user=root
password=qwer6666

<br><br> 接在这个的后面
url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC

driverClass=com.mysql.cj.jdbc.Driver
```

### ps.addBatch()
"攒" sql

### ps.executeBatch()
执行 攒够 的sql

### ps.clearBatch()
执行完毕后 要清空batch


### 优化1: 
思路: 
利用上面的3个方法 来减少与数据库的交互次数

```java
@Test
public void testInsert2() throws Exception {
  Connection connection = JDBCUtils.getConnection();
  String sql = "insert into goods(name)values(?)";
  PreparedStatement ps = connection.prepareStatement(sql);

  for(int i=1; i<=20000; i++) {
    ps.setObject(1, "name_" + i);

    // 当我们填充完占位符后不要马上执行
    // ps.execute();

    // 1. "攒" sql
    ps.addBatch();

    // 攒到什么时候呢？ 攒够500 每隔500次执行一遍
    if(i % 500 == 0) {
      // 2. 执行 攒够 的sql
      ps.executeBatch();

      // 3. 执行完毕后 要清空batch
      ps.clearBatch();
    }
  }

  JDBCUtils.closeResource(connection, ps);
}
```


在上面的代码上继续优化: *终极方案*


### 优化2:
思考:
Connection connection = JDBCUtils.getConnection();

上面这句相当于获取了数据库的连接

当我们调用
  - ps.executeBatch();
  - 相当于我们把很多的sql语句 都执行insert了

我们在说数据库的时候 在演示 truncate table 的时候 truncate是自动的数据提交 所以在我们回滚的时候它就失效了

我们在演示 delete from 的时候 我们说 delete from 是可以实现数据库回滚的 但是前提我们要做一件事

set autocommit = false

因为默认情况下dml的增删改操作 autocommit = true 的 言外之意我们每次进行一次 dml 操作 它就自己提交了一次 我们加上 set autocommit = false 就使得 dml操作后 就不提交了

我们再看上面的代码 每到500个的时候 我们insert了一次 这时候默认的 都提交数据了 每提交一次就需要把它写死到数据库中 这个写入的过程也是需要花费时间的

```java
for(int i=1; i<=20000; i++) {
ps.setObject(1, "name_" + i);

ps.addBatch();

if(i % 500 == 0) {
  ps.executeBatch();
  ps.clearBatch();
}
```

### 解决方法:
我们在获取连接后 先不要提交 当我们把2万条数据都传完之后 再提交 

思路:
减少 提交(commit) 的次数

1. 在获取连接后 先设置 不允许自动提交
connection.setAutoCommit(false);

2. 跟数据库交互完毕后
connection.commit();

```java
@Test
public void testInsert3() throws Exception {
  Connection connection = JDBCUtils.getConnection();

  // 设置不允许自动提交数据
  connection.setAutoCommit(false);


  String sql = "insert into goods(name)values(?)";
  PreparedStatement ps = connection.prepareStatement(sql);

  for(int i=1; i<=20000; i++) {
    ps.setObject(1, "name_" + i);

    // 1. "攒" sql
    ps.addBatch();

    // 每隔一波 执行一次
    if(i % 500 == 0) {
      // 2. 执行 攒够 的sql
      ps.executeBatch();

      // 3. 执行完毕后 要清空batch
      ps.clearBatch();
    }
  }


  // 统一提交所有数据(2万条)
  connection.commit();


  JDBCUtils.closeResource(connection, ps);
}
```

<br><br>

# PreparedStatement vs Statement

代码的可读性和可维护性。

**PreparedStatement 能最大可能提高性能：**
  - DBServer会对**预编译**语句提供性能优化。因为预编译语句有可能被重复调用，所以<u>语句在被DBServer的编译器编译后的执行代码被缓存下来，那么下次调用时只要是相同的预编译语句就不需要编译，只要将参数直接传入编译过的语句执行代码中就会得到执行。</u>
  - 在statement语句中,即使是相同操作但因为数据内容不一样,所以整个语句本身不能匹配,没有缓存语句的意义.事实是没有数据库会对普通语句编译后的执行代码缓存。这样<u>每执行一次都要对传入的语句编译一次。</u>
  - (语法检查，语义检查，翻译成二进制命令，缓存)

PreparedStatement 可以防止 SQL 注入 


### Statement操作数据表存在弊端：

  - **问题一：存在拼串操作，繁琐**
  - **问题二：存在SQL注入问题**

SQL 注入是利用某些系统没有对用户输入的数据进行充分的检查，而在用户输入数据中注入非法的 SQL 语句段或命令(如：SELECT user, password FROM user_table WHERE user='a' OR 1 = ' AND password = ' OR '1' = '1') ，从而利用系统的 SQL 引擎完成恶意行为的做法。

对于 Java 而言，要防范 SQL 注入，只要用 PreparedStatement(从Statement扩展而来) 取代 Statement 就可以了。

<br><br>

# 什么时候 try catch 什么时候 throws
情况:
我们在整个的操作中先后要执行好几个方法 每一个方法中可能都会出现一些异常 建议这几个方法中的异常都throws

``` 
    method1
    ------
    |    |   - throws
    ------


    method2
    ------
    |    |   - throws    3个方法统一 t - c
    ------


    method3
    ------
    |    |   - throws
    ------
```

这样能保证其中的一个方法出现异常后 我们可以直接到 catch这 后面的两个方法就不执行了

因为这3个方法都是递进操作的 前一个出问题了 后面本身也不应该执行的

所以我们就不要在这几个方法中try catch 要是我们使用 try catch的话 异常被我们catch住了 就没有办法通知外面了

我们的JDBCUtils.getConnect()也是这个逻辑 该方法里面选择throws 然后在测试方式里面 统一使用try catch来操作

<br><br>

# 数据库的事务

  | - com.sam.transaction
    - TransactionTest

我们先来观察个问题
test数据库下的user_table表:

  user    password    balance

  AA      123456      1000
  BB      654321      1000
  CC      abcd        2000
  DD      abcde       3000

其中 AA 和 BB 的balance各是1000 现在我们要做一个操作 AA -> BB 转账100
``` 
  这里涉及到两个Update操作
  AA -> update  1000-100
  BB -> update  1000+100
```

这里我们说 AA的update操作 和 BB的update操作 要作为整体出现 要么它们都执行 要么就都别执行 不能分开
``` 
  AA把钱扣了 BB还没有收到
```

\\ 这就是事务的问题

### 代码演示:
```java
@Test
public void testUpdate() {
  String sqlAA = "update user_table set balance = balance - 100 where user = ?";
  update(sqlAA, "AA");

  // 模拟网络异常
  System.out.println(10 / 0);

  String sqlBB = "update user_table set balance = balance + 100 where user = ?";
  update(sqlBB, "BB");

  System.out.println("转账成功");
}
```

上面就是转账的逻辑 但是我们要保证两个update操作要么都执行 要么都不执行 这就是事务 以及 事务的处理原则

上面我们模拟了下网络异常:
AA执行了update操作 -100 变成了 900
然后碰到了异常 后续的程序终止
BB还是1000 没增

这时候正常我们应该让 AA update 操作回滚一下 保证AA的钱还能再回来


### 数据库事务介绍
事务：
*一组逻辑操作单元*, 使数据从一种状态变换到另一种状态。
``` 
  一组逻辑操作单元:
    - 一个或多个dml操作 就是增删改的操作
    - 比如我们上面的例子中的操作 就构成了一个事务

  使数据从一种状态变换到另一种状态
    - AA 1000 -> 900
    - BB 1000 -> 1100
```


### 事务处理的原则
保证所有事务都作为一个工作单元来执行，即使出现了故障，都不能改变这种执行方式。当在一个事务中执行多个操作时

要么所有的事务都**被提交(commit)**，那么这些修改就永久地保存下来；

要么数据库管理系统将放弃所作的所有修改，整个事务**回滚(rollback)**到最初状态。

**一个事务中的DML操作要么都执行 要么都不执行**


结合上面说的 我们看看上面的代码 怎么进行事务的处理
```java
@Test
public void testUpdate() {
  String sqlAA = "update user_table set balance = balance - 100 where user = ?";
  update(sqlAA, "AA");
  
  // 模拟网络异常 导致转账在这失败
  System.out.println(10 / 0);

  String sqlBB = "update user_table set balance = balance + 100 where user = ?";
  update(sqlBB, "BB");

  System.out.println("转账成功");
}
```

上面的代码 想要进行事务的处理有困难
我们在说数据库的时候也说过 回滚也是回滚到最近的一次commit之后

现在要想 在出现异常后 回滚到 下面语句之前
  - update(sqlAA, "AA");

那么我们就要保证update(sqlAA, "AA")操作之后不要提交
``` 
  因为数据一旦提交就可回滚

  操作1 del
      --- commit
  操作2 del
  操作3 del
      --- rollback

  现在我们要进行回滚 只能回到 操作2的上面
  也就是操作 2 3 能够复原 但是操作1 不能复原了

  --- 

  结合上面的示例代码 我们要保证
  update(sqlAA, "AA")
      --- 在这里不能 commit
  update(sqlBB, "BB")
```


既然数据一旦提交 就不能回滚了 那哪些操作会导致数据的自动提交？

### 1. DDL操作: 
  - 一旦执行 都会自动提交(设置 set autocommit 也没有用)


### 2. DML操作: 
  - 默认情况下 一旦执行 就会自动提交
  - set autocommit = false
  - 取消DML操作的自动提交


### 3. 默认关闭连接的时 会自动提交数据
比如我们上面做了n多的操作 一直没有提交 但当我们关闭连接的时候 上面的操作都会提交


也就是说 我们要保证回滚成功上面的3条都不能做
1. 我们上面的事务逻辑中没有涉及到 DDL 操作
2. 我们要进入update()里面 加上 set autocommit = false 的逻辑
3. 当我们执行完update()操作后 连接不要关
``` 
  update()里面 我们开始 造了一个连接
  connection = JDBCUtils.getConnection();

  然后执行完操作后我们就给关了
  finally {
    JDBCUtils.closeResource(connection, ps);
  }

  这里要是关了 就没有办法进行数据回滚了

  相当于我们要用一个连接将 AA-100 BB+100的操作完成
```


### update()中现在的逻辑
每一次update操作都是 先获取(造)连接然后关闭连接

    ----------
    获取连接

    update操作 -- AA-100

    关闭连接
    ----------

    ----------
    获取连接

    update操作 -- BB+100

    关闭连接
    ----------


### update()中应该的逻辑
相当于我们用一个连接操作一个事务逻辑 这样如果出现错误在一个连接中还能回滚

    ----------
    获取连接

    update操作 -- AA-100

    update操作 -- BB+100

    关闭连接
    ----------


### update() -- 考虑事务后的代码实现
update()部分的代码
我们把原先获取连接的逻辑 删掉了 哪里用update 哪里再造一个连接对象传递进来

要点:
1. 我们新增了一个参数 connection 我们在调用update()方法的时候 传递进去一个连接

```java
public int update(Connection connection, String sql, Object ...args) {
  PreparedStatement ps = null;
  try {
    // 1.
    ps = connection.prepareStatement(sql);
    for(int i = 0; i < args.length; i++) {
      // 2.
      ps.setObject(i + 1, args[i]);
    }
    // 3.
    return ps.executeUpdate();

  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 4.
    // 因为连接是从外面传递进来的 连接不要关 第一个参数传入null 什么时候造的 统一进行关闭
    JDBCUtils.closeResource(null, ps);
  }

  return 0;
}
```


测试转账的代码
### 要点:
### 1. 在调用update()方法之前 先造一个连接 将连接传入update()方法中

### 2. 获取到连接后 通过连接对象调用方法
取消数据的自动提交
connection.setAutoCommit(false);
``` 
  sout(connection.getAutoCommit());
  // 可以检查下 它的状态
```

### 3. 逻辑完成(转账成功)后 再提交
connection.commit();

### 4. 当出现异常的时候我们要回滚数据
也就是当出现类似网络异常的时候 会进入到catch
所以我们要在catch的逻辑里面 调用方法 回滚数据
connection.rollback();


### 5. 关闭connection之前 恢复commit的状态
connection.setAutoCommit(true);
``` 
  因为后期我们不是自己造一个连接 传入update()方法里面 而是从数据库连接池中取一个连接使用

  因为考虑到事务 我们在获取连接后会
  connection.setAutoCommit(false);

  当我们做connection关闭操作的时候 并不是真正的关闭 而是将其还回连接池 所以我们在还回连接池前 将连接的commit的状态要改回去
```

### 6. 转账成功后 关闭connection

```java
@Test
public void testUpdateWithTx() {
  Connection connection = null;
  try {
    // 获取连接
    connection = JDBCUtils.getConnection();

    // 获取连接对象后 取消数据的自动提交
    connection.setAutoCommit(false);

<br><br> 转账的逻辑
    String sqlAA = "update user_table set balance = balance - 100 where user = ?";
    update(connection, sqlAA, "AA");

    // 模拟网络异常 导致转账在这失败
    System.out.println(10 / 0);

    String sqlBB = "update user_table set balance = balance + 100 where user = ?";
    update(connection, sqlBB, "BB");
<br><br>

    System.out.println("转账成功");

    // 逻辑完成(转账成功)后 再提交
    connection.commit();

  } catch (Exception e) {
    e.printStackTrace();

    // 当出现异常的时候我们要回滚数据 rollback()有异常我们再try catch下
    try {
      connection.rollback();
    } catch (SQLException ex) {
      ex.printStackTrace();
    }

  } finally {
    // 关闭连接之前 恢复commit的状态 主要针对使用数据库连接池的使用
      try {
        connection.setAutoCommit(true);
      } catch (SQLException e) {
        e.printStackTrace();
      }

    // 关闭资源 参数2为空 我们仅需要关闭 connection
    JDBCUtils.closeResource(connection, null);
  }
}
```

### 总结
数据一旦提交，就不可回滚。
数据什么时候意味着提交？
**当一个连接对象被创建时，默认情况下是自动提交事务**：每次执行一个 SQL 语句时，如果执行成功，就会向数据库自动提交，而不能回滚。

**关闭数据库连接，数据就会自动的提交。**如果多个操作，每个操作使用的是自己单独的连接，则无法保证事务。即同一个事务的多个操作必须在同一个连接下。
**JDBC程序中为了让多个 SQL 语句作为一个事务执行：**

调用 Connection 对象的 **setAutoCommit(false);** 以取消自动提交事务

在所有的 SQL 语句都成功执行后，调用 **commit();** 方法提交事务

在出现异常时，调用 **rollback();** 方法回滚事务


**建议:**
若此时 Connection 没有被关闭，还可能被重复使用，则需要恢复其自动提交状态 setAutoCommit(true)。尤其是在使用数据库连接池技术时，执行close()方法前，建议恢复自动提交状态。


### 总结：
考虑到事务 就意味着 一个连续的操作要保证要么一起提交成功 要么一起都失败

为了保证这个原则 我们就要注意
1. 保证连续操作在 获取链接 -- 关闭连接 之间
2. 获取链接收 取消自动提交 在连续操作后手动统一提交 发生错误的时候手动回滚 等操作
``` 
  -----------
    获取链接

        ← 连续的操作

    关闭连接
  -----------
```

为了满足这点 通用的 update() 方法里面不能关闭连接
我们要在 调用连续的update() 方法之前获取链接 连续的操作后 在关闭连接
```java
// 在连续的操作前 获取链接
Connection connection = JDBCUtils.getConnection();
connection.setAutoCommit(false);

... 连续操作

// 操作结束后 手动提交
connection.commit();
catch (Exception e) {
  // 出现错误的时候 手动回滚
  connection.rollback();
}
finally {
  // 关闭连接前 回复原样
  connection.setAutoCommit(true);

  // 最后统一关闭连接
  JDBCUtils.closeResource(connection, null);
}
```

<br><br>

# 事务的ACID属性 - 4大属性

### 1. 原子性（Atomicity）
原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。 

<br><br> 

### 2. 一致性（Consistency）
事务必须使数据库从一个一致性状态变换到另外一个一致性状态。

<br><br> 

### 3. 隔离性（Isolation）
事务的隔离性是指一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。
``` 
  隔离性类似于java基础中的多线程 我们操作共享数据的时候 有说到线程的安全问题 一个线程还没有操作完共享数据 另外一个线程就来操作了 就会导致数据的安全性问题 当时我们说要使用同步机制来解决线程安全问题

  隔离性有些类似 比如我们现在有一张表 现在好几个用户都用权限操作这张表 都有可能进行dml操作 当一个用户还没有操作完呢 别的事务就过来了 这时候就需要保证我们的操作要具有一定的隔离性 在数据库中的高并发场景下 这是很常见的

  那能不能在我操作的时候 使用类似同步方法将数据表锁起来？ 锁起来的话 隔离性特别好但是并发性就极差了 一个事务在操作 其它的事务都要等着

  所以在数据库这块 我们对隔离性 提供了4中隔离的级别
```

### 数据库的并发问题

对于同时运行的多个事务, 当这些事务访问数据库中相同的数据时, 如果没有采取必要的隔离机制, 就会导致各种并发问题:

我们可以把下面的 T1 T2 理解为两个线程

### 问题1:  **脏读**: 
对于两个事务 T1, T2
T1读取了已经被T2更新 但还**没有被提交**的字段。
之后, 若 T2 回滚, T1读取的内容就是临时且无效的。
``` 
  T1读表中的一个字段 比如是1
  T2对表中的改字段进行了修改 1 -> 2

  T2虽然修改了该字段 但是T2还没有提交 也就是2是临时的
  但是T在读的时候 还把2读出来了

  这种情况叫脏读 因为这种没有提交的数据是不应该被读到的 这种情况一定是要解决的(所以没有一个数据库使用隔离级别1)
```

### 问题2:  **不可重复读**: 
对于两个事务T1, T2
T1 读取了一个字段, 然后 T2 **更新**了该字段。
之后, T1再次读取同一个字段, 值就不同了。
``` 
  我们有一张表 表中有一个数据 为1
  T1读表中的这个数据 将1读取出来了

  T2对表中的数据进行了修改 1 -> 2
  T2还提交了这次修改 

  提交之后按理说数据库就应该写入了
  T1假如还没有关闭事务 当没有关闭事务再去读的时候 发现原来是1 现在变成2了

  有点类似于我们在购物网站买商品 库存为1 然后我们的连接还没有断开的情况下 我们刷新了页面 发现库存从1变成100了 说白了后台增加库存了 我们会想怎么两次数据不一样了

  这种不一样的情况称之为不可重复读

  这种情况不挺正常么 所以我们在使用数据库的时候 都没有解决不可重复读 我们认为这个事儿是正常的

  隔离级别3就解决了不可重复读
  解决了是什么效果?

  表中有条数据是1
  T1读取了表中的这个数据
  T2将数据修改为2 T2还commit了 然后数据库写入了 彻底变成了2
  T1事务没有关闭的时候 重新再查 还是1 只要在事务内T1查询都是1 除非我们关闭事务 重新再开新的事务了 再去查 查到的才是2

  也就是说 只要T1还在事务中 我们还占用了对表的操作 即使别人提交commit了 我们再查还是1
```

### 问题3:  **幻读**:
对于两个事务T1, T2, 
T1 从一个表中读取了一个字段, 然后 T2 在该表中**插入**了一些新的行。
之后, 如果 T1 再次读取同一个表, 就会多出几行。
``` 
  T1查询了一张表中有10条数据
  T2对这张表进行插入操作 插入了5条

  T1再去查发现变成15条了 跟出现了幻觉一样 这就是幻读

  隔离级别4把幻读也解决了
  其实我们觉得 不可重复读和幻读都是正常的
  不可重复度 针对 update 操作
  幻读 针对 insert 操作
```


**数据库事务的隔离性**: 
数据库系统必须具有隔离并发运行各个事务的能力, 使它们不会相互影响, 避免各种并发问题。

一个事务与其他事务隔离的程度称为隔离级别。数据库规定了多种事务隔离级别, 不同隔离级别对应不同的干扰程度, **隔离级别越高, 数据一致性就越好, 但并发性越弱。**


### 总结
我们只需要解决脏读就可以了 别的事务没有提交的数据不要读取 读取到也不合适 因为它是临时的数据 因为别的事务随时可能回滚 毕竟没有提交 所以最好不要让用户看到脏读的数据


### 4种隔离性的级别:
4种隔离级别针对它想解决的问题不一样 问题就是上面的3种问题

### 1. read uncommitted(读未提交数据)
允许事务读取未被其它事务提交的变更 脏读 不可重复读和幻读的问题都会出现
``` 
  上面的3种问题 一个都没解决
```

### 2. read committed(读已提交数据)  -- 可取
只允许事务读取已经被其它事务提交的变成 可以避免脏读 但不可重复度和幻读问题仍然可能出现
``` 
  该级别解决了 脏读的问题
```

### 3. repeatable read(可重复读)
确保事务可以多次从一个字段中读取相同的值 在这个事务持续期间 禁止其他事务对这个字段进行更新 可以避免脏读和不可重复读 但幻读的问题仍然存在
``` 
  该级别解决了 脏读 和 不可重复读的问题
```

### 4. serializable(串行化)
确保事务可以从一个表中读取相同的行 在这个事务持续期间 禁止其他事务对该表执行插入 更新 和 删除操作 所有并发问题都可以避免 但性能十分低下
``` 
  该级别解决了 上面的3种问题
```


### 一般我们不会选1 4级别 我们会从2 3当中选

### Oracle 支持的 2 种事务隔离级别：
**READ COMMITED**, SERIALIZABLE。 

Oracle 默认的事务隔离级别为: **READ COMMITED** 。
``` 
  该级别解决了 脏读的问题
```


### Mysql 支持 4 种事务隔离级别。
Mysql 默认的事务隔离级别为: **REPEATABLE READ。**
``` 
  该级别解决了 脏读 和 不可重复读的问题
```

<br><br> 

### 4. 持久性（Durability）
持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来的其他操作和数据库故障不应该对其有任何影响。

<br><br>


# 在MySql中设置隔离级别

每启动一个 mysql 程序, 就会获得一个单独的数据库连接. 每个数据库连接都有一个全局变量 @@tx_isolation, 表示当前的事务隔离级别。

### 查看当前的隔离级别: 
```sql
SELECT @@tx_isolation;
```

### 设置当前 mySQL 连接的隔离级别:  
```sql
set transaction isolation level read committed;
```

### 设置数据库系统的全局的隔离级别:
```sql
set global transaction isolation level read committed;
```

**注意:**
设置完后要关闭当前数据库的连接 再连接

<br><br>

# 命令行验证 mysql 的隔离级别
现在我们的数据库里只有一个用户 root 用户
我们要再创建一个用户 两个用户各自用一个事务去操作数据库中某一个表中的数据

### 数据库中 创建一个新的用户
```sql
create user 用户名 identified by '密码';

<br><br> 示例
create user tom identified by 'abc123';
```

这样我们就可以在两个终端中 以root用户 和 tom用户来登录数据库
```sql
mysql -utom -pabc123
```

```sql
mysql -uroot -pabc123
```

### 给新创建的用户分配权限
上面刚创建的tom用户 使用 show databases; 查看数据口后 发现很多数据库都看不见 也就是说tom用户的权限是不够的

我们可以通过系统用户给tom用户 赋予权限

```sql
<br><br> 将 select,insert,delete,update 操作 atguigudb.* 数据库下所有的表 的权限 给 tom@localhost
grant select,insert,delete,update on atguigudb.* to tom@localhost identified by 'abc123'; 


<br><br> 全部权限的设置方式
<br><br> 授予通过网络方式登录的tom用户，对所有库所有表的全部权限，密码设为abc123.
grant all privileges on *.* to tom@'%'  identified by 'abc123'; 
```

怎么保证事务不会断(一致处于开着的状态) 还是用 set autocommit = false 这样事务就处于不会关闭的状态

在命令行执行 commit 操作 一提交 相当于一次事务就结束了

也就是说在数据库中 一条语句的查询就是一次事务

<br><br>

# Java层面 演示并设置数据库的隔离级别

### 查询当前数据库的隔离级别
### connection.getTransactionIsolation()
返回值:
int

```java
Connection connection = JDBCUtils.getConnection();

// 查询当前数据库的隔离级别
int isolation = connection.getTransactionIsolation();

System.out.println(isolation);
// 这台电脑的隔离级别是 4
```

### 1: read uncommitted(读未提交数据)
``` 
  上面的3种问题 一个都没解决(脏读 不可重复读和幻读)
```


### 2: read committed(读已提交数据)  -- 可取
``` 
  该级别解决了 脏读的问题
```

### 3: repeatable read(可重复读)
``` 
  该级别解决了 脏读 和 不可重复读的问题
```

### 4: serializable(串行化)
``` 
  该级别解决了 上面的3种问题
```


### 设置数据库的隔离级别
### connection.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
假如我们当前数据库的隔离级别是3
这里我们用代码修改为2 修改的是当前的链接

参数:
int型的值
或者 常量值


### 通用的查询操作 返回一条记录 -- 考虑事务后的
```java
public <T> T getInstance(Connection connection, Class<T> clazz, String sql, Object ...args) {
  PreparedStatement ps = null;
  ResultSet rs = null;

  try {
    // 预编译sql
    ps = connection.prepareStatement(sql);

    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i+1, args[i]);
    }

    // 执行并获取结果集
    rs = ps.executeQuery();

    // 获取列数
    ResultSetMetaData rsmd = rs.getMetaData();
    int columnCount = rsmd.getColumnCount();

    // 一条数据
    if(rs.next()) {

      // **问题**: 我们创建的不知道是哪个类的对象
      // Order order = new Order();
      T t = clazz.newInstance();

      for(int i=0; i<columnCount; i++) {
        String columnLabel = rsmd.getColumnLabel(i + 1);
        Object columnValue = rs.getObject(i + 1);

        // 这里是clazz 因为clazz相当于Order 而t相当于order对象 不一样的
        Field field = clazz.getDeclaredField(columnLabel);
        field.setAccessible(true);
        field.set(t, columnValue);
      }
      return t;
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(null, ps, rs);
  }

  return null;
}
```

### 开始演示
我们当前的数据库的隔离级别是 
我们创建了两个测试方法 这两个测试方法相当于两个线程 用来负责针对同一张表的同一条数据进行 查询 和 修改

```java
// 演示一条事务
@Test
public void testTransactionSelect() {

}
// 演示另一条事务
@Test
public void testTransactionUpdate() {

}
```

测试代码:
```java
// 演示一条事务
@Test
public void testTransactionSelect() throws Exception {

  // 查询操作
  Connection connection = JDBCUtils.getConnection();

  // 查询当前数据库的隔离级别
  int isolation = connection.getTransactionIsolation();
  System.out.println(isolation);

  // 禁止自动提交 保证我们的查询在事务中 保证当前事务没有断
  connection.setAutoCommit(false);

  String sql = "select user, password, balance from user_table where user = ?";
  User user = getInstance(connection, User.class, sql, "CC");

  System.out.println(user);
}


// 演示另一条事务
@Test
public void testTransactionUpdate() throws Exception {
  // 更新操作
  Connection connection = JDBCUtils.getConnection();
  connection.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
  // 禁止自动提交 保证我们的查询在事务中 保证当前事务没有断
  connection.setAutoCommit(false);

  String sql = "update user_table set balance = ? where user = ?";
  update(connection, sql, 5000, "CC");

  Thread.sleep(15000);
  System.out.println("修改结束");
}
```

<br><br>

# 提供操作数据表的 BaseDAO
我们在书城项目的时候还没有涉及到框架 也就是说这个部门的操作都是基于JDBC来连接数据库

我们会将各种查询数据库的方法 封装成DAO

  | - com.sam.dao
    - BaseDAO


### BaseDAO
基础的DAO 这个DAO主要作为父类出现的
作用:
封装了针对数据表的通用操作 也就是考虑到事务后的增删改查

比如:
我们会在BaseDAO中 定义如下的方法:

### 1. update() 增删改操作
```java
// 包含事务: 增删改
public int update(Connection connection, String sql, Object ...args) throws SQLException {
  PreparedStatement ps = null;
  try {
    ps = connection.prepareStatement(sql);
    for(int i=0; i<args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }

    return ps.executeUpdate();
  } catch (SQLException e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(null, ps);
  }

  return 0;
}
```


### 2. query()  查询操作 查询一个对象
```java
// 包含事务: 查询一条记录 返回一个对象
public <T> T getInstance(Connection connection, Class<T> clazz, String sql, Object ...args) {
  PreparedStatement ps = null;
  ResultSet rs = null;
  try {
    ps = connection.prepareStatement(sql);
    for(int i=0; i<args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }

    rs = ps.executeQuery();
    ResultSetMetaData rsmd = rs.getMetaData();

    int columnCount = rsmd.getColumnCount();
    if(rs.next()) {
      T t = clazz.newInstance();

      for (int i=0; i<columnCount; i++) {
        String columnLabel = rsmd.getColumnLabel(i+1);
        Object columnValue = rs.getObject(i+1);

        Field field = clazz.getDeclaredField(columnLabel);
        field.setAccessible(true);
        field.set(t, columnValue);
      }
      return t;
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(null, ps, rs);
  }
  return null;
}
```

### 3. queryList()  查询操作 查询多个个对象
```java
// 包含事务: 查询多条记录 返回多条记录构成的集合
public <T> List<T> getForList(Connection connection, Class<T> clazz, String sql, Object ...args) {
  PreparedStatement ps = null;
  ResultSet rs = null;
  ArrayList<T> list = null;

  try {
    // 预编译sql
    ps = connection.prepareStatement(sql);

    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i+1, args[i]);
    }

    // 执行并获取结果集
    rs = ps.executeQuery();

    // 获取列数
    ResultSetMetaData rsmd = rs.getMetaData();
    int columnCount = rsmd.getColumnCount();

    // 创建一个承装对象的结合
    list = new ArrayList<>();


    // 多条记录
    while(rs.next()) {
      // 循环中 每次都创建一个t对象
      T t = clazz.newInstance();

      // 通过 for 将t对象的所有的属性都附上值了
      for(int i=0; i<columnCount; i++) {
        String columnLabel = rsmd.getColumnLabel(i + 1);
        Object columnValue = rs.getObject(i + 1);

        Field field = clazz.getDeclaredField(columnLabel);
        field.setAccessible(true);
        field.set(t, columnValue);
      }

      // 把对象添加到集合中
      list.add(t);
    }

    // while循环结束后
    return list;

  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(null, ps, rs);
  }

  return null;
}
```

### 4. 返回表中有多少条数据呀 类似组函数的特殊需求
比如:
select count(*) from ...
select Max(*) from ...

```java
// 先定义为 void 因为是通用的父类 我们定义的方法 也不知道子类到底要获取什么

// 不写 void 写什么? 比如count(*) 返回值是int Max(date) 返回值是个日期 不确定 所以我们使用泛型

public <E> E getValue(Connection connection, String sql, Object ...args) {

  PreparedStatement ps = null;
  ResultSet rs = null;
  try {
    ps = connection.prepareStatement(sql);
    for (int i=0; i<args.length; i++) {
      ps.setObject(i+1, args[i]);
    }

    rs = ps.executeQuery();
    // 对于特殊需求的来讲 我们只会查出来一列数据 比如 count(*)
    if(rs.next()) {
      // 得到这一列数据 需要强转下
      return (E)rs.getObject(1);
    }
  } catch (SQLException e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(null, ps, rs);
  }

  return null;
}
```

BaseDAO就写完了 回头我们不会造这个类的对象 它的作用只是给我们提供通用的方法 既然不造对象 所以我们可以把BaseDAO设置为抽象类 虽然里面没有抽象方法 但是表示就是不能造对象了


该类的完整代码:
```java
package com.sam.dao;

import com.sam.utils.JDBCUtils;

import java.lang.reflect.Field;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public abstract class BaseDAO  {
  // 包含事务: 增删改
  public int update(Connection connection, String sql, Object ...args) {
    PreparedStatement ps = null;
    try {
      ps = connection.prepareStatement(sql);
      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      return ps.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps);
    }

    return 0;
  }


  // 包含事务: 查询一条记录 返回一个对象
  public <T> T getInstance(Connection connection, Class<T> clazz, String sql, Object ...args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      ps = connection.prepareStatement(sql);
      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      rs = ps.executeQuery();
      ResultSetMetaData rsmd = rs.getMetaData();

      int columnCount = rsmd.getColumnCount();
      if(rs.next()) {
        T t = clazz.newInstance();

        for (int i=0; i<columnCount; i++) {
          String columnLabel = rsmd.getColumnLabel(i+1);
          Object columnValue = rs.getObject(i+1);

          Field field = clazz.getDeclaredField(columnLabel);
          field.setAccessible(true);
          field.set(t, columnValue);
        }
        return t;
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }
    return null;
  }

  // 包含事务: 查询多条记录 返回多条记录构成的集合
  public <T> List<T> getForList(Connection connection, Class<T> clazz, String sql, Object ...args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    ArrayList<T> list = null;

    try {
      // 预编译sql
      ps = connection.prepareStatement(sql);

      // 填充占位符
      for(int i=0; i<args.length; i++) {
        ps.setObject(i+1, args[i]);
      }

      // 执行并获取结果集
      rs = ps.executeQuery();

      // 获取列数
      ResultSetMetaData rsmd = rs.getMetaData();
      int columnCount = rsmd.getColumnCount();

      // 创建一个承装对象的结合
      list = new ArrayList<>();


      // 多条记录
      while(rs.next()) {
        // 循环中 每次都创建一个t对象
        T t = clazz.newInstance();

        // 通过 for 将t对象的所有的属性都附上值了
        for(int i=0; i<columnCount; i++) {
          String columnLabel = rsmd.getColumnLabel(i + 1);
          Object columnValue = rs.getObject(i + 1);

          Field field = clazz.getDeclaredField(columnLabel);
          field.setAccessible(true);
          field.set(t, columnValue);
        }

        // 把对象添加到集合中
        list.add(t);
      }

      // while循环结束后
      return list;

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }

    return null;
  }


  // 先定义为 void 因为是通用的父类 我们定义的方法 也不知道子类到底要获取什么
  // 不写 void 写什么? 比如count(*) 返回值是int Max(date) 返回值是个日期 不确定 所以我们使用泛型
  public <E> E getValue(Connection connection, String sql, Object ...args) {

    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      ps = connection.prepareStatement(sql);
      for (int i=0; i<args.length; i++) {
        ps.setObject(i+1, args[i]);
      }

      rs = ps.executeQuery();
      // 对于特殊需求的来讲 我们只会查出来一列数据 比如 count(*)
      if(rs.next()) {
        // 得到这一列数据 需要强转下
        return (E)rs.getObject(1);
      }
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }

    return null;
  }
}
```


**注意: count(*)**
我们上面还定义了一个 返回一列数据的方法 getValue
比如我们会想返回表中一共有多少条数据 count(*)
count(*) 返回值的类型是 long 型 

<br><br>

# CustomerDAO 及 CustomerDAOImpl的实现
上面我们创建了BaseDAO 它只是用来提供基本的方法
而具针对于具体的表(Customer表 Order表) 我们提供具体的DAO 而具体的DAO中我们使用的是 BaseDAO 中的增删改查的方法

既然是具体的DAO 按说我们直接new一个class 让它直接继承BaseDAO就可以了

但是我们从后续的逻辑上来看的话 我们可以让代码的结构更加的规范一些 我们先造一个接口

接口是定义一种规范的

### BaseDAO -- 抽象类
该抽象类中封装了操作数据库的增删改查的通用方法
我们需要调用这些方法来完成操作数据库的逻辑

### CustomerDAO -- 接口
每一个具体的表 都应该有一个相对应的接口
比如我们有 customers表 那么就应该有 customerDAO接口

该接口的作用:
我们要考虑针对于 具体的表(customers表)会有什么样的操作 把这些操作定义为抽象方法
``` 
  (该接口中要想针对customers表我们能做什么事儿呢)
```

用于规范针对于customers表的常用操作 每张表的操作可能都不一样 主要是看我们做的项目在浏览器端我们需要呈现哪些特殊的值 有什么样的述求 我们在接口中就规范对应的功能
``` 
  该接口的实现类 在实现该接口的方法内部 调用的还是BaseDAO的方法去完成具体的逻辑
```

比如针对customer表我们就想提供如下的功能
1. 将 一个对象(一条数据) 添加到数据库中

2. 根据指定的id删除表中的一条记录

3. 把指定id的记录 修改为新的对象

4. 查询 根据指定的id查询 得到对应的Customer对象
解释：
``` 
  比如Java层面有一个customer对象里面是最新的数据 我们要根据customer对象id去找到数据库表中的记录 将其修改为我们java层面customer对象中的最新数据
  
  针对内存中的customer对象 去修改数据表中的指定记录 我们可以根据customer.id去找数据库中的指定记录
```

5. 查询表中的所有记录

6. 查询表中有多少条记录
要点:
  - 注意我们拿的是Long来接收count(*) 因为表中的记录可能非常的多

7. 返回数据表中最大的生日
要点:
  - sql下的Date
  - 2010 和 1986 我们说的最大就是比数 所以是2010

### 接口中的代码:
**要点:**
每一次查询我属于一条事务 所以我们每一个操作都将 connection 传递进去
因为一个连接可能要做好几个事儿 以一个事务出现的

外面利用connection对象来进行关闭自动commit commit提交 以及rollback回滚等逻辑

```java
package com.sam.dao;

import com.sam.bean.Customer;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;

public interface CustomerDao {
  // 插入一条数据 将customer对象添加到数据库中
  void insert(Connection connection, Customer customer);

  // 根据指定的id删除表中的一条记录
  void deleteById(Connection connection, int id);

  // 把指定id的记录 修改为新的对象
  void update(Connection connection, Customer customer);

  // 查询 根据指定的id查询 得到对应的Customer对象
  Customer getCustomerById(Connection connection, int id);

  // 查询表中的所有记录
  List<Customer> getAll(Connection connection);

  // 查询表中有多少条记录
  Long getCount(Connection connection);

  // 返回数据表中最大的生日
  Date getMaxBirth(Connection connection);
}

```


### CustomerDAOImpl实现类
接口创建完了 我们要提供该接口的具体的实现类了
CustomerDAOImpl
我们要让CustomerDAOImpl继承BaseDAO实现CustomerDAO接口
``` 
  这样我们就有了BaseDAO中定义的与数据库进行交互的方法 也有了CustomerDAOImpl接口中规范的功能
```

该实现类中需要完成的逻辑是 写具体的代码完成对应的功能 比如我们需要提供具体的sql语句等 然后调用该实现类方法的人只需要传入参数(不需要提供sql语句)就能完成功能

框架代码:
```java
package com.sam.dao;

import com.sam.bean.Customer;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;

public class CustomerDAOImpl extends BaseDAO implements CustomerDao {
  @Override
  public void insert(Connection connection, Customer customer) {
    // 在方法体内部使用 BaseDAO 定义的通用的增删改查等方法 操作数据库
  }

  @Override
  public void deleteById(Connection connection, int id) {
    // 在方法体内部使用 BaseDAO 定义的通用的增删改查等方法 操作数据库
  }

  @Override
  public void update(Connection connection, Customer customer) {
    // 在方法体内部使用 BaseDAO 定义的通用的增删改查等方法 操作数据库
  }

  @Override
  public Customer getCustomerById(Connection connection, int id) {
    // 在方法体内部使用 BaseDAO 定义的通用的增删改查等方法 操作数据库
    return null;
  }

  @Override
  public List<Customer> getAll(Connection connection) {
    // 在方法体内部使用 BaseDAO 定义的通用的增删改查等方法 操作数据库
    return null;
  }

  @Override
  public Long getCount(Connection connection) {
    // 在方法体内部使用 BaseDAO 定义的通用的增删改查等方法 操作数据库
    return null;
  }

  @Override
  public Date getMaxBirth(Connection connection) {
    // 在方法体内部使用 BaseDAO 定义的通用的增删改查等方法 操作数据库
    return null;
  }
}
```


填充具体逻辑后的代码:
实现类的方法一般看来都要求传递进来一个customer对象 或者具体的id

```java
package com.sam.dao;

import com.sam.bean.Customer;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;

public class CustomerDAOImpl extends BaseDAO implements CustomerDao {
  @Override
  public void insert(Connection connection, Customer customer) {
    String sql = "insert into customers(name, email, birth) values(?,?,?)";
    // BaseDAO中的方法
    update(connection, sql, customer.getName(), customer.getEmail(), customer.getBirth());
  }

  @Override
  public void deleteById(Connection connection, int id) {
    String sql = "delete from customers where id = ?";
    update(connection, sql, id);
  }

  @Override
  public void update(Connection connection, Customer customer) {
    String sql = "update customers set name = ?, email = ?, birth = ? where id = ?";
    update(connection, sql, customer.getName(), customer.getEmail(), customer.getBirth(), customer.getId());
  }

  @Override
  public Customer getCustomerById(Connection connection, int id) {
    String sql = "select id, name, email, birth from customers where id = ?";
    Customer customer = getInstance(connection, Customer.class, sql, id);
    return customer;
  }

  @Override
  public List<Customer> getAll(Connection connection) {
    String sql = "select id, name. email, birth from customers";
    List<Customer> list = getForList(connection, Customer.class, sql);
    return list;
  }

  @Override
  public Long getCount(Connection connection) {
    String sql = "select count(*) from customers";
    return getValue(connection, sql);
  }

  @Override
  public Date getMaxBirth(Connection connection) {
    String sql = "select max(birth) from customers";
    return getValue(connection, sql);
  }
}
```

上面虽然写完了 但是我们还要进行测试

<br><br>

# CustomerDAOImpl的单元测试
com.sam.dao.junit 
在这里测试下 CustomerDAOImpl 里面的方法 

```java
package com.sam.dao.junit;

import com.sam.bean.Customer;
import com.sam.dao.CustomerDAOImpl;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;

public class CustomerImplTest {
  // 我们要测 impl 类中的方法 需要先提供一个对象
  CustomerDAOImpl dao = new CustomerDAOImpl();

  @Test
  public void testInsert() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      // id是自增长的 我们传递个1 也没用 但是传递null不行
      Customer customer = new Customer(1, "who", "who@gmail.com", new Date(5235262626L));
      dao.insert(connection, customer);
      System.out.println("添加成功");
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testDeleteById() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      dao.deleteById(connection, 22);
      System.out.println("删除成功");
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testUpdate() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      // 修改是要根据id修改 这时候对象中的id就要指定
      Customer customer = new Customer(18, "贝多芬", "beiduofen@gamil.com", new Date(34532543L));
      dao.update(connection, customer);
      System.out.println("修改成功");
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetCustomerById() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      Customer customer = dao.getCustomerById(connection, 19);
      System.out.println(customer);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetAll() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      List<Customer> list = dao.getAll(connection);
      list.forEach(System.out :: println);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetCount() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      Long count = dao.getCount(connection);
      System.out.println(count);

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetMaxBirth() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();

      Date maxBirth = dao.getMaxBirth(connection);
      System.out.println(maxBirth); 
      // 2014-01-17
      
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
}

```

<br><br>

# 优化BaseDAO, CustomerDAO, CustomerDAOImpl

com.sam.dao_optimize

我们先看 CustomerDAOImpl 的 getCustomerById() 我们发现我们竟然传递了一个 *Customer.class*

因为我们要操作customers表 又因为我们就在CustomerDAOImpl的实现类里面 所以这个参数就没有意义 因为在customer的实现类里面 用户也不可能写别的表 所以我们不想传递这个参数 优化掉

```java
@Override
public Customer getCustomerById(Connection connection, int id) {
  String sql = "select id, name, email, birth from customers where id = ?";

  // 这里
  Customer customer = getInstance(connection, Customer.class, sql, id);

  return customer;
}
```

那这个参数 追溯到 BaseDAO 里参数 Class<T> clazz 的位置

想要优化掉可以 但是总归的告诉我要造哪个类的对象
所以这里面就要用到 *获取父类泛型的问题*
```java
public <T> T getInstance(Connection connection, Class<T> clazz, String sql, Object ...args) { ... }
```

### 解决方法
1. 在 BaseDAO 里面我们给类加上泛型参数 T
```java
public abstract class BaseDAO<T> { ... }
```

2. 在 CustomerDAOImpl 继承BaseDAO 的时候 指明我们要操作的是哪个表对应的类 BaseDAO<Customer>
这里我们指明要操作的就是Customer类
```java
public class CustomerDAOImpl extends BaseDAO<Customer> implements CustomerDao {}
```

既然我们指明我们要操作的是Customer类了 我们就可以在CustomerDAOImpl里面的下面的方法中 去掉 Customer.class 参数了

```java
@Override
public Customer getCustomerById(Connection connection, int id) {
  String sql = "select id, name, email, birth from customers where id = ?";

  Customer customer = getInstance(connection, Customer.class, sql, id);

  return customer;
}


@Override
public List<Customer> getAll(Connection connection) {
  String sql = "select id, name, email, birth from customers";

  List<Customer> list = getForList(connection, Customer.class, sql);

  return list;
}


<br><br> 去掉 Customer.class

@Override
public Customer getCustomerById(Connection connection, int id) {
  String sql = "select id, name, email, birth from customers where id = ?";

  Customer customer = getInstance(connection, sql, id);

  return customer;
}

@Override
public List<Customer> getAll(Connection connection) {
  String sql = "select id, name, email, birth from customers";

  List<Customer> list = getForList(connection, sql);

  return list;
}
```

同时 因为 CustomerDAOImpl 调用的是 BaseDAO 中 getInstance() 和 getForList() 方法 这两个方法中的 形参 Class<T> clazz 也要去掉

BaseDAO中
```java
public <T> T getInstance(Connection connection, Class<T> clazz, String sql, Object ...args) { ... }


public <T> List<T> getForList(Connection connection, Class<T> clazz, String sql, Object ...args) {}

<br><br> 去掉 Class<T> clazz

public <T> T getInstance(Connection connection, String sql, Object ...args) { ... }


public <T> List<T> getForList(Connection connection, String sql, Object ...args) {}
```

但是去掉了Class<T> clazz后 我们方法里面还要通过 clazz获取对象呢 怎么办?
我们要想办法获取class到底是谁 比如针对CustomerDAO来说 class就应该是 Customer
```java
T t = clazz.newInstance();
```

那Customer在哪里出现的呢？ 是不是在 CustomerDAOImpl声明的时候的泛型里 BaseDAO<Customer>
```java
public class CustomerDAOImpl extends BaseDAO<Customer> implements CustomerDao {
}
```

那是不是说 我们要想办法获取 CustomerDAOImpl 的父类 BaseDAO 的泛型<Customer>
``` 
  CustomerDAOImpl extends BaseDAO<Customer>

                                      ↑
                                   获取到它

  也就在站在CustomerDAOImpl类的角度来讲 要获取到当前类的父类的泛型
```

我们拿到泛型 泛型也对应一个类型 让它给我们父类中的class做一个实例化
我们在 BaseDAO 中 声明一个
```java
public abstract class BaseDAO<T>  {

  private Class<T> clazz = null;

}
```

注意: 我们这里指明了泛型了 下面的两个泛型方法中的<T>就没有必要了 因为我们要用类指明的泛型

```java
public <T> List<T> getForList(Connection connection, String sql, Object ...args) {}

public <T> T getInstance(Connection connection, String sql, Object ...args) {}


<br><br> 删掉 <T>

public List<T> getForList(Connection connection, String sql, Object ...args) {}

public T getInstance(Connection connection, String sql, Object ...args) {}
```

上面我们这么写的
```java
public abstract class BaseDAO<T>  {

  private Class<T> clazz = null;

}
```

接下来我们要对 clazz 进行实例化 实例化的时候完全取决于子类在实现BaseDAO时候指明的泛型
``` 
public class CustomerDAOImpl extends BaseDAO<Customer> implements CustomerDao {
}
          ↑ 说的就是这里
```

我们要在BaseDAO中 对 clazz 进行赋值 保证在调用 getInstance() 方法之前 clazz只要有值就可以 调用方法我们是通过对象来调用的 那就是说 我们要在获取对象之前 clazz有值就可以  

那么出现对象之前可以给属性赋值的位置有哪些？
1. 可以显式赋值
2. 代码块中赋值
3. 构造器中也可以 

```java
public abstract class BaseDAO<T>  {

  private Class<T> clazz = null;

  // 在造子类对象的时候 构造器 和 代码块就会被执行
  {
    // 在造子类对象的时候 要获取当前对象的父类的泛型
    // 当前对象this this.getClass()获取自己的类(子类对象所在类) 然后自己的类的带泛型的父类
    Type genericSuperclass = this.getClass().getGenericSuperclass();

    // 我们做下强转
    ParameterizedType paramType = (ParameterizedType) genericSuperclass;

    // 该方法用于获取父类的泛型参数 泛型可能会有多个 所以返回的是一个数组
    Type[] actualTypeArguments = paramType.getActualTypeArguments();
    // 获取了泛型的第一个参数 也就是 BaseDAO<Customer> 中的 Customer
    clazz = (Class<T>) actualTypeArguments[0];
  }

}


<br><br> 注意:
这里面的this是子类对象
```

其实上面的代码 写在 CustomerDAOImpl 类中更容易理解一些 因为 this 指的就是 CustomerDAOImpl 我们要获取的也就 BaseDAO<Customer> 里面的Customer

之所以写在父类中 是因为写在父类中 我们子类在继承的时候 这样的结构就都有了 不至于每个Impl类里面都写重复的逻辑
```java
public class CustomerDAOImpl extends BaseDAO<Customer> implements CustomerDao {
  {
    // 在造子类对象的时候 要获取当前对象的父类的泛型
    // 当前对象this this.getClass()获取自己的类 然后自己的类的带泛型的父类
    Type genericSuperclass = this.getClass().getGenericSuperclass();

    // 我们做下强转 ParameterizedType 是带泛型参数的type 还是BaseDAO<Customer> 强转的目的是为了调用方法
    ParameterizedType paramType = (ParameterizedType) genericSuperclass;

    // 该方法用于获取父类的泛型参数 泛型可能会有多个 所以返回的是一个数组
    Type[] actualTypeArguments = paramType.getActualTypeArguments();

    // 获取了泛型的第一个参数 也就是 BaseDAO<Customer> 中的 Customer
    // 正常actualTypeArguments的类型是一个 type类型 但我们知道 Customer它是一个Class类 所以我们进行了强转
    clazz = (Class<T>) actualTypeArguments[0];
  }
}

```


### 解析:
this.getClass().getGenericSuperclass();
this是当前类的对象
this.getClass()  -- CustomerDAOImpl
getGenericSuperclass() -- BaseDAO<Customer>



### 优化后的BaseDAO
```java
package com.sam.dao_optimize;

import com.sam.utils.JDBCUtils;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public abstract class BaseDAO<T>  {

  private Class<T> clazz = null;

  // 在造子类对象的时候 构造器 和 代码块就会被执行
  {
    // 在造子类对象的时候 要获取当前对象的父类的泛型
    // 当前对象this this.getClass()获取自己的类 然后自己的类的带泛型的父类
    Type genericSuperclass = this.getClass().getGenericSuperclass();

    // 我们做下强转
    ParameterizedType paramType = (ParameterizedType) genericSuperclass;

    // 该方法用于获取父类的泛型参数 泛型可能会有多个 所以返回的是一个数组
    Type[] actualTypeArguments = paramType.getActualTypeArguments();
    // 获取了泛型的第一个参数 也就是 BaseDAO<Customer> 中的 Customer
    clazz = (Class<T>) actualTypeArguments[0];
  }

  // 包含事务: 增删改
  public int update(Connection connection, String sql, Object ...args) {
    PreparedStatement ps = null;
    try {
      ps = connection.prepareStatement(sql);
      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      return ps.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps);
    }

    return 0;
  }


  // 包含事务: 查询一条记录 返回一个对象
  public T getInstance(Connection connection, String sql, Object ...args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      ps = connection.prepareStatement(sql);
      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      rs = ps.executeQuery();
      ResultSetMetaData rsmd = rs.getMetaData();

      int columnCount = rsmd.getColumnCount();
      if(rs.next()) {
        T t = clazz.newInstance();

        for (int i=0; i<columnCount; i++) {
          String columnLabel = rsmd.getColumnLabel(i+1);
          Object columnValue = rs.getObject(i+1);

          Field field = clazz.getDeclaredField(columnLabel);
          field.setAccessible(true);
          field.set(t, columnValue);
        }
        return t;
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }
    return null;
  }

  // 包含事务: 查询多条记录 返回多条记录构成的集合
  public List<T> getForList(Connection connection, String sql, Object ...args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    ArrayList<T> list = null;

    try {
      // 预编译sql
      ps = connection.prepareStatement(sql);

      // 填充占位符
      for(int i=0; i<args.length; i++) {
        ps.setObject(i+1, args[i]);
      }

      // 执行并获取结果集
      rs = ps.executeQuery();

      // 获取列数
      ResultSetMetaData rsmd = rs.getMetaData();
      int columnCount = rsmd.getColumnCount();

      // 创建一个承装对象的结合
      list = new ArrayList<>();


      // 多条记录
      while(rs.next()) {
        // 循环中 每次都创建一个t对象
        T t = clazz.newInstance();

        // 通过 for 将t对象的所有的属性都附上值了
        for(int i=0; i<columnCount; i++) {
          String columnLabel = rsmd.getColumnLabel(i + 1);
          Object columnValue = rs.getObject(i + 1);

          Field field = clazz.getDeclaredField(columnLabel);
          field.setAccessible(true);
          field.set(t, columnValue);
        }

        // 把对象添加到集合中
        list.add(t);
      }

      // while循环结束后
      return list;

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }

    return null;
  }


  // 先定义为 void 因为是通用的父类 我们定义的方法 也不知道子类到底要获取什么
  // 不写 void 写什么? 比如count(*) 返回值是int Max(date) 返回值是个日期 不确定 所以我们使用泛型
  public <E> E getValue(Connection connection, String sql, Object ...args) {

    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      ps = connection.prepareStatement(sql);
      for (int i=0; i<args.length; i++) {
        ps.setObject(i+1, args[i]);
      }

      rs = ps.executeQuery();
      // 对于特殊需求的来讲 我们只会查出来一列数据 比如 count(*)
      if(rs.next()) {
        // 得到这一列数据 需要强转下
        return (E)rs.getObject(1);
      }
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }

    return null;
  }
}

```

### 优化后的CustomerDAOImpl
```java
package com.sam.dao_optimize;

import com.sam.bean.Customer;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;

public class CustomerDAOImpl extends BaseDAO<Customer> implements CustomerDao {
  @Override
  public void insert(Connection connection, Customer customer) {
    String sql = "insert into customers(name, email, birth) values(?,?,?)";
    // BaseDAO中的方法
    update(connection, sql, customer.getName(), customer.getEmail(), customer.getBirth());
  }

  @Override
  public void deleteById(Connection connection, int id) {
    String sql = "delete from customers where id = ?";
    update(connection, sql, id);
  }

  @Override
  public void update(Connection connection, Customer customer) {
    String sql = "update customers set name = ?, email = ?, birth = ? where id = ?";
    update(connection, sql, customer.getName(), customer.getEmail(), customer.getBirth(), customer.getId());
  }

  @Override
  public Customer getCustomerById(Connection connection, int id) {
    String sql = "select id, name, email, birth from customers where id = ?";
    Customer customer = getInstance(connection, sql, id);
    return customer;
  }

  @Override
  public List<Customer> getAll(Connection connection) {
    String sql = "select id, name, email, birth from customers";
    List<Customer> list = getForList(connection, sql);
    return list;
  }

  @Override
  public Long getCount(Connection connection) {
    String sql = "select count(*) from customers";
    return getValue(connection, sql);
  }

  @Override
  public Date getMaxBirth(Connection connection) {
    String sql = "select max(birth) from customers";
    return getValue(connection, sql);
  }
}

```

<br><br>

# 数据库连接池 技术

### JDBC数据库连接池的必要性
在使用开发基于数据库的web程序时，传统的模式基本是按以下步骤：　　
在主程序（如servlet、beans）中建立数据库连接
进行sql操作
断开数据库连接

上面的连接如果是自己创建的话 是能够完成对数据库的连接 但是这种模式开发，存在的问题:

1. 普通的JDBC数据库连接使用 DriverManager 来获取，每次向数据库建立连接的时候都要将 Connection 加载到内存中，再验证用户名和密码(得花费0.05s～1s的时间)。需要数据库连接的时候，就向数据库要求一个，执行完成后再断开连接。这样的方式将会消耗大量的资源和时间。**数据库的连接资源并没有得到很好的重复利用。**若同时有几百人甚至几千人在线，频繁的进行数据库连接操作将占用很多的系统资源，严重的甚至会造成服务器的崩溃。

2. **对于每一次数据库连接，使用完后都得断开。**否则，如果程序出现异常而未能关闭，将会导致数据库系统中的内存泄漏，最终将导致重启数据库。（回忆：何为Java的内存泄漏？）
``` 
  c
  里面的内存泄漏是说将指针弄丢了 指针没了 就不能去调用指针指向的对象了 c里面是我们主动回收内存的 指针没了 我们就找不到该对象了 就没有办法主动回收了 所以导致的内存泄漏

  java
  内存中有对象 但是不能被回收 这就是内存泄漏 比如连接对象一致没有被关闭 导致一直存在 所以产生的内存泄漏的问题
```

3. **这种开发不能控制被创建的连接对象数**，系统资源会被毫无顾及的分配出去，如连接过多，也可能导致内存泄漏，服务器崩溃。 
``` 
  服务器再强大也有一个上限 一旦超出上限应该怎么处理呢 

  超出上限后 如果还有人访问 就不让他获取连接了 这样服务器就不会出现崩溃和重启的问题
  但是我们没有一个很好的管理 只要用户去请求 服务器就去创建 即使超出服务器的负载能力 就会崩溃
```


### 数据库连接池技
为解决传统开发中的数据库连接问题，可以采用数据库连接池技术。

### 数据库连接池的基本思想:
就是为数据库连接建立一个“缓冲池”。预先在缓冲池中放入一定数量的连接，当需要建立数据库连接时，只需从“缓冲池”中取出一个，使用完毕之后再放回去。

**数据库连接池**负责分配、管理和释放数据库连接，它**允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个**。

数据库连接池在初始化时将创建一定数量的数据库连接放到连接池中，这些数据库连接的数量是由**最小数据库连接数来设定**的。无论这些数据库连接是否被使用，连接池都将一直保证至少拥有这么多的连接数量。连接池的**最大数据库连接数量**限定了这个连接池能占有的最大连接数，当应用程序向连接池请求的连接数超过最大连接数量时，这些请求将被加入到等待队列中。

``` 
    假设数据库连接池中只提供了4个连接
    conn1 free

        conn2 free

            conn3 free
            
                conn4 free

    java程序从连接池中拿到连接 该连接的状态就从free变成busy 也就是说我们可以有4个程序一人拿一个 假设峰值就只有4个 如果第5个程序来了 它就要等着 当有一个连接从busy变成free 这时候第5个程序再去拿着这个连接去做操作数据库

    当我们用完一个连接后做close操作 conn的状态就会有busy变成free

    我们以前自己创建的连接做close操作叫做释放内存空间 对于数据库连接池来讲只是将conn的状态由busy改为free 连接会还到连接池中供其它的java程序使用
```



### 数据库连接池技术的优点
1. 资源重用
由于数据库连接得以重用，避免了频繁创建，释放连接引起的大量性能开销。在减少系统消耗的基础上，另一方面也增加了系统运行环境的平稳性。

2. 更快的系统反应速度
数据库连接池在初始化过程中，往往已经创建了若干数据库连接置于连接池中备用。此时连接的初始化工作均已完成。对于业务请求处理而言，直接利用现有可用连接，避免了数据库连接初始化和释放过程的时间开销，从而减少了系统的响应时间

3. 新的资源分配手段
对于多应用共享同一数据库的系统而言，可在应用层通过数据库连接池的配置，实现某一应用最大可用数据库连接数的限制，避免某一应用独占所有的数据库资源

4. 统一的连接管理，避免数据库连接泄漏
在较为完善的数据库连接池实现中，可根据预先的占用超时设定，强制回收被占用连接，从而避免了常规数据库连接操作中可能出现的资源泄露


### 多种开源的数据库连接池
JDBC 的数据库连接池使用 javax.sql.DataSource 来表示，DataSource 只是一个接口，该接口通常由服务器(Weblogic, WebSphere, Tomcat)提供实现，也有一些开源组织提供实现：

**DBCP** 
是Apache提供的数据库连接池。tomcat 服务器自带dbcp数据库连接池。**速度相对c3p0较快**，但因自身存在BUG，Hibernate3已不再提供支持。
``` 
  速度快 不稳定 bug
```

**C3P0** 
是一个开源组织提供的一个数据库连接池，**速度相对较慢，稳定性还可以。**hibernate官方推荐使用
``` 
  稳定 但是速度差
```

Proxool :
是sourceforge下的一个开源项目数据库连接池，有监控连接池状态的功能，**稳定性较c3p0差一点**

BoneCP :
是一个开源组织提供的数据库连接池，速度快

**Druid** 
是阿里提供的数据库连接池，据说是集DBCP 、C3P0 、Proxool 优点于一身的数据库连接池，但是速度不确定是否有BoneCP快
``` 
  主流 既兼顾的稳定性 同时来兼顾了效率
```

<br><br>

### DataSource 
通常被称为数据源，它包含连接池和连接池管理两个部分，习惯上也经常把 DataSource 称为连接池

**DataSource用来取代DriverManager来获取Connection，获取速度快，同时可以大幅度提高数据库访问速度。**

特别注意：
数据源和数据库连接不同，数据源无需创建多个，它是产生数据库连接的工厂，因此**整个应用只需要一个数据源即可。**

当数据库访问结束后，程序还是像以前一样关闭数据库连接：conn.close(); 但conn.close()并没有关闭数据库的物理连接，它仅仅把数据库连接释放，归还给了数据库连接池。

<br><br>

# c3p0数据库连接池的两种实现方式 

### 引入 jar 包
既然是第三方的开始的时候就要导入第三方的jar包
c3p0-0.9.1.2.jar
添加到 lib 中 
``` 
  jar包中的doc里面有index.html文件 就是用来说明这个jar怎么用的

  同时这个index.html中也是说明文档 比如
  连接池的初始的连接数量 峰值 最大 最小的数据库连接数量 最大的空闲时间 等 都可以在这个index.html中找到
```


### 使用C3P0连接池获取连接的两种方式
### 方式1:
### 1. 获取 C3P0连接池 
得到连接池对象
```java
// ComboPooledDataSource是 DataSource接口的具体实现类
ComboPooledDataSource cpds = new ComboPooledDataSource();
```

拿到连接池对象 cpds 后
我们可以通过该对象来调用方法获取连接池 和 通过该对象调用方法来设置连接池

### 2. 让连接池连接myql数据库
这里相当于 我们写的properties文件
```java
cpds.setDriverClass( "com.mysql.cj.jdbc.Driver" );
cpds.setJdbcUrl( "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC" );
cpds.setUser("root");
cpds.setPassword("qwer6666");
```

### 3. 可以通过 cpds 对连接池进行设置
具体的设置可以在index.html文件中查找
都是通过 setXxxx() 方法设置
```java
cpds.setInitialPoolSize(10);
```

### 获取连接
```java
Connection connection = cpds.getConnection();
System.out.println(connection);
```


### 销毁C3P0数据库连接池
### DataSources.destroy( cpds );
一般情况下我们是不会关闭连接池的



### 完整代码
```java
package com.sam.connection;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.junit.Test;

import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.SQLException;

public class C3P0Test {
  @Test
  public void testGetConnection() throws PropertyVetoException, SQLException {
    // 获取C3P0数据库连接池
    ComboPooledDataSource cpds = new ComboPooledDataSource();

    // 这里相当于 我们写的properties文件
    cpds.setDriverClass( "com.mysql.cj.jdbc.Driver" );
    cpds.setJdbcUrl( "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC" );
    cpds.setUser("root");
    cpds.setPassword("qwer6666");

    // Appendix A: Configuration Properties
    cpds.setInitialPoolSize(10);

    // 通过 cpds 获取连接
    Connection connection = cpds.getConnection();
    System.out.println(connection);
  }
}
```


### 方式2:
我们将配置信息写入到xml文件中
文件名*必须*是: c3p0-config.xml

我们在模块的src文件夹下创建 c3p0-config.xml

### 官方下的xml模板 
我们就是在这个的基础上 修改我们自己的配置
因为这个配置文件是c3p0自动去读 
<property name="checkoutTimeout">
这里的name必须要人家定义好的 不能自己所以更改

```xml
<?xml version="1.0" encoding="UTF-8"?>

<c3p0-config>
  <default-config>
    <property name="automaticTestTable">con_test</property>
    <property name="checkoutTimeout">30000</property>
    <property name="idleConnectionTestPeriod">30</property>
    <property name="initialPoolSize">10</property>
    <property name="maxIdleTime">30</property>
    <property name="maxPoolSize">100</property>
    <property name="minPoolSize">10</property>
    <property name="maxStatements">200</property>

    <user-overrides user="test-user">
      <property name="maxPoolSize">10</property>
      <property name="minPoolSize">1</property>
      <property name="maxStatements">0</property>
    </user-overrides>

  </default-config>

  <!-- This app is massive!```
  <named-config name="intergalactoApp">
    <property name="acquireIncrement">50</property>
    <property name="initialPoolSize">100</property>
    <property name="minPoolSize">50</property>
    <property name="maxPoolSize">1000</property>

    <!-- intergalactoApp adopts a different approach to configuring statement caching```
    <property name="maxStatements">0</property>
    <property name="maxStatementsPerConnection">5</property>

    <!-- he's important, but there's only one of him```
    <user-overrides user="master-of-the-universe">
      <property name="acquireIncrement">1</property>
      <property name="initialPoolSize">1</property>
      <property name="minPoolSize">1</property>
      <property name="maxPoolSize">5</property>
      <property name="maxStatementsPerConnection">50</property>
    </user-overrides>
  </named-config>
</c3p0-config>
```

根据上面的模板 以下的内容是我们需要的
```xml
<?xml version="1.0" encoding="UTF-8"?>

<c3p0-config>
  <!-- 
    指定配置的文件名 通过该名字 java层面好进行调用 
 ```
  <named-config name="c3p0Test">

    <!-- 提供获取连接的4个基本信息```
    <property name="driverClass">com.mysql.cj.jdbc.Driver</property>

    <!-- 这里注意: & -> &amp;```
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/test?useUnicode=true&amp;characterEncoding=UTF-8&amp;useSSL=false&amp;serverTimezone=UTC</property>
    <property name="user">root</property>
    <property name="password">qwer6666</property>

    <!-- 进行数据库连接管理的基本信息```
    <!-- 
      当数据库连接池中的连接数不够时 c3p0一次性向数据库服务器申请的连接数 
   ```
    <property name="acquireIncrement">5</property>

    <!-- c3p0数据库连接池中初始化时的连接数```
    <property name="initialPoolSize">10</property>

    <!-- c3p0数据库连接池维护的最少连接数```
    <property name="minPoolSize">10</property>

    <!-- c3p0数据库连接池维护的最多连接数```
    <property name="maxPoolSize">100</property>

    <!--
      c3p0数据库连接池最多维护的statement的个数
      拿到连接接下来我们要传递 sql 语句 我们就需要用到statement 通过它我们传输sql语句并且执行 这里最多维护50个
   ```
    <property name="maxStatements">50</property>

    <!-- 每一个连接最多可以使用的statement的个数```
    <property name="maxStatementsPerConnection">5</property>
  </named-config>
</c3p0-config>
```

在配置好文件后 我们java层面就可以根据文件来获取连接池对象了

**注意:**
这里我们传入的是 自定义的配置文件名
```java
@Test
public void testGetConnection2() throws SQLException {
  // 指定xml配置文件 然后获取 c3p0连接池
  ComboPooledDataSource cpds = new ComboPooledDataSource("c3p0Test");
  Connection connection = cpds.getConnection();
  System.out.println(connection);
}
```

<br><br>

# 使用c3p0数据库连接池技术 重构JDBCUtils 获取连接的方法
 
java代码如下:
```java
package com.sam.utils;
import com.mchange.v2.c3p0.ComboPooledDataSource;

import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class JDBCUtils {

  // 注意: 
  // 下面都是静态方法 这里也要定义为静态的
  private static ComboPooledDataSource cpds = new ComboPooledDataSource("c3p0Test");


  // 使用c3p0数据库连接池技术
  public static Connection getConnection() throws Exception {
    
    Connection connection = cpds.getConnection();

    return connection;
  }

  // 关闭资源的方法没有改

}

```

注意的部分解释如下:
我们要把 new ComboPooledDataSource() 的逻辑提取到类中 作为一个静态的变量

如果我们放在方法中 那么每次调用方法都会new一个连接池 而我们放到外面是静态的 别的地方调用方法的时候 我们用的都是唯一的 cpds 对象

池子不用造很多 一个就够

<br><br>

# DBCP数据库连接池的两种实现方式
使用DBCP也需要先引入 jar 包 导两个包 这两个jar包有依赖的关系
commons-dbcp-1.4.jar
commons-pool-1.5.5.jar

  | - com.sam.connection
    - DBCPTest


不管是DBCP还是C3P0起始 我们都需要通过 DataSource
```java
import javax.sql.DataSource;
```

DataSource有很多的实现类
我们在DataSource上 ctrl+options+b 能到看 commons.dbcp有一个实现类 BasicDataSource

这里我们通过 BasicDataSource 创建数据库连接池对象

```java
@Test
public void testGetConnection() {
  BasicDataSource source = new BasicDataSource();
}
```

### BasicDataSource的使用方式
在jar包中还是由 index.html 文件 这个文件就告诉我们该jar包的使用方式

### 常用的关于设置数据库连接池的属性
### initialSize
  连接池启动时创建的饿初始化连接数量 默认值0

### maxActive
  连接池中可同时连接的最大连接数 默认值8 
  *调整为20* 高峰单机器在20并发左右，自己根据应用场景定

### maxIdle
  连接池中最大的空闲的连接数 默认为8个
  超过的空闲连接将被释放 如果设置为负数表示不限制

  maxIdle不能设置太小，因为假如在高负载的情况下，连接的打开时间比关闭的时间快，会引起连接池中idle的个数 上升超过maxIdle，而造成频繁的连接销毁和创建，类似于jvm参数中的Xmx设置

### minIdle
  连接池中最小的空闲的连接数 默认为0
  低于这个数量会被创建新的连接 *调整为5*

  该参数越接近maxIdle，性能越好，因为连接的创建和销毁，都是需要消耗资源的；但是不能太大，因为在机器很空闲的时候，也会创建低于minidle个数的连接，类似于jvm参数中的Xmn设置

### maxWait
  最大等待时间 当没有可用连接时 连接池等待连接释放的最大时间 超过该时间限制会抛出异常

  如果设置-1表示无限等待（默认为无限，*调整为60000ms*，避免因线程池不够用，而导致请求被无限制挂起

### poolPreparedStatements
  开启池的prepared 默认是false
  默认是false *不用调整* 经过测试 开启后的性能没有关闭的好

### maxOpenPreparedStatements
  开启池的prepared后的同时最大连接数 默认无限制
  *不用配置*

### minEvictableIdleTimeMillis
  连接池中连接 在时间段内一直空闲 被逐出连接池的时间

### removeAbandonedTimeout
  超过时间限制 回收没有用的连接 默认为 300 *调整到180*

### removeAbandoned
  超过removeAbandonedTimeout时间后 是否进行没用连接的回收 
  默认为false *调整为true*


### 方式1:
```java
@Test
public void testGetConnection() throws SQLException {
  // 创建了 DBCP 数据库连接池
  BasicDataSource source = new BasicDataSource();

  // 设置基本信息
  source.setDriverClassName("com.mysql.cj.jdbc.Driver");
  source.setUrl("jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC");
  source.setUsername("root");
  source.setPassword("qwer6666");

  // 设置其它涉及数据库连接池管理的相关属性 查看文档
  source.setInitialSize(10);
  source.setMaxActive(10);

  Connection connection = source.getConnection();
  System.out.println(connection);
}
```


### 方式2:
使用配置文件

使用 BasicDataSourceFactory 用来创建 BasicDataSource的

1. 模块的sql下创建配置文件
```.properties
username=root
password=qwer6666
url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC
driverClassName=com.mysql.cj.jdbc.Driver

initialSize=10
```

### BasicDataSourceFactory.createDataSource(properties配置文件)
获取连接池

返回值
BasicDataSource

```java
@Test
public void testGetConnection2() throws Exception {
  //
  Properties prop = new Properties();
  // 获取配置文件的方式1:
  // InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("dbcp.properties");

  // 获取配置文件的方式2: 注意这里是以工程下 所以前面要加上 src/
  FileInputStream is = new FileInputStream(new File("src/dbcp.properties"));

  prop.load(is);

  DataSource source = BasicDataSourceFactory.createDataSource(prop);

  Connection connection = source.getConnection();
  System.out.println(connection);
}
```

### 使用 DBCP 来对 JDBCUtils中获取连接的方法进行调整
```java
public class JDBCUtils {
  private static DataSource source;

  // 静态代码随着类的加载而加载 就只执行一次 相当于对上面source进行赋值
  static {
    try {
      Properties prop = new Properties();
      FileInputStream is = new FileInputStream(new File("src/dbcp.properties"));
      prop.load(is);

      // 创建一个dbcp连接池
      source = BasicDataSourceFactory.createDataSource(prop);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  // 使用 DBCP 技术获取连接池
  public static Connection getConnection2() throws Exception {
    Connection connection = source.getConnection();
    return connection;
  }
}
```

也是跟c3p0中的问题一样 我们要确保只有一个连接池 所以将source拿到了外面 通过静态代码块来进行赋值

<br><br>

# Druid(德鲁伊)数据库连接池技术的实现
Druid是阿里巴巴开源平台上一个数据库连接池实现，它结合了C3P0、DBCP、Proxool等DB池的优点，同时加入了日志监控，可以很好的监控DB池连接和SQL的执行情况，可以说是针对监控而生的DB连接池，**可以说是目前最好的连接池之一。**

  | - com.sam.connection
    - DruidTest

1. 加载驱动
druid-1.1.10.jar

2. 在jar包中查看index.html文件 查看使用方式
使用 


### Druid常见的配置信息
### name:
  配置这个属性的意义在于，如果存在多个数据源，监控的时候可以通过名字来区分开来。
  如果没有配置，将会生成一个名字，格式是：”DataSource-” +   System.identityHashCode(this)

### url:
  连接数据库的url，不同数据库不一样。
  例如：
  mysql:  jdbc:mysql://10.20.153.104:3306/druid2
  oracle: jdbc:oracle:thin:@10.20.149.85:1521:ocnauto

### username
  连接数据库的用户名 
  
### password 
  连接数据库的密码。如果你不希望密码直接写在配置文件中，可以使用ConfigFilter。
  详细看这里：<https://github.com/alibaba/druid/wiki/%E4%BD%BF%E7%94%A8ConfigFilter>
  
### driverClassName
  根据url自动识别   这一项可配可不配，如果不配置druid会根据url自动识别dbType，然后选择相应的driverClassName(建议配置下)
  
### initialSize
  默认值 0
  初始化时建立物理连接的个数。初始化发生在显示调用init方法，或者第一次getConnection时
  
### maxActive
  默认值 8
  最大连接池数量
  
### maxIdle
  默认值 8
  已经不再使用，配置了也没效果
  
### minIdle
  最小连接池数量

### maxWait 
  获取连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，
  如果需要可以通过配置useUnfairLock属性为true使用非公平锁。
  
### poolPreparedStatements
  默认值好 false
  是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。*在mysql下建议关闭。*
  
### maxOpenPreparedStatements
  默认值 -1
  要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。
  在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100
  
### validationQuery
  用来检测连接是否有效的sql，要求是一个查询语句。
  如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会其作用。
  
### testOnBorrow
  默认值 true
  申请连接时执行validationQuery检测连接是否有效，*做了这个配置会降低性能。*
  
### testOnReturn
  默认值 false
  归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
  
### testWhileIdle
  默认值 false
  建议配置为true，不影响性能，并且保证安全性。
  申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
  
### timeBetweenEvictionRunsMillis
  有两个含义： 
  1)Destroy线程会检测连接的间隔时间
  2)testWhileIdle的判断依据，详细看testWhileIdle属性的说明
  
### numTestsPerEvictionRun
  不再使用，一个DruidDataSource只支持一个EvictionRun
  
### minEvictableIdleTimeMillis

### connectionInitSqls
  物理连接初始化的时候执行的sql
  
### exceptionSorter
  根据dbType自动识别   当数据库抛出一些不可恢复的异常时，抛弃连接
  
### filters
  属性类型是字符串，通过别名的方式配置扩展插件，
  常用的插件有：   监控统计用的filter:stat日志用的filter:log4j防御sql注入的filter:wall
  
### proxyFilters
  类型是List，如果同时配置了filters和proxyFilters，是组合关系，并非替换关系


### 方式1: 
通过下面的方法 获取连接池 调用set方法 设置 跟DBCP 完全一样
### new DruidDataSource()
创建连接池


### 方式2:
使用配置文件的方式 这里我们直接使用这种方式
### DruidDataSourceFactory.createDataSource(properties配置文件)

src/druid.properties
```js
username=root
password=qwer6666
jdbcUrl=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC
driverClassName=com.mysql.cj.jdbc.Driver

initialSize=10
```

### 代码部分
```java
@Test
public void getConnection() throws Exception {

  // 读取配置文件
  Properties prop = new Properties();
  InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("druid.properties");
  prop.load(is);

  // 创建 连接池
  DataSource source = DruidDataSourceFactory.createDataSource(prop);

  // 获取连接
  Connection connection = source.getConnection();
  System.out.println(connection);
}
```

### 修改 JDBCUtils 中的逻辑
```java
// 将连接池声明在类中 static
private static DataSource source2;
// 赋值
static {
  try {
    Properties prop = new Properties();
    InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("druid.properties");
    prop.load(is);
    // 创建 连接池
    source2 = DruidDataSourceFactory.createDataSource(prop);
  } catch (Exception e) {
    e.printStackTrace();
  }
}

// 使用 Druid 技术获取连接池
public static Connection getConnection3() throws Exception {
  Connection connection = source2.getConnection();
  return connection;
}
```

<br><br>

# Apache-DBUtils实现CRUD操作
Apache下有一个DBUtils的jar包 这个jar包也能实现CRUD的操作

上面我们讲了数据库连接池 有了它后我们就不用自己创建连接了 相当于把我们创建连接的事儿给替换了

而这个部分我们就可以将自己写的preparedStatement的通用的增删改查的操作给替换了
``` 
  其实源码是和我们上面写的通过的增删改查是一样的
```


### Apache-DBUtils简介
commons-dbutils 是 Apache 组织提供的一个开源 JDBC工具类库，它是对JDBC的简单封装，学习成本极低，并且使用dbutils能极大简化jdbc编码的工作量，同时也不会影响程序的性能。

### 使用方式
1. 导包
commons-dbutils-1.3.jar

2. 使用方式查看api文档 在jar包中的 index.html 中
我们要使用 QueryRunner 类

3. new QueryRunner()
得到 runner 对象 我们通过调用 runner对象身上的方法来完成增删改查的操作


### runner对象身上的方法

### runner.update():
主要是用来完成 增删改 的操作
这里面有很多的重载的方法
``` 
  update(String sql, Object ...args)
  update(String sql)
  update(String sql, Object param)

  update(Connecttion conn, String sql,)
  update(Connecttion conn, String sql, Object param)
  update(Connecttion conn, String sql, Object ...args)
```

如果是我们要考虑事务的话 我们可以传入一个 conn
如果本次操作单独是一个事务了 就不用传了 里面会自动帮我们造一个连接

返回值
int
表示影响了几条记录



### 演示带事务的 插入操作
注意 try catch
```java
@Test
public void testInsert() throws Exception {
  // 创建 QueryRunner
  QueryRunner runner = new QueryRunner();

  // 增删改的操作 我们使用 update()
  // 插入数据 我们演示带事务的
  Connection connection = JDBCUtils.getConnection3();

  String sql = "insert into customers(name, email, birth) values(?,?,?)";

  int i = runner.update(connection, sql, "蔡徐坤", "cxk@gmail.com", "1997-09-08");

  System.out.println("添加了" + i + "条记录");
}
```

删 和 改 跟插入是一样的 区别就是sql语句不一样


### runner.query()
主要用来完成 查询操作
这里面也有很多的重载方法
``` 
  query(String sql, ResultSetHandler<T> rsh)
  query(Connection conn, String sql, ResultSetHandler<T> rsh)

  query(String sql, ResultSetHandler<T> rsh, Object param)
  query(Connection conn, String sql, ResultSetHandler<T> rsh, Object ...args)
```

如果我们是以事务的形式去操作 那我们就需要传入连接
注意上面的参数的位置

示例：
我们要以事务的形式进行查询
```java
// 注意实参的位置
runner.query(conn, sql, rsh, "可变形参");
```
上面我们注意到了 还需要传入 rsh

### ResultSetHandler<T> rsh
参数:
ResultSetHandler<T> rsh 结果集的处理器
指定怎么处理返回的数据 它是一个接口 我们只能传入该接口的实现类 

因为结果集返回的情况不一样 为了对应多种情况 我们创建了这个接口 下面提供了各种实现类 来应对我们的实际需求

```java
// 该接口的实现类有
AbstractKeyedHandler
AbstractListHandler

// 封装的也是一个对象 但是该对象是以数组的方式呈现的
ArrayHandler
ArrayListHandler

// 返回一条记录的时候
// 用户封装表中的一条记录 返回具体的对象
BeanHandler<T> ... new BeanHandler(T.class)

// 返回多条记录的时候
// 一个对象是一个Bean 多个对象就是list
BeanListHandler<T> ... new BeanHandler(T.class)

ColumnListHandler
KeyedHandler

// 该处理器没有泛型 结果不是以一个对象的形式呈现的 而是一个map的方式
// 该处理器对应表中的一条记录 将字段以及响应的字段的值 作为map中的key和value
MapHandler
MapListHandler


// 用于返回特殊的值 没有泛型
ScalarHandler
```

上面的所有handler都是可以传入泛型的
但是好像都没有空参构造器 在new 它们的时候 我们要传入 具体的哪个类的类型
```java
// 前面传入了 泛型 后面指定了 类.class
BeanHandler<Customer> handler = new BeanHandler<>(Customer.class);
```


### 返回单个对象的示例:  BeanHandler
```java
@Test
public void testQuery1() throws Exception {
  QueryRunner runner = new QueryRunner();
  Connection connection = JDBCUtils.getConnection3();
  String sql = "select id, name, email, birth from customers where id = ?";

  // ResultSetHandler - 我们选择使用 BeanHandler 返回一个对象
  BeanHandler<Customer> handler = new BeanHandler<>(Customer.class);

  Customer customer = runner.query(connection, sql, handler, 23);

  System.out.println(customer);
  // Customer{id=23, name='蔡徐坤', email='cxk@gmail.com', birth=1997-09-08}
}
```


### 返回多个对象的示例:  BeanListHandler
```java
@Test
public void testQuery2() throws Exception {
  QueryRunner runner = new QueryRunner();
  Connection connection = JDBCUtils.getConnection3();
  String sql = "select id, name, email, birth from customers where id < ?";

  // BeanListHandler 返回多个对象的集合
  BeanListHandler<Customer> handler = new BeanListHandler<>(Customer.class);

  List<Customer> list = runner.query(connection, sql, handler, 23);

  list.forEach(System.out :: println);
}
```


### 返回一个对象的示例:   MapHandler
MapHandler没有泛型

```java
@Test
public void testQuery3() throws Exception {
  QueryRunner runner = new QueryRunner();
  Connection connection = JDBCUtils.getConnection3();
  String sql = "select id, name, email, birth from customers where id = ?";

  // BeanListHandler 返回多个对象的集合
  MapHandler handler = new MapHandler();

  Map<String, Object> map = runner.query(connection, sql, handler, 23);

  System.out.println(map);
  // {name=蔡徐坤, birth=1997-09-08, id=23, email=cxk@gmail.com}

}
```


### 返回一个对象的示例:   MapListHandler
MapListHandler没有泛型
```java
@Test
public void testQuery4() throws Exception {
  QueryRunner runner = new QueryRunner();
  Connection connection = JDBCUtils.getConnection3();
  String sql = "select id, name, email, birth from customers where id < ?";

  // BeanListHandler 返回多个对象的集合
  MapListHandler listHandler = new MapListHandler();

  List<Map<String, Object>> list = runner.query(connection, sql, listHandler, 23);

  list.forEach(System.out :: println);
}
```


### 返回特殊的值的操作:  ScalarHandler
查询一列中的某个值 或者是 聚合函数的结果
比如我们返回 count(*) max(birth) 等
```java
@Test
public void testQuery5() throws Exception {
  QueryRunner runner = new QueryRunner();
  Connection connection = JDBCUtils.getConnection3();
  String sql = "select count(*) from customers";

  // 查询这个表中的总记录数
  ScalarHandler handler = new ScalarHandler();

  // 返回值是Object 我们需要强转
  Long query = (Long) runner.query(connection, sql, handler);

  System.out.println(query);
}
```

<br><br>

# 自定义ResultSetHandler的实现类 完成查询操作
当我们上面预定义的 ResultSetHandler 的实现类中没有能够满足我们需求的时候 我们可以自己提供一个ResultSetHandler的实现类

下面演示下 怎么自定义 ResultSetHandler 实现类

### 要点:
1. 我们创建一个 ResultSetHandler 的匿名实现类对象
2. 重写 handle 方法
该方法中的return 结果 就会作为 query()的查询结果返回
该方法中能够拿到 sql语句查询到的rs结果集 拿到结果集 rs 然后我们对rs进行操作 将操作后的结果return出去

```java
ResultSetHandler<Customer> handler = new ResultSetHandler<Customer>() {
  @Override
  public Customer handle(ResultSet rs) throws SQLException {
    // 这样相当于写死了
    return new Customer(12, "成龙", "jackey@gmail.com", new Date(234425425L));


    // 正常是这样
    if(rs.next()) {
      int id = rs.getInt("id");
      String name = rs.getString("name");
      String email = rs.getString("email");
      Date birth = rs.getDate("birth");

      return new Customer(id, name, email, birth);
    }

    return null;
  }
};
```

```java
@Test
public void testQuery6() throws Exception {
  QueryRunner runner = new QueryRunner();
  Connection connection = JDBCUtils.getConnection3();

  String sql = "select id, name, email, birth from customers where id = ?";

  // 实现类匿名
  ResultSetHandler<Customer> handler = new ResultSetHandler<Customer>() {
    @Override
    public Customer handle(ResultSet rs) throws SQLException {
      ... 这个部分看上面
    }
  };

  Customer customer = runner.query(connection, sql, handler, "23");

  System.out.println(customer);
}
```

<br><br>

# 老师使用 QueryRunner 封装的 BaseDAO
```java
package com.atguigu.bookstore.dao;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;


/**
 * 定义一个用来被继承的对数据库进行基本操作的Dao
 * 
 * @author HanYanBing
 *
 * @param <T>
 */
public abstract class BaseDao<T> {
	private QueryRunner queryRunner = new QueryRunner();
	// 定义一个变量来接收泛型的类型
	private Class<T> type;

	// 获取T的Class对象，获取泛型的类型，泛型是在被子类继承时才确定
	public BaseDao() {
		// 获取子类的类型
		Class clazz = this.getClass();
		// 获取父类的类型
		// getGenericSuperclass()用来获取当前类的父类的类型
		// ParameterizedType表示的是带泛型的类型
		ParameterizedType parameterizedType = (ParameterizedType) clazz.getGenericSuperclass();
		// 获取具体的泛型类型 getActualTypeArguments获取具体的泛型的类型
		// 这个方法会返回一个Type的数组
		Type[] types = parameterizedType.getActualTypeArguments();
		// 获取具体的泛型的类型·
		this.type = (Class<T>) types[0];
	}

	/**
	 * 通用的增删改操作
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int update(Connection conn,String sql, Object... params) {
		int count = 0;
		try {
			count = queryRunner.update(conn, sql, params);
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return count;
	}

	/**
	 * 获取一个对象
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public T getBean(Connection conn,String sql, Object... params) {
		T t = null;
		try {
			t = queryRunner.query(conn, sql, new BeanHandler<T>(type), params);
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return t;
	}

	/**
	 * 获取所有对象
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public List<T> getBeanList(Connection conn,String sql, Object... params) {
		List<T> list = null;
		try {
			list = queryRunner.query(conn, sql, new BeanListHandler<T>(type), params);
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return list;
	}

	/**
	 * 获取一个但一值得方法，专门用来执行像 select count(*)...这样的sql语句
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public Object getValue(Connection conn,String sql, Object... params) {
		Object count = null;
		try {
			// 调用queryRunner的query方法获取一个单一的值
			count = queryRunner.query(conn, sql, new ScalarHandler<>(), params);
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return count;
	}
}
```
<br><br>

# DBUtils类关闭资源的操作
上面我们在JDBCUtils里面有关闭资源的逻辑 这个逻辑是我们自己写的
```java
public static void closeResource(Connection connection, Statement ps, ResultSet rs) {
  try {
    if(ps != null) ps.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
  try {
    if(connection != null) connection.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
  try {
    if(rs != null) rs.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
}
```

我们导入的 Apache-DBUtils jar包中有一个类 就叫做DBUtils

### 使用 dbutils.jar 中提供的 DbUtils 工具类 实现资源的关闭

### DbUtils.close(connection);
### DbUtils.close(ps);
### DbUtils.close(rs);
每关闭一个资源调用一次方法
这个方法需要try catch

```java
public static void closeResource2(Connection connection, Statement ps, ResultSet rs) {
  try {
    DbUtils.close(connection);
  } catch (SQLException e) {
    e.printStackTrace();
  }
  try {
    DbUtils.close(ps);
  } catch (SQLException e) {
    e.printStackTrace();
  }
  try {
    DbUtils.close(rs);
  } catch (SQLException e) {
    e.printStackTrace();
  }
}
```


### DbUtils.closeQuietly(connection);
### DbUtils.closeQuietly(ps);
### DbUtils.closeQuietly(rs);
这个方式也是资源关闭 不用try catch

```java
public static void closeResource2(Connection connection, Statement ps, ResultSet rs) {
  DbUtils.closeQuietly(connection);
  DbUtils.closeQuietly(ps);
  DbUtils.closeQuietly(rs);
}
```