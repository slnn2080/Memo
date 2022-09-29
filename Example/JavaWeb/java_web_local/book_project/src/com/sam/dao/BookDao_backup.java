package com.sam.dao;

import com.sam.pojo.Book;

import java.util.List;

public interface BookDao_backup {
  // 添加图书
  public int addBook(Book book);

  // 根据id删除图书
  public int deleteBookById(Integer id);

  // 修改图书
  public int updateBook(Book book);

  // 根据id查询指定图书
  public Book queryBookById(Integer id);

  // 查询所有图书
  public List<Book> queryBooks();

  // 求总记录数
  Integer queryForPageTotalCount();

  // 当前页显示数据
  List<Book> queryForPageItems(int begin, int pageSize);

  Integer queryForPageTotalCountByPrice(int min, int max);

  List<Book> queryForPageItemsByPrice(int begin, int pageSize, int min, int max);
}
