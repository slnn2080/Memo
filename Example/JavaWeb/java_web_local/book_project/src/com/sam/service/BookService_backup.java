package com.sam.service;

import com.sam.pojo.Book;
import com.sam.pojo.Page;

import java.util.List;

public interface BookService_backup {
  // 添加图书
  public void addBook(Book book);

  // 删除图书
  public void deleteBookById(Integer id);

  // 修改图书
  public void updateBook(Book book);

  // 根据id查询指定图书
  public Book queryBookById(Integer id);

  // 查询所有图书
  public List<Book> queryBooks();

  Page<Book> page(int pageNo, int pageSize);

  Page<Book> pageByPrice(int pageNo, int pageSize, int min, int max);
}
