package com.sam.servlet_test2;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Servlet1 extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. servlet1中先获取客户端的请求参数(办事的材料) 并做检查
    String username = req.getParameter("username");
    System.out.println("Servlet1(柜台)中检查参数(材料)" + username);

    // 2. servlet1在检查完参数(材料)后要加盖一个章 并传递到servlet2（柜台2）去 这里我们利用 域数据 来盖章
    req.setAttribute("key", "柜台1的章");

    // 3. 问路: servlet2(柜台2)怎么走
    RequestDispatcher requestDispatcher = req.getRequestDispatcher("/servlet2");

    // 4. 走向servlet2
    requestDispatcher.forward(req, res);
  }
}
