package com.sam.dao.impl;

import com.sam.utils.JdbcUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public abstract class BaseDao_backup {
  // 使用 DbUtils 操作数据库
  private QueryRunner queryRunner = new QueryRunner();

  // update()方法用来执行: insert update delete 语句
  public int update(String sql, Object ... args) {

    // 使用 queryRunner对象的 update(参数1, 参数2, 参数3)
    // 参数1: 数据库的链接
    // 参数2: sql语句
    // 参数3: Object ... args (占位符之类的东西)
    Connection connection = JdbcUtils.getConnection();
    try {
      return queryRunner.update(connection, sql, args);
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
    // 返回-1表示执行失败 返回其它表示影响的行数 上面throw异常了 下面的返回值就不要了
    // return -1;
  }

  /**
   * @desc 查询方法 返回一个对象 这是一个泛型方法
   * @param type 查询结果的对象的类型
   * @param sql 查询语句
   * @param args 在查询语句中可能用的其它参数符号之类的
   */
  public <T> T queryForOne(Class<T> type, String sql, Object ... args) {
    Connection connection = JdbcUtils.getConnection();
    try {
      // 参数3: new BeanHandler<>(type) type是执行完前面的查询后 返回的对象的类型 我们把这个部分定义成形参
      return queryRunner.query(connection, sql, new BeanHandler<T>(type), args);
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }


  /**
   * @desc 查询返回多个对象的查询方法
   */
  public <T> List<T> queryForList(Class<T> type, String sql, Object ... args) {
    Connection connection = JdbcUtils.getConnection();
    try {
      return queryRunner.query(connection, sql, new BeanListHandler<T>(type), args);
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  /**
   * @desc 查询返回一行中某一列的sql语句
   */
  public Object queryForSingleValue(String sql, Object ... args) {
    Connection connection = JdbcUtils.getConnection();
    try {
      return queryRunner.query(connection, sql, new ScalarHandler(), args);
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }
}
