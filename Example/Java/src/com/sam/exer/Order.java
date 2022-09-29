package com.sam.exer;

// 当类当中的属性 有不确定类型的时候 我们可以给这个类加个"标签"
// K V 代表键值 常用的还有T E

import java.util.ArrayList;
import java.util.List;

// 当我们给类指定泛型的时候 那么类的内部结构就可以使用类的泛型
public class Order<T> {



  // 以前我们都喜欢这么定义属性的类型 这是非常确定的类型
  String orderName;
  int orderId;

  // 我们还可能会遇到这种情况 类中还有一个属性 但是这个属性的类型不太确定 我们就可以给类定义一个泛型 这样类中的结构就可以使用泛型了
  // 当然这里要注意的是 我们给类指明了泛型T 并不是类的类型是T 而是 泛型T 相当于一个参数 这个参数代表着泛型的意思 该泛型会在类实例化的时候确定类型
  // 我们声明一个T类型的变量
  T orderAttr;

  public Order() {
  }

  public Order(String orderName, int orderId, T orderAttr) {
     this.orderName = orderName;
     this.orderId = orderId;
     this.orderAttr = orderAttr;
  }

  public T getOrderAttr() {
    return this.orderAttr;
  }

  public void setOrderAttr(T orderAttr) {
    this.orderAttr = orderAttr;
  }

  public void show() {
    System.out.println(orderAttr);
  }

  // 泛型方法:
  public <E> List<E> copyFromArrayToList(E[] arr) {
    ArrayList<E> list = new ArrayList<>();
    for(E e: list) {
      list.add(e);
    }
    return list;
  }
}
