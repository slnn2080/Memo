package com.sam.service.impl;

import com.sam.dao.BookDao;
import com.sam.dao.impl.BookDaoImpl;
import com.sam.pojo.Book;
import com.sam.pojo.Page;
import com.sam.service.BookService;

import java.util.List;

public class BookServiceImpl implements BookService {

  // service层会依赖于Dao层 通过bookDao去操作访问数据库
  private BookDao bookDao = new BookDaoImpl();

  @Override
  public void addBook(Book book) {
    bookDao.addBook(book);
  }

  @Override
  public void deleteBookById(Integer id) {
    bookDao.deleteBookById(id);
  }

  @Override
  public void updateBook(Book book) {
    bookDao.updateBook(book);
  }

  @Override
  public Book queryBookById(Integer id) {
    return bookDao.queryBookById(id);
  }

  @Override
  public List<Book> queryBooks() {
    return bookDao.queryBooks();
  }

  @Override
  public Page<Book> page(int pageNo, int pageSize) {
    // page对象
    Page<Book> page = new Page<>();

    // 这里没有利用构造器来赋值 而是通过set方法 为啥呢？
    page.setPageSize(pageSize);

    // 总记录数
    Integer pageTotalCount = bookDao.queryForPageTotalCount();
    page.setPageTotalCount(pageTotalCount);

    // 总页码
    Integer pageTotal = pageTotalCount / pageSize;
    if(pageTotalCount % pageSize > 0) {
      pageTotal++;
    }
    page.setPageTotal(pageTotal);

    // 数据边界的有效检查
     if(pageNo < 1) pageNo = 1;
     if(pageNo > pageTotal) pageNo = pageTotal;
    page.setPageNo(pageNo);

    // 当前页数据
    int begin = (pageNo - 1) * pageSize;
    List<Book> items = bookDao.queryForPageItems(begin, pageSize);
    page.setItems(items);

    return page;
  }

  @Override
  public Page<Book> pageByPrice(int pageNo, int pageSize, int min, int max) {
    // page对象
    Page<Book> page = new Page<>();

    // 这里没有利用构造器来赋值 而是通过set方法 为啥呢？
    page.setPageSize(pageSize);

    // 根据价格区间来查询总记录数
    Integer pageTotalCount = bookDao.queryForPageTotalCountByPrice(min, max);
    page.setPageTotalCount(pageTotalCount);

    // 总页码
    Integer pageTotal = pageTotalCount / pageSize;
    if(pageTotalCount % pageSize > 0) {
      pageTotal++;
    }
    page.setPageTotal(pageTotal);

    // 数据边界的有效检查
    if(pageNo < 1) pageNo = 1;
    if(pageNo > pageTotal) pageNo = pageTotal;
    page.setPageNo(pageNo);

    // 分局价格区间查询当前页数据
    int begin = (pageNo - 1) * pageSize;
    List<Book> items = bookDao.queryForPageItemsByPrice(begin, pageSize, min, max);
    page.setItems(items);

    return page;
  }
}
