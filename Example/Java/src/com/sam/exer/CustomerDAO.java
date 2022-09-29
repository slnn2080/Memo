package com.sam.exer;

// 我们让这个类直接继承DAO 继承的时候我们要指明 父类中的泛型为Customer 因为这个类就是操作Customer的
public class CustomerDAO extends DAO<Customer> {
  // 由于我们这个类时继承DAO的 那么DAO中那些通用的操作数据库的方法 就会被继承过来
}
