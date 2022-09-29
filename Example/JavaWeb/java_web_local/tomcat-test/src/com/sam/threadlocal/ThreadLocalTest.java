package com.sam.threadlocal;

import java.util.Hashtable;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

public class ThreadLocalTest {
  // 我们先演示下 Map
  // new ConcurrentHashMap<>()是一个线程安全的map 高并发下使用的 类似的还有Hashtable
//  public final static Map<String, Object> data = new Hashtable<>();

  // 定义一个随机数对象
  private static Random random = new Random();

  // ThreadLocal只有一个泛型 就是value的类型 因为key就是当前线程
  // ThreadLocal是lang包下定义的
  public static ThreadLocal<Object> threadLocal = new ThreadLocal<>();


  // 创建一个类 实现线程接口 Runnable
  public static class Task implements Runnable {
    @Override
    public void run() {
      // 在run方法中 随机生成一个变量(该变量就是线程要关联的数据) 然后以当前线程名为key保存到map中
      Integer i = random.nextInt(1000);// 0-999
      String name = Thread.currentThread().getName();
      System.out.println("线程["+ name +"]生成的随机数是: " + i);

      // 保存到map中
//      data.put(name, i);

      // 通过 ThreadLocal.set() 方法 将数据传到 ThreadLocal里面
      threadLocal.set(i);

      // 模拟一些操作 比如我们睡一会 代表这段时间内进行了一些操作
      try {
        Thread.sleep(5000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      new OrderService().createOrder();

      // 在run方法结束之前 以当前线程名获取出数据并打印 查看是否可以取出
//      Object o = data.get(name);
      Object o = threadLocal.get();
      System.out.println("在线程["+ name +"]快结束时取出关联的数据是" + o);
    }
  }

  public static void main(String[] args) {
    // 在这里创建几个线程 for循环开启了3个线程 每一个线程都会生成一个随机数 并和自己的线程进行绑定
    for(int i=0; i<3; i++) {
      new Thread(new Task()).start();
    }
  }
}
