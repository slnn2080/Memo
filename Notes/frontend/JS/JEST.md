# Jest

## 单元测试:
又叫做模块测试 一个最小的测试单元其实就是指js中的一个方法

<br>

## 测试金字塔:

         UI

        Test       系统测试

    Service Tests  服务测试

      Unit Tests   单元测试
 
单元测试 主要测试的就是最小的测试单元 也就是js中的一个方法  
只有最小的单元ok了 那整个系统才能更加的稳定

<br>

## 单元测试的特点:
- 预见性  
有效的保证你写的代码 就是你想要的结果 因为我们的逻辑可能并不是我们想的那样完备

- 早期性  
尽可能在软件开发的早期就能发现问题

- 说明性  
单元测试可以是文档 它可以提供例子告诉别人如何使用你的代码

- 保障性  
对已有的功能进行重构时 确保不会影响历史功能

<br>

## 单元测试框架: 
工程中引入一个单元测试的框架的目的是什么？  
它主要从两方面来提升我们工程的研发效率的

- 编码阶段  
基础类库用于轻松编写结构化的测试 标记测试方法的属性  
提供断言方法的断言类或者提供集成这些类库的能力

- 运行阶段  
测试运行器用于可自动执行一个或全部单元测试  
已运行 未运行 测试数据  
失效的测试数据 测试失败的原因 异常栈信息

<br>

## 常见的js测试框架:
- ava
- tape
- jasmine
- mocha
- jest

<br>

## 写测试之前的准备: 
1. 测试对象是什么
2. 要测试什么功能
3. 预期要得到什么结果
4. 是否有外部依赖(测试里是不应该有外部依赖的)

<br>

## 执行步骤: 
1. 构造参数 创建外部依赖的mock 进行必要的设置
2. 用构造好的参数执行被测试的代码
3. 用实际得到的结果与期望的结果比较
4. 移除在准备阶段创建的外部依赖以及其它影响

<br>

## 环境准备:
1. mkdir jsUnit
2. cd jsUnit
3. npm init -y
4. npm install jest -D
5. 将package.json中的 test 修改为 jest
```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},


// 修改为如下
"scripts": {
  "test": "jest"
}
```

<br>

## 如何在项目中书写测试用例: 
我们先定义一个要测试的目标方法
```js
const add = (a, b) => a + b
module.exports = add
```

然后对这个方法进行测试  

<br>

## 测试文件的创建: 
它有两种创建方式

**方式1:**  
创建js文件来测试方法

**格式:**  
要测试的方法名.test.js  
要测试的方法名.spec.js

<br>

**方式2:**  
创建 ``__tests__`` 文件夹 在这个文件夹中 编写测试代码  
然后在这个文件夹中创建 和要测试文件一样的文件名的js文件

**比如:**  
我们要对 index.js 文件 进行测试  
那么我们在tests文件夹里面 也创建一个index.js 文件 里面编写测试代码

    | - src
      - index.js

      | - __test__
        - index.js

<br>

## 测试用例1:
```js
// 引入我们要测试的文件
const add = require("./index")

// describe()方法是用来描述我们是干嘛的 我们在回调中书写测试用例
describe("add()测试", () => {

  // 使用test()来标注测试用例
  test("1+1应该等于2", () => {
    // 在这个回调中我们要进行判断

    // 1. 给add方法提供实参
    const res = add(1, 1)

    // 2. 拿我们测试运行的结果 和 预期的结果进行比较 
    /*
      expect预期的意思
      toBe()是一个比较器它会将运行结果与我们期望的结果以各种形式进行一个比较

      toBe是值相等的比较
    */
    // 预期 应该 等于 什么
    expect(res).toBe(2)
  })
})
```

结果:

```js
Test Suites: 1 passed
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.393 s
```

<br>

### 总结:
**<font color="#C2185B">describe("描述", cb): </font>**  
将几个相关的测试放到一个组中 也就是不是必须要的describe() 我们也可以直接写 test()

<br>

**<font color="#C2185B">test(): </font>**   
describe()中回调中的方法 测试用例 是测试的最小单位

<br>

**<font color="#C2185B">expect(我们的结果): </font>**   
提供很多的matcher来判断你的方法返回值是否符合特定的条件

    deltice.github.io/jest/docs/en/expect.html#content

<br>

## 运行 jest 测试
npm run test

<br>

## 测试用例2: 异步方法
**知识点:**  
- expect.assertions()
- done参数
- Promise async方式
- --coverage

<br>

定义要测试的方法:
```js
const delay = callback => {
  setTimeout(() => {
    callback && callback()
  }, 1000)
}

module.exports = delay
```


编写测试用例:  
我们在测试的时候 希望我们的程序有预期的一个执行结果 类似上面的程序 它是没有返回值的 我们只需要测 我们的callback被真正的执行了 就说明我们的方法没有问题了

<br>

### 要点:
- 在有异步方法的时候 我们要在test方法内的首行加上   
并传入我们期望执行的断言数

      expect.assertions(1)

- 我们要在test方法里面传递 done 参数  
并指明要结束测试方法的位置上 调用done()

```js
const delay = require("./index")

test("callback 被执行", (done) => {

  // 当遇到异步方法的时候 为了保证异步方法一定被执行 需要在首行加上
  // 传入我们期望几个断言被执行 断言就类似toBe
  expect.assertions(1)


  // 因为没有返回值 我们执行在测试方法调用 要测试的方法 delay
  const callback = () => {
    console.log("callback exec")

    // 在这里面我们加上预期 true true表示一定会被执行 我们期望的执行结果就是输出上面的console
    expect(true).toBe(true)

    // 这样jest就知道 测试用例应该到哪才算结束
    done()

    /*
      jest在执行测试用例的时候 如果你没有明确的告诉它 它会在你执行了这个方法执行完成之后 立马结束程序 而不会等到我们异步方法被执行的时候才结束

      为了防止过早的结束 我们需要在test方法里面传递 done 然后在期望被结果的地方调用它
    */
  }
  delay(callback)
})
```

<br>

## 测试用例3: 针对于Promise的形式
普通的Promise
```js
test("delayPromise 测试", () => {
  // 异步方法要在最开始的位置加上期望的断言数
  expect.assertions(1)

  // 让callback直接返回1
  const callback = () => 1

  // 方式1:
  // 在要测试promise的时候 我们要在要测试的函数前面 加上return 必须
  return delayPromise(callback).then(res => {
    expect(res).toBe(1)
  })

  // 方式2:
  // 上面我们是到then方法里面 拿到res后 进行的测试 现在我们可以使用 jest提供的格式来直接拿到resolve的结果
  return expect(delayPromise(callback)).resolves.toBe(1)
})
```

## 测试用例4: 针对 async wait 的形式:
```js
test("delayPromise async测试 被执行", async () => {
  expect.assertions(1)
  const callback = () => 1

  const res = await delayPromise(callback)
  expect(res).toBe(1)
})
```

<br>

## 测试覆盖率:
只需要在 package.json 的 scripts 后面添加参数

```js
"scripts": {
  "test": "jest --coverage"
},
```

开启测试覆盖率之后 运行命令后 会出现一个表格

File | %Stmts | %Branch | %Funcs | %Lines | Uncovered Line 

    Stmts: 语句覆盖率
    Branch: 分支的覆盖率
    Funcs: 函数覆盖率
    Lines: 整体的行的覆盖情况
    Uncovered Line: 没有覆盖的行

正常情况下 Lineshe 和 Stmts数据时相同的 如果一行有两个语句的话 数据可能会有些出路

当我们加上 --coverage参数 之后 运行完测试命令 我们的目录下面会多出一个coverage文件目录 这个目录里面有一个 index.html 里面是更详尽的测试覆盖率的一些情况

    | coverage
      | lcov-report
        index.html 该页面还能点击第一列(File列)的 index.js

点击后会进入到一个新的页面 有的行可以会飘红了 这行就是没有被测试到的行(或者说没有被测试覆盖到的行)

如果想完善这点 我们可以针对异常的情况 去测试这点

<br>

## 测试用例5: 单元测试中依赖了外部的一个方法
我们上面说了 如果我们要测试一个单元的话 理论上来讲应该不受任何外部模块的限制 因为耦合性特别高的话 我们的单元就没有办法独立运行了

在真实的项目中 真是有依赖于外部的一个方法的话 怎么测试呢？

定义一个要测试的文件
```js
const delayPromise = callback => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const res = callback && callback()
        resolve(res)
      }, 1000)
    } catch(e) {
      reject(e)
    }
  })
}

module.exports = delayPromise
```

这个文件中的 callback 就属于外部依赖 如果我们没有传入 callback的情况下 应该怎么测试呢？

然后我们看看怎么mock(模仿)一个callback 测试我们的 delayPromise()

```js
const delayPromise = require("./index")

test("delayPromise 测试", () => {
  expect.assertions(1)

  // 之前我们定义这个callback是没有任何意义的我们 它的唯一作用就是保证delayPromise被正确的执行 因为delayPromise需要一个callback 所以这个callback的逻辑我们完全的不关系 我们就关心它的返回值
  // const callback = () => 1

  // 针对这种场景 jest提供了一个 jest.fn() 方法 该放飞就是模拟一个回调 我们也可以在jest.fn()里面写逻辑 当然如果我们只关心返回值结果的话 也可以如下的写法 这个方法十分的强大 不仅仅可以模拟返回值 还有看这个方法是否被调用 里面一些具体的执行结果
  const callback = jest.fn().mockReturnValue(1)

  //  我们要在要测试的函数前面 加上return 必须
  return expect(delayPromise(callback)).resolves.toBe(1)
})
```


## 测试用例6: 我们依赖于外部库的时候 我们应该怎么办？
getRandom.js
```js
// 返回随机数
const getRandom = () => Math.floor(Math.random() * 10)
module.exports = getRandom
```

编写上面文件的测试用例 getRandom.test.js
```js
const getRandom = require("./getRandom")

// 如果我们不对Math.random做控制的话 我们可以测试什么？ 只能测试取数的范围
test("getRandom < 10", () => {
  // toBeLessThan()比什么小
  expect(getRandom()).toBeLessThan(10)
})

test("getRandom >= 0", () => {
  expect(getRandom()).toBeGreaterThanOrEqual(0)
})

// 但是我们希望做的是 控制Math.random的结果 看看它的值是不是真的是 * 10 而且是控制在0-10之间的 这样就需要我们对Math.random()方法进行控制
// jest给我们提供了方法
test("Math.random 返回0.11的时候 结果应该是1", () => {
  // 怎么控制 Math.random()返回值是0.11呢？ spyOn()它可以对具体的对象的属性进行监听
  const mockRandom = jest.spyOn(Math, "random")

  // 指定它的返回值
  mockRandom.mockReturnValue(0.11)
  expect(getRandom()).toBe(1)
})
```


上面我们通过jest提供的spyOn方法 指定了Math.random的返回值 接下来我们看看还可以控制什么

我们让Math.random()方法返回1 期待输出结果为10  
但是注意了 正常Math.random() * 10 的方法应该返回 > 0 <10 的  
也就是说正常是不应该出现这样的情况的

```js
test("Math.random 返回0.11的时候 结果应该是1", () => {
  const mockRandom = jest.spyOn(Math, "random")

  // 指定Math.random的返回值为1
  mockRandom.mockReturnValue(1)
  expect(getRandom()).toBe(10)

  // 清除设置 保证不会对其它的测试用例照成影响 !!!!!!!!!
  mockRandom.mockRestore()
})
```

**注意:**  
如果我们的测试用例中做了很多的设置 那在我们结束测试用例的时候 一定要做好清扫工作 保证不会对其它的测试用例进行影响

**<font color="#C2185B">mockRandom.mockRestore(): </font>**   
结合上面的例子看 不想整理了

上面的例子中 我们可以通过 *spyOn* 可以控制想要的一些外部依赖库的属性 比如 Math 然后按照我们预期的结果进行一个返回

然后我们对结果进行定制 然后摒除我们的测试单元对外部依赖的一些影响

<br>

**<font color="#C2185B">beforeEach(() => {}): </font>**  
这个api会在每一个测试用例之前 执行里面的回调  
beforeEach是有作用域的 如果我们将beforeEach写在describe()的里面  
那么beforeEach就针对这个作用域  

如果没有写在describe里面的话 就是针对整个的测试文件生效

<br>

**<font color="#C2185B">afterEach(() => {}): </font>**  
在测试用例结束的时候 执行里面的回调

```js
let mockRandom = null

beforeEach(() => {
  mockRandom = jest.spyOn(Math, "random")
})

afterEach(() => {
  mockRandom.mockRestore()
})

```

<br>

## 测试用例7: 
我们现在要测试的库 不是依赖于一个库 而是依赖于别的文件 这种情况下我们应该怎么做呢？

比如 我们现在有两个人同时开发 A 负责请求数据  getData.js
```js
const getData = () => {}
module.exports = getData
```

B 负责拿到A的结果后进行继续操作(比如对A的数据 进行二次包装) normalizeData.js
```js
const getData = require("./getData")

const normalizeData = () => {

  const data = getData()

  return {
    status: 0,
    data
  }
}

module.exports = normalizeData
```

现在 A 的数据迟迟没有回来 我们却要对B的代码进行测试 这时候我们应该怎么操作呢？


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

我们在首行添加 如下语句

    jest.mock("./getData")
    const getData = require("./getData")

这时候我们就可以通过 getData 来进行私人测试定制了

```js
jest.mock("./getData")

const normalizeData = require("./normalizeData")
const getData = require("./getData")

// 私人定制
getData.mockReturnValue({
  name: "zzc"
})

test("normalizeData测试", () => {
  const status = normalizeData().status
  expect(status).toBe(0)
})


// 我们预期得到的就是mock出来的结果
test("normalizeData data测试", () => {
  const data = normalizeData().data
  expect(data).toBe({
    name: "zzc"
  })
})
```

<br>

### 要点: 
toBe()这个比较器  
不能比较引用类型的值 下面的写法是不行的 所以我们要换一个比较器
```js
expect(data).toBe({
    name: "zzc"
  })
```

<br>

**<font color="#C2185B">toEqual({}): </font>** 
用来比较引用类型的值

```js
test("normalizeData data测试", () => {
  const data = normalizeData().data
  expect(data).toEqual({
    name: "zzc"
  })
})
```

<br>

## demo4: UI的快照测试:
进行ui测试 需要引入一个额外的库 这个库的作用是把ui组件 序列化成为可以比较的对象 这个库的名字是 react-test-renderer

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

测试文件:
```js
// 引入组件
import BaiduLink from "./baiduLink";
import renderer from "react-test-renderer"
import React from "react"

test("测试baidulink被正常的渲染", () => {
  // 将ui组件序列化成可以比较的对象
  const tree = renderer.create(<BaiduLink />).toJSON()
  expect(tree).toMatchSnapshot()
})
```  

### js使用babel的方式: 
因为我们使用了es6的语法 我们要创建 .babelrc
```js
{
  "presets": ["@babel/preset-env", "babel/preset-react"]
}
```

    npm i @babel/core @babel/preset-env @babel/preset-react -D
    npm i react
    npm i react-test-renderer

<br>

**注意:**  
我们我们使用了快照 这时候我们要修改了内容的话 会要求先进行快照的验证 通过了后才可以进行下一步 这时候我们就要通过如下的命令

    npx jest --updateSnapshot