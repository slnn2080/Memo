<%--
  Created by IntelliJ IDEA.
  User: LIUCHUNSHAN
  Date: 2022/04/07
  Time: 21:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        .form-item {
            display: flex;
            align-items: center;
            height: 30px;
        }
        .form-item-img {
            margin-left: 10px;
        }
        .form-item-img img {
            height: 30px;
        }
    </style>
</head>
<body>
<form action="http://localhost:8080/project/registServlet" method="get">
    <div class="form-item">
        用户名: <input type="text" name="username">
    </div>
    <div class="form-item">
        <div class="form-item-code">
            验证码: <input type="text" name="code" id="code">
        </div>
        <div class="form-item-img">
            <img src="http://localhost:8080/project/kaptcha.jpg" alt="">
        </div>
    </div>
    <input type="submit" value="登录">
</form>
</body>
</html>
