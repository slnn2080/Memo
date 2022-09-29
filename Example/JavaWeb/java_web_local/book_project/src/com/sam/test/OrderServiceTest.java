package com.sam.test;

import com.sam.dao.OrderService;
import com.sam.dao.impl.OrderServiceImpl;
import com.sam.pojo.Cart;
import com.sam.pojo.CartItem;
import org.junit.Test;

import java.math.BigDecimal;

import static org.junit.Assert.*;

public class OrderServiceTest {


  @Test
  public void createOrder() {
    Cart cart = new Cart();
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));

    // 添加一个一模一样的看看 是不是 数量会累加
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));
    cart.addItem(new CartItem(2, "数据结构与算法", 1, new BigDecimal(100), new BigDecimal(100)));

    OrderService orderService = new OrderServiceImpl();
    // 返回的订单号 我们看看返回的 和 数据库的一样不
    String orderId = orderService.createOrder(cart, 1);
    System.out.println(orderId);
  }
}