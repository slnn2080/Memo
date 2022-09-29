package com.sam.dao;

import com.sam.pojo.User;

public interface UserDao {



  // 根据用户名 查询用户信息 如果返回null说明没有这个用户
  public User queryUserByUsername(String username);

  // 保存用户信息 返回 -1 表示操作失败 其它是sql语句影响的行数
  public int saveUser(User user);

  // 根据用户名 和 密码 查询用户信息 如果返回null 说明用户名或密码错误
  public User queryUserByUsernameAndPassword(String username, String password);
}
