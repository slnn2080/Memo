### Ts中可以声明的类型:

  类型          例子                描述
  number        1, 33             任意数字
  string        'hi', "hi",       任意字符串
  boolean       true、false       布尔值true或false
  字面量         其本身             限制变量的值就是该字面量的值

  object        {name:'孙悟空'}   任意的JS对象
  array         [1,2,3]           任意JS数组

  any           *                 任意类型
  unknown       *                 类型安全的any

  void          空值（undefined）  没有值（或undefined）
  never         没有值            不能是任何值

  tuple         [4,5]             元素，TS新增类型，固定长度数组
  enum          enum{A, B}        枚举，TS中新增类型

----------------

### 变量的类型赋值方式
> 方式1
- 变量后面接 : 的形式为变量定义类型

> let 变量: 类型;
```js
let a: string
let b: number
```

---

> 方式2
- 初始化

> let 变量: 类型 = 值
```js
let a: boolean = true
```

---

> 方式3
- 类型推断 如果变量的声明和赋值是同时进行的(变量的初始化), TS可以自动对变量指定该类型
- 该变量不能再被赋其它类型的值
```js
let a = 123
```

---

> 定义字面量
> let 变量: 10
- 变量后面直接用 : 的形式定义变量的字面那两

---

> 联合类型
- 对变量的声明 可以是几个类型之间 或者 几个值之间

> let b: 'male' | 'female';
- 变量b的值 只能是 它们之中的一个

> let c: boolean | string
- 变量c的类型 只能是 boolean 或者 string 之间的一个

----------------

### 变量的类型

> 变量: any
- 这个变量的值可以是任意类型, 可以任意赋值, 一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
```js
let d:any;    // 变量d可以是任意类型
    d=10;
    d='hello'
    d=true
```

- 如果变量不指定其类型 就是 隐式的any
```js
let d;      // 隐式any
    d = 10;
    d = 'hello'
```

> any的应用场景
- 比如我们要获取html结构中的div节点 在页面有效果 但是ts会报错 这时候我们就可以给div指定一个any类型

```js
let div = document.querySelector("div")
div.style.color = "red"

let div: any = document.querySelector("div")
```


> 变量: unknown (安全的any)
- 表示未知类型的值
- 当遇到类型不确定的时候 能用unknown就用unknown

- unknown类型的值不能赋值给别的类型, 说白unknown只霍霍自己 自己愿意是啥类型就是啥类型, 但是不能赋值给别人
```js
let e: unknown;
    e = 10;
    e = 'hello';
    e = true;

let s: string;
    s = e;            // 报错
```

> unknown的复制方式:
- 1. 赋值前要进行类型检测
```js
let e: unknown;
let s: string;

e = '我是文本'

if(typeof e === 'string') {
  s = e;
}
```

> 类型断言
- 2. 类型断言
- 语法: <类型>变量  or  变量 as 类型
- 告诉编辑器 变量的实际类型, e的类型就是字符串别给我报错了

```js
  let e: unknown;
  let s: string;

  // 两种写法
  s = e as string;    // 告诉编辑器e就是string
  s = <string>e;      // 告诉编辑器e就是string
```


> 变量: undefined
> let num: number | undefined;
- undefined类型的变量要这么写


> 变量: null
- 一个变量如果声明为null 那么它就不能被复制了
```js
let num: null;   // 该变量不能赋其它的值了

// 一个元素可能是number类型 可能是undefined 可能是null
let num: number | null | undefined;
```


> 变量: void
- 用来表示空值, 以函数为例 就表示没有返回值 


> 变量: never
- 和void有点像, 表示没有值 以函数为例 表示永远不会返回结果 连空(undefined null)也没有
- 它包含(undefined null)


> 变量: object
- TypeScript 中的对象必须拥有所有正确的属性和值类型：

> let a: object;
- 一般我们使用{ } 给一个变量指定类型, 类面指定必须包含有哪些的属性

```js
let obj: {
  name: string,
  age: number
}

obj = {
  name: "sam",
  age: 2
}
```

**注意:**
- 上面 显式指定属性的时候 多了也不行 少了也不行

> 属性名?
- 可以可选属性
- 这样即使没有 age 也不会报错
```js
let b: { name:string, age?: number }
```


> 定义任性属性 [属性名: 属性名类型]: any
```js
let obj: {
  [sex: string]: any
}
```


> 变量: array
- 给一个变量指定数组的类型 有一下的几种方式

> 方式一:  类型[]
```js
let a: string[];
a = ['a', 'b'];

let a: string[] = ["sam", "erin", "nn"]
```


> 方式二: Aarray<类型>
```js
let arr: Array<number>;
arr = [1, 2, 3]

let arr: Array<number> = [1, 2, 3]
```


> 方式三: Array<any>  or  any[]
- 不推荐
```js
let c: Array<any> = [3, 4, "sam"]

let arr: any[] = [1, "a"]
```


> 二维数组的定义:
```js
// 方式一
let arry: number[][] = [[1,2,3]];
//方式二
let arry: Array<Array<number>> = [[1,2,3]];
```


> 数组对象的举例:
> {} []
```js
[{name: "sam", age: 18}, {name: "sam", age: 18}]

let docs: {}[]

let docs: {
  text: string,
  flag: boolean,
  id: number,
  children: Array<any>
}[]
```

> object[]
```js
let books: object[] = [
  { name: 'Tom', animal: 'cat' },
  { name: 'Jerry', animal: 'mouse' },
]; // 只能包含对象
```


> 联合类型的数组
```js
let person: (string | number | boolean)[] = ['ConardLi', 1, true];

let person: [string, number, boolean] = ['ConardLi', 1, true];
```

----------------

### 接口
> 定义对象接口
- 在定义对象的类型时，我们通常会使用 interface。如果我们需要检查多个对象是否具有相同的特定属性和值类型时，是很有用的：

```js
interface Person {
  name: string;
  age: number;
  isProgrammer: boolean;
}
```


> 定义方法接口
```js
interface Animal {
  eat(name: string): string;
  speak: (name: string) => string;
}

// 给对象指定接口
let tom: Animal = {
  eat: function (name: string) {
    return `eat ${name}`;
  },
  speak: (name: string) => `speak ${name}`,
};
```

----------------

### interface和对象的搭配使用
- 1. 先定义 接口 接口中直接写 属性的类型
```js
interface Person {
  name: string;
  age: number;
  isProgrammer: boolean;
}
```

- 2. 变量: 接口名 = { ... }
- 使用上面的格式 给变量指定接口
```js
let person1: Person = {
  name: 'ConardLi',
  age: 17,
  isProgrammer: true,
};
```

----------------

### 函数相关
- ts可以给函数的形参 和 函数的返回值定义类型
- ts要求有几个形参就要有几个实参

```js
function sum(a:number, b:number): number {
  return a + b;
}
```

----------------

### Ts如何定义数组中嵌套对象的类型
  [
    {
      name: "xxx",
      children: [
        {
          name: "yyy"
        }
      ]
    }
  ]

- 1. 先定义 children数组里面的对象 里面的属性
- 创建 XxxItem 类 然后类中定义属性(和children数组对象里面的属性相同)
- 把类作为参数来约束数据传入的类型
```js
class XxxItem {
  uuid: stirng,
  amount: number,
  total: number,
  originalTotal: number,
  checked: boolean
}
```

- 2. 定义 泛型接口
```js
interface ObjectOf<T> {
  [_: string]: T
}
```

- 3. 使用
```js
interface State {
  promoList: {
    giftCheck: ObjectOf<XxxItem>,
    freeCheck: Array<XxxItem>
  }
}
```


> 示例2:
```js
interface workLinkArrType {
  title: string
  des: string
  path?: string
}

interface workLinkType {
  [index: number]: Array<workLinkArrType>
}

let workLink: workLinkType = [
    [
      { title: '扫码打包已完成', des: '16单' },
      { title: '扫码打包已完成', des: '16单' }
    ],
    [{ title: '扫码打包已完成', des: '16单' }]
  ]
```


> 示例3: 数组对象里面的数据 怎么约束
```js
// 定义数组里面对象的类型
interface Item {
  name: string,
  age: number,
  sex?: boolean,
}


let data: Array<Item> = [
  {
    name: "sam",
    age: 18,
  }
]
```


> 示例4: 对象数组的数据 怎么约束
- 要点 都是 定义一个接口 约束 对象里面的属性类型

```js
// 定义数组里面对象的类型
interface Item {
  name: string,
  age: number,
  sex?: boolean,
}


interface ArrayType {
  name: string,
  age: number,
  sex?: boolean,
  children: Array<Item>
}

let data: ArrayType = {
  name: "sam",
  age: 18,
  children: [
    {
      name: "sam",
      age: 19
    }
  ]
}
```

----------------

### DOM 和类型转换 !
-  TypeScript 没办法像 JavaScript 那样访问 DOM。这意味着每当我们尝试访问 DOM 元素时，TypeScript 都无法确定它们是否真的存在。

- 使用非空断言运算符 (!)，我们可以明确地告诉编译器一个表达式的值不是 null 或 undefined。当编译器无法准确地进行类型推断时，这可能很有用：

```js
// 我们明确告诉 TS a 标签肯定存在
const link = document.querySelector('a')!;

```

- 这里我们没必要声明 link 变量的类型。这是因为 TypeScript 可以通过类型推断确认它的类型为 HTMLAnchorElement。

- 但是如果我们需要通过 class 或 id 来选择一个 DOM 元素呢？这时 TypeScript 就没办法推断类型了：
```js
const form = document.getElementById('signup-form');

console.log(form.method);
// ERROR: Object is possibly 'null'.
// ERROR: Property 'method' does not exist on type 'HTMLElement'.
```

- 我们需要告诉 TypeScript form 确定是存在的，并且我们知道它的类型是  HTMLFormElement。我们可以通过类型转换来做到这一点：
```js
const form = document.getElementById('signup-form') as HTMLFormElement;

console.log(form.method); // post
```