package com.sam.test;

import com.sam.dao.OrderDao;
import com.sam.dao.impl.OrderDaoImpl;
import com.sam.pojo.Order;
import org.junit.Test;

import java.math.BigDecimal;
import java.util.Date;

import static org.junit.Assert.*;

public class OrderDaoTest {

  @Test
  public void saveOrder() {
    OrderDao orderDao = new OrderDaoImpl();
    // 注意 user_id 是不能乱写的 必须是用户表里面存在的
    orderDao.saveOrder(new Order("123457890", new Date(), new BigDecimal(100), 0, 1));
  }
}