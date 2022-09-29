package com.sam.preparedstatement;

import com.sam.utils.JDBCUtils;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

// 解决sql注入问题 演示使用
public class PreparedStatementTest {
  public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception {

    // 获取连接
    Connection connection = JDBCUtils.getConnection();
    // 预编译sql
    PreparedStatement ps = connection.prepareStatement(sql);

    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i+1, args[i]);
    }

    // 执行并获取结果集
    ResultSet rs = ps.executeQuery();

    // 获取列数
    ResultSetMetaData rsmd = rs.getMetaData();
    int columnCount = rsmd.getColumnCount();

    // 一条数据
    if(rs.next()) {

      // **问题**: 我们创建的不知道是哪个类的对象
      // Order order = new Order();
      T t = clazz.newInstance();

      for(int i=0; i<columnCount; i++) {
        String columnLabel = rsmd.getColumnLabel(i + 1);
        Object columnValue = rs.getObject(i + 1);

        // 这里是clazz 因为clazz相当于Order 而t相当于order对象 不一样的
        Field field = clazz.getDeclaredField(columnLabel);
        field.setAccessible(true);
        field.set(t, columnValue);
      }
      return t;
    }

    JDBCUtils.closeResource(connection, ps, rs);
    return null;
  }
}
