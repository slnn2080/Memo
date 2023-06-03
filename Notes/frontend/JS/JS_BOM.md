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
#### <font color="#C2185B">location.assign():</font>
用来跳转到其他的页面, 作用和直接修改location一样

它会记录浏览历史 所有带后退功能
```js
location = "https://www.baidu.com";

// 可以用该方法改成
location.assign("https://www.baidu.com");
```
    
<br>

#### <font color="#C2185B">location.replace():</font>
用新的文档替换当前文档 可以使用新的页面替换当前页面, 调用完毕也会跳转页面  

不会生成历史记录, 不能回退
```js
location.replace("https://www.baidu.com");
```

<br>

#### <font color="#C2185B">location.reload():</font>
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

#### <font color="#C2185B">history.back():</font>
后退功能  
可以回退到上一个页面, 作用和浏览器回退按钮一样
```js
history.back();
```

<br>

#### <font color="#C2185B">history.forward():</font>
前进功能 
可以跳转到下一个页面, 作用和浏览器前进按钮一样
```js
history.forward();
```

<br>

#### <font color="#C2185B">history.go(number):</font>
前进后退功能 参数是1 前进一个页面 如果是-1 后退一个页面
可以跳转到指定页面, 它需要一个整数作为参数
- 1  向前跳转一个页面；
- 2  向前跳转两个页面
- -1 向后跳转一个页面
```js
history.go:(1);
```

<br>

#### <font color="#C2185B">history.pushState():</font>
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

pushState方法不会触发页面刷新, 只是导致hisotry对象发生变化, 地址栏会有反应

<br>

#### <font color="#C2185B">history.replaceState():</font>
history.replaceState方法的参数同上, 区别说它修改浏览器历史中当前历史记录。

<br>

### <font color="#C2185B">screen:</font>
代表用户屏幕的信息, 通过该对象可以获取到用户的显示器的相关的信息

<br>
