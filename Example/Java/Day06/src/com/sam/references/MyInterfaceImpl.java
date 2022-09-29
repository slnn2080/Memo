package com.sam.references;

public class MyInterfaceImpl implements MyInterface {

  // 接口中的抽象方法
  @Override
  public void methodAbstract() {
    System.out.println("实现类重写抽象方法");
  }

  // 接口中的默认方法
  @Override
  public void methodDefault() {
    System.out.println("实现类重写接口中的默认方法");
  }


  public static void main(String[] args) {
    // 接口中的静态方法只能由接口自己调用
    MyInterface.methodStatic();

    // 创建一个实现类对象 通过对象调用接口中的默认方法
    MyInterface impl = new MyInterfaceImpl();
    impl.methodDefault();
  }
}
