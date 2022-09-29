package com.sam.io;

import org.testng.annotations.Test;

import java.io.*;

public class FileReaderWriter {
  @Test
  public void testFileReader() {
    FileReader fr = null;

    try {
      // 1. 实例化File类的对象 指明我们要操作文件
      File file = new File("Hello.txt");

      // 2. 提供具体的流
      fr = new FileReader(file);

      // 3. 数据的读入
      int data = fr.read();
      while(data != -1) {
        System.out.println((char)data);
        data = fr.read();
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      // 4. 流的关闭操作
      try {
        if(fr != null) fr.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  // 对read()方法的操作升级
  @Test
  public void testFileReader2() {
    FileReader fr = null;
    try {
      // 1. File类的实例化
      File file = new File("Hello.txt");

      // 2. FileReader流的实例化
      fr = new FileReader(file);

      // 3. 读取的操作
      // 因为我们读的是字符 所以我们使用char[] 如果我们读取的是字节 那么使用的就是byte[]
      char[] cbuf = new char[5]; // 设置5
      int len;
      while((len = fr.read(cbuf)) != -1 ) {
        // 方式1:
        // for(int i=0; i<len; i++) {
        //   System.out.print(cbuf[i]);
        // }

        // 方式2: 我们将char[]转换为String
        // String str = new String(cbuf);
        // System.out.println(str);
        // helloworld123ld

        // 每次从头开始取 取len个
        String str = new String(cbuf, 0, len);
        System.out.print(str);
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        // 4. 资源的关闭
        if(fr != null) fr.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  @Test
  public void testWrite() throws IOException {
    // 1. 提供File类的对象 指明写出到的文件(指明写出到的位置)
    File file = new File("Hello2.txt");

    // 2. 提供FileWriter的对象 用于数据的写出
    // new FileWriter(file); 指明写出的端点
    FileWriter fw = new FileWriter(file, false);

    // 3. 写出的操作
    fw.write("i have a dream!\n");
    fw.write("you need to have a dream");

    // 4. 流资源的关闭
    fw.close();
  }

  @Test
  public void testCopy() {
    FileReader fr = null;
    FileWriter fw = null;
    try {
      // 1. 创建File类的对象指明读取哪个文件到内存中 和 将读到的数据写到哪个文件里面去
      File srcFile = new File("Hello.txt");
      File destFile = new File("Hello_copy.txt");

      // 2. 创建输入流和输出流的对象
      // 对于输入流来讲 文件是必须存在的
      fr = new FileReader(srcFile);
      // 对于输出来讲 文件不是必须存在的
      fw = new FileWriter(destFile);

      // 数据的读入和写出操作
      char[] cbuf = new char[5];
      // 记录每次读入到cbuf数组中的字符的个数
      int len;
      // 不是-1就代表还有数据
      while((len = fr.read(cbuf)) != -1) {
        // 每次读到几个 我就写出去几个 每次读到len个就写出去len个
        fw.write(cbuf, 0, len);
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {

      // 4. 关闭流资源
      // 分开写： 关闭fr
      try {
        fr.close();
      } catch (IOException e) {
        e.printStackTrace();
      }

      // 分开写： 关闭fw
      try {
        fw.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }


  @Test
  public void testFileInputStream() {
    // 测试使用 FileInputStream来处理 文本文件(字符文件)
    FileInputStream fis = null;
    try {
      // 1. 造文件
      File textFile = new File("hello.txt");

      // 2. 造流
      fis = new FileInputStream(textFile);

      // 3. 读数据
      // 创建一个字节流的数组
      byte[] buf = new byte[5];

      // 记录每次读取的字节的个数
      int len;

      // fis.read(buf)) 将数据读取到buf当中
      while((len = fis.read(buf)) != -1) {
        // 将读到的数据展示在控制台 将buf转换为字符串
        String str = new String(buf, 0, len);
        System.out.print(str);
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        // 4. 关闭资源
        if(fis != null) fis.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  @Test
  public void testFileIOTest() {
    // 1. 创建File类对象
    FileInputStream fis = null;
    FileOutputStream fos = null;
    try {
      File srcFile = new File("pic_safety_001.jpg");
      File destFile = new File("pic_safety_001_copy.jpg");

      // 2. 创建流
      fis = new FileInputStream(srcFile);
      fos = new FileOutputStream(destFile);

      // 读写数据(复制过程)
      byte[] buf = new byte[5];
      int len;
      while((len = fis.read(buf)) != -1) {
        // 读到多少写入多少
        fos.write(buf, 0, len);
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        fis.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
      try {
        fos.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  // 定义一个方法 实现指定位置下的文件复制的方法
  public void copyFile(String srcPath, String destPath) {
    // 1. 创建File类对象
    FileInputStream fis = null;
    FileOutputStream fos = null;
    try {
      File srcFile = new File(srcPath);
      File destFile = new File(destPath);

      // 2. 创建流
      fis = new FileInputStream(srcFile);
      fos = new FileOutputStream(destFile);

      // 读写数据(复制过程) byte数组的长度一般都是1024
      byte[] buf = new byte[1024];
      int len;
      while((len = fis.read(buf)) != -1) {
        // 读到多少写入多少
        fos.write(buf, 0, len);
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        fis.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
      try {
        fos.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  @Test
  public void testCopyFile() {
    long start = System.currentTimeMillis();
    copyFile("pic_safety_001.jpg", "pic_safety_001_copy2.jpg");
    long end = System.currentTimeMillis();
    System.out.println("复制操作花费的时间为: " + (end - start) + " 毫秒");
  }

  @Test
  public void testBufferedReader() {
    // 使用 BufferedReader和BufferedWriter实现文本文件的复制

    // 1. 造文件 + 造流
    // 使用方式和上面讲的一样 但这里 我们采用的是匿名的方式
    BufferedReader br = null;
    BufferedWriter bw = null;
    try {
      br = new BufferedReader(new FileReader(new File("Hello.txt")));

      bw = new BufferedWriter(new FileWriter(new File("Hello_copy.txt")));

      // 2. 读写操作 复制的过程
      // 方式1: 使用的char[]
      char[] cbuf = new char[1024];
      int len;
      while ((len = br.read(cbuf)) != -1) {
        bw.write(cbuf, 0, len);
      }

      // 方式2: 使用String
      // readLine()会将数据读到这里
      String data;
      while((data = br.readLine()) != null) {
        System.out.println(data);

        // 写出的data中不包含换行符
        bw.write(data);
        bw.write(data + "\n");

        bw.write(data);
        bw.newLine();
      }

    } catch (IOException e) {
      e.printStackTrace();
    } finally {

      // 3. 关闭资源
      try {
        bw.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
      try {
        br.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }






  }
}
