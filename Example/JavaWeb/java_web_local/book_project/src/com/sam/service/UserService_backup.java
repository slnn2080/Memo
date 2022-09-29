package com.sam.service;

import com.sam.pojo.User;

public interface UserService_backup {


  /**
   * 注册用户 也就是注册功能的业务
   * @param user
   */
  public void registUser(User user);

  /**
   * 登录 也就是登录功能的业务
   * @param user
   */
  public User login(User user);

  /**
   * 检查用户名是否可用
   * @param username
   * @return 返回true表示用户名已存在 返回false表示用户名可用
   */
  public boolean existsUsername(String username);
}
