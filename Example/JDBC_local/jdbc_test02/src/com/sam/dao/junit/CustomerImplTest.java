package com.sam.dao.junit;

import com.sam.bean.Customer;
import com.sam.dao.CustomerDAOImpl;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;

public class CustomerImplTest {
  // 我们要测 impl 类中的方法 需要先提供一个对象
  CustomerDAOImpl dao = new CustomerDAOImpl();

  @Test
  public void testInsert() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      // id是自增长的 我们传递个1 也没用 但是传递null不行
      Customer customer = new Customer(1, "who", "who@gmail.com", new Date(5235262626L));
      dao.insert(connection, customer);
      System.out.println("添加成功");
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testDeleteById() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      dao.deleteById(connection, 22);
      System.out.println("删除成功");
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testUpdate() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      // 修改是要根据id修改 这时候对象中的id就要指定
      Customer customer = new Customer(18, "贝多芬", "beiduofen@gamil.com", new Date(34532543L));
      dao.update(connection, customer);
      System.out.println("修改成功");
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetCustomerById() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      Customer customer = dao.getCustomerById(connection, 19);
      System.out.println(customer);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetAll() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      List<Customer> list = dao.getAll(connection);
      list.forEach(System.out :: println);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetCount() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();
      Long count = dao.getCount(connection);
      System.out.println(count);

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
  @Test
  public void testGetMaxBirth() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection();

      Date maxBirth = dao.getMaxBirth(connection);
      System.out.println(maxBirth); // 2014-01-17

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
}
