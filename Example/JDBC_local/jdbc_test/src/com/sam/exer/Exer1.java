package com.sam.exer;

import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Scanner;

// 课后练习1:
public class Exer1 {

  public static void main(String[] args) {

    Exer1 exer1 = new Exer1();

    Scanner scanner = new Scanner(System.in);
    System.out.print("请输入用户名: ");
    String name = scanner.next();

    System.out.print("请输入邮箱: ");
    String email = scanner.next();

    System.out.print("请输入生日: ");
    // 生日也是字符串类型 但是有隐式的转换 1992-09-08 注意格式
    String birth = scanner.next();

    String sql = "insert into customers(name, email, birth) values(?,?,?)";
    int insertCount = exer1.update(sql, name, email, birth);

    if(insertCount > 0) {
      System.out.println("添加成功");
    } else {
      System.out.println("添加失败");
    }
  }

  @Test
  public void testInsert() {

  }

  public int update(String sql, Object ...args) {
    Connection connection = null;
    PreparedStatement ps = null;
    try {
      connection = JDBCUtils.getConnection();
      ps = connection.prepareStatement(sql);

      for(int i = 0; i < args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }

      // ps.execute();
      return ps.executeUpdate();

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JDBCUtils.closeResource(connection, ps);
    }

    return 0;
  }
}
