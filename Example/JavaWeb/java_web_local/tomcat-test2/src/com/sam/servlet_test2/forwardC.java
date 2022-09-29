package com.sam.servlet_test2;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class forwardC extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("经过了ForwardC程序");
    ServletContext context = getServletContext();
    String realPath = context.getRealPath("/");
    System.out.println("realPath: " + realPath);
    // realPath: /Users/LIUCHUNSHAN/Desktop/Sam/JavaWeb/java_web_local/out/artifacts/tomcat_test2_war_exploded/

    String contextPath = context.getContextPath();
    System.out.println("contextPath: " + contextPath);
  }
}
