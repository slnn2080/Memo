package com.sam.service.impl;

import com.sam.dao.UserDao;
import com.sam.dao.impl.UserDaoImpl;
import com.sam.pojo.User;
import com.sam.service.UserService;

public class UserServiceImpl implements UserService {

  private UserDao userDao = new UserDaoImpl();

  // 注册用户
  @Override
  public void registUser(User user) {
    userDao.saveUser(user);
  }

  // 登录  如果返回null则登录失败 返回有值 则登录成功
  @Override
  public User login(User user) {
    return userDao.queryUserByUsernameAndPassword(user.getUsername(), user.getPassword());
  }

  @Override
  public boolean existsUsername(String username) {
    if(userDao.queryUserByUsername(username) == null) {
      // 等于null说明没有查到 没查到表示 可用
      return false;
    }
    return true;
  }
}
