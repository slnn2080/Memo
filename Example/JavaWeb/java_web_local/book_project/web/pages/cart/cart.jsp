<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>购物车</title>

<%-- 包含base标签 css样式 jq文件 --%>
<%@ include file="/common/head.jsp" %>
</head>
<body>
	
	<div id="header">
			<img class="logo_img" alt="" src="static/img/logo.gif" >
			<span class="wel_word">购物车</span>
			<%-- 引入登录成功之后的组件 --%>
			<%@ include file="/common/login_success_menu.jsp"%>
	</div>
	
	<div id="main">
		<table>
			<tr>
				<td>商品名称</td>
				<td>数量</td>
				<td>单价</td>
				<td>金额</td>
				<td>操作</td>
			</tr>
			<c:if test="${empty sessionScope.cart.items}">
			<%-- 购物车没有数据的时候 --%>
				<tr>
					<td colspan="5">
						<a href="index.jsp">亲 当前购物车为空哦</a>
					</td>
				</tr>
			</c:if>
			<c:if test="${not empty sessionScope.cart.items}">
			<%-- 购物车有数据的时候 --%>
				<c:forEach items="${sessionScope.cart.items}" var="entry">
					<tr>
						<td>${entry.value.name}</td>
						<td style="text-align: center">
							<input
								data-id="${entry.value.id}"
								class="item-count"
								style="width: 50px; text-align: center;"
								type="text"
								value="${entry.value.count}">
						</td>
						<td>${entry.value.price}</td>
						<td>${entry.value.totalPrice}</td>
						<td><a class="del-btn" href="cartServlet?action=deleteItem&id=${entry.value.id}">删除</a></td>
					</tr>
				</c:forEach>
			</c:if>

		</table>
		<c:if test="${not empty sessionScope.cart.items}">
			<div class="cart_info">
				<span class="cart_span">购物车中共有<span class="b_count">${sessionScope.cart.totalCount}</span>件商品</span>
				<span class="cart_span">总金额<span class="b_price">${sessionScope.cart.totalPrice}</span>元</span>
				<span class="cart_span"><a class="clear-cart" href="cartServlet?action=clear">清空购物车</a></span>
				<span class="cart_span"><a href="orderServlet?action=createOrder">去结账</a></span>
			</div>
		</c:if>
	</div>

	<%@ include file="/common/footer.jsp"%>

	<script>
		$(".del-btn").on("click", function() {
			let text = $(this).parent().parent().find("td:first").text()
			return confirm("您确认要删除" + text + "么?")
		})

		$(".clear-cart").on("click", function() {
			return confirm("您确认要清空购物车么?")
		})

		$(".item-count").on("change", function() {
			let name = $(this).parent().parent().find("td:first").text()
			let count = $(this).val()
			let id = $(this).data("id")
			// 当 input 中的值发生变化的时候 并离开输入框的时候 我们要提示用户是否确认修改
			let flag = confirm("您确定要修改【"+ name +"】商品数量为【"+ count +"】么？")

			flag
				? send("http://localhost:8080/project/cartServlet?action=updateCount&id=" + id + "&count=" + count)
				: this.value = this.defaultValue
		})

		function send(url) {
			location.href = url
		}
	</script>
</body>
</html>