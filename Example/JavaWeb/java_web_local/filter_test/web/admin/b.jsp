<%--
  Created by IntelliJ IDEA.
  User: LIUCHUNSHAN
  Date: 2022/04/09
  Time: 23:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Title</title>
</head>
<body>
<%
  Object user = session.getAttribute("user");
  // 如果user == null说明还没有登录
  if(user == null) {
    request.getRequestDispatcher("/login.jsp").forward(request, response);
    // 一般请求转发之后就不会执行其它的代码了
    return;
  }
%>
  <h3>我是 b.jsp 页面</h3>
</body>
</html>
