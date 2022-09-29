<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="http://localhost:8080/cookie_session/loginServlet" method="get">
    用户名: <input type="text" name="username" id="username" value="${cookie.username.value}"> <br><br>
    密&emsp;码: <input type="text" name="password" id="password"> <br><br>
    <input type="submit" value="登录">
</form>
</body>
</html>
