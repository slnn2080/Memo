package com.sam.jdbc;

import com.mysql.cj.jdbc.Driver;
import org.junit.Test;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

public class JBDCTest {
  // 方式1
  @Test
  public void test() throws SQLException {
    Driver driver = new Driver();
    String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
    Properties info = new Properties();
    info.setProperty("user", "root");
    info.setProperty("password", "qwer6666");

    Connection connection = driver.connect(url, info);
    System.out.println(connection);
  }

  @Test
  public void test2() throws Exception {
    Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");
    Driver driver = (Driver) clazz.newInstance();

    String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
    Properties info = new Properties();
    info.setProperty("user", "root");
    info.setProperty("password", "qwer6666");

    Connection connection = driver.connect(url, info);
    System.out.println(connection);
  }

  @Test
  public void test3() throws Exception {
    Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");
    Driver driver = (Driver) clazz.newInstance();
    DriverManager.registerDriver(driver);

    String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
    String user = "root";
    String password = "qwer6666";
    Connection connection = DriverManager.getConnection(url, user, password);
    System.out.println(connection);
  }

  @Test
  public void test5() throws Exception {
    InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
    Properties properties = new Properties();
    properties.load(is);

    String user = properties.getProperty("user");
    String password = properties.getProperty("password");
    String url = properties.getProperty("url");
    String driverClass = properties.getProperty("driverClass");

    Class.forName(driverClass);
    Connection connection = DriverManager.getConnection(url, user, password);

    String sql = "insert into customers(name, email, birth) values(?,?,?)";
    PreparedStatement ps = connection.prepareStatement(sql);

    ps.setObject(1, "姥爷");
    ps.setObject(2, "laoye@gmail.com");
    ps.setObject(3, "2000-01-01");

    int i = ps.executeUpdate();
    if(i > 0) {
      System.out.println("插入成功");
    } else {
      System.out.println("插入失败");
    }

    ps.close();
    connection.close();
  }

  @Test
  public void test6() {

  }
}
