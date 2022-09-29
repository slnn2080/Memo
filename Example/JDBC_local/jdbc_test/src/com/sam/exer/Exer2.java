package com.sam.exer;

import com.sam.bean.Student;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.Scanner;

public class Exer2 {

  // 1. 向 examstudent 表中添加一条数据
//  public static void main(String[] args) {
//
//    Exer2 exer2 = new Exer2();
//
//    Scanner scanner = new Scanner(System.in);
//    System.out.print("4级 / 6级: ");
//    int type = scanner.nextInt();
//
//    System.out.print("身份证号: ");
//    String IDCard = scanner.next();
//
//    System.out.print("准考证号: ");
//    String examCard = scanner.next();
//
//    System.out.print("学生姓名: ");
//    String studentName = scanner.next();
//
//    System.out.print("所在城市: ");
//    String location = scanner.next();
//
//    System.out.print("考试成绩: ");
//    int grade = scanner.nextInt();
//
//    String sql = "insert into examstudent(type, IDCard, examCard, studentName, location, grade) values(?,?,?,?,?,?)";
//    int insertCount = exer2.update(sql, type, IDCard, examCard, studentName, location, grade);
//
//    if(insertCount > 0) {
//      System.out.println("添加成功");
//    } else {
//      System.out.println("添加失败");
//    }
//  }


  // 2. 根据身份证号 或者 准考证号查询学生的成绩信息

  // 我们查询出来的是一个学生的信息 我们可以封装为一个学生的对象
//  public static void main(String[] args) throws Exception {
//
//    System.out.println("请选择你要输入的类型: ");
//    System.out.println("a. 准考证号 ");
//    System.out.println("b. 身份证号 ");
//
//    Exer2 exer2 = new Exer2();
//    Scanner scanner = new Scanner(System.in);
//    String selection = scanner.next();
//
//    if("a".equalsIgnoreCase(selection)) {
//      System.out.println("请输入准考证号: ");
//      // 拿到准考证号 查询数据库
//      String examCard = scanner.next();
//
//      String sql = "select FlowID flowId, Type type, IDCard, ExamCard examCard, StudentName name, Location location, Grade grade from examstudent where examCard = ?";
//      Student student = exer2.getInstance(Student.class, sql, examCard);
//      System.out.println(student);
//
//      // 这里还可以根据 查询到的结果 是不是 null 做判断输出
//
//    } else if("b".equalsIgnoreCase(selection)) {
//
//    } else {
//      System.out.println("您的输入有误, 请重新进入程序");
//    }
//  }

  public static void main(String[] args) throws Exception {
    Exer2 exer2 = new Exer2();

    System.out.println("请输入学生的考号: ");
    Scanner scanner = new Scanner(System.in);
    String examCard = scanner.next();

    // 查询指定准考证号的学生
    String sql = "select FlowID flowId, Type type, IDCard, ExamCard examCard, StudentName name, Location location, Grade grade from examstudent where examCard = ?";
    Student student = exer2.getInstance(Student.class, sql, examCard);

    if(student != null) {
      String sql2 = "delete from examstudent where examCard = ?";
      int i = exer2.update(sql2, examCard);
      if(i > 0) System.out.println("删除成功");
    } else {
      System.out.println("查无此人");
    }
  }





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
