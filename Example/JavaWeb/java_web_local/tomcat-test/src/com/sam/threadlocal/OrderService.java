package com.sam.threadlocal;

public class OrderService {

  // 创建订单
  public void createOrder() {
    // 我们在这个方法中要取 ThreadLocalTest中Task 当前线程中存取的数据(随机数) 怎么取
    // 我们通过当前线程名取 它对应的数据
    String name = Thread.currentThread().getName();
//    System.out.println("OrderService 当前线程["+ name +"]中保存的数据是: " + ThreadLocalTest.data.get(name));
    Object o = ThreadLocalTest.threadLocal.get();
    System.out.println("OrderService 当前线程["+ name +"]中保存的数据是: " + o);

  }
}
