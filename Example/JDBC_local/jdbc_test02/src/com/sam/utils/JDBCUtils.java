package com.sam.utils;


import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.apache.commons.dbutils.DbUtils;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

/**
 * @desc 操作数据库的工具类
 */
public class JDBCUtils {

  // 下面都是静态方法 这里也要定义为静态的
  // 数据库连接池只需要提供一个就可以了
  private static ComboPooledDataSource cpds = new ComboPooledDataSource("c3p0Test");

  // 使用c3p0数据库连接池技术
  public static Connection getConnection() throws Exception {
    Connection connection = cpds.getConnection();
    return connection;
  }


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

  private static DataSource source2;
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

  // 关闭资源
  // 要点: PreparedStatement 这个对象 mysql 包中也有 不要导 我们要导sql中的 这样更加的通用
  // 要点: Statement PreparedStatement是Statement的子接口 参数我们也可以定义的大一些
  public static void closeResource(Connection connection, Statement ps) {
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

  // 关闭资源2
  // 利用方法的重载 再新增一个方法 注意我们形参指定的都是接口 这也是面向接口编程
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

  public static void closeResource2(Connection connection, Statement ps, ResultSet rs) {
    DbUtils.closeQuietly(connection);
    DbUtils.closeQuietly(ps);
    DbUtils.closeQuietly(rs);
  }
}
