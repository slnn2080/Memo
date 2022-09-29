package com.sam.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    String username = req.getParameter("username");
    String password = req.getParameter("password");

    // 验证用户名和密码是否正确
    if("admin".equals(username) && "admin".equals(password)) {
      // 登录成功
      // 将用户名保存成cookie
      Cookie cookie = new Cookie("username", username);
      // cookie的生存周期 7天内有效
      cookie.setMaxAge(60 * 60 * 24 * 7);
      res.addCookie(cookie);
      System.out.println("登录成功");
    } else {
      // 登录失败
      System.out.println("登录失败");
    }
  }
}
