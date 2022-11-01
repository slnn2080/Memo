# 回调
我们可以用 setTimeout 来模拟  
setTimeout会立即执行 而我们传入的回调会在预定的时间后执行

```js
setTimeout(() => {
  console.log("setTimeout")
}, 2000)

// 上面执行完 setTimeout 后会立刻执行 console.log 代码
console.log("主线程")
```

回调函数简单好理解 但是有一个问题 如果我们需要依次执行多个异步操作 我们可能会写成这样  

**提示:**  
一个setTimeout中相当于一个作用域 这个作用域中的代码 会再次有同步和异步的概念

```js
setTimeout(() => {
  console.log("先执行这个")

  setTimeout(() => {
    console.log("再执行这个")

    setTimeout(() => {
      console.log("最后再执行这个")
    }, 2000)

    console.log("2层setTimeout中的同步逻辑")
  }, 2000)

  console.log("1层setTimeout中的同步逻辑")
}, 2000)
```

但是这样可读性会变的非常的差 这种情况也叫做<font color="#C2185B">函数的回调地狱</font>  
为了解决这个问题 promise 就应运而生了 promise就是承诺 承诺会在某个时刻返回数据

<br><br>

# Promise
ES6中一个非常重要和好用的特性就是Promise, 它是异步编程的一种解决方案  

<br>

## 那什么时候我们来处理异步事件呢?
一种很常见的场景应该就是网络请求, 我们封装一个网络请求的函数, 因为不能立即拿到结果, 所以不能像简单的3+4=7一样将结果返回, 所以往往我们会传入另一个函数, 在数据请求成功时, 将数据通过传入的函数回调出去,  

如果只是一个简单的网络请求, 那么这种方案不会给我们带来很大的麻烦, 但是当网络请求非常复杂的时候, 就会出现回调地狱 

<br>

## 简单的promise 和 普通的异步回调对比(回调地狱):
我们拿延时定时器当做异步任务(网络请求), 拿里面的console做为对请求回来的结果做处理的逻辑代码
```js 
// 网络请求
setTimeout(() = {

  // 对响应结果做处理的逻辑代码
  console.log('我是内部处理数据的逻辑')
  console.log('我是内部处理数据的逻辑')
  console.log('我是内部处理数据的逻辑')
})
```

<br>

接下来我们看下发Ajax中的回调地狱, 下面只有3次回调, 如果出现10次甚至更多的时候会变成什么样子
```js 
$.ajax({
  url:'xxx',
  dataType: 'json',
  success(data1) {
    $.ajax({
      url:'xxx',
      dataType: 'json',
      success(data2) {
        $.ajax({
          url:'xxx',
          dataType: 'json',
          success(data3) {
              // 完事了
          },
          error() {
            alert('错了');
          }
        })
      },
      error() {
        alert('错了');
      }
    })
  },
  error() {
    alert('错了');
  }
})
```

<br>

接下来我们利用promise对上面的异步任务(网络请求)进行下封装
```js 
new Promise((resolve, reject) => {
  
  // 第一次网络请求
  setTimeout(() => {
    resolve();
  }, 1000)
}).then(() => {

  // 对第一次的请求结果进行处理
  console.log('我是内部处理数据的逻辑')
  console.log('我是内部处理数据的逻辑')
  console.log('我是内部处理数据的逻辑')

  // 我们可以再返回一个Promise对象对第一次的返回结果里面的回调进行二次promise封装
  return new Promise((resolve, reject) => {

    // 第二次网络请求
    setTimeout(() => {
      resolve();
    }, 1000)
  }).then(() => {

    // 对第二次的请求结果进行处理
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')

    // 继续返回promise对象, 再次封装
    return new Promise((resolve, reject) => {

      // 第三次网络请求
      setTimeout(() => {
        resolve();
      }, 1000)
    }).then(() => {

      // 对第三次的请求结果进行处理
      console.log('我是内部处理数据的逻辑')
      console.log('我是内部处理数据的逻辑')
      console.log('我是内部处理数据的逻辑')
    })
  })
})
```

<br>

利用的promise解决回调地狱的问题
```js
fetch("http://localhost:3000")
  .then(res => res.json())
  .then(json => console.log(json))
```

上面 promise 通过 then 解决了回调地狱的问题  即使我们有很长的链 代码也是向下方增长 并不是向右
```js
fetch("http://localhost:3000")
  .then(res => res.json())
  .then(json => console.log(json))    ↓
  .then()
  .then()
  .then()
  // 处理上面链上发生的错误
  .catch(err => console.log(err))
  // 收尾工作
  .finally(() => console.log("完成清理工作"))
```

这点和同步中使用的 try catch 很类似
同时 promise 还提供了 finally() 方法 它会在promise链结束后调用 无轮失败与否 我们可以在 finally 中做一些清理的工作

<br>

### **总结:**  
我们可以清晰的观察到首先我们使用promise避免了回调地狱  

其次逻辑特别的清晰, 网络请求的部分都在promise对象里, 对请求返回的结果都在上一次promise对象中的网络请求所对应的then()放法里

promise对网络请求的代码 和 处理请求回来的数据的代码做了分离, 这就是链式编程

<br>

## 异步操作有哪些:
- fs 文件操作
- 数据库操作
- ajax
- 定时器

<br>

## Promise优点:
- 支持链式调用, 可以解决回调地狱的问题
- 指定回调函数的方式更加的灵活

<br>

## Promise的使用:  

### **创建 Promise:**
**<font color="#C2185B">new Promise((resolve, reject) => {}): </font>**  

<br>

### 参数:
**resolve:**  
成功的时候调用resolve函数

**reject:**  
失败的时候调用reject

一旦我们在Promise内部异步任务里调用resolve()方法, Promise的最后就会对应有then()方法来对成功的结果进行处理  
一旦我们再Promise内部异步任务里调用reject()放法, Promise的最后就会对应有catch()方法来对错误信息进行处理

```js 
new Promise((resolve, reject) => {

  // 我们把异步任务放在这里, 而请求回来的数据, 对数据处理的逻辑放在then中

}).then(() => {
  
  // 这里对处理异步任务的逻辑
})
```

<br>

### **总结:**
也就是说promise对象, 把异步任务的请求 和 处理结果进行了分离
```js 
new Promise((resolve, reject) => {

  // 异步任务(网络请求)
  setTimeout(() => {

    // 当成功的时候 我们要处理获取的请求结果, 并对请求结果进行处理, 我们调用resolve方法, 在这里我们获取的结果, 传递给then方法, 在then里进行
    resolve(data)

    // 当失败的时候, 我们调用reject()方法, 将错误信息传递给处理错误信息的地方
    reject('err msg')

  }, 1000)

// 接收的resolve传递过来数据
}).then((data) => {
  
  // 我们在这里对获取的数据做处理

}).catch((err) => {

  // 我们在这里对错误信息进行处理

})
```

<br>

### **推荐:**  
针对链式调用的话 我们应该使用 catch 的方式 因为 promise上任何的异常都会向后传递直至被捕获 这种方式就是给整个promise链条设置的错误处理回调

<br>

# unhandledrejection 事件
注册在 window 身上的事件 全局<font color="#C2185B">为没有捕获到的异常做处理</font>

**全局捕获不推荐使用 正确的方式是在代码中明确的捕获每一个可能发生的异常 而不是交给全局统一处理**

```js
window.addEventListener("unhandledrejection", e => {
  const {reason, promise} = e
  // reason: promise失败的原因 一般是一个错误对象
  // promise: 出现异常的promise对象

  e.preventDefault()
})


// node环境下
process.on("unhandledRejection", (reason, promise) => {
  console.log(reason, promsie)
})
```

<br><br>

# Promise三种状态: 
首先, 当我们开发中有异步操作时, 就可以给异步操作包装一个Promise, 异步操作之后会有三种状态

**1. pending**   
等待状态, 比如正在进行网络请求或者定时器没有到时间

<br>

**2. fulfill**   
满足状态, 当我们主动回调了resolve时, 就处于该状态, 并且会回调.then()

<br>

**3. reject**   
拒绝状态, 当我们主动回调了reject时, 就处于该状态, 并且会回调.catch()

<br>

## Promise处理错误的两种情况:
原理和内部的流程都是一样的 只是书写格式不一样

<br>

### **方式1:**
通过 **catch** 来处理程序中出现的异常 或 reject 或 抛出的错误
```js
new Promise((resolve, reject) => {

}).then().catch()
```

<br>

### **方式2:**
我们还可以在then方法中传入两个函数, 当成功的时候会执行第一个回调, 当失败了会执行第二个回调
```js
new Promise((resolve, reject) => {

}).then(函数1, 函数2)
```

<br>

### **catch 和 then 方法中的第二个回调的说明:**

**then():**   
then()方法中的第二个回调是给上一个promise处理错误的 比如
```js
let p = new Promise((resolve, reject) => {
  throw "new Promise error"
})

p.then(
  res => {
    console.log(res)

    // 比如我们在这里抛出异常 第二个回调是接收不到的
    throw "error"
  },

  // 它能接收到 new Promise 里面的错误 而接收不到 第一个回调中抛出的错误 
  err => console.log(err)
)
```

<br>

**catch():**   
而 catch 是异常和错误的传递 catch就用来兜底的 也就是说任何then中抛出的错误都可以在catch中进行处理

<br>

# Promise链式调用: 

## .then().then():
当我们调用 resolve 或者 reject 的时候 会转换promise的状态，这时我们就可以通过.then的方式 来处理它们传出的状态

每一个.then是对上一个then中promise的处理
```js 
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa');
  }, 1000)

})
  .then((data) => {
    // 1. 自己处理的10行代码
    console.log(data, '第一层的10行处理代码')

    return new Promise((resolve, reject) => {
      resolve(data + '111');
    })
  })
  .then((data) => {
    console.log(data, '第二层的10行处理代码');

    return new Promise((resolve, reject) => {
      resolve(data + '222');
    })

  })
  .then(data => {
    console.log(data, '第三层的10行处理代码');
  })
```

<br>

## 由 Promise Api开启的链式调用:
上面的链式调用我们是通过return new Promise((resolve, reject) => {})来实现的而我们new Promise的目的就是为了使用回调函数中的resolve函数, 所以Promise干脆提供了一个Api

<br>

### **<font color="#C2185B">Promise.resolve(): </font>**  
将给定数据包装成Promise对象, 它返回的就是一个Promise, 我们可以在then中拿到结果

属于是 new Promise(resolve => { resolve() })的简写形式

<br>

### **特殊情况:**  

**情况1:**   
如果我们传递进的是 一个promise 对象 则promise对象会原样返回
```js
Promise.resolve(promise对象)
```

<br>

**示例:**
```js
let promise = ajax("/api/users.json")
let promise2 = Promise.resolve(promise)

promise == promise2  // true
```

<br>

**情况2:**   
如果我们传递进的是一个对象 该对象中也有then方法也能指定成功和失败的回调 则回调会在下一个方法中被执行
```js
// 传递一个对象 对象中有 then 方法
Promise.resolve(
  {
    then: Fn
  }
)

Promise.resolve({
  then: function(onFulfilled, onRejected) {
    onFulfilled("foo")
  }
})

// 可以在这个then中接收到
.then(val => console.log(val))
```


<br>

### **<font color="#C2185B">Promise.reject(): </font>**  
将数据包装成Promise对象 是 new Promise(reject => { })的简写
```js
Promise.reject(new Error("rejected"))
.catch(function(err) {
  console.log(err)
})
```

<br>

**示例:**
```js 
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa');
  }, 1000)
}).then((data) => {
  console.log(data, '第一层的10行处理代码')

  // 使用了Promise.resolve()方法
  return Promise.resolve(data + '111');


}).then((data) => {
  console.log(data, '第二层的10行处理代码');

  // 使用了Promise.resolve()方法
  return Promise.resolve(data + '222');


}).then(data => {
  console.log(data, '第三层的10行处理代码');
})
```

<br>

### **then中return一个基本数据类型的情况:**
则基本数据类型会被包装成promise对象 自动调用resolve()方法

```js 
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa');
  }, 1000)

}).then((data) => {
  console.log(data, '第一层的10行处理代码')

  // 我的结果是在 then() 方法中可以直接return
  return data + '111';
  
}).then((data) => {
  console.log(data, '第二层的10行处理代码');

  // 我的结果是在 then() 方法中可以直接return
  return data + '222'

}).then(data => {
  console.log(data, '第三层的10行处理代码');
})
```

<br>

## Promise中异常捕获的情况:
之前的例子中, 我们大部分都写的是resolve, 而在网络请求的过程中, 我们还有请求失败的时候, 当请求失败的时候, 我们会将错误信息通过reject()传递给catch()或者then()的第二个回调来进行处理

这里不仅仅可以使用reject()来传递异常, 我们还可以通过 throw 手动抛出异常 让catch()来捕获之后进行处理

<br>

**总结:**  
catch 和 then2Fn 不仅仅能处理reject时候的状态 还可以处理抛出的异常

<br>

**示例:**  
```js 
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa')
  }, 1000)
}).then(data => {
  console.log(data);

  throw 'err'
}).catch(err => {
  console.log(err)
})
```

<br>

### **总结:**
**1. then().then() 第一个then()不管成功与否会执行第二个**  
这就是链式调用的特点
```js 
// 不管第一个then()是成功还是失败 第二个then()都会执行 
p1.then((data) => {}, (err) => {}).then((data) => {}, (err) => {})
```

<br>

**2. then()方法中可以有返回值 这个返回值会被第二个then()中的形参接收**
```js 
p1.then(data => {
  console.log(data);

  return 123

}).then(num => {
  console.log(num)  // 123
})
```

<br>

**3. 如果返回的是一个promise对象, 下一个then()的形参接收的不是promise对象, 而是promise对象中的resolve的实际参数**    
相当于把第一个then()方法中的promise对象中的成果结果 传递到第二个then()中
```js 
let p1 = new Promise((resolve, reject) => {
  fs.readFile(filePath1, 'utf-8', (err, data) => {
    if(err) {
      reject(err)
    }
    resolve(data);    // data如果是 哈哈哈  返回的是 resolve(data) 中的参数
  })
}).then((data) => {
  console.log(data);

  return p1
}).then((data) => {
  console.log(data);  // 哈哈哈
})
```

<br>

## Promise的API:

### **<font color="#C2185B">Promise.all([promise]): </font>**  

**作用:**  
数组中的promise必须都要成功才可以在then中拿到结果  
一个个都得成功 一个不能缺一个不能少, 都成功后才会执行then()方法

<br>

**参数:**  
promise数组, 数组中包含每一个promise对象, 对应的
then() 中的参数也是一个数组, 包含着每一个成功的结果

<br>

**特点:**  
最后的结果顺序 和 all([]) 数组中的顺序 保持一致

```js 
Promise.all([
  new Promise((resolve, reject) => {
    $.ajax({
      url:'url1',
      success: function(data) {
        resolve(data)
      }
    })
  }),

  new Promise((resolve, reject) => {
    $.ajax({
      url:'url2',
      success: function(data) {
        resolve(data)
      }
    })
  }),
]).then(results => {
  // results 是一个数组 我们通过下标的方式 获取上面的每一次和请求结果
  results[0]
  results[1]
})
```

<br>

### **使用场景:**  
如果请求之间没有依赖我们可以并行请求

在实际开发中, 我们可能会遇到一种情况, 我们需要发送多次请求, 当所有的结果都返回后才能执行下一步的操作, 以前我们可能会这么做

**非Promise:**  
```js 
// 请求1
$.ajax({
  url: '/server',
  success: function() {
    console.log('结果1')
  }
})

// 请求2
$.ajax({
  url: '/server',
  success: function() {
    console.log('结果2')
  }
})
```

我们用jQ的方式发送了两次请求, 但是网络请求没办法确定哪个先返回, 所有的结果有没有全部拿到 为了结果这个问题 我们进行了如下的操作

我定义了两个变量, 然后当两个变量能够进入成功的回调中的时候改成true, 然后我们在处理函数中进行判断, 处理
```js 
// 定义两个变量, 默认都没有拿到
let isResult1 = flase
let isResult2 = flase


// 请求1
$.ajax({
  url: '/server',
  success: function() {
    console.log('结果1')

    // 一旦进来这里 我就将变量改为true
    isResult1 = true
    handleResult()
  }
})

// 请求2
$.ajax({
  url: '/server',
  success: function() {
    console.log('结果2')

    isResult2 = true
    handleResult()
  }
})


// 定义最终处理数据的函数
function handleResult() {
  if(isResult1 && isResult2) {

    // 如果两个变量都为true 意味着两次结果都返回了 然后再处理结果

  }
}
```

以前我们遇到上面的需求需要这样操作, 现在我们可以利用Promise.all()方法

<br>

**Promise.all的方式:**  
```js
ajax("/api/urls.json")
 .then(vals => {
   const urls = Object.values(vals)

   // 将每一个任务组织成promise数组
   const tasks = urls.map(url => ajax(url))

   // 通过 promise.all 的方法要拿到全部的成功的结果
   return Promise.all(tasks)
 })
 .then(vals => console.log(vals))
```

<br>

### **<font color="#C2185B">Promise.race(): </font>**  

**作用:**  
数组中的promise任意一个拿到成功的结果 就可以在then中接收到数据  
谁快谁先

<br>

**参数:**  
promise数组, 数组中包含每一个promise对象

<br>

**特点:**    
promise.all是等待所有任务结束  
promise.race只会等待第一个任务结束

```js
const request = ajax("/api/urls.json")
const timeout = new Promise(reject => {
  setTimeout(() => reject(new Error("timeout")), 500)
})


Promise.race([
  request,
  timeout
])
.then(value => {
  console.log(value)
})
.catch(err => {
  console.log(err)    // timeout快 所以先接收到的是 timeout 的结果
})
```

<br>

**示例2:**  
```js
const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})

const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

const pArr = [p1, p2, p3]

Promise.race(pArr).then(value => {
  console.log(value)
})
```

<br>

# Promise随笔:

### **情况1:**
```js
const p = new Promise((resolve, reject) => {
  console.log("我是promise中的内部逻辑")
})

p.then(res => console.log(res))
```

**总结:**    
当 Promise 中 没有调用 resolve() 的时候 打印 p 是 ``<pending>``  
p.then(res) 输出res 没有任何的输出 因为上述没有 resolve() 进不去 then() 的第一个回调

<br>

### **情况2:**
```js
const p = new Promise((resolve, reject) => {
  console.log("我是promise中的内部逻辑")
  resolve()
})
```

**总结:**   
当 Promise 中 调用 resolve() 的时候 打印 p 是 ``<fulfilled>``  
p.then(res) 输出res 结果是 undefined 因为 resolve() 没有传递 参数

<br>

### **情况3:**
```js
const p = new Promise((resolve, reject) => {
  console.log("我是promise中的内部逻辑")
  resolve("")
})
```

**总结:**  
p.then(res) 输出res 结果是 ""

<br><br>

# async await
它是在 promise 之上的语法糖 

<br>

## async await 的使用方式:

### **async函数:**
首先我们要使用 async 将函数标记为 异步函数 这个标记的函数 该函数会返回一个 promise 对象

使用 **async关键字** 来快速的创建异步函数

```js
// 关键字: async
async function fn() {

}

let res = fn()
console.log(res)  // Promise {<fulfilled>: undefined}
```

<br>

### **async函数特点:**
```js
async function fn() {

  // 异步函数中也可以写同步代码
  console.log(1)
  console.log(2)
  console.log(3)

}
```

如果我们在 async 函数中写的都是同步代码 那么它和普通函数没有任何区别
```js
async function fn() {
  console.log(1)
  console.log(2)
  console.log(3)
}

fn()

console.log("主线程")

// 结果:
1
2
3
主线程
```

结果并没有我们想象的那样 先打印主线程 当上面的代码中没有await就相当于一个同步函数

<br>

**特点:**   
async声明的异步函数 它的返回值会自动包装成 Promise
 ```js
async function fn() {
  return 10
}


// 当我们使用 async 修饰 fn 的时候 就相当于下面这样子
function fn() {
  return new Promise(resolve => {
    resolve(10)
  })
}


let ret = fn()
console.log(ret)  // async 返回的是 Promise {<fulfilled>: 10}

// 所以在我们取值的时候会这里取
fn().then(console.log)
```

当我们这么写的时候 就和预期正常了 主线程 和 异步代码分开了
```js
async function fn() {
  // 这里仍然是同步代码 这里就相当于在new Promise里面写的同步代码 只是返回值被resolve包装了下
  console.log(1)  
  return 10
}


fn().then(console.log)  // 这个打印会拿到异步执行
console.log("主线程")

// 结果:
1
主线程
10
```

<br>

## **async 的链式调用:**
当我们第一个async函数返回的结果要结果下一个函数时 我们会有这样的逻辑代码
当我们第一个async函数返回的结果要结果下一个函数时 我们会有这样的逻辑代码
```js
async function fn() {
  return 10
}

async function fn2(num) {
  return num + 10
}

async function fn3(num) {
  return num + 10
}

async function fn4(num) {
  return num + 10
}

async function fn5(num) {
  return num + 10
}

fn()
  .then(fn2)
  .then(fn3)
  .then(fn4)
  .then(fn5)
  .then(console.log)  // 50
```

上面就是传统调用异步函数的方式 当调用多了后 不是那么优雅

<br>

### **await的使用方式:**
在async异步函数中我们可以继续调用其它的异步函数 不同的是我们不需要使用then 而是使用await

await 会等待promise完成之后 返回最终的结果

它可以用同步的方式调用异步的代码 调用异步函数时可以在函数前使用 await 关键字来对其进行调用  
```js
async function fn() {
  let res = await fetch("http://localhost:3000")
}

fn()
```

调用 await 它会等待promise执行出结果后将结果返回 可以通过变量来接收结果

相当于我们省略了写 then() 的步骤 当我们加上 await 的之后 它返回的就是 异步函数的执行结果

fn()是一个异步函数 它的执行不会阻塞其它的代码 程序会继续运行其他代码 当执行 await fn() 的时候 fn就相当于挂起了 等到它有结果的时候 再通过promise的形式去读取结果
```js
// fn()是一个异步函数
let res = await fn()

// 所以它会先打印
console.log("主线程")
```

但是上面的代码 如果用 async 包裹起来的话 那么上面两句的逻辑就是同步的  
await 会等待fn()的结果 也就是在等待的过程中 是不能做其他的事情的 也就是没执行完是不能够console的

await 只会阻塞 第一次出现await 下面的代码 比如下面的例子中会阻塞 377 行后面的代码 后面的代码会变成同步逻辑

**所以当async函数中没有await的时候就是同步代码**
```js
function p() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(10)
    }, 3000)
  })
}

async function fn() {
  console.log("这里就是同步的逻辑")

  // await 再等上面的promise传出结果 await的时候并不会阻塞 它也会在等待期间执行其它的代码
  let res = await p()

  // 只有上面的结果出来后才会执行打印res 这里阻塞住了
  console.log(res)
}

fn()
console.log("主线程")


// 结果:
这里就是同步的逻辑
主线程
10
```

<br>

### **await的特点:**
await 看上去会暂停函数的执行 <font color="#C2185B">但是在等待过程中 js同样可以处理其他的任务</font>  
比如:  
- 更新页面  
- 运行其它的js代码 等等
- 这是因为await是基于promise和事件循环机制实现的

<br>

### **await的使用位置:**
它不是在哪都能用 它使用的位置:

**1. async声明的异步函数中**  
异步处理错误的时候 使用 catch 处理await的时候 我们要使用 try catch
```js
async function fn() {
  let res = await fn2()
  console.log(res)
}

fn()
```

<br>

**2. 可以在模块的外层作用域中使用 只要在模块中 就可以不用加 async**
```html
<script type="module">
  let result = await fn()
</script>
```

<br>

### **async await 处理错误:**
上面使用我们 then 读取 async 返回的结果 使用 catch 处理错误
```js
async function fn() {
  return 1
}

fn().then(num => console.log(num)).catch(err => console.log(err))
```

<br>

### **使用 await 时候需要注意的陷阱**
下面这样看上去没有问题但是这样写会打破两个fetch操作的并行  
因为我们会等待第一个任务执行完毕之后再执行下一个 这里更高效的做法是 使用 Promise.all()
```js
// 打破并行 它们会是依次执行
async function fn() {
  const a = await fetch("http://localhost:3000")
  const b = await fetch("http://localhost:3001")
}


// 高效 使用并行的方式
async function fn() {
  const promiseA = fetch("http://localhost:3000")
  const promiseB = fetch("http://localhost:3001")

  // 会等到上面的promise耗时最长那个 返回结果后 才会一起返回
  const [a, b] = await Promise.all([promiseA, promiseB])
}
```

<br>

**示例2:**
```js
const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})

const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

const pArr = [p1, p2, p3]


// 循环 promise 数组 让起依次拿到结果 这样的做法产生的问题就是有先后顺序
pArr.forEach(async (p, index) => {
  let key = `res${index + 1}`
  let res  = await p
  console.log({[key]: res})
})



// 并发执行 一次拿到结果
;(async () => {
  let [a,b,c] = await Promise.all(pArr)
  console.log(a,b,c)    // 会等3秒后一起输出结果
})()
```

<br>

我们在循环中使用异步操作 不能使用forEach 或者 map 类似的方式 下面这样的方式是不行的  
尽管我们在 forEach 中写了await 但是forEach会立即返回 它并不会暂停所有的异步操作都执行完毕
```js
async function fn() {
  [1,2,3].forEach(async num => {
    await someAsyncFn()
  })
}

fn()
```

如果我们希望循环中所有的异步操作都一一完成后才继续执行 我们需要使用传统的for循环
```js
async function fn() {
  for(let i of [1,2,3]) {
    await someAsyncFn()
  }

  console.log("done")
}

fn()
```

<br>

### **<font color="#C2185B">for await(let key of xxx) { ... }</font>**
如果我们希望循环中所有的操作都并发执行 我们可以使用 <font color="#C2185B">for await</font>  
注意它也要包裹在 async 函数内部
```js
async function fn() {
  const promises = [
    someAsyncFn(),
    someAsyncFn(),
    someAsyncFn()
  ]

  for await (let result of promises) {
    ...
  }

  console.log("done")
}

fn()
```

上面的for循环依然会等到所有的异步操作都完成之后才会执行后面的逻辑

<br>