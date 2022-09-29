# Promise案例小结:
```js
const p = new Promise((resolve, reject) => {
  console.log("我是promise中的内部逻辑")
})

p.then(res => console.log(res))
```
**总结:**  
当 Promise 中 没有调用 resolve() 的时候 打印 p 是 <pending>  
p.then(res) 输出res 没有任何的输出 因为上述没有 resolve() 进不去 then() 的第一个回调

<br>

```js
const p = new Promise((resolve, reject) => {
  console.log("我是promise中的内部逻辑")
  resolve()
})
```
**总结:**  
当 Promise 中 调用 resolve() 的时候 打印 p 是 <fulfilled>  
p.then(res) 输出res 结果是 undefined 因为 resolve() 没有传递 参数

<br>

```js
const p = new Promise((resolve, reject) => {
  console.log("我是promise中的内部逻辑")
  resolve("")
})
```
**总结:**  
p.then(res) 输出res 结果是 ""


<br>

# Promise
ES6中一个非常重要和好用的特性就是Promise, 它是异步编程的一种解决方案  

<br>

### **那什么时候我们来处理异步事件呢?**   
一种很常见的场景应该就是网络请求, 我们封装一个网络请求的函数, 因为不能立即拿到结果, 所以不能像简单的3+4=7一样将结果返回, 所以往往我们会传入另一个函数, 在数据请求成功时, 将数据通过传入的函数回调出去,  

如果只是一个简单的网络请求, 那么这种方案不会给我们带来很大的麻烦, 但是当网络请求非常复杂的时候, 就会出现回调地狱 

<br>

### **简单的promise 和 普通的异步回调对比(回调地狱):**
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

**总结:**  
我们可以清晰的观察到首先我们使用promise避免了回调地狱  
其次逻辑特别的清晰, 网络请求的部分都在promise对象里, 对请求返回的结果都在上一次promise对象中的网络请求所对应的then()放法里

promise对网络请求的代码 和 处理请求回来的数据的代码做了分离, 这就是链式编程

<br>

### **异步操作有哪些:**
- fs 文件操作
- 数据库操作
- ajax
- 定时器


### **Promise优点:**
- 支持链式调用, 可以解决回调地狱的问题
- 指定回调函数的方式更加的灵活

<br>

**<font color="#C2185B">new Promise((resolve, reject) => {}): </font>**  
resolve: 成功的时候调用resolve  
reject: 失败的时候调用reject

    resolve 和 reject 本身又是两个函数

一旦我们在Promise内部异步任务里调用resolve()方法, Promise的最后就会对应有then()方法来对成功的结果进行处理

一旦我们再Promise内部异步任务里调用reject()放法, Promise的最后就会对应有catch()方法来对错误信息进行处理

```js 
  new Promise((resolve, reject) => {

    ````````````````
    我们把异步任务放在这里, 而请求回来的数据, 对数据处理的逻辑放在then中
    ````````````````

  }).then(() => {
    
    ````````````````
    这里对处理异步任务的逻辑
    ````````````````
  })
```

<br>

### 总结:
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

}).then((data, 接收的resolve传递过来数据) => {
  
  // 我们在这里对获取的数据做处理

}).catch((err) => {

  // 我们在这里对错误信息进行处理

})
 ```

**推荐:**  
针对链式调用的话 我们应该使用 catch 的方式 因为 promise上任何的异常都会向后传递直至被捕获 这种方式就是给整个promise链条设置的错误处理回调

<br>

# unhandledrejection 事件
注册在 window 身上的事件 全局为没有捕获到的异常做处理

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

<br>

# Promise三种状态: 
首先, 当我们开发中有异步操作时, 就可以给异步操作包装一个Promise, 异步操作之后会有三种状态
1. pending  
等待状态, 比如正在进行网络请求或者定时器没有到时间

2. fulfill  
满足状态, 当我们主动回调了resolve时, 就处于该状态, 并且会回调.then()

3. reject  
拒绝状态, 当我们主动回调了reject时, 就处于该状态, 并且会回调.catch()

<br>

### Promise的另一种形式:
原理和内部的流程都是一样的 只是书写格式不一样

```js
new Promise((resolve, reject) => {

}).then().catch()
```
  
我们还可以在then方法中传入两个函数, 当成功的时候会执行第一个回调, 当失败了会执行第二个回调
```js
new Promise((resolve, reject) => {

}).then(函数1, 函数2)
```

<br>

# catch 和 then() 方法中的第二个回调
then()方法中的第二个回调是给上一个promise处理错误的 比如
```js
let p = new Promise((resolve, reject) => {
  throw "error"
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

而 catch 是异常和错误的传递 catch就用来兜底的

<br>

# Promise链式调用: 
### .then().then()
```js 
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa');
  }, 1000)

}).then((data) => {
  // 1. 自己处理的10行代码
  console.log(data, '第一层的10行处理代码')

  return new Promise((resolve, reject) => {
    resolve(data + '111');
  })

}).then((data) => {
  console.log(data, '第二层的10行处理代码');

  return new Promise((resolve, reject) => {
    resolve(data + '222');
  })

}).then(data => {
  console.log(data, '第三层的10行处理代码');
})
 ```

 <br>

我们再来看看第二种链式调用 上面的链式调用我们是通过return new Promise((resolve, reject) => {})来实现的而我们new Promise的目的就是为了使用回调函数中的resolve函数, 所以Promise干脆提供了一个Api

**<font color="#C2185B">Promise.resolve(): </font>**  
将数据包装成Promise对象是 new Promise(resolve => { })的简写

**注意几种情况:**  
如果我们传递进的是 一个promise 对象 则promise对象会原样返回

    Promise.resolve(promise对象)

```js
let promise = ajax("/api/users.json")
let promise2 = Promise.resolve(promise)

promise == promise2  // true
```

<br>

如果我们传递进的是 一个对象 该对象中也有then方法也能指定成功和失败的回调 则回调会在下一个方法中被执行
```js
// 传递一个对象 对象中有 then 方法
Promise.resolve({})

Promise.resolve({
  then: function(onFulfilled, onRejected) {
    onFulfilled("foo")
  }
})

// 可以在这个then中接收到
.then(val => console.log(val))
```


<br>

**<font color="#C2185B">Promise.reject(): </font>**
将数据包装成Promise对象 是 new Promise(reject => { })的简写
```js
Promise.reject(new Error("rejected"))
.catch(function(err) {
  console.log(err)
})
```

<br>

示例:
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

上面的方法我们还可以更加的简洁  
当结果在then()方法中的时候, 我们直接return 内部会对结果进行自动包装成Promise对象, 并且内部会自动调用resolve()方法
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

### **throw 'err'  catch() 捕获:**
之前的例子中, 我们大部分都写的是resolve, 而在网络请求的过程中, 我们还有请求失败的时候, 当请求失败的时候, 我们会将错误信息通过reject()传递给catch()或者then()的第二个回调来进行处理

这里不仅仅可以使用reject()来传递异常, 我们还可以通过 throw 手动抛出异常 让catch()来捕获之后进行处理

**注意:**
我是在第一次成功的基础上使用的throw 也就是说我是在then()方法中使用的throw
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

### 在NodeJs中的知识点总结:
- then().then() 第一个then()不管成功与否会执行第二个 
这就是链式调用的特点
```js 
// 不管第一个then()是成功还是失败 第二个then()都会执行 
p1.then((data) => {}, (err) => {}).then((data) => {}, (err) => {})
 ```

- then()方法中可以有返回值 这个返回值会被第二个then()中的形参接收
```js 
p1.then(data => {
  console.log(data);

  return 123

}).then(num => {
  console.log(num)  // 123
})
 ```

- 如果返回的是一个promise对象, 下一个then()的形参接收的不是promise对象, 而是promise对象中的resolve的实际参数  
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

### **<font color="#C2185B">Promise.all(): </font>**
在实际开发中, 我们可能会遇到一种情况, 我们需要发送多次请求, 当所有的结果都返回后才能执行下一步的操作, 以前我们可能会这么做

<br>

**使用场景:**  
如果请求之间没有依赖我们可以并行请求

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

**作用:**  
一个个都得成功 一个不能缺一个不能少, 都成功后才会执行then()方法

**参数:**  
Promise.all() 中需要传入数组, 数组中包含每一个promise对象
then() 中的参数也是一个数组, 包含着每一个成功的结果

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

**示例2:**  
```js
ajax("/api/urls.json")
 .then(vals => {
   const urls = Object.values(vals)
   const tasks = urls.map(url => ajax(url))
   return Promise.all(tasks)
 })
 .then(vals => console.log(vals))
```

<br>

### **<font color="#C2185B">Promise.race(): </font>**
将多个 promise 对象整合成一个全新的 promise对象  
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
  console.log(err)
})
```

