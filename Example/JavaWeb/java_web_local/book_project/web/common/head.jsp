<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

    String scheme = request.getScheme();
    String ip = request.getServerName();
    int port = request.getServerPort();
    String proPtah = request.getContextPath();

    String path = scheme + "://" + ip + ":" + port + proPtah + "/";

    pageContext.setAttribute("basePath", path);
%>

<base href="<%= path %>" />
<link type="text/css" rel="stylesheet" href="static/css/style.css" >
<script src="static/js/jquery-1.7.2.js"></script>
