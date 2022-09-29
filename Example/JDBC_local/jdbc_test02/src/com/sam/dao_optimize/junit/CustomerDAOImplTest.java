package com.sam.dao_optimize.junit;

import com.sam.bean.Customer;
import com.sam.dao_optimize.CustomerDAOImpl;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;

public class CustomerDAOImplTest {
  CustomerDAOImpl dao =  new CustomerDAOImpl();
  @Test
  public void testGetCustomerById() {
    Connection connection = null;

    try {
      connection = JDBCUtils.getConnection3();
      Customer customer = dao.getCustomerById(connection, 19);
      System.out.println(customer);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, null);
    }
  }
}
