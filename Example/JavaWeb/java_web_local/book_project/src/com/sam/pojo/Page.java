package com.sam.pojo;

import java.util.List;

public class Page<T> {

  // 每页显示的条数 一般都是常量
  public static final Integer PAGE_SIZE = 4;

  private Integer pageNo;
  private Integer pageSize = PAGE_SIZE;
  // 总页码
  private Integer pageTotal;
  // 总记录数
  private Integer pageTotalCount;
  // 当前页数据
  private List<T> items;


  // 分页器的请求地址
  private String url;

  @Override
  public String toString() {
    return "Page{" +
        "pageNo=" + pageNo +
        ", pageSize=" + pageSize +
        ", pageTotal=" + pageTotal +
        ", pageTotalCount=" + pageTotalCount +
        ", items=" + items +
        ", url='" + url + '\'' +
        '}';
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Integer getPageSize() {
    return pageSize;
  }

  public void setPageSize(Integer pageSize) {
    this.pageSize = pageSize;
  }

  public Integer getPageTotal() {
    return pageTotal;
  }

  public void setPageTotal(Integer pageTotal) {
    this.pageTotal = pageTotal;
  }

  public Integer getPageNo() {
    return pageNo;
  }

  public void setPageNo(Integer pageNo) {
//    if(pageNo < 1) pageNo = 1;
//    if(pageNo > pageTotal) pageNo = pageTotal;

    this.pageNo = pageNo;
  }

  public Integer getPageTotalCount() {
    return pageTotalCount;
  }

  public void setPageTotalCount(Integer pageTotalCount) {
    this.pageTotalCount = pageTotalCount;
  }

  public List<T> getItems() {
    return items;
  }

  public void setItems(List<T> items) {
    this.items = items;
  }
}
