# HTTP课程安排 
![http课程安排](./images/http01.png)

<br><br>

# 浏览器中输入域名后 发生了什么?
![输入域名的背后](./images/http02.png)

<br>

1. 输入域名: www.baidu.com 提交
2. 根据 域名 寻找 目标服务器的IP地址 依靠DNS服务器
3. 通过 DNS服务器查询到 域名所映射到的服务器地址
4. 浏览器根据查询到的IP地址 跟 web服务器进行通信 (通信协议为http协议)
5. web服务器收到请求 执行后台程序 将执行结果 以响应报文的形式回传到浏览器
6. 浏览器会解析html

<br><br>

## HTTP协议:
HTTP协议叫做超文本传输协议是一种通信协议, 协议就是一种规则 双方传输的时候要遵守规则

它允许将超文本标记语言文档从web服务器传送到客户端的浏览器 也就是用来在网页之间传递html的一种规则

<br>

HTTP是一个属于**应用层的面向对象的协议**, 由于其简捷快速的方式 适用于分布式超媒体信息系统

它于1990年提出 经过几年的使用与发展 得到不断的完善和扩展

<br>

协议是指双方或多方相互约定 大家都需要遵守的**规则**叫协议

在我理解就是, 协议是两方及其两方以上共同约定的一种规则, 所以这里协议就是指网络中 **各方都遵守的一种协议, 只有规则相同时, 相互才能理解对方所说的话**

Http协议是基于Tcp的应用层协议 它不关心数据传输的细节 主要是用来 **规定客户端和服务器的数据传输格式**

<br><br>

## Web 与 HTTP
web是一种基于超文本和HTTP 全球性 动态交互的 跨平台的分布式**图形信息系统**

我们访问的网站都是建立在internet上的一种网络服务, 为浏览者在internet上查找 和 浏览信息提供了图形化的

易于访问的直观界面 其中的文档及超级连接将internet上的信息节点组织成一个互为关联的网状结构

所以 web 是基于HTTP之上的图形优化展示

<br><br>

# HTTP的发展史
![HTTP的发展历史](./images/http03.png)

<br>

### http2.0
http2.0的主要目标提高了传输性能 实现了低延迟 和 高吞吐量 

该版本并没有改变 http方法 状态码 头信息等 所以我们通常认为Http2是Http1的扩展 而并不是替代

截止到2019年 使用http2的网站不到30%, 但是使用html5的网站达到了90% 大约有30%的网站使用了 HTTP/2 协议来传输数据，而约有90%的网站使用了 HTML5 标准来构建网页内容。

HTTP/2是HTTP协议的最新版本，相对于之前的HTTP/1.1，在性能和效率上有一些显著的改进。HTTP/2允许在单个TCP连接上同时发送多个请求和响应，使用二进制格式编码数据，实现了头部压缩、服务器推送等功能，从而提高了网页加载速度和性能。

<br>

请注意，使用HTTP/2的网站可能仍然使用HTML5来构建网页内容，因为HTML5是一种标准，用于描述网页的结构和内容。HTTP/2和HTML5是独立的技术，可以同时使用，但并不互相排斥。

<br>

### http3.0
说 http3 之前我们还要说下 quic 协议 它是一种传输层的协议 最早是由谷歌在2013年提出来的

目前最主流的传输层协议有两个
- tcp
- udp

<br>

**tcp协议:**  
是面向连接的 在实际通信之前需要建立握手 同时还在每个数据包中添加了序列号的校验 以便我们接收端对数据进行校验

<br>

但是这样导致了tcp的效率比较低 谷歌提出的quic协议就是为了减少tcp通信带来的延迟 和 开销

为此quic的协议就不再使用面向连接的机制 而是基于udp协议 采用了和udp一样的面向无连接的

但是udp不是特别可靠的, 所以谷歌在udp的基础上做了大量的改进 视图以udp的效率提供类似tcp的可靠性

所以谷歌在2015年在http2刚刚提出的时候 就将quic提交给了IETF来进行标准化 但是并没有比采纳 而是这个组织自己用造了一份 quic协议

到了16年10月份的时候IETF提议将现有的他们做出来的quic更名为Http3

<br><br>

# TCP/IP
http协议是构建在 TCP/IP 协议之上的 是 TCP/IP 协议的一个子集

我们使用的网络包括互联网都是在我们 TCP/IP 协议基础之上来运作的


<br>

### TCP/IP概念
TCP/IP协议其实是一系列与互联网关联的协议集合起来的总称

<br>

协议是一种规则, 计算机和网络设备要相互通信 双方就必须基于相同的方法 比如
- 如果探测到通信目标
- 由哪一边先发起通信
- 使用哪种语言进行通信
- 怎么样结束通信

等等 上述的规则都需要事先确定 不同的硬件不同的操作系统之间的通信 所有的通信都需要一种规则

我们就将这种规则称为协议

<br>

### TCP/IP的特征
在TCP/IP中分层管理是TCP/IP协议的重要特征

<br>

### TCP/IP分层
TCP/IP协议族是由一个四层协议组成的系统 这四层分别为
- 应用层
- 传输层
- 网络层
- 数据链路层

```s
- 应用层 HTTP
    ↑↓
- 传输层 TCP
    ↑↓
- 网络层 IP
    ↑↓
- 链路层 网络
```

<br>

### 应用层:
应用层一般是我们编写的**应用程序**, 决定了向用户提供的应用服务

应用层可以通过系统调用与传输层进行通信 如下都是应用层的协议
- FTP: 通过 FTP 下载文件
- DNS
- HTTP

<br>

### 传输层:
传输层通过系统调用向应用层提供处于网络连接中的两台计算机之间的数据传输的功能

在传输层有两个性质不同的协议:
- TCP: 面向连接的
- UDP: 面向无连接的

<br>

TCP虽然可靠 但是需要建立连接 效率比较低 UDP没有连接效率高 但是因为没有建立连接 没有校验机制 所以不可靠

<br>

### 网络层:
网络层用来处理在网络上流动的数据包, **数据包是网络传输的最小数据单位**

该层规定了通过怎么的路径(传输路线)到达对方计算机并把数据包传输给对方

与对方计算机通过多台设备进行网络传输的时候 网络层起到的作用就是在众多的路线中选择一条传输路线

<br>

### 链路层:
链路层用来处理连接网络的硬件部分 包括
- 控制操作系统
- 硬件设备驱动
- NIC
- 光纤 等

物理可见部分 硬件上的范畴均在链路层的作用范围之内

<br><br>

### 数据包封装的过程
![数据包封装的过程](./images/http04.png)

<br>

也就是我们上层协议的数据 是怎么转变为下层协议数据的呢? 这里就是通过封装来实现的

<br>

应用程序的数据在发布到数据网络之前 会沿着协议栈从上往下进行传递 而每层协议都将在上层协议的基础之上加上自己的头部信息 链路层还会加上尾部信息

以此来实现所有层的数据封装 最终为达到我们的网络提供所有的必要信息

这就是数据包的封装过程

<br>

![数据包封装的过程2](./images/http05.png)

<br>

我们利用 TCP/IP 族进行网络通信的时候 会通过分层的顺序与对方进行通信

发送端从应用层往下走, 接收端从链路层向上走, 数据从上层传输到下层 且每经过一层都会被打上盖层的头部信息

而接收端接收数据的时候 数据从下层传输到上层 传输前会把下层的头部信息删除

<br>

### 流程:
**对于发送端:**

1. 发送端的应用程序首先将数据传递给应用层。
2. 应用层将数据传递给传输层，通常使用 TCP 或 UDP 协议来管理数据的传输。
3. 传输层将数据传递给网络层，这里会添加 IP 头信息，形成 IP 数据包。
4. 网络层将数据传递给链路层，这里会添加链路层的头信息和尾部信息，形成帧（frame）。
5. 帧在物理层进行传输，发送到目标地址。

<br>

**对于接收端:**  

1. 接收端的物理层接收到帧，并将其传递到链路层。
2. 链路层去掉帧的头信息和尾部信息，得到 IP 数据包。
3. 网络层去掉 IP 头信息，得到传输层的数据。
4. 传输层将数据传递给应用层，接收端的应用程序得到数据。

所以，接收端的数据处理顺序是从链路层往上走，逐层处理，直到应用层获取数据。**这个过程被称为数据在网络协议栈中的"上行"（upward）传输。**

而发送端的数据处理顺序是从应用层往下走，逐层封装，直到物理层发送出去，**这个过程被称为数据在网络协议栈中的"下行"（downward）传输。**

<br>

### 解析:
比如我们通过http协议发送一个想看某个页面的http请求 接下来为了传输方便 在传输层将应用层收到的数据(http请求报文) 进行分割 并且在各个报文上打上标记 序列号 端口号 等等信息

发送到网络层 在网络层通过IP协议增加作为通信目的地的mac地址然后转发给链路层

这样发往网络的通信请求就准备齐全了 接收端的服务器在链路层接收收到请求的数据 按顺序向上层发送 一直发送到应用层

<br>

发送端在经过每一层的时候 必定需要打上该层所属的头部信息

接收端相反 在层与层之间传输数据的时候 每经过一层都需要将该层的头部信息删掉

<br><br>

## TCP: 三次握手
使用TCP协议进行通信的双方必须先建立连接, 然后才能开始传输数据

为了确保连接双方可靠性, 在双方建立连接的时候 TCP协议采用了三次握手的策略

<br>

![三次握手](./images/http06.png)
![三次握手2](./images/http07.png)

<br>

上图中 client 和 server 之间有3次连接

1. 第一次握手: 客户端发送带有 syn 标志的连接请求报文段 然后进入 syn_send 状态, 等待服务端的确认

2. 第二次握手: 服务端接收到客户端的 syn 报文段后 需要发送 ack 信息对这个syn报文段进行确认, 同时 还要发送自己的 syn 请求信息, 服务端会将上述的信息放到一个报文段(syn+ack报文段)中, 一并发送给客户端 此时服务端将会进入到 syn_recv 状态

3. 第三次握手: 客户端接收到服务端的syn+ack报文段后 会向服务端发送ack确认报文段, 这个报文段发送完毕后 客户端 和 服务端都进入established状态 完成tcp三次握手

<br>

### 为什么要有3次握手:
因为双方要明确自己的收发能力, 所有需要3次握手

<br><br>

## IP协议: Internet Proctor
负责传输的协议

IP协议位于网络层几乎所有的网络系统都会使用到IP协议, IP地址与IP协议是不同的

传输过程中需要两个重要条件
- 一个是IP地址: IP地址指明了节点被分配到的地址
- 一个为MAC地址: MAC地址是指网卡所属的固定地址

<br>

IP地址和MAC地址可以相互匹配, IP地址可以改变, 但MAC地址一般保持不变

IP间的通信依赖于MAC地址。在网络上, 一般传输时, 双方不处于同一局域网内, 所以这时我们需要经过多台计算机转发才可以达到对方, 

而在中转时会利用下一站中转设备的MAC地址来搜索下一个中转目标, 这时, 会采用ARP协议(Address Resolution Protocol), ARP是一个地址解析协议, 根据通信方的IP地址就可以反查出对应的MAC地址

因为网络世界很大, 我们无法全部掌握, 所以在传输中不能准确的选择发送到目标, 所以我们采用路由选择机制, 这种机制和快递很像: 比如从西安发往哈尔滨

1. 首先你将快递送到本区的集散点, 才能确定是否可以发送至哈尔滨

2. 然后快递公司收取, 送至下个目标点西安总公司, 查看目标地点, 发现是哈尔滨的

3. 然后发往下个目标点黑龙江省总公司, 因为哈尔滨是省会, 所以相当于发往哈尔滨的总公司

4. 继续查找下个目标地点, 为哈尔滨某个区, 发往此处, 到达目标点

<br><br>

# DNS
DNS服务也是与HTTP协议有着密不可分的关系, 它提供的就是从域名到IP地址之间的解析关系

通常我们在访问一个网站的时候 使用的是主机名 或者 域名来进行访问的

因为相当于IP地址 域名更容易让人记住 但是TCP/IP协议使用的是IP地址进行访问的 所以必须有一个机制 或 服务把域名转换为 IP地址

DNS服务就是用来解决这个问题的 **它提供域名到IP地址之间的解析服务**

<br>

当我们将一个域名提供给DNS服务的时候 它会自动返回一个IP地址

<br>

### 访问DNS服务的过程
```s
# 1
用户 - 域名发送给DNS服务 -> DNS服务器

# 2
用户 <- 域名对应的IP地址 - DNS服务器

# 3
用户 - IP地址 -> 目标服务器
```

为了提高效率 DNS的解析是有层次的 它会有 **就近原则**

本地电脑会将我们经常使用的域名 和 响应的IP地址 建立一个映射关系并且保存到系统文件中

所以在正常情况下 在进行DNS解析的时候系统会优先从host文件里面去寻找对应的ip地址 如果找到则直接使用 host 文件中的IP地址

因为DNS解析最先读取的就是系统中的host文件

如果我们的本地文件中没有域名对应的IP地址 就会先求助本地的DNS服务器 我们本地都有自己的DNS服务 系统会向本地的DNS服务(8.8.8.8)发起请求 去查询域名对应的IP地址

本地是有限的如果本地的DNS服务没有找到对应的IP地址 那么它会一层层的向上一次DNS服务发送请求 直到DNS根服务器 如果找到的话就会进行回传 最终将找到的IP地址返回给浏览器

上面不管我们说的是 host文件还是本地的DNS 还是再上一层的DNS服务 目的就一个域名的解析必须有一个结果 要么给我一个ip地址 要么告诉我这个域名根本就不存在

<br>

### 回溯HTTP事务的处理过程
1. 输入域名 查询域名 向DNS服务器 发起查询ip地址的请求
2. 由DNS服务器给我们返回ip地址
3. 生成http请求 通过 TCP/IP 协议族 进行连接 和 三次握手
4. 连接成功后传输http请求 到 web服务器
5. web服务器生成http回复 通过 TCP/IP 协议 传递到客户端
6. 最后释放 TCP/IP 连接

<br>

![详细的HTTP事务处理过程](./images/详细的HTTP事务处理过程.png)

<br><br>

# HTTP协议的特点
通过请求和响应的交换进行通信(HTTP是不保存状态的协议) http协议中发送的数据又叫做报文, 通过http发送的, **数据 == 报文**

<br>

### 1. 支持 客户 / 服务器 模式
客户 / 服务器模式 工作的方式是由 客户端 向 服务器发出请求, 服务器端响应请求, 并进行相应的服务
```s
1. 连接到服务器
2. 客户端 发送请求
3. 服务端 发送响应
4. 关闭连接
```

http请求肯定是从客户端开始建立通信的 服务端在没有接收到客户端的请求之前是不会发出响应的

<br>

### 2. 简单快速
客户端向服务端请求服务的时候 只需要传送请求方法和路径

请求方法常用的有
- get
- post
- head

每种方法规定了客户端 和 服务端 联系的类型不同 由于http协议简单 使得http服务器的程序规模小 因而通信速度很快

<br>

### 3. 灵活
http允许传输任意类型的数据对象, 正在传输的类型有Content-Type (表示内容类型的标记) 加以标记

<br>

### 4. 无连接
无连接不是说没有连接, 而是它限制每次连接只处理一个请求, 服务端处理完客户端的请求 并收到客户端的应答后 就断开连接 这种传输方式可以节省传输时间

那一个页面有好多个http请求 来回断开不会效率低么? 

早期这么做的原因是http的协议产生于互联网, 因此服务器需要处理同时面向全世界上百万客户端的网页访问 但是每个客户端与服务端进行交换数据的间歇性特别大

我们传输这个动作是有突发性和瞬时性的 并且网页的浏览性和发散性导致两次或者更多次传输的数据的关联性很低 大部分的通道实际上是很空闲的 也就会无端的占用资源 所以http的设计者有意利用这样的特点 将协议设计为请求的时候连接 请求完就释放连接 以尽快的将资源释放出来 服务于其他的客户端

但是随之时间的推移网页变的越来越复杂 里面可能嵌入了很多的图片 这时候我们每次访问图片都需要建立一次TCP连接 这样就显得特别的低效 最后有一个keep-live的功能被提出用来解决这个效率低的问题 keep-live从名称上来说 都很容易理解

翻译过来就是保持存活 它的功能就是让客户端与服务端的连接能够持续有效 当出现对服务器的后续请求的时候 keep-live的功能就能够避免建立或者重新建立连接

现在市场上大部分的服务器都支持http的kepp-live, **对于提供信息的静态网站来说 这个功能是非常有用的**, 但是对于负担较重的网站来说这里就存在了另外一个问题

虽然我们为客户端保留打开的连接 有一定的好处 但是同样有我们刚才说的影响性能 因为在处理暂停期间, 本来可以释放的资源 仍旧被占用了 这样一来客户端和服务器之间的http连接就会保持不会断开

当然我们也可以通过设置来解决, 比如我们可以设置让keep-live不是永久有效的 这样就有了超时时间 超过了规定的时间 或者意外断电了 都会断开连接

同样既然我们让它有有效性 只要还在有效期内 只要没有断开 当同一个客户端发送另外一个请求的时候 就可以使用这条已经建立好的连接 **没有断开重复使用的连接就是tcp连接**

无论怎么样对于同一个客户端来说 还是每次只处理了一个请求

<br>

### 5. 无状态
http协议是无状态的协议

http协议对于我们事务的处理没有记忆能力, 缺少状态意味着如果后续处理需要前面的信息 则它必须重传, 这样可能导致每次连接传送的数据量增大

服务器不知道客户端是什么状态, 也就是说我们给服务器发送http请求之后, 服务器会根据请求将响应回传 但是发送完它不会存储任何信息 这就意味着每个请求都是独立的 即便我们前面说的keep-live也不能改变这个结论, 缺少状态意味着如果后续处理需要前面的信息, 那这些信息必须要重新传送, 这样可能导致每次连接传送的数据量增大

另一方面在服务器不需要先前的信息的时候 它的应答就会很快 这也是它的优点

http的这些特性有优点也有确定, 优点在于我们解放了服务器 每次请求都点到即止 不会造成不必要的连接占用 缺点就在于每次请求都会传送大量的重复的信息

客户端与服务器在进行动态交互的web应用出现之后 http无状态的特性就严重阻碍了这些应用程序的实现 因为我们交互需要承前启后的

比如我们的购物车程序 也需要知道用户在之前选择了什么商品 所以两种用来保持http连接状态的技术 有应运而生了
- cookie
- session

有了这两种技术就可以让http协议仍然保持一个简单的状态(cookie session是用来辅助记忆的, 相当于在http家里面贴满了便签纸, 这样才能让http记住刚才发生的事情)

<br><br>

# URL 和 URI
在http协议中有三个概念
- uri
- url
- urn

```s
      URI
+------ ------+
| URL     URN |
```

<br>

### URI:
uri可以分为 url 或者 urn 或者同时具备 locators 和 names 特性的一种东西
- urn的作用就好像一个人的名字
- url的作用就好像一个人的地址

换句话说 urn确定了东西的身份, url提供了找到它的方式

<br>

它是一个紧凑的字符串用来标示 抽象 或 物理资源, 一个uri可以进一步被分为定义符, 名字 或者 两者都是
我们常说的url是uri的一个子集, 除了确定一个资源, 还提供一种定位改资源的主要访问机制(如资源在网络中的位置)

<br>

uri是一个网络资源的头衔 它是一个统称 通过uri标记 可以将网络中的每一个事务都加以标记 并且区分开来, 而定位到这个资源的方式就是 url(地址)

就像名片, xxx公司就相当于一个头衔(资源), 我们要找到这个公司必须要通过地址(url)
```s
xxx公司

张三

北京市海淀区xxx路xxx号
```

<br>

### URL: 统一资源定位符
是对可以从互联网上得到的资源的位置和访问方法的一种简洁的表示, 是互联网上**标准资源**的地址。

互联网上的每个文件都有一个唯一的URL, 它包含的信息指出文件的位置以及浏览器应该怎么处理它 是资源标识符最常见的形式

URL 描述了一台特定服务器上某资源的特定位置。
是浏览器寻找信息时所需的资源位置。通过URL, 人类和应用程序才能找到、使用并共享因特网上大量的数据资源。

<br>

### 格式:
```s
http://user:pass@www.example.com:80/dir/index.html?uid=1#hash2
```

**http://:**  
协议类型, 除了http以外有ftp,mailto,news,tel,telnet,urn等等, 这里只列出常见的, 也可以使用data:或javascript:这类指定数据或脚本程序的方案名, 必选项

<br>

**user:pass@:**  
位置在 *http://后 + 这里 + 域名前*  
登录信息(认证), 指定用户名和密码作为从服务器端获取资源时必要的登录信息, 现在不常用, 可选项

很多服务器都要求输入用户名和密码才会允许用户访问数据
``` 
ftp://ftp.prep.ai.mit.edu/pub/gnu
ftp://anonymous@ftp.prep.ai.mit.edu/pub/gnu
ftp://anonymous:my_passwd@ftp.prep.ai.mit.edu/pub/gnu
http://joe:joespasswd@www.joes-hardware.com/sales_info.txt
```

<br>

**www.example.com:**   
域名(ip), 也可以使用IP地址, 必选项

<br>

**80:**     
端口号, 不输入时, 默认端口号, 可选项 0-65535

<br>

**dir/index.html:**  
*资源路径*  
带层次的文件路径, 标识网络资源(文件 图片 音视频 变量)

<br>

**?uid=1:**   
查询字符串(查询参数), 可选

key=value, 这些kv是传递给资源路径对应的数据(资源可以是函数 servlet)

<br>

**#hash2:**   
片段标识符, hash值, 可做锚点, 可做前段路由, 可选

<br>

### 总结:
url是uri的一种, 但不是所有的uri都是url, 那让uri能够成为url的当然是那个访问机制 urn是唯一标识的一部分, 是身份信息, 提供了访问机制的才是url

uri和url最大的差别就是 "访问机制"

<br><br>

## 编码机制:
为了避开安全字符集表示法带来的限制, 人们设计了一种编码机制, **用来在 URL 中表示各种不安全的字符。**

这种编码机制就是**通过一种"转义"表示法来表示不安全字符的**

这种转义表示法包含一个百分号(%), 后面跟着两个表示字符ASCII 码的十六进制数。

**%16进制数*2**

<br><br>

# 资源
最简单的Web 资源就是Web 服务器文件系统中的静态文件。这些文件可以包含任意内容
但资源不一定非得是静态文件。资源还可以是根据需要生成内容的软件程序。(比如servlet也是一种资源)

<br>

## 媒体类型
因特网上有数千种不同的数据类型, HTTP 仔细地给每种要通过Web 传输的对象都打上了名为MIME 类型(MIME type) 的数据格式标签。

<br>

### MIME 类型
MIME是HTTP协议中数据类型

**主要的对象类型/特定的子类型 (大类型/小类型)**    

中间由一条斜杠来分隔, 比如:
- 主要类型是文本 / 什么类型的文本
- 主要类型是图片 / 什么格式的图片

并与某一种文件的扩展名相对应

<br>

**示例:**
- text/html: HTML 格式的文本文档
- text/plain: 普通的 ASCII 文本文档
- image/jpeg: JPEG 格式的图片
- image/gif: GIF 格式的图片
- video/quicktime: Apple 的 QuickTime 电影
- application/vnd.ms-powerpoint: 微软的 PowerPoint 演示文件


<br>

### 常见的MIME类型
我们可以通过查看Tomcat解压目录下conf/web.xml配置文件, 了解HTTP协议中定义的MIME类型。

<br>

|文件|MIME类型|后缀|
|:--|:--|:--|
|超文本标记语言文本|text/html|.html|
|普通文本|text/plan|.txt|
|RTF文本|application/rtf|.rtf|
|GIF图形|image/gif|.gif|
|JPEG图形|image/jpeg|.jpeg|
|GZIP文件|application/x-gzip|.gz|
|TAR文件|application/x-tar|.tar|
|au声音文件|audio/basic|.au|
|MIDI音乐文件|audio/mid|.mid|
|realAuto音乐文件|audio/x-pn-realAuto|.ra, .ram|
|MPEG文件|video/mpeg|.mpg, .mpeg|
|AVI文件|video/x-msvidwo|.avi|

<br><br>

# HTTP请求报文: 

## 请求报文
```s
# 请求方法  请求uri  http协议以及版本
POST /webTours/login.pl HTTP/1.1
# 报文头
Host: http://10.253.12.233:1050
Connection: keep-alive
Content-Length: 138
Pragma: no-cache
Cache-Control: no-cache
Origin: http://10.253.12.233:1050
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BAIDUID=2E66DB83A0707005959E51E753D2C967:FG=1; BIDUPSID=2E66DB83A0707005959E51E753D2C967; PSTM=1682773746; BD_UPN=123253;
# 空行

# 报文体
userSession=12345435
```

<br>

上面的内容就是http的请求 它分为3个部分
1. 请求行
2. 请求头
3. 空行
4. 请求体

服务端可以根据请求头获取到客户端的很多信息

<br><br>

## 响应报文
```s
# 报文协议以及版本  状态码  状态描述
HTTP/1.1 200 OK
Server: BWS/1.1
Date: Sat, 05 Aug 2023 07:27:55 GMT
Cache-control: no-cache
Expires: 0
Content-length: 413
Content-type: text/html; charset=ISO-8859-1
Date: Sat, 05 Aug 2023 07:27:55 GMT
Expires: 5s

# 空行

# 响应体
<html> ... </html>
```

<br><br>

## 报文头信息 
在客户端与服务器之间 使用http协议进行通信的过程中 无论是请求还是响应 都会使用到报文头中的内容, 头部信息起到了可以传递额外的重要信息的作用

http报文头信息大体可以分为4类, 分别是:
1. 通用报文头: 这些是客户端和服务器都可以使用的通用首部。可以在客户端、服务器和其他应用程序之间提供一些非常有用的通用功能。

2. 请求报文头(请求首部是给服务器看的): 它们为服务器提供了一些额外信息, 比如客户端希望接收什么类型的数据。

3. 响应报文头(响应首部是给客户端看的)
4. 实体报文头

在http 1.1版本中一共规范了47种报文头字段

<br>

### 介绍: 通用报文头
通用报文头可以使用在请求报文上也可以使用在响应报文上

<br>

|首部字段名|说明|
|:--|:--|
|Cache-Control|控制缓存的行为|
|Connection|逐跳首部, 连接的管理|
|Date|创建报文的日期时间|
|Pragma|报文指令|
|Trailer|报文末端的首部一览|
|Transfer-Encoding|指定报文主体的传输编码方式|
|Upgrade|升级为其他协议|
|Via|代理服务器的相关信息|
|Warning|错误通知|

<br>

**逐跳首部:**  
是指那些应该仅在单个传输链上进行跳转的HTTP首部。这意味着这些首部不应该被代理服务器或缓存修改或删除。

每个经过的代理服务器都可能会添加、修改或删除其他类型的HTTP首部，但对于逐跳首部，它们只对当前连接有效。一些常见的逐跳首部包括"Connection"、"Keep-Alive"、"Proxy-Authenticate"、"Proxy-Authorization"等。

<br>

### 介绍: 请求报文头

<br>

|首部字段名|说明|
|:--|:--|
|Accept|用户代理可处理的媒体类型|
|Accept-Charset|优先的字符集|
|Accept-Encoding|优先的内容编码|
|Accept-Language|优先的语言(自然语言)|
|Authorization|web认证信息|
|Expect|期待服务器的特定行为|
|From|用户的电子邮箱地址|
|Host|请求资源所在的服务器|
|If-Match|比较实体标记(ETag)|
|If-Modified-Since|比较资源的更新时间|
|If-None-Match|比较实体标记(与If-Match相反)|
|If-Range|资源未更新时发送实体Byte的范围请求|
|If-Unmodified-Since|比较资源的更新时间(与If-Modified-Since相反)|
|Max-Forwards|最大传输逐跳数|
|Proxy-Authorization|代理服务器要求客户端的认证信息|
|Range|实体的字节范围请求|
|Referer|对请求中URI的原始获取方|
|TE|传输编码的优先级|
|User-Agent|HTTP客户端程序的信息(浏览器)|


<br>

**用户代理:**  
"用户代理"通常指的是Web浏览器, 它指执行网络请求和接收网络响应的客户端应用程序或设备。

<br>

**自然语言:**  
用于指示客户端首选的语言版本，以便服务器根据这个信息提供最适合的内容。

"Accept-Language" 头部用于指示客户端（通常是浏览器）首选的自然语言，服务器可以根据这个头部来选择最适合用户的语言版本的内容发送给客户端。

<br>

**Max-Forwards 最大传输逐跳数:**  
"Max-Forwards" 是HTTP协议中的一个头部字段，用于控制请求的传输跳数。

在HTTP通信中，一个请求（例如GET、POST等）可以通过多个中间节点（例如代理服务器）进行传输，每个节点称为一个 "跳"。每次请求经过一个跳，"Max-Forwards" 头部的值就会减少1。

这个头部的作用是控制请求的传输跳数，**以防止请求在网络上无限循环。**

当一个请求到达一个中间节点时，该节点会检查请求中的 "Max-Forwards" 头部的值。如果这个值大于0，它会将值减1，并继续将请求转发到下一个节点。当值为0时，中间节点可以选择不再转发请求，或者返回错误响应。

<br>

### 介绍: 响应报文头
它们提供了关于服务器响应的额外信息，这些信息能够被客户端使用。以下是响应报文头部的主要作用  
这些信息可以影响客户端如何处理响应内容、如何缓存、如何进行跳转等等。这些头部帮助客户端和服务器之间进行更有效的通信和资源处理。

<br>

|首部字段名|说明|
|:--|:--|
|Accept-Ranges|是否接受字节范围请求|
|Age|推算资源创建经过时间|
|ETag|资源的匹配信息|
|Location|令客户端重定向到指定uri|
|Proxy-Authenticate|代理服务器对客户端的认证信息|
|Retry-After|对再次发起请求的时机要求|
|Server|HTTP服务器的安装信息|
|Vary|代理服务器缓存的管理信息|
|WWW-Authenticate|服务器对客户端的认证信息|

<br>

### 介绍: 实体报文头
实体的编码方式 语言模式等等相应的报文信息

<br>

|首部字段名|说明|
|:--|:--|
|Allow|资源可支持的HTTP方法|
|Content-Encoding|实体主体适用的编码方式|
|Content-Language|实体主体的自然语言|
|Content-Length|实体主体的大小 单位字节|
|Content-Location|代替对应资源的URI|
|Content-MD5|实体主体的报文摘要|
|Content-Range|实体主体的位置范围|
|Content-Type|实体主体的媒体类型|
|Expires|实体主体过期的日期时间|
|Last-Modified|资源的最后修改日期时间|

<br><br>

## 常见: 请求报文头 说明

### **<font color='#C2185B'>Accept</font>**
告诉服务器, 浏览器可以接受的媒体类型

为客户端提供了一种将其喜好和能力**告知服务器的方式, 包括它们想要什么, 可以使用什么**, 以及最重要的, 它们不想要什么。这样, 服务器就可以根据这些额外信息, 对要发送的内容做出更明智的决定。

说白了就是告诉服务器我想要你什么 你别传其它的东西给我, 游览器不支持PNG图片的显示, 那 Accept 就不指定 image/png , 而指定可处理的 image/gif 和 image/jpeg 等图片类型。

```s
Accept: text/html
```

代表浏览器可以接受服务器回发的类型为 text/html, 如果服务器无法返回 text/html 类型的数据 服务器应该返回一个 406错误 (Non Acceptable)

```s
Accept: */*
```

代表浏览器可以处理所有类型

<br>

**格式:**  
可使用 type/subtype 这种形式, 一次指定多种媒体类型。

```js
Accept: text/html , application/xhtml+xml , application/xml ; q=0.9 , */* ; q=0.8
```

<br>

### 类型的优先级: 权重值
很多报文头中都可以增加权重值

如果想要给显示的媒体类型增加优先级, 则使用 q= 来额外表示权重值  
权重值q的范围: 0 ~ 1 (可精确到小数点后3位), 且1为最大值, 不指定权重q值的时候, 默认权重为 q=1.0
```s
q=权重值;
```

**当服务器提供多种内容的时候 将返回权重值最高的媒体类型**, 如果服务器权重最高的则返回权重最高的类型 如果不能则返回权重第二高的 直到我们实在找不到了为止

<br>

### **<font color='#C2185B'>Accept-Encoding</font>**
浏览器向服务器申明 浏览器能够接受的编码方法, 通常指的是压缩方法 比如是否支持压缩, 支持什么压缩方法 (gzip, deflate)

```s
Accept-Encoding: gzip, deflate
```

<br>

### **<font color='#C2185B'>Accept-Language</font>**
浏览器向服务器申明 浏览器可以接受的语言

```s
# 可一次指定多种自然语言集
Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3
```

客户端在服务器有中文版资源的情况下 会请求返回中文版对应的响应, 没有中文版的时候 则请求返回英文版响应

<br>

**告诉服务器客户端可以接收的语言类型** 
- zh_CH
- en_US
- ja

<br>

### **<font color='#C2185B'>Authorization</font>**
"Authorization" 头部用于在HTTP请求中向服务器提供身份验证凭据，以便验证客户端的身份。

它在需要对客户端进行身份验证的情况下使用，允许客户端向服务器发送用户名和密码、令牌等凭据，以获取访问受限资源的权限。

<br>

在HTTP请求中, 请求头（header）是一种用于在请求和响应消息中传递附加信息的机制。Authorization请求头是一种用于传递身份验证信息的标准HTTP请求头, 其目的是告诉服务器请求者的身份信息, 以便服务器进行认证和授权。

因此, Authorization请求头不是一个普通的请求头, 而是有特定的使用场景和语义。直接将Token当做一个普通的请求头使用, 可能会导致身份验证失败或者安全问题。如果需要在HTTP请求中传递Token, 建议使用Authorization请求头, 遵循标准的使用规范。

当然, 如果你的应用场景不需要进行身份验证, 或者使用其他方式进行身份验证（例如HTTP Cookie等）, 可以考虑在普通请求头中传递Token。不过, 在这种情况下, 需要确保Token的安全性, 并且需要定义好自己的Token传递规范, 以免引起混淆和安全问题。

<br>

**格式:**  
存放在 Authorization 请求头中的token有两种格式
1. ``Bearer <token>``
2. ``Basic <token>``

- Basic 后面拼接的token必须是经过Base64转码后的token
- Bearer 后面拼接的token可以放token的原值, 同时**如果选择Bearer方式则我们可以省略 Bearer前缀**

<br>

**推荐Bearer方式:**   
使用Basic模式会增加一定的复杂度，并且容易被攻击者截获并解码Token值。因此，在前端请求中传递Token时，建议使用Bearer模式，同时在后端实现Token的安全验证机制，以保障用户身份信息的安全性。

<br>

**使用场景: 基本身份验证**  
在基本身份验证中，客户端将用户名和密码进行 Base64 编码后的凭据放在 "Authorization" 头部中发送给服务器。服务器解码凭据并进行验证，如果通过则允许访问受限资源。

```s
GET /secure/resource HTTP/1.1
Host: example.com
# "base64encodedcredentials" 是经过 Base64 编码的 "username:password" 组合
Authorization: Basic base64encodedcredentials
```

<br>

**使用场景: 令牌身份验证**  
在令牌身份验证中，客户端将令牌（token）作为凭据放在 "Authorization" 头部中发送给服务器。令牌通常是由服务器颁发的，代表了客户端的身份或权限。
```s
GET /secure/resource HTTP/1.1
Host: example.com
# "token_value" 是服务器颁发的访问令牌
Authorization: Bearer token_value
```

<br>

**使用场景: OAuth 2.0**  
在OAuth 2.0授权流程中，客户端使用 "Authorization" 头部将客户端ID和客户端秘钥发送给授权服务器，以获取访问令牌。这是一种常见的应用于第三方应用程序的身份验证方式。

```s
POST /token HTTP/1.1
Host: authorization-server.com
Authorization: Basic base64encodedcredentials
```

<br>

### Authorization请求头的使用示例:
包括前端和后端的逻辑: 

<br>

**前端逻辑:**    

1. 用户使用用户名和密码登录，向后端发起身份验证请求。

2. 后端返回一个Token值作为身份验证凭据。

3. 前端在发送每个需要身份验证的请求时，将Token值放在Authorization请求头中。

4. 前端向后端发送请求，后端验证请求中的Authorization请求头中的Token是否有效，如果有效则返回请求结果，如果无效则返回401 Unauthorized错误。

下面是前端发送请求时的Authorization请求头示例: 
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

<br>

**后端逻辑:**  
1. 在请求处理函数中，获取请求头中的Authorization字段。

2. 如果Authorization字段为空，返回401 Unauthorized错误。

3. 如果Authorization字段非空，解析出其中的Token值，并进行身份验证。

4. 如果身份验证成功，返回请求结果。

5. 如果身份验证失败，返回401 Unauthorized错误

<br>

下面是后端解析Authorization请求头并进行身份验证的示例代码: 

```python
import jwt

def handle_request(request):
    # 获取Authorization请求头
    auth_header = request.headers.get('Authorization')
    
    # 如果Authorization请求头为空，返回401 Unauthorized错误
    if not auth_header:
        return Response(status=401)
    
    # 解析出Authorization请求头中的Token值
    auth_token = auth_header.split(' ')[1]
    
    try:
        # 使用JWT库验证Token是否有效
        user_info = jwt.decode(auth_token, secret_key, algorithms=['HS256'])
    except jwt.exceptions.DecodeError:
        # 如果Token解析失败，返回401 Unauthorized错误
        return Response(status=401)
    
    # 如果Token验证成功，返回请求结果
    return handle_request_successfully()

```

<br>

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor {

  @Value("${jwt.header}")
  private String tokenHeader;

  @Value("${jwt.secret}")
  private String secret;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    // 从请求头中获取Token
    String token = request.getHeader(tokenHeader);
    if (!StringUtils.isEmpty(token)) {
      // 验证Token是否有效，如果无效会抛出异常
      JwtUtils.validateToken(token, secret);
      return true;
    } else {
      // 如果Token为空，则返回401 Unauthorized响应
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return false;
    }
  }
}

```

<br>

```js
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

function verifyToken(req, res, next) {
  // 从请求头中获取Token
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (token) {
    // 验证Token是否有效，如果无效会抛出异常
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: 'Invalid token'
        });
      } else {
        // 将Token中的用户信息存放到请求中，方便后续使用
        req.user = decoded;
        next();
      }
    });
  } else {
    // 如果Token为空，则返回401 Unauthorized响应
    res.status(401).json({
      message: 'Missing token'
    });
  }
}

module.exports = verifyToken;

```

<br>

**注意:**  
如果没有使用 Bearer前缀 则后台可以直接读取 authorization 请求头, 注意后台读取authorization的时候 **使用的方式是小写**

<br>

### **<font color='#C2185B'>Expect</font>**
"Expect" 头部在HTTP请求中用于向服务器指示客户端期望服务器执行的操作或采取的行为。 (让服务器干什么???)

它通常在客户端希望服务器返回特定响应码或采取特定行动的情况下使用。然而，**"Expect" 头部的使用在实际中并不常见，而且有时会被服务器忽略。**

<br>

**使用场景: 100-continue 期望**  
一个常见的使用场景是在请求中添加 "Expect: 100-continue" 头部。这告诉服务器，在客户端发送完整请求主体之前，先发送一个 100 Continue 响应，以告知客户端可以继续发送请求。

这可以用于避免客户端在发送大型主体内容时等待服务器的响应。

```s
POST /upload HTTP/1.1
Host: example.com
Expect: 100-continue

<wait for 100 Continue response from server>
<send request body>
```

<br>

**使用场景: 拒绝请求**  
客户端可以使用 "Expect: 417 Expectation Failed" 来向服务器表示，如果服务器无法满足请求的期望条件，就应该返回 417 响应码。

```s
GET /resource HTTP/1.1
Host: example.com
Expect: 417 Expectation Failed
```

请注意，尽管HTTP规范中有定义 "Expect" 头部的使用，但实际上它的使用在许多场景中并不常见，甚至有些服务器会忽略它。因此，在编写HTTP请求时，通常不需要添加 "Expect" 头部，除非您明确知道它在特定情况下有用。

另外，一些代理服务器或中间设备可能会影响 "Expect" 头部的行为，因此在实际使用中需要小心考虑。

<br>

### **<font color='#C2185B'>Host</font>**
主要用于指定被请求资源的Internet主机和端口号 它通常懂http url中提取出来的, 也就是我们要请求的服务器是谁

我们在浏览器中输入: http://www.fljf.com:8080

浏览器发送的请求消息中, 就会包含Host请求报文头, 如下
```s
Host: www.fljf.com:8080
```

<br>

### 条件请求首部
有时客户端希望为请求加上某些限制。

比如, 如果客户端已经有了一份文档副本, 就希望只在服务器上的文档与客户端拥有的副本有所区别时, 才请求服务器传输文档。

通过条件请求首部, 客户端就可以为请求加上这种限制, 要求服务器在对请求进行响应之前确保某个条件为真

**形如 If-xxx 这样的请求首部字段, 都可以称为条件请求。服务器接收到附带条件的请求后, 只有判断指定条件为真时, 才会执行请求。给出响应**

<br>

### **<font color='#C2185B'>If-Match</font>**  
用于条件请求，通常与服务器上的资源的当前标识（ETag）进行比较，以确定资源是否匹配。只有当 If-Match 的字段值跟 ETag 值匹配一致时, 服务器才会处理这个请求。

<br>

当客户端请求一个资源时，服务器通常会在响应中包含一个唯一的标识符，称为 "ETag"（实体标签）。

这个 "ETag" 是根据资源的内容生成的，通常可以使用哈希算法生成。每当资源的内容发生变化时，"ETag" 也会随之更改，因为内容的变化导致了资源的唯一标识也发生了改变。

**当客户端发送带有 "If-Match" 头部的请求时，它实际上是将之前从服务器获取的资源的 "ETag" 值传递回服务器。**

服务器将比较这个 "If-Match" 头部中的 "ETag" 值与当前服务器上相应资源的 "ETag" 值是否匹配。
```s
这个比较过程是服务器内部进行的，通常涉及以下步骤: 

1. 解析请求:  
服务器首先解析客户端的HTTP请求，包括其中的 "If-Match" 头部，以获取客户端提供的 "ETag" 值。


2. 检索资源:  
服务器根据请求中的资源标识（如URL路径或其他标识）定位要请求的资源，然后获取当前服务器上的实际 "ETag" 值。
具体生成 "ETag" 值的方式取决于服务器的实现和资源的性质。以下是一些生成 "ETag" 值的常见方法: 
  1. 哈希函数: 服务器可以使用哈希函数（如MD5、SHA-1、SHA-256等）基于资源的内容生成哈希值，然后将哈希值作为 "ETag" 值。当资源内容发生变化时，哈希值会改变，导致 "ETag" 值的变化。

  2. 版本号: 对于某些资源，服务器可能会为每个版本分配一个唯一的版本号，将版本号作为 "ETag" 值。每当资源发生更改，版本号也会增加，从而使 "ETag" 值随之变化

  3. 时间戳: 服务器可以使用资源的最后修改时间戳作为 "ETag" 值。当资源被修改时，时间戳会更新，导致 "ETag" 值的变化。


3. 比较 "ETag" 值: 
服务器将客户端请求中的 "If-Match" 头部中的 "ETag" 值与从服务器上获取的资源的实际 "ETag" 值进行比较。
  1. 如果两个值相匹配，表示客户端提供的 "ETag" 值与服务器上的资源 "ETag" 值一致，说明资源没有被修改过，服务器会执行请求。

  2. 如果两个值不匹配，表示客户端提供的 "ETag" 值与服务器上的资源 "ETag" 值不一致，说明资源已经被修改过，服务器可能会返回 412 Precondition Failed 响应，告诉客户端需要重新获取最新版本的资源。
```

<br>

**如果匹配:**  
表示客户端发送的 "If-Match" 值与服务器上的资源的 "ETag" 值相匹配，说明资源没有被其他操作修改过，服务器会执行请求，更新资源或执行其他操作。

**如果不匹配:**  
表示客户端发送的 "If-Match" 值与服务器上的资源的 "ETag" 值不匹配，说明资源已经被其他操作修改过，服务器可能会返回一个 412 Precondition Failed 响应，告诉客户端当前资源的状态与客户端期望的不一致，需要客户端重新获取最新版本的资源后再次尝试。

<br>

这种机制允许客户端在请求中使用 "If-Match" 头部来实现资源的更新和并发控制。通过比较 "ETag" 值，客户端和服务器可以确保资源的状态是一致的，从而避免不一致性或冲突的情况。

<br>

**使用场景: 资源更新检查**  
客户端可以在请求中使用 "If-Match" 头部，将资源的当前标识（ETag）值发送到服务器。服务器会检查这个值是否与服务器上实际资源的标识匹配，如果匹配，说明客户端的操作是基于最新版本的资源，可以继续执行。如果不匹配，服务器可能返回 412 Precondition Failed 响应，表示资源已被修改。

```s
PATCH /resource/123 HTTP/1.1
Host: example.com
If-Match: "etag_value"
```

<br>

**使用场景: 乐观并发控制**  
使用 "If-Match" 头部可以实现乐观并发控制，**即在更新资源之前，检查资源的标识是否与客户端预期的标识一致。**

如果不一致，说明资源已被其他操作修改，客户端可能需要重新获取最新版本的资源并再次尝试更新。
```s
PUT /resource/123 HTTP/1.1
Host: example.com
If-Match: "expected_etag_value"
```

<br>

### **<font color='#C2185B'>If-Modified-Since</font>**  
用于条件请求，它允许客户端在请求中传递一个日期时间值，表示客户端认为服务器上的资源应该在这个日期之后修改过。

服务器会检查这个日期时间值，并根据资源的修改时间来判断是否需要返回资源的实际内容或返回 304 Not Modified 响应。

<br>

**使用场景: 资源缓存验证**  
客户端可以在请求中使用 "If-Modified-Since" 头部，将上次获取资源的日期时间值发送给服务器。
```s
# 这个日期时间值的格式遵循HTTP协议中的日期时间格式，通常是一个以 GMT（格林威治标准时间）为基准的字符串

# 使用 GMT 时间作为基准可以避免时区的问题。

# 客户端上次获取资源的时间值
If-Modified-Since: Wed, 04 Aug 2023 10:00:00 GMT
```

**客户端通常可以从之前获取的资源响应的头部中的 "Last-Modified" 字段获取最后修改时间，然后将这个值作为 "If-Modified-Since" 头部的值传递给服务器。**

服务器会将这个值与资源的最后修改时间进行比较，如果资源的最后修改时间在指定日期之后，说明资源已经更新，服务器会返回新的资源内容。

如果资源的最后修改时间在指定日期之前，说明资源没有变化，服务器可能会返回 304 Not Modified 响应，告诉客户端可以使用缓存的资源。

```s
GET /resource HTTP/1.1
Host: example.com
If-Modified-Since: Mon, 01 Aug 2023 12:00:00 GMT
```

<br>

**使用场景: 资源更新控制**  
客户端可以使用 "If-Modified-Since" 头部来控制资源更新的频率。通过指定一个较早的日期时间值，客户端可以告诉服务器，只有在资源的最后修改时间在指定日期之后时，才需要返回资源内容。这可以减少不必要的数据传输，提高性能。

```s
GET /resource HTTP/1.1
Host: example.com
If-Modified-Since: Sat, 01 Jul 2023 00:00:00 GMT
```

在这个示例中，客户端指定了一个较早的日期时间值，只有在资源的最后修改时间在指定日期之后时，服务器才会返回资源内容。

总之，"If-Modified-Since" 头部在HTTP请求中用于条件请求，根据资源的最后修改时间来决定是否返回资源内容。它适用于资源缓存验证、资源更新控制等场景，可以减少不必要的数据传输。

<br>

### **<font color='#C2185B'>If-None-Match</font>**  
只有在 If-None-Match 的字段值与 ETag 值不一致时, 可处理该请求。与 If-Match 首部字段的作用相反

```s
If-None-Match: *
```


<br>

### **<font color='#C2185B'>If-Range</font>**
它用于条件请求，通常与 "Range" 头部一起使用，用于指示客户端在资源部分更新的情况下是否需要获取完整的资源。

**这种请求通常用于下载大文件的一部分，以及实现断点续传等功能。**

<br>

**使用场景: 部分资源请求**  
当客户端请求资源的一部分时，它可以在请求中包含 "Range" 头部，指示服务器返回资源的指定部分。

如果客户端之前已经获取了该资源的一部分，并且有保存的 "ETag" 或 "Last-Modified" 值，那么客户端可以使用 "If-Range" 头部来判断资源是否更新过。

如果资源未更新，服务器可以继续返回之前请求的部分，从而实现断点续传等功能。

```s
GET /large-file HTTP/1.1
Host: example.com
Range: bytes=500-999
# 客户端请求资源的一部分，并使用 "If-Range" 头部将之前保存的 "etag_value" 发送给服务器。
If-Range: "etag_value"
```

<br>

**使用场景: 条件下载**   
如果客户端之前已经下载了整个资源，但现在只希望在资源更新时才获取完整的资源，可以使用 "If-Range" 头部进行条件下载。

如果资源的 "ETag" 或 "Last-Modified" 值与之前保存的值不匹配，说明资源已经更新，客户端可以获取完整的新资源。

```s
GET /large-file HTTP/1.1
Host: example.com
If-Range: "previous_etag_value"
```

<br>

### **<font color='#C2185B'>Referer</font>**
当浏览器向web服务器发送请求的时候, 一般会带上Referer, 告诉服务器我是从哪个页面链接过来的, 服务器借此可以获得一些信息用于处理

"Referer"（拼写为 "Referer" 而不是 "Referrer"，是HTTP规范中的拼写）头部在HTTP请求中用于指示从哪个URL页面链接过来的。

它通常用于跟踪访问来源，记录访问统计，或实现一些网站功能。

只要查看 Referer 就能知道请求的 URI 是从哪个 Web 页面发起的

二次请求的时候就会有 referer 这个请求头 相当于问你从哪来的 我北京的 这个概念

```s
Referer: http://www.example.com/index.html
```

客户端一般都会发送 Referer 首部字段给服务器。但当直接在游览器的地址输入 URI , 或处于安全考虑时, 也可以不发送该首部字段。

因为原始资源的 URI 中的查询字符串可能包含 ID 或密码等保密信息, 要是写进 Referer 转发给其他服务器, 则有可能导致保密信息的泄露。

另外, Referer 的正确拼写应该是 Referrer , 但不知为何, 大家一致沿用这个错误的拼写。

**请求发起时 浏览器地址栏的地址(从哪来)** 

<br>

比如: 前端页面 ``http://localhost:8080/project/`` 页面有一个 form表单
```s
action="http://localhost:8080/project/hello2"
```

也就是说我们点击 提交的时候 会跳转到 ``http://localhost:8080/project/hello2``

这时我们再打开控制台的 network 查看 Referer 会发现它的值为 http://localhost:8080/project/

也就是说我们可以从这个请求头上看出 从哪来到/hello2这个页面的

<br>

**使用场景: 访问来源跟踪**   
网站管理员可以通过分析 "Referer" 头部来了解访问者是从哪个页面链接过来的，从而跟踪访问来源。这可以帮助他们了解用户的行为和喜好，以便做出更好的决策。

```s
GET /page HTTP/1.1
Host: example.com
Referer: https://previous-page.com/link
```

在这个示例中，"Referer" 头部指示该请求是从 "https://previous-page.com/link" 页面链接过来的。

<br>

**使用场景: 防盗链控制**   
网站可以使用 "Referer" 头部来控制资源的访问权限，防止资源被未经授权的网站链接使用。服务器可以检查请求的 "Referer" 头部，如果不是预期的来源页面，可以拒绝提供资源。

```s
GET /protected-image.jpg HTTP/1.1
Host: example.com
Referer: https://allowed-domain.com/page
```

在这个示例中，服务器检查 "Referer" 头部，只有在 "https://allowed-domain.com/page" 页面链接过来时才提供资源。

<br>

服务器可以通过检查请求头部中的 "Referer" 字段来获取客户端请求的来源页面。这个字段会包含发送请求的页面的URL地址。服务器可以解析这个字段的值，然后根据自己的策略来判断请求是否来自预期的来源。

1. 获取 "Referer" 头部的值: 服务器从HTTP请求头部中获取 "Referer" 字段的值。

2. 验证来源: 服务器使用获取到的 "Referer" 值来判断请求的来源是否合法。这可能包括以下几个步骤: 
  1. 检查 "Referer" 值是否存在: 有些浏览器或用户可能会设置不发送 "Referer" 头部，因此服务器需要检查它是否存在。
  2. 比对 "Referer" 值: 服务器可能需要将 "Referer" 值与允许的来源进行比对，比如允许的域名或特定的页面链接。
  3. 判断是否允许访问: 根据比对结果，服务器可以决定是否允许访问资源或执行请求的操作。

```java
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/protected-resource")
public class ProtectedResourceServlet extends HttpServlet {
    private static final String ALLOWED_REFERER = "https://allowed-domain.com/page";
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String referer = request.getHeader("Referer");
        
        if (referer != null && referer.equals(ALLOWED_REFERER)) {
            // 执行允许的操作
            response.getWriter().write("Access granted!");
        } else {
            // 返回拒绝访问的响应
            response.getWriter().write("Access denied!");
        }
    }
}
```

<br>

### **<font color='#C2185B'>User-Agent</font>**
告诉http服务器, 客户端使用的操作系统 和 浏览器的名称和版本, 很多情况下我们会通过 User-Agent 来判断浏览器类型, 从而进行不同的兼容设计

<br><br>

## 常见: 响应报文头 说明

### **<font color='#C2185B'>Accept-Ranges</font>**
它指示服务器是否支持在获取资源时使用范围请求

范围请求允许客户端请求资源的部分内容，而不是整个资源，这在下载大文件或实现断点续传等场景中很有用。

<br>

**可选值:**  
- bytes: 表示服务器支持范围请求的标准值。当服务器设置 "Accept-Ranges: bytes" 头部时，它允许客户端通过设置 "Range" 头部来请求资源的部分内容，以字节为单位的范围。

- none:  这表示服务器不支持范围请求。当服务器设置 "Accept-Ranges: none" 头部时，客户端只能获取整个资源，无法通过范围请求来获取部分内容。

```s
HTTP/1.1 200 OK
Accept-Ranges: bytes # 支持
Content-Length: 1024
Content-Type: image/jpeg
```

<br>

### **<font color='#C2185B'>Age</font>**  
用于指示从服务器生成响应到客户端接收响应之间的时间间隔，以秒为单位。

它通常在缓存和代理服务器中使用，用于告知客户端响应的新鲜程度以及资源的存活时间。

<br>

**使用场景: 缓存响应的新鲜度**   
代理服务器或缓存服务器在接收到来自原始服务器的响应后，会将响应保存一段时间，以便在后续的请求中直接返回相同的响应，从而减少对原始服务器的访问。

通过在响应中包含 "Age" 头部，服务器可以告知客户端这个响应在服务器端生成后经过了多长时间。

```s
HTTP/1.1 200 OK
# 表示该响应在服务器端生成后已经过了3600秒（1小时）
Age: 3600
Content-Length: 1024
Content-Type: text/html
```

<br>

**使用场景: 计算响应的存活时间**   
代理服务器或缓存服务器可以使用 "Age" 头部的值来计算响应的存活时间，结合响应的 "Cache-Control" 头部或其他相关头部，以决定何时应该从缓存中移除响应或向服务器发起新的请求。

```s
HTTP/1.1 200 OK
Age: 1800
Cache-Control: max-age=3600
Content-Length: 2048
Content-Type: application/json
```

在这个示例中，"Age: 1800" 表示响应在服务器端生成后已经过了1800秒，而 "Cache-Control: max-age=3600" 指示响应的最大存活时间为3600秒（1小时）。

<br>

### **<font color='#C2185B'>ETag</font>**
它用于表示资源的实体标识（Entity Tag）。"ETag" 是服务器为每个资源生成的唯一标识符，通常是基于资源内容生成的哈希值或其他方式生成的字符串。

客户端可以使用 "ETag" 头部来验证资源是否发生了变化，从而实现缓存控制和条件请求。

<br>

**强 ETag 值:**  
强 ETag 值, 不论实体发生多少细微的变化都会改变其值。
```js
ETag: "usagi-1234"
```

<br>

**弱 ETag 值:**  
弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变, 产生差异时才会改变 ETag 值。这时, 会在字段值最开始处附加 W/ 。
```js
ETag: W/"usagi-1234"
```


<br>

### **<font color='#C2185B'>Location</font>**
它通常用于在HTTP重定向时指示客户端应该重定向到的URL。

当服务器接收到请求后，如果需要将客户端重定向到另一个URL，服务器会在响应中包含 "Location" 头部，告知客户端新的URL地址。

<br>

**使用场景: HTTP重定向**   
最常见的使用场景是在进行HTTP重定向时。当服务器处理请求后，如果需要将客户端引导到另一个URL，服务器会返回一个带有 "Location" 头部的响应，并设置状态码为 3xx（重定向状态码）。客户端会根据 "Location" 头部的值，自动发送新的请求到新的URL。

```s
HTTP/1.1 301 Moved Permanently
Location: https://new-domain.com/new-page
```

<br>

### **<font color='#C2185B'>WWW-Authenticate</font>**
用于指示客户端需要提供认证凭证（如用户名和密码）以访问受保护的资源。

当客户端尝试访问需要身份验证的资源时，服务器会返回一个带有 "WWW-Authenticate" 头部的 401 Unauthorized 响应，提示客户端提供有效的认证信息。

<br>

**使用场景: 基本认证**   
最常见的使用场景是基本认证（Basic Authentication）。在基本认证中，服务器返回的 "WWW-Authenticate" 头部会包含 "Basic" 字段，提示客户端使用用户名和密码进行认证。

客户端需要将用户名和密码进行Base64编码，然后添加到请求的 "Authorization" 头部中，以进行身份验证。

```s
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Restricted Area"
```

<br><br>

## 常见: 通用报文头 说明

### **<font color='#C2185B'>Cache-Control</font>**  
控制缓存的行为

缓存是一种将之前获取的资源副本存储在本地，以便在未来请求相同资源时可以避免重新从服务器获取的技术。  
"Cache-Control" 头部允许服务器和客户端指定如何缓存响应内容以及在何种情况下重新获取新内容。

<br>

**Cache-Control 指令（控制缓存行为）**  
- no-cache: 强制向源服务器再次验证, 表示缓存内容需要先经过服务器的验证，不能直接从缓存中提取，即使缓存中有内容也要向服务器验证是否仍然有效。

- no-store: 强制向源服务器再次验证, 表示缓存内容需要先经过服务器的验证，不能直接从缓存中提取，即使缓存中有内容也要向服务器验证是否仍然有效。

- max-age=3600: 指定缓存的最大时间，以秒为单位。客户端或代理服务器在此时间内可以使用缓存，而不需要再向服务器请求。
```s
# 表示资源可以在客户端缓存一个小时。
"Cache-Control: max-age=3600
```

- min-fresh=3600: 期望在指定时间内的响应仍有效。
- no-transform: 表示中间代理服务器不得修改响应内容的媒体类型或实体内容。
- only-if-cached: 只从缓存获取资源，不进行网络请求。
- cache-extension: 通过标记（token）扩展 Cache-Control 指令。

<br>

**缓存请求指令:**  
- no-cache: 强制向源服务器再次验证, 表示缓存内容需要先经过服务器的验证，不能直接从缓存中提取，即使缓存中有内容也要向服务器验证是否仍然有效。
- no-store: 表示不允许缓存响应内容，即不保存任何副本。每次都要从服务器请求。
- max-age=[seconds]: 指示缓存资源的有效期。
- min-fresh=[seconds]: 指示在一段时间内需要仍然有效的响应。
- no-transform: 表示中间代理服务器不得修改响应内容的媒体类型或实体内容。
- only-if-cached: 只使用缓存，不进行网络请求。
- cache-extension: 标记（token）用于扩展缓存指令。

<br>

**缓存的响应指令:**  
- public: 表示响应可以被任何缓存存储，包括客户端浏览器缓存和中间代理服务器缓存。**适用于公共资源，如图片、CSS文件等。**
- private: 表示响应只能被客户端浏览器缓存，不能被中间代理服务器缓存。**适用于私有资源，如用户个人信息页面。**
- no-cache: 强制向源服务器再次验证, 表示缓存内容需要先经过服务器的验证，不能直接从缓存中提取，即使缓存中有内容也要向服务器验证是否仍然有效。
- no-store: 表示不允许缓存响应内容，即不保存任何副本。每次都要从服务器请求。
- no-transform: 表示中间代理服务器不得修改响应内容的媒体类型或实体内容。
- must-revalidate: 代理必须验证缓存的响应有效性。
- max-age=[seconds]: 指示缓存资源的有效期。
- s-maxage=[seconds]: 对公共缓存服务器有效期的设置。
- cache-extension: 标记（token）用于扩展缓存指令。

<br>

**静态资源缓存:**  
假设服务器上有一个静态图片资源 "example.jpg"，服务器可以通过以下头部设置来指定该资源可以被缓存，并且在客户端缓存有效期内无需再次请求: 
```s
# 这表示该资源可以被中间代理服务器和客户端浏览器缓存，并且可以在一个小时（3600秒）内使用缓存内容。
Cache-Control: public, max-age=3600
```

<br>

**敏感数据页面:**  
对于包含用户个人信息的页面，服务器可以设置如下头部，确保该页面不会被缓存
```s
Cache-Control: no-store
```

<br>

**验证缓存内容:**  
如果服务器希望客户端在缓存过期后仍然向服务器验证资源是否有效，可以使用以下头部: 
```s
# 这将要求客户端在缓存过期后发送请求，以便服务器验证资源是否仍然有效。
Cache-Control: must-revalidate
```

<br>

**动态内容:**  
假设服务器上有一个动态生成的内容，不希望它被缓存，可以使用以下头部: 
```s
# 这将告诉客户端在使用缓存之前需要先向服务器验证内容是否仍然有效，即使缓存中有内容。
Cache-Control: no-cache
```

<br>

### **<font color='#C2185B'>Connection</font>**  
"Connection" 头部在HTTP协议中用于控制连接的行为和管理。它可以影响连接的建立、保持和关闭等方面。

<br>

```s
Connection: keep-live
```

当一个网页打开完成后, 客户端和服务器之间用于传输http数据的tcp连接不会关闭, 如果客户端再次访问这个服务器上的网页 会继续使用这一条已经建立的连接

<br>

```s
Connection: close
```

代表一个Request完成后 客户端和服务器之间用于传输HTTP数据的tcp连接会关闭, 当客户端再次发送请求的时候 需要重新建立 tcp连接

<br>

**可选值:**  
- close: 指示服务器在响应结束后关闭连接，不再重用该连接。客户端和服务器之间的连接会被显式地关闭。

- keep-alive: 指示服务器在响应结束后保持连接打开，以便后续请求可以继续在同一连接上进行。这是HTTP/1.1默认的行为。

- upgrade:  指示客户端希望将连接升级到另一个协议，如WebSocket协议。通常与 "Upgrade" 头部一起使用。

- HTTP/2: 指示客户端希望将连接升级到HTTP/2协议。通常与 "Upgrade" 头部一起使用。

- TE: 指示可以使用的传输编码，如 "TE: gzip, deflate" 表示客户端支持Gzip和Deflate压缩。

- trailers: 指示响应将包含尾部（trailers），尾部是在响应主体之后发送的额外元信息。

<br>

**使用场景: 持久连接管理**  
在HTTP/1.1中，默认情况下，连接是持久的，即一个连接可以用于多个请求和响应。

然而，通过在请求或响应中设置 "Connection: close" 头部，可以指示服务器或客户端在完成请求/响应后关闭连接，不再重用该连接。

这在某些情况下，比如短暂的资源请求，或者避免不必要的连接保持时是有用的。

<br>

**使用场景: 逐跳首部管理**  
"Connection" 头部也用于处理逐跳首部。逐跳首部是那些应该仅在单个传输链上进行跳转的HTTP首部，不应该被代理服务器修改或删除。

通过在 "Connection" 头部中列出这些逐跳首部，可以告知代理服务器不要对它们进行特殊处理。

<br>

**使用场景: 代理服务器**  
当请求经过代理服务器时，代理可以根据 "Connection" 头部来决定是否保持连接。

如果请求中包含 "Connection: keep-alive" 头部，代理服务器可能会尝试保持连接以供后续请求使用。相反，如果请求中包含 "Connection: close" 头部，代理服务器可能会关闭连接。

<br>

**使用场景: 跳转和重定向**  
"Connection" 头部还可以在跳转和重定向过程中使用。如果服务器发送了 "Connection: close" 头部，客户端和中间代理服务器可能会在跳转后关闭连接，然后重新建立连接以获取新位置的资源。

<br>

**使用场景: 连接管理**  
"Connection" 头部可以用于表达一些自定义的连接管理行为，尽管这些不是标准的HTTP行为，但有时可以用于实现一些特殊的通信需求。

<br>

### **<font color='#C2185B'>Date</font>**  
"Date" 头部在HTTP协议中用于指示响应或请求的创建时间，即报文生成的日期和时间。

它有助于确立报文的时间戳，从而帮助客户端和服务器在处理缓存、验证、时间同步等方面进行正确的决策。

<br>

**格式:**  
1. RFC1123格式: HTTP/1.1版本使用在RFC1123中规范的日期时间的格式, 如下示例: 
```s
Date: Tue, 03 Jul 2012 04:40:59 GMT
```

2. RFC850格式: 之前的HTTP协议版本中使用在RFC850中定义的格式
```s
Date: Tue, 03-Jul-12 04:40:59 GMT
```

<br>

**使用场景: 缓存控制**  
在响应中，"Date" 头部指示了服务器生成响应的时间，与其他缓存控制头部（如 "Cache-Control" 和 "Expires"）一起，帮助客户端判断缓存的有效性。

客户端可以通过比较响应的 "Date" 头部和当前时间来判断缓存是否过期。

<br>

**使用场景: 资源验证**  
在条件请求中，客户端可以使用 "If-Modified-Since" 头部，将之前获取资源的 "Date" 头部值发送回服务器，以便服务器验证资源是否在该日期之后被修改。

如果资源未经修改，则服务器可以返回 304 Not Modified 响应，从而节省带宽和处理时间。

<br>

比如, 客户端请求一个资源，服务器在响应中包含 "Date" 头部来指示响应创建的时间。客户端可以将这个时间作为 "If-Modified-Since" 头部的值，将它发送回服务器

服务器可以通过比较客户端发送的 "If-Modified-Since" 头部值和资源的 "Date" 头部值，来判断资源是否在指定时间之后被修改。如果资源未被修改，服务器可以返回 304 Not Modified 响应，客户端可以使用缓存内容。
```s
GET /example.jpg HTTP/1.1
Host: example.com
If-Modified-Since: Tue, 01 Aug 2023 12:00:00 GMT
```

<br>

**使用场景: 时间同步**  
"Date" 头部可以帮助客户端和服务器进行时间同步。
 
虽然 HTTP 请求和响应本身不是用于高精度时间同步的机制，但 "Date" 头部可以用来检查客户端和服务器之间的时间差异。

<br>

**使用场景: 日志记录**  
在服务器记录请求和响应时，"Date" 头部可以用于标记生成报文的时间，有助于日志分析和排查问题。

<br>

**使用场景: 安全性**  
"Date" 头部可以用于加强安全性，防止一些时间相关的攻击，比如重放攻击。

<br>

### **<font color='#C2185B'>Pragma</font>**  
是一种用于控制缓存行为的HTTP头部，尽管在现代的HTTP/1.1中，大部分缓存控制是通过 "Cache-Control" 头部进行管理，但 "Pragma" 头部仍然存在并有一些使用场景。

"Pragma" 头部通常用于控制 HTTP 1.0 及之前版本的缓存行为，因为在这些版本中，"Cache-Control" 头部并不是标准的头部。

<br>

### **<font color='#C2185B'>Trailer</font>**  
它用于指示在响应主体之后会包含响应的尾部（trailer）。尾部是在主体之后、响应结束之前发送的附加元信息。

尾部可以包含一些不会影响响应主体解析的附加信息，比如数字签名、摘要等。

假设服务器要发送一个响应，其中包含一个响应主体和一个数字签名作为尾部。服务器可以这样设置响应头部: 

```s
HTTP/1.1 200 OK
Content-Type: application/json
Trailer: Digital-Signature

{"message": "Hello, world!"}
Digital-Signature: abcdef1234567890
```

<br>

### **<font color='#C2185B'>Transfer-Encoding</font>** 
它用于指示在传输响应主体时所使用的传输编码方式。

传输编码是一种将响应主体转换为适合传输的形式的技术，常用于支持压缩或分块传输等功能。

<br>

**使用场景: 分块传输**  
在响应主体较大且无法一次性传输完毕时，可以使用分块传输（Chunked Transfer-Encoding）来将主体分割成多个块，并逐块传输。

这可以在服务器仍在生成响应主体的同时，逐步将内容发送给客户端，而无需等待整个主体生成完毕。

```s
HTTP/1.1 200 OK
Content-Type: text/html
Transfer-Encoding: chunked

25
This is the first chunk.
1A
This is the second chunk.
0

# 在上述示例中，响应主体被分成两个块进行传输，每个块前面都有一个块大小的十六进制表示。
``` 

<br>

**使用场景: 压缩传输**   
通过在 "Transfer-Encoding" 头部中设置 "gzip" 或 "deflate"，服务器可以指示客户端使用Gzip或Deflate压缩算法来压缩响应主体。这有助于减小传输的数据量，提高性能。

```s
HTTP/1.1 200 OK
Content-Type: text/html
Transfer-Encoding: gzip
```

<br>

**使用场景: 无需传输编码**   
如果不需要对响应主体使用任何传输编码，可以将 "Transfer-Encoding" 头部设置为 "identity"。

```s
HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: identity
```

<br>

### **<font color='#C2185B'>Upgrade</font>**  
"Upgrade" 头部在HTTP协议中用于指示客户端和服务器之间切换到其他协议的意图。

它通常在协议升级或协议切换的场景下使用，允许客户端和服务器从一个协议切换到另一个协议，以便实现更高级别的功能或进行特定类型的通信。

<br>

**使用场景: WebSocket 协议升级**   
WebSocket 是一种在单个TCP连接上实现全双工通信的协议。在初始的HTTP请求中，可以使用 "Upgrade" 头部来请求服务器切换到WebSocket协议。服务器可以接受请求并响应切换，从而在同一个连接上实现低延迟的双向通信。

```s
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
```

<br>

**使用场景: TLS/SSL 连接建立**   
虽然现在大部分网站都使用TLS/SSL来保护通信安全，但在早期的HTTP版本中，可以使用 "Upgrade" 头部来指示从普通HTTP连接升级到加密的TLS/SSL连接，以实现加密通信。

```s
GET /secure HTTP/1.1
Host: example.com
Upgrade: TLS/1.0
Connection: Upgrade
```

<br>

### **<font color='#C2185B'>Via</font>**  
显示了报文经过的中间节点(代理、网关)  

代理服务器的相关信息, 为了追踪客户端与服务器之间的请求和响应报文的传输路径。

报文经过代理或网关时, 会先在首部字段 Via 中附加该服务器的信息, 然后再进行转发。这个做法和 traceroute 及电子邮件的 Received 首部的工作机制很类似。
首部字段 Via 不仅用于追踪报文的转发, 还可以避免请求回环的发生。所有必须在经过代理时附加该首部字段内容。

上图用例中, 在经过代理服务器 A 时, Via 首部附加了 "1.0 gw.example.com(Squid/3.1)"这样的字符串值。行头的1.0是指接受请求的服务器上应用的HTTP版本协议。接下来经过, 若果存在更多的代理服务器亦是如此, 在 Via 首部附加服务器信息, 也可增加 1 个新的 Via 首部写入服务器信息。

Via 首部是为了追踪传输路径, 所以经常会和 TRACE 方法一起使用。比如, 代理服务器接受到由 TRACE 方法发送过来的请求(其中 Max-Forwards: 0)时, 代理服务器就不能再转发该请求了。这种情况下, 代理服务器会将自身的信息附加到 Via 首部后, 返回该请求的响应。

<br>

### **<font color='#C2185B'>Warning</font>**  
错误通知

HTTP/1.1 的 warning 首部是从 HTTP/1.0 的响应首部(Retry-After)演变过来。该首部通常会告知用户一些与缓存相关的的问题的警告。
Warning 首部的格式如下。最后的日期时间部分可省略。

```s
Warning: [警告码] [警告的主机 : 端口号] "[警告内容]" ([日期时间])
```

HTTP/1.1 中定义了7种警告。警告码对应的警告内容仅推荐参考。另外, 警告码具有扩展性, 今后有可能追加新的警告码。

<br>

**警告码:**  
- 110: Response is stale (响应已过期) 代理返回已过期的资源
- 111: Revalidation failed (再验证失败) 代理再验证资源有效性时失败(服务器无法到达等原因)
- 112: Disconnection operation (断开连接操作) 代理与互联网连接被故意切断
- 113: Heuristic expiration (试探性过期) 响应的使用期超过24小时(有效缓存的设定时间大于24小时的情况下)
- 199: Miscellaneous warning (杂项警告) 任意警告内容
- 214: Transformation applied(使用了转换) 代理对内容编码或媒体类型等执行了某些处理时
- 299: Miscellaneous persistent warning(持久杂项警告) 任意的警告内容

<br><br>

## 常见: 实体报文头 说明

### **<font color='#C2185B'>Allow</font>**  
用于指示服务器对于指定的URL路径支持的HTTP请求方法。它通常在对某个资源的请求中返回，以告知客户端可以使用哪些请求方法进行操作。

首部字段 Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。 当服务器接收到不支持的 HTTP 方法时, 会以状态码 405 Method Not Allowed 作为响应返回。与此同时, 还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。

<br>

**使用场景:**  
- 当客户端发出OPTIONS请求，询问服务器对于某个资源允许的请求方法。
- 当客户端尝试使用不被允许的请求方法访问资源时，服务器可以返回一个带有 "Allow" 头部的响应，指示可以使用哪些允许的请求方法。

假设我们有一个资源 https://example.com/api/resource, 并且服务器允许使用 GET、POST 和 PUT 方法来访问它。当客户端发送一个 OPTIONS 请求时，服务器可以返回如下的响应：

<br>

```s
HTTP/1.1 200 OK
Allow: GET, POST, PUT
```

<br>

### **<font color='#C2185B'>Content-Type</font>**  
用于指示发送或接收的实体主体（如请求体或响应体）的媒体类型（Media Type）。

媒体类型描述了实体主体的内容类型，可以是文本、图像、音频、视频等不同类型的数据。

<br>

说明了报文体内对象的媒体类型
- text/html: HTML格式
- text/plain: 纯文本格式
- text/xml: XML格式
- image/gif: gif图片格式
- image/jpeg: jpeg图片格式
- image/png: png图片格式

- application/xhtml+xml: XHTML格式
- application/xml: XML数据格式
- application/atom+xml: Atom XML聚合格式
- application/json: json数据格式
- application/pdf: pdf格式
- application/msword: word文档格式
- application/octet-stream: 二进制流数据 (常见文件下载)
- application/x-www-urlencoded: 表单提交


<br>

**常用的媒体类型:**  

**文本文件类型:**
- text/html
- text/plain
- text/css
- appllication/xhtml+xml
- application/xml

<br>

**图片文件类型:**
- image/jpeg
- image/gif
- image/png

<br>

**视频文件类型:**
- video/mpeg
- video/quicktime

<br>

**应用程序使用的二进制文件:**
- application/octet-strea
- application/zip


<br>

**使用场景: 指定请求体的媒体类型**
```s
POST /submit-data HTTP/1.1
Host: example.com
Content-Type: application/json

{"key": "value"}
```

客户端可以使用 "Content-Type" 头部来指定请求体的媒体类型。这对于向服务器发送数据，例如提交表单、上传文件等情况非常重要，因为服务器需要了解数据的类型以正确处理它。

<br>

**使用场景: 下载文件**  
"Content-Type" 头部也可以用于指示响应体中的数据是文件下载，这通常与 "Content-Disposition" 头部一起使用，用于告知浏览器将响应保存为文件。

```s
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"
Content-Length: 2048

... (PDF data)
```

<br>

### **<font color='#C2185B'>Content-Disposition</font>**  
**用于告诉客户端 收到数据后怎么处理**

**可选值:**  
- inline: 默认值, 表示响应中的消息体会以页面的一部分或者整个页面的形式展示。

- attachment: 表示响应的消息体应被下载到本地；大多数浏览器会出现一个“保存为”的对话框。

Content-Disposition: "attachment; filename="

- attachment: 表示下载使用
- filename="文件名" 指定下载文件的文件名

```js
// 正常解析渲染
Content-Disposition: inline
// 下载文件
Content-Disposition: attachment
// 下载文件, 并将文件保存为filename.jpg
Content-Disposition: attachment; filename="filename.jpg"
```

<br>

Content-disposition是MIME协议的扩展  
MIME协议指示MIME用户代理如何显示附加的文件。

当Internet Explorer接收到头时, 他会激活文件下载对话框, 它的文件名框自动填充headers指定的文件名。

服务器向浏览器发送文件时, 如果是浏览器支持的文件类型, 一般会默认使用浏览器打开, 比如txt、jpg等。如果需要提示用户保存, 就要利用Content-Disposition进行处理, (敲黑板, 划重点)关键在于一定要加上attachment [附件] [əˈtætʃmənt]

这样的话, 浏览器在打开的时候回提示保存还是打开, 即使选择打开, 也会使用相关联的程序, 比如记事本打开, 而不是IE直接打开。

<br>

### **<font color='#C2185B'>Content-Location</font>**  
用于指示返回的响应实体的位置。

它表示资源的另一个位置，通常与"Location"头部不同，后者通常用于重定向。"Content-Location"头部通常用于指示响应体的实际位置，尤其在内容协商、缓存控制以及表示同一资源在多个位置的情况下。

<br>

**使用场景: 内容协商**   
在内容协商过程中，服务器根据客户端请求的特性（如语言、媒体类型等）选择最适合的资源返回。

如果服务器返回的资源与请求的特性不完全匹配，但是仍然相关，可以使用 "Content-Location" 头部指示服务器返回的资源的实际位置。

<br>

```s
HTTP/1.1 200 OK
Content-Location: /alternative-resource
Content-Type: text/html
Content-Length: 1024

<!DOCTYPE html>
<html>
<head>
  <title>Alternative Resource</title>
</head>
<body>
  <h1>This is an alternative version.</h1>
</body>
</html>
```

<br>

**使用场景: 缓存控制和重定向**  
有时，服务器可能会使用 "Content-Location" 头部来指示响应体的位置，以便在资源发生变化时对缓存进行控制。这可以避免由于 "Location" 头部的重定向而影响缓存。

```s
HTTP/1.1 200 OK
Content-Location: /resource/version-2
Content-Type: text/html
Content-Length: 1024
```

<br>

### **<font color='#C2185B'>Content-MD5</font>**  

<br>

### **<font color='#C2185B'>Content-Range</font>**  
用于指示响应实体中返回的内容的范围。

通常在HTTP响应中，特别是支持范围请求（Range Requests）的情况下使用。范围请求允许客户端请求资源的部分内容，而不是整个资源。

<br>

**使用场景: 范围请求响应**  
客户端发送范围请求时，服务器可以在响应中使用 "Content-Range" 头部来指示返回的内容的范围。这有助于客户端了解响应中包含的实际内容。

在这个示例中，服务器返回了一个部分内容的响应，"Content-Range: bytes 1000-1999/5000" 表示返回的是文件的第1000字节到第1999字节的内容，总共文件大小为5000字节。

```s
HTTP/1.1 206 Partial Content
Content-Range: bytes 1000-1999/5000
Content-Length: 1000
Content-Type: application/octet-stream

... (partial content data)
```

<br>

**使用场景: 多部分范围请求**  
"Content-Range" 头部还可以在多部分范围请求的情况下使用，这是一种请求多个范围的机制。

```s
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=boundary-example

--boundary-example
Content-Type: application/octet-stream
Content-Range: bytes 1000-1999/5000

... (partial content data)

--boundary-example
Content-Type: application/octet-stream
Content-Range: bytes 3000-3999/5000

... (another partial content data)

--boundary-example--
```

在这个示例中，服务器返回了两部分范围请求的响应，每部分都包含了相应的 "Content-Range" 头部。

<br>

### **<font color='#C2185B'>Expires</font>**  
用于指示资源的过期时间。它告知客户端从服务器获取资源后，该资源将在何时过期。

客户端可以在接下来的请求中使用缓存的资源，直到资源过期为止。

<br>

**使用场景: 缓存控制**  
"Expires" 头部可以用于控制缓存的资源在客户端的有效期。客户端在接收到资源后，可以在过期时间之前继续使用缓存的资源，而无需向服务器发起新的请求。这可以减轻服务器负担，提高性能。

```s
HTTP/1.1 200 OK
Expires: Fri, 31 Dec 2023 23:59:59 GMT
Cache-Control: max-age=3600
Content-Length: 1024
Content-Type: text/html
```

在这个示例中，"Expires" 头部告知客户端，该资源将在 2023 年 12 月 31 日 23:59:59 GMT 过期。客户端可以在过期前使用缓存的资源。

<br>

**使用场景: 过期时间计算**  
"Expires" 头部的值是一个具体的日期和时间，表示资源的过期时间。客户端和代理服务器可以根据这个时间来判断资源是否仍然有效。

```s
HTTP/1.1 200 OK
Expires: Wed, 15 Sep 2023 18:00:00 GMT
Content-Length: 2048
Content-Type: image/jpeg
```

在这个示例中，"Expires" 头部指示资源将在 2023 年 9 月 15 日 18:00:00 GMT 过期。

<br>

### **<font color='#C2185B'>Last-Modified</font>**  
用于指示服务器上资源的最后修改时间。

它在缓存控制和条件请求中扮演重要角色，帮助客户端和代理服务器判断资源是否已经改变。

<br>

**使用场景: 缓存控制**  
客户端和代理服务器可以使用 "Last-Modified" 头部来判断资源是否已经过期。当客户端首次请求资源时，服务器会将资源的最后修改时间作为 "Last-Modified" 头部的值返回。

客户端在接下来的请求中可以将这个值包含在 "If-Modified-Since" 头部中，从而实现条件请求。如果资源的修改时间没有变化，服务器会返回 304 Not Modified 响应，让客户端继续使用缓存的资源。

```s
HTTP/1.1 200 OK
Last-Modified: Wed, 10 Aug 2022 15:30:00 GMT
Content-Length: 1024
Content-Type: text/html
```

在这个示例中，"Last-Modified" 头部表示资源的最后修改时间为 2022 年 8 月 10 日 15:30:00 GMT。

<br><br>

# HTTP请求方法
http1.1版本中 常用的方法

1. get
2. post
3. put
4. head
5. delete
6. options
7. trace
8. connect

<br>

## Get方法
用于获取请求中由Uri标识的资源的信息, 它是默认的HTTP请求方法

我们在浏览器中地址栏里直接输入网址的方式访问网页的时候 浏览器使用的就是get方法从服务器获取资源

<br>

### Get方法: 特点
1. 没有请求体
2. 请求参数附着在URL地址后面
3. 请求参数在浏览器地址栏能够直接被看到, 存在安全隐患
4. 在URL地址后面携带请求参数, 数据容量非常有限。如果数据量大, 那么超出容量的数据会丢失
5. 从报文角度分析, 请求参数是在请求行中携带的, 因为访问地址在请求行

<br>

### Get方法: 获取资源
我们可以使用get方法来提交表单数据, 但是由get方法提交的表单数据 只是经过编码 同时它将作为url的一部分 向服务器端进行发送, 由于做为url的一部分 所以我们能从url上很清晰的辨认出提交的数据内容

```s
http://localhost/login?username=sam&password=123456
```

再因为我们的表单数据是作为url的一部分, 所以我们提交的数据量不能过大 因为浏览器通过会对url长度有限制

- IE: 能支持 2803
- 谷歌: 能支持 8182
- 火狐: 能支持 65536
- safari: 能支持 80000
- opera: 能支持 190000 

总的来说有两点
1. 提交数据的长度 有限制
2. 提交数据的安全 有问题

<br><br>

## Post方法: 创建资源
Post方法和Get功能类似, 一般用来传输实体的主体, 它的目的并不是获取响应内容 而是做提交请求

它可以代替get向服务器提交大量的表单数据, Post提交的数据会存放在请求体中 Post克服了get提交的数据无法保密 和 提交的数据量太小的确定

出于安全的考虑和对客户隐私的尊重 表单提交的时候使用的就是Post方法

<br>

### Post方法: 特点
1. 有请求体
2. 请求参数放在请求体中
3. 请求体发送数据的空间没有限制
4. 可以发送各种不同类型的数据
5. 从报文角度分析, 请求参数是在请求体中携带的
6. 由于请求参数是放在请求体中, 所以浏览器地址栏看不到

<br>

### Get容易被拦截 Post请求不容被拦截??
无论是get还是post都可以被拦截到

如果我们是在网吧 或者 公共图书馆的话, 别人可以很轻松的通过历史记录 拿到我们很多的信息

<br><br>

## Put方法: 更新资源
put方法 和 post方法的使用基础上是相同的 都是用来提交参数的

<br>

### Post和Put的不同: 幂等性
最大的不同就是 **Put是幂等的** 而Post不是幂等的, 幂等性体现在我们在什么场景下使用 post 什么场景下使用 put

<br>

**Put方法:**  
PUT方法用于更新或创建一个指定资源的表示。
- 如果资源已经存在，PUT会更新资源
- 如果资源不存在，PUT会创建一个新的资源

PUT方法是幂等的。这意味着多次执行同一个PUT请求，结果应该与执行一次PUT请求的结果相同。无论执行多少次PUT请求，资源的状态应该是一致的。

<br>

**Post方法:**  
POST方法用于向指定的资源提交数据，通常用于创建新资源。

每次使用POST提交数据，服务器会创建一个新的资源，且每个请求都可能生成不同的结果。

POST方法通常不是幂等的。多次执行相同的POST请求可能会导致创建多个相同的资源，因此不能保证结果的一致性。

<br>

### 扩展: 幂等性:
描述同一个操作被执行多次，结果应该保持一致。**简而言之，无论对同一资源执行多少次操作，结果都应该是一样的。**

这对于网络请求和数据操作特别重要，因为在分布式系统中，请求可能会被重复发送，而幂等性能够确保不会因此产生错误或不一致的结果。

<br>

### 注意:
Put方法在HTTP1.1中不带有验证机制 它是存在一定的安全性问题的 所以一般的网站不使用Put的方法

在HTTP/1.1中，PUT方法确实没有内置的验证机制，这意味着任何具有访问权限的客户端都可以使用PUT方法来修改服务器上的资源，而无需进一步的验证。

这个特性可能会引发安全性问题，因为如果没有适当的控制和验证机制，恶意用户可能会滥用PUT方法来修改或破坏资源，从而造成损害。因此，一些网站和服务在实现时可能会选择不使用PUT方法，或者会对PUT方法进行严格的访问控制和验证。

相反，其他HTTP方法如POST、GET和DELETE在HTTP/1.1中通常会具有更多的安全性控制，或者可以通过其他机制来实现授权和验证，从而减少潜在的安全风险。

需要注意的是，虽然HTTP/1.1中的PUT方法可能存在一些安全性问题，但这并不意味着它完全不能使用。在实际应用中，可以通过合适的认证和授权机制，以及其他安全性措施，来使用PUT方法并确保资源的安全性。在HTTP/2和更高版本中，一些安全性问题也得到了改进和加强。

<br>

### 扩展: 验证机制
在HTTP中，对于PUT方法或其他需要进行资源修改的方法，通常需要使用一种验证机制来确保只有经过授权的用户才能进行操作。

这种验证机制可以通过各种方式来实现，以下是一些常见的验证机制示例：

<br>

**1. 基本认证（Basic Authentication）**  
这是一种简单的身份验证方法，客户端将用户名和密码进行Base64编码后发送给服务器。

服务器接收后解码并验证，如果匹配则授权。然而，基本认证的主要问题是，用户名和密码在网络上以明文形式传输，可能容易被拦截和窃取，因此并不是最安全的方式。

<br>

**2. 摘要认证（Digest Authentication）**  
摘要认证也是一种HTTP认证机制，但它对用户名和密码进行了更复杂的处理，包括使用哈希函数和随机数，从而在网络传输中提供一定的安全性。尽管相对安全，但仍然有一些弱点，比如仍然可能受到中间人攻击。

<br>

**3. OAuth**  
OAuth是一种授权框架，允许用户向第三方应用授权访问其资源，而无需将其凭据直接提供给第三方。OAuth提供了更为灵活的授权和访问令牌机制，允许资源所有者授予对其资源的有限访问权。

<br>

**4. Token认证**  
这是一种常见的现代验证机制，通过颁发令牌（token）给经过身份验证的用户，用户在每次请求中携带这个令牌来证明身份和权限。令牌可以包括许多信息，如用户ID、权限等，通常使用加密和签名来保护其安全性。


**5. 使用SSL/TLS**  
通过使用安全套接层（SSL）或传输层安全性（TLS）协议，可以在客户端和服务器之间建立加密通信通道，从而确保请求和响应在传输过程中的保密性和完整性。这可以防止信息在传输过程中被拦截或篡改。

<br><br>

## Head方法: 测试超链接的有效性
类似Get请求 只不过返回的响应中没有具体的内容 用于获取报头, 也就是说它只是请求消息的报文头, **因为Head请求返回的头部信息和Get请求返回的头部信息是一样的**

<br>

所以该访问经常用于测试一个链接是否能够正常的被访问 以及最近是不是有更新 

网上有很多超链接探测工具 很多都是基于Head方法 实现的

<br><br>

## Delete方法
它是跟Put相反的方法 它是根据请求的uri删除指定的资源

<br>

### 注意:
Delete方法和Put方法一样没有验证机制 所以一般的Web网站也不使用Delete方法

<br><br>

## Options方法: 查询服务器支持什么请求方法
用来查询针对请求URI指定的资源 支持的方法

使用在不知道目标服务器支持什么样的方法 进行询问

```s
# 他自己起了一个服务器 使用Options来询问服务器 所支持的方法

curl -X OPTIONS http://localhost:8080 -i

# 返回
HTTP/1.1 200
Allow: GET, HEAD, POST, PUT, DELETE, OPTIONS
...
```

<br><br>

## TRACE方法: 应该被禁用此方法
回显服务器收到的请求, 主要用于测试 或 诊断

客户端可以通过trace方法查询发送出去的(服务器收到的)请求, 该请求到底怎么样被加工修改 或 篡改的

因为请求想要链接到目标服务器的时候 可能会通过代理中转 trace方法就是用来确认链接过程中 发生的一系列的操作 看看中转的过程 **但是不常用**

### 注意:
Trace方法容易引发XST攻击, 为了防止XST攻击，**常见的做法是禁用或限制TRACE请求方法**。大多数现代Web服务器都会默认禁用TRACE方法，以减少这种攻击的风险。

<br>

### 扩展: XST
是一种基于跨站点脚本（XSS）和TRACE请求方法的攻击。

TRACE请求方法通常用于诊断和调试，它允许客户端向服务器发送请求，并在响应中返回请求的原始内容。然而，TRACE请求的响应内容在现实中往往没有太多的用途，因此很少会被使用。

XST攻击利用了TRACE请求的特性，结合了跨站点脚本（XSS）攻击的概念。攻击者可以通过在用户的浏览器中插入恶意脚本，使浏览器发送TRACE请求到目标网站。

由于TRACE请求会在响应中返回请求的内容，恶意脚本可以通过读取TRACE请求的响应内容，从而获取敏感信息，例如用户的cookie、认证凭据等。

<br><br>

## CONNECT方法:
开启一个客户端与请求资源之间的双向沟通的通道 它可以用来创建隧道

不常用, 在网页中更是如此

在使用HTTP代理的时候 我们在使用代理服务器访问互联网的时候就是使用CONNECT方法 比如我们要通过HTTP代理访问FaceBook

1. 首先浏览器会向代理服务器发送 Connect请求
2. 代理服务器返回HTTP200
3. 之后浏览器和服务器开始握手交换数据 代理服务器只负责传输彼此的数据包 并不能读取具体的数据内容

<br><br>

# 状态码
**每条 HTTP 响应报文返回时都会携带一个状态码。**

状态码是一个三位数字的代码, 告知客户端请求是否成功, 或者是否需要采取其他动作

- 200 OK 文档正确返回
- 302 Redirect(重定向)。到其他地方去获取资源
- 404 Not Found(没找到)。无法找到这个资源

<br>

状态码为http响应报文中 第一行里面的3个数字, 它表示网页传输响应状态最终的结果

```s
2 0 0
```

<br><br>

## 状态码: 五种状态
状态码中第一位数字, 是作为分类, 表示5种响应状态其中的一种, 五种状态分别是:

- 100 ～ 199  100 ～ 101 信息提示
- 200 ～ 299  200 ～ 206 成功
- 300 ～ 399  300 ～ 305 重定向
- 400 ～ 499  400 ～ 415 客户端错误
- 500 ～ 599  500 ～ 505 服务器错误

<br>

### 1XX: 表示消息
这一类型的状态码 **代表请求已经被接受, 需要继续处理** 这类响应是临时响应  
**只包含状态和某些可选的响应头信息 并以空行结束**

<br>

### 2XX: 表示成功
这一类型的状态码 代表请求已成功被服务器接收 理解 并接受

<br>

### 200场景: 
我们点击登录按钮 进行登录 **密码错误的情况下 http 响应仍然是200** 200 OK 是说请求成功接受并处理了 

并不表示登录成功失败 **200并不表示具体的业务 只是针对请求是否处理完了**

<br>

### 3XX: 表示重定向
这类状态码代表需要客户端采取进一步的操作才能完成请求  
通常这些状态码用来重定向后续的请求地址(重定向目标) 在本次响应的location域中指明

重定向状态码要么告知客户端使用替代位置来访问他们所感兴趣的资源, 要么就提供一个替代的响应而不是资源的内容。

如果资源已被移动, *可发送一个重定向状态码和一个可选的Location 首部来告知客户端资源已被移走*, 以及现在可以在哪里找到它

浏览器就可以在不打扰使用者的情况下, 透明地转入新的位置了。

<br>

### 4XX: 表示请求错误
**这类的状态码代表了客户端看起来可能发生的错误 妨碍了服务器的处理**

除非响应的是一个HEAD请求 否则服务器就应该返回一个解释当前错误状况的实体 以及这是临时的还是永久性的状态 这些状态码适用于任何请求方法, 浏览器应当向用户显示任何包含在此类错误响应中的实体内容

有时客户端会发送一些服务器无法处理的东西
比如格式错误的请求报文, 或者最常见的是, 请求一个不存在的URL。

浏览网页时, 我们都看到过臭名昭著的404 Not Found 错误码——这只是服务器在告诉我们, 它对我们请求的资源一无所知。

<br>

### 5XX: 表示服务器错误
这类状态码达标了服务器在处理请求的过程中有错误或者异常状态发生

也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理

除非响应的是一个HEAD请求 否则服务器就应该返回一个解释当前错误状况的实体 以及这是临时的还是永久性的状态 这些状态码适用于任何请求方法, 浏览器应当向用户显示任何包含在此类错误响应中的实体内容

有时客户端发送了一条有效请求, 服务器自身却出错了。这可能是客户端碰上了服务器的缺陷, 或者服务器上的子元素, 比如某个网关资源, 出了错

代理尝试着代表客户端与服务器进行交流时, 经常会出现问题。

<br>



<br><br>

## 常用状态码:

### 100 Continue
客户端应当继续发送请求

说明收到了请求的初始部分, 请客户端继续。**发送了这个状态码之后, 服务器在收到请求之后必须进行响应。**

<br>

### 101 Switching Protocols
服务器已经理解了客户端的请求, 并将通过Upgrade 消息头通知客户端采用不同的协议来完成这个请求

说明服务器正在根据客户端的指定, 将协议切换成Upgrade 首部所列的协议

<br>

### 102 Processing
由WebDAV(RFC 2518)扩展的状态码, 代表处理将被继续执行

<br>

### 200 OK
从客户端发来的请求在服务端正常处理 请求没问题, 实体的主体部分包含了所请求的资源

<br>

### 201 Created
用于创建服务器对象的请求(比如, PUT)。

响应的实体主体部分中应该包含各种引用了已创建的资源的URL, Location 首部包含的则是最具体的引用。

**服务器必须在发送这个状态码之前创建好对象**

<br>

### 202 Accepted
请求已被接受, 但服务器还未对其执行任何动作 (未处理完成)。

不能保证服务器会完成这个请求; 这只是意味着接受请求时, 它看起来是有效的。

服务器应该在实体的主体部分包含对请求状态的描述, 或许还应该有对请求完成时间的估计(或者包含一个指针, 指向可以获取此信息的位置)

<br>

### 203 Non-Author i tat iveInformation
实体首部

包含的信息不是来自于源端服务器, 而是来自资源的一份副本。如果中间节点上有一份资源副本, 但无法或者没有对它所发送的与资源有关的元信息(首部)进行验证, 就会出现这种情况。

这种响应码并不是非用不可的; 如果实体首部来自源端服务器, 响应200 状态的应用程序就可以将其作为一种可选项使用

<br>

### 204 No Content
服务端接收的请求已成功处理, 但在返回的响应报文中不含实体的主体部分, 另外也不允许返回任何实体的主体

主要用于在浏览器不转为显示新文档的情况下, 对其进行更新(比如刷新一个表单页面)

<br>

### 205 Reset Content
另一个主要用于浏览器的代码。负责告知浏览器清除当前页面中的所有HTML 表单元素

<br>

### 206 Partial Content
客户端只想向服务器请求部分资源, 这时请求头中会加上 Range头 来表明我们要请求哪一部分, 比如断点续传, 这时我们接着上一次的位置继续下载的时候 服务器响应回的就是206

客户端进行了范围请求, 而服务器成功执行了这部分请求, 响应报文中包含由Content—Range 指定的范围的实体内容

<br>

**206 响应中必须包含:**
- Content-Range
- Date
- ETag 或 Content-Location 首部

<br>

### 300 Multiple Choices
客户端请求一个实际指向多个资源的URL 时会返回这个状态码
比如服务器上有某个HTML 文档的英语和法语版本。返回这个代码时会带有一个选项列表; 这样用户就可以选择他希望使用的那一项了。有多个版本可用时, 客户端需要沟通解决

<br>

### 301 Moved Permanently	
永久性重定向

请求的资源已被永久的移动到新的URI, 返回信息会包括新的URI, 浏览器会自动定向到新URI, 今后任何新的请求都应使用新的URI代替

响应的 **Location首部** 中应该包含资源现在所处的URL

比如 域名换了 到期了 

<br>

### 302 Found
临时性重定向

与301 状态码类似; 但资源只是临时被移动, 客户端应继续使用原有的URI  
客户端应该使用Location首部给出的URL 来临时定位资源。将来的请求仍应使用老的URL

比如登录的时候 点击登录按钮 如果校验成功跳转到首页 这时候使用的就是302, 虽然是重定向但是是临时过去的 客户端后续的请求还是原来的url

<br>

### 303 See Other
由于对应的资源存在着另一个uri, 应使用GET方法定向获取请求的资源 告知客户端应该用另一个URL 来获取资源。

新的URL 位于响应报文的Location 首部。其主要目的是允许POST 请求的响应将客户端定向到某个资源上去

<br>

### 304 Not Modified
该响应码和缓存管理有关, http缓存中如果发现有某些资源已经被缓存 并且没有被修改 这时候服务器会返回304 告诉浏览器使用本地缓存的内容就好了

<br>

这时候我们再查看 响应体 会发现什么也m没有

**304: 比如请求到了服务器 服务器说去找本地缓存去 服务器不会返回任何内容**

<br>

### 305 Use Proxy
用来说明必须通过一个代理来访问资源

代理的位置由Location首部给出。很重要的一点是, 客户端是相对某个特定资源来解析这条响应的, 不能假定所有请求, 甚至所有对持有所请求资源的服务器的请求都通过这个代理进行。如果客户端错误地让代理介入了某条请求, 可能会引发破坏性的行为, 而且会造成安全漏洞

<br>

### 307 Tempoeary Redirect
临时重定向, 和302很相似, 但是会根据游览器不同导致出现不同问题

与301 状态码类似; 但客户端应该使用Location 首部给出的URL来临时定位资源。将来的请求应该使用老的URL

**注意:**  
当301、302、303响应状态码返回时, 几乎所有的游览器都会把POST改为GET, 并删除请求报文内的主体, 之后请求会自动再次发送

301、302标准是禁止将POST改为GET方法, 但实际使用时都会改变

<br>

304的请求附加条件是指采用GET方法的请求报文中包含
- If-Match、
- If-Modified-Since、
- IF-None-Match、IF-Rang
- If-Unmodified-Since中的任一首部

<br>

### 400 Bad Request
**请求报文中存在语法错误** 服务器无法理解

浏览器会像200 OK 一样对待该状态码, 用于告知客户端它发送了一个错误的请求

请求参数问题

<br>

### 401 Unauthorized 未经许可的
请求要求用户的身份认证

发送的请求需要通过http认证(BASIC认证、DIGEST认证)的认证信息, 如果前面已经请求过一次, 证明认证失败

<br>

### 403 Forbidden
**没有权限**

服务器理解请求客户端的请求 但是拒绝执行此请求

请求资源存在 但是访问被服务器拒绝 如果服务器想说明为什么拒绝请求, 可以包含实体的主体部分来对原因进行描述。但这个状态码通常是在服务器不想说明拒绝原因的时候使用的

<br>

### 404 Not Found
服务器无法找到请求的资源

<br>

### 405 Method Not Allowed
请求方式和服务器端对应的处理方式不一致

发起的请求中带有所请求的URL 不支持的方法时, 使用此状态码。

应该在响应中包含Allow 首部, 以告知客户端对所请求的资源可以使用哪些方法

<br>

### 406 Not Acceptable
请求扩展名和实际返回的响应体类型不一致

客户端可以指定参数来说明它们愿意接收什么类型的实体。 服务器没有与客户端可接受的URL 相匹配的资源时, 使用此代码 通常, 服务器会包含一些首部, 以便客户端弄清楚为什么请求无法满足。

<br>

### 408 Request Timeout
如果客户端完成请求所花的时间太长, 服务器可以回送此状态码, 并关闭连接。超时时长随服务器的不同有所不同, 但通常对所有的合法请求来说, 都是够长的

<br>

### 409 Conflict
用于说明请求可能在资源上引发的一些冲突。服务器担心请求会引发冲突时, 可以发送此状态码 响应中应该包含描述冲突的主体

<br>

### 410 Gone
与404 类似, 只是服务器曾经拥有过此资源。主要用于Web 站点的维护, 这样服务器的管理者就可以在资源被移除的情况下通知客户端了

<br>

### 411 Length Required
服务器要求在请求报文中包含Content-Length 首部时使用

<br>

### 412 Precondition Failed
客户端发起了条件请求, 且其中一个条件失败了的时候使用。 客户端包含了Expect 首部时发起的就是条件请求。

<br>

### 413 Request Entity Too Large
客户端发送的实体主体部分比服务器能够或者希望处理的要大时, 使用此状态码

<br>

### 414 Request URI Too Long
客户端所发请求中的请求URL 比服务器能够或者希望处理的要长时, 使用此状态码

<br>

### 415 Unsupported Media Type
服务器无法理解或无法支持客户端所发实体的内容类型时, 使用此状态码

<br>

### 416 Requested Range Not Satisfiable
请求报文所请求的是指定资源的某个范围, 而此范围无效或无法满足时, 使用此状态码

<br>

### 417 Expectation Failed
请求的Expect 请求首部包含了一个期望, 但服务器无法满足此期望时, 使用此状态码。

<br>

### 500 Internal Server Error	
服务器内部错误 无法完成请求

<br>

### 501 Not Implemented
客户端发起的请求超出服务器的能力范围(比如, 使用了服务器不支持的请求方法)时, 使用此状态码

<br>

### 502 Bad Gateway
表示在充当网关或代理的服务器尝试从远程服务器获取响应时发生了问题。

充当网关或代理的服务器, 从远端服务器接收到了一个无效的请求, 比如我们找到的代理服务器 或 网关不靠谱 直接返回一个无效的请求

作为代理或网关使用的服务器从请求响应链的下一条链路上收到了一条伪响应(比如, 它无法连接到其父网关)时, 使用此状态码

<br>

**充当网关或代理的服务器:**  
这指的是一个位于客户端和实际提供所需资源的服务器之间的中间服务器，它在处理请求时充当了代理或者网关的角色。

<br>

**无效的请求:**  
这意味着中间服务器接收到了一个无法正确处理的请求，可能是由于请求格式不正确、参数错误等原因
<br>

**代理服务器或网关不靠谱**  
这里的不靠谱指的是该代理服务器或网关无法正常工作，可能出现了故障、超负荷等问题。
<br>

**伪响应:**  
作为代理或网关使用的服务器无法连接到其父网关或上一级服务器，它可能会返回一个虚假的响应，表示请求已经被处理，但实际上并没有成功获取到所需的资源。
<br>

"502 Bad Gateway" 状态码表示中间服务器（代理或网关）在尝试获取响应时遇到问题，可能是由于代理或网关本身出现故障，或者无法连接到上一级服务器，导致无法正确处理请求。这通常需要服务器管理员来排查和解决。

<br>

### 503 Service Unavailable
服务器暂时处于超负载或正在进行停机维护, 现在无法处理请求

用来说明服务器现在无法为请求提供服务, 但将来可以。如果服务器知道什么时候资源会变为可用的, 可以在响应中包含一个Retry-After 首部

<br>

### 504 Gateway Timeout
与状态码408 类似, 只是这里的响应来自一个网关或代理, 它们在等待另一服务器对其请求进行响应时超时了

<br>

### 505 HTTP Version Not Supported
服务器收到的请求使用了它无法或不愿支持的协议版本时, 使用此状态码。有些服务器应用程序会选择不支持协议的早期版本

<br><br>

# 使用 telnet 命令 分析 http协议的通讯过程
在windows下直接是支持 telnet 命令的, 如果没有开启的话可以在系统管理中将本机的telnet命令开启

如果是macbook的情况下需要安装 telnet 命令
```s
brew install telnet

# 输入telnet命令执行 看看能够有输出信息
telnet
```

<br>

## 使用 telnet

### 连接服务器
```s
open 127.0.0.1 8080
```

<br>

### 发送请求 和 接收响应
发送请求就是将请求报文打在控制台中 就可了, 输入后 我们需要回车两次, 然后小黑屏上会看到响应报文

![telnet01](./images/telnet01.png)

<br><br>

# Cookie 与 Session
http协议有优点 但也有缺点 最大的缺点就是无状态 也就是说记性不太好 http协议中的状态管理或者说的会话机制就是用来弥补自己记忆不好的缺点的

http本身是没有状态 也没有记性 这意味着每个请求都是独立的 缺少状态意味着如果后续处理需要前面的信息 那么就必须要重新传 这样就导致了每次连接传输的数据量就会增大 服务器不需要先前信息的时候服务器的压力小 返回应答就快

- 无状态的优点: 解放了服务器
- 无状态的缺点: 每次需要重新传输大量的数据

<br>

但是现在的客户端和服务器进行动态交互的web应用程序 也就是我们现在用的这些网站出现了以后 http无状态的特性严重的阻碍了这些应用程序的实现 

毕竟我们要做一个有逻辑的交互 我们都是要承前启后的, 比如我们在网上买东西 一个简单的购物车程序 最起码我们要知道用户在之前选择了什么商品, 也没有哪个网站每次在用户进行操作的时候 都需要重新的输入用户名和密码

所以两种用于保证http连接状态的技术就出来了
- cookie
- session

<br><br>

## cooke 和 session 的由来
我们从一个咖啡店老板的故事说起 为了咖啡店的生意好 我们做一个活动 来咱这喝咖啡满10杯送1杯, 这里有一个问题 怎么让大家记住10次 怎么设计能够让客户能够信任我们 还能顺利的得到满10赠1

<br>

### 方案1:
老板的记性特别的好 能够记住所有人的相貌 名字 和 来过的次数, 但是有可能客户的记性不太好 记忆的时长比较短 但是这种方案不可行 要么就是老板赔钱赔到死 要么就是客户投诉投诉到死

<br>

### 方案2:
老板以前是程序员 可以自己做一个小系统 我们每次点咖啡的时候 我们就在计数器中+1 每个客户都对应一条记录 但是这么客户不太满意 他们觉得老板说几次就是几次 我这里又没有凭证 我说我来了10次 你非说我来了8次 我不就亏两次

<br>

### 方案3:
从客户角度 客人第一次来买 我给客人发一个小卡片 每次再来买我们就盖一个章 盖满10个我将卡片回收 我给你们一杯咖啡 但是这里还有一个问题

总有一些人不知道哪来的小卡片跟我说盖满了, 因为有咖啡店对面有一个专门刻章的人, 他刻的章和我店里的章一模一样

<br>

### 方案4:
我们再想一个方案

- 方案2中提供了系统 我们在系统中存放了用户数据 - 这是商家方面 (服务端)
- 方案3中提供了小卡片 - 这是客户  (客户端)

我们要做一个设计就是客户端有 服务器端也有 我们可以发行一个会员卡 卡在客人手里 数据在我们的服务器里 两面一核对没有问题了 我们再发咖啡

<br><br>

在上面的例子中, **我们通过会员卡的方式大大减少了 自己记不住的问题 这就是我们的sesstion 和 cookie**
- 老板 - 服务端
- 客户 - 客户端

<br>

- cookie是在客户端的
- session是在服务端的

这样减少了无状态带来的问题, 这就是会话跟踪技术

<br><br>

# Cookie
它是一小段文本的信息, 客户端请求服务器 **如果服务器需要记录该用户的状态**, 就通过res向客户端浏览器颁发一个Cookie

由于http是无状态的 服务器单从网络上就没有办法知道客户的身份 为了解决这个问题我们可以给客户端办法一个通行证 以后无论谁过来访问服务器都需要带着自己的通行证 这样服务器就能够从通行证上确认客户身份了

客户端浏览器会把Cookie保存起来, 当浏览器再请求该网站的时候, 浏览器把请求的网站连同该Cookie一同提交给服务器, 服务器检查该Cookie 以此辨认用户状态

<br>

**技巧: 地址栏输入javascript伪协议获取网站cookie**
```s
javascript:alert(document.cookie)
```

<br>

### Cookie流程
![cookie01](./images/cookie01.png)

1. 用户输入url向目标服务器发起页面请求 并且将得到的html在页面中展示

2. 浏览器第一次向服务器发送请求的**之前** 会先在本地查找cookie文件 如果找到浏览器会将cookie文件中的数据 **连同前面输入的url一同发送给目标服务器**

3. **服务器收到cookie数据 就会在数据库中检索用户id** 我们的购物信息 我们的记录 我们的个人爱好等 并将这次请求的新的内容保存到数据库 如果没有检查到cookie 或者 cookie的信息 和 数据库的信息不吻合 说明我们是第一次浏览这个网站 那服务器程序就会给我们创建一个新的id 并且保存到数据库中 并给客户端下发一个cookie 这样下次客户端访问的时候就会携带cookie了

<br>

上面的动作就和我们的咖啡店的经营模式是一样的, 比如用户是第一次来咖啡馆 咖啡店没有该用户的会员卡 系统中也没有记录该用户的信息

第一次来我给你免费办理一张会员卡 这样我们都有了 用户手上有会员卡(Cookie) 咖啡店有系统记录 等用户下一次来的时候将卡给老板, 老板刷卡 我在你的Cookie中添加了一次记录 在服务器上也增加了这一次记录 当用户第10次来的时候 我们就发一杯咖啡

<br><br>

# Session
web应用程序中还经常使用到了另外一个东西, 就是Session

它是**另一种记录客户状态的机制, 保存在服务器上**, 客户端浏览器访问服务器的时候, 服务器把客户端信息以某种形式记录在服务器上

Session是服务器端使用的一种记录客户端的机制, 它的使用可能比Cookie还要简单 但是相应的也增加了服务器端存储上的压力

客户端浏览器再次访问的时候 只需要从改session中查找该客户的状态就可以了

<br>

### Session工作原理
![session01](./images/session01.png)

如果说cookie机制是通过检查客户身上的会员卡来确定客户身份的话, session机制就是通过检查服务器上的客户明细表来确认客户的身份

session相当于程序在服务器中建立了一份客户档案 客户来访问的时候 只需要查询客户档案表 就可以了, session的工作原理在某种程度上说和cookie是非常相近的 并且 是相关的

1. 当用户访问服务器 

2. 如果服务器启用session 服务器就要为这个用户创建一个session 在创建session之前 服务器会检查请求中是否包含sessionId 如果有则说明该用户登录过 并且已经创建过session 服务器就会按照这个id 在服务器的内存中查找出来 如果查找不到或者客户端请求中就不包含sessionId 那就为这个客户端创建一个新的session 并且生成一个与此session相关的sessionId 这个sessionId在服务器端是唯一的 这个id就会在这次的响应中返回到客户端进行保存 保存这个sessionId的就是cookie, 这样浏览器就会按照规则将sessionId发送给服务器

<br>

### 保存 Session ID 的方式:
**cookie:**  
它是保存sessionId最常见的方式 90%以上的网站和浏览器都是这么支持的 但是我们要知道我们可以人为的将cookie禁止掉

是不是一旦cookie被禁止了 sessionId的机制就没有办法使用了呢 这里我们就可以使用另外一种技术 url重写

<br>

**url重写:**  
url重写就是指将sessionId直接添加到url的后面
```s
# 方式1: ;表示路径的附加信息
http://.../xxx;SessionId=ByOk.....

### 方式2: ?表示作为查询字符串
http://.../xxx?SessionId=ByOk.....
```

<br>

**隐藏字段(表单):**  
我们通过一个隐藏的表单项 将sessionId 传递到服务器

<br>

### Session的有效时间:
Cookie的有效时候特别的长, Session因为会有很多用户访问服务器 考虑到服务器压力大的问题 为了防止内存溢出 服务器就会将长时间没有活跃的session从内存中清理掉

这个时间就是session的超时时间 如果超过了该时间 session就会自动失效, 程序也可以通过调用 HttpSession.invalidate() 让session主动失效

当我们进行退出 和 注销的操作的时候 通常会调用上面的方法

<br><br>

## 对比 Cookie 和 Session
1. 存放位置不同 cookie在客户端 session在服务端

2. 安全性(隐私策略)不同 cookie存在浏览器中 客户端是可见的 客户端中的程序可能会读取cookie session存在服务器 客户端看不见 不存在敏感信息泄露的风险 敏感的信息比如账号密码 权限等尽量不要往cookie写, 可以参考谷歌把cookie的信息加密提交到服务器后 再进行服务端的解密 保证cookie的信息只有服务器才能读的懂

3. 有效性上的不同 cookie可以设置很大的数字 这样cookie就可以保存的很久 session不可以 服务器会定时的清理sessionId 避免压力

4. 对服务器压力的不同

<br><br>











































<br>

### 代理
位于 客户端 和 服务器 之间的HTTP 中间实体。

这是Web 安全、应用集成以及性能优化的重要组成模块。
代理位于客户端和服务器之间, 接收所有客户端的HTTP 请求, 并将这些请求转发给服务器(可能会对请求进行修改之后转发)

代理还可以对请求和响应进行过滤

比如, 在企业中对下载的应用程序进行病毒检测, 或者对小学生屏蔽一些成人才能看的内容。

<br>

### 缓存
HTTP的仓库, 使常用页面的副本可以保存在离客户端更近的地方。

Web缓存(Web cache)或代理缓存(proxy cache)是一种特殊的HTTP 代理服务器

也就是说缓存也是服务器？

可以将经过代理传送的常用文档复制保存起来 下一个请求同一文档的客户端就可以享受缓存的私有副本所提供的服务了

<br>

### 网关
连接其他应用程序的特殊Web 服务器。通常用于将HTTP 流量**转换成其他的协议**

网关接受请求时就好像自己是资源的源端服务器一样。客户端可能并不知道自己正在与一个网关进行通信。

<br>

### 隧道
对HTTP 通信报文进行盲转发的特殊代理。
建立起来之后, 就会在两条连接之间对原始数据进行盲转发的HTTP 应用程序

HTTP 隧道通常用来在一条或多条HTTP 连接上转发非HTTP 数据, 转发时不会窥探数据。

<br>

### Agent代理
发起自动HTTP 请求的半智能Web 客户端。
用户Agent 代理 是代表用户发起HTTP 请求的客户端程序

所有发布Web 请求的应用程序都是HTTP Agent 代理。到目前为止, 我们只提到过一种HTTP Agent 代理: Web 浏览器

<br><br>
