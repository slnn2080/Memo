package com.sam.transaction;

import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.*;

public class TransactionTest {

  /*
    针对于数据表 user_table 来说:
    AA用户给BB用户转账 100

    update user_table set balance = balance - 100 where user = 'AA';

    update user_table set balance = balance + 100 where user = 'BB';
   */
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


  // 通用的增删改的操作
  public int update(String sql, Object ...args) {
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

      return ps.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, ps);
    }

    return 0;
  }

  @Test
  public void testUpdateWithTx() {
    Connection connection = null;
    try {
      // 获取连接
      connection = JDBCUtils.getConnection();

      // 取消数据的自动提交
      connection.setAutoCommit(false);

      String sqlAA = "update user_table set balance = balance - 100 where user = ?";
      update(connection, sqlAA, "AA");

      // 模拟网络异常 导致转账在这失败
      // System.out.println(10 / 0);

      String sqlBB = "update user_table set balance = balance + 100 where user = ?";
      update(connection, sqlBB, "BB");

      System.out.println("转账成功");

      // 逻辑完成(转账成功)后 再提交
      connection.commit();

    } catch (Exception e) {
      e.printStackTrace();

      // 当出现异常的时候我们要回滚数据
      try {
        connection.rollback();
      } catch (SQLException ex) {
        ex.printStackTrace();
      }

    } finally {
      // 关闭连接之前 恢复commit的状态
      try {
        connection.setAutoCommit(true);
      } catch (SQLException e) {
        e.printStackTrace();
      }

      // 关闭资源 参数2为空 我们仅需要关闭 connection
      JDBCUtils.closeResource(connection, null);
    }
  }

  // 考虑数据库事务的 通过增删改操作
  // 我们增加一个参数 从外面传递进来一个连接
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

  // **************

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

}
