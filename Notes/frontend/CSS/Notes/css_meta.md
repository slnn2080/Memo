# meta
meta是html语言head区的一个辅助性标签。

也许你认为这些代码可有可无。其实如果你能够用好meta标签, 会给你带来意想不到的效果

<br>

### meta标签的作用有: 
1. 搜索引擎优化
2. 定义页面使用语言
3. 自动刷新并指向新的页面
4. 实现网页转换时的动态效果
5. 控制页面缓冲
6. 网页定级评价
7. 控制网页显示的窗口等

<br>

### meta标签的组成: 
meta标签共有两个属性
- http-equiv
- name

<br><br>

## name属性:
该属性用于描述网页 对应于content(网页内容)它在标签体中的体现是
```html
<meta name="内容" content="内容对应的值">
```

<br>

name属性主要用于描述网页, 与之对应的属性值为content, **content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的** 

<br>

### 常用的有:
**关键字**  
Keywords的的信息参数, 代表说明网站的关键词是什么
```html
<meta name="keywords" content="关键字1 关键字2 关键字3">
```

<br>

**网页描述**  
Description的信息参数, 代表说明网站的主要内容, 概况是什么
```html
<meta name="description" content="对这个网页的描述">
```

<br>

**用以说明生成的工具**  
代表说明网站的采用的什么软件制作
```html
<meta name="generator" content="Microsoft FrontPage4.0">
```

<br>

**用以说明网页的作者**  
代表说明网页版权作者信息
```html
<meta name="author" content="root,root@xxxx.com">
```

<br>

**用以告诉浏览器你的渲染模式**  
```html
<meta name="renderer" content="webkit">
```

<br>

**用以说明viewport(视图模式)**  
```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

<br><br>

## http-equiv属性
**相当于http的文件头作用**  

它可以向浏览器传回一些有用的信息, **以帮助正确和精确地显示网页内容** 与之对应的属性值为content, content中的内容其实就是各个参数的变量值。 

<br>

它在标签体中的体现是
```html
<meta http-equiv="参数" content="参数变量值">
```

<br>

比如以前的编辑器在生成html文档的时候会有下面的内容 它是连接的意思 连接到的是一个html文档 编码格式是UTF-8

HTTP的头部协议, 提示浏览器网页的信息
```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

- GB2312: 代表说明网站是采用的编码是简体中文
- BIG5: 代表说明网站是采用的编码是繁体中文
- iso-2022-jp: 代表说明网站是采用的编码是日文
- ks_c_5601: 代表说明网站是采用的编码是韩文
- ISO-8859-1: 代表说明网站是采用的编码是英文
- UTF-8: 代表世界通用的语言编码

<br>

### 常用的有:
**Expires 期限:**  
可以用于设定网页的到期时间。一旦网页过期, 必须到服务器上重新传输
```html
<!-- 必须使用GMT的时间格式 -->
<meta http-equiv="expires" content="Fri,12Jan200118:18:18GMT">
```

<br>

**Pragma cache模式:**  
禁止浏览器从本地计算机的缓存中访问页面内容。这样设定, 访问者将无法脱机浏览。 
```html
<!-- 这样设定, 访问者将无法脱机浏览。  -->
<meta http-equiv="Pragma" content="no-cache">
```

<br>

**Refresh 刷新:**  
自动刷新并指向新页面。 
代表多少时间网页自动刷新, 加上Url中的网址参数就代表, 多长时间自动链接其他网址。 
```html
<!-- 意后面的引号, 分别在秒数的前面和网址的后面  -->
<meta http-equiv="Refresh" content="2;URL=http://www.jb51.net">
```

<br>

**Set-Cookie(cookie设定):**  
如果网页过期, 那么存盘的cookie将被删除。 
```html
<!-- 必须使用GMT的时间格式。 -->
<meta http-equiv="Set-Cooki" content="cookievalue=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">
```

<br>

**Window-target(显示窗口的设定):**  
强制页面在当前窗口以独立页面显示
```html
<!-- 用来防止别人在框架里调用自己的页面。 -->
<meta http-equiv="Window-target" content="_top">
```

<br>

**content-Type(显示字符集的设定):**  
设定页面使用的字符集。 
```html
<!-- 用来防止别人在框架里调用自己的页面。 -->
<meta http-equiv="content-Type" content="text/html;charset=gb2312">
```

<br>

**content-Language(显示语言的设定):**  
设定页面使用的字符集。 
```html
<!-- 用来防止别人在框架里调用自己的页面。 -->
<meta http-equiv="Content-Language" content="zh-cn">
```

<br>

**Cache-Control指定请求和响应遵循的缓存机制:**  
不缓存
```html
<meta http-equiv="cache-control" content="no-cache" />
```

<br>

**imagetoolbar:**  
指定是否显示图片工具栏, 当为false代表不显示, 当为true代表显示。 
```html
<meta http-equiv="imagetoolbar" content="false"/> 
```

<br>

**Robots:**  
Robots代表告诉搜索引擎机器人抓取哪些页面 
```html
<meta name="Robots" contect="信息参数"> 
```

- all: 文件将被检索, 且页面上的链接可以被查询
- none: 文件将不被检索, 且页面上的链接不可以被查询
- index: 文件将被检索
- follow: 页面上的链接可以被查询
- noindex: 文件将不被检索, 但页面上的链接可以被查询
- nofollow: 文件将被检索, 但页面上的链接不可以被查询

