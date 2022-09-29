package com.sam.dao_optimize;

import com.sam.utils.JDBCUtils;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public abstract class BaseDAO<T>  {

  private Class<T> clazz = null;

  // 在造子类对象的时候 构造器 和 代码块就会被执行
  {
    // 在造子类对象的时候 要获取当前对象的父类的泛型
    // 当前对象this this.getClass()获取自己的类 然后自己的类的带泛型的父类
    Type genericSuperclass = this.getClass().getGenericSuperclass();

    // 我们做下强转
    ParameterizedType paramType = (ParameterizedType) genericSuperclass;

    // 该方法用于获取父类的泛型参数 泛型可能会有多个 所以返回的是一个数组
    Type[] actualTypeArguments = paramType.getActualTypeArguments();
    // 获取了泛型的第一个参数 也就是 BaseDAO<Customer> 中的 Customer
    clazz = (Class<T>) actualTypeArguments[0];
  }

  // 包含事务: 增删改
  public int update(Connection connection, String sql, Object ...args) {
    PreparedStatement ps = null;
    try {
      ps = connection.prepareStatement(sql);
      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      return ps.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps);
    }

    return 0;
  }


  // 包含事务: 查询一条记录 返回一个对象
  public T getInstance(Connection connection, String sql, Object ...args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      ps = connection.prepareStatement(sql);
      for(int i=0; i<args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      rs = ps.executeQuery();
      ResultSetMetaData rsmd = rs.getMetaData();

      int columnCount = rsmd.getColumnCount();
      if(rs.next()) {
        T t = clazz.newInstance();

        for (int i=0; i<columnCount; i++) {
          String columnLabel = rsmd.getColumnLabel(i+1);
          Object columnValue = rs.getObject(i+1);

          Field field = clazz.getDeclaredField(columnLabel);
          field.setAccessible(true);
          field.set(t, columnValue);
        }
        return t;
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }
    return null;
  }

  // 包含事务: 查询多条记录 返回多条记录构成的集合
  public List<T> getForList(Connection connection, String sql, Object ...args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    ArrayList<T> list = null;

    try {
      // 预编译sql
      ps = connection.prepareStatement(sql);

      // 填充占位符
      for(int i=0; i<args.length; i++) {
        ps.setObject(i+1, args[i]);
      }

      // 执行并获取结果集
      rs = ps.executeQuery();

      // 获取列数
      ResultSetMetaData rsmd = rs.getMetaData();
      int columnCount = rsmd.getColumnCount();

      // 创建一个承装对象的结合
      list = new ArrayList<>();


      // 多条记录
      while(rs.next()) {
        // 循环中 每次都创建一个t对象
        T t = clazz.newInstance();

        // 通过 for 将t对象的所有的属性都附上值了
        for(int i=0; i<columnCount; i++) {
          String columnLabel = rsmd.getColumnLabel(i + 1);
          Object columnValue = rs.getObject(i + 1);

          Field field = clazz.getDeclaredField(columnLabel);
          field.setAccessible(true);
          field.set(t, columnValue);
        }

        // 把对象添加到集合中
        list.add(t);
      }

      // while循环结束后
      return list;

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }

    return null;
  }


  // 先定义为 void 因为是通用的父类 我们定义的方法 也不知道子类到底要获取什么
  // 不写 void 写什么? 比如count(*) 返回值是int Max(date) 返回值是个日期 不确定 所以我们使用泛型
  public <E> E getValue(Connection connection, String sql, Object ...args) {

    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      ps = connection.prepareStatement(sql);
      for (int i=0; i<args.length; i++) {
        ps.setObject(i+1, args[i]);
      }

      rs = ps.executeQuery();
      // 对于特殊需求的来讲 我们只会查出来一列数据 比如 count(*)
      if(rs.next()) {
        // 得到这一列数据 需要强转下
        return (E)rs.getObject(1);
      }
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(null, ps, rs);
    }

    return null;
  }
}
