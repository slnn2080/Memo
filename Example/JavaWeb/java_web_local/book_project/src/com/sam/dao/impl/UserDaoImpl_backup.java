package com.sam.dao.impl;

import com.sam.dao.UserDao;
import com.sam.pojo.User;

public class UserDaoImpl_backup extends BaseDao implements UserDao {
  // 实例了 UserDao接口 中的方法
  @Override
  public User queryUserByUsername(String username) {
    // ? 是占位符 我们通过 ... args 传入的参数就是 ? 所以要对应问号的顺序
    String sql = "select id, username, password, email from t_user where username = ?";

    // 要查找的数据类型是 User.class
    return queryForOne(User.class, sql, username);
  }

  @Override
  public int saveUser(User user) {
    String sql = "insert into t_user(username, password, email) values(?, ?, ?)";

    //
    return update(sql, user.getUsername(), user.getPassword(), user.getEmail());
  }

  @Override
  public User queryUserByUsernameAndPassword(String username, String password) {
    String sql = "select id, username, password, email from t_user where username = ? and password = ?";
    return queryForOne(User.class, sql, username, password);
  }
}
