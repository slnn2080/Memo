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

public class OrdersForQuery {

  @Test
  public void testQueryForOrder() {
    String sql = "select order_id orderId, order_name orderName, order_date orderDate from `order` where order_id = ?";
    Order order = queryForOrder(sql, 1);
    System.out.println(order);
  }

  public Order queryForOrder(String sql, Object ...args) {

    Connection connection = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      connection = JDBCUtils.getConnection();
      ps = connection.prepareStatement(sql);

      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      rs = ps.executeQuery();
      ResultSetMetaData rsmd = rs.getMetaData();
      int columnCount = rsmd.getColumnCount();

      if(rs.next()) {
        Order order = new Order();

        for(int i=0; i<columnCount; i++) {
          Object columnValue = rs.getObject(i + 1);
          String columnName = rsmd.getColumnName(i + 1);

          Field field = Order.class.getDeclaredField(columnName);
          field.setAccessible(true);
          field.set(order, columnValue);
        }

        return order;
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, ps, rs);
    }
    return null;
  }
}
