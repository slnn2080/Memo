<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>书城首页</title>
    <%-- 包含base标签 css样式 jq文件 --%>
    <%@ include file="/common/head.jsp" %>
</head>
<body>

<div id="header">
    <img class="logo_img" alt="" src="static/img/logo.gif" >
    <span class="wel_word">网上书城</span>
    <div>
        <%-- 如果用户还没有登录显示 登录 和 注册 的菜单 --%>
        <c:if test="${empty sessionScope.user}">
            <a href="pages/user/login.jsp">登录</a> |
            <a href="pages/user/regist.jsp">注册</a>
        </c:if>

        <%-- 已经登录的时候 应该显示的菜单 --%>
        <c:if test="${not empty sessionScope.user}">
            <span>欢迎<span class="um_span">${sessionScope.user.username}</span>光临尚硅谷书城</span>
            <a href="user?action=loginOut">注销</a>
        </c:if>
            <a href="pages/cart/cart.jsp">购物车</a>
            <a href="pages/manager/manager.jsp">后台管理</a>
    </div>
</div>
<div id="main">
    <div id="book">
        <div class="book_cond">
            <form action="client/book_list" method="get">
                <input type="hidden" name="action" value="pageByPrice">
                价格：<input id="min" type="text" name="min" value="${param.min}"> 元 -
                <input id="max" type="text" name="max" value="${param.max}"> 元
                <input type="submit" value="查询" />
            </form>
        </div>
        <div style="text-align: center">
            <c:if test="${empty sessionScope.cart.items}">
                <span></span>
                <div>
                    <span style="color: red">当前购物车为空</span>
                </div>
            </c:if>

            <c:if test="${not empty sessionScope.cart.items}">
                <span id="cart_total_count">您的购物车中有 ${sessionScope.cart.totalCount} 件商品</span>
                <div>
                    您刚刚将<span id="cart_last_name" style="color: red"> ${sessionScope.lastBookName} </span>加入到了购物车中
                </div>
            </c:if>

        </div>
<%-- 内容 --%>
        <c:forEach items="${requestScope.page.items}" var="book">
        <div class="b_list">
            <div class="img_div">
                <img class="book_img" alt="" src="static/img/default.jpg" />
            </div>
            <div class="book_info">
                <div class="book_name">
                    <span class="sp1">书名:</span>
                    <span class="sp2">${book.name}</span>
                </div>
                <div class="book_author">
                    <span class="sp1">作者:</span>
                    <span class="sp2">${book.author}</span>
                </div>
                <div class="book_price">
                    <span class="sp1">价格:</span>
                    <span class="sp2">￥${book.price}</span>
                </div>
                <div class="book_sales">
                    <span class="sp1">销量:</span>
                    <span class="sp2">${book.sales}</span>
                </div>
                <div class="book_amount">
                    <span class="sp1">库存:</span>
                    <span class="sp2">${book.stock}</span>
                </div>
                <div class="book_add">
                    <button data-id="${book.id}" class="add-btn">加入购物车</button>
                </div>
            </div>
        </div>
        </c:forEach>
<%-- 内容结束 --%>
    </div>

<%@include file="../../common/pagination.jsp"%>

</div>

<%@ include file="/common/footer.jsp"%>
<script>
    $(function() {
      $(".add-btn").on("click", function() {
        // 点击 加入购物车的按钮后 我们要将商品的编码 传递给服务器 服务器才知道我们要添加哪个商品
        // 这里我们可以在 url后面直接坠商品编号
        // 我们可以在html标签的 使用data-属性 设置 图书的id
        let $id = $(this).data("id")
          $.ajax({
              url: "${basePath}cartServlet",
              type: "get",
              data: "action=ajaxAddItem&id=" + $id,
              dataType: "json",
              success: function(data) {
                  console.log(data)
                  $("#cart_total_count").text("您的购物车中有" + data.totalCount + "件商品")
                  $("#cart_last_name").text(data.lastBookName)
              }
          })

        // 给加入购物车按钮绑定单击事件
        // location.href = "${basePath}cartServlet?action=addItem&id=" + $id
      })
    })

</script>
</body>
</html>