package com.sam.references;

import org.junit.Test;

import java.util.Optional;

public class Java10Test {
  @Test
  public void test() {
    Optional<Object> op = Optional.empty();
    // 判断内部的value是否存在
    System.out.println(op.isPresent());

    // 判断内部的value是否为空
    System.out.println(op.isEmpty());

    op = Optional.of("abc");
    Object o = op.orElseThrow();
    // 如果op里面的value非空 就返回具体的值
    System.out.println(o);

    // or()方法的参数要放一个供给者 没参数返回东西 返回一个Optional对象
    Optional<String> op1 = Optional.of("hello");
    Optional<Object> op2 = op.or(() -> op1);
    System.out.println(op2);

  }
}
