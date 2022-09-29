package com.sam.transaction;

import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;

public class ConnectTest {
  @Test
  public void testGetConnection() throws Exception {
    Connection connection = JDBCUtils.getConnection();
  }
}
