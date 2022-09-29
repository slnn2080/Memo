### 阮一峰 Web Worker
- JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

- Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。

- 等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

- Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，**而且一旦使用完毕，就应该关闭**。


> 注意:
- Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。**但是，Worker 线程可以navigator对象和location对象。**


> 通信:
- Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。


> 脚本限制:
- Worker 线程不能执行alert()方法和confirm()方法，**但可以使用 XMLHttpRequest 对象发出 AJAX 请求。**


> 基本用法:
- 主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程。

```js
var worker = new Worker('work.js');
```

- Worker()构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。

- 然后，主线程调用worker.postMessage()方法，向 Worker 发消息。
```js
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
```

- worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。

- 接着，主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息。

```js
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
```

- 上面代码中，事件对象的data属性可以获取 Worker 发来的数据。Worker 完成任务以后，主线程就可以把它关掉。

> **worker.terminate();**

------

>  Worker 线程
- Worker 线程内部需要有一个监听函数，监听message事件。
```js
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);
```

- **self:**
- 即子线程的全局对象。因此，等同于下面两种写法。
```js
// 写法一
this.addEventListener('message', function (e) {
  this.postMessage('You said: ' + e.data);
}, false);

// 写法二
addEventListener('message', function (e) {
  postMessage('You said: ' + e.data);
}, false);
```

- 除了使用self.addEventListener()指定监听函数，也可以使用self.onmessage指定。监听函数的参数是一个事件对象，它的data属性包含主线程发来的数据。self.postMessage()方法用来向主线程发送消息。

- 根据主线程发来的数据，Worker 线程可以调用不同的方法，下面是一个例子。
```js
self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
```

> **self.close()**
- 用于在 Worker 内部关闭自身。


> Worker 加载脚本
- Worker 内部如果要加载其他脚本，有一个专门的方法importScripts()。

```js
importScripts('script1.js');

// 该方法可以同时加载多个脚本。
importScripts('script1.js', 'script2.js');
```


> 错误处理
- 主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。
```js
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```


> 关闭 worker
```js
// 主线程
worker.terminate();

// Worker 线程
self.close();
```


- 还有一些没有整理
- https://www.ruanyifeng.com/blog/2018/07/web-worker.html


------


> 实例：Worker 线程完成轮询
- 有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。

```js
// 创建 worker 的函数
// 传递了一个回调
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```

- 上面代码中，Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。

----------------

### Web Worker 
- html5的新特性 要完成一个web worker的功能代码就3行

> 程序:
- 指可以被cpu执行的代码 **通常程序存储在磁盘上**
- 电脑中大概得执行步骤如下:
- 
<!-- 
    CPU              磁盘 (程序)
                    (如下的都是程序 程序会方法磁盘上)
            ↖       1.html
                    2.css
                    3.js


  我们的程序必须放在 cpu 上执行
 -->

- 但是有个问题 磁盘跑的太慢 cpu跑的太快 比如 cpu相当于飞机, 磁盘相当于爬着走

- 磁盘太慢了 cpu太快了 从磁盘直接拿到cpu中这个过程太慢了不现实

- 所以计算机中还有个部件叫内存 内存比磁盘快 比cpu慢 相当于高铁 因为内存的速度足够快 所以我们会**将程序先放到内存中 从内存中再送给cpu**


> 进程:
- 将程序调用到内存中 并且分配指定的空间 在内存中的程序就叫做进程 **搁到内存中的程序就叫做进程**


> 线程:
- 进程的内部是由多个线程组成的(线程也在内存中)


> 线程 和 进程之间的关系:
- 高科技开发区买了一块地 有一个工厂 
- 工厂中有4条生产线 生产线上有很多的工人
<!-- 
    X
    |    |    |    | 
    |o   |o   |o   |o
    |    |    |    | 
    |o   |o   |o   |o
    |    |    |    | 
    |o   |o   |o   |o
    |    |    |    | 
    |o   |o   |o   |o
    |    |    |    | 
    |o   |o   |o   |o
    |    |    |    | 
 -->

- 生产线有什么优点?
- 万一有一天一条生产线停止工作了 不会影响整个工厂的运行

- 工厂: 进程
- 生产线: 线程

- 一个进程当中可以由多个线程组成

------

> chrome浏览器
- 一个chrome浏览器进程内部

  - *至少*有6个线程负责向服务器发送请求获取资源(资源请求线程) **请求线程**

  - 一个线程负责*绘制*所有的资源并且执行js程序(上面的线程将资源拿到了 这个线程负责将资源画出来) **UI主线程**
  <!-- 
    一个人负责两件事情的时候就容易出问题
    UI主线程要绘制图片 又要执行js代码

    它一定会等到js执行完后 再绘制其下面的dom元素
    如果js执行要花5秒钟时间 那么就会阻塞5秒 会类似白屏或卡顿5秒钟时间
   -->

```js
let start = new Date().getTime()
do {
  let end = new Date().getTime()
} while((end - start) < 5000)
```

- 上面的原因在于 一个人做了两件事 所以出现了上述的问题


> 解决方案:
- 创建新线程 帮助UI主线程执行耗时的js任务
- UI主线程只负责绘制网页的工作


> 语法:
```js
let worker = new Worker("要执行的js任务(文件)的路径")
```

- 创建一个 worker 对象
- 创建一个新线程来指定指定js任务

> 示例:
- 原本要等5秒才会显示余下dom结构的问题 通过worker解决了

```html
<body>
  <button>按钮1</button>

  <!-- 
    <script src="./src/assets/js/demo_worker.js"></script> 
  -->
  <script>
    // 创建worker对象 创建新线程执行耗时js文件
    let worker = new Worker("./src/assets/js/demo_worker.js")
  </script>

  <button>按钮2</button>
</body>
```

> 可能出现的错误
- Uncaught DOMException; Failed to construct "worker": scriot at

- 我们运行的时候可能不是通过服务器而是 file:// 直接运行的文件

- worker只能运行在服务器下


- **worker就是用来帮忙的**


> worker程序实现数据传递
- UI线程将数据发送给worker线程
- worker线程将数据发送给UI线程
<!-- 
  结合上面的案例就是
    demo_worker.js 和 demo.worker.html 之间可以互相发送数据
 -->

- 反过来也一样

> 发送数据: postMessage(数据)
> 接收数据: onmessage = function(e) { e.data }
- 需要注意的是:
- 给 worker 发送数据
- 接收 worker 来的数据
- 都要使用 worker. 比如
- 给 worker发送数据 worker.postMessage()
- 接收 worker发送过来的数据 worker.onmessage = 

- 但是在 worker 中给 主线程发送数据 和 接收主线程的数据 则直接使用 postMessage() 和 onmessage() 就可以

```html
<body>
  <button>按钮1</button>
  <!-- 
    <script src="./src/assets/js/demo_worker.js"></script> 
  -->
  <script>
    // 创建worker对象 创建新线程执行耗时js文件
    let worker = new Worker("./src/assets/js/demo_worker.js")

    // 向 worker 发送数据
    worker.postMessage("123")


    // 接收 worker 的数据
    worker.onmessage = function(e) {
      console.log("接收worker的数据", e.data)
    }
  </script>
  <button>按钮2</button>
</body>
```

- /src/assets/js/demo_worker.js
```js
// 接收主线程过来的数据
onmessage = function(e) {
  console.log("接收主线程过来的数据", e.data)
}

// 向主线程发送数据
postMessage("456")
```

- 打印的话: 
- 主线程先打印 
- 主线程先拿到 worker 发送过来的数据 456
- worker后打印 123

------

**注意事项:**
- worker中不能获取主线程的dom结构
- worker线程执行代码中不能包含任何 DOM/BOM 元素
- 操作网页中 DOM / BOM 只能交给UI主线程 其它的线程不能操作 因为担心混乱

------

> 使用场景:
- 计算用户输入数值的累加和

- html部分:
```html
<body>
  <div>
    请输入数值: <input type="text">
  </div>
  <div>
    <button>
      计算
    </button>
  </div>
  <div>
    计算结果: <span></span>
  </div>

  <script>
    let inp = document.querySelector("input")
    let btn = document.querySelector("button")
    let span = document.querySelector("span")

    let worker = new Worker("./src/assets/js/demo_worker.js")

    btn.addEventListener("click", function() {
      // 将用户输入的值发送给worker
      worker.postMessage(+inp.value)
    })

    // 接收 worker 发送回来的数据
    worker.onmessage = function(e) {
      span.innerHTML = e.data
    }
  </script>
</body>
```

- js部分:
```js
let res = 0
onmessage = function(e) {
  let num = e.data
  for(let i=0; i<=num; i++) {
    res += i
  }
  postMessage(res)
}
```

------

> 相关 api 

> Worker.prototype.onmessage
- 用于接收另一个线程数据的回调函数

> Worker.prototype.postMessage
- 向另一个线程发送消息

- 每个线程可以向不同的线程发送消息 也可以接收不同线程传来的消息


> 主线程操作
  - 发送消息: worker.postMessage(数据)
  - 接收消息: worker.onmessage = function(e) {e.data }


> 子线程操作:
  - 发送消息: this.postMessage(数据)
  - 接收消息: this.onmessage = function(e) {e.data }

```js
console.log("this:", this)  // DedicatedWorkerGlobalScope
console.log("self:", self)  // DedicatedWorkerGlobalScope
console.log("judge:", this == self) // true
```

> 不足:
- worker内代码不能操作DOM(更新UI)
- 不是每个浏览器都支持这个新特性
- 不能跨域加载js


### 总结:
在 work线程 往 主线程发送消息的时候  
使用 this == self == 不写 这三种写法都是一样的 也就是说: 

- work线程中 this self 代表 主线程
- 主线程中 worker实例对象代表 worker线程


> 场景:
```html
<script>
  // setTimeout本身是同步代码 但会回调会异步执行
  setTimeout(() => {
    console.log("今晚吃点啥")
  })


  // 做 50000 * 50000 的运算
  let a = 0
  for(let i = 0; i < 50000; i++) {
    for(let j = 0; j < 50000; j++) {
      a++
    }
  }
</script>
```

- 我们要将 计算 放到子线程执行

> web worker是通过 文件 启动分线程的
- 1. 建立js文件 也就是这个文件就是分线程
- myworker.js
```js
function fn(num) {
  let a = 0
  for(let i = 0; i < num; i++) {
    for(let j = 0; j < num; j++) {
      a++
    }
  }

  return a
}
```

- 2. 主线程文件(html)中创建worker
```js
// 字符串文件路径 文件选谁 谁就是分线程
let worker = new Worker("./js/myworker.js")


// 传递数据给分线程
worker.postMessage(50000)
```

- 3. 分线程接收数据
```js
function fn(num) {
  let a = 0
  for(let i = 0; i < num; i++) {
    for(let j = 0; j < num; j++) {
      a++
    }
  }

  return a
}


// 接收主线程的数据 事件会自动执行
self.onmessage = function(e) {
  // 调用上方的函数
  let res = fn(e.data)

  self.postMessage(res)
}
```

- self验证一下是谁 正常不写 self 也是可以的


- 4. 主线程接受worker的数据
```js
// 字符串文件路径 文件选谁 谁就是分线程
let worker = new Worker("./js/myworker.js")


// 传递数据给分线程
worker.postMessage(50000)

// 接收worker的数据
worker.onmessage = function(e) {
  console.log(e.data)
}
```

------