package com.sam.preparedstatement;

import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Properties;

public class PreparedStatementUpdateTest {
  /*
    需求:
      通用的 增删改 操作
      String sql: sql语句
      Object ...args: 占位符 要求: 有几个占位符 我们就传入几个实参
      可变形参的个数 要与 sql中占位符的个数是一样的
  */
  public void update(String sql, Object ...args) {
    Connection connection = null;
    PreparedStatement ps = null;
    try {
      connection = JDBCUtils.getConnection();
      ps = connection.prepareStatement(sql);

      // 使用 ...args 填充占位符
      for(int i = 0; i < args.length; i++) {
        // 小心index从1开始 args数组要从0开始
        ps.setObject(i + 1, args[i]);
      }

      ps.execute();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, ps);
    }
  }

  @Test
  public void testCommonUpdate() {
    // 删除表中数据
    // String sql = "delete from customers where id = ?";
    // update(sql, 3);

    String sql = "update from order set order_name = ? where order_id = ?";
    update(sql, "DD", "2");
  }



  /*
    需求:
      修改 customers 表中添加一条记录
  */
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



  /*
    需求:
      向 customers 表中添加一条记录
  */
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
}
