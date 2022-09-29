<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.sam.pojo.Person" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="com.sam.pojo.Student" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        div {
            padding: 10px;
            background: beige;
        }

        div:nth-child(odd) {
            background:orange;
        }
    </style>
</head>
<body>
<h3>test页面</h3>
<%
    List<Student> students = new ArrayList<>();
    for(int i=1; i<=10; i++) {
        students.add(new Student(i, "user" + i, "pwd" + i, 18+i, "phone" + i));
    }

    request.setAttribute("studs", students);
%>
<c:forEach begin="2" end="7" items="${requestScope.studs}" var="stud">
    <div>编号: ${stud.id}</div>
    <div>用户名: ${stud.username}</div>
    <div>密码: ${stud.password}</div>
    <div>年龄: ${stud.age}</div>
    <div>电话: ${stud.phone}</div>
    <div>操作: 添加 or 删除</div>
</c:forEach>
</body>
</html>
