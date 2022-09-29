package com.sam.dao.impl;

import com.sam.dao.BookDao;
import com.sam.pojo.Book;

import java.util.List;

public class BookDaoImpl_backup extends BaseDao implements BookDao {
  @Override
  public int addBook(Book book) {
    String sql = "insert into t_book(`name`,`author`,`price`,`sales`,`stock`,`img_path`) values(?,?,?,?,?,?)";

    return update(sql, book.getName(), book.getAuthor(), book.getPrice(), book.getSales(), book.getStock(), book.getImgPath());
  }

  @Override
  public int deleteBookById(Integer id) {
    String sql = "delete from t_book where id = ?";
    return update(sql, id);
  }

  @Override
  public int updateBook(Book book) {
    String sql = "update t_book set `name` = ?,`author` = ?,`price` = ?,`sales` = ?,`stock` = ?,`img_path` = ? where id = ?";

    //　我们传入的参数 和 sql语句中的 ? 一一匹配 比如最后一个id不要忘记传
    return update(sql, book.getName(), book.getAuthor(), book.getPrice(), book.getSales(), book.getStock(), book.getImgPath(), book.getId());
  }

  @Override
  public Book queryBookById(Integer id) {
    // imgPath要加一个别名
    String sql = "select `id` , `name` , `author` , `price` , `sales` , `stock` , `img_path` imgPath from t_book where id = ?";

    return queryForOne(Book.class, sql, id);

  }

  @Override
  public List<Book> queryBooks() {
    String sql = "select `id` , `name` , `author` , `price` , `sales` , `stock` , `img_path` imgPath from t_book";

    return queryForList(Book.class, sql);
  }

  @Override
  public Integer queryForPageTotalCount() {
    String sql = "select count(*) from t_book";

    // queryForSingleValue(sql)方法返回的类型是 Object 这里我们可以定义为Number类型 然后调用 intValue 取到int型的数据 然后自动装箱为 Integer
    Number count = (Number) queryForSingleValue(sql);
    return count.intValue();
  }

  @Override
  public List<Book> queryForPageItems(int begin, int pageSize) {
    // 这里面不要用 * 要写列名
    String sql = "select `id` , `name` , `author` , `price` , `sales` , `stock`, `img_path` imgPath from t_book limit ?, ?";
    return queryForList(Book.class, sql, begin, pageSize);
  }

  @Override
  public Integer queryForPageTotalCountByPrice(int min, int max) {
    String sql = "select count(*) from t_book where price between ? and ?";

    Number count = (Number) queryForSingleValue(sql, min, max);
    return count.intValue();
  }

  @Override
  public List<Book> queryForPageItemsByPrice(int begin, int pageSize, int min, int max) {
    String sql = "select `id` , `name` , `author` , `price` , `sales` , `stock`, `img_path` imgPath from t_book where price between ? and ? order by price limit ?, ?";
    return queryForList(Book.class, sql, min, max, begin, pageSize);
  }
}
