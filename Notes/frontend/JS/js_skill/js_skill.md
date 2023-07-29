## 待整理:

### 各种源码实现
```s
https://mp.weixin.qq.com/s/OS7gTvJ2gAVCZBvU-1cAqA
```

<br><br>

# axios的响应拦截中 将错误拦截下来了 前端怎么才能知道
axios中响应被拦截了 下面通过 code 值对响应做了处理 比如当下面的时候 我们做了提示消息的处理 同时我们 ``return Promise.reject(new Error('Error'))``

因为这里return了 代码到axios这里就截止了 并不会执行到组件中的逻辑

那组件中怎么才能拿到这里return err 接着做处理呢, 很简单 前端在请求处使用 try catch 我们在catch中接收到 拦截器这里 return 的 reject
```js
else if (res.code === RESPONSE_CODE.getResponseCode().EXCLUSIVE_ERROR.CODE) {
  vuetifyMessage.vuetifyMessage({
    visible: true,
    message: RESPONSE_CODE.getResponseCode().EXCLUSIVE_ERROR.MESSAGE || 'Error',
    type: 'error'
  })
  return Promise.reject(new Error('Error'))
}
```
```js
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge thvare status by HTTP Status Code
   */
  response => {
    let res = response.data
    debugLog('response:: ', response)
    if (
      response.request.responseType === 'blob' &&
      (response.headers['content-type'].includes(defaultSettings.downloadCsvTypeNoCharset) ||
        response.headers['content-type'] === defaultSettings.downloadJsonType ||
         response.headers['content-type'].includes(defaultSettings.downloadExcelType) ||
         response.headers['content-type'].includes(defaultSettings.downloadPdfType))
    ) {
      return response
    } else {
      // eslint-disable-next-line no-unused-vars
      if (response.request.responseType === 'blob') {
        const reader = new FileReader()
        reader.onload = e => {
          if (e.target.readyState === 2) {
            res = JSON.parse(e.target.result)
            debugLog('back:: ', res)
            if (res.code !== RESPONSE_CODE.getResponseCode().SUCCESS.CODE) {
              const err_message = getMessageByCode(res.code)
              vuetifyMessage.vuetifyMessage({
                visible: true,
                message: err_message || 'Error',
                type: 'error'
              })
              return Promise.reject(new Error(res.message || 'Error'))
            } else {
              return res
            }
          }
        }
        reader.readAsText(response.data)
      } else {
        if (res.code === RESPONSE_CODE.getResponseCode().SUCCESS.CODE || res.code === RESPONSE_CODE.getResponseCode().NO_RECORD.CODE) {
          return res
        } else if (res.code === RESPONSE_CODE.getResponseCode().LOGIN_FAILURE.CODE) {
          vuetifyMessage.vuetifyMessage({
            visible: true,
            message: RESPONSE_CODE.getResponseCode().LOGIN_FAILURE.MESSAGE || 'Error',
            type: 'error'
          })
          return Promise.reject(new Error('Error'))
        } else if (res.code === RESPONSE_CODE.getResponseCode().PASSWORD_UPDATE_FAILURE.CODE) {
          vuetifyMessage.vuetifyMessage({
            visible: true,
            message: RESPONSE_CODE.getResponseCode().PASSWORD_UPDATE_FAILURE.MESSAGE || 'Error',
            type: 'error'
          })
          return Promise.reject(new Error('Error'))
        } else if (res.code === RESPONSE_CODE.getResponseCode().PASSWORD_UPDATE_PRESENTATION.CODE) {
          localStorage.setItem('process', 'sysResetPassword')
          router.push({ path: '/changePass' })
          return Promise.reject(new Error('Error'))
        } else if (res.code === RESPONSE_CODE.getResponseCode().VALIDATOR_ERROR.CODE) {
          vuetifyMessage.vuetifyMessage({
            visible: true,
            message: RESPONSE_CODE.getResponseCode().VALIDATOR_ERROR.MESSAGE || 'Error',
            type: 'error'
          })
          return Promise.reject(new Error('Error'))
        } else if (res.code === RESPONSE_CODE.getResponseCode().EXCLUSIVE_ERROR.CODE) {
          vuetifyMessage.vuetifyMessage({
            visible: true,
            message: RESPONSE_CODE.getResponseCode().EXCLUSIVE_ERROR.MESSAGE || 'Error',
            type: 'error'
          })
          return Promise.reject(new Error('Error'))
        } else if (res.code === RESPONSE_CODE.getResponseCode().DATA_DUPLICATION_ERROR.CODE) {
          vuetifyMessage.vuetifyMessage({
            visible: true,
            message: RESPONSE_CODE.getResponseCode().DATA_DUPLICATION_ERROR.MESSAGE || 'Error',
            type: 'error'
          })
          return Promise.reject(new Error('Error'))
        } else if (res.code === RESPONSE_CODE.getResponseCode().INTERNAL_SERVER_ERROR.CODE) {
          vuetifyMessage.vuetifyMessage({
            visible: true,
            message: RESPONSE_CODE.getResponseCode().INTERNAL_SERVER_ERROR.MESSAGE,
            type: 'error',
            duration: 10000
          })
          return loginRedirect()
        } else if (res.code === RESPONSE_CODE.getResponseCode().UNLICENSED.CODE) {
          vuetifyMessage.vuetifyMessage({
            visible: true,
            message: RESPONSE_CODE.getResponseCode().UNLICENSED.MESSAGE,
            type: 'error'
          })
          return loginRedirect()
        } else {
          return loginRedirect()
        }
      }
    }
  },
  error => {
    debugLog('err' + error) // for debug
    var index
    var errorCode
    if (error !== undefined || error !== null) {
      var errorStr = error.toString()
      index = errorStr.lastIndexOf(' ')
      errorCode = errorStr.substring(index + 1)
      if (errorCode === '504') {
        vuetifyMessage.vuetifyMessage({
          visible: true,
          message: RESPONSE_CODE.getResponseCode().TIME_OUT.MESSAGE,
          type: 'error'
        })
        return Promise.reject(error)
      }
    }
    removeUserInfo()
    Cookies.remove('globalErrorArr')
    router.push('/login')
    return Promise.reject(error)
  }
)
```

<br><br>

# 将一个值转换为对应的布尔值
假设 token 是一个变量, 它可能是一个字符串、数字、对象等任何类型的值。

**我们想要将它转换为一个布尔值**
- 如果 token 存在且有值（非空） 则为 true, 
- 否则为 false

在传统的写法中, 我们可以使用三元运算符来实现：
```js
const isAuthenticated = token ? true : false;
```

<br>

双重否定运算符 !! 的作用是将一个值转换为布尔类型。

第一个 ! 将值转换为相反的布尔值（如果是真则变为假, 如果是假则变为真）

而第二个 ! 再次将其取反, 使得最终的结果和原始值的布尔表示保持一致。
```js
const isAuthenticated = !!token;
```

<br>

```js
const isLogged = token ? true : false
const isLogged = !!token
```


<br><br>

# return + 三元的书写方式
```js
return actions[type]
  ? actions[type]()
  : state
```

<br><br>

# 扩展: 位运算的使用技巧

### 位运算符的快速交换值:
```js
let a = 5;
let b = 10;

a ^= b;
b ^= a;
a ^= b;

console.log(a); // 输出: 10
console.log(b); // 输出: 5
```

<br>

### 位运算的位掩码操作:
```js
const READ_PERMISSION = 1; // 0001
const WRITE_PERMISSION = 2; // 0010
const EXECUTE_PERMISSION = 4; // 0100

let userPermission = READ_PERMISSION | WRITE_PERMISSION; // 读取和写入权限

let hasReadPermission = (userPermission & READ_PERMISSION) !== 0; // 检查是否有读取权限
```

<br>

1. 我们将代表权限的数字设置为 二进制中数位为1(开关打开)的数 如:
```js
1:  0000 0001 
2:  0000 0010 
4:  0000 0100 
8:  0000 1000 
16: 0001 0000 
32: 0010 0000
```

2. 如果我们将两个数做 位运算| 则相当于将两个二进制数组装起来 这步对于上面的案例来说 **相当于**将所有的权限存在了数组中 ``[1, 2, 4]``
```js
0000 0001  
0000 0010  |

// 结果:
0000 0011
```

3. 当我们想验证用户是否具有指定的权限时 我们可以拿 步骤2中的结果 和想检验的权限做 位运算&, **相当于**在上述的权限数组中 找某个元素
```js
// 这是步骤2中的结果
0000 0011
0000 0001 &

0000 0001
```

4. 只要是结果不为0 则说明该用户具有该权限

<br>

### 位运算的快速判断奇偶数:
- 奇数的二进制表示的最后一位为 1
- 偶数的二进制表示的最后一位为 0
```js
let num = 5;
let isEven = (num & 1) === 0; // 判断是否为偶数
```

<br><br>

# 获取两个数组中的元素的相互排列组合
```js
function combineArrays(arrays) {
  let result = []
  if (!arrays || arrays.length === 0) {
    return result
  }

  const length = arrays.length
  const maxIndex = length - 1

  const indices = new Array(length).fill(0)

  while (true) {
    const currentResult = []
    for (let i = 0; i < length; i++) {
      currentResult.push(arrays[i][indices[i]])
    }
    result.push(currentResult)

    let indexToIncrement = maxIndex
    while (indexToIncrement >= 0 &&
      indices[indexToIncrement] === arrays[indexToIncrement].length - 1) {
      indexToIncrement--
    }

    if (indexToIncrement < 0) {
      break
    }

    indices[indexToIncrement]++
    for (let i = indexToIncrement + 1; i < length; i++) {
      indices[i] = 0
    }
  }
  return result
}
```

<br><br>

# 判断一个数是否是整型
```js
let num = 1.1
let res = isInteger(num)
console.log(res)

function isInteger(obj) {
  return Math.floor(obj) == obj
} 
```

<br><br>

# 给出固定的和值, 求数组中哪些元素相加等于固定的和值
```js
const arr = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
const target = 14;

function findElements(arr, target) {
  const results = [];
  const len = arr.length;

  function backtrack(start, sum, path) {
    if (sum === target) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < len; i++) {
      const num = arr[i];

      if (sum + num > target) {
        break;
      }

      path.push(i);
      backtrack(i + 1, sum + num, path);
      path.pop();
    }
  }

  backtrack(0, 0, []);

  return results.map((indexes) => indexes.map((index) => arr[index]));
}

console.log(findElements(arr, target));
```

<br>

### 对上优化:
给出和值 返回相加元素的下标
```js
function findIndexes(arr, target) {
  const results = [];
  const len = arr.length;

  function backtrack(start, sum, path) {
    if (sum === target) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < len; i++) {
      const num = arr[i];

      if (sum + num > target) {
        break;
      }

      path.push(i);
      backtrack(i + 1, sum + num, path);
      path.pop();
    }
  }

  backtrack(0, 0, []);

  return results;
}

```

<br><br>

# JS中的枚举类
```js
Object.freeze({
  A: "a"
})
```

<br><br>

# 验证中的位运算

### 场景描述
我们有表单项, 每个表单项都需要验证, 而验证可能不是简单的全等比较 需要经过一系列的逻辑, 这些逻辑都会被封装好一个专门验证字段信息的函数中

我们会取每一个表单项的值, 放到验证函数中, 该函数会返回一个布尔值

<br>

那假如我们有10个表单项, 当验证都通过的情况下 我们才能进行下一步操作 这时就会做这样的判断
```js
if(!field1 || !field2 || !field3 || !field4) return
```

这样条件里面就太了对么 这里介绍一种利用位运算的方式

<br>

### 提交按钮后的回调
我们在点击提交按钮的时候 会先调用验证方法

<br>

**验证方法:**  
每一个字段都会经过验证的函数 返回一个boolean  

我们每返回一个结果 就让他和 res做与运算, 与运算是是11得1, 只要全是true res的结果才会是true

这种方式避免了大量的if条件

```js
validation(data) {

  let res = true

  let {name, age} = data

  let ret1 = this.isValid(name, "name")
  res &= ret1

  let ret2 = this.isValid(age, "age")
  res &= ret2

  return res
},
```

<br>

```js
validateSearhData() {
  let valid = true // バリデーション結果フラグ
  let result // バリデーション結果
  let field // 画面項目名
  const inFrm = this.searchForm // 検索条件
  const errFm = this.searchFormError // エラーメッセージ


  // エラーメッセージを全てクリアする
  Object.keys(errFm).forEach((key) => {
    errFm[key] = null
  })



  // 处理第一个验证结果
  // ++ センターコード ++
  field = 'centerCode'
  result = new Validator().filled().exec(inFrm[field], this.$t('center'))
  errFm[field] = result.message
  valid &= result.isValid



  // 处理第二个验证结果
  // ++ 日付 ++
  field = 'workEndDate'
  result = new Validator().filled().exec(inFrm[field], this.$t('date'))
  errFm[field] = result.message
  valid &= result.isValid


  return valid
},

```

<br><br>

# 比较两个对象的内容
假如有两个对象 我们单独比较 obj1 == obj2 肯定是false 因为地址值不同 一定是false

那假如我就根据两个对象的内容来比较是否相同呢? 

我们可以利用 JSON.stringify() 来比较两个对象字符串化后的内容是否相同

```js
JSON.stringify(obj1) == JSON.stringify(obj2)
```

<br><br>

# 数组 500 内容
```js
const createAToZArray = () => {
  let arr = []
  for (let index = 65; index < 91; index++) {
    arr.push(String.fromCharCode(index))
  }
  return arr
}
const baseArr = createAToZArray()
const computedArray = ref<string[]>([])
const computeAToZArray = (index: number, arr: string[]): string[] => {
  if (index == 500) {
    return arr
  }
  let computeIndex = (index / 26) > 0 ? Math.floor(index / 26) - 1 : index - 26
  arr[index] = (arr[computeIndex] ?? '') + baseArr[index % 26]
  index++
  return computeAToZArray(index, arr)
}
const run = () => {
  console.clear()
  let arr: string[] = []
  arr = computeAToZArray(0, arr)
  console.log("computedArray.value:", arr)
}
```

<br>

# for循环的几种方式:
```js
for(开始前; 循环进行的条件; 循环一次结束后做什么) {
    // 主体代码
}
```

<br>

### 1. 普通方式:
```js
let arr = [1,2,3]

function code(arr) {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

function test() {
  console.time("calc1")
  code(arr)
  console.timeEnd("calc1")
}
```

<br>

### 2. 对上优化:
提取 arr.length 为一个固定的量, 输出速度会比上面快点
```js
function code2(arr) {

  // len = arr.length
  for(let i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i])
  }

}
```

<br>

### 3. 奇葩for:
输出速度 比上面的还快

注意循环条件部分, ``item = arr[i]`` 这里的循环条件类似于
```js
if(a) { ... }  or
if(true) { ... }
```

当i++超出数组的话 获取到的就是undefined 此时才是if(false)停止循环

```js
function code3(arr) {

  for(let i = 0, item; item = arr[i]; i++) {
    console.log(item)
  }

}
```

<br>

### 4. 倒序的循环输出 要比正序的循环输出要快
其实只是因为倒序可以少用一个变量（对比下上一个例子吧）, 除开这点, 两者没有速度差别。
```js
var arr =[1,2,23,...,1000];
var i = arr.length-1;
for(;i >= 0; i--){
    //alert(i);
}
```

<br><br>

# 中奖概率为 30%

## 需求:
点击按钮 1s 后显示是否中奖(30%概率中奖)

<br>

### 1. 定义随机函数
```js
function random(m, n) {
  return Math.floor(Math.random() * (n - m + 1)) + m - 1
}
```

<br>

### 2. 30%的思路
我们把1-100 分为3段 1 - 30 30 - 60 60 - 90 这样每一个段位就是30%的概率

我们使用随机函数获取 1 - 100 之间的一个数字 如果处于 1 - 30 之间 那么就是 30% 的概率

<br>

### 3. 实现方式:

**非Promise:**  
```js
btn.addEventListener("click", function() {
  setTimeout(() => {
    // 获取一个随机数
    let n = random(1, 100)

    if(n <= 30) {
      alert("中奖")
    } else {
      alert("没中奖")
    }
  }, 1000)
})
```

<br>

**Promise:**  
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    let n = random(1, 100)

    if(n <= 30) {
      resolve("中奖")
    } else {
      reject("没中奖")
    }
  })
})

p.then(
  res => console.log(res),
  failed => console.log(failed)
)
```

<br><br>

# 禁止用户输入数字以外的字符 同时数值保持千分位

```js
let inp = document.querySelector("input")

let reg = /[^0-9.]*/g
inp.addEventListener("input", function() {
  this.value = this.value.replace(reg, "")
})

inp.addEventListener("change", function() {
  this.value = Number(this.value).toLocaleString()
})


// https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
let num = 1223233.45
console.log(num.toLocaleString("zh-Hans-CN"))
```

<br><br>

# 测试网络速度
```js
data() {
  return {
    speed: 0
  }
},
async asyncData({$axios}) {
  let start = +new Date()
  let res = await $axios({
    url: "/icon.png"
  })
  let duration = (+new Date() - start) / 1000
  let fileSize = +res.headers["content-length"] / 1024
  let speed = +(fileSize / duration).toFixed(2)

  return {
    speed
  }
},
mounted() {
  console.log(this.speed)
}
```

<br><br>

# 随机取数组中的元素
0.5被选作比较的基准值是为了确保排序结果是随机的, 使得数组元素在排序过程中的位置变得随机。

如果使用其他值, 排序结果可能会有偏差, 不够随机。0.5是一个中间值, 可以在正数和负数之间产生随机性。

<br>

**<font color="#C2185B">arr.sort(() => Math.random() - 0.5).slice(0, 5)</font>**  

```js
let arr = [
  {id:1},
  {id:2},
  {id:3},
  {id:4},
  {id:5},
  {id:6},
  {id:7},
  {id:8},
  {id:9},
  {id:10},
]

// 每一个元素都会过一遍回调 前后两个元素会根据 -0.5 的结果来交换位置 最后我们再截取
let res = arr.sort(() => Math.random() - 0.5).slice(0, 5)
console.log(res)

// 输出结果
0.1050677328442744
-0.2631702578335362
-0.11944201255202058
0.41943630141920796
-0.4160224648879103
-0.4998091468235186
-0.011096190494223945
-0.1409898815683881
-0.11642274030083843

```

<br><br>

# 如何判断网络质量
```js
let domId = "fast"
if(/slow-2g|2g|3g/.test(navigator.connection.effectiveType) {
  domId = "slow"
}) else {
  domId = "fast"
}

document.getElementById(domId).style.display = "block"

function onConnectionChange() {
  const {rtt, downlink, effectiveType, saveData} = navigator.connection

  console.log(`有效网络连接类型: ${effectiveType}`)
  console.log(`估算的下行速度/带宽: ${downlink}Mb/s`)
  console.log(`估算的往返时间: ${rtt}ms`)
  console.log(`打开/请求数据保护模式: ${saveData}`)
}

// 监听 navigator.connection 的 change 事件
navigator.connection.addEventListener("change",onConnectionChange )
```

<br>

**<font color="#C2185B">effectiveType</font>**
值: 2g 3g 4g

wifi 5g 和 4g 和 离线 的情况下 输出也是 4g

但是离线的时候 downlink 会是 0

<br>

**<font color="#C2185B">downlink</font>**
单位: Mb

<br>

**<font color="#C2185B">rtt</font>**
请求需要的时间

<br>

**<font color="#C2185B">saveData</font>**
数据的保护模式

<br><br>

# 并发数控制

## 方式1: 
### 描述: 一回请求几次接口

```js
async function asyncPool(poolLimit, arr, iteratorFn) {

  // 存储所有的异步任务
  const ret = []

  // 存储正在执行的异步任务
  const executing = []

  // 对arr任务数组进行循环
  for(const item of arr) {

    // 调用 iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, arr))

    // 保存新的异步任务
    ret.push(p)

    // 当poolLimit值小于或等于总任务个数时 进行并发控制
    if(poolLimit <= arr.length) {
      // 当任务完成后 从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))

      // 保存正在执行的异步任务
      executing.push(e) 

      // 如果执行的任务 > 限制
      if(executing.length >= poolLimit) {
        // 进来后使用 race() 方法 捕获err
        await Promise.race(executing.map(function(item) {
          return item.catch(function(err) {
            return err
          })
        }))
      }
    }
  }

  // 使用 promise.all 对err进行处理
  return Promise.all(ret.map(function(item) {
    return item.catch(function(err) {
      return err
    })
  }))
}

const timeout = (i, x) => new Promise(
  
  (resolve, reject) => {
  setTimeout(() => {
    console.log(i)

    if(i == 2000) {
      reject({err: i})
    } else {
      resolve({success: i})
    }
  }, i)

})

asyncPool(2, [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000], timeout).then(res => {
  console.log("res: ", res)
})
```

<br><br>

## 方式2:

### 描述:
前面页面中需要同时发送20个请求, 但是服务器端有限制 需要前端控制并发数 保证最多只能同时发送10个请求

<br>

### 需求:
- 最多同时执行的任务数为10个
- 当前任务执行完成后 释放队列空间 自动执行下一个任务
- 所有任务添加到任务队列后 自动开始执行任务 
```js
function createTask(i) {
  return () => {
    return new Promise((resolve, reject) => {
      // 将每次传入的 i 进行 resolve
      setTimeout(() => {
        resolve(i)
      }, 2000)
    })
  }
}


class TaskQueue {

  constructor() {
    // 设置最大并发数
    this.max = 10;

    // 存储任务
    this.taskList = []

    // 当任务全部添加完毕后自动执行
    setTimeout(() => {
      this.run()
    })
  }

  // 添加任务到队列 -- 同步方法
  addTask(task) {
    this.taskList.push(task)
  }

  // 自动执行任务队列
  run() {
    // 获取任务队列中的数量
    const length = this.taskList.length

    // 如果 length 为0 代表所有的任务完成
    if(!length) {
      return
    }

    // 大于 max 取 max 如果 任务队列的长度 < max 取队列的长度 保证并发数量不会超过10
    const min = Math.min(this.max, length)

    // 取出任务队列中的任务执行
    for(let i = 0; i < min; i++) {
      // 将max的值进行 -- 操作 开始占用一个任务的空间
      this.max--

      const task = this.taskList.shift()
      task().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 上面 max-- 占用空间 现在要释放一个任务空间
        this.max++

        // 因为自动执行下面的任务
        this.run()
      })
    }
  }
}

const taskQueue = new TaskQueue()

// 初始化 20 个任务
for(let i = 0; i < 20; i++) {
  const task = createTask(i)

  // 将任务添加到 队列后自动执行
  taskQueue.addTask(task)
}
```

<br><br>

## 方式3:

### 需求:
3个为一组 看看3个中哪个先完成 3个中完成一个的话 就将这个踢出去从剩下的4个中再追加进来

```js
// url 7个
const urls = [
  "bytedance.com",
  "tencent.com",
  "alibaba.com",
  "apple.com",
  "hulu.com",
  "amazon.com",
  "microsoft.com"
]

// 需求 3个为一组 看看3个中哪个先完成 3个中完成一个的话 就将这个踢出去从剩下的4个中再追加进来

// 并发的类
class PromisePoll {
  constructor(max, fn) {
    // 最大并发数
    this.max = max
    // 自定义请求函数
    this.fn = fn

    // 并发池 让池子里面始终保持3个
    this.pool = []

    // 剩余的请求地址
    this.urls = []
  }

  start(urls) {
    this.urls = urls

    // 循环把并发池塞满 < 最大并发数就一直往里面塞
    while(this.pool.length < this.max) {

      // 拿到队列前的 url
      let url = this.urls.shift()
      this.setTask(url)
    }

    // 前3个执行完了 需要补充
    // 利用 promise.race 方法 来获取并发池中某个任务完成的信号
    let race = Promise.race(this.pool)
    this.run(race)
  }

  setTask(url) {
    if(!url) return 

    // 让 fn 执行 返回一个 task
    let task = this.fn(url)

    // 将返回的promise -- 任务 推到pool并发吃中
    this.pool.push(task)
    console.log(`${url}开始, 当前的并发数: ${this.pool.length}`)

    task.then(res => {
      // 请求结束 将 该promise任务从并发池中移除
      this.pool.splice(this.pool.indexOf(task), 1)

      console.log(`${url}结束, 当前的并发数: ${this.pool.length}`)
    })
  }

  run(race) {
    // 执行完成
    race.then(res => {
      // 每当并发池中完成一个任务 就再塞入一个任务
      // 到then里面 当前的任务说明成功了 我们就再塞进来一个
      let url = this.urls.shift()
      this.setTask(url)
      this.run(Promise.race(this.pool))
    })
  }

}

// 模拟的异步请求函数
let n = 0
let requestFn = url => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务${url}完成`)
    }, 1000 * n++)
  }).then(res => {
    console.log("外部逻辑: ", res)
  })
}
// 并发数为3
const pool = new PromisePoll(3, requestFn)

pool.start(urls)
```

<br>

## 方式4: 

### 需求:
实现一个 dispatch 函数 可以接受多个函数做为参数 每个函数作为一个任务 并返回一个promise 限制同时执行的任务次数

```js
// 每次任务是函数 返回一个 promise
type Task<T = any> = () => Promise<T>

// dispatch函数的类型定义 
// 限制同时执行的任务次数 比如我们传入5个任务 它最大执行数是3 那么只有当前3个任务执行完毕后 才会执行下一个任务
type Dispatch = (...task: Task[]) => void



// 因为我们要定义最大的执行量 这里利用了闭包 捕获 max
function createTaskDispatch(max = 5): Dispatch {

  // 没有被执行到的 tasks
  const untouchedTasks: Task[] = []

  // 声明一个函数让其消耗 untouchedTasks 队列
  // 使用防抖 保证连续调用 drainUntouchedTask 的时候只有后面的一次生效
  const drainUntouchedTask = debounce(() => {
    // 当 数组 > 0 的时候才会一个个取出执行
    while(max > 0 && untouchedTasks.length > 0) {
      // 取出一个任务来执行 当数组长度为0的时候可能会返回null 所以我们要定义 ! 表示确认不为0
      const task = untouchedTasks.shift()!

      /*
        如果我们直接执行 drainUntouchedTask 因为循环它会一直取数组中的task 拿出来执行 执行完所有的 这样起步到限制的作用 所以我们利用 max

        假设我们有10个任务 推到数组中后我们开始 drainUntouchedTask 当 drain5个的时候 max已经减为0了 那么当下一次while循环的时候 发现 max == 0 就不符合条件了 那么整个while 都会被退出

        当task()执行完后 max会加回来 当加回来后我们再次的调用 drainUntouchedTask

        请尝试将 `lib` 编译器选项更改为 es2018 或更高版
      */ 
      // 每当拿出来后 准备执行之前
      max--
      // 执行完后 将max++ 加回来
      task().finally(() => {
        max++

        // 当max加回来后 我们再次的调用 drainUntouchedTask 执行剩下的队列中的任务
      })
    }
  })

  return function dispatch(...task: Task[]): void {
    // 每当执行 dispatch 的时候 将所有的task丢进untouchedTasks
    untouchedTasks.push(...task)

    // 这样有一个问题 每当我们push的时候 都会频繁的调用drainUntouchedTask
    drainUntouchedTask()
  }
} 


// 测试用例
const dispatch = createTaskDispatch(3)

// 该函数会返回一个 promise 8秒后会打印 hello
const sayHello: Task = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("hello")
      resolve()
    }, 800)
  })
}


// 版本2
const sayHello = (num: number): Task => {
  return () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log("hello", num)
        resolve()
      }, 800);
    })
  }
}

dispatch(sayHello, sayHello, sayHello, sayHello, sayHello)
```

<br><br>

# 主线程 setTimeout promise 三条路的验证:

### 验证1: **回调** 和 **setTimeout** 的优先级
我觉得如下的回调 就相当于同步 只不过是将一段逻辑封装起来在同步逻辑中进行调用而已

```js
console.log("主线程")

// 异步
setTimeout(() => console.log("setTimeout"), 0)

// 回调
function fn(cb) {
  console.log(1)
  cb()
}

// 传入匿名
fn(() => {
  console.log(2)
})

// 结果
主线程
1
2
setTimeout
```

<br>

### 验证2: 主线程 setTimeout then 的优先级
**结果:**  
- 主线程优先
- 微任务队列其次
- setTimeout最后

```js
console.log("主线程")

Promise.resolve().then(() => {
  console.log("then1")
})
Promise.resolve().then(() => {
  console.log("then2")
})
Promise.resolve().then(() => {
  console.log("then3")
  return Promise.resolve("then3")
}).then(res => {
  console.log("then4" + res)
})

setTimeout(() => console.log("setTimeout"), 1000)
```

<br>

### 验证3: promise + setTimeout 和 setTimeout 的优先级
**结果:**  
- 主线程优先
- new Promise里面是同步代码 执行了 setTimeout 这里往队列里面推了一次 而外面的 setTimeout 又推了一次

**这里就看秒数**  

比如下面 promise里面的setTimeout是2秒 所以它会比外面的setTimeout慢  

外面的setTimeout优先执行 相当于都是往 队列中 推setTimeout
```js
console.log("主线程")

// promise中是同步 都是推 setTimeout 看ms数 看谁先推进去
function fn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("promise")
    },2000)
  })
}

fn().then(res => {
  console.log(res)
})

setTimeout(() => console.log("setTimeout"), 1000)

// 结果:
setTimeout
promise
```

<br>

### 验证4: promise + 同步while 和 setTimeout
上面我们在 promise 中使用了 setTimeout 所以相当于都是在往 setTimeout 里面推

这里我们使用 同步 while 这样也是指定时间

<br>

**结果:**  
主线程优先   
然后等待指定秒数的 微任务队列执行完毕后 才会执行 setTimeout
```js
console.log("主线程")
    
let start = +new Date()
function fn() {
  return new Promise(resolve => {
    while(true) {
      let end = +new Date()
      if((end start) >= 5000) {
        resolve("promise")
        break
      }
    }
  })
}

fn().then(res => {
  console.log(res)
})

setTimeout(() => console.log("setTimeout"), 1000)

// 结果:
promise
setTimeout
```

<br><br>

# 微任务队列 拿到 主线程的执行结果
以下说明主线程往arr里面push后 微任务队列中可以拿到arr的结果
```js
// 主线程往 arr 中推了 0-9
let arr = []
for(let i=0; i<10; i++) {
  arr.push(i)
}

console.log("主线程")

// 微任务队列中 循环取出arr中的值
let temp = null
Promise.resolve().then(() => {
  while(true) {
    if(arr.length <= 0) break

    temp = arr.shift()
    console.log(temp)
  }

  console.log(arr)
})

// 测试用的主线程代码
console.log("主线程2")

// 结果:
主线程
主线程2

// 后面才是微任务队列中的代码
0
1
2
3
4
5
6
7
8
9
[]
```

<br><br>

# 按照数组对象中的指定字段排序
### **思路1: 在数据对象中 添加排序用的字段**
```js
let data = [
  {createTime: "2022-08-28 16:18:00"},
  {createTime: "2022-08-28 15:18:00"},
  {createTime: "2022-08-28 09:18:00"},
]

// 将日期转成时间戳 利用时间戳排序
let res = data.map(item => {
  let date = +new Date(item.createTime)
  item.flag = date

  return item
}).sort((a, b) => a.flag - b.flag)
```

<br>

### **思路2: 字符串1.localeCompare(字符串2) 比较字符串**
```js
// 利用 localeCompare 方法 对字符串进行排序
data.sort((a, b) => a.createTime.localeCompare(b.createTime))
```

<br><br>

# 模拟定时器 同步
```js
let index = 1
let start = +new Date()

while(true) {

  try {
    let end = +new Date()
    duration = end - start

    if(duration >= index * 1000) {

      index++
      num++
    }
  }
}
```

<br><br>

# 一个函数中两个 while
因为函数中是同步代码 会先跑完第一个while 然后再跑第二个while 也就是说会阻塞下面的代码执行
```js
let flag = 0

function test() {
  
  // 会将这个 循环 全部跑完后
  while(flag < 20) {
    console.log("第一个 while -----:", flag)
    flag++
  }

  // 再执行这个循环
  while(flag < 30) {
    console.log("第二个 while +++++ :", flag)
    flag++
  }

}

test()
```

```js
// 测试 一个函数中 两个 while
let flag = 0

function test() {
  

  while(true) {
    console.log("第一个 while -----:", flag)
    flag++

    // 退出循环
    if(flag == 100) break
  }

  // 这个while不会执行 因为上面一个执行完后 flag为100 不会进入到这个while
  while(flag < 30) {
    console.log("第二个 while +++++ :", flag)
    flag++
  }

}
/*
  前一个while走完 才会执行下一个while
  如果第一个while的退出条件 > 第二个while 那么第二个while可能不会执行
*/
test()
```

<br><br>

# 合并对象 指定属性其值类型为数组
```js
let strats = {}
let targets = [
  "fn",
  "say"
]


targets.forEach(name => {

  /*
    函数中接收到两个参数 p n 为
    fn的回调 和 say的回调
  */
  strats[name] = function(p, n) {

    // 第一次合并的时候 Vue.options 是空的 p没有值(空对象中哪有东西) 我们考虑n的情况
    if(n) {

      // 如果有 n 这里还有两种情况

      if(p) {
        
        // 到这里是就有 n p, 那就是说之前的options里面有该函数名 那该函数名对应的肯定是一个数组所以我们将n push到数组中
        return p.concat(n)

      } else {

        // 到这里就是 有 n 没 p, 那就是说之前的options里面没有 该函数名 那我们就将 n回调 包成一个数组 return出去 相当于 fn: [fn]
        return [n]
      }
    
    // 没 n 的情况 没有n的话 我们直接将 p return出去 将p回调 放到 options 对象中
    } else {
      return p
    }

  }
})

let options = {}

let test = {}

let test1 = {
  name: "sam",
  age: 18,
  fn: function() {
    console.log("fn-sam")
  },
  say: function() {
    console.log("我是sam")
  }
}

let test2 = {
  name: "erin",
  job: "design",
  fn: function() {
    console.log("fn-erin")
  },
  say: function() {
    console.log("我是erin")
  }
}

options = mergeOptions(test, test2)

// 创建合并选项的函数
function mergeOptions(prev, next) {
  let options = {}

  // 遍历 两个对象 这样相当于拿到了 两个对象中的 key value
  for(let key in prev) {
    mergeField(key)
  }

  for(let key in next) {
    // 这里我们要将 prev 没有合并的部分 合并
    if(!prev.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  // 我们就可以将 key value 放到 options 中 以next为准 (next中要是有就放next的) 我们将这部分操作也封装成一个方法
  function mergeField(key) {
    
    if(strats[key]) {
      // 函数调用会拿到返回值 返回值会放到options对象中 类似:[fn]
      options[key] = strats[key](prev[key], next[key])

    } else {
      options[key] = next[key] || prev[key]
    }
  }
  
  return options
}

console.log(options)

// 再次合并看看结果
options = mergeOptions(options, test1)
console.log(options)
```

<br><br>

# 拷贝数组
```js
let flushQueue = queue.slice(0)
```

<br><br>

# 主线程执行完毕后 统一刷新队列 (批处理逻辑)
我们将主线程的逻辑依次推到队列中 然后利用 setTimeout 将刷新队列的操作放到异步
```js
// 去重用
let has = {}
let data = [
  {
    id: 1,
    name: "sam"
  },
  {
    id: 1,
    name: "sam"
  },
  {
    id: 2,
    name: "erin"
  },
]

// 主线程中的任务队列
let queue = []

// 节流阀用
let pending = false

data.forEach(item => {
  if(!has[item.id]) {

    // 往队列中push
    queue.push(item)
    has[item.id] = true 

    /*
      利用节流阀逻辑 这样只会触发一次 同时也能拿到queue的最终结果
    */
    if(!pending) {
      setTimeout(() => {
        console.log("操作")
      }, 0)

      pending = true
    }
    
    
    // 如果是这样循环有几次 会触发几次 所以要使用节流阀
    /*
    setTimeout(() => {
      console.log(queue)
      console.log("操作")
    }, 0)
    */

  }
})

console.log("主线程代码1")
console.log("主线程代码2")
```

<br>

上面是使用了 setTimeout 我们还可以使用 promise
```js
export function nextTick(cb) {
  callbacks.push(cb)

  if(!waiting) {
    // 这里!!!
    Promise.resolve().then(flushCallbacks)
  }

  waiting = true
}
```

<br><br>

# new Function() 的使用方式
将传入的参数 返回一个函数

### **<font color="#C2185B">new Function(参数):</font>**  
它会返回一个函数 参数会作为返回的匿名函数的函数体

```js
let fn = new Function("参数部分")
console.log(fn)
/*
  ƒ anonymous() {
    参数部分
  }
*/


// 例如:
let fn = new Function("console.log(11)")
console.log(fn)
fn()  // 11
```

那假如我们在参数部分这么写的话 该参数会被认为是一个变量  
如果不想被认为是一个变量 我们需要 'name' 加上引号
```js
let fn = new Function("console.log(name)")
// name 会被当成变量 读不到就是空

// 不想让name作为变量的情况下
let fn = new Function("console.log('name')")
```

那 name 变量应该去哪读呢? 接下 with

<br><br>

# with(this) { 函数体中出现的变量会自动从this中找 }

### **<font color="#C2185B">with(this) { }:</font>**  
**形参:**  
我们指定 从 哪 读变量 指定后 函数体中出现变量就会从 形参中读取

我们可以把 with 函数 理解成 自执行函数  

注意下面的代码 with 函数没有调用 console.log(name) 却执行了

或者  

我们可以把 with 函数 理解成一个提供 源 的代码 起到通过 **包裹** 目标代码 给目标代码提供源的**结构** 本身不是一个函数

我们可以忽视 with() { ... } 这部分结构 但是它提供了源

```js
let source = {
  name: "sam",
  test(content) {
    console.log(content)
  }
}

// 当函数体中出现变量的情况下 我想指定从哪读变量 我就将目标传入到参数的位置
with(source) {

  // name 会自动从 source 中找
  console.log(name)   // sam
}
```

<br><br>

# new Function() + with() 结合的使用方式
我现在想根据一字符串生成一个函数 但是字符串中有变量 我想提供变量的来源

```js
// 来源
let source = {
  name: "sam"
}

// with结构: 可以不用看 只看with函数体就可以 函数体会作为 new Function 返回函数的函数体 with提供了源
let str = "with(source) { console.log(name) }"
let fn = new Function(str)
fn()


// 如果with我们传入的是this 我们也可以手动的指定this
let str = "with(this) { console.log(name) }"
let fn = new Function(str)
fn.call(source)
```

<br>

既然 with的函数体是 new Function的函数体 那么我们是不是也可以添加 return
```js
let source = {
  name: "sam",
  test(content) {
    console.log(content)

    // test()函数有返回值了
    return 1
  }
}

let str = "test(111)"

// 这里return了
str = `with(this) { return test(111) }`

let fn = new Function(str)

// 我们就可以接收返回值
let res = fn.call(source)
console.log(res)    // 1
```

<br><br>

# node环境中 ``console`` 技巧
我们有的时候 console 会提示 ``[Object]`` 这时我们可以
```js
console.dir(stack, {depth: null})
```

<br><br>

# 双向绑定原理

### 类中的this不都是指向实例  
    
- 我们给元素绑定事件 事件的回调中 this就是元素  
- getter setter 方法中的 this 指向的是 源对象
```js
defineProperty(data, key, {get, set})
// 指向参数data
```

```html
<body>  
  <input type="text" value="">
</body>

<script>
  let oInp = document.querySelector("input")

  let source = {
    defaultVal: "sam"
  }

  class Reactive {

    constructor(options = {}) {
      let {data, el} = options

      this.data = data
      this.el = el

      this.init()
      this.initEvent()
      this.walk()
    }

    init() {
      this.el.value = this.data.defaultVal
    }

    initEvent() {
      // 将实例this保存在 _this 身上
      let _this = this

      this.el.addEventListener("input", function(e) {
        // 这个this是inp
        // console.log(this)
        _this.data.defaultVal = this.value
      })
    }

    walk() {
      // 将实例保存在 instance 上 传递给set使用 不然 setter中的this指向它自己的对象
      let instance = this

      Object.keys(this.data).forEach(key => this.defineReactive(this.data, key, this.data[key], instance))
    }

    defineReactive(data, key, value, instance) {
      Object.defineProperty(data, key, {
        get() {
          return value
        },
        set(val) {
          value = val
          // 这里的this指向的是 data
          // console.log(this)
          instance.el.value = value
          console.log(instance.data.name)
        }
      })
    }
  }

  new Reactive({
    el: oInp,
    data: source
  })
</script>
```

<br>

### 更新数据刷新页面
```html
<body>   
  <h1></h1>
</body>

<script>
  let oH1 = document.querySelector("h1")
  let source = {
    name: "sam"
  }

  // 初始化 dom 中的数据
  oH1.innerHTML = source.name
  
  // 重写 source 对象 定义 getter setter
  const defineReactive = (data, key, value) => {
    Object.defineProperty(data, key, {
      get() {
        return value
      },
      set(val) {
        value = val
        // 当设置值的时候 我们可以更新dom中的数据
        oH1.innerHTML = source.name
      }
    })
  }
  Object.keys(source).forEach(key => defineReactive(source, key, source[key]))
</script>
```


<br><br>

# 将耗时任务放到微任务队列 让出主线程
有些情况下 我们主线程中 会有耗时的操作 这时会让页面卡顿 比如前端解析excel文档 当文档数据很多的情况下 前端就要卡顿

```js
// 下面模拟下 主线程的耗时操作
let start = +new Date()
let num = 0
while(true) {
  let end = +new Date()
  if((end - start) > 5000) {
    console.log("我要结束了")
    break
  }
}

console.log("我是下面的逻辑")
```

如上: 上面的会等5秒后再执行下面的逻辑 这时候我们就可以将耗时的操作 移动到微任务队列里面

```js
// 将耗时的逻辑封装起来
function consumingTimeLogic() {
  let start = +new Date()
  while(true) {
    let end = +new Date()
    if((end - start) > 5000) {
      console.log("我要结束了")
      break
    }
  }
}


// 在 promise 中 利用 setTimeout 将上面的逻辑送到微任务队列
function handleConsumingTimeLogic() {
  return new Promise(resolve => {
    setTimeout(() => {
      // 利用 promise 将 函数本身 移动到 微任务队列中执行
      resolve(consumingTimeLogic)
    }, 100)
  })
}

handleConsumingTimeLogic().then(fn => {
  // 拿到微任务队列后再调用执行
  fn()
})

// 这里不会影响到主线程中的逻辑
console.log("我是下面的逻辑")
```

<br><br>

# 文件上传
当我们使用组件库的时候 有上传的插件 如果我们用现成的插件实现起来比较简单

但是如果我们要对其做一些优化 做一些处理的话 可能使用组件的功能的这种做法就不行了

<br>

## 文件上传需要的知识点:

### <font color="#C2185B">[input type=file]</font>
**标签属性: accept**   
可选择的文件类型: "image/*"

<br>

**标签属性: multiple**    
允许用户选择多个文件

<br>

**选取的文件集合: FileList**  
通过 *this.files* 获取 是一个类数组 里面有每一个上传的 File 对象
```s
0: file
name: "1.png"
size: 88898
type: "image/png"
length: 1
```   

<br>

### 前端代码:
```html
<!-- accept: 选择的时候 允许上传什么类型  -->
文件上传<input type="file" id="file" accept="image/*">
```

<br>

### 限制上传文件大小:
js中获取 file 对象后 根据 file.size 来进行判断
```js
let file = this.files[0]

if(file.size >= 1024 * 1024) return alert("上传的图片必须在1mb以上")
```

<br>

### 限制文件的类型:
- 可以在标签中 使用 accept 属性
- js中获取 file 对象后 根据 file.type 来进行判断
```js
// 正则
if(!/(jpg|jpeg|gif|png)/i.test(file.type)) return alert("文件类型必须是指定的类型")

// includes
if(!file.type.includes("image")) return alert("文件类型必须是图片！")
```

<br>

### 缩略图功能
- 在 html 部分 预留显示缩略图的位置
- 在 js 部分使用 FileReader 读取文件 读取方式是异步读取 所以 要使用 onload 事件

<br>

### **<font color="#C2185B">reader.readAsDataURL(file)</font>**
将 file 读取成 base64 格式 url

<br>

### **<font color="#C2185B">reader.readAsArrayBuffer(file)</font>**
将 file 读取成 blob 或 buf 格式  
做 **断点上传** 或 **切片上传** 的时候经常会用到

<br>

通过 e.target 或 this.result 拿到读取后的结构 赋值给 img.src

```html
文件上传<input type="file" id="file" accept="image/*" multiple>
<div class="img-area">
  <!-预览 -->
  <img src="" alt="" id="thumb">
</div>

<script>
  let oInput = document.getElementById("file")
  let oImg = document.getElementById("thumb")

  // 给 input 绑定 change 事件
  oInput.addEventListener("change", function() {

    // this.files 就是所有上传文件的 列表
    let file = this.files[0]
    console.log(file)

    // 如果没有选择图片则 return
    if(!file) return


    // 预览逻辑
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(e) {
      oImg.src = this.result
    }

  })
</script>
```

<br>

**注意:**   
上述我们获得 this.result 是 FileReader 转换后base64后的结果 这个结果不能用
```js
URL.createObjectURL() 
```

上面的方法将其转换为 urlobject 因为 该方法是用来<font color="#C2185B">转换 blob 类型</font>的  
而我们使用 readAsDataURL 后得到结构是 base64字符串
```js
// createObjectURL是将 blob 格式的数据 转换为 urlObjrct 所以下面的使用  方式不对  !!!
let url = URL.createObjectURL(this.result)  // x
```

<br>

### 优化前端页面效果 正式开始上传逻辑:
我们先优化下 页面效果
```html
<style>
.thumb-area {
  margin-top: 20px;
  width: 200px;
  height: 200px;
}

.thumb-area img {
  width: 100%;
  height: auto;
  vertical-align: bottom;
}

#file {
  display: none;
}

#upload-btn {
  outline: none;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  background-color: palevioletred;
  color: #fff;

  cursor: pointer;
}

.upload-info {
  font-size: 14px;
  margin-top: 20px;
  display: none; 
}

.upload-info span {
  color: palevioletred;
}

#upload-btn.disable {
  background-color: rgb(218, 218, 218);
  color: #696969;
  cursor: not-allowed;
}
</style>


<body>
  <button id="upload-btn">文件上传</button>
  <input type="file" id="file" accept="image/*" multiple >

  <!-- 上传进度 -->
  <div class="upload-info">
    您选取的文件「 <span></span> 」正在上传中...
  </div>

  <!-- 缩略图 -->
  <div class="thumb-area">
    <img src="" alt="" id="thumb">
  </div>
</body>
```

<br>

### 要点:
将真正的 input=file 隐藏 因为太丑 我们使用 button 按钮来模拟
```js
uploadBtn.addEventListener("click", function() {
  oInput.click()
})
```

<br>

我们给 button 绑定的 click 事件 内部模拟点击 input=file  

同时我们还要给 input=file 绑定 onchange 事件 在上传文件的时候会触发回调
```js
oInput.addEventListener("change", function(e) {
}
```

<br>

### 逻辑:
页面结构中上传进度部分开始是隐藏的 用于在响应还没有回来的时候进行展示  

当上传成功后 隐藏上传进度部分展示缩略图的结构 这时候就代表上传完成  

同时我们还要注意当一张图片在上传的时候 按钮不应该再次被点击

<br>

### 单张图片上传: 
使用 formdata 上传
```js
;(function() {

  let uploadBtn = document.querySelector("#upload-btn")
  let oInput = document.getElementById("file")

  let thumbArea = document.querySelector(".thumb-area")
  let thumbImg = thumbArea.querySelector("img")

  let infoArea = document.querySelector(".upload-info")
  let infoMsg = infoArea.querySelector("span")

  
  // 隐藏了 input=file 使用button按钮来模拟点击 input=file 
  uploadBtn.addEventListener("click", function(e) {
    e.preventDefault()
    if(this.className.includes("disable")) return
    oInput.click()

    return false
  })

  // 给 input 绑定 change 事件 当有图片上传的时候会触发这个回调
  oInput.addEventListener("change", async function(e) {
    e.preventDefault()
    // debugger
    let file = this.files[0]

    // 如果没有选择图片则 return
    if(!file) return


    // 选中文件后 展示 上传中... 的逻辑
    infoMsg.innerHTML = file.name
    infoArea.style.display = "block"

    // 当我们一张图片在上传的过程中 「文件上传」 按钮不能被点击
    uploadBtn.classList.add("disable")


    // 将选中的文件上传到服务器
    // 方案1: 基于 form-data
    let formdata = new FormData()
    // 上传文件 k v
    formdata.append("file", file)
    // 上传文件的文件名
    formdata.append("filename", file.name)


    let {data: res} = await axios({
      url: "http://127.0.0.1:3000/single1",
      method: "post",
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      data: formdata
    })


    if(res.code == 200) {
      
      // 展示 上传中... 的逻辑 隐藏
      infoMsg.innerHTML = ""
      infoArea.style.display = "none"

      // 展示 缩略图
      thumbImg.src = res.path
      thumbArea.style.display = "block"

      // 取消 按钮禁止点击的样式
      uploadBtn.classList.remove("disable")

    // 当 code 不是 200 的时候 也可以做响应的处理
    }

    return false
  })

})();
```

<br>

### 后台代码:
**要点:** 后台代码里面使用 ``express-fileupload`` 插件

```js
const express = require("express")
const {resolve} = require("path")
const multer = require("multer")
const cors = require("cors")
const uploader = require("express-fileupload")
const app = express()

let upload = multer({ dest: 'images' })

app.use(uploader())
app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 访问静态资源文件的话 不用带 目录名 localhost:3000/case.jpg
app.use(express.static(__dirname + "/images"))

app.get("/", (req, res) => {
  res.send("我是主页哦")
})

// 前端基于 formdata 上传文件
app.post("/single1", (req, res) => {

  if(!req.files) return res.status(400).json({msg: "未上传图片"})
  
  // file是前端指定的字段名
  let {file} = req.files

  // mv() 第一个参数是 图片的保存目录 后面带文件名 xxx/xxx.js
  let filePath = resolve(__dirname, "images", `${file.name}`)
  file.mv(filePath, err => {

    if(err) return res.send({
      code: 400,
      msg: "上传失败",
      err
    }) 

    res.send({
      code: 200,
      fileName: file.name,
      path: `http://localhost:3000/${file.name}`
    })
  })
})

app.listen(3000, (req, res) => {
  console.log("已监听 3000 端口")
})
```

<br>

**注意:**   
在 vscode 起前端项目的时候 最好使用 node 或者 webpack 来起项目 不然上传文件后 会刷新页面

<br>

### 单张图片上传:
**要点: 使用 base64 上传** 

- 将用户选择的图片 使用 fileReader 读成 base64
- 使用 axios 的时候 请求头 要设置为 url编码格式
- Qs引入后 全局多了一个 Qs 对象

<br>

**注意:**   
base64图片不能太大 要切片上传

```js
headers: {
  "Content-Type": "application/x-www-form-urlencoded"
},
```

<br>

因为请求头设置了 url编码格式 请求体 要通过 Qs 将参数转换成 url编码格式

<br>

**注意:**  
一般我们会对 base64 的值进行 ``encodeURIComponent()`` 编码 这样在传输的时候 数据不会丢失
```js
let params = {
  // 这里看下
  chunk: encodeURIComponent(base64),
  filename: file.name
}

let {data: res} = await axios({
  url: "http://127.0.0.1:3000/single2",
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  // headers指定的 url编码格式 我们的 data 请求体 也要通过 Qs 转换为 url编码格式
  data: Qs.stringify(params)
})
```

<br>

### 前端代码部分:
```js
oInput.addEventListener("change", async function(e) {
  e.preventDefault()
  // debugger
  let file = this.files[0]

  // 如果没有选择图片则 return
  if(!file) return

  // 选中文件后 展示 上传中... 的逻辑
  infoMsg.innerHTML = file.name
  infoArea.style.display = "block"

  // 当我们一张图片在上传的过程中 「文件上传」 按钮不能被点击
  uploadBtn.classList.add("disable")

  
  // 将选中的文件上传到服务器


  // 方案2: 把选择的文件 Base64 后 传递给服务器
  let base64 = await fileReader(file)
  
  // console.log("base64", base64)
  // 打印结果: data:image/jpeg;base64, 后面是数据

  // 将 base64 传递给后台
  // base64的post请求 需要注意请求头
  let params = {
    chunk: base64,
    filename: file.name
  }

  let {data: res} = await axios({
    url: "http://127.0.0.1:3000/single2",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // headers指定的 url编码格式 我们的 data 请求体 也要通过 Qs 转换为 url编码格式
    data: Qs.stringify(params)
  })


  if(res.code == 200) {
    
    // 展示 上传中... 的逻辑 隐藏
    infoMsg.innerHTML = ""
    infoArea.style.display = "none"

    // 展示 缩略图
    thumbImg.src = res.path
    thumbArea.style.display = "block"

    // 取消 按钮禁止点击的样式
    uploadBtn.classList.remove("disable")
  }

  return false
})


// 因为 读取文件的这个过程也是一个异步的 所以我们封装一个 promise
function fileReader(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    // 将文件读取为 base64
    reader.readAsDataURL(file)

    reader.onload = function() {
      resolve(this.result)
    }

    reader.onerror = function(err) {
      reject(err)
    }
  })
}
```

<br>

### 后台逻辑: 
- 获取 base64 编码
- 将 base64 decodeURIComponent
- 将 base64 特有前缀去掉
- 将 base64 转换为 buf
- 调用 fs.writeFileSync() 方法将 buf 写成文件

- new SparkMD5.ArrayBuffer的使用方式不太清楚

```js
app.post("/single2", (req, res) => {
  
  // chunk就是 base64 编码
  let {chunk, filename} = req.body;
  console.log(filename)

  // chunk的处理: 转换为buffer
  chunk = decodeURIComponent(chunk);
  chunk = chunk.replace(/^data:image\/\w+;base64,/, "");
  chunk = Buffer.from(chunk, 'base64');

  // 存储文件到服务器
  // let spark = new SparkMD5.ArrayBuffer()
  let path = resolve(__dirname, "images", filename)
  // spark.append(chunk);
  fs.writeFileSync(path, chunk);

  res.send({
    code: 200,
    fileName: filename,
    path: `http://localhost:3000/${filename}`
  });
})
```

**大文件上传, 断点续传, 文件秒传 待整理**

<br><br>

## 多文件上传

### 前置知识点:
### **<font color="#C2185B">Promise.all([promise数组])</font>**

它会等所有的promise都成功返回都 才会返回结果  
返回的结果也是promise
```js
(async () => {
  let p1 = new Promise(resolve => {
    resolve("p1")
  })
  
  let p2 = new Promise(resolve => {
    resolve("p2")
  })
  
  let p3 = new Promise(resolve => {
    resolve("p3")
  })
  
  let pArr = [p1, p2, p3]

  // 它的返回值也是一个 promise 
  let res = await Promise.all(pArr)
  console.log(res)  // [ 'p1', 'p2', 'p3' ]
})()
```

我们可以使用异步读取文件然后放在 promise.all里面处理

<br>

### **<font color="#C2185B">onUploadProgress(e) {}</font>**
在 axios 里面要监控上传进度 在 配置对象中添加 onUploadProgress(e) {} 回调  

- e.loaded: 已经加载的  
- e.total: 总共要加载多少

通过这两个值就可以算出 %

```js
let {data: res} = await axios({
  url: "http://127.0.0.1:3000/single2",
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },


  // 创建进度监测
  onUploadProgress(e) {
    // e.loaded: 已经加载的
    // e.total: 总共要加载多少
    let radio = e.loaded / e.total * 100 + "%"

    // 控制 card 下的 progress 下的 line 盒子
    card.querySelector(".line").style.width = radio
  },


  data: Qs.stringify(params)
})
```

<br>

### 前端html部分:
```html
<section class="uploadBox clearfix">
  <div class="card button">
    <input type="file" id="uploadInp" accept="image/*" multiple>
  </div>

  <div class="card">
    <img src="./src/assets/images/case1.jpg" alt="">
    <div class="progress">
      <div class="line"></div>
    </div>
    <div class="mark"></div>
  </div>
</section>
```

<br>

**要完成的效果:**  
点击 添加图片 按钮 + ``(<div class="card button">)``  
会弹出文件选择框 选择多少文件动态创建多少 ``<div class="card">`` 结构

每个card里面还要有选择那张文件的缩略图(拿到base64的值做缩略图)

该结构上 底部有进度条 和 上面有遮罩层 进度条会随着真实的上传速度走 当上传完毕后 遮罩层消失

<br>

### 前端代码逻辑:
后台还是使用的 single2 接口

<br>

**要点:**  
- 文档碎片的利用
- Promise.all([])的利用 **重点**

我们可以将 读文件的异步过程 封装成一个 promise 方法 然后得到一个 promise 数组 利用 Promise.all() 来读取

```js
let base64List = await Promise.all(files.map(file => readerFile(file))
```

- base64上传时 请求头 和 请求体 的注意
- axios onUploadProgress() 回调的利用
```js
let uploadBox = document.querySelector(".uploadBox")
let btn = document.querySelector(".button")
let oInp = document.querySelector("#uploadInp")


// 点击 button 按钮之后 调出 文件选择框
btn.addEventListener("click", function() {
  oInp.click()
})

// 给 文件input 绑定change事件
oInp.addEventListener("change",async function() {
  // 多图上传 获取文件 类数组 列表
  let files = Array.from(this.files)


  // 如果没有选择文件 return
  if(files.length == 0) return


  // 当我们在 文件选择 弹窗里 选择多少文件 创建多少 card
  // 构建上传列表 成员是 {file: , base64: card: }
  let uploadList = []

  // 上传列表的初始化操作
  // 将选择的文件 添加到 上传列表中(该列表就是上传的参数列表)
  files.forEach((file, index) => {
    uploadList[index] = {
      file: file,
      base64: null,
      card: null
    }
  })


  // 获取 base64 和 动态创建 card
  /*
    将上传文件列表中的每一个文件 通过异步方法读成base64 我们要将10个文件都读取完了之后 统一做什么样的处理 这就需要并行处理 Promise.all() 方法

    files.map(file => readerFile(file))
    map会返回一个数组 里面全是promise: [p1, p2, ...] 
    
    Promise.all() 会等里面的promise都resolve才会返回结果
    这里的顺序还是按照files文件的顺序 这就是 Promise.all 的特点

    Promise.all()本身返回的也是 promise 所以我们用 await 接收最后的结果
  */
  let base64List = await Promise.all(files.map(file => readerFile(file)))

  // 下面我们会根据 多少base64 创建对应的node节点 每创建一次 往页面添加一次不好 回流次数太多 这里我们利用文档碎片
  let frag = document.createDocumentFragment()

  // files有多少文件 这里就会有 多少base64 数量是一一对应的
  base64List.forEach((base64, index) => {
    
    // 我们这里根据 多少base64 创建对应的 card
    let card = document.createElement("div")
    card.className = "card"

    // 添加 card 里面结构
    card.innerHTML = `
      <img src="${base64}" alt="">
      <div class="progress">
        <div class="line"></div>
      </div>
      <div class="mark"></div>
    `

    // 将创建的节点 先放到文档碎片中
    frag.appendChild(card)

    // 完善上传列表
    uploadList[index].base64 = base64
    uploadList[index].card = card
  })

  // 最后都处理好了 我们将文件碎片中的node 一次性的添加到指定节点中
  uploadBox.appendChild(frag)
  

  // 按照上传列表 批量上传图片 && 监听进度
  // 使用 base64 的方法上传 注意请求头和url编码格式的请求体
  uploadList.forEach(async item => {
    let {file, base64, card} = item

    // 接口中需要 chunk 和 filename
    let params = {
      chunk: encodeURIComponent(base64),
      filename: file.name
    }

    let {data: res} = await axios({
      url: "http://127.0.0.1:3000/single2",
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      // 创建进度监测
      onUploadProgress(e) {
        // e.loaded: 已经加载的
        // e.total: 总共要加载多少
        let radio = e.loaded / e.total * 100 + "%"

        // 控制 card 下的 progress 下的 line 盒子
        card.querySelector(".line").style.width = radio
      },
      // headers指定的 url编码格式 我们的 data 请求体 也要通过 Qs 转换为 url编码格式
      data: Qs.stringify(params)
    })

    // 上传成功
    if(res.code == 200) {
      let progress = card.querySelector(".progress")
      let mark = card.querySelector(".mark")

      // 隐藏
      // progress.style.display = "none"
      // mark.style.display = "none"

      // 或者移除
      card.removeChild(progress)
      card.removeChild(mark)
    }
  })

})


// 延迟函数: 目的在 delay() 方法没有执行完后 后面的逻辑不执行
function delay(ms = 500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

// 读取文件成 base64
function readerFile(file) {
  return new Promise((resolve, reject) => {

    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      resolve(this.result)
    }

    reader.onerror = function(err) {
      reject(err)
    }
  })
}

```

<br><br>

## 拖拽上传:
我们将文件拖到一个区域后松手 实现拖拽上传
```html
<style>
.uploadBox {
  box-sizing: border-box;
  margin: 30px auto;
  width: 300px;
  height: 200px;
  background: url('./images/upload.svg') no-repeat center center #DDD;
  background-size: 30%;
}
</style>

<div class="uploadBox" contenteditable></div>
```

<br>

### 要点:
- 将一个盒子设置为 可 **contenteditable** 状态
- 监听盒子的 ondrop 事件 当把内容放到目标区域里面的时候触发该事件

```js
let uploadBox = document.querySelector('.uploadBox');
uploadBox.ondrop = function (ev) {
  // 这个是必须的
  ev.preventDefault();

  // 获取拖拽放置到盒子中的文件
  console.log(ev.dataTransfer.files[0]);
};
```

拿到文件后 就是单张图片上传的逻辑

<br><br>

## 大文件切片上传

### 思路:
比如我们拿到了 file 对象 我们将这个file对象切成很多块 每次上传一块 直到上传完成  
后台进行合并 把上传的东西 不断地往一个文件里面append append完了之后就是一个完整的文件

<br>

### 后台要点:
```s
npm i express express-fileupload
```
    
express-fileupload 用于处理上传的file 可以看看这小工具的用法

<br>

**注意:**  
代码有问题 有的时候能上传成功 有的时候不行 参考为主

<br>

### 前端代码: 
```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js"></script>
  <script>

    // 建立提示信息 统一进行管理
    const UPLOAD_INFO = {
      "NO_FILE": "请先选择文件",
      "INVALID_TYPE": "不支持该类型的文件上传",
      "UPLOAD_FAILED": "上传失败",
      "UPLOAD_SUCCESS": "上传成功"
    }

    // 创建文件类型限制 文件类型列表(允许的列表)
    const FILE_TYPE = ["video/mp4", "video/ogg"]

    // 64k 为一个 chunk 文件切割的基本单位
    const CHUNK_SIZE = 1024 * 1024

    // 已上传了多少size (保存了当前上传了多少)
    let uploadedSize = 0
    /*
      uploadedSize < file.size 代表还有没有上传完
      uploadedSize = file.size 代表上传完了
    */


    // 上传完成后 返回的结果
    let uploadedRet = null


    // 获取各个节点
    // 进度条
    const oProgress = document.querySelector("#progress")
    const oBtn = document.querySelector("#btn")
    const oInfo = document.querySelector("#info")

    // file input
    const oFile = document.querySelector("#video")



    oBtn.addEventListener("click", async function() {
      /*
        lastModified: 1655435973258
        lastModifiedDate: Fri Jun 17 2022 12:19:33 GMT+0900 (日本標準時) {}
        name: "harrier.mp4"
        size: 31812699
        type: "video/mp4"
        webkitRelativePath: ""
      */
      // console.log(oFile.files)  // 类数组
      
      // 还可以像下面这样写 解构
      const file = oFile.files[0]
      // const {files: [file]} = oFile

      // 判断是否有文件 并做出提示
      if(!file) {
        oInfo.innerHTML = UPLOAD_INFO["NO_FILE"]
        return
      }

      // 如果不在文件类型列表里面 则
      if(!FILE_TYPE.includes(file.type)) {
        oInfo.innerHTML = UPLOAD_INFO["INVALID_TYPE"]
        return
      }

      // 走到这里证明上面的情况都抛出了 把 oInfo 清空
      oInfo.innerHTML = ""

      // 注意: file里面的size属性是非常有用的！！！
      const {name, type, size} = file
      console.log(name)

      // 创建唯一的文件名(这个写法不行)
      const fileName = new Date().getTime() + "_" + name;

      // 将 进度条的max 设置为 文件的size
      oProgress.max = size


      // 切片上传
      while (uploadedSize < size) {
        // 从 uploadedSize 开始 也就是从0开始, 截取 0 ~ chunkSize1024 * 1024 大小到一个数组中 (切到 uploadedSize + CHUNK_SIZE) 那么下一次就是从uploadedSize 截取到uploadedSize + CHUNK_SIZE 这么多 依次
        
        // fileChunk是Blob类型 比如 size 100
        const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE)

        console.log("fileChunk", fileChunk)

        const formdata = createFormData({
          name,
          type,
          size,
          fileName,
          uploadedSize,
          file: fileChunk
        })

        try {
          // 每一次循环都要上传后 后台都会返回一个结果
          uploadedRet = await axios({
            url: "http://127.0.0.1:3333/upload",
            method: "post",
            data: formdata
          })

          // 看看每一次上传后 后台的返回结果是什么
          console.log("uploadedRet", uploadedRet.data)

        } catch(err) {
          // 上传失败
          oInfo.style.background = "black"
          oInfo.innerHTML = UPLOAD_INFO["UPLOAD_FAILED"] + err.message
          return
        }

        // 上传完成后 更新 uploadedSize 的值
        // 每次截取会返回了一个blob对象 它的size 就是截取的size
        uploadedSize += fileChunk.size

        console.log("end", uploadedSize)
        // 更新进度条
        oProgress.value = uploadedSize
      }

      // while 出来后就是上传成功 提示上传成功
      oInfo.innerHTML = UPLOAD_INFO["UPLOAD_SUCCESS"]

      // 将 file input 的 value 值 置为 空
      oFile.value = null

      // 上传成功后 动态添加视频
      createVideo(uploadedRet.data.video_url)
    })

    // 将文件的相关信息都要传递到后台 传入数据 组织一个 formdata
    function createFormData({
      name,
      type,
      size,
      fileName,
      uploadedSize,
      // 这个是我们切出来的 fileChunk
      file
    }) {

      // uploadedSize: 第一传递到后台是0 那么后台根据uploadedSize为0 会创建一个新文件(因为第一次后台并没有这个文件) 不断地往里面append
      const formdata = new FormData()
      formdata.append("name", name)
      formdata.append("type", type)
      formdata.append("size", size)
      formdata.append("fileName", fileName)
      formdata.append("uploadedSize", uploadedSize)
      formdata.append("file", file)

      return formdata
    }

    // 当上传完毕后 后台会返回一个 url 我们动态的创建 video 标签
    function createVideo(src) {
      const video = document.createElement("video")
      video.controls = true
      video.width = "500"
      video.src = src
      document.body.appendChild(video)
    }
  </script>
```

<br>

### 后台代码: 
```js
const express = require("express")

// 引入 fileloader
const uploader = require("express-fileupload")

// 取文件后缀的方法
const {extname, resolve} = require("path")

// 检查文件是否存在的方法 和 往文件里面追加的方法 写文件的方法
const {existsSync, appendFileSync, writeFileSync} = require("fs")


const FILE_TYPE = ["video/mp4", "video/ogg"]


const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 注册 uploader
app.use(uploader())

// 如果访问 / 资源 那么久去 upload_temp 里面找
app.use("/", express.static("upload_temp"))

// 跨域处理
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

  next()
})

app.get("/", (req, res) => {
  res.send({
    msg: "首页信息",
    code: 0
  })
})

app.post("/upload", (req, res) => {

  // 因为前端是 while 上传的 那边上传一次 这边就会接收一次 请求体body
  /*
    {
      name: 'harrier.mp4',
      type: 'video/mp4',
      size: '31812699',
      fileName: '1656512162705_harrier.mp4',
      uploadedSize: '31784960'
    }
  */
  // console.log(req.body)

  // 解构 我们发现并没有 file, file 需要再 req.files 里面获取
  const {name, type, size, fileName, uploadedSize} = req.body

  // 获取 file 文件 这个file是上传过来的 filechunk express-uploader 帮我们处理好了
  const {file} = req.files

  /*
    {
      name: 'blob',
      data<Buffer cc c2 5f f9 2f 6a f5 22 3c 75 38 32 ac c5 5a 85 cc f7 24 7d 43 58 96 32 62 4f 95 4d 99 49 fe bd a4 7c 35 a5 de b5 35 32 7c 7a e1 14 7a 5c 92 5b a0 67 ... 65486 more bytes>,
      size: 65536,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'application/octet-stream',
      md5: '41b4c4adcee2e7fc562c6e7d6209aa99',
      mv: [Function: mv]
    }
  */
  // file.data 就是每一个 chunk 
  // console.log(file)

  // 如果没有file
  if(!file) {
    res.send({
      code: 1001,
      msg: "no file uploaded"
    })

    return
  }

  // 虽然前端判断过类型 后台也要进行判断
  if(!FILE_TYPE.includes(type)) {
    res.send({
      code: 1002,
      msg: "the type is not allowed for uploading"
    })
    return
  }
  
  // 组织文件名 name是harrier.mp4
  const filename = fileName + extname(name)
  const filePath = resolve(__dirname, "upload_temp", filename)

  // 什么时候创建文件 不是0 证明有上传了
  if(uploadedSize != "0") {
    console.log("!=0")
    // 进来后 我们要判断 filePath 是否存在 存在做什么 不存在做什么
    // 如果没有这个文件
    if(!existsSync(filePath)) {
      // 报错 因为 != 0 的时候 说明已经上传了 但是却找不到这个文件 说明有某些原因将这个文件删掉了
      res.send({
        code: 1003,
        msg: "no file exists"
      })

      return
    }

    // 能到这个部分 代表文件存在 文件存在就往里面追加数据 file.data 就是每一个 chunk
    appendFileSync(filePath, file.data)
    res.send({
      code: 0,
      msg: "appended",
      video_url: "http//127.0.0.1:3333/" + filename
      // 返回url
    })

    return
  }

  console.log("==0 文件不存在")
  // 到这里说明 uploadedSize 为 0 说明第一次上传 说明还没有 文件 所以这里创建文件
  // 创建一个文件并写入file.data
  writeFileSync(filePath, file.data)

  // 响应
  res.send({
    code: 0,
    msg: "file is created"
  })
})

app.listen(3333, () => {
  console.log("3333端口已监听")
})
```

<br>

### express-fileupload 的使用方式: 
上传的文件 在 req.files 里面  
当我们输出这个 file 输出如下
```js
{
  name: 'blob',
  data<Buffer cc c2 5f f9 2f 6a f5 22 3c 75 38 32 ac c5 5a 85 cc f7 24 7d 43 58 96 32 62 4f 95 4d 99 49 fe bd a4 7c 35 a5 de b5 35 32 7c 7a e1 14 7a 5c 92 5b a0 67 ... 65486 more bytes>,
  size: 65536,
  encoding: '7bit',
  tempFilePath: '',
  truncated: false,
  mimetype: 'application/octet-stream',
  md5: '41b4c4adcee2e7fc562c6e7d6209aa99',
  mv: [Function: mv]
}
```

<br>

**<font color="#C2185B">name</font>**  
上传文件的名字。

<br>

**<font color="#C2185B">data</font>**  
上传文件数据, 是一个Buffer, 可以通过writeFile方法写入到本地文件中。

<br>

**<font color="#C2185B">size</font>**  
上传文件的大小, 单位为字节。

<br>

**<font color="#C2185B">tempFilePath</font>**  
临时文件路径。

<br>

**<font color="#C2185B">truncated</font>**  
表示文件是否超过大小限制。

<br>

**<font color="#C2185B">mimetype</font>**  
文件的mimetype类型。

<br>

**<font color="#C2185B">md5</font>**  
文件的MD5值, 可用于检验文件。

<br>

**<font color="#C2185B">mv</font>**  
将文件移动到服务器上其他位置的回调函数。

- filePath: 指定是上传文件的保存路径
- callback: 是回调函数用来处理判断是否上传成功并且有一个参数err表示错误对象

```js
mv(uploadPath, (err) => { ... })
```

<br>

参考资料:
https://blog.csdn.net/cnds123321/article/details/121548117

<br><br>

# 利用数组 循环记入数据 取出最大最小值
背景大概的结构为
```js
do {
  try {

  } catch(err) {

    if() {
      ...
    } else if() {
      ...
    } else {
      ...
    }

  }
} while(true)
```

我们能看到 上面的 while 循环中 有3个if判断 分别是
- network err
- timeout
- network err and timeout

<br>

### 需求:  
当 networkerr 的持续时间大于60分钟的时候 终止循环

**开始的时候:**   
我是如下的方式定义的 这样的话 第一次上传就开始设置开始时间了
有可能导致 第一次进入 networkerr 的时候 就是 >= minTime 的情况

也就是说 下面的设置方式 并不是 networkerr 的持续时间
```js
let start = +new Date()
let minTime = 60

do {
  try {

  } catch(err) {
    if(err.code == "networkerr") {
      
      let end = +new Date()
      let duration = Math.floor((end - start) / 1000) / 60

      if(duration >= minTime) break
      

    } else if() {
      ...
    } else {
      ...
    }
  }
} while(true)
```

所以利用数组 修改为下面的方式 利用了数组存值 然后取极值的方式
```js
let networkErr = []
let minTime = 60

do {
  try {

  } catch(err) {
    if(err.code == "networkerr") {
      
      let time = Math.floor(+new Date() / 1000 / 60)
      networkErr.push(time)

      let max = Math.max(...networkErr)
      let min = Math.min(...networkErr)
      let duration = max - min

      if(duration >= minTime) break
      

    } else if() {
      ...
    } else {
      ...
    }
  }
} while(true)
```

<br><br>

# 在函数实参中传递对象 给目标对象重新赋值: 
### 背景:  
源对象:  ``obj``  
新对象: ``rawStartupParameter[k]``  

<br>

**方式:**  
- 使用  ``Object.entries(obj)`` 方式 将对象转换为 [[key,value],[key,value]]  

- 遍历 新格式数组 解构出[k,v]

- 进行赋值操作 给 源对象[k] 进行赋值 如果新对象中有值 用新对象中的值 如果没有用源对象中的值
```js
let obj = {
  name: "sam",
  age: 18,
  address: "花果山"
}

Object.entries(obj).forEach(([k, v]) => {
  // 如新对象中有同名的属性 那么就用新对象中的 如果没有就使用旧对象中的
  obj[k] = rawStartupParameter[k] || v
})
```

<br>

**测试:**  
以下的3种方式都可以实现同样的功能: 
```js 
// 方式1
let res = Object.assign(systemParams, customeParams)
console.log(res)
// { name: 'erin', age: 16, address: '昌图', sex: 'female' }


// 方式2:
let res2 = {
  ...systemParams,
  ...customeParams
}
console.log(res2)
// { name: 'erin', age: 16, address: '昌图', sex: 'female' }


// 方式3:
Object.entries(systemParams).forEach(([k, v]) => {
  systemParams[k] = customeParams[k] || v
})
console.log(systemParams)
// { name: 'erin', age: 16, address: '昌图', sex: 'female' }
```

<br><br>

# 字符串汉字后面没空格 英文数字有
```js
let arr1 = ["播放", "Tales", "from", "the", "1001", "nights"]
let arr2 = ["107", "加", "139", "等于", "几"]
let arr3 = ["今天", "天气", "怎么", "样"]

function convert(arr, str="") {

  // 定义英文 和 中文的正则
  let en = /\w+/i
  let han = /\p{sc=Han}+ /u

  arr.forEach(item => {

    // 判断 英文 和 中文
    if(en.test(item)) {
      // 因为 成员前面加上 空格
      str += ` ${item}`
    } else {

      // 中文前面不加
      str += item
    }
  })


  // 利用 正则替换汉字前后的空格
  return str.replace(han, content => {
    return content.trim()
  })
}


// 方式2
function convert(arr) {
  let han = / ?\p{sc=Han}+ ?/ug
  return arr.join(" ").replace(han, content => content.trim())
}


// 方式3:
function convert(arr, str="") {

  let en = /\w+/i

  for(let i = 0; i < arr.length; i++) {
    let item = arr[i]
    item = `${item} `

    if(!en.test(item)) {
      item = item.trim()
      str += item
    } else {
      str += `${item}`
    }
  }
  
  return str
}

console.log(convert(arr2))

```

<br><br>

# 提高代码可读性: 

### 避免对 布尔变量 使用 **否定意义** 的名称: 
比如: isStarted *Vs* isNotStarted
```js
// 原代码
const isInvalidApiKey = apiKey === null
if (isInvalidApiKey) { ... }

// 改进后的代码
const isValidApiKey = apiKey != null
if (!isValidApiKey) { ... }
```

<br>

### 避免使用 **标记位** 参数: 而使用对象参数
```js
// 原代码
renderResult(true)

// 根据传入的 boolean 决定渲染哪个组件
function renderResult(isAuthenticated) {
  if (isAuthenticated) {
    return <p>App</p>
  } else {
    return <p>Please login</p>
  }
}


// 方式1: 使用对象参数:  传入一个对象
renderResult({isAuthenticated: true})

// 从参数对象中解构出属性 然后进行判断
function renderResult({isAuthenticated}) {
    if (isAuthenticated) {
        return <p>App</p>
    } else {
        return <p>Please login</p>
    }

}

// 方式2: 使用两个函数
function renderAuthenticatedApp() {
    return <p>App</p>
}

function renderUnAuthenticatedApp() {
    return <p>Please login</p>
}

isAuthenticated ? renderAuthenticatedApp() : renderUnAuthenticatedApp()
```

<br>

### 使用卫语句: 
#### **卫语句:**
把复杂的条件表达式(if else if else) 拆分成多个条件表达式  
比如一个很复杂的表达式, 嵌套了好几层的if-else语句, 将其转换为多个if语句, 实现它的逻辑, 这多条的if语句就是卫语句。

```js
if (statusCode === 200) {
    // success
} else {

    if (statusCode === 500) {
        // Internal Server Error
    } else if (statusCode === 400) {
        // Not Found
    } else {
        // Other error
    }

}


// 修改后的代码
if (statusCode === 500) {
    // Internal Server Error
}

if (statusCode === 400) {
    // Not Found
}

if (statusCode !== 200) {
    // Other error
}
```

<br>

### 优化 if 内条件: 
```js
// 之前
if (country !== 'finland' &&
    country !== 'germany' &&
    country !== 'vietnam' &&
    country !== 'russia' &&
    type !== '💣'
) {
    return Promise.reject('Not available')
}

// 将 country 统一成一个条件
const isInAvailableCountries = (
    country === 'finland' ||
    country === 'germany' ||
    country === 'vietnam' ||
    country === 'russia'
)

const hasBoom = type === '💣'

if (!isInAvailableCountries || hasBoom) {
    return Promise.reject('Not available')
}


// 最终 利用了 数组 + includes 的方式:
const availableCountries = ['finland', 'germany', 'vietnam', 'russia']

const isInAvailableCountries = availableCountries.includes(country)

const hasBoom = type === '💣'

if (!isInAvailableCountries || hasBoom) {
    return Promise.reject('Not available')
}
```

<br>

### 不可能的状态就让它不可能:
易于理解 预防出现大量bug 停止使用类似于isLoading的布尔值

```js
isLoading: true
isError: false

isLoading: false
isError: true

// imposible states
isLoading: true
isError: true


// 改进后: 
const LOADING_STATE = 'LOADING_STATE'
const ERROR_STATE = 'ERROR_STATE'

const state = LOADING_STATE
```

```js
// 例子2
const [isLoading, setIsLoading] = React.useState(false)
const [error, setError] = React.useState(null)
const [coffee, setCoffee] = React.useState(null)

function handleButtonClick() {
    setIsLoading(true)
    setError(null)
    setCoffee(null)

    getCoffee('cappuccino', 'small', 'finland', true).then(coffee => {
        setIsLoading(false)
        setError(null)
        setCoffee(coffee)
    }).catch(error => {
        setIsLoading(false)
        setError(error)
    })
}

// 改进后
const state = {
    idle: 'idle',
    loading: 'loading',
    error: 'error',
    success: 'success',
}

const [error, setError] = React.useState(null)
const [coffee, setCoffee] = React.useState(null)
const [status, setStatus] = React.useState(state.idle) 

function handleButtonClick() {
    setStatus(state.loading)

    getCoffee('cappuccino', 'small', 'finland', true).then(coffee => {
        setStatus(state.success)
        setCoffee(coffee)
    }).catch(error => {
        setStatus(state.error)
        setError(error)
    })
}
```

<br>

### 参数个数太多, 可以用对象代替:
参数顺序无关紧要 方便传递可选参数

```js
function getBox(type, size, price, color) {}
getBox('carry', undefined, 10, 'red')


// 改进后: 
function getBox(options) {
  const {type, size, price, color} = options
}

getBox({
  type: 'carry',
  price: 10,
  color: 'red'
})
```

<br>

### 使用Object.assign赋默认值:
```js
unction getBox(options) {

    options.type = options.type || 'carry'
    options.size = options.size || 'small'
    options.price = options.price || 10
    options.color = options.color || 'red'

    const {type, size, price, color} = options
}

// 改进后
function getBox(customOptions) {

    const defaults = {
        type: 'carry',
        size: 'small',
        price: 10,
        color: 'red',
    }

    // customOptions 参数对象放在后面 有的话就覆盖默认的了
    const options = Object.assign(defaults, customOptions)

    const {type, size, price, color} = options
}
```

<br>

例子2:
```js
export function getCoffee(type, size, country, hasIce) {

  type = type || 'cappuccino'
  size = size || 'small'
  country = country || 'finland'
  hasIce = hasIce || false
}


// 用以下的3种方式 改进
function getCoffee(customOptions) {
  const defaultOptions = {
    type: 'cappuccino',
    size: 'small',
    country: 'finland',
    hasIce: false
  }

  const options = Object.assign(defaultOptions, customOptions)
}


function getCoffee(options = {}) {
  const {
    type = 'cappuccino',
    size = 'small',
    country = 'finland',
    hasIce = false
  } = options
}

function getCoffee({
  type = 'cappuccino', 
  size = 'small',
  country = 'finland',
  hasIce = false
} = {}) {
}
```

<br>

### 用对象字面量替换switch语句:
```js
let drink
switch(type) {
  case 'cappuccino':
    drink = 'Cappuccino';
    break;
  case 'flatWhite':
    drink = 'Flat White';
    break;
  case 'espresso':
    drink = 'Espresso';
    break;
  default:
    drink = 'Unknown drink';
}


// 改进后
const menu = {
  'cappuccino': 'Cappuccino',
  'flatWhite': 'Flat White',
  'espresso': 'Espresso',
  'default': 'Unknown drink'
}

const drink = menu[type] || menu['default']
```

<br><br>

# 记忆函数 (缓存结果): 
第一次调用函数 缓存参数 或者 函数的结果  

在第二次调用的时候可以直接访问缓存的东西 因为我们拿到的是缓存的结果所以会提高性能优化的作用

比如: n的阶乘
```js
function factorial(n) {
  // 出口
  if(n ==0 || n == 1) return 1

  return * factorial(n-1);
}

console.time("factorial")
factorial(500)
console.timeEnd("factorial")
```
<br>

### 实现记忆函数: 
```js
let cache = {}
function factorialCache(n) {
  // 进入函数后 优先检查缓存 如果缓存中有 则使用缓存中的数据
  if(cache[n]) {
    return cache[n]
  }

  // 缓存到cache上 出口
  if(n ==0 || n == 1) {
    return (cache[0] = cache[1] = 1)
  }

  // 缓存到cache的n上
  return cache[n] = n * factorial(n-1);
}
```

<br>

### 实现通用的记忆函数:

```js
function memorize(fn) {
  
  // 利用闭包创建了 缓存
  let cache = {}

  return function() {
    let key = fn.name + "_" + [].join.call(arguments, ",")
    return cache[key] = cache[key] || fn.apply(this, arguments)
  }
}

// 调用
let factorialMemorize = memorize(factorial)
factorialMemorize(5000)
```

<br><br>

# Promise.resolve 缓存后台数据:
```js
Promise.resolve('后盾人').then(value => {     // <resolved>
  console.log(value)
})
```

<br>

有的时候我们在写单页面复应用的时候, 我们会在不同的组件里面可能会请求同一个数据, 既然是同一个数据 

那么我希望走本地的缓存 不要反复的请求后台 减少请求次数 减少服务器的压力 前台用户的访问也会变快

```js
// username 请求的用户 请求谁
function query(username) {
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

<br>

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

  /*
    定义缓存: 
    我们先看看函数中有没有定义的缓存 如果没有这个属性就给它加上 是一个map类型
  */
  const cache = query.cache || (query.cache = new Map())

  // 每次取的时候 我们要检查一下 在我们的缓存中是否有这个数据 如果有直接返回出去
  if(cache.has(name)) {

    // 返出去一个成功状态的promise
    return Promise.resolve(cache.get(name))
  }

  return ajax('url').then(user => {

    // 当我们取完数据的时候 就把数据压入map中
    cache.set(name, user)   // key就是name 值为user
    return user

  })
}
```

走缓存了 实际上是没有发生异步请求的 因为return的是if里面的  

还有一个需要注意地方 因为下面的ajax的请求是异步的 需要花费时间,  
所以直接走缓存的时候 还没有取到数据 所以我们再调用的时候, 要加个延时定时器 确保先取到数据 之后再走缓存 确保从后台拿完数据再走缓存
```js
setTimeout(() => {
    query('后盾人').then(user => {
    console.log(user)
  })
}, 1000)
```

<br><br>

# 整合对象

### 需求:
我们有多个 数据数组 要整理成一个 数据数组

- sam  的所有 num 属性收集在一起
- erin 的所有 num 属性收集在一起

<br>

### 思路:
- 将多个数据 整理成一个 对象数组
- 使用filter()利用name 来找出同类别对象
- 将filter()过滤的对象中的num属性 push到一个数组中

<br>

**数据:**
```js
let data1 = [
  { name: "sam", num: 1 },
  { name: "erin", num: 2 },
  { name: "nn", num: 3 },
]

let data2 = [
  { name: "sam", num: 5 },
  { name: "erin", num: 7 },
  { name: "nn", num: 9 },
]

let data3 = [
  { name: "sam", num: 11 },
  { name: "erin", num: 55 },
  { name: "nn", num: 99 },
]
```
<br>

**要求数据格式:**
```json
[
  { "name": "sam", "num": [1,5,11] },
  { "name": "erin", "num": [2,7,55] },
  { "name": "nn", "num": [3,9,99] }
]
```

<br>

### 实现方式1: 
封装函数的方式: 我们需要传入指定类别(sam), 和所有数据源:
```js
function getTotal(type, ...args) {
  let obj = {
    name: type,
    num: []
  };

  // [].concat(...args) 将[{},{},{}]x3 合成一个 [{}x9]
  [].concat(...args).filter(item => item.name == type).forEach(item => obj.num.push(item.num))
  return obj
}

let data = getTotal("sam", data1, data2, data3)
console.log(data)
```

<br>

### 实现方式2:
整理成类的方式:  
使用方式来讲跟上面没有太多的区别 但是整理成类的方式
```js
class Integrate {

  constructor(options) {
    let {type, source} = options

    this.arr = source.length > 0
      ? [].concat(...source)
      : []

    this.type = type
    this.data = this.get()
  }

  get() {
    let obj = {
      name: this.type,
      num: []
    }
    this.arr.filter(item => item.name == this.type).forEach(item => obj.num.push(item.num))

    return obj
  }
}

let {data: res1} = new Integrate({
  type: "sam",
  source: [data1, data2, data3]
})

let {data: res2} = new Integrate({
  type: "erin",
  source: [data1, data2, data3]
})

let {data: res3} = new Integrate({
  type: "erin",
  source: [data1, data2, data3]
})

let data = [res1, res2, res3]
console.log(data)
```

<br>

### 实现方式3:
上面我们整个几个数据 需要创建几个实例 下面统一进行处理
```js
class Integrate {

  constructor(options) {
    let {type, source} = options

    this.arr = source.length > 0
      ? [].concat(...source)
      : []

    this.type = [...type]
    this.data = this.get()
  }

  get() {

    let data = []
    this.type.forEach(name => {
      let obj = {}
      obj.name = name
      obj.num = []
      
      this.arr.filter(item => item.name == name).forEach(item => obj.num.push(item.num))
      data.push(obj)
    })

    return data
  }
}

// 这里的参数都需要整理成数组的形式
let {data} = new Integrate({
  type: ["sam", "erin", "nn"],
  source: [data1, data2, data3]
})

console.log(data)
```

<br><br>

# 将代码整理成json

### 需求: 用json的方式写代码

<br>

### 思路:
- 将 要转成json的代码 写在script标签里面 ``<script data-target="content">``

- 获取该标签中的文本 利用 replace 进行正则匹配提取

- 正则使用 m 模式

```html
<script data-target="content">
let ul = document.querySelector("ul")
let checkbox = document.querySelectorAll("[type='checkbox']")
let all = document.querySelector("#all")

let total = ul.querySelectorAll("[type='checkbox']")

checkbox.forEach(el => {
  el.addEventListener("click", function() {
    let checkeds = ul.querySelectorAll(":checked")
    all.checked = checkeds.length == total.length
  })
})
</script>

<script>
  let target = document.querySelector("[data-target='content']")
  let content = target.innerHTML
  console.log(content)

  let arr = []
  content.replace(/^(.+)$/gm, (content, s1) => {
    console.log(s1)
    arr.push(s1)
  })

  console.log(JSON.stringify(arr, null, 2))
</script>
```

<br><br>

# 给数组中的对象额外添加属性

### 思路:
- 利用map()加工每一个对象
- 利用 Object.assign() 方法给该对象添加属性 
- 添加的属性 要整理成 对象的形式 {mode: true}

```js
let res = list.map(item => {
  return Object.assign(item, {mode: true})
})

let ret = list.map(item => {
  return {...item, mode: "nuxt"}
})
```

<br><br>

# reduce完成promise队列
```s
https://www.jianshu.com/p/aa6e6f2f9535  
https://www.freesion.com/article/6149611365/
```
    
<br>

```js
let arr = [1, 2, 3, 4, 5]

arr.reduce((pre, cur) => {

  // pre是一个promise所以可以.then 在中 处理 Promise.resolve() 的结果 通过 默认值参数也是确保可以进入到 p.then() 方法中
  return pre.then(() => {

    // 因为要链式调用 我们还要在 then() 方法中继续 return new Promsie
    return new Promise((resolve, reject) => {

      // 因为这里是通过的 我们可以对上一个 promise 的结果进行处理
      console.log(cur)

      // 通过还要继续 resolve()
      resolve()
    })
  })
}, Promise.resolve())


// 如果想对数据做点特殊处理 也可以在 new Promise() 中进行处理 比如1秒之后打印一次
arr.reduce((pre, cur) => {

  return pre.then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(cur)

        resolve()
      }, 1000)
    })
  })
}, Promise.resolve())
```

在 JS_NODE 笔记里面 reduce() 方法的相关地方 我也总结了份使用方式 联合做下参考
```js
function handle1(res) {
  return new Promise(resolve => {
    resolve(res + 10)
  })
}

function handle2(res) {
  return new Promise(resolve => {
    resolve(res + 20) 
  })
}

function handle3(res) {
  return new Promise(resolve => {
    resolve(res + 30)
  })
}

let arr = [handle1, handle2, handle3]

let res = arr.reduce((promise, fn) => {
  return promise.then(fn)
}, Promise.resolve(10))

// 因为我们return出来的也是 promise
res.then(ret => console.log(ret))
```

<br>

示例2:  
```js
function handler1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1)
      resolve(1)
    }, 1000)
  }) 
}

function handler2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2)
      resolve(2)
    }, 3000)
  }) 
}


function handler3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3)
      resolve(3)
    }, 2000)
  }) 
}

// 不管是否按照 1 2 3 的顺序执行函数 结构都是 1 3 2
// handler2()
// handler1()
// handler3()


// 需求 我希望是先执行完 1 然后执行 2 最后执行 3
let arr = [handler1, handler2, handler3]

arr.reduce((pre, cur) => {
  return pre.then((res) => {    
    return cur()
  })
}, Promise.resolve())
```

<br>

示例3:
```js
let nums = []
const a1 = new Promise(res => {
  setTimeout(() => {
    nums.push(`a`)
    res(`a`)
  }, 2000)
})
const a2 = new Promise((res, rej) => {
  setTimeout(() => {
    nums.push(`a1`)
    res(`a1`)
  }, 2000)
})
const a3 = new Promise(res => {
  setTimeout(() => {
    nums.push(`a2`)
    res(`a2`)
  }, 2000)
})

const arr = [a1, a2, a3]

let ret = arr.reduce(async (pre, next) => {
  await pre
  return next
}, Promise.resolve())

ret.then(res => {
  console.log(nums)
})
```

<br><br>

# 获取图片主色调 添加到背景中 (没事可以整理一下canvas mdn)
```js
https://mp.weixin.qq.com/s/fAXiE3cVnbGCOO3-37iWwg
```

<br>

### 要点:
我们要用的图片是通过 background 属性添加的 那怎么给这个容器一个宽高呢
1. 通过 padding-top 设置对应的百分比值
2. 通过新属性aspect-ratio (safari不支持)
```css
div{
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  /* 2:1 panding百分比值是相对于盒子的宽度的*/
  padding-top: 50%;
}
```

<br>

### 如何获取图片的主色呢？
借助Canvas的 ctx.getImageData() 方法。

<br>

### 要点:
``img元素对象.naturalWidth `` 

获取图片的自然宽度 该宽度是图片本身的宽度 永远不会改变
width: 这个宽度可以通过css js来控制 本不是图片本身的宽度

```js
let imgSrc = "./img/img-1.png"
let imgNode = document.createElement("img")

imgNode.src = imgSrc

imgNode.onload = () => {

  // js调整一下图片的大小
  imgNode.width = 100

  console.log(imgNode.width)          // 100
  console.log(imgNode.naturalWidth)   // 1094

}
```

<br>

### 分以下几个步骤:  
- 将图片绘制到一个canvas元素上
- 获取图像所有的rgba像素点
- 取某个区域颜色的均值, 并找出这个区域最接近均值的rgba颜色, 作为该区域的主色

```js
var imgSrc = "XXXXX"
const imgEle = document.createElement('img')
const canvas = document.createElement('canvas')
imgEle.src = imgSrc
imgEle.onload = () => {
  var ctx = canvas.getContext("2d");
  var naturalImgSize = [imgEle.naturalWidth, imgEle.naturalHeight];
  canvas.width = naturalImgSize[0];
  canvas.height = naturalImgSize[1];
  
  //绘制到canvas
  ctx.drawImage(imgEle, 0, 0);
  //获取imageData: rgba像素点
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const leftSectionData = []
  const rightSectionData = []
  const oneLineImgDataLen = canvas.width * 4;

  imgData.data.forEach((colorVal, i) => {
    if (i % onelineImgDataLen <= 0.5 * onelineImgDataLen || i % onelineImgDataLen >= 0.6 * onelineImgDataLen) {
      const inLeft = i % onelineImgDataLen <= 0.5 * onelineImgDataLen
        if (i % 4 === 0) {
          // 获取rgb均值
          const curAverageRGB = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
          let leftOrRightRef = inLeft ? leftSectionData : rightSectionData;
          //每个数组里存四个值: 本颜色值中的r、g、b的均值, 以及r、g、b三个值。
          //均值一方面用于累加计算本区域的整体均值, 然后再跟每个均值对比拿到与整体均值最接近的项的索引, 再取该数组里的后三个值: rgb, 对应着颜色
          leftOrRightRef[leftOrRightRef.length] = [curAverageRGB, imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]]
        }
      }
    })
    //generate average rgb
    const averageOfLeft = Math.round(leftSectionData.reduce((_cur, item) => {
      return _cur + item[0]
    }, 0) / leftSectionData.length)
    const averageOfRight = Math.round(rightSectionData.reduce((_cur, item) => {
      return _cur + item[0]
    }, 0) / rightSectionData.length)
    //find the most near color
    const findNearestIndex = (averageVal, arrBox) => {
      let _gapValue = Math.abs(averageVal arrBox[0])
      let _nearColorIndex = 0
      arrBox.forEach((item, index) => {
        const curGapValue = Math.abs(item averageVal)
          if (curGapValue < _gapValue) {
            _gapValue = curGapValue
            _nearColorIndex = index
          }
      })
      return _nearColorIndex
    }

    const leftNearestColor = leftSectionData[findNearestIndex(averageOfLeft, leftSectionData)]
    const rightNearestColor = rightSectionData[findNearestIndex(averageOfRight, rightSectionData)]
    console.log(leftNearestColor,rightNearestColor)
}
```

<br>

取到颜色, 实现元素的渐变: 
```js
element.style.backgroundImage = `url("XXXX"),linear-gradient(90deg,rgba(${leftNearestColor[1]},${leftNearestColor[2]},${leftNearestColor[3]},1) 0%,rgba(${rightNearestColor[1]},${rightNearestColor[2]},${rightNearestColor[3]},1) 100%`
```

<br><br>

# query参数的提取: a=1&b=2&c=3
将上面的键值对组成一个对象 如果有同名的key 就会放到一个数组中

```js
let str = "a=1&b=2&c=3&c=10&c=20"

function parseQueryStr(str) {
  // 检查
  if(!str || !str.length) return {}

  let obj = {}

  // 整理成 [a=1, b=2]
  str.split("&").forEach(item => {

    // 整理成[["a", "1"], ["b", "2"]]
    let [key, value] = item.split("=")

    // 如果obj中有 
    if(obj[key]) {
      
      // 那么就要检查其值是不是已经是数组 如果已经是 则push追加
      if(Array.isArray(obj[key])) {
        obj[key].push(value)

      // 如果不是数组 那么组织成数组的形式 添加新值
      } else {
        obj[key] = [...obj[key], value]
      }
    // 如果obj中没有 那么就组织成 a: 1 
    } else {
      obj[key] = value
    }
  })

  return obj
}

let res = parseQueryStr(str)
console.log(res)
```

这段代码很容易看出来就是做 query string 的 parse 的,  
会把 'a=1&b=2&c=3' 的字符串 parse 成 { a: 1, b: 2, c: 3 } 返回。  

如果有同名的 key 的话, 就合并到一个数组里。

<br><br>

# url参数有编码的案例: 

```js
let str = "?q=%E6%98%A5%E8%8A%82"
let str2 = "?q=春节"

const handleQuery = (url, obj={}) => {

  let reg = /[%]/g
  if(url.match(reg) != null ) {
    url = decodeURI(url)
  }
  
  url.substr(1).split("&").map(item => {
    let arr = item.split("=")
    obj[arr[0]] = arr[1]
    return obj
  })
  
  return obj
}

let res = handleQuery(str2)
console.log(res)
```

<br><br>

# 填写的数据 跳转页面消失:

### 解决方法:  
- 返回按钮使用 ``window.history.back(-1)`` 这样是回到浏览器的记忆堆中的上一个页面, 可以保留数据

- 在原来的页面中点击链接的时候可以重新打开一个窗口 可以用window.open(), 或者window.showModelDialog(), 

- 自定义弹出层, 覆盖到你的页面上, 下面放个半透明层

- 引入缓存, 比如memcache, 将内容保存到缓存中, 返回时, 从缓存中取信息, 如果非空, 则初始化页面中
```js
// 存储表单数据
function saveFormData(formData) {
  const data = JSON.stringify(formData);
  sessionStorage.setItem('formData', data);
}

// 获取表单数据
function getFormData() {
  const data = sessionStorage.getItem('formData');
  return JSON.parse(data);
}

// 页面加载时检查是否有保存的表单数据, 并填充到表单中
window.onload = function() {
  const formData = getFormData();
  if (formData) {
    // 将 formData 填充到表单中
    // ...
  }
}

```

- 借助应用服务器自身的session机制
1. 在服务器端, 将用户填写的表单数据存储在会话对象（session object）中。会话对象是服务器端用于跟踪用户会话状态的一种机制, 每个用户都有自己的会话对象。你可以将表单数据存储在会话对象中的某个属性中。
```java
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  // 获取表单数据
  String formData = request.getParameter("formData");
  
  // 将表单数据存储在会话对象中
  HttpSession session = request.getSession();
  session.setAttribute("formData", formData);
}

```

2. 在表单页面加载时, 从会话对象中获取之前保存的表单数据, 并将其填充到表单中。

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  // 从会话对象中获取表单数据
  HttpSession session = request.getSession();
  String formData = (String) session.getAttribute("formData");
  
  // 将 formData 填充到表单中
  // ...
}

```

过将表单数据存储在服务器端的会话对象中, 无论用户在移动到其他页面后再返回表单页面, 服务器都会保持用户之前填写的信息。

请注意, 会话对象的存储时间通常比本地存储（如LocalStorage或SessionStorage）更长, 因为会话数据存储在服务器上。

但请确保适当管理和清理会话数据, 以避免占用过多的服务器资源。

<br><br>

# 点击对话框以外的部分关闭对话框

### 需求:
我们可以对话框外面的部分加了一层蒙版 我们点击蒙版的时候 会关闭对话框 而不要点击对象框也会关闭对话框

<br>

### **<font color="#C2185B">e.target</font>**
是绑定对象内的子元素 点什么是什么

<br>

### **<font color="#C2185B">e.currentTarget</font>**
是绑定事件的这个对象 相当于this

```html
<body class="body-wrap">
  <div class="model">

  </div>

  <script>
    let target = document.querySelector(".body-wrap")
    target.addEventListener("click", function(e) {
      console.log(e.target)
      console.log(e.currentTarget)

      console.log(e.currentTarget == this)
    })



    /*
    dialog.contains(e.target) 来判断点击事件的目标是否在对话框内部。
    
    如果点击的目标不在对话框内部, 说明点击的是对话框以外的区域, 此时我们可以执行关闭对话框的逻辑, 
    
    例如将对话框的样式设置为 display: none 来隐藏对话框。
    */
    let dialog = document.querySelector(".model");

    document.addEventListener("click", function(e) {
      if (!dialog.contains(e.target)) {
        // 点击对话框以外的区域
        // 关闭对话框的逻辑
        dialog.style.display = "none";
      }
    });

  </script>
</body>
```

<br><br>

# forEach解决异步问题:
这里面也涉及了很多的知识点 比如:

- forEach的重写
- sleep函数的定义

<br>

### 首先我们先说说 ajax异步请求 和 同步代码之间的问题:  
我们现在要请求ajax ajax是一个异步的请求 一旦出现下面的逻辑 同步的代码会先执行 我们拿不到对应的结果

以下都是伪代码
```js
const data = ajax("url", (data) => {
  return data
})

console.log(data) // 这里一定是 null 或者 undefined


// 如同这样:
setTimeout(() => {
  console.log("我是后台请求的数据")
}, 1000)

console.log("主线程")
```

那怎么才能同步的拿到代码呢？ 

<br>

### 方式1: 我们将 ajax请求 变为同步的  
### **<font color="#C2185B">async: false</font>**
我们通过配置项 将async设置为false
```js
 const data = ajax("url", {
   async: false
 }, () => {
  return data
})

console.log(data)       // 这样一定能拿到结果
```

但是又引发了另一个问题 ajax是同步的了 就意味着它会阻塞下面的代码执行  

必须等着它拿到结果后 才会执行下面的代码  

就意味了 除了我们想同步获取data的console语句 它下面的语句也会变为阻塞状态

```js
 const data = ajax("url", {
   async: false
 }, () => {
  return data
})

console.log(data)

// 123会被阻塞
console.log(123)
```

<br>

而逻辑中 123 是没必要被阻塞的 或者说 我们还想让 123 和 ajax之间是异步的关系  

也就是 console.log(data) 和 ajax 是一个部分 123 自己是一个部分

<br>

### 那怎么解决呢？ Promise  
Promise可以把异步和同步分开 比如:
```js
function test() {
  return Promise(resolve => {
    ajax("url", (data) => {
      // 我们在获取到data的时候 将data传出去
      resolve(data)
    })
  })
}

// 这样 我们可以在then里面 拿到传过来的结果
test().then((res) => {
  console.log(res)
})


console.log(123)
```

<br>

从上面的代码我们可以发现 ajax请求 和 获取data的逻辑还是同步的 因为只有调用test().then 才能到到结果

而和123的逻辑之间仍然是异步的 这就是将 逻辑分开了 分成了两个部分

<br>

而我们还可以对上面的函数 做一层封装 使用 async await 
```js
const getData = async () => {
  const data = await test()
  console.log(data)
}
getData()

console.log(123)



const query = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("我是后台请求回来的数据")
    }, 1000)
  })
}

(async () => {
  let res = await query()
  console.log(res)
})()

console.log("我是主线程的代码")
```

我们会发现上面的同步和异步更加的清晰了 ajax和获取data是同步的 而getData()函数是async和下面123还是异步的

<br>

### 面试题:
```js
fun(
  [
    () => console.log("start"),
    () => sleep(1000),
    () => console.log("1"),
    () => sleep(2000),
    () => console.log("2"),
    () => sleep(3000),
    () => console.log("end")
  ]
)
```

<br>

**要求1:**   
写出fun函数 sleep函数 要求按顺序 按效果的依次输出结果

<br>

**要求2:**  
使用forEach可以办到同样的事情么？

<br>

**解析:**  
这道题的考点就是同步化解决方案 而同步化最常见的方案就是 promise async

<br>

### sleep 函数: promise版
```js
function sleep(ms) {
  return Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
```

<br>

### 扩展: 同步 sleep版
```js
function sleep(a, b) {
  const begin = Date.now()
  while(true) {
    if (Date.now() - begin > 3000) break
  }
  console.log("函数执行了")
  return a + b
}
```

<br>

### 定义 fun 函数
使用普通for循环
```js
async function fun(arr) {
  for(let i=0; i<arr.length; i++) {
    // 调用函数前都用await 等一等 等待异步函数执行完后 再进行下面的逻辑
    await arr[i]()
  }
}
```

<br>

### 整理下:
```js
const sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const fun = async (arr) => {
  for(let i=0; i<arr.length; i++) {
    await arr[i]()
  }
}

fun(
  [
    () => console.log("start"),
    () => sleep(1000),
    () => console.log("1"),
    () => sleep(2000),
    () => console.log("2"),
    () => sleep(3000),
    () => console.log("end")
  ]
)
```

<br>

### 这里插下扩展 delay函数: 
```js
function delay(init = 0) {
  return new Promise(resolve => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, init)
  })
}

async handleChange(e) {
  let file = e.raw
  if(!file) return

  this.show = false
  let loadingIntance = Loading.service({
    ...
  })

  await delay(100)
  let data = await readFile(file)
}
```

<br><br>

### forEach无法办到和普通for循环的原因:
还是上面的案例:
```js
fun(
  [
    () => console.log("start"),
    () => sleep(1000),
    () => console.log("1"),
    () => sleep(2000),
    () => console.log("2"),
    () => sleep(3000),
    () => console.log("end")
  ]
)
```

<br>

我们使用了for循环来变量上面的数组 完成了在循环中每次循环延迟1s后的输出操作

<br>

**原因:**   
我们要是想完成 异步函数同步化的逻辑 await 必须在一个 async 函数中
```js
const fn = async () => {
  await ...
  await ...
  await ...
}
```

<br>

这样类似一个作用域中的 await 会依次执行, 而我们上面的for循环就达到了这样的目的

```js
const fun = async (arr) => {
  for(let i=0; i<arr.length; i++) {
    await arr[i]()
  }
}

// 相当于
const fun = async (arr) => {
  // for循环的逻辑不就是 多次输出么
  await arr[i]()
  await arr[i]()
  await arr[i]()
}
```

<br>

**思考:**  
同样的逻辑我们使用 forEach 可以完成么? 比如下面的代码还可以是等1s再输出一次么？
```js
async function fun(arr) {
  arr.forEach(async (fn) => {
    await fn()
  })
}
```

<br>

**<font color="#C2185B">结果: 不行!!</font>**   
我们发现是一次性的出现所有的结果 没有办法按效果(延迟)按顺序的输出

<br>

**forEach源码中的逻辑:**   
forEach的源码中是使用了 while 循环 每一次循环的最后再执行我们传入 forEach 中的回调
```js
function fun(arr) {

  arr.forEach(async (fn) => {
    await fn()
  })

}


while() {

  // 循环的最后才会执行
  callback() {
    await fn()
  }
}
```

<br>

也就是说 每一次循环都会重新执行一次回调 而不是在一个async函数里面一次性的执行所有的逻辑 相当于每一次的await fn的输出都被关在了 forEach 的回调中

这样每次的 await fn 都有了自己的作用域 每一个回调里面的await没办法和其他的await形成同步的关系了async之间都是异步的
```js
async forEachCallBack => {
  await fn()
}

async forEachCallBack => {
  await fn()
}

async forEachCallBack => {
  await fn()
}
```

<br>

那怎么解决 **我们需要重写forEach方法**
```js
Array.prototype.myForEach = async function(callback, thisArg ) {
  // 第二个参数是this指向

  // 我们先把this保存一下 谁调用的forEach
  const _arr = this

  const _isArray = Array.isArray(_arr)

  const _thisArg = thisArg ? Object(thisArg) : window

  // 调用者如果不是arr就抛出异常
  if(!_isArray) {
    throw new TypeError("必须是一个数组")
  }

  // 这里还是使用普通for循环的方式 整个函数是async
  
  for(let i=0; i<_arr.length; i++) {
    // 让callback本身是一个同步的执行流程
    await callback.call(_thisArg, _arr[i], i, _arr)
  }
}
```

<br>

### 总结:
forEach中不是不能指定异步的操作可以 我们可以理解为 

forEachCallBack 中的 逻辑是一个块 这个块里面的逻辑 可以保持 异步代码同步化
```js
forEach(async () => {
  await fn()
  await sleep(1000)
})
```

<br>

比如上面的代码 每次fn执行后会等待1s

但是如果是这种 不是一个块 可以都放在了一起 相当于在全局块下 执行异步代码同步化的话 那么 forEach 做不到 它只能管自己的回调 这种情况下我们要使用for循环来处理
```js
[
  () => console.log("start"),
  () => sleep(1000),
  () => console.log("1"),
  () => sleep(2000),
  () => console.log("2"),
  () => sleep(3000),
  () => console.log("end")
]
```

<br>

### 总结2:
```js
const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})

const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve(3)
  }, 1000)
})

const pArr = [p1, p2, p3]


;(async () => {
  pArr.forEach(async p => {
    console.log("test")
    let res = await p
    console.log(res)
  })
})()
/*
  我们发现类似 主线程 和 任务队列的效果 因为 forEach 是while写的 所以上面的test先会执行完毕 然后在执行回调中的逻辑
  test x 3
  1
  2
  3
*/


;(async () => {
  for(let p of pArr) {
    console.log("test")
    let res = await p
    console.log(res)
  }
})()
/*
  是不是说 要是想有交替执行的逻辑我们可以使用 for
  test
  1
  test
  2
  test
  3
*/
```

<br><br>

# 函数的柯里化 和 重写toString()
**要点: 箭头函数里面没有 arguments**  
```js
const fn = () => {
  console.log(arguments)
}
fn(1)   // 会报错
```

<br>

下面的代码 我们从 3 2 1 的顺序开始倒推
```js
function add() {

  // add(1) 传递进来的实参会在这个arguments里面
  console.log(arguments)  // 1

  let args = [...arguments]
  

  // 3. 定义 fn
  function fn() {
    // add(1)(2)传递进来的实参会在这个arguments里面
    console.log(arguments)  // 2

    // 这里我们可以将接到的参数 push到args中 同时 继续return fn 这样 add(1)(2)(3) 的3 还会被arguments接受并push到args数组中
    args.push(...arguments)
    return fn
  }


  // 2. 改写对象身上的toString()
  fn.toString = function() {
    let res = args.reduce((pre, item) => pre + item, 0)
    console.log(res)
  }

  // 1. 只有对象上才有toString方法 所以我们return 一个对象 并改写对象身上的toString()
  return fn
}

add(1)(2)(3).toString()
/*
  add(1) 调用的是 add() 拿到的是add()的返回值 fn
  add(1)(2) 调用的是 add()的返回值fn => fn(2) 
*/
```

<br><br>

# 提取query参数

### 方式1:
利用正则提取出来 name=sam 的结果集
```js
let url = "?name=sam&age=54&na=dd"

// 然后整理到一个对象里面
let obj = {}
url.match(/\w+=\w+/ig).forEach(item => {
  let arr = item.split("=")
  obj[arr[0]] = arr[1]
})



let query = "?name=sam&age=54&na=dd"

let reg = /\w+=\w+/g
let matched = query.match(reg)
console.log(matched)  // [ 'name=sam', 'age=54', 'na=dd' ]

let res = matched.map(item => item.split("="))
console.log(res)
// [ [ 'name', 'sam' ], [ 'age', '54' ], [ 'na', 'dd' ] ]

// 利用这个api
res = Object.fromEntries(res)
console.log(res)
// { name: 'sam', age: '54', na: 'dd' }


// 还可以整理成1行 但可读性不高
let res = Object.fromEntries(query.match(reg).map(item => item.split("=")))
```

<br>

### 方式2:
```js
let query = "?name=sam&age=54&na=dd"

let search = new URLSearchParams(query)
console.log(search.get("na"))
```

<br><br>

# 前后台时postman报错 编辑器报错
在日常的开发过程中 我们发送请求的数据的时候 有的时候会将js对象转成json  

那什么时候需要将js对象转成json呢？

<br>

### 场景:
有一个人测试 传对象类型的数据到后台 在编辑器里面就不会报错 但是他用postman去测试就会报错

```js 
Content-type: application/json
```

<br>

### 为什么呢？
因为编辑器或请求框架(ajax axios jquery) 对数据进行了处理

<br>

### 第一种情况: 请求头不指定格式
请求数据不指定格式, 默认就是(application/x-www-form-urlencoded) 看看后端接收参数是啥样子
```js 
{"object Object": ""}
```

<br>

### 第二种情况: 请求头指定为json格式
```js  
application/json
xhr.setRequestHeader("Content-Type": "application/json")

// 这里同时还要设置 我们传递的数据是json类型 json.stringify
```

也就是说当我们指定了请求头的格式的为json的时候 我们发送的数据的格式也必须是json

如果不指定的话 **默认就是 x-www-form-urlencoded**

<br>  

### postman中参数的类型有: 
- form-data
- x-www-form-urlencoded
- raw
- binary
- graphql

<br>

### **<font color="#C2185B">raw</font>**  
这种方式也可以成为json提交, 可能每种参数类型对应的 contentType类型 是不一样的

使用的是纯字符串上传的方式 所以在post之前可能需要将json格式的数据转换为字符串

```js 
contentType: "application/json"
data: JSON.stringify({
  org,
  msg
})

// 而 form-data 的方式就是 key-value 的提交, 数据其实是分割的
```

比如 我选择了 raw 后面的类型选择text 那么请求头中的 Content-Type: text/plain

后选择json 那么请求头中的 Content-Type: application/json

<br>

### 设置 contentType 的方式: 
```s
"Content-Type" : "application/json"
```

用于定义用户的浏览器或相关设备如何显示将要加载的数据, 或者如何处理将要加载的数据, 此属性的值可以查看 MIME 类型。

<br>

### **<font color="#C2185B">MIME</font>**  
是描述消息内容类型的因特网标准。  
MIME 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据。

content-type 一般以下面的形式出现: 
```js
Content-Type: [type]/[subtype];parameter
```

<br>

**[type] 有下面的形式:**  
**<font color="#C2185B">Text</font>**  
用于标准化地表示的文本信息, 文本消息可以是多种字符集和或者多种格式的

<br>

**<font color="#C2185B">Multipart</font>**    
用于连接消息体的多个部分构成一个消息, 这些部分可以是不同类型的数据

<br>

**<font color="#C2185B">Application</font>**   
用于传输应用程序数据或者二进制数据

<br>

**<font color="#C2185B">Message</font>**   
用于包装一个E-mail消息

<br>

**<font color="#C2185B">Image</font>**   
用于传输静态图片数据

<br>

**<font color="#C2185B">Audio</font>**   
用于传输音频或者音声数据

<br>

**<font color="#C2185B">Video</font>**   
用于传输动态影像数据, 可以是与音频编辑在一起的视频数据格式。

<br>

**[subtype]** 有下面的形式:   
用于指定 type的详细形式。**"type/subtype"** 配对的集合和与此相关的参数。

下面是最经常用到的一些 MIME 类型: 
- text/html（HTML 文档）
- text/plain（纯文本）
- text/css（CSS 样式表）
- image/gif（GIF 图像）
- image/jpeg（JPG 图像）
- application/x-javascript（JavaScript 脚本）
- application/x-shockwave-flash（Flash）
- application/xwww-form-urlencoded（使用 HTTP 的 POST方法提交的表单）
- multipart/form-data（同上, 但主要用于表单提交时伴随文件上传的场合）。

<br>

### enctype属性:
规定在发送到服务器之前应该如何<font color="#C2185B">对表单数据进行编码</font>, 默认的表单数据会编码为 ``application/x-www-form-urlencoded``

<br>

**enctype的属性值有:**

**<font color="#C2185B">application/x-www-form-urlencoded</font>**   
在发送前编码所有的字符  
这应该是最常见的 POST 提交数据的方式了。  
浏览器的原生表单, 如果不设置 enctype 属性, 那么最终就会以 ``application/x-www-form-urlencoded`` 方式提交数据。

```js
Content-Type: application/x-www-form-urlencoded;charset=utf-8
title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

提交的数据按照 ``key1=val1&key2=val2`` 的方式进行编码,  
key 和 val 都进行了 URL 转码。 

大部分服务端语言都对这种方式很好的支持, 常用的如jQuery中的ajax请求, Content-Type 默认值都是 ``application/x-www-form-urlencoded;charset=utf-8``

<br>

**<font color="#C2185B">multipart/form-data</font>**  
不对字符编码 在使用包含文件上传控件的表单时 必须使用该值  
这也是常见的post请求方式, 一般用来上传文件, 各大服务器的支持也比较好。  
所以我们使用表单 上传文件 时 必须让表单的enctype属性值为 multipart/form-data

<br>

**注意:**  
以下两种方式都是浏览器原生支持的。
- application/x-www-form-urlencoded
- multipart/form-data

<br>

**<font color="#C2185B">application/json</font>**  
它可能对应的就是 raw application/json作为响应头并不陌生, 实际上, 现在很多时候也把它作为请求头

用来告诉服务端消息主体是序列化的JSON字符串, 除了低版本的IE, 基本都支持。  

除了低版本的IE都支持JSON.stringify()的方法, 服务端也有处理JSON的函数, 使用json不会有任何麻烦。

<br>

**<font color="#C2185B">text/plain</font>**  
空格转换为"+"加号, 但不对特殊字符编码

<br><br>

# postman中 post请求的 form-data、 x-www-form-urlencoded、 raw、 binary 的区别:

### **<font color="#C2185B">form-data</font>**  
等价于http请求中的 ``multipart/form-data`` 

它会将表单的数据处理为一条消息, 以标签为单元, 用分隔符分开。 既可以上传键值对, 也可以上传文件。

当上传的字段是文件时, 会有  
- **Content-Type**: 来表名文件类型  
- **content-disposition**: 用来说明字段的一些信息

由于有boundary隔离, 所以 multipart/form-data 既可以上传文件, 也可以上传键值对, 它采用了键值对的方式, 所以可以上传多个文件。

<br>

### **<font color="#C2185B">x-www-form-urlencoded</font>** 
等价于 application/x-www-from-urlencoded ,会将表单内的数据转换为键值对 比如 name=java&age = 23

<br>

### **<font color="#C2185B">raw</font>** 
可以上传任意格式的文本, 可以上传text、json、xml、html等

<br>

### **<font color="#C2185B">binary</font>**  
相当于 ``Content-Type:application/octet-stream``
从字面意思得知, 只可以上传二进制数据, 通常用来上传文件, 由于没有键值, 所以, 一次只能上传一个文件。

<br><br>

# 通过创建类 实例化该类的时候 自动给指定元素添加特殊的功能
```js
// app.js
window.addEventListener("load", () => {
  new Scroll();
  new EnviromentLinkChange();
});


// util.js
import SweetScroll from "sweet-scroll";

// 创建类的目的就是 当new该类的时候 页面上的元素就是自动的添加一些功能
export default class Scroll {
  constructor() {
    this.eventBind();
  }

  eventBind() {
    new SweetScroll({
      trigger: "a[href^='#']",
      offset: -110,
    });
  }
}
```

<br><br>

# requestAnimationFrame API (分页逻辑 分页渲染结构)

### 后端逻辑: 
组织好10w+数据 返回给前端

```js
const http = require("http)

http.craeteServer((req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    'Access-Control-Allow-Headers': 'Content-Type'
  })

  let list = []
  let num = 0

  for(let i=0; i<100000; i++) {
    num++
    list.push({
      src: "一张图片",
      text: `我是${num}号选手`,
      id: num
    })
  }

  res.end(JSON.stringify(list))

}).listen(3000, () => {
    console.log("server is listening on 3000 port")
})
```

<br>

### 前端逻辑:
AJAX获取请求数据 封装请求函数: 
```js
const getList = () => {
  return new Promise((resolve, reject) => {
    let ajax = new XMLHttpRequest()
    ajax.open("get", "http://127.0.0.1:3000")
    ajax.send()
    ajax.onreadystatechange = function() {
      if(ajax.readyState == 4 && ajax.status == 200) {
        resolve(JSON.parse(ajax.responseText))
      }
    }
  })
}
```

<br>

### 直接渲染方法:
将我们从后端获取的10w条数据一次性的渲染到页面上 (非常耗时)

封装渲染结构的函数: 
```js
const renderList = async () => {
  const list = await getList()
  list.forEach(item => {
    const div = document.createElement("div")
    div.className = "xxx"
    div.innerHTML = `<img src="${item.src}"><span>${item.text}</span>`
    container.appendChild(div)
  })
}

renderList()
```

<br>

### setTimeout分页渲染:
**定义变量:**
```js
// 总数据的条数
total: list.length  

// 自定义每页显示条数 变量 
limit: 200  

// 自定义当前页 变量(初始值) 
page: 0     

// 总页数(总数据条数/每页显示条数) 
totalPage: Math.ceil(total / limit)   
```

<br>

**渲染逻辑:**  
定义分页渲染函数 利用递归 循环渲染 递归的退出条件 当前页 >= 总页数  
开启定时器 0秒间隔 分批渲染

第一次渲染前200条 第二次渲染后200条

```js
const renderList = async () => {
  const list = await getList()
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total/limit)

  const render = page => {
    if(page >= total) return
    setTimeout(() => {
      for(let i = page * limit; i  < page * limit + limit; i++) {
        const item = list[i]
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        container.appendChild(div)
      }

      render(page + 1)
    }, 0)
  }

  render(page)
}
```

<br>

### requestAnimationFrame 渲染
使用requestAnimationFrame代替setTimeout, 减少了重排的次数, 极大提高了性能, <font color="#C2185B">建议大家在渲染方面多使用requestAnimationFrame</font>

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
    // 如果页码比总页数大 则停止 递归的停止条件
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

# 交换数组中元素的位置

### 方式1: 利用 解构
```js
let arr = [
  {id:1, name: "1"},
  {id:2, name: "2"},
  {id:3, name: "3"},
]

let [item1, item2, item3] = arr
let newArr = [item3, item1, item2]

console.dir(newArr);
```

<br>

### 方式2: 利用 位运算
位运算只能交换整数

**要点:**
num1 ^ num2 ^ num1 = num2的值 3个数结果跟最少的那个一样

```js
num1 ^ num2 ^ num1 = num2
```
    

我们把两个数的 ^ 结果保存起来

```js
let temp = num1 ^ num2
```

```js
let [num1, num2] = [1, 2]

let temp = num1 ^ num2

num1 = temp ^ num1
num2 = temp ^ num2

let arr = [num1, num2]
console.log(arr)    // [ 2, 1 ]
```

<br><br>

# 将数组中的元素 插入数组中指定的位置
```js 
let arr = [
  {id:1, name: "sam"},
  {id:2, name: "erin"},
  {id:3, name: "nn"},
]

/**
 * @id: 根据id找出要移动的元素
 * @delIndex: 将要 要移动的元素删除
 * @targetIndex: 将目标元素 移动到哪个元素的前面
 * @arr: 要操作的数组
*/
function changeEl(id, delIndex, targetIndex, arr) {
  let obj = arr.find((item) => {
    return item.id == id
  })

  arr.splice(delIndex, 1)
  arr.splice(1, 0, obj)
  return arr
}

changeEl(3, 2, 1, arr)
console.table(arr);
```

<br>

# once 实现原理

### 要点:
- 我们要解决 this 的问题 也就是给谁绑定的回调 this 就应该是谁 所以这里我们最好不要用 箭头函数

- 利用 节流阀 的原理 来实现 once 操作

- btn.onclick = once(handle, "hello") 由于 once() 加上了小括号 所以它一上来就会调用 这是函数的形式调用 所以once()里面的this 是window

- 上面说了 once() 会自调用 所以我们要return 一个函数 将这个函数交给 onclick 作为回调 这时这个内部函数中的this 就是元素
 
- once(callback) 的第一个参数是一个回调 我们要将this传递给这个回调 同时考虑传递多个参数的问题 我们使用的是 fn.apply()

```js 
let btn = document.querySelector("div")

function once(fn, ...args) {

  // 节流阀
  let flag = true

  // window
  console.log(this)

  return function() {
    if(flag) {
      // 这个是onclick的回调 所以这里的this是元素
      console.log(this)

      // 关闭节流阀
      flag = false

      // 解决this的问题
      fn.apply(this, args)
    }
  }
}


// 指定回调
function handle(param) {
  console.log(param)
}

// 实现
btn.onclick = once(handle, "hello")
```

<br><br>

# 合并数组

### 方式1:
```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let arr = [...arr1, ...arr2]
console.log(arr)    // [ 1, 2, 3, 4, 5, 6 ]
```

<br>

### 方式2:
```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let arr = [].concat(arr1, arr2)
// 或者
let arr = Array.prototype.concat.call([], arr1, arr2)
console.log(arr)
```

<br>

### 方式3:
我怎么觉得这样的方式好别扭
```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

Array.prototype.push.apply(arr1, arr2)
arr1.push.apply(arr1, arr2)
```

<br><br>

# reduce完成 promise链
reduce的请求技巧 等待上一个请求完成后 再请求下一个
```js
const host = "https://www.dydytt.net"
const uri = "/html/gndy/rihan/list_6_2.html"

// 创建 请求完整路径的数组
let pageArr = []

// 循环加工 完整的请求路径
for(let i=1; i<= 100; i++) {
  pageArr.push(host + `/html/gndy/rihan/list_6_${i}.html`)
}

// 这个arr中装着一个分类下所有的电影页面
console.log(pageArr)


// 我们要请求 pageArr 中的每一项 但是我们需要的是 在一个请求结束后再进行下一个请求
pageArr.reduce((promise, url) => {
  return promise.then(() => {
    return new Promise(async (resolve) => {
      await req(url)
      resolve()
    })
  })
}, Promise.resolve())
// 这种方式会等待上一个req请求完成后 再执行下一个请求
// promise参数就是我们的默认值 Promise.resolve()
```

<br><br>

# JavaScript 循环中使用 async/await

### 按顺序读取Promise:
假设有一个文件列表, 我们想按顺序读取并记录每个文件的内容。怎么做呢？我们可以在异步函数中使用for ... 循环。请看代码片段

```js
async function printFiles () {
  let fileNames = ['picard', 'kirk', 'geordy', 'ryker', 'worf'];

  for (const file of fileNames) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
}
```

<br>

**注意:**  
如果你想按顺序读取文件, 则不能使用forEach循环。

```js
async function someFunction(items) {
  items.forEach(async(i) => {
    const res = await someAPICall(i);
    console.log('<br>>', res);
  });
}


function someAPICall(param) {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve("Resolved" + param)
    },param);
  })
}

someFunction(['3000','8000','1000','4000']);
```

在上面的代码中, 有一个名为someFunction的简单异步函数, 它接受数组作为参数, 迭代该数组并为每个数组项发出API请求（通过一个假的API函数哈哈）。  

此时, 我们希望按顺序解析API调用。希望输出打印的内容如下所示: 

```js
// 预期输出
3000
8000
1000
4000
```
    

但实际上, 我们看到的不是这样的输出, 而是以下结果

```js
// 实际输出
1000
3000
4000
8000
```

forEach循环不是按顺序进行API调用, 而是一个接一个连续地调用API, 中间不等待前一个调用完成。

这就是为什么我们得到的是第一次解析的promise。这也是我们不使用forEach循环的主要原因。

相反, 我们可以使用reduce函数来遍历数组并按顺序解析promise。来看下面这个例子。

```js
function testPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processing ${time}`);
      resolve(time);
    }, time);
  });
}

let result = [3000,2000,1000, 4000].reduce( (accumulatorPromise, nextID) => {
  return accumulatorPromise.then(() => {
    return testPromise(nextID);
  });
}, Promise.resolve());

result.then(e => {
  console.log("All Promises Resolved !!✨")
});
```

<br>

### 并行解析Promise:
接下来, 让我们看看如何并行解析promise。  

回到第一个例子。现在我们想要并行读取, 而不是按顺序读取文件。在这种情况下, 我们不关心内容在控制台中的打印顺序。  

因此就可以将Promise.all()函数与map一起使用。

```js
async function printFiles () {
  let fileNames = ['picard', 'kirk', 'geordy', 'ryker', 'worf'];

  await Promise.all(fileNames.map(async (file) => {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }));
}
```

每个async回调函数调用都会返回一个promise, 我们将它们保存起来, 并与Prmiss.all()并行地一次性进行解析。

<br><br>
    
# 判断空对象
### 方式1: 
```js
let oo = {}
oo = JSON.stringify(oo)     // '{}'
```

### 方式2: 
```js
Object.keys(oo).length == 0
```

<br><br>

# 启发: 有趣的数据结构遍历 
```js 
let before = {
  Vmmare: ["128.203.64", "128.2.1.2"]
}

let handler = []

!function(before, handler) {
  let obj = {}
  for(let key in before) {
    obj.value = key
    obj.label = key
    obj.children = []
    before[key].forEach((item, index, arr) => {
      let childObj = {}
      childObj.value = arr[index]
      childObj.label = arr[index]
      obj.children.push(childObj)
    })
  }
  handler.push(obj)
  //return option
}(before, handler)


// 结果
const option = [
  {
    value: "Vmmare",
    label: "Vmmare",
    children: [
      {
        value: "128.203.64",
        label: "128.203.64"
      },
      {
        value: "128.2.1.2",
        label: "128.2.1.2"
      },
    ]
  }
]


// 类案例
let data = [
  {
    type: "无类型",
    store: null,
    rule: null,
    relateCode: null,
    id: 35,
    projectId: 1,
    versionId: null,
    groupId: 4,
    primaryDomainId: "rdr_examiantion",
    primaryDomainName: "影像学检查",
    secondaryDomainId: "SBS",
    secondaryDomainName: "骨扫描",
    variableName: "数据抽取时间",
    variableCode: "EMGRPID",
    examSearchCode: 0,
    examIsQuantify: 0,
    valueType: "string",
    classificationFlag: false,
  },
  {
    type: "无类型",
    store: null,
    rule: null,
    relateCode: null,
    id: 34,
    projectId: 1,
    versionId: null,
    groupId: 4,
    primaryDomainId: "rdr_examiantion",
    primaryDomainName: "影像学检查",
    secondaryDomainId: "SBS",
    secondaryDomainName: "骨扫描",
    variableName: "就诊标识",
    variableCode: "VISITNUM",
    examSearchCode: 0,
    examIsQuantify: 0,
    valueType: "string",
    classificationFlag: false,
  },
]

console.log("原始", data)

function dataForamt(data) {
  let obj = {}
  let childObj = {}
  data.forEach(item => {
    obj.primaryDomainId = item.primaryDomainId
    obj.primaryDomainName = item.primaryDomainName
    obj.name = item.primaryDomainName
    obj.children = []

    childObj.secondaryDomainId = item.secondaryDomainId
    childObj.secondaryDomainName = item.secondaryDomainName
    childObj.name = item.secondaryDomainName
    childObj.children = []

    obj.children.push(childObj)
    childObj.children.push(item)
  })

  return obj
}

let res = dataForamt(data)
console.log("修改", res);



/*
在原始的函数 dataForamt 中, 循环遍历数据并创建对象的过程存在问题。每次循环迭代时, 都会重复使用同一个 childObj 对象, 导致最后结果中所有子项都指向同一个对象。

以下是改进后的方案, 使用 Array.reduce() 方法进行数据格式化
*/
// 更新
function dataFormat(data) {
  const result = data.reduce((obj, item) => {
    const primaryDomainId = item.primaryDomainId;
    const primaryDomainName = item.primaryDomainName;
    const secondaryDomainId = item.secondaryDomainId;
    const secondaryDomainName = item.secondaryDomainName;
    
    // 查找主领域是否已存在
    let primaryDomain = obj.find(domain => domain.primaryDomainId === primaryDomainId);
    if (!primaryDomain) {
      primaryDomain = {
        primaryDomainId,
        primaryDomainName,
        name: primaryDomainName,
        children: []
      };
      obj.push(primaryDomain);
    }
    
    // 查找子领域是否已存在
    let secondaryDomain = primaryDomain.children.find(domain => domain.secondaryDomainId === secondaryDomainId);
    if (!secondaryDomain) {
      secondaryDomain = {
        secondaryDomainId,
        secondaryDomainName,
        name: secondaryDomainName,
        children: []
      };
      primaryDomain.children.push(secondaryDomain);
    }
    
    // 将数据项添加到子领域的 children 数组中
    secondaryDomain.children.push(item);
    
    return obj;
  }, []);
  
  return result;
}

let res = dataFormat(data);
console.log("修改", res);

```

<br><br>

# null和undefined 是否相等
```js
console.log(null == undefined)
//true

console.log(null === undefined)
//false
```

观察可以发现: null和undefined 两者相等, 但是当两者做全等比较时, 两者又不等。

<br>

**<font color="#C2185B">null</font>**  
Null类型, 代表"空值", 代表一个空对象指针, 使用typeof运算得到 "object", 所以你可以认为它是一个特殊的对象值。

<br>

**<font color="#C2185B">undefined</font>**  
Undefined类型, 当一个声明了一个变量未初始化时, 得到的就是undefined。 

实际上, undefined值是派生自null值的, ECMAScript标准规定对二者进行相等性测试要返回true

<br><br>

# 随机生成字符串
toString(36): 表示为由0-9, a-z组成的的36进制字符串。

```js 
let res = getRandomString(48)
console.log(res)
console.log(res.length)

let ret = Math.random().toString(36)
console.log(ret)

function getRandomString(n) {
  let str = '';

  // 循环拼接str直到指定位置
  while (str.length < n) {
    // 得到的是 0.xxx 所以要截取
    str += Math.random().toString(36).substr(2);
  }
  
  // 结果肯定是比指定位数多 所以这里只取指定位置
  return str.substr(str.length n);
}
```

<br><br>

# 滚动到底部
当一个盒子内部的内容增加的时候 并且超过该盒子的高度的时候 我们希望它自动滚动到底部

```js
element.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
});
```

```js
let box = ...
box.scrollTo({
  top: box.scrollHeight,
  behavior: "smooth"
})
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

### 注意事项: 事件多次触发问题:
- 当存在多个属性过渡变化时, 结束时会多次触发transitionend事件。
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

# new Image: 

### 生成图片的3种方式:

**方式一:**  
将 img标签字符串 填入body中 innerHTML方式
```js 
function a() {
  document.getElementById("d1").innerHTML = "<img src='http://baike.baidu.com/cms/rc/240x112dierzhou.jpg'>";
}

a();
```

<br>

**方式二:**  
创建img标签 给src属性赋值 然后appenChild
```js
function b() {
  var d1 = document.getElementById("d1");
  var img = document.createElement("img");
  img.src = "http://baike.baidu.com/cms/rc/240x112dierzhou.jpg";
  d1.appendChild(img);
}
b();
```

<br>

**方式三:**  
创建image对象
```js 
function c() {
  var cc = new Image();
  cc.src = "http://baike.baidu.com/cms/rc/240x112dierzhou.jpg";
  document.getElementById("d1").appendChild(cc);
}
c();
```

<br><br>

# try和catch的用法

### 执行规则: 
首先执行try中的代码 如果抛出异常会由catch去捕获并执行  

如果没有发生异常 catch去捕获会被忽略掉 但是不管有没有异常最后都会执行。

<br>

**<font color="#C2185B">try</font>**  
语句使你能够测试代码块中的错误。

<br>

**<font color="#C2185B">catch</font>**  
语句允许你处理错误

<br>

**<font color="#C2185B">throw</font>**  
语句允许你创建自定义错误。（抛出错误）

<br>

**<font color="#C2185B">finally</font>**  
使你能够执行代码, 在 try 和 catch 之后, 无论结果如何。

```js
try {
  代码块
  throw "字符"   //抛出错误

//抓住throw抛出的错误
} catch(参数) {      

  //处理错误并执行

} finally {

  //无论try catch结果如何还是继续执行
}
```

<br>

### 实例:
```html
<p>请输出一个 5 到 10 之间的数字:</p>
<input id="demo" type="text">
<button type="button" onclick="myFunction()">测试输入</button>
<p id="mess"></p>

<script>  
function myFunction(){
  try { 
    // 取元素的值
    var x = document.getElementById("demo").value;  

    //根据获取的值, 抛出错误
    if(x=="")    throw "值为空";       
    if(isNaN(x)) throw "不是数字";
    if(x>10)     throw "太大";
    if(x<5)      throw "太小";

  } catch(err) {

    //抓住上面throw抛出的错误, 给p标签显示
    var y = document.getElementById("mess");     
    y.innerHTML="错误: " + err + "。";

  } finally {
    document.getElementById("demo").value = "";
  }
}
 </script>
```

<br><br>

# 伪协议 与 真协议

### 真协议:
用来再因特网上的计算机之间传输数据包, 如HTTP协议, FTP协议等

<br>

### 伪协议:
是一种非标准化的协议, Javascript: 

```html
<!--通过一个链接来调用Javascript函数  -->
<a href="javascript:popUp('http://www.example.com')">Example</a>

<!--在HTML文档里通过javascript: 调用js代码的做法非常不好 -->
```

<br><br>

# 性能考虑:

### 尽量少访问 DOM 和 尽量减少标记(减少在HTML文档中写没有用的结构)
只要是查询DOM中的某些元素, 浏览器都会搜索整个DOM树, 从中查找可能匹配的元素, 我们可以尽量应用变量, 把第一次搜索到的结果保存到变量里 重复使用
```js

if(document.getELementsByTagName('a').length >  0){
  let links = document.getElementsByTagName('a');
  for(let i = 0; i<links.length; i++){  }
}

// 这里使用了两次document.getElementsByTagName('a'), 浏览器就搜索了两次DOM树
↓

let links = document.getELementsByTagName('a');
if(links.length>0){

}
```

<br><br>

# 获取视口的尺寸
不是根标签的可视区域 就是视口的大小 可以说是分辨率

正常我们的可视区域是到padding 但是它就是视口大小 不受marginpadding的影响
```js
let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight; 
```

这个规则跟普通的clientWidth一样, 到padding 比如分辨率是1366 我加了margin50, 下面拿到的就是1266 上面拿到的就是1366

```js
let w = document.documentElement.offsetWidth
```

<br>

绝对位置: 到body距离（html和body之间的margin要清除）

原生实现: while循环不断的去累加
- body的offsetParent ->  null
- body的offsetLeft ->  0
- body的offsetHeight ->  0

缺点:  没有办法兼容border和margin
    
相对位置: 到视口的距离

原生实现: 绝对位置的实现上 减去 滚动条滚动的距离（滚动条滚动时元素滚动的距离）

<br><br>

# DOM事件流
事件流描述的是从页面中接收事件的顺序

事件发生时会在元素节点之间按照特定的顺序传播, 这个传播过程就是DOM事件流

例子: 我给div绑定了一个事件, 它的结构是这样

    Document
       ↓
      html
       ↓
      body
       ↓
      div

当我们发生click事件时 它的顺序是

    Document先接收到了点击的事件 它不会进行任何操作, 往下传播
            ↓
    Html接收到了点击事件, 一样不进行任何操作, 往下传播
            ↓
    Body接收到了点击事件, 一样不进行任何操作, 往下传播
            ↓
    Div, 这个阶段叫做 目标阶段  上述的阶段叫做捕获阶段

然后还会从 目标阶段 从底层往顶层传播 叫做冒泡阶段

<br>

- JS代码中只能执行捕获 或 冒泡其中的一个阶段
- on...的事件 和 attachEvent 只能得到冒泡事件
- 没有冒泡的事件, onblur onfocus onmouseenter onmouseleave

<br><br>

# 窗口加载事件

### DOMContentLoaded:
```js
document.addEventListener('DOMContentLoaded', function(){});
```

DOMContentLoaded 事件触发时, 仅当DOM加载完成, 不包括样式表, 图片, flash等

如果页面的图片很多的话, 从用户访问到onload触发可能需要较长的时间,交互效果就不能实现, 必然影响用户的体验, 此时用DOMContentLoaded事件比较合适  

<br><br>

# 获取一个元素对象的绝对位置:
### **<font color="#C2185B">元素对象.getBoundingClientRect()</font>**  
该方法会返回一个对象, 我们可以通过.的方式读取到内部的属性
```js
{
  width
  height
  x   // 元素左上角的坐标
  y
  top 
  bottom 
  left 
  right
  /*
    上边距离顶部的距离
    下边距离顶部的距离
    左边距离左侧的距离
    右边距离左侧的距离
  */
}
```

<br>

### 技巧:
```s
getBoundingClientRect + 滚动条滚动时元素滚动的距离---> 绝对位置
```

<br><br>

# style.cssText
cssText代表样式字符串, 跟ele.style.name = value功能一样, 都是用来设置元素的内联样式

<br>

### 区别:
功能是一样的, 只不过 ``ele.style.cssText`` 可以同时设置多个样式属性 而ele.style.name=value只能同时设置一个样式属性

```js
ele.style.width = '10px'
ele.style.height = '10px'
    
// 类似在写css属性一样
ele.style.cssText = `
  width:10px; 
  height:10px
`
```

一种是多行单一设置, 一种是单行多种设置。 

如果需要设置的样式属性有很多, 那么代码自然就会很多, 而且用js来覆写对象的样式是比较典型的一种销毁原样式并重建的过程, 这种销毁和重建, 都会增加浏览器的开销, 在一定程度上回消耗浏览器性能。

<br>

### 性能有优势:
但是在具体到业务上来说, 同效果配合, 不断变换样式属性达到效果目的, 这时候, 就会体现出来cssText的优势了。亲测在高端手机上没有多大差别, 在稍微低端点的手机上, ele.style.cssText=value流畅度优于ele.style.name=value。

<br>

### style.cssText 比 style.name的权重高
不过, 在设置cssText值的时候, 会有一个问题, 每次设置的cssText的值, 都会把原来的cssText的值销毁重新赋值, 也就是把原来的清除掉。所以可以用累加的形式, 

```js
ele.style.cssText+=';width:300px;height:200px;border:1px solid red;'


let arr = ["red", "green", "blue", "orange"]
let divs = document.querySelectorAll("div")
Array.from(divs).forEach((item, index) => {
  item.style.cssText += `background: ${arr[index]}; float: left`
  if(index % 2 == 0) {
    item.style.clear = "both"
  }
})
```

<br><br>

# 重新加载页面触发的事件

### pageshow事件:
事件在页面显示时触发, 无论页面是否来自缓存, 在重新加载页面中, pageshow会在load事件触发后触发

根据事件对象中的persisted来判断是否是缓存中的页面触发的pageshow事件

<br>

### pageshow onload事件的区别: 
下面三种情况都会刷新页面, 都会触发load事件
- a标签的超链接, 点完后会跳转页面
- f5刷新
- 前进后退按钮

但是火狐中, 有个特点 有个"往返缓存", 这个缓存中不仅保存着页面数据, 还保存了dom和js的状态, 实际上是将整个页面都保存在内存里, 所以此时后退按钮不能刷新页面

此时可以使用pageshow事件来触发, 这个事件在页面显示时触发, 无论页面是否来自缓存, 在重新加载页面中, pageshow会在load事件触发后触发, 根据事件对象中的persisted来判断是否是缓存中的页面触发的pageshow事件

<br>

### **注意:**
这个事件给window添加

<br>

### 事件对象: e.persisted
这个页面是否来自于缓存, 如果是true 不是false

<br>

### 总结:
我们绑定load事件是为了进行页面加载后的相关处理函数, 但是在火狐中 它会把页面缓存到内存中, 这时候我们后退页面并不会刷新内部的数据, 换句话说 假如我们重新计算刷新后的页面数据, 火狐里就不好用了

<br><br>

# document.writeln()
使用这个方法写完的东西自动换行

<br><br>

# 清空数组的技巧
赋空值 相当于将数组引向一个空对象
```js 
let hd = [1,2,3]
hd = []
```

<br>

修改长度 修改原数组 彻底清除数组的好方式
```js 
let hd = [1,2,3]
hd.length = 0
```

<br>

使用splice()
```js 
let hd = [1,2,3]

// 从0开始往后删除
hd.splice(0)
```

<br><br>

# 判断是否是数组还是对象
### Object.prototype.toString.call(目标对象)
```js 
let objRes = Object.prototype.toString.call(obj)
console.log(objRes)     // "[object Object]"

let arrRes = Object.prototype.toString.call(arr)
console.log(arrRes)     // "[object Array]"

let objRes = {}.toString.call(obj)
console.log(objRes)     // "[object Object]"
```

<br><br>

# 获取页面高度 宽度的API:
### **<font color="#C2185B">document.documentElement.clientWidth</font>**
获得的是屏幕可视区域的宽高, 不包括滚动条与工具条

<br>

### **<font color="#C2185B">document.body.clientWidth</font>**
获得的也是可视区域的宽度

document.body.clientHeight 获得的是body内容的高度 , 那么这个高度也是200px

<br>

### **<font color="#C2185B">window.innerWidth</font>**
获得的是可视区域的宽高, 但是window.innerWidth宽度包含了纵向滚动条的宽度

(IE8以及低版本浏览器不支持)

window.innerWidth document.documentElement.clientWidth 获取垂直滚动条宽度

<br>

### **<font color="#C2185B">window.outerWidth</font>**
获得的是加上工具条与滚动条窗口的宽度与高度

<br><br>

# 递归函数的定义
通过递归的形式 获取角色下所有三级权限的id 并保存到 defKeys 数组中
```js  
getLeafKeys(node, arr) {
// node用来判断是否是3级权限节点 是否为3级节点我们可以判断它是否包含children属性

// 如果该节点包含了children属性 证明它不是三级节点 如果没有children属性则证明它是三级节点

if(!node.children) {
  return arr.push(node.id)
} else {
  node.children.forEach(item => {
    this.getLeafKeys(item, arr)
  })
}
}
```

<br><br>

# 检查重复字符串
```js  
let str = "ca"

function checkStr(str) {
  let res = new Set(str)
  if(str.length === res.size) {
    return false
  } else {
    return true
  }
}

console.log(checkStr(str))



let str = "abbbc"
let o = {}
for(let i=0; i<str.length; i++) {
  if(str[i] in o) {
    o[str[i]] += 1
  } else {
    o[str[i]] = 0
  }
}
console.log(o)
let res = Object.values(o)
console.log(res);



let str = "abcc"

function checkStr(str) {
  let flag = false
  for(var i=0; i<str.length; i++) {
    for(var j=i+1; j<str.length; j++) {
      if(str[i] === str[j]) {
        flag = true
      } else {
        flag = false
      }
    }
  }

  return flag
}

let res = checkStr(str)
console.log(res);
```

<br><br>

# iframe 相关:
### 获取父网页中的iframe
```js 
myFrame = window.frames[ifname的name名或者id之类的吧].document
```

<br>

### iframe也有onload事件
```js 
let main_frame = $('.main_frame')
main_frame.on('load', function() {
  let doc = window.frames['main_frame'].document
  main_frame.css('height', `${doc.documentElement.scrollHeight}px`)
})
```

<br><br>

# postMessage的使用场景
我在做项目中的场景是 父页面有一个iframe标签 在处理iframe标签的时候 我遇到的几个问题

<br>

### 问题1:  
出现了双重垂直滚动条, iframe和页面都出现了滚动条  
当我禁用了滚动条后 发现iframe区域不能按照里面的子网页的高度更新高度

<br>

**解决办法:**  
使用了 iframe.onload事件 当iframe加载完毕之后, 读取iframe内部网页的高度然后把值设置给iframe框架
```js
let main_frame = $('.main_frame')
main_frame.on('load', function() {
  let doc = window.frames['main_frame'].document
  main_frame.css('height', `${doc.documentElement.scrollHeight}px`)
})
```

<br>

### 问题2:
iframe中的子网页中 点击按钮添加行, 导致iframe的高度发生变化, 但是没办法实时的反应给父网页

<br>

**解决办法:**  
<font color="#C2185B">给谁发信息就写谁.postMessage(数据, * | URL | / | 协议-端口/, [transfer])</font>  

它可以实现两个页面之间相互传递数据

- 它可以是父网页向iframe发送数据
- 也可以是子网页向父网页发送数据

<br>

**接收方:**
```js 
window.addEventListener('message', function(e) {
  if(e.orgin !== '目标网址') {
      return  
  }
  event.data就是数据
})
```

<br>

**发送方:**
这个是子网页(iframe里的)向父网页中发射数据, window.parent
```js 
window.parent.postMessage(data, 'https://127~:5000')
```

<br><br>

# 设置随机数范围的时候 random()*255 255就是范围

<br><br>

# 关于模块之间的数据传递
我们有的时候需要将一个模块中的数据传递到另一个模块 可以通过回调函数的方式
```js 
// A模块 在函数中创建两个函数形参 通过函数形参的方式将结果回调出去
function request(config, success, failure) {
  instance(config)
    .then(res => {

    // 通过success函数 将成功的结果回调出去
    success(res);
    })
    .catch(err => {

    // 通过failure函数 将失败的结果回调出去
    failure(err);
  })
}

// B模块接收的时候, 传入函数 形参就是A模块传递的实参
request({
  url: 'home/multidata'

  // success回调函数
  }, res => {
  // 这里可以打印 或者将结果保存在组件的data中
  console.log(res);

  // failure回调函数
  }, err => {

  // 这里就是请求失败的错误对象err是axios回调出来的
  console.log(err)
})
```

<br><br>

# 双击禁止选中文字
```js
window.getSelection 
  ? window.getSelection().removeAllRanges() 
  : document.selection.empty();
```


常规项目, 我们只需要给标签加一个onselectstart事件, return false就可以

```html
<div onselectstart="return false;" ></div>
```

**react中 用css解决 user-select:none**

<br><br>

# 让页面滚动到指定位置:
### **<font color="#C2185B">window.scroll(x, y)</font>**  
可以让窗口的滚动到指定位置  
不用加单位 直接写数字即可 window.scroll(0, 100)

<br><br>

# 节流阀:

### 要点:
当一个动画结束后再执行下一个 需要flag变量 和 回调函数搭配使用

<br>

### 节流阀目的: 
当上一个函数动画内容执行完毕, 再去执行下一个函数动画, 让事件无法连续触发

```js
// 防止轮播图按钮连续点击造成播放过快
if(flag) {flag = false} ---> 回调函数里( flag = true)
```

<br>

### 核心思路: 
利用回调函数, 添加一个变量来控制, 锁住函数 和 解锁函数 在某些条件下 关上水龙头 在某些条件下打开水龙头


```js
// 开始
let flag = true;

if (flag) {
  flag = false;
  do somethind;   
}

// 如果flag为true 进来我就给你变成false 锁住函数 然后可以做一些事情 现在就相当于水龙头已经关闭了 当再次点击的时候 你就没办法再放水了 因为是false了,if(flag) 为false了 就没办法执行里面的代码了 就没办法播放图片了

// 但不能一直不播放啊 什么情况下可以播放呢? 利用回调函数 动画执行完毕, flag = true ---> 打开水龙头 这时候我们又进入的新的开始
```

```js
let flag = true;

arrowR.addEventListener('click', function () {

  if(flag) {

    // 先给它关了 进来后先给你取反 然后执行下面的代码 
    flag = false;

    if(num >= ul.children.length-1){
      ul.style.left = 0;
      num = 0;
    }
    num++;

    // 当动画执行完毕后 我们打开节流阀
    animate(ul, -num*focusWidth, function(){
      flag = true;
    });

    circle++;
    circle %= ol.children.length;
    circleChange();
  }
});
```

<br><br>

# 克隆节点的优势:
**<font color="#C2185B">节点.cloneNode()</font>**
动态生成节点, 目前用法: 克隆 轮播图的第一张图片的节点 让它实现无缝轮播
```js
// 定义一个变量
let num = 0;

// 克隆第一张图片放到ul的最后面
let first = ul.children[0].cloneNode(true);
ul.appendChild(first);

// 完成点击按钮滚动图片的功能
arrowR.addEventListener('click', function () {
  if(num >= ul.children.length-1){
    ul.style.left = 0;
    num = 0;
  }
  num++;
  animate(ul, -num*focusWidth);
});
/*
  点击到下一张肯定需要一个变量和图片的宽度(移动距离)联系起来, 下一张就是一个变量自增1 

  无缝滚动 点击最后一张会回到第一张
  实现方式: 
  1 2 3 1
  在3的后面再放一张跟1一样的图片 当到最后一张1的时候 让ul的left直接为0

  对上面初步完善的功能进行改善
  1. 我们是在html结构里克隆的li, 这样导致了导航点多了一个
  2. 能不能让js克隆一份放在最后面呢?

  克隆第一张图片:
  1. 克隆ul第一个li cloneNode(true) true复制里面的子节点
  2. 添加到ul最后面 appendChild

  为什么使用克隆的功能小圆点并没有增加?
  因为我们克隆的方法 写在了 动态生成导航点的下面

  这种方法实现了两个功能一个是导航点不会多, 又是动态生成
*/
```

<br><br>

# 手动调用事件 元素对象.click()

### 场景:
pink轮播 自动播放的部分 实现的逻辑就是点击右侧按钮的逻辑 所以使用了元素对象.click() 这样可能就会调用这个元素对象身上的事件

比如 想让定时器自动调用一个事件
```js
let timer = setInterval(function(){
  // 手动调用点击事件
  arrowR.click();
}, 2000)
```

<br><br>

# 滚动条是谁的 body 还是 html
### chrome 认为滚动条是body的: 
```js
// body滚动条的距离
var st = document.body.scrollTop;   //chrome能获取到坐标
```

<br>

### 火狐等认为滚动条是html的
```js
// html根标签滚动条的距离
var st = document.documentElement.scrollTop;   //火狐等浏览器能获取到
var st = document.body.scrollTop || document.documentElement.scrollTop;
```

<br><br>

# 获取当前屏幕的宽度:
**<font color="#C2185B">window.innerWidth innerHeight</font>**
当前屏幕的宽度 高度 (没有单位)

<br><br>

# 禁用屏幕滚动条
```js
document.body.parentNode.style.overflowY = "hidden";
```

<br><br>

# 时间毫秒数转换
毫秒数 / 1000 转换为秒数后计算更精确些
```js
d = parseInt(总毫秒数 / 60 / 60 / 24);
h = parseInt(总毫秒数 / 60 / 60 % 24);
m = parseInt(总毫秒数 / 60 % 60);
s = parseInt(总毫秒数 % 60);

```
    
<br><br>

# 一个函数 两种情况都可以用的情况下 我们可以将 boolean值传递进去
- 当 true  是一种效果  
- 当 false 是一种效果

```js 
nextPage(false);

function nextPage(next){
  let offset = next ? -PAGE_WIDTH : PAGE_WIDTH;
} 
```

<br><br>

# 检查元素是否存在

### 使用 nodeName 来检查一个元素是否存在, nodeName的值总是返回大写字母
```js
if(eleObject.nodeName != 'IMG') { return false}
```

<br>

### 使用nodeType 来检查一个元素是否存在 元素1 属性2 文本3
```js
if(eleObject.nodeType == 3) { ... }
```

<br><br>

# this当做参数来传递
当我点击 超链接 时, 对应图片显示在 当前页面的指定位置上

<br>

### 思路:
1. 先通过getAttribute获取到``<a>``身上的 href 属性值(也就是地址)
2. 把得到的地址 保存在变量中 source
3. 再通过setAttribute设置``<img>``身上的 src 属性值

```html 
<!-- 页面结构: -->
<ul>
  <li><a href="./links/1.jpg">第一张</a></li>
  <li><a href="./links/2.jpg">第二张</a></li>
  <li><a href="./links/3.jpg">第三张</a></li>
  <li><a href="./links/4.jpg">第四张</a></li>
  <li><a href="./links/5.jpg">第五张</a></li>
</ul>

<img src="./links/77.png" id='x' alt="">
```

<br>

我做了一个函数, 想用在 ``<a>`` 的事件回调中
```js 
function showPic(obj){
  let source = obj.getAttribute('href');
  let showSite = document.getElementById('x');
  showSite.setAttribute('src', source); 
};

// 参数obj: 是<a>对象, 我要获取的是它身上的href
```

<br>

我想把这个函数 放入到 ``<a>`` 的事件回调中, 但是不知道传递什么实参进去
```js
for(let i=0; i<allA.length; i++){
  allA[i].onclick = function(){

    // showPic(obj);

    showPic(this);
    return false;
  };
}
```

事件回调函数中的this 就是每一个 ``<a>`` 标签对象, 可以把this当做实参传递进去

<br><br>

# 让系数在一个范围内 自增 自减

<br>

### 1 2 3 4 5 4 3 2 1
```js 
let num = 0;
let ratio = 0;

setInterval(function(){

  // 我们控制 系数 ratio 来实现 num++ num-的功能
  if(num == 0){
    ratio = 1
  }else if(num == 10){
    ratio = -1
  }

  num += ratio;
  console.log(num);
}, 500);
```

<br>

### num % 5   0 1 2 3 4 0 1 2 3 4
```js 
num++;
num = num % 10;
console.log(num);
```

<br><br>

# 把颜色保存在数组中, 利用下标赋值给对应的所有元素
```js 
let color = ['red', 'yellow', 'blue', 'pink']
span[i].style.color = color[i];
```

<br><br>

# 创建一个空数组, 一边往里注入信息, 一边循环往外取信息
```js 
let arr = [];

// 往数组中注入信息
setInterval(function(){
  // 先创建需要的信息
  //圆的半径
  let r = Math.random()*6+3;

  // 圆心的位置, 不能超出整个画布
  let x = Math.random()*canvas.width;
  // let y = canvas.height;  这样只能看到圆的一半
  let y = canvas.height - r;

  // 圆的颜色
  let red = Math.round(Math.random()*255)
  let green = Math.round(Math.random()*255)
  let blue = Math.round(Math.random()*255)
  // 透明度
  let alp = 1;

  // 角度 波动系数
  let deg = 0;
  // 波动系数也要随机不能为0 默认给10
  let step = Math.random()*6+10;

  // 起始位置
  let startX = x;
  let startY = y;

  // 最终
  arr.push({
    x:x,
    y:y,
    r:r,
    red:red,
    green:green,
    blue:blue,
    alp:alp,
    deg:deg,
    startX:startX,
    startY:startY,
    step:step
  });

}, 1000);
```

<br>

### 循环读取信息:
canvas循环读取信息
```js 
setInterval(function(){
  // 每次上来都先清掉
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // 动画
  for(let i = 0; i<arr.length; i++){
    
    // 如果慢的话 是度数太小了
    arr[i].deg += 2;
    
    // 修改圆心: 下面这样是横向的
    /*
      arr[i].x = arr[i].startX + (arr[i].deg*Math.PI/180)*arr[i].step/2;
      arr[i].y = arr[i].startY + Math.sin(arr[i].deg*Math.PI/180 )*arr[i].step;
    */

    // 让它纵向 让x的值等于y 让y的值等于x
    arr[i].x = arr[i].startX + Math.sin(arr[i].deg*Math.PI/180 )*arr[i].step;
    arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step;

    // 到y 50的时候 消失
    if(arr[i].y <= 50){
      arr.splice(i,1);
    }
      
  }

  // 绘制
  for(let i = 0; i<arr.length; i++){
    ctx.save();

    // 随机颜色
    ctx.fillStyle = 'rgba('+arr[i].red+','+arr[i].green+','+arr[i].blue+','+arr[i].alp+')';
    ctx.beginPath();
    ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
    ctx.fill();
    ctx.restore();
  }
  // 1.上面现在这样 不是动画 只是将数组里面的信息绘制了一次 而且很有可能 定时器还没想数组里添加信息 绘制不出来
  // 绘制一次也不够啊, 其实每次都是把画布清掉重新绘制 画布清掉重新绘制, 所以在画的时候要开定时器

  // 随机生成圆 下面的值都应该是随机的 那怎么办？
  // ctx.arc(100,100,100,0,360*Math.PI/180)
  // ctx.fill();

  // 思考: 
  // 颜色随机, 位置随机

},10);
```

<br><br>

# 怎么看图片加载完成 (图片加载情况 和 开机动画关联)
```js
let count = 0

// 图片url数组
let imgUrls = [
  "www.baidu.com",
  "www.baidu.com",
  "www.baidu.com",
  "www.baidu.com",
  "www.baidu.com",
  "www.baidu.com",
]

let div = document.querySelector("div")

imgUrls.forEach(url => {

  let img = new Image()
  img.src = url

  img.onload = function() {
    count++
    div.style.width = Math.round(count / imgUrls.length) * 100 + "%"
  }
})
```

<br><br>

# 在外部创建一个变量, 用来接收内部产生的结果
在外部创建一个变量, 用来默认一个结果, 在内部得到的结果来更新外部的变量

<br>

### 应用场景1
```js 
var flag = true;

// 什么情况下 修改 flag
for(var i = 2; i<num; i++){
  if(num % i == 0){
    flag = false;
  }
}

// 根据最终的flag来做什么样的处理
if(flag){
  ...
} else {
  ...
}
```

<br>

### 应用场景2:
要点 我先默认它为选中状态, 然后对它进行判断, 更改它的状态
```js
for(i=0; i<items.length; i++){
  items[i].onclick = function(){
    // 默认它是true
    checkedAllBox.checked = true;

    for(j=0; j<items.length; j++){
      // 当某种场景下再修改它的值
      if(!items[j].checked){
        checkedAllBox.checked = false; 
        break;
    }
}
```

<br><br>

# 测试性能
```js
console.time("") 
console.timeEnd("")
```

<br><br>

# 判断滚动条是否到底
### 当满足: scrollHeight scrollTop == clientHeight
说明垂直滚动条 滚动到底了

<br><br>

### 当满足: scrollWidth scrollLeft == clientWidth
说明水平滚动条 滚动到底了

<br><br>

# 本身取反的用法
```js 
if (items[i].checked) {
  items[i].checked =false
} else {
  items[i].checked =true
}

// 优化方式
items[i].checked = !items[i].checked; 
```

<br>

# flag 和 switch配合使用:
### 场景1
```js
let flag = '';
if(event.wheelDelta){
  flag = event.wheelDelta>0?'up':'down';
}
if(event.detail){
  flag = event.detail<0?'up':'down';
}

switch(flag){
  case 'up':
  ....
  break;
  case 'down':
  break;
} 
```

<br>

### 场景2
```js
dir = event.keyCode; 
switch(dir){ }
```

<br><br>

# data-自定义属性的用法
在html标签结构中 设定标识, 配合Js应用:

<br>

**解析:**   
在html标签结构中添加了data-属性,用来动态的获取到属性值, 和网址关联在一起

<br>

### 效果: 
点哪个, 就播放对应的
```js 
<li data-flag='g'>
    <a href="javascript">精彩回顾</a>
    <div class="nav-items-bg"></div>
</li>

for(let i=0; i<lis.length; i++){
  lis[i].addEventListener('mouseenter',function(){
  let flag = this.getAttribute('data-flag');
    if(flag){
      audio.src = 'http://s8.qhimg.com/share/audio/piano1/'+flag+'4.mp3';
      audio.play();
    }
  });
}
```

<br><br>

# 改变浏览器时, 重新获取元素的高宽

### **<font color="#C2185B">window.onresize = function(){};</font>**
```js 
// 全屏么
window.onresize = function(){
  video.width = document.documentElement.clientWidth;
  video.height = document.documentElement.clientHeight controls.offsetHeight;
};
```

<br><br>

# 数学公式

### 勾股定理:
在任何一个平面直角三角形中的两直角边的平方之和一定等于斜边的平方。  
在△ABC中, ∠C=90°, 则a²+b²=c²。

<br>

### 三角函数  
- 正弦 : sin ∠A的对边比斜边  
- 余弦 : cos ∠A的临边比斜边

<br>

### 弧度值 = 角度值*PI/180

<br>

### 角度值 = 弧度值*180/PI

<br><br>

# 数组对象的去重:
```s
https://www.jianshu.com/p/7c12cbaa817b
```

```js
var arr = [
  {name: 'a',id: 1}, 
  {name: 'a',id: 2}, 
  {name: 'b',id: 3}, 
  {name: 'c',id: 4},
  {name: 'c',id: 6}, 
  {name: 'b',id: 6}, 
  {name: 'd',id: 7}
];

function deWeight() {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i].name == arr[j].name) {
        arr.splice(j, 1);
        //因为数组长度减小1, 所以直接 j++ 会漏掉一个元素, 所以要 j--
        j--;
      }
    }
  }
  return arr;
}
var newArr = deWeight();
console.log('%c%s', 'color:red;', '方法一: es5,newArr', newArr);
```

<br>

```js
let res = []
// 我们按照id去重, 那我们就可以将 id的值作为key, 值为boolean
let has = {}

block.forEach(item => {
  // 根据从has对象里面检查 key是否为false 判断push到新数组中
  if(!has[item.id]) res.push(item)
  has[item.id] = true
})

console.log(res)
```

<br>

```js
var arr = [
  {name: 'a',id: 1}, 
  {name: 'a',id: 2}, 
  {name: 'b',id: 3}, 
  {name: 'c',id: 4},
  {name: 'c',id: 6}, 
  {name: 'b',id: 6}, 
  {name: 'd',id: 7}
];

let deWeightThree = () => {
  let map = new Map();
  for (let item of arr) {
    if (!map.has(item.name)) {
      map.set(item.name, item);
    }
  }
  return [...map.values()];
}
let newArr3 = deWeightThree();
console.log('%c%s', 'color:red;', '方法三: es6,newArr3', newArr3);
```

<br>

### 利用 filter() + indexOf() 进行的去重
```js 
let arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

let res = arr.filter((item, index, arr) => {
  
  // index: 当前第几轮 在这里也可以理解为该元素的在 数组中的位置
  // indexOf(): 每次都会从 0 位开始查找
  return arr.indexOf(item) == index

})

console.log(res)

```

<br>

### 利用 Set + ...
```js
function conversion(arr) {
  return [...new Set(arr)]
}

console.log(conversion(arr))
```

<br>

### 利用 indexOf()
```js
let arr = ['c', 'a', 'z', 'a', 'x', 'a', 'x', 'c', 'b', ]

let newArr = []
for(let i=0; i<arr.length; i++) {
  if(newArr.indexOf(arr[i]) == -1) {
    newArr.push(arr[i])
  }
}

console.log(newArr)
```

<br><br>

### 我们遍历数组, 把前一个元素取出来和后一个元素比较相等 相等的话删掉后一个
```js
for(let i=0; i<arr.length; i++) {
  for(let j=i+1; j<arr.length; j++) {
    if(arr[i] == arr[j]) {
      arr.splice(j, 1)

      // 删除后一个
      j--
    }
  }
}

console.log(arr)
```

<br><br>

# 利用对象去重
```js
let has = {}
let data = [
  {
    id: 1,
    name: "sam"
  },
  {
    id: 1,
    name: "sam"
  },
  {
    id: 2,
    name: "erin"
  },
]

let queue = []

data.forEach(item => {
  if(!has[item.id]) {
    queue.push(item)
    has[item.id] = true 
  }
})

console.log(queue) // 只有 id 1 和 2 的对象
```

<br><br>

# 利用 match() 检查目标内是否有相关文本, 如果有的话进行什么样的操作
```js 
let img = document.querySelector("img")

btn.addEventListener("click", function() {
  changeImage(img)
})

function changeImage(img) {
  if(img.src.match("1.jpg")) {
    img.src = "../front/img/2.jpg"
  } else {
    img.src = "../front/img/1.jpg"
  }
}
```

<br><br>

# 读取 和 更改文本
**<font color="#C2185B">元素节点.innerHTML</font>**  
**<font color="#C2185B">元素节点.firstChild.nodeValue</font>**  

<br><br>

# 滚轮事件在多次触发时 影响用户体验 (防抖)
利用延迟定时器, 200ms后触发一个滚轮事件, 每次触发前清除上一次的定时器

```js
if(content.addEventListener){
  content.addEventListener('DOMMouseScroll',function(event){

  // 处理个问题, 当鼠标滚轮滚动时, 多次滚动只滚动一次, 触发事件时不是立即响应 而是等200ms才响应 只要触发事件在200ms之内 第二次触发的事件就会把第一次的清掉
  event = event || window.event;
  
  clearInterval(timer);
  timer = setTimeout(function(){
    fn(event);
  },200);

});
```

<br><br>

# 同时修改4张图片的位置

```js 
                          0101      0011
                        单列向下看  单列向下看
                            ↓       ↓

1, left:0   top:0           0       0
// left: 0px; top: 0px;

2, left:-w  top:0          -1       0
// left: -120px; top: 0px;

3, left:0   top:-h          0      -1
// left: 0px; top: 120px;

4  left:-w  top:-h         -1      -1
// left: -120px; top: 120px;
```

```html
<style>
  html, body {
    height: 100%;
  }

  .container {
    width: 50%;
    border: 1px solid black;
    margin: 0 auto;
    position: relative;
    height: 100%;
  }

  .item {
    width: 100px;
    height: 100px;
    background-color: brown;
    position: absolute;
  }
</style>

<div class="container">
  <div class="item">0</div>
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```js
let divs = document.querySelectorAll(".item")
let w = 120
for(let i=0; i<divs.length; i++) {

  divs[i].style.left = -(i % 2) * w + "px"
  divs[i].style.top = Math.floor(i / 2) * w + "px"
}
```

<br><br>

# 筛选数组
筛选大于10的元素

自定义 新数组 和 自定义 新数组的下标值
```js
let arr = [2,0,6,1,77,0,52,0,25,7];
let newArr = [];

// 定义新数组的 index 初始值
let j = 0;

for(let i=0; i<arr.length; i++){
  if(arr[i] > 10){
  /* 
    newArr[i] = arr[i];

    结果:
    (9) [empty × 4, 77, empty, 52, empty, 25] 
    当i为4时, arr[4]的值为77 > 10, 会把它存到newArr[4]里 所以从第5为开始存进去的
  */

    // 也就是说新数组应该从0开始存 定义变量j = 0, 然后每存一次手动让j++一次
    newArr[j] = arr[i];
    j++;
  }
}
console.log(newArr);
```

<br><br>

### length自动检测元素的变化: 
```js
for(let i=0; i<arr.length; i++){
  if(arr[i] > 10){
    newArr[newArr.length] = arr[i];
  }
}
```
 
<br><br>

# 反转数组
```js 
let arr = ['pink', 'red', 'green', 'blue', 'purple'];
let newArr = [];

// i > 0 的时候一直循环
for(let i=arr.length-1; i>=0; i--){
  newArr[newArr.length] = arr[i]
}
```

<br><br>

# 遍历字符串
判断一个字符串'abcoefoxyozzopp'中出现次数最多的字符, 并统计其次数

### 思路:
- 利用charAt() 遍历整个字符串
- 把每个字符存储给对象, 如果对象没有该属性 就为1 有就让这个值+1 有几次加几次1
- 遍历对象, 得到最大值和该字符
(遍历字符串, 然后把每一个元素放到对象里 用属性值标记出现的次数)
```js 
let str = "abcoefoxyozzopp"

let o = {}

for(let i=0; i<str.length; i++) {
  // 取出每一个字符
  let char = str.charAt(i)

  // 判断 o对象中 是否有存储该字符 有的话 ++
  if(o[char]) {
    o[char]++

  // 没有的话 进行初始化为1
  } else {
    o[char] = 1
  }
}

console.log(o)
// { a: 1, b: 1, c: 1, o: 4, e: 1, f: 1, x: 1, y: 1, z: 2, p: 2 }

// 保存最大出现次数 会在循环中不断的赋值更新 始终保持最大值
let max = 0
let char = ""
for(let key in o) {
  if(o[key] > max) {
    // 更新 max
    max = o[key]

    // 将 最大值对应的字符 保存在 char 变量中
    char = key
  }
}

console.log(char)
// o
```

<br><br>

# 深拷贝:
```js 
let obj = {
  id: 1,
  name: "sam",
  msg: {
    age: 1
  },
  color: ["pink", "red", "blue"]
}

function deepCopy(n, o) {

  for(let key in o) {

    if(checkType(o[key]) == "array") {

      // 初始化一个新的数组
      n[key] = []
      
      /*
        n[key] 是 []
        o[key] 是 ["pink", "red", "blue"]

        然后再次进来都 会遍历 ["pink", "red", "blue"]
        提示: for(let key in arr) : key是索引
        会走 else 的逻辑 取出旧数组中的key项 添加到 新数组中的key项
      */

      deepCopy(n[key], o[key])

    } else if(checkType(o[key]) == "object") {

      // 如果旧对象中的key对应的值为 对象 则在新对象中初始化一个同key对象
      n[key] = {}

      // 再次调用该函数
      deepCopy(n[key], o[key])

    // 出口: 普通值的情况下 直接赋值
    } else {
      n[key] = o[key]
    }

  }
  
}


// 工具函数
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


let newObj = {}
deepCopy(newObj,obj)
console.log(newObj)
```

<br><br>

# call的实现
第一个参数为null或者undefined时, this指向全局对象window, 值为原始值的指向该原始值的自动包装对象, 如 String、Number、Boolean

为了避免函数名与上下文(context)的属性发生冲突, 使用Symbol类型作为唯一值

- 将函数作为传入的上下文(context)属性执行
- 函数执行完成后删除该属性
- 返回执行结果

```js
Function.prototype.myCall = function(context, ...args){
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol() 
  cxt[func] = this;
  args = args ? args : []
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  //删除该方法, 不然会对传入对象造成污染（添加该方法）
  delete cxt[func];
  return res;
}
```

<br><br>

# apply的实现: 
前部分与call一样 第二个参数可以不传, 但类型必须为数组或者类数组
```js
Function.prototype.myApply = function(context,args = []){
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this;
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  delete cxt[func];
  return res;
}
```

<br><br>

### bind的实现

**需要考虑:**  
bind() 除了 this 外, 还可传入多个参数 bind 创建的新函数可能传入多个参数 新函数可能被当做构造函数调用 函数可能有返回值

<br>

**实现方法:**  
bind 方法不会立即执行, 需要返回一个待执行的函数（闭包） 实现作用域绑定（apply）

参数传递（apply 的数组传参） 当作为构造函数的时候, 进行原型继承

```js
Function.prototype.myBind = function (context, ...args) {
  //新建一个变量赋值为this, 表示当前函数
  const fn = this
  //判断有没有传参进来, 若为空则赋值[]
  args = args ? args : []
  //返回一个newFn函数, 在里面调用fn
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args,...newFnArgs])
  }
}


// 测试
let name = '小王',age =17;
let obj = {
  name:'小张',
  age: this.age,
  myFun: function(from,to){
    console.log(this.name + ' 年龄 ' + this.age+'来自 '+from+'去往'+ to)
  }
}
let db = {
  name: '德玛',
  age: 99
}

//结果
obj.myFun.myCall(db,'成都','上海');     // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myApply(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind(db,['成都','上海'])();   // 德玛 年龄 99  来自 成都, 上海去往 undefined
```

<br><br>

# new的实现
一个继承自 Foo.prototype 的新对象被创建。 

使用指定的参数调用构造函数 Foo, 并将 this 绑定到新创建的对象。new Foo 等同于 new Foo(), 也就是没有指定参数列表, Foo 不带任何参数调用的情况。  

由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象, 则使用步骤1创建的对象。  

一般情况下, 构造函数不返回值, 但是用户可以选择主动返回对象, 来覆盖正常的对象创建步骤
```js
function Ctor(){
    ....
}

function myNew(ctor,...args){
  if(typeof ctor !== 'function'){
    throw 'myNew function the first param must be a function';
  }
  var newObj = Object.create(ctor.prototype); //创建一个继承自ctor.prototype的新对象
  var ctorReturnResult = ctor.apply(newObj, args); //将构造函数ctor的this绑定到newObj中
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
  var isFunction = typeof ctorReturnResult === 'function';
  if(isObject || isFunction){
      return ctorReturnResult;
  }
  return newObj;
}

let c = myNew(Ctor);
```

<br><br>

# instanceof的实现: 
instanceof 是用来判断A是否为B的实例, 表达式为: 
  
    A instanceof B

如果A是B的实例, 则返回true,否则返回false。


instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。 不能检测基本数据类型, 在原型链上的结果未必准确, 不能检测null, undefined

<br>

### 实现: 
遍历左边变量的原型链, 直到找到右边变量的 prototype, 如果没有找到, 返回 false

```js
function myInstanceOf(a,b){
  let left = a.__proto__;
  let right = b.prototype;
  while(true){
    if(left == null){
      return false
    }
    if(left == right){
      return true
    }
    left = left.__proto__
  }
}

//instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
  prototype = right.prototype; // 获取构造函数的 prototype 对象
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

<br><br>

# 生成指定范围随机数
```js
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```

<br><br>

# 数字千分位分隔
```js
export const format = (n) => {
  let num = n.toString();
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = '';
    let remainder = len % 3;
    if (remainder > 0) { // 不是3的整数倍
      return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
    } else { // 3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp; 
    }
  }
}
```

<br><br>

# 数组乱序
```js
export const arrScrambling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}
```

<br><br>

# 数组扁平化
```js
export const flatten = (arr) => {
let result = [];

for(let i = 0; i < arr.length; i++) {
  if(Array.isArray(arr[i])) {
    result = result.concat(flatten(arr[i]));
  } else {
    result.push(arr[i]);
  }
}
return result;
}
```

<br><br>

# 数组中获取随机数
```js
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

```

<br><br>

# 生成随机字符串
```js
export const randomString = (len) => {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let strLen = chars.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};

```

<br><br>

# 字符串首字母大写
```js
export const fistLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```

<br><br>

# 手机号中间四位变成
```js
export const telFormat = (tel) => {
  tel = String(tel); 
  return tel.substr(0,3) + "****" + tel.substr(7);
};
```

<br><br>

# 驼峰命名转换成短横线命名
```js
export const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}
```

<br><br>

# 短横线命名转换成驼峰命名
```js
export const getCamelCase = (str) => {
  return str.replace( /-([a-z])/g, (i, item) => item.toUpperCase())
}
```

<br><br>

# 全角转换为半角
```js
export const toCDB = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

```

<br><br>

# 半角转换为全角
```js
export const toDBC = (str) => {
let result = "";
for (let i = 0; i < str.length; i++) {
  code = str.charCodeAt(i);
  if (code >= 33 && code <= 126) {
    result += String.fromCharCode(str.charCodeAt(i) + 65248);
  } else if (code == 32) {
    result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
  } else {
    result += str.charAt(i);
  }
}
return result;
}
```

<br><br>

# 数字转化为大写金额
```js
export const digitUppercase = (n) => {
  const fraction = ['角', '分'];
  const digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
  ];
  const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
  ];
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = '';
      for (let j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
};
```

<br><br>

# 数字转化为中文数字
```js
export const intToChinese = (value) => {
const str = String(value);
const len = str.length-1;
const idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
const num = ['零','一','二','三','四','五','六','七','八','九'];
return str.replace(/([1-9]|0+)/g, ( $, $1, idx, full) => {
  let pos = 0;
  if($1[0] !== '0'){
    pos = len-idx;
    if(idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
      return idxs[len-idx];
    }
    return num[$1[0]] + idxs[len-idx];
  } else {
    let left = len - idx;
    let right = len - idx + $1.length;
    if(Math.floor(right / 4) - Math.floor(left / 4) > 0){
      pos = left - left % 4;
    }
    if( pos ){
      return idxs[pos] + num[$1[0]];
    } else if( idx + $1.length >= len ){
      return '';
    }else {
      return num[$1[0]]
    }
  }
  });
}
```

<br><br>

# 存储loalStorage 
```js
export const loalStorageSet = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
      value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};
```

<br><br>

# 获取localStorage
```js
export const loalStorageGet = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
};
```

<br><br>

# 删除localStorage
```js
export const loalStorageRemove = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
};
```

<br><br>

# 存储sessionStorage
```js
export const sessionStorageSet = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, value)
};
```

<br>

# 获取sessionStorage
```js
export const sessionStorageGet = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key)
};
```

<br><br>

# 删除sessionStorage
```js
export const sessionStorageRemove = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key)
};

```

<br>

# 设置cookie
```js
export const setCookie = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};


// 更新
export const setCookie = (key, value, expire) => {
  const options = {
    expires: new Date(Date.now() + expire * 24 * 60 * 60 * 1000).toUTCString(),
    path: '/',
    // 可选：设置其他cookie选项, 如domain和secure
  };
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`;
};
setCookie('myCookie', 'myValue', 7); // 设置名为'myCookie'的cookie, 值为'myValue', 过期时间为7天
```

<br><br>

# 读取cookie 
```js
export const getCookie = (key) => {
  const cookieStr = unescape(document.cookie);
      const arr = cookieStr.split('; ');
      let cookieValue = '';
      for (let i = 0; i < arr.length; i++) {
          const temp = arr[i].split('=');
          if (temp[0] === key) {
              cookieValue = temp[1];
              break
      }
  }
  return cookieValue
};


// 更新
export const getCookie = (key) => {
  const cookieObj = Object.fromEntries(
    document.cookie
      .split('; ')
      .map(cookie => cookie.split('='))
  );
  return cookieObj[key] ? decodeURIComponent(cookieObj[key]) : '';
};

const myCookieValue = getCookie('myCookie'); // 读取名为'myCookie'的cookie的值
console.log(myCookieValue);
```

<br><br>

# 删除cookie
```js
export const delCookie = (key) => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
};


// 更新:
export const delCookie = (key) => {
  document.cookie = `${encodeURIComponent(key)}=; expires=${new Date(0).toUTCString()}; path=/`;
};

setCookie('myCookie', 'myValue', 7); // 设置名为'myCookie'的cookie, 值为'myValue', 过期时间为7天
```

<br><br>

# 校验身份证号码
```js
export const checkCardNo = (value) => {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(value);
};
```

<br><br>

# 校验是否包含中文
```js
export const haveCNChars => (value) => {
  return /[\u4e00-\u9fa5]/.test(value);
}
```

<br><br>

# 校验是否为中国大陆的邮政编码 
```js
export const isPostCode = (value) => {
  return /^[1-9][0-9]{5}$/.test(value.toString());
}
```

<br><br>

# 校验是否为IPv6地址
```js
export const isIPv6 = (str) => {
  return Boolean(str.match(/:/g)?str.match(/:/g).length<=7:false && /::/.test(str)?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str):/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}
```

<br><br>

# 校验是否为邮箱地址
```js
export const isEmail = (value) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
}
```

<br><br>

# 生成指定范围随机数
```js
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

```

<br><br>

# 校验是否为中国大陆手机号
```js
export const isTel = (value) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}

```

<br><br>

# 校验是否包含emoji表情
```js
export const isEmojiCharacter = (value) => {
  value = String(value);
  for (let i = 0; i < value.length; i++) {
    const hs = value.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (value.length > 1) {
          const ls = value.charCodeAt(i + 1);
          const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
              return true;
          }
      }
    } else if (value.length > 1) {
      const ls = value.charCodeAt(i + 1);
      if (ls == 0x20e3) {
          return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
          return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
          return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
          return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
          return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
              || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
              || hs == 0x2b50) {
          return true;
      }
    }
  }
  return false;
}


// 更新: 可以考虑使用正则表达式和 Unicode 属性来判断是否包含 Emoji 表情。
export const isEmojiCharacter = (value) => {
  const emojiRegex = /\p{Emoji}/u;
  return emojiRegex.test(value);
};

const hasEmoji = isEmojiCharacter("Hello 😀"); // true or false
console.log(hasEmoji);



// 策略模式:
class EmojiDetector {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  hasEmoji(value) {
    return this.strategy.hasEmoji(value);
  }
}

class RegexEmojiStrategy {
  hasEmoji(value) {
    const emojiRegex = /\p{Emoji}/u;
    return emojiRegex.test(value);
  }
}

class CustomEmojiStrategy {
  hasEmoji(value) {
    // Custom implementation to detect emojis
    // Return true or false
  }
}

// Usage
const detector = new EmojiDetector(new RegexEmojiStrategy());
const hasEmoji = detector.hasEmoji("Hello 😀"); // true or false
console.log(hasEmoji);

// Change strategy
detector.setStrategy(new CustomEmojiStrategy());
const hasCustomEmoji = detector.hasEmoji("Hello 👍"); // true or false
console.log(hasCustomEmoji);

```

<br><br>

# 获取URL参数列表
```js
export const GetRequest = () => {
  let url = location.search;
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key, 则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key, 创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })
  return paramsObj;
};


// 更新:
export const getQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramsObj = {};
  for (let [key, value] of urlParams) {
    if (/^\d+$/.test(value)) {
      value = parseFloat(value);
    } else {
      value = decodeURIComponent(value);
    }
    if (paramsObj.hasOwnProperty(key)) {
      paramsObj[key] = [].concat(paramsObj[key], value);
    } else {
      paramsObj[key] = value;
    }
  }
  return paramsObj;
};


const queryParams = getQueryParams();
console.log(queryParams);

```

<br><br>

# 检测URL是否有效 
```js
export const getUrlState = (URL) => {
  let xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET", URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {
  } finally {
    let result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
```

上述代码是使用 ActiveXObject 创建 XMLHTTP 对象, 然后发送同步请求来获取指定 URL 的状态。然而, ActiveXObject 是属于过时的技术, 不再被现代浏览器广泛支持。

为了取代该代码, 可以使用现代的 XMLHttpRequest 或 Fetch API 来实现相同的功能。

<br>

```js
export const getUrlState = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      resolve(xhr.status === 200);
    };
    xhr.onerror = () => {
      resolve(false);
    };
    xhr.send();
  });
};


const url = "https://www.example.com";
getUrlState(url).then((result) => {
  console.log(result); // true or false
});
```

<br><br>

# 键值对拼接成URL参数
```js
export const params2Url = (obj) => {
    let params = []
    for (let key in obj) {
      params.push(`${key}=${obj[key]}`);
    }
    return encodeURIComponent(params.join('&'))
}


// 更新
export const params2Url = (obj) => {
  const urlParams = new URLSearchParams(obj);

  // toString方法会自动编码
  return urlParams.toString();
}

const params = {
  name: "John",
  age: 25,
  city: "New York"
};

const urlQueryString = params2Url(params);
console.log(urlQueryString);
// name=John&age=25&city=New%20York
```

<br><br>

# 修改URL中的参数
```js
export const replaceParamVal => (paramName, replaceWith) {
  const oUrl = location.href.toString();
  const re = eval('/('+ paramName+'=)([^&]*)/gi');
  location.href = oUrl.replace(re,paramName+'='+replaceWith);
  return location.href;
}


// 更新:
export const replaceParamVal = (paramName, replaceWith) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(paramName, replaceWith);
  const newUrl = window.location.pathname + "?" + urlParams.toString();
  
  // 用于修改浏览器历史记录中当前状态的信息, 而不会引起页面的刷新。
  window.history.replaceState(null, null, newUrl);
  return newUrl;
}
```

<br>

### 扩展: replaceState()
三个参数

**state:**   
表示要在浏览器历史记录中保存的状态对象。

在大多数情况下, 可以将其设置为 null, 因为通常不需要在历史记录中保存额外的状态信息。

<br>

**title:**  
表示新的页面标题。

大多数浏览器目前忽略该参数, 可以将其设置为 null。

<br>

**url:**  
表示要在浏览器地址栏中显示的新 URL。

<br>

通过调用 replaceState(null, null, newUrl), 我们可以将当前页面的 URL 替换为 newUrl, 并将新的 URL 显示在浏览器地址栏中, 同时不刷新页面。

这使得我们可以更改 URL 参数、跳转到不同的页面状态, 而不会导致页面重新加载。

需要注意的是, 虽然 URL 发生了变化, 但实际的页面内容并没有重新加载。

**这意味着在使用 replaceState() 方法后, 页面中的 JavaScript、CSS 和其他资源仍然保持不变。只有 URL 发生了变化。**

使用 replaceState() 方法是一种改变 URL、更新历史记录状态的方式, 但不会引起页面的刷新或重新加载。这对于实现无刷新的页面状态变化、修改 URL 参数等情况非常有用。

<br><br>

# 删除URL中指定参数
```js
export const funcUrlDel = (name) => {
const baseUrl = location.origin + location.pathname + "?";
const query = location.search.substr(1);
  if (query.indexOf(name) > -1) {
    const obj = {};
    const arr = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
  }
}


// 更新:
export const removeQueryParam = (name) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  const newUrl = url.href;
  window.history.replaceState(null, null, newUrl);
  return newUrl;
}
```

<br><br>

# 判断是移动还是PC设备
```js
export const isMobile = () => {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    return 'mobile';
  }
    return 'desktop';
}
```

<br><br>

# 判断是否是苹果还是安卓移动设备
```js
export const isAppleMobileDevice = () => {
  let reg = /iphone|ipod|ipad|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
}
```

<br><br>

# 判断是否是安卓移动设备 
```js
export const isAndroidMobileDevice = () => {
return /android/i.test(navigator.userAgent.toLowerCase());
}
```

<br><br>

# 判断是Windows还是Mac系统
```js
export const osType = () => {
  const agent = navigator.userAgent.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
  if (isWindows) {
      return "windows";
  }
  if(isMac){
      return "mac";
  }
}
```

<br><br>

# 判断是否是微信/QQ内置浏览器
```js
export const broswer = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return "weixin";
  } else if (ua.match(/QQ/i) == "qq") {
      return "QQ";
  }
  return false;
}
```

<br><br>

# 浏览器型号和版本
```js
export const getExplorerInfo = () => {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie") ? { //ie < 11
      type: "IE",
      version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
      type: "IE",
      version: 11
  } : 0 <= t.indexOf("edge") ? {
      type: "Edge",
      version: Number(t.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
      type: "Firefox",
      version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
      type: "Chrome",
      version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
      type: "Opera",
      version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
      type: "Safari",
      version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
      type: t,
      version: -1
  }
}
```

<br><br>

# 滚动到页面顶部

### height - height / 8
为了在每次滚动时实现平滑的过渡效果。通过逐渐减小滚动距离, 滚动的速度会逐渐减缓, 从而实现更平滑的滚动体验。这个具体的数值可以根据需要进行调整, 以获得最佳的滚动效果。

```js
export const scrollToTop = () => {
  // 滚动条距离顶部的距离 可以确定滚动条当前所处的位置
  const height = document.documentElement.scrollTop || document.body.scrollTop;

  // 滚动条的当前位置不是0的时候 滚动回顶部 递归的终止条件是当滚动条的垂直偏移量小于等于 0 时停止滚动
  if (height > 0) {
    // 因为是递归调用 实现平滑滚动效果 函数将当前滚动条的垂直偏移量减去其自身的 1/8 这样可以逐渐将滚动条移动到页面顶部
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
}
```

<br><br>

# 滚动到页面底部
```js
export const scrollToBottom = () => {
window.scrollTo(0, document.documentElement.clientHeight);  
}
```

<br><br>

# scrollIntoView: 滚动到指定元素区域
```js
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
};
```

<br><br>

# 获取可视窗口高度
```js
export const getClientHeight = () => {
  let clientHeight = 0;

  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
}
```

<br><br>

# 打开浏览器全屏
```js
export const toFullScreen = () => {
  let element = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}
```

<br><br>

# 退出浏览器全屏
```js
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}
```

<br><br>

# 当前时间
```js
export const nowTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
  const hour = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
  const miu = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
  const sec = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
  return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
}
```

<br><br>

# 格式化时间
```js
export const dateFormater = (formater, time) => {
  let date = time ? new Date(time) : new Date(),
      Y = date.getFullYear() + '',
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
      .replace(/YY|yy/g, Y.substr(2, 2))
      .replace(/MM/g,(M<10 ? '0' : '') + M)
      .replace(/DD/g,(D<10 ? '0' : '') + D)
      .replace(/HH|hh/g,(H<10 ? '0' : '') + H)
      .replace(/mm/g,(m<10 ? '0' : '') + m)
      .replace(/ss/g,(s<10 ? '0' : '') + s)
}
// dateFormater('YYYY-MM-DD HH:mm:ss')
// dateFormater('YYYYMMDDHHmmss')
```

<br><br>

# 阻止冒泡事件
```js
export const stopPropagation = (e) => { 
  e = e || window.event; 
  if(e.stopPropagation) {    // W3C阻止冒泡方法 
      e.stopPropagation(); 
  } else { 
      e.cancelBubble = true; // IE阻止冒泡方法 
  } 
} 
```

<br><br>

# 防抖函数
```js
export const debounce = (fn, wait) => {
  let timer = null;

  return function() {
    let context = this,
        args = arguments;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```

<br><br>

# 节流函数
```js
export const throttle = (fn, delay) => {
  let curTime = Date.now();

  return function() {
    let context = this,
        args = arguments,
        nowTime = Date.now();

    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

<br><br>

# 数据类型判断
```js
export const getType = (value) => {

  // 如果传入的是 null 则返回 null
  if (value === null) {
    return value + "";
  }

  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let originType = Object.prototype.toString.call(value)
    // [object Array]

    let reg = /\[(.+)\]/
    let type = originType.match(reg)[1].split(" ")[1].toLowerCase()
    // 1: "object Array" -> [object Array][1] -> Array -> array

    return type
    
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}
```

<br><br>

# 对象深拷贝
```js
export const deepClone = (obj, hash = new WeakMap()) => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date){
    return new Date(obj);
  } 

  //正则对象直接返回一个新的正则对象     
  if (obj instanceof RegExp){
    return new RegExp(obj);     
  }

  //如果循环引用, 就用 weakMap 来解决
  if (hash.has(obj)){
    return hash.get(obj);
  }

  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);

  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) { 
    if(typeof obj[key] === 'object' && obj[key] !== null){
      cloneObj[key] = deepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}
```


<br><br>

# 删除数组中的元素
```js
// length: 5, max-index: 4
let arr = [1,2,3,4,5]

// 要删除的元素为 3, index: 2
```

<br>

### 方式1: 利用 filter
```js
let res = arr.filter(item => item != 3)
console.log(res)
```

<br>

### 方式2: 利用 splice
```js
let index = arr.indexOf(3)
arr.splice(index, 1)
console.log(arr)
```

<br>

### 方式3: for循环
从 index 的位置开始 让后一个替换前一个 我们循环的次数是 length - 1
```js
let index = arr.indexOf(3)
for(let i = index; i < arr.length - 1; i++) {
  arr[i] = arr[i + 1]
}

// 将最后一个元素删掉
// arr[arr.length - 1] = null  不行
// delete arr[arr.length - 1]   不行
arr.length = arr.length - 1
console.log(arr)
```

<br><br>

# 排他思想
如果有同一组元素, 我们一次只想要某一个元素实现某种样式, 其它的样式是基础样式 这时需要用到循环的排他思想算法

1. 使用for循环 去掉所有元素的特殊样式 让所有元素为基础样式

2. 使用this 设置自己特有的样式

```js 
for(let i=0; i<btns.length; i++) {
  btns[i].onclick = function() {
    // 排他
    for(let i=0; i<btns.length; i++){
      btns[i].style.backgroundColor = '';
    }

    // 设置自己的样式
    this.style.backgroundColor = 'pink'
  }
}
```