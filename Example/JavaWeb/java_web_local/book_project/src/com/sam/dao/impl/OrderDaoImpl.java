package com.sam.dao.impl;

import com.sam.dao.OrderDao;
import com.sam.pojo.Order;

public class OrderDaoImpl extends BaseDao implements OrderDao {
  @Override
  public int saveOrder(Order order) {
    // 这里是保存的操作
    String sql = "insert into t_order(`order_id`, `create_time`, `price`, `status`, `user_id`) values(?,?,?,?,?)";
    return update(sql, order.getOrderId(), order.getCreateTime(), order.getPrice(), order.getStatus(), order.getUserId());
  }
}
