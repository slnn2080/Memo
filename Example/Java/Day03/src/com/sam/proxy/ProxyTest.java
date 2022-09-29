package com.sam.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

// 人类 接口
interface Human {
  // 获取信仰
  String getBelief();

  // 吃
  void eat(String food);
}


// 被代理类 (代理类要动态创建) 实现接口
class SuperMan implements Human {

  @Override
  public String getBelief() {
    return "我相信我能飞";
  }

  @Override
  public void eat(String food) {
    System.out.println("我喜欢吃: " + food);
  }
}

class HumanUtil {
  public void method1() {
    System.out.println("通用方法1+++++");
  }

  public void method2() {
    System.out.println("通用方法2-----");
  }
}



// 创建专门生成代理类的工厂
class ProxyFactory {
  public static Object getProxyInstance(Object obj) {

    // 参数3
    // 创建MyInvocationHandler的实例对象
    MyInvocationHandler handler = new MyInvocationHandler();

    // 通过bind()方法 给被代理类进行赋值操作
    handler.bind(obj);

    // 代理类对象
    return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);
  }
}

class MyInvocationHandler implements InvocationHandler {

  // 声明被代理类对象
  private Object obj;
  public void bind(Object obj) {
    this.obj = obj;
  }

  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

    HumanUtil util = new HumanUtil();
    util.method1();

    // obj本身就是被代理类对象
    Object returnVal = method.invoke(obj, args);

    util.method2();

    return returnVal;
  }
}

public class ProxyTest {

  public static void main(String[] args) {
    SuperMan superMan = new SuperMan();

    Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);

    String belief = proxyInstance.getBelief();
    System.out.println(belief);
    proxyInstance.eat("四川麻辣烫");
  }
}
