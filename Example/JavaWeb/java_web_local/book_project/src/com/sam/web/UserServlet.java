package com.sam.web;

import com.google.gson.Gson;
import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;
import com.sam.utils.WebUtils;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import static com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY;

public class UserServlet extends BaseServlet {
  private UserService userService = new UserServiceImpl();

//  @Override
//  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
//    // 获取页面中的隐藏域的action值 根据该值 利用反射调用对应的方法
//    String action = req.getParameter("action");
//    try {
//      // this是当前的对象实例 getClass() 就是获取父类(造this的类)
//      Method method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class);
//      // this是当前的对象实例
//      method.invoke(this, req, res);
//    } catch (Exception e) {
//      e.printStackTrace();
//    }
//  }

  // 注销功能
  protected void loginOut(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    req.getSession().invalidate();
  }

  protected void login(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    User loginUser = userService.login(new User(null, username, password, null));
    if(loginUser == null) {
      // 登录失败
      // 将错误信息 和 回显的表单项信息 保存到Request域中
      req.setAttribute("msg", "用户名和密码错误");
      req.setAttribute("username", username);
      req.getRequestDispatcher("/pages/user/login.jsp").forward(req, res);
    } else {
      // 登录成功 后将用户的信息保存到session域中
      req.getSession().setAttribute("user", loginUser);
      req.getRequestDispatcher("/pages/user/login_success.jsp").forward(req, res);
    }
  }

  protected void regist(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 获取请求的参数
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    String email = req.getParameter("email");
    String code = req.getParameter("code");

    User user = WebUtils.copyParamToBean(new User(), req.getParameterMap());

    // 获取验证码信息
    String token = (String) req.getSession().getAttribute(KAPTCHA_SESSION_KEY);
    req.getSession().removeAttribute(KAPTCHA_SESSION_KEY);


    // 2. 检查验证码是否正确(验证码由服务器生成 先写死) 要求验证码为: abcd
    if(token != null && token.equalsIgnoreCase(code)) {
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

  protected void ajaxExistsUserName(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

    // 1. 获取请求的参数 username
    String username = req.getParameter("username");

    // 2. 调用 userService.existsUserName()
    boolean existsUsername = userService.existsUsername(username);

    // 3. 把返回的结果封装成为map对象
    Map<String, Object> result = new HashMap<>();
    result.put("existsUsername", existsUsername);

    Gson gson = new Gson();
    String json = gson.toJson(result);
    res.getWriter().write(json);

  }
}
