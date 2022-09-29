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
import java.util.List;

public class BookServlet_backup extends BaseServlet {

  private BookService bookService = new BookServiceImpl();

  protected void add(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 为了解决 添加图书的时候 跳页的问题
    int pageNo = WebUtils.ParseInt(req.getParameter("pageNo"), 0);
    pageNo += 1;


    // 1. 获取请求参数 封装成book对象
    Book book = WebUtils.copyParamToBean(new Book(), req.getParameterMap());

    // 2. 调用 BookService.addBook() 保存图书
    bookService.addBook(book);

    // 3. 跳转到图书列表页面 /manager/bookServlet?action=list
    // 请求转发会造成 表单的重复提交 这里我们使用 重定向
    // req.getRequestDispatcher("/manager/book_list?action=list").forward(req, res);

    // 请求转发的/是到web 重定向的/表示到端口号 所以我们要把工程名加上
    res.sendRedirect(req.getContextPath() + "/manager/book_list?action=page&pageNo=" + pageNo);
  }

  protected void delete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // - 1. 获取请求参数 图书id
    String id = req.getParameter("id");
    int bookId = WebUtils.ParseInt(id, 0);
    // - 2. 调用bookService.deleteBookById()删除图书
    bookService.deleteBookById(bookId);

    // - 3. 重定向回图书列表 /project/manager/book_list?action=list
    res.sendRedirect(req.getContextPath() + "/manager/book_list?action=page&pageNo=" + req.getParameter("pageNo"));
  }
  protected void getBook(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // - 1. 获取图书编号
    String id = req.getParameter("id");
    int bookId = WebUtils.ParseInt(id, 0);

    // - 2. 调用BookService.queryBookById(id) 得到修改的图书信息
    Book book = bookService.queryBookById(bookId);

    // - 3. 包该图书信息保存到 request域中
    req.setAttribute("bookInfo", book);

    // - 4. 请求转发到 book_edit.jsp页面 /pages/manager/book_edit.jsp
    req.getRequestDispatcher("/pages/manager/book_edit.jsp").forward(req,res);
  }

  protected void update(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // - 1. 获取请求的参数 封装成为book对象
    Book book = WebUtils.copyParamToBean(new Book(), req.getParameterMap());

    // - 2. 调用BookService.updateBook(book) 修改图书
    bookService.updateBook(book);

    // - 3. 重定向到图书列表管理页面
    res.sendRedirect(req.getContextPath() + "/manager/book_list?action=page&pageNo=" + req.getParameter("pageNo"));
  }

  protected void list(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 创建 bookService 对象(service层) 查询全部图书
    List<Book> books = bookService.queryBooks();

    // 2. 把全部图书保存到request域中
    req.setAttribute("books", books);

    // 3. 请求转发到 /pages/manager/book_manager.jsp页面
    // /表示到工程名也就是web目录
    req.getRequestDispatcher("/pages/manager/book_manager.jsp").forward(req, res);
  }

  // 处理分页功能
  protected void page(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 获取请求参数 pageNo pageSize  如果pageNo 没有传我们默认应该是第一页 不要填0 这种情况下是用户刚进入到这个页面默认展示第一页数据
    int pageNo = WebUtils.ParseInt(req.getParameter("pageNo"), 1);
    int pageSize = WebUtils.ParseInt(req.getParameter("pageSize"), Page.PAGE_SIZE);

    // 调用 BookService.page(pageNo,pageSize) 返回的就是page对象
    Page<Book> page = bookService.page(pageNo, pageSize);


    // 设置page对象url的属性值 也就是设置 请求接口的地址
    page.setUrl("manager/book_list?action=page");



    // 保存page对象到request域中
    req.setAttribute("page", page);

    // 请求转发到 /pages/manager/book_manager.jsp页面
    req.getRequestDispatcher("/pages/manager/book_manager.jsp").forward(req, res);
  }

}
