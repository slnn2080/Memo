package com.sam.servlet;

import org.apache.commons.io.IOUtils;
import sun.misc.BASE64Encoder;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;

public class DownloadServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {


    // 1. 获取要下载的文件名 这里我们写死
    String downloadFileName = "pic.jpg";

    // 2. 读取要下载的文件内容(通过 ServletContext对象可以读取文件内容)
    ServletContext servletContext = getServletContext();

    // 4. 要放在前面进行操作
    // 在回传前 通过响应头告诉客户端返回的数据类型
    // 获取要下载文件的类型
    String mimeType = servletContext.getMimeType("/file/" + downloadFileName);
    System.out.println("下载的文件类型" + mimeType); // image/jpeg
    res.setContentType(mimeType);

    // 5. 还要告诉客户端收到的数据是用于下载使用(还是通过响应头)
    // 如果没有写步骤5 客户端就会将图片直接显示浏览器上
    // Content-Disposition 表示收到的数据怎么处理
    // attachment表示附件 表示下载使用
    // filename="文件名" 指定下载的文件名 下载的文件叫什么名字
    res.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode("小狗.jpg", "UTF-8"));


    res.setHeader("Content-Disposition", "attachment;filename==?charset?B?xxx?=");

    res.setHeader("Content-Disposition", "attachment;filename==?UTF-8?B?"+ new BASE64Encoder().encode("小狗.jpg".getBytes("UTF-8")) + "?=");



    // 参数: 文件所在的路径 在服务器端 / 代表web目录
    InputStream resourceAsStream = servletContext.getResourceAsStream("/file/" + downloadFileName);
    // 以往我们获取节点流后 通过调用节点流的方法 while循环读数据
    // 但是 commons-io.jar 包中 就有操作io的工具类IOUtils 它可以直接做流的操作

    // 3. 把下载的文件内容回传给客户端
    // 参数 输入流 和 输出流
    // 创建输出流 获取响应的输出流
    ServletOutputStream outputStream = res.getOutputStream();
    System.out.println("outputStream" + outputStream);
    // 将读取到的内容 写给 outputStream 读取输入流中的全部数据 复制给输出流 输出给客户端
    IOUtils.copy(resourceAsStream, outputStream);

  }
}
