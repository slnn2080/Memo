package com.sam.jsp;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SearchStudentServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 1. 获取请求的参数

    // 2. 发sql语句查询学生的信息

    // 3. 保存查询到的结果 到 request域中 这里我们使用for循环模拟查询到的数据
    List<Student> list = new ArrayList<>();
    for(int i=0; i<10; i++) {
      list.add(new Student(i+1, "学生姓名" + i + 1, i + 1, "phone: " + i));
    }

    req.setAttribute("studs", list);

    // 4. 请求转发到 showStudent.jsp
    req.getRequestDispatcher("/scoped.jsp").forward(req,resp);
  }
}
