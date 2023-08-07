# Get 和 Post 的区别
最直观的区别就是: 

- GET把参数包含在URL中
- POST通过request body传递参数

<br>

**以往的认知是 get 和 post 之前请求是有区别的 比如:**
- GET在浏览器回退(刷新)时是无害的, 而POST会再次提交请求。
- GET产生的URL地址可以被Bookmark(书签), 而POST不可以。
- GET请求会被浏览器主动cache, 而POST不会, 除非手动设置。
- GET请求只能进行url编码, 而POST支持多种编码方式
- GET请求参数会被完整保留在浏览器历史记录里, 而POST中的参数不会被保留。
- GET请求在URL中传送的参数是有长度限制的2048个字符, 而POST么有。 

<br>

**对参数的数据类型:**  
GET只接受ASCII字符, 而POST没有限制

GET比POST更不安全, 因为参数直接暴露在URL上, 所以不能用来传递敏感信息。

GET参数通过URL传递, POST放在Request body中。

<br>

但是实际上 Get 和 Post 本质上是没有区别的, 它们都是http协议中的两种发送请求的方法

http是基于tcp/ip协议的 所以get post的底层也是 tcp/ip协议 也就是说 get post都是tcp链接

get和post能做的事情是一样的 比如我们想给get请求加上request body 给post请求带上url参数 技术上是完全行的通的

在万维网的世界上 tcp就像汽车 我们用tcp来运输数据 它很可靠 从来不会发生丢件少件的现象

但是如果路上跑的全是看起来一模一样的汽车, 那这个世界看起来是一团混乱, 送急件的汽车可能被前面满载货物的汽车拦堵在路上, 整个交通系统一定会瘫痪。

为了避免这种情况发生, 交通规则HTTP诞生了。HTTP给汽车运输设定了好几个服务类别, 有GET, POST, PUT, DELETE等等

<br>

**HTTP规定:** 
当执行GET请求的时候, 要给汽车贴上GET的标签(设置method为GET), 而且要求把传送的数据放在车顶上(url中)以方便记录。

如果是POST请求, 就要在车上贴上POST的标签, 并把货物放在车厢里。

当然, 你也可以在GET的时候往车厢内偷偷藏点货物, 但是这是很不光彩; 也可以在POST的时候在车顶上也放一些数据, 让人觉得傻乎乎的。HTTP只是个行为准则, 而TCP才是GET和POST怎么实现的基本。

但是, 我们只看到HTTP对GET和POST参数的传送渠道(url还是requrest body)提出了要求。"标准答案"里关于参数大小的限制又是从哪来的呢？

在我大万维网世界中, 还有另一个重要的角色: 运输公司。不同的浏览器(发起http请求)和服务器(接受http请求)就是不同的运输公司。虽然理论上, 你可以在车顶上无限的堆货物(url中无限加参数)。

但是运输公司可不傻, 装货和卸货也是有很大成本的, 他们会限制单次运输量来控制风险, 数据量太大对浏览器和服务器都是很大负担。业界不成文的规定是, (大多数)**浏览器通常都会限制url长度在2K个字节**, **而(大多数)服务器最多处理64K大小的url。**

超过的部分, 恕不处理。如果你用GET服务, 在request body偷偷藏了数据, 不同服务器的处理方式也是不同的, 有些服务器会帮你卸货, 读出数据, 有些服务器直接忽略, 所以, 虽然GET可以带request body, 也不能保证一定能被接收到哦。

<br>

### GET和POST还有一个重大区别, 简单的说: 
对于GET方式的请求, 浏览器会把http header和data一并发送出去, 服务器响应200(返回数据); 

而对于POST, 浏览器先发送header, 服务器响应100 continue, 浏览器再发送data, 服务器响应200 ok(返回数据)。

也就是说, **GET只需要汽车跑一趟就把货送到了**

而POST得跑两趟, 第一趟, 先去和服务器打个招呼"嗨, 我等下要送一批货来, 你们打开门迎接我", 然后再回头把货送过去。

因为POST需要两步, 时间上消耗的要多一点, 看起来GET比POST更有效。因此Yahoo团队有推荐用GET替换POST来优化网站性能。但这是一个坑！跳入需谨慎。为什么？

<br>

1. GET与POST都有自己的语义, 不能随便混用。
2. 据研究, 在网络环境好的情况下, 发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下, 两次包的TCP在验证数据包完整性上, 有非常大的优点
3. 并不是所有浏览器都会在POST中发送两次包, Firefox就只发送一次。

<br>

### Get请求怎么携带请求体参数
**http协议是支持get请求可以携带请求体**的 后端也可以接收请求体参数

有些后台服务器不支持 使用 get携带请求体参数 的方式

<br>

**但是浏览器会限制get请求不携带请求体**

也就是说要是想通过 浏览器发送 get请求的时候 携带 body参数 那么需要后台下载相关的依赖

比如java中是使用了 **httpclient** 依赖

<br>

后台使用 axios 发送 get请求的时候 携带body参数是可以接收到的, 后台发送请求是不用通过浏览器的

```js 
// server1
app.get("/test", (req, res) => {
  let data = {
    name: "sam",
    age: 18
  }
  
  axios({
    url: "http://localhost:3001/test",
    method: "get",
    data
  })
})


// server2
app.get("/test", (req, res) => {
  console.log(req.body)
})
```

<br>

## Get 请求时 url 参数长度限制
http中 get请求提交的数据大小长度并没有限制 同时 http规范没有对url长度进行限制

目前说得 get 长度有限制 是特定的浏览器 以及 服务器对它的限制 各种浏览器 和 服务器的最大处理能力如下

<br>

### 浏览器的限制
**IE:**  
IE浏览器(Microsoft Internet Explorer) 对url长度限制是2083(2K+53), 超过这个限制, 则自动截断(若是form提交则提交按钮不起作用)。

<br>

**firefox:**  
firefox(火狐浏览器)的url长度限制为 65 536字符, 但实际上有效的URL最大长度不少于100,000个字符。

<br>

**chrome:**  
chrome(谷歌)的url长度限制超过8182个字符返回本文开头时列出的错误。

<br>

**Safari:**  
Safari的url长度限制至少为 80 000 字符。

<br>

**Opera:**  
Opera 浏览器的url长度限制为190 000 字符。Opera 9 地址栏中输入190 000字符时依然能正常编辑。

<br>

### 服务器
**Apache:**  
Apache能接受url长度限制为8 192 字符

<br>

**IIS:**  
Microsoft Internet Information Server(IIS)能接受url长度限制为16 384个字符。
这个是可以通过修改的(IIS7)configuration/system.webServer/security/requestFiltering/requestLimits@maxQueryStringsetting.

<br>

**Perl HTTP::Daemon:**  
Perl HTTP::Daemon 至少可以接受url长度限制为8000字符。Perl HTTP::Daemon中限制HTTP request headers的总长度不超过16 384字节(不包括post,file uploads等)。但当url超过8000字符时会返回413错误。
这个限制可以被修改, 在Daemon.pm查找16×1024并更改成更大的值。

<br>

**ngnix:**  
可以通过修改配置来改变url请求串的url长度限制。
- client_header_buffer_size 默认值: client_header_buffer_size 1k

- large_client_header_buffers默认值 : large_client_header_buffers 4 4k/8k

<br>


# 为 Cookie 服务和其他首部字段

### 为 Cookie 服务的首部字段
管理服务器与客户端之间状态的 Cookie , 虽然没有被编入标准化 HTTP/1.1 的 RFC2616 中, 但在 Web 网站方面得到广泛的应用。

Cookie 的工作机制是用户识别及状态管理。web 网站为了管理用户的状态会通过 web 游览器, 把一些数据临时写入用户的计算机内。接着当用户访问该 web 网站时, 可通过通信方式取回之前存放的 Cookie 。

调用 Cookie 时, 由于可校验 Cookie 的有效期, 以及发送方的域、路径、协议等信息, 所以正规发布的 Cookie 内的数据不会因来自其他 web 站点和攻击者的攻击而泄露。

在目前使用最广泛的 Cookie 标准却不是 RFC 中定义的任何一个。而是在网景公司指定的标准上进行扩展后的产物。

下面是与 Cookie 有关的首部字段:

<br>

### Set-Cookie
开始状态管理所使用的 Cookie 信息	  **响应首部字段**
```js
Set-Cookie: status-enable; expires=Tue, 05 Jul 2018 02:01:22 GMT; path=/; domain=.example.com;
```
当服务器准备开始管理客户端的状态时, 会事先告知各种信息。下面表格列举了 Set-Cookie 的字段值。

<br>

###  NAME=VALUE
赋予 Cookie 的名称和其值(必须项)

<br>

###  expires=DATE	  
Cookie 的有效期(若不明确指定则默认为游览器关闭前为止)


Cookie 的 expires 属性指定游览器可发送 Cookie 的有效期。

当省略 expires 属性时, 其有效期仅限于维持游览器会话(Session)时间段内。这通常限于游览器应用程序被关闭之前。

另外, 一旦 Cookie 从服务器端发送至客户端, 服务器端就不存在可以显示删除 Cookie 的方法。但可以通过覆盖已过期的 Cookie , 实现对客户端 Cookie 的实质性删除操作。

<br>

###  path=PATH	
将服务器上的文件目录作为 Cookie 的适用对象(若不指定则默认文档所在的文件目录)

Cookie 的 path 属性可用于限制指定 Cookie 的发送范围的文件目录。不过另有办法避开这项限制, 看来对其作为安全机制的效果不能报有期待。

<br>

###  domain=域名	
作为 Cookie 适用对象的域名(若不指定则默认为创建 Cookie 的服务器域名)

通过 Cookie 的 domain 属性指定的域名可做到与结尾匹配一致。比如, 当指定 example.com 后, 除 example.com 以外, www.example.com 或 www2.example.com 等都可以发送 Cookie 。

因此, 除了针对具体指定的多个域发送 Cookie 之外, 不指定 domain 属性显得更安全。

<br>

###  Secure	
仅在 HTTPS 安全通信时才会发送 Cookie

Cookie 的 secure 属性用于限制 web 页面仅在 HTTPS 安全连接时, 才可以发送 Cookie 。

发送 Cookie 时, 指定 secure 属性的方法如下所示。


```js
Set-Cokkie: name=VALUE; secure
```

``` 
以上例子仅当在 https://www........(HTTPS)安全连接的情况下才会进行 Cookie 的回收, 也就是说, 即使域名相同, http://www......(HTTP)也不会发生 Cookie 的回收行为。
当省略 secure 属性时, 不论 HTTP 还是 HTTPS , 都会对 Cookie 进行回收。
```

<br>

###  HttpOnly	
加以限制, 使 Cookie 不能被 JavaScript 脚本访问


Cookie 的 HttpOnly 属性是 Cookie 的扩展功能, 它使 JavaScript 脚本无法获得 Cookie 。其主要目的为防止跨站脚本攻击(Cross-sitescripting, XSS)对 Cookie 的信息窃取。

发送指定 HttpOnly 属性的 Cookie 的方法如下所示。


```js
Set-Cookie: name=value; HttpOnly
```

通过上述设置, 通常从 web 页面内还可以对 Cookie 进行读取操作。但使用 JavaScript 的 document.cookie 就无法读取附加 HttpOnly 属性后的 Cookie 的内容了。因此, 也就无法在 XSS 中利用 JavaScript 劫持 Cookie 了。

虽然是独立的扩展功能, 但 Internet Explorer 6 SP1 以上版本等当下的主流游览器都已经支持该扩展了。另外顺带一提, 该扩展并非是为了防止 XSS 而开发的。

<br><br>

### Cookie
服务器接收到的 Cookie 信息    *请求首部字段*
```js
Cookie: status=enable
```

首部字段 Cookie 会告知服务器, 当客户端想获得 HTTP 状态管理支持时, 就会在请求中包含从服务器接受到的 Cookie 。接受到多个 Cookie 时, 同样可以以多个 Cookie 形式发送。

<br><br>

### 其他首部字段
HTTP 首部字段是可以自行扩展的。所以在 Web 服务器和游览器的应用上, 会出现各种非标准的首部字段。

下面是一些比较常用的首部字段

<br>

### X-Frame-Options
```js
X-Frame-Options: DENY
```

首部字段 X-Frame-Options 属于 HTTP 响应首部, 用于控制网站内容在其他 web 网站的 Frame 标签内显示问题。其主要目的是为了防止点击劫持(clickjacking)攻击。

首部字段 X-Frame-Options 有以下两个可指定的字段值。

<br>

**DENY**  
拒绝

<br>

**SAMEORIGIN**  
仅同源域名下的页面(Top-level-browsing-context)匹配时许可。

支持该首部字段的游览器有: 

Internet Explorer 8、Firefox 3.6.9+、Chrome 4.1.249.1042+、Safari 4+ 和 Opera 10.50+ 等。
现在主流的游览器都已经支持。

能在所有的 web 服务端预先设定好 X-Frame-Options 字段值是最理想的状态。 当然版本不支持的以及其不放心时可以参考这篇文章

<br><br>

### X-XSS-Protection
```js
X-XSS-Protection: 1
```

首部字段 X-XSS-Protection 属于 HTTP 响应首部, 它是针对跨站脚本攻击(XSS)的一种对策, 用于控制游览器 XSS 防护机制的开关。
首部字段 X-XSS-Protection 可指定的字段值如下: 

- 0: 将 XSS 过滤设置成无效状态
- 1: 将 XSS 过滤设置成有效状态

<br><br>

### DNT
```js
DNT: 1
```

首部字段 DNT 属于HTTP 请求首部, 其中 DNT 是 Do Not Track 的简称, 意为拒绝个人信息被手机, 是表示拒绝被精准广告追踪的一种方法。
首部字段 DNT 可指定的字段值如下。

- 0: 同意被追踪
- 1: 拒绝被追踪

由于首部字段 DNT 的功能具备有效性, 所以 web 服务器需要对 DNT 做出对应的支持。

<br><br>

### P3P
```js
P3P: CP="CAO DSP LAW CURa ADMa DEVa TAIa PSAa PSDa IVAa IVDa OUR BUS IND UNI COM NAV INT"
```

首部字段 P3P 属于HTTP响应首部, 通过利用P3P

(The Platform for Privacy Preferences, 在线隐私偏好平台)

技术, 可以让Web网站上的个人隐私变成种仅供程序可理解的形式, 以达到保护用户隐私的
目的。

要进行 P3P的设定, 需按以下步骤进行。

- 步骤一: 创建 P3P 隐私
- 步骤二: 创建 P3P 隐私对照文件后, 保存命名在 /w3c/p3p.xml
- 步骤三: 从 P3P 隐私中新建 Compact policies 后, 输出到 HTTP 响应中

https://www.w3.org/TR/P3P/