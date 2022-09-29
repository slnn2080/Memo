package com.sam.servlet_test;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class ContextServlet2 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      ServletContext context = getServletContext();
      System.out.println(context.getAttribute("key1")); // value1
  }
}
