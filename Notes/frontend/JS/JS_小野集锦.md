### 小野集锦

> 类数组
- 一个类数组的结构如下
- 1. 要求有索引式的属性名
- 2. 要求对象中有length

- 因为要满足一个数组的特性

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length : 3,
}
```

- 如果length = 2, 则末位元素减掉
- 如果length = 4, 则用undefined补位
- 如果length = 0 或者 没有, 则数组为空


```js
var obj = {
  0: 1,
  1: 2,
  2: 3
  push: [].push
}

obj.push(4)

// 结果
4
2
3
length: 1
```

- 因为既然有push方法 那么一定会有length属性 如果没有会自动给你添加

- 然后我们push 4 它会从0的位置开始添加数据 所以将1覆盖为4

----------------

> Array.from(参数1, 参数2, 参数3)
- 作用:
- 将一个类数组对象转化为数组

- 参数1:
- 类数组对象

- 参数2:
- map回调

- 参数3:
- 我们传递进去的东西可以改变this的指向
```js
let data = Array.from(obj, function(item, index) {
  // 当我们不传递第三个参数的时候 this原先是什么现在就是什么
  console.log(this)
  return {
    ...
  }
})
```

- 当我们传递第三个参数进去的时候 this就代表我们传入的数据 
- 比如:
- 我们传递一个对象 那么this就是这个对象
- 我们传递一个数组 那么this就是这个数组
- 传递什么this就是什么

```js
let data = Array.from(obj, function(item, index) {
 
  console.log(this)
  return {
    ...
  }
}, {} or [] or number or string)
```


- 我们要将下面的结构 转换为 
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

- 方式1:
```js
let data = Array.from(obj).map((item, index) => {
  return {
    studentId: item,
    order: index
  }
})

console.log(data)
```

- 方式2: Array.from()
```js
const data = Array.from(obj, function(item, index) {
  return {
    studentId: item,
    order: index
  }
})
```

- 方式3: Array.from() 的第三个参数
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

- 数组的方法:
- forEach
- map
- filter
- reduce
- every
- some
- 上述的数组的方法中都有第3个参数
- 改变this指向的配置

----------------

### 将定义在对象中的get方法提取出来

- 如下我们定义的对象 我们给a属性定义了get方法 
- 要是想使用get方法我们都是通过 obj.a 的方式进行的调用
```js
let obj = {
  get a() {
    // 对random的结果进行四舍五入
    return Math.random() >= 0.5 ? 1 : 0
  }
}

console.log(obj.a)  // 0 or 1
```

- 现在我们想将get方法提取出来
- 方式1:
```js
const fn = obj.a
```

- 方式2:
> 含有get的对象.__lookupGetter__("提取哪个get");
```js
let round = obj.__lookupGetter__("a");
console.log(round)
console.log(round())
```

- 该方法已经被废弃了 但是它的兼容性超级好
- 在一些底层代码中使用的是
- __defineSetter__()
- __defineGetter__()

- 那既然上面的方法被废弃了 肯定就有一个新的方法出现替换它
- 我们的get set就是描述符

> Object.getOwnPropertyDescriptor("指定对象", "哪个属性的描述符")
- 返回的是一个该对象的所有描述符对象

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

- 既然是对象 我们就能通过.的方法获取到get
```js
let round = Object.getOwnPropertyDescriptor(obj, "a").get
console.log(round);
```

- 该方法的兼容性不是很好 虽然上面的__lookupGetter__方法被废弃了 但是大部分浏览器是支持的


> 对象.__defineGetter__("设置的属性", () => {})
> 对象.__defineSetter__("设置的属性", () => {})
- 给对象设置什么属性 回调就是get方法的回调
- 内部需要返回return

- 也就是我们可以直接设置 getter 方法
- 偏底层的方法

```js 
let obj = {}
obj.__defineGetter__("a", () => {
  return "get a"
})
console.log(obj.a)
```

----------------

### 相等性判断
- es版本中 有4种相等判断的算法
- 1. === 全等
- 2. ==  等于
- 3. 零值相等 -0 === +0  
- 4. 同值相等 -0 !== +0   NaN === NaN


- js中提供有关相等判断的操作方法
- 1. 严格相等 (strict equality)
  ===

- 2. 非严格相等(抽象/非约束) (loose equality)
  ==

- 3. Object.is(val1, val2)
- 判断两个参数是否是同一个值 es6的新特性 


> === 严格相等
- 不进行隐式类型转换

- 要求:
- 类型相同 值也要相同

```js
1 === "1"   // false  类型不同
1 === 2     // false  值不同
```

- 引用类型使用 === 判断的时候 引用值必须是同一地址
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

- 思考:
- 怎么让 a !== a 返回true 如何定义变量a让这个等式成立呢？
```js
a = NaN
a !== a
```


> 非严格相等 ==
- 比较之间会进行隐式类型转换 - 等式两边都有可能被转换
- 转换以后 还是用严格相等进行比较

- 隐式类型转换表:
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness

```js
Undefined == Undefined  // true 没有进行类型转换
Null == Null      // true
Undefined == Null // true


String == Object
// 隐式转换
// ToPrimitive(B) == A
// ToPrimitive(B)通过尝试调用 B 的B.toString() 和 B.valueOf() 方法，将参数 B 转换为原始值（Primitive）。

// 调用.toString()方法将Object转换为原始值 进行比较
```

- 注意:
- 任何对象都与 undefined 和 null 不相等
```js
({}) === undefined  // false
({}) === null       // false

// 如果不给{} 包上大括号在控制台上输出会报错 因为它也代表着代码块
```


> Narrow Object 窄对象
- document.all -- *不建议使用了*
- 它能选出DOM树上面的所有节点
```js
Array.from(document.all).forEach(item => {
  if(item.nodeName == "DIV") {
    console.log(item)   // div节点
  } 
})
```

- 那什么叫做窄对象呢?
- typeof document.all
- 我们会发现结果是undefined

- ie4的时候出现的 document.all 最早的时候我们可以用它获取节点

- 在ie10以前 document.all 是object
- 其它浏览器也要引进 document.all 这个属性 但是又不想和ie定义为一样的 object 所以定义为了 undefined 意思是待定


> document.all == undefined  // true
- 该情况和上面说的 undefined和其他进行比较的时候都是false 与这个结论互斥的一种情况


> 开发者认为 === 比 == 要好
- 全等对结果的预测是更加清晰明确
- 全等在不隐式转换的前提下 更快


> 有些情况 === 不利于我们功能的扩展
- 比如一个函数我们传递参数的时候 我们有可能传递数字1 也可以传递字符串1
- 那我们在函数内部进行判断的话 哪种情况合适 是不是都合适

- 尤其是我们在用swiper的时候 我们传递数字 和 字符串型的数字是不是都可以

- 这时候我们使用 == 比较好


> falsy值
- 将一个数据通过转换为boolean类型的false的值
- 一共有8个
- false
- +/-0
- 8n
- '' "" ``
- null
- undefined 
- NaN


> 同值相等 same-value
- 主要是针对0的

- -0 !== +0   这种情况就是同值相等
- -0 不等于 +0 他们不是一个东西

- 举例:
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

- 但是我们重新定义 -0 的时候就可以 
- 代表-0跟+0是不一样的

- 也就是说在Object.defineProperty定义value的时候-0 和 +0 是不一样的

- 还有NaN和任何值比较都是false 和自己也是
- 但是在同值相等的情况下 NaN 和 NaN 会被认为是一样的

- 我们还可以通过 Object.defineProperty 来测试
- 如果能重复定义 那就是被认为是一样的


> 零值相等 same-value-zero