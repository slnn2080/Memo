package com.sam.io;

import org.testng.annotations.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * 我们看看其他流的使用
 * 1. 标准的输入 输出流
 * 2. 打印流
 * 3. 数据流
 */
public class OtherStreamTest {

  public static void main(String[] args) throws IOException {
    // InputStreamReader是转换流 它需要的参数就是InputStream输入字节流 而我们的System.in就是输入字节流类型
    // 同时System.in也代表从键盘输入
    InputStreamReader isr = new InputStreamReader(System.in); // 终点不再是具体的file了 而是键盘输入

    // InputStreamReader是Reader的子类 isr的类型就是Reader
    // new BufferedReader()里面需要传递一个Reader isr就是
    BufferedReader br = new BufferedReader(isr);
    while (true) {
      System.out.println("请输入字符串: ");
      // 读到了一行数据
      String data = br.readLine();
      // 在忽略大小写的情况下 我们看看用户输入的是不是e 或者 exit
      if(data.equalsIgnoreCase("e")) {
        System.out.println("程序结束");
        break;
      }

      // 转成大写后输出
      System.out.println(data.toUpperCase());
    }

    // 关闭流
    br.close();
  }
  @Test
  public void test() {

  }
}
