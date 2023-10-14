# 注意:
### promise 和 async await 的问题
如下的写法是不推荐的, eslint会报错
```js
// ❌
new Promise(async (resolve, reject) => {});

// ✅
new Promise((resolve, reject) => {});
```

在JavaScript中，Promise 是用于处理异步操作的一种方式。Promise 构造函数接受一个函数作为参数，这个函数有两个参数：resolve 和 reject，它们分别用于处理异步操作成功和失败的情况。

通常，我们会把异步操作的代码放在这个函数内部，然后在适当的时候调用 resolve 或 reject 来表示操作的结果。

然而，在上述的代码示例中，试图将一个异步函数作为 Promise 构造函数的参数传递进去。这在技术上是允许的，但是通常不推荐这样做，原因如下：

<br>

**错误处理问题：**  
如果异步函数内部发生错误并抛出异常，由于异步函数是在 Promise 构造函数中执行的，该异常将不会被捕获，因此 Promise 将不会被拒绝。这意味着，如果异步函数内部发生错误，Promise 将不会按照预期那样被拒绝，这可能导致难以追踪和调试的问题。

```js
// ❌ 异步函数内部发生错误，但是 Promise 不会被拒绝
new Promise(async (resolve, reject) => {
    throw new Error('Something went wrong');
});
```

<br>

**对上疑问:**  
那我使用try catch没有办法捕获异步函数中抛出的异常么
```js
function mockFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('data')
      reject(new Error('exception'))
    }, 3000)
  })
}

function demo() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('no err')
      const res = await mockFetch()
      resolve(res)
    } catch (err) {
      console.log('err')
      reject(err)
    }
    
  })
}

demo().then(res => {
  console.log('res', res)
}, err => {
  console.log('err', err)
})
```

<br>

**不必要的包装：**  
如果在异步函数内部使用了 await 关键字，那么将其包装在 Promise 构造函数内部是不必要的。

因为async异步函数已经返回一个 Promise 对象，你可以直接在外部使用 await 来等待异步函数的执行结果，而不需要在内部再次包装一个新的 Promise。
```js
// ✅ 不需要将异步函数包装在 Promise 内部
async function myAsyncFunction() {
  // some asynchronous code
}

// 在外部使用 await 等待异步函数执行结果
try {
  await myAsyncFunction();
} catch (error) {
  console.error(error);
}
```

<br><br>

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

**参数:**  
我们传入的回调也叫做执行器函数, 执行器函数中的逻辑是立即执行的 遇到就执行 也就是说是同步的

<br>

**执行器函数的参数:**  
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

### **then(cb1, cb2)方法**
**参数:**  
cb1: 成功时的回调  
cb2: 失败时的回调

<br>

### **catch(cb)方法**
**参数:**  
cb: 失败时的回调

<br>

### **finally()方法**
**参数:**  
cb: 一定会触发的回调

<br>

### **案例:**

**案例1: fs模块读取文件:**
```js
const fs = require("fs")


function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  }
}

readFile("url").then(data => console.log(data.toString())
```

<br>

**案例2: ajax的封装:**
```s
https://api.apiopen.top/getJoke
```

```js
btn.addEventListener("click", () => {
  sendAjax("url").then(res => console.log(res))
})


// 封装 ajax
function sendAjax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.responseType = "json"

    xhr.open("get", url)
    xhr.send()
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          rejectg(xhr.status)
        }
      }
    }
  })
}
```

<br><br>

# Promise实例对象中的属性 [PromiseState]: 

## Promise三种状态:
首先, 当我们开发中有异步操作时, 就可以给异步操作包装一个Promise, 异步操作之后会有三种状态
我们可以输出 promise的实例对象就能观察到, promise的状态只可能在两种状态中切换 并且只能改变一次

**1. pending**   
等待状态, 比如正在进行网络请求或者定时器没有到时间

<br>

**2. fulfill(resolved)**   
满足状态, 当我们主动回调了resolve时, 就处于该状态, 并且会回调.then()

<br>

**3. rejected**   
拒绝状态, 当我们主动回调了reject时, 就处于该状态, 并且会回调.catch()

<br>

## 改变 promise 状态的方式:

**1. 调用 resolve()**  
将状态: pending -> fulfill

<br>

**2. 调用 reject()**  
将状态: pending -> rejected

<br>

**3. 抛出错误: throw "msg"**  
将状态: pending -> rejected

<br><br>

# Promise实例对象中的属性 [PromiseResult]: 
这个属性中保存着异步任务 成功 or 失败 的结果  
resolve 和 reject 可以修改 PromiseResult 中保存的值 当设置完后就可以在后续的then()方法中拿到该值

<br><br>

# Promise处理错误的两种情况:
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

<br><br>

# Promise相关问题: 

## 给同一个promise实例多次绑定then方法:
当为同一个promise绑定多个 成功 或 失败 的回调 当promise的状态改变后 对应的回调都会执行
```js
let p = new Promise((resolve, reject) => {

  // 当什么都会调用的时候 promise的状态为pending 则then中不会有任何输出

  // 当
  resolve("OK")
})

// 不是链式调用 而是给同一个p多次绑定
p.then(val => console.log("第一个then: ", val))   // ok
p.then(val => console.log("第二个then: ", val))   // ok
```

<br>

## 改变promise状态 和 指定回调谁先谁后
我没发现有啥用

**改变状态:**  
指的的是3种改变 promise 状态的方法 - resolve reject throw

<br>

**指定回调:**  
指定的是 then catch 也就是通过then添加的回调 如 then(回调) 通过then给p添加的回调

上面标题的意思是 代码在运行时 是resolve等改变状态先执行 还是 then等指定回调先执行?

```js
// resolve先执行还是then先执行?
let p = new Promise((resolve, reject) => {
  resolve("OK")
})

p.then(val => { })
```


<br>

### 答案: 都有可能
有可能是先改变状态 在执行then方法 也有可能是 then优先再去resolve改变状态

**先改变状态 再执行回调:** 当执行器函数中是同步任务的时候 就是先改变状态再执行回调
```js
let p = new Promise((resolve, reject) => {
  resolve("OK")
})

p.then(val => console.log(val))   // OK
```

<br>

**then先执行 resolve改变状态的逻辑后执行:** 当执行器函数中是异步任务的时候 改变状态是需要等待一段时间 这种情况下就是then先执行改变状态后执行
```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK")
  }, 1000)
})

p.then(val => console.log(val))   // 等1秒后输出 OK
```

<br>

### 问题1: 如何先改状态 再指定回调
- 执行器中直接调用 resolve 或 reject 也就是同步调用它们 就可以先改状态再指定回调
- 延迟更长时间才调用then() 我们可以延迟2秒通过then再指定回调

<br>

### 问题2: 如何先指定回调 再改状态
执行器中是异步任务的时候 我们在异步函数中再调用resolve 这种情况下就是先then指定回调 再改变的状态 

<br>

### 问题3: 什么时候才能得到数据?
这个问题指定的就是 then指定的回调什么时候执行
```js
p.then(val => console.log(val))
```

如果先改变的状态 也就是执行器函数中是 同步执行的resolve 那么在调用then() 的时候 then中的回调(then指定的回调)就会执行 来处理它成功或失败的结果

如果先指定的回调 也就是执行器函数中是 异步定时器先指定的回调再改变的状态 那就是等改变状态以后 再去调用成功 或 失败的结果 这种情况下 then中回调的执行时机是等待调用完 resolve后再执行

<br><br>

## then()方法的 返回结果 和 它的状态:
then()方法返回的是一个promise对象
```js
let p = new Promise((resolve, reject) => {
  resolve("OK")
})

// 我们看看res
let res = p.then(val => console.log(val))
console.log(res)    // Promise {<pending>}
```

我们能看到 then() 方法返回的是一个 pending 状态的promise对象, <font color="#C2185B">那它的状态是由什么决定的?</font>

<br>

### then()方法返回的promise的状态(我们称为res):
是由then(cb) 指定的回调函数的执行结果决定的

<br>

**情况1:**  
如果 then回调中抛出异常 则res的状态为: 失败
```js
let p = new Promise((resolve, reject) => {
  resolve("OK")
})

// 我们看看res
let res = p.then(val => {
  throw "err"
})
console.log(res)

/*  
  [[PromiseState]]: "rejected"
  [[PromiseResult]]: "err"
*/
```

<br>

**情况2:**  
如果 then回调中返回的是非promise的数据 则res的状态为: 成功
```js
let p = new Promise((resolve, reject) => {
  resolve("OK")
})

// 我们看看res
let res = p.then(val => {
  return 1
})
console.log(res)

/*  
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: 1
*/
```

<br>

**情况3:**  
如果 then回调中返回的是promise对象 则res的状态为: 取决于return的promise对象
```js
let p = new Promise((resolve, reject) => {
  resolve("OK")
})

// 我们看看res
let res = p.then(val => {
  return new Promise(resolve => {
    resolve(1)
  })
})

console.log(res)

/*  
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: 1
*/
```

<br><br>

## Promise的链式调用: .then().then():
then()方法返回的是一个新的promise对象 所以可以连续.then的形式进行链式调用  

当我们调用 resolve 或者 reject 的时候 会转换promise的状态, 这时我们就可以通过.then的方式 来处理它们传出的状态  

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

```js
let p = new Promise(resolve => {
  setTimeout(() => {
    resolve("OK")
  }, 1000)
})

p.then(val => {
  return new Promise(resolve => {
    resolve("SUCCESS")
  })
}).then(val => {      // 目标then
  console.log(val)    // SUCCESS
}).then(val => {
  console.log(val)    // undefined
})
```

<br>

**为什么是undefined?**  
then的返回的是一个promise 这个promise的状态由then指定的回调函数的返回值决定  

而 **目标then** 的返回值没写 没写就是undefined 同时当返回的是非promise对象的时候 会将这个结果包装成成功的状态交由下一个then处理, 所以后面的then中会走成功的回调输出我们传递过的undefined

<br><br>

## Promise的异常穿透:

### 概念:
当使用 promise 的 then 链式调用的时候 可以在最后指定失败的回调(catch) 中间的环节都不需要指定失败的回调 由最后的catch方法的回调对错误做处理

一般来说前一个then中出现的错误可以在后一个then中处理 但是因为异常穿透的特性我们可以在最后catch统一进行处理

```js
let p = new Promise(resolve => {
  setTimeout(() => {
    // 失败
    reject("OK")
  }, 1000)
})

p.then(val => {
  return new Promise(resolve => {
    resolve("SUCCESS")
  })
}).then(val => {
  console.log(val)
}).then(val => {
  console.log(val)

// 在最后使用 catch 指定失败的回调, 这个catch中可以捕获第一个promise中的失败
}).catch(err => console.log(err))
```

<br><br>

## 中断Promise链:
链就是上面说的 then方法的链式调用

**比如:**  
下方当我们输出完1后就不想输出2 3了, 我们不管在1的then中返回数据 抛出错误都是不好用  
return false: false不是promise 会被包装成成功的状态送给下一个then 后续的then中会收到 undefined
```js
p.then(val => {
  return new Promise(resolve => {
    resolve("OK")
  })
}).then(val => {
  console.log(1)
}).then(val => {
  console.log(2)
}).then(val => {
  console.log(3)
})
```

<br>

### 解决方式:
返回一个 pending 状态的promise对象 这时对应的then方法的返回也是一个pending状态的promise 当它是pending的时候后续的then的回调都不会得到执行 因为状态没有改变 回调函数都不能执行

then等方式指定的回调的执行时机为 等状态改完之后才能执行
```js
p.then(val => {
  return new Promise(resolve => {
    resolve("OK")
  })
}).then(val => {

  console.log(1)

  // 返回一个pending状态的promise 
  return new Promise(() => {})

}).then(val => {
  console.log(2)
}).then(val => {
  console.log(3)
})
```

<br><br>

## Promise Api 1:
上面的链式调用我们是通过return new Promise((resolve, reject) => {})来实现的而我们new Promise的目的就是为了使用回调函数中的resolve函数, 所以Promise干脆提供了一个Api

<br>

### **<font color="#C2185B">Promise.resolve([data]):</font>**  
将给定数据 data 包装成Promise对象, 它返回的就是一个Promise, 我们可以在then中拿到结果

属于是 new Promise(resolve => { resolve(data) }) 的简写形式

<br>

### **特殊情况:**  

**情况1:**   
如果我们传递进的是 一个 非promise对象(啥数据都可以) 则返回的结果是一个 成功的promise对象

**情况2:**   
如果我们传递进的是 一个 promise对象 则 Promise.resolve() 的结果 取决于我们传入的promise的返回的结果
```js
let p = Promise.resolve(new Promise((resolve, reject) => {
  // 如果我们调用 resolve 则 p 的结果就是成功
  // 如果我们调用 reject 则 p 的结果就是失败 传出失败的话 p 要用 catch 捕获
}))
```

<br>

**示例:**
```js
let promise = ajax("/api/users.json")
let promise2 = Promise.resolve(promise)

promise == promise2  // true
```

<br>

**情况3:**   
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

### **<font color="#C2185B">Promise.reject(data): </font>**  
快速返回一个失败的promise, 无论我们传入什么 返回的都是失败的promise对象
它是 new Promise(reject => { })的简写
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

<br><br>

## 示例:
我想模拟5秒后 将请求回来的数据 传递出去 便写了如下的代码
```js
axios({
  url: "./data/scatter.json"
}).then(({data: res}) => {

  setTimeout(() => {
    // 使用 Promise.resolve 5秒后return一个成功的promise对象
    return Promise.resolve(res)
  }, 5000)
}).then(res => {
  // res为undefined 也就是说 它没有接收到第一个then中拿到的结果
  console.log(res)
})
```

<br>

**原因:**  
因为 Promise.resolve() 方法返回的是一个立即 resolve 的 Promise 对象 **它的执行是同步的**

而 setTimeout 方法是一个异步操作, 它会在延迟时间后才执行其中的回调函数, 因此 return Promise.resolve() 方法并不会等待 setTimeout 方法中的回调函数执行完成, **而是直接返回一个未完成的 Promise 对象**, 导致后续的 then 中拿到的是 undefined。

<br>

**解决方式:**  
要解决这个问题, 您可以创建一个新的 Promise 对象, 将 setTimeout 中的操作封装在这个 Promise 对象的回调函数中

然后在 setTimeout 中的回调函数执行完成后, 通过 resolve 方法将结果返回给后续的 then 中, 从而保证后续的操作能够获取到正确的返回值。

```js
axios({
  url: "./data/scatter.json"
}).then(({data: res}) => {

  // return 一个 promise
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res)
    }, 5000)
  })
  
}).then(res => {
  // 这样就能接收到了
  console.log(res)
})
```

<br>

### 将上面的逻辑修改为 async await 逻辑
```js
const chart = echarts.init(document.querySelector("#wrap"))

let originData = [];


// 定义请求数据 并 5000ms后返回的函数
async function fetchData() {
  const { data: res } = await axios({url: "./data/scatter.json"})
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res)
    }, 5000)
  })
}

// 定义立即执行函数 调用 fetchData 拿到5s后的请求结果
(async () => {
  // 展示 加载动画
  chart.showLoading()

  // 会等待5s拿到结果 它不是axios 不用 {data:res}
  const res = await fetchData()
  // 处理数据
  originData = res.map(item => ([ item.weight, item.height ]))

  // 关闭动画
  chart.hideLoading()

})()
```


<br><br>

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

## Promise Api 2:

### **<font color="#C2185B">Promise.all([promise]): </font>**  

**作用:**  
如果数组中的promise对象的状态都为成功 则才会返回成功的结果 我们才能在 then() 中拿到数据  
如果数组中的promise对象的状态有一个失败 则返回失败的promise

数组中的promise必须都要成功才可以在then中拿到结果  

<br>

**参数:**  
promise数组, 数组中包含每一个promise对象

<br>

**返回值:**  
成功: promise数组中的状态都会成功的时候 会返回一个成功结果组成的数组  
失败: promise数组中失败的那个promise对象的失败结果

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

**Promise.all的源码:**
```js
Promise.all = function(promises) {
  let count = 0
  let results = []

  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++) {
      promises[i].then(
        v => {
          // 每个promise对象都成功才能指定 resolve
          count++

          // 将当前promise对象成功的结果 存入到数组中 我们要保证顺序 通过下标来指定 push会因为返回的时间导致顺序不一样
          results[i] = v

          if(count == promises.length) {
            // 修改状态
            resolve(results)
          }
        },
        e => {
          reject(e)
        }
      )
    }
  })
}
```  

<br>

### **<font color="#C2185B">Promise.race([promise]): </font>**  

**作用:**  
它的状态由第一个promise数组中第一个改变状态的promise对象决定, 赛跑谁先改变状态 谁就是结果

最快的promise对象为成功 则返回成功的结果  
最快的promise对象为失败 则返回失败的结果

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

// 谁快谁先
Promise.race(pArr).then(value => {
  console.log(value)    // 1
})  
```

<br>

**Promise.race的源码:**
```js
Promise.race = function(promises) {

  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++) {
      promises[i].then(
        v => {
          // 修改返回对象的状态为 成功 不需要判断
          resolve(v)
        },
        e => {
          reject(e)
        }
      )
    }
  })
}
```  

<br><br>

# 手写 Promise
```js
function Promise(executor) {

  // 添加属性
  this.PromsiseState = "Pending"
  this.PromiseResult = null

  // 用来保存 then指定的回调
  // this.callback = {}  可以给p指定多个回调 p.then p.then 但是对象的话 后面指定的回调会将前面的覆盖 只会执行后面的 而不是全部都执行 所以我们修改为数组
  this.callbacks = []

  // 保存this
  const self = this

  function resolve(data) {

    // 设置状态只能修改一次 判断状态是否被改过了 如果改过了 就不要改了
    if(self.PromsiseState != "Pending") return

    // this 是window
    // 1. 修改对象的状态 (promiseState)
    self.PromsiseState = "fulfilled"

    // 2. 设置对象结果值 (promiseResult)
    self.PromiseResult = data


    // 执行器函数中如果是延迟定时器的话 需要在这里调用 then中指定的回调 怎么拿到? 让我们保存到this.callback上了
    // if(self.callback.onResolved) {
    //   self.callback.onResolved(data)
    // }

    self.callbacks.forEach(item => item.onResolved(data))
    
  }

  function reject(data) {
    // 设置状态只能修改一次 判断状态是否被改过了 如果改过了 就不要改了
    if(self.PromsiseState != "Pending") return

    self.PromsiseState = "rejected"
    self.PromiseResult = data

    // if(self.callback.onRejected) {
    //   self.callback.onRejected(data)
    // }

    self.callbacks.forEach(item => item.onRejected(data))
  }


  // 处理 原生promise中使用 throw 会修改promise的状态为失败
  try {
    executor(resolve, reject)
  } catch(err) {
    // 修改promise的状态为失败 只需要直接调用reject就可以
    reject(err)
  }
  
}


// 添加then方法 执行then方法的时候会检查promise的状态 根据状态执行对应的逻辑
Promise.prototype.then = function(onResolved, onRejected) {

  const self = this

  // then方法中要返回一个promise 该promise的状态是根据 then指定的回调 决定的
  return new Promise((resolve, reject) => {

    // 当 执行器函数中是同步代码的时候 onResolved onRejected 需要在then中调用
    if(this.PromiseState == "fulfilled") {

      // 在 p.then 中抛出异常的时候我们要修改状态
      try {
        // 拿到函数的执行结果 因为 then 需要根据执行结果决定 promise的状态
        let res = onResolved(this.PromiseResult)

        // 看看结果是不是promise对象
        if(res instanceof Promise) {
          // 如果是 promise对象 那一定可以调用then
          res.then(
            v => resolve(v),
            e => reject(e)
          )
        } else {
          // 如果不是promise对象 则状态为成功 值为该值
          resolve(res)
        }
      } catch(err) {
        reject(err)
      }
    }




    if(this.PromiseState == "onRejected") {
      onRejected(this.PromiseResult)
    }




    // 当 执行器函数中是异步代码的时候 需要等延迟定时器里面改变promise状态以后再执行回调 所以 onResolved onRejected 应该是在 上面类中的 function resolve(data) function reject(data) 里面调用
    if(this.PromiseState == "Pending") {
      // 保存回调函数: 为了让类中的function拿到我们在then中指定的回调 所以我们要将回调保存起来

      /*
        在给p指定多个回调的时候为了避免只执行后面的 我们改为了数组
        this.callback = {
          onResolved,
          onRejected
        }
      */
      this.callbacks.push({
        onResolved: function() {
          let res = onRejected(self.PromiseResult)
          if(res instanceof Promise) {
            res.then(
              v => resolve(v),
              e => reject(e)
            )
          } else {
            resolve(res)
          }
        }
        onRejected: function() {
          let res = onRejected(self.PromiseResult)
          if(res instanceof Promise) {
            res.then(
              v => resolve(v),
              e => reject(e)
            )
          } else {
            resolve(res)
          }
        }
      })
    }

  })
}
```


<br><br>

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

## 扩展: async await

### 场景描述:
App组件中定义了 请求列表数据的方法
```js
const getStudsList = useCallback(async () => {
  ...

  const list = await getStudsListApi(
    "http://localhost:8080/student",
    {
      method: "get"
    })
    setStuds(list)
    
  ...
}, [getStudsListApi])
```

<br>

Student子组件中定义了 删除指定id学生信息的方法
```js
const removeStudById = async id => {

  ... 

  const msg = await removeStudByIdApi(
  `http://localhost:8080/student/${id}`,
  { method: "delete" }
  )
}
```

<br>

然后我们要在点击 [删除] 按钮 对应的回调中分别调用上面的两个逻辑
- 根据id删除学生数据: removeStudById
- 删除学生数据后, 刷新表格信息: getStudsList
```js
// 删除按钮回调:
const delHandler = id => {
  return async () => {
    await removeStudById(id)
    await getStudsList()
  }
}
```

<br>

### 问题:
我发现当 delHandler 中 如果没有使用 await 页面效果不正常 第一次点击按钮学生没有删除 第二次点击按钮学生才删除

发现可能是 removeStudById 和 getStudsList 先后的执行顺序有问题

<br>

当我们使用了 await 的时候就符合了预期

<br>

### 疑惑:
removeStudById 和 getStudsList 方法并没有返回Promise 在我的印象中 这两个函数都不是异步函数 为什么可以使用await 应该是await没有任何用处才对

<br>

### 解答:
因为 removeStudById 和 getStudsList 和被async 修饰的函数 它们就是异步方法

所以我们没有明确的在 removeStudById 和 getStudsList 函数中 写 ``return 异步 | Promise`` 的逻辑

但是 async 的返回值就相当于返回了 return new Promise

没有明确指明返回什么 就相当于返回了 undefined

<br>

所以我们在 delHandler 函数中 使用await来使 removeStudById 和 getStudsList 变为同步执行的逻辑
```js
// 删除按钮回调:
const delHandler = id => {
  return async () => {
    await removeStudById(id)
    await getStudsList()
  }
}
```