package com.sam.servlet_test2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Servlet2 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 1. servlet2(柜台2)同样也要看请求参数(版式材料)
    String username = req.getParameter("username");
    System.out.println("Servlet2(柜台)中检查参数(材料)" + username);

    // 2. 查看柜台1是否有盖章
    Object key = req.getAttribute("key");
    System.out.println("柜台1是否有章: " + key);

    // 3. 处理自己的业务
    System.out.println("servlet2处理自己的业务");


    // 代码写完了 前端必须要从url访问servlet1
  }
}
