# 什么是BOM:
浏览器对象模型

它提供了独立于内容而与浏览器窗口进行交互的对象, 其核心对象是window

BOM缺乏标准, JS语法的标准化组织是ES, DOM的标准化组织是W3C, BOM最初是Netscape浏览器的标准的一部分 兼容性比较差

<br><br>

# DOM & BOM

|文档对象模型|浏览器对象模型|
|:---|:---|
|DOM就是把 [文档] 当做一个 [对象]|把 [浏览器] 当做一个 [对象] |
|DOM的顶级对象是[document]|BOM的顶级对象是[window]|
|DOM学习的是操作页面元素|BOM学习的是浏览器窗口交互的一些对象|
|DOM是W3C标准|BOM是浏览器厂商在各自浏览器上定义的, 兼容性差|

<br><br>

# 结构树
BOM比DOM更大, 它包含了DOM 我们看看下面的属性结构
```
                            window

    document   location   navigation   screen   history
```

我们平时写的 document.queryselector 其实应该是 window.document.queryselector

<br>

# BOM的构成
它是js访问浏览器窗口的一个接口 

它是一个全局对象, 定义在全局作用域中的变量, <font color="#C2185B">函数都会变成window对象的属性和方法</font>

在调用的时候可以省略window, 前面学习的对话框都属于window对象方法, 如: alert(), prompt()等

<br>

### 注意: 
window下的一个特殊属性 window.name 所以name变量不要用

<br><br>

# BOM事件
window.onload是窗口(页面)加载事件 

当文档内容完全加载完成会触发该事件(包括图像, 脚本文件, css文件等), 就会调用的该处理函数

window.onload传统注册事件方式只能写一次, 如果有多个, 会以最后一个window.onload为准
```js
window.onload = function(){ }
window.addEventListener('load', function(){ });
```

<br>

### <font color="#C2185B">DOMContentLoaded: 窗口加载事件</font>
DOMContentLoaded 事件触发时, **仅当DOM加载完成**, 不包括样式表, 图片, flash等
```js
document.addEventListener('DOMContentLoaded', function(){});
```

如果页面的图片很多的话, 从用户访问到onload触发可能需要较长的时间,    
交互效果就不能实现, 必然影响用户的体验, 此时用DOMContentLoaded事件比较合适 它的加载速度会比较快

<br>

### <font color="#C2185B">window.onresize: 调整窗口大小事件</font>
只要浏览器窗口大小发生变化时 就会触发此事件
```js
window.onresize = function(){}
window.addEventListener('resize' function(){});
```

<br><br>

# 窗口尺寸:
### <font color="#C2185B">window.innerWidth: 当前屏幕的宽度 高度 (没有单位)</font>
```js
// 当窗口小于800时 隐藏div
if(window.innerWidth <= 800){
  div.style.display = 'none';
}
```

<br><br>

# URL
URL全称: Uniform Resource Location 译为: 统一资源定位符  
是互联网上标准资源的地址, 互联网上每个文件都有一个唯一的url, 它包含的信息指出文件的位置以及浏览器应该怎么处理它
```s
http://www.baidu.com/index.html?name=mo&age=25#dowell
```

这算是一个比较完整的URL了 我就拿这个为例作为讲解, 包括: 
- 协议部分
- 域名
- 端口
- 路径(虚拟路径)
- 携带的参数
- 哈希值

<br>

## url一般的语法格式:
```s
protocol://host[:port]/path/[?query]#fragment

http://www.itcast.cn/index.html?name=andy&age=18#link
```
    
<br>

### <font color="#C2185B">protocol:</font>
通信协议 常用的http ftp matito等

<br>

### <font color="#C2185B">host:</font>
主机(域名) www.itheima.com

<br>

### <font color="#C2185B">port:</font>
端口号 可选 省略时使用方案的默认端口 如http默认端口80

<br>

### <font color="#C2185B">path:</font>
路径由零或多个/符号隔开的字符串, 一般用来表示主机上的一个目录或文字地址

<br>

### <font color="#C2185B">query:</font>
参数, 以键值对的形式 通过&符号分隔开来

<br>

### <font color="#C2185B">fragment:</font>
片段 #后面内容 常见于链接 锚点

<br>

## 协议部分 http https: 
传输协议是用来完成客户端和服务器端之间数据传输的 这个使用的是http协议在internet中可以使用多种协议 如: 
- http
- ftp 等本例中使用的是http协议http后面. 为"//"为分隔符;

<br>

### http协议:
客户端和服务器端传输的内容除了文本以外 还可以传输图片、音频和视频等文件流(二进制编码 | base64码)以及XML格式的数据等是目前应用最广泛的.

<br>

### https协议:
https它比http更加安全 因为 **数据内容的传输通道是经过SSL加密的** (需要在服务器端进行特殊的处理)涉及金融类的网站一般都是使用https;

<br>

### ftp资源文件传输协议:
用于客户端把资源文件(不是代码)上传到服务器端 或者从服务器端下载一些资源文件(一般传输的内容会比http这类协议传输的内容多)

<br><br>

## 域名: www.baidu.com
网站的域名baidu.com为一级域名 www为服务器;

1. 用于解析对应的IP地址便于记忆(一个URL中也可以使用IP地址作为域名使用);
2. 顶级域名(一级域名): baidu.com
  
3. 二级域名:
  - www.baidu.com  
  - sports.baidu.com  
  - ai.baidu.com

4. 三级域名:  
  - my.sports.baidu.com

<br><br>

## 端口: 在没有填写的情况下默认端口就是80;
在服务器发布项目的时候我们可以通过端口号区分当前服务器上不同的项目 如: 
```s
www.baidu.com:8080
```

一台服务器的端口号取值范围在 0 ~ 65535 之间 如果电脑上安装了很多程序有一些端口号是被占用的

端口不是一个URL必须的部分 如果省略端口部分将采用默认端口 

如果有的话就是跟在域名后面的就是端口(www.baidu.com:80)域名和端口之间使用 " : " 作为分隔符

- http: 默认端口号80
- https: 默认端口号443
- ftp: 默认端口号21 

对于以上三个端口号其实很重要如果被其他程序占用则我们就不能使用了 所以服务器上一般是禁止安装其他程序的.

<br><br>

## 路径(虚拟路径): index.html虚拟目录
```s
http://www.baidu.com/路径1/路径2

# / 表示根目录
```

在服务器中发布项目的时候我们一般都会配置一些默认文档 即使用户不输入文件的名称服务器也会默认找到配置好的文档(一般默认文档都是index.**)

为了做SEO优化会把一些动态页面的地址(xxx.php、xxx.aspx、xxx.asp、xxx.jsp)进行URL重写 (需要服务器处理)

<br><br>

## 携带的参数: ?key1=value1&key2=value2

### 问号传参(可有可无):
把一些值通过 "key=value" 的方式放在一个URL的末尾通过?传递

<br>

**作用:**    
在ajax请求中我们可以通过问号传递参数的方式在客户端把一些信息传递给服务器服务器根据传递信息的不一样返回不同的数据

<br>

**技巧:**  
清除ajax get方法的缓存 ``?math_random=0.123456`` 通过URL传递参数的方式实现页面之间的通信

<br><br>

## 哈希值: #dowell; (可有可无):
1. 可做页面中的锚点定位
2. 在单页应用开发中作为前端路由使用(Vue Router、React Router);

<br><br>

# BOM
浏览器对象模型 在BOM中为我们提供了一组对象, 用来完成对浏览器的操作
- DOM是通过JS操作 网页的
- BOM是通过JS操作 浏览器的

<br>

### <font color="#C2185B">window:</font>
window代表的是 整个浏览器的窗口, 同时window也是网页中的全局对象

<br>

### <font color="#C2185B">navigator:</font>
代表当前浏览器的信息, 通过该对象可以来识别不同的浏览器

<br>

**应用:**   
比如我用pc端打开的就是pc向的页面, 我用移动端打开的就是移动端向页面就是用了这个功能

它有很多的属性, 我们最常用的就是 uesrAgent 该属性可以返回由客户机发送服务器的user-agent头部的值 **userAgent用户代理 等价于 浏览器**

<br>

#### <font color="#E91E63">navigator.appName:</font>
返回浏览器的名称
```js
console.log(navigator.appName);     //Netscape
```
    
<br>

#### <font color="#E91E63">navigator.userAgent:</font>
是一个字符串, 这个字符串中包含有用来描述浏览器信息的内容, 不同的浏览器会有不同的userAgent

```js
console.log(navigator.userAgent)

// 火狐
Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0

// chrome
Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36

// IE8
Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1)

// IE9
Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)
```

**IE11 中已经将微软和IE相关的标识都已经去除了, 所以我们基本已经不能通过UserAgent来识别一个浏览器是否是ie11了**

<br>

## 案例: 怎么判断用户在哪个终端打开的页面 实现跳转
```js
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPad|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|WOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = '';      //手机
} else {
    window.location.href = '';      //电脑
}
```

<br><br>

# 案例: 怎么判断是火狐浏览器
```js
var ua = navigator.userAgent;

// 检查ua里有没有Firefox
if(/Firefox/i.test(ua)){
  alert("你是火狐");
}else if(/Chrome/i.test(ua)){
  alert("你是chrome");
};
```

```js
getBrowserInfo: function getBrowserInfo() {
  var userAgent = navigator.userAgent;
  var result = {
    os: '',
    osVersion: 0,
    name: '',
    version: 0,
  };

  var match = userAgent.match(/(opera|chrome|crios|safari|ucbrowser|firefox|msie|trident|edge|edg(?=\/))\/?\s*([\d\.]+)/i) || [];

  // ブラウザ名
  var tem = null;
  if (/trident/i.test(match[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
    result.name = 'Internet Explorer';
  } else if (match[1] === 'Chrome') {
    tem = userAgent.match(/\b(OPR|Edge|Edg)\/(\d+)/);
    if (tem && tem[1]) {
      result.name = (tem[0].indexOf('Edge') === 0 || tem[0].indexOf('Edg') === 0) ? 'Edge' : 'Opera';
    }
  } else if (match[1] === 'Safari') {
    result.name = 'Safari';
  }
  if (!result.name) {
    tem = userAgent.match(/version\/(\d+)/i); // iOS support
    result.name = match[0].replace(/\/.*/, '');

    if (result.name.indexOf('MSIE') === 0) {
      result.name = 'Internet Explorer';
    }
    if (userAgent.match('CriOS')) {
      result.name = 'Chrome';
    }
  }

  // ブラウザバージョン
  if (result.name == 'Safari') {
    var versionMatch = userAgent.match(/version\/([\d\.]+)/i);
    result.version = (versionMatch && versionMatch.length > 1)
      ? Lib.ua.toFloatFromVersionString(versionMatch[1])
      : Lib.ua.toFloatFromVersionString(match[match.length - 1])
  } else {
    result.version = Lib.ua.toFloatFromVersionString(match[match.length - 1]);
  }

  // OS名 / OSバージョン
  if (userAgent.match(/Android/i)) {
    result.os = 'Android';
    result.osVersion = Lib.ua.userAgentAnalyzer.osVersion.android(userAgent)
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    result.os = 'iOS';
    result.osVersion = Lib.ua.userAgentAnalyzer.osVersion.iOS(userAgent)
  } else if (userAgent.match(/Windows/i)) {
    result.os = 'Windows';
    result.osVersion = Lib.ua.userAgentAnalyzer.osVersion.windows(userAgent)
  } else if (userAgent.match(/Macintosh/i)) {
    if (result.name === 'Safari' && typeof document.ontouchstart !== 'undefined') {
      result.os = 'iPadOS';
      result.osVersion = Lib.ua.userAgentAnalyzer.osVersion.iPadOS(userAgent)
    } else {
      result.os = 'Mac';
      result.osVersion = Lib.ua.userAgentAnalyzer.osVersion.mac(userAgent)
    }
  }

  return result;
},
```

<br>

如果通过userAgent不能判断, 还可以通过一些浏览器中特有的对象, 来判断浏览器的信息 比如: 
- ActiveXObject 这是ie里独有的, ie中window的属性

```js
if(window.ActiveXObject){
  // 通过独有的对象来判断是不是ie
  alert("你是ie")
}

/*  
  但是对ie11不行, 但是没有进判断 因为ie11中 !!
  window.ActiveXObject 是 false 让人找不到ie, 道高一尺魔高一丈
  换个思路 alert("ActiveXObject" in window )
  检查这个对象里 是否有这个属性
*/
if("ActiveXObject" in window){           
  alert("你是ie")
}

```
   
<br><br>

## location:
代表当前浏览器的地址栏信息, 通过地址栏可以跳转页面, 封装的地址栏信息, **location的主要作用就是获得和设置url**
```js
location.href = 'www.baidu.com'
```

window对象给我们提供了一个 **location属性** 用于获取或设置窗体的URL, 并且可以用于解析url, 因为这个属性返回的是一个对象, 所以我们将这个属性也成为location对象

<br>

该对象中封装了浏览器地址栏的信息 如果直接打印location, 则可以获取到地址栏的信息（当前页面的完整路径）
```js
alert(location);    //获取到地址栏的信息
```

<br>

如果直接将location属性修改为一个完整的路径, 或相对路径 则我们页面会自动跳转到该路径,并且会生成相应的历史记录
```js
location = "https://www.baidu.com";
```

<br>

#### 常见的属性:

#### <font color="#C2185B">location.href:</font>
获取或者设置 整个url
```js
// 直接使用location一样
location = "https://www.baidu.com";
```

可以获取url 和 跳转到哪个url
```js
btn.addEventListener('click', function(){
  console.log(location.href)
})

// 页面跳转:
btn.addEventListener('click', function(){
  location.href = 'www.baidu.com'
})
```

<br>

#### <font color="#C2185B">location.search:</font>
返回参数

<br>

#### <font color="#C2185B">location.host:</font>
返回主机 域名

<br>

#### <font color="#C2185B">location.port:</font>
返回端口号 如果未写返回空字符串

<br>

#### <font color="#C2185B">location.pathname:</font>
返回路径

<br>

#### <font color="#C2185B">location.hash:</font>
返回片段 #后面内容 常见于锚点 链接

返回值  '#link'
```js
<div class="demo" id="demo">这个DIV, id是demo</div>

function onTopClick() {
  window.location.hash = "#domo";
}
```

<br>

#### 常见的方法: 
#### <font color="#C2185B">location.assign()</font>
用来跳转到其他的页面, 作用和直接修改location一样

它会记录浏览历史 所有带后退功能
```js
location = "https://www.baidu.com";

// 可以用该方法改成
location.assign("https://www.baidu.com");
```
    
<br>

#### <font color="#C2185B">location.replace()</font>
用新的文档替换当前文档 可以使用新的页面替换当前页面, 调用完毕也会跳转页面  

不会生成历史记录, 不能回退
```js
location.replace("https://www.baidu.com");
```

<br>

#### <font color="#C2185B">location.reload()</font>
重新加载当前文档 作用和 刷新 按钮一样  

如果在方法中 传递一个true, 作为参数 则会强制清空缓存刷新页面
```js
location.reload();      //刷新
location.reload(true);  //强制清空缓存刷新页面
```

<br>

### 案例: 5秒钟自动跳转主页
利用定时器 页面显示还剩多少秒
```js
let num = 5;
let timer = setInterval(function() {
  if(num == 5) {
    clearsetInterval(timer);
    location.href = 'www.baidu.com';
  } else {
    div.innerHTML = '您将在5秒后跳转到主页';
    num--;
  }
}, 1000)
```

<br><br>

## 案例: 获取url参数数据
主要实现数据在不同页面中传递  

### 核心思路:
- 第一个登陆页面里面有提交表单, action提交到 index.html页面  
- 第二个页面, 可以使用第一个页面的参数, 这样实现了一个数据不同之间的传递效果, 之所以可以就是第二个页面之间可以使用第一个页面的数据, 是利用了url里面的location.search参数

- 在第二个页面里还要对使用location.search获得的参数进行提取
- 第一步去掉? 利用substr
- 第二步 利用 = 号分割键和值 split()  

<br>

```html
<!-- 当前页面为login.html -->
<form action='index.html'>
  <!-- 表单有name属性才能提交 -->
  用户名:<input type='text' name='uname'> <input type='submit' value='登录'>
</form>
```

```js
// 这是在index.html里面的操作 来获取index.html传递过来的参数
console.log(location.search);   // ?uname=ANDY

// 只写一个参数代表 从1开始截取到最后
let str = location.search.substr(1); // uname=ANDY

// str.split() 会把一个字符串分割为数组
let arr = str.split('=');           // ['uname', 'ANDY'];

let div = document.querySelector('div');
div.innerHTML = arr[1];
```

<br>

### 将location.search转换为对象:
自己定义的方法:
```js
let query = "?uname=ANDY&age=18"

function getQuery(query) {
  let res = query.substr(1).split("&").map(item => {
    return item.split("=")
  })
  
  // 将二维数组转换为对象
  return Object.fromEntries(res)
}

let res = getQuery(query)
console.log(res);
```

<br>

### 将一维数组转换为二维数组 然后将二维数组转换为对象
一维数组 -> 二维数组
```js
// res为一维数组 利用map将其转换为2维
let map = new Map([res])

// 将二维数组转换为对象
return Object.fromEntries(map)
```

<br><br>

## history:
代表浏览器的历史记录, 可以通过该对象来操作浏览器的历史记录  
由于隐私的原因, 该对象不能获取到具体的历史记录 只能操作浏览器向前或向后 翻页, 而且该操作只在当次访问时有效, 打开网页 关闭网页叫一次

对象可以用来操作浏览器向前或向后翻页

<br>

#### <font color="#C2185B">history.length:</font>
可以获取到当次访问的链接数量, 也就是你看了几个页面, 关闭网页后记录就没有了
```js
history.length;
alert(history.length);
```
    
<br>

#### <font color="#C2185B">history.back()</font>
后退功能  
可以回退到上一个页面, 作用和浏览器回退按钮一样
```js
history.back();
```

<br>

#### <font color="#C2185B">history.forward()</font>
前进功能 
可以跳转到下一个页面, 作用和浏览器前进按钮一样
```js
history.forward();
```

<br>

#### <font color="#C2185B">history.go(number)</font>
前进后退功能 参数是1 前进一个页面 如果是-1 后退一个页面
可以跳转到指定页面, 它需要一个整数作为参数
- 1  向前跳转一个页面；
- 2  向前跳转两个页面
- -1 向后跳转一个页面
```js
history.go:(1);
```

<br>

#### <font color="#C2185B">history.pushState()</font>
HTML5为history对象添加了两个新方法, history.pushState()和history.
replaceState(), 用来在浏览历史中添加和修改记录。

- state: 一个与指定网址相关的状态对象, popState事件触发时, 该对象会传入回调函数。如果不需要这个对象, 可填null

- title: 新页面的标题, 但是所有浏览器都忽略这个值, 可填null

- url: 新的网址,必须与当前页面处在同一个域

```js
var stateObj = { foo: 'bar' };

// 数据 网页标题 网址
history.pushState(stateObj, 'page 2', '2.html');
```

假定当前网址 example.com/1.html 我们使用pushState方法在浏览器记录中添加一个新纪录。添加上面这个新记录后, 浏览器的地址栏立刻显示 example.com/2.html。  

它只是成为浏览器历史中的最新记录。  

假定这是你访问了google.com, 然后点击了倒退按钮, 页面的url将显示2.html 但是内容仍是原来的1.html。再点击一次到倒退, url将显示1.html.内容不变

**pushState方法不会触发页面刷新**, 只是导致hisotry对象发生变化, 地址栏会有反应

<br>

#### <font color="#C2185B">history.replaceState()</font>
history.replaceState方法的参数同上, 区别说它修改浏览器历史中当前历史记录。

<br>

### <font color="#C2185B">screen:</font>
代表用户屏幕的信息, 通过该对象可以获取到用户的显示器的相关的信息

<br><br>

# DOM
DOM 全称 document object model 文档对象模型

js中通过DOM来对HTML文档进行操作只要理解了DOM就可以随心所欲的操作web页面 

<br>

### 文档:
就是整个的HTML网页文档

<br>

### 对象:
表示将网页中的每一个部分都转换为了一个对象

<br>

### 模型:
使用模型来表示对象之间的关系这样方便我们获取对象

<br>

我们获取过来的DOM元素是一个对象(object), 所以称为文档对象模型

<br><br>

## DOM树:
```html 
<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
</head>

<body>
  <a href="#">超链接</a>
</body>
</html> 
```

上面的页面比如 1.html 也是个对象html下面有谁？html标签
```
          文档
          ↓
          html
      ↙         ↘
  head            body
    ↓               ↓
  title             a  →  属性: href
    ↓               ↓
标签里的文字      标签里的文字
 (文本节点)       (文本节点)
```

<br>

### 文档:
DOM中使用 document表示

<br>

### 元素:
DOM中使用 element表示(页面中的所有标签都是元素)

<br>

### 节点:
网页中所有内容都是节点(标签 属性 文本 注释)DOM中使用node表示

我们的互联网就是由一个个节点构成的 每一个计算机 每一个路由器 每一个交换机都是节点, 是节点构成了整个网络

是构成我们网页的最基本的组成部分 网页中的每一个部分都可以成为是一个节点, html标签 属性 文本 注释 整个文档 等都是一个节点

虽然都是节点但是实际上他们的具体类型是不同的

- 标签称为 元素节点
- 属性称为 属性节点
- 文本称为 文本节点
- 文档称为 文档节点

节点的类型不同属性和方法也都不仅相同

<br>

### 常用的节点分为四类:
1. 文档节点: 整个html文档
2. 元素节点: html文档中的html标签
3. 属性节点: 标签属性
4. 文本节点: html标签中文本内容

```html
<p id="pId">This is a pargraph</p>

<!-- 
  - <p></p>         元素节点
  - id="pId"        属性节点
  - This is a...    文本节点
 -->
```

<br>

### 节点的属性:
我们可以通过 节点对象.属性 的方式 或者节点的信息 比如

<br>

**<font color="#C2185B">节点.nodeName</font>**  
获取节点的名称

<br>

**返回值:**  
大写英文字符串, 如 DIV

<br>

||nodeName|nodeType|nodeValue|
|:--|:--|:--|:--|
|文档节点|#document|9|null|
|元素节点|标签名|1|null|
|属性节点|属性名|2|属性值|
|文本节点|text|3|文本内容 空格换行都是|

```js
let btn = document.querySelector("button")
console.log(btn.nodeName)   // BUTTON
console.log(btn.nodeType)   // 1
console.log(btn.nodeValue)  // null

console.log(document.nodeName)  // #document
```

<br>

### 文档节点 document
代表的是整个html文档网页中的所有节点都是它的子节点

document对象作为window对象的属性存在的 我们不用获取可以直接使用  

通过该对象我们可以在整个文档访问内查找节点对象并可以通过该对象创建各种节点对象 

<br>

### 元素节点 Element
html中的各种标签都是元素节点  
这也是我们常用的一个节点, 浏览器会将页面中所有的标签都转换为一个元素节点, 我们可以通过document的方法来获取元素节点

比如: 根据id属性值获取一个元素节点对象
```js
document.getElementById()
```

<br>

### 文本节点 Text
文本节点表示的是html标签以外的文本内容 任意非html的文本都是文本节点, 它包括可以字面解释的纯文本内容

文本节点一般是作为元素节点的子节点存在的 获取文本节点时一般要先获取元素节点 再通过元素节点获取文本节点

比如: 获取**元素节点的第一个子节点一般为文本节点**
```js
元素节点.firstChild
```

<br>

### 属性节点 Attr
属性节点表示的是标签中的一个一个的属性 这里要注意的是属性节点并非是元素节点的子节点, 而**是元素节点的一部分**
可以用过元素节点来获取指定的属性节点

比如:
```js
元素节点.getAttributeNode("属性名");
```

<br><br>

# 文档的加载
```html 
<button id="btn">我是一个按钮</button>
```

```js
var btn = document.getElementById('btn');

btn.onclick = function(){
  alert("你还点？");
}
```

浏览器加载一个页面时是按照自上向下的顺序加载的 读取到一行就运行一行
如果将script标签写在页面的上面时 在代码执行时页面还没有加载, 页面没有加载 DOM对象也没有加载 会导致无法获取到DOM对象

<br>

### 写上面好还是写下面好?
如果追求性能的话写下面 后加载后执行, 写在上面好管理 好修改

<br>

### **<font color="#C2185">window.onload 事件</font>**
该事件会在整个页面加载完成之后才触发  
该事件对应的响应函数将会在页面加载完成之后执行, 这样可以确保代码执行时所有的dom对象已经加载完毕了

```js
window.onload = function(){ };
```

<br><br>

# DOM 查询

### **<font color="#C2185">console.dir()</font>**
打印我们返回的元素对象, 更好的查看里面的属性和方法

<br>

### **<font color="#C2185">document.body</font>**
获取 body

<br>

### **<font color="#C2185">document.documentElement</font>**
获取 html
```js
let body = document.body
console.log(body)       // <body>...</body>

let html = document.documentElement
console.log(html)       // <html>...</html>
```

<br><br>

## 获取页面元素

### **<font color="#C2185">document.getElementById("id")</font>**
通过 id属性 获取 一个 元素节点对象

<br>

### **<font color="#C2185">document.getElementsByName("")</font>**
通过 name属性 获取 一组 元素节点对象

**以伪数组的形式存储**, 得到的元素是动态的, 上面html部分的内部变了 下面js的结果也会变

<br>

**注意:**  
页面中只有一个也是以数组返回 页面中没有这个元素的话, 返回的是空的伪数组

<br>

### **<font color="#C2185">document.getElementsByClassName('类名')</font>**
根据类名返回元素节点

H5新增的方法, ie678不支持, 但是移动端没有问题 

返回的也是伪数组

<br>

### **<font color="#C2185">document.querySelector('选择器');</font>**
H5新增的方法, ie8可以使用这个代替className 但是移动端没有问题

<br>

### **<font color="#C2185">document.getElementsByTagName("")</font>**
通过 标签名 获取 一组 元素节点对象

<br>

### **<font color="#C2185">元素对象.getElementsByTagName("")</font>**
获取元素节点的子节点

<br><br>

# 获取 父节点 子节点 兄弟节点
利用DOM提供的方法获取元素(id TagName等), 逻辑性不强, 繁琐

利用节点层级关系获取元素(父子兄)节点关系获取元素, 逻辑性强, 但兼容性差, 但是节点操作获取元素更简单一些

**注意:**  
页面中所有的东西都是节点 比如空格

<br>

### **<font color="#C2185">元素对象.parentElement</font>**
### **<font color="#C2185">元素对象.parentNode</font>**
**不会获取到空白文本因为父元素就一个**

parentNode属性 **表示当前节点的父节点**

得到的是离元素最近的父级节点(*亲爸爸*) 找不到父节点就为null
```js
let p = document.querySelec('p')
p.parentNode;
```

<br>

### **<font color="#C2185">元素对象.childNodes</font>**
**标准, 一般不使用**

表示 当前节点 的所有 子节点

<br>

**返回值:**  
节点类数组

<br>

**要点:**
1. 只找子元素不找后代
2. 这个属性 会获取 包括文本在内的所有节点, 标签和标签之间的空白也会当成文本节点  
但是在ie8以及以下的浏览器中不会将空白文本当成子节点, 所以该属性在ie8中会返回4个子元素而其他浏览器是9个
```js
// 可以利用 nodeType 来挑选元素节点, 不要文本节点(空格)
let ul = document.querySelector('ul');
console.log(ul.childNodes);

for(let i=0; i<ul.childNodes.length; i++) {
  if(ul.childNodes[i].nodeType == 1) {
    console.log(ul.childNodes[i]);
  }
}
```

<br>

### **<font color="#C2185">元素对象.children</font>**
推荐, 各个浏览器都支持 **只找子元素不找后代**

children属性可以获取 当前元素 的所有子元素(一说元素肯定是标签了也就是不会返回空白了)

**不会返回空白节点**

<br>

### **<font color="#C2185">元素对象.firstChild</font>**
firstChild属性 表示当前节点的第一个子节点(包括空白文本节点)

<br>

### **<font color="#C2185">元素对象.firstElementChild</font>**
不建议使用, 兼容性的问题 只兼容ie9以上如果做pc端的话肯定要兼容ie8的

firstElementChild属性 获取 当前元素 的 第一个子元素

<br>

### **<font color="#C2185">元素对象.lastChild</font>**
lastChild属性 表示当前节点的最后一个子节点(包括空白文本节点)

<br>

### **<font color="#C2185">元素对象.lastElementChild</font>**
lastElementChild属性 获取 当前元素 的 最后一个子元素

不建议使用, 兼容性的问题 只兼容ie9以上如果做pc端的话肯定要兼容ie8的

<br>

### 技巧: 如何获取 第一个 和 最后一个 节点的问题
- 第一个元素子节点: ul.children[0]
- 最后一个元素子节点: ul.children[ul.children.length-1]

<br>

### **<font color="#C2185">元素对象.previousSibling</font>**
previousSibling属性 表示当前节点的前一个兄弟节点

会获取到空格 #text, 也可能获取到空白文本

<br>

### **<font color="#C2185">元素对象.previousElementSibling</font>**
不会获取到空白文本  
previousElementSibling属性 表示获取前一个兄弟元素IE8以下不支持

<br>

### **<font color="#C2185">元素对象.nextSibling</font>**
属性 表示当前节点的后一个兄弟节点, 也可能获取到空白文本
会获取到空格 #text

<br>

### **<font color="#C2185">元素对象.nextElementSibling</font>**
nextElementSibling属性 表示当前节点的后一个兄弟节点, IE8以下不支持

<br>

### **<font color="#C2185">元素对象.innerHTML</font>**
通过这个属性可以获取到元素内容(标签体)的html代码

可以获取到标签内的内容 **但是对于自结束标签 没有意义 获取到的内容为空**

<br>

### **<font color="#C2185">元素对象.innerText</font>**
该属性可以获取到元素内部的文本内容
它和innerHTML类似不同的是它会自动将HTML标签去除, **innerHTML有标签innerText没有标签 就这么个区别**

<br>

### **<font color="#C2185">元素对象.outerHTML</font>**
innerHTML 获取的是 给定元素对象内部的 HTML 结构

比如:
```html
<div>
  <span>test</span>
</div>
```

- innerHTML 获取的是 ``<span>test</span>``
- outerHTML 获取的是 包含给定元素对象在内的HTML结构, **outerHTML 获取的是 全部**

<br>

outerHTML获取到的结果如下:
```html
<div>
  <span>test</span>
</div>
```

<br>

**注意:**  
该方法火狐不认 所以针对这里要做兼容处理

<br>

**处理方式:**  
思路: 我要获取的是 目标节点(包括目标节点) 也就是 app 本身
```html
<div id="app">
  内容
</div>
```

但是火狐不认 那我就创建一个 div作为container 然后让这个 container中添加 复制后的 app节点
```html
<div id="container">
  <!-- cloneNode(true)后的app -->
  <div id="app">
    内容
  </div>
</div>
```

然后 我们取 container.innerHTML 不就能取到 app 了么

```js
if(el.outerHTML) {
  return el.outerHTML
} else {
  // 兼容处理
  const container = document.createElement("div")
  container.appendChild(el.cloneNode(true))
  return container.innerHTML
}
```

<br>

### **<font color="#C2185">元素对象.outerText</font>**
获取给定元素对象在内的文本

<br><br>

# 创建节点 

### **<font color="#C2185">document.createElement("")</font>**
可以用于创建一个元素节点对象 需要一个标签名作为参数

将会根据该标签名创建元素节点对象 并将创建好的对象作为返回值返回

<br>

### **<font color="#C2185">document.createAttribute("属性名")</font>**
创建属性节点

```js
let attr = document.createAttribute('class');
attr.value = 'box1';
h1.setAttributeNode(attr)
```

**注意:**
- 元素节点.setAttributeNode(): 该方法可以只设置属性名
- 元素节点.setAttribute('属性名', '属性值'): 该方法需要同时设置属性名 和 属性值

<br>

### **<font color="#C2185">document.createTextNode("")    </font>**
可以用于创建一个文本节点对象

**需要一个文本内容作为参数**, 将会根据该内容创建文本节点并将新的节点返回

<br><br>

# 插入 删除 替换

### **<font color="#C2185">父元素对象.appendChild()</font>**
**父节点的最后添加**

调用父元素的方法 向一个父节点中添加新的子节点 

<br>

**注意:**
该方法是用来添加节点 而不是内容

<br>

### **<font color="#C2185">父元素对象.inserBefore(新节点, 指定节点)</font>**
**指定节点的前面添加**

调用父元素的方法 在指定的子节点前面插入新的子节点

<br>

**参数:**  
1. 新节点
2. 指定节点

```js
let li = document.createElement('li');
ul.insertBefore(li, ul.children[0]);
```

<br>

### **<font color="#C2185">元素对象.insertAdjacentHTML(position, text)</font>**
以直接把字符串格式元素添加到父元素中

将指定的文本解析为HTML或XML并将结果节点插入到DOM树中的指定位置

它不会重新解析它正在使用的元素因此它不会破坏元素内的现有元素 这避免了额外的序列化步骤使其比直接innerHTML操作更快 

<br>

**参数:**  
1. 插入的位置 可选值如下:
  - beforebegin: 元素自身的前面(插入到父元素的前面, 外部)
  - afterbegin: 插入元素内部的第一个子节点之前
  - beforeend: 插入元素内部的最后一个子节点之后 相当于appendChild
  - afterend: 元素自身的后面(插入到父元素的后面, 外部)

2. 插入的字符串

<br>

- before after 指的是 指定节点的外部的位置
- begin end 指的是 元素内部的位置

```js
let html = '<div id='two'>two</div>';
div.insertAdjacentHTML('beforeend', html)

/*
appendChild不支持追加字符串的子元素(只能通过createELement创建的元素才能用appendchild) 
    
insertAdjacentHTML支持追加字符串的元素
*/
```


<br>

### **<font color="#C2185">父元素对象.removeChild()</font>**
**删除子节点**

<br>

**更常用的方式:**  
子节点.parentNode.removeChild(子节点)

<br>

**场景:**
```js
if(ul.children.length == 0) {
  this.disabled = true;
} else {
  ul.removeChild('li')
}
```

<br>

### **<font color="#C2185">父元素对象.replaceChild(新节点, 旧节点)</font>**
**替换操作**

可以使用新子节点替换已有的子节点

<br>

### **<font color="#C2185">元素对象.remove()</font>**
**删掉该元素对象**

<br>

### **<font color="#C2185">要克隆的节点.cloneNode(浅拷贝(false) / 深拷贝(true))</font>**
这个方法返回调用该方法的节点的一个副本, 也成为克隆节点 / 拷贝节点

<br>

**参数:**  
- false: 浅拷贝 只复制节点本身 (默认值: false)
- true: 深拷贝 复制节点里面的内容

```js
let ul = document.querySelector('ul');

let lili = ul.children[0].cloneNode(false / true);
ul.appendChild(lili);
```

<br><br>

# 获取和设置 节点属性:

### **<font color="#C2185">元素对象.属性值</font>**
获取内置属性值(元素本身自带的属性)
```html
<div id='demo'></div>
div.id
```

<br>

### **<font color="#C2185">元素对象.getAttribute('属性名')</font>**
返回指定的属性值

```js
元素对象.getAttribute('id');            // demo
元素对象.getAttribute('自定义属性')
```

<br>

### **<font color="#C2185">元素对象.setAttribute('属性名', ‘属性值)</font>**
把指定属性设置或修改为指定的值, 可以获取自定义属性

ie8以及以下不支持该属性
```js
元素对象.setAttribute('type', 'button');
```

<br>

### **<font color="#C2185">元素对象.setAttributeNode('class')</font>**
在指定元素对象中设置属性

示例:
```js
// 1.创建属性 或者说 创建属性节点
let class = document.createAttribute('class');

// 2.在创建的属性中添加值
class.value/nodeValue = 'box1';

// 3.在指定元素对象内部 添加属性节点
元素对象.setAttributeNode('class')
```

**属性名才有value, 节点的话只能用innerHTML**

<br><br>

# 自定义属性 data-
往HTML标签上添加自定义属性来存储和操作数据

**自定义属性是为了保存并使用数据**, 有些数据可以保存到页面中而不用保存到数据库中

<br>

### 应用场景:
比如京东左侧的导航栏 一组一组的有手机 有家用电器 有家具等等

这时我们在有东西需要放在一组一组的归类中, 那么怎么区分应该放到哪组里(是家具还是手机还是家用电器的) 这是时候我们就习惯用自定义属性来进行区分, 比如data-index='1' 

<br>

### data-的使用方式:
在标签内部加上自定义如下的格式
```js
data-属性名 = '属性值'

<div id="test" data-src='links/1.jpg'></div>
```

<br>

### 读取data-属性值: 方式1
### **<font color="#C2185">节点.getAttribute('data-src');</font>**
```js
let box = document.querySelector('#test');
let result = box.getAttribute('data-src');
console.log(result);
```

<br>

### 设置data-属性值: 方式1
### **<font color="#C2185">节点.setAttribute('data-src', 'value')</font>**
```js
let box = document.querySelector('#test');
box.setAttribute('data-src', 'haha');
console.log(box);
```

<br>

### 读取 和 设置 data-属性值: 方式2
通过 datset 属性来 获取 和 设置 属性值

<br>

### 读取:
### **<font color="#C2185">节点.dataset.属性名</font>**

<br>

### 设置:
### **<font color="#C2185">节点.dataset.属性名 = '属性值'</font>**

注意: 属性名为驼峰格式的时候 会被转换为 xxx-xxx 的形式
```js
box.dataset.otherName = 'otherValue'
console.log(box);
// data-other-name="otherValue"
```

<br>

### 删除:
设置成null 或者 delete

<br>

### **<font color="#C2185">节点.dataset.属性名 = null;</font>**

### **<font color="#C2185">delete 节点.dataset.属性名;</font>**

<br>

### 扩展: jQ方法
```js
let obj = $('obj');
console.log(obj.data('属性名'));
```

<br><br>

# 修改 元素节点 的内容(标签体部分)

<br>

### **<font color="#C2185">元素对象.innerHTML</font>**
起始位置到终止位置的全部内容, 包括内部的html标签 同时保留空格和换行

<br>

### **<font color="#C2185">元素对象.innerText</font>**
起始位置到终止位置的内容, 但它取出html标签, 同时空格和换行也会去掉

<br>

### 区别:
- innerText 不识别html标签, 写在里面的标签会会直接显示, 非标准
- innerHTML 识别标签, w3c推荐

**这两个属性是可读写的**

<br><br>

# 三种创建元素的方式
- document.write()
- element.innerHTML
- document.createElement()

<br>

### **<font color="#C2185">document.write()</font>**
这种方法是直接将内容写入页面的内容流, **但是文档流执行完毕 则它会导致页面的全部重绘**
```js
document.write("<div>haha</div>")
```

<br>

### 扩展: 重绘
文本流执行完毕 就是代码从上到下走了一遍, 重绘相当于创建了一个新页面 新页面里只有div
```js
// 我们会经常 点击一个按钮后创建一个元素 如果使用这个方式会创建一个新页面
btn.onclick = function() {
  document.write('<div>123</div>')
}
```

<br>

### **<font color="#C2185">element.innerHTML</font>**
这种方式是将内容写入某个dom节点 不会导致全部重绘

单个标签的话 innerHTML 和createElement 性能没有太大的区别 当特别多的时候 这种方式很慢, 但结合数组的形式会快很多

```js
元素对象.innerHTML = `<a>百度</a>`
```

<br>

**结合数组的方式, 性能会更好**
1. 循环生成标签字符串
2. 将标签字符串push到数组中
3. 使用 join() 方法将数组转成字符串
4. 使用 innerHTML() 方法将所有标签字符串添加到元素对象中
```js
let arr = [];
for(let i=0; i<100; i++){
  arr.push('<a>百度</a>');
}
元素对象.innerHTML = arr.join('');
```

<br>

### **<font color="#C2185">document.createElement()</font>**
创建多个元素的效率稍微低一点点, 没有innerHTML 搭配 数组性能好 但是结构更清晰
```js
let a = document.createElement('a');
元素对象.appendClild(a);
```

<br><br>

# 表单元素的属性操作
利用DOM可以操作如下表单元素的属性

- type 
- value 
- checked 
- selected 
- disabled

如果想要某个表单被禁用, **不能再点击disabled属性**

<br><br>

# 设置 元素对象 的 样式 & 属性
我们可以通过js修改元素的大小, 颜色, 位置等样式

<br>

### **<font color="#C2185">元素对象.style</font>**
通过style样式操作, **产生的是行内样式**, css权重比较高

如果样式比较少 功能比较少的时候 可以用这个

<br>

### **<font color="#C2185">元素对象.className</font>**
当样式比较多的时候, 功能复杂的时候 我们可以使用className这个方法

会覆盖原先的类名 **为了避免覆盖原有的class内容 可以使用 +=**

<br>

**使用步骤:**
1. 先定义 .test 的css样式
2. 使用 节点.className 属性 为节点追加 test 样式
3. 使用 += 因为就是拼接字符串
4. 新类名前必须加上空格

```js
this.className = '原先的类名 类名'


const child = document.querySelector(".child")
// 注意test前面的空格
child.className += " test"
```

<br><br>

## classList属性
该属性用于对元素的clas做如下的操作:
- 添加 
- 移除
- 切换

**该系列方法是对class的操作, ie10以上才支持 使用于移动端**

<br>

### 获取 class列表
### **<font color="#C2185">元素对象.classList</font>**
返回的是列表 伪数组的形式 可以通过索引号来获取

```js
const child = document.querySelector(".child")
child.className += " test"

console.log(child.classList)
// ['child', 'test', value: 'child test'], 还有一个value属性
```

<br>

### 添加: class
### **<font color="#C2185">元素对象.classList.add('类名')</font>**
在元素中添加一个或多个类名.如果指定的类名已存在则不会添加

```js
// 添加多个样式
child.classList.add("test", "test2")
```

<br>

### 删除: class
### **<font color="#C2185">元素对象.classList.remove('类名')</font>**
移除元素中一个或多个类名

**注意:**  
移除不存在的类名不会报错 可以删除指定类名

<br>

### 切换:
### **<font color="#C2185">元素对象.classList.toggle("类名", [true|false])</font>**
在元素中切换类名

- 使用该api时 如果元素身上没有指定的类 则添加该类
- 当再次调用该api时 如果元素身上有指定的类 则删除该类

<br>

**参数2:**  
true | false 可选参数是否强制添加或移除类不管该类名是否存在

<br>

**返回值:**  
该 api 有返回值

- 如果添加类名的话 会返回true
- 如果移除类名的话 会返回false

<br>

```js
const child = document.querySelector(".child")

// 第一次添加
child.classList.toggle("add")
// 第二次删除
child.classList.toggle("add")
```

<br>

### 判断:
### **<font color="#C2185">元素对象.classList.contains()</font>**
判断是否有这个类

<br><br>

# 获取 修改 对象的样式     

<br>

### 修改: 内联样式
当我们修改元素对象的样式的时候 我们要通过 style属性 来修改

注意: 样式名要修改为驼峰形式

<br>

**语法:**  
```js
元素.style.样式名 = 样式值
```

<br>

### 读取: 内联样式
我们通过 style属性 设置和读取都是内联样式 **无法读取样式表中的样式**

<br>

**语法:**
```js
元素.style.样式名
```

通过style属性设置的样式都是内联样式 而内联样式有较高的优先级, 所以通过js修改的样式往往会立即显示

但是如果在样式中写了!important则此时样式会有最高的优先级即使通过js也不能覆盖该样式

此时将会导致js修改样式失效 **所以尽量不要为样式添加!important**

<br>

### 读取当前元素显示的样式: 只有IE支持
### **<font color="#C2185">元素对象.currentStyle.样式名</font>**
读取当前元素显示的样式

它可以用来读取当前元素正在显示的样式如果当前元素没有设置样式则获取它的默认值

**currentStyle只有ie浏览器支持其他浏览器都不支持**

<br>

### **<font color="#C2185">getComputedStyle(元素对象, null)</font>**
该api是 window 对上身上的方法 可以直接使用, 我们获取的样式是带样式的

**注意: 支持ie9以上的浏览器**

<br>

**参数:**  
1. 要获取样式的元素
2. 可以传递一个伪元素, 比如我们可以获取 before after 的属性值 一般传null


```js
let div = document.querySelector(".test")

// after就是微元素
let target = getComputedStyle(div, "after")

console.log(target.getPropertyValue("top"))
// getPropertyValue方法用于获取css中给定属性的属性值
```

<br>

**返回值:**  
对象, 对象中封装了当前元素对应的样式, 可以通过 **对象.样式名** 来读取样式

```js
var obj = getComputedStyle(获取样式的元素, null);
obj.width;

// 或者

getComputedStyle(获取样式的元素, null).width;
```

<br>

**注意:**  
1. 如果获取的样式没有设置则会获取到**真实的值**而不是默认值

2. 没有设置width它不会获取auto而是一个长度

3. 但是该方法不支持ie8 以及以下浏览器 如果想兼容ie8 就的用
``` 
box1.currentStyle.backgroundColor;
```

**通过currentStyle 和 getComputedStyle()读取的样式都是只读的不能修改如果要修改必须通过style属性**

<br>

### 扩展: 获取样式标准节点的css样式属性对应的值
### **<font color="#C2185">节点.getPropertyValue("top")</font>**
用于获取css中给定属性的属性值

<br>

### 自定义: 获取样式函数
```js
*  参数:
*  obj 要获取样式的元素
*  name 要获取的样式名
* 
function getStyle(obj, name){

  // 先判断
  if(window.getComputedStyle){

    // 将指定的属性返回
    return getComputedStyle(obj, null)[name];

  // 兼容ie
  }else{
    return obj.currentStyle[name];
  }
};
```

<br><br>

# 事件
js使我们有能力创建动态页面, 而事件是可以被js侦测到的行为

简单的理解: 触发 --- 响应 的机制

<br>

事件是有三部分组成的, 这就是事件三要素:
- 事件源: 事件被触发的对象
- 事件类型: 如果触发 什么时间
- 事件处理程序: 通过一个函数赋值的方式完成

<br><br>

## 注册事件
注册事件有两种方式: 传统方式 和 方法监听注册方式

<br>

### 传统注册方式:
利用 on 开头的事件 如: onclick, 这种方式的注册事件 具有 唯一性

**传统注册方式的特点:**  
同一个元素同一个事件只能设置一个处理函数, 最后注册的处理函数将会覆盖前面注册的处理函数

<br>

### 方法监听注册方式: addEventListener
w3c推荐的方式

<br>

### **<font color="#C2185">元素对象.addEventListener()</font>**
ie9之前不支持此方法, 可使用 attachEvent() 代替

<br>

**参数:**  
- type: 事件类型字符串, 比如click mousever 不要 on
- listener: 事件处理函数, 事件发生时, 会调用该监听函数
- useCapture: 可选参数 默认false

<br>

同一个元素 同一个事件可以添加多个监听器 依次触发

```js
let div
div.addEventListener('click', fn)
div.addEventListener('mouseover', fn)
div.addEventListener('mouseout', fn)
```

<br><br>

## 事件的解绑

### 传统方式:
**在回调函数内部解绑**, eventTarget.onclick = null

```js
btn.onclick = function() {
  alert(1);
  btn.onclick = null
}
```

<br>

### addEventListener 解绑方式:
### **<font color="#C2185">元素对象.removeEventListener()</font>**
把 回调函数 提取出来, 也是在回调的内部进行解绑
```js
document.body.addEventListener('mousemove', default, false);
document.body.removeEventListener('mousemove', default, false);

function default(){  };

// 另一种写法
btn.addEventListener('click', fn);

function fn() {
  alert(2);
  btn.removeEventListener('click', fn)
}
```

<br>

### **<font color="#C2185">元素对象.attachEvent()</font>**
在IE8中可以使用attachEvent()来绑定事件, MDN不推荐使用

<br>

**参数:**
1. 事件的字符串要on
2. 回调函数

这个方法也可以同时为一个时间绑定多个处理函数 不同的是它是后绑定先执行执行顺序和addEventListener()相反

```js
btn01.attachEvent("onclick", function(){...});
```

<br>

**注意: attachEvent 中的this**
```js
btn01.addEventListener("click", function(){
  alert(this);
},false);                  //btn01

// attachEvent() 是window
btn01.attachEvent("onclick", function(){
  alert(this)
});                        //window
```

<br>

### **<font color="#C2185">元素对象.detachEvent(eventName, callback)</font>**
解绑的写法跟addEventListener一样

<br>

### addEventListener注册的事件: 取消默认行为
利用 event 事件对象来完成

<br>

**<font color="#C2185">event.preventDefault()</font>**  
使用addEventListener()绑定的事件 取消默认行为时不能用``return false``

而是使用 event.preventDefault()
```js
document.body.addEventListener('mousemove', function (event) {
  event.preventDefault();
},false);
```

<br>

### 自定义函数: 绑定事件

**参数:**  
- obj 要绑定事件的对象
- eventStr 要绑定哪个事件(不要on)
- callback 回调函数

```js
function bind(obj, eventStr, callback){ ... };
```

**思路:**  
- attachEvent 要on
- addEventListener不要on

那传eventName的时候传不传on, 加上on容易还是去掉on容易 加上on容易吧

所以这个地方我不要on 那么就有问题了 那ie8不就少个on么？ 所以在ie8那手动加一个 

判断obj里是否有addEventListener()这个方法 如有有的话就用它没有的话用另一个没必要去判断什么浏览器 

<br>

**解决this问题:**  
返回来再看this的问题, ie8里是window 就意味着你在这里就不能用this了 因为不一样了 一个是btn01 一个是window 容易出问题 

我希望统一this 是btn 是被点击的对象 是obj, 我们想想this是谁 是不是由调用方式来决定的, ie8是window那么肯定底层是采用函数形式调用的

那既然是调用方式决定的 那我们只能去改函数的调用方式吧, 函数是谁调的呢？

可以这个函数是浏览器调用的 我们还控制不了, 要是能控制的话 怎么改 call()修改函数的this

``callback.call(obj); ``

现在callback是浏览器调用的我不让浏览器调我希望把调用回调函数的权利拿回来怎么拿回来

```js
function bind(obj, eventStr, callback){

  if(obj.addEventListener){
    obj.addEventListener(eventStr,callback,false);
  }else{
    // 没有解决 this 问题
    obj.attachEvent("on"+eventStr,callback);

    // 解决 this 问题
    obj.attachEvent("on"+eventStr,function(){
        callback.call(obj);
    });
  }
};

bind(btn01, "click", function(){
  alert("1");
});
```

<br><br>

# 常用的事件

<br>

### **<font color="#C2185">onfocus</font>**
获得焦点

<br>

### **<font color="#C2185">onblur</font>**
失去焦点

<br>

### **<font color="#C2185">onscroll</font>**
该事件会在元素的滚动条滚动时触发

<br>

### **<font color="#C2185">onmousemove</font>**
该事件将会在鼠标在元素中移动时被触发

<br>

### **<font color="#C2185">onmousedown</font>**
鼠标被按下的时候触发

<br>

### **<font color="#C2185">onmouseup</font>**
鼠标被抬起的时候触发

<br>

### **<font color="#C2185">onmouseover</font>**
鼠标移入的时候被触发

<br>

### **<font color="#C2185">onmouseout</font>**
鼠标移出的时候被触发 会冒泡

<br>

### **<font color="#C2185">onmouseenter</font>**
鼠标移入的时候被触发

<br>

### **<font color="#C2185">onmouseleave</font>**
鼠标移出的时候被触发 不会冒泡

<br>

### onmouseover 和 onmouseenter的区别
当鼠标移动到元素上时, 就会触发mouseenter事件

<br>

onmouseover 给父盒子绑定mouseover事件 经过父盒子会触发(正常), 经过父盒子里面的子盒子也会触发事件

mouseover 鼠标经过自身盒子会触发, 经过子盒子还会触发

鼠标移动到子盒子上 得到鼠标经过, 但是没有事件 所以会往上冒泡冒泡 是 沿着 dom树 子 往 父上冒

而mouseenter 只会经过自身盒子触发

<br>

### 原因:
mouseenter mouseleave不会冒泡

<br>

### **<font color="#C2185">contextmenu</font>**
弹出右键菜单时触发该回调, **给document绑定**

主要控制应该何时显示上下文菜单, 主要用于程序员取消默认的上下文菜单 比如鼠标的右键菜单
```js
// 禁止鼠标右键菜单

document.addEventListener('contextmenu', function(e){
  e.preventDefault();
})
```

<br>

### **<font color="#C2185">selectstart</font>**
这个事件会在选中文字后触发, 点击也有效果

```js
// 禁止鼠标选中
document.addEventListener('selectstart', function(e){
  e.preventDefault();
})
```

<br><br>

## input 常用的事件


### **<font color="#C2185">onchange</font>**
当状态被改变时会触发, 当失去焦点的时候才会触发

<br>

### **<font color="#C2185">oninput</font>**
当input的value值发生变化时就会触发

与onchange的区别是不用等到失去焦点就可以触发了

<br>

### **<font color="#C2185">onselect</font>**
当input里的内容文本被选中后执行只要选择了就会触发不是全部选中

<br><br>

## 常用的键盘事件:

### **<font color="#C2185">onkeyup</font>**
某个键盘按键被松开时触发

<br>

### **<font color="#C2185">onkeydown</font>**
某个键盘按键被按下时触发

对于onkeydown来说如果一直按着某个按键不松手则事件一直触发

当onkeydown连续触发时第一次和第二次之间会卡顿一下之后会连续触发非常快为了防止误操作的发生

<br>

### **<font color="#C2185">onkeypress</font>**
某个键盘按键被按下时触发, 但是它不识别功能键, 比如ctrl shift 箭头等

区分按下键的大小写

<br>

### 三个事件的执行顺序
``` 
keydown --- keypress --- keyup
```

- keydown 和 keyup 不区分大小写
- keypress 区分大小写

<br>

**注意:**
键盘事件一般都要绑定给一些可以获取到焦点的对象或者是document 文档对象 一般是表单项 或者 document 
比如鼠标插入了一个文本框 有光标在闪 这就叫做获取到了焦点在文本框再点下光标没了叫做失去焦点

<br><br>

# 滚轮事件

<br>

### **<font color="#C2185">onmousewheel</font>**
鼠标滚轮滚动事件会在滚轮滚动时触发 **但火狐不支持该属性**

<br>

### **<font color="#C2185">DOMMouseScroll</font>**
在火狐中需要使用 DOMMouseScroll 来绑定滚动事件

<br>

**注意:**  
该事件 需要用addEventListener()函数来绑定

<br><br>

## 滚轮事件中的事件对象

### **<font color="#C2185">event.wheelDelta</font>**
可以获取鼠标滚轮滚动的方向, 我们不看值的大小只看正负
- 向上 值为120
- 向下 值为-120

**但是火狐不支持**

<br>

### **<font color="#C2185">event.detail</font>**
在火狐中事件对象的该属性 可以获取鼠标滚轮滚动的方向
- 向上 值为-3
- 向下 值为3

正好和正常的浏览器相反, 我觉得火狐的表现是正常的 因为是右下的直角坐标系

```js    
document.addEventListener("mousewheel", wheel)

function wheel(e) {
  let flag;

  if(e.wheelDelta < 0 || e.detail > 0) {
    flag = "down"
  } else {
    flag = "up"
  }

  switch(flag) {
    case "up":
      console.log("我往上滚啦")
      break
    case "down":
      console.log("我往下滚啦")
      break
  }
}
```

<br><br>

## 滚动窗口至文档中的特定位置

### **<font color="#C2185">window.scroll(x, y);</font>**
可以让窗口的滚动到指定位置 不用加单位 直接写数字即可
```js
window.scroll(0, 100)
```

<br><br>

# DOM事件流
事件流 描述的是**从页面中 接受事件的 顺序**

事件发生时会在元素节点之间按照特定的顺序传播, 这个传播的过程就是DOM事件流

<br>

### 事件传播的过程 DOM事件流分为3个阶段
- 捕获阶段
- 目标阶段
- 冒泡阶段

<br>

**注意:**  
js代码中只能执行 捕获 或者 冒泡 其中的一个阶段

onclick(传统事件) 和 attachEvent 只能得到冒泡阶段

<br>

## 事件的传播
关于事件的传播 网景公司 和 微软公司 有不同的理解

<br>

### 微软公司:
事件应该是 由内向外传播 也就是当事件触发时 应该先触发当前元素上的事件 然后再向当前元素的祖先元素上传播 --- **事件的冒泡**

<br>

### 网景公司:
事件应该是 由外向内传播 也就是当事件触发时, 应该先触发当前元素的最外层的祖先元素的事件 然后再向内传播给后代元素 --- **捕获阶段**


<br>

### w3c:
综合了两个公司的方案 将事件的传播分成了三个阶段

- 第一阶段: 事件的捕获阶段  
在捕获阶段时从最外层的祖先元素从window向目标元素进行事件的捕获 **但是默认此时不会触发事件**

- 第二阶段: 目标阶段  
事件捕获到目标捕获结束后 开始在目标元素上执行事件 或者说 是触发事件 **中间阶段执行 冒泡往上走**

- 第三阶段: 冒泡阶段
事件从目标元素向他的祖先元素传递 **依次触发祖先元素上的事件**

<br>

假如我希望在**捕获阶段就开始执行** 可以将addEventListener()的第三个参数设置为true 一般情况下我们不会希望在捕获阶段触发事件 很少传true

<br>

**ie8 以及浏览器 没有捕获阶段**

<br><br>

# 事件的冒泡
所谓的冒泡指的就是事件的向上传导 当后代元素上的事件被触发时 **其祖先元素的相同事件也会被触发**

在开发中大部分情况都是非常有用的 如果不希望事件的冒泡 可以通过事件对象来取消冒泡

<br>

### 取消冒泡
**<font color="#C2185">event.cancelBubble = true</font>**
利用事件对象的 cancelBubble 属性 可以取消冒泡

要取消冒泡 就要在对应的响应函数里 先传递一个形参event
```js
// 兼容性要event = event || window.event;
window.onload = function(){

  // 为s1绑定点击响应函数
  var s1 = document.getElementById("s1");

  // 为span绑定点击响应函数
  s1.onclick = function(){
    alert("我是s1的单击响应函数");
  };

  // 为box1绑定点击响应函数
  var nox1 = document.getElementById("box1");
  box1.onclick = function(){
    alert("我是div的单击响应函数");
  };

  // 为body绑定点击响应函数
  document.body.onclick=function(){
    alert("我是body的单击响应函数");
  };
};
```

我现在给div span body都绑定了点击响应函数那它们三个是什么关系 祖先 后代吧

我现在点击span文字上发现分别出现了, 这种情况就叫做事件的冒泡

- 我是s1的单击响应函数
- 我是div的单击响应函数
- 我是body的单击响应函数

<br>

## 冒泡的应用: 事件委派
事件委派指**将事件统一绑定给元素的共同的祖先元素**  
这样当后代元素上的事件触发时会一直冒泡到祖先元素, 从而通过祖先元素的响应函数 来 处理事件

事件的委派是利用了冒泡 通过委派可以减少事件绑定的次数提高程序的性能 

<br>

**解析:**  
我点击的是li, 但这个点击这个操作会冒泡到ul上, 档ul上有点击事件的时候就会触发

<br>

### **<font color="#C2185">event.target</font>**
返回触发此事件的元素(事件的目标节点), **点哪个返回哪个**

<br>

### 事件委派 要点
利用 event.target 来判断 点击 目标节点, 当是我们期待的目标节点时 才触发对应的回调

<br>

**方式1: 利用class**
```js
// 方式1: className
if(event.target.className=="link"){
  alert("看看效果");
}
```

<br>

**方式2: 利用nodeName**
```js
if(e.target.nodeName == "SPAN") {
  console.log(e.target.innerHTML)
}
```

<br>

### 案例: 
比如利用循环给li节点帮点了事件, 但是后续动态创建的li节点的事件 无法触发

```js
// 点击按钮以后添加超链接 先获取按钮并为按钮绑定点击响应函数
var btn01 = document.getElementById("btn01");
var u1 = document.getELemengtById("u1");

// 给按钮绑定事件
btn01.onclick = function(){

  // 创建一个li
  var li = document.createElement("li");
  // 设置 li 里面的内容 新加进去的超链接 没有点击响应函数 
  li.innerHTML = "<a href='javascript:;' class='link'>新建的超链接<a>"

  // 将li添加到ul中需要先在外面获取到一个ul
  u1.appendChild(li);      
};
```

<br>

### 思考:
这里我们为每一个超链接都绑定了单击响应函数这种操作比较麻烦 而且这些操作 只能为已有的超链接设置事件

而新添加的超链接必须重新绑定 麻烦 而且 性能不好

我们希望只绑定一次事件 即可应用到所有的元素 多个元素上 也就是说我们在给元素绑定事件的时候 可以尝试将其绑定给共同的祖先元素

那超链接共同的祖先元素是谁？不是li a各有各的li 应该是ul吧  

<br>

**推荐使用: 事件委托**

<br>

### 事件委托的使用
为ul绑定单击响应函数

**问题:**  
如果我们给父元素绑定事件 那么点击ul的区域都会触发回调 如果触发事件的对象是期望的元素 就执行 否则不执行

那要先干什么得知道事件是由谁触发的吧? 那this行不行? 

以前说过 事件给谁绑定的this就是谁, 所以绑定给ul this只能是ul 没办法通过this去判断触发的是谁

<br>

**事件对象知道: event.target**
event中的target表示触发事件的对象 点击谁 target就是谁

```js
// 给 他们的父元素绑定事件  -- 事件委派
u1.onclick = function(event){

  // 考虑 兼容性
  event = event || window.event;

  // 如果触发事件的对象是期望的元素 就执行 否则不执行
  if(event.target.className=="link"){
    alert("看看效果");
  }
}
```

```html  
<ul>
  <li><span class="item1">文本1</span></li>
  <li><span class="item2">文本2</span></li>
  <li><span class="item3">文本3</span></li>
</ul>

<script>
const ul = document.querySelector("ul")
ul.addEventListener("click", e => {
  // 方式1
  if(e.target.nodeName == "SPAN") {
  // 方式2
  if(e.target.className == "item1") {
    console.log(e.target.innerHTML)
  }
})
</script>
```

<br><br>

# 事件对象
当事件的响应函数被触发时 浏览器每次都会将一个事件对象作为实参传递进响应函数 event

事件对象 只有有了事件才会存在 **它是我们事件的一系列相关数据的集合**

在事件对象中封装了当前事件相关的一切信息 比如: 
- 鼠标的坐标
- 键盘哪个按键被按下
- 鼠标滚轮滚动的方向

事件的响应函数都是被浏览器调用的 所以以后想知道事件的相关信息或者对事件进行相关的操作 都找 event

<br>

### 事件对象的兼容性处理
事件对象也有兼容性问题, ie 678 通过window.event

```js
event = event || window.event
// ie678使用的事件对象 event.srcElement
let target = event.target || event.srcElement;
```

<br>

**阻止事件冒泡的兼容性处理:**  
```js
if(event && event.stopPropagation) {
  event.stopPropagation();
} else {
  // ie 678 要使用cancleBubble
  window.event.cancleBubble = true;
}
```

<br><br>

# 事件对象的属性 和 方法

### **<font color="#C2185">event.type</font>**
返回事件的类型, 比如click 不带on

<br>

### **<font color="#C2185">event.stopPropagation()</font>**
阻止冒泡 标准

有兼容性的问题 ie678要使用cancleBubble
```js
event.stopPropagation();
event.cancleBubble = true;
```

<br>

### **<font color="#C2185">event.cancelBubble</font>**
该属性阻止冒泡 非标准 ie678使用

<br>

### **<font color="#C2185">event.preventDefault()</font>**
该方法阻止事件(默认行为)标准 比如 不让链接跳转

<br>

### **<font color="#C2185">event.returnValue</font>**
该属性阻止默认事件(默认行为)  非标准 ie678使用 比如 不让链接跳转

<br>

### 取消事件的默认行为
我们上面知道有两种方式可以取消事件的默认行为
- return false
- event.preventDefault()

<br>

**那我们要使用哪种呢?**  
这取决于我们使用哪种方式绑定的事件
- onclick - return false
- addEventListener - event.preventDefault()

<br><br>

# 事件对象: 鼠标

### **<font color="#C2185">event.clientX</font>**
### **<font color="#C2185">event.clientY</font>**
可以获取 鼠标在 **可见窗口内的** 水平 和 垂直 坐标

它不管页面拖不拖动(滚动条) 就是相对于 可见窗口 的坐标, **不包括滚动区域**

<br>

### **<font color="#C2185">event.pageX</font>**
### **<font color="#C2185">event.pageY</font>**
可以获取鼠标相对于 当前文档页面的 坐标 **包括滚动区域**

但是这两个属性在ie8中不支持所以如果需要兼容ie678 则不要使用

比如: 可视窗口就是 height: 500px 但文档 height: 2000px 

pageY: 就能获取到 700的坐标

<br>

### **<font color="#C2185">event.screenX</font>**
### **<font color="#C2185">event.screenY</font>**
返回鼠标相对于电脑屏幕的X Y坐标

<br><br>

# 事件对象: 键盘

### **<font color="#C2185">event.keyCode</font>**
返回相应的键的ASCII值

<br>

**注意:**  
我们的 keyup 和 keydown 事件不区分字母大小写 a 和 A得到的都是65

<br>

### **<font color="#C2185">event.altKey</font>**
### **<font color="#C2185">event.ctrlKey</font>**
### **<font color="#C2185">event.shiftKey</font>**
这三个用来判断alt ctrl shift是否被按下, **返回布尔值**

- 如果按下则返回true 
- 没有按下返回false

```js
document.onkeyup = function(event) {
  event = event || window.event;
  
  // 判断一个y键是否按下
  if(event.KeyCode === 89){
    console.log("y被按下了");
  }

  // 判断y和ctrl是否同时被按下
  if(event.KeyCode === 89 && event.ctrlKey){
    console.log("ctrl+y被按下了");
  }
}
```

以下是给input绑定的
```js
var input = document.getElementsByTagName("input")[0];
input.onkeydown = function(){

  // 取消默认行为
  // 在文本框中输入内容属于onkeydown的默认行为
  // 如果使用return false取消默认行为 则输入的文本不会在文本框中
  return false; 
};
```

<br>

### 需求: 在文本框中不能输入数字
先判断用户输入的是什么得问event吧, 我们先看看数字的编码是多少 48 - 57 

- 0 - 9 : 48 - 57
- L T R X : 37 - 40
- a - z : 65 - 90

```js
input.onkeydown = function(event) {
  event = event || window.event;
    if(event.keyCode >=48 && event.keyCode <=57){
    return false; 
  }
}
```

<br>

### this 和 event.target 的区别
- this: 返回的是绑定事件的对象
- target: 返回的是触发事件的对象 点击了哪个元素就返回哪个元素

```
| - div
  | - span
```

我们给div绑定事件 this就是div, 但是 target 是动态的
- 我点div的时候 target是div 
- 我点span的时候 target就是span

<br>

### **<font color="#C2185">event.currentTarget</font>**
事件绑定给谁 currentTarget就是谁 某种程度上和this一样

**兼容性: ie678不支持**

<br><br>

# 元素偏移量: offset 系列 (PC端的特有)
offset翻译过来就是偏移量 我们使用offset系列相关属性

1. 可以获取 目标元素的位置 大小等
2. 可以获取 目标元素距离带有定位父元素的位置
3. 可以获取 元素自身的大小(宽度 高度)

**注意返回的数值都不带单位**

<br><br>

## offset系列常见的属性:
```html
<div id="all">
  all
  <div class="outer">
    outer
    <div class="inner">
      inner
    </div>
  </div>
</div>
```

<br>

### **<font color="#C2185">元素对象.offsetParent</font>**
获取当前元素的**定位父元素**

会获取到当前元素最近的开启了定位的祖先元素, 如果所有的祖先元素都没有开启定位 则返回body

<br>

### 元素对象.offsetParent 和 元素对象.parentNode 的区别
- 元素对象.parentNode: 返回的是亲爸爸 不管父亲有没有定位
- 元素对象.offsetParent: 返回的是带有定位的父亲 父级没有定位 就向上查找, 直到找到body

<br>

### **<font color="#C2185">元素对象.offsetTop</font>**
获取当前元素 相对于 其定位父元素 的 垂直偏移量, 如果父元素都没有开启定位 则相对于body

当前元素顶部 到 它的定位父元素的顶部 之间的距离

<br>

### **<font color="#C2185">元素对象.offsetLeft</font>**
获取当前元素 相对于 其定位父元素 的 水平偏移量, 如果父元素都没有开启定位 则相对于body

当前元素左侧 到 它的定位父元素的左侧 之间的距离

<br>

**offsetLeft 搭配 translate() 时候的注意点:**  
offsetLeft可以理解为获取的是 left 的值 比如 left: 200px 那么获取的就是200  
```css
el {
  left: 300px;
}
```

但是我们的位置可能是由 ``transform: translate(-50%, -50%);`` 计算出来的
```css
el {
  width: 200px;
  left: 300px;
  transform: translateX(-50%);
}
```

我们预期是 300px - 100px(元素的一半) 200px **但是实际上我们获取的还是 left: 300px 的值**

<br>

### **<font color="#C2185">元素对象.offsetWidth</font>**
### **<font color="#C2185">元素对象.offsetHeight</font>**
获取元素 **整个宽度和高度** 包括 

- 内容区
- 内边距
- 边框
- 滚动条的位置

```js
console.log(e.target.offsetHeight)
// 内容区 + padding + border = 232 + 30x2 + 2x2 = 296
```

<br>

# 元素偏移量: client 系列
client翻译过来就是客户端的意思, 我们使用client系列的相关属性来**获取元素可视区的相关信息**

通过client系列的相关属性可以动态的得到该元素的边框大小, 元素大小等

<br>

### **<font color="#C2185">元素对象.clientWith</font>**
### **<font color="#C2185">元素对象.clientHeight</font>**
这两个属性 **获取见框的宽度和高度**

会获取元素的宽度和高度 包括:
- 内容区
- 内边距 
- **不包括边框**
- **不包括滚动条**

<br>

**注意:**
这些属性都是只读的 不能修改 改只有一种方式 就是用Style属性(以下通用)

如果有滚动条的话会刨除滚动条的位置 **注意是可见框的大小**

<br>

### **<font color="#C2185">元素对象.clientTop</font>**
返回元素上边框的大小(border的高度), 不常用

<br>

### **<font color="#C2185">元素对象.clientLeft</font>**
返回元素左边框的大小(border的高度), 不常用

<br><br>

# offset 和 style 区别
这两种都能得到元素的大小等属性 区别是什么?

<br>

### offset角度:
- offset可以得到任意样式表中的样式值
- offset系列可以获得的数值是没有单位的
- offsetWidth 包含padding border width
- offsetWidth 等属性是只读属性 只能获取不能赋值

所以我们想要获取元素大小位置 用offset更合适 

<br>

### style 角度:
- style只能得到行内样式表中的样式值
- style.width 获得的是带有单位的字符串
- style.width 获得不包含padding 和 border的值
- style.width 是可读可写属性, 可以获取也可以赋值

所以我们想要给元素更改值 则需要用style改变 

<br><br>

# 元素 scroll 系列
跟滚动条相关的

<br>

### **<font color="#C2185">元素对象.scrollWidth</font>**
元素的实际大小(包含超出部分), 获取滚动区域的宽度, **不含边框**

<br>

### **<font color="#C2185">元素对象.scrollHeight</font>**
元素的实际大小(包含超出部分), 获取滚动区域的高度, **不含边框**
```js
alert(box4.clientHeight);   //300 可见的高度
alert(box4.scrollHeight);   //600 可以获得整个滚动区域的高度
```
      
<br>

### **<font color="#C2185">元素对象.scrollLeft</font>**
可以获取水平滚动条*滚动的距离*, 被卷进去的左侧距离

<br>

### **<font color="#C2185">元素对象.scrollTop</font>**
可以获取垂直滚动条*滚动的距离*, 被卷进去的上侧距离
```js
alert(box4.clientHeight);       //283
alert(box4.scrollHeight);       //600

alert(box4.scrollTop);          //没往下滚动的时候是0

// 当垂直滚动条到底时
alert(box4.scrollHeight - box4.scrollTop)       //283
```

<br>

### 技巧: 触底
```js
// 滚动区的整体高度(元素的实际高度) - 滚动的距离 = 可见框高度
scrollHeight - scrollTop == clientHeight

// 说明水平滚动条 滚动到底了
scrollWidth - scrollLeft == clientWidth
```
当满足上面的等式的时候 说明垂直滚动条 滚动到底了

<br>

### 场景:
有的时候上网会要注册注册时候会有一堆的条款让你去读 下面有个√ 它要确保你阅读协议了 才让你注册 

什么时候才能注册呢当滚动条滚动到底了 就视为你阅读完了 才让你注册

<br>

### **<font color="#C2185">window.pageYOffset / pageYOffset</font>**
### **<font color="#C2185">window.pageXOffset / pageXOffset</font>**
页面被卷进去的距离

这两个属性可以获取 **页面被卷去了多少**

<br>

- **设置**或**返回**当前页面相对于窗口显示区左上角的 X 位置
- **设置**或**返回**当前页面相对于窗口显示区左上角的 Y 位置

<br>

页面被卷去的头部(scrollTop) 可以通过window.pageYOffset获得

页面被卷去的左侧 可以通过window.pageXOffset 获得

<br>

**注意:**  
**元素的内容**被卷进去多少是 **el.scrollTop**获取的, 比如是某个盒子被卷进去多少

如果是**页面**被卷进去多少则是 **window.pageYOffset**

<br>

### 兼容性注意:
页面被卷去的头部, 有兼容性问题, 因此被卷去的头部通常有如下的几种写法

1. 声明了DTD: 使用 document.documentElement.scrollTop

2. 未声明DTD: 使用 document.body.scrollTop;

3. 新方法: window.pageYOffset / pageYOffset  ie9以上支持

<br>

### 自定义函数: 获取页面被卷进去的距离
```js
function getScroll() {
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
  }
}

// 使用的时候
getScroll().left / top
```

<br>

### 扩展: DTD
``<!DOCTYPE html>`` 这个就是DTD 加上这个就可以使用 document.documentElement.scrollTop;

<br>

### **<font color="#C2185">最高兼容性写法(网上)</font>**
```js

// 判断是否支持 PageOffset (给 supportPageOffset赋值 true 或 false)
var supportPageOffset = window.pageXOffset !== undefined;

// 检测浏览器渲染属性是否标准模式 (isCSS1Compat赋值 true 或 false)
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

// 如果不支持PageOffset则要使用 scrollLeft; 
// scrollLeft 根据浏览器模式(标准模式、怪异模式)使用不同语法
  // 标准模式:  document.documentElement 语法
  // 怪异模式:  document.body 语法
var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;

var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

// or

var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
```

<br>

# offset client scroll 系列的总结
它们都可以返回元素大小

**offsetWidth:**  
返回自身包括 padding border width 的宽度 返回值不带单位

<br>

**clientWidth:**  
返回自身包括 padding width  不包括border 返回值不带单位

<br>

**scrollWidth:**  
返回自身的实际宽度 padding 不包含边框 返回数值不带单位

<br>

**主要用法:**  
- offset系列 主要用于获取元素的位置
- client系列 主要获取元素的大小
- scroll系列 主要获取滚动的距离

<br><br>

# 定时器
window对象给我们提供了2个非常好用的方法 - 定时器

<br>

### **<font color="#C2185">setInterval(function() {}, 毫秒数, 数据1, 数据2)</font>**
按照指定的周期(以毫秒计)来调用函数或计算表达式 (每隔多少毫秒执行一次回调)

如果希望一段程序可以间隔一段时间执行一次 可以使用定时调用, 可以将一个函数 每隔一段时间执行一次

<br>

**参数:**
1. 回调函数(该函数会每隔一段时间被调用一次)
2. 毫秒, 每次调用间隔的时间单位是毫秒 1000毫秒 = 1秒
3. **数据会在停止定时器的时候** 传入到回调中

<br>

**返回值:**
定义器的标识符 Number类型的数据

```js
let num = 0
let timer = setInterval((...args) => {

  // 当定时器停止的时候 会收到我们传递过来的参数
  if(num == 5) {
    console.log(args) // ['data1', 'data2']
    clearInterval(timer)
  }
  console.log(num++)
}, 1000, "data1", "data2")
```

<br>

### **<font color="#C2185">setTimeout(callback, ms, 数据1, 数据2)</font>**
延迟定时器

用于设置一个定时器, 该定时器在指定毫秒之后执行回调

```js
// 定义一个变量 用于通知定时器结束的时机
let flag
new Promise((resolve, reject) => {
  setTimeout((flag) => {
    console.log("我执行完了")
    resolve(true)
  }, 1000, flag)
}).then(res => {
  flag = res
  console.log(flag)
})
```

<br>

### **<font color="#C2185">clearInterval(id)</font>**
取消 由 setInterval() 设置的timeout

可以用来关闭一个定时器方法中需要一个定时器的标识作为参数

<br>

### **<font color="#C2185">clearTimeout(id)</font>**
取消 由 setTime() 设置的timeout    

<br><br>

# 动画函数

### 动画实现原理:
通过定时器 setInterval() 不断移动盒子的位置

<br>

### 实现步骤:
1. 获得盒子当前的位置
2. 让盒子在当前位置的基础上 再加一个移动距离
3. 然后利用定时器不断重复这个操作
4. 加一个结束定时器的条件
5. 注意此元素需要添加定位, 才能使用ele.style.left


<br>

### 简单的动画实现:
```js
let box = document.querySelector(".box")
let distance = 10

let timer = setInterval(() => {
  // 每次计算新的left值
  let x = box.offsetLeft
  box.style.left = (x + distance) + "px" 
}, 1000)
```

<br>

### 动画函数的简单封装

自定义函数的参数:
1. 动画对象
2. 终点值

```js
function animate(obj, taret) {
  obj.timer = setInterval(function() {
    // 如果元素的left > 目标值 就停止动画
    if(obj.offsetLeft >= target) {
      clearInterval(obj.timer);
    }
    obj.style.left = obj.offsetLeft + 1 + 'px';
  }, 30)
}
```

<br><br>

## 缓动效果原理
缓动动画就是让元素运动速度有所变化, 最常见的是让速度慢慢停下来 让元素的运动速度 有一定的变化 比如我们停车前后会踩刹车

<br>

### 思路:
让盒子每次移动的距离慢慢变小, 速度就会慢慢的降下来

<br>

### 核心算法:
```js
(目标值 - 现在的位置) / 10  // 作为每次移动的距离 (我们称之为步长)
```

```js
obj.style.left = obj.offsetLeft + ((target - obj.offsetLeft) / 10) + 'px';
```
<br>

**注意:**  
步长值一定要写在定时器里面 这样才能不断的更新最新的位置

<br>

**解析:**    
- 匀速运动: 盒子在0的位置, 目标位置为100, 每次步长为10 这就是匀速运动

- 缓速运动: (目标值 - 现在的位置) / 10
```
(100 -  0) / 10  = 10
(100 - 10) / 10  = 9
(100 - 19) / 10  = 8.1
```

定时器每次都会获取到现在的位置, 因为现在位置的值不断增加, 步长就会不断减少

<br>

**停止的条件:**  
让当前盒子位置等于目标位置就停止定时器

```js 
// 移动函数:
function animate(obj, taret) {
  obj.timer = setInterval(function() {

    // 步长值
    let step = (target - obj.offsetLeft) / 10;
    if(obj.offsetLeft >= target) {
      clearInterval(obj.timer);
    }

    obj.style.left = obj.offsetLeft + step + 'px';
  }, 30)
}

// 之所以是匀速运动就是因为
obj.style.left = obj.offsetLeft + 1 + 'px';

// 1的值是固定的, 我们把这个步长值改为一个慢慢变小的值
obj.style.left = obj.offsetLeft + step + 'px';
```

<br>

### **<font color="#C2185">匀速动画:</font>**
盒子当前的位置 + 固定的值

<br>

### **<font color="#C2185">缓动动画:</font>**
盒子当前的位置 + 变化的值(目标位置 - 现在位置) / 10
**变化在值 在定时器里面写**

<br>

### 扩展: 当是正方向的时候
对步长值取整 使用向上取整 ``Math.ceil((target - obj.offsetLeft) / 10);``

假如是8.1 我们要让它是9 而不是8, 往前走 不要让它往后倒

<br>

### 扩展: 当是反方向的时候
对步长值取整 使用向下取整 ``Math.floor((target - obj.offsetLeft) / 10);``

假如是-8.1 我们要让它是-9 而不是-8, 往前走 不要让它往后倒

<br>

### 总结: 这种写法不用判断speed是正还是负的问题
如果是回退的话 ``(目标位置 - 现在位置) / 10`` 的计算结果会是 负数

<br>

因为考虑到两个条件(是正方向 还是反方向) 所以我们要**判断**
```js
step = step > 0 ? Math.ceil(step) : Math.floor(step);
```

<br>

### 整理后:
```js 
function animate(obj, target) {
  obj.timer = setInterval(function() {

    // 步长值
    let step = (target - obj.offsetLeft) / 10;
    // 避免停的不准的情况发生, 我们要对小数的步长值取整, 因为是两个方向的原因 我们要对两种情况来进行判断
    step = step > 0 ? Math.ceil(step) : Math.floor(step);

    if(obj.offsetLeft == target) {
      clearInterval(obj.timer);
    }
    obj.style.left = obj.offsetLeft + step + 'px';
  }, 15)
}
```

<br>

**注意:**  
终止定时器的条件不要写成 >= 而是 == 要不会出问题

<br>

## 扩展: 缓动动画中添加 回调函数

<br>

### 回调函数:
上一件事件执行完毕后 才会调用回调函数

函数可以作为一个参数, 将这个函数作为参数传到另一个函数里面, 当那个函数执行完后, 再执行传进去的这个函数, 这个过程就叫做回调

<br>

### 需求: 当移动到800后变色, 这里就用到了回调函数
```js 
function animate(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
      let step = (target - obj.offsetLeft) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (obj.offsetLeft == target) {
          clearInterval(obj.timer);
          callback && callback();
      }
      obj.style.left = obj.offsetLeft + step + 'px';
  }, 15);
}

// 调用的时候
animate(div, 800, function(){ ... });
```

<br>

### 版本2: 动画函数
```js
function move(obj, target, speed, callback){

  clearInterval(obj.timer);

  // 为了让传递speed时都传正, 所以一上来获取元素现在的位置
  let nowSite = obj.offsetLeft;

  // 来判断speed应该是正还是负, 现在的位置 < 目标 speed应该为正, 现在位置 > 目标 speed应该为负
  if(nowSite > target){
    speed = -speed;
  }

  obj.timer = setInterval(function(){

    let currentX = obj.offsetLeft;
    let newX = currentX + speed;

    if(speed < 0 && newX < target || speed > 0 && newX > target){
      newX = target;
    }

    obj.style.left = newX + 'px';
    if(newX === target){
      clearInterval(obj.timer);

      // 这里为了不需要回调函数时 不会报错 如果有你就调 没有的话就不调了
      callback && callback();		
    }
  },30)

}; 
```

<br><br>

## 案例: 鼠标经过div 里面滑动出去一条信息框
鼠标经过sliderbar con滑动到左侧, 当动画执行完毕后 ← 变为 →

这时候就要用到回调函数了, 因为是动画执行完了 才改变 箭头的方
```html
<style>
  html, body {
    padding: 0;
    margin: 0;
  }
  .sliderbar {
    width: 100%;
    height: 60px;
    position: relative;
    /* 子元素可以根据内容来决定宽度 */
    display: inline-block;
  }
  .con {
    height: 60px;
    width: auto;
    background-color: #bde0fe;
    line-height: 60px;
    padding-left: 80px;
    padding-right: 20px;
    position: absolute;
    left: -180px;
  }
  .con::before {
    content: "";
    display: block;
    position: absolute;
    width: 10px;
    height:100%;
    top: 0;
    left: 0;
    background-color: #a2d2ff;
  }

  span {
    position: absolute;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    background-color: #cdb4db;
    z-index: 10;
  }
</style>
</head>
<body>

<div class='sliderbar'>
  <span class="btn">→</span>
  <div class='con'>问题反馈</div>
</div>

<script>

const btn = document.querySelector(".btn")
const target = document.querySelector(".con")
let timer
btn.addEventListener("mouseenter", (e) => {
  animate(target, 0, () => {
    btn.innerHTML = "←"
  })
})

btn.addEventListener("mouseleave", (e) => {
  animate(target, -180, () => {
    btn.innerHTML = "→"
  })
})

function animate(target, dest, cb) {
  if(timer) {
    clearInterval(timer)
  }

  timer = setInterval(() => {
    // 获取现在的位置
    let left = target.offsetLeft
    // 步长
    let step = (dest - left) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)

    if(left == dest) {
      clearInterval(timer)
      cb && cb()
    }

    target.style.left = left + step + "px"
  }, 1000 / 60)
}

</script>
</body>
```

<br><br>

## 使用class统一修改元素样式

```html
<button id="btn01">点击按钮以后修改box的样式</button>
<div id="box" class="b1 b2"></div>

<script>
window.onload = function(){
  var box = document.getElementById("box");
  var btn01 = document.getElementById("btn01");

  btn01.onclick = function(){ }
}
</script>
```

<br>

### style修改元素样式的问题:
我们可以通过style属性来修改元素的样式 但是每修改一个样式浏览器就需要重新渲染一次页面

所以这样执行的性能是比较差的 而且这种形式当我们要修改多个样式时也不太方便
```js
box.style.width = "200px";
box.style.height = "200px";
box.style.backgroundColor = "yellow";
```

上面是js直接修改css样式吧 js是行为 css是表现 这么一改 行为和表现又耦合了 

我希望一行代码 可以同时修改多个样式, 这个box的样式都是通过b1的class设置的 

```css
.b2{
  height: 300px;
  background-color: yellow;
}
```
我创建一个 .b2 假如我将box的class修改为b2, 样式是不是就变了
```js
box.className = "b2";
```

我们可以通过修改元素的class属性来间接的修改样式 

这样一来我们只需要修改一次即可同时修改多个样式 浏览器只需要重新渲染页面一次性能比较好 并且这种方式可以使表现和行为进一步的分离 

现在我不想修改width 我只想该height 和 background 这样一改 box宽度100%了 因为b1的样式去了 去了之后b1的样式都没了 

但是有的时候 我不希望去掉b1 只希望加上b2 也就是在原有值的基础上增加b2 
```js
// 这样的话 原有的样式也都没了 因为classname 变成"b1b2"了
box.className += "b2";

//b2的前面要加个空格 别忘了
box.className += " b2";
```

<br>

### 自定义函数: 为元素添加 class
参数:
1. 给谁加 obj 要添加class属性的元素
2. cn 要添加的class值 

```js
function addClass(obj, cn){
  obj.className += " " + cn;
};
```

有没有什么问题, 点一下 加进去了 class="b1 b2"

多点几下后class="b1 b2 b2 b2 b2 b2 b2 b2 b2 b2 b2", 有了一次b2后 就不要加了 有没有个方法能判断下 这个class里有没有b2 

<br>

### 自定义函数: 检查元素上是否已有 同名 class
判断一个元素中是否含有指定的class属性值, 如果有该class则返回true没有则返回false

参数
1. obj 要判断的元素
2. cn class的名 换句话说就是判断obj中有没有cn

利用正则表达式:
```js
function hasClass(obj, cn){
var reg = new RegExp("\\b"+cn+"\\b");
  return reg.test(obj.className);
};

// 或者这样
function checkClass(el, sn) {
  return el.className.includes(sn)
}

function addClass(obj, cn) {
  if(!hasClass(obj, cn)) {
    addClass(obj, cn);
  };
}
```

还有什么问题？, 我觉得还需要一个删除一个类的功能, 删除元素中指定的class属性, 怎么删 

把b2 替换成一个 空串, 是不是还得创建一个正则表达式 

<br>

### 自定义函数: 删除 class
```js
function removeClass(obj , cn){
  var reg = new RegExp("\\b"+cn+"\\b");
  obj.className = obj.className.replace(reg , "");
}
```

toggleClass可以用来切换一个类, 如果元素中具有该类则删除, 如果元素中没有该类则添加

<br>

### 自定义函数: 切换class
```js
function toggleClass(obj , cn){

  if (hasClass(obj , cn)) {
    removeClass(obj , cn);
  } else {
    addClass(obj , cn);
  }
};
```

<br><br>

# 移动端的事件

## 触屏事件概述
移动端浏览器兼容性较好, 我们不需要考虑以前js的兼容性问题, 可以放心的使用原声js书写效果

但是移动端也有自己独特的地方, 比如 触屏事件 touch, (android 和 ios都有)

**移动端没有鼠标的概念**

touch对象代表一个触摸点, 触摸点可能是一根手指 也可能是一根触摸笔, 触屏事件可响应用户手指(或触控笔)对屏幕或者触控板操作

<br><br>

### touchstart 事件

### **<font color="#C2185">div.addEventListener('touchstart', callback);</font>**
相当于click事件

<br>

### **<font color="#C2185">touchmove 事件</font>**
相当于mousemove事件

<br>

### **<font color="#C2185">touchend 事件</font>**
相当于mouseup事件

<br><br>

## 触摸事件对象 (TouchEvent)
TouchEvent是一类描述手指在触摸平面(触摸屏, 触摸板等)的状态变化的时间, 这类事件用于描述一个或多个触点

使开发者可以检测触点的移动 触点的增加 和 减少等 (比如手指移动了多少像素啊 有几个手指啊)

touchstart touchmove touchend **三个事件都会有各自的事件对象**

<br>

### **<font color="#C2185">TouchEvent.touches</font>**
正在触摸屏幕的所有手指的一个列表 能得到所有的触摸点(检测屏幕)

一个手指是0 length为1 如果监听的是DOM元素 touches 和 targetTouches是一样的

<br>

### **<font color="#C2185">TouchEvent.targetTouches</font>**
正在触摸当前DOM元素上的手指的一个列表(检测DOM元素) 有几个手指在触摸我的div

<br>

### **<font color="#C2185">TouchEvent.changedTouches</font>**
手指状态发生了改变的列表, 从无到有 从有到无, 原来屏幕上没有手指 有了手指, 或者 有手指 然后离开了

<br>

### 要点:
当我们手指离开屏幕的时候, 就没有了touches 和 targetTouches 但是会有changedTouches

因为我们一般都是触摸元素, 所以最经常使用的是 targetTouches
因为是一个手指列表 当我们得到某个触点(手指)的话 可以event.targetTouches[0]

<br>

**targetTouches[0] 对象具有以下常用属性:**  
就可以得到正在触摸dom元素的第一个手指的相关信息

- clientX: 触摸点相对于可视窗口（viewport）的水平坐标。
- clientY: 触摸点相对于可视窗口（viewport）的垂直坐标。
- pageX: 触摸点相对于整个页面文档的水平坐标。
- pageY: 触摸点相对于整个页面文档的垂直坐标。
- screenX: 触摸点相对于屏幕的水平坐标。
- screenY: 触摸点相对于屏幕的垂直坐标。
- identifier: 触摸点的唯一标识符, 用于区分多个触摸点。

<br>

这些属性提供了触摸点在不同坐标系中的位置信息, 可以用于确定触摸点在页面中的具体位置、计算移动距离、进行拖拽操作等。

例如, 通过 targetTouches[0].clientX 和 targetTouches[0].clientY, 你可以获取触摸点相对于可视窗口的坐标, 并根据这些坐标进行相应的操作和计算。

需要注意的是, 移动端事件对象中的触摸点信息可能会包含多个触摸点, 因此 targetTouches 是一个数组, 可以通过索引访问特定的触摸点信息。在常见的单点触摸场景下, 我们通常关注第一个触摸点, 即 targetTouches[0]。

<br><br>

## 案例: 移动端拖动
touchstart touchmove touchend 可以实现拖动元素

但是拖动元素 **需要当前手指的坐标值**, 这点我们可以使用 targetTouches[0]里面的pageX, pageY

<br>

### 移动端拖动的原理:
手指移动中, 计算出手指移动的距离, 然后用盒子原来的位置 + 手指移动的距离

**手指移动的距离:**  
没办法拿到手指的移动距离, 但是我们得到手机的当前坐标
```
手指移动的距离 = 手指滑动中的位置 - 手指刚开始触摸的位置
``` 

比如第一次触摸div的时候位置是10px 然后手指移动到了30px的位置上 30-10 移动了20px的距离

<br>

### 拖动元素三部曲:
1. 触摸元素 touchstart: 获取手指初始坐标, 同时获得盒子原来的位置
2. 移动手指 touchmove:  计算手指的移动距离, 并且移动盒子
3. 离开手指 touchend

<br>

**注意:**  
手指移动也会触发滚动屏幕所以这里我阻止默认的屏幕滚动 event.preventDefault();

```js
// 获取div
let div = document.querySelector('div');

// 全局定义 手指的初始坐标 (因为多个函数内部需要使用)
let startX = 0;
let startY = 0;

// 全局定义 元素盒子的初始位置
let x = 0;
let y = 0;

// 给盒子绑定 触摸开始的事件 -- 初始化赋值操作
div.addEventListener('touchstart', function(e){

  // 给手指点击屏幕的初始位置赋值 获取手指点击屏幕上的初始位置 (用第一根就可以)
  startX = e.targetTouches[0].pageX;
  startY = e.targetTouches[0].pageY;

  // 给盒子初始位置赋值
  x = this.offsetLeft;
  y = this.offsetTop;
})

// 给元素绑定 拖动事件
div.addEventListener('touchmove', function (e) {
  // 计算手指的移动距离: 手指移动之后的坐标 - 手指初始的坐标
  // 手指不断的移动就能得到最新的坐标e.targetTouches[0].pageX 它也是手指移动后的位置
  let moveX = e.targetTouches[0].pageX - startX;
  let moveY = e.targetTouches[0].pageY - startY;

  // 移动盒子 盒子原来的位置 + 手指移动的距离
  this.style.left = x + moveX + 'px';
  this.style.top = y + moveY + 'px';

  // 取消滚动屏幕的默认行为
  e.preventDefault();
})
```

**注意: 松开手move就停止了不像pc端还要用到onmouseup**

<br><br>

## 案例 移动端的轮播图
移动端移动, 可以使用 translate 移动

<br>

### 无缝滚动的要点
**1. 设计 html 结构**  

正常 3 张图片
```
img1 img2 img3

↓

img3 img1 img2 img3 img1
```

<br>

2. 在更改后的html结构中 我们要实现无缝滚动 就是要当自动播放到最后一张 img1 的时候, 让起跳到 img1(红色) 的位置

这个步骤是利用 translate 来实现的 那就是说只要有过渡 就是有时间的消耗

```js
ul.style.transition = 'all .3s';
```

时间还没到, 过渡还没有走完 就开始判断是不合适的 所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
此时我们要使用 **transitionend事件**  检测过渡是否完成

<br>

### **<font color="#C2185">扩展: transitionend事件</font>**
检测过渡是否完成

<br>

### 实现:
移动端轮播图功能基本和pc端一致
1. 可以自动播放图片
2. 手指可以拖动播放轮播图

<br>

### 要点:
1. 用手在轮播图上可以左右拉动, 所以在html的结构里 3 1 2 3 1 在图片的前后分别要插入一张图片
```html 
<ul id='imgBox' class='test'>
  <li>
      <div class='item'>3</div>
  </li>
  <li>
      <div class='item'>1</div>
  </li>
  <li>
      <div class='item'>2</div>
  </li>
  <li>
      <div class='item'>3</div>
  </li>
  <li id='last-li'>
      <div class='item' id='last-item'>1</div>
  </li>
</ul>
```

2. ul的宽度  
5张图片可以把ul的width设置为500%, 但是img的width如果设置为100%的话, 效果也会显示为500%, 所以我们手动给li也设置宽度为20%

<br>

### 案例分析:
1. 自动播放功能
2. 开启定时器
3. 移动端移动, 可以使用translate 移动
4. 想要图片优雅的移动, 请添加过渡效果

<br>

### 无缝滚动:
1. 我们判断条件是要等到图片滚动完毕再判断, 就是过度完成后判断
2. 此时需要添加检测过渡完成事件 transitionend
3. 判断条件: 如果索引号等于3 说明走到了最后一张图片, 此时索引号要复原为0  
4. 此时我们要给它去掉过渡效果, 
5. 如果索引号小于0 说明是倒着走, 索引号等于2
6. 此时图片, 去掉过渡效果, 然后移动

<br>

### 导航点的新做法:
小圆点跟随变化效果

把ol里面li带有current类名的选出来去掉类名remove

让当前索引号的小li添加current add

但是 也是要等着过渡结束之后变化, 所以这个写到transitionend事件里面

<br>

### 手指滑动轮播图:
本质就是ul跟随手指移动, 简单的说就是移动端拖动元素

当手指触摸到这个元素, 拿到手指的初始坐标, 当手指移动的时候会拿到移动之后手指的坐标 让两个坐标相减就能得到手指的移动距离 

然后盒子在原来的基础上加上移动的距离盒子就实现移动效果了 

- 触摸元素 touchatart:  获取手指的初始坐标
- 移动手指 touchmove:   计算手指的滑动距离 并且移动盒子

<br>

### 手指拖动图片时的吸附效果
当拖动ul的程度小于某个值的时候 就会回到原来的图片

当拖动ul的程度大于某个值的时候 就会到目标图片

离开手指touchend 根据滑动的距离分不同的情况

- 如果移动距离小于50px 就回弹原来的位置
- 如果移动距离大于50px 就上一张下一张滑动

```js 
// 获取元素
let focus = document.querySelector('.focus');
// 获取第一个元素
let ul = focus.children[0];

// 获得focus的宽度
let w = focus.offsetWidth;

// 利用定时器自定轮播
let index = 0;
let timer = setInterval(function(){
  // 外面定义了一个index变量 让这个变量每次++, ul的移动距离就是index*图片的宽度
  index++;
  let translatex = -index * w;

  ul.style.transition = 'all .3s';
  ul.style.transform = `translateX(${translatex})`;
},1000)


/*
无缝滚动, 当到最后一张1的时候 快速掉到其实是第二张的1

无缝滚动的要点:
我们要实现无缝滚动 就要当自动播放到最后一张1的时候, 让它跳到其实是第二张的1, 但是我们的缓动效果是用过渡实现的, 只要有过渡 就是有时间的消耗 时间还没到, 过渡还没有走完 就开始判断是不合适的

所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
此时我们要使用 transitionend 事件 检测过渡是否完成
*/

// 我们检测ul 因为它做的过渡效果 和 移动
ul.addEventListener('transitionend', function(){
  /*
      走到最后一张再后退, 那怎么知道走到了最后一张呢?
      我们可以通过index判断, 页面一上来我们看到的第一张就是0
      3 1 2 3 1
      0 1 2 3 -- > 索引号
      所以当走到索引号为3的时候我们就跳到0
  */
  if(index >= 3) {
      index = 0;
      // 去掉过渡效果, 这样让我们的ul 快速的跳到目标位置
      ul.style.transition = 'none';

      // 重新计算 按照最新的index滚动, 用我们最新的index * 图片的宽度
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;
  } else if(index < 0) {
      /*
      还有一种特殊情况, 如果处于第一张的时候 我们往右拉会出现倒着的情况
      3 1 2 3 1
      在1的时候往右拉 会到3
      1的索引号是0 要是倒着走的话 肯定是一个负数才对 -1
      如果索引号小于0 肯定是倒着走的, 当到3的时候 迅速的跳到右手倒数第二张(索引号是2的身上)
      */
      index = 2;
      ul.style.transition = 'none';
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;

      // 导航点的部分
      // 以前的做法是利用for循环 先把active类去掉 再让当前的小li添加类

      // 把ol(导航点的容器)里面的li带有current类名的选出来, 去掉类名 remove
      ol.querySelector('.current').classList.remove('current');

      // 让当前索引号的小li 加上current add
      ol.children[index].classList.add('current');
  }
});

// 手指滑动轮播图
// 触摸元素 touchstart: 获取手指初始坐标
let startX = 0;
let moveX = 0;  // 后面要使用这个移动距离所以定义全局变量

ul.addEventListener('touchstart', function(e){
  startX = e.targetTouches[0].pageX;

  // 在手指拉动图片的时候是不需要轮播效果的
  clearInterval(timer)
})
// 移动手指 touchmove 计算手指的滑动距离 并且移动盒子
ul.addEventListener('touchmove', function(e){
  // 计算移动距离
  moveX = e.targetTouches[0].pageX - startX;
  // 移动盒子: 盒子原来的位置 + 手指移动的距离
  // -index*w 是ul的原来位置, 因为滚动到第几张就是index*w
  let translatex = -index*w + moveX;
  // 手指拖动的话 是一点点的拖 所以不需要做动画效果
  ul.style.transition = 'none';
  ul.style.transform = `translateX(${translatex})`;
})

// 手指离开, 根据移动距离去判断是回弹还是播放上下一张
// 不管回弹还是滑动过去都是等到手指离开的时候发生的
ul.addEventListener('touchend', function(e){
  // 如果移动距离大于50px 就播放上下一张
  // 因为moveX是手指移动的距离 是根据两次触摸点的不同差值求出来的 所以可能是一个负值 这里我们不管正还是负 只要是大于50就可以 所以取绝对值
  if(Math.abs(moveX) > 50) {
      // 播放上一张还是下一张呢? 手指右滑是上一张 因为moveX是正值 手指左滑是下一张 因为moveX是负值
      if(moveX > 0) {
          index--;
      } else {
          index++;
      }
      
      // 求最新的index的值
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
  } else {
      // 如果拖动小于50px 那就回弹到当前的图片
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
  }

  // 当手指离开的时候 我们再开启定时器
  // 但是开启之前我们要清除上一个定时器, 保证页面中只有一个定时器
  clearInterval(timer);

  // 重新开启定时器 把上面的代码复制一下
  timer = setInterval(function(){
      index++;
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
  },1000)
})
```

<br>

有一种情况 当我们点击轮播上的时候 不想拖动, 所以就没必要计算里面的代码(moveX>50<50什么的)

```js 
// 这么我们就在外面声明一个全局变量
let flag = false;

// 只有我们手指移动过了 我们才让它计算, 否则不用
// 我们声明一个全局变量 定为false, 在move逻辑里修改为true 意思是只有移动过了才用计算 否则不用
let flag = false;

let focus = document.querySelector('.focus');
let ul = focus.children[0];
let w = focus.offsetWidth;

let index = 0;
let timer = setInterval(function(){
  index++;
  let translatex = -index * w;
  ul.style.transition = 'all .3s';
  ul.style.transform = `translateX(${translatex})`;
},1000)


ul.addEventListener('transitionend', function(){

  if(index >= 3) {
      index = 0;
      ul.style.transition = 'none';
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;
  } else if(index < 0) {
      index = 2;
      ul.style.transition = 'none';
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;

      ol.querySelector('.current').classList.remove('current');
      ol.children[index].classList.add('current');
  }
});

let startX = 0;
let moveX = 0;

ul.addEventListener('touchstart', function(e){
  startX = e.targetTouches[0].pageX;
  clearInterval(timer)
})


ul.addEventListener('touchmove', function(e){
  moveX = e.targetTouches[0].pageX - startX;
  let translatex = -index*w + moveX;
  ul.style.transition = 'none';
  ul.style.transform = `translateX(${translatex})`;

  // 在这里修改为true 如果用户手指移动过我们再去判断否则不做判断效果
  flag = true;

  // 取消拖动手指会滚动屏幕的默认行为
  e.preventDefault(); 
})


ul.addEventListener('touchend', function(e){

  // 在这里根据flag来 进行 相应内容的进行, 如果flag是true 那就是代码移动过了 再进行下面的逻辑判断
  if(flag) {
    if(Math.abs(moveX) > 50) {
      if(moveX > 0) {
          index--;
      } else {
          index++;
      }
      
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
    } else {
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
    }
  }
  

  clearInterval(timer);

  timer = setInterval(function(){
    index++;
    let translatex = -index * w;
    ul.style.transition = 'all .3s';
    ul.style.transform = `translateX(${translatex})`;
  },1000)
})
```

<br><br>

## 案例: 移动端的返回顶部
当页面滚动到某个地方 就显示 返回顶部的按钮 否则隐藏

<br>

### 案例分析:
页面滚动到某个地方, 我们需要事件 scroll 页面滚动事件

只要屏幕滚动就会产生一个卷进去的头部, 虽然有兼容性的问题 但是我们是移动端所有没问题

点击 window.scroll(0,0) 返回顶部

比如到 div7的位置上 让返回按钮显示 卷进去的头部的的值 如果 > div的offsetTop

```js 
// 返回顶部模块的制作
let goBack = document.querySelector('.goBack');
let nav = document.querySelector('nav');

window.addEventListener('scroll', function(e){
  if(window.pageYoffset >= nav.offsetTop) {
      goBack.style.display = 'block';
  } else {
      goBack.style.display = 'none';
  }
})

goBack.addEventListener('click', function(e){
  window.scroll(0,0);
})
```

<br><br>

## 技巧: 移动端 Click事件 延时解决方案
移动端 click 事件会有300ms的延时, 原因是移动端屏幕双击会缩放(double tap to zoom) 页面

它会看再300ms之内有没有点击两下, 如果没有就当做点击事件来处理, 因为屏幕可以放大 双指拉动, 缩小的时候双击屏幕

那我就想点击一下马上执行 不要等300ms应该怎么办?

<br>

### 解决方式:
1. 禁用缩放, 浏览器禁用默认的双击缩放行为 并且去掉300ms的点击延迟
```html
<meta name='viewport' content='user-scalable=no'>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

2. 如果有的页面要求有缩放的功能, 我们就不能添加刚才的内容, 我们利用touch事件自己封装这个事件解决300ms延迟的问题

**原理:**  
- 当我们手指触摸屏幕, 就记录当前触摸的时间
- 当我们手指离开屏幕, 又会产生一个时间, 用离开的时间减去触摸的时间
- 如果时间小于150ms 并且没有滑动过屏幕 那么我们就定义为点击

```js 
// 封装tap 解决click 300ms 延迟
function tap(obj, callback) {

  // 不移动我们的手指永远是false
  let isMove = false;

  let startTime = 0;  //记录触摸时候的时间变量
  obj.addEventListener('touchstart', function(e) {

    // 记录触摸时间, 只要触摸元素就把这个时间记入下来
    startTime = Date.now();     
  })
  obj.addEventListener('touchmove', function(e) {
    isMove = true;     // 看看是否有滑动 有滑动算拖拽 不算点击
  })
  obj.addEventListener('touchend', function(e) {

    // 手指离开的时候也有一个时间Date.now()
    if(!isMove && (Date.now()-startTime) < 150) {
      // 如果手指触摸和离开时间小于150ms算点击
      callback && callback();   // 执行回调函数
    }
    isMove = false;
    startTime = 0;
  })
}

// 调用
tap(div, function() {  执行代码 ... })
```   

<br>

### 解决方式2:
为了解决方案2的弊端 我们可以使用插件 fastclick插件解决300ms延迟
```s
https://github.com/ftlabs/fastclick
```

<br>

### 使用方法
引入js文件 把这个代码复制到页面中, 就ok了
```js
// 如果document有addEventListener的方法
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
```

<br><br>