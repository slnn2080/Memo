package com.sam.test;

import com.sam.pojo.Cart;
import com.sam.pojo.CartItem;
import org.junit.Test;

import java.math.BigDecimal;

import static org.junit.Assert.*;

public class CartTest {

  @Test
  public void addItem() {
    // 创建购物车对象
    Cart cart = new Cart();
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));

    // 添加一个一模一样的看看 是不是 数量会累加
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));
    cart.addItem(new CartItem(2, "数据结构与算法", 1, new BigDecimal(100), new BigDecimal(100)));

    // 打印购物车 看看购物车中的数据是否正确
    System.out.println(cart);
  }

  @Test
  public void deleteItem() {
    Cart cart = new Cart();
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));

    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));
    cart.addItem(new CartItem(2, "数据结构与算法", 1, new BigDecimal(100), new BigDecimal(100)));

    // 删除 1 这时候不是数量-1 而是把整个的商品项 删掉了
    cart.deleteItem(1);

    System.out.println(cart);
  }

  @Test
  public void clear() {
    Cart cart = new Cart();
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));

    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));
    cart.addItem(new CartItem(2, "数据结构与算法", 1, new BigDecimal(100), new BigDecimal(100)));

    // 删除 1 这时候不是数量-1 而是把整个的商品项 删掉了
    cart.deleteItem(1);
    cart.clear();
    System.out.println(cart);
  }

  @Test
  public void updateCount() {
    Cart cart = new Cart();
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));

    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));
    cart.addItem(new CartItem(2, "数据结构与算法", 1, new BigDecimal(100), new BigDecimal(100)));

    cart.deleteItem(1);
    cart.clear();

    // 清空之后又添加了一次商品
    cart.addItem(new CartItem(1, "java从入门到精通", 1, new BigDecimal(1000), new BigDecimal(1000)));
    // 然后我们对这个商品的数量进行修改
    cart.updateCount(1, 10);

    System.out.println(cart);
  }
}