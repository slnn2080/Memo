package com.sam.io;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class URLTest {
  public static void main(String[] args) throws IOException {
    // 传入我们要下载的资源url 该资源在Tomcat服务器上
    URL url = new URL("http://localhost:8080/examples/test.jpg");

    // 下载服务端中对应的test.jpg图片资源 我们还是以流的方式来操作
    // 获取服务器的连接 我们获取的其实是HttpURLConnection 它是urlConnection
    // URLConnection urlConnection = url.openConnection();
    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

    // 调用connect()获取连接
    urlConnection.connect();

    // 获取输入流 将服务器的资源读到内存中
    InputStream is = urlConnection.getInputStream();
    // 将文件保存到本地
    FileOutputStream fos = new FileOutputStream("本地文件,jpg");
    byte[] buf = new byte[1024];
    int len;
    while ((len = is.read(buf)) != -1) {
      fos.write(buf, 0, len);
    }

    // 关闭资源
    is.close();
    fos.close();
    // 断开连接
    urlConnection.disconnect();
  }
}
