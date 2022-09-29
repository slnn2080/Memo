package com.sam.servlet;

import com.sam.utils.CookieUtils;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CookieServlet extends BaseServlet {

  protected void createCookie(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 创建cookie对象
    Cookie cookie = new Cookie("key1", "value1");
    Cookie cookie2 = new Cookie("key2", "value2");

    // 2. 通知客户端保存Cookie 服务器发给客户端的都是通过响应来操作的
    res.addCookie(cookie);
    res.addCookie(cookie2);
    res.getWriter().write("Cookie创建成功");

  }

  protected void getCookie(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    Cookie[] cookies = req.getCookies();
    // 使用封装的工具类
    Cookie targetCookie = CookieUtils.findCookie("key1", cookies);
    if(targetCookie != null) res.getWriter().write(targetCookie.getName() + "=" + targetCookie.getValue());
  }

  protected void updateCookie(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
//    Cookie cookie = new Cookie("key1", "newValue");
//    res.addCookie(cookie);
//    res.getWriter().write("key1的cookie值修改好了");

    Cookie cookie = CookieUtils.findCookie("key1", req.getCookies());
    // 在赋值前要先判断下 要不然找不到cookie
    if(cookie != null) cookie.setValue("newnewValue");
    res.addCookie(cookie);
  }

  protected void defaultLife(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    Cookie cookie = new Cookie("defaultLifeName", "defaultLifeValue");
    // 设置 cookie 的生存周期为 关闭浏览器之后删除
    cookie.setMaxAge(-1);
    res.addCookie(cookie);
  }

  protected void deleteNow(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 先找到我们要删除的cookie
    Cookie targetCookie = CookieUtils.findCookie("key2", req.getCookies());
    // 0表示马上删除
    if(targetCookie != null) targetCookie.setMaxAge(0);

    // 这句是一定要加的
    res.addCookie(targetCookie);
  }
  protected void life3600(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    Cookie cookie = new Cookie("life", "3600");
    // 设置cookie一小时之后被删除 无效
    cookie.setMaxAge(60 * 60);
    res.addCookie(cookie);
  }

  protected void testPath(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    Cookie cookie = new Cookie("path1", "pathValue");
    // req.getContextPath() -> /工程路径
    // 设置path的值为 /工程路径/abc
    cookie.setPath(req.getContextPath() + "/abc");
    res.addCookie(cookie);
    res.getWriter().write("创建了一个带有path路径的cookie");
  }
  }
