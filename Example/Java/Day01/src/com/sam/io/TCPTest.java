package com.sam.io;

import org.testng.annotations.Test;

import java.io.IOException;
import java.net.*;

public class TCPTest {
  @Test
  public void sender() throws IOException {
    // 使用 DatagramSocket 实例化 socket 我们使用空参的构造器就可以 因为我们不会把从哪来的 目的地 数据放到DatagramSocket里面 我们主要都放在DatagramPacket数据报里面
    DatagramSocket socket = new DatagramSocket();
    // 实例化packet 参数 byte[] buf, int offset, int len, InetAddress address, int port
    // 封装数据报
    String str = "我是UDP方式发送的数据";  // 变成字节数组
    byte[] data = str.getBytes();
    InetAddress inet = InetAddress.getByName("localhost");
    DatagramPacket packet = new DatagramPacket(data,0,data.length,inet,9090);

    // 通过socket对象发送数据报
    socket.send(packet);

    // 关闭socket
    socket.close();
  }

  @Test
  public void receiver() throws IOException {
    DatagramSocket socket = new DatagramSocket(9090);

    // 创建接收数据的数据报
    byte[] buf = new byte[100]; // 要考虑容量的问题 造小了 byte[]接收不完
    // 把数据都封装在packet里面
    DatagramPacket packet = new DatagramPacket(buf,0,buf.length);
    socket.receive(packet);

    // 我们将二进制数据输出到控制台
    String str = new String(packet.getData(), 0, packet.getLength());
    System.out.println(str);

    socket.close();
  }

  @Test
  public void test() throws MalformedURLException {
    URL url = new URL("http://www.baidu.com?username=Sam");
    System.out.println(url.getProtocol());
    System.out.println(url.getHost());
    System.out.println(url.getPort());
    System.out.println(url.getPath());
    System.out.println(url.getFile());
    System.out.println(url.getQuery());
  }
}
