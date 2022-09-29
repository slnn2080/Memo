package com.sam.servlet_test2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ResponseIO extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

    // 该方法用于获得此时响应对象所采用的字符编码类型。
//    String encoding = res.getCharacterEncoding();

//    System.out.println(encoding);
    // 默认ISO-8859-1 - 该字符集不支持中文

    // 设置服务器的字符集为UTF-8(服务器这边支持的字符集)
//    res.setCharacterEncoding("UTF-8");

    // 当客户端和服务器的字符集不统一的时候 就会出现显示效果不对的情况
    // 这时候是因为浏览器不知道服务器用了utf-8

    // 通过响应头设置浏览器也使用utf-8 text/html表示我返回的数据是什么 并且告诉该数据的字符集是什么 有了这个以后浏览器就按照这个显示就没问题了
//    res.setHeader("Content-Type", "text/html; charset=UTF-8");

    // 方案2:
    // 这一行代码 同时设置服务器和客户端都使用 UTF-8 字符集 还设置了响应头
    res.setContentType("text/html; charset=UTF-8");
    PrintWriter writer = res.getWriter();
    writer.write("测试文本");


  }
}
