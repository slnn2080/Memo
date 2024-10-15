### 解决跨域问题的方案
目前比较常用的跨域解决方案有3种：

**1. Jsonp**  
最早的解决方案、利用script标签可以跨域的原理实现。

**限制：**
需要服务的支持 *只能发起GET请求*

<br>

**2. nginx反向代理是**  
利用nginx把跨域反向代理为不跨域、支持各种请求方式

**缺点：**
需要在nginx进行额外配置、语义不清晰

<br>

**3. CORS**
规范化的跨域请求解决方案、安全可靠。

**优势：**
在服务端进行控制是否允许跨域、可自定义规则 支持各种请求方式

**缺点：**
会产生额外的请求

<br>

### CORS
CORS是 w3c标准 全称是 跨域资源共享 (cross-orgin resource sharing)

它允许浏览器向跨源服务器 发出 XMLHttpRequest 请求 从而克服了ajax只能同源使用的限制

cors需要浏览器(目前所有浏览器都支持该功能)和服务器同时支持

整个cors通信过程 都是*浏览器自动完成* 不需要用户参与对开发者来说 cors通信与同源的ajax通信没有差别 代码完全一样

*浏览器一旦发现ajax请求跨源 就会自动添加一些附加的头信息 有时还会多出一次附加的请求(但用户不会有感觉)*

因此 实现cors通信的关键是服务器 只要服务器实现了cors接口 就可以跨源通信

<br>

**简单的来说:**  
CORS就是两种在不同的域、协议或端口(即不在同源中)、服务之间能相互访问。

<br>

### 简单请求 和 复杂请求
浏览器将cors请求分为两类： 
- 简单请求
- 非简单请求

浏览器对这两种请求的处理、是不一样的。

<br>

### 简单请求：
请求方法为:  EAD GET POST

HTTP的头信息不超出以下几种方式
- Accept
- Accept-Lauguage
- Content-Language
- Last-Event-ID
- Content-Type: 
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain

```s
这是为了兼容表单（form）、因为历史上表单一直可以发出跨域请求。
AJAX 的跨域设计就是、只要表单可以发、AJAX 就可以直接发。
```

<br>

### 复杂请求
凡是不同时满足上面两个条件、就属于非简单请求。

<br><br>

## 简单请求的基本流程
对于简单请求 浏览器直接发出cors请求 它会在头信息之中 增加一个 Origin 字段

比如： 浏览器发现这次跨源ajax请求是简单请求 就会自动在头信息之中添加一个 Origin 字段
```js
GET /cors HTTP/1.1

Origin: http://api.bob.com

Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

<br>

### Origin:
该字段用来说明 本次请求来自哪个源(协议+域名+端口) 服务器根据这个值 决定是否同意这次请求

<br>

**如果 Origin指定的源 不在许可的范围内**  

服务器会返回一个正常HTTP回应 浏览器发现这个回应的头信息没有包含  ``Access-Control-Allow-Origin`` 就知道出错了 从而抛出一个错误 被XMLHttpRequest的onerror回调函数捕获
 
<br>

**注意:**  
这种错误无法通过状态码识别、因为HTTP回应的状态码有可能是200。


**如果 Origin 指定的域名在许可范围内**  
服务器返回的响应、会多出几个头信息字段。  

*也就是说下面的字段是 服务器必须响应回来的 我们需要在服务器端设置*

```s
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8

# 只要是在 86400 以内 只要是该源的请求 你就不用重复问了, 我都是这样的回答 你可以将其缓存起来
Access-Control-Max-Age: 86400
```

上面的头信息之中 有三个与cors请求相关的字段 都以 ``Access-Control-`` 开头

<br>

### Access-Control-Allow-Origin
*该字段是必须的。*  

它的值要么是请求时Origin字段的值、要么是一个*、表示接受任意域名的请求。

<br>

### Access-Control-Allow-Credentials
*该字段可选。*

它的值是一个布尔值 表示是否允许发送cookie

默认情况下 cookie包括在cors请求之中 设为true 即表示服务器明确许可 cookie可以包含在请求中 一起发送给服务器 这个值也只能设为 true
如果服务器不要浏览器发送cookie 删除该字段即可

<br>

### Access-Control-Expose-Headers
*该字段可选。*

cors请求的时候 XMLHttpRequest对象的 getResponseHeader() 方法只能拿到6个基本字段 xhr.getResponseHeader()
1. Cache-Control
2. Content-Language
3. Content-Type
4. Expires
5. Last-Modified
6. Pragma

如果想拿到其他字段、就必须在Access-Control-Expose-Headers里面指定。

指定之后 xhr.getResponseHeader() 方法才能拿到指定字段的值

总结下, 也就是说 当前端获取响应报文的头部信息的时候, 会调用类似 ``getHeader()`` 的方法, 来获取指定的头部信息, 但是能获取到的之后上面6个比较基础的

如果想获取到额外的头部信息, 需要服务器端暴露出来

比如
```js
app.post('/web',function(req,res){
  console.log('到达post')
  res.setHeader("Access-Control-Allow-Origin","*")
  // 允许客户端读取所有的头部信息
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  console.log('已经收到post'+req.body.name)
  res.end(req.body.name)
})


// 还可以指定某个头部信息
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization, X-Custom-Header')
  next()
})

router.get("/", (req, res) => {

  res.setHeader('X-Custom-Header', '123')

  res.json({
    code: 200,
    msg: "首页登录成功",
    method: "get",
    list
  })
})
```

<br>

### withCredentials 属性
CORS请求默认不发送Cookie和HTTP认证信息。

如果要把Cookie发到服务器、一方面要服务器同意、指定Access-Control-Allow-Credentials字段。

```js
Access-Control-Allow-Credentials: true
```

<br>

另一方面、开发者必须在AJAX请求中打开withCredentials属性。
```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

<br>

否则、即使服务器同意发送Cookie、浏览器也不会发送。或者、服务器要求设置Cookie、浏览器也不会处理。
但是、如果省略withCredentials设置、有的浏览器还是会一起发送Cookie。这时、可以显式关闭withCredentials。
```js
xhr.withCredentials = false;
```

<br>

### 注意:
**Access-Control-Allow-Origin: * 的时候 cookie不能发送**

如果要发送Cookie、Access-Control-Allow-Origin就不能设为星号、必须指定明确的、与请求网页一致的域名。

同时、Cookie依然遵循同源政策、只有用服务器域名设置的Cookie才会上传、其他域名的Cookie并不会上传、且（跨源）原网页代码中的
document.cookie也无法读取服务器域名下的Cookie。

<br>

### 复杂请求 (预检请求)
非简单请求是那种对服务器有特殊要求的请求、比如请求方法是PUT或DELETE、或者Content-Type字段的类型是application/json。或者自己自定义了请求头

<br>

**options请求**   
非简单请求的CORS请求、会在正式通信之前、增加一次HTTP查询请求、称为"预检"请求（preflight）。

在CORS机制一个域名A要访问域名B的服务、在一些特殊的复杂请求下(简单请求并不会进行预请求)、浏览器必须先使用OPTIONS请求进行一个预检请求(preflight request)来获取B服务是否允许跨域请求、服务进行确认之后、才会发起真正的HTTP请求。

浏览器先询问服务器、当前网页所在的域名是否在服务器的许可名单之中
以及可以使用哪些HTTP动词和头信息字段。
只有得到肯定答复、浏览器才会发出正式的XMLHttpRequest请求、否则就报错。

**也就是说 我们要对 options请求做出正确的响应**

<br>

比如: 下面代码中、HTTP请求的方法是PUT、并且发送一个自定义头信息X-Custom-Header。
```js
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```

浏览器发现、这是一个非简单请求、就自动发出一个"预检"请求、要求服务器确认是否可以这样请求。下面是这个"预检"请求的HTTP头信息。
```js
OPTIONS /cors HTTP/1.1

Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header

Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

"预检"请求用的请求方法是OPTIONS 表示这个请求是用来询问的
Origin、表示请求来自哪个源。请求来自于哪个url

<br>

### Access-Control-Request-Method
*该字段是必须的*
用来列出浏览器的CORS请求会用到哪些HTTP方法、上例是PUT。

<br>

### Access-Control-Request-Headers
该字段是一个逗号分隔的字符串
指定浏览器CORS请求会额外发送的头信息字段、上例是X-Custom-Header。

<br>

### 预检请求的回应
服务器收到"预检"请求以后、检查了下面的字段以后

```s
Origin
Access-Control-Request-Method
Access-Control-Request-Headers
```

确认允许跨源请求、就可以做出回应。
这里的回应就是要在options请求回调中 设置下面的信息吧
```js
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)

Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header

Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

上面的HTTP回应中、关键的是

<br>

### Access-Control-Allow-Origin
表示http://api.bob.com可以请求数据。该字段也可以设为星号、表示同意任意跨源请求
```js
Access-Control-Allow-Origin: *
```

<br>

### Access-Control-Allow-Origin的设置方式
1. 设置值为 *  
但是服务器出于安全考虑、肯定不会这么干、而且、如果是*的话、游览器将不会发送cookies、即使你的XHR设置了withCredentials

2. 设置值为 指定域  
如下图中的http://172.20.0.206、一般的系统中间都有一个nginx、所以推荐这种所有的请求都会到nginx服务器来进行转发 所以设置为 nginx服务器地址就可以
```js
//指定允许其他域名访问
//一般用法（*、指定域、动态设置）、3是因为*不允许携带认证头和cookies
'Access-Control-Allow-Origin: http://172.20.0.206'
```

3. 设置值为动态设置为请求域、多人协作时、多个前端对接一个后台、这样很方便

<br>

如果服务器否定了"预检"请求、会返回一个正常的HTTP回应

但是没有任何CORS相关的头信息字段。这时、浏览器就会认定、服务器不同意预检请求、因此触发一个错误、被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。
```js
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

服务器回应的其他CORS相关字段如下。

也就是说 服务器在options请求中 要写如下的声明告知浏览器可以允许什么通过
```js
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```

<br>

### Access-Control-Allow-Methods
该字段必需

它的值是逗号分隔的一个字符串 表明服务器支持的所有跨域请求的方法
返回的是所有支持的方法、而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求

<br>

### Access-Control-Allow-Headers
如果浏览器请求包括 Access-Control-Request-Headers 字段
则Access-Control-Allow-Headers字段是必需的

它也是一个逗号分隔的字符串
表明服务器支持的所有头信息字段、不限于浏览器在"预检"中请求的字段。

<br>

### Access-Control-Allow-Credentials
该字段与简单请求时的含义相同。

<br>

### **Access-Control-Max-Age**
该字段可选

用来指定本次预检请求的有效期、单位为秒

上面结果中、有效期是20天（1728000秒）、即允许缓存该条回应1728000秒（即20天）、在此期间、不用发出另一条预检请求。

<br>

### 浏览器的正常请求和回应
一旦服务器通过了"预检"请求

以后每次浏览器正常的CORS请求、就都跟简单请求一样、会有一个Origin头信息字段。服务器的回应、也都会有一个Access-Control-Allow-Origin头信息字段。

下面是"预检"请求之后、浏览器的正常CORS请求。
```js
PUT /cors HTTP/1.1

Origin: http://api.bob.com

Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面头信息的Origin字段是浏览器自动添加的。

下面是服务器正常的回应。
```js
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
```
上面头信息中、Access-Control-Allow-Origin字段是每次回应都必定包含的。

<br>

## 补充说明：
### X-Requested-With
如果requestedWith为null 则为同步请求。
如果requestedWith为XMLHttpRequest 则为Ajax请求。
```java
if (request.getHeader("x-requested-with") != null
    && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
    out.print("该请求是AJAX异步HTTP请求。");
} else {
    out.print("该请求时传统的同步HTTP请求。");
}
```

<br>

### 优化options请求
如果不想让每个CORS复杂请求都出两次请求、可以设置

Access-Control-Max-Age这个属性。让浏览器缓存、在缓存的有效期内、所有options请求都不会发送。优化性能。


### 有人会说
允许跨域, 不就是服务端(例如Nginx或者后端代码)设置``Access-Control-Allow-Origin: *``就可以了吗?

普通的请求确实是这样子的, 除此之外, 还一种叫请求叫Preflighted Request(带预检的跨域请求)

<br>

### Node Express 中处理 options请求的示例:
先写200状态码

然后设置响应头信息 告知浏览器端
```js
// 设置跨域和相应数据格式
app.all('/api/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')

  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')

  res.setHeader('Content-Type', 'application/json;charset=utf-8')

  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')

  if (req.method == 'OPTIONS') res.send(200)
  /*让options请求快速返回*/ else next()
})
```

原生方式:
```js
if(request.method == 'OPTIONS'){
// 回复OPTIONS
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
  });
  response.end('');
}
```


```js
var express=require('express')
var bodyParser = require('body-parser')
var app=express()
// create application/json parser
// var jsonParser = bodyParser.json()

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/web',function(req,res){
  res.setHeader("Access-Control-Allow-Origin","*")
  console.log(req.query.name+'已经收到get')
  res.end(req.url+'get的响应'+req.query.name)
})

app.post('/web',function(req,res){
  console.log('到达post')
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  console.log('已经收到post'+req.body.name)
  res.end(req.body.name)
})

app.put('/web',function(req,res){
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  res.setHeader("Access-Control-Allow-Headers", "*");
  console.log(req.body.name+'已经收到put')
  res.end(req.body.name+'已响应put')
})


app.delete('/web',function(req,res){
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  console.log(req.query.name+'已经收到delete')
  res.end(req.query.name+'响应delete')
})
app.options('/web',function(req,res){
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  console.log(req.url+'options')
  res.end(req.url+'options')
})
app.listen(8081,function(){
  console.log('runing in 8081')
})


```

<br>

### Java 中处理 options请求的示例:
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
​
@Configuration
public class GlobalCorsConfig {
  @Bean
  public CorsFilter corsFilter() {
    //1.添加CORS配置信息
    CorsConfiguration config = new CorsConfiguration();
    //1) 允许的域,不要写*、否则cookie就无法使用了
    config.addAllowedOrigin("http://manage.leyou.com");
    //2) 是否发送Cookie信息
    config.setAllowCredentials(true);
    //3) 允许的请求方式
    config.addAllowedMethod("OPTIONS");
    config.addAllowedMethod("HEAD");
    config.addAllowedMethod("GET");
    config.addAllowedMethod("PUT");
    config.addAllowedMethod("POST");
    config.addAllowedMethod("DELETE");
    config.addAllowedMethod("PATCH");
    // 4）允许的头信息
    config.addAllowedHeader("*");
​
    //2.添加映射路径、我们拦截一切请求
    UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
    configSource.registerCorsConfiguration("/**", config);
​
    //3.返回新的CorsFilter.
    return new CorsFilter(configSource);
  }
}
```
