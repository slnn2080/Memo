# 同站 & 跨站:
只要顶级域名 和 二级域名一样 就是同站 反之就是跨站
```s
https://www.github.com

顶级域名: com
二级域名: github
```

<br>

## 跨站请求:
```s
// 这就是跨站请求
a.com -> b.com
```

<br>

## 同站请求:
```s
// 这就是跨站请求 因为顶级和二级域名一样
a.a.com -> b.a.com
```

<br><br><br>

# 跨域:
跨域 是指浏览器不能执行其他网站的脚本, 它是由浏览器的同源策略造成的, 是浏览器对js实施的安全限制

<br><br>

## 同源 & 跨域:
同源: 协议 端口 域名 均相同  
跨域: 协议 端口 域名 各不同

<br><br>

## 跨域的特点:
同源策略限制了以下的行为:

### 1. Cookie无法读取
cookie是服务器给你设置的 下一次请求的时候会自动带到服务器去 也就是说百度设置的cookie是不会带到淘宝上去的 百度无法读取淘宝设置的cookie 淘宝也无法获取百度设置的cookie

<br>

### 2. DOM 和 JS 对象无法获取
无法控制其他网站的额dom 和 js对象 比如我们访问百度的网站 我想改变搜索框的位置颜色等 在我们自己的电脑上是操作不了页面的

要操作得在百度的服务器上处理这件事情 因为是其他的地址(ip地址) 并不是我们本地的地址了

<br>

### 3. Ajax请求发送不出去
没办法向其它的服务器发送ajax 比如我们想获取不同源的数据 我们写一个ajax请求 是请求不到的

<br>

### Ajax请求发送不出去的原因:
比如 3000端口 向 5000端口 发送请求 因为不是同源 会报跨域的错误信息
```
No 'Access_Contorl_Allow_origin' header is present on the requested resoure
```

因为 5000端口是一个域, 3000端口是另一个域 5000 处理不了 3000 中的ajax代码 因为不同源

<br><br>

## 跨域的解决方案:
1. jsonp
2. 前端proxy
3. 后台设置响应头
4. cors包

<br>

我们这里主要说下 后台设置响应头 我们能设置的响应头有

**<font color="#C2185B">Access-Control-Allow-Origin</font>**  
指示请求的资源能共享给哪些域。

<br>

**<font color="#C2185B">Access-Control-Allow-Credentials</font>**  
指示当请求的凭证标记为 true 时, 是否响应该请求。

<br>

**<font color="#C2185B">Access-Control-Allow-Headers</font>**  
用在对预请求的响应中, 指示实际的请求中可以使用哪些 HTTP 头。

<br>

**<font color="#C2185B">Access-Control-Allow-Methods</font>**  
指定对预请求的响应中, 哪些 HTTP 方法允许访问请求的资源。

<br>

**<font color="#C2185B">Access-Control-Expose-Headers</font>**  
指示哪些 HTTP 头的名称能在响应中列出。

<br>

**<font color="#C2185B">Access-Control-Max-Age</font>**  
指示预请求的结果能被缓存多久。

<br>

**<font color="#C2185B">Access-Control-Request-Headers</font>**  
用于发起一个预请求, 告知服务器正式请求会使用那些 HTTP 头。

<br>

**<font color="#C2185B">Access-Control-Request-Method</font>**  
用于发起一个预请求, 告知服务器正式请求会使用哪一种 HTTP 请求方法。

<br>

**<font color="#C2185B">Origin</font>**  
指示获取资源的请求是从什么域发起的。

<br>

### Nodejs中处理方式:
```js
// 请求的源 
res.setHeader('Access-Control-Allow-Origin', '*');
// 自定义请求头的处理 *表示 所有类型的头信息我都可以接收
res.setHeader('Access-Control-Allow-Headers', '*');
// 还有请求方法的处理
res.setHeader('Access-Control-Allow-Method', '*')
```

<br><br><br>

# cookie

## 什么是Cookie
Cookie是服务器通知客户端保存键值对的一种技术, Cookie是服务器程序发送到Web浏览器的少量信息 这些信息由浏览器保存 然后发送回服务器

<br><br>

## cookie的特点:
1. Cookie的值可以唯一标识客户端  
2. 客户端有了Cookie后 每次请求都发送给服务器
3. 每个Cookie的大小不能超过4kb
4. cookie由服务器生成, *保存在浏览器端的一小段文本信息*
5. cookie是以键和值的形式进行存储的(服务器在响应浏览器的请求时可以设置cookie)
6. 浏览器在访问一个网站的服务器时, 会自动在请求头中把和本网站相关的所有cookie发送给服务器
7. cookie是基于域名安全的  
访问百度只会带着百度的cookie信息发送请求 访问淘宝只会带着淘宝的cookie信息发送请求
8. cookie有过期时间, *默认关闭浏览器之后过期*

<br>

**设置cookie和获取cookie都是在服务端做的**

服务器响应回的信息中, 设置好的cookie被放在了响应报文中的响应头里面 响应头是以键值对的方式存在, cookie也是键值对的形式

然后浏览器会自动把设置的cookie信息保存在浏览器中 再之后向这个服务器发送请求的时候 会自动携带着这个网站的相关cookie发送请求 在请求头中

这样发送给服务器后 服务器会取到cookie看到之前设置的键值对, 这次请求的来源就是之前的浏览器 这样就能做到状态保持

<br><br>

## cookie免用户名登录逻辑:

### 思路:
当客户端发起登录请求成功后, 服务端会对参数进行验证 当:  
- 验证通过: 允许登录 并将用户名保存到cookie中发送给客户端
- 验证失败: 不允许登录

登录成功后 我们间用户名保存到 cookie 中响应回客户端 这样响应头中就会有 这样浏览器就有了用户名的cookie信息
```
set-cookie: usernanme=用户名
```

客户端第二次访问服务器的时候(我们登录了一定的时间后就退出这个网站了第二天我们再来登录)

我们还是要先向服务器请求登录页面 这时候因为浏览器已经有了cookie信息 会把cookie信息也发送给服务器

服务器程序 就可以读取cookie 把带有用户名回显的login.jsp响应回去

<br><br>

## js 获取 cookie
```js
document.cookie

document.cookie.split(";").reduce((prev, curr) => {
  const [key, value] = curr.split("=")
  prev[key] = value
  return prev
}, {})
```

<br><br>

## cookie属性:
我们可以打开控制台 查看cookie存储

<br>

### cookie的属性的使用方式:
都是添加在 cookie 字符串里面的 比如
```js
// 添加了 cookie 的 domain 属性
document.cookie = ";domain=a.com"
```

<br>

### cookie属性的详解:

### domain: 
cookie能够作用的主机地址, domain列中不携带协议和端口 这里端口和协议不同 并不会影响cookie

cookie的部分属性只有在https下才能够有效

比如我们在 https://a.com 中我们写了4个cookie

|key|value|domain|
|:--|:--|:--|
|a|1|a.com|
|b|2|a.com|
|c|20221109|a.com|
|d|3|a.com|

然后我们打开 http://a.com 这4个cookie依然存在 当我们把端口改成 http://a.com:1234 这4个cookie也依然存在

这就是cookie的特性不区分协议和端口

<br>

domain列中 有的是 a.com 有的 .a.com 有.的表示这个cookie可以作用于当前域及其子域

<br>

**注意:**  
如果新增cookie的时候没有带上 domain 那么这个cookie只能用于当前域 a.com

如果我们设置了 domain = "a.com", 这时cookie的作用域是 .a.com
```js
document.cookie = ";domain=a.com"
```

<br>

**注意2:**  
在子域里面可以给父域设置cookie 比如我们身处的网站是 
sub2.sub1.a.com 在这个网址中我们设置了 domian为.a.com的cookie
```js
document.cookie = ";domain=.a.com"
```

那么我们可以在 网址为 a.com 中获取我们的cookie 也可以在 b.a.com 中获取cookie

<br>

但是我们不能在当前域的子域 或者 跨域设置cookie  
比如我们身处 a.com 网址 我们在这个网址下 设置 子域 或者 跨站的cookie是不行的
```js
document.cookie = ";domain=b.a.com"

document.cookie = ";domain=b.com"
```

<br>

### path: 
Cookie的path属性可以有效的过滤哪些Cookie可以发送给浏览器 哪些不发

比如我们身处的网站是 a.com/a 我们在这个地址下设置了一个cookie
```js
// 我们设置了 patha=pa 这个cookie 同时指定了 /a下面的子目录才能看到 设置的cookie
document.cookie = "patha=pa;path=/a"
```
这个cookie的path是 /a

那在 a.com/a/b 这个页面 就会有 patha 这个cookie 而在 a.com/b 这个页面是没有 patha 这个cookie的

<br>

**举例:**
现在有两个cookie 并设置了path属性格式  
CookieA   path=/工程路径  
CookieB   path=/工程路径/abc  

如果请求地址如下:  
http://ip:port/工程路径/a.html

那么CookieA会发送 还是 CookieB会发送?  

答案:   
CookieA 会发送  
因为path设置的路径中的工程路径和请求地址 匹配上了

CookieB 不会发送  
CookieB的path属性为 /工程路径/后面还要abc  
而我们的请求地址中 /工程路径 后面没有/abc 没匹配上就没发送


如果请求地址如下:  
http://ip:port/工程路径/abc/a.html

上面的这个情况 cookieA 和 cookieB 哪个会发送?  
CookieA 会发送  
CookieB 会发送

<br>

### expires: 在指定时间后失效
### max-age: 多少秒之后失效
和cookie有效期相关的属性, 两个属性同时存在的时候 max-age的优先级会更高一些

```js
// 设置早晨1:10过期的expires
document.cookie = `expiresKey=v;expires=${new Date("2022-11-10 01:10:00").toUTCString()}`

// 在设置 max-age
document.cookie = `maxageKey=v;max-age=540`
```

<br>

**max-age:**  
它对应的值可以设置为 负值 或者是 正值

max-age=-1:  
删除cookie 0 也是删除

max-age=60:  
60秒之后删除cookie

<br>

**expires:**  
它的值 设置成 负数 也是删除

<br>

如果一条cookie既不包含 max-age 也不包含 expires 那么它就是一个 会话cookie 当我们关闭浏览器的时候这个cookie就会被删除

<br>

### httponly: 
它是和cookie安全性紧密相关的一个属性 如果httponly这一列打上勾的cookie 用js是无法操作的

带有httponly的cooie只能由服务端通过响应标头中的set-cookie种在浏览器上

当我们在浏览器中设置了cookie属性包含 httponly 的时候 这个cookie会被浏览器直接忽略掉  
```js
document.cookie="max-age=600;httponly"
```

通过httponly这个属性就可以有效避免用户的关键身份信息被盗用

<br>

### secure: 
它会告诉浏览器这个cookie只能用https协议来传输 如果服务端的响应中包含带有secure属性的cookie 但是当前页面的协议是http的 那么浏览器就会忽略这个cookie

我们在https的页面中 也可以自己创建带secure属性的cookie
```js
document.cookie="max-age=600;secure"
```

<br>

### samesite: 
该属性只有在跨站请求的时候才会起作用

它可以限制跨站请求时cookie的发送 淘宝曾经因为这个samesite属性的默认值发生变更 导致了他们的不少应用都出现了问题 

samesite的值:
- none: 对cookie的约束最小  
不论是否跨站都发送cookie 它的约束性最弱 但是只有这个cookie是https协议进行传输的时候 浏览器才认为它是有效的 **另外这个cookie必须要添加 secure 属性**

- lax: 默认值  
它只会运行在部分跨站请求中携带cookie  
samesite属性为lax的cookie 在a标签或者是预加载或者是get表单中发送cookie

其它的像post或者是iframe或者ajax img标签都不会发送

- strict: 跨站不带cookie  

<br>

### sameparty: 
略

<br><br>

# Session
我们会往session中保存数据 那能保存多大的数据?  
session是占用的服务器内存，所以内存越大，能存的值就越大，原则上讲无上限，一般用于存储对安全要求较高的重要数据

session也可以保存在一个专门的数据表中

<br><br>

## 什么是session会话?
Session是会话 它是用来维护一个客户端和服务器之间关联的技术(一个session就维护一个客户端和服务器的关联) 每个客户端都有自己session会话

session会话中 我们经常用来保存用户登录之后的信息

<br>

这里区分下: cookie是保存在客户端 session是保存在服务器端

<br>

## 浏览器和session之间怎么关联?
老师以前说 打开浏览器 关闭浏览器后 session就没了  
- 但是通过上面的学习我们知道 session是有超时时长的 那如果我们在给定的超时时长内我们关闭了浏览器 session为什么就没了 session不还没有超时么？

### **客户端 -> 服务器**    
为了实验 我们上来先将 客户端的cookie全部清掉 在没有cookie的情况下 我们往服务器去发送请求

服务器端调用的api是 req.getSession() 这个api第一次的时候 会创建 会话对象 该被创建的session对象在服务器的内存中 服务器的内存中 有很多的session 我们创建的session也会放在服务器的内容中
```
  session1
  session2
  session3
  session4
  session5
  ...
  session n
```

<br>

### **服务器 -> 客户端**  
然后服务器会给客户端响应(前台页面点击按钮 发送创建session的请求 服务器肯定要响应)

这时候我们观察下响应头:  
Set-Cookie: JSESSIONID=91A25AFFC342A86B0A631D42026DD0CE

我们发现服务器响应到客户端一个cookie  
cookie的key: JSESSIONID
cookie的val: 就是我们刚才服务器里创建的session的id值

也就是说:  
服务器每次创建session会话的时候 都会创建一个cookie对象 这个cookie对象的key永远是*JSESSIONID* 值是新创建出来的session的id值

也就是说:
服务器通过响应把新创建出来的session的id值返回给客户端

<br>

**浏览器:**
浏览器看到set-cookie响应头后 就会解析收到的数据 马上创建一个cookie对象 上面也说了 当客户端有了cookie之后 每次发请求都会把cookie发送给服务器 浏览器后面有了cookie之后 每次请求都会把session的id以cookie的形式发送服务器

<br>

**服务器:**
服务器来是会调用 req.getSession()  
这个api之后的每次调用都是获取session 拿到session id的值去服务器内存中找对应的session 服务器通过cookie中的id值找到自己之前创建好的session对象并返回

以上就是服务器怎么获取之前创建好的session

**session技术底层其实是基于cookie技术来实现的**

<br><br><br>

# 状态保持技术 cookie 和 session
因为http是一种无状态协议, 浏览器请求服务器是无状态的

```
浏览器      第一次向服务器发起请求      服务器
浏览器      第二次向服务器发起请求      服务器
```

浏览器第二次向服务器发送的请求 完全不知道第一次发送请求 这个就是无状态

有些时候我希望我的状态是被保持的, 比如我在首页登录过了, 去子页的时候我希望我的登录状态是被保持的, 而不是让我重新再登录一次 进到子页面后能保持登录的状态 有一部分是cookie的功劳 

<br>

## 无状态:
指一次用户请求时, 浏览器, 服务器无法知道之前这个用户做过什么, 每次请求都是一次新的请求

<br>

### 无状态的原因:
浏览器与服务器是使用socket套接字进行通信的(http底层是基于tcp的而tcp传输时使用的是socket技术), 服务器将请求结果返回给浏览器之后, 会关闭当前的socket, 而且服务器也会在处理页面完毕之后销毁页面对象

有时需要保持下来用户浏览的状态, 比如用户是否登录过, 浏览过哪些商品等

<br>

### 状态保持实现方式:
1. 在客户端存储信息使用cookie
2. 在服务器存储信息使用session

<br>

### 无状态协议:
1. 协议对于事物处理没有记忆能力
2. 对同一个url请求没有上下文关系
3. 每次的请求都是独立的, 它的执行情况和结果与前面的请求和之后的请求是无直接关系的, 它不会受前面的请求应答情况直接影响, 也不会直接影响后面的请求应答情况
4. 服务器中没有保存客户端的状态, 客户端必须每次带上自己的状态去请求服务器
5. *人生若只如初见*

<br><br><br>

# session:
session是依赖于cookie的
**session的信息真正是保存在服务端的**, 它会在服务器中开辟一个空间用来保存session的数据, 这个空间会用 标识 来标记(跟对象和地址值似的)

在这个空间里, 使用 键值对 的形式 存放着session数据(name=sam)

比如上面使用 cookie 的方式的时候, 键值在浏览器的请求头和响应头中看的一清二楚 name=sam 也能侧方面反应出 用户的信息放在cookie中不安全, 不太好

上面说了 为了标记服务器开启的空间存储的session数据, 对这个空间使用了 标识

这个标识会保存在cookie当中, 随着cookie响应回浏览器端, 也会随着cookie向服务端发起请求 也就是说将来保存在浏览器中的并不是session的数据 而是数据的标识

当第二次发送请求的时候, 浏览器会带着网站的相关cookie信息, 这个cookie信息里面有session数据的标识, 服务器再拿着这个标识去找对应的数据

服务器 利用了 浏览器的cookie 将标识带了过去 所以session是依赖于cookie的
session是在服务端设置, 服务端保存

<br>

## session的特点:
1. session数据保存在服务器
2. session是以键值对的形式进行存储
3. session依赖于cookie, 每个session信息赌赢的客户端的标识保存在cookie中
4. 不同浏览器设置session时会开辟不同的空间用以保存session的数据 空间之间是独立的, 也就是说同时设置name age属性名是没问题的

<br>

## session 认证流程：
1. 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session
2. 请求返回时将此 Session 的唯一标识 SessionID 返回给浏览器
3. 浏览器接收到服务器返回的 SessionID 后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名
4. 当用户第二次访问服务器的时候，请求会自动把此域名下的 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。

<br>

## Nodejs案例: 登录成功后的状态保持:
登录成功后 设置一个session 然后跳转到首页 在请求首页的时候 先获取是否有session 如果没有应该怎么样

```js 
if(req.method === 'POST') {
    // 获取用户填写的用户名和密码
    let {username, password} = req.body;

    if(username === 'sam' && password === '123456') {

        // 状态保持, 在session中保存登录用户名代表用户登录
        req.session['username'] = username

        // 跳转的别的页面 这里不用render()渲染 而是重定向到别的接口, 别的接口有对应的处理逻辑
        res.redirect('/index')
    } else {
        console.log('密码错误')
    }
}

app.all('/index', (req,res) => {
    // 看看能不能获取到这个username 如果嫩获取的到 就说明刚才输入对过用户名和密码, 就说明登录过
    let username = req.session['username'];

    // 获取不到表示没有登录 要跳转到首页
    if(!username) {
        res.redirect('/');
    }
})
```

<br>

### Nodejs中设置httpOnly:
```js
// `index.html` 加载时会请求login接口
// 设置`cookie
app.get("/login", (req, res) => {

// 这里 httpOnly
res.cookie("user", "jay", { maxAge: 2000000, httpOnly: true });

res.json({ code: 0, message: "登录成功" });
});

// 此接口是检测`cookie`是否设置成功, 如果设置成功的话, 浏览器会自动携带上`cookie`
app.get("/user", (req, res) => {
// req.headers.cookie: user=jay
const user = req.headers.cookie.split("=")[1];
res.json({ code: 0, user });
});

```

<br><br><br>

# CSRF跨站请求伪造的流程图:
csrf指攻击者盗用了你的身份, 以你的名义发送恶意请求, 包括 以你的名义发送邮件, 发消息, 盗取你的账号, 甚至于购买商品, 虚拟货币转账 造成的问题(个人隐私泄露以及财产安全)

用户C在登录webA之后, 没有退出的情况下, 访问了第三方网站, 第三方网站可能会以用户C的身份去向WebA发送请求, webB(第三方网站)伪造成用户C的身份, 使用了webA的功能(可能会有安全性的问题, 所以webA需要做防护)

在说这个之前, 我们先说下 用户C 向webA进行转账 之间都是什么样的流程
```js 
webA: xxx.xxx.xxx.xxx:8000

WebA 登录页面(前端页面内容)
用户名: name='username'
密码:   name='password'
登录:   submit

WebA 转账页面
账户: 转账到哪里
金额: 转多少钱
```

<br>

**WebA 服务端 处理:**  
1. '/'  返回一个登录页面

2. 用户在登录页面提交表单内容后 会到服务端的post接口里 进入如下的逻辑
```js
// 1. 获取请求参数(用户名和密码)
let {username, password} = req.body;

// 2. 接下来根据用户名和密码进行判断 如果都正确的话 先是给用户C的浏览器设置了session做了状态保持, 保存了用户名, 代表用户登录 然后跳转到转账页面
req.session['username'] = username;
res.redirect('/transfer')
```

3. /transfer 接口的逻辑
```js
// 1. 先看看能不能获取到上面这是的session 如果获取到就说明刚才成功登陆过, 因为有session我们可以直接输入转账页面的地址 不用再经历用户名和密码的输入
let username = req.session['username'];

// 如果获取不到说明没有登录, 要重定向到 '/'接口 让他登录
if(!username) {
  res.redirect('/')
}

if(req.method == 'GET') { 
  // 到这里说明用户名 密码都对 渲染个转账页面
  res.render('temp_trnasfer');

  // 如果用户转账页面点击提交会到这个接口
} else if(req.method == 'POST') {

  // 获取转账到哪里, 转多少钱 (前端post提交的参数)
  let {to_account, money} = req.body;

  // 后面处理转账 模拟转账成功
  console.log(to_account, money)
  console.log('假装执行转账操作, 将当前登录用户的钱转到到指定账户')
}
```

<br>

上面是用户C 访问 webA 然后进行了转账操作, 后端得到用户C前端传递的post请求参数(转到哪, 转多少, cookie) 然后成功的进行了转账

这时如果 用户C 访问了 webB(第三方网站) 又发生了什么事情  
webA : 8000端口  
webB : 4000端口  
用户C 访问 webA网站, webB是作为第三方网站

```js 
WebB页面:
后端就渲染了一个页面

页面内容
我是网站B
按钮: 点击领取优惠券

webB代码
点击 按钮 领取优惠券后 跳转到了 webA 8000端口的 /transfer 里面去了
from method='post' action='http://localhost:8000/transfer'

// 下面两行表单隐藏, 隐藏设置了转账账户 和 转账指定金额
input type='hidden' name='to_account' value='999999'
input type='hidden' name='money' value='20000'

// 将表单提交按钮 伪装成了点击领取优惠券 按钮
input type='submit' value='点击领取优惠券'
```

说明点击领取按钮后 就会把 转账账户 和 指定金额 发送到 webA的转账接口里面 利用了webA的 /transfer接口的功能 伪装成了用户C 用户C点击后 钱就到了webB的开发者手里

因为点击 领取优惠券的操作, 点击这个操作是发生在用户C的浏览器上 所以会带着用户C的cookie

<br>

上面的 用户C --- webA --- webB 之间是什么样的场景呢?

用户C用网站正常的访问WebA(101.200.170.173) 文字描述下  
用户C 和 WebA之间 做了什么?

用户C 登录页面中 POST 提交进行登录 成功后会跳转到转账界面  
(带着用户名和密码的参数发送到服务器)
↓
服务器进行登录处理  
处理相应的逻辑, 并设置session, 来标记用户身份  
(用户C的身份表示保存在cookie中)
↓
用户C在点击确认转账按钮, 进行post提交 到 /transfer接口 进行转账  
(用户C会带着 目标账户(转到哪里) 和 money(转多少钱)参数 还有 cookie 发送到服务器, cookie里存的是用户C的身份标识)
↓
服务器端 转账的接口做了什么事情  
校验了用户是否登录 然后进行了转账处理 根据cookie能判断用户登录了 所以做了转账处理
 
然后webB做了什么  
它写了一个表单 指定了转账账户和转账金额 如果点击也会提交到 webA的转账处理接口里面

所以就是webB伪装用户C 向webA的转账界面发起了请求

<br>

总结下就是这样, 当用户C登录过webA后 就会被webA进行了session的状态保持, 然后用户C如果再登录webB(领取优惠券), 点击webB的按钮看似是领取优惠券其实是, webB伪装成用户C 向webA发起了转账请求

那webA在处理转账的时候需要什么 cookie(如果有就可以直接登录转账界面进行操作), 转账金额 和 转账账户(webB暗自做了)

上面所讲的就是 CSRF 跨站请求伪造
接下来我们会讲 怎么解决这个问题, 并对网站A进行优化, 在转账之间除了看session之外还需要有另外一些的校验

<br><br>

## CSRF跨域请求伪造 -- 防护流程图:
1. 服务器在用户登录后颁发 *csrf_token*
2. 用户在确认转账的时候 在请求中设置x-csrftoken, 值为服务器颁发的
3. 服务器端在转账之前要验证, 取出cookie中的token和请求头中的token值进行对比 如果不一致就return

<br>

### **要点:**
前端发起请求的时候 要设置头信息,  后台拿到请求头中的token 和 cookie 中的token进行对比

<br>

### **详解:**
1. 在用户C 成功登陆webA后 进入 /transfer的时候 webA颁发一个csrf_token(这个值是随机自动生成的48位字符串) 存在cookie中 给用户C

2. 用户点击确认转账的时候, 再在请求头中设置一个属性 x-csrftoken: csrf_token
```js 
// 在我们发送请求的时候要额外设置请求头
x-csrftoken: csrf_token(这个值是从cookie中获取的)
```

3. 在转账之前需要验证, 取出cookie中token和请求头中的token值进行对比 如果不一样就是不合法用户, 就直接return不能执行转账功能  
也就是webB在向webA请求的时候 有转账账户 转账金额 cookie(cookie里面也有token), 
但是请求头里没有(因为不是ajax 没有办法设置请求头), 它这样提交过去因为请求头中没有token 会被webA的/transfer接口return掉


如果它也想设置请求头, 那必须要用ajax提交(它现在是简单的form表单提交) 那就是, 但是对于webB来讲的话 就是跨域了

所以现在第三方网站上是没有办法设置请求头的 因为浏览器有同源策略 用户C和webA交互时, webA设置的cookie webB是没办法拿到用户C设置的cookie的

如果webB不使用form表单默认的方式提交, 使用ajax提交不就可以设置请求头了么 也不行因为有 cors 当 options 请求打到后台的时候 如果后台没有开放 origin 的话 会拒绝该次请求

form表单属于浏览器的默认行为 不需要处理js代码

<br>

### **上面是流程 但是代码上怎么体现呢?**
1. 服务端给浏览器设置 cookie(csrf_token)
2. 浏览器端发送请求的时候设置请求头
3. 服务端提取cookie中的csrf和请求头中的csrf进行全等判断

<br><br>

## CSRF防护:

### **防护思路:**
1. 请求转账页面的时候, 服务器响应转账页面, *在cookie中设置*一个csrf_token值(*随机48位字符串*)

2. 客户端在进行post请求的时候, *在请求头中带上自定义的属性X-CSRFToken 值为cookie中的csrf_token值*(要注意的是, 此时的post请求, 浏览器还会自发带着cookie中的csrf_token到服务器)

3. 服务器在接收到post请求的时候, *首先验证响应头中的x-csrftoken值, 和cookie中的csrf_token是不是一致*, 如果不一致, 需要return 直接结束处理, 不进行后续的工作

<br><br>

# Token
Token分为两种:
- 登录token
- 刷新token


企业级别的登录的话, 都是使用 Json Web Token 这种方式
假如公司只是做网站的话 可以使用我们前面用的session登录可以 但是做好csrf防护就可以

cookie 和 session 是浏览器中cookie的行为 为自动提交嘛, 之前我们说的csrf防护都是针对浏览器的行为, 利用了浏览器的行为

**但是app程序的登录怎么办? 安卓 ios应用里面都没有所谓的cookie 和 session(这里不说手机端里的浏览器)**

```js 
app程序   --- 数据 --- >    API

              JWT
          +-----------+
          + user data +
          +-----------+

JWT相当于在用户数据的外层套了一个壳子
```

<br>

app程序和API(服务器)相互交换数据的时候, 利用JWT在用户数据的外层套了一个壳子, 也可以理解为加了一层密 为了安全的考虑 不会把用户的数据裸放进行传输, 比如截取数据之后 看里面的数据或串改里面的数据

<br>

### token的作用:
Token值是用来包裹用户数据的

<br>

### **Token长什么样子 标准token值**
token值实际上有三个部分 以 . 来分割

```js 
标准的Token值也就是 JWT 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ6aGFuZ3NhbiIsImlhdCI6MTU4NjEyNTUwMywiZXhwIjoxNTg2MTMyNzAzfQ.Uwx-EzPq2c9oDJxfs0nCrWLAcTS89HxPBqTUbx91gwY

以 . 来结尾

// 头部 header
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.

// payload 载荷
eyJpZCI6MSwidXNlcm5hbWUiOiJ6aGFuZ3NhbiIsImlhdCI6MTU4NjEyNTUwMywiZXhwIjoxNTg2MTMyNzAzfQ.

// signature 签名
Uwx-EzPq2c9oDJxfs0nCrWLAcTS89HxPBqTUbx91gwY

// 上面都是加密后的结果
```

<br>

### **header**
是一个base64 的对象 里面都是 base64 编码后的结果
里面包含了以下的东西
```js 
{
  签名的加密类型: xxx
  typ: 'JWT'
}
```

<br>

### **载荷**
主要的信息在 载荷当中存储着 base64 的用户数据

<br>

### **签名**
里面是加密的结果
主要用来做验证 token 的, 也叫作验证签名 叫做 验签, 在服务端完成
签名部分里面的 盐 只有服务器知道, 所以别人伪造不了
```js 
base64(hear) + '.' + base64(payload) + '.' + 盐(这个盐只有服务器知道)
```

<br>

### **验签的原理**
怎么确保 浏览器请求是携带的token值是有效的 不是伪造的, 就需要验签

1. 首先它会取到 token 值(特别长的标准 token 带 头 载荷 签名)

2. 对header部分 进行base64 的编码 然后对 payload的部分也进行一个 base64的编码 用.拼接 最后加上盐

3. 上面的拼接好后, 进行一下加密处理 加密处理的结果 和 第三步部分(签名)进行对比 如果一致说明token有效

<br>

### **我们看看JWT请求的流程**
1. 生成 token
2. 验证 token

<br>

1. 浏览器 向 服务器 请求一个 JWT token
2. 服务器 在服务器端生成 token 响应回浏览器
3. 浏览器在发起请求的时候 会携带 token 发送到服务器 比如 用户点击收藏 的请求
4. 服务器 验证token 是不是有效的token 无效return(比如请求伪造)
- 服务器会拿到token 分别会头 载荷部分进行 base64编码 编码 再加密,
- 然后将加密的结果, 跟浏览器发送过来的token的第三部分做对比 一致就是有效

<br>

### 登录业务流程
1. 在登录页面输入用户名 和 密码
2. 调用后台接口进行验证 发送登录请求
3. 后台根据提交过去的用户名和密码 进行验证 验证的结果是失败 或者 成功
  - 如果登录失败 需要在前端提示用户登录失败
  - 如果登录成功 需要根据响应的状态跳转到项目的主页

<br>

### 登录业务的相关技术点
http是无状态的 所以登录成功后需要记住用户的登录状态

1. 通过 cookie 在客户端记录状态
2. 通过 session 在服务器端记录状态
3. 通过 token 方式维持状态

<br>

### 使用 cookie 和 session 和 token 的场景:
我们现在vue项目运行在一个端口号 而我们的服务器在另一个端口号 它们之间就会存在一个跨域的问题

如果前端和后台之间不存在跨域的问题: 推荐使用 cookie 和 session
如果前端和后台之间存在跨域问题: 推荐使用token的方式
```
  这里我可以理解 如果我们后台 开放了端口 那么我们就不能设置 cookie 所以才推荐使用 token
```

<br>

### token 原理分析
场景： 客户端和服务器之间存在着跨域的情况，客户端要发送ajax请求到服务器 请求数据

<br>

**流程：**
1. 客户端用户登录 输入用户名和密码 发送登录请求
2. 服务器接收到客户端的参数开始验证登录 如果成功 服务器会生成当前用户所对应的 token 并且服务器会将token通过网络请求返回给客户端 token 是由服务器生成的 每个用户对应的token都是不一样的

3. 客户端拿到token之后需要存储token值 因为这个token 相当于记录了客户端登录的状态
4. 客户端后续的所有请求都需要携带该token 发送请求

    客户端在发送下一次请求的时候 携带了这个token 服务器就会根据提交过来的token 去验证你是哪个用户 从而根据你的操作返回不同的结果 token就是客户端与服务器之间的用户的身份验证校验的

5. 服务器验证token是否通过 如果存在代表你已经登录 然后给你返回不同的数据

<br>

### 服务器对 Token 的存储方式：
1. 存到数据库中，每次客户端请求的时候取出来验证(服务端有状态)
2. 存到 redis 中，设置过期时间，每次客户端请求的时候取出来验证(服务端有状态)
3. 不存，每次客户端请求的时候根据之前的生成方法再生成一次来验证(JWT，服务端无状态)

<br>

### 服务端无状态特点：
1. 服务端无状态化、可扩展性好
2. 支持移动端设备
3. 安全
4. 支持跨程序调用

<br>

### token 的身份验证流程：
1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端
4. 客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 *localStorage* 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 token
6. 服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据

<br>

```js
// 插条 token - localStorage 的技巧
export default {
  get UserToken() {
    return localStorage.getItem("token")
  },
  set UserToken(val) {
    localStorage.setItem("token", val)
  }
}

// 页面
if(store.state.UserToken) {

}
```

<br>

**注意：**  
每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里  
token 完全由应用管理，所以它可以避开同源策略

*登录时 token 不宜保存在 localStorage，被 XSS 攻击时容易泄露。*

所以比较好的方式是把 token 写在 cookie 里。 为了保证 xss 攻击时 cookie 不被获取，还要设置 cookie 的 http-only。

这样，我们就能确保 js 读取不到 cookie 的信息了。再加上 https，能让我们的请求更安全一些。

<br>

### Token 和 Session 的区别:
Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。  
而 Token 是令牌，访问资源接口(API)时所需要的资源凭证。Token 使服务端无状态化，不会存储会话信息。

Session 和 Token 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重复攻击，而 Session 就必须依赖链路层来保障通讯安全了。如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。

<br>

### token的跨站攻击怎么处理的?
当前端只有token的时候 怎么处理跨站防御

这里使用的是 cors 跨站防御 这个是浏览器主动向我们提供的保护机制 它是处于http头的保护机制 这个机制是直接嵌入在web内核中的

当用于的网页发送一次ajax请求的时候 本身就会携带一次options请求 在options请求内 就会被告知你当前访问的来源是否允许你的ajax程序继续访问

```js
// 当前域名只接收哪些前端页面的ajax请求 其它的网站发送的ajax直接拒绝
optiosn = [
  "http://localhost:8080",
  "http://www.badi.com"
]
```

<br><br>

# Nodejs jsonwebtoken的使用
npm i jsonwebtoken --save

### **生成token值**

### **jwt对象.sign({用户数据}, salt, {过期时间})**
参数1: 
类型: 对象
作用盛放数据 键值对结构

参数2: 
盐, 也是需要自己手动输入随机字符串的

参数3: 
过期时间(expiresIn: 过期时间 单位是秒)
一般来讲 token 存2个小时

返回值:
token

```js 
// 获取 jwt 对象
const jwt = require('jsonwebtoken');
// 设置 盐
const salt = '*&%^&%&$&';

const token = jwt.sign({id:1, username:'zhangsan'}, salt, {expiresIn: 60*60*2})
```

### **代码部分:**
1. 通过 jwt.sign() 生成 token
2. 成功登录后 将token 送给前端

```js 
router.get('/passport/token', (req,res) => {
  const token = jwt.sign({ id: 1, name: 'zhangsan' }, keys.jwt_salt, { expiresIn: 60 * 60 * 2})

  // 响应回浏览器完整的restful风格的接口
  // res.json()
  res.send({
      errmsg: 'success!',
      errno: '0',

      // 客户端请求的原因
      reason: '登录请求',
      result: {
          token
      }
  })
})



// 举例2:
let jwt = require("jsonwebtoken")
// 用户信息
let payload = {tel: userTel}
// 口令
let secret = "xiaoluxian"
// 生成token
let token = jwt.sign(payload, secret, {
  // s
  expiresIn: 60
})


// 解token
let tokenObj = jwt.decode(token)
// {tel: "18698712060", iat: 1636666, exp:64577}
// iat: 是现在时间 exp是过期时间

// 我们可以拿 当前时间 - 过期时间 > 我们指定的60

const checkToken = () => {
    let getTime = parseInt(new Date().getTime() / 1000)

  // 进入条件说明过期
  if(getTime - exp > 60) {
    return true
  }
}


// 如果过期了 我们就返回code 1000
if(checkToken()) {
  res.send({
    data: {
      code: 1000
    }
  })
}
```

<br>

### **jwt.verify(token, salt, (err, decode) => {})**
使用 jwt.verify函数以验证token是否正确, 我们传入token和分发token时的密钥（两个密钥须一致）, 回调函数就会处理

回调返回 *decode对象*, 这个对象是token {id:1, username:'zhangsan'} 这个部分 我们可以读取用户token中的信息, 并且回显

<br>

# 为什么 token 需要同时存在vuex 和 localStorage 中呢?
vuex存储数据的特点是数据统一 全局管理 一旦vuex在某组件内更新 其它所有组件的数据都会同步更新

但是数据只存在于Vuex中那么刷新页面会导致vuex中的数据重新初始化 导致数据丢失

localstorage 是永久性存储数据 但它不是响应式的 某个组件修改了它后其它组件无法同步更新

vuex是存储到内存的 localstorage是本地存储 存储到磁盘里的 从内存中读取数据速度是远高于磁盘的 所以我们把数据存储到vuex中可以提高获取token的速度 

通常我们在实际项目中都是结合这两者使用的 我们会拿到token 把token存储到 localStorage和vuex中

vuex保证数据在各组件间同步更新 如果刷新页面数据丢失 我们可以从localStorage里面获取 通过结合这两者我们从而实现数据的持久化 

<br><br>

# 前端登录流程:
在登录页点击登录的时候 前端会带着用户名和密码 去调用后台的登录接口

后台收到请求后会验证用户名和密码 验证失败会返回相应的错误信息 前端提示相应的错误信息 如果验证成功则会返回一个token

前端拿到token后将token存储到vuex和localStorage里面 并跳转页面即登录成功

前端每一次要跳转到需要具备登录状态的页面的时候 都需要判断当前的token是否存在 如果不存在就跳转到登录页 存在则正常跳转 

通常我们会将逻辑封装在路由守卫中

向后台发送请求的时候我们需要在请求头中带上token
后台判断请求头中有无该token 有则验证该token 验证成功返回数据 验证失败比如过期则返回相应的错误码

前端拿到错误信息后清除token并回退到登录页面

<br><br>