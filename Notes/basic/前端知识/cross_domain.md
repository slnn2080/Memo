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
