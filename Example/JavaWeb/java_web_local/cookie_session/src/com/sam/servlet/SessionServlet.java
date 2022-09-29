package com.sam.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class SessionServlet extends BaseServlet {

  protected void createOrGetSession(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 创建和获取 session 对象
    HttpSession session = req.getSession();

    // 验证该session是不是新创建的
    boolean isNew = session.isNew();

    // 获取 session id
    String id = session.getId();

    res.getWriter().write("得到的session: id" + id + "<br />");
    res.getWriter().write("该session是否是新创建的: " + isNew + "<br />");
  }

  protected void setAttribute(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 往session域保存数据
    req.getSession().setAttribute("key1", "value1");
  }
  protected void getAttribute(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 获取session域中的数据
    Object attribute = req.getSession().getAttribute("key1");
    res.getWriter().write("从session中获取的 key1 的数据是: " + attribute);
  }

  protected void defaultLife(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    int maxInactiveInterval = req.getSession().getMaxInactiveInterval();
    res.getWriter().write("session的默认时长为: " + maxInactiveInterval);
  }

  protected void life3(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 获取session对象
    HttpSession session = req.getSession();
    res.getWriter().write("当前session原有的超时时间为: " + session.getMaxInactiveInterval() + "<br>");

    // 设置当前session 3秒  后超时
    session.setMaxInactiveInterval(3);
    res.getWriter().write("当前session已经设置了3秒后超时 <br>");
    res.getWriter().write("现在session的超时时间为: " + session.getMaxInactiveInterval() + "<br>");
  }
  }
