# 备注: 
axios 使用 post 发送数据时, 默认是直接把 json 放到请求体中提交到后端的  
也就是说

    axios默认的请求头content-type类型: 
    application/json;charset=utf-8

但是实际我们后端要求的 如下为多见

    'Content-Type': 'application/x-www-form-urlencoded' 

<!-- 
  (?<=^)(> )(.+)
  ### **<font color="#C2185B">$2: </font>**

  ^### 
  # 
 -->

<br>

# jQ - Ajax

### **<font color="#C2185B">$.ajax({配置对象}): </font>**
配置对象中常用的参数:

<br>

**<font color="#C2185B">url: </font>**  
请求地址

<br>

**<font color="#C2185B">type: </font>**  
请求类型

<br>

**<font color="#C2185B">data: </font>**  
发送给服务器的数据:  
书写的数据格式(两种都可以):

    data: {action: "jQueryAjax"}
    data: "action=jQueryAjax"

<br>

**<font color="#C2185B">success: </font>**  
请求成功响应的回调的函数

<br>

**<font color="#C2185B">dataType: </font>**  
*响应的* 数据类型  
如果不指定 http包会对mime信息来智能判断
  - xml
  - text
  (如果我们定义为text是需要自己JSON.parse())

  - json
  (如果我们定义为json 不需要自己JSON.parse())

  - html
  - script
  - jsonp

<br>

### 演示:
要点: 使用jQ发请求的时候 原来 ?action=method 这样的参数 在data配置项里面写的
```js
$.ajax({
  url: "http://localhost:8080/ajaxServlet",

  data: "action=jQueryAjax",
  data: {action: "jQueryAjax"}

  type: "get",
  success: function(data) {

    // data服务器返回来的数据
    console.log(data)
  },
  dataType: "json"
})
```

<br>

### **<font color="#C2185B">$.get(url, [data], [callback], [type]): </font>**
### **<font color="#C2185B">$.post(url, [data], [callback], [type]): </font>**
type: 是响应数据的类型
- xml
- html
- text
- json ...

**注意:** 按照顺序去传递

<br>

### **<font color="#C2185B">$.getJSON(url, [data], [callback]): </font>**
固定的get请求, 返回的数据也是固定的json

<br>

### **<font color="#C2185B">表单对象.serialize(): </font>**
可以把表单中所有表单项的内容都获取到  
并以 name=value&name=value 的形式进行拼接
```js
let content = $("from").serialize()

$.ajax({
  url: "http://localhost:8080/ajaxServlet",
  type: "get",
  data: "action=jQuerySerialize&" + $("from").serialize(),
  success: function() {
    ... 
  }
})
```

<br>

# 扩展: jq发送form的时候
要加上下面的2行配置 
- 告诉jQuery不要去处理发送的数据(必须设置)
- 告诉jQuery不要去设置Content-Type请求头（必须设置）

<br>

### **<font color="#C2185B">processData: false</font>**
默认值: true  
默认情况下, 通过data选项传递进来的数据, 如果是一个对象(技术上讲只要不是字符串), 都会处理转化成一个查询字符串, 以配合默认内容类型 "application/x-www-form-urlencoded"。  

如果要发送 DOM 树信息或其它不希望转换的信息, 请设置为 false。

<br>

### **<font color="#C2185B">contentType: false  -- 不设置内容类型: </font>**
默认: "application/x-www-form-urlencoded"  
发送信息至服务器时内容编码类型。默认值适合大多数情况。如果你明确地传递了一个content-type给 $.ajax() 那么他必定会发送给服务器（即使没有数据要发送）

<br>

# 阻塞的解释 或者 异步的优点
比如页面上又5个按钮 我们将一个按钮设置为请求数据 并且是同步的  
那么 第一个按钮 数据没有回来之前 其它按钮 或者说整个页面是卡死的状态   
异步就是其它的功能并不影响整个页面的交互

<br>

### jq中修改为同步: 
**<font color="#C2185B">async: false</font>**

<br>

### 原生ajax修改为同步: 
**<font color="#C2185B">open最后一个参数设置为false</font>**

<br>

**注意:**  
send()要在最后  
https://blog.csdn.net/github_38222702/article/details/70160109

<br>

# AJAX就是异步的JS 和 XML
通过AJAX可以在浏览器中向服务器发送异步请求, 最大的优势: 无刷新获取数据  
它不是一门新的语言 而是将一种现有的标准组合在一起使用的新方式


## XML: 
超文本标记语言, 可扩展标记语言 被设计用来传输和存储数据  
用来保存一些数据的,   
比如保存商品数据, 订单数据, 电影, 音乐, 可以用来传输数据,   
比如这么数据前端需要 我可以通过网络以XML的形式 把结果返给客户端 客户端就可以使用了

而 HTML 是用来在网页中呈现数据的  

XML和HTML类似, 不同的是HTML都是预定义标签, 而XML中没有预定义标签, 全都是自定义标签, 用来表示一些数据
标签都是自己定义的 ``<student><name><age>``

AJAX在进行数据交换的时候所使用的数据格式就是XML 服务器端给客户浏览器返回结果时 返回的就是XML格式的字符串 前端JS在接到这个XML字符串后, 对它做一个解析 把数据提取出来做一个处理  

但是现在在用AJAX的应用时 就不用XML了 而是换了另外一种格式就是 **JSON**  

JOSN相对于XML来讲更加的简洁 在数据转换这块也更加的容易  
它可以直接借助JOSN的API方法快速将字符串转换JS对象 灵活度 远胜于XML 以后的项目中的使用都是使用JOSN

<br>

### AJAX的特点: 
可以无需刷新页面与服务器进行通信  
允许你根据用户事件来更新部分页面内容

比如: 
- 鼠标事件
- 键盘事件
- 表单事件
- 文档事件
  
我们可以在事件处理程序过程当中向服务端发送请求获取结果
有了这样一个特性, 我们可以在用户的特定行为下 来向服务端发送请求, 比如用户把鼠标放到了元素的上面 从这个元素上面离开 点击哪个元素 都可以向服务端发送请求并获取结果

<br>

### AJAX的缺点
- 没有浏览历史, 不能回退
- 存在跨域问题（同源）

      跨域: 
      我在A服务 向 B服务发送请求 AJAX默认是不允许的 比如a.com的网页 向 b.com 发送AJAX的请求 默认是不可以的 

- seo 不友好   
seo是搜索引擎优化 因为网页中的内容 爬虫是爬不到的 
比如 京东商品上的名字, 在代码中是找不到的, 因为都是通过AJAX异步请求得到的结果  

源代码在第一次请求京东的时候 源代码结果里是没有商品信息的  
源代码就是响应体 响应体就是HTTP响应的一部分 没有商品信息的话 那这些内容是怎么样让我们看到的呢？  
通过AJAX向服务端发送请求 服务端返结果 通过JS动态的创建到页面当中去的 既然是动态创建的 爬虫爬不到商品的数据

<br>

### Ajax的运行原理: 
页面不刷新的情况下 请求数据

在传统的网站上 都是浏览器端本身向服务器端发送请求, 由浏览器端本身接收服务器端返回的数据, 由于浏览器在发送请求和接收响应期间 不能再继续响应用户的其它操作(比如继续浏览拉动当前请求)

     浏览器端    <br> 请求 <br> >  服务器端
               < <br> 响应 <br>   

传统页面的请求的发送 和 响应的接收 开发人员是不可控的  
但是可以找一个代理人帮助浏览器做这件事情, 浏览器就能空闲下来响应用户的操作了 ajax就是浏览器的代理人


    浏览器端    -- 创建 -- >    ajax    -- 请求 -- >    服务器端
               < -- 响应 --            < -- 响应 -- 

这样就可以由ajax帮浏览器发送请求 ajax帮助浏览器接收服务器端的响应  
当我们接收到服务端发送的数据后 使用dom方法添加到页面中 这样就可以让客户边浏览网站边向服务端请求数据了, 页面无刷新更新数据

请求的发送 和 响应的接收 开发人员是可控的

<br>

# express 中的部分 API

### **<font color="#C2185B">response.send(): </font>**
回调中的参数 response.send() 方法可以发送响应
send()方法中只能传递<font color="#C2185B">json 和 buffer</font>

    response.send(`<h2>我是服务器返回的响应</h2>`)

<br>

### **<font color="#C2185B">response.end(): </font>**
跟send一样也是发送响应的方法, **但是它不会加特殊的响应头**

<br>

### **<font color="#C2185B">response.sendFile(): </font>**
响应一个文件, 要写绝对路径
```js
// 响应一个页面 这个页面要写一个绝对路径
response.sendFile(__dirname + '/index.html')
```

<br>

### **<font color="#C2185B">response.setHeader(): </font>**
设置响应头, 设置允许跨域
```js
response.setHeader('Access-Control-Allow-Origin', '*');
```

当浏览器端设置自定义响应头的时候 再添加下面的规则, 意思是所有类型的头信息都可以接收  
当我们进行下面的设定后, 还不够 我们还要把 
```js
response.setHeader('Access-Control-Allow-Headers', '*');

app.post('/server', (requset, response) => { ... });

// 修改为: 
app.all('/server', (requset, response) => { ... });
```

<br>

### **<font color="#C2185B">app.listen(端口号, callback): </font>**
启动服务器, 监听对应的端口
```js
app.listen(端口, () => {
  console.log('端口监听中')
})
```

<br>

# 浏览器端 发送Ajax请求的使用方法
### **1. 创建ajax对象:**
#### **<font color="#C2185B">const xhr = new XMLHttpRequest() </font>**
xhr是在网络控制台的ALL标签旁边有个XHR 是对AJAX请求的一个筛选 所以使用这个变量名

<br>

### **2. 初始化 设置请求方法 和 URL:**
#### **<font color="#C2185B">xhr.open('GET', '``http://127.0.0.1:8000/server?a=100&b=200&c=300``')</font>**  

参数1:  
请求的类型(GET / POST)

参数2:  
请求地址(服务器端对应的路由请求地址)

<br>

### **3. 发送:**
#### **<font color="#C2185B">xhr.send(): </font>**
send()方法中只能放**字符串或buffer**

<br>

### **4. 处理服务器端返回的结果:**  
```js 
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status >= 200 && xhr.status < 300) {
      box.innerHTML = xhr.response;

      console.log(xhr.status); 
      console.log(xhr.statusText);
      console.log(xhr.getAllResponseHeaders());
      console.log(xhr.response);
    }
  } else {

  }
}
```

<br>

# 浏览器端, Ajax对象的属性和方法
### **<font color="#C2185B">xhr.open('GET', '路径');: </font>**
设置请求方式和从哪请求数据的服务器地址

    xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');


### **<font color="#C2185B">xhr.setRequestHeader('请求头的名字', '请求头的值'): </font>**
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 

Content-Type:  
设置请求体内容的类型 application/x-www-form-urlencoded 设置的是 post参数查询字符串的类型

    xhr.send('a=100&b=200&c=300'); 它的类型

<br>

### **自定义头信息:**
### **<font color="#C2185B">xhr.setRequestHeader('name', 'sam'): </font>**
填写自定义请求头信息的时候会报错  
因为我们添加了 自己自定义的请求头 不是预定义  
自定义的话 浏览器有安全机制 浏览器会告诉你 不能发console那里也有报错

**解决办法:**  
在服务器端设置响应头信息
response.setHeader('Access-Control-Allow-Headers', '*');

    *表示 所有类型的头信息我都可以接收

<br>

### **<font color="#C2185B">xhr.responseType = 'json'</font>**
可以将服务器端返回的结果自动转换为普通对象
```js 
const xhr = new XMLHttpRequest();

// 设置响应体的数据类型 自动将json转换为对象
xhr.responseType = 'json';
```

<br>

### **<font color="#C2185B">xhr.timeout = 2000</font>**
超时设置 2s之内还没有结果 请求就会被取消
在network 的 status中 显示	(canceled) 并且变成红色

<br>

### **<font color="#C2185B">xhr.ontimeout = function(){ ... }</font>**
超时回调
```js 
xhr.ontimeout = function(){
  alert('网络异常, 请稍后重试');
  //这是alert 有点不友好 真正的开发中我们可以用div 或者 遮罩层来显示
};
```

<br>

### **<font color="#C2185B">xhr.onerror = function() { ... } </font>**
网络异常回调
```js 
xhr.onerror = function(){
  alert('您的网络视乎出现了一些问题');
};
```       

<br>

### **<font color="#C2185B">xhr.abort()</font>**
取消Ajax请求

<br>

### **<font color="#C2185B">xhr.send()</font>**
使用这个方法发送请求

<br>

### **<font color="#C2185B">xhr.onreadystatechange = function() {} </font>**
当ajax对象状态发生改变的时候

<br>

### **<font color="#C2185B">xhr.readystate: </font>**
是xhr对象中的属性 表示状态 它有5个值
只有在4的时候 处理服务器返回的结果 因为全部返回

```js 
// 未初始化 最开始readystate属性的值就是 0
xhr.readystate === 0

// open方法已经调用完毕
xhr.readystate === 1

// send方法已经调用完毕
xhr.readystate === 2

// 服务端返回了部分的结果
xhr.readystate === 3

// 服务端返回了全部的结果
xhr.readystate === 4    
```

<br>

### **<font color="#C2185B">xhr.status: </font>**
响应状态码

<br>

### **<font color="#C2185B">xhr.statusText: </font>**
响应的状态字符串 OK

<br>

### **<font color="#C2185B">xhr.response: </font>**
响应体

<br>

### **<font color="#C2185B">xhr.getAllResponseHeaders()</font>**
可以打印所有响应头  
处理服务端返回的结果 结果包含4部分 行 头 空行 体 也就是上面的4个

<br>

### 案例: 点击按钮 发送请求
把服务端返回的结果在div中做一个呈现 ajax的两部分准备, 服务器端 和 浏览器端:  

<br>

### 服务器端:
使用express搭建服务器, 并配置路由规则

```js 
// 服务器端:
const express = require('express');
const app = express();

app.get('/server', (requset, response) => {
  const data = [
    {name:'sam', age:18},
    {name:'erin', age:17}
  ];
  let str = JSON.stringify(data);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.send(str);
});

app.listen(8000, () => {
  console.log('8000端口已开启');
})


// 浏览器端:
btn.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'http://127.0.0.1:8000/server');
  xhr.send();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {

        if(xhr.status >=200 && xhr.status < 300) {

        let data = JSON.parse(xhr.response);

        for(let item of data) {
          div.innerHTML += item.name + item.age;
        }

        console.log(xhr.status);
        console.log(xhr.statusText);
        console.log(xhr.getAllResponseHeaders());
      }
    }
  }
});
```

<br>

### 服务器端响应的数据格式:
上面服务器端只是向客户端响应了一段文字, 在真是的项目中, 服务器端大多数情况下会以json对象作为响应数据的格式  

当客户端拿到响应数据时, 要将json数据和html字符串进阶拼接, 然后将拼接的结果使用dom的方式响应在页面中

服务器端 给 浏览器端返回的数据类型 是 字符串型
在http请求与响应的过程中, 无论是请求参数还是响应内容, 如果是对象类型, 最终都会被转换为对象字符串进行传输

所以在客户端我们还需要将json字符串转换为json对象类型

<br>

#### **<font color="#C2185B">JSON.parse(): </font>**
将客户端返回的json字符串 转换为 json对象

<br>

### 接下来我们看看服务器端 给 客户端返回数据如果处理:
```js 
// 服务器端
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/responseData', (req, res) => {
  // 这里是服务器端, 准备给客户端发送一个json格式的数据
  res.send({"name":"张三"});
})

app.listen(3000);

console.log('服务器启动成功');


// 客户端
let xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/responseData');
xhr.send();
xhr.onload = function() {
  // console.log(xhr.responseText, typeof xhr.responseText);
  // 服务器端返回的数据是字符串类型

  // 要使用JSON.parse()方法将json字符串转换为json对象
  let responseText = JSON.parse(xhr.responseText);
  console.log(responseText);

  // 在真实的项目中我们需要将得到的json数据 和 html 字符串拼接展现在html文件里
  let str = `<h2>${responseText.name}</h2>`;
  document.body.innerHTML = str;
}
```

<br>

# 使用Ajax发送请求
在传统的网站当中 请求的参数都是通过表单的形式传递的

根据请求方式的不同, 表单内容会变成请求参数自动被拼接到对应的位置中
- get参数:  
  会被拼接到请求地址的后面

- post参数:  
  会被放到请求体当中
    
get请求 和 post请求 <font color="#C2185B">无论是哪种格式都是 请求名字=请求值</font> 的形式 多个参数之间用&进行分割

    http://www.example.com?username=zhangsan&password=123345
    根据请求方式的不同, 表单内容会变成请求参数自动被拼接到对应的位置中

在ajax中我们需要自己拼接请求参数, 根据请求方式的不同将请求参数放到对应的位置中

<br>

### **GET请求参数:** 
对于get请求, 参数是放在请求地址后面的用 ? 进行分割
```js
xhr.open('get', 'http://www.example.com?name=zhangsan&age=20');
```

使用ajax发送请求 我们需要自己拼接请求参数: 
```js 
// 我们获取到用户输入的数据后 要传递给服务器端, 所以要拼接成请求参数的格式
username=123&age=456

let params = `username=${nameValue}&age=${ageValue}`;
xhr.open('get', 'http://localhost:3000/get?'+ params);
```

<br>

### **需求:**
在这个页面中我们准备两个文本输入框 分别输入姓名和年龄 点击按钮后发送ajax请求并且将用户输入的姓名和年龄发送到服务器端

**服务器端:**  

**<font color="#C2185B">req.query: </font>**  
得到请求参数  


**<font color="#C2185B">res.send: </font>**  
发送响应到客户端    

```html 
<!-- 客户端 html部分: -->
<input type="text" id='username'>
<input type="text" id='age'>

<!-- 不是传统的form表单 所以不用使用submit -->
<input type="button" value='Send' id='btn'>

<script>
  // JS部分:
  let btn = document.querySelector('#btn');
  let username = document.querySelector('#username');
  let age = document.querySelector('#age');

  btn.addEventListener('click', function(){
    // 获取用户在文本框中输入的值
    let nameValue = username.value;
    let ageValue = age.value;

    // 我们获取到用户输入的数据后 要传递给服务器端, 所以要拼接成请求参数的格式
    // username=123&age=456

    let params = `username=${nameValue}&age=${ageValue}`;
    // console.log(params);

    // 当用户点击btn的时候 我们创建ajax对象发送请求
    // 创建ajax对象
    let xhr = new XMLHttpRequest();

    // 我们将拼接好的参数放在请求地址的后面
    xhr.open('get', 'http://localhost:3000/get?'+ params);

    xhr.send();
    xhr.onload = function() {
      console.log(xhr.responseText);
    }
  })


  // 服务器端
  const express = require('express');
  const path = require('path');
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/get', (req, res) => {
    // 我们使用req对象来获取客户端发送过来的请求参数, req返回的是对象类型的值
    // req.query 可以得到请求的参数

    // 我们再把拿到的请求参数 响应给客户端
    res.send(req.query);
  })
  app.listen(3000);
  console.log('服务器启动成功');
</script>
```

<br> 

### **POST请求参数:** 
post的请求参数不是放在地址栏后面的, 而是要放在请求体中,  
很简单我们只需要将请求参数放到 xhr.send('**请求参数**')

而且我们注意 post 请求默认的参数格式也是 key=value 的形式

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('name=zhangsan&age=20')

<br>

### **get请求 和 post请求在传递参数的时候有个重要的区别:**
- post请求必须在请求报文中明确设置 请求参数内容的类型

    Content-Type: application/x-www-form-urlencoded

<br>

#### **<font color="#C2185B">xhr.setRequestHeader(): </font>**
设置请求报文的头部信息
- 参数
- 报文名称
- 报文对应的值

 
**请求报文:**  
在http请求和响应的过程中传递的数据块就叫做报文, 包括要传送的数据和一些附加信息, 这些数据要遵守规定好的格式

报文主要分为两个部分, 报文头 和 报文体 
报文头中存储的是键值对的信息 可以理解为客服端 向 服务器端说的一些话

报文体主要存储一些内容 post的请求参数就是存储在报文体中的

<br>

### **浏览器端 请求头的设置:**
一般会把身份校验的信息放在头信息里面, 把它传递给服务器, 由服务器对参数做提取对用户的身份做校验

#### **<font color="#C2185B">xhr.setRequestHeader('请求头的名字', '请求头的值'): </font>**
```js
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
```

Content-Type: 设置请求体内容的类型  
application/x-www-form-urlencoded: 设置的是 post参数查询字符串的类型

    xhr.send('a=100&b=200&c=300'); 它的类型

<br>

### **AJAX发送POST请求:**
```js 
// 客户端:
div.addEventListener('mouseenter', () => {
const xhr = new XMLHttpRequest();
xhr.open('post', 'http://127.0.0.1:8000/server');
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status >= 200 && xhr.status < 300) {
      div.innerHTML = xhr.response;
    }
  }
}
})


// 服务器端:
app.post('/server', (requset, response) => {
  const data = {"name":"sam"}
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.send(data);
});
```

<br>

### 服务器 响应JSON数据
在实际工作中 我们向服务端发送请求, 服务端返回结果 实际上大部分都是JSON格式的数据  
所以我们要知道结果怎么处理 如果转换服务器端返回的json

#### **<font color="#C2185B">JSON.parse(): </font>**
```js 
let data = JSON.parse(xhr.response);
```

<br>

#### **<font color="#C2185B">xhr.responseType = 'json': </font>**
调用xhr对象的responseType属性

```js 
// 服务器端: 设置返回一个json对象
app.get('/server', (requset, response) => {

  const data = {name:"sam"}
  
  response.setHeader('Access-Control-Allow-Origin', '*');

  // 因为send()方法中只能放字符串和buffer 所以要将对象转换为字符串
  let str = JSON.stringify(data)
  response.send(str);
});


// 浏览器端
window.addEventListener('keydown', function() {
const xhr = new XMLHttpRequest();

// 方式2: 设置响应体的数据类型 自动将json转换为对象
xhr.responseType = 'json';

xhr.open('get', 'http://127.0.0.1:8000/server');
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status >= 200 & xhr.status < 300) {
      // 
      div.innerHTML =  xhr.response.name;
    }
  }
}
})
```

<br>

# AJAX IE浏览器的缓存问题:
ie浏览器会对AJAX的请求结果做一个缓存, 把结果缓存起来, 这样就会导致一个问题  
下一次再去发送请求时, 走的是本地缓存, 而并不是服务器返回的最新数据

这样对时效性比较长的场景 AJAX缓存会影响结果 不能正常去显示
数据一缓存就会导致正确的结果没办法呈现

**解决方法:** **<font color="#C2185B">在open()的url的最后添加 ?t='+Date.now() : </font>**
注意是键值对的形式

```js   
// 这次点和下次点的时间戳肯定不一样 不一样的话浏览器就会认为是两次不同的请求 这时候它就会重新发一个新的请求而不是本地的缓存  Date.now() 是获取当前的时间戳
xhr.open('GET', 'http://127.0.0.1:8000/ie?t='+Date.now());
```

<br>

# AJAX请求超时 与 网络异常处理:
我们的项目在上限后一定会出现网络异常的情况, 我们不能保证服务端永远及时快速的响应 所以肯定会遇到 请求超时 和 

这时候 我们可以通过 对 AJAX 做一个超时的设置 给用户来一个提醒 并且在网络异常的时候也给客户来一个友好的提醒 产品体验会更好一些

### **需求:**
这次我们做一个超时的设置, 超时设置为2秒, 如果两秒还是没有返回结果 我们就给用户做一个提醒
```js 
btn.addEventListener('click', function(){

const xhr = new XMLHttpRequest();

// 超时设置  2s之内还没有结果 我们的请求就取消
xhr.timeout = 2000;

// 超时回调
xhr.ontimeout = function(){
  alert('网络异常, 请稍后重试');
  //这是alert 有点不友好 真正的开发中我们可以用div 或者 遮罩层来显示
};

// 网络异常回调
xhr.onerror = function(){
  alert('您的网络视乎出现了一些问题');
};

xhr.open('GET', 'http://127.0.0.1:8000/delay');
xhr.send();
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4){
    if(xhr.status >= 200 && xhr.status < 300){
      result.innerHTML = xhr.response;
    }
  }
};
},false);
```

<br>

# 取消请求
在请求的过程当中, 在结果还没有回来之前, 我们可以通过代码来吧请求取消掉  
上一节延时的超时 是时间到了后 自动把请求取消了 **这次是手动取消**

#### **<font color="#C2185B">xhr.abort() </font>**
取消Ajax请求

```js 
<button>点击发送</button>
<button>点击取消</button>

// 为了使xhr 这个变量在两个按钮中都能用到 我们提取出来
let xhr = null;

btns[0].onclick = function(){
  xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://127.0.0.1:8000/delay');
  xhr.send();
};

btns[1].onclick = function(){
  // 使用这个访求取消请求的发送
  xhr.abort();
};
```

<br>

# 请求重复发送的问题
比如上面的案例 我创建了按钮用来发送请求 每点击一次就会创建一个请求  
有的时候服务响应的比较慢 用户疯狂的去点击  这时候服务器的压力就会有些大, 接收到非常多的请求  
而且是相同请求, 用户频繁发请求 服务器频发去处理


### **思路:**
我们可以这么做, 点击按钮后 看看之前有没有相同的请求 如果有 就把之前的请求取消掉 我们再发送一个新的请求, 这样我们发送的请求只会有一个 

我们在外部定义一个变量, ``let isSending = false;`` 代表当前ajax没有发送请求  
然后 我们考虑下 什么时候这个变量会为true, 当我们创建完ajax对象后就可以标识为true
```js 
btn.addEventListener('click', function() {
  const xhr = new XMLHttpRequest();

  // 创建 ajax 对象后 更新为 true
  isSending = true;
})
```

然后 什么时候这个变量会为false? 请求发送完成吧, 也就是在 xhr.readyState === 4 的时候 代码请求发送完成
```js 
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    
    // 这里将标识变量改为false
    isSending = false;

    if(xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.response);
    }
  }
}
```

**注意:**
不在状态码里修改这个变量, *因为状态码内的判断是永远成功的 那就意味着我们没办法把这个变量修改为false 因为请求很可能是个失败的请求*

目前我们的isSending已经可以成功标出是不是再发送AJAX请求, 既然我们已经用isSending标识出ajax的请求过程了, 那么就可以在按下按钮后进行判断 ajax是否正在发送 如果正在发送 则取消该请求创建一个新的请求
```js 
let isSending = false;

btn.addEventListener('click', function() {

  // 点击按钮的时候 根据 isSending 来进行判断
  if (isSending) xhr.abort()

  const xhr = new XMLHttpRequest();

  // 标识为发送中
  isSending = true;

  xhr.open('get', 'http://127.0.0.1:8000/server');
  xhr.send();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {

      // 响应结束后 设置回false
      isSending = false;

      if(xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
      }
    }
  }
})
```

<br>

#  使用JQ发送AJAX请求
### **<font color="#C2185B">$.get('服务器地址', {参数}, function(data) { ... }, 'json'): </font>**
### **<font color="#C2185B">$.post('服务器地址', {参数}, function(data) { ... }, 'json'): </font>**

**参数:**
- 给谁发
- 发送什么参数 参数类型是一个对象
- callback 回调中的参数data是响应体, 我们可以在这里会拿到的数据做操作
- 响应体的类型 表示响应体是json格式的数据 这样服务端返回的json数据会自动转成普通对象的格式, 但是会报错为啥

<br>

### **注意:**  
``$.get()``方法传递的参数在url上查看   
``$.post()``方法传递的参数在参数需要在 headers form data中查看

<br>

### **完整代码:**
```js
$('button').eq(0).click(function() {
  $.get('http://127.0.0.1:8000/jq-server', {a:100, b:100, c:200}, function(data) {
    console.log(data);
  })
})

$('button').eq(1).click(function() {
  $.post('http://127.0.0.1:8000/jq-server', {a:100, b:100, c:200}, function(data) {
    console.log(data);
  })
})
```

<br>

### **<font color="#C2185B">$.ajax({ ... }): </font>**
参数是一个对象 通过属性来设置内部的参数  

**<font color="#C2185B">url: </font>**  
给谁发  

<br>

**<font color="#C2185B">data: </font>**  
发送参数
```js
data: {action: "jQueryAjax"}
data: "action=jQueryAjax"
```
<br>
    
**<font color="#C2185B">type: </font>**  
请求类型

<br>

**<font color="#C2185B">dataType: </font>**  
*响应的*数据类型: 

- xml
- text
(如果我们定义为text是需要自己JSON.parse())

- json
(如果我们定义为json 不需要自己JSON.parse())

- html
- script
- jsonp

<br>

**<font color="#C2185B">success: </font>**  
成功的回调 这里对响应体的结果做一个处理

<br>

**<font color="#C2185B">timeout: </font>** 
超时时间

<br>

**<font color="#C2185B">error: </font>** 
失败的回调

<br>

**<font color="#C2185B">headers: </font>** 
设置自定义头信息

```js 
$.ajax({
  url: 'http://127.0.0.1:8000/jq-server',
  data: { a: 100, b: 100, c: 200 },
  type: 'get',
  dataType: 'json',
  success: function(data) {
    console.log(data)
  },
  timeout:2000,
  error: function() {
    console.log('出错啦');
  },
  headers: {
    c:300,
    d:400
  }
})
```

<br>

# 当报cookie的错误时:
crossorigin="anonymous"
```js 
// crossorigin="anonymous" 跨源的请求的属性设置 意思是 向后面的资源发送请求时 不会携带当前域名(cdn.bootcdn.net)下的cookie
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
```

<br>

# Axios: 
Axios是目前前端最热门的工具库, 它是AJAX的工具库, 使用的频率特别的高 也是Vue和react推荐的 AJAX请求的工具包

### **Axios的安装:**

npm:  

    npm install axios

<br>

cnd: 
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

<br>

#### **<font color="#C2185B">axios.get('服务器地址', {配置参数}): </font>**
配置参数: 
- params:    url参数, 格式是一个对象
- headers:   自定义头信息

<br>

### **配置baseURL:**

    axios.defaults.baseRUL = 'http://127.0.0.1:8000'


对响应体的处理在then()方法中
```js
axios.get('/axios-server', {

  // url参数
  params: {
    id:100,
    vip:7
  },

// 在这里对响应体进行处理
})
  .then(value => {
    console.log(value)
  })
```

<br>

#### **<font color="#C2185B">axios.post('服务器地址', {请求体参数}, {配置参数}): </font>**
post方法url参数 和 请求体可以同时设置  
参数1: 服务器地址  
参数2: 请求体  
参数3: 其它配置  

```js
axios.post('/axios-server', {
  // 请求体
  username: 'admin',
  password: 'admin'
}, {
  // url参数
  params: {
    id:200,
    vip:9
  }
}).then(value => {
  console.log(value);
})
```

<br>

#### **<font color="#C2185B">axios({ ... }): </font>**
```js 
axios({
// 请求方法
method: 'post',

// url
url:'http://127.0.0.1:8000/axios-server',
params: {
  vip:10
},

// 自定义头信息
headers: {
  name: 'sam'
},

// 请求体参数
data: {
  username: 'admin'
}
}).then(response => {
console.log(response);
console.log(response.status);
})
```

程序开发中离不开请求, 即使我们选择了第三方框架 我们也对这个第三方框架进行封装,  
然后使用我们自己封装好的模块进行网络请求  
我们不会直接使用第三方框架, 因为有一天它可能不维护了 或者 出现了严重的bug

<br>

### axios 框架的基本使用: 
这个框架支持多种请求方式  
axios(config)             通用  
axios.request(config)  
axios.get(url[, config])  
axios.delete(url[, config])  
axios.head(url[, config])  
axios.post(url[, data[, config]])  
axios.put(url[, data[, config]])  
axios.patch(url[, data[, config]])  

<br>

# axios 发送并发请求
axios提供如果想发送多个并发请求, 想**让这两个请求都成功之后再做响应处理的话**, axios提供了api  

### **<font color="#C2185B">axios.all(): </font>**
参数:  
传递一个axios请求数组 axios.all([请求1, 请求2]).then(成功的结果)  
then() 中会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results(请求成功返回的数据) 是一个数组[{}, {}]


```js
axios.all([
  // 请求1
  axios({
    url:'http://123.207.32.32:8000/home/multidata'
  }),

  // 请求2
  axios({
    url:'http://123.207.32.32:8000/home/data',
    params: {
      type: 'sell',
      page: 5
    }
  })

// 成功的部分
]).then(results => {

  // 这里会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results 是一个数组[{}, {}]
  console.log(results)
  console.log(results[0])
  console.log(results[1])
})

```

<br>

### **<font color="#C2185B">then(axios.spread((请求结果1, 请求结果2, ...) => { ... })): </font>**
上面我们是通过result[0] 通过下标的方式去读请求回来的数据的结果
axios直接给我们提供了直接获取请求结果的api
```js 
  axios.all([
    axios({
      url:'http://123.207.32.32:8000/home/multidata'
    }),
    axios({
      url:'http://123.207.32.32:8000/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })
  ]).then(axios.spread((res1, res2) => {

    // 直接获取的数据 不用通过下标的方式
    console.log(res1);
    console.log(res2);
  }))
```

<br>

## axios 的配置信息相关:
在上面的示例中, 我们的baseURL都是固定的, 事实上, 在开发中可能很多参数都是固定的, 这个时候我们可以进行一些抽取 也可以利用axios的全局配置

    baseURL: 123.207.32.32:8000

    比如固定的请求头的信息
    Content-Type : application/x-www-form-urlencoded

    比如超时时间, 5秒没有响应就超时了 等等
    这样如果有请多的请求, 那么每个请求中都有 baseURL timeout header 等代码就重复了 这时我们就可以进行全局配置

<br>

### **axios.defaults 配置axios的全局属性:**
我们可以将所有请求的公共部分, 放在 axios.default 中, 给它添加属性就是配置全局属性
写在哪都可以  
```js 
axios.defaults.baseURL = '123.207.32.32:8000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 5;   // 单位是毫秒 5000是 5秒
```

```js 
axios.defaults.baseURL = 'http://123.207.32.32:8000';
axios.defaults.timeout = 5;

axios.all([
  axios({
    // 因为我们配置了 baseURL 所以这里我们直接写接口
    url:'/home/multidata'
  }),
  axios({
    url:'/home/data',
    params: {
      type: 'sell',
      page: 5
    }
  })
]).then(axios.spread((res1, res2) => {
  console.log(res1);
  console.log(res2);
}))
```

### **axios常见的配置选项:**
请求地址: 
  - url: '/user'

请求类型:  
  - method: 'GET'

请根路径:  
  - baseURL: 'http://www.mt.com'

请求前的数据处理:  
  - transformRequest:[function(data){}]

请求后的数据处理:  
  - transformResponse:[function(data){}]

自定义请求头:  
  - headers: {'x-Requested-With' : 'XMLHttpRequest'}

URL查询对象:  
  - params: {id:12}

查询对象序列化函数:  
  - paramsSerializer: function(params) {}

请求体 request body:  
  - data: {key:'aa'}    

超时设置:  
  - timeout: 1000

跨域是否带Token:  
  - withCredentials: false

自定义请求处理:  
  - adapter: function(resolve, reject, config) { }

身份验证信息:  
  - auth: {uname: '', pwd: '12'}

响应的数据格式:  
json / blob / document / arraybuffer / text / stream
  - responseType: 'json'

<br>

# axios 的实例
上面我们了解了 axios.defaults 的方式给axios发送请求的时候配置全局的公共部分

为什么要创建axios的实例呢?
当我们从axios模块中导入对象时, 使用的实例是默认的实例  
当给该实例设置一些默认配置时, 这些配置就被固定下来了  
但是后续开发中, 某些配置可能会不太一样  
比如某些请求需要使用特定的baseURL或者timeout或者content-type等  

    但是有些情况会有 baseURL 不一样, timeout 也不一样的情况

这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息

<br>

### **服务器的概念:**
服务器有一个概念叫做分布式, 服务器在部署的时候, 当它的并发量(同时请求的数量)特别的高的情况下, 服务器可能就不能满足整个的业务需求, 同时有很多用户向服务器发送请求的时候, 服务器可能会处理不过来

当业务量特别的大的时候, 我们会搞很多个服务器, 那么这三个服务器的ip地址就会不一样

    服务器A   首页请求的服务器
    服务器B   类型请求的服务器
    服务器C   其它的东西的服务器

<br>

    客户端A                       服务器A

    客户端B     反向代理服务器     服务器B
                nginx部署
    客户端C                       服务器C

    客户端不管有多少客户面对的都是一个反向代理服务器
    nginx会根据哪一个服务器目前请求量不是很多, 来判断去哪一个服务器请求数据


假设 我们首页数据 我们要向 服务器A请求, 分类要向服务器B请求... 那么客户端就会有不同的ip地址(事实上不多, 事实上是上面我们了解的反向代理服务器的概念)

这个时候我们使用 axios.defaults 设置全局的baseURL就不合适了  
所以一般我们使用axios发送请求的时候 不会直接使用全局配置来进行网络请求, 而是先创建axios的实例

<br>

### **axios实例的使用方式:**
创建 axios 实例  通过 axios.create() 创建
```js 
const instance1 = axios.create({ 
  
  实例中配置 公共的配置
  比如
  baseURL
  timeout
  请求头信息等

});
```

通过 intance1({ ... }) 代替 axios({ ... }) 创建 请求: 
```js 
// 之前我们发送请求都是
axios({})

// 现在我们是通过创建的实例发送
instance1({})
```

```js 
// 创建 axios 实例 并在实例中配置公共配置
const instance1 = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
});

// 使用实例对象 发送请求
instance1({
  url:'/home/multidata'
}).then(res => {
  console.log(res);
})


// 使用同一个实例对象 发送请求
instance1({
  url: '/home/data',
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res);
})


// 创建新的实例, 在实例中填写新的 公共配置
const instance2 = axios.create({
  baseURL: 'http://222.111.32.32:5000',
  timeout: 10000,
  headers: ...
});
```

这样的话 每一个实例都会有自己独立的配置

以后在开发的过程中不要如下操作: 
我们在组件中引入了axios模块, 然后分别在script中发送了请求, 并展示在页面上  
当有多个组件并且都使用下面的方式发送请求的时候, 这样多个组件对第三方模块的依赖性太强了

问题是如果有一天axios这个框架不再维护了 那就懵逼了, 所以只有我们在进行开发的时候如有我们依赖了第三方的东西, 千万不要在每一个组件里面都对这个第三方的东西进行依赖  
```js
// 比如 我们在 app.vue 文件中要发送网络请求, 很多同学就会这样
import axios from 'axios'

<template>
  <div id='app'>

    // 将保存早data中的数据在页面中进行展示
    <div> {{result}} </div>

  </div>
</template>

export default {
  name:'App',
  data() {
    return {
      result: ''
    }
  }
  // 在组件被创建的时候发送网络请求
  created() {
    axios({
      url: 'http://123.207.32.32:8000/home/multidata'
    }).then(res=> {
      
      // 将我们取到的结果 保存在data中
      this.result = res
    })
  }
}
```

我们应该这样

                        axios     →       新的框架

                  对axios进行自己的封装

            ↙     ↙       ↓     ↘      ↘

      组件1     组件2     组件3     组件4     组件5


假如我们很多组件都需要依赖于axios进行依赖发送请求, 我们应该单独的创建一个文件之后所有的组件在做网络请求的时候都是面向 我们自己封装的文件  
而之后我们单独创建的文件在根据axios进行一个封装 如果有一天axios不维护了那么我只需要改 我们封装的文件就可以了  
以后再遇到第三方框架的时候都要用这种逻辑来使用

<br>

### **对 axios 进行封装:**
在src中创建 network 文件夹 创建 request.js 文件
```js 
// 也就是说其他组件在发送网络请求的时候 面向 request.js 文件就可以了 导出这个文件的时候 使用

export function request() { ... }

// 这样以后再有别的实例 还可以继续导出

export function request1() { ... }
export function request2() { ... }
```


**方式1:**   
request.js中 通过回调的方式 将请求的结果 和 错误对象 回调回去
```js 
export function request(config, success, failure) {

  // 创建 axios 实例 实例中写上公共配置
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 别人传递进来的config要传到实例里面才能进行网络请求 所以
  instance(config)
    .then(res => {

      // 通过success函数 将成功的结果回调出去
      success(res);
    })
    .catch(err => {

      // 通过failure函数 将失败的结果回调出去
      failure(err);
    })
}


// 组件中在使用的时候
request({
  url: 'home/multidata'

  // success回调函数
}, res => {
  // 这里可以打印 或者将结果保存在组件的data中
  console.log(res);

  // failure回调函数
}, err => {

  // 这里就是请求失败的错误对象err是axios回调出来的
  console.log(err)
})
```

<br>

**方式2:**  
调用者在传递参数的时候, 参数内部必须有 baseConfig, success, failure
相当于 组件在使用的时候 request({}) 中的{}就是config
```js 
// config对象里面有
{
  baseConfig: {
    配置
  },
  success: function() { ... }
  failure: function() { ... }
}
```

```js 
export function request(config) {

  // 创建实例
  const instance = axios.create({
    url: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  instance(config.baseConfig)
    .then(res => {
      config.success(res);
    })
    .catch(err => {
      config.failure(err);
    })
}


// 组件中在使用的时候
request({
  baseConfig: {
    url:'/home/data'
  },
  success: function(res) {
    console.log(res)
  },
  failure: function(err) {
    console.log(err)
  }
})
```

<br>

**方式3:**   
使用promise
```js 
// request.js

export function request(config) {
  return new Promise((resolve, reject) => {
    // 网络请求都是异步操作 我们把它放到这里
      const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
      })

      instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}


// 组件中调用
request({
  url: '/home/data'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

<br>

**方式4:**  
axios 通过 axios.create() 创建的对象本身就是promise对象 所以没有return new Promise
```js 
export function request(config) {
  // 网络请求都是异步操作 我们把它放到这里
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 这个实例本身返回的就是promise 所以组件中可以通过then catch拿到结果
  return instance(config)
}


// 组件中调用
request({
  url: '/home/data'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

<br>

# axios 拦截器的使用
在发送网络请求之前希望对某些请求做一些拦截, 比如拼接上一些东西或者查看是否携带了一些东西 在发送网络请求之前增加动画啦

axios提交了拦截器, 用于我们在发送每次请求或者得到响应后, 进行对应的处理
```js 
// 请求成功 和 请求失败 的拦截
instance.interceptors.request.use(config => {
  console.log('来到了request拦截success中')
  return config
}, err => {
  console.log('来到了request拦截failure中')
  return err
})


// 响应成功 和 响应失败 的拦截
instance.interceptors.response.use(response => {
    console.log('来熬了response拦截success中')
    return response.data
  }. err => {
    console.log('来到了response拦截failure中')
    return err
  })
```

<br>

### 拦截全局: axiox. : 
#### **<font color="#C2185B">axios.interceptors.request.use(cb)</font>**
<font color="#C2185B">拦截全局</font>axios的请求(成功和失败)

<br>

#### **<font color="#C2185B">axios.interceptors.response.use(cb)</font>**
<font color="#C2185B">拦截全局</font>axios的响应(成功和失败)

<br>

上面都是拦截的全局axios 还可以拦截axios创建的实例
```js
const instance = axios.create({

  // 还可以拦截实例 通过 instance 调用
  instance.interceptors.request
  instance.interceptors.response
})
```

<br>

### 拦截实例: instance. : 
#### **<font color="#C2185B">instance.interceptors.request.use(cb)</font>**

#### **<font color="#C2185B">instance.interceptors.response.use(cb)</font>**
**参数:**  
是两个函数, 一个请求 / 响应 成功的函数 一个请求 / 响应 失败的函数  
请求拦截中的参数是 config 拦截的是请求体(配置信息 比如 url method等)  
响应拦截中的参数是 res 拦截的是响应体(status data headers request等)  

**一般请求拦截会在这里处理什么逻辑?** 
- 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

- 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来  

- 某些网络请求(比如登录 token), 必须携带一些特殊的信息  - 

```js 
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 使用拦截器拦截实例, 请求拦截
  instance.interceptors.request.use(config => {

    // 拦截的是axios发送请求的配置 
    console.log(config)
  
    // 拦截到的config的return出去 要不内部的config外部拿不到
    return config

  }, err => {

    // 发送都没发送出去, 比如网络断掉了
    console.log(err)
  })


  // 使用拦截器进行响应的拦截
  instance.interceptors.response.use(res => {
    // res中里面有data, 我们真正有用的就是data 我们会从res中取出data
    console.log(res)
    
    // 在这里一样 我们做完处理完拦截响应的逻辑后 要将res.data返回出去 要不组件中得不到结果 返回data就可以
    return res.data

  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
```

<br>

### **请求拦截的作用:**
一般请求拦截中会处理什么逻辑?
- 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

- 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来

- 某些网络请求(比如登录 token), 必须携带一些特殊的信息 

<br>

# axios 取消请求: 
官网的位置:  
http://www.axios-js.com/zh-cn/docs/#%E5%8F%96%E6%B6%88

取消请求有两种方法: 

<br>

### **1. 可以利用CancelToken工厂函数创建cancel token:**
```js
const CancelToken = axios.CancelToken
// 再次通过 CancelToken.source() 拿到 source
const source = CancelToken.source();


// get的使用案例
// 在配置对象中 添加 cancelToken 
axios.get('user/12345', {

  cancelToken: source.token

}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message)
  } else {
    // TODO: handle error
  }
})


// post的使用案例
axios.post('/user/12345', {
  name: 'name what'
}, {
  cancelToken: source.token
})

// 执行取消请求操作
source.cancel(‘请求已取消’)
```


### **2. 传递executor函数到CancelToken的够造函数来创建cancel token:**
```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c
  })
})

// 执行取消请求操作
cancel()
```

<br>

# Mock 拦截 axios 请求
这个也是最终的需求功能, 我们假设axios异步请求的数据尚未上线或者不全  
我们请求的路径可能会报错 或者没有数据等 这种时候我们可以使用mock将请求拦截掉

然后再通过mock请求拦截, 随机生成填充的数据进行前端设计


### **Mock.mock('拦截的url', {mock的配置参数}):**
```js 
// 使用ajax获取数据
axios({
  method: 'get',
  url: 'https://cdn.liyanhui.com/data.json',
}).then(res => {
  console.log(res)
  // console.log(res.data.list[0].id)
})

// mock拦截
// Mock.mock('拦截的请求地址', {配置对象})
Mock.mock('https://cdn.liyanhui.com/data.json', {
  'list|5-10': [
    {
      'id|+1': 1,
      'username': '@cname',
      'email': '@email',
      'price': '@integer',
      'gender': '@boolean'
    }
  ]
})
```


### **总结:**
axios返回的res有data, status, statusText, headers, config等属性名, data是数据
所以一般我们要获取响应结果的数据的时候一般都是res.data

我们使用mock创建的数据 list是一个数组, 数组中有一个个的对象
<!-- 
  console.log(res.data.list[0].id)
 -->

<br>

# fetch()发送请求:
fetch()是属于全局对象的 可以直接去调用返回的结果是一个promise对象
响应的结果在then()方法中获取

#### **<font color="#C2185B">fetch(参数1, 参数2): </font>**
参数:
- 是一个请求资源的服务器地址 或者 是一个request对象
- 
      request处于实验阶段我们传递url就可以
<!--  -->

- 一个配置对象8包括所有对请求的设置)

    method:   请求方法
    headers:  自定义请求头
    body:     请求体

    键值类型可以写 查询字符串, 表单, buffer等等很灵活 

```js 
fetch('http://127.0.0.1:8000/fetch-server', {
  // 请求方法
  method: 'post',

  // 自定义请求头
  headers: {
    name: 'sam'
  },

  // 请求体, 键值类型可以写 查询字符串, 表单, buffer, 
  body: 'username=admin&password=admin'

// 将响应体转成对应的数据类型
}).then(response => {
  return response.text();

  // 如果服务器返回的结果是json 就调用json的方法, 把服务器端返回的对象转成普通对象
  return response.json();

}).then(response => {
  console.log(response)
})
```

<br>

# 跨域: 
同源策略 是浏览器的一种安全策略  

同源:  协议, 域名 端口号 必须完全相同

    当前网页的url 和 AJAX请求的目标资源的url 两者之间 协议, 域名 端口号 必须完全相同

    上面才是满足同源策略的 AJAX是默认遵循同源策略的 不满足同源策略是没办法发送AJAX请求的

    比如我当前网页的url是        我服务器的url也必须是
    http://a.com:8000           http://a.com:8000

    同源指的是同一个来源, 网页资源也是从某一个服务来的 比如百度京东 它们也是来自于某个服务器的

跨域:  违背同源策略就是跨域

    比如 
    a.com 向 b.com 发请求
    8000端口 向 3000端口 去发请求 也是跨域

    在项目中经常出现, 因为单台服务器它的服务是有上限的 它性能是有瓶颈的 这时候要加入更多的计算机 加更多的服务器

    那服务器以增加 我们这块 就会形成跨域  我们加了新的服务器后 可以对这些服务做一个划分, 使整个项目更流畅

但是AJAX在发送请求时 默认是要遵循同源策略的, 也就是说 不是同源没办发AJAX请求

<br>

### **同源策略的演示:**
我们看个小案例 首先我们从服务器端响应一个页面 点击页面中的按钮, 我们向127.0.0.1/9000 端口发送请求, 同时这个页面也是从 127.0.0.1/9000 端口, 响应回来的, 这就是同源

当处于同源的时候我们可以直接发送ajax请求, 说白了就是来自于同一个服务

```js 
// 服务器端:
const express = require('express');
const app = express();

app.get('/home', (request, response) => {
    // 响应一个页面 这个页面要写一个绝对路径
    response.sendFile(__dirname + '/index.html')
})

app.get('/data', (request, response) => {
    response.send('用户数据')
})

app.listen(9000, () => {
    console.log('9000端口已打开')
})


// HTML页面:
btn.addEventListener('click', function() {
  const xhr = new XMLHttpRequest();

  // 当满足同源策略的情况下url可以简写
  xhr.open('get', '/data');

  xhr.send();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
      }
    }
  }
})
```

<br>

# 解决方案: JSONP
### JSONP的get请求:
是一个非官方的跨域解决方案, 纯粹凭借程序员的聪明才智开发出来的, 只支持get请求

JSON怎么工作的？
它是借助于页面的``<script>``跨域的

    在网页有一些标签 天生具有跨域的能力, 比如 img link iframe script
    JSONP就是利用script标签的跨域能力发送请求的


简单的解释下跨域:  
比如  
A网页的 网址是 file:///D:/Memo/Sam/5_Learning_Content/AJAX/index.html  
能看出 file 协议 我们向127.0.0.1:9000端口发请求就是一个跨域请求, 因为协议 域名 端口都不一样

<br>

### **JSONP的使用:**
既然 ``<script>`` 本身就带有跨域的特性, 那么我们就可以利用  
``<script src='服务器地址'>`` 去发送请求,  
但是``<script>``要求的结果必须是函数调用的内容(一段js代码) 这样我前端浏览器才能解析执行里面的内容

**原理:**  
返回函数调用, 发想返回的数据作为实参放在函数调用里面 让前端的函数去做一个处理

HTML页面:
```html
    
<body>

  <!-- src中传入 服务器地址 -->
  <script src='http://127.0.0.1:9000/jsonp-server'></script>

</body>
```

服务器端:
```js
const express = require('express');
const app = express();

app.all('/jsonp-server', (request, response) => {

  // 返回的响应是一段函数
  response.send('console.log("jsonp")')
})

app.listen(9000, () => {
  console.log('9000端口已打开')
})

// 结果是可以拿到响应的
```

### **我们接下来把上面的例子 返回个json:**
返回的响应体结果是一个 fn({"name":"sam"})  
而函数的实参就是想给客户端的结果数据 但是在div上呈现的是 sam
```html
<!-- HTML页面: -->
<div class="box"></div> 
<script>

    // 处理数据 提前声明 不然会报错
    function fn(data) {
        const div = document.querySelector('.box');
        div.innerHTML = data.name
    }
</script>
<script src='http://127.0.0.1:9000/jsonp-server'></script>
```
```js
// 服务器端:
app.all('/jsonp-server', (request, response) => {
  const data = {
    name: 'sam'
  };

  let str = JSON.stringify(data);
  // 这里不能直接返回数据, 因为直接返回数据没办法进行处理
  response.end(`fn(${str})`)
})
```

<br>

### **解释说明的具体步骤:**
- 创建``<script>``, 在里面定义好函数, 用来处理对服务端的发送的函数调用
- 创建另一个``<script src='请求数据的服务器地址'>``, 注意要放在上面<scripte>的下面

```html
<!-- 这个标签可以动态创建 -->
<script>
  // 处理数据的函数 需要在上面提前声明 不然会报错
  function fn(data) {
    const div = document.querySelector('.box');
    div.innerHTML = data.name
  }
</script>
<script src='http://127.0.0.1:9000/jsonp-server'></script>
```

- 在服务器端response.end()中调用前端定义好的函数, 并将数据放作为实参传进去
```js 
    app.all('/jsonp-server', (request, response) => {
        const data = {
            name: 'sam'
        };
        let str = JSON.stringify(data);

        // 这里不能直接返回数据, 因为直接返回数据没办法进行处理, 所以要写一个函数调用
        response.end(`fn(${str})`)
    })
```

<br>

### 案例: 原生jsonp的实现
在表单中输入文字, 当失去焦点的时候向服务端发送请求, 对用户名做一个是否存在的检测(我们服务端直接返回一个已存在 不进行比对), 然后把input框的颜色变成红色

### **jsonp的具体步骤:**
- 在全局中定义处理服务器端返回的数据的函数
```js    
// 在全局中声明 处理服务端返回的结果的函数
function fn(data) {
  inp.style.background = 'pink';
  span.innerHTML = data.msg;
}
```

- 我们拿失去焦点触发事件为例, 在事件回调 记入重点
  - 动态创建script标签
  - script.src = '服务器请求地址'
  - 将script标签插入body的最后 appendChild()

- 服务器端, 将响应的数据通过 response.end()方法 发送回来 内容是1中的函数调用, 把返回数据放在实参里面
```js 
// 服务器端:
app.all('/server', (request, response) => {
  const data = {
    exist: 1,
    msg: '用户名已经存在'
  }
  let str = JSON.stringify(data)
  response.end(`fn(${str})`)
})


// 浏览器端:
let span = document.querySelector('span');
let inp = document.querySelector('input');

// 在全局中声明 处理服务端返回的结果的函数
function fn(data) {
  inp.style.background = 'pink';
  span.innerHTML = data.msg;
}

inp.addEventListener('blur', function() {
  // 获取用户的输入值
  const uname = this.value;

  // 向服务端发送请求检测用户名是否存在
  // file:///D:/Memo/Sam/5_Learning_Content/AJAX/index.html 这是当前文件的网址, file协议

  // 我们要向 http://127.0.0.1:9000/server 发请求 跨域吧

  // 动态创建script标签
  const script = document.createElement('script');

  // 设置标签的src属性
  script.src = 'http://127.0.0.1:9000/server';

  // 将script插入到文档中 插入到最后
  document.body.appendChild(script);
})
```

<br>

### jsonp 的封装:
在前端开发中 我们一种常见的网络请求方式就是jsonp, 使用jsonp最主要的原因万网是为了解决跨域访问的问题

**jsonp的原理:**  
jsonp的核心在于通过``<script>``标签的src来帮助我们请求数据  
原因是我们的项目部署在domain1.com服务器上时, 是不能直接访问domain2.com服务器上的资料的  
这个时候我们利用``<script>``标签的src帮助我们去服务器请求到数据, 将数据当做一个js的函数来执行, 并且执行的过程中传入我们需要的json

所以 封装jsonp的核心就在于我们监听window上的jsonp进行回调时的名称

**注意:**  
除了 img 的 src 是不用插入到dom结构中就可以发起请求 其他的标签必须要插入在dom结构中


```js
// 封装 jsonp
let count = 1;
export default function originPJSONP(option) {

  // 1 从传入的option中提取url
  const url = option.url;

  // 2 在body中添加script标签
  const body = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');


  // 3 内部生产一个不重复的callback
  const callback = 'jsonp' + count++

  // 4 监听window上的jsonp的调用
  return new Promise((resolve, reject) => {
    try {
      // 在 window 上添加 callback
      window[callback] = function(result) {
        // 执行 回调的时候先移除 script 然后将获取到的结果返回
        body.removeChild(script)
        resolve(result)
      }


      const params = handleParam(option.data);
      script.src = url + '?callback=' + callback + params;
      body.appendChild(script)

    } catch (err) {
      body.removeChild(script)
      reject(err)
    }
  })
}

function handleParam(data) {
  let url = ''
  for(let key in data) {
    let value = data[key] !== undefined ? data[key] :''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url
}
```


<br>

## JQ使用jsonp发送请求: 
### **<font color="#C2185B">$.getJSON(): </font>**
**参数:**
- 服务器请求地址?callback=?

      地址最后一定要加?callback=?
      我们这些写是有值的 值为一串数字标识符 这串标识符就是函数名(jQuery360020395885147502035_1621611428790)

      这个函数会和参数2中的回调函数映射起来
      用来做服务器端的函数名 用来调用

- 处理响应结果的回调函数

**服务器端:**  
#### **<font color="#C2185B">request.query.callback: </font>**
使用 **let cd = request.query.callback** 获取浏览器端注册的函数标识符
使用 函数标识符(返回的响应数据)

```js 
// 浏览器端:
$('button').click(function() {
  $.getJSON('http://127.0.0.1:9000/server?callback=?', function(data) {
    $('.box').html(`
      名称: ${data.name},
      校区: ${data.city[0]}
    `)
  })
})


// 服务器端:
app.all('/server', (request, response) => {
  const data = {
  name:'sam',
  city: ['bj', 'sh']
  }
  let str = JSON.stringify(data)

  let cd = request.query.callback;

  // 这里面用cd和返回数据做拼接
  response.end(`${cd}(${str})`)
})
```

<br>

# 解决方案: CORS
cors跨域资源共享 cors是官方的跨域解决方法,  
它的特点是不需要在客户端做任何的特殊操作, 完全在服务器中进行处理, 支持get 和 post请求, 跨域资源共享标准新增了一组 HTTP 首部字段, 允许服务器声明哪些源站通过浏览器有权限访问哪些资源

cors怎么工作的?  
cors是通过设置一个响应头来告诉浏览器, 该请求允许跨域, 浏览器收到响应以后就会对响应放行

也就是说:  
客户端怎么发请求, 我们就照着ajax的步骤去做就好了, 跨域的问题只要让服务端设置响应头就可以了

### **cors的使用:**
主要是服务器端的设置, 在服务端加上响应头的设置
```js
response.setHeader('Access-Control-Allow-Origin', '*')
response.setHeader('Access-Control-Allow-Headers', '*')
response.setHeader('Access-Control-Allow-Method', '*')
```


```js 
file:///D:/Memo/Sam/5_Learning_Content/AJAX/index.html

// 往 下面的网址发送请求 肯定跨域

http://127.0.0.1:9000/server



// 报错信息:
index.html:1 Access to XMLHttpRequest at 'http://127.0.0.1:9000/server' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
index.html:47 GET http://127.0.0.1:9000/server net::ERR_FAILED
```

CORS 头
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
