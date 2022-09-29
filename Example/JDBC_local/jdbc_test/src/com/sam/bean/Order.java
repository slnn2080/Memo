package com.sam.bean;

import java.sql.Date;

public class Order {
  private int order_id;
  private String order_name;
  private Date order_date;

  public Order() {
  }

  public Order(int order_id, String order_name, Date order_date) {
    this.order_id = order_id;
    this.order_name = order_name;
    this.order_date = order_date;
  }

  public int getOrder_id() {
    return order_id;
  }

  public void setOrder_id(int order_id) {
    this.order_id = order_id;
  }

  public String getOrder_name() {
    return order_name;
  }

  public void setOrder_name(String order_name) {
    this.order_name = order_name;
  }

  public Date getOrder_date() {
    return order_date;
  }

  public void setOrder_date(Date order_date) {
    this.order_date = order_date;
  }

  @Override
  public String toString() {
    return "Order{" +
        "order_id=" + order_id +
        ", order_name='" + order_name + '\'' +
        ", order_date=" + order_date +
        '}';
  }
}
