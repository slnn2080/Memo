package com.sam.exer;

import java.util.List;

public class OrderTest {
  public static void main(String[] args) {
    Order<String> order = new Order<>();
    // 创建一个数组
    Integer[] arr = new Integer[] {1, 2, 3, 4 ,5};
    // 返回得就是Integer类型的List
    List<Integer> list = order.copyFromArrayToList(arr);
  }
}
