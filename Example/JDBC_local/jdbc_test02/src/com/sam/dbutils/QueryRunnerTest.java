package com.sam.dbutils;

import com.sam.bean.Customer;
import com.sam.utils.JDBCUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.*;
import org.junit.Test;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

// dbutils封装了数据库的增删改查的操作
public class QueryRunnerTest {
  // 测试 插入一条数据
  @Test
  public void testInsert() throws Exception {
    // 创建 QueryRunner
    QueryRunner runner = new QueryRunner();

    // 增删改的操作 我们使用 update()
    // 插入数据 我们演示带事务的
    Connection connection = JDBCUtils.getConnection3();
    String sql = "insert into customers(name, email, birth) values(?,?,?)";

    int i = runner.update(connection, sql, "蔡徐坤", "cxk@gmail.com", "1997-09-08");
    System.out.println("添加了" + i + "条记录");
  }


  // 测试查询
  @Test
  public void testQuery1() throws Exception {
    QueryRunner runner = new QueryRunner();
    Connection connection = JDBCUtils.getConnection3();
    String sql = "select id, name, email, birth from customers where id = ?";

    // ResultSetHandler - 我们选择使用 BeanHandler 返回一个对象
    BeanHandler<Customer> handler = new BeanHandler<>(Customer.class);
    Customer customer = runner.query(connection, sql, handler, 23);
    System.out.println(customer);
  }
  @Test
  public void testQuery2() throws Exception {
    QueryRunner runner = new QueryRunner();
    Connection connection = JDBCUtils.getConnection3();
    String sql = "select id, name, email, birth from customers where id < ?";

    // BeanListHandler 返回多个对象的集合
    BeanListHandler<Customer> handler = new BeanListHandler<>(Customer.class);
    List<Customer> list = runner.query(connection, sql, handler, 23);
    list.forEach(System.out :: println);
  }
  @Test
  public void testQuery3() throws Exception {
    QueryRunner runner = new QueryRunner();
    Connection connection = JDBCUtils.getConnection3();
    String sql = "select id, name, email, birth from customers where id = ?";

    // BeanListHandler 返回多个对象的集合
    MapHandler handler = new MapHandler();
    Map<String, Object> map = runner.query(connection, sql, handler, 23);
    System.out.println(map);
  }
  @Test
  public void testQuery4() throws Exception {
    QueryRunner runner = new QueryRunner();
    Connection connection = JDBCUtils.getConnection3();
    String sql = "select id, name, email, birth from customers where id < ?";

    // BeanListHandler 返回多个对象的集合
    MapListHandler listHandler = new MapListHandler();
    List<Map<String, Object>> list = runner.query(connection, sql, listHandler, 23);
    list.forEach(System.out :: println);
  }
  @Test
  public void testQuery5() throws Exception {
    QueryRunner runner = new QueryRunner();
    Connection connection = JDBCUtils.getConnection3();
    String sql = "select count(*) from customers";

    // 查询这个表中的总记录数
    ScalarHandler handler = new ScalarHandler();
    Long query = (Long) runner.query(connection, sql, handler);
    System.out.println(query);

  }

  // 自定义 ResultHandler 实现类
  @Test
  public void testQuery6() throws Exception {
    QueryRunner runner = new QueryRunner();
    Connection connection = JDBCUtils.getConnection3();
    String sql = "select id, name, email, birth from customers where id = ?";
    // 实现类匿名
    ResultSetHandler<Customer> handler = new ResultSetHandler<Customer>() {
      @Override
      public Customer handle(ResultSet rs) throws SQLException {
        // 这里的返回值就是 runner.query() 的返回值
        // 也就是说我们传入的sql没有用了 因为这里的返回值就是 query() 的返回值 结果是根据这里定义的
        // 那这里怎么使用？ 我们在这个handle() 里面能够拿到结果集 rs 然后我们对rs进行操作 将操作后的结果return出去
        return new Customer(12, "成龙", "jackey@gmail.com", new Date(234425425L));
      }
    };
    Customer customer = runner.query(connection, sql, handler, "23");
    System.out.println(customer);

  }
}
