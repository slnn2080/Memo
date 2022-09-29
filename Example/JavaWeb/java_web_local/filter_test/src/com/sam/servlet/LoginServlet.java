package com.sam.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    res.setContentType("text/html; charset=UTF-8");
    String username = req.getParameter("username");
    String password = req.getParameter("password");

    if("admin".equalsIgnoreCase(username) && "111111".equalsIgnoreCase(password)) {
      // 登录成功后放用户的信息
      req.getSession().setAttribute("user", username);
      res.getWriter().write("登录成功");
    } else {
      // 登录失败让它跳转登录页面
      req.getRequestDispatcher("/login.jsp").forward(req, res);
    }
  }
}
