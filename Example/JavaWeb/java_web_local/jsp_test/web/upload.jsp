<%--
  Created by IntelliJ IDEA.
  User: LIUCHUNSHAN
  Date: 2022/03/30
  Time: 11:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="http://localhost:8080/load" method="post" enctype="multipart/form-data">
    用户名: <input type="text" name="username" id="username"> <br>
    头&emsp;像: <input type="file" name="photo" id="photo"> <br>
    <input type="submit" value="提交">
</form>
</body>
</html>
