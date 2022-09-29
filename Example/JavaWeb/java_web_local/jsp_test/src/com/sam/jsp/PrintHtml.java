package com.sam.jsp;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class PrintHtml extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    // 设置响应对象的编码格式
    resp.setContentType("text/html; charset=UTF-8");

    // 得到响应流
    PrintWriter writer = resp.getWriter();
    writer.write("<!DOCTYPE html>\r\n");
    writer.write("<html lang=\"en\">\n");
    writer.write("<head>\n");
    writer.write("<meta charset=\"UTF-8\">\n");
    writer.write("<title>Title</title>\n");
    writer.write("</head>\n");
    writer.write("<body>\n");
    writer.write("<h3>这是servlet回传的页面数据</h3>\n");
    writer.write("</body>\n");
    writer.write("</html>\n");
  }
}
