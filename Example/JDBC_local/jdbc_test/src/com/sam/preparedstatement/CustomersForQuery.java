package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.*;

// 针对 Customers 表的查询操作
public class CustomersForQuery {

  @Test
  public void testQueryForCustomers() {
    String sql = "select id, name, birth, email from customers where id = ?";
    Customer customer = queryForCustomers(sql, 13);
    System.out.println(customer);
  }

  // 针对于 customers 表的通过的查询操作
  public Customer queryForCustomers(String sql, Object ...args) {
    Connection connection = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      connection = JDBCUtils.getConnection();
      ps = connection.prepareStatement(sql);
      // 填充占位符
      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      rs = ps.executeQuery();


      // 获取结果集的元数据 修饰结果集的数据 都在 rsmd 中
      ResultSetMetaData rsmd = rs.getMetaData();

      // 通过 rsmd 获取结果集中的列数
      int columnCountcount = rsmd.getColumnCount();

      if(rs.next()) {
        /*
          这里取几次呢 也就是说 我们调用几次 rs.getXxx() 调用几次是由 select 几个字段 form 决定的
          这几个字段决定了我们结果集有几列 结果集有几列就意味着我们要调用几次 rs.getXxx() 方法

          那怎么获取结果集的列数？ 获取结果集的列数的方法被封装到结果集的元数据当中了
        */

        // 写到if里面 当有结果的时候 我们再造对象
        Customer customer = new Customer();

        // 处理结果集一行数据中的每一个列
        for(int i=0; i<columnCountcount; i++) {
          // 获取每个字段的值
          Object columnValue = rs.getObject(i + 1);

          // 将数据放入到对象 利用set方法来操作 不要用构造器 对象造一次就行 写在for循环的外侧
          // 给 customer对象 指定的某个属性 赋值为value 这样我们就要获取结果集中的列名

          // 获取 每个列的列名 也在结果集的元数据中
          String columnName = rsmd.getColumnName(i + 1);
          // 通过反射 给customer对象指定的columnName属性 赋值为columnValue
          // 获取运行时类的指定属性
          Field field = Customer.class.getDeclaredField(columnName);
          field.setAccessible(true);

          // 将这个属性名的值设置为
          field.set(customer, columnValue);
        }

        return customer;
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, ps, rs);
    }

    return null;
  }

  @Test
  public void testQuery1() {
    Connection connection = null;
    PreparedStatement ps = null;
    ResultSet resultSet = null;
    try {
      connection = JDBCUtils.getConnection();

      String sql = "select id, name, email, birth from customers where id = ?";
      ps = connection.prepareStatement(sql);

      // 补充 占位符
      ps.setObject(1, 1);

      // 增删改的操作的时候 这里我们调用的是 ps.execute() 我们这里要执行后还要返回一个结果集 所以我们要调用
      // 调用ps对象的 执行并返回结果集的方法
      resultSet = ps.executeQuery();

      // 处理结果集
      if(resultSet.next()) {
        // 进来说明下一条是有记录的 然后我们就要获取当前这条数据的各个字段值
        int id = resultSet.getInt(1);
        String name = resultSet.getString(2);
        String email = resultSet.getString(3);
        // 是sql下的Date
        Date birth = resultSet.getDate(4);

        // 上面拿到了每个字段的数据 我们怎么处理这些数据
        // 方式1: 保存到数组中
        // Object[] data = new Object[] {id, name, email, birth};

        // 方式2: 保存到对象中(封装到类的对象中)
        Customer customer = new Customer(id, name, email, birth);
        System.out.println(customer);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      // 关闭资源
      JDBCUtils.closeResource(connection, ps, resultSet);
    }
  }
}
