# null 和 undefind 的区别
null 和 undefind 是有语义上的差别的

- undefind表示无值, 有一个东西可能是任何值 但是此时此刻是无值的
- null表示无对象, 有一个东西将来可能是对象, 但是此时此刻还不是一个对象

<br><br>

# 类型转换规则, 运算规则, 表达式

### 类型转换规则
类型转换有如下的4种情况
**1. 原始 -> 数字**  
1. true: 1
2. false: 0
3. null: 0
4. undefined: NaN
5. string
  1. 空字符串(含空白字符): 0
  2. 去掉引号, 不是数字 就是NaN

<br>

**2. 所有 -> bool**  
记住什么时候是false

1. null: false
2. undefined: false
3. number
  1. 0: false
  2. 其它: true
4. string:
  1. 空字符串: false
  2. 其它: true
5. 对象: true

<br>

**3. 原始 -> 字符串**

<br>

**4. 对象 -> 原始**  
调用valueOf
1. 得到的结果为对象?重新调用toString
2. 得到的结果还是对象?报错

<br>

### 运算规则
**1. 算术运算 (+ - * / % ++ --)**  
算术运算的时候 运算符左右两端必须是原始类型 

如果两端都是原始类型后 先看是否有特殊情况

- 特殊情况1: x + y, x 和 y有一个是字符串, 转换为字符串 然后进行拼接

- 特殊情况2: NaN和任何类型运算得到的还是NaN

没有特殊情况的时候 转换为数字然后进行运算

<br>

**2. 比较运算 (> < >= <= == != === !===)**
- ``> < >= <=``: 转成原始类型
  - 特殊情况: 两端全是字符串 比较字典顺序
  - 特殊情况: 两端存在NaN 一定为false

- ===: 类型和值必须都相同 (特殊情况两端存在NaN 一定为false)

- ==:
  - 两端类型相同 比较值
  - 两端都是原始类型 转成数字比较
  - 一端是原始类型 一端是对象类型 把对象转换为原始类型后比较
  - 特殊情况1: undefined 和 null 只有与自身比较 或者 互相比较的时候 才会返回true
  - 特殊情况2: 两端存在NaN 一定为false

- != !==: 和相等取反


<br>

**3. 逻辑运算 (! && || ?:)**  
转换为boolean
- x && y:
  - x为false 返回x
  - x为true 返回y

- x || y:
  - x为false 返回y
  - x为true 返回x

<br>

### 表达式
js中数据有3种形式
1. 字面量
2. 变量
3. 表达式

表达式就是数据和运算符的结合, 1 + 2, 表达式中有一个重要的部分就是返回值

它表示表达式的运算结果 表达式都会有一个返回值 

任何可以写数据的地方我们都可以写 上面的3种形式


<br><br>

# 高阶函数

## 高阶函数: 封装动画函数
只要是需要用到js动画, 都可以使用这个函数

### 动画的本质
在一段时间内 从一个数字变化到另一个数字, 比如元素的宽高 颜色

<br>

下面的动画函数还有如下的问题
1. 动画是匀速变化的
2. 如下的值不是整数位再发生变化的

```js
// 在多久内, 从哪一个值 变换到 哪一个值
function animation(duration, from, to) {
  // 获取变化的距离
  const dis = to - from

  // 获取变化的速度, 距离 / 时间
  const speed = dis / duration

  // 记录开始时间
  let startTime = Date.now()

  // 使用如下的变量记录当前的值, 当前的值从起始值开始 每隔一小段时间进行变化
  let value = from

  // 值变化的函数, 每次调用run函数的时候 都会根据当前的信息算出一个新的值 重新给value赋值
  function _run() {
    // 计算当前的时间
    const now = Date.now()
    // 计算从起始时间开始 到现在 流逝的时间
    const time = now - startTime

    // 终止条件: 当经过的时间time 超过了 duration 的时候 就应该停止了
    if(time >= duration) {
      // 这时将value设置为目标值
      value = to
      return
    }

    // 计算变化的距离 time时间段内 运动了多少?
    const d = time * speed

    // 起始值 + 新的距离 算出当前的值
    value = from + d

    // 每隔一小段时间调用 _run 就可以不断的去修改这个value
    requestAnimationFrame(_run)
  }

  // 在下一次渲染的时候调用这个函数就可以了
  requestAnimationFrame(_run)
}

btn.onclick = function() {
  animation(1000, 500, 900)
}
```

<br>

### 修改为高阶函数
上面的函数会将value不断的变化, 我们假如要使用value的时候, 就要通过回调来完成
```js
// 在多久内, 从哪一个值 变换到 哪一个值
// onProgress: 回调 用来加工value
function animation(duration, from, to, onProgress) {
  // 获取变化的距离
  const dis = to - from

  // 获取变化的速度, 距离 / 时间
  const speed = dis / duration

  // 记录开始时间
  let startTime = Date.now()

  // 使用如下的变量记录当前的值, 当前的值从起始值开始 每隔一小段时间进行变化
  let value = from
  onProgress(value)

  // 值变化的函数, 每次调用run函数的时候 都会根据当前的信息算出一个新的值 重新给value赋值
  function _run() {
    // 计算当前的时间
    const now = Date.now()
    // 计算从起始时间开始 到现在 流逝的时间
    const time = now - startTime

    // 终止条件: 当经过的时间time 超过了 duration 的时候 就应该停止了
    if(time >= duration) {
      // 这时将value设置为目标值
      value = to
      onProgress(value)
      return
    }

    // 计算变化的距离 time时间段内 运动了多少?
    const d = time * speed

    // 起始值 + 新的距离 算出当前的值
    value = from + d
    onProgress(value)

    // 每隔一小段时间调用 _run 就可以不断的去修改这个value
    requestAnimationFrame(_run)
  }

  // 在下一次渲染的时候调用这个函数就可以了
  requestAnimationFrame(_run)
}


btn.onclick = function() {
  animation(1000, 500, 900, (value) => {
    label.textContent = `价格: ${value.toFixed(2)}`
  })
}
```

<br><br>

## 高阶函数: 并发队列
```s
https://www.bilibili.com/list/3494367331354766?sort_field=pubtime&spm_id_from=333.999.0.0&oid=490880438&bvid=BV1SN411p7PN
```
```js
// tasks: Function[] 每一个任务是一个异步函数
// parallelCount: 最大的并发量 一次性最多可以同时运行几个任务
// 返回值: 返回一个promise 当所有的任务完成后 promise完成
function paralleTask(tasks, parallelCount = 2) {
  return new Promise(resolve => {

    // 特殊情况: 如果tasks为空
    if (tasks.length === 0) {
      // 任务完成 return掉
      resolve()
      return
    }


    // 记录下一个任务的下标
    let nextIndex = 0
    // 记录已经完成的任务数量
    let finishCount = 0
    // 辅助函数 每调用一次就运行一个任务
    function _run() {
      // 该函数的作用就是运行下一个任务
      const task = tasks[nextIndex]
      nextIndex++

      task().then(() => {
        // 每次任务完成 更新完成任务的数量
        finishCount++

        // 每个任务完成后 如果还有下一个任务 就要运行下一个任务
        if (nextIndex < tasks.length) {
          _run()
        // 任务完成
        } else if (finishCount === tasks.length){
          // 整体的promise是否结束 不是说没有下一个任务就结束了 取决于是不是所有的任务都已经完成了 我们创建 finishCount 变量记录任务完成的数量

          resolve()
        }
      })
    }


    // 根据并发数量 parallelCount 执行对应个数的任务, i < tasks.length确保不会执行不存在的任务 比如tasks有2个, 我们传入的并发数却是3
    for(let i = 0; i < parallelCount && i < tasks.length; i++) {
      _run()
    }
  })
}

paralleTask(tasks, 2).then(() => {
  console.log('全部完成')
})
```

<br><br>

## 高阶函数: 参数归一化
我们对date日期进行格式化, 并返回一个字符串
```js
// date: Date日期对象
// formatter: 格式化的模版
// isPad: 格式化模版中的细节 是否日期时间前面加上0
function formate(date, formatter, isPad = false) {

} 

// 可能调用的方式
// 2023-4-6
formate(new Date(), 'date')
// 2023-4-6 14:7:41
formate(new Date(), 'datetime')
// 2023-04-06
formate(new Date(), 'date', true)
// 2023-04-06 14:07:41
formate(new Date(), 'datetime', true)
// 2023年4月6日 14:7:41.336
formate(new Date(), 'yyyy年MM月dd日 HH:mm:ss.ms', true)
// 2023年4月6日 14:7:41.336 (定制化需求)
formate(new Date('2022/1/1'), (dateInfo) => {
  const { year } = dateInfo
  const thisYear = new Date().getFullYear()
  if (year < thisYear) {
    return '年前'
  } else if (year > thisYear) {
    return '年后'
  } else {
    return '今年'
  }
})
```

我们能观察到 上面的函数由于参数的情况太多了 如果不加以处理的话 我们要写n种判断

<br>

### 思考
我们思考下 有这么多场景 那么当中的哪种场景是最灵活的? **是不是传入回调的场景 那是不是就意味着其他的情况我们都可以想办法转换为函数**

所以我们可以在 formate内部 无论参数是哪种情况我们都给它转换为回调的情况, **这就是参数的归一化**, 把不同的情况转换为最终的一种情况

<br>

**总结:**  
在归一化的场景中, 我们经常将参数都会转换为函数

<br>

```js
// 创建辅助函数 将formate的函数的参数进行归一化
function _formateNormalize(formatter) {
  // 返回一个回调(函数)
  if (typeof formatter === 'function') {
    return formatter
  }
  
  if (typeof formatter !== 'string') {
    throw new TypeError('formatter must be a string')
  }
  
  // 统一将 date datetime 转换为 yyyy-MM-dd HH:mm:ss 的格式
  if (formatter === 'date') {
    formatter = 'yyyy-MM-dd'
  } else if (formatter === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm:ss'
  }

  // 将 yyyy-MM-dd HH:mm:ss 字符串 转化为一个函数 中心都是归一
  const formatterFunc = (dateInfo) => {
    const { yyyy, MM, dd, HH, mm, ss, ms } = dateInfo

    return formatter
      .replaceAll('yyyy', yyyy)
      .replaceAll('MM', MM)
      .replaceAll('dd', dd)
      .replaceAll('HH', HH)
      .replaceAll('mm', mm)
      .replaceAll('ss', ss)
      .replaceAll('ms', ms)
  }

  return formatterFunc
}

function formate(date, formatter, isPad = false) {
  // formatter 中 保存的是一个函数了
  formatter = _formateNormalize(formatter)

  const dateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    miniSecond: date.getMilliseconds()
  }

  dateInfo.yyyy = dateInfo.year.toString()
  dateInfo.MM = dateInfo.month.toString()
  dateInfo.dd = dateInfo.date.toString()
  dateInfo.HH = dateInfo.hour.toString()
  dateInfo.mm = dateInfo.minute.toString()
  dateInfo.ss = dateInfo.second.toString()
  dateInfo.ms = dateInfo.miniSecond.toString()

  function _pad(prop, len) {
    dateInfo[prop] = dateInfo(prop).padStart(len, '0')
  }
  if (isPad) {
    _pad('yyyy', 4)
    _pad('MM', 2)
    _pad('dd', 2)
    _pad('HH', 2)
    _pad('mm', 2)
    _pad('ss', 2)
    _pad('ms', 3)
  }

  // 调用归一化的函数 将dateInfo传入
  return formatter(dateInfo)
}
```

<br><br>

## 高阶函数: 惰性函数
它可以有效的提升代码的执行效率 我们以复制文本为例 来说下惰性函数

![复制文本](./images/复制文本.png)

```js
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    // IE浏览器一般使用这种
    const input = document.createElement('input')
    input.setAttribute('value', text)
    document.body.appendchild(input)
    // 选中 文本
    input.select()
    // 执行 复制命令
    document.execCommand('copy')
    document.body.removeChild(input)
  }
}
```

上面的代码在功能上没有任何问题, 但是有一些缺陷, 我们没有必要每次调用函数的时候都去做这个判断

浏览器是否支持 navigator.clipboard 一次就可以确定了

所以我们想一旦确定支持与否后, 就固定下来使用哪一种方案

如果支持 navigator.clipboard 则函数变成如下的格式
```js
copyText = (text) => {
  navigator.clipboard.writeText(text)
}
```

如果不支持 则函数变成如下的格式
```js
copyText = (text) => {
  const input = document.createElement('input')
  input.setAttribute('value', text)
  document.body.appendchild(input)
  // 选中 文本
  input.select()
  // 执行 复制命令
  document.execCommand('copy')
  document.body.removeChild(input)
}
```

<br>

我们可以这样, 不管走哪一个分支, 我们将 copyText 函数本身改成对应的格式 这样将来在第二次调用这个函数的时候, 调用的就不是原本的 copyText, 而是改写之后的
```js
function copyText(text) {
  if (navigator.clipboard) {
    copyText = (text) => {
      navigator.clipboard.writeText(text)
    }
    copyText(text)
  } else {
    copyText = (text) => {
      const input = document.createElement('input')
      input.setAttribute('value', text)
      document.body.appendchild(input)
      // 选中 文本
      input.select()
      // 执行 复制命令
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    copyText(text)
  }
}
```

<br>

### 惰性函数
上面的做法就是惰性函数

在函数第一次调用的时候, 也就是初始化的时候 我根据不同的情况 更改这个函数的具体行为 把这个函数给它确定下来 让以后得调用去执行最终确定的结果就可以了

<br>

### 修改为高阶函数版本
```js
function createCopy(text) {
  if (navigator.clipboard) {
    return copyText = (text) => {
      navigator.clipboard.writeText(text)
    }
  } else {
    return copyText = (text) => {
      const input = document.createElement('input')
      input.setAttribute('value', text)
      document.body.appendchild(input)
      // 选中 文本
      input.select()
      // 执行 复制命令
      document.execCommand('copy')
      document.body.removeChild(input)
    }
  }
}

const copyText = createCopy()


// 还可以这样
const copyText = (function() {
  if (navigator.clipboard) {
    return copyText = (text) => {
      navigator.clipboard.writeText(text)
    }
  } else {
    return copyText = (text) => {
      const input = document.createElement('input')
      input.setAttribute('value', text)
      document.body.appendchild(input)
      // 选中 文本
      input.select()
      // 执行 复制命令
      document.execCommand('copy')
      document.body.removeChild(input)
    }
  }
})()
```

<br><br>

## 高阶函数: 根据条件, 对数组进行分组
我们有如下的一个数组, 要根据年龄进行分组

![数组01](./images/数组01.png)

分组出来之后要形成一个对象, age作为key, 比如年龄我30的有哪些人
```js
{
  '30': [{年龄为30的对象}, {年龄为30的对象}, ...],
  '25': [{年龄为25的对象}, {年龄为25的对象}, ...],
}
```

<br>

### 实现:
```js
const result = {}

for (const item of people) {
  const key = item.age
  if (!result[key]) {
    result[key] = []
  }

  result[key].push(item)
}
```

上面的代码就能实现按照年龄进行分组的需求, 但是需求往往是会变化的 比如有一天它就可能会按照性别来进行分组

所以我们创建一个通用的分组函数
```js
function groupBy(arr, propName) {
   const result = {}

  for (const item of arr) {
    const key = item[propName]
    if (!result[key]) {
      result[key] = []
    }

    result[key].push(item)
  }

  return result
}
```

<br>

### 思考:
上面的函数就真的那么通用么? 如果我们上面的people数组对象中 还有嵌套的对象怎么办, 比如我们想按照省份来进行分组
```js
[
  {
    name: 'Green',
    age: 20,
    sex: 'female',
    address: {
      province: '黑龙江',
      city: '哈尔滨'
    }
  }
]
```

再比如我们分组的条件是 年龄 + 性别, 分组的结果为
```js
{
  '20-female': []
}
```

再比如我们要分组的数组, 就是一个数字数组, 我们按照素数和合数来分组, 这样是不是都要修改源代码
```js
const arr = [12,3,34,5,56]
```

**我们希望的是无论什么样的分组操作我们都可以使用这个函数**

<br>

### 修改
我们发现 上面的代码中 只有得到key的过程是不一定的 ``const key = item[propName]`` 我们的位置条件并不是属性名 而是该如何来得到这个key

该如何得到一个key, 这是一个过程 所以 groupBy 函数的第二个参数应该是一个函数才对
```js
function groupBy(arr, generateKey) {
   const result = {}

  for (const item of arr) {
    // 通过 generateKey 来获取key
    const key = generateKey(item)

    if (!result[key]) {
      result[key] = []
    }

    result[key].push(item)
  }

  return result
}

// 由调用者自行决定 获取key的方式
groupBy(people, (item) => item.age)

// key: '20-female'
groupBy(people, (item) => `${item.age}-${item.sex}`)
```

<br>

我们希望groupBy有两种传递参数的方式
1. ``groupBy(people, 'age')`` 
2. ``groupBy(people, (item) => item.age)``

<br>

```js
function groupBy(arr, generateKey) {
  // 参数归一化
  if (typeof generateKey === 'string') {
    const propName = generateKey
    generateKey = (item) => item[propName]
  }

   const result = {}

  for (const item of arr) {
    // 通过 generateKey 来获取key
    const key = generateKey(item)

    if (!result[key]) {
      result[key] = []
    }

    result[key].push(item)
  }

  return result
}

// 由调用者自行决定 获取key的方式
groupBy(people, (item) => item.age)

// key: '20-female'
groupBy(people, (item) => `${item.age}-${item.sex}`)
```

<br><br>

## 高阶函数: 分时函数的封装 (重要)
```s
https://www.bilibili.com/list/3494367331354766?sort_field=pubtime&spm_id_from=333.999.0.0&oid=873496983&bvid=BV1qK4y1c7q1
```

页面上有一个按钮, 点击按钮后会生成10万个元素 加到页面, 这样会有卡顿
```js
const btn = document.querySelector('.btn')
const datas = new Array(100000).fill(0).map((_, i) => i)

btn.onclick = () => {
  for (const item of datas) {
    const div = document.createElement('div')
    div.textContent = item
    document.body.appendChild(div)
  }
}
```

在一段时间内它要处理的任务太多了, 所以导致了页面的卡顿 阻塞了主线程 所以让页面的渲染延后了

我们虽然无法减少它循环的总时间 但是我们却可以减少它的卡顿

<br>

### 解析:
![分时函数01](./images/分时函数01.png)

但是由于任务的执行 将本来应该渲染的时机, 推迟到了任务结束后 

我们可以将长的任务 分解成一段段的任务, 在每一段任务之间 给浏览器一个渲染的时机 这样虽然总的任务时间没有变 但是由于浏览器能够及时的得到渲染 给用户的感知就是没有卡顿了

![分时函数02](./images/分时函数02.png)

<br>

### 实现
![分时函数03](./images/分时函数03.png)
```js
const btn = document.querySelector('.btn')
const datas = new Array(100000).fill(0).map((_, i) => i)

btn.onclick = () => {
  performChunk(datas)
}

// 以分块的方式来执行任务
// datas: 所有要执行的相关数据
function performChunk(datas) {

  // 排除特殊情况
  if (datas.length === 0) {
    return
  }

  // 记录目前应该取的任务下标
  let i = 0

  // 我们不会将整个任务一起执行 而是一个个的取出执行 取出一个执行一个, 比如先取3个任务 我们就形成一个任务快, 后续如果还有其它的任务块, 我们等一会等浏览器渲染之后 我们再执行下一块(3个任务)

  // 执行的时候是一块一块的执行, 一块里面可能会执行多个任务 我们写个辅助函数, 我们一调用_run函数它就会执行一块任务
  function _run() {
    // 如果没有下一个任务执行的时候 就执行完了
    if (i === datas.length) {
      return
    }

    // 有任务可以执行的情况 利用 requestIdleCallback(idle => { ... })
    // 浏览器有一个渲染帧 每一帧的时间大概在16.6毫秒 在每一帧中可能有各种各样的事情 比如执行js代码 执行css 等等
    // 16.6对于计算机来说很长, 它可能都执行完了 发现还有一些剩余的时间 这些空闲时间 我们就可以做一些别的事情
    // 浏览器在每一帧里面都会调用一次这个requestIdleCallback, 通过这个参数idle 我们能够知道目前这一帧中还有没有空闲时间
    // idle.timeRemaining() 得到的是一个数字 表示目前还剩下多少毫秒是空闲的 我们只要发现空闲时间是大于0的 就说明在这一帧中有空闲时间 那么我们就可以在这一帧中取出一个任务来执行

    requestIdleCallback(idle => {
      // 循环结束后表示这一块的任务已经完事了 我们再等待下一帧的空闲时间里面再去执行剩余的任务
      while(idle.timeRemaining() > 0 && i < datas.length) {
        const item = datas[i]
        const div = document.createElement('div')
        div.textContent = item
        document.body.appendChild(div)

        // 执行结束后更新下标 i
        i++
      }

      // 循环结束后 递归调用run
      _run()
    })
  }

  // 调用run()函数 它就会把任务一块一块的执行完成 不管这个任务有多长它都不会导致页面的卡顿
  _run()
  
}
```

<br>

### 优化:
优化角度希望上面的函数变得更加的通用
```js
// consumer 我们拿到数据后做什么的回调
function performChunk(datas, consumer) {
  if (datas.length === 0) {
    return
  }

  // 记录目前应该取的任务下标
  let i = 0

  function _run() {
    if (i === datas.length) {
      return
    }

    requestIdleCallback(idle => {
      while(idle.timeRemaining() > 0 && i < datas.length) {
        const item = datas[i]

        // 通过回调让用户自己决定 数据用来干什么
        consumer(item, i)

        // 执行结束后更新下标 i
        i++
      }

      _run()
    })
  }

  _run()
  
}


btn.onclick = () => {
  const consumer = (item) => {
    const div = document.createElement('div')
    div.textContent = item
    document.body.appendChild(div)
  }
  performChunk(datas, consumer)
}
```

performChunk函数是用来执行一个长任务的, 长任务一定要有一个数据的数组么? 不一定, 比如我们就是要把一个函数执行100万次 我没有什么数组 你给我调用100万次就可以了

所以 performChunk 的第一个参数有可能只是一个数字 ``performChunk(1000000, consumer)``

这里我们还是可以用参数的归一化来进行处理

```js
function performChunk(datas, consumer) {

  if (typeof datas === 'number') {
    datas = new Array(datas)
  }

  if (datas.length === 0) {
    return
  }

  // 记录目前应该取的任务下标
  let i = 0

  function _run() {
    if (i === datas.length) {
      return
    }

    requestIdleCallback(idle => {
      while(idle.timeRemaining() > 0 && i < datas.length) {
        const item = datas[i]

        // 通过回调让用户自己决定 数据用来干什么
        consumer(item, i)

        // 执行结束后更新下标 i
        i++
      }

      _run()
    })
  }

  _run()
  
}
```

我再思考下, 上面的代码是只考虑在浏览器的环境下 我们使用了 requestIdleCallback 函数, 那么要是不在浏览器的环境里怎么办?

node环境中怎么办呢?

所以我们在实现 performChunk 的时候, 不能将它跟 requestIdleCallback 绑在一起

<br>

### 思考:
1. 如何分割执行块:  
比方说目前这个分块执行完了 时间已经耗完了 我们什么时候执行下一个分块

2. 还有执行时间么?  
我再具体的执行这个分块的时候 我到底还有没有剩余的时间

<br>

**问题1:**  
我们需要一个类似 requestIdleCallback 的东西 也就是 chunkSplitor

**问题2:**  
还有执行时间么?

```js
function performChunk(datas, consumer, chunkSplitor) {

  if (typeof datas === 'number') {
    datas = new Array(datas)
  }

  if (datas.length === 0) {
    return
  }

  // 参数的归一化
  if (!chunkSplitor && globalThis.requestIdleCallback) {
    chunkSplitor = (task) => {
      requestIdleCallback(idle => {
        task(() => idle.timeRemaining() > 0)
      })
    }
  }

  // 记录目前应该取的任务下标
  let i = 0

  function _run() {
    if (i === datas.length) {
      return
    }

    // 将 requestIdleCallback 换成 chunkSplitor 它里面传递了一个函数 也就是那一块的任务
    chunkSplitor((hasTime) => {
      const now = Date.now()
      // hasTime(Date.now() - now 表示目前执行这个任务用了多少时间了
      while(hasTime(Date.now() - now) && i < datas.length) {
        const item = datas[i]

        // 通过回调让用户自己决定 数据用来干什么
        consumer(item, i)

        // 执行结束后更新下标 i
        i++
      }

      _run()
    })
  }

  _run()
  
}


btn.onclick = () => {
  const consumer = (item) => {
    const div = document.createElement('div')
    div.textContent = item
    document.body.appendChild(div)
  }

  // 调用的时候 传入第3个参数, 该函数的作用就是决定应该什么时候执行
  const chunkSplitor = (task) => {
    setTimeout(() => {
      // 传入怎么来判断是否还有时间的 传入一个函数 也就是上面的hasTime
      // time就是目前执行的时间 < 16 毫秒就表示还有时间可以执行
      task((time) => time < 16)
    }, 2000)
  }
  performChunk(datas, consumer, chunkSplitor)
}
```

<br><br>

# Web Animation Api (WAAPI)
这套api可以让我们在js中实现动画 而且它的效率跟css几乎一样 不会修改dom的style样式 也就是说他不会重新渲染dom树

```s
https://www.bilibili.com/list/3494367331354766?sort_field=pubtime&spm_id_from=333.999.0.0&oid=276997298&bvid=BV18w411A7Cf
```

我们要使用 animation api 它是给一个元素产生一个动画 这个api的好处在于 它不会改动dom树(元素的属性结构 它都不会动) 这样就避免了跟style的冲突

<br>

参考: ``/Memo/Notes/frontend/Vue/Vue3/Vue3_技巧.md``

<br>

### **<font color='#C2185B'>元素.animate(keyframes, options)</font>**

它会返回一个动画对象(animation), 我们可以通过该对象操作 元素的css动画

动画对象中有一些方法供我们使用
- 暂停动画: animation.pause()
- 播放动画: animation.play()

<br>

**参数1: keyframes**  
类似css中我们写的 ``@keyframes`` 
```css
/* 应该是鼠标光圈的样式 */
@keyframes spread {
  0% {
    transform: scale(0);
    opacity: 1
  }
  100% {
    transform: scale(1);
    opacity: 0
  }
}
```


在js中就是一个数组, 数组的每一项就是一个关键帧, 每一项为对象 写的是样式属性
```js
[
  // from
  {
    transform: `translate(0,0)`
  },
  // to
  {
    transform: `translate(${x}px,${y}px)`
  }
]
```

<br>

**参数2: options**  
1. 直接写数字 2000, 表示动画的总时间
2. 写对象
```js
{
  duration: 2000,
  // 跟 css中的 animation-fill-mode 一样
  fill: 'forwards' // 动画完成后 以最终的动画关键帧作为最终样式,
  // 设置所有动画效果的时间函数, 相当于统一设置
  easing: 'ease-in-out'
}
```

<br>

### **<font color='#C2185B'>元素.getAnimations()</font>**

<br>

### **<font color='#C2185B'>元素.getAnimations()</font>**
我们每一次调用 ball.animate 的时候都会开启一个新的动画 过去的动画不会消失 它会将过去的动画对象和动画配置全部保留

我们通过该方法 可以拿到所有应用在ball元素身上的动画 它是一个动画对象构成的数组

<br>

所以当我们开启一个新的动画的时候 之前的动画已经不需要了 我们可以手动的清除掉

<br>

**动画对象.cancel():**  
取消之前的动画
```js
元素.getAnimations().forEach(animation => animation.cancel())
```

```js
// 鼠标点击 光圈的效果:
window.addEventListener('click', e => {
  const pointer = document.createElement('div')
  pointer.classList.add('pointer')
  pointer.style.left = `${e.clientX}px`
  pointer.style.top = `${e.clientY}px`
  document.body.appendChild(pointer)

  pointer.addEventListener('animationend', () => {
    pointer.remove()
  })
})

// 获取小球
const ball = document.querySelector('.ball')

// 将小球放到屏幕中间
function init() {
  // 获取屏幕中间的坐标
  const x = window.innerWidth / 2
  const y = window.innerHeight / 2

  ball.style.transform = `translate(${x}px, ${y}px)`
}
init()

// 点击事件: 点击屏幕的一个点的时候, 我要把小球移动到这个点
window.addEventListener('click', e => {
  const x = e.clientX
  const y = e.clientY

  // 移动小球到指定的位置
  move(x, y)
})

// 核心函数: 让小球从当前的位置跑到给定的xy的位置
function move(x, y) {
  // 2. 实时计算小球的当前位置
  const ballRect = ball.getBoundingClientRect()
  const initX = ballRect.left + ballRect.width / 2
  const initY = ballRect.top + ballRect.height / 2

  // 3. 取消之前的动画
  ball.getAnimations().forEach(animation => animation.cancel())

  // 1. 通过 元素 调用 animation api
  // 参数1: keyframes
  // 参数2: options
  ball.animate(
    // 在一个动画期间 平均分配下面的动画效果
    [
      // from
      {
        transform: `translate(${initX}px, ${initY}px)`
      },
      // to
      {
        transform: `translate(${x}px, ${y}px)`
      }
    ],
    {
      duration: 1000,
      fill: 'forwards'
    }
  )
}
```

<br>

### 分段动画:
上面我们使用 animate 的时候 传入了第一个参数, 它类似css中的 ``@keyframes`` 关键帧

```js
[
  {
    transform: `translate(${initX}px, ${initY}px)`
  },
  {
    transform: `translate(${x}px, ${y}px)`
  }
],
```

我们传入了两个关键帧, 这相当于我们在一个动画时间内 平均由分配上面的动画效果, 但现在我们希望完成在 0% 30% 100% 分别设置不同的动画状态 怎么处理?

<br>

**offset: 取值 0 ~ 1**   
相当于0% 50%的作用

<br>

**easing: 各别关键帧的时间函数**  
```js
[
  // 0%
  {
    transform: `translate(${initX}px, ${initY}px)`,
    easing: 'ease-out'
  },
  // 60%
  {
    transform: `translate(${initX}px, ${initY}px) scaleX(1.5)`,offset: 0.6
  },
  // 80%
  {
    transform: `translate(${x}px, ${y}px) scaleX(1.5)`,
    offset: 0.8,
    easing: 'ease-in'
  },
  // 100%
  {
    transform: `translate(${x}px, ${y}px)`
  }
],
```


<br><br>

# 大厂规定: 避免给变量的值定义为 undefined
应该使用 ``viod 0`` 替代 undefined

viod 后面接表达式, 不管表达式的值是什么 最终``void 表达式``都返回 ``undefined``

<br>

### undefined 的问题
undefined不是关键字, 它是全局对象window中的一个只读属性 无法更改, 所以它可以做为key
```js
let undefined
```

虽然我们将undefined定位key的几率很低, 但也要避免


<br><br>

# Clipboard 剪切板API
这套api分为两个部分放在不同的位置

1. navigator.clipboard 这个对象中有很多的方法 供我们操作剪切板 往剪切板中读写东西
```s
当我们复制某些东西的时候 会将东西放到剪切板中(内存区域), 我们取的时候也是从剪切板中取的
```

2. 事件 当用户在页面上进行复制 粘贴的时候 会触发响应的事件

<br>

### 案例1: 不允许用户复制 & 往用户的剪切板中写东西
我们要监听用户的复制事件
```js
// 监听整个页面
document.addEventListener('copy', e => {
  // 阻止事件的默认行为, 不允许复制 复制的内容不会放入到剪切板
  e.preventDefault()

  // 使用 navigator.clipboard 对象中的方法 往用户的剪切板中写东西
  navigator.clipboard.writeText('hello world')
})
```

<br>

### 案例2: 在用户复制的时候 往剪切板中追加东西
```js
btn.addEventListener('click', e => {
  navigator.clipboard.writeText(inp.value + '追加内容')
})
```

<br>

### 案例3: 页面加载的时候 获取剪切板中的内容
```js
// 它会返回一个promise 这时候浏览器会提示用户 这个网站想要读你的剪切板的内容 允许后才会允许读取
navigator.clipboard.readText().then(res => {
  console.log(res)
})
```


<br>

### 案例4: 截图 粘贴
```html
<!-- contenteditable 可以放图片 -->
<div class="editor" contenteditable></div>

<script>
  // 监听粘贴事件
  document.addEventListener('paste', e => {
    // 当我们粘贴的是文件的时候 e.clipboardData.files它会提供一个数组叫做 files
    // 粘贴的是文本的时候 files 的length为0
    // 粘贴的是文件的时候 files 的length就有值了, 截图和复制桌面的文件 都是文件的情况
    if (e.clipboardData.files.length > 0) {
      // 阻止事件的默认行为 我们不用浏览器的默认行为来粘贴 我们自己处理
      e.preventDefault()

      // 获取文件对象
      const file = e.clipboardData.files[0]
      // 将文件内容读取为base64字符串
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        // e.target.result  base64字符串
        const img = document.createElement('img')
        img.src = e.target.result

        document.querySelector('.editor').appendChild(img)
      }
    }
  })
</script>
```



<br><br>

# 数字的字面量
如下的情况都属于数字
1. 1
2. 2
3. .1 (可以省略掉前面的0)
4. 06 (尝试将它理解为8进制, 当出现8的时候又尝试理解为10进制比如 081, 8进制中不可能出现8)
5. 0o7 (纯粹的8进制)
6. 0xabcdef (16进制)
7. 10000000 (1e8, 1后面8个零的写法 1x10的8次方)

<br>

```js
11.toString(2)  // 报错, 因为js将 11. 理解成数字了

11..toString(2) // 修改方式: 再加一个.
```

<br><br>

# 等号运算符(==)的运算 和 转换规则
如何让下面的等式成立, 下面题考的就是运算符的运算规则
```js
if (a == 1 && a == 2 && a == 3) {
  console.log('牛逼')
}
```

<br>

### 等号运算符的规则
从上到下 **按照顺序**, 进行规则比较, 直到能得到确切结果为止

1. 两端类型相同, 比较值

2. 两端存在NaN, 返回false

3. undefined 和 null 只有与自身比较, 或者 他俩互相比较的时候, 才会返回true
```js
undefined == null  // true
null == null  // true
undefined == undefined  // true

// 其它的情况, 只要有一端是它们, 结果就是 false
```

4. **两端都是原始类型, 转成数字比较**
```js
true == 1  // boolean 和 number 都是原始类型 转成数字比较的 
```

5. 一端是原始类型, 一端是对象类型, 把对象转成原始类型后 进入第4步

<br>

### 对象如何转成原始类型
不仅仅是==运算符会用到, 其它的运算符也会遇到对象如何转成原始类型

1. 如果对象拥有 ``[Symbol.toPrimitive]`` 属性(值为方法) 调用该方法(没有该方法就算了 直接进入第二步)
  1. 若该方法能得到原始值, 使用该原始值
  2. 若该方法得不到原始值, 则抛出异常 (不会往后看)

2. 调用对象的 ``valueOf`` 方法
  1. 若该方法能得到原始值, 使用该原始值
  2. 若该方法得不到原始值, 进入下一步

3. 调用对象的 ``toString`` 方法
  1. 若该方法能得到原始值, 使用该原始值
  2. 若得不到原始值, 抛出异常

<br>

valueOf方法是所有对象身上都有的方法 该方法在对象原型上提供的, 引用类型的值调用valueOf方法 会返回该引用类型本身, 这是valueOf的默认实现, 我们可以在对象身上重写该方法
```js
const obj = {}
console.log(obj.valueOf())  // {}
```

<br>

### 解决问题
```js
if (a == 1 && a == 2 && a == 3) {
  console.log('牛逼')
}
```

a定义为对象, 对象中声明valueOf方法, 我们要保证第一次调用valueOf的时候返回1, 第二次调用的时候返回2, 第三次调用的时候返回3

<br>

```js
const a = {
  count: 1,
  valueOf() {
    return this.count++
  }
}
if (a == 1 && a == 2 && a == 3) {
  console.log('牛逼')
}
```

<br><br>

# 代码雨
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=407518948&bvid=BV1PG411176f
```

<br><br>

# 过渡效果 / 动画效果 监听事件:

### transitionend / animationend

<br>

### 绑定方式:
```js
le.addEventListener('transitionend', fn, false);
// 指定回调
function fn(){ ... };
```

<br>

### 技巧:
transitionend会根据过渡属性触发多次, 如果我们只想触发一次的话 可以这么解决
```js
// 我们指定第三个参数 这样 transitionend 只会触发一次 可以结束多个属性多次触发事件的问题
le.addEventListener('transitionend', fn, {
  once: true
});


const ball = document.querySelector('.ball')

ball.addEventListener('transitionend', () => {
  console.log('...')
}, { once: true })
```

<br>

**但是如果我们期望 鼠标移入触发一次 鼠标移出触发一次 的话 怎么解决?**  
我们的动画是有分组的, 比如我们鼠标移入这个元素 它有很多东西都在变 比如下图中 transform在变, border-radius 在变 在逻辑上这两个变化 应该是合并成一组的

但是在浏览器的环境中 它没有动画分组这个功能 所以浏览器会将这两种变化看成是独立的 因此它就触发了多次

但是从逻辑上来说它应该是一组动画

![transitionend01](./images/transitionend01.png)

<br>

**解决方案:**  
使用防抖, 没有分组 那我们就以间隔时间来作为分组的条件了 比如 我们如下的属性在发生变化
1. transform在变化 
2. border-radius在变化

这两个属性变化的结束时间基本上是一致的 可能 border-radius 比 transform 晚上几微妙 时间间隔非常的短

那我们就以 border-radius 最后一次为准 前面的我就不触发了

```js
const ball = document.querySelector('.ball')


function debounce(fn) {
  let timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this.arguments)
    }, 20(这里小于元素的过渡时间就可以))
  }
}

ball.addEventListener('transitionend', debounce(() => {
  console.log('...')
}))
```

<br>

### 注意事项: 事件多次触发问题: 使用防抖解决多次过渡的问题
- 当存在多个属性过渡变化时, 结束时会多次触发transitionend事件。 **比如``border-radius: 50%`` 它就会触发4次 因为它是复合属性** 每一个属性过渡结束都会触发
- 在transiton动画完成前设置 display:none, 事件不会触发。
- 当transition完成前 移除transition一些属性时, 事件也不会触发
- 元素从display:none到block, 不会有过渡, 导致无法触发transitionend事件

<br>

### 示例:
```css
.demo {
  width:100px;
  height: 100px;
  background-color: #ddc;
  transition: all 0.5s ease-out;
}

.w200 {
  width: 200px;
  background-color: #fef;
}
```
```js
var element = document.getElementById('demo')
element.addEventListener('transitionend', handle, false)
function handle(){
  alert('transitionend事件触发')
}

function change() {
  element.className = element.className === 'demo' ? 'demo w200': 'demo'
}
```

<br>

### 解决方式:
元素从none到block, 刚生成未能即时渲染, 导致过渡失效。所以需要主动触发页面重绘, 刷新DOM。

页面重绘可以通过改变一些CSS属性来触发, 例如: offsetTop、offsetLeft、offsetWidth、scrollTop等。

<br>

**通过定时器延迟渲染:**
```js
function change() {
  element.className = element.className === 'demo' ? 'demo opt': 'demo'

  if(element.className === 'demo') {
    element.style.opacity = null
    button.innerHTML = '点击'
  } else {
    // 这
    setTimeout(function(){
      element.style.opacity = '1'
      button.innerHTML = '重置'
    },10)
  }
}
```

<br>

**强制获取当前内联样式:**
```js 
function change() {
  element.className = element.className === 'demo' ? 'demo opt': 'demo'
  if(element.className === 'demo'){
    element.style.opacity = null
    button.innerHTML = '点击'
  } else {

    // 强制读取内联样式
    window.getComputedStyle(element, null).opacity
    element.style.opacity = '1'
    button.innerHTML = '重置'
  }
}
```

<br>

**触发重绘刷新DOM:** 
```js
function change() {
  element.className = element.className === 'demo' ? 'demo opt': 'demo'
  if(element.className === 'demo') {
    element.style.opacity = null
    button.innerHTML = '点击'
  } else {
      
    // 触发重绘
    element.clientWidth;
    element.style.opacity = '1'
    button.innerHTML = '重置'
  }
}
```

<br><br>

# 函数的二义性的产生和消除
函数在js中有两层含义
1. 函数可以看成一套流程, 调用函数就将函数中的流程走一遍
2. 函数可以看成一个构造函数, 用来创建一个对象

上面的两种含义就是一个函数的二义性, 但是一种语言中一个函数具有两层含义是非常奇怪的, 我们从函数签名无法看出这个函数具体是用来干什么

比如 Date 我们没有办法判断它是可以直接调用还是通过构造函数的方式调用
```js
Date()

new Date()
```

<br>

### 消除二义性 new.target
es6和很多第三方库中就提倡消除函数的二义性, 比如es6中就提出了 class, 它其中的一个作用就是用来消除2义性的

如果我们写出了一个函数 我们希望调用的人 只把它当做一个普通函数去调用 不要把它当成new来调用

我们可以借助es6给我们提供的关键字 ``new.target``, 我们把fn当成普通函数调用的话, ``new.target`` 就没有值, 而我们使用new来调用fn的时候  ``new.target`` 它就有值

```js
function fn() {
  // 如果它有值 说明我们是用new来调用的
  if (new.target) {
    throw new Error('只能使用普通函数的方式来调用')
  }

  ...
}
```

<br><br>

# 加法的运算规则
![加法的运算规则](./images/加法的运算规则.png)

<br>

### 类型转换规则
一个类型如果不是原始类型, 那么它一定是对象, 要将一个对象转成原始值, 会经过如下的步骤

关于valueOf方法在 ``js_ecmascript5.md`` 中有介绍

```js
const obj = {
  a: 1,

  [Symbol.toPrimitive]: function() {
    // 函数中要返回pbj的原始类型
    return 1
  },

  valueOf() {
    return 2
  },

  // 会调用原型中的tostring
  toString() {
    return 3
  }
}
console.log(obj + 1)  // 2
```

1. 它会先查看obj中是否有 ``[Symbol.toPrimitive]`` 属性 如果有它就会调用该属性 来得到它的原始类型 (如果返回的不是原始类型就会报错)

2. 如果obj中没有 ``[Symbol.toPrimitive]`` 属性, 就会调用 obj的valueOf方法, 看看通过它能不能转成原始类型

3. 如果obj中没有valueOf方法, 则会调用 toString 方法, 看看通过它能不能转成原始类型 如果还没有则报错

<br><br>

# Intl 对象 的使用
它提供了如下的3种功能

- 字符串对比 Collator, 用于语言敏感字符串比较的 collators构造函数
- 数字格式化 NumberFormat, 根据语言来格式化日期和时间的类的构造器类
- 日期和时间格式化 DateTimeFormat, 是对语言敏感的格式化数字类的构造器类

<br>

### Intl.DateTimeFormat
能使日期和时间在特定的语言环境下格式化

<br>

**语法:**  
**<font color="#C2185B">Intl.DateTimeFormat('语言标识', [options]).format(时间对象)</font>**  
```js
new Intl.DateTimeFormat('en-US').format(date)
// Expected output: "12/20/2020"
```

<br>

**参数:**  
1. local: string, en-US, ja-JP, zh-Hans-CN
2. options: 自定义日期时间格式化方法返回的字符
```js
// 请求参数 (options) 中包含参数星期 (weekday), 并且该参数的值为长类型 (long)
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  year: "numeric",
  month: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Los_Angeles",
};
console.log(new Intl.DateTimeFormat("de-DE", options).format(date));
```

<br>

### Intl.NumberFormat
能使数字在特定的语言环境下格式化

<br>

**语法:**  
**<font color="#C2185B">Intl.NumberFormat('语言标识', [options]).format(数字)</font>**  
```js
new Intl.NumberFormat("zh-Hans-CN-u-nu-hanidec").format(number)
```

<br>

**参数:**  
1. local: string, en-US, ja-JP, zh-Hans-CN, 用于格式化数字的语言环境。默认值为当前用户的语言环境。
2. options: 定义返回字符串的格式
  - style: 数字格式的样式。可以是decimal（十进制）、currency（货币）或percent（百分比）。默认值为decimal。
  - currency: 如果样式为currency, 则使用的货币代码。默认值为当前用户的货币代码。
  - currencyDisplay: 如果样式为currency, 则货币符号的显示位置。可以是symbol（符号）、code（代码）或name（名称）。默认值为symbol。
  - minimumIntegerDigits: 数字的最小整数位数。默认值为 1。
  - minimumFractionDigits: 数字的最小小数位数。默认值为 0。
  - maximumFractionDigits: 数字的最大小数位数。默认值为 3。
  - minimumSignificantDigits: 数字的最小有效数字位数。默认值为 1。
  - maximumSignificantDigits: 数字的最大有效数字位数。默认值为 21。


```js
// 请求参数 (options) 中包含参数星期 (weekday), 并且该参数的值为长类型 (long)
let options = {
  style: "currency | unit",
  // 日元不使用小数位
  currency: "EUR | JPY",
  // 限制三位有效数字
  maximumSignificantDigits: 3,
  unit: "kilometer-per-hour | liter",
  unitDisplay: "long",
};
console.log(new Intl.NumberFormat("pt-PT", {
  style: "unit",
  unit: "kilometer-per-hour",
}).format(50),);
```

<br>

**返回值:**  
字符串

<br>

**千分位 逗号 分隔:**
```js
new Intl.NumberFormat().format(3500) // "3,500"
new Intl.NumberFormat().format('3500') // "3,500"。数字字符也能正确处理
```

<br>

**最多保留 4 位小数:**
```js
new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(123456.78967)
// "123,456.7897"
```

<br>

**最少两位, 最多四位:**
```js
new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(123456.78967)
// "123,456.7897"
```

<br>

**加币种前缀:**
```js
const number = 123456.789;
// 美元 "$123,456.79"
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
// 人民币 "¥123,456.79"
new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(number)
// 日元 "￥123,457"
new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
// 韩元 "￦123,457"
new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number)
```

<br>

**百分比显示:**
```js
[0.01, 1.2, 0.0123].map(num => {
    return new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 2 }).format(num)
})
// ["1%", "120%", "1.23%"]
```

<br>

### Intl.Collator
用于语言敏感的字符串比较。

<br>

**语法:**  
```js
console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('de').compare));
// Expected output: Array ["a", "ä", "z", "Z"]


console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('sv').compare));
// Expected output: Array ["a", "z", "Z", "ä"]


console.log(
  ['Z', 'a', 'z', 'ä'].sort(
    new Intl.Collator('de', { caseFirst: 'upper' }).compare,
  ),
);
// Expected output: Array ["a", "ä", "Z", "z"]
```

<br><br>

# 不知道模版字符串
```s
https://www.bilibili.com/list/3494367522195464?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=963431541&bvid=BV1yH4y1i7gd
```

```js
const user = {
  name: 'deng',
  age: 28
}
const hi = `my name is ${user.name}, i'm ${user.age}`
```

我们可以在末班字符串的前面加上 label, 加label的同时 我们要创建label对应的函数

```js
const hi = tag`my name is ${user.name}, i'm ${user.age}`

// 该函数的返回值 就会赋值给 hi 这个变量
function tag() {
  console.log(arguments)
  
  {
    '0': ["my name is ", '', ", i'm ", ''],
    '1': 'deng',
    '2': 28
  }
}
```

也就是说我们可以将一个末班字符串的写法变成函数在运行 这个函数返回啥 hi 变量就接收啥

我们可以这样玩

```js
const hi = tag`my name is ${user.name}, i'm ${user.age}`

// 该函数的返回值 就会赋值给 hi 这个变量
function tag() {

  // 我们将tag本身返回
  return tag
}
```

那同时也就意味着这个表达式可以这么写
```js
// 它的后面还可以追加 模版字符串
tag`my name is ${user.name}, i'm ${user.age}``新的模版字符串`
```

<br>

### 技巧:
比如下面的js代码

![模版字符串01](./images/模版字符串01.png)

改造上面的代码

![模版字符串02](./images/模版字符串02.png)

<br><br>

# 绝对路径 和 相对路径:
我们这里只说网络中的路径 (还有操作系统中的路径 这里不谈), 比如我们写个图片的src就是网络路径 我们要说的就是这里的绝对路径 和 相对路径

- 绝对路径 跟 path部分无关
- 相对路径 跟 path有关

```html
<a href="./b.html" />
```

我们可以拿到它元素的ref属性 看看它的值
```s
$0.href  # http://localhost:5000/b.html
```

我们发现 a的href的值 跟我们书写源代码的时候不一样 我们书写的是 ``./b.html`` 但是得到的却是一个完整的url地址

因为像a元素 img元素 ajax里面写的路径 ``./b.html`` 这种写法是没有办法直接请求的 因为要去请求一个地址的话 它必须要有一个完整的路径 完整的url地址少一点也不行

当我们没有将地址写完整的话 浏览器会帮我们将它写完整 得到一个完整的url地址 ``http://localhost:5000/b.html``

**这个url地址就是一个绝对路径**

<br>

### 绝对路径的简写
我们写完整的url地址可能比较麻烦 ``http://localhost:5000/b.html`` 所以它允许我们有两种方式进行简写

<br>

**1. 省略协议名**
```s
http://localhost:5000/b.html

# 省略协议名
//localhost:5000/b.html
```

我们发现即使我们省略了协议名 但是浏览器还是会给我们进行转换, ``http://localhost:5000/b.html``

浏览器会将协议给我们加上 **这个协议是哪来的?**

浏览器会使用当前页面的协议 会跟当前的页面协议保持一致, 这一点很有用, 我们在本地开发的环境里面可能是http 我们请求的时候可以写http

但是到了生产环境中 我们的站点可能是https 我们在页面中再用http就不合适了 这时为了避免我们在本地环境 和 生产环境中分别写两套代码

我们就可以使用这种简写方式, 协议名沿用当前页面的协议 这样就可以保证开发环境和生产环境都是可以正常运行的
```html
<a href="//localhost:5000/b.html" />
```

<br>

**2. 同时省略协议名和域名以及端口号**  
也就是我们的路径可以写成下面的样式
```html
<a href="/b.html" />
```

这样的简写方式 它的协议和域名和端口都会沿用当前的页面的信息, 如果我们请求的资源就是当前站点的 我们可以省略掉前面这三个部分

<br>

绝对路径的意思表达的就是 我这个路径跟当前站点的url中的path 是没有关系的
```s
                       path部分
                      ----------
http://localhost:5000/index.html
```

我们写的``/b.html`` 无论当前站点的url是 ``http://localhost:5000/index.html`` 还是 ``http://localhost:5000/a/b/index.html``

也就是path这个不分无论怎么变 我们生成的都是唯一的 ``http://localhost:5000/b.html``

所以叫做绝对

<br>

### 相对路径
相对路径不是相对于文件目录的 如果我们下面的两个url都指向同一个页面
```s
http://a.com/admin
http://a.com/admin/index.html
```

那我们说这个页面在哪个文件夹

url地址跟文件夹 跟文件结构本身就没有必然的联系, 我们这里说的相对路径跟文件夹就没有什么关系

相对路径是相对于 **相对于当前页面path这一个部分的**

```s
                       path部分
                      ----------
http://localhost:5000/index.html
```

<br>

比如我们的页面地址为
```s
http://a.com/admin/index.html
```

我们有一个ajax请求 请求地址为 ``./news`` (相对路径中的./是可以省略的)

无论是相对路径还是绝对路径 最终都必须要给我一个完整的url地址 不然没有办法请求 相对路径只是方便我们书写而已

我们写的 ``./news`` 是怎么生成url呢?

<br>

**1. 协议域名端口直接拿过来**
```s
http://a.com
```

<br>

**2. 接下来是path部分, ./ 意味着当前页面的path目录的最后一个/**  
当前页面的path部分是 ``/admin/index.html``, 当中的path目录的最后一个目录就是 ``/admin/`` 

于是我们的url就变成了
```s
http://a.com/admin/
```

然后我们拼接后面的路径部分

```s
http://a.com/admin/news
```


<br>

**3. ../表示 当前路径中的最后一个目录找到最后一个/, 然后再往前倒一个/**
```s
http://a.com/admin/index.html

# 1. ./是最后一个/
http://a.com/admin/

# 2. ../就再往前倒一个/
http://a.com/

然后我们再加上news
http://a.com/news
```

<br>

### 总结:
我们平时写相对路径还是绝对路径?

如果我们的资源跟当前页面的资源 相对位置不太会发生变化的时候 我们就写相对路径 相对位置比较稳定的时候 使用相对位置比较好

```s
index.html
./js/index.js
./css/index.css
```

哪怕有一天我们的html的位置发生了变化, 我们的js 和 css还是能找到的(./找path部分的最后一个/ 然后进行拼接)
```s
/admin/index.html
```

如果我们的请求地址跟页面的相对关系是有可能变化的 那么就不应该使用相对路径了 而是需要使用绝对路径

比如我们的页面为下面的地址 都能访问到页面
```s
http://a.com/admin/index.html
http://a.com/admin
```

如果我们请求的是同一张图片 这时候我们写相对路径就不好了 因为他们的相对位置一定发生了变化

比如下面的情况下
```s
# 我们的图片写的是这样的
./img/1.png

# 如下地址的时候可以访问到图片 因为图片地址会解析为
http://a.com/admin/index.html
/admin/img/1.png

# 如下地址的时候 ./ 需要找到最后一个/ 所以就变成了 图片就找不到了
http://a.com/admin
/img/1.png
```

<br><br>

# js操作样式表
我们通常会使用 dom.style 的形式来操作dom结构的样式 这种方式我们操作的是内联样式

其实我们还可以操作内部和外部的样式表

```js
// 给所有的div的样式表里追加一组key:value
document.styleSheets[0].addRule('div', 'border: 1px solid #222')
```

<br><br>

# String.prototypte.toWellFormed()
JavaScript 中的字符串使用 UTF-16 编码, 其中一些字符需要使用代理项（surrogate pairs）来表示。

代理项是一对特殊的编码单元, 用于表示一个Unicode码位。

toWellFormed() 方法遍历字符串, 将所有单独的代理项替换为 Unicode 替换字符 U+FFFD（�）。

替换后的字符串确保格式正确, 可以在期望正确格式的函数中使用, 比如 encodeURI。

```js
const illFormed = "https://example.com/search?q=\uD800";

try {
  encodeURI(illFormed);
} catch (e) {
  console.log(e); // URIError: URI malformed
}

console.log(encodeURI(illFormed.toWellFormed())); // "https://example.com/search?q=%EF%BF%BD"
```

当你在 JavaScript 中使用 encodeURI() 函数来对字符串进行编码时, 如果字符串中包含格式不正确的字符, 会导致抛出错误。为了避免这种情况, 你可以使用 toWellFormed() 方法来先将字符串转换为格式正确的形式, 然后再进行编码。

1. 你有一个字符串 illFormed, 其中包含一个格式不正确的字符（代理项）: \uD800。

2. 当你尝试使用 encodeURI(illFormed) 对这个格式不正确的字符串进行编码时, 由于字符串格式问题, 会抛出一个错误（URIError: URI malformed）。

3. 为了避免这个错误, 你可以使用 toWellFormed() 方法将字符串转换为格式正确的形式

4. illFormed.toWellFormed() 将字符串中的格式不正确的字符替换为 Unicode 替换字符 U+FFFD（�）, 从而确保字符串格式正确。

5. 然后, 你对转换后的格式正确的字符串使用 encodeURI() 进行编码。

6. 编码后的字符串结果是 "https://example.com/search?q=%EF%BF%BD", 其中 %EF%BF%BD 是 Unicode 替换字符 U+FFFD 的 URL 编码形式。

这样做的目的是确保在使用 encodeURI() 或其他可能涉及字符串编码的操作时, 不会因为格式不正确的字符而导致错误。通过先将字符串转换为格式正确的形式, 你可以避免出现这样的问题。

```s
在 Unicode 中, 代理项（surrogate pairs）是用于表示一些特殊的字符的编码方式。UTF-16 编码中, 代理项是由一对16位的编码单元组成, 分为高代理项和低代理项。

\uD800 是一个 Unicode 高代理项编码单元的表示。然而, 它本身是一个无效的编码, 因为在 Unicode 标准中, 高代理项的范围是 U+D800 到 U+DBFF, 而这个范围的编码是被保留用于表示代理项的。代理项被用来表示一些超出了基本多文种平面（BMP）的字符, 例如表情符号、一些辅助语言字符等。

为了正确表示 Unicode 中的字符, \uD800 必须与一个低代理项结合。低代理项的范围是 U+DC00 到 U+DFFF。

所以, \uD800 单独出现在字符串中是一个格式不正确的编码, 因为它缺少一个与之匹配的低代理项。

toWellFormed() 方法的目的是将这样的格式不正确的字符替换为 Unicode 替换字符 U+FFFD, 以确保字符串在进行一些操作（比如编码）时是格式正确的。这样可以避免由于格式不正确的字符而引发的错误。
```

<br><br>

# orientationchange事件
监听屏幕旋转的事件

```html
<h1>屏幕方向监测</h1>
<p id="orientationStatus">当前屏幕方向: </p>

<script>
  function handleOrientationChange() {
    var orientationStatusElement = document.getElementById('orientationStatus');
    if (window.matchMedia("(orientation: portrait)").matches) {
      orientationStatusElement.innerText = "当前屏幕方向: 竖屏";
    } else if (window.matchMedia("(orientation: landscape)").matches) {
      orientationStatusElement.innerText = "当前屏幕方向: 横屏";
    }
  }

  // 监听屏幕旋转事件
  window.addEventListener("orientationchange", handleOrientationChange);

  // 在页面加载时初始化一次方向状态
  handleOrientationChange();
</script>
```

<br>


# visibilitychange事件
它需要给document绑定, 用来监视浏览器的可见性

比如当我们切换标签页, A页切换到B页的时候 对于A页来说就是不可见的, 我们可以通过 document.visibilityState 来查看页面的可见性

当页面的可见度发生变化的时候 就会执行下面的回调

```js
document.addEventListener("visibilitychange", function() {
  console.log(document.visibilityState)  // hidden / visible
})
```

<br>

### 问题:
当我们使用计时器的时候, 切换标签页会出现很多问题 比如我们使用计时器输出数字
```js
function count() {
  let n = 0
  const timer = setInterval(() => {
    console.log(n)
    n++
    if (n > 200) {
      clearInterval(timer)
    }
  }, 10)
}
count()
```

我们每10ms输出一次数字, 正常的情况下没有问题, 但是我们切换一个标签页的时候 发现不是每10ms输出一次数字了, 而是每1秒输出一次

因为浏览器对效率有优化 它认为页面已经看不见了 就会对那些复杂耗时的计时操作进行优化 最少1秒钟 虽然我们写的是10ms 但是实际上当页面不可见的时候计时器是1s执行一次的

**当页面不可见的时候 计时器会不准**

<br>

### 解决方式:
当用户切换到别的标签的时候 应该把游戏暂停(清除定时器), 那怎么知道标签页就要使用 Page Visibility Api

<br>

```js
document.addEventListener("visibilitychange", function() {
  
  if (document.hidden) {
    console.log('失活')
  } else {
    console.log('可见')
  }

})




// 兼容性 处理
let hidden, visibilityChange
if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden'
  bisibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden'
  bisibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  bisibilityChange = 'webkitvisibilitychange'
} else {
  不支持
}

document.addEventListener(visibilityChange, function() {
  
  if (document[hidden]) {
    console.log('失活')
  } else {
    console.log('可见')
  }

})
```

<br><br>

# window.open(url, name, features)方法
使用open()方法来创建新的浏览器窗口

<br>

### 参数:

**<font color="#C2185B">url</font>**  
新窗口的地址(如果省略将会是一个空白的页面)

<br>

**<font color="#C2185B">name</font>**  
新窗口的名字, 通过这个name可以在代码里与新窗口进行通信

<br>

**<font color="#C2185B">features</font>**  
新窗口的各种属性(新窗口的尺寸, 新窗口被弃用或禁用的各种浏览器功能(工具条, 菜单条, 初始显示位置等))

<br>

**返回值:**  
返回值是一个 Window 对象, 它表示新打开的窗口或标签页。通过返回的对象, 可以对新窗口进行操作, 例如修改其内容、关闭窗口等。

```js 
function popUp(winURL){
  window.open(winURL, 'popUp', 'width=320, height=480');
}
// 这个函数将打一个320 * 480的新窗口 名字为popUp


const newWindow = window.open('https://www.example.com', '_blank', 'width=500,height=400');
console.log(newWindow); // 输出新窗口的Window对象
```

<br><br>

# 页面的兼容模式: document.compatMode

### 应用: 获取可视窗口宽度

### document.compatMode
用于获取当前文档的渲染模式(Rendering Mode)。它返回一个字符串, 表示文档的兼容模式。

通过访问 document.compatMode 属性, 可以确定当前文档处于哪种兼容模式

通过判断 document.compatMode 的值, 可以根据当前的兼容模式采取相应的处理方式。在开发和调试网页时, 了解文档的兼容模式可以帮助我们确保页面在不同浏览器中的一致性和兼容性。

<br>

在 HTML 中, 文档的兼容模式有两种
1. "BackCompat"(混杂模式): 在混杂模式下, 浏览器会按照较早的浏览器版本的渲染方式来显示页面。这种模式下的布局和渲染规则可能与标准规范不完全一致, 因此**可能导致一些不兼容性问题**。

2. "CSS1Compat"(标准模式): 在标准模式下, 浏览器会根据 HTML 和 CSS 标准规范进行页面的布局和渲染。这种模式下的表现更符合当前的 Web 标准, **通常推荐使用。**
```js
export const getPageViewWidth = () => {
  return (document.compatMode == "BackCompat" 
    ? document.body 
    : document.documentElement
  ).clientWidth;
}

```

<br><br>

# 前端5种监视器

## IntersectionObserver
它会监视两个元素之间是否有交叉

当我们想监听一个元素 有如下的变化的时候 就可以使用这个api
- 从不可见到可见 
- 从可见到不可见  

IntersectionObserver 可以监听一个元素和可视区域相交部分的比例, **然后在可视比例达到某个阈值的时候触发回调** 也就是说 自动"观察"元素是否进入视口  

<br>

网页开发时常常需要了解某个元素是否进入了 "视口"(viewport)即用户能不能看到它

传统的实现方法是监听到scroll事件后 调用目标元素(绿色方块)的getBoundingClientRect()方法

得到它对应于视口左上角的坐标再判断是否在视口之内, 这种方法的缺点是由于scroll事件密集发生计算量很大容易造成性能问题 

<br>

### IntersectionObserver的使用:
IntersectionObserver API 的用法简单来说就是两行 

1. 创建 observer 实例
2. 传入回调和配置参数
3. 通过 observer 实例调用 observe 方法 传入要监视的对象

```js 
var observer = new IntersectionObserver(callback, options);
observer.observe(target);
```

<br>

### 兼容性:
该API在兼容性上有很大的问题 所以w3c提供了一个 npm包 专门用来解决兼容性的问题 也就是我们 要我们要先使用这个包 然后才能接着用 IntersectionObserver API

**1. 安装:**  
```js
npm install intersection-observer
``` 

<br>

**2. 引入:**
```js
import "intersection-observer"
```

确保它在最前面, 在html页面里面的话 相当于如下:
```html
<script src="./js/intersection-observer.js" />
```

<br>

### 创建 IntersectionObserver 实例:

### **<font color="#C2185">new IntersectionObserver(callback, [option])</font>**
IntersectionObserver是浏览器原生提供的构造函数

根据元素的可见性的变化, 就会调用观察器的回调函数, 回调函数会触发两次

- 一次是目标刚刚进入视口
- 另一次是完全离开视口

<br>

调用 实例对象.observe() 方法 指定要观察的DOM节点
```js  
let observer = new IntersectionObserver(callback, options);

// 开始观察
observer.observe(document.getElementById('example'));

// 停止观察
observer.unobserve(element);

// 关闭观察器
observer.disconnect();
```

<br>

### 参数1: callback
当监视元素 进入 和 离开 可视区域 后会触发回调, 也就是交叉状态发生变化了都会触发回调

如果同时有两个被观察的对象的可见性发生变化entries数组就会有两个成员

<br>

- 回调参数: entries, entries数组元素为被监视的对象 entry, entry对象用于提供目标元素的信息

- 回调参数: observer, 也就是创建的监视器实例对象

<br>

**回调参数 entry对象:**  
```js
entry: {
  target: 被观察的目标元素是一个 DOM 节点对象,

  // 容器元素的矩形区域的信息 也就是getBoundingClientRect()方法的返回值, 如果没有根元素(即直接相对于视口滚动)则返回null
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },

  // 目标元素的矩形区域的信息
  boundingClientRect: ClientRect {
    // .. 
  },

  // 目标元素与视口(或容器元素)的交叉区域的信息
  intersectionRect: ClientRect {
    // .. 
  },

  // 如果是true 则表示元素从视区外进入视区内 (满足了threshold)
  isIntersecting: true,

  // 目标元素的可见比例, 0 到 1 的数值 即intersectionRect占boundingClientRect的比例 完全可见时为1 完全不可见时小于等于0
  intersectionRatio: 0.6,

  // 可见性发生变化的时间是一个高精度时间戳单位为毫秒
  time: 3893.92
}
```

<br>

**判断是否交叉使用到的变量:**  
- isIntersecting - 常用
- intersectionRatio

<br>

### 参数2: options**  
```js
options: {
  threshold: [0 ~ 1],
  root: 元素节点,
  rootMagin: '0px 0px -200px 0px',
}
```

<br>

**options.root:**  
监视的元素 跟 **谁** 进行交叉, root就是那个谁

root配置项的值**只能是监视元素的父级元素(父元素的父元素也可以)**, 默认值是 null (默认为视口)

IntersectionObserver不仅可以观察元素相对于视口的可见性还可以观察元素相对于其所在容器的可见性 容器内滚动也会影响目标元素的可见性

它有很多后代元素想要做的就是判断它的某个后代元素是否滚动进了自己的可视区域范围 这个 root 参数就是用来指定根元素

如果它的值是null 根元素就不是个真正意义上的元素了而是这个浏览器窗口了可以理解成 window

但 window 也不是元素(甚至不是节点) 这时当前窗口里的所有元素都可以理解成是 **null 根元素的后代元素都是可以被观察的**

<br>

**总结:**  
1. root: 写null 表示监视的元素是否和视口有交叉
2. root: 写别的元素 表示监视的元素是否和别的元素有交叉

```js
var opts = {
  root: document.querySelector('.container'),
  rootMargin: '0px 0px -200px 0px'
};

var observer = new IntersectionObserver(
  callback,
  opts
);
```

表示容器的下边缘向上收缩200像素导致页面向下滚动时目标元素的顶部进入可视区域200像素以后才会触发回调函数 

这样设置以后不管是窗口滚动或者容器内滚动只要目标元素可见性变化都会触发观察器

<br>

**options.rootMagin:**   
我们这么想, 我们这套api有两个要知道的对象
1. 监视的元素
2. 目标元素

这个api会观察 监视元素 和 目标元素 有交叉的时候, 执行回调中的逻辑

<br>

rootMagin就是监视元素 和 目标元素的 交叉范围, 比如我们root设置为null

![intersectionObserver01](./images/intersectionObserver01.png)

- 如果是正数, 则针对视口我们再向外扩充10个像素, 这样交叉范围就扩大了
- 如果是负数, 则缩小交叉范围

它的写法类似于 CSS 的margin属性比如0px 0px 0px 0px依次表示 top、right、bottom 和 left 四个方向的值 

减小根元素下方的观察范围, rootMagin:'0 0 -10% 0' 能变相的提高显示基线

<br>

**这个 API 的主要用途之一就是用来实现延迟加载**  
那么真正的延迟加载会等 img 标签或者其它类型的目标区块进入视口才执行加载动作吗? 

显然那就太迟了 我们通常都会提前几百像素预先加载rootMargin 就是用来干这个的 

<br>

**options.threshold: 0 - 1**  
监视元素 进入 目标元素 了多少, 0.5 表示监视元素进入了目标元素一半的时候, 才会触发回调执行

**跟 root指定的元素 交叉了多少, 的时候, 触发回调执行**, 写0就是碰到了一个边边都可以

决定了什么时候触发回调函数, 即元素进入视口(或者容器元素)多少比例时执行回调函数 (目标元素与视口交叉面积大于多少时, 触发回调)

类型: Number | Array

```js
{
  // 当目标元素 0%、25%、50%、75%、100% 可见时会触发回调函数
  threshold: [0, 0.25, 0.5, 0.75, 1]
}
```

- 默认值为0, 当为1时, 元素完全显示后触发回调函数
- 如果threshold属性是0.5 当元素进入视口50%时触发回调函数 
- 如果值为[0.3, 0.6] 则当元素进入30％和60％是触发回调函数 

<br>

### 实例对象身上的方法: 
### **<font color="#C2185">observer.observe(document.getElementById('example'))</font>**
开始观察

observe()的参数是一个 DOM 节点对象 如果要观察多个节点就要多次调用这个方法 
```js 
observer.observe(elementA);
observer.observe(elementB);
```

<br>

### **<font color="#C2185">observer.unobserve(element)</font>**
停止观察

取消对某个目标元素的观察 延迟加载

因为当元素进入视口和离开视口后会触发两次回调, 所以一般我们在元素进入视口后触发的回调中的最后 ``unobserve(节点)`` 直接取消监视该元素 使回调只触发一次

```js  
let observer = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      entry.target.classList.add('active');

      // 延迟加载通常都是一次性的
      observer.unobserve(entry.target);
    }
  })
})
```

<br>

### <font color="#C2185">observer.disconnect()</font>
关闭观察器

<br>

### 注意:
**IntersectionObserver API 是异步的** 不随着目标元素的滚动同步触发 规格写明IntersectionObserver的实现应该采用

requestIdleCallback()即只有线程空闲下来才会执行观察器 这意味着这个观察器的优先级非常低只在其他任务执行完浏览器有了空闲才会执行 

<br>

## 使用示例:

**要点:**
1. 我们要在回调中操作DOM节点的话 可以使用 ``entry.target`` 属性

2. 这个回调内部逻辑一上来就会执行一次然后目标元素再次进入视口和离开视口的时候都会再触发一次 所以 内部使用 ``entry.isIntersecting`` 来进行判断 从而确定元素进入视口 和 离开视口时的逻辑
```js  
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.style.background = "pink"
    } else {
      entry.target.style.background = ""
    }
  })
}, {threshold: [0.25]})

// 当我们监视一个元素的时候 则回调参数entries数组中只有一个元素
observer.observe($(".box")[0])
```

<br>

### 触发两次回调的问题:
因为它会触发两次回调函数 为了解决这个问题 我们可以 当元素进入的时候就添加样式 随后下一行就移除监视
```js
eventBind() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("is-show")

        // 为了解决两次回调的问题 刚添加样式后就移除样式
        observer.unobserve(entry.target)
      }
    })
  }, {
    rootMargin: "0px 0px",
    threshold: 0,
    root: null,
  })

  Array.prototype.forEach.call(this.title, (element) => {
    observer.observe(element)
  })
}
```

<br>

### 示例: 图片的懒加载
我们希望某些静态资源(比如图片)只有用户向下滚动它们进入视口时才加载这样可以节省带宽提高网页性能 这就叫做"惰性加载" 

1. 图像的 HTML 代码可以写成下面这样 
```js 
// 图像默认显示一个占位符 data-src属性是惰性加载的真正图像 
<img src="default.png" data-src="http://picsum.photos/400/600?r=1">
<img src="default.png" data-src="http://picsum.photos/400/600?r=1">
<img src="default.png" data-src="http://picsum.photos/400/600?r=1">
```

<br>

2. 只有图像开始可见时才会加载真正的图像文件 
```js  
function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

var observer = new IntersectionObserver(
  // 回调函数会在元素与视口交叉的时候执行, entries是监视对象组成的数组
  function(entries) {
    entries.forEach(function(entry) {
      // 1. entry.isIntersecting: 图片跟视口是否满足交叉规则 (也就是threshold)
      // 2. entry.target 监视的元素
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;

        // 取消监听
        observer.unobserve(entry.target); 
      }
    });
  }
);

// 获取所有的img元素
query('.lazy-loaded').forEach(function (item) {
  // 循环监视img元素
  observer.observe(item);
});
```

<br>

### 示例: 下拉加载更多
随着网页滚动到底部不断加载新的内容到页面它的实现也很简单 
```js  
var intersectionObserver = new IntersectionObserver(
  function (entries) {
    // 如果不可见就返回
    if (entries[0].intersectionRatio <= 0) return;
    loadItems(10);
    console.log('Loaded new items');
  }
);

// 开始观察
intersectionObserver.observe(
  document.querySelector('.scrollerFooter')
);
```

无限滚动时最好像上例那样页面底部有一个页尾栏(又称sentinels上例是.scrollerFooter)

一旦页尾栏可见就表示用户到达了页面底部从而加载新的条目放在页尾栏前面 否则就需要每一次页面加入新内容时都调用observe()方法对新增内容的底部建立观察

<br>

**技巧: 可见loading图标**   
当它进入视口的时候 我们加载图片

```js
const ob = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadItems(10)
  }
}, {
  threshold: 0
})

const loadingIcon = document.querySelector('.loading')
ob.observe(loadingIcon)
```

<br>

### 示例: 视频自动播放
下面是一个视频元素希望它完全进入视口的时候自动播放离开视口的时候自动暂停 
```html
<video src="foo.mp4" controls=""></video>
```

```js 
let video = document.querySelector('video');
let isPaused = false;

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio != 1  && !video.paused) {
      video.pause();
      isPaused = true;
    } else if (isPaused) {
      video.play();
      isPaused=false;
    }
  });
  // 完全进入视口呗
}, {threshold: 1});

observer.observe(video);
```
上面代码中IntersectionObserver()的第二个参数是配置对象它的threshold属性等于1即目标元素完全可见时触发回调函数 

<br>

### 示例: 元素的平滑上升
```s
https://www.bilibili.com/video/BV1Nm421J7Yj/?spm_id_from=333.337.search-card.all.click&vd_source=66d9d28ceb1490c7b37726323336322b
```

该示例使用 ``vue`` 的 ``自定义指令`` 来实现

**html部分:**  
```html
<template>
  <div class="container">
    <div v-slide-in class="item">1</div>
    <div v-slide-in class="item">2</div>
    <div v-slide-in class="item">3</div>
    <div v-slide-in class="item">4</div>
    <div v-slide-in class="item">5</div>
  </div>
</template>
```  

<br>

**自定义指令:**  
整体的思路, 我们将元素在一开始的时候 就往下移动一点(原位置的基础上) 当它需要滑入的时候 再改变它的transform 将它向上平移 回到原本的位置
```js
const DISTANCE = 150

// 工具函数: 判断元素是不是在视口下方
function isBelowViewport(el) {
  const rect = el.getBoundingClientRect()
  // 判断 元素的 上边位置 是否大于 视口高度 大于说明在视口的下方
  return rect.top > window.innerHeight
}

// 5. 创建 map 结构 将元素和它对应的动画对象保存起来
const animationMap = new WeakMap()

// 3. 监听元素 是否进入视口
const ob = new IntersectionObserver(entries => {
  // 判断每个元素 和 视口的交叉状态
  for (const entry of entries) {
    if (entry.isIntersecting) {
      // 这里我们要找到 元素 和 它的动画对象 因为我们要调用元素对应的动画对象的play()方法
      /*
        方式1: 不推荐
        我们可以通过元素对象本身, 调用该元素的 getAnimations 方法 这样就可以拿到该元素身上的所有动画对象
        entry.target.getAnimations()[0].play()

        如果别人或别的逻辑中 也往该元素上加了动画, 我们就不知道我们要播放的动画 在数组中是哪一项了
      */

      // 7. 方式2:
      const animation =  animationMap.get(entry.target)
      animation.play()

      // 8. 避免上拉元素重新进入视口 我们每次播放完动画后 取消监听就可以了
      ob.unobserve(entry.target)

      /*
        9. 问题: 当我们的滚动条在第5个元素的时候 刷新页面, 因为浏览器会保存滚动条的位置的 这时有几个问题
          1. 刷新后 页面中可是区域内的元素 又播放了一次动画 而实际上我们可视区域的元素是不需要播放动画的 我是希望在往下滑的时候播放动画

          2. 当我们往上面滑动滚动条的时候, 上面的元素也要播放动画 实际上面上的元素 不需要播放动画了

        也就是说 只有挂载到页面上的时候 那些在视口之下的元素 这样的元素才要创建动画 进行监听 所以我们在下面指令相关逻辑中 写了 10. 代码
      */
    }
  }
})

export default {
  // 监听元素的挂载, 当挂载到页面上后 我们做如下的逻辑
  mounted(el) {
    // 10. 如果元素不在视口之下
    if(!isBelowViewport(el)) {
      return
    }
    /*
      建议不要这么设置 初始位置
      el.style.opacity = 0.5
      el.style.transform = `translateY(${DISTANCE}px)`

      我们这么写会改动元素的 style 属性, 如果该元素的style里面本来就有 opacity, 则会被覆盖掉

      为了避免上面的事情发生, 我们可以借助 animation api 用js的方式来创建一个css动画, 该动画不会更改元素的任何style属性 它就是为元素创建一个动画 这样对业务代码没有侵入性
    */

    /*
      1. 
      通过 元素本身 调用 animate() 方法 来创建一个动画, 该方法会返回一个动画对象
      参数: 为动画的关键帧 对象数组
    */
    const animation = el.animate(
      [
        // 开始的关键帧
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.5
        },
        // 最终的关键帧
        {
          transform: `translateY(0)`,
          opacity: 1
        }
      ],
      // 配置对象
      {
        // 设置动画持续时间
        duration: 500,
        // 时间函数
        easing: 'ease'
      }
    )

    // 2. 创建好动画后 元素挂载到页面上的时候 不要播放动画, 当元素进入视口后我们才播放动画
    animation.pause()

    // 6. 将元素 和 动画对象 保存到map中对应起来
    animationMap.set(el, animation)

    // 4. 元素挂载到页面上后 我们监控这个元素是否进入视口
    ob.observe(el)
  },
  // 元素卸载的时候 取消监控
  unmounted(el) {
    ob.unobserve(el)
  }
}
```

<br>

### 监视目标元素: 滚动动画
该js的用处就是 当目标元素到达进入视口的时候 添加样式 

1. 目标元素上要添加: p-selection__index__lineup__cartypehdg
2. 要先引入 intersection-observer 包 用来解决兼容性的问题

```js
export default class ScrollAnimation {

  constructor() {
    this.getParam()
    this.eventBind()
  }

  // 获取标记为 p-selection__index__lineup__cartypehdg 的元素
  getParam() {
    this.title = document.querySelectorAll(".p-selection__index__lineup__cartypehdg")
  }

  // 
  eventBind() {
    /**
     * InterSection Observer関連
     */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("is-show")

          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px",
      threshold: 0,
      root: null,
    })

    /**
     * getParamwで定義したやつをconst observerを回してる
     */
    Array.prototype.forEach.call(this.title, (element) => {
      observer.observe(element)
    })
  }
}
```

<br><br>

## MutationObserver
监听一个普通 JS 对象的变化我们会用 Object.defineProperty 或者 Proxy

```js
const person = new Proxy({}, {
  set(obj, prop, value) {
    console.log("set", prop,value)
    obj[prop] = value

    return true
  }
})

person.name = guang
```

<br>

### 作用: 
而**监听元素的属性和子节点**的变化我们可以用 MutationObserver

<br>

```html
<!-- 我们准备这样一个盒子 -->
<div id="box"><button>光</button></div>
```

```css
#box {
  width: 100px;
  height: 100px;
  background: blue;

  position: relative;
}
```

<br>

我们定时对它做下修改: 
```js
setTimeout(() => {
  box.style.background = 'red';
},2000);

setTimeout(() => {
  const dom = document.createElement('button');
  dom.textContent = '东东东';
  box.appendChild(dom);
},3000);

setTimeout(() => {
  document.querySelectorAll('button')[0].remove();
},5000);
```

- 2s 的时候修改背景颜色为红色
- 3s 的时候添加一个 button 的子元素
- 5s 的时候删除第一个 button 

<br>

然后监听它的变化: 
```js
const mutationObserver = new MutationObserver((mutationsList) => {
    // 当节点有变化的时候 会执行回调
    console.log(mutationsList)
});

// 监听 属性 和 子节点
mutationObserver.observe(box, {
  attributes: true,
  childList: true

  // 观察 characterData: true 字符的变化
});
```

<br>

### 参数说明:
创建一个 MutationObserver 对象监听这个盒子的属性和子节点的变化 

**mutationsList:**  
是一个对象

- type: 字符串 可以知道是属性发生了变化 还是 节点发生了变化
- addedNodes: 默认值是 NodeList[] 当发生变化的时候 数组里面会有值
- removedNodes: 默认值是 NodeList[]

<br><br>

## ResizeObserver
窗口我们可以用 addEventListener 监听 resize 事件, 那如何监听元素尺寸的变化呢? 

**元素可以用 ResizeObserver 监听大小的改变**, 当 width、height 被修改时会触发回调 

除了元素的大小、可见性、属性子节点等变化的监听外还支持对 performance 录制行为的监听

<br>

### 示例:
我们准备这样一个元素: 
```html
<div id="box"></div>
```

```css

#box {
  width: 100px;
  height: 100px;
  background: blue;
}
```

<br>

在 2s 的时候修改它的高度: 
```js
const box = document.querySelector('#box');

setTimeout(() => {
  box.style.width = '200px';
}, 3000);
```

<br>

然后我们用 ResizeObserver 监听它的变化: 
```js
const resizeObserver = new ResizeObserver(entries => {
  console.log('当前大小', entries)
});

resizeObserver.observe(box);
```

<br>

### entries中entry参数说明:
- orderBoxSize: 边框盒的尺寸
- contentBoxSize: 内容盒的尺寸
- contentRect: 内容区域的尺寸 这个元素的详细信息
- devicePixelContentBoxSize: DPR的尺寸
- target: 哪个元素发生了变化

<br>

### 示例: Vue中使用 ResizeObserver API
```js
class NodeResizeObserver {
  node = null
  observer = null
  maxHeight = 0
  gap = 16


  constructor(options) {
    const { el, cb } = options
    this.node = el
    this.init(cb)
  }


  init(cb) {
    this.observer = new ResizeObserver(entries => {
      const temp = []
      entries.forEach(info => {
        temp.push(info.contentRect.height)
      })

      // 通过回调让组件内拿到maxHeight
      this.maxHeight = Math.max(...temp) + this.gap * 2
      cb && cb(this.maxHeight)
    })
    this.observer.observe(this.node)
  }


  destroy() {
    this.observer.disconnect()
  }


  getHeight() {
    return this.maxHeight
  }
}


export default NodeResizeObserver


// Vue组件中的使用
mounted() {
  this.nodeObverser = new NodeResizeObserver({
    el: this.$refs.OperationAreaRef.$el,
    cb: this.updateOperationAreaHeight
  })
}
```
<br>

### 待补充
```s
https://mp.weixin.qq.com/s/doBnp_fN8RpH_1rBfUfwhg
```

**PerformanceObserver:**  
浏览器提供了 performance 的 api 用于记录一些时间点、某个时间段、资源加载的耗时等。

我们希望记录了 performance 那就马上上报, 可是怎么知道啥时候会记录 performance 数据呢?  用 PeformanceObserver。

PerformanceObserver 用于监听记录 performance 数据的行为, 一旦记录了就会触发回调, 这样我们就可以在回调里把这些数据上报

<br>

**ReportingObserver:**  
当浏览器运行到过时(deprecation)的 api 的时候, 会在控制台打印一个过时的报告

浏览器还会在一些情况下对网页行为做一些干预(intervention), 比如会把占用 cpu 太多的广告的 iframe 删掉

会在网络比较慢的时候把图片替换为占位图片, 点击才会加载, 这些干预都是浏览器做的

ReportingObserver 可以监听过时的 api、浏览器干预等报告等的打印, 在回调里上报, 这些是错误监听无法监听到但对了解网页运行情况很有用的数据。

<br><br>

# 浮点数的处理方式
```s
https://www.cnblogs.com/CandyDChen/p/16300638.html
```

<br><br>

# toUTCString:

### <font color="#C2185B">new Date().toUTCString()</font>
我们在设置 **响应头里的时间** 的时候 会使用该API将date处理下, 将时间格式转成符合响应头的格式 ``UTC(GMT)``(世界统一时间)

<br>

### 作用:
toUTCString() 方法可根据世界时 (UTC) 把 Date 对象转换为字符串, 并返回结果。  

协调世界时, 又称世界统一时间, 世界标准时间, 国际协调时间, 简称UTC。

```js
let date = new Date()
console.log(date)   // 2022-11-14T07:18:29.060Z

console.log(date.toUTCString())   // Mon, 14 Nov 2022 07:18:48 GMT
```

<br><br> 

# video标签相关的知识点:

```html
<video></video>
```

<br> 

## video标签的基本用法:

### 方式1: 使用src属性链接视频地址
```html
<video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
  你的浏览器不支持 <code>video</code> 标签。
</video>
```

<br> 

还可以根据 **source子标签** 指定视频格式
```html
<video controls>
  <source src="foo.ogg" type="video/ogg">
  <source src="foo.mp4" type="video/mp4">
  Your browser does not support the <code>video</code> element 
</video>
```

<br> 

但是使用src的时候毕竟我们链接的是地址 是地址就有可能出现播放失败的情况 

我们将 src属性的值 设置为 **Blob对象的DOMString**
```html
<video 
  src="blob:http://abc.com/d0823f0f-2b2a-4fd6-a93a-e4c82173c107">
</video>
```

上面可以这么设置是因为 src 只是 Blob的, 但是新标准建议 使用 **srcObject** 替代 src 属性
```js
// 创建了一个新的 MediaSource 对象。MediaSource 对象代表媒体资源, 它可以用来动态生成媒体数据, 例如视频或音频。
const mediaSource = new MediaSource();
const video = document.createElement('video');
try {
  // 这行代码将之前创建的 MediaSource 对象赋值给视频元素的 srcObject 属性。通过将 MediaSource 对象赋值给 srcObject, 可以将动态生成的媒体数据与视频元素关联起来。这样, 视频元素就可以从 MediaSource 对象中获取媒体数据进行播放。
  video.srcObject = mediaSource;

} catch (error) {

  // 有些浏览器可能不支持将 MediaSource 对象直接赋值给 srcObject, 所以在这种情况下, 我们使用 URL.createObjectURL() 方法将 MediaSource 对象转换为一个可用的 URL, 并将该 URL 赋值给视频元素的 src 属性
  video.src = URL.createObjectURL(mediaSource);
}
```

<br>

### srcObject标签属性:
该属性的值为: MediaStream || MediaSource || Blob || File

<br><br>

## video标签身上的部分事件:
### **<font color="#C2185B">loadeddata</font>**  
在媒体当前播放位置的视频帧(通常是第一帧)加载完成后触发。

<br>

### **<font color="#C2185B">loadedmetadata</font>**  
在元数据(metadata)被加载完成后触发

<br><br>

## 链判断运算符

### **<font color="#C2185">?.</font>**
以往我们要读取对象内容的属性的时候 往往需要判断一下 属性的上层是否存在  
比如: ``message.body.user.firstName``

我们要层层的判断一下属性的上层有没有值 但是我们需要的属性在第4层 所以要判断4次 每一层是否有值
```js
// 错误的写法:
let name = message.body.user.firstName || "default"


// 正确的写法: 
let name = (
  message && message.body && message.body.user && message.body.user.firstName
) || "default"
```

<br>

### 解决方式:
es6中引入了 ?. 运算符 在链式调用的时候判断  

<br>

### 作用:
左侧的对象是否为 **null** 或者 **undefined**  
如果是 null 或者 undefined 那么就返回undefined 如果不是 就执行

```js
let obj = {
  job: {
    front: "vue"
  }
}

// 没有hi则返回undefind
console.log(obj?.hi?.front)
// undefined

console.log(obj.hi.front)
// Cannot read properties of undefined (reading 'front')
```

<br>

### 使用场景:
```js
a?.b
// 等同于
a == null ? undefined : a.b


a?.[x]
// 等同于
a == null ? undefined : a[x]


a?.b()
// 等同于
a == null ? undefined : a.b()


a?.()
// 等同于
a == null ? undefined : a()
```

<br>

### **<font color="#C2185">??</font>**
当运算符的左侧为null或者是undefined的时候 给予默认值
```js
const animationDuration = response.settings?.animationDuration ?? 300;
```

<br><br>

# performance.now()
一个浏览器提供的性能 API, 用于获取高精度的时间戳, 以毫秒为单位。它返回一个 DOMHighResTimeStamp 类型的值, 表示自页面加载以来的时间。

与常规的 Date.now() 方法相比, performance.now() 提供了更高的精度, 并且不会受到系统时间调整的影响。它通常用于性能测量、动画计时、定时器和其他需要高精度时间的场景。

<br>

### 要点:
1. 时间戳的起点通常是页面加载的时刻, ``performance.timing.navigationStart``

2. 在同一个页面中多次调用 performance.now(), 返回的时间戳是递增的, 可以用于测量时间间隔

3. 与 Date.now() 不同, performance.now() 不会受到时区的影响, **因为它基于浏览器的内部时钟**

4. 在非活动标签页或后台标签页中, performance.now() 的精度可能会降低, 以节省计算资源

<br><br>

# requestAnimationFrame: 重绘后执行的回调(就当计时器用)
vite相关md中也有部分讲解

```s
https://wangdoc.com/javascript/bom/window.html#windowgetcomputedstylewindowmatchmedia
```

官方解释: 帧动画。就是可以一帧一帧的执行动画。这个一帧的执行频率是多久? 答案是: **与屏幕的刷新频率同步**

让浏览器在显示器屏幕下次刷新时, 执行一帧; 那么显示器多次刷新屏幕, 就执行了多帧; 如果速度够快, 就会形成动画。

那么显示器的刷新屏幕, 也就是屏幕的刷新频率又是什么呢? 

回调的调用 不是js控制的, 而是系统控制的

<br>

### 屏幕刷新及刷新频率
对于一般笔记本电脑来说, 这个频率大概是60Hz, 表示每秒刷新60次屏幕。

<br>

### **<font color="#C2185">window.requestAnimationFrame(callback)</font>**
回调函数会在浏览器下一次重绘之前执行, 有点类似 setTimeout()

```js
// 默认使用它的时候 init 回调 只会执行一次, 如果要在每帧执行一次, 需要递归调用
requestAnimationFrame(init)
```

<br>

### 定时器setTimeout的问题:
如果使用计时器**每进行回调一次都会对页面造成回流重绘** 而requestAnimationFrame它会将回流和重绘收集起来只走一次 

性能要比计时器要好 而且它是以60的帧率进行绘制 视觉效果上也好, ``1000 / 60 = 16.67ms``

回调函数执行次数通常是每秒 60 次, 但在大多数遵循 W3C 建议的浏览器中, 回调函数执行次数通常与浏览器屏幕刷新次数相匹配

<br>

window.requestAnimationFrame()方法跟setTimeout类似
都是推迟某个函数的执行。不同之处在于, setTimeout必须指定推迟的时间, 

window.requestAnimationFrame()则是**推迟到浏览器下一次重流时执行, 执行完才会进行下一次重绘**

**重绘通常是 16ms 执行一次**, 不过浏览器会自动调节这个速率, 比如网页切换到后台 Tab 页时, requestAnimationFrame()会暂停执行。

如果某个函数会改变网页的布局, 一般就放在window.requestAnimationFrame()里面执行, 这样可以节省系统资源, 使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘, 而速度更快的设备会有更快的速率。

<br>

### callback 形参:
一般不用

**DOMHighResTimeStamp: 相当于 currentTime**  
它表示requestAnimationFrame() **开始去执行回调函数的时刻**。

指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。在同一个帧中的多个回调函数, 它们每一个都会接受到一个相同的时间戳, 即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。

<br>

### 返回值:
id: window.cancelAnimationFrame(): 以取消回调函数。兼容性不错

window.requestAnimationFrame()的**返回值是一个整数**, 
这个整数可以传入*window.cancelAnimationFrame()*, 用来取消回调函数的执行。

<br>

### 注意:
该函数要配合递归使用 **因为该回调只走一次**

<br>

### **<font color="#C2185">window.cancelAnimationFrame(animationId)</font>**

感觉没用呢?
```js
let count = 0
let timer = null

function render() {
  timer = requestAnimationFrame(() => {
  
  // 使用 return 终止循环递归
  if(count == 10) return

    count++
    render()
  })
}

render()
```

<br>

### 示例: 
```js
// performance 是 浏览器的api
const startTime = performance.now(); // 记录动画开始的时间戳

function outputText() {
  const currentTime = performance.now(); // 获取当前时间戳
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000); // 计算经过的秒数

  if (elapsedSeconds < 10) {
    // 输出文本
    console.log(`输出文本 - 第 ${elapsedSeconds + 1} 秒`);
  } else {
    // 达到10秒后停止输出
    return;
  }

  // 请求下一帧的动画
  window.requestAnimationFrame(outputText);
}

// 启动动画
window.requestAnimationFrame(outputText);
```

<br>

### 示例: 模拟 setTimeout
```js
function delayedExecution(callback, delay) {
  const startTime = performance.now();

  function checkTime(currentTime) {
    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= delay) {
      callback(); // 执行回调函数
    } else {
      window.requestAnimationFrame(checkTime);
    }
  }

  window.requestAnimationFrame(checkTime);
}

// 使用示例
console.log('开始执行');
delayedExecution(() => {
  console.log('延迟执行');
}, 3000); // 在3秒后执行回调函数
```

<br>

与 ``Date.now()`` 不同，``performance.now()`` 返回的时间戳是相对于页面加载开始的时间，而不是相对于 Unix 时间纪元（1970 年 1 月 1 日）

**版本2:**
```js
function delayedExection(callback, delay) {
  // 如果设置为 performance.now() 的话 它的初始值为 169 也就是页面加载的时间 第一次的时候不会执行 这样第一次执行时会严格遵守延迟时间
  let lastTime = performance.now()
  // 如果设置为0的话, 第一次就会进入 currentTime - lastTime >= delay 的判断, 会立即执行
  // let lastTime = 0
  let requestId = 0
  function run(currentTime) {
    if (currentTime - lastTime >= delay) {
      lastTime = currentTime
      callback()
    }
    requestId = requestAnimationFrame(run)
  }
  requestId = requestAnimationFrame(run)

  return () => cancelAnimationFrame(requestId)
}

function task() {
  console.log('task')
}
const stopExecution = delayedExection(task, 1000)

setTimeout(() => {
  stopExecution()
  console.log('Stopped')
}, 5000)
```

<br>

### 示例:
使用requestAnimationFrame代替setTimeout, 减少了重排的次数, 极大提高了性能, **建议大家在渲染方面多使用requestAnimationFrame**

```js
const renderList = async () => {

  console.time('列表时间')

  // 获取数据
  const list = await getList()

  // 总数据条数
  const total = list.length

  // 当前页码
  const page = 0

  // pageSize: 一页显示多少条
  const limit = 200

  // 一共有多少页
  const totalPage = Math.ceil(total / limit)


  // 创建渲染函数
  const render = (page) => {
    // 递归的停止条件: 如果 页码 比 总页数 大 则停止 
    if (page >= totalPage) return

      // 使用requestAnimationFrame代替setTimeout 传入回调 该回调会在重绘前执行
      requestAnimationFrame(() => {

        // 循环 分页
        for (let i = page * limit; i < page * limit + limit; i++) {

          // 每一个
          const item = list[i]
          const div = document.createElement('div')
          div.className = 'sunshine'
          div.innerHTML = `
          <img src="${item.src}" />
          <span>${item.text}</span>
          `
          container.appendChild(div)
        }

        // 递归调用
        render(page + 1)
    })
  }

  render(page)
  console.timeEnd('列表时间')
}
```

<br>

### 示例:
```js
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

// callback 的参数(timestamp)是 高精度时间戳 表示距离网页加载的时间。
function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;

  // 元素不断向左移, 最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';

  // 如果距离第一次执行不超过 2000 毫秒, 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

<br><br>

# 文档碎片

### **<font color="#C2185">document.createDocumentFragment()</font>**
创建文档碎片

会返回一个文档碎片的容器, 我们可以将每次加工后的dom节点放入到容器内  

然后一次性的将 文档碎片 插入到页面中 **页面只会渲染文档碎片包裹着的元素, 而不会渲染文档碎片**

```js
const fragment = document.createDocumentFragment()

for(let i = 0; i < 10; i++) {
  fragment.appendChild(div)
}

// 一次性appendChild
container.appendChild(fragment)
```

<br>

### 文档碎片 + requestAnimationFrame
**文档碎片的好处:**

之前都是每次创建一个div标签就appendChild一次,  
但是有了文档碎片可以先把1页的div标签先放进文档碎片中, 然后一次性appendChild到container中,  
这样减少了appendChild的次数, 极大提高了性能

页面只会渲染文档碎片包裹着的元素, 而不会渲染文档碎片

```js
const renderList = async () => {
  console.time('列表时间')
  const list = await getList()
  console.log(list)
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total / limit)

  const render = (page) => {
    if (page >= totalPage) return
    requestAnimationFrame(() => {

        // 创建一个文档碎片
        const fragment = document.createDocumentFragment()

        for (let i = page * limit; i < page * limit + limit; i++) {
            const item = list[i]
            const div = document.createElement('div')
            div.className = 'sunshine'
            div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`

            // 先塞进文档碎片
            fragment.appendChild(div)
        }

        // 一次性appendChild
        container.appendChild(fragment)
        render(page + 1)
    })
  }
  render(page)
  console.timeEnd('列表时间')
}
```

<br><br>

# 滚动到指定的位置
### **<font color="#C2185">Element.scrollTo()</font>**
在使用 Element.scrollTo() 方法时, 它会将容器元素的内容滚动到指定位置, 而不是容器元素本身。容器元素必须具有滚动条, 并且内容超出容器的可视区域, 以便滚动操作生效。

<br>

**注意:**  
Element.scrollTo() 方法适用于滚动容器元素的内容, 但不适用于让整个页面或其他非容器元素滚动到指定位置。

对于整个页面或其他非容器元素的滚动, 可以使用 window.scrollTo() 方法来实现。

<br>

**参数形式1: (x-coord, y-coord)**  
- x-coord: 是期望滚动到位置水平轴上距元素左上角的像素。
- y-coord: 是期望滚动到位置竖直轴上距元素左上角的像素。

<br>

**参数形式1: {options}**
```js
{
  top: 100,
  left: 100,
  // 平滑, 而不是瞬间到100位置
  behavior: 'smooth'
}
```

<br>

**兼容性:**  
ie全系列不支持

<br>

### 场景: 滚动到底部
**当一个盒子内部的内容增加的时候 并且超过该盒子的高度的时候** 我们希望它自动滚动到底部
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #box {
      width: 100px;
      height: 200px;
      background: #a8dadc;
      color: #212121;
      position: relative;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div id="box">
    <div id="content">
      <!-- 在这里放置您的内容 -->
      BOX111<br>
      BOX222<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      BOX333<br>
      <!-- 重复几行以确保内容超过容器高度 -->
      ...
    </div>
  </div>
  <button onclick="scrollToBottom()">点击滚动到底部</button>
  <script>
    function scrollToBottom() {
      const div = document.querySelector('#box');
      const contentHeight = div.scrollHeight;
      const viewportHeight = div.clientHeight;
      const scrollHeight = contentHeight - viewportHeight;
      div.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  </script>
</body>
</html>
```

<br><br>

### **<font color="#C2185">元素.scrollIntoView({配置对象})</font>**
用于将指定的元素滚动到可视区域内。 这个方法可以应用于任何 DOM 元素

<br>

**参数:**  
**behavior:**  
表示滚动的行为方式。

- "auto"(自动滚动, 默认值)
- "smooth"(平滑滚动)或者一个具体的对象。具体对象可以包含 block 和 inline 属性, 分别表示滚动的垂直和水平方向, 默认值为 "start"。

<br>

**block:**   
滚动的垂直方向, 默认值为 "start"。可以是 "start"(滚动到可视区域的开始位置)、"end"(滚动到可视区域的结束位置)、"center"(滚动到可视区域的中间位置)或者 "nearest"(滚动到离可视区域最近的位置)。

<br>

**inline:**  
滚动的水平方向, 默认值为 "nearest"。可以是 "start"(滚动到可视区域的开始位置)、"end"(滚动到可视区域的结束位置)、"center"(滚动到可视区域的中间位置)或者 "nearest"(滚动到离可视区域最近的位置)。

<br>

**示例:**  
```js
const element = document.getElementById("myElement");

element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
```

上述代码会将 id 为 "myElement" 的元素滚动到可视区域的底部, 使用平滑滚动的效果。

scrollIntoView() 方法在网页中常用于实现平滑滚动到特定位置或元素的功能, 提供了一种简便的方式来操作滚动行为。

<br>

**示例2:**  

```html
<!DOCTYPE html>
<html>
<head>
  <title>scrollIntoView 示例</title>
  <style>
    /* 可选的 CSS 样式 */
    .container {
      height: 400px;
      overflow: auto;
    }

    .item {
      height: 100px;
      background-color: lightblue;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="item" id="item1">Item 1</div>
    <div class="item" id="item2">Item 2</div>
    <div class="item" id="item3">Item 3</div>
    <div class="item" id="item4">Item 4</div>
    <div class="item" id="item5">Item 5</div>
    <div class="item" id="item6">Item 6</div>
    <div class="item" id="item7">Item 7</div>
    <div class="item" id="item8">Item 8</div>
    <div class="item" id="item9">Item 9</div>
    <div class="item" id="item10">Item 10</div>
  </div>

  <script>
    // JavaScript 代码
    const element = document.getElementById("item7");
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  </script>
</body>
</html>
```

.item7 元素并不一定需要在一个有滚动条的容器内才能使用 scrollIntoView() 方法。该方法可以用于任何元素, 无论其是否在滚动容器内。

然而, 当父容器具有固定的高度并且内容溢出时, 才会出现滚动条。在示例中, 为了展示滚动行为, 我们使用了一个具有固定高度和 overflow: auto 样式的容器, 以便创建一个有滚动条的可滚动区域。

但是, 即使没有滚动容器, 您仍然可以使用 scrollIntoView() 方法将元素滚动到页面的可视区域内。如果父容器没有滚动条或者滚动条已经在可视区域内, 滚动行为可能不会产生任何视觉效果。

请注意, scrollIntoView() 方法的滚动行为也受到浏览器窗口大小和文档结构的影响。确保元素的位置和滚动行为与页面的实际布局和要求一致。

<br>

当没有滚动容器时, 可以使用 scrollIntoView() 方法将元素滚动到页面的可视区域内。以下是一个不带滚动容器的示例: 

```html
<!DOCTYPE html>
<html>
<head>
  <title>scrollIntoView 示例</title>
</head>
<body>
  <div style="height: 2000px; background-color: lightgray;">
    <h1>Scroll Into View Example</h1>
    <p>Scroll down to see the target element.</p>
  </div>

  <div>
    <h2 id="targetElement">Target Element</h2>
    <p>This is the target element you want to scroll to.</p>
  </div>

  <script>
    const targetElement = document.getElementById("targetElement");
    targetElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  </script>
</body>
</html>
```

在上述示例中, 我们在一个高度为 2000px 的 div 元素下方放置了一个目标元素 ``<h2 id="targetElement">``。使用 JavaScript 代码, 我们将目标元素通过 scrollIntoView() 方法滚动到页面的可视区域。

当您在浏览器中打开该示例时, 您会看到页面自动滚动到目标元素所在的位置。这是因为我们使用 scrollIntoView() 方法将目标元素滚动到页面的顶部(block: "start"), 并应用了平滑滚动效果(behavior: "smooth")。

请注意, 这个示例中没有具有滚动条的容器, 但仍然可以通过 scrollIntoView() 方法实现滚动功能。

<br><br>

# 初始化逻辑:
这段代码的意图是在确保 obj.name 不存在或为空时, 给它一个初始值。在这种情况下, 初始值是 "sam"

用于确保变量具有初始值或默认值, 以避免在后续代码中出现未定义或空值的情况。

我们可以先从一个地方取出一个变量先用 然后会其进行空判断 如果为空就赋初始值 然后在放回那个地方
```js
let obj = {}

if(!obj.name) {
  obj.name = "sam"
}

// 上面确保了在我们后续使用 name 属性的时候 一定是有值的
console.log(obj.name)
```

<br><br>

# 文本框的 defaultValue 属性
通过使用 defaultValue 属性可以获取输入框在页面加载后的初始值, 而 value 属性表示当前输入框中的值。

- 当输入框的值没有被修改时, value 属性和 defaultValue 属性的值相等。

- 但是当输入框的值被修改后, value 属性表示修改后的值, defaultValue 属性仍然表示之前的初始值, **不会随着输入框的修改而改变**

<br>

### 场景:
我想让文本框中的值 进行 修改前 和 修改后的对比
关于修改前的值 可以用 this.defaultValue 来获取

defautValue是页面加载出来后input中的初始值, value是当前input中的值

<br>

**当input中的值未修改时:**   
value == defaultValue

<br>

**当修改input值时:**
- value为修改后的值
- defaultValue仍为之前的

<br>

```html
<input type="text" id="myInput" value="Initial Value">
<button onclick="compareValues()">Compare Values</button>

<script>
function compareValues() {
  var input = document.getElementById("myInput");
  var currentValue = input.value;
  var defaultValue = input.defaultValue;

  console.log("Current Value:", currentValue);
  console.log("Default Value:", defaultValue);

  if (currentValue === defaultValue) {
    console.log("The value has not been modified.");
  } else {
    console.log("The value has been modified.");
  }
}
</script>
```

<br><br>

# 优化: if else 减少嵌套

<br>

### 场景1:
```js
if (a为真) {
  a = a
} else {
  a = b
}   

// 修改为:
a = a || b
```

<br>

### 场景2:
```js
if (a == b){
  a = c
}else{
  a = d
}

// 修改
a = (a == b) ? c : d
```

<br>

### 场景3:
后台接口通常会返回这种数据: 
```js
task: 0 // 0=紧急 1=日常 2=临时

// 这种时候不能用判断 我们可以这样
let mapData = ["紧急", "日常", "临时"]
let res = mapData[task]
```

<br>

### 优化 if 逻辑:
把最可能出现的情况放在最前面, 最不可能出现的情况放在最后面

这样做的目的是为了提高代码的执行效率。如果最可能出现的情况被放在最后进行判断, 那么在前面的条件判断中可能会执行一些不必要的代码, 导致性能下降。

```js
function checkValue(value) {
  if (value === 0) {
    console.log("Value is zero.");
  } else if (value > 0) {
    console.log("Value is positive.");
  } else if (value < 0) {
    console.log("Value is negative.");
  } else {
    console.log("Invalid value.");
  }
}
```

<br>

### 使用Array的方法 或者 Map等数据结构: 
如果 是苹果 或者 草莓的话 输出 red
```js
function test(){
  if(fruit == 'apple' || fruit == 'strawberry'){
    console.log('red');
  }
}
```

<br>

那如果我们要添加更多的条件的时候 怎么办?  

不能一直 || || || || || || 吧  

所以我们可以修改成如下的逻辑

**方式1: 使用 includes()**
```js
function test(fruit) {
  const redFruit = ['apple','strawberry','cherry','cranberry'];
  if(redFruit.includes(fruit)) {
    console.log("red")
  }
}
```

<br>

那如果我们有更多的颜色呢? 不光光只输出红色的水果 我们可以将颜色 和 水果 组织成键值对的形式 根据key 去找对应的value

颜色 : 水果 

```js
const fruitColor = new Map()

fruitColor.set("red", ['apple','strawberry'])
fruitColor.set('yellow',['banana','pineapple']);
fruitColor.set('purple',['grape','plum']);

function test(color) {
  return fruitColor.get(color) || []
}
```

<br><br>

## 使用 策略模式 优化 if else
定义一系列的算法, 把它们一个个封装起来, 并且使它们可以相互替换  

我们将 type 作为 key, 以要执行的逻辑 作为 value, 封装到 对象中  

能够有效避免多重条件选择语句, 显得简洁易于理解。在后期扩展也只需要再对象中新增一项, 方便维护。

```js
function fn(type) {
  if(type == "a") {
    console.log("我们执行 type a 对应的逻辑")
  } else if(type == "b") {
    console.log("我们执行 type b 对应的逻辑")
  } else if(type == "c") {
    console.log("我们执行 type c 对应的逻辑")
  }
}


// 修改为 使用策略模式优化
function fn(type) {
  let handlerA = () => console.log("我们执行 type a 对应的逻辑")
  let handlerB = () => console.log("我们执行 type b 对应的逻辑")
  let handlerC = () => console.log("我们执行 type c 对应的逻辑")

  let handlerMap = {
    a: handlerA,
    b: handlerB,
    c: handlerC,
  }

  handlerMap[type] && handlerMap[type]()
}
```

<br><br>

## 优化如下情况:
咋一看没感觉有什么异常, 但如果有1000个判断条件, 按照这种写法难不成要写1000个 if 分支? 
```js
if (name === "小刘") {
  console.log("刘哥哥");
} else if (name === "小红") {
  console.log("小红妹妹");
} else if (name === "陈龙") {
  console.log("大师");
} else {
  console.log("此人比较神秘！");
}
```

如果写了大量的 if 分支, 并且可能还具有分支套分支, 可以想象到整个代码的可读性和可维护都会大大降低, 这在实际开发中, 确实是一个比较头疼的问题, 那有没有什么办法能够即实现需求又能避免这些问题呢? 

<br>

### 简单分支优化:
```js
function getUserDescribe(name) {
  const describeForNameMap = {
    小刘: () => console.log("刘哥哥"),
    小红: () => console.log("小红妹妹"),
    陈龙: () => console.log("大师"),
    李龙: () => console.log("师傅"),
    大鹏: () => console.log("恶人"),
  };
  describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
```

题代码中的判断都是简单的相等判断, 那么我们就可以将这些判断条件作为一个属性写到对象describeForNameMap 中去, 这些属性对应的值就是条件成立后的处理函数。

之后我们就只需通过getUserDescribe函数接收到的参数去获取describeForNameMap对象中对应的值, 如果该值存在就运行该值(因为值是一个函数)。

这样一来原本的 if 分支判断就转换成了简单的key value对应值, 条件与处理函数一一对应, 一目了然。

<br>

### 复杂分支优化:
那如果我们的 if 分支中的判断条件不只是简单的相等判断, 还具有一些需要计算的表达式时, 我们该怎么办呢? (如下所示)

**我们可以引入二维数组来进行分支优化: **

```js
// 测试复杂的判断条件
function test1(str) {

  // 原生结构
  if(str.length > 5) {
    console.log(`${str}至少有5个字符`)
  } else if(str.length < 2) {
    console.log(`${str}不到2个字符`)
  } else if (str == "sam") {
    console.log(`${str}的值是sam`)
  } else {
    console.log("str的其他情况")
  }

  /*
  优化开始: 使用二维数组
  每一个分支 我们作为数组中的一个成员, 我们只写 if 和 else if 部分的逻辑

    分支中的条件: 作为二维数组中的一个成员 函数 -> 返回boolean

    分支中的逻辑: 作为二维数组中的一个成员 函数 -> 具体要执行的逻辑
  */
    const conditions = [
      [
        str => str.length > 3,
        () => console.log(`${str}至少有5个字符`)
      ],
      [
        str => str.length < 2,
        () => console.log(`${str}不到2个字符`)
      ],
      [
        str => str == "sam",
        () => console.log(`${str}的值是sam`)
      ],
    ]

    /*
    根据 方法的形参 到 conditions数组中 找到对应的成员项
        二维数组中的每个成员中的第一个元素(item[0]) 它是一个返回boolean值的函数, 我们将形参传入 会找到返回true的那个item
    */
    const condition = conditions.find(item => item[0](str))
    
    // 判断是否找到了对应的条件和执行逻辑, 如果没有则使用3元表达式 写else部分的逻辑
    condition ? condition[1]() : console.log("str的其他情况")
}

test1("sam")
```

上面我们定义了一个conditions数组, 数组内的每一个元素代表一个判断条件与其执行函数的集合(也是一个数组), 之后我们通过数组的find方法查找conditions数组中符合判断条件的子数组即可。

<br>

**工作中的例子:**
```js
const data = require("./data.json")

const workPlaceList = () => {
  const initVal = "all"

  const list = {
    workClass1: [],
    workClass2: [initVal],
    workClass3: [initVal],
    workClass4: [initVal],
    workClass5: [initVal],
    workClass6: [initVal],
    workPlaceClass2: [initVal],
    workPlaceClass3: [initVal],
    workPlaceClass4: [initVal],
    workPlaceClass5: [initVal],
    workPlaceClass6: [initVal]
  }

  // 之前
  /*
  data.forEach(item => {
    if (item.workClass1 !== '' && !list.workClass1.includes(item.workClass1)) {
      list.workClass1.push(item.workClass1)
    }
    if (item.workClass2 !== '' && !list.workClass2.includes(item.workClass2)) {
      list.workClass2.push(item.workClass2)
    }
    if (item.workClass3 !== '' && !list.workClass3.includes(item.workClass3)) {
      list.workClass3.push(item.workClass3)
    }
    if (item.workClass4 !== '' && !list.workClass4.includes(item.workClass4)) {
      list.workClass4.push(item.workClass4)
    }
    if (item.workClass5 !== '' && !list.workClass5.includes(item.workClass5)) {
      list.workClass5.push(item.workClass5)
    }
    if (item.workClass6 !== '' && !list.workClass6.includes(item.workClass6)) {
      list.workClass6.push(item.workClass6)
    }
    if (item.workPlaceClass2 !== '' && !list.workPlaceClass2.includes(item.workPlaceClass2)) {
      list.workPlaceClass2.push(item.workPlaceClass2)
    }
    if (item.workPlaceClass3 !== '' && !list.workPlaceClass3.includes(item.workPlaceClass3)) {
      list.workPlaceClass3.push(item.workPlaceClass3)
    }
    if (item.workPlaceClass4 !== '' && !list.workPlaceClass4.includes(item.workPlaceClass4)) {
      list.workPlaceClass4.push(item.workPlaceClass4)
    }
    if (item.workPlaceClass5 !== '' && !list.workPlaceClass5.includes(item.workPlaceClass5)) {
      list.workPlaceClass5.push(item.workPlaceClass5)
    }
    if (item.workPlaceClass6 !== '' && !list.workPlaceClass6.includes(item.workPlaceClass6)) {
      list.workPlaceClass6.push(item.workPlaceClass6)
    }
  })
  */

  // 优化后
  const conditions = [
    [
      (key, value) => value && Array.isArray(list[key]) && !list[key].includes(value),
      (key, value) => list[key].push(value)
    ]
  ]

  data.forEach(o => {
    Object.entries(o).forEach(item => {
      let [key, value] = item
      let condition = conditions.find(i => i[0](key, value))
      condition && condition[1](key, value)
    })
  })

  return list
}

const res = workPlaceList()
console.log("res: ", res)
```

<br>

### 抽离分支:
面例子中我们定义的这个describeForNameMap对象是一个独立的结构, 我们完全可以将它抽离出去: 

```js
const describeForNameMap = {
  小刘: () => console.log("刘哥哥"),
  小红: () => console.log("小红妹妹"),
  陈龙: () => console.log("大师"),
  李龙: () => console.log("师傅"),
  大鹏: () => console.log("恶人"),
};

function getUserDescribe(name) {
  describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
```

```js
const describeForNameMap = [
  [
    (name) => name.length > 3, // 判断条件
    () => console.log("名字太长") // 执行函数
  ],
  [
    (name) => name.length < 2, 
    () => console.log("名字太短")
  ],
  [
    (name) => name[0] === "陈", 
    () => console.log("小陈")
  ],
  [
    (name) => name === "大鹏", 
    () => console.log("管理员")
  ],
  [
    (name) => name[0] === "李" && name !== "李鹏",
    () => console.log("小李"),
  ],
];
    
function getUserDescribe(name) {
  // 获取符合条件的子数组
  const getDescribe = describeForNameMap.find((item) => item[0](name));

  // 子数组存在则运行子数组中的第二个元素(执行函数)
  getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

<br>

### 嵌套的if else 优化
```js
let toView = (platform = '移动端', flag = 1) => {
  if (platform === '移动端') {
    if (flag === 1) {
        view('移动页面一')
    } else if (flag === 2) {
        view('移动页面二')
    } else if (flag === 3) {
        view('移动页面二')
    } else if (flag === 4) {
        view('移动页面四')
    }
  } else if (platform === 'PC端') {
    if (flag === 1) {
        view('PC页面一')
    } else if (flag === 2) {
        view('PC页面二')
    } else if (flag === 3) {
        view('PC页面二')
    } else if (flag === 4) {
        view('PC页面四')
    }
  } 
}
```

Map对象的 key 可以是任何类型, 那么我们可以这样改写上面的代码

```js
const flagMirror = new Map([
  [{ platform: '移动端', flag: 1 }, '移动页面一'],
  [{ platform: '移动端', flag: 2 }, '移动页面二'],
  [{ platform: '移动端', flag: 3 }, '移动页面二'],
  [{ platform: '移动端', flag: 4 }, '移动页面四'],
  [{ platform: 'PC端', flag: 1 }, 'PC页面一'],
  [{ platform: 'PC端', flag: 2 }, 'PC页面二'],
  [{ platform: 'PC端', flag: 3 }, 'PC页面二'],
  [{ platform: 'PC端', flag: 4 }, 'PC页面四']
])

let toView = (platform = '移动端', flag = 1) => {
  let result = Array.from(flagMirror).find(([key, value]) => key.platform === platform && key.flag === flag)
    view(result[1])
}
```

<br>

### 练习:
```js
// 嵌套 if else 的优化: 
// 嵌套的话 肯定有多个条件 我们将所有条件都在形参的位置上定义
function test2(name, sex) {

  // 原始结构
  if(name == "sam") {
    if(sex == "男") {
      console.log(`${name}是男人`)
    } else if(sex == "女") {
      console.log(`${name}是女人`)
    }
  } else if(name == "erin") {
    if(sex == "男") {
      console.log(`${name}是男人`)
    } else if(sex == "女") {
      console.log(`${name}是女人`)
    }
  }

  /*
  优化开始:
    我们也可以使用Map来进行优化
    我们将 一个外层的 if else if条件 多对应的子条件都罗列出来
    - 外层条件1 - 内层条件1
    - 外层条件1 - 内层条件2

    - 外层条件2 - 内层条件1
    - 外层条件2 - 内层条件2

    条件部分 我们使用对象
    执行逻辑部分 我们使用函数
  */
  const conditions = [
  [
    {name: "sam", sex: "男"}, 
    () => console.log(`${name}是男人`)
  ],
  [
    {name: "sam", sex: "女"}, 
    () => console.log(`${name}是女人`)
  ],
  [
    {name: "erin", sex: "男"}, 
    () => console.log(`${name}是男人`)
  ],
  [
    {name: "erin", sex: "女"}, 
    () => console.log(`${name}是女人`)
  ],
  ]

  // 遍历conditions 拿到对应的 条件 + 执行逻辑函数的组合
  const condition = conditions.find(([key, value]) => key.name == name && key.sex == sex)

  condition ? condition[1]() : console.log("参数错误")
}

test2("sam", "男")
```

<br>

### 练习2: 
```js
let arr = [1,2,3,4,5,6,7,8]

const getElByRange = (param, source) => {

  if(typeof param == "number") {
    let index = param - 1
    return [source[index]]
  }

  const condition = [
    [
      {type: "string", val: "~"},
      () => {
        let [begin, end] = param.split("~")
        begin--
        return source.slice(begin, end)
      }
    ],
    [
      {type: "string", val: ">"},
      () => {
        let reg = /(?<=\>)\d+/g
        let index = param.match(reg)[0]
        return source.slice(index)
      }
    ],
    [
      {type: "string", val: "<"},
      () => {
        let reg = /(?<=\<)\d+/g
        let index = param.match(reg)[0]
        index--
        return source.slice(0, index)
      }
    ],
  ]
  
  const result = condition.find(([condition, handler]) => (condition.type == typeof param) && (param.indexOf(condition.val) != -1))
  if(result) return result[1]()
}

let ret = getElByRange("<7", arr)
console.log(ret)
```

<br>

那么我们再假设一种情况, 就是 flag 值为 1 2 3 时, 处理逻辑是一样的, 比如都跳转到 【页面二】, 那么我们上面的代码可以再次升级

```js
const flagMirror = new Map([
  [/^移动端[1-3]$/, '移动页面二'],
  [/^移动端4$/, '移动页面四'],
  [/^PC端[1-3]$/, 'PC页面二'],
  [/^PC端4$/, 'PC页面四']
])

let toView = (platform = '移动端', flag = 1) => {
  let result = Array.from(flagMirror).find(([key, value]) => key.test(`${platform}${flag}`))
  view(result[1])
}
```

<br>

### 策略模式: 优化
```js
checkInputItem() {
  // return errFlag
  let errFlag = false
  this.inputItemError.translateValue = null


  if (!this.inputItem.dataType) return
  const { dataType, dataLength } = this.inputItem


  // String check
  const processStrCheck = () => {
    if (!this.inputItem.translateValue) {
      errFlag = true
      this.inputItemError.translateValue = this.$t('translateMaster.errMsg.required')


      return errFlag
    }


    if (this.inputItem.translateValue.length > dataLength) {
      errFlag = true
      this.inputItemError.translateValue = this.$t('translateMaster.errMsg.rangeString', { max: dataLength })


      return errFlag
    }
    return errFlag
  }


  // Number check
  const processNumCheck = () => {
    let errFlag = false
    this.inputItemError.translateValue = null


    // 必填项确认
    if (!this.inputItem.translateValue) {
      errFlag = true
      this.inputItemError.translateValue = this.$t('translateMaster.errMsg.required')


      return errFlag
    }

    // 策略:
    const integerValidation = {
      test: val => /^([1-9]\d*|0)$/.test(val),
      getStatus: () => 1
    }

    // 策略:
    const decimalValidation = {
      test: val => /^([1-9]\d*|0)(\.\d+)?$/.test(val),
      getStatus: () => 2
    }

    // 策略:
    const negativeValidation = {
      test: val => /^-\d+(\.\d+)?$/.test(val),
      getStatus: () => 3
    }

    // 策略:
    const defaultValidation = {
      test: () => true,
      getStatus: () => 0
    }

    // 整合策略:
    const validator = {
      strategies: [integerValidation, decimalValidation, negativeValidation],
      validate: function(val) {
        for (const strategy of this.strategies) {
          if (strategy.test(val)) {
            return strategy.getStatus()
          }
        }


        return defaultValidation.getStatus()
      }
    }

    // 调用策略
    const valStatus = validator.validate(this.inputItem.translateValue)

    // 这里往下就不是参考范围了
    const checkResMapping = {
      // 不是数字
      0: () => {
        errFlag = true
        this.inputItemError.translateValue = this.$t('translateMaster.errMsg.notNumber')


        return errFlag
      },
      // 正整数的情况
      1: () => {
        if (String(this.inputItem.translateValue).length > dataLength) {
          errFlag = true
          this.inputItemError.translateValue = this.$t('translateMaster.errMsg.rangeInteger', { max: dataLength })
          return errFlag
        }
      },
      // 正小数的情况
      2: () => {
        // eslint-disable-next-line
        let [before, after] = dataLength.split(',')
        before = Number(before - after)
        after = Number(after)
        const [start, end] = this.inputItem.translateValue.split('.')


        if (start.length > before || end.length > after) {
          errFlag = true
          this.inputItemError.translateValue = this.$t('translateMaster.errMsg.rangeDecimal', { integer: before, decimal: after })
          return errFlag
        }
      },
      // 负数的情况
      3: () => {
        errFlag = true
        this.inputItemError.translateValue = this.$t('translateMaster.errMsg.notPositive')
        return errFlag
      }
    }


    return checkResMapping[valStatus]
      ? checkResMapping[valStatus]()
      : errFlag
  }


  // List check
  const processListCheck = () => {
    if (!this.inputItem.translateValue) {
      errFlag = true
      this.inputItemError.translateValue = this.$t('translateMaster.errMsg.required')
    }
    return errFlag
  }


  const condition = {
    String: processStrCheck,
    Number: processNumCheck,
    List: processListCheck
  }


  return condition[dataType] && condition[dataType]()
},
```

<br><br>

# window.matchMedia(mediaQueryString) 
该API可以 判断 或 监听 页面是否 大小 或 小于 某一个断点

可被用于判定Document是否匹配媒体查询, 或者监控一个document 来判定它匹配了或者停止匹配了此媒体查询 

当 视口满足 我们传入的 "(max-width: 874px)" 断点后
- 或者 返回 true 或 false 用以判断是否 大于或小于 该断点
- 或者 监视 该断点的变化情况

<br>

### 使用方式: 传入媒体查询的字符串
```js
// 可以不加 window
let mql = window.matchMedia('(max-width: 600px)')
```

<br>

### 返回值: mql对象
```js
{
  matches: true
  media: "(max-width: 874px)"
  onchange: null
}
```

<br>

**<font color="#C2185">mql.matches</font>**  
它是一个布尔值 **只读**

如果当前页面匹配该断点时 其值为true; 反之其值为false 

<br>

**<font color="#C2185">mql对象.addListener</font>**  
添加页面 断点状态变化时的 监听器

使用 Window.matchMedia() 来检测视口的宽度是否小于等于 600px, 并在匹配状态发生变化时输出相应信息

```js
// 为窗口创建 断点
const mediaQuery = window.matchMedia("(max-width: 600px)");

// 在该断点上添加 监听事件
mediaQuery.addListener(handleMediaQueryChange);  // 添加媒体查询状态变化的监听器

// 初始状态下进行一次匹配检查并输出结果, 参数mediaQuery用于回调内使用
handleMediaQueryChange(mediaQuery);

// 回调
function handleMediaQueryChange(mediaQuery) {
  if (mediaQuery.matches) {
    console.log("Viewport width is smaller than or equal to 600px");
  } else {
    console.log("Viewport width is larger than 600px");
  }
}
```

<br>

### 示例: 在某断点的时候 调整div高度
当在视口小于874的时候 统一图片下方文本区域的高度

```js
export default class HeightAdjust {

  constructor() {
    this.getParam()
    this.eventBind()
  }

  // 获取 li .text-area text-area 下的元素 对象是图片card下方的文本区域
  getParam() {
    this.el = document.querySelectorAll(".p-selection__common__lineup > li .text-area")
  }

  eventBind() {

    // 当屏幕 < 874px 的时候 我们做什么样的逻辑
    if (matchMedia("(max-width: 874px)").matches) {

      // 设置最大的高度
      let elemMaxHeight = 0
      let elemArray = new Array

      // 因为 我们获取的 el是一个类数组 没有forEach方法所以采用的这种格式
      Array.prototype.forEach.call(this.el, (elemChild) => {
        // 先将高度设置为0 然后push每一个元素的高度 但为什么要先将它设置为0呢？
        elemChild.style.height = ""
        elemArray.push(elemChild.clientHeight)
      })

      // 我们往数组里面push里很多高度 选一个最高的 设置为文本区域的高度
      elemMaxHeight = Math.max.apply(null, elemArray)

      Array.prototype.forEach.call(this.el, (elemChild) => {
        elemChild.style.height = elemMaxHeight + "px"
      })
    }
  }
}
```

<br><br>

# 焦点元素
### **<font color="#C2185">document.activeElement</font>**
属性返回文档中当前获得焦点的元素

<br>

### **<font color="#C2185">document.activeElement.tagName</font>**
返回元素的标签名

<br>

### **<font color="#C2185">element.focus()</font>**
为元素设置焦点

<br>

### **<font color="#C2185">document.hasFocus()</font>**
查看当前元素是否获取焦点 

<br><br>

# 对象字面量定义方式  == class类
我们先看下函数式编程 求平均成绩
```js
let name = "Sam"
let grade = [
  {
    name: "js",
    score: 99
  },
  {
    name: "docker",
    score: 76
  }
]

function average(grade, name) {
  let total = grade.reduce((pre, item) => pre + item.score, 0)
  return `${name}: ${total / grade.length}`
}

console.log(average(grade, name))
```

上面我们将逻辑都暴露在全局 就会有函数名重复 覆盖等问题 也会让程序变得错综复杂

上面这些都是对用户的操作 我们可以把它们变成对象

我们可以将上面的逻辑放在对象中 对象中的属性可以存储不同的值
```js
let user = {
  name: "Sam",
  grade: [
    {
      name: "js",
      score: 99
    },
    {
      name: "docker",
      score: 76
    }
  ],

  // 这个函数就是方法 函数中需要的数据都在这个对象中 所以我们可以通过this来调用我们需要的属性 不用传递了
  average: function() {
      let total = this.grade.reduce((pre, item) => pre + item.score, 0)

      return `${this.name}: ${total / this.grade.length}`
  }
}

console.log(user.average())



let user = {
  name: "sam",
  grade: [
    {
      name: "js",
      score: 99
    },
    {
      name: "docker",
      score: 76
    }
  ],

  // get标识符
  get ave() {
    return this.grade.reduce((pre, item) => pre + item.score, 0)
  }
}
```

<br><br>


# 技巧: 函数内定义配置对象,  利用传参修改配置对象
有一个场景 下面的upload函数 里面有一个config属性 我们调用函数的时候要求传递进去一个配置对象

但要求是 如果我们只传递了type 那么只修改type 如果我们只传递了size 那么只修改size

```js
function upload(params) {
  let config = {
    type: ".jpeg",
    size: 10000
  }

  // 我们利用对象的展开语法 同名属性会被覆盖
  config = {...config, ...params}

  console.log(config)
  // {type: '.jpeg', size: 20000}
}

upload({size: 20000})
```

<br><br>

# 技巧2: 当用户没有传递必要的参数的时候 报错
```js
function oss(config) {
    if(!config.hasOwnProperty("host")) {
        throw new Error("必须设置主机地址")
    }
}

oss({user: "sam"})
```

<br><br>

# 技巧3: reduce 修改数组对象的结构
我们要将下面的数组对象变为对象的形式 

- key: category的值 - index: 
- val: 原数组成员(对象)

```js
const lessons = [
  {
    title: "媒体查询",
    category: "css"
  },
  {
    title: "Flex",
    category: "css"
  },
  {
    title: "Mysql",
    category: "mysql"
  },
]

const res = lessons.reduce((pre, curr, index) => {
  pre[`${curr.category} - ${index + 1}`] = curr
  return pre
}, {})

console.log(res)

/*
{
  "css - 1": {
    "title": "媒体查询",
    "category": "css"
  },
  "css - 2": {
    "title": "Flex",
    "category": "css"
  },
  "mysel - 3": {
    "title": "Mysql",
    "category": "mysql"
  }
}
*/
```

<br><br>

# 对象浅拷贝的多种实现方式
我们先回忆一下对象的深浅拷贝
- 浅拷贝指的是: 目标对象中的属性都是基本数据类型
- 深拷贝指的是: 目标对象中的属性有引用类型数据

```js
const obj1 = {
  name: "sam",
  age: 18,
  job: {
    front: "vue"
  }
}

const obj2 = Object.assign({}, obj1)
console.log(obj2 === obj1) // false

// 对象中的基本数据类型 是 独立的
obj2.name = "erin"
console.log(obj2.name)  // erin
console.log(obj1.name)  // sam

// 对象中的引用类型 仍然是同一个引用
obj2.job.front = "react"
console.log(obj2.job.front)  // react
console.log(obj1.job.front)  // react
```

<br>

## 浅拷贝:

### 浅拷贝实现方式1: 循环赋值: 
该方式适合将数据进行修改
```js
let hd = {name: "sam", url: "www.baidu.com"}

let obj = {}
// 当对象中的属性 没有深层次的结构的时候 这样也属于深拷贝
for (const key in hd) {
  obj[key] = hd[key]
}
```

<br>

### 浅拷贝实现方式2: 对象的结构赋值: 
```js
// 方式2 把hd中的值压入到了新对象中
let obj = Object.assign({}, hd)
```

<br>

### 浅拷贝实现方式3: 扩展运算符: 
```js
// {} 相当于新开辟了一块空间
let obj = { ...hd }
```

<br><br>

## 深拷贝: 

### 情景1: 对象中只有对象的情况: 
深拷贝的实现思路就是一层一层的处理, 递归
```js
let obj = {
  name: "sam",
  user: {
    name: "erin"
  }
}

function deepCopy(obj) {

  let temp = {}

  for(let key in obj) {
    temp[key] = typeof obj[key] == "object" 
      ? deepCopy(obj[key]) 
      : obj[key]
  }

  return temp
}

let ret = deepCopy(obj)
console.log(ret)
```

<br>

### 情景2: 对象中还有数组的情况: 
```js
let obj = {
  name: "sam",
  user: {
    name: "erin"
  },
  arr: []
}
```

**要点1:**   
判断是对象还是数组 我们可以使用 instanceof 来进行判断
```js
{} instanceof Object  // true
[] instanceof Array   // true
```

<br>

**要点2:**  
我们将 对象内部的元素 是数组也好 还是对象也好 都转成对数组的操作方式

<br>

**前置理解:**
```js
// 我们看看原始数据 使用Object.entries()方法后的样式
let obj = {
  name: "sam",
  user: {
    name: "erin"
  },
  arr: []
}

console.log(JSON.stringify(Object.entries(obj), null, 2))
[
  [ "name", "sam" ],
  [ "user", { "name": "erin" } ],
  [ "arr", [] ]
]
```

我们发现 原本的对象数组变成了二维数组 Object.entries() 将一个对象的
```s
key: value
["key", value]
```

上面我们实现了不管原始数据中是对象也好 还是数组也好都转成 对数组的处理方式

<br>

**实现方式:**
1. 判断 参数对象 是否为数组, 如果是数组则初始化一个空数组, 如果是对象则初始化一个空对象
```js
function deepCopy(obj) {

  // 判断参数的类型 是对象还是数组 因为是递归调用 所以后序还会传递参数进行再次判断
  // 进行 对象 或 数组 的初始化
  let temp = obj instanceof Array ? [] : {}
  console.log("temp", temp)
  /*
    let [key, value] of Object.entries(obj)
    我们获取的 key value 
      1. 当普通值的时候
        [name, sam]

      2. 当为对象的时候
        [user, {name: "erin"}]

      3. 当为数组的时候 是 [索引 + 值] 我们遍历获取的就是 [0, 1]
        [[0, 1], [1, 2], [2, 3]]
  */

  for(let [key, value] of Object.entries(obj)) {
    console.log("key", key)
    console.log("value", value)

    // 每次都会监测 value 的类型 如果是 对象 则递归调用 数组和对象使用 typeof 检查都是对象
    // 当 value 为引用类型的值时递归调用 再次进入逻辑 temp 就是一个 []

    // value: [1, 2, 3] 会被 Object.entries 进行处理 得到 [[0, 1], [1, 2], [2, 3]]
    // 然后 从而获取 [key, value] = [index, value]
    // 然后我们往 temp[key] == temp[index] 相当于往 temp数组中的0位置添加1
    temp[key] = typeof value == "object" ? deepCopy(value) : value
  }

  return temp
}

let ret = deepCopy(obj)
console.log("ret", ret)
```

<br><br>

# 闭包的特性也可以用来体现函数的封装性: 
比如我们创建了下面的构造函数 但是发现 构造函数的外部是可以通过 user对象修改里面的属性的 有的时候我们希望的是我们只向外暴露功能 并不希望它能够修改我们对象中的属性

```js
function User(name, age) {
  this.name = name
  this.age = age

  this.show = function() {
    console.log(this.name)
  }

  this.info = function() {
    return this.age > 50 ? this.name + "老年人" : this.name + "年轻人"
  }
}

let user = new User("Sam", 33)
// 这时候在函数外部是可以
user.name = "erin"
user.show()
```

<br>

我们可以利用闭包的方式来解决问题
```js
function User(name, age) {

  let data = {name, age}

  let info = function() {
    return age > 50 ? name + "老年人" : name + "年轻人"
  }

  this.show = function() {
    console.log(data.name + info())
  }
}
```

<br><br>

# 对象的访问器: get set
现在我们有一个对象
```js
const user = {
  name: "sam"
  age: 18
}
```

上面这个对象中的年龄我在外面可以随便的改 我们可以在对象的外部 user.age = 进行随意的复制操作 那这个数据很容易变的不稳定 那怎么做呢?

<br>

### 方式1:
```js
const user = {
  data: {name: "sam", age: 18},
  setAge(value) {
    if(typeof value != "number" || value < 10 || value > 100) {
      throw new Error("年龄格式不匹配")
    }
  },
  getAge() {

  }
}
```

上面方式有一个不好的地方 就是我们在给属性赋值的时候 需要调用的是 user.setAge(999) 方法 那我们能不能直接通过 user.age = 999 的方式给对象设置属性呢? 

这时候我们就可以使用访问器 将属性写成计算属性函数的样式 前面用关键字set来修饰

<br>

### **<font color="#C2185B">set 属性() { ... }</font>**
### **<font color="#C2185B">get 属性() { ... }</font>**
对象中的属性 通过这种方式设置的时候 当我们通过如下的操作时 就会触发对应的逻辑

- obj.属性
- obj.属性 = 赋值

```js
const user = {
  data: {name: "sam", age: 18},
  set age(value) {
    if(typeof value != "number" || value < 10 || value > 100) {
      throw new Error("年龄格式不匹配")
    }

    this.data.age = value
  },
  get age() {
    // return "abc"
    return this.data.age
  }
}
```

这时候我们可以还通过 user.age = 999 的方式赋值

<br>

### 访问器的应用: 计算属性
我们希望 我们调用对象中的属性就能获取到总价格

```js
let lesson = {
  lists: [
    {name: "js", price: 100},
    {name: "mysql", price: 212},
    {name: "vue", price: 99},
  ],
  get total() {
    return this.lists.reduce((pre, item) => {
      return pre + item.price
    }, 0)
  }
}

console.log(lesson.total)
```

<br>

### 访问器的应用: 批量设置属性
下面有这样的一个对象
```js
const web = {
  protocol: "https",
  host: "www.baidu.com",
}
```

<br>

如果我们要设置里面的属性的话 都是
```js
web.name = ""
web.url = ""
```

<br>

那有没有一种方法 web.site = "erin, www.taobao.com"
当我们这么设置的时候 可以一次搞定 name url 的赋值操作呢?

可以 我们可以通过访问器
```js
const web = {
  protocol: "https",
  host: "www.baidu.com",

  get site() {
    return this.protocol + "://" + this.host
  },

  set site(val) {
    [this.protocol, this.host] = val.split("://")
  }
}

web.site = "http://taobao.com"
console.log(web.protocol)
console.log(web.host)
```

<br>

### 访问器的应用: token的读写处理
我们从后台获取的token需要存在本地 我们会使用到本地存储
```js
let Request = {
  set token(content) {
    localStorage.setItem("token", content)
  },
  get token() {
    let token = localStorage.getItem("token", content)

    if(!token) {
      // 跳转到登录页面的操作
    }

    return token
  }
}

// 当我们调用token属性的时候 就会触发保存到本地存储的逻辑
Requset.token = "293423g5jghj342g5jhghj"
```

<br><br>

# 对象代理 proxy
访问器只是对单个属性的控制 对象代理是对整个对象进行控制 我们不是直接操作数据 而是通过代理来操作数据

**相当于变相的对 源对象 的获取 和 修改操作进行了拦截**


<br>

### 示例:
我们先定义一个数据
```js
const hd = {name: "sam"}
```

<br>

### **<font color="#C2185">let proxy = new Proxy(目标对象, [配置对象])</font>**
代理后 可以通过 proxy 操作原对象 相当于proxy就是对原对象属性的获取 和 设置进行了拦截

<br>

**参数1: 目标对象**    
对哪个对象进行代理

<br>

**参数2: 配置对象**  
可以传空 或者 传递具体的配置
```js
// config
{
  get(target, propName) { ... },
  set(target, propName, value) { ... },
  deleteProperty(target, propName) { ... }
}
```

<br>

### **<font color="#C2185">get(target, prop) { return target[prop] }</font>**
该函数在有人 读取了 代理对象中的属性的时候 会被调用

- target: 源对象
- propName: 被读取的属性值

<br>

### **<font color="#C2185">set(target, prop, value) { target[prop] = value }</font>**
该函数在有人 修改 或 往代理对象中追加属性的时候 会被调用

- target: 源对象
- propName: 被读取的属性值
- value: 被修改后的值

<br>

### **<font color="#C2185">deleteProperty(target, propName) { ... }</font>**
该函数在有人 删除了代理对象中的属性的时候 会被调用


```js
const flag = " -- "

const obj = {
  name: "sam",
  age: 18,
  job: {
    front: "js",
    backend: "java"
  }
}


let proxy = new Proxy(obj, {
  get(target, propName) {
    return target[propName] + flag + "!"
  },

  set(target, propName, val) {
    target[propName] = val

    // 在严格模式中要返回true
    return true
  }
})

console.log(proxy.name)
proxy.name = "erin"
console.log(proxy.name)

```

<br>

**注意:**  
1. 严格模式中 我们需要在set方法中return true 不然会报错
2. 配置对象是必须要传递的

<br><br>

## proxy 对函数的代理: 
代理后proxy就是原函数 以前我们是通过 fn() 调用函数

代理后通过 proxy() 调用函数 才会对原函数进行拦截

<br>

### **<font color="#C2185">new Proxy(函数名, [配置对象])</font>**

<br>

**参数2:**  
配置对象里需要传递 apply(fn, obj, args)
```js
// 示例:
let proxy = new Proxy(info, {
  apply(fn, obj, args) {
    
  }
})
```

- fn: 就是被代理的函数

- obj: 后续在调用 proxy 的时候 可以使用 可以通过 proxy.apply() 传入this, 这样配置对象中的obj就是传入的this

- args: 当我们调用 proxy(实参) 传入实参的时候, 会被args接收

<br>

**示例:**
```js
function api(options) {
  console.log("发送请求", options)
}

const _fn = new Proxy(api, {
  // fn: 原函数
  // args: 调用 _fn 的时候传入的实参
  apply(fn, obj, args) {

    // 在 核心逻辑 前 添加token
    const options = args[0]
    options.token = "adsf133adf"

    // 将args传入
    fn.apply(this, args)

    // 在 核心逻辑 后 打印发送成功
    console.log("发送成功")
  }
})

_fn({
  url: "www.baidu.com"
})
```

<br>

**参数obj的演示:**
```js
function api(options) {
  console.log("发送请求", options)
}

const _fn = new Proxy(api, {
  apply(fn, obj, args) {

    // 就是我们传入的 name: sam 的那个对象
    console.log(obj)

    const options = args[0]
    options.token = "adsf133adf"

    fn.apply(this, args)

    console.log("发送成功")
  }
})


// 定义对象
const obj = {
  name: "sam"
}

// 通过 apply等方法 绑定this
_fn.apply(obj, [{
  url: "www.baidu.com"
}])
```

<br><br>

## proxy 对数组的代理: 
通过 代理 对 原数组 进行加工 

<br>

### **<font color="#C2185">new Proxy(数组, 配置对象)</font>**
代理数组后 proxy就是数组 当我们访问 修改代理数组的时候 就会触发对应的get set回调

<br>

**参数:** 
- get(arr, index)
- set(arr, index, value)

```js
const arr = [1,2,3]
const _arr = new Proxy(arr, {
  get(arr, index) {
    console.log("get")
    return arr[index]
  },
  set(arr, index, val) {
    console.log("set", arr)
    console.log("set", index)
    console.log("set", val)
  }
})

console.log(_arr[0])
_arr[0] = "a"
```

<br>

### 示例:
如果数组对象中的元素的title的长度大于5进行截断处理 也就是对数组的拦截处理

```js
let lessons = [
  {
    title: "媒体查询知多少",
    category: "css"
  },
  {
    title: "FLEX",
    category: "css"
  },
  {
    title: "MYSQL",
    category: "mysql"
  },
]

// 当获取元素的时候我们对title的长度进行截断处理
let proxy = new Proxy(lessons, {
  get(arr, key) {
    const title = arr[key].title
    const len = 5
    
    arr[key].title = title.length > len 
      ? title.substr(0, len) + ".".repeat(3) 
      : title

    return arr[key]
  }
})
console.log(proxy[0])
```

<br>

### 通过代理实现双向绑定: 
```html
<input type="text" v-model="title" />
<input type="text" v-model="title" />

<h4 v-bind="title">这里也会发生更新</h4>
```
```js
function View() {
  // 创建代理 {}里面用来存放 公共数据 相当于 data
  let proxy = new Proxy({}, {
    get(obj, prop) {

    },
    set(obj, prop, value) {
      document.querySelectAll(`[v-model="${prop}"]`).forEach(item => {
          item.value = value
      })
    }
  })

  // 绑定事件
  this.init = function() {
    const els = document.querySelectorAll("[v-model]")

    els.forEach(item => {
      item.addEventListener("keyup", function() {
        proxy[this.getAttribute("v-model")] = this.value
      })
    })
  }
}

new View().init()
```

<br>

### 代理处理表单验证: 
```html
<form>
  <input type="text" validate rule="max:10">
  <input type="text" validate rule="min:5">
  <input type="text" validate rule="isNumber">
  <button type="submit">Submit</button>
</form>
```

```js
// 工具类
class Validate {
  // 检查value是否超过最大长度
  max(value, len) {
    return value.length < len
  }

  // 检查value是否超过最小长度
  min(value, len) {
    return value.length > len
  }

  isNumber(value) {
    return /^\d+$/.test(value)
  }
}

// 创建代理工厂 将对象加工成代理对象
function ProxyFactory(target) {
  return new Proxy(target, {
    get(target, key) {
      return target[key]
    },

    // 按键抬起的时候就会触发set方法 实时验证
    set(target, key, value) {
       // value就是this 因为外面 proxy[i] = this 代表每一个表单
       // 获取表单元素上的规则
       const rule = el.getAttribute("rule")

       // 创建验证类
       const validate = new Validate()

       let state = rule.split(",").every(rule => {

          // 第一个参数是验证类中的函数 二个函数的参数
          // info ["max", "12"]
          const info = rule.split(":")

          // value是表单元素 就是this 就是input
          return validate[info[0]](value.value, info[1])
       })
       console.log(state)
    }
  })
}

// 对NodeList进行了代理 相当于我们对数组进行的代理 
let proxy = ProxyFactory(document.querySelectorAll("[validate]"))

// 当表单触发键盘抬起事件的时候触发表单验证处理
proxy.forEach((item, i) => {
  // 每一个表单元素
  console.log(item)

  item.addEventListener("keyup", function() {
    // 这相当于set的第三个参数就是this
    proxy[i] = this
  })
})
```

<br><br>

# Reflect
它的作用是用来调用 **对象的基本方法**

<br>

### 对象的基本方法:
它是指针对js对象有哪些最基本的操作 internal method (**内部方法**)

我们在js的文档中能看到如下图的各种方法
![对象的基本方法](./images/internalMethod.png)

比如
- ``[[GetPrototypeOf]]``: 拿到对象的原型

上面的都是针对对象的基本操作 每个基本操作都是一个方法 在过去这些方法是不对外暴露的 就是我们作为js的开发者 我们不可能直接调用这些方法

我们要想用这些方法 需要通过一些特殊的语法去使用

比如我们为对象进行赋值
```js
const obj = {}
obj.a = 3
```

``obj.a``就是语法 我们通过这个语法间接的调用了相应的 **内部方法**, 点语法就会触发 ``[[Set]]``

但是es6之后就出现了 reflect 这样我们就有机会直接调用或使用 **内部方法** 了

下图中就表示了, 内部方法 对应着 Reflect中的哪些静态方法

|内部方法|Reflect的静态方法|
|:--|:--|
|[[GetPrototypeOf]]|getPrototypeOf|
|[[SetPrototypeOf]]|setPrototypeOf|
|[[IsExtensible]]|isExtensible|
|[[PreventExtensions]]|preventExtensions|
|[[GetOwnProperty]]|getOwnPropertyDescriptor|
|[[DefineOwnProperty]]|defineProperty|
|[[HasProperty]]|has|
|[[Get]]|get|
|[[Set]]|set|
|[[Delete]]|deleteProperty|
|[[OwnProperty]]|ownKeys|

这样我们就有机会不使用 ``obj.a`` 的形式去调用**内部方法**了, 而是使用函数的方式来调用
```js
const obj = {}
Reflect.set(obj, 'a', 3)
```

<br>

这样有什么意义么?

我们的类似``obj.a``的js语法 往往不是直接执行**内部方法**的, 当我们写了``obj.a``的js语法后他会去执行一个被封装过后的方法, 在这个封装过后的方法里面它调用了基本方法

![js语法的执行过程](./images/js语法的执行过程.png)

因此我们在使用js语法的时候实际上除了调用内部方法外, 还做了一些额外的事情

比如我们要读一个对象的属性c, 当我们读c的时候会调用get函数拿到 a+b 的结果
```js
const obj = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}
```

根据我们上面讲的 当我们读 ``obj.c`` 的时候, 这是一个js语法, 它会触发封装的函数, 这个封装的函数在内部帮我们调用了 内部方法``[[Get]]``

我们看文档能知道
```s
[[Get]] (propertyKey, Receiver) -> any
```

我们能看到``[[Get]]``对应的方法多了一个Receiver的参数, Receiver的参数就是用来处理this的指向

我们上面读 ``obj.c`` 的时候, get函数中有this, 这个this指向谁就是由Receiver决定的e, 但是在js语法层面(``obj.c``)它并没有要求我们提供 Receiver的参数 

为什么我们不需要提供?

是因为我们使用js语法``obj.c`` 它触发的是一个封装函数的执行 封装函数里面已经帮我们准本好了Receiver, 然后帮我们将这个Receiver传到内部方法中了

它会将前面的``obj.c`` obj当做this作为Receiver的参数传到了基本方法中

那也就意味着如果我们有一些特殊的情况 想要更改里面的this 我们会发现在 js语法``obj.c``层面我们做不到了 因为它是封装后的方法

但是我们使用 Reflect就可以做到 因为它是直接调用 内部方法的

```js
// 参数3就是Receiver
Reflect.get(obj, 'c', {a: 3, b:4})
```

这样当我们使用Reflect读取属性c的时候 就会触发get函数的执行, this被我们修改为新的对象了

<br>

### 场景:
当我们做一些代理的时候就有用了
```js
const obj = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}

// 代理中的配置就是对应了内部方法
const p = new Proxy(obj, {
  get(target, key) {
    console.log('key: ', key)

    // 当我们使用这种方式读取对象中的计算属性的话会有问题
    return target[key]
  }
})
```

问题: ``p.c`` 的时候 我们只读到了 c, 打印结果
```s
key: c
```

也就是没有触发get函数的执行 这就是因为this的指向问题

因为 ``target[key]`` 使用这种方式来读取属性的话, 它读取的是原始对象(obj, 并不是代理对象p)的属性c, 这时的this指向的是原始对象, 而不是代理对象的属性c, 所以就没有触发对 a 和 b 的监听, 因为如果是代理对象的话, 会继续读取 a 和 b

这里我们就可以换成 Reflect

```js
const obj = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}

// 代理中的配置就是对应了内部方法
const p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('key: ', key)

    // 我们使用 Reflect 并传递this为 receiver(p代理对象)
    return Reflect.get(target, key, receiver)
  }
})
```

这样当我们 ``p.c`` 的时候, 会发现打印出下面的内容, 这样就监听到了对所有属性的读取
```s
key:  c
# 自动打印的
key:  a
key:  b
```

再说一个例子, 比如我们要读取对象中的所有属性, 我们会使用 ``Object.keys``
```js
const obj = {
  a: 1,
  b: 2
}

Object.keys(obj)  // 没问题
```

但如果是下面的场景 下面的情况我们使用``Object.keys``读取所有属性的话就读取不到了
```js
const obj = {
  a: 1,
  b: 2,
  [Symbol('d')]: 5
}

Object.defineProperty(obj, 'c', {
  value: 3,
  enumerable: false
})

Object.keys(obj)  // ['a', 'b']
```

因为``Object.keys(obj)``是调用的封装后的函数 在封装后的函数中调用了基本方法(``[[OwnPropertyKeys]]``) 但是同时封装函数也做了一些事情

我们希望的是不要做别的事 直接拿到所有的key就可以了 我们可以直接调用基本方法

```js
Reflect.ownKeys(obj)
```

<br>

### **<font color="#C2185">Reflect.get(想从哪个对象上获取属性, '获取什么属性')</font>**
### **<font color="#C2185">Reflect.set(想从哪个对象上修改属性, '修改什么属性', '修改为什么值')</font>**
### **<font color="#C2185">Reflect.deleteProperty(想从哪个对象上删除属性, '删除什么属性')</font>**
也就是说 我们对 对象的增删改查还可以通过这个api

<br><br>

# JSON
js_expansion.md 也有部分记载 有机会合并在一起

<br>

## 格式:
1. JSON对象中 key 的部分要使用 "" 
2. JSON对象中 val 的部分没有要求 1, true 原本的写法就可以
3. undefind 和 function 会丢失

<br>

### **<font color="#C2185">JSON.stringify(目标对象, 参数2, 参数3)</font>**

**参数2:**  
- 格式1: 数组字符串 ["属性名"]  
代表要保留的属性 可以传递多个, 传递null 代表全部保留

```js
let hd = {
  title: "sam"
  url: "www.baidu.com",
  teacher: {
    name: "erin"
  }
}

JSON.stringify(hd, ["title"])
// {"title": "sam"}
```

<br>

- 格式2: 函数
```js
let json = JSON.stringify(obj3, function(key, val) {
  key: json中的key
  val: json中的val
}, 2)
```

<br>

**参数3:**  
制表符缩进


### 自定义json返回: 
我们需要在目标对象里面设置 **toJSON: function() { return }** 方法
```js
let hd = {
  title: "sam"
  url: "www.baidu.com",
  teacher: {
    name: "erin"
  },

  // 设置toJSON方法
  toJSON: function() {
    return {
      title: this.title
    }
  }
}

let json = JSON.stringify(hd)
```

<br>

### **<font color="#C2185">JSON.parse(目标对象, callback)</font>**

**参数2:**  
当我们想对返回得JSON对象的格式进行处理的时候 可以传递一个回调
```js
let hd = {
  title: "sam"
  url: "www.baidu.com",
  teacher: {
    name: "erin"
  }
}


let obj = JSON.parse(hd, (key, value) => {
  if(key == "sam") {
    value = "[加油] - " + value
  }
})
```

<br>

### 注意点:
```s
https://blog.csdn.net/jason_renyu/article/details/123640102
```

1. 使用JSON.Stringify 转换的数据中, 如果包含 function, undefined, Symbol, 这几种类型, 不可枚举属性, JSON.Stringify序列化后, 这个键值对会消失。

2. 转换的数据中包含 NaN, Infinity 值(含-Infinity), JSON序列化后的结果会是null。

<br>

**示例:**  
```js
let obj = {
  name: "sam", 
  age: 10, 
  sex: true, 
  say: function() {console.log(1)}
}
```

当我们使用 ``JSON.stringify(obj)`` 的时候发现 函数的key-value消失

<br>

**解决方案:**  
```js
let obj3 = {
  name: "sam", 
  age: 10, 
  sex: true, 
  say: function() {console.log(1)}
}

// 使用 stringify 的时候 对 val 的部分进行判断
let json = JSON.stringify(obj3, function(key, val) {
    
  // 处理函数丢失的问题
  if(typeof val == "function") {
    return val + ""
  }
  
  // 处理undefined丢失的问题
  if(typeof val == "undefined") {
    return "undefined"
  }

  return val

}, 2)
console.log(json)
/*
{
  "name": "sam",
  "age": 10,
  "sex": true,
  "say": "function() {console.log(1)}"
}
*/


// 验证: 解析
let res = JSON.parse(json)
console.log(res)
/*
  {name: 'sam', age: 10, sex: true, say: 'function() {console.log(1)}'}
*/


// 还原上面的json对象的话 也需要做类似的处理
let res = JSON.parse(json, function(key, val){
  if(
    typeof val == "string" &&
    val.indexOf &&
    val.indexOf('function') > -1
  ) {
    return eval(`(function(){return ${val}})()`)
  }
  return val
})
console.log(res)
```

<br><br>

# 执行上下文
```js
// 情况1:
console.log(a)  // a is not defined

// 情况2:
console.log(a)  // undefined
var a

// 情况3:
console.log(a)  // undefined
var a = 10
```

上面我们发现:
- 第一句: 报错 a未定义
- 第二句 & 第三句: 输出都是undefined

说明浏览器在执行console.log(a)时已经知道了a是undefined但却不知道a是10

其实, 在一段js代码拿过来 真正一句一句运行之前浏览器已经做了一些 **"准备工作"**

其中就包括对变量的声明(而不是赋值) **变量赋值是在赋值语句执行的时候进行的**

比如 我们在 ``console.log(this)`` 的时候 都会知道无论在哪个位置获取this都是有值的 上面说的是属性的问题 下面我们看看函数的两种情况
```js
// 情况1
console.log(fn1)    // 能输出整个函数
function fn1() {
  console.log("fn1")
}


// 情况2
console.log(fn2)    // undefined
var fn2 = function() {
  console.log("fn2")
}

// 情况2 相当于
var fn2;
console.log(fn2)
fn2 = function() {
  console.log("fn2")
}
```

在 "准备工作" 中对待函数表达式就像对待 var a = 10 这样的变量一样只是声明 对待函数声明时却把函数整个赋值了 

<br>

### "准备工作"中完成了哪些工作: 
1. 变量、函数表达式 -- 变量声明 默认赋值为undefined
2. this -- 赋值
3. 函数声明 -- 赋值

这三种数据的准备情况我们称之为 "执行上下文" 或者 "执行上下文环境" javascript在执行一个代码段之前都会进行这些"准备工作"来生成执行上下文 这个"代码段"其实分三种情况 -- 全局代码函数体eval代码 

<br>

如果在函数中除了以上数据之外还会有其他数据 
```js
function fn(x) {
  console.log(arguments) // [10]
  console.log(x) // 10
}
fn(10)
```

以上代码展示了在函数体的语句执行之前arguments变量和函数的参数都已经被赋值 

从这里可以看出**函数每被调用一次都会产生一个新的执行上下文环境** 因为不同的调用可能就会有不同的参数 

另外一点不同在于**函数在定义的时候(不是调用的时候)就已经确定了函数体内部自由变量的作用域**

至于"自由变量"和"作用域"是后面要专门拿出来讲述的重点这里就先点到为止 用一个例子说明一下

```js
var a = 10
function fn() {
  console.log(a)
  // a是自由变量 函数创建的时候 就确定了a要取值的作用域
}


function bar(f) {
  var a = 20;
  f() // 打印的是10 而不是20
}
bar(fn)
```

<br>

### 结合作用域 上下文环境 我们看看下面的知识点: 
```js
var a = 10, b = 20              // 全局作用域

function fn(x) {
  var a = 100, c = 300;       // fn的作用域

  function bar(x) {
    var a = 1000, d = 3000  // bar的作用域
  }

  bar(100)
  bar(200)
}

fn(10)
```

我们在上文中已经介绍了除了全局作用域之外每个函数都会创建自己的作用域

**作用域在函数定义时就已经确定了, 而不是在函数调用时确定**

我们看看结合作用域 上下文环境是怎么样的

1. 在加载程序时已经确定了全局上下文环境并随着程序的执行而对变量就行赋值 
```js
var a = 10, b = 20
```

```
全局上下文环境
a       10
d       20
```

```js
function fn(x) {
  var a = 100, c = 300;       // fn的作用域



  function bar(x) {
    var a = 1000, d = 3000  // bar的作用域
  }


  bar(100)
  bar(200)
}

fn(10)
```

当我们程序执行到 fn(10) 调用的时候 此时生成fn函数的上下文环境压栈并将此上下文环境设置为活动状态 
```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }



    bar(100)
    bar(200)
}

fn(10)
```


当程序执行到bar(100)的时候 调用bar(100) 生成此次bar函数的上下文环境 压栈并设置为活动状态

```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域

            bar(100)上下文环境
            x       100
            a       1000
            d       3000
    }



    bar(100)
    bar(200)
}

fn(10)
```

当执行完bar(100)这行代码 bar(100)调用完成 **则bar(100)上下文环境被销毁** 

接着执行bar(200) 调用bar(200)则又生成bar(200)的上下文环境压栈设置为活动状态 

当执行完bar(200)这行代码 则bar(200)调用结束 其上下文环境被销毁 此时就会回到fn(10)上下文环境中 变为活动状态

``` 
bar(200)     ->  上下文环境
bar(100)     ->  上下文环境
fn(10)       ->  上下文环境

当bar(200) bar(100)都调用完毕后 其上下文环境销毁
只剩下fn(10)处于激活状态
```

当执行完fn(10)这行代码后 fn(10)执行完成之后 fn(10)上下文环境被销毁 全局上下文环境又回到了活动状态

连接起来看还是挺有意思的 作用域只是一个"地盘"一个抽象的概念其中没有变量 

要通过作用域对应的执行上下文环境来获取变量的值 同一个作用域下不同的调用会产生不同的执行上下文环境继而产生不同的变量的值.所以作用域中变量的值是在执行过程中产生的确定的而作用域却是在函数创建时就确定了 

所以如果要查找一个作用域下某个变量的值就需要找到这个作用域对应的执行上下文环境再在其中寻找变量的值 

<br><br>

# ArrayBuffer对象
ArrayBuffer 对象表示一段二进制数据用来模拟内存里面的数据 

可以通过 **视图(TypedArray, DataView)** 进行操作, 视图内部署了数组的接口 这意味着可以用数组的方法操作内存

也就是说它不能直接读写ArrayBuffer 只能通过视图才操作ArrayBuffer 视图的作用是以指定的格式解读二进制数据

它是以数组的语法处理二进制数据 所以统称为二进制数组

```s
| - ArrayBuffer对象
  # 它们是操作二进制数据的一个接口
  | - TypedArray视图
  | - DataView视图  
```

<br>

### 上述接口出现原因:
为了满足js与显卡之间大量的数据实时交换 它们之间的数据必须是二进制的 而不能是传统的文本格式

文本格式传递一个32位整数 两端的js脚本和显卡都要进行格式化的转化 将非常的耗时 所以我们需要一个能够直接操作字节 将4个字节的32位整数 以二进制形式原封不动地送入显卡

<br><br>

## TypedArray 和 DataView 视图 支持的数据类型: 
一共9种 (DataView视图支持除Uint8C以外的其他 8 种)

<br>

|数据类型|字节长度|含义|对应的 C 语言类型|
|:--|:--:|:--|:--|
|Int8|1|8 位带符号整数|signed char|
|Uint8|1|8 位不带符号整数|unsigned char|
|Uint8C|1|8 位不带符号整数(自动过滤溢出)|unsigned |char(DataView不支持)|
|Int16|2|16 位带符号整数|short|
|Uint16|2|16 位不带符号整数|unsigned short|
|Int32|4|32 位带符号整数|int|
|Uint32|4|32 位不带符号的整数|unsigned int|
|Float32|4|32 位浮点数|float|
|Float64|8|64 位浮点数|double|

<br>

### ArrayBuffer实例化:
### **<font color="#C2185">let buf = new ArrayBuffer(整数)</font>**
用来分配一段可以存放数据的连续内存区域(表示这段二进制数据占用多少字节) 用于在内存中存储二进制数据。

<br>

**默认值:**  
每一个字节的默认值是0

<br>

**参数:**  
整数 

```js
// 创建一个大小为 8 字节的 ArrayBuffer
let buf = new ArrayBuffer(8)

// 结果:  buf占用了8个字节
byteLength: 8
[[Prototype]]: ArrayBuffer
[[Int8Array]]: Int8Array(8)
[[Uint8Array]]: Uint8Array(8)
[[Int16Array]]: Int16Array(4)
[[Int32Array]]: Int32Array(2)
[[ArrayBufferByteLength]]: 8
[[ArrayBufferData]]: 2
```

<br>

### 输出结果详解:
这些属性是与 ArrayBuffer 相关的类型化数组的构造函数。

当创建一个 ArrayBuffer 对象时, 它会自动关联这些类型化数组的构造函数, 以便你可以使用这些构造函数创建对应的类型化数组对象, 方便对 ArrayBuffer 进行数据操作。

<br>

**具体来说:**   

- [[Int8Array]] 表示 Int8Array 构造函数, 用于创建一个使用 **单字节有符号整数** 存储的类型化数组对象。

- [[Uint8Array]] 表示 Uint8Array 构造函数, 用于创建一个使用 **单字节无符号整数** 存储的类型化数组对象。

- [[Int16Array]] 表示 Int16Array 构造函数, 用于创建一个使用 **双字节有符号整数** 存储的类型化数组对象。

- [[Int32Array]] 表示 Int32Array 构造函数, 用于创建一个使用 **四字节有符号整数** 存储的类型化数组对象。

<br>

这些类型化数组构造函数提供了一种方便的方式来操作 ArrayBuffer 中存储的二进制数据, 每个构造函数可以创建一个特定类型的视图, 使您可以按照特定的字节顺序和数据类型来读取和写入数据。

通过使用这些类型化数组的构造函数, 您可以创建适合您需求的视图类型, 以便更方便地处理 ArrayBuffer 中的数据

<br>

### 注意:
- ArrayBuffer 的长度在创建后是固定的, 无法调整大小。
- ArrayBuffer 只能存储二进制数据, 不能直接存储字符串或其他数据类型。

- 若要对 ArrayBuffer 进行具体的数据操作, 需要使用类型化数组视图(如 Uint8Array、Int16Array 等)。

- 使用视图时, 需确保视图的起始位置和长度不超过 ArrayBuffer 的范围, 否则可能会导致访问越界错误。

这是 ArrayBuffer 的基本使用示例和一些注意事项。通过视图操作, 您可以有效地读取和写入二进制数据。请根据实际需求选择适当的视图类型和偏移量来操作 ArrayBuffer。

<br>

### 示例:
```js
// 创建一个大小为 16 字节的 ArrayBuffer
const buffer = new ArrayBuffer(16);

// 创建一个 Uint8Array 类型的视图, 使用 buffer 的前 8 个字节
const view = new Uint8Array(buffer, 0, 8);

// 向视图中写入数据
view[0] = 255;
view[1] = 0;
view[2] = 127;

// 从视图中读取数据
console.log(view[0]);  // 输出: 255
console.log(view[1]);  // 输出: 0
console.log(view[2]);  // 输出: 127

console.log(buffer.byteLength);  // 输出: 16
```

<br>

### **<font color="#C2185">buf.byteLenth</font>**
表示当前实例占用的内存长度(字节)


### **<font color="#C2185">buf.slice(startIndex, endIndex)</font>**
用来**复制**一部分内存 拷贝生成一个新的ArrayBuffer对象 


**参数:**  
包括开始不包括结束 如果省略第二个参数 则表示一直复制到结束
```js
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);
```

<br>

### **<font color="#C2185">buf.isView()</font>**
ArrayBuffer有一个静态方法isView 返回一个布尔值表示参数是否为ArrayBuffer的视图实例

这个方法大致相当于判断参数是否为TypedArray实例或DataView实例 

```js
const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true
```

<br><br>

## 视图:
我们创建buf对象后 通过视图构造器**将buf转换为我们可以操作的数组** 接下来就是以数组的形式操作二进制buf

ArrayBuffer对象作为内存区域可以存放多种类型的数据 同一段内存不同数据有不同的解读方式这就叫做"视图"(view) 

<br>

### ArrayBuffer有两种视图
1. TypedArray视图 - 同类型数据
2. DataView视图   - 可以是不同类型数据

前者的数组成员都是同一个数据类型, 后者的数组成员可以是不同的数据类型 

<br>

目前TypedArray视图一共包括 9 种类型每一种视图都是一种构造函数 

<br>

|类型|描述|长度|
|:--|:--|:--|
|Int8Array|08 位有符号整数|长度 1 个字节|
|Uint8Array|08 位无符号整数|长度 1 个字节|
|Uint8ClampedArray|08 位无符号整数|长度 1 个字节溢出处理不同|
|Int16Array|16 位有符号整数|长度 2 个字节|
|Uint16Array|16 位无符号整数|长度 2 个字节|
|Int32Array|32 位有符号整数|长度 4 个字节|
|Uint32Array|32 位无符号整数|长度 4 个字节|
|Float32Array|32 位浮点数|长度 4 个字节|
|Float64Array|64 位浮点数|长度 8 个字节|

<br>

### 特点:
这 9 个构造函数生成的数组统称为TypedArray视图 

它们很像普通数组都有length属性都能用方括号运算符([])获取单个元素所有数组的方法在它们上面都能使用 

<br>

**与普通数组的区别:**  
1. TypedArray 数组的所有成员都是同一种类型 
2. TypedArray 数组的成员是连续的不会有空位 
3. TypedArray 数组成员的默认值为 0 比如new Array(10)返回一个普通数组里面没有任何成员只是 10 个空位;new Uint8Array(10)返回一个 TypedArray 数组里面 10 个成员都是 0 

4. TypedArray **数组只是一层视图本身不储存数据** 它的数据都储存在底层的ArrayBuffer对象之中要获取底层对象必须使用buffer属性 

<br>

### DataView视图: 
### **<font color="#C2185">new DataView(buf)</font>**
DataView视图用来操作ArrayBuffer对象 当创建好ArrayBuffer对象之后 需要为该buf对选哪个指定视图
```js
const buf = new ArrayBuffer(32)
const dataView = new DataView(buf)

// 以不带符号的8位整数格式 从头读取8位二进制数据 得到0
dataView.getUint8(0)    // 0
```

<br>

### TypedArray视图: 
该视图与DataView视图的区别 TypedArray不是一个构造函数 而是一组构造函数 代表不同的数据格式
```js
const buf = new ArrayBuffer(32)

const x1 = new Int32Array(buffer);
x1[0] = 1;


const x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2
```

上面代码对同一段内存分别建立两种视图: 
- 32 位带符号整数(Int32Array构造函数)
- 8 位不带符号整数(Uint8Array构造函数)

由于两个视图对应的是同一段内存一个视图修改底层内存会影响到另一个视图 

TypedArray视图的构造函数除了接受ArrayBuffer实例作为参数还可以接受普通数组作为参数直接分配内存生成底层的ArrayBuffer实例并同时完成对这段内存的赋值 

```js
const typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]
```

上面代码使用TypedArray视图的Uint8Array构造函数新建一个不带符号的 8 位整数视图.可以看到Uint8Array直接使用普通数组作为参数对底层内存的赋值同时完成 

<br>

### 二进制数组的应用: 
大量的 Web API 用到了ArrayBuffer对象和它的视图对象 

<br>

### 1. AJAX: 
传统上服务器通过 AJAX 操作只能返回文本数据即responseType属性默认为text 
XMLHttpRequest第二版XHR2允许服务器返回二进制数据这时分成两种情况 

1. 如果明确知道返回的二进制数据类型可以把返回类型(responseType)设为arraybuffer;
2. 如果不知道就设为blob 

```js
let xhr = new XMLHttpRequest();
xhr.open('GET', someUrl);
xhr.responseType = 'arraybuffer';

xhr.onload = function () {
  let arrayBuffer = xhr.response;
  // ···
};

xhr.send();
```

<br>

如果知道传回来的是 32 位整数可以像下面这样处理 
```js
xhr.onreadystatechange = function () {
  if (req.readyState === 4 ) {
    const arrayResponse = xhr.response;
    const dataView = new DataView(arrayResponse);
    const ints = new Uint32Array(dataView.byteLength / 4);

    xhrDiv.style.backgroundColor = "#00FF00";
    xhrDiv.innerText = "Array is " + ints.length + "uints long";
  }
}
```

<br>

### 2. File API: 
如果知道一个文件的二进制数据类型也可以将这个文件读取为ArrayBuffer对象 
```js
// 获取节点 并获取文件 
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

// 使用reader读成2进制数据
const reader = new FileReader();
reader.readAsArrayBuffer(file);

// 不光能从e.target上获取 也可以直接从this.result reader.result上获取
reader.onload = function () {
  const arrayBuffer = reader.result;
  // ···
};
```

<br>

下面以处理 bmp 文件为例 假定file变量是一个指向 bmp 文件的文件对象首先读取文件 
```js
const reader = new FileReader();
reader.addEventListener("load", processimage, false);
reader.readAsArrayBuffer(file);
```

<br>

**然后定义处理图像的回调函数:**   
1. 先在二进制数据之上建立一个DataView视图
2. 再建立一个bitmap对象用于存放处理后的数据最后将图像展示在Canvas元素之中 
```js
function processimage(e) {
  const buffer = e.target.result;
  const datav = new DataView(buffer);
  const bitmap = {};
  // 具体的处理步骤
}
```

<br>

### 待整理:
太多了 没看完 我觉得自己用不到呢
```s
https://www.wangdoc.com/es6/arraybuffer.html
```

<br><br>

# Blob对象
Blob **对象表示一个二进制文件的数据内容**   

比如一个图片文件的内容就可以通过 Blob 对象读写 它通常用来读写文件它的名字是 Binary Large Object (二进制大型对象)的缩写 

<br>

### Blob对象 与 ArrayBuffer 的区别在于:
- Blob对象 用于操作二进制文件
- ArrayBuffer **用于操作内存** 

<br>

### Blob对象的实例化: 
### **<font color="#C2185">new Blob(array [, options])</font>**

**参数1: 数组**
成员是 **字符串** 或 **二进制对象** 表示新生成的Blob实例对象的内容

<br>

**参数2: 配置对象**
```js
{
  type: 类型字符串 表示数据的 MIME 类型默认是空字符串,
  endings: 可选值如下
    - transparent: 代表会保持 blob 中保存的结束符不变 
    - native: 结束符会被更改为适合宿主操作系统文件系统的换行符
}
```
    
```js
// 字符串数组
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
// Blob {size: 43, type: 'text/html'}
```

```js
// 对象的话 我们要先序列化 然后装到数组里面作为参数
var obj = { hello: 'world' };
var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
```

<br>

### **<font color="#C2185">实例对象.size</font>**
### **<font color="#C2185">实例对象.type</font>**
分别返回 数据的大小 和 类型 
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});

myBlob.size // 32
myBlob.type // "text/html"
```

<br>

### **<font color="#C2185">实例对象.slice(start, end, contentType)</font>**
用来拷贝原来的数据 **返回的也是一个Blob实例** 

<br>

**参数:**   
三个参数都是可选的, contentType为新实例的数据类型(默认为空字符串) 

<br>

### 示例: 获取文件信息: 
文件选择器``<input type="file">``用来让用户选取文件

出于安全考虑浏览器不允许脚本自行设置这个控件的value属性即文件必须是用户手动选取的不能是脚本指定的 一旦用户选好了文件脚本就可以读取这个文件 

文件选择器返回一个 FileList 对象该对象是一个类似数组的成员每个成员都是一个 File 实例对象 (inp.files)

**File实例对象是一个特殊的 Blob**, 实例增加了name和lastModifiedDate属性 
```js
// HTML 代码如下
<input 
  type="file" 
  accept="image/*" 
  multiple 
  onchange="fileinfo(this.files)"
/>

function fileinfo(files) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(
      f.name, // 文件名不含路径
      f.size, // 文件大小Blob 实例属性
      f.type, // 文件类型Blob 实例属性
      f.lastModifiedDate // 文件的最后修改时间
    );
  }
}
```

<br>

### 示例: 下载文件
AJAX 请求时如果指定 responseType属性为blob下载下来的就是一个 Blob 对象

然后我们可以通过 ``URL.createObjectURL`` 方法将blob对象转成一个url对象 给有src href属性的 

```js
function download(url) {
  const xhr = new XMLHttpRequest()
  xhr.open("get", url)

  // 返回值的类型设置为 blob 类型
  xhr.responseType = "blob"
  xhr.send()
  xhr.onload = function() {
    const fileBlob = xhr.response

    // 将 blob 转换为 url对象
    let imgUrl = URL.createObjectURL(fileBlob)

    let a = document.createElement("a")
    a.href = imgUrl
    a.download = "testImg"
    a.innerHTML = "hello"
    document.querySelector("body").appendChild(a)
  }
}
let url = "https://img1.baidu.com/it/u=2648389307,756086504&fm=26&fmt=auto"
download(url)
```

```js
function getBlob(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    callback(xhr.response);
  }
  xhr.send(null);
}

// 上面代码中xhr.response拿到的就是一个 Blob 对象 
```

<br><br>

## 扩展: URL.createObjectURL()
URL.createObjectURL 是一个 JavaScript API, 它的作用是创建一个包含指定对象的 URL。

这个 URL 可以用于访问或引用该对象, 通常用于在浏览器中展示或处理一些特定的资源, 比如图片、音频、视频等。

<br>

### 主要用途包括: 
**显示图片:**   
您可以将图片对象(比如 ``<img>`` 标签的 src 属性)设置为使用 createObjectURL 创建的 URL, 这样浏览器就可以直接加载和显示该图片。

<br>

**播放音频和视频:**   
将音频或视频对象(比如 ``<audio>` `或 ``<video>`` 标签的 src 属性)设置为使用 createObjectURL 创建的 URL, 可以在浏览器中播放该音频或视频。

<br>

**下载文件:**  
可以通过创建包含文件对象的 URL, 使用户能够单击链接或按钮来下载该文件。

<br>

**WebRTC 数据通信:**   
在 WebRTC 中, 可以将本地的媒体流(比如音视频流)转换为 URL, 以便进行实时通信。

<br>

使用 createObjectURL 时, **通常需要传入一个对象作为参数**, 该对象可以是 
- File
- Blob
- MediaSource

**它会为该对象生成一个唯一的 URL**, 可以直接在浏览器中使用, 而无需服务器的参与。

<br>

### 注意:
生成的这个 URL 是临时的, 只在当前页面的生命周期内有效, 当页面关闭或导航离开时, URL 将自动释放。

```js
// 创建一个图片对象
const imageBlob = new Blob([imageData], { type: 'image/jpeg' });

// 创建包含图片对象的 URL
const imageUrl = URL.createObjectURL(imageBlob);

// 将图片 URL 设置为 <img> 标签的 src 属性, 显示图片
const imgElement = document.createElement('img');
imgElement.src = imageUrl;
document.body.appendChild(imgElement);
```

<br>

浏览器允许使用 URL.createObjectURL() 方法针对 **Blob** 对象生成一个临时 URL以便于某些 API 使用

这个 URL 以blob://开头表明对应一个 Blob 对象协议头后面是一个识别符用来唯一对应内存里面的 Blob 对象 

<br>

**参数:**  
Blob || MediaSource || File

```js
var droptarget = document.getElementById('droptarget');

droptarget.ondrop = function (e) {
  var files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var type = files[i].type;
    if (type.substring(0,6) !== 'image/')
      continue;

    var img = document.createElement('img');

    // 将文件对象转成url 方便其他地方使用
    img.src = URL.createObjectURL(files[i]);

    img.onload = function () {
      this.width = 100;
      document.body.appendChild(this);
      URL.revokeObjectURL(this.src);
    }
  }
}
```

上面代码通过为拖放的图片文件生成一个 URL产生它们的缩略图从而使得用户可以预览选择的文件 

浏览器处理 Blob URL 就跟普通的 URL 一样如果 Blob 对象不存在返回404状态码 如果跨域请求返回403状态码

Blob URL 只对 GET 请求有效如果请求成功返回200状态码 由于 Blob URL 就是普通 URL因此可以下载 


<br>

### 读取文件: 
取得 Blob 对象以后可以通过FileReader对象读取 Blob 对象的内容即文件内容 

<br><br>

# FileReader

### FileReader实例化: 
```js
let reader = new FileReader()
```

<br><br>

## FileReader实例方法:
FileReader的实例对象提供四个方法 **处理 Blob 对象**, Blob对象作为参数传入这些方法然后以指定的格式返回 

如下的4个方法需要传入 Blob对象 或者 它的子类 File对象

<br>

### **<font color="#C2185">reader.readAsText(Blob对象, [字符编码])</font>**
将 Blob 对象中的文本内容 **读取为字符串**, 默认为 UTF-8 

```js
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function () {
    const text = reader.result;
    // 在此处使用读取到的文本内容
    console.log(text);
  });

  reader.readAsText(file, 'UTF-8');
});

```

<br>

### **<font color="#C2185">reader.readAsArrayBuffer(Blob对象)</font>**
将 Blob 对象中的二进制数据读取为 ArrayBuffer 对象

```js
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function () {
    const arrayBuffer = reader.result;
    // 在此处使用读取到的 ArrayBuffer 对象
    console.log(arrayBuffer);
  });

  reader.readAsArrayBuffer(file);
});
```

<br>

### **<font color="#C2185">reader.readAsDataURL(Blob对象)</font>**
用于读取指定的 Blob 对象, 并将其内容转换为 base64 编码的数据 URL。

会将 Blob 对象的内容读取为 base64 编码的字符串, 并以 **data:[mime-type];base64,[base64-data]** 的形式返回一个数据 URL。
```s
mime-type: Blob 对象的 MIME 类型
base64-data: Blob 对象内容的 base64 编码字符串
```

<br>

**使用场景:**  
这个方法常用于将文件内容转换为数据 URL, 以便在页面上显示或处理文件内容。例如, 您可以将读取到的数据 URL 赋值给 ``<img>`` 标签的 src 属性, 或者**用作文件的预览或上传等操作**。

这个方法将会异步地读取文件内容, 一旦读取完成, 它会触发一个 load 事件, 您可以通过监听该事件来获取读取到的数据

```js
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function () {
    const dataURL = reader.result;
    // 在此处使用读取到的数据 URL
    console.log(dataURL);
  });

  reader.readAsDataURL(file);
});

```

<br>

### **<font color="#C2185">reader.readAsBinaryString(Blob对象)</font>**
将 Blob 对象中的二进制数据读取为二进制字符串

```js
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function () {
    const binaryString = reader.result;
    // 在此处使用读取到的二进制字符串
    console.log(binaryString);
  });

  reader.readAsBinaryString(file);
});
```

<br><br>

## FileReader实例属性:

### **<font color="#C2185">reader.error</font>**
读取文件时产生的错误对象

<br>

### **<font color="#C2185">reader.readyState</font>**
整数表示读取文件时的当前状态.一共有三种可能的状态
- 0: 表示尚未加载任何数据
- 1: 表示数据正在加载
- 2: 表示加载完成 

终止读取操作readyState属性将变成2 

<br>

### **<font color="#C2185">reader.result</font>**
**读取完成后的文件内容** 有可能是字符串也可能是一个 ArrayBuffer 实例 

<br><br>

## FileReader实例事件:
### **<font color="#C2185">reader.onabort</font>**
abort事件(用户终止读取操作)的监听函数 

<br>

### **<font color="#C2185">reader.onerror</font>**
error事件(读取错误)的监听函数 

<br>

### **<font color="#C2185">reader.onload</font>**
load事件(读取操作完成)的监听函数通常在这个函数里面**使用result属性拿到文件内容** 

<br>

### **<font color="#C2185">reader.onloadstart</font>**
loadstart事件(读取操作开始)的监听函数 

<br>

### **<font color="#C2185">reader.onloadend</font>**
loadend事件(读取操作结束)的监听函数 


### **<font color="#C2185">reader.onprogress</font>**
progress事件(读取操作进行中)的监听函数 

<br><br>

### 例子: 
FileReader.readAsText()方法的例子用来读取文本文件 

```js
// HTML 代码如下
<input type="file" onchange="readfile(this.files[0])"></input>
<pre id="output"></pre>

function readfile(f) {
  var reader = new FileReader();
  reader.readAsText(f);

  reader.onload = function () {
    var text = reader.result;

    var out = document.getElementById('output');
    out.innerHTML = '';
    out.appendChild(document.createTextNode(text));

  }
  reader.onerror = function(e) {
    console.log('Error', e);
  };
}
```

上面代码中通过指定 FileReader 实例对象的onload监听函数在实例的result属性上拿到文件内容 

<br>

### 例子: 
FileReader.readAsArrayBuffer()方法的例子用于读取二进制文件 

```js
// HTML 代码如下
<input type="file" onchange="typefile(this.files[0])"></input>


function typefile(file) {
  // 文件开头的四个字节生成一个 Blob 对象
  var slice = file.slice(0, 4);
  var reader = new FileReader();

  // 读取这四个字节
  reader.readAsArrayBuffer(slice);

  reader.onload = function (e) {
    var buffer = reader.result;

    // 将这四个字节的内容视作一个32位整数
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);

    // 根据文件的前四个字节判断它的类型
    switch(magic) {
      case 0x89504E47: file.verified_type = 'image/png'; break;
      case 0x47494638: file.verified_type = 'image/gif'; break;
      case 0x25504446: file.verified_type = 'application/pdf'; break;
      case 0x504b0304: file.verified_type = 'application/zip'; break;
    }

    console.log(file.name, file.verified_type);
  };
}
```

读取的结构要在 onload的回调里面 通过this / reader / e.target 上的result属性身上获取

<br><br>

# URL
网页的 URL 只能包含合法的字符, 合法字符分成两类 
- URL 元字符
- 语义字符

<br>

### URL 元字符: 
- 分号(;)
- 逗号(,)
- 斜杠(/)
- 问号(?)
- 冒号(:)
- at(@)
- &
- 等号(=)
- 加号(+)
- 美元符号($)
- 井号(#)

<br>

### 语义字符: 
- a-zA-Z0-9
- 连词号(-)
- 下划线(_)
- 点(.)
- 感叹号(!)
- 波浪线(~)
- 星号(*)
- 单引号(')
- 圆括号(())

<br>

除了以上字符其他字符出现在 URL 之中, **其余的都必须转义**  (除了英文数字呗)

规则是根据操作系统的默认编码将每个字节 转为 **百分号(%)加上两个大写的十六进制字母** 

<br>

### JavaScript 提供四个 URL 的编码/解码方法 
比如 UTF-8 的操作系统上 ``http://www.example.com/q=春节`` 这个 URL 之中汉字 "春节" 不是 URL 的合法字符所以被浏览器自动转成

``http://www.example.com/q=%E6%98%A5%E8%8A%82`` 其中
- "春" -> %E6%98%A5
- "节" -> %E8%8A%82

这是因为"春"和"节"的 UTF-8 编码分别是E6 98 A5 和 E8 8A 82将每个字节前面加上百分号就构成了 URL 编码 

<br><br>

### 编码: 
### **<font color="#C2185">encodeURI("url字符串")</font>**
用于转码整个 URL 

它的参数是一个字符串代表整个 URL 它会将元字符和语义字符之外的字符都进行转义 

<br>

**返回值:**  
编码后的字符串

```js
encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"

let url = "www.baidu.com?name=杉"
let res = encodeURI(url)
console.log(res);
```

<br>

### **<font color="#C2185">encodeURIComponent("春节")</font>**
该方法适用于转码url上的某一个部分

<br>

### 解码: 
### **<font color="#C2185">decodeURI()</font>**
用于整个 URL 的解码

它是encodeURI()方法的逆运算 它接受一个参数就是转码后的 URL 

```js
decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
// "http://www.example.com/q=春节"


let url2 =`www.baidu.com?name=${encodeURIComponent("杉")}`
console.log(url2);
// www.baidu.com?name=%E6%9D%89
```

<br>

### **<font color="#C2185">decodeURIComponent('%E6%98%A5%E8%8A%82')</font>**
解码一个片段

<br><br>

# url构造函数
用来构造、解析 和 编码 URL 一般情况下通过window.URL可以拿到这个构造函数 **用于解析url相关的信息**

<br>

### **<font color="#C2185">new URL()</font>**
new URL()作为构造函数可以生成 URL 实例 

<br>

**参数:**  
它接受一个表示 URL 的字符串作为参数 如果参数不是合法的 URL会报错 

```js
var url = new URL('http://www.example.com/index.html');
url.href
// "http://www.example.com/index.html"
```

<br>

如果 URL 字符串是一个相对路径, 那么需要表示绝对路径的第二个参数作为计算基准 
```js
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"
```

<br>

### 实例属性: 
**url.href:**  
返回整个 URL
```js
let str = "http://www.baidu.com:80/?name=杉&age=16"

let url = new URL(str)
console.log(url.href);
// http://www.baidu.com/?name=%E6%9D%89&age=16
```

<br>

**url.protocol:**  
返回协议以冒号:结尾
``` 
http:
```

<br>

**url.hostname:**  
返回域名
``` 
www.baidu.com
```

<br>

**url.host:**   
返回域名与端口包含:号默认的80和443端口会省略
``` 
www.baidu.com
```

<br>

**url.port:**   
返回端口

<br>

**url.origin:**   
返回协议、域名和端口(没返回端口啊)
``` 
http://www.baidu.com
```

<br>

**url.pathname:**  
返回路径以斜杠/开头, 返回uri部分访问资源的部分, 不包含?参数
``` 
/login
```

**url.search:**   
返回查询字符串以问号?开头
``` 
?name=%E6%9D%89&age=16
```

<br>

**url.searchParams:**  
返回一个URLSearchParams实例该属性是Location对象没有的

该对象的相关方法在下面详细的给出
```js
let queryObj = url.searchParams
```

- URL.hash: 返回片段识别符以井号#开头
- URL.password: 返回域名前面的密码
- URL.username: 返回域名前面的用户名

<br>

### 静态方法: 
### **<font color="#C2185">URL.createObjectURL()</font>**
用来为上传/下载的文件、流媒体文件生成一个 URL 字符串

这个字符串代表了 File对象 或 Blob对象 的 URL 

该方法会创建一个 DOMString 它是一个Blob类型的URL对象, 相当于把传入的文件放入内存URL中

<br>

**URL对象的生命周期:**  
- 它会在 document 触发了 unload 事件 或者 
- 执行 revokeObjectURL() 方法后 被释放

```html
<div id="display"/>
<input
  type="file"
  id="fileElem"
  multiple
  accept="image/*"
  onchange="handleFiles(this.files)"
/>
```
```js
var div = document.getElementById('display');
let inp = document.querySelector("#inp")
inp.addEventListener("change", handleFile)

function handleFile(e) {
  let file = e.target.files[0]

  let img = document.createElement("img")

  let imgSrc = window.URL.createObjectURL(file)

  img.src = imgSrc
  document.querySelector("#wrap").appendChild(img)
}
```

URL.createObjectURL()方法用来为上传的文件生成一个 URL 字符串作为``<img>``元素的图片来源 

<br>

**注意:**  
每次使用URL.createObjectURL()方法都会在内存里面生成一个 URL 实例

如果不再需要该方法生成的 URL 字符串为了节省内存可以使用 URL.revokeObjectURL()方法释放这个实例 

<br>

### **<font color="#C2185">URL.revokeObjectURL()</font>**
用来释放URL.createObjectURL()方法生成的 URL 实例 它的参数就是URL.createObjectURL()方法返回的 URL 字符串

一旦图片加载成功以后为本地文件生成的 URL 字符串就没用了于是可以在img.onload回调函数里面通过URL.revokeObjectURL()方法卸载这个 URL 实例 

```js
// 当图片加载完成后 我们释放这个url对象
var div = document.getElementById('display');

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var img = document.createElement('img');

    img.src = window.URL.createObjectURL(files[i]);

    div.appendChild(img);
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    }
  }
}
```

<br>

### **<font color="#C2185">new URLSearchParams(search参数)</font>**
为了要处理?参数部分 我们即可以通过 URL的实例对象

也可以通过 url.searchParams 属性获取

<br>

是浏览器的原生对象用来构造、解析和处理 URL 的查询字符串(即 URL 问号后面的部分) 

它本身也是一个构造函数可以生成实例.参数可以为查询字符串起首的问号?有没有都行也可以是对应查询字符串的数组或对象 

<br>

### 方法一: 传入字符串: 
```js
var params = new URLSearchParams('?foo=1&bar=2');
// 等同于
var params = new URLSearchParams(document.location.search);
```

<br>

### 方法二: 传入数组: 
```js
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
```

<br>
  
### 方法三: 传入对象: 
```js
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

<br>

**URLSearchParams会对查询字符串自动编码** 
```js
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```

<br>

### **<font color="#C2185">实例对象.toString()</font>**
toString方法返回实例的字符串形式 **返回得是去掉? 的字符串形式**  

并且还会对文字进行自动编码哦

该方法通过实例对象来调用

```js
var url = new URL('https://example.com?foo=1&bar=2');
var params = new URLSearchParams(url.search);
params.toString() // "foo=1&bar=2'
```
  
<br>

### **<font color="#C2185">实例对象.append()</font>**
用来追加一个查询参数.它接受两个参数第一个为键名第二个为键值没有返回值 
```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.append('baz', 3);
params.toString() // "foo=1&bar=2&baz=3"
```

<br>

### **<font color="#C2185">实例对象.delete()</font>**
用来删除指定的查询参数.它接受键名作为参数
```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.delete('bar');
params.toString() // "foo=1"
```

<br>

### **<font color="#C2185">实例对象.has()</font>**
返回一个布尔值表示查询字符串是否包含指定的键名 
```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.has('bar') // true
params.has('baz') // false
```

<br>

### **<font color="#C2185">实例对象.set()</font>**
set()方法用来设置查询字符串的键值
```js
var params = new URLSearchParams('?foo=1');
params.set('foo', 2);
params.toString() // "foo=2"
```

<br>

### **<font color="#C2185">实例对象.get()</font>**
用来读取查询字符串里面的指定键.它接受键名作为参数 
```js
var params = new URLSearchParams('?foo=1');
params.get('foo') // "1"
```

<br>

### **<font color="#C2185">实例对象.getAll(指定属性名)</font>**
会将获取的内容放到一个数组中返回

<br>

### **<font color="#C2185">URLSearchParams.sort()</font>**
对查询字符串里面的键进行排序规则是按照 Unicode 码点从小到大排列 

<br><br>

# File 对象
File 对象代表一个文件用来读写文件信息 它继承了 Blob 对象或者说是一种特殊的 Blob 对象所有可以使用 Blob 对象的场合都可以使用它 

<br>

最常见的使用场合是表单的文件上传控件(``<input type="file">``)用户选中文件以后浏览器就会生成一个数组里面是每一个用户选中的文件它们都是 File 实例对象 

```s
https://www.wangdoc.com/javascript/bom/file.html
```

<br><br>

### input type="file" 所支持的属性: 
**<font color="#C2185">required</font>**  

<br>

**<font color="#C2185">accept</font>**  

accept 属性的值是一个包含一个或多个(用逗号分隔)这种唯一文件类型说明符的字符串。 
```html
<input type="file" accept="image/*,.pdf">

<!-- 
  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
 -->
```

一个不带扩展名的 MIME 类型字符串。
- 字符串 audio/*,  表示 "任何音频文件"。
- 字符串 video/*, 表示 "任何视频文件"。
- 字符串 image/*, 表示 "任何图片文件"。

<br>

**<font color="#C2185">capture</font>**  
捕获图像或视频数据的源  
如果 accept (en-US) 属性指出了 input 是图片或者视频类型, 则它指定了使用哪个摄像头去获取这些数据

<br>

**<font color="#C2185">files</font>**  
FileList 对象每个已选择的文件。如果 multiple 属性没有指定, 则这个列表只有一个成员。

<br>

**<font color="#C2185">multiple</font>**  
布尔值, 如果出现, 则表示用户可以选择多个文件

<br>

### ``<input type="file">`` 所支持的事件: 
- change
- input

<br>

### 获取已选择文件的信息: 
被选择的文件以 HTMLInputElement.files 属性返回, 它是一个包含一列 File 对象的 FileList 对象。

FileList 的行为像一个数组, 所以你可以检查 length 属性来获得已选择文件的数量。

<br>

**每个 File 包含下列信息:**  
- name: 文件名
- lastModified: 一个数字, 指定文件最后一次修改的日期和时间, 以 UNIX 新纪元(1970 年 1 月 1 日午夜)以来的毫秒数表示。
- size: 以字节数为单位的文件大小。
- type: 文件的 MIME 类型。

<br><br>

# js获取输入光标的位置
参考资料
```s
https://cloud.tencent.com/developer/article/1753347?from=15425
```

<br>

### **<font color="#C2185">``<p contenteditable="true">``</font>**
我们给一个标签添加上 **contenteditable 属性** 则该标签的 **内部元素** 则变为可编辑状态

可以将一些非文本元素(如div、span等)变为可编辑的区域,使用户能够直接在页面上进行编辑操作,而不需要跳转到其他编辑界面或使用其他编辑工具。这在一些需要用户输入或编辑文本内容的场景中非常有用,如留言板、评论区等。

<br>

### 如何获取光标的位置: 
### **<font color="#C2185">window.getSelection()</font>**
selection对象是用户在页面上选择的范围的对象
```js
let selection = window.getSelection();
```

<br>

### **<font color="#C2185">selection.getRangeAt(0)</font>**
selection对象里面包含0个或多个range对象 通过range对象的属性和方法就可以获取到鼠标光标所在的位置 和 鼠标光标处插入dom节点
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0);
```

<br>

### **<font color="#C2185">range.endContainer 光标所在的节点</font>**
### **<font color="#C2185">range.endOffset 光标所在节点的偏移量</font>**
- 使用range对象的endContainer属性获取光标所在的dom对象
- 使用range对象的endOffset获取光标所在dom对象的偏移量

<br>

### 创建要插入的dom节点: 
```js
let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"
```

<br>

### 在光标处插入dom元素: 
### **<font color="#C2185">range.insertNode(node)</font>**
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0)

let endDom = range.endContainer
let offset = range.endOffset

let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"

range.insertNode(node)
```

<br><br>

# onsubmit事件
我们一般会阻止表单的自动提交 阻止表单提交事件的步骤
1. 给表单绑定submit事件
2. 在事件内部调用 e.preventDefault();
3. 按钮使用 ``<input type="submit">`` button类型必须指定为 submit 要不不会触发表单的提交

```js
let submit = document.querySelector("#sub")
form.onsubmit = function(e) {

  return false
  // e.preventDefault();
}
```

<br><br>

# 视频全屏相关
全屏api可以控制浏览器的全屏显示 让一个element节点以及它的子节点占满用户的整个屏幕

现在各大浏览器都支持这个api **但是使用的时候需要加上浏览器前缀**

也就是说我们如果使用原生的方法 可能会稍微有些麻烦 当然也有一个js库供我们使用 比如
```s
screenfull.js
```

<br>

### 全屏的方法:
### **<font color="#C2185">指定元素.requestFullscreen()</font>**
这个方法可以使整个节点全屏状态 但是该方法必须用户手动触发才能生效
```js 
const btn = document.querySelector("button")
const div = document.querySelector("div")
btn.addEventListener("click", () => {
  if(div.requestFullscreen) {
    div.requestFullscreen()
  }
})


// 不同浏览器厂商可能对该 API 使用不同的前缀
btn.addEventListener("click", () => {
  const element = document.getElementById("div"); // 替换为实际的元素ID或引用
  if (element.requestFullscreen) {
    element.requestFullscreen();
  // Firefox
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  // Chrome, Safari, Opera
  } else if (element.webkitRequestFullscreen) { 
    element.webkitRequestFullscreen();
  // IE/Edge
  } else if (element.msRequestFullscreen) { 
    element.msRequestFullscreen();
  }
});

```

<br>

### 注意:
放大一个节点时 firefox 和 chrome 在行为上略有不同

<br>

**firebox:**  
自动为该节点增加一条css规则 将该元素放大至全屏状态 width 100% height 100%

<br>

**chrome:**  
将该节点 放在屏幕的中央 保持原来的大小 其它的部分变黑 

<br>

### 解决方式:
为了让chrome的行为与firebox保持一致 可以自定义一条css规则
```css
:-webkit-full-screen #myvideo {
  width: 100%;
  height: 100%;
}
```

<br>

### **<font color="#C2185">document.exitFullscreen()</font>**
用于取消全屏 该方法也带有浏览器前缀
```js 
document.exitFullscreen()
document.msExitFullscreen()
document.mozCancelFullScreen()
document.webkitExitFullscreen()
```

<br>

### 如何判断节点是否为全屏: 
### **<font color="#C2185">方式1: document.fullscreenElement</font>**
该属性返回正处于全屏状态的el节点 如果当前没有节点处于全屏状态 则返回null
```js 
document.fullscreenElement
document.mozFullScreenElement
document.webkitFullscreenElement
```

<br>

### **<font color="#C2185">方式2: document.fullScreen</font>**
这个变量会返回 true / false
```js
const isFullScreen = 
  document.fullScreen ||
  document.mozFullScreen ||
  document.webkitIsFullScreen ||
  document.msFullscreenElement
```

<br>

### **<font color="#C2185">document.fullscreenEnabled</font>**
该属性返回一个布尔值 表示当前文档是否可以切换到全屏状态
判断当前浏览器是否可以全屏可以用它

<br>

### 全屏事件: 
### **<font color="#C2185">fullscreenchange事件</font>**
浏览器进入或离开全屏的时候触发

<br>

### **<font color="#C2185">fullscreenerror事件</font>**
浏览器无法进入全屏时触发 可能是技术或者是用户拒绝

```js  
document.addEventListener("fullscreenchange", () => {
  if(document.fullscreenElement) {
    console.log("进入全屏")
  } else {
    console.log("退出全屏")
  }
})
```

上面的代码发生fullscreenchange时 通过fullscreenElement属性判断到底是进入全屏还是退出全屏

<br>

### 全屏状态的css: 
全屏状态下 大多数的浏览器css支持 
```css
:full-screen伪类 
```

只有ie11支持 :fullscreen伪类 使用这个伪类 可以对全屏状态设置单独的css属性
```css
:-webkit-full-screen
:-moz-full-screen
:-ms-fullscreen
:full-screen
:fullscreen

:-webkit-full-screen video {
  width: 100%;
  height: 100%;
}
```

<br><br>

# 制作favicon图标: bitbug
正方形图片 图片尺寸不要过大
```s
https://www.bitbug.net/
```

<br><br>

# postMessage
postMessage是html5引入的API, postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信

- 可以实现跨文本文档
- 多窗口
- 跨域消息传递
- 多用于窗口间数据通信

这也使它成为跨域通信的一种有效的解决方案 

<br>

### 发送数据: 
### **<font color="#C2185">otherWindow.postMessage(message, targetOrigin, [transfer])</font>**

**otherWindow:**  
向该窗口发送数据 otherWindow是窗口的一个引用, 比如
- iframe的contentWindow属性,
- 执行window.open返回的窗口对象,
- 或者是命名过的或数值索引的window.frames 

<br>

**message:**  
数据

<br>

**targetOrigin:**  
通过窗口的origin属性来指定哪些窗口能接收到消息事件 指定后只有对应origin下的窗口才可以接收到消息,

设置为通配符"*"表示可以发送到任何窗口 如果想要发送到与当前窗口同源的窗口,可设置为"/"

<br>

**transfer:**  
是一串和message同时传递的**Transferable**对象,这些对象的所有权将被转移给消息的接收方,而发送一方将不再保有所有权 

```s
参考: js_web_service_worker.md 
```

<br>

### 接收数据: 
接收方 给 window 绑定 "message" 事件 事件的回调中的 event 身上有我们想要得数据
```js
window.addEventListener("message", fn, false) ;

function fn(event) {
  var origin= event.origin;
  console.log(event);
}
```

<br>

### **<font color="#C2185">event.data</font>**
指的是从其他窗口发送过来的消息对象

<br>

### **<font color="#C2185">event.type</font>**
指的是发送消息的类型;

<br>

### **<font color="#C2185">event.source</font>**
指的是发送消息的窗口对象;

<br>

### **<font color="#C2185">origin</font>**
指的是发送消息的窗口的源

<br>

### 应用场景: 
我们都知道JSONP可以实现解决GET请求的跨域问题, 但是不能解决POST请求的跨域问题 而postMessage都可以

<br>

**要点:** 
1. document.getElementById("otherPage").contentWindow  
获取iframe的窗口对象

2. 父窗体创建跨域iframe并发送信息
```html 
<script type="text/JavaScript">    
function sendPost() { 
             
  // 获取id为otherPage的iframe窗口对象     
  var iframeWin = document.getElementById("otherPage").contentWindow;     

  // 向该窗口发送消息     
  iframeWin.postMessage(document.getElementById("message").value, 'http://moweide.gitcafe.io');
}   

// 监听跨域请求的返回   
window.addEventListener("message", function(event) {
  console.log(event, event.data);
}, false);
</script>
```

<br><br>

# formData对象
用户点击 "提交" 按钮 每一个表单项控件都会生成一个键值对, 所有的键值对都会提交到服务器

- 键名是控件的 name属性
- 键值是控件的 value属性
 
但是提交的数据格式跟``<form>``元素的method属性有关

<br>

### 作用:
我们自己写原生的http报文太费劲了 使用它就可以帮我们生成http并封装到里面
```s
POST /upload/single HTTP/1.1
Host: test.com:9527
# POST请求一定要携带该请求头, 它表示我们请求体中是什么格式, 上传文件一般为 multipart/form-data; boundary=aaa为分隔符
Content-Type: multipart/form-data; boundary=aaa

# 请求体的书写格式为 -- + 分隔符 作为一个字段的开始, 当都结束后以 -- + 分隔符 + -- 的格式作为结束
--aaa
第一个字段 账号
--aaa
第二个字段 密码
--aaa
第三个字段 通信地址
--aaa-- # 请求体结束
```

它的作用其实就是生成上面的东西, FormData会自动将Content-Type修改为multipart/form-data; 并且自动携带一个boundary

我们可以像formdata里面使用 append 方法添加字段 每一个字段就是 --aaa

<br>

### method属性
指定了提交数据的 HTTP 方法 

<br>

**如果是 GET 方法:**  
所有键值对会以 URL 的查询字符串形式提交到服务器  

实际提交的时候只要键值不是 URL 的合法字符(比如汉字"张三"和"提交")浏览器会自动对其进行编码 
```s
/handling-page?user_name=张三
```

<br>

**如果是 POST 方法:**  
所有键值对会连接成一行作为 HTTP 请求的数据体发送到服务器

```s
user_name=张三&user_passwd=123&submit_button=提交
```

实际提交的时候只要键值不是 URL 的合法字符(比如汉字"张三"和"提交")浏览器会自动对其进行编码 

<br>

### 创建 formdata 对象:
### **<font color="#C2185">new FormData(form)</font>**
原生当中根据form自动收集表单数据到 formData 对象中
```js 
let formData = new FormData(document.querySelector("form"))
```

<br>

**参数:**   
- DOM表单元素 构造函数会自动处理表单的键值对
- 空(不传): 那就创建一个空的表单对象 需要我们自己往里面添加值

<br>

### 实例方法: 
### **<font color="#C2185">formData.get(key)</font>**
获取指定键名对应的键值参数为键名 如果有多个同名的键值对则返回第一个键值对的键值 

<br>

### **<font color="#C2185">formData.getAll(key)</font>**
返回一个数组表示指定键名对应的所有键值 如果有多个同名的键值对数组会包含所有的键值 

<br>

### **<font color="#C2185">formData.set(key, value)</font>**
设置指定键名的键值, 没有就添加 已有就更新 

如果第二个参数是文件对象 则还可以使用第三个参数表示文件名 

<br>

### **<font color="#C2185">formData.delete(key)</font>**
删除一个键值对参数为键名 

<br>

### **<font color="#C2185">formData.append(key, value)</font>**
添加一个键值对 如果键名重复, 则会生成两个相同键名的键值对 

如果第二个参数是文件对象 则还可以使用第三个参数表示文件名 
```js
formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
```

<br>

### **<font color="#C2185">formData.has(key)</font>**
返回一个布尔值表示是否具有该键名的键值对 

<br>

### **<font color="#C2185">formData.keys()</font>**
返回一个遍历器对象  
用于for...of循环遍历所有的键名 

<br>

### **<font color="#C2185">formData.values()</font>**
返回一个遍历器对象  
用于for...of循环遍历所有的键值 

<br>

### **<font color="#C2185">formData.entries()</font>**
返回一个遍历器对象  
用于for...of循环遍历所有的键值对

如果直接用for...of循环遍历 FormData 实例默认就会调用这个方法 

<br>

### 表单元素属性: 
### **<font color="#C2185">enctype</font>**
表单能够用四种编码向服务器发送数据 编码格式由表单的enctype属性决定 

**对 请求体 进行编码的格式**

<br>

**<font color="#C2185">GET</font>**  
如果表单使用GET方法发送数据enctype属性无效 
```s
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line 
```

```html
<form
  action="register.php"
  method="get"
  onsubmit="AJAXSubmit(this); return false;"
>
</form>
```

<br>

**<font color="#C2185">POST</font>**  
如果是post请求的时候吧 我们可以通过 enctype 来执行请求体的编码格式

<br>

**application/x-www-form-urlencoded:**  
如果表单用POST方法发送数据并省略enctype属性那么数据以application/x-www-form-urlencoded格式发送(因为这是默认值) 

```s
Content-Type: application/x-www-form-urlencoded

foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
```

<br>

**text/plain:**  
如果表单使用POST方法发送数据enctype属性为text/plain那么数据将以纯文本格式发送 
```js
Content-Type: text/plain

foo=bar
baz=The first line 
The second line 
```

<br>

**multipart/form-data:**  
如果表单使用POST方法enctype属性为multipart/form-data那么数据将以混合的格式发送 

```js 
Content-Type: multipart/form-data; boundary=----314911788813839

----314911788813839
Content-Disposition: form-data; name="foo"

bar
--------314911788813839
Content-Disposition: form-data; name="baz"

The first line 
The second line 

--------314911788813839--
```

<br><br>

## 文件上传: 
用户上传文件也是通过表单 具体来说就是通过文件输入框选择本地文件提交表单的时候浏览器就会把这个文件发送到服务器 
```html 
<input type="file" id="file" name="myFile">
```

<br>

### 要点: 
1. 将 form 的 method 设置为 post
2. enctype 设置为 multipart/form-data  
```  
enctype属性决定了 HTTP 头信息的Content-Type字段的值 默认情况下这个字段的值是application/x-www-form-urlencoded

但是文件上传的时候要改成multipart/form-data 
```

3. 新建一个 FormData 实例对象 把选中的文件添加到这个对象上面 
```js 
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // 只上传图片文件
  if (!file.type.match('image.*')) {
    continue;
  }

  formData.append('photos[]', file, file.name);
}
```

4. 最后使用 Ajax 向服务器上传文件 
```js 
var xhr = new XMLHttpRequest();
xhr.open('POST', 'handler.php', true);

xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log('An error occurred!');
  }
};

xhr.send(formData)


// 除了发送 FormData 实例也可以直接 AJAX 发送文件 
var file = document.getElementById('test-input').files[0];
var xhr = new XMLHttpRequest();

xhr.open('POST', 'myserver/uploads');
xhr.setRequestHeader('Content-Type', file.type);
xhr.send(file);
```

<br><br>

# image对象
当我们创建一个 Image 对象时, 就相当于给浏览器缓存了一张图片

<br>

## 创建 image 对象的方式

### 通过 Image构造函数的方式 创建图片对象: 
```js
let img = new Image([宽度],[高度])
```

img 也相当于一个节点对象 节点身上有的属性 它都有 如
```js
// 给浏览器缓存了一张图片
img.src = ""
```

<br>

**注意:**
src 属性一定要写到 onload 的后面否则程序在 IE 中会出错 

<br>

### 图片对象身上的属性: 

**img.complete:**  
返回一个布尔值 可以通过Image对象的 complete 属性来**检测图像是否加载完成**

<br>

每个Image对象都有一个complete属性当图像处于装载过程中时该属性值false

当发生了onload、onerror、onabort中**任何一个事件后则表示图像装载过程结束(不管成没成功)此时complete属性为true**

**img.border**

<br>

**img.height**

<br>

**img.width**

<br>

**img.src**

<br>

**img.name**

<br>

**img.vspace**  
属性定义了图片与周围元素(如文本或其他图片)之间的垂直空白间距。它可以设置为一个整数值, 表示以像素为单位的间距大小

<br>

**img.hspace**  
属性定义了图片与周围元素(如文本或其他图片)之间的水平空白间距。它可以设置为一个整数值, 表示以像素为单位的间距大小

<br>

**img.lowsrc**  
定义了一个低分辨率或缩略图版本的图片来源。当浏览器加载页面时, 它可以用作占位符, 直到原始高分辨率图像完全加载。

<br>

### 图片对象身上的事件: 
- onabort: 当用户放弃图像的装载时调用
- onload: 当图像装载完毕时调用
- onerror: 在装载图像的过程中发生错误时调用
- onkeydown 
- onkeypress 
- onkeyup
```js
var img = new Image();    
img.src = oImg[0].src = this.src.replace(/small/, "big");    

oDiv.style.display = "block";    

img.complete 
  ? oDiv.style.display = "none" 
  : (oImg[0].onload = function() {
    oDiv.style.display = "none"
  })  
```

<br>

### 应用场景: 
Image对象也常用来做预加载图片(也就是将图片预先加载到浏览器中, 当浏览图片的时候就能享受到极快的加载速度)。

在HTML页面中, ``<img>`` 标签每出现一次, 也就创建了一个 Image 对象。

HTML代码的加载 和 图片的加载是同时的, 虽然 图片已经进行过预加载, 但是尽管这样 加载的速度 相比较 HTML 代码的加载速度 还是要慢一些的。

就需要用 Image对象中的 onload事件来解决这个问题了。。

<br>

### image对象的src: 
当我的src指向一个地址时 我会发送请求去拿它, 这是浏览器自己会做的 ``img.src = arr[i];``

<br><br>

### 判断是否是数组还是对象: 
### **<font color="#C2185">Object.prototype.toString.call(目标对象)</font>**
```js
{}.toString.call()
```

```js
function checkType(target) {

  let info = {
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Function]": "function",
    "[object String]": "string",
    "[object Number]": "number",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
  }

  return info[Object.prototype.toString.call(target)]
}
```

<br>

### **<font color="#C2185">delete 对象</font>**
删除对象中的属性
```js 
delete req.session['id']
```

<br>

**注意: 删除数组中的指定元素**
```js 
let arr = [1, 2, 3]
delete arr[1]
console.log(arr)  // [1, empty, 3]
```

<br>

### **<font color="#C2185">数字对象.toFixed(2)</font>**
保留几位小数 会四舍五入

该方法会将结果转为字符串型 但是不会影响原数据
```js  
let num = 1.123
let res = num.toFixed(2)
console.log(typeof num.toFixed(2))      // string
```

<br>

### **<font color="#C2185">元素对象.setCapture()</font>**
针对鼠标按下事件

设置btn01对鼠标按下的相关的事件进行捕获 不管点击谁都显示元素对象身上的事件

该方法是针对鼠标按下事件的一种解决方案 不管点击谁 都会触发元素对象身上的事件(点击事件)

只有ie支持但是在火狐中调用时不会报错, 而如果在chrome调用 会报错

使用的时候要先进行判断
```js  
if(box1.setCapture){
    box1.setCapture();
}

box1.setCapture && box1.setCapture();
```

我们去拖拽一个网页中的内容时浏览器会默认去搜索引擎中去搜索内容, 此时会导致拖拽功能异常这个是浏览器提供的默认行为 
    
如果不希望发生这个行为则可以通过return false 来取消默认行为

最简单的方式在onmousedown的最后来个return false;

但是ie8 不起作用 这时候我们就需要使用, 元素对象.setCapture()

<br>

### **<font color="#C2185">元素对象.releaseCapture()</font>**
取消对事件的捕获

当调用一个元素的setCapture()方法以后这个元素将会把下一次所有的鼠标按下相关的事件捕获到自身上 触发自己身上的事件

比如: 即使按下按钮2 也会提示alert1 
    
换个说法 我给btn01设置完setCapture以后 btn01就像一个强盗一样 它把所有鼠标点击的事件都抢过来, 虽然页面上我点的02

但btn01设置了setCapture就说 点02就相当于点我 所以弹出了1

因为btn02的事件被btn01捕获了, 更横的是 不光点按钮鼠标进行的点击相关所有事件都被btn01抢过来显示1了 

<br>

因为setCapture是针对鼠标点击 按下等事件 解决ie浏览器的默认行为的现象 那我们可以在鼠标抬起的时候解绑setCapture
```js 
document.onmouseup = function(){
  document.onmousemove = null;

  // 当鼠标抬起的时候 两种方式都可以
  document.releaseCapture?
  canvas
  document.releaseCapture && document.releaseCapture();
};
```

<br>

### **<font color="#C2185">confirm()</font>**
用于弹出一个带有确认和取消按钮的提示框需要一个字符串作为参数
该字符串作为提示文字显示出来

- 确定返回true
- 取消返回false
```js 
let result = confirm('确定要点击么');
console.log(result);
```

<br>

### **<font color="#C2185">prompt()可以弹出一个输入框</font>**
该提示框中会有一个文本框用户可以在文本框中输入一段内容
该函数需要一个字符串作为参数该字符串将会作为提示框的提示文字

这个函数的返回值是String类型的

```js 
// 用户输入的内容将会作为函数的返回值返回可以定义一个变量来接受该内容
var score = prompt("提示内容"); 
```

<br>

### **<font color="#C2185">isNaN()</font>**
这个方法用来 判断非数字, 并且返回一个值

- 如果是数字 false, 
- 如果不是数字 true

<br>

**原理:**   
它是判断一个值能否被 Number() 合法地转化成数字 如果能转化那就算做是数字, 所以isNaN()的结果会是 false

<br>

**1. 数字形式的字符串:**   
例如 "123"、"-3.14" 虽然是字符串型

但被 isNaN() 判为数字 返回 false ("12,345,678""1.2.3" 这些返回 true)

<br>

**2. 空值:**   
null、 空字符串""、 空数组[] 都可被Number()合法的转为0 于是被isNaN认为是数返回false 
            
但是 (undefined、空对象{}、空函数等无法转数字返回true) ！！！

<br>

**3. 布尔值:**   
- Number(true) = 1, 
- Number(false)  =0, 所以isNaN对布尔值也返回false 

<br>

**4. 长度为 1 的数组:** 
结果取决于其中元素即: ``isNaN([a])=isNaN(a)`` 可递归 
```js
isNaN([["1.5"]]) = false 
```

<br>

**5. 数字特殊形式:**   
例如"0xabc"、"2.5e+7"这样的十六进制和科学计数法即使是字符串也能转数字所以也返回false 

<br>

### **<font color="#C2185">Math.sqrt()</font>**
可以通过Math.sqrt()对一个数进行开方
```js
var result = Math.sqrt(4);
console.log(result);        //值为2 
```

<br>

### **<font color="#C2185">console.time("") 和 console.timeEnd("")</font>**
开发代码的过程中我们要考虑提升性能也就是提升处理速度

console.time / timeEnd 用来测试花费的毫秒数可以用来测试性能

它需要一个字符串作为参数这个字符串将会作为计时器的标识 或者理解为计时器的name
``` 
console.time("test");开始
+
程序
+
console.timeEnd("test");停止
```
    
<br>

### **<font color="#C2185">for...in</font>**
枚举(遍历)对象中的属性

```js
for(let 变量 in 对象) {
        
}


for(let key in obj) {
    console.log(key)
}
```

<br>

for...in语句 对象中有几个属性循环体就会执行几次, 每次执行时会将对象中的一个属性的名字赋值给变量
```js  
var obj = {
  name:"sunwukong",
  age:18,
  gender:"男",
  address:"花果山"
}

for(var n in obj){
  console.log(obj[n]);       
  // []的特点就是可以传变量假如直接写obj.n的话就是在obj中找叫n的属性 
}
```

<br>

### **<font color="#C2185">"属性名" in 运算符</font>**
通过该运算符可以检查一个对象中是否含有指定的属性

- 如果有返回true
- 没有返回false

```js
console.log("test2" in obj);
```
    
<br>

### **<font color="#C2185">A instanceof 类</font>**
使用instanceof可以检查一个对象是否是一个类的实例
```js  
class Demo {
  name = "sam"
}
let d = new Demo()
console.log(d instanceof Demo)      // true
```

<br>

比如我们可以利用instanceof来判断一个对象是不是数组
```js  
console.log(arr instansof Array) 

function checkType(target) {
  return target instanceof Array
}

let arr = []
let obj = {}
let res = checkType(obj)
console.log(res)            // false
```

<br>

### **<font color="#C2185">对象 instanceof 构造函数</font>**
检查这个对象是不是这个构造函数的实例, 是为true否为false 

<br>

**注意:**  
所有的对象都是object的后代所以任何对象和object做instanceof检查时都会返回true 
```js
console.log(per instanceof Person);
```

<br>

### **<font color="#C2185">Array.isArray(arr)</font>**
是返回true 不是false 这个方法会优先于instanceof
H5新增 ie9以上才支持

<br><br>

# 树形数据结构化

## 扁平化数据示例:
我们将多维数组变成一维数组就是数据的扁平化  
```js
const data = [
  {
    id:2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理"
  },
  {
    id:3,
    name: "CourseOperate",
    path: "operate",
    link: "/course/operate",
    pid: 2,   // parentId
    title: "课程操作"
  },
  {
    id:4,
    name: "CourseInfoData",
    path: "info_data",
    link: "/course/operate/info_data",
    pid: 3,   // parentId
    title: "课程数据"
  },
  {
    id:5,
    name: "CourseAdd",
    path: "add",
    link: "/course/add",
    pid: 2,
    title: "增加课程"
  },
  {
    id:6,
    pid: 0,
    name: "Student",
    path: "/student",
    title: "学生管理"
  },
  {
    id:7,
    pid: 6,
    name: "StudentOperate",
    link: "/student/operate",
    path: "operate",
    title: "学生操作"
  },
  {
    id:8,
    pid: 6,
    name: "StudentAdd",
    link: "/student/add",
    path: "add",
    title: "增加学生"
  },
]
```

<br>

## 数据树形结构化:
就是将这个扁平的一维数组, 通过它里面的某一个字段(比如pid)去关联 **形成一个嵌套型的树形结构**

所以我们要找到扁平化数据中的数组成员中 哪个一个字段能够说明这个树形结构 比如上面的数据结构中 我们就可以根据 pid 字段来说明树形结构

**pid: 该数组成员的 爸爸 的id**

<br>

有 pid: 0 的数组成员 就表示该成员为第一级数据 它没有爸爸 

有 pid: 2 的数组成员 就表示该成员为 id:2 的子数据 它的爸爸是id:2

<br>

### 我们期望的数据结构的样子:
先放的是 pid: 0 的成员
```js
const data = [
  {
    id:2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理",

    children: []
  },
  {
    id:6,
    pid: 0,
    name: "Student",
    path: "/student",
    title: "学生管理",

    children: []
  },
]
```

<br>

然后我们找 id: 2 的子数据 和 id: 6 的子数据 放在children 中 也就是放2级数据到数据结构中

然后依次根据 ``pid: ?`` 将该数据放到对应的结构中(</font color="#C2185B">pid该数据的爸爸是哪个id</font>)

```js
const data = [
  {
    id:2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理",

    chlidren: [
      {
        id:3,
        name: "CourseOperate",
        path: "operate",
        link: "/course/operate",
        pid: 2,   // parentId
        title: "课程操作",
        children: [
          {
            id:4,
            name: "CourseInfoData",
            path: "info_data",
            link: "/course/operate/info_data",
            pid: 3,   // parentId
            title: "课程数据"
          },
        ]
      },
      {
        id:5,
        name: "CourseAdd",
        path: "add",
        link: "/course/add",
        pid: 2,
        title: "增加课程"
      },
    ]
  },

  {
    id:6,
    pid: 0,
    name: "Student",
    path: "/student",
    title: "学生管理",
    chlidren: [
      {
        id:7,
        pid: 6,
        name: "StudentOperate",
        link: "/student/operate",
        path: "operate",
        title: "学生操作"
      },
      {
        id:8,
        pid: 6,
        name: "StudentAdd",
        link: "/student/add",
        path: "add",
        title: "增加学生"
      },
    ]
  },
]
```

<br>

## 树形数据结构化的应用场景:

### 场景1: 权限路由
Vue React项目中有一些权限是动态的 也就是会从后台返回一个 扁平化的路由数据(路由权限列表)

路由权限列表是一个扁平化的数据 并不是树形结构 它会有一个类似pid的字段 用来来说明 扁平化数据的树形结构的组织方式

当我们从后台接到这样的数据后 首先要先将该扁平化数据 变成 树形结构 然后我们根据树形结构将其变成路由 然后将它们动态的加到路由列表中

<br>

### 场景2: 根据数据渲染DOM节点
数据渲染DOM节点也是一样 扁平化的数据是没有办法做DOM渲染的 我们只有将其转换成树形结构后 才能渲染DOM节点

<br><br>

## 树形结构化:
树形结构化逃不开递归操作的

首先一个扁平化的数据列表中 肯定会有一个描述树形结构的字段(至少一个)

上面的示例中的 pid 就是  
pid 对应 id, pid是几它就是哪个id下的children里面的数据

<br>

### 思路: 递归
首先, 我们要筛选出顶级数据, 比如pid为0的数据 也就是将顶级与子级数据分开

然后, 分开后我们要判断 pid 和 id 只要它俩一对上 我们就要将当前的的数据 放到对应id的数据的children中

```js
function formatDataTree(data) {
  // 找到顶级数据 使用filter进行筛选, pid为0的则是顶级数据
  let parents = data.filter(p => p.pid === 0)

  // 找到子级数据
  let children = data.filter(c => c.pid !== 0)


  // 调用下面的函数 处理 parents 和 children 之间的父子关系
  dataToTree(parents, children)


  // 该函数的声明位置在 formatDataTree 内部
  // 用于处理 顶级数据 和 子级数据 的嵌套关系
  function dataToTree(parents, children) {

    // 遍历 parents 找到每一个 parent 顶级数据
    parents.map(p => {

      // 遍历 children 找到每一个 子级数据
      children.map(c => {
        // 判断 pid 和 id 是否相等
        if(c.pid == p.id) {

          // 如果相等 说明 id: 3(pid: 2) 是 id: 2 的子数据

          // 先判断父级对象中有没有children属性 没有的话没有办法push
          if(p.children) {
            // 如果有children属性 则直接push
            p.children.push(c)
          } else {
            /*
              父级中没有children的话 先给父级增加一个children属性 值是一个[], 同时将当前的子级放入数组中

              我们的目的就是 c.pid == p.id 的时候将 c 放入 p 中 但是我们要考虑 p 中有没有 children 属性 else的逻辑中就是没有 children 属性的情况 再该情况下 我们要做两件事 

              1. 给 p 初始化一个 children
              2. 将 c 放到 children 中
            */
            p.children = [c]
          }
        }
      })
    })
  }


  // 最终我们将 parents 返回就可以了
  return parents
}
```

<br>

上面的逻辑之后 我们解决了 顶级 和 子级 的情况 但是还有 子级 的 子级是么 我们还有递归操作

```js
function formatDataTree(data) {
  let parents = data.filter(p => p.pid === 0)
  let children = data.filter(c => c.pid !== 0)

  dataToTree(parents, children)


  // 这里我们传入的是2个数组
  function dataToTree(parents, children) {

    parents.map(p => {
      children.map((c, i) => {
        if(c.pid == p.id) {

          /*  
            在这里我们再对 c 的 id 进行检测, 这里也就是将每一个c看成父级数据 看看所有的 children(这里是分里出来的所有子级数据) 中是否还有属于c的子级数据
            
            但是这里的 c 和 p 都是对象 而我们下面的函数要求传入数组 所以我们可以传入 [c]

            我们传入
            [c]
            children: 它是所有的子级数据 我们从它里面挑属于c的子级数据

            但是 children 不能直接放入 因为它是一个引用值 所以我们要深拷贝一下
          */
          // 深拷贝下
          let _children = JSON.parse(JSON.stringify(children))

          /*
            我们这个案例中是1对1的逻辑 一个子级数据不会存在于二个父级数据中

            我们这里有一个问题 每次我们调用 dataToTree() 的时候都会遍历所有的children

            parents.map()
              children.map()

            我们将 _children 传入 dataToTree 后 又会再次的遍历 children

            这样就不好了 我们可以这么改进 我们每次都可以删除一个c 也就是说当我们进入 

            if(c.pid == p.id) 判断后 我们就将当前的这个c从_children中删除 这样做的好处就当我们匹配过了就不用再次的匹配了

            _children里面的数据不断的减少 当我们通过dataToTree传入_children的时候 相当于变成

            parents.map()
              _children.map()

            性能会好一点
          */
          _children.splice(i, 1)
          dataToTree([c], _children)


          if(p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }
        }
      })
    })
  }

  // 这里也可以放在上面
  return parents
}
```

<br>

**整理用:**
```js
function formatDataTree(data) {
  let parents = data.filter(p => p.pid == 0) 
  let children = data.filter(c => c.pid != 0)

  dataToTree(parents, children)

  return parents

  function dataToTree(parents, children) {

    // 我觉得不用map更符合语义
    parents.map(p => {
      children.map((c, i) => {

        if(c.pid == p.id) {

          let _children = JSON.parse(JSON.stringify(children))
          _children.splice(i, 1)
          dataToTree([c], _children)
          
          if(p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }
        }
      })
    })
  }
}
let treeData = formatDataTree(data)
console.log(JSON.stringify(treeData, null, 2))
```

<br>

### 思路: 
这里我们说一下另一种做法, 上面示例数据是扁平化的数据 那我们能不能用 扁平化的思想去解决树形结构的问题的 

当我们在遍历扁平化数据的过程中 就给这个扁平化的数据 增加子数据 也就是我们遍历的时候 每遍历到一个数组成员 我都去找它的子级成员

```js
function formatDataTree(data) {
  /*
    因为我们要遍历扁平化数组 在遍历的过程中每找到一个成员
    然后我们再次的遍历整体的数据找该成员的子级

    所以我们将 data 复制一份 我们操作的是跟data一样的新的数组_data
  */
  let _data = let _children = JSON.parse(JSON.stringify(data))


  // p 每一个元素都可以看做是父级 因为只有父级才会找它的子元素
  return _data.filter(p => {

    // 我们再次遍历_data 返回的数组为当前p的children
    const _arr = _data.filter(c => c.pid == p.id)

    // 如果有自己 就将p的children赋值为 _arr
    _arr.length && (p.children = _arr) 

    // 我们要return出去顶级元素 顶级元素为pid==0的
    return p.pid == 0
  })
}
```

<br><br>

# 惰性函数:

### 需求:
我们希望拿到的是第一次的结果 不用多次创建数据, 我们期望的就是拿到同样的值

```js
// 单例模式:
let timeStamp = null

function getTimeStamp() {

  if(timeStamp) {
    return timeStamp
  }

  return new Date().getTime()
}

console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())

// 当我们执行多次的时候 次次都是一样的结果
```

<br>

### 问题:
上面的代码中存在的问题

- 每次执行 getTimeStamp() 都会走 if逻辑 (</font color="#C2185B">这也是惰性函数要解决的问题</font>)

- 这个函数有副作用 依赖于外部的变量 timeStamp, timeStamp可能会被别的逻辑修改

每次都会走if 但是无乱我们执行多少次 getTimeStamp() 出来的都是同一个值 执行1000次都要走1000次的if逻辑

<br>

### 修改方式1:
下面的修改方式 也能解决上面的需求 我们实现了调用多次 拿到的都是同一个值

也解决了 timeStamp 变量污染全局的问题 也解决了多次调用的时候 要执行if判断的问题
```js
let getTimeStamp = (function() {
  // 这个部分被缓存起来了
  let timeStamp = new Date().getTime()
  console.log(1)  // 多次调用 这里只执行了一次


  return function() {
    return timeStamp
  }
})()

console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
```

但是我们上面的代码 其实还有问题, 有什么问题?

<br>

**问题:(我觉得这里讲的有问题)**  
我们在立即执行函数中 let 了 timeStamp 每次调用 getTimeStamp 的时候都会将 timeStamp 带出去 

每次带去的 timeStamp 不是首次了 因为每次立即函数执行的时候 timeStamp 都会被重新赋值 也就是说 这个立即执行函数还可能存在着别的地方也使用的情况?

那也就是说 timeStamp 在上面的情况下可能会发生变化  
比如程序再次运行的时候 timeStamp 的值就不一样了


<br>

### 修改方式2: 惰性函数
惰性函数是一种优化技术, 用于延迟函数的执行, 只在需要时才执行并缓存结果, 以提高性能。以下是惰性函数的实现原理和应用场景的说明: 

<br>

**实现原理:**   
1. 创建一个变量, 用于存储函数的结果。
2. 将原始函数替换为一个新的函数。
3. 在新函数中, 检查之前存储的结果是否存在。
  - 如果存在, 直接返回结果
  - 如果不存在, 执行原始函数并将结果存储在变量中, 然后返回结果

4. 将新函数绑定到原始函数的名称上, 以便下次调用时使用

<br>

### 应用场景:
**频繁调用开销较大的函数:**   
如果某个函数执行开销很大, 但在程序运行过程中并不总是需要调用它, 可以使用惰性函数来避免不必要的执行。只有在需要函数结果时, 才会真正执行函数。

<br>

**初始化操作:**   
惰性函数可以用于延迟初始化操作, 直到它们真正需要的时候才执行。这对于一些资源密集型的操作或对象的创建过程很有用, 可以节省系统资源并提高启动速度。

<br>

**浏览器环境下的事件绑定:**   
在网页中, 使用惰性函数可以避免重复绑定事件处理程序。当首次触发事件时, 绑定函数会被替换为一个惰性函数, 以后的事件触发将直接使用缓存的结果。

<br>

**动态加载模块:**   
在模块化开发中, 惰性函数可用于按需加载模块。只有当特定模块被请求时, 才会实际加载和执行该模块, 从而减少初始加载时间和资源占用。

<br>

总的来说, 惰性函数通过延迟执行和缓存结果, 提高了程序的性能和效率。它们在需要避免不必要的计算或延迟初始化的情况下非常有用, 并可以应用于各种编程场景。**函数内部改变自身的机制 这就是惰性函数**

<br>

### 概念:
惰性加载表示函数执行的分支只会在函数第一次调用的时候执行  

在第一次调用的过程中 该函数被覆盖为另一个按照合适的方式执行的函数 这样任何对原函数的调用就不用再经过执行的分支了

```js
let getTimeStamp = function() {
  // 利用闭包 缓存数据
  let timeStamp = new Date().getTime()
  console.log(1)  // 这里只执行一次 因为后面被改写了 再执行的时候 只会执行改写后 里面的逻辑

  // 将getTimeStamp重写为取值的逻辑
  getTimeStamp = function() {
    return timeStamp
  }

  // 返回getTimeStamp()的值 不然第一次调用则是undefined
  return getTimeStamp()

  // ！！！！！！！注意最后要执行重写后的函数 或者直接执行 或者 return 执行
}



console.log(getTimeStamp())

// 再次调用的时候执行的是重写后的getTimeStamp(), 第二次执行的时候getTimeStamp的逻辑就变了 变成重写后的了
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())

// 多次调用打印的数据都是一样的
```

<br>

### 惰性函数的使用场景:

```js
// 利用 立即执行函数 做逻辑判断 声明变量
let addEvent = (function() {
  if(window.addEventListener) {
    return function(el, type, fn, capture) {
      el.addEventListener(type, fn, capture)
    }
  } else if(window.attachEvent) {
    return function(el, type, fn) {
      el.attachEvent("on" + type, function() {
        fn.call(el)
      })
    }
  } else {
    return function(el, type, fn) {
      el["on" + type] = fn
    }
  }
})()

addEvent(oBtn, "click", btnClick, false) 
function btnClick() {
  console.log(1)
}
```

<br>

下面我们使用 惰性函数 处理绑定兼容性的事件处理函数

```js
let addEvent = function(el, type, fn, capture) {
  // 如果元素身上存在的话 我们就重写addEvent
  if(el.addEventListener) {
    addEvent = function(el, type, fn, capture) {
      el.addEventListener(type, fn, capture)
    }
  // 如果元素身上存在的话 我们就重写addEvent
  } else if(window.attachEvent) {
    addEvent = function(el, type, fn) {
      el.attachEvent("on" + type, function() {
        fn.call(el)
      })
    }
  // 该情况下再次重写
  } else {
    addEvent = function(el, type, fn) {
      el["on" + type] = fn
    }
  }

  // 执行addEvent 注意最后要执行
  addEvent(el, type, fn, capture)
}


// 之后我们不管什么地方使用addEvent 都会被固定成一个分支中的函数
```

<br>

当一个函数的功能是通过外界因素隐藏函数的内部功能时候 我们可以利用惰性函数的方式来写 

这样一旦函数第一次确定是哪种功能了 后面都会能再次的修改了
```js
// 我们通过num指定 test 函数具有什么样的功能
function test(num) {
  switch(num) {
    case 1:
      // 重写 test
      test = function() {
        console.log("我爱你")
      }
      break
    case 2:
      // 重写 test
      test = function() {
        console.log("我喜欢你")
      }
      break
    case 3:
      // 重写 test
      test = function() {
        console.log("我讨厌你")
      }
      break
  }


  // 最后记得要执行
  return test()
}

test(1)   // 我爱你  一旦我们首次决定了后 后面不管怎么修改 函数的功能都不会再被修改 一般我们认为函数应该是静态的 函数内部的功能不应该会变 惰性函数也是静态的 只不过在第一次执行后会确定下来 函数应该具有什么样的功能

// 比如函数的功能本身是不明确的 只有在执行的时候才知道 我到底要选择哪个功能

// 惰性函数 如上面的例子的好处就是一个功能体可以多样化 我们可以在不同的场景下 通过不同的方法完成不同的事情 它们完成的过程是一样的 但是完成的结果不同 我们这种情况下使用惰性函数就非常的好

test(2)   // 我爱你
test(3)   // 我爱你
```

<br>

### 示例2:
```js
function expensiveOperation() {
  console.log("执行了昂贵的操作");
  return Math.random();
}

function lazyFunction() {
  let result = null;

  return function() {
    if (result === null) {
      result = expensiveOperation();
    }

    return result;
  };
}

const lazy = lazyFunction();

console.log(lazy()); // 第一次调用, 执行 expensiveOperation()
console.log(lazy()); // 第二次调用, 直接返回缓存的结果
console.log(lazy()); // 第三次调用, 直接返回缓存的结果
```

<br><br>

# 类数组的概念:
一个类数组的结构如下 因为要满足一个数组的特性
1. 要求有索引式的属性名
2. 要求对象中有length

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length : 3,
}
```

如果length = 2, 则末位元素减掉  
如果length = 4, 则用undefined补位  
如果length = 0 或者 没有, 则数组为空  

```js
var obj = {
  0: 1,
  1: 2,
  2: 3
  push: [].push
}

obj.push(4)

// 结果 1被替换了
4   
2
3
length: 1
```

因为既然有push方法 那么一定会有length属性 如果没有会自动给你添加 然后我们push 4 它会从0的位置开始添加数据 所以将1覆盖为4

<br><br>

## **<font color="#C2185B">Array.from(参数1, 参数2, 参数3)</font>**  
作用: 将一个类数组对象转化为数组

<br>

- 参数1: 类数组对象
- 参数2: map回调
- 参数3: 

```js
let data = Array.from(obj, function(item, index) {
  // 当我们不传递第三个参数的时候 this原先是什么现在就是什么
  console.log(this)
  return {
    .. 
  }
})
```

当我们传递第三个参数进去的时候 this就代表我们传入的数据 

- 我们传递一个对象 那么this就是这个对象  
- 我们传递一个数组 那么this就是这个数组  
- 传递什么this就是什么

```js
let data = Array.from(obj, function(item, index) {
 
  console.log(this)
  return {
    .. 
  }
}, {} or [] or number or string)
```

<br>

我们要将下面的结构 转换为 
```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length : 3,
}

var arr = [
  {
    order: 0
    studentId: 1,
  },
  {
    order: 1
    studentId: 2,
  },
  {
    order: 2
    studentId: 3,
  }
]
```

<br>

**方式1:**
```js
let data = Array.from(obj).map((item, index) => {
  return {
    studentId: item,
    order: index
  }
})

console.log(data)
```

<br>

**方式2: Array.from()**
```js
const data = Array.from(obj, function(item, index) {
  return {
    studentId: item,
    order: index
  }
})
```

<br>

**方式3: Array.from() 的第三个参数**
```js
const data = Array.from(obj, function(item, index) {
  return {
    studentId: this.prefix + item,
    order: index
  }
}, {
  prefix: "No. "
})
```

<br>

### 数组的方法:
- forEach
- map
- filter
- reduce
- every
- some

上述的数组的方法中都有第3个参数 改变this指向的配置

<br><br>

# 将定义在对象中的get方法提取出来

如下我们定义的对象 我们给a属性定义了get方法 
要是想使用get方法我们都是通过 obj.a 的方式进行的调用 现在我们想将get方法提取出来
```js
let obj = {
  get a() {
    // 对random的结果进行四舍五入
    return Math.random() >= 0.5 ? 1 : 0
  }
}

console.log(obj.a)  // 0 or 1
```

<br>

### 方式1:
```js
const fn = obj.a
```

<br>

### 方式2:
**<font color="#C2185B">含有get的对象.__lookupGetter__("提取哪个get")</font>**  
```js
let round = obj.__lookupGetter__("a");
console.log(round)
console.log(round())
```

<br>

该方法已经被废弃了 但是它的兼容性超级好 在一些底层代码中使用的是
```
__defineSetter__()
__defineGetter__()
```

那既然上面的方法被废弃了 肯定就有一个新的方法出现替换它 我们的get set就是描述符

<br>

**<font color="#C2185B">Object.getOwnPropertyDescriptor("指定对象", "哪个属性的描述符")</font>**  
返回的是一个该对象的所有描述符对象

```js
let round = Object.getOwnPropertyDescriptor(obj, "a")
console.log(round);
console.log(round())

{
  set: undefined, 
  enumerable: true, 
  configurable: true, 
  get: ƒ
}
```

<br>

既然是对象 我们就能通过.的方法获取到get
```js
let round = Object.getOwnPropertyDescriptor(obj, "a").get
console.log(round);
```

该方法的兼容性不是很好 虽然上面的__lookupGetter__方法被废弃了 但是大部分浏览器是支持的

<br>

### <font color="#C2185B">对象.__defineGetter__("设置的属性", () => {})</font>  
### <font color="#C2185B">对象.__defineSetter__("设置的属性", () => {})</font>  
给对象设置什么属性 回调就是get方法的回调 内部需要返回return
也就是我们可以直接设置 getter 方法 偏底层的方法

```js 
let obj = {}
obj.__defineGetter__("a", () => {
  return "get a"
})
console.log(obj.a)
```

<br><br>

# 相等性判断:
es版本中 有4种相等判断的算法

1. === 全等
2. ==  等于
3. 零值相等 -0 === +0  
4. 同值相等 -0 !== +0   NaN === NaN

<br>

### js中提供有关相等判断的操作方法:
1. 严格相等 (strict equality)  
===

2. 非严格相等(抽象/非约束) (loose equality)  
==

3. Object.is(val1, val2)  
判断两个参数是否是同一个值 es6的新特性 

<br>

### === 严格相等
不进行隐式类型转换

要求:类型相同 值也要相同

```js
1 === "1"   // false  类型不同
1 === 2     // false  值不同
```

引用类型使用 === 判断的时候 引用值必须是同一地址
```js
let obj = {}
let obj2 = obj
obj === obj2  // true


{} === {}    // false  引用值不同
// 我们这么写相当于字面量 字面量都是通过new Object产生一个新的对象 相当于 {} 就是 new Object 出来的新对象


NaN === NaN   // false NaN跟任何值都不相等


+0 === -0   // true
// 数学中-0 和 +0代表两个含义 js中不是所有场景都是相等的

+Infinity === -Infinity   // false
```

<br>

思考: 怎么让 a !== a 返回true 如何定义变量a让这个等式成立呢? 
```js
a = NaN
a !== a
```

<br>

### 非严格相等 ==
比较之间会进行隐式类型转换 - 等式两边都有可能被转换 转换以后 还是用严格相等进行比较

隐式类型转换表:  
```s
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness
```

```js
Undefined == Undefined  // true 没有进行类型转换
Null == Null      // true
Undefined == Null // true


String == Object
// 隐式转换
// ToPrimitive(B) == A
// ToPrimitive(B)通过尝试调用 B 的B.toString() 和 B.valueOf() 方法, 将参数 B 转换为原始值(Primitive)。

// 调用.toString()方法将Object转换为原始值 进行比较
```

注意: 任何对象都与 undefined 和 null 不相等
```js
({}) === undefined  // false
({}) === null       // false

// 如果不给{} 包上大括号在控制台上输出会报错 因为它也代表着代码块
```

<br><br>

# Narrow Object 窄对象
document.all -- *不建议使用了* 它能选出DOM树上面的所有节点
```js
Array.from(document.all).forEach(item => {
  if(item.nodeName == "DIV") {
    console.log(item)   // div节点
  } 
})
```

<br>

### 那什么叫做窄对象呢?
typeof document.all 我们会发现结果是undefined

ie4的时候出现的 document.all 最早的时候我们可以用它获取节点

在ie10以前 document.all 是object  
其它浏览器也要引进 document.all 这个属性 但是又不想和ie定义为一样的 object 所以定义为了 undefined 意思是待定  

<br>

### document.all == undefined  // true
该情况和上面说的 undefined和其他进行比较的时候都是false 与这个结论互斥的一种情况

<br>

### 开发者认为 === 比 == 要好
全等对结果的预测是更加清晰明确
全等在不隐式转换的前提下 更快

<br>

### 有些情况 === 不利于我们功能的扩展
比如一个函数我们传递参数的时候 我们有可能传递数字1 也可以传递字符串1
那我们在函数内部进行判断的话 哪种情况合适 是不是都合适

尤其是我们在用swiper的时候 我们传递数字 和 字符串型的数字是不是都可以
这时候我们使用 == 比较好

<br>

### falsy值
将一个数据通过转换为boolean类型的false的值 一共有8个
```
false
+/-0
8n
'' "" ``
null
undefined 
NaN
```

<br>

### 同值相等 same-value
主要是针对0的
```
0 !== +0   这种情况就是同值相等
0 不等于 +0 他们不是一个东西
```

<br>

**举例:**
```js
let obj = {}

// 给obj添加属性 值为-0
Object.defineProperty(obj, "myZero", {
  value: -0,
  writable: false,
  configurable: false,
  enumerable: false
})


// 重新定义 myZero 为+0
Object.defineProperty(obj, "myZero", {
  value: +0,
  writable: false,
  configurable: false,
  enumerable: false
})

// 报错 不能重新定义属性
// Cannot redefine property: myZero
```

但是我们重新定义 -0 的时候就可以  代表-0跟+0是不一样的

也就是说在Object.defineProperty定义value的时候-0 和 +0 是不一样的

还有NaN和任何值比较都是false 和自己也是 但是在同值相等的情况下 NaN 和 NaN 会被认为是一样的

我们还可以通过 Object.defineProperty 来测试 如果能重复定义 那就是被认为是一样的

<br><br>

# 小数运算不精确的原因
最后一位不是5
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=833057501&bvid=BV1dg4y1R7iZ
```

我们在使用小数进行运算的时候 会有不精确的时候的, 一般人会说计算机的小数是不精确的 但是不精确的话 怎么解释也有对的时候呢
```js
0.1 + 0.2 === 0.3   // false

0.5 + 0.25 === 0.75 // true
```

什么时候是精确的 什么时候是不精确的?

<br>

### 思考
0.5 转成 2进制 是什么样的 

**错误的思考:**  
1.2转成二进制 小数部分 和 整数部分 转成2进制的方式是一样的, 也就是跟整数部分的转换规则是一样的
```s
1.2  -> 1.10
1.3  -> 1.11

2.5  -> 11.01 (3.01)
```

上面的转换规则是不可以的 因为这种转换出来的结果是错的 是没有办法运算的 上面的1.2和1.310进制运算的结果应该是2.5, 2进制部分的运算结果 也应该是2.5

但是我们使用上面的转换方式将2进制的部分相加 就出问题了 所以小数部分转成二进制的方式不能使用这种整数部分的方式 否则运算就会出问题

<br>

### 小数部分 转成 2进制的规则
![小数不精确01](./images/小数不精确01.png)

上图中才是10进制转换成2进制的关系

<br>

**要点:**  
一个2进制的小数 转成10进制的小数, **10进制的小数的最后一位一定是 5**, 最后一位一定是 ``1 / 2^n``, 这个``1 / 2^n``算出来的结果 末尾一定是5
```s
# 2进制  -> 十进制
1.101 -> 1.625
```

也就是说 10进制的小数部分不是5 那它100%无法对应到一个有限位的二进制, 比如0.5转成2进制就是有限的, 而0.1它转成2进制就不是有限的

```s
0.1.toString(2)
'0.0001100110011001100110011001100110011001100110011001101'

0.5.toString(2)
'0.1'
```

因为10进制的小数部分只要是不为5 则运算结果都是不正确的

<br><br>

## 零值相等 same-value-zero

<br><br>

# this 指向
我们讨论的this指向是一个函数中的this指向, 如果this不再函数中 那么就要看环境了 在浏览器中那就指向window, 在node中就指向一个空对象

函数中的this指向谁, **完全取决于是如何调用这个函数的**

<br>

### 指向的4种情况
|调用方式|示例|函数中的this指向|
|:--|:--|:--|
|通过 new 调用|new Mothod()|新对象|
|直接调用|method()|全局对象|
|通过对象调用|obj.method()|obj|
|call, apply, bind|method.call(ctx)|第一个参数|

<br>

### 执行上下文
this和执行上下文是两块独立的知识 但是深入到一定程度后 这个执行上下文和this的指向是有紧密关联的

事实上就是在创建这个执行上下文的时候来确定了这一次函数调用的时候 它的this指向谁

执行上下文是执行的时候创建的(执行就是调用函数的时候) 所以说this的指向是调用函数的时候才能确定下来

<br>

### 说说bind
这里是能产生混淆的地方, 因为bind会返回一个新的函数
```js
function fn() {
  console.log(this)
}

const newFn = fn.bind(1)
newFn()  // 指向 [Number: 1] 指向bind的第一个参数
```

上面 newFn() 不是就执行调用函数么? 为什么不指向全局对象呢?

我们直接调用的是 newFn() 我们没有直接调用 fn(), 我们调用newFn() newFn()这个函数里面它的this指向的是**全局对象**

但是在newFn里面它帮我们调用了fn 然后它里面内部 它是这样帮我们调用fn的 ``fn.call(1)``

所以fn的this指向的是number: 1

<br>

有点疑惑的地方是, 但是当我们使用new的方式调用 newFn 的时候 这时fn中的this指向的是新对象
```js
function fn() {
  console.log(this)
}

const newFn = fn.bind(1)
new newFn()  // fn {}
```

bind里面大概做了如下的事情
```js
function bind(ctx) {
  // bind函数会返回一个函数
  return function() {
    if(当前函数是使用 new 来调用的) {
      则使用 new 调用原始函数(fn)
    
    // 如果不是使用 new 调用的
    } else {
      原始函数.call(ctx)
    }
  }
}
```

<br>

### 箭头函数的this
当箭头函数使用this的时候, 由于它自己没有this 那么基于闭包 它就会从外层找这个this 而**闭包是属于词法作用域**

词法作用域是在编译时态确定的 它在编译时就确定了词法作用域 因此它不用等到这个函数运行的时候才能确定this 它编译时就能确定了

这就是为什么箭头函数的this指向谁, 取决于这个箭头函数定义的位置 而不是运行的位置 因为它是基于闭包的 而闭包是基于词法作用域的

<br><br>

# 手写 bind
js中最复杂的this指向就是bind了

### bind的使用方式
1. 参数1, 绑定fn将来在执行的时候 它的this指向
2. 剩余参数, 调用fn的时候 给fn传递的参数

在调用 newFn 的时候, 它在内部就会调用fn, 并且将fn的this指向参数1, 参数列表就是 1 2 3 4
```js
function fn(a,b,c,d) {
  console.log(a,b,c,d)
  console.log(this)
}

const newFn = fn.bind('ctx', 1,2)
newFn(3,4)  // 1 2 3 4 ctx
```

<br>

### 手写bind
bind函数是每一个函数都能使用的方法 所以它一定是写到每一个函数的原型上
```js
// ctx: 调用bind的时候 传入的this指向 剩余参数使用 arguments来接收
Function.prototype.myBind = function(ctx) {
  // 获取 剩余参数
  let args = Array.prototype.slice.call(arguments, 1)

  /*
    bind需要返回一个新的函数, 将来我们调用 newFn 的时候 相当于调用的是下面的这个函数 在下面这个函数中我们要调用 原始函数(fn.bind, fn就是原始函数)
  */
  // 获取原始函数 原始函数就是this
  const fn = this
  // function接收到的就是外部newFn()调用时传入的参数
  return function A() {
    let args2 = Array.prototype.slice.call(arguments)
    
    // 如果我们是使用new的方式调用的
    if (Object.getPrototypeOf(this) === A.prototype) {
      return new fn(...args, ...args2)
    } else {
      // 调用原始函数
      return fn.apply(ctx, [...args, ...args2])
    }
  }
}
```

<br><br>

# 手写 call

### 要点
1. 如果我们调用 myCall 传递的第一个参数
  - 如果是 基本数据 的话, 则this会指向基本数据类型的包装类
  - 如果是 undefind 或者是 null, 则this会指向全局对象
```js
// ctx: this
Function.prototype.myCall = function(ctx, ...args) {
  // 我们可能会传入很多种类型 所以需要将 ctx 做归一化 处理, 我们将它统一成一种类型处理 不然后续的判断就太多了
  // 如果是 null 或者是 undefind 则ctx为window或global
  // 如果不是 则ctx使用 Object() 转为基本数据类型对应的包装类
  ctx = ctx === null || ctx === undefind ? globalThis : Object(ctx)

  // 后续代码中 ctx 一定是对象

  // method.myCall(), 通过this拿到method方法 保存到fn中
  const fn = this

  /*
    我们要调用 fn(...args) 但是直接调用的话 fn中的this就指向了全局

    怎么才能在调用fn的时候, fn中的this指向ctx呢?
    我们只能使用如下的格式调用 fn
    ctx.fn()

    这样fn在执行期间的this就指向了 ctx 但是ctx中并没有fn属性

    我们只能自己创建 如下的方式怎么样
    ctx['abc'] = fn
    ctx['abc'](...args)

    abc的部分我们要保证它一定不和ctx对象中的属性不冲突 不然ctx中的同名属性就会被覆盖成fn

    所以我们要使用 symbol 作为属性名
  */
  const key = Symbol('temp')
  // ctx[key] = fn
  // 这样添加的属性是不可枚举的, 这样在打印对象和遍历对象的时候 都不会输出该属性
  Object.defineProperty(ctx, key, {
    value: fn,
    enumerable: false
  })
  const result = ctx[key](...args)
  // 调用完之后我们再将属性 干掉 没用
  delete ctx[key]

  return result
}

function method(a ,b) {
  console.log(this, a, b)
  return a + b
}

method.myCall('ctx', 2, 3)
// [String: ctx], 2, 3
```

<br><br>




