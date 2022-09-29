https://www.bilibili.com/video/BV16a411d72j?p=57&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b  

我们可以看看上面的视频 讲的就是手写 promise

<br>

- 手写promise可以从原生的promise来进行模仿

- 我们一般会用 new 来创建一个 promise实例
```js
let promise = new Promise()
```

- 也就是说我们手写的时候可以用构造函数 或者 class 来创建 我们这里采用class的方式来进行示范

```js
class Commitment {
  
}
```

- 我们在new Promise()的时候肯定是需要传递参数的 

- 参数是一个函数 而是当我们传入函数参数的时候 这个函数参数会被自动执行

- 因此我们就需要在 Commitment类的constructor()添加参数

```js
class Commitment {

  constructor(func) {
    func()
  }
}
```

- 接下来我们也知道 我们在new Promise的时候也需要为它的回调函数里进行传参 resolve reject

```js
let promise = new Promise((resolve, reject) => {
  
})
```

- 我们也需要在我们自定义的promise传递这两个参数
```js
class Commitment {

  constructor(func) {
    func(resolve, reject)
  }
}
```

- 上面这样不行 我们不知道要在哪里调用resolve 和 reject 
- 毕竟 resolve 和 reject 还没有定义

- 因此我们就要创建这两个函数 注意要用this来调用自身class里面定义的方法

```js
class Commitment {

  constructor(func) {
    func(this.resolve, this.reject)
  }

  resolve() {}
  reject() {}
}
```

- 接下来我们想想 这里的resolve和reject应该怎么执行呢？ 里面又应该写什么内容呢？

- 这里我们先了解一下 promise的状态

- 1. pending
- 2. fulfilled
- 3. rejected

- 初始的时候是pending
- pending可以转为 fulfilled 但是不能逆转

- pending也可以转为 rejected 但是也不能逆转

- 同时 fulfilled和rejected也不能互转


- 所以我们要提前先定义好这些状态 可以用const来创建外部的固定变量 这里为了统一就用static来创建静态属性
```js
class Commitment {

  static PENDING = "待定"
  static FULFILLE = "成功"
  static REJECTED = "拒绝"

  constructor(func) {
    func(this.resolve, this.reject)
  }

  resolve() {}
  reject() {}
}
```

- 创建了 状态常量后 还需要为每一个实例添加一个状态属性 status

- 我们可以在constructor里面 this.status 来赋值

- 这个状态属性默认就是 待定 的状态

```js
class Commitment {

  static PENDING = "待定"
  static FULFILLE = "成功"
  static REJECTED = "拒绝"

  constructor(func) {
    this.status = Commitment.PENDING

    func(this.resolve, this.reject)
  }

  resolve() {}
  reject() {}
}
```

- 这样再每一个实例被创建以后就会有自身的状态属性可以进行判断和变动了

- 那么在执行resolve的时候 就需要判断状态是否为 待定 如果是待定的话 就将状态修改为成功

- 在执行reject的时候也需要判断状态是否是 待定 如果是待定 就将状态修改为拒绝

```js
class Commitment {

  static PENDING = "待定"
  static FULFILLE = "成功"
  static REJECTED = "拒绝"

  constructor(func) {
    this.status = Commitment.PENDING
    func(this.resolve, this.reject)
  }

  resolve() {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.FULFILLE
    }
  }
  reject() {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.REJECTED
    }
  }
}
```

- 我们再看看原生的promise在执行resolve或者 reject的时候都是可以传递参数的 这样我们后面就可以使用这个参数了
```js
let promise = new Promise((resolve, reject) => {
  resolve("这次一定")
})
```

- 所以我们自定义的promise里面也需要这样的参数
- 我们将这个参数定以为resulte 并在constructor()里面定义

- 不管是成功还是拒绝的结果两者选其一 我们让每个实例都有result属性并且给她们都赋值null
```js
class Commitment {

  static PENDING = "待定"
  static FULFILLE = "成功"
  static REJECTED = "拒绝"

  constructor(func) {
    this.status = Commitment.PENDING

    // 这里
    this.result = null

    func(this.resolve, this.reject)
  }

  resolve() {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.FULFILLE
    }
  }
  reject() {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.REJECTED
    }
  }
}
```

- 这样我们就可以给 Commitment类中的resolve reject方法里面添加参数 并且在方法中 我们将参数result赋值给实例的result属性
```js
class Commitment {

  static PENDING = "待定"
  static FULFILLE = "成功"
  static REJECTED = "拒绝"

  constructor(func) {
    this.status = Commitment.PENDING

    this.result = null

    func(this.resolve, this.reject)
  }

  resolve(result) {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.FULFILLE

      // 这里
      this.result = result
    }
  }
  reject(result) {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.REJECTED

      // 这里
      this.result = result
    }
  }
}
```

- 但是上面的代码我们在进行测试执行的时候报错了
```js
let commitment = new Commitment((resolve, reject) => {
  resolve("这次一定")
})

// cannot read properties of undefined (reading "status")
```

- ? 为什么 status 属性我们已经创建了 不应该是undefined 但是我们注意下 status前面的this 那么只有一种可能 调用this.stauts的时候 并没有调用constructor里面的this.status

- 也就是说 resolve里面this跟丢了constructor里面的this
```js
constructor(func) {
  this.status = Commitment.PENDING
}

- 和

resolve(result) {
  // 这里的this
  if(this.status == Commitment.PENDING) {
    this.status = Commitment.FULFILLE
    this.result = result
  }
}
```

- 我们在new一个新势力的时候执行的是constructor()里面的内容 也就是constructor里面的this是确实是新实例的

- 但是现在我们是在新实例被创建后再在外部环境下执行执行resolve()方法
```js
// 外部环境
let commitment = new Commitment((resolve, reject) => {
  resolve("这次一定")
})
```

- 这里的resolve看着像是和实例一起执行的 其实不然, 也就相当于不在class内部使用这个this

- 而我们没有在外部定义任何status变量 因此这里会报错

- 解决class的this指向问题一般会用箭头函数 bind 或者 proxy 在这里我们就可以使用 bind来绑定this

```js
constructor(func) {
  this.status = Commitment.PENDING

  this.result = null

  // 这里
  func(this.resolve.bind(this), this.reject).bind(this)
}
```

- 只需要在this.resolve和this.reject后面加上.bind(this)就可以了

- 上面的this不是跟丢了么 这里相当于我们绑定了class的constructor里面的this 让你不跟丢

- 这样对于 resolve 来说就是给实例的resolve方法绑定这个this为当前对象实例
```js
let commitment = new Commitment((resolve, reject) => {
  // 这里
  resolve("这次一定")
})
```

- 接下来我们来写then 因为then是在创建实例后再进行调用的 这里我们再创建个class方法 then() 

- 我们先看下原生的then()
```js
let promise = new Promise((resolve, reject) => {
  resolve("这次一定")
})

promise.then(
  result => {

  },
  result => {
    
  }
)
```

- then中可以传递两个函数参数 一个是当状态为 成功时候执行的代码 一个是当状态为 拒绝的时候执行的代码

- 所以我们在class里面的then()里面定义两个参数
- 一个是成功 一个是失败 但是这两个函数参数 只会执行成功状态 或者 拒绝状态其中的一个

- 因此我们在手写的时候就必须进行判断 如果当前实例的status状态属性为 成功的时候 我们就执行传进来的onFULFILLED函数 并且为onFULFILLED函数传入前面保存的result属性值

```js
class Commitment {

  static PENDING = "待定"
  static FULFILLE = "成功"
  static REJECTED = "拒绝"

  constructor(func) {
    this.status = Commitment.PENDING

    this.result = null

    func(this.resolve.bind(this), this.reject).bind(this)
  }

  resolve(result) {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.FULFILLE
      this.result = result
    }
  }
  reject(result) {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.REJECTED
      this.result = result
    }
  }

  // 这里
  then(onFULFILLED, onREJECTED) {
    if(this.status == Commitment.FULFILLE) {
      onFULFILLED(this.result)
    }

    if(this.status == Commitment.REJECTED) {
      onREJECTED(this.result)
    }
  }
}

let commitment = new Commitment((resolve, reject) => {
  resolve("这次一定")
})
```

- 但是为了严谨 我们考虑多点情况 我们这样 比如原生的promise 我们在new Promise里面 抛出错误
```js
let promise = new Promise((resolve, reject) => {
  throw new Error("白嫖不成功")
})
```

- 这时候是会触发拒绝方法的 也就是在原生的promise里面调用then的时候可以把错误的信息作为内容输出出来

- 但是如果我们在手写这边写上同样的逻辑代码的 控制台报错了 而且没有把内容输出出来
```js
// 手写 promise
let commitment = new Commitment((resolve, reject) => {
  throw new Error("白嫖不成功")
})
```

- 于是我们就可以在执行resolve和reject之前进行判断 我们可以用try catch

- 当生成实例的时候判断是否有报错 如果没有报错的话 就按照正常的执行resolve和reject 如果报错的话 就把错误信息传入reject方法 并且直接执行reject()

```js
constructor(func) {
  this.status = Commitment.PENDING

  this.result = null

  try {
    func(this.resolve.bind(this), this.reject).bind(this)
  } catch(err) {
    this.reject(err)
  }
}
```

- 上面没有给reject进行bind绑定this 因为这里是直接执行 而不是创建后再执行

- 我们还要注意个细节
- 原生promise里面规定then里面的两个参数如果不是函数的话 就要被忽略

```js
// 原生代码
promise.then(
  undefined,
  result => {
    console.log(result.message)
  }
)
```

- 原生这么写 执行是没有问题的 同样我们在手写的then里面传入 undefined 会有什么问题?
```js
commitment.then(
  undefined,
  result => {console.log(result.message)}
)
```

- 结果报错了
- onFULFILLED is not a function

- 这不是我们想要的 我们只想要自己来抛出错误 我们看看手写then的逻辑
```js
then(onFULFILLED, onREJECTED) {
  if(this.status == Commitment.FULFILLE) {
    onFULFILLED(this.result)
  }

  if(this.status == Commitment.REJECTED) {
    onREJECTED(this.result)
  }
}
```

- 我们会在里面分别执行成功和拒绝两个参数函数 可是我们不想修改这里的代码 那么就只能把不是函数的参数改为函数 这里我们就可以用条件运算符

- 我们在进行if判断之前要预先判断 如果onFULFILLED是函数 那么就把原来的onFULFILLED内容重新赋值给它 如果不是函数 就把它改为一个空函数

```js
then(onFULFILLED, onREJECTED) {

  onFULFILLED = typeof onFULFILLED == "function" ? onFULFILLED : () => {}

  onREJECTED = typeof onREJECTED == "function" ? onREJECTED : () => {}

  if(this.status == Commitment.FULFILLE) {
    onFULFILLED(this.result)
  }

  if(this.status == Commitment.REJECTED) {
    onREJECTED(this.result)
  }
}
```

- 这样报错就没有了 接下来我们进行下一个大功能 promise的异步功能

- 上面我们还没有在手写代码里面植入异步功能 比如最基本的setTimeout我们就没有使用

- 我们先来了解下原生promise里面的运行顺序规则

- 我们可以为原生代码添加上步骤信息
```js
// 原生
console.log("第一步")

let promise = new Promise((resolve, reject) => {
  console.log("第二步")
  resolve("这次一定")
})

promise.then(
  result => {
    console.log(result)
  },
  result => {
    console.log(result.message)
  }
)

console.log("第三步")

// 控制台执行结果
// 1. 第一步
// 2. 第二步
// 3. 第三步
// 4. 第一个then里面的结果 这次一定
```

- 我们先指定第一步 接着创建promise实例 并且输出第二部 因为这里依旧是同步 接着碰到resolve的时候修改结果的值 到了promise.then会进行异步操作 也就是我们需要先把执行栈的内容清空 于是就执行了第三步

- 接着才会执行promise.then里面的内容 也就是最后输出这次一定

- 我们手写这边 也加入同样的测试逻辑
```js
console.log("第一步")
let commitment = new Commitment((resolve, reject) => {
  console.log("第二步")
  resolve("这次一定")
})

commitment.then(
  result => {console.log(result)},
  result => {console.log(result.message)}
)
console.log("第三步")

// 我们发现执行结果是同步的
// 第一步
// 第二步
// 这次一定
// 第三步
```

- 问题是这次一定 和 第三步的顺序不对 问题很简单 就是我们刚刚说的 没有设置异步执行 我们可以给then()里面添加setTimeout就可以了

- 我们需要在if判断里面添加setTimeout要不然状态不符合添加异步也是没有意义的 在setTimeout里面执行传入的函数参数

```js
then(onFULFILLED, onREJECTED) {

  onFULFILLED = typeof onFULFILLED == "function" ? onFULFILLED : () => {}
  onREJECTED = typeof onREJECTED == "function" ? onREJECTED : () => {}

  if(this.status == Commitment.FULFILLE) {
    setTimeout(() => {
      onFULFILLED(this.result)
    })
  }

  if(this.status == Commitment.REJECTED) {
    setTimeout(() => {
      onREJECTED(this.result)
    })
  }
}
```

- 输出顺序正常了 但是
- 还有一个问题 我们给原生的添加setTimeout 使得resolve也异步执行 那么就会出现一个问题了

- resolve是异步的 then也是异步的 究竟谁会被先调用呢？
```js
console.log("第一步")

let promise = new Promise((resolve, reject) => {
  console.log("第二步")
  setTimeout(() => {
    resolve("这次一定")
    console.log("第四步")
  })
})

promise.then(
  result => {
    console.log(result)
  },
  result => {
    console.log(result.message)
  }
)

console.log("第三步")

// 执行结果 步骤是按照我们标注的正常循序来的
// 第一步
// 第二步
// 第三步
// 第四步
// 这次一定
```

- 特别要注意的是当遇到setTimeout的时候被异步指定了 而resolve("这次一定")没有马上被执行 而是先执行 console.log("第四步") 等到then的时候再执行resolve里面保存的值

```js
console.log("第一步")
let commitment = new Commitment((resolve, reject) => {
  console.log("第二步")
  setTimeout(() => {
    resolve("这次一定")
    console.log("第四步")
  })
})

commitment.then(
  result => {console.log(result)},
  result => {console.log(result.message)}
)

console.log("第三步")

// 第一步
// 第二步
// 第三步
// 第四步
```

- 同样的测试代码放在手写里面 我们发现 这次一定没有输出
- 没有输出的原因很可能是因为then方法没有被执行 看看then方法里面是根据条件判断来执行代码的 也就是说很可能没有符合条件 再换句话说可能没有符合状态

- 我们可以在不同位置输出状态看看哪个位置出现了问题
```js
console.log("第一步")

let commitment = new Commitment((resolve, reject) => {
  console.log("第二步")
  setTimeout(() => {
    // 状态
    console.log(commitment.status)
    resolve("这次一定")
    // 状态
    console.log(commitment.status)
    console.log("第四步")
  })
})

commitment.then(
  result => {
    // 状态
    console.log(commitment.status)
    console.log(result)
  },
  result => {console.log(result.message)}
)

console.log("第三步")

// 第一步
// 第二步
// 第三步
// 待定
// 成功
// 第四步
```

- 发现只有两组状态被输出 这两组都在第4步前被输出 证明setTimeout里面的状态都被输出了 只有then里面的状态没有被输出 那基本就能确定是因为then里的状态判断出了问题

- 我们看下代码 执行 第一步 第二部 第三步的时候就要开始处理异步了 这里肯定是因为先执行了then方法 又发现这个时候状态依旧是 待定 而我们手写部分没有定义待定状态的时候应该做些什么 因此就少了这次一定这句的输出 所以我们就直接给then方法里面添加待定状态的情况就可以了

- 但是问题来了 当then里面判断到 待定状态的时候 我们要干什么？

- 因为这个时候resolve或者reject还没有获取到任何值

- 因此我们必须让then里面的函数稍后再执行 等resolve执行了以后 再执行then 为了保留then里面的函数 我们可以创建数组来保存函数

- 在 constructor 里面 实例化对象的时候 就让每个实例都有这两个数组

- 一个数组保存resolve函数 另一个保存reject函数 为什么是数组呢？ 因为数组是先入先出的顺序
```js
constructor(func) {
  this.status = Commitment.PENDING
  
  this.result = null
  
  // 这里
  this.resolveCallbacks = []
  this.rejectCallbacks = []

  try {
    func(this.resolve.bind(this), this.reject.bind(this))
  } catch(err) {
    this.reject(err)
  }
}
```

- 接着完善then里面的代码 也就是当判断状态为待定的时候 我们暂且把then里面的两个函数参数分别放在两个数组里面

- 数组里面放完函数以后 就可以完善resolve和reject的代码了

- 在执行resolve或reject的时候遍历自身的callbacks数组

- 看看数组里面有没有then那边保留过来的待执行函数 然后逐个执行数组里面的函数 执行的时候会传入相应的参数 

- 但是resolve和reject是要在事件循环末尾执行的 因此我们就给resolve和reject里面加上了setTimeout

```js
resolve(result) {
  setTimeout(() => {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.FULFILLE
      this.result = result
      this.resolveCallbacks.forEach(callback => {
        callback(result)
      })
    }
  })
}
reject(result) {
  setTimeout(() => {
    if(this.status == Commitment.PENDING) {
      this.status = Commitment.REJECTED
      this.result = result
      this.rejectCallbacks.forEach(callback => {
        callback(result)
      })
    }
  })
}
```

- 我们缕下顺序
```js
console.log("第一步")

let commitment = new Commitment((resolve, reject) => {

  console.log("第二步")

  setTimeout(() => {
    resolve("这次一定")
    reject("下次一定")
    console.log("第四步")
  })
})

commitment.then(
  result => {console.log(result)},
  result => {console.log(result.message)}
)

console.log("第三步")
```

- 首先执行第一步
- 然后new一个实例
- 然后执行第二步
- 遇到setTimeout的时候进行异步操作
- 然后运行实例的then方法 发现依旧是 待定 状态 因为还没有resolve 就是待定的状态 就把函数放到数组里面保存起来
- 然后执行第三步
- 然后又要回头去执行刚刚的setTimeout里面的内容 然后要执行resolve的时候发现又要setTime异步处理 于是就执行了第四步

- 最后再来执行resolve 也就是改变状态 改变结果值 并且遍历刚刚保存的数组对象 最后执行刚刚保存的函数对象 然后就输出这次一定了

- 然后还有链式调用的功能 我们需要让then()返回一个新的promise
- 返回一个新的promise以后 它就有自己的then方法 这样就能实现无限的链式了

```js
class Commitment {

  static PENDING = "待定"
  static FULFILLE = "成功"
  static REJECTED = "拒绝"

  constructor(func) {
    this.status = Commitment.PENDING

    this.result = null
    this.resolveCallbacks = []
    this.rejectCallbacks = []

    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch(err) {
      this.reject(err)
    }
  }

  resolve(result) {
    setTimeout(() => {
      if(this.status == Commitment.PENDING) {
        this.status = Commitment.FULFILLE
        this.result = result
        this.resolveCallbacks.forEach(callback => {
          callback(result)
        })
      }
    })
  }
  reject(result) {
    setTimeout(() => {
      if(this.status == Commitment.PENDING) {
        this.status = Commitment.REJECTED
        this.result = result
        this.rejectCallbacks.forEach(callback => {
          callback(result)
        })
      }
    })
  }

  then(onFULFILLED, onREJECTED) {

    // 返回一个手写promise
    return new Commitment((resolve, reject) => {
      onFULFILLED = typeof onFULFILLED == "function" ? onFULFILLED : () => {}
      onREJECTED = typeof onREJECTED == "function" ? onREJECTED : () => {}

      if(this.status == Commitment.PENDING) {
        this.resolveCallbacks.push(onFULFILLED)
        this.rejectCallbacks.push(onREJECTED)
      }

      if(this.status == Commitment.FULFILLE) {
        setTimeout(() => {
          onFULFILLED(this.result)
        })
      }

      if(this.status == Commitment.REJECTED) {
        setTimeout(() => {
          onREJECTED(this.result)
        })
      }
    })
  }
}

let commitment = new Commitment((resolve, reject) => {
  resolve("这次一定")
})

commitment.then(
  result => {console.log(result)},
  result => {console.log(result.message)}
)
```

- 完成