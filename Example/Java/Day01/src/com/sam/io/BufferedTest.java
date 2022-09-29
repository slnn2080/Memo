package com.sam.io;

import org.testng.annotations.Test;

import java.io.*;

public class BufferedTest {
  // 需求: 对文件的复制
  @Test
  public void BufferedStreamTest() {
    BufferedInputStream bis = null;
    BufferedOutputStream bos = null;
    try {
      // 1 造文件
      File srcFile = new File("pic_safety_001.jpg");
      // 目标在哪
      File destFile = new File("pic_safety_001_copy.jpg");


      // 2 造流
      // 我们要使用缓冲流 但是缓冲流不能直接作用在文件上 它只能作用在节点流的上面 体现在代码层面

      // 创建节点流
      FileInputStream fis = new FileInputStream(srcFile);

      FileOutputStream fos = new FileOutputStream(destFile);

      // 造缓冲流 - 处理流
      // 将fis丢进去
      bis = new BufferedInputStream(fis);

      bos = new BufferedOutputStream(fos);


      // 3 复制的细节 读取 和 写入
      // 图片小点 不用太大
      byte[] buf = new byte[10];
      int len;
      while((len = bis.read(buf)) != -1) {
        bos.write(buf, 0, len);
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        if(bos != null) bos.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
      try {
        if(bis != null) bis.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    // 4. 资源关闭
    // 我们一共创建了4个流 那就是说要关四个
    // 关闭的顺序: 先关闭外层的流 再关闭内层的流(跟穿衣服一样) 从下网上看
//    bos.close();
//    bis.close();

    // 说明 关闭外层的流的同时 会自动将内层的流进行关闭 关于内层流的关闭可以省略
//    fos.close();
//    fis.close();

  }
}
