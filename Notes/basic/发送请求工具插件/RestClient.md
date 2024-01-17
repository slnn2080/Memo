# RestClient
它是vscode中的一个插件 它可以让我们使用非常原始的http请求格式发送请求

<br>

### 使用方式
1. 新建 ``test.http`` 文件, 我们可以在这里编写**最原始的HTTP**请求格式
```s
# 文件中书写如下文本

GET / HTTP/1.1
Host: duyiedu.com
```

2. 点击 ``test.http`` 文件中提供的按钮 [Send Request]

3. 观察自动弹出的新窗口中的 Response

<br>

### 示例:
接口文档如下 我们使用该插件发送一个http请求
```s
请求路径: /upload/single

请求方式: post

消息格式: multipart/form-data

字段名称: avatar

允许的后缀名: ['.jpg', '.jpeg', '.png']

最大尺寸: 1M

响应格式: JSON

响应结果示例:
# 成功
{
  "data": "文件的访问地址"
}

# 失败
{
  "data": "文件的访问地址"
}
```

<br>

**文件中书写:**  
```s
POST /upload/single HTTP/1.1
Host: test.com:9527
# POST请求一定要携带该请求头, 它表示我们请求体中是什么格式, 上传文件一般为 multipart/form-data; boundary=aaa为分隔符
Content-Type: multipart/form-data; boundary=aaa

# 请求体的书写格式为 -- + 分隔符 作为一个字段的开始, 当都结束后以 -- + 分隔符 + -- 的格式作为结束
--aaa
第一个字段 账号
--aaa
第二个字段 密码
--aaa
第三个字段 通信地址
--aaa-- # 请求体结束

# 正题开始 filename: 就是文件在本地的名字供服务器参考, name: 字段名
--aaa
# 下面是固定格式
Content-Disposition: form-data; name="avatar"; filename="test.jpg"
# 由于我们上传的是文件 所以这里要使用 Content-Type 指明文件的类型是啥
Content-Type: image/jpeg

这里写图片的二进制数据
# (如果我们使用该插件来进行上传 我们可以利用如下的方式), 插件会根据文件的路径 将该文件的数据读取出来放到这里
< ./test.jpg
--aaa--
```