package com.sam.io;

import org.testng.annotations.Test;

import java.io.*;

public class picTest {

  // 图片的加密
  @Test
  public void test() throws IOException {
    // 我们将Hello.txt文件使用字节流读取到控制台上 正常会出现乱码但现在我们可以使用转换流转换之后 再输出到控制台

   FileInputStream fis = new FileInputStream("Hello.txt");
    InputStreamReader isr = new InputStreamReader(fis, "UTF-8");

    // 将字节流 -> 字符流 我们要准备个char[]将读到的数据保存在里面
    char[] cbuf = new char[20];
    int len;
    while ((len = isr.read(cbuf)) != -1) {
      String str = new String(cbuf);
      System.out.print(str);

      for(char c: cbuf) {
        System.out.print(c);
      }

      for(int i=0; i<len; i++) {
        System.out.print(cbuf[i]);
      }
    }

    isr.close();
  }


  // 目标文件是utf-8存的txt文件 我们综合使用 InputStreamReader 和 OutputStreamWriter 对utf-8存的txt文件转成gbk格式的txt文件 实现一个解码再另编码的过程
  @Test
  public void testDecode() throws IOException {
    File srcFile = new File("Hello.txt");
    File destFile = new File("Hello_gbk.txt");

    // 创建输入字节流
    FileInputStream fis = new FileInputStream(srcFile);
    // 创建输出字节流
    FileOutputStream fos = new FileOutputStream(destFile);

    // 创建输入转换流
    InputStreamReader isr = new InputStreamReader(fis, "utf-8");

    // 创建输出转换流 指定编码的字符集
    OutputStreamWriter osw = new OutputStreamWriter(fos, "gbk");

    // 读写过程
    char[] cbuf = new char[20];
    int len;
    while((len = isr.read(cbuf)) != -1) {
      osw.write(cbuf, 0, len);
    }

    // 关闭资源
    osw.close();
    isr.close();
  }


}
