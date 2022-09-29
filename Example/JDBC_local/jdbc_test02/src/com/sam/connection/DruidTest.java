package com.sam.connection;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import org.junit.Test;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.util.Properties;

public class DruidTest {
  @Test
  public void getConnection() throws Exception {

    Properties prop = new Properties();
    InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("druid.properties");
    prop.load(is);
    // 创建 连接池
    DataSource source = DruidDataSourceFactory.createDataSource(prop);

    // 获取连接
    Connection connection = source.getConnection();
    System.out.println(connection);
  }
}
