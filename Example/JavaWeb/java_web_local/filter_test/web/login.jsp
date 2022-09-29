<%--
  Created by IntelliJ IDEA.
  User: LIUCHUNSHAN
  Date: 2022/04/09
  Time: 23:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Title</title>
</head>
<body>
  <h3>这是 login.jsp 页面</h3>
  <form action="http://localhost:8080/loginServlet" method="get">
    用户名: <input type="text" name="username"> <br>
    密&emsp;码: <input type="text" name="password"> <br>
    <input type="submit" value="提交">
  </form>
</body>
</html>
