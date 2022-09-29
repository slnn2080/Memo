# 异步
js中有两种实现异步的方式

<br>

## 1. 回调
比如我们可以用 setTimeout 来模拟  
setTimeout会立即执行 而我们传入的回调会在预定的时间后执行
```js
setTimeout(() => {
  console.log("setTimeout")
}, 2000)

// 上面执行完 setTimeout 后会立刻执行 console.log 代码
console.log("主线程")
```


回调函数简单好理解 但是有一个问题 如果我们需要依次执行多个异步操作 我们可能会写成这样  

提示:  
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

<br>

比如下面的代码示例:
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
```

<br>

### 错误的情况下: 
如果上面的 promise链 发生了错误 我们可以在链的最后使用 catch  
这样上面的链中任一 一个发生了错误 都会被catch捕获 <font color="#C2185B">而之后的then将不会执行</font>

```js
fetch("http://localhost:3000")
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err))
  .finally(() => console.log("完成清理工作"))
```

这点和同步中使用的 try catch 很类似
同时 promise 还提供了 finally() 方法 它会在promise链结束后调用 无轮失败与否 我们可以在 finally 中做一些清理的工作

<br>

# async await 
它是在 promise 之上的语法糖 

首先我们要使用 async 将函数标记为 异步函数 这个标记的函数 会返回一个 promise 对象

```js
// 关键字: async
async function fn() {

}

fn()
```

在async异步函数中我们可以继续调用其它的异步函数 不同的是我们不需要使用then 而是使用await
await 会等待promise完成之后 返回最终的结果
```js
async function fn() {
  let res = await fetch("http://localhost:3000")
}

fn()
```

await 看上去会暂停函数的执行 <font color="#C2185B">但是在等待过程中 js同样可以处理其他的任务</font>  
比如  
更新页面  
运行其它的js代码 等等
这是因为await是基于promise和事件循环机制实现的

<br>

## 使用 await 时候需要注意的陷阱

下面这样看上去没有问题但是这样写会打破两个fetch操作的并行  
因为我们会等待第一个任务执行完毕之后再执行下一个 这里更高效的做法是 使用 Promise.all()
```js
async function fn() {
  const a = await fetch("http://localhost:3000")
  const b = await fetch("http://localhost:3001")
}


// 高效
async function fn() {
  const promiseA = fetch("http://localhost:3000")
  const promiseB = fetch("http://localhost:3001")

  const [a, b] = await Promise.all([promiseA, promiseB])
}
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

如果我们希望循环中所有的操作都并发执行 我们可以使用 <font color="#C2185B">for await</font>
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

# async await
异步函数主要指的是 回调的形式 setTimeout ajax 慢慢发展为 promise  
下面返回值是一个 promise 下面的例子就是一个异步函数
```js
function fn() {
  return new Promise(resolve => {
    resolve(10)
  })
}

// 这样 10 就会传递给 console.log
fn().then(console.log)
```

异步函数的特点就是异步执行的 比如上面的代码中 如果我们这么写 
```js
fn().then(console.log)
console.log("这是之后的逻辑")  // 这行会先打印 因为这是异步的
```

所以我们要想定义一个异步函数 很简单 我们可以直接返回一个promise 这样就是异步的

<br>

## async关键字: 
既然想返回一个 promise 就是一个异步函数 那么我们可以使用 **async关键字** 来快速的创建异步函数

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

并没有我们想象的那样 先打印主线程 而上面的代码中没有await就相当于一个同步函数

<br>

## async 特点
1. async声明的异步函数 它的返回值会自动包装成 Promise 
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
console.log(ret)  // async 返回的是 promise

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

## async await 处理错误:
上面使用我们 then 读取 async 返回的结果 使用 catch 处理错误
```js
async function fn() {
  return 1
}

fn().then(num => console.log(num)).catch(err => console.log(err))
```

<br>

## async 的链式调用:
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

## async声明的异步函数中可以使用 await 来调用其它的异步函数
### <font color="#C2185B">关键字 await: </font>

它可以用同步的方式调用异步的代码 调用异步函数时可以在函数前使用 await 关键字来对其进行调用  

```js
await fn()  // fn()是promise
```

调用 await 它会等待promise执行出结果后将结果返回 可以通过变量来接收结果

相当于我们省略了写 then() 的步骤
当我们加上 await 的之后 它返回的就是 异步函数的执行结果

fn()是一个异步函数 它的执行不会阻塞其它的代码 程序会继续运行其他代码 当执行 await fn() 的时候  
fn就相当于挂起了 等到它有结果的时候 再通过promise的形式去读取结果
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

### <font color="#C2185B">注意:</font>
await并不是将异步函数改变为同步函数  
只是改变了异步函数的调用方式 以前是用then 现在通await

<br>

## await 的使用位置:
它不是在哪都能用 它使用的位置:  
1. async声明的异步函数中
```js
async function fn() {
  let res = await fn2()
  console.log(res)
}

fn()
```

异步处理错误的时候 使用 catch 处理await的时候 我们要使用 try catch

<br>

2. 可以在 **模块** 的外层作用域中使用 只要在模块中 就可以不用加 async
```html
<script type="module">
  let result = await fn()
</script>
```