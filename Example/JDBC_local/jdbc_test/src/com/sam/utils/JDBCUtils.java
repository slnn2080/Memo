package com.sam.utils;


import com.sam.preparedstatement.PreparedStatementUpdateTest;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

/**
 * @desc 操作数据库的工具类
 */
public class JDBCUtils {

  // 获取数据库连接
  public static Connection getConnection() throws Exception {
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
}
