package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.bean.Order;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

public class PreparedStatementQueryTest {

  @Test
  public void testGetForList() {
    String sql = "select id, name, email, birth from customers where id < ?";
    List<Customer> list = getForList(Customer.class, sql, 12);

    list.forEach(System.out :: println);
  }

  public <T> List<T> getForList(Class<T> clazz, String sql, Object ...args) {
    Connection connection = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    ArrayList<T> list = null;

    try {
      // 获取连接
      connection = JDBCUtils.getConnection();
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

      // 创建一个承装对象的结合
      list = new ArrayList<>();


      // 多条记录
      while(rs.next()) {
        // 循环中 每次都创建一个t对象
        T t = clazz.newInstance();

        // 通过 for 将t对象的所有的属性都附上值了
        for(int i=0; i<columnCount; i++) {
          String columnLabel = rsmd.getColumnLabel(i + 1);
          Object columnValue = rs.getObject(i + 1);

          Field field = clazz.getDeclaredField(columnLabel);
          field.setAccessible(true);
          field.set(t, columnValue);
        }

        // 把对象添加到集合中
        list.add(t);
      }

      // while循环结束后
      return list;

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, ps, rs);
    }

    return null;
  }

  @Test
  public void testGetInstance() throws Exception {
    String sql = "select id, name, email, birth from customers where id = ?";
    Customer customer = getInstance(Customer.class, sql, 1);
    System.out.println(customer);
  }

  public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception {

    // 获取连接
    Connection connection = JDBCUtils.getConnection();
    // 预编译sql
    PreparedStatement ps = connection.prepareStatement(sql);

    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i+1, args[i]);
    }

    // 执行并获取结果集
    ResultSet rs = ps.executeQuery();

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

    JDBCUtils.closeResource(connection, ps, rs);
    return null;
  }
}
