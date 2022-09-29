package com.sam.proxy;

// 创建一个接口
interface ClothFactory {
  // 衣服工厂就会有生产衣服的功能
  void produceCloth();
}

// 我们会先造代理类的对象 然后会调用构造器 我们传递进来一个factory
// 代理类
class ProxyClothFactory implements ClothFactory {
  // 用被代理对象进行实例化
  private ClothFactory factory;

  // 构造器 提供参数对 factory 属性 进行初始化
  public ProxyClothFactory(ClothFactory factory) {
    this.factory = factory;
  }

  // 当我们通过代理类对象调用produceCloth方法的时候
  @Override
  public void produceCloth() {
    System.out.println("代理工厂做一些准备工作");
    // factory是被代理类 也就是代理类调用的produceCloth()的内部 实际上内部是被代理类调用自己的produceCloth()
    factory.produceCloth();

    System.out.println("代理工厂做一些后续的收尾工作");
  }
}

// 被代理类 nick的衣服工厂
class NickClothFactory implements ClothFactory {

  @Override
  public void produceCloth() {
    System.out.println("Nick工厂生产一批运动服");
  }
}

public class StaticProxyTest {
  public static void main(String[] args) {
    // 1. 我们要造代理类的对象 但是代理类对象里面又需要一个参数(被代理类对象) 所以我们先造一个被代理类对象

    // 被代理类对象
    NickClothFactory nike = new NickClothFactory();

    // 代理类对象 代理类对象的类型写ProxyClothFactory 还是ClothFactory(接口) 都可以
    ClothFactory proxyClothFactory = new ProxyClothFactory(nike);

    // ClothFactory接口中声明过produceCloth()方法 这里就相当于是多态的形式一样 proxyClothFactory明明是代理类对象 我们调用produceCloth()方法 在编译期间 会因为是接口中的produceCloth()方法 实际执行的都是代理对象里面重写后的方法
    proxyClothFactory.produceCloth();

  }
}
