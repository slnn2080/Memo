package com.sam.pojo;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Cart {

  // Map的key是商品编号 value是商品信息
  private Map<Integer, CartItem> items = new LinkedHashMap<>();

  // 添加商品项
  public void addItem(CartItem cartItem) {
    // 当我们把 items 的数据类型变成 Map 后 我们判断添加商品的id是否已经在Map中的逻辑就不用自己for循环判断了
    CartItem item = items.get(cartItem.getId());
    if(item == null) {
      // 之前没有添加过此商品
      items.put(cartItem.getId(), cartItem);
    } else {
      // 已经添加过的情况 要 数量累加 和 总金额更新
      // 取出原来的数量 + 1
      item.setCount(item.getCount() + 1);
      // 单价 X 数量
      item.setTotalPrice(item.getPrice().multiply(new BigDecimal(item.getCount())));
    }
  }

  // 删除商品项
  public void deleteItem(Integer id) {
    // 这是调用map的方法
    items.remove(id);
  }

  // 清空购物车
  public void clear() {
    // 这是调用map的方法
    items.clear();
  }

  // 修改商品数量
  public void updateCount(Integer id, Integer count) {
    // 先查看购物车中是否有此商品 如果 有修改商品数量更新总价格
    CartItem cartItem = items.get(id);
    if(cartItem != null) {
      // 修改商品数量 更新总金额
      cartItem.setCount(count);
      cartItem.setTotalPrice(cartItem.getPrice().multiply(new BigDecimal(cartItem.getCount())));
    }
  }

  @Override
  public String toString() {
    return "Cart{" +
        "totalCount=" + getTotalCount() +
        ", totalPrice=" + getTotalPrice() +
        ", items=" + items +
        '}';
  }

  public Integer getTotalCount() {
    Integer totalCount = 0;
    // 遍历map集合中的每一个entry
    for(Map.Entry<Integer, CartItem> entry: items.entrySet()) {
      totalCount += entry.getValue().getCount();
    }
    return totalCount;
  }

  public BigDecimal getTotalPrice() {
    BigDecimal totalPrice  = new BigDecimal(0);

    for(Map.Entry<Integer, CartItem> entry: items.entrySet()) {

      // 当前的总金额 + 每一个商品项的总金额
      totalPrice = totalPrice.add(entry.getValue().getTotalPrice());
    }
    return totalPrice;
  }

  public Map<Integer, CartItem> getItems() {
    return items;
  }

  public void setItems(Map<Integer, CartItem> items) {
    this.items = items;
  }
}
