# 案例收集:

<br><br>

# 实现 Optional
```js
interface Article {
  title: string,
  content: string,
  author: string,
  date: Date,
  readCount: number
}

interface CreateArticleOptions {
  title: string,
  content: string,
  author?: string,
  date?: Date,
  readCount?: number
}

// 创建一片文章的函数 
function createArticle(options: Article) {

}
```

上面我们将 options 的类型定义为 Article, 这就有一个问题, options中其实是有一些字段可以不传的 比如

- author
- date
- readCount

也就是 options 的类型 应该是 CreateArticleOptions 类型, 但我们也明显能看出 CreateArticleOptions 和 Article 这两个类型之间产生了关联 有很多重复的代码

<br>

**期望:**   
我们希望 CreateArticleOptions 类型 可以根据 Article 类型 演算出来
```js
// Optional会返回给定字段为可选字段的新的类型
type CreateArticleOptions = Optional<Article, 'author' | 'date' | 'readCount'>

type Optional<T, K extends string & keyof T> = Omit<T, K> & Partial<Pick<T, K>>


// Omit 将给定类型的指定 字段去掉 返回新的类型
// Partial<Pick<T, K>> 将给定类型的指定字段变成可选返回
// Omit & Partial: 固定字段 + 可选字段
/*
  {
    title: string,
    content: string,
  } & {
    author?: string,
    date?: Date,
    readCount?: number
  }
*/
```

<br><br>

# 从字段到函数的推导
我们看看下面的场景中 我们怎么给 watch 函数进行类型标注
```js
// 调用函数 watch 传入一个对象, 返回一个新的对象
const personWatcher = watch({
  firstName: 'Saoirse',
  lastName: 'Ronan',
  age: 26
})

// 新对象中有on方法, 方法接收两个参数 可以监听某一个属性的变化
personWatcher.on(
  'ageChanged', // 监听age的变化
  (oblValue, newValue) => {

  }
)
```

<br>

### 类型标注
```js
type Watcher<T> = {
  // 给on定义泛型K
  on<K extends string & keyof T>(
    // 在类型中使用 `` 模版字符串
    // eventName: `${'firstName' | 'lastName' | 'age'}Changed`
    // keyof T 报错, T是一个对象, 对象的属性名可能是symbol, 而symbol是无法完成字符串拼接的 所以我们要去掉symbol的情况
    // eventName: `${ string & keyof T }Changed`,
    // 上面定义泛型了 我们可以直接使用泛型
    eventName: `${K}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void
}
declare function watch<T>(obj: object): Watcher<T>


// 泛型方法: 传入要监听谁 on<'age'> 也可以不行 因为可以自动推导
personWatcher.on<'age'>(
  'ageChanged', // 监听age的变化
  (oblValue, newValue) => {

  }
)
```

<br><br>

# 递归类型函数的类型标注
```s
https://www.bilibili.com/list/3494367331354766?sort_field=pubtime&spm_id_from=333.999.0.0&oid=621512696&bvid=BV1pb4y1M7eD
```

<br>

比如我们给下面柯里化的函数 进行类型标注
```js
function sum(a: number, b: number, c: number) {
  return a + b
}

// 我们传入一个三元函数 返回一个单参函数 无论原始的函数有多少参数 这个新的函数只接受一个参数
const currySum = curry(sum)

// 调用新的函数的时候传入一个参数 参数数量不够 返回一个新的函数, 等到传够了之后 执行函数
currySum(1)(2)(3)  // 6
```

<br>

### 类型标注
入参的函数的参数 和 返回值类型 跟 curry 的返回值类型是有关联的
```js
// 类型
// A 入参函数的参数列表 (fn: Function)
// R 返回值类型
declare function curry<A extends any[], R>(fn: (...args: A) => R): Curried<A, R>

// 返回值的类型的情况
// 1. 原始函数的参数列表长度为0的时候 应该返回 () => R
// 2. 原始函数的参数列表长度为1的时候 应该返回 (x) => R
// 3. 原始函数的参数列表长度>1的时候 应该返回 (x) => 新的函数

// 定义上面函数的返回值类型
type Curried<A, R> = 
  // 情况1:
  A extends [] ? () => R :
  // 情况2: 利用 infer 和 ts的类型推断 推断出 一项的类型 并取一个代号
  // A extends [一项] ? (param: 那一项的类型) => R :
  A extends [infer ARG] ? (param: ARG) => R :
  // 情况3: 递归
  // A extends [多个参数] ? (x) => 新的函数 : never
  A extends [infer ARG, ...infer REST] ? (param: ARG) => Curried<REST, R> : never
```

<br><br>

# 防抖函数的类型标注
```js
declare function debouce<A extends any[], R>(
  fn: (...args: a) => R,
  ms?: number
): (...args: A) => void


function handler(a: number, b: number) {
  return a + b
}

function debounce(fn, ms) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, ms);
  }
}
```

<br><br>

# 使用 泛型 和 keyof 约束参数
```js
function handler<T extends object, K extends keyof T>(obj: T, prop: K) {

}
```

<br><br>

# 定义方式:
```js
const workPlaceInitialStructure = stUtil.getWorkPlaceProperties('')
type workPlaceInitialStructureType = typeof workPlaceInitialStructure
type SearchFormType = {
  centerCode?: string,
  dateFrom: string,
  dateTo: string,
  timeFrom: string
} & {
  [P in keyof workPlaceInitialStructureType]: workPlaceInitialStructureType[P]
}


type workPlaceInitialStructureType = typeof workPlaceInitialStructure
type SearchFormType = {
  centerCode: string,
  dateFrom: string,
  dateTo: string,
  timeFrom?: string,
  timeTo?: string
} & {
  [P in keyof workPlaceInitialStructureType]: P extends 'workClass1' ? workPlaceInitialStructureType[P] : workPlaceInitialStructureType[P] | undefined
}
```

<br><br>

# 数组对象的类型的应用
```ts
let data = {
  code: 1,
  msg: "读取成功",
  items: [
    {
      id: 1,
      content: "我是内容",
    }
  ]
}

// 定义数组对象中 对象的类型
interface item {
  id: number | string,
  content: string,
}

// 定义 配置的类型
interface config {
  code: number,
  msg: string,
  items: Array<item>
}

let list: config = data
```

<br><br>

# 使用泛型 通过泛型定义 value 的类型是指定的
```js
// 值的类型是 T
interface obj<T> {
  [propName: string]: T
}

let endObj = {
  a: 1
}

let startObj:obj<number> = endObj
```

<br><br>

# 报错信息: 对象可能未定义
```js
type ListType = {
  id: number | string,
  name: string,
  age: number
}

let res = list.find(item => item.id == id)
```

上面的res的结果可能是 undefined 所以 Ts 报错了 解决方式如下

<br>

**1. 修改Ts配置 关闭严格检查模式**  
```js
"strict": false
```

<br>

**2. 代码做判断检查**  
```js
if(res) res.name = "测试文本"
```

<br>

**3. 告诉ts这是什么**  
```js
let res = list.find(item => item.id == id) as ListType
res.name = "测试文本"
```

<br><br>

# e.target 获取到的HTML元素
在使用 el.style.opacity 的时候 会报错

问题可能出在 TypeScript 对事件目标 (e.target) 的类型推断上。虽然你已经显式声明了 e: DragEvent，但是 TypeScript 可能仍然无法确定 e.target 的确切类型，因此会导致潜在的空值问题。

我们使用断言明确的告诉它这是什么元素就可以了
```js
const dragend = (e: DragEvent): void => {
  console.log('dragend')
  const el = e.target as HTMLDivElement
  el.style.opacity = '1'
}
```

<br><br>

# 函数前面参数不定量, 后面参数固定的情况 类型应该怎么写?
我们如何定义下面函数的类型
```js
addImpl('string', 'boolean', 'number', (a,b,c) => {})
```

<br>

**参数部分1:**  
是不定量的参数, 每一个参数是一个字符串 值为js中的数据类型

<br>

**参数部分2:**  
最后一个参数一定是一个函数, 它的返回值类型为any 参数的数量要和参数1中的数量保持一致, 参数的类型也是跟参数部分1中类型保持一致

<br>

### 实现方式:
怎么将前面的参数表示不定量的参数 后面的参数是一个函数呢?
```ts
type JSTypeMap = {
  'string': string,
  'number': number,
  'boolean': boolean,
  'object': object,
  'function': Function,
  'symbol': symbol,
  'undefined': undefined,
  'bigint': bigint
}

// type JSTypeName = 'string' | 'number' | 'boolean' | 'object' | 'function' | 'symbol' | 'undefined' | 'bigint'
type JSTypeName = keyof JSTypeMap

type ArgsType<T extends JSTypeMap[]> = {
  // T是一个数组 我们遍历出来的是下标, 我们取的就是 值部分的类型
  [K in keyof T]: JSTypeMap[T[K]]
}

declare function addImpl<T extends JSTypeName[]>(
  ...args: T,
  (...args: ArgsType<T>) => any
): void
```

<br><br>

# TS中的 协变 和 逆变
这两个东西都是为了做同一件事 就是类型安全

**协变:**  
在类型系统中保持子类型关系，通常涉及到数组和函数参数。

就是普通变量赋值时我们要考虑的小类型给大类型是安全的

<br>

**逆变:**  
逆变在类型系统中反转子类型关系，通常涉及到函数参数。

在函数引用赋值的场景中, 小类型的函数给大类型又不安全了

<br>

### 什么是类型安全
类型安全指的就是 保证成员始终可用

比如我们有三种对象类型, 这3种类型我们有一个大小的称呼 假设 特殊类型 叫做 小类型(子类型) 比如 SuperIKun 是 IKun 的一种特殊情况

也就是说 SuperIKun 小于 IKun, IKun又是Fans的一种 所以IKun是Fans的子类型

```js
interface Fans {
  call: any
}

interface IKun extends Fans {
  sing: any,
  dance: any,
  basketball: any
}

interface SuperIKun extends IKun {
  rap: any
}
```

说回类型安全, 比如下方 fans变量 可以赋值给 ikun 么, 不行下面的写法报错了
```js
let fans: Fans = {
  call: ''
}

// 报错: Type 'Fans' is missing the following properties from type 'IKun': sing, dance, basketball 
// 类型“Fans”与类型“IKun”相比缺少以下属性:唱歌，跳舞，篮球
let ikun: IKun = fans
```

如果上面 fans 赋值给 ikun 的话, 会报错, 因为这样做就失去了类型安全 因为将来我在使用 ikun 的时候 由于它的类型是 IKun 它里面有4个成员
- call
- sing
- dance
- basketball

如果我们将 fans 赋值给了 ikun 如果它不报错了 就造成了我在正常使用这个类型的时候 可能会出现一些根本不可能存在的字段 它又不报错 我就不知道

类型安全就是保证成员始终可用

ikun.basketball 可能就使用不了

但是反过来可以 我们将IKun类型赋值给Fans类型的变量 fans中只有一个成员call, 但是ikun呢 它是fans的子类型 所以它里面不管有多少成员 **它一定有一个成员叫call**
```js
let ikun: IKun = {
  sing: '',
  dance: '',
  basketball: '',
  call: ''
}

let fans: Fans = ikun
```

因此我们在使用 fans.call 的时候 它是安全的 这个成员一定存在 这就是类型安全

<br>

### 总结:
要保证类型安全 其实实现一点就可以了 我们要搞清楚谁在给这个数据 谁在收这个数据
- 给: 小类型
- 收: 大类型

```js
let ikun: IKun = {
  sing: '',
  dance: '',
  basketball: '',
  call: ''
}

let fans: Fans = ikun
```

上面的代码中 就是ikun在给数据, fans在收数据 我们只要保证给的类型是子类型(小类型) 收的类型是一个大类型

这样数据之间的传递就是安全的, 因为小(子)类型中一定包含父类型中的成员, 将子类型赋值给大的 在用的时候 我只用大类型里面的成员 子类型中的其它成员我不管

我可以保证大类型的成员是一定可用的 这样就保证了成员始终可用 这样类型就是安全的

<br>

### 问题:
我们能不能将 subTransform 赋值给 transform, 它们的类型不一样
```js
type Transform = (x: IKun) => IKun

type SubTransform = (x: SuperIKun) => SuperIKun

const subTransform: SubTransform = (x) => {
  return x as any
}



// 这里就是 小类型 给 大类型 但是报错了
/*
Type 'SubTransform' is not assignable to type 'Transform'.
Types of parameters 'x' and 'x' are incompatible.
Property 'rap' is missing in type 'IKun' but required in type 'SuperIKun'.

类型'SubTransform'不能赋值给类型'Transform'。
参数'x'和'x'的类型不兼容。
属性“rap”在类型“IKun”中缺失，但在类型“superkun”中需要。
*/
const transform: Transform = subTransform  // 这里!!!!!!!!
```

<br>

**报错的原因:**  
TS认为这样做可能会造成类型不安全 如果我们这样赋值了 ``const transform: Transform = subTransform`` 到时候调用函数 我们就有可能会使用 transform 来调用函数``transform()``, 在调用这个函数的时候 我们就需要传递参数 我们传的参数就是 ``(x: IKun)`` 也就是说 transform (x: IKun) 在**给数据**

因为 transform 的类型是 Transform, 这里需要提供 IKun 类型的参数, 而我们传入的参数 是subTransform函数的参数来接收 它的类型是 ``(x: SuperIKun)`` 它在**收数据**

这样 我们给的时候是大类型, 而收的时候是小类型 这样就出问题了, **因为小类型中有大类型中没有的东西, 因为我们传递的是大类型 但使用的时候是小类型, 大类型中可能没有我们要使用的东西**

总的来说

在调用的时候 **transform (x: IKun) 大类型** 由于 transform是Transform类型的 我们传入参数的时候需要提供 IKun 类型的数据

**形参呢 又是SuperIKun (x: SuperIKun) 小类型**, 这边在用小类型的参数, 所以给的时候是大类型 收的却是小类型 这样类型就不安全了

<br>

### 总结:
在函数的场景下 我们关注的应该是参数 
1. 谁在收 
2. 谁在传

<br><br>

# 联合类型 转 交叉类型
```ts
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never
```

上面的代码可以将联合类型转换成交叉类型

比如我们有一个联合类型, 我们看看转换为交叉类型

```js
type Test = { a: string } | { b: number } | { c: boolean }

// 使用上面的工具 转换为 交叉类型
type Test2 = UnionToIntersection<Test>
// Test2的类型为
type Test2 = { a: string } & { b: number } & { c: boolean }
```

<br>

### 知识点1:
泛型T, 如果它是一个联合类型 同时 它存在于 三目运算 中的时候 它到底怎么运算的
```js
// T 是 string | number | boolean 联合类型 并且进行了 3目运算
type WrapNaked<T> = T extends any ? { o: T } : never

type Foo = WrapNaked<string | number | boolean>
```

当我们将一个联合类型(散开的联合类型 而不是联合类型作为某个属性的类型出现) 传递给 T, 并且进行了3目运算的时候, 它是**分开运算的**
```js
string extends any ? { o: string } : never |
number extends any ? { o: number } : never |
boolean extends any ? { o: boolean } : never

// 然后再求联合类型
{ o: string } |
{ o: number } |
{ o: boolean }
```

<br>

**解析问题:**  
我们看看下面的代码在干什么
```js
// T为: { a: string } | { b: number } | { c: boolean }
T extends any ? (x: T) => any : never

{ a: string } extends any ? (x: { a: string }) => any : never |
{ b: number } extends any ? (x: { b: number }) => any : never |
{ c: boolean } extends any ? (x: { c: boolean }) => any : never

// 结果:
(x: { a: string }) => any |
(x: { b: number }) => any |
(x: { c: boolean }) => any
```

我们拿到了一个新的 函数的联合类型 然后我们继续 extends (``x: infer R) => any``
```js 
(x: { a: string }) => any |
(x: { b: number }) => any |
(x: { c: boolean }) => any extends (x: infer R) => any ? R : never
```

extends 的前面是一个联合类型 它们都是函数, 但是函数的参数是不一样的, 它在看我们的联合类型是不是 (``x: infer R) => any``

它在推导 { a: string } 和 { b: number } 和 { c: boolean } 是什么类型

这里就要借助TS的推导功能 上面的函数有3种情况 它是如何推导函数的参数的类型是什么呢?

我们简化例子看下
```js
type UnionTest = 
  ((x: { a: string }) => any) |
  ((x: { b: number }) => any) |
  ((x: { c: boolean }) => any)

function method(fn: UnionTest) {
  // ts的自动推导功能 将fn的参数x推导出
  // fn(x: {a: string } & { b: number } & { c: boolean }): any
  fn()
}
```

我们能看到 **联合类型 被 ts自动推导为 交叉类型 了** ts将函数的联合它们的参数的各种情况来取了一个交叉

将第一中函数参数的情况 和 第二种函数参数的情况 和 第三种函数参数的情况 将这些参数的情况 求了一个交叉 于是参数x的类型就是交叉类型了 

所以我们可以利用ts的推导功能 让它进行推导

<br>

### 联合类型 被 ts自动推导为 交叉类型 的原因
联合类型 和 交叉类型 它们之间是有大小关系的

```js
{ a: number } | { b: string }
{ a: number } & { b: string }
```

我们要比较上面两个类型的大小 怎么比较大小? 我们就看哪个类型涵盖了哪个类型

```js
{ a: number } | { b: string }
// 联合类型可以写成下面的样式
{ a: 1 } { b: 2 } { a: 1, b: 2 }

{ a: number } & { b: string }
// 交叉类型可以写成下面的样式
{ a: 1, b: 2 }
```

我们能看到 交叉类型 应该是 联合类型的 子类型, 也就是 联合类型是大类型 交叉类型是小类型

```js
// 联合大类型
type Big = { a: string } | { b: number } | { c: boolean }

// 交叉小类型
type Small = { a: string } & { b: number } & { c: boolean }

let big: Big = { a: 'a', b: 1, c: true}
let small: Small = { a: 'a', b: 1, c: true}

// 将 小类型 赋值给 大类型 ok (协变)
big = small

// 将 大类型 赋值给 小类型 err
small = big


// 函数的情况
let fn1 = (x: Big) => { }
let fn2 = (x: Small) => { }

// 大类型 赋值给 小类型 OK
fn2 = fn1

// 在函数参数的时候 刚好和上面的相反 这叫做类型的逆变
```

也就是说当两个函数之间进行类型传递的时候 它是大类型传给小类型 **也就是说当作为函数的参数传递的时候 联合类型 变成 交叉类型**

<br><br>

# 联合类型 和 交叉类型
```s
https://www.bilibili.com/list/3494367331354766?sort_field=pubtime&spm_id_from=333.999.0.0&oid=921518391&bvid=BV1wu4y1c7ws
```

很多人认为 联合类型 是 并集, 交叉类型 是 交集, 但是如果我们这么理解 就没有办法解释下面的现象

```js
// 联合类型的现象
type U = 
  {
    a: number,
    b: number
  }
  |
  {
    a: number,
    c: number
  }

// U是联合类型, 那么我们u对象里面就可以定义两个对象类型中所有属性的组合情况 所以我们可以在u中定义 a b c 三个属性
const u: U = {
  a: 1,
  b: 2,
  c: 3
}

// 报错: 类型 U 上不存在属性b 类型"{a: number, c: number}"上不存在属性b
u.b // 为什么报错?
u.c // 为什么报错?



// 交叉类型的现象
type I = 
  {
    a: number,
    b: number
  }
  &
  {
    a: number,
    c: number
  }

// I是交集, 它们有共同的属性a, 我们在i对象声明a 为什么报错
// Type '{ a: number; }' is not assignable to type 'I'. Property 'c' is missing in type '{ a: number; }' but required in type '{ a: number; c: number; }'
// 键入“{a: number;}'不能赋值给类型'I'。属性'c'在类型'{a: number;}'，但需要在类型'{a: number;c:数量;} '
const i: I = {
  a: 1
}

// 只有让我们在i对象声明 a b c 后才不报错
```

联合类型 和 交叉类型 确实是我们说的 并集 和 交集 但是并的和交的并不是属性字段

交的 和 并的 是它们的值

<br>

### 联合类型: 求并集
我们只能使用 两个类型中 共有的字段 比如上面的例子我们只能使用 u.a

<br>

### 交叉类型: 求交集
我们必须满足 两个类型中 所有的情况 比如上面的例子中我们要在i对象中声明 a b c
 
<br>

### 举例:
```js
// 得到的是a, 既要满足string 又要满足a的 只能是a
type test1 = 'a' & string
```

<br>

### 联合类型的运算
当一个联合类型和其它类型进行运算的时候 是分开运算的

```js
type test = 'a' | 'b' | 1 & string

// 相当于
type test = ('a' & string) | ('b' & string) | (1 & string)
```

<br>

### 技巧: 去除符号字段
```js
// keyof T得到的是对象中的属性名的联合类型 可能是由symbol, 如下的写法可以去掉symbol
string & keyof T
```

```js
// 在类型中使用 `` 模版字符串
// eventName: `${'firstName' | 'lastName' | 'age'}Changed`

// keyof T 报错, T是一个对象, 对象的属性名可能是symbol, 而symbol是无法完成字符串拼接的 所以我们要去掉symbol的情况
eventName: `${ string & keyof T }Changed`,
```