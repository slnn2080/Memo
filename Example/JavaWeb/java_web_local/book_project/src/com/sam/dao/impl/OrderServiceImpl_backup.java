package com.sam.dao.impl;

import com.sam.dao.BookDao;
import com.sam.dao.OrderDao;
import com.sam.dao.OrderItemDao;
import com.sam.dao.OrderService;
import com.sam.pojo.*;

import java.util.Date;
import java.util.Map;

public class OrderServiceImpl_backup implements OrderService {

  private OrderDao orderDao = new OrderDaoImpl();
  private OrderItemDao orderItemDao = new OrderDaoItemImpl();

  // 我们需要用到bookDao
  private BookDao bookDao = new BookDaoImpl();

  @Override
  public String createOrder(Cart cart, Integer userId) {

    String orderId = System.currentTimeMillis() + "" + userId;
    Order order = new Order(orderId, new Date(), cart.getTotalPrice(), 0, userId);
    orderDao.saveOrder(order);

    // 制造错误 测试回滚
    // int i = 12 / 0;

    for(Map.Entry<Integer, CartItem> entry: cart.getItems().entrySet()) {
      CartItem cartItem = entry.getValue();
      OrderItem orderItem = new OrderItem(null, cartItem.getName(), cartItem.getCount(), cartItem.getPrice(), cartItem.getTotalPrice(), orderId);

      orderItemDao.saveOrderItem(orderItem);

      // 更新库存和销量
      Book book = bookDao.queryBookById(cartItem.getId());
      // 销量 = 原来的销量 和 图书的数量(买了几本)
      book.setSales(book.getSales() + cartItem.getCount());
      // 库存 = 原来的库存 - 图书的数量(买了几本)
      book.setStock(book.getStock() - cartItem.getCount());

      // 修改后 我们还要将修改结果保存下
      bookDao.updateBook(book);
    }

    cart.clear();
    return orderId;
  }
}
