package com.sam.filter;

import com.sam.utils.JdbcUtils;

import javax.servlet.*;
import java.io.IOException;

public class TransactionFilter implements Filter {
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {

  }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    try {

      filterChain.doFilter(servletRequest, servletResponse);

      // 提交事务
      JdbcUtils.commitAndClose();

    } catch (Exception e) {
      // 回滚事务
      JdbcUtils.rollbackAndClose();

      e.printStackTrace();

      // 将异常继续往上抛 抛到Tomcat服务器 让其知道后并错错误页面提示处理
      throw new RuntimeException(e);
    }
  }

  @Override
  public void destroy() {

  }
}
