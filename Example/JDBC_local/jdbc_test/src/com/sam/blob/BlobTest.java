package com.sam.blob;

import com.sam.bean.Customer;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.*;

public class BlobTest {
  @Test
  public void testInsert() throws Exception {
    Connection connection = JDBCUtils.getConnection();
    String sql = "insert into customers(name, email, birth, photo) values(?,?,?,?)";
    PreparedStatement ps = connection.prepareStatement(sql);
    ps.setObject(1, "琳琳");
    ps.setObject(2, "linlin@gmail.com");
    ps.setObject(3, "1986-10-22");

    // 这个字段是一个blob 我们就不能简单的填入一个变量了
    FileInputStream is = new FileInputStream(new File("pic.jpg"));
    ps.setObject(4, is);

    ps.execute();

    JDBCUtils.closeResource(connection, ps);
  }


  @Test
  public void testQuery() throws Exception {
    Connection connection = JDBCUtils.getConnection();
    String sql = "select id, name, email, birth, photo from customers where id = ?";
    PreparedStatement ps = connection.prepareStatement(sql);

    ps.setObject(1, 21);
    ResultSet rs = ps.executeQuery();

    if(rs.next()) {
      // 将前4个属性(name, email...)封装到Customer对象中 最后面的一个数据(photo) 以流的方式从数据库读出来

      int id = rs.getInt(1);
      String name = rs.getString(2);
      String email = rs.getString(3);
      Date birth = rs.getDate(4);
      // Date birth = rs.getDate("birth");

      Customer customer = new Customer(id, name, email, birth);
      System.out.println(customer);

      // photo字段 它是一个大的数据 需要以流的方式来获取
      Blob photo = rs.getBlob("photo");

      // 将这个字段下载下来 以文件的方式保存为本地图片
      InputStream is = photo.getBinaryStream();

      FileOutputStream fos = new FileOutputStream("dog.jpg");
      byte[] buf = new byte[1024];
      int len;
      while ((len = is.read(buf)) != -1) {
        fos.write(buf, 0, len);
      }

      is.close();
      fos.close();
    }

    JDBCUtils.closeResource(connection, ps, rs);
  }


}
