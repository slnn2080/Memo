package com.sam.test;

import com.sam.dao.impl.UserDaoImpl;
import com.sam.pojo.User;
import org.junit.Test;

import static org.junit.Assert.*;

public class UserDaoTest {

  UserDaoImpl userDao = new UserDaoImpl();

  @Test
  public void queryUserByUsername() {
    if(userDao.queryUserByUsername("admin") == null) {
      System.out.println("用户名可用");
    } else {
      System.out.println("用户名已存在");
    }
  }

  @Test
  public void saveUser() {
    if(userDao.queryUserByUsernameAndPassword("admin", "admin") == null) {
      System.out.println("用户名或密码错误，登录失败");
    } else {
      System.out.println("登录成功");
    }
  }

  @Test
  public void queryUserByUsernameAndPassword() {
    // id是自增的 所以是 null
    // 输出下 只要结果不是 -1 就意味着添加成功
    System.out.println(userDao.saveUser(new User(null, "sam", "111111", "sam@gmail.com")));
  }
}