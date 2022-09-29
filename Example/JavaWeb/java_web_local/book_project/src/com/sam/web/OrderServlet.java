package com.sam.web;

import com.sam.dao.OrderService;
import com.sam.dao.impl.OrderServiceImpl;
import com.sam.pojo.Cart;
import com.sam.pojo.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class OrderServlet extends BaseServlet {

  private OrderService orderService = new OrderServiceImpl();
  // 生成订单
  protected void createOrder(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 先获取Cart购物车对象
    Cart cart = (Cart) req.getSession().getAttribute("cart");

    // userId 用户登录后也在session中 所以我们也可以从session获取
    User user = (User) req.getSession().getAttribute("user");

    // 这里注意 没有登录的话 是取不到userId的 一般我们在结账的时候会要求用户先登录
    if(user == null) {
      // 没有登录 跳转到登录页面
      req.getRequestDispatcher("/pages/user/login.jsp").forward(req, res);
      // 如果出现这样的情况 下面的代码不用执行了 要加上return
      return;
    }

    // 能走到这里 说明用户登录过了 就有用户id了
    Integer userId = user.getId();

    // 调用service层里面的createOrder 生成订单
    String orderNum = orderService.createOrder(cart, userId);

    // 将订单号保存到域中 如果下面使用重定向的话 我们这里就不能保存到request域中了
    // req.setAttribute("orderId", orderNum);

    // 保存到session中
    req.getSession().setAttribute("orderId", orderNum);

    // 请求转发到 点击去结账后弹出的页面
    // req.getRequestDispatcher("/pages/cart/checkout.jsp").forward(req, res);

    // 使用重定向 上面的请求转发会造成表单的重复提交
    res.sendRedirect(req.getContextPath() + "/pages/cart/checkout.jsp");
  }
}
