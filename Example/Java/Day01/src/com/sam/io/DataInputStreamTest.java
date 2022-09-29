package com.sam.io;

import org.testng.annotations.Test;

import java.io.*;

public class DataInputStreamTest {
  @Test
  public void test() throws IOException {
    // 测试下 DataInputStream 和 DataOutputStream 的基本数据类型的读写 我们先测试下写出去 然后再读进来
    DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.txt"));

    dos.writeUTF("erin");
    // 每次写完可以显式的刷新缓冲区 写出去
//    dos.flush();
    dos.writeInt(23);
//    dos.flush();
    dos.writeBoolean(true);
    dos.flush();

    // 关闭
    dos.close();
  }

  @Test
  public void test2() throws IOException {

    DataInputStream dis = new DataInputStream(new FileInputStream("data.txt"));

    // 我们写的时候有顺序 从第一行到最后一行 我们读的时候也要按照这个顺序 写的时候最先是String 读的时候也要最先读String
    String name = dis.readUTF();
    int age = dis.readInt();
    boolean sex = dis.readBoolean();

    System.out.println(name + " " + age + " " + sex);

    dis.close();
  }
}
