package com.sam.servlet_test;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY;

public class RegistServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取表单项中的信息
    String username = req.getParameter("username");
    String code = req.getParameter("code");

    // 获取session中的验证码
    String token = (String) req.getSession().getAttribute(KAPTCHA_SESSION_KEY);
    // 获取完后 马上删除 session域中的验证码
    req.getSession().removeAttribute(KAPTCHA_SESSION_KEY);
    System.out.println(req.getSession().getAttribute(KAPTCHA_SESSION_KEY));

    // 在保存到数据库之前要进行比较
    if(token != null && token.equalsIgnoreCase(code)) {
      System.out.println("保存到数据库: " + username);
      resp.sendRedirect(req.getContextPath() + "/ok.jsp");
    } else {
      System.out.println("请不要重复提交表单");
    }
  }
}
