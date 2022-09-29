package com.sam.blob;

import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class InsetTest {

  @Test
  public void testInsert1() throws Exception {
    Connection connection = JDBCUtils.getConnection();
    String sql = "insert into goods(name)values(?)";
    PreparedStatement ps = connection.prepareStatement(sql);

    for(int i=1; i<=20000; i++) {
      // 只有一个占位符 所以是1
      ps.setObject(1, "name_" + i);

      // 每插入一条数据执行一次 20000次
      ps.execute();
    }

    JDBCUtils.closeResource(connection, ps);
  }


  @Test
  public void testInsert2() throws Exception {
    Connection connection = JDBCUtils.getConnection();
    String sql = "insert into goods(name)values(?)";
    PreparedStatement ps = connection.prepareStatement(sql);

    for(int i=1; i<=20000; i++) {
      ps.setObject(1, "name_" + i);

      // 当我们填充完占位符后不要马上执行
      // ps.execute();

      // 1. "攒" sql
      ps.addBatch();

      // 攒到什么时候呢？ 攒够500 每隔500次执行一遍
      if(i % 500 == 0) {
        // 2. 执行 攒够 的sql
        ps.executeBatch();

        // 3. 执行完毕后 要清空batch
        ps.clearBatch();
      }
    }

    JDBCUtils.closeResource(connection, ps);
  }

  @Test
  public void testInsert3() throws Exception {
    Connection connection = JDBCUtils.getConnection();

    // 设置不允许自动提交数据
    connection.setAutoCommit(false);

    String sql = "insert into goods(name)values(?)";
    PreparedStatement ps = connection.prepareStatement(sql);

    for(int i=1; i<=20000; i++) {
      ps.setObject(1, "name_" + i);

      // 1. "攒" sql
      ps.addBatch();

      if(i % 500 == 0) {
        // 2. 执行 攒够 的sql
        ps.executeBatch();

        // 3. 执行完毕后 要清空batch
        ps.clearBatch();
      }
    }

    // 统一提交所有数据(2万条)
    connection.commit();

    JDBCUtils.closeResource(connection, ps);
  }
}
