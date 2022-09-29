package com.sam.exer;

import org.junit.Test;

import java.util.List;

public class DAOTest {
  @Test
  public void test() {
    // 我们造一个CustomerDAO 用于专门操作数据库的某一张表
    CustomerDAO customerDAO = new CustomerDAO();
    // 这时候我们add(Customer t) 只能添加Customer 也就是说这个customerDAO 只是用来操作Customer的
    customerDAO.add(new Customer());
    List<Customer> list = customerDAO.getAll(2);
    Customer customer = customerDAO.get(1);
  }

  // 比如我们还要操作student表 那么首先我们就创建一个student的类 类中的属性就惨遭数据库中表的字段 然后我们创建一个StudentDAO 继承 DAO的同时 指明泛型参数的类型 就是Student 这样我们创建StudentDAO的对象 然后调用方法的时候 只能操作student表了

  // 后续我们有必要把一个类设计成泛型的 因为有不确定性
}
