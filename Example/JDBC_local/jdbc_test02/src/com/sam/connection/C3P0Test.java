package com.sam.connection;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.junit.Test;

import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.SQLException;

public class C3P0Test {
  @Test
  public void testGetConnection() throws PropertyVetoException, SQLException {
    // ComboPooledDataSource是 DataSource接口的具体实现类
    // 获取C3P0数据库连接池
    ComboPooledDataSource cpds = new ComboPooledDataSource();

    // 这里相当于 我们写的properties文件
    cpds.setDriverClass( "com.mysql.cj.jdbc.Driver" );
    cpds.setJdbcUrl( "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC" );
    cpds.setUser("root");
    cpds.setPassword("qwer6666");

    // 在使用数据库连接池的时候我们可以做一些设置比如 初始的连接数量 峰值 最大 最小的数据库连接数量 最大的空闲时间等
    // 通过设置相关的参数 对数据库连接池进行管理
    // 设置初始时数据库连接池中初始的连接数
    // Appendix A: Configuration Properties
    cpds.setInitialPoolSize(10);

    // 通过 cpds 获取连接
    Connection connection = cpds.getConnection();
    System.out.println(connection);
  }

  @Test
  public void testGetConnection2() throws SQLException {
    // 指定xml配置文件 然后获取 c3p0连接池
    ComboPooledDataSource cpds = new ComboPooledDataSource("c3p0Test");
    Connection connection = cpds.getConnection();
    System.out.println(connection);
  }
}
