# Event Loop: 
异步 和 多线程的实现是通过 event loop 事件循环机制来实现的, 大体有三个部分组成  

1. 调用栈: call stack
2. 消息队列: message queue
3. 微任务队列: microtask queue

<br>

js是单线程的 干活的时候只有一个人在干活 js中有一个主线程, 同一时间只能干一件事 不能干多个事情, 所以有一个队列 

js主线程的任务处理完成后, 再去队列里面抓取任务去处理, 没有任务就休眠

<br><br>
  
## 宏任务队列: 
- script整体的代码
- setTimeout
- setInterval
- UI交互事件
- postMessage
- ajax

<br>

同步代码会放到主线程中立刻执行, 异步代码会放到队列中<font color="#C2185B">等待同步代码执行完毕后</font>再执行

```js
setTimeout(function() {
  console.log(1)
}, 0)

// 主线程代码 也是同步代码
console.log(2)

// 结果: 2 1
```

<br><br>

## 微任务队列
- promise
- mutationnObserver
- process.nextTick

promise会放到微任务队列里面
```js
setTimeout(function() {
  console.log(1)
}, 0)

// 形参value是undefined 因为 resolve() 里面没有值
Promise.resolve().then(value => {
  console.log(2)
})

console.log(3)

// 顺序 3 2 1
```

<br>

**注意:**  
微任务的优先级要 高于 宏任务 微任务队列里面执行完后会再去宏任务里面抓任务执行

<br><br>

# 定时器的任务编排:
系统里面有一个 定时器模块 专门记录定时器的, 当解析到定时器的代码部分的时候就会记录定时器, 当时间到的时候就会把任务放在队列当中等待下一次的轮询 把任务拿到主线程来执行 

那也就是说 <font color="#C2185B">当定时器的时间到了之后 才会将逻辑放到任务队列中</font> 等待下一次的轮询 会从任务队列中拿到主线程里面执行

```js
// 延迟时间位置即使是写0 其实也会4毫秒后执行
setTimeout(function() {
  console.log(1)
}, 4)       

console.log(3)  // 3 1
 ```

上面不会到时间了立刻输出 还是需要排队的 等待主线程里面的工作完成, 然后再去轮询队列 再把你取出来执行  

<br>

### 举例: 比如我们有一个定时器 那它是什么时间开始计时?
1. 等排队到它之后开始计时
2. 等主线程的任务完成之后开始计时?
3. 定时器模块记录的时候就开始计时?

<br>

**答案:**  
**当系统解析到定时器代码的时候 已经放入定时器模块里了 它已经开始计时了** 到时间后, 定时器模块会把任务放到任务队列里面 等主线程空了之后 直接拿过来直接执行

也就是所当解析到定时器代码的时候 开始计时 到点后放入任务队列 等主线程空了再取出来执行

<br>

### 假如我们有两个定时器   
**情况1: 都是2秒**
```js
setTimeout(function() {
  console.log(1)
}, 2000) 


setTimeout(function() {
  console.log(2)
}, 2000) 
```

<br>

定时器模块等定时器到时间后把它们从主线程放到任务队列里面, 主线程里面没有任务之后就从任务队列中取出任务执行

<br>

**特点: 队列的特点 先进先出**
```s
+---------+     队列前面
+   定1   +
+---------+
+---------+
+   定2   +
+---------+     队列后面

# 执行顺序 1 2
```

<br>

**情况2: 时间不同**  
```js
setTimeout(function() {
  console.log(1)
}, 2000) 


setTimeout(function() {
  console.log(2)
}, 1000) 
```

<br>

2会被先放到任务队列里面 1会被放到2的下面
```s
+---------+     队列前面
+   定2   +
+---------+
+---------+
+   定1   +
+---------+     队列后面
```

因为2的时间是1秒会先放入上面 2秒的1放到下面 2先进队列的 意味着2会先被输出  

<br><br>

# promise微任务处理逻辑: 
promise是微任务的代表
```js
// 情况1
setTimeout(function() {
  console.log('定时器')
}, 0)

new Promise(resolve => {
  console.log('promise')
  resolve()
})

console.log('console')

// 执行顺序  promise   console   定时器
```

<br>

**要点:**  
new Promise() 括号中的代码是会立即执行的 这个部分的代码是 **同步代码**

<br>

```js
// 情况2 我们给promise的后面加上一个then
setTimeout(function () {
  console.log('定时器')
}, 0)

new Promise(resolve => {
  console.log('promise')
  resolve() 
}).then(() => {
  console.log('then')
})

console.log('console')

// 执行顺序  promise   console   then   定时器
```

new Promise().then() 其中的then()会放到微任务里面  

<br>

```js
// 情况3 我们再在定时器里面加上 new Promise
setTimeout(function () {
  console.log('定时器')
  new Promise(resolve => {
    console.log('setTimeout promise')
    resolve()
  }).then(() => {
    console.log('setTimeout then')
  })
}, 0)

new Promise(resolve => {
  console.log('promise')
  resolve()
}).then(() => {
  console.log('then')
})

console.log('console')

// 执行顺序  promise console then 定时器 setTimeout promise setTimeout then
```

情况3中 是等setTimeout的宏任务被执行之后, 再往微任务里面放的

<br><br>

# 案例: 进度条
```js
function handle() {
  let i = 0;

  // 循环往任务队列抛定时器
  (function run() {
    setTimeout(run, 100)
  })()

}

handle()
```

我们先来看看上面的代码  

我们调用 handle() 函数, handle函数里面有一个立即执行函数会生成一个定时器

我们在定时器里面又调用了run函数 又生成定时器 周而复始

定时器不会马上执行 而是通过定时器模块放入到 宏任务队列里面
所以 就会往任务队列中不断的抛定时器任务

当我们主线程的代码执行完毕后这些任务就会依次的放入到主线程当中 依次执行

```js
function handle() {
  let i=0;
  (function run() {
    setTimeout(function() {
      console.log(i)      // 0
      run();              // 换个结构还原下上面的例子
    }, 100)
  })()
}
handle()
```

上面我们定义了变量 i=0 它是立即执行的代码(同步) 执行的时候就会在内存中创建数据, i=0

上面我们利用了闭包, 闭包的产生都是发生在嵌套函数中的 所以我们共享了这个闭包的变量 i

宏任务里面的任务最终都会被调入到主线程里面执行 **所以主线程中内存中的数据是可以享用的到的**

也即使说每一个定时器里面也可以读到这个i的

<br>
    
屏幕上会不断的打印 0000000000000

因为我们无休止的创建定时器, 每个定时器都能不断的打印i 读到i

因为队列里面的任务, 在主线程中执行, 数据是可以共享的(i在主线程中的内存里)

接下来我们不能无休止的往宏任务队列里面添加任务 来个条件

```js
function handle() {
  // 这个数据放在了函数体外 做为共享
  let i=0;
  (function run() {
    if(++i<=100) {
      console.log(i)
      setTimeout(run, 100)
    }
  })()
}
handle()
```

接下来我们看看进度条的实现原理

<br>

### 要点:
循环内部的条件的考虑方式

1. 停止循环的条件
2. 在哪个范围内持续的条件(返回来就是停止循环的条件)

<br>

**注意:**  
(function run() {})() 的前面一定要加上分号

```html
<style>
html, body {
  padding: 0;
  margin: 0;
  background-color: #bde0fe;
  height: 100vh;
}

.progress {
  width: 0%;
  height: 8px;
  background-color: #ffafcc;
}
</style>
<body>
  
<div class='progress'></div>
<div class="content"></div>
  
<script>
  const progress = document.querySelector(".progress")
  const content = document.querySelector(".content")
  function handler() {
    let i = 0

    ;(function run() {
      if(++i <= 100) {
        setTimeout(run, 1000)
      }
      progress.style.width = i + "%"
      content.innerHTML = i
    })()
  }

  handler()
</script>
```

我们创建了一个handle函数 里面包裹了立即执行函数run 

run函数里面创建了定时器 定时器中又会执行run函数, 这样就会不断的往宏任务队列中抛任务 该任务会在主线程中没有任务后调入到主线程中执行

在run函数外层 我们创建了 ``let i=0`` 因为是外层是自己执行 相当于在主线程的内容里面创建了一个变量, 因为宏任务之后也会调入主线程中执行 所以该数据是共享的

在run函数中不断的往div中输出数字 不断的改变长度, 同时我们还加上了终止的条件

这就是进度条的原理 注意一点 ++i 得让1自增 要不就没有变化

<br><br>

# 案例: 将主线程耗时任务拿到任务队列中完成
将复杂的任务拆分成一个个的小任务
```js
let num = 98765
let count = 0

function hd() {
  for(let i=0; i<num; i++) {
    count += num--
  }
  console.log(count)
}
hd()

console.log('laoshi')
// 打印结果  数字  laoshi
```

上面的代码中 我们定义了一个num 让它在hd函数中不断的相加直到num为0  

当上面的数字太大的时候, console的语句就得等hd执行完毕 才能得到执行

**假如我们想让console语句先执行 至于相加的操作你以后再执行 不要影响console的输出那么应该怎么做?**

```js
let num = 98765
let count = 0

// 我将要计算量大的整个逻辑放在一个函数里面 然后在合适的条件的位置 将这个函数放到setTimeout里面去执行
function hd() {
  for(let i=0; i<num; i++) {
    if(num <= 0) break
    count += num--
  }

  // 因为num-- 但是同时i++ 所以if中确实是最后一次num
  if(num > 0) {
    // 当最后一次num的时候我们将函数丢到任务队列中执行
    setTimeout(hd)
  } else {
    console.log("count:", count)
  }
}
hd()
console.log('laoshi')
```

<br>

### 要点:
hd函数是用来做累加操作的 我们在hd函数里面执行定时器 在定时器里面再次执行hd

整个的过程又是在不断的往宏任务队列里面抛任务 这样就把主线程让出来了 会先打印老师

<br>

**总结:**  
同步执行的时候 上面的代码如果计算量太大 那么就会阻塞下面代码的执行 所以这时候我们就可以将计算量大的部分拿到宏任务队列里面去执行 把主线程让出来

<br><br>

## 优化: 使用promise解决上面的问题
我们希望把数字的累加的过程在异步来完成而不是同步

```js
let num = 99999
let count = 0

function hd() {
  for(let i=0; i<num; i++) {
    count += num--
  }
  console.log(count)
}


function handle() {
  return new Promise(resolve => {
    setTimeout(
      resolve(hd)
    )
  })
}

handle().then(res => {
  res()
})

console.log('laoshi')
```

<br><br>

# 调用栈: 
event loop开始时 会从全局代码一行一行的执行

**遇到函数调用** 会把它压入调用栈中 被压入的函数叫做帧 frame, 当 **函数返回后会从调用栈里面弹出**

<br>

比如这段代码:
```js
function func1() {
  console.log(1);
}

function func2() {
  console.log(2);
  func1();
  console.log(3);
}

func2();
```

上面的代码中会先执行 func2(), 它在执行时的过程如下:

```s
>> 7 然后func2执行完毕 - 弹出整个调用栈被清空  

>> 6 console.log(3) - 最后console.log(3)压入调用栈中  --  打印出3(弹出)  

>> 5 然后func1执行完毕 -- (弹出)  

>> 4 console.log(1) - 去执行func1中代码, console.log(1)被压入栈 -- 打印出2(弹出)  

>> 3 func1() - 然后依次执行到func1() 把它压入调用栈中  

>> 2 console.log(2) - 遇到console.log(2) 把它再压入调用栈中  -- 打印出2(弹出)  

>> 1 func2 - 会先把func2压入调用栈中 执行它里面的代码
```

<br>

js中的延时定时器等异步任务(回调)会进去到消息队里中, 在**调用栈被清空后依次压入调用栈执行** 

也就是说回调函数等会在消息队列 等调用栈清空后 被拿出执行

```js
function func1() {
  console.log(1);
}

function func2() {
  setTimeout(function(){
    console.log(2);
  },1000)

  func1();
  console.log(3);
}

func2();

// 最后结果 1 3 2
```

这段代码在执行时:  

func2()  

会先把func2压入调用栈中 执行它里面的代码  

遇到setTimeout 会将它放入到消息队列  

然后执行func1() 里面的代码  

func1()执行完毕后弹出  

然后执行console.log(3) 执行完弹出  

此时调用栈为空 现在开始从消息队列中取出 setTimeout开始执行

消息队列会在调用栈被清空的时候再执行 这也是setTimeout的延迟参数只是最小的延迟时间

当调用栈的任务队列清空后, 消息队列的任务会被压入调用栈中 最后打印出2

<br>

使用promise创建的异步任务会添加到微任务队列中, 它会在调用栈被清空后立即执行, 并且处理期间新加入的异步任务也会一同执行  
微任务队列 先执行 完毕后 再执行消息队列中的任务

例如下面代码: 
```js
let p = new Promise(resolve => {
  console.log(4)
  resolve(5)
})

function fun1() {
  console.log(1);
}

function fun2() {
  setTimeout(function() {
    console.log(2)
  }, 1000)

  fun1()

  console.log(3)

  p.then(res => {
    console.log(res)
  }).then(() => {
    console.log(6)
  })
}

fun2()

// 4 1 3 5 6 2
```

1. let p = new Promise 开始执行因为当中是同步代码首先输出 4  

2. fun2()开始执行 运行其内部逻辑 setTimeout 会被放在消息队列

3. fun1()开始执行 输出1 弹出调用栈

4. console.log(3) 输出3 弹出调用栈

5. 微任务队列开始执行 输出 5 6 弹出

6. 调用栈空了之后 轮询消息队列中的 setTimeout 执行2

<br><br>

# 宏任务 和 微任务

**场景:**  
比如我们去银行排队办理业务 到我了之后 我会跟银行的工作人员说我的存款需求 这时我又额外有个需求想办理一张信用卡 

银行为了客户体验并不会让我去队尾重新排队 而是直接帮我办理了

<br>

排队的人 就是 **宏任务**  

宏任务在执行过程中可以临时加上一些额外的需求 对于这些额外的需求可以选择做为一个新的宏任务进到队列中排队

相当于我们重新叫号去队尾排队 就类似setTimout 重新去任务队列中进行排队

我们也可以选择当前任务的 **微任务**  

它会在当前任务结束过后立即执行 相当于 银行柜员直接帮我处理了临时的额外需求 而不是到整个队伍的末尾重新排队

Promise的回调会作为微任务执行的 会在本轮任务的末尾自动执行

```js
console.log("start")

setTimeout(() => {
  console.log("timeout")
}, 0)

Promise.resolve().then(() => {
  console.log("promise")
})

console.log("end")


// start end promise timeout
```

这就是为什么最后才打印 setTimeout 的原因 settimout是以宏任务的形式进入到回调队列的末尾(重新排队)

<br>

微任务对象: promise process.nextTick ObserveMutation

<br><br>

# 异步编程
js中只有一个线程来干活, 比如请求数据 如果是单线程的那就要等待后台去响应数据

如果后台的代码效率不高 前端就可能等好长的时间 那能不能同时呢?  

js不行 js就是单线程的

比如我一天的工作有 打扫卫生, 洗衣服, 做饭 就我一个人干(单线程)

那么我打扫卫生(1小时) - 洗衣服(1小时) - 做饭(1小时) 

那好 我找一些人安排下 a帮我打扫卫生, b帮我洗衣服, c做饭 这种模式就是(多线程)

<br>

### 那为了解决上面的需求怎么办?
我们可以将 做饭交给 <font color="#C2185B">电饭锅模块</font>, 电饭锅模块 做好饭后放在宏任务队列里面 滴一声通知你

洗衣服交给 <font color="#C2185B">洗衣机模块</font>    
洗衣机模块洗好了后放在宏任务队列里面 滴一声通知你

然后我洗完衣服之后了, 去宏任务队列里面轮询(看看什么好了) 拿到主线程处理(放桌子)

以上解决了我**作为一个单线程不会出现阻塞的问题**

<br>

请求后台数据也一样 我们不能等它 因为这个时间可能很长, 比如定时器延时5秒 我们也不能等这个5秒再去做其他的事情

所以 我们把请求数据交给 <font color="#C2185B">数据请求模块</font>, 定时器交给 <font color="#C2185B">定时器模块</font>

你们处理完各自的任务后把结果让在任务队列里面 我主线程做完东西之后 我去任务队列里面去轮询(去找有没有新的任务)

所以我们的js就是周而复始的去任务队列里面找这个任务 提高我们的效率 防止出现阻塞的问题

<br><br>

## 案例: 异步加载图片
整个加载图片的过程其实是比较慢的 所以这个加载图片的任务就会交给一个模块去处理 (加载这个操作也是异步的呗)

所以如果代码如下我们会发现先打印的会是sam  
```js
function loadImage(src) {
  let image = new Image();
  image.src = src
}
loadImage()

console.log('sam')
```

<br>

既然图片加载会比较慢, js会把文件加载的任务也会交给 <font color="#C2185B">文件加载模块</font> 来处理

处理完毕后 放在任务队列里面 主线程的任务完成之后去轮询任务队列

<br>

### 加载图片的执行过程:
- 系统会先执行 loadImage() 函数 会把文件加载的函数交给 <font color="#C2185B">文件加载的模块</font> 模块处理完成之后 就会把结果放在 任务队列 里面

js开始从下到下执行 执行完 ``console.log('sam')`` 就会轮询任务队列 然后就会刨除图片加载成功的结果

<br>

类似resolve和reject的执行逻辑
```js
/*
  src      用来告诉我们加载哪一张图片
  resolve  图片加载完成之后的处理函数 回调
*/
function loadImage(src, resolve, reject) {
  let image = new Image();
  image.src = src

  // image.onload = resolve 修改一下 把结果传递出去 让外面的函数处理结果
  image.onload = () => {
    resolve(image)
  }

  image.onerror = reject
}


loadImage('./upload/focus1.jpg', 
  (image) => {
    document.body.appendChild(image)
  }, 
  () => {
    console.log('图片加载失败');
  }
);
console.log('sam');
```

<br><br>

# 异步处理当中的任务排列
任务队列里面是先进先出, 谁先放进去的干谁的活  

我们看下下面的情况 我们定义了两个js文件 hd.js 和 houduanren.js
```js
// hd.js文件中的代码
function hd() {
  console.log('hd.js');
}

// houdunren.js中的代码 houdunren 的函数体里面 依赖于 hd
function houduren() {
  hd();
  console.log('houdunren.js')
}
```

我们能看到 houdunren.js 是依赖 hd.js 的 如果没有加载hd.js直接运行 houdunren.jd会报错  

```
hd is not defind
```

所以在运行这两个js文件的时候 我们一定要确保 hd.js是先加载的 而 houdunren.js 是后加载的

```js
// 我们定义一个加载函数
function load(src, resolve) {
  let script = document.createElement('script)
  script.src = src

  // 当script加载成功后 执行resolve
  script.onload = resolve
  document.body.appendChild(script)
}


// 我们先看下下面的情况
load('./js/hd.js', () => {
  hd()
})

load('./js/houdunren.js', () => {
  houdunren()
})

console.log(123)
```

首先说下console.log的问题 它肯定是最先打印的 因为是在主线程里面 只有主线程的任务执行完毕才会轮询任务队列

而文件加载会交给文件加载模块, 当加载完毕后会抛给任务队列 然后主线程的任务完成后 开始轮询任务队列, 输出hd()的结果

但是我们直接像上面那样写两个加载js文件的函数, 并不能保证hd.js会先进入任务队列被先加载, 而是看这两个js文件谁快 谁快谁先进

所以可能会报 ``hd is not defined`` 的问题 如果这两个js文件分布在不同的服务器上的话 这个问题暴露的可能性就会越高

为了解决上面的问题 我们必须保证先加载hd.js 然后再加载houdunren.js

所以我们要这样操作 嵌套 
```js
load('./js/hd.js', () => {
  load('./js/houdunren.js', () => {
    houdunren()
  })
})
```

我们先执行加载hd.js的任务, 加载完成后将hd.js放到任务队列里面 然后再来执行加载houdunren.js的任务

houdunren.js加载完成后再把该任务放在任务队列里面 也就是说 等执行houdunren.js的时候前面都加载完了

<br>

我们把上面的案例封装成promise
```js
function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement(script)
    script.src = src

    script.onload = () => {
      resolve(script)
    }

    script.onerror = reject
    document.body.appendChild(script)
  })
}

loadScript('./js/hd.js').then(script => {
  console.log(script)  // <script src='hd.js'></script>

  // 在这里我们再继续加载houdunren 因为上面的hd.js已经加载完了
  loadScript('./js/houdunren.js').then(script => {
    // 这里就可以执行houdunren.js
    houdunren()
  })
})


// 上面还是嵌套 我们这么写
loadScript('./js/hd.js')
  .then(script => {
    return loadScript('./js/houdunren.js')
  })
  .then(script => {
    houdunren()
  })
```

<br><br>

# Promise微任务处理机制
我们举一个肯德基的例子  

- 同步的概念就是 我点餐后 要10分钟做好 我要站在那等10分钟  
- 异步的概念就是 我点餐完 去椅子上等待 等待广播叫我 我再去取  

接下来我们看下promise

<br><br>

## promise的三种状态: 
1. ``<pending> `` 准备阶段
2. ``<fulfilled>`` 成功状态
3. ``<rejected>`` 拒绝状态

```js
new Promise((resolve, reject) => { }) 

// 上面的代码 就相当于 肯德基在准备给我们做餐 所以 这时候我们打印
console.log(new Promise((resolve, reject) => { }));
// 结果: <pending>
```

- 当调用resolve()的时候就是 成功状态 ``<fulfilled>``
- 当调用reject() 的时候就是 拒绝状态 ``<rejected>``

.then() 方法就是处理 成功 或者 失败的状态 它有两个回调函数 其实核心还是一样的 但是结构上来看更加的清晰了

<br>

### 微任务队列: 
对于promise来讲 还有一个队列 这个队列叫做 微任务队列  

当then()中的方法放入到微任务队列当中 当事件轮询的时候就会把微任务队列中的任务拿到主线程去执行 

与宏任务队列相比 会以 微任务队列为主

<br>

**扩展:**  
new Promise的主体部分是同步的, then的部分是异步的

<br>

# 宏任务与微任务执行顺序
在Promise构造函数的代码也是同步执行的: 
```js
// 1. 定义一个定时器 宏任务
setTimeout(() => {
  console.log('setTimeout');
}, 0)


// 定义一个promise 主体中的代码是同步的, then中的是微任务
new Promise((resolve, reject) => {
  console.log('promise')
  resolve();
  
}).then((value) => {
  console.log('then 成功')
})

// 定义一个同步
console.log('sam')

// 打印顺序: promise  -sam  -then 成功  -setTimeout
```

执行到then的时候 会将then中的处理逻辑放入到微任务中 等待主线程内的任务执行完毕开始轮询微任务队列

<br><br>

# promise 单一状态 与 状态中转

### promise中状态是不可逆的:
如果在promise构造函数中已经先调用的 resolve 那么状态就是成功 即使在resolve的下面我们又调用了reject也没有用, 执行的还是then中的第一个回调

因为我们第一次 调用 resolve() 后 已经把then放到了微任务里面了 已经上路了 也不能撤销了

如果 我们 resolve(p1) p1是一个别的promise对象, 那么别的promise对象的结果决定着我们执行then()中的第几个回调

<br>

# Promise.then 也是一个Promise
我们看看promise主体 和 then之间的关系
```js
let p1 = new Promise((resolve, reject) => {
  // 这里就相当于干活的人 

  // 如果这里一直没有发通知, then中就会一直在等待

  // 除非我发个通知 resolve('一瓶水')
})

p1.then(
  // 干完活需要交给then 看看满意不满意 在这里我们会接到一个值, 就相当于我们让别人去买瓶水 这里就会接到一瓶水
)     
```

上面我们知道 then是对上面promise状态的改变的一个处理
每一个 then() 返回的也是一个promise

```js
let p1 = new Promise((resolve, reject) => {
  resolve('一瓶可乐')
})

p1.then((value) => {
  console.log(value)    // 一瓶可乐
})


// 每一个then其实也是一个promise, 我们把p1赋值给p2
let p2 = p1.then((value) => { 
  console.log(value)    // 一瓶可乐
})

console.log(p2)   // <pending>
console.log(p1)   // <resolved>  '一瓶可乐'

// p1 是一个对构造函数中的处理 p2 是一个新开的promise 这个新开的promise会被放在微任务中, 等待主线程的任务执行完毕在去微任务里面轮询
```

假如我们.then().then() 最后一个then()是对上一个promise的处理

<br><br>

# Promise.then 返回值的处理技巧
```js
let p1 = new Promise((resolve, reject) => {
  resolve('fulfilled')
}).then(
  value => console.log(value)
  reason => console.log(reason)
);

// 解析一下上面的代码 p1的构造函数里 我们返回的是成功的状态 resolve('fulfilled') 里面的值就交给then来处理 上面也分析了 上面代码中的.then()也是一个promise

let p1 = new Promise((resolve, reject) => {
  resolve('fulfilled')
}).then(

// 因为第一个then()也是一个promise 默认返回的就是成功状态 如果这里返回的是一个普通的值的话 那么下一个then()就会接到
value => return 'houdnren'


).then(
  // 因为第一个then也是一个promise对象 默认是成功 所以这个then里面会执行第一个回调函数 打印成功的结果
  value => console.log(value)     // houdnren
);
```

为什么要像上面这样设计呢? 

比如 有的时候 第一个任务是从后台抓取用户资料, 第二个任务是根据用户信息再把他所学的课程抓过来 有的时候是需要一步步的往下走的 这就是then存在的价值

<br>

### 应用场景:
上面第一个then()中返回的是一个普通的值 如果第一个then()中返回的是一个promise对象
```js
  let p1 = new Promise((resolve, reject) => {

    resolve('fulfilled')

  }).then(
    value => {
      return new Promise((resolve, reject) => {
       //  第一个then中返回的是一个Promise
      })
    }
  ).then(
    // 那么第二个then中就是对第一个then中的promise的处理
  )
```

如果第一个then()方法中返回的是一个普通的值 那么默认返回的就是成功时候结果 在第二个then()方法中 可以在其第一个回调内部接收到
```js
let p = new Promise((resolve, reject) => {
  resolve("hello")
})

p.then(val => {
  console.log(val)

  // 返回了一个普通的值
  return val
})
  .then(val => {
    // 上面一个因为返回的是普通纸 默认会在成功的回调里面获取结果
    console.log(val)
  })
```

如果第一个then()方法中返回的是一个promise对象 那么第二个then()就是对前面的then()传出的promise对象的处理

但是第一个then中的promise中没有调用resolve和reject也就是还没有进行处理 也就是准备状态(``<pending>``)所以第二个then中一直在等待 等待第一个then中的promise的完成

也就是 比如 p1 主体的promise中 是获取用户信息 然后走到了 第一个then中 就能拿到value  

然后根据value再从后台抓取用户的课程 在抓取用户的课程中 第二个then是不处理的 除非我们在第一个then中调用的resolve代表处理完了  

那么第二个then就是对第一个then中的promise的处理 第二个then中的value就是用户的课程


**注意:**  
第一个then中得return出来promise

```js
  let p1 = new Promise((resolve, reject) => {

    resolve('fulfilled')

  }).then(
    value => {

      // 这里得return出来 
      return new Promise((resolve, reject) => {})
    }
  ).then( )
```

只有第一个then中return出来 第二个then才是对第一个then中return出来的promise的处理  

如果不加return 那么 第二个then就是对第一个then的处理(因为then本身也是一个promise), 因为第一个then的promise前面没有return 它就是一个独立的promise


**总结:**  
后面的then就是对前面返回的promise的处理

<br><br>

## 使用Promise封装AJAX异步请求: 
上面我们使用promise都是直接写的 它会立刻执行然后交给then方法来进行处理
```js
new Promise((resolve, reject) => {
  resolve('成功')
}).then(value => console.log(value))
```

但是实际上我们不会让它立即执行 一般我们都是将它封装成函数 来进行调用
```js
function request() {
  return new Promise((resolve, reject) => {
    resolve('成功')
  })
}

request().then(value => console.log(value))
```

ajax的封装也是一样的
```js
function ajax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function() {
      if(this.status == 200) {
        resolve(JSON.parse(this.response))
      } else {
        reject('加载失败')
      }
    }
  })
}

ajax(url).then(value => console.log(value))
```

<br><br>

# 案例: 使用finally实现异步加载动画
finally它无论成功还是失败都会执行

也就是说不管promise最后的状态如何 在执行完then或者catch指定的回调函数后 后会执行finally方法指定的回调函数

在我们异步请求任务的时候肯定会费时间 这段时间里我希望有动画加载的效果

finally的参数是一个回调
```css
div {
  width: 100px;
  height: 100px
  background: red
  color:#fff

  /* 默认的时候是隐藏的 */
  display:none;     
}
```

```html
<div>Loading...</div>
```

```js
function ajax(url) {

  // 当发送ajax的时候 显示出来 loading div
  document.querySelector('div').sytle.display ='block'

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function() {
      if(this.status == 200) {
        resolve(JSON.parse(this.response))
      } else {
        reject('加载失败')
      }
    }
  })
}


ajax('url').then(这里对数据进行处理).finally(这里让元素再消失 div.style.display:none)


// 自己做的案例
let div = document.querySelector('div')
let btn = document.querySelector('button')
btn.addEventListener('click', function() {

  new Promise((resolve, reject) => {
    div.style.display = 'block'
    setTimeout(function() {
      resolve('数据读取成功')
    }, 6000)
    
  }).then(value => console.log(value)).finally(() => {
    div.style.display = 'none'
  })

})
```

<br>

**参考案例2:**
```js
function ajax(url) {

  $("body")[0].style.background = "pink"

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open("get", url)
    xhr.send()
    xhr.onload = function() {
      if(this.status == 200) {

        // 模拟请求数据的时间较长
        setTimeout(() => {
          resolve(this.response)
        }, 1000)
      } else {
        reject("加载失败")
      }
    }
  })
  
}

ajax("./img/51636690825_.pic_hd.jpg").then(res => {
  console.log("读取图片")
  console.log(res)
}).finally(() => {
  console.log("finally")
  $("body")[0].style.background = "blue"
})
```

<br><br>

## 案例: Promise加载图片
我们可以在图片加载完成后对图片进行二次处理
```js
  function loadImage(src) {
    return new Promise((resolve, reject) =>{
      const image = new Image()
      image.src = src
      image.onload = () => {
        resolve(image)
      }

      image.onerror = reject

      document.body.appendChild(image)
    })
  }

  // 这里能得到加载后图片的对象, 比如加载完成后 再对图片进行处理
  loadImage('img/links/1.jpg').then((image) => {
    image.style.border = '1px solid red'
  })
```

<br><br>

## 案例: Promise.resolve 缓存后台数据
```js
  Promise.resolve('后盾人').then(value => {     // <resolved>
    console.log(value)
  })
```

有的时候我们在写单页面复应用的时候, 我们会在不同的组件里面可能会请求同一个数据, 既然是同一个数据 那么我希望走本地的缓存 

不要反复的请求后台 减少请求次数 减少服务器的压力 前台用户的访问也会变快

```js
// name 请求的用户 请求谁
function query(name) {
  return ajax('url').then(user => {   // users就是请求的数据
    return user
  })
}

// 使用封装的query函数 请求 后盾人
query('后盾人').then(user => {
  console.log(user)
})


// 现在有还有一个 1秒钟后的请求  但是 我不希望这个请求还要从后台读取 我希望它走缓存
setTimeout(() => {
    query('后盾人').then(user => {
    console.log(user)
  })
}, 1000)

```

我们先铺垫一个前提, 函数也是对象 我们也可以往函数中添加属性
```js
// 1. 我们创建一个空函数, 
function hd() {} 

// 2. 函数也是对象, 所以也可以添加属性
hd.site = 'slnn2080.com'
console.dir(hd)   // 里面有我们添加的site属性
```

修改上面的函数
```js
function query(name) {

  // 定义缓存 我们先看看函数中有没有定义的缓存 如果没有这个属性就给它加上 是一个map类型
  const cache = query.cache || (query.cache = new Map())

  // 每次取的时候 我们要检查一下 在我们的缓存中是否有这个数据 如果有直接返回出去
  if(cache.has(name)) {

    // 返出去一个成功状态的promise
    return Promise.resolve(cache.get(name))
  }

  return ajax('url').then(user => {   // users就是请求的数据

    // 当我们取完数据的时候 就把数据压入map中
    cache.set(name, user)   // key就是name 值为user
    return user
  })
}
```

走缓存了 实际上是没有发生异步请求的 因为return的是if里面的  

还有一个需要注意地方 因为下面的ajax的请求是异步的 需要花费时间, **所以直接走缓存的时候 还没有取到数据 所以我们再调用的时候, 要加个延时定时器 确保先取到数据 之后再走缓存**

确保从后台拿完数据再走缓存
```js
setTimeout(() => {
    query('后盾人').then(user => {
    console.log(user)
  })
}, 1000)
```

<br><br>

# async 与 await 语法糖
体验一下 promise的语法糖 享受一下甜甜的感觉
我们先复习一下 promise 怎么写
```js
new Promise((resolve, reject) => {
  console.log('后盾人');

  // 改变状态后 就会走then方法
  resolve('houdunren.com')
}).then(value => console.log(value))

// 上面是通过promise创建出来的对象, then是都状态改变的处理
```

我们在函数的前面加上 async 就类似于一个promise
```js
async function hd() {}
console.log(hd())       // Promise <resolved>

// 函数前加上async 就是promise已解决的状态 那按道理来讲

async function hd() {
  return 'houdunren.com'
}

// 既然async返回的是一个promise的成功状态 我们函数调用的后面就应该可以加上then
hd().then(value => console.log(value))


// 上面就是使用 async 创建的 Promise 主体部分的语法糖(成功状态下的语法糖) 我们再来看看 then 的语法糖 await

async function hd() {
  let name = await 'houdunren.com'
  console.log(name)
}

// await就相当于then 比如: 第一个then返回一个promise对象, 第二个then会接收到前一个promise对象的值
.then(v => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('后盾人')
    }, 2000)
  })
})
.then(v => {
  console.log('后盾人')     // 第二个then就能取到第一个then中promise的结果
})

// 就相当于使用await 就是then的简写
async function hd() {
  // 它返回了一个结果 我们就let name来接收
  let name = await 'houdunren.com'   
  console.log(name)
}
```