package com.sam.exer2;

import java.util.List;

public class DAOTest {
  public static void main(String[] args) {
    // 因为是泛型类 首先要指明泛型参数
    DAO<User> dao = new DAO<>();

    // 我们调用save()的之前要确保map实例化了 不然会报空指针 因为我们要将User放入map里面但是 Map还没有实例化
    dao.save("1001", new User(1001, 33, "周杰伦"));
    dao.save("1002", new User(1002, 22, "周杰"));
    dao.save("1003", new User(1003, 11, "周华健"));

    // 修改
    dao.update("1003", new User(1003, 55, "方文山"));


    // 调用list()
    List<User> list = dao.list();
    // java8 新特性来遍历
    list.forEach(System.out::println);
  }
}
