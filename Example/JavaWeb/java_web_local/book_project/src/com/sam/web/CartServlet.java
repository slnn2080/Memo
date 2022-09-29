package com.sam.web;

import com.google.gson.Gson;
import com.sam.pojo.Book;
import com.sam.pojo.Cart;
import com.sam.pojo.CartItem;
import com.sam.service.BookService;
import com.sam.service.impl.BookServiceImpl;
import com.sam.utils.WebUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class CartServlet extends BaseServlet {

  private BookService bookService = new BookServiceImpl();

  // 加入购物车
  protected void addItem(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // - 1. 获取请求的参数: 商品编号
    int id = WebUtils.ParseInt(req.getParameter("id"), 0);

    // - 2. 根据 商品id 查询数据库得到图书 也就是调用bookService.queryBookById() 得到该本图书的信息
    Book book = bookService.queryBookById(id);

    // - 3. 把图书信息转换为CartItem商品项 最后一个参数是总价 也就是一本书的价格
    CartItem cartItem = new CartItem(book.getId(), book.getName(), 1, book.getPrice(), book.getPrice());

    // - 4. 有了CartItem商品项后调用 cart.addItem(CartItem) 添加商品项
    // 从session当中获取购物车(如果取不到cart就是null那么下面的if里就会创建cart)
    Cart cart = (Cart) req.getSession().getAttribute("cart");
    if(cart == null) {
      // 说明session中没有购物车 那我们就创建一个
      cart = new Cart();
      // 创建好的购物车放在session中
      req.getSession().setAttribute("cart", cart);
    }

    cart.addItem(cartItem);

    // - 5. 重定向回原来商品所在的地址页面
    // res.sendRedirect(req.getContextPath());
    res.sendRedirect(req.getHeader("Referer"));

    // 将最后添加的图书放入到session域中
    req.getSession().setAttribute("lastBookName", cartItem.getName());
  }

  protected void deleteItem(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 获取商品编号
    int id = WebUtils.ParseInt(req.getParameter("id"), 0);

    // 找到session中的购物车对象 调用购物车的方法
    Cart cart = (Cart)req.getSession().getAttribute("cart");
    if(cart != null) {
      // 删除了购物车商品项
      cart.deleteItem(id);
      // 删除了之后我们一般会希望请求再次的跳回原来的页面刷新下看看删除之后的结果
      res.sendRedirect(req.getHeader("Referer"));
    }
  }

  protected void clear(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    Cart cart = (Cart) req.getSession().getAttribute("cart");
    if(cart != null) cart.clear();

    res.sendRedirect(req.getHeader("Referer"));
  }

  protected void updateCount(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 获取参数
    int id = WebUtils.ParseInt(req.getParameter("id"), 0);
    int count = WebUtils.ParseInt(req.getParameter("count"), 1);

    // 获取cart购物车对象
    Cart cart = (Cart) req.getSession().getAttribute("cart");
    if(cart != null) cart.updateCount(id, count);

    // 回到原页面查看结果
    res.sendRedirect(req.getHeader("Referer"));

  }

  protected void ajaxAddItem(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // - 1. 获取请求的参数: 商品编号
    int id = WebUtils.ParseInt(req.getParameter("id"), 0);

    // - 2. 根据 商品id 查询数据库得到图书 也就是调用bookService.queryBookById() 得到该本图书的信息
    Book book = bookService.queryBookById(id);

    // - 3. 把图书信息转换为CartItem商品项 最后一个参数是总价 也就是一本书的价格
    CartItem cartItem = new CartItem(book.getId(), book.getName(), 1, book.getPrice(), book.getPrice());

    // - 4. 有了CartItem商品项后调用 cart.addItem(CartItem) 添加商品项
    // 从session当中获取购物车(如果取不到cart就是null那么下面的if里就会创建cart)
    Cart cart = (Cart) req.getSession().getAttribute("cart");
    if(cart == null) {
      // 说明session中没有购物车 那我们就创建一个
      cart = new Cart();
      // 创建好的购物车放在session中
      req.getSession().setAttribute("cart", cart);
    }

    cart.addItem(cartItem);

    // 将最后添加的图书放入到session域中
    req.getSession().setAttribute("lastBookName", cartItem.getName());

    // 使用 ajax 所以忽略下面的步骤5
    Map<String, Object> result = new HashMap<>();
    result.put("totalCount", cart.getTotalCount());
    result.put("lastBookName", cartItem.getName());

    Gson gson = new Gson();
    String json = gson.toJson(result);
    res.getWriter().write(json);


    // - 5. 重定向回原来商品所在的地址页面
    // res.sendRedirect(req.getContextPath());
    // res.sendRedirect(req.getHeader("Referer"));
  }
}
