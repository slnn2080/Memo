package com.sam.test;

import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;
import org.junit.Test;

import static org.junit.Assert.*;

public class UserServiceTest {

  // 先创建一个 UserService 的实现类对象
  UserService userService = new UserServiceImpl();

  @Test
  public void registUser() {
    // id是自增的 所以是null
    userService.registUser(new User(null, "erin", "111111", "erin@gmail.com"));
  }

  @Test
  public void login() {
    // 根据用户名和密码来进行登录
    if(userService.login(new User(null, "sam", "111111", null)) == null) {
      System.out.println("登录失败");
    } else {
      System.out.println("登录成功");
    }
  }

  @Test
  public void existsUsername() {
    if(userService.existsUsername("nn")) {
      System.out.println("用户名已存在");
    } else {
      System.out.println("用户名可用");
    }
  }
}