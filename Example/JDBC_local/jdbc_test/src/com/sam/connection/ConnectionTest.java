package com.sam.connection;

import org.junit.Test;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionTest {

  @Test
  public void testConnection1() throws SQLException {

    // 通过Driver接口来获取连接 Driver是son公司定义的接口中的一个
    // Driver driver = 右侧要传递一个 mysql 的具体的Driver的实现类 这样的实现类是各个厂商根据接口写的 也叫做驱动 我们需要把驱动加载进来
    // 加载驱动的方式:
    // 在工程下(module)创建一个lib文件夹 跟src同级 然后把下载好的jar包放入 lib文件夹下 这样我们才能使用jar包中的api
    // Driver接口有两个实现类 分别是 com.mysql.cj.jdbc.Driver 和 com.mysql.jdbc.Driver
    // 我们用的是 8.0的数据库 这里面我们先使用 带 cj 的
    /*
      com.mysql.jdbc.Driver驱动是mysql-connector-java 5中的
      com.mysql.cj.jdbc.Driver驱动是mysql-connector-java 6以上版本的

      JDBC连接Mysql5 com.mysql.jdbc.Driver

      driverClassName=com.mysql.jdbc.Driver

      url=jdbc:mysql://localhost:3306/book?useUnicode=true&characterEncoding=UTF-8&useSSL=false

      JDBC连接Mysql6 com.mysql.cj.jdbc.Driver 需要指定时区serverTimezone

      driverClassName=com.mysql.cj.jdbc.Driver

      url=jdbc:mysql://localhost:3306/book?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC

      UTC是国际时，UTC+8就是国际时加八小时，是东八区时间，是北京时间

      在设定时区的时候，如果设定serverTimezone=UTC，会比中国时间早8个小时，如果在中国，可以选择Asia/Shanghai或者Asia/Hongkon

      Asia/Tokyo

      北京时间==东八区时间！=北京当地时间
      serverTimezone=GMT%2B8
      serverTimezone=GMT%2B9  -- 是不是东京
    */
    Driver driver = new com.mysql.cj.jdbc.Driver();

    // url是统一资源定位符 用于定位互联网上的一个资源 我们要定位的就是要连接哪个数据库 类似我们在通过客户端登录的时候 会输入哪个主机地址下的 哪个端口下的 哪个数据库名 现在就是要通过url告诉我们要连哪个数据库 就像我们输入百度地址 看百度哪个页面是一样的
    String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";

    // Properties 里面是key=value型 要包含用户名和密码
    // 将用户名和密码封装在Properties中
    Properties info = new Properties();
    // 固定就是 user 和 password 作为key
    info.setProperty("user", "root");
    info.setProperty("password", "qwer6666");

    // 调用 driver对象的方法
    Connection connection = driver.connect(url, info);
    System.out.println(connection);
  }

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

  @Test
  public void testConnection4() throws Exception {
    // 1. 提供连接数据库所需要的基本信息
    String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
    String user = "root";
    String password = "qwer6666";


    // 2. 获取 Driver 实现类对象
//    Class.forName("com.mysql.cj.jdbc.Driver");

    // 3. 获取连接
    Connection connection = DriverManager.getConnection(url, user, password);

    System.out.println(connection);
  }

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
}
