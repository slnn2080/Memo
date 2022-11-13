# 认识前端自动化
随着前端的发展 前端设计的领域已经越来越多 也越来越复杂 这就对我们前端工程化能力提出了更高的要求 好的前端工程花一般包括三个大的方面:

- 前端自动化测试
- 高质量的代码设计
- 高质量的代码实现

<br><br>
 
## Jest 介绍:
```s
https://jestjs.io/zh-Hans/docs/expect
```

### 主流的测试框架:
- Jasmine
- MOCHA
- Jest: 目前最流行的前端测试框架
- ava
- tape

<br>

### 优点:
- 技术比较新
- 性能好 功能多 简单易用
- 速度快, 只会测试新的模块
- api简单 数量少
- 隔离性好 jest的执行环境是单独隔离的 不会影响其他的文件
- IDE整合
- 多项目运行, 并行前后台项目
- 测试覆盖率

<br><br>

## 测试金字塔:

         UI

        Test       系统测试

    Service Tests  服务测试

      Unit Tests   单元测试
 
单元测试 主要测试的就是最小的测试单元 也就是js中的一个方法  
只有最小的单元ok了 那整个系统才能更加的稳定

<br><br>

## 单元测试 和 集成测试:

### 单元测试:
可测试的最小单位 

比如一个模块, 我们js文件需要是一个模块 因为模块中可以使用 module.export 进行导出 我们需要在测试文件中引入 进行测试

<br>

### 单元测试的特点:
- 预见性  
有效的保证你写的代码 就是你想要的结果 因为我们的逻辑可能并不是我们想的那样完备

- 早期性  
尽可能在软件开发的早期就能发现问题

- 说明性  
单元测试可以是文档 它可以提供例子告诉别人如何使用你的代码

- 保障性  
对已有的功能进行重构时 确保不会影响历史功能

<br>

### 集成测试:
组装测试 或者 联合测试

我们做完单元测试后 将所有模块按照设计要求 组装成一个子系统 或者 完整的系统 进行集成测试

<br><br>


## Jest 环境搭建 & 使用:

### 1. 安装 Jest 依赖:
```js
// 上线后 测试代码是不使用的
npm i jest@24.8.0 -D
```

<br>

### 2. 创建 测试文件:
Jest测试文件会根据文件名 找 对应的源文件

**方式1:**  
```js
demo.js
demo.test.js
```

<br>

**方式2:**  
创建 ``__tests__`` 文件夹 在这个文件夹中 编写测试代码  
然后在这个文件夹中创建 和要测试文件一样的文件名的js文件

<br>

**技巧:**  
这么设置该文件不会被测试
```
demo.back.js
```

<br>

**比如:**  
我们要对 index.js 文件 进行测试  
那么我们在tests文件夹里面 也创建一个index.js 文件 里面编写测试代码

```
| - src
  - index.js

  | - __test__
    - index.js
```
<br>

**Demo:**
```js
// demo.js
function massage(money) {
  return money >= 200 ? "至尊享受" : "基本按摩"
}

function massage2(money) {
  return money > 1000 ? "双人服务" : "单人服务"
}

module.exports = {
  massage,
  massage2
}
```

```js
// demo.test.js
test("massage_method_200", () => {
  // 执行 demo.js 文件中的方法
  expect(massage(200)).toBe("至尊享受")
})
```

<br>

### 3. 在测试文件中引入 要测试的文件
```js
const {massage, massage2} = require("./demo.js")

test("massage_method_200", () => {
  // 执行 demo.js 文件中的方法
  expect(massage(200)).toBe("至尊享受")
})


// 再测试另外一个方法
test("massage2_method_1000", () => {
  // 执行 demo.js 文件中的方法
  expect(massage2(1000)).toBe("单人服务")
})
```

<br>

### 4. 运行命令进行测试
```js
"test": "jest"

// 自动监视
"test": "jest --watchAll"

npm run test
```

<br>

## 基本配置 和 测试覆盖率生成:

### 基本配置:

项目根目录下 运行下面的命令 生成初始化配置
```js
npx jest --init
```

然后会陆续提示:
- 代码测试是在 node环境下 还是在 browser环境下
- 是否生成代码覆盖率文件
- 是否在测试后清除模拟调用的东西 yes

最后会生成 jest.config.js 文件

<br>

### Jest中使用 import export es6语法:
jest本身不支持 es6 语法规范 而只支持 commonjs

如果我们要在测试代码只用 es6 的语法规范 则我们需要使用 babel

<br>

**安装babel:**  
```js
npm i @babel/core@7.4.5 @babel/preset-env@7.4.5 -D
```

<br>

**配置babel文件:**
```js
// .babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

<br>

**配置完毕后 上面就可以使用 es6 了**  
jest中有一个babel-jest 组件 当我们使用 npm run test 的时候 会先去检查根目录开发环境下 有没有babel相关的配置 然后就去找 rc文件

<br>

### 生成代码覆盖率的命令:
```js
// 终端查看
npx jest --coverage
```
网页版的查看 /coverage/lcov-report/index.html

<br>

开启测试覆盖率之后 运行命令后 会出现一个表格:
```
File | %Stmts | %Branch | %Funcs | %Lines | Uncovered Line 

Stmts: 语句覆盖率
Branch: 分支的覆盖率
Funcs: 函数覆盖率
Lines: 整体的行的覆盖情况
Uncovered Line: 没有覆盖的行
```

正常情况下 Lineshe 和 Stmts数据时相同的 如果一行有两个语句的话 数据可能会有些出路

当我们加上 --coverage参数 之后 运行完测试命令 我们的目录下面会多出一个coverage文件目录 这个目录里面有一个 index.html 里面是更详尽的测试覆盖率的一些情况

    | coverage
      | lcov-report
        index.html 该页面还能点击第一列(File列)的 index.js

点击后会进入到一个新的页面 有的行可以会飘红了 这行就是没有被测试到的行(或者说没有被测试覆盖到的行)

如果想完善这点 我们可以针对异常的情况 去测试这点

<br><br>

## Jest中 expect toBe 等断言 匹配器的理解:
1. expect()中要传入 能返回值的逻辑 然后拿着这个返回值 跟 toBe 匹配器中的值 进行匹配
2. 我们在一段逻辑中 在某处 或者 需要验证的部分 或者 能拿到结构后 我们再使用 expect toBe 等API 对目标进行测试

其实就相当于 我们的 console.log 我们不使用框架的时候 不也是在合适的地方调用了console.log来查看结果么?

<br><br>

## Jest中的匹配器:

### toBe()
相当于 === , 不能比较引用类型
预期 和 我们传入的期望值 完全相等
```js
// test()就相当于一个测试用例
test("toBe 的使用", () => {

  // ok
  expect("123").toBe("123")


  // err: 引用不同
  const a = {num: 007}
  expect(a).toBe({num: 007})
})
```

**技巧:**  
我们只关心逻辑是否执行到这里了 下面的相当于一个标记 我们在合适的位置 测试这行代码 相当于我们测试 我们的逻辑是否走到这里了 比较不错
```js
expect(true).toBe(true)
```

<br>

### toEqual()
不看地址值 查看内容是否相同, 可以比较引用类型的具体内容
```js
// test()就相当于一个测试用例
test("toEqual 的使用", () => {
  // ok
  const a = {num: 007}
  expect(a).toEqual({num: 007})
})
```

<br>

### toBeNull()
预期为 null 的时候 匹配成功, 不能匹配undefined
```js
// test()就相当于一个测试用例
test("toBeNull 的使用", () => {
  expect(null).toBeNull()
})
```

<br>

### toBeUndefined()
预期为 undefined 的时候 匹配成功
```js
// test()就相当于一个测试用例
test("toBeUndefined 的使用", () => {
  expect(undefined).toBeUndefined()
})
```

<br>

### toBeDefined()
只要我们的变量有值(只要我们定义了) 就可以通过测试 跟上面的 toBeUndefined 正好相反
```js
// test()就相当于一个测试用例
test("toBeDefined 的使用", () => {
  const a = 10
  // 如果是a是undefined是不能通过测试的
  expect(a).toBeDefined()
})
```

<br>

### toBeTruthy()
匹配真, 我们要测试的变量是true 才会通过测试
```js
// test()就相当于一个测试用例
test("toBeTruthy 的使用", () => {
  const a = true
  expect(a).toBeTruthy()
})
```

<br>

### toBeFalsy()
匹配假, 我们要测试的变量是false 才会通过测试
```js
// test()就相当于一个测试用例
test("toBeFalsy 的使用", () => {
  const a = false
  expect(a).toBeFalsy()
})
```

<br>

### toBeGreaterThan()
相当于 >  
预期值 > 期望值 测试通过

```js
// test()就相当于一个测试用例
test("toBeGreaterThan 的使用", () => {
  const count = 10

  // 10 > 9 ok
  expect(count).toBeGreaterThan(9)
})
```

<br>

### toBeLessThan()
相当于 <  
预期值 < 期望值 测试通过

```js
// test()就相当于一个测试用例
test("toBeLessThan 的使用", () => {
  const count = 9

  // 9 < 10 ok
  expect(count).toBeLessThan(10)
})
```

<br>

### toBeGreaterThanOrEqual()
相当于 >=
预期值 >= 期望值 测试通过

```js
// test()就相当于一个测试用例
test("toBeGreaterThanOrEqual 的使用", () => {
  const count = 10

  // 10 >= 10 ok
  expect(count).toBeGreaterThanOrEqual(10)
})
```

<br>

### toBeLessThanOrEqual()
相当于 <=
预期值 <= 期望值 测试通过

```js
test("toBeLessThanOrEqual 的使用", () => {
  const count = 10

  // 10 >= 10 ok
  expect(count).toBeLessThanOrEqual(10)
})
```

<br>

### toBeCloseTo()
规避js中浮点型精度的问题 按照我们实际的值进行比对

```js
test("toBeCloseTo 的使用", () => {
  const a = 0.1
  const b = 0.2

  // 平时的话我们可能使用 toEqual 比较器 感觉没有问题但是不能通过测试
  expect(a + b).toEqual(0.3)  // err


  // 这时候我们要使用 toBeCloseTo
  expect(a + b).toBeCloseTo(10)
})
```

<br>

### toMatch()
用来匹配字符串中的字符, 当 期待值 包含在预期字符串中 则通过测试

**参数:**  
可以传入正则, 来用匹配内容

```js
test("toMatch 的使用", () => {
  const str = "erin, J"

  // J 在 str 中 所以通过测试
  expect(str).toMatch("J")
})


// 正则示例:
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});
```

<br>

### toContain()
用来匹配数组的每一项, 当 期待值 包含在预期数组中 则通过测试  
期待着是数组中的成员

```js
test("toContain 的使用", () => {
  const arr = ["erin, JL"]

  // J 在 str 中 所以通过测试
  expect(arr).toContain("JL")



  // 该匹配器还使用与 set
  const set = new Set(arr)
  expect(set).toContain("JL")
})
```

<br>

### toThrow()
如果程序中抛出了异常则可以通过测试用例

**参数:**  
可以传入正则, 匹配抛出的错误信息

```js
// 异常方法
const throwNewErrorFn = () => {
  throw new Error("error")
}

test("toThrow 的使用", () => {

  // 注意这个方法没有调用 直接传入的
  expect(throwNewErrorFn).toThrow()

  // 当抛出的异常信息 和 期待值一致的时候通过用例
  expect(throwNewErrorFn).toThrow("error")
})
```

<br>

### .not匹配器
如果你知道如何测试某个东西，``.not`` 让你测试它的反面

**扩展: not对匹配器的结果进行取反**  
上面的测试中 有的人认为当方法内部不抛出异常才算通过 这种情况下 可以在 匹配器前面加上 not

```js
// 异常方法
const throwNewErrorFn = () => {
  throw new Error("error")
}

test("toThrow 的使用", () => {

  // 传入方法不抛出异常才通过测试
  expect(throwNewErrorFn).not.toThrow()
})
```

<br>

### .resolves匹配器
用于对我们解开 我们在预期部分传入的promise中resolve出来的结果 拿着resolve的结果进行匹配
```js
test('resolves to lemon', () => {
  // make sure to add a return statement
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});
```

<br>

### .resolves匹配器
```js
test('rejects to octopus', () => {
  // make sure to add a return statement
  return expect(Promise.reject(new Error('octopus'))).rejects.toThrow(
    'octopus',
  );
});
```

<br>

### toMatchObject()
当返回的数据结构特别多 而我们要测试的数据作为众多结构中的一个属性的时候 我们可以使用该匹配器

当我们传入的数据结构在众多结构中的时候 就通过测试用例
```js
import {fetchData} from "./fetchData"

// 加上 async 
test("Promise FetchData方法测试", async () => {

  // res是axios的返回对象里面的结构特别的多 我们使用toMatchObject如果我们给定的数据结构在res中的时候 就会返回测试用例通过
  await expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true 
    }
  })
})
```

<br><br>

## Jest API:

### describe("描述字符串", callback)
该方法是将几个相关的测试放到一个组中 相当于把连续的几个测试用例(test()) 编成了一个组  

**场景:**  
如果我们不分组的话 会在一个js文件中 连续出现下面的情况
```js
test()
test()
test()
test()
test()
```

如果这样的测试用例多了后 不方便我们管理 我们不知道哪个测试是测试的是什么

所以我们可以对上面的用例进行按功能分组 把相关联的用例 方在一个组中进行测试

```js
describe("分组1", () => {
  test()
  test()
})

describe("分组2", () => {
  test()
  test()
  test()
})
```

<br>

### test("对测试文件的描述", callback)
test()就相当于一条测试用例 可以在callback中测试方法等  
Jest中的测试方法, 我们会传入预期 和 期望的值 如果结果是预期的话 则测试通过

**参数1:**  
对要测试js文件的描述, 描述规范: 测试的内容 + 输入的值

**参数2:**  
回调函数, 回调函数中 需要执行 以下的两个方法

**expect()...toBe()**  
expect()是预期, 我们会在实参中传入要执行的逻辑  
toBe()是期望得到的值
```js
test("massage_method_200", () => {
  // 执行 demo.js 文件中的方法
  expect(massage(200)).toBe("至尊服务")
})
```

<br>

### test.only("对测试文件的描述", callback)
只执行这一个用例 其它的不管

<br>

### expect()
判断一个值是否满足条件，你会使用到expect函数。 但你很少会单独调用expect函数， 因为你通常会结合expect 和匹配器函数来断言某个值。

**参数:**  
expect的参数应该是被测代码的返回值, 而匹配器接收的传入参数则是希望被测代码返回的值。

<br>

下面是一个很容易理解的例子： 假设你有一个方法bestLaCroixFlavor()，它应该返回字符串'grapefruit'。 下面是如何测试：

```js
test('the best flavor is grapefruit', () => {
  expect(bestLaCroixFlavor()).toBe('grapefruit');
});
```

<br><br>

## 异步代码的测试:
异步代码的测试 我们分为两种情况

### 要点:

### **expect.assertions(1)**

**位置:**    
test()的callback的首行

**作用:**  
测试用例中 必须要执行几个断言 当执行给定的断言后 测试才算通过  
当遇到异步方法的时候 为了保证异步方法一定被指定 需要在首行加上该api

<br>

### **test() callback 的 done 形参:**
它是一个方法 存在与 test() 方法的第二个参数的形参中

**位置:**  
我们在需要结束测试方法的位置上调用 done()  这样jest就知道 测试用例应该到哪才算结束  

<font color="#C2185B">如果jest在执行测试用例的时候 如我们没有明确的告诉他 它会在我们执行完 test() 方法后 立即结束程序 因为是异步的 所以不会等到异步逻辑返回后才结束</font>

<br>

### 情况1: 我们只关注 我们传入的回调是否执行了 不关心返回值是否符合我们预期
比如下面的代码 我们只关注 callback 是否被执行了 执行了说明我们的方法没有问题

**示例1:**
```js
// demo.js
// 我们定义一个方法: 传入了一个回调 在1秒后执行这个回调
function delay(callback) {
  setTimeout(() => {
    callback && callback()
  }, 1000)
}


// 测试要求: 我们只关注 callback 回调是否被执行了
// demo.test.js
test("callback被执行", done => {

  // 异步代码测试要写 expect.assertions(1) 表明该测试用例中要执行几个断言才算ok
  expect.assertions(1)

  // 创建一个回调
  function callback() {
    console.log("回调被执行了")

    // 在合适的位置 使用 jest API 来测试结果
    // 我们使用 下面的方式 测试 callback是否执行到这里了 因为上面的 expect.assertions 所以肯定要执行下面的断言
    expect(true).toBe(true)

    // 标记 测试用例 在该位置 才结束
    done()
  }


  // 调用delay传入回调
  delay(callback)
})
```

**示例2:**  
使用axios编写异步代码

```js
// fetchData.js
npm install axios@0.19.0

import axios from "axios"

// fetchData: 发起请求, 将返回的结果 交于 handler 来处理
export const fetchData = (handler) => {
  axios.get("/login").then((res) => {
    handler(res.data.data)
  })
}



// fetchData.test.js
/*
  如果像下方的写法 我们只会测试 传入的handler是否被执行 而不会关注 请求返回的结果
  不会验证响应结果如何
*/  
test("FetchData方法测试", () => {
  // 调用 fetchData 请求数据, 传入 cb 我们想测试 响应结果 但是如下的写法只会测试 cb执行被执行了
  fetchData(data => {
    expect(data).toEqual({
      success: true
    })
  })
})


// 修改方式:
/*
  1. test()回调中首行使用 expect.assertions(1)
  2. 使用 done() 标记测试用例应该在何处执行完毕 
*/
test("FetchData方法测试", done => {
  fetchData(data => {

    // 使用 expect.assertions 表明下方应有几个断言要处理
    expect.assertions(1)

    // 我们测试下响应数据 是否符合预期
    expect(data).toEqual({success: true})

    // 使用 done() 标明 测试用例结束的位置
    done()
  })
})
```

<br>

### 测试异步代码的方式:

**1. test的callback中的首行要使用: expect.assertions(1)**  
表示期望执行的断言数 断言就类似toBe()

<br>

**2. 在test的callback中传入 done 形参**  
done()使用在test()方法内部 在最后结束的位置上 调用done() 指明测试用例应该到哪才算结束

<br><br>

## Promise的异步代码测试:
我们将promise形式的异步代码的测试 分为两种情况, 1种是不使用 await 的普通情况, 1种是使用 await 的await情况

<br>

### 普通情况:
在测试 普通的promise方法的时候, 我们要在 promise方法的前面加上 <font color="#C2185B">return</font>

<br>

**示例1:**  
```js
// demo.js
export function delay(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}


// demo.test.js
test("普通promise的测试", () => {
  expect.assertions(1)

  // 注意: 我们要在promise的异步方法的前面加上 return!!!
  return delay("数据").then(res => {
    // 我们拿到res结果后开始测试
    expect(res).toBe("数据")
  })

})
```

<br>

**对上技巧:**  
我们还可以使用 expect(传入promise逻辑).resolves 匹配器 拿到前面的promise resolve出来的结果 
```js
// demo.test.js
test("普通promise的测试", () => {
  expect.assertions(1)

  // 不使用then拿成功的结果 而是使用.resolves 匹配器
  return expect(delay("数据")).resolves.toBe("数据")

})
```

<br>

**示例2:**  
```js
// fetchData.js
import axios from "axios"

// fetchData会返回一个 promise
export const fetchData = () => {
  return axios.get("/login")
}



// fetchData.test.js
/*
  如果我们没有在 promise 方法前面加上 return 则不管我们请求的地址是正确的还是错误的 测试结果都是通过

*/
import {fetchData} from "./fetchData"

test("Promise FetchData方法测试", () => {

  // 异步最好都要写这个
  expect.assertions(1)

  // 一定要加上return 如果不加测试用例不会跑完整 
  return fetchData().then(res => {
    // 测试返回的结果是否符合预期
    expect(res.data).toEqual({success: true})
  })
})
```

<br>

### await的情况:

**方式1:**
```js
// demo.js
export function delay(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}


// demo.test.js
test("await promise的测试", () => {
  expect.assertions(1)

  let res = await delay("数据")
  expect(res).toBe("数据")

})
```

<br>

**方式2:**  

**要点:**  
1. 在 expect 前面使用 await
2. 我们在 expect() 里面传入有返回值的执行逻辑
3. 我们使用 匹配器 .resolves 拿到传出成功的结果
4. fetchData()的返回值 是一个axios 返回的对象里面的结构特别多 所以我们使用 toMatchObject() 匹配器 只要目标结构中 有我们传入的data属性 则匹配成功

```js
// fetchData.js: 内部返回了一个 promise
import axios from "axios"

// 直接返回一个 promise
export const fetchData = () => {
  return axios.get("/login")
}



// fetchData.test.js
import {fetchData} from "./fetchData"

// 加上 async 
test("Promise FetchData方法测试", async () => {

  // res 如果其中的一个属性匹配成功了 就会返回测试用例通过
  await expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true 
    }
  })
})
```

<br>

### 练习: 我们期望返回404
**fetchData.js**  
我们故意将请求地址写错 这样会返回404, 这样axios会抛出异常 我们需要在 catch 中断言

```js
import axios from "axios"
export const fetchData = () => {
  return axios.get("/loginxxx")
}
```

<br>

**fetchData.test.js**  
错误的代码: 当我们不加上 expect.assertions(1) 我们发现不管接口是否正确 都会通过测试 下面我们使用了catch catch中的逻辑只有当出现异常的时候才会执行 如果没有异常不走catch中的逻辑 所以它直接通过了测试

所以 这里我们要在test()首行使用 expect.assertions(1) 表明必须执行一次expect 如果不执行则说明测试用例不通过 如果执行了则说明测试用例通过

```js
import {fetchData} from "./fetchData"

test("404 FetchData方法测试", () => {

  // 加上这句话表明我们必须走一遍 expect
  expect.assertions(1) 

  // 注意写 return
  return fetchData().catch(err => {
    // 在catch中 我们先看看是什么异常
    console.log(err.toString())
      // 页面或接口不存在: request failed with status code 404

    // 字符串话err看看里面有没有404 如果有则符合预期
    expect(e.toString().indexOf("404") > -1).toBe(true)
  })
})
```

<br><br>

## Jest 中的四个钩子
我们说说测试用例的生命周期

### 示例代码:

**demo.js**  
比如我们调用 gongzhu(1) 这样user就有值了 相当于选择了一名公主

然后我们调用 anjiao() 则 fuwu 就有值了 相当于我们决定了做何种服务

这样我们打印 console.log(demo.fuwu) 就能看到完整的信息了
```js
// 开一个洗脚城
export default class Demo {

  user = ""
  fuwu = ""

  // 我们根据传入了number选择 要点的公主  设置user的值
  gongzhu(number) {
    this.user = number == 1 ? "JL" : "ZY"
  }

  // 设置fuwu的内容
  anjiao() {
    this.fuwu = this.user + "走进房间为你足疗"
  }

  // 设置fuwu的内容
  anmo() {
    this.fuwu = this.user + "走进房间为你按摩"
  }
}
```

<br>

**demo.test.js**  
```js
import Demo from "./demo"

// 获取了洗脚城
const demo = new Demo();


test("测试 JL的足疗方法", () => {

  // 传入number1 决定公主
  demo.gongzhu(1)
  // 决定公主后 执行服务
  demo.anjiao()

  console.log(demo.fuwu)

  // 我们期望fuwu的内容是 JL走进房间为你足疗
  expect(demo.fuwu).toEqual("JL走进房间为你足疗")
})
```

<br>

### **生命周期: beforeAll(cb)**
在所有测试用例之前执行的回调

### **生命周期: afterAll(cb)**
在所有的测试用例完成之后 执行的回调

```js
// 该回调在所有的测试用例之前执行:
import .. from ".."


// 生命周期:
beforeAll(() => console.log("我会在所有的测试用例之前执行"))

// 测试用例
test("用例1", () => { ... })

// 生命周期: 之后
afterAll(() => console.log("我会在所有的测试用例执行之后再执行"))
```

<br>

### **生命周期: beforeEach(cb)**
在每一个测试用例 **执行之前** 所执行的回调

### **生命周期: afterEach(cb)**
在每一个测试用例 **执行完成之后** 所执行的回调

```js
// 该回调在所有的测试用例之前执行:
import .. from ".."


// 生命周期: 之前
beforeAll(() => console.log("我会在所有的测试用例之前执行"))



// 生命周期: 每个测试用例之前执行
beforEach(() => {
  console.log("每个用例执行之前 执行的回调")
})


// 测试用例
test("用例1", () => { ... })  
    // 用例1之前会执行beforEach的回调
test("用例2", () => { ... })
    // 用例2之前会执行beforEach的回调


// 生命周期: 每个测试用例执行之后执行
afterEach(() => {
  console.log("每个用例执行完成后 执行的回调")
})



// 生命周期: 之后
afterAll(() => console.log("我会在所有的测试用例执行之后再执行"))
```

<br><br>

## 生命周期的作用域:
生命周期的作用域 要配合 jest中的分组(describe()) 如果我们没有 describe() 分组 那么也谈不上 生命周期的作用域的问题

<br>

### 特色:
- 钩子函数在父级分组可以作用域子集 类似继承  
比如有两个分组 一个是父分组 一个是子分组 那么父级的钩子函数会作用到子分组里

- 钩子函数同级分组作用域互不干扰 各起作用

- 先执行外部的钩子函数 再执行内部的钩子函数  
先执行父分组的钩子函数 在执行子分组的钩子函数

<br>

### 要点:
每一个测试文件 相当于有一个默认的 describe分组 也就是说我们不分组 默认也会把我们的 test()用例 写在一个分组中

```js
// 即使我们不对demo.test.js文件进行分组 默认也会有一个 这点很像 模块化 里面的概念 我们的代码都会被一个函数包裹起来
describe("默认就会有一个分组", () => {
  test()
  test()
})
```

<br>

**示例:**  
A 和 B 相当于 子级分组
```js
describe("父级分组", () => {
  
  父级中的生命周期 会作用于 A分组 和 B分组 中
    ↘
  describe("A分组", () => {

    子级中的生命周期 会在本分组中运行 不会影响B
        ↘
    test()
    test()
  })

  describe("B分组", () => {

    子级中的生命周期 会在本分组中运行 不会影响A
        ↘
    test()
    test()
  })

})
```

<br><br>

## 测试情况: 模块中依赖于外部的方法(callback)
Mock callback 我们模拟一个回调 或者 模拟你一个方法

### 描述:
我们测试一个模块的话 理论上这个模块应该是独立的 不受任何外部模块的限制 但事实上很多模块都会依赖于外部的方法

这样的话我们不知道外部方法是什么样的, 或者说我们需要等待另一位开发者的模块完成 我们才能测试 当另一位开发者没有完成他模块的开发的话 我们的模块就没有办法单独测试了 这种情况应该怎么处理?

**定义要测试的文件:**  
其中的 callback 就是我们的模块要依赖的外部方法
```js
// demo.js
export function delay(cb) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        // 外部依赖cb会有一个返回值 我们的方法中 需要拿到这个返回值 对其进行操作
        const res = cb && cb()

        resolve(res)
      }, 1000)
    }
  })
}
```

上面的代码 当没有 cb 的时候我们应该怎么测试呢? 我们可以模拟一个 cb

<br>

### jest.fn().mockReturnValue("数据")
jest.fn()就是模拟一个回调, 我们也可以在jest.fn()中写逻辑, 如果我们只关心返回值结果的话 也可以使用 .mockReturnValue("值") 来模拟返回值

**返回值:**  
一个回调

```js
// demo.test.js
const delay = require("./demo")

test("delay测试 模拟callback", () => {
  // 异步: 
  expect.assertions(1)

  // 模拟一个callback
  let callback = jest.fn().mockReturnValue(1)

  // promise 普通方式的使用方式:
  return expect(delay(callback).resolves.toBe(1))
})
```

<br><br>

## 测试情况: 测试文件依赖于外部库

### 描述:
我们测试源文件的时候, 源文件中可能依赖了一些第三方的库 或者 插件 或者类 有的时候我们没有办法控制 这个第三方的插件返回什么

Jest中为我们提供了方法 让我们可以控制 第三方的插件具体返回什么样的值

<br>

比如: 我们使用自定义的随机函数来模拟第三方的插件
```js
// getRandom.js
// 该函数就是返回一个 0 - 10 之间的随机数

const getRandom = () => Math.floor(Math.random() * 10)
```

<br>

如果我们不对 上面的随机数函数加以控制 我们只能测试 返回值是 > 10 还是 < 10
```js
// getRandom.test.js
const getRandom = require("./getRandom")

test("测试 getRandom 函数的返回值情况 < 10", () => {
  expect(getRandom()).toBeLessThan(10)
})

// 或者 

test("测试 getRandom 函数的返回值情况 > 10", () => {
  expect(getRandom()).toBeGreaterThan(10)
})
```

<br>

但是很多时候我们期望我们可以控制 第三方插件的返回结果 而 Jest 中就为我们提供了这样的方法

<br>

### jest.spyOn(第三方类库插件, "该类库插件中具体的属性")
我们可以通过 *spyOn* 可以控制想要的一些外部依赖库的属性 比如 Math 然后按照我们预期的结果进行一个返回 然后我们对结果进行定制 然后摒除我们的测试单元对外部依赖的一些影响

比如我们想控制 Math.random() 方法 让其就返回 0.11 spyOn()方法就可以监视Math对象的属性

**返回值:**  
受jest控制的对象 我们可以操作这个对象中的 **给定属性**

```js
// 使用 spyOn() 方法 监视 Math类中的 random 属性
const mockRandom = jest.spyOn(Math, "random")

// 返回一个受 jest 监控的 Math对象中的random属性 我们指定它的返回值
mockRandom.mockReturnValue(0.11)

// 上面修改了 Math.random() 的返回结果 所以这里我们再进行测试
expect(getRandom()).toBe(1)
```

<br>

**注意:**  
我们上面使用 spyOn() 方法修改了 Math.random 的返回值  
如果我们不对其进行复原的话 会印象到别的逻辑 所以我们在测试完毕后 还需要对其进行复原操作

<br>

### 清理 我们劫持的属性 让其复原
如果我们的测试用例中做了很多的设置 那在我们结束测试用例的时候 一定要做好清扫工作 保证不会对其它的测试用例进行影响

<br>

### mockRestore()
```js
test("Math.random 返回0.11的时候 结果应该是1", () => {

  const mockRandom = jest.spyOn(Math, "random")
  mockRandom.mockReturnValue(1)
  expect(getRandom()).toBe(10)

  // 清除设置 保证不会对其它的测试用例照成影响 !!!!!!!!!
  mockRandom.mockRestore()
})
```

<br><br>

## 测试情况: 测试文件依赖于别的文件
模拟一个模块

### 描述:
我们现在有两个人同时开发
- A: 负责请求数据  getData.js
- B: 负责拿到A的数据 进行继续操作 如 对数据进行2次包装  normalizeData.js

```js
// A逻辑:
const getData = async () => {
  let {data: res} = await axios.get("/login")
  return res
}
```

```js
// B逻辑:
const getData = require("./getData")

const normalizeData = () => {

  // 调用 A 的方法 获取数据
  const data = getData()

  return {
    status: 0,
    data
  }
}
```

现在 A 的数据迟迟没有回来 我们却要对B的代码进行测试 这时候我们应该怎么操作呢？

<br>

**测试逻辑:**  
normalizeData.test.js
因为normalizeData.js文件中 对A的数据进行了2次包装 仅仅是添加了一个status: 0 所以我们刨除A的数据 我们能测试的就是 status是否为0

```js
const normalizeData = require("./normalizeData")

test("normalizeData测试", () => {
  const status = normalizeData().status
  expect(status).toBe(0)
})
```

但是我们想测试A的getData怎么办呢？

jest中提供了一个方法 它可以对一个模块进行mock(比如我们就可以模拟A的逻辑)  

<br>

### 操作步骤:

### 1. 我们使用 jest.mock("js文件(模版)")
我们在js文件的首行写这句 它会劫持我们给定的js文件, 然后我们就可以对劫持后的文件进行自定义的操作
```js
jest.mock("./getData")

// 然后我们在引入监视的文件 这样就是被劫持后的文件
const getData = require("./getData")
```

<br>

### 2. 对劫持后的文件进行自定义设置
```js
// 设置该文件的返回值
getData.mockReturnValue({
  name: "zzc"
})
```

<br>

### 3. 然后对其测试
```js
jest.mock("./getData")

const getData = require("./getData")
const normalizeData = require("./normalizeData")

// 私人定制
getData.mockReturnValue({
  name: "zzc"
})

// 我们预期得到的就是mock出来的结果
test("normalizeData data测试", () => {
  const data = normalizeData().data
  expect(data).toBe({
    name: "zzc"
  })
})
```

<br><br>

## 测试情况: UI快照测试
进行ui测试 需要引入一个额外的库 这个库的作用是把ui组件 序列化成为可以比较的对象 这个库的名字是 react-test-renderer

<br>

我们先创建一个组件
```js
import React from "react"

const BaiduLink = () => {
  const url = "www.baidu.com"
  const text = "百度一下"

  return (
    <a href={url}>{text}</a>
  )
}

export default BaiduLink
```

<br>

测试文件:
```js
// 引入组件
import BaiduLink from "./baiduLink";

// 引入react和render库
import renderer from "react-test-renderer"
import React from "react"


test("测试baidulink被正常的渲染", () => {
  // 将ui组件序列化成可以比较的对象
  const tree = renderer.create(<BaiduLink />).toJSON()
  expect(tree).toMatchSnapshot()
})
```  

**注意:**  
我们我们使用了快照 这时候我们要修改了内容的话 会要求先进行快照的验证 通过了后才可以进行下一步 这时候我们就要通过如下的命令

```
npx jest --updateSnapshot
```










# jest.config.js
```js
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // 测试中导入的所有模块都应该被自动模拟
  // automock: false,

  // 在“n”次失败后停止运行测试
  // bail: 0,

  //在解析模块时尊重package.json中的 "browser "字段 当我们 npx jest --init 的时候 如果选择 browser 则这项就关闭了
  // browser: false,

  // Jest应该存储其缓存的依赖信息的目录
  // cacheDirectory: "/private/var/folders/dn/896vc2713zd5hhqb590klzmr0000gn/T/jest_dx",

  // 在每次测试之间自动清除模拟调用和实例
  clearMocks: true,

  // 表示在执行测试时是否应该收集覆盖率信息。
  // collectCoverage: false,

  // 一个glob模式数组，表示需要收集覆盖信息的一组文件。
  // collectCoverageFrom: null,

  // 生成的代码覆盖率所存放的位置
  coverageDirectory: "coverage",

  // 用于跳过覆盖率收集的regexp模式字符串数组
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Jest在撰写报道时使用的记者姓名列表
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // 一个配置覆盖结果的最小阈值执行的对象
  // coverageThreshold: null,

  // 一个自定义依赖提取器的路径
  // dependencyExtractor: null,

  // 让调用已废弃的API抛出有用的错误信息
  // errorOnDeprecated: false,

  // 使用一个glob模式数组从被忽略的文件中强制收集覆盖率
  // forceCoverageMatch: [],

  // 一个模块的路径，该模块导出一个异步函数，在所有测试套件之前被触发一次。
  // globalSetup: null,

  // 一个模块的路径，该模块导出一个异步函数，在所有测试套件结束后被触发一次。
  // globalTeardown: null,

  // 一组需要在所有测试环境中可用的全局变量
  // globals: {},

  // 用于运行你的测试的最大数量的工作者。可以指定为%或一个数字。例如：maxWorkers: 10%将使用你的CPU数量的10%+1作为最大的工作器数量。 maxWorkers: 2将使用最多2个工作器。
  // maxWorkers: "50%",

  // 从需要的模块的位置开始向上递归搜索的目录名称数组
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // 你的模块使用的文件扩展名数组
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],

  // 一个从正则表达式到模块名称的映射，允许用一个模块存根出资源。
  // moduleNameMapper: {},

  // 一个regexp模式字符串数组，与所有模块路径相匹配，然后才被认为是模块加载器的 "可见"。
  // modulePathIgnorePatterns: [],

  // 激活测试结果的通知
  // notify: false,

  // 一个指定通知模式的枚举。要求 { notify: true }
  // notifyMode: "failure-change",

  // 一个预设，作为Jest配置的基础。
  // preset: null,

  // 运行一个或多个项目的测试
  // projects: null,

  // 使用此配置选项，将自定义报告者添加到Jest中
  // reporters: undefined,

  // 在每次测试之间自动重置模拟状态
  // resetMocks: false,

  // 在运行每个单独的测试之前，重置模块注册表
  // resetModules: false,

  // 一个自定义解析器的路径
  // resolver: null,

  // 在每次测试之间自动恢复模拟状态
  // restoreMocks: false,

  // Jest应该扫描的测试和模块的根目录。
  // rootDir: null,

  // Jest在搜索文件时应该使用的目录路径的列表。
  // roots: [
  //   "<rootDir>"
  // ],

  // 允许你使用一个自定义的运行器，而不是Jest的默认测试运行器。
  // runner: "jest-runner",

  // 运行一些代码的模块的路径，以便在每次测试前配置或设置测试环境
  // setupFiles: [],

  // 运行一些代码的模块的路径列表，以便在每次测试前配置或设置测试框架
  // setupFilesAfterEnv: [],

  // Jest在快照测试中应该使用的快照序列器模块的路径列表
  // snapshotSerializers: [],

  // 将用于测试的测试环境
  // testEnvironment: "jest-environment-jsdom",

  // 将被传递给testEnvironment的选项
  // testEnvironmentOptions: {},

  // 在测试结果中增加了一个位置字段
  // testLocationInResults: false,

  // Jest用于检测测试文件的glob模式
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // 与所有测试路径匹配的regexp模式字符串数组，匹配的测试被跳过。
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Jest用于检测测试文件的regexp模式或模式阵列
  // testRegex: [],

  // 该选项允许使用一个自定义的结果处理器
  // testResultsProcessor: null,

  // 该选项允许使用自定义测试运行器
  // testRunner: "jasmine2",

  // 这个选项设置了jsdom环境的URL。它反映在诸如location.href等属性中。
  // testURL: "http://localhost",

  // 将此值设置为 "假"，可以为 "setTimeout "等函数使用假的定时器
  // timers: "real",

  // 从正则表达式到路径到变换器的映射
  // transform: null,

  // 与所有源文件路径匹配的regexp模式字符串数组，匹配的文件将跳过转换。
  // transformIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // 在模块加载器自动返回模块的模拟之前，对所有模块进行匹配的regexp模式字符串的数组。
  // unmockedModulePathPatterns: undefined,

  // 表示是否应在运行期间报告每个单独的测试
  // verbose: null,

  // 在观察模式下重新运行测试之前，对所有源文件路径进行匹配的一个重合模式数组。
  // watchPathIgnorePatterns: [],

  // 是否使用watchman进行文件抓取
  // watchman: true,
};

```