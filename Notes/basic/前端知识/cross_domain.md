# 跨越的解决方案
1. jsonp
2. cors
3. http proxy
4. post message

5. iframe
  - window.name
  - document.domin
  - location.hash

6. nginx
7. webscoket

<br>

## 跨域: 非同源策略请求
2013以前前端和后台是不分离的状态, 前端代码和服务器代码在一个服务器 这时候是不存在跨域的 因为是同源

<br>

一般我们在项目开发的时候 都会做性能优化和服务器拆分, 都会有如下的服务器

<br>

**1. web服务器**  
处理静态资源

<br>

**2. 数据服务器**  
业务逻辑 和 数据分析(数据库管理)

<br>

**3. 图片服务器**  
因为图片和音视频比较大, 一般会单独的拿出一个服务器来处理图片 音视频等资源

<br>

这样就会导致一个问题, 我们的web服务器是单独的一个域名, 数据服务器也会有一个域名, 这就出来的跨域问题

<br>

### 跨域出现的情况
1. 没有遵守同源策略
2. 项目调用第三方公共接口

<br><br>

## JSONP

### JSONP的实现原理:
1. script
2. img
3. link
4. iframe

如上的标签是自发请求 不存在跨域请求的问题

<br>

**script标签:**  
如下就是请求第三方网站的资源, 我们使用script的时候并没有出现跨域的现象
```js
<script src="https://cdn.bootcss.com/jquery/3.3/jquery.min.js"></script>
```

<br>

而JSONP就是利用script这样的特性 来实现的

<br>

### 实现部分:

**1. 前端利用 script 发起请求**   
因为script不存在域的限制 所以我们请求这个地址的时候 会可以将我们的请求带到该服务器
```html
<script src="http://服务器接口地址/list"></script>
```

<br>

**2. 前端定义函数用来处理服务端函数的数据**
```js
// 在前端定义
function dataHandler(data) {
  console.log(data)
}
```

<br>

**3. 前端在script标签的最后利用url参数 将函数名携带上**
```html
<script src="http://服务器接口地址/list?callback=dataHandler"></script>
```

<br>

**4. 服务器接收请求, 拿到callback指定的函数名, 组织数据, 传递给前端, 类似** 
```js
const data = { ... }

res.send(`dataHandler(${JSON.stringify(data)})`)
```  

<br>

**5. 前端会将服务器返回的字符串变成js表达式来执行**

<br>

### 要点:
1. 前端处理后台返回的数据 **这个函数必须是全局函数**
2. JSONP必须服务器来进行配合
3. vue中也支持jsonp
4. jsonp只能处理get请求
5. jsonp中我们会在url里面指定函数名, 可能会被url劫持 **不安全**

<br>

### 代码实现:
axios不支持jsonp的方法 如果有需求 我们可以研究下 (jq可以)

```js
npm i jsonp --save-dev

 jsonp(config.ajaxUrl + '路径', null, (err, data) => {
   if (err) {
     console.error(err.message);
   } else {
     if (data.list.length > 0) {
       data.list.map((item) => this.list.push(item))
       console.log(data);
     }
   }
 })
```

<br>

**前端:**  
```html
<script>
  function handler(data) {
    console.log(data)
  }
</script>
<script src="http://localhost:3333/list?callback=handler"></script>
```

<br>

**后台:**  
```js
router.get("/list", (req, res) => {
  const data = {
    msg: "ok"
  }

  res.jsonp(data)
})
```

<br><br>

## Cors: 跨域资源共享
当我们前台使用 axios 发送请求的时候, 会报如下的错误
```s
Access to XMLHttpRequest at 'http://localhost:3333/' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: 

No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

大致意思是 我们从 5000 端口 向 3333 端口发送请求 的时候 因为没有 'Access-Control-Allow-Origin' 头部, 所以才不允许跨域的

那么 我们只需要在服务器设置 'Access-Control-Allow-Origin' 它 允许我们的 5000 端口 进行跨域 就行了

<br>

### 使用 cors 方式 处理跨域
**1. 客户端使用 axios 发送请求**
```js
axios
  .get("http://localhost:3333")
  .then(res => {
    console.log(res)
  })
```

<br>

**2. 服务器设置 cors 相关设定 来解决跨域**  

**跨域相关配置文件 config.js:**
```js
module.exports = {
  // web服务器端口号
  PORT: 3000,

  // cros跨域相关信息
  CROS: {
    ALLOW_ORIGIN: "http://127.0.0.1:3000",
    ALLOW_METHODS: "PUT, POST, GET, DELETE, OPTIONS, HEAD",
    HEADERS: "Content-Type, Content-Lenth, Authorization, Accept, X-Requested-With",
    CREDENTIALS: true
  },

  // session存储相关的信息
  SESSION: {
    secret: "ZFPX",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  }
}
```

<br>

**ALLOW_ORIGIN:**   
可以指定允许源进行跨域, 也可以写*  
一旦我们配置了 * 就不允许客户端携带cookie了

<br>

**X-Requested-With:**   
它是请求头  

X-Requested-With头域就是用来判断一个请求是传统的HTTP请求, 还是Ajax请求。也就是说Ajax的请求一般都会带上X-Requested-With头域。

它通常用于AJAX请求中, 用来表明这个请求是由 JavaScript 发起的。**如果允许这个请求头, 则表示允许跨域AJAX请求**

在一些框架和库中, 比如 jQuery, 就会在发送 AJAX 请求时自动添加这个请求头。因此, 如果服务器端需要判断一个请求是否为 AJAX 请求, 就可以检查请求头中是否包含 X-Requested-With。如果包含, 就可以认为这是一个 AJAX 请求。

<br>

**NodeJs服务器程序中使用 ues中间件设置cors:**  
```js
app.use((req, res, next) => {

  // 从 config.js 配置文件中解构出 跨域相关信息
  const { ALLOW_ORIGIN, ALLOW_METHODS, HEADERS, CREDENTIALS } = config.CROS

  // 设置响应头
  
  // 设置允许哪一个源向我(服务器)发送请求 (我们允许前端5000端口访问服务器)
  res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN)
  // 设置在跨域请求中是否携带 cookie
  res.header("Access-Control-Allow-Credentials", CREDENTIALS)
  // 设置允许客户端以什么方式发送请求
  res.header("Access-Control-Allow-Headers", HEADERS)
  // 设置客户端发送请求是允许的携带哪些请求头
  res.header("Access-Control-Allow-Methods", ALLOW_METHODS)

  // 处理 options请求 它需要服务器返回200
  if(req.method == "OPTIONS") {
    res.send("ok")
    return
  }

  // 别忘了 next() 放行
  next()
})
```

<br>

**OPTIONS请求:**  
所有的非常规请求 都会预先发送一个 OPTIONS预检请求, 在我们发送真正的请求之前 会默认发送该请求

服务器接收到OPTIONS请求后 可以直接返回一个成功回应 如 res.send(), 客户端这样就会知道可以跟服务器建立链接, 然后客户端会再次走真正的请求

<br><br>

## Http Proxy
一般都是在 webpack 里面进行配置

<br><br>

## Nginx 反向代理
不需要前端干啥 只需要在Nginx中配置即可

<br><br>

## PostMessage
我们利用 PostMessage 实现两个页面之间的通信
- a.html - server1
- b.html - server1 (比如b是服务端)

<br>

### server1:
访问 a.html 则为: localhost:1001/a.html
```js
const express = require("express")
const app = express()

// 以后请求都是从 当前的根目录开始进行请求
app.use(express.static("./"))

app.listen(1001, () => console.log("server1"))
```

<br>

### server2:
访问 b.html 则为: localhost:1002/b.html
```js
const express = require("express")
const app = express()

// 以后请求都是从 当前的根目录开始进行请求
app.use(express.static("./"))

app.listen(1002, () => console.log("server2"))
```

<br>

### a.html -> b.html 发送信息
**1. 我们在 a页面 使用 iframe标签 引入b页面, 并向b页面发送消息**  

**我们在使用 postMessage 发送消息的时候 都需要指明目的地的源**

```html
<!-- 
  要点:
    style="display: none;" 我们并不想在 a.html 页面 看到 b.html 所以我们给它隐藏
 -->
<iframe 
  id="iframe" 
  src="http://127.0.0.1:1002/b.html" 
  frameborder="0"
  style="display: none;"
></iframe>

<script>
  // 当 子页面 加载完成后 在执行内部的逻辑 重要
  iframe.onload = function() {
    /*
    iframe.contentWinodw:
    
      iframe
        为a页面中的 iframe标签
  
      iframe.contentWinodw 
        为iframe标签中引入的子页面 也就是 b.html
    */
    // 向 b.html 页面发送请求
    /*
      参数1: 数据
      参数2: 消息接收方的源, 向哪个源发送消息, 确保只向可信任的源发送消息
    */
    iframe.contentWinodw.postMessage("珠峰培训", "http://127.0.0.1:1002/")
  }
</script>
```

<br>

**2. b.html接收消息**
```html
<script>
  window.onmessage = function(e) {
    // 确认消息来源是 a.html（可选）
    if (e.origin !== 'http://localhost:1001') {
      return
    }

    // 在控制台中输出接收到的消息
    console.log('b.html 接收到消息：', e.data)

    // 通过 e.source 向发送方(a.html)回复消息
    // e.origin 为 a.html 的源
    e.source.postMessage("b页面的数据", e.origin)
  }
</script>
```

<br><br>

## scoket.io
客户端 和 服务器 实时通信的协议

<br><br>

## 基于 iframe + document.domain
只能实现 同一个主域, 不同子域之间的操作

比如 我们可以是 v.qq.com -> sports.qq.com 发送请求 是可以 也就是它们是 主域 和 子域 之间的关系

<br>

### 父页面: http://www.zhufengpeixun.com/a.html
```html 
<!-- 
  我们在父页面中引入的子页面 
  注意 a.html 和 b.html 的主域是一样的
-->
<iframe src="http://school.zhufengpeixun.com/b.html"></iframe>

<script>
  // 设置主域
  document.domain = "zhufengpeixun.com"
  // 设置数据
  let user = "admin"
</script> 
```

<br>

### 子页面: http://school.zhufengpeixun.com/b.html
```html
<script>
  // 设置主域: b页面也要设置主域 注意只有一个主域 所以ab设置的都是一样的
  document.domain = "zhufengpeixun.com"

  // 通过 winodw.parent 获取到挂载在它身上的信息, winodw.parent 就是 a.html 
  alert(winodw.parent.user)
</script>
```

<br><br>

## 基于 iframe + window.name
使用该方案的话 一共需要3个页面
1. a.html
2. b.html
3. proxy.html

<br>

- a 和 proxy 在一个域, 比如他们都在 localhost:1001
- b 自己在 localhost:1002

<br>

### A页面
```html
<iframe 
  id="iframe"
  src="http://127.0.0.1:1002/b.html"
/>
```
```js
// 这个函数 就是下面逻辑的总结
const proxy = function(url, callback) {
  let count = 0
  let iframe = document.createElement("iframe")
  iframe.src = url
  iframe.onload = function() {
    if(count == 0) {
      iframe.contentWindow.location = "http://www.zhufengpeixun.com/proxy.html"

      count++
      return
    }

    callback(iframe.contentWindow.name)
  }

  document.body.appendChild(iframe)
}



// 定义一个计数器
let count = 0

// 当a页面中成功加载b页面后
iframe.onload = function() {
  /*
    我们期望直接通过 iframe.contentWinodow.name 拿到b页面中的数据 
    console.log(iframe.contentWinodow.name)
     
    但是会报错:
      Uncaught DOMException: Blocked a frame with origin "http://127.0.0.1:1001" from accessing a cross-origin frame
  */

  // 我们进行如下的处理
  // 如果 count == 0 说明 onload 是第一次执行
  if(count == 0) {
    // 我们将 a页面中的iframe标签的src指向同源的proxy页面
    iframe.src = "http://127.0.0.1:1001/proxy.html"
    count++
    return
  }

  // 当第二次的时候 就可以从b.html页面中获取数据了
  console.log(iframe.contentWinodow.name)
  
}
``` 

<br>

### B页面 (充当服务器端)
b页面中将数据放在 window.name 的身上, 也就是说b页面中的数据 通过 window.name 来提供
```js
// 服务器端需要返回给A的信息都在 window.name 中存储
window.name = "珠峰培训"
``` 

<br>

### proxy页面
该页面中不写任何逻辑 就是一个空代理

<br><br>

## 基于 iframe + location.hash
该方案也需要3个页面
- a.html
- b.html
- c.html

a 和 c 是同源的, 和 b 是非同源的

a向b发送请求, b收到请求后通过hash的方式 将数据传递给c c拿到信息后调用a中的fn将获取到的数据再传递给a

<br>

**注意:**  
每个url都有最大长度的限制 所以hash传递不了太多的东西

<br>

### 页面A
a.html 中使用 iframe 嵌套 b.html
```html
<iframe
  id="iframe"
  src="http://localhost:1002/b.html"
>

<script>
  let iframe = document.getElementById("iframe")

  // 向 b.html 传 hash 值 onload方法要控制只执行一次 不然会是死循环 比如我们可以利用计数器
  iframe.onload = function() {
    // 当子页面加载成功后 再次向子页面发送请求 并携带了hash
    iframe.src = "http://localhost:1002/b.html#msg=我是数据"
  }


  // 开放给同域c.html的回调方法
  function fn(res) {
    alert(res)
  }
</script>
```

<br>

### 页面B
```html
<!-- 在b中默认访问c -->
<iframe
  id="iframe"
  src="http://localhost:1001/c.html"
>

<script>
  let iframe = document.getElementById("iframe")

  // 当b页面的hash值变化的时候 触发事件 监听a.html传来的hash值 再传给c.html
  window.onhashchange = function() {
    iframe.src = 'http://localhost:1001/c.html' + location.hash
  }


  // 开放给同域c.html的回调方法
  function fn(res) {
    alert(res)
  }
</script>
```

<br>

### 页面C
```html
<script>
  // 监听hash的变化 相当于监听b传来的hash值
  window.onhashchange = function() {
    // 在通过操作同域A的js回调 将结果传回, 将b传给c的信息 再传回给a
    window.parent.parent.fn(location.hash)
  }
</script>
```