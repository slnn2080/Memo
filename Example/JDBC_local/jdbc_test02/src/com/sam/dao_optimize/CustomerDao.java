package com.sam.dao_optimize;

import com.sam.bean.Customer;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;

public interface CustomerDao {
  // 插入一条数据 将customer对象添加到数据库中
  // 连接也让它从外面获取 因为一个连接可能要做好几个事儿 以一个事务出现的
  void insert(Connection connection, Customer customer);

  // 根据指定的id删除表中的一条记录
  void deleteById(Connection connection, int id);

  // 把指定id的记录 修改为新的对象
  // 比如Java层面有一个customer对象里面是最新的数据 我们要根据customer对象id去找到数据库表中的记录 将其修改为我们java层面customer对象中的最新数据
  // 针对内存中的customer对象 去修改数据表中的指定记录
  // 我们可以根据customer.id去找数据库中的指定记录
  void update(Connection connection, Customer customer);

  // 查询 根据指定的id查询 得到对应的Customer对象
  Customer getCustomerById(Connection connection, int id);

  // 查询表中的所有记录
  List<Customer> getAll(Connection connection);

  // 查询表中有多少条记录 注意我们拿的是Long来接收count(*) 因为表中的记录可能非常的多
  Long getCount(Connection connection);

  // 返回数据表中最大的生日 sql下的Date 比如2010 和 1986 我们说的最大就是比数 所以是2010
  Date getMaxBirth(Connection connection);
}
