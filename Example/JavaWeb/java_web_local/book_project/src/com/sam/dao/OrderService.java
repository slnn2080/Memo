package com.sam.dao;

import com.sam.pojo.Cart;

public interface OrderService {
  public String createOrder(Cart cart, Integer userId);
}
