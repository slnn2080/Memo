package com.sam.web;

import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RegistServlet extends HttpServlet {


  private UserService userService = new UserServiceImpl();


  // 处理post请求
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 获取请求的参数
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    String email = req.getParameter("email");
    String code = req.getParameter("code");

    // 2. 检查验证码是否正确(验证码由服务器生成 先写死) 要求验证码为: abcd
    if("abcd".equalsIgnoreCase(code)) {
      // 如果验证码正确 那么就检查用户名是否可用
      // javaEE 三层模型 web -> service -> dao 必须是临层调用 不能隔层调用
      // 也就是说 web层是不能调用dao层的 所以这里我们需要service层的UserServiceImpl类
      if(userService.existsUsername(username)) {
        // 进入这里代表 用户名不可用 因为数据库里面已经有了
        req.setAttribute("msg", "用户名已存在");
        req.setAttribute("username", username);
        req.setAttribute("email", email);

        req.getRequestDispatcher("/pages/user/regist.jsp").forward(req, res);

      } else {
        // 进入这里代表 用户名可用 可用的情况下我们就将其保存到数据库
        userService.registUser(new User(null, username, password, email));
        req.getRequestDispatcher("/pages/user/regist_success.jsp").forward(req, res);
      }

    } else {
      // 当验证码不正确的时候 让其跳转到注册页面 并在跳转前将客户端需要回显的数据保存在request域中
      req.setAttribute("msg", "验证码错误");
      req.setAttribute("username", username);
      req.setAttribute("email", email);

      // getRequestDispatcher的地址必须以/打头 代表在web
      req.getRequestDispatcher("/pages/user/regist.jsp").forward(req, res);
    }
  }
}
