package com.sam.references;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamTest {
  @Test
  public void test() {
    // 1. 先创建一个集合 里面是一个个的员工数据
    List<Employee> list = EmployeeData.getEmployees();

    // 2. 通过集合对象 调用stream() 这样我们就拿到了Stream对象 - 顺序流
    Stream<Employee> stream = list.stream();
    // 这里我们是调用的List接口中的方法

    // 通过集合对象 调用parallelStream() 返回得是并行流Stream对象
    Stream<Employee> parallelStream = list.parallelStream();
  }

  @Test
  public void test2() {
    // 提供一个int[]数组
    int[] arr = {1, 2, 3};
    IntStream intStream = Arrays.stream(arr);

    // 自定义的数组
    Employee e1 = new Employee(1001, "sam");
    Employee e2 = new Employee(1002, "erin");
    Employee[] arr1 = new Employee[]{e1, e2};

    Stream<Employee> stream = Arrays.stream(arr1);
  }


  @Test
  public void test3() {
    Stream<Integer> integerStream = Stream.of(1, 2, 3, 6);

  }

  @Test
  public void test4() {
    // 创建无限个元素对应的stream

    // 遍历前10个偶数 先给个种子(seed) T apply(T t) 它会拿着返回得值又往里迭代再+2周而复始
    // 这个我们就要用到终止操作了 不然没办法停下来 forEach()就是终止操作 里面要填入消费者
    // Consumer<> 消费者的模式就是让进去就不出东西了 典型的消费者模式就是输出语句
    Stream.iterate(0, t -> t + 2).limit(10).forEach(System.out :: println);

    Stream.generate(Math :: random).limit(10).forEach(System.out :: println);
  }
}
