# WebSocket
WebSocket 是一种网络通信协议很多高级功能都需要它.
叩丁狼 笔记:  http://codesohigh.com/subject/websocket/websocket.html

初次接触 WebSocket 的人都会问同样的问题: 我们已经有了 HTTP 协议为什么还需要另一个协议？它能带来什么好处？

因为 HTTP 协议有一个缺陷: 通信只能由客户端发起.
举例来说我们想了解今天的天气只能是客户端向服务器发出请求服务器返回查询结果.

HTTP 协议做不到服务器主动向客户端推送信息.
HTTP 协议的这种单向请求的特点注定了如果服务器有连续的状态变化客户端要获知就非常麻烦.

如果我们还需要实时获取服务端的最新动态怎么办? 用ajax的方式去访问服务器 那么
我们只能使用“轮询”: 每隔一段时候就发出一个询问了解服务器有没有新的信息.最典型的场景就是聊天室.

轮询的效率低非常浪费资源(因为必须不停连接或者 HTTP 连接始终打开).因此工程师们一直在思考有没有更好的方法.WebSocket 就是这样发明的.


### **Ajax轮询: **
ajax轮询一般分为两种.
1. 设定一个定时器无论有无结果返回, 时间一到就会继续发起请求这种轮询耗费资源也不一定能得到想要的数据这样的轮询是不推荐的.

2. 在第一次请求的时候 如果返回数据了那么就在成功的回调里面再次发起这个请求就像递归一样调用本方法.如果时间太久失败了同样的再次调用这个请求也就是本函数.当然长轮询也需要后台配合没有数据改变的时候就不用返回或者约定好逻辑.

3. 客户端按规定时间定时向服务端发送ajax请求服务器接到请求后马上返回响应信息并关闭连接. Ajax轮询需要服务器有很快的处理速度与快速响应.

客户端是按照规定时间(这个时间由你设定此处默认为1秒)像服务端发送请求前一次请求完成后无论有无结果返回一秒之后下一次请求又会发出.这就叫做Ajax轮询.

https://www.cnblogs.com/-wenli/p/10982264.html


### **websocket的特点: **
服务器可以主动向客户端推送信息客户端也可以主动向服务器发送信息是真正的双向平等对话

1. 属于服务器推送技术的一种
``` 
    HTTP 协议有点像发电子邮件发出后必须等待对方回信;
    WebSocket 则是像打电话
    
    服务器端和客户端可以同时向对方发送数据它们之间存着一条持续打开的数据通道.
```

2. 与 HTTP 协议有着良好的兼容性.默认端口也是80和443
并且握手阶段采用 HTTP 协议因此握手时不容易屏蔽能通过各种 HTTP 代理服务器.

3. 数据格式比较轻量性能开销小通信高效.
4. 可以发送文本也可以发送二进制数据.
5. 没有同源限制客户端可以与任意服务器通信完全可以取代 Ajax.

6. 协议标识符是ws(如果加密则为wss对应 HTTPS 协议)服务器网址就是 URL.
``` 
    ws://example.com:80/some/path
```


### **WebSocket 握手请求头 和 响应头 解析: **
浏览器发出的 WebSocket 握手请求类似于下面的样子: 
```js 
    GET / HTTP/1.1

    // Connection字段表示浏览器通知服务器如果可以的话就升级到 WebSocket 协议
    Connection: Upgrade

    // Upgrade字段表示将通信协议从HTTP/1.1转向该字段指定的协议
    Upgrade: websocket
    Host: example.com
    Origin: null

    // Sec-WebSocket-Key则是用于握手协议的密钥是 Base64 编码的16字节随机字符串.
    Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
    Sec-WebSocket-Version: 13
```

服务器的 WebSocket 回应如下.
```js
    HTTP/1.1 101 Switching Protocols

    // Connection字段通知浏览器需要改变协议.
    Connection: Upgrade
    Upgrade: websocket

    // Sec-WebSocket-Accept字段是服务器在浏览器提供的
    Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
    Sec-WebSocket-Origin: null

    // Sec-WebSocket-Location字段表示进行通信的 WebSocket 网址.
    Sec-WebSocket-Location: ws://example.com/
```

Sec-WebSocket-Accept字段: 
服务器在浏览器提供的Sec-WebSocket-Key字符串后面添加 RFC6456 标准规定的
“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”字符串然后再取 SHA-1 的哈希值.浏览器将对这个值进行验证以证明确实是目标服务器回应了 WebSocket 请求.Sec-WebSocket-Location字段表示进行通信的 WebSocket 网址.

完成握手以后WebSocket 协议就在 TCP 协议之上开始传送数据.


### **客户端 API : **
浏览器对 WebSocket 协议的处理无非就是三件事.
1. 建立连接和断开连接
2. 发送数据和接收数据
3. 处理错误


### **当创建ws实例对象后 客户端就会与服务器进行连接: **
### **<font color="#C2185">let ws = new WebSocket("服务器地址")</font>**
**注意:**
服务器地址的协议必须由 http -> ws 改为ws
```js 
    let serverURL = "ws://localhost:8800/"  // ws
    let ws = new WebSocket(serverURL)
 ```


### **实例对象身上的属性: **
### **<font color="#C2185">ws.readyState</font>**
返回实例对象的当前状态共有四种
1. CONNECTING:    值为0表示正在连接.
2. OPEN:          值为1表示连接成功可以通信了.
3. CLOSING:       值为2表示连接正在关闭.
4. CLOSED:        值为3表示连接已经关闭或者打开连接失败.
```js 
    console.log(ws.readyState)   // 0
```


### **<font color="#C2185">ws.onopen</font>**
用于指定连接成功后的回调函数
```js 
    // 如果要指定多个回调函数可以使用addEventListener方法.
    ws.onopen = function(e) {
        if(e) console.log("open", e)
        let data = {msg: "我是数据呀"}
        ws.send(data)
    }
```


### **<font color="#C2185">ws.onclose</font>**
用于指定连接关闭后的回调函数.
```js 
    ws.onclose = function(e) {
        if(e) console.log("close", e)
    }
```


### **<font color="#C2185">ws.onmessage</font>**
用于指定 收到服务器数据 后的回调函数.
```js 
    // 注意服务器数据可能是文本也可能是二进制数据(blob对象或Arraybuffer对象).
    ws.onmessage = function(event){
        if(typeOf event.data === String) {
            console.log("Received data string");
        }

        if(event.data instanceof ArrayBuffer){
            var buffer = event.data;
            console.log("Received arraybuffer");
        }
    }

    ws.onmessage = function(e) {
        if(e) console.log("message", e)
        console.log("onmessage, 这里能收到来自服务器的数据")
    }
```


### **<font color="#C2185">ws.onerror</font>**
用于指定报错时的回调函数.


### **<font color="#C2185">ws.send()</font>**
实例对象的send()方法用于向服务器发送数据.
```js 
    // 发送文本的例子.
    ws.send('your message');


    // 发送 Blob 对象的例子.
    var file = document
    .querySelector('input[type="file"]')
    .files[0];

    ws.send(file);


    // 发送 ArrayBuffer 对象的例子.
    var img = canvas_context.getImageData(0, 0, 400, 320);
    var binary = new Uint8Array(img.data.length);
    for (var i = 0; i < img.data.length; i++) {
        binary[i] = img.data[i];
    }
    ws.send(binary.buffer);
```


### **实例对象的属性: **
### **<font color="#C2185">ws.binaryType</font>**
显式指定收到的二进制数据类型.
```js 
    // 收到的是 blob 数据
    ws.binaryType = "blob";
    ws.onmessage = function(e) {
        console.log(e.data.size);
    };

    // 收到的是 ArrayBuffer 数据
    ws.binaryType = "arraybuffer";
    ws.onmessage = function(e) {
        console.log(e.data.byteLength);
    };
```


### **<font color="#C2185">ws.bufferedAmount</font>**
表示还有多少字节的二进制数据没有发送出去.它可以用来判断发送是否结束.
```js 
    var data = new ArrayBuffer(10000000);
    socket.send(data);

    if (socket.bufferedAmount === 0) {
        // 发送完毕
    } else {
        // 发送还没结束
    }
```


### **服务端的方法: **
### **<font color="#C2185">ws.send() </font>**
    用于向客户端发送数据

### **<font color="#C2185">ws.on("message", () => { }) </font>**
    用于接收客户端发送过来的数据



### **服务器端 逻辑: **
Web端我们主要借助 *express* 与 *express-ws*

这个项目里我们创建一个两个人实时对话的效果

1. npm init -y 项目初始化
2. npm express express-ws
3. 根目录下创建静态资源文件夹 创建index.html 创建角色A 和 角色B
``` 
    | - public
        - index.html
            这个页面主要的效果就是 点击头像跳转到 
            sam.html 或者 erin.tml

        - sam.html
        - erin.html

        - 两张图片.jpg
```

4. 写web端逻辑 自己看吧 随便一个网页都可以 逻辑都是一样的

5. 写服务端代码
```js 
    const express = require("express")

    // 引入 ws
    const expressWs = require("express-ws")

    const app = express()

    // 使用expressWs方法 将app传入 这样我们就能往页面中注入websocket功能
    expressWs(app)
```

6. 在根目录下创建 websocket.js 
```js 
    // 这个文件中也要用到路由 所以要导入express
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    // 给router注入websocket 注入后 router就会多了ws方法
    expressWs(router)

    // sam访问的路径为 ws://localhost:8800/ws/sam
    // app.use("/ws", websocket) 因为server.js文件里面 这么处理的 所以 这个js文件中的所有路径前都会拼接上/ws

    // 当sam访问这个路径的时候 我们就给它返回一个数据
    router.ws("/sam", (ws) => {
        ws.send("sam链接成功")
    })

    module.exports = router
```

7. 前端的ws逻辑
```js 
    // ws的方法
    // 一个页面对应一个服务端的路由规则 比如前端sam 要进入 后台sam 这才算链接在一起 我们指定的url就是 后台 router定义的对应的路由规则 router.ws("/sam", (ws) => {})
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
      // 得到链接状态 值为1链接成功
      console.log(ws.readyState)
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {
      console.log(res)
      console.log(res.data)
    }
```


8. 上面做了下布局 和 ws的链接
现在我们思考一个问题 比如我在sam页面 发送了一条消息 怎么才能到erin页面呢？

当我们再输入框输入文本后 我们判断非空 上面的逻辑是 直接拿到 输入的值 然后拼装好结构 插入到了sam的页面中

其实这个部分的逻辑不对 我们应该是从 onmessage 中拿到内容 也就是从服务端拿到内容 在拼接 再放入到页面中

我们应该是 按下回车 走服务端 从服务端返回数据 然后再做拼接 插入页面的逻辑
这样数据经过服务端 服务端就可以存储起来 这样erin就可以接收到sam的消息
```js 
    // 服务端代码 服务端使用on方法接收客户端发送的数据 然后在给客户端
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        ws.send(msg)
    })
```

### **这个阶段的 客户端代码: **
```js 
    let txt = $("#txt")[0]
    let contentWrap = $(".contents")[0]
    let tips = $(".tips")[0]

    // ws的方法
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
      // 得到链接状态 值为1链接成功
      // console.log(ws.readyState)
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {

      let tNode = rightMsg(res.data, true)
      contentWrap.innerHTML += tNode

      contentWrap.scrollTo({
        top: contentWrap.scrollHeight,
        behavior: "smooth"
      })

      txt.value = ""
    }



    // 既然是回车的发起人 那么必然我们要添加到右侧
    txt.onkeyup = function(e) {
      if(e.keyCode == 13) {
        if(this.value.trim() == "") {
          tips.style.display = "block"
          this.timer = setTimeout(function(){
            tips.style.display = "none"
          }, 2500)
          this.value = ""
          return
        }

        let value = this.value

        // 将获取到的数据发送给服务端
        ws.send(value)
        
        // 下面添加到页面的逻辑 我们要在 onmessage 事件里面完成 因为它理由有服务端返回的数据
      }
    }

    function rightMsg(value, type) {
      if(type) {
        let rightHtml = `
          <div class="dialog right">
            <div>${value}</div>
            <img src="./sam.png" alt="">
          </div>
        `
        return rightHtml
      } else if(type == false) {
        let leftHtml = `
          <div class="dialog left">
            <img src="./erin.png" alt="">
            <div>${value}</div>
          </div>
        `
        return leftHtml
      }
    }

    function $(el) {
      return document.querySelectorAll(el)
    }
```


### **这个阶段的服务端代码: **
```js 
    // 这个文件中也要用到路由 所以要导入express
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    expressWs(router)

    router.ws("/sam", (ws) => {


    // 接收客户端发送过来的数据
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        ws.send(msg)
    })
    })

    // 注意每一个路由中必须有一个有效的send方法 send中有一个return 写在send后面的语句都不会执行

    module.exports = router
```


我们还要思考下 sam发送的数据 给了服务端 由服务端再返回 我们渲染到了页面上 但是sam的信息 erin那边也要收到吧

erin那边怎么才能收到呢？

服务端的代码 发送数据 和 接收数据的逻辑最好是分离开 这样思路比较清晰
```js 
    // 存放sam的数据
    let samStr = []


    router.ws("/sam", (ws) => {
        ws.on("message", (msg) => {
            samStr.push(msg)    // 存储sam发送的数据
            ws.send(msg)
        })
    })


    // erin接收数据的接口
    router.ws("/erin", (ws) => {
    // 这里我们要将sam的数据 给前端erin的界面 我们不能使用for循环发依次send samStr数组 因为一个路由规则中只能有一个send方法

    // 这里我们采用定时器 每一秒发送一条数据 也就是用定时器的方式查看数组中是否有数组项 只要数组中是有数据的就返回给客户端第0项 顺便把第0项清掉

    setInterval(function() {
        if(samStr.length > 0) {
            // 因为send 里面有return 所以要做下面的逻辑
            let msg = samStr[0]
            samStr.shift()
            ws.send(msg)
            }    
        }, 1000)
    })
```

这里的要点就是 使用定时器 每1秒就查看一下samStr数组中有没有数据 如果有数据 那么就将它返回给客户端 然后再将数组里面的数据删掉 这样数组中始终都是一条数据 返回给客户端就删掉


几乎就是可以了 然后没事自己做一遍
要点: 
我们前端一套ws方法 对应 后台一套ws接口
前端 new WebSocket 时填入的 接口url 这样前端这一套方法 才能与 后台路由接口中的方法配套 互相接发数据


### **完整代码总结: **
```js 
    // 客户端 sam
    let txt = $("#txt")[0]
    let contentWrap = $(".contents")[0]
    let tips = $(".tips")[0]

    // ws的方法
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {

      let tNode = rightMsg(res.data, true)
      contentWrap.innerHTML += tNode

      contentWrap.scrollTo({
        top: contentWrap.scrollHeight,
        behavior: "smooth"
      })

      txt.value = ""
    }

    txt.onkeyup = function(e) {
      if(e.keyCode == 13) {
        if(this.value.trim() == "") {
          tips.style.display = "block"
          this.timer = setTimeout(function(){
            tips.style.display = "none"
          }, 2500)
          this.value = ""
          return
        }

        let value = this.value
        ws.send(value)
        
        // 下面添加到页面的逻辑 我们要在 onmessage 事件里面完成 因为它理由有服务端返回的数据
      }
    }

    // 创建一个生成 对话框区域 的代码 传入true代表添加右侧结构 false左侧
    function rightMsg(value, type) {
      if(type) {
        let rightHtml = `
          <div class="dialog right">
            <div>${value}</div>
            <img src="./sam.png" alt="">
          </div>
        `
        return rightHtml
      } else if(type == false) {
        let leftHtml = `
          <div class="dialog left">
            <img src="./erin.png" alt="">
            <div>${value}</div>
          </div>
        `
        return leftHtml
      }
    }

    function $(el) {
      return document.querySelectorAll(el)
    }


    // 后台 websocket 逻辑
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    // 给router注入websocket 注入后 router就会多了ws方法
    expressWs(router)


    // 存放sam的数据
    let samStr = []

    // sam访问的路径为 ws://localhost:8800/ws/sam
    // app.use("/ws", websocket) 因为server.js文件里面 这么处理的 所以 这个js文件中的所有路径前都会拼接上/ws
    // 当sam访问这个路径的时候 我们就给它返回一个数据
    router.ws("/sam", (ws) => {

    // send() ws的方法 用来想客户端发射数据的
    // ws.send("后台往客户端发送的数据")

    // 接收客户端发送过来的数据
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        samStr.push(msg)    // 存储sam发送的数据
        ws.send(msg)
    })
    })

    // 注意每一个路由中必须有一个有效的send方法 send中有一个return 写在send后面的语句都不会执行



    // erin接收数据的接口
    router.ws("/erin", (ws) => {
    let timer = null

    // 当监听到链接断开的时候要清空定时器
    ws.on("close", () => {
        if(timer) {
        clearInterval(timer)
        }
    })

    // 这里我们要将sam的数据 给前端erin的界面 我们不能使用for循环发依次send samStr数组 因为一个路由规则中只能有一个send方法
    // 这里我们采用定时器 每一秒发送一条数据 也就是用定时器的方式查看数组中是否有数组项 只要数组中是有数据的就返回给客户端第0项 顺便把第0项清掉
    timer = setInterval(function() {
        if(samStr.length > 0) {
        // 因为send 里面有return 所以要做下面的逻辑
        let msg = samStr[0]
        samStr.shift()
        ws.send(msg)
        }    
    }, 1000)
    })

    module.exports = router


    const express = require("express")
    // 引入 ws
    const expressWs = require("express-ws")
    const websocket = require("./websocket.js")

    const app = express()
    // 使用expressWs方法 将app传入 这样我们就能往页面中注入websocket功能
    expressWs(app)


    // 利用中间件来充当路由 参数1的位置是路由 返回对应的静态资源文件夹中的html文件
    app.use("/sam", express.static("public/sam.html"))
    app.use("/erin", express.static("public/erin.html"))

    // 当我们访问的是 /ws 的路由的时候 我们就要调用 websocket
    // 我们要求访问的格式是 ws://localhost:3000/ws  不想要/ws的话 下面app.use那里去掉
    // websocket是我们导入的js文件 下面这样写的话 这个js文件中的所有路径前都会拼接上/ws
    app.use("/ws", websocket)

    app.use(express.static("public"))

    // 如果我们键入服务器网址后 没有任何对应页面的话 解决报错
    app.get("/*", (req, res) => {})


    app.listen(8800, () => {
    console.log("服务器已开启 监听8800")
    })
```
