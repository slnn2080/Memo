package com.sam.web;

import com.sam.pojo.Book;
import com.sam.pojo.Page;
import com.sam.service.BookService;
import com.sam.service.impl.BookServiceImpl;
import com.sam.utils.WebUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ClientBookServlet extends BaseServlet {

  private BookService bookService = new BookServiceImpl();

  // 处理分页功能
  protected void page(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    int pageNo = WebUtils.ParseInt(req.getParameter("pageNo"), 1);
    int pageSize = WebUtils.ParseInt(req.getParameter("pageSize"), Page.PAGE_SIZE);

    // 调用 BookService.page(pageNo,pageSize) 返回的就是page对象
    Page<Book> page = bookService.page(pageNo, pageSize);

    // 设置page对象url的属性值 也就是设置 请求接口的地址
    page.setUrl("client/book_list?action=page");

    // 保存page对象到request域中
    req.setAttribute("page", page);

    // 请求转发
    req.getRequestDispatcher("/pages/client/index.jsp").forward(req, res);
  }


  protected void pageByPrice(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    int pageNo = WebUtils.ParseInt(req.getParameter("pageNo"), 1);
    int pageSize = WebUtils.ParseInt(req.getParameter("pageSize"), Page.PAGE_SIZE);

    // 获取表单中输入的区间价格 最易最小最大的默认值
    int min = WebUtils.ParseInt(req.getParameter("min"), 0);
    int max = WebUtils.ParseInt(req.getParameter("max"), Integer.MAX_VALUE);

    Page<Book> page = bookService.pageByPrice(pageNo, pageSize, min, max);

    // 设置url的时候要带上价格区间 为了回显
    StringBuilder sb = new StringBuilder("client/book_list?action=pageByPrice");
    // 如果有最小价格参数就追加到分页条的参数地址中
    if(req.getParameter("min") != null) {
      sb.append("&min=").append(req.getParameter("min"));
    }
    if(req.getParameter("max") != null) {
      sb.append("&max=").append(req.getParameter("max"));
    }
    page.setUrl(sb.toString());

    req.setAttribute("page", page);
    req.getRequestDispatcher("/pages/client/index.jsp").forward(req, res);
  }
}
