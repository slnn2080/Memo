package com.sam.references;

import org.junit.Test;

import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * 一、构造器引用
 *
 * 二、数组引用
 *
 *
 * Created by shkstart
 */
public class ConstructorRefTest {
	//构造器引用
    //Supplier中的T get()
    // T get()方法 没有参数但有返回值
    // 而Employee的空参构造器 Employee() 就长这个样子

    // get()是一个方法 我们把 Employee() 也看成一个方法 它俩都没有参数 get()返回得是T 而Employee()在new的时候就造了一个对象 造的对象就相当于T
    @Test
    public void test1(){
      // 原始的写法
      Supplier<Employee> sup = new Supplier<Employee>() {
        @Override
        public Employee get() {
          return new Employee();
        }
      };

      // Lambda表达式 这里我们new了一个对象使用的是构造器
      Supplier<Employee> sup1 = () -> new Employee();

      // 构造器引用 当我们调用的是空参构造器的时候 我们可以写成下面的样子
      Supplier<Employee> sup2 = Employee :: new;
	  }

	//Function中的R apply(T t) - Function<T, R>中的 R apply(T t)
  // public Empolyee(int id)
    @Test
    public void test2(){
      // <形参, 返回值类型>
      Function<Integer, Employee> fn1 = id -> new Employee(id);
      Employee employee = fn1.apply(1001);
      System.out.println(employee);


      // 构造器引用
      Function<Integer, Employee> fn2 = Employee :: new;
      Employee employee2 = fn2.apply(1002);
      System.out.println(employee2);
    }

	//BiFunction中的R apply(T t,U u)
    @Test
    public void test3(){
      BiFunction<Integer, String, Employee> fn = (id, name) -> new Employee(id, name);
      Employee erin = fn.apply(1006, "erin");
      System.out.println(erin);

      BiFunction<Integer, String, Employee> fn2 = Employee :: new;
      Employee nn = fn2.apply(1008, "nn");
      System.out.println(nn);
    }

	//数组引用
    //Function中的R apply(T t)
    @Test
    public void test4(){
      // 泛型不能用基本数据类型 如果用就要用包装类 返回String[] Integer是用来定义数组的长度的
      Function<Integer, String[]> fn = length -> new String[length];
      String[] arr = fn.apply(5);
      System.out.println(Arrays.toString(arr));

      // 数组引用
      Function<Integer, String[]> fn2 = String[] :: new;
    }
}
