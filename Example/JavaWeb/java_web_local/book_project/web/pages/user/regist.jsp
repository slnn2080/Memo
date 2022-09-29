<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>尚硅谷会员注册页面</title>
<%-- 包含base标签 css样式 jq文件 --%>
<%@ include file="/common/head.jsp" %>
<style>
	.login_form{
		height:433px;
		margin-top: 25px;
	}
</style>
</head>
<body>
		<div id="login_header">
			<img class="logo_img" alt="" src="static/img/logo.gif" >
		</div>
		
			<div class="login_banner">
			
				<div id="l_content">
					<span class="login_word">欢迎注册</span>
				</div>
				
				<div id="content">
					<div class="login_form">
						<div class="login_box">
							<div class="tit">
								<h1>注册尚硅谷会员</h1>
								<span class="errorMsg">
									${ requestScope.msg }
								</span>
							</div>
							<div class="form">
								<form action="user" method="post">
									<input type="hidden" name="action" value="regist">
									<label>用户名称：</label>
									<input class="itxt" type="text" placeholder="请输入用户名"
												 autocomplete="off" tabindex="1"
												 name="username" id="username"
										   value="${requestScope.username}"
									/>
									<br />
									<br />
									<label>用户密码：</label>
									<input class="itxt" type="password" placeholder="请输入密码"
												 autocomplete="off" tabindex="1"
												 name="password" id="password" />
									<br />
									<br />
									<label>确认密码：</label>
									<input class="itxt" type="password" placeholder="确认密码"
												 autocomplete="off" tabindex="1"
												 name="repwd" id="repwd" />
									<br />
									<br />
									<label>电子邮件：</label>
									<input class="itxt" type="text" placeholder="请输入邮箱地址"
												 autocomplete="off" tabindex="1"
												 name="email" id="email"
										   value="${requestScope.email}"
									/>
									<br />
									<br />
									<label>验证码：</label>
									<input class="itxt" name="code" type="text" style="width: 100px;" id="code"/>
									<img id="code_img" alt="" src="kaptcha.jpg" style="float: right; margin-right: 28px; width: 100px; height: 28px;">
									<br />
									<br />
									<input type="submit" value="注册" id="sub_btn" />
									
								</form>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		<%@ include file="/common/footer.jsp"%>

		<script>

			$("#code_img").on("click", () => {
				this.src = "${basePath}kaptcha.jpg?d=" + new Date();
			})

			$("#sub_btn").on("click", (e) => {

				let $uname = $("#username").val();
				let $pwd = $("#password").val()
				let $repwd = $("#repwd").val()
				let $email = $("#email").val()
				let $code = $.trim($("#code").val())

				let reg = /^\w{5,12}$/
				let mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				if(!reg.test($uname)) {
					$("span.errorMsg").text(`用户名不合法`)
					return false
				}
				if(!reg.test($pwd)) {
					$("span.errorMsg").text(`密码不合法`)
					return false
				}

				// 确认密码
				if($pwd != $repwd) {
					$("span.errorMsg").text(`两次输入密码不相同`)
					return false
				}

				// 邮箱的验证
				if(!mailReg.test($email)) {
					$("span.errorMsg").text(`邮箱不合法`)
					return false
				}

				if(!$code) {
					$("span.errorMsg").text(`验证码不能为空`)
					return false
				}

				// 最后要取消提示框里面的文字
				$(".errorMsg").text("")
			})

			// 用户名输入框 失去焦点事件
			$("#username").on("blur", function() {
				let username = this.value
				$.ajax({
					url: "http://localhost:8080/project/user",
					type: "get",
					data: "action=ajaxExistsUserName&username=" + username,
					dataType: "json",
					success: function (data) {
						if(data.existsUsername) {
							$(".errorMsg").text("用户名已注册");
						} else {
							$(".errorMsg").text("用户名可用");
						}
					}
				})
			})

		</script>
</body>
</html>