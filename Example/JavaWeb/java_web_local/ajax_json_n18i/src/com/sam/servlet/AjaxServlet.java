package com.sam.servlet;

import com.google.gson.Gson;
import com.sam.pojo.Person;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AjaxServlet extends BaseServlet {
  protected void javaScriptAjax(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    System.out.println("ajax请求过来了");

    Person person = new Person(1, "sam");
    // 客户端和服务器不在同一台电脑上 这时候我们将数据传递到客户端 我们需要将对象转为json字符串

    Gson gson = new Gson();
    String json = gson.toJson(person);

    // 将数据返回给客户端 得到响应的字符输出流
    res.getWriter().write(json);
  }
}
