# Nginx是一个服务器软件
它是一个高性能 http 和 反向代理 服务器 有资料表明 nginx 可以支持高达 5万 并发连接数  
很多网站都会将 nginx 做为服务器来使用

nginx 的一些基本概念
- 反向代理
- 负载均衡
- 动静分离
- 高可用

nginx 不仅仅可以做反向代理 实现负载均衡 还能用作正向代理来进行上网等功能

<br>

### **负载均衡**
客户端发送多个请求到服务器 服务器处理请求 有一些可能要与数据库进行交互 服务器处理完毕后 再将结果返回给客户端
```
用户 -> 服务器 -> 数据库
```

这种架构模式对并发量要求不高的项目是不错的 因为这样的成本也低 但随着信息数量不断增加 访问量和数据量的飞速增长 业务的复杂度也在增长 也会对并发的要求越来越高   
如果并发量特别大的时候 上面的传统模式 可能会崩溃 而解决方式也就是我们想要说的负载均衡

单个服务器解决不了 我们就增加服务器的数量 然后将请求分发到各个服务器上 将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上 将负载分发到不同的服务器 这就是负载均衡

<br>

我们一直的学习模式 或者说自己做练习的模式都是
```
用户 -> 服务器 -> 数据库
```

但现在我们在学习的是 在用户和应用服务器之间 加了一层服务器 这层服务器也就是nginx
```
  用户 -> nginx -> 服务器 -> 数据库
```

<br>


### **动静分离**
为了加快网站的解析速度 可以把动态页面和静态页面由不同的服务器来解析 加快解析速度 降低原来单个服务器的压力 

**静态资源:**  
html css js img

**动态资源:**  
jsp servlet

把动态资源 和 静态资源 分开进行部署 我们把动态资源放在应用服务器上(tomcat) 把静态资源前置放在 nginx 上  
如果用户访问的是动态资源 那么就将请求转发到 tomcat服务器  
如果请求的是静态资源 首先我们会将静态资源放在一台专门的服务器(静态资源服务器 或者 直接放在nginx里) 然后让nginx将请求转发到 静态资源服务器上

<br><br>

# Nginx环境安装
vmware秘钥(可以不用花钱的钥匙)
```
https://www.xitongcheng.com/jiaocheng/dnrj_article_72794.html
```

vmware下载地址
```
https://www.vmware.com/cn/products/workstation-pro/workstation-pro-evaluation.html
```

finalshell
```
http://www.hostbuf.com/t/988.html
```

nginx是一个服务器的软件我们肯定要先安装 nginx也可以安装在windows但是只有安装到Linux下它才能发挥最大的性能

<br><br>

# Centos7 Linux的操作系统
我们先安装的 vm 虚拟机 然后安装的 Centos7 镜像 安装步骤可以查看 pdf 文档

我们设置的 Linux root用户的用户名和密码如下:
```
root
111111
```

### **安装好Linux系统后的第一件事**

**1. 安装虚拟os要配置网卡**
```
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

<br>

**2. 修改 ONBOOT=yes**
```
  // 参考
TYPE=Ethernet   # 网卡类型: 为以太网
PROXY_METHOD=none  # 代理方式: 关闭状态
BROWSER_ONLY=no  # 只是浏览器: 否
BOOTPROTO=static  # 网卡协议 static 静态主机配置协议
DEFROUTE=yes  # 默认路由: 是
IPV4_FAILURE_FATAL=no   # 是否开启IPV4致命错误检测: 否
NAME=ens33  # 网卡名字（与DEVICE一致）
UUID=61bd3c1f-e4ca-40ef-bc6a-f3266763fe8d  #唯一标识码
DEVICE=ens33  #网卡设备
ONBOOT=yes  # 是否激活网卡


IPADDR=192.168.159.10  #ip地址（static设置）
NETMASK=255.255.255.0  #子网掩码
GATEWAY=192.168.159.2  #网关
DNS1=114.114.114.114   #dns1 地址解析
DNS2=8.8.8.8  #dns2 地址解析
```

<br>

**3. 重启网络服务**
```
systemctl restart network
```

<br>

**4. 测试 ping qq.com**

<br>

### **查看虚拟机 ip 地址**
```
ip addr
192.168.25.128
```

<br>

### **关掉虚拟机**
```
init 0
```

<br>

### **配置静态ip**
之前的网络配置使用dhcp方式分配ip地址 这种方式会在系统每次联网的时候分配一个ip给我们用 也就是说有可能系统下次启动的时候ip会变 这样非常不方便我们管理


**1. 配置静态ip首先打开网卡配置文件**
```
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

<br>

**2. 在打开的文件的最后添加**
```
# 先把上面的修改为 static
BOOTPROTO=static

IPADDR=192.168.25.101  #ip地址（static设置）
NETMASK=255.255.255.0  #子网掩码
GATEWAY=192.168.25.2  #网关
DNS1=114.114.114.114   #dns1 地址解析
DNS2=8.8.8.8  #dns2 地址解析
```

<br>

**3. 重启网络服务**
```
systemctl restart network
```

<br>

**注意:**
我们配置的网关必须跟 vmware 的网关一致
查看 vmware 网关的方式
1. 点击编辑 - 虚拟网络编辑器 nat设置 查看网关 
``` 
https://www.bilibili.com/video/BV1yS4y1N76R?p=5&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

2. 真正的环境中 不要随意修改地址 会照成别人上不了网

<br><br>

# Nginx 4个发行版本
**1. Nginx开源版**
```
http://nginx.org
```

**2. Nginx商业版**
```
https://www.nginx.com
```

**3. Openresty**
```
http://openresty.org
```

**4. Tengine**
```
http://tengine.taobao.org
```

<br><br>

# Nginx在 Centos 7 中编译安装成系统服务
要安装Nginx的话 先要搭载运行环境 下面我们通过虚拟机来进行安装  

我们可以使用 finalshell 或者 ssh 远程连接到 Linux 操作系统中

<br>

### **Nginx开源版安装**
弹幕说 下面的安装步骤都不用 直接
```
yum install nginx
```

<br><br>

### **一个老师的安装总结**
**安装的部分 参考pdf 上面记载的很全**
```
https://www.bilibili.com/video/BV1yS4y1N76R?p=7&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

安装完所有的东西后 要依次执行
```
./configure --prefix=/usr/local/nginx
make  (编译)
make install  (安装)
```

<br><br>

### **另一个老师的安装总结**
看上面的那个就行 这个做下补充总结

**前置操作:**  
去官网上下载了 安装包 nginx-1.12.2.tar.gz

<br>

**再安装nginx之前 我们需要先安装依赖**
```
pcre-8.37.tar.gz
openssl-1.0.1t.tar.gz
zlib-1.2.8.tar.gz
nginx.1.11.1.tar.gz
```

<br>

### **pcre-8.37.tar.gz的安装 (先下载后安装的方式)**
把下载包的包 上传到 linux 系统中, 可以先cd进入指定目录 然后把包直接推动小黑屏中

然后进行解压 
```
tar -xvf pcre-8.37.tar.gz
```

*进入到解压后的目录* 执行 ./configure 进行检查操作

<br>

然后 make && make install 编译并安装 我们查看是否安装成功
```
pcre-config --version
```

<br>

### **安装例外的依赖 使用 yum 命令**
```
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
```
这样就可以了

<br>

### **安装 nginx**
1. 下载 nginx 包 nginx-xx.tar.gz 
2. 进入指定目录 解压(直接包拖到小黑屏 或 上传功能)
3. 执行 ./configure (检查)
4. make && make install

<br><br>

### **nginx操作的常用命令**
使用 nginx 操作命令前提条件 必须进入 nginx 目录中的 *sbin目录*
```
/usr/local/nginx/sbin
```

<br>

### **查看 nginx 的版本号**
```
./nginx -v
```

<br>

### **启动 nginx**
```js
// 该命令是后台启动了nginx
./nginx
```

<br>

### **快递停止 nginx**
```
./nginx -s stop
```

<br>

### **优雅关闭 在退出前完成已经接受的链接请求**
```
./nginx -s quit
```

<br>

### **重新加载配置**
当我们修改 配置文件 后想要生效 必须要重启 如果我们不想重新 nginx 服务器的话 我们可以使用该命令重新加载 配置文件
```js
//  更改完配置文件后立即生效 而不重启nginx整个服务器
./nginx -s reload
```

<br>

### **查看所有命令**
```
./nginx -help
```

<br><br>

### **检查看看是否启动了 nginx **
浏览器上输入ip验证
```
ip addr 查看ip
```

<br>

如果访问不到的话 可以关闭防火墙  
因为在linux中默认有防火墙 默认是不能访问的 所以我们可以在防火墙中添加规则 让其可以访问 80 端口

<br>

### **查看开放的端口号**
```
firewall-cmd --list-all
```

### **设置开放的端口号**
```
firewall-cmd --add-service=http -permanent 
sudo firewall-cmd --add-port=80/tcp --permanent
```

<br>

### **关闭防火墙**
```
systemctl disable firewalld.service
```

<br>

### **放行防火墙**
如果这台虚拟机要对外网进行开放的话 可以开放下端口
```
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

<br>

### **重启防火墙**
```
firewall-cmd --reload
```

<br><br>

### **将 nginx 启动配置成系统服务**
上面我们在启动 nginx 的时候 是去 sbin/ 目录下 执行 ./nginx 命令 启动nginx 我们还可以创建一个脚本文件

<br>

### **创建服务脚本**
```
vi /usr/lib/systemd/system/nginx.service
```

<br>

**添加文件内容**
如果我们的nginx 不在/usr/local 下我们要修改下面代码里面的路径
```
[Unit]
Description=nginx -  web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

### **重新加载系统服务**
```
systemctl daemon-reload
```

<br>

### **启动服务 (配置完服务脚本后 启动nginx的命令为)**
```
systemctl start nginx
```

没有配置 关闭nginx的服务命令 所以我们想要关闭的时候 还是要进入 sbin 目录下 执行下面的命令
```
./nginx -s stop
```

<br>

### **关闭 Nginx**
```
systemctl stop nginx
```

<br>

### **检查是否启动成功**
```
systemctl status nginx
```

<br>

### **重新加载配置文件 (不用重启)**
```
systemctl reload nginx
```


### **配置开机启动**
```
systemctl enable nginx.service
```

<br><br>

# Nginx所在的位置
```
/usr/local/nginx
```

<br><br>

# Nginx目录结构

刚开始安装好的目录为
```js
| - conf
  // nginx主配置文件

  - nginx.conf
    // 这里会引用其他的配置文件

| - html
  // 默认的页面

| - logs
  - access.log  
  // 访问日志 用户的访问时间 请求地址文件 附加参数

  - error.log
  // 系统出现错误的 会记录这里

  - nginx.pid
  // nginx 的 id

| - sbin
  // nginx的执行程序
```

其中运行后会产生几个 _temp 结尾的目录
```js
| - conf
| - html
| - logs
| - sbin

| - client_body_temp
| - fastcgi_temp
| - proxy_temp
| - scgi_temp
| - uwsgi_temp
```

<br><br>

# Nginx多进程模型 和 基本请求流程
**1. 用户会通过网络访问 nginx**

<br>

**2. nginx 在响应请求的时候 过程是**
- ./nginx 开启nginx会它会开启 master 主进程
- master会读取配置文件 并 检验(conf/nginx.conf)
- 如果配置文件没有错误会开启子进程 worker

- master 主进程 并不处理业务 它会协调子进程
- worker 子进程

- 当主进程 和 子进程 都启动之后 就会等待用户请求
- 用户请求进到nginx中的时候是由 worker 线程 来响应并解析的

<br>

**3. 用户请求过来后 worker会解析请求 看看用户请求的资源 worker会读取 conf/nginx.conf 配置文件里面写了站点的主目录 然后根据配置文件里的指定的内容 去对应的目录找资源**

<br>

### **总结:**
nginx在启动后 是多进程同时运行的模式 多进程同时完成用户的请求

<br><br>

# Nginx基础配置
nginx 的配置文件在 
```
/usr/local/nginx/conf/nginx.conf
```

这个就是nginx的默认的配置文件 我们可以用记事本打开 里面的代码带井号为注释  
我们把nginx原本配置文件中的注释删掉 看看还剩什么部分 这些也是保证nginx能够运行的最小的配置文件的版本

<br><br>

# nginx的配置文件由3部分组成

### **1. 全局部分**  
从配置文件开始 到 events 部分之间的内容(类似全局变量的位置)  
主要会设置一些影响 nginx 服务器整体运行的配置指令 主要包括

- 配置运行 nginx 服务器的用户(组)
- 允许生成的 worker process数
- 进程的 pid 存放路径
- 日志存放路径
- 类型以及配置文件的引入等

<br>

**<font color="#C2185B">user [user] [group]</font>**  
指定可以运行nginx服务的用户和用户组, 只能在全局块配置 **user指令在Windows上不生效, 如果你制定具体用户和用户组会报警告**

<br>

**<font color="#C2185B">worker_processes</font>**  
配置nginx的进程   
nginx进程数量worker_processes 比如设置为2 nginx将会开启一个master进程和2两个worker进程

默认为1, 表示开启一个业务进程 工作的进程个数
这个值越大 可以支持的并发处理量越多 但是会受到硬件软件等设备的影响

```
{
  worker_processes  1;
}
```

这个部分设置多少 基本上会对应电脑cpu的物理内核数 比如我们这台虚拟机我们分配了一个内核 那就设置为1 如果设置为10 并没有太多的意义 如果把一个cpu绑定到多个进程上执行任务 它会分开时间段同时去执行好多任务 这样的话效率反而会变低 

上面我们说到了 nginx 的运行模型 它是由一个主进程 和 多个子进程 同时运行的  
主进程叫做 master  
子进程叫做 worker  

这个配置项代表在启动nginx的时候 需要启动多少个 worker

<br>

**<font color="#C2185B">pid logs/nginx.pid</font>**  
存放pid文件

<br>

**<font color="#C2185B">error_log logs/error.log</font>**  
全局错误日志类型 debug info warn error 存放地址

<br>

### **2. events部分**  
events块涉及的指令主要影响Nginx服务器与用户的网络连接。常用到的设置包括是否开启对多worker process下的网络连接进行序列化, 是否允许同时接收多个网络连接, 选取哪种事件驱动模型处理连接请求, 每个worker process可以同时支持的最大连接数等

**事件驱动模块**   
主要影响nginx服务器与用户的网络连接 

常用的设置包括:
- 是否开启对 work process 下的网络连接进行序列化
- 是否允许同时接收多个网络连接
- 选取哪种事件驱动模型来处理连接请求
- 每个work process可以同时支持的最大连接数

这个部分的配置对 Nginx 的性能影响较大 在实际中应该灵活配置
```js
events {
  // 单个业务进程可接受连接数 每一个worker可以创建多少连接 默认就是1024
  worker_connections 1024;
}
```

<br>

**<font color="#C2185B">accept_mutex</font>**  
默认开启-开启之后nginx 的多个worker将会以串行的方式来处理, 只会有一个worker将会被唤起, 其他的worker继续睡眠, 如果不开启将会造成惊群效应多个worker全部唤起不过只有一个Worker能获取新连接, 其它的Worker会重新进入休眠状态

<br>

**<font color="#C2185B">worker_connections</font>**  
单个进程最大连接数（最大连接数=连接数+进程数）   
注意不要将cpu堆满

<br>

### **3. http部分**  
http块是Nginx服务器配置中的重要部分, 代理、缓存和日志定义等绝大多数的功能和第三方模块的配置都可以放在这个模块中。

http模块包括:
- 代理
- 缓存
- 日志 等

<br>

http块里面又包含 http全局块 和 server块
```js
http {
  全局块
  server {}
  location {}
}
```

<br>

**http模块中的全局块:**  
- 文件引入
- MIME-TYPE定义
- 日志自定义
- 连接超时时间
- 单链接请求数上限等

<br>

### **全局块配置:**  
**<font color="#C2185B">include</font>**  
可以将另一个配置文件 引入当前的配置文件中
```
include mime.types; 
```

引入http mime类型 响应头里面会标明当前返回的文件是什么类型的 比如我们传送一张图片 我们给它的mime type加到头信息里面 那么浏览器就会按照服务器端返回的数据类型（图片的类型）来展示这个文件 

比如我们上网我们输入网址打开一张图片的时候 浏览器会默认将图在页面上展示出来 而不是下载

如果我们上面图片的类型换成exe会怎么样 浏览器会根据mimetype 弹出一个下载框供我们下载 **所以文件是展示还是下载并不是由后缀名来决定的 是由我们返回的mime types来决定的**

*mime.types* 文件里面 是根据文件的后缀 和 mimetype 进行一一对应 比如我们得文件后缀是html 那么html对应这 text/html 这样就会在返回的响应头里面加上 text/html 

这样浏览器就会根据 响应头里面的 mime types 来解析我们响应回的文件 这个 mime types 是告诉浏览器 让浏览器进行解析的

同样 比如.css文件 那就会在响应头里面添加 text/css 这样浏览器才会根据 css的规则去读这个文件 一般来说 都是通过 content-type 来添加该mime类型的吧

当我们有特殊的文件后缀比如 .mp5 但是它没有对应的 mime 类型 这时假如我们想告诉浏览器 使用 mp4 的方式让浏览器打开 就可以在这个 mime types 配置文件里面 这么写

video/mp4 mp5

<br>

**<font color="#C2185B">default_type</font>**  
如果Web程序没设置, Nginx也没对应文件的扩展名, 就用Nginx 里默认的 default_type定义的处理方式。default_type application/octet-stream; #nginx默认文件类型

因为 mime types 里面不可能添加所有后缀对应的mime类型 这时候我们就可以使用这个配置项 默认值为 application/octet-stream

以octet格式的流的方式传送给客户端（如果mime类型没匹配上, 默认使用二进制流的方式传输。）

<br>

**<font color="#C2185B">log_format</font>**  
用于定义日志格式, 此指令只能在http块中进行配置

<br>

**<font color="#C2185B">sendfile</font>**  
简单来说就是启用sendfile() 它会调用底层系统调用来替换read()和write()调用, 减少系统上下文切换从而提高性能, 当 nginx 是静态文件服务器时, 能极大提高nginx的性能表现

请求发送给服务器 服务器中有请求所需要的资源 比如 ooxx.mp4 nginx它是一个软件 软件是运行在操作系统之上的 我们现在使用的是 linux操作系统

请求发送过来后 nginx 怎么接收的呢？  
是由操作系统的网络接口转发给 nginx 然后它才能读到用户的请求 

怎么转发的呢？ 绑定注册 java也是启动一个程序的时候 会向操作系统注册某个端口 注册也就是告诉它 以后通过xx端口发送过来的请求转发给nginx

然后nginx接收到请求了 它需要去磁盘中找文件 它会根据配置目录然后去指定的文件夹下面找文件 然后将找到的文件发送给客户端 这个过程开启了 我们是否使用 sendfile 

如果: sendfile off

当我们关闭的话 就会有 read write 两个过程 read就是nginx去read这个文件 将这个文件的内容加载到应用程序的内存里面 然后再发送给计算机的网络接口 这个过程需要层层的复制

nginx读文件是一层复制 它复制完成后将数据复制到自己的内存里 然后还要将数据复制给网络接口 再由网络接口将数据推送给用户

如果: sendfile on

当客户端向nignx请求资源 当我们开启on之后 nginx不会去找资源 读资源 而是会向网络接口发送一个信号 网络接口读取文件 然后直接发送给客户端 **这里面减少了一次数据拷贝的过程** 

<br>

**<font color="#C2185B">keepalive_timeout</font>**  
HTTP 有一个 KeepAlive 模式, 它告诉 webserver 在处理完一个请求后保持这个 TCP 连接的打开状态。若接收到来自客户端的其它请求, 服务端会利用这个未被关闭的连接, 而不需要再建立一个连接。

保持连接的超时时间 如果想要保持长链接的话 一般从两个方向聊 一是客户端 二是代理端

<br>

**<font color="#C2185B">gzip</font>**  
开启Gzip压缩功能,  可以使网站的css、js 、xml、html 文件在传输时进行压缩, 提高访问速度, 进而优化Nginx性能  
默认开启

<br>

### **server块:**
每一个http块里面可以包括多个server块 每个server块就相当于一个虚拟主机 而每个server块里面 又分为server全局块 和 location 块

server模块用来配置主机 一个主机和多个主机都可以配置在一个 nginx.conf 配置文件里面
一个 nginx 可以同时运行多个主机 一个server就代表一个主机  
一个主机就代表了它有一个独立的站点 有独立的根目录 互相不干扰 我们可以通过端口号的方式区别不同的主机

开启多个主机的方式叫做虚拟主机（别名: vhost）

<br>

**注意:**
上面说的server模块是配置主机 这里其实就是配置 站点 
一个server配置项就代表了一个站点的配置

```sql
http {
  ...

  server {
    listen       80;
    server_name  localhost;

    location / {
      root   html;
      index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
  }
}
```

```js
http {
  server {

    全局块: ...

    server {
      的配置是本虚拟机主机监听配置和本虚拟主机的名称和ip配置
    }

    location { 

      一个server块可以配置多个location块

      主要作用是基于 nginx 服务器接收到的请求字符串(eg: server_name/uri-string) 对虚拟主机名称(可以是ip别名)之外的字符串(eg: /uri-string)进行匹配

      对特定的请求进行处理 地址定向 数据缓存和应答控制等功能 还有许多第三方的模块 也可以在这里配置

    }
  }
}
```

**<font color="#C2185B">listen</font>**  
服务器监听的端口号 是当前一个主机所监听的端口号


listen指令的配置非常灵活, 可以单独制定ip, 单独指定端口或者同时指定ip和端口
```sql
listen 127.0.0.1:8000;  -- 只监听来自127.0.0.1这个IP, 请求8000端口的请求
listen 127.0.0.1; -- 只监听来自127.0.0.1这个IP, 请求80端口的请求（不指定端口, 默认80）
listen 9999; -- 监听来自所有IP, 请求9999端口的请求
listen *:9999; -- 和上面效果一样
listen localhost:8000; -- 和第一种效果一致
```

<br>

**<font color="#C2185B">server_name nginx</font>**  
当前这台主机的名字, 这里可以配置域名或者是主机名 

允许一个虚拟主机有一个或多个名字, 也可以使用通配符"*"来设置虚拟主机的名字  支持 ip 域名 通配符 正则等

配置主机名的时候 也必须是解析的了的主机名（当我们写域名的时候 会将域名解析为ip地址）比如 localhost 就能解析 因为系统文件中写着 localhost对应着 127.0.0.1

```
server_name  localhost;
```

<br>

**<font color="#C2185B">location</font>** 
```
location / {
  root html;
  index index.html index.htm;
}
```

<br>

**``/``**  
代表资源路径 当匹配上这个资源路径的时候（完整或者模糊匹配） 就会进入到 { } 的逻辑中

**root**  
当匹配上资源路径后 去root标记的目录中找对应的资源

**root html**  
html 这是一个相对路径 相对于当前 nginx.conf 配置文件
```
| - usr
  | - local
    | - nginx
      | - html
```

**index index.html index.htm;**  
进入到 html 目录后 如果有这几个后缀的文件就进行展示

**error_page**  
比如值为 500 502 503 504 /50x.html  
发生服务端错误的时候 当发生 500 - 504 的错误码的时候 会定向到 /50x.html 这个地址展示里面的内容

```
location = /50.html {
  root html
}
```

一旦用户访问 /50.html 的时候 会指向html目录 让它在这个目录下找 50x.html 文件

<br>

### **location块:**  
每个server块中可以包含多个location块。在整个Nginx配置文档中起着重要的作用, 而且Nginx服务器在许多功能上的灵活性往往在location指令的配置中体现出来


**location 指令可以分为以下 3 类:**
- 前缀字符串匹配
- 正则表达式匹配
- 用于内部跳转的命名location

- 前缀字符串匹配
- 精确匹配 =
- 前缀匹配 ^~（立刻停止后续的正则搜索）
- 按文件中顺序的正则匹配 ~或~*
- 匹配不带任何修饰的前缀匹配。

```sql
location = /50.html {
  root html
}
```

<br>

**<font color="#C2185B">location root </font>**  
root 指定目录的上级目录, 并且该上级目录要含有locatoin指定名称的同名目录。
```js
// 若按照这种配置的话, 则访问/img/目录下的文件时, nginx会去/var/www/image/img/目录下找文件
// 将 /var/www/image 放到 /img/ 的前面然后拼接路径
location /img/ {
	root /var/www/image;
}
```

<br>

### **配置文件示例:**
```sql
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  server {
    listen       80;
    server_name  localhost;

    location / {
      root   html;
      index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }
}
```

<br>

### **检查配置文件是否ok**
我们在修改完 nginx 配置文件后 在重新启动 或者 reload nginx 的之前 要检查下配置文件是否ok
```
nginx -t

nginx -tc /etc/nginx/nginx.conf
加上 c 参数可以指定路径
```

这里有些问题 看看后面能不能补上 说找不到nginx命令

<br><br>

# 浏览器 nginx 与 Http协议

当我们拿到ip地址后 浏览器怎么向nginx发送请求呢?

当电脑从dns服务器拿到ip地址 会发起tcp/ip请求 http协议在tcp/ip协议之上 

http协议叫做高级的网络协议  
tcp/ip叫做基础的网络协议

tcp/ip协议能够包容一切上层的协议  

nginx实现了http协议 浏览器也实现了http协议 协议就是双方商量好的一件事情 因为tcp/ip协议只能传递一些2进制的数据 这些数据以数据流的形式发送给目标服务器

<br><br>

# 虚拟主机的原理
当我们访问这台主机的时候 通过ip地址访问到 nginx 服务器上 http协议就将数据报文返回了 不管是以网页的形式还是以视频图片的形式  

当我们开启一个站点 其实并没有那么高的访问量 那这台主机的资源不就浪费了么 所以在早期的时候 我们将一台主机虚拟出来更多的主机

本来我们是需要通过域名来访问这台主机的 一个域名对应一个ip地址 那可以不可以将多个域名对应到一个ip地址上

然后由nginx服务端来判断你究竟想访问哪个域名 然后由nginx把你指向不同站点的目录

本质上你是想访问一些资源 我把资源归好类给你放到不同的目录下 

比如:  
用户在访问atguigu的时候 http请求发送到nginx了 访问的域名是atguigu 然后将域名解析成了ip地址 通过ip发送数据报文到nginx nginx读到了请求之后去目录下找响应的资源(atguigu) 找到之后返回回去

上面的案例是很正常的一台主机的逻辑 如果是两个域名同时解析到了一个ip地址

这时候就要在http协议层上增加一些内容了 也就是要在请求的报文上(请求头)加上请求的域名是什么 因为请求目标的ip地址都是一样的(nginx服务器的ip)

但是我们在一台ip(nginx服务器)上绑定了两个域名 我们想区分这两个域名 把资源划分到不同的目录下 那就要在请求的时候除了ip地址还要在请求头中将实际的目标域名携带上

这时候nginx就能知道这个用户请求的是 某一个域名 这样nginx就可以去对应的目录找资源就可以了 这就是域名解析 和 虚拟主机相关的逻辑 具体的配置 下面再说

<br><br>

# 使用 host 文件解析域名
这个部分我们说下 域名解析  
我们先配置本机的域名解析(这相当自己在自己的机器里面玩 外网访问不到的)

我们需要在 host 文件里面进行配置(可以下载一个 everything 找文件很方便)

老师是使用 windows 来示例的 hosts文件在下面的目录里面
```
| - windows
  | - System32
    | - drivers
      | - etc
        - hosts
```

mac系统的hosts文件在
```
  | - /
    | - etc
      - hosts
```

<br>

长下面这个样子
```s
  ##
  # Host Database
  #
  # localhost is used to configure the loopback interface
  # when the system is booting.  Do not change this entry.
  ##


  127.0.0.1	localhost
  255.255.255.255	broadcasthost
  ::1             localhost
```

比如 我们配置一下 虚拟机的域名 我们虚拟机的ip地址为 192.168.25.101
我们就可以在 hosts 文件里面这么配置
```
192.168.25.101 www.sam.com
```

在我们保存的时候 可能会弹出拒绝访问 这就是系统的问题 因为我们在系统的文件目录下 这里需要root的权限或者管理员的权限

<br>

**windows系统下:**
1. 我们可以修改文件的权限
2. 我们将hosts文件复制到桌面上 修改完了 再粘贴回去

<br>

**mac系统下:**
我没尝试过

<br>

当我们配置完 hosts 后我们可以查看下我们配置的域名是否生效  
终端: ping www.sam.com
这是在本机虚拟的情况下 解析ip地址 同理我们也可以通过这个域名访问到 nginx 站点

<br><br>

# 公共域名配置 和 泛域名解析
公共的域名可以在很多网站进行购买 比如阿里云

比如 我们现在在阿里云上购买了一个公共的域名 mmban.com  
现在我们要将这个域名解析到虚拟机的ip地址上(往内网的ip解析也是可以的)

就是将 mmban.com 指向 192.168.25.101 这台主机上

这个部分 可以看下
```
https://www.bilibili.com/video/BV1yS4y1N76R?p=15&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

当我们利用公共的域名 解析到 虚拟主机(nginx服务器)上后 我们就可以通过公网访问nginx服务器了

<br>

### **泛域名解析**
在阿里云的配置选项里面 写上这样的格式

* .mmban.com

所有的二级域名都会解析到 192.168.25.101 这个ip地址上 这就是泛解析

这样不管二级域名是什么 都会指向同一个ip地址

<br><br>

# Nginx虚拟主机域名配置
这个部分我们在虚拟机中配置多个站点

我们虚拟机会有一个ip 虚拟机就相当于一台电脑 nginx 只是电脑中的一个软件
上面我们是通过虚拟机的ip 加上 nginx 监听的80端口 实现了输入ip地址 访问到了 nginx 服务器 呈现了 nginx 服务器的页面

下面我们就来配置多个站点

<br>

### **步骤**
**1. 进入到 根目录:**
```
cd /
```

<br>

**2. 在根目录下创建 www 目录 并进入 在这里创建几个站点**
```
mkdir site_one site_two
```

```
| - /
  | - www
    | - site_one
      - index.html
    | - site_two
      - index.html
```

**3. 修改 nginx.conf 配置文件**  
不用担心我们把配置文件修改坏了 因为还有一个 nginx.conf.default 文件 我们还可以从这个默认的配置文件中 拷贝正确的东西
```
/usr/local/nginx/conf/nginx.conf
```

<br>

**配置多个虚拟主机(相当于配置多个server配置项):**  
虚拟主机的配置是在 http 模块下的 server 配置项里面, 其中 一个 server 配置项就代表着一个主机

**方式1:**  
使用 不同端口号 标记不同的站点
这种方式不需要区分域名只需要配置不同的端口号而已
```js
// http块的里面


// 主机1
server {
    listen       80;

    // 主机名相同 仅端口号不一样
    server_name  localhost;

    location / {

        // 指向index文件所在的目录
        root   html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}

// 主机2
server {
    listen       81;

    // 主机名相同 仅端口号不一样
    server_name  localhost;

    location / {

        // 指向index文件所在的目录
        root   /www/site_one;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}

// 主机3
server {
    listen       82;
    server_name  localhost;

    location / {
        // 指向index文件所在的目录
        root   /www/site_two;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

<br>

**方式2:**  
我们还可以通过 server_name 来指定不同的域名(花钱了的那种域名)

<br><br>

# http模块下 server配置项下 server_name 选项 的匹配规则

### **server_name 的匹配规则**
nginx会查看 server_name 的值 来进行匹配  
如果有多个server配置项的话 会从上往下依次对server配置项进行匹配 如果匹配成功 则不会继续向下匹配
如果没有匹配上 会展示第一个server配置项里面的逻辑

<br>

### **要点**
**1. server_name的值 可以是多个 都指向同一台主机**  


配置两个域名指向同一个主机(站点)
```js
http {
  server {
    server_name vod.mmban.com vod1.mmban.com;
  }
}
```

<br>

**2. server_name的值 可以包含通配符**
只要是2级域名都会指向同一个主机
```js
http {
  server {
    server_name *.mmban.com;
  }
}
```

<br>

**3. server_name的值 可以包含正则 使用 ~ 开始**

```js
http {
  server {
    server_name ~^[0-9]+\.mmban.com$;
  }
}
```

<br><br>

# 基于域名的几种互联网企业需求解析

### **多域名系统**
实际场景中肯定会有很多不同的二级域名来访问我们的nginx服务器

比如
- 微博的主域名: weibo.com
- 我申请了微博的域名: sam.weibo.com

<br>

当客户端拿着 sam.weibo.com 去访问服务器的时候
1. 首先请求会到 nginx 服务器 
2. nginx服务器会通过反向代理 将这次请求交给 tomcat服务器
3. tomcat服务器会将 sam.weibo.com 域名字符串分解 提取出sam 去查询数据库
4. 取出sam的相关信息 tomcat将数据传送给 nginx
5. nginx向客户端返回响应

<br>

### **短网址**
```
短网址: dwz.cn/asdfasdfhuhasdf
```

当我们输入短网址的时候 会跳转到真实的网址 这是怎么实现的？
其实 我们的短网址 是在一个运维的数据库里面 uuid就是短网址作为key value就是真实的域名
```js
DB
  短网址
    ↓
   UUID: 真实网址
```

当用户访问我们的nginx后 nginx会将这次请求打到后端的服务器上 它会拿着uuid的部分去数据库中进行匹配 拿到匹配的真实的网址后 进行redirect

<br>

### **httpdns**
之前我们说过 dns 服务器走的是 udp 协议 httpdns 走的是 http 协议

用户在请求我们的服务器之前 会将域名解析出来 dns服务器走udp协议 它会去全网进行广播

httpdns走的是http协议 既然是走http协议那么就要保证几点

1. 必须要有 ip地址
```
https://www.bilibili.com/video/BV1yS4y1N76R?p=18&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

<br><br>

# 反向代理 > Nginx隧道式模型 网关 代理 反向代理

### **反向代理**
```
用户 -> 互联网 -> 网关路由 -> Nginx <-> 应用服务器
```

用户通过互联网打到机房的网关路由上 它会把请求具体的转发到一台服务器(nginx)上
如果这台 nginx 作为反向代理服务器的话 它会把用户的所有请求相关信息转发到后台的应用服务器(tomcat)
tomcat是不会被用户直接访问到的

上面的图是 nginx和tomcat 形成了一块内网 而tomcat服务器无法接入外网 也就是说 用户想要直接访问tomcat服务器是不行的 它要通过nginx将请求转发给tomcat  
然后tomcat再将相应的结果返回给 nginx 由nginx将响应 响应会前端

<br>

### **要点:**
正向代理 和 反向代理 就是站在的角度不同

```
正向代理 靠近客户端(帮客户端做事)
反向代理 靠近服务端(帮服务端做事)
```

<br>

### **正向代理**
如果把局域网外的jinternet想象成一个巨大的资源库 则局域网中的客户端要访问internet则需要通过代理服务器来访问 这种代理服务器就成为正向代理  
<font color="#C2185B">在浏览器(客户端)中配置代理服务器 通过代理服务器访问网络</font>

用户无法直接访问某台web服务器 但代理服务器可以访问 代理服务器帮助用户请求页面 并将页面返回给用户

<br>

**注意:**
用户只需要浏览器设置代理服务器ip和端口即可 用户知道代理服务器和web服务器的存在

**场景:**  
比如我们国内要访问谷歌 会借助工具

**场景2:**
和租房子很像。  
租房子的时候, 一般情况下, 我们很难联系到房东, 因为有些房东为了图方便, 只把自己的房屋信息和钥匙交给中介了。而房客想要租房子, 只能通过中介才能联系到房东。*而对于房东来说, 他可能根本不知道真正要租他的房子的人是谁, 他只知道是中介在联系他。*

<br>

这里面一共有三个角色
- 租客（用户）
- 中介（代理服务器）
- 房东（国外网站, 目标服务器）
  
引入中介（代理服务器）的原因是用户无法联系上房东（用户无法访问国外网站）。

<br>

### **总结:**
正向代理是代理客户端去和目标服务器进行交互

<br>

### **正向代理的用途**
1. 突破访问限制   
通过代理服务器, 可以突破自身IP访问限制, 访问国外网站, 教育网等

2. 提高访问速度  
通常代理服务器都设置一个较大的硬盘缓冲区, 会将部分请求的响应保存到缓冲区中, 当其他用户再访问相同的信息时,  则直接由缓冲区中取出信息, 传给用户, 以提高访问速度

3. 隐藏客户端真实IP  
上网者也可以通过这种方法隐藏自己的IP, 免受攻击。

<br>

### **反向代理**
是指以代理服务器来接受Internet上的连接请求  
然后将请求转发给*内部网络上的服务器* 并将从服务器上得到的结果返回给Internet上请求连接的客户端

此时代理服务器对外就表现为一个反向代理服务器。

<br>

**场景:**
租房  
用户直接找到房东租房的这种情况就是我们不使用代理直接访问国内的网站的情况。

还有一种情况, 就是我们以为我们接触的是房东, 其实有时候也有可能并非房主本人, 有可能是他的亲戚、朋友, 甚至是二房东。但是*我们并不知道和我们沟通的并不是真正的房东*。*这种帮助真正的房主租房的二房东其实就是反向代理服务器*。这个过程就是反向代理。

用户访问web服务 并不知道访问的是代理服务器 用户以为代理服务器就是web服务器
代理服务器将web服务 返回给用户

<br>

**注意:**
用户浏览器不需要做任何设置 用户访问代理服务器就等于访问web 用户并不知道真实的web服务的村那你在

<br>

### **总结:**
反向代理 就是代理服务器代理了目标服务器 去和客户端进行交互

对于常用的场景, 就是我们在Web开发中用到的负载均衡服务器
- 客户端（租客）
- 负载均衡服务器（二房东）
- 真正的服务器（房东）

客户端（租客）发送请求到负载均衡服务器（二房东）上, 负载均衡服务器（二房东）再把请求转发给一台真正的服务器（房东）来执行, 再把执行结果返回给客户端（租客）。

<br>

### **反向代理的用途**
1. 隐藏服务器真实IP  
使用反向代理, 可以对客户端隐藏服务器的IP地址。即, 租客并不房东知道的真实身份。

2. 负载均衡  
反向代理服务器可以做负载均衡, 根据所有真实服务器的负载情况, 将客户端请求分发到不同的真实服务器上。  
即, 二房东发现房主本人很忙, 于是找到房主的妻子帮忙处理租房事宜。

3. 提高访问速度  
反向代理服务器可以对于静态内容及短时间内有大量访问请求的动态内容提供缓存服务, 提高访问速度。  
即, 二房东同样有房屋信息和钥匙。 

4. 提供安全保障  
反向代理服务器可以作为应用层防火墙, 为网站提供对基于Web的攻击行为（例如DoS/DDoS）的防护, 更容易排查恶意软件等。还可以为后端服务器统一提供加密和SSL加速（如SSL终端代理）, 提供HTTP访问认证等。
即, 二房东可以有效的保护房东的安全。

<br>

### **正向代理和反向代理的区别**
虽然正向代理服务器和反向代理服务器所处的位置都是客户端和真实服务器之间, 所做的事情也都是把客户端的请求转发给服务器, 再把服务器的响应转发给客户端, 但是二者之间还是有一定的差异的。

1. *正向代理其实是客户端的代理*, 帮助客户端访问其无法访问的服务器资源。*反向代理则是服务器的代理*, 帮助服务器做负载均衡, 安全防护等。

2. *正向代理一般是客户端架设的*, 比如在自己的机器上安装一个代理软件。*而反向代理一般是服务器架设的*, 比如在自己的机器集群中部署一个反向代理服务器。

3. *正向代理中, 服务器不知道真正的客户端到底是谁*, 以为访问自己的就是真实的客户端。*而在反向代理中, 客户端不知道真正的服务器是谁*, 以为自己访问的就是真实的服务器。

4. 正向代理和反向代理的作用和目的不同。*正向代理主要是用来解决访问限制问题(为客户端解决问题)*。*而反向代理则是提供负载均衡、安全防护等作用(为服务端解决问题)*。二者均能提高访问速度。

<br><br>

# 网关:
比如我们访问互联网的时候 比如我们用手机访问互联网 那么数据包都会全部的发送给路由器
然后由路由器转发请求给下一个网络的路由或者中继或者是网关服务 这样一跳接一跳的 跳到目标服务器的位置 目标服务器再收到请求后再一跳一跳的返回来

我们接触的最开始的网关就是家里面的路由器

<br>

### **网关和代理服务器的区别**
其实代理服务器就是网关 访问网络的入口就是网关 我们绕不过去 比如学校的大门

<br>

### **网关的特点**
所有的请求都会经过网关  
比如用户访问资源 是请求先到路由器 由路由器转发到 服务器  
服务器响应的结果 也是先到路由器 由路由器转发到 客户端

<br>

### **问题:**
这样就会造成一个问题 当流量比较大的时候 如果网关服务它的上限带宽不够大的话 不够足的话 就有可能在 网关这就被阻塞住了  

比如我们的路由器有10m 带宽有100m 但是没有办法 因为路由器只有10m 我们的下载速度也会卡在这 请求越多就会越卡

nginx也一样 nginx的带宽就是后面服务器集群的带宽 即使集群有1000m但是也得看nginx的带宽

所以在比较高的io操作(io请求)下 nginx做反向代理 就不是那么合适了  
nginx的瓶颈特别的明显就是数据传输的模型 这种数据传输的模式称之为 隧道式
```js
// 这种隧道式代理就是一进一出必须走这么一个口
用户  <-->  代理服务器(网关)  <-->  服务器
```

<br>

### **怎么避免上述的问题？**
用户请求打到代理服务器上 代理服务器把请求转发给后端服务器

而后台服务器直接把数据给用户  
进去的时候 请求要过下代理服务器 但是响应的时候就不再走代理服务器

这个功能是 lvs 提供的功能   
它的性能比 nginx 还要高 但是 lvs的功能要比nginx简单的多

lvs是专业的负载均衡器 在反向代理的时候既可以做隧道式的方向代理 还可以用 DM模型(请求经过代理服务器 响应不经过代理服务器 直接给用户)
这时候应用服务器就不是在内网环境中了
lvs嵌套在nginx内核里面了 不需要额外装软件就可以用lvs

<br><br>

# QPS
老师做的项目中使用了 nginx 做了反向代理 成果就是后面3台tomcat服务器 能抗住 300的并发量(QPS)  
QPS关于并发量网上的文章动不动就上万上亿 正常的企业项目 并发量有300 已经很不错了

并发量: 每秒有300个人同时去点击

<br>

### **隧道式架构适合小型项目 传统的互联网项目**

<br><br>

# 负载均衡
如果有一个女朋友 一周使用是没有问题的 但是一个月的话可定有几天不能用的情况  
这时候我们可以找一群女朋友备份 当一个女朋友没有办法完成请求的时候 可以去找另一个女朋友

```js
// □: 服务器

            □ A
  nginx     □ B
            □ C
```

当nginx做转发的时候 如果A服务器不可用了 那就可以让A服务器下线 将请求转发到另一台服务器上  
ABC三台服务器上的内容应该是一模一样的 像这样需要被负载均衡的服务器 我们称之为服务器的集群

<br>

### **集群:**
全都是一模一样的服务器 因为是复制出来的 称之为集群 我们在访问的时候访问任意一台 它能够提供的服务器都是一样的

<br>

### **负载均衡的特点:**
1. 故障转移 一旦一台服务器不可用的时候 可以将请求转到另一台服务器
2. 可以将 ABC 同时对外提供服务 不至于把一个给累死

<br><br>

# 配置反向代理服务器

### 前置工作:
我们的 vmware 是一个虚拟机软件 里面可以装多台虚拟机 每台虚拟机都对应一个ip

每台虚拟机可以安装nginx软件 那么这台虚拟机就相当于一台服务器  
我们可以通过 ip 地址 访问到这台服务器

现在 老师在 vm 中配置了 3台虚拟机 同时安装 3份 nginx 的话 就相当于有了3台服务器 我们可以通过 不同的3台的ip地址 访问到这3台服务器上  
我们可以直接克隆我们现有的主机然后 改ip地址就可以

<br>

### **要点: proxy_pass**
改属性要写在 下面的位置上 与 root 属性是2选1

root属性用于帮助我们找静态文件 但一旦我们配置了 proxy_pass 的话 就不会再看root了

```s
http {
  server {


    location / {

      proxy_pass 网址;

      # 可以将下面的内容注释掉
      # root html
      # index index.html index.htm;
    }
  }
}

```

<br>

### **proxy_pass的值分为两种**
**1. 代理的地址**  
比如一台具体的主机 或 一个具体的网址 

```sql
http {
  server {

    location / {
      proxy_pass http://www.aiguigu.com;
    }
  }
}

```

一旦我们配置完 proxy_pass 之后 在访问当前的站点的时候 现在只有一个location 当我们访问当前站点的根目录/的时候 就会被代理到 http://www.aiguigu.com 地址上  
proxy_pass 相当于我们配置了 目标服务器地址 当我们访问 / 的时候 会被代理到目标服务器地址上

同样 如果我们写 location /api/ 请求里面带 api 也会被拦截到

<br>

**换成域名也一样:**  
就是当我们访问 虚拟机的ip的时候 192.168.25.101 的时候 打开的页面却是尚硅谷的官方网站 但是**地址栏没变还是 192.168.25.101**  
而且即使是我们访问了尚硅谷的子页连接 url还是 192.168.25.101/kecheng.html 仅仅是uri发生了变化

这就是反向代理的一个过程 **<font color="#C2185B">没有显示真正的服务器地址</font>**  
用户的请求打到nginx主机 nginx主机会将请求转发到目标的主机 目标主机将资源返回给nginx nginx再给客户端

<br>

**注意:**
**1.**   
```s
proxy_pass http://www.aiguigu.com;

# 如果我们没有写 www 的时候
proxy_pass http://aiguigu.com;
```

我们会发现 url 变成 真正的 atguigu 的网址了 而不是我们nginx的url  
同时我们观察network也会发现 nginx服务器返回了302 然后告诉客户端重新向 www.atguigu.com 再次发起请求

<br>

**2.**  
如果 proxy_pass 的值是 https 的话 是没有作用的
```
proxy_pass https://www.aiguigu.com;
```

因为https要和域名对应上 因为有证书和域名之间的关系

<br>

### **通过不同的uri代理到不同应用的服务器上**
配置个监听 9001 端口的主机
```sql
http {
  server {
    listen 9001;
    server_name 192.168.17.129;

    location ~ /edu {
      proxy_pass http://localhost:8001;
    }

    location ~ /vod {
      proxy_pass http://localhost:8002;
    }
  }
}

```

<br><br>

# 前端利用反向代理 解决跨域
我们的前端页面放在nginx服务器的根目录下 然后我们使用express搭了一个服务器

前端页面会使用ajax向express发送请求 这时候会产生跨域

```js
// 前端代码
xhr.open("get", "http://localhost:3000/portal/list")
```

这时候我们可以使用 nginx 来进行中转 我们在 nginx的配置文件中 配置 location

```sql
location /api/ {
  proxy_pass http://localhost:9000/
}
```

然后前端页面发起请求的网址 要修改
```js
// 前端代码
xhr.open("get", "/api/portal/list")
```

这样 nginx 会拦截到 /api/ 然后往http://localhost:9000/发送请求 这时就是代理 是 nginx服务器向目标服务器发起请求

<br><br>

# 负载均衡的配置: upstream
负载均衡的配置要使用 upstream 配置项 和 proxy_pass 配合使用

我们会拿一台nginx作为服务器 在这个服务器里面配置 负载均衡
让这台nginx服务器将用户发送过来的请求 转发到 upstream配置的服务器们

这个部分的配置属于雨露均沾哦

<br>

### **需求:**
当我们访问 192.168.25.101 的时候 被负载均衡 由nginx服务器依次将请求转发给 目标服务器们  
一人一下 雨露均沾 依次显示

    192.168.25.102 的内容  
    192.168.25.103 的内容

我们修改下 作为负载均衡器的nginx服务器的配置文件

<br>

### **要点:**
**1. proxy_pass 配置项的值 设置为 http://别名**

```sql
http {
  server {

    location / {
      -- 这里就不能写一台目标服务器了 因为我们要雨露均沾的话 肯定是多台服务器
      -- proxy_pass http://www.aiguigu.com;

      proxy_pass http://customs;
    }
  }
}

```

**2. http模块下 配置 upstream 配置项(和server配置项同级)**  
该配置项用于定义**别名代表的一组服务器**
```sql
http {
  upstream 别名 {
    -- 这里有server属性
    server 写http://后面的部分(ip1:端口)
    server 写http://后面的部分(ip2:端口)
    server 写http://后面的部分(ip3:端口)
  }
}
```

**示例:**
```sql
http {

  upstream customs {
    server 192.168.25.102:80;
    server 192.168.25.103:80;
  }

  server {

    location / {
      proxy_pass http://customs;
    }
  }
}

```

<br><br>

# 负载均衡的策略 -- 权重

### **策略: 权重 weight**
上面我们配置负载均衡的时候 是轮询一人一下   
现在我们后面有3台服务器 每台服务器的性能可能不一样 比如有的服务器配置比较高 网络出口也比较高 有的服务器的配置低 这时候我们就可以通过 权重 控制比例 转发请求

比如 
```js
// A服务器的性能就很好
A: 1000m
B: 100m
```

我们就可以设置, 这里设置的就是一个被分配的概率 并不是A8次 B2次
```js
A 的 weight=8   // 这样A服务器的权重就会很高 被分配的机会就比较大
B 的 weight=2  
```

<br>



### **权重配置的位置:**
weight的配置在 upstream 配置项里面 server 属性的的值的后面

```sql
http {

  upstream customs {
    server 192.168.25.102:80 weight=8;
    server 192.168.25.103:80 weight=2;
    server 192.168.25.104:80 weight=1;
  }

  server {

    location / {
      proxy_pass http://customs;
    }
  }
}

```

### **配置属性: down**
**位置:**   
跟在 weight 的后面

**作用:**   
该服务器不参与负载均衡 让该服务器休息下线

```sql
http {

  upstream customs {
    -- 让102 下线休息
    server 192.168.25.102:80 weight=8 down;
    server 192.168.25.103:80 weight=2;
    server 192.168.25.104:80 weight=1;
  }

  server {

    location / {
      proxy_pass http://customs;
    }
  }
}

```

<br>

### **配置属性: backup**
**位置:** 
跟在 weight 的后面

**作用:** 
**备用服务器** 其它的服务器没的用了 再使用这个备用服务器 正常情况下不用它

```sql
http {

  upstream customs {
    -- 让102 下线休息
    server 192.168.25.102:80 weight=8 down;
    server 192.168.25.103:80 weight=2;

    -- 104作为备用机
    -- 比如现在102down了 如果我们再把103也down了或者关掉 那么就会使用 104
    server 192.168.25.104:80 weight=1 backup;
  }

  server {

    location / {
      proxy_pass http://customs;
    }
  }
}

```

<br>

### **总结:**
backup down等注释不太常用 因为我们加一下就需要reload一次 很多情况下是来不及的
想要动态的去分配上线和下线 靠nginx的基础命令是不行的
backup倒是可以留一台备用机 

<br><br>

# Nginx的日志分析器
```
https://xiaoman.blog.csdn.net/article/details/124546293
```

<br><br>

# 负载均衡的策略 -- ip_hash least_conn url_hash
这个部分的策略并不常用  
上面我们接触的 轮询 策略 有个问题 就是没有办法保持会话  
默认的情况下使用轮询方式 逐一转发 但这种方式适用于无状态的请求

比如:  
后端的业务服务器可能是 ABC三台tomcat 用户在登录页面的时候 成功后A会返回token session会保存在A里面 但是因为是轮询的 当用户再次登录可能被转发到B上 B上没有用户的session 用户就还需要再次的登录 不仅仅是登录 只要是验证 保持状态的事情 或者是一些流程化的操作 比如用户点击了一下按钮 提示之前的操作没有保存 这都是需要保持会话状态 但是轮询的策略就不行了 因为没有办法保持会话

所以另外的一些负载均衡策略就是为了让我们保持会话的

<br>

### **ip_hash**
当用户发送请求到 nginx负载均衡服务器的时候 它会对该用户的请求定向的转发到同一台服务器 它会判断来源的ip地址 相同的ip指向相同的服务器 只要用户的ip保持不变 都会指向同一台服务器

但是不常用 因为这种固定的配置和当前的互联网环境 已经无法适应了  
比如手机 手机信号时好时坏 我们走着走着可能会被切换一个基站 那么ip地址就变了 所以ip_hash也没有办法保持会话

<br>

### **least_conn**
最少连接数的访问 这是为了保证后端的服务器达到负载更加的均衡 当有一台服务器连接的次数过多
比如A已经接了200个 B接了20个 那么额外的请求就会给B

上面的策略感觉上比较合理 实际上在应用的过程中也是不合理的 因为B分配的较少可能是因为我们设置了权重 所以分配的少 可能B的配置比较低 所以我们才让B分配的比较少 才会造成流量倾斜的问题 不然的话正常的情况下是不可能的

另外这种固定的配置也没有办法支持服务器的动态上下线

<br>

### **fair**
需要第三方的插件

**作用:**  
根据后端服务器响应的时间转发请求

但是也不太合理 比如 nginx 到A需要100ms 到B需要5ms 如果我们把请求都转发给5ms的机器 那就会造成流量倾斜 
100ms的原因可能是交换机过热引起的 这时候如果是fair就会瞬间想请求交给其他的服务器 有可能会将其他的服务器压垮 所以我们也不太会按照服务器的响应的时间进行请求的转发 因为会有流量倾斜的风险

<br>

### **url_hash**
需要第三方的插件

**作用:**  
它也是为了保持会话也使用的 它可以完成定向的流量转发 注意这里是流量转发

前面说的ip_hash 它是以用户的ip地址为基准 相同的ip分到一台服务器上 
url_hash则是 比如我们访问的 ``http://www.atguigu.com/regsiter`` 它会根据这个url取一个hash直 **相同的hash值转发到相同的服务器上** 这是定向流量转发 不是定向用户转发

这样会造成 比如注册用户的时候转发到了A 但是如果uri部分换了 /login 了 就又会根据url取一个hash 这样就转发到了其他的服务器上 这样session会话就没办法保持

url_hash比较适合我们访问固定资源的时候 而不是向上面这几种情况   
固定资源部在同一服务器 比如我们有100个文件 散落在ABC上 这时候我们url_hash就比较有用 我们可以根据url去找指定的文件

<br>

### **总结**
这个部分提到的策略 几乎在生产环境中都不会使用 最核心的问题就是没有办法动态的上下线一组服务器  
当真想用这些策略的时候 后面会使用 lua 脚本的方式 在nginx里面编程 动态的管理服务器的列表 也可以检测后端服务器上下线的情况 定向的流量转发 weight 以及ip的来源

<br>

**流量倾斜的问题:**  
比如我们有ABCD服务器 BCD都闲着 A忙着 流量一旦倾斜就意味着A会被击垮 BCD却闲着
所以在企业中要么只用轮询的方式 唯一不好的地方就是会话没有办法保持 要么我们就是用lua脚本自定义的转发规则 用第三方的插件非常的少 因为改起来特别的不灵活

<br>

**那轮询的话 会话没有办法保持怎么办？**  
这时候可以用基于客户端的会话保持工具 因为后端的服务只要涉及到轮询就没有办法保持状态 状态就是指在独立的服务器上存储用户的固定信息 比如 session就是状态信息 因为一个session对应一个cookie  
那要是用到了轮询那就不用使用状态 

**比如:**
我们可以将session存在redis里面 当用户提交cookie的时候 这样服务器会去redis服务器上去找session 这样就达到了session共享

但是 redis 的这个方案不适合高并发的场景 高并发的场景会使用下发token  
当用户请求资源 走nginx服务器 nginx会找一台专门做权限校验的服务器 当用户的请求到权限校验的服务器上后 校验用户权限成功后 会下发权限   
当用户再次访问的时候 服务器只做校验 当校验成功代表登录 服务器也没存什么东西

<br><br>

# 动静分离
动静分离是比较常用的功能一般适用于中小型的网站  
因为中小型的并发量不是很高 需要分离出的静态资源不是很多 可以将这些静态资源挪动到前置的nginx服务器里 

但是, 如果是大型并发量高的企业如淘宝 用户上传的文件就很多 这就不适合了

动静分离能起到系统加速的作用  
用户在请求资源的时候大多数都是希望展示某些东西 比如显示图片 静态网页 css js文件等 我们就可以将这些静态资源放在nginx服务器里 不让它继续往后端的服务器里面去请求

<br>

### **简单的架构图为:**
```
  用户 -> nginx -> tomcat
                    ↓
                  webapp
                    ↓
                   jar → static 静态资源
                                原来在这
```

上面这样不好的点在于 tomcat会响应非动态的请求 比如用户的请求先会经过nginx打到tomcat上 如请求首页网站的首页会内嵌很多的图片 css js等 当我们请求一个页面的时候 会随之再次自发请求这些静态的资源 又会经过nginx再到tomcat上

那我们是不是可以将 这些静态资源前置到 nginx 里呢

```
  用户 -> nginx -> tomcat
           ↓
         static
```

反正用户都要访问 nginx 本来是需要nginx进行代理去tomcat里面取 现在直接从nginx里面取  
这就是动静分离 动态的请求还是会跟开始一样 打到tomcat上 但是静态的资源都放在了 nginx 服务器里面

<br>

### **配置动静分离**
**背景:**   
如在 一台主机上跑了一台tomcat服务器 该服务器上部署了前端页面的项目  
我们访问 192.168.25.103:8080 的时候 就可以访问到前端的页面

现在我们需要将 tomcat 中前端页面内的静态资源
- css
- js
- img

前置到nginx 服务器上

<br>

### **1. 配置 nginx 反向代理**
**1. 让其通过nginx将用户请求转发到tomcat**
```sql
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  server {
    listen       80;
    server_name  localhost;

    location / {
      
      -- 配置反向代理 到 103tomcat主机上
      proxy_pass http://192.168.25.103:8080
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }
}
```
这样我们通过访问 nginx 就可以访问到 tomcat  
验证的话 可以看看url是不是nginx的url 但却能看到tomcat里的项目页面

<br>

### **2. 简单的动静分离配置**
资源和目录不是很多的时候可以这么配置

1. 将 tomcat 项目中的静态资源删掉

2. 将静态资源放在 nginx 目录里面的 html 目录中
```
  | - nginx
    | - html
      | - css
      | - js
      | - img
```

3. 在 nginx.conf 中配置多个 location
```sql
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  server {
    listen       80;
    server_name  localhost;

    location / {
      proxy_pass http://192.168.25.103:8080
    }

    -- 当访问css的时候会去html根目录下找 相当于路径变成 ip/css/
    location /css {
      root html;
      index index.html index.htm
    }
    location /js {
      root html;
      index index.html index.htm
    }
    location /img {
      root html;
      index index.html index.htm
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }
}
```

<br>

### **2. 正则 动静分离配置**
上面我们设置 location 的时候 是按照 静态资源目录写的 比如

有css 就有对应的 location /css  
有img 就有对应的 location /img  
有js 就有对应的 location /js  

当目录比较多的时候 那么对应的 location 配置项就会变多  
那能不能将 3个location合并成一个呢 可以 我们可以利用正则表达式

<br>

*正则以 ~ 开头 代表后面的是正则表达式*

```s
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  server {
    listen       80;
    server_name  localhost;

    location / {
      proxy_pass http://192.168.25.103:8080
    }

    # ~ 开启正则形式
    location ~*/(js|img|css) {
      root html;
      index index.html index.htm
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }
}
```

动静分离后可以大大的提高系统的并发量 动静分离的配置比较简单 只是需要手动的将静态资源传到nginx服务器上  
类似这种静态和缓存的东西 越往前放越好 会减少网络开销

<br><br>

还有一些扩展知识 没事听听
```
https://www.bilibili.com/video/BV1yS4y1N76R?p=29&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

<br><br>

# 伪静态配置 URLRewrite
这个功能也是比较实用的功能 可以隐藏后端的服务器的物理地址

**比如:** 
tomcat服务器上部署了一个前端项目 带分页效果 比如
```
192.168.25.103:8080/index.jsp?pageNum=1
```

这样就会访问第一页的内容  
接下来我们先配置 nginx 反向代理的话 那我们输入 nginx的ip就可以访问到 tomcat 上的页面你内容 如

192.168.25.101:80/index.jsp?pageNum=1  
我们能看到 uri 上还带有 /index.jsp 比较长不说 还暴露了我们的入参

而我们使用 URLRewrite 可以隐藏掉 并且变成了 伪静态

<br>

**期望变成:** 
```
192.168.25.101/2.html
```

<br>

### **期望**
```s
# 想要转换的地址
192.168.25.101:80/index.jsp?pageNum=1
  ↓
# 换成下面的地址
192.168.25.101/2.html
```

我们使用 192.168.25.101/2.html 也能访问到目标页面

<br>

### **配置: nginx.conf**
写到 http 模块 - server 配置项 - location属性 里 跟 proxy_pass 同级
```
http {
  server {
    location xx {
      rewrite
      proxy_pass
    }
  }
}

```

<br>

### **rewrite的书写规则**
```sql
rewrite 匹配url的正则 真正的跳转地址 [转发形式]
```

**正则部分:**  
是我们访问的 敲在地址栏上的地址, 比如我们要输入 http://2.html 那我们就写对应这个url的正则 ``^/([0-9]+).html$``

<br>

**想要转换的地址部分:**  
是实际的地址

<br>

**转发形式:**  
**last:**   
本条规则匹配完成后, *继续向下匹配*新的location URI规则

**break**  
本条规则匹配完成即终止, *不再匹配后面的*任何规则

**redirect**  
返回302临时重定向, 浏览器地址会显示跳转后的URL地址  
会改变地址栏上地址 会显示真实的地址  
因为重定向了 重新请求了真实的地址

**permanent**   
返回301永久重定向, 浏览器地址栏会显示跳转后的URL地址

```
临时重定向 301
永久重定向 302

效果上都是跳转到了新的页面 它们的区别就是给爬虫看的
临时代表未来可能原网页还可以继续访问
永久代表以后就是302指向的页面了
```

### **示例:**

### **示例:**
```sql
location / {

  -- 当用户访问 /2.html 的时候 相当于访问 /index.jsp?pageNum=2
  rewrite ^/2.html$ /index.jsp?pageNum=2 break;

  -- 正则形式 ([0-9]+) 和 $1 对应
  rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;

  proxy_pass http://192.168.25.103:8080;
}
```

<br>

### **示例2:**
```sql
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  server {
    listen       80;
    server_name  localhost;

    location / {
      -- 配置url-rewrite
      -- rewrite 正则 想要转换的地址
      -- 想要转换的地址为 /index.jsp?pageNum=
      rewrite ^/2.html$ /index.jsp?pageNum=2 break;

      rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;

      -- 真正的请求还是要代理到后端你的服务器上 所以 proxy_pass 不动
      proxy_pass http://192.168.25.103:8080;
    }


    location ~*/(js|img|css) {
      root html;
      index index.html index.htm
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }
}
```

<br><br>

# 网关 + 伪静态 + 负载均衡
这个部分会说下网关的概念 以及在网关上如何配置 urlrewrite

**示例:** 
```
用户 -> 网关 -> 互联网 -> nginx ->  tomcat
```

上个部分中 我们 nginx 负责了反向代理 和 urlrewrite 并且将静态资源也换到了 nginx 下的根目录里面 但这个时候 nginx 负责的任务就有些多了  
我们想要直接访问tomcat 是访问不到图片的 也就是说想要正常访问站点必须要通过nginx代理一下 因为静态资源在nginx上

那么 nginx 这台服务器就称之为 后端服务器的网关  
那么 在真实的场景中 目标服务器是不应该被外网直接访问到的

也就是说 tomcat 应该是内网环境 外网是无法访问的  
内网是可以访问的 也就是 nginx 和 tomcat 是互通的

下面我们通过防火墙的方式 模拟下真实的环境  
服务器在运行时为了安全, 必须开启防火墙, 但是在将防火墙全部开启之后, 外部就不能访问应用了

<br>

*首先* 我们将目标服务器的主机的防火墙启动起来
```
systemctl start firewalld
```

<br>

启动起来后 直接访问目标服务器和通过nginx访问目标服务器都访问不到了  
并且 nginx 这边会报错 an error occurred 因为开启了防火墙 所以切断了一些tcp等连接 

*然后* 我们开放目标服务器主机的一个端口 供外部访问 8080 但是我们不希望外网访问到 只需要让nginx访问到 那防火墙的规则怎么配置呢？

<br>

**配置的规则如下:** 
```js
// 我们将下面的规则放在防火墙中
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.44.101" port protocol="tcp" port="8080" accept"
```

**source address="192.168.44.101":**  
添加了一个可信任的ip地址 192.168.25.101(反向代理服务器)

**protocol="tcp" port="8080" accept":**  
tcp协议上的8080端口可以接收访问

添加规则后 需要重新启动防火墙配置完后 我们的目标服务器只能被nginx反向代理 把资源转交给互联网用户  
这里的nginx服务器 这时候就是 就可以叫做网关服务器 充当一个大门 这个网关服务器可以有各种功能 比如负载均衡 rewrite等

**最后** 我们配置一下 nginx url-rewrite
我们配置多台主机做负载均衡

```sql
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  -- 配置多态主机做负载均衡用
  upstream customs {
    server 192.168.25.102:80 weight=8; 
    server 192.168.25.103:8080 weight=2;
    server 192.168.25.104 weight=1 backup;
  }

  server {
    listen       80;
    server_name  localhost;

    location / {
      rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;

      -- 做负载均衡
      proxy_pass http://customs;
    }


    location ~*/(js|img|css) {
      root html;
      index index.html index.htm
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }
}
```

上面的网关服务器有如下的功能:
1. 保存了目标服务器的静态资源
2. 负载均衡
3. 将动态资源地址隐藏起来了 伪静态的url
4. 反向代理的作用

<br>

### **扩展:  防火墙的相关命令**
**开启防火墙:**
```
systemctl start firewalld
```

<br>

**重启防火墙:**
```
systemctl restart firewalld
```

<br>

**重载规则:**
```
firewall-cmd --reload
```

<br>

**查看已配置规则:**
```
firewall-cmd --list-all
```

<br>

**指定端口和ip访问:**
```
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.44.101" port protocol="tcp" port="8080" accept"
```

<br>

**移除规则:**
```
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="192.168.44.101" port port="8080" protocol="tcp" accept"
```

<br><br>

# Nginx 防盗链 和 http referer

### **防盗链:**
本来我们存在服务器中的资源 只能由我们自己的服务器访问 其它引用的不能放访问

<br>

**原理:**
用户将请求打到nginx上 nginx会去寻找用户要访问的资源 比如 请求的是一个首页 nginx查找到后做响应 但是html文件的骨架里面还有静态资源css js img等 所以用户浏览器会自发的2次请求或多次请求静态资源 

当浏览器再次请求的时候 会在请求的header里面会有Referer请求头
```
Referer: http://192.168.25.101
```

这个请求头是http协议规定的 浏览器遵守的   
该请求头在我们第二次访问的时候才有 第一次访问的时候是没有的

第一次请求的是 首页页面 查看该请求信息的时候是看不到referer的  
但是在自发的静态资源请求中 就能看到 referer 请求头

服务器在收到第二次请求的时候会问 你是哪来的 浏览器就是通过 referer请求头告诉服务器 我从河北来的(http://192.168.25.101)

当带上referer的时候 就能判断是不是当前的这台主机了 如果是当前的这台主机肯定是允许它访问我们的资源的  
因为是自己的主页要加载自己的静态资源 这肯定是我们所希望的

<br>

### **盗链是什么意思？**
当前的站点是 192.168.25.101 那我自己要自己的静态资源肯定是要给的

如果别的站点(102) 要引用101站点的静态资源 比如我们请求的102站点的首页 首页中有图片该图片是101站点的静态资源 那么自发请求图片这个操作肯定会携带referer请求头 我们就可以通过referer来判断该次请求是101自己 还是别的站点 如果不是的话 就判定该次请求为非法请求

<br>

### **防盗链的基本配置 和 none**
也不是所有的网站都期望资源被防盗 有些网站还是很希望资源被引用 可以增加曝光量  
一般都是资源比较稀缺 希望大家能够在站点上看 引流的时候 才会配置防盗链

**背景:**   
192.168.25.101 现在是网关服务器 静态资源都在网关服务器上 

192.168.25.102 配置这台机器去引用101站点上的资源 做例子

我们可以配置 192.168.25.102这台主机的 nginx.conf 当我们访问 192.168.25.102 的时候 直接 proxy_pass 到 101这台主机上
```sql
server {
  listen 80;
  server_name localhost;

  location / {
    proxy_pass http://192.168.25.101;
  }
}
```

上面的配置结束后 我们访问102的时候就能访问到101上的页面了  
接下来重点来了 我们配置在101上的 nginx.conf 文件 正式开启防盗

<br>

### **配置防盗链**

**位置:**  
server块下的 location 属性  
因为 location 可以配置多个 所以我们在指定的location下配置的话 就是指定的location 不让其访问

```sql
http {
  server {
    location /img {
      valid_referers 192.168.44.101;
    }
  }
}
```

<br>

### **valid_referers配置项的可选值:**
该项是监测 请求头中的 referers 请求头

比如
```js
// 这么配置是允许 192.168.44.101 除了给定的以外都是不允许的
valid_referers [标识符] 192.168.44.101
```

<br>

**1. valid_referers 192.168.44.101**  
就是检查 来源是不是 给定的网址(不是ip 是监测来源中是否包含我们给定的部分)
```js
// 检查后的操作 可以如下
if ($invalid_referer) { 
  return 403; 
}
```

如果是无效的引用 我让它成为403(请求资源存在 但是访问被服务器拒绝)  
**<font color="#C2185B">if () 之间是有空格的</font>**

<br>

**可选 标识符 值:**  
注意 标识符 是加在 地址前面的 标识符和地址使用空格分割

```sql
valid_referers none | blocked | server_names | strings ....;
valid_referers none 192.168.25.101;
```

**none:**  
如果配置为 none
则没有Referer请求头的时候 是允许访问的

上面我们知道 referer 只有第二次自发请求的时候 会写法该请求头 所以我们设置防盗的时候 会监测 referer请求头  
但是如我我们希望 当我们复制图片的url后 直接在url里面打开 这就是 首次请求  
如果这种行为我们期望被允许的时候 我们可以添加这个标识符  


**blocked:**  
检测 Referer 头域的值被防火墙或者代理服务器删除或伪装的情况。这种情况该头域的值不以 “http://” 或 “https://” 开头 如果不以http://” 或 “https://” 开头是允许访问的话 我们可以添加该标识符



**server_names:**  
就是上面我们写在最后的 192.168.44.101
这个部分我们写的是域名 也就是在生产环境中的时候 我们要写 域名 

检测 Referer 头域的值是否是这些 URL 中的某一个。如果是其中的一个 就代表允许  
配置ip地址的话可能会不好用

<br>

**代码示例:**
```sql
server {
  location /img {

    valid_referers 192.168.44.101;
    if ($invalid_referer) { 
      return 403; 
    }

    root html;
    index index.html index.htm
  }
}
```

<br>

### **return 返回值的问题:**
上面我们是return了 错误码 我们还可以return 路径 return 资源等操作
```js
// 这也是可以的 让其去401的错误页面
return /401.html
```

<br>

**完整示例:**
```sql
worker_processes  1;

events {
    worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  -- 配置多态主机做负载均衡用
  upstream customs {
    server 192.168.25.102:80 weight=8; 
    server 192.168.25.103:8080 weight=2;
    server 192.168.25.104 weight=1 backup;
  }

  server {
    listen       80;
    server_name  localhost;

    location / {
      rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;
      proxy_pass http://customs;
    }


    -- 我不希望这台主机上的图 被其它网站访问
    location ~*/(js|img|css) {
      
      -- 只允许 192.168.25.101 的访问
      valid_referers 192.168.25.101;

      -- 如果 referer 不是 192.168.25.101 的话就不让其读取资源
      if ($invalid_referer) {
        return 403; 
      }

      root html;
      index index.html index.htm
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root html;
    }
  }
}
``` 

<br><br>

# curl工具
这个工具是 Linux 下面的命令 默认情况下 系统没装 需要我们自己安装

当我们用来做测试的时候更纯粹更简单一些 因为浏览器为了让我们加速访问会在多个地方设置缓存 有可能刷不到最新的页面 使用 curl 的话 就能很有效的解决这个问题

### **安装:**
```
yum install -y curl
```

<br>

### **curl 命令**
会显示完整的页面
```
curl http://192.168.44.101/
```

<br>

### **-I**
不会将内容返回 而是返回头信息s
```
curl -I http://192.168.44.101/img/logo.png
```

<br>

### **-e**
可以设置指定的referer
```
curl -e "http://baidu.com" -I http://192.168.44.101/img/logo.png
```

<br>

### **-v**
```
curl -v http://baidu.com
```
发起请求 响应回的是完整的http响应   
有请求行 请求头 请求体 响应行 响应头 空行 响应体

<br><br>

# 企业实战中 该如何进行配置
盗链资源返回页面或提示图片   
实际中当其它的页面盗链我们的资源的时候 我们不会直接返回一个错误码 而是会稍微友好一些 会展示一些信息 或者 错误的页面

我们可以先创建错误页面
```
  | - html
    - index.html
    - 50x.html
    - 401.html
```

我们需要配置一下 401.html 页面  
然后配置 nginx.conf 文件

```sql
worker_processes  1;

events {
    worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  -- 配置多态主机做负载均衡用
  upstream customs {
    server 192.168.25.102:80 weight=8; 
    server 192.168.25.103:8080 weight=2;
    server 192.168.25.104 weight=1 backup;
  }

  server {
    listen       80;
    server_name  localhost;

    location / {
      rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;
      proxy_pass http://customs;
    }


    location ~*/(js|img|css) {
      
      valid_referers 192.168.25.101;

      -- 如果我们这里返回 401 的话 那么 error page后面就可以跟上 401
      if ($invalid_referer) {
        return 401; 
      }

      root html;
      index index.html index.htm
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root html;
    }


    -- 再多配置一份 error page location
    -- 这个是错误页面对应的 地址是什么
    error_page 401 /401.html; -- 上面return 401了好像也可以不用写这个配置

    -- 这里也要匹配url的部分 当url上是401的资源的时候去哪里找
    location = /401.html {
      root html;
    }
  }
}
``` 

上面是 提供了一个错误的页面 我们还可以提供一个错误提示的图片  
比如A网站盗链了我们一张图片 正常这张图片应该正常展示 但现在我们让它展示 不要盗链.png

```sql
worker_processes  1;

events {
    worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  -- 配置多态主机做负载均衡用
  upstream customs {
    server 192.168.25.102:80 weight=8; 
    server 192.168.25.103:8080 weight=2;
    server 192.168.25.104 weight=1 backup;
  }

  server {
    listen       80;
    server_name  localhost;

    location / {
      rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;
      proxy_pass http://customs;
    }


    location ~*/(js|img|css) {
      
      valid_referers 192.168.25.101;

      if ($invalid_referer) {
        -- 我们这里要做 错误提示图片的逻辑 所以这里不要return了
        -- return 401; 

        -- 当盗链的时候 会重写url为错误图片的地址
        rewrite ^/ /img/错误图片.png break;
      }

      root html;
      index index.html index.htm
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root html;
    }


    -- 盗链后返回错误提示页面
    error_page 401 /401.html; 
    location = /401.html {
      root html;
    }
  }
}
``` 

<br><br>

# Nginx 高可用
前面我们做了 通过 nginx 将用户的请求转发到不同应用服务器上
```
                    tomcat
  用户 -> nginx -> 
                    tomcat
```

像上面的配置有没有问题 有吧 nginx 可能会挂吧  
所以当 nginx 宕机的话 请求是不是就失效了 所以针对上面的情况 我们就要将 nginx 配置成高可用的效果

也就是说 nginx 如果宕机了 但是也能保证用户的请求 这就是*高可用*

<br>

### **高可用的思路**
```
          nginx1      tomcat1
  用户 ->          -> 
          nginx2      tomcat2
```

nginx1的ip为 192.168.25.101  
nginx2的ip为 192.168.25.102

我们让其中的一台 nginx1 做为 主服务器(master)
我们让其中的一台 nginx2 做为 从服务器(backup)

当用户来的请求肯定是先访问 主服务器 主服务器根据用户的请求将其分发到不同的tomcat服务器中去  
当主服务器发生宕机的时候 就会自动切换到 从服务器 上 这时候从服务器也可以将用户的请求转发到tomcat服务器中去

但是主从服务器的配置需要一个软件 这个软件就是 keepalived

```
主服务器中有 keepalived
从服务器中有 keepalived
```

keepalived就是一个路由里面有脚本可以监测nginx是否还活着 如果活着可以进行访问 如果宕机了就切换到备份服务器上

我们上面的主从服务器的ip地址为
```
nginx1的ip为 192.168.25.101
nginx2的ip为 192.168.25.102
```

为了保证用户请求的地址不变(不能让用户一会请求101 一会请求102吧) 所以它们还需要对外*提供一个虚拟ip*  
虚拟ip实际不存在 但是用户是通过这个虚拟ip进行访问 然后我们把虚拟ip绑定到两台nginx主从服务器上

<br>

**keepalived起到的就是路由的作用**
主服务器会先绑定 虚拟ip 当主服务器挂掉之后 会将虚拟ip绑定到backup服务器身上

<br>

### 这就是nginx的高可用效果(主从模式)

**需要:**
- 主nginx
- 从nginx
- 两个keeplived
- 虚拟ip(192.168.25.200)


nginx启动的时候 虚拟ip 和 nginx1 在一台机器上 这时候一台机器上有两个ip没问题么？ 没有  
因为一台机器上能配置多个ip地址 一个网卡上也能配置多个ip地址 不是一个机器只有一个ip的 比如一台机器可以插多个网卡接入不同的网络 比如一个网卡接入内网 另一网卡接入外网这都可以

nginx1的ip地址是固定的 而虚拟ip是由 keeplived 来管理的

<br>

### **准备工作**
**1. 创建 backup nginx**   
可以将我们电脑里面的主机 克隆一份  
启动之前先把克隆这份的 *mac地址* *ip地址* 换下 不然内网会有重提

mac地址的更改:
```
克隆机上右键 -- 设置 -- 网络适配器 -- 高级 -- mac地址 -- 生成(点下)
```

ip地址的更改:
```
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

修改 IPADDR

修改后要重新启动网络服务
```
systemctl restart network
```

<br>

### **安装 keeplived**
主从服务器上都要装 keepalived

<br>

### **方式1:**
编译安装
下载地址:
```
https://www.keepalived.org/download.html
```

使用 ./configure 编译安装

如果 报错 提示
```
configure: error
  !!!openssl is not properly installed on you system
```

安装依赖
```
yum install openssl-devel
```

<br>

### **方式2: 这个**
yum安装
```
yum install -y keepalived
```

<br>

### **检查是否成功安装 keepalived**
```
rpm -q -a keepalived
```

<br>

### **配置**
对于高可用的配置 我们只需要改 keepalived 的配置就可以 nginx 的配置不用动

使用 yum 安装后配置文件在 
```
/etc/keepalived/keepalived.conf
```

<br>

### **最小配置**
主服务器
```sql
! Configuration File for keepalived

global_defs { 
  -- 路由id 自己起的
  router_id lb111 
}


-- 该部分可以不用配置
-- 监测脚本 监测nginx是否还活着
vrrp_script chk_http_port {
  script "/usr/local/nginx/nginx/check.sh"
  interval 2
  weight 2
}


-- vrrp是keeplived在内网当中的通信的协议
-- atguigu是实例名称自己起的
vrrp_instance atguigu { 

  -- 主服务器
  state MASTER

  -- 在哪个网卡上绑定虚拟ip
  -- interface后面要填写网卡的名字 ip addr 可以看到
  interface ens33 

  -- 这个不用改 主从服务器的这个值必须相同
  virtual_router_id 51

  -- 优先级 当两个nginx都好用的时候 会开始竞选 谁的优先级越高谁就是master
  priority 100 

  -- 间隔检测时间
  advert_int 1 

  -- 两个nginx主从是一组 这个主从服务器中要保持一致吧 不用改
  authentication { 
    auth_type PASS 
    auth_pass 1111 
  }

  -- 虚拟ip地址 用户会访问200这个ip
  virtual_ipaddress { 
    192.168.25.200 
  } 
}
```

从服务器
```sql
! Configuration File for keepalived global_defs { 
  -- 两个nginx的routerid要不一样
  router_id lb110 
}

vrrp_instance atguigu { 
  -- 从服务器
  state BACKUP
  interface ens33
  virtual_router_id 51 
  -- 备用机的优先级设置低一些
  priority 50 
  advert_int 1 

  authentication { 
    auth_type PASS 
    auth_pass 1111 
  }

  virtual_ipaddress { 
    192.168.25.200
  }
}
```

<br>

**注意:**
virtual_router_id 和 vrrp_instance name 和 authentication 两台机器必须是一样的 这样属于一组 不一致的话 对应不上 会不好用

在配置高可用后 当用户访问 nginx 的时候 我们要访问 虚拟ip了

<br>

### **启动 keepalived **
配置完 keepalived 的配置文件 要将 keepalived 启动起来
```
systemctl start keepalived
```

查看 keepalived 的状态
```
systemctl status keepalived
```

<br>

### **测试 **
1. ping 主服务器
2. 停掉主服务器
3. 查看从服务器

<br>

### **扩展:**
如果写监测nginx是否还活着的脚本了 那就看下面的代码
```sql
#!/bin/bash
A=`ps -C nginx -no-header |wc -1`
if [ $A -eq 0 ]; then
  -- nginx启动的路径
  /usr/local/nginx/sbin/nginx
  sleep 2
  if [ `ps -C nginx -no-header |wc -1` -eq 0 ];then
  fi
fi
```

配置详解:
```
https://www.bilibili.com/video/BV1zJ411w7SV?p=16&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

<br><br>

# nginx看到38