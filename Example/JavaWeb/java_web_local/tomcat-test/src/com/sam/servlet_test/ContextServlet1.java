package com.sam.servlet_test;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class ContextServlet1 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    ServletContext context = getServletContext();

    System.out.println("设置之前: Contxt中 key1 的值为: " + context.getAttribute("key1"));  // null

    // 在 context 中 设置 kv
    context.setAttribute("key1", "value1");
    System.out.println("设置之后: Context中 key1 的值为: " + context.getAttribute("key1"));  // value1


  }
}
