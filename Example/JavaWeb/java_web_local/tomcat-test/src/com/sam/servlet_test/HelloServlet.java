package com.sam.servlet_test;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class HelloServlet implements Servlet {

  public HelloServlet() {
  }

  @Override
  public void init(ServletConfig servletConfig) throws ServletException {
    System.out.println("HelloServlet程序的别名:" + servletConfig.getServletName());
    System.out.println("HelloServlet初始化参数 username的值是:" + servletConfig.getInitParameter("username"));
    System.out.println("HelloServlet初始化参数 username的值是:" + servletConfig.getServletContext());


  }

  @Override
  public ServletConfig getServletConfig() {
    return null;
  }

  @Override
  public void service(ServletRequest servletReq, ServletResponse servletRes) throws ServletException, IOException {
    HttpServletRequest httpReq = (HttpServletRequest) servletReq;
    String method = httpReq.getMethod();
    System.out.println(method); // GET or POST

    if("GET".equals(method)) {
      doGet();
    } else if("POST".equals(method)) {
      doPost();
    }
  }

  public void doGet() {
    System.out.println("get请求");

    ServletConfig servletConfig = getServletConfig();
    String servletName = servletConfig.getServletName();
    System.out.println(servletName);
  }

  public void doPost() {
    System.out.println("post请求");
  }
  @Override
  public String getServletInfo() {
    return null;
  }

  @Override
  public void destroy() {
  }
}
