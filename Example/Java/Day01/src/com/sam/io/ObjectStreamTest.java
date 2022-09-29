package com.sam.io;

import org.testng.annotations.Test;

import java.io.*;

public class ObjectStreamTest {
  // 序列化的过程: 将内存中的java对象保存到磁盘中 或 通过网络传输出去
  @Test
  public void test() throws IOException {

    ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("object.dat"));

    oos.writeObject(new String("我是数据"));

    // 需要显式的flush() 可以连续调用 持久化多个对象
    oos.flush();

    // 输出自定义类
    oos.writeObject(new Person("sam", 18));
    oos.flush();

    // 关闭流
    oos.close();
  }

  @Test
  public void test2() throws IOException, ClassNotFoundException {
    // 反序列化的过程: 指明要读进来的文件
    ObjectInputStream ois = new ObjectInputStream(new FileInputStream("object.dat"));

    // 读取的时候也是有顺序的 先写什么就要先读什么
    Object obj = ois.readObject();
    String str = (String) obj;

    // 读上面写入的对象
    Object obj2 = ois.readObject();
    // 强转为Person
    Person p = (Person)obj2;
    System.out.println(p.getName());
    ois.close();
  }

  @Test
  public void test3() throws IOException {
    // 作为 输入流 出现的时候 传入读进来的位置 和 r
    RandomAccessFile raf1 = new RandomAccessFile(new File("Hello.txt"), "r");

    // 作为 输出流 出现的时候 输出的位置 和 rw
    RandomAccessFile raf2 = new RandomAccessFile(new File("Hello_2.txt"), "rw");

    byte[] buf = new byte[1024];
    int len;
    while((len = raf1.read(buf)) != -1) {
      raf2.write(buf, 0, len);
    }

    raf1.close();
    raf2.close();
  }

  @Test
  public void test6() throws IOException {
    // 我们在abc的后面插入xyz 索引从0开始的话 那目标所以就是3
    RandomAccessFile raf = new RandomAccessFile("Hello.txt", "rw");

    // 先调整指针的位置 到插入的目标位置
    raf.seek(3);

    // 因为目标位置后面的数据可能会很多 所以我们要使用循环来处理
    byte[] buf = new byte[20];
    int len;

    // 为了避免StringBuilder再次扩容我们最好指定一个长度
    StringBuilder builder = new StringBuilder((int) new File("Hello.txt").length());
    while((len = raf.read(buf)) != -1) {
      // 将要复制的数据保存到字符串里面 将buf转成str
      // 这里就完成了将3后面的数据都保存在 builder 中了
      builder.append(new String(buf, 0, len));
    }

    // 因为上面的操作后 指针就跑到最后了 所以我们要将指针调整回来
    System.out.println(raf.getFilePointer());
    raf.seek(3);

    // 写出去之后 指针就会在z的后面
    raf.write("xyz".getBytes());

    // 将builder中的数据进行写入
    raf.write(builder.toString().getBytes());
    raf.close();
  }

  @Test
  public void testJar() {

  }
}



