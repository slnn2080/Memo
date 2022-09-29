package com.sam.test;

import com.sam.dao.OrderItemDao;
import com.sam.dao.impl.OrderDaoItemImpl;
import com.sam.pojo.OrderItem;
import org.junit.Test;

import java.math.BigDecimal;

import static org.junit.Assert.*;

public class OrderItemDaoTest {

  @Test
  public void saveOrderItem() {
    OrderItemDao orderItemDao = new OrderDaoItemImpl();
    // 注意 订单号 也有外键约束
    orderItemDao.saveOrderItem(new OrderItem(null, "java从入土到放弃", 1, new BigDecimal(100), new BigDecimal(100), "123457890"));
    orderItemDao.saveOrderItem(new OrderItem(null, "javascript从入土到放弃", 2, new BigDecimal(100), new BigDecimal(200), "123457890"));
    orderItemDao.saveOrderItem(new OrderItem(null, "ts从入土到放弃", 1, new BigDecimal(100), new BigDecimal(100), "123457890"));
  }
}