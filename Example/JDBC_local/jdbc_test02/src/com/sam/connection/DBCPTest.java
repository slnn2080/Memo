package com.sam.connection;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.junit.Test;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

// 测试DBCP的数据库连接池技术
public class DBCPTest {

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

}
