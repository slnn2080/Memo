package com.sam.references;

public interface MyInterface {
  // 抽象方法 -- 没写权限默认是public
  void methodAbstract();

  // 静态方法 -- 没写权限默认是public
  static void methodStatic() {
    System.out.println("我是接口中的静态方法");
  }

  // 默认方法 -- 没写权限默认是public
  default void methodDefault() {
    System.out.println("我是接口中的默认方法");

    // 接口中的私有方法是接口内部自己调用的
    methodPrivate();
  }

  // 私有方法
  private void methodPrivate() {
    System.out.println("我是接口中的私有方法");
  }
}
