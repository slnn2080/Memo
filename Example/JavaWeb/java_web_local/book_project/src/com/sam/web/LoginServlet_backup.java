package com.sam.web;

import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginServlet_backup extends HttpServlet {

  private UserService userService = new UserServiceImpl();

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    String username = req.getParameter("username");

    String password = req.getParameter("password");

    if(userService.login(new User(null, username, password, null)) == null) {
      // 登录失败
      // 将错误信息 和 回显的表单项信息 保存到Request域中
      req.setAttribute("msg", "用户名和密码错误");
      req.setAttribute("username", username);
      req.getRequestDispatcher("/pages/user/login.jsp").forward(req, res);
    } else {
      // 登录成功
      req.getRequestDispatcher("/pages/user/login_success.jsp").forward(req, res);
    }
  }
}
