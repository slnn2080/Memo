package com.sam.filter;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class AdminFilter implements Filter {
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    String filterName = filterConfig.getFilterName();
    System.out.println(filterName);

    String username = filterConfig.getInitParameter("username");
    System.out.println(username);

    ServletContext servletContext = filterConfig.getServletContext();
    System.out.println(servletContext);
  }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    // 这里我们只要使用这个方法实现 拦截请求 做权限检查
    HttpSession session = null;

    // 我们把ServletRequest 强转成HttpServletRequest 这样才能调用HttpServletRequest中的方法获取session
    HttpServletRequest req = (HttpServletRequest) servletRequest;
    // 获取session
    session = req.getSession();

    Object user = session.getAttribute("user");
    if(user == null) {
      servletRequest.getRequestDispatcher("/login.jsp").forward(servletRequest, servletResponse);
      return;
    } else {
      // 登录的情况
      // 让程序继续往下访问用户的目标资源 放行
      filterChain.doFilter(servletRequest, servletResponse);
    }
  }

  @Override
  public void destroy() {

  }
}
