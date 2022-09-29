package com.sam.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class ManagerFilter implements Filter {
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {

  }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    // 获取 session 对象
    HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
    // 用户登录后 session 中就会有 user
    Object user = httpServletRequest.getSession().getAttribute("user");

    if(user == null) {
      // 说明没有登录 让它跳回登录页面
      httpServletRequest.getRequestDispatcher("/pages/user/login.jsp").forward(servletRequest, servletResponse);
    } else {
      // 如果登录了 就放行
      filterChain.doFilter(servletRequest, servletResponse);
    }
  }

  @Override
  public void destroy() {

  }
}
