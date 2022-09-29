package com.sam.dao.impl;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public abstract class BaseDao<T> {
  private QueryRunner runner = new QueryRunner();

  private Class<T> type = null;
  {
    Type genericSuperclass = this.getClass().getGenericSuperclass();
    ParameterizedType param = (ParameterizedType) genericSuperclass;
    Type[] actualTypeArguments = param.getActualTypeArguments();
    type = (Class<T>) actualTypeArguments[0];
  }


  public int update(Connection conn, String sql, Object ... args) {
    try {
      return runner.update(conn, sql, args);
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  public T queryForOne(Connection conn, String sql, Object ... args) {
    try {
      return runner.query(conn, sql, new BeanHandler<T>(type), args);
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  public List<T> queryForList(Connection conn, String sql, Object ... args)  {
    try {
      return runner.query(conn, sql, new BeanListHandler<T>(type), args);
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  // 查询一列中的某个值 或者是 聚合函数的结果
  public Object queryForSingleValue(Connection conn, String sql, Object ... args) {
    try {
      return runner.query(conn, sql, new ScalarHandler(), args);
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

}

