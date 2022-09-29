package com.sam.web;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

// 目的就是代码复用 定义成抽象类
public abstract class BaseServlet_backup extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    doPost(req, res);
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    res.setContentType("text/html; charset=UTF-8");
    req.setCharacterEncoding("UTF-8");

    // 获取页面中的隐藏域的action值 根据该值 利用反射调用对应的方法
    String action = req.getParameter("action");
    try {
      // this是当前的对象实例 getClass() 就是获取父类(造this的类)
      Method method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class);
      // this是当前的对象实例
      method.invoke(this, req, res);
    } catch (Exception e) {
      e.printStackTrace();

      // 把异常抛给Filter过滤器
      throw new RuntimeException(e);
    }
  }
}
