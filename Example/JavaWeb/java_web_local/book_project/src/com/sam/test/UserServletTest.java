package com.sam.test;


import java.lang.reflect.Method;

public class UserServletTest {
  public void login() {
    System.out.println("login()");
  }

  public void regist() {
    System.out.println("regist()");
  }

  public void updateUser() {
    System.out.println("updateUser()");
  }

  public static void main(String[] args) {
    String action = "login";

    // 1. 方法名 2. 参数类型(没有参数省略不写)
    try {
      Method method = UserServletTest.class.getDeclaredMethod(action);
      // 1. 对象实例 2. 参数 调用方法
      method.invoke(new UserServletTest());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
