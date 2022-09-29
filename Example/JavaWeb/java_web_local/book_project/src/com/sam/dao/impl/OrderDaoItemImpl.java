package com.sam.dao.impl;

import com.sam.dao.OrderItemDao;
import com.sam.pojo.OrderItem;

public class OrderDaoItemImpl extends BaseDao implements OrderItemDao {
  @Override
  public int saveOrderItem(OrderItem orderItem) {
    String sql = "insert into t_order_item(`name`, `count`, `price`, `total_price`, `order_id`) values(?,?,?,?,?)";
    return update(sql, orderItem.getName(), orderItem.getCount(), orderItem.getPrice(), orderItem.getTotalPrice(), orderItem.getOrderId());
  }
}
