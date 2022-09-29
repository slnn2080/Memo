### meta
- meta是html语言head区的一个辅助性标签。也许你认为这些代码可有可无。其实如果你能够用好meta标签，会给你带来意想不到的效果，

- meta标签的作用有：
- 1. 搜索引擎优化（SEO
- 2. 定义页面使用语言，
- 3. 自动刷新并指向新的页面，
- 4. 实现网页转换时的动态效果，
- 5. 控制页面缓冲，
- 6. 网页定级评价，
- 7. 控制网页显示的窗口等！ 

- meta标签的组成：meta标签共有两个属性，它们分别是http-equiv属性和name属性，


> name属性
- 该属性用于描述网页 对应于content(网页内容)
- 它在标签体中的体现是

> name="内容" content="内容对应的值"

- name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。 

> 常用的有:
- 关键字
- name="keywords" content="关键字1 关键字2 关键字3"

- 网页描述
- name="description" content="对这个网页的描述"

- 用以说明生成的工具
- name="generator" content="Microsoft FrontPage4.0"

- 用以说明网页的作者
- name="author" content="root,root@xxxx.com"

- 用以告诉浏览器你的渲染模式
- name="renderer" content="webkit"

- 用以说明viewport(视图模式）
- name="viewport" content="width=device-width,initial-scale=1"



> http-equiv属性
- 相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。 

- 它在标签体中的体现是
- http-equiv="参数" content="参数变量值"

- 比如以前的编辑器在生成html文档的时候会有下面的内容
- 它是连接的意思 连接到的是一个html文档 编码格式是UTF-8
```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

- Expires 期限
- 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输
```html
<!-- 必须使用GMT的时间格式 -->
<meta http-equiv="expires" content="Fri,12Jan200118:18:18GMT">
```

- Pragma cache模式
- 禁止浏览器从本地计算机的缓存中访问页面内容。
```html
<!-- 这样设定，访问者将无法脱机浏览。  -->
<meta http-equiv="Pragma" content="no-cache">
```

- Refresh 刷新
- 自动刷新并指向新页面。 
```html
<!-- 意后面的引号，分别在秒数的前面和网址的后面  -->
<meta http-equiv="Refresh" content="2;URL=http://www.jb51.net">
```

- Set-Cookie(cookie设定) 
- 如果网页过期，那么存盘的cookie将被删除。 
```html
<!-- 必须使用GMT的时间格式。   -->
<meta http-equiv="Set-Cooki" content="cookievalue=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">
```

- Window-target(显示窗口的设定) 
- 强制页面在当前窗口以独立页面显示。
```html
<!-- 用来防止别人在框架里调用自己的页面。    -->
<meta http-equiv="Window-target" content="_top">
```

- content-Type(显示字符集的设定) 
- 设定页面使用的字符集。 
```html
<!-- 用来防止别人在框架里调用自己的页面。    -->
<meta http-equiv="content-Type" content="text/html;charset=gb2312">
```

- content-Language（显示语言的设定）
- 设定页面使用的字符集。 
```html
<!-- 用来防止别人在框架里调用自己的页面。    -->
<meta http-equiv="Content-Language" content="zh-cn">
```

- Cache-Control指定请求和响应遵循的缓存机制。 
- 不缓存
```html
<meta http-equiv="cache-control" content="no-cache" />
```



> Meta标签使用技巧： 
- Meta标签是用来描述网页属性的一种语言，标准的Meta标签可以便于搜索引擎排序，提高搜索引擎网站权重排名。要想网站做的更符合搜索引擎标准就必须了解meta标签，下面由Seoer惜缘于大家讲讲meta标签含义与使用方法： 

- 1. META标签的keywords 
- 写法为：<meta name="Keywords" content="信息参数"/> 
- meat标签的Keywords的的信息参数，代表说明网站的关键词是什么。 

- 2. META标签的Description 
- <meta name="Description" content="信息参数"/> 
- meta标签的Description的信息参数，代表说明网站的主要内容，概况是什么。 

- 3. META标签的http-equiv=Content-Typecontent="text/html 
- http-equiv=Content-Type代表的是HTTP的头部协议，提示浏览器网页的信息， 

<meta http-equiv="Content-Type" content="text/html;charset=信息参数"/> 

- meta标签的charset的信息参数如GB2312时，代表说明网站是采用的编码是简体中文； 

- meta标签的charset的信息参数如BIG5时，代表说明网站是采用的编码是繁体中文； 

- meta标签的charset的信息参数如iso-2022-jp时，代表说明网站是采用的编码是日文； 

- meta标签的charset的信息参数如ks_c_5601时，代表说明网站是采用的编码是韩文； 

- meta标签的charset的信息参数如ISO-8859-1时，代表说明网站是采用的编码是英文； 

- meta标签的charset的信息参数如UTF-8时，代表世界通用的语言编码； 


- 4. META标签的generator 
- <meta name="generator"content="信息参数"/> 
- meta标签的generator的信息参数，代表说明网站的采用的什么软件制作。 


- 5. META标签的author 
<meta name="author" content="信息参数"> 
- meta标签的author的信息参数，代表说明网页版权作者信息。 


- 6. META标签的http-equiv="Refresh" 
<Meta http-equiv="Refresh" Content="时间;Url=网址参数"> 
- meta标签的Refresh代表多少时间网页自动刷新，加上Url中的网址参数就代表，多长时间自动链接其他网址。 


- 7. META标签的HTTP-EQUIV="Pragma"CONTENT="no-cache" 
- <META HTTP-EQUIV="Pragma" CONTENT="no-cache">代表禁止浏览器从本地计算机的缓存中访问页面内容,这样设定，访问者将无法脱机浏览。 

- 8. META标签的COPYRIGHT 
<META NAME="COPYRIGHT" CONTENT="信息参数"> 
- meta标签的COPYRIGHT的信息参数，代表说明网站版权信息。 

- 9. META标签的http-equiv="imagetoolbar" 
- <meta http-equiv="imagetoolbar" content="false"/> 
- 指定是否显示图片工具栏，当为false代表不显示，当为true代表显示。 

- 10. META标签的Content-Script-Type 
- <Meta http-equiv="Content-Script-Type" Content="text/javascript"> 
- W3C网页规范，指明页面中脚本的类型。 

- 11. META标签的revisit-after 
<META name="revisit-after" CONTENT="7days"> 
revisit-after代表网站重访,7days代表7天，依此类推。 

- 12. META标签的Robots<meta name="Robots" contect="信息参数"> 
- Robots代表告诉搜索引擎机器人抓取哪些页面 

- 其中的属性说明如下： 

信息参数为all：文件将被检索，且页面上的链接可以被查询； 

信息参数为none：文件将不被检索，且页面上的链接不可以被查询； 

信息参数为index：文件将被检索； 

信息参数为follow：页面上的链接可以被查询； 

信息参数为noindex：文件将不被检索，但页面上的链接可以被查询； 

信息参数为nofollow：文件将被检索，但页面上的链接不可以被查询；