package com.sam.testxml;

import java.math.BigDecimal;

public class Book {
  private String sn;
  private String name;
  private String author;
  private BigDecimal price;

  public Book() {
  }

  public Book(String sn, String name, String author, BigDecimal price) {
    this.sn = sn;
    this.name = name;
    this.author = author;
    this.price = price;
  }

  public String getSn() {
    return sn;
  }

  public void setSn(String sn) {
    this.sn = sn;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  @Override
  public String toString() {
    return "Book{" +
        "sn='" + sn + '\'' +
        ", name='" + name + '\'' +
        ", author='" + author + '\'' +
        ", price=" + price +
        '}';
  }
}
