package com.sam.exer;

import java.util.List;

/*
* DAO: data(base) access object 数据访问对象  baseDAO
* DAO用来封装一个base里面是通用的操作 然后我们new它的子类 用来操作某一个表
*
* - 后面我们操作数据库的时候需要提供一个java类 - DAO 在这个类中我们定义一些操作数据库的通用操作
*
* 数据库的一张表对应java层面就是一个类 DAO里面封装一些操作一个类的增删改查的操作
*
* 既然我们要在DAO里面定义一些通用的对数据库的操作 而我们的数据库中会有很多张表 每一张表都可能有增删改查
*
* 而我们的DAO又是一个基本的结构 我们到底要操作哪一张表
* 数据库的每一张表对应着java里面的一个类 添加一条记录相当于多造一条类的对象 删一条记录就是把对象删掉 修改表中的某一个属性 就是将对应的属性set一下
*
* 那我们要操作哪一个表(哪一个类)呢？  不确定 这时候就可以用到泛型
* */
public class DAO<T> {

  // 添加一条记录
  public void add(T t) {
    System.out.println("添加逻辑");
  }

  // 删除一条记录
  public boolean remove(int index) {
    System.out.println("删除逻辑");
    return true;
  }

  // 修改一条记录
  public void update(int index) {
    System.out.println("修改逻辑");
  }

  // 查询一条记录
  public T get(int index) {
    System.out.println("查找逻辑");
    return null;
  }

  // 查询多条记录
  public List<T> getAll(int index) {
    System.out.println("查找小于index的所有数据");
    return null;
  }


  // 有可能也会在DAO中定义泛型方法
  // 举例: 泛型方法因为有不确定性 因为不确定性我们才写成M的 那就意味着调用的时候可能有多种情况
  // 比如 我们要获取表中一种有多少条记录 -- long
  // 比如 获取最大的员工的入职时间 -- Date

  // 就因为方法的返回值的类型不确定 所以方法才定义成一个泛型方法
  public <M> M getValue() {
    return null;
  }

}
