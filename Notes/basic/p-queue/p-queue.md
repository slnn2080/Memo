### p-queue
- 它是一个 promise 并发队列控制
- 适用于限速异步(或同步)操作。例如, 当与REST API交互或执行CPU/内存密集型任务时。对于服务器, 您可能需要一个rediss支持的作业队列。


> 安装方式:
- npm install p-queue


> 网址:
- https://www.npmjs.com/package/p-queue
- https://github.com/sindresorhus/p-queue


**注意:**
- 该库不支持 commonjs 的导出方式
- 直接在 package.json 里面加上了 这句 "type": "module" 好了 但是浏览器中没有办法使用
<!-- 
  - 这里在做试验的时候 使用了 webpack 配置了babel 结果不好用
  ```js
  // webpack.config.js
  const {resolve} = require("path")

  module.exports = {
    entry: "./p-queue.js",
    output: {
      filename: "build.js",
      path: resolve(__dirname, "dist")
    },
    module: {
      rules:[
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {targets: {"chrome": "58", "ie": "11", "firefox": "60", "safari": "11", "edge": "11"}}]
            ]
          }
        }
      ]
    },
    mode: "development"
  }


  // package.json
  "devDependencies": {
    "@babel/cli": "^7.18.10",
    "@babel/core": "^7.18.13",
    "@babel/preset-env": "^7.18.10",
    "webpack": "^4.41.6",
    "webpack-cli": "^3.3.11",
    "@babel/node": "^7.18.10",
    "babel-loader": "^8.0.6"
  },
  "dependencies": {
    "p-queue": "^7.3.0"
  }
  ```
 -->



> 使用方式:
- 在这里, 我们每次只运行一个promise。例如, 将并发性设置为4, 可以同时运行4个promise


> new PQueue({options})
```js
import PQueue from 'p-queue';
const queue = new PQueue({concurrency: 1});
```

> bus功能
- 返回一个新的队列实例, **它是EventEmitter3的子类**。
- 就意味着 我们可以把 queue **当做事件总线**
```js
queue.on("hello", data => {
  console.log("data: ---- ", data)
})

queue.emit("hello", "haci")
```

> queue中预定义事件
> active:
- 在队列中处理每一项时发出, 以跟踪进度。
```js
import delay from 'delay';
import PQueue from 'p-queue';

const queue = new PQueue({concurrency: 2});

let count = 0;
queue.on('active', () => {
	console.log(`Working on item #${++count}.  Size: ${queue.size}  Pending: ${queue.pending}`);
});

queue.add(() => Promise.resolve());
queue.add(() => delay(2000));
queue.add(() => Promise.resolve());
queue.add(() => Promise.resolve());
queue.add(() => delay(500));
```


> completed 完成
- 当项完成且没有错误时触发。
- 它能拿到 回调resolve出来的结果 在 result 中
```js
import delay from 'delay';
import PQueue from 'p-queue';

const queue = new PQueue({concurrency: 2});

queue.on('completed', result => {
	console.log(result);
});

queue.add(() => Promise.resolve('hello, world!'));
```


> error
- 如果项引发错误则触发。


> empty
- 每次队列变为空时触发。例如, 如果您在以后添加额外的项目, 这将非常有用。


> idle 闲置
- 每次队列变为空且所有promise已完成时触发;
  队列中。Size === 0 &&队列。等待= = = 0。

- 与empty的不同之处在于, idle保证队列中的所有工作都已完成。Empty仅仅表示队列为空, 但也可能意味着某些承诺尚未完成。

```js
import delay from 'delay';
import PQueue from 'p-queue';

const queue = new PQueue();

queue.on('idle', () => {
	console.log(`Queue is idle.  Size: ${queue.size}  Pending: ${queue.pending}`);
});

const job1 = queue.add(() => delay(2000));
const job2 = queue.add(() => delay(500));

await job1;
await job2;
// => 'Queue is idle.  Size: 0  Pending: 0'

await queue.add(() => delay(600));
// => 'Queue is idle.  Size: 0  Pending: 0'
```

- 每当队列达到空闲状态时, 都会触发idle事件。另一方面, onIdle()函数返回的承诺会在队列变为空闲时解析, 而不是在队列空闲时解析。


> add
- 每次调用add方法以及挂起或排队的任务数量增加时都会触发。


> next
- 每次任务完成且挂起或排队的**任务数量减少时触发**。无论任务是正常完成还是出现错误, 都会触发此事件。

---

> 参数: options配置对象:
- concurrency [kən'kʌrənsi]: 
  并发数量, number类型, 最小为1, 最大无限制
  **同时运行队列中几个 promise**

- **autoStart**: 
  当add后是否自动开始, 默认为true
  队列任务是否在并发限制内, 在添加后立即自动执行。

- timeout:
  定义超时时间, 单位毫秒
  每个操作的超时, 单位是毫秒。一旦超时过后, 操作就会执行, **前提如果他们还没有执行的话。**

- throwOnTimeout: 
  超时是否被视为异常, 默认false

- intervalCap: 
  给定时间间隔内的最大运行次数, number类型

- interval: 
  定义间隔时间, 单位毫秒

- carryoverConcurrencyCount: 
  是否将间隔时间未完成的任务进入下一间隔, 默认false


> 实例对象.add(fn, options?)
- 作用:
- 向队列添加同步 或 异步任务 

- 返回值:
- promise实例

**注意:**
- **如果您的项目可能会抛出异常**, **您必须从返回的Promise中处理这些错误**, 否则它们可能被报告为未处理的Promise拒绝, 并可能导致您的进程立即退出。
```js
function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("我是fn")
      reject(1)
    }, 3000)
  })
}

let q = queue.add(fn)
// 处理 fn 抛出的异常
q.then().catch(err => {
  
})
queue.add(fn2)
```

- 参数:
```js
fn: fn要求为异步请求函数 或 同步函数, 且返回新的promise 类型必须是函数

options: {
  priority: <number>数值越大优先级越高,
  signal: "value" 该值会被fn的第一个参数接收到
}

// {signal} 结构出了 hello
queue.add(async ({signal}) => console.log(signal), {signal: "hello"})
// 结果 hello
```


> 实例对象.addAll(fn, options?)
- 与.add()相同, 但接受一个同步或异步函数的数组
- 并返回一个promise, 该数组中的promise都返回resolve的时候 它才会返回resolve


> 实例对象.pause()
- 暂停队列执行。


> 实例对象.start()
- 作用:
- 开始执行队列添加的任务
- 启动(或恢复)在并发限制内执行已加入队列的任务。如果队列没有暂停(通过选项), 不需要调用这个。
- autoStart = false或通过.pause()方法。

- 返回值:
- 返回此(实例)。


> 实例对象.onEmpty()
- 当队列成为空的时候, 返回一个promise
- 返回一个promise, 当队列变为空时会调用返回的promise的resolve()
- 可以多次调用。例如, 如果您在以后添加额外的项目, 这将非常有用。


> 实例对象.onIdle() -- 当队列处于闲置的状态就为空了
- 当队列成为空并且所有的任务都执行完的时候, 返回一个promise。
- 与onEmpty()不同点在于保证所有任务都执行完了, 即

  queue.size === 0 && queue.pending === 0
  
- onEmpty是队列成为空, 但是promise不一定已经执行完了。


> 实例对象.onSizeLessThan()
- 返回一个promise, 当队列的大小, 小于给定的限制：

  queue.size < limit时结算。

- 如果你想避免让队列增长超过一定的大小, 你可以在添加新项目之前等待
  queue.onSizeLessThan()。

**注意:**
- 这只是限制了等待启动的项目的数量。仍然可能有高达并发作业已经在运行, 这个调用不包括在其计算中。


> 实例对象.clear()
- 清空这个队列


> 实例对象.size
- 队列的大小, 等待运行的队列项目的数量。

> 实例对象.pending
- 运行项目的数量(不再在队列中)。

> 实例对象.timeout

> 实例对象.isPaused
- 队列当前是否暂停。



> 基本示例:
```js
import PQueue from 'p-queue';
const queue = new PQueue({
  concurrency: 1,
  autoStart: false
});



queue.add(syncFn)
queue.add(asyncFn)

queue.start()

// ----- 定义函数 -----

// 同步任务
function syncFn() {
  console.log("syncFn")
  return "syncFn"
}

// 异步任务
function asyncFn() {
  console.log("asyncFn")
  return Promise.resolve("asyncFn")
}

// ----- 定义函数 -----


// ----- 定制监听 -----

// 监听 项目的添加
queue.on("add", () => {
  console.log(`Add: --- 队列的size: ${queue.size}, 运行项目的数量: ${queue.pending}`)
})

// 监听 队列空时的回调
queue.on("empty", () => {
  console.log(`Empty: --- 队列的size: ${queue.size}, 运行项目的数量: ${queue.pending}`)
})

// 监听 队列中项目的完成
queue.on("completed", result => {
  console.log(`Completed: --- 项目完成 拿到该项目的结果为: ${result}`)
})

// 监听 队列是否空闲
queue.on("idle", () => {
  console.log(`Idle: --- 队列的size: ${queue.size}, 运行项目的数量: ${queue.pending}`)
})

// ----- 定制监听 -----


function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}


// 结果:
syncFn
Completed: --- 项目完成 拿到该项目的结果为: syncFn
asyncFn
Completed: --- 项目完成 拿到该项目的结果为: asyncFn
Empty: --- 队列的size: 0, 运行项目的数量: 0
Idle: --- 队列的size: 0, 运行项目的数量: 0
```