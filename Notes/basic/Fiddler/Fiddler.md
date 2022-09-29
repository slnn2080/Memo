# Fiddler简介
它是测试必会的一种工具

Fiddler是位于客户端和服务器端的 *http代理*
目前最常用的http抓包工具之一 功能非常强大 是web调试的利器

1. 监控浏览器所有的http/https流量(请求)
2. 查看分析请求内容细节
3. 伪造客户端请求和服务器响应(骗子)
4. 测试网站的性能
5. 解密https的web会话
6. 全局 局部断点功能
7. 第三方插件

<br>

### 使用场景:  
- 接口调试
- 接口测试
- 线上环境调试
- web性能分析
- 判断前后端bug
- 开发环境 hosts 配置
- mock
- 弱网断网测试

<br>

**注意:**  
刚安装fiddler的时候是抓不到https包的 需要做配置

<br><br>

# Fiddler的原理

### B/S架构  
编写程序部署到 web 服务器 web服务器运行在服务器上(后端开发人员会将写好的程序运行部署到服务器上) 

并绑定ip地址并监听某端口 接收 和 处理 http请求 客户端通过 http 协议获取服务器上的 网页 文档 接口等资源

``` 
              request
web client  --http协议-- >  http server
              response
```

比如 http server 里面装的 tomcat(部署前端项目 提供服务用的容器)


上面是正常的用户访问服务器资源的图解 当我们使用 fiddler 的时候相当于 fiddler 在 客户端 和 服务器中间插了一脚
``` 
client  < -- >  Fiddler  < -- >  server
```

不管是 客户端 到 服务器的请求 还是 服务器 发回 客户端的数据 fiddler 都能够监听到

那fiddler为什么能够监听到呢？比如我们使用的是谷歌浏览器 谷歌浏览器默认会去读系统代理 而fiddler一打开就会设置一个系统代理
``` 
在 fiddler工具的
  - Tools
    - options
      - connections

这里面 fiddler 监听的端口是8888
✅ act as system precess startup
```

fiddler 一打开就会作为系统的代理 像谷歌浏览器 和 ie浏览器默认读的就是系统代理

fiddler的端口是8888
fiddler作为代理服务器它的地址是 本机:8888

谷歌浏览器的配置
```
- 设置
  - 高级
    - 系统
      - 打开代理设置
        - 局域网 LAN 设置
          - 局域网设置
            - 代理服务器
            ✅ 为LAN使用代理服务器
            (上网的时候找的是一个代理服务器帮我去上网的服务器 而不是我们直接向服务器发起请求)
              - 高级
                - 我们可以发现不管是http 还是 https 使用的代理服务器的地址都 本机:8888
                (这是代理服务器就是fiddler)
```

就是代理上网的服务器设置成了fiddler 当我们把fiddler关掉后 我们再看下代理设置 发现
```
  - ❎ 为LAN使用代理服务器 前面的对号没有了
```

这就是fiddler的原理 只要我们一打开它就会去修改系统代理 浏览器一打开默认读的就是系统代理 就会将fiddler作为代理服务器 我们上网都会通过代理服务器来完成 所以它会抓取到客户端和服务器之间的通信

<br>

**firefox**  
上面是 谷歌和ie 的情况 当浏览器是火狐的时候 我们就需要做额外的设置了 我们需要自己去设置代理

<br>

**抓不了小程序的包**  
因为小程序会做一层封装 所以抓不了 包括app上抓包也越来越难

<br><br>

# HTTP相关
我们可以通过 fiddler 将一次请求导出到 txt 文档中

请求条目上右键
```
- save
  - selected session
    - as text 
```

```js
// 请求报文
GET http://test.lemonban.com/ningmengban/app/login/login.html?date=2 HTTP/1.1
Host: test.lemonban.com
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

<br><br>

// 响应报文
HTTP/1.1 200 OK
Server: nginx/1.4.2
Date: Sun, 17 Jul 2022 05:44:21 GMT
Content-Type: text/html;charset=UTF-8
Connection: keep-alive
Last-Modified: Wed, 19 Jun 2019 08:07:44 GMT
Content-Length: 5431

// ... 响应体
```

### 请求头部  
附加的信息 告诉服务器 这次请求携带的关键信息 
请求头可以是任意内容 关键就看服务器想要什么内容 比如服务端可能固定前端必须要发送哪些请求头

### 常见的请求头:  
**<font color="#C2185B">Host:</font>**  
主机ip地址 或 域名

<br>

**<font color="#C2185B">User-Agent:</font>**  
客户端相关信息 如操作系统 浏览器等信息

<br>

**<font color="#C2185B">Accept:</font>**  
指定客户端接受信息的类型 如: image/jpg

<br>

**<font color="#C2185B">Accept-Charset:</font>**  
客户端接受的字符集 如 gb2312

<br>

**<font color="#C2185B">Accept-Encoding:</font>**  
可接受的内容编码 如 gzip压缩格式 节省传输流量

<br>

**<font color="#C2185B">Accept-Language:</font>**  
客户端接受的语言环境 zh-cn  
但是服务器端可以返回英文之类的 这个只是用于服务端来判断 并不是必须是什么类型的语言
也要客户端能解码就可以

<br>

**<font color="#C2185B">*Authorization*:</font>**  
客户端提供给服务器 进行权限认证的信息

<br>

**<font color="#C2185B">cookie:</font>**  
携带的cookie信息

**<font color="#C2185B">Referer</font>**  
当前文档的url 从哪个链接过来的该次请求是从哪个链接过来的 

比如: 

post /login http/1.1  
向 /login 接口 请求  
从 referer 就能看到 这次请求来自于哪个链接

<br>

**<font color="#C2185B">Content-Type</font>**  
请求体内容类型 如 application/x-www-form-urlencode  
传递给服务器的内容是什么格式

<br>

**<font color="#C2185B">Content-Length</font>**  
数据长度 字节 byte

<br>

**<font color="#C2185B">Cache-Control</font>**  
缓存机制 

<br>

**<font color="#C2185B">Pragma</font>**  
放置页面被缓存 和 cache-control: no-cache 作用一样

<br><br>

### 响应头部  
来自于服务器的附加信息

**<font color="#C2185B">304 not modifyed</font>**  
意味着 请求回来的东西 是没有变化的不用重新去服务器请求 文档已经缓存到本地 走本地缓存

这时候我们再查看 响应体 会发现什么也灭有

通过请求头的信息 浏览器发现你请求的内容 和 本地的内容是一模一样的 就不需要服务器再发回来给我们了

<br>

### 常见的响应头:  
**<font color="#C2185B">Server</font>**  
HTTP服务器的软件信息

<br>

**<font color="#C2185B">Date</font>**  
响应报文的时间

<br>

**<font color="#C2185B">Expires</font>**  
指定缓存过期时间

<br>

**<font color="#C2185B">Set-Cookie</font>**  
设置 Çookie

<br>

**<font color="#C2185B">Last-Modified</font>**  
资源最后修改时间 通过这个时间会进行比对 可以判断资源有没有改变 没有改变就304

<br>

**<font color="#C2185B">Content-Type</font>**  
响应的类型和字符串集

<br>

**<font color="#C2185B">Content-length</font>**  
内容长度 响应体长度 byte

<br>

**<font color="#C2185B">Connection</font>**  
如 keep-alive 
表示保持tcp连接不关闭 不会永久保持连接 服务器可设置

<br>

**<font color="#C2185B">Location</font>**  
指明重定向的位置 新的URL地址 如304的情况

<br>

### 响应体可以是任意格式  
我们可以根据响应体来判断请求有没有被正常的处理

<br><br>

# Fiddler安装相关
http的网站: 
```
test.lemonban.com/ningmengban/app/login/login.html
```

**fiddler的面板组成:**  
- 左侧:  监控面板(会话列表)
- 上边:  菜单栏 和 工具条
- 右侧:  辅助标签 + 工具条
- 下边:  命令行 + 状态栏

安装的话很简单 直接下一步就可以 安装完毕后 打开fiddler会提示英文 选择no

<br>

### 菜单栏的相关信息:  

### **file:**  

**<font color="#C2185B">Capture Traffic:</font>**  
开启 关闭 捕获请求

**<font color="#C2185B">New View</font>**  
打开新的视图界面

**<font color="#C2185B">Load Archive</font>**  
加载 打开已存储的请求数据

**<font color="#C2185B">Recent Archives</font>**  
最近存储的请求数据

**<font color="#C2185B">save</font>**  
保存会话

**<font color="#C2185B">import Sesstion</font>**  
导入会话

**<font color="#C2185B">export Sesstion</font>**  
导出当前会话

<br>

### **Edit:**  
**<font color="#C2185B">copy</font>**  
复制

- session  
复制选中的会话

- just url  
复制url

- headers only  
复制头部信息

- full summary  
复制整个session列表数据

- terse summary  
复制session的简要说明

<br>

### **remove:**  
移除

- selected sessions  
移除选中的session会话

- unselected session  
移除未选中的会话 session

- all session  
移除所有的session会话


**<font color="#C2185B">paste as sessions</font>**  
将复制的session粘贴回来

**<font color="#C2185B">mark</font>**  
用颜色 删除线标记会话

**<font color="#C2185B">unlock for editing</font>**  
解锁session

**<font color="#C2185B">find sessions</font>**  
搜索session

<br>

### **Rules**  
**<font color="#C2185B">Hide Image Requests: </font>**  
隐藏图片请求，session中不显示这类请求

**<font color="#C2185B">Hide CONNECTs: </font>**  
隐藏CONNECT方法请求，session中不显示这类请求
比如建立通道的连接 我们不想关注 就可以隐藏掉

**<font color="#C2185B">Automatic Breakpoints: </font>**  
自动断点
  - Before Requests: 
  - 在请求之前进行断点，多用于修改传递给服务器的请求内容

  - After Requests: 
  - 在请求之后进行断点，多用来修改返回给客户端的响应内容

  - Disabled: 
  - 禁用断点功能

  - Ignore Images: 
  - 忽略图片请求

**<font color="#C2185B">customize Rules</font>**  
自定义规则
打开Fiddler ScriptEditor工具，调取脚本操作，用于网络修改、抓取某些如websoket包的修改，以及其它自定义的使用

**<font color="#C2185B">require proxy authentication</font>**  
要求代理认证
勾选该项，则所有未提交require proxy authentication的请求头的请求都会返回HTTP/407响应，要求客户端安装证书

**<font color="#C2185B">apply gzip encoding</font>**  
请求gzip编码
请求GZIP编码，勾选该项，则只要请求头包含了gzip标志的Accept-Encoding请求头都会1对除了图片以外的请求使用GZIP HTTP进行压缩

**<font color="#C2185B">remove all encodings</font>**  
删除所有编码
删除所有响应请求的http内容编码和传输编码

**<font color="#C2185B">hide 304</font>**  
隐藏304请求
隐藏所有304请求，不在session中展示

**<font color="#C2185B">request japanses content</font>**  
以日语发送请求
将所有请求头转换为ja标志，标志客户端希望以日语的形式发送

**<font color="#C2185B">automatically authenticate</font>**  
自动认证
自动进行验证

**<font color="#C2185B">user-agents</font>**  
选择用户代理
选择相应的用户代理模式（即你是用的浏览器信息），默认是diasbled

**<font color="#C2185B">performance</font>**  
影响web性能的简单选项
  - Simulate Modem Speeds: 
  - 模拟调制解调器速度，会使所有下载数据延迟150ms/kb

  - Disable Caching: 
  - 删除所有 If-None-Matc h和 If-Modified-Since 请求头，并添加Pragma:no-cache请求头；还会删除Expires头，并将Cache-Control设置成no-cache。但浏览器还是可以重用之前浏览器所缓存的响应

<br>

### **Tools**  
**<font color="#C2185B">options</font>**  
抓包设置选项

**<font color="#C2185B">WinINET Options…: </font>**  
打开IE浏览器的option进行设置

**<font color="#C2185B">Clear WinINET Cache: </font>**  
清空IE和其它应用中使用WinINET的缓存文件

**<font color="#C2185B">Clear WinINET Cookies: </font>**  
清空IE和其它应用中使用WinINET的cookies文件

**<font color="#C2185B">TextWizard: </font>**  
文本向导工具，可将text文本encode和decode

**<font color="#C2185B">compare sessions</font>**  
比较session

**<font color="#C2185B">reset script</font>**  
重置脚本

**<font color="#C2185B">sandbox</font>**  
sanbox官方文档

**<font color="#C2185B">view ie Cache</font>**  
查看本地文件ie缓存

**<font color="#C2185B">win8 loopback exemptions</font>**  
回环豁免

**<font color="#C2185B">new session clipboard</font>**  
打开一个新的剪切板

**<font color="#C2185B">hosts</font>**  
主机重定向工具

<br>

### Options面板详解  

### **选项卡 - General**  
**<font color="#C2185B">notify me for updates on startup</font>**  
更新时进行提醒

**<font color="#C2185B">offer upgrade to beta versions</font>**  
提供升级至测试版本

**<font color="#C2185B">enable ipv6 </font>**  
允许ipv6

**<font color="#C2185B">partcipate in the fiddler improvement program</font>**  
参与到改善fiddler的过程中

**<font color="#C2185B">enable high-reolution timers</font>**  
启用高分辨率计时器

**<font color="#C2185B">auto matically stream audio and video</font>**  
音频 视频自动选择流模式

**<font color="#C2185B">if protocol violations are observed </font>**  
如果协议产生冲突 发出严重警告提示

<br>

### **选项卡 - HTTPS**  
**<font color="#C2185B">capture HTTPS CONNECTS</font>**  
捕获https请求

**<font color="#C2185B">decrypt https traffic</font>**  
通过认证等级引擎生成整数
  - form all processes
  - 捕获所有https请求

  - from browsers only
  - 仅捕获浏览器的https请求

  - from non-browses only
  - 除了浏览器的https请求不捕获 其它https请求均捕获

  - from remote dients only
  - 仅捕获远程客户端的https请求

**<font color="#C2185B">ignore server certificate errors</font>**  
忽略系统证书问题

**<font color="#C2185B">check for certificate revocation</font>**  
检查证书是否被撤销

**<font color="#C2185B">skip decryption for the following hosts</font>**  
设置不被捕获的hosts

<br>

### **选项卡 - connections: 连接设置**  
**<font color="#C2185B">capture ftp requests</font>**  
捕获ftp请求

**<font color="#C2185B">allow remote computers to connect</font>**  
允许远程电脑连接

**<font color="#C2185B">reuse client connections</font>**  
允许客户端连接

**<font color="#C2185B">reuse server connection</font>**  
允许服务器连接

**<font color="#C2185B">act as system proxy on startup</font>**  
启动时自动更新脚本

**<font color="#C2185B">monitor all connections</font>**  
监听所有连接

<br>

### **Gateway - 网关设置**  
**<font color="#C2185B">use system proxy</font>**  
使用系统代理

**<font color="#C2185B">automatically detect proxy using wpad</font>**  
使用 wpad 自动监测代理

**<font color="#C2185B">manual proxy configuration</font>**  
手动配置代理

**<font color="#C2185B">no proxy</font>**  
无代理

<br>

### **Perfomance:**  
**<font color="#C2185B">show memory panel in status bar</font>**  
在状态栏中显示内存面板

**<font color="#C2185B">parse websocketMessage</font>**  
解析websocket消息

**<font color="#C2185B">stream and forget bodies over </font>**  
设置body最大数据量

**<font color="#C2185B">if client aborts while streaming</font>**  
设置客户端在数据流处理时终止方案

<br><br>

### 工具条  
1. 对话图标  
每个session会话(请求) 可以添加备注信息

2. replay 多次请求接口  
重新发送 选中的session会话  
shift + 点击 可以指定 重新发送多少次 这也算是一点点的压力测试 比如我们来1000次看看服务器是什么样的反馈

3. shift del  
删除选中之外的其他请求

4. x 选项  
就是清除用的 比如可以清除通道连接 非200连接 非浏览器连接 图片请求等
ctrl + x 删除所有

5. GO  
go是用在断点里面的 我们可以配合选中一个请求 点击 replay 重新发送 这样就会在断点处停下  

    **设置断点的位置:**  
    我们可以在 状态栏 all processes 的后面 有一个空白的地方 点一下就是设置断点

    点一下是设置 请求前断点 点二次就是响应后断点
    该请求在发送到服务器之前会停下来 相当于请求现在到了 fiddler 这里 并没有发送到服务器 这是当我们点击go的时候 就会发向服务器


6. stream  
fiddler接受缓冲模式 它会等服务器将所有的流数据全部到fiddler后再由fiddler一次性转送给前端 而流模式是服务器返回什么内容 就立马返回给客户端什么内容

    decode  
    解码 有些内容从服务器发送回来 会做编码或者压缩的 我们想直接看的话 可以点它进行解码 点击后会对所有的请求 都做解码操作

7. keep all session  
保持会话的数量 抓1000个保存1000个

8. any process  
选择要抓的应用 点击后有瞄准 可以移动到指定的应用上

9. find  
查找 可以查找任意信息 包括请求中的

9. save  
把选中的会话 保存成 saz 的归档文件

10. 计时器 秒表

11. browse  
我们可以快捷的打开一个浏览器

12. clear Cache  
清除缓存

13. textwizard  
文本的编码解码工具 这个很强大 什么编码都有 base64 url编码等
还可以md5加密等

<br>

**如果抓不到包的可以看看 filters 下的 usefilters 是不是开启了 -- 工具条**  

<br><br>

### 监控面板  
这里主要是展示 抓取到的每条http请求 每一条称为一个session  
主要包含了请求的
- id编号
- 状态码
- 协议
- 主机名
- url
- 内容类型
- body大小
- 进程信息
- 自定义备注

**添加 ip 列:**  
```
https://www.cnblogs.com/X404/p/12464088.html
```

**自定义列:**   
表头上右键 有添加的选项

<br><br>

### 状态栏:

### 命令行工具  
有一条黑色的部分 可以用快捷的命令 执行一些操作 help 有文档

比如
```
bpu ningmengban
```
对包含ningmengban的请求 设置断点

```
bpu
```
结束断点

### 书签

<br><br>?指定文本
指定文本的请求会高亮

>字节
大于指定字节的会高亮


capturing 左下角
是开启fiddler代理 再点一下就是关闭 关闭后不再抓取请求

<br><br>

### 右侧区域 辅助标签 和 工具  

**<font color="#C2185B">statistics 性能统计</font>**  
选中一个会话 然后点击工具选项卡中色 statistics
``` 
  Request Count:   1
    1个连接

  Bytes Sent:      1,706		(headers:1,706; body:0)
    发送了多少字节

  Bytes Received:  1,052		(headers:847; body:205)
    接收了多少字节

  ACTUAL PERFORMANCE
  --------------
  ClientConnected:	02:23:47.021
    什么时候连接的

  ClientBeginRequest:	02:31:47.035
  GotRequestHeaders:	02:31:47.035
  ClientDoneRequest:	02:31:47.035
  Determine Gateway:	0ms

  DNS Lookup: 		5ms
    dns解析的时间

  TCP/IP Connect:	4ms
    tcpip的连接时间

  HTTPS Handshake:	12ms
  ServerConnected:	02:31:47.047
  FiddlerBeginRequest:	02:31:47.059
  ServerGotRequest:	02:31:47.059
  ServerBeginResponse:	02:31:47.100
  GotResponseHeaders:	02:31:47.101
  ServerDoneResponse:	02:31:47.101
  ClientBeginResponse:	02:31:47.101
  ClientDoneResponse:	02:31:47.101

```


**<font color="#C2185B">inspectors 检查器</font>**  
双击一个请求 就相当于进入了这个面板 用来检查一个请求
这个面板分为上下两个部分 上面是请求 下面是响应


**<font color="#C2185B">auto responder 自动响应器</font>**  
可以修改请求 当遇到指定的响应的时候 返回设计好的内容


用于拦截某一个请求 进行如下的操作
重定向到本地资源
使用fiddler的内置响应
自定义响应

比如项目在生产环境中出了问题 我们直接去生产环境中调试肯定是不行的 因为我们一改影响到的就是正在使用该项目的客户 
这时我们就可以使用这个功能 将请求拦截下来 重定向到本地资源 或者 自定义响应

比如上线的项目中 我们想替换一张图片 那么我们就可以拦截这个图片的请求 不再用服务器的图片用我们本地的图片

1. 线上网站上选中图片 右键 复制 url
2. 在 autoresponder 中 点击 add Rule
3. rule editor
第一个文本框内 粘贴 图片的 url
第二个文本框内 指定 响应 下拉框里面有很多的内置响应 
``` 
  除了内置的响应 比如 404 之外
  还有 自定义的响应 比如 find file 我们找一个文件作为响应
  这时候 图片就不会从服务器回来 而是从本地找一个图片做为响应
```

4. save
每次修改后 都要save

5. 在 enable rules 前面点上对号 unmatched requests passthrough 前面点上对号
使用规则 放行一些没有匹配上的

6. 然后刷新页面

上面这样设置好 拦截规则 和 指定响应后 当我们再次的刷新页面 图片的请求就会走对应的响应

想想
比如我们使用了公共的wifi 连接它做为代理 那么我们所有的请求都会被它知道 那么它可能会拦截我们的请求 响应不好的消息

<br><br>

再比如 有一个js文件 在生产环境上出错了 又不好在生产环境中调试 
这样就可以当我们访问这个js文件的时候 可以重定向到本地的js文件 在本地完成调试
我们在监控面板中选中这个js文件 然后双击 在响应区域选择js内容 
复制到编辑器中 修改 然后保存 然后粘贴到桌面

1. 我们在请求上 右键 copy 复制 url just url 然后像上面那样自定义规则
2. 我们直接拖动请求到 autoresponder 选项卡里面

<br><br>

再比如 钓鱼
我们连接了公共wifi 然后我们发起的请求 都会被公共wifi这个代理接收到
那么它就可以拦截我们的请求 在js代码中 写入恶意的程序
比如 你中奖了 是否领奖 点击后 跳转到它自己的 钓鱼网站

这就是截获我们请求进行了篡改

<br><br> 

**<font color="#C2185B">autoresponder 自定义的响应</font>**  
再比如
后台没有开发好接口 我们也可以用这个功能模拟响应
我们将监控面板中的请求拖动到 autoresponder 面板中
在rule上面右键 edit response 自定义响应

<br><br>

再比如 
我们可以利用这个功能 去测试页面的ui情况
比如我现在时测试 我们没有办法去操作后台数据 和 前端的代码
但是我们可以借助 fiddler mock一个响应 比如我们mock一下 data为null 
这样你前端收到的list就是null 这时候你页面的展示结构是什么样的

<br><br>

**<font color="#C2185B">Composer 设计请求</font>**  
它的界面类似postman 主要是用来设计请求报文 然后执行
以往我们都是通过 浏览器 发送请求
而在composer里面我们可以直接写报文发送请求 它是一个简单的接口测试工具 或者说 fiddler直接发包工具(发http数据包)


### 修改现有的请求报文  
比如我们现在抓到一个请求 在控制面板上能看到
我们可以把这次请求 拖动到 composer 选项卡上

这样 这次请求的 请求报文 就会呈现在可修改区域 我们可以对这次的请求报文进行修改 测试

场景:
前端对输入的数据肯定有验证 比如 手机号 长度 位数 规则 等校验
但是当我们通过 fiddler 直接发送请求的时候 手机号可以输入 12345 这是后台竟然返回 手机号未注册 的字样 这就说明 后台没有做 数据校验

很多情况下 后台也需要写校验的 因为我们可以跳过前端的验证 通过这样的抓包工具发起一起非法的请求 
这样的程序健壮性是不够的


再比如

<br><br>

**<font color="#C2185B">Filter</font>**  
该选项卡是用来帮助我们过滤请求用的
如果我们要是想开启过滤器的话 我们需要点击 useFilter 让过滤器生效

这个面板中有好几种方式来进行请求过滤条件(相当于where后面的条件)的设置

过滤指的是 过请求进行各种过滤 得到指向查看的请求 *过滤出我想要的请求*

**<font color="#C2185B">Hosts</font>**  
主机的过滤

域的过滤
  - No Zone Filter
    - show only intranet hosts
    - show only internet hosts
     - 监控面板上只展示 局域网 或 广域网 的请求
     - 比如 当我们选择 局域网的话 那么广域网上的请求就抓不到了

  - No Host Filter
    - hide the following hosts
    - 隐藏以下的主机

    - show only the following hosts
    - 只展示以下的主机
    - 比如我们可以只抓取 指定 主机的请求(在监控面板中请求上右键 copy - this column)

    - flag the following hosts
    - 标记以下的主机


**<font color="#C2185B">Client Process</font>**  
进程的过滤
show only traffic form
只展示指定进程的请求

show only internet explorer traffic
只展示 ie 浏览器的请求


**<font color="#C2185B">Request Headers</font>**  
请求头的过滤

show only if url contains
只展示 url 中包含 给定内容 的请求


hide if url contains
隐藏 url 中包含 给定内容 的请求

flag reqests with headers
对 请求头中有指定内容的进行标记

delete request Headers
在请求过程中 删除指定的 headers

set request header 
在请求过程中 设置指定的 请求头
比如 我想我所有的请求中都带有 header


**<font color="#C2185B">BreakPoint</font>**  
断点的过滤

break request on post
当 post 请求的时候 才开始断点

break on ajax
当 ajax 的时候才开始断点

break response on content-Type
当有指定的内容类型的时候 才开始断点

break request on get with query string
当get请求有参数的时候 才开始断点


**<font color="#C2185B">Reponse StatusCode</font>**  
响应状态码的过滤
可以隐藏指定的响应码的请求


**<font color="#C2185B">Reponse type and size</font>**  
响应类型 和 大小的过滤



**<font color="#C2185B">Response Headers</font>**  
跟 *request headers* 功能类似

<br><br>

### 配置 fiddler 位置  
Tools
  - options


### 配置 fiddler 端口  
Tools
  - options
    - Connections 
      - port: 默认8888


### 不让fiddler做系统代理的配置  
Tools
  - options
    - Connections
    - Act as system proxy on startup

如果需要开起 fiddler 后让其自动作为系统代理 则前面打上 √ 反之则 不打 这种情况下需要我们自己配置




### 监控面板 - 相关说明  
host: 
Tunnel-to: 中间建立通道的请求


### 强制刷新清缓存  
F12 - 刷新按钮上右键 - 去缓存刷新


### 清除 选中的 请求项 之外 的请求项  
shift + del


### 查看 请求条目   
双击该条目 该请求条目分为上下两块展示区 上面是请求 下面是响应 
我们上下两块展示区 都选择 Row 模式展示(原始)


### 乱码  
我们可以看下 响应回来的数据的 Content-Type: text/html; charset=GBK
那当我们用UTF-8来看的话就是乱码

<br><br>

# 断点的设置
断点的设置方式有两种 
1. 全局断点
2. 局部断点

设置断点后 我们可以进行数据篡改
autoresponder 是设置好规则 自动进行响应(篡改)
设置断点是 请求 或 响应停下来了 我们手动进行修改 或 篡改 接口调试


### 全局断点  
把所有的请求都会断点

Rules 
  - Automatic BreakPoints
    - Before Requests   请求前 请求已经到fiddler 没有发给服务器
    - After Responses   响应后 响应已经到fiddler 没有发给客户端


### 局部断点  
局部断点要通过 命令 去完成

### bpu 请求url中包含的文本(关键字或完整的路径都可以)  
该命令就是 *请求前断点*
当 指定文本 的时候 开始请求前断点

### bpafter 请求url中包含的文本(关键字或完整的路径都可以)  
该命令就是 *响应后断点*
当 指定文本 的时候 开始响应后断点


### bpu  
直接输入这个命令就是取消断点


### 模拟网络中断  
我们可以设置 响应后断点 一直不点go 一直不让响应回到客户端 就相当于在模拟网络中断
因为客户端是有超时机制的 1 2 秒没有发回来就超时了

<br><br>

# 弱网测试

Rules
  - Performance
    - simulate modem speeds

模拟网络限速
当我们勾选上这个选项后 请求就会变的非常的慢了


Rules
  - Customize Rules
    - 在源代码中搜索 simulate
    - if(m_simulateModem) 到这里

我们上面 选择的 vsimulate modem speeds 其实就是修改的这个变量
我们能看到源代码中 请求和响应的延时时长 1kb延迟300ms 我们可以修改这个数值
```js 
oSession("request-trickle-delay") = 300
```

<br><br>

# 抓取 HTTPS 请求
fiddler是一个代理 所以请求都能到fiddler中
但是如果我们不设置的话 fiddler 是没有办法对https的请求进行解码的

为什么要解码？
因为 https 相当于 http + ssl + TLS 对http进行加密的结果
加密的http是有证书存在的

比如我们访问 百度 百度就是https 那么百度会分配给客户端一个证书的
证书里面会有 对称 或 非对称 的算法 有秘钥的存在 它会分配给客户端一个公钥 进行数据的通信 如果没有公钥是没有办法解密的

如果我们要对请求数据进行解密的话 就需要安装证书


1. 
  - Tools 
    - fiddler options 
      - https
       - 勾选 decrypt https traffic 解密https的流量

2. 过程中有安装证书


如果抓不到的话 我们这么操作
同面板 点击 Actions

  - Actions 
    - Reset All Cerificates 重置所有的证书
    - 然后安装证书


如何查看安装的证书
Actions
 - Open windows Cerificates manager


### 谷歌和ie读的是系统证书 所以按照上面那样就可以了 *但是火狐不行*  
因为火狐是自己管理自己的证书
https://www.bilibili.com/video/BV1c4411c7zH?p=21&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b



### App抓包  
https://www.bilibili.com/video/BV1c4411c7zH?p=22&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b