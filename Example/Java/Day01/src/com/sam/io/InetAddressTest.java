package com.sam.io;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class InetAddressTest {
  public static void main(String[] args) throws UnknownHostException {
    // 参数的方法1:
    InetAddress inet1 = InetAddress.getByName("192.168.0.66");
//    System.out.println(inet1);

    // 参数的方法2:
//    InetAddress inet2 = InetAddress.getByName("www.baidu.com");
//    System.out.println(inet2);
//
    InetAddress inet3 = InetAddress.getByName("localhost");
    System.out.println(inet3.getHostName());
    System.out.println(inet3.getHostAddress());


  }
}
