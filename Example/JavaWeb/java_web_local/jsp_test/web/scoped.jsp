<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.sam.jsp.Student" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <%
        request.setAttribute("key", 10);
    %>
    <h1>Scoped页面</h1>
    <c:if test="${requestScope.key > 5}">
        <h3>我会输出的</h3>
    </c:if>
</body>
</html>
