package com.sam.utils;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;


public class JdbcUtils {

  private static DruidDataSource dataSource;

  // 创建一个 ThreadLocal
  private static ThreadLocal<Connection> conns = new ThreadLocal<>();



  // 使用静态代码块 给 dataSource 属性做初始化
  static {
    try {
      Properties properties = new Properties();
      // 以反射的方式读取 jdbc.properties 配置文件
      InputStream inputStream = JdbcUtils.class.getClassLoader().getResourceAsStream("jdbc.properties");
      // 从流中加载数据
      properties.load(inputStream);

      // 创建了数据库连接池
      dataSource = (DruidDataSource) DruidDataSourceFactory.createDataSource(properties);

      // 判断数据库连接池是否创建成功 如果能得到连接就创建成功了
      // System.out.println(dataSource.getConnection());

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  // 为了测试连接池创建是否成功 我们创建一个main方法 main方法一加载当前类就会加载 类加载就会实行static代码块
  // public static void main(String[] args) { }

  // 获取数据库连接池中的连接的方法
  public static Connection getConnection() {
    // 从ThreadLocal中将保存的连接对象取出来
    Connection conn = conns.get();

    // 判断下 因为ThreadLocal中 第一次的时候 没保存连接的时候为null
    if(conn == null) {
      // 如果为空 那么我们的连接就从数据库连接池里面取
      try {
        conn = dataSource.getConnection();
        // 这样从连接池中获取到后 ThreadLocal中就有连接对象了 我们将这个连接对象保存到ThreadLocal中 供后面的jdbc操作使用
        conns.set(conn);

        // 设置为手动管理事务
        conn.setAutoCommit(false);

      } catch (SQLException e) {
        e.printStackTrace();
      }
    }

    // 如果返回的是null 说明获取连接失败 有值就是成功
    return conn;
  }

  // 提交事务 并关闭释放连接
  public static void commitAndClose() {
    // 先得到连接对象
    Connection connection = conns.get();
    if(connection != null) {
      // 说明以前用过这个连接操作过数据库

      try {
        // 手动提交事务
        connection.commit();
      } catch (SQLException e) {
        e.printStackTrace();
      } finally {
        try {
          // 关闭连接 释放资源
          connection.close();
        } catch (SQLException e) {
          e.printStackTrace();
        }
      }
    }

    // 一定要执行remove操作 否则就会出错(因为Tomcat服务器底层使用了线程池)
    conns.remove();
  }

  // 回滚事务 并关闭释放连接
  public static void rollbackAndClose() {
    // 先得到连接对象
    Connection connection = conns.get();
    if(connection != null) {
      // 说明以前用过这个连接操作过数据库

      try {
        // 回滚事务
        connection.rollback();
      } catch (SQLException e) {
        e.printStackTrace();
      } finally {
        try {
          // 关闭连接 释放资源
          connection.close();
        } catch (SQLException e) {
          e.printStackTrace();
        }
      }
    }

    // 一定要执行remove操作 否则就会出错(因为Tomcat服务器底层使用了线程池)
    conns.remove();
  }




  // 关闭连接 放回数据库连接池
//  public static void close(Connection conn) {
//    if(conn != null) {
//      try {
//        conn.close();
//      } catch (SQLException e) {
//        e.printStackTrace();
//      }
//    }
//  }
}
