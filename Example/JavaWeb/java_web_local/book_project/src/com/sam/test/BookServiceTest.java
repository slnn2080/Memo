package com.sam.test;

import com.sam.pojo.Book;
import com.sam.service.BookService;
import com.sam.service.impl.BookServiceImpl;
import org.junit.Test;

import java.math.BigDecimal;

import static org.junit.Assert.*;

public class BookServiceTest {
  private BookService bookService = new BookServiceImpl();

  @Test
  public void addBook() {
    bookService.addBook(new Book(null, "book_name2", "erin", new BigDecimal(199), 20, 0, null));
  }

  @Test
  public void deleteBookById() {
    bookService.deleteBookById(22);
  }

  @Test
  public void updateBook() {
    bookService.updateBook(new Book(22, "book_name2", "erin", new BigDecimal(199), 200, 0, null));
  }

  @Test
  public void queryBookById() {
    System.out.println(bookService.queryBookById(22));
  }

  @Test
  public void queryBooks() {
    for (Book queryBook : bookService.queryBooks()) {
      System.out.println(queryBook);
    }
  }

  @Test
  public void page() {
    System.out.println(bookService.page(1, 5));
  }
  @Test
  public void pageByPrice() {
    System.out.println(bookService.pageByPrice(1, 4, 10, 50));
  }
}