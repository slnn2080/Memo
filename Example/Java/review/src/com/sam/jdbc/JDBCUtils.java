package com.sam.jdbc;

import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class JDBCUtils {
  public static Connection getConnection() throws Exception {
    InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
    Properties properties = new Properties();
    properties.load(is);

    String user = properties.getProperty("user");
    String password = properties.getProperty("password");
    String url = properties.getProperty("url");
    String driverClass = properties.getProperty("driverClass");

    Class.forName(driverClass);

    return DriverManager.getConnection(url, user, password);
  }

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
