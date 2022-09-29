package com.sam.test;

import com.sam.dao.BookDao;
import com.sam.dao.impl.BookDaoImpl;
import com.sam.pojo.Book;
import org.junit.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.Assert.*;

public class BookDaoTest {

  // 测试的时候 需要一个 BookDao 因为我们要测的旧是它实现类的方法
   private BookDao bookDao = new BookDaoImpl();

  @Test
  public void addBook() {
    // id自增长为空 new BigDecimal因为类中定义的就是这个类型 imgPath为空因为使用默认值就可以
    bookDao.addBook(new Book(null, "bookname1", "sam", new BigDecimal(99), 1000, 50, null));
  }

  @Test
  public void deleteBookById() {
    bookDao.deleteBookById(21);
  }

  @Test
  public void updateBook() {

    bookDao.updateBook(new Book(21, "book_name1", "sam", new BigDecimal(99), 1000, 50, null));
  }

  @Test
  public void queryBookById() {
    System.out.println(bookDao.queryBookById(21));
  }

  @Test
  public void queryBooks() {
    List<Book> list = bookDao.queryBooks();
    for(Book book: list) {
      System.out.println(book);
    }
  }

  @Test
  public void queryForPageTotalCount() {
    System.out.println(bookDao.queryForPageTotalCount());
  }

  @Test
  public void queryForPageItems() {
    for (Book book : bookDao.queryForPageItems(8, 4)) {
      System.out.println(book);
    }
  }

  @Test
  public void queryForPageTotalCountByPrice() {
    System.out.println(bookDao.queryForPageTotalCountByPrice(0, 100));
  }

  @Test
  public void queryForPageItemsByPrice() {
    for (Book book : bookDao.queryForPageItemsByPrice(0, 4, 10, 50)) {
      System.out.println(book);
    }
  }
}